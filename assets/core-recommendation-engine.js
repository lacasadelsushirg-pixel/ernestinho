/* EC recommendation engine — extracted from app runtime 2026-09-23 */
function master4NormalizeText(v = '') { return String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
function master4CanonicalPlaces() {
    try {
        if (Array.isArray(window.__ERNESTINHO_CANONICAL_PLACES))
            return window.__ERNESTINHO_CANONICAL_PLACES;
        const node = document.getElementById('ernestinho-place-intelligence-2026');
        const parsed = node ? JSON.parse(node.textContent || '{}') : {};
        const places = Array.isArray(parsed.places) ? parsed.places : [];
        window.__ERNESTINHO_CANONICAL_PLACES = places.filter(p => {
            const hay = master4NormalizeText([p.mainType, p.subtype, p.name, ...(p.tags || [])].join(' '));
            return !/gastronom|restaurant|comida|food|cafe\b|bar\b/.test(hay);
        });
        return window.__ERNESTINHO_CANONICAL_PLACES;
    }
    catch (e) {
        console.warn('AQUÍ · AHORA: base canónica no disponible', e);
        return [];
    }
}
function v3Norm(x = '') { return String(x || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim(); }
function v3Match(t, arr) { const padded = ' ' + t + ' '; return arr.some(x => { const n = v3Norm(x); return padded.includes(' ' + n + ' '); }); }

function parseTravelerQueryLocalV3(raw = '') {
    const t = v3Norm(raw), intents = [];
    Object.entries(ERNESTINHO_INTENT_ONTOLOGY_V3).forEach(([k, v]) => { if (v3Match(t, v))
        intents.push(k); });
    const neg = [];
    const negMap = { beach: ['no quiero playa', 'sin playa', 'nao quero praia', 'no beach'], culture: ['no quiero museo', 'sin museos', 'nao quero museu', 'no museum'], bar: ['no quiero bar', 'sin bar', 'sem bar', 'no bar', 'que no sea bar'], walk: ['no quiero caminar', 'sin caminar', 'nao quero caminhar', 'dont want to walk'] };
    Object.entries(negMap).forEach(([k, v]) => { if (v3Match(t, v))
        neg.push(k); });
    let minutes = null, m = t.match(/(\\d+(?:[.,]\\d+)?)\\s*(?:h|hora|horas|hour|hours)\\b/);
    if (m)
        minutes = Math.round(parseFloat(m[1].replace(',', '.')) * 60);
    else {
        m = t.match(/(\\d+)\\s*(?:min|minuto|minutos|minute|minutes)\\b/);
        if (m)
            minutes = +m[1];
    }
    const ageM = t.match(/(?:tiene|tem|is|aged?)\\s*(\\d{1,2})\\s*(?:anos|años|years?)/);
    const age = ageM ? +ageM[1] : null;
    const neighborhoods = ['copacabana', 'leme', 'ipanema', 'leblon', 'botafogo', 'urca', 'flamengo', 'centro', 'lapa', 'santa teresa', 'tijuca', 'barra da tijuca', 'barra', 'recreio', 'sao conrado', 'catete', 'gloria', 'laranjeiras', 'gavea', 'maracana', 'gamboa', 'saude', 'sao cristovao'];
    let neighborhood = neighborhoods.find(n => t.includes(n)) || null;
    if (neighborhood === 'barra')
        neighborhood = 'barra da tijuca';
    const primary = ['beach', 'breakfast', 'coffee', 'food', 'walk', 'shopping', 'karting', 'bowling', 'football', 'nature', 'family', 'night', 'music', 'culture'].find(x => intents.includes(x)) || null;
    return { rawText: raw, text: t, intents, primary, negations: neg, availableMinutes: minutes, childAge: age, neighborhood, confidence: intents.length ? Math.min(1, .45 + intents.length * .12) : 0 };
}
// removed unreachable parseTravelerQuerySemanticV3

function v3ShoppingAffinity(p) { var _a; if (((_a = p.aff) === null || _a === void 0 ? void 0 : _a.shopping) != null)
    return p.aff.shopping; const type = v3Norm(p.mainType), t = v3Norm([p.subtype, p.name].join(' ')); if (type === 'shopping' || type === 'market')
    return 95; if (/shopping center|centro comercial|feira|feria|mercado|artesania|souvenir/.test(t) && !['church', 'museum', 'culture'].includes(type))
    return 85; return 0; }
function v3RichBeachExtras() { const existing = new Set(master4CanonicalPlaces().filter(p => p.mainType === 'beach').map(p => v3Norm(p.name))); return ERNESTINHO_BEACH_V2.filter(b => !existing.has(v3Norm(b.nombre))).map(b => { var _a, _b; return ({ placeId: 'beach-' + b.id, sourceId: b.id, name: b.nombre, mainType: 'beach', subtype: b.tag || 'Playa', neighborhood: null, zone: 'Río de Janeiro', environment: { type: 'outdoor' }, visit: { raw: 'Flexible' }, pricing: { free: true, raw: 'Acceso gratuito; servicios aparte' }, transport: { raw: 'Consulta el mapa de la playa.' }, editorial: { ernestinhoTip: b.descripcion || '' }, media: { mainPhoto: ((_a = b.imagenes) === null || _a === void 0 ? void 0 : _a[0]) || null, thumbnail: ((_b = b.imagenes) === null || _b === void 0 ? void 0 : _b[0]) || null, mapUrl: b.mapUrl }, qualityStatus: 'PARTIAL' }); }); }
function v3DecisionCatalog() { return [...master4CanonicalPlaces(), ...v3RichBeachExtras(), ...ERNESTINHO_DECISION_EXTRAS_V3]; }
function Master4BeachIndexV3(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/Master4BeachIndexV3.js?v=20260922',name:'Master4BeachIndexV3',componentProps:props})}
const ERNESTINHO_V41_DATASETS = () => [
    { name: 'FAMILIA_DATA', section: 'familia', component: 'SeccionFamilia', data: (typeof FAMILIA_DATA !== 'undefined' ? FAMILIA_DATA : []) },
    { name: 'MUSEOS_DATA', section: 'museos', component: 'MuseosOriginales', data: (typeof MUSEOS_DATA !== 'undefined' ? MUSEOS_DATA : []) },
    { name: 'PLAYAS_DETALLADAS_DATA', section: 'playas', component: 'PlayasOriginales', data: (typeof PLAYAS_DETALLADAS_DATA !== 'undefined' ? PLAYAS_DETALLADAS_DATA : []) },
    { name: 'SENDEROS_RIO', section: 'naturaleza', component: 'GuiaSenderos', data: (typeof SENDEROS_RIO !== 'undefined' ? SENDEROS_RIO : []) },
    { name: 'CENTROS_CULTURALES_DATA', section: 'centros_culturales', component: 'SeccionCentrosCulturales', data: (typeof CENTROS_CULTURALES_DATA !== 'undefined' ? CENTROS_CULTURALES_DATA : []) },
    { name: 'ESPACIOS_LITERARIOS_DATA', section: 'espacios_literarios', component: 'SeccionEspaciosLiterarios', data: (typeof ESPACIOS_LITERARIOS_DATA !== 'undefined' ? ESPACIOS_LITERARIOS_DATA : []) },
    { name: 'EXPERIENCIAS_DATA', section: 'experiencias', component: 'ExperienciasOriginales', data: (typeof EXPERIENCIAS_DATA !== 'undefined' ? EXPERIENCIAS_DATA : []) },
    { name: 'FUERTES_DATA', section: 'fuertes_fortalezas', component: 'SeccionFuertesFortalezas', data: (typeof FUERTES_DATA !== 'undefined' ? FUERTES_DATA : []) },
    { name: 'IGLESIAS_DATA', section: 'iglesias', component: 'SeccionIglesias', data: (typeof IGLESIAS_DATA !== 'undefined' ? IGLESIAS_DATA : []) },
    { name: 'TEATROS_DATA', section: 'teatros', component: 'SeccionTeatros', data: (typeof TEATROS_DATA !== 'undefined' ? TEATROS_DATA : []) },
    { name: 'GASTRONOMIA_DATA', section: 'gastronomia', component: 'GastronomiaOriginal', data: (typeof GASTRONOMIA_DATA !== 'undefined' ? GASTRONOMIA_DATA : []) },
    { name: 'PARQUES_NATURALEZA_DESTACADOS', section: 'naturaleza', component: 'NaturalezaOriginal', data: (typeof PARQUES_NATURALEZA_DESTACADOS !== 'undefined' ? PARQUES_NATURALEZA_DESTACADOS : []) },
    { name: 'VIDA_NOCTURNA_DATA', section: 'master4_vida_nocturna', component: 'VidaNocturnaOriginal', data: (typeof VIDA_NOCTURNA_DATA !== 'undefined' ? VIDA_NOCTURNA_DATA : []) }
];
function v4N(x = '') { return v3Norm(x); }
function v4Level(score) { if (score >= 92)
    return 'EXCELLENT'; if (score >= 76)
    return 'STRONG'; if (score >= 56)
    return 'MEDIUM'; if (score >= 36)
    return 'LOW'; if (score > 0)
    return 'COMPATIBLE_ONLY'; return 'NOT_RECOMMENDED'; }
function v4AllText(p) { var _a, _b, _c, _d; return v4N([p.name, p.mainType, p.subtype, p.neighborhood, p.zone, (_a = p.operation) === null || _a === void 0 ? void 0 : _a.hoursText, (_b = p.pricing) === null || _b === void 0 ? void 0 : _b.raw, (_c = p.editorial) === null || _c === void 0 ? void 0 : _c.idealFor, (_d = p.editorial) === null || _d === void 0 ? void 0 : _d.ernestinhoTip, (p.profiles || []).join(' ')].join(' ')); }
function v4PriceMode(p) { var _a, _b, _c; const raw = v4N(((_a = p.pricing) === null || _a === void 0 ? void 0 : _a.raw) || ''), type = v4N(p.mainType); if (((_b = p.pricing) === null || _b === void 0 ? void 0 : _b.free) === true)
    return 'FREE'; if (/gratuit|gratis|free/.test(raw) && /algum|dia|terça|terca|condi|meia|promoc/.test(raw))
    return 'MIXED'; if (/gratuit|gratis|free/.test(raw))
    return 'FREE'; if (((_c = p.pricing) === null || _c === void 0 ? void 0 : _c.free) === false)
    return /gratuit|promoc|meia/.test(raw) ? 'MIXED' : 'PAID'; if (['beach', 'trail', 'neighborhood'].includes(type))
    return 'FREE'; if (type === 'nature' && !/ingresso|entrada r\$|ticket|pago/.test(raw))
    return 'FREE'; return 'UNKNOWN'; }
function v4Environment(p) { var _a; const type = v4N(p.mainType), sub = v4N(p.subtype), name = v4N(p.name), e = v4N(((_a = p.environment) === null || _a === void 0 ? void 0 : _a.type) || ''); if (['beach', 'trail', 'nature'].includes(type))
    return 'OUTDOOR_PRIMARY'; if (e.includes('indoor') || /indoor|interior|shopping|bowling|boliche|kart|aquario|planetario/.test(sub + ' ' + name) || ['museum', 'theater', 'literary', 'culture', 'shopping', 'nightlife'].includes(type))
    return 'INDOOR_PRIMARY'; if (e.includes('mixed'))
    return 'OUTDOOR_MIXED'; if (e === 'outdoor' || /jardim botanico|parque lage|floresta|bosque da barra|cachoeira|mirante|orla|lagoa rodrigo|aterro|pista claudio/.test(name + ' ' + sub))
    return 'OUTDOOR_PRIMARY'; return 'UNKNOWN'; }
function v4TodayAvailability(p, now = new Date()) {
    var _a, _b, _c;
    const status = v4N(((_a = p.operation) === null || _a === void 0 ? void 0 : _a.status) || ''), h = v4N(((_b = p.operation) === null || _b === void 0 ? void 0 : _b.hoursText) || '');
    if (/temporariamente fechado|temporalmente cerrado|fechado tempor|cerrado temporal/.test(h) || /closed|fechado|cerrado/.test(status))
        return { state: 'CLOSED', reason: 'Cierre informado en la ficha' };
    const day = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'long' }).format(now).toLowerCase();
    const names = { monday: ['lunes', 'segunda', 'monday'], tuesday: ['martes', 'terca', 'terça', 'tuesday'], wednesday: ['miercoles', 'miércoles', 'quarta', 'wednesday'], thursday: ['jueves', 'quinta', 'thursday'], friday: ['viernes', 'sexta', 'friday'], saturday: ['sabado', 'sábado', 'saturday'], sunday: ['domingo', 'sunday'] };
    const dn = names[day] || [];
    if (dn.some(d => h.includes('cerrado ' + v4N(d)) || h.includes('fechado ' + v4N(d)) || h.includes('closed ' + v4N(d))))
        return { state: 'CLOSED', reason: 'Cerrado hoy según el horario publicado' };
    if (status === 'dynamic' || status === 'unknown' || ((_c = p.operation) === null || _c === void 0 ? void 0 : _c.volatility) === 'high')
        return { state: 'UNKNOWN', reason: 'Conviene confirmar el horario antes de ir' };
    if (h || status)
        return { state: 'OPEN_SCHEDULE', reason: 'Sujeto al horario publicado' };
    return { state: 'UNKNOWN', reason: 'Horario no estructurado' };
}
function v4NatureAffinity(p) { const type = v4N(p.mainType), text = v4N([p.name, p.subtype].join(' ')); if (['nature', 'trail', 'beach'].includes(type))
    return 95; if (/indoor|interior|shopping|hotzone|bowling|kart|planetario/.test(text))
    return 5; if (/bioparque|bosque da barra|lagoa rodrigo|parque da catacumba|parque do flamengo|jardim botanico|parque lage|sitio roberto burle marx|floresta|cachoeira/.test(text))
    return 90; if (v4Environment(p) === 'OUTDOOR_PRIMARY')
    return 50; return 5; }
function v4NightAffinity(p) { var _a; if (((_a = p.aff) === null || _a === void 0 ? void 0 : _a.night) != null)
    return p.aff.night; const type = v4N(p.mainType), text = v4N([p.name, p.subtype].join(' ')); if (type === 'nightlife')
    return 96; if (type === 'shopping')
    return 55; if (type === 'theater')
    return /show|musica|música|concert|samba/.test(text) ? 72 : 45; if (type === 'culture' && /musica|música|show|samba|concert/.test(text))
    return 70; if (type === 'family' && /hotzone|bowling|yup star|rio star|carnaval experience/.test(text))
    return 72; if (type === 'beach' && /copacabana|ipanema|leblon/.test(text))
    return 45; return 8; }
function v4WalkingAffinity(p) { const type = v4N(p.mainType), text = v4AllText(p); if (type === 'beach')
    return 84; if (type === 'neighborhood')
    return 76; if (type === 'trail')
    return 50; if (type === 'nature') {
    if (/parque|jardim|jardin|lagoa|aterro|bosque/.test(text))
        return 88;
    return 55;
} if (type === 'family' && /lagoa rodrigo|boulevard olimpico|parque da catacumba|parque do flamengo/.test(text))
    return 90; if (type === 'activity' && /pista|parque|boulevard|orla|camin/.test(text))
    return 86; if (type === 'fort')
    return 55; return 20; }
function v42Rec(score, reason = '', warning = '', confidence = 'DERIVED', compatible = null) {
    const sc = Math.max(0, Math.min(100, Number(score) || 0));
    return { score: sc, level: v4Level(sc), compatible: compatible == null ? sc > 0 : !!compatible, reason, warning: warning || null, confidence };
}
// removed unreachable v42Has

function v42Type(p) { return v4N(p.mainType || p.type || ''); }
function v42EditorialText(p) { var _a, _b, _c, _d, _e, _f, _g, _h; const e = v41FindEditorial(p); return v4N([v4AllText(p), (_a = e === null || e === void 0 ? void 0 : e.row) === null || _a === void 0 ? void 0 : _a.descripcion, (_b = e === null || e === void 0 ? void 0 : e.row) === null || _b === void 0 ? void 0 : _b.description, (_c = e === null || e === void 0 ? void 0 : e.row) === null || _c === void 0 ? void 0 : _c.historia, (_d = e === null || e === void 0 ? void 0 : e.row) === null || _d === void 0 ? void 0 : _d.detalles, (_e = e === null || e === void 0 ? void 0 : e.row) === null || _e === void 0 ? void 0 : _e.tip, (_f = e === null || e === void 0 ? void 0 : e.row) === null || _f === void 0 ? void 0 : _f.ideal, (_g = e === null || e === void 0 ? void 0 : e.row) === null || _g === void 0 ? void 0 : _g.publico, (_h = e === null || e === void 0 ? void 0 : e.row) === null || _h === void 0 ? void 0 : _h.perfil].flat().filter(Boolean).join(' ')); }
function v42AgeProfile(p, base) {
    const t = v42Type(p), txt = v42EditorialText(p), name = v4N(p.name), trail = t === 'trail' || /trilha|sendero|trekking/.test(txt), family = t === 'family' || /aquario|bioparque|planetario|yup star|hotzone|bowling|boliche|kart|carnaval experience|museu da vida|mast|musal/.test(name + ' ' + txt);
    let ages = { '0-2': 35, '3-5': 45, '6-9': 55, '10-12': 60, '13-17': 60 };
    if (family)
        ages = { '0-2': 70, '3-5': 88, '6-9': 94, '10-12': 92, '13-17': 78 };
    if (/aquario|bioparque/.test(name))
        ages = { '0-2': 82, '3-5': 96, '6-9': 98, '10-12': 94, '13-17': 78 };
    if (/hotzone|bowling|boliche|kart/.test(name + ' ' + txt))
        ages = { '0-2': 5, '3-5': 30, '6-9': 70, '10-12': 90, '13-17': 96 };
    if (/museu do amanha|museu da vida|mast|musal|planetario/.test(name))
        ages = { '0-2': 30, '3-5': 58, '6-9': 88, '10-12': 94, '13-17': 94 };
    if (trail) {
        const hard = /dificil|difícil|hard|escalaminhada|exposto|exposição|trecho tecnico|técnico/.test(txt) || /pedra da gavea|pico da tijuca|bico do papagaio/.test(name);
        const moderate = /moderad|subida|desnivel|desnível/.test(txt);
        ages = hard ? { '0-2': 0, '3-5': 0, '6-9': 10, '10-12': 35, '13-17': 70 } : moderate ? { '0-2': 0, '3-5': 10, '6-9': 40, '10-12': 68, '13-17': 86 } : { '0-2': 5, '3-5': 30, '6-9': 68, '10-12': 82, '13-17': 88 };
    }
    if (t === 'museum' && !/interativ|interactiv|ciencia|ciência|astronom|aviacao|aviação|futuro|infantil/.test(txt))
        ages = { '0-2': 15, '3-5': 28, '6-9': 45, '10-12': 58, '13-17': 68 };
    if (/museu do acude/.test(name))
        ages = { '0-2': 10, '3-5': 22, '6-9': 38, '10-12': 48, '13-17': 58 };
    return ages;
}
function v42TrailProfile(p) { var _a, _b, _c, _d; const t = v42Type(p), txt = v42EditorialText(p); if (t !== 'trail' && !/trilha|sendero|trekking/.test(txt))
    return null; const hard = /dificil|difícil|hard|escalaminhada|exposto|exposição|tecnico|técnico/.test(txt); const moderate = hard || /moderad|subida|desnivel|desnível/.test(txt); return { difficulty: hard ? 'HARD' : moderate ? 'MODERATE' : 'EASY_OR_UNKNOWN', distance: ((_a = p.visit) === null || _a === void 0 ? void 0 : _a.distance) || null, duration: ((_b = p.visit) === null || _b === void 0 ? void 0 : _b.raw) || ((_c = p.visit) === null || _c === void 0 ? void 0 : _c.ideal) || null, elevation: ((_d = p.effort) === null || _d === void 0 ? void 0 : _d.elevation) || null, terrain: /rocha|pedra/.test(txt) ? 'ROCK' : /barro|lama/.test(txt) ? 'EARTH_MUD_POSSIBLE' : 'UNKNOWN', shade: /floresta|bosque|mata|sombra/.test(txt) ? 'PARTIAL_OR_GOOD' : 'UNKNOWN', sunExposure: /exposto|sol|sun/.test(txt) ? 'HIGH_OR_PARTIAL' : 'UNKNOWN', recommendedMinimumAge: hard ? 13 : moderate ? 10 : 6, guideRecommended: /guia|guide|orientacao|orientação/.test(txt) || hard, rain: hard ? 'NOT_RECOMMENDED' : 'LOW', heavyRain: 'HARD_EXCLUSION', footwear: 'CLOSED_GRIP_SHOES', safety: 'CHECK_WEATHER_AND_TRAIL_CONDITIONS', photography: /mirante|vista|view|paisagem|paisaje/.test(txt) ? 'STRONG' : 'MEDIUM', nature: 'EXCELLENT' }; }
function v42RecommendationProfile(p) {
    var _a, _b;
    const type = v42Type(p), sub = v4N(p.subtype), txt = v42EditorialText(p), name = v4N(p.name), env = v4Environment(p), price = v4PriceMode(p), trail = v42TrailProfile(p), prof = {};
    const set = (k, s, r = '', w = '', c = 'DERIVED', compat = null) => prof[k] = v42Rec(s, r, w, c, compat);
    const indoor = env === 'INDOOR_PRIMARY', outdoor = env === 'OUTDOOR_PRIMARY', mixed = env === 'OUTDOOR_MIXED';
    const familyPrimary = type === 'family' || /aquario|bioparque|planetario|yup star|hotzone|bowling|boliche|kart|carnaval experience|museu da vida|mast|musal/.test(name + ' ' + txt);
    let fam = familyPrimary ? 92 : (type === 'museum' ? 58 : (type === 'beach' ? 70 : (type === 'trail' ? 42 : 55)));
    if (/museu do acude/.test(name))
        fam = 38;
    if (/museu do amanha/.test(name))
        fam = 84;
    if (/aquario|bioparque/.test(name))
        fam = 97;
    const ages = v42AgeProfile(p, fam);
    const child = Math.max(ages['3-5'], ages['6-9'], ages['10-12']);
    set('children', child, child >= 80 ? 'Experiencia con atractivo real para niños, no solo acceso permitido.' : 'Puede aceptar niños, pero el interés depende de edad y perfil.', '', 'EDITORIAL');
    set('babies', ages['0-2'], 'Afinidad orientativa para 0–2 años.', '', 'EDITORIAL');
    set('toddlers', ages['3-5'], 'Afinidad orientativa para 3–5 años.', '', 'EDITORIAL');
    set('schoolAge', ages['6-9'], 'Afinidad orientativa para 6–9 años.', '', 'EDITORIAL');
    set('preteens', ages['10-12'], 'Afinidad orientativa para 10–12 años.', '', 'EDITORIAL');
    set('teenagers', ages['13-17'], 'Afinidad orientativa para adolescentes.', '', 'EDITORIAL');
    set('family', fam, 'Valor familiar basado en interés, logística y experiencia.', '', 'EDITORIAL');
    let rain = indoor ? 88 : (mixed ? 58 : 18), heavy = indoor ? 78 : (mixed ? 30 : 5);
    if (type === 'trail') {
        rain = 12;
        heavy = 0;
    }
    if (type === 'beach') {
        rain = 8;
        heavy = 0;
    }
    if (/aquario|shopping|hotzone|bowling|boliche|planetario|museu/.test(name + ' ' + txt) && indoor) {
        rain = Math.max(rain, 90);
        heavy = Math.max(heavy, 82);
    }
    set('rain', rain, indoor ? 'Plan protegido para un día de lluvia.' : 'La lluvia reduce la calidad o seguridad de la experiencia.', type === 'trail' ? 'Terreno mojado puede aumentar riesgo.' : '');
    set('heavyRain', heavy, heavy >= 70 ? 'Puede funcionar incluso con lluvia fuerte si el acceso es seguro.' : 'No es una recomendación sólida con lluvia fuerte.', heavy < 20 ? 'Evita si hay tormenta, riesgo de crecida, rayos o terreno resbaladizo.' : '');
    set('outdoor', outdoor ? 98 : mixed ? 70 : 8, outdoor ? 'La experiencia ocurre principalmente al aire libre.' : 'No es una experiencia principalmente exterior.');
    set('indoor', indoor ? 98 : mixed ? 60 : 8, indoor ? 'La experiencia ocurre principalmente bajo techo.' : '');
    let nature = v4NatureAffinity(p);
    if (type === 'nature' || type === 'trail')
        nature = 98;
    if (type === 'beach')
        nature = Math.max(nature, 78);
    set('nature', nature, nature >= 80 ? 'Contacto real con paisaje, vegetación, mar o ambiente natural.' : 'Afinidad natural secundaria.');
    let photo = (p.profiles || []).some(x => v4N(x) === 'photo') ? 90 : 15;
    if (/mirante|view|paisagem|paisaje|arquitet|arquitect|praia|playa|jardim|jardin|cristo|pao de acucar|selaron|amanha|mural|palacio|palácio/.test(txt + ' ' + name))
        photo = Math.max(photo, 82);
    set('photography', photo, photo >= 80 ? 'Experiencia visual fuerte para fotografía.' : 'Fotografía no es el motivo principal.');
    let sunset = /arpoador|ipanema|leblon|pao de acucar|mirante|sunset|atardecer|por do sol|pôr do sol/.test(name + ' ' + txt) ? 92 : (type === 'beach' ? 58 : 15);
    set('sunset', sunset, 'Afinidad con el atardecer.');
    set('sunrise', /amanhecer|sunrise|nascer do sol|telégrafo|telegrafo/.test(txt + ' ' + name) ? 88 : (type === 'beach' ? 45 : 10), 'Afinidad con amanecer.');
    let walk = v4WalkingAffinity(p);
    set('walking', walk, walk >= 70 ? 'Buen lugar para pasear o recorrer a pie.' : 'Caminar no es el atractivo principal.');
    let lowWalk = 65, eff = v4N(((_a = p.effort) === null || _a === void 0 ? void 0 : _a.level) || '');
    if (type === 'trail' || /high|alto|hard|dificil|difícil|subida forte|muita caminhada/.test(eff + ' ' + txt))
        lowWalk = 15;
    else if (/low|bajo|leve|facil|fácil/.test(eff))
        lowWalk = 88;
    if (type === 'museum' || indoor)
        lowWalk = Math.max(lowWalk, 62);
    set('lowWalking', lowWalk, 'Compatibilidad con una visita de poco esfuerzo a pie.');
    set('highWalking', 100 - lowWalk, 'Probabilidad de exigir caminata o esfuerzo.');
    let access = 35;
    if (((_b = p.accessibility) === null || _b === void 0 ? void 0 : _b.raw) && /acess|acces|cadeir|wheelchair/.test(v4N(p.accessibility.raw)))
        access = 82;
    if (type === 'trail')
        access = 5;
    if (/escada|escalera|stairs/.test(txt))
        access = Math.min(access, 28);
    set('reducedMobility', access, 'Afinidad según accesibilidad y esfuerzo.', access < 30 ? 'Revisa terreno, escaleras y acceso antes de ir.' : '');
    set('wheelchair', access, 'Compatibilidad orientativa con silla de ruedas.', '', 'DERIVED');
    set('stroller', Math.min(95, Math.max(10, (access + child) / 2)), 'Compatibilidad orientativa con coche de bebé.');
    let senior = Math.round((lowWalk * 0.55 + access * 0.45));
    if (type === 'trail')
        senior = Math.min(senior, 28);
    set('seniors', senior, 'Combina caminata, terreno y accesibilidad; edad por sí sola no define movilidad.');
    set('free', price === 'FREE' ? 100 : price === 'MIXED' ? 65 : 0, price === 'FREE' ? 'Acceso estructuralmente gratuito.' : price === 'MIXED' ? 'Existe alguna condición de gratuidad.' : 'No consta como gratuito.');
    set('lowBudget', price === 'FREE' ? 100 : price === 'MIXED' ? 75 : 35, 'Afinidad con bajo presupuesto.');
    let culture = ['museum', 'culture', 'literary', 'church', 'fort', 'theater'].includes(type) ? 92 : (/historia|arte|cultura|arquitet|literatura|samba/.test(txt) ? 72 : 25);
    set('culture', culture, 'Contenido cultural de la experiencia.');
    set('history', /historia|histor|patrimonio|palacio|fort|igreja|iglesia/.test(txt + ' ' + type) ? 88 : 25, 'Afinidad histórica.');
    set('science', /ciencia|ciência|astronom|futuro|energia|aquario/.test(txt + ' ' + name) ? 90 : 12, 'Afinidad científica.');
    set('interactive', /interativ|interactiv|imersiv|jogo|game|kart|bowling|hotzone/.test(txt + ' ' + name) ? 90 : (familyPrimary ? 62 : 20), 'Nivel de interacción.');
    set('entertainment', /hotzone|kart|bowling|yup star|show|experience|experiencia/.test(txt + ' ' + name) ? 90 : (familyPrimary ? 65 : 30), 'Afinidad de entretenimiento.');
    set('sport', /futebol|football|maracana|kart|surf|bike|cicl/.test(txt + ' ' + name) ? 90 : 15, 'Afinidad deportiva.');
    set('relaxation', /praia|playa|jardim|jardin|parque|lagoa|relax|tranquil/.test(txt + ' ' + name) ? 82 : 30, 'Afinidad para bajar el ritmo.');
    set('shopping', v3ShoppingAffinity(p), 'Afinidad para compras.');
    set('food', /gastronom|restaurant|cafe|café|comida|food|mercado/.test(txt + ' ' + type) ? 82 : 15, 'Afinidad gastronómica.');
    set('music', /musica|música|samba|show|concert|bossa/.test(txt + ' ' + name) ? 88 : 15, 'Afinidad musical.');
    set('samba', /samba|roda|carnaval/.test(txt + ' ' + name) ? 92 : 8, 'Afinidad con samba/carnaval.');
    set('football', /futebol|football|maracana|flamengo|vasco|botafogo/.test(txt + ' ' + name) ? 95 : 5, 'Afinidad futbolera.');
    set('animals', /aquario|bioparque|zoo|animal|fauna/.test(txt + ' ' + name) ? 98 : 5, 'Afinidad con animales.');
    set('beach', type === 'beach' ? 100 : 0, 'Es una playa.', type === 'beach' ? 'Las condiciones del mar son dinámicas.' : '');
    set('trail', type === 'trail' ? 100 : 0, 'Es un sendero/trilha.', type === 'trail' ? 'Clima y terreno deben revisarse el mismo día.' : '');
    set('viewpoint', /mirante|viewpoint|vista panor|cristo|pao de acucar|pedra/.test(txt + ' ' + name) ? 90 : 15, 'Afinidad de mirador.');
    set('night', v4NightAffinity(p), 'Afinidad nocturna; programación y apertura son dinámicas.');
    set('morning', type === 'nightlife' ? 15 : 75, 'Afinidad general de mañana.');
    set('afternoon', type === 'nightlife' ? 35 : 82, 'Afinidad general de tarde.');
    set('solo', type === 'trail' && (trail === null || trail === void 0 ? void 0 : trail.difficulty) === 'HARD' ? 35 : 72, 'Facilidad orientativa para quien viaja solo.', type === 'trail' ? 'En naturaleza aislada revisa seguridad y necesidad de guía.' : '');
    set('couples', /romantic|romant|sunset|atardecer|praia|playa|mirante/.test(txt + ' ' + name) ? 86 : 58, 'Afinidad para parejas.');
    set('romantic', /romantic|romant|sunset|atardecer|pôr do sol|mirante|leblon|ipanema|urca/.test(txt + ' ' + name) ? 88 : 25, 'Afinidad romántica.');
    set('firstVisit', /cristo|pao de acucar|copacabana|ipanema|amanha|selaron|maracana/.test(txt + ' ' + name) ? 94 : 58, 'Afinidad para una primera visita.');
    set('repeatVisitor', /literary|culture|trail|nature|bairro|barrio|museu|suburb|zona norte/.test(txt + ' ' + name) ? 78 : 50, 'Afinidad para quien ya conoce los clásicos.');
    set('heat', indoor ? 84 : (/sombra|shade|floresta|bosque/.test(txt) ? 68 : (type === 'beach' ? 65 : 32)), 'Afinidad en calor fuerte.');
    set('strongSun', indoor ? 88 : (/sombra|floresta|bosque/.test(txt) ? 72 : 25), 'Protección frente a sol fuerte.');
    return prof;
}
function v4RecommendationProfile(p) { return v42RecommendationProfile(p); }
function v41RowName(x) { return (x === null || x === void 0 ? void 0 : x.nombre) || (x === null || x === void 0 ? void 0 : x.name) || (x === null || x === void 0 ? void 0 : x.titulo) || (x === null || x === void 0 ? void 0 : x.title) || ''; }
function v41ExactKeys(p) { const keys = [p === null || p === void 0 ? void 0 : p.placeId, p === null || p === void 0 ? void 0 : p.sourceId, p === null || p === void 0 ? void 0 : p.name]; ((p === null || p === void 0 ? void 0 : p.aliases) || []).forEach(a => keys.push(typeof a === 'string' ? a : a === null || a === void 0 ? void 0 : a.sourceId)); return new Set(keys.filter(Boolean).map(v4N)); }
function v41FindEditorial(p) {
    const keys = v41ExactKeys(p), sourceRefs = new Set(((p === null || p === void 0 ? void 0 : p.sourceRefs) || []).map(String));
    let candidates = [];
    for (const ds of ERNESTINHO_V41_DATASETS()) {
        for (const row of (Array.isArray(ds.data) ? ds.data : [])) {
            const rid = v4N((row === null || row === void 0 ? void 0 : row.id) || (row === null || row === void 0 ? void 0 : row.sourceId) || ''), rn = v4N(v41RowName(row));
            const exact = (rid && keys.has(rid)) || (rn && keys.has(rn));
            if (exact)
                candidates.push({ ...ds, row, match: 'exact' });
        }
    }
    if (!candidates.length)
        return null;
    candidates.sort((a, b) => Number(sourceRefs.has(b.name)) - Number(sourceRefs.has(a.name)));
    const hit = candidates[0];
    return { dataset: hit.name, section: hit.section, component: hit.component, id: hit.row.id || hit.row.sourceId || p.sourceId || p.placeId, name: v41RowName(hit.row) || p.name, row: hit.row, match: hit.match };
}
function v41MediaFromRow(row = {}) { const gallery = [...(Array.isArray(row.imagenes) ? row.imagenes : []), ...(Array.isArray(row.gallery) ? row.gallery : []), ...(Array.isArray(row.fotos) ? row.fotos : [])].filter(Boolean); const main = row.miniatura || row.fotoPrincipal || row.fotoMedia || row.mainPhoto || row.imagen || row.img || row.portada || gallery[0] || ''; return { mainImage: main, thumbnail: row.miniatura || main, gallery, mapUrl: row.mapUrl || row.mapa || row.map || '', videoUrl: row.videoUrl || row.video || row.reelUrl || '' }; }
// removed unreachable resolveCanonicalEditorial

// ================================================================
// ERNESTINHO INTELLIGENCE V4.3 — TEMPORAL + EXPERIENCE LAYER
// Source of truth: V4.1 canonical identity + V4.2 recommendation profile
// ================================================================
const ERNESTINHO_V43_VERIFIED_AT = '2026-09-13';
const ERNESTINHO_V43_DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const ERNESTINHO_V43_DAY_ALIASES = {
    domingo: 'sunday', domingos: 'sunday', sunday: 'sunday', sundays: 'sunday',
    lunes: 'monday', segunda: 'monday', 'segunda-feira': 'monday', monday: 'monday', mondays: 'monday',
    martes: 'tuesday', terca: 'tuesday', 'terça': 'tuesday', 'terça-feira': 'tuesday', tuesday: 'tuesday', tuesdays: 'tuesday',
    miercoles: 'wednesday', 'miércoles': 'wednesday', quarta: 'wednesday', 'quarta-feira': 'wednesday', wednesday: 'wednesday', wednesdays: 'wednesday',
    jueves: 'thursday', quinta: 'thursday', 'quinta-feira': 'thursday', thursday: 'thursday', thursdays: 'thursday',
    viernes: 'friday', sexta: 'friday', 'sexta-feira': 'friday', friday: 'friday', fridays: 'friday',
    sabado: 'saturday', 'sábado': 'saturday', sabados: 'saturday', 'sábados': 'saturday', saturday: 'saturday', saturdays: 'saturday'
};
function v43RioNow(date = new Date()) {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).formatToParts(date).reduce((o, x) => (o[x.type] = x.value, o), {});
    const weekday = (parts.weekday || '').toLowerCase();
    return { isoDate: `${parts.year}-${parts.month}-${parts.day}`, weekday, minutes: (+parts.hour % 24) * 60 + (+parts.minute), hour: +parts.hour % 24, minute: +parts.minute, label: `${parts.day}/${parts.month}/${parts.year} ${parts.hour}:${parts.minute}`, timeZone: 'America/Sao_Paulo' };
}
// removed unreachable getRioNow

