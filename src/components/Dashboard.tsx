'use client';
import {useLiveQuery} from 'dexie-react-hooks';
import {CalendarDays, PackageX, Plus, TrendingUp, Wallet, Receipt, IndianRupee} from 'lucide-react';
import {db} from '@/db/database';
import {fmt, localDate, monthKey} from '@/lib/money';
import {useLanguage} from '@/lib/language';
import {Metric, Panel, Empty} from '@/components/ui';
import type {Invoice, Expense, Product} from '@/types/models';

export default function Dashboard({navigate}:{navigate:(next:string)=>void}) {
  const {t,productName,categoryName,language}=useLanguage();
  const data=useLiveQuery(async()=>{
    const [invoices,expenses,products]=await Promise.all([db.invoices.toArray(),db.expenses.toArray(),db.products.toArray()]);
    return {invoices,expenses,products};
  },[]);
  if(!data)return <p className="muted">…</p>;
  const {invoices,expenses,products}=data;
  const today=localDate(),month=monthKey();
  const active=(rows:Invoice[])=>rows.filter(x=>x.status==='final');
  const sumSales=(rows:Invoice[])=>active(rows).reduce((s,i)=>s+i.totalPaise,0);
  const sumExpenses=(rows:Expense[])=>rows.reduce((s,i)=>s+i.amountPaise,0);
  const todays=active(invoices.filter(i=>i.date===today));
  const todaySales=sumSales(todays), todayExpenses=sumExpenses(expenses.filter(e=>e.date===today));
  const monthlySales=sumSales(invoices.filter(i=>i.date.startsWith(month)));
  const low=products.filter(p=>p.active&&p.stockMilli<=p.lowStockMilli);
  const recent=active([...invoices]).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).slice(0,6);
  return <div className="stack">
    <div className="welcome"><div><h1>{t('welcome')}</h1><p>{t('welcomeSub')}</p><div className="dashboard-date"><CalendarDays size={15}/>{new Date().toLocaleDateString(language==='ml'?'ml-IN':'en-IN',{day:'numeric',month:'long',year:'numeric'})}</div></div><button className="button primary dashboard-cta" onClick={()=>navigate('billing')}><Plus size={19}/>{t('newSale')}</button></div>
    <div className="metrics">
      <Metric label={t('todaySales')} value={fmt(todaySales)} icon={<TrendingUp size={19}/>} variant="primary"/>
      <Metric label={t('todayCount')} value={String(todays.length)} icon={<Receipt size={19}/>}/>
      <Metric label={t('todayExpenses')} value={fmt(todayExpenses)} icon={<Wallet size={19}/>}/>
      <Metric label={t('todayBalance')} value={fmt(todaySales-todayExpenses)} icon={<IndianRupee size={19}/>}/>
    </div>
    <div className="notice good"><TrendingUp size={19}/><span>{t('monthlySales')}: <strong>{fmt(monthlySales)}</strong></span></div>
    <div className="two-columns">
      <Panel title={t('recentSales')} sub={t('storedHere')} action={<button className="text-button" onClick={()=>navigate('reports')}>{t('seeReports')} →</button>}>
        {!recent.length?<Empty label={t('noSales')}/>:<div className="list">{recent.map(i=><div className="list-row" key={i.id}><span className="list-icon"><Receipt size={18}/></span><div className="grow"><strong>{i.number}</strong><div className="muted small">{i.date} · {t(i.paymentMethod)}</div></div><strong>{fmt(i.totalPaise)}</strong></div>)}</div>}
      </Panel>
      <Panel title={t('stockAlerts')} action={<button className="text-button" onClick={()=>navigate('products')}>{t('manageStock')} →</button>}>
        {!low.length?<div className="notice good"><TrendingUp size={19}/>{t('noStockAlerts')}</div>:<div className="list">{low.slice(0,7).map((p:Product)=><div className="list-row" key={p.id}><span className="list-icon warn"><PackageX size={18}/></span><div className="grow"><strong>{productName(p)}</strong><div className="muted small">{categoryName(p.category||'General')}</div></div><span className="pill danger">{p.stockMilli/1000} {p.unit}</span></div>)}</div>}
      </Panel>
    </div>
    <div className="notice"><CalendarDays size={19}/><span>{t('backupReminder')}</span><button className="text-button" onClick={()=>navigate('settings')}>{t('backupTitle')}</button></div>
    <p className="muted small disclaimer">{t('cashflowNote')}</p>
  </div>;
}
