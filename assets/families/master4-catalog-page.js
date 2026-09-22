function Master4CatalogPage({ kind, go }) {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('Todos');
    const [expanded, setExpanded] = useState(null);
    const cfg = {
        playas: { eyebrow: '🏖️ PLAYAS DE RÍO', title: 'No todas las playas sirven para lo mismo.', intro: 'Elige primero el tipo de día que quieres vivir.', filters: ['Todos', 'Primera vez', 'Familia', 'Fotos', 'Deporte', 'Tranquila'], cards: [
                ['Copacabana', 'La postal que también es un barrio', '🌊', 'Primera vez', 'master4_descubre'],
                ['Ipanema', 'Paisaje, cultura de playa y atardecer', '🌅', 'Fotos', 'master4_place_ipanema'],
                ['Arpoador', 'Piedra, surf y puesta de sol', '📸', 'Fotos', 'playa-arpoador'],
                ['Leme', 'Más familiar y tranquila al final de Copa', '👨‍👩‍👧', 'Familia', 'playa-leme'],
                ['Leblon', 'Playa urbana con ambiente de barrio', '☀️', 'Tranquila', 'playa-leblon'],
                ['Barra da Tijuca', 'Kilómetros de arena y deportes', '🏄', 'Deporte', 'playa-barra'],
                ['Prainha', 'Naturaleza y surf lejos del centro urbano', '🌿', 'Deporte', 'playa-prainha'],
                ['Grumari', 'Paisaje protegido y otro ritmo', '🌴', 'Tranquila', 'playa-grumari']
            ] },
        museos: { eyebrow: '🏛️ MUSEOS + CULTURA', title: 'Elige una historia, no una lista.', intro: 'Arte, historia, ciencia y edificios que también merecen la visita.', filters: ['Todos', 'Historia', 'Arte', 'Ciencia', 'Gratis', 'Arquitectura'], cards: [
                ['Museu Histórico Nacional', 'Brasil contado desde un conjunto histórico', '🏛️', 'Historia', 'museus'],
                ['Museu do Amanhã', 'Ciencia, futuro y arquitectura en Porto Maravilha', '🔭', 'Ciencia', 'master4_place_amanha'],
                ['Museu de Arte do Rio — MAR', 'Arte y ciudad frente a Praça Mauá', '🎨', 'Arte', 'master4_place_mar'],
                ['MAM Rio', 'Arte moderno junto al Aterro do Flamengo', '🖼️', 'Arte', 'master4_place_mam'],
                ['Museu da República', 'Palácio do Catete y la historia republicana', '🏰', 'Historia', 'master4_place_catete'],
                ['Museu Nacional de Belas Artes', 'Colección y memoria artística brasileña', '🎭', 'Arte', 'museus'],
                ['Museu Aeroespacial — MUSAL', 'Aviación y grandes aeronaves', '✈️', 'Historia', 'master4_place_musal'],
                ['Museu de Folclore Edison Carneiro', 'Cultura popular brasileña', '🇧🇷', 'Gratis', 'museus']
            ] },
        natureza: { eyebrow: '🌿 RÍO VERDE', title: 'Entre el océano y la floresta.', intro: 'Parques, miradores, trilhas y naturaleza para diferentes niveles de energía.', filters: ['Todos', 'Fácil', 'Mirador', 'Trilha', 'Parque', 'Aventura'], cards: [
                ['Parque Lage', 'Jardines, bosque y palacio', '🌳', 'Fácil', 'master4_place_lage'],
                ['Jardim Botânico', 'Colecciones botánicas y paseo tranquilo', '🌴', 'Parque', 'master4_place_jardim'],
                ['Floresta da Tijuca', 'La gran floresta dentro de la ciudad', '🌿', 'Parque', 'master4_place_tijuca'],
                ['Pedra Bonita', 'Una de las grandes vistas con trilha accesible para muchos viajeros', '🥾', 'Trilha', 'master4_place_pedra'],
                ['Pedra da Gávea', 'Una aventura exigente y emblemática', '⛰️', 'Aventura', 'pedra-gavea'],
                ['Mirante Dona Marta', 'Vista enorme sin una larga caminata', '📸', 'Mirador', 'mirante-dona-marta']
            ] }
    }[kind] || null;
    if (!cfg)
        return null;
    const visible = cfg.cards.filter(c => (filter === 'Todos' || c[3] === filter) && (!query || (`${c[0]} ${c[1]}`).toLowerCase().includes(query.toLowerCase())));
    return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
        React.createElement("header", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6" },
            React.createElement("button", { onClick: () => go('master4_descubre'), className: "text-xs font-black" }, "\u2190 CONOCER R\u00CDO"),
            React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white p-7 sm:p-10" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-300 tracking-widest" }, cfg.eyebrow),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2 max-w-4xl" }, cfg.title),
                React.createElement("p", { className: "text-sm text-white/70 mt-3" }, cfg.intro),
                React.createElement("input", { value: query, onChange: e => setQuery(e.target.value), placeholder: "Buscar aqu\u00ED\u2026", className: "mt-6 w-full max-w-xl rounded-2xl bg-white text-slate-900 px-5 py-4 text-sm outline-none" })),
            React.createElement("div", { className: "flex gap-2 overflow-x-auto py-5", style: { scrollbarWidth: 'none' } }, cfg.filters.map(f => React.createElement("button", { key: f, onClick: () => setFilter(f), className: `whitespace-nowrap rounded-full border px-4 py-3 text-xs font-black ${filter === f ? 'bg-slate-950 text-white' : 'bg-white'}` }, f)))),
        React.createElement("main", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
            React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3" }, visible.map((c, i) => React.createElement("article", { key: c[0], className: "rounded-[1.8rem] bg-white border overflow-hidden" },
                React.createElement("button", { onClick: () => setExpanded(expanded === c[0] ? null : c[0]), className: "w-full text-left p-5 min-h-48 flex flex-col" },
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", { className: "text-4xl" }, c[2]),
                        React.createElement("span", { className: "rounded-full bg-slate-100 px-3 py-2 text-[9px] font-black" }, c[3])),
                    React.createElement("div", { className: "mt-auto pt-8" },
                        React.createElement("h2", { className: "text-xl font-black" }, c[0]),
                        React.createElement("p", { className: "text-xs text-slate-500 mt-2" }, c[1]),
                        React.createElement("span", { className: "inline-block mt-4 text-[10px] font-black text-emerald-700" }, expanded === c[0] ? 'CERRAR ↑' : 'VER CAPÍTULO ↓'))),
                expanded === c[0] && React.createElement("div", { className: "border-t p-5 bg-slate-50" },
                    React.createElement("div", { className: "grid grid-cols-2 gap-2 text-xs" },
                        React.createElement("button", { onClick: () => go(c[4]), className: "rounded-xl bg-white border p-3 font-black text-left" }, "\uD83D\uDCD6 Historia / ficha"),
                        React.createElement("button", { onClick: () => go(c[4]), className: "rounded-xl bg-white border p-3 font-black text-left" }, "\uD83D\uDCCD C\u00F3mo llegar"),
                        React.createElement("button", { onClick: () => go(c[4]), className: "rounded-xl bg-white border p-3 font-black text-left" }, "\uD83D\uDCA1 Dica Ernestinho"),
                        React.createElement("button", { onClick: () => go(c[4]), className: "rounded-xl bg-white border p-3 font-black text-left" }, "\u2661 Guardar")),
                    React.createElement("button", { onClick: () => go(c[4]), className: "mt-3 w-full rounded-xl bg-slate-950 text-white p-3 text-xs font-black" }, "ABRIR INFORMACI\u00D3N COMPLETA \u2192"))))),
            !visible.length && React.createElement("div", { className: "rounded-3xl bg-white border p-10 text-center" },
                React.createElement("b", null, "No encontr\u00E9 resultados con ese filtro.")),
            React.createElement("div", { className: "mt-8 rounded-[2rem] bg-amber-100 p-6 sm:p-8" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-900" }, "\u2B50 DICA DO ERNESTINHO"),
                React.createElement("h3", { className: "text-2xl font-black mt-2" }, kind === 'playas' ? 'No elijas una playa solamente por fama.' : kind === 'museos' ? 'Combina cultura con el barrio donde ya vas a estar.' : 'En Río, naturaleza no siempre significa una trilha difícil.'),
                React.createElement("p", { className: "text-sm text-slate-700 mt-2" }, kind === 'playas' ? 'El mar, la hora, el ambiente y lo que quieres hacer pueden cambiar completamente cuál te conviene.' : kind === 'museos' ? 'Centro y Porto Maravilha permiten juntar varios lugares sin convertir el día en traslados interminables.' : 'Hay jardines, parques y miradores para distintos tiempos y niveles de esfuerzo.'))));
}
window.Master4CatalogPage=Master4CatalogPage;
