'use client';
import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Plus, UsersRound } from 'lucide-react';
import { db } from '@/db/database';
import { addCustomer } from '@/services/store';
import { Field, Panel, Empty, safeError } from '@/components/ui';
export default function Customers({notify}:{notify:(text:string,kind?:'error'|'success')=>void}) {
  const customers=useLiveQuery(()=>db.customers.orderBy('name').toArray(),[])??[];
  const [name,setName]=useState(''),[phone,setPhone]=useState(''),[busy,setBusy]=useState(false);
  async function submit(e:React.FormEvent) {e.preventDefault();setBusy(true);try{await addCustomer(name,phone);setName('');setPhone('');notify('Customer added.')}catch(err){notify(safeError(err),'error')}finally{setBusy(false)}}
  return <div className="stack"><div className="page-heading"><div><h1>Customers</h1><p>Optional customer contact list, saved on this device.</p></div></div>
    <Panel title="Add Customer"><form className="form-grid" onSubmit={submit}><Field label="Name *"><input maxLength={100} required value={name} onChange={e=>setName(e.target.value)}/></Field><Field label="Phone"><input type="tel" maxLength={20} value={phone} onChange={e=>setPhone(e.target.value)}/></Field><div className="form-actions"><button className="button primary" disabled={busy}><Plus size={16}/> Add Customer</button></div></form></Panel>
    <Panel title={`Customers (${customers.length})`}>{!customers.length?<Empty label="No customers yet."/>:<div className="list">{customers.map(c=><div className="list-row" key={c.id}><span className="list-icon"><UsersRound size={17}/></span><div><strong>{c.name}</strong><div className="small muted">{c.phone||'No phone number'}</div></div></div>)}</div>}</Panel>
  </div>;
}
