'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Database, Download, HardDrive, ImagePlus, PackagePlus, Pencil, Search, ToggleLeft, ToggleRight, Upload, X } from 'lucide-react';
import { db } from '@/db/database';
import {useLanguage} from '@/lib/language';
import { useUpdateHold } from '@/lib/update-guard';
import { fmt, qtyText } from '@/lib/money';
import { KERALA_VEGETABLES } from '@/lib/vegetables';
import { KERALA_FRUITS, KERALA_FOODS } from '@/lib/food-catalog';
import { KERALA_BRANDED_PRESETS } from '@/lib/branded-catalog';
import { compressProductImage } from '@/lib/product-image';
import { addProductPresets, saveProduct, toggleProduct, type PresetGroup, type ProductInput } from '@/services/store';
import { downloadCsvTemplate, importProductCsv } from '@/services/catalog-import';
import { Empty, Field, Panel, safeError } from '@/components/ui';
import ProductVisual from '@/components/ProductVisual';
import type { Product, Unit } from '@/types/models';

const ICONS = ['📦','🍬','🍭','🍫','🥐','🥯','🎂','🍟','🥬','🍅','🥕','🧅','🥔','🌶️','🍆','🍌','🥭','🍎','🍊','🍇','🍍','🍉','🥥','🍚','🌾','🥛','🧈','🥚','🍞','🍪','🍗','🐟','🥜','🌿','🧃','🫖','🧂'];
const blank: ProductInput = {
  name:'',malayalamName:'',englishName:'',brand:'',packSize:'', icon:'📦', imageDataUrl:'',sku:'', category:'General / മറ്റു സാധനങ്ങൾ',
  unit:'kg',price:'',cost:'0',tax:'0',stock:'0',lowStock:'5',
};
const categories: {group:PresetGroup;emoji:string;label:string;count:number}[] = [
  {group:'vegetables',emoji:'🥦',label:'Vegetables / പച്ചക്കറികൾ',count:KERALA_VEGETABLES.length},
  {group:'fruits',emoji:'🍎',label:'Fruits / പഴങ്ങൾ',count:KERALA_FRUITS.length},
  {group:'foods',emoji:'🛒',label:'Foods / പലചരക്ക്',count:KERALA_FOODS.length},
  {group:'bakery',emoji:'🥐',label:'Bakery / ബേക്കറി',count:KERALA_BRANDED_PRESETS.filter(x=>x.category.startsWith('Bakery')).length},
  {group:'sweets',emoji:'🍬',label:'Sweets / മിഠായികൾ',count:KERALA_BRANDED_PRESETS.filter(x=>x.category.startsWith('Sweets')).length},
  {group:'branded',emoji:'🍫',label:'Branded Foods / ബ്രാൻഡുകൾ',count:KERALA_BRANDED_PRESETS.filter(x=>x.category.startsWith('Branded')).length},
];
function names(p:Product):{ml:string;en:string} {
  if(p.malayalamName || p.englishName)return {ml:p.malayalamName||'',en:p.englishName||''};
  const parts=p.name.split(' / ');
  return parts.length>1?{ml:parts[0],en:parts.slice(1).join(' / ')}:{ml:'',en:p.name};
}

