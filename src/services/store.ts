import { db } from '@/db/database';
import { KERALA_VEGETABLES } from '@/lib/vegetables';
import { KERALA_FRUITS, KERALA_FOODS, type FoodPreset } from '@/lib/food-catalog';
import { KERALA_BRANDED_PRESETS } from '@/lib/branded-catalog';
import { calculateQuote, localDate, rupeeToPaise } from '@/lib/money';
import type { CartEntry, Expense, Invoice, InvoiceItem, PaymentMethod, Product, Shop, Unit } from '@/types/models';

export async function initShop(): Promise<Shop> {
  const first = await db.shops.toCollection().first();
  if (first) return first;
  const shop: Shop = { id: crypto.randomUUID(), name: 'My Shop', phone: '', address: '', gstin: '', currency: 'INR', createdAt: new Date().toISOString() };
  // Only create when missing, including simultaneous first-use tabs.
  return db.transaction('rw', db.shops, async () => {
    const existing = await db.shops.toCollection().first();
    if (existing) return existing;
    await db.shops.add(shop);
    return shop;
  });
}
export async function saveShop(data: Pick<Shop, 'name' | 'phone' | 'address' | 'gstin'>): Promise<void> {
  if (!data.name.trim()) throw new Error('Shop name required.');
  const shop = await initShop();
  await db.shops.update(shop.id, { ...data, name: data.name.trim() });
}
export interface ProductInput {
  id?: string;
  name: string;
  malayalamName: string;
  englishName: string;
  brand: string;
  packSize: string;
  icon: string;
  imageDataUrl: string;
  sku: string;
  category: string;
  unit: Unit;
  price: string;
  cost: string;
  tax: string;
}
export async function saveProduct(data: ProductInput): Promise<void> {
  if (!data.name.trim() && !data.malayalamName.trim() && !data.englishName.trim()) throw new Error('Product name required.');
  const pricePaise = rupeeToPaise(data.price);
  const costPaise = rupeeToPaise(data.cost);
  const tax = Number(data.tax);
  if (!['0', '3', '5', '12', '18', '28'].includes(String(tax))) throw new Error('Choose a valid tax rate.');
  if (data.imageDataUrl && (!/^data:image\/(webp|png|jpeg);base64,[a-zA-Z0-9+/=]+$/.test(data.imageDataUrl) || data.imageDataUrl.length > 160_000)) {
    throw new Error('Invalid or oversized product photo.');
  }
  const now = new Date().toISOString();
  await db.transaction('rw', db.products, async () => {
    const existing = data.id ? await db.products.get(data.id) : undefined;
    if (data.id && !existing) throw new Error('Product no longer exists.');
    if (data.sku.trim()) {
      const duplicate = await db.products.where('sku').equals(data.sku.trim()).first();
      if (duplicate && duplicate.id !== data.id) throw new Error('This SKU is already used.');
    }
    const id = existing?.id ?? crypto.randomUUID();
    const product: Product = {
      ...existing, // Keep legacy data without changing or using it.
      id, name: [data.malayalamName.trim(), data.englishName.trim()].filter(Boolean).join(' / ') || data.name.trim(),
      malayalamName: data.malayalamName.trim(), englishName: data.englishName.trim(),
      brand: data.brand.trim().slice(0, 100), packSize: data.packSize.trim().slice(0, 100),
      source: existing?.source ?? (existing?.isTemplate ? 'catalog' : 'custom'),
      icon: data.icon.trim().slice(0, 16), imageDataUrl: data.imageDataUrl, isTemplate: false,
      sku: data.sku.trim(), category: data.category.trim(),
      unit: data.unit, pricePaise, costPaise, taxBps: tax * 100, active: existing?.pricePaise === 0 ? pricePaise > 0 : existing?.isTemplate ? pricePaise > 0 : existing?.active ?? true,
      createdAt: existing?.createdAt ?? now, updatedAt: now,
    };
    await db.products.put(product);
  });
}
export async function toggleProduct(id: string): Promise<void> {
  await db.transaction('rw', db.products, async () => {
    const p = await db.products.get(id);
    if (!p) throw new Error('Product not found.');
    await db.products.update(id, { active: !p.active, updatedAt: new Date().toISOString() });
  });
}
export async function addExpense(category: string, amount: string, notes: string, date: string): Promise<void> {
  if (!category.trim()) throw new Error('Select expense category.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Invalid expense date.');
  const amountPaise = rupeeToPaise(amount);
  if (amountPaise <= 0) throw new Error('Expense must be greater than zero.');
  const expense: Expense = {
    id: crypto.randomUUID(), category: category.trim(), amountPaise,
    notes: notes.trim(), date, createdAt: new Date().toISOString(),
  };
  await db.expenses.add(expense);
}
export async function deleteExpense(id: string): Promise<void> { await db.expenses.delete(id); }

