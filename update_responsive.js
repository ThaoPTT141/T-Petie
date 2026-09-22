const fs = require('fs');

let content = fs.readFileSync('uu-dai.html', 'utf8');

// 1. Update <style> block for overflow-x and responsive product-img
const oldStyleBlock = `<style>
    body {
      background-color: #FFFDF9;
      color: #2D3142;
      font-family: 'Be Vietnam Pro', sans-serif;
      -webkit-tap-highlight-color: transparent;
    }
    h1, h2, h3, h4, .font-heading {
      font-family: 'Quicksand', sans-serif;
    }
    /* Hide scrollbar */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    @keyframes bounce-short {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px) scale(1.15); }
    }
    .animate-bounce-cart {
      animation: bounce-short 0.4s ease-in-out;
    }
    @keyframes pulse-subtle {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.92; transform: scale(1.02); }
    }
    .animate-pulse-subtle {
      animation: pulse-subtle 2.5s infinite ease-in-out;
    }
    .product-img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      image-rendering: -webkit-optimize-contrast;
      border-radius: 14px 14px 0 0;
    }

    @media (min-width: 640px) {
      .product-img {
        height: 240px;
        border-radius: 20px 20px 0 0;
      }
    }

    @media (min-width: 1024px) {
      .product-img {
        height: 270px;
      }
    }

    .safe-area-bottom {
      padding-bottom: max(10px, env(safe-area-inset-bottom, 10px));
    }
  </style>`;

const newStyleBlock = `<style>
    html, body {
      overflow-x: hidden;
      max-width: 100vw;
    }
    body {
      background-color: #FFFDF9;
      color: #2D3142;
      font-family: 'Be Vietnam Pro', sans-serif;
      -webkit-tap-highlight-color: transparent;
    }
    h1, h2, h3, h4, .font-heading {
      font-family: 'Quicksand', sans-serif;
    }
    /* Hide scrollbar */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    @keyframes bounce-short {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px) scale(1.15); }
    }
    .animate-bounce-cart {
      animation: bounce-short 0.4s ease-in-out;
    }
    @keyframes pulse-subtle {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.92; transform: scale(1.02); }
    }
    .animate-pulse-subtle {
      animation: pulse-subtle 2.5s infinite ease-in-out;
    }
    .product-img {
      width: 100%;
      height: 185px;
      object-fit: cover;
      image-rendering: -webkit-optimize-contrast;
      border-radius: 14px 14px 0 0;
    }

    @media (min-width: 640px) {
      .product-img {
        height: 240px;
        border-radius: 18px 18px 0 0;
      }
    }

    @media (min-width: 1024px) {
      .product-img {
        height: 270px;
        border-radius: 20px 20px 0 0;
      }
    }

    .safe-area-bottom {
      padding-bottom: max(10px, env(safe-area-inset-bottom, 10px));
    }
  </style>`;

if (content.includes(oldStyleBlock)) {
  content = content.replace(oldStyleBlock, newStyleBlock);
  console.log('✅ Updated Style Block');
} else {
  console.log('⚠️ Old style block not exact, replacing style block by regex');
  content = content.replace(/<style>[\s\S]*?<\/style>/, newStyleBlock);
}

// 2. Update Hero Banner to be Grand, Airy, with full Desktop Showcase Image
const bannerMarkerStart = '<!-- ==================== HERO SALE BANNER & COUNTDOWN ==================== -->';
const bannerMarkerEnd = '<!-- ==================== VOUCHER KHUYẾN MÃI NHANH ==================== -->';

