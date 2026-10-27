import type { Product } from '@/types/models';

/**
 * Hide unused ready-made category templates without deleting existing browser data.
 * A preset configured by its shopkeeper has isTemplate=false and remains visible.
 * Legacy and custom product records remain visible as before.
 */
export function isShopProduct(product: Pick<Product,'source'|'isTemplate'>): boolean {
  return product.source !== 'catalog' || product.isTemplate === false;
}
