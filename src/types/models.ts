export type Unit = 'pcs' | 'kg' | 'ltr' | 'm' | 'bundle';
export type PaymentMethod = 'cash' | 'upi' | 'card' | 'other' | 'unpaid';
export type InvoiceStatus = 'final' | 'void';

export interface Shop {
  id: string;
  name: string;
  phone: string;
  address: string;
  gstin: string;
  currency: 'INR';
  createdAt: string;
}
export interface Product {
  id: string;
  name: string;
  malayalamName?: string;
  englishName?: string;
  brand?: string;
  packSize?: string;
  source?: 'catalog' | 'custom';
  icon?: string;
  imageDataUrl?: string;
  isTemplate?: boolean;
  sku: string;
  category: string;
  unit: Unit;
  pricePaise: number;
  costPaise: number;
  taxBps: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface Customer {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
}
export interface Invoice {
  id: string;
  shopId: string;
  number: string;
  date: string;
  customerId: string | null;
  customerName: string;
  subtotalPaise: number;
  discountPaise: number;
  taxPaise: number;
  totalPaise: number;
  paymentMethod: PaymentMethod;
  paidPaise: number;
  status: InvoiceStatus;
  voidedAt?: string;
  createdAt: string;
}
export interface InvoiceItem {
  id: string;
  invoiceId: string;
  productId: string;
  name: string;
  unit: Unit;
  quantityMilli: number;
  pricePaise: number;
  discountPaise: number;
  taxBps: number;
  taxPaise: number;
  totalPaise: number;
}
/** Kept for reading old backups only; the application no longer tracks inventory. */
export interface StockMovement {
  id: string;
  productId: string;
  changeMilli: number;
  reason: 'opening' | 'adjustment' | 'sale' | 'void';
  refId: string;
  date: string;
}
export interface Expense {
  id: string;
  category: string;
  amountPaise: number;
  notes: string;
  date: string;
  createdAt: string;
}
export interface Counter {
  id: string;
  nextNumber: number;
}
export interface CartEntry {
  productId: string;
  quantityMilli: number;
}
export interface PricedItem {
  productId: string;
  name: string;
  unit: Unit;
  quantityMilli: number;
  pricePaise: number;
  discountPaise: number;
  taxBps: number;
  subtotalPaise: number;
  taxPaise: number;
  totalPaise: number;
}
export interface Quote {
  items: PricedItem[];
  subtotalPaise: number;
  discountPaise: number;
  taxPaise: number;
  totalPaise: number;
}
