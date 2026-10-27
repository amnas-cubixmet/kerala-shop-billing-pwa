import 'fake-indexeddb/auto';
import {beforeEach,describe,expect,it} from 'vitest';
import {db} from '../src/db/database';
import {addSelectedCatalogProducts,allProductPresets,initShop,saveProduct} from '../src/services/store';
import {isShopProduct} from '../src/lib/shop-products';
beforeEach(async()=>{await db.delete();await db.open();await initShop();});
describe('select catalog products for one shop',()=>{
  it('keeps all 850 suggestions without auto importing to IndexedDB',async()=>{
    const catalog=allProductPresets();
    expect(catalog).toHaveLength(850);
    expect(new Set(catalog.map(p=>p.id)).size).toBe(850);
    expect(await db.products.count()).toBe(0);
  });
  it('adds only individually selected products, keeping their picture IDs and Malayalam/English names',async()=>{
    const [a,b]=allProductPresets();
    expect(await addSelectedCatalogProducts([a.id,b.id,a.id])).toBe(2);
    expect(await db.products.count()).toBe(2);
    const product=(await db.products.get(a.id))!;
    expect(product.source).toBe('catalog');
    expect(product.isTemplate).toBe(false);
    expect(product.active).toBe(false);
    expect(product.pricePaise).toBe(0);
    expect(product.malayalamName).toBeTruthy();
    expect(product.englishName).toBeTruthy();
    expect(isShopProduct(product)).toBe(true);
  });
  it('does not duplicate products when selected again',async()=>{
    const p=allProductPresets()[3];
    expect(await addSelectedCatalogProducts([p.id])).toBe(1);
    expect(await addSelectedCatalogProducts([p.id])).toBe(0);
    expect(await db.products.count()).toBe(1);
  });
  it('lets a shopkeeper price an added suggestion in a single language, enabling billing',async()=>{
    const p=allProductPresets()[0];
    await addSelectedCatalogProducts([p.id]);
    await saveProduct({
      id:p.id, name:p.malayalamName, malayalamName:p.malayalamName, englishName:'',
      brand:'',packSize:'',icon:p.icon,imageDataUrl:'',sku:'',
      category:p.category,unit:p.unit,price:'50',cost:'0',tax:'0',
    });
    const product=(await db.products.get(p.id))!;
    expect(product.pricePaise).toBe(5000);
    expect(product.active).toBe(true);
    expect(product.malayalamName).toBe(p.malayalamName);
    expect(product.englishName).toBe('');
  });
  it('can select an old unused template without overwriting its saved details',async()=>{
    const p=allProductPresets()[2];
    await db.products.add({
      id:p.id,name:p.englishName,malayalamName:p.malayalamName,englishName:p.englishName,
      source:'catalog',isTemplate:true,brand:'',packSize:'',icon:p.icon,
      imageDataUrl:'',sku:'',category:p.category,unit:p.unit,
      pricePaise:0,costPaise:0,taxBps:0,active:false,
      createdAt:'2025-01-01',updatedAt:'2025-01-01',
    });
    expect(await addSelectedCatalogProducts([p.id])).toBe(1);
    const item=(await db.products.get(p.id))!;
    expect(item.isTemplate).toBe(false);
    expect(item.createdAt).toBe('2025-01-01');
    expect(await db.products.count()).toBe(1);
  });
  it('rejects invalid IDs without modifying the shop database',async()=>{
    const p=allProductPresets()[0];
    await expect(addSelectedCatalogProducts([p.id,'unknown-product-id'])).rejects.toThrow();
    expect(await db.products.count()).toBe(0);
  });
});
