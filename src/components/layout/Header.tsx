'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingBag, Search, User, Sparkles, MapPin, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { MAIN_NAV_ITEMS } from '@/lib/constants/navigation';

export function Header() {
  const pathname = usePathname();
  const { totalItems, openMiniCart, cartBounceTrigger } = useCart();
  const [hidden, setHidden] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { scrollY } = useScroll();

  // Ẩn khi cuộn xuống, hiện khi cuộn lên
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      {/* Top Banner Thông Báo Khuyến Mãi */}
      <div className="bg-gradient-to-r from-cream-100 via-honey-100 to-blush-50 px-4 py-1.5 text-center text-xs font-medium text-charcoal-700 border-b border-cream-200 flex items-center justify-center space-x-2">
        <Sparkles className="w-3.5 h-3.5 text-honey-500 shrink-0" />
        <span>
          Chào mừng Mẹ đến với <strong>T&apos;Petie</strong> — Miễn phí vận chuyển cho đơn từ 399k!
        </span>
      </div>

      {/* Header Chính */}
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-200 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center group py-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-heading text-honey-600 tracking-tight group-hover:text-honey-700 transition-colors">
              T&apos;Petie
            </span>
          </Link>

          {/* Navigation Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 transition-colors ${
                    isActive ? 'text-honey-600 font-bold' : 'text-charcoal-700 hover:text-honey-600'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="absolute -top-2.5 -right-4 text-[9px] font-bold bg-honey-500 text-white px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-honey-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
            <Link
              href="/cua-hang"
              className={`flex items-center space-x-1 py-1 transition-colors ${
                pathname === '/cua-hang' ? 'text-honey-600 font-bold' : 'text-charcoal-700 hover:text-honey-600'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-sage-600" />
              <span>Cửa Hàng</span>
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              data-track="open-search"
              className="p-2 rounded-full hover:bg-cream-100 text-charcoal-700 transition-colors"
              aria-label="Tìm kiếm sản phẩm"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Icon */}
            <Link
              href="/tai-khoan"
              data-track="nav-account"
              className="p-2 rounded-full hover:bg-cream-100 text-charcoal-700 transition-colors hidden sm:inline-flex"
              aria-label="Tài khoản Mẹ & Bé"
              title="Tài khoản Mẹ & Bé"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Button với Bounce Animation */}
            <motion.button
              key={cartBounceTrigger}
              animate={cartBounceTrigger > 0 ? { scale: [1, 1.25, 0.95, 1.1, 1] } : {}}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              onClick={openMiniCart}
              data-track="open-mini-cart"
              className="relative flex items-center space-x-1.5 bg-cream-100 hover:bg-honey-100 border border-cream-300 px-3 py-1.5 rounded-full transition-colors active:scale-95"
              aria-label="Mở giỏ hàng"
            >
              <ShoppingBag className="w-4 h-4 text-honey-600" />
              <span className="text-xs font-bold text-charcoal-800 hidden sm:inline">Giỏ hàng</span>
              <span className="bg-honey-500 text-white rounded-full min-w-5 h-5 px-1.5 text-[11px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Modal Tìm Kiếm Nhanh */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/40 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg bg-white rounded-3xl p-5 shadow-2xl border border-cream-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <h3 className="font-heading font-bold text-charcoal-900 text-sm">Tìm Kiếm Đồ Cho Bé Yêu</h3>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-full hover:bg-cream-100 text-charcoal-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Nhập tên váy, áo sơ mi, chất vải organic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-cream-50 border border-cream-300 text-sm focus:outline-none focus:border-honey-500"
              />
              <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
            </div>
            <div className="mt-4">
              <span className="text-xs font-semibold text-charcoal-600 block mb-2">Gợi ý tìm kiếm phổ biến:</span>
              <div className="flex flex-wrap gap-2">
                {['Váy công chúa', 'Áo cổ sen', 'Quần bloomer', 'Thô đũi organic', 'Đồ sơ sinh'].map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => {
                      setSearchQuery(keyword);
                      setIsSearchOpen(false);
                      window.location.href = `/be-gai?q=${encodeURIComponent(keyword)}`;
                    }}
                    className="text-xs px-3 py-1.5 rounded-full bg-cream-100 hover:bg-honey-100 text-charcoal-700 font-medium transition-colors"
                  >
                    🔍 {keyword}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
