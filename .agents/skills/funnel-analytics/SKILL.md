---
name: funnel-analytics
description: >-
  Quy trình cấu hình, kiểm thử và phân tích dữ liệu Google Analytics 4, GTM và Microsoft Clarity Heatmap cho đồ án T'Petie.
---

# Funnel Analytics & UX Optimization Skill

Skill này hướng dẫn chi tiết cách thiết lập, kiểm tra và khai thác dữ liệu từ các công cụ đo lường hành vi người dùng trong dự án T'Petie.

## 1. Các Bước Thiết Lập Biến Môi Trường
Đảm bảo các biến sau được khai báo trong `.env.local`:
```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=XXXXXXXXXX
```

## 2. Kiểm Thử Sự Kiện (Event Verification Workflow)
1. Mở web ở chế độ Local hoặc Staging.
2. Mở Chrome DevTools -> tab `Console`.
3. Khi thực hiện các hành động:
   - Click xem danh mục bé gái -> Kiểm tra log `[Analytics Event] view_item_list`.
   - Click sản phẩm -> Kiểm tra log `[Analytics Event] select_item` & `view_item`.
   - Chọn size -> Kiểm tra log `[Analytics Event] select_size`.
   - Thêm vào giỏ -> Kiểm tra log `[Analytics Event] add_to_cart`.
   - Vào giỏ hàng & thanh toán -> Kiểm tra `begin_checkout` & `purchase`.
4. Mở chế độ Google Tag Manager Preview (Tag Assistant) hoặc GA4 DebugView để xác nhận sự kiện được gửi thành công.

## 3. Quy Trình Phân Tích & Viết Báo Cáo Giai Đoạn 5-6
Khi nhóm người dùng thử nghiệm tương tác:
1. **Phân tích Phễu Mua Hàng**:
   - Tỷ lệ chuyển đổi từ Trang chủ -> Chi tiết sản phẩm.
   - Tỷ lệ drop-off từ Chi tiết sản phẩm -> Giỏ hàng (Mẹ bỉm có gặp khó khăn khi chọn size không?).
   - Tỷ lệ drop-off từ Giỏ hàng -> Hoàn tất thanh toán.
2. **Phân tích Heatmap & Dead Clicks (Clarity)**:
   - Vùng nào trên mobile mẹ bỉm bấm nhiều nhất?
   - Có "Dead Click" (bấm vào ảnh/chữ nhưng không có phản hồi) nào không?
3. **Đề xuất Tối ưu UX**:
   - Rút gọn form thanh toán.
   - Làm nổi bật bảng gợi ý size theo cân nặng/tháng tuổi.
   - Thêm nút "Mua nhanh qua Zalo" nếu khách ngại điền form.