const newBanner = `${bannerMarkerStart}
    <section
      class="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-honey-500 via-blush-500 to-rose-500 p-4 sm:p-7 md:p-8 lg:p-10 text-white shadow-soft">
      <!-- Decorative Glows -->
      <div class="absolute -right-10 -bottom-10 w-64 sm:w-80 h-64 sm:h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -left-10 -top-10 w-48 sm:w-64 h-48 sm:h-64 bg-yellow-300/20 rounded-full blur-2xl pointer-events-none"></div>

      <div class="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-6 lg:gap-8">
        <!-- Cột Trái: Tiêu đề, thông điệp & Countdown (Mobile-first + Desktop expanded) -->
        <div class="md:col-span-7 lg:col-span-7 space-y-3 sm:space-y-4 text-center md:text-left">
          <div
            class="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10.5px] sm:text-xs font-bold shadow-xs">
            <span>🔥</span>
            <span class="tracking-wide uppercase">SĂN DEAL CHO BÉ — GIÁ MỀM CHO MẸ</span>
          </div>

          <h1 class="text-xl sm:text-3xl lg:text-4xl font-extrabold font-heading tracking-tight leading-tight">
            Ưu Đãi Độc Quyền T'Petie <br class="hidden sm:inline" />
            <span class="text-yellow-200">Giảm Sâu Đến 35%</span>
          </h1>

          <p class="text-xs sm:text-sm text-white/95 leading-relaxed max-w-xl mx-auto md:mx-0">
            Tuyển chọn 30 mẫu váy áo thêu tay, set bộ cotton organic cao cấp từ 4 Bộ Sưu Tập chính thức của T'Petie. Chuẩn form dáng bé Việt từ 8kg đến 22kg (Size 1 - 6)!
          </p>

          <!-- Realtime Flash Sale Countdown -->
          <div class="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3">
            <div
              class="flex items-center space-x-2 bg-black/30 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-xs sm:text-sm shadow-sm">
              <span class="animate-pulse text-sm sm:text-base">⏰</span>
              <span class="font-medium text-white/90">Kết thúc sau:</span>
              <div class="flex items-center space-x-1 font-mono font-bold text-xs sm:text-base">
                <span id="countdown-hours" class="bg-white/25 px-2 py-0.5 rounded-md min-w-[28px] text-center">02</span>
                <span class="font-bold">:</span>
                <span id="countdown-minutes" class="bg-white/25 px-2 py-0.5 rounded-md min-w-[28px] text-center">18</span>
                <span class="font-bold">:</span>
                <span id="countdown-seconds" class="bg-white/25 px-2 py-0.5 rounded-md min-w-[28px] text-center">45</span>
              </div>
            </div>
            <div class="text-xs text-white/90 bg-white/15 backdrop-blur-sm px-3 py-2 rounded-xl hidden sm:inline-flex items-center space-x-1.5 border border-white/10">
              <span>🚚</span>
              <span>Freeship toàn quốc từ 399k</span>
            </div>
          </div>

          <!-- Trust Badges on Desktop -->
          <div class="hidden lg:flex items-center space-x-4 pt-1 text-[11.5px] text-white/90 font-medium">
            <span class="flex items-center space-x-1"><span>✨</span><span>Chính hãng 100%</span></span>
            <span>•</span>
            <span class="flex items-center space-x-1"><span>🌿</span><span>Chất liệu an toàn cho da</span></span>
            <span>•</span>
            <span class="flex items-center space-x-1"><span>🔄</span><span>Đổi size miễn phí 7 ngày</span></span>
          </div>
        </div>

        <!-- Cột Phải: Showcase Hình ảnh BST Nổi bật trên Desktop/Tablet -->
        <div class="hidden md:flex md:col-span-5 lg:col-span-5 justify-center md:justify-end">
          <div class="relative w-full max-w-[280px] lg:max-w-[320px]">
            <!-- Glow effect behind hero card -->
            <div class="absolute -inset-1.5 bg-yellow-300/30 rounded-3xl blur-xl"></div>

            <!-- Featured Collection Card -->
            <div class="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/40 bg-white/10 backdrop-blur-sm group cursor-pointer" onclick="filterCampaign('le2-9')">
              <img
                src="images/sale/set-ao-dai-dan-nguyet.jpg"
                alt="BST Trung Thu Kem & Cốm - T'Petie"
                class="w-full h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <!-- Floating Top Tag -->
              <div class="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md text-charcoal-800 text-[11px] font-bold flex items-center space-x-1 border border-cream-200">
                <span>🌸</span>
                <span>BST Trung Thu Kem &amp; Cốm</span>
              </div>
              <!-- Floating Bottom Badge -->
              <div class="absolute bottom-2.5 left-2.5 right-2.5 bg-charcoal-900/80 backdrop-blur-md p-2.5 rounded-xl text-white flex items-center justify-between border border-white/20 text-xs">
                <div>
                  <div class="font-bold text-[11.5px] text-yellow-300">Set Áo Dài Đan Nguyệt</div>
                  <div class="text-[10px] text-white/80">Sale 30% • Chỉ từ 343.000đ</div>
                </div>
                <span class="px-2.5 py-1 rounded-lg bg-honey-500 text-white font-bold text-[10px] shrink-0 group-hover:bg-honey-600 transition-colors shadow-sm">
                  Xem ngay
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    `;

