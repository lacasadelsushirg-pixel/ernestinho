function GuiaRioCompleta({ onNavegar, onArticulo, tema, setTema, lang = 'es' }) {
    const T = (v) => { if (v == null) return v; if (typeof v === 'object' && !Array.isArray(v)) return v[lang] || v.es || v.pt || v.en || v; const z=String(v), g=(window.GLOBAL_UI_TRANSLATIONS&&window.GLOBAL_UI_TRANSLATIONS[lang])||{}; return lang==='es'?z:(g[z]||z); };
    const info = tema ? GUIA_INFO[tema] : null, grupos = [...new Set(GUIA_TEMAS.map(x => x.grupo))];
    if (info)
        return React.createElement("section", { className: "min-h-screen bg-slate-50 py-12" },
            React.createElement("article", { className: "max-w-4xl mx-auto px-4" },
                React.createElement("button", { onClick: () => { seoNavigate('/guia'); setTema(null); }, className: "font-black text-teal-700" }, T("← Volver a Guía de Río")),
                info.hero && React.createElement("div", { className: "mt-8 rounded-[2rem] overflow-hidden  bg-slate-200" },
                    React.createElement("img", { src: info.hero, alt: T(info.heroAlt || info.titulo), className: "w-full max-h-[540px] object-cover" })),
                React.createElement("h1", { className: "text-3xl sm:text-5xl font-black mt-8" }, T(info.titulo)),
                React.createElement("p", { className: "text-lg text-slate-600 mt-4" }, T(info.intro)),
                info.leadImage && React.createElement("div", { className: "mt-7 rounded-[2rem] overflow-hidden  bg-slate-100" }, React.createElement("img", { src: info.leadImage, alt: T(info.titulo), className: "w-full h-auto object-contain", loading: "lazy" })),
                info.consejo && React.createElement("div", { className: "mt-7 bg-amber-50 border-2 border-amber-300 rounded-3xl p-6" },
                    React.createElement("span", { className: "text-[11px] font-black uppercase tracking-widest text-amber-800" }, T("⭐ Consejo de Ernestinho")),
                    React.createElement("p", { className: "text-sm sm:text-base font-semibold text-amber-950 leading-relaxed mt-3" }, T(info.consejo))),
                React.createElement("div", { className: "space-y-5 mt-9" }, info.items.map(([t, p], i) => React.createElement("div", { key: t, className: "bg-white border border-slate-100 rounded-3xl p-6 " },
                    info.itemImages && info.itemImages[i] && React.createElement("div", { className: "mb-5 rounded-2xl overflow-hidden bg-slate-100" }, React.createElement("img", { src: info.itemImages[i], alt: T(t), className: "w-full h-auto object-contain", loading: "lazy" })),
                    React.createElement("span", { className: "text-teal-600 font-black text-xs" }, String(i + 1).padStart(2, '0')),
                    React.createElement("h2", { className: "text-xl font-black mt-2" }, T(t)),
                    React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed mt-3" }, T(p))))),
                info.rentcars && React.createElement(RentcarsAffiliateWidget, { lang: lang }),
                info.airalo && React.createElement(AiraloAffiliateWidget, { lang: lang }),
                info.assistcard && React.createElement(AssistCardAffiliate, { lang: lang }),
                info.links && React.createElement("div", { className: "flex flex-wrap gap-3 mt-8" }, info.links.map(([t, u]) => React.createElement("a", { key: t, href: u, target: "_blank", rel: "noopener noreferrer", className: "bg-blue-700 text-white rounded-full px-5 py-3 text-xs font-black" },
                    T(t),
                    " \u2197"))),
                React.createElement("p", { className: "text-xs text-slate-500 mt-8" }, T("Información revisada en septiembre de 2026. Confirma los requisitos con Migraciones, el consulado y la aerolínea antes del viaje."))));
    return React.createElement("section", { className: "min-h-screen bg-slate-50 pb-20" },
        React.createElement("div", { className: "bg-gradient-to-br from-slate-950 via-teal-950 to-teal-700 text-white" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 py-16" },
                React.createElement("span", { className: "text-amber-400 text-xs font-black uppercase tracking-[.25em]" }, T("Antes y durante tu viaje")),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black uppercase mt-3" }, T("Guía de Río")),
                React.createElement("p", { className: "max-w-2xl mt-5 text-teal-50 text-lg" }, T("Prepara tu viaje, llega tranquilo y encuentra rápidamente la información esencial.")))),
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 py-12" }, grupos.map(g => React.createElement("div", { key: g, className: "mb-12" },
            React.createElement("h2", { className: "text-2xl font-black" }, T(g)),
            React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5" }, GUIA_TEMAS.filter(x => x.grupo === g).map(x => React.createElement((!x.sec && x.legacy === undefined) ? "a" : "button", { key: x.id, href: (!x.sec && x.legacy === undefined) ? `/guia/${seoSlug((GUIA_INFO[x.id] && GUIA_INFO[x.id].titulo) || x.titulo || x.id)}` : undefined, onClick: (ev) => { if (x.sec) return onNavegar(x.sec); if (x.legacy !== undefined) return onArticulo(ARTICULOS_CONSEJOS[x.legacy]); if (!(ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey)) { ev.preventDefault(); seoNavigate(`/guia/${seoSlug((GUIA_INFO[x.id] && GUIA_INFO[x.id].titulo) || x.titulo || x.id)}`); setTema(x.id); } }, className: "block text-left bg-white border border-slate-100 rounded-3xl overflow-hidden   transition" },
                x.imagen ? React.createElement("div", { className: "w-full aspect-[8/3] bg-slate-100 overflow-hidden" },
                    React.createElement("img", { src: x.imagen, alt: T(x.titulo), className: "w-full h-full object-cover", loading: "lazy" })) : null,
                React.createElement("div", { className: "p-5" },
                    React.createElement("h3", { className: "font-black text-lg" }, T(x.titulo)),
                    React.createElement("p", { className: "text-xs text-slate-500 mt-2" }, T(x.resumen)),
                    React.createElement("span", { className: "block text-teal-700 text-[10px] font-black uppercase mt-4" }, T("Abrir →"))))))))));
}
// CONSEJOS_NUEVOS externalizado a JSON

// SEMANA_RIO externalizado a JSON

// LLUVIA_RIO externalizado a JSON
window.GuiaRioCompleta=GuiaRioCompleta;
