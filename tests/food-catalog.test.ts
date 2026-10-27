import { describe, expect, it } from 'vitest';
import { KERALA_FRUITS, KERALA_FOODS } from '@/lib/food-catalog';
import { KERALA_VEGETABLES } from '@/lib/vegetables';
import { parseCsv, PRODUCT_CSV_HEADER } from '@/services/catalog-import';

describe('Kerala ready-made catalogs',()=>{
  it('provides bilingual names, icons and unique IDs for all 350 items',()=>{
    expect(KERALA_VEGETABLES).toHaveLength(50);
    expect(KERALA_FRUITS).toHaveLength(60);
    expect(KERALA_FOODS).toHaveLength(240);
    const all=[...KERALA_FRUITS,...KERALA_FOODS];
    expect(new Set([...all.map(x=>x.id),...KERALA_VEGETABLES.map(x=>x.id)]).size).toBe(350);
    for(const item of all){expect(item.malayalamName.length).toBeGreaterThan(0);expect(item.englishName.length).toBeGreaterThan(0);expect(item.icon.length).toBeGreaterThan(0);}
  });
});
describe('local CSV parser',()=>{
  it('supports Malayalam and quoted comma/newline fields',()=>{
    const rows=parseCsv('malayalamName,englishName\r\n"മാങ്ങ, നല്ലത്","Mango\nripe"\r\n');
    expect(rows).toEqual([['malayalamName','englishName'],['മാങ്ങ, നല്ലത്','Mango\nripe']]);
    expect(PRODUCT_CSV_HEADER.split(',')).toHaveLength(7);
  });
  it('rejects incomplete quoted fields',()=>{expect(()=>parseCsv('"broken')).toThrow();});
});
