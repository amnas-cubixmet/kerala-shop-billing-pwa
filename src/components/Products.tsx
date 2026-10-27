'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Check, ChevronLeft, ChevronDown, HardDrive, ImagePlus, Pencil, Plus, Search, ToggleLeft, ToggleRight, X } from 'lucide-react';
import { db } from '@/db/database';
import {useLanguage} from '@/lib/language';
import { useUpdateHold } from '@/lib/update-guard';
import { fmt } from '@/lib/money';
import { compressProductImage } from '@/lib/product-image';
import { saveProduct, toggleProduct, type ProductInput } from '@/services/store';
import { isShopProduct } from '@/lib/shop-products';
import { Empty, Field, safeError } from '@/components/ui';
import ProductVisual from '@/components/ProductVisual';
import type { Product, Unit } from '@/types/models';

const ICONS = ['📦','🍬','🍭','🍫','🥐','🥯','🎂','🍟','🥬','🍅','🥕','🧅','🥔','🌶️','🍆','🍌','🥭','🍎','🍊','🍇','🍍','🍉','🥥','🍚','🌾','🥛','🧈','🥚','🍞','🍪','🍗','🐟','🥜','🌿','🧃','🫖','🧂'];
const blank: ProductInput = {
  name:'',malayalamName:'',englishName:'',brand:'',packSize:'', icon:'📦', imageDataUrl:'',sku:'', category:'General / മറ്റു സാധനങ്ങൾ',
  unit:'kg',price:'',cost:'0',tax:'0',
};
function names(p:Product):{ml:string;en:string} {
  if(p.malayalamName || p.englishName)return {ml:p.malayalamName||'',en:p.englishName||''};
  const parts=p.name.split(' / ');
  return parts.length>1?{ml:parts[0],en:parts.slice(1).join(' / ')}:{ml:'',en:p.name};
}

