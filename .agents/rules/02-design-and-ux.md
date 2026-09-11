# Rule 02: Design Language & Mobile-First UX Guidelines

## 1. Triết Lý Thiết Kế: "Ngọt Ngào - Trong Trẻo - Tinh Tế"
Giao diện T'Petie được thiết kế để tạo cảm giác dịu dàng, ấm áp và đáng tin cậy cho các mẹ bỉm sữa khi lựa chọn trang phục cho con yêu.

## 2. Bảng Màu Thương Hiệu (Color Palette)
Mọi component CSS / Tailwind phải sử dụng các mã màu chuẩn sau:

- **Màu Kem Vani (Primary Background & Surface)**:
  - `bg-cream-50`: `#FFFDF9` (Nền chính toàn trang)
  - `bg-cream-100`: `#FFF8EE` (Nền thẻ card, section nổi bật)
  - `border-cream-200`: `#F5EBE1` (Đường viền ngăn cách mềm)
- **Màu Xanh Cốm Non (Fresh Accent & Organic Tag)**:
  - `text-sage-700` / `bg-sage-100`: `#EAF4EC` (Nền nhãn "Hữu cơ", "Cotton 100%")
  - `bg-sage-500`: `#77B77A` (Màu nhấn thiên nhiên, an toàn)
- **Màu Vàng Mật Ong (Warm CTA & Highlight)**:
  - `bg-honey-500`: `#F5A623` (Nút Mua Ngay, Giá sản phẩm, Badge Hot)
  - `text-honey-700`: `#C27803` (Giá sale, icon đánh giá sao)
- **Màu Hồng Phấn Cánh Sen (Sweet Softness for Girls)**:
  - `bg-blush-100`: `#FDF0F0` (Nền danh mục bé gái, quà tặng)
  - `text-blush-600`: `#E06D75` (Tag khuyến mãi, icon yêu thích)
- **Màu Chữ & Tương Phản**:
  - `text-charcoal-900`: `#2D3142` (Chữ tiêu đề đậm nét nhưng không bị gắt như màu đen tuyền)
  - `text-charcoal-600`: `#6C727F` (Mô tả, phụ đề, thông tin phụ)

## 3. Quy Chuẩn Mobile-First UX Cho Mẹ Bỉm Sữa
1. **Thao Tác Một Tay (Thumb Zone)**:
   - Thanh điều hướng chính (Bottom Navigation Bar hoặc Sticky Header thông minh).
   - Nút "Thêm vào giỏ" & "Mua ngay" luôn cố định ở đáy màn hình trên thiết bị di động (Sticky Bottom Bar khi ở trang chi tiết sản phẩm).
2. **Kích Thước Vùng Chạm (Touch Targets)**:
   - Các nút chọn Size (ví dụ: Size 1 (8-10kg), Size 2 (10-12kg)...), chọn màu, tăng giảm số lượng phải có kích thước tối thiểu `44px x 44px`.
3. **Bảng Size Rõ Ràng & Trực Quan**:
   - Mẹ bỉm mua sắm thường băn khoăn về cân nặng và chiều cao của bé. Phải luôn có nút popup "Hướng dẫn chọn size cho bé" ngay dưới mục chọn size.
4. **Tối Giản Bước Checkout**:
   - Quy trình mua hàng giả lập 1 trang (Single Page Checkout) gọn nhẹ, điền nhanh số điện thoại, địa chỉ nhận hàng và hình thức thanh toán (COD / Chuyển khoản QR).
