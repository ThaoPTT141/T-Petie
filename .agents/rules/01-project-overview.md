# Rule 01: Project Overview & Roadmap Guidelines

## 1. Thông Tin Chung
- **Dự án**: T'Petie (Thời trang trẻ em cao cấp)
- **Đối tượng khách hàng**: Mẹ bỉm sữa, phụ huynh có con nhỏ (0 - 8 tuổi)
- **Định hướng sản phẩm**: Váy đầm bé gái, set đồ bé trai, đồ bộ organic sơ sinh, bộ sưu tập theo mùa, chương trình Sale định kỳ.

## 2. Lộ Trình Thực Thi 6 Tuần

| Tuần | Giai đoạn | Mục tiêu cốt lõi | Deliverables |
| :--- | :--- | :--- | :--- |
| **Tuần 1** | **Nghiên cứu & Kiến trúc TT** | Chuẩn hoá dữ liệu Sheet, Journey Map, 3-4 Personas mẹ bỉm, Sitemap & User Flow | `docs/01` - `docs/04`, dữ liệu mẫu `src/data/products.json` |
| **Tuần 2** | **Wireframe & UI Design** | Wireframe Mobile-first, High-fi mockup tông Pastel kem/cốm/mật ong, UI Kit | `docs/05-design-tokens.md`, UI components foundation |
| **Tuần 3-4** | **Dựng Frontend** | Next.js App Router, TailwindCSS, ProductCard, FilterBar, kết nối dữ liệu | Source code `src/app/`, `src/components/` chạy mượt mà local |
| **Tuần 5** | **Gắn Analytics** | Cài đặt GA4, GTM, Microsoft Clarity Heatmap, gắn Funnel & Custom Events | `src/lib/analytics/`, Dashboard GA4, Heatmap session recording |
| **Tuần 6** | **Thu thập & Phân tích UX** | Thử nghiệm với người dùng thật, phân tích drop-off, đề xuất cải tiến | Báo cáo phân tích dữ liệu môn học hoàn chỉnh |

## 3. Quy Tắc Khi AI Agent Xử Lý Nhiệm Vụ
- Khi người dùng yêu cầu làm bất kỳ task nào, AI cần xác định task đó thuộc **Tuần/Giai đoạn nào**.
- Luôn kiểm tra các file docs liên quan trong thư mục `docs/` trước khi sinh code.
- Đảm bảo tính nhất quán giữa dữ liệu sản phẩm, giao diện và mã đo lường sự kiện.
