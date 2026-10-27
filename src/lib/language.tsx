'use client';
import {createContext, useContext, useEffect, useMemo, useState, type ReactNode} from 'react';
import type {Product} from '@/types/models';

export type Language = 'ml' | 'en';
const LANGUAGE_KEY = 'ksb:language-v1';
const texts: Record<string, [string,string]> = {
  dashboard:['Dashboard','ഡാഷ്ബോർഡ്'], billing:['Record Sale','വിൽപ്പന'], products:['Products','സാധനങ്ങൾ'],
  expenses:['Expenses','ചെലവുകൾ'], reports:['Sales Reports','വിൽപ്പന റിപ്പോർട്ട്'], settings:['Settings & Backup','ക്രമീകരണങ്ങളും ബാക്കപ്പും'],
  home:['Home','ഹോം'], sale:['Sale','വിൽപ്പന'], more:['More','കൂടുതൽ'], online:['Online','ഓൺലൈൻ'],offline:['Offline','ഓഫ്‌ലൈൻ'],
  newSale:['New Sale','പുതിയ വിൽപ്പന'],
  welcome:['Welcome back!','നമസ്കാരം!'], welcomeSub:['Track your shop sales and expenses today.','ഇന്നത്തെ വിൽപ്പനയും ചെലവും ഇവിടെ അറിയാം.'],
  todaySales:["Today's sales",'ഇന്നത്തെ വിൽപ്പന'], todayExpenses:["Today's expenses",'ഇന്നത്തെ ചെലവ്'],
  todayCount:['Sales today','ഇന്നത്തെ വിൽപ്പനകൾ'], monthlySales:['Monthly sales','മാസത്തെ വിൽപ്പന'],
  todayBalance:['Sales less expenses today*','ഇന്നത്തെ വിൽപ്പന − ചെലവ്*'], cashflowNote:['* This is not accounting profit.','* ഇത് യഥാർത്ഥ ലാഭക്കണക്കല്ല.'],
  recentSales:['Recent sales','അവസാന വിൽപ്പനകൾ'],
  storedHere:['Saved on this phone','ഈ ഫോണിൽ സേവ് ചെയ്തു'], seeReports:['See reports','റിപ്പോർട്ട് കാണുക'],
  noSales:['No sales recorded yet.','ഇതുവരെ വിൽപ്പന രേഖപ്പെടുത്തിയിട്ടില്ല.'],
  backupReminder:['Download backups regularly. Clearing browser storage may erase your records.','ഇടയ്ക്കിടെ ബാക്കപ്പ് എടുക്കുക. ബ്രൗസർ സ്റ്റോറേജ് നീക്കിയാൽ ഡാറ്റ നഷ്ടപ്പെടാം.'],
  recordSale:['Record Sale','വിൽപ്പന സേവ് ചെയ്യുക'], saleIntro:['Record each sale to track daily totals. Printing a receipt is optional.','ദിവസത്തെ കച്ചവടക്കണക്ക് സൂക്ഷിക്കാം. ബിൽ കൊടുക്കണമെന്നില്ല.'],
  localSave:['Saved locally','ഫോണിൽ സേവ് ചെയ്യും'], saleSaved:['Sale saved','വിൽപ്പന സേവ് ചെയ്തു'],
  receiptOptional:['Receipt PDF (optional)','ബിൽ PDF (വേണമെങ്കിൽ മാത്രം)'],
  selectProducts:['Select products','സാധനങ്ങൾ തിരഞ്ഞെടുക്കുക'], selectHint:['Tap to add to this sale','വിൽപ്പനയിലേക്ക് ചേർക്കാൻ അമർത്തുക'],
  findProduct:['Find product / barcode','സാധനം / ബാർകോഡ് തിരയുക'], noProducts:['No products ready for sale. Add a product or set its selling price.','വിൽപ്പനയ്ക്ക് സാധനങ്ങളില്ല. സാധനം ചേർക്കുക അല്ലെങ്കിൽ വില നൽകുക.'],
  currentSale:['Current sale','ഇപ്പോഴത്തെ വിൽപ്പന'], cartEmpty:['Choose a product to start.','തുടങ്ങാൻ ഒരു സാധനം തിരഞ്ഞെടുക്കുക.'],
  discount:['Discount (₹)','കിഴിവ് (₹)'], payment:['Payment','പേയ്‌മെന്റ്'], cash:['Cash','പണം'], upi:['UPI','യുപിഐ'], card:['Card','കാർഡ്'], other:['Other','മറ്റുള്ളവ'],unpaid:['Unpaid','ബാക്കി'],
  subtotal:['Subtotal','ആകെ'], tax:['GST','ജി.എസ്.ടി'], total:['Total','മൊത്തം'], saving:['Saving…','സേവ് ചെയ്യുന്നു…'],
  saveAndPdf:['Save & download bill','സേവ് ചെയ്ത് ബിൽ എടുക്കുക'], receiptHint:['Every sale is saved in daily reports, even without printing a bill.','ബിൽ പ്രിന്റ് ചെയ്യാതെ സേവ് ചെയ്താലും ദിവസത്തെ കണക്കിൽ വരും.'],
  productCatalog:['Products','സാധനങ്ങൾ'], productsIntro:['Ready-made catalog and your own products. Stored on this phone.','റെഡി-മെയ്ഡ് സാധനങ്ങളും സ്വന്തമായി ചേർക്കുന്ന സാധനങ്ങളും ഈ ഫോണിൽ സൂക്ഷിക്കും.'],
  addProduct:['Add product','സാധനം ചേർക്കുക'], editProduct:['Edit product','സാധനം മാറ്റുക'],
  chooseFromCatalog:['Choose from catalog','Catalog-ൽ നിന്ന് തിരഞ്ഞെടുക്കുക'],
  addCustomProduct:['New product','പുതിയ സാധനം'],
  catalogSelectionHint:['Choose only the items your shop sells.','നിങ്ങളുടെ കടയിലുള്ള സാധനങ്ങൾ മാത്രം തിരഞ്ഞെടുക്കുക.'],
  catalogSelectionExplanation:['Select one or more products, then Add to My Shop. Set your own selling price afterward. No unwanted products are imported.','ഒന്നോ പലതോ സാധനങ്ങൾ തിരഞ്ഞെടുത്ത് എന്റെ കടയിലേക്ക് ചേർക്കുക. ശേഷം നിങ്ങളുടെ വില നൽകാം. തിരഞ്ഞെടുക്കാത്തവ ചേർക്കില്ല.'],
  catalogSearch:['Search 850 products (Malayalam / English)','850 സാധനങ്ങളിൽ തിരയുക (മലയാളം / English)'],
  addSelectedToShop:['Add to My Shop','എന്റെ കടയിലേക്ക് ചേർക്കുക'],
  customProductHint:['Not in catalog? Add your own.','Catalog-ൽ ഇല്ലെങ്കിൽ സ്വന്തമായി ചേർക്കാം.'],
  emptyMyShopHint:['Choose products from the catalog or add your own item.','Catalog-ൽ നിന്ന് സാധനങ്ങൾ തിരഞ്ഞെടുക്കുക, അല്ലെങ്കിൽ സ്വന്തമായി ചേർക്കുക.'],
  localPrivacy:['Your new products, images and prices stay in this device’s IndexedDB. Take backups.','പുതിയ സാധനങ്ങൾ, ചിത്രം, വില എന്നിവ ഈ ഫോണിൽ മാത്രം. ബാക്കപ്പ് എടുക്കണം.'],
  addAll:['Add all 850 products','850 സാധനങ്ങൾ ചേർക്കുക'], alreadyAdded:['Already added','ചേർത്തു'], add:['Add','ചേർക്കുക'],
  csvTools:['Import products (CSV)','CSV വഴി സാധനങ്ങൾ ചേർക്കുക'], csvIntro:['CSV import supports Malayalam and English, but manually adding a product requires only the selected language.','CSV-യിൽ രണ്ടുഭാഷയും ഉപയോഗിക്കാം; പുതിയ സാധനം നേരിട്ട് ചേർക്കാൻ തിരഞ്ഞെടുത്ത ഭാഷയിലെ പേര് മാത്രം മതി.'],
  importCsv:['Import CSV','CSV ചേർക്കുക'], template:['CSV Template','CSV മാതൃക'],
  productName:['Product name','സാധനത്തിന്റെ പേര്'], nameHint:['Only one name is required, in the selected language.','തിരഞ്ഞെടുത്ത ഭാഷയിലെ ഒരു പേര് മാത്രം മതി.'],
  englishName:['English name','ഇംഗ്ലീഷ് പേര്'], malayalamName:['Malayalam name','മലയാളം പേര്'], brand:['Brand (optional)','ബ്രാൻഡ് (ആവശ്യമെങ്കിൽ)'],
  pack:['Pack / Variant','പാക്കറ്റ് / തരം'], category:['Category','വിഭാഗം'], image:['Product photo','സാധനത്തിന്റെ ചിത്രം'], icon:['Fallback emoji','പകരം ഐക്കൺ'],
  uploadImage:['Upload image','ചിത്രം ചേർക്കുക'], remove:['Remove','നീക്കുക'], unit:['Unit','അളവ്'], sellingPrice:['Selling price (₹)','വിൽപ്പന വില (₹)'],
  buyingPrice:['Buying price (₹)','വാങ്ങിയ വില (₹)'],
  taxRate:['Tax rate','നികുതി നിരക്ക്'], barcode:['Barcode / SKU (optional)','ബാർകോഡ് / SKU (ആവശ്യമെങ്കിൽ)'],
  saveProduct:['Save product','സാധനം സേവ് ചെയ്യുക'], cancel:['Cancel','റദ്ദാക്കുക'], myProducts:['My products','എന്റെ സാധനങ്ങൾ'],
  searchProducts:['Search products','സാധനങ്ങൾ തിരയുക'], all:['All','എല്ലാം'], mine:['My own','ഞാൻ ചേർത്തത്'], bakery:['Bakery','ബേക്കറി'],
  sweets:['Sweets','മിഠായികൾ'], fruits:['Fruits','പഴങ്ങൾ'], vegetables:['Vegetables','പച്ചക്കറി'], foods:['Foods','പലചരക്ക്'], branded:['Branded','ബ്രാൻഡുകൾ'],
  price:['Price','വില'], actions:['Actions','നടപടികൾ'], status:['Status','നില'], active:['Active','സജീവം'], inactive:['Inactive','നിർത്തി'],
  myLocal:['My local','എന്റെ ഫോണിൽ'], reportMonth:['Month','മാസം'], reportDate:['Date','തീയതി'], daily:['Daily','ദിവസം'], monthly:['Monthly','മാസം'],
  reportIntro:['Track sales and expenses, with no customer details required.','കസ്റ്റമർ വിവരങ്ങളില്ലാതെ വിൽപ്പനയും ചെലവും അറിയാം.'],
  salesCsv:['Sales CSV','വിൽപ്പന CSV'], salesEntries:['Sales entries','വിൽപ്പന എണ്ണം'], collected:['Collected','ലഭിച്ചത്'],
  outstanding:['Unpaid','ബാക്കി'], salesHistory:['Sales history','വിൽപ്പന വിവരങ്ങൾ'], showVoided:['Show cancelled sales','റദ്ദാക്കിയതും കാണിക്കുക'],
  cancelSale:['Cancel sale','വിൽപ്പന റദ്ദാക്കുക'], noSalesPeriod:['No sales for this period.','ഈ കാലയളവിൽ വിൽപ്പനയില്ല.'],
  monthExpenses:['Expenses','ചെലവുകൾ'], expenseIntro:['Record shop expenses, without customer details.','കടയുടെ ചെലവുകൾ മാത്രം രേഖപ്പെടുത്തുക.'],
  monthTotal:['This month','ഈ മാസം'], entries:['Entries','എൻട്രികൾ'], addExpense:['Add expense','ചെലവ് ചേർക്കുക'],
  amount:['Amount (₹)','തുക (₹)'], notes:['Notes','കുറിപ്പ്'], saveExpense:['Save expense','ചെലവ് സേവ് ചെയ്യുക'], expenseHistory:['Expense history','ചെലവുകളുടെ വിവരങ്ങൾ'],
  settingsIntro:['Shop settings and local backup.','കടയുടെ വിവരങ്ങളും ബാക്കപ്പും.'], shopInfo:['Shop information','കടയുടെ വിവരങ്ങൾ'],
  shopName:['Shop name','കടയുടെ പേര്'], phone:['Phone','ഫോൺ'], address:['Address','വിലാസം'],gstin:['GSTIN (if applicable)','GSTIN (ഉണ്ടെങ്കിൽ)'],
  saveSettings:['Save settings','ക്രമീകരണം സേവ് ചെയ്യുക'], backupTitle:['Backup to phone','ഫോണിലേക്ക് ബാക്കപ്പ്'], downloadBackup:['Download backup','ബാക്കപ്പ് ഡൗൺലോഡ്'],
  restoreTitle:['Restore backup','ബാക്കപ്പ് തിരികെ കൊണ്ടുവരുക'], restoreButton:['Restore JSON backup','JSON ബാക്കപ്പ് പുനഃസ്ഥാപിക്കുക'],
  storage:['Storage & offline','സ്റ്റോറേജും ഓഫ്‌ലൈനും'],offlinePhotos:['Offline product photos','ഓഫ്‌ലൈൻ ഉൽപ്പന്ന ചിത്രങ്ങൾ'],
  restoreWarning:['Restoring a backup replaces existing local shop data.','ബാക്കപ്പ് പുനഃസ്ഥാപിച്ചാൽ നിലവിലെ കടയുടെ വിവരങ്ങൾ മാറും.'],
  langToggle:['App language','ആപ്പിന്റെ ഭാഷ'],
};

