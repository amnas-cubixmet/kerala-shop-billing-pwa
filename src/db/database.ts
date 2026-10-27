import Dexie, { type Table } from 'dexie';
import type { Shop, Product, Customer, Invoice, InvoiceItem, StockMovement, Expense, Counter } from '@/types/models';

class ShopDatabase extends Dexie {
  shops!: Table<Shop, string>;
  products!: Table<Product, string>;
  customers!: Table<Customer, string>;
  invoices!: Table<Invoice, string>;
  invoiceItems!: Table<InvoiceItem, string>;
  stockMovements!: Table<StockMovement, string>;
  expenses!: Table<Expense, string>;
  counters!: Table<Counter, string>;

  constructor() {
    super('FreeShopBillingDB');
    this.version(1).stores({
      shops: 'id',
      products: 'id, name, sku, category, active',
      customers: 'id, name, phone',
      invoices: 'id, &number, date, status, customerId',
      invoiceItems: 'id, invoiceId, productId',
      stockMovements: 'id, productId, reason, date',
      expenses: 'id, date, category',
      counters: 'id',
    });
  }
}
export const db = new ShopDatabase();
export const ALL_TABLES = [db.shops, db.products, db.customers, db.invoices, db.invoiceItems, db.stockMovements, db.expenses, db.counters] as const;
