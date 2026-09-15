'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Flame, Clock, Tag, Sparkles } from 'lucide-react';
import localProducts from '@/data/products.json';
import { Product, SaleCampaign } from '@/types/product';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useToast } from '@/context/ToastContext';

function SaleContent() {
  const searchParams = useSearchParams();
  const allProducts = localProducts as Product[];
  const [activeTab, setActiveTab] = useState<SaleCampaign>('dai-le-2-9');
  const { showToast } = useToast();

  useEffect(() => {
    const campaignParam = searchParams.get('campaign') as SaleCampaign | null;
    if (
      campaignParam &&
      ['dai-le-2-9', 'sale-he', 'sale-thu-dong', 'sale-ngay-doi'].includes(campaignParam)
    ) {
      setActiveTab(campaignParam);
    }
  }, [searchParams]);

  const campaigns: { id: SaleCampaign; label: string; badge: string; desc: string }[] = [
    {
      id: 'dai-le-2-9',
      label: '🎉 Đại Lễ 2/9',
      badge: 'Giảm Đến 30%',
      desc: 'Mừng Quốc Khánh — Đồng loạt giảm giá các mẫu áo sơ mi & set bộ tựu trường.',
    },
    {
      id: 'sale-he',
      label: '☀️ Xả Kho Hè',
      badge: 'Đồng Giá Từ 145k',
      desc: 'Thanh lý các mẫu váy voan tơ, quần bloomer thô đũi mát mẻ cho bé.',
    },
    {
      id: 'sale-thu-dong',
      label: '🍂 Đón Thu Đông',
      badge: 'Deal Độc Quyền',
      desc: 'Ưu đãi sớm cho BST Thu Đông và phiên bản kết hợp cao cấp.',
    },
    {
      id: 'sale-ngay-doi',
      label: '🎁 Sale Ngày Đôi 10/10 11/11',
      badge: 'Siêu Voucher',
      desc: 'Săn bão ưu đãi ngày đôi cùng voucher độc quyền và quà tặng xinh xắn.',
    },
  ];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      if (!p.isSale) return false;
      if (activeTab === 'sale-ngay-doi') return true; // Tất cả sản phẩm sale trong ngày đôi
      return p.saleCampaign === activeTab || !p.saleCampaign;
    });
  }, [allProducts, activeTab]);

  const activeCampaignInfo = campaigns.find((c) => c.id === activeTab);

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(`Đã sao chép mã giảm giá "${code}" vào bộ nhớ tạm!`, 'info');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-6">
      <Breadcrumb items={[{ label: 'Chương Trình Ưu Đãi & Khuyến Mãi', href: '/sale' }]} />

      {/* Hero Sale Banner */}
      <div className="bg-gradient-to-r from-honey-500 via-blush-500 to-honey-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
            <Flame className="w-4 h-4 text-yellow-300" />
            <span>Săn Ưu Đãi Giờ Vàng</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading">
            T&apos;Petie Ưu Đãi Khủng — Đồ Xinh Cho Bé, Giá Mềm Cho Mẹ
          </h1>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            Hàng trăm mẫu váy áo thiết kế cao cấp đang có mức giá ưu đãi đặc biệt. Nhanh tay chọn size cho bé yêu kẻo hết size nhé mẹ ơi!
          </p>

          {/* Flash Sale Countdown giả lập */}
          <div className="flex items-center space-x-2 pt-2">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-xs font-semibold">Kết thúc sau:</span>
            <div className="flex items-center space-x-1 font-mono text-xs font-bold">
              <span className="bg-white/25 px-2 py-1 rounded-lg">02</span>
              <span>:</span>
              <span className="bg-white/25 px-2 py-1 rounded-lg">18</span>
              <span>:</span>
              <span className="bg-white/25 px-2 py-1 rounded-lg">45</span>
            </div>
          </div>
        </div>
      </div>

      {/* Voucher Khuyến Mãi Nhanh */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { code: 'TPETIE20', discount: 'Giảm 20k', condition: 'Đơn từ 250k' },
          { code: 'FREESHIP399', discount: 'Freeship 0đ', condition: 'Đơn từ 399k' },
          { code: 'MEMBERVIP', discount: 'Giảm 10%', condition: 'Mẹ mua lần đầu' },
        ].map((v) => (
          <div
            key={v.code}
            className="bg-white p-3.5 rounded-2xl border border-cream-200 flex items-center justify-between shadow-card hover:border-honey-300 transition-colors"
          >
            <div>
              <div className="flex items-center space-x-1 text-honey-600 font-bold text-xs mb-0.5">
                <Tag className="w-3.5 h-3.5" />
                <span>{v.discount}</span>
              </div>
              <p className="text-[11px] text-charcoal-400">{v.condition}</p>
            </div>
            <button
              onClick={() => copyCoupon(v.code)}
              className="px-3 py-1.5 rounded-full bg-honey-100 hover:bg-honey-500 hover:text-white text-honey-700 text-xs font-bold transition-all active:scale-95"
            >
              Lưu Mã
            </button>
          </div>
        ))}
      </div>

      {/* TAB SEGMENTED CONTROL */}
      <div className="bg-cream-100 p-1.5 rounded-2xl grid grid-cols-2 lg:grid-cols-4 gap-1">
        {campaigns.map((camp) => {
          const isActive = activeTab === camp.id;
          return (
            <button
              key={camp.id}
              onClick={() => setActiveTab(camp.id)}
              data-track={`sale-tab-${camp.id}`}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all ${
                isActive
                  ? 'bg-white text-honey-600 shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              <span className="truncate">{camp.label}</span>
              <span
                className={`text-[10px] px-2 py-0.2 rounded-full font-semibold shrink-0 hidden sm:inline ${
                  isActive ? 'bg-honey-100 text-honey-700' : 'bg-cream-200 text-charcoal-600'
                }`}
              >
                {camp.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tóm tắt đợt Sale đang chọn */}
      <div className="flex items-center justify-between pb-2 border-b border-cream-200">
        <div>
          <h2 className="text-base sm:text-xl font-bold font-heading text-charcoal-900">
            {activeCampaignInfo?.label} ({filteredProducts.length} sản phẩm)
          </h2>
          <p className="text-xs text-charcoal-600">{activeCampaignInfo?.desc}</p>
        </div>
      </div>

      {/* Grid Sản Phẩm Khuyến Mãi */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}

export default function SalePage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto p-8 text-center text-charcoal-400">Đang tải ưu đãi...</div>}>
      <SaleContent />
    </Suspense>
  );
}
