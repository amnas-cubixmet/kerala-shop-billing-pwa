'use client';
import {useState} from 'react';
import {useLiveQuery} from 'dexie-react-hooks';
import {Download, FileDown, FileX2} from 'lucide-react';
import {db} from '@/db/database';
import {fmt, localDate, monthKey} from '@/lib/money';
import {useLanguage} from '@/lib/language';
import {downloadCSV, downloadReceipt} from '@/services/exports';
import {voidInvoice} from '@/services/store';
import {Empty, Field, Metric, Panel, safeError} from '@/components/ui';
import type {Invoice} from '@/types/models';

export default function Reports({notify}:{notify:(text:string,kind?:'error'|'success')=>void}) {
  const {t}=useLanguage();
  const invoices=useLiveQuery(()=>db.invoices.orderBy('date').reverse().toArray(),[])??[];
  const expenses=useLiveQuery(()=>db.expenses.toArray(),[])??[];
  const shop=useLiveQuery(()=>db.shops.toCollection().first(),[]);
  const [period,setPeriod]=useState<'day'|'month'>('day');
  const [date,setDate]=useState(localDate()),[month,setMonth]=useState(monthKey()),[showVoid,setShowVoid]=useState(false);
  const filterDate=(d:string)=>period==='day'?d===date:d.startsWith(month);
  const rows=invoices.filter(i=>filterDate(i.date)&&(showVoid||i.status==='final')).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
  const active=rows.filter(x=>x.status==='final');
  const sales=active.reduce((s,i)=>s+i.totalPaise,0);
  const collected=active.reduce((s,i)=>s+i.paidPaise,0);
  const expenseTotal=expenses.filter(e=>filterDate(e.date)).reduce((s,e)=>s+e.amountPaise,0);
  function csv(){
    downloadCSV(`shop-sales-${period==='day'?date:month}.csv`,[
      ['Sale Number','Date','Payment','Status','Subtotal INR','Discount INR','Tax INR','Total INR','Paid INR'],
      ...rows.map(i=>[i.number,i.date,i.paymentMethod,i.status,(i.subtotalPaise/100).toFixed(2),(i.discountPaise/100).toFixed(2),(i.taxPaise/100).toFixed(2),(i.totalPaise/100).toFixed(2),(i.paidPaise/100).toFixed(2)])
    ]);
  }
  async function pdf(i:Invoice){if(!shop)return;try{const items=await db.invoiceItems.where('invoiceId').equals(i.id).toArray();await downloadReceipt(i,items,shop);}catch(e){notify(safeError(e),'error')}}
  return <div className="stack"><div className="page-heading"><div><h1>{t('reports')}</h1><p>{t('reportIntro')}</p></div><button className="button secondary" onClick={csv}><Download size={16}/>{t('salesCsv')}</button></div>
    <div className="report-filter"><div className="language-switch report-period" role="group" aria-label="Report period"><button aria-pressed={period==='day'} className={period==='day'?'chosen':''} onClick={()=>setPeriod('day')}>{t('daily')}</button><button aria-pressed={period==='month'} className={period==='month'?'chosen':''} onClick={()=>setPeriod('month')}>{t('monthly')}</button></div><Field label={t(period==='day'?'reportDate':'reportMonth')}><input type={period==='day'?'date':'month'} value={period==='day'?date:month} onChange={e=>period==='day'?setDate(e.target.value):setMonth(e.target.value)}/></Field><label className="check"><input type="checkbox" checked={showVoid} onChange={e=>setShowVoid(e.target.checked)}/>{t('showVoided')}</label></div>
    <div className="metrics"><Metric label={t('todaySales')} value={fmt(sales)}/><Metric label={t('salesEntries')} value={String(active.length)}/><Metric label={t('collected')} value={fmt(collected)}/><Metric label={t('expenses')} value={fmt(expenseTotal)}/></div>
    <Panel title={`${t('salesHistory')} (${rows.length})`} sub={t('receiptHint')}>
      {!rows.length?<Empty label={t('noSalesPeriod')}/>:<div className="table-wrap"><table><thead><tr><th>{t('sale')}</th><th>{t('total')}</th><th>{t('payment')}</th><th>{t('status')}</th><th>{t('actions')}</th></tr></thead><tbody>{rows.map(i=><tr key={i.id}><td><strong>{i.number}</strong><div className="muted small">{i.date}</div></td><td>{fmt(i.totalPaise)}</td><td>{t(i.paymentMethod)}</td><td><span className={`pill ${i.status==='void'?'neutral':'green'}`}>{i.status}</span></td><td><div className="actions"><button className="icon-button" title={t('receiptOptional')} aria-label={`${t('receiptOptional')} ${i.number}`} onClick={()=>void pdf(i)}><FileDown size={17}/></button>{i.status==='final'&&<button className="icon-button danger-text" title={t('cancelSale')} aria-label={`${t('cancelSale')} ${i.number}`} onClick={async()=>{if(!confirm(`${t('cancelSale')} ${i.number}?`))return;try{await voidInvoice(i.id);notify(`${i.number} ${t('cancelSale')}`)}catch(e){notify(safeError(e),'error')}}}><FileX2 size={17}/></button>}</div></td></tr>)}</tbody></table></div>}
    </Panel><div className="notice"><span>{t('cashflowNote')} {t('outstanding')}: {fmt(sales-collected)}</span></div>
  </div>;
}
