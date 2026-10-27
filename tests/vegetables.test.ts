import { describe, expect, it } from 'vitest';
import { KERALA_VEGETABLES } from '@/lib/vegetables';

describe('Kerala vegetable presets', () => {
  it('contains exactly 50 distinct Malayalam/English products', () => {
    expect(KERALA_VEGETABLES).toHaveLength(50);
    expect(new Set(KERALA_VEGETABLES.map(v => v.id)).size).toBe(50);
    expect(new Set(KERALA_VEGETABLES.map(v => v.name)).size).toBe(50);
    for (const item of KERALA_VEGETABLES) {
      expect(item.name).toContain(' / ');
      expect(item.icon.length).toBeGreaterThan(0);
      expect(['kg','pcs','bundle']).toContain(item.unit);
    }
  });
});
