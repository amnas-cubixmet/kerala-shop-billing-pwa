'use client';
import {useEffect,useState} from 'react';
import {CheckCircle2,ExternalLink,Share2,Smartphone,PlusSquare} from 'lucide-react';
import {useLanguage} from '@/lib/language';
import {Panel} from '@/components/ui';

type Platform='ios'|'android'|'desktop';
export default function InstallGuide(){
  const {language}=useLanguage();
  const [platform,setPlatform]=useState<Platform>('ios');
  const [installed,setInstalled]=useState(false);
  const [safari,setSafari]=useState(true);
  useEffect(()=>{
    const ua=navigator.userAgent;
    setPlatform(/iPhone|iPad|iPod/i.test(ua)||(/Macintosh/i.test(ua)&&navigator.maxTouchPoints>1)?'ios':/Android/i.test(ua)?'android':'desktop');
    setSafari(/Safari/i.test(ua)&&!/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua));
    setInstalled(window.matchMedia('(display-mode: standalone)').matches || Boolean((navigator as Navigator & {standalone?:boolean}).standalone));
  },[]);
  const ml=language==='ml';
  return <Panel title={ml?'ഫോണിൽ App Install ചെയ്യാം':'Install on Home Screen'} sub={ml?'ആപ്പ് ഐക്കൺ Home Screen-ൽ കാണും.':'Your Shop Billing icon will appear on your home screen.'}>
    {installed?<div className="notice good"><CheckCircle2 size={19}/>{ml?'ഈ ആപ്പ് Home Screen-ൽ നിന്ന് തുറന്നിരിക്കുന്നു.':'App is already running from the home screen.'}</div>:
    <div className="install-guide-content">
      <div className="install-platform-tabs" role="group" aria-label="Device type">
        <button type="button" className={platform==='ios'?'active':''} onClick={()=>setPlatform('ios')}>iPhone / iPad</button>
        <button type="button" className={platform==='android'?'active':''} onClick={()=>setPlatform('android')}>Android</button>
      </div>
      {platform==='ios'?<>
        {!safari&&<div className="notice warning"><ExternalLink size={18}/>{ml?'WhatsApp/Chrome അല്ല; Safari-ൽ ഈ website തുറക്കുക.':'Open this website in Safari, not an in-app browser.'}</div>}
        <ol className="install-steps">
          <li>{ml?'iPhone Safari-ൽ website തുറക്കുക.':'Open the website using iPhone Safari.'}</li>
          <li><Share2 size={17}/>{ml?'Safari Share ബട്ടൺ അമർത്തുക.':'Tap the Safari Share button.'}</li>
          <li><PlusSquare size={17}/>{ml?'Add to Home Screen തിരഞ്ഞെടുക്കുക. കാണുന്നില്ലെങ്കിൽ Edit Actions നോക്കുക.':'Choose Add to Home Screen. If missing, check Edit Actions.'}</li>
          <li>{ml?'Open as Web App ഓണാക്കി Add അമർത്തുക.':'Turn on Open as Web App, then tap Add.'}</li>
        </ol>
      </>:<ol className="install-steps"><li>{ml?'Chrome-ൽ website തുറക്കുക.':'Open this website in Chrome.'}</li><li>{ml?'⋮ Menu അമർത്തുക.':'Tap the ⋮ menu.'}</li><li>{ml?'Install App / Add to Home Screen അമർത്തുക.':'Choose Install App / Add to Home Screen.'}</li></ol>}
      <p className="muted small"><Smartphone size={15} style={{verticalAlign:'middle'}}/> {ml?'Install ചെയ്ത App-ൽ Browser-ലേതിൽ നിന്ന് വേറിട്ട Local Storage ഉണ്ടാകാം. പഴയ Bills ആദ്യം Backup ചെയ്യുക.':'The installed app may use storage separate from Safari/Chrome. Back up existing records first.'}</p>
    </div>}
  </Panel>;
}
