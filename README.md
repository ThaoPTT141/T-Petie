# 🌸 T'Petie — Thời Trang Trẻ Em Cao Cấp (Mobile-First E-Commerce)

> Website thời trang trẻ em mang phong cách **"Ngọt ngào, trong trẻo"**, định hướng trải nghiệm mua sắm tối ưu trên điện thoại cho các Mẹ Bỉm Sữa. Dự án phục vụ môn học với trọng tâm là **Đo lường & Phân tích hành vi người dùng (GA4, GTM, Microsoft Clarity Heatmap)**.

---

## 🎯 Lộ Trình Triển Khai 6 Tuần

- **Tuần 1**: Nghiên cứu & Kiến trúc thông tin (Chuẩn hoá dữ liệu Google Sheet, Customer Journey Map, 3-4 Personas, Sitemap).
- **Tuần 2**: Wireframe & UI Design (UI Kit Pastel kem/cốm/mật ong, Low-fi & High-fi mockups).
- **Tuần 3–4**: Dựng Frontend (Next.js 14 App Router, TypeScript, TailwindCSS, ProductCard, FilterBar).
- **Tuần 5**: Gắn công cụ phân tích (GA4, GTM, Clarity Heatmap, E-commerce Funnel tracking).
- **Tuần 6**: Thu thập dữ liệu thực tế, phân tích tỷ lệ rớt (drop-off) và đề xuất tối ưu UX.

---

## 🛠️ Tech Stack & Kiến Trúc

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) tùy biến Design Tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Layer**: Google Sheet API Sync + Fallback JSON Local
- **Analytics & Tracking**: Google Analytics 4, Google Tag Manager, Microsoft Clarity (Heatmap & Session Recordings)

---

## 🚀 Hướng Dẫn Khởi Chạy Local

### 1. Cài đặt thư viện:
```bash
npm install
```

### 2. Thiết lập biến môi trường:
Tạo tệp `.env.local` từ mẫu `.env.example`:
```bash
cp .env.example .env.local
```

### 3. Chạy môi trường phát triển:
```bash
npm run dev
```
Truy cập [http://localhost:3000](http://localhost:3000) trên trình duyệt hoặc điện thoại trong cùng mạng LAN.

---

## 📁 Cấu Trúc Dự Án

```text
├── .agents/              # AI Agent Rules & Skills (Antigravity IDE)
├── docs/                 # Bộ tài liệu đặc tả nghiệp vụ & Roadmap 6 tuần
├── public/               # Thư mục chứa hình ảnh & static assets
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # UI Components tái sử dụng (common, layout, product...)
│   ├── data/             # Dữ liệu sản phẩm mẫu chuẩn hóa từ Sheet
│   ├── lib/              # Analytics tracker, formatters, sheet API client
│   └── types/            # TypeScript schema definitions
```
