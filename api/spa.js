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
  '/playas': 'Playas de Río de Janeiro | Ernestinho Carioca',
  '/museos': 'Museos de Río de Janeiro | Ernestinho Carioca',
  '/barrios': 'Barrios de Río de Janeiro | Ernestinho Carioca',
  '/gastronomia': 'Gastronomía en Río de Janeiro | Ernestinho Carioca',
  '/experiencias': 'Experiencias en Río de Janeiro | Ernestinho Carioca',
  '/prepara-tu-viaje': 'Prepara tu viaje a Río de Janeiro | Ernestinho Carioca',
  '/vida-nocturna': 'Vida nocturna en Río de Janeiro | Ernestinho Carioca',
  '/que-hacer': 'Qué hacer en Río de Janeiro | Ernestinho Carioca',
  '/guia': 'Guía de viaje a Río de Janeiro | Ernestinho Carioca',
  '/lugares': 'Lugares para conocer en Río de Janeiro | Ernestinho Carioca',
  '/hospedaje': 'Dónde alojarse en Río de Janeiro | Ernestinho Carioca',
  '/eventos': 'Eventos en Río de Janeiro | Ernestinho Carioca',
  '/familia': 'Río de Janeiro con niños y familia | Ernestinho Carioca',
  '/compras': 'Compras en Río de Janeiro | Ernestinho Carioca',
  '/naturaleza': 'Naturaleza en Río de Janeiro | Ernestinho Carioca',
  '/sos': 'Emergencias y ayuda en Río de Janeiro | Ernestinho Carioca',
  '/atracciones': 'Atracciones de Río de Janeiro | Ernestinho Carioca',
  '/aventura': 'Aventura en Río de Janeiro | Ernestinho Carioca',
  '/cafe-ernestinho': 'Café Ernestinho | Guía de Río de Janeiro',
  '/centros-culturales': 'Centros culturales de Río de Janeiro | Ernestinho Carioca',
  '/consejos': 'Consejos para viajar a Río de Janeiro | Ernestinho Carioca',
  '/descubre-rio': 'Descubre Río de Janeiro | Ernestinho Carioca',
  '/espacios-literarios': 'Espacios literarios de Río de Janeiro | Ernestinho Carioca',
  '/fotografia': 'Fotografía en Río de Janeiro | Ernestinho Carioca',
  '/fuertes-fortalezas': 'Fuertes y fortalezas de Río de Janeiro | Ernestinho Carioca',
  '/hola-soy-ernestinho': 'Hola, soy Ernestinho | Guía local de Río de Janeiro',
  '/iglesias': 'Iglesias de Río de Janeiro | Ernestinho Carioca',
  '/ocio': 'Ocio en Río de Janeiro | Ernestinho Carioca',
  '/para-mi': 'Mis lugares y planes en Río de Janeiro | Ernestinho Carioca',
  '/patrimonio': 'Patrimonio de Río de Janeiro | Ernestinho Carioca',
  '/privacidad': 'Política de privacidad | Ernestinho Carioca',
  '/rio-en-vivo': 'Río de Janeiro en vivo | Ernestinho Carioca',
  '/teatros': 'Teatros de Río de Janeiro | Ernestinho Carioca',
  '/tv': 'TV Ernestinho | Videos de Río de Janeiro',
  '/quiero': 'Recorrido por el centro de Río por tu cuenta | Ernestinho Carioca',
  '/guia/rodoviaria-novo-rio-y-terminal-internacional-de-cruceros': 'Rodoviária Novo Rio y terminal de cruceros | Guía de Río',
  '/guia/vacunas-y-fiebre-amarilla-antes-de-viajar-a-brasil': 'Vacunas y fiebre amarilla para viajar a Brasil | Guía de Río',
  '/articulos/preparando-las-maletas-para-rio-clima-ropa-e-imprevistos': 'Qué llevar a Río: clima, ropa e imprevistos | Consejos',
  '/articulos/electricidad-y-adaptadores-en-brasil-enchufes-y-voltaje': 'Enchufes y voltaje en Brasil: adaptadores | Consejos',
  '/articulos/20-errores-que-debes-evitar-si-o-si-en-rio-de-janeiro': '20 errores que debes evitar en Río de Janeiro | Consejos',
  '/museos/museu-da-historia-e-da-cultura-afro-brasileira-muhcab': 'MUHCAB: historia y cultura afrobrasileña | Museos de Río',
  '/guia/consulados-y-ayuda-para-viajeros-extranjeros': 'Consulados y ayuda para extranjeros | Guía de Río',
  '/guia/dinero-en-brasil-reales-tarjetas-y-seguridad': 'Dinero en Brasil: reales, tarjetas y seguridad | Guía de Río'
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
  const sectionNames = {
    gastronomia: 'Gastronomía',
    museos: 'Museos',
    barrios: 'Barrios',
    experiencias: 'Experiencias',
    lugares: 'Qué hacer',
    guia: 'Guía de viaje',
    transportes: 'Transporte',
    articulos: 'Consejos'
  };
  const sectionDescriptions = {
    gastronomia: `${leaf}: qué pedir, ambiente, cómo llegar y consejos prácticos para comer en Río de Janeiro con Ernestinho Carioca.`,
    museos: `${leaf}: guía práctica con información para la visita, cómo llegar y qué combinar cerca en Río de Janeiro.`,
    barrios: `${leaf}: guía del barrio con qué ver, cómo moverse, seguridad, transporte y recomendaciones para conocer Río de Janeiro.`,
    experiencias: `${leaf}: guía de la experiencia, qué esperar, información práctica y consejos para disfrutar Río de Janeiro.`,
    lugares: `${leaf}: qué ver, cómo llegar, información práctica y recomendaciones para incluirlo en tu viaje a Río de Janeiro.`,
    guia: `${leaf}: información práctica y consejos actualizados para preparar tu viaje a Río de Janeiro.`,
    transportes: `${leaf}: cómo usarlo, consejos prácticos y lo que necesitas saber para moverte por Río de Janeiro.`,
    articulos: `${leaf}: guía y consejos de Ernestinho Carioca para preparar mejor tu viaje a Río de Janeiro.`
  };
  const hubDescriptions = {
    '/transportes': 'Cómo moverse por Río de Janeiro: metro, VLT, BRT, buses, apps y consejos prácticos para elegir el transporte durante tu viaje.',
    '/copacabana': 'Guía de Copacabana con playa, qué ver, transporte, seguridad, restaurantes y consejos prácticos para disfrutar el barrio.',
    '/playas': 'Guía de las playas de Río de Janeiro: cuáles conocer, cómo llegar, qué esperar y consejos para elegir la mejor según tu plan.',
    '/museos': 'Museos de Río de Janeiro: descubre opciones de arte, historia, ciencia y cultura con información práctica para organizar tu visita.',
    '/barrios': 'Guía de barrios de Río de Janeiro: qué ver, ambiente, transporte y consejos para elegir dónde ir y dónde alojarte.',
    '/gastronomia': 'Dónde comer en Río de Janeiro: restaurantes, cafés, comida brasileña y recomendaciones por barrio, momento y tipo de experiencia.',
    '/experiencias': 'Experiencias en Río de Janeiro: actividades, paseos y planes para vivir la ciudad con información práctica y consejos de Ernestinho.',
    '/prepara-tu-viaje': 'Prepara tu viaje a Río de Janeiro con información práctica sobre documentos, salud, internet, transporte, seguridad y alojamiento.',
    '/vida-nocturna': 'Vida nocturna en Río de Janeiro: zonas, bares, samba y planes para salir de noche con consejos prácticos para organizarte.',
    '/que-hacer': 'Qué hacer en Río de Janeiro: lugares, cultura, playas, naturaleza, actividades y planes para organizar cada día de tu viaje.',
    '/guia': 'Guía práctica para viajar a Río de Janeiro: documentos, salud, internet, transporte, alojamiento, seguridad y ayuda para tu viaje.',
    '/lugares': 'Lugares para conocer en Río de Janeiro: atracciones, miradores, patrimonio y rincones de la ciudad con consejos para organizar la visita.',
    '/hospedaje': 'Dónde alojarse en Río de Janeiro: guía para elegir zona y hospedaje según tu viaje, con opciones y consejos desde Copacabana.',
    '/eventos': 'Eventos en Río de Janeiro: agenda y planes para descubrir qué está pasando en la ciudad y organizar tu visita.',
    '/familia': 'Río de Janeiro con niños y familia: actividades, lugares y planes para disfrutar la ciudad con información práctica.',
    '/compras': 'Compras en Río de Janeiro: shoppings, ferias y mercados populares con información para elegir dónde comprar durante tu viaje.',
    '/naturaleza': 'Naturaleza en Río de Janeiro: parques, senderos, miradores y espacios al aire libre para descubrir el lado verde de la ciudad.',
    '/sos': 'Ayuda y emergencias en Río de Janeiro: información práctica y contactos útiles para resolver situaciones durante tu viaje.',
    '/atracciones': 'Atracciones de Río de Janeiro: lugares y experiencias para conocer la ciudad con información práctica para organizar tu visita.',
    '/aventura': 'Aventura en Río de Janeiro: actividades al aire libre y experiencias para descubrir la ciudad desde otra perspectiva.',
    '/cafe-ernestinho': 'Café Ernestinho: un espacio de la guía para descubrir recomendaciones, historias y experiencias de Río de Janeiro.',
    '/centros-culturales': 'Centros culturales de Río de Janeiro: espacios de arte, historia y programación para sumar cultura a tu recorrido por la ciudad.',
    '/consejos': 'Consejos para viajar a Río de Janeiro: información práctica para organizarte, evitar errores y disfrutar mejor la ciudad.',
    '/descubre-rio': 'Descubre Río de Janeiro con lugares, barrios, cultura y experiencias para armar un recorrido según tu forma de viajar.',
    '/espacios-literarios': 'Espacios literarios de Río de Janeiro: bibliotecas, cultura y lugares vinculados a los libros para descubrir en la ciudad.',
    '/fotografia': 'Fotografía en Río de Janeiro: lugares, paisajes y experiencias para guardar imágenes especiales de tu viaje por la ciudad.',
    '/fuertes-fortalezas': 'Fuertes y fortalezas de Río de Janeiro: historia, patrimonio, vistas e información práctica para organizar cada visita.',
    '/hola-soy-ernestinho': 'Conoce a Ernestinho Carioca y la historia detrás de esta guía de Río de Janeiro creada desde la experiencia en la ciudad.',
    '/iglesias': 'Iglesias de Río de Janeiro: arquitectura, historia, patrimonio y espacios religiosos para conocer durante tu recorrido.',
    '/ocio': 'Planes de ocio en Río de Janeiro: ideas y lugares para disfrutar el tiempo libre y descubrir distintas caras de la ciudad.',
    '/para-mi': 'Guarda y organiza tus lugares y planes favoritos de Río de Janeiro para tenerlos a mano durante tu viaje.',
    '/patrimonio': 'Patrimonio de Río de Janeiro: lugares históricos, arquitectura y espacios culturales para entender mejor la historia de la ciudad.',
    '/privacidad': 'Política de privacidad de Ernestinho Carioca e información sobre el tratamiento de datos al utilizar este sitio web.',
    '/quiero': 'Recorrido por el centro y la zona portuaria de Río de Janeiro para hacerlo por tu cuenta, con paradas e información práctica.',
    '/rio-en-vivo': 'Río de Janeiro en vivo: información y recursos para acompañar lo que ocurre en la ciudad y ayudarte a organizar tus planes.',
    '/teatros': 'Teatros de Río de Janeiro: salas, cultura y espacios escénicos para descubrir la programación teatral de la ciudad.',
    '/tv': 'TV Ernestinho: videos y contenidos para conocer Río de Janeiro, descubrir lugares y preparar mejor tu viaje.'
  };
  const description = hubDescriptions[clean] || sectionDescriptions[root] ||
    `Guía práctica de ${leaf} en Río de Janeiro: información, consejos y recomendaciones de Ernestinho Carioca para viajeros.`;
  return {
    title: MAIN_TITLES[clean] || (parts.length > 1 ? `${leaf} | ${sectionNames[root] || section} en Río` : `${leaf} | Río de Janeiro | Ernestinho Carioca`),
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

function ogTypeFor(pathname) {
  const root = pathname.split('/').filter(Boolean)[0] || '';
  return root === 'articulos' ? 'article' : 'website';
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
      inLanguage: 'es',
      publisher: {'@id': SITE + '/#organization'}
    },
    {
      '@type': 'Organization',
      '@id': SITE + '/#organization',
      name: 'Ernestinho Carioca',
      url: SITE + '/',
      logo: {'@type':'ImageObject','url':DEFAULT_OG_IMAGE}
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
      const isCurrent = i === parts.length - 1;
      if (isCurrent || validPaths.has(acc)) {
        items.push({'@type':'ListItem',position:items.length+1,name:humanize(p),item:SITE+acc});
      }
    });
    graph.push({'@type':'BreadcrumbList','@id':seo.canonical+'#breadcrumb',itemListElement:items});
  }
  if (parts[0] === 'museos' && parts.length > 1) {
    graph.push({'@type':'Museum','@id':seo.canonical+'#place',name:leaf,url:seo.canonical,image:seo.image});
  } else if (parts[0] === 'lugares' && parts.length > 1) {
    graph.push({'@type':'TouristAttraction','@id':seo.canonical+'#place',name:leaf,url:seo.canonical,image:seo.image});
  } else if (parts[0] === 'barrios' && parts.length > 1) {
    graph.push({'@type':'Place','@id':seo.canonical+'#place',name:leaf,url:seo.canonical,image:seo.image});
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
  out = out.replace(/<meta\s+[^>]*property=["']og:(?:type|site_name|locale|title|description|url|image(?::(?:width|height|alt))?)["'][^>]*>/ig, '');
  out = out.replace(/<meta\s+[^>]*name=["']twitter:(?:card|title|description|image(?::alt)?)["'][^>]*>/ig, '');
  out = out.replace(/<script\s+[^>]*id=["']ec-route-schema["'][^>]*>[\s\S]*?<\/script>/ig, '');
  const tags = `
<link rel="canonical" href="${escapeAttr(seo.canonical)}">
<meta name="description" content="${escapeAttr(seo.description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:type" content="${ogTypeFor(pathname)}">
<meta property="og:site_name" content="Ernestinho Carioca">
<meta property="og:locale" content="es_ES">
<meta property="og:title" content="${escapeAttr(seo.title)}">
<meta property="og:description" content="${escapeAttr(seo.description)}">
<meta property="og:url" content="${escapeAttr(seo.canonical)}">
<meta property="og:image" content="${escapeAttr(seo.image)}">\n<meta property="og:image:alt" content="${escapeAttr(seo.title)}">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeAttr(seo.title)}">
<meta name="twitter:description" content="${escapeAttr(seo.description)}">
<meta name="twitter:image" content="${escapeAttr(seo.image)}">\n<meta name="twitter:image:alt" content="${escapeAttr(seo.title)}">
<script type="application/ld+json" id="ec-route-schema">${schemaFor(pathname,seo)}</script>${analyticsTags()}`;
  out = out.replace(/<\/head>/i, `${tags}\n</head>`);
  return out;
}

function normalizePath(raw) {
  let pathname = raw || '/';
  try { pathname = decodeURIComponent(pathname); } catch (_) {}
  if (!pathname.startsWith('/')) pathname = '/' + pathname;
  pathname = pathname.replace(/\/{2,}/g, '/');
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
    res.setHeader('X-Robots-Tag', 'index, follow, max-image-preview:large');
    res.setHeader('Link', '<' + seo.canonical + '>; rel="canonical"');
    return sendCompressedHtml(req, res, html);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.end('Error interno');
  }
};
