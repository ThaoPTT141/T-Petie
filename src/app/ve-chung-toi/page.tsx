'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Heart, 
  Compass, 
  Target, 
  Award, 
  ChevronRight, 
  ArrowRight, 
  Shirt, 
  Smile, 
  Camera, 
  Feather, 
  CheckCircle2,
  Flower,
  Gift,
  Star
} from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

// 5 Main Tabs Data
const ABOUT_TABS = [
  {
    id: 'story',
    number: '01',
    title: 'Câu chuyện thương hiệu',
    subtitle: 'Hành trình từ năm 2021',
    icon: Sparkles,
    color: 'from-blush-100 to-sage-100 text-blush-600 border-blush-100',
  },
  {
    id: 'belief',
    number: '02',
    title: 'Niềm Tin',
    subtitle: 'Tuổi thơ chỉ cần được nâng niu',
    icon: Heart,
    color: 'from-blush-100 to-sage-100 text-blush-600 border-blush-100',
  },
  {
    id: 'vision',
    number: '03',
    title: 'Tầm nhìn',
    subtitle: 'Hệ sinh thái Lifestyle cho bé',
    icon: Flower,
    color: 'from-blush-100 to-sage-100 text-blush-600 border-blush-100',
  },
  {
    id: 'mission',
    number: '04',
    title: 'Sứ mệnh',
    subtitle: 'Cùng tâm hồn nhỏ bé lớn lên',
    icon: Gift,
    color: 'from-blush-100 to-sage-100 text-blush-600 border-blush-100',
  },
  {
    id: 'values',
    number: '05',
    title: 'Giá trị cốt lõi',
    subtitle: '4 nguyên tắc bất biến',
    icon: Star,
    color: 'from-blush-100 to-sage-100 text-blush-600 border-blush-100',
  },
];

function AboutContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>('story');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ABOUT_TABS.some((t) => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-8 sm:space-y-12">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Về Chúng Tôi', href: '/ve-chung-toi' }]} />

      {/* 1. HERO HEADER BANNER (Soft & Poetic) */}
      <section className="relative rounded-3xl overflow-hidden shadow-soft w-full aspect-[2/1] sm:aspect-[21/9] lg:aspect-[3/1]">
        <img 
          src="/images/anh-nen-face.jpg" 
          alt="Học Xinh - T'Petie" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        {/* Overlay text on the right side */}
        <div className="absolute inset-0 flex items-center justify-end pr-8 sm:pr-12 md:pr-24 lg:pr-32 pointer-events-none">
          <div className="text-right space-y-1 sm:space-y-2 bg-white/40 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/50 shadow-sm lg:bg-transparent lg:backdrop-blur-none lg:p-0 lg:border-none lg:shadow-none">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-blush-600 drop-shadow-sm">
              T&apos;Petie
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-serif italic text-charcoal-700">
              Made for little souls.
            </p>
          </div>
        </div>

        {/* Ẩn text đi để giữ SEO nhưng không hiển thị chồng chéo lên ảnh vì ảnh đã có chữ */}
        <div className="sr-only">
          <h1>Made for little souls.</h1>
          <p>Chúng tôi tạo ra những thiết kế nhẹ nhàng, tinh tế và tự nhiên — nơi quần áo đồng hành cùng những ngày tháng rất thật của một đứa trẻ.</p>
        </div>
      </section>

      {/* 2. INTERACTIVE VERTICAL TABS / ACCORDION LAYOUT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* LEFT COLUMN: Navigation Tabs (Vertical on Desktop, Horizontal Scroll on Mobile) */}
        <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-28 lg:z-10">
          <div className="hidden lg:block mb-4 text-center">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-blush-600 tracking-wide drop-shadow-sm">
              Khám Phá T&apos;Petie
            </h2>
          </div>

          {/* Desktop Vertical List / Mobile Scrollable Pill Row */}
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-2 sm:gap-2.5 pb-2 lg:pb-0">
            {ABOUT_TABS.map((tab) => {
              const Icon = tab.icon;
              const isCurrent = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 lg:w-full min-w-[200px] lg:min-w-0 text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 flex items-center justify-between group border relative ${
                    isCurrent
                      ? 'bg-gradient-to-r from-blush-50 to-sage-50 border-blush-500/40 shadow-md ring-2 ring-blush-500/20'
                      : 'bg-blush-100/40 hover:bg-gradient-to-r hover:from-blush-50 hover:to-sage-50 border-blush-100 text-charcoal-700 hover:border-blush-500/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                        isCurrent
                          ? 'bg-gradient-to-br from-blush-500 to-sage-500 text-white shadow-xs'
                          : 'bg-gradient-to-br from-blush-100 to-sage-100 text-blush-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div>
                      <h3 className={`text-xs sm:text-sm font-bold tracking-tight mb-0.5 ${isCurrent ? 'text-charcoal-900' : 'text-charcoal-700'}`}>
                        {tab.title}
                      </h3>
                      <p className="text-[11px] text-charcoal-400 line-clamp-1">
                        {tab.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isCurrent
                        ? 'text-blush-500 translate-x-0.5'
                        : 'text-charcoal-300 group-hover:text-blush-500 group-hover:translate-x-0.5'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Dynamic Animated Content Panel */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-card h-[500px] lg:h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto pr-2 sm:pr-4 pb-4 styled-scrollbar">
              <AnimatePresence mode="wait">
              
              {/* ==================== TAB 1: CÂU CHUYỆN THƯƠNG HIỆU ==================== */}
              {activeTab === 'story' && (
                <motion.div
                  key="story"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  {/* Title Header */}
                  <div className="border-b border-cream-200 pb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-honey-600 bg-honey-50 px-2.5 py-1 rounded-full border border-honey-200 inline-block mb-2">
                      Mục 01 • Khởi Nguồn
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-charcoal-900">
                      Câu chuyện thương hiệu T&apos;Petie
                    </h2>
                    <p className="font-serif italic text-honey-700 text-sm sm:text-base mt-1">
                      Made for little souls.
                    </p>
                  </div>

                  {/* Body Story Paragraphs */}
                  <div className="space-y-4 font-sans text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                    <p>
                      <strong>T&apos;Petie</strong> được hình thành từ năm 2021, bắt đầu bằng một tình yêu giản dị dành cho thời trang trẻ em và những điều nhỏ bé tạo nên một tuổi thơ đẹp.
                    </p>
                    <p className="text-charcoal-800 font-medium">
                      Chúng tôi tin rằng quần áo không chỉ là thứ trẻ mặc trên người.
                    </p>

                    {/* 4 Emotional Memory Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-2">
                      <div className="p-3 bg-cream-50/80 rounded-2xl border border-cream-200/80 flex items-center space-x-2.5">
                        <span className="text-lg">👗</span>
                        <span className="text-xs text-charcoal-800">Một chiếc váy trong ngày đặc biệt.</span>
                      </div>
                      <div className="p-3 bg-cream-50/80 rounded-2xl border border-cream-200/80 flex items-center space-x-2.5">
                        <span className="text-lg">🎒</span>
                        <span className="text-xs text-charcoal-800">Một chiếc áo mặc đến trường.</span>
                      </div>
                      <div className="p-3 bg-cream-50/80 rounded-2xl border border-cream-200/80 flex items-center space-x-2.5">
                        <span className="text-lg">🚗</span>
                        <span className="text-xs text-charcoal-800">Một bộ đồ trong chuyến đi cùng gia đình.</span>
                      </div>
                      <div className="p-3 bg-cream-50/80 rounded-2xl border border-cream-200/80 flex items-center space-x-2.5">
                        <span className="text-lg">🧸</span>
                        <span className="text-xs text-charcoal-800">Hay một bộ quần áo được mặc đi mặc lại vì đó là món đồ mà bé yêu thích.</span>
                      </div>
                    </div>

                    <p className="italic text-charcoal-600 font-serif">
                      Những điều rất nhỏ ấy, theo thời gian, có thể trở thành những ký ức rất lớn.
                    </p>

                    <p>
                      Vì vậy, T&apos;Petie tạo ra những thiết kế dành cho trẻ nhỏ với tinh thần nhẹ nhàng, tinh tế và tự nhiên — những món đồ đủ đẹp để người lớn yêu thích, nhưng đủ thoải mái để trẻ được tự do vui chơi, khám phá và lớn lên.
                    </p>

                    {/* Highlighted Quote Callout */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cream-100 via-honey-50 to-blush-50 border border-honey-200/80 shadow-2xs my-3">
                      <p className="font-serif text-sm sm:text-base text-charcoal-900 leading-relaxed font-semibold italic text-center">
                        &ldquo;Chúng tôi không tin tuổi thơ cần phải hoàn hảo.<br />
                        Chúng tôi tin tuổi thơ chỉ cần được nâng niu.&rdquo;
                      </p>
                    </div>

                    <p>
                      Từ cách lựa chọn chất liệu, phom dáng, màu sắc đến từng chi tiết nhỏ, T&apos;Petie luôn cố gắng tạo nên những sản phẩm không chỉ đẹp trong một khoảnh khắc, mà có thể đồng hành cùng những ngày tháng rất thật của một đứa trẻ.
                    </p>

                    <p className="font-serif italic text-honey-800 font-medium pt-1">
                      Bởi cuối cùng, điều chúng tôi muốn giữ lại không chỉ là một bộ quần áo đẹp. Mà là cảm giác của một tuổi thơ đẹp.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ==================== TAB 2: NIỀM TIN ==================== */}
              {activeTab === 'belief' && (
                <motion.div
                  key="belief"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="border-b border-cream-200 pb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blush-600 bg-blush-50 px-2.5 py-1 rounded-full border border-blush-200 inline-block mb-2">
                      Mục 02 • Triết Lý
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-charcoal-900">
                      Niềm Tin
                    </h2>
                  </div>

                  <div className="space-y-5 font-sans text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                    {/* Big Quote */}
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-blush-50 via-cream-100 to-honey-50 border border-blush-200 text-center space-y-2 shadow-soft">
                      <Heart className="w-8 h-8 text-blush-500 mx-auto" />
                      <blockquote className="font-serif text-base sm:text-lg text-charcoal-900 italic font-bold">
                        &ldquo;T&apos;Petie tin rằng tuổi thơ không cần phải hoàn hảo.<br />Tuổi thơ chỉ cần được nâng niu.&rdquo;
                      </blockquote>
                    </div>

                    <p>
                      Trẻ em không cần những bộ quần áo khiến chúng trở thành một <em>&ldquo;phiên bản hoàn hảo&rdquo;</em> trong mắt người lớn.
                    </p>
                    <p>
                      Các em cần được thoải mái chạy nhảy, nghịch ngợm, khám phá, đến trường, đi chơi và lớn lên theo cách của riêng mình.
                    </p>

                    {/* 3 "Vừa Đủ" Balance Pillars */}
                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-3">
                        Tinh Thần Thiết Kế Cân Bằng Của T&apos;Petie
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 text-center space-y-1.5">
                          <span className="w-8 h-8 rounded-full bg-honey-100 text-honey-700 font-serif font-bold text-xs flex items-center justify-center mx-auto">
                            01
                          </span>
                          <h5 className="font-bold text-xs text-charcoal-900">Đẹp vừa đủ</h5>
                          <p className="text-[11px] text-charcoal-500">Nhã nhặn, tôn trọn nét ngây thơ trong trẻo.</p>
                        </div>

                        <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 text-center space-y-1.5">
                          <span className="w-8 h-8 rounded-full bg-sage-100 text-sage-700 font-serif font-bold text-xs flex items-center justify-center mx-auto">
                            02
                          </span>
                          <h5 className="font-bold text-xs text-charcoal-900">Thoải mái vừa đủ</h5>
                          <p className="text-[11px] text-charcoal-500">Thấm hút tốt, êm ái cho từng cử động chạy nhảy.</p>
                        </div>

                        <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 text-center space-y-1.5">
                          <span className="w-8 h-8 rounded-full bg-blush-100 text-blush-700 font-serif font-bold text-xs flex items-center justify-center mx-auto">
                            03
                          </span>
                          <h5 className="font-bold text-xs text-charcoal-900">Cá tính vừa đủ</h5>
                          <p className="text-[11px] text-charcoal-500">Mang phong cách riêng, tự nhiên không gượng ép.</p>
                        </div>
                      </div>
                    </div>

                    <p className="pt-2 font-serif italic text-charcoal-800 text-center sm:text-left">
                      Vì vậy, T&apos;Petie theo đuổi những thiết kế đẹp vừa đủ, thoải mái vừa đủ và có cá tính vừa đủ — để quần áo trở thành một phần của tuổi thơ, thay vì che lấp nó.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ==================== TAB 3: TẦM NHÌN ==================== */}
              {activeTab === 'vision' && (
                <motion.div
                  key="vision"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="border-b border-cream-200 pb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sage-700 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-200 inline-block mb-2">
                      Mục 03 • Tương Lai
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-charcoal-900">
                      Tầm nhìn
                    </h2>
                  </div>

                  <div className="space-y-4 font-sans text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                    <p className="text-sm sm:text-base text-charcoal-900 font-medium">
                      Trở thành một thương hiệu thời trang trẻ em Việt Nam có dấu ấn riêng, được nhớ đến bởi vẻ đẹp tinh tế, chất lượng và cách trân trọng những năm tháng tuổi thơ.
                    </p>

                    <p>
                      Về dài hạn, T&apos;Petie có thể phát triển thành một thương hiệu lifestyle dành cho trẻ nhỏ, không chỉ giới hạn ở quần áo.
                    </p>

                    <div className="pt-2 space-y-3">
                      <p className="text-xs font-bold text-charcoal-800">
                        Tức là T&apos;Petie có thể sở hữu một thế giới riêng gồm:
                      </p>

                      {/* Interactive Visual Ecosystem Roadmap Flow */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                        {[
                          { step: '01', name: 'Clothing', desc: 'Trang phục hữu cơ', icon: '👗' },
                          { step: '02', name: 'Accessories', desc: 'Phụ kiện dịu ngọt', icon: '🎀' },
                          { step: '03', name: 'Objects', desc: 'Đồ dùng nâng niu', icon: '🧸' },
                          { step: '04', name: 'Visuals', desc: 'Hình ảnh trong trẻo', icon: '🎨' },
                          { step: '05', name: 'Stories', desc: 'Câu chuyện nuôi dưỡng', icon: '📖' },
                          { step: '06', name: 'Childhood experiences', desc: 'Trải nghiệm tuổi thơ', icon: '✨' },
                        ].map((item, idx) => (
                          <div
                            key={item.name}
                            className="p-3.5 bg-gradient-to-b from-cream-50 to-white rounded-2xl border border-cream-200 hover:border-honey-300 hover:shadow-xs transition-all text-center space-y-1 group"
                          >
                            <span className="text-xl block group-hover:scale-110 transition-transform">{item.icon}</span>
                            <span className="text-[10px] font-mono text-honey-600 font-bold block">{item.step}</span>
                            <h5 className="font-bold text-xs text-charcoal-900">{item.name}</h5>
                            <p className="text-[10px] text-charcoal-400">{item.desc}</p>
                          </div>
                        ))}
                      </div>

                      {/* Flow summary bar */}
                      <div className="p-3 bg-sage-50/70 rounded-2xl border border-sage-200 text-center text-xs text-sage-800 font-medium">
                        Clothing ➔ Accessories ➔ Objects ➔ Visuals ➔ Stories ➔ Childhood experiences
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ==================== TAB 4: SỨ MỆNH ==================== */}
              {activeTab === 'mission' && (
                <motion.div
                  key="mission"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="border-b border-cream-200 pb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-honey-600 bg-honey-50 px-2.5 py-1 rounded-full border border-honey-200 inline-block mb-2">
                      Mục 04 • Trọng Trách
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-charcoal-900">
                      Sứ mệnh
                    </h2>
                  </div>

                  <div className="py-8 text-center space-y-6 max-w-xl mx-auto">
                    <div className="w-16 h-16 rounded-full bg-honey-100 text-honey-600 flex items-center justify-center mx-auto shadow-sm">
                      <Sparkles className="w-8 h-8 animate-spin-slow" />
                    </div>

                    <blockquote className="font-serif text-xl sm:text-3xl text-charcoal-900 italic font-bold leading-relaxed px-4">
                      &ldquo;Tạo nên những điều đẹp đẽ để những tâm hồn nhỏ bé lớn lên cùng.&rdquo;
                    </blockquote>

                    <p className="text-xs sm:text-sm font-sans text-charcoal-600 leading-relaxed max-w-md mx-auto">
                      Mỗi đường chỉ êm ái, mỗi gam màu pastel thanh thoát đều là một lời nhắn nhủ yêu thương, gửi trao đến những mầm non đang khám phá thế giới rộng lớn.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ==================== TAB 5: GIÁ TRỊ CỐT LÕI ==================== */}
              {activeTab === 'values' && (
                <motion.div
                  key="values"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="border-b border-cream-200 pb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-600 bg-cream-100 px-2.5 py-1 rounded-full border border-cream-300 inline-block mb-2">
                      Mục 05 • Kim Chỉ Nam
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-charcoal-900">
                      Giá trị cốt lõi
                    </h2>
                    <p className="text-xs text-charcoal-500 font-sans mt-1">
                      4 nguyên tắc bất biến định hình mọi sản phẩm và quyết định tại T&apos;Petie
                    </p>
                  </div>

                  {/* 4 Core Value Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Card 01 */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-cream-50 to-white border border-cream-200 hover:border-honey-300 hover:shadow-card transition-all space-y-2 group">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-honey-600 bg-honey-50 px-2 py-0.5 rounded-full border border-honey-200">
                          01
                        </span>
                        <Smile className="w-4 h-4 text-honey-500 group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="font-serif text-sm sm:text-base font-bold text-charcoal-900">
                        CHILDHOOD FIRST <span className="font-sans font-normal text-xs text-charcoal-500 block sm:inline">(Tuổi thơ là trung tâm)</span>
                      </h3>
                      <p className="text-xs text-charcoal-600 leading-relaxed font-sans">
                        Mọi thiết kế cuối cùng đều phải quay về một câu hỏi: <em>&ldquo;Điều này có thực sự dành cho một đứa trẻ không?&rdquo;</em>. Không hy sinh sự thoải mái của trẻ chỉ để đổi lấy một hình ảnh đẹp.
                      </p>
                    </div>

                    {/* Card 02 */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-cream-50 to-white border border-cream-200 hover:border-sage-300 hover:shadow-card transition-all space-y-2 group">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-sage-700 bg-sage-50 px-2 py-0.5 rounded-full border border-sage-200">
                          02
                        </span>
                        <Feather className="w-4 h-4 text-sage-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="font-serif text-sm sm:text-base font-bold text-charcoal-900">
                        QUIETLY BEAUTIFUL <span className="font-sans font-normal text-xs text-charcoal-500 block sm:inline">(Đẹp một cách tinh tế)</span>
                      </h3>
                      <p className="text-xs text-charcoal-600 leading-relaxed font-sans">
                        T&apos;Petie không chạy theo sự nổi bật bằng mọi giá. Thay vào đó là màu sắc, chất liệu, phom dáng và những chi tiết nhỏ có thể khiến người ta nhìn lâu hơn một chút.
                      </p>
                    </div>

                    {/* Card 03 */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-cream-50 to-white border border-cream-200 hover:border-blush-300 hover:shadow-card transition-all space-y-2 group">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-blush-600 bg-blush-50 px-2 py-0.5 rounded-full border border-blush-200">
                          03
                        </span>
                        <Shirt className="w-4 h-4 text-blush-500 group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="font-serif text-sm sm:text-base font-bold text-charcoal-900">
                        MADE WITH CARE <span className="font-sans font-normal text-xs text-charcoal-500 block sm:inline">(Làm bằng sự chăm chút)</span>
                      </h3>
                      <p className="text-xs text-charcoal-600 leading-relaxed font-sans">
                        Từ thiết kế, chất liệu, đường may, đóng gói đến cách giao tiếp với khách hàng — những điều nhỏ đều quan trọng.
                      </p>
                    </div>

                    {/* Card 04 */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-cream-50 to-white border border-cream-200 hover:border-honey-300 hover:shadow-card transition-all space-y-2 group">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-honey-700 bg-honey-50 px-2 py-0.5 rounded-full border border-honey-200">
                          04
                        </span>
                        <Camera className="w-4 h-4 text-honey-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="font-serif text-sm sm:text-base font-bold text-charcoal-900">
                        LASTING MEMORIES <span className="font-sans font-normal text-xs text-charcoal-500 block sm:inline">(Tạo nên ký ức có thể ở lại)</span>
                      </h3>
                      <p className="text-xs text-charcoal-600 leading-relaxed font-sans">
                        T&apos;Petie không chỉ nghĩ về mùa này hay xu hướng này. Chúng tôi muốn những sản phẩm của mình có thể xuất hiện trong những bức ảnh mà nhiều năm sau bố mẹ vẫn muốn giữ lại.
                      </p>
                    </div>

                  </div>
                </motion.div>
              )}

            </AnimatePresence>
            </div>

            {/* Bottom Footer Action Inside Card */}
            <div className="pt-4 mt-2 border-t border-cream-200/80 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
              <div className="flex items-center space-x-2 text-charcoal-500 font-sans">
                <CheckCircle2 className="w-4 h-4 text-sage-600" />
                <span>Thương hiệu thiết kế &amp; may đo tại Việt Nam</span>
              </div>

              <Link
                href="/be-gai"
                className="inline-flex items-center space-x-1.5 font-bold text-honey-700 hover:text-honey-800 transition-colors"
              >
                <span>Khám phá các thiết kế của T&apos;Petie</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* 3. INVITATION FOOTER BANNER */}
      <section className="bg-gradient-to-r from-cream-100 via-honey-50 to-blush-50 rounded-3xl p-6 sm:p-10 border border-cream-200 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-serif text-charcoal-900">
          Cùng T&apos;Petie Nâng Niu Tuổi Thơ Của Con 🌸
        </h3>
        <p className="text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto font-sans leading-relaxed">
          Mời ba mẹ ghé thăm các bộ sưu tập mới nhất để chọn cho bé những món đồ nhẹ nhàng và thoải mái nhất.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/be-gai"
            className="px-6 py-3 rounded-full bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
          >
            Mua Sắm Đồ Bé Gái
          </Link>
          <Link
            href="/bo-suu-tap"
            className="px-6 py-3 rounded-full bg-white hover:bg-cream-100 text-charcoal-900 border border-cream-300 font-bold text-xs sm:text-sm active:scale-95 transition-all"
          >
            Xem Lookbook Bộ Sưu Tập
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto p-8 text-center text-charcoal-400">Đang tải thông tin T&apos;Petie...</div>}>
      <AboutContent />
    </Suspense>
  );
}
