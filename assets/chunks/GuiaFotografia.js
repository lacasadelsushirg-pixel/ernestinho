function GuiaFotografia({ onVolver }) {
    const [tipo, setTipo] = useState('Todos');
    const tipos = ['Todos', ...new Set(FOTOGRAFIA_DATA.map(x => x.tipo))];
    const lista = tipo === 'Todos' ? FOTOGRAFIA_DATA : FOTOGRAFIA_DATA.filter(x => x.tipo === tipo);
    return React.createElement("section", { className: "min-h-screen bg-white pb-20" },
        React.createElement("div", { className: "bg-slate-900 text-white" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-16" },
                React.createElement("button", { onClick: onVolver, className: "text-sm font-bold text-white/70" }, "\u2190 Volver a Qu\u00E9 hacer"),
                React.createElement("span", { className: "block mt-10 text-amber-400 text-xs font-black uppercase tracking-[.25em]" }, "La ciudad desde tu c\u00E1mara"),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black uppercase mt-2" }, "Fotografiar R\u00EDo"),
                React.createElement("p", { className: "max-w-2xl text-slate-300 mt-5" },
                    FOTOGRAFIA_DATA.length,
                    " localizaciones con la mejor hora, encuadre sugerido, acceso y mapa."))),
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-10" },
            React.createElement("div", { className: "flex gap-2 overflow-x-auto no-scrollbar" }, tipos.map(x => React.createElement("button", { key: x, onClick: () => setTipo(x), className: `shrink-0 px-4 py-2 rounded-full text-xs font-bold border ${tipo === x ? 'bg-amber-400 border-amber-400 text-slate-950' : 'border-slate-200'}` }, x))),
            React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8" }, lista.map(x => React.createElement("article", { key: x.id, className: "rounded-3xl overflow-hidden border border-slate-100 " },
                React.createElement("div", { className: "h-48 relative" },
                    React.createElement("img", { src: x.img, alt: x.nombre, loading: "lazy", className: "w-full h-full object-cover" }),
                    React.createElement("span", { className: "absolute top-3 left-3 bg-slate-950/80 text-white rounded-full px-3 py-1 text-[10px] font-black" }, x.tipo)),
                React.createElement("div", { className: "p-5" },
                    React.createElement("span", { className: "text-amber-600 text-xs font-black uppercase" },
                        x.zona,
                        " \u00B7 ",
                        x.acceso),
                    React.createElement("h2", { className: "font-black text-xl mt-1" }, x.nombre),
                    React.createElement("p", { className: "text-xs font-bold text-teal-700 mt-3" },
                        "\uD83D\uDD50 ",
                        x.mejorHora),
                    React.createElement("p", { className: "text-sm text-slate-600 mt-3 leading-relaxed" }, x.consejo),
                    React.createElement("a", { href: x.mapa, target: "_blank", rel: "noopener noreferrer", className: "block mt-5 bg-slate-900 text-white text-center rounded-xl py-3 text-xs font-black uppercase" }, "Abrir mapa"))))),
            React.createElement("div", { className: "mt-12 bg-amber-50 border border-amber-200 rounded-3xl p-7" },
                React.createElement("h2", { className: "font-black text-xl" }, "C\u00E1mara, celular y drones"),
                React.createElement("p", { className: "text-sm text-slate-700 mt-2" }, "Evita cambiar lentes o exhibir equipos en calles vac\u00EDas. Pide permiso para primeros planos de personas. Para drones no basta con que el lugar parezca abierto: revisa registro, reglas de ANAC y autorizaci\u00F3n del espacio a\u00E9reo mediante SARPAS/DECEA; aeropuertos, helipuertos, \u00E1reas militares, multitudes y unidades protegidas requieren especial atenci\u00F3n."),
                React.createElement("a", { href: "https://www.decea.mil.br/drone/", target: "_blank", rel: "noopener noreferrer", className: "inline-block mt-4 text-xs font-black text-teal-700 uppercase" }, "Consultar portal oficial de drones \u2192"))));
}
window.GuiaFotografia=GuiaFotografia;