function financialYear(date: string): string {
  const year = Number(date.slice(0, 4));
  return Number(date.slice(5, 7)) >= 4 ? `${year}-${String(year + 1).slice(2)}` : `${year - 1}-${String(year).slice(2)}`;
}
export async function saveInvoice(args: {
  cart: CartEntry[];
  discount: string;
  paymentMethod: PaymentMethod;
}): Promise<Invoice> {
  if (!args.cart.length) throw new Error('Cart is empty.');
  const discountPaise = rupeeToPaise(args.discount || '0');
  const shop = await initShop();
  return db.transaction('rw', [db.products, db.invoices, db.invoiceItems, db.counters], async () => {
    const products = await db.products.bulkGet(args.cart.map((c) => c.productId));
    if (products.some((p) => !p)) throw new Error('A product was removed.');
    const quote = calculateQuote(args.cart, products as Product[], discountPaise);
    const date = localDate();
    const fy = financialYear(date);
    const counterId = `${shop.id}:${fy}`;
    const counter = await db.counters.get(counterId);
    const number = counter?.nextNumber ?? 1;
    const formattedNumber = `INV-${fy}-${String(number).padStart(5, '0')}`;
    const now = new Date().toISOString();
    const invoice: Invoice = {
      id: crypto.randomUUID(), shopId: shop.id, number: formattedNumber, date,
      customerId: null, customerName: '',
      subtotalPaise: quote.subtotalPaise, discountPaise: quote.discountPaise,
      taxPaise: quote.taxPaise, totalPaise: quote.totalPaise,
      paymentMethod: args.paymentMethod, paidPaise: args.paymentMethod === 'unpaid' ? 0 : quote.totalPaise,
      status: 'final', createdAt: now,
    };
    const lines: InvoiceItem[] = quote.items.map((item) => ({
      id: crypto.randomUUID(), invoiceId: invoice.id, productId: item.productId,
      name: item.name, unit: item.unit, quantityMilli: item.quantityMilli,
      pricePaise: item.pricePaise, discountPaise: item.discountPaise,
      taxBps: item.taxBps, taxPaise: item.taxPaise, totalPaise: item.totalPaise,
    }));
    await db.invoices.add(invoice);
    await db.invoiceItems.bulkAdd(lines);
    await db.counters.put({ id: counterId, nextNumber: number + 1 });
    return invoice;
  });
}
export async function voidInvoice(id: string): Promise<void> {
  await db.transaction('rw', db.invoices, async () => {
    const invoice = await db.invoices.get(id);
    if (!invoice || invoice.status !== 'final') throw new Error('Invoice already void or not found.');
    await db.invoices.update(id, { status: 'void', voidedAt: new Date().toISOString() });
  });
}

