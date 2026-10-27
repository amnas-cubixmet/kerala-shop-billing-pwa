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
    'public/products/vegetables/kerala-veg-001.webp':'7a66ff4574906593de1fd6ba8758ce6bcb0750ad6dbd4a5b3349113ebfddde0b',
  'public/products/vegetables/kerala-veg-002.webp':'dccd809fded7da9d60b80253d18c5471f493e939f91e26799510454c6f05abf9',
  'public/products/vegetables/kerala-veg-003.webp':'84df771d2937a472572ce593b258d73bcfc3acd6fbdbf7324bb7ee4eb38091b3',
  'public/products/vegetables/kerala-veg-004.webp':'0e1b75b11d3ac9e889322f2f9feb289be334c9162e6ee1c9472e5d387e8647a2',
  'public/products/vegetables/kerala-veg-005.webp':'3428436527d43cd0af7d2e3ddc070615f91544ae40551d529608ae7deac7f607',
  'public/products/vegetables/kerala-veg-006.webp':'9d5464aa77adf63d55c51e862d6eb87c6bd5a57e4f41053084f8e2edf4a04fa7',
  'public/products/vegetables/kerala-veg-007.webp':'578a374e0766a6fc7189cfc338d87d46297afa32d6dc59638a942482e960711a',
  'public/products/vegetables/kerala-veg-008.webp':'e403f50831eae4b9def07e144e3d51f8846268296109a22c7094f1b7bc7f43d4',
  'public/products/vegetables/kerala-veg-009.webp':'e8b9feea7836381ef00604887fdb324ff73e591fb37022061c31a6ca8771cb6c',
  'public/products/vegetables/kerala-veg-010.webp':'c478e051a71ab1291021c5c0fb71eb055c4d8a105c0b8ff8f91a91435982f784',
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
  it('retains all ten updated studio vegetable photos when bundled default assets unpack',()=>{
    for(const [path,hash] of Object.entries(protectedHashes)){
      expect(createHash('sha256').update(readFileSync(join(process.cwd(),path))).digest('hex')).toBe(hash);
    }
  });
});
