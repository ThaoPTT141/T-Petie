/**
 * Client kết nối và nạp dữ liệu sản phẩm từ Google Sheet API hoặc local JSON fallback
 */

import { Product } from '@/types/product';
import localProducts from '@/data/products.json';
import localCollections from '@/data/collections.json';
import { Collection } from '@/types/collection';

export async function getProducts(): Promise<Product[]> {
  const sheetApiUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL;

  if (!sheetApiUrl) {
    // Trả về dữ liệu local đã chuẩn hóa
    return localProducts as unknown as Product[];
  }

  try {
    const res = await fetch(sheetApiUrl, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch from Google Sheet');
    const data = await res.json();
    return data as Product[];
  } catch (error) {
    console.warn('⚠️ Lỗi kết nối Google Sheet, sử dụng dữ liệu tĩnh fallback:', error);
    return localProducts as unknown as Product[];
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id || p.sku === id);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === category);
}

export async function getCollections(): Promise<Collection[]> {
  return localCollections as Collection[];
}

export async function getCollectionById(id: string): Promise<Collection | undefined> {
  const collections = await getCollections();
  return collections.find((c) => c.id === id);
}
