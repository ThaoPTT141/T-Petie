'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { UserProfile, BabyInfo, AuthContextType, SocialProvider } from '@/types/auth';
import { trackLogin, trackLogout, trackLoginModalOpen } from '@/lib/analytics/tracker';
import { useToast } from '@/context/ToastContext';

const STORAGE_KEY = 'tpetie_auth_user';

// Mock profiles phong cách T'Petie
const MOCK_GOOGLE_USER: UserProfile = {
  id: 'user_google_01',
  name: 'Mẹ Thu Trang',
  email: 'trang.nguyen@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  phone: '0988.***.456',
  address: 'Số 12 Ngõ 45 Cầu Giấy, Quận Cầu Giấy, Hà Nội',
  provider: 'google',
  points: 350,
  membershipTier: 'Thành Viên Thân Thiết ⭐',
  createdAt: '2026-01-15',
  babyInfo: {
    name: 'Bé Bắp (Nguyễn Tuệ Mẫn)',
    gender: 'girl',
    birthday: '2023-04-15',
    weight: 11.2,
    height: 86,
    recommendedSize: 'Size 2 (10 - 12kg)',
  },
  orders: [
    {
      id: '#TP-884920',
      date: '10/09/2026',
      status: 'shipping',
      statusText: 'Đang Giao Hàng 🚚',
      items: [
        { name: 'Váy Công Chúa Voan Tơ Hoa Nhí', size: 'Size 2', quantity: 1, price: 295000 },
        { name: 'Áo Sơ Mi Cổ Sen Thêu Tay', size: 'Size 2', quantity: 1, price: 185000 },
      ],
      total: 480000,
    },
  ],
};

const MOCK_FACEBOOK_USER: UserProfile = {
  id: 'user_facebook_02',
  name: 'Mẹ Mai Linh',
  email: 'linh.mai@facebook.com',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
  phone: '0912.***.789',
  address: 'Chung cư Vinhomes Central Park, Bình Thạnh, TP. Hồ Chí Minh',
  provider: 'facebook',
  points: 520,
  membershipTier: 'Thành Viên VIP Vàng 👑',
  createdAt: '2025-11-20',
  babyInfo: {
    name: 'Bé Sữa (Lê Hà Linh)',
    gender: 'girl',
    birthday: '2023-08-20',
    weight: 9.5,
    height: 78,
    recommendedSize: 'Size 1 (8 - 10kg)',
  },
  orders: [
    {
      id: '#TP-912044',
      date: '05/09/2026',
      status: 'delivered',
      statusText: 'Đã Giao Thành Công ✨',
      items: [
        { name: 'Set Váy Yếm Linen Hạt Dẻ Kem', size: 'Size 1', quantity: 1, price: 345000 },
      ],
      total: 345000,
    },
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { showToast } = useToast();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  // Khôi phục phiên đăng nhập từ localStorage khi tải trang
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Lỗi khi đọc session từ localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mở Login Modal
  const openLoginModal = useCallback((targetRedirectUrl?: string) => {
    if (targetRedirectUrl) {
      setRedirectUrl(targetRedirectUrl);
    }
    setIsLoginModalOpen(true);
    trackLoginModalOpen(pathname || 'direct');
  }, [pathname]);

  // Đóng Login Modal
  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  // Lưu User vào state và LocalStorage
  const saveUserSession = (newUser: UserProfile) => {
    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch (e) {
      console.error('Không thể lưu session vào localStorage:', e);
    }
  };

  // Xử lý hoàn tất đăng nhập
  const handleAuthSuccess = (authenticatedUser: UserProfile, provider: SocialProvider) => {
    saveUserSession(authenticatedUser);
    trackLogin(provider, authenticatedUser.id);
    closeLoginModal();

    showToast(`Chào mừng ${authenticatedUser.name} đã quay trở lại! 🌸`, 'love');

    const destination = redirectUrl || '/tai-khoan';
    setRedirectUrl(null);
    router.push(destination);
  };

  // Đăng nhập Google OAuth 2.0
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

      // Nếu có Google Client ID thực tế được cấu hình:
      if (googleClientId && typeof window !== 'undefined') {
        const redirectUri = `${window.location.origin}/api/auth/callback/google`;
        const scope = 'openid email profile';
        const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&response_type=token&scope=${encodeURIComponent(scope)}`;
        
        console.log('Initiating Google OAuth 2.0 Flow:', oauthUrl);
      }

      // Giả lập độ trễ xác thực OAuth 2.0 an toàn (500ms)
      await new Promise((resolve) => setTimeout(resolve, 500));
      handleAuthSuccess(MOCK_GOOGLE_USER, 'google');
    } catch (error) {
      console.error('Lỗi đăng nhập Google:', error);
      showToast('Đăng nhập Google không thành công. Vui lòng thử lại!', 'info');
    } finally {
      setIsLoading(false);
    }
  };

  // Đăng nhập Facebook OAuth 2.0
  const loginWithFacebook = async () => {
    setIsLoading(true);
    try {
      const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

      // Nếu có Facebook App ID thực tế được cấu hình:
      if (facebookAppId && typeof window !== 'undefined') {
        const redirectUri = `${window.location.origin}/api/auth/callback/facebook`;
        const oauthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${facebookAppId}&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&scope=email,public_profile`;
        
        console.log('Initiating Facebook OAuth 2.0 Flow:', oauthUrl);
      }

      // Giả lập độ trễ xác thực OAuth 2.0 an toàn (500ms)
      await new Promise((resolve) => setTimeout(resolve, 500));
      handleAuthSuccess(MOCK_FACEBOOK_USER, 'facebook');
    } catch (error) {
      console.error('Lỗi đăng nhập Facebook:', error);
      showToast('Đăng nhập Facebook không thành công. Vui lòng thử lại!', 'info');
    } finally {
      setIsLoading(false);
    }
  };

  // Đăng xuất
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Lỗi xoá session:', e);
    }
    trackLogout();
    showToast('Mẹ đã đăng xuất thành công. Hẹn gặp lại Mẹ nhé! ✨', 'info');
    
    // Nếu đang ở trang tài khoản thì chuyển về trang chủ
    if (pathname === '/tai-khoan') {
      router.push('/');
    }
  };

  // Cập nhật thông tin bé
  const updateBabyInfo = (baby: BabyInfo) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      babyInfo: baby,
    };
    saveUserSession(updatedUser);
  };

  // Cập nhật thông tin cá nhân
  const updateProfile = (profileUpdate: Partial<UserProfile>) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      ...profileUpdate,
    };
    saveUserSession(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isLoginModalOpen,
        redirectUrl,
        openLoginModal,
        closeLoginModal,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        updateBabyInfo,
        updateProfile,
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
