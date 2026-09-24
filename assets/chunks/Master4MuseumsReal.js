function Master4MuseumsReal({ go }) {
    const [q, setQ] = useState('');
    const [cat, setCat] = useState('Todos');
    const [selected, setSelected] = useState(null);
    const museoOriginal = x => (MUSEOS_DATA || []).find(m => m.id === x.id) || {};
    const imagenMuseo = x => x.imagen || museoOriginal(x).miniatura || museoOriginal(x).fotoPrincipal || museoOriginal(x).fotoMedia || '';
    const cats = ['Todos', ...Array.from(new Set(MASTER4_MUSEOS_REAL.map(x => x.categoria).filter(Boolean)))];
    const shown = MASTER4_MUSEOS_REAL.filter(x => (cat === 'Todos' || x.categoria === cat) && (!q || (x.nombre + ' ' + x.subtitulo + ' ' + x.descripcion).toLowerCase().includes(q.toLowerCase())));
    if (selected) {
        const x = selected;
        const sections = [
            ['resumen', '⭐', 'Lo esencial', x.descripcion],
            ['historia', '📖', 'Su historia', x.historia],
            ['llegar', '📍', 'Dirección', x.direccion],
            ['horario', '🕐', 'Horario', x.horario],
            ['valor', '💰', 'Entradas / valor', x.valor]
        ].filter(z => z[3]);
        return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
            React.createElement("header", { className: "max-w-5xl mx-auto px-4 sm:px-6 pt-6" },
                React.createElement("button", { onClick: () => setSelected(null), className: "text-xs font-black" }, "\u2190 MUSEOS"),
                React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white overflow-hidden" },
                    React.createElement("div", { className: "relative min-h-[280px] bg-slate-800" },
                        imagenMuseo(x) ? React.createElement("img", { src: imagenMuseo(x), alt: x.nombre, className: "absolute inset-0 w-full h-full object-cover" }) : React.createElement("div", { className: "absolute inset-0 grid place-items-center text-6xl" }, "\uD83C\uDFDB\uFE0F"),
                        React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" }),
                        React.createElement("div", { className: "absolute bottom-0 p-6 sm:p-8" },
                            React.createElement("span", { className: "text-[10px] font-black text-amber-300" }, x.categoria || 'MUSEO'),
                            React.createElement("h1", { className: "text-3xl sm:text-5xl font-black mt-1" }, x.nombre),
                            React.createElement("p", { className: "text-sm text-white/75 mt-2" }, x.subtitulo))))),
            React.createElement("main", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-5" },
                React.createElement(V4FitBlock, { entity: v4Catalog().find(p => v4N(p.name) === v4N(x.nombre)) }),
                React.createElement("div", { className: "rounded-[1.7rem] bg-amber-100 p-5" },
                    React.createElement("span", { className: "text-[10px] font-black text-amber-900" }, "FUENTE DEL CONTENIDO"),
                    React.createElement("p", { className: "text-sm font-bold mt-2" }, "Esta ficha 4.0 est\u00E1 alimentada directamente por la informaci\u00F3n que ya estaba escrita en Master 3; no se agreg\u00F3 informaci\u00F3n externa en esta migraci\u00F3n.")),
                React.createElement("div", { className: "mt-4 space-y-2" }, sections.map((z, i) => React.createElement("details", { key: z[0], open: i === 0, className: "rounded-[1.5rem] bg-white border p-5" },
                    React.createElement("summary", { className: "cursor-pointer list-none flex gap-4 items-center" },
                        React.createElement("span", { className: "text-xl" }, z[1]),
                        React.createElement("b", { className: "flex-1" }, z[2]),
                        React.createElement("span", null, "\uFF0B")),
                    React.createElement("p", { className: "text-sm leading-relaxed text-slate-600 mt-4" }, z[3])))),
                React.createElement("div", { className: "mt-5 flex gap-2 flex-wrap" },
                    React.createElement("button", { onClick: () => go('master4_para_mi'), className: "rounded-full border bg-white px-5 py-3 text-xs font-black" }, "\u2661 MI R\u00CDO"),
                    React.createElement("button", { onClick: () => go('master4_para_mi'), className: "rounded-full bg-slate-950 text-white px-5 py-3 text-xs font-black" }, "\uD83D\uDD04 CAMBI\u00D3 MI PLAN"))));
    }
    return React.createElement("div", { className: "ec-dark-attraction min-h-screen bg-[#071313] text-white pb-24" },
        React.createElement("header", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6" },
            React.createElement("button", { onClick: () => go('master4_descubre'), className: "text-xs font-black" }, "\u2190 CONOCER R\u00CDO"),
            React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white p-7 sm:p-10" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-300" }, "\uD83C\uDFDB\uFE0F MUSEOS \u00B7 MASTER 3 \u2192 4.0"),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2" }, "28 fichas reales, una nueva forma de explorarlas."),
                React.createElement("p", { className: "text-sm text-white/70 mt-3" }, "Aqu\u00ED ya no estamos creando ejemplos: estas fichas salen directamente del cat\u00E1logo de museos que construimos en Master 3."),
                React.createElement("input", { value: q, onChange: e => setQ(e.target.value), placeholder: "Buscar museo\u2026", className: "mt-6 w-full max-w-xl rounded-2xl bg-white text-slate-900 px-5 py-4 text-sm" })),
            React.createElement("div", { className: "flex gap-2 overflow-x-auto py-5", style: { scrollbarWidth: 'none' } }, cats.map(c => React.createElement("button", { key: c, onClick: () => setCat(c), className: `whitespace-nowrap rounded-full border px-4 py-3 text-xs font-black ${cat === c ? 'bg-slate-950 text-white' : 'bg-white'}` }, c)))),
        React.createElement("main", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
            React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3" }, shown.map(x => React.createElement("button", { key: x.id, onClick: () => setSelected(x), className: "group rounded-[1.7rem] bg-[#102424] border border-white/10 overflow-hidden text-left min-h-56 flex flex-col text-white " },
                imagenMuseo(x) ? React.createElement("div", { className: "aspect-[4/3] overflow-hidden bg-slate-100" },
                    React.createElement("img", { src: imagenMuseo(x), alt: x.nombre, loading: "lazy", className: "w-full h-full object-contain bg-[#0b1b1b] group-hover:scale-[1.02] transition-transform duration-500" })) : React.createElement("div", { className: "aspect-[4/3] bg-slate-100 grid place-items-center text-3xl" }, "\uD83C\uDFDB\uFE0F"),
                React.createElement("div", { className: "p-5 mt-auto" },
                    React.createElement("span", { className: "text-[9px] font-black text-emerald-700" }, x.categoria || 'MUSEO'),
                    React.createElement("h2", { className: "text-lg font-black mt-1" }, x.nombre),
                    React.createElement("p", { className: "text-xs text-white/65 mt-2 line-clamp-2" }, x.subtitulo || x.descripcion),
                    React.createElement("span", { className: "inline-block mt-4 text-[10px] font-black" }, "ABRIR FICHA 4.0 \u2192")))))));
}
window.Master4MuseumsReal=Master4MuseumsReal;
