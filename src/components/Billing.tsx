'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { CheckCircle2, FileDown, Minus, Plus, Search, ShoppingBasket, Trash2 } from 'lucide-react';
import { db } from '@/db/database';
import {useLanguage} from '@/lib/language';
import { useUpdateHold } from '@/lib/update-guard';
import { calculateQuote, fmt, qtyText, rupeeToPaise, unitsToMilli } from '@/lib/money';
import { downloadReceipt } from '@/services/exports';
import { saveInvoice } from '@/services/store';
import { Empty, Field, Panel, safeError } from '@/components/ui';
import ProductVisual from '@/components/ProductVisual';
import type { CartEntry, Invoice, PaymentMethod } from '@/types/models';

const DRAFT_KEY = 'ksb:billing-draft-v1';
type BillingDraft = {cart:CartEntry[];discount:string;payment:PaymentMethod};
function readDraft(): BillingDraft | null {
  try {const value=localStorage.getItem(DRAFT_KEY); if(!value)return null;
    const parsed=JSON.parse(value) as Partial<BillingDraft>;
    if(!Array.isArray(parsed.cart))return null;
    return {cart:parsed.cart.filter(e=>typeof e.productId==='string' && Number.isInteger(e.quantityMilli) && e.quantityMilli>0).slice(0,200),discount:String(parsed.discount??'0'),payment:parsed.payment??'cash'};
  } catch {return null;}
}
export default function Billing({notify}: {notify:(message:string,kind?:'error'|'success')=>void}) {
  const {t,productName,language}=useLanguage();
  const queriedProducts = useLiveQuery(()=>db.products.toArray().then(rows => rows.filter(p => p.active)),[]);
  const products = useMemo(()=>queriedProducts ?? [],[queriedProducts]);
  const shop = useLiveQuery(()=>db.shops.toCollection().first(),[]);
  const [search,setSearch]=useState(''),[cart,setCart]=useState<CartEntry[]>(() => typeof window !== 'undefined' ? readDraft()?.cart ?? [] : []);
  const [discount,setDiscount]=useState(() => typeof window !== 'undefined' ? readDraft()?.discount ?? '0' : '0'),[payment,setPayment]=useState<PaymentMethod>(()=>typeof window !== 'undefined' ? readDraft()?.payment ?? 'cash':'cash');
  const [busy,setBusy]=useState(false),[last,setLast]=useState<Invoice|null>(null);
  const savingRef=useRef(false);
  useUpdateHold('billing',cart.length>0 || busy);
  useEffect(()=>{
    try {if(cart.length) localStorage.setItem(DRAFT_KEY,JSON.stringify({cart,discount,payment}));
    else localStorage.removeItem(DRAFT_KEY); } catch { /* storage may be unavailable */ }
  },[cart,discount,payment]);
  const shown = products.filter(p=>`${p.name} ${p.sku} ${p.category} ${p.brand||''} ${p.packSize||''}`.toLowerCase().includes(search.toLowerCase())).slice(0,60);
  const quote = useMemo(()=>{try{return {data:calculateQuote(cart,products,rupeeToPaise(discount||'0')),error:''}}catch(error){return {data:null,error:safeError(error)}}},[cart,products,discount]);
  function add(id:string) {
    const p=products.find(p=>p.id===id); if(!p) return;
    setCart(prev=>{
      const current=prev.find(x=>x.productId===id);
      if(current) return prev.map(x=>x.productId===id?{...x,quantityMilli:Math.min(p.stockMilli,x.quantityMilli+1000)}:x);
      return [...prev,{productId:id,quantityMilli:Math.min(p.stockMilli,1000)}].filter(x=>x.quantityMilli>0);
    });
  }
  function changeQty(id:string,value:string) {try {const quantityMilli=unitsToMilli(value); setCart(prev=>prev.map(x=>x.productId===id?{...x,quantityMilli}:x));}catch { /* incomplete input is ignored */ }}
  async function finalize(withReceipt=false) {
    if (savingRef.current || !quote.data || !cart.length) return;
    savingRef.current=true;setBusy(true);
    try {
      const result=await saveInvoice({cart,discount,paymentMethod:payment});
      try {localStorage.removeItem(DRAFT_KEY);}catch{}
      setLast(result);setCart([]);setDiscount('0');setSearch('');
      notify(`${result.number} · ${t('saleSaved')}`);
      if(withReceipt&&shop){try{const items=await db.invoiceItems.where('invoiceId').equals(result.id).toArray();await downloadReceipt(result,items,shop)}catch(e){notify(`${t('saleSaved')}. PDF: ${safeError(e)}`,'error')}}
    }catch(error){notify(safeError(error),'error');}finally{savingRef.current=false;setBusy(false)}
  }
  async function receipt() {
    if(!last || !shop) return;
    try {const items=await db.invoiceItems.where('invoiceId').equals(last.id).toArray();await downloadReceipt(last,items,shop);}catch(e){notify(safeError(e),'error')}
  }
  return <div className="stack ref-billing-page">
    <div className="ref-page-heading"><div><h1>{t('recordSale')}</h1><p>{t('saleIntro')}</p></div><span className="ref-private-label"><CheckCircle2 size={15}/>{t('localSave')}</span></div>
    {last && <div className="notice good ref-last-sale"><CheckCircle2 size={21}/><span className="grow"><strong>{last.number} · {t('saleSaved')}</strong><br/><span className="small">{fmt(last.totalPaise)} · {last.paymentMethod.toUpperCase()}</span></span><button className="button secondary" onClick={()=>void receipt()}><FileDown size={16}/>{t('receiptOptional')}</button><button className="icon-button" aria-label="Close receipt notice" onClick={()=>setLast(null)}>×</button></div>}
    <div className="ref-billing-layout">
      <section className="ref-billing-catalog">
        <label className="ref-product-search"><Search size={19}/><input aria-label={t('findProduct')} placeholder={t('findProduct')} value={search} onChange={e=>setSearch(e.target.value)}/></label>
        <div className="ref-section-title"><h2>{t('selectProducts')}</h2><small>{t('selectHint')}</small></div>
        {!shown.length?<Empty label={t('noProducts')}/>:<div className="ref-billing-products">{shown.map(p=><button type="button" key={p.id} disabled={p.stockMilli<=0} onClick={()=>add(p.id)} className="ref-billing-product"><ProductVisual product={p} large/><strong>{productName(p)}</strong><span>{fmt(p.pricePaise)}/{p.unit}</span><span className="ref-billing-plus"><Plus size={15}/></span></button>)}</div>}
      </section>
      <section className="ref-cart-panel">
        <div className="ref-cart-heading"><h2>{t('currentSale')} <span>({cart.length})</span></h2>{cart.length>0&&<button type="button" onClick={()=>setCart([])}><Trash2 size={16}/>{language==='ml'?'എല്ലാം ഒഴിവാക്കുക':'Clear all'}</button>}</div>
        {!cart.length?<div className="ref-cart-empty"><ShoppingBasket size={36}/><p>{t('cartEmpty')}</p></div>:
          <div className="ref-cart-list">{cart.map(item=>{
          const p=products.find(x=>x.id===item.productId);
          if(!p)return <div key={item.productId} className="danger-text">Product missing — remove this line.</div>;
          return <div key={item.productId} className="ref-cart-item"><ProductVisual product={p}/><div className="ref-cart-item-name"><strong>{productName(p)}</strong><small>{fmt(p.pricePaise)}/{p.unit}</small></div><div className="ref-cart-item-controls"><div className="qty-control"><button type="button" aria-label={`Decrease ${productName(p)}`} onClick={()=>setCart(prev=>prev.map(c=>c.productId===p.id?{...c,quantityMilli:Math.max(0,c.quantityMilli-1000)}:c).filter(c=>c.quantityMilli>0))}><Minus size={15}/></button><input aria-label={`Quantity ${p.name}`} type="number" inputMode="decimal" min="0.001" step="0.001" value={item.quantityMilli/1000} onChange={e=>changeQty(p.id,e.target.value)}/><button type="button" aria-label={`Increase ${productName(p)}`} onClick={()=>add(p.id)}><Plus size={15}/></button></div><button type="button" className="ref-cart-remove" aria-label={`Remove ${productName(p)}`} onClick={()=>setCart(prev=>prev.filter(c=>c.productId!==p.id))}><Trash2 size={15}/></button></div><strong className="ref-cart-item-total">{fmt(Math.round(p.pricePaise*item.quantityMilli/1000))}</strong></div>})}</div>}
        <div className="ref-bill-inputs"><Field label={t('discount')}><input type="number" inputMode="decimal" min="0" step="0.01" value={discount} onChange={e=>setDiscount(e.target.value)}/></Field><Field label={t('payment')}><select value={payment} onChange={e=>setPayment(e.target.value as PaymentMethod)}><option value="cash">{t('cash')}</option><option value="upi">{t('upi')}</option><option value="card">{t('card')}</option><option value="other">{t('other')}</option><option value="unpaid">{t('unpaid')}</option></select></Field></div>
        <div className="ref-bill-totals"><div><span>{t('subtotal')}</span><strong>{fmt(quote.data?.subtotalPaise??0)}</strong></div><div><span>{t('discount')}</span><strong>- {fmt(quote.data?.discountPaise??0)}</strong></div><div><span>{t('tax')}</span><strong>{fmt(quote.data?.taxPaise??0)}</strong></div><div className="ref-bill-grand"><span>{t('total')}</span><strong>{fmt(quote.data?.totalPaise??0)}</strong></div></div>
        {quote.error&&cart.length>0&&<p role="alert" className="danger-text small">{quote.error}</p>}
        <div className="sale-actions ref-sale-actions"><button className="button primary wide big" disabled={busy||!cart.length||!quote.data} onClick={()=>void finalize(false)}><CheckCircle2 size={20}/>{busy?t('saving'):t('recordSale')}</button><button className="button secondary wide" disabled={busy||!cart.length||!quote.data} onClick={()=>void finalize(true)}><FileDown size={19}/>{t('saveAndPdf')}</button></div>
        <p className="ref-bill-footnote">{t('receiptHint')}</p>
      </section>
    </div>
  </div>;
}
