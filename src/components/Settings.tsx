'use client';
import {useEffect,useRef,useState} from 'react';
import {useLiveQuery} from 'dexie-react-hooks';
import {AlertTriangle,CheckCircle2,Download,FolderUp,HardDriveDownload,ShieldCheck,Share2,Smartphone,WifiOff} from 'lucide-react';
import {db} from '@/db/database';
import {useLanguage} from '@/lib/language';
import {useUpdateHold} from '@/lib/update-guard';
import {prepareBackupFile,importBackup} from '@/services/backup';
import {saveShop} from '@/services/store';
import {Field,Panel,safeError} from '@/components/ui';
import OfflinePhotoDownload from './OfflinePhotoDownload';
import InstallGuide from './InstallGuide';

type Usage={used:number;quota:number;persistent:boolean|null};
export default function Settings({notify}:{notify:(text:string,kind?:'error'|'success')=>void}){
  const {t,language}=useLanguage();const ml=language==='ml';
  const shop=useLiveQuery(()=>db.shops.toCollection().first(),[]);
  const [name,setName]=useState(''),[phone,setPhone]=useState(''),[address,setAddress]=useState(''),[gstin,setGstin]=useState('');
  const [busy,setBusy]=useState(false),[savedCurrentBackup,setSavedCurrentBackup]=useState(false),[understood,setUnderstood]=useState(false);
  const [backupFile,setBackupFile]=useState<File|null>(null);
  const [backupUrl,setBackupUrl]=useState('');
  const [usage,setUsage]=useState<Usage|null>(null);
  const fileRef=useRef<HTMLInputElement>(null);
  useUpdateHold('settings',busy||Boolean(shop&&(name!==shop.name||phone!==shop.phone||address!==shop.address||gstin!==shop.gstin)));
  useEffect(()=>{if(shop){setName(shop.name);setPhone(shop.phone);setAddress(shop.address);setGstin(shop.gstin);}},[shop]);
  useEffect(()=>()=>{if(backupUrl)URL.revokeObjectURL(backupUrl);},[backupUrl]);
  useEffect(()=>{let active=true;async function estimate(){try{const e=await navigator.storage?.estimate?.();const persistent=await navigator.storage?.persisted?.();if(active&&e)setUsage({used:e.usage??0,quota:e.quota??0,persistent:typeof persistent==='boolean'?persistent:null});}catch{}}void estimate();return()=>{active=false;};},[]);
  async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);try{await saveShop({name,phone,address,gstin});notify(ml?'കടയുടെ വിവരങ്ങൾ സേവ് ചെയ്തു.':'Shop settings saved.');}catch(err){notify(safeError(err),'error');}finally{setBusy(false);}}
  async function prepare(){if(busy)return;setBusy(true);try{const file=await prepareBackupFile();const url=URL.createObjectURL(file);setBackupFile(file);setBackupUrl(url);setSavedCurrentBackup(false);notify(ml?'ബാക്കപ്പ് തയ്യാറായി. താഴെയുള്ള Share അല്ലെങ്കിൽ Download അമർത്തി Files-ൽ സൂക്ഷിക്കുക.':'Backup ready. Tap Share or Download to save it outside the app.');}catch(e){notify(safeError(e),'error');}finally{setBusy(false);}}
  function share(){if(!backupFile)return;const files=[backupFile];if(navigator.share&&(!navigator.canShare||navigator.canShare({files}))){
    void navigator.share({title:'Shop Billing backup',files}).then(()=>{setSavedCurrentBackup(true);notify(ml?'Share പൂർത്തിയായി. Files-ൽ ശരിയായി സേവ് ചെയ്തെന്ന് പരിശോധിക്കുക.':'Share completed. Verify the file is actually saved in Files.');}).catch(err=>{if((err as Error).name!=='AbortError')notify(safeError(err),'error');});
  }else notify(ml?'ഈ Browser-ൽ File Share ലഭ്യമല്ല. Download JSON ഉപയോഗിക്കുക.':'File sharing unavailable. Use Download JSON.','error');}
  async function restore(file?:File){if(!file)return;
    if(!savedCurrentBackup||!understood){notify(ml?'ആദ്യം ഇപ്പോഴത്തെ ബാക്കപ്പ് Downloads/Files-ൽ Save ചെയ്ത് Restore സമ്മതിക്കുക.':'Save a backup first and acknowledge the replacement risk.','error');return;}
    if(!confirm(ml?`${file.name} ഉപയോഗിച്ച് ഈ ഫോണിലെ എല്ലാ കട വിവരങ്ങളും മാറ്റണോ? മുമ്പത്തെ ബാക്കപ്പ് ഇല്ലെങ്കിൽ തിരികെ കിട്ടില്ല.`:`Replace ALL local shop data with ${file.name}? This cannot be undone without a backup.`))return;
    setBusy(true);try{const info=await importBackup(file);setSavedCurrentBackup(false);setUnderstood(false);setBackupFile(null);setBackupUrl('');notify(ml?`${info.products} സാധനങ്ങളും ${info.invoices} ബില്ലുകളും Restore ചെയ്തു.`:`Restored ${info.products} products and ${info.invoices} invoices.`);}catch(e){notify(safeError(e),'error');}finally{setBusy(false);if(fileRef.current)fileRef.current.value='';}
  }
  const mb=(n:number)=>(n/1024/1024).toFixed(n>100*1024*1024?0:1);
  return <div className="stack"><div className="page-heading"><div><h1>{t('settings')}</h1><p>{t('settingsIntro')}</p></div></div>
    <div className="two-columns settings-columns">
      <div className="stack settings-primary">
        <section id="local-backup" className="backup-primary-panel"><Panel title={t('backupTitle')} sub={ml?'iPhone Files / Android Downloads-ൽ സുരക്ഷിതമായി സൂക്ഷിക്കുക.':'Keep the JSON file in iPhone Files / Android Downloads.'}>
          <div className="stack compact">
            <div className="notice good"><HardDriveDownload size={20}/><span>{ml?'ബില്ലുകൾ, സ്റ്റോക്ക്, ചെലവുകൾ, സ്വന്തമായി Upload ചെയ്ത Product Images എന്നിവ ഈ ബാക്കപ്പിൽ ഉൾപ്പെടും.':'Bills, stock, expenses and your uploaded product photos are included in this backup.'}</span></div>
            <button type="button" className="button primary wide" disabled={busy} onClick={()=>void prepare()}><Download size={18}/>{busy?(ml?'തയ്യാറാക്കുന്നു…':'Preparing…'):(ml?'1. ബാക്കപ്പ് തയ്യാറാക്കുക':'1. Prepare backup file')}</button>
            {backupFile&&<div className="backup-ready" role="status"><div className="backup-ready-text"><CheckCircle2 size={17}/><span>{backupFile.name} · {mb(backupFile.size)} MB</span></div>
              <div className="backup-action-row">
                <button className="button primary" type="button" onClick={share}><Share2 size={17}/>{ml?'2. Share / Save to Files':'2. Share / Save to Files'}</button>
                <a className="button secondary" href={backupUrl} download={backupFile.name} onClick={()=>setSavedCurrentBackup(true)}><Download size={16}/>{ml?'Download JSON':'Download JSON'}</a>
              </div>
              <p className="muted small">{ml?'iPhone-ൽ Share → Save to Files തിരഞ്ഞെടുക്കുക. Safari-ൽ Share ലഭിക്കാത്തപ്പോൾ Download അമർത്തി Files/Downloads പരിശോധിക്കുക.':'On iPhone, choose Share → Save to Files. If sharing is unavailable, download JSON and check Files/Downloads.'}</p>
            </div>}
            <div className="divider"/><strong>{t('restoreTitle')}</strong>
            <p className="small muted">{ml?'പുതിയ ഫോൺ/Install-ലേക്ക് പഴയ ഡാറ്റ കൊണ്ടുവരാം. നിലവിലുള്ള ഡാറ്റ Replace ചെയ്യും; ശ്രദ്ധിക്കുക.':'Restore records onto a new phone/app. This replaces its current data.'}</p>
            <label className="check"><input type="checkbox" checked={understood} onChange={e=>setUnderstood(e.target.checked)}/>{t('restoreWarning')}</label>
            <input className="sr-only" ref={fileRef} type="file" accept="application/json,.json" onChange={e=>void restore(e.target.files?.[0])}/>
            <button type="button" className="button secondary wide" disabled={!understood||!savedCurrentBackup||busy} onClick={()=>fileRef.current?.click()}><FolderUp size={18}/>{t('restoreButton')}</button>
            <p className="small muted">{ml?'Restore-ന് മുമ്പ് ഈ ഫോണിന്റെ Backup ഫയൽ Save ചെയ്യണം. Download ചെയ്തു എന്നത് മാത്രം മതിയല്ല, Files-ൽ ഉണ്ടെന്ന് പരിശോധിക്കുക.':'Save this phone’s current backup first. Check the file exists outside the app before restoring.'}</p>
          </div>
        </Panel></section>
        <InstallGuide/>
        <Panel title={t('storage')}><div className="stack compact">
          {usage&&<div className="storage-usage"><strong>{ml?'ഫോൺ Browser Storage (ഏകദേശം)':'Browser storage (approximate)'}</strong><div className="storage-used">{mb(usage.used)} MB {ml?'ഉപയോഗം':'used'} {usage.quota?`/ ${mb(usage.quota)} MB ${ml?'പരിധി':'quota'}`:''}</div><div className="storage-meter"><span style={{width:`${usage.quota?Math.min(100,usage.used/usage.quota*100):0}%`}}/></div></div>}
          <div className="feature-list"><div><WifiOff size={19}/><span><strong>{ml?'ഓഫ്‌ലൈൻ':'Offline ready'}</strong><span className="muted small">{ml?'ആദ്യം Internet-ൽ App തുറന്ന് ഫയലുകൾ Cache ആക്കണം.':'Open once online to cache app files.'}</span></span></div><div><Smartphone size={19}/><span><strong>{ml?'Local Database':'Local database'}</strong><span className="muted small">{ml?'ഓരോ Browser/App Install-നും വ്യത്യസ്ത ഡാറ്റ ആയിരിക്കാം.':'Each browser/installed app may have separate records.'}</span></span></div><div><ShieldCheck size={19}/><span><strong>{ml?'ഫോണിൽ തന്നെ ഡാറ്റ':'Data stays on this device'}</strong><span className="muted small">{ml?'നമ്മുടെ Website-ലേക്ക് Sales Data Upload ചെയ്യുന്നില്ല.':'Sales records are not uploaded to our site.'}</span></span></div></div>
          <button className="button ghost" type="button" onClick={async()=>{try{if(!navigator.storage?.persist){notify(ml?'ഈ Browser-ൽ Storage Protection ലഭ്യമല്ല.':'Storage protection is unavailable.','error');return;}const ok=await navigator.storage.persist();setUsage(x=>x?{...x,persistent:ok}:x);notify(ok?(ml?'Storage Protection അനുവദിച്ചു.':'Persistent storage granted.'):(ml?'Browser ഇത് അനുവദിച്ചില്ല. ബാക്കപ്പ് നിർബന്ധമാണ്.':'Browser did not grant persistent storage. Keep backups.'));}catch(e){notify(safeError(e),'error');}}}>{ml?'Storage സംരക്ഷണം ചോദിക്കുക':'Request persistent storage'}</button>
        </div></Panel>
        <Panel title={t('offlinePhotos')}><OfflinePhotoDownload/></Panel>
      </div>
      <div className="stack settings-secondary">
        <Panel title={t('shopInfo')} sub={ml?'ബിൽ PDF-ൽ ഈ കടയുടെ പേര് കാണിക്കും.':'Shown on optional receipt PDFs.'}><form className="stack compact" onSubmit={submit}><Field label={`${t('shopName')} *`}><input required maxLength={100} value={name} onChange={e=>setName(e.target.value)}/></Field><Field label={t('phone')}><input type="tel" maxLength={25} value={phone} onChange={e=>setPhone(e.target.value)}/></Field><Field label={t('address')}><textarea rows={3} maxLength={250} value={address} onChange={e=>setAddress(e.target.value)}/></Field><Field label={t('gstin')}><input maxLength={15} value={gstin} onChange={e=>setGstin(e.target.value.toUpperCase())}/></Field><button className="button primary" type="submit" disabled={busy}>{t('saveSettings')}</button></form></Panel>
        <div className="notice warning"><AlertTriangle size={21}/><span>{ml?'Browser Data Clear ചെയ്താലോ PWA Uninstall ചെയ്താലോ Bills നഷ്ടപ്പെടാം. പതിവായി Files-ലേക്ക് Backup എടുക്കുക. iPhone Safari-യും Home Screen App-ഉം ഒരേ Storage പങ്കിടണമെന്നില്ല.':'Clearing browser data or uninstalling may erase bills. Save backups regularly. iPhone Safari and the Home Screen app may not share storage.'}</span></div>
      </div>
    </div>
  </div>;
}
