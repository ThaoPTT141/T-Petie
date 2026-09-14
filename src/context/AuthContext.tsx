'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, UserStatus, AuthCredentials, RegisterData, BabyProfile } from '@/types/auth';
import { trackLogin, trackLogout } from '@/lib/analytics/tracker';

const STORAGE_KEY_USER = 'tpetie_current_user';
const STORAGE_KEY_DB = 'tpetie_users_database';

// Danh sách tài khoản mẫu ban đầu
const INITIAL_USERS: User[] = [
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
  updateBabyProfile: (baby: BabyProfile) => Promise<{ success: boolean }>;
  
  // Admin Methods
  getAllUsers: () => User[];
  updateUserRole: (userId: string, newRole: UserRole) => Promise<{ success: boolean; error?: string }>;
  toggleUserStatus: (userId: string) => Promise<{ success: boolean; error?: string }>;
  deleteUser: (userId: string) => Promise<{ success: boolean; error?: string }>;
  addUser: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [usersDb, setUsersDb] = useState<User[]>(INITIAL_USERS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Khởi tạo và đọc dữ liệu từ LocalStorage
  useEffect(() => {
    try {
      // 1. Tải cơ sở dữ liệu User
      const storedDb = localStorage.getItem(STORAGE_KEY_DB);
      let activeDb = INITIAL_USERS;
      if (storedDb) {
        try {
          activeDb = JSON.parse(storedDb);
          setUsersDb(activeDb);
        } catch {
          activeDb = INITIAL_USERS;
          localStorage.setItem(STORAGE_KEY_DB, JSON.stringify(INITIAL_USERS));
        }
      } else {
        localStorage.setItem(STORAGE_KEY_DB, JSON.stringify(INITIAL_USERS));
      }

      // 2. Tải phiên đăng nhập hiện tại
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        // Kiểm tra xem user có còn trong database và không bị khóa không
        const freshUser = activeDb.find((u) => u.id === parsed.id || u.email === parsed.email);
        if (freshUser && freshUser.status !== 'blocked') {
          setUser(freshUser);
        } else {
          localStorage.removeItem(STORAGE_KEY_USER);
          setUser(null);
        }
      }
    } catch (e) {
      console.error('Error loading auth from localStorage:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Lưu database khi có cập nhật
  const saveDb = (newDb: User[]) => {
    setUsersDb(newDb);
    try {
      localStorage.setItem(STORAGE_KEY_DB, JSON.stringify(newDb));
    } catch (e) {
      console.error('Error saving users database:', e);
    }
  };

  // Đăng nhập bằng Email / Mật khẩu
  const login = async (credentials: AuthCredentials): Promise<{ success: boolean; error?: string; role?: UserRole }> => {
    setIsLoading(true);
    // Giả lập network delay 300ms
    await new Promise((resolve) => setTimeout(resolve, 300));

    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password;

    // Kiểm tra định dạng cơ bản
    if (!email || !password) {
      setIsLoading(false);
      return { success: false, error: 'Vui lòng nhập đầy đủ Email và Mật khẩu' };
    }

    // Tìm kiếm trong cơ sở dữ liệu
    const foundUser = usersDb.find((u) => u.email.toLowerCase() === email);

    if (!foundUser) {
      setIsLoading(false);
      return { 
        success: false, 
        error: 'Tài khoản không tồn tại. Mẹ có thể đăng ký tài khoản mới hoặc dùng tài khoản dùng thử bên dưới!' 
      };
    }

    if (foundUser.status === 'blocked') {
      setIsLoading(false);
      return { 
        success: false, 
        error: 'Tài khoản này đã bị tạm khóa. Vui lòng liên hệ hỗ trợ T\'Petie.' 
      };
    }

    // Mật khẩu mặc định chấp nhận cho demo hoặc password chuẩn
    if (password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Mật khẩu phải có tối thiểu 6 ký tự.' };
    }

    // Đăng nhập thành công -> Cập nhật lastLogin
    const updatedUser: User = {
      ...foundUser,
      lastLoginAt: new Date().toISOString(),
    };

    const updatedDb = usersDb.map((u) => (u.id === updatedUser.id ? updatedUser : u));
    saveDb(updatedDb);

    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));
    setIsLoading(false);

    // Track analytics
    trackLogin('google', updatedUser.id);

    return { success: true, role: updatedUser.role };
  };

  // Đăng nhập qua Google OAuth
  const loginWithGoogle = async (): Promise<{ success: boolean; role?: UserRole }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Tìm hoặc tạo tài khoản Google mẫu
    const googleEmail = 'mebap@gmail.com';
    let googleUser = usersDb.find((u) => u.email === googleEmail);

    if (!googleUser) {
      googleUser = {
        id: `user-google-${Date.now()}`,
        email: googleEmail,
        name: 'Mẹ Bắp (Google)',
        role: 'user',
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
        points: 100,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
      saveDb([...usersDb, googleUser]);
    } else {
      googleUser = {
        ...googleUser,
        lastLoginAt: new Date().toISOString(),
      };
      saveDb(usersDb.map((u) => (u.id === googleUser?.id ? googleUser : u)));
    }

    setUser(googleUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(googleUser));
    setIsLoading(false);

    trackLogin('google', googleUser.id);
    return { success: true, role: googleUser.role };
  };

  // Đăng ký tài khoản mới (Mặc định Role: User)
  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string; role?: UserRole }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const email = data.email.trim().toLowerCase();
    const name = data.name.trim();

    if (!name || !email || !data.password) {
      setIsLoading(false);
      return { success: false, error: 'Vui lòng điền đầy đủ tất cả thông tin bắt buộc.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsLoading(false);
      return { success: false, error: 'Email không đúng định dạng. VD: mebe@gmail.com' };
    }

    if (data.password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Mật khẩu phải chứa ít nhất 6 ký tự.' };
    }

    // Kiểm tra trùng email
    if (usersDb.some((u) => u.email.toLowerCase() === email)) {
      setIsLoading(false);
      return { success: false, error: 'Email này đã được đăng ký. Mẹ vui lòng đăng nhập nhé!' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      phone: data.phone?.trim() || '',
      role: 'user', // Luôn gán role user cho tài khoản đăng ký mới
      status: 'active',
      points: 100, // Tặng 100 điểm chào mừng
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    const newDb = [...usersDb, newUser];
    saveDb(newDb);

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    setIsLoading(false);

    trackLogin('google', newUser.id);
    return { success: true, role: 'user' };
  };

  // Đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
    trackLogout();
  };

  // Cập nhật thông tin cá nhân
  const updateProfile = async (data: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Chưa đăng nhập' };

    const updatedUser: User = {
      ...user,
      ...data,
      id: user.id, // không cho sửa ID
      role: user.role, // user không tự đổi role của mình ở đây
    };

    const updatedDb = usersDb.map((u) => (u.id === user.id ? updatedUser : u));
    saveDb(updatedDb);

    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));
    return { success: true };
  };

  // Cập nhật hồ sơ bé yêu
  const updateBabyProfile = async (baby: BabyProfile): Promise<{ success: boolean }> => {
    if (!user) return { success: false };
    return updateProfile({ babyProfile: baby });
  };

  // ===== ADMIN METHODS =====

  const getAllUsers = () => {
    return usersDb;
  };

  const updateUserRole = async (userId: string, newRole: UserRole): Promise<{ success: boolean; error?: string }> => {
    if (user?.role !== 'admin') {
      return { success: false, error: 'Bạn không có quyền thực hiện thao tác này.' };
    }

    const target = usersDb.find((u) => u.id === userId);
    if (!target) return { success: false, error: 'Không tìm thấy người dùng' };

    const updatedDb = usersDb.map((u) => (u.id === userId ? { ...u, role: newRole } : u));
    saveDb(updatedDb);

    // Nếu đang sửa chính mình
    if (user.id === userId) {
      const self = { ...user, role: newRole };
      setUser(self);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(self));
    }

    return { success: true };
  };

  const toggleUserStatus = async (userId: string): Promise<{ success: boolean; error?: string }> => {
    if (user?.role !== 'admin') {
      return { success: false, error: 'Bạn không có quyền thực hiện thao tác này.' };
    }

    if (userId === user.id) {
      return { success: false, error: 'Không thể tự khóa tài khoản của chính mình.' };
    }

    const target = usersDb.find((u) => u.id === userId);
    if (!target) return { success: false, error: 'Không tìm thấy người dùng' };

    const newStatus: UserStatus = target.status === 'active' ? 'blocked' : 'active';
    const updatedDb = usersDb.map((u) => (u.id === userId ? { ...u, status: newStatus } : u));
    saveDb(updatedDb);

    return { success: true };
  };

  const deleteUser = async (userId: string): Promise<{ success: boolean; error?: string }> => {
    if (user?.role !== 'admin') {
      return { success: false, error: 'Bạn không có quyền thực hiện thao tác này.' };
    }

    if (userId === user.id) {
      return { success: false, error: 'Không thể xóa tài khoản của chính mình.' };
    }

    const updatedDb = usersDb.filter((u) => u.id !== userId);
    saveDb(updatedDb);

    return { success: true };
  };

  const addUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<{ success: boolean; error?: string }> => {
    if (user?.role !== 'admin') {
      return { success: false, error: 'Bạn không có quyền thực hiện thao tác này.' };
    }

    if (usersDb.some((u) => u.email.toLowerCase() === userData.email.toLowerCase())) {
      return { success: false, error: 'Email này đã tồn tại trong hệ thống.' };
    }

    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    saveDb([...usersDb, newUser]);
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
        updateProfile,
        updateBabyProfile,
        getAllUsers,
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