/** Presets ship in the app bundle, then each user chooses which to copy into their private device database. */
export type PresetGroup = 'vegetables' | 'fruits' | 'foods' | 'bakery' | 'sweets' | 'branded';
export function productPresets(group: PresetGroup): FoodPreset[] {
  if (group === 'fruits') return [...KERALA_FRUITS];
  if (group === 'foods') return [...KERALA_FOODS];
  if (group === 'bakery') return KERALA_BRANDED_PRESETS.filter(p => p.category.startsWith('Bakery'));
  if (group === 'sweets') return KERALA_BRANDED_PRESETS.filter(p => p.category.startsWith('Sweets'));
  if (group === 'branded') return KERALA_BRANDED_PRESETS.filter(p => p.category.startsWith('Branded'));
  return KERALA_VEGETABLES.map(v => {
    const [malayalamName, ...english] = v.name.split(' / ');
    return { id:v.id, malayalamName, englishName:english.join(' / '), icon:v.icon, unit:v.unit, category:'Vegetables / പച്ചക്കറി' };
  });
}
/** All 850 photo-backed offline suggestions; no shop records are created just by browsing. */
export const CATALOG_GROUPS = ['vegetables', 'fruits', 'foods', 'bakery', 'sweets', 'branded'] as const;
export function allProductPresets(): FoodPreset[] {
  return CATALOG_GROUPS.flatMap(group => productPresets(group));
}

/** Only the IDs selected by this shopkeeper are copied into this device's private database. */
export async function addSelectedCatalogProducts(ids: readonly string[]): Promise<number> {
  const unique = [...new Set(ids)];
  if (!unique.length) return 0;
  const catalog = new Map(allProductPresets().map(product => [product.id, product]));
  if (unique.some(id => !catalog.has(id))) throw new Error('Unknown catalog product.');
  const now = new Date().toISOString();
  return db.transaction('rw', db.products, async () => {
    const saved = await db.products.bulkGet(unique);
    const toCreate: Product[] = [];
    const toSelect: string[] = [];
    unique.forEach((id, index) => {
      const preset = catalog.get(id)!;
      const existing = saved[index];
      if (!existing) {
        toCreate.push({
          id, name:[preset.malayalamName, preset.englishName].filter(Boolean).join(' / '),
          malayalamName:preset.malayalamName, englishName:preset.englishName,
          brand:'brand' in preset ? String(preset.brand) : '',
          packSize:'packSize' in preset ? String(preset.packSize) : '',
          source:'catalog', icon:preset.icon, imageDataUrl:'', isTemplate:false,
          sku:'', category:preset.category, unit:preset.unit, pricePaise:0,
          costPaise:0, taxBps:0, active:false, createdAt:now, updatedAt:now,
        });
      } else if (existing.source === 'catalog' && existing.isTemplate === true) {
        // Old installations may have the full catalog saved as unused templates.
        // Select only this product; never overwrite its images, price, or other data.
        toSelect.push(id);
      }
    });
    if (toCreate.length) await db.products.bulkAdd(toCreate);
    for (const id of toSelect) {
      const existing = saved[unique.indexOf(id)]!;
      await db.products.update(id, {isTemplate:false, active:existing.pricePaise>0, updatedAt:now});
    }
    return toCreate.length + toSelect.length;
  });
}

export async function addProductPresets(group: PresetGroup): Promise<number> {
  const presets = productPresets(group);
  const now = new Date().toISOString();
  return db.transaction('rw', db.products, async () => {
    const existing = await db.products.bulkGet(presets.map(v => v.id));
    const toAdd: Product[] = presets.filter((_, i) => !existing[i]).map(v => ({
      id:v.id, name:`${v.malayalamName} / ${v.englishName}`,
      malayalamName:v.malayalamName, englishName:v.englishName,
      brand:'brand' in v ? String(v.brand) : '', packSize:'packSize' in v ? String(v.packSize) : '', source:'catalog',
      icon:v.icon, imageDataUrl:'', isTemplate:true, sku:'', category:v.category, unit:v.unit,
      pricePaise:0, costPaise:0, taxBps:0,
      active:false, createdAt:now, updatedAt:now,
    }));
    if(toAdd.length) await db.products.bulkAdd(toAdd);
    return toAdd.length;
  });
}
export async function addKeralaVegetablePresets(): Promise<number> {
  return addProductPresets('vegetables');
}
