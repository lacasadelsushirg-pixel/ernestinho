function Master4AventuraPage({ go }) {
    const aventuraIds = ['parapente', 'parasail', 'paracaidas', 'rapel'];
    const items = aventuraIds.map(id => window.ACTIVIDADES_NUEVAS.find(a => a.id === id)).filter(Boolean);
    return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
        React.createElement("header", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6" },
            React.createElement("button", { onClick: () => go('que_hacer'), className: "text-xs font-black" }, "\u2190 QU\u00C9 HACER"),
            React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white p-7 sm:p-10" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-300 tracking-widest" }, "\uD83E\uDD7E AVENTURA EN R\u00CDO"),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2 max-w-4xl" }, "Adrenalina con R\u00EDo debajo de tus pies."),
                React.createElement("p", { className: "text-sm text-white/70 mt-3 max-w-3xl" }, "Aqu\u00ED separamos la aventura de las trilhas y la naturaleza. Vuelo, mar, ca\u00EDda libre y roca: experiencias para quien quiere vivir R\u00EDo con un poco m\u00E1s de adrenalina."))),
        React.createElement("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-7" },
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-7" }, items.map(a => React.createElement("article", { key: a.id, className: "bg-white rounded-[1.8rem] overflow-hidden border border-slate-100  flex flex-col" },
                React.createElement("button", { onClick: () => go(`actividad_${a.id}`), className: "block aspect-[4/3] overflow-hidden bg-slate-100 text-left" },
                    React.createElement("img", { src: a.miniatura, alt: a.titulo, className: "w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500", loading: "lazy" })),
                React.createElement("div", { className: "p-6 flex flex-col flex-1" },
                    React.createElement("div", { className: "flex items-start justify-between gap-3" },
                        React.createElement("div", null,
                            React.createElement("span", { className: "text-[10px] font-black text-teal-600 uppercase tracking-widest" }, a.categoria),
                            React.createElement("h2", { className: "text-2xl font-black mt-1" }, a.titulo)),
                        React.createElement("span", { className: "shrink-0 bg-amber-400 text-slate-950 rounded-full px-3 py-2 text-xs font-black" }, a.precio)),
                    React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed mt-3 flex-1" }, a.intro),
                    React.createElement("button", { onClick: () => go(`actividad_${a.id}`), className: "mt-5 w-full rounded-xl bg-slate-950 text-white p-3 text-xs font-black" }, "VER EXPERIENCIA \u2192")))))));
}
window.Master4AventuraPage=Master4AventuraPage;
