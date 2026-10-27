'use client';
import { useEffect, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { AlertTriangle, Download, FolderUp, HardDriveDownload, ShieldCheck, Smartphone, WifiOff } from 'lucide-react';
import { db } from '@/db/database';
import {useLanguage} from '@/lib/language';
import { useUpdateHold } from '@/lib/update-guard';
import { exportBackup, importBackup } from '@/services/backup';
import { saveShop } from '@/services/store';
import { Field, Panel, safeError } from '@/components/ui';
import OfflinePhotoDownload from './OfflinePhotoDownload';

export default function Settings({notify}:{notify:(text:string,kind?:'error'|'success')=>void}) {
  const {t,language}=useLanguage();
  const shop=useLiveQuery(()=>db.shops.toCollection().first(),[]);
  const [name,setName]=useState(''),[phone,setPhone]=useState(''),[address,setAddress]=useState(''),[gstin,setGstin]=useState('');
  const [busy,setBusy]=useState(false),[exported,setExported]=useState(false),[understood,setUnderstood]=useState(false);
  const fileRef=useRef<HTMLInputElement>(null);
  useUpdateHold('settings',busy || (!!shop && (name!==shop.name||phone!==shop.phone||address!==shop.address||gstin!==shop.gstin)));
  useEffect(()=>{if(shop){setName(shop.name);setPhone(shop.phone);setAddress(shop.address);setGstin(shop.gstin);}},[shop]);
  async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);try{await saveShop({name,phone,address,gstin});notify('Shop settings saved.')}catch(err){notify(safeError(err),'error')}finally{setBusy(false)}}
  async function backup(){try{await exportBackup();setExported(true);notify('Backup file generated. Confirm it is saved in Files / Downloads.')}catch(e){notify(safeError(e),'error')}}
  async function restore(file?:File) {
    if(!file)return;
    if(!exported || !understood){notify('First export the current data and acknowledge replacement risk.','error');return;}
    if(!confirm(`Replace ALL local shop data with ${file.name}? This cannot be undone without a backup.`))return;
    setBusy(true);
    try{const info=await importBackup(file);setUnderstood(false);setExported(false);notify(`Restored ${info.products} products and ${info.invoices} invoices.`, 'success');}
    catch(err){notify(safeError(err),'error')} finally{setBusy(false);if(fileRef.current)fileRef.current.value='';}
  }
  return <div className="stack"><div className="page-heading"><div><h1>{t('settings')}</h1><p>{t('settingsIntro')}</p></div></div>
    <div className="two-columns settings-columns">
      <Panel title={t('shopInfo')} sub={language==='ml'?'ബിൽ PDF-ൽ ഈ കടയുടെ പേര് കാണിക്കും.':'Printed on optional receipt PDFs.'}><form className="stack compact" onSubmit={submit}><Field label={`${t('shopName')} *`}><input required maxLength={100} value={name} onChange={e=>setName(e.target.value)}/></Field><Field label={t('phone')}><input type="tel" maxLength={25} value={phone} onChange={e=>setPhone(e.target.value)}/></Field><Field label={t('address')}><textarea rows={3} maxLength={250} value={address} onChange={e=>setAddress(e.target.value)} /></Field><Field label={t('gstin')}><input maxLength={15} value={gstin} onChange={e=>setGstin(e.target.value.toUpperCase())}/></Field><button className="button primary" disabled={busy}>{t('saveSettings')}</button></form></Panel>
      <div className="stack">
        <Panel title={t('backupTitle')} sub={language==='ml'?'JSON ബാക്കപ്പ് ഫോണിന് പുറത്ത് കൂടി സൂക്ഷിക്കുക.':'Keep a JSON backup outside this phone.'}><div className="stack compact"><div className="notice"><HardDriveDownload size={20}/><span>{language==='ml'?'ഫോണിലെ ബ്രൗസറിൽ ഓട്ടോമാറ്റിക് ഫയൽ ബാക്കപ്പ് ഉറപ്പില്ല. ഇടയ്ക്കിടെ ഡൗൺലോഡ് ചെയ്ത് സേവ് ആയെന്ന് നോക്കുക.':'Mobile browsers cannot guarantee automatic file backups. Download regularly and verify the saved file.'}</span></div><button className="button primary wide" onClick={backup}><Download size={18}/>{t('downloadBackup')}</button><div className="divider"/><strong>{t('restoreTitle')}</strong><p className="muted small">{language==='ml'?'ഇംപോർട്ട് ചെയ്യുമ്പോൾ ബാക്കപ്പിന്റെ checksum പരിശോധിച്ച് പഴയ ഡാറ്റ മാറ്റും.':'Import verifies backup integrity and replaces local data atomically.'}</p><label className="check"><input type="checkbox" checked={understood} onChange={e=>setUnderstood(e.target.checked)}/> {t('restoreWarning')}</label><input className="sr-only" ref={fileRef} type="file" accept="application/json,.json" onChange={e=>restore(e.target.files?.[0])}/><button className="button secondary wide" disabled={!understood||!exported||busy} onClick={()=>fileRef.current?.click()}><FolderUp size={18}/>{t('restoreButton')}</button><p className="small muted">{language==='ml'?'Restore ചെയ്യുന്നതിന് മുമ്പ് ഇപ്പോഴത്തെ ബാക്കപ്പ് എടുക്കണം.':'Download a fresh backup before restoring. Only this app’s backups are supported.'}</p></div></Panel>
        <Panel title={t('storage')}><div className="feature-list"><div><WifiOff size={19}/><span><strong>{language==='ml'?'ഓഫ്‌ലൈൻ':'Offline ready'}</strong><span className="muted small">{language==='ml'?'ആദ്യം ഇന്റർനെറ്റ് ഉപയോഗിച്ച് തുറന്നശേഷം ആപ്പ് ഓഫ്‌ലൈനിൽ പ്രവർത്തിക്കും.':'App files cached after online installation / first load.'}</span></span></div><div><Smartphone size={19}/><span><strong>{language==='ml'?'ലോക്കൽ ഡാറ്റാബേസ്':'Private local database'}</strong><span className="muted small">{language==='ml'?'ഓരോ ബ്രൗസറിലും ഇൻസ്റ്റാളേഷനിലും വെവ്വേറെ IndexedDB.':'IndexedDB is isolated per browser, origin and installation.'}</span></span></div><div><ShieldCheck size={19}/><span><strong>{language==='ml'?'ലോഗിൻ വേണ്ട':'No account needed'}</strong><span className="muted small">{language==='ml'?'മറ്റുള്ളവർ ഉപയോഗിക്കുന്ന അൺലോക്ക് ചെയ്ത ഫോണിൽ സെൻസിറ്റീവ് ഡാറ്റ സൂക്ഷിക്കരുത്.':'Do not use on a shared unlocked phone for sensitive data.'}</span></span></div></div><button className="button ghost" onClick={async()=>{try{if(navigator.storage?.persist){const ok=await navigator.storage.persist();notify(ok?'Persistent storage granted.':'Browser did not grant persistent storage.');}else notify('Persistent storage API unavailable.','error')}catch(e){notify(safeError(e),'error')}}}>{language==='ml'?'സ്റ്റോറേജ് സംരക്ഷണം ആവശ്യപ്പെടുക':'Request persistent storage'}</button></Panel>
        <Panel title={t('offlinePhotos')}><OfflinePhotoDownload/></Panel>
      </div>
    </div><div className="notice warning"><AlertTriangle size={21}/><span><strong>{language==='ml'?'ശ്രദ്ധിക്കുക:':'Important:'}</strong> {language==='ml'?'ബ്രൗസർ ഡാറ്റ നീക്കിയാലോ ഫോൺ നഷ്ടപ്പെട്ടാലോ രേഖകൾ നഷ്ടപ്പെടാം. ബാക്കപ്പ് ആവശ്യമാണ്. ഫോണുകൾ തമ്മിൽ സ്വയം സിങ്ക് ചെയ്യില്ല.':'Clearing browser data, uninstalling a PWA or losing the phone can erase records. Back up regularly; phones do not sync automatically.'}</span></div>
  </div>;
}
