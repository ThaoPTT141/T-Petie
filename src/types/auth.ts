/**
 * Type definitions cho Hệ Thống Xác Thực & Quản Lý Tài Khoản Mẹ & Bé (T'Petie)
 */

export type SocialProvider = 'google' | 'facebook';

export interface BabyInfo {
  name: string;
  gender: 'girl' | 'boy';
  birthday: string;
  weight: number; // kg
  height: number; // cm
  recommendedSize: string;
}

export interface UserOrder {
  id: string;
  date: string;
  status: 'pending' | 'shipping' | 'delivered' | 'cancelled';
  statusText: string;
  items: Array<{
    name: string;
    size: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  address?: string;
  provider: SocialProvider;
  points: number;
  membershipTier: string;
  babyInfo?: BabyInfo | null;
  orders?: UserOrder[];
  createdAt: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoginModalOpen: boolean;
  redirectUrl: string | null;
  openLoginModal: (redirectUrl?: string) => void;
  closeLoginModal: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => void;
  updateBabyInfo: (baby: BabyInfo) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}
