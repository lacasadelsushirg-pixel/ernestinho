function Master4BeachIndexV3({ go }) {
    const [filter, setFilter] = useState('Todos');
    const beaches = v3DecisionCatalog().filter(p => p.mainType === 'beach');
    const filters = ['Todos', 'Familia', 'Fotos', 'Atardecer', 'Naturaleza', 'Tranquila', 'Fácil transporte'];
    const matches = (p) => { var _a; if (filter === 'Todos')
        return true; const t = v3Norm([p.name, p.subtype, p.neighborhood, (_a = p.editorial) === null || _a === void 0 ? void 0 : _a.ernestinhoTip].join(' ')); if (filter === 'Familia')
        return /leme|copacabana|praia vermelha|amores/.test(t); if (filter === 'Fotos')
        return /arpoador|ipanema|sao conrado|joatinga|praia vermelha/.test(t); if (filter === 'Atardecer')
        return /arpoador|ipanema|leblon|sao conrado/.test(t); if (filter === 'Naturaleza')
        return /joatinga|reserva|recreio|abrico|diabo|grumari|prainha/.test(t); if (filter === 'Tranquila')
        return /leme|amores|reserva|vidigal/.test(t); if (filter === 'Fácil transporte')
        return /copacabana|leme|ipanema|arpoador|praia vermelha|botafogo/.test(t); return true; };
    return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
        React.createElement("header", { className: "max-w-7xl mx-auto px-4 pt-6" },
            React.createElement("button", { onClick: () => go('master4_descubre'), className: "text-xs font-black" }, "\u2190 DESCUBRE R\u00CDO"),
            React.createElement("div", { className: "mt-5 rounded-[2rem] bg-sky-950 text-white p-7 sm:p-10" },
                React.createElement("span", { className: "text-[10px] font-black text-sky-200" }, "\uD83C\uDFD6\uFE0F PLAYAS DE R\u00CDO"),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2" }, "No todas las playas sirven para lo mismo."),
                React.createElement("p", { className: "mt-3 text-white/70" }, "Elige el tipo de d\u00EDa que quieres vivir y entra directamente a la ficha de cada playa.")),
            React.createElement("div", { className: "flex gap-2 overflow-x-auto py-4" }, filters.map(f => React.createElement("button", { key: f, onClick: () => setFilter(f), className: `whitespace-nowrap rounded-full px-4 py-2 text-xs font-black ${filter === f ? 'bg-slate-950 text-white' : 'bg-white border'}` }, f)))),
        React.createElement("main", { className: "max-w-7xl mx-auto px-4" },
            React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4" }, beaches.filter(matches).map(p => { var _a; const r = ERNESTINHO_BEACH_V2.find(b => v3Norm(b.nombre) === v3Norm(p.name) || v3Norm(p.name).includes(v3Norm(b.id))); return React.createElement("article", { key: p.placeId, className: "rounded-[1.7rem] bg-white border overflow-hidden" },
                React.createElement("button", { onClick: () => openV3Entity(go, p), className: "w-full text-left" },
                    React.createElement("div", { className: "aspect-[4/3] bg-slate-200" },
                        React.createElement("img", { src: ((_a = r === null || r === void 0 ? void 0 : r.imagenes) === null || _a === void 0 ? void 0 : _a[0]) || v3Image(p), className: "w-full h-full object-cover" })),
                    React.createElement("div", { className: "p-5" },
                        React.createElement("span", { className: "text-[9px] font-black text-sky-700" }, p.neighborhood || 'Río de Janeiro'),
                        React.createElement("h2", { className: "text-xl font-black mt-1" }, p.name),
                        React.createElement("p", { className: "text-xs text-slate-500 mt-2 line-clamp-3" }, (r === null || r === void 0 ? void 0 : r.descripcion) || p.subtype),
                        React.createElement("span", { className: "inline-block mt-4 text-xs font-black" }, "VER PLAYA \u2192")))); }))));
}
window.Master4BeachIndexV3=Master4BeachIndexV3;
