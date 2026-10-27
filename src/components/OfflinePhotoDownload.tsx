'use client';
import {useEffect,useState} from 'react';
import {DownloadCloud} from 'lucide-react';
import {CATALOG_IMAGES} from '@/lib/catalog-image-map';

export default function OfflinePhotoDownload() {
 const [available,setAvailable]=useState(false);
 const [saving,setSaving]=useState(false);
 const [progress,setProgress]=useState({done:0,total:850,failed:0});
 useEffect(()=>{
  if(!('serviceWorker' in navigator))return;
  setAvailable(Boolean(navigator.serviceWorker.controller));
  const onController=()=>setAvailable(Boolean(navigator.serviceWorker.controller));
  const onMessage=(event:MessageEvent)=>{
   if(event.data?.type!=='PHOTO_CACHE_PROGRESS' && event.data?.type!=='PHOTO_CACHE_DONE')return;
   const {done,total,failed}=event.data;
   setProgress({done,total,failed});
   if(event.data.type==='PHOTO_CACHE_DONE')setSaving(false);
  };
  navigator.serviceWorker.addEventListener('controllerchange',onController);
  navigator.serviceWorker.addEventListener('message',onMessage);
  return ()=>{navigator.serviceWorker.removeEventListener('controllerchange',onController);navigator.serviceWorker.removeEventListener('message',onMessage);};
 },[]);
 const download=()=>{
  if(!navigator.serviceWorker?.controller || !navigator.onLine)return;
  setSaving(true);setProgress({done:0,total:Object.keys(CATALOG_IMAGES).length,failed:0});
  navigator.serviceWorker.controller.postMessage({type:'CACHE_PRODUCT_PHOTOS',paths:Object.values(CATALOG_IMAGES)});
 };
 return <div className="stack compact">
  <p className="small muted">850 illustrative product photographs are hosted inside this app. Download once to display them offline even before opening every product. Your uploaded real product photos stay in IndexedDB.</p>
  <button className="button secondary wide" disabled={!available||saving} onClick={download}><DownloadCloud size={17}/>{saving?`Downloading ${progress.done}/${progress.total}`:'Download 850 product photos for offline'}</button>
  {progress.done>0 && <p className="small muted" role="status">{progress.done} of {progress.total} checked · {progress.failed} failures. {progress.failed>0?'Retry while online if needed.':''}</p>}
  {!available&&<p className="tiny muted">Open the installed PWA again after first online visit to enable offline photo downloading.</p>}
 </div>;
}
