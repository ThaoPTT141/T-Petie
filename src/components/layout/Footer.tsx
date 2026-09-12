import React from 'react';
import Link from 'next/link';
import { Heart, ShieldCheck, RefreshCw, Truck, Phone, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-cream-100 border-t border-cream-200 pt-10 pb-24 md:pb-12 text-charcoal-700">
      {/* 3 Cam kết chất lượng dịch vụ */}
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

      {/* Cấu trúc Footer 4 Cột Chính */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* CỘT 1: LOGO & LỜI CAM KẾT */}
        <div className="space-y-3">
          <Link href="/" className="inline-block group">
            <span className="text-2xl sm:text-3xl font-extrabold font-heading text-honey-600 tracking-tight group-hover:text-honey-700 transition-colors">
              T&apos;Petie
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-charcoal-600">
            <strong className="font-bold text-charcoal-900 uppercase">LỜI CAM KẾT:</strong> Thương hiệu thời trang thiết kế trẻ em, nâng niu từng bước chạm đầu đời của bé yêu.
          </p>
          <div className="pt-1">
            <span className="text-[11px] font-semibold text-sage-700 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-200 inline-block">
              🌿 Thiết kế &amp; May đo tại Việt Nam
            </span>
          </div>
        </div>

        {/* CỘT 2: CHÍNH SÁCH */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-sm text-charcoal-900 uppercase tracking-wider">
            CHÍNH SÁCH
          </h4>
          <ul className="space-y-2 text-xs text-charcoal-600">
            <li>
              <Link href="/chinh-sach-bao-mat" className="hover:text-honey-600 transition-colors block">
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link href="/chinh-sach-doi-tra" className="hover:text-honey-600 transition-colors block">
                Chính sách đổi trả
              </Link>
            </li>
            <li>
              <Link href="/chinh-sach-giao-hang" className="hover:text-honey-600 transition-colors block">
                Chính sách giao hàng
              </Link>
            </li>
            <li>
              <Link href="/chinh-sach-thanh-toan" className="hover:text-honey-600 transition-colors block">
                Chính sách thanh toán
              </Link>
            </li>
          </ul>
        </div>

        {/* CỘT 3: CHĂM SÓC KHÁCH HÀNG */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-sm text-charcoal-900 uppercase tracking-wider">
            CHĂM SÓC KHÁCH HÀNG
          </h4>
          <ul className="space-y-2 text-xs text-charcoal-600">
            <li>
              <Link href="/chinh-sach-giao-hang" className="hover:text-honey-600 transition-colors block">
                Tra cứu đơn hàng & Giao nhận
              </Link>
            </li>
            <li>
              <Link href="/san-pham/vay-voan-hoa-nhi-mat-ong" className="hover:text-honey-600 transition-colors block">
                Hướng dẫn chọn size
              </Link>
            </li>
            <li>
              <Link href="/cua-hang" className="hover:text-honey-600 transition-colors block">
                Hệ thống Showroom offline
              </Link>
            </li>
          </ul>
        </div>

        {/* CỘT 4: KẾT NỐI VỚI T'PETIE */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-sm text-charcoal-900 uppercase tracking-wider">
            KẾT NỐI VỚI T&apos;PETIE
          </h4>
          <div className="space-y-2 text-xs">
            <a
              href="tel:0988123456"
              className="flex items-center space-x-2 text-charcoal-800 font-semibold hover:text-honey-600 transition-colors"
            >
              <Phone className="w-4 h-4 text-honey-500 shrink-0" />
              <span>Hotline: 0988.123.456 (8h - 22h)</span>
            </a>
            <a
              href="https://zalo.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-charcoal-800 font-semibold hover:text-honey-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-sage-600 shrink-0" />
              <span>Zalo Official: T&apos;Petie Baby &amp; Mom</span>
            </a>
          </div>

          {/* Social Icons (Facebook, TikTok, Instagram) */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-charcoal-400 block mb-2">Mạng xã hội:</span>
            <div className="flex items-center space-x-2.5">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-cream-300 flex items-center justify-center text-charcoal-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all shadow-2xs"
                aria-label="Facebook T'Petie"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-cream-300 flex items-center justify-center text-charcoal-700 hover:text-black hover:border-charcoal-400 hover:bg-cream-50 transition-all shadow-2xs"
                aria-label="TikTok T'Petie"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.86-4.48V8.71a8.21 8.21 0 0 0 4.91 1.63v-3.65z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-cream-300 flex items-center justify-center text-charcoal-700 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 transition-all shadow-2xs"
                aria-label="Instagram T'Petie"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
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
