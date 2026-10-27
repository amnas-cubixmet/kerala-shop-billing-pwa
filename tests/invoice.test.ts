import 'fake-indexeddb/auto';
import {beforeEach,describe,expect,it} from 'vitest';
import {db} from '../src/db/database';
import {initShop,saveInvoice,voidInvoice} from '../src/services/store';
import type {Product} from '../src/types/models';
const product:Product={id:'rice',name:'Rice',sku:'R1',category:'Foods',unit:'kg',pricePaise:10000,costPaise:5000,taxBps:0,active:true,createdAt:'2026-01-01',updatedAt:'2026-01-01'};
beforeEach(async()=>{
  await db.delete();await db.open();await initShop();
  await db.products.add({...product});
});
describe('sale-only accounting',()=>{
  it('saves a sale, invoice lines and sequential counter',async()=>{
    const sale=await saveInvoice({cart:[{productId:'rice',quantityMilli:1000}],discount:'0',paymentMethod:'cash'});
    expect(sale.totalPaise).toBe(10000);
    expect(await db.invoiceItems.where('invoiceId').equals(sale.id).count()).toBe(1);
    expect((await db.counters.toArray())[0].nextNumber).toBe(2);
    expect(await db.stockMovements.count()).toBe(0);
  });
  it('records sales without customer details',async()=>{
    await db.customers.add({id:'legacy-customer',name:'Old Customer',phone:'',createdAt:'2026-01-01'});
    const sale=await saveInvoice({cart:[{productId:'rice',quantityMilli:1000}],discount:'0',paymentMethod:'upi'});
    expect(sale.customerId).toBeNull();
    expect(sale.customerName).toBe('');
    expect(sale.paidPaise).toBe(sale.totalPaise);
    expect(await db.customers.count()).toBe(1);
  });
  it('accepts large sales without an inventory prerequisite',async()=>{
    const sale=await saveInvoice({cart:[{productId:'rice',quantityMilli:250000}],discount:'0',paymentMethod:'cash'});
    expect(sale.totalPaise).toBe(2500000);
    expect(await db.invoiceItems.where('invoiceId').equals(sale.id).count()).toBe(1);
    expect(await db.stockMovements.count()).toBe(0);
  });
  it('rejects missing products without changing invoices or counter',async()=>{
    await expect(saveInvoice({cart:[{productId:'missing',quantityMilli:1000}],discount:'0',paymentMethod:'cash'})).rejects.toThrow();
    expect(await db.invoices.count()).toBe(0);
    expect(await db.counters.count()).toBe(0);
  });
  it('cancels a sale once, preserving its historical invoice and line items',async()=>{
    const sale=await saveInvoice({cart:[{productId:'rice',quantityMilli:2500}],discount:'0',paymentMethod:'upi'});
    await voidInvoice(sale.id);
    expect((await db.invoices.get(sale.id))?.status).toBe('void');
    expect(await db.invoiceItems.where('invoiceId').equals(sale.id).count()).toBe(1);
    expect(await db.stockMovements.count()).toBe(0);
    await expect(voidInvoice(sale.id)).rejects.toThrow();
  });
});
