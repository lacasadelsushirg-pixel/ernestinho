function ActividadNuevaDetalle({ actividad, onVolver, lang = 'es' }) {
    const T = (v) => { if (v == null) return v; const z=String(v); const g=(window.GLOBAL_UI_TRANSLATIONS&&window.GLOBAL_UI_TRANSLATIONS[lang])||{}; return lang==='es'?z:(g[z]||z); };
    if (!actividad)
        return null;
    const whatsapp = `https://wa.me/5521969946938?text=${encodeURIComponent(`Hola Ernestinho, quiero reservar: ${actividad.titulo}. Fecha: ____ Personas: ____`)}`;
    const canonical = getCanonicalEntity(actividad.id) || getCanonicalEntity(T(actividad.titulo));
    return React.createElement("section", { className: "min-h-screen bg-slate-50 pb-24" },
        React.createElement("div", { className: "relative bg-slate-950 text-white overflow-hidden" },
            React.createElement("img", { src: actividad.miniatura, alt: actividad.titulo, className: "absolute inset-0 w-full h-full object-cover opacity-35" }),
            React.createElement("div", { className: "relative max-w-6xl mx-auto px-4 py-20 sm:py-28" },
                React.createElement("span", { className: "text-amber-400 text-xs font-black uppercase tracking-widest" }, T(actividad.categoria)),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black uppercase mt-3" }, T(actividad.titulo)),
                React.createElement("p", { className: "max-w-3xl text-lg text-slate-200 mt-5" }, T(actividad.intro)),
                React.createElement("div", { className: "flex flex-wrap gap-3 mt-7" },
                    React.createElement("span", { className: "bg-amber-400 text-slate-950 rounded-full px-5 py-2 font-black" }, T(actividad.precio)),
                    React.createElement("span", { className: "bg-white/10 rounded-full px-5 py-2 font-bold" }, T(actividad.duracion))))),
        React.createElement("div", { className: "max-w-6xl mx-auto px-4 py-10" },
            React.createElement("div", { className: "grid lg:grid-cols-[1fr_320px] gap-8 mt-6" },
                React.createElement("article", { className: "bg-white rounded-3xl p-6 sm:p-9 " },
                    React.createElement("div", { className: "space-y-5 text-slate-700 leading-relaxed" }, actividad.parrafos.map((p, i) => React.createElement("p", { key: i }, T(p)))),
                    actividad.opciones && React.createElement("div", { className: "bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mt-8" },
                        React.createElement("h2", { className: "text-xl font-black" }, T("Informaci\u00F3n y opciones")),
                        React.createElement("ul", { className: "mt-4 space-y-3" }, actividad.opciones.map(x => React.createElement("li", { key: x, className: "flex gap-2" },
                            React.createElement("span", { className: "text-emerald-600" }, "\u2713"),
                            React.createElement("span", null, T(x))))))),
                React.createElement("aside", { className: "bg-slate-950 text-white rounded-3xl p-6 h-fit" },
                    React.createElement("h2", { className: "text-xl font-black" }, T("Reserva con Ernestinho")),
                    React.createElement("p", { className: "text-sm text-slate-300 mt-3" }, T(actividad.grupo)),
                    React.createElement("p", { className: "text-sm text-slate-300 mt-2" },
                        "\uD83D\uDCCD ",
                        T(actividad.encuentro)),
                    React.createElement("a", { href: whatsapp, target: "_blank", rel: "noopener noreferrer", className: "block text-center bg-emerald-500 text-slate-950 rounded-full px-5 py-4 font-black mt-6" }, T("Reservar por WhatsApp")),
                    actividad.video && React.createElement("a", { href: actividad.video, target: "_blank", rel: "noopener noreferrer", className: "block text-center bg-red-600 rounded-full px-5 py-3 font-black mt-3" }, T("Ver video")),
                    actividad.instagram && React.createElement("a", { href: actividad.instagram, target: "_blank", rel: "noopener noreferrer", className: "block text-center bg-fuchsia-600 rounded-full px-5 py-3 font-black mt-3" }, T("Ver en Instagram")))),
            actividad.imagenes && React.createElement("div", { className: "grid md:grid-cols-2 gap-6 mt-8" }, actividad.imagenes.map(([alt, src]) => React.createElement("figure", { key: src, className: "bg-white rounded-3xl overflow-hidden " },
                React.createElement("img", { src: src, alt: T(alt), className: "w-full h-72 object-cover" }),
                React.createElement("figcaption", { className: "p-4 text-sm font-bold" }, T(alt))))),
            actividad.imagenesCompletas && React.createElement("div", { className: "space-y-8 mt-8" }, actividad.imagenesCompletas.map(([alt, src]) => React.createElement("figure", { key: src, className: "bg-white rounded-3xl overflow-hidden  p-3" },
                React.createElement("img", { src: src, alt: T(alt), className: "block w-full h-auto object-contain" }),
                React.createElement("figcaption", { className: "px-3 py-4 text-sm font-bold" },
                    T(alt),
                    T(" · imagen completa sin recorte"))))),
            canonical && React.createElement("div", { className: "mt-10" }, React.createElement(V4FitBlock, { entity: canonical }))));
}
// LISTA_20_CONSEJOS externalizado a JSON
window.ActividadNuevaDetalle=ActividadNuevaDetalle;
