# Kế Hoạch Đo Lường Phễu Chuyển Đổi & Phân Tích Hành Vi (Analytics Funnel Plan)

Tài liệu này chuẩn hoá toàn bộ hệ thống đo lường của dự án T'Petie phục vụ Giai đoạn 4, 5 và 6 của đồ án.

---

## 1. Mục Tiêu Nghiên Cứu & Câu Hỏi Cần Trả Lời
1. **Phễu mua sắm**: Người dùng rời bỏ nhiều nhất ở bước nào? (Từ xem danh mục sang xem chi tiết sản phẩm, hay từ chi tiết sản phẩm sang thêm giỏ hàng, hay lúc điền form thanh toán?)
2. **Hành vi tương tác**: Mẹ bỉm có bấm vào xem bảng hướng dẫn chọn size không? Hay họ bấm trực tiếp vào size theo cảm tính?
3. **Hiệu quả nội dung**: Bộ sưu tập câu chuyện (VD: *Hương Cốm Mùa Thu*) có tỷ lệ click cao hơn danh mục thông thường không?
4. **Trải nghiệm Mobile**: Có xuất hiện "Rage Click" (bấm liên tục vì bực bội) hoặc "Dead Click" (bấm nhầm vào vùng không có link) trên màn hình điện thoại không?

---

## 2. Thiết Kế Phễu Đo Lường (Funnel Steps in GA4)

```text
Step 1: session_start (Truy cập web)
   ↓
Step 2: view_item_list (Xem Danh mục / Xem Bộ Sưu Tập / Tìm kiếm)
   ↓
Step 3: view_item (Xem trang chi tiết sản phẩm)
   ↓
Step 4: add_to_cart (Bấm Thêm vào giỏ hàng)
   ↓
Step 5: view_cart (Xem giỏ hàng)
   ↓
Step 6: begin_checkout (Bấm nút Tiến hành thanh toán)
   ↓
Step 7: purchase (Điền xong thông tin & Hoàn tất thanh toán giả lập)
```

---

## 3. Ma Trận Sự Kiện Chi Tiết (Event Matrix)

| Tên Sự Kiện | Vị Trí Gắn | Dữ Liệu Gửi Kèm (Parameters) | Mục Đích Phân Tích |
| :--- | :--- | :--- | :--- |
| `click_hero_banner` | Banner Trang Chủ | `banner_id`, `banner_title`, `target_url` | Đo lường hiệu quả quảng cáo trang chủ |
| `filter_products` | Bộ lọc FilterBar | `filter_category`, `size_range`, `price_range` | Khảo sát nhu cầu tìm kiếm của phụ huynh |
| `open_size_guide` | Nút "Hướng dẫn chọn size" | `product_id`, `product_name` | Đo lường mức độ băn khoăn về kích cỡ của mẹ bỉm |
| `select_product_size`| Nút chọn size 1, 2, 3... | `product_id`, `size_name`, `price` | Khảo sát độ tuổi/cân nặng bé phổ biến nhất |
| `add_to_cart` | Nút Thêm vào giỏ | `item_id`, `item_name`, `item_category`, `price`, `quantity` | Tỷ lệ muốn mua |
| `click_quick_order` | Nút Mua Ngay | `item_id`, `item_name`, `price`, `size` | So sánh hành vi "Mua Ngay" vs "Thêm Giỏ" |
| `apply_promo_code` | Ô nhập mã giảm giá | `coupon_code`, `is_valid`, `discount_amount` | Đo lường độ nhạy về giá & khuyến mãi |
| `purchase_simulated`| Nút Hoàn tất đơn | `order_id`, `total_amount`, `payment_method`, `items_count` | Tỷ lệ chuyển đổi thành công cuối cùng |

---

## 4. Cấu Hình Microsoft Clarity Heatmap
- Tích hợp mã script Clarity vào `src/app/layout.tsx`.
- Gắn nhãn Custom Tags:
  - `user_type`: `new_visitor` / `returning_visitor`
  - `device_type`: `mobile` / `desktop` / `tablet`
  - `cart_status`: `empty` / `has_items`
  - `reached_checkout`: `true` / `false`
- Quan sát video tương tác để phát hiện các thao tác ngập ngừng khi chọn size hoặc khi điền form thanh toán.
