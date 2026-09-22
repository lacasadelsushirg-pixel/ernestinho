function Master4EntityDetailV4({ go }) { var _a, _b, _c, _d, _e, _f, _g, _h; const p = getCanonicalEntity(window.__ERNESTINHO_SELECTED_ENTITY__); if (!p)
    return React.createElement("div", { className: "min-h-screen p-8" },
        React.createElement("button", { onClick: () => go('master4_smart_rio') }, "\u2190 Volver"),
        React.createElement("h1", { className: "text-3xl font-black mt-8" }, "No encontr\u00E9 esta ficha.")); const img = p.canonical.mainImage; const fields = [['⏱️', 'Tiempo recomendado', ((_a = p.visit) === null || _a === void 0 ? void 0 : _a.raw) || ((_b = p.visit) === null || _b === void 0 ? void 0 : _b.ideal) && `${p.visit.ideal} min`], ['💰', 'Precio', ((_c = p.pricing) === null || _c === void 0 ? void 0 : _c.raw) || p.priceMode], ['🕐', 'Horario', (_d = p.operation) === null || _d === void 0 ? void 0 : _d.hoursText], ['♿', 'Accesibilidad', (_e = p.accessibility) === null || _e === void 0 ? void 0 : _e.raw], ['🚇', 'Cómo llegar', (_f = p.transport) === null || _f === void 0 ? void 0 : _f.raw], ['💡', 'Dica Ernestinho', (_g = p.editorial) === null || _g === void 0 ? void 0 : _g.ernestinhoTip]].filter(x => x[2]); return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
    React.createElement("header", { className: "max-w-6xl mx-auto px-4 pt-6" },
        React.createElement("button", { onClick: () => go('master4_smart_rio'), className: "text-xs font-black" }, "\u2190 AQU\u00CD \u00B7 AHORA"),
        React.createElement("div", { className: "mt-5 rounded-[2rem] overflow-hidden bg-slate-950 text-white" },
            img && React.createElement("div", { className: "aspect-[16/7]" },
                React.createElement("img", { src: img, className: "w-full h-full object-cover" })),
            React.createElement("div", { className: "p-7 sm:p-10" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-300" },
                    "\uD83D\uDCCD FICHA CAN\u00D3NICA \u00B7 ",
                    p.neighborhood || p.zone || 'Río'),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2" }, p.name),
                React.createElement("p", { className: "mt-3 text-white/70 max-w-3xl" }, ((_h = p.editorial) === null || _h === void 0 ? void 0 : _h.idealFor) || p.whyGo || p.subtype)))),
    React.createElement("main", { className: "max-w-6xl mx-auto px-4" },
        React.createElement("div", { className: "grid md:grid-cols-2 gap-3 mt-5" }, fields.map(([ic, n, v]) => React.createElement("section", { key: n, className: "rounded-[1.5rem] bg-white border p-5" },
            React.createElement("div", { className: "text-xl" }, ic),
            React.createElement("h3", { className: "font-black mt-2" }, n),
            React.createElement("p", { className: "text-sm text-slate-600 mt-2 leading-relaxed" }, v)))),
        p.canonical.mapUrl && React.createElement("a", { href: p.canonical.mapUrl, target: "_blank", rel: "noreferrer", className: "block mt-4 rounded-2xl bg-slate-950 text-white p-4 text-center text-xs font-black" }, "\uD83D\uDCCD ABRIR MAPA"),
        React.createElement("div", { className: "mt-8" }, React.createElement(V4FitBlock, { entity: p })))); }
// ===== ERNESTINHO INTELLIGENCE V4.4 · DECISION ENGINE + MEDIA + SPECIAL CONTEXT =====
window.Master4EntityDetailV4=Master4EntityDetailV4;
