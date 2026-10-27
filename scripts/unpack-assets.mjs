import {readFileSync,readdirSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {join,dirname,resolve} from 'node:path';
import {gunzipSync} from 'node:zlib';

const root=process.cwd();
const photos=join(root,'public/products/vegetables/kerala-veg-001.webp');
const sentinel=join(root,'public/products/brands/kerala-v5-grocery-085-value.webp');
if(existsSync(photos) && existsSync(sentinel)) {
  console.log('Product image folders already present; no extraction needed.');
  process.exit(0);
}
const partFolder=join(root,'assets/photos-base64');
if(!existsSync(partFolder)) throw Error('Product photo folders absent and no bundled photo asset chunks present.');
const parts=readdirSync(partFolder).filter(f=>/^chunk-\d+\.txt$/.test(f)).sort();
if(!parts.length)throw Error('No product photo archive chunks found.');
const archive=gunzipSync(Buffer.from(parts.map(p=>readFileSync(join(partFolder,p),'utf8').trim()).join(''),'base64'));
let count=0;
for(let pos=0;pos+512<=archive.length;){
  const header=archive.subarray(pos,pos+512);
  if(header.every(byte=>byte===0))break;
  const string=(start,end)=>header.subarray(start,end).toString('utf8').replace(/\0.*$/,'');
  const name=string(0,100);
  const prefix=string(345,500);
  const file=(prefix?prefix+'/':'')+name;
  const size=parseInt(string(124,136).trim()||'0',8);
  const type=String.fromCharCode(header[156]||48);
  if(!Number.isFinite(size)||size<0||size>10_000_000)throw Error('Malformed photo archive');
  const allowed=/^public\/(products|icons)\/[a-zA-Z0-9_\/.\-]+$/.test(file) && !file.includes('..') && !file.startsWith('/');
  if(!allowed)throw Error('Unsafe or unexpected asset path: '+file);
  if(type==='0'||type==='\0'){
    const destination=resolve(root,file);
    mkdirSync(dirname(destination),{recursive:true});
    // Photos committed directly in public/products take priority over bundled defaults.
    // This protects custom upgrades while keeping the remaining 850 photos offline.
    if(!existsSync(destination)) writeFileSync(destination,archive.subarray(pos+512,pos+512+size));
    count++;
  }
  pos+=512+Math.ceil(size/512)*512;
}
if(count<850)throw Error(`Only ${count} photo assets extracted; expected 850+`);
console.log(`Extracted ${count} product image/icon files`);
