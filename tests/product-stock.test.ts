import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import {db} from '../src/db/database';
import {initShop, saveProduct, setProductStock} from '../src/services/store';
beforeEach(async()=>{
  await db.delete(); await db.open(); await initShop();
  await saveProduct({
    name:'Rice',malayalamName:'',englishName:'Rice',brand:'',packSize:'',icon:'📦',
    imageDataUrl:'',sku:'',category:'Foods',unit:'kg',price:'40',cost:'25',
    tax:'0',stock:'',lowStock:'5'
  });
});
describe('separate stock management',()=>{
  it('creates a product without stock and lets shopkeeper adjust it',async()=>{
    const p=(await db.products.toCollection().first())!;
    expect(p.stockMilli).toBe(0);
    await setProductStock(p.id,'12.5');
    expect((await db.products.get(p.id))?.stockMilli).toBe(12500);
    const movements=await db.stockMovements.where('productId').equals(p.id).toArray();
    expect(movements).toHaveLength(1);
    expect(movements[0].changeMilli).toBe(12500);
  });
  it('editing details without stock keeps existing quantity',async()=>{
    const p=(await db.products.toCollection().first())!;
    await setProductStock(p.id,'8');
    await saveProduct({
      id:p.id,name:'Rice',malayalamName:'',englishName:'Rice',brand:'',
      packSize:'',icon:'📦',imageDataUrl:'',sku:'',category:'Foods',
      unit:'kg',price:'45',cost:'25',tax:'0',stock:'',lowStock:'5'
    });
    expect((await db.products.get(p.id))?.stockMilli).toBe(8000);
  });
  it('rejects negative or excess-precision quantities',async()=>{
    const p=(await db.products.toCollection().first())!;
    await expect(setProductStock(p.id,'-5')).rejects.toThrow();
    await expect(setProductStock(p.id,'2.1234')).rejects.toThrow();
    expect((await db.products.get(p.id))?.stockMilli).toBe(0);
  });
});
