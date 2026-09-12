const fs=require('fs'),path=require('path'),http=require('http');
const {chromium}=require('playwright');
const DIST=path.join(process.cwd(),'dist'),DOMAIN='https://www.ernestinhocarioca.com.br';
const sitemap=fs.readFileSync('sitemap.xml','utf8');
const routes=[...sitemap.matchAll(/<loc>https:\/\/www\.ernestinhocarioca\.com\.br([^<]*)<\/loc>/g)].map(m=>(m[1]||'/').replace(/\/$/,'')||'/');
function localFile(urlPath){const p=decodeURIComponent(urlPath.split('?')[0]);if(p==='/')return path.join(DIST,'index.html');const d=path.join(DIST,p.replace(/^\//,''));if(fs.existsSync(d)&&fs.statSync(d).isFile())return d;if(fs.existsSync(d+'.html'))return d+'.html';return path.join(DIST,'404.html')}
function mime(f){if(f.endsWith('.html'))return'text/html; charset=utf-8';if(f.endsWith('.js'))return'text/javascript; charset=utf-8';if(f.endsWith('.css'))return'text/css';return'application/octet-stream'}
const server=http.createServer((req,res)=>{const f=localFile(req.url),not=f.endsWith(path.sep+'404.html');res.writeHead(not?404:200,{'content-type':mime(f),'cache-control':'no-store'});fs.createReadStream(f).pipe(res)});
(async()=>{
 await new Promise(r=>server.listen(4173,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true});
 const context=await browser.newContext();
 // Rendering/SEO audit: keep React, but neutralize nonessential third-party resources.
 await context.route('**/*',async r=>{
  const u=r.request().url();
  if(/\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(u))return r.abort();
  if(/cdn\.tailwindcss\.com|xlsx\.full\.min\.js|unpkg\.com\/lucide|googletagmanager|google-analytics/i.test(u))return r.fulfill({status:200,contentType:'text/javascript',body:''});
  return r.continue();
 });
 const results=[],queue=[...routes];
 async function worker(){
  const page=await context.newPage();
  while(queue.length){
   const route=queue.shift(),errs=[];let navError=null;
   const eh=e=>errs.push(String(e.message||e));page.on('pageerror',eh);
   try{await page.goto('http://127.0.0.1:4173'+route,{waitUntil:'domcontentloaded',timeout:6000});await page.waitForTimeout(350)}catch(e){navError=String(e.message||e)}
   const d=await page.evaluate(()=>({path:location.pathname.replace(/\/$/,'')||'/',canonical:document.querySelector('link[rel="canonical"]')?.href||'',robots:document.querySelector('meta[name="robots"]')?.content||'',title:document.title||'',rootText:(document.getElementById('ernestinho-carioca-root')?.innerText||'').trim().slice(0,200)})).catch(()=>({path:'',canonical:'',robots:'',title:'',rootText:''}));
   page.off('pageerror',eh);
   const expected=DOMAIN+(route==='/'?'/':route),ok=d.path===route&&d.canonical===expected&&!/noindex/i.test(d.robots)&&!navError&&errs.length===0;
   results.push({route,finalPath:d.path,canonical:d.canonical,title:d.title,robots:d.robots,rootHasText:!!d.rootText,navError,pageErrors:errs.slice(0,3),ok});
  }
  await page.close();
 }
 await Promise.all(Array.from({length:12},()=>worker()));
 await browser.close();server.close();
 results.sort((a,b)=>routes.indexOf(a.route)-routes.indexOf(b.route));
 const failed=results.filter(x=>!x.ok),byCategory=failed.reduce((a,x)=>{const k=x.route==='/'?'/':'/'+x.route.split('/').filter(Boolean)[0];a[k]=(a[k]||0)+1;return a},{});
 const report={generatedAt:new Date().toISOString(),total:results.length,ok:results.length-failed.length,failed:failed.length,failedByCategory:byCategory,failures:failed,results};
 fs.writeFileSync('seo-browser-audit.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify({total:report.total,ok:report.ok,failed:report.failed,failedByCategory:byCategory},null,2));
 if(failed.length)process.exitCode=2;
})().catch(e=>{console.error(e);server.close();process.exit(1)});
