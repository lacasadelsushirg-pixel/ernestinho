function Master4MoreRio({ kind, go }) {
    const configs = {
        patrimonio: { ey: '🏛️ ARTE · HISTORIA · CULTURA', title: 'Río también se descubre entrando.', intro: 'Abre directamente la guía completa que ya construimos para cada tema.', cards: [
                ['🎨', 'Centros culturales', 'Exposiciones, edificios históricos y programación', 'master4_centros_real'],
                ['⛪', 'Iglesias y catedrales', 'Arquitectura, fe e historia de la ciudad', 'master4_iglesias_real'],
                ['🏰', 'Fuertes y fortalezas', 'Defensa, paisaje y miradores', 'fuertes_fortalezas'],
                ['🎭', 'Teatros', 'Escenarios históricos, visitas y vida cultural', 'master4_teatros_real'],
                ['📚', 'Río literario', 'Bibliotecas, gabinetes, casas y espacios vinculados a la literatura', 'espacios_literarios'],
                ['🏛️', 'Museos', 'Nuestra página completa de museos, con miniaturas, fichas e imágenes', 'museos']
            ] },
        ocio: { ey: '🌙 DESPUÉS DEL PASEO', title: 'Comer, comprar, salir o seguir descubriendo.', intro: 'Elige por ganas y momento.', cards: [
                ['🎵', 'Vida nocturna', 'Samba, bares, música y ambientes diferentes', 'master4_noche_real'],
                ['🛍️', 'Compras', 'Shoppings, ferias, mercados y recuerdos', 'master4_shoppings_real'],
                ['📸', 'Fotografía', 'Lugares que funcionan según luz y ubicación', 'fotografia'],
                ['📚', 'Río literario', 'Autores, historias y espacios de lectura', 'espacios_literarios'],
                ['👨‍👩‍👧', 'Con familia', 'Opciones y ritmo para distintas edades', 'familia']
            ] },
        viaje: { ey: '✈️ PREPARA TU VIAJE', title: 'Deja lo importante resuelto y guarda energía para Río.', intro: 'Hospedaje, experiencias y decisiones prácticas antes de aterrizar.', cards: [
                ['🛏️', 'Hospedaje', 'Elige por zona, perfil y logística, no solamente por precio', 'hospedaje'],
                ['✨', 'Experiencias', 'Tours, paseos y actividades Ernestinho', 'master4_experiencias'],
                ['🧭', 'Guía de Río', 'Documentos, dinero, conectividad, transporte y preparación', 'guia']
            ] }
    };
    const data = configs[kind];
    if (!data)
        return null;
    return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
        React.createElement("header", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6" },
            React.createElement("button", { onClick: () => go('master4_descubre'), className: "text-xs font-black" }, "\u2190 DESCUBRE R\u00CDO"),
            React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white p-7 sm:p-10" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-300" }, data.ey),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2 max-w-4xl" }, data.title),
                React.createElement("p", { className: "text-sm text-white/70 mt-3" }, data.intro))),
        React.createElement("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-6" },
            React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4" }, data.cards.map(x => React.createElement("button", { key: x[1], onClick: () => go(x[3]), className: "rounded-[1.8rem] bg-white border p-6 text-left min-h-52 flex flex-col  transition-shadow" },
                React.createElement("span", { className: "text-4xl" }, x[0]),
                React.createElement("div", { className: "mt-auto" },
                    React.createElement("h2", { className: "text-xl font-black" }, x[1]),
                    React.createElement("p", { className: "text-xs text-slate-500 mt-2 leading-relaxed" }, x[2]),
                    React.createElement("span", { className: "inline-block mt-4 text-[10px] font-black text-emerald-700" }, "ENTRAR \u2192")))))));
}
window.Master4MoreRio=Master4MoreRio;
