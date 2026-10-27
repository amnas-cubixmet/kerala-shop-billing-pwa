import type { Unit } from '@/types/models';

export interface BrandedPreset { id:string; malayalamName:string; englishName:string; icon:string; unit:Unit; category:string; brand:string; packSize:string; }
/** Offline product-family suggestions. They are not verified retail SKUs. Confirm exact label, pack weight, GST and barcode at shop. */
export const KERALA_BRANDED_PRESETS: ReadonlyArray<BrandedPreset> = [
  {
    "id": "kerala-v5-bakery-001-single",
    "malayalamName": "ബ്രെഡ് — ഒറ്റ എണ്ണം",
    "englishName": "Bread — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-001-pack",
    "malayalamName": "ബ്രെഡ് — പാക്കറ്റ്",
    "englishName": "Bread — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-002-single",
    "malayalamName": "പാൽ ബ്രെഡ് — ഒറ്റ എണ്ണം",
    "englishName": "Milk Bread — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-002-pack",
    "malayalamName": "പാൽ ബ്രെഡ് — പാക്കറ്റ്",
    "englishName": "Milk Bread — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-003-single",
    "malayalamName": "ഗോതമ്പ് ബ്രെഡ് — ഒറ്റ എണ്ണം",
    "englishName": "Wheat Bread — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-003-pack",
    "malayalamName": "ഗോതമ്പ് ബ്രെഡ് — പാക്കറ്റ്",
    "englishName": "Wheat Bread — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-004-single",
    "malayalamName": "മൾട്ടിഗ്രെയിൻ ബ്രെഡ് — ഒറ്റ എണ്ണം",
    "englishName": "Multigrain Bread — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-004-pack",
    "malayalamName": "മൾട്ടിഗ്രെയിൻ ബ്രെഡ് — പാക്കറ്റ്",
    "englishName": "Multigrain Bread — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-005-single",
    "malayalamName": "സാൻഡ്‌വിച്ച് ബ്രെഡ് — ഒറ്റ എണ്ണം",
    "englishName": "Sandwich Bread — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-005-pack",
    "malayalamName": "സാൻഡ്‌വിച്ച് ബ്രെഡ് — പാക്കറ്റ്",
    "englishName": "Sandwich Bread — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-006-single",
    "malayalamName": "ബൺ — ഒറ്റ എണ്ണം",
    "englishName": "Plain Bun — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥯",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-006-pack",
    "malayalamName": "ബൺ — പാക്കറ്റ്",
    "englishName": "Plain Bun — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥯",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-007-single",
    "malayalamName": "ക്രീം ബൺ — ഒറ്റ എണ്ണം",
    "englishName": "Cream Bun — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥯",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-007-pack",
    "malayalamName": "ക്രീം ബൺ — പാക്കറ്റ്",
    "englishName": "Cream Bun — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥯",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-008-single",
    "malayalamName": "കൊക്കനട്ട് ബൺ — ഒറ്റ എണ്ണം",
    "englishName": "Coconut Bun — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥯",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-008-pack",
    "malayalamName": "കൊക്കനട്ട് ബൺ — പാക്കറ്റ്",
    "englishName": "Coconut Bun — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥯",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-009-single",
    "malayalamName": "പാൽ ബൺ — ഒറ്റ എണ്ണം",
    "englishName": "Milk Bun — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥯",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-009-pack",
    "malayalamName": "പാൽ ബൺ — പാക്കറ്റ്",
    "englishName": "Milk Bun — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥯",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-010-single",
    "malayalamName": "ജാം ബൺ — ഒറ്റ എണ്ണം",
    "englishName": "Jam Bun — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥯",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-010-pack",
    "malayalamName": "ജാം ബൺ — പാക്കറ്റ്",
    "englishName": "Jam Bun — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥯",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-011-single",
    "malayalamName": "ദിൽഖുഷ് — ഒറ്റ എണ്ണം",
    "englishName": "Dilkush — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-011-pack",
    "malayalamName": "ദിൽഖുഷ് — പാക്കറ്റ്",
    "englishName": "Dilkush — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-012-single",
    "malayalamName": "മുട്ട പഫ്സ് — ഒറ്റ എണ്ണം",
    "englishName": "Egg Puff — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-012-pack",
    "malayalamName": "മുട്ട പഫ്സ് — പാക്കറ്റ്",
    "englishName": "Egg Puff — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-013-single",
    "malayalamName": "വെജ് പഫ്സ് — ഒറ്റ എണ്ണം",
    "englishName": "Veg Puff — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-013-pack",
    "malayalamName": "വെജ് പഫ്സ് — പാക്കറ്റ്",
    "englishName": "Veg Puff — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-014-single",
    "malayalamName": "ചിക്കൻ പഫ്സ് — ഒറ്റ എണ്ണം",
    "englishName": "Chicken Puff — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-014-pack",
    "malayalamName": "ചിക്കൻ പഫ്സ് — പാക്കറ്റ്",
    "englishName": "Chicken Puff — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-015-single",
    "malayalamName": "മീറ്റ് പഫ്സ് — ഒറ്റ എണ്ണം",
    "englishName": "Meat Puff — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-015-pack",
    "malayalamName": "മീറ്റ് പഫ്സ് — പാക്കറ്റ്",
    "englishName": "Meat Puff — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-016-single",
    "malayalamName": "മഷ്റൂം പഫ്സ് — ഒറ്റ എണ്ണം",
    "englishName": "Mushroom Puff — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-016-pack",
    "malayalamName": "മഷ്റൂം പഫ്സ് — പാക്കറ്റ്",
    "englishName": "Mushroom Puff — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-017-single",
    "malayalamName": "സമോസ — ഒറ്റ എണ്ണം",
    "englishName": "Samosa — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥟",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-017-pack",
    "malayalamName": "സമോസ — പാക്കറ്റ്",
    "englishName": "Samosa — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥟",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-018-single",
    "malayalamName": "വെജ് റോൾ — ഒറ്റ എണ്ണം",
    "englishName": "Veg Roll — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🌯",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-018-pack",
    "malayalamName": "വെജ് റോൾ — പാക്കറ്റ്",
    "englishName": "Veg Roll — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🌯",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-019-single",
    "malayalamName": "എഗ് റോൾ — ഒറ്റ എണ്ണം",
    "englishName": "Egg Roll — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🌯",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-019-pack",
    "malayalamName": "എഗ് റോൾ — പാക്കറ്റ്",
    "englishName": "Egg Roll — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🌯",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-020-single",
    "malayalamName": "ചിക്കൻ റോൾ — ഒറ്റ എണ്ണം",
    "englishName": "Chicken Roll — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🌯",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-020-pack",
    "malayalamName": "ചിക്കൻ റോൾ — പാക്കറ്റ്",
    "englishName": "Chicken Roll — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🌯",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-021-single",
    "malayalamName": "കട്ട്ലറ്റ് — ഒറ്റ എണ്ണം",
    "englishName": "Cutlet — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍘",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-021-pack",
    "malayalamName": "കട്ട്ലറ്റ് — പാക്കറ്റ്",
    "englishName": "Cutlet — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍘",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-022-single",
    "malayalamName": "ബ്രെഡ് റോൾ — ഒറ്റ എണ്ണം",
    "englishName": "Bread Roll — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥖",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-022-pack",
    "malayalamName": "ബ്രെഡ് റോൾ — പാക്കറ്റ്",
    "englishName": "Bread Roll — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥖",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-023-single",
    "malayalamName": "റസ്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Rusk — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-023-pack",
    "malayalamName": "റസ്ക് — പാക്കറ്റ്",
    "englishName": "Rusk — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-024-single",
    "malayalamName": "മിൽക്ക് റസ്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Milk Rusk — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-024-pack",
    "malayalamName": "മിൽക്ക് റസ്ക് — പാക്കറ്റ്",
    "englishName": "Milk Rusk — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-025-single",
    "malayalamName": "ടീ റസ്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Tea Rusk — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-025-pack",
    "malayalamName": "ടീ റസ്ക് — പാക്കറ്റ്",
    "englishName": "Tea Rusk — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-026-single",
    "malayalamName": "ബട്ടർ കുക്കി — ഒറ്റ എണ്ണം",
    "englishName": "Butter Cookie — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-026-pack",
    "malayalamName": "ബട്ടർ കുക്കി — പാക്കറ്റ്",
    "englishName": "Butter Cookie — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-027-single",
    "malayalamName": "കോക്കനട്ട് കുക്കി — ഒറ്റ എണ്ണം",
    "englishName": "Coconut Cookie — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-027-pack",
    "malayalamName": "കോക്കനട്ട് കുക്കി — പാക്കറ്റ്",
    "englishName": "Coconut Cookie — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-028-single",
    "malayalamName": "ചോക്കോ ചിപ്പ് കുക്കി — ഒറ്റ എണ്ണം",
    "englishName": "Choco Chip Cookie — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-028-pack",
    "malayalamName": "ചോക്കോ ചിപ്പ് കുക്കി — പാക്കറ്റ്",
    "englishName": "Choco Chip Cookie — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-029-single",
    "malayalamName": "ജീരക ബിസ്‌കറ്റ് — ഒറ്റ എണ്ണം",
    "englishName": "Jeera Biscuit — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-029-pack",
    "malayalamName": "ജീരക ബിസ്‌കറ്റ് — പാക്കറ്റ്",
    "englishName": "Jeera Biscuit — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-030-single",
    "malayalamName": "നങ്കട്ടായി — ഒറ്റ എണ്ണം",
    "englishName": "Nankhatai — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-030-pack",
    "malayalamName": "നങ്കട്ടായി — പാക്കറ്റ്",
    "englishName": "Nankhatai — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-031-single",
    "malayalamName": "ജാം ബിസ്‌കറ്റ് — ഒറ്റ എണ്ണം",
    "englishName": "Jam Biscuit — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-031-pack",
    "malayalamName": "ജാം ബിസ്‌കറ്റ് — പാക്കറ്റ്",
    "englishName": "Jam Biscuit — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-032-single",
    "malayalamName": "സാൾട്ട് ബിസ്‌കറ്റ് — ഒറ്റ എണ്ണം",
    "englishName": "Salt Biscuit — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-032-pack",
    "malayalamName": "സാൾട്ട് ബിസ്‌കറ്റ് — പാക്കറ്റ്",
    "englishName": "Salt Biscuit — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-033-single",
    "malayalamName": "മാർബിൾ കേക്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Marble Cake — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-033-pack",
    "malayalamName": "മാർബിൾ കേക്ക് — പാക്കറ്റ്",
    "englishName": "Marble Cake — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-034-single",
    "malayalamName": "പ്ലം കേക്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Plum Cake — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-034-pack",
    "malayalamName": "പ്ലം കേക്ക് — പാക്കറ്റ്",
    "englishName": "Plum Cake — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-035-single",
    "malayalamName": "ടീ കേക്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Tea Cake — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-035-pack",
    "malayalamName": "ടീ കേക്ക് — പാക്കറ്റ്",
    "englishName": "Tea Cake — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-036-single",
    "malayalamName": "വനില കേക്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Vanilla Cake — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-036-pack",
    "malayalamName": "വനില കേക്ക് — പാക്കറ്റ്",
    "englishName": "Vanilla Cake — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-037-single",
    "malayalamName": "ചോക്ലേറ്റ് കേക്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Chocolate Cake — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-037-pack",
    "malayalamName": "ചോക്ലേറ്റ് കേക്ക് — പാക്കറ്റ്",
    "englishName": "Chocolate Cake — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-038-single",
    "malayalamName": "ബട്ടർ കേക്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Butter Cake — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-038-pack",
    "malayalamName": "ബട്ടർ കേക്ക് — പാക്കറ്റ്",
    "englishName": "Butter Cake — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-039-single",
    "malayalamName": "കാരറ്റ് കേക്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Carrot Cake — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-039-pack",
    "malayalamName": "കാരറ്റ് കേക്ക് — പാക്കറ്റ്",
    "englishName": "Carrot Cake — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-040-single",
    "malayalamName": "പൈനാപ്പിൾ കേക്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Pineapple Cake — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-040-pack",
    "malayalamName": "പൈനാപ്പിൾ കേക്ക് — പാക്കറ്റ്",
    "englishName": "Pineapple Cake — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-041-single",
    "malayalamName": "ബ്ലാക്ക് ഫോറസ്റ്റ് — ഒറ്റ എണ്ണം",
    "englishName": "Black Forest Cake — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🎂",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-041-pack",
    "malayalamName": "ബ്ലാക്ക് ഫോറസ്റ്റ് — പാക്കറ്റ്",
    "englishName": "Black Forest Cake — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🎂",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-042-single",
    "malayalamName": "വൈറ്റ് ഫോറസ്റ്റ് — ഒറ്റ എണ്ണം",
    "englishName": "White Forest Cake — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🎂",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-042-pack",
    "malayalamName": "വൈറ്റ് ഫോറസ്റ്റ് — പാക്കറ്റ്",
    "englishName": "White Forest Cake — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🎂",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-043-single",
    "malayalamName": "റെഡ് വെൽവെറ്റ് കേക്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Red Velvet Cake — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🎂",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-043-pack",
    "malayalamName": "റെഡ് വെൽവെറ്റ് കേക്ക് — പാക്കറ്റ്",
    "englishName": "Red Velvet Cake — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🎂",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-044-single",
    "malayalamName": "ഫ്രൂട്ട് കേക്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Fruit Cake — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-044-pack",
    "malayalamName": "ഫ്രൂട്ട് കേക്ക് — പാക്കറ്റ്",
    "englishName": "Fruit Cake — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-045-single",
    "malayalamName": "സ്പോഞ്ച് കേക്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Sponge Cake — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-045-pack",
    "malayalamName": "സ്പോഞ്ച് കേക്ക് — പാക്കറ്റ്",
    "englishName": "Sponge Cake — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-046-single",
    "malayalamName": "കപ്പ് കേക്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Cupcake — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🧁",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-046-pack",
    "malayalamName": "കപ്പ് കേക്ക് — പാക്കറ്റ്",
    "englishName": "Cupcake — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🧁",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-047-single",
    "malayalamName": "മഫിൻ — ഒറ്റ എണ്ണം",
    "englishName": "Muffin — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🧁",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-047-pack",
    "malayalamName": "മഫിൻ — പാക്കറ്റ്",
    "englishName": "Muffin — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🧁",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-048-single",
    "malayalamName": "ബ്രൗണി — ഒറ്റ എണ്ണം",
    "englishName": "Brownie — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-048-pack",
    "malayalamName": "ബ്രൗണി — പാക്കറ്റ്",
    "englishName": "Brownie — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-049-single",
    "malayalamName": "ഡോനട്ട് — ഒറ്റ എണ്ണം",
    "englishName": "Donut — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍩",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-049-pack",
    "malayalamName": "ഡോനട്ട് — പാക്കറ്റ്",
    "englishName": "Donut — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍩",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-050-single",
    "malayalamName": "ക്രോസന്റ് — ഒറ്റ എണ്ണം",
    "englishName": "Croissant — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-050-pack",
    "malayalamName": "ക്രോസന്റ് — പാക്കറ്റ്",
    "englishName": "Croissant — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-051-single",
    "malayalamName": "പാസ്റ്റ്രി — ഒറ്റ എണ്ണം",
    "englishName": "Pastry — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-051-pack",
    "malayalamName": "പാസ്റ്റ്രി — പാക്കറ്റ്",
    "englishName": "Pastry — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-052-single",
    "malayalamName": "ക്രീം റോൾ — ഒറ്റ എണ്ണം",
    "englishName": "Cream Roll — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-052-pack",
    "malayalamName": "ക്രീം റോൾ — പാക്കറ്റ്",
    "englishName": "Cream Roll — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-053-single",
    "malayalamName": "ചോക്കോ റോൾ — ഒറ്റ എണ്ണം",
    "englishName": "Chocolate Roll — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-053-pack",
    "malayalamName": "ചോക്കോ റോൾ — പാക്കറ്റ്",
    "englishName": "Chocolate Roll — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-054-single",
    "malayalamName": "പിസ്സ ബൺ — ഒറ്റ എണ്ണം",
    "englishName": "Pizza Bun — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍕",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-054-pack",
    "malayalamName": "പിസ്സ ബൺ — പാക്കറ്റ്",
    "englishName": "Pizza Bun — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍕",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-055-single",
    "malayalamName": "ഗാർലിക് ബ്രെഡ് — ഒറ്റ എണ്ണം",
    "englishName": "Garlic Bread — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥖",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-055-pack",
    "malayalamName": "ഗാർലിക് ബ്രെഡ് — പാക്കറ്റ്",
    "englishName": "Garlic Bread — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥖",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-056-single",
    "malayalamName": "ചീസ് ബൺ — ഒറ്റ എണ്ണം",
    "englishName": "Cheese Bun — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🧀",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-056-pack",
    "malayalamName": "ചീസ് ബൺ — പാക്കറ്റ്",
    "englishName": "Cheese Bun — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🧀",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-057-single",
    "malayalamName": "പലഹാര മിക്സ് — ഒറ്റ എണ്ണം",
    "englishName": "Bakery Snack Mix — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥨",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-057-pack",
    "malayalamName": "പലഹാര മിക്സ് — പാക്കറ്റ്",
    "englishName": "Bakery Snack Mix — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥨",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-058-single",
    "malayalamName": "പഫ് പേസ്ട്രി — ഒറ്റ എണ്ണം",
    "englishName": "Puff Pastry — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-058-pack",
    "malayalamName": "പഫ് പേസ്ട്രി — പാക്കറ്റ്",
    "englishName": "Puff Pastry — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥐",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-059-single",
    "malayalamName": "മിനി കേക്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Mini Cake — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-059-pack",
    "malayalamName": "മിനി കേക്ക് — പാക്കറ്റ്",
    "englishName": "Mini Cake — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-060-single",
    "malayalamName": "ബ്രെഡ് സ്റ്റിക്ക് — ഒറ്റ എണ്ണം",
    "englishName": "Breadstick — Single",
    "brand": "Unbranded / Local",
    "packSize": "Single",
    "icon": "🥖",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-bakery-060-pack",
    "malayalamName": "ബ്രെഡ് സ്റ്റിക്ക് — പാക്കറ്റ്",
    "englishName": "Breadstick — Pack",
    "brand": "Unbranded / Local",
    "packSize": "Pack",
    "icon": "🥖",
    "unit": "pcs",
    "category": "Bakery / ബേക്കറി"
  },
  {
    "id": "kerala-v5-sweet-001-loose",
    "malayalamName": "മൈസൂർ പാക്ക് — തൂക്കം",
    "englishName": "Mysore Pak — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-001-box",
    "malayalamName": "മൈസൂർ പാക്ക് — ബോക്സ്",
    "englishName": "Mysore Pak — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-002-loose",
    "malayalamName": "ലഡ്ഡു — തൂക്കം",
    "englishName": "Laddu — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-002-box",
    "malayalamName": "ലഡ്ഡു — ബോക്സ്",
    "englishName": "Laddu — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-003-loose",
    "malayalamName": "ബൂന്തി ലഡ്ഡു — തൂക്കം",
    "englishName": "Boondi Laddu — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-003-box",
    "malayalamName": "ബൂന്തി ലഡ്ഡു — ബോക്സ്",
    "englishName": "Boondi Laddu — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-004-loose",
    "malayalamName": "മോത്തിച്ചൂർ ലഡ്ഡു — തൂക്കം",
    "englishName": "Motichoor Laddu — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-004-box",
    "malayalamName": "മോത്തിച്ചൂർ ലഡ്ഡു — ബോക്സ്",
    "englishName": "Motichoor Laddu — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-005-loose",
    "malayalamName": "ജിലേബി — തൂക്കം",
    "englishName": "Jalebi — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-005-box",
    "malayalamName": "ജിലേബി — ബോക്സ്",
    "englishName": "Jalebi — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-006-loose",
    "malayalamName": "ജാംഗിരി — തൂക്കം",
    "englishName": "Jangiri — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-006-box",
    "malayalamName": "ജാംഗിരി — ബോക്സ്",
    "englishName": "Jangiri — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-007-loose",
    "malayalamName": "ഗുലാബ് ജാമുൻ — തൂക്കം",
    "englishName": "Gulab Jamun — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍮",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-007-box",
    "malayalamName": "ഗുലാബ് ജാമുൻ — ബോക്സ്",
    "englishName": "Gulab Jamun — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍮",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-008-loose",
    "malayalamName": "റസഗുല്ല — തൂക്കം",
    "englishName": "Rasgulla — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍮",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-008-box",
    "malayalamName": "റസഗുല്ല — ബോക്സ്",
    "englishName": "Rasgulla — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍮",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-009-loose",
    "malayalamName": "റസ്മലൈ — തൂക്കം",
    "englishName": "Rasmalai — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍮",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-009-box",
    "malayalamName": "റസ്മലൈ — ബോക്സ്",
    "englishName": "Rasmalai — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍮",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-010-loose",
    "malayalamName": "പാൽപേട — തൂക്കം",
    "englishName": "Milk Peda — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-010-box",
    "malayalamName": "പാൽപേട — ബോക്സ്",
    "englishName": "Milk Peda — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-011-loose",
    "malayalamName": "കേസർ പേട — തൂക്കം",
    "englishName": "Kesar Peda — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-011-box",
    "malayalamName": "കേസർ പേട — ബോക്സ്",
    "englishName": "Kesar Peda — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-012-loose",
    "malayalamName": "ബർഫി — തൂക്കം",
    "englishName": "Burfi — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-012-box",
    "malayalamName": "ബർഫി — ബോക്സ്",
    "englishName": "Burfi — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-013-loose",
    "malayalamName": "കൊക്കനട്ട് ബർഫി — തൂക്കം",
    "englishName": "Coconut Burfi — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🥥",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-013-box",
    "malayalamName": "കൊക്കനട്ട് ബർഫി — ബോക്സ്",
    "englishName": "Coconut Burfi — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🥥",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-014-loose",
    "malayalamName": "കാജു കത്ലി — തൂക്കം",
    "englishName": "Kaju Katli — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🥜",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-014-box",
    "malayalamName": "കാജു കത്ലി — ബോക്സ്",
    "englishName": "Kaju Katli — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🥜",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-015-loose",
    "malayalamName": "കാജു റോൾ — തൂക്കം",
    "englishName": "Kaju Roll — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🥜",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-015-box",
    "malayalamName": "കാജു റോൾ — ബോക്സ്",
    "englishName": "Kaju Roll — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🥜",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-016-loose",
    "malayalamName": "അലുവ — തൂക്കം",
    "englishName": "Kerala Halwa — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍮",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-016-box",
    "malayalamName": "അലുവ — ബോക്സ്",
    "englishName": "Kerala Halwa — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍮",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-017-loose",
    "malayalamName": "കോഴിക്കോട് അലുവ — തൂക്കം",
    "englishName": "Kozhikode Halwa — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍮",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-017-box",
    "malayalamName": "കോഴിക്കോട് അലുവ — ബോക്സ്",
    "englishName": "Kozhikode Halwa — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍮",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-018-loose",
    "malayalamName": "ബ്ലാക്ക് അലുവ — തൂക്കം",
    "englishName": "Black Halwa — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍮",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-018-box",
    "malayalamName": "ബ്ലാക്ക് അലുവ — ബോക്സ്",
    "englishName": "Black Halwa — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍮",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-019-loose",
    "malayalamName": "ബനാന അലുവ — തൂക്കം",
    "englishName": "Banana Halwa — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍌",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-019-box",
    "malayalamName": "ബനാന അലുവ — ബോക്സ്",
    "englishName": "Banana Halwa — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍌",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-020-loose",
    "malayalamName": "കാരറ്റ് അലുവ — തൂക്കം",
    "englishName": "Carrot Halwa — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🥕",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-020-box",
    "malayalamName": "കാരറ്റ് അലുവ — ബോക്സ്",
    "englishName": "Carrot Halwa — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🥕",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-021-loose",
    "malayalamName": "അശോക അലുവ — തൂക്കം",
    "englishName": "Ashoka Halwa — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍮",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-021-box",
    "malayalamName": "അശോക അലുവ — ബോക്സ്",
    "englishName": "Ashoka Halwa — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍮",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-022-loose",
    "malayalamName": "ഗോതമ്പ് അലുവ — തൂക്കം",
    "englishName": "Wheat Halwa — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍮",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-022-box",
    "malayalamName": "ഗോതമ്പ് അലുവ — ബോക്സ്",
    "englishName": "Wheat Halwa — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍮",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-023-loose",
    "malayalamName": "പൈനാപ്പിൾ അലുവ — തൂക്കം",
    "englishName": "Pineapple Halwa — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍍",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-023-box",
    "malayalamName": "പൈനാപ്പിൾ അലുവ — ബോക്സ്",
    "englishName": "Pineapple Halwa — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍍",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-024-loose",
    "malayalamName": "ഉണ്ണിയപ്പം — തൂക്കം",
    "englishName": "Unniyappam — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍘",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-024-box",
    "malayalamName": "ഉണ്ണിയപ്പം — ബോക്സ്",
    "englishName": "Unniyappam — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍘",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-025-loose",
    "malayalamName": "നെയ്യപ്പം — തൂക്കം",
    "englishName": "Neyyappam — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍘",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-025-box",
    "malayalamName": "നെയ്യപ്പം — ബോക്സ്",
    "englishName": "Neyyappam — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍘",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-026-loose",
    "malayalamName": "അച്ചപ്പം — തൂക്കം",
    "englishName": "Achappam — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍘",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-026-box",
    "malayalamName": "അച്ചപ്പം — ബോക്സ്",
    "englishName": "Achappam — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍘",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-027-loose",
    "malayalamName": "കുഴലപ്പം — തൂക്കം",
    "englishName": "Kuzhalappam — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍘",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-027-box",
    "malayalamName": "കുഴലപ്പം — ബോക്സ്",
    "englishName": "Kuzhalappam — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍘",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-028-loose",
    "malayalamName": "തേൻകുഴൽ — തൂക്കം",
    "englishName": "Thenkuzhal — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍘",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-028-box",
    "malayalamName": "തേൻകുഴൽ — ബോക്സ്",
    "englishName": "Thenkuzhal — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍘",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-029-loose",
    "malayalamName": "കോകനട്ട് ബോൾ — തൂക്കം",
    "englishName": "Coconut Ball — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🥥",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-029-box",
    "malayalamName": "കോകനട്ട് ബോൾ — ബോക്സ്",
    "englishName": "Coconut Ball — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🥥",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-030-loose",
    "malayalamName": "എള്ളുണ്ട — തൂക്കം",
    "englishName": "Sesame Ball — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-030-box",
    "malayalamName": "എള്ളുണ്ട — ബോക്സ്",
    "englishName": "Sesame Ball — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-031-loose",
    "malayalamName": "കടല മിഠായി — തൂക്കം",
    "englishName": "Peanut Candy — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🥜",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-031-box",
    "malayalamName": "കടല മിഠായി — ബോക്സ്",
    "englishName": "Peanut Candy — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🥜",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-032-loose",
    "malayalamName": "എള്ള് മിഠായി — തൂക്കം",
    "englishName": "Sesame Candy — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-032-box",
    "malayalamName": "എള്ള് മിഠായി — ബോക്സ്",
    "englishName": "Sesame Candy — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-033-loose",
    "malayalamName": "ശർക്കര മിഠായി — തൂക്കം",
    "englishName": "Jaggery Candy — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-033-box",
    "malayalamName": "ശർക്കര മിഠായി — ബോക്സ്",
    "englishName": "Jaggery Candy — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-034-loose",
    "malayalamName": "തേൻ മിഠായി — തൂക്കം",
    "englishName": "Honey Candy — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-034-box",
    "malayalamName": "തേൻ മിഠായി — ബോക്സ്",
    "englishName": "Honey Candy — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-035-loose",
    "malayalamName": "മിഠായി മിക്സ് — തൂക്കം",
    "englishName": "Assorted Sweets — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-035-box",
    "malayalamName": "മിഠായി മിക്സ് — ബോക്സ്",
    "englishName": "Assorted Sweets — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-036-loose",
    "malayalamName": "ബദാം മിഠായി — തൂക്കം",
    "englishName": "Almond Sweet — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🥜",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-036-box",
    "malayalamName": "ബദാം മിഠായി — ബോക്സ്",
    "englishName": "Almond Sweet — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🥜",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-037-loose",
    "malayalamName": "കൽക്കണ്ടം — തൂക്കം",
    "englishName": "Rock Sugar Candy — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-037-box",
    "malayalamName": "കൽക്കണ്ടം — ബോക്സ്",
    "englishName": "Rock Sugar Candy — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-038-loose",
    "malayalamName": "ചക്കരപ്പാര — തൂക്കം",
    "englishName": "Sweet Diamond Cuts — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍪",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-038-box",
    "malayalamName": "ചക്കരപ്പാര — ബോക്സ്",
    "englishName": "Sweet Diamond Cuts — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-039-loose",
    "malayalamName": "മധുര സേവ — തൂക്കം",
    "englishName": "Sweet Sev — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍘",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-039-box",
    "malayalamName": "മധുര സേവ — ബോക്സ്",
    "englishName": "Sweet Sev — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍘",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-040-loose",
    "malayalamName": "ചുരുട്ട് — തൂക്കം",
    "englishName": "Sweet Churuttu — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍘",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-040-box",
    "malayalamName": "ചുരുട്ട് — ബോക്സ്",
    "englishName": "Sweet Churuttu — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍘",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-041-loose",
    "malayalamName": "പൊരി ഉണ്ട — തൂക്കം",
    "englishName": "Pori Unda — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍘",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-041-box",
    "malayalamName": "പൊരി ഉണ്ട — ബോക്സ്",
    "englishName": "Pori Unda — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍘",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-042-loose",
    "malayalamName": "അവൽ ലഡ്ഡു — തൂക്കം",
    "englishName": "Aval Laddu — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-042-box",
    "malayalamName": "അവൽ ലഡ്ഡു — ബോക്സ്",
    "englishName": "Aval Laddu — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-043-loose",
    "malayalamName": "റവ ലഡ്ഡു — തൂക്കം",
    "englishName": "Rava Laddu — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-043-box",
    "malayalamName": "റവ ലഡ്ഡു — ബോക്സ്",
    "englishName": "Rava Laddu — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-044-loose",
    "malayalamName": "മിൽക്ക് കേക്ക് മിഠായി — തൂക്കം",
    "englishName": "Milk Cake Sweet — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-044-box",
    "malayalamName": "മിൽക്ക് കേക്ക് മിഠായി — ബോക്സ്",
    "englishName": "Milk Cake Sweet — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-045-loose",
    "malayalamName": "ഡ്രൈ ഫ്രൂട്ട് ലഡ്ഡു — തൂക്കം",
    "englishName": "Dry Fruit Laddu — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🥜",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-045-box",
    "malayalamName": "ഡ്രൈ ഫ്രൂട്ട് ലഡ്ഡു — ബോക്സ്",
    "englishName": "Dry Fruit Laddu — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🥜",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-046-loose",
    "malayalamName": "പിസ്ത ബർഫി — തൂക്കം",
    "englishName": "Pista Burfi — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🥜",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-046-box",
    "malayalamName": "പിസ്ത ബർഫി — ബോക്സ്",
    "englishName": "Pista Burfi — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🥜",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-047-loose",
    "malayalamName": "ബേസൻ ലഡ്ഡു — തൂക്കം",
    "englishName": "Besan Laddu — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-047-box",
    "malayalamName": "ബേസൻ ലഡ്ഡു — ബോക്സ്",
    "englishName": "Besan Laddu — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-048-loose",
    "malayalamName": "സോൻ പാപ്പ്ഡി — തൂക്കം",
    "englishName": "Soan Papdi — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-048-box",
    "malayalamName": "സോൻ പാപ്പ്ഡി — ബോക്സ്",
    "englishName": "Soan Papdi — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-049-loose",
    "malayalamName": "ചം ചം — തൂക്കം",
    "englishName": "Cham Cham — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🍬",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-049-box",
    "malayalamName": "ചം ചം — ബോക്സ്",
    "englishName": "Cham Cham — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-050-loose",
    "malayalamName": "കടല ഉണ്ട — തൂക്കം",
    "englishName": "Groundnut Ball — Loose",
    "brand": "Unbranded / Local",
    "packSize": "Loose",
    "icon": "🥜",
    "unit": "kg",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-sweet-050-box",
    "malayalamName": "കടല ഉണ്ട — ബോക്സ്",
    "englishName": "Groundnut Ball — Box",
    "brand": "Unbranded / Local",
    "packSize": "Box",
    "icon": "🥜",
    "unit": "pcs",
    "category": "Sweets / മിഠായികൾ"
  },
  {
    "id": "kerala-v5-snack-001-regular",
    "malayalamName": "ഗുഡ് ഡേ ബിസ്‌കറ്റ് — സാധാരണ പാക്ക്",
    "englishName": "Good Day Biscuits — Regular pack",
    "brand": "Britannia",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-001-value",
    "malayalamName": "ഗുഡ് ഡേ ബിസ്‌കറ്റ് — വലിയ പാക്ക്",
    "englishName": "Good Day Biscuits — Value pack",
    "brand": "Britannia",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-002-regular",
    "malayalamName": "മേരി ഗോൾഡ് ബിസ്‌കറ്റ് — സാധാരണ പാക്ക്",
    "englishName": "Marie Gold Biscuits — Regular pack",
    "brand": "Britannia",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-002-value",
    "malayalamName": "മേരി ഗോൾഡ് ബിസ്‌കറ്റ് — വലിയ പാക്ക്",
    "englishName": "Marie Gold Biscuits — Value pack",
    "brand": "Britannia",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-003-regular",
    "malayalamName": "50-50 ബിസ്‌കറ്റ് — സാധാരണ പാക്ക്",
    "englishName": "50-50 Biscuits — Regular pack",
    "brand": "Britannia",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-003-value",
    "malayalamName": "50-50 ബിസ്‌കറ്റ് — വലിയ പാക്ക്",
    "englishName": "50-50 Biscuits — Value pack",
    "brand": "Britannia",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-004-regular",
    "malayalamName": "ബോർബൺ ബിസ്‌കറ്റ് — സാധാരണ പാക്ക്",
    "englishName": "Bourbon Biscuits — Regular pack",
    "brand": "Britannia",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-004-value",
    "malayalamName": "ബോർബൺ ബിസ്‌കറ്റ് — വലിയ പാക്ക്",
    "englishName": "Bourbon Biscuits — Value pack",
    "brand": "Britannia",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-005-regular",
    "malayalamName": "മിൽക്ക് ബിക്കിസ് — സാധാരണ പാക്ക്",
    "englishName": "Milk Bikis — Regular pack",
    "brand": "Britannia",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-005-value",
    "malayalamName": "മിൽക്ക് ബിക്കിസ് — വലിയ പാക്ക്",
    "englishName": "Milk Bikis — Value pack",
    "brand": "Britannia",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-006-regular",
    "malayalamName": "ലിറ്റിൽ ഹാർട്ട്സ് — സാധാരണ പാക്ക്",
    "englishName": "Little Hearts — Regular pack",
    "brand": "Britannia",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-006-value",
    "malayalamName": "ലിറ്റിൽ ഹാർട്ട്സ് — വലിയ പാക്ക്",
    "englishName": "Little Hearts — Value pack",
    "brand": "Britannia",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-007-regular",
    "malayalamName": "ന്യൂട്രിചോയ്സ് — സാധാരണ പാക്ക്",
    "englishName": "NutriChoice Biscuits — Regular pack",
    "brand": "Britannia",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-007-value",
    "malayalamName": "ന്യൂട്രിചോയ്സ് — വലിയ പാക്ക്",
    "englishName": "NutriChoice Biscuits — Value pack",
    "brand": "Britannia",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-008-regular",
    "malayalamName": "ട്രീറ്റ് ബിസ്‌കറ്റ് — സാധാരണ പാക്ക്",
    "englishName": "Treat Biscuits — Regular pack",
    "brand": "Britannia",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-008-value",
    "malayalamName": "ട്രീറ്റ് ബിസ്‌കറ്റ് — വലിയ പാക്ക്",
    "englishName": "Treat Biscuits — Value pack",
    "brand": "Britannia",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-009-regular",
    "malayalamName": "ടൈഗർ ബിസ്‌കറ്റ് — സാധാരണ പാക്ക്",
    "englishName": "Tiger Biscuits — Regular pack",
    "brand": "Britannia",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-009-value",
    "malayalamName": "ടൈഗർ ബിസ്‌കറ്റ് — വലിയ പാക്ക്",
    "englishName": "Tiger Biscuits — Value pack",
    "brand": "Britannia",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-010-regular",
    "malayalamName": "ടോസ്റ്റിയ റസ്ക് — സാധാരണ പാക്ക്",
    "englishName": "Toastea Rusk — Regular pack",
    "brand": "Britannia",
    "packSize": "Regular pack",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-010-value",
    "malayalamName": "ടോസ്റ്റിയ റസ്ക് — വലിയ പാക്ക്",
    "englishName": "Toastea Rusk — Value pack",
    "brand": "Britannia",
    "packSize": "Value pack",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-011-regular",
    "malayalamName": "പാർലെ ജി — സാധാരണ പാക്ക്",
    "englishName": "Parle-G Biscuits — Regular pack",
    "brand": "Parle",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-011-value",
    "malayalamName": "പാർലെ ജി — വലിയ പാക്ക്",
    "englishName": "Parle-G Biscuits — Value pack",
    "brand": "Parle",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-012-regular",
    "malayalamName": "ഹൈഡ് ആൻഡ് സീക്ക് — സാധാരണ പാക്ക്",
    "englishName": "Hide & Seek Cookies — Regular pack",
    "brand": "Parle",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-012-value",
    "malayalamName": "ഹൈഡ് ആൻഡ് സീക്ക് — വലിയ പാക്ക്",
    "englishName": "Hide & Seek Cookies — Value pack",
    "brand": "Parle",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-013-regular",
    "malayalamName": "മൊനാക്കോ — സാധാരണ പാക്ക്",
    "englishName": "Monaco Biscuits — Regular pack",
    "brand": "Parle",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-013-value",
    "malayalamName": "മൊനാക്കോ — വലിയ പാക്ക്",
    "englishName": "Monaco Biscuits — Value pack",
    "brand": "Parle",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-014-regular",
    "malayalamName": "ക്രാക്ക് ജാക്ക് — സാധാരണ പാക്ക്",
    "englishName": "Krackjack Biscuits — Regular pack",
    "brand": "Parle",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-014-value",
    "malayalamName": "ക്രാക്ക് ജാക്ക് — വലിയ പാക്ക്",
    "englishName": "Krackjack Biscuits — Value pack",
    "brand": "Parle",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-015-regular",
    "malayalamName": "മാരി ബിസ്‌കറ്റ് — സാധാരണ പാക്ക്",
    "englishName": "Marie Biscuits — Regular pack",
    "brand": "Parle",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-015-value",
    "malayalamName": "മാരി ബിസ്‌കറ്റ് — വലിയ പാക്ക്",
    "englishName": "Marie Biscuits — Value pack",
    "brand": "Parle",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-016-regular",
    "malayalamName": "മിലാനോ — സാധാരണ പാക്ക്",
    "englishName": "Milano Cookies — Regular pack",
    "brand": "Parle",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-016-value",
    "malayalamName": "മിലാനോ — വലിയ പാക്ക്",
    "englishName": "Milano Cookies — Value pack",
    "brand": "Parle",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-017-regular",
    "malayalamName": "മെലഡി — സാധാരണ പാക്ക്",
    "englishName": "Melody Candy — Regular pack",
    "brand": "Parle",
    "packSize": "Regular pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-017-value",
    "malayalamName": "മെലഡി — വലിയ പാക്ക്",
    "englishName": "Melody Candy — Value pack",
    "brand": "Parle",
    "packSize": "Value pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-018-regular",
    "malayalamName": "കിസ്മി — സാധാരണ പാക്ക്",
    "englishName": "Kismi Candy — Regular pack",
    "brand": "Parle",
    "packSize": "Regular pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-018-value",
    "malayalamName": "കിസ്മി — വലിയ പാക്ക്",
    "englishName": "Kismi Candy — Value pack",
    "brand": "Parle",
    "packSize": "Value pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-019-regular",
    "malayalamName": "പോപ്പിൻസ് — സാധാരണ പാക്ക്",
    "englishName": "Poppins Candy — Regular pack",
    "brand": "Parle",
    "packSize": "Regular pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-019-value",
    "malayalamName": "പോപ്പിൻസ് — വലിയ പാക്ക്",
    "englishName": "Poppins Candy — Value pack",
    "brand": "Parle",
    "packSize": "Value pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-020-regular",
    "malayalamName": "ഡാർക്ക് ഫാന്റസി — സാധാരണ പാക്ക്",
    "englishName": "Dark Fantasy Cookies — Regular pack",
    "brand": "Sunfeast",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-020-value",
    "malayalamName": "ഡാർക്ക് ഫാന്റസി — വലിയ പാക്ക്",
    "englishName": "Dark Fantasy Cookies — Value pack",
    "brand": "Sunfeast",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-021-regular",
    "malayalamName": "മോംസ് മാജിക് — സാധാരണ പാക്ക്",
    "englishName": "Mom's Magic Cookies — Regular pack",
    "brand": "Sunfeast",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-021-value",
    "malayalamName": "മോംസ് മാജിക് — വലിയ പാക്ക്",
    "englishName": "Mom's Magic Cookies — Value pack",
    "brand": "Sunfeast",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-022-regular",
    "malayalamName": "മാരി ലൈറ്റ് — സാധാരണ പാക്ക്",
    "englishName": "Marie Light Biscuits — Regular pack",
    "brand": "Sunfeast",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-022-value",
    "malayalamName": "മാരി ലൈറ്റ് — വലിയ പാക്ക്",
    "englishName": "Marie Light Biscuits — Value pack",
    "brand": "Sunfeast",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-023-regular",
    "malayalamName": "ഫാർംലൈറ്റ് — സാധാരണ പാക്ക്",
    "englishName": "Farmlite Biscuits — Regular pack",
    "brand": "Sunfeast",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-023-value",
    "malayalamName": "ഫാർംലൈറ്റ് — വലിയ പാക്ക്",
    "englishName": "Farmlite Biscuits — Value pack",
    "brand": "Sunfeast",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-024-regular",
    "malayalamName": "ഡ്രീം ക്രീം — സാധാരണ പാക്ക്",
    "englishName": "Dream Cream Biscuits — Regular pack",
    "brand": "Sunfeast",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-024-value",
    "malayalamName": "ഡ്രീം ക്രീം — വലിയ പാക്ക്",
    "englishName": "Dream Cream Biscuits — Value pack",
    "brand": "Sunfeast",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-025-regular",
    "malayalamName": "ഡയറി മിൽക്ക് — സാധാരണ പാക്ക്",
    "englishName": "Dairy Milk Chocolate — Regular pack",
    "brand": "Cadbury",
    "packSize": "Regular pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-025-value",
    "malayalamName": "ഡയറി മിൽക്ക് — വലിയ പാക്ക്",
    "englishName": "Dairy Milk Chocolate — Value pack",
    "brand": "Cadbury",
    "packSize": "Value pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-026-regular",
    "malayalamName": "ഫൈവ് സ്റ്റാർ — സാധാരണ പാക്ക്",
    "englishName": "5 Star Chocolate — Regular pack",
    "brand": "Cadbury",
    "packSize": "Regular pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-026-value",
    "malayalamName": "ഫൈവ് സ്റ്റാർ — വലിയ പാക്ക്",
    "englishName": "5 Star Chocolate — Value pack",
    "brand": "Cadbury",
    "packSize": "Value pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-027-regular",
    "malayalamName": "പെർക്ക് — സാധാരണ പാക്ക്",
    "englishName": "Perk Wafer — Regular pack",
    "brand": "Cadbury",
    "packSize": "Regular pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-027-value",
    "malayalamName": "പെർക്ക് — വലിയ പാക്ക്",
    "englishName": "Perk Wafer — Value pack",
    "brand": "Cadbury",
    "packSize": "Value pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-028-regular",
    "malayalamName": "ജെംസ് — സാധാരണ പാക്ക്",
    "englishName": "Gems Chocolate — Regular pack",
    "brand": "Cadbury",
    "packSize": "Regular pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-028-value",
    "malayalamName": "ജെംസ് — വലിയ പാക്ക്",
    "englishName": "Gems Chocolate — Value pack",
    "brand": "Cadbury",
    "packSize": "Value pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-029-regular",
    "malayalamName": "ബോർൺവിൽ — സാധാരണ പാക്ക്",
    "englishName": "Bournville Chocolate — Regular pack",
    "brand": "Cadbury",
    "packSize": "Regular pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-029-value",
    "malayalamName": "ബോർൺവിൽ — വലിയ പാക്ക്",
    "englishName": "Bournville Chocolate — Value pack",
    "brand": "Cadbury",
    "packSize": "Value pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-030-regular",
    "malayalamName": "സിൽക്ക് — സാധാരണ പാക്ക്",
    "englishName": "Dairy Milk Silk Chocolate — Regular pack",
    "brand": "Cadbury",
    "packSize": "Regular pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-030-value",
    "malayalamName": "സിൽക്ക് — വലിയ പാക്ക്",
    "englishName": "Dairy Milk Silk Chocolate — Value pack",
    "brand": "Cadbury",
    "packSize": "Value pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-031-regular",
    "malayalamName": "കിറ്റ്കാറ്റ് — സാധാരണ പാക്ക്",
    "englishName": "KitKat Chocolate — Regular pack",
    "brand": "Nestlé",
    "packSize": "Regular pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-031-value",
    "malayalamName": "കിറ്റ്കാറ്റ് — വലിയ പാക്ക്",
    "englishName": "KitKat Chocolate — Value pack",
    "brand": "Nestlé",
    "packSize": "Value pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-032-regular",
    "malayalamName": "മഞ്ച് — സാധാരണ പാക്ക്",
    "englishName": "Munch Wafer — Regular pack",
    "brand": "Nestlé",
    "packSize": "Regular pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-032-value",
    "malayalamName": "മഞ്ച് — വലിയ പാക്ക്",
    "englishName": "Munch Wafer — Value pack",
    "brand": "Nestlé",
    "packSize": "Value pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-033-regular",
    "malayalamName": "മിൽക്കി ബാർ — സാധാരണ പാക്ക്",
    "englishName": "Milkybar Chocolate — Regular pack",
    "brand": "Nestlé",
    "packSize": "Regular pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-033-value",
    "malayalamName": "മിൽക്കി ബാർ — വലിയ പാക്ക്",
    "englishName": "Milkybar Chocolate — Value pack",
    "brand": "Nestlé",
    "packSize": "Value pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-034-regular",
    "malayalamName": "പോളോ — സാധാരണ പാക്ക്",
    "englishName": "Polo Mint — Regular pack",
    "brand": "Nestlé",
    "packSize": "Regular pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-034-value",
    "malayalamName": "പോളോ — വലിയ പാക്ക്",
    "englishName": "Polo Mint — Value pack",
    "brand": "Nestlé",
    "packSize": "Value pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-035-regular",
    "malayalamName": "എക്ലെയേഴ്സ് — സാധാരണ പാക്ക്",
    "englishName": "Éclairs Candy — Regular pack",
    "brand": "Nestlé",
    "packSize": "Regular pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-035-value",
    "malayalamName": "എക്ലെയേഴ്സ് — വലിയ പാക്ക്",
    "englishName": "Éclairs Candy — Value pack",
    "brand": "Nestlé",
    "packSize": "Value pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-036-regular",
    "malayalamName": "ആൽപെൻലീബെ — സാധാരണ പാക്ക്",
    "englishName": "Alpenliebe Candy — Regular pack",
    "brand": "Perfetti",
    "packSize": "Regular pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-036-value",
    "malayalamName": "ആൽപെൻലീബെ — വലിയ പാക്ക്",
    "englishName": "Alpenliebe Candy — Value pack",
    "brand": "Perfetti",
    "packSize": "Value pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-037-regular",
    "malayalamName": "മെൻറോസ് — സാധാരണ പാക്ക്",
    "englishName": "Mentos Candy — Regular pack",
    "brand": "Perfetti",
    "packSize": "Regular pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-037-value",
    "malayalamName": "മെൻറോസ് — വലിയ പാക്ക്",
    "englishName": "Mentos Candy — Value pack",
    "brand": "Perfetti",
    "packSize": "Value pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-038-regular",
    "malayalamName": "സെന്റർ ഫ്രെഷ് — സാധാരണ പാക്ക്",
    "englishName": "Center Fresh Gum — Regular pack",
    "brand": "Perfetti",
    "packSize": "Regular pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-038-value",
    "malayalamName": "സെന്റർ ഫ്രെഷ് — വലിയ പാക്ക്",
    "englishName": "Center Fresh Gum — Value pack",
    "brand": "Perfetti",
    "packSize": "Value pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-039-regular",
    "malayalamName": "സെന്റർ ഫ്രൂട്ട് — സാധാരണ പാക്ക്",
    "englishName": "Center Fruit Gum — Regular pack",
    "brand": "Perfetti",
    "packSize": "Regular pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-039-value",
    "malayalamName": "സെന്റർ ഫ്രൂട്ട് — വലിയ പാക്ക്",
    "englishName": "Center Fruit Gum — Value pack",
    "brand": "Perfetti",
    "packSize": "Value pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-040-regular",
    "malayalamName": "പൾസ് മിഠായി — സാധാരണ പാക്ക്",
    "englishName": "Pulse Candy — Regular pack",
    "brand": "DS Group",
    "packSize": "Regular pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-040-value",
    "malayalamName": "പൾസ് മിഠായി — വലിയ പാക്ക്",
    "englishName": "Pulse Candy — Value pack",
    "brand": "DS Group",
    "packSize": "Value pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-041-regular",
    "malayalamName": "ചോക്കോ പൈ — സാധാരണ പാക്ക്",
    "englishName": "Choco Pie — Regular pack",
    "brand": "Lotte",
    "packSize": "Regular pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-041-value",
    "malayalamName": "ചോക്കോ പൈ — വലിയ പാക്ക്",
    "englishName": "Choco Pie — Value pack",
    "brand": "Lotte",
    "packSize": "Value pack",
    "icon": "🍫",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-042-regular",
    "malayalamName": "ചോക്കോലേറ്റ് ബിസ്‌കറ്റ് — സാധാരണ പാക്ക്",
    "englishName": "Choco Biscuit — Regular pack",
    "brand": "Lotte",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-042-value",
    "malayalamName": "ചോക്കോലേറ്റ് ബിസ്‌കറ്റ് — വലിയ പാക്ക്",
    "englishName": "Choco Biscuit — Value pack",
    "brand": "Lotte",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-043-regular",
    "malayalamName": "ചോക്കോ ചിപ്പ് കുക്കി — സാധാരണ പാക്ക്",
    "englishName": "Choco Chip Cookies — Regular pack",
    "brand": "Unibic",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-043-value",
    "malayalamName": "ചോക്കോ ചിപ്പ് കുക്കി — വലിയ പാക്ക്",
    "englishName": "Choco Chip Cookies — Value pack",
    "brand": "Unibic",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-044-regular",
    "malayalamName": "ബട്ടർ കുക്കി — സാധാരണ പാക്ക്",
    "englishName": "Butter Cookies — Regular pack",
    "brand": "Unibic",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-044-value",
    "malayalamName": "ബട്ടർ കുക്കി — വലിയ പാക്ക്",
    "englishName": "Butter Cookies — Value pack",
    "brand": "Unibic",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-045-regular",
    "malayalamName": "മാഡ് ആംഗിൾസ് — സാധാരണ പാക്ക്",
    "englishName": "Mad Angles Chips — Regular pack",
    "brand": "Bingo!",
    "packSize": "Regular pack",
    "icon": "🍟",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-045-value",
    "malayalamName": "മാഡ് ആംഗിൾസ് — വലിയ പാക്ക്",
    "englishName": "Mad Angles Chips — Value pack",
    "brand": "Bingo!",
    "packSize": "Value pack",
    "icon": "🍟",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-046-regular",
    "malayalamName": "ടെഡെ മെഡെ — സാധാരണ പാക്ക്",
    "englishName": "Tedhe Medhe Snack — Regular pack",
    "brand": "Bingo!",
    "packSize": "Regular pack",
    "icon": "🍟",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-046-value",
    "malayalamName": "ടെഡെ മെഡെ — വലിയ പാക്ക്",
    "englishName": "Tedhe Medhe Snack — Value pack",
    "brand": "Bingo!",
    "packSize": "Value pack",
    "icon": "🍟",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-047-regular",
    "malayalamName": "ക്ലാസിക് ചിപ്സ് — സാധാരണ പാക്ക്",
    "englishName": "Classic Potato Chips — Regular pack",
    "brand": "Lay's",
    "packSize": "Regular pack",
    "icon": "🍟",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-047-value",
    "malayalamName": "ക്ലാസിക് ചിപ്സ് — വലിയ പാക്ക്",
    "englishName": "Classic Potato Chips — Value pack",
    "brand": "Lay's",
    "packSize": "Value pack",
    "icon": "🍟",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-048-regular",
    "malayalamName": "മസാല ചിപ്സ് — സാധാരണ പാക്ക്",
    "englishName": "Masala Potato Chips — Regular pack",
    "brand": "Lay's",
    "packSize": "Regular pack",
    "icon": "🍟",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-048-value",
    "malayalamName": "മസാല ചിപ്സ് — വലിയ പാക്ക്",
    "englishName": "Masala Potato Chips — Value pack",
    "brand": "Lay's",
    "packSize": "Value pack",
    "icon": "🍟",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-049-regular",
    "malayalamName": "മസാല മഞ്ച് — സാധാരണ പാക്ക്",
    "englishName": "Masala Munch — Regular pack",
    "brand": "Kurkure",
    "packSize": "Regular pack",
    "icon": "🍟",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-049-value",
    "malayalamName": "മസാല മഞ്ച് — വലിയ പാക്ക്",
    "englishName": "Masala Munch — Value pack",
    "brand": "Kurkure",
    "packSize": "Value pack",
    "icon": "🍟",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-050-regular",
    "malayalamName": "ഭുജിയ — സാധാരണ പാക്ക്",
    "englishName": "Bhujia — Regular pack",
    "brand": "Haldiram's",
    "packSize": "Regular pack",
    "icon": "🥜",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-050-value",
    "malayalamName": "ഭുജിയ — വലിയ പാക്ക്",
    "englishName": "Bhujia — Value pack",
    "brand": "Haldiram's",
    "packSize": "Value pack",
    "icon": "🥜",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-051-regular",
    "malayalamName": "ആലൂ ഭുജിയ — സാധാരണ പാക്ക്",
    "englishName": "Aloo Bhujia — Regular pack",
    "brand": "Haldiram's",
    "packSize": "Regular pack",
    "icon": "🥜",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-051-value",
    "malayalamName": "ആലൂ ഭുജിയ — വലിയ പാക്ക്",
    "englishName": "Aloo Bhujia — Value pack",
    "brand": "Haldiram's",
    "packSize": "Value pack",
    "icon": "🥜",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-052-regular",
    "malayalamName": "മിക്സ്ചർ — സാധാരണ പാക്ക്",
    "englishName": "Namkeen Mixture — Regular pack",
    "brand": "Haldiram's",
    "packSize": "Regular pack",
    "icon": "🥜",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-052-value",
    "malayalamName": "മിക്സ്ചർ — വലിയ പാക്ക്",
    "englishName": "Namkeen Mixture — Value pack",
    "brand": "Haldiram's",
    "packSize": "Value pack",
    "icon": "🥜",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-053-regular",
    "malayalamName": "വേഫേഴ്സ് — സാധാരണ പാക്ക്",
    "englishName": "Potato Wafers — Regular pack",
    "brand": "Balaji",
    "packSize": "Regular pack",
    "icon": "🍟",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-053-value",
    "malayalamName": "വേഫേഴ്സ് — വലിയ പാക്ക്",
    "englishName": "Potato Wafers — Value pack",
    "brand": "Balaji",
    "packSize": "Value pack",
    "icon": "🍟",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-054-regular",
    "malayalamName": "നേന്ത്രക്ക ചിപ്സ് — സാധാരണ പാക്ക്",
    "englishName": "Banana Chips — Regular pack",
    "brand": "Apsara Bakes",
    "packSize": "Regular pack",
    "icon": "🍌",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-054-value",
    "malayalamName": "നേന്ത്രക്ക ചിപ്സ് — വലിയ പാക്ക്",
    "englishName": "Banana Chips — Value pack",
    "brand": "Apsara Bakes",
    "packSize": "Value pack",
    "icon": "🍌",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-055-regular",
    "malayalamName": "കേരള മിക്സ്ചർ — സാധാരണ പാക്ക്",
    "englishName": "Kerala Mixture — Regular pack",
    "brand": "Arara Foods",
    "packSize": "Regular pack",
    "icon": "🥜",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-snack-055-value",
    "malayalamName": "കേരള മിക്സ്ചർ — വലിയ പാക്ക്",
    "englishName": "Kerala Mixture — Value pack",
    "brand": "Arara Foods",
    "packSize": "Value pack",
    "icon": "🥜",
    "unit": "pcs",
    "category": "Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്"
  },
  {
    "id": "kerala-v5-grocery-001-regular",
    "malayalamName": "മുളകുപൊടി — സാധാരണ പാക്ക്",
    "englishName": "Chilli Powder — Regular pack",
    "brand": "Eastern",
    "packSize": "Regular pack",
    "icon": "🌶️",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-001-value",
    "malayalamName": "മുളകുപൊടി — വലിയ പാക്ക്",
    "englishName": "Chilli Powder — Value pack",
    "brand": "Eastern",
    "packSize": "Value pack",
    "icon": "🌶️",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-002-regular",
    "malayalamName": "മല്ലിപ്പൊടി — സാധാരണ പാക്ക്",
    "englishName": "Coriander Powder — Regular pack",
    "brand": "Eastern",
    "packSize": "Regular pack",
    "icon": "🌿",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-002-value",
    "malayalamName": "മല്ലിപ്പൊടി — വലിയ പാക്ക്",
    "englishName": "Coriander Powder — Value pack",
    "brand": "Eastern",
    "packSize": "Value pack",
    "icon": "🌿",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-003-regular",
    "malayalamName": "മഞ്ഞൾപ്പൊടി — സാധാരണ പാക്ക്",
    "englishName": "Turmeric Powder — Regular pack",
    "brand": "Eastern",
    "packSize": "Regular pack",
    "icon": "🟡",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-003-value",
    "malayalamName": "മഞ്ഞൾപ്പൊടി — വലിയ പാക്ക്",
    "englishName": "Turmeric Powder — Value pack",
    "brand": "Eastern",
    "packSize": "Value pack",
    "icon": "🟡",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-004-regular",
    "malayalamName": "സാമ്പാർ പൊടി — സാധാരണ പാക്ക്",
    "englishName": "Sambar Powder — Regular pack",
    "brand": "Eastern",
    "packSize": "Regular pack",
    "icon": "🍲",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-004-value",
    "malayalamName": "സാമ്പാർ പൊടി — വലിയ പാക്ക്",
    "englishName": "Sambar Powder — Value pack",
    "brand": "Eastern",
    "packSize": "Value pack",
    "icon": "🍲",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-005-regular",
    "malayalamName": "ചിക്കൻ മസാല — സാധാരണ പാക്ക്",
    "englishName": "Chicken Masala — Regular pack",
    "brand": "Eastern",
    "packSize": "Regular pack",
    "icon": "🍛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-005-value",
    "malayalamName": "ചിക്കൻ മസാല — വലിയ പാക്ക്",
    "englishName": "Chicken Masala — Value pack",
    "brand": "Eastern",
    "packSize": "Value pack",
    "icon": "🍛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-006-regular",
    "malayalamName": "മീൻ മസാല — സാധാരണ പാക്ക്",
    "englishName": "Fish Masala — Regular pack",
    "brand": "Eastern",
    "packSize": "Regular pack",
    "icon": "🐟",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-006-value",
    "malayalamName": "മീൻ മസാല — വലിയ പാക്ക്",
    "englishName": "Fish Masala — Value pack",
    "brand": "Eastern",
    "packSize": "Value pack",
    "icon": "🐟",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-007-regular",
    "malayalamName": "ഗരം മസാല — സാധാരണ പാക്ക്",
    "englishName": "Garam Masala — Regular pack",
    "brand": "Eastern",
    "packSize": "Regular pack",
    "icon": "🍛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-007-value",
    "malayalamName": "ഗരം മസാല — വലിയ പാക്ക്",
    "englishName": "Garam Masala — Value pack",
    "brand": "Eastern",
    "packSize": "Value pack",
    "icon": "🍛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-008-regular",
    "malayalamName": "പുട്ടുപൊടി — സാധാരണ പാക്ക്",
    "englishName": "Puttu Powder — Regular pack",
    "brand": "Nirapara",
    "packSize": "Regular pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-008-value",
    "malayalamName": "പുട്ടുപൊടി — വലിയ പാക്ക്",
    "englishName": "Puttu Powder — Value pack",
    "brand": "Nirapara",
    "packSize": "Value pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-009-regular",
    "malayalamName": "ഇടിയപ്പപ്പൊടി — സാധാരണ പാക്ക്",
    "englishName": "Idiyappam Flour — Regular pack",
    "brand": "Nirapara",
    "packSize": "Regular pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-009-value",
    "malayalamName": "ഇടിയപ്പപ്പൊടി — വലിയ പാക്ക്",
    "englishName": "Idiyappam Flour — Value pack",
    "brand": "Nirapara",
    "packSize": "Value pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-010-regular",
    "malayalamName": "അരിപ്പൊടി — സാധാരണ പാക്ക്",
    "englishName": "Rice Flour — Regular pack",
    "brand": "Nirapara",
    "packSize": "Regular pack",
    "icon": "🌾",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-010-value",
    "malayalamName": "അരിപ്പൊടി — വലിയ പാക്ക്",
    "englishName": "Rice Flour — Value pack",
    "brand": "Nirapara",
    "packSize": "Value pack",
    "icon": "🌾",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-011-regular",
    "malayalamName": "മട്ട അരി — സാധാരണ പാക്ക്",
    "englishName": "Matta Rice — Regular pack",
    "brand": "Nirapara",
    "packSize": "Regular pack",
    "icon": "🍚",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-011-value",
    "malayalamName": "മട്ട അരി — വലിയ പാക്ക്",
    "englishName": "Matta Rice — Value pack",
    "brand": "Nirapara",
    "packSize": "Value pack",
    "icon": "🍚",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-012-regular",
    "malayalamName": "മസാല പൊടി — സാധാരണ പാക്ക്",
    "englishName": "Masala Powder — Regular pack",
    "brand": "Nirapara",
    "packSize": "Regular pack",
    "icon": "🍛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-012-value",
    "malayalamName": "മസാല പൊടി — വലിയ പാക്ക്",
    "englishName": "Masala Powder — Value pack",
    "brand": "Nirapara",
    "packSize": "Value pack",
    "icon": "🍛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-013-regular",
    "malayalamName": "മട്ട അരി — സാധാരണ പാക്ക്",
    "englishName": "Matta Rice — Regular pack",
    "brand": "Double Horse",
    "packSize": "Regular pack",
    "icon": "🍚",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-013-value",
    "malayalamName": "മട്ട അരി — വലിയ പാക്ക്",
    "englishName": "Matta Rice — Value pack",
    "brand": "Double Horse",
    "packSize": "Value pack",
    "icon": "🍚",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-014-regular",
    "malayalamName": "പുട്ടുപൊടി — സാധാരണ പാക്ക്",
    "englishName": "Puttu Powder — Regular pack",
    "brand": "Double Horse",
    "packSize": "Regular pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-014-value",
    "malayalamName": "പുട്ടുപൊടി — വലിയ പാക്ക്",
    "englishName": "Puttu Powder — Value pack",
    "brand": "Double Horse",
    "packSize": "Value pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-015-regular",
    "malayalamName": "ഇടിയപ്പപ്പൊടി — സാധാരണ പാക്ക്",
    "englishName": "Idiyappam Flour — Regular pack",
    "brand": "Double Horse",
    "packSize": "Regular pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-015-value",
    "malayalamName": "ഇടിയപ്പപ്പൊടി — വലിയ പാക്ക്",
    "englishName": "Idiyappam Flour — Value pack",
    "brand": "Double Horse",
    "packSize": "Value pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-016-regular",
    "malayalamName": "അരിപ്പൊടി — സാധാരണ പാക്ക്",
    "englishName": "Rice Flour — Regular pack",
    "brand": "Double Horse",
    "packSize": "Regular pack",
    "icon": "🌾",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-016-value",
    "malayalamName": "അരിപ്പൊടി — വലിയ പാക്ക്",
    "englishName": "Rice Flour — Value pack",
    "brand": "Double Horse",
    "packSize": "Value pack",
    "icon": "🌾",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-017-regular",
    "malayalamName": "അവൽ — സാധാരണ പാക്ക്",
    "englishName": "Flattened Rice — Regular pack",
    "brand": "Double Horse",
    "packSize": "Regular pack",
    "icon": "🍚",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-017-value",
    "malayalamName": "അവൽ — വലിയ പാക്ക്",
    "englishName": "Flattened Rice — Value pack",
    "brand": "Double Horse",
    "packSize": "Value pack",
    "icon": "🍚",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-018-regular",
    "malayalamName": "സാമ്പാർ പൊടി — സാധാരണ പാക്ക്",
    "englishName": "Sambar Powder — Regular pack",
    "brand": "Brahmins",
    "packSize": "Regular pack",
    "icon": "🍲",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-018-value",
    "malayalamName": "സാമ്പാർ പൊടി — വലിയ പാക്ക്",
    "englishName": "Sambar Powder — Value pack",
    "brand": "Brahmins",
    "packSize": "Value pack",
    "icon": "🍲",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-019-regular",
    "malayalamName": "രസം പൊടി — സാധാരണ പാക്ക്",
    "englishName": "Rasam Powder — Regular pack",
    "brand": "Brahmins",
    "packSize": "Regular pack",
    "icon": "🍲",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-019-value",
    "malayalamName": "രസം പൊടി — വലിയ പാക്ക്",
    "englishName": "Rasam Powder — Value pack",
    "brand": "Brahmins",
    "packSize": "Value pack",
    "icon": "🍲",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-020-regular",
    "malayalamName": "മുളകുപൊടി — സാധാരണ പാക്ക്",
    "englishName": "Chilli Powder — Regular pack",
    "brand": "Brahmins",
    "packSize": "Regular pack",
    "icon": "🌶️",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-020-value",
    "malayalamName": "മുളകുപൊടി — വലിയ പാക്ക്",
    "englishName": "Chilli Powder — Value pack",
    "brand": "Brahmins",
    "packSize": "Value pack",
    "icon": "🌶️",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-021-regular",
    "malayalamName": "മല്ലിപ്പൊടി — സാധാരണ പാക്ക്",
    "englishName": "Coriander Powder — Regular pack",
    "brand": "Brahmins",
    "packSize": "Regular pack",
    "icon": "🌿",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-021-value",
    "malayalamName": "മല്ലിപ്പൊടി — വലിയ പാക്ക്",
    "englishName": "Coriander Powder — Value pack",
    "brand": "Brahmins",
    "packSize": "Value pack",
    "icon": "🌿",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-022-regular",
    "malayalamName": "സാമ്പാർ പൊടി — സാധാരണ പാക്ക്",
    "englishName": "Sambar Powder — Regular pack",
    "brand": "Kitchen Treasures",
    "packSize": "Regular pack",
    "icon": "🍲",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-022-value",
    "malayalamName": "സാമ്പാർ പൊടി — വലിയ പാക്ക്",
    "englishName": "Sambar Powder — Value pack",
    "brand": "Kitchen Treasures",
    "packSize": "Value pack",
    "icon": "🍲",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-023-regular",
    "malayalamName": "ചിക്കൻ മസാല — സാധാരണ പാക്ക്",
    "englishName": "Chicken Masala — Regular pack",
    "brand": "Kitchen Treasures",
    "packSize": "Regular pack",
    "icon": "🍛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-023-value",
    "malayalamName": "ചിക്കൻ മസാല — വലിയ പാക്ക്",
    "englishName": "Chicken Masala — Value pack",
    "brand": "Kitchen Treasures",
    "packSize": "Value pack",
    "icon": "🍛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-024-regular",
    "malayalamName": "മീൻ മസാല — സാധാരണ പാക്ക്",
    "englishName": "Fish Masala — Regular pack",
    "brand": "Kitchen Treasures",
    "packSize": "Regular pack",
    "icon": "🐟",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-024-value",
    "malayalamName": "മീൻ മസാല — വലിയ പാക്ക്",
    "englishName": "Fish Masala — Value pack",
    "brand": "Kitchen Treasures",
    "packSize": "Value pack",
    "icon": "🐟",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-025-regular",
    "malayalamName": "മുളകുപൊടി — സാധാരണ പാക്ക്",
    "englishName": "Chilli Powder — Regular pack",
    "brand": "Kitchen Treasures",
    "packSize": "Regular pack",
    "icon": "🌶️",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-025-value",
    "malayalamName": "മുളകുപൊടി — വലിയ പാക്ക്",
    "englishName": "Chilli Powder — Value pack",
    "brand": "Kitchen Treasures",
    "packSize": "Value pack",
    "icon": "🌶️",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-026-regular",
    "malayalamName": "ആട്ട — സാധാരണ പാക്ക്",
    "englishName": "Wheat Atta — Regular pack",
    "brand": "Aashirvaad",
    "packSize": "Regular pack",
    "icon": "🌾",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-026-value",
    "malayalamName": "ആട്ട — വലിയ പാക്ക്",
    "englishName": "Wheat Atta — Value pack",
    "brand": "Aashirvaad",
    "packSize": "Value pack",
    "icon": "🌾",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-027-regular",
    "malayalamName": "മൾട്ടിഗ്രെയിൻ ആട്ട — സാധാരണ പാക്ക്",
    "englishName": "Multigrain Atta — Regular pack",
    "brand": "Aashirvaad",
    "packSize": "Regular pack",
    "icon": "🌾",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-027-value",
    "malayalamName": "മൾട്ടിഗ്രെയിൻ ആട്ട — വലിയ പാക്ക്",
    "englishName": "Multigrain Atta — Value pack",
    "brand": "Aashirvaad",
    "packSize": "Value pack",
    "icon": "🌾",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-028-regular",
    "malayalamName": "ഇൻസ്റ്റന്റ് മിക്സ് — സാധാരണ പാക്ക്",
    "englishName": "Instant Mix — Regular pack",
    "brand": "Aashirvaad",
    "packSize": "Regular pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-028-value",
    "malayalamName": "ഇൻസ്റ്റന്റ് മിക്സ് — വലിയ പാക്ക്",
    "englishName": "Instant Mix — Value pack",
    "brand": "Aashirvaad",
    "packSize": "Value pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-029-regular",
    "malayalamName": "മിൽക്ക് റസ്ക് — സാധാരണ പാക്ക്",
    "englishName": "Milk Rusk — Regular pack",
    "brand": "Elite",
    "packSize": "Regular pack",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-029-value",
    "malayalamName": "മിൽക്ക് റസ്ക് — വലിയ പാക്ക്",
    "englishName": "Milk Rusk — Value pack",
    "brand": "Elite",
    "packSize": "Value pack",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-030-regular",
    "malayalamName": "ബ്രെഡ് — സാധാരണ പാക്ക്",
    "englishName": "Bread — Regular pack",
    "brand": "Elite",
    "packSize": "Regular pack",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-030-value",
    "malayalamName": "ബ്രെഡ് — വലിയ പാക്ക്",
    "englishName": "Bread — Value pack",
    "brand": "Elite",
    "packSize": "Value pack",
    "icon": "🍞",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-031-regular",
    "malayalamName": "പ്ലം കേക്ക് — സാധാരണ പാക്ക്",
    "englishName": "Plum Cake — Regular pack",
    "brand": "Elite",
    "packSize": "Regular pack",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-031-value",
    "malayalamName": "പ്ലം കേക്ക് — വലിയ പാക്ക്",
    "englishName": "Plum Cake — Value pack",
    "brand": "Elite",
    "packSize": "Value pack",
    "icon": "🍰",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-032-regular",
    "malayalamName": "ബിസ്‌കറ്റ് — സാധാരണ പാക്ക്",
    "englishName": "Biscuits — Regular pack",
    "brand": "Elite",
    "packSize": "Regular pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-032-value",
    "malayalamName": "ബിസ്‌കറ്റ് — വലിയ പാക്ക്",
    "englishName": "Biscuits — Value pack",
    "brand": "Elite",
    "packSize": "Value pack",
    "icon": "🍪",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-033-regular",
    "malayalamName": "വെളിച്ചെണ്ണ — സാധാരണ പാക്ക്",
    "englishName": "Coconut Oil — Regular pack",
    "brand": "KLF",
    "packSize": "Regular pack",
    "icon": "🥥",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-033-value",
    "malayalamName": "വെളിച്ചെണ്ണ — വലിയ പാക്ക്",
    "englishName": "Coconut Oil — Value pack",
    "brand": "KLF",
    "packSize": "Value pack",
    "icon": "🥥",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-034-regular",
    "malayalamName": "നെയ്യ് — സാധാരണ പാക്ക്",
    "englishName": "Ghee — Regular pack",
    "brand": "KLF",
    "packSize": "Regular pack",
    "icon": "🧈",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-034-value",
    "malayalamName": "നെയ്യ് — വലിയ പാക്ക്",
    "englishName": "Ghee — Value pack",
    "brand": "KLF",
    "packSize": "Value pack",
    "icon": "🧈",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-035-regular",
    "malayalamName": "വെളിച്ചെണ്ണ — സാധാരണ പാക്ക്",
    "englishName": "Coconut Oil — Regular pack",
    "brand": "Kerafed",
    "packSize": "Regular pack",
    "icon": "🥥",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-035-value",
    "malayalamName": "വെളിച്ചെണ്ണ — വലിയ പാക്ക്",
    "englishName": "Coconut Oil — Value pack",
    "brand": "Kerafed",
    "packSize": "Value pack",
    "icon": "🥥",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-036-regular",
    "malayalamName": "പാൽ — സാധാരണ പാക്ക്",
    "englishName": "Milk — Regular pack",
    "brand": "Milma",
    "packSize": "Regular pack",
    "icon": "🥛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-036-value",
    "malayalamName": "പാൽ — വലിയ പാക്ക്",
    "englishName": "Milk — Value pack",
    "brand": "Milma",
    "packSize": "Value pack",
    "icon": "🥛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-037-regular",
    "malayalamName": "തൈര് — സാധാരണ പാക്ക്",
    "englishName": "Curd — Regular pack",
    "brand": "Milma",
    "packSize": "Regular pack",
    "icon": "🥛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-037-value",
    "malayalamName": "തൈര് — വലിയ പാക്ക്",
    "englishName": "Curd — Value pack",
    "brand": "Milma",
    "packSize": "Value pack",
    "icon": "🥛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-038-regular",
    "malayalamName": "നെയ്യ് — സാധാരണ പാക്ക്",
    "englishName": "Ghee — Regular pack",
    "brand": "Milma",
    "packSize": "Regular pack",
    "icon": "🧈",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-038-value",
    "malayalamName": "നെയ്യ് — വലിയ പാക്ക്",
    "englishName": "Ghee — Value pack",
    "brand": "Milma",
    "packSize": "Value pack",
    "icon": "🧈",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-039-regular",
    "malayalamName": "പേഡ — സാധാരണ പാക്ക്",
    "englishName": "Peda — Regular pack",
    "brand": "Milma",
    "packSize": "Regular pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-039-value",
    "malayalamName": "പേഡ — വലിയ പാക്ക്",
    "englishName": "Peda — Value pack",
    "brand": "Milma",
    "packSize": "Value pack",
    "icon": "🍬",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-040-regular",
    "malayalamName": "വെണ്ണ — സാധാരണ പാക്ക്",
    "englishName": "Butter — Regular pack",
    "brand": "Amul",
    "packSize": "Regular pack",
    "icon": "🧈",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-040-value",
    "malayalamName": "വെണ്ണ — വലിയ പാക്ക്",
    "englishName": "Butter — Value pack",
    "brand": "Amul",
    "packSize": "Value pack",
    "icon": "🧈",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-041-regular",
    "malayalamName": "നെയ്യ് — സാധാരണ പാക്ക്",
    "englishName": "Ghee — Regular pack",
    "brand": "Amul",
    "packSize": "Regular pack",
    "icon": "🧈",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-041-value",
    "malayalamName": "നെയ്യ് — വലിയ പാക്ക്",
    "englishName": "Ghee — Value pack",
    "brand": "Amul",
    "packSize": "Value pack",
    "icon": "🧈",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-042-regular",
    "malayalamName": "പാൽ പൊടി — സാധാരണ പാക്ക്",
    "englishName": "Milk Powder — Regular pack",
    "brand": "Amul",
    "packSize": "Regular pack",
    "icon": "🥛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-042-value",
    "malayalamName": "പാൽ പൊടി — വലിയ പാക്ക്",
    "englishName": "Milk Powder — Value pack",
    "brand": "Amul",
    "packSize": "Value pack",
    "icon": "🥛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-043-regular",
    "malayalamName": "പനീർ — സാധാരണ പാക്ക്",
    "englishName": "Paneer — Regular pack",
    "brand": "Amul",
    "packSize": "Regular pack",
    "icon": "🧀",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-043-value",
    "malayalamName": "പനീർ — വലിയ പാക്ക്",
    "englishName": "Paneer — Value pack",
    "brand": "Amul",
    "packSize": "Value pack",
    "icon": "🧀",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-044-regular",
    "malayalamName": "ചീസ് — സാധാരണ പാക്ക്",
    "englishName": "Cheese — Regular pack",
    "brand": "Amul",
    "packSize": "Regular pack",
    "icon": "🧀",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-044-value",
    "malayalamName": "ചീസ് — വലിയ പാക്ക്",
    "englishName": "Cheese — Value pack",
    "brand": "Amul",
    "packSize": "Value pack",
    "icon": "🧀",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-045-regular",
    "malayalamName": "നൂഡിൽസ് — സാധാരണ പാക്ക്",
    "englishName": "Instant Noodles — Regular pack",
    "brand": "Maggi",
    "packSize": "Regular pack",
    "icon": "🍜",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-045-value",
    "malayalamName": "നൂഡിൽസ് — വലിയ പാക്ക്",
    "englishName": "Instant Noodles — Value pack",
    "brand": "Maggi",
    "packSize": "Value pack",
    "icon": "🍜",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-046-regular",
    "malayalamName": "ടൊമാറ്റോ കെച്ചപ്പ് — സാധാരണ പാക്ക്",
    "englishName": "Tomato Ketchup — Regular pack",
    "brand": "Maggi",
    "packSize": "Regular pack",
    "icon": "🍅",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-046-value",
    "malayalamName": "ടൊമാറ്റോ കെച്ചപ്പ് — വലിയ പാക്ക്",
    "englishName": "Tomato Ketchup — Value pack",
    "brand": "Maggi",
    "packSize": "Value pack",
    "icon": "🍅",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-047-regular",
    "malayalamName": "നൂഡിൽസ് — സാധാരണ പാക്ക്",
    "englishName": "Instant Noodles — Regular pack",
    "brand": "Sunfeast YiPPee!",
    "packSize": "Regular pack",
    "icon": "🍜",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-047-value",
    "malayalamName": "നൂഡിൽസ് — വലിയ പാക്ക്",
    "englishName": "Instant Noodles — Value pack",
    "brand": "Sunfeast YiPPee!",
    "packSize": "Value pack",
    "icon": "🍜",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-048-regular",
    "malayalamName": "ജാം — സാധാരണ പാക്ക്",
    "englishName": "Fruit Jam — Regular pack",
    "brand": "Kissan",
    "packSize": "Regular pack",
    "icon": "🍓",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-048-value",
    "malayalamName": "ജാം — വലിയ പാക്ക്",
    "englishName": "Fruit Jam — Value pack",
    "brand": "Kissan",
    "packSize": "Value pack",
    "icon": "🍓",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-049-regular",
    "malayalamName": "ടൊമാറ്റോ കെച്ചപ്പ് — സാധാരണ പാക്ക്",
    "englishName": "Tomato Ketchup — Regular pack",
    "brand": "Kissan",
    "packSize": "Regular pack",
    "icon": "🍅",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-049-value",
    "malayalamName": "ടൊമാറ്റോ കെച്ചപ്പ് — വലിയ പാക്ക്",
    "englishName": "Tomato Ketchup — Value pack",
    "brand": "Kissan",
    "packSize": "Value pack",
    "icon": "🍅",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-050-regular",
    "malayalamName": "ഉപ്പ് — സാധാരണ പാക്ക്",
    "englishName": "Iodised Salt — Regular pack",
    "brand": "Tata Salt",
    "packSize": "Regular pack",
    "icon": "🧂",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-050-value",
    "malayalamName": "ഉപ്പ് — വലിയ പാക്ക്",
    "englishName": "Iodised Salt — Value pack",
    "brand": "Tata Salt",
    "packSize": "Value pack",
    "icon": "🧂",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-051-regular",
    "malayalamName": "മഞ്ഞൾപ്പൊടി — സാധാരണ പാക്ക്",
    "englishName": "Turmeric Powder — Regular pack",
    "brand": "Tata Sampann",
    "packSize": "Regular pack",
    "icon": "🟡",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-051-value",
    "malayalamName": "മഞ്ഞൾപ്പൊടി — വലിയ പാക്ക്",
    "englishName": "Turmeric Powder — Value pack",
    "brand": "Tata Sampann",
    "packSize": "Value pack",
    "icon": "🟡",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-052-regular",
    "malayalamName": "പരിപ്പ് — സാധാരണ പാക്ക്",
    "englishName": "Dal / Pulses — Regular pack",
    "brand": "Tata Sampann",
    "packSize": "Regular pack",
    "icon": "🫘",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-052-value",
    "malayalamName": "പരിപ്പ് — വലിയ പാക്ക്",
    "englishName": "Dal / Pulses — Value pack",
    "brand": "Tata Sampann",
    "packSize": "Value pack",
    "icon": "🫘",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-053-regular",
    "malayalamName": "ചായപ്പൊടി — സാധാരണ പാക്ക്",
    "englishName": "Tea Powder — Regular pack",
    "brand": "Tata Tea",
    "packSize": "Regular pack",
    "icon": "🫖",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-053-value",
    "malayalamName": "ചായപ്പൊടി — വലിയ പാക്ക്",
    "englishName": "Tea Powder — Value pack",
    "brand": "Tata Tea",
    "packSize": "Value pack",
    "icon": "🫖",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-054-regular",
    "malayalamName": "റെഡ് ലേബൽ ചായ — സാധാരണ പാക്ക്",
    "englishName": "Red Label Tea — Regular pack",
    "brand": "Brooke Bond",
    "packSize": "Regular pack",
    "icon": "🫖",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-054-value",
    "malayalamName": "റെഡ് ലേബൽ ചായ — വലിയ പാക്ക്",
    "englishName": "Red Label Tea — Value pack",
    "brand": "Brooke Bond",
    "packSize": "Value pack",
    "icon": "🫖",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-055-regular",
    "malayalamName": "താജ് മഹൽ ചായ — സാധാരണ പാക്ക്",
    "englishName": "Taj Mahal Tea — Regular pack",
    "brand": "Brooke Bond",
    "packSize": "Regular pack",
    "icon": "🫖",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-055-value",
    "malayalamName": "താജ് മഹൽ ചായ — വലിയ പാക്ക്",
    "englishName": "Taj Mahal Tea — Value pack",
    "brand": "Brooke Bond",
    "packSize": "Value pack",
    "icon": "🫖",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-056-regular",
    "malayalamName": "ഇൻസ്റ്റന്റ് കാപ്പി — സാധാരണ പാക്ക്",
    "englishName": "Instant Coffee — Regular pack",
    "brand": "Nescafé",
    "packSize": "Regular pack",
    "icon": "☕",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-056-value",
    "malayalamName": "ഇൻസ്റ്റന്റ് കാപ്പി — വലിയ പാക്ക്",
    "englishName": "Instant Coffee — Value pack",
    "brand": "Nescafé",
    "packSize": "Value pack",
    "icon": "☕",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-057-regular",
    "malayalamName": "ഇൻസ്റ്റന്റ് കാപ്പി — സാധാരണ പാക്ക്",
    "englishName": "Instant Coffee — Regular pack",
    "brand": "Bru",
    "packSize": "Regular pack",
    "icon": "☕",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-057-value",
    "malayalamName": "ഇൻസ്റ്റന്റ് കാപ്പി — വലിയ പാക്ക്",
    "englishName": "Instant Coffee — Value pack",
    "brand": "Bru",
    "packSize": "Value pack",
    "icon": "☕",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-058-regular",
    "malayalamName": "ഹെൽത്ത് ഡ്രിങ്ക് — സാധാരണ പാക്ക്",
    "englishName": "Malt Drink — Regular pack",
    "brand": "Bournvita",
    "packSize": "Regular pack",
    "icon": "🥛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-058-value",
    "malayalamName": "ഹെൽത്ത് ഡ്രിങ്ക് — വലിയ പാക്ക്",
    "englishName": "Malt Drink — Value pack",
    "brand": "Bournvita",
    "packSize": "Value pack",
    "icon": "🥛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-059-regular",
    "malayalamName": "ഹെൽത്ത് ഡ്രിങ്ക് — സാധാരണ പാക്ക്",
    "englishName": "Malt Drink — Regular pack",
    "brand": "Horlicks",
    "packSize": "Regular pack",
    "icon": "🥛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-059-value",
    "malayalamName": "ഹെൽത്ത് ഡ്രിങ്ക് — വലിയ പാക്ക്",
    "englishName": "Malt Drink — Value pack",
    "brand": "Horlicks",
    "packSize": "Value pack",
    "icon": "🥛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-060-regular",
    "malayalamName": "ഹെൽത്ത് ഡ്രിങ്ക് — സാധാരണ പാക്ക്",
    "englishName": "Malt Drink — Regular pack",
    "brand": "Boost",
    "packSize": "Regular pack",
    "icon": "🥛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-060-value",
    "malayalamName": "ഹെൽത്ത് ഡ്രിങ്ക് — വലിയ പാക്ക്",
    "englishName": "Malt Drink — Value pack",
    "brand": "Boost",
    "packSize": "Value pack",
    "icon": "🥛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-061-regular",
    "malayalamName": "ഹെൽത്ത് ഡ്രിങ്ക് — സാധാരണ പാക്ക്",
    "englishName": "Malt Drink — Regular pack",
    "brand": "Complan",
    "packSize": "Regular pack",
    "icon": "🥛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-061-value",
    "malayalamName": "ഹെൽത്ത് ഡ്രിങ്ക് — വലിയ പാക്ക്",
    "englishName": "Malt Drink — Value pack",
    "brand": "Complan",
    "packSize": "Value pack",
    "icon": "🥛",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-062-regular",
    "malayalamName": "ഓട്സ് — സാധാരണ പാക്ക്",
    "englishName": "Oats — Regular pack",
    "brand": "Quaker",
    "packSize": "Regular pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-062-value",
    "malayalamName": "ഓട്സ് — വലിയ പാക്ക്",
    "englishName": "Oats — Value pack",
    "brand": "Quaker",
    "packSize": "Value pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-063-regular",
    "malayalamName": "കോൺ ഫ്ലേക്സ് — സാധാരണ പാക്ക്",
    "englishName": "Corn Flakes — Regular pack",
    "brand": "Kellogg's",
    "packSize": "Regular pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-063-value",
    "malayalamName": "കോൺ ഫ്ലേക്സ് — വലിയ പാക്ക്",
    "englishName": "Corn Flakes — Value pack",
    "brand": "Kellogg's",
    "packSize": "Value pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-064-regular",
    "malayalamName": "ഇഡ്ഡലി മിക്സ് — സാധാരണ പാക്ക്",
    "englishName": "Idli Mix — Regular pack",
    "brand": "MTR",
    "packSize": "Regular pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-064-value",
    "malayalamName": "ഇഡ്ഡലി മിക്സ് — വലിയ പാക്ക്",
    "englishName": "Idli Mix — Value pack",
    "brand": "MTR",
    "packSize": "Value pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-065-regular",
    "malayalamName": "ദോശ മിക്സ് — സാധാരണ പാക്ക്",
    "englishName": "Dosa Mix — Regular pack",
    "brand": "MTR",
    "packSize": "Regular pack",
    "icon": "🥞",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-065-value",
    "malayalamName": "ദോശ മിക്സ് — വലിയ പാക്ക്",
    "englishName": "Dosa Mix — Value pack",
    "brand": "MTR",
    "packSize": "Value pack",
    "icon": "🥞",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-066-regular",
    "malayalamName": "റവ ഇഡ്ഡലി മിക്സ് — സാധാരണ പാക്ക്",
    "englishName": "Rava Idli Mix — Regular pack",
    "brand": "MTR",
    "packSize": "Regular pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-066-value",
    "malayalamName": "റവ ഇഡ്ഡലി മിക്സ് — വലിയ പാക്ക്",
    "englishName": "Rava Idli Mix — Value pack",
    "brand": "MTR",
    "packSize": "Value pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-067-regular",
    "malayalamName": "സാമ്പാർ പൊടി — സാധാരണ പാക്ക്",
    "englishName": "Sambar Powder — Regular pack",
    "brand": "MTR",
    "packSize": "Regular pack",
    "icon": "🍲",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-067-value",
    "malayalamName": "സാമ്പാർ പൊടി — വലിയ പാക്ക്",
    "englishName": "Sambar Powder — Value pack",
    "brand": "MTR",
    "packSize": "Value pack",
    "icon": "🍲",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-068-regular",
    "malayalamName": "ആട്ട — സാധാരണ പാക്ക്",
    "englishName": "Wheat Atta — Regular pack",
    "brand": "24 Mantra Organic",
    "packSize": "Regular pack",
    "icon": "🌾",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-068-value",
    "malayalamName": "ആട്ട — വലിയ പാക്ക്",
    "englishName": "Wheat Atta — Value pack",
    "brand": "24 Mantra Organic",
    "packSize": "Value pack",
    "icon": "🌾",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-069-regular",
    "malayalamName": "സൺഫ്ലവർ ഓയിൽ — സാധാരണ പാക്ക്",
    "englishName": "Sunflower Oil — Regular pack",
    "brand": "Fortune",
    "packSize": "Regular pack",
    "icon": "🧴",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-069-value",
    "malayalamName": "സൺഫ്ലവർ ഓയിൽ — വലിയ പാക്ക്",
    "englishName": "Sunflower Oil — Value pack",
    "brand": "Fortune",
    "packSize": "Value pack",
    "icon": "🧴",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-070-regular",
    "malayalamName": "റൈസ് ബ്രാൻ ഓയിൽ — സാധാരണ പാക്ക്",
    "englishName": "Rice Bran Oil — Regular pack",
    "brand": "Fortune",
    "packSize": "Regular pack",
    "icon": "🧴",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-070-value",
    "malayalamName": "റൈസ് ബ്രാൻ ഓയിൽ — വലിയ പാക്ക്",
    "englishName": "Rice Bran Oil — Value pack",
    "brand": "Fortune",
    "packSize": "Value pack",
    "icon": "🧴",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-071-regular",
    "malayalamName": "റിഫൈൻഡ് ഓയിൽ — സാധാരണ പാക്ക്",
    "englishName": "Refined Oil — Regular pack",
    "brand": "Saffola",
    "packSize": "Regular pack",
    "icon": "🧴",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-071-value",
    "malayalamName": "റിഫൈൻഡ് ഓയിൽ — വലിയ പാക്ക്",
    "englishName": "Refined Oil — Value pack",
    "brand": "Saffola",
    "packSize": "Value pack",
    "icon": "🧴",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-072-regular",
    "malayalamName": "ഓട്സ് — സാധാരണ പാക്ക്",
    "englishName": "Oats — Regular pack",
    "brand": "Saffola",
    "packSize": "Regular pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-072-value",
    "malayalamName": "ഓട്സ് — വലിയ പാക്ക്",
    "englishName": "Oats — Value pack",
    "brand": "Saffola",
    "packSize": "Value pack",
    "icon": "🥣",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-073-regular",
    "malayalamName": "സൺഫ്ലവർ ഓയിൽ — സാധാരണ പാക്ക്",
    "englishName": "Sunflower Oil — Regular pack",
    "brand": "Gold Winner",
    "packSize": "Regular pack",
    "icon": "🧴",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-073-value",
    "malayalamName": "സൺഫ്ലവർ ഓയിൽ — വലിയ പാക്ക്",
    "englishName": "Sunflower Oil — Value pack",
    "brand": "Gold Winner",
    "packSize": "Value pack",
    "icon": "🧴",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-074-regular",
    "malayalamName": "കോക്ക കോള — സാധാരണ പാക്ക്",
    "englishName": "Cola Drink — Regular pack",
    "brand": "Coca-Cola",
    "packSize": "Regular pack",
    "icon": "🥤",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-074-value",
    "malayalamName": "കോക്ക കോള — വലിയ പാക്ക്",
    "englishName": "Cola Drink — Value pack",
    "brand": "Coca-Cola",
    "packSize": "Value pack",
    "icon": "🥤",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-075-regular",
    "malayalamName": "പെപ്സി — സാധാരണ പാക്ക്",
    "englishName": "Cola Drink — Regular pack",
    "brand": "Pepsi",
    "packSize": "Regular pack",
    "icon": "🥤",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-075-value",
    "malayalamName": "പെപ്സി — വലിയ പാക്ക്",
    "englishName": "Cola Drink — Value pack",
    "brand": "Pepsi",
    "packSize": "Value pack",
    "icon": "🥤",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-076-regular",
    "malayalamName": "സ്പ്രൈറ്റ് — സാധാരണ പാക്ക്",
    "englishName": "Lemon-Lime Drink — Regular pack",
    "brand": "Sprite",
    "packSize": "Regular pack",
    "icon": "🥤",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-076-value",
    "malayalamName": "സ്പ്രൈറ്റ് — വലിയ പാക്ക്",
    "englishName": "Lemon-Lime Drink — Value pack",
    "brand": "Sprite",
    "packSize": "Value pack",
    "icon": "🥤",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-077-regular",
    "malayalamName": "സെവൻ അപ്പ് — സാധാരണ പാക്ക്",
    "englishName": "Lemon-Lime Drink — Regular pack",
    "brand": "7UP",
    "packSize": "Regular pack",
    "icon": "🥤",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-077-value",
    "malayalamName": "സെവൻ അപ്പ് — വലിയ പാക്ക്",
    "englishName": "Lemon-Lime Drink — Value pack",
    "brand": "7UP",
    "packSize": "Value pack",
    "icon": "🥤",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-078-regular",
    "malayalamName": "മാങ്ങാ ഡ്രിങ്ക് — സാധാരണ പാക്ക്",
    "englishName": "Mango Drink — Regular pack",
    "brand": "Frooti",
    "packSize": "Regular pack",
    "icon": "🧃",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-078-value",
    "malayalamName": "മാങ്ങാ ഡ്രിങ്ക് — വലിയ പാക്ക്",
    "englishName": "Mango Drink — Value pack",
    "brand": "Frooti",
    "packSize": "Value pack",
    "icon": "🧃",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-079-regular",
    "malayalamName": "മാങ്ങാ ഡ്രിങ്ക് — സാധാരണ പാക്ക്",
    "englishName": "Mango Drink — Regular pack",
    "brand": "Maaza",
    "packSize": "Regular pack",
    "icon": "🧃",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-079-value",
    "malayalamName": "മാങ്ങാ ഡ്രിങ്ക് — വലിയ പാക്ക്",
    "englishName": "Mango Drink — Value pack",
    "brand": "Maaza",
    "packSize": "Value pack",
    "icon": "🧃",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-080-regular",
    "malayalamName": "മാങ്ങാ ഡ്രിങ്ക് — സാധാരണ പാക്ക്",
    "englishName": "Mango Drink — Regular pack",
    "brand": "Slice",
    "packSize": "Regular pack",
    "icon": "🧃",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-080-value",
    "malayalamName": "മാങ്ങാ ഡ്രിങ്ക് — വലിയ പാക്ക്",
    "englishName": "Mango Drink — Value pack",
    "brand": "Slice",
    "packSize": "Value pack",
    "icon": "🧃",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-081-regular",
    "malayalamName": "ഫ്രൂട്ട് ജ്യൂസ് — സാധാരണ പാക്ക്",
    "englishName": "Fruit Juice — Regular pack",
    "brand": "Real",
    "packSize": "Regular pack",
    "icon": "🧃",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-081-value",
    "malayalamName": "ഫ്രൂട്ട് ജ്യൂസ് — വലിയ പാക്ക്",
    "englishName": "Fruit Juice — Value pack",
    "brand": "Real",
    "packSize": "Value pack",
    "icon": "🧃",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-082-regular",
    "malayalamName": "ഫ്രൂട്ട് ജ്യൂസ് — സാധാരണ പാക്ക്",
    "englishName": "Fruit Juice — Regular pack",
    "brand": "B Natural",
    "packSize": "Regular pack",
    "icon": "🧃",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-082-value",
    "malayalamName": "ഫ്രൂട്ട് ജ്യൂസ് — വലിയ പാക്ക്",
    "englishName": "Fruit Juice — Value pack",
    "brand": "B Natural",
    "packSize": "Value pack",
    "icon": "🧃",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-083-regular",
    "malayalamName": "മിനറൽ വാട്ടർ — സാധാരണ പാക്ക്",
    "englishName": "Packaged Water — Regular pack",
    "brand": "Bisleri",
    "packSize": "Regular pack",
    "icon": "💧",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-083-value",
    "malayalamName": "മിനറൽ വാട്ടർ — വലിയ പാക്ക്",
    "englishName": "Packaged Water — Value pack",
    "brand": "Bisleri",
    "packSize": "Value pack",
    "icon": "💧",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-084-regular",
    "malayalamName": "കുടിവെള്ളം — സാധാരണ പാക്ക്",
    "englishName": "Packaged Water — Regular pack",
    "brand": "Kinley",
    "packSize": "Regular pack",
    "icon": "💧",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-084-value",
    "malayalamName": "കുടിവെള്ളം — വലിയ പാക്ക്",
    "englishName": "Packaged Water — Value pack",
    "brand": "Kinley",
    "packSize": "Value pack",
    "icon": "💧",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-085-regular",
    "malayalamName": "കുടിവെള്ളം — സാധാരണ പാക്ക്",
    "englishName": "Packaged Water — Regular pack",
    "brand": "Aquafina",
    "packSize": "Regular pack",
    "icon": "💧",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  },
  {
    "id": "kerala-v5-grocery-085-value",
    "malayalamName": "കുടിവെള്ളം — വലിയ പാക്ക്",
    "englishName": "Packaged Water — Value pack",
    "brand": "Aquafina",
    "packSize": "Value pack",
    "icon": "💧",
    "unit": "pcs",
    "category": "Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്"
  }
] as const;
