const fs = require('fs');

const indexFile = 'index.html';
const sitemapFile = 'sitemap.xml';
let html = fs.readFileSync(indexFile, 'utf8');

// 1) Deep gastronomy routes must render the selected restaurant directly.
// The current component always renders the complete 183-item catalog and then
// overlays a modal. Google therefore has to render the entire catalog even for
// /gastronomia/:slug. Replace that behavior with a direct, lightweight detail
// view whenever `seleccionado` is present. The normal /gastronomia catalog is
// unchanged.
const functionStart = 'function GastronomiaCompleta({ onVolver, seleccionado, setSeleccionado }) {';
const start = html.indexOf(functionStart);
if (start < 0) throw new Error('GastronomiaCompleta not found');
const returnAnchor = '\n\n  return (\n    <section className="min-h-screen bg-slate-50 pb-20">';
const returnPos = html.indexOf(returnAnchor, start);
if (returnPos < 0) throw new Error('GastronomiaCompleta return anchor not found');

const directDetailMarker = 'ERNESTINHO_DIRECT_GASTRONOMY_DETAIL';
if (!html.includes(directDetailMarker)) {
  const detail = `

  // ERNESTINHO_DIRECT_GASTRONOMY_DETAIL
  // A deep /gastronomia/:slug route renders only its selected restaurant.
  if (seleccionado) {
    const volverAGastronomia = () => {
      seoNavigate('/gastronomia');
      setSeleccionado(null);
    };
    return (
      <section className="min-h-screen bg-slate-50 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <button
            onClick={volverAGastronomia}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-teal-700 mb-6"
          >
            ← Volver a Gastronomía
          </button>

          <article className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl">
            {seleccionado.img && (
              <div className="h-64 sm:h-[420px] bg-slate-100 overflow-hidden">
                <img
                  src={seleccionado.img}
                  alt={seleccionado.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <span className="text-teal-600 text-xs font-black uppercase tracking-wider">{seleccionado.barrio}</span>
                  <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-1">{seleccionado.nombre}</h1>
                </div>
                <span className="font-black text-xl text-slate-900">{seleccionado.precio}</span>
              </div>

              <p className="text-slate-600 text-base leading-relaxed mt-6">{seleccionado.destaque}</p>

              {Array.isArray(seleccionado.tipos) && seleccionado.tipos.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {seleccionado.tipos.map(t => (
                    <span key={t} className="bg-slate-100 text-slate-600 rounded-full px-3 py-1.5 text-xs font-bold">
                      {TIPOS_GASTRONOMICOS.find(x => x.id === t)?.nombre || t}
                    </span>
                  ))}
                </div>
              )}

              {seleccionado.horario && (
                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-950">
                  🕐 {seleccionado.horario}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {seleccionado.mapa && (
                  <a
                    href={seleccionado.mapa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-4 text-center text-xs font-black uppercase"
                  >
                    Abrir mapa
                  </a>
                )}
                <a
                  href={\`https://wa.me/5521969946938?text=\${encodeURIComponent('Hola Ernestinho, vi ' + seleccionado.nombre + ' en tu guía gastronómica y quiero una recomendación.')}\`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-4 text-center text-xs font-black uppercase"
                >
                  Consultar a Ernestinho
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }`;
  html = html.slice(0, returnPos) + detail + html.slice(returnPos);
}

// 2) Remove three literal placeholder links that currently resolve as broken
// internal /experiencias/TU_LINK_WHATSAPP URLs.
html = html.replace(/href="TU_LINK_WHATSAPP"/g, 'href="https://wa.me/5521969946938"');
fs.writeFileSync(indexFile, html, 'utf8');

// 3) The source sitemap gives every URL the same 2026-09-05 lastmod. There is
// no per-URL modification source in this project, so omit lastmod rather than
// publish a date that cannot be substantiated. This affects build output only
// when the script is run; normal source editing is otherwise untouched.
if (fs.existsSync(sitemapFile)) {
  let sitemap = fs.readFileSync(sitemapFile, 'utf8');
  sitemap = sitemap.replace(/\s*<lastmod>[^<]*<\/lastmod>/g, '');
  fs.writeFileSync(sitemapFile, sitemap, 'utf8');
}

console.log('Applied final SEO fixes: direct gastronomy details, WhatsApp placeholders, truthful sitemap lastmod policy');
