---
name: sheet-data-sync
description: >-
  Hướng dẫn và kịch bản chuẩn hoá dữ liệu sản phẩm thời trang T'Petie từ Google Sheet sang TypeScript Schema và JSON cache.
---

# Sheet Data Sync Skill

Skill này hướng dẫn quy trình đồng bộ và làm sạch dữ liệu từ Google Sheet của T'Petie về cấu trúc JSON tĩnh và TypeScript Schema.

## 1. Cấu Trúc Các Cột Cần Chuẩn Hoá Từ Google Sheet
Một dòng sản phẩm T'Petie chuẩn gồm các cột:
1. `Mã sản phẩm` (SKU): VD `TP-VG-001`, `TP-BT-002`
2. `Tên sản phẩm`: VD `Váy Công Chúa Voan Tơ Hoa Nhí - Mật Ong Nhỏ`
3. `Danh mục`: `Váy Bé Gái`, `Bộ Bé Trai`, `Đồ Sơ Sinh`, `Phụ Kiện`
4. `Bộ sưu tập`: `Hương Cốm Mùa Thu`, `Nắng Mật Ong`, `Vườn Cổ Tích`
5. `Chất liệu`: `Thô đũi organic`, `Cotton 100% thoáng khí`, `Tơ lụa mềm mại`
6. `Giá theo size` (VND):
   - Size 1 (8 - 10kg): 245.000đ
   - Size 2 (10 - 12kg): 265.000đ
   - Size 3 (12 - 15kg): 285.000đ
   - Size 4 (15 - 18kg): 305.000đ
7. `Giá gốc (nếu có sale)`: 350.000đ
8. `Tình trạng tồn kho`: `Còn hàng` / `Sắp hết` / `Hết hàng`
9. `Link hình ảnh`: Mảng URL hình ảnh thực tế hoặc URL drive
10. `Đặc điểm nổi bật / Hướng dẫn giặt`: Mô tả chi tiết cho mẹ bỉm

## 2. Quy Trình Đồng Bộ & Validation
Khi thực hiện sync dữ liệu:
1. Tải về hoặc đọc qua Google Sheet CSV export / API.
2. Kiểm tra các trường bắt buộc (`name`, `sku`, `category`, `priceBySize`, `images`).
3. Chuẩn hoá định dạng số cho giá tiền (loại bỏ ký tự `.` hoặc `đ`).
4. Ghi đè vào tệp `src/data/products.json`.
5. Chạy validation qua file kiểm thử `src/types/product.ts`.
