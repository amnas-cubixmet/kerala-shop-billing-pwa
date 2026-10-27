'use client';
import {useEffect,useState} from 'react';
import {useLiveQuery} from 'dexie-react-hooks';
import {BarChart3, Boxes, ChevronDown, LayoutDashboard, Menu, Plus, Receipt, Settings2, HardDriveDownload, ShieldCheck, Wallet, Wifi, WifiOff, X} from 'lucide-react';
import {db} from '@/db/database';
import {initShop} from '@/services/store';
import {useLanguage} from '@/lib/language';
import {safeError} from '@/components/ui';
import Dashboard from './Dashboard';
import Products from './Products';
import Billing from './Billing';
import Expenses from './Expenses';
import Reports from './Reports';
import Settings from './Settings';
import PWAUpdateManager from './PWAUpdateManager';

const nav = [
  {id:'dashboard',label:'dashboard',icon:LayoutDashboard},
  {id:'billing',label:'billing',icon:Receipt},
  {id:'products',label:'products',icon:Boxes},
  {id:'expenses',label:'expenses',icon:Wallet},
  {id:'reports',label:'reports',icon:BarChart3},
  {id:'settings',label:'settings',icon:Settings2},
];
const allIds=new Set(nav.map(n=>n.id));
export default function ShopApp(){
  const {language,setLanguage,t}=useLanguage();
  const [ready,setReady]=useState(false),[error,setError]=useState('');
  const [selected,setSelected]=useState('dashboard'),[online,setOnline]=useState(true),[sidebar,setSidebar]=useState(false);
  const [message,setMessage]=useState<{text:string;kind:'success'|'error'}|null>(null);
  const shop=useLiveQuery(()=>db.shops.toCollection().first(),[]);
  const notify=(text:string,kind:'success'|'error'='success')=>setMessage({text,kind});
  function navigate(value:string){if(!allIds.has(value))return;setSelected(value);setSidebar(false);setMessage(null);window.scrollTo({top:0,behavior:'smooth'});}
  useEffect(()=>{
    setOnline(navigator.onLine);
    const on=()=>setOnline(true),off=()=>setOnline(false);
    window.addEventListener('online',on);window.addEventListener('offline',off);
    let alive=true;
    initShop().then(()=>{if(alive)setReady(true)}).catch(e=>{if(alive)setError(safeError(e))});
    return ()=>{alive=false;window.removeEventListener('online',on);window.removeEventListener('offline',off)};
  },[]);
  if(error)return <div className="startup-error"><h1>Cannot open local database</h1><p>{error}</p><p>Do not clear storage without a backup.</p></div>;
  if(!ready)return <div className="startup-loading"><div className="brand-mark">S</div><h1>Shop Billing</h1><p>Opening local database…</p></div>;
  return <div className="app-root"><PWAUpdateManager/>
    {sidebar&&<button className="overlay" aria-label="Close navigation" onClick={()=>setSidebar(false)}/>}
    <aside className={`sidebar ${sidebar?'open':''}`}>
      <div className="brand"><div className="brand-mark"><span>SB</span></div><div><strong>Shop Billing<span className="brand-dot">.</span></strong></div><button className="mobile-close icon-button" onClick={()=>setSidebar(false)} aria-label="Close menu"><X size={18}/></button></div>
      <div className="nav-label">{language==='ml'?'മെനു':'MENU'}</div>
      <nav aria-label="Main navigation">{nav.map(n=>{const Icon=n.icon;return <button key={n.id} className={`nav-link ${selected===n.id?'active':''}`} onClick={()=>navigate(n.id)}><Icon size={19}/>{t(n.label)}</button>})}</nav>
      <div className="sidebar-bottom"><div className="device-private-note"><ShieldCheck size={17}/><div><strong>{t('storedHere')}</strong><span>IndexedDB</span></div></div><div className="store-mini"><div className="store-avatar">{(shop?.name||'S').charAt(0).toUpperCase()}</div><div><strong>{shop?.name||'My Shop'}</strong><span>{t('storage')}</span></div></div></div>
    </aside>
    <div className="content-area"><header className="topbar">
      <div className="topbar-left"><button className="hamburger icon-button" onClick={()=>setSidebar(true)} aria-label="Open menu"><Menu size={22}/></button><div className="mobile-brand-mark">SB</div><div className="topbar-titles"><div className="topbar-overline">{shop?.name||'MY STORE'} <ChevronDown size={13}/></div><div className="breadcrumb">{t(nav.find(n=>n.id===selected)?.label||'dashboard')}</div></div></div>
      <div className="topbar-actions">
        <button type="button" className="header-backup-shortcut" aria-label={t('backupTitle')} title={t('backupTitle')} onClick={()=>navigate('settings')}><HardDriveDownload size={18}/></button>
        <div className="language-switch" role="group" aria-label={t('langToggle')}>
          <button type="button" aria-label="മലയാളം" aria-pressed={language==='ml'} className={language==='ml'?'chosen':''} onClick={()=>setLanguage('ml')}>മ</button>
          <button type="button" aria-label="English" aria-pressed={language==='en'} className={language==='en'?'chosen':''} onClick={()=>setLanguage('en')}>EN</button>
        </div>
        <div className={`connection ${online?'':'is-offline'}`} title={t(online?'online':'offline')}>{online?<><Wifi size={15}/>{t('online')}</>:<><WifiOff size={15}/>{t('offline')}</>}<span className="connection-dot"/></div>
        <button className="topbar-new-bill" onClick={()=>navigate('billing')} aria-label={t('newSale')}><Plus size={17}/><span>{t('newSale')}</span></button>
      </div>
    </header>
      <main className="main-content">{message&&<div className={`toast ${message.kind}`} role="status"><span>{message.text}</span><button aria-label="Dismiss notification" onClick={()=>setMessage(null)}><X size={15}/></button></div>}
        {selected==='dashboard'&&<Dashboard navigate={navigate}/>}
        {selected==='billing'&&<Billing notify={notify}/>}
        {selected==='products'&&<Products notify={notify}/>}
        {selected==='expenses'&&<Expenses notify={notify}/>}
        {selected==='reports'&&<Reports notify={notify}/>}
        {selected==='settings'&&<Settings notify={notify}/>}
      </main>
    </div>
    <nav className="bottom-nav" aria-label="Mobile navigation">{[
      {id:'dashboard',label:'home',icon:LayoutDashboard},
      {id:'billing',label:'sale',icon:Receipt},
      {id:'products',label:'stock',icon:Boxes},
      {id:'expenses',label:'expenses',icon:Wallet},
      {id:'settings',label:'more',icon:Settings2},
    ].map(n=>{const Icon=n.icon;return <button key={n.id} onClick={()=>navigate(n.id)} className={selected===n.id?'selected':''} aria-current={selected===n.id?'page':undefined}><span className="bottom-nav-icon"><Icon size={21} strokeWidth={selected===n.id?2.5:1.9}/></span><span>{t(n.label)}</span></button>})}</nav>
  </div>;
}
