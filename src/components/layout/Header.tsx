'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingBag, Search, Heart, X, User as UserIcon, Crown, LogOut, LayoutDashboard, ShieldCheck, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { MAIN_NAV_ITEMS } from '@/lib/constants/navigation';

export function Header() {
  const pathname = usePathname();
  const { totalItems, openMiniCart, cartBounceTrigger } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [hidden, setHidden] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { scrollY } = useScroll();

  // Ẩn khi cuộn xuống, hiện khi cuộn lên
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 120) {
      setHidden(true);
      setIsUserMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
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
            <img
              src="/images/logo.png"
              alt="T'Petie - Made for little souls"
              className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
            />
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
              href="/ve-chung-toi"
              className={`flex items-center space-x-1.5 py-1 transition-colors ${
                pathname === '/ve-chung-toi' ? 'text-honey-600 font-bold' : 'text-charcoal-700 hover:text-honey-600'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-blush-500" />
              <span>Về Chúng Tôi</span>
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              data-track="open-search"
              className="p-2 rounded-full hover:bg-cream-100 text-charcoal-700 transition-colors"
              aria-label="Tìm kiếm sản phẩm"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Auth Button / User Dropdown */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-1.5 p-1 sm:px-2.5 sm:py-1 rounded-full bg-cream-100 hover:bg-honey-100 border border-cream-300 transition-all text-xs font-bold text-charcoal-800"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-honey-500 text-white flex items-center justify-center text-[10px]">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : user.role === 'admin' ? (
                      <Crown className="w-3.5 h-3.5" />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                  <span className="hidden md:inline max-w-[90px] truncate">{user.name}</span>
                  {user.role === 'admin' && (
                    <span className="hidden sm:inline text-[9px] bg-honey-500 text-white px-1.5 py-0.2 rounded-full font-mono">
                      Admin
                    </span>
                  )}
                  <ChevronDown className="w-3 h-3 text-charcoal-400" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-cream-200 py-2 z-50 animate-scale-up">
                    <div className="px-3.5 py-2 border-b border-cream-100">
                      <p className="text-xs font-bold text-charcoal-900 truncate">{user.name}</p>
                      <p className="text-[10px] text-charcoal-400 font-mono truncate">{user.email}</p>
                      <span className={`inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        user.role === 'admin' ? 'bg-honey-100 text-honey-800' : 'bg-sage-100 text-sage-800'
                      }`}>
                        {user.role === 'admin' ? '👑 Quản Trị Viên' : '🌸 Khách Hàng (Mẹ Bỉm)'}
                      </span>
                    </div>

                    <div className="py-1 text-xs text-charcoal-700">
                      {user.role === 'admin' ? (
                        <Link
                          href="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center space-x-2 px-3.5 py-2 hover:bg-honey-50 text-honey-800 font-bold"
                        >
                          <ShieldCheck className="w-4 h-4 text-honey-600" />
                          <span>Cổng Quản Trị (Admin)</span>
                        </Link>
                      ) : (
                        <Link
                          href="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center space-x-2 px-3.5 py-2 hover:bg-cream-50 font-medium"
                        >
                          <LayoutDashboard className="w-4 h-4 text-honey-600" />
                          <span>Hồ Sơ &amp; Gợi Ý Size Bé</span>
                        </Link>
                      )}

                      {user.role === 'user' && (
                        <Link
                          href="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center space-x-2 px-3.5 py-2 hover:bg-cream-50"
                        >
                          <ShoppingBag className="w-4 h-4 text-sage-600" />
                          <span>Đơn hàng của tôi</span>
                        </Link>
                      )}
                    </div>

                    <div className="pt-1 border-t border-cream-100">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold text-blush-600 hover:bg-blush-50 text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/dang-nhap"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-cream-300 hover:border-honey-300 bg-white hover:bg-cream-50 text-xs font-bold text-charcoal-700 transition-all active:scale-95 shadow-2xs"
              >
                <UserIcon className="w-3.5 h-3.5 text-honey-600" />
                <span className="hidden sm:inline">Đăng Nhập</span>
              </Link>
            )}

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
