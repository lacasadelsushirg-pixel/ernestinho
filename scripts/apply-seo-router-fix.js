const fs = require('fs');
const file = 'index.html';
let s = fs.readFileSync(file, 'utf8');

const deepRootsCode = `[\n    'centros-culturales','espacios-literarios','eventos','experiencias',\n    'fuertes-fortalezas','iglesias','teatros','playas','vida-nocturna','compras'\n  ]`;

// 1) Any valid deep sitemap route that is not handled by a dedicated entity resolver
// must still resolve to the same React section as its category landing page.
const resolveAnchor = "  const preferred = SEO_ROUTE_PREFERRED_SECTION[ruta];";
const resolveInsert = `  const seoDeepRoots = ${deepRootsCode};\n  const seoDeepRoot = seoDeepRoots.find(prefix => ruta.startsWith('/' + prefix + '/'));\n  if (seoDeepRoot) {\n    const rootPath = '/' + seoDeepRoot;\n    const deepSection = SEO_ROUTE_PREFERRED_SECTION[rootPath] || Object.keys(SEO_SECTION_ROUTES).find(key => SEO_SECTION_ROUTES[key] === rootPath);\n    if (deepSection) return { ...result, seccion:deepSection };\n  }\n\n${resolveAnchor}`;
if (!s.includes('const seoDeepRoots =')) {
  if (!s.includes(resolveAnchor)) throw new Error('Expected seoResolveRoute anchor not found');
  s = s.replace(resolveAnchor, resolveInsert);
}

// 2) When React hydrates one of those deep routes, keep the browser URL/canonical
// instead of collapsing it back to the category root or homepage.
const currentAnchor = "function seoCurrentPath(section, museoId, barrio, restaurante, articulo, temaGuia, consejoId) {";
const currentInsert = `${currentAnchor}\n  const seoActualDeep = seoCleanPath(window.location.pathname);\n  if (seoActualDeep === '/experiencias/rapel') return seoActualDeep;\n  const seoDeepRootsCurrent = ${deepRootsCode};\n  const seoDeepRootCurrent = seoDeepRootsCurrent.find(prefix => seoActualDeep.startsWith('/' + prefix + '/'));\n  if (seoDeepRootCurrent) {\n    const rootPath = '/' + seoDeepRootCurrent;\n    const expectedSection = SEO_ROUTE_PREFERRED_SECTION[rootPath] || Object.keys(SEO_SECTION_ROUTES).find(key => SEO_SECTION_ROUTES[key] === rootPath);\n    if (expectedSection && expectedSection === section) return seoActualDeep;\n  }`;
if (!s.includes("seoActualDeep === '/experiencias/rapel'")) {
  if (s.includes('const seoActualDeep = seoCleanPath(window.location.pathname);')) {
    s = s.replace('  const seoActualDeep = seoCleanPath(window.location.pathname);', "  const seoActualDeep = seoCleanPath(window.location.pathname);\n  if (seoActualDeep === '/experiencias/rapel') return seoActualDeep;");
  } else {
    if (!s.includes(currentAnchor)) throw new Error('Expected seoCurrentPath anchor not found');
    s = s.replace(currentAnchor, currentInsert);
  }
}

// 3) All files emitted by the static build are valid public URLs. If a route reaches
// React after the filesystem check, keep it indexable even when it has no bespoke label.
const old = "  return base ? { path, title:base[0], description:base[1], indexable:true } : { path, indexable:false };";
const replacement = `  if (base) return { path, title:base[0], description:base[1], indexable:true };\n  // Any path that reaches the React app has already been validated by the static build/Vercel filesystem.\n  // Unknown public requests are served by dist/404.html and never execute this client router.\n  const leaf = path === '/' ? 'Río de Janeiro' : seoSlug(path.split('/').filter(Boolean).pop() || 'rio').replace(/-/g, ' ').replace(/\\b\\w/g, c => c.toUpperCase());\n  return {\n    path,\n    title: leaf + ' | Ernestinho Carioca',\n    description: 'Guía práctica de ' + leaf + ' en Río de Janeiro con información y recomendaciones de Ernestinho Carioca.',\n    indexable:true\n  };`;
if (!s.includes('Any path that reaches the React app has already been validated')) {
  if (!s.includes(old)) throw new Error('Expected seoMetaFor fallback not found');
  s = s.replace(old, replacement);
}

fs.writeFileSync(file, s, 'utf8');
console.log('Applied deep-route preservation and client SEO indexability patch');
