function seoResolveRoute(pathname) {
    const ruta = seoCleanPath(pathname);
    const result = { seccion: 'inicio', museoId: null, barrio: null, restaurante: null, articulo: null, temaGuia: null, consejoId: null };
    if (ruta === '/')
        return result;
    if (ruta === '/recorrido-centro' || ruta === '/quiero' || ruta === '/ruta-centro')
        return { ...result, seccion: 'consejos', consejoId: 'caminando' };
    let m = ruta.match(/^\/museos\/([^/]+)$/);
    if (m) {
        const museo = (window.MUSEOS_DATA||[]).find(x => seoSlug(x.nombre) === m[1]);
        if (museo)
            return { ...result, seccion: 'museos', museoId: museo.id };
    }
    m = ruta.match(/^\/barrios\/([^/]+)$/);
    if (m) {
        const barriosIframe = {"copacabana": "Copacabana", "ipanema": "Ipanema", "leblon": "Leblon", "botafogo": "Botafogo", "urca": "Urca", "flamengo": "Flamengo", "laranjeiras": "Laranjeiras", "catete-largo-do-machado-gloria": "Catete · Largo do Machado · Glória", "cinelandia-lapa-santa-teresa": "Cinelândia · Lapa · Santa Teresa", "centro-historico-pequena-africa": "Centro Histórico · Pequena África", "zona-norte": "Zona Norte", "barra-da-tijuca-ilha-da-gigoia": "Barra da Tijuca · Ilha da Gigóia", "recreio-vargens-guaratiba-sepetiba": "Recreio · Vargens · Guaratiba · Sepetiba", "sao-conrado-gavea-jardim-botanico-lagoa": "São Conrado · Gávea · Jardim Botânico · Lagoa", "cosme-velho-humaita": "Cosme Velho · Humaitá", "floresta-da-tijuca-alto-da-boa-vista": "Floresta da Tijuca · Alto da Boa Vista"};
        if (barriosIframe[m[1]])
            return { ...result, seccion: 'barrios', barrio: { id: m[1], nombre: barriosIframe[m[1]], iframe: true } };
        const barrio = BARRIOS_DATA.find(x => seoSlug(x.nombre) === m[1] || seoSlug(x.id) === m[1]);
        if (barrio)
            return { ...result, seccion: 'barrios', barrio };
    }
    m = ruta.match(/^\/gastronomia\/([^/]+)$/);
    if (m) {
        const cardNueva = (window.GASTRONOMIA_NUEVAS_CARDS||[]).find(x => seoSlug(x.title) === m[1] || seoSlug(x.id) === m[1]);
        if (cardNueva)
            return { ...result, seccion: 'gastronomia', restaurante: { id: cardNueva.id, nombre: cardNueva.title, nueva: true } };
        const restaurante = GASTRONOMIA_DATA.find(x => seoSlug(x.nombre) === m[1]);
        if (restaurante)
            return { ...result, seccion: 'gastronomia', restaurante };
    }
    m = ruta.match(/^\/articulos\/([^/]+)$/);
    if (m) {
        const articulo = window.ARTICULOS_CONSEJOS.find(x => seoSlug(x.titulo) === m[1] || seoSlug(x.id) === m[1]);
        if (articulo)
            return { ...result, seccion: 'articulo_detalle', articulo };
    }
    m = ruta.match(/^\/guia\/([^/]+)$/);
    if (m && m[1] !== 'pix') {
        const temaId = Object.keys(window.GUIA_INFO||{}).find(id => { var _a; return seoSlug(((_a = (window.GUIA_INFO||{})[id]) === null || _a === void 0 ? void 0 : _a.titulo) || id) === m[1] || seoSlug(id) === m[1]; });
        if (temaId)
            return { ...result, seccion: 'guia', temaGuia: temaId };
    }
    m = ruta.match(/^\/experiencias\/([^/]+)$/);
    if (m) {
        const all = [...EXPERIENCIAS_DATA, ...ACTIVIDADES_NUEVAS];
        const exp = all.find(x => seoSlug(x.titulo) === m[1] || seoSlug(x.id) === m[1]);
        if (exp)
            return { ...result, seccion: seoExperienceState(exp) };
    }
    const preferred = SEO_ROUTE_PREFERRED_SECTION[ruta];
    if (preferred)
        return { ...result, seccion: preferred };
    const section = Object.keys(window.SEO_SECTION_ROUTES).find(key => window.SEO_SECTION_ROUTES[key] === ruta);
    if (section)
        return { ...result, seccion: section };
    return result;
}
window.seoResolveRoute=seoResolveRoute;
