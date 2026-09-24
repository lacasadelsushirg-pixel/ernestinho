function Master4HomeSearch({ go, lang = 'es', placeholder }) {
    const [q, setQ] = useState('');
    const clean = (v) => String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const nq = clean(q.trim());
    const results = nq ? MASTER4_SEARCH_INDEX.filter(x => clean(x.join(' ')).includes(nq)).slice(0, 8) : [];
    return React.createElement("div", { className: "mt-7 max-w-3xl relative" },
        React.createElement("div", { className: "rounded-[1.35rem] bg-white  border border-white/30 p-2 flex items-center gap-2" },
            React.createElement("span", { className: "text-xl pl-2" }, "\uD83D\uDD0E"),
            React.createElement("input", { value: q, onChange: e => setQ(e.target.value), placeholder: placeholder || (lang === 'pt' ? 'Busque Cristo, museus, Copacabana, restaurantes, trilhas...' : lang === 'en' ? 'Search Cristo, museums, Copacabana, restaurants, trails...' : 'Busca Cristo, museos, Copacabana, restaurantes, trilhas...'), className: "w-full bg-transparent text-slate-950 placeholder:text-slate-400 outline-none px-2 py-3 text-sm sm:text-base font-semibold" }),
            q && React.createElement("button", { onClick: () => setQ(''), className: "text-slate-400 hover:text-slate-800 px-3 font-black" }, "\u00D7")),
        nq && React.createElement("div", { className: "absolute left-0 right-0 top-[calc(100%+8px)] z-50 bg-white text-slate-950 rounded-[1.35rem]  border overflow-hidden max-h-[360px] overflow-y-auto" }, results.length ? results.map((r, i) => React.createElement("button", { key: r[0] + i, onClick: () => { setQ(''); go(r[2]); }, className: "w-full text-left px-4 py-3 border-b last:border-b-0 hover:bg-slate-50 flex gap-3 items-start" },
            React.createElement("span", { className: "text-lg" }, r[1] === 'En vivo' ? '🔴' : r[1] === 'Ernestinho' ? '🎥' : '📍'),
            React.createElement("span", { className: "flex-1" },
                React.createElement("b", { className: "block text-sm" }, r[0]),
                React.createElement("small", { className: "text-slate-500" },
                    r[1],
                    " \u00B7 ",
                    r[3])),
            React.createElement("span", { className: "text-emerald-700 font-black" }, "\u2192"))) : React.createElement("div", { className: "p-5 text-sm text-slate-500" }, "No encontr\u00E9 ese tema todav\u00EDa. Prueba otra palabra.")));
}


