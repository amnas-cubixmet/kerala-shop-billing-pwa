import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {join} from 'node:path';
import {getCatalogPhoto} from '../src/lib/catalog-image-map';

/** 63 product crops from the supplied 9x7 image (Sheet 1 of 15). */
const paths = [
  "public/products/bakery/kerala-food-122.webp",
  "public/products/bakery/kerala-food-125.webp",
  "public/products/foods/kerala-food-004.webp",
  "public/products/foods/kerala-food-018.webp",
  "public/products/foods/kerala-food-025.webp",
  "public/products/foods/kerala-food-027.webp",
  "public/products/foods/kerala-food-030.webp",
  "public/products/foods/kerala-food-032.webp",
  "public/products/foods/kerala-food-033.webp",
  "public/products/foods/kerala-food-036.webp",
  "public/products/foods/kerala-food-042.webp",
  "public/products/foods/kerala-food-047.webp",
  "public/products/foods/kerala-food-049.webp",
  "public/products/foods/kerala-food-050.webp",
  "public/products/foods/kerala-food-057.webp",
  "public/products/foods/kerala-food-058.webp",
  "public/products/foods/kerala-food-059.webp",
  "public/products/foods/kerala-food-153.webp",
  "public/products/foods/kerala-food-155.webp",
  "public/products/foods/kerala-food-156.webp",
  "public/products/foods/kerala-food-160.webp",
  "public/products/foods/kerala-food-190.webp",
  "public/products/fruits/kerala-fruit-004.webp",
  "public/products/fruits/kerala-fruit-007.webp",
  "public/products/fruits/kerala-fruit-008.webp",
  "public/products/fruits/kerala-fruit-011.webp",
  "public/products/fruits/kerala-fruit-013.webp",
  "public/products/fruits/kerala-fruit-015.webp",
  "public/products/fruits/kerala-fruit-016.webp",
  "public/products/fruits/kerala-fruit-017.webp",
  "public/products/fruits/kerala-fruit-018.webp",
  "public/products/fruits/kerala-fruit-019.webp",
  "public/products/fruits/kerala-fruit-021.webp",
  "public/products/fruits/kerala-fruit-023.webp",
  "public/products/fruits/kerala-fruit-027.webp",
  "public/products/fruits/kerala-fruit-029.webp",
  "public/products/fruits/kerala-fruit-030.webp",
  "public/products/fruits/kerala-fruit-051.webp",
  "public/products/vegetables/kerala-veg-001.webp",
  "public/products/vegetables/kerala-veg-002.webp",
  "public/products/vegetables/kerala-veg-004.webp",
  "public/products/vegetables/kerala-veg-005.webp",
  "public/products/vegetables/kerala-veg-006.webp",
  "public/products/vegetables/kerala-veg-007.webp",
  "public/products/vegetables/kerala-veg-008.webp",
  "public/products/vegetables/kerala-veg-009.webp",
  "public/products/vegetables/kerala-veg-010.webp",
  "public/products/vegetables/kerala-veg-011.webp",
  "public/products/vegetables/kerala-veg-012.webp",
  "public/products/vegetables/kerala-veg-013.webp",
  "public/products/vegetables/kerala-veg-017.webp",
  "public/products/vegetables/kerala-veg-022.webp",
  "public/products/vegetables/kerala-veg-025.webp",
  "public/products/vegetables/kerala-veg-032.webp",
  "public/products/vegetables/kerala-veg-033.webp",
  "public/products/vegetables/kerala-veg-035.webp",
  "public/products/vegetables/kerala-veg-036.webp",
  "public/products/vegetables/kerala-veg-037.webp",
  "public/products/vegetables/kerala-veg-039.webp",
  "public/products/vegetables/kerala-veg-040.webp",
  "public/products/vegetables/kerala-veg-044.webp",
  "public/products/vegetables/kerala-veg-045.webp",
  "public/products/vegetables/kerala-veg-050.webp"
];
const protectedHashes:Record<string,string>={
  'public/products/vegetables/kerala-veg-001.webp':'cf3b4d4d7b48be5226d52400f1112b8d34732f85e7d678fabeb192eb4bf1bbe7',
  'public/products/fruits/kerala-fruit-008.webp':'43004f055a46fd950ed790e886b770d4787578452a81c2fc1e8984fea7830889',
  'public/products/foods/kerala-food-042.webp':'1956f056d8074ec933a678c3d7566e3e13d98e87c82e42339fec08206ab547dd',
  'public/products/bakery/kerala-food-125.webp':'bf5a66e09078cc0bf122774da9d03ebbde6dc1f285eb74844c11cb7e5949ea8e',
};
describe('Sheet 1: 63 individual product photos at catalog paths',()=>{
  it('includes 63 separately named photos in correct directories',()=>{
    expect(paths).toHaveLength(63);
    expect(new Set(paths).size).toBe(63);
    for(const path of paths){
      const buf=readFileSync(join(process.cwd(),path));
      expect(buf.subarray(0,4).toString('ascii')).toBe('RIFF');
      expect(buf.subarray(8,12).toString('ascii')).toBe('WEBP');
      const id=path.split('/').at(-1)!.replace('.webp','');
      expect(getCatalogPhoto(id)).toBe('/'+path.replace(/^public\//,''));
    }
  });
  it('retains new photos when bundled default assets unpack',()=>{
    for(const [path,hash] of Object.entries(protectedHashes)){
      expect(createHash('sha256').update(readFileSync(join(process.cwd(),path))).digest('hex')).toBe(hash);
    }
  });
});
