const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = process.cwd();
const GA_ID = 'G-QE1X83D419';
const SITE = 'https://www.ernestinhocarioca.com.br';
const DEFAULT_OG_IMAGE = 'https://res.cloudinary.com/qa301cbc/image/upload/v1789747716/ChatGPT_Image_18_sept_2026_01_08_08_p.m..png';
let indexHtml = null;
let validPaths = null;

function load() {
  if (!indexHtml) indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  if (!validPaths) {
    const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
    validPaths = new Set(['/quiero']);
    const re = /<loc>https:\/\/www\.ernestinhocarioca\.com\.br([^<]*)<\/loc>/g;
    let m;
    while ((m = re.exec(sitemap))) {
      let p = m[1] || '/';
      if (p.length > 1) p = p.replace(/\/$/, '');
      validPaths.add(p);
    }
  }
}

function humanize(segment) {
  return decodeURIComponent(segment || '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

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

function seoFor(urlPath) {
  const clean = urlPath === '/' ? '/' : urlPath.replace(/\/$/, '');
  if (clean === '/') return {
    title: 'Ernestinho Carioca | Guía completa de Río de Janeiro',
    description: 'Guía de Río de Janeiro en español: qué hacer, barrios, playas, museos, restaurantes, transporte, consejos y experiencias para organizar tu viaje.',
    canonical: SITE + '/',
    image: DEFAULT_OG_IMAGE
  };
  const parts = clean.split('/').filter(Boolean);
  const leaf = humanize(parts[parts.length - 1]);
  const root = parts[0] || '';
  const section = parts.length > 1 ? humanize(root) : '';
  const sectionDescriptions = {
    gastronomia: `${leaf}: información práctica, qué pedir, ambiente, cómo llegar y consejos para comer en Río de Janeiro con la guía de Ernestinho Carioca.`,
    museos: `${leaf}: guía práctica con información para la visita, cómo llegar y qué combinar cerca en Río de Janeiro.`,
    barrios: `${leaf}: guía del barrio con qué ver, cómo moverse, seguridad, transporte y recomendaciones para conocer Río de Janeiro.`,
    experiencias: `${leaf}: guía de la experiencia, qué esperar, información práctica y consejos para disfrutar Río de Janeiro.`,
    lugares: `${leaf}: qué ver, cómo llegar, información práctica y recomendaciones para incluirlo en tu viaje a Río de Janeiro.`,
    guia: `${leaf}: información práctica y consejos actualizados para preparar tu viaje a Río de Janeiro.`,
    transportes: `${leaf}: cómo usarlo, consejos prácticos y lo que necesitas saber para moverte por Río de Janeiro.`,
    articulos: `${leaf}: guía y consejos de Ernestinho Carioca para preparar mejor tu viaje a Río de Janeiro.`
  };
  const description = sectionDescriptions[root] ||
    `Guía práctica de ${leaf} en Río de Janeiro: información, consejos y recomendaciones de Ernestinho Carioca para viajeros.`;
  return {
    title: MAIN_TITLES[clean] || `${leaf}${section ? ` — ${section}` : ''} | Ernestinho Carioca`,
    description,
    canonical: SITE + clean,
    image: DEFAULT_OG_IMAGE
  };
}

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function analyticsTags() {
  return `\n<!-- Google Analytics 4 -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>\n<script>\nwindow.dataLayer=window.dataLayer||[];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js',new Date());\ngtag('config','${GA_ID}',{send_page_view:true});\n(function(){\n  var last=location.pathname+location.search;\n  function track(){\n    var current=location.pathname+location.search;\n    if(current===last)return;\n    last=current;\n    gtag('event','page_view',{page_title:document.title,page_location:location.href,page_path:current});\n  }\n  var push=history.pushState;\n  history.pushState=function(){var r=push.apply(this,arguments);setTimeout(track,0);return r;};\n  var replace=history.replaceState;\n  history.replaceState=function(){var r=replace.apply(this,arguments);setTimeout(track,0);return r;};\n  addEventListener('popstate',function(){setTimeout(track,0);});\n})();\n</script>`;
}

function schemaFor(pathname, seo) {
  const parts = pathname.split('/').filter(Boolean);
  const leaf = parts.length ? humanize(parts[parts.length - 1]) : 'Ernestinho Carioca';
  const graph = [
    {
      '@type': 'WebSite',
      '@id': SITE + '/#website',
      url: SITE + '/',
      name: 'Ernestinho Carioca',
      inLanguage: 'es'
    },
    {
      '@type': 'WebPage',
      '@id': seo.canonical + '#webpage',
      url: seo.canonical,
      name: seo.title,
      description: seo.description,
      isPartOf: {'@id': SITE + '/#website'},
      inLanguage: 'es',
      primaryImageOfPage: {'@type':'ImageObject','url':seo.image}
    }
  ];
  if (pathname !== '/') {
    const items=[{'@type':'ListItem',position:1,name:'Inicio',item:SITE+'/'}];
    let acc='';
    parts.forEach((p,i)=>{
      acc += '/' + p;
      items.push({'@type':'ListItem',position:i+2,name:humanize(p),item:SITE+acc});
    });
    graph.push({'@type':'BreadcrumbList','@id':seo.canonical+'#breadcrumb',itemListElement:items});
  }
  if (parts[0] === 'gastronomia' && parts.length > 1) {
    graph.push({'@type':'Restaurant','@id':seo.canonical+'#place',name:leaf,url:seo.canonical,image:seo.image});
  } else if (['museos','lugares','barrios'].includes(parts[0]) && parts.length > 1) {
    graph.push({'@type':'TouristAttraction','@id':seo.canonical+'#place',name:leaf,url:seo.canonical,image:seo.image});
  } else if (parts[0] === 'articulos' && parts.length > 1) {
    graph.push({'@type':'Article','@id':seo.canonical+'#article',headline:leaf,url:seo.canonical,inLanguage:'es'});
  }
  return JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c');
}

function applySeo(html, seo, pathname) {
  let out = html;
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(seo.title)}</title>`);
  out = out.replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>/ig, '');
  out = out.replace(/<meta\s+[^>]*name=["']description["'][^>]*>/ig, '');
  out = out.replace(/<meta\s+[^>]*name=["']robots["'][^>]*>/ig, '');
  out = out.replace(/<meta\s+[^>]*property=["']og:(?:title|description|url|image)["'][^>]*>/ig, '');
  out = out.replace(/<meta\s+[^>]*name=["']twitter:(?:card|title|description|image)["'][^>]*>/ig, '');
  out = out.replace(/<script\s+[^>]*id=["']ec-route-schema["'][^>]*>[\s\S]*?<\/script>/ig, '');
  const tags = `
<link rel="canonical" href="${escapeAttr(seo.canonical)}">
<meta name="description" content="${escapeAttr(seo.description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Ernestinho Carioca">
<meta property="og:locale" content="es_ES">
<meta property="og:title" content="${escapeAttr(seo.title)}">
<meta property="og:description" content="${escapeAttr(seo.description)}">
<meta property="og:url" content="${escapeAttr(seo.canonical)}">
<meta property="og:image" content="${escapeAttr(seo.image)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeAttr(seo.title)}">
<meta name="twitter:description" content="${escapeAttr(seo.description)}">
<meta name="twitter:image" content="${escapeAttr(seo.image)}">
<script type="application/ld+json" id="ec-route-schema">${schemaFor(pathname,seo)}</script>${analyticsTags()}`;
  return out.replace(/<\/head>/i, `${tags}\n</head>`);
}

function normalizePath(raw) {
  let pathname = raw || '/';
  try { pathname = decodeURIComponent(pathname); } catch (_) {}
  if (!pathname.startsWith('/')) pathname = '/' + pathname;
  if (pathname.length > 1) pathname = pathname.replace(/\/$/, '');
  return pathname;
}

function originalPath(req) {
  const q = req.query && req.query.path;
  if (typeof q === 'string' && q) return normalizePath(q);
  if (Array.isArray(q) && q[0]) return normalizePath(q[0]);
  const u = new URL(req.url, 'https://www.ernestinhocarioca.com.br');
  return normalizePath(u.pathname);
}

function sendCompressedHtml(req, res, html) {
  const plain = Buffer.from(html, 'utf8');
  const accept = String((req.headers && req.headers['accept-encoding']) || '');
  res.setHeader('Vary', 'Accept-Encoding');

  if (/\bbr\b/i.test(accept)) {
    const body = zlib.brotliCompressSync(plain, {
      params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 }
    });
    res.setHeader('Content-Encoding', 'br');
    res.setHeader('Content-Length', String(body.length));
    if (req.method === 'HEAD') return res.end();
    return res.end(body);
  }

  if (/\bgzip\b/i.test(accept)) {
    const body = zlib.gzipSync(plain, { level: 6 });
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Length', String(body.length));
    if (req.method === 'HEAD') return res.end();
    return res.end(body);
  }

  // Fallback for clients that do not advertise compression.
  // Search engines and modern browsers advertise gzip/br; keeping this
  // fallback preserves HTTP compatibility for uncommon clients.
  res.setHeader('Content-Length', String(plain.length));
  if (req.method === 'HEAD') return res.end();
  return res.end(plain);
}

module.exports = (req, res) => {
  try {
    load();
    let pathname = originalPath(req);
    if (pathname === '/ruta-centro' || pathname === '/recorrido-centro') {
      res.statusCode = 308;
      res.setHeader('Location', '/quiero');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.end();
    }

    if (!validPaths.has(pathname)) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
      const notFound = '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>Página no encontrada | Ernestinho Carioca</title></head><body><h1>Página no encontrada</h1><p><a href="/">Volver a Ernestinho Carioca</a></p></body></html>';
      if (req.method === 'HEAD') return res.end();
      return res.end(notFound);
    }

    const seo = seoFor(pathname);
    const html = applySeo(indexHtml, seo, pathname);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400');
    res.setHeader('X-Ernestinho-Route', pathname);
    return sendCompressedHtml(req, res, html);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.end('Error interno');
  }
};
