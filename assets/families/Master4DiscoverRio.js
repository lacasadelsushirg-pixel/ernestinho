function Master4DiscoverRio({ go }) {
    const cards = [
        ['🗺️', 'Entiende la ciudad', 'Abre nuestra guía profunda barrio por barrio: Copacabana, Ipanema, Leblon, Botafogo, Urca, Centro, Zona Norte, Barra + Ilha da Gigóia, Recreio, Vargens, Guaratiba, Sepetiba y mucho más.', 'barrios'],
        ['🏖️', 'Encuentra tu playa', 'Nuestro especial con las playas de Río, mapas, videos y fichas completas.', 'playas'],
        ['🏛️', 'Arte, historia y cultura', 'Museos, centros culturales, espacios literarios, teatros, iglesias y fortalezas.', 'master4_patrimonio'],
        ['🥾', 'Trekking y naturaleza', 'Trilhas, parques, floresta, miradores y naturaleza que ya tenemos cargados.', 'naturaleza'],
        ['🍽️', 'Tengo hambre ahora', 'Qué comer según dónde estás, presupuesto y ganas.', 'master4_gastronomia'],
        ['🎉', 'Después del atardecer', 'Samba, bares, música y vida nocturna.', 'nocturna']
    ];
    return React.createElement("div", { className: "bg-[#f7f7f4] min-h-screen pb-24" },
        React.createElement("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6" },
            React.createElement("button", { onClick: () => go('inicio'), className: "text-xs font-black" }, T("← INICIO")),
            React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white p-7 sm:p-10 overflow-hidden relative" },
                React.createElement("div", { className: "absolute -right-12 -top-12 w-52 h-52 bg-emerald-400/20 rounded-full blur-2xl" }),
                React.createElement("span", { className: "text-[10px] font-black text-amber-300 tracking-widest" }, "\uD83C\uDF34 DESCUBRE R\u00CDO"),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2 max-w-3xl" }, "\u00BFQu\u00E9 R\u00EDo quieres conocer?"),
                React.createElement("p", { className: "text-sm text-white/70 mt-3 max-w-2xl" }, "Entra directamente al cap\u00EDtulo que te interesa. El contenido profundo vive dentro de cada gu\u00EDa, no escondido detr\u00E1s de tarjetas de prueba."))),
        React.createElement("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-7" },
            React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3" }, cards.map(x => React.createElement("button", { key: x[1], onClick: () => go(x[3]), className: "text-left rounded-[1.7rem] bg-white border p-5 min-h-44 flex flex-col  transition-shadow" },
                React.createElement("span", { className: "text-3xl" }, x[0]),
                React.createElement("div", { className: "mt-auto" },
                    React.createElement("b", { className: "text-lg" }, x[1]),
                    React.createElement("p", { className: "text-xs text-slate-500 mt-1 leading-relaxed" }, x[2]),
                    React.createElement("span", { className: "text-[10px] font-black text-emerald-700 inline-block mt-3" }, "EXPLORAR \u2192")))))),
        React.createElement("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 pb-4" },
            React.createElement("button", { onClick: () => go('master4_city_registry'), className: "w-full rounded-[2rem] bg-slate-950 text-white p-6 sm:p-8 text-left flex items-center gap-5" },
                React.createElement("span", { className: "text-4xl" }, "\uD83D\uDD0E"),
                React.createElement("div", { className: "flex-1" },
                    React.createElement("span", { className: "text-[9px] font-black text-amber-300" }, "BUSCADOR GENERAL"),
                    React.createElement("h3", { className: "text-2xl font-black" }, "Buscar un lugar concreto"),
                    React.createElement("p", { className: "text-xs text-white/60 mt-1" }, "Para cuando ya sabes qu\u00E9 quieres encontrar.")),
                React.createElement("span", { className: "text-2xl" }, "\u2192"))));
}
window.Master4DiscoverRio=Master4DiscoverRio;
