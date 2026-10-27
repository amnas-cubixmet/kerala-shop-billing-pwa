import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
const icons=JSON.parse(readFileSync('assets/app-icons.json','utf8'));
const allowed=new Set(['icons/icon-512.png','icons/icon-192.png','apple-touch-icon.png','favicon.png']);
for (const [file,base64] of Object.entries(icons)) {
  if(!allowed.has(file) || !/^[A-Za-z0-9+/=]+$/.test(base64)) throw new Error('Invalid app icon data');
  const out=join('public',file);
  mkdirSync(dirname(out),{recursive:true});
  writeFileSync(out,Buffer.from(base64,'base64'));
}
console.log('Generated Android and iOS home-screen app icons');
