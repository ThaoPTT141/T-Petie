'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle 
} from 'lucide-react';

/**
 * Component xử lý logic và giao diện Form Đăng Nhập
 */
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const { login, loginWithGoogle, isLoading } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Xử lý đăng nhập bằng Email / Mật khẩu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Vui lòng nhập địa chỉ Email của mẹ.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Địa chỉ Email không đúng định dạng (VD: mebe@gmail.com).');
      return;
    }

    if (!password) {
      setErrorMessage('Vui lòng nhập mật khẩu.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Mật khẩu phải có tối thiểu 6 ký tự.');
      return;
    }

    setIsSubmitting(true);
    const result = await login({ email, password });
    setIsSubmitting(false);

    if (result.success) {
      showToast(`Chào mừng bạn trở lại với T'Petie! 🌸`);
      if (result.role === 'admin') {
        router.push(callbackUrl || '/admin');
      } else {
        router.push(callbackUrl || '/dashboard');
      }
    } else {
      setErrorMessage(result.error || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  // Xử lý đăng nhập bằng Google
  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);
    const result = await loginWithGoogle();
    setIsSubmitting(false);

    if (result.success) {
      showToast('Đăng nhập Google thành công! 🌸');
      if (result.role === 'admin') {
        router.push(callbackUrl || '/admin');
      } else {
        router.push(callbackUrl || '/dashboard');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-6 sm:py-12">
      <div className="bg-white rounded-3xl border border-cream-200 shadow-card overflow-hidden p-6 sm:p-10 flex flex-col justify-center min-h-[580px]">
        <div className="w-full space-y-6">
          
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal-900">
              Đăng Nhập Tài Khoản
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Chào mừng Mẹ đến với thế giới ngọt ngào của T&apos;Petie
            </p>
          </div>

          {/* Error Alert Box */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-blush-50 border border-blush-200 text-blush-700 text-xs flex items-start space-x-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting || isLoading}
            className="w-full py-3 px-4 rounded-2xl border border-cream-300 hover:border-honey-300 bg-cream-50/50 hover:bg-cream-50 text-charcoal-800 text-xs sm:text-sm font-semibold flex items-center justify-center space-x-3 transition-all active:scale-95 shadow-2xs disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            <span>Đăng nhập nhanh bằng Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-cream-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-medium text-charcoal-400 uppercase tracking-wider">
              hoặc dùng Email
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-charcoal-800 flex items-center justify-between">
                <span>Địa chỉ Email</span>
                <span className="text-blush-500 font-normal">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="mebe@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-cream-300 focus:border-honey-500 focus:ring-2 focus:ring-honey-100 outline-none text-xs sm:text-sm text-charcoal-900 placeholder:text-charcoal-400 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-charcoal-800">Mật khẩu</label>
                <button
                  type="button"
                  onClick={() => setErrorMessage('Tính năng khôi phục mật khẩu sẽ gửi mã OTP đến email của mẹ.')}
                  className="text-honey-600 hover:text-honey-700 font-medium"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Nhập ít nhất 6 ký tự"
                  className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-cream-300 focus:border-honey-500 focus:ring-2 focus:ring-honey-100 outline-none text-xs sm:text-sm text-charcoal-900 placeholder:text-charcoal-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
                  title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-honey-500 focus:ring-honey-400 w-4 h-4 accent-honey-500 cursor-pointer"
              />
              <label htmlFor="remember-me" className="text-xs text-charcoal-600 cursor-pointer select-none">
                Ghi nhớ đăng nhập trên thiết bị này
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full py-3.5 rounded-full bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang xác thực...</span>
                </>
              ) : (
                <>
                  <span>Đăng Nhập Ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-xs text-charcoal-500 pt-2">
            Mẹ chưa có tài khoản?{' '}
            <Link
              href="/dang-ky"
              className="font-bold text-honey-600 hover:text-honey-700 underline"
            >
              Đăng ký thành viên mới 🛍️
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

/**
 * Loading Fallback khi component con đang hydrate
 */
function LoginLoadingFallback() {
  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-6 sm:py-12">
      <div className="bg-white rounded-3xl border border-cream-200 shadow-card min-h-[580px] flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-10 h-10 rounded-full border-4 border-cream-200 border-t-honey-500 animate-spin" />
        <p className="text-xs sm:text-sm font-medium text-charcoal-500 font-sans">
          Đang tải trang đăng nhập T&apos;Petie... 🌸
        </p>
      </div>
    </div>
  );
}

/**
 * Component Cha bọc <Suspense> theo đúng chuẩn Next.js App Router
 */
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoadingFallback />}>
      <LoginForm />
    </Suspense>
  );
}
