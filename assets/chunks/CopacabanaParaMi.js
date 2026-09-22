function CopacabanaParaMi() {
    var _a, _b, _c;
    const now = new Date();
    const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const [zone, setZone] = useState('posto4');
    const [minutes, setMinutes] = useState(90);
    const [intent, setIntent] = useState('recommend_me');
    const [rain, setRain] = useState(false);
    const [lowBudget, setLowBudget] = useState(false);
    const [lessTouristy, setLessTouristy] = useState(false);
    const [saved, setSaved] = useState([]);
    const [disliked, setDisliked] = useState([]);
    const [showAdjust, setShowAdjust] = useState(false);
    const [message, setMessage] = useState('');
    const [needLabel, setNeedLabel] = useState('');
    const [lodging, setLodging] = useState('none');
    const [guestMode, setGuestMode] = useState(false);
    const [lowWalk, setLowWalk] = useState(false);
    const [subIntent, setSubIntent] = useState(null);
    const [smartDesire, setSmartDesire] = useState('surprise');
    const [liveContext, setLiveContext] = useState({
        rain: false, strongHeat: false, cityStage: null, ressaca: false, bathing: 'unknown',
        recentHeavyRain24h: false, seaWarning: 'unknown', localFlag: 'unknown',
        weatherStatus: 'source_defined', seaStatus: 'source_defined', bathingStatus: 'source_defined', lastChecked: null
    });
    const [showSwimStatus, setShowSwimStatus] = useState(false);
    const [weatherLive, setWeatherLive] = useState({ status: 'loading', data: null, error: null });
    const [ineaLive, setIneaLive] = useState({ status: 'loading', data: null, error: null });
    const [seaLive, setSeaLive] = useState({ status: 'loading', data: null, error: null });
    const lodgingContext = COPA_LODGING_CONTEXTS[lodging];
    const refreshWeather = async () => {
        setWeatherLive({ status: 'loading', data: weatherLive.data, error: null });
        try {
            const w = await copaFetchWeatherContext();
            setWeatherLive({ status: 'ready', data: w, error: null });
            setLiveContext(prev => ({
                ...prev,
                rain: w.rainingNow,
                strongHeat: w.strongHeat,
                recentHeavyRain24h: w.recentHeavyRain24h,
                weatherStatus: 'live_weather',
                lastChecked: w.checkedAt
            }));
        }
        catch (err) {
            setWeatherLive(prev => ({ status: 'error', data: prev.data, error: (err === null || err === void 0 ? void 0 : err.message) || 'No se pudo cargar el clima' }));
        }
    };
    useEffect(() => {
        refreshWeather();
        const timer = setInterval(refreshWeather, 15 * 60 * 1000);
        return () => clearInterval(timer);
    }, []);
    const refreshInea = async () => {
        setIneaLive(prev => ({ status: 'loading', data: prev.data, error: null }));
        try {
            const data = await copaFetchIneaContext();
            setIneaLive({ status: 'ready', data, error: null });
        }
        catch (err) {
            setIneaLive(prev => ({ status: 'error', data: prev.data, error: (err === null || err === void 0 ? void 0 : err.message) || 'No se pudo leer INEA' }));
        }
    };
    useEffect(() => {
        refreshInea();
        const timer = setInterval(refreshInea, COPA_INEA_CONFIG.refreshMs);
        return () => clearInterval(timer);
    }, []);
    const refreshSea = async () => {
        setSeaLive(prev => ({ status: 'loading', data: prev.data, error: null }));
        try {
            const data = await copaFetchSeaContext();
            setSeaLive({ status: 'ready', data, error: null });
            setLiveContext(prev => ({
                ...prev,
                ressaca: data.ressaca === true,
                seaWarning: data.level || 'unknown',
                seaStatus: 'live_marinha',
                lastChecked: data.checkedAt || prev.lastChecked
            }));
        }
        catch (err) {
            setSeaLive(prev => ({ status: 'error', data: prev.data, error: (err === null || err === void 0 ? void 0 : err.message) || 'No se pudo leer Marinha/CHM' }));
            setLiveContext(prev => ({ ...prev, seaWarning: 'unknown', seaStatus: 'unknown' }));
        }
    };
    useEffect(() => {
        refreshSea();
        const timer = setInterval(refreshSea, COPA_MARINHA_CONFIG.refreshMs);
        return () => clearInterval(timer);
    }, []);
    const selectLodging = value => {
        setLodging(value);
        const item = COPA_LODGING_CONTEXTS[value];
        if (item && item.zone)
            setZone(item.zone);
        setMessage(item && item.commercial
            ? '🏠 Estás usando un contexto de Alojamiento Ernestinho. La ubicación sirve para personalizar recomendaciones; el servicio comercial se mantiene claramente identificado.'
            : '');
    };
    const lodgingQuick = (kind) => {
        if (lodging === 'none') {
            setMessage('Primero selecciona tu alojamiento o usa tu zona actual para calcular desde dónde partes.');
            return;
        }
        if (kind === 'breakfast')
            quickNeed('eat', 'Desayuno cerca de mi alojamiento', 60, 'breakfast');
        if (kind === 'supermarket')
            quickNeed('shopping', 'Supermercado cerca de mi alojamiento', 45, 'supermarket');
        if (kind === 'pharmacy')
            quickNeed('service', 'Farmacia cerca de mi alojamiento', 30, 'pharmacy');
        if (kind === 'metro')
            quickNeed('transport', 'Metro desde mi alojamiento', 30, 'metro');
        if (kind === 'beach')
            choose('activity', { label: 'Playa desde mi alojamiento', minutes: 60 });
        if (kind === 'eat10')
            quickNeed('eat', 'Comer cerca de mi alojamiento', 60, null);
        if (kind === 'tonight') {
            choose('recommend_me', { label: 'Qué hacer esta noche desde mi alojamiento', minutes: 120 });
            setMessage('Modo noche desde tu alojamiento. La agenda en vivo se conectará después mediante EVENT.');
        }
        if (kind === 'return') {
            setIntent('transport');
            setNeedLabel('Volver a mi alojamiento');
            setMinutes(45);
            setMessage('Modo regreso activado. El punto de destino es tu alojamiento seleccionado; la ruta exacta se delegará a mapas/transportes.');
        }
    };
    const zonePos = COPA_POSITIONS[zone];
    const pos = (lodgingContext && lodgingContext.lat && lodgingContext.lng)
        ? { label: lodgingContext.label, lat: lodgingContext.lat, lng: lodgingContext.lng }
        : zonePos;
    const practicalIntent = ['eat', 'shopping', 'service', 'transport'].includes(intent);
    const context = {
        intent, lat: pos.lat, lng: pos.lng, minutes,
        budget: lowBudget ? 50 : 250,
        day: dayKeys[now.getDay()], hour: now.getHours() + now.getMinutes() / 60,
        interests: intent === 'photo' ? ['photo'] : intent === 'eat' ? ['food'] : lessTouristy ? ['local', 'lessTouristy'] : [],
        rain: (rain || liveContext.rain), heavyRain: (rain || liveContext.rain), strongHeat: liveContext.strongHeat, lessTouristy, lowWalk, subIntent,
        openNowRequired: practicalIntent,
        minHoursConfidence: intent === 'service' || intent === 'transport' ? 90 : intent === 'eat' ? 75 : 70
    };
    const selectedIneaPoint = COPA_INEA_CONFIG.pointsByZone[zone];
    const selectedIneaData = ((_b = (_a = ineaLive.data) === null || _a === void 0 ? void 0 : _a.points) === null || _b === void 0 ? void 0 : _b[selectedIneaPoint]) || null;
    const effectiveBathing = (selectedIneaData === null || selectedIneaData === void 0 ? void 0 : selectedIneaData.status) || liveContext.bathing;
    const contextDecision = copaContextDecision({
        rain: liveContext.rain, strongHeat: liveContext.strongHeat, cityStage: liveContext.cityStage,
        ressaca: liveContext.ressaca, bathing: effectiveBathing
    });
    const swimStatus = copaSwimStatus({
        bathing: effectiveBathing,
        ressaca: liveContext.ressaca,
        recentHeavyRain24h: liveContext.recentHeavyRain24h,
        rainNow: liveContext.rain,
        seaWarning: liveContext.seaWarning,
        localFlag: liveContext.localFlag
    });
    let allEvaluated = COPACABANA_PLACES_V1.map(p => copaEvaluatePlace(p, context));
    if (contextDecision.avoidBeach) {
        allEvaluated = allEvaluated.map(x => x.type === 'beach' ? { ...x, eligible: false, exclusions: [...(x.exclusions || []), 'Contexto del mar no compatible con baño'] } : x);
    }
    const eligibleAll = allEvaluated
        .filter(x => x.eligible && !disliked.includes(x.id))
        .sort((a, b) => b.score - a.score);
    const results = eligibleAll.slice(0, 3);
    const coverageConfidence = eligibleAll.length >= 3 ? 'medium' : eligibleAll.length === 2 ? 'limited' : eligibleAll.length === 1 ? 'pilot' : 'none';
    const coverageText = coverageConfidence === 'medium'
        ? `Entre ${eligibleAll.length} opciones compatibles verificadas actualmente`
        : coverageConfidence === 'limited'
            ? 'Cobertura todavía limitada: tengo 2 opciones compatibles verificadas'
            : coverageConfidence === 'pilot'
                ? 'Cobertura actual: por ahora tengo 1 opción compatible suficientemente verificada'
                : 'Sin cobertura suficientemente verificada para esta necesidad';
    const choose = (newIntent, extras = {}) => {
        if (!extras.keepSubIntent)
            setSubIntent(null);
        setIntent(newIntent);
        setNeedLabel(extras.label || '');
        if (extras.minutes)
            setMinutes(extras.minutes);
        if (extras.rain !== undefined)
            setRain(extras.rain);
        if (extras.lowBudget !== undefined)
            setLowBudget(extras.lowBudget);
        if (extras.lessTouristy !== undefined)
            setLessTouristy(extras.lessTouristy);
        setDisliked([]);
        setMessage('');
    };
    const quickNeed = (newIntent, label, recommendedMinutes, specific = null) => {
        setSubIntent(specific);
        choose(newIntent, { label, minutes: recommendedMinutes, keepSubIntent: true });
        setShowAdjust(false);
    };
    const currentClock = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const runSmartNow = () => {
        let preset = copaSmartNowPreset(now.getHours() + now.getMinutes() / 60, smartDesire);
        const liveDecision = copaContextDecision(liveContext);
        if ((liveDecision.avoidBeach || liveDecision.preferIndoor) && preset.intent === 'activity') {
            preset = copaSmartNowPreset(now.getHours() + now.getMinutes() / 60, 'coffee');
            preset.label = liveDecision.avoidBeach ? '⭐ Hoy evitaría el mar y elegiría una alternativa cerca' : '⭐ Con este clima elegiría algo más protegido';
        }
        setSubIntent(preset.subIntent || null);
        setIntent(preset.intent);
        setNeedLabel(preset.label);
        setDisliked([]);
        setShowAdjust(false);
        setMessage(`Recalculado a las ${currentClock}${lodging !== 'none' ? ` desde ${lodgingContext.label}` : ` desde ${COPA_POSITIONS[zone].label}`}. ` +
            'Uso la hora real, tu tiempo y tus preferencias. Clima, mar y eventos en vivo todavía no están conectados.');
    };
    const goNow = item => {
        const url = `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    const toggleSave = id => setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    const dislike = id => setDisliked(prev => [...prev, id]);
    const changedPlan = () => {
        setRain(false);
        setLowBudget(false);
        setLessTouristy(false);
        setIntent('recommend_me');
        setNeedLabel('');
        setSubIntent(null);
        setDisliked([]);
        setMessage(lodging !== 'none'
            ? 'Listo: recalculé el plan manteniendo tu alojamiento como punto de partida.'
            : 'Listo: recalculé desde cero con tu ubicación y tiempo actuales.');
    };
    const intentTitle = {
        eat: '🍽️ Comer ahora', shopping: '🛒 Comprar ahora', service: '💊 Farmacia ahora',
        transport: '🚇 Cómo moverme', photo: '📸 Fotos', activity: '🌴 Pasear / descubrir',
        recommend_me: '❤️ Decídelo por mí'
    }[intent] || '❤️ Para mí';
    const noResultText = practicalIntent
        ? 'Con los datos actualmente verificados no tengo una opción suficientemente segura para recomendarte ahora. Prefiero decirte eso antes que enviarte a un lugar que podría estar cerrado.'
        : 'No tengo una opción suficientemente compatible con estas condiciones. Cambia el tiempo, la ubicación o alguna preferencia y recalculo.';
    return React.createElement("section", { className: "min-h-screen bg-gradient-to-b from-rose-50 via-white to-slate-50" },
        React.createElement("div", { className: "max-w-6xl mx-auto px-4 py-10 sm:py-14" },
            React.createElement("div", { className: "bg-slate-950 text-white rounded-[2rem] p-6 sm:p-10 " },
                React.createElement("span", { className: "inline-flex px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-200 text-xs font-black uppercase tracking-widest" }, "\u2764\uFE0F Ernestinho Master 3.0 \u00B7 Copacabana para m\u00ED"),
                React.createElement("h1", { className: "text-3xl sm:text-5xl font-black mt-5" }, "\u00BFQu\u00E9 necesitas ahora?"),
                React.createElement("p", { className: "text-slate-300 mt-4 max-w-3xl" }, "Puedes pedirme una idea para disfrutar Copacabana o resolver algo pr\u00E1ctico. El motor cruza tu zona, tiempo, presupuesto, horario y confianza del dato antes de recomendar."),
                React.createElement("div", { className: "mt-7 rounded-3xl bg-gradient-to-br from-rose-500/20 to-amber-400/10 border border-rose-300/20 p-5 sm:p-6" },
                    React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "flex items-center gap-2 flex-wrap" },
                                React.createElement("span", { className: "text-[10px] font-black uppercase tracking-widest text-rose-200" }, "\u2764\uFE0F \u00BFQu\u00E9 hago ahora?"),
                                React.createElement("span", { className: "text-[10px] font-black rounded-full bg-white/10 px-2.5 py-1 text-white" },
                                    "\uD83D\uDD50 ",
                                    currentClock)),
                            React.createElement("h2", { className: "text-2xl sm:text-3xl font-black mt-2" }, "Yo te digo qu\u00E9 har\u00EDa ahora mismo"),
                            React.createElement("p", { className: "text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl" }, "Ya tomo en cuenta tu punto de partida, el tiempo que tienes, presupuesto y cu\u00E1nto quieres caminar. Elige qu\u00E9 te apetece o d\u00E9jamelo a m\u00ED.")),
                        React.createElement("button", { onClick: runSmartNow, className: "shrink-0 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white px-6 py-4 font-black " }, "\u2B50 DIME QU\u00C9 HAR\u00CDAS")),
                    React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-5" }, [
                        ['surprise', '❤️', 'Decídelo tú'],
                        ['eat', '🍽️', 'Comer'],
                        ['coffee', '☕', 'Café'],
                        ['beach', '🏖️', 'Playa'],
                        ['photo', '📸', 'Fotos'],
                        ['walk', '🌴', 'Pasear'],
                        ['drink', '🍹', 'Tomar algo']
                    ].map(([value, icon, label]) => (React.createElement("button", { key: value, onClick: () => setSmartDesire(value), className: `rounded-xl border p-3 text-left transition-all ${smartDesire === value ? 'bg-white text-slate-950 border-white' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}` },
                        React.createElement("span", { className: "text-lg" }, icon),
                        React.createElement("strong", { className: "block text-[11px] mt-1" }, label))))),
                    React.createElement("div", { className: "mt-4" },
                        React.createElement("div", { className: "flex flex-wrap gap-2 text-[10px] font-bold" },
                            React.createElement("span", { className: "rounded-full bg-white/10 px-3 py-1.5" },
                                "\uD83D\uDCCD ",
                                lodging !== 'none' ? lodgingContext.label : COPA_POSITIONS[zone].label),
                            [30, 60, 120, 180].map(m => React.createElement("button", { key: m, onClick: () => setMinutes(m), className: `rounded-full px-3 py-1.5 ${minutes === m ? 'bg-amber-300 text-amber-950' : 'bg-white/10'}` },
                                "\u23F1\uFE0F ",
                                m === 120 ? '2 h' : m === 180 ? '3 h' : `${m} min`)),
                            React.createElement("button", { onClick: () => setLowBudget(!lowBudget), className: `rounded-full px-3 py-1.5 ${lowBudget ? 'bg-emerald-300 text-emerald-950' : 'bg-white/10'}` },
                                "\uD83D\uDCB0 ",
                                lowBudget ? 'Gastar poco ✓' : 'Gastar poco'),
                            React.createElement("button", { onClick: () => setLowWalk(!lowWalk), className: `rounded-full px-3 py-1.5 ${lowWalk ? 'bg-sky-300 text-sky-950' : 'bg-white/10'}` },
                                "\uD83D\uDEB6 ",
                                lowWalk ? 'Caminar poco ✓' : 'Caminar poco')))),
                React.createElement("div", { className: "mt-5 rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-5" },
                    React.createElement("div", { className: "flex items-center justify-between gap-3 mb-4" },
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-xs font-black text-rose-200 uppercase tracking-widest" }, "\uD83D\uDCCD Estoy en Copacabana ahora"),
                            React.createElement("p", { className: "text-[11px] text-slate-400 mt-1" }, "Resuelve lo que necesitas con uno o dos toques.")),
                        React.createElement("span", { className: "text-[10px] font-black bg-emerald-400/15 text-emerald-200 border border-emerald-300/20 rounded-full px-3 py-1" }, "MODO R\u00C1PIDO")),
                    React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5" },
                        React.createElement("button", { onClick: () => quickNeed('eat', 'Tengo hambre', 90, null), className: "text-left rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 p-3 transition-all" },
                            React.createElement("span", { className: "text-xl" }, "\uD83C\uDF7D\uFE0F"),
                            React.createElement("strong", { className: "block mt-1 text-xs" }, "Comer")),
                        React.createElement("button", { onClick: () => quickNeed('eat', 'Quiero un café', 45, 'coffee'), className: "text-left rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 p-3 transition-all" },
                            React.createElement("span", { className: "text-xl" }, "\u2615"),
                            React.createElement("strong", { className: "block mt-1 text-xs" }, "Caf\u00E9")),
                        React.createElement("button", { onClick: () => { setIntent('recommend_me'); setNeedLabel('Necesito un baño'); setMinutes(30); setMessage('El baño cercano necesita datos específicos verificados. Mientras ampliamos esa base, no voy a inventar una ubicación.'); }, className: "text-left rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 p-3 transition-all" },
                            React.createElement("span", { className: "text-xl" }, "\uD83D\uDEBB"),
                            React.createElement("strong", { className: "block mt-1 text-xs" }, "Ba\u00F1o")),
                        React.createElement("button", { onClick: () => quickNeed('service', 'Necesito una farmacia', 30, 'pharmacy'), className: "text-left rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 p-3 transition-all" },
                            React.createElement("span", { className: "text-xl" }, "\uD83D\uDC8A"),
                            React.createElement("strong", { className: "block mt-1 text-xs" }, "Farmacia")),
                        React.createElement("button", { onClick: () => choose('activity', { label: 'Quiero ir a la playa', minutes: 60 }), className: "text-left rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 p-3 transition-all" },
                            React.createElement("span", { className: "text-xl" }, "\uD83C\uDFD6\uFE0F"),
                            React.createElement("strong", { className: "block mt-1 text-xs" }, "Playa")),
                        React.createElement("button", { onClick: () => setShowSwimStatus(true), className: "text-left rounded-2xl bg-cyan-400/10 hover:bg-cyan-400/15 border border-cyan-300/20 p-3 transition-all" },
                            React.createElement("span", { className: "text-xl" }, "\uD83C\uDF0A"),
                            React.createElement("strong", { className: "block mt-1 text-xs" }, "\u00BFMe ba\u00F1o hoy?")),
                        React.createElement("button", { onClick: () => choose('photo', { label: 'Quiero una foto buena cerca', minutes: 30 }), className: "text-left rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 p-3 transition-all" },
                            React.createElement("span", { className: "text-xl" }, "\uD83D\uDCF8"),
                            React.createElement("strong", { className: "block mt-1 text-xs" }, "Foto")),
                        React.createElement("button", { onClick: () => quickNeed('eat', 'Quiero tomar algo', 60, 'drink'), className: "text-left rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 p-3 transition-all" },
                            React.createElement("span", { className: "text-xl" }, "\uD83C\uDF79"),
                            React.createElement("strong", { className: "block mt-1 text-xs" }, "Bebida")),
                        React.createElement("button", { onClick: () => quickNeed('shopping', 'Necesito supermercado', 45, 'supermarket'), className: "text-left rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 p-3 transition-all" },
                            React.createElement("span", { className: "text-xl" }, "\uD83D\uDED2"),
                            React.createElement("strong", { className: "block mt-1 text-xs" }, "Supermercado")),
                        React.createElement("button", { onClick: () => { choose('recommend_me', { label: '¿Qué hago esta noche?', minutes: 120 }); setMessage('Modo noche activado. La agenda en vivo y música se incorporarán en la capa EVENT para no inventar programación.'); }, className: "text-left rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 p-3 transition-all" },
                            React.createElement("span", { className: "text-xl" }, "\uD83C\uDF19"),
                            React.createElement("strong", { className: "block mt-1 text-xs" }, "Esta noche")),
                        React.createElement("button", { onClick: () => { choose('photo', { label: 'Quiero ver el atardecer', minutes: 60 }); setMessage('Te priorizo lugares fotogénicos cercanos. La hora solar real se conectará a la capa LIVE antes de producción.'); }, className: "text-left rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 p-3 transition-all" },
                            React.createElement("span", { className: "text-xl" }, "\uD83C\uDF07"),
                            React.createElement("strong", { className: "block mt-1 text-xs" }, "Atardecer")),
                        React.createElement("button", { onClick: () => quickNeed('transport', 'Quiero moverme', 30, 'metro'), className: "text-left rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 p-3 transition-all" },
                            React.createElement("span", { className: "text-xl" }, "\uD83D\uDE87"),
                            React.createElement("strong", { className: "block mt-1 text-xs" }, "Moverme")),
                        React.createElement("button", { onClick: () => { setIntent('transport'); setNeedLabel('Volver a mi alojamiento'); setMinutes(45); setMessage('Selecciona tu zona actual. En la siguiente etapa guardaremos el alojamiento para calcular el regreso exacto.'); }, className: "text-left rounded-2xl bg-rose-400/15 hover:bg-rose-400/20 border border-rose-300/20 p-3 transition-all" },
                            React.createElement("span", { className: "text-xl" }, "\uD83C\uDFE0"),
                            React.createElement("strong", { className: "block mt-1 text-xs" }, "Volver"))))),
            React.createElement("div", { className: "mt-7 bg-amber-50 border border-amber-200 rounded-3xl p-5 sm:p-6 " },
                React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4" },
                    React.createElement("div", null,
                        React.createElement("span", { className: "text-[10px] font-black uppercase tracking-widest text-amber-700" }, "\uD83C\uDFE0 Desde mi alojamiento"),
                        React.createElement("h2", { className: "text-xl sm:text-2xl font-black text-slate-900 mt-1" }, "Tu alojamiento puede ser el punto de partida"),
                        React.createElement("p", { className: "text-sm text-slate-600 mt-2 max-w-2xl" }, "Selecciona d\u00F3nde te hospedas y Ernestinho usar\u00E1 esa zona como origen. Los alojamientos propios est\u00E1n identificados como servicio comercial y no reciben ventaja oculta en el ranking.")),
                    React.createElement("select", { value: lodging, onChange: e => selectLodging(e.target.value), className: "w-full lg:w-auto min-w-[260px] rounded-xl border border-amber-300 bg-white p-3 font-bold text-sm" }, Object.entries(COPA_LODGING_CONTEXTS).map(([k, v]) => React.createElement("option", { key: k, value: k }, v.label)))),
                lodging !== 'none' && React.createElement("div", { className: "mt-5" },
                    React.createElement("div", { className: "flex flex-wrap items-center gap-2 mb-3" },
                        React.createElement("span", { className: "rounded-full bg-amber-200 text-amber-950 px-3 py-1 text-[10px] font-black uppercase" }, "\uD83C\uDFE0 Alojamiento Ernestinho"),
                        React.createElement("span", { className: "text-[11px] text-slate-600" }, "Servicio ofrecido por Ernestinho Carioca \u00B7 usado aqu\u00ED solo como contexto de ubicaci\u00F3n.")),
                    React.createElement("div", { className: "mb-4 rounded-2xl bg-white border border-amber-200 p-4" },
                        React.createElement("div", { className: "flex flex-wrap gap-2 items-center" },
                            React.createElement("strong", { className: "text-sm text-slate-900" }, lodgingContext.label),
                            lodgingContext.maxGuests && React.createElement("span", { className: "text-[10px] font-black rounded-full bg-slate-100 px-2 py-1" },
                                "\uD83D\uDC65 Hasta ",
                                lodgingContext.maxGuests),
                            lodgingContext.beachDistanceMeters && React.createElement("span", { className: "text-[10px] font-black rounded-full bg-cyan-50 text-cyan-800 px-2 py-1" },
                                "\uD83C\uDFD6\uFE0F ",
                                lodgingContext.beachDistanceMeters,
                                " m playa"),
                            lodgingContext.metroReference && React.createElement("span", { className: "text-[10px] font-black rounded-full bg-violet-50 text-violet-800 px-2 py-1" },
                                "\uD83D\uDE87 ",
                                lodgingContext.metroReference)),
                        React.createElement("p", { className: "text-xs text-slate-500 mt-2" }, lodgingContext.address),
                        lodgingContext.amenities && React.createElement("p", { className: "text-[11px] text-slate-600 mt-2" },
                            React.createElement("strong", null, "Incluye:"),
                            " ",
                            lodgingContext.amenities.slice(0, 6).join(' · ')),
                        React.createElement("p", { className: "text-[10px] text-amber-700 mt-2" }, "Datos del apartamento cargados desde el material proporcionado por Ernestinho. El motor ya usa la coordenada del edificio/direcci\u00F3n cuando est\u00E1 disponible; disponibilidad y otros campos operativos seguir\u00E1n audit\u00E1ndose antes de producci\u00F3n.")),
                    React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2" },
                        React.createElement("button", { onClick: () => lodgingQuick('breakfast'), className: "rounded-xl bg-white border p-3 text-left hover:border-amber-400" },
                            React.createElement("span", null, "\uD83E\uDD50"),
                            React.createElement("strong", { className: "block text-xs mt-1" }, "Desayuno cerca")),
                        React.createElement("button", { onClick: () => lodgingQuick('supermarket'), className: "rounded-xl bg-white border p-3 text-left hover:border-amber-400" },
                            React.createElement("span", null, "\uD83D\uDED2"),
                            React.createElement("strong", { className: "block text-xs mt-1" }, "Supermercado")),
                        React.createElement("button", { onClick: () => lodgingQuick('pharmacy'), className: "rounded-xl bg-white border p-3 text-left hover:border-amber-400" },
                            React.createElement("span", null, "\uD83D\uDC8A"),
                            React.createElement("strong", { className: "block text-xs mt-1" }, "Farmacia")),
                        React.createElement("button", { onClick: () => lodgingQuick('metro'), className: "rounded-xl bg-white border p-3 text-left hover:border-amber-400" },
                            React.createElement("span", null, "\uD83D\uDE87"),
                            React.createElement("strong", { className: "block text-xs mt-1" }, "Metro")),
                        React.createElement("button", { onClick: () => lodgingQuick('beach'), className: "rounded-xl bg-white border p-3 text-left hover:border-amber-400" },
                            React.createElement("span", null, "\uD83C\uDFD6\uFE0F"),
                            React.createElement("strong", { className: "block text-xs mt-1" }, "Playa")),
                        React.createElement("button", { onClick: () => lodgingQuick('eat10'), className: "rounded-xl bg-white border p-3 text-left hover:border-amber-400" },
                            React.createElement("span", null, "\uD83C\uDF7D\uFE0F"),
                            React.createElement("strong", { className: "block text-xs mt-1" }, "Comer cerca")),
                        React.createElement("button", { onClick: () => lodgingQuick('tonight'), className: "rounded-xl bg-white border p-3 text-left hover:border-amber-400" },
                            React.createElement("span", null, "\uD83C\uDF19"),
                            React.createElement("strong", { className: "block text-xs mt-1" }, "Esta noche")),
                        React.createElement("button", { onClick: () => lodgingQuick('return'), className: "rounded-xl bg-slate-900 text-white p-3 text-left hover:bg-slate-800" },
                            React.createElement("span", null, "\uD83C\uDFE0"),
                            React.createElement("strong", { className: "block text-xs mt-1" }, "Volver aqu\u00ED"))))),
            React.createElement("div", { className: "mt-7 grid lg:grid-cols-3 gap-5" },
                React.createElement("div", { className: "bg-white border rounded-3xl p-5 " },
                    React.createElement("p", { className: "text-xs font-black text-rose-600 uppercase" }, "1 \u00B7 \u00BFD\u00F3nde est\u00E1s?"),
                    React.createElement("select", { value: zone, onChange: e => setZone(e.target.value), className: "mt-3 w-full rounded-xl border p-3 font-bold" }, Object.entries(COPA_POSITIONS).map(([k, v]) => React.createElement("option", { key: k, value: k }, v.label)))),
                React.createElement("div", { className: "bg-white border rounded-3xl p-5 " },
                    React.createElement("p", { className: "text-xs font-black text-rose-600 uppercase" }, "2 \u00B7 \u00BFCu\u00E1nto tiempo?"),
                    React.createElement("div", { className: "grid grid-cols-3 gap-2 mt-3" }, [30, 60, 120].map(v => React.createElement("button", { key: v, onClick: () => setMinutes(v), className: `rounded-xl py-3 font-black text-xs ${minutes === v ? 'bg-teal-600 text-white' : 'bg-slate-100'}` }, v === 120 ? '2 h' : v + ' min')))),
                React.createElement("div", { className: "bg-white border rounded-3xl p-5 " },
                    React.createElement("p", { className: "text-xs font-black text-rose-600 uppercase" }, "3 \u00B7 \u00BFQu\u00E9 quieres hacer?"),
                    React.createElement("select", { value: intent, onChange: e => choose(e.target.value), className: "mt-3 w-full rounded-xl border p-3 font-bold" },
                        React.createElement("option", { value: "recommend_me" }, "\u2764\uFE0F Dec\u00EDdelo por m\u00ED"),
                        React.createElement("option", { value: "photo" }, "\uD83D\uDCF8 Fotos"),
                        React.createElement("option", { value: "eat" }, "\uD83C\uDF7D\uFE0F Comer ahora"),
                        React.createElement("option", { value: "activity" }, "\uD83C\uDF34 Pasear / descubrir"),
                        React.createElement("option", { value: "shopping" }, "\uD83D\uDED2 Supermercado"),
                        React.createElement("option", { value: "service" }, "\uD83D\uDC8A Farmacia"),
                        React.createElement("option", { value: "transport" }, "\uD83D\uDE87 C\u00F3mo moverme")))),
            React.createElement("div", { className: "mt-4 flex flex-wrap gap-2" },
                React.createElement("button", { onClick: () => choose('photo'), className: "rounded-full px-4 py-2 bg-white border font-bold text-xs" }, "\uD83D\uDCF8 Quiero fotos"),
                React.createElement("button", { onClick: () => quickNeed('eat', 'Tengo hambre', 90, null), className: "rounded-full px-4 py-2 bg-white border font-bold text-xs" }, "\uD83C\uDF7D\uFE0F Tengo hambre"),
                React.createElement("button", { onClick: () => { setRain(!rain); setMessage(''); }, className: `rounded-full px-4 py-2 border font-bold text-xs ${rain ? 'bg-blue-600 text-white' : 'bg-white'}` }, "\uD83C\uDF27\uFE0F Est\u00E1 lloviendo"),
                React.createElement("button", { onClick: () => setLowBudget(!lowBudget), className: `rounded-full px-4 py-2 border font-bold text-xs ${lowBudget ? 'bg-emerald-600 text-white' : 'bg-white'}` }, "\uD83D\uDCB0 Gastar poco"),
                React.createElement("button", { onClick: () => setShowAdjust(!showAdjust), className: "rounded-full px-4 py-2 bg-slate-900 text-white font-bold text-xs" }, "\u2699\uFE0F Ajustar"),
                React.createElement("button", { onClick: changedPlan, className: "rounded-full px-4 py-2 bg-rose-50 border border-rose-200 text-rose-800 font-black text-xs" }, "\uD83D\uDD04 Cambi\u00F3 mi plan")),
            showAdjust && React.createElement("div", { className: "mt-4 bg-slate-100 rounded-2xl p-4 flex flex-wrap gap-3" },
                React.createElement("button", { onClick: () => setLessTouristy(!lessTouristy), className: `rounded-xl px-4 py-3 font-bold text-xs ${lessTouristy ? 'bg-teal-600 text-white' : 'bg-white'}` }, "\uD83C\uDDE7\uD83C\uDDF7 M\u00E1s local / menos tur\u00EDstico"),
                React.createElement("button", { onClick: () => setMinutes(Math.max(30, minutes - 30)), className: "rounded-xl px-4 py-3 bg-white font-bold text-xs" }, "\u23F1\uFE0F Tengo menos tiempo"),
                React.createElement("button", { onClick: () => setMinutes(Math.min(240, minutes + 30)), className: "rounded-xl px-4 py-3 bg-white font-bold text-xs" }, "\u2795 Tengo m\u00E1s tiempo")),
            message && React.createElement("p", { className: "mt-4 text-xs font-bold text-teal-800" }, message),
            React.createElement("div", { className: "mt-6 rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-blue-50 p-5 sm:p-6" },
                React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4" },
                    React.createElement("div", null,
                        React.createElement("span", { className: "text-[10px] font-black uppercase tracking-widest text-cyan-700" }, "\uD83C\uDF0A \u00BFMe puedo ba\u00F1ar hoy?"),
                        React.createElement("h3", { className: "text-2xl font-black text-slate-900 mt-1" }, "Ernestinho nunca te va a decir \u201Cel mar es seguro\u201D"),
                        React.createElement("p", { className: "text-xs text-slate-600 mt-2 max-w-3xl" }, "Cruzo balneabilidad, ressaca, lluvia reciente y se\u00F1alizaci\u00F3n local. Si falta un dato importante, la respuesta ser\u00E1 \u201Cinformaci\u00F3n insuficiente\u201D.")),
                    React.createElement("button", { onClick: () => setShowSwimStatus(!showSwimStatus), className: "rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-3 font-black text-sm whitespace-nowrap" }, showSwimStatus ? 'Ocultar resultado' : '🌊 Consultar estado')),
                showSwimStatus && React.createElement("div", { className: `mt-5 rounded-3xl border p-5 ${swimStatus.level === 'green' ? 'bg-emerald-50 border-emerald-200' : swimStatus.level === 'yellow' ? 'bg-amber-50 border-amber-200' : swimStatus.level === 'red' ? 'bg-rose-50 border-rose-200' : 'bg-slate-100 border-slate-200'}` },
                    React.createElement("div", { className: "flex items-start gap-3" },
                        React.createElement("span", { className: "text-4xl" }, swimStatus.icon),
                        React.createElement("div", { className: "flex-1" },
                            React.createElement("p", { className: "text-[10px] font-black uppercase tracking-widest text-slate-500" }, "Resultado del motor"),
                            React.createElement("h4", { className: "text-xl font-black text-slate-900 mt-1" }, swimStatus.title),
                            React.createElement("div", { className: "mt-3 space-y-1" }, swimStatus.reasons.map((r, i) => React.createElement("p", { key: i, className: "text-xs text-slate-700" },
                                "\u2022 ",
                                r))),
                            swimStatus.warnings.length > 0 && React.createElement("div", { className: "mt-3 rounded-xl bg-white/70 p-3" }, swimStatus.warnings.map((w, i) => React.createElement("p", { key: i, className: "text-xs font-bold text-slate-800" },
                                "\u26A0\uFE0F ",
                                w))))),
                    React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5 text-[10px] font-bold" },
                        React.createElement("div", { className: "rounded-xl bg-white p-3 border" },
                            React.createElement("span", { className: "block text-slate-400" }, "INEA"),
                            React.createElement("strong", null, effectiveBathing === 'propria' ? 'Propia' : effectiveBathing === 'impropria' ? 'Impropia' : 'Sin dato reciente')),
                        React.createElement("div", { className: "rounded-xl bg-white p-3 border" },
                            React.createElement("span", { className: "block text-slate-400" }, "Ressaca"),
                            React.createElement("strong", null, liveContext.ressaca ? 'Sí' : 'No confirmada')),
                        React.createElement("div", { className: "rounded-xl bg-white p-3 border" },
                            React.createElement("span", { className: "block text-slate-400" }, "Lluvia intensa 24 h"),
                            React.createElement("strong", null, liveContext.recentHeavyRain24h ? 'Sí' : 'No confirmada')),
                        React.createElement("div", { className: "rounded-xl bg-white p-3 border" },
                            React.createElement("span", { className: "block text-slate-400" }, "Bandera local"),
                            React.createElement("strong", null, liveContext.localFlag === 'red' ? 'Roja' : liveContext.localFlag === 'green' ? 'Verde' : 'No disponible'))),
                    React.createElement("p", { className: "text-[10px] text-slate-500 mt-4" }, "\uD83C\uDF26\uFE0F La lluvia ya viene del clima autom\u00E1tico y la balneabilidad puede venir del XLSX oficial del INEA. Ressaca y bandera local todav\u00EDa requieren conexi\u00F3n/confirmaci\u00F3n; si falta una pieza cr\u00EDtica, Ernestinho mantiene precauci\u00F3n o informaci\u00F3n insuficiente."))),
            React.createElement("div", { className: "mt-6 rounded-3xl border border-sky-100 bg-sky-50 p-5 sm:p-6" },
                React.createElement("div", { className: "flex flex-col md:flex-row md:items-start md:justify-between gap-4" },
                    React.createElement("div", null,
                        React.createElement("span", { className: "text-[10px] font-black uppercase tracking-widest text-sky-700" }, "\uD83C\uDF26\uFE0F Contexto real \u00B7 FASE 4O"),
                        React.createElement("h3", { className: "text-xl font-black text-slate-900 mt-1" }, "Clima, mar y balneabilidad ya tienen fuentes oficiales definidas"),
                        React.createElement("p", { className: "text-xs text-slate-600 mt-2 max-w-3xl" }, "El clima ya se consulta autom\u00E1ticamente para Copacabana. COR sigue siendo la referencia oficial para alertas y etapa operacional. INEA se consulta desde sus datos oficiales y Marinha/CHM desde los avisos oficiales de mau tempo. Si una fuente falla, el estado vuelve a desconocido.")),
                    React.createElement("span", { className: `rounded-full px-3 py-1.5 text-[10px] font-black whitespace-nowrap ${weatherLive.status === 'ready' ? 'bg-emerald-100 text-emerald-800' : weatherLive.status === 'error' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}` }, weatherLive.status === 'ready' ? 'CLIMA AUTOMÁTICO ACTIVO' : weatherLive.status === 'error' ? 'CLIMA NO DISPONIBLE' : 'CARGANDO CLIMA')),
                React.createElement("div", { className: "grid sm:grid-cols-3 gap-3 mt-4" },
                    React.createElement("div", { className: "rounded-2xl bg-white p-4 border border-sky-100" },
                        React.createElement("div", { className: "flex items-start justify-between gap-2" },
                            React.createElement("strong", { className: "text-sm" }, "\uD83C\uDF26\uFE0F Clima autom\u00E1tico"),
                            React.createElement("button", { onClick: refreshWeather, className: "text-[10px] font-black text-sky-700" }, "\u21BB Actualizar")),
                        weatherLive.status === 'ready' && weatherLive.data ? React.createElement("div", { className: "mt-2" },
                            React.createElement("p", { className: "text-2xl font-black text-slate-900" },
                                Math.round(weatherLive.data.temperature),
                                "\u00B0C ",
                                React.createElement("span", { className: "text-xs font-bold text-slate-500" },
                                    "sensaci\u00F3n ",
                                    Math.round(weatherLive.data.apparentTemperature),
                                    "\u00B0C")),
                            React.createElement("p", { className: "text-[11px] text-slate-600" },
                                weatherLive.data.weatherLabel,
                                " \u00B7 lluvia actual ",
                                weatherLive.data.precipitation.toFixed(1),
                                " mm"),
                            React.createElement("p", { className: "text-[11px] text-slate-600" },
                                "Viento ",
                                Math.round(weatherLive.data.windSpeed),
                                " km/h \u00B7 r\u00E1fagas ",
                                Math.round(weatherLive.data.windGusts),
                                " km/h"),
                            React.createElement("p", { className: "text-[10px] font-black text-emerald-700 mt-1" }, "\u2713 Open-Meteo \u00B7 actualizaci\u00F3n autom\u00E1tica")) : weatherLive.status === 'error' ? React.createElement("p", { className: "text-[11px] text-rose-700 mt-2" }, "No pude actualizar el clima. El motor no inventar\u00E1 estos datos.") : React.createElement("p", { className: "text-[11px] text-slate-500 mt-2" }, "Consultando condiciones actuales\u2026")),
                    React.createElement("div", { className: "rounded-2xl bg-white p-4 border border-sky-100" },
                        React.createElement("div", { className: "flex items-start justify-between gap-2" },
                            React.createElement("strong", { className: "text-sm" }, "\uD83C\uDF0A INEA"),
                            React.createElement("button", { onClick: refreshInea, className: "text-[10px] font-black text-sky-700" }, "\u21BB Actualizar")),
                        React.createElement("p", { className: "text-[11px] text-slate-600 mt-1" },
                            "Punto usado para tu zona: ",
                            React.createElement("strong", null, selectedIneaPoint),
                            " \u00B7 ",
                            COPA_INEA_CONFIG.pointLabels[selectedIneaPoint]),
                        ineaLive.status === 'ready' && selectedIneaData ? React.createElement("div", { className: "mt-2" },
                            React.createElement("p", { className: `text-sm font-black ${selectedIneaData.status === 'propria' ? 'text-emerald-700' : selectedIneaData.status === 'impropria' ? 'text-rose-700' : 'text-slate-600'}` }, selectedIneaData.status === 'propria' ? '✓ Propia' : selectedIneaData.status === 'impropria' ? '✕ Impropia' : '⚪ Sin clasificación suficiente'),
                            React.createElement("p", { className: "text-[10px] text-slate-500 mt-1" }, selectedIneaData.reason),
                            selectedIneaData.date && React.createElement("p", { className: "text-[10px] text-slate-500" },
                                "Muestra: ",
                                selectedIneaData.date.toLocaleDateString('es-ES')),
                            React.createElement("p", { className: "text-[10px] font-black text-emerald-700 mt-1" }, "\u2713 XLSX oficial le\u00EDdo autom\u00E1ticamente")) : ineaLive.status === 'ready' ? React.createElement("p", { className: "text-[11px] text-amber-700 mt-2" }, "El archivo carg\u00F3, pero no pude interpretar este punto con suficiente confianza.") : ineaLive.status === 'error' ? React.createElement("p", { className: "text-[11px] text-rose-700 mt-2" }, "No pude actualizar INEA. Mantengo el estado como desconocido.") : React.createElement("p", { className: "text-[11px] text-slate-500 mt-2" }, "Consultando datos oficiales\u2026")),
                    React.createElement("div", { className: "rounded-2xl bg-white p-4 border border-sky-100" },
                        React.createElement("div", { className: "flex items-start justify-between gap-2" },
                            React.createElement("strong", { className: "text-sm" }, "\u2693 Marinha / CHM"),
                            React.createElement("button", { onClick: refreshSea, className: "text-[10px] font-black text-sky-700" }, "\u21BB Actualizar")),
                        React.createElement("p", { className: "text-[11px] text-slate-600 mt-1" }, "Avisos oficiales de ressaca y mal tiempo con relevancia para la costa de R\u00EDo."),
                        seaLive.status === 'ready' && seaLive.data ? React.createElement("div", { className: "mt-2" },
                            React.createElement("p", { className: `text-sm font-black ${seaLive.data.ressaca ? 'text-rose-700' : 'text-emerald-700'}` }, seaLive.data.ressaca ? '⚠ Aviso de ressaca relevante' : '✓ Sin aviso de ressaca relevante detectado'),
                            React.createElement("p", { className: "text-[10px] text-slate-500 mt-1" }, seaLive.data.summary || 'Consulta CHM realizada.'),
                            React.createElement("p", { className: "text-[10px] font-black text-emerald-700 mt-1" }, "\u2713 CHM \u00B7 lectura autom\u00E1tica")) : seaLive.status === 'error' ? React.createElement("p", { className: "text-[11px] text-rose-700 mt-2" }, "No pude actualizar Marinha/CHM. Mantengo el estado como desconocido.") : React.createElement("p", { className: "text-[11px] text-slate-500 mt-2" }, "Consultando avisos oficiales\u2026"))),
                ineaLive.status === 'ready' && ineaLive.data && React.createElement("div", { className: "mt-3 rounded-xl bg-white border border-sky-100 p-3 text-[10px] text-slate-600" },
                    React.createElement("strong", { className: "text-slate-900" }, "Diagn\u00F3stico INEA:"),
                    " ",
                    ineaLive.data.matchedRows,
                    " filas de Copacabana detectadas \u00B7 hoja ",
                    ineaLive.data.detectedSheet || 'no identificada',
                    " \u00B7 ",
                    ineaLive.data.workbookSheets,
                    " hojas analizadas.",
                    ineaLive.data.updated && React.createElement("span", null,
                        " \u00B7 actualizaci\u00F3n fuente ",
                        ineaLive.data.updated)),
                weatherLive.status === 'ready' && weatherLive.data && React.createElement("div", { className: "mt-3 grid sm:grid-cols-3 gap-2 text-xs" },
                    React.createElement("div", { className: "rounded-xl bg-white border border-sky-100 p-3" },
                        React.createElement("span", { className: "text-slate-400 block" }, "Precipitaci\u00F3n estimada 24 h"),
                        React.createElement("strong", { className: "text-slate-900" }, (_c = weatherLive.data.recent24hMm) !== null && _c !== void 0 ? _c : '—',
                            " mm")),
                    React.createElement("div", { className: "rounded-xl bg-white border border-sky-100 p-3" },
                        React.createElement("span", { className: "text-slate-400 block" }, "Lluvia ahora"),
                        React.createElement("strong", { className: "text-slate-900" }, weatherLive.data.rainingNow ? 'Sí' : 'No detectada')),
                    React.createElement("div", { className: "rounded-xl bg-white border border-sky-100 p-3" },
                        React.createElement("span", { className: "text-slate-400 block" }, "Regla de calor v1"),
                        React.createElement("strong", { className: "text-slate-900" }, weatherLive.data.strongHeat ? 'Calor fuerte' : 'Sin señal de calor fuerte'))),
                React.createElement("p", { className: "text-[10px] text-slate-500 mt-2" }, "La marca \u201Clluvia intensa reciente\u201D usa por ahora una regla conservadora interna de \u226510 mm estimados en 24 h; no es una clasificaci\u00F3n oficial del INEA."),
                React.createElement("div", { className: "mt-4 rounded-2xl bg-slate-950 text-white p-4" },
                    React.createElement("p", { className: "text-[10px] font-black uppercase tracking-widest text-sky-300" }, "Reglas incorporadas"),
                    React.createElement("div", { className: "grid sm:grid-cols-2 gap-2 mt-2 text-xs text-slate-200" },
                        React.createElement("span", null, "\uD83C\uDF27\uFE0F Lluvia \u2192 interior/cubierto"),
                        React.createElement("span", null, "\u2600\uFE0F Calor fuerte \u2192 sombra/AC"),
                        React.createElement("span", null, "\uD83C\uDF0A Ressaca \u2192 elimina ba\u00F1o de mar"),
                        React.createElement("span", null, "\uD83D\uDEAB INEA impropia \u2192 elimina ba\u00F1o"),
                        React.createElement("span", null, "\u23F1\uFE0F Lluvia intensa reciente \u2192 precauci\u00F3n 24 h"),
                        React.createElement("span", null, "\uD83D\uDEA9 Bandera local roja \u2192 elimina ba\u00F1o")),
                    React.createElement("p", { className: "text-[10px] text-slate-400 mt-3" }, "La se\u00F1alizaci\u00F3n de playa y el guardavidas local tienen prioridad sobre cualquier recomendaci\u00F3n digital."))),
            React.createElement("div", { className: "mt-6 rounded-3xl border border-orange-100 bg-orange-50 p-5 sm:p-6" },
                React.createElement("div", { className: "flex items-start justify-between gap-3" },
                    React.createElement("div", null,
                        React.createElement("span", { className: "text-[10px] font-black uppercase tracking-widest text-orange-700" }, "\uD83C\uDF7D\uFE0F Comer seg\u00FAn lo que quieres"),
                        React.createElement("h3", { className: "text-xl font-black text-slate-900 mt-1" }, "No todos tenemos hambre de lo mismo"),
                        React.createElement("p", { className: "text-xs text-slate-600 mt-2" }, "Elige una intenci\u00F3n y el motor filtra los mismos lugares por compatibilidad, distancia, horario y presupuesto."))),
                React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4" },
                    React.createElement("button", { onClick: () => quickNeed('eat', 'Quiero desayunar', 60, 'breakfast'), className: "rounded-xl bg-white border border-orange-100 p-3 text-left text-xs font-bold" }, "\uD83E\uDD50 Desayuno"),
                    React.createElement("button", { onClick: () => quickNeed('eat', 'Quiero un café', 45, 'coffee'), className: "rounded-xl bg-white border border-orange-100 p-3 text-left text-xs font-bold" }, "\u2615 Caf\u00E9"),
                    React.createElement("button", { onClick: () => { setLowBudget(true); quickNeed('eat', 'Quiero comer barato', 60, 'budget_lunch'); }, className: "rounded-xl bg-white border border-orange-100 p-3 text-left text-xs font-bold" }, "\uD83D\uDCB0 Comer barato"),
                    React.createElement("button", { onClick: () => quickNeed('eat', 'Quiero self-service', 60, 'self_service'), className: "rounded-xl bg-white border border-orange-100 p-3 text-left text-xs font-bold" }, "\uD83C\uDF5B Self-service"),
                    React.createElement("button", { onClick: () => quickNeed('eat', 'Quiero carne', 90, 'meat'), className: "rounded-xl bg-white border border-orange-100 p-3 text-left text-xs font-bold" }, "\uD83E\uDD69 Carne"),
                    React.createElement("button", { onClick: () => quickNeed('eat', 'Quiero una padaria o confeitaria', 45, 'bakery'), className: "rounded-xl bg-white border border-orange-100 p-3 text-left text-xs font-bold" }, "\uD83E\uDD56 Padaria"),
                    React.createElement("button", { onClick: () => quickNeed('eat', 'Quiero tomar algo', 75, 'drink'), className: "rounded-xl bg-white border border-orange-100 p-3 text-left text-xs font-bold" }, "\uD83C\uDF79 Boteco / bebida"),
                    React.createElement("button", { onClick: () => quickNeed('eat', 'Quiero cenar', 90, 'dinner'), className: "rounded-xl bg-white border border-orange-100 p-3 text-left text-xs font-bold" }, "\uD83C\uDF19 Cena"))),
            lodging !== 'none' && React.createElement("div", { className: "mt-6 rounded-3xl bg-teal-950 text-white p-5 sm:p-6 " },
                React.createElement("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4" },
                    React.createElement("div", null,
                        React.createElement("span", { className: "text-[10px] font-black uppercase tracking-widest text-teal-200" }, "\uD83E\uDDEA Prueba como hu\u00E9sped"),
                        React.createElement("h3", { className: "text-xl font-black mt-1" }, "\u00BFQu\u00E9 me conviene desde este apartamento?"),
                        React.createElement("p", { className: "text-xs text-teal-100/80 mt-2" }, "Activa condiciones reales y mira c\u00F3mo cambia el ranking desde el edificio seleccionado.")),
                    React.createElement("button", { onClick: () => setGuestMode(!guestMode), className: `rounded-xl px-4 py-3 text-xs font-black ${guestMode ? 'bg-teal-400 text-teal-950' : 'bg-white/10 border border-white/20'}` }, guestMode ? '✓ Modo huésped activo' : 'Activar prueba')),
                guestMode && React.createElement("div", { className: "mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2" },
                    React.createElement("button", { onClick: () => quickNeed('eat', 'Tengo hambre desde mi apartamento', 60, null), className: "rounded-xl bg-white/10 p-3 text-left text-xs font-bold" }, "\uD83C\uDF7D\uFE0F Tengo hambre"),
                    React.createElement("button", { onClick: () => setLowBudget(!lowBudget), className: `rounded-xl p-3 text-left text-xs font-bold ${lowBudget ? 'bg-emerald-400 text-emerald-950' : 'bg-white/10'}` }, "\uD83D\uDCB0 Gastar poco"),
                    React.createElement("button", { onClick: () => setLowWalk(!lowWalk), className: `rounded-xl p-3 text-left text-xs font-bold ${lowWalk ? 'bg-sky-300 text-sky-950' : 'bg-white/10'}` }, "\uD83D\uDEB6 Caminar poco"),
                    React.createElement("button", { onClick: () => { setLowBudget(false); setLowWalk(false); setRain(false); setDisliked([]); setMessage('Prueba de huésped reiniciada.'); }, className: "rounded-xl bg-white/10 p-3 text-left text-xs font-bold" }, "\u21BA Reiniciar prueba"))),
            contextDecision.warnings.length > 0 && React.createElement("div", { className: "mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4" },
                React.createElement("p", { className: "text-[10px] font-black uppercase tracking-widest text-amber-800" }, "\u26A0\uFE0F Contexto ambiental"),
                React.createElement("div", { className: "mt-2 space-y-1" }, contextDecision.warnings.map((w, i) => React.createElement("p", { key: i, className: "text-xs text-amber-950" },
                    "\u2022 ",
                    w)))),
            React.createElement("div", { className: "mt-8" },
                React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-xs font-black text-teal-700 uppercase tracking-widest" }, "Resultado calculado"),
                        React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900" }, needLabel || intentTitle),
                        subIntent && React.createElement("p", { className: "text-[11px] font-bold text-rose-600 mt-1" }, COPA_SUBINTENT_LABELS[subIntent] || subIntent),
                        React.createElement("p", { className: `text-[11px] mt-1 font-bold ${coverageConfidence === 'none' ? 'text-rose-600' : coverageConfidence === 'pilot' ? 'text-amber-700' : 'text-slate-500'}` }, coverageText)),
                    practicalIntent && React.createElement("span", { className: "text-[11px] font-bold text-slate-500 bg-slate-100 rounded-full px-3 py-2" }, "\u23F1\uFE0F Se exige horario actual suficientemente confiable")),
                results.length === 0 ? React.createElement("div", { className: "mt-5 rounded-3xl border border-amber-200 bg-amber-50 p-6" },
                    React.createElement("h3", { className: "font-black text-amber-950" }, "\uD83D\uDEAB Prefiero no inventarte una respuesta."),
                    React.createElement("p", { className: "text-sm text-amber-900 mt-2" }, noResultText),
                    React.createElement("button", { onClick: changedPlan, className: "mt-4 rounded-xl bg-amber-900 text-white font-black text-xs px-4 py-3" }, "\uD83D\uDD04 CAMBI\u00D3 MI PLAN")) : React.createElement("div", { className: "grid lg:grid-cols-3 gap-5 mt-5" }, results.map((item, index) => {
                    var _a;
                    return React.createElement("article", { key: item.id, className: `rounded-3xl border bg-white p-6  flex flex-col ${index === 0 ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200'}` },
                        React.createElement("div", { className: "flex items-start justify-between gap-2" },
                            React.createElement("span", { className: `self-start text-[10px] font-black uppercase rounded-full px-2.5 py-1 ${index === 0 ? 'bg-amber-100 text-amber-900' : index === 1 ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-700'}` }, index === 0 ? '⭐ Yo haría esto' : index === 1 ? '👍 Otra buena opción' : '🔄 Algo diferente'),
                            practicalIntent && React.createElement("span", { className: "text-[10px] font-black text-emerald-700" }, "\u25CF AHORA")),
                        React.createElement("h3", { className: "text-xl font-black text-slate-900 mt-3" }, item.name),
                        React.createElement("p", { className: "text-xs font-bold text-teal-700 mt-1" },
                            "\uD83D\uDCCD ",
                            Math.round(item.distanceM),
                            " m \u00B7 \uD83D\uDEB6 \u2248 ",
                            Math.round(item.travelMin),
                            " min \u00B7 \u23F1\uFE0F plan \u2248 ",
                            Math.round(item.plannedDuration),
                            " min"),
                        React.createElement("div", { className: "mt-4 bg-slate-50 rounded-2xl p-4 flex-1" },
                            React.createElement("p", { className: "text-[10px] font-black text-slate-500 uppercase" }, "Por qu\u00E9"),
                            React.createElement("p", { className: "text-xs text-slate-700 mt-2 leading-relaxed" },
                                item.reasons.slice(0, 5).join(' · '),
                                "."),
                            ((_a = item.warnings) === null || _a === void 0 ? void 0 : _a.length) > 0 && React.createElement("p", { className: "text-xs text-amber-800 mt-2" },
                                "\u26A0\uFE0F ",
                                item.warnings.join(' · '))),
                        React.createElement("div", { className: "grid grid-cols-2 gap-2 mt-4" },
                            React.createElement("button", { onClick: () => goNow(item), className: "rounded-xl bg-teal-600 text-white text-xs font-black py-3" }, "IR AHORA"),
                            React.createElement("button", { onClick: () => toggleSave(item.id), className: `rounded-xl text-xs font-black py-3 ${saved.includes(item.id) ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'}` }, saved.includes(item.id) ? '❤️ GUARDADO' : 'GUARDAR')),
                        React.createElement("button", { onClick: () => dislike(item.id), className: "mt-2 text-[11px] font-bold text-slate-400 hover:text-rose-600" }, "No me gusta \u00B7 mu\u00E9strame otra"));
                }))),
            intent === 'transport' && React.createElement("div", { className: "mt-6 rounded-3xl bg-emerald-950 text-white p-6 sm:p-7" },
                React.createElement("span", { className: "text-[10px] font-black uppercase tracking-widest text-emerald-300" }, "\uD83D\uDE90 Servicio Ernestinho"),
                React.createElement("h3", { className: "text-xl font-black mt-2" }, "\u00BFNecesitas traslado privado?"),
                React.createElement("p", { className: "text-sm text-emerald-100 mt-2 max-w-2xl" }, "Para aeropuerto, equipaje, familia o viajes hacia B\u00FAzios, Arraial, Angra y otros destinos, puedes pedir una cotizaci\u00F3n directa. Este servicio comercial est\u00E1 separado del ranking editorial."),
                React.createElement("a", { href: "https://wa.me/5521969946938?text=Hola%20Ernestinho,%20estoy%20usando%20Copacabana%20para%20m%C3%AD%20y%20quiero%20cotizar%20un%20traslado.", target: "_blank", rel: "noopener noreferrer", className: "inline-flex mt-4 rounded-xl bg-white text-emerald-950 px-5 py-3 text-xs font-black" }, "COTIZAR TRANSPORTE")),
            React.createElement("div", { className: "mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-xs text-blue-900 leading-relaxed" },
                React.createElement("strong", null, "MVP real:"),
                " \u201Ccomer\u201D, \u201Cfarmacia\u201D, \u201Csupermercado\u201D y \u201Cmoverme\u201D ya usan el mismo motor contextual. La cobertura piloto todav\u00EDa es peque\u00F1a: una respuesta significa \u201Cmejor opci\u00F3n entre los datos verificados cargados\u201D, no \u201Cel mejor lugar de toda Copacabana\u201D. Mar, clima real, eventos y cierres temporales seguir\u00E1n entrando como datos en vivo.")));
}
/* =========================================================
   ERNESTINHO MASTER 4.0 · CAPA DE EXPERIENCIA
   Mantiene intacto el cerebro Master 3.0 y reorganiza el acceso
   en ventanas, acordeones y subcapítulos mobile-first.
   ========================================================= */
// MASTER4_MUSEOS_REAL lazy-loaded from /assets/section-culture-data.js
window.CopacabanaParaMi=CopacabanaParaMi;
