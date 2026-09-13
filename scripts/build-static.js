const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'dist');
const DOMAIN = 'https://www.ernestinhocarioca.com.br';
const GA_ID = 'G-QE1X83D419';

// Apply the router/indexability correction that was validated against all 498 sitemap routes.


const MAIN_TITLES = {
  '/transportes': 'Cómo moverse por Río de Janeiro | Ernestinho Carioca',
  '/copacabana': 'Guía de Copacabana: qué ver, playa y consejos | Ernestinho Carioca',
  '/eventos/carnaval-de-rio': 'Carnaval de Río de Janeiro: guía completa | Ernestinho Carioca',
  '/playas': 'Playas de Río de Janeiro | Ernestinho Carioca',
  '/museos': 'Museos de Río de Janeiro | Ernestinho Carioca',
  '/barrios': 'Barrios de Río de Janeiro | Ernestinho Carioca',
  '/gastronomia': 'Gastronomía en Río de Janeiro | Ernestinho Carioca',
  '/experiencias': 'Experiencias en Río de Janeiro | Ernestinho Carioca',
  '/prepara-tu-viaje': 'Prepara tu viaje a Río de Janeiro | Ernestinho Carioca',
  '/vida-nocturna': 'Vida nocturna en Río de Janeiro | Ernestinho Carioca'
};

function escapeAttr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function humanize(segment) {
  let value = segment || '';
  try { value = decodeURIComponent(value); } catch (_) {}
  return value.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
function normalizeRoute(route) {
  let value = route || '/';
  if (!value.startsWith('/')) value = '/' + value;
  if (value.length > 1) value = value.replace(/\/$/, '');
  return value;
}
function seoFor(route) {
  const clean = normalizeRoute(route);
  if (clean === '/') return {
    title: 'Ernestinho Carioca | Guía completa de Río de Janeiro',
    description: 'Guía de Río de Janeiro en español con playas, barrios, transporte, cultura, gastronomía, consejos y experiencias.',
    canonical: DOMAIN + '/'
  };
  const parts = clean.split('/').filter(Boolean);
  const leaf = humanize(parts[parts.length - 1]);
  const section = parts.length > 1 ? humanize(parts[0]) : '';
  return {
    title: MAIN_TITLES[clean] || `${leaf}${section ? ` — ${section}` : ''} | Ernestinho Carioca`,
    description: `Guía práctica de ${leaf} en Río de Janeiro: información, consejos y recomendaciones de Ernestinho Carioca para viajeros.`,
    canonical: DOMAIN + clean
  };
}
function analyticsTags() {
  return `\n<!-- Google Analytics 4 -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>\n<script>\nwindow.dataLayer=window.dataLayer||[];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js',new Date());\ngtag('config','${GA_ID}',{send_page_view:true});\n(function(){var last=location.pathname+location.search;function track(){var current=location.pathname+location.search;if(current===last)return;last=current;gtag('event','page_view',{page_title:document.title,page_location:location.href,page_path:current});}var push=history.pushState;history.pushState=function(){var r=push.apply(this,arguments);setTimeout(track,0);return r;};var replace=history.replaceState;history.replaceState=function(){var r=replace.apply(this,arguments);setTimeout(track,0);return r;};addEventListener('popstate',function(){setTimeout(track,0);});})();\n</script>`;
}
function injectSeo(shell, route) {
  const seo = seoFor(route);
  let out = shell;
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(seo.title)}</title>`);
  out = out.replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>/ig, '');
  out = out.replace(/<meta\s+[^>]*name=["']description["'][^>]*>/ig, '');
  out = out.replace(/<meta\s+[^>]*name=["']robots["'][^>]*>/ig, '');
  out = out.replace(/<meta\s+[^>]*property=["']og:(?:title|description|url)["'][^>]*>/ig, '');
  const tags = `\n<link rel="canonical" href="${escapeAttr(seo.canonical)}">\n<meta name="description" content="${escapeAttr(seo.description)}">\n<meta name="robots" content="index, follow">\n<meta property="og:title" content="${escapeAttr(seo.title)}">\n<meta property="og:description" content="${escapeAttr(seo.description)}">\n<meta property="og:url" content="${escapeAttr(seo.canonical)}">${analyticsTags()}`;
  return out.replace(/<\/head>/i, `${tags}\n</head>`);
}
function routeToFile(route) {
  const clean = normalizeRoute(route);
  if (clean === '/') return path.join(OUT, 'index.html');
  return path.join(OUT, clean.replace(/^\//, '') + '.html');
}
function copyIfExists(name) {
  const src = path.join(ROOT, name);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(OUT, name));
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const source = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const marker = '<script type="text/babel">';
const start = source.indexOf(marker);
if (start === -1) throw new Error('No se encontró el script principal type="text/babel" en index.html');
const codeStart = start + marker.length;
const end = source.indexOf('</script>', codeStart);
if (end === -1) throw new Error('No se encontró el cierre del script principal en index.html');

const appCode = source.slice(codeStart, end);
const compiled = esbuild.transformSync(appCode, {
  loader: 'jsx',
  target: 'es2018',
  minify: true,
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  legalComments: 'none'
}).code;

let shell = source.slice(0, start) + '<script src="/app.js"></script>' + source.slice(end + '</script>'.length);
// Babel is no longer needed in the browser: JSX is compiled once during the build.
shell = shell.replace(/\s*<script\s+src=["']https:\/\/unpkg\.com\/@babel\/standalone\/babel\.min\.js["']><\/script>/i, '');
fs.writeFileSync(path.join(OUT, 'app.js'), compiled, 'utf8');

const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const routes = new Set(['/','/quiero','/ruta-centro','/recorrido-centro']);
const re = /<loc>https:\/\/www\.ernestinhocarioca\.com\.br([^<]*)<\/loc>/g;
let match;
while ((match = re.exec(sitemap))) routes.add(normalizeRoute(match[1] || '/'));

for (const route of routes) {
  const file = routeToFile(route);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, injectSeo(shell, route), 'utf8');
}
copyIfExists('robots.txt');
copyIfExists('sitemap.xml');
copyIfExists('google9b0defc9c5a5ee7e.html');

const notFound = '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>Página no encontrada | Ernestinho Carioca</title></head><body><h1>Página no encontrada</h1><p><a href="/">Volver a Ernestinho Carioca</a></p></body></html>';
fs.writeFileSync(path.join(OUT, '404.html'), notFound, 'utf8');

console.log(`Static build complete: ${routes.size} routes, compiled app.js ${(Buffer.byteLength(compiled) / 1024 / 1024).toFixed(2)} MB (source ${(Buffer.byteLength(appCode) / 1024 / 1024).toFixed(2)} MB)`);
