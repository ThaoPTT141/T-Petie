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
  { label: 'Bé Gái', href: '/be-gai' },
  { label: 'Bộ Sưu Tập', href: '/bo-suu-tap', badge: 'Mới' },
  { label: 'Sale Khuyến Mãi', href: '/sale', badge: 'Hot' },
];

export const MOBILE_BOTTOM_NAV: NavItem[] = [
  { label: 'Trang Chủ', href: '/', icon: 'Home' },
  { label: 'Bé Gái', href: '/be-gai', icon: 'LayoutGrid' },
  { label: 'Bộ Sưu Tập', href: '/bo-suu-tap', icon: 'Sparkles' },
  { label: 'Sale', href: '/sale', icon: 'Percent', badge: 'Hot' },
];
