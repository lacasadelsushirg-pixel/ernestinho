const fs = require('fs');
const path = require('path');
const http = require('http');
const { chromium } = require('playwright');

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const DOMAIN = 'https://www.ernestinhocarioca.com.br';
const sitemap = fs.readFileSync(path.join(ROOT,'sitemap.xml'),'utf8');
const routes = [...sitemap.matchAll(/<loc>https:\/\/www\.ernestinhocarioca\.com\.br([^<]*)<\/loc>/g)]
  .map(m => (m[1] || '/').replace(/\/$/,'') || '/');

function localFile(urlPath) {
  const p = decodeURIComponent(urlPath.split('?')[0]);
  if (p === '/') return path.join(DIST,'index.html');
  const direct = path.join(DIST,p.replace(/^\//,''));
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return direct;
  const html = direct + '.html';
  if (fs.existsSync(html)) return html;
  return path.join(DIST,'404.html');
}
function typeFor(f){
  if(f.endsWith('.html'))return 'text/html; charset=utf-8';
  if(f.endsWith('.js'))return 'text/javascript; charset=utf-8';
  if(f.endsWith('.css'))return 'text/css';
  if(f.endsWith('.xml'))return 'application/xml';
  return 'application/octet-stream';
}
const server = http.createServer((req,res)=>{
  const file=localFile(req.url);
  const is404=file.endsWith(path.sep+'404.html') && !fs.existsSync(path.join(DIST,decodeURIComponent(req.url.split('?')[0]).replace(/^\//,'')+'.html'));
  res.writeHead(is404?404:200,{'content-type':typeFor(file),'cache-control':'no-store'});
  fs.createReadStream(file).pipe(res);
});

(async()=>{
  await new Promise(r=>server.listen(4173,'127.0.0.1',r));
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext();
  await context.route(/\.(png|jpe?g|webp|gif|svg)(\?|$)/i, r=>r.abort());
  const results=[];
  const queue=[...routes];
  async function worker(){
    const page=await context.newPage();
    while(queue.length){
      const route=queue.shift();
      const pageErrors=[];
      const handler=e=>pageErrors.push(String(e.message||e));
      page.on('pageerror',handler);
      let navError=null;
      try{
        await page.goto('http://127.0.0.1:4173'+route,{waitUntil:'domcontentloaded',timeout:15000});
        await page.waitForTimeout(700);
      }catch(e){navError=String(e.message||e)}
      const data=await page.evaluate(()=>({
        path:location.pathname.replace(/\/$/,'')||'/',
        canonical:document.querySelector('link[rel="canonical"]')?.href||'',
        robots:document.querySelector('meta[name="robots"]')?.content||'',
        title:document.title||'',
        rootText:(document.getElementById('ernestinho-carioca-root')?.innerText||'').trim().slice(0,300)
      })).catch(()=>({path:'',canonical:'',robots:'',title:'',rootText:''}));
      page.off('pageerror',handler);
      const expectedCanonical=DOMAIN+(route==='/'?'/':route);
      results.push({route,finalPath:data.path,canonical:data.canonical,title:data.title,robots:data.robots,rootHasText:!!data.rootText,navError,pageErrors:pageErrors.slice(0,3),ok:data.path===route&&data.canonical===expectedCanonical&&!/noindex/i.test(data.robots)});
    }
    await page.close();
  }
  await Promise.all(Array.from({length:4},()=>worker()));
  await browser.close(); server.close();
  results.sort((a,b)=>routes.indexOf(a.route)-routes.indexOf(b.route));
  const failed=results.filter(x=>!x.ok);
  const byCategory=failed.reduce((a,x)=>{const k=x.route==='/'?'/':'/'+x.route.split('/').filter(Boolean)[0];a[k]=(a[k]||0)+1;return a},{});
  const report={generatedAt:new Date().toISOString(),total:results.length,ok:results.length-failed.length,failed:failed.length,failedByCategory:byCategory,failures:failed,results};
  fs.writeFileSync('seo-browser-audit.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify({total:report.total,ok:report.ok,failed:report.failed,failedByCategory:byCategory},null,2));
  if(failed.length) process.exitCode=2;
})().catch(e=>{console.error(e);server.close();process.exit(1)});
