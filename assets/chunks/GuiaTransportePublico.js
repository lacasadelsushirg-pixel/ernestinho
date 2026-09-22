function GuiaTransportePublico({ onVolver, onMetro, modo, setModo }) {
    const x = modo && TRANSPORTE_RIO.find(t => t.id === modo);
    if (x)
        return React.createElement("section", { className: "min-h-screen bg-slate-50 py-10" },
            React.createElement("article", { className: "max-w-5xl mx-auto px-4" },
                React.createElement("button", { onClick: () => setModo(null), className: "font-black text-teal-700" }, "\u2190 Volver a todos los transportes"),
                React.createElement("div", { className: "mt-7 rounded-3xl overflow-hidden h-64 sm:h-96" },
                    React.createElement("img", { src: x.foto, alt: x.nombre, className: "w-full h-full object-cover" })),
                React.createElement("span", { className: "text-5xl block mt-7" }, x.icon),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-3" }, x.nombre),
                React.createElement("p", { className: "text-lg text-slate-600 leading-relaxed mt-5" }, x.descripcion),
                React.createElement("div", { className: "grid sm:grid-cols-3 gap-4 mt-8" },
                    React.createElement("div", { className: "bg-white rounded-2xl p-5" },
                        React.createElement("b", null, "Ideal para"),
                        React.createElement("p", { className: "text-sm text-slate-600 mt-2" }, x.ideal)),
                    React.createElement("div", { className: "bg-white rounded-2xl p-5" },
                        React.createElement("b", null, "Tarifa"),
                        React.createElement("p", { className: "text-sm text-slate-600 mt-2" }, x.precio)),
                    React.createElement("div", { className: "bg-white rounded-2xl p-5" },
                        React.createElement("b", null, "C\u00F3mo pagar"),
                        React.createElement("p", { className: "text-sm text-slate-600 mt-2" }, x.pago))),
                React.createElement("div", { className: "bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 mt-7" },
                    React.createElement("b", null, "\u2B50 Consejos de Ernestinho"),
                    React.createElement("ul", { className: "mt-3 space-y-2 text-sm text-slate-700" }, x.consejos.map(c => React.createElement("li", { key: c },
                        "\u2713 ",
                        c)))),
                React.createElement("div", { className: "flex flex-wrap gap-3 mt-7" },
                    React.createElement("a", { href: x.mapa, target: "_blank", rel: "noopener noreferrer", className: "bg-slate-900 text-white rounded-full px-6 py-3 font-black text-sm" }, "Abrir mapa"),
                    React.createElement("a", { href: x.oficial, target: "_blank", rel: "noopener noreferrer", className: "bg-teal-600 text-white rounded-full px-6 py-3 font-black text-sm" }, "Horarios y tarifas oficiales"),
                    x.id === 'metro' && React.createElement("button", { onClick: onMetro, className: "bg-blue-700 text-white rounded-full px-6 py-3 font-black text-sm" }, "Gu\u00EDa ampliada del Metro"))));
    return React.createElement("section", { className: "min-h-screen bg-slate-50 pb-20" },
        React.createElement("div", { className: "bg-slate-950 text-white" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 py-14" },
                React.createElement("button", { onClick: onVolver, className: "text-white/70 font-bold" }, T("← Volver a Guía de Río")),
                React.createElement("span", { className: "block text-amber-400 text-xs font-black uppercase tracking-widest mt-9" }, "Moverse sin perderse"),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2" }, "TRANSPORTE EN R\u00CDO"),
                React.createElement("p", { className: "max-w-3xl text-slate-300 mt-4" }, "Elige el sistema seg\u00FAn tu destino, horario, equipaje y cantidad de personas. Las tarifas pueden cambiar: comprueba siempre el canal oficial."))),
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 py-10" },
            React.createElement("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6" }, TRANSPORTE_RIO.map(t => React.createElement("button", { key: t.id, onClick: () => setModo(t.id), className: "text-left bg-white rounded-3xl overflow-hidden  border border-slate-100  transition" },
                React.createElement("div", { className: "h-48" },
                    React.createElement("img", { src: t.foto, alt: t.nombre, className: "w-full h-full object-cover" })),
                React.createElement("div", { className: "p-6" },
                    React.createElement("span", { className: "text-4xl" }, t.icon),
                    React.createElement("h2", { className: "text-2xl font-black mt-3" }, t.nombre),
                    React.createElement("p", { className: "text-sm text-slate-600 mt-3 line-clamp-3" }, t.descripcion),
                    React.createElement("span", { className: "block text-teal-700 text-xs font-black uppercase mt-5" }, "Abrir gu\u00EDa \u2192"))))),
            React.createElement("div", { className: "mt-10 bg-emerald-600 text-white rounded-3xl p-7 sm:p-9" },
                React.createElement("h2", { className: "text-2xl font-black" }, "\u00BFMuchas maletas, ni\u00F1os o un grupo?"),
                React.createElement("p", { className: "mt-2 text-emerald-50" }, "Podemos organizar un veh\u00EDculo adecuado y llevarte directamente al destino."),
                React.createElement("a", { href: "https://wa.me/5521969946938?text=Hola%20Ernestinho%2C%20quiero%20cotizar%20un%20transporte.", target: "_blank", rel: "noopener noreferrer", className: "inline-block mt-5 bg-white text-emerald-800 rounded-full px-6 py-3 font-black" }, "Cotizar con Ernestinho"))));
}
/* ===================================================== */
/* FASE 6 · MVP REAL — ❤️ COPACABANA PARA MÍ · MOTOR v1.0 */
/* ===================================================== */
// COPACABANA_PLACES_V1 externalizado a JSON
window.GuiaTransportePublico=GuiaTransportePublico;
