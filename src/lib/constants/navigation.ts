/**
 * Cấu hình Navigation cho Header Desktop & Mobile Bottom Bar
 */

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  icon?: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Trang Chủ', href: '/' },
  { label: 'Bé Gái', href: '/category/be-gai' },
  { label: 'Bé Trai', href: '/category/be-trai' },
  { label: 'Sơ Sinh Organic', href: '/category/so-sinh' },
  { label: 'Bộ Sưu Tập', href: '/collections/huong-com-mua-thu', badge: 'Mới' },
  { label: 'Sale Khuyến Mãi', href: '/sale', badge: 'Hot' },
];

export const MOBILE_BOTTOM_NAV: NavItem[] = [
  { label: 'Trang Chủ', href: '/', icon: 'Home' },
  { label: 'Danh Mục', href: '/category/be-gai', icon: 'LayoutGrid' },
  { label: 'Bộ Sưu Tập', href: '/collections/huong-com-mua-thu', icon: 'Sparkles' },
  { label: 'Sale', href: '/sale', icon: 'Percent', badge: 'Hot' },
  { label: 'Giỏ Hàng', href: '/cart', icon: 'ShoppingBag' },
];
