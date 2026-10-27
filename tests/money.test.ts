import {describe,expect,it} from 'vitest';
import {calculateQuote,rupeeToPaise,unitsToMilli} from '../src/lib/money';
import type {Product} from '../src/types/models';
const product:Product={id:'p1',name:'Rice',sku:'',category:'',unit:'kg',pricePaise:10000,costPaise:7000,taxBps:500,active:true,createdAt:'2026-01-01',updatedAt:'2026-01-01'};
describe('integer money and sale quantities',()=>{
  it('parses currency exactly',()=>{expect(rupeeToPaise('10.05')).toBe(1005);expect(rupeeToPaise('0.1')).toBe(10);expect(()=>rupeeToPaise('-1')).toThrow();expect(()=>rupeeToPaise('1.001')).toThrow()});
  it('parses fractional quantities to milliunits',()=>{expect(unitsToMilli('1.125')).toBe(1125);expect(()=>unitsToMilli('1.9999')).toThrow()});
  it('calculates fixed paise with tax and discount',()=>{
    const q=calculateQuote([{productId:'p1',quantityMilli:1500}],[product],1000);
    expect(q.subtotalPaise).toBe(15000);
    expect(q.taxPaise).toBe(700);
    expect(q.totalPaise).toBe(14700);
  });
  it('allows selling any positive quantity without a tracked inventory',()=>{
    const q=calculateQuote([{productId:'p1',quantityMilli:150000}],[product],0);
    expect(q.items[0].quantityMilli).toBe(150000);
    expect(q.subtotalPaise).toBe(1500000);
  });
  it('rejects duplicate cart entries and excessive discounts',()=>{
    expect(()=>calculateQuote([{productId:'p1',quantityMilli:1000},{productId:'p1',quantityMilli:1000}],[product],0)).toThrow(/Duplicate/);
    expect(()=>calculateQuote([{productId:'p1',quantityMilli:1000}],[product],20000)).toThrow(/Discount/);
  });
});
