'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  X,
  Loader2,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPriceCompact } from '@/lib/utils/formatters';
import { useToast } from '@/context/ToastContext';
import { trackBeginCheckout } from '@/lib/analytics/tracker';

// Link nhúng Google Form đặt hàng T'Petie
// Form ID lấy từ link edit: https://docs.google.com/forms/d/1-OveB-NXwpsKmen341Zyx-G5nzOqzdfwLH9obB0_db4/edit
const GOOGLE_FORM_EMBED_URL =
  'https://docs.google.com/forms/d/1-OveB-NXwpsKmen341Zyx-G5nzOqzdfwLH9obB0_db4/viewform?embedded=true';

export default function GioHangPage() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const { showToast } = useToast();

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formLoading, setFormLoading] = useState(true);

  const shippingFee = totalPrice >= 399000 || totalPrice === 0 ? 0 : 30000;
  const finalTotal = Math.max(0, totalPrice + shippingFee - discountAmount);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'TPETIE20') {
      setDiscountAmount(20000);
      showToast('Đã áp dụng mã giảm giá 20.000đ!', 'success');
    } else if (couponCode.toUpperCase() === 'MEMBERVIP') {
      setDiscountAmount(Math.round(totalPrice * 0.1));
      showToast('Đã áp dụng mã giảm 10% thành viên mới!', 'success');
    } else {
      showToast('Mã giảm giá không hợp lệ hoặc đã hết hạn', 'info');
    }
  };

  const handleStartCheckout = () => {
    // Kích hoạt analytics begin_checkout
    trackBeginCheckout(
      items.map((i) => ({
        item_id: i.productId,
        item_name: i.productName,
        price: i.price,
        quantity: i.quantity,
      })),
      finalTotal
    );
    // Mở modal Google Form
    setFormLoading(true);
    setShowFormModal(true);
  };

  const handleCloseModal = () => {
    setShowFormModal(false);
    setFormLoading(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 space-y-6">

      {/* ===== MODAL GOOGLE FORM ===== */}
      {showFormModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '90vh' }}
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-honey-400 to-honey-500 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="text-xl">📝</span>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Đặt Hàng T&apos;Petie</p>
                  <p className="text-honey-100 text-[11px]">Điền thông tin để T&apos;Petie giao hàng đến mẹ nhé 🌸</p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                aria-label="Đóng form đặt hàng"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Loading Spinner */}
            {formLoading && (
              <div className="absolute inset-0 top-[56px] flex items-center justify-center bg-cream-50 z-10">
                <div className="text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-honey-500 animate-spin mx-auto" />
                  <p className="text-xs text-charcoal-500">Đang tải form đặt hàng...</p>
                </div>
              </div>
            )}

            {/* Google Form Iframe */}
            <iframe
              src={GOOGLE_FORM_EMBED_URL}
              title="Form đặt hàng T'Petie"
              className="w-full flex-1"
              style={{ minHeight: '520px', border: 'none' }}
              onLoad={() => setFormLoading(false)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            />

            {/* Footer hint */}
            <div className="px-5 py-3 bg-cream-50 border-t border-cream-200 text-center shrink-0">
              <p className="text-[11px] text-charcoal-400">
                Sau khi gửi form, T&apos;Petie sẽ liên hệ xác nhận đơn qua SĐT trong vòng 30 phút ⏰
              </p>
            </div>
          </div>
        </div>
      )}

      <Breadcrumb
        items={[
          { label: 'Giỏ Hàng', href: '/gio-hang' },
        ]}
      />

      {/* ===== GIỎ HÀNG ===== */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-charcoal-900">
            Giỏ Hàng Của Mẹ ({totalItems} món)
          </h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-charcoal-400 hover:text-red-500 font-medium"
            >
              Xóa tất cả
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-cream-200 p-10 text-center space-y-4 shadow-card">
            <div className="text-5xl">🛍️</div>
            <h2 className="text-lg font-bold font-heading text-charcoal-900">
              Giỏ hàng của mẹ hiện đang trống
            </h2>
            <p className="text-xs text-charcoal-600 max-w-sm mx-auto">
              Hãy ghé xem những mẫu váy áo trong BST mới nhất của T&apos;Petie để chọn cho bé yêu nhé!
            </p>
            <Link
              href="/be-gai"
              className="inline-block px-6 py-3 rounded-full bg-honey-500 text-white text-xs font-bold shadow-md hover:bg-honey-600 active:scale-95 transition-all"
            >
              Khám Phá Sản Phẩm Ngay
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Danh Sách Sản Phẩm */}
            <div className="lg:col-span-2 space-y-3">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.selectedSize}`}
                  className="bg-white p-4 rounded-2xl border border-cream-200 shadow-card flex space-x-3 sm:space-x-4 items-center"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-100 shrink-0 border border-cream-200">
                    <Image
                      src={item.thumbnail}
                      alt={item.productName}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xs sm:text-sm font-bold text-charcoal-900 line-clamp-1">
                        {item.productName}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.productId, item.selectedSize)}
                        className="text-charcoal-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-sage-700 font-semibold mt-0.5">
                      Kích cỡ: {item.selectedSize}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm sm:text-base font-bold text-honey-600 font-heading">
                        {formatPriceCompact(item.price * item.quantity)}
                      </span>

                      <div className="flex items-center border border-cream-300 rounded-lg bg-cream-50">
                        <button
                          onClick={() => updateQuantity(item.productId, item.selectedSize, -1)}
                          className="p-1.5 hover:bg-cream-200 text-charcoal-600 rounded-l-lg"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-charcoal-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.selectedSize, 1)}
                          className="p-1.5 hover:bg-cream-200 text-charcoal-600 rounded-r-lg"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tóm Tắt & Mã Giảm Giá */}
            <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-card space-y-4 h-fit">
              <h2 className="font-heading font-bold text-base text-charcoal-900 pb-2 border-b border-cream-200">
                Tóm Tắt Đơn Hàng
              </h2>

              {/* Nhập Coupon */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-charcoal-700">Mã Khuyến Mãi:</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập TPETIE20..."
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:border-honey-500 uppercase"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-3 py-2 rounded-xl bg-charcoal-900 text-white text-xs font-bold hover:bg-charcoal-800"
                  >
                    Áp Dụng
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs text-charcoal-700 pt-2 border-t border-cream-100">
                <div className="flex justify-between">
                  <span>Tạm tính hàng ({totalItems} món):</span>
                  <span className="font-semibold">{formatPriceCompact(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="font-semibold">
                    {shippingFee === 0 ? (
                      <span className="text-sage-700 font-bold">Miễn Phí</span>
                    ) : (
                      formatPriceCompact(shippingFee)
                    )}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-blush-600 font-semibold">
                    <span>Mã giảm giá:</span>
                    <span>-{formatPriceCompact(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-charcoal-900 pt-2 border-t border-cream-200">
                  <span>Tổng thanh toán:</span>
                  <span className="text-lg text-honey-600 font-heading">
                    {formatPriceCompact(finalTotal)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleStartCheckout}
                data-track="cart-proceed-checkout"
                className="w-full py-3.5 rounded-full bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>Tiến Hành Thanh Toán</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
