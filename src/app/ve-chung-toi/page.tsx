import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart, ShieldCheck, Leaf, Scissors, Smile, ArrowRight } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata = {
  title: "Về Chúng Tôi | Câu Chuyện Thương Hiệu T'Petie",
  description: "Tìm hiểu câu chuyện thương hiệu thời trang trẻ em cao cấp T'Petie — Ngọt ngào, trong trẻo và nâng niu từng bước chạm của bé yêu.",
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-12 sm:space-y-16">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Về Chúng Tôi', href: '/ve-chung-toi' }]} />

      {/* 1. HERO STORY BANNER */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-cream-100 via-blush-50 to-sage-50 border border-cream-200 p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-soft">
        <div className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-honey-500 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Câu Chuyện Thương Hiệu</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-charcoal-900 leading-tight mb-4">
          Nâng Niu Từng Bước Chạm Của Bé Yêu 🌸
        </h1>

        <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed max-w-2xl mx-auto">
          <strong>T&apos;Petie</strong> ra đời từ tình yêu vô điều kiện của những người mẹ muốn dành tặng cho con những bộ trang phục mềm mại nhất, an toàn nhất và ngọt ngào nhất trong những năm tháng đầu đời.
        </p>
      </section>

      {/* 2. SỨ MỆNH & TRIẾT LÝ THIẾT KẾ */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col items-center text-center group">
          <div className="w-14 h-14 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <Leaf className="w-7 h-7" />
          </div>
          <h3 className="font-heading font-bold text-lg text-charcoal-900 mb-2">
            100% Chất Liệu Hữu Cơ
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            Tuyển chọn vải thô đũi organic, cotton dệt tự nhiên và voan tơ mềm mịn. Thoáng mát, thấm hút mồ hôi tối đa và không gây kích ứng cho làn da nhạy cảm của bé.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col items-center text-center group">
          <div className="w-14 h-14 rounded-2xl bg-blush-100 text-blush-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <Scissors className="w-7 h-7" />
          </div>
          <h3 className="font-heading font-bold text-lg text-charcoal-900 mb-2">
            May Đo Thủ Công Tỉ Mỉ
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            Mỗi thiết kế đều được may đo thủ công bởi những người thợ lành nghề tại Việt Nam. Từng đường bèo nhún, cúc bọc vải và họa tiết thêu tay đều chứa đựng tình yêu thương.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col items-center text-center group">
          <div className="w-14 h-14 rounded-2xl bg-honey-100 text-honey-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="font-heading font-bold text-lg text-charcoal-900 mb-2">
            Tone Màu Pastel Ngọt Ngào
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            Bảng màu chủ đạo Vàng Mật Ong ấm áp, Xanh Cốm non tươi mát, Kem Vani dịu nhẹ và Hồng Cánh Sen trong trẻo mang lại cảm giác bình yên, hồn nhiên cho tuổi thơ của con.
          </p>
        </div>
      </section>

      {/* 3. LỜI CAM KẾT TỪ T'PETIE */}
      <section className="bg-gradient-to-r from-cream-100 via-honey-50 to-cream-100 rounded-3xl p-8 sm:p-12 border border-cream-200 shadow-soft">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-honey-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-charcoal-900">
              Lời Cam Kết Của T&apos;Petie Dành Cho Mẹ &amp; Bé
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
            <p>
              Tại T&apos;Petie, chúng mình tin rằng quần áo trẻ em không chỉ đẹp mà quan trọng nhất phải mang lại sự thoải mái tuyệt đối cho từng chuyển động bò, lẫy, chạy nhảy của con yêu.
            </p>
            <ul className="space-y-2.5 pl-2">
              <li className="flex items-start space-x-2">
                <span className="text-sage-600 font-bold">✓</span>
                <span><strong>Đổi trả miễn phí trong 7 ngày</strong> nếu bé mặc không vừa hoặc mẹ không ưng ý chất vải.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-sage-600 font-bold">✓</span>
                <span><strong>Kiểm tra hàng trước khi thanh toán</strong> (Đồng kiểm tận tay mẹ bỉm).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-sage-600 font-bold">✓</span>
                <span><strong>Đóng gói quà tặng cao cấp</strong> — Hộp quà pastel chỉn chu nâng niu mọi khoảnh khắc.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href="/be-gai"
              className="px-6 py-3 rounded-full bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center space-x-2"
            >
              <span>Khám Phá Thời Trang Bé Gái</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/bo-suu-tap"
              className="px-6 py-3 rounded-full bg-white hover:bg-cream-100 text-charcoal-900 border border-cream-300 font-bold text-xs sm:text-sm active:scale-95 transition-all"
            >
              <span>Xem Bộ Sưu Tập Mới</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
