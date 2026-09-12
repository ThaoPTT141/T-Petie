'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/tai-khoan');
  }, [router]);

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
      <div className="w-10 h-10 border-3 border-honey-200 border-t-honey-500 rounded-full animate-spin mx-auto" />
      <p className="text-sm text-charcoal-600">Đang chuyển hướng đến trang tài khoản...</p>
    </div>
  );
}
