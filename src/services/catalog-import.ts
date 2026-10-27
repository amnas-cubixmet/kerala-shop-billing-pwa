import { db } from '@/db/database';
import { rupeeToPaise, unitsToMilli } from '@/lib/money';
import type { Product, Unit, StockMovement } from '@/types/models';

/** Basic RFC 4180 comma-separated reader; supports quotes, commas and newlines in cells. */
export function parseCsv(source: string): string[][] {
  const text = source.replace(/^\uFEFF/, '');
  const rows:string[][]=[]; let row:string[]=[]; let cell=''; let quoted=false;
  for(let i=0;i<text.length;i++) {
    const c=text[i];
    if(quoted){if(c==='"' && text[i+1]==='"'){cell+='"';i++;}else if(c==='"'){quoted=false;}else cell+=c;}
    else if(c==='"'){if(cell)throw new Error('Malformed CSV quote.');quoted=true;}
    else if(c===','){row.push(cell);cell='';}
    else if(c==='\n'||c==='\r'){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);cell='';if(row.some(v=>v.trim()))rows.push(row);row=[];}
    else cell+=c;
  }
  if(quoted)throw new Error('Unclosed CSV quote.');
  row.push(cell);if(row.some(v=>v.trim()))rows.push(row);
  return rows;
}

export const PRODUCT_CSV_HEADER = 'malayalamName,englishName,category,unit,price,stock,icon,brand,packSize';
const OLD_CSV_HEADER = 'malayalamName,englishName,category,unit,price,stock,icon';
export function downloadCsvTemplate(): void {
  const demo = PRODUCT_CSV_HEADER+'\r\n'+'പഴം,Example Fruit,Fruits / പഴങ്ങൾ,kg,50,12,🍌,,\r\n';
  const url=URL.createObjectURL(new Blob(['\uFEFF'+demo],{type:'text/csv;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='shop-products-import-template.csv';a.click();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
}

export async function importProductCsv(file:File): Promise<number> {
  if(file.size>512*1024)throw new Error('CSV cannot exceed 512 KB per import.');
  const rows=parseCsv(await file.text());
  const header=rows.shift()?.map(v=>v.trim());
  if(!header || ![PRODUCT_CSV_HEADER, OLD_CSV_HEADER].includes(header.join(',')))throw new Error(`CSV header must be: ${PRODUCT_CSV_HEADER} (older 7-column CSV also supported)`);
  if(!rows.length || rows.length>1000)throw new Error('Add 1 to 1000 products per CSV.');
  const now=new Date().toISOString();
  const batch:Product[]=[];
  const seen=new Set<string>();
  for (const [index,r] of rows.entries()) {
    if(r.length!==header.length)throw new Error(`Row ${index+2}: expected ${header.length} columns.`);
    const [ml,en,category,rawUnit,price,stock,icon,brand='',packSize='']=r.map(v=>v.trim());
    if(!ml&&!en)throw new Error(`Row ${index+2}: add Malayalam or English name.`);
    if([ml,en,category,brand,packSize].some(x=>x.length>100))throw new Error(`Row ${index+2}: name/category too long.`);
    if(!['kg','pcs','bundle','ltr','m'].includes(rawUnit))throw new Error(`Row ${index+2}: invalid unit.`);
    const key=`${ml.toLowerCase()}|${en.toLowerCase()}|${category.toLowerCase()}|${brand.toLowerCase()}|${packSize.toLowerCase()}`;
    if(seen.has(key))throw new Error(`Row ${index+2}: duplicate product in CSV.`);
    seen.add(key);
    const pricePaise=rupeeToPaise(price||'0');
    const stockMilli=unitsToMilli(stock||'0');
    batch.push({id:crypto.randomUUID(),name:[ml,en].filter(Boolean).join(' / '),malayalamName:ml,englishName:en,
      source:'custom',brand,packSize,icon:icon.slice(0,16)||'📦',imageDataUrl:'',isTemplate:pricePaise===0,
      sku:'',category:category||'General / മറ്റു സാധനങ്ങൾ',unit:rawUnit as Unit,pricePaise,costPaise:0,taxBps:0,
      stockMilli,lowStockMilli:0,active:pricePaise>0,createdAt:now,updatedAt:now});
  }
  // Import is local-only and never contacts a server. Exact duplicates already on this device are skipped.
  return db.transaction('rw',db.products,db.stockMovements,async()=>{
    const existing=await db.products.toArray();
    const seenExisting=new Set(existing.map(p=>`${(p.malayalamName||'').toLowerCase()}|${(p.englishName||'').toLowerCase()}|${p.category.toLowerCase()}|${(p.brand||'').toLowerCase()}|${(p.packSize||'').toLowerCase()}`));
    const filtered=batch.filter(p=>!seenExisting.has(`${p.malayalamName!.toLowerCase()}|${p.englishName!.toLowerCase()}|${p.category.toLowerCase()}|${(p.brand||'').toLowerCase()}|${(p.packSize||'').toLowerCase()}`));
    if(filtered.length) {
      await db.products.bulkAdd(filtered);
      const movements:StockMovement[]=filtered.filter(p=>p.stockMilli>0).map(p=>({id:crypto.randomUUID(),productId:p.id,changeMilli:p.stockMilli,reason:'opening',refId:p.id,date:now}));
      if(movements.length)await db.stockMovements.bulkAdd(movements);
    }
    return filtered.length;
  });
}
