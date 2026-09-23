import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Sparkles, ArrowLeft } from 'lucide-react';
import localCollections from '@/data/collections.json';
import localProducts from '@/data/products.json';
import { Collection } from '@/types/collection';
import { Product } from '@/types/product';
import { ProductGrid } from '@/components/product/ProductGrid';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const collections = localCollections as Collection[];
  return collections.map((col) => ({
    slug: col.id,
  }));
}

export default function CollectionDetailPage({ params }: PageProps) {
  const collections = localCollections as Collection[];
  const allProducts = localProducts as Product[];

  const collection = collections.find((c) => c.id === params.slug);

  if (!collection) {
    notFound();
  }

  // Lọc các sản phẩm thuộc BST này
  const productsInCollection = allProducts.filter(
    (p) => p.collectionId === collection.id || collection.featuredProductIds?.includes(p.id)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 pb-8 space-y-8">
      <Breadcrumb
        items={[
          { label: 'Bộ Sưu Tập', href: '/bo-suu-tap' },
          { label: collection.title, href: `/bo-suu-tap/${collection.id}` },
        ]}
      />

      {/* Hero Banner BST */}
      <div className="relative rounded-3xl overflow-hidden bg-[#FDFDFB] border border-cream-200 shadow-soft">
        <div className="relative w-full h-80 sm:h-[420px] md:h-[480px] bg-[#FDFDFB] flex items-center justify-center">
          {/* Logo T'Petie watermark mờ tinh tế */}
          <div className="absolute top-4 right-5 sm:top-6 sm:right-8 opacity-25 select-none pointer-events-none z-10">
            <span className="font-heading italic font-extrabold text-base sm:text-2xl text-honey-800 tracking-wider">
              T&apos;Petie ✨
            </span>
          </div>

          {/* Ảnh Banner với background-size: contain / object-contain trọn vẹn không bị cắt xén */}
          <Image
            src={collection.bannerImage}
            alt={collection.title}
            fill
            priority
            quality={100}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
            className="object-contain object-center z-0 transition-transform duration-500"
          />

          {/* Thẻ Text Thông Tin BST đặt cân đối trên nền kem trống, không đè lên bé gái */}
          <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-4 sm:p-6 md:p-8 pointer-events-none z-10">
            <div className="max-w-xs sm:max-w-sm bg-white/90 md:bg-white/85 backdrop-blur-md p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-cream-200/80 shadow-md text-charcoal-900 pointer-events-auto">
              {collection.season && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-honey-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 shadow-2xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {collection.season}
                </span>
              )}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading text-charcoal-900 mb-1.5 leading-tight">
                {collection.title}
              </h1>
              {collection.subtitle && (
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {collection.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Câu Chuyện Cảm Hứng & Lookbook */}
      {(Boolean(collection.story) || (Boolean(collection.lookbookImages) && collection.lookbookImages.length > 0)) && (
        <div className="bg-cream-100/60 rounded-3xl p-6 sm:p-8 border border-cream-200">
          {collection.story && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-honey-600 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-honey-500" />
                <span>Cảm Hứng Thiết Kế</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold font-heading text-charcoal-900 mb-3">
                Câu chuyện đằng sau {collection.title}
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed max-w-3xl">
                {collection.story}
              </p>
            </div>
          )}

          {/* Gallery Lookbook nếu có */}
          {collection.lookbookImages && collection.lookbookImages.length > 0 && (
            <div className={collection.story ? 'mt-6 pt-6 border-t border-cream-200' : ''}>
              <h3 className="text-xs font-bold text-charcoal-800 uppercase tracking-wider mb-3">
                Khoảnh Khắc Lookbook Cùng Bé
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {collection.lookbookImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-200">
                    <Image
                      src={img}
                      alt={`${collection.title} lookbook ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Danh Sách Sản Phẩm Thuộc BST */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold font-heading text-charcoal-900">
              Sản Phẩm Trong BST ({productsInCollection.length})
            </h2>
            <p className="text-xs text-charcoal-400">Các thiết kế độc quyền thuộc bộ sưu tập</p>
          </div>
          <Link
            href="/bo-suu-tap"
            className="text-xs font-bold text-honey-600 hover:text-honey-700 flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Tất cả BST</span>
          </Link>
        </div>

        <ProductGrid products={productsInCollection} />
      </div>
    </div>
  );
}