const bStart = content.indexOf(bannerMarkerStart);
const bEnd = content.indexOf(bannerMarkerEnd);
content = content.substring(0, bStart) + newBanner + content.substring(bEnd);
console.log('✅ Updated Responsive Banner');

// 3. Update Vouchers for Responsive Grid & Hover
const voucherMarkerStart = '<!-- ==================== VOUCHER KHUYẾN MÃI NHANH ==================== -->';
const voucherMarkerEnd = '<!-- ==================== 5 CAMPAIGN FILTER TABS ==================== -->';

const newVouchers = `${voucherMarkerStart}
    <section class="space-y-1.5">
      <div class="flex items-center justify-between sm:hidden px-1">
        <span class="text-[11px] font-bold text-charcoal-700 flex items-center space-x-1">
          <span>🎁</span>
          <span>Mã Ưu Đãi Dành Riêng Cho Mẹ</span>
        </span>
        <span class="text-[10px] text-rose-500 font-semibold">Vuốt xem thêm →</span>
      </div>

      <div class="snap-x snap-mandatory flex overflow-x-auto no-scrollbar gap-2.5 pb-1 -mx-3 px-3 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:gap-4">
        <!-- Voucher 1 -->
        <div
          class="min-w-[260px] sm:min-w-0 snap-center p-3 sm:p-4 rounded-2xl bg-white border border-cream-200 flex items-center justify-between shadow-card hover:border-honey-300 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300 shrink-0">
          <div class="space-y-0.5">
            <div class="text-honey-600 font-bold text-xs sm:text-sm flex items-center space-x-1">
              <span>🏷️</span>
              <span>Giảm 20.000 VNĐ</span>
            </div>
            <p class="text-[10.5px] text-charcoal-400">Đơn từ 250k • Code: <strong class="text-charcoal-700">TPETIE20</strong></p>
          </div>
          <button onclick="copyVoucher('TPETIE20')"
            class="px-3.5 py-1.5 rounded-full bg-honey-100 text-honey-700 text-xs font-bold hover:bg-honey-500 hover:text-white transition-all active:scale-95 shrink-0 min-h-[38px]">
            Lưu Mã
          </button>
        </div>

        <!-- Voucher 2 -->
        <div
          class="min-w-[260px] sm:min-w-0 snap-center p-3 sm:p-4 rounded-2xl bg-white border border-cream-200 flex items-center justify-between shadow-card hover:border-sage-300 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300 shrink-0">
          <div class="space-y-0.5">
            <div class="text-sage-700 font-bold text-xs sm:text-sm flex items-center space-x-1">
              <span>🚚</span>
              <span>Freeship Toàn Quốc 0đ</span>
            </div>
            <p class="text-[10.5px] text-charcoal-400">Đơn từ 399k • Tự áp dụng</p>
          </div>
          <span class="text-[11px] font-bold text-sage-700 bg-sage-50 px-3 py-1.5 rounded-full border border-sage-200 shrink-0">
            Tự Áp Dụng
          </span>
        </div>

        <!-- Voucher 3 -->
        <div
          class="min-w-[260px] sm:min-w-0 snap-center p-3 sm:p-4 rounded-2xl bg-white border border-cream-200 flex items-center justify-between shadow-card hover:border-blush-300 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300 shrink-0">
          <div class="space-y-0.5">
            <div class="text-blush-600 font-bold text-xs sm:text-sm flex items-center space-x-1">
              <span>🎁</span>
              <span>Giảm 10% Tối Đa 50k</span>
            </div>
            <p class="text-[10.5px] text-charcoal-400">Mẹ mua lần đầu • Code: <strong class="text-charcoal-700">MEMBERVIP</strong></p>
          </div>
          <button onclick="copyVoucher('MEMBERVIP')"
            class="px-3.5 py-1.5 rounded-full bg-blush-100 text-blush-600 text-xs font-bold hover:bg-blush-500 hover:text-white transition-all active:scale-95 shrink-0 min-h-[38px]">
            Lưu Mã
          </button>
        </div>
      </div>
    </section>

    `;

const vStart = content.indexOf(voucherMarkerStart);
const vEnd = content.indexOf(voucherMarkerEnd);
content = content.substring(0, vStart) + newVouchers + content.substring(vEnd);
console.log('✅ Updated Responsive Vouchers');

// 4. Update Tabs for Responsive Horizontal Swipe / Desktop spacing
const tabsMarkerStart = '<!-- ==================== 5 CAMPAIGN FILTER TABS ==================== -->';
const tabsMarkerEnd = '<!-- ==================== RESPONSIVE PROMOTION PRODUCT GRID ==================== -->';

