'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { MobileFilterDrawer } from './MobileFilterDrawer';

interface FilterBarProps {
  activeSubcategory?: string;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  selectedPriceRange?: string;
  onPriceChange?: (price: string) => void;
  totalResults?: number;
}

export function FilterBar({
  activeSubcategory = 'all',
  sortBy = 'newest',
  onSortChange,
  selectedPriceRange = 'all',
  onPriceChange,
  totalResults,
}: FilterBarProps) {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const subcategories = [
    { label: 'Tất Cả', slug: 'all', href: '/be-gai' },
    { label: '👗 Váy Đầm', slug: 'vay', href: '/be-gai/vay' },
    { label: '👚 Áo Kiểu', slug: 'ao', href: '/be-gai/ao' },
    { label: '🩳 Quần Xinh', slug: 'quan', href: '/be-gai/quan' },
    { label: '✨ Set Bộ', slug: 'set-do', href: '/be-gai/set-do' },
  ];

  return (
    <div className="space-y-3 mb-6">
      {/* Category Pills Trượt Ngang Cho Mobile & Desktop */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          {subcategories.map((sub) => {
            const isSelected =
              (sub.slug === 'all' && pathname === '/be-gai') ||
              pathname === sub.href ||
              activeSubcategory === sub.slug;

            return (
              <Link
                key={sub.slug}
                href={sub.href}
                data-track={`filter-tab-${sub.slug}`}
                className={`px-3.5 py-2 rounded-full text-xs font-bold shrink-0 transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-honey-500 text-white shadow-sm'
                    : 'bg-cream-100 hover:bg-cream-200 text-charcoal-700 border border-cream-200'
                }`}
              >
                {sub.label}
              </Link>
            );
          })}
        </div>

        {/* Nút Bộ Lọc Drawer Mobile */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          data-track="open-filter-drawer"
          className="flex items-center space-x-1 px-3 py-2 rounded-full bg-white border border-cream-300 text-charcoal-800 text-xs font-semibold hover:bg-cream-50 transition-colors shrink-0 shadow-sm"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-honey-600" />
          <span>Bộ Lọc</span>
        </button>
      </div>

      {/* Dòng tóm tắt kết quả & Sort Dropdown */}
      <div className="flex items-center justify-between text-xs text-charcoal-400 pt-1 border-t border-cream-200">
        <div>
          {totalResults !== undefined && (
            <span>
              Hiển thị <strong className="text-charcoal-900 font-bold">{totalResults}</strong> mẫu cho bé
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-charcoal-400" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange && onSortChange(e.target.value)}
            className="bg-transparent text-charcoal-800 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="newest">Mới nhất</option>
            <option value="best-seller">Bán chạy nhất</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
          </select>
        </div>
      </div>

      {/* Drawer Filter */}
      <MobileFilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedPriceRange={selectedPriceRange}
        onPriceChange={onPriceChange}
      />
    </div>
  );
}
