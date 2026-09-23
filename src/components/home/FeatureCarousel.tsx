'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const features = [
  {
    id: 1,
    src: '/images/vay-thi-tho-hong.jpg',
    icon: '🌿',
    title: '100% Cotton & Đũi Tự Nhiên',
    description: 'Vải được dệt từ sợi tự nhiên hữu cơ, không sử dụng hóa chất nhuộm độc hại, an toàn với làn da non nớt.'
  },
  {
    id: 2,
    src: '/images/set-ao-thanh-yen-phoi-chan-vay-caro-xanh.jpg',
    icon: '🪡',
    title: 'Đường May Lộn Ẩn Tinh Tế',
    description: 'Mọi đường chỉ và cúc bấm đều được xử lý giấu mép kỹ càng, đảm bảo không cọ xát hay làm đau bé khi vận động.'
  },
  {
    id: 3,
    src: '/images/set-ao-mut-cam-phoi-quan-sooc-be.jpg',
    icon: '🧸',
    title: 'Phom Dáng Dễ Mặc Bỉm',
    description: 'Thiết kế đũng quần và váy rộng rãi, có cúc bấm đũng tiện lợi cho mẹ thay bỉm cho bé chỉ trong 30 giây.'
  }
];

export function FeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % features.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <div className="bg-cream-100/70 border border-cream-200 rounded-3xl p-6 sm:p-10 text-center overflow-hidden">
      <span className="text-xs font-bold text-honey-600 uppercase tracking-wider block mb-2">
        Chất Lượng Là Danh Dự
      </span>
      <h2 className="text-xl sm:text-3xl font-bold font-heading text-charcoal-900 mb-8">
        Những điều làm nên sự khác biệt của T'Petie
      </h2>

      <div className="relative w-full aspect-[4/5] sm:aspect-[21/9] md:aspect-[2.5/1] rounded-2xl overflow-hidden shadow-card group">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out flex ${
              index === currentIndex ? 'translate-x-0' : index < currentIndex ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <Image
              src={feature.src}
              alt={feature.title}
              fill
              quality={90}
              sizes="(max-width: 640px) 100vw, 1200px"
              className="object-cover object-center"
            />
            {/* Overlay Gradient for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent sm:bg-gradient-to-r sm:from-charcoal-900/50 sm:to-transparent" />
            
            {/* Blurred Corner Text Box */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto sm:w-1/2 md:w-1/3 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-5 text-left shadow-lg transform transition-all duration-700 delay-300">
              <span className="text-3xl mb-2 block">{feature.icon}</span>
              <h3 className="font-heading font-bold text-lg text-white mb-2 drop-shadow-sm">{feature.title}</h3>
              <p className="text-sm text-white/90 leading-relaxed drop-shadow-sm">
                {feature.description}
              </p>
            </div>
          </div>
        ))}

        {/* Arrow Navigation */}
        <button
          onClick={(e) => { e.preventDefault(); prevSlide(); }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/40 hover:bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-charcoal-900 shadow-md opacity-0 group-hover:opacity-100 transition-all z-10"
          aria-label="Lùi lại"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); nextSlide(); }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/40 hover:bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-charcoal-900 shadow-md opacity-0 group-hover:opacity-100 transition-all z-10"
          aria-label="Tiến tới"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        
        {/* Dots Navigation */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex space-x-2 z-10">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.preventDefault(); goToSlide(index); }}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all shadow-sm ${
                index === currentIndex ? 'bg-honey-500 w-4 sm:w-6' : 'bg-white/60 hover:bg-white'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
