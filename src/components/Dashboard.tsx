'use client';
import { useLiveQuery } from 'dexie-react-hooks';
import { ArrowDownRight, ArrowUpRight, CalendarDays, CreditCard, PackageX, Plus, Receipt, TrendingUp, Wallet } from 'lucide-react';
import { db } from '@/db/database';
import { fmt, localDate, monthKey } from '@/lib/money';
import { Metric, Panel, Empty } from '@/components/ui';
import type { Invoice, Expense, Product } from '@/types/models';

export default function Dashboard({navigate}: {navigate: (next:string)=>void}) {
  const data = useLiveQuery(async () => {
    const [invoices, expenses, products] = await Promise.all([db.invoices.toArray(),db.expenses.toArray(),db.products.toArray()]);
    return { invoices, expenses, products };
  }, []);
  if (!data) return <p className="muted">Loading dashboard…</p>;
  const { invoices, expenses, products } = data;
  const today = localDate(), month = monthKey();
  const active = (rows: Invoice[]) => rows.filter(i => i.status === 'final');
  const total = (rows: Invoice[]) => active(rows).reduce((s, i) => s + i.totalPaise, 0);
  const expSum = (rows: Expense[]) => rows.reduce((s, e) => s + e.amountPaise, 0);
  const todaySales = total(invoices.filter(i => i.date === today));
  const monthlySales = total(invoices.filter(i => i.date.startsWith(month)));
  const todayExpenses = expSum(expenses.filter(e=>e.date === today));
  const monthExpenses = expSum(expenses.filter(e=>e.date.startsWith(month)));
  const low = products.filter(p => p.active && p.stockMilli <= p.lowStockMilli);
  const recent = [...invoices].sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).slice(0,6);
  return <div className="stack">
    <div className="welcome"><div><div className="eyebrow">WELCOME TO YOUR WORKSPACE <span className="eyebrow-star">✳</span></div><h1>Good to see you <span className="heading-accent">again.</span></h1><p>Here’s what’s happening in your shop today.</p><div className="dashboard-date"><CalendarDays size={15}/>{new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div></div><button className="button primary dashboard-cta" onClick={()=>navigate('billing')}><Plus size={19}/> Create New Bill</button></div>
    <div className="metrics"><Metric label="Today’s sales" value={fmt(todaySales)} hint="Final invoices" icon={<TrendingUp size={19}/>} variant="primary"/><Metric label="Today’s expenses" value={fmt(todayExpenses)} icon={<Wallet size={19}/>} /><Metric label="Monthly sales" value={fmt(monthlySales)} icon={<ArrowUpRight size={19}/>} /><Metric label="Cash flow this month*" value={fmt(monthlySales-monthExpenses)} hint="Sales − expenses" icon={<ArrowDownRight size={19}/>} /></div>
    <div className="two-columns">
      <Panel title="Recent invoices" sub="Stored on this device" action={<button className="text-button" onClick={()=>navigate('reports')}>See reports →</button>}>
        {!recent.length ? <Empty label="No bills yet. Create your first invoice."/> : <div className="list">{recent.map(i=><div className="list-row" key={i.id}><span className="list-icon"><CreditCard size={18}/></span><div className="grow"><strong>{i.number}</strong><div className="muted small">{i.customerName} · {i.date}</div></div><strong className={i.status === 'void' ? 'muted struck' : ''}>{fmt(i.totalPaise)}</strong></div>)}</div>}
      </Panel>
      <Panel title="Stock alerts" sub="Products at or below minimum" action={<button className="text-button" onClick={()=>navigate('products')}>Manage stock →</button>}>
        {!low.length ? <div className="notice good"><TrendingUp size={19}/> No low stock alerts.</div> : <div className="list">{low.slice(0,7).map((p:Product)=><div className="list-row" key={p.id}><span className="list-icon warn"><PackageX size={18}/></span><div className="grow"><strong>{p.name}</strong><div className="muted small">{p.category || 'General'}</div></div><span className="pill danger">{p.stockMilli / 1000} {p.unit}</span></div>)}</div>}
      </Panel>
    </div>
    <div className="notice"><CalendarDays size={19}/><span><strong>Backup reminder:</strong> Download a backup regularly. Clearing browser/app data can permanently delete local records.</span><button className="text-button" onClick={()=>navigate('settings')}>Backup</button></div>
    <p className="muted small disclaimer">* Cash flow is sales less recorded expenses, not accounting profit; inventory purchases, cost of goods, tax payable and unpaid invoices require separate treatment.</p>
  </div>;
}
