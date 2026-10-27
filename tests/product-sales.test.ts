import 'fake-indexeddb/auto';
import {beforeEach,describe,expect,it} from 'vitest';
import {db} from '../src/db/database';
import {initShop,saveProduct} from '../src/services/store';
import {importProductCsv,PRODUCT_CSV_HEADER} from '../src/services/catalog-import';

const input={name:'Rice',malayalamName:'',englishName:'Rice',brand:'',packSize:'',icon:'📦',imageDataUrl:'',sku:'',category:'Foods',unit:'kg' as const,price:'40',cost:'25',tax:'0'};
beforeEach(async()=>{await db.delete();await db.open();await initShop();});
describe('product records without inventory management',()=>{
  it('creates and edits a product with no stock inputs',async()=>{
    await saveProduct(input);
    const product=(await db.products.toCollection().first())!;
    expect(product.pricePaise).toBe(4000);
    expect(Object.keys(product)).not.toContain('stockMilli');
    expect(Object.keys(product)).not.toContain('lowStockMilli');
    await saveProduct({...input,id:product.id,price:'45'});
    expect((await db.products.get(product.id))?.pricePaise).toBe(4500);
    expect(await db.stockMovements.count()).toBe(0);
  });
  it('keeps legacy phone fields untouched when editing an old product',async()=>{
    await saveProduct(input);
    const product=(await db.products.toCollection().first())!;
    await db.products.update(product.id, {stockMilli:8000,lowStockMilli:2000} as never);
    await saveProduct({...input,id:product.id,price:'50'});
    const saved=await db.products.get(product.id) as unknown as {stockMilli:number;lowStockMilli:number};
    expect(saved.stockMilli).toBe(8000);
    expect(saved.lowStockMilli).toBe(2000);
    expect(await db.stockMovements.count()).toBe(0);
  });
  it('imports modern CSV without an inventory column',async()=>{
    const csv=PRODUCT_CSV_HEADER+'\nപഴം,Apple,Fruits,kg,50,🍎,,\n';
    const file=new File([csv],'products.csv',{type:'text/csv'});
    const count=await importProductCsv(file);
    expect(count).toBe(1);
    expect((await db.products.toCollection().first())?.pricePaise).toBe(5000);
  });
  it('accepts old CSV headers but ignores their inventory column',async()=>{
    const csv='malayalamName,englishName,category,unit,price,stock,icon,brand,packSize\nഅരി,Rice,Foods,kg,40,250,📦,,\n';
    await importProductCsv(new File([csv],'old-products.csv',{type:'text/csv'}));
    const product=(await db.products.toCollection().first())!;
    expect(product.pricePaise).toBe(4000);
    expect(Object.keys(product)).not.toContain('stockMilli');
    expect(await db.stockMovements.count()).toBe(0);
  });
});
