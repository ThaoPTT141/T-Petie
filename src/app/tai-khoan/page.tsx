'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { User, Heart, Package, ShieldCheck, Sparkles, Plus, Edit2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function TaiKhoanPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'baby' | 'orders'>('baby');

  const [babyInfo, setBabyInfo] = useState({
    name: 'Bé Bắp (Nguyễn Tuệ Mẫn)',
    gender: 'girl',
    birthday: '2023-04-15',
    weight: 11.2,
    height: 86,
    recommendedSize: 'Size 2 (10 - 12kg)',
  });

  const [isEditingBaby, setIsEditingBaby] = useState(false);

  const handleSaveBaby = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingBaby(false);
    showToast('Đã lưu thông tin bé yêu! T\'Petie sẽ tự động gợi ý size chuẩn cho mẹ.', 'love');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 space-y-6">
      <Breadcrumb items={[{ label: 'Tài Khoản Mẹ & Bé', href: '/tai-khoan' }]} />

      {/* Header Profile */}
      <div className="bg-gradient-to-r from-cream-100 via-blush-50 to-honey-100 rounded-3xl p-6 border border-cream-200 shadow-card flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-honey-500 text-white flex items-center justify-center text-2xl font-bold font-heading shadow-md">
          M
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold font-heading text-charcoal-900">Mẹ Thu Trang</h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-honey-500 text-white font-bold">
              Thành Viên Thân Thiết ⭐
            </span>
          </div>
          <p className="text-xs text-charcoal-600 mt-0.5">SĐT: 0988.***.456 • Đã tích lũy: 350 điểm</p>
        </div>
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
              className="text-xs font-bold text-honey-600 hover:text-honey-700 flex items-center space-x-1 p-2 rounded-xl bg-honey-50 border border-honey-200"
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
                  <span className="text-xs sm:text-sm font-bold text-charcoal-900">{babyInfo.name}</span>
                </div>
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <span className="text-[11px] text-charcoal-400 block mb-1">Cân Nặng Hiện Tại:</span>
                  <span className="text-xs sm:text-sm font-bold text-honey-600">{babyInfo.weight} kg</span>
                </div>
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <span className="text-[11px] text-charcoal-400 block mb-1">Chiều Cao:</span>
                  <span className="text-xs sm:text-sm font-bold text-charcoal-900">{babyInfo.height} cm</span>
                </div>
                <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200">
                  <span className="text-[11px] text-sage-700 block mb-1">Size Gợi Ý Cho Bé:</span>
                  <span className="text-xs sm:text-sm font-extrabold text-sage-800">{babyInfo.recommendedSize}</span>
                </div>
              </div>

              <div className="p-4 bg-honey-50 rounded-2xl border border-honey-200 text-xs text-honey-800 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-honey-600 shrink-0" />
                <span>Khi mẹ xem sản phẩm, T&apos;Petie sẽ tự động làm nổi bật <strong>{babyInfo.recommendedSize}</strong> để mẹ chọn nhanh nhé!</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveBaby} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Tên Bé:</label>
                  <input
                    type="text"
                    value={babyInfo.name}
                    onChange={(e) => setBabyInfo({ ...babyInfo, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Cân Nặng (kg):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={babyInfo.weight}
                    onChange={(e) => setBabyInfo({ ...babyInfo, weight: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-honey-500 hover:bg-honey-600 text-white text-xs font-bold shadow-sm"
              >
                Lưu Thay Đổi
              </button>
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

          <div className="p-4 rounded-2xl border border-cream-200 bg-cream-50/50 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-charcoal-900">Mã Đơn: #TP-884920</span>
              <span className="px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-700 font-bold text-[10px]">
                Đang Giao Hàng 🚚
              </span>
            </div>
            <div className="text-xs text-charcoal-600 space-y-1">
              <p>• 1 x Váy Công Chúa Voan Tơ Hoa Nhí (Size 2)</p>
              <p>• 1 x Áo Sơ Mi Cổ Sen Thêu Tay (Size 2)</p>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-cream-200 text-xs">
              <span>Tổng tiền:</span>
              <span className="font-bold text-honey-600 text-sm">480.000đ</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: THÔNG TIN MẸ */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-card space-y-4 text-xs text-charcoal-700">
          <h2 className="text-base font-bold font-heading text-charcoal-900 pb-2 border-b border-cream-200">
            Thông Tin Cá Nhân
          </h2>
          <p><strong>Họ và tên:</strong> Nguyễn Thu Trang</p>
          <p><strong>Email:</strong> trang.nguyen@example.com</p>
          <p><strong>Địa chỉ mặc định:</strong> Số 12 Ngõ 45 Cầu Giấy, Hà Nội</p>
        </div>
      )}
    </div>
  );
}
