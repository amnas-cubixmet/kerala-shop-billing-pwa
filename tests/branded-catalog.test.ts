import { describe, expect, it } from 'vitest';
import { KERALA_BRANDED_PRESETS } from '../src/lib/branded-catalog';

describe('Kerala bakery and brand starter catalog', () => {
  it('includes 500 uniquely identified additional product templates', () => {
    expect(KERALA_BRANDED_PRESETS).toHaveLength(500);
    expect(new Set(KERALA_BRANDED_PRESETS.map(p => p.id)).size).toBe(500);
  });
  it('contains distinct bakery, sweets and branded catalog groups', () => {
    const count = (prefix:string) => KERALA_BRANDED_PRESETS.filter(p=>p.category.startsWith(prefix)).length;
    expect(count('Bakery')).toBe(120);
    expect(count('Sweets')).toBe(100);
    expect(count('Branded Snacks')).toBe(110);
    expect(count('Branded Grocery')).toBe(170);
  });
  it('all templates support bilingual search and brand/pack metadata', () => {
    for (const p of KERALA_BRANDED_PRESETS) {
      expect(p.malayalamName.length).toBeGreaterThan(0);
      expect(p.englishName.length).toBeGreaterThan(0);
      expect(p.brand.length).toBeGreaterThan(0);
      expect(p.packSize.length).toBeGreaterThan(0);
      expect(['kg','pcs','bundle','ltr','m']).toContain(p.unit);
    }
  });
});
