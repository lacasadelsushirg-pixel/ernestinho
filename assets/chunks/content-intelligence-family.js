function Master4RemainingContent({ go }) {
    const [section, setSection] = useState('lugares');
    const [dataset, setDataset] = useState('fuertes');
    const [q, setQ] = useState('');
    const groups = {
        lugares: {
            title: 'Más lugares de Río', icon: '📍',
            sets: {
                fuertes: ['Fuertes y fortalezas', '🏰', window.FUERTES_DATA],
                senderos: ['Senderos y trilhas', '🥾', window.SENDEROS_RIO],
                barrios: ['Barrios', '🗺️', BARRIOS_DATA],
                actividades: ['Actividades', '✨', window.ACTIVIDADES_NUEVAS],
                experiencias: ['Experiencias Ernestinho', '❤️', EXPERIENCIAS_DATA]
            }
        },
        practico: {
            title: 'Vida práctica y decisiones', icon: '🧠',
            sets: {
                temas: ['Guía práctica', '📚', GUIA_TEMAS],
                consejos: ['Consejos nuevos', '💡', window.CONSEJOS_NUEVOS],
                faq: ['Preguntas frecuentes', '❓', window.FAQ_DESTACADAS],
                quehacer: ['Qué hacer', '🎯', window.CATEGORIAS_QUE_HACER],
                semana: ['Río según el día', '📅', window.SEMANA_RIO],
                lluvia: ['Si llueve', '🌧️', window.LLUVIA_RIO],
                transporte: ['Moverte por Río', '🚇', window.TRANSPORTE_RIO],
                trampas: ['Trampas de turista', '⚠️', window.TRAMPAS_TURISTA],
                perfiles: ['Río para cada viajero', '👥', window.PERFILES_RIO],
                supermercado: ['Supermercado brasileño', '🛒', window.SUPERMERCADO_BRASIL],
                souvenirs: ['Souvenirs', '🎁', window.SOUVENIRS_RIO],
                portuaria: ['Ruta portuaria', '⚓', window.RUTA_PORTUARIA]
            }
        }
    };
    const g = groups[section], current = g.sets[dataset] || Object.values(g.sets)[0], arr = Array.isArray(current[2]) ? current[2] : [];
    const val = (x, keys) => { for (const k of keys) {
        const v = x && x[k];
        if (v !== undefined && v !== null && String(v).trim())
            return String(v);
    } return ''; };
    const title = x => typeof x === 'string' ? x : val(x, ['nombre', 'name', 'titulo', 'title', 'tema', 'pregunta', 'consejo', 'dia', 'label']) || 'Contenido';
    const body = x => typeof x === 'string' ? '' : val(x, ['descripcion', 'description', 'texto', 'detalle', 'contenido', 'respuesta', 'resumen', 'summary', 'subtitulo', 'explicacion']);
    const image = x => typeof x === 'string' ? '' : val(x, ['imagen', 'image', 'foto', 'img', 'miniatura', 'thumbnail']);
    const filtered = arr.filter(x => (title(x) + ' ' + body(x)).toLowerCase().includes(q.toLowerCase()));
    const switchSection = k => { setSection(k); setDataset(Object.keys(groups[k].sets)[0]); setQ(''); };
    return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
        React.createElement("header", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6" },
            React.createElement("button", { onClick: () => go('inicio'), className: "text-xs font-black" }, T("← INICIO")),
            React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white p-7 sm:p-10" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-300" }, "\uD83E\uDDE9 COBERTURA MASTER 3 \u2192 4.0"),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2" }, "Todo lo dem\u00E1s tambi\u00E9n entra."),
                React.createElement("p", { className: "text-sm text-white/70 mt-3" }, "Este hub conecta los grandes bloques que todav\u00EDa estaban escondidos dentro del Master 3, sin perder su estructura original.")),
            React.createElement("div", { className: "flex gap-2 mt-5" }, Object.entries(groups).map(([k, v]) => React.createElement("button", { key: k, onClick: () => switchSection(k), className: `rounded-full px-5 py-3 text-xs font-black border ${section === k ? 'bg-slate-950 text-white' : 'bg-white'}` },
                v.icon,
                " ",
                v.title))),
            React.createElement("div", { className: "flex gap-2 overflow-x-auto py-4", style: { scrollbarWidth: 'none' } }, Object.entries(g.sets).map(([k, v]) => React.createElement("button", { key: k, onClick: () => { setDataset(k); setQ(''); }, className: `whitespace-nowrap rounded-full px-4 py-3 text-[10px] font-black border ${dataset === k ? 'bg-emerald-700 text-white' : 'bg-white'}` },
                v[1],
                " ",
                v[0]))),
            React.createElement("input", { value: q, onChange: e => setQ(e.target.value), placeholder: "Buscar en esta secci\u00F3n\u2026", className: "w-full max-w-xl rounded-2xl bg-white border px-5 py-4 text-sm" })),
        React.createElement("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-6" },
            React.createElement("div", { className: "mb-5" },
                React.createElement("span", { className: "text-3xl" }, current[1]),
                React.createElement("h2", { className: "text-3xl font-black mt-2" }, current[0]),
                React.createElement("p", { className: "text-xs text-slate-500 mt-1" },
                    arr.length,
                    " registros conectados directamente")),
            React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3" }, filtered.map((x, i) => React.createElement("details", { key: i, className: "rounded-[1.6rem] bg-white border overflow-hidden group" },
                image(x) && React.createElement("div", { className: "h-36 overflow-hidden" },
                    React.createElement("img", { src: image(x), alt: title(x), className: "w-full h-full object-cover" })),
                React.createElement("summary", { className: "list-none cursor-pointer p-5" },
                    React.createElement("span", { className: "text-[9px] font-black text-emerald-700" }, current[0].toUpperCase()),
                    React.createElement("h3", { className: "text-lg font-black mt-1" }, title(x)),
                    body(x) && React.createElement("p", { className: "text-xs text-white/65 mt-2 line-clamp-2" }, body(x)),
                    React.createElement("span", { className: "inline-block mt-4 text-[9px] font-black" }, "ABRIR +")),
                body(x) && React.createElement("div", { className: "px-5 pb-5" },
                    React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed" }, body(x))))))));
}
function rioHojeFallbackExpand(days=28){const out=[...RIO_HOJE_FALLBACK_EVENTS],now=new Date();for(let i=0;i<days;i++){const d=new Date(now.getTime()+i*86400000),key=rioHojeDateKey(d),wd=new Date(key+'T12:00:00-03:00').getDay();window.RIO_HOJE_FALLBACK_RECURRING.forEach(r=>{if((r.weekdays||[]).includes(wd))out.push({...r,eventId:r.eventId+'-'+key,seriesId:r.eventId,startDate:key,endDate:key})})}return out}

