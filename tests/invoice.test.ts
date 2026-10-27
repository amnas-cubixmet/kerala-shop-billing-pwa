import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../src/db/database';
import { initShop, saveInvoice, voidInvoice } from '../src/services/store';
import type { Product } from '../src/types/models';
const product: Product = { id:'rice',name:'Rice',sku:'R1',category:'',unit:'kg',pricePaise:10000,costPaise:5000,taxBps:0,stockMilli:5000,lowStockMilli:1000,active:true,createdAt:'2026-01-01',updatedAt:'2026-01-01' };
beforeEach(async()=>{
  await db.delete();await db.open();await initShop();await db.products.add({...product});
});
describe('billing transactions',()=>{
  it('saves sale, lines, stock changes and counter',async()=>{
    const sale=await saveInvoice({cart:[{productId:'rice',quantityMilli:1000}],discount:'0',paymentMethod:'cash'});
    expect(sale.totalPaise).toBe(10000);
    expect((await db.products.get('rice'))?.stockMilli).toBe(4000);
    expect(await db.invoiceItems.where('invoiceId').equals(sale.id).count()).toBe(1);
    expect((await db.counters.toArray())[0].nextNumber).toBe(2);
  });
  it('records a sale without creating or linking a customer',async()=>{
    await db.customers.add({id:'legacy-customer',name:'Old Customer',phone:'',createdAt:'2026-01-01'});
    const sale=await saveInvoice({cart:[{productId:'rice',quantityMilli:1000}],discount:'0',paymentMethod:'upi'});
    expect(sale.customerId).toBeNull();
    expect(sale.customerName).toBe('');
    expect(sale.paidPaise).toBe(sale.totalPaise);
    expect(await db.customers.count()).toBe(1);
  });
  it('rejects overselling without creating an invoice',async()=>{
    await expect(saveInvoice({cart:[{productId:'rice',quantityMilli:10000}],discount:'0',paymentMethod:'cash'})).rejects.toThrow(/stock/);
    expect(await db.invoices.count()).toBe(0);
    expect((await db.products.get('rice'))?.stockMilli).toBe(5000);
  });
  it('voids an invoice once and restores stock',async()=>{
    const sale=await saveInvoice({cart:[{productId:'rice',quantityMilli:2500}],discount:'0',paymentMethod:'upi'});
    await voidInvoice(sale.id);
    expect((await db.products.get('rice'))?.stockMilli).toBe(5000);
    expect((await db.invoices.get(sale.id))?.status).toBe('void');
    await expect(voidInvoice(sale.id)).rejects.toThrow();
    expect((await db.products.get('rice'))?.stockMilli).toBe(5000);
  });
});
