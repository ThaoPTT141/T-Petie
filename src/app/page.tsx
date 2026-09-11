import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Heart, Star, ShieldCheck, Flame } from 'lucide-react';
import localProducts from '@/data/products.json';
import localCollections from '@/data/collections.json';
import { Product } from '@/types/product';
import { Collection } from '@/types/collection';
import { ProductGrid } from '@/components/product/ProductGrid';
import { LookbookCarousel } from '@/components/collection/LookbookCarousel';

export default function HomePage() {
  const products = localProducts as Product[];
  const collections = localCollections as Collection[];

  const bestSellers = products.filter((p) => p.isBestSeller);
  const newArrivals = products.filter((p) => p.isNewArrival);
  const flashSaleProducts = products.filter((p) => p.isSale);

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* 1. HERO BANNER SECTION */}
      <section className="relative px-4 sm:px-6 pt-4 max-w-6xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-cream-100 via-blush-50 to-sage-50 border border-cream-200 shadow-soft p-6 sm:p-12">
          {/* Decorative background blob */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-honey-100/60 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-sage-100/60 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            {/* Tag BST */}
            <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-honey-500 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BST Tựu Trường: Học Xinh Kem</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-heading text-charcoal-900 leading-tight mb-4">
              Ngọt ngào, trong trẻo &amp; nâng niu từng bước chạm của bé yêu
            </h1>

            <p className="text-xs sm:text-base text-charcoal-700 leading-relaxed mb-6 sm:mb-8">
              Tuyển tập những thiết kế thời trang cho bé gái từ <strong>thô đũi organic</strong> và <strong>voan tơ lụa mềm mại</strong>. Thoáng mát, thấm hút mồ hôi và êm ái tuyệt đối cho làn da bé non nớt.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/be-gai"
                data-track="hero-cta-shop-girls"
                className="px-6 py-3 rounded-full bg-honey-500 hover:bg-honey-600 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center space-x-2"
              >
                <span>Mua Sắm Đồ Bé Gái</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/bo-suu-tap/hoc-xinh-kem"
                data-track="hero-cta-view-lookbook"
                className="px-6 py-3 rounded-full bg-white hover:bg-cream-100 text-charcoal-900 border border-cream-300 text-xs sm:text-sm font-bold transition-all active:scale-95"
              >
                <span>Xem BST Học Xinh</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BỐN CATEGORY CARDS — Client Navigation Trực Tiếp */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold font-heading text-charcoal-900">
              Danh Mục Mẹ Tìm Kiếm
            </h2>
            <p className="text-xs text-charcoal-400">Chọn nhanh theo kiểu dáng bé yêu thích</p>
          </div>
          <Link
            href="/be-gai"
            className="text-xs font-bold text-honey-600 hover:text-honey-700 flex items-center space-x-1"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              title: 'Váy Công Chúa',
              slug: 'vay',
              desc: 'Voan tơ bồng xòe ngọt ngào',
              color: 'from-blush-100 to-blush-50 text-blush-600 border-blush-200',
              icon: '👗',
              count: '24+ mẫu',
            },
            {
              title: 'Áo Sơ Mi & Kiểu',
              slug: 'ao',
              desc: 'Cổ sen thêu tay vintage',
              color: 'from-honey-100 to-cream-50 text-honey-700 border-honey-200',
              icon: '👚',
              count: '18+ mẫu',
            },
            {
              title: 'Quần Bloomer & Yếm',
              slug: 'quan',
              desc: 'Thô đũi mát, lưng chun êm',
              color: 'from-sage-100 to-sage-50 text-sage-700 border-sage-200',
              icon: '🩳',
              count: '12+ mẫu',
            },
            {
              title: 'Set Bộ Phối Sẵn',
              slug: 'set-do',
              desc: 'Tiện lợi, mặc là xinh',
              color: 'from-cream-200 to-cream-100 text-charcoal-800 border-cream-300',
              icon: '✨',
              count: '16+ mẫu',
            },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/be-gai/${cat.slug}`}
              data-track={`home-category-card-${cat.slug}`}
              className={`group p-4 sm:p-5 rounded-3xl bg-gradient-to-br ${cat.color} border shadow-card hover:shadow-soft transition-all duration-300 active:scale-95 flex flex-col justify-between`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-sm shadow-2xs">
                  {cat.count}
                </span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm sm:text-base mb-0.5">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-charcoal-600 line-clamp-1">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BỘ SƯU TẬP LOOKBOOK CAROUSEL (4 BST) */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-honey-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chuyện Của Mùa</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold font-heading text-charcoal-900">
              Bộ Sưu Tập Nổi Bật
            </h2>
          </div>
          <Link
            href="/bo-suu-tap"
            className="text-xs font-bold text-honey-600 hover:text-honey-700 flex items-center space-x-1"
          >
            <span>Xem Lookbook</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <LookbookCarousel collections={collections} />
      </section>

      {/* 4. FLASH SALE BANNER SECTION */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-honey-500 via-blush-500 to-honey-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative z-10 space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
              <Flame className="w-4 h-4 text-yellow-300" />
              <span>Ưu Đãi Độc Quyền Tháng 9</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold font-heading">
              Đại Lễ 2/9 — Giảm Đến 30% Đồ Xinh Cho Bé
            </h2>
            <p className="text-xs sm:text-sm text-white/90 max-w-lg">
              Áp dụng cho toàn bộ các mẫu váy hoa nhí, áo cổ sen và set đồ organic mới nhất.
            </p>
          </div>

          <Link
            href="/sale"
            data-track="home-flash-sale-banner"
            className="relative z-10 px-6 py-3 rounded-full bg-white text-honey-600 hover:bg-cream-100 font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95 shrink-0"
          >
            Săn Sale Ngay 🛍️
          </Link>
        </div>
      </section>

      {/* 5. BEST SELLERS GRID */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-1 text-xs font-bold text-sage-700 uppercase tracking-wider mb-1">
              <Heart className="w-3.5 h-3.5 fill-sage-500 text-sage-500" />
              <span>Mẹ Bỉm Tin Chọn</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold font-heading text-charcoal-900">
              Sản Phẩm Bán Chạy Nhất
            </h2>
          </div>
          <Link
            href="/be-gai"
            className="text-xs font-bold text-honey-600 hover:text-honey-700 flex items-center space-x-1"
          >
            <span>Khám phá thêm</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={bestSellers} />
      </section>

      {/* 6. VÌ SAO MẸ YÊU THÍCH T'PETIE */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="bg-cream-100/70 border border-cream-200 rounded-3xl p-6 sm:p-10 text-center">
          <span className="text-xs font-bold text-honey-600 uppercase tracking-wider block mb-2">
            Chất Lượng Là Danh Dự
          </span>
          <h2 className="text-xl sm:text-3xl font-bold font-heading text-charcoal-900 mb-8">
            Những điều làm nên sự khác biệt của T&apos;Petie
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-card">
              <span className="text-2xl mb-2 block">🌿</span>
              <h3 className="font-heading font-bold text-sm text-charcoal-900 mb-1">100% Cotton &amp; Đũi Tự Nhiên</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Vải được dệt từ sợi tự nhiên hữu cơ, không sử dụng hóa chất nhuộm độc hại, an toàn với làn da non nớt.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-card">
              <span className="text-2xl mb-2 block">🪡</span>
              <h3 className="font-heading font-bold text-sm text-charcoal-900 mb-1">Đường May Lộn Ẩn Tinh Tế</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Mọi đường chỉ và cúc bấm đều được xử lý giấu mép kỹ càng, đảm bảo không cọ xát hay làm đau bé khi vận động.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-card">
              <span className="text-2xl mb-2 block">🧸</span>
              <h3 className="font-heading font-bold text-sm text-charcoal-900 mb-1">Phom Dáng Dễ Mặc Bỉm</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Thiết kế đũng quần và váy rộng rãi, có cúc bấm đũng tiện lợi cho mẹ thay bỉm cho bé chỉ trong 30 giây.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