function Master4Home({ go, onReserve, lang = 'es' }) {
    const [saved, setSaved] = useState([]);
    useEffect(() => { try {
        setSaved(JSON.parse(localStorage.getItem('ernestinho-mi-rio-v2') || '[]'));
    }
    catch (e) { } }, []);
    const H = {
        es: {
            badge: '🇧🇷 UNA GUÍA HECHA DESDE RÍO', h1a: 'Río no se visita.', h1b: 'Se vive.',
            intro: 'Una guía hecha desde la experiencia real para que descubras Río de forma fácil, segura y auténtica.',
            today: '☀️ ¿QUÉ HAGO HOY?', todaySub: 'Ideas según tu tiempo', rioHoje: 'RÍO HOJE', rioHojeSub: 'Lo que está pasando ahora', routes: 'RECORRIDOS ERNESTINHO', routesSub: 'Próximamente', guide: '✈️ GUÍA PARA MI VIAJE', guideSub: 'Todo en un solo lugar',
            explore: 'Explora Río por categorías', exploreSub: 'Todo lo importante, sin obligarte a leer una enciclopedia.',
            cards: [['¿Qué hago hoy?', 'Planes para ahora'], ['Descubre Río', 'Todo Río en un solo lugar'], ['Mi Río ❤️', 'Mis lugares favoritos'], ['Experiencias', 'Tours y actividades'], ['Guía para tu viaje', 'Todo antes y durante tu viaje'], ['Necesito ayuda', 'Habla conmigo y resuelve dudas']],
            benefits: [['⭐', '+500 actividades', 'y lugares'], ['👥', 'Asesoría', 'personalizada'], ['🛡️', 'Información', 'confiable'], ['❤️', 'Río, explicado', 'en español']],
            featuredBadge: 'EXPERIENCIAS EN RÍO', featuredTitle: 'Vive momentos inolvidables en Río', featuredSub: 'Experiencias seleccionadas para descubrir la ciudad y sus alrededores.', featuredAll: 'VER TODAS →', details: 'VER DETALLES', reserve: 'RESERVAR', departure: 'Salida desde Río',
            featuredTags: ['MÁS ELEGIDO', 'DÍA COMPLETO', 'IMPERDIBLE', 'AGUAS CRISTALINAS', 'ISLAS Y PLAYAS'],
            liveBadge: '📊 RÍO EN VIVO', liveTitle: '¿Cómo está Río ahora?', liveText: 'Clima, mar y balneabilidad para ayudarte a decidir mejor.', liveCta: 'VER AHORA',
            firstBadge: '⭐ LO QUE YO HARÍA', firstTitle: '¿Es tu primera vez?', firstText: 'Empieza por lo esencial sin intentar conocer todo.', firstCta: 'PRIMERA VEZ EN RÍO →',
            friendBadge: '👋 TU AMIGO EN RÍO', friendTitle: 'Hola, soy Ernestinho.', friendText: 'Si necesitas ayuda con tours, transportes o cualquier duda, estoy aquí.', friendCta: 'HABLAR CONMIGO',
            search: 'Busca Cristo, museos, Copacabana, restaurantes, trilhas...'
        },
        pt: {
            badge: '🇧🇷 UM GUIA FEITO NO RIO', h1a: 'O Rio não se visita.', h1b: 'Se vive.',
            intro: 'Um guia criado a partir da experiência real para você descobrir o Rio de forma fácil, segura e autêntica.',
            today: '☀️ O QUE FAZER HOJE?', todaySub: 'Ideias de acordo com o seu tempo', rioHoje: 'RIO HOJE', rioHojeSub: 'O que está acontecendo agora', routes: 'ROTEIROS ERNESTINHO', routesSub: 'Em breve', guide: '✈️ GUIA PARA MINHA VIAGEM', guideSub: 'Tudo em um só lugar',
            explore: 'Explore o Rio por categorias', exploreSub: 'Tudo o que importa, sem precisar ler uma enciclopédia.',
            cards: [['O que fazer hoje?', 'Planos para agora'], ['Descubra o Rio', 'Todo o Rio em um só lugar'], ['Meu Rio ❤️', 'Meus lugares favoritos'], ['Experiências', 'Passeios e atividades'], ['Guia para sua viagem', 'Tudo antes e durante a viagem'], ['Preciso de ajuda', 'Fale comigo e tire suas dúvidas']],
            benefits: [['⭐', '+500 atividades', 'e lugares'], ['👥', 'Assessoria', 'personalizada'], ['🛡️', 'Informação', 'confiável'], ['❤️', 'Rio, explicado', 'em português']],
            featuredBadge: 'EXPERIÊNCIAS NO RIO', featuredTitle: 'Viva momentos inesquecíveis no Rio', featuredSub: 'Experiências selecionadas para descobrir a cidade e seus arredores.', featuredAll: 'VER TODAS →', details: 'VER DETALHES', reserve: 'RESERVAR', departure: 'Saída do Rio',
            featuredTags: ['MAIS ESCOLHIDO', 'DIA INTEIRO', 'IMPERDÍVEL', 'ÁGUAS CRISTALINAS', 'ILHAS E PRAIAS'],
            liveBadge: '📊 RIO AO VIVO', liveTitle: 'Como está o Rio agora?', liveText: 'Clima, mar e balneabilidade para ajudar você a decidir melhor.', liveCta: 'VER AGORA',
            firstBadge: '⭐ O QUE EU FARIA', firstTitle: 'É sua primeira vez?', firstText: 'Comece pelo essencial sem tentar conhecer tudo de uma vez.', firstCta: 'PRIMEIRA VEZ NO RIO →',
            friendBadge: '👋 SEU AMIGO NO RIO', friendTitle: 'Olá, eu sou o Ernestinho.', friendText: 'Se precisar de ajuda com passeios, transportes ou qualquer dúvida, estou aqui.', friendCta: 'FALAR COMIGO',
            search: 'Busque Cristo, museus, Copacabana, restaurantes, trilhas...'
        },
        en: {
            badge: '🇧🇷 A GUIDE MADE IN RIO', h1a: 'Rio is not just visited.', h1b: 'It is lived.',
            intro: 'A guide built from real local experience so you can discover Rio easily, safely and authentically.',
            today: '☀️ WHAT SHOULD I DO TODAY?', todaySub: 'Ideas that fit your time', rioHoje: 'RIO TODAY', rioHojeSub: 'What is happening now', routes: 'ERNESTINHO ROUTES', routesSub: 'Coming soon', guide: '✈️ GUIDE FOR MY TRIP', guideSub: 'Everything in one place',
            explore: 'Explore Rio by category', exploreSub: 'Everything that matters, without making you read an encyclopedia.',
            cards: [['What should I do today?', 'Ideas for right now'], ['Discover Rio', 'All of Rio in one place'], ['My Rio ❤️', 'My favorite places'], ['Experiences', 'Tours and activities'], ['Guide for your trip', 'Everything before and during your trip'], ['I need help', 'Talk to me and get answers']],
            benefits: [['⭐', '500+ activities', 'and places'], ['👥', 'Personalized', 'travel advice'], ['🛡️', 'Reliable', 'information'], ['❤️', 'Rio, explained', 'in English']],
            featuredBadge: 'EXPERIENCES IN RIO', featuredTitle: 'Make unforgettable memories in Rio', featuredSub: 'Selected experiences to discover the city and its surroundings.', featuredAll: 'SEE ALL →', details: 'VIEW DETAILS', reserve: 'BOOK', departure: 'Departure from Rio',
            featuredTags: ['MOST POPULAR', 'FULL DAY', 'MUST-SEE', 'CRYSTAL WATERS', 'ISLANDS & BEACHES'],
            liveBadge: '📊 RIO LIVE', liveTitle: 'What is Rio like right now?', liveText: 'Weather, sea conditions and bathing-water quality to help you choose better.', liveCta: 'CHECK NOW',
            firstBadge: '⭐ WHAT I WOULD DO', firstTitle: 'Is this your first time?', firstText: 'Start with the essentials instead of trying to see everything.', firstCta: 'FIRST TIME IN RIO →',
            friendBadge: '👋 YOUR FRIEND IN RIO', friendTitle: 'Hi, I’m Ernestinho.', friendText: 'If you need help with tours, transportation or any questions, I’m here.', friendCta: 'TALK TO ME',
            search: 'Search Cristo, museums, Copacabana, restaurants, trails...'
        }
    }[lang] || null;
    // V31.47 · PORTADA SIMPLE — catálogo principal visible sin depender del menú de 3 puntos.
    // Es una prueba reversible: no elimina ningún módulo ni cambia sus datos.
    const exploreCards = [
        { route:'guia', icon:'✓', es:['Guía para mi viaje','Todo antes y durante tu viaje'], pt:['Guia para minha viagem','Tudo antes e durante a viagem'], en:['Trip guide','Everything before and during your trip'], img:'https://res.cloudinary.com/tdez3h4t/image/upload/v1789918904/PORTADA_HOME_NUEVO_1.png' },
        { route:'master4_transportes', icon:'→', es:['Transportes','Muévete por la ciudad'], pt:['Transportes','Mova-se pela cidade'], en:['Transport','Get around the city'], img:'https://res.cloudinary.com/tdez3h4t/image/upload/v1789918904/PORTADA_HOME_NUEVO_2.png' },
        { route:'hospedaje', icon:'⌂', es:['Hospedaje','Tu lugar para quedarte en Río'], pt:['Hospedagem','Seu lugar para ficar no Rio'], en:['Accommodation','Your place to stay in Rio'], img:'https://res.cloudinary.com/tdez3h4t/image/upload/v1789918904/PORTADA_HOME_NUEVO_3.png' },
        { route:'fotografia', icon:'◉', es:['Fotografía','Los mejores lugares y horarios'], pt:['Fotografia','Os melhores lugares e horários'], en:['Photography','The best places and times'], img:'https://res.cloudinary.com/tdez3h4t/image/upload/v1789918904/PORTADA_HOME_NUEVO_4.png' },
        { route:'compras', icon:'▣', es:['Compras','Shoppings, ferias y mercados'], pt:['Compras','Shoppings, feiras e mercados'], en:['Shopping','Malls, fairs and markets'], img:'https://res.cloudinary.com/tdez3h4t/image/upload/v1789918904/PORTADA_HOME_NUEVO_5.png' },
        { route:'barrios', icon:'⌖', es:['Barrios','Descubre Río zona por zona'], pt:['Bairros','Descubra o Rio região por região'], en:['Neighborhoods','Discover Rio area by area'], img:'https://res.cloudinary.com/tdez3h4t/image/upload/v1789918904/PORTADA_HOME_NUEVO_6.png' },
        { route:'grandes_eventos', icon:'♪', es:['Eventos','Carnaval, conciertos y agenda'], pt:['Eventos','Carnaval, shows e agenda'], en:['Events','Carnival, concerts and calendar'], img:'https://res.cloudinary.com/tdez3h4t/image/upload/v1789918904/PORTADA_HOME_NUEVO_7.png' },
        { route:'experiencias', icon:'✦', es:['Experiencias','Tours y actividades'], pt:['Experiências','Passeios e atividades'], en:['Experiences','Tours and activities'], img:'https://res.cloudinary.com/tdez3h4t/image/upload/v1789918904/PORTADA_HOME_NUEVO_8.png' },
        { route:'master4_playas', icon:'☀', es:['Playas','Sol, mar y naturaleza'], pt:['Praias','Sol, mar e natureza'], en:['Beaches','Sun, sea and nature'], img:'https://res.cloudinary.com/tdez3h4t/image/upload/v1789918904/PORTADA_HOME_NUEVO_9.png' },
        { route:'nocturna', icon:'♫', es:['Vida nocturna','Samba, bares y noches cariocas'], pt:['Vida noturna','Samba, bares e noites cariocas'], en:['Nightlife','Samba, bars and Rio nights'], img:'https://res.cloudinary.com/tdez3h4t/image/upload/v1789918904/PORTADA_HOME_NUEVO_10.png' },
        { route:'master4_gastronomia', icon:'●', es:['Gastronomía','Dónde comer en Río'], pt:['Gastronomia','Onde comer no Rio'], en:['Food & dining','Where to eat in Rio'], img:'https://res.cloudinary.com/tdez3h4t/image/upload/v1789918904/PORTADA_HOME_NUEVO_11.png' },
        { route:'atracciones', icon:'★', es:['Atracciones','Museos, cultura e historia'], pt:['Atrações','Museus, cultura e história'], en:['Attractions','Museums, culture and history'], img:'https://res.cloudinary.com/tdez3h4t/image/upload/v1789918904/PORTADA_HOME_NUEVO_12.png' },
        { route:'familia', icon:'♥', es:['Familia','Planes para todas las edades'], pt:['Família','Programas para todas as idades'], en:['Family','Plans for every age'], img:'https://res.cloudinary.com/tdez3h4t/image/upload/v1789918904/PORTADA_HOME_NUEVO_13.png' },
        { route:'naturaleza', icon:'⌁', es:['Naturaleza & Trilhas','Montañas, bosque y senderos'], pt:['Natureza & Trilhas','Montanhas, floresta e trilhas'], en:['Nature & Trails','Mountains, forest and trails'], img:'https://res.cloudinary.com/tdez3h4t/image/upload/v1789918904/PORTADA_HOME_NUEVO_14.png' },
        { route:'consejos', icon:'★', es:['Consejos','Tips reales para entender y disfrutar Río'], pt:['Dicas','Dicas reais para entender e aproveitar o Rio'], en:['Tips','Practical tips to understand and enjoy Rio'], img:'https://res.cloudinary.com/tdez3h4t/image/upload/v1789954657/portada_home_nuevo_consejo.png' }
    ].map(c => {
        const copy = c[lang] || c.es;
        return {...c, title:copy[0], sub:copy[1]};
    });
    const featured = EXPERIENCIAS_DATA.slice(0, 5);
    const featuredRailRef = React.useRef(null);
    const [featuredPage, setFeaturedPage] = useState(0);
    const moveFeatured = direction => {
        const rail = featuredRailRef.current;
        if (!rail) return;
        const card = rail.querySelector('article');
        const step = card ? card.getBoundingClientRect().width + 12 : rail.clientWidth * .84;
        const maxLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
        const atStart = rail.scrollLeft <= 4;
        const atEnd = rail.scrollLeft >= maxLeft - 4;
        let target;
        if (direction > 0) target = atEnd ? 0 : Math.min(maxLeft, rail.scrollLeft + step);
        else target = atStart ? maxLeft : Math.max(0, rail.scrollLeft - step);
        rail.scrollLeft = target;
        setFeaturedPage(Math.max(0, Math.min(featured.length - 1, Math.round(target / step))));
    };
    const trackFeatured = () => {
        const rail = featuredRailRef.current;
        if (!rail) return;
        const card = rail.querySelector('article');
        const step = card ? card.getBoundingClientRect().width + 12 : rail.clientWidth;
        setFeaturedPage(Math.max(0, Math.min(featured.length - 1, Math.round(rail.scrollLeft / step))));
    };
    const whatsapp = () => window.open('https://wa.me/5521969946938?text=Hola%20Ernestinho,%20estoy%20usando%20tu%20gu%C3%ADa%20de%20R%C3%ADo%20y%20quiero%20hacerte%20una%20consulta.', '_blank');
    return React.createElement("div", { className: "min-h-screen bg-black text-white pb-24 overflow-x-hidden" },
        React.createElement("section", { className: "relative overflow-hidden bg-black text-white min-h-[1180px] sm:min-h-[1380px] md:min-h-[820px] lg:min-h-[720px]" },
            React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/v1789747716/ChatGPT_Image_18_sept_2026_01_07_48_p.m..png", alt: "Ernestinho Carioca mirando Río de Janeiro", loading: "eager", fetchPriority: "high", decoding: "async", className: "absolute md:hidden inset-x-0 top-0 h-auto w-full" }),
            React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/v1789747716/ChatGPT_Image_18_sept_2026_01_07_35_p.m..png", alt: "Ernestinho Carioca mirando Río de Janeiro", loading: "eager", fetchPriority: "high", decoding: "async", className: "absolute hidden md:block left-1/2 top-0 h-auto w-full max-w-[1672px] -translate-x-1/2" }),
            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" }),
            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" }),
            React.createElement("div", { className: "relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-10 sm:pt-20 lg:pt-16 pb-8" },
                React.createElement("div", { className: "max-w-xl lg:max-w-[560px]" },
                    React.createElement("span", { className: "inline-flex rounded-full border border-amber-300/35 bg-black/45 px-3 py-2 text-[10px] sm:text-xs font-black tracking-[.15em] backdrop-blur-sm" }, H.badge),
                    React.createElement("h1", { className: "ec-home-hero-title mt-4 max-w-[52%] md:max-w-xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[.9] ", style:{textShadow:"0 2px 2px rgba(0,0,0,.95),0 5px 16px rgba(0,0,0,.72),1px 0 0 rgba(0,0,0,.65),-1px 0 0 rgba(0,0,0,.65),0 1px 0 rgba(0,0,0,.65),0 -1px 0 rgba(0,0,0,.65)"} },
                        H.h1a,
                        React.createElement("br", null),
                        React.createElement("span", { className: "text-amber-300" }, H.h1b)),
                    React.createElement("p", { className: "ec-home-hero-intro mt-5 max-w-[52%] md:max-w-lg text-sm sm:text-base md:text-xl text-white leading-relaxed font-semibold ", style:{textShadow:"0 2px 8px rgba(0,0,0,.95)"} }, H.intro),
                    React.createElement("div", { className: "mt-[180px] sm:mt-[420px] md:mt-6 max-w-2xl" },
                        React.createElement(Master4HomeSearch, { go: go, lang: lang, placeholder: H.search }))),
                React.createElement("div", { className: "mt-7 grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4" },
                    [
                        ['sun', H.today, H.todaySub, 'master4_smart_rio', true],
                        ['map-pin', H.rioHoje || (lang==='pt'?'RIO HOJE':lang==='en'?'RIO TODAY':'RÍO HOJE'), H.rioHojeSub || '', 'rio_hoje', false],
                        ['signpost', H.routes || (lang==='pt'?'ROTEIROS ERNESTINHO':lang==='en'?'ERNESTINHO ROUTES':'RECORRIDOS ERNESTINHO'), H.routesSub || '', 'recorridos_ernestinho', false],
                        ['plane', H.guide, H.guideSub, 'guia', false]
                    ].map(x => React.createElement("button", { key:x[1], onClick:()=>go(x[3]), className:`group min-h-[94px] sm:min-h-[112px] lg:min-h-[132px] rounded-[1.35rem] border text-left p-4 sm:p-5 flex items-center gap-3 transition-all backdrop-blur-md ${x[4] ? 'border-amber-300/90 bg-black/65  hover:bg-black/80' : 'border-white/25 bg-black/55 hover:border-amber-300/60 hover:bg-black/75'}` },
                        React.createElement("span", { className:`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${x[4]?'bg-amber-300 text-black':'bg-white/10 text-amber-300'}` },
                            React.createElement(Icon, { name:x[0], className:"w-5 h-5 sm:w-6 sm:h-6" })),
                        React.createElement("span", { className:"min-w-0 flex-1" },
                            React.createElement("b", { className:"block text-[11px] sm:text-[14px] leading-tight font-black tracking-wide text-white" }, x[1]),
                            React.createElement("span", { className:"block mt-1.5 text-[10px] sm:text-xs text-white/60 leading-snug" }, x[2])),
                        React.createElement("span", { className:"hidden sm:flex shrink-0 w-8 h-8 rounded-full bg-white/10 text-amber-300 items-center justify-center" },
                            React.createElement(Icon, { name:"arrow-right", className:"w-4 h-4" })))))),
        React.createElement("section", { className: "border-y border-amber-300/20 bg-black" },
            React.createElement("div", { className: "max-w-7xl mx-auto grid grid-cols-4 gap-y-5 px-2 sm:px-4 py-6 text-center md:text-left text-white" }, H.benefits.map(x => React.createElement("div", { key: x[1], className: "flex flex-col md:flex-row items-center justify-center md:justify-start gap-1.5 md:gap-3 px-1 sm:px-3" },
                React.createElement("span", { className: "text-xl sm:text-2xl" }, x[0]),
                React.createElement("div", null,
                    React.createElement("b", { className: "text-[9px] sm:text-sm block leading-tight" }, x[1]),
                    React.createElement("span", { className: "hidden sm:block text-[10px] text-white/50" }, x[2])))))),
        React.createElement("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14" },
            React.createElement("div", { id: "ec-ernestinho-card", className: "w-full" },
                React.createElement("button", { type:"button", "aria-label": H.friendTitle, onClick:(e)=>{ e.preventDefault(); e.stopPropagation(); go('hola_ernestinho'); window.scrollTo({top:0,behavior:'auto'}); }, className: "group block w-full overflow-hidden rounded-[1.8rem] sm:rounded-[2.4rem] border border-amber-300/20 bg-black cursor-pointer text-left" },
                    React.createElement("img", { src: "https://res.cloudinary.com/tdez3h4t/image/upload/v1789919067/ernestinho_pagina_home.png", alt: H.friendTitle, className: "block w-full h-auto transition-transform duration-500 group-hover:scale-[1.01]" })))),
        React.createElement("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 bg-black text-white" },
            React.createElement("div", { className: "flex items-end justify-between gap-4 mb-5" },
                React.createElement("div", null,
                    React.createElement("h2", { className: "text-3xl sm:text-5xl font-black" }, H.explore),
                    React.createElement("p", { className: "text-sm text-white/50 mt-1" }, H.exploreSub))),
            React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4" }, exploreCards.map(x => React.createElement("button", { key: x.route, onClick: () => go(x.route), "aria-label": x.title, title: x.title, className: "group relative aspect-[4/3] sm:aspect-[16/10] lg:min-h-[190px] overflow-hidden rounded-[1.15rem] sm:rounded-[1.8rem] text-left  bg-slate-950 border border-amber-300/20 hover:border-amber-300/70 transition" },
                React.createElement("img", { src: x.img, alt: x.title, className: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" }),
                React.createElement("span", { className: "absolute right-2.5 bottom-2.5 sm:right-3.5 sm:bottom-3.5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/75 border border-amber-300/70 text-amber-300 flex items-center justify-center  backdrop-blur-sm transition group-hover:bg-amber-300 group-hover:text-black", "aria-hidden": "true" },
                    React.createElement(Icon, { name: "arrow-right", className: "w-4 h-4 sm:w-5 sm:h-5" })))))),
        React.createElement("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 pb-10" },
            React.createElement("button", { onClick: () => go('recorridos_ernestinho'), className: "w-full min-h-[190px] rounded-[1.8rem] sm:rounded-[2.2rem] bg-slate-950 text-white p-8 text-center  flex flex-col items-center justify-center" },
                React.createElement("h2", { className: "text-3xl sm:text-5xl font-black" }, lang === 'pt' ? 'ROTEIROS ERNESTINHO' : lang === 'en' ? 'ERNESTINHO ROUTES' : 'RECORRIDOS ERNESTINHO'),
                React.createElement("p", { className: "mt-3 text-xl font-black text-amber-300" }, lang === 'pt' ? 'Em breve' : lang === 'en' ? 'Coming soon' : 'Próximamente'))),
        React.createElement("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 pb-10" },
            React.createElement("div", { className: "rounded-[2rem] sm:rounded-[2.4rem] bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,.09),transparent_34%),linear-gradient(145deg,#11161b,#070909)] p-4 sm:p-7 border border-amber-300/20 text-white  overflow-hidden" },
                React.createElement("div", { className: "relative flex items-end justify-between gap-4 mb-5 sm:mb-7" },
                    React.createElement("div", { className: "relative z-10 max-w-3xl" },
                        React.createElement("div", { className: "flex items-center gap-3" },
                            React.createElement("span", { className: "text-[10px] sm:text-[11px] font-black text-amber-300 tracking-[.24em]" }, H.featuredBadge),
                            React.createElement("span", { className: "h-px w-14 sm:w-24 bg-amber-300/75" })),
                        React.createElement("h2", { className: "text-3xl sm:text-5xl font-black mt-3 leading-[.98] tracking-tight" }, H.featuredTitle),
                        React.createElement("p", { className: "text-xs sm:text-base text-white/65 mt-3 max-w-2xl" }, H.featuredSub)),
                    React.createElement("button", { onClick: () => go('experiencias'), className: "hidden sm:inline-flex relative z-10 shrink-0 rounded-full border border-amber-300/35 bg-black/25 px-4 py-2 text-[10px] font-black text-amber-200 hover:bg-amber-300 hover:text-black transition" }, H.featuredAll)),
                React.createElement("div", { className: "relative w-full" },
                    React.createElement("div", { ref: featuredRailRef, onScroll: trackFeatured, className: "w-full min-w-0 flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-2 px-1" }, featured.map((exp, index) => React.createElement("article", { key: exp.id, className: "group relative min-w-[88%] sm:min-w-[300px] lg:min-w-[260px] xl:min-w-[270px] aspect-[4/5] sm:aspect-[3/4] snap-start overflow-hidden rounded-[1.35rem] border border-amber-300/70 bg-[#0b0d0d] text-white " },
                        React.createElement("img", { src: exp.portadaCarousel || exp.imagen, alt: exp.titulo, loading: "lazy", decoding: "async", className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
                        React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/95 via-black/15 via-45% to-black/10" }),
                        React.createElement("div", { className: "absolute inset-x-0 top-0 p-3 flex items-start justify-between gap-2" },
                            React.createElement("span", { className: "rounded-full bg-amber-300 text-slate-950 px-3 py-2 text-[9px] sm:text-[10px] font-black " }, H.featuredTags[index]),
                            React.createElement("span", { className: "rounded-full bg-amber-300 text-slate-950 px-3 py-2 text-[10px] sm:text-xs font-black  text-right" }, exp.precio)),
                        React.createElement("div", { className: "absolute inset-x-0 bottom-0 p-4 sm:p-5" },
                            React.createElement("h3", { className: "text-2xl sm:text-[26px] font-black leading-[1.02] " }, exp.titulo),
                            React.createElement("div", { className: "grid grid-cols-2 gap-2 mt-4" },
                                React.createElement("button", { onClick: () => go('experiencias'), className: "min-h-[48px] rounded-xl border-2 border-amber-300 bg-black/85 text-white px-2 py-3 text-[11px] sm:text-[10px] leading-tight font-black tracking-wide hover:bg-amber-300 hover:text-black transition flex items-center justify-center text-center" }, H.details),
                                React.createElement("button", { onClick: () => onReserve ? onReserve(exp) : whatsapp(), className: "min-h-[48px] rounded-xl bg-emerald-500 text-white px-2 py-3 text-[11px] sm:text-[10px] leading-tight font-black tracking-wide  hover:bg-emerald-400 transition inline-flex items-center justify-center gap-1.5 text-center" }, React.createElement("span", { className: "text-sm" }, '◉'), H.reserve))))))),
                    null),
                React.createElement("div", { className: "mt-4 flex items-center justify-center gap-2" }, featured.map((exp, index) => React.createElement("button", { key: exp.id, type: "button", onClick: () => {
                    const rail = featuredRailRef.current;
                    const card = rail && rail.querySelector('article');
                    if (rail && card) {
                        const target = Math.min(index * (card.getBoundingClientRect().width + 12), Math.max(0, rail.scrollWidth - rail.clientWidth));
                        rail.scrollLeft = target;
                        setFeaturedPage(index);
                    }
                }, "aria-label": `${index + 1}`, className: `h-2.5 rounded-full transition-all ${featuredPage === index ? 'w-7 bg-amber-300' : 'w-2.5 bg-white/25 hover:bg-white/45'}` })))),
        React.createElement("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 pb-10" },
            React.createElement("button", { onClick: () => go('master4_live_rio'), className: "ec-flat-card relative overflow-hidden rounded-[1.8rem] min-h-[190px] w-full sm:max-w-md mx-auto text-left text-white" },
                React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3122", className: "absolute inset-0 w-full h-full object-cover", alt: "Copacabana" }),
                React.createElement("div", { className: "relative p-6" },
                    React.createElement("span", { className: "text-xs font-black" }, H.liveBadge),
                    React.createElement("h3", { className: "text-2xl font-black mt-2" }, H.liveTitle),
                    React.createElement("p", { className: "text-xs mt-2 text-white/80" }, H.liveText),
                    React.createElement("span", { className: "inline-flex mt-4 rounded-full border border-white/60 px-4 py-2 text-[10px] font-black" }, H.liveCta))))));
}
// window.GRANDES_EVENTOS externalizado a JSON

// window.CALENDARIO_CARIOCA externalizado a JSON

const OTROS_EVENTOS_RIO = window.CALENDARIO_CARIOCA.map(e => [e.mes, `${e.icon} ${e.nombre}`, e.tipo, e.lugar, e.estado]);
const EventoTabla = ({ headers, rows }) => React.createElement("div", { className: "overflow-x-auto rounded-2xl border border-slate-200 bg-white" },
    React.createElement("table", { className: "w-full min-w-[720px] text-sm" },
        React.createElement("thead", { className: "bg-slate-900 text-white" },
            React.createElement("tr", null, headers.map(h => React.createElement("th", { key: h, className: "text-left px-4 py-3 font-black" }, h)))),
        React.createElement("tbody", null, rows.map((row, i) => React.createElement("tr", { key: i, className: "border-t border-slate-100 odd:bg-white even:bg-slate-50" }, row.map((cell, j) => React.createElement("td", { key: j, className: "px-4 py-3 align-top" }, cell)))))));
