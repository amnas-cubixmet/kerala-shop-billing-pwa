'use client';
import { useRef, useState, type FormEvent } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Database, Download, HardDrive, ImagePlus, PackagePlus, Pencil, Search, ToggleLeft, ToggleRight, Upload, X } from 'lucide-react';
import { db } from '@/db/database';
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
  const products = useLiveQuery(()=>db.products.orderBy('name').toArray(),[]) ?? [];
  const [editing,setEditing] = useState<ProductInput|null>(null);
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
    window.scrollTo({top:0,behavior:'smooth'});
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
      <div><h1>Products / സാധനങ്ങൾ</h1><p>Ready-made Kerala catalog + your own private products. All changes are saved on this device.</p></div>
      <button className="button primary" onClick={()=>{setEditing({...blank});window.scrollTo({top:0,behavior:'smooth'});}}><PackagePlus size={17}/> Add My Product / പുതിയത്</button>
    </div>
    <div className="notice good"><HardDrive size={19}/><span><strong>Local Storage / എന്റെ ഫോണിൽ മാത്രം:</strong> പുതിയ പേര്, വില, ചിത്രം, സ്റ്റോക്ക് എന്നിവ ഈ browser/PWA-യുടെ IndexedDB-ലാണ് സൂക്ഷിക്കുന്നത്. മറ്റൊരു ഫോണിലോ മറ്റൊരു ഉപയോക്താവിനോ സ്വയം കാണില്ല. <strong>ഒരേ ഫോൺ/browser ഉപയോഗിക്കുന്ന ആൾക്ക് കാണാൻ കഴിയും.</strong> Backup എടുക്കാൻ മറക്കരുത്.</span></div>
    <div className="notice"><span>📦 <strong>Brand catalog = editable suggestions.</strong> Verify actual product, pack weight, MRP, barcode and tax from its packaging. No brand-owned photos or official barcode data are included.</span></div>
    <div className="csv-toolbar"><button className="button primary" disabled={busy} onClick={()=>void insertAllPresets()}><PackagePlus size={17}/> + Add All 850 Products / 850 സാധനങ്ങൾ ചേർക്കുക</button><span className="small muted">350 existing + 500 new: bakery, sweets, popular branded products. No verified barcodes/prices; existing edits are preserved.</span></div>
    <div className="catalog-cards">{categories.map(row=>{
      const count= row.group==='vegetables'?KERALA_VEGETABLES.filter(v=>present.has(v.id)).length:row.group==='fruits'?KERALA_FRUITS.filter(v=>present.has(v.id)).length:row.group==='foods'?KERALA_FOODS.filter(v=>present.has(v.id)).length:KERALA_BRANDED_PRESETS.filter(v=>present.has(v.id) && (row.group==='bakery'?v.category.startsWith('Bakery'):row.group==='sweets'?v.category.startsWith('Sweets'):v.category.startsWith('Branded'))).length;
      return <div className="catalog-card" key={row.group}><span className="catalog-card-icon" aria-hidden="true">{row.emoji}</span><strong>{row.label}</strong><p>{count} / {row.count} added</p><button className="button secondary" disabled={busy||count===row.count} onClick={()=>void insertPresets(row.group)}>{count===row.count?'Added ✓':`+ Add ${row.count-count}`}</button></div>;
    })}</div>
    <Panel title="Add many products / ഒരുമിച്ച് ചേർക്കാം" sub="Download the CSV template, fill Malayalam + English names, then import up to 1,000 products per import. Local storage only.">
      <div className="csv-toolbar"><button className="button secondary" onClick={downloadCsvTemplate}><Download size={16}/> CSV Template</button>
        <input className="sr-only" ref={csvRef} type="file" accept=".csv,text/csv" onChange={e=>void importCsv(e.target.files?.[0])}/>
        <button className="button secondary" disabled={busy} onClick={()=>csvRef.current?.click()}><Upload size={16}/> Import CSV (max 1,000)</button></div>
      <p className="small muted">Columns: malayalamName, englishName, category, unit, price, stock, icon, brand, packSize. Older seven-column CSVs are supported. Missing prices remain inactive until edited. No file is uploaded to a server.</p>
    </Panel>
    {editing&&<Panel title={editing.id?'Edit product / മാറ്റം വരുത്തുക':'My New Product / പുതിയ സാധനം'} sub="Enter both names, or just one. Price is per kg / piece / bundle / litre. Photos are compressed and stored locally.">
      <form onSubmit={submit} className="form-grid">
        <Field label="Malayalam Name / മലയാളം പേര്"><input maxLength={100} value={editing.malayalamName} onChange={e=>update('malayalamName',e.target.value)} placeholder="ഉദാ: ആപ്പിൾ"/></Field>
        <Field label="English Name / ഇംഗ്ലീഷ് പേര്"><input maxLength={100} value={editing.englishName} onChange={e=>update('englishName',e.target.value)} placeholder="e.g. Apple"/></Field>
        <Field label="Brand / ബ്രാൻഡ് (optional)"><input maxLength={100} value={editing.brand} onChange={e=>update('brand',e.target.value)} placeholder="Britannia / Parle / Local Bakery"/></Field>
        <Field label="Pack / Variant (optional)"><input maxLength={100} value={editing.packSize} onChange={e=>update('packSize',e.target.value)} placeholder="e.g. 200 g — verify on actual packet"/></Field>
        <Field label="Category / വിഭാഗം"><select value={editing.category} onChange={e=>update('category',e.target.value)}>
          {['General / മറ്റു സാധനങ്ങൾ','Vegetables / പച്ചക്കറി','Fruits / പഴങ്ങൾ','Foods / ഭക്ഷണം','Rice & Grains / അരിയും ധാന്യങ്ങളും','Prepared Foods / തയ്യാറാക്കിയ ഭക്ഷണം','Bakery / ബേക്കറി','Sweets / മിഠായികൾ','Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്','Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്','Other / മറ്റുള്ളവ'].includes(editing.category)?null:<option value={editing.category}>{editing.category}</option>}
          {['General / മറ്റു സാധനങ്ങൾ','Vegetables / പച്ചക്കറി','Fruits / പഴങ്ങൾ','Foods / ഭക്ഷണം','Rice & Grains / അരിയും ധാന്യങ്ങളും','Prepared Foods / തയ്യാറാക്കിയ ഭക്ഷണം','Bakery / ബേക്കറി','Sweets / മിഠായികൾ','Branded Snacks / ബ്രാൻഡഡ് സ്നാക്സ്','Branded Grocery / ബ്രാൻഡഡ് പലചരക്ക്','Other / മറ്റുള്ളവ'].map(c=><option key={c} value={c}>{c}</option>)}
        </select></Field>
        <Field label="Emoji Icon / ഐക്കൺ"><div className="icon-picker"><input maxLength={16} value={editing.icon} onChange={e=>update('icon',e.target.value)} placeholder="📦"/>
          <div className="emoji-options" aria-label="Choose product emoji">{ICONS.map((icon,i)=><button key={i} type="button" className={editing.icon===icon?'chosen':''} onClick={()=>update('icon',icon)} title={`Choose ${icon}`}>{icon}</button>)}</div></div></Field>
        <Field label="Product Image / ചിത്രം"><div className="product-photo-editor"><ProductVisual product={{id:editing.id,name:[editing.malayalamName,editing.englishName].filter(Boolean).join(' / '),imageDataUrl:editing.imageDataUrl}} large/>
          <div className="grow"><label className="button secondary upload-button"><ImagePlus size={17}/>{loadingImage?'Processing…':'Upload Image'}<input disabled={loadingImage} type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>{void chooseImage(e.target.files?.[0]);e.target.value='';}}/></label>
          {editing.imageDataUrl&&<button type="button" className="text-button" onClick={()=>update('imageDataUrl','')}><X size={14}/> Remove</button>}
          <p className="tiny muted">JPG/PNG/WebP, max 5 MB before compression. Compressed photo stays on this device and in JSON backups.</p></div></div></Field>
        <Field label="Unit / അളവ്"><select value={editing.unit} onChange={e=>update('unit',e.target.value as Unit)}><option value="kg">Kilogram / കിലോ (kg)</option><option value="pcs">Piece / എണ്ണം</option><option value="bundle">Bundle / കെട്ട്</option><option value="ltr">Litre / ലിറ്റർ</option><option value="m">Metre / മീറ്റർ</option></select></Field>
        <Field label={`Selling Price per ${editing.unit} (₹) *`}><input type="number" min="0.01" step="0.01" required value={editing.price} onChange={e=>update('price',e.target.value)} placeholder="Current selling price"/></Field>
        <Field label="Buying / Cost Price (₹)"><input type="number" min="0" step="0.01" required value={editing.cost} onChange={e=>update('cost',e.target.value)}/></Field>
        <Field label="Stock / സ്റ്റോക്ക്"><input type="number" min="0" step="0.001" required value={editing.stock} onChange={e=>update('stock',e.target.value)}/></Field>
        <Field label="Low Stock Alert"><input type="number" min="0" step="0.001" required value={editing.lowStock} onChange={e=>update('lowStock',e.target.value)}/></Field>
        <Field label="Tax rate (verify locally)"><select value={editing.tax} onChange={e=>update('tax',e.target.value)}>{['0','3','5','12','18','28'].map(t=><option value={t} key={t}>{t}%</option>)}</select></Field>
        <Field label="SKU / Barcode (optional)"><input maxLength={80} value={editing.sku} onChange={e=>update('sku',e.target.value)}/></Field>
        <div className="form-actions"><button className="button primary" disabled={busy||loadingImage}>{busy?'Saving…':'Save to My Phone'}</button><button type="button" className="button ghost" onClick={()=>setEditing(null)}>Cancel</button></div>
      </form>
    </Panel>}
    <Panel title={`My Product Database (${products.length})`} action={<div className="search"><Search size={16}/><input aria-label="Search products" placeholder="Search Malayalam / English / SKU" value={search} onChange={e=>{setSearch(e.target.value);setVisibleCount(60);}}/></div>}>
      <div className="catalog-filters" aria-label="Filter products">{[
        ['all','All'],['vegetables','Vegetables'],['fruits','Fruits'],['foods','Foods'],['bakery','Bakery'],['sweets','Sweets'],['branded','Branded'],['mine','My Custom Products']
      ].map(([value,label])=><button key={value} className={`catalog-filter ${filter===value?'active':''}`} onClick={()=>{setFilter(value);setVisibleCount(60);}}>{value==='mine'&&<Database size={14}/>} {label}</button>)}</div>
      <div className="csv-toolbar"><label className="small" htmlFor="brand-filter">Filter Brand / ബ്രാൻഡ്</label><select id="brand-filter" value={brandFilter} onChange={e=>{setBrandFilter(e.target.value);setVisibleCount(60);}}><option value="all">All Brands</option>{brandChoices.map(b=><option key={b} value={b}>{b}</option>)}</select></div>
      {!filtered.length?<Empty label="No matching products. Choose a catalog above, or add your own product."/>:<div className="table-wrap product-table-wrap"><table className="product-data-table"><thead><tr><th>Product / ചിത്രം</th><th>Source</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filtered.slice(0,visibleCount).map(p=><tr key={p.id}><td data-label="Product"><div className="product-cell"><ProductVisual product={p}/><div><strong>{names(p).ml||p.name}</strong><div className="small muted">{names(p).en}</div><div className="small muted">{p.brand && p.brand!=='Unbranded / Local'?`${p.brand} · `:''}{p.packSize?`${p.packSize} · `:''}{p.category||'General'} · {p.unit}</div></div></div></td>
        <td data-label="Source"><span className="pill neutral"><HardDrive size={12}/> {p.source==='catalog'?'Catalog':'My Local'}</span></td>
        <td data-label="Price">{p.isTemplate?<span className="pill danger">Set price</span>:<strong>{fmt(p.pricePaise)}/{p.unit}</strong>}</td>
        <td data-label="Stock"><span className={p.stockMilli<=p.lowStockMilli?'danger-text':''}>{qtyText(p.stockMilli)} {p.unit}</span></td>
        <td data-label="Status"><span className={`pill ${p.active?'green':'neutral'}`}>{p.active?'Active':'Inactive'}</span></td>
        <td data-label="Actions"><div className="actions"><button title="Edit name, picture, price, stock" aria-label={`Edit ${p.name}`} className="icon-button" onClick={()=>edit(p)}><Pencil size={17}/></button><button disabled={p.isTemplate} title={p.isTemplate?'Set price first':'Hide/show'} aria-label={`Toggle ${p.name}`} className="icon-button" onClick={async()=>{try{await toggleProduct(p.id)}catch(e){notify(safeError(e),'error')}}}>{p.active?<ToggleRight size={19}/>:<ToggleLeft size={19}/>}</button></div></td>
      </tr>)}</tbody></table><div className="csv-toolbar"><span className="small muted">Showing {Math.min(visibleCount,filtered.length)} of {filtered.length} products</span>{visibleCount<filtered.length && <button className="button secondary" onClick={()=>setVisibleCount(n=>n+60)}>Show more / കൂടുതൽ കാണുക</button>}</div></div>}
    </Panel>
  </div>;
}
