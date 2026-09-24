function GastronomiaAfinada({ onVolver, initialSel = null }) {
    const [sel, setSel] = useState(initialSel);
    const [q, setQ] = useState('');
    const [plan, setPlan] = useState('todos');
    const planes = [
        ['todos', 'Todos'], ['almuerzo', 'Almuerzo'], ['cena', 'Cena'], ['cafe', 'Café y desayuno'], ['economico', 'Económico'], ['experiencia', 'Especiales']
    ];
    const consulta = normalizarGastroNueva(q);
    const intencion = intencionGastroNueva(q);
    const [gastroCards, setGastroCards] = useState(() => window.GASTRONOMIA_NUEVAS_CARDS || []);
    React.useEffect(() => { let active=true; const ready=window.__ecGastronomyReady||Promise.resolve(); ready.then(()=>{if(active)setGastroCards([...(window.GASTRONOMIA_NUEVAS_CARDS||[])]);}).catch(e=>console.error('EC gastronomy catalog',e)); return()=>{active=false}; }, []);
    const [detailHtml, setDetailHtml] = useState('');
    React.useEffect(() => { let active = true; setDetailHtml(''); if (!sel) return () => { active = false; }; fetch('/data/gastronomia/fichas/' + sel + '.json', { cache: 'force-cache' }).then(r => { if (!r.ok) throw Error('Gastronomía ' + r.status); return r.json(); }).then(x => { if (active) setDetailHtml(x.html || ''); }).catch(e => { console.error('EC gastronomy detail', e); if (active) setDetailHtml('<div class="card"><h2>No pude cargar esta ficha</h2><p>Vuelve a intentarlo.</p></div>'); }); return () => { active = false; }; }, [sel]);
    const patrones = window.PATRONES_GASTRONOMIA || {};
    const testPatron = (id, corpus) => { const p = patrones[id]; return p && typeof p.test === 'function' ? p.test(corpus) : corpus.includes(id || ''); };
    const shown = gastroCards.filter(card => {
        const corpus = GASTRONOMIA_INDICE_BUSQUEDA.get(card.id) || '';
        const coincidePlan = plan === 'todos' || testPatron(plan, corpus);
        const coincideConsulta = !consulta || (intencion ? testPatron(intencion, corpus) : corpus.includes(consulta));
        return coincidePlan && coincideConsulta;
    });
    return React.createElement('section', { className: 'min-h-screen bg-slate-950 text-white pb-20' },
        React.createElement('style', null, `.gastronomia-card-media{height:240px;aspect-ratio:16/10;overflow:hidden;background:#071313}.gastronomia-card-media img{width:100%;height:100%;display:block;object-fit:cover;object-position:center}.gastronomia-card-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}.gastronomia-card-tag{font:700 11px Arial;color:#e7b85c;border:1px solid #e7b85c88;border-radius:99px;padding:4px 8px}.gastro-plan{white-space:nowrap}@media(max-width:640px){.gastronomia-card-media{height:190px}}`),
        !sel ? React.createElement(React.Fragment, null,
            React.createElement('div', { className: 'bg-slate-950 text-white px-4 sm:px-6 py-16' },
                React.createElement('div', { className: 'max-w-7xl mx-auto' },
                    React.createElement('button', { onClick: () => { onVolver(); window.scrollTo({ top: 0, behavior: 'smooth' }); }, className: 'mb-8 text-white/80 hover:text-amber-400 font-bold' }, '← Volver a Qué hacer'),
                    React.createElement('span', { className: 'block text-amber-400 text-xs font-black uppercase tracking-[.25em]' }, 'Sabores desde mi mirada'),
                    React.createElement('h1', { className: 'text-4xl sm:text-6xl font-black uppercase leading-none mt-3' }, 'Dónde comer en Río de Janeiro'),
                    React.createElement('p', { className: 'mt-5 max-w-3xl text-slate-200' }, 'Busca por restaurante, barrio, tipo de cocina o momento del día.'),
                    React.createElement('input', { value: q, onChange: e => setQ(e.target.value), placeholder: 'Prueba: almuerzo, sushi, barato, con vista...', className: 'mt-8 rounded-full px-5 py-3 text-slate-900 w-full sm:w-[34rem]' }),
                    React.createElement('div', { className: 'mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-2' }, planes.map(([id, nombre]) => React.createElement('button', { key: id, type: 'button', onClick: () => setPlan(id), className: `gastro-plan rounded-full px-4 py-2 text-xs font-black border transition ${plan === id ? 'bg-amber-400 text-slate-950 border-amber-400' : 'border-white/25 text-white hover:border-amber-400'}` }, nombre))),
                    React.createElement('div', { className: 'mt-4 flex flex-wrap items-center gap-4' },
                        React.createElement('span', { className: 'text-sm font-bold text-slate-300' }, shown.length, shown.length === 1 ? ' lugar encontrado' : ' lugares encontrados'),
                        (q || plan !== 'todos') && React.createElement('button', { type: 'button', onClick: () => { setQ(''); setPlan('todos'); }, className: 'text-xs font-black uppercase text-amber-400' }, 'Limpiar búsqueda')))),
            React.createElement('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' }, shown.map(card => React.createElement('a', { key: card.id, href: '/gastronomia/' + seoSlug(card.title), onClick: (ev) => { if (!(ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey)) { ev.preventDefault(); seoNavigate('/gastronomia/' + seoSlug(card.title)); setSel(card.id); } }, className: 'block text-left rounded-3xl overflow-hidden bg-teal-900  hover:shadow-amber-400/20 transition' },
                React.createElement('div', { className: 'gastronomia-card-media' }, React.createElement('img', { src: card.img, alt: `${card.title} — fachada o imagen principal`, loading: 'lazy' })),
                React.createElement('div', { className: 'p-5' }, React.createElement('div', { className: 'font-black text-xl' }, card.title), React.createElement('div', { className: 'gastronomia-card-tags' }, (card.tags || []).slice(0, 3).map(t => React.createElement('span', { key: t, className: 'gastronomia-card-tag' }, t))))))),
            shown.length === 0 && React.createElement('div', { className: 'max-w-3xl mx-auto px-4 text-center py-14' }, React.createElement('h2', { className: 'text-2xl font-black' }, 'No encontramos coincidencias'), React.createElement('p', { className: 'text-slate-400 mt-2' }, 'Prueba otra palabra o limpia la búsqueda.')))
            : React.createElement('div', { className: 'max-w-5xl mx-auto px-4 sm:px-6 py-8' },
                React.createElement('button', { onClick: () => { seoNavigate('/gastronomia'); setSel(null); }, className: 'mb-5 rounded-full bg-amber-400 text-slate-950 px-5 py-3 font-black' }, '← Volver a Gastronomía'),
                React.createElement('div', { onClick: (ev) => { const a = ev.target && ev.target.closest ? ev.target.closest('a[href="index.html"], a[href="./index.html"]') : null; if (a) { ev.preventDefault(); setSel(null); window.scrollTo({ top: 0, behavior: 'smooth' }); } }, dangerouslySetInnerHTML: { __html: detailHtml || '<div class="card"><p>Cargando ficha…</p></div>' } })));
}
window.GastronomiaAfinada=GastronomiaAfinada;
