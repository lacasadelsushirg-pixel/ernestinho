function VidaNocturnaCompleta({ onVolver }) {
    const [dia, setDia] = useState('Todos');
    const [tipo, setTipo] = useState('Todos');
    const [zona, setZona] = useState('Todas');
    const zonas = ['Todas', ...new Set(VIDA_NOCTURNA_CON_FOTOS.map(x => x.zona))];
    const lista = VIDA_NOCTURNA_CON_FOTOS.filter(x => (dia === 'Todos' || x.dias.includes(dia)) && (tipo === 'Todos' || x.tipo === tipo) && (zona === 'Todas' || x.zona === zona));
    return React.createElement("section", { className: "min-h-screen bg-slate-950 text-white pb-20" },
        React.createElement("div", { className: "relative overflow-hidden" },
            React.createElement("img", { src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=85&w=1800", className: "absolute inset-0 w-full h-full object-cover opacity-35", alt: "Vida nocturna de R\u00EDo" }),
            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-slate-950 via-purple-950/90 to-slate-950/30" }),
            React.createElement("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24" },
                React.createElement("button", { onClick: onVolver, className: "text-white/80 hover:text-fuchsia-300 font-bold text-sm" }, "\u2190 Volver a Qu\u00E9 hacer"),
                React.createElement("span", { className: "block mt-10 text-fuchsia-300 text-xs font-black uppercase tracking-[.25em]" }, "R\u00EDo despu\u00E9s del atardecer"),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black uppercase mt-3" }, "Vida nocturna"),
                React.createElement("p", { className: "max-w-2xl mt-5 text-slate-200" }, "Samba, pagode, conciertos, rooftops y fiestas organizados por d\u00EDa, estilo y zona. Revisa siempre la agenda antes de salir."))),
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 -mt-5 relative" },
            React.createElement("div", { className: "bg-white text-slate-900 rounded-3xl p-5 sm:p-7  space-y-4" },
                React.createElement("div", null,
                    React.createElement("span", { className: "text-[10px] uppercase font-black text-slate-500" }, "D\u00EDa"),
                    React.createElement("div", { className: "flex overflow-x-auto no-scrollbar gap-2 mt-2" }, DIAS_NOCHE.map(x => React.createElement("button", { key: x, onClick: () => setDia(x), className: `shrink-0 px-4 py-2 rounded-full border text-xs font-bold ${dia === x ? 'bg-fuchsia-600 text-white border-fuchsia-600' : 'border-slate-200'}` }, x)))),
                React.createElement("div", null,
                    React.createElement("span", { className: "text-[10px] uppercase font-black text-slate-500" }, "Estilo"),
                    React.createElement("div", { className: "flex overflow-x-auto no-scrollbar gap-2 mt-2" }, TIPOS_NOCHE.map(x => React.createElement("button", { key: x, onClick: () => setTipo(x), className: `shrink-0 px-4 py-2 rounded-full border text-xs font-bold ${tipo === x ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200'}` }, x)))),
                React.createElement("div", null,
                    React.createElement("span", { className: "text-[10px] uppercase font-black text-slate-500" }, "Zona"),
                    React.createElement("select", { value: zona, onChange: e => setZona(e.target.value), className: "mt-2 w-full border border-slate-200 rounded-xl p-3 text-sm" }, zonas.map(x => React.createElement("option", { key: x }, x))))),
            React.createElement("p", { className: "text-slate-400 text-sm mt-8" },
                lista.length,
                " sugerencias encontradas"),
            React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4" }, lista.map(x => React.createElement("article", { key: x.id, className: "bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden" },
                React.createElement("div", { className: "h-44 relative" },
                    React.createElement("img", { src: x.img, alt: x.nombre, loading: "lazy", className: "w-full h-full object-cover" }),
                    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" }),
                    x.recomendado && React.createElement("span", { className: "absolute top-3 left-3 bg-fuchsia-500 text-white px-3 py-1 rounded-full text-[10px] font-black" }, "\u2B50 ERNESTINHO"),
                    React.createElement("span", { className: "absolute top-3 right-3 bg-white text-slate-900 px-3 py-1 rounded-full text-xs font-black" }, x.precio),
                    React.createElement("div", { className: "absolute bottom-3 left-4" },
                        React.createElement("span", { className: "text-fuchsia-300 text-[10px] font-black uppercase" }, x.barrio),
                        React.createElement("h2", { className: "font-black text-xl" }, x.nombre))),
                React.createElement("div", { className: "p-5" },
                    React.createElement("div", { className: "flex justify-between text-xs" },
                        React.createElement("span", { className: "text-fuchsia-300 font-bold" }, x.tipo),
                        React.createElement("span", { className: "text-slate-400" }, x.dias.join(' · '))),
                    React.createElement("p", { className: "text-slate-300 text-sm mt-3 leading-relaxed" }, x.destaque),
                    React.createElement("a", { href: x.mapa, target: "_blank", rel: "noopener noreferrer", className: "block mt-5 text-center bg-white hover:bg-fuchsia-500 hover:text-white text-slate-950 rounded-xl py-3 text-xs font-black uppercase" }, "Mapa y agenda"))))),
            React.createElement("div", { className: "mt-12 bg-fuchsia-950/60 border border-fuchsia-800 rounded-3xl p-7" },
                React.createElement("h2", { className: "text-xl font-black" }, "Antes de salir"),
                React.createElement("p", { className: "text-sm text-fuchsia-100 mt-2" }, "Los d\u00EDas indicados son orientativos. Confirma la agenda oficial, entrada, edad m\u00EDnima y horario. Para regresar de madrugada, solicita el transporte desde dentro del establecimiento y verifica matr\u00EDcula y conductor antes de subir."))));
}
window.VidaNocturnaCompleta=VidaNocturnaCompleta;
