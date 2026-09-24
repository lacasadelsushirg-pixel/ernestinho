function Master4LiveRio({ go }) {
    return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
        React.createElement("section", { className: "bg-slate-950 text-white px-5 py-12 sm:py-16" },
            React.createElement("div", { className: "max-w-6xl mx-auto" },
                React.createElement("button", { onClick: () => go('inicio'), className: "text-xs font-black text-white/60" }, "\u2190 VOLVER"),
                React.createElement("span", { className: "block mt-8 text-[10px] font-black tracking-[.2em] text-red-400" }, "\uD83D\uDD34 R\u00CDO EN VIVO"),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2" }, "Mira c\u00F3mo est\u00E1 R\u00EDo ahora mismo."),
                React.createElement("p", { className: "text-white/70 mt-3 max-w-2xl" }, "C\u00E1maras p\u00FAblicas externas para echar un vistazo a la ciudad antes de salir. Una c\u00E1mara puede dejar de transmitir temporalmente; por eso abrimos siempre la fuente original."))),
        React.createElement("section", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-8 grid sm:grid-cols-2 gap-4" }, window.MASTER4_LIVE_CAMERAS.map(c => React.createElement("article", { key: c.name, className: "rounded-[1.8rem] bg-white border  p-6 flex flex-col min-h-60" },
            React.createElement("div", { className: "flex justify-between gap-3" },
                React.createElement("span", { className: "text-4xl" }, c.icon),
                React.createElement("span", { className: "h-fit rounded-full bg-red-50 text-red-700 px-3 py-1 text-[9px] font-black" },
                    "\u25CF ",
                    c.badge)),
            React.createElement("div", { className: "mt-auto pt-8" },
                React.createElement("small", { className: "font-black text-emerald-700" }, c.where),
                React.createElement("h2", { className: "text-xl font-black mt-1" }, c.name),
                React.createElement("p", { className: "text-sm text-slate-500 mt-2" }, c.desc),
                React.createElement("a", { href: c.url, target: "_blank", rel: "noopener noreferrer", className: "inline-flex mt-5 rounded-full bg-slate-950 text-white px-5 py-3 text-xs font-black" }, "\u25B6 VER C\u00C1MARA EN VIVO"))))),
        React.createElement("section", { className: "max-w-6xl mx-auto px-4 sm:px-6" },
            React.createElement("div", { className: "rounded-3xl bg-amber-50 border border-amber-200 p-5 text-sm text-amber-950" },
                React.createElement("b", null, "Consejo Ernestinho:"),
                " la imagen ayuda a ver nubes, movimiento y aspecto del mar, pero no reemplaza los boletines oficiales de lluvia, oleaje o balneabilidad.")));
}

window.MASTER4_TV_REPORTS.push({title:'Noticiero Canal 13',channel:'Canal 13',country:'Chile',desc:'Ernestinho desde Río de Janeiro',url:'https://res.cloudinary.com/tdez3h4t/video/upload/v1789923603/MECM6074.mov',image:''});
window.Master4LiveRio=Master4LiveRio;
