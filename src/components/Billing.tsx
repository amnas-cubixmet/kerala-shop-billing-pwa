'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { CheckCircle2, FileDown, Minus, Plus, Search, Trash2 } from 'lucide-react';
import { db } from '@/db/database';
import { useUpdateHold } from '@/lib/update-guard';
import { calculateQuote, fmt, qtyText, rupeeToPaise, unitsToMilli } from '@/lib/money';
import { downloadReceipt } from '@/services/exports';
import { saveInvoice } from '@/services/store';
import { Empty, Field, Panel, safeError } from '@/components/ui';
import ProductVisual from '@/components/ProductVisual';
import type { CartEntry, Invoice, PaymentMethod } from '@/types/models';

const DRAFT_KEY = 'ksb:billing-draft-v1';
type BillingDraft = {cart:CartEntry[];discount:string;payment:PaymentMethod;customerId:string};
function readDraft(): BillingDraft | null {
  try {const value=localStorage.getItem(DRAFT_KEY); if(!value)return null;
    const parsed=JSON.parse(value) as Partial<BillingDraft>;
    if(!Array.isArray(parsed.cart))return null;
    return {cart:parsed.cart.filter(e=>typeof e.productId==='string' && Number.isInteger(e.quantityMilli) && e.quantityMilli>0).slice(0,200),discount:String(parsed.discount??'0'),payment:parsed.payment??'cash',customerId:String(parsed.customerId??'')};
  } catch {return null;}
}
export default function Billing({notify}: {notify:(message:string,kind?:'error'|'success')=>void}) {
  const products = useLiveQuery(()=>db.products.toArray().then(rows => rows.filter(p => p.active)),[]) ?? [];
  const customers = useLiveQuery(()=>db.customers.orderBy('name').toArray(),[]) ?? [];
  const shop = useLiveQuery(()=>db.shops.toCollection().first(),[]);
  const [search,setSearch]=useState(''),[cart,setCart]=useState<CartEntry[]>(() => typeof window !== 'undefined' ? readDraft()?.cart ?? [] : []);
  const [discount,setDiscount]=useState(() => typeof window !== 'undefined' ? readDraft()?.discount ?? '0' : '0'),[payment,setPayment]=useState<PaymentMethod>(()=>typeof window !== 'undefined' ? readDraft()?.payment ?? 'cash':'cash'),[customerId,setCustomerId]=useState(()=>typeof window !== 'undefined'?readDraft()?.customerId??'':'');
  const [busy,setBusy]=useState(false),[last,setLast]=useState<Invoice|null>(null);
  const savingRef=useRef(false);
  useUpdateHold('billing',cart.length>0 || busy);
  useEffect(()=>{
    try {if(cart.length) localStorage.setItem(DRAFT_KEY,JSON.stringify({cart,discount,payment,customerId}));
    else localStorage.removeItem(DRAFT_KEY); } catch { /* storage may be unavailable */ }
  },[cart,discount,payment,customerId]);
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
  async function finalize() {
    if (savingRef.current || !quote.data || !cart.length) return;
    savingRef.current=true;setBusy(true);
    try {
      const result=await saveInvoice({cart,discount,paymentMethod:payment,customerId});
      try {localStorage.removeItem(DRAFT_KEY);}catch{}
      setLast(result);setCart([]);setDiscount('0');setSearch('');
      notify(`${result.number} saved on this device.`);
    }catch(error){notify(safeError(error),'error');}finally{savingRef.current=false;setBusy(false)}
  }
  async function receipt() {
    if(!last || !shop) return;
    try {const items=await db.invoiceItems.where('invoiceId').equals(last.id).toArray();await downloadReceipt(last,items,shop);}catch(e){notify(safeError(e),'error')}
  }
  return <div className="stack">
    <div className="page-heading"><div><h1>Create a Bill</h1><p>Offline-ready point of sale. Stock updates automatically.</p></div><div className="pill green"><CheckCircle2 size={15}/> Local save</div></div>
    {last && <div className="notice good"><CheckCircle2 size={21}/><span className="grow"><strong>{last.number} saved!</strong><br/><span className="small">Total {fmt(last.totalPaise)} · {last.paymentMethod.toUpperCase()}</span></span><button className="button secondary" onClick={receipt}><FileDown size={16}/> Receipt PDF</button><button className="icon-button" aria-label="Close receipt notice" onClick={()=>setLast(null)}>×</button></div>}
    <div className="billing-grid">
      <Panel title="Select products" sub="Tap a product to add it to the cart" action={<div className="search"><Search size={16}/><input aria-label="Find product" placeholder="Find product / SKU" value={search} onChange={e=>setSearch(e.target.value)}/></div>}>
        {!shown.length ? <Empty label="No products available. Add stock in Products first."/> : <div className="product-grid">{shown.map(p=><button key={p.id} disabled={p.stockMilli<=0} onClick={()=>add(p.id)} className="product-tile"><ProductVisual product={p} large/><strong>{p.name}</strong><span className="muted small">{qtyText(p.stockMilli)} {p.unit} in stock</span><div className="product-price">{fmt(p.pricePaise)} <Plus size={16}/></div></button>)}</div>}
      </Panel>
      <Panel title={`Current bill (${cart.length})`} sub="Prices before GST; amounts in INR">
        {!cart.length ? <Empty label="Your cart is empty. Choose products to begin."/> : <div className="cart-list">{cart.map(item=>{
          const p=products.find(x=>x.id===item.productId);
          if(!p) return <div key={item.productId} className="danger-text">Product missing — remove this line.</div>;
          return <div key={item.productId} className="cart-row"><div className="grow"><strong>{p.name}</strong><div className="muted small">{fmt(p.pricePaise)}/{p.unit} · {p.taxBps/100}% GST</div></div><div className="qty-control"><button aria-label={`Decrease ${p.name}`} onClick={()=>setCart(prev=>prev.map(c=>c.productId===p.id?{...c,quantityMilli:Math.max(0,c.quantityMilli-1000)}:c).filter(c=>c.quantityMilli>0))}><Minus size={14}/></button><input aria-label={`Quantity ${p.name}`} type="number" min="0.001" step="0.001" value={item.quantityMilli/1000} onChange={e=>changeQty(p.id,e.target.value)}/><button aria-label={`Increase ${p.name}`} onClick={()=>add(p.id)}><Plus size={14}/></button></div><button className="icon-button" aria-label={`Remove ${p.name}`} onClick={()=>setCart(prev=>prev.filter(c=>c.productId!==p.id))}><Trash2 size={16}/></button></div>})}</div>}
        <div className="bill-fields"><Field label="Customer"><select value={customerId} onChange={e=>setCustomerId(e.target.value)}><option value="">Walk-in customer</option>{customers.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></Field><div className="inline-fields"><Field label="Discount (₹)"><input type="number" min="0" step="0.01" value={discount} onChange={e=>setDiscount(e.target.value)}/></Field><Field label="Payment"><select value={payment} onChange={e=>setPayment(e.target.value as PaymentMethod)}><option value="cash">Cash</option><option value="upi">UPI</option><option value="card">Card</option><option value="other">Other</option><option value="unpaid">Unpaid</option></select></Field></div></div>
        <div className="totals"><div><span>Subtotal</span><span>{fmt(quote.data?.subtotalPaise??0)}</span></div><div><span>Discount</span><span>- {fmt(quote.data?.discountPaise??0)}</span></div><div><span>GST (exclusive)</span><span>{fmt(quote.data?.taxPaise??0)}</span></div><div className="grand-total"><strong>Total</strong><strong>{fmt(quote.data?.totalPaise??0)}</strong></div></div>
        {quote.error && cart.length>0 && <p className="danger-text small">{quote.error}</p>}
        <button className="button primary wide big" disabled={busy||!cart.length||!quote.data} onClick={finalize}><CheckCircle2 size={19}/>{busy?'Saving bill…':'Save Bill & Update Stock'}</button>
        <p className="muted tiny">Unpaid invoices do not create a collection ledger in this version. Use the report to see outstanding balances.</p>
      </Panel>
    </div>
  </div>;
}
