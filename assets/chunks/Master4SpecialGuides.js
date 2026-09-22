function Master4SpecialGuides({ go }) {
    const [tab, setTab] = useState('familia');
    const configs = {
        familia: { icon: '👨‍👩‍👧', title: 'Río en familia', data: FAMILIA_DATA },
        literatura: { icon: '📚', title: 'Río literario', data: ESPACIOS_LITERARIOS_DATA },
        consejos: { icon: '💡', title: '20 consejos para Río', data: LISTA_20_CONSEJOS }
    };
    const c = configs[tab];
    const arr = Array.isArray(c.data) ? c.data : [];
    const val = (x, keys) => { for (const k of keys) {
        const v = x && x[k];
        if (v !== undefined && v !== null && String(v).trim())
            return v;
    } return ''; };
    const title = x => typeof x === 'string' ? x : val(x, ['titulo', 'title', 'nombre', 'name', 'consejo', 'texto']) || 'Consejo';
    const text = x => typeof x === 'string' ? '' : val(x, ['descripcion', 'description', 'texto', 'detalle', 'contenido', 'respuesta', 'subtitulo']);
    return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
        React.createElement("header", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6" },
            React.createElement("button", { onClick: () => go('inicio'), className: "text-xs font-black" }, T("← INICIO")),
            React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white p-7 sm:p-10" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-300" }, "\uD83D\uDCDA GU\u00CDAS ESPECIALES"),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2" }, "Gu\u00EDas especiales para entender R\u00EDo mejor."),
                React.createElement("p", { className: "text-sm text-white/70 mt-3" }, "Consejos pr\u00E1cticos, R\u00EDo en familia y contenidos especiales reunidos aqu\u00ED, sin mezclarlo con las categor\u00EDas principales.")),
            React.createElement("div", { className: "flex gap-2 overflow-x-auto py-5" }, Object.entries(configs).map(([k, v]) => React.createElement("button", { key: k, onClick: () => setTab(k), className: `whitespace-nowrap rounded-full border px-4 py-3 text-xs font-black ${tab === k ? 'bg-slate-950 text-white' : 'bg-white'}` },
                v.icon,
                " ",
                v.title)))),
        React.createElement("main", { className: "max-w-5xl mx-auto px-4 sm:px-6" },
            React.createElement("div", { className: "mb-5" },
                React.createElement("span", { className: "text-4xl" }, c.icon),
                React.createElement("h2", { className: "text-3xl font-black mt-2" }, c.title),
                React.createElement("p", { className: "text-xs text-slate-500 mt-1" },
                    arr.length,
                    " contenidos disponibles")),
            React.createElement("div", { className: "space-y-2" }, arr.map((x, i) => React.createElement("details", { key: i, className: "rounded-[1.5rem] bg-white border p-5" },
                React.createElement("summary", { className: "list-none cursor-pointer flex gap-3" },
                    React.createElement("span", { className: "text-xs font-black text-emerald-700" }, String(i + 1).padStart(2, '0')),
                    React.createElement("b", { className: "flex-1" }, title(x)),
                    React.createElement("span", null, "\uFF0B")),
                text(x) && React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed mt-4" }, text(x)))))));
}
window.Master4SpecialGuides=Master4SpecialGuides;
