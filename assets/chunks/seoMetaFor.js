function seoMetaFor(section, museoId, barrio, restaurante, articulo, temaGuia, consejoId) {
    const actualPath = seoCleanPath(window.location.pathname);
    const metaDirecta = seoMetaFromPath(actualPath);
    if (metaDirecta) return metaDirecta;
    const path = seoCurrentPath(section, museoId, barrio, restaurante, articulo, temaGuia, consejoId);
    if (section === 'consejos' && ((consejoId === null || consejoId === void 0 ? void 0 : consejoId.id) || consejoId) === 'caminando') {
        const actual = seoCleanPath(window.location.pathname);
        const rutaSocial = (actual === '/quiero' || actual === '/ruta-centro' || actual === '/recorrido-centro') ? actual : '/quiero';
        return { path: rutaSocial, title: 'Del mar a la historia: recorrido por el Centro de Río | Ernestinho Carioca', description: 'Recorrido para hacer por tu cuenta desde la Zona Portuaria hasta el Centro de Río: AquaRio, Yup Star, Mural Etnias, Museu do Amanhã, São Bento, Confeitaria Colombo y Real Gabinete.', image: 'https://res.cloudinary.com/qa301cbc/image/upload/v1788817390/1B0B6A7E-B0F2-49B0-A263-26D4A3FF3CE3.png' };
    }
    if (section === 'museos' && museoId && path.startsWith('/museos/')) {
        const x = (window.MUSEOS_DATA||[]).find(v => v.id === museoId);
        if (x)
            return { path, title: `${x.nombre} en Río de Janeiro | Ernestinho Carioca`, description: x.descripcion || x.subtitulo };
    }
    if (section === 'barrios' && barrio)
        return { path, title: `${barrio.nombre} en Río de Janeiro | Ernestinho Carioca`, description: barrio.desc || barrio.lema };
    if (section === 'gastronomia' && restaurante)
        return { path, title: `${restaurante.nombre} en Río de Janeiro | Ernestinho Carioca`, description: restaurante.destaque };
    if (section === 'articulo_detalle' && articulo)
        return { path, title: `${articulo.titulo} | Ernestinho Carioca`, description: articulo.resumen };
    if (section === 'guia' && temaGuia && (window.GUIA_INFO||{})[temaGuia]) {
        const x = (window.GUIA_INFO||{})[temaGuia];
        return { path, title: `${x.titulo} | Ernestinho Carioca`, description: x.intro };
    }
    const exp = seoExperienceFromState(section);
    if (exp)
        return { path, title: `${exp.titulo} en Río de Janeiro | Ernestinho Carioca`, description: exp.descripcion || exp.intro };
    const labels = {
        inicio: ['Ernestinho Carioca | Guía completa de Río de Janeiro', 'Descubre Río de Janeiro con Ernestinho Carioca: atracciones, playas, museos, gastronomía, transporte, consejos y experiencias.'],
        que_hacer: ['Qué hacer en Río de Janeiro | Ernestinho Carioca', 'Ideas, lugares y experiencias para descubrir qué hacer en Río de Janeiro.'],
        atracciones: ['Atracciones de Río de Janeiro | Ernestinho Carioca', 'Museos, iglesias, fortalezas, cultura y atracciones para conocer Río de Janeiro.'],
        museos: ['Museos de Río de Janeiro | Ernestinho Carioca', 'Guía de museos de Río de Janeiro con historia, horarios, valores, mapas y consejos.'],
        playas: ['Playas de Río de Janeiro | Ernestinho Carioca', 'Descubre las playas de Río de Janeiro, cómo llegar y qué esperar en cada una.'],
        naturaleza: ['Naturaleza y senderos en Río | Ernestinho Carioca', 'Senderos, miradores y naturaleza para vivir el lado verde de Río de Janeiro.'],
        gastronomia: ['Dónde comer en Río de Janeiro | Ernestinho Carioca', 'Restaurantes, botecos, cafés y sabores recomendados en Río de Janeiro.'],
        nocturna: ['Vida nocturna en Río de Janeiro | Ernestinho Carioca', 'Samba, bares, música y opciones para disfrutar la noche carioca.'],
        barrios: ['Barrios de Río de Janeiro | Ernestinho Carioca', 'Guía de barrios de Río de Janeiro para entender qué ver, hacer y combinar en cada zona.'],
        guia: ['Guía de Río de Janeiro | Ernestinho Carioca', 'Información práctica para preparar y disfrutar tu viaje a Río de Janeiro.'],
        consejos: ['Consejos para viajar a Río de Janeiro | Ernestinho Carioca', 'Consejos prácticos y respuestas para organizar un viaje a Río de Janeiro.'],
        experiencias: ['Tours y experiencias en Río de Janeiro | Ernestinho Carioca', 'Tours, excursiones y experiencias para vivir Río de Janeiro con Ernestinho.'],
        grandes_eventos: ['Eventos en Río de Janeiro | Ernestinho Carioca', 'Grandes eventos, Carnaval, Réveillon, música y agenda especial de Río de Janeiro.'],
        transportes: ['Cómo moverse en Río de Janeiro | Ernestinho Carioca', 'Metro, Uber, buses, bicicletas y traslados para moverse por Río de Janeiro.'],
        familia: ['Río de Janeiro con niños y familia | Ernestinho Carioca', 'Atracciones y actividades para disfrutar Río de Janeiro en familia.'],
        compras: ['Compras en Río de Janeiro | Ernestinho Carioca', 'Shoppings, mercados, ferias y lugares para comprar en Río de Janeiro.'],
        hospedaje: ['Dónde alojarse en Río de Janeiro | Ernestinho Carioca', 'Información para elegir hospedaje y zonas donde alojarse en Río de Janeiro.'],
        centros_culturales: ['Centros culturales de Río de Janeiro | Ernestinho Carioca', 'Centros culturales, exposiciones y espacios de arte en Río de Janeiro.'],
        iglesias: ['Iglesias históricas de Río de Janeiro | Ernestinho Carioca', 'Iglesias, templos y patrimonio religioso de Río de Janeiro.'],
        teatros: ['Teatros de Río de Janeiro | Ernestinho Carioca', 'Teatros y espacios escénicos para conocer en Río de Janeiro.'],
        fuertes_fortalezas: ['Fuertes y fortalezas de Río | Ernestinho Carioca', 'Fortificaciones históricas, museos militares y miradores de Río y Niterói.'],
        aventura: ['Aventura en Río de Janeiro | Ernestinho Carioca', 'Parapente, helicóptero, paracaidismo y actividades de aventura en Río.'],
        fotografia: ['Dónde fotografiar Río de Janeiro | Ernestinho Carioca', 'Miradores y lugares para fotografiar Río de Janeiro.'],
        copa_para_mi: ['Copacabana | Guía de Ernestinho Carioca', 'Qué hacer, comer y descubrir en Copacabana desde una mirada local.']
    };
    const base = labels[section] || labels[Object.keys(window.SEO_SECTION_ROUTES).find(k => window.SEO_SECTION_ROUTES[k] === path)] || null;
    return base ? { path, title: base[0], description: base[1], indexable: true } : { path, indexable: false };
}
// ===== FIN SEO ROUTER =====
window.seoMetaFor=seoMetaFor;
