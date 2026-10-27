import { db } from '@/db/database';
import type { Shop, Product, Customer, Invoice, InvoiceItem, StockMovement, Expense, Counter } from '@/types/models';

const BACKUP_VERSION = 1;
const MAX_IMPORT_BYTES = 30 * 1024 * 1024;
const arrayNames = ['shops','products','customers','invoices','invoiceItems','stockMovements','expenses','counters'] as const;
type Data = {
  shops: Shop[]; products: Product[]; customers: Customer[];
  invoices: Invoice[]; invoiceItems: InvoiceItem[];
  stockMovements: StockMovement[]; expenses: Expense[]; counters: Counter[];
};
interface BackupEnvelope { app: 'FreeShopBilling'; version: number; exportedAt: string; data: Data; sha256: string; }
async function digest(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash)).map(x => x.toString(16).padStart(2, '0')).join('');
}
function download(name: string, text: string) {
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
export async function exportBackup(): Promise<void> {
  // Single readonly snapshot transaction. Do NOT call crypto inside Dexie transaction.
  const data = await db.transaction('r', [db.shops, db.products, db.customers, db.invoices, db.invoiceItems, db.stockMovements, db.expenses, db.counters], async (): Promise<Data> => ({
    shops: await db.shops.toArray(), products: await db.products.toArray(),
    customers: await db.customers.toArray(), invoices: await db.invoices.toArray(),
    invoiceItems: await db.invoiceItems.toArray(), stockMovements: await db.stockMovements.toArray(),
    expenses: await db.expenses.toArray(), counters: await db.counters.toArray(),
  }));
  const core = { app: 'FreeShopBilling' as const, version: BACKUP_VERSION, exportedAt: new Date().toISOString(), data };
  const sha256 = await digest(JSON.stringify(core));
  const backup: BackupEnvelope = { ...core, sha256 };
  download(`shop-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(backup));
}
function validateData(data: unknown): asserts data is Data {
  if (!data || typeof data !== 'object') throw new Error('Missing backup data.');
  const obj = data as Record<string, unknown>;
  for (const key of arrayNames) {
    if (!Array.isArray(obj[key])) throw new Error(`Missing or invalid ${key} records.`);
    if ((obj[key] as unknown[]).some(row => !row || typeof row !== 'object' || typeof (row as {id?:unknown}).id !== 'string')) {
      throw new Error(`Invalid ${key} IDs.`);
    }
    const ids = (obj[key] as {id:string}[]).map(row => row.id);
    if (new Set(ids).size !== ids.length) throw new Error(`Duplicate ${key} IDs.`);
  }
  if ((obj.shops as unknown[]).length !== 1) throw new Error('Backup must have exactly one shop.');
  const products = obj.products as Product[];
  if (products.some(p => !p.name || !Number.isSafeInteger(p.pricePaise) || p.pricePaise < 0 || !Number.isSafeInteger(p.stockMilli) || p.stockMilli < 0)) throw new Error('Invalid products.');
  const invoices = obj.invoices as Invoice[];
  if (invoices.some(i => !i.number || !Number.isSafeInteger(i.totalPaise) || i.totalPaise < 0 || !['final','void'].includes(i.status))) throw new Error('Invalid invoices.');
  const invoiceIds = new Set(invoices.map(i => i.id));
  if ((obj.invoiceItems as InvoiceItem[]).some(i => !invoiceIds.has(i.invoiceId))) throw new Error('Orphaned invoice items.');
  const invoiceNumbers = invoices.map(i => i.number);
  if (new Set(invoiceNumbers).size !== invoiceNumbers.length) throw new Error('Duplicate invoice numbers.');
  if ((obj.expenses as Expense[]).some(e => !Number.isSafeInteger(e.amountPaise) || e.amountPaise <= 0)) throw new Error('Invalid expenses.');
}
export async function importBackup(file: File): Promise<{ products: number; invoices: number }> {
  if (file.size > MAX_IMPORT_BYTES) throw new Error('Backup exceeds 30 MB.');
  let raw: unknown;
  try { raw = JSON.parse(await file.text()); } catch { throw new Error('Invalid JSON backup file.'); }
  if (!raw || typeof raw !== 'object') throw new Error('Invalid backup.');
  const backup = raw as Partial<BackupEnvelope>;
  if (backup.app !== 'FreeShopBilling' || backup.version !== BACKUP_VERSION || typeof backup.exportedAt !== 'string' || typeof backup.sha256 !== 'string') {
    throw new Error('Unsupported backup format/version.');
  }
  validateData(backup.data);
  const { app, version, exportedAt, data, sha256 } = backup as BackupEnvelope;
  if (await digest(JSON.stringify({ app, version, exportedAt, data })) !== sha256) throw new Error('Backup checksum mismatch.');
  // All tables replaced atomically, including invoice counter. The calling UI requires explicit approval.
  await db.transaction('rw', [db.shops, db.products, db.customers, db.invoices, db.invoiceItems, db.stockMovements, db.expenses, db.counters], async () => {
    await db.shops.clear(); await db.products.clear(); await db.customers.clear();
    await db.invoices.clear(); await db.invoiceItems.clear(); await db.stockMovements.clear();
    await db.expenses.clear(); await db.counters.clear();
    await db.shops.bulkAdd(data.shops); await db.products.bulkAdd(data.products);
    await db.customers.bulkAdd(data.customers); await db.invoices.bulkAdd(data.invoices);
    await db.invoiceItems.bulkAdd(data.invoiceItems); await db.stockMovements.bulkAdd(data.stockMovements);
    await db.expenses.bulkAdd(data.expenses); await db.counters.bulkAdd(data.counters);
  });
  return { products: data.products.length, invoices: data.invoices.length };
}
