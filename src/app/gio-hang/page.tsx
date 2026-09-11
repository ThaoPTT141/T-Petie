'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Truck,
  Sparkles,
  ArrowLeft,
  Copy,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPriceCompact } from '@/lib/utils/formatters';
import { useToast } from '@/context/ToastContext';
import { trackBeginCheckout, trackPurchase } from '@/lib/analytics/tracker';

export default function GioHangPage() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const { showToast } = useToast();

  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Form thanh toán
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: 'Hà Nội',
    note: '',
    giftWrap: false,
    paymentMethod: 'bank_transfer_qr' as 'cod' | 'bank_transfer_qr' | 'momo',
  });

  const [createdOrderId, setCreatedOrderId] = useState('');

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
    setStep('checkout');
    trackBeginCheckout(
      items.map((i) => ({
        item_id: i.productId,
        item_name: i.productName,
        price: i.price,
        quantity: i.quantity,
      })),
      finalTotal
    );
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber || !formData.address) {
      showToast('Vui lòng điền đầy đủ họ tên, SĐT và địa chỉ nhận hàng', 'info');
      return;
    }

    const orderId = `TP-${Date.now().toString().slice(-6)}`;
    setCreatedOrderId(orderId);

    trackPurchase(
      orderId,
      finalTotal,
      items.map((i) => ({
        item_id: i.productId,
        item_name: i.productName,
        price: i.price,
        quantity: i.quantity,
      }))
    );

    clearCart();
    setStep('success');
    showToast('🎉 Đặt hàng thành công! T\'Petie xin chân thành cảm ơn Mẹ!', 'love');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 space-y-6">
      <Breadcrumb
        items={[
          { label: 'Giỏ Hàng', href: '/gio-hang' },
          ...(step === 'checkout' ? [{ label: 'Thanh Toán Đơn Hàng' }] : []),
          ...(step === 'success' ? [{ label: 'Đặt Hàng Thành Công' }] : []),
        ]}
      />

      {/* STEP 1: GIỎ HÀNG */}
      {step === 'cart' && (
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
      )}

      {/* STEP 2: FORM THANH TOÁN 1 BƯỚC */}
      {step === 'checkout' && (
        <form onSubmit={handleCompleteOrder} className="space-y-6">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setStep('cart')}
              className="p-1.5 rounded-full hover:bg-cream-100 text-charcoal-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-extrabold font-heading text-charcoal-900">
              Thông Tin Giao Hàng &amp; Thanh Toán
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cột Điền Thông Tin */}
            <div className="lg:col-span-2 space-y-5">
              {/* Thông tin mẹ nhận hàng */}
              <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-card space-y-3">
                <h2 className="font-heading font-bold text-sm text-charcoal-900 flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-honey-100 text-honey-700 text-xs flex items-center justify-center">1</span>
                  <span>Người Nhận Hàng</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                      Họ và Tên Mẹ: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Nguyễn Thu Trang"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                      Số Điện Thoại Nhận Hàng: *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="VD: 0988123456"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                    Địa Chỉ Giao Hàng Chi Tiết: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Số nhà, tên ngõ/tòa nhà, đường..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                    Ghi Chú Cho Shipper / Size Bé:
                  </label>
                  <input
                    type="text"
                    placeholder="Giao giờ hành chính, bé 11kg..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream-50 focus:outline-none focus:border-honey-500"
                  />
                </div>
              </div>

              {/* Phương thức thanh toán */}
              <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-card space-y-3">
                <h2 className="font-heading font-bold text-sm text-charcoal-900 flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-honey-100 text-honey-700 text-xs flex items-center justify-center">2</span>
                  <span>Phương Thức Thanh Toán</span>
                </h2>

                <div className="space-y-2">
                  {[
                    {
                      id: 'bank_transfer_qr',
                      title: 'Quét Mã QR Chuyển Khoản Ngân Hàng (Khuyên Dùng)',
                      desc: 'Tự động tạo mã QR VietQR tiện lợi, xử lý nhanh chóng',
                      icon: '📲',
                    },
                    {
                      id: 'cod',
                      title: 'Thanh Toán Khi Nhận Hàng (COD)',
                      desc: 'Mẹ kiểm tra đồ trước rồi thanh toán tiền mặt cho shipper',
                      icon: '📦',
                    },
                    {
                      id: 'momo',
                      title: 'Ví Điện Tử MoMo',
                      desc: 'Thanh toán tức thì qua ứng dụng MoMo',
                      icon: '👛',
                    },
                  ].map((p) => (
                    <label
                      key={p.id}
                      className={`p-3.5 rounded-2xl border flex items-start space-x-3 cursor-pointer transition-all ${
                        formData.paymentMethod === p.id
                          ? 'border-honey-500 bg-honey-50/60 ring-2 ring-honey-400/40'
                          : 'border-cream-200 bg-white hover:bg-cream-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === p.id}
                        onChange={() => setFormData({ ...formData, paymentMethod: p.id as 'cod' | 'bank_transfer_qr' | 'momo' })}
                        className="mt-1 text-honey-500 focus:ring-honey-500"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span>{p.icon}</span>
                          <span className="text-xs font-bold text-charcoal-900">{p.title}</span>
                        </div>
                        <p className="text-[11px] text-charcoal-600 mt-0.5">{p.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Cột Tóm Tắt & Nút Đặt Hàng */}
            <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-card space-y-4 h-fit">
              <h2 className="font-heading font-bold text-sm text-charcoal-900 pb-2 border-b border-cream-200">
                Đơn Hàng ({totalItems} món)
              </h2>

              <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar divide-y divide-cream-100 text-xs">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.selectedSize}`} className="pt-2 first:pt-0 flex justify-between">
                    <div>
                      <p className="font-semibold text-charcoal-900">{item.productName}</p>
                      <p className="text-[10px] text-charcoal-400">{item.selectedSize} x {item.quantity}</p>
                    </div>
                    <span className="font-bold text-charcoal-900">
                      {formatPriceCompact(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5 pt-3 border-t border-cream-200 text-xs text-charcoal-700">
                <div className="flex justify-between">
                  <span>Tiền hàng:</span>
                  <span>{formatPriceCompact(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí ship:</span>
                  <span>{shippingFee === 0 ? 'Miễn phí' : formatPriceCompact(shippingFee)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-blush-600 font-semibold">
                    <span>Giảm giá:</span>
                    <span>-{formatPriceCompact(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-charcoal-900 pt-2 border-t border-cream-200">
                  <span>Tổng tiền:</span>
                  <span className="text-lg text-honey-600 font-heading">{formatPriceCompact(finalTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                data-track="submit-simulated-order"
                className="w-full py-3.5 rounded-full bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>Xác Nhận Đặt Hàng</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      )}

      {/* STEP 3: MÀN HÌNH ĐẶT HÀNG THÀNH CÔNG */}
      {step === 'success' && (
        <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-10 shadow-soft text-center space-y-5 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center mx-auto text-3xl">
            🎉
          </div>

          <div>
            <span className="text-xs font-bold text-sage-700 uppercase tracking-wider block mb-1">
              Đặt Hàng Giả Lập Thành Công
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-charcoal-900">
              Cảm Ơn Mẹ Đã Tin Chọn T&apos;Petie!
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
              Mã đơn hàng của mẹ là: <strong className="text-honey-600 font-mono text-base">{createdOrderId}</strong>
            </p>
          </div>

          {/* Hộp Thông Tin QR nếu chọn chuyển khoản */}
          {formData.paymentMethod === 'bank_transfer_qr' && (
            <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 text-xs space-y-2 text-left">
              <div className="flex items-center space-x-2 font-bold text-charcoal-900">
                <QrCode className="w-4 h-4 text-honey-600" />
                <span>Mã QR Chuyển Khoản Tự Động (Giả Lập)</span>
              </div>
              <p className="text-charcoal-600">
                Ngân Hàng: <strong>MB Bank</strong> • STK: <strong>99998888T-PETIE</strong>
              </p>
              <p className="text-charcoal-600">
                Số tiền: <strong className="text-honey-600">{formatPriceCompact(finalTotal)}</strong> • Cú pháp: <strong>{createdOrderId}</strong>
              </p>
            </div>
          )}

          <div className="p-4 bg-sage-50 rounded-2xl border border-sage-200 text-xs text-sage-800 text-left space-y-1">
            <p>📦 <strong>Giao hàng:</strong> Dự kiến tới tay mẹ trong vòng 2 - 3 ngày làm việc.</p>
            <p>☎️ <strong>Hỗ trợ:</strong> Mẹ có thể liên hệ Zalo <strong>0988.123.456</strong> để được đổi size nhanh nhất.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-honey-500 hover:bg-honey-600 text-white text-xs font-bold shadow-md transition-all active:scale-95"
            >
              Tiếp Tục Mua Sắm 🌸
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
