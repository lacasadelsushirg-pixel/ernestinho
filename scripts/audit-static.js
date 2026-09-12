const fs=require('fs'), path=require('path');
const ROOT=process.cwd(), DIST=path.join(ROOT,'dist'), DOMAIN='https://www.ernestinhocarioca.com.br';
const sitemap=fs.readFileSync('sitemap.xml','utf8'), source=fs.readFileSync('index.html','utf8');
const locs=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1].trim());
const paths=locs.filter(u=>u.startsWith(DOMAIN)).map(u=>{const p=new URL(u).pathname;return p.length>1?p.replace(/\/$/,''):'/'});
const unique=[...new Set(paths)], dupes=paths.length-unique.length;
const mapMatch=source.match(/const SEO_SECTION_ROUTES\s*=\s*\{([\s\S]*?)\n\};/);
const mapBlock=mapMatch?mapMatch[1]:'';
const exact=new Set([...mapBlock.matchAll(/["'](\/[^"']*)["']/g)].map(m=>m[1]));
['/recorrido-centro','/ruta-centro','/quiero'].forEach(x=>exact.add(x));
const dyn=['/museos/','/barrios/','/gastronomia/','/articulos/','/guia/','/experiencias/'];
const clientSupported=r=>exact.has(r)||dyn.some(p=>r.startsWith(p)&&r.slice(p.length)&&!r.slice(p.length).includes('/'));
const one=(re,s)=>(s.match(re)||[]).length;
const cap=(re,s)=>{const m=s.match(re);return m?m[1]:null};
const rows=[], errors=[];
for(const route of unique){
 const file=route==='/'?path.join(DIST,'index.html'):path.join(DIST,route.slice(1)+'.html');
 if(!fs.existsSync(file)){errors.push({route,code:'MISSING_FILE'});continue}
 const h=fs.readFileSync(file,'utf8'), expected=DOMAIN+(route==='/'?'/':route);
 const canonical=cap(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i,h)||cap(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i,h);
 const robots=cap(/<meta\s+[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i,h)||cap(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*name=["']robots["'][^>]*>/i,h);
 const checks=[
  ['TITLE',one(/<title\b/ig,h)===1],['CANONICAL',one(/rel=["']canonical["']/ig,h)===1&&canonical===expected],
  ['DESCRIPTION',one(/name=["']description["']/ig,h)===1],['ROBOTS',one(/name=["']robots["']/ig,h)===1&&robots&&/index/i.test(robots)&&!/noindex/i.test(robots)],
  ['APP_JS',/src=["']\/app\.js["']/i.test(h)],['NO_BROWSER_BABEL',!/@babel\/standalone/i.test(h)],['ROOT',/id=["']ernestinho-carioca-root["']/i.test(h)]
 ];
 checks.filter(x=>!x[1]).forEach(x=>errors.push({route,code:x[0]}));
 rows.push({route,status:checks.every(x=>x[1])?'OK':'ERROR',bytes:Buffer.byteLength(h),clientRouterPattern:clientSupported(route)});
}
const categoryCounts=unique.reduce((a,p)=>{const k=p==='/'?'/':'/'+p.split('/').filter(Boolean)[0];a[k]=(a[k]||0)+1;return a},{});
const unsupported=rows.filter(r=>!r.clientRouterPattern).map(r=>r.route);
const unsupportedByCategory=unsupported.reduce((a,p)=>{const k='/'+p.split('/').filter(Boolean)[0];a[k]=(a[k]||0)+1;return a},{});
const appFile=path.join(DIST,'app.js');
const report={generatedAt:new Date().toISOString(),sitemapLocCount:locs.length,sameDomainCount:paths.length,uniquePathCount:unique.length,duplicatePathCount:dupes,invalidDomainCount:locs.length-paths.length,distAppExists:fs.existsSync(appFile),appBytes:fs.existsSync(appFile)?fs.statSync(appFile).size:0,dist404Exists:fs.existsSync(path.join(DIST,'404.html')),categoryCounts,clientRouterPatternSupportedCount:rows.length-unsupported.length,clientRouterPatternUnsupportedCount:unsupported.length,unsupportedByCategory,unsupportedClientRoutes:unsupported,errors,rows};
fs.writeFileSync('seo-audit-report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({sitemap:report.sitemapLocCount,unique:report.uniquePathCount,staticErrors:errors.length,appBytes:report.appBytes,clientSupported:report.clientRouterPatternSupportedCount,clientUnsupported:report.clientRouterPatternUnsupportedCount,unsupportedByCategory},null,2));
if(errors.length)process.exitCode=1;
