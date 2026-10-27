'use client';
import {useMemo,useState} from 'react';
import {Check,CheckCircle2,ChevronLeft,ListChecks,Plus,Search,ShoppingBag,X} from 'lucide-react';
import {useLanguage} from '@/lib/language';
import {useUpdateHold} from '@/lib/update-guard';
import {CATALOG_GROUPS,addSelectedCatalogProducts,productPresets,type PresetGroup} from '@/services/store';
import {isShopProduct} from '@/lib/shop-products';
import {Empty,safeError} from '@/components/ui';
import ProductVisual from '@/components/ProductVisual';
import type {Product} from '@/types/models';

const FIRST_PAGE=48;
const GROUP_TRANSLATIONS:Record<PresetGroup,[string,string]>={
  vegetables:['Vegetables','പച്ചക്കറി'],
  fruits:['Fruits','പഴങ്ങൾ'],
  foods:['Foods & Grocery','പലചരക്ക്'],
  bakery:['Bakery','ബേക്കറി'],
  sweets:['Sweets','മിഠായികൾ'],
  branded:['Branded products','ബ്രാൻഡഡ് സാധനങ്ങൾ'],
};

type Props={
  existingProducts:Product[];
  notify:(message:string,kind?:'error'|'success')=>void;
  onBack:()=>void;
  onAdded:()=>void;
  onCustom:()=>void;
};

