function Master4SituationEngine({ go }) {
    const [who, setWho] = useState('Primera vez');
    const [time, setTime] = useState('1 día');
    const [mood, setMood] = useState('Quiero lo esencial');
    const [situation, setSituation] = useState('Normal');
    const profiles = ['Primera vez', 'Pareja', 'Familia', 'Solo', 'Mayores', 'Movilidad reducida'];
    const times = ['4 horas', '1 día', '2–3 días', '5+ días'];
    const moods = ['Quiero lo esencial', 'Playa', 'Cultura', 'Naturaleza', 'Comer', 'Algo diferente'];
    const situations = ['Normal', '🌧️ Llueve', '🔥 Mucho calor', '⏱️ Poco tiempo', '💰 Bajo presupuesto', '😴 Estoy cansado'];
    const recommendation = () => {
        if (situation.includes('Llueve'))
            return ['🏛️', 'Río bajo techo', 'Museos + centro cultural + una buena comida', 'master4_museos'];
        if (situation.includes('calor'))
            return ['🌊', 'Baja el ritmo', 'Playa temprano + pausa + atardecer', 'master4_playas'];
        if (situation.includes('Poco'))
            return ['📍', 'No cruces la ciudad', 'Elige una sola zona y vívela bien', 'master4_barrios'];
        if (situation.includes('presupuesto'))
            return ['🆓', 'Río también puede costar poco', 'Playa + barrio + mirador/parque', 'master4_descubre'];
        if (situation.includes('cansado'))
            return ['🌅', 'Haz menos, disfruta más', 'Un paseo corto + comida + paisaje', 'master4_descubre'];
        if (mood === 'Playa')
            return ['🏖️', 'Tu día mira al mar', 'Elige playa por ambiente y momento', 'master4_playas'];
        if (mood === 'Cultura')
            return ['🏛️', 'Historia sin correr', 'Centro / Porto + 1 o 2 espacios culturales', 'master4_patrimonio'];
        if (mood === 'Naturaleza')
            return ['🌿', 'Río verde', 'Parque, mirador o trilha según energía', 'master4_naturaleza'];
        if (mood === 'Comer')
            return ['🍽️', 'Come como parte del viaje', 'Barrio + comida + paseo cercano', 'master4_gastronomia'];
        return ['⭐', 'Río esencial', 'Un icono + un barrio + un gran momento', 'master4_descubre'];
    };
    const r = recommendation();
    return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
        React.createElement("header", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6" },
            React.createElement("button", { onClick: () => go('inicio'), className: "text-xs font-black" }, T("← INICIO")),
            React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white p-7 sm:p-10" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-300" }, "\u2764\uFE0F R\u00CDO PARA M\u00CD"),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2" }, "Dime c\u00F3mo est\u00E1s viajando. Yo te ayudo a ordenar R\u00EDo."),
                React.createElement("p", { className: "text-sm text-white/70 mt-3" }, "El Master 3 ya ten\u00EDa perfiles, tiempos y situaciones. Ahora empiezan a convertirse en una experiencia realmente utilizable."))),
        React.createElement("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-6" },
            [['¿Quién eres?', profiles, who, setWho], ['¿Cuánto tiempo tienes?', times, time, setTime], ['¿Qué te apetece?', moods, mood, setMood], ['¿Cambió algo?', situations, situation, setSituation]].map(x => React.createElement("section", { key: x[0], className: "mb-6" },
                React.createElement("h2", { className: "text-sm font-black mb-3" }, x[0]),
                React.createElement("div", { className: "flex gap-2 overflow-x-auto", style: { scrollbarWidth: 'none' } }, x[1].map(v => React.createElement("button", { key: v, onClick: () => x[3](v), className: `whitespace-nowrap rounded-full border px-4 py-3 text-xs font-black ${x[2] === v ? 'bg-slate-950 text-white' : 'bg-white'}` }, v))))),
            React.createElement("section", { className: "rounded-[2rem] bg-amber-100 p-7 sm:p-9" },
                React.createElement("span", { className: "text-4xl" }, r[0]),
                React.createElement("span", { className: "block mt-5 text-[10px] font-black text-amber-900" }, "\u2B50 LO QUE YO HAR\u00CDA AHORA"),
                React.createElement("h2", { className: "text-3xl font-black mt-1" }, r[1]),
                React.createElement("p", { className: "text-sm text-slate-700 mt-2" }, r[2]),
                React.createElement("div", { className: "mt-5 flex flex-wrap gap-2" },
                    React.createElement("button", { onClick: () => go(r[3]), className: "rounded-full bg-slate-950 text-white px-5 py-3 text-xs font-black" }, "VER MI OPCI\u00D3N \u2192"),
                    React.createElement("button", { onClick: () => go('master4_para_mi'), className: "rounded-full bg-white border px-5 py-3 text-xs font-black" }, "\u2661 GUARDAR"))),
            React.createElement("section", { className: "grid sm:grid-cols-3 gap-3 mt-5" }, [['👍', 'Otra buena opción', 'Algo compatible sin repetir el mismo plan'], ['🔄', 'Cambió mi plan', 'Recalcula sin empezar de cero'], ['🎲', 'Sorpréndeme', 'Algo compatible contigo, no algo aleatorio']].map(x => React.createElement("div", { key: x[1], className: "rounded-[1.5rem] bg-white border p-5" },
                React.createElement("span", { className: "text-2xl" }, x[0]),
                React.createElement("b", { className: "block mt-4" }, x[1]),
                React.createElement("p", { className: "text-xs text-slate-500 mt-1" }, x[2]))))));
}
window.Master4SituationEngine=Master4SituationEngine;
