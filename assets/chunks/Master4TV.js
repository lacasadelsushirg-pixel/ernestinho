function Master4TV({ go, lang = 'es' }) {
    return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
        React.createElement("section", { className: "bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white px-5 py-12 sm:py-16" },
            React.createElement("div", { className: "max-w-6xl mx-auto" },
                React.createElement("button", { onClick: () => go('inicio'), className: "text-xs font-black text-white/60" }, "\u2190 VOLVER"),
                React.createElement("span", { className: "block mt-8 text-[10px] font-black tracking-[.2em] text-amber-300" }, "\uD83C\uDFA5 ERNESTINHO EN TV"),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2" }, "De R\u00EDo para Chile, Argentina y el mundo."),
                React.createElement("p", { className: "text-white/70 mt-3 max-w-2xl" }, "Reportajes, entrevistas y programas donde Ernestinho ha mostrado R\u00EDo de Janeiro a audiencias de otros pa\u00EDses."))),
        React.createElement("section", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-8" }, window.MASTER4_TV_REPORTS.length ? React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5" }, window.MASTER4_TV_REPORTS.map(v => React.createElement("article", { key: v.title, className: "bg-white rounded-3xl border overflow-hidden" },
            /\.(mov|mp4|webm)(?:$|\?)/i.test(v.url)
                ? React.createElement("video", { src: v.url, controls: true, playsInline: true, preload: "metadata", className: "aspect-video w-full object-cover bg-black" })
                : React.createElement("img", { src: v.image, alt: v.title, className: "aspect-video w-full object-cover" }),
            React.createElement("div", { className: "p-5" },
                React.createElement("small", { className: "font-black text-teal-700" },
                    v.channel,
                    " \u00B7 ",
                    v.country),
                React.createElement("h2", { className: "font-black text-xl mt-1" }, v.title),
                React.createElement("p", { className: "text-sm text-slate-500 mt-2" }, v.desc),
                React.createElement("a", { href: v.url, target: "_blank", rel: "noopener noreferrer", className: "inline-flex mt-4 rounded-full bg-slate-950 text-white px-5 py-3 text-xs font-black" }, "\u25B6 VER REPORTAJE"))))) : React.createElement("div", { className: "rounded-[2rem] bg-white border p-8 sm:p-12 text-center" },
            React.createElement("span", { className: "text-5xl" }, "\uD83D\uDCFA"),
            React.createElement("h2", { className: "text-2xl font-black mt-4" }, "La sala de prensa ya est\u00E1 preparada."),
            React.createElement("p", { className: "text-sm text-slate-500 mt-2 max-w-xl mx-auto" }, "Aqu\u00ED iremos colocando las portadas reales, canal, pa\u00EDs y enlace de cada aparici\u00F3n. No voy a inventar ni completar videos sin el enlace original."))));
}

// window.RIO_HOJE_FALLBACK_EVENTS externalizado a JSON
window.Master4TV=Master4TV;
