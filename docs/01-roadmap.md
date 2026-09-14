# Lộ Trình Triển Khai Dự Án T'Petie (6 Tuần)

Tài liệu này chi tiết hoá toàn bộ công việc, mục tiêu và kết quả bàn giao (Deliverables) theo từng tuần cho dự án thời trang trẻ em T'Petie.

---

## Giai Đoạn 1 — Nghiên Cứu & Kiến Trúc Thông Tin (Tuần 1)
- [x] Chuẩn hoá dữ liệu sản phẩm từ Google Sheet T'Petie (tên, chất liệu, giá theo size, tình trạng hàng, link ảnh, mô tả).
- [x] Xây dựng Customer Journey Map sơ bộ: Trang chủ → Tìm kiếm / Lọc danh mục → Xem BST / Sale → Trang chi tiết → Thêm giỏ hàng → Checkout giả lập.
- [x] Xác định 3–4 Persona mẹ bỉm sữa mua hàng qua điện thoại (định hướng mobile-first).
- [x] Xây dựng Sitemap và Sơ đồ luồng người dùng (User Flow Diagram).
- **Deliverable**: Sitemap + User Flow Diagram + Bảng dữ liệu sản phẩm đã làm sạch (`src/data/products.json`).

---

## Giai Đoạn 2 — Wireframe & UI Design (Tuần 2)
- [ ] Thiết kế Wireframe Low-Fidelity cho 6 màn hình chính:
  1. Trang chủ (Hero Banner, BST nổi bật, Sản phẩm mới, Feedback mẹ bỉm).
  2. Danh mục Bé Gái / Sơ Sinh / Phụ Kiện.
  3. Trang Bộ sưu tập (Lookbook & Storytelling).
  4. Trang Sale (Đồng giá, Flash Sale theo giờ).
  5. Trang Chi tiết sản phẩm (Bộ ảnh zoom, Chọn size theo cân nặng, Hướng dẫn giặt ủi).
  6. Trang Giỏ hàng & Checkout 1 bước.
- [ ] Xây dựng High-Fidelity UI Kit phong cách **"Ngọt ngào, trong trẻo"** (Palette Pastel Kem / Cốm / Mật Ong).
- **Deliverable**: Bộ Wireframe + UI Kit tokens + Mockup giao diện hoàn chỉnh.

---

## Giai Đoạn 3 — Dựng Frontend (Tuần 3 – 4)
- [ ] Khởi tạo dự án Next.js App Router + TypeScript + TailwindCSS.
- [ ] Dựng Layout dùng chung: Sticky Header (Menu + Search + Cart badge) và Bottom Navigation cho Mobile.
- [ ] Dựng các trang theo Sitemap, kết nối dữ liệu từ Google Sheet API (kèm fallback JSON).
- [ ] Xây dựng các Component tái sử dụng: `ProductCard`, `CollectionBanner`, `SaleTag`, `FilterBar`, `SizeSelector`, `ToastNotification`.
- [ ] Tối ưu hóa hiệu năng và trải nghiệm Mobile-First.
- **Deliverable**: Website chạy hoàn chỉnh ở môi trường Local/Vercel, giao diện responsive mượt mà.

---

## Giai Đoạn 4 — Gắn Công Cụ Phân Tích (Tuần 5)
- [ ] Cài đặt Google Tag Manager (GTM) và Google Analytics 4 (GA4).
- [ ] Tích hợp công cụ Heatmap & Session Recording (Microsoft Clarity).
- [ ] Cấu hình E-commerce Funnel chuẩn: `View Home` → `View Category/Collection` → `View Product Detail` → `Add to Cart` → `Begin Checkout` → `Purchase`.
- [ ] Gắn Custom Events đo lường tương tác sâu: Click vào từng BST, lọc giá/size, tìm kiếm từ khoá, bấm xem bảng size.
- **Deliverable**: Dashboard GA4 hoạt động + Microsoft Clarity ghi nhận heatmap với dữ liệu test.

---

## Giai Đoạn 5 & 6 — Thu Thập Dữ Liệu & Báo Cáo Phân Tích UX (Tuần 6)
- [ ] Phát hành bản thử nghiệm cho nhóm người dùng mục tiêu (bạn bè, người thân, mẹ bỉm sữa).
- [ ] Thu thập dữ liệu thực tế: Session recording, Heatmap click/scroll, drop-off rate trong phễu.
- [ ] Phân tích các chỉ số:
  - Trang nào có tỷ lệ thoát (drop-off) cao nhất?
  - Bộ sưu tập nào được chú ý và click nhiều nhất?
  - Thanh tìm kiếm và bộ lọc size có giúp khách tìm đồ nhanh hơn không?
- [ ] Đề xuất phương án tối ưu UX/UI dựa trên dữ liệu định lượng và định tính.
- **Deliverable**: Báo cáo phân tích Web & UX hoàn chỉnh — đúng trọng tâm đồ án môn học.