export default function Products({notify,openAddToken=0}: {notify:(text:string,kind?:'error'|'success')=>void;openAddToken?:number}) {
  const {language,t,productName}=useLanguage();
  const savedProducts = useLiveQuery(()=>db.products.orderBy('name').toArray(),[]) ?? [];
  // Only show shop-created or previously configured products, never unused category templates.
  const products = savedProducts.filter(isShopProduct);
  const [editing,setEditing] = useState<ProductInput|null>(null);
  useEffect(()=>{if(openAddToken>0)setEditing({...blank});},[openAddToken]);
  const editorRef=useRef<HTMLDivElement>(null);
  const editorKey=editing?(editing.id||'new'):'';
  useEffect(()=>{if(!editorKey)return;const id=window.requestAnimationFrame(()=>editorRef.current?.scrollIntoView({behavior:'smooth',block:'start'}));return()=>window.cancelAnimationFrame(id);},[editorKey]);
  const [search,setSearch] = useState('');
  const [visibleCount,setVisibleCount] = useState(60);
  const [busy,setBusy] = useState(false);
  const [loadingImage,setLoadingImage] = useState(false);
  useUpdateHold('products',editing!==null || busy || loadingImage);
  const filtered = products.filter(p =>
    `${p.name} ${p.malayalamName||''} ${p.englishName||''} ${p.sku} ${p.brand||''} ${p.packSize||''}`
      .toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())
  );
  const update=(key:keyof ProductInput,value:string)=>setEditing(v=>v?({...v,[key]:value}):null);

  function edit(p:Product) {
    const {ml,en}=names(p);
    setEditing({id:p.id,name:p.name,malayalamName:ml,englishName:en,brand:p.brand||'',packSize:p.packSize||'',icon:p.icon||'📦',imageDataUrl:p.imageDataUrl||'',
      sku:p.sku,category:p.category,unit:p.unit,price:p.isTemplate?'':String(p.pricePaise/100),
      cost:String(p.costPaise/100),tax:String(p.taxBps/100)});
  }
  async function chooseImage(file?:File) {
    if(!file)return;setLoadingImage(true);
    try{const value=await compressProductImage(file);update('imageDataUrl',value);}
    catch(error){notify(safeError(error),'error');}finally{setLoadingImage(false);}
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
          <details className="ref-advanced-options"><summary>{language==='ml'?'കൂടുതൽ ഓപ്ഷനുകൾ (വില, ബ്രാൻഡ്, ബാർകോഡ്)':'More product options'}<ChevronDown size={19}/></summary>
            <div className="ref-advanced-fields">
              <Field label={t('buyingPrice')}><input type="number" inputMode="decimal" min="0" step="0.01" required value={editing.cost} onChange={e=>update('cost',e.target.value)}/></Field>
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
      <div className="ref-page-heading"><div><h1>{t('productCatalog')}</h1><p>{products.length} {language==='ml'?'നിങ്ങൾ ചേർത്ത സാധനങ്ങൾ':'products added to this shop'}</p></div><button type="button" className="ref-circle-add ref-add-product-cta" aria-label={t('addProduct')} onClick={startAdd}><Plus size={21}/><span>{t('addProduct')}</span></button></div>
      <section className="ref-products-browser">
        <div className="ref-product-search"><Search size={20}/><input aria-label={t('searchProducts')} placeholder={t('searchProducts')} value={search} onChange={e=>{setSearch(e.target.value);setVisibleCount(60);}}/></div>
        <div className="ref-product-list-heading"><strong>{t('myProducts')}</strong><span>{filtered.length} {language==='ml'?'സാധനങ്ങൾ':'items'}</span></div>
        {!filtered.length?<div className="ref-empty-products"><Empty label={products.length===0?(language==='ml'?'ആദ്യ സാധനം ചേർക്കാൻ Add Product അമർത്തുക.':'Tap Add Product to create your first item.'):(language==='ml'?'തിരഞ്ഞ പേരിൽ സാധനങ്ങളില്ല.':'No matching products found.')}/><button className="button primary" onClick={startAdd}><Plus size={17}/>{t('addProduct')}</button></div>:
          <div className="ref-product-list">{filtered.slice(0,visibleCount).map(p=><article key={p.id} className="ref-product-row">
            <div className="ref-product-photo"><ProductVisual product={p} large/></div>
            <div className="ref-product-info"><strong>{productName(p)}</strong><small>{[p.brand,p.packSize].filter(Boolean).join(' · ')}</small><div className="ref-product-price">{p.isTemplate?<span className="ref-price-empty">{language==='ml'?'വില ചേർക്കുക':'Set price'}</span>:<b>{fmt(p.pricePaise)}</b>}<span> / {p.unit}</span></div></div>
            <div className="ref-product-side">
              <button className="ref-edit-product-btn" type="button" onClick={()=>edit(p)} aria-label={`${t('editProduct')}: ${productName(p)}`}><Pencil size={16}/><span>{language==='ml'?'മാറ്റുക':'Edit'}</span></button></div>
            <div className="ref-product-more"><button type="button" disabled={p.isTemplate} title={p.isTemplate?'Set price first':p.active?'Hide product':'Show product'} aria-label={`Toggle ${p.name}`} className="icon-button" onClick={async()=>{try{await toggleProduct(p.id)}catch(e){notify(safeError(e),'error')}}}>{p.active?<ToggleRight size={20}/>:<ToggleLeft size={20}/>}</button></div>
          </article>)}</div>}
        {visibleCount<filtered.length&&<button className="button secondary ref-load-more" onClick={()=>setVisibleCount(n=>n+60)}>{language==='ml'?'കൂടുതൽ കാണിക്കുക':'Show more'} ({filtered.length-visibleCount})</button>}
      </section>
      <p className="ref-data-note"><HardDrive size={16}/>{t('localPrivacy')}</p>
    </>}
  </div>;
}
