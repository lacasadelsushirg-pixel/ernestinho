/* EC guide editorial extensions — extracted 2026-09-23 */
/* ERNESTINHO V6 — integración editorial no destructiva */

const v6AsItems = article => [
    ...article.sections.map(([titulo, texto]) => [titulo, texto]),
    ...article.faq.map(([pregunta, respuesta]) => [`Preguntas frecuentes — ${pregunta}`, respuesta])
];
const v6AppendUnique = (target, article) => {
    if (!GUIA_INFO[target])
        return;
    const current = GUIA_INFO[target];
    const titles = new Set((current.items || []).map(item => item[0]));
    const additions = v6AsItems(article).filter(item => !titles.has(item[0]));
    current.items = [...(current.items || []), ...additions];
    const knownLinks = new Set((current.links || []).map(link => link[1]));
    const official = article.sources
        .filter(url => !knownLinks.has(url))
        .map((url, index) => [`Fuente oficial V6 ${index + 1}`, url]);
    current.links = [...(current.links || []), ...official];
    current.v6 = { slugPropuesto: article.slug, metaDescription: article.meta, faqVisible: true, integradoSinDuplicar: true };
};
((window.ERNESTINHO_V6_CONTENT && window.ERNESTINHO_V6_CONTENT.existing) || []).forEach(entry => v6AppendUnique(entry.target, entry.article));
if (!GUIA_TEMAS.some(item => item.id === 'viajar-solo')) {
    GUIA_TEMAS.splice(1, 0, {
        id: 'viajar-solo',
        imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1788907305/portada_planificando_el_viaje.png',
        grupo: 'Antes de viajar', icon: '🧭', titulo: 'Viajar solo o sola',
        resumen: 'Barrios, playa, noche, transporte y compañía.'
    });
}
GUIA_INFO['viajar-solo'] = {
    titulo: window.ERNESTINHO_V6_CONTENT.solo.title,
    intro: window.ERNESTINHO_V6_CONTENT.solo.intro,
    hero: 'https://res.cloudinary.com/qa301cbc/image/upload/v1788907305/portada_planificando_el_viaje.png',
    heroAlt: 'Planificar un viaje solo o sola a Río de Janeiro',
    consejo: 'Mi consejo es decidir antes dónde dormirás, cómo volverás por la noche y qué harás con tus pertenencias en la playa. Con esa base puedes disfrutar Río con más tranquilidad y libertad.',
    items: v6AsItems(window.ERNESTINHO_V6_CONTENT.solo),
    links: window.ERNESTINHO_V6_CONTENT.solo.sources.map((url, index) => [`Fuente oficial V6 ${index + 1}`, url]),
    v6: { slugPropuesto: window.ERNESTINHO_V6_CONTENT.solo.slug, metaDescription: window.ERNESTINHO_V6_CONTENT.solo.meta, faqVisible: true }
};
/* V7 — Top 200 consolidado en capítulos editoriales */

window.V7_CHAPTERS.forEach(entry => { const info = GUIA_INFO[entry.target]; if (!info)
    return; if (!(info.items || []).some(x => x[0] === entry.title))
    info.items = [...(info.items || []), [entry.title, entry.body]]; });
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_105||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_106||{});

Object.entries(window.V7_SOURCE_LINKS).forEach(([target, links]) => { const info = GUIA_INFO[target]; if (!info)
    return; info.links = [...(info.links || [])]; links.forEach(link => { if (!info.links.some(x => x[1] === link[1]))
    info.links.push(link); }); });
Object.assign(GLOBAL_UI_TRANSLATIONS.pt, { 'MOMENTO': 'MOMENTO', 'Ahora': 'Agora', 'Tarde': 'Tarde', 'Noche': 'Noite', 'Noche tarde': 'Noite avançada', '1 hora': '1 hora', '2 horas': '2 horas', 'Hoy completo': 'Dia inteiro', 'opciones compatibles para elegir.': 'opções compatíveis para escolher.', 'El orden cruza zona, interés, perfil, tiempo, momento del día y clima. Si llueve, las opciones exteriores quedan fuera; de noche no aparecen atracciones diurnas.': 'A ordem combina região, interesse, perfil, tempo, momento do dia e clima. Com chuva, opções externas ficam de fora; à noite, atrações diurnas não aparecem.' });
Object.assign(GLOBAL_UI_TRANSLATIONS.en, { 'MOMENTO': 'TIME OF DAY', 'Ahora': 'Now', 'Tarde': 'Afternoon', 'Noche': 'Evening', 'Noche tarde': 'Late night', '1 hora': '1 hour', '2 horas': '2 hours', 'Hoy completo': 'Full day', 'opciones compatibles para elegir.': 'compatible options to choose from.', 'El orden cruza zona, interés, perfil, tiempo, momento del día y clima. Si llueve, las opciones exteriores quedan fuera; de noche no aparecen atracciones diurnas.': 'The ranking combines area, interest, profile, available time, time of day and weather. Outdoor options are excluded in rain; daytime attractions do not appear at night.' });

