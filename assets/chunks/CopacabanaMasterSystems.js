function CopacabanaMasterSystems({ go }) {
    const [active, setActive] = useState('descubre');
    const current = COPA_MASTER_SYSTEMS.find(x => x.id === active) || COPA_MASTER_SYSTEMS[0];
    const copaImages = {
        descubre: 'https://res.cloudinary.com/qa301cbc/image/upload/v1788448793/COPACABANA.jpg',
        hacer: 'https://res.cloudinary.com/qa301cbc/image/upload/v1788390184/forte_copa.jpg',
        comer: 'https://res.cloudinary.com/qa301cbc/image/upload/v1788393689/confeitaria-colombo_copa.jpg',
        organiza: 'https://res.cloudinary.com/qa301cbc/image/upload/v1788957880/calzadao_de_copacanana_0001.jpg',
        parati: 'https://res.cloudinary.com/qa301cbc/image/upload/v1788448793/COPACABANA.jpg',
        momento: 'https://res.cloudinary.com/qa301cbc/image/upload/v1788385260/arpoador_fotos.jpg',
        rutas: 'https://res.cloudinary.com/qa301cbc/image/upload/v1788957880/calzadao_de_copacanana_0001.jpg',
        sos: 'https://res.cloudinary.com/qa301cbc/image/upload/v1788390184/forte_copa.jpg',
        parami: 'https://res.cloudinary.com/qa301cbc/image/upload/v1788448793/COPACABANA.jpg'
    };
    const jump = (id) => {
        if (id === 'comer' && go) go('gastronomia');
        else if (id === 'organiza' && go) go('transportes');
        else if (id === 'sos' && go) go('consejos');
        else if (id === 'parami' && go) go('copa_para_mi');
        else setActive(id);
    };
    return React.createElement("section", { className: "bg-[#071313] text-white min-h-screen pb-16" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-5 sm:pt-8" },
            React.createElement("div", { className: "relative rounded-[1.8rem] sm:rounded-[2.2rem] overflow-hidden min-h-[300px] sm:min-h-[420px]  border border-white/10" },
                React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/v1788448793/COPACABANA.jpg", alt: "Copacabana, Rio de Janeiro", className: "absolute inset-0 w-full h-full object-cover" }),
                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" }),
                React.createElement("div", { className: "relative z-10 min-h-[300px] sm:min-h-[420px] flex flex-col justify-end p-6 sm:p-10" },
                    React.createElement("span", { className: "text-[10px] sm:text-xs font-black uppercase tracking-[.24em] text-amber-300" }, "COPACABANA · GUÍA ERNESTINHO"),
                    React.createElement("h2", { className: "text-4xl sm:text-6xl font-black mt-2 max-w-4xl leading-[.95]" }, "Un barrio, muchas maneras de vivirlo"),
                    React.createElement("p", { className: "text-sm sm:text-base text-white/80 mt-4 max-w-2xl leading-relaxed" }, "No quiero mostrarte solamente qué visitar. Quiero ayudarte a entender Copacabana, comer bien, resolver lo que necesites y descubrir qué hacer según el momento de tu viaje."))),
            React.createElement("div", { className: "mt-7" },
                React.createElement("div", { className: "flex items-end justify-between gap-4 mb-4" },
                    React.createElement("div", null,
                        React.createElement("span", { className: "text-[10px] font-black uppercase tracking-[.2em] text-amber-300" }, "EXPLORA A TU MANERA"),
                        React.createElement("h3", { className: "text-2xl sm:text-3xl font-black mt-1" }, "¿Qué necesitas de Copacabana?"))),
                React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3" }, COPA_MASTER_SYSTEMS.map(x => React.createElement("button", { key: x.id, onClick: () => jump(x.id), className: `group relative aspect-[4/3] sm:aspect-[5/4] overflow-hidden rounded-2xl text-left border transition ${active === x.id ? 'border-amber-300 ring-2 ring-amber-300/30' : 'border-white/10 hover:border-white/30'}` },
                    React.createElement("img", { src: copaImages[x.id] || copaImages.descubre, alt: x.title, className: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105", loading: "lazy" }),
                    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" }),
                    React.createElement("div", { className: "absolute inset-x-0 bottom-0 p-3 sm:p-4" },
                        React.createElement("span", { className: "text-lg sm:text-xl" }, x.icon),
                        React.createElement("strong", { className: "block text-[12px] sm:text-sm leading-tight mt-1 text-white" }, x.title))))),
                React.createElement("div", { className: "mt-6 rounded-[1.8rem] bg-[#102424] border border-white/10 overflow-hidden " },
                    React.createElement("div", { className: "grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]" },
                        React.createElement("div", { className: "relative min-h-[210px] sm:min-h-[300px]" },
                            React.createElement("img", { src: copaImages[current.id] || copaImages.descubre, alt: current.title, className: "absolute inset-0 w-full h-full object-cover" }),
                            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" }),
                            React.createElement("div", { className: "absolute left-5 bottom-5 right-5" },
                                React.createElement("span", { className: "text-3xl" }, current.icon),
                                React.createElement("h3", { className: "text-3xl sm:text-4xl font-black mt-1" }, current.title))),
                        React.createElement("div", { className: "p-5 sm:p-8" },
                            React.createElement("p", { className: "font-black text-amber-300 text-base sm:text-lg" }, current.subtitle),
                            React.createElement("p", { className: "text-sm text-white/70 mt-3 max-w-3xl leading-relaxed" }, current.body),
                            React.createElement("div", { className: "flex flex-wrap gap-2 mt-5" }, current.actions.map(v => React.createElement("span", { key: v, className: "rounded-full bg-white/10 border border-white/10 px-3 py-2 text-[10px] sm:text-xs font-bold" }, v))),
                            active === 'momento' && React.createElement("div", { className: "mt-7 grid grid-cols-2 lg:grid-cols-3 gap-3" }, MASTER3_SITUATIONS.slice(0, 6).map(([i, t, d]) => React.createElement("div", { key: t, className: "rounded-2xl bg-white/5 border border-white/10 p-3" }, React.createElement("span", null, i), React.createElement("strong", { className: "block text-xs mt-1" }, t), React.createElement("p", { className: "hidden sm:block text-[10px] text-white/50 mt-2" }, d)))),
                            active === 'sos' && React.createElement("div", { className: "mt-7 grid md:grid-cols-2 gap-3" }, window.COPA_SOS_GUIDES.map(g => React.createElement("article", { key: g.title, className: "rounded-2xl bg-red-950/30 border border-red-300/10 p-4" }, React.createElement("strong", { className: "text-sm" }, g.title), React.createElement("ol", { className: "mt-2 text-xs text-white/60 space-y-1" }, g.steps.map((s, i) => React.createElement("li", { key: s }, `${i + 1}. ${s}`))))))))))));
}
// removed unreachable RioParaTiMaster3
window.CopacabanaMasterSystems=CopacabanaMasterSystems;
