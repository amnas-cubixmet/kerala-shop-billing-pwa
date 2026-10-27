import type { Unit } from '@/types/models';

/** Common vegetable-shop items in Kerala. Names/icons are editable; prices are deliberately NOT guessed. */
export interface VegetablePreset {
  id: string;
  name: string;
  icon: string;
  unit: Unit;
}
const catalog: ReadonlyArray<readonly [string, string, Unit]> = [
  ['തക്കാളി / Tomato', '🍅', 'kg'],
  ['സവാള / Onion', '🧅', 'kg'],
  ['ചെറിയ ഉള്ളി / Shallot', '🧅', 'kg'],
  ['ഉരുളക്കിഴങ്ങ് / Potato', '🥔', 'kg'],
  ['കാരറ്റ് / Carrot', '🥕', 'kg'],
  ['ബീറ്റ്റൂട്ട് / Beetroot', '🫜', 'kg'],
  ['കാബേജ് / Cabbage', '🥬', 'kg'],
  ['കോളിഫ്ലവർ / Cauliflower', '🥦', 'kg'],
  ['പച്ചമുളക് / Green Chilli', '🌶️', 'kg'],
  ['കാപ്സിക്കം / Capsicum', '🫑', 'kg'],
  ['വെണ്ടയ്ക്ക / Okra', '🌱', 'kg'],
  ['വഴുതന / Brinjal', '🍆', 'kg'],
  ['പാവയ്ക്ക / Bitter Gourd', '🥒', 'kg'],
  ['പടവലങ്ങ / Snake Gourd', '🥒', 'kg'],
  ['പീച്ചിങ്ങ / Ridge Gourd', '🥒', 'kg'],
  ['ചുരയ്ക്ക / Bottle Gourd', '🥒', 'kg'],
  ['വെള്ളരിക്ക / Cucumber', '🥒', 'kg'],
  ['കണിവെള്ളരി / Yellow Cucumber', '🥒', 'kg'],
  ['കുമ്പളങ്ങ / Ash Gourd', '🎃', 'kg'],
  ['മത്തങ്ങ / Pumpkin', '🎃', 'kg'],
  ['കോവയ്ക്ക / Ivy Gourd', '🥒', 'kg'],
  ['ഫ്രഞ്ച് ബീൻസ് / French Beans', '🫛', 'kg'],
  ['നീളൻപയർ / Yardlong Beans', '🫛', 'kg'],
  ['വാളൻപയർ / Hyacinth Beans', '🫛', 'kg'],
  ['മുരിങ്ങക്കായ / Drumstick', '🌿', 'kg'],
  ['കപ്പ / Tapioca', '🥔', 'kg'],
  ['ചേന / Elephant Foot Yam', '🥔', 'kg'],
  ['ചേമ്പ് / Taro', '🥔', 'kg'],
  ['കൂർക്ക / Chinese Potato', '🥔', 'kg'],
  ['മധുരക്കിഴങ്ങ് / Sweet Potato', '🍠', 'kg'],
  ['കാച്ചിൽ / Greater Yam', '🍠', 'kg'],
  ['ഇഞ്ചി / Ginger', '🫚', 'kg'],
  ['വെളുത്തുള്ളി / Garlic', '🧄', 'kg'],
  ['പച്ചമഞ്ഞൾ / Fresh Turmeric', '🫚', 'kg'],
  ['മല്ലിയില / Coriander Leaves', '🌿', 'bundle'],
  ['കറിവേപ്പില / Curry Leaves', '🌿', 'bundle'],
  ['പുതിന / Mint Leaves', '🌿', 'bundle'],
  ['ചീര / Amaranth Greens', '🥬', 'bundle'],
  ['പാലക് / Spinach', '🥬', 'bundle'],
  ['ഉലുവയില / Fenugreek Greens', '🥬', 'bundle'],
  ['പച്ച ഏത്തക്കായ / Raw Plantain', '🍌', 'kg'],
  ['വാഴപ്പിണ്ടി / Banana Stem', '🌴', 'pcs'],
  ['വാഴക്കൂമ്പ് / Banana Flower', '🌺', 'pcs'],
  ['കൂൺ / Mushroom', '🍄', 'kg'],
  ['ബ്രോക്കോളി / Broccoli', '🥦', 'kg'],
  ['പച്ച പപ്പായ / Raw Papaya', '🍈', 'kg'],
  ['ഇടിച്ചക്ക / Tender Jackfruit', '🍈', 'kg'],
  ['മധുരച്ചോളം / Sweet Corn', '🌽', 'pcs'],
  ['പച്ചപീസ് / Green Peas', '🫛', 'kg'],
  ['മുള്ളങ്കി / Radish', '🥕', 'kg'],
];

export const KERALA_VEGETABLES: ReadonlyArray<VegetablePreset> = catalog.map(([name, icon, unit], i) => ({
  id: `kerala-veg-${String(i + 1).padStart(3, '0')}`,
  name, icon, unit,
}));
