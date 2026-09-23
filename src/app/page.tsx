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
import { HeroCarousel } from '@/components/home/HeroCarousel';

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
        <HeroCarousel />
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
        <Link 
          href="/sale"
          className="block relative w-full rounded-3xl overflow-hidden shadow-soft hover:shadow-md transition-shadow bg-[#f9f0e0]"
          style={{ aspectRatio: '3168 / 1344' }}
          data-track="home-flash-sale-banner"
        >
          <Image
            src="https://i.ibb.co/r2z85170/banner-uu-dai-png.png"
            alt="Ưu đãi độc quyền - Giảm đến 30%"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-contain"
          />
        </Link>
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
