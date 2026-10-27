'use client';
import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { BarChart3, Boxes, ChevronDown, LayoutDashboard, Menu, Plus, Receipt, Settings2, ShieldCheck, Sparkles, UsersRound, Wallet, Wifi, WifiOff, X } from 'lucide-react';
import { db } from '@/db/database';
import { initShop } from '@/services/store';
import { safeError } from '@/components/ui';
import Dashboard from './Dashboard';
import Products from './Products';
import Billing from './Billing';
import Expenses from './Expenses';
import Reports from './Reports';
import Customers from './Customers';
import Settings from './Settings';
import PWAUpdateManager from './PWAUpdateManager';

const nav = [
  {id:'dashboard',name:'Dashboard',icon:LayoutDashboard},
  {id:'billing',name:'New Bill',icon:Receipt},
  {id:'products',name:'Products & Stock',icon:Boxes},
  {id:'expenses',name:'Expenses',icon:Wallet},
  {id:'customers',name:'Customers',icon:UsersRound},
  {id:'reports',name:'Reports',icon:BarChart3},
  {id:'settings',name:'Settings / Backup',icon:Settings2},
];
const allIds = new Set(nav.map(n=>n.id));
export default function ShopApp() {
  const [ready,setReady] = useState(false);
  const [error,setError] = useState('');
  const [selected,setSelected] = useState('dashboard');
  const [online,setOnline] = useState(true);
  const [sidebar,setSidebar] = useState(false);
  const [message,setMessage] = useState<{text:string;kind:'success'|'error'}|null>(null);
  const shop = useLiveQuery(()=>db.shops.toCollection().first(),[]);
  const notify = (text:string,kind:'success'|'error'='success') => {setMessage({text,kind});};
  function navigate(value:string){if(!allIds.has(value))return;setSelected(value);setSidebar(false);setMessage(null);window.scrollTo({top:0,behavior:'smooth'});}
  useEffect(()=>{
    setOnline(navigator.onLine);
    const on=()=>setOnline(true),off=()=>setOnline(false);
    window.addEventListener('online',on);window.addEventListener('offline',off);
    let alive=true;
    initShop().then(()=>{if(alive)setReady(true)}).catch(e=>{if(alive)setError(safeError(e))});
    return ()=>{alive=false;window.removeEventListener('online',on);window.removeEventListener('offline',off)};
  },[]);
  if(error)return <div className="startup-error"><h1>Cannot open local database</h1><p>{error}</p><p>Check private browsing and available storage. Do not clear storage unless you already backed up.</p></div>;
  if(!ready)return <div className="startup-loading"><div className="brand-mark">S</div><h1>Shop Billing</h1><p>Opening local database…</p></div>;
  return <div className="app-root"><PWAUpdateManager/>
    {sidebar && <button className="overlay" aria-label="Close navigation" onClick={()=>setSidebar(false)}/>}
    <aside className={`sidebar ${sidebar?'open':''}`}><div className="brand"><div className="brand-mark"><span>SB</span></div><div><strong>Shop Billing<span className="brand-dot">.</span></strong><small>YOUR BUSINESS WORKSPACE</small></div><button className="mobile-close icon-button" onClick={()=>setSidebar(false)} aria-label="Close menu"><X size={18}/></button></div>
      <div className="nav-label">WORKSPACE</div><nav aria-label="Main navigation">{nav.map(n=>{const Icon=n.icon;return <button key={n.id} className={`nav-link ${selected===n.id?'active':''}`} onClick={()=>navigate(n.id)}><Icon size={19}/>{n.name}</button>})}</nav>
      <div className="sidebar-bottom"><div className="device-private-note"><ShieldCheck size={17}/><div><strong>Private by design</strong><span>Stored on this device</span></div></div><div className="store-mini"><div className="store-avatar">{(shop?.name||'S').charAt(0).toUpperCase()}</div><div><strong>{shop?.name||'My Shop'}</strong><span>Single-device workspace</span></div></div><p>Free tools · Local data only</p></div>
    </aside>
    <div className="content-area"><header className="topbar">
      <div className="topbar-left"><button className="hamburger icon-button" onClick={()=>setSidebar(true)} aria-label="Open menu"><Menu size={22}/></button><div className="mobile-brand-mark">SB</div><div className="topbar-titles"><div className="topbar-overline">{shop?.name || 'YOUR STORE'} <ChevronDown size={13}/></div><div className="breadcrumb">{nav.find(n=>n.id===selected)?.name}</div></div></div>
      <div className="topbar-actions"><div className={`connection ${online?'':'is-offline'}`}>{online?<><Wifi size={15}/> Online</>:<><WifiOff size={15}/> Offline</>} <span className="connection-dot"/></div><button className="topbar-new-bill" onClick={()=>navigate('billing')}><Plus size={17}/> <span>New Bill</span></button></div>
    </header>
      <main className="main-content"><div className="mobile-page-intro"><span><Sparkles size={14}/> SMART SHOP MANAGEMENT</span></div>{message&&<div className={`toast ${message.kind}`} role="status"><span>{message.text}</span><button aria-label="Dismiss notification" onClick={()=>setMessage(null)}><X size={15}/></button></div>}
        {selected==='dashboard'&&<Dashboard navigate={navigate}/>}
        {selected==='billing'&&<Billing notify={notify}/>}
        {selected==='products'&&<Products notify={notify}/>}
        {selected==='expenses'&&<Expenses notify={notify}/>}
        {selected==='customers'&&<Customers notify={notify}/>}
        {selected==='reports'&&<Reports notify={notify}/>}
        {selected==='settings'&&<Settings notify={notify}/>}
      </main>
    </div>
    <nav className="bottom-nav" aria-label="Mobile navigation">{[
      {id:'dashboard',label:'Home',icon:LayoutDashboard},
      {id:'billing',label:'Bill',icon:Receipt},
      {id:'products',label:'Stock',icon:Boxes},
      {id:'expenses',label:'Expenses',icon:Wallet},
      {id:'settings',label:'More',icon:Settings2},
    ].map(n=>{const Icon=n.icon;return <button key={n.id} onClick={()=>navigate(n.id)} className={selected===n.id?'selected':''} aria-current={selected===n.id?'page':undefined}><span className="bottom-nav-icon"><Icon size={21} strokeWidth={selected===n.id?2.5:1.9}/></span><span>{n.label}</span></button>})}</nav>
  </div>;
}
