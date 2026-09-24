function Master4Planner({ go }) {
    const catalog = Array.isArray(window.MASTER3_CITY_PLACE_REGISTRY) ? MASTER3_CITY_PLACE_REGISTRY : [];
    const [days, setDays] = useState(1);
    const [pace, setPace] = useState('Tranquilo');
    const [focus, setFocus] = useState('Primera vez');
    const val = (x, keys) => { for (const k of keys) {
        const v = x && x[k];
        if (v !== undefined && v !== null && String(v).trim())
            return String(v);
    } return ''; };
    const name = x => x.name || '';
    const kind = x => String(x.mainType || 'OTROS').toUpperCase();
    const hood = x => x.zone || x.neighborhood || 'Sin zona';
    const summary = x => x.summary || '';
    const norm = t => (t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const zoneOf = x => x.zone || x.neighborhood || 'Río esencial';
    const focusScore = x => {
        var _a;
        const tags = x.profiles || [], k = kind(x);
        let v = 0;
        if (focus === 'Primera vez' && tags.includes('first_time'))
            v += 14;
        if (focus === 'Playa' && (k === 'BEACH' || tags.includes('beach')))
            v += 14;
        if (focus === 'Cultura' && (k === 'CULTURE' || k === 'MUSEUM' || tags.includes('history') || tags.includes('art')))
            v += 14;
        if (focus === 'Naturaleza' && (k === 'TRAIL' || k === 'NATURE' || tags.includes('nature')))
            v += 14;
        if (focus === 'Familia' && (tags.includes('family') || tags.includes('kids')))
            v += 14;
        if ((((_a = x.visit) === null || _a === void 0 ? void 0 : _a.durationIdeal) || 999) <= 180)
            v += 2;
        return v;
    };
    const perDay = pace === 'Intenso' ? 5 : pace === 'Tranquilo' ? 3 : 4;
    const buckets = {};
    catalog.forEach(x => { const z = zoneOf(x); (buckets[z] || (buckets[z] = [])).push(x); });
    const zoneRank = Object.entries(buckets).map(([z, arr]) => ({ z, arr: [...arr].sort((a, b) => focusScore(b) - focusScore(a)), score: arr.reduce((n, x) => n + focusScore(x), 0) })).sort((a, b) => b.score - a.score);
    const chosen = zoneRank.slice(0, days);
    const plans = chosen.map((z, i) => ({ day: i + 1, zone: z.z, items: z.arr.slice(0, perDay) }));
    return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
        React.createElement("header", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6" },
            React.createElement("button", { onClick: () => go('inicio'), className: "text-xs font-black" }, T("← INICIO")),
            React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white p-7 sm:p-10" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-300" }, "\uD83D\uDDD3\uFE0F PLANIFICADOR POR ZONAS"),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2" }, "Menos cruzar R\u00EDo. M\u00E1s vivirlo."),
                React.createElement("p", { className: "text-sm text-white/70 mt-3" }, "Ahora cada d\u00EDa intenta mantenerse dentro de una misma zona geogr\u00E1fica antes de elegir los lugares."))),
        React.createElement("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-6" },
            React.createElement("section", { className: "grid lg:grid-cols-3 gap-5 mb-7" },
                React.createElement("div", null,
                    React.createElement("b", { className: "text-xs" }, "\u00BFCU\u00C1NTOS D\u00CDAS?"),
                    React.createElement("div", { className: "flex gap-2 mt-2" }, [1, 2, 3, 5].map(x => React.createElement("button", { key: x, onClick: () => setDays(x), className: `rounded-full px-4 py-3 text-xs font-black border ${days === x ? 'bg-slate-950 text-white' : 'bg-white'}` }, x)))),
                React.createElement("div", null,
                    React.createElement("b", { className: "text-xs" }, "RITMO"),
                    React.createElement("div", { className: "flex gap-2 mt-2" }, ['Tranquilo', 'Normal', 'Intenso'].map(x => React.createElement("button", { key: x, onClick: () => setPace(x), className: `rounded-full px-4 py-3 text-xs font-black border ${pace === x ? 'bg-slate-950 text-white' : 'bg-white'}` }, x)))),
                React.createElement("div", null,
                    React.createElement("b", { className: "text-xs" }, "PRIORIDAD"),
                    React.createElement("div", { className: "flex gap-2 mt-2 overflow-x-auto" }, ['Primera vez', 'Playa', 'Cultura', 'Naturaleza', 'Familia'].map(x => React.createElement("button", { key: x, onClick: () => setFocus(x), className: `whitespace-nowrap rounded-full px-4 py-3 text-xs font-black border ${focus === x ? 'bg-emerald-700 text-white' : 'bg-white'}` }, x))))),
            React.createElement("div", { className: "rounded-[1.5rem] bg-emerald-100 p-5 mb-6" },
                React.createElement("span", { className: "text-[10px] font-black text-emerald-900" }, "NUEVA REGLA 4.0"),
                React.createElement("p", { className: "text-sm font-bold mt-2" }, "Primero elegimos una zona coherente para el d\u00EDa. Despu\u00E9s elegimos lugares compatibles dentro de ella. No usamos todav\u00EDa tiempos de tr\u00E1nsito en vivo ni prometemos que el orden sea \u00F3ptimo.")),
            React.createElement("div", { className: "space-y-7" }, plans.map(p => React.createElement("section", { key: p.day },
                React.createElement("div", { className: "rounded-[1.6rem] bg-slate-950 text-white p-5 mb-3 flex items-center gap-4" },
                    React.createElement("span", { className: "w-11 h-11 rounded-full bg-white text-slate-950 grid place-items-center font-black" }, p.day),
                    React.createElement("div", null,
                        React.createElement("span", { className: "text-[9px] font-black text-amber-300" },
                            "D\u00CDA ",
                            p.day),
                        React.createElement("h2", { className: "text-xl font-black" }, p.zone),
                        React.createElement("p", { className: "text-[10px] text-white/50" },
                            p.items.length,
                            " paradas \u00B7 ritmo ",
                            pace.toLowerCase()))),
                React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3" }, p.items.map((x, i) => React.createElement("article", { key: i, className: "rounded-[1.5rem] bg-white border p-5" },
                    React.createElement("span", { className: "text-[9px] font-black text-emerald-700" },
                        kind(x),
                        " \u00B7 ",
                        hood(x)),
                    React.createElement("h3", { className: "text-lg font-black mt-1" }, name(x)),
                    summary(x) && React.createElement("p", { className: "text-xs text-white/65 mt-2 line-clamp-2" }, summary(x)),
                    React.createElement("div", { className: "mt-4 flex gap-2" },
                        React.createElement("button", { onClick: () => go(master4DedicatedRoute(x)), className: "text-[10px] font-black" }, "VER FICHA \u2192"),
                        React.createElement("button", { onClick: () => go('master4_transportes'), className: "text-[10px] font-black text-slate-400" }, "MOVERME \u2192")))))))),
            React.createElement("div", { className: "mt-7 rounded-[2rem] bg-amber-100 p-6" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-900" }, "\u2B50 LO QUE YO HAR\u00CDA"),
                React.createElement("h3", { className: "text-xl font-black mt-2" }, "No intentar\u00EDa \u201Cganarle\u201D a R\u00EDo."),
                React.createElement("p", { className: "text-sm text-slate-700 mt-2" }, "Si est\u00E1s en Copacabana, aprovecha esa zona. Si vas al Centro, haz del Centro tu d\u00EDa. La gu\u00EDa empieza a pensar as\u00ED para evitar itinerarios bonitos en papel pero agotadores en la calle."),
                React.createElement("button", { onClick: () => go('master4_smart_rio'), className: "mt-4 rounded-full bg-slate-950 text-white px-5 py-3 text-xs font-black" }, "AJUSTAR POR ZONA E INTER\u00C9S \u2192"))));
}
window.Master4Planner=Master4Planner;
