'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ShieldCheck, Heart, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, loginWithGoogle, loginWithFacebook } = useAuth();
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'facebook' | null>(null);

  if (!isLoginModalOpen) return null;

  const handleGoogleLogin = async () => {
    setLoadingProvider('google');
    try {
      await loginWithGoogle();
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleFacebookLogin = async () => {
    setLoadingProvider('facebook');
    try {
      await loginWithFacebook();
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop Mờ & Tối Nhẹ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLoginModal}
          className="fixed inset-0 bg-charcoal-900/50 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Container Phong Cách Ngọt Ngào */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-cream-200 z-10 overflow-hidden"
        >
          {/* Họa Tiết Nền Trang Trí Dịu Mắt */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-honey-100 rounded-full blur-2xl opacity-60 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-blush-100 rounded-full blur-2xl opacity-60 pointer-events-none" />

          {/* Nút Đóng Modal */}
          <button
            onClick={closeLoginModal}
            aria-label="Đóng cửa sổ"
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-cream-100 text-charcoal-400 hover:text-charcoal-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header & Logo Thương Hiệu */}
          <div className="text-center space-y-2 pt-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-honey-100 to-blush-50 border border-cream-300 text-honey-600 shadow-sm mb-1">
              <Sparkles className="w-6 h-6 text-honey-500" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-charcoal-900">
              Chào Mẹ Đến Với T&apos;Petie! 🌸
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 max-w-xs mx-auto leading-relaxed">
              Đăng nhập 1 chạm an toàn để lưu số đo bé yêu, nhận gợi ý size tự động và tích lũy điểm quà tặng.
            </p>
          </div>

          {/* Danh Sách Lợi Ích Cho Mẹ */}
          <div className="mt-5 p-3.5 rounded-2xl bg-cream-50/80 border border-cream-200/80 space-y-2 text-xs text-charcoal-700">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-blush-500 shrink-0 fill-blush-500" />
              <span>Lưu hồ sơ chiều cao, cân nặng bé để gợi ý size vừa vặn</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-honey-500 shrink-0" />
              <span>Tặng ngay <strong>+50 điểm tích lũy</strong> cho thành viên mới</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-sage-500 shrink-0" />
              <span>Đăng nhập Social an toàn chuẩn OAuth 2.0 — Không lưu mật khẩu</span>
            </div>
          </div>

          {/* 2 Nút Đăng Nhập Social Lớn */}
          <div className="mt-6 space-y-3">
            {/* NÚT 1: TIẾP TỤC VỚI GOOGLE */}
            <button
              onClick={handleGoogleLogin}
              disabled={!!loadingProvider}
              className="w-full flex items-center justify-center space-x-3 py-3.5 px-4 rounded-2xl bg-white hover:bg-cream-50/80 text-charcoal-900 font-bold text-sm sm:text-base border border-cream-300 hover:border-honey-400 shadow-sm hover:shadow transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loadingProvider === 'google' ? (
                <Loader2 className="w-5 h-5 animate-spin text-honey-600" />
              ) : (
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>Tiếp tục với Google</span>
            </button>

            {/* NÚT 2: TIẾP TỤC VỚI FACEBOOK */}
            <button
              onClick={handleFacebookLogin}
              disabled={!!loadingProvider}
              style={{ backgroundColor: '#1877F2' }}
              className="w-full flex items-center justify-center space-x-3 py-3.5 px-4 rounded-2xl text-white font-bold text-sm sm:text-base hover:brightness-105 shadow-sm hover:shadow transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loadingProvider === 'facebook' ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
                <svg className="w-5 h-5 shrink-0 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              )}
              <span>Tiếp tục với Facebook</span>
            </button>
          </div>

          {/* Dòng Điều Khoản & Chính Sách Bảo Mật */}
          <div className="mt-6 pt-4 border-t border-cream-200 text-center">
            <p className="text-[11px] text-charcoal-400 leading-relaxed">
              Bằng việc đăng nhập, bạn đồng ý với{' '}
              <a href="/chinh-sach-bao-mat" className="text-honey-600 hover:underline font-semibold">
                Điều khoản dịch vụ
              </a>{' '}
              và{' '}
              <a href="/chinh-sach-bao-mat" className="text-honey-600 hover:underline font-semibold">
                Chính sách bảo mật
              </a>{' '}
              của T&apos;Petie.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
