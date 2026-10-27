'use client';
import { useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Download, FileDown, FileX2 } from 'lucide-react';
import { db } from '@/db/database';
import { fmt, monthKey } from '@/lib/money';
import { downloadCSV, downloadReceipt } from '@/services/exports';
import { voidInvoice } from '@/services/store';
import { Empty, Field, Metric, Panel, safeError } from '@/components/ui';
import type { Invoice } from '@/types/models';

export default function Reports({notify}:{notify:(text:string,kind?:'error'|'success')=>void}) {
  const invoices=useLiveQuery(()=>db.invoices.orderBy('date').reverse().toArray(),[])??[];
  const expenses=useLiveQuery(()=>db.expenses.toArray(),[])??[];
  const shop=useLiveQuery(()=>db.shops.toCollection().first(),[]);
  const [month,setMonth]=useState(monthKey()),[showVoid,setShowVoid]=useState(false);
  const rows = useMemo(()=>invoices.filter(x=>x.date.startsWith(month)&&(showVoid||x.status==='final')).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)),[invoices,month,showVoid]);
  const active=rows.filter(x=>x.status==='final');
  const sales=active.reduce((s,i)=>s+i.totalPaise,0);
  const collected=active.reduce((s,i)=>s+i.paidPaise,0);
  const expenseTotal=expenses.filter(e=>e.date.startsWith(month)).reduce((s,e)=>s+e.amountPaise,0);
  function csv() {downloadCSV(`sales-${month}.csv`,[['Invoice Number','Date','Customer','Payment','Status','Subtotal INR','Discount INR','Tax INR','Total INR','Paid INR'],...rows.map(i=>[i.number,i.date,i.customerName,i.paymentMethod,i.status,(i.subtotalPaise/100).toFixed(2),(i.discountPaise/100).toFixed(2),(i.taxPaise/100).toFixed(2),(i.totalPaise/100).toFixed(2),(i.paidPaise/100).toFixed(2)])]);}
  async function pdf(i:Invoice){if(!shop)return;try{const items=await db.invoiceItems.where('invoiceId').equals(i.id).toArray();await downloadReceipt(i,items,shop);}catch(e){notify(safeError(e),'error')}}
  return <div className="stack"><div className="page-heading"><div><h1>Reports & Invoices</h1><p>Sales and expenses from your device, exportable as CSV.</p></div><button className="button secondary" onClick={csv}><Download size={16}/> Sales CSV</button></div>
    <div className="report-filter"><Field label="Report month"><input type="month" value={month} onChange={e=>setMonth(e.target.value)}/></Field><label className="check"><input type="checkbox" checked={showVoid} onChange={e=>setShowVoid(e.target.checked)}/> Show voided invoices</label></div>
    <div className="metrics"><Metric label="Total sales" value={fmt(sales)}/><Metric label="Collected" value={fmt(collected)}/><Metric label="Outstanding" value={fmt(sales-collected)}/><Metric label="Expenses" value={fmt(expenseTotal)}/></div>
    <Panel title={`Invoices (${rows.length})`} sub="Voiding a bill restores its stock; its number is never reused.">
      {!rows.length?<Empty label="No invoices for this month."/>:<div className="table-wrap"><table><thead><tr><th>Invoice</th><th>Customer</th><th>Total</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead><tbody>{rows.map(i=><tr key={i.id}><td><strong>{i.number}</strong><div className="muted small">{i.date}</div></td><td>{i.customerName}</td><td>{fmt(i.totalPaise)}</td><td className="capitalize">{i.paymentMethod}</td><td><span className={`pill ${i.status==='void'?'neutral':'green'}`}>{i.status}</span></td><td><div className="actions"><button className="icon-button" title="Download invoice PDF" aria-label={`Download ${i.number}`} onClick={()=>pdf(i)}><FileDown size={17}/></button>{i.status==='final'&&<button className="icon-button danger-text" title="Void invoice" aria-label={`Void ${i.number}`} onClick={async()=>{if(!confirm(`Void ${i.number}? Inventory quantities will be returned. This cannot be undone.`))return;try{await voidInvoice(i.id);notify('Invoice voided and stock restored.')}catch(e){notify(safeError(e),'error')}}}><FileX2 size={17}/></button>}</div></td></tr>)}</tbody></table></div>}
    </Panel><div className="notice"><span><strong>Accounting note:</strong> Sale totals include tax; this report is not a GST return, audited profit statement, or full receivables ledger.</span></div>
  </div>;
}
