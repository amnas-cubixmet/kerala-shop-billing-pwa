'use client';
import {useLiveQuery} from 'dexie-react-hooks';
import {BarChart3, CalendarDays, CirclePlus, Package, Receipt, Settings2, ShoppingBasket, TrendingUp, Wallet} from 'lucide-react';
import {db} from '@/db/database';
import {fmt, localDate, monthKey} from '@/lib/money';
import {useLanguage} from '@/lib/language';
import {Panel, Empty} from '@/components/ui';
import type {Invoice, Expense} from '@/types/models';

export default function Dashboard({navigate}:{navigate:(next:string)=>void}) {
  const {t,language}=useLanguage();
  const data=useLiveQuery(async()=>{
    const [invoices,expenses]=await Promise.all([db.invoices.toArray(),db.expenses.toArray()]);
    return {invoices,expenses};
  },[]);
  if(!data)return <div className="ref-loading">{language==='ml'?'കണക്കുകൾ തുറക്കുന്നു…':'Loading today’s totals…'}</div>;
  const {invoices,expenses}=data;
  const today=localDate(),month=monthKey();
  const active=(rows:Invoice[])=>rows.filter(x=>x.status==='final');
  const sumSales=(rows:Invoice[])=>active(rows).reduce((s,i)=>s+i.totalPaise,0);
  const sumExpenses=(rows:Expense[])=>rows.reduce((s,i)=>s+i.amountPaise,0);
  const todays=active(invoices.filter(i=>i.date===today));
  const todaySales=sumSales(todays),todayExpenses=sumExpenses(expenses.filter(e=>e.date===today));
  const monthlySales=sumSales(invoices.filter(i=>i.date.startsWith(month)));
  const recent=active([...invoices]).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).slice(0,5);
  const hour=new Date().getHours();
  const greeting=language==='ml'?'നമസ്കാരം!':hour<12?'Good Morning!':hour<17?'Good Afternoon!':'Good Evening!';
  const actions=[
    {id:'billing',label:language==='ml'?'പുതിയ ബിൽ':'New Sale',icon:ShoppingBasket},
    {id:'product-add',label:t('addProduct'),icon:CirclePlus},
    {id:'products',label:t('products'),icon:Package},
    {id:'reports',label:t('seeReports'),icon:BarChart3},
    {id:'expenses',label:t('expenses'),icon:Wallet},
    {id:'settings',label:language==='ml'?'ബാക്കപ്പ്':'Settings / Backup',icon:Settings2},
  ];
  return <div className="stack ref-dashboard">
    <section className="ref-welcome-card">
      <div className="ref-welcome-content"><div className="ref-hello">{greeting}</div>
        <h1>{language==='ml'?'ഇന്ന് നല്ലൊരു കച്ചവടദിനമാകട്ടെ!':'Here’s how your shop is doing.'}</h1>
        <div className="ref-welcome-date"><CalendarDays size={16}/>{new Date().toLocaleDateString(language==='ml'?'ml-IN':'en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'})}</div>
      </div><div className="ref-welcome-art" aria-hidden="true"><span className="ref-sun">☀</span><i/><i/><i/></div>
    </section>
    <section aria-label={language==='ml'?'ഇന്നത്തെ കണക്കുകൾ':'Today’s overview'} className="ref-stat-grid">
      <div className="ref-stat-card"><div className="ref-stat-icon mint"><span>₹</span></div><div className="ref-stat-copy"><span>{t('todaySales')}</span><strong>{fmt(todaySales)}</strong></div></div>
      <div className="ref-stat-card"><div className="ref-stat-icon sky"><Receipt size={21}/></div><div className="ref-stat-copy"><span>{t('todayCount')}</span><strong>{todays.length}</strong></div></div>
      <div className="ref-stat-card"><div className="ref-stat-icon rose"><Wallet size={21}/></div><div className="ref-stat-copy"><span>{t('todayExpenses')}</span><strong>{fmt(todayExpenses)}</strong></div></div>
      <div className="ref-stat-card"><div className="ref-stat-icon green"><TrendingUp size={21}/></div><div className="ref-stat-copy"><span>{t('todayBalance')}</span><strong>{fmt(todaySales-todayExpenses)}</strong></div></div>
    </section>
    <div className="ref-section-title"><h2>{language==='ml'?'വേഗത്തിലുള്ള പ്രവർത്തനങ്ങൾ':'Quick Actions'}</h2></div>
    <section className="ref-actions-grid" aria-label={language==='ml'?'വേഗത്തിലുള്ള പ്രവർത്തനങ്ങൾ':'Quick Actions'}>{actions.map((a,i)=>{const Icon=a.icon;return <button key={a.id} className={`ref-action-card ref-action-${i}`} onClick={()=>navigate(a.id)}><span className="ref-action-icon"><Icon size={25} strokeWidth={2.2}/></span><strong>{a.label}</strong></button>})}</section>
    <div className="ref-section-title"><h2>{language==='ml'?'ഇന്നത്തെ കണക്കുകൾ':'Daily Summary'}</h2><button className="ref-text-link" onClick={()=>navigate('reports')}>{t('seeReports')} →</button></div>
    <section className="ref-summary-card"><div><span>{t('todaySales')}</span><strong>{fmt(todaySales)}</strong></div><div><span>{t('todayExpenses')}</span><strong>{fmt(todayExpenses)}</strong></div><div className="ref-summary-total"><span>{t('todayBalance')}</span><strong>{fmt(todaySales-todayExpenses)}</strong></div><small>{t('cashflowNote')}</small></section>
    <div className="ref-section-title"><h2>{t('recentSales')}</h2><button className="ref-text-link" onClick={()=>navigate('reports')}>{t('seeReports')} →</button></div>
    <Panel>{recent.length===0?<Empty label={t('noSales')}/>:<div className="list ref-recent-list">{recent.map(i=><div className="list-row" key={i.id}><span className="list-icon"><Receipt size={18}/></span><div className="grow"><strong>{i.number}</strong><div className="muted small">{i.date} · {t(i.paymentMethod)}</div></div><strong>{fmt(i.totalPaise)}</strong></div>)}</div>}</Panel>
    <div className="ref-dashboard-footnote"><span>{t('monthlySales')}: <strong>{fmt(monthlySales)}</strong></span><span>{t('storedHere')}</span></div>
  </div>;
}
