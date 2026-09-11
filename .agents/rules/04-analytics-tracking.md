# Rule 04: Analytics & Funnel Tracking Guidelines

## 1. Mục Đích Đo Lường
Đo lường toàn bộ hành trình khách hàng từ lúc vào web đến khi hoàn tất đơn hàng để phục vụ phân tích tỷ lệ chuyển đổi (Conversion Rate) và điểm nghẽn (Drop-off points) cho môn học.

## 2. Các Công Cụ Đo Lường Tích Hợp
1. **Google Tag Manager (GTM)**: Quản lý và phân phối tags tập trung.
2. **Google Analytics 4 (GA4)**: Đo lường sự kiện, kênh truy cập, phễu mua hàng.
3. **Microsoft Clarity**: Ghi hình phiên thao tác người dùng (Session Recordings) và bản đồ nhiệt (Heatmaps click/scroll) - hoàn toàn miễn phí.

## 3. Phễu Chuyển Đổi Chuẩn (E-Commerce Funnel)

```text
[1. View Home / Landing] 
       ↓ (Click Banner / Search / Filter)
[2. View Category / Collection] 
       ↓ (Click ProductCard)
[3. View Product Detail] 
       ↓ (Select Size + Click Add to Cart)
[4. Add To Cart] 
       ↓ (View Cart Drawer / Page)
[5. Begin Checkout] 
       ↓ (Fill Shipping Info + Select Payment)
[6. Complete Simulated Purchase]
```

## 4. Danh Sách Custom Events Bắt Buộc

| Event Name | Khi nào kích hoạt | Thuộc tính (Parameters) |
| :--- | :--- | :--- |
| `view_item_list` | Khi mở trang Danh mục hoặc BST | `item_list_name`, `items_count` |
| `select_item` | Khi click vào 1 ProductCard | `item_id`, `item_name`, `price`, `category` |
| `view_item` | Khi mở trang chi tiết sản phẩm | `item_id`, `item_name`, `price`, `material` |
| `select_size` | Khi bấm chọn size (Size 1, 2...) | `item_id`, `selected_size`, `price` |
| `add_to_cart` | Khi bấm nút "Thêm vào giỏ hàng" | `item_id`, `item_name`, `size`, `quantity`, `value` |
| `view_cart` | Khi mở giỏ hàng | `cart_total_value`, `cart_total_items` |
| `begin_checkout`| Khi bấm "Tiến hành thanh toán" | `value`, `items` |
| `purchase` | Khi hoàn tất đơn hàng giả lập | `transaction_id`, `value`, `shipping_city` |
| `click_collection`| Khi click vào banner BST | `collection_id`, `collection_name` |
| `click_sale_banner`| Khi click vào tag / banner Sale | `promo_id`, `promo_name` |
| `use_search` | Khi gõ từ khoá tìm kiếm | `search_term`, `results_count` |

## 5. Quy Tắc Gắn Event Vào Code
- Tất cả các sự kiện phải gọi qua hàm tiện ích tập trung `src/lib/analytics/tracker.ts`.
- Không gọi trực tiếp `window.gtag` hay `window.clarity` rải rác trong component để tránh trùng lặp hoặc lỗi runtime khi SSR.
