import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync,readdirSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';

const root=process.cwd();
const pkg=JSON.parse(readFileSync(join(root,'package.json'),'utf8'));
const hash=createHash('sha256');
function walk(relative){
 const folder=join(root,relative);
 if(!existsSync(folder))return;
 for(const ent of readdirSync(folder,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){
  const path=relative+'/'+ent.name;
  if(ent.isDirectory())walk(path);
  else if(ent.isFile()){
   hash.update(path); hash.update(readFileSync(join(root,path)));
  }
 }
}
for(const folder of ['src','public/products','public/icons','scripts'])walk(folder);
hash.update(readFileSync(join(root,'package.json')));
let fromGit=String(process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || '').trim();
if(!/^[a-f0-9]{7,64}$/i.test(fromGit)){
 try {fromGit=execFileSync('git',['rev-parse','HEAD'],{cwd:root,stdio:['ignore','pipe','ignore']}).toString().trim();}catch{fromGit='';}
}
// Combine digest WITH the git SHA: even unstaged local changes are detected in dev builds.
const buildId=[fromGit.slice(0,12),hash.digest('hex').slice(0,12)].filter(Boolean).join('-');
const release={version:pkg.version,buildId,schemaVersion:1,generatedAt:new Date().toISOString()};
const script=readFileSync(join(root,'scripts/sw-template.js'),'utf8');
writeFileSync(join(root,'public/sw.js'),script.replaceAll('__RELEASE_ID__',`${pkg.version}-${buildId}`));
writeFileSync(join(root,'public/version.json'),JSON.stringify(release,null,2)+'\n');
console.log(`Stamped release ${release.version} (${release.buildId})`);
