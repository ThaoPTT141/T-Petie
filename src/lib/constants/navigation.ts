/**
 * Cấu hình Navigation cho Header Desktop & Mobile Bottom Bar
 */

export interface SubNavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  badgeColor?: string;
  icon?: string;
  children?: SubNavItem[];
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    label: 'Trang Chủ',
    href: '/',
    children: [
      { label: 'Bộ Sưu Tập Nổi Bật', href: '/#collections' },
      { label: 'Sản Phẩm Bán Chạy Nhất', href: '/#best-seller' },
      { label: 'Ưu Đãi Độc Quyền', href: '/#flash-sale' },
    ],
  },
  {
    label: 'Về Chúng Tôi',
    href: '/ve-chung-toi',
    children: [
      { label: 'Câu chuyện thương hiệu', href: '/ve-chung-toi?tab=story', description: 'Hành trình từ năm 2021' },
      { label: 'Niềm tin', href: '/ve-chung-toi?tab=belief', description: 'Tuổi thơ chỉ cần được nâng niu' },
      { label: 'Tầm nhìn sứ mệnh', href: '/ve-chung-toi?tab=vision', description: 'Đồng hành cùng sự phát triển của bé' },
      { label: 'Giá trị cốt lõi', href: '/ve-chung-toi?tab=values', description: '4 nguyên tắc may đo an lành' },
    ],
  },
  {
    label: 'Bộ Sưu Tập',
    href: '/bo-suu-tap',
    badge: 'Mới',
    badgeColor: 'bg-honey-500',
    children: [
      { label: 'BST Học xinh kem', href: '/bo-suu-tap/hoc-xinh-kem', description: 'Nét trong sáng, tinh khôi ngày tựu trường' },
      { label: 'BST Trung thu kem & cốm', href: '/bo-suu-tap/trung-thu-kem-com', description: 'Hương cốm non & trăng rằm ấm áp' },
      { label: 'BST Hạ mật T6 2026', href: '/bo-suu-tap/ha-mat', description: 'Chất liệu thô đũi organic thoáng mát hè' },
      { label: 'BST Hè T3 Khánh Vy', href: '/bo-suu-tap/khanh-vy', description: 'Phiên bản hợp tác giới hạn độc quyền' },
    ],
  },
  {
    label: 'Ưu Đãi',
    href: '/sale',
    badge: '-30%',
    badgeColor: 'bg-orange-500',
    children: [
      { label: 'Mừng đại lễ 2/9', href: '/sale?campaign=dai-le-2-9', description: 'Đồng loạt giảm giá áo sơ mi & set bộ' },
      { label: 'Sale hè', href: '/sale?campaign=sale-he', description: 'Đồng giá từ 145k váy voan & bloomer' },
      { label: 'Sale Thu - Đông', href: '/sale?campaign=sale-thu-dong', description: 'Ưu đãi sớm BST Thu Đông và áo khoác' },
      { label: 'Sale ngày đôi 10/10 11/11', href: '/sale?campaign=sale-ngay-doi', description: 'Bão deal quà tặng & voucher freeship' },
    ],
  },
];

export const MOBILE_BOTTOM_NAV: NavItem[] = [
  { label: 'Trang Chủ', href: '/', icon: 'Home' },
  { label: 'Về Chúng Tôi', href: '/ve-chung-toi', icon: 'Heart' },
  { label: 'Bộ Sưu Tập', href: '/bo-suu-tap', icon: 'Sparkles', badge: 'Mới' },
  { label: 'Ưu Đãi', href: '/sale', icon: 'Percent', badge: 'Hot' },
];