const newTabs = `${tabsMarkerStart}
    <section class="sticky top-[56px] sm:top-[64px] z-30 bg-white/95 backdrop-blur-md py-2.5 px-3 sm:px-0 -mx-3 sm:mx-0 border-b border-cream-200/90 shadow-xs space-y-2">
      <div class="flex items-center justify-between px-1 sm:px-0">
        <div class="flex items-center space-x-2">
          <span class="text-xs sm:text-base font-bold font-heading text-charcoal-900">Chiến Dịch Ưu Đãi</span>
          <span id="campaign-count-badge" class="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-blush-100 text-blush-600">30 sản phẩm</span>
        </div>
        <span class="text-[11px] text-charcoal-400 hidden sm:inline">Chọn chiến dịch để lọc danh sách sản phẩm</span>
      </div>

      <!-- Horizontal Scroll Pill Tabs (Swipable on mobile, smoothly spaced on desktop) -->
      <div id="campaign-tabs-bar" class="flex items-center space-x-2 sm:space-x-2.5 overflow-x-auto md:overflow-x-visible no-scrollbar py-0.5 px-1 sm:px-0">
        <!-- 1. Tất Cả -->
        <button onclick="filterCampaign('all')" id="tab-all" data-campaign="all"
          class="campaign-tab shrink-0 py-2 px-3.5 sm:px-4 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 bg-blush-100 text-blush-600 border border-blush-300 shadow-sm active:scale-95">
          <span>✨</span>
          <span>Tất Cả (30)</span>
        </button>

        <!-- 2. Mừng Đại Lễ 2/9 -->
        <button onclick="filterCampaign('le2-9')" id="tab-le2-9" data-campaign="le2-9"
          class="campaign-tab shrink-0 py-2 px-3.5 sm:px-4 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 bg-cream-50 hover:bg-cream-100 text-charcoal-600 border border-cream-200 active:scale-95">
          <span>🎉</span>
          <span>Mừng Đại Lễ 2/9 (8)</span>
        </button>

        <!-- 3. Sale Hè -->
        <button onclick="filterCampaign('sale-he')" id="tab-sale-he" data-campaign="sale-he"
          class="campaign-tab shrink-0 py-2 px-3.5 sm:px-4 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 bg-cream-50 hover:bg-cream-100 text-charcoal-600 border border-cream-200 active:scale-95">
          <span>☀️</span>
          <span>Sale Hè (9)</span>
        </button>

        <!-- 4. Sale Thu - Đông -->
        <button onclick="filterCampaign('sale-thu-dong')" id="tab-sale-thu-dong" data-campaign="sale-thu-dong"
          class="campaign-tab shrink-0 py-2 px-3.5 sm:px-4 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 bg-cream-50 hover:bg-cream-100 text-charcoal-600 border border-cream-200 active:scale-95">
          <span>🍂</span>
          <span>Sale Thu - Đông (9)</span>
        </button>

        <!-- 5. Sale Ngày Đôi 10/10 11/11 -->
        <button onclick="filterCampaign('sale-ngay-doi')" id="tab-sale-ngay-doi" data-campaign="sale-ngay-doi"
          class="campaign-tab shrink-0 py-2 px-3.5 sm:px-4 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 bg-cream-50 hover:bg-cream-100 text-charcoal-600 border border-cream-200 active:scale-95">
          <span>🎁</span>
          <span>Sale Ngày Đôi (4)</span>
        </button>
      </div>

      <!-- Campaign Banner Info Description -->
      <div id="campaign-banner-desc"
        class="p-2.5 sm:p-3 rounded-xl bg-cream-50 border border-cream-200 text-[11px] sm:text-xs text-charcoal-700 flex items-center justify-between gap-2">
        <div class="flex items-center space-x-1.5">
          <span class="text-sm" id="campaign-desc-icon">✨</span>
          <span id="campaign-desc-text" class="line-clamp-1 sm:line-clamp-none">Toàn bộ 30 sản phẩm thuộc 4 BST chính thức của T'Petie được áp dụng mức giá ưu đãi ngọt ngào nhất!</span>
        </div>
        <span id="campaign-desc-tag"
          class="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-honey-100 text-honey-700 shrink-0">
          Chính sách đổi size 7 ngày
        </span>
      </div>
    </section>

    `;

const tStart = content.indexOf(tabsMarkerStart);
const tEnd = content.indexOf(tabsMarkerEnd);
content = content.substring(0, tStart) + newTabs + content.substring(tEnd);
console.log('✅ Updated Responsive Filter Tabs');

