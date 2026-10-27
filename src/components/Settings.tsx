'use client';
import { useEffect, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { AlertTriangle, Download, FolderUp, HardDriveDownload, ShieldCheck, Smartphone, WifiOff } from 'lucide-react';
import { db } from '@/db/database';
import { useUpdateHold } from '@/lib/update-guard';
import { exportBackup, importBackup } from '@/services/backup';
import { saveShop } from '@/services/store';
import { Field, Panel, safeError } from '@/components/ui';
import OfflinePhotoDownload from './OfflinePhotoDownload';

export default function Settings({notify}:{notify:(text:string,kind?:'error'|'success')=>void}) {
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
  return <div className="stack"><div className="page-heading"><div><h1>Settings & Backup</h1><p>Manage this device’s shop and protect your data.</p></div></div>
    <div className="two-columns settings-columns">
      <Panel title="Shop information" sub="Printed on invoice PDF receipts."><form className="stack compact" onSubmit={submit}><Field label="Shop name *"><input required maxLength={100} value={name} onChange={e=>setName(e.target.value)}/></Field><Field label="Phone"><input type="tel" maxLength={25} value={phone} onChange={e=>setPhone(e.target.value)}/></Field><Field label="Address"><textarea rows={3} maxLength={250} value={address} onChange={e=>setAddress(e.target.value)} /></Field><Field label="GSTIN (if registered)"><input maxLength={15} value={gstin} onChange={e=>setGstin(e.target.value.toUpperCase())}/></Field><button className="button primary" disabled={busy}>Save Shop Settings</button></form></Panel>
      <div className="stack">
        <Panel title="Backup to phone storage" sub="Backups are JSON files. Keep a copy outside this device."><div className="stack compact"><div className="notice"><HardDriveDownload size={20}/><span>Automatic filesystem backups are not guaranteed in mobile browsers. Download regularly and verify the backup is saved.</span></div><button className="button primary wide" onClick={backup}><Download size={18}/> Download Full Backup</button><div className="divider"/><strong>Restore a backup</strong><p className="muted small">Import checks backup structure and SHA-256 integrity, then replaces all local data in a single database transaction.</p><label className="check"><input type="checkbox" checked={understood} onChange={e=>setUnderstood(e.target.checked)}/> I understand that restore replaces every current bill, product, and customer.</label><input className="sr-only" ref={fileRef} type="file" accept="application/json,.json" onChange={e=>restore(e.target.files?.[0])}/><button className="button secondary wide" disabled={!understood||!exported||busy} onClick={()=>fileRef.current?.click()}><FolderUp size={18}/> Restore from JSON File</button><p className="small muted">For safety, first click Download Full Backup in this session. Restore is limited to backups created by this app (version 1).</p></div></Panel>
        <Panel title="Storage & offline"><div className="feature-list"><div><WifiOff size={19}/><span><strong>Offline ready</strong><span className="muted small">App files cached after online installation / first load.</span></span></div><div><Smartphone size={19}/><span><strong>Private local database</strong><span className="muted small">IndexedDB is isolated per browser, origin and installation.</span></span></div><div><ShieldCheck size={19}/><span><strong>No account needed</strong><span className="muted small">Do not use on a shared unlocked phone for sensitive data.</span></span></div></div><button className="button ghost" onClick={async()=>{try{if(navigator.storage?.persist){const ok=await navigator.storage.persist();notify(ok?'Persistent storage granted.':'Browser did not grant persistent storage.');}else notify('Persistent storage API unavailable.','error')}catch(e){notify(safeError(e),'error')}}}>Request persistent storage</button></Panel>
        <Panel title="Product photo library — offline"><OfflinePhotoDownload/></Panel>
      </div>
    </div><div className="notice warning"><AlertTriangle size={21}/><span><strong>Very important:</strong> Clearing browser storage, uninstalling a PWA or losing the phone may erase all data. Backups are your responsibility. Devices do not sync automatically.</span></div>
  </div>;
}
