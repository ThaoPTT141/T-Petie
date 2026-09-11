# Design Tokens & UI Kit Guidelines (Phong Cách Ngọt Ngào, Trong Trẻo)

Tài liệu này định nghĩa hệ thống Design Tokens (màu sắc, font chữ, kích thước, bo góc, bóng đổ) được sử dụng nhất quán trong toàn bộ mã nguồn TailwindCSS và giao diện T'Petie.

---

## 1. Bảng Màu Thương Hiệu (Color Palette Tokens)

### Màu Nền & Bề Mặt (Cream / Vanilla Palette)
- `cream-50`: `#FFFDF9` — Nền trang chính (tạo cảm giác mềm mịn như sữa bột em bé)
- `cream-100`: `#FFF8EE` — Nền thẻ card sản phẩm, banner phụ
- `cream-200`: `#F5EBE1` — Đường viền chia section
- `cream-300`: `#EADCCF` — Viền input khi không focus

### Màu Xanh Cốm Non (Sage / Mint Green Palette)
- `sage-50`: `#F4FAF5` — Nền badge chất liệu Organic
- `sage-100`: `#EAF4EC` — Nền tag danh mục, icon dịu mát
- `sage-500`: `#77B77A` — Màu điểm nhấn xanh lá thiên nhiên
- `sage-700`: `#4B834E` — Màu chữ trên nền sáng

### Màu Vàng Mật Ong (Honey / Amber Palette)
- `honey-50`: `#FFFBF0` — Nền highlight thông báo khuyến mãi
- `honey-100`: `#FFF2D6` — Nền tag Best Seller / Hot
- `honey-500`: `#F5A623` — Màu nút bấm chính (CTA Mua Hàng, Nút Thêm Giỏ)
- `honey-600`: `#D97706` — Màu giá tiền nổi bật
- `honey-700`: `#B45309` — Màu viền button khi active

### Màu Hồng Phấn Cánh Sen (Blush Pink Palette)
- `blush-50`: `#FFF5F5` — Nền danh mục Bé Gái
- `blush-100`: `#FFEBEB` — Nền quà tặng kèm
- `blush-500`: `#F2828D` — Màu icon yêu thích trái tim
- `blush-600`: `#E06D75` — Màu tag giảm giá % Sale

### Màu Chữ & Tương Phản (Charcoal Slate Palette)
- `charcoal-900`: `#2D3142` — Chữ tiêu đề chính (độ tương phản cao nhưng không gắt)
- `charcoal-700`: `#4F5D75` — Chữ nội dung mô tả sản phẩm
- `charcoal-400`: `#98A1B0` — Chữ gợi ý placeholder, giá gốc gạch ngang

---

## 2. Typography (Font Chữ)

- **Font Tiêu Đề (Headings)**: `Quicksand` / `Be Vietnam Pro` (Tròn trịa, đáng yêu, thân thiện với mẹ & bé)
- **Font Nội Dung (Body)**: `Inter` / `Be Vietnam Pro` (Dễ đọc ở kích thước nhỏ trên màn hình di động)

### Thang Cỡ Chữ (Font Scale):
- `text-xs`: 12px (Nhãn phụ, cân nặng size bé, ngày tháng)
- `text-sm`: 14px (Mô tả ngắn, danh mục, menu mobile)
- `text-base`: 16px (Chữ nội dung chuẩn, giá tiền cơ bản)
- `text-lg`: 18px (Tên sản phẩm trên card, giá nổi bật)
- `text-xl`: 20px (Tiêu đề mục nhỏ)
- `text-2xl`: 24px (Tiêu đề danh mục, tiêu đề trang)
- `text-3xl` - `text-4xl`: 30px - 36px (Hero banner slogan)

---

## 3. Bo Góc & Hiệu Ứng (Border Radius & Shadows)

- **Bo góc nhẹ**: `rounded-xl` (12px) cho input, badge nhỏ.
- **Bo góc chuẩn**: `rounded-2xl` (16px) cho thẻ `ProductCard`, dropdown menu.
- **Bo góc mềm**: `rounded-3xl` (24px) cho banner, modal popup, sticky bottom bar.
- **Bo tròn hoàn toàn**: `rounded-full` (9999px) cho nút bấm CTA, avatar bé, tag lọc.
- **Bóng đổ nhẹ (Soft Shadows)**:
  - `shadow-soft`: `0 4px 20px -2px rgba(220, 190, 160, 0.15)` (Tông bóng màu kem ấm áp thay vì bóng xám đen công nghiệp).