// 5. Update Grid wrapper classes
content = content.replace(
  'id="promo-products-grid" class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4 md:gap-5 px-0.5 sm:px-0"',
  'id="promo-products-grid" class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4 md:gap-5 lg:gap-6 px-0.5 sm:px-0"'
);

// 6. Update renderProducts and JS functions
const jsMarkerStart = '    // ==================== RENDER PROMOTION PRODUCTS ====================';
const jsMarkerEnd = '    // ==================== 5. BOTTOM SHEET DRAWER (Xem Size) ====================';

const newRenderJs = `    // ==================== RENDER PROMOTION PRODUCTS ====================
    function renderProducts(customList) {
      const grid = document.getElementById('promo-products-grid');
      const emptyState = document.getElementById('promo-empty-state');
      const countBadge = document.getElementById('campaign-count-badge');

      const filtered = customList || PROMO_PRODUCTS.filter(p => {
        if (currentCampaign === 'all') return true;
        return p.campaign === currentCampaign;
      });

      if (countBadge) {
        countBadge.innerText = \`\${filtered.length} sản phẩm\`;
      }

      if (filtered.length === 0) {
        grid.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
      }

      emptyState.classList.add('hidden');

      grid.innerHTML = filtered.map(p => {
        return \`
          <div class="group bg-white rounded-2xl sm:rounded-3xl border border-cream-200 overflow-hidden shadow-card hover:shadow-soft hover:border-blush-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative">
            <div>
              <!-- Product Image Box -->
              <div class="relative w-full overflow-hidden cursor-pointer bg-cream-100" onclick="openQuickSizeModal('\${p.id}')">
                <img
                  src="\${p.image}"
                  alt="\${p.name}"
                  loading="lazy"
                  class="product-img group-hover:scale-105 transition-transform duration-500 ease-out"
                  onerror="this.src='images/sale/set-ao-dai-dan-nguyet.jpg'"
                />
                <!-- Sale Percentage Badge -->
                <span class="absolute top-2 left-2 text-[10px] sm:text-[11px] font-extrabold bg-gradient-to-r from-rose-500 to-rose-600 text-white px-1.5 sm:px-2 py-0.5 rounded-full shadow-md">
                  -\${p.discountPercent}%
                </span>
                <!-- Collection Tag -->
                <span class="absolute top-2 right-2 text-[8.5px] sm:text-[9.5px] font-bold bg-white/90 backdrop-blur-md text-honey-700 px-1.5 sm:px-2 py-0.5 rounded-full border border-cream-200 max-w-[58%] truncate shadow-xs">
                  \${p.collectionName}
                </span>
                <!-- Material Tag -->
                <span class="absolute bottom-1.5 left-1.5 right-1.5 text-[8.5px] sm:text-[9.5px] bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-lg truncate border border-cream-200 text-charcoal-700 font-medium shadow-xs">
                  🌿 \${p.materialFeature}
                </span>
              </div>

              <!-- Product Info -->
              <div class="p-2.5 sm:p-3.5 space-y-1 sm:space-y-1.5">
                <div class="text-[9.5px] sm:text-[11px] font-bold text-honey-600 uppercase tracking-wider line-clamp-1">
                  \${p.collectionName}
                </div>
                <h3
                  onclick="openQuickSizeModal('\${p.id}')"
                  class="text-xs sm:text-sm font-bold text-charcoal-900 line-clamp-2 cursor-pointer group-hover:text-honey-600 transition-colors leading-snug min-h-[32px] sm:min-h-[38px]"
                >
                  \${p.name}
                </h3>
                
                <!-- 2-line Price Display -->
                <div class="space-y-0.5 pt-0.5">
                  <div class="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                    <!-- Sale Price -->
                    <span class="text-sm sm:text-base font-extrabold text-rose-600 font-heading">
                      \${formatVND(p.basePrice)}
                    </span>
                    <!-- Original Strikethrough Price -->
                    <span class="text-[11px] sm:text-xs text-charcoal-400 line-through">
                      \${formatVND(p.originalPrice)}
                    </span>
                  </div>
                  <!-- Subtitle Size Range & Deal hint -->
                  <div class="flex items-center justify-between text-[9.5px] sm:text-[10.5px] text-charcoal-500 pt-0.5">
                    <span class="font-medium text-sage-700">📏 Size 1 - 6 (8-22kg)</span>
                    <span class="text-rose-600 font-bold">🔥 Đã bán \${p.soldCount}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2 CTA Buttons (touch target >= 40px, hover color shift) -->
            <div class="p-2.5 sm:p-3.5 pt-0 grid grid-cols-2 gap-1.5 sm:gap-2">
              <button
                type="button"
                onclick="openQuickSizeModal('\${p.id}')"
                class="w-full min-h-[40px] py-2 px-1 rounded-xl bg-cream-50 hover:bg-honey-50 hover:text-honey-700 hover:border-honey-300 text-charcoal-800 text-[11px] sm:text-xs font-bold flex items-center justify-center space-x-1 border border-cream-300 transition-all duration-200 active:scale-95"
                title="Xem size và thông số cân nặng"
              >
                <span>📏</span>
                <span class="truncate">Xem size</span>
              </button>
              <button
                type="button"
                onclick="quickAddToCart('\${p.id}')"
                class="w-full min-h-[40px] py-2 px-1 rounded-xl bg-honey-500 hover:bg-honey-600 text-white text-[11px] sm:text-xs font-bold flex items-center justify-center space-x-1 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                title="Thêm ngay vào giỏ hàng"
              >
                <span>🛍️</span>
                <span class="truncate">Thêm giỏ</span>
              </button>
            </div>
          </div>
        \`;
      }).join('');
    }

`;

