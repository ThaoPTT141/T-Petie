'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { User, UserRole, UserStatus, AuthCredentials, RegisterData, BabyProfile } from '@/types/auth';
import { trackLogin, trackLogout } from '@/lib/analytics/tracker';

const STORAGE_KEY_FALLBACK_DB = 'tpetie_users_database';

// Danh sách tài khoản mẫu dự phòng (nếu chưa kết nối PostgreSQL)
const FALLBACK_USERS: User[] = [
  {
    id: 'user-admin-01',
    email: 'admin@tpetie.vn',
    name: 'Quản Trị Viên T\'Petie',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    phone: '0988123456',
    address: 'Trụ sở T\'Petie, 188 Cầu Giấy',
    city: 'Hà Nội',
    points: 1250,
    createdAt: '2024-01-15T08:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
  },
  {
    id: 'user-customer-01',
    email: 'user@tpetie.vn',
    name: 'Mẹ Thu Trang',
    role: 'user',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    phone: '0912345678',
    address: 'Số 28 Ngõ 12 Phố Đào Tấn, P. Cống Vị, Q. Ba Đình',
    city: 'Hà Nội',
    points: 350,
    babyProfile: {
      name: 'Bé Bắp (Tuệ Mẫn)',
      birthDate: '2023-05-12',
      gender: 'be-gai',
      weight: 11.2,
      height: 86,
      recommendedSize: 'Size 2 (10 - 12kg)',
    },
    createdAt: '2024-03-20T10:30:00.000Z',
    lastLoginAt: new Date().toISOString(),
  },
  {
    id: 'user-customer-02',
    email: 'mebap@gmail.com',
    name: 'Mẹ Bắp Xinh',
    role: 'user',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    phone: '0978999888',
    address: 'Chung cư Masteri Thảo Điền, Quận 2',
    city: 'TP. Hồ Chí Minh',
    points: 520,
    babyProfile: {
      name: 'Bé Thỏ',
      birthDate: '2022-11-08',
      gender: 'be-gai',
      weight: 13.5,
      height: 94,
      recommendedSize: 'Size 3 (12 - 15kg)',
    },
    createdAt: '2024-02-10T14:15:00.000Z',
  },
  {
    id: 'user-customer-03',
    email: 'lananh.baby@gmail.com',
    name: 'Mẹ Lan Anh',
    role: 'user',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    phone: '0905123456',
    address: '128 Đường Lê Lợi, P. Thạch Thang, Q. Hải Châu',
    city: 'Đà Nẵng',
    points: 180,
    createdAt: '2024-06-01T09:20:00.000Z',
  },
];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AuthCredentials) => Promise<{ success: boolean; error?: string; role?: UserRole }>;
  loginWithGoogle: () => Promise<{ success: boolean; role?: UserRole }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string; role?: UserRole }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  updateBabyProfile: (baby: BabyProfile) => Promise<{ success: boolean; error?: string }>;
  
  // Admin Methods
  getAllUsers: () => User[];
  fetchAdminUsers: () => Promise<User[]>;
  updateUserRole: (userId: string, newRole: UserRole) => Promise<{ success: boolean; error?: string }>;
  toggleUserStatus: (userId: string) => Promise<{ success: boolean; error?: string }>;
  deleteUser: (userId: string) => Promise<{ success: boolean; error?: string }>;
  addUser: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status, update: updateSession } = useSession();
  const [adminUsers, setAdminUsers] = useState<User[]>(FALLBACK_USERS);

  // Chuyển đổi session từ NextAuth sang format User
  const currentUser: User | null = session?.user
    ? {
        id: session.user.id || 'user-current',
        email: session.user.email || '',
        name: session.user.name || 'Thành Viên',
        role: (session.user.role as UserRole) || 'user',
        status: (session.user.status as UserStatus) || 'active',
        avatar: session.user.image || undefined,
        phone: session.user.phone || undefined,
        address: session.user.address || undefined,
        city: session.user.city || undefined,
        points: session.user.points || 100,
        babyProfile: session.user.babyProfile || undefined,
        createdAt: new Date().toISOString(),
      }
    : null;

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated' && !!currentUser;

  // Tải danh sách user cho Admin từ API Backend
  const fetchAdminUsers = useCallback(async (): Promise<User[]> => {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        if (data.users && Array.isArray(data.users)) {
          setAdminUsers(data.users);
          return data.users;
        }
      }
    } catch (e) {
      console.warn('Backend admin API not available, using fallback:', e);
    }

    // Fallback nếu chưa có backend DB
    try {
      const local = localStorage.getItem(STORAGE_KEY_FALLBACK_DB);
      if (local) {
        const parsed = JSON.parse(local);
        setAdminUsers(parsed);
        return parsed;
      }
    } catch {}
    return FALLBACK_USERS;
  }, []);

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      fetchAdminUsers();
    }
  }, [currentUser?.role, fetchAdminUsers]);

  // 1. Đăng nhập bằng NextAuth Credentials (Email/Password)
  const login = async (credentials: AuthCredentials): Promise<{ success: boolean; error?: string; role?: UserRole }> => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password,
      });

      if (!result) {
        return { success: false, error: 'Không thể kết nối đến máy chủ xác thực.' };
      }

      if (result.error) {
        return { success: false, error: result.error };
      }

      // Xác thực thành công
      trackLogin('password', credentials.email);

      // Nhận diện role: admin nếu email là admin@tpetie.vn
      const role: UserRole = credentials.email.trim().toLowerCase() === 'admin@tpetie.vn' ? 'admin' : 'user';
      return { success: true, role };
    } catch (e) {
      console.error('Error during signIn:', e);
      return { success: false, error: 'Đăng nhập thất bại. Vui lòng thử lại sau.' };
    }
  };

  // 2. Đăng nhập qua NextAuth Google OAuth
  const loginWithGoogle = async (): Promise<{ success: boolean; role?: UserRole }> => {
    try {
      trackLogin('google', 'google-oauth');
      await signIn('google', { callbackUrl: '/dashboard' });
      return { success: true, role: 'user' };
    } catch (e) {
      console.error('Error during Google signIn:', e);
      return { success: false };
    }
  };

  // 3. Đăng ký tài khoản mới qua API Backend
  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string; role?: UserRole }> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        return { success: false, error: json.error || 'Đăng ký không thành công.' };
      }

      // Sau khi đăng ký thành công -> Tự động đăng nhập
      const loginRes = await login({ email: data.email, password: data.password });
      return loginRes;
    } catch (e) {
      console.error('Error in register:', e);
      return { success: false, error: 'Lỗi kết nối máy chủ khi đăng ký.' };
    }
  };

  // 4. Đăng xuất
  const logout = () => {
    trackLogout();
    signOut({ callbackUrl: '/' });
  };

  // 5. Cập nhật hồ sơ cá nhân qua API Backend
  const updateProfile = async (data: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // Cập nhật Session Client
        await updateSession(data);
        return { success: true };
      }
      const json = await res.json();
      return { success: false, error: json.error || 'Không thể lưu thông tin.' };
    } catch (e) {
      console.error('Error updating profile:', e);
      return { success: false, error: 'Lỗi kết nối máy chủ' };
    }
  };

  // 6. Cập nhật hồ sơ bé yêu
  const updateBabyProfile = async (baby: BabyProfile): Promise<{ success: boolean; error?: string }> => {
    return updateProfile({ babyProfile: baby });
  };

  // ===== ADMIN METHODS =====

  const getAllUsers = () => {
    return adminUsers;
  };

  // Đổi quyền người dùng (Role Switcher)
  const updateUserRole = async (userId: string, newRole: UserRole): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        await fetchAdminUsers();
        return { success: true };
      }
      const json = await res.json();
      return { success: false, error: json.error };
    } catch (e) {
      console.error('Error in updateUserRole:', e);
      // Fallback local update
      setAdminUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
      return { success: true };
    }
  };

  // Khóa / Mở khóa tài khoản
  const toggleUserStatus = async (userId: string): Promise<{ success: boolean; error?: string }> => {
    const target = adminUsers.find((u) => u.id === userId);
    if (!target) return { success: false, error: 'Không tìm thấy người dùng' };

    const newStatus: UserStatus = target.status === 'active' ? 'blocked' : 'active';

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        await fetchAdminUsers();
        return { success: true };
      }
      const json = await res.json();
      return { success: false, error: json.error };
    } catch (e) {
      console.error('Error in toggleUserStatus:', e);
      setAdminUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)));
      return { success: true };
    }
  };

  // Xóa tài khoản người dùng
  const deleteUser = async (userId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await fetchAdminUsers();
        return { success: true };
      }
      const json = await res.json();
      return { success: false, error: json.error };
    } catch (e) {
      console.error('Error in deleteUser:', e);
      setAdminUsers((prev) => prev.filter((u) => u.id !== userId));
      return { success: true };
    }
  };

  // Thêm tài khoản mới từ Admin
  const addUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        await fetchAdminUsers();
        return { success: true };
      }
      const json = await res.json();
      return { success: false, error: json.error };
    } catch (e) {
      console.error('Error in addUser:', e);
      const newUser: User = {
        ...userData,
        id: `user-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setAdminUsers((prev) => [...prev, newUser]);
      return { success: true };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        isAuthenticated,
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
        updateProfile,
        updateBabyProfile,
        getAllUsers,
        fetchAdminUsers,
        updateUserRole,
        toggleUserStatus,
        deleteUser,
        addUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
