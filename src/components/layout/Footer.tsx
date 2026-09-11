import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, ShieldCheck, RefreshCw, Truck, Phone, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-cream-100 border-t border-cream-200 pt-10 pb-24 md:pb-12 text-charcoal-700">
      {/* 3 Cam kết chất lượng */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-5 rounded-3xl border border-cream-200 shadow-card">
          <div className="flex items-center space-x-3 p-2">
            <div className="w-10 h-10 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-charcoal-900">100% Vải Organic An Toàn</h4>
              <p className="text-[11px] text-charcoal-400">Không châm chích, thoáng mát cho da bé</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="w-10 h-10 rounded-2xl bg-honey-100 text-honey-600 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-charcoal-900">Đổi Size Miễn Phí 7 Ngày</h4>
              <p className="text-[11px] text-charcoal-400">Hỗ trợ đổi tận nhà nếu bé mặc không vừa</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="w-10 h-10 rounded-2xl bg-blush-100 text-blush-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-charcoal-900">Freeship Đơn Từ 399k</h4>
              <p className="text-[11px] text-charcoal-400">Giao nhanh toàn quốc 2 - 3 ngày</p>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin chân trang */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Cột 1: Về T'Petie */}
        <div className="md:col-span-1 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold font-heading text-honey-600">T&apos;Petie</span>
            <Sparkles className="w-4 h-4 text-honey-500" />
          </div>
          <p className="text-xs leading-relaxed text-charcoal-600">
            Thương hiệu thời trang thiết kế trẻ em phong cách ngọt ngào, trong trẻo. Nâng niu từng bước chạm đầu đời của bé yêu.
          </p>
          <div className="flex items-center space-x-2 pt-1">
            <span className="text-xs font-semibold text-sage-700 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-200">
              🌿 Thiết kế tại Việt Nam
            </span>
          </div>
        </div>

        {/* Cột 2: Danh mục mua sắm */}
        <div className="space-y-2.5">
          <h4 className="font-heading font-bold text-sm text-charcoal-900">Danh Mục Bé Yêu</h4>
          <ul className="space-y-1.5 text-xs">
            <li><Link href="/be-gai/vay" className="hover:text-honey-600 transition-colors">Váy Công Chúa Bé Gái</Link></li>
            <li><Link href="/be-gai/ao" className="hover:text-honey-600 transition-colors">Áo Sơ Mi & Áo Kiểu</Link></li>
            <li><Link href="/be-gai/quan" className="hover:text-honey-600 transition-colors">Quần Bloomer & Yếm</Link></li>
            <li><Link href="/be-gai/set-do" className="hover:text-honey-600 transition-colors">Set Bộ Xinh Xắn</Link></li>
            <li><Link href="/bo-suu-tap" className="hover:text-honey-600 transition-colors">Bộ Sưu Tập Lookbook</Link></li>
          </ul>
        </div>

        {/* Cột 3: Hỗ trợ khách hàng */}
        <div className="space-y-2.5">
          <h4 className="font-heading font-bold text-sm text-charcoal-900">Hỗ Trợ Mẹ Bỉm</h4>
          <ul className="space-y-1.5 text-xs">
            <li><Link href="/san-pham/vay-voan-hoa-nhi-mat-ong" className="hover:text-honey-600 transition-colors">Bảng Hướng Dẫn Chọn Size</Link></li>
            <li><Link href="/gio-hang" className="hover:text-honey-600 transition-colors">Chính Sách Đổi Trả & Bảo Hành</Link></li>
            <li><Link href="/cua-hang" className="hover:text-honey-600 transition-colors">Hệ Thống Cửa Hàng Showroom</Link></li>
            <li><Link href="/tai-khoan" className="hover:text-honey-600 transition-colors">Tài Khoản & Hồ Sơ Bé Yêu</Link></li>
          </ul>
        </div>

        {/* Cột 4: Liên hệ & Showroom */}
        <div className="space-y-2.5">
          <h4 className="font-heading font-bold text-sm text-charcoal-900">Tư Vấn & Đặt Hàng</h4>
          <p className="text-xs text-charcoal-600">Mẹ cần tư vấn chọn size cho bé, hãy nhắn ngay cho T&apos;Petie nhé:</p>
          <div className="space-y-2 pt-1 text-xs">
            <a
              href="tel:0987654321"
              className="flex items-center space-x-2 text-charcoal-800 font-semibold hover:text-honey-600 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-honey-500" />
              <span>Hotline: 0988.123.456 (8h - 22h)</span>
            </a>
            <a
              href="https://zalo.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-charcoal-800 font-semibold hover:text-honey-600 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-sage-600" />
              <span>Zalo Official: T&apos;Petie Baby &amp; Mom</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 pt-6 border-t border-cream-200 text-center text-xs text-charcoal-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2024 T&apos;Petie Vietnam. All rights reserved.</p>
        <p className="flex items-center space-x-1">
          <span>Made with love for Mom &amp; Baby</span>
          <Heart className="w-3 h-3 text-blush-500 fill-blush-500 inline" />
        </p>
      </div>
    </footer>
  );
}