const jStart = content.indexOf(jsMarkerStart);
const jEnd = content.indexOf(jsMarkerEnd);
content = content.substring(0, jStart) + newRenderJs + content.substring(jEnd);
console.log('✅ Updated renderProducts JS');

// 7. Update Search function to use unified renderProducts and remove outdated renderProductsList
const searchMarkerStart = '    function searchKeyword(keyword) {';
const searchMarkerEnd = '    // ==================== CART & ORDER MANAGEMENT ====================';

const newSearchJs = `    function searchKeyword(keyword) {
      closeSearchModal();
      if (!keyword.trim()) return;

      filterCampaign('all');
      const grid = document.getElementById('promo-products-grid');
      const filtered = PROMO_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(keyword.toLowerCase()) ||
        p.collectionName.toLowerCase().includes(keyword.toLowerCase()) ||
        p.material.toLowerCase().includes(keyword.toLowerCase())
      );

      trackAnalyticsEvent('search_promotions', { keyword });

      if (filtered.length === 0) {
        grid.innerHTML = \`
          <div class="col-span-2 sm:col-span-3 lg:col-span-4 text-center py-12 text-charcoal-400 space-y-2 bg-white rounded-2xl border border-cream-200 p-8 shadow-card">
            <div class="text-3xl">🔍</div>
            <p class="text-sm font-bold text-charcoal-800">Không tìm thấy sản phẩm với từ khóa "\${keyword}"</p>
            <p class="text-xs">Mẹ hãy thử tìm kiếm với từ khóa khác nhé!</p>
            <button onclick="renderProducts()" class="mt-2 px-4 py-1.5 rounded-full bg-honey-500 text-white text-xs font-bold hover:bg-honey-600">
              Quay lại danh sách ưu đãi
            </button>
          </div>
        \`;
        document.getElementById('campaign-count-badge').innerText = \`0 kết quả\`;
      } else {
        document.getElementById('campaign-count-badge').innerText = \`\${filtered.length} kết quả\`;
        renderProducts(filtered);
      }
    }

`;

const sStart = content.indexOf(searchMarkerStart);
const sEnd = content.indexOf(searchMarkerEnd);
content = content.substring(0, sStart) + newSearchJs + content.substring(sEnd);
console.log('✅ Updated searchKeyword JS');

// 8. Update closeQuickSizeModal for responsive mobile-desktop animation
const oldCloseModal = `    function closeQuickSizeModal() {
      const modal = document.getElementById('quicksize-modal');
      const container = document.getElementById('quicksize-container');
      container.classList.add('translate-y-full');
      setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }, 250);
    }`;

const newCloseModal = `    function closeQuickSizeModal() {
      const modal = document.getElementById('quicksize-modal');
      const container = document.getElementById('quicksize-container');
      if (window.innerWidth < 640) {
        container.classList.add('translate-y-full');
        setTimeout(() => {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }, 250);
      } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }`;

content = content.replace(oldCloseModal, newCloseModal);
console.log('✅ Updated closeQuickSizeModal JS');

fs.writeFileSync('uu-dai.html', content, 'utf8');
console.log('🎉 Successfully saved responsive design updates to uu-dai.html');
