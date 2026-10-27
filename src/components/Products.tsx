'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Check, ChevronLeft, ChevronDown, Database, Download, Edit3, HardDrive, ImagePlus, PackagePlus, Pencil, Plus, Search, ToggleLeft, ToggleRight, Upload, X } from 'lucide-react';
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

export default function Products({notify,openAddToken=0}: {notify:(text:string,kind?:'error'|'success')=>void;openAddToken?:number}) {
  const {language,t,productName,categoryName}=useLanguage();
  const products = useLiveQuery(()=>db.products.orderBy('name').toArray(),[]) ?? [];
  const [editing,setEditing] = useState<ProductInput|null>(null);
  useEffect(()=>{if(openAddToken>0)setEditing({...blank});},[openAddToken]);
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
  const startAdd=()=>{setEditing({...blank});window.scrollTo({top:0,behavior:'smooth'});};
  const closeForm=()=>{setEditing(null);window.scrollTo({top:0,behavior:'auto'});};
  return <div className="stack ref-products-page">
    {editing ? <>
      <div className="ref-page-heading ref-edit-heading"><button type="button" className="ref-back-button" onClick={closeForm} aria-label={t('cancel')}><ChevronLeft size={22}/></button><div><h1>{editing.id?t('editProduct'):t('addProduct')}</h1><p>{t('nameHint')}</p></div></div>
      <section className="ref-edit-panel">
        <form onSubmit={submit} className="ref-edit-form">
          <div className="ref-photo-input"><ProductVisual product={{id:editing.id,name:[editing.malayalamName,editing.englishName].filter(Boolean).join(' / '),imageDataUrl:editing.imageDataUrl}} large/>
            <label className="ref-photo-upload"><ImagePlus size={23}/><strong>{loadingImage?t('saving'):t('uploadImage')}</strong><small>{language==='ml'?'JPG / PNG / WebP · 5 MB വരെ':'JPG / PNG / WebP · up to 5 MB'}</small><input disabled={loadingImage} type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>{void chooseImage(e.target.files?.[0]);e.target.value='';}}/></label>
            {editing.imageDataUrl&&<button className="ref-photo-remove" type="button" onClick={()=>update('imageDataUrl','')}><X size={16}/>{t('remove')}</button>}
          </div>
          <Field label={`${t('productName')} *`}><input required maxLength={100} autoComplete="off" value={language==='ml'?editing.malayalamName:editing.englishName} onChange={e=>update(language==='ml'?'malayalamName':'englishName',e.target.value)} placeholder={language==='ml'?'ഉദാ: തക്കാളി':'e.g. Tomato'}/></Field>
          <div className="ref-form-two"><Field label={`${t('sellingPrice')} *`}><input type="number" inputMode="decimal" min="0.01" step="0.01" required value={editing.price} onChange={e=>update('price',e.target.value)} placeholder="₹ 40.00"/></Field>
            <Field label={`${t('unit')} *`}><select value={editing.unit} onChange={e=>update('unit',e.target.value as Unit)}><option value="kg">{language==='ml'?'കിലോ':'Kilogram'} (kg)</option><option value="pcs">{language==='ml'?'എണ്ണം':'Piece (pcs)'}</option><option value="bundle">{language==='ml'?'കെട്ട്':'Bundle'}</option><option value="ltr">{language==='ml'?'ലിറ്റർ':'Litre'}</option><option value="m">{language==='ml'?'മീറ്റർ':'Metre'}</option></select></Field></div>
          <div className="ref-form-two"><Field label={`${t('stockQty')} *`}><input type="number" inputMode="decimal" min="0" step="0.001" required value={editing.stock} onChange={e=>update('stock',e.target.value)}/></Field>
            <Field label={t('category')}><select value={editing.category} onChange={e=>update('category',e.target.value)}>
              {['General / മറ്റു സാധനങ്ങൾ','Vegetables / പച്ചക്കറി','Fruits / പഴങ്ങൾ','Foods / ഭക്ഷണം','Rice & Grains / അരിയും ധാന്യങ്ങളും','Prepared Foods / തയ്യാറാക്കിയ ഭക്ഷണം','Bakery / ബേക്കറി','Sweets / മിഠായികൾ','Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്','Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്','Other / മറ്റുള്ളവ'].includes(editing.category)?null:<option value={editing.category}>{categoryName(editing.category)}</option>}
              {['General / മറ്റു സാധനങ്ങൾ','Vegetables / പച്ചക്കറി','Fruits / പഴങ്ങൾ','Foods / ഭക്ഷണം','Rice & Grains / അരിയും ധാന്യങ്ങളും','Prepared Foods / തയ്യാറാക്കിയ ഭക്ഷണം','Bakery / ബേക്കറി','Sweets / മിഠായികൾ','Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്','Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്','Other / മറ്റുള്ളവ'].map(c=><option key={c} value={c}>{categoryName(c)}</option>)}
            </select></Field></div>
          <details className="ref-advanced-options"><summary>{language==='ml'?'കൂടുതൽ ഓപ്ഷനുകൾ (വില, ബ്രാൻഡ്, ബാർകോഡ്)':'More product options'}<ChevronDown size={19}/></summary>
            <div className="ref-advanced-fields">
              <Field label={t('buyingPrice')}><input type="number" inputMode="decimal" min="0" step="0.01" required value={editing.cost} onChange={e=>update('cost',e.target.value)}/></Field>
              <Field label={t('lowStock')}><input type="number" inputMode="decimal" min="0" step="0.001" required value={editing.lowStock} onChange={e=>update('lowStock',e.target.value)}/></Field>
              <Field label={t('brand')}><input maxLength={100} value={editing.brand} onChange={e=>update('brand',e.target.value)}/></Field>
              <Field label={t('pack')}><input maxLength={100} value={editing.packSize} onChange={e=>update('packSize',e.target.value)}/></Field>
              <Field label={t('barcode')}><input maxLength={80} value={editing.sku} onChange={e=>update('sku',e.target.value)}/></Field>
              <Field label={t('taxRate')}><select value={editing.tax} onChange={e=>update('tax',e.target.value)}>{['0','3','5','12','18','28'].map(tax=><option key={tax} value={tax}>{tax}%</option>)}</select></Field>
              <Field label={t('icon')}><div className="icon-picker"><input maxLength={16} value={editing.icon} onChange={e=>update('icon',e.target.value)} placeholder="📦"/><div className="emoji-options">{ICONS.map((icon,i)=><button key={i} type="button" className={editing.icon===icon?'chosen':''} onClick={()=>update('icon',icon)}>{icon}</button>)}</div></div></Field>
            </div>
          </details>
          <div className="ref-edit-actions"><button className="button primary" disabled={busy||loadingImage}><Check size={21}/>{busy?t('saving'):t('saveProduct')}</button><button type="button" className="button ghost" onClick={closeForm}>{t('cancel')}</button></div>
          <p className="ref-data-note"><HardDrive size={16}/>{t('localPrivacy')}</p>
        </form>
      </section>
    </> : <>
      <div className="ref-page-heading"><div><h1>{t('productCatalog')}</h1><p>{products.length} {language==='ml'?'സാധനങ്ങൾ ഈ ഫോണിൽ':'products on this device'}</p></div><button type="button" className="ref-circle-add" aria-label={t('addProduct')} onClick={startAdd}><Plus size={26}/></button></div>
      <section className="ref-products-browser">
        <div className="ref-product-search"><Search size={20}/><input aria-label={t('searchProducts')} placeholder={t('searchProducts')} value={search} onChange={e=>{setSearch(e.target.value);setVisibleCount(60);}}/></div>
        <div className="catalog-filters ref-category-pills" aria-label={language==='ml'?'വിഭാഗങ്ങൾ':'Categories'}>{[
          ['all',t('all')],['vegetables',t('vegetables')],['fruits',t('fruits')],['foods',t('foods')],['bakery',t('bakery')],['sweets',t('sweets')],['branded',t('branded')],['mine',t('mine')]
        ].map(([value,label])=><button type="button" key={value} className={`catalog-filter ${filter===value?'active':''}`} onClick={()=>{setFilter(value);setVisibleCount(60);}}>{label}</button>)}</div>
        <div className="ref-product-list-heading"><strong>{t('myProducts')}</strong><span>{filtered.length} {language==='ml'?'സാധനങ്ങൾ':'items'}</span></div>
        {!filtered.length?<div className="ref-empty-products"><Empty label={products.length===0?(language==='ml'?'ആദ്യം ഒരു സാധനം ചേർക്കുക, അല്ലെങ്കിൽ താഴെ നിന്ന് Catalog തിരഞ്ഞെടുക്കുക.':'Add a product or import the ready-made catalog below.'):(language==='ml'?'ഈ വിഭാഗത്തിൽ സാധനങ്ങളില്ല.':'No products match your search.')}/><button className="button primary" onClick={startAdd}><Plus size={17}/>{t('addProduct')}</button></div>:
          <div className="ref-product-list">{filtered.slice(0,visibleCount).map(p=><article key={p.id} className="ref-product-row">
            <div className="ref-product-photo"><ProductVisual product={p} large/></div>
            <div className="ref-product-info"><strong>{productName(p)}</strong><small>{categoryName(p.category||'General')}{p.packSize?` · ${p.packSize}`:''}</small><div className="ref-product-price">{p.isTemplate?<span className="ref-price-empty">{language==='ml'?'വില ചേർക്കുക':'Set price'}</span>:<b>{fmt(p.pricePaise)}</b>}<span> / {p.unit}</span></div></div>
            <div className="ref-product-side"><span className={`ref-stock-pill ${p.stockMilli<=p.lowStockMilli?'low':''}`}>{p.stockMilli<=p.lowStockMilli?(language==='ml'?'കുറഞ്ഞ സ്റ്റോക്ക്':'Low stock'):(language==='ml'?'സ്റ്റോക്കുണ്ട്':'In stock')}</span><small>{qtyText(p.stockMilli)} {p.unit}</small>
              <button className="ref-edit-product-btn" type="button" onClick={()=>edit(p)} aria-label={`${t('editProduct')}: ${productName(p)}`}><Pencil size={16}/><span>{language==='ml'?'മാറ്റുക':'Edit'}</span></button></div>
            <div className="ref-product-more"><button type="button" disabled={p.isTemplate} title={p.isTemplate?'Set price first':p.active?'Hide product':'Show product'} aria-label={`Toggle ${p.name}`} className="icon-button" onClick={async()=>{try{await toggleProduct(p.id)}catch(e){notify(safeError(e),'error')}}}>{p.active?<ToggleRight size={20}/>:<ToggleLeft size={20}/>}</button></div>
          </article>)}</div>}
        {visibleCount<filtered.length&&<button className="button secondary ref-load-more" onClick={()=>setVisibleCount(n=>n+60)}>{language==='ml'?'കൂടുതൽ കാണിക്കുക':'Show more'} ({filtered.length-visibleCount})</button>}
      </section>
      <details className="ref-catalog-library"><summary><span><Database size={19}/><strong>{language==='ml'?'റെഡി-മെയ്ഡ് സാധനങ്ങളും CSV ഇംപോർട്ടും':'Product catalog & CSV import'}</strong></span><ChevronDown size={19}/></summary>
        <div className="ref-catalog-inner"><p className="small muted">{t('productsIntro')}</p><div className="csv-toolbar"><button className="button primary" disabled={busy} onClick={()=>void insertAllPresets()}><PackagePlus size={17}/>{t('addAll')}</button></div>
          <div className="catalog-cards">{categories.map(row=>{
            const count= row.group==='vegetables'?KERALA_VEGETABLES.filter(v=>present.has(v.id)).length:row.group==='fruits'?KERALA_FRUITS.filter(v=>present.has(v.id)).length:row.group==='foods'?KERALA_FOODS.filter(v=>present.has(v.id)).length:KERALA_BRANDED_PRESETS.filter(v=>present.has(v.id) && (row.group==='bakery'?v.category.startsWith('Bakery'):row.group==='sweets'?v.category.startsWith('Sweets'):v.category.startsWith('Branded'))).length;
            return <div className="catalog-card" key={row.group}><span className="catalog-card-icon" aria-hidden="true">{row.emoji}</span><strong>{row.label.split(' / ')[language==='en'?0:1]||row.label}</strong><p>{count} / {row.count} {t('alreadyAdded')}</p><button className="button secondary" disabled={busy||count===row.count} onClick={()=>void insertPresets(row.group)}>{count===row.count?t('alreadyAdded'):`${t('add')} ${row.count-count}`}</button></div>;
          })}</div>
          <Panel title={t('csvTools')} sub={t('csvIntro')}><div className="csv-toolbar"><button className="button secondary" onClick={downloadCsvTemplate}><Download size={16}/>{t('template')}</button><input className="sr-only" ref={csvRef} type="file" accept=".csv,text/csv" onChange={e=>void importCsv(e.target.files?.[0])}/><button className="button secondary" disabled={busy} onClick={()=>csvRef.current?.click()}><Upload size={16}/>{t('importCsv')}</button></div></Panel>
        </div>
      </details>
      <p className="ref-data-note"><HardDrive size={16}/>{t('localPrivacy')}</p>
    </>}
  </div>;
}
