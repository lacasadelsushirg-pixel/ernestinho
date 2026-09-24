const fs=require('fs');const path=require('path');const vm=require('vm');
const ROOT=process.cwd(),MAX=250000,fail=[];

function assertRuntimeReferences() {
  const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const bootstrap = fs.readFileSync(path.join(ROOT, 'assets/data-bootstrap-20260923-final-audit-v8.js'), 'utf8');
  const refs = [];
  const re = /['"]\/(assets|data)\/([^'"?]+)(?:\?[^'"]*)?['"]/g;
  for (const source of [index, bootstrap]) {
    let m;
    while ((m = re.exec(source))) refs.push('/' + m[1] + '/' + m[2]);
  }
  for (const ref of [...new Set(refs)]) {
    if (!fs.existsSync(path.join(ROOT, ref.slice(1)))) fail.push('missing runtime reference: ' + ref);
  }
}
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{const p=path.join(d,e.name);return e.isDirectory()?walk(p):[p]})}
const files=walk(ROOT).filter(p=>!p.includes(path.sep+'.git'+path.sep)&&!p.includes(path.sep+'node_modules'+path.sep));
for(const p of files){
 const rel=path.relative(ROOT,p).replace(/\\/g,'/');
 const b=fs.readFileSync(p);
 if(rel.endsWith('.js')){if(b.length>MAX)fail.push(rel+' exceeds 250KB: '+b.length);try{new vm.Script(b.toString('utf8'),{filename:rel})}catch(e){fail.push(rel+' syntax: '+e.message)}}
 if(rel.endsWith('.json')){try{JSON.parse(b.toString('utf8'))}catch(e){fail.push(rel+' JSON: '+e.message)}}
}
const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
const forbidden=[
 ['Tailwind CDN','https://cdn.tailwindcss.com'],
 ['remote React','https://unpkg.com/react@'],
 ['remote ReactDOM','https://unpkg.com/react-dom@'],
 ['remote Lucide','https://unpkg.com/lucide@']
];
for(const [label,token] of forbidden)if(html.includes(token))fail.push('index still depends on '+label);

for(const must of ['ernestinho-carioca-root','ec-static-fallback','data-bootstrap-20260923-final-audit-v8.js'])if(!html.includes(must))fail.push('index missing '+must);
const sitemap=fs.readFileSync(path.join(ROOT,'sitemap.xml'),'utf8');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
if(urls.length<300)fail.push('sitemap unexpectedly small: '+urls.length);
if(new Set(urls).size!==urls.length)fail.push('sitemap has duplicate URLs');
assertRuntimeReferences();
console.log(JSON.stringify({files:files.length,js:files.filter(x=>x.endsWith('.js')).length,json:files.filter(x=>x.endsWith('.json')).length,sitemap:urls.length,maxJsBytes:Math.max(...files.filter(x=>x.endsWith('.js')).map(x=>fs.statSync(x).size)),failures:fail},null,2));
if(fail.length)process.exit(1);
