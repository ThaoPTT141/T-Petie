# Cấu Trúc Thông Tin & Sitemap (Information Architecture)

Tài liệu này định hình kiến trúc cây trang web (Sitemap) và sơ đồ cấu trúc dữ liệu cho website T'Petie.

---

## 1. Cấu Trúc Cây Trang Web (Sitemap)

```text
/ (Trang Chủ)
├── /category/ (Danh Mục Sản Phẩm)
│   ├── /category/be-gai (Thời trang bé gái: Váy đầm, áo kiểu, set bộ)
│   ├── /category/be-trai (Thời trang bé trai: Set sơ mi, quần yếm, áo polo)
│   ├── /category/so-sinh (Đồ sơ sinh organic: Body chip, bao tay chân, chăn ủ)
│   └── /category/phu-kien (Phụ kiện: Mũ len, nơ cài tóc, tất hữu cơ)
│
├── /collections/ (Bộ Sưu Tập Theo Mùa & Câu Chuyện)
│   ├── /collections/huong-com-mua-thu (BST mùa thu tone xanh cốm dịu mát)
│   ├── /collections/nang-mat-ong (BST vàng mật ong ấm áp)
│   └── /collections/vuon-co-tich (BST váy đầm bồng bềnh công chúa)
│
├── /sale/ (Chương Trình Khuyến Mãi)
│   ├── /sale?type=dong-gia (Đồng giá từ 99k / 149k / 199k)
│   └── /sale?type=flash-sale (Giảm giá theo giờ)
│
├── /product/[id] (Trang Chi Tiết Sản Phẩm)
│   └── (Ảnh sản phẩm, Mô tả chất vải, Chọn size/giá, Bảng size, Đánh giá)
│
├── /cart (Trang Giỏ Hàng)
│   └── (Danh sách món đồ, Đổi số lượng/size, Mã giảm giá, Tạm tính)
│
├── /checkout (Trang Thanh Toán Giả Lập)
│   └── (Thông tin người nhận, Địa chỉ, Phương thức thanh toán COD/QR)
│
├── /order-success/[orderId] (Trang Xác Nhận Đơn Hàng Thành Công)
│
└── /about (Câu Chuyện Thương Hiệu T'Petie & Cam Kết Chất Lượng)
```

---

## 2. Cấu Trúc Thành Phần Giao Diện (Layout Structure)

### Global Header (Sticky)
- **Top Bar**: Thông báo ưu đãi ("Miễn phí vận chuyển cho đơn từ 399k" / "Tặng kèm kẹp nơ xinh cho đơn đầu tiên").
- **Main Bar**:
  - Logo T'Petie (Typography cách điệu dễ thương, màu vàng mật ong + xanh cốm).
  - Navigation Menu Desktop (Trang chủ, Bé gái, Bé trai, Sơ sinh, BST Mới, Sale).
  - Search Icon & Drawer mở rộng.
  - Cart Icon có Badge đếm số lượng giỏ hàng thực tế.

### Bottom Navigation Bar (Dành riêng cho Mobile)
1. **Trang Chủ** (Home Icon)
2. **Danh Mục** (Grid Icon)
3. **Bộ Sưu Tập** (Sparkles Icon)
4. **Sale** (Badge Percent Icon)
5. **Giỏ Hàng** (Shopping Bag Icon với Badge số lượng)

### Global Footer
- Giới thiệu thương hiệu T'Petie.
- Chính sách đổi size & bảo hành trong 7 ngày.
- Bảng hướng dẫn đo size bé.
- Kênh liên hệ Zalo Official / Hotline hỗ trợ mẹ bỉm.
