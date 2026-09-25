'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { useToast } from '@/context/ToastContext';
import { useCart } from '@/context/CartContext';
import { trackEvent } from '@/lib/analytics/tracker';
import { Product, ProductSizeOption } from '@/types/product';
import {
  SaleProduct,
  SALE_PRODUCTS_DATA,
  CAMPAIGN_INFO,
  SIZES_STANDARD,
  SizeStandard,
} from '@/data/saleProducts';

type CampaignKey = 'all' | 'le2-9' | 'sale-he' | 'sale-thu-dong' | 'sale-ngay-doi';

function SaleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast } = useToast();
  const { addToCart, openMiniCart } = useCart();

  const [activeTab, setActiveTab] = useState<CampaignKey>('all');
  const [selectedProduct, setSelectedProduct] = useState<SaleProduct | null>(null);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState<number>(0);
  const [copiedVoucher, setCopiedVoucher] = useState<string | null>(null);

  // Đếm ngược thực tế (Ngày : Giờ : Phút : Giây)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 20,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Lắng nghe query param `?campaign=...`
  useEffect(() => {
    const campaignParam = searchParams.get('campaign');
    if (campaignParam) {
      if (campaignParam === 'dai-le-2-9' || campaignParam === 'le2-9') {
        setActiveTab('le2-9');
      } else if (['all', 'sale-he', 'sale-thu-dong', 'sale-ngay-doi'].includes(campaignParam)) {
        setActiveTab(campaignParam as CampaignKey);
      }
    }
  }, [searchParams]);

  // Bộ lọc sản phẩm
  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return SALE_PRODUCTS_DATA;
    return SALE_PRODUCTS_DATA.filter((p) => p.campaign === activeTab);
  }, [activeTab]);

  const campaignTabs: { id: CampaignKey; label: string; icon: string; count: number }[] = [
    { id: 'all', label: 'Tất Cả', icon: '✨', count: 49 },
    { id: 'le2-9', label: 'Mừng Đại Lễ 2/9', icon: '🎉', count: 8 },
    { id: 'sale-he', label: 'Sale Hè', icon: '☀️', count: 21 },
    { id: 'sale-thu-dong', label: 'Sale Thu - Đông', icon: '🍂', count: 13 },
    { id: 'sale-ngay-doi', label: 'Sale Ngày Đôi', icon: '🎁', count: 7 },
  ];

  const handleSelectCampaign = (id: CampaignKey) => {
    setActiveTab(id);
    const newParams = new URLSearchParams(window.location.search);
    if (id === 'all') {
      newParams.delete('campaign');
    } else {
      newParams.set('campaign', id);
    }
    const queryString = newParams.toString();
    router.replace(queryString ? `/sale?${queryString}` : '/sale', { scroll: false });

    trackEvent('filter_campaign_tab' as any, {
      campaign_selected: id,
      source: 'sale_page_nextjs',
    });
  };

  const activeCampaignInfo = CAMPAIGN_INFO[activeTab] || CAMPAIGN_INFO.all;

  // Xử lý lưu mã giảm giá
  const handleCopyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedVoucher(code);
    showToast(`Đã lưu mã giảm giá "${code}" vào khay nhớ tạm!`, 'success');
    trackEvent('apply_promotion' as any, { coupon: code });
  };

  // Mở modal Xem Size
  const handleOpenSizeModal = (product: SaleProduct) => {
    setSelectedProduct(product);
    setSelectedSizeIdx(0);
    trackEvent('promotion_click' as any, {
      campaign: product.campaign,
      action: 'view-size',
      item_id: product.id,
      item_name: product.name,
      price: product.salePrice,
    });
  };

  // Thêm nhanh vào giỏ hàng
  const handleAddToCart = (product: SaleProduct, size?: SizeStandard) => {
    const chosenSize = size || SIZES_STANDARD[0];
    const sizeOption: ProductSizeOption = {
      size: chosenSize.size,
      weightRange: chosenSize.weight,
      ageRange: chosenSize.age,
      price: product.salePrice,
      stock: 50,
    };

    const productAdapter: Product = {
      id: `sale-${product.id}`,
      sku: `TP-SKU-${String(product.id).padStart(3, '0')}`,
      name: product.name,
      category: 'be-gai',
      categoryName: product.collection,
      collectionName: product.collection,
      material: 'Thô cotton cao cấp, mềm mát, may chuẩn bé Việt',
      materialFeatures: ['Thô cotton mềm mát', 'Thêu tay thủ công'],
      sizes: [sizeOption],
      basePrice: product.salePrice,
      originalPrice: product.originalPrice,
      discountPercent: parseInt(product.discount.replace(/[^0-9]/g, '')) || 0,
      images: [product.image],
      thumbnail: product.image,
      isSale: true,
      description: `Sản phẩm ưu đãi trong ${product.collection}. Phù hợp cho bé từ 8kg - 22kg.`,
      careInstructions: ['Giặt nhẹ nhàng bằng nước mát', 'Là ủi nhiệt độ vừa'],
      origin: "Thiết kế & May đo T'Petie",
      rating: 5.0,
      reviewCount: 48,
    };

    addToCart(productAdapter, sizeOption, 1);

    // Đồng bộ vào localStorage tpetie_cart
    try {
      const raw = localStorage.getItem('tpetie_cart');
      const cartArr = raw ? JSON.parse(raw) : [];
      const cartItemId = `${product.id}-${chosenSize.size}`;
      const existing = cartArr.find((i: any) => i.id === cartItemId);
      if (existing) {
        existing.quantity += 1;
      } else {
        cartArr.push({
          id: cartItemId,
          productId: product.id,
          name: product.name,
          collectionName: product.collection,
          campaign: product.campaign,
          size: chosenSize.size,
          price: product.salePrice,
          originalPrice: product.originalPrice,
          image: product.image,
          quantity: 1,
        });
      }
      localStorage.setItem('tpetie_cart', JSON.stringify(cartArr));
    } catch (e) {
      console.warn('Could not sync tpetie_cart', e);
    }

    showToast(`Đã thêm "${product.name} (${chosenSize.size})" vào giỏ hàng!`, 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-6 sm:space-y-8">
      {/* BREADCRUMB */}
      <Breadcrumb items={[{ label: 'Chương Trình Ưu Đãi & Khuyến Mãi', href: '/sale' }]} />

      {/* ==================== HERO SALE BANNER & COUNTDOWN ==================== */}
      <section className="relative rounded-3xl border border-rose-100/70 shadow-sm overflow-hidden bg-gradient-to-r from-amber-50 via-rose-50 to-orange-50 p-5 sm:p-7 md:p-8 lg:p-10 text-charcoal-900 transition-all">
        {/* Decorative Warm & Pastel Glows */}
        <div className="absolute -right-12 -top-12 w-64 sm:w-80 h-64 sm:h-80 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-56 sm:w-72 h-56 sm:h-72 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-orange-100/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-6 lg:gap-8">
          {/* Cột Trái (Nội dung & Countdown): Mobile xếp trên, Desktop chiếm 7/12 */}
          <div className="order-1 md:order-1 md:col-span-7 lg:col-span-7 space-y-3.5 sm:space-y-4 text-center md:text-left">
            {/* Tag nhỏ xinh */}
            <div className="inline-flex items-center space-x-1.5 text-rose-600 bg-white/80 border border-rose-200 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-xs">
              <span>✨</span>
              <span>Mùa Yêu Thương Cho Bé • Flash Sale Giới Hạn</span>
            </div>

            {/* Tiêu đề thời trang & Subtitle */}
            <div className="space-y-1.5 sm:space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-charcoal-900 tracking-tight leading-tight">
                T&apos;Petie Ưu Đãi Mùa Lễ Hội
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed max-w-xl mx-auto md:mx-0 font-normal">
                Dành riêng những thiết kế thêu tay thủ công ngọt ngào nhất cho thiên thần nhỏ của mẹ.
                Tuyển chọn trang phục chất liệu tự nhiên, mềm mại và chuẩn form dáng bé Việt.
              </p>
            </div>

            {/* Đồng hồ đếm ngược (Countdown Timer): Ngày : Giờ : Phút : Giây */}
            <div className="pt-1 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2.5 sm:gap-3">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                {/* Ngày */}
                <div className="bg-white shadow-sm border border-rose-100 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-center min-w-[48px] sm:min-w-[54px]">
                  <span className="block font-mono font-extrabold text-base sm:text-lg text-rose-600 leading-tight">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="block text-[9.5px] uppercase font-bold text-charcoal-400 tracking-wider">
                    Ngày
                  </span>
                </div>
                <span className="font-extrabold text-rose-300 text-sm sm:text-base pb-3.5">:</span>
                {/* Giờ */}
                <div className="bg-white shadow-sm border border-rose-100 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-center min-w-[48px] sm:min-w-[54px]">
                  <span className="block font-mono font-extrabold text-base sm:text-lg text-rose-600 leading-tight">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="block text-[9.5px] uppercase font-bold text-charcoal-400 tracking-wider">
                    Giờ
                  </span>
                </div>
                <span className="font-extrabold text-rose-300 text-sm sm:text-base pb-3.5">:</span>
                {/* Phút */}
                <div className="bg-white shadow-sm border border-rose-100 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-center min-w-[48px] sm:min-w-[54px]">
                  <span className="block font-mono font-extrabold text-base sm:text-lg text-rose-600 leading-tight">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="block text-[9.5px] uppercase font-bold text-charcoal-400 tracking-wider">
                    Phút
                  </span>
                </div>
                <span className="font-extrabold text-rose-300 text-sm sm:text-base pb-3.5">:</span>
                {/* Giây */}
                <div className="bg-white shadow-sm border border-rose-100 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-center min-w-[48px] sm:min-w-[54px]">
                  <span className="block font-mono font-extrabold text-base sm:text-lg text-rose-600 leading-tight">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="block text-[9.5px] uppercase font-bold text-charcoal-400 tracking-wider">
                    Giây
                  </span>
                </div>
              </div>

              {/* Freeship badge */}
              <div className="text-xs text-charcoal-700 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-xl inline-flex items-center space-x-1.5 border border-rose-100/80 shadow-xs">
                <span>🚚</span>
                <span className="font-medium">Freeship toàn quốc từ 399k</span>
              </div>
            </div>

            {/* Nút CTA: Khám Phá Ưu Đãi Ngay */}
            <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                type="button"
                onClick={() => {
                  document.getElementById('campaign-tabs-bar')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
              >
                <span>🛍️</span>
                <span>Khám Phá Ưu Đãi Ngay</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            {/* Trust Badges on Desktop */}
            <div className="hidden lg:flex items-center space-x-4 pt-1 text-[11.5px] text-charcoal-500 font-medium">
              <span className="flex items-center space-x-1">
                <span className="text-rose-500">✨</span>
                <span>100% Thêu tay thủ công</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <span className="text-sage-500">🌿</span>
                <span>Vải Linen &amp; Cotton hữu cơ</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <span className="text-honey-500">🔄</span>
                <span>Đổi size linh hoạt 7 ngày</span>
              </span>
            </div>
          </div>

          {/* Cột Phải (Khung ảnh thời trang sinh động) */}
          <div className="order-2 md:order-2 md:col-span-5 lg:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[270px] sm:max-w-[300px] lg:max-w-[330px]">
              {/* Decorative soft backdrop glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-rose-300/30 via-amber-200/30 to-orange-200/30 rounded-3xl blur-xl pointer-events-none" />

              {/* Khung ảnh chính bo góc nghệ thuật */}
              <div
                onClick={() => handleSelectCampaign('le2-9')}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border-2 border-white bg-white rotate-1 hover:rotate-0 transition-transform duration-300 group cursor-pointer"
              >
                <img
                  src="/images/promotions/le29-ao-dai.jpg"
                  alt="Set Áo Dài Đan Nguyệt T'Petie"
                  className="w-full h-56 sm:h-64 lg:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/sale/1789732196487_5483593727769673322_g1185252936286095617_666bdb327933b7460318fcc03f193be5.jpg';
                  }}
                />

                {/* Sticker giảm giá */}
                <div className="absolute top-2.5 right-2.5 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-extrabold text-[11px] sm:text-xs px-3 py-1 rounded-full shadow-md border border-white -rotate-6 flex items-center space-x-1 pointer-events-none">
                  <span>🏷️</span>
                  <span>Giảm tới 35%</span>
                </div>

                {/* Lookbook tag */}
                <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm text-charcoal-800 text-[10.5px] font-bold flex items-center space-x-1 border border-rose-100">
                  <span>🌸</span>
                  <span>Lookbook Mới Nhất</span>
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-md p-2.5 rounded-xl text-charcoal-900 flex items-center justify-between border border-rose-100 shadow-sm text-xs">
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-[11.5px] text-charcoal-900 truncate">Set Áo Dài Đan Nguyệt</div>
                    <div className="text-[10px] text-rose-600 font-semibold">Ưu đãi 30% • Chỉ từ 497.000đ</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-rose-500 text-white font-bold text-[10.5px] shrink-0 group-hover:bg-rose-600 transition-colors shadow-xs">
                    Xem ngay
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== VOUCHER KHUYẾN MÃI NHANH ==================== */}
      <section className="space-y-1.5">
        <div className="flex items-center justify-between sm:hidden px-1">
          <span className="text-[11px] font-bold text-charcoal-700 flex items-center space-x-1">
            <span>🎁</span>
            <span>Mã Ưu Đãi Dành Riêng Cho Mẹ</span>
          </span>
          <span className="text-[10px] text-rose-500 font-semibold">Vuốt xem thêm →</span>
        </div>

        <div className="snap-x snap-mandatory flex overflow-x-auto no-scrollbar gap-2.5 sm:gap-3.5 pb-1 -mx-3 px-3 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3">
          {/* Voucher 1: Giảm 20k */}
          <div className="min-w-[275px] sm:min-w-0 snap-center p-3 sm:p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-dashed border-rose-200 flex items-center justify-between shadow-card hover:border-rose-300 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300 shrink-0 relative overflow-hidden group">
            <div className="absolute -top-2.5 right-[86px] sm:right-[96px] w-4 h-4 rounded-full bg-[#FFFDF9] border border-rose-200 z-10" />
            <div className="absolute -bottom-2.5 right-[86px] sm:right-[96px] w-4 h-4 rounded-full bg-[#FFFDF9] border border-rose-200 z-10" />
            <div className="absolute top-2 bottom-2 right-[93px] sm:right-[103px] border-r border-dashed border-rose-200/90 pointer-events-none" />

            <div className="space-y-0.5 pr-4 flex-1 min-w-0">
              <div className="text-rose-600 font-bold text-xs sm:text-sm flex items-center space-x-1 truncate">
                <span>🏷️</span>
                <span>Giảm 20.000 VNĐ</span>
              </div>
              <p className="text-[10.5px] text-charcoal-500">
                Đơn từ 250k • Code: <strong className="text-charcoal-800 font-bold">TPETIE20</strong>
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleCopyVoucher('TPETIE20')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 shrink-0 min-h-[36px] flex items-center justify-center space-x-1 border ${
                copiedVoucher === 'TPETIE20'
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  : 'bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white border-rose-200'
              }`}
            >
              <span>{copiedVoucher === 'TPETIE20' ? '✓ Đã Lưu' : 'Lưu Mã'}</span>
            </button>
          </div>

          {/* Voucher 2: Freeship */}
          <div className="min-w-[275px] sm:min-w-0 snap-center p-3 sm:p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-dashed border-rose-200 flex items-center justify-between shadow-card hover:border-rose-300 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300 shrink-0 relative overflow-hidden group">
            <div className="absolute -top-2.5 right-[96px] sm:right-[106px] w-4 h-4 rounded-full bg-[#FFFDF9] border border-rose-200 z-10" />
            <div className="absolute -bottom-2.5 right-[96px] sm:right-[106px] w-4 h-4 rounded-full bg-[#FFFDF9] border border-rose-200 z-10" />
            <div className="absolute top-2 bottom-2 right-[103px] sm:right-[113px] border-r border-dashed border-rose-200/90 pointer-events-none" />

            <div className="space-y-0.5 pr-4 flex-1 min-w-0">
              <div className="text-sage-700 font-bold text-xs sm:text-sm flex items-center space-x-1 truncate">
                <span>🚚</span>
                <span>Freeship Toàn Quốc 0đ</span>
              </div>
              <p className="text-[10.5px] text-charcoal-500">Đơn từ 399k • Tự áp dụng khi giỏ đủ</p>
            </div>
            <span className="text-[11px] font-bold text-sage-700 bg-sage-50 px-3 py-1.5 rounded-full border border-sage-200 shrink-0 flex items-center space-x-1">
              <span>✓</span>
              <span>Tự Áp Dụng</span>
            </span>
          </div>

          {/* Voucher 3: Giảm 10% First Order */}
          <div className="min-w-[275px] sm:min-w-0 snap-center p-3 sm:p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-dashed border-rose-200 flex items-center justify-between shadow-card hover:border-rose-300 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300 shrink-0 relative overflow-hidden group">
            <div className="absolute -top-2.5 right-[86px] sm:right-[96px] w-4 h-4 rounded-full bg-[#FFFDF9] border border-rose-200 z-10" />
            <div className="absolute -bottom-2.5 right-[86px] sm:right-[96px] w-4 h-4 rounded-full bg-[#FFFDF9] border border-rose-200 z-10" />
            <div className="absolute top-2 bottom-2 right-[93px] sm:right-[103px] border-r border-dashed border-rose-200/90 pointer-events-none" />

            <div className="space-y-0.5 pr-4 flex-1 min-w-0">
              <div className="text-amber-600 font-bold text-xs sm:text-sm flex items-center space-x-1 truncate">
                <span>🎁</span>
                <span>Giảm 10% Tối Đa 50k</span>
              </div>
              <p className="text-[10.5px] text-charcoal-500">
                Mẹ mua lần đầu • Code: <strong className="text-charcoal-800 font-bold">MEMBERVIP</strong>
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleCopyVoucher('MEMBERVIP')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 shrink-0 min-h-[36px] flex items-center justify-center space-x-1 border ${
                copiedVoucher === 'MEMBERVIP'
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  : 'bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border-amber-200'
              }`}
            >
              <span>{copiedVoucher === 'MEMBERVIP' ? '✓ Đã Lưu' : 'Lưu Mã'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ==================== 5 CAMPAIGN FILTER TABS ==================== */}
      <section
        id="campaign-tabs-bar"
        className="sticky top-[56px] sm:top-[64px] z-30 bg-white/95 backdrop-blur-md py-2.5 px-3 sm:px-0 -mx-3 sm:mx-0 border-b border-cream-200/90 shadow-xs space-y-2"
      >
        <div className="flex items-center justify-between px-1 sm:px-0">
          <div className="flex items-center space-x-2">
            <span className="text-xs sm:text-base font-bold font-heading text-charcoal-900">
              Chiến Dịch Ưu Đãi
            </span>
            <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-blush-100 text-blush-600">
              {filteredProducts.length} sản phẩm
            </span>
          </div>
          <span className="text-[11px] text-charcoal-400 hidden sm:inline">
            Chọn chiến dịch để lọc danh sách sản phẩm
          </span>
        </div>

        {/* Horizontal Scroll Pill Tabs */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 overflow-x-auto md:overflow-x-visible no-scrollbar py-0.5 px-1 sm:px-0">
          {campaignTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectCampaign(tab.id)}
                className={`shrink-0 py-2 px-3.5 sm:px-4 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all flex items-center space-x-1.5 border active:scale-95 ${
                  isActive
                    ? 'font-bold bg-blush-100 text-blush-600 border-blush-300 shadow-sm'
                    : 'font-semibold bg-cream-50 hover:bg-cream-100 text-charcoal-600 border-cream-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span>
                  {tab.label} ({tab.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Campaign Banner Info Description */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-cream-50 border border-cream-200 text-[11px] sm:text-xs text-charcoal-700 flex items-center justify-between gap-2">
          <div className="flex items-center space-x-1.5">
            <span className="text-sm">{activeCampaignInfo.icon}</span>
            <span className="line-clamp-1 sm:line-clamp-none">{activeCampaignInfo.desc}</span>
          </div>
          <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-honey-100 text-honey-700 shrink-0">
            {activeCampaignInfo.tag}
          </span>
        </div>
      </section>

      {/* ==================== RESPONSIVE PROMOTION PRODUCT GRID ==================== */}
      <section>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-white rounded-3xl border border-cream-200 p-8 shadow-card">
            <div className="text-4xl">🧸</div>
            <h3 className="font-heading font-bold text-base text-charcoal-900">
              Chiến dịch này đang được chuẩn bị thêm sản phẩm
            </h3>
            <p className="text-xs text-charcoal-400">
              Mẹ hãy xem qua các chiến dịch ưu đãi khác hoặc bấm &quot;Tất Cả&quot; nhé!
            </p>
            <button
              type="button"
              onClick={() => handleSelectCampaign('all')}
              className="px-5 py-2 rounded-full bg-honey-500 text-white text-xs font-bold hover:bg-honey-600 transition-all"
            >
              Xem Tất Cả Ưu Đãi
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4 md:gap-5 lg:gap-6 px-0.5 sm:px-0">
            {filteredProducts.map((item, idx) => {
              const isFirstScreen = idx < 8;
              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-cream-200 overflow-hidden shadow-card hover:shadow-soft hover:border-blush-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative"
                >
                  <div>
                    {/* Product Image Frame: Fixed Height without Distortion */}
                    <div
                      onClick={() => handleOpenSizeModal(item)}
                      className="relative w-full h-[180px] sm:h-[260px] lg:h-[300px] overflow-hidden cursor-pointer bg-cream-100 flex-shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        loading={isFirstScreen ? 'eager' : 'lazy'}
                        className="object-cover w-full h-[180px] sm:h-[260px] lg:h-[300px] group-hover:scale-105 transition-transform duration-500 ease-out"
                        style={{
                          imageRendering: '-webkit-optimize-contrast',
                          transform: 'translateZ(0)',
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            '/images/sale/1789732196487_5483593727769673322_g1185252936286095617_666bdb327933b7460318fcc03f193be5.jpg';
                        }}
                      />
                      {/* Sale Badge */}
                      <span className="absolute top-2 left-2 text-[10px] sm:text-[11px] font-extrabold bg-gradient-to-r from-rose-500 to-rose-600 text-white px-1.5 sm:px-2 py-0.5 rounded-full shadow-md">
                        {item.discount}
                      </span>
                      {/* Collection Tag */}
                      <span className="absolute top-2 right-2 text-[8.5px] sm:text-[9.5px] font-bold bg-white/90 backdrop-blur-md text-honey-700 px-1.5 sm:px-2 py-0.5 rounded-full border border-cream-200 max-w-[58%] truncate shadow-xs">
                        {item.collection}
                      </span>
                      {/* Size Tag */}
                      <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[8.5px] sm:text-[9.5px] bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-lg truncate border border-cream-200 text-charcoal-700 font-medium shadow-xs">
                        📏 Size: {item.size}
                      </span>
                    </div>

                    {/* Product Info */}
                    <div className="p-2.5 sm:p-3.5 space-y-1 sm:space-y-1.5">
                      <div className="text-[9.5px] sm:text-[11px] font-bold text-honey-600 uppercase tracking-wider line-clamp-1">
                        {item.collection}
                      </div>
                      <h3
                        onClick={() => handleOpenSizeModal(item)}
                        className="text-xs sm:text-sm font-bold text-charcoal-900 line-clamp-2 cursor-pointer group-hover:text-honey-600 transition-colors leading-snug min-h-[32px] sm:min-h-[38px]"
                      >
                        {item.name}
                      </h3>

                      {/* Giá */}
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-base font-bold text-rose-600">
                          {item.salePrice.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          {item.originalPrice.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-[11px] font-semibold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">
                          {item.discount}
                        </span>
                      </div>

                      {/* Subtitle Size Range */}
                      <div className="flex items-center justify-between text-[9.5px] sm:text-[10.5px] text-charcoal-500 pt-1">
                        <span className="font-medium text-sage-700 truncate max-w-[65%]">
                          👶 {item.size}
                        </span>
                        <span className="text-rose-600 font-bold shrink-0">🔥 Hot</span>
                      </div>
                    </div>
                  </div>

                  {/* 2 CTA Buttons */}
                  <div className="p-2.5 sm:p-3.5 pt-0 grid grid-cols-2 gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenSizeModal(item)}
                      className="w-full min-h-[40px] py-2 px-1 rounded-xl bg-cream-50 hover:bg-honey-50 hover:text-honey-700 hover:border-honey-300 text-charcoal-800 text-[11px] sm:text-xs font-bold flex items-center justify-center space-x-1 border border-cream-300 transition-all duration-200 active:scale-95"
                      title="Xem size và thông số cân nặng"
                    >
                      <span>📏</span>
                      <span className="truncate">Xem size</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      className="w-full min-h-[40px] py-2 px-1 rounded-xl bg-honey-500 hover:bg-honey-600 text-white text-[11px] sm:text-xs font-bold flex items-center justify-center space-x-1 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                      title="Thêm ngay vào giỏ hàng"
                    >
                      <span>🛍️</span>
                      <span className="truncate">Thêm giỏ</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ==================== PSYCHOLOGY ASSURANCE SECTION ==================== */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
        <div className="p-3.5 rounded-2xl bg-white border border-cream-200 text-center space-y-1 shadow-xs">
          <span className="text-2xl">🌿</span>
          <h4 className="font-heading font-bold text-xs text-charcoal-900">Vải Thô &amp; Voan An Toàn</h4>
          <p className="text-[10px] text-charcoal-400">100% mềm mát dịu nhẹ cho da bé</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-cream-200 text-center space-y-1 shadow-xs">
          <span className="text-2xl">📐</span>
          <h4 className="font-heading font-bold text-xs text-charcoal-900">Chuẩn Form Dáng Bé Việt</h4>
          <p className="text-[10px] text-charcoal-400">May đo theo cân nặng &amp; tháng tuổi</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-cream-200 text-center space-y-1 shadow-xs">
          <span className="text-2xl">🔄</span>
          <h4 className="font-heading font-bold text-xs text-charcoal-900">Đổi Size Miễn Phí 7 Ngày</h4>
          <p className="text-[10px] text-charcoal-400">Tận nhà nếu bé mặc chưa vừa</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-cream-200 text-center space-y-1 shadow-xs">
          <span className="text-2xl">🎁</span>
          <h4 className="font-heading font-bold text-xs text-charcoal-900">Đóng Hộp Quà Chu Đáo</h4>
          <p className="text-[10px] text-charcoal-400">Tặng kèm thiệp viết tay xinh xắn</p>
        </div>
      </section>

      {/* ==================== QUICK SIZE SELECTOR MODAL / BOTTOM SHEET ==================== */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300">
          {/* Backdrop click */}
          <div className="absolute inset-0" onClick={() => setSelectedProduct(null)} />

          {/* Sheet Container */}
          <div className="relative z-10 w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-cream-200 space-y-3.5 max-h-[88vh] overflow-y-auto transform transition-transform duration-300 ease-out">
            {/* Mobile drag handle */}
            <div
              className="w-12 h-1.5 bg-cream-300 rounded-full mx-auto sm:hidden cursor-pointer"
              onClick={() => setSelectedProduct(null)}
            />

            {/* Header */}
            <div className="flex justify-between items-start pb-2 border-b border-cream-200">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                    {selectedProduct.discount}
                  </span>
                  <span className="text-[11px] text-charcoal-400 font-mono">
                    TP-SKU-{String(selectedProduct.id).padStart(3, '0')}
                  </span>
                  <span className="text-[10px] font-bold text-honey-700 bg-honey-50 px-2 py-0.5 rounded-full">
                    {selectedProduct.collection}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-charcoal-900 line-clamp-1">
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="p-1.5 rounded-full text-charcoal-400 hover:bg-cream-100 hover:text-charcoal-700 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Price & Image Summary */}
            <div className="flex items-center space-x-3 bg-cream-50 p-2.5 sm:p-3 rounded-2xl border border-cream-200">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-white shrink-0 border border-cream-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    '/images/sale/1789732196487_5483593727769673322_g1185252936286095617_666bdb327933b7460318fcc03f193be5.jpg';
                }}
              />
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-base sm:text-lg font-bold text-rose-600 font-heading">
                    {selectedProduct.salePrice.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    {selectedProduct.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded ml-auto">
                    {selectedProduct.discount}
                  </span>
                </div>
                <p className="text-[11px] text-sage-700 font-medium">Đủ Size: {selectedProduct.size}</p>
                <span className="text-[10px] text-blush-600 font-semibold block">
                  Tiết kiệm {(selectedProduct.originalPrice - selectedProduct.salePrice).toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>

            {/* Size Selection Buttons */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-charcoal-800 flex items-center space-x-1">
                  <span>👶</span>
                  <span>
                    Chọn kích cỡ bé mặc vừa vặn:{' '}
                    <strong className="text-honey-600">Size 1 - 6 (8kg - 22kg)</strong>
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SIZES_STANDARD.map((s, idx) => {
                  const isSelected = idx === selectedSizeIdx;
                  return (
                    <button
                      key={s.size}
                      type="button"
                      onClick={() => {
                        setSelectedSizeIdx(idx);
                        trackEvent('select_size_option' as any, {
                          item_id: selectedProduct.id,
                          size_name: s.size,
                          price: selectedProduct.salePrice,
                        });
                      }}
                      className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all active:scale-95 ${
                        isSelected
                          ? 'border-honey-500 bg-honey-50/90 ring-2 ring-honey-400/40 text-charcoal-900 font-bold'
                          : 'border-cream-300 bg-white hover:border-honey-300 text-charcoal-700'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-xs font-bold">{s.size}</span>
                        <span className="text-[10px] text-rose-600 font-bold">
                          {selectedProduct.salePrice.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                      <div className="text-[11px] text-sage-700 font-semibold">{s.weight}</div>
                      <div className="text-[9.5px] text-charcoal-400">{s.age}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Embedded Size Chart */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-charcoal-700">
                <span className="flex items-center space-x-1">
                  <span>📏</span>
                  <span>Bảng Thông Số Chuẩn Theo Cân Nặng Bé</span>
                </span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-cream-200">
                <table className="w-full text-[10.5px] text-left">
                  <thead className="bg-cream-100 font-bold text-charcoal-800">
                    <tr>
                      <th className="py-1.5 px-2">Size</th>
                      <th className="py-1.5 px-2">Cân Nặng</th>
                      <th className="py-1.5 px-2">Chiều Cao</th>
                      <th className="py-1.5 px-2">Độ Tuổi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-100 text-charcoal-600">
                    {SIZES_STANDARD.map((s) => (
                      <tr key={s.size} className="hover:bg-honey-50/50">
                        <td className="py-1 px-2 font-bold text-honey-700">{s.size}</td>
                        <td className="py-1 px-2 font-semibold text-rose-600">{s.weight}</td>
                        <td className="py-1 px-2">{s.age.split('(')[1]?.replace(')', '') || '75 - 85 cm'}</td>
                        <td className="py-1 px-2">{s.age.split('(')[0]?.trim()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Advice Note */}
            <div className="text-[10.5px] text-charcoal-600 bg-sage-50 border border-sage-200/80 p-2.5 rounded-xl flex items-start space-x-2">
              <span>💡</span>
              <span>
                Mẹo nhỏ cho mẹ: Form đồ T&apos;Petie may chuẩn theo vóc dáng bé Việt. Nếu bé mũm mĩm hoặc mẹ
                muốn bé mặc lâu hơn một chút, mẹ hãy tăng <strong>1 size</strong> nhé!
              </span>
            </div>

            {/* Sticky Add to Cart CTA */}
            <div className="pt-1 sticky bottom-0 bg-white pb-1">
              <button
                type="button"
                onClick={() => {
                  handleAddToCart(selectedProduct, SIZES_STANDARD[selectedSizeIdx]);
                  setSelectedProduct(null);
                  openMiniCart();
                }}
                className="w-full min-h-[46px] py-3 rounded-full bg-honey-500 hover:bg-honey-600 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>🛍️ Thêm Vào Giỏ Hàng</span>
                <span>• {selectedProduct.salePrice.toLocaleString('vi-VN')}đ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SalePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto p-12 text-center text-charcoal-400">
          Đang tải chương trình ưu đãi...
        </div>
      }
    >
      <SaleContent />
    </Suspense>
  );
}