export default function CatalogPicker({existingProducts,notify,onBack,onAdded,onCustom}:Props){
  const {language,t,categoryName}=useLanguage();
  const all=useMemo(()=>CATALOG_GROUPS.flatMap(group=>
    productPresets(group).map(product=>({...product,group}))
  ),[]);
  const added=useMemo(()=>new Set(existingProducts.filter(isShopProduct).map(p=>p.id)),[existingProducts]);
  const [category,setCategory]=useState<'all'|PresetGroup>('all');
  const [query,setQuery]=useState('');
  const [selected,setSelected]=useState<Set<string>>(()=>new Set());
  const [visibleCount,setVisibleCount]=useState(FIRST_PAGE);
  const [busy,setBusy]=useState(false);
  useUpdateHold('catalog-selection',selected.size>0||busy);
  const matches=useMemo(()=>{
    const q=query.trim().toLocaleLowerCase();
    return all.filter(product=>
      (category==='all'||product.group===category) &&
      (!q||[product.malayalamName,product.englishName,product.category,
        'brand' in product ? String(product.brand) : '',
        'packSize' in product ? String(product.packSize) : ''
      ].join(' ').toLocaleLowerCase().includes(q))
    );
  },[all,category,query]);
  function toggle(id:string){
    if(added.has(id)||busy)return;
    setSelected(old=>{
      const next=new Set(old);
      if(next.has(id))next.delete(id);else next.add(id);
      return next;
    });
  }
  async function addSelected(){
    if(!selected.size||busy)return;
    setBusy(true);
    try{
      const count=await addSelectedCatalogProducts([...selected]);
      notify(count?
        (language==='ml'? `${count} സാധനങ്ങൾ നിങ്ങളുടെ കടയിലേക്ക് ചേർത്തു. ഇനി വില സെറ്റ് ചെയ്യാം.`:
          `${count} products added to your shop. Set their selling prices to start billing.`):
        (language==='ml'?'തിരഞ്ഞെടുത്ത സാധനങ്ങൾ ഇതിനകം ചേർത്തിട്ടുണ്ട്.':'These products are already in your shop.'));
      onAdded();
    }catch(error){notify(safeError(error),'error');}
    finally{setBusy(false);}
  }
  return <div className="ref-catalog-picker">
    <div className="ref-page-heading ref-edit-heading">
      <button className="ref-back-button" type="button" onClick={onBack} aria-label={t('cancel')}><ChevronLeft size={22}/></button>
      <div className="grow"><h1>{t('chooseFromCatalog')}</h1>
        <p>{t('catalogSelectionHint')}</p></div>
    </div>
    <section className="ref-catalog-picker-intro">
      <div><ListChecks size={20}/><strong>{all.length} {language==='ml'?'റെഡി-മെയ്ഡ് സാധനങ്ങൾ':'ready-made products'}</strong></div>
      <p>{t('catalogSelectionExplanation')}</p>
    </section>
    <label className="ref-product-search"><Search size={20}/>
      <input value={query} onChange={e=>{setQuery(e.target.value);setVisibleCount(FIRST_PAGE);}}
        placeholder={t('catalogSearch')} aria-label={t('catalogSearch')}/>
      {query&&<button className="ref-picker-clear" type="button" onClick={()=>{setQuery('');setVisibleCount(FIRST_PAGE);}} aria-label="Clear search"><X size={17}/></button>}
    </label>
    <div className="ref-picker-filters" aria-label={language==='ml'?'വിഭാഗങ്ങൾ':'Catalog categories'}>
      <button type="button" className={category==='all'?'selected':''} aria-pressed={category==='all'} onClick={()=>{setCategory('all');setVisibleCount(FIRST_PAGE);}}>{t('all')}</button>
      {CATALOG_GROUPS.map(group=><button type="button" key={group} className={category===group?'selected':''}
        aria-pressed={category===group} onClick={()=>{setCategory(group);setVisibleCount(FIRST_PAGE);}}>
        {GROUP_TRANSLATIONS[group][language==='ml'?1:0]}</button>)}
    </div>
    <div className="ref-picker-count"><strong>{matches.length} {language==='ml'?'സാധനങ്ങൾ':'products'}</strong><span>{added.size} {language==='ml'?'കടയിൽ ചേർത്തിട്ടുണ്ട്':'already in your shop'}</span></div>
    {matches.length===0?<div className="ref-picker-empty">
      <Empty label={language==='ml'?'ഈ പേരിൽ Catalog-ൽ സാധനമില്ല.':'This product is not in the catalog.'}/>
      <button className="button secondary" type="button" onClick={onCustom}><Plus size={18}/>{t('addCustomProduct')}</button>
    </div>:<div className="ref-picker-list">
      {matches.slice(0,visibleCount).map(product=>{
        const inShop=added.has(product.id);
        const chosen=selected.has(product.id);
        const name=(language==='ml'?product.malayalamName:product.englishName)||product.malayalamName||product.englishName;
        const subtitle='brand' in product && product.brand && product.brand!=='Unbranded / Local'?String(product.brand):
          categoryName(product.category);
        return <button type="button" key={product.id}
          className={`ref-picker-product ${chosen?'chosen':''} ${inShop?'already-added':''}`}
          disabled={inShop||busy} aria-pressed={chosen} onClick={()=>toggle(product.id)}>
          <ProductVisual product={{id:product.id,name, imageDataUrl:''}} large/>
          <span className="ref-picker-details"><strong>{name}</strong><small>{subtitle}</small><small>{product.unit} {'packSize' in product && product.packSize ? `· ${product.packSize}`:''}</small></span>
          <span className="ref-picker-action">
            {inShop?<><CheckCircle2 size={18}/>{t('alreadyAdded')}</>:
              chosen?<><Check size={18}/>{language==='ml'?'തിരഞ്ഞെടുത്തു':'Selected'}</>:
                <><Plus size={18}/>{language==='ml'?'തിരഞ്ഞെടുക്കുക':'Select'}</>}
          </span>
        </button>;
      })}
    </div>}
    {visibleCount<matches.length&&<button type="button" className="button secondary ref-picker-more"
      onClick={()=>setVisibleCount(n=>n+FIRST_PAGE)}>{language==='ml'?'കൂടുതൽ കാണുക':'Show more'} ({matches.length-visibleCount})</button>}
    <button className="ref-picker-create" type="button" onClick={onCustom}><Plus size={19}/>
      {t('addCustomProduct')} <small>{t('customProductHint')}</small></button>
    <div className="ref-picker-bottom">
      <span><ShoppingBag size={18}/>{selected.size} {language==='ml'?'തിരഞ്ഞെടുത്തു':'selected'}</span>
      <button type="button" className="button primary" onClick={()=>void addSelected()} disabled={busy||!selected.size}>
        <Check size={19}/>{busy?t('saving'):`${t('addSelectedToShop')} (${selected.size})`}</button>
    </div>
  </div>;
}
