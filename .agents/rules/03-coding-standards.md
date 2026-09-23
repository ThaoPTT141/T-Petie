# Rule 03: Frontend Coding Standards & Architecture

## 1. Tech Stack
- **Framework**: Next.js 14/15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: TailwindCSS với Theme cấu hình riêng theo Design Tokens của T'Petie
- **Icons**: Lucide-React
- **State Management**: React Context / Zustand (cho Giỏ hàng và Bộ lọc)

## 2. Cấu Trúc Thư Mục `src/`

```text
src/
├── app/                  # Next.js App Router (pages & layouts)
│   ├── layout.tsx        # Root layout bọc Providers (Cart, Analytics)
│   ├── page.tsx          # Trang chủ
│   ├── category/[slug]/  # Trang danh mục (Bé gái, Bé trai, Sơ sinh...)
│   ├── collections/[slug]/# Trang bộ sưu tập
│   ├── sale/             # Trang sale
│   ├── product/[id]/     # Trang chi tiết sản phẩm
│   ├── cart/             # Trang giỏ hàng
│   └── checkout/         # Trang thanh toán giả lập
├── components/
│   ├── common/           # Button, Modal, Badge, Drawer, LoadingSpinner
│   ├── layout/           # StickyHeader, BottomNav, Footer, SearchBar
│   ├── product/          # ProductCard, ProductGrid, SizeGuideModal, PriceDisplay
│   ├── collection/       # CollectionBanner, StorySection
│   ├── filter/           # FilterBar, SortDropdown
│   └── analytics/        # GoogleTagManager, ClarityScript
├── lib/
│   ├── analytics/        # tracker.ts (sendEvent, trackAddToCart, trackCheckout)
│   ├── sheet-api/        # client.ts (lấy data từ Google Sheet API hoặc local JSON)
│   ├── utils/            # formatters.ts (formatVND, slugify, cn helper)
│   └── constants/        # theme.ts, navigation.ts, sizeGuide.ts
├── types/                # product.ts, collection.ts, cart.ts, analytics.ts
└── data/                 # products.json, collections.json
```

## 3. Quy Ước Code (Code Conventions)
1. **TypeScript First**: Không sử dụng kiểu `any`. Mọi props, state, dữ liệu trả về từ API đều phải có interface/type trong `src/types/`.
2. **Clean Component Structure**:
   - Tách biệt UI tĩnh và logic tương tác (`'use client'` chỉ dùng khi cần hook như `useState`, `useEffect`, `useRouter`, `useCart`).
   - Giữ component ngắn gọn, dưới 200 dòng. Nếu vượt quá, phân rã thành sub-components.
3. **Responsive Image Optimization**:
   - Sử dụng thẻ `Image` từ `next/image` với `sizes`, `priority` hợp lý cho banner trang chủ.
4. **Xử Lý Dữ Liệu An Toàn**:
   - Dữ liệu sản phẩm luôn hỗ trợ Fallback từ `src/data/products.json` nếu Google Sheet API gặp sự cố hoặc offline.
5. **Tự Động Đồng Bộ GitHub (Auto Git Sync)**:
   - Sau mỗi tác vụ/lệnh hoàn thành code hoặc dữ liệu thành công, luôn tự động thực hiện commit và push lên GitHub (`git add .`, `git commit -m "..."`, `git push origin <branch>`).
