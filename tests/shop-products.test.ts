import {describe,it,expect} from 'vitest';
import {isShopProduct} from '../src/lib/shop-products';

describe('shop product visibility',()=>{
  it('hides unused ready-made category templates',()=>{
    expect(isShopProduct({source:'catalog',isTemplate:true})).toBe(false);
  });
  it('keeps previously edited catalog products without losing data',()=>{
    expect(isShopProduct({source:'catalog',isTemplate:false})).toBe(true);
  });
  it('keeps all individually added and legacy shop products',()=>{
    expect(isShopProduct({source:'custom',isTemplate:false})).toBe(true);
    expect(isShopProduct({source:'custom',isTemplate:true})).toBe(true);
    expect(isShopProduct({source:undefined,isTemplate:undefined})).toBe(true);
  });
});
