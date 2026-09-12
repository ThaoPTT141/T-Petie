'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import {
  User,
  Heart,
  Package,
  Sparkles,
  Edit2,
  LogOut,
  ArrowRight,
  ShoppingBag,
  PlusCircle,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

// Định nghĩa kiểu dữ liệu cho thông tin bé
interface BabyInfo {
  name: string;
  gender: 'boy' | 'girl';
  birthday: string;
  weight: number;
  height: number;
  recommendedSize: string;
}

// Hàm tính toán size tự động dựa trên cân nặng bé
function calculateRecommendedSize(weight: number): string {
  if (weight <= 0) return 'Chưa xác định';
  if (weight < 8) return 'Size 0 (Dưới 8kg / 0-6M)';
  if (weight <= 10) return 'Size 1 (8 - 10kg / 6-12M)';
  if (weight <= 12) return 'Size 2 (10 - 12kg / 12-18M)';
  if (weight <= 14) return 'Size 3 (12 - 14kg / 18-24M)';
  if (weight <= 17) return 'Size 4 (14 - 17kg / 2-3Y)';
  return 'Size 5 (17 - 20kg / 3-4Y)';
}

export default function DashboardAccountPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'baby' | 'orders' | 'profile'>('baby');

  // Form State cho Bé (Lưu trữ và đồng bộ cục bộ)
  const [babyInfo, setBabyInfo] = useState<BabyInfo | null>(null);
  const [babyForm, setBabyForm] = useState<BabyInfo>({
    name: '',
    gender: 'girl',
    birthday: '',
    weight: 10.0,
    height: 80,
    recommendedSize: 'Size 1 (8 - 10kg / 6-12M)',
  });
  const [isEditingBaby, setIsEditingBaby] = useState(false);

  // Form State cho Thông tin phụ của Mẹ (SĐT, Địa chỉ)
  const [extraProfile, setExtraProfile] = useState({
    phone: '',
    address: '',
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Khôi phục dữ liệu bổ sung từ localStorage theo email người dùng
  useEffect(() => {
    if (session?.user?.email) {
      const userKey = `tpetie_profile_${session.user.email}`;
      try {
        const saved = localStorage.getItem(userKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.babyInfo) {
            setBabyInfo(parsed.babyInfo);
            setBabyForm(parsed.babyInfo);
          }
          if (parsed.extraProfile) {
            setExtraProfile(parsed.extraProfile);
          }
        }
      } catch (e) {
        console.error('Lỗi đọc dữ liệu người dùng:', e);
      }
    }
  }, [session]);

  // Xử lý chuyển hướng nếu chưa đăng nhập (unauthenticated)
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status, router]);

  // 1. Trạng thái ĐANG TẢI (Loading) -> Skeleton Loader
  if (status === 'loading') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-36 bg-cream-200 rounded-lg" />

        {/* Profile Card Skeleton */}
        <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="w-16 h-16 rounded-full bg-cream-200 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-5 w-40 bg-cream-200 rounded" />
              <div className="h-3.5 w-56 bg-cream-200 rounded" />
            </div>
          </div>
          <div className="h-9 w-28 bg-cream-200 rounded-2xl shrink-0 self-end sm:self-center" />
        </div>

        {/* Tabs Skeleton */}
        <div className="h-12 w-full bg-cream-200 rounded-2xl" />

        {/* Tab Content Skeleton */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 space-y-4">
          <div className="h-6 w-48 bg-cream-200 rounded" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="h-20 bg-cream-100 rounded-2xl" />
            <div className="h-20 bg-cream-100 rounded-2xl" />
            <div className="h-20 bg-cream-100 rounded-2xl" />
            <div className="h-20 bg-cream-100 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Trạng thái CHƯA ĐĂNG NHẬP (Unauthenticated)
  if (status === 'unauthenticated' || !session?.user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-10 h-10 border-3 border-honey-200 border-t-honey-500 rounded-full animate-spin mx-auto" />
        <p className="text-sm text-charcoal-600">Đang chuyển hướng về trang chủ...</p>
      </div>
    );
  }

  // Lưu thông tin bé
  const handleSaveBaby = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSize = calculateRecommendedSize(babyForm.weight);
    const newBabyData: BabyInfo = {
      ...babyForm,
      recommendedSize: updatedSize,
    };
    setBabyInfo(newBabyData);
    setBabyForm(newBabyData);
    setIsEditingBaby(false);

    // Lưu vào LocalStorage
    if (session?.user?.email) {
      const userKey = `tpetie_profile_${session.user.email}`;
      const prev = JSON.parse(localStorage.getItem(userKey) || '{}');
      localStorage.setItem(userKey, JSON.stringify({ ...prev, babyInfo: newBabyData }));
    }

    showToast(`Đã lưu thông tin bé yêu! Size gợi ý chuẩn: ${updatedSize}`, 'love');
  };

  // Lưu thông tin cá nhân bổ sung của mẹ
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);

    if (session?.user?.email) {
      const userKey = `tpetie_profile_${session.user.email}`;
      const prev = JSON.parse(localStorage.getItem(userKey) || '{}');
      localStorage.setItem(userKey, JSON.stringify({ ...prev, extraProfile }));
    }

    showToast('Đã cập nhật thông tin cá nhân của Mẹ thành công! ✨', 'success');
  };

  // Xử lý Đăng xuất
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // Trích xuất dữ liệu người dùng từ Session
  const userName = session.user.name || 'Mẹ Bỉm Sữa';
  const userEmail = session.user.email || 'Chưa liên kết email';
  const userAvatar = session.user.image;
  const userInitial = userName.trim().charAt(0).toUpperCase();

  const hasBabyInfo = Boolean(babyInfo && babyInfo.name && babyInfo.name.trim() !== '');

  // 3. Trạng thái ĐÃ ĐĂNG NHẬP (Authenticated) -> Render Dashboard
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Breadcrumb điều hướng */}
      <Breadcrumb items={[{ label: 'Tài Khoản Mẹ & Bé', href: '/tai-khoan' }]} />

      {/* Header Profile Card - Dynamic Data Binding từ Session */}
      <div className="relative bg-gradient-to-r from-cream-100 via-blush-50 to-honey-100 rounded-3xl p-5 sm:p-6 border border-cream-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden">
        {/* Glow hiệu ứng */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-honey-200/40 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center space-x-4 z-10">
          {/* Avatar động lấy từ session.user.image */}
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-honey-400 shadow-md shrink-0 bg-white">
            {userAvatar ? (
              <Image
                src={userAvatar}
                alt={userName}
                fill
                sizes="72px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-honey-400 to-blush-400 text-white flex items-center justify-center text-2xl font-bold font-heading shadow-inner">
                {userInitial}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              {/* Tên thật từ session.user.name */}
              <h1 className="text-lg sm:text-xl font-bold font-heading text-charcoal-900">
                {userName}
              </h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-honey-500 text-white font-bold shrink-0">
                Thành Viên T&apos;Petie 🌱
              </span>
            </div>

            {/* Email thật từ session.user.email */}
            <div className="flex items-center space-x-1.5 text-xs text-charcoal-600">
              <Mail className="w-3.5 h-3.5 text-honey-600 shrink-0" />
              <span className="truncate max-w-[220px] sm:max-w-none">{userEmail}</span>
            </div>

            {/* SĐT & Điểm tích lũy */}
            <div className="text-xs text-charcoal-600 flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5">
              <span>
                SĐT:{' '}
                {extraProfile.phone ? (
                  <strong className="text-charcoal-800 font-semibold">{extraProfile.phone}</strong>
                ) : (
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setIsEditingProfile(true);
                    }}
                    className="text-honey-600 underline font-semibold hover:text-honey-700"
                  >
                    Thêm SĐT
                  </button>
                )}
              </span>
              <span>•</span>
              <span>
                Tích lũy: <strong className="text-honey-600 font-bold">50 điểm</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Nút Đăng Xuất với next-auth signOut */}
        <button
          onClick={handleLogout}
          className="z-10 self-start sm:self-center px-4 py-2.5 rounded-2xl bg-white/90 hover:bg-white text-xs font-semibold text-charcoal-700 hover:text-blush-600 border border-cream-300 transition-all flex items-center space-x-2 shadow-xs active:scale-95"
          title="Đăng xuất tài khoản"
        >
          <LogOut className="w-4 h-4 text-blush-500" />
          <span>Đăng Xuất</span>
        </button>
      </div>

      {/* Tabs Điều Hướng */}
      <div className="bg-cream-100 p-1.5 rounded-2xl flex gap-1">
        {[
          { id: 'baby', label: '👶 Hồ Sơ Bé Yêu & Size', icon: Heart },
          { id: 'orders', label: '📦 Lịch Sử Đơn Hàng', icon: Package },
          { id: 'profile', label: '👤 Thông Tin Của Mẹ', icon: User },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-1.5 ${
                isActive
                  ? 'bg-white text-honey-600 shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: HỒ SƠ BÉ YÊU & GỢI Ý SIZE */}
      {activeTab === 'baby' && (
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-charcoal-900">
                Thông Tin Thể Trạng Bé Yêu
              </h2>
              <p className="text-xs text-charcoal-500">
                Hệ thống tự động gợi ý size đồ vừa vặn nhất dựa trên cân nặng của bé
              </p>
            </div>
            {hasBabyInfo && (
              <button
                onClick={() => setIsEditingBaby(!isEditingBaby)}
                className="text-xs font-bold text-honey-600 hover:text-honey-700 flex items-center space-x-1 p-2 rounded-xl bg-honey-50 border border-honey-200 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditingBaby ? 'Hủy Sửa' : 'Chỉnh Sửa'}</span>
              </button>
            )}
          </div>

          {/* ĐÃ CÓ HỒ SƠ BÉ */}
          {hasBabyInfo && !isEditingBaby && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <span className="text-[11px] text-charcoal-400 block mb-1">Tên Bé Yêu:</span>
                  <span className="text-xs sm:text-sm font-bold text-charcoal-900">{babyInfo?.name}</span>
                </div>
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <span className="text-[11px] text-charcoal-400 block mb-1">Cân Nặng:</span>
                  <span className="text-xs sm:text-sm font-bold text-honey-600">{babyInfo?.weight} kg</span>
                </div>
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <span className="text-[11px] text-charcoal-400 block mb-1">Chiều Cao:</span>
                  <span className="text-xs sm:text-sm font-bold text-charcoal-900">{babyInfo?.height} cm</span>
                </div>
                <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200">
                  <span className="text-[11px] text-sage-700 block mb-1">Size Gợi Ý Chuẩn:</span>
                  <span className="text-xs sm:text-sm font-extrabold text-sage-800">
                    {babyInfo?.recommendedSize}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-honey-50 rounded-2xl border border-honey-200 text-xs text-honey-800 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-honey-600 shrink-0" />
                <span>
                  Khi xem các sản phẩm thời trang, T&apos;Petie sẽ tự động làm nổi bật{' '}
                  <strong>{babyInfo?.recommendedSize}</strong> để Mẹ mua sắm nhanh chóng nhất!
                </span>
              </div>
            </div>
          )}

          {/* EMPTY STATE - CHƯA CÓ HỒ SƠ */}
          {!hasBabyInfo && !isEditingBaby && (
            <div className="p-8 text-center bg-cream-50/60 rounded-3xl border border-dashed border-cream-300 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blush-50 text-blush-500 border border-blush-200 flex items-center justify-center mx-auto shadow-2xs">
                <Heart className="w-7 h-7 fill-blush-400 text-blush-500" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="text-sm sm:text-base font-bold text-charcoal-900 font-heading">
                  Mẹ chưa cập nhật hồ sơ của bé
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Điền thông tin cân nặng của con để nhận đề xuất size chuẩn xác từng centimet nhé!
                </p>
              </div>
              <button
                onClick={() => setIsEditingBaby(true)}
                className="px-6 py-2.5 rounded-full bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs shadow-sm hover:shadow transition-all inline-flex items-center space-x-1.5 active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Thêm Hồ Sơ Bé Ngay</span>
              </button>
            </div>
          )}

          {/* FORM NHẬP / CHỈNH SỬA HỒ SƠ BÉ */}
          {isEditingBaby && (
            <form onSubmit={handleSaveBaby} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                    Tên Thường Gọi Của Bé:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Bé Bắp, Bé Sữa..."
                    value={babyForm.name}
                    onChange={(e) => setBabyForm({ ...babyForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                    Cân Nặng (kg):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="50"
                    required
                    placeholder="VD: 10.5"
                    value={babyForm.weight}
                    onChange={(e) =>
                      setBabyForm({ ...babyForm, weight: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                    Chiều Cao (cm):
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="30"
                    max="160"
                    required
                    placeholder="VD: 85"
                    value={babyForm.height}
                    onChange={(e) =>
                      setBabyForm({ ...babyForm, height: parseInt(e.target.value, 10) || 0 })
                    }
                    className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-honey-500 hover:bg-honey-600 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
                >
                  {hasBabyInfo ? 'Lưu Cập Nhật' : 'Lưu Hồ Sơ Bé'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingBaby(false)}
                  className="px-4 py-2.5 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-700 text-xs font-semibold transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* TAB 2: LỊCH SỬ ĐƠN HÀNG */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-card space-y-4">
          <h2 className="text-base font-bold font-heading text-charcoal-900 pb-2 border-b border-cream-200">
            Đơn Hàng Gần Đây
          </h2>

          <div className="p-8 text-center bg-cream-50/60 rounded-3xl border border-dashed border-cream-300 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-cream-100 text-charcoal-400 border border-cream-200 flex items-center justify-center mx-auto shadow-2xs">
              <ShoppingBag className="w-7 h-7 text-honey-500" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="text-sm sm:text-base font-bold text-charcoal-900 font-heading">
                Mẹ chưa có đơn hàng nào
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Khám phá ngay các bộ sưu tập thiết kế mới nhất để chọn cho bé những bộ cánh xinh xắn nhất nhé!
              </p>
            </div>
            <Link
              href="/be-gai"
              className="px-6 py-2.5 rounded-full bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs shadow-sm hover:shadow transition-all inline-flex items-center space-x-1.5 active:scale-95"
            >
              <span>Khám Phá Cửa Hàng</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* TAB 3: THÔNG TIN CỦA MẸ */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-card space-y-4 text-xs text-charcoal-700">
          <div className="flex items-center justify-between pb-2 border-b border-cream-200">
            <h2 className="text-base font-bold font-heading text-charcoal-900">
              Thông Tin Tài Khoản Mẹ
            </h2>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="text-xs font-bold text-honey-600 hover:text-honey-700 flex items-center space-x-1 p-2 rounded-xl bg-honey-50 border border-honey-200 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditingProfile ? 'Hủy' : 'Chỉnh Sửa'}</span>
            </button>
          </div>

          {!isEditingProfile ? (
            <div className="space-y-3">
              <div>
                <strong className="text-charcoal-900 block mb-0.5">Họ và tên (Session):</strong>
                <span className="text-charcoal-800 font-medium">{userName}</span>
              </div>
              <div>
                <strong className="text-charcoal-900 block mb-0.5">Email tài khoản (Session):</strong>
                <span className="text-charcoal-800 font-medium">{userEmail}</span>
              </div>
              <div>
                <strong className="text-charcoal-900 block mb-0.5">Số điện thoại giao hàng:</strong>
                {extraProfile.phone ? (
                  <span className="text-charcoal-800">{extraProfile.phone}</span>
                ) : (
                  <span className="text-charcoal-400 italic">Chưa cập nhật SĐT</span>
                )}
              </div>
              <div>
                <strong className="text-charcoal-900 block mb-0.5">Địa chỉ nhận hàng:</strong>
                <span className="text-charcoal-800">
                  {extraProfile.address || 'Chưa cập nhật địa chỉ giao hàng'}
                </span>
              </div>
              <div className="pt-2 flex items-center space-x-1.5 text-sage-600">
                <ShieldCheck className="w-4 h-4" />
                <span>Tài khoản được bảo vệ bởi NextAuth &amp; OAuth 2.0</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                  Họ và tên (Đồng bộ từ OAuth):
                </label>
                <input
                  type="text"
                  disabled
                  value={userName}
                  className="w-full p-2.5 rounded-xl border border-cream-200 text-xs bg-cream-100 text-charcoal-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                  Email (Đồng bộ từ OAuth):
                </label>
                <input
                  type="email"
                  disabled
                  value={userEmail}
                  className="w-full p-2.5 rounded-xl border border-cream-200 text-xs bg-cream-100 text-charcoal-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                  Số điện thoại nhận hàng:
                </label>
                <input
                  type="tel"
                  placeholder="VD: 0988123456"
                  value={extraProfile.phone}
                  onChange={(e) => setExtraProfile({ ...extraProfile, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                  Địa chỉ nhận hàng mặc định:
                </label>
                <input
                  type="text"
                  placeholder="VD: Số 12 Ngõ 45 Cầu Giấy, Hà Nội"
                  value={extraProfile.address}
                  onChange={(e) => setExtraProfile({ ...extraProfile, address: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                />
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-honey-500 hover:bg-honey-600 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
                >
                  Lưu Thông Tin
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2.5 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-700 text-xs font-semibold transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
