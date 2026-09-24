function Master4LegacyDataHub({ kind, go }) {
    const [q, setQ] = useState('');
    const [selected, setSelected] = useState(null);
    const configs = {
        playas: { title: 'Playas reales del Master 3', icon: '🏖️', data: window.PLAYAS_DETALLADAS_DATA, back: 'master4_descubre' },
        centros: { title: 'Centros culturales', icon: '🎨', data: window.CENTROS_CULTURALES_DATA, back: 'master4_patrimonio' },
        teatros: { title: 'Teatros', icon: '🎭', data: TEATROS_DATA, back: 'master4_patrimonio' },
        iglesias: { title: 'Iglesias y patrimonio religioso', icon: '⛪', data: IGLESIAS_DATA, back: 'master4_patrimonio' },
        gastronomia: { title: 'Gastronomía real del Master 3', icon: '🍽️', data: GASTRONOMIA_DATA, back: 'master4_gastronomia' },
        noche: { title: 'Vida nocturna', icon: '🎵', data: VIDA_NOCTURNA_DATA, back: 'master4_ocio' },
        ferias: { title: 'Ferias y compras', icon: '🛍️', data: FEIRAS_COMPRAS_DATA, back: 'master4_ocio' },
        mercados: { title: 'Mercados', icon: '🧺', data: MERCADOS_COMPRAS_DATA, back: 'master4_ocio' },
        shoppings: { title: 'Shoppings', icon: '🏬', data: SHOPPINGS_DATA, back: 'master4_ocio' }
    };
    const c = configs[kind];
    const val = (x, keys) => { for (const k of keys) {
        if (x && x[k] !== undefined && x[k] !== null && String(x[k]).trim())
            return x[k];
    } return ''; };
    const name = x => val(x, ['nombre', 'name', 'titulo', 'title']);
    const desc = x => val(x, ['descripcion', 'description', 'resumen', 'summary', 'subtitulo', 'texto', 'detalle']);
    const image = x => val(x, ['imagen', 'image', 'foto', 'img', 'miniatura', 'thumbnail', 'capa']);
    const address = x => val(x, ['direccion', 'endereco', 'address', 'ubicacion', 'local']);
    const hours = x => val(x, ['horario', 'horarios', 'hours', 'funcionamento']);
    const price = x => val(x, ['valor', 'precio', 'preco', 'price']);
    const history = x => val(x, ['historia', 'history']);
    const category = x => val(x, ['categoria', 'category', 'tipo']);
    const arr = Array.isArray(c.data) ? c.data : [];
    const shown = arr.filter(x => (name(x) + ' ' + desc(x) + ' ' + category(x)).toLowerCase().includes(q.toLowerCase()));
    if (selected) {
        const x = selected;
        const blocks = [
            ['⭐', 'Lo esencial', desc(x)], ['📖', 'Historia', history(x)], ['📍', 'Dirección / ubicación', address(x)],
            ['🕐', 'Horarios', hours(x)], ['💰', 'Precio / entrada', price(x)]
        ].filter(z => z[2]);
        return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
            React.createElement("header", { className: "max-w-5xl mx-auto px-4 sm:px-6 pt-6" },
                React.createElement("button", { onClick: () => setSelected(null), className: "text-xs font-black" },
                    "\u2190 ",
                    c.title.toUpperCase()),
                React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white overflow-hidden" },
                    React.createElement("div", { className: "relative min-h-[280px] bg-slate-800" },
                        image(x) ? React.createElement("img", { src: image(x), alt: name(x), className: "absolute inset-0 w-full h-full object-cover" }) : React.createElement("div", { className: "absolute inset-0 grid place-items-center" },
                            React.createElement("div", { className: "text-center" },
                                React.createElement("span", { className: "text-6xl" }, c.icon),
                                React.createElement("small", { className: "block mt-3 text-white/40 font-black" }, "FOTO PENDIENTE"))),
                        React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" }),
                        React.createElement("div", { className: "absolute bottom-0 p-6 sm:p-8" },
                            React.createElement("span", { className: "text-[10px] font-black text-amber-300" }, category(x) || c.title),
                            React.createElement("h1", { className: "text-3xl sm:text-5xl font-black mt-1" }, name(x)))))),
            React.createElement("main", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-5" },
                React.createElement("div", { className: "rounded-[1.6rem] bg-emerald-100 p-5" },
                    React.createElement("span", { className: "text-[10px] font-black text-emerald-900" }, "MASTER 3 \u2192 MASTER 4"),
                    React.createElement("p", { className: "text-sm font-bold mt-2" }, "La ficha muestra solamente campos que ya existen en el registro original. Los campos ausentes permanecen ausentes.")),
                React.createElement("div", { className: "mt-4 space-y-2" }, blocks.length ? blocks.map((z, i) => React.createElement("details", { key: z[1], open: i === 0, className: "rounded-[1.5rem] bg-white border p-5" },
                    React.createElement("summary", { className: "list-none cursor-pointer flex gap-4" },
                        React.createElement("span", null, z[0]),
                        React.createElement("b", { className: "flex-1" }, z[1]),
                        React.createElement("span", null, "\uFF0B")),
                    React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed mt-4" }, String(z[2])))) : React.createElement("div", { className: "rounded-2xl bg-white border p-5 text-sm text-slate-500" }, "Este registro todav\u00EDa no tiene texto descriptivo estructurado en su objeto original.")),
                React.createElement("div", { className: "flex flex-wrap gap-2 mt-5" },
                    React.createElement("button", { onClick: () => go('master4_para_mi'), className: "rounded-full border bg-white px-5 py-3 text-xs font-black" }, "\u2661 MI R\u00CDO"),
                    React.createElement("button", { onClick: () => go('master4_para_mi'), className: "rounded-full bg-slate-950 text-white px-5 py-3 text-xs font-black" }, "\uD83D\uDD04 CAMBI\u00D3 MI PLAN"))));
    }
    return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
        React.createElement("header", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6" },
            React.createElement("button", { onClick: () => go(c.back), className: "text-xs font-black" }, "\u2190 VOLVER"),
            React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white p-7 sm:p-10" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-300" },
                    c.icon,
                    " CAT\u00C1LOGO REAL"),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2" }, c.title),
                React.createElement("p", { className: "text-sm text-white/70 mt-3" },
                    arr.length,
                    " registros conectados directamente a sus datos existentes."),
                React.createElement("input", { value: q, onChange: e => setQ(e.target.value), placeholder: "Buscar\u2026", className: "mt-6 w-full max-w-xl rounded-2xl bg-white text-slate-900 px-5 py-4 text-sm" }))),
        React.createElement("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-6" },
            React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3" }, shown.map((x, i) => React.createElement("button", { key: val(x, ['id', 'slug']) || i, onClick: () => setSelected(x), className: "rounded-[1.7rem] bg-white border overflow-hidden text-left min-h-52 flex flex-col" },
                image(x) ? React.createElement("div", { className: "h-32 overflow-hidden" },
                    React.createElement("img", { src: image(x), alt: name(x), className: "w-full h-full object-cover" })) : React.createElement("div", { className: "h-24 bg-slate-100 grid place-items-center text-3xl" }, c.icon),
                React.createElement("div", { className: "p-5 mt-auto" },
                    React.createElement("span", { className: "text-[9px] font-black text-emerald-700" }, category(x) || 'ERNESTINHO 4.0'),
                    React.createElement("h2", { className: "text-lg font-black mt-1" }, name(x) || 'Registro sin título'),
                    React.createElement("p", { className: "text-xs text-white/65 mt-2 line-clamp-2" }, String(desc(x) || address(x) || 'Abre para ver la información disponible.')),
                    React.createElement("span", { className: "inline-block mt-4 text-[10px] font-black" }, "ABRIR FICHA \u2192")))))));
}
window.Master4LegacyDataHub=Master4LegacyDataHub;
