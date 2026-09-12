'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { User, Heart, Package, Sparkles, Edit2, LogOut, ShieldCheck, Check, ArrowRight } from 'lucide-react';
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
    weight: 11.2,
    height: 86,
    recommendedSize: 'Size 2 (10 - 12kg)',
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
      setBabyForm(user.babyInfo);
      setProfileForm({
        name: user.name,
        phone: user.phone,
        address: user.address,
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

  // 3. Trạng thái ĐÃ ĐĂNG NHẬP (Authenticated with Dynamic Data)
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 space-y-6">
      <Breadcrumb items={[{ label: 'Tài Khoản Mẹ & Bé', href: '/tai-khoan' }]} />

      {/* Header Profile - Dynamic Data Binding */}
      <div className="bg-gradient-to-r from-cream-100 via-blush-50 to-honey-100 rounded-3xl p-6 border border-cream-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          {/* Avatar động */}
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
              <h1 className="text-lg sm:text-xl font-bold font-heading text-charcoal-900">{user.name}</h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-honey-500 text-white font-bold shrink-0">
                {user.membershipTier}
              </span>
              {/* Badge Social Provider */}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/80 border border-cream-300 text-charcoal-600 font-medium inline-flex items-center space-x-1 shrink-0">
                {user.provider === 'google' ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>Google Account</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2]" />
                    <span>Facebook Account</span>
                  </>
                )}
              </span>
            </div>
            <p className="text-xs text-charcoal-600 mt-1">
              SĐT: {user.phone} • Đã tích lũy: <strong className="text-honey-600">{user.points} điểm</strong>
            </p>
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

      {/* TAB 1: HỒ SƠ BÉ YÊU */}
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
            <button
              onClick={() => setIsEditingBaby(!isEditingBaby)}
              className="text-xs font-bold text-honey-600 hover:text-honey-700 flex items-center space-x-1 p-2 rounded-xl bg-honey-50 border border-honey-200 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditingBaby ? 'Hủy Sửa' : 'Chỉnh Sửa'}</span>
            </button>
          </div>

          {!isEditingBaby ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <span className="text-[11px] text-charcoal-400 block mb-1">Tên Thường Gọi:</span>
                  <span className="text-xs sm:text-sm font-bold text-charcoal-900">{babyForm.name}</span>
                </div>
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <span className="text-[11px] text-charcoal-400 block mb-1">Cân Nặng Hiện Tại:</span>
                  <span className="text-xs sm:text-sm font-bold text-honey-600">{babyForm.weight} kg</span>
                </div>
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <span className="text-[11px] text-charcoal-400 block mb-1">Chiều Cao:</span>
                  <span className="text-xs sm:text-sm font-bold text-charcoal-900">{babyForm.height} cm</span>
                </div>
                <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200">
                  <span className="text-[11px] text-sage-700 block mb-1">Size Gợi Ý Cho Bé:</span>
                  <span className="text-xs sm:text-sm font-extrabold text-sage-800">{babyForm.recommendedSize}</span>
                </div>
              </div>

              <div className="p-4 bg-honey-50 rounded-2xl border border-honey-200 text-xs text-honey-800 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-honey-600 shrink-0" />
                <span>Khi mẹ xem sản phẩm, T&apos;Petie sẽ tự động làm nổi bật <strong>{babyForm.recommendedSize}</strong> để mẹ chọn nhanh nhé!</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveBaby} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Tên Bé:</label>
                  <input
                    type="text"
                    required
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
                    value={babyForm.height}
                    onChange={(e) => setBabyForm({ ...babyForm, height: parseInt(e.target.value, 10) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-honey-500 hover:bg-honey-600 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
                >
                  Lưu Thay Đổi
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
            Đơn Hàng Gần Đây Của Mẹ
          </h2>

          {user.orders && user.orders.length > 0 ? (
            <div className="space-y-4">
              {user.orders.map((order) => (
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
            <div className="text-center py-8 text-charcoal-500 text-xs">
              Mẹ chưa có đơn hàng nào tại T&apos;Petie. Hãy cùng khám phá các bộ sưu tập xinh xắn cho con nhé!
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
            <div className="space-y-2.5">
              <p><strong>Họ và tên:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Số điện thoại:</strong> {user.phone}</p>
              <p><strong>Địa chỉ nhận hàng:</strong> {user.address || 'Chưa cập nhật địa chỉ'}</p>
              <p><strong>Phương thức đăng nhập:</strong> {user.provider === 'google' ? 'Google OAuth 2.0' : 'Facebook OAuth 2.0'}</p>
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
                  required
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">Địa chỉ nhận hàng:</label>
                <input
                  type="text"
                  required
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