export default function Products({notify}: {notify:(text:string,kind?:'error'|'success')=>void}) {
  const {language,t,productName,categoryName}=useLanguage();
  const products = useLiveQuery(()=>db.products.orderBy('name').toArray(),[]) ?? [];
  const [editing,setEditing] = useState<ProductInput|null>(null);
  const editorRef=useRef<HTMLDivElement>(null);
  const editorKey=editing?(editing.id||'new'):'';
  useEffect(()=>{if(!editorKey)return;const id=window.requestAnimationFrame(()=>editorRef.current?.scrollIntoView({behavior:'smooth',block:'start'}));return()=>window.cancelAnimationFrame(id);},[editorKey]);
  const [search,setSearch] = useState('');
  const [filter,setFilter] = useState('all');
  const [brandFilter,setBrandFilter] = useState('all');
  const [visibleCount,setVisibleCount] = useState(60);
  const brandChoices = Array.from(new Set(products.map(p=>p.brand).filter((b):b is string=>Boolean(b && b!=='Unbranded / Local')))).sort();
  const [busy,setBusy] = useState(false);
  const [loadingImage,setLoadingImage] = useState(false);
  useUpdateHold('products',editing!==null || busy || loadingImage);
  const csvRef=useRef<HTMLInputElement>(null);
  const present = new Set(products.map(p=>p.id));
  const filtered = products.filter(p => {
    if(filter==='mine' && p.source==='catalog')return false;
    if(brandFilter!=='all' && p.brand!==brandFilter)return false;
    if(filter==='bakery' && !p.category.startsWith('Bakery'))return false;
    if(filter==='sweets' && !p.category.startsWith('Sweets'))return false;
    if(filter==='branded' && !p.category.startsWith('Branded'))return false;
    if(filter==='vegetables' && !p.category.startsWith('Vegetables'))return false;
    if(filter==='fruits' && !p.category.startsWith('Fruits'))return false;
    if(filter==='foods' && (p.category.startsWith('Vegetables')||p.category.startsWith('Fruits')||p.category.startsWith('Bakery')||p.category.startsWith('Sweets')||p.category.startsWith('Branded')))return false;
    return `${p.name} ${p.malayalamName||''} ${p.englishName||''} ${p.sku} ${p.category} ${p.brand||''} ${p.packSize||''}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase());
  });
  const update=(key:keyof ProductInput,value:string)=>setEditing(v=>v?({...v,[key]:value}):null);

  function edit(p:Product) {
    const {ml,en}=names(p);
    setEditing({id:p.id,name:p.name,malayalamName:ml,englishName:en,brand:p.brand||'',packSize:p.packSize||'',icon:p.icon||'📦',imageDataUrl:p.imageDataUrl||'',
      sku:p.sku,category:p.category,unit:p.unit,price:p.isTemplate?'':String(p.pricePaise/100),
      cost:String(p.costPaise/100),tax:String(p.taxBps/100),stock:qtyText(p.stockMilli).replaceAll(',',''),
      lowStock:qtyText(p.lowStockMilli).replaceAll(',','')});
  }
  async function insertPresets(group:PresetGroup) {
    if(busy)return;setBusy(true);
    try{const count=await addProductPresets(group);notify(count?`${count} products added to this phone. Set price and stock before billing.`:'These catalog products are already on this phone.');}
    catch(error){notify(safeError(error),'error');}finally{setBusy(false);}
  }
  async function insertAllPresets() {
    if (busy) return;
    setBusy(true);
    try {
      let added = 0;
      for (const group of ['vegetables', 'fruits', 'foods', 'bakery', 'sweets', 'branded'] as const) {
        added += await addProductPresets(group);
      }
      notify(added ? `${added} new catalog products saved to this device. Edit prices and stock before billing.` : 'All 850 catalog products are already available on this device.');
    } catch (error) {
      notify(safeError(error), 'error');
    } finally {
      setBusy(false);
    }
  }
  async function chooseImage(file?:File) {
    if(!file)return;setLoadingImage(true);
    try{const value=await compressProductImage(file);update('imageDataUrl',value);}
    catch(error){notify(safeError(error),'error');}finally{setLoadingImage(false);}
  }
  async function importCsv(file?:File) {
    if(!file||busy)return;setBusy(true);
    try{const count=await importProductCsv(file);notify(`${count} new custom products saved ONLY in this phone's database.`);}
    catch(error){notify(safeError(error),'error');}finally{setBusy(false);if(csvRef.current)csvRef.current.value='';}
  }
  async function submit(event:FormEvent) {
    event.preventDefault();if(!editing||busy||loadingImage)return;setBusy(true);
    try{await saveProduct({...editing,name:[editing.malayalamName,editing.englishName].filter(Boolean).join(' / ')||editing.name});
      notify(editing.id?'Product updated in local storage.':'Your private product saved to this phone.');setEditing(null);}
    catch(error){notify(safeError(error),'error');}finally{setBusy(false);}
  }
  return <div className="stack">
    <div className="page-heading">
      <div><h1>{t('productCatalog')}</h1><p>{t('productsIntro')}</p></div>
      <button className="button primary" onClick={()=>setEditing({...blank})}><PackagePlus size={17}/> {t('addProduct')}</button>
    </div>
    <div className="notice good"><HardDrive size={19}/><span><strong>IndexedDB:</strong> {t('localPrivacy')}</span></div>
    <div className="notice"><span>📦 <strong>{language==='ml'?'ബ്രാൻഡ് ലിസ്റ്റ് മാതൃകയാണ്. സാധനത്തിന്റെ പാക്കറ്റ്, വില, ബാർകോഡ്, നികുതി എന്നിവ ശരിയായി പരിശോധിക്കുക. ഔദ്യോഗിക ബ്രാൻഡ് ഫോട്ടോകൾ ഉൾപ്പെടുത്തിയിട്ടില്ല.':'Brand catalog is a suggestion. Verify actual product, pack size, MRP, barcode and tax. Official brand photos are not included.'}</strong></span></div>
    {editing&&<div className="product-editor-anchor" ref={editorRef}><Panel title={editing.id?t('editProduct'):t('addProduct')} sub={t('nameHint')}>
      <form onSubmit={submit} className="form-grid">
        <Field label={`${t('productName')} *`}><input required maxLength={100} value={language==='ml'?editing.malayalamName:editing.englishName} onChange={e=>update(language==='ml'?'malayalamName':'englishName',e.target.value)} placeholder={language==='ml'?'ഉദാ: ആപ്പിൾ':'e.g. Apple'}/></Field>
        <Field label={t('brand')}><input maxLength={100} value={editing.brand} onChange={e=>update('brand',e.target.value)} placeholder="Britannia / Parle / Local Bakery"/></Field>
        <Field label={t('pack')}><input maxLength={100} value={editing.packSize} onChange={e=>update('packSize',e.target.value)} placeholder="e.g. 200 g — verify on actual packet"/></Field>
        <Field label={t('category')}><select value={editing.category} onChange={e=>update('category',e.target.value)}>
          {['General / മറ്റു സാധനങ്ങൾ','Vegetables / പച്ചക്കറി','Fruits / പഴങ്ങൾ','Foods / ഭക്ഷണം','Rice & Grains / അരിയും ധാന്യങ്ങളും','Prepared Foods / തയ്യാറാക്കിയ ഭക്ഷണം','Bakery / ബേക്കറി','Sweets / മിഠായികൾ','Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്','Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്','Other / മറ്റുള്ളവ'].includes(editing.category)?null:<option value={editing.category}>{categoryName(editing.category)}</option>}
          {['General / മറ്റു സാധനങ്ങൾ','Vegetables / പച്ചക്കറി','Fruits / പഴങ്ങൾ','Foods / ഭക്ഷണം','Rice & Grains / അരിയും ധാന്യങ്ങളും','Prepared Foods / തയ്യാറാക്കിയ ഭക്ഷണം','Bakery / ബേക്കറി','Sweets / മിഠായികൾ','Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്','Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്','Other / മറ്റുള്ളവ'].map(c=><option key={c} value={c}>{categoryName(c)}</option>)}
        </select></Field>
        <Field label={t('icon')}><div className="icon-picker"><input maxLength={16} value={editing.icon} onChange={e=>update('icon',e.target.value)} placeholder="📦"/>
          <div className="emoji-options" aria-label="Choose product emoji">{ICONS.map((icon,i)=><button key={i} type="button" className={editing.icon===icon?'chosen':''} onClick={()=>update('icon',icon)} title={`Choose ${icon}`}>{icon}</button>)}</div></div></Field>
        <Field label={t('image')}><div className="product-photo-editor"><ProductVisual product={{id:editing.id,name:[editing.malayalamName,editing.englishName].filter(Boolean).join(' / '),imageDataUrl:editing.imageDataUrl}} large/>
          <div className="grow"><label className="button secondary upload-button"><ImagePlus size={17}/>{loadingImage?t('saving'):t('uploadImage')}<input disabled={loadingImage} type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>{void chooseImage(e.target.files?.[0]);e.target.value='';}}/></label>
          {editing.imageDataUrl&&<button type="button" className="text-button" onClick={()=>update('imageDataUrl','')}><X size={14}/> {t('remove')}</button>}
          <p className="tiny muted">{language==='ml'?'JPG/PNG/WebP (5 MB വരെ). ചിത്രം ഈ ഫോണിൽ സേവ് ചെയ്ത് ബാക്കപ്പിൽ ഉൾപ്പെടുത്തും.':'JPG/PNG/WebP up to 5 MB. The compressed photo stays on this phone and in backups.'}</p></div></div></Field>
        <Field label={t('unit')}><select value={editing.unit} onChange={e=>update('unit',e.target.value as Unit)}><option value="kg">{language==='ml'?'കിലോ':'Kilogram'} (kg)</option><option value="pcs">{language==='ml'?'എണ്ണം':'Piece'}</option><option value="bundle">{language==='ml'?'കെട്ട്':'Bundle'}</option><option value="ltr">{language==='ml'?'ലിറ്റർ':'Litre'}</option><option value="m">{language==='ml'?'മീറ്റർ':'Metre'}</option></select></Field>
        <Field label={`${t('sellingPrice')} / ${editing.unit} *`}><input type="number" min="0.01" step="0.01" required value={editing.price} onChange={e=>update('price',e.target.value)} placeholder={language==='ml'?'ഇപ്പോഴത്തെ വില':'Current selling price'}/></Field>
        <Field label={t('buyingPrice')}><input type="number" min="0" step="0.01" required value={editing.cost} onChange={e=>update('cost',e.target.value)}/></Field>
        <Field label={t('stockQty')}><input type="number" min="0" step="0.001" required value={editing.stock} onChange={e=>update('stock',e.target.value)}/></Field>
        <Field label={t('lowStock')}><input type="number" min="0" step="0.001" required value={editing.lowStock} onChange={e=>update('lowStock',e.target.value)}/></Field>
        <Field label={t('taxRate')}><select value={editing.tax} onChange={e=>update('tax',e.target.value)}>{['0','3','5','12','18','28'].map(t=><option value={t} key={t}>{t}%</option>)}</select></Field>
        <Field label={t('barcode')}><input maxLength={80} value={editing.sku} onChange={e=>update('sku',e.target.value)}/></Field>
        <div className="form-actions"><button className="button primary" disabled={busy||loadingImage}>{busy?t('saving'):t('saveProduct')}</button><button type="button" className="button ghost" onClick={()=>setEditing(null)}>{t('cancel')}</button></div>
      </form>
    </Panel></div>}
    <div className="csv-toolbar"><button className="button primary" disabled={busy} onClick={()=>void insertAllPresets()}><PackagePlus size={17}/> {t('addAll')}</button><span className="small muted">{language==='ml'?'350 പഴയതും 500 പുതിയതും. പഴയ വിലയും ചിത്രങ്ങളും മാറ്റില്ല.':'350 existing + 500 new templates. Existing prices and images are preserved.'}</span></div>
    <div className="catalog-cards">{categories.map(row=>{
      const count= row.group==='vegetables'?KERALA_VEGETABLES.filter(v=>present.has(v.id)).length:row.group==='fruits'?KERALA_FRUITS.filter(v=>present.has(v.id)).length:row.group==='foods'?KERALA_FOODS.filter(v=>present.has(v.id)).length:KERALA_BRANDED_PRESETS.filter(v=>present.has(v.id) && (row.group==='bakery'?v.category.startsWith('Bakery'):row.group==='sweets'?v.category.startsWith('Sweets'):v.category.startsWith('Branded'))).length;
      return <div className="catalog-card" key={row.group}><span className="catalog-card-icon" aria-hidden="true">{row.emoji}</span><strong>{row.label.split(' / ')[language==='en'?0:1]||row.label}</strong><p>{count} / {row.count} {t('alreadyAdded')}</p><button className="button secondary" disabled={busy||count===row.count} onClick={()=>void insertPresets(row.group)}>{count===row.count?t('alreadyAdded'):`${t('add')} ${row.count-count}`}</button></div>;
    })}</div>
    <Panel title={t('csvTools')} sub={t('csvIntro')}>
      <div className="csv-toolbar"><button className="button secondary" onClick={downloadCsvTemplate}><Download size={16}/> {t('template')}</button>
        <input className="sr-only" ref={csvRef} type="file" accept=".csv,text/csv" onChange={e=>void importCsv(e.target.files?.[0])}/>
        <button className="button secondary" disabled={busy} onClick={()=>csvRef.current?.click()}><Upload size={16}/> {t('importCsv')} (1,000)</button></div>
      <p className="small muted">{language==='ml'?'CSV-യിൽ മലയാളം/ഇംഗ്ലീഷ് പേര്, വിഭാഗം, വില, സ്റ്റോക്ക്, ബ്രാൻഡ് എന്നിവ ചേർക്കാം. ഫയൽ സെർവറിലേക്ക് അപ്‌ലോഡ് ചെയ്യില്ല.':'CSV supports Malayalam/English names, category, price, stock and brand. Nothing is uploaded to a server.'}</p>
    </Panel>
    <Panel title={`${t('myProducts')} (${products.length})`} action={<div className="search"><Search size={16}/><input aria-label={t('searchProducts')} placeholder={t('searchProducts')} value={search} onChange={e=>{setSearch(e.target.value);setVisibleCount(60);}}/></div>}>
      <div className="catalog-filters" aria-label="Filter products">{[
        ['all',t('all')],['vegetables',t('vegetables')],['fruits',t('fruits')],['foods',t('foods')],['bakery',t('bakery')],['sweets',t('sweets')],['branded',t('branded')],['mine',t('mine')]
      ].map(([value,label])=><button key={value} className={`catalog-filter ${filter===value?'active':''}`} onClick={()=>{setFilter(value);setVisibleCount(60);}}>{value==='mine'&&<Database size={14}/>} {label}</button>)}</div>
      <div className="csv-toolbar"><label className="small" htmlFor="brand-filter">{t('brand')}</label><select id="brand-filter" value={brandFilter} onChange={e=>{setBrandFilter(e.target.value);setVisibleCount(60);}}><option value="all">{language==='ml'?'എല്ലാ ബ്രാൻഡുകളും':'All brands'}</option>{brandChoices.map(b=><option key={b} value={b}>{b}</option>)}</select></div>
      {!filtered.length?<Empty label="No matching products. Choose a catalog above, or add your own product."/>:<div className="table-wrap product-table-wrap"><table className="product-data-table"><thead><tr><th>{t('productName')}</th><th>{t('storage')}</th><th>{t('price')}</th><th>{t('stock')}</th><th>{t('status')}</th><th>{t('actions')}</th></tr></thead><tbody>{filtered.slice(0,visibleCount).map(p=><tr key={p.id}><td data-label="Product"><div className="product-cell"><ProductVisual product={p}/><div><strong>{productName(p)}</strong><div className="small muted">{p.brand && p.brand!=='Unbranded / Local'?`${p.brand} · `:''}{p.packSize?`${p.packSize} · `:''}{categoryName(p.category||'General')} · {p.unit}</div></div></div></td>
        <td data-label="Source"><span className="pill neutral"><HardDrive size={12}/> {p.source==='catalog'?t('productCatalog'):t('myLocal')}</span></td>
        <td data-label="Price">{p.isTemplate?<span className="pill danger">{language==='ml'?'വില നൽകുക':'Set price'}</span>:<strong>{fmt(p.pricePaise)}/{p.unit}</strong>}</td>
        <td data-label="Stock"><span className={p.stockMilli<=p.lowStockMilli?'danger-text':''}>{qtyText(p.stockMilli)} {p.unit}</span></td>
        <td data-label="Status"><span className={`pill ${p.active?'green':'neutral'}`}>{p.active?t('active'):t('inactive')}</span></td>
        <td data-label="Actions"><div className="actions"><button title="Edit name, picture, price, stock" aria-label={`Edit ${p.name}`} className="button secondary product-edit-button" onClick={()=>edit(p)}><Pencil size={16}/><span>{language==='ml'?'മാറ്റുക':'Edit'}</span></button><button disabled={p.isTemplate} title={p.isTemplate?'Set price first':'Hide/show'} aria-label={`Toggle ${p.name}`} className="icon-button" onClick={async()=>{try{await toggleProduct(p.id)}catch(e){notify(safeError(e),'error')}}}>{p.active?<ToggleRight size={19}/>:<ToggleLeft size={19}/>}</button></div></td>
      </tr>)}</tbody></table><div className="csv-toolbar"><span className="small muted">Showing {Math.min(visibleCount,filtered.length)} of {filtered.length} products</span>{visibleCount<filtered.length && <button className="button secondary" onClick={()=>setVisibleCount(n=>n+60)}>Show more / കൂടുതൽ കാണുക</button>}</div></div>}
    </Panel>
  </div>;
}