// window.RIO_HOJE_IMAGE_REGISTRY externalizado a JSON
function RioHojeSmartMatches({query='',ctx,go,lang='es'}){const X={es:{badge:'⚡ RÍO HOJE · CAPA DINÁMICA',title:'También está pasando esto en Río',open:'ABRIR RÍO HOJE →',gem:'💎 ERNESTINHO ENCONTRÓ ESTO'},pt:{badge:'⚡ RIO HOJE · CAMADA DINÂMICA',title:'Isto também está acontecendo no Rio',open:'ABRIR RIO HOJE →',gem:'💎 ERNESTINHO ENCONTROU ISTO'},en:{badge:'⚡ RIO TODAY · DYNAMIC LAYER',title:'This is also happening in Rio',open:'OPEN RIO TODAY →',gem:'💎 ERNESTINHO FOUND THIS'}}[lang]||{};const C={pt:{GRATIS:'GRÁTIS',FERIAS:'FEIRAS',CULTURA:'CULTURA',MUSICA:'MÚSICA',GASTRONOMIA:'GASTRONOMIA',FAMILIA:'FAMÍLIA',INFANTIL:'INFANTIL',DEPORTES:'ESPORTES',EXPOSICIONES:'EXPOSIÇÕES',EXPOSICOES:'EXPOSIÇÕES',WORLD_CULTURES:'CULTURAS DO MUNDO',ACESSIBILIDADE:'ACESSIBILIDADE',AFRICA:'ÁFRICA',AFRO_BRASILEIRA:'AFRO-BRASILEIRA',ARQUITETURA:'ARQUITETURA',ARTE:'ARTE',CAFE:'CAFÉ',CARNAVAL:'CARNAVAL',CERVEJA:'CERVEJA',CHILE:'CHILE',CIENCIA:'CIÊNCIA',CINEMA:'CINEMA',CIRCO:'CIRCO',COMPRAS:'COMPRAS',DANCA:'DANÇA',DESIGN:'DESIGN',ENERGIA:'ENERGIA',FIESTAS:'FESTAS',FUTEBOL:'FUTEBOL',GAMES:'GAMES',GRANDES_EVENTOS:'GRANDES EVENTOS',JAPAO:'JAPÃO',LITERATURA:'LITERATURA',MUSEUS:'MUSEUS',NATURALEZA:'NATUREZA',NEGOCIOS:'NEGÓCIOS',OUTDOOR:'AO AR LIVRE',TEATRO:'TEATRO',TECNOLOGIA:'TECNOLOGIA'},en:{GRATIS:'FREE',FERIAS:'FAIRS',CULTURA:'CULTURE',MUSICA:'MUSIC',GASTRONOMIA:'FOOD',FAMILIA:'FAMILY',INFANTIL:'KIDS',DEPORTES:'SPORTS',EXPOSICIONES:'EXHIBITIONS',EXPOSICOES:'EXHIBITIONS',WORLD_CULTURES:'WORLD CULTURES',ACESSIBILIDADE:'ACCESSIBILITY',AFRICA:'AFRICA',AFRO_BRASILEIRA:'AFRO-BRAZILIAN',ARQUITETURA:'ARCHITECTURE',ARTE:'ART',CAFE:'COFFEE',CARNAVAL:'CARNIVAL',CERVEJA:'BEER',CHILE:'CHILE',CIENCIA:'SCIENCE',CINEMA:'CINEMA',CIRCO:'CIRCUS',COMPRAS:'SHOPPING',DANCA:'DANCE',DESIGN:'DESIGN',ENERGIA:'ENERGY',FIESTAS:'PARTIES',FUTEBOL:'FOOTBALL',GAMES:'GAMES',GRANDES_EVENTOS:'MAJOR EVENTS',JAPAO:'JAPAN',LITERATURA:'LITERATURE',MUSEUS:'MUSEUMS',NATURALEZA:'NATURE',NEGOCIOS:'BUSINESS',OUTDOOR:'OUTDOORS',TEATRO:'THEATER',TECNOLOGIA:'TECHNOLOGY'}};const tc=v=>{const k=String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/\s+/g,'_');return (C[lang]&&C[lang][k])||v};const [rows,setRows]=useState([]);const nq=String(query||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();const noEvents=/no quiero eventos|no events|sem eventos|sem evento/.test(nq);useEffect(()=>{if(noEvents||(!query&&!ctx?.timeIntent))return;let alive=true;const n=String(query||'').toLowerCase(),w=n.includes('noche')||n.includes('night')?'tonight':n.includes('mañana')||n.includes('amanha')||n.includes('tomorrow')?'tomorrow':n.includes('fin de semana')||n.includes('weekend')?'weekend':n.includes('hoy')||n.includes('hoje')||n.includes('today')?'today':'week';fetch('/api/rio-hoje?window='+w+'&q='+encodeURIComponent(query)+'&limit=5').then(r=>{if(!r.ok)throw 0;return r.json()}).then(j=>alive&&setRows(j.events||[])).catch(()=>{const base=rioHojeFallbackExpand();const now=rioHojeDateKey(new Date());const filtered=base.filter(e=>(e.endDate||e.startDate)>=now).sort((a,b)=>(b.qualityScore||0)-(a.qualityScore||0)).slice(0,5);if(alive)setRows(filtered)});return()=>{alive=false}},[query,ctx?.timeIntent,noEvents]);if(noEvents||!rows.length)return null;return React.createElement('section',{className:'mt-7 rounded-[2rem] bg-cyan-950 text-white p-6 sm:p-8'},React.createElement('div',{className:'flex flex-wrap items-center justify-between gap-3'},React.createElement('div',null,React.createElement('span',{className:'text-[10px] font-black text-cyan-300'},X.badge),React.createElement('h2',{className:'text-2xl font-black mt-1'},X.title)),React.createElement('button',{onClick:()=>go('rio_hoje'),className:'rounded-full bg-white text-slate-950 px-4 py-2 text-[10px] font-black'},X.open)),React.createElement('div',{className:'grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5'},rows.slice(0,3).map(e=>React.createElement('article',{key:e.eventId,className:'rounded-2xl bg-white/10 overflow-hidden'},React.createElement(RioHojeVisual,{event:e,compact:true,lang}),React.createElement('div',{className:'p-4'},e.hiddenGem&&React.createElement('span',{className:'text-[9px] font-black text-amber-300'},X.gem),React.createElement('h3',{className:'font-black mt-1'},e.title),React.createElement('p',{className:'text-[10px] text-white/65 mt-1'},[e.startDate,e.startTime,rhText(e.venueName),rhText(e.neighborhood)].filter(Boolean).join(' · ')),React.createElement('div',{className:'flex flex-wrap gap-1 mt-3'},(e.categories||[]).slice(0,3).map(c=>React.createElement('span',{key:c,className:'rounded-full bg-white/10 px-2 py-1 text-[9px] font-bold'},tc(c)))))))))}

