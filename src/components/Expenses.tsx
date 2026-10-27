'use client';
import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Plus, Trash2 } from 'lucide-react';
import { db } from '@/db/database';
import { useUpdateHold } from '@/lib/update-guard';
import { fmt, localDate, monthKey } from '@/lib/money';
import { addExpense, deleteExpense } from '@/services/store';
import { Field, Panel, Empty, Metric, safeError } from '@/components/ui';

const categories=['Rent','Electricity','Travel','Salaries','Inventory Purchase','Packing','Marketing','Maintenance','Other'];
export default function Expenses({notify}:{notify:(text:string,kind?:'error'|'success')=>void}) {
  const expenses = useLiveQuery(()=>db.expenses.orderBy('date').reverse().toArray(),[])??[];
  const [category,setCategory]=useState(categories[0]),[amount,setAmount]=useState(''),[date,setDate]=useState(localDate()),[notes,setNotes]=useState(''),[busy,setBusy]=useState(false);
  useUpdateHold('expenses',Boolean(amount.trim() || notes.trim()) || busy);
  const month=expenses.filter(e=>e.date.startsWith(monthKey()));
  const total=month.reduce((s,e)=>s+e.amountPaise,0);
  async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);try{await addExpense(category,amount,notes,date);setAmount('');setNotes('');notify('Expense recorded.')}catch(err){notify(safeError(err),'error')}finally{setBusy(false)}}
  return <div className="stack"><div className="page-heading"><div><h1>Expenses</h1><p>Keep a simple local record of business spending.</p></div></div>
    <div className="metrics two"><Metric label="This month" value={fmt(total)}/><Metric label="Entries" value={String(month.length)}/></div>
    <Panel title="Add an expense"><form className="form-grid" onSubmit={submit}>
      <Field label="Category"><select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(x=><option key={x}>{x}</option>)}</select></Field>
      <Field label="Amount (₹) *"><input type="number" required min="0.01" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)}/></Field>
      <Field label="Date"><input required type="date" value={date} onChange={e=>setDate(e.target.value)}/></Field>
      <Field label="Notes"><input maxLength={200} placeholder="Optional details" value={notes} onChange={e=>setNotes(e.target.value)}/></Field>
      <div className="form-actions"><button className="button primary" disabled={busy}><Plus size={16}/>{busy?'Saving…':'Save Expense'}</button></div>
    </form></Panel>
    <Panel title="Expense history">{!expenses.length?<Empty label="No expenses recorded."/>:<div className="table-wrap"><table><thead><tr><th>Date</th><th>Category</th><th>Notes</th><th>Amount</th><th></th></tr></thead><tbody>{expenses.map(e=><tr key={e.id}><td>{e.date}</td><td><strong>{e.category}</strong></td><td>{e.notes||'—'}</td><td>{fmt(e.amountPaise)}</td><td><button aria-label="Delete expense" className="icon-button danger-text" title="Delete expense" onClick={async()=>{if(!confirm('Delete this expense permanently?'))return;try{await deleteExpense(e.id);notify('Expense deleted.')}catch(err){notify(safeError(err),'error')}}}><Trash2 size={16}/></button></td></tr>)}</tbody></table></div>}</Panel>
  </div>;
}