// removed unreachable getRioDate

// removed unreachable getRioWeekday

// removed unreachable getRioMinutesNow

function v43ClockMin(h, m = 0) { return (+h) * 60 + (+m || 0); }
function v43ClockLabel(min) { if (min == null || !Number.isFinite(min))
    return null; const h = Math.floor(min / 60) % 24, m = min % 60; return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`; }
function v43ScheduleAll(open, close, lastEntry = null) { return Object.fromEntries(ERNESTINHO_V43_DAYS.map(d => [d, [{ open, close, lastEntry: lastEntry !== null && lastEntry !== void 0 ? lastEntry : close }]])); }
function v43DayRange(a, b) { const A = ERNESTINHO_V43_DAY_ALIASES[v4N(a)] || v4N(a), B = ERNESTINHO_V43_DAY_ALIASES[v4N(b)] || v4N(b), ia = ERNESTINHO_V43_DAYS.indexOf(A), ib = ERNESTINHO_V43_DAYS.indexOf(B); if (ia < 0 || ib < 0)
    return []; const out = []; let i = ia; for (let n = 0; n < 7; n++) {
    out.push(ERNESTINHO_V43_DAYS[i]);
    if (i === ib)
        break;
    i = (i + 1) % 7;
} return out; }
function v43ParseScheduleText(raw = '') {
    const text = v4N(raw);
    if (!text)
        return null;
    const schedule = Object.fromEntries(ERNESTINHO_V43_DAYS.map(d => [d, null]));
    const timeRe = /(\d{1,2})(?::(\d{2}))?\s*(?:h)?\s*(?:a|as|ate|até|–|—|-)\s*(\d{1,2})(?::(\d{2}))?/i;
    const tm = text.match(timeRe);
    if (!tm)
        return null;
    const open = v43ClockMin(tm[1], tm[2]), close = v43ClockMin(tm[3], tm[4]);
    let lastEntry = null;
    const lm = text.match(/(?:ultima entrada|ultimo acesso|última entrada|último acesso|last entry|portao fecha|portão fecha)[^0-9]{0,20}(\d{1,2})(?::(\d{2}))?/i);
    if (lm)
        lastEntry = v43ClockMin(lm[1], lm[2]);
    if (/todos os dias|todos los dias|todos los días|diariamente|every day/.test(text)) {
        ERNESTINHO_V43_DAYS.forEach(d => schedule[d] = [{ open, close, lastEntry: lastEntry !== null && lastEntry !== void 0 ? lastEntry : close }]);
    }
    else {
        const range = text.match(/(domingo|lunes|segunda(?:-feira)?|martes|terca|terça(?:-feira)?|miercoles|miércoles|quarta(?:-feira)?|jueves|quinta(?:-feira)?|viernes|sexta(?:-feira)?|sabado|sábado)\s+(?:a|ate|até|al?)\s+(domingo|lunes|segunda(?:-feira)?|martes|terca|terça(?:-feira)?|miercoles|miércoles|quarta(?:-feira)?|jueves|quinta(?:-feira)?|viernes|sexta(?:-feira)?|sabado|sábado)/i);
        if (range)
            v43DayRange(range[1], range[2]).forEach(d => schedule[d] = [{ open, close, lastEntry: lastEntry !== null && lastEntry !== void 0 ? lastEntry : close }]);
        else
            Object.entries(ERNESTINHO_V43_DAY_ALIASES).forEach(([alias, d]) => { if (new RegExp(`\\b${alias.replace('-', '\\-')}\\b`, 'i').test(text))
                schedule[d] = [{ open, close, lastEntry: lastEntry !== null && lastEntry !== void 0 ? lastEntry : close }]; });
    }
    Object.entries(ERNESTINHO_V43_DAY_ALIASES).forEach(([alias, d]) => { if (new RegExp(`(?:cerrad[oa]|fechad[oa]|closed)[^.;]{0,20}\\b${alias.replace('-', '\\-')}\\b|\\b${alias.replace('-', '\\-')}\\b[^.;]{0,20}(?:cerrad[oa]|fechad[oa]|closed)`, 'i').test(text))
        schedule[d] = []; });
    return { weeklySchedule: schedule, hoursText: raw, source: 'existing_editorial_text', verifiedAt: null, confidence: 'DERIVED', volatility: 'MEDIUM' };
}
const ERNESTINHO_V43_OFFICIAL_OVERRIDES = {
    'aquario': { weeklySchedule: { sunday: [{ open: 540, close: 1080, lastEntry: 1020 }], monday: [{ open: 540, close: 1020, lastEntry: 960 }], tuesday: [{ open: 540, close: 1020, lastEntry: 960 }], wednesday: [{ open: 540, close: 1020, lastEntry: 960 }], thursday: [{ open: 540, close: 1020, lastEntry: 960 }], friday: [{ open: 540, close: 1020, lastEntry: 960 }], saturday: [{ open: 540, close: 1080, lastEntry: 1020 }] }, hoursText: 'Lun–vie 09:00–17:00 (última entrada 16:00). Sáb, dom y feriados 09:00–18:00 (última entrada 17:00).', sourceUrl: 'https://www.aquariomarinhodorio.com.br/duvidas/', sourceType: 'official', verifiedAt: ERNESTINHO_V43_VERIFIED_AT, confidence: 'VERIFIED', volatility: 'MEDIUM' },
    'museu-do-amanha': { weeklySchedule: { sunday: [{ open: 600, close: 1080, lastEntry: 1020 }], monday: [{ open: 600, close: 1080, lastEntry: 1020 }], tuesday: [{ open: 600, close: 1080, lastEntry: 1020 }], wednesday: [], thursday: [{ open: 600, close: 1080, lastEntry: 1020 }], friday: [{ open: 600, close: 1080, lastEntry: 1020 }], saturday: [{ open: 600, close: 1080, lastEntry: 1020 }] }, hoursText: 'Jueves a martes 10:00–18:00; cerrado miércoles; último acceso 17:00.', sourceUrl: 'https://museudoamanha.org.br/en/welcome/hours-and-tickets', sourceType: 'official', verifiedAt: ERNESTINHO_V43_VERIFIED_AT, confidence: 'VERIFIED', volatility: 'MEDIUM' },
    'jardim-botanico': { weeklySchedule: { sunday: [{ open: 480, close: 1020, lastEntry: 1020 }], monday: [{ open: 480, close: 1020, lastEntry: 1020 }], tuesday: [{ open: 480, close: 1020, lastEntry: 1020 }], wednesday: [{ open: 660, close: 1020, lastEntry: 1020 }], thursday: [{ open: 480, close: 1020, lastEntry: 1020 }], friday: [{ open: 480, close: 1020, lastEntry: 1020 }], saturday: [{ open: 480, close: 1020, lastEntry: 1020 }] }, hoursText: 'Jue–mar 08:00–17:00; miércoles 11:00–17:00.', sourceUrl: 'https://www.gov.br/pt-br/servicos/visitar-o-jardim-botanico-do-rio-de-janeiro', sourceType: 'official', verifiedAt: ERNESTINHO_V43_VERIFIED_AT, confidence: 'VERIFIED', volatility: 'MEDIUM' },
    'pao-de-acucar': { weeklySchedule: v43ScheduleAll(510, 1260, 1170), hoursText: 'Horario base reciente: 08:30–21:00, último ascenso 19:30. Del 03 al 15/09/2026: 07:30–21:00, último ascenso 19:30.', exceptions: [{ from: '2026-09-03', to: '2026-09-15', weeklySchedule: v43ScheduleAll(450, 1260, 1170) }], sourceUrl: 'https://sac.bondinho.com.br/hc/pt-br/articles/9817875364251-Planeje-sua-visita-hor%C3%A1rios-ingressos-e-funcionamento', sourceType: 'official', verifiedAt: ERNESTINHO_V43_VERIFIED_AT, confidence: 'VERIFIED', volatility: 'HIGH' },
    'ccbb-rio': { weeklySchedule: { sunday: [{ open: 540, close: 1200, lastEntry: 1200 }], monday: [{ open: 540, close: 1200, lastEntry: 1200 }], tuesday: [], wednesday: [{ open: 540, close: 1200, lastEntry: 1200 }], thursday: [{ open: 540, close: 1200, lastEntry: 1200 }], friday: [{ open: 540, close: 1200, lastEntry: 1200 }], saturday: [{ open: 540, close: 1200, lastEntry: 1200 }] }, hoursText: 'Miércoles a lunes 09:00–20:00; martes cerrado.', sourceUrl: 'https://ccbb.com.br/rio-de-janeiro/normas-de-visitacao/', sourceType: 'official', verifiedAt: ERNESTINHO_V43_VERIFIED_AT, confidence: 'VERIFIED', volatility: 'MEDIUM' }
};
function v43FindOfficial(p) { const n = v4N((p === null || p === void 0 ? void 0 : p.entityId) || (p === null || p === void 0 ? void 0 : p.placeId) || (p === null || p === void 0 ? void 0 : p.name)); if (/aquario$|^aquario$/.test(n) && !/boulevard/.test(n))
    return ERNESTINHO_V43_OFFICIAL_OVERRIDES['aquario']; if (/museu-do-amanha|museu do amanha/.test(n))
    return ERNESTINHO_V43_OFFICIAL_OVERRIDES['museu-do-amanha']; if (/jardim-botanico|jardim botanico/.test(n))
    return ERNESTINHO_V43_OFFICIAL_OVERRIDES['jardim-botanico']; if (/pao-de-acucar|pao de acucar/.test(n))
    return ERNESTINHO_V43_OFFICIAL_OVERRIDES['pao-de-acucar']; if (/ccbb|centro cultural banco do brasil/.test(n))
    return ERNESTINHO_V43_OFFICIAL_OVERRIDES['ccbb-rio']; return null; }
function v43ExperienceRows() { const rows = []; try {
    (EXPERIENCIAS_DATA || []).forEach(x => rows.push({ ...x, __dataset: 'EXPERIENCIAS_DATA', __route: seoExperienceState(x) }));
}
catch (e) { } try {
    (ACTIVIDADES_NUEVAS || []).forEach(x => rows.push({ ...x, __dataset: 'ACTIVIDADES_NUEVAS', __route: `actividad_${x.id}` }));
}
catch (e) { } return rows; }
function v43ExperienceFor(entity) { const p = typeof entity === 'string' ? getCanonicalEntity(entity) : entity; if (!p)
    return null; const n = v4N(p.name), sid = v4N(p.sourceId || p.entityId); return v43ExperienceRows().find(x => v4N(x.id) === sid || v4N(x.titulo) === n || n === v4N(x.titulo)) || null; }
function v43EntityType(entity) { const p = typeof entity === 'string' ? getCanonicalEntity(entity) : entity; if (!p)
    return 'UNKNOWN'; if (v43ExperienceFor(p))
    return 'EXPERIENCE'; const t = v4N(p.mainType); if (t === 'beach')
    return 'BEACH'; if (t === 'neighborhood')
    return 'NEIGHBORHOOD'; if (t === 'nightlife' || t === 'theater')
    return 'VENUE'; return 'PLACE'; }
function v43PricingFor(entity) { var _a, _b, _c, _d; const p = typeof entity === 'string' ? getCanonicalEntity(entity) : entity; if (!p)
    return { mode: 'UNKNOWN' }; const exp = v43ExperienceFor(p), raw = String((exp === null || exp === void 0 ? void 0 : exp.precio) || ((_a = p.pricing) === null || _a === void 0 ? void 0 : _a.raw) || '').trim(), n = v4N(raw); let mode = p.priceMode || 'UNKNOWN'; if (/gratuit|gratis|free/.test(n))
    mode = /dia|condic|resident|crianca|criança|menor|algum/.test(n) ? 'MIXED' : 'FREE';
else if (/consult|vari|dinamic|promo|desde|a partir/.test(n))
    mode = 'DYNAMIC';
else if (/r\$|brl|pago|pagad/.test(n))
    mode = 'PAID'; const nums = [...raw.matchAll(/R\$\s*([\d.]+(?:,\d{1,2})?)/gi)].map(m => Number(m[1].replace(/\./g, '').replace(',', '.'))).filter(Number.isFinite); return { mode, raw: raw || null, from: nums.length ? Math.min(...nums) : null, standard: nums.length === 1 ? nums[0] : null, currency: 'BRL', freeConditions: ((_b = p.pricing) === null || _b === void 0 ? void 0 : _b.freeConditions) || null, dynamic: mode === 'DYNAMIC', source: exp ? 'existing_experience_dataset' : ((_c = p.pricing) === null || _c === void 0 ? void 0 : _c.source) || 'existing_canonical', verifiedAt: ((_d = p.verification) === null || _d === void 0 ? void 0 : _d.lastAudit) || null, confidence: raw ? 'DERIVED' : 'UNKNOWN' }; }
function v43VisitFor(entity) { var _a, _b, _c, _d; const p = typeof entity === 'string' ? getCanonicalEntity(entity) : entity; if (!p)
    return {}; const exp = v43ExperienceFor(p), raw = String((exp === null || exp === void 0 ? void 0 : exp.duracion) || ((_a = p.visit) === null || _a === void 0 ? void 0 : _a.raw) || ''); let min = ((_b = p.visit) === null || _b === void 0 ? void 0 : _b.min) || null, ideal = ((_c = p.visit) === null || _c === void 0 ? void 0 : _c.ideal) || null, max = ((_d = p.visit) === null || _d === void 0 ? void 0 : _d.max) || null; const h = [...raw.matchAll(/(\d+(?:[.,]\d+)?)\s*(?:a|–|-)?\s*(\d+(?:[.,]\d+)?)?\s*hor/gi)]; if (h.length) {
    const a = Number(h[0][1].replace(',', '.')) * 60, b = h[0][2] ? Number(h[0][2].replace(',', '.')) * 60 : null;
    min = min || Math.round(a);
    ideal = ideal || Math.round(b || a);
    max = max || Math.round(b || a);
} const m = raw.match(/(\d+)\s*min/i); if (m && !ideal) {
    min = min || +m[1];
    ideal = +m[1];
    max = max || +m[1];
} return { minimumMinutes: min, idealMinutes: ideal, maximumMinutes: max, raw: raw || null }; }
function v43OperationFor(entity) { var _a, _b, _c, _d, _e, _f; const p = typeof entity === 'string' ? getCanonicalEntity(entity) : entity; if (!p)
    return { weeklySchedule: null, dynamic: true, confidence: 'UNKNOWN' }; const exp = v43ExperienceFor(p); if (exp) {
    const parsed = v43ParseScheduleText(exp.grupo || exp.duracion || '');
    const weather = /parapente|paracaid|helicopter|parasail|lancha|trekking|pedra|morro/.test(v4N(exp.titulo));
    return { ...(parsed || {}), hoursText: exp.grupo || null, dynamic: !parsed || weather, source: 'existing_experience_dataset', verifiedAt: null, confidence: parsed ? 'DERIVED' : 'UNKNOWN', volatility: weather ? 'HIGH' : 'MEDIUM' };
} const off = v43FindOfficial(p); if (off) {
    let op = { ...off };
    const rio = v43RioNow();
    if (off.exceptions) {
        const ex = off.exceptions.find(x => rio.isoDate >= x.from && rio.isoDate <= x.to);
        if (ex)
            op = { ...op, weeklySchedule: ex.weeklySchedule, activeException: ex };
    }
    return op;
} const parsed = v43ParseScheduleText(((_a = p.operation) === null || _a === void 0 ? void 0 : _a.hoursText) || ''); return parsed ? { ...parsed, dynamic: v4N((_b = p.operation) === null || _b === void 0 ? void 0 : _b.status) === 'dynamic' } : { weeklySchedule: null, hoursText: ((_c = p.operation) === null || _c === void 0 ? void 0 : _c.hoursText) || null, dynamic: v4N((_d = p.operation) === null || _d === void 0 ? void 0 : _d.status) === 'dynamic', source: 'existing_canonical', verifiedAt: ((_e = p.verification) === null || _e === void 0 ? void 0 : _e.lastAudit) || null, confidence: 'UNKNOWN', volatility: (((_f = p.operation) === null || _f === void 0 ? void 0 : _f.volatility) || 'HIGH').toUpperCase() }; }
function v43ReservationFor(entity) { var _a, _b, _c, _d, _e, _f, _g; const p = typeof entity === 'string' ? getCanonicalEntity(entity) : entity; if (!p)
    return { required: null, recommended: null, mechanism: null }; const exp = v43ExperienceFor(p); if (exp)
    return { required: true, recommended: true, mechanism: 'WHATSAPP_OR_EXISTING_BOOKING_FLOW', route: exp.__route, whatsapp: 'https://wa.me/5521969946938', source: 'existing_experience_ui' }; return { required: (_b = (_a = p.reservation) === null || _a === void 0 ? void 0 : _a.required) !== null && _b !== void 0 ? _b : false, recommended: (_d = (_c = p.reservation) === null || _c === void 0 ? void 0 : _c.recommended) !== null && _d !== void 0 ? _d : false, mechanism: ((_e = p.reservation) === null || _e === void 0 ? void 0 : _e.required) || ((_f = p.reservation) === null || _f === void 0 ? void 0 : _f.recommended) ? 'OFFICIAL_OR_ONSITE' : null, raw: ((_g = p.reservation) === null || _g === void 0 ? void 0 : _g.raw) || null, source: 'existing_canonical' }; }
function v43AvailabilityFor(entity, context = {}) {
    var _a;
    const p = typeof entity === 'string' ? getCanonicalEntity(entity) : entity;
    if (!p)
        return { state: 'UNKNOWN', reason: 'Sin datos' };
    const op = v43OperationFor(p), res = v43ReservationFor(p), visit = v43VisitFor(p), rio = context.rioNow || v43RioNow(context.date || new Date());
    const exp = v43ExperienceFor(p);
    if (exp && op.dynamic && !op.weeklySchedule)
        return { state: res.required ? 'RESERVATION_REQUIRED' : 'DYNAMIC', reason: res.required ? 'Requiere confirmar/reservar antes de salir.' : 'Disponibilidad variable; confirmar antes de ir.', operation: op, visit };
    if (!op.weeklySchedule)
        return { state: op.dynamic ? 'DYNAMIC' : 'UNKNOWN', reason: op.dynamic ? 'Horario o estado variable; confirma antes de ir.' : 'No tengo un horario estructurado fiable.', operation: op, visit };
    const slots = op.weeklySchedule[rio.weekday];
    if (slots == null)
        return { state: 'UNKNOWN', reason: 'Horario de este día sin estructurar.', operation: op, visit };
    if (!slots.length)
        return { state: 'CLOSED', reason: 'Cerrado hoy según el horario registrado.', operation: op, visit, nextOpen: null };
    const slot = slots.find(x => rio.minutes >= x.open && rio.minutes < x.close);
    if (!slot) {
        const later = slots.find(x => rio.minutes < x.open);
        return later ? { state: 'OPEN_LATER', reason: `Abre hoy a las ${v43ClockLabel(later.open)}.`, opensAt: v43ClockLabel(later.open), operation: op, visit } : { state: 'CLOSED', reason: 'Ya cerró por hoy.', operation: op, visit };
    }
    const cutoff = (_a = slot.lastEntry) !== null && _a !== void 0 ? _a : slot.close, untilCutoff = cutoff - rio.minutes, untilClose = slot.close - rio.minutes, minVisit = visit.minimumMinutes || Math.min(90, visit.idealMinutes || 0) || null;
    if (rio.minutes >= cutoff)
        return { state: 'CLOSING_SOON', reason: `Sigue abierto, pero la última entrada fue a las ${v43ClockLabel(cutoff)}.`, closesAt: v43ClockLabel(slot.close), lastEntry: v43ClockLabel(cutoff), minutesBeforeClose: untilClose, insufficientVisitTime: true, operation: op, visit };
    if (minVisit && untilClose < minVisit)
        return { state: 'CLOSING_SOON', reason: `Está abierto, pero quedan ${untilClose} min y la visita necesita aprox. ${minVisit} min.`, closesAt: v43ClockLabel(slot.close), lastEntry: v43ClockLabel(cutoff), minutesBeforeClose: untilClose, insufficientVisitTime: true, operation: op, visit };
    if (untilCutoff <= 45)
        return { state: 'CLOSING_SOON', reason: `Está por cerrar la admisión. Última entrada ${v43ClockLabel(cutoff)}.`, closesAt: v43ClockLabel(slot.close), lastEntry: v43ClockLabel(cutoff), minutesBeforeClose: untilClose, operation: op, visit };
    return { state: 'OPEN', reason: `Abierto ahora${slot.close ? `, cierra ${v43ClockLabel(slot.close)}` : ''}.`, closesAt: v43ClockLabel(slot.close), lastEntry: v43ClockLabel(cutoff), minutesBeforeClose: untilClose, operation: op, visit };
}
// removed unreachable getCanonicalOperation

// removed unreachable getCanonicalPricing

// removed unreachable getCanonicalReservation

function getCurrentAvailability(id, context = {}) { return v43AvailabilityFor(id, context); }
function v43ParseTimeContext(raw = '') { const t = v4N(raw); let timeIntent = null; if (/\b(ahora|agora|now|en este momento)\b/.test(t))
    timeIntent = 'NOW';
else if (/\b(esta noche|hoje a noite|esta noite|tonight)\b/.test(t))
    timeIntent = 'TONIGHT';
else if (/\b(esta tarde|hoje a tarde|this afternoon)\b/.test(t))
    timeIntent = 'AFTERNOON';
else if (/\b(hoy|hoje|today)\b/.test(t))
    timeIntent = 'TODAY'; let availableMinutes = null; const m = t.match(/(?:tengo|tenho|i have)\s+(\d+(?:[.,]\d+)?)\s*(hora|horas|hour|hours|min|minutos|minutes)/); if (m)
    availableMinutes = Math.round(Number(m[1].replace(',', '.')) * (m[2].startsWith('h') || m[2].startsWith('hora') ? 60 : 1)); if (/media tarde|half day/.test(t))
    availableMinutes = 240; if (/todo el dia|todo o dia|full day/.test(t))
    availableMinutes = 480; return { timeIntent, availableMinutes }; }
function v43Negations(raw = '') { const t = v4N(raw); return { bar: /\b(sin|sem|without|no)\s+(bar|bares|alcohol|álcool)\b/.test(t), beach: /\b(sin|sem|without|no quiero|nao quero|não quero)\s+(playa|praia|beach)\b/.test(t), museum: /\b(no quiero|nao quero|não quero|without|sin|sem)\s+(museo|museu|museum)\b/.test(t), shopping: /\b(no quiero|nao quero|não quero|without|sin|sem)\s+(shopping|compras|mall)\b/.test(t), walking: /\b(sin|sem|without|no quiero|nao quero|não quero)\s+(caminar|caminhar|walking)\b/.test(t) }; }
function resolveCanonicalCTA(item, context = {}) { const p = typeof item === 'string' ? getCanonicalEntity(item) : item; if (!p)
    return { label: 'VER INFORMACIÓN COMPLETA', kind: 'INFO' }; const exp = v43ExperienceFor(p); if (exp)
    return { label: 'VER EXPERIENCIA', kind: 'EXPERIENCE', route: exp.__route, reservation: v43ReservationFor(p) }; return { label: 'VER INFORMACIÓN COMPLETA', kind: 'PLACE', route: resolveCanonicalRoute(p) }; }
function v43TemporalCoverage() { const C = v4Catalog(), rows = v43ExperienceRows(); const vals = C.map(p => ({ p, op: v43OperationFor(p), pr: v43PricingFor(p), rv: v43ReservationFor(p), av: v43AvailabilityFor(p) })); const cov = { totalEntities: C.length, withStructuredSchedule: vals.filter(x => x.op.weeklySchedule).length, withPricingMode: vals.filter(x => x.pr.mode && x.pr.mode !== 'UNKNOWN').length, withKnownPrice: vals.filter(x => x.pr.from != null || x.pr.standard != null).length, withVisitDuration: vals.filter(x => v43VisitFor(x.p).idealMinutes).length, withReservationData: vals.filter(x => x.rv.required != null || x.rv.recommended != null).length, withCurrentAvailabilitySupport: vals.filter(x => !['UNKNOWN'].includes(x.av.state)).length, withCanonicalCTA: C.length, experiencesDetected: rows.length, experiencesWithOriginalPage: rows.filter(x => x.__route).length, experiencesReservable: rows.length, dynamicEntities: vals.filter(x => x.op.dynamic).length, unknownSchedules: vals.filter(x => !x.op.weeklySchedule).length, unknownPrices: vals.filter(x => x.pr.mode === 'UNKNOWN').length, brokenLinks: 0 }; window.__ERNESTINHO_TEMPORAL_COVERAGE__ = cov; window.__ERNESTINHO_EXPERIENCE_REGISTRY__ = rows.map(x => ({ experienceId: x.id, name: x.titulo, type: 'EXPERIENCE', canonicalRoute: x.__route, sourceDataset: x.__dataset, pricing: x.precio || null, reservation: { required: true, mechanism: 'existing_flow' }, duration: x.duracion || null, schedule: x.grupo || null, meetingPoint: x.encuentro || null, mainImage: x.imagen || x.miniatura || null })); return cov; }
function V43PlanVisit({ entity }) { const p = typeof entity === 'string' ? getCanonicalEntity(entity) : entity; if (!p)
    return null; const op = v43OperationFor(p), pr = v43PricingFor(p), av = v43AvailabilityFor(p), rv = v43ReservationFor(p), vi = v43VisitFor(p); const state = { OPEN: '🟢 Abierto ahora', CLOSED: '🔴 Cerrado ahora', OPEN_LATER: '🟡 Abre más tarde', CLOSING_SOON: '🟠 Poco tiempo disponible', UNKNOWN: '⚪ Horario por confirmar', DYNAMIC: '🟣 Disponibilidad variable', RESERVATION_REQUIRED: '🟣 Requiere reserva' }[av.state] || av.state; const rows = [['🕐', 'Horario', op.hoursText], ['📍', 'Estado', state], ['🎟️', 'Precio', pr.raw || pr.mode], ['⏱️', 'Tiempo recomendado', vi.raw || vi.idealMinutes && `${vi.idealMinutes} min`], ['📅', 'Reserva', rv.required ? 'Requerida / confirmar disponibilidad' : rv.recommended ? 'Recomendada' : 'No consta como necesaria']].filter(x => x[2]); return React.createElement("section", { className: "mt-5 rounded-[1.8rem] bg-slate-950 text-white p-5 sm:p-6" },
    React.createElement("span", { className: "text-[10px] font-black text-amber-300" }, "\uD83E\uDDED PLANIFICA TU VISITA"),
    React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4" }, rows.map(([ic, k, v]) => React.createElement("div", { key: k, className: "rounded-2xl bg-white/10 p-4" },
        React.createElement("span", { className: "text-lg" }, ic),
        React.createElement("b", { className: "block text-[10px] mt-1 text-white/60" }, k),
        React.createElement("p", { className: "text-xs font-bold mt-1" }, v)))),
    av.reason && React.createElement("p", { className: "text-xs text-white/70 mt-4" }, av.reason)); }
function resolveCanonicalRoute(entity) { var _a; const p = typeof entity === 'string' ? getCanonicalEntity(entity) : entity; if (!p)
    return { section: 'master4_entity_v4', id: null, kind: 'fallback' }; const exp = v43ExperienceFor(p); if (exp)
    return { section: exp.__route, id: exp.id, kind: 'experience', dataset: exp.__dataset, component: 'ORIGINAL_EXPERIENCE_PAGE' }; const e = ((_a = p.canonical) === null || _a === void 0 ? void 0 : _a.editorial) || v41FindEditorial(p); return e ? { section: e.section, id: e.id, kind: 'editorial', dataset: e.dataset, component: e.component } : { section: 'master4_entity_v4', id: p.entityId, kind: 'fallback' }; }
// removed unreachable resolveCanonicalImage

// removed unreachable v4CanonicalRoute

function v42CoverageScore(p) { const a = p.recommendationProfile || {}, keys = ['family', 'children', 'teenagers', 'rain', 'heavyRain', 'outdoor', 'nature', 'photography', 'seniors', 'reducedMobility', 'lowWalking', 'free', 'culture', 'firstVisit', 'repeatVisitor']; const known = keys.filter(k => a[k] && a[k].confidence !== 'UNKNOWN').length; return Math.round(known / keys.length * 100); }
function v4NormalizeEntity(p) { var _a, _b, _c, _d, _e, _f, _g, _h; const prof = v4RecommendationProfile(p), priceMode = v4PriceMode(p), availability = v4TodayAvailability(p), editorial = v41FindEditorial(p), em = editorial ? v41MediaFromRow(editorial.row) : null; const ageCompatibility = { '0–2': prof.babies, '3–5': prof.toddlers, '6–9': prof.schoolAge, '10–12': prof.preteens, '13–17': prof.teenagers }; const trailProfile = v42TrailProfile(p); const out = { ...p, entityId: p.placeId || p.sourceId, canonical: { route: editorial ? editorial.section : 'master4_entity_v4', section: editorial ? editorial.section : v4N(p.mainType), sourceDataset: (editorial === null || editorial === void 0 ? void 0 : editorial.dataset) || (p.sourceRefs || [])[0] || 'decision', mainImage: (em === null || em === void 0 ? void 0 : em.mainImage) || ((_a = p.media) === null || _a === void 0 ? void 0 : _a.mainPhoto) || ((_b = p.media) === null || _b === void 0 ? void 0 : _b.thumbnail) || '', thumbnail: (em === null || em === void 0 ? void 0 : em.thumbnail) || ((_c = p.media) === null || _c === void 0 ? void 0 : _c.thumbnail) || '', gallery: (em === null || em === void 0 ? void 0 : em.gallery) || [], mapUrl: (em === null || em === void 0 ? void 0 : em.mapUrl) || ((_d = p.media) === null || _d === void 0 ? void 0 : _d.mapUrl) || '', videoUrl: (em === null || em === void 0 ? void 0 : em.videoUrl) || ((_e = p.media) === null || _e === void 0 ? void 0 : _e.videoUrl) || '', editorial: editorial ? { dataset: editorial.dataset, section: editorial.section, component: editorial.component, id: editorial.id, name: editorial.name } : null }, priceMode, availability, recommendationProfile: prof, ageCompatibility, trailProfile, environmentV4: v4Environment(p), primaryExperience: v4N(p.subtype || p.mainType), secondaryExperiences: Object.entries(prof).filter(([k, v]) => (v === null || v === void 0 ? void 0 : v.score) >= 80).map(([k]) => k), whyGo: ((_f = p.editorial) === null || _f === void 0 ? void 0 : _f.idealFor) || ((_g = p.editorial) === null || _g === void 0 ? void 0 : _g.ernestinhoTip) || ((_h = editorial === null || editorial === void 0 ? void 0 : editorial.row) === null || _h === void 0 ? void 0 : _h.descripcion) || '', notRecommendedFor: Object.entries(prof).filter(([k, v]) => (v === null || v === void 0 ? void 0 : v.level) === 'NOT_RECOMMENDED').map(([k]) => k) }; out.coverageScore = v42CoverageScore(out); return out; }
let CANONICAL_RECOMMENDATION_CACHE = null;
function v4Catalog() { if (CANONICAL_RECOMMENDATION_CACHE)
    return CANONICAL_RECOMMENDATION_CACHE; const seen = new Map(); v3DecisionCatalog().forEach(raw => { const p = v4NormalizeEntity(raw), k = v4N(p.entityId || p.name); if (!seen.has(k))
    seen.set(k, p); }); CANONICAL_RECOMMENDATION_CACHE = [...seen.values()]; return CANONICAL_RECOMMENDATION_CACHE; }
function getCanonicalEntity(id) { const n = v4N(id); return v4Catalog().find(p => v4N(p.entityId) === n || v4N(p.sourceId) === n || v4N(p.name) === n); }
function getCanonicalRoute(id) { return resolveCanonicalRoute(id); }
function getRecommendationProfile(id) { var _a; return ((_a = getCanonicalEntity(id)) === null || _a === void 0 ? void 0 : _a.recommendationProfile) || {}; }
// removed unreachable getCurrentAvailabilityLegacyV42

function v4Parse(raw = '') { const p = parseTravelerQueryLocalV3(raw); const t = v4N(raw); if (/padres|papas|mam[aá]|adultos mayores|idosos|seniors|older parents/.test(t))
    p.intents.push('seniors'); if (/calor|heat|quente/.test(t))
    p.intents.push('heat'); if (/lluvia fuerte|chuva forte|heavy rain/.test(t))
    p.intents.push('heavyRain'); if (/reservar|reserva|book|booking|comprar|buy/.test(t))
    p.intents.push('reservable'); if (/experiencia|experience|tour|paseo guiado/.test(t))
    p.intents.push('experience'); const tc = v43ParseTimeContext(raw); if (tc.timeIntent === 'TONIGHT' && !p.intents.includes('night'))
    p.intents.push('night'); return { ...p, ...tc, negations: { ...(p.negations || {}), ...v43Negations(raw) } }; }
function v4Context(parsed, manual = {}) { const intents = [...new Set(parsed.intents || [])]; Object.entries(manual).forEach(([k, v]) => { if (v && !intents.includes(k))
    intents.push(k); }); return { ...parsed, intents, rioNow: v43RioNow(), availableMinutes: parsed.availableMinutes || null }; }
function v4HardFilter(p, c) {
    var _a, _b, _c;
    const I = c.intents || [], A = p.recommendationProfile, av = getCurrentAvailability(p, c), neg = c.negations || {}, etype = v43EntityType(p), txt = v4N([p.name, p.subtype, p.mainType].join(' '));
    if (c.timeIntent === 'NOW' && ['CLOSED', 'OPEN_LATER', 'TEMPORARILY_CLOSED', 'SOLD_OUT'].includes(av.state))
        return [false, av.reason || 'no disponible ahora'];
    if (c.timeIntent === 'NOW' && av.insufficientVisitTime)
        return [false, 'no alcanza el tiempo útil antes del cierre'];
    if (c.timeIntent === 'NOW' && av.state === 'RESERVATION_REQUIRED')
        return [false, 'requiere reserva previa'];
    if (neg.bar && (/bar|boteco|pub|cervej|cocktail|drinks/.test(txt) || p.alcoholPrimary))
        return [false, 'pidió sin bar/alcohol'];
    if (neg.beach && v4N(p.mainType) === 'beach')
        return [false, 'pidió sin playa'];
    if (neg.museum && v4N(p.mainType) === 'museum')
        return [false, 'pidió sin museo'];
    if (neg.shopping && ((_a = A.shopping) === null || _a === void 0 ? void 0 : _a.score) >= 55)
        return [false, 'pidió sin shopping'];
    if (neg.walking && ((_b = A.walking) === null || _b === void 0 ? void 0 : _b.score) >= 70)
        return [false, 'pidió sin caminar'];
    if (I.includes('experience') && etype !== 'EXPERIENCE')
        return [false, 'pidió una experiencia'];
    if (I.includes('reservable') && etype !== 'EXPERIENCE')
        return [false, 'pidió reservar/comprar una experiencia'];
    if (I.includes('beach') && A.beach.score < 90)
        return [false, 'pidió playa'];
    if (I.includes('outdoor') && A.outdoor.score < 60)
        return [false, 'pidió aire libre'];
    if (I.includes('nature') && A.nature.score < 55)
        return [false, 'pidió naturaleza'];
    if (I.includes('photos') && A.photography.score < 55)
        return [false, 'pidió un lugar bueno para fotos'];
    if (I.includes('family') && A.children.score < 25)
        return [false, 'muy baja afinidad infantil'];
    if (I.includes('free') && !['FREE', 'MIXED'].includes(v43PricingFor(p).mode))
        return [false, 'no consta como gratis'];
    if (I.includes('heavyRain') && A.heavyRain.score < 55)
        return [false, 'no recomendable con lluvia fuerte'];
    if (I.includes('rain') && A.rain.score < 45)
        return [false, 'mala opción con lluvia'];
    if (I.includes('night') && A.night.score < 55)
        return [false, 'no es una opción nocturna sólida'];
    if (I.includes('night') && ['culture', 'theater'].includes(v4N(p.mainType)) && ((_c = p.aff) === null || _c === void 0 ? void 0 : _c.night) == null)
        return [false, 'necesita programación nocturna confirmada'];
    if (I.includes('shopping') && A.shopping.score < 55)
        return [false, 'no es una opción de compras'];
    if (I.includes('walk') && A.walking.score < 50)
        return [false, 'no es una buena opción para caminar'];
    if (I.includes('karting') && !/kart/.test(v4AllText(p)))
        return [false, 'pidió karting'];
    if (I.includes('bowling') && !/bowling|boliche/.test(v4AllText(p)))
        return [false, 'pidió bowling'];
    if (I.includes('lowWalk') && A.lowWalking.score < 35)
        return [false, 'requiere demasiado esfuerzo'];
    if (I.includes('seniors') && A.seniors.score < 35)
        return [false, 'baja compatibilidad con adultos mayores'];
    return [true, ''];
}
function v4AffinityScore(p, c) { const I = c.intents || [], A = p.recommendationProfile; let s = 20, reasons = []; const add = (key, label, w = 1) => { if (A[key]) {
    s += A[key].score * w;
    if (A[key].score >= 60)
        reasons.push(label);
} }; if (I.includes('free') && ['beach', 'nature', 'trail', 'family', 'activity'].includes(v4N(p.mainType)))
    s += 18; if (I.includes('outdoor') && ['beach', 'nature', 'trail'].includes(v4N(p.mainType)))
    s += 18; if (I.includes('family'))
    add('children', '👨‍👩‍👧 recomendado con niños', 1.15); if (I.includes('outdoor'))
    add('outdoor', '☀️ al aire libre'); if (I.includes('nature'))
    add('nature', '🌿 naturaleza'); if (I.includes('free'))
    add('free', '💸 gratis'); if (I.includes('photos'))
    add('photography', '📸 bueno para fotos'); if (I.includes('night'))
    add('night', '🌙 encaje nocturno'); if (I.includes('lowWalk'))
    add('lowWalking', '🧓 poco caminar'); if (I.includes('seniors'))
    add('seniors', '🧓 adecuado para adultos mayores'); if (I.includes('rain'))
    add('rain', '🌧️ funciona con lluvia'); if (I.includes('heavyRain'))
    add('heavyRain', '🌧️ protegido con lluvia fuerte'); if (I.includes('shopping'))
    add('shopping', '🛍️ compras'); if (I.includes('culture'))
    add('culture', '🏛️ cultura'); if (I.includes('music'))
    add('music', '🎶 música'); if (I.includes('sunset'))
    add('sunset', '🌅 atardecer'); if (I.includes('beach'))
    add('beach', '🏖️ playa'); if (I.includes('walk'))
    add('walking', '🚶 bueno para caminar'); const vi = v43VisitFor(p); if (c.availableMinutes && vi.idealMinutes) {
    if (vi.idealMinutes <= c.availableMinutes) {
        s += 20;
        reasons.push('⏱️ cabe en tu tiempo');
    }
    else if ((vi.minimumMinutes || vi.idealMinutes) > c.availableMinutes)
        s -= 45;
} const av = getCurrentAvailability(p, c); if (av.state === 'OPEN') {
    s += 18;
    if (c.timeIntent)
        reasons.push('🟢 abierto ahora');
} if (av.state === 'UNKNOWN' || av.state === 'DYNAMIC')
    s -= 5; if (v43EntityType(p) === 'EXPERIENCE' && I.includes('experience'))
    s += 35; return { score: s, reasons: [...new Set(reasons)].slice(0, 4) }; }
function v4TopDiverse(all, limit = 8) { const out = [], counts = {}; for (const x of all) {
    const k = v43EntityType(x.p) + ':' + v4N(x.p.mainType || 'otros');
    if ((counts[k] || 0) >= 3)
        continue;
    out.push(x);
    counts[k] = (counts[k] || 0) + 1;
    if (out.length >= limit)
        break;
} if (out.length < limit) {
    for (const x of all) {
        if (!out.includes(x)) {
            out.push(x);
            if (out.length >= limit)
                break;
        }
    }
} return out; }
function rankEntities(context) { const rejected = [], all = [], later = []; v4Catalog().forEach(p => { const sc = v4AffinityScore(p, context), av = getCurrentAvailability(p, context); const [h, why] = v4HardFilter(p, context); if (!h) {
    if (context.timeIntent === 'NOW' && ['CLOSED', 'OPEN_LATER', 'CLOSING_SOON', 'RESERVATION_REQUIRED'].includes(av.state) && sc.score >= 60)
        later.push({ p, ...sc, availability: av });
    else
        rejected.push({ id: p.entityId, name: p.name, reason: why });
    return;
} if (sc.score >= 38)
    all.push({ p, ...sc, availability: av }); }); all.sort((a, b) => b.score - a.score || a.p.name.localeCompare(b.p.name)); later.sort((a, b) => b.score - a.score); return { all, rejected, later, top: v4TopDiverse(all, 8) }; }
function V4FitBlock({ entity }) {
    const p = typeof entity === 'string' ? getCanonicalEntity(entity) : entity;
    if (!p)
        return null;
    const a = p.recommendationProfile || {};
    const lang = (window.__ERNESTINHO_RENDER_LANG__ || 'es').toLowerCase();
    const tr = { es: { ey: '🧠 INTELIGENCIA ERNESTINHO', title: '¿Va contigo?', sub: 'No te digo solamente si puedes ir: te digo para quién y cuándo realmente lo recomiendo.', why: 'Por qué', warn: 'Atención' }, pt: { ey: '🧠 INTELIGÊNCIA ERNESTINHO', title: 'Combina com você?', sub: 'Não digo apenas se você pode ir: mostro para quem e quando realmente recomendo.', why: 'Por quê', warn: 'Atenção' }, en: { ey: '🧠 ERNESTINHO INTELLIGENCE', title: 'Is it right for you?', sub: 'Not just whether you can go: who I truly recommend it for and when.', why: 'Why', warn: 'Note' } }[lang] || null;
    const T = tr || { ey: '🧠 INTELIGENCIA ERNESTINHO', title: '¿Va contigo?', sub: 'No te digo solamente si puedes ir: te digo para quién y cuándo realmente lo recomiendo.', why: 'Por qué', warn: 'Atención' };
    const labels = { children: ['👨‍👩‍👧', 'Niños'], teenagers: ['🧑', 'Adolescentes'], family: ['👪', 'Familias'], rain: ['🌧️', 'Lluvia'], heavyRain: ['⛈️', 'Lluvia fuerte'], photography: ['📸', 'Fotos'], reducedMobility: ['♿', 'Movilidad reducida'], seniors: ['🧓', 'Adultos mayores'], outdoor: ['☀️', 'Aire libre'], nature: ['🌿', 'Naturaleza'], lowWalking: ['🚶', 'Poco caminar'], romantic: ['❤️', 'Pareja'], solo: ['🧍', 'Viajar solo'], firstVisit: ['⭐', 'Primera vez'], repeatVisitor: ['🔎', 'Ya conoces Río'], free: ['💸', 'Gratis'], culture: ['🏛️', 'Cultura'], science: ['🔭', 'Ciencia'], interactive: ['🎮', 'Interactivo'], sunset: ['🌅', 'Atardecer'], night: ['🌙', 'Noche'] };
    const priority = ['children', 'teenagers', 'family', 'rain', 'heavyRain', 'photography', 'reducedMobility', 'seniors', 'outdoor', 'nature', 'lowWalking', 'romantic', 'solo', 'firstVisit', 'repeatVisitor', 'free', 'culture', 'science', 'interactive', 'sunset', 'night'];
    const items = priority.map(k => [k, ...(labels[k] || ['•', k]), a[k]]).filter(x => x[3] && x[3].score >= 35).sort((x, y) => y[3].score - x[3].score).slice(0, 8);
    const lab = l => ({ EXCELLENT: '⭐ Excelente', STRONG: '👍 Muy recomendado', MEDIUM: '✓ Recomendado', LOW: '○ Puede servir', COMPATIBLE_ONLY: '○ Compatible', NOT_RECOMMENDED: '— No lo recomiendo', UNKNOWN: '? Por verificar' }[l] || '? Por verificar');
    return React.createElement("div", { className: "ec-v4-fit-block" },
        React.createElement("section", { className: "mt-5 rounded-[1.8rem] bg-white border p-5 sm:p-6" },
            React.createElement("span", { className: "text-[10px] font-black text-emerald-700" }, T.ey),
            React.createElement("h2", { className: "text-2xl font-black mt-1" }, T.title),
            React.createElement("p", { className: "text-xs text-slate-500 mt-1 max-w-3xl" }, T.sub),
            React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-5" }, items.map(([k, ic, n, v]) => React.createElement("div", { key: k, className: "rounded-2xl border bg-slate-50 p-4" },
                React.createElement("div", { className: "flex items-center gap-2" },
                    React.createElement("span", null, ic),
                    React.createElement("b", { className: "text-xs" }, n)),
                React.createElement("strong", { className: "block text-xs mt-2" }, lab(v.level)),
                v.reason && v.score >= 56 && React.createElement("p", { className: "text-[10px] leading-relaxed text-slate-500 mt-2" }, v.reason),
                v.warning && React.createElement("p", { className: "text-[10px] leading-relaxed text-amber-700 mt-2" },
                    "\u26A0\uFE0F ",
                    v.warning)))),
            p.ageCompatibility && React.createElement("div", { className: "mt-4 rounded-2xl bg-emerald-50 p-4" },
                React.createElement("b", { className: "text-xs" }, "\uD83D\uDC67 Edades"),
                React.createElement("div", { className: "flex flex-wrap gap-2 mt-2" }, Object.entries(p.ageCompatibility).map(([age, v]) => React.createElement("span", { key: age, className: "rounded-full bg-white border px-3 py-2 text-[10px] font-black" },
                    age,
                    ": ",
                    lab(v.level)))))),
        React.createElement(V43PlanVisit, { entity: p }));
}
function Master4EntityDetailV4(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/Master4EntityDetailV4.js?v=20260922',name:'Master4EntityDetailV4',componentProps:props})}
const ERNESTINHO_V44_VERSION = '4.4';
const ERNESTINHO_V44_MEDIA_ALIASES = {
    'parque-das-catacumbas': 'catacumba', 'parque-da-catacumba': 'catacumba', 'rio-sul-shopping': 'rio-sul', 'riosul-shopping': 'rio-sul', 'shopping-riosul': 'rio-sul', 'norteshopping': 'norte-shopping',
    'pedra-do-sal': 'pedra-sal', 'beco-do-rato': 'beco-rato', 'blue-note-rio': 'blue-note', 'pico-da-tijuca': 'pico-tijuca', 'bico-do-papagaio': 'bico-papagaio', 'cachoeira-dos-primatas': 'primatas', 'circuito-das-grutas': 'circuito-grutas', 'pedra-do-pontal': 'pontal', 'pedra-da-gavea': 'pedra-gavea-trek'
};
const ERNESTINHO_V44_GROUP_MEDIA = {
    'gavea-jardim-botanico-lagoa': 'https://res.cloudinary.com/qa301cbc/image/upload/v1789041016/sitio_burle_marx_1243yu.jpg',
    'barra-recreio-zona-oeste': 'https://res.cloudinary.com/qa301cbc/image/upload/v1788820935/playa_barra_de_tijuca.jpg',
    'centro-praca-maua': 'https://res.cloudinary.com/qa301cbc/image/upload/v1788348156/800x600.png',
    'botafogo-humaita-urca': 'https://res.cloudinary.com/qa301cbc/image/upload/v1788389094/botagofoxx.jpg',
    'flamengo-catete-gloria': 'https://res.cloudinary.com/qa301cbc/image/upload/v1788389092/aterro_flamengo.jpg',
    'ipanema-leblon': 'https://res.cloudinary.com/qa301cbc/image/upload/v1788962082/leblon_creo_que_sirve_para_portada.jpg',
    'zona-norte': 'https://res.cloudinary.com/qa301cbc/image/upload/v1788447586/e6.jpg',
    'santa-teresa-lapa': 'https://res.cloudinary.com/qa301cbc/image/upload/v1788393697/rio_scenarium.jpg'
};
function v44Slug(x = '') { return v4N(String(x)).replace(/\s+/g, '-'); }
function v44Rows() {
    const sets = [];
    const add = (name, arr) => { try {
        if (Array.isArray(arr))
            sets.push([name, arr]);
    }
    catch (e) { } };
    add('FAMILIA_DATA', typeof FAMILIA_DATA !== 'undefined' ? FAMILIA_DATA : null);
    add('MUSEOS_DATA', typeof MUSEOS_DATA !== 'undefined' ? MUSEOS_DATA : null);
    add('PLAYAS_DETALLADAS_DATA', typeof PLAYAS_DETALLADAS_DATA !== 'undefined' ? PLAYAS_DETALLADAS_DATA : null);
    add('SENDEROS_RIO', typeof SENDEROS_RIO !== 'undefined' ? SENDEROS_RIO : null);
    add('CENTROS_CULTURALES_DATA', typeof CENTROS_CULTURALES_DATA !== 'undefined' ? CENTROS_CULTURALES_DATA : null);
    add('ESPACIOS_LITERARIOS_DATA', typeof ESPACIOS_LITERARIOS_DATA !== 'undefined' ? ESPACIOS_LITERARIOS_DATA : null);
    add('EXPERIENCIAS_DATA', typeof EXPERIENCIAS_DATA !== 'undefined' ? EXPERIENCIAS_DATA : null);
    add('ACTIVIDADES_NUEVAS', typeof ACTIVIDADES_NUEVAS !== 'undefined' ? ACTIVIDADES_NUEVAS : null);
    add('FUERTES_DATA', typeof FUERTES_DATA !== 'undefined' ? FUERTES_DATA : null);
    add('IGLESIAS_DATA', typeof IGLESIAS_DATA !== 'undefined' ? IGLESIAS_DATA : null);
    add('TEATROS_DATA', typeof TEATROS_DATA !== 'undefined' ? TEATROS_DATA : null);
    add('SHOPPINGS_DATA', typeof SHOPPINGS_DATA !== 'undefined' ? SHOPPINGS_DATA : null);
    add('BARRIOS_DATA', typeof BARRIOS_DATA !== 'undefined' ? BARRIOS_DATA : null);
    add('VIDA_NOCTURNA_CON_FOTOS', typeof VIDA_NOCTURNA_CON_FOTOS !== 'undefined' ? VIDA_NOCTURNA_CON_FOTOS : null);
    return sets;
}
function v44RowKeys(row) { return [row === null || row === void 0 ? void 0 : row.id, row === null || row === void 0 ? void 0 : row.sourceId, row === null || row === void 0 ? void 0 : row.placeId, row === null || row === void 0 ? void 0 : row.nombre, row === null || row === void 0 ? void 0 : row.name, row === null || row === void 0 ? void 0 : row.titulo, row === null || row === void 0 ? void 0 : row.title, row === null || row === void 0 ? void 0 : row.slug].filter(Boolean).map(v44Slug); }
function v44ExactRow(p) { const keys = [p === null || p === void 0 ? void 0 : p.entityId, p === null || p === void 0 ? void 0 : p.sourceId, p === null || p === void 0 ? void 0 : p.placeId, p === null || p === void 0 ? void 0 : p.name].filter(Boolean).map(v44Slug); const aliases = []; keys.forEach(k => { aliases.push(k); if (ERNESTINHO_V44_MEDIA_ALIASES[k])
    aliases.push(v44Slug(ERNESTINHO_V44_MEDIA_ALIASES[k])); }); for (const [dataset, rows] of v44Rows()) {
    for (const row of rows) {
        const rk = v44RowKeys(row);
        if (aliases.some(k => rk.includes(k)))
            return { dataset, row };
    }
} return null; }
function v44ImageFromRow(row) { if (!row)
    return null; const fields = ['fotoPrincipal', 'miniatura', 'thumbnail', 'mainPhoto', 'imagen', 'imagem', 'image', 'img', 'foto', 'portada', 'cover']; for (const f of fields) {
    const u = row[f];
    if (typeof u === 'string' && /^https?:\/\//i.test(u.trim()))
        return u.trim();
} const gallery = row.gallery || row.galeria || row.fotos; if (Array.isArray(gallery)) {
    const u = gallery.find(x => typeof x === 'string' && /^https?:\/\//i.test(x));
    if (u)
        return u;
} return null; }
function v44ResolveMedia(entity) {
    var _a, _b, _c, _d;
    const p = typeof entity === 'string' ? getCanonicalEntity(entity) : entity;
    if (!p)
        return { url: null, source: 'NONE', exact: false };
    const key = v44Slug(p.entityId || p.name);
    const row = v44ExactRow(p);
    const exact = v44ImageFromRow(row === null || row === void 0 ? void 0 : row.row);
    if (exact)
        return { url: exact, thumbnail: exact, source: row.dataset, exact: true };
    const group = ERNESTINHO_V44_GROUP_MEDIA[key] || ERNESTINHO_V44_GROUP_MEDIA[v44Slug(p.name)];
    if (group)
        return { url: group, thumbnail: group, source: 'GROUP_EDITORIAL_MEDIA', exact: true };
    const can = ((_a = p.canonical) === null || _a === void 0 ? void 0 : _a.mainImage) || ((_b = p.canonical) === null || _b === void 0 ? void 0 : _b.thumbnail) || ((_c = p.media) === null || _c === void 0 ? void 0 : _c.mainPhoto) || ((_d = p.media) === null || _d === void 0 ? void 0 : _d.thumbnail) || null;
    return { url: can, thumbnail: can, source: can ? 'CANONICAL_EXISTING' : 'NONE', exact: !!can };
}
function v44SpecialContext(entity) { var _a; const p = typeof entity === 'string' ? getCanonicalEntity(entity) : entity; if (!p)
    return {}; const n = v44Slug(p.entityId || p.name), txt = v4N([p.name, p.sourceId, p.subtype, p.whyGo].filter(Boolean).join(' ')); if (n === 'praia-do-abrico' || n === 'playa-de-abrico' || /praia do abrico|playa de abrico/.test(txt))
    return { naturist: true, nudistBeach: true, audienceContext: 'NATURIST', familyConventional: 'NOT_RECOMMENDED', reason: 'Es una playa naturista/nudista; por eso no la priorizo cuando buscas una playa familiar convencional.' }; const nightlife = v4N(p.mainType) === 'nightlife' || v4N(p.subtype).includes('boteco') || v4N(p.subtype).includes('bar'); const trail = v4N(p.mainType) === 'trail'; return { nightlifePrimary: nightlife || undefined, alcoholPrimary: (nightlife && /bar|boteco|rooftop|discoteca/.test(v4N(p.subtype))) || undefined, highPhysicalDemand: (trail && ['high', 'very_high'].includes(v4N((_a = p.effort) === null || _a === void 0 ? void 0 : _a.level))) || undefined, isolatedNature: (trail && /tijuca|gavea|papagaio|pontal|grutas|primatas/.test(v4N(p.name))) || undefined }; }
function v44AgeBand(age) { if (age <= 2)
    return '0-2'; if (age <= 5)
    return '3-5'; if (age <= 9)
    return '6-9'; if (age <= 12)
    return '10-12'; if (age <= 17)
    return '13-17'; return 'adult'; }
function v44ParseAges(t) { const ages = []; const patterns = [/(?:hijo|hija|ni[nñ]o|ni[nñ]a|filho|filha|menino|menina|son|daughter|child|kid)\s*(?:de|tem|has|aged)?\s*(\d{1,2})/g, /(?:tiene|tem|has)\s*(\d{1,2})\s*(?:a[nñ]os|anos|years?)/g, /\b(\d{1,2})\s*(?:a[nñ]os|anos|years? old)\b/g]; patterns.forEach(re => { let m; while ((m = re.exec(t))) {
    const a = +m[1];
    if (a >= 0 && a <= 17 && !ages.includes(a))
        ages.push(a);
} }); return ages.sort((a, b) => a - b); }
function v44ResolveTargets(raw = '') { const t = v4N(raw), C = v4Catalog(), ids = []; const push = (pred) => { const p = C.find(pred); if (p && !ids.includes(p.entityId))
    ids.push(p.entityId); }; if (/aquario/.test(t) && /(boulevard|zona portuaria|porto maravi|praca maua|praça maua)/.test(t))
    push(p => v44Slug(p.entityId) === 'aquario-boulevard-olimpico' || /aquario.*boulevard/.test(v4N(p.name)));
else if (/aquario/.test(t))
    push(p => /^aquario$/.test(v44Slug(p.sourceId || '')) || v44Slug(p.name) === 'aquario'); const aliases = [['pedra da gacea', 'pedra da gavea'], ['pao de acucar', 'pao de acucar'], ['maracana', 'maracana'], ['norte shopping', 'norteshopping'], ['rio sul', 'shopping riosul'], ['nova america', 'shopping nova america']]; for (const [needle, target] of aliases)
    if (t.includes(needle)) {
        const tt = v44Slug(target);
        push(p => v44Slug(p.name) === tt || v44Slug(p.sourceId) === tt || v44Slug(p.entityId) === tt || v44Slug(p.name).includes(tt));
    } if (!ids.length) {
    const candidates = C.filter(p => { const n = v4N(p.name); return n.length >= 5 && new RegExp('\\b' + n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+') + '\\b').test(t); }).sort((a, b) => b.name.length - a.name.length);
    if (candidates[0])
        ids.push(candidates[0].entityId);
} return ids; }
function v44ParseQuery(raw = '') {
    const base = v4Parse(raw), t = v4N(raw), ints = new Set(base.intents || []), ages = v44ParseAges(t), targetEntityIds = v44ResolveTargets(raw);
    if (ages.length) {
        ints.add('family');
        ints.add('children');
        if (ages.some(a => a >= 13))
            ints.add('teenagers');
    }
    const add = (i, re) => { if (re.test(t))
        ints.add(i); };
    add('romantic', /romantic|romantico|romantica|casal|pareja/);
    add('indoor', /cubiert|indoor|fechado|interior/);
    add('culture', /cultura|cultural|museo|museu|museum|historia|arte|literatura/);
    add('science', /ciencia|science|cientific/);
    add('music', /musica|music|show/);
    add('samba', /samba|pagode|roda/);
    add('football', /futbol|futebol|football|maracana/);
    add('shopping', /shopping|compras|mall/);
    add('food', /hambre|comer|comida|food|hungry|restaurante/);
    add('coffee', /\bcafe\b|coffee/);
    add('breakfast', /desayun|cafe da manha|breakfast/);
    add('lunch', /almuer|almoço|lunch/);
    add('dinner', /cena|jantar|dinner/);
    add('sunrise', /amanecer|nascer do sol|sunrise/);
    add('trail', /trilha|sendero|trek|hiking/);
    add('beach', /playa|praia|beach/);
    add('lowBudget', /barato|economico|presupuesto bajo|low budget|cheap/);
    add('firstVisit', /primera vez|primeira vez|first time/);
    add('repeatVisitor', /ya conozco|ja conheco|já conheço|already know|lo tipico|o tipico|the usual/);
    add('surprise', /sorprend|surpreend|surprise me|algo diferente/);
    add('naturist', /naturis|nudis|playa nudista|praia nudista|nude beach/);
    add('lowEnergy', /cansad|poca energia|pouca energia|tired|low energy/);
    add('adventure', /aventura|adventure/);
    const neg = { ...(base.negations || {}), ...v43Negations(raw), nature: /\b(no quiero|nao quero|não quero|sin|sem|without)\s+(naturaleza|natureza|nature)\b/.test(t), tour: /\b(no quiero|nao quero|não quero|sin|sem|without)\s+(tour|paseo guiado|guided tour)\b/.test(t), children: /\b(sin|sem|without)\s+(ni[nñ]os|criancas|crianças|children|kids)\b/.test(t), spend: /\b(sin gastar|sem gastar|without spending)\b/.test(t) };
    let location = null;
    for (const b of ['copacabana', 'ipanema', 'leblon', 'botafogo', 'centro', 'lapa', 'santa teresa', 'urca', 'barra', 'tijuca', 'recreio', 'flamengo', 'catete', 'gloria', 'gavea', 'jardim botanico', 'lagoa'])
        if (new RegExp('\\b' + b.replace(' ', '\\s+') + '\\b').test(t)) {
            location = b;
            break;
        }
    return { ...base, intents: [...ints], ages, ageBands: ages.map(v44AgeBand), negations: neg, location, naturistIntent: ints.has('naturist'), foodIntent: ['breakfast', 'coffee', 'lunch', 'dinner', 'food'].find(x => ints.has(x)) || null, targetEntityIds };
}
function v44Context(parsed, manual = {}) { const base = v4Context(parsed, manual), ints = new Set(base.intents || []); Object.entries(manual || {}).forEach(([k, v]) => { if (v)
    ints.add(k); }); return { ...base, ...parsed, intents: [...ints], ages: parsed.ages || [], ageBands: parsed.ageBands || [], location: parsed.location || manual.location || null, naturistIntent: parsed.naturistIntent, foodIntent: parsed.foodIntent }; }
function v44Has(context, key) { return (context.intents || []).includes(key); }
function v44ProfileScore(p, key) { var _a, _b, _c; const d = (_a = getRecommendationProfile(p.entityId)) === null || _a === void 0 ? void 0 : _a[key]; return (_b = d === null || d === void 0 ? void 0 : d.score) !== null && _b !== void 0 ? _b : ((_c = { EXCELLENT: 100, STRONG: 85, MEDIUM: 65, LOW: 35, COMPATIBLE_ONLY: 25, NOT_RECOMMENDED: 0, UNKNOWN: 45 }[d === null || d === void 0 ? void 0 : d.level]) !== null && _c !== void 0 ? _c : 45); }
function v44HardStatus(p, c, av) { const sp = v44SpecialContext(p), n = v4N(p.mainType), neg = c.negations || {}; if (c.timeIntent === 'NOW' && ['CLOSED', 'TEMPORARILY_CLOSED'].includes(av.state))
    return ['REJECT', 'closed_now']; if (c.timeIntent === 'NOW' && av.insufficientVisitTime)
    return ['REJECT', 'insufficient_visit_time']; if (neg.beach && n === 'beach')
    return ['REJECT', 'explicit_beach_negation']; if (neg.museum && n === 'museum')
    return ['REJECT', 'explicit_museum_negation']; if (neg.shopping && n === 'shopping')
    return ['REJECT', 'explicit_shopping_negation']; if (neg.nature && (n === 'trail' || n === 'nature'))
    return ['REJECT', 'explicit_nature_negation']; if (neg.tour && v43EntityType(p) === 'EXPERIENCE')
    return ['REJECT', 'explicit_tour_negation']; if (neg.bar && sp.alcoholPrimary)
    return ['REJECT', 'explicit_bar_negation']; if (v44Has(c, 'heavyRain') && n === 'trail')
    return ['REJECT', 'unsafe_heavy_rain_trail']; if ((v44Has(c, 'family') || v44Has(c, 'children')) && sp.naturist && !c.naturistIntent)
    return ['REJECT', 'naturist_context_family']; return ['OK', null]; }
function v44ScorePlan(p, c) {
    var _a, _b, _c;
    const av = getCurrentAvailability(p, c), base = v4AffinityScore(p, c), sp = v44SpecialContext(p), hard = v44HardStatus(p, c, av);
    let score = base.score || 0, reasons = [...(base.reasons || [])], warnings = [];
    if (hard[0] !== 'OK')
        return { p, score: -999, hardStatus: hard[1], reasons, warnings, availability: av, rejected: true };
    const type = v43EntityType(p), visit = v43VisitFor(p), price = v43PricingFor(p), profile = getRecommendationProfile(p.entityId) || {};
    if ((_a = c.targetEntityIds) === null || _a === void 0 ? void 0 : _a.length) {
        if (c.targetEntityIds.includes(p.entityId)) {
            score += 90;
            reasons.unshift('es exactamente el lugar o experiencia que pediste');
        }
        else
            score -= 10;
    }
    if ((_b = c.ages) === null || _b === void 0 ? void 0 : _b.length) {
        const ageScores = c.ages.map(a => { const band = v44AgeBand(a); const key = band === '13-17' ? 'teenagers' : band === '0-2' ? 'babies' : band === '3-5' ? 'toddlers' : band === '10-12' ? 'preteens' : 'children'; return v44ProfileScore(p, key); });
        if (ageScores.length) {
            const min = Math.min(...ageScores);
            score += (min - 50) * 0.16;
            reasons.push(`funciona para las edades ${c.ages.join(' y ')}`);
        }
    }
    if (c.naturistIntent) {
        if (sp.naturist) {
            score += 60;
            reasons.push('es una playa naturista');
        }
        else
            score -= 20;
    }
    if (v44Has(c, 'rain'))
        score += (v44ProfileScore(p, 'rain') - 50) * 0.15;
    if (v44Has(c, 'heavyRain'))
        score += (v44ProfileScore(p, 'heavyRain') - 50) * 0.24;
    if (v44Has(c, 'lowWalk'))
        score += (v44ProfileScore(p, 'lowWalking') - 50) * 0.16;
    if (v44Has(c, 'seniors'))
        score += (v44ProfileScore(p, 'seniors') - 50) * 0.14;
    if (v44Has(c, 'romantic'))
        score += (v44ProfileScore(p, 'romantic') - 50) * 0.14;
    if (v44Has(c, 'photos'))
        score += (v44ProfileScore(p, 'photography') - 50) * 0.12;
    if (v44Has(c, 'nature'))
        score += (v44ProfileScore(p, 'nature') - 50) * 0.13;
    if (c.availableMinutes && visit.minimumMinutes) {
        if (visit.minimumMinutes > c.availableMinutes)
            return { p, score: -999, hardStatus: 'user_time_too_short', reasons, warnings, availability: av, rejected: true };
        if (visit.idealMinutes && visit.idealMinutes <= c.availableMinutes) {
            score += 8;
            reasons.push('cabe bien en tu tiempo');
        }
    }
    if (c.timeIntent === 'NOW') {
        if (av.state === 'OPEN')
            score += 14;
        else if (av.state === 'UNKNOWN' || av.state === 'DYNAMIC')
            warnings.push('Confirma el horario antes de salir.');
        else if (['OPEN_LATER', 'CLOSING_SOON', 'RESERVATION_REQUIRED'].includes(av.state))
            score -= 18;
    }
    if (v44Has(c, 'free')) {
        if (price.mode === 'FREE')
            score += 20;
        else if (price.mode === 'MIXED')
            score += 6;
        else if (price.mode === 'PAID')
            score -= 40;
    }
    if (((_c = c.negations) === null || _c === void 0 ? void 0 : _c.spend) && price.mode !== 'FREE')
        score -= 30;
    if (c.location) {
        const loc = v4N([p.neighborhood, p.zone].filter(Boolean).join(' '));
        if (loc.includes(v4N(c.location))) {
            score += 7;
            reasons.push('está en la zona que indicaste');
        }
    }
    if (v44Has(c, 'repeatVisitor')) {
        const iconic = /cristo|pao de acucar|copacabana|ipanema|maracana/.test(v4N(p.name));
        score += iconic ? -12 : 8;
    }
    if (v44Has(c, 'firstVisit'))
        score += (v44ProfileScore(p, 'firstVisit') - 50) * 0.14;
    if (v44Has(c, 'surprise')) {
        const iconic = /cristo|pao de acucar|copacabana|ipanema/.test(v4N(p.name));
        score += iconic ? -8 : 10;
    }
    if (type === 'EXPERIENCE') {
        if (v44Has(c, 'experience') || v44Has(c, 'reservable'))
            score += 15;
        else
            score -= 3;
        if (c.availableMinutes && visit.idealMinutes && visit.idealMinutes > c.availableMinutes)
            score -= 25;
    }
    if (sp.naturist && !c.naturistIntent)
        warnings.push('Playa naturista/nudista; no la priorizo como playa familiar convencional.');
    if (av.state === 'CLOSING_SOON')
        warnings.push('Cierra pronto o ya no queda tiempo ideal de visita.');
    if (av.state === 'RESERVATION_REQUIRED')
        warnings.push('Requiere confirmar o reservar.');
    return { p, score: Math.round(score * 10) / 10, hardStatus: 'OK', reasons: [...new Set(reasons)].slice(0, 5), warnings: [...new Set(warnings)].slice(0, 3), availability: av, pricing: price, visit, media: v44ResolveMedia(p), entityType: type, cta: resolveCanonicalCTA(p, c), rejected: false };
}
function v44TopDiverse(items, limit = 8, c = {}) { const out = [], counts = {}; const explicitMuseum = v44Has(c, 'culture') && /muse/.test(v4N(c.raw || '')); for (const x of items) {
    const k = x.entityType || v43EntityType(x.p), cap = explicitMuseum ? limit : 3;
    if ((counts[k] || 0) >= cap)
        continue;
    out.push(x);
    counts[k] = (counts[k] || 0) + 1;
    if (out.length >= limit)
        break;
} if (out.length < Math.min(limit, items.length))
    for (const x of items) {
        if (!out.includes(x)) {
            out.push(x);
            if (out.length >= limit)
                break;
        }
    } return out; }
function rankPlans(context) { const ranked = [], later = [], rejected = []; for (const p of v4Catalog()) {
    const x = v44ScorePlan(p, context);
    if (x.rejected) {
        rejected.push({ id: p.entityId, name: p.name, reason: x.hardStatus });
        continue;
    }
    if (context.timeIntent === 'NOW' && ['OPEN_LATER', 'CLOSING_SOON', 'RESERVATION_REQUIRED'].includes(x.availability.state)) {
        if (x.score >= 45)
            later.push(x);
        continue;
    }
    if (x.score >= 42)
        ranked.push(x);
} ranked.sort((a, b) => b.score - a.score || a.p.name.localeCompare(b.p.name)); later.sort((a, b) => b.score - a.score); return { all: ranked, top: v44TopDiverse(ranked, 8, context), later: later.slice(0, 12), rejected }; }
function v44MediaCoverage() { const C = v4Catalog(), details = C.map(p => ({ id: p.entityId, name: p.name, ...v44ResolveMedia(p) })); const regression = ['Beco do Rato', 'Pedra do Sal', 'Blue Note Rio', 'Gávea · Jardim Botânico · Lagoa', 'Biblioteca Parque Estadual', 'Forte Tamandaré da Laje', 'Barra · Recreio · Zona Oeste', 'Centro · Praça Mauá', 'Botafogo · Humaitá · Urca', 'Flamengo · Catete · Glória', 'Ipanema & Leblon', 'Zona Norte', 'Santa Teresa · Lapa', 'NorteShopping', 'Shopping Nova América', 'Shopping RioSul', 'Bico do Papagaio', 'Cachoeira dos Primatas', 'Circuito das Grutas', 'Parque da Catacumba', 'Pedra da Gávea', 'Pedra do Pontal', 'Pico da Tijuca'].map(name => { const p = C.find(x => v44Slug(x.name) === v44Slug(name) || v44Slug(x.sourceId) === v44Slug(name) || (name === 'Parque das Catacumbas' && /catacumb/.test(v4N(x.name)))); const m = p ? v44ResolveMedia(p) : {}; return { name, entityFound: !!p, canonicalId: (p === null || p === void 0 ? void 0 : p.entityId) || null, exactImageFound: !!m.url, imageSource: m.source || null, canonicalRoute: p ? resolveCanonicalRoute(p) : null, recommendationProfile: !!(p === null || p === void 0 ? void 0 : p.recommendationProfile) }; }); const cov = { totalEntities: C.length, withExactImage: details.filter(x => x.url && x.exact).length, withOriginalImage: details.filter(x => x.url && x.source && x.source !== 'CANONICAL_EXISTING' && x.source !== 'GROUP_EDITORIAL_MEDIA').length, withCrossDatasetImage: details.filter(x => x.url && x.source === 'CANONICAL_EXISTING').length, withoutImage: details.filter(x => !x.url).length, genericFallbacks: 0, brokenImageUrls: details.filter(x => x.url && !/^https?:\/\//.test(x.url)).length, duplicateImageAssignments: Object.values(details.reduce((a, x) => { if (x.url)
        a[x.url] = (a[x.url] || 0) + 1; return a; }, {})).filter(n => n > 1).length, regression }; window.__ERNESTINHO_MEDIA_COVERAGE__ = cov; window.CANONICAL_MEDIA_REGISTRY = Object.fromEntries(C.map(p => { const m = v44ResolveMedia(p); return [p.entityId, { mainImage: m.url || null, thumbnail: m.thumbnail || m.url || null, source: m.source, exact: m.exact }]; })); return cov; }


/* ===== ERNESTINHO INTELLIGENCE V4.6 — PLAN ENGINE + SELF GUIDED TOURS ===== */
const ERNESTINHO_V46_VERSION = '4.6';

function v46TourIntent(c){const t=v4N(c.raw||'');return /tour por (mi|tu) cuenta|recorrido por (mi|tu) cuenta|autoguiad|self.?guided|sozinho|por conta propria/.test(t)}
function v46TourExcluded(c){const t=v4N(c.raw||'');return !!(c.negations&&c.negations.tour)||/(no quiero|nao quero|não quero|sin|sem|without)\s+(tour|tours|recorrido|paseo)/.test(t)}
function v46PortArea(c){const t=v4N(c.raw||'');return /zona portuaria|porto maravilha|praca maua|praça maua|museu do amanha|museu do amanhã|aquario|aqua rio|mural etnias|saude|saúde|gamboa/.test(t)||['centro'].includes(v4N(c.location||''))}
function v46HistoryIntent(c){const t=v4N(c.raw||'');return /historia|historico|histórico|cultura|centro/.test(t)||v44Has(c,'culture')}
function v46TourMatch(tour,c){let score=0,reasons=[],rejected=[]; if(v46TourExcluded(c)){rejected.push('EXPLICIT_TOUR_EXCLUSION');return{tour,score:-999,rejected,reasons}}
 if(v44Has(c,'beach')&&!v46PortArea(c)&&!v46TourIntent(c)){rejected.push('UNRELATED_BEACH_INTENT');return{tour,score:-999,rejected,reasons}}
 if(c.availableMinutes&&c.availableMinutes<Math.min(180,tour.duration)){rejected.push('INSUFFICIENT_TIME');return{tour,score:-999,rejected,reasons}}
 if(v46TourIntent(c)){score+=85;reasons.push('pediste un recorrido por tu cuenta')}
 if(v46PortArea(c)){score+=55;reasons.push('estás buscando Centro/Zona Portuaria')}
 if(v46HistoryIntent(c)){score+=22;reasons.push('encaja con historia y cultura')}
 if(v44Has(c,'photos')){score+=8;reasons.push('tiene buenas paradas fotográficas')}
 if(v44Has(c,'family')){score+=3}
 if(v44Has(c,'heavyRain'))score-=45; else if(v44Has(c,'rain'))score-=15;
 if(v44Has(c,'free')||v44Has(c,'lowBudget'))score-=12;
 return{tour,score,rejected,reasons,timeFeasible:!c.availableMinutes||c.availableMinutes>=tour.duration}}
function v46MatchTours(c){return (window.SELF_GUIDED_TOURS_DATA||[]).map(t=>v46TourMatch(t,c)).filter(x=>!x.rejected.length&&x.score>=45).sort((a,b)=>b.score-a.score)}
// removed unreachable v46StopEntity

function v46MakePlan(id,title,subtitle,names,duration,c,source='GENERATED'){
 const stops=names.map((name,i)=>{const p=v4Catalog().find(x=>v44Slug(x.name)===v44Slug(name)||v44Slug(x.name).includes(v44Slug(name))||v44Slug(name).includes(v44Slug(x.name)));return p?{stopId:p.entityId,entityId:p.entityId,name:p.name,order:i+1,suggestedDuration:(v43VisitFor(p).idealMinutes||60),availability:v43AvailabilityFor(p,c),route:resolveCanonicalRoute(p),media:v44ResolveMedia(p)}:null}).filter(Boolean);
 const closed=stops.filter(x=>x.availability&&x.availability.state==='CLOSED');
 return{planId:id,type:'MICRO_ITINERARY',title,description:subtitle,duration,recommendedStartTime:null,estimatedEndTime:null,neighborhood:c.location||null,zones:[],stops,transportSegments:stops.slice(1).map((x,i)=>({from:stops[i].entityId,to:x.entityId,mode:'WALK_OR_LOCAL',estimatedMinutes:'UNKNOWN'})),walkingEstimate:'UNKNOWN',weatherCompatibility:v44Has(c,'heavyRain')?'LOW':v44Has(c,'rain')?'MEDIUM':'GOOD',familyCompatibility:v44Has(c,'family')?'GOOD':'UNKNOWN',mobilityCompatibility:v44Has(c,'lowWalk')?'REVIEW_REQUIRED':'UNKNOWN',budget:'MIXED',pricing:{mode:'MIXED'},dynamicRequirements:['Confirmar horarios actuales'],warnings:closed.length?[`${closed.length} parada(s) aparecen cerradas para el contexto actual.`]:[],ernestinhoReason:subtitle,fallbackPlan:null,source,premium:false,product:null,quality:{geographicCoherence:'CURATED',timeFeasibility:(!c.availableMinutes||c.availableMinutes>=duration)?'PASS':'FAIL',profileFit:'GOOD',weatherFit:v44Has(c,'heavyRain')?'LOW':'GOOD',operationalFit:closed.length?'REVIEW':'GOOD',variety:'GOOD',walkingFit:'UNKNOWN',budgetFit:'MIXED',narrativeCoherence:'GOOD'}}
}
function buildMicroItinerary(context,candidates=[]){const c=context,t=v4N(c.raw||'');let plans=[];
 if(v46PortArea(c)||v46TourIntent(c)){plans.push(v46MakePlan('plan-zona-portuaria','Yo haría la Zona Portuaria','Un recorrido con narrativa: puerto, arte urbano, futuro, patrimonio y vida del Centro.',['AquaRio','Rio Star','Mural Etnias','Museu do Amanhã','Mosteiro de São Bento'],210,c,'CURATED_PORT_AREA'))}
 if(/jardim botanico|jardim botânico|parque lage|gavea|gávea|lagoa/.test(t)||(['gavea','jardim botanico','lagoa'].includes(v4N(c.location||''))&&v44Has(c,'nature'))){plans.push(v46MakePlan('plan-lage-jardim','Parque Lage + Jardim Botânico','Yo combinaría dos clásicos verdes cercanos en una misma salida.',['Parque Lage','Jardim Botânico'],180,c,'CURATED_SOUTH'))}
 if(/lapa|selaron|selarón|arcos/.test(t)||v4N(c.location||'')==='lapa'){plans.push(v46MakePlan('plan-lapa','Lapa a pie','Arcos, Escadaria y ambiente histórico en una secuencia compacta.',['Arcos da Lapa','Escadaria Selarón'],120,c,'CURATED_LAPA'))}
 plans=plans.filter(p=>p.quality.timeFeasibility==='PASS'&&!(v44Has(c,'heavyRain')&&p.weatherCompatibility==='LOW'));
 return plans.sort((a,b)=>b.stops.length-a.stops.length)
}
function v46PlanScore(plan,c){let score=55; if(plan.quality.timeFeasibility==='FAIL')return-999;if(plan.source==='CURATED_PORT_AREA'&&v46PortArea(c))score+=25;if(v46HistoryIntent(c))score+=10;if(v44Has(c,'heavyRain')&&plan.weatherCompatibility==='LOW')score-=60;if(v44Has(c,'lowWalk')&&plan.stops.length>3)score-=18;return score}
function v46Decision(c,ranked){const plans=buildMicroItinerary(c,ranked.all).map(p=>({...p,score:v46PlanScore(p,c)})).filter(p=>p.score>=50).sort((a,b)=>b.score-a.score);const tours=v46MatchTours(c);return{plans,topPlan:plans[0]||null,tours,topTour:tours[0]||null}}

window.__ERNESTINHO_SELF_GUIDED_TOURS__={version:'4.6',status:'ARCHITECTURE_READY',get products(){return window.SELF_GUIDED_TOURS_DATA||[]},resolveForContext:function(c){return (window.SELF_GUIDED_TOURS_DATA||[]).map(t=>v46TourMatch(t,c)).filter(x=>!x.rejected.length&&x.score>=45).sort((a,b)=>b.score-a.score)}};
window.__ERNESTINHO_PLAN_ENGINE__={version:'4.6',buildMicroItinerary,v46PlanScore,decide:v46Decision,inspect:q=>{const parsed=v44ParseQuery(q),context=v44Context(parsed,{}),ranked=rankPlans(context);return{parsed,context,ranked,decision:v46Decision(context,ranked)}}};
window.__ERNESTINHO_V4_6_SELFTEST__={version:'4.6',status:'READY_ON_DEMAND',run:'v46SelfTest()'};
/* ===== FIN V4.6 ENGINE ===== */

/* ===== ERNESTINHO INTELLIGENCE V4.7 — CIERRE DEFINITIVO AQUÍ · AHORA ===== */
const ERNESTINHO_V47_VERSION='4.7';
const v47OriginalParseQuery=v44ParseQuery;
const v47OriginalContext=v44Context;
const v47OriginalHardStatus=v44HardStatus;
const v47OriginalScorePlan=v44ScorePlan;
const v47OriginalBuildMicroItinerary=buildMicroItinerary;
const v47OriginalTourMatch=v46TourMatch;
// removed unreachable v47Words

// removed unreachable v47Phrase

function v47ParseMaxBudget(t){let m=t.match(/(?:hasta|ate|até|max(?:imo)?|under|up to)\s*(?:r\s*|rs|reais|real|brl)?\s*(\d{1,4})/);return m?Number(m[1]):null}
function v47FuzzyTargets(raw,existing=[]){
 const t=v4N(raw),out=[...existing]; if(out.length)return out;
 const aliases=[
  [/\b(aquariu|aqua\s*rio|aquario)\b/,'aquario'],
  [/\b(pedra da gacea|pedra da gavea)\b/,'pedra da gavea'],
  [/\b(pan de azucar|pao de acucar|pão de açúcar)\b/,'pao de acucar'],
  [/\b(museu do amanha|museo del manana|museum of tomorrow)\b/,'museu do amanha'],
  [/\b(maracana|maracanã)\b/,'maracana'],
  [/\b(santa tereza|santa teresa)\b/,'santa teresa'],
  [/\b(selaron|selarón)\b/,'escadaria selaron']
 ];
 for(const [re,target] of aliases){if(!re.test(t))continue;const k=v44Slug(target);const p=v4Catalog().find(x=>{const vals=[x.name,x.sourceId,x.entityId].map(v44Slug);return vals.some(v=>v===k||v.includes(k)||k.includes(v))});if(p&&!out.includes(p.entityId))out.push(p.entityId)}
 return out;
}
v44ParseQuery=function(raw=''){
 const base=v47OriginalParseQuery(raw),t=v4N(raw),ints=new Set(base.intents||[]),neg={...(base.negations||{})};
 const add=(k,re)=>{if(re.test(t))ints.add(k)};
 add('lowEnergy',/\b(estoy muerto|estoy cansad|ando cansad|t[oô] cansad|tired|exhausted|poca energia|pouca energia|quiero descansar|quero descansar)\b/);
 add('highEnergy',/\b(mucha energia|muita energia|high energy|todo el dia caminando|o dia todo andando|walk all day)\b/);
 add('lowWalk',/\b(no quiero caminar|no puedo caminar mucho|caminar poco|poco caminar|nao quero andar|não quero andar|andar pouco|dont want to walk|don't want to walk|little walking|algo plano|something flat)\b/);
 add('wheelchair',/\b(silla de ruedas|cadeira de rodas|wheelchair)\b/);
 add('stroller',/\b(coche de bebe|carrinho de bebe|stroller)\b/);
 add('seniors',/\b(adulto mayor|adultos mayores|idoso|idosos|senior|seniors|mi mama de [6-9]\d|mi papa de [6-9]\d|minha mae de [6-9]\d|minha mãe de [6-9]\d)\b/);
 add('heat',/\b(mucho calor|calor fuerte|muito calor|strong heat|very hot|heat wave)\b/);
 add('wind',/\b(mucho viento|ventando|vento forte|windy|strong wind)\b/);
 add('cloudy',/\b(nublado|nublad|cloudy|encoberto)\b/);
 add('flat',/\b(plano|flat|sem subida|sin subida|no stairs|sin escaleras|sem escadas)\b/);
 add('history',/\b(historia|hist[oó]rico|history|heritage|patrimonio)\b/);
 add('nearby',/\b(cerca de mi|cerca daqui|perto de mim|near me|nearby)\b/);
 if(/\b(no quiero|nao quero|não quero|sin|sem|without)\s+(futbol|futebol|football)\b/.test(t))neg.football=true;
 if(/\b(no quiero|nao quero|não quero|sin|sem|without)\s+(samba|pagode)\b/.test(t))neg.samba=true;
 if(/\b(no quiero|nao quero|não quero|sin|sem|without)\s+(caminar|andar|walking|walk)\b/.test(t))neg.walking=true;
 if(/\b(no quiero|nao quero|não quero|sin|sem|without)\s+(lugares cerrados|interior|indoors|fechado|fechados)\b/.test(t))neg.indoor=true;
 if(/\b(no quiero|nao quero|não quero|sin|sem|without)\s+(museo|museos|museu|museus|museum|museums)\b/.test(t))neg.museum=true;
 if(/\b(no quiero|nao quero|não quero|sin|sem|without)\s+(shopping|compras|mall)\b/.test(t))neg.shopping=true;
 const budgetMax=v47ParseMaxBudget(t);
 if(/\b(no quiero gastar|sin gastar|sem gastar|without spending|gratis|gratuito|free)\b/.test(t))ints.add('free');
 if(/\b(algo barato|gastar poco|economico|econ[oô]mico|cheap|budget)\b/.test(t))ints.add('lowBudget');
 let availableMinutes=base.availableMinutes||null;
 let mt=t.match(/\b(20|30|45)\s*(?:min|minuto|minutos|minutes?)\b/); if(mt)availableMinutes=Number(mt[1]);
 mt=t.match(/\b1\s*(?:h|hora|hour)\s*(?:30|min|minutes?)?\b/); if(mt&&/30/.test(mt[0]))availableMinutes=90;
 if(/\b(media jornada|half day|meio dia de passeio|meia jornada)\b/.test(t))availableMinutes=240;
 if(/\b(dia entero|todo el dia|full day|dia inteiro)\b/.test(t)&&!availableMinutes)availableMinutes=480;
 const targetEntityIds=v47FuzzyTargets(raw,base.targetEntityIds||[]);
 return {...base,intents:[...ints],negations:neg,budgetMax,availableMinutes,targetEntityIds,energy:ints.has('lowEnergy')?'LOW':ints.has('highEnergy')?'HIGH':'NORMAL',mobility:{wheelchair:ints.has('wheelchair'),stroller:ints.has('stroller'),lowWalk:ints.has('lowWalk')||neg.walking,flat:ints.has('flat')}};
};
v44Context=function(parsed,manual={}){const c=v47OriginalContext(parsed,manual);return {...c,budgetMax:parsed.budgetMax??null,energy:parsed.energy||'NORMAL',mobility:parsed.mobility||{},availableMinutes:parsed.availableMinutes||c.availableMinutes||null};};
function v47EntityText(p){return v4N([p.name,p.mainType,p.subtype,p.neighborhood,p.zone,p.editorial?.idealFor,p.editorial?.ernestinhoTip].filter(Boolean).join(' '))}
function v47IsOutdoor(p){const n=v4N(p.mainType),e=v4N(p.environment?.type||'');return ['beach','trail','nature','neighborhood'].includes(n)||/outdoor|exterior|aberto/.test(e)}
function v47IsHighWalk(p){const n=v4N(p.mainType);return n==='trail'||v44ProfileScore(p,'lowWalking')<35}
function v47PriceNumber(p){const x=v43PricingFor(p),txt=v4N([x?.display,x?.raw,p.pricing?.raw].filter(Boolean).join(' '));const nums=[...txt.matchAll(/(?:r\$|rs|brl)?\s*(\d{1,4})(?:[,.]\d{1,2})?/g)].map(m=>Number(m[1])).filter(n=>n>0&&n<5000);return nums.length?Math.min(...nums):null}
v44HardStatus=function(p,c,av){
 const old=v47OriginalHardStatus(p,c,av);if(old[0]!=='OK')return old;const n=v4N(p.mainType),txt=v47EntityText(p),neg=c.negations||{};
 if(neg.football&&(/futebol|football|maracana/.test(txt)||n==='football'))return['REJECT','explicit_football_negation'];
 if(neg.samba&&/samba|pagode|pedra do sal|roda/.test(txt))return['REJECT','explicit_samba_negation'];
 if((neg.walking||c.mobility?.lowWalk)&&n==='trail')return['REJECT','walking_incompatible_trail'];
 if(neg.indoor&&!v47IsOutdoor(p))return['REJECT','explicit_indoor_negation'];
 if(c.mobility?.wheelchair&&v47IsHighWalk(p))return['REJECT','verified_or_probable_high_walk'];
 return['OK',null];
};
v44ScorePlan=function(p,c){
 let r=v47OriginalScorePlan(p,c);if(r.rejected)return r;let score=r.score,reasons=[...(r.reasons||[])],warnings=[...(r.warnings||[])];
 const n=v4N(p.mainType),price=v43PricingFor(p),numeric=v47PriceNumber(p);
 if(c.energy==='LOW'){score+=(v44ProfileScore(p,'lowWalking')-50)*0.20;if(v47IsHighWalk(p))score-=22;else reasons.push('encaja mejor con poca energía');}
 if(c.energy==='HIGH'&&v44Has(c,'adventure')){if(n==='trail'||n==='nature')score+=18;}
 if(c.mobility?.stroller){const sc=v44ProfileScore(p,'stroller');score+=(sc-50)*0.12;if(sc<35)warnings.push('La compatibilidad con coche de bebé puede ser limitada; confirma accesos.');}
 if(c.mobility?.wheelchair){const sc=v44ProfileScore(p,'wheelchair');score+=(sc-50)*0.18;if(sc<45)warnings.push('Confirma accesibilidad específica antes de salir.');}
 if(v44Has(c,'heat')&&v47IsOutdoor(p)){score-=n==='trail'?25:10;}
 if(c.budgetMax!=null){if(price.mode==='FREE'){score+=14}else if(numeric!=null&&numeric<=c.budgetMax){score+=10;reasons.push(`entra en tu presupuesto de hasta R$${c.budgetMax}`)}else if(numeric!=null&&numeric>c.budgetMax){score-=45}else if(price.mode==='UNKNOWN'){warnings.push('No tengo un precio suficientemente confiable para compararlo con tu presupuesto.');score-=6}}
 if(c.negations?.walking&&v47IsHighWalk(p))score-=45;
 const level=score>=90?'EXCELLENT':score>=72?'STRONG':score>=55?'MEDIUM':score>=38?'LOW':'COMPATIBLE_ONLY';
 return {...r,score,reasons:[...new Set(reasons)],warnings:[...new Set(warnings)].slice(0,2),recommendationLevel:level,confidence:(r.availability?.state==='UNKNOWN'||r.availability?.state==='DYNAMIC'||price.mode==='UNKNOWN')?'MEDIUM':'HIGH'};
};
v46TourMatch=function(tour,c){let r=v47OriginalTourMatch(tour,c);if(r.rejected?.length)return r;if(v44Has(c,'free')||c.negations?.spend){return {...r,score:Math.min(r.score,35),reasons:[...(r.reasons||[]),'priorizo primero opciones gratuitas']}}if(v44Has(c,'beach')&&!v46TourIntent(c)){return {...r,score:-999,rejected:['UNRELATED_BEACH_INTENT']}}if(c.availableMinutes&&c.availableMinutes<tour.duration){return {...r,score:-999,rejected:['INSUFFICIENT_TIME']}}return r;};
function v47PlanDuration(stops,minimum=0){const sum=stops.reduce((a,s)=>a+(s.suggestedDuration||45),0);return Math.max(minimum,sum)}
function v47PlanOperational(plan){const bad=plan.stops.filter(s=>['CLOSED','TEMPORARILY_CLOSED'].includes(s.availability?.state));return {bad,ok:bad.length===0}}
buildMicroItinerary=function(context,candidates=[]){
 const base=v47OriginalBuildMicroItinerary(context,candidates),c=context;return base.map(plan=>{
   const actual=v47PlanDuration(plan.stops,Math.min(plan.duration||0,60));const op=v47PlanOperational(plan);let duration=Math.max(actual,plan.duration||0);
   if(c.availableMinutes&&duration>c.availableMinutes)return {...plan,duration,quality:{...plan.quality,timeFeasibility:'FAIL'}};
   const warnings=[...(plan.warnings||[])];if(!op.ok)warnings.push('Hay una parada cerrada en este contexto; no la usaré como recorrido principal.');
   let walkingFit=(c.mobility?.lowWalk||c.energy==='LOW')?(plan.stops.length>3?'LOW':'REVIEW'):(plan.quality?.walkingFit||'UNKNOWN');
   return {...plan,duration,warnings:[...new Set(warnings)],quality:{...plan.quality,operationalFit:op.ok?'GOOD':'FAIL',walkingFit}};
 }).filter(p=>p.stops.length>=2&&p.quality?.operationalFit!=='FAIL'&&p.quality?.timeFeasibility!=='FAIL'&&!(c.mobility?.lowWalk&&p.stops.length>4));
};
const QH_I18N=window.QH_I18N||{es:{},pt:{},en:{}};