type LanguageContextValue={language:Language;setLanguage:(lang:Language)=>void;t:(key:string)=>string;productName:(p:Pick<Product,'name'|'malayalamName'|'englishName'>)=>string;categoryName:(value:string)=>string};
const Context=createContext<LanguageContextValue|undefined>(undefined);
export function LanguageProvider({children}:{children:ReactNode}){
  const [language,setLanguage]=useState<Language>('en');
  useEffect(()=>{try{if(localStorage.getItem(LANGUAGE_KEY)==='ml')setLanguage('ml')}catch{}},[]);
  useEffect(()=>{try{localStorage.setItem(LANGUAGE_KEY,language);document.documentElement.lang=language;}catch{}},[language]);
  const value=useMemo<LanguageContextValue>(()=>({language,setLanguage,
    t:key=>texts[key]?.[language==='en'?0:1]??key,
    productName:p=>{
      const [mlPart,...enParts]=p.name.split(' / ');
      const preferred=language==='ml'?(p.malayalamName||((enParts.length&&/[\u0D00-\u0D7F]/.test(mlPart))?mlPart:'')):(p.englishName||(enParts.length?enParts.join(' / '):''));
      return preferred||p.malayalamName||p.englishName||p.name;
    },
    categoryName:s=>{const parts=s.split(' / ');return (language==='ml'?parts[1]:parts[0])||s;}
  }),[language]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useLanguage(){const ctx=useContext(Context);if(!ctx)throw new Error('Missing LanguageProvider');return ctx;}