/* ===== RECORRIDOS ERNESTINHO V1 — RÍO A TU RITMO ===== */
function seoCurrentPath(section, museoId, barrio, restaurante, articulo, temaGuia, consejoId) {
    if (section === 'consejos' && ((consejoId === null || consejoId === void 0 ? void 0 : consejoId.id) || consejoId) === 'caminando') {
        const actual = seoCleanPath(window.location.pathname);
        if (actual === '/quiero' || actual === '/ruta-centro' || actual === '/recorrido-centro')
            return actual;
        return '/quiero';
    }
    if (section === 'museos' && museoId) {
        const museo = MUSEOS_DATA.find(x => x.id === museoId);
        const actual = seoCleanPath(window.location.pathname);
        if (museo && actual.startsWith('/museos/'))
            return `/museos/${seoSlug(museo.nombre)}`;
        return '/museos';
    }
    if (section === 'barrios' && barrio)
        return `/barrios/${seoSlug(barrio.nombre || barrio.id)}`;
    if (section === 'gastronomia' && restaurante)
        return `/gastronomia/${seoSlug(restaurante.nombre)}`;
    if (section === 'articulo_detalle' && articulo)
        return `/articulos/${seoSlug(articulo.titulo || articulo.id)}`;
    if (section === 'guia' && temaGuia && window.GUIA_INFO[temaGuia])
        return `/guia/${seoSlug(window.GUIA_INFO[temaGuia].titulo || temaGuia)}`;
    return seoPathForSection(section) || '/';
}
window.seoCurrentPath=seoCurrentPath;
window.rioHojeFallbackExpand=rioHojeFallbackExpand;
window.RioHojeSmartMatches=RioHojeSmartMatches;
window.Master4RemainingContent=Master4RemainingContent;
