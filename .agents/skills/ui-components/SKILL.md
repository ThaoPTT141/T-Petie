---
name: ui-components
description: >-
  Hướng dẫn xây dựng các component UI chuẩn Design System phong cách ngọt ngào, trong trẻo và tối ưu Mobile-First.
---

# UI Components Construction Skill

Skill này định hình cách tạo các component chuẩn phong cách T'Petie (Pastel kem/cốm/mật ong, bo tròn mềm mại, mobile-first).

## 1. Nguyên Tắc Thiết Kế Component
1. **Bo tròn & Dịu mắt**: Sử dụng `rounded-2xl` hoặc `rounded-3xl` cho thẻ card và modal.
2. **Hiệu ứng chạm (Touch Feedback)**: Thêm `active:scale-95 transition-transform duration-150` cho các nút bấm trên di động.
3. **Phân cấp thông tin rõ ràng**:
   - Tên sản phẩm: `text-sm sm:text-base font-medium text-charcoal-900 line-clamp-2`
   - Giá hiển thị: `text-base sm:text-lg font-bold text-honey-600`
   - Tag chất liệu: `text-xs px-2 py-0.5 rounded-full bg-sage-100 text-sage-800 font-medium`

## 2. Danh Sách Component Cốt Lõi Cần Dựng
- `ProductCard`: Hiển thị ảnh vuông bo góc, tag BST/Sale, giá từ thấp đến cao, nút chọn size nhanh.
- `StickyHeader`: Logo T'Petie cách điệu xinh xắn, thanh search bar mở rộng khi bấm, icon giỏ hàng có badge số lượng.
- `BottomNavigation`: Thanh điều hướng chân trang cho mobile (Trang chủ, Danh mục, BST, Sale, Giỏ hàng).
- `SizeSelector`: Lưới nút chọn size kèm cân nặng tương ứng (VD: `Size 1: 8-10kg`).
- `FilterBar`: Bộ lọc trượt ngang (horizontal scroll) cho mobile gồm: Mức giá, Độ tuổi/Cân nặng, Chất liệu, Bộ sưu tập.
