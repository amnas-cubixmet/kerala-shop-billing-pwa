'use client';
import {useEffect,useState} from 'react';
import {useLiveQuery} from 'dexie-react-hooks';
import {BarChart3, Boxes, CirclePlus, HardDriveDownload, Home, Menu, Package, Receipt, Settings2, ShieldCheck, ShoppingBasket, Wallet, Wifi, WifiOff, X} from 'lucide-react';
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
  {id:'dashboard',label:'home',icon:Home},
  {id:'billing',label:'sale',icon:Receipt},
  {id:'products',label:'products',icon:Package},
  {id:'expenses',label:'expenses',icon:Wallet},
  {id:'reports',label:'reports',icon:BarChart3},
  {id:'settings',label:'settings',icon:Settings2},
];
const allIds=new Set(nav.map(n=>n.id));

export default function ShopApp(){
  const {language,setLanguage,t}=useLanguage();
  const [ready,setReady]=useState(false),[error,setError]=useState('');
  const [selected,setSelected]=useState('dashboard'),[online,setOnline]=useState(true),[sidebar,setSidebar]=useState(false);
  const [openAddToken,setOpenAddToken]=useState(0);
  const [message,setMessage]=useState<{text:string;kind:'success'|'error'}|null>(null);
  const shop=useLiveQuery(()=>db.shops.toCollection().first(),[]);
  const notify=(text:string,kind:'success'|'error'='success')=>setMessage({text,kind});
  function navigate(value:string){
    if(value==='product-add') {setOpenAddToken(n=>n+1);value='products';}
    if(!allIds.has(value))return;
    setSelected(value);setSidebar(false);setMessage(null);
    window.scrollTo({top:0,behavior:'auto'});
  }
  useEffect(()=>{
    setOnline(navigator.onLine);
    const on=()=>setOnline(true),off=()=>setOnline(false);
    window.addEventListener('online',on);window.addEventListener('offline',off);
    let alive=true;
    initShop().then(()=>{if(alive)setReady(true)}).catch(e=>{if(alive)setError(safeError(e))});
    return ()=>{alive=false;window.removeEventListener('online',on);window.removeEventListener('offline',off)};
  },[]);
  if(error)return <div className="startup-error"><h1>Cannot open local database</h1><p>{error}</p><p>Do not clear storage without a backup.</p></div>;
  if(!ready)return <div className="startup-loading"><div className="brand-mark"><ShoppingBasket size={25}/></div><h1>Shop Billing</h1><p>Opening local database…</p></div>;
  return <div className="app-root ref-app"><PWAUpdateManager/>
    {sidebar&&<button className="overlay" aria-label="Close navigation" onClick={()=>setSidebar(false)}/>}
    <aside className={`sidebar ${sidebar?'open':''}`}>
      <div className="brand ref-sidebar-brand"><div className="brand-mark"><ShoppingBasket size={23}/></div><div><strong>{shop?.name||'Shop Billing'}</strong><small>{language==='ml'?'ദിവസത്തെ കടക്കണക്ക്':'Daily shop manager'}</small></div><button className="mobile-close icon-button" onClick={()=>setSidebar(false)} aria-label="Close menu"><X size={19}/></button></div>
      <div className="nav-label">{language==='ml'?'മെനു':'MENU'}</div>
      <nav aria-label="Main navigation">{nav.map(n=>{const Icon=n.icon;return <button key={n.id} className={`nav-link ${selected===n.id?'active':''}`} onClick={()=>navigate(n.id)}><Icon size={20}/>{t(n.label)}</button>})}</nav>
      <div className="sidebar-bottom"><div className="device-private-note"><ShieldCheck size={19}/><div><strong>{t('storedHere')}</strong><span>Private · IndexedDB</span></div></div><button className="ref-sidebar-backup" onClick={()=>navigate('settings')}><HardDriveDownload size={18}/>{t('backupTitle')}</button></div>
    </aside>
    <div className="content-area"><header className="topbar ref-topbar">
      <div className="topbar-left"><button className="hamburger icon-button" onClick={()=>setSidebar(true)} aria-label="Open menu"><Menu size={23}/></button><div className="mobile-brand-mark"><ShoppingBasket size={24}/></div><div className="topbar-titles"><div className="ref-store-title">{shop?.name||'Shop Billing'}</div><div className="ref-store-subtitle">{language==='ml'?'ബില്ലിംഗ് & സ്റ്റോക്ക്':'Grocery & Shop Manager'}</div></div></div>
      <div className="topbar-actions">
        <div className="language-switch" role="group" aria-label={t('langToggle')}>
          <button type="button" aria-label="മലയാളം" aria-pressed={language==='ml'} className={language==='ml'?'chosen':''} onClick={()=>setLanguage('ml')}>മ</button>
          <button type="button" aria-label="English" aria-pressed={language==='en'} className={language==='en'?'chosen':''} onClick={()=>setLanguage('en')}>EN</button>
        </div>
        <button type="button" className="ref-topbar-action" aria-label={t('backupTitle')} title={t('backupTitle')} onClick={()=>navigate('settings')}><HardDriveDownload size={19}/></button>
        <div className={`connection ${online?'':'is-offline'}`} title={t(online?'online':'offline')}>{online?<Wifi size={16}/>:<WifiOff size={16}/>}<span className="connection-dot"/></div>
        <button className="topbar-new-bill" onClick={()=>navigate('billing')} aria-label={t('newSale')}><CirclePlus size={18}/><span>{t('newSale')}</span></button>
      </div>
    </header>
      <main className="main-content ref-main">{message&&<div className={`toast ${message.kind}`} role="status"><span>{message.text}</span><button aria-label="Dismiss notification" onClick={()=>setMessage(null)}><X size={16}/></button></div>}
        {selected==='dashboard'&&<Dashboard navigate={navigate}/>}
        {selected==='billing'&&<Billing notify={notify}/>}
        {selected==='products'&&<Products notify={notify} openAddToken={openAddToken}/>}
        {selected==='expenses'&&<Expenses notify={notify}/>}
        {selected==='reports'&&<Reports notify={notify}/>}
        {selected==='settings'&&<Settings notify={notify}/>}
      </main>
    </div>
    <nav className="bottom-nav ref-bottom-nav" aria-label="Mobile navigation">
      {[
        {id:'dashboard',label:'home',icon:Home},
        {id:'products',label:'products',icon:Boxes},
        {id:'billing',label:'sale',icon:ShoppingBasket},
        {id:'reports',label:'reports',icon:BarChart3},
        {id:'settings',label:'more',icon:Settings2},
      ].map(n=>{const Icon=n.icon;return <button key={n.id} type="button" onClick={()=>navigate(n.id)} className={`${selected===n.id?'selected':''} ${n.id==='billing'?'ref-bottom-primary':''}`} aria-current={selected===n.id?'page':undefined} aria-label={t(n.label)}><span className="bottom-nav-icon"><Icon size={n.id==='billing'?25:21} strokeWidth={selected===n.id?2.4:1.85}/></span><span>{t(n.label)}</span></button>})}
    </nav>
  </div>;
}
