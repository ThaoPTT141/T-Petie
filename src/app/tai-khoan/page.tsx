'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { User, Heart, Package, Sparkles, Edit2, LogOut, ShieldCheck, ArrowRight, ShoppingBag, PlusCircle } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { BabyInfo } from '@/types/auth';

// Hàm tính toán size tự động dựa trên cân nặng
function calculateRecommendedSize(weight: number): string {
  if (weight <= 0) return 'Chưa xác định';
  if (weight < 8) return 'Size 0 (Dưới 8kg / 0-6M)';
  if (weight <= 10) return 'Size 1 (8 - 10kg / 6-12M)';
  if (weight <= 12) return 'Size 2 (10 - 12kg / 12-18M)';
  if (weight <= 14) return 'Size 3 (12 - 14kg / 18-24M)';
  if (weight <= 17) return 'Size 4 (14 - 17kg / 2-3Y)';
  return 'Size 5 (17 - 20kg / 3-4Y)';
}

export default function TaiKhoanPage() {
  const { showToast } = useToast();
  const { user, isAuthenticated, isLoading, logout, updateBabyInfo, updateProfile, openLoginModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'baby' | 'orders'>('baby');

  // Form State cho Bé
  const [babyForm, setBabyForm] = useState<BabyInfo>({
    name: '',
    gender: 'girl',
    birthday: '',
    weight: 10.0,
    height: 80,
    recommendedSize: 'Size 1 (8 - 10kg / 6-12M)',
  });
  const [isEditingBaby, setIsEditingBaby] = useState(false);

  // Form State cho Thông tin Mẹ
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Đồng bộ form khi user thay đổi
  useEffect(() => {
    if (user) {
      if (user.babyInfo) {
        setBabyForm(user.babyInfo);
      }
      setProfileForm({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  // Lưu thông tin bé
  const handleSaveBaby = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSize = calculateRecommendedSize(babyForm.weight);
    const newBabyData: BabyInfo = {
      ...babyForm,
      recommendedSize: updatedSize,
    };
    setBabyForm(newBabyData);
    updateBabyInfo(newBabyData);
    setIsEditingBaby(false);
    showToast(`Đã lưu thông tin bé yêu! Size gợi ý chuẩn: ${updatedSize}`, 'love');
  };

  // Lưu thông tin cá nhân của mẹ
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditingProfile(false);
    showToast('Đã cập nhật thông tin cá nhân của Mẹ thành công! ✨', 'success');
  };

  // 1. Trạng thái Loading ban đầu
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-honey-200 border-t-honey-500 rounded-full animate-spin mx-auto" />
        <p className="text-sm text-charcoal-600">Đang đồng bộ dữ liệu tài khoản Mẹ &amp; Bé...</p>
      </div>
    );
  }

  // 2. Trạng thái Chưa Đăng Nhập
  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <Breadcrumb items={[{ label: 'Tài Khoản Mẹ & Bé', href: '/tai-khoan' }]} />

        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-cream-200 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-honey-100 text-honey-600 flex items-center justify-center mx-auto text-2xl shadow-inner">
            👶
          </div>
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-charcoal-900">
              Mẹ Chưa Đăng Nhập Tài Khoản
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
              Vui lòng đăng nhập qua Google hoặc Facebook để truy cập Hồ sơ bé yêu, theo dõi đơn hàng và nhận gợi ý kích thước trang phục chính xác nhất.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 text-left text-xs sm:text-sm text-charcoal-700 space-y-2">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-blush-500 shrink-0 fill-blush-500" />
              <span>Lưu thông tin chiều cao, cân nặng bé để T&apos;Petie gợi ý size tự động</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-honey-500 shrink-0" />
              <span>Tích lũy điểm thưởng đổi voucher quà tặng độc quyền</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-sage-500 shrink-0" />
              <span>Xác thực an toàn tuyệt đối với OAuth 2.0</span>
            </div>
          </div>

          <button
            onClick={() => openLoginModal('/tai-khoan')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-honey-500 hover:bg-honey-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 mx-auto active:scale-95"
          >
            <span>Đăng Nhập Ngay Bằng Google / Facebook</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const hasBabyInfo = Boolean(user.babyInfo && user.babyInfo.name && user.babyInfo.name.trim() !== '');
  const hasPhone = Boolean(user.phone && user.phone.trim() !== '');
  const userPoints = user.points ?? 0;
  const userOrders = user.orders ?? [];

  // 3. Trạng thái ĐÃ ĐĂNG NHẬP (Authenticated with Dynamic Session Data)
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 space-y-6">
      <Breadcrumb items={[{ label: 'Tài Khoản Mẹ & Bé', href: '/tai-khoan' }]} />

      {/* Header Profile - Dynamic Data Binding */}
      <div className="bg-gradient-to-r from-cream-100 via-blush-50 to-honey-100 rounded-3xl p-6 border border-cream-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          {/* Avatar động lấy từ session Google/Facebook */}
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-honey-400 shadow-md shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-honey-500 text-white flex items-center justify-center text-2xl font-bold font-heading shadow-md shrink-0">
              {user.name.charAt(0)}
            </div>
          )}

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Tên mẹ từ session */}
              <h1 className="text-lg sm:text-xl font-bold font-heading text-charcoal-900">{user.name}</h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-honey-500 text-white font-bold shrink-0">
                {user.membershipTier || 'Thành Viên Mới 🌱'}
              </span>
              {/* Email từ session thay thế text tĩnh */}
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/90 border border-cream-300 text-charcoal-700 font-medium inline-flex items-center space-x-1 shrink-0">
                <span>{user.email}</span>
              </span>
            </div>

            {/* SĐT & Điểm tích luỹ động */}
            <div className="text-xs text-charcoal-600 mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <div>
                <span>SĐT: </span>
                {hasPhone ? (
                  <span className="font-semibold text-charcoal-800">{user.phone}</span>
                ) : (
                  <span className="inline-flex items-center space-x-1">
                    <span className="text-charcoal-400 italic">Chưa cập nhật SĐT</span>
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setIsEditingProfile(true);
                      }}
                      className="text-[11px] font-bold text-honey-600 hover:text-honey-700 underline ml-1"
                    >
                      [Thêm SĐT]
                    </button>
                  </span>
                )}
              </div>
              <span>•</span>
              <div>
                <span>Đã tích lũy: </span>
                <strong className="text-honey-600 font-bold">{userPoints} điểm</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Nút Đăng Xuất */}
        <button
          onClick={logout}
          className="self-start sm:self-center px-4 py-2 rounded-2xl bg-white/80 hover:bg-white text-xs font-semibold text-charcoal-600 hover:text-blush-600 border border-cream-300 transition-colors flex items-center space-x-1.5 shadow-2xs"
          title="Đăng xuất tài khoản"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Đăng Xuất</span>
        </button>
      </div>

      {/* 3 Tab Điều Hướng */}
      <div className="bg-cream-100 p-1.5 rounded-2xl flex gap-1">
        {[
          { id: 'baby', label: '👶 Hồ Sơ Bé Yêu & Gợi Ý Size', icon: Heart },
          { id: 'orders', label: '📦 Lịch Sử Đơn Hàng', icon: Package },
          { id: 'profile', label: '👤 Thông Tin Mẹ', icon: User },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-1.5 ${
                isActive ? 'bg-white text-honey-600 shadow-sm' : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: HỒ SƠ BÉ YÊU (Xử lý Empty State) */}
      {activeTab === 'baby' && (
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-charcoal-900">
                Thông Tin Thể Trạng Của Bé
              </h2>
              <p className="text-xs text-charcoal-400">
                Hệ thống tự động đề xuất kích cỡ quần áo vừa vặn nhất cho con
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

          {/* TRƯỜNG HỢP 1: ĐÃ CÓ HỒ SƠ BÉ VÀ KHÔNG Ở CHẾ ĐỘ SỬA */}
          {hasBabyInfo && !isEditingBaby && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <span className="text-[11px] text-charcoal-400 block mb-1">Tên Thường Gọi:</span>
                  <span className="text-xs sm:text-sm font-bold text-charcoal-900">{user.babyInfo?.name}</span>
                </div>
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <span className="text-[11px] text-charcoal-400 block mb-1">Cân Nặng Hiện Tại:</span>
                  <span className="text-xs sm:text-sm font-bold text-honey-600">{user.babyInfo?.weight} kg</span>
                </div>
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <span className="text-[11px] text-charcoal-400 block mb-1">Chiều Cao:</span>
                  <span className="text-xs sm:text-sm font-bold text-charcoal-900">{user.babyInfo?.height} cm</span>
                </div>
                <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200">
                  <span className="text-[11px] text-sage-700 block mb-1">Size Gợi Ý Cho Bé:</span>
                  <span className="text-xs sm:text-sm font-extrabold text-sage-800">{user.babyInfo?.recommendedSize}</span>
                </div>
              </div>

              <div className="p-4 bg-honey-50 rounded-2xl border border-honey-200 text-xs text-honey-800 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-honey-600 shrink-0" />
                <span>Khi mẹ xem sản phẩm, T&apos;Petie sẽ tự động làm nổi bật <strong>{user.babyInfo?.recommendedSize}</strong> để mẹ chọn nhanh nhé!</span>
              </div>
            </div>
          )}

          {/* TRƯỜNG HỢP 2: CHƯA CÓ HỒ SƠ BÉ (EMPTY STATE) */}
          {!hasBabyInfo && !isEditingBaby && (
            <div className="p-8 text-center bg-cream-50/60 rounded-3xl border border-dashed border-cream-300 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blush-50 text-blush-500 border border-blush-200 flex items-center justify-center mx-auto shadow-2xs">
                <Heart className="w-7 h-7 fill-blush-400 text-blush-500" />
              </div>
              <div className="space-y-1.5 max-w-sm mx-auto">
                <h3 className="text-sm sm:text-base font-bold text-charcoal-900 font-heading">
                  Mẹ chưa tạo hồ sơ cho bé
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Cập nhật ngay để T&apos;Petie gợi ý size tự động nhé!
                </p>
              </div>
              <button
                onClick={() => setIsEditingBaby(true)}
                className="px-6 py-2.5 rounded-full bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs shadow-sm hover:shadow transition-all inline-flex items-center space-x-1.5 active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Thêm Hồ Sơ</span>
              </button>
            </div>
          )}

          {/* TRƯỜNG HỢP 3: FORM NHẬP / CHỈNH SỬA HỒ SƠ BÉ */}
          {isEditingBaby && (
            <form onSubmit={handleSaveBaby} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Tên Thường Gọi Của Bé:</label>
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
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Cân Nặng (kg):</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="50"
                    required
                    placeholder="VD: 10.5"
                    value={babyForm.weight}
                    onChange={(e) => setBabyForm({ ...babyForm, weight: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Chiều Cao (cm):</label>
                  <input
                    type="number"
                    step="1"
                    min="30"
                    max="160"
                    required
                    placeholder="VD: 85"
                    value={babyForm.height}
                    onChange={(e) => setBabyForm({ ...babyForm, height: parseInt(e.target.value, 10) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-honey-500 hover:bg-honey-600 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
                >
                  {hasBabyInfo ? 'Lưu Thay Đổi' : 'Lưu Hồ Sơ Bé'}
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

      {/* TAB 2: LỊCH SỬ ĐƠN HÀNG (Xử lý Empty State) */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-card space-y-4">
          <h2 className="text-base font-bold font-heading text-charcoal-900 pb-2 border-b border-cream-200">
            Đơn Hàng Gần Đây Của Mẹ
          </h2>

          {userOrders.length > 0 ? (
            <div className="space-y-4">
              {userOrders.map((order) => (
                <div key={order.id} className="p-4 rounded-2xl border border-cream-200 bg-cream-50/50 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-charcoal-900">Mã Đơn: {order.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-700 font-bold text-[10px]">
                      {order.statusText}
                    </span>
                  </div>
                  <div className="text-xs text-charcoal-600 space-y-1">
                    {order.items.map((item, idx) => (
                      <p key={idx}>
                        • {item.quantity} x {item.name} ({item.size})
                      </p>
                    ))}
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-cream-200 text-xs">
                    <span className="text-charcoal-500">Ngày đặt: {order.date}</span>
                    <div>
                      <span className="text-charcoal-500 mr-1">Tổng tiền:</span>
                      <span className="font-bold text-honey-600 text-sm">
                        {order.total.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* EMPTY STATE CHO ĐƠN HÀNG */
            <div className="p-8 text-center bg-cream-50/60 rounded-3xl border border-dashed border-cream-300 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-cream-100 text-charcoal-400 border border-cream-200 flex items-center justify-center mx-auto shadow-2xs">
                <ShoppingBag className="w-7 h-7 text-honey-500" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="text-sm sm:text-base font-bold text-charcoal-900 font-heading">
                  Chưa có đơn hàng nào
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Mẹ chưa có đơn hàng nào tại T&apos;Petie. Hãy cùng khám phá các bộ sưu tập xinh xắn cho bé nhé!
                </p>
              </div>
              <Link
                href="/be-gai"
                className="px-6 py-2.5 rounded-full bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs shadow-sm hover:shadow transition-all inline-flex items-center space-x-1.5 active:scale-95"
              >
                <span>Mua sắm ngay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: THÔNG TIN MẸ */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-card space-y-4 text-xs text-charcoal-700">
          <div className="flex items-center justify-between pb-2 border-b border-cream-200">
            <h2 className="text-base font-bold font-heading text-charcoal-900">
              Thông Tin Cá Nhân
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
                <strong className="text-charcoal-900 block mb-0.5">Họ và tên:</strong>
                <span>{user.name}</span>
              </div>
              <div>
                <strong className="text-charcoal-900 block mb-0.5">Email tài khoản:</strong>
                <span>{user.email}</span>
              </div>
              <div>
                <strong className="text-charcoal-900 block mb-0.5">Số điện thoại:</strong>
                {hasPhone ? (
                  <span>{user.phone}</span>
                ) : (
                  <span className="text-charcoal-400 italic">Chưa cập nhật SĐT</span>
                )}
              </div>
              <div>
                <strong className="text-charcoal-900 block mb-0.5">Địa chỉ nhận hàng:</strong>
                <span>{user.address || 'Chưa cập nhật địa chỉ'}</span>
              </div>
              <div>
                <strong className="text-charcoal-900 block mb-0.5">Phương thức đăng nhập:</strong>
                <span className="capitalize">{user.provider === 'google' ? 'Google OAuth 2.0' : 'Facebook OAuth 2.0'}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">Họ và tên:</label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">Số điện thoại:</label>
                <input
                  type="text"
                  placeholder="VD: 0988123456"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">Địa chỉ nhận hàng:</label>
                <input
                  type="text"
                  placeholder="VD: Số 12 Ngõ 45 Cầu Giấy, Hà Nội"
                  value={profileForm.address}
                  onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
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
