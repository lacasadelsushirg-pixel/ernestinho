function Master4CityRegistry({ go }) {
    const [q, setQ] = useState('');
    const [type, setType] = useState('Todos');
    const [selected, setSelected] = useState(null);
    const data = Array.isArray(MASTER3_FINAL_REFINED_CATALOG) ? MASTER3_FINAL_REFINED_CATALOG : [];
    const val = (x, keys) => { for (const k of keys) {
        const v = x && x[k];
        if (v !== undefined && v !== null && String(v).trim())
            return v;
    } return ''; };
    const name = x => val(x, ['name', 'nombre', 'title', 'titulo', 'canonicalName', 'label', 'slug']);
    const summary = x => val(x, ['summary', 'resumen', 'description', 'descripcion', 'subtitle', 'subtitulo']);
    const kind = x => val(x, ['type', 'tipo', 'category', 'categoria', 'entityType', 'classification']) || 'OTROS';
    const neighborhood = x => val(x, ['neighborhood', 'barrio', 'bairro', 'zone', 'zona']);
    const image = x => val(x, ['image', 'imagen', 'photo', 'foto', 'thumbnail', 'miniatura']);
    const id = x => val(x, ['id', 'slug', 'canonicalId']) || name(x);
    const norm = t => (t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const gateFor = x => { const n = norm(name(x)); return (Array.isArray(window.MASTER3_PUBLICATION_GATE_RESULTS) ? MASTER3_PUBLICATION_GATE_RESULTS : []).find(g => norm(g.name) === n) || null; };
    const types = ['Todos', ...Array.from(new Set(data.map(kind).filter(Boolean))).slice(0, 30)];
    const shown = data.filter(x => (type === 'Todos' || kind(x) === type) && (!q || (name(x) + ' ' + summary(x) + ' ' + neighborhood(x) + ' ' + kind(x)).toLowerCase().includes(q.toLowerCase())));
    if (selected) {
        const x = selected;
        const raw = [
            ['⭐', 'Lo esencial', summary(x)],
            ['📍', 'Barrio / zona', neighborhood(x)],
            ['🧭', 'Tipo', kind(x)],
            ['🪪', 'Identificador', id(x)]
        ].filter(z => z[2]);
        return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
            React.createElement("header", { className: "max-w-5xl mx-auto px-4 sm:px-6 pt-6" },
                React.createElement("button", { onClick: () => setSelected(null), className: "text-xs font-black" }, "\u2190 TODOS LOS LUGARES"),
                React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white overflow-hidden" },
                    React.createElement("div", { className: "relative min-h-[300px] bg-slate-800" },
                        image(x) ? React.createElement("img", { src: image(x), alt: name(x), className: "absolute inset-0 w-full h-full object-cover" }) : React.createElement("div", { className: "absolute inset-0 grid place-items-center" },
                            React.createElement("div", { className: "text-center" },
                                React.createElement("span", { className: "text-6xl" }, "\uD83D\uDCCD"),
                                React.createElement("small", { className: "block text-white/40 mt-3 font-black" }, "FOTO PENDIENTE"))),
                        React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" }),
                        React.createElement("div", { className: "absolute bottom-0 p-7" },
                            React.createElement("span", { className: "text-[10px] font-black text-amber-300" }, kind(x)),
                            React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-1" }, name(x)),
                            neighborhood(x) && React.createElement("p", { className: "text-sm text-white/70 mt-2" }, neighborhood(x)))))),
            React.createElement("main", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-5" },
                React.createElement("div", { className: "rounded-[1.6rem] bg-sky-100 p-5" },
                    React.createElement("span", { className: "text-[10px] font-black text-sky-900" }, "REGISTRO CAN\u00D3NICO MASTER 3"),
                    React.createElement("p", { className: "text-sm font-bold mt-2" }, "Esta pantalla no inventa una ficha nueva: presenta los campos que ya sobrevivieron al proceso de clasificaci\u00F3n y refinamiento del Master 3.")),
                " ",
                gateFor(x) && React.createElement("div", { className: `rounded-[1.6rem] p-5 mt-3 ${gateFor(x).level === 'HOLD' ? 'bg-rose-100' : 'bg-amber-100'}` },
                    React.createElement("span", { className: "text-[10px] font-black" },
                        "\uD83D\uDEE1\uFE0F ESTADO DE PUBLICACI\u00D3N \u00B7 ",
                        gateFor(x).level),
                    React.createElement("p", { className: "text-xs mt-2 text-slate-700" },
                        "Pendencias registradas: ",
                        (gateFor(x).issues || []).join(' · ') || 'sin incidencias listadas',
                        ".")),
                React.createElement("div", { className: "mt-4 space-y-2" }, raw.map((z, i) => React.createElement("details", { key: z[1], open: i === 0, className: "rounded-[1.5rem] bg-white border p-5" },
                    React.createElement("summary", { className: "list-none cursor-pointer flex gap-4" },
                        React.createElement("span", null, z[0]),
                        React.createElement("b", { className: "flex-1" }, z[1]),
                        React.createElement("span", null, "\uFF0B")),
                    React.createElement("p", { className: "text-sm text-slate-600 mt-4" }, String(z[2]))))),
                React.createElement("div", { className: "flex gap-2 mt-5 flex-wrap" },
                    React.createElement("button", { onClick: () => go('master4_para_mi'), className: "rounded-full border bg-white px-5 py-3 text-xs font-black" }, "\u2661 MI R\u00CDO"),
                    React.createElement("button", { onClick: () => go('master4_para_mi'), className: "rounded-full bg-slate-950 text-white px-5 py-3 text-xs font-black" }, "\uD83D\uDD04 CAMBI\u00D3 MI PLAN"))));
    }
    return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
        React.createElement("header", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6" },
            React.createElement("button", { onClick: () => go('master4_descubre'), className: "text-xs font-black" }, "\u2190 CONOCER R\u00CDO"),
            React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white p-7 sm:p-10" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-300" }, "\uD83E\uDDE0 CEREBRO MASTER 3 \u2192 EXPERIENCIA 4.0"),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2" }, "180 registros refinados conectados."),
                React.createElement("p", { className: "text-sm text-white/70 mt-3" }, "Este es el gran cat\u00E1logo transversal: un lugar se registra una vez y despu\u00E9s puede aparecer en barrios, intereses, itinerarios y situaciones."),
                React.createElement("input", { value: q, onChange: e => setQ(e.target.value), placeholder: "Buscar en todo R\u00EDo\u2026", className: "mt-6 w-full max-w-xl rounded-2xl bg-white text-slate-900 px-5 py-4 text-sm" })),
            React.createElement("div", { className: "flex gap-2 overflow-x-auto py-5", style: { scrollbarWidth: 'none' } }, types.map(t => React.createElement("button", { key: t, onClick: () => setType(t), className: `whitespace-nowrap rounded-full border px-4 py-3 text-xs font-black ${type === t ? 'bg-slate-950 text-white' : 'bg-white'}` }, t)))),
        React.createElement("main", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
            React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" }, shown.map((x, i) => React.createElement("button", { key: id(x) || i, onClick: () => setSelected(x), className: "rounded-[1.6rem] bg-white border p-5 min-h-44 text-left flex flex-col" },
                React.createElement("span", { className: "text-2xl" }, "\uD83D\uDCCD"),
                React.createElement("div", { className: "mt-auto flex items-center gap-2" },
                    React.createElement("span", { className: "text-[9px] font-black text-emerald-700" }, kind(x)),
                    gateFor(x) && React.createElement("span", { className: `text-[8px] font-black rounded-full px-2 py-1 ${gateFor(x).level === 'HOLD' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'}` }, gateFor(x).level)),
                React.createElement("h2", { className: "font-black mt-1" }, name(x) || 'Registro'),
                neighborhood(x) && React.createElement("p", { className: "text-[10px] text-slate-400 mt-1" }, neighborhood(x)),
                React.createElement("span", { className: "text-[9px] font-black mt-3" }, "ABRIR \u2192"))))));
}
