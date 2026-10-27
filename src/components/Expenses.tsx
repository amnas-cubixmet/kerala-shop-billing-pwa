'use client';
import {useState} from 'react';
import {useLiveQuery} from 'dexie-react-hooks';
import {Plus,Trash2} from 'lucide-react';
import {db} from '@/db/database';
import {useUpdateHold} from '@/lib/update-guard';
import {fmt,localDate,monthKey} from '@/lib/money';
import {useLanguage} from '@/lib/language';
import {addExpense,deleteExpense} from '@/services/store';
import {Field,Panel,Empty,Metric,safeError} from '@/components/ui';
const categories:Record<string,string>={'Rent':'വാടക','Electricity':'വൈദ്യുതി','Travel':'യാത്ര','Salaries':'ശമ്പളം','Inventory Purchase':'സാധനങ്ങൾ വാങ്ങൽ','Packing':'പാക്കിംഗ്','Marketing':'പരസ്യം','Maintenance':'അറ്റകുറ്റപ്പണി','Other':'മറ്റുള്ളവ'};
export default function Expenses({notify}:{notify:(text:string,kind?:'error'|'success')=>void}) {
  const {language,t}=useLanguage();
  const expenses=useLiveQuery(()=>db.expenses.orderBy('date').reverse().toArray(),[])??[];
  const [category,setCategory]=useState('Rent'),[amount,setAmount]=useState(''),[date,setDate]=useState(localDate()),[notes,setNotes]=useState(''),[busy,setBusy]=useState(false);
  useUpdateHold('expenses',Boolean(amount.trim()||notes.trim())||busy);
  const month=expenses.filter(e=>e.date.startsWith(monthKey()));
  const total=month.reduce((s,e)=>s+e.amountPaise,0);
  const categoryTitle=(value:string)=>language==='ml'?(categories[value]||value):value;
  async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);try{await addExpense(category,amount,notes,date);setAmount('');setNotes('');notify(t('saveExpense'))}catch(err){notify(safeError(err),'error')}finally{setBusy(false)}}
  return <div className="stack"><div className="page-heading"><div><h1>{t('expenses')}</h1><p>{t('expenseIntro')}</p></div></div>
    <div className="metrics two"><Metric label={t('monthTotal')} value={fmt(total)}/><Metric label={t('entries')} value={String(month.length)}/></div>
    <Panel title={t('addExpense')}><form className="form-grid" onSubmit={submit}>
      <Field label={t('category')}><select value={category} onChange={e=>setCategory(e.target.value)}>{Object.keys(categories).map(x=><option key={x} value={x}>{categoryTitle(x)}</option>)}</select></Field>
      <Field label={t('amount')}><input type="number" required min="0.01" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)}/></Field>
      <Field label={t('reportDate')}><input required type="date" value={date} onChange={e=>setDate(e.target.value)}/></Field>
      <Field label={t('notes')}><input maxLength={200} value={notes} onChange={e=>setNotes(e.target.value)}/></Field>
      <div className="form-actions"><button className="button primary" disabled={busy}><Plus size={16}/>{busy?t('saving'):t('saveExpense')}</button></div>
    </form></Panel>
    <Panel title={t('expenseHistory')}>{!expenses.length?<Empty label={t('noSalesPeriod')}/>:<div className="table-wrap"><table><thead><tr><th>{t('reportDate')}</th><th>{t('category')}</th><th>{t('notes')}</th><th>{t('amount')}</th><th></th></tr></thead><tbody>{expenses.map(e=><tr key={e.id}><td>{e.date}</td><td><strong>{categoryTitle(e.category)}</strong></td><td>{e.notes||'—'}</td><td>{fmt(e.amountPaise)}</td><td><button aria-label={t('remove')} className="icon-button danger-text" onClick={async()=>{if(!confirm(`${t('remove')}?`))return;try{await deleteExpense(e.id);notify(t('remove'))}catch(err){notify(safeError(err),'error')}}}><Trash2 size={16}/></button></td></tr>)}</tbody></table></div>}</Panel>
  </div>;
}
