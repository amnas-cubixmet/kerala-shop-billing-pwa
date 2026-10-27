import type { CartEntry, Product, Quote, PricedItem } from '@/types/models';

export function rupeeToPaise(value: string | number): number {
  const str = String(value).trim();
  if (!/^(?:\d+)(?:\.\d{1,2})?$/.test(str)) throw new Error('Enter a valid positive amount (max 2 decimals).');
  const [rupees, cents = ''] = str.split('.');
  const result = Number(rupees) * 100 + Number(cents.padEnd(2, '0'));
  if (!Number.isSafeInteger(result) || result < 0) throw new Error('Amount is out of range.');
  return result;
}
export function unitsToMilli(value: string | number): number {
  const str = String(value).trim();
  if (!/^\d+(?:\.\d{1,3})?$/.test(str)) throw new Error('Quantity must have at most 3 decimal places.');
  const [whole, decimal = ''] = str.split('.');
  const result = Number(whole) * 1000 + Number(decimal.padEnd(3, '0'));
  if (!Number.isSafeInteger(result) || result < 0) throw new Error('Invalid quantity.');
  return result;
}
export const fmt = (paise: number): string => '₹' + (paise / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const qtyText = (milli: number): string => (milli / 1000).toLocaleString('en-IN', { maximumFractionDigits: 3 });
export const localDate = (date = new Date()): string => {
  const y = date.getFullYear(), m = String(date.getMonth() + 1).padStart(2, '0'), d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};
export const monthKey = (date = new Date()) => localDate(date).slice(0, 7);

export function calculateQuote(cart: CartEntry[], products: Product[], discountPaise: number): Quote {
  if (!Number.isSafeInteger(discountPaise) || discountPaise < 0) throw new Error('Invalid discount.');
  const map = new Map(products.map((p) => [p.id, p]));
  const raw = cart.map(({ productId, quantityMilli }) => {
    const p = map.get(productId);
    if (!p || !p.active) throw new Error('Product unavailable.');
    if (!Number.isSafeInteger(quantityMilli) || quantityMilli <= 0) throw new Error('Invalid quantity.');
    const subtotalPaise = Math.round(p.pricePaise * quantityMilli / 1000);
    if (!Number.isSafeInteger(subtotalPaise)) throw new Error('Bill amount too large.');
    return { p, quantityMilli, subtotalPaise };
  });
  if (new Set(cart.map((e) => e.productId)).size !== cart.length) throw new Error('Duplicate product in cart.');
  const subtotalPaise = raw.reduce((sum, r) => sum + r.subtotalPaise, 0);
  if (!Number.isSafeInteger(subtotalPaise)) throw new Error('Bill amount too large.');
  if (discountPaise > subtotalPaise) throw new Error('Discount cannot exceed subtotal.');
  let remaining = discountPaise;
  const items: PricedItem[] = raw.map(({ p, quantityMilli, subtotalPaise: sub }, index) => {
    const part = index === raw.length - 1 ? remaining : Math.floor(discountPaise * sub / (subtotalPaise || 1));
    remaining -= part;
    const taxable = sub - part;
    const taxPaise = Math.round(taxable * p.taxBps / 10000);
    return {
      productId: p.id, name: p.name, unit: p.unit, quantityMilli,
      pricePaise: p.pricePaise, discountPaise: part, taxBps: p.taxBps,
      subtotalPaise: sub, taxPaise, totalPaise: taxable + taxPaise,
    };
  });
  const taxPaise = items.reduce((sum, item) => sum + item.taxPaise, 0);
  const totalPaise = subtotalPaise - discountPaise + taxPaise;
  if (!Number.isSafeInteger(totalPaise)) throw new Error('Bill amount too large.');
  return { items, subtotalPaise, discountPaise, taxPaise, totalPaise };
}
