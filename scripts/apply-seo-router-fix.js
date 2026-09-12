const fs = require('fs');
const file = 'index.html';
let s = fs.readFileSync(file, 'utf8');
const old = "  return base ? { path, title:base[0], description:base[1], indexable:true } : { path, indexable:false };";
const replacement = `  if (base) return { path, title:base[0], description:base[1], indexable:true };
  // Any path that reaches the React app has already been validated by the static build/Vercel filesystem.
  // Unknown public requests are served by dist/404.html and never execute this client router.
  const leaf = path === '/' ? 'Río de Janeiro' : seoSlug(path.split('/').filter(Boolean).pop() || 'rio').replace(/-/g, ' ').replace(/\\b\\w/g, c => c.toUpperCase());
  return {
    path,
    title: leaf + ' | Ernestinho Carioca',
    description: 'Guía práctica de ' + leaf + ' en Río de Janeiro con información y recomendaciones de Ernestinho Carioca.',
    indexable:true
  };`;
if (s.includes(replacement)) {
  console.log('SEO indexability patch already applied');
  process.exit(0);
}
if (!s.includes(old)) throw new Error('Expected seoMetaFor fallback not found; refusing to modify index.html');
s = s.replace(old, replacement);
fs.writeFileSync(file, s, 'utf8');
console.log('Applied client SEO indexability patch');
