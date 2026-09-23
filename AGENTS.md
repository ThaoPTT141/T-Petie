# T'Petie — AI Agent Coding Guidelines & Context

Chào mừng AI Agent đến với dự án **T'Petie** — Thương hiệu thời trang trẻ em cao cấp dành cho Mẹ & Bé, với phong cách thiết kế **"Ngọt ngào, trong trẻo"** và trải nghiệm mua sắm tối ưu **Mobile-First**.

---

## 1. Ngữ Cảnh Dự Án & Lộ Trình 6 Tuần

Dự án được xây dựng bám sát lộ trình 6 giai đoạn:
- **Giai đoạn 1 (Tuần 1)**: Nghiên cứu & Kiến trúc thông tin (Chuẩn hoá dữ liệu Google Sheet, Customer Journey Map, 3–4 Persona mẹ bỉm sữa, Sitemap & User Flow).
- **Giai đoạn 2 (Tuần 2)**: Wireframe & UI Design (Low-fi & High-fi phong cách Pastel kem/cốm/mật ong, UI Kit chuẩn).
- **Giai đoạn 3 (Tuần 3–4)**: Dựng Frontend (Next.js App Router + TypeScript + TailwindCSS, Sticky Header, ProductCard, FilterBar, kết nối dữ liệu Google Sheet / JSON).
- **Giai đoạn 4 (Tuần 5)**: Gắn công cụ phân tích (GA4 + GTM + Microsoft Clarity Heatmap, thiết lập Funnel & Custom Events).
- **Giai đoạn 5 & 6 (Tuần 6)**: Thu thập dữ liệu thực tế, phân tích hành vi người dùng, báo cáo tỷ lệ drop-off và đề xuất tối ưu UX.

---

## 2. Nguyên Tắc Cốt Lõi Cho AI Agent (Core Rules)

1. **Mobile-First Tuyệt Đối**:
   - 90%+ người dùng mục tiêu là mẹ bỉm sữa thao tác bằng một tay trên điện thoại (iPhone/Android).
   - Nút bấm, CTA mua hàng, chọn size/màu phải to, rõ ràng, vùng chạm (touch target) tối thiểu 44x44px, thanh điều hướng dưới hoặc sticky thuận tiện ngón tay cái.

2. **Design Language — "Ngọt ngào, Trong trẻo, Cao cấp"**:
   - Màu sắc chủ đạo: Kem vani ấm áp (`#FFFDF7`, `#FFF8E7`), Xanh cốm non tươi mới (`#EAF4EC`, `#86C888`), Vàng mật ong điểm nhấn (`#F5A623`, `#D97706`), Hồng phấn cánh sen dịu ngọt (`#FFEBEB`).
   - Font chữ tròn trịa, hiện đại, dễ đọc (Be Vietnam Pro / Quicksand / Inter).
   - Bo góc mềm mại (`rounded-2xl`, `rounded-3xl`), bóng đổ nhẹ nhàng (`shadow-sm`, `shadow-md`), hiệu ứng chuyển động mượt mà.

3. **Kiến Trúc Mã Nguồn (Next.js App Router + TypeScript)**:
   - Sử dụng Next.js App Router (`src/app/`).
   - Component phân tách rõ ràng theo domain: `src/components/common`, `layout`, `product`, `collection`, `filter`, `analytics`.
   - TypeScript `strict: true` — luôn có types đầy đủ trong `src/types/`.
   - Tránh hardcode chuỗi hoặc màu sắc ngoài Design Tokens.

4. **Đo Lường & Analytics Là Trọng Tâm**:
   - Mọi hành vi tương tác quan trọng (Xem sản phẩm, Chọn size, Click BST, Click Sale, Thêm giỏ hàng, Rớt ở bước thanh toán) đều phải được kích hoạt qua module `src/lib/analytics/tracker.ts`.
   - Chuẩn hoá định dạng `dataLayer.push` cho GTM và sự kiện tùy chỉnh cho GA4 + Microsoft Clarity.

5. **Tự Động Đồng Bộ GitHub (Auto Git Sync)**:
   - Sau mỗi lần chỉnh sửa/viết code/dữ liệu thành công theo yêu cầu của người dùng, luôn tự động chạy `git add`, `git commit` (với commit message ngắn gọn, chuẩn mực) và `git push origin <branch>` để đồng bộ ngay lập tức lên kho lưu trữ GitHub.

---

## 3. Bản Đồ Thư Mục Dự Án (Project Structure Map)

- `.agents/`: Rules và Skills cho AI Agent.
- `docs/`: Đặc tả yêu cầu, Personas, Customer Journey, Design Tokens, Funnel Analytics Spec.
- `src/app/`: Next.js App Router Pages.
- `src/components/`: UI Components tái sử dụng.
- `src/lib/`: Analytics Tracker, Sheet API Client, Formatters, Constants.
- `src/types/`: TypeScript definitions (Product, Collection, Cart, Analytics).
- `src/data/`: Static Mock Data & Cleaned Sheet Data.
