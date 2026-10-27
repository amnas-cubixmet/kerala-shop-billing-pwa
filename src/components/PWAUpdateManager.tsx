'use client';
import {useEffect, useState} from 'react';
import {DownloadCloud, RefreshCcw, X} from 'lucide-react';
import {hasPendingShopChanges, UPDATE_GUARD_CHANGED} from '@/lib/update-guard';

/**
 * Automatic on next safe opportunity: never force a reload during a live bill.
 * Online tabs check for updates on focus/connection + periodically.
 * Installed SW controls static app code only; IndexedDB remains untouched.
 */
export default function PWAUpdateManager() {
  const [waiting,setWaiting] = useState(false);
  const [blocked,setBlocked] = useState(false);
  const [working,setWorking] = useState(false);
  const [visible,setVisible] = useState(true);
  const [version,setVersion] = useState('');

  useEffect(() => {
    if (!('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') return;
    let live = true;
    let currentRegistration: ServiceWorkerRegistration | undefined;
    let installing: ServiceWorker | null = null;
    let didControlApp = !!navigator.serviceWorker.controller;
    let needsRefresh = false;
    let alreadyAsked = false;

    const guarded = () => hasPendingShopChanges();
    const updateIfSafe = () => {
      if (!live) return;
      const pending = guarded();
      setBlocked(pending);
      if (needsRefresh && !pending) {
        window.location.reload();
        return;
      }
      if (currentRegistration?.waiting) {
        setWaiting(true);
        if (!pending && !alreadyAsked) {
          alreadyAsked = true;
          currentRegistration.waiting.postMessage({type:'SKIP_WAITING'});
          setWorking(true);
        }
      }
    };
    const onGuard = () => {updateIfSafe();};
    const onControllerChange = () => {
      if (!didControlApp) { didControlApp = true; return; }
      needsRefresh = true;
      updateIfSafe();
    };
    const onInstallingState = () => {
      if (installing?.state === 'installed') updateIfSafe();
    };
    const onFound = () => {
      installing?.removeEventListener('statechange',onInstallingState);
      installing = currentRegistration?.installing ?? null;
      installing?.addEventListener('statechange',onInstallingState);
    };
    const check = () => {
      if (document.visibilityState === 'visible' && navigator.onLine) {
        void currentRegistration?.update().catch(()=>{});
        // Metadata is network-only. It is useful for settings/help, not authority to reload.
        void fetch('/version.json', {cache:'no-store'}).then(r=>r.ok?r.json():null)
          .then((info: unknown)=>{
            if(live && typeof info === 'object' && info && 'version' in info && typeof info.version === 'string') setVersion(info.version);
          }).catch(()=>{});
      }
      updateIfSafe();
    };
    void navigator.serviceWorker.register('/sw.js',{scope:'/',updateViaCache:'none'}).then(reg=>{
      if(!live)return;
      currentRegistration=reg;
      reg.addEventListener('updatefound',onFound);
      onFound(); check();
    }).catch(err=>console.warn('PWA registration failed:',err));
    const interval=window.setInterval(check,20*60*1000);
    const onVisibility=()=>{if(!document.hidden)check();};
    const onFocus=()=>{check();};
    const onOnline=()=>{check();};
    navigator.serviceWorker.addEventListener('controllerchange',onControllerChange);
    window.addEventListener(UPDATE_GUARD_CHANGED,onGuard);
    window.addEventListener('focus',onFocus);
    window.addEventListener('online',onOnline);
    document.addEventListener('visibilitychange',onVisibility);
    return () => {
      live=false;
      window.clearInterval(interval);
      currentRegistration?.removeEventListener('updatefound',onFound);
      installing?.removeEventListener('statechange',onInstallingState);
      navigator.serviceWorker.removeEventListener('controllerchange',onControllerChange);
      window.removeEventListener(UPDATE_GUARD_CHANGED,onGuard);
      window.removeEventListener('focus',onFocus);
      window.removeEventListener('online',onOnline);
      document.removeEventListener('visibilitychange',onVisibility);
    };
  },[]);
  if (!waiting || !visible) return null;
  return <section className="pwa-update-banner" role="status" aria-live="polite">
    <div className="pwa-update-mark"><DownloadCloud size={20}/></div>
    <div className="pwa-update-copy"><strong>New app update is ready</strong><span>{blocked ? 'Finish or save your current bill/form first. Your local data is safe.' : `Updating automatically… ${version ? `Version ${version}`:''}`}</span></div>
    <button className="button secondary" disabled={blocked||working} onClick={()=>{
      navigator.serviceWorker.getRegistration().then(r=>r?.waiting?.postMessage({type:'SKIP_WAITING'})).catch(()=>{});
      setWorking(true);
    }}><RefreshCcw size={15}/>{blocked?'Finish first':'Update now'}</button>
    <button aria-label="Hide update notice" className="icon-button" onClick={()=>setVisible(false)}><X size={17}/></button>
  </section>;
}
