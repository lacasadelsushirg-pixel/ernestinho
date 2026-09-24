function Master3MonthWeatherPlanner({ lang = 'es' }) {
    const [tab, setTab] = useState('month');
    const L = MASTER3_MONTH_UI_I18N[lang] || MASTER3_MONTH_UI_I18N.es;
    const months = MASTER3_MONTH_I18N[lang] || MASTER3_MONTH_I18N.es;
    const rain = MASTER3_RAIN_I18N[lang] || MASTER3_RAIN_I18N.es;
    const heat = MASTER3_HEAT_I18N[lang] || MASTER3_HEAT_I18N.es;
    return React.createElement("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-10" },
        React.createElement("div", { className: "rounded-[2.2rem] bg-white border overflow-hidden" },
            React.createElement("div", { className: "bg-sky-950 text-white p-7 sm:p-9" },
                React.createElement("span", { className: "text-[10px] font-black tracking-widest text-sky-300" }, L.kicker),
                React.createElement("h2", { className: "text-3xl font-black mt-2" }, L.title),
                React.createElement("div", { className: "flex gap-2 mt-5" }, [['month', L.tabs[0]], ['rain', L.tabs[1]], ['heat', L.tabs[2]]].map(([id, t]) => React.createElement("button", { key: id, onClick: () => setTab(id), className: `rounded-full px-4 py-2 text-xs font-black ${tab === id ? 'bg-white text-sky-950' : 'bg-white/10'}` }, t)))),
            React.createElement("div", { className: "p-6 sm:p-8" },
                tab === 'month' && React.createElement("div", { className: "space-y-4" }, months.map(x => React.createElement("details", { key: x.mes, className: "rounded-[1.6rem] bg-sky-50 border border-sky-100 p-0 overflow-hidden" },
                    React.createElement("summary", { className: "cursor-pointer list-none p-5 sm:p-6 flex items-center gap-4" }, React.createElement("span", { className: "text-3xl" }, x.icon), React.createElement("div", { className: "flex-1" }, React.createElement("strong", { className: "text-xl" }, x.mes), React.createElement("p", { className: "text-xs font-bold text-sky-700 mt-1" }, x.titulo)), React.createElement("span", { className: "text-xl" }, "＋")),
                    React.createElement("div", { className: "border-t border-sky-100 bg-white p-5 sm:p-6 grid md:grid-cols-2 gap-3" }, [['clima',x.clima],['mar',x.mar],['movimiento',x.movimiento],['eventos',x.eventos],['precios',x.precios],['maleta',x.maleta],['ideal',x.ideal],['ojo',x.ojo]].map(([k,d],i)=>React.createElement("div",{key:k,className:"rounded-2xl bg-slate-50 p-4"},React.createElement("b",{className:"text-xs"},L.labels[i]),React.createElement("p",{className:"text-xs text-slate-600 leading-relaxed mt-2"},d))), React.createElement("div",{className:"md:col-span-2 rounded-2xl bg-amber-100 p-5"},React.createElement("b",{className:"text-xs text-amber-900"},L.tip),React.createElement("p",{className:"text-sm font-semibold text-amber-950 mt-2"},x.ernestinho))))),
                tab === 'rain' && React.createElement("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-3" }, rain.map(([t,d])=>React.createElement("article",{key:t,className:"rounded-2xl bg-slate-50 p-5"},React.createElement("strong",null,t),React.createElement("p",{className:"text-xs text-slate-500 mt-3"},d)))),
                tab === 'heat' && React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-5 gap-3" }, heat.map(([t,d])=>React.createElement("article",{key:t,className:"rounded-2xl bg-orange-50 p-5"},React.createElement("strong",{className:"text-orange-800"},t),React.createElement("p",{className:"text-xs mt-3"},d))))))));
}
const MASTER3_CARNIVAL_REAL = [
    ['Sambódromo', 'Desfiles de escolas de samba; experiencia con entrada, sector, acceso y logística propios.'],
    ['Bloco', 'Carnaval callejero. Cada bloco tiene fecha, recorrido, público y escala diferentes.'],
    ['Quadra', 'Casa/espacio de una escola de samba; ensayos y eventos dependen de agenda.'],
    ['Cidade do Samba', 'Complejo vinculado a las escolas del Grupo Especial; visita y experiencias según operación.'],
    ['Ensaio técnico', 'Ensayo en el Sambódromo; calendario específico, no confundir con desfile oficial.'],
    ['Bateria', 'Corazón rítmico de la escola; no es solo percusión, tiene estructura y funciones.'],
    ['Samba-enredo', 'Canción narrativa que desarrolla el enredo anual de la escola.'],
    ['Ala / carro', 'Partes del desfile con funciones visuales y narrativas diferentes.']
];
const MASTER3_FOOTBALL_REAL = [
    ['Tour Maracanã', 'Visita al estadio; operación independiente de un partido.'],
    ['Día de partido', 'Entrada + reconocimiento/acceso vigente + transporte + hora de llegada + salida.'],
    ['Flamengo', 'Club de enorme presencia popular; no reducir su identidad únicamente al Maracanã.'],
    ['Fluminense', 'Historia profundamente ligada a Laranjeiras y al fútbol carioca.'],
    ['Vasco', 'São Januário y raíces sociales propias; experiencia territorial distinta.'],
    ['Botafogo', 'Nilton Santos y tradición del club; ubicación distinta del circuito Maracanã.'],
    ['Clásico', 'Demanda, seguridad, accesos y movilidad pueden cambiar mucho.'],
    ['Camisa', 'Evitar recomendaciones ingenuas de camisetas rivales en contextos sensibles de partido.']
];
window.Master3MonthWeatherPlanner=Master3MonthWeatherPlanner;
