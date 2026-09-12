const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const DOMAIN = 'https://www.ernestinhocarioca.com.br';
const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
const urls = locs.filter(u => u.startsWith(DOMAIN));
const paths = urls.map(u => {
  const x = new URL(u);
  return x.pathname.length > 1 ? x.pathname.replace(/\/$/, '') : '/';
});
const unique = [...new Set(paths)];
const dupes = paths.filter((p,i) => paths.indexOf(p) !== i);

function outputFile(route) {
  if (route === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, route.replace(/^\//, '') + '.html');
}
function count(re, s) { return (s.match(re) || []).length; }
function extract(re, s) { const m = s.match(re); return m ? m[1] : null; }

const errors = [];
const rows = [];
for (const route of unique) {
  const file = outputFile(route);
  const rel = path.relative(ROOT, file);
  if (!fs.existsSync(file)) {
    errors.push({ route, code:'MISSING_FILE', detail: rel });
    rows.push({route,file:rel,status:'ERROR'});
    continue;
  }
  const html = fs.readFileSync(file,'utf8');
  const canonical = extract(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i, html)
    || extract(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i, html);
  const expectedCanonical = DOMAIN + (route === '/' ? '/' : route);
  const robots = extract(/<meta\s+[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i, html)
    || extract(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*name=["']robots["'][^>]*>/i, html);
  const title = extract(/<title>([\s\S]*?)<\/title>/i, html);
  const desc = extract(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i, html)
    || extract(/<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i, html);
  const checks = [
    ['TITLE_COUNT', count(/<title\b/ig,html) === 1, String(count(/<title\b/ig,html))],
    ['CANONICAL_COUNT', count(/rel=["']canonical["']/ig,html) === 1, String(count(/rel=["']canonical["']/ig,html))],
    ['DESCRIPTION_COUNT', count(/name=["']description["']/ig,html) === 1, String(count(/name=["']description["']/ig,html))],
    ['ROBOTS_COUNT', count(/name=["']robots["']/ig,html) === 1, String(count(/name=["']robots["']/ig,html))],
    ['CANONICAL_MATCH', canonical === expectedCanonical, `${canonical} != ${expectedCanonical}`],
    ['ROBOTS_INDEX', !!robots && /index/i.test(robots) && !/noindex/i.test(robots), robots || 'missing'],
    ['TITLE_NONEMPTY', !!title && title.trim().length > 0, title || 'missing'],
    ['DESCRIPTION_NONEMPTY', !!desc && desc.trim().length > 0, desc || 'missing'],
    ['APP_BUNDLE_REF', /src=["']\/app\.jsx["']/i.test(html), 'missing /app.jsx'],
    ['ROOT_PRESENT', /id=["']ernestinho-carioca-root["']/i.test(html), 'missing root']
  ];
  for (const [code,ok,detail] of checks) if (!ok) errors.push({route,code,detail});
  rows.push({route,file:rel,status:checks.every(x=>x[1])?'OK':'ERROR',bytes:Buffer.byteLength(html)});
}

const categoryCounts = unique.reduce((acc,p)=>{
  const key = p === '/' ? '/' : '/' + p.split('/').filter(Boolean)[0];
  acc[key] = (acc[key]||0)+1; return acc;
},{});

const report = {
  generatedAt: new Date().toISOString(),
  sitemapLocCount: locs.length,
  sameDomainCount: urls.length,
  uniquePathCount: unique.length,
  duplicatePathCount: new Set(dupes).size,
  invalidDomainCount: locs.length - urls.length,
  distAppExists: fs.existsSync(path.join(DIST,'app.jsx')),
  dist404Exists: fs.existsSync(path.join(DIST,'404.html')),
  categoryCounts,
  errors,
  rows
};
fs.writeFileSync(path.join(ROOT,'seo-audit-report.json'), JSON.stringify(report,null,2));
console.log(JSON.stringify({
  sitemapLocCount:report.sitemapLocCount,
  uniquePathCount:report.uniquePathCount,
  duplicatePathCount:report.duplicatePathCount,
  errors:errors.length,
  categories:Object.keys(categoryCounts).length,
  app:report.distAppExists,
  notFound:report.dist404Exists
},null,2));
if (errors.length) {
  console.error('SEO audit errors:', errors.slice(0,50));
  process.exitCode=1;
}
