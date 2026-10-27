import {describe,expect,it} from 'vitest';
import {existsSync} from 'node:fs';
import {join} from 'node:path';
import {CATALOG_IMAGES,getCatalogPhoto} from '../src/lib/catalog-image-map';
import {KERALA_VEGETABLES} from '../src/lib/vegetables';
import {KERALA_FRUITS,KERALA_FOODS} from '../src/lib/food-catalog';
import {KERALA_BRANDED_PRESETS} from '../src/lib/branded-catalog';

describe('product photo library',()=>{
 it('provides one image file for each of the 850 starter product IDs',()=>{
  const expected=[...KERALA_VEGETABLES,...KERALA_FRUITS,...KERALA_FOODS,...KERALA_BRANDED_PRESETS];
  expect(expected).toHaveLength(850);
  expect(Object.keys(CATALOG_IMAGES)).toHaveLength(850);
  for(const item of expected){
   const filename=getCatalogPhoto(item.id);
   expect(filename).toMatch(/^\/products\/(vegetables|fruits|foods|bakery|sweets|brands)\/.*\.webp$/);
   expect(existsSync(join(process.cwd(),'public',filename!.slice(1)))).toBe(true);
  }
 });
});
