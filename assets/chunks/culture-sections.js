/* EC culture sections — lazy extracted 2026-09-23 */
(function(){
function GuiaSenderos({ onVolver, onReservar }) {
    const [filtro, setFiltro] = React.useState('Todos');
    const [parqueAbierto, setParqueAbierto] = React.useState(null);
    const niveles = ['Todos', 'Fácil / Leve', 'Moderado', 'Difícil'];
    const rutasBase = RUTAS_RIO_ORDEN.map(n => TRANSCARIOCA_TRECHOS.find(x => x.numero === n)).filter(Boolean).map(x => ({
        id: 'ruta-' + x.numero, nombre: x.nombre, zona: x.unidad, nivel: x.nivel, duracion: x.duracion, distancia: x.distancia,
        foto: RUTAS_RIO_FOTOS[x.numero], descripcion: x.destacados, tipo: 'ruta'
    }));
    const clasicas = SENDEROS_RIO.map(x => ({ ...x, tipo: 'clasica' }));
    // Una sola guía. El orden mezcla iconos clásicos con recorridos de gran interés turístico.
    const prioridad = ['pedra-bonita-trek', 'dois-irmaos-trek', 'pedra-gavea-trek', 'telegrafo-trek', 'ruta-25', 'catacumba', 'ruta-19', 'ruta-15', 'pico-tijuca', 'bico-papagaio', 'circuito-grutas', 'primatas', 'pontal', 'ruta-01', 'ruta-21', 'ruta-13', 'ruta-12', 'ruta-11', 'ruta-17', 'ruta-18', 'ruta-20', 'ruta-24', 'ruta-23', 'ruta-16', 'ruta-02', 'ruta-06', 'ruta-05', 'ruta-07', 'ruta-08', 'ruta-03', 'ruta-04', 'ruta-09', 'ruta-14', 'ruta-26'];
    const todo = [...clasicas, ...rutasBase];
    const unificadas = prioridad.map(id => todo.find(x => x.id === id)).filter(Boolean).concat(todo.filter(x => !prioridad.includes(x.id)));
    const nivelGrupo = x => { const n = (x.nivel || '').toLowerCase(); if (n.includes('difícil') || n.includes('dificil') || n.includes('técnico') || n.includes('tecnico'))
        return 'Difícil'; if (n.includes('moderado') || n.includes('média') || n.includes('media'))
        return 'Moderado'; return 'Fácil / Leve'; };
    const lista = unificadas.filter(x => filtro === 'Todos' || nivelGrupo(x) === filtro);
    return React.createElement("section", { className: "min-h-screen bg-emerald-950 text-white pb-24" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 py-16" },
            React.createElement("button", { onClick: onVolver, className: "text-emerald-200 font-bold" }, "\u2190 Volver a Qu\u00E9 hacer"),
            React.createElement("span", { className: "block mt-10 text-amber-300 text-xs font-black uppercase tracking-[.25em]" }, "Monta\u00F1as, floresta y senderos"),
            React.createElement("h1", { className: "text-4xl sm:text-6xl font-black uppercase mt-3" }, "Naturaleza de R\u00EDo"),
            React.createElement("p", { className: "max-w-3xl text-emerald-100 mt-5" }, "Aqu\u00ED reunimos las trilhas, monta\u00F1as, miradores naturales y recorridos de bosque de R\u00EDo. Los parques urbanos y jardines hist\u00F3ricos ahora est\u00E1n en Familia, donde encajan mejor como paseos tranquilos para todas las edades."),
            React.createElement("div", { className: "mt-10 mb-5" },
                React.createElement("span", { className: "text-amber-300 text-xs font-black uppercase tracking-[.25em]" }, "Monta\u00F1as y senderos"),
                React.createElement("h2", { className: "text-3xl sm:text-5xl font-black mt-2" }, "Trilhas de R\u00EDo"),
                React.createElement("p", { className: "text-emerald-100 max-w-3xl mt-3" }, "Desde grandes cl\u00E1sicos y miradores hasta recorridos largos por bosques, playas y monta\u00F1as.")),
            React.createElement("div", { className: "bg-white/10 rounded-3xl p-6 mt-8" },
                React.createElement("div", { className: "flex flex-wrap gap-2" }, niveles.map(n => React.createElement("button", { key: n, onClick: () => setFiltro(n), className: `${filtro === n ? 'bg-amber-300 text-slate-950' : 'bg-emerald-900 text-emerald-100'} rounded-full px-4 py-2 text-xs font-black` }, n))),
                React.createElement("p", { className: "text-xs text-emerald-200 mt-4" }, "M\u00E1s adelante afinaremos cada ficha con accesos, puntos de inicio, recomendaciones y fotograf\u00EDas definitivas.")),
            React.createElement("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8" }, lista.map((x, i) => React.createElement("article", { key: x.id, className: "bg-white text-slate-900 rounded-3xl overflow-hidden flex flex-col" },
                React.createElement("div", { className: "relative h-56 bg-emerald-900" },
                    React.createElement("img", { src: x.foto, alt: x.nombre, className: "w-full h-full object-cover", onError: (e) => { e.currentTarget.style.display = 'none'; } }),
                    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" }),
                    React.createElement("span", { className: "absolute top-4 left-4 inline-flex bg-amber-300 text-slate-950 rounded-full px-3 py-1 text-xs font-black" },
                        "#",
                        i + 1,
                        " PARA DESCUBRIR"),
                    React.createElement("h2", { className: "absolute bottom-4 left-5 right-5 text-2xl font-black text-white " }, x.nombre)),
                React.createElement("div", { className: "p-6 flex-1 flex flex-col" },
                    React.createElement("p", { className: "text-[11px] uppercase tracking-wider font-black text-emerald-700" }, x.zona),
                    React.createElement("div", { className: "grid grid-cols-3 gap-2 mt-4" },
                        React.createElement("div", { className: "bg-slate-100 rounded-xl p-3" },
                            React.createElement("small", { className: "block text-slate-500" }, "Distancia"),
                            React.createElement("b", null, x.distancia || '—')),
                        React.createElement("div", { className: "bg-slate-100 rounded-xl p-3" },
                            React.createElement("small", { className: "block text-slate-500" }, "Tiempo"),
                            React.createElement("b", null, x.duracion || '—')),
                        React.createElement("div", { className: "bg-slate-100 rounded-xl p-3" },
                            React.createElement("small", { className: "block text-slate-500" }, "Dificultad"),
                            React.createElement("b", null, x.nivel))),
                    React.createElement("h3", { className: "font-black mt-5" }, "\u2728 \u00BFQu\u00E9 vas a encontrar?"),
                    React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed mt-2" }, x.descripcion),
                    x.id === 'pedra-gavea-trek' && React.createElement("button", { onClick: () => onReservar('Pedra da Gávea'), className: "w-full bg-slate-900 text-white rounded-xl py-3 mt-5 text-xs font-black uppercase" }, "Ver experiencia guiada \u00B7 R$400"),
                    x.id === 'telegrafo-trek' && React.createElement("button", { onClick: () => onReservar('Pedra do Telégrafo'), className: "w-full bg-emerald-700 text-white rounded-xl py-3 mt-5 text-xs font-black uppercase" }, "Ver experiencia guiada \u00B7 R$190"),
                    React.createElement("div", { className: "mt-auto pt-5" },
                        React.createElement("span", { className: "inline-flex bg-emerald-50 text-emerald-800 rounded-full px-3 py-2 text-xs font-black" }, "\uD83D\uDCCD R\u00EDo de Janeiro")))))),
            React.createElement("div", { className: "bg-amber-300 text-slate-950 rounded-3xl p-7 sm:p-9 mt-10" },
                React.createElement("h2", { className: "text-2xl font-black" }, "Antes de entrar a una trilha"),
                React.createElement("p", { className: "mt-3" }, "Distancia y tiempo no cuentan toda la historia. Clima, lluvia, calor, desnivel, orientaci\u00F3n y condici\u00F3n del sendero pueden cambiar mucho la experiencia. Usa estas fichas para elegir y revisa las condiciones antes de salir."),
                React.createElement("a", { href: "https://wa.me/5521969946938?text=Hola%20Ernestinho%2C%20quiero%20consultar%20una%20trilha%20en%20R%C3%ADo.", target: "_blank", rel: "noopener noreferrer", className: "inline-block bg-emerald-950 text-white rounded-full px-6 py-4 mt-5 font-black" }, "Consultar con Ernestinho"))));
}
function SeccionEspaciosLiterarios({ seleccionInicial = null }) {
    const [espacioSeleccionado, setEspacioSeleccionado] = useState(seleccionInicial);
    const [selectorLiterarioAbierto, setSelectorLiterarioAbierto] = useState(false);
    const [busquedaLiteraria, setBusquedaLiteraria] = useState('');
    const espacioActual = espacioSeleccionado
        ? (ESPACIOS_LITERARIOS_DATA.find((espacio) => espacio.id === espacioSeleccionado) || null)
        : null;
    useEffect(() => {
        if (espacioSeleccionado && !ESPACIOS_LITERARIOS_DATA.some((x) => x.id === espacioSeleccionado)) {
            setEspacioSeleccionado(null);
        }
    }, [espacioSeleccionado]);
    const espaciosFiltrados = ESPACIOS_LITERARIOS_DATA.filter((espacio) => espacio.nombre
        .toLowerCase()
        .includes(busquedaLiteraria.toLowerCase()));
    return (React.createElement("section", { className: "ec-dark-attraction py-12 bg-[#071313] min-h-screen" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
            React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-10" },
                React.createElement("span", { className: "text-amber-500 font-bold text-xs uppercase tracking-widest block mb-2" }, "Cultura y literatura"),
                React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4" }, "Espacios literarios de R\u00EDo"),
                React.createElement("p", { className: "text-slate-600 text-base sm:text-lg" }, "Bibliotecas hist\u00F3ricas, librer\u00EDas, centros de investigaci\u00F3n y lugares que mantienen viva la literatura carioca.")),
            React.createElement("div", { className: "mb-10 ec-attraction-catalog-shell" },
                React.createElement("div", { className: "bg-white rounded-3xl border border-slate-100  p-5 sm:p-6" },
                    React.createElement("p", { className: "text-[11px] font-bold uppercase tracking-widest text-teal-600 mb-2" }, "Espacio seleccionado"),
                    React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" },
                        React.createElement("h2", { className: "text-xl sm:text-2xl font-black text-slate-900" }, espacioActual === null || espacioActual === void 0 ? void 0 : espacioActual.nombre),
                        React.createElement("button", { type: "button", onClick: () => { if (espacioActual) { setEspacioSeleccionado(null); window.scrollTo({top:0,behavior:'instant'}); } else { setSelectorLiterarioAbierto(true); } }, className: "inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-teal-700 text-white font-black text-xs uppercase tracking-wide px-5 py-3.5 rounded-xl transition-all" },
                            React.createElement("span", null, selectorLiterarioAbierto
                                ? 'Cerrar lista'
                                : espacioActual ? '← VOLVER AL CATÁLOGO' : 'Elegir otro espacio'),
                            React.createElement("span", null, selectorLiterarioAbierto ? '▲' : '▼')))),
                !espacioActual && (React.createElement("div", { className: "mt-3 bg-white rounded-3xl border border-slate-200  p-4 sm:p-6" },
                    React.createElement("div", { className: "relative mb-5" },
                        React.createElement("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" }, "\uD83D\uDD0D"),
                        React.createElement("input", { type: "text", value: busquedaLiteraria, onChange: (e) => setBusquedaLiteraria(e.target.value), placeholder: "Buscar biblioteca, librer\u00EDa o espacio...", className: "w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" })),
                    React.createElement("div", { className: "pr-1" },
                        React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3" }, espaciosFiltrados.map((espacio) => (React.createElement("button", { type: "button", key: espacio.id, onClick: () => {
                                seoNavigate(`/espacios-literarios/${seoSlug(espacio.nombre)}`); setEspacioSeleccionado(espacio.id);
                                window.scrollTo({ top: 0, behavior: 'instant' });
                                setSelectorLiterarioAbierto(false);
                                setBusquedaLiteraria('');
                            }, className: `overflow-hidden rounded-2xl text-left transition-all border ${espacioSeleccionado === espacio.id
                                ? 'bg-slate-900 text-white border-slate-900  scale-[1.02]'
                                : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-teal-50 hover:border-teal-200'}` },
                            espacio.miniatura && (React.createElement("img", { src: espacio.miniatura, alt: espacio.nombre, className: "w-full aspect-[4/3] object-contain bg-[#0b1b1b]" })),
                            React.createElement("div", { className: "min-h-[82px] px-3 py-4 flex items-center justify-center" },
                                React.createElement("span", { className: "text-xs sm:text-sm font-bold leading-snug text-center w-full" }, espacio.nombre))))))),
                    espaciosFiltrados.length === 0 && (React.createElement("p", { className: "text-center text-sm text-slate-500 py-8" }, "No encontramos un espacio con ese nombre."))))),
            espacioActual && (React.createElement("div", { key: espacioActual.id },
                React.createElement("button", { type: "button", onClick: () => { seoNavigate('/espacios-literarios'); setEspacioSeleccionado(null); setBusquedaLiteraria(''); window.scrollTo({top:0,behavior:'instant'}); }, className: "mb-6 inline-flex items-center gap-2 text-white/80 hover:text-amber-300 font-black text-xs uppercase tracking-wide" }, "← VOLVER AL CATÁLOGO"),
                React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden  border border-slate-100 mb-8" },
                    React.createElement("div", { className: "p-6 sm:p-10" },
                        React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, espacioActual.categoria),
                        React.createElement("h2", { className: "text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-2" }, espacioActual.nombre),
                        null,
                        React.createElement("p", { className: "text-amber-500 font-bold text-sm mb-6" }, espacioActual.subtitulo),
                        React.createElement("p", { className: "text-slate-600 leading-relaxed text-sm sm:text-base max-w-4xl" }, espacioActual.descripcion)),
                    espacioActual.fotoPrincipal && (React.createElement("div", { className: "px-2 pb-2" },
                        React.createElement("div", { className: "rounded-2xl overflow-hidden h-72 sm:h-[480px] " },
                            React.createElement("img", { src: espacioActual.fotoPrincipal, alt: espacioActual.nombre, className: "w-full h-full object-cover" }))))),
                espacioActual.narracionErnestinho && (React.createElement("div", { className: "max-w-5xl mx-auto mb-10 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 sm:p-9 " },
                    React.createElement("p", { className: "text-xs uppercase tracking-widest text-amber-700 font-black mb-3" }, "\uD83C\uDDE7\uD83C\uDDF7 Te lo cuento como si fu\u00E9ramos juntos"),
                    React.createElement("p", { className: "text-slate-800 text-base sm:text-lg leading-relaxed font-medium" }, espacioActual.narracionErnestinho))),
                React.createElement("div", { className: "max-w-4xl mx-auto mb-10" },
                    React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "Historia"),
                    React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-5" }, "Historia del espacio"),
                    React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed" }, espacioActual.historia)),
                espacioActual.fotoMedia && (React.createElement("div", { className: "my-12 rounded-3xl overflow-hidden " },
                    React.createElement("img", { src: espacioActual.fotoMedia, alt: `${espacioActual.nombre} - interior`, className: "w-full h-72 sm:h-[430px] object-cover" }))),
                React.createElement("div", { className: "bg-white rounded-3xl p-6 sm:p-8 border border-slate-100  mb-8" },
                    React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "La experiencia"),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mt-2 mb-4" }, "Qu\u00E9 encontrar\u00E1s"),
                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, espacioActual.visita)),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 mb-8" },
                    React.createElement("div", { className: "bg-white rounded-2xl p-6 border border-slate-100 " },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, "\uD83D\uDCCD Direcci\u00F3n"),
                        React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, espacioActual.direccion)),
                    React.createElement("div", { className: "bg-white rounded-2xl p-6 border border-slate-100 " },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, "\uD83D\uDD50 Horarios"),
                        React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, espacioActual.horario)),
                    React.createElement("div", { className: "bg-white rounded-2xl p-6 border border-slate-100 " },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, "\uD83C\uDF9F\uFE0F Entrada"),
                        React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, espacioActual.valor)),
                    React.createElement("div", { className: "bg-white rounded-2xl p-6 border border-slate-100 " },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, "\u23F1\uFE0F Duraci\u00F3n recomendada"),
                        React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, espacioActual.duracion)),
                    React.createElement("div", { className: "bg-white rounded-2xl p-6 border border-slate-100 " },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, "\uD83D\uDCC5 Reserva"),
                        React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, espacioActual.reserva)),
                    React.createElement("div", { className: "bg-white rounded-2xl p-6 border border-slate-100 " },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, "\u267F Accesibilidad"),
                        React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, espacioActual.accesibilidad))),
                React.createElement("div", { className: "bg-white rounded-3xl p-6 sm:p-8 border border-slate-100  mb-8" },
                    React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "Transporte"),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mt-2 mb-4" }, "C\u00F3mo llegar"),
                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, espacioActual.comoLlegar)),
                React.createElement("div", { className: "bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 mb-8" },
                    React.createElement("div", { className: "flex items-start gap-4" },
                        React.createElement("div", { className: "text-3xl shrink-0" }, "\uD83D\uDCA1"),
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-xs uppercase tracking-widest text-amber-600 font-black mb-2" }, "Consejo de Ernestinho"),
                            React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed" }, espacioActual.consejoErnestinho)))),
                React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8" },
                    React.createElement("div", { className: "flex items-start gap-4" },
                        React.createElement("div", { className: "text-3xl" }, "\u2B50"),
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-xs uppercase tracking-widest text-amber-400 font-bold mb-1" }, "Lo m\u00E1s destacado"),
                            React.createElement("p", { className: "font-bold text-lg" }, espacioActual.destaque)))),
                React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden border border-slate-100  mb-10" },
                    React.createElement("div", { className: "p-6" },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, "Ubicaci\u00F3n"),
                        React.createElement("h2", { className: "text-2xl font-black text-slate-900" }, "Mapa de Google")),
                    React.createElement("div", { className: "w-full h-[350px] sm:h-[450px]" },
                        React.createElement("iframe", { src: espacioActual.mapa, width: "100%", height: "100%", style: { border: 0 }, loading: "lazy", allowFullScreen: true, referrerPolicy: "no-referrer-when-downgrade", title: `Mapa de ${espacioActual.nombre}` }))),
                React.createElement("div", { className: "mt-10 mb-8" }, React.createElement(V4FitBlock, { entity: espacioActual.id })),
                React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mt-10 mb-10" },
                    React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6" },
                        React.createElement("div", null,
                            React.createElement("h2", { className: "text-xl sm:text-2xl font-black mb-2" }, "\u00BFQuieres organizar tu recorrido cultural?"),
                            React.createElement("p", { className: "text-slate-300 text-sm sm:text-base" }, "Ernestinho puede ayudarte a preparar un itinerario por los espacios literarios de R\u00EDo.")),
                        React.createElement("a", { href: `https://wa.me/5521969946938?text=${encodeURIComponent(`Hola Ernestinho, quiero conocer ${espacioActual.nombre} y necesito ayuda para organizar mi recorrido.`)}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wide px-6 py-4 rounded-xl transition-all " }, "HABLAR CON ERNESTINHO"))))))));
}
/* ===================================================== */
/* COMPONENTE CENTROS CULTURALES                         */
/* ===================================================== */
function SeccionCentrosCulturales({ seleccionInicial = null }) {
    const [centroSeleccionado, setCentroSeleccionado] = useState(seleccionInicial);
    const [selectorCentrosAbierto, setSelectorCentrosAbierto] = useState(false);
    const [busquedaCentro, setBusquedaCentro] = useState('');
    const centroActual = CENTROS_CULTURALES_DATA.find((centro) => centro.id === centroSeleccionado);
    const centrosFiltrados = CENTROS_CULTURALES_DATA.filter((centro) => centro.nombre
        .toLowerCase()
        .includes(busquedaCentro.toLowerCase()));
    return (React.createElement("section", { className: "ec-dark-attraction py-12 bg-[#071313] min-h-screen" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
            React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-10" },
                React.createElement("span", { className: "text-amber-500 font-bold text-xs uppercase tracking-widest block mb-2" }, "Arte, historia y cultura"),
                React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4" }, "Centros culturales de R\u00EDo"),
                React.createElement("p", { className: "text-slate-600 text-base sm:text-lg" }, "Exposiciones, m\u00FAsica, cine, patrimonio y espacios que cuentan diferentes cap\u00EDtulos de la historia de R\u00EDo de Janeiro.")),
            React.createElement("div", { className: "mb-10 ec-attraction-catalog-shell" },
                React.createElement("div", { className: "bg-white rounded-3xl border border-slate-100  p-5 sm:p-6" },
                    React.createElement("p", { className: "text-[11px] font-bold uppercase tracking-widest text-teal-600 mb-2" }, "Centro seleccionado"),
                    React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" },
                        React.createElement("h2", { className: "text-xl sm:text-2xl font-black text-slate-900" }, centroActual === null || centroActual === void 0 ? void 0 : centroActual.nombre),
                        React.createElement("button", { type: "button", onClick: () => { if (centroActual) { setCentroSeleccionado(null); window.scrollTo({top:0,behavior:'instant'}); } else { setSelectorCentrosAbierto(true); } }, className: "inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-teal-700 text-white font-black text-xs uppercase tracking-wide px-5 py-3.5 rounded-xl transition-all" },
                            React.createElement("span", null, centroActual ? '← VOLVER AL CATÁLOGO' : 'Todos los centros a la vista'),
                            React.createElement("span", null, selectorCentrosAbierto ? '▲' : '▼')))),
                !centroActual && (React.createElement("div", { className: "mt-3 bg-white rounded-3xl border border-slate-200  p-4 sm:p-6" },
                    React.createElement("div", { className: "relative mb-5" },
                        React.createElement("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" }, "\uD83D\uDD0D"),
                        React.createElement("input", { type: "text", value: busquedaCentro, onChange: (e) => setBusquedaCentro(e.target.value), placeholder: "Buscar centro cultural...", className: "w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-500" })),
                    React.createElement("div", { className: "pr-1" },
                        React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3" }, centrosFiltrados.map((centro) => (React.createElement("button", { type: "button", key: centro.id, onClick: () => {
                                seoNavigate(`/centros-culturales/${seoSlug(centro.nombre)}`); setCentroSeleccionado(centro.id);
                                window.scrollTo({ top: 0, behavior: 'instant' });
                                setSelectorCentrosAbierto(false);
                                setBusquedaCentro('');
                            }, className: `overflow-hidden rounded-2xl text-left transition-all border ${centroSeleccionado === centro.id
                                ? 'bg-slate-900 text-white border-slate-900  scale-[1.02]'
                                : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-teal-50 hover:border-teal-200'}` },
                            centro.miniatura && (React.createElement("img", { src: centro.miniatura, alt: centro.nombre, className: "w-full aspect-[4/3] object-contain bg-[#0b1b1b]" })),
                            React.createElement("div", { className: "min-h-[82px] px-3 py-4 flex items-center justify-center" },
                                React.createElement("span", { className: "text-xs sm:text-sm font-bold leading-snug text-center w-full" }, centro.nombre))))))),
                    centrosFiltrados.length === 0 && (React.createElement("p", { className: "text-center text-sm text-slate-500 py-8" }, "No encontramos un centro cultural con ese nombre."))))),
            centroActual && (React.createElement("div", { key: centroActual.id },
                React.createElement("button", { type: "button", onClick: () => { seoNavigate('/centros-culturales'); setCentroSeleccionado(null); setBusquedaCentro(''); window.scrollTo({top:0,behavior:'instant'}); }, className: "mb-6 inline-flex items-center gap-2 text-white/80 hover:text-amber-300 font-black text-xs uppercase tracking-wide" }, "← VOLVER AL CATÁLOGO"),
                React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden  border border-slate-100 mb-8 flex flex-col" },
                    React.createElement("div", { className: "p-6 sm:p-10" },
                        React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, centroActual.categoria),
                        React.createElement("h2", { className: "text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-2" }, centroActual.nombre),
                        null,
                        React.createElement("p", { className: "text-amber-500 font-bold text-sm mb-6" }, centroActual.subtitulo),
                        React.createElement("p", { className: "text-slate-600 leading-relaxed text-sm sm:text-base max-w-4xl" }, centroActual.descripcion)),
                    centroActual.fotoPrincipal && (React.createElement("div", { className: "px-2 pb-2" },
                        React.createElement("div", { className: "rounded-2xl overflow-hidden h-72 sm:h-[480px] " },
                            React.createElement("img", { src: centroActual.fotoPrincipal, alt: centroActual.nombre, className: "w-full h-full object-cover" }))))),
                React.createElement("div", { className: "max-w-4xl mx-auto mb-10" },
                    React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "Historia"),
                    React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-5" }, "Historia del espacio"),
                    React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed" }, centroActual.historia)),
                (centroActual.fotoMedia || centroActual.fotoExtra || centroActual.fotoExtra2) && (React.createElement("div", { className: "my-12 grid grid-cols-1 sm:grid-cols-2 gap-4" }, [centroActual.fotoMedia, centroActual.fotoExtra, centroActual.fotoExtra2].filter(Boolean).map((foto, indice) => (React.createElement("div", { key: foto, className: `rounded-3xl overflow-hidden  ${indice === 0 ? 'sm:col-span-2' : ''}` },
                    React.createElement("img", { src: foto, alt: `${centroActual.nombre} - foto ${indice + 2}`, className: `w-full object-cover ${indice === 0 ? 'h-72 sm:h-[430px]' : 'h-64 sm:h-80'}` })))))),
                React.createElement("div", { className: "bg-white rounded-3xl p-6 sm:p-8 border border-slate-100  mb-8" },
                    React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "La experiencia"),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mt-2 mb-4" }, "Qu\u00E9 encontrar\u00E1s"),
                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, centroActual.visita)),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 mb-8" }, [
                    ['📍 Dirección', centroActual.direccion],
                    ['🕐 Horarios', centroActual.horario],
                    ['🎟️ Entrada', centroActual.valor],
                    ['⏱️ Duración recomendada', centroActual.duracion],
                    ['📅 Reserva', centroActual.reserva],
                    ['♿ Accesibilidad', centroActual.accesibilidad]
                ].map(([titulo, contenido]) => (React.createElement("div", { key: titulo, className: "bg-white rounded-2xl p-6 border border-slate-100 " },
                    React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, titulo),
                    React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, contenido))))),
                React.createElement("div", { className: "bg-white rounded-3xl p-6 sm:p-8 border border-slate-100  mb-8" },
                    React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "Transporte"),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mt-2 mb-4" }, "C\u00F3mo llegar"),
                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, centroActual.comoLlegar)),
                React.createElement("div", { className: "bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 mb-8" },
                    React.createElement("div", { className: "flex items-start gap-4" },
                        React.createElement("div", { className: "text-3xl shrink-0" }, "\uD83D\uDCA1"),
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-xs uppercase tracking-widest text-amber-600 font-black mb-2" }, "Consejo de Ernestinho"),
                            React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed" }, centroActual.consejoErnestinho)))),
                React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8" },
                    React.createElement("p", { className: "text-xs uppercase tracking-widest text-amber-400 font-bold mb-2" }, "\u2B50 Lo m\u00E1s destacado"),
                    React.createElement("p", { className: "font-bold text-lg" }, centroActual.destaque)),
                React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden border border-slate-100  mb-10" },
                    React.createElement("div", { className: "p-6" },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, "Ubicaci\u00F3n"),
                        React.createElement("h2", { className: "text-2xl font-black text-slate-900" }, "Mapa de Google")),
                    React.createElement("div", { className: "w-full h-[350px] sm:h-[450px]" },
                        React.createElement("iframe", { src: centroActual.mapa, width: "100%", height: "100%", style: { border: 0 }, loading: "lazy", allowFullScreen: true, referrerPolicy: "no-referrer-when-downgrade", title: `Mapa de ${centroActual.nombre}` }))),
                React.createElement("div", { className: "mt-10 mb-8" }, React.createElement(V4FitBlock, { entity: centroActual.id })),
                React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-10" },
                    React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6" },
                        React.createElement("div", null,
                            React.createElement("h2", { className: "text-xl sm:text-2xl font-black mb-2" }, "\u00BFQuieres organizar tu circuito cultural?"),
                            React.createElement("p", { className: "text-slate-300 text-sm sm:text-base" }, "Ernestinho puede ayudarte a preparar un recorrido cultural por R\u00EDo de Janeiro.")),
                        React.createElement("a", { href: `https://wa.me/5521969946938?text=${encodeURIComponent(`Hola Ernestinho, quiero conocer ${centroActual.nombre} y necesito ayuda para organizar mi recorrido.`)}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wide px-6 py-4 rounded-xl transition-all " }, "HABLAR CON ERNESTINHO"))))))));
}
/* ===================================================== */
/* TEATROS                                               */
/* ===================================================== */
/* ===================================================== */
/* COMPONENTE DE TEATROS                                 */
/* ===================================================== */
function SeccionTeatros({ seleccionInicial = null }) {
    const [teatroSeleccionado, setTeatroSeleccionado] = useState(seleccionInicial);
    const [selectorTeatrosAbierto, setSelectorTeatrosAbierto] = useState(false);
    const [busquedaTeatro, setBusquedaTeatro] = useState('');
    const teatroActual = TEATROS_DATA.find((teatro) => teatro.id === teatroSeleccionado);
    const teatrosFiltrados = TEATROS_DATA.filter((teatro) => teatro.nombre
        .toLowerCase()
        .includes(busquedaTeatro.toLowerCase()));
    return (React.createElement("section", { className: "ec-dark-attraction py-12 bg-[#071313] min-h-screen" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
            React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-10" },
                React.createElement("span", { className: "text-amber-500 font-bold text-xs uppercase tracking-widest block mb-2" }, "Escenarios y espect\u00E1culos"),
                React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4" }, "Teatros de R\u00EDo de Janeiro"),
                React.createElement("p", { className: "text-slate-600 text-base sm:text-lg" }, "Grandes musicales, salas hist\u00F3ricas, conciertos, comedias, ballet y escenarios culturales en diferentes barrios de R\u00EDo.")),
            React.createElement("div", { className: "mb-10 ec-attraction-catalog-shell" },
                React.createElement("div", { className: "bg-white rounded-3xl border border-slate-100  p-5 sm:p-6" },
                    React.createElement("p", { className: "text-[11px] font-bold uppercase tracking-widest text-teal-600 mb-2" }, "Teatro seleccionado"),
                    React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" },
                        React.createElement("h2", { className: "text-xl sm:text-2xl font-black text-slate-900" }, teatroActual === null || teatroActual === void 0 ? void 0 : teatroActual.nombre),
                        React.createElement("button", { type: "button", onClick: () => { if (teatroActual) { setTeatroSeleccionado(null); window.scrollTo({top:0,behavior:'instant'}); } else { setSelectorTeatrosAbierto(true); } }, className: "inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-teal-700 text-white font-black text-xs uppercase tracking-wide px-5 py-3.5 rounded-xl transition-all" },
                            React.createElement("span", null, selectorTeatrosAbierto
                                ? 'Cerrar lista'
                                : teatroActual ? '← VOLVER AL CATÁLOGO' : 'Elegir otro teatro'),
                            React.createElement("span", null, selectorTeatrosAbierto ? '▲' : '▼')))),
                !teatroActual && (React.createElement("div", { className: "mt-3 bg-white rounded-3xl border border-slate-200  p-4 sm:p-6" },
                    React.createElement("div", { className: "relative mb-5" },
                        React.createElement("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" }, "\uD83D\uDD0D"),
                        React.createElement("input", { type: "text", value: busquedaTeatro, onChange: (e) => setBusquedaTeatro(e.target.value), placeholder: "Buscar teatro...", className: "w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-500" })),
                    React.createElement("div", { className: "pr-1" },
                        React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3" }, teatrosFiltrados.map((teatro) => (React.createElement("button", { type: "button", key: teatro.id, onClick: () => {
                                seoNavigate(`/teatros/${seoSlug(teatro.nombre)}`); setTeatroSeleccionado(teatro.id);
                                window.scrollTo({ top: 0, behavior: 'instant' });
                                setSelectorTeatrosAbierto(false);
                                setBusquedaTeatro('');
                            }, className: `overflow-hidden rounded-2xl text-left transition-all border ${teatroSeleccionado === teatro.id
                                ? 'bg-slate-900 text-white border-slate-900  scale-[1.02]'
                                : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-teal-50 hover:border-teal-200'}` },
                            teatro.miniatura && (React.createElement("img", { src: teatro.miniatura, alt: teatro.nombre, className: "w-full aspect-[4/3] object-contain bg-[#0b1b1b]" })),
                            React.createElement("div", { className: "min-h-[82px] px-3 py-4 flex items-center justify-center" },
                                React.createElement("span", { className: "text-xs sm:text-sm font-bold leading-snug text-center w-full" }, teatro.nombre))))))),
                    teatrosFiltrados.length === 0 && (React.createElement("p", { className: "text-center text-sm text-slate-500 py-8" }, "No encontramos un teatro con ese nombre."))))),
            teatroActual && (React.createElement("div", { key: teatroActual.id },
                React.createElement("button", { type: "button", onClick: () => { seoNavigate('/teatros'); setTeatroSeleccionado(null); setBusquedaTeatro(''); window.scrollTo({top:0,behavior:'instant'}); }, className: "mb-6 inline-flex items-center gap-2 text-white/80 hover:text-amber-300 font-black text-xs uppercase tracking-wide" }, "← VOLVER AL CATÁLOGO"),
                React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden  border border-slate-100 mb-8" },
                    React.createElement("div", { className: "p-6 sm:p-10" },
                        React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, teatroActual.categoria),
                        React.createElement("h2", { className: "text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-2" }, teatroActual.nombre),
                        null,
                        React.createElement("p", { className: "text-amber-500 font-bold text-sm mb-6" }, teatroActual.subtitulo),
                        React.createElement("p", { className: "text-slate-600 leading-relaxed text-sm sm:text-base max-w-4xl" }, teatroActual.descripcion)),
                    teatroActual.fotoPrincipal && (React.createElement("div", { className: "px-2 pb-2" },
                        React.createElement("img", { src: teatroActual.fotoPrincipal, alt: teatroActual.nombre, className: "w-full h-72 sm:h-[480px] object-cover rounded-2xl" })))),
                React.createElement("div", { className: "max-w-4xl mx-auto mb-10" },
                    React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "Historia"),
                    React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-5" }, "Historia del teatro"),
                    React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed" }, teatroActual.historia)),
                teatroActual.fotoMedia && (React.createElement("div", { className: "my-12 rounded-3xl overflow-hidden " },
                    React.createElement("img", { src: teatroActual.fotoMedia, alt: `${teatroActual.nombre} - interior`, className: "w-full h-72 sm:h-[430px] object-cover" }))),
                React.createElement("div", { className: "bg-white rounded-3xl p-6 sm:p-8 border border-slate-100  mb-8" },
                    React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "La experiencia"),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mt-2 mb-4" }, "Qu\u00E9 encontrar\u00E1s"),
                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, teatroActual.experiencia)),
                teatroActual.visitaGuiada && (React.createElement("div", { className: "bg-teal-50 border-2 border-teal-200 rounded-3xl p-6 sm:p-8 mb-8" },
                    React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, "\uD83C\uDFDB\uFE0F Visita guiada"),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mb-4" }, "Conoce el teatro por dentro"),
                    React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed" }, teatroActual.visitaGuiada))),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 mb-8" }, [
                    ['📍 Dirección', teatroActual.direccion],
                    ['🕐 Horarios', teatroActual.horario],
                    ['🎟️ Entradas', teatroActual.valor],
                    ['⏱️ Duración', teatroActual.duracion],
                    ['📅 Reserva', teatroActual.reserva],
                    ['♿ Accesibilidad', teatroActual.accesibilidad]
                ].map(([titulo, contenido]) => (React.createElement("div", { key: titulo, className: "bg-white rounded-2xl p-6 border border-slate-100 " },
                    React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, titulo),
                    React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, contenido))))),
                React.createElement("div", { className: "bg-white rounded-3xl p-6 sm:p-8 border border-slate-100  mb-8" },
                    React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "Transporte"),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mt-2 mb-4" }, "C\u00F3mo llegar"),
                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, teatroActual.comoLlegar)),
                React.createElement("div", { className: "bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 mb-8" },
                    React.createElement("div", { className: "flex items-start gap-4" },
                        React.createElement("div", { className: "text-3xl shrink-0" }, "\uD83D\uDCA1"),
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-xs uppercase tracking-widest text-amber-600 font-black mb-2" }, "Consejo de Ernestinho"),
                            React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed" }, teatroActual.consejoErnestinho)))),
                React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8" },
                    React.createElement("p", { className: "text-xs uppercase tracking-widest text-amber-400 font-bold mb-2" }, "\u2B50 Lo m\u00E1s destacado"),
                    React.createElement("p", { className: "font-bold text-lg" }, teatroActual.destaque)),
                React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden border border-slate-100  mb-10" },
                    React.createElement("div", { className: "p-6" },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, "Ubicaci\u00F3n"),
                        React.createElement("h2", { className: "text-2xl font-black text-slate-900" }, "Mapa de Google")),
                    React.createElement("div", { className: "w-full h-[350px] sm:h-[450px]" },
                        React.createElement("iframe", { src: teatroActual.mapa, width: "100%", height: "100%", style: { border: 0 }, loading: "lazy", allowFullScreen: true, referrerPolicy: "no-referrer-when-downgrade", title: `Mapa de ${teatroActual.nombre}` }))),
                React.createElement("div", { className: "mt-10 mb-8" }, React.createElement(V4FitBlock, { entity: teatroActual.id })),
                React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-10" },
                    React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6" },
                        React.createElement("div", null,
                            React.createElement("h2", { className: "text-xl sm:text-2xl font-black mb-2" }, "\u00BFNecesitas ayuda para organizar tu visita?"),
                            React.createElement("p", { className: "text-slate-300 text-sm sm:text-base" }, "Ernestinho puede ayudarte con tu itinerario cultural en R\u00EDo.")),
                        React.createElement("a", { href: `https://wa.me/5521969946938?text=${encodeURIComponent(`Hola Ernestinho, quiero conocer ${teatroActual.nombre} y necesito más información.`)}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wide px-6 py-4 rounded-xl transition-all " }, "HABLAR CON ERNESTINHO"))))))));
}
/* ===================================================== */
/* IGLESIAS Y CATEDRALES                                 */
/* ===================================================== */
/* ===================================================== */
/* COMPONENTE IGLESIAS                                   */
/* ===================================================== */
function SeccionIglesias({ seleccionInicial = null }) {
    const [iglesiaSeleccionada, setIglesiaSeleccionada] = useState(seleccionInicial);
    const [selectorIglesiasAbierto, setSelectorIglesiasAbierto] = useState(false);
    const [busquedaIglesia, setBusquedaIglesia] = useState('');
    const iglesiaActual = IGLESIAS_DATA.find((iglesia) => iglesia.id === iglesiaSeleccionada);
    const iglesiasFiltradas = IGLESIAS_DATA.filter((iglesia) => iglesia.nombre
        .toLowerCase()
        .includes(busquedaIglesia.toLowerCase()));
    return (React.createElement("section", { className: "ec-dark-attraction py-12 bg-[#071313] min-h-screen" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
            React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-10" },
                React.createElement("span", { className: "text-amber-500 font-bold text-xs uppercase tracking-widest block mb-2" }, "Fe, historia y patrimonio"),
                React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4" }, "Iglesias y catedrales de R\u00EDo"),
                React.createElement("p", { className: "text-slate-600 text-base sm:text-lg" }, "Templos coloniales, santuarios, arquitectura moderna, arte barroco y lugares fundamentales de la historia de R\u00EDo.")),
            React.createElement("div", { className: "bg-teal-50 border border-teal-200 rounded-2xl p-5 mb-8" },
                React.createElement("p", { className: "text-sm text-teal-900 leading-relaxed" },
                    React.createElement("strong", null, "Importante:"),
                    " estos lugares contin\u00FAan funcionando como espacios religiosos. Durante misas, matrimonios, funerales y momentos de oraci\u00F3n, mant\u00E9n silencio, utiliza vestimenta adecuada y pregunta antes de fotografiar.")),
            React.createElement("div", { className: "mb-10 ec-attraction-catalog-shell" },
                React.createElement("div", { className: "bg-white rounded-3xl border border-slate-100  p-5 sm:p-6" },
                    React.createElement("p", { className: "text-[11px] font-bold uppercase tracking-widest text-teal-600 mb-2" }, "Iglesia seleccionada"),
                    React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" },
                        React.createElement("h2", { className: "text-xl sm:text-2xl font-black text-slate-900" }, iglesiaActual === null || iglesiaActual === void 0 ? void 0 : iglesiaActual.nombre),
                        React.createElement("button", { type: "button", onClick: () => { if (iglesiaActual) { setIglesiaSeleccionada(null); window.scrollTo({top:0,behavior:'instant'}); } else { setSelectorIglesiasAbierto(true); } }, className: "inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-teal-700 text-white font-black text-xs uppercase tracking-wide px-5 py-3.5 rounded-xl transition-all" },
                            React.createElement("span", null, 'Todas las iglesias a la vista'),
                            React.createElement("span", null, selectorIglesiasAbierto ? '▲' : '▼')))),
                !iglesiaActual && (React.createElement("div", { className: "mt-3 bg-white rounded-3xl border border-slate-200  p-4 sm:p-6" },
                    React.createElement("div", { className: "relative mb-5" },
                        React.createElement("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" }, "\uD83D\uDD0D"),
                        React.createElement("input", { type: "text", value: busquedaIglesia, onChange: (e) => setBusquedaIglesia(e.target.value), placeholder: "Buscar iglesia, catedral o santuario...", className: "w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-500" })),
                    React.createElement("div", { className: "pr-1" },
                        React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3" }, iglesiasFiltradas.map((iglesia) => (React.createElement("button", { type: "button", key: iglesia.id, onClick: () => {
                                seoNavigate(`/iglesias/${seoSlug(iglesia.nombre)}`); setIglesiaSeleccionada(iglesia.id);
                                window.scrollTo({ top: 0, behavior: 'instant' });
                                setSelectorIglesiasAbierto(false);
                                setBusquedaIglesia('');
                            }, className: `overflow-hidden rounded-2xl text-left transition-all border ${iglesiaSeleccionada === iglesia.id
                                ? 'bg-slate-900 text-white border-slate-900  scale-[1.02]'
                                : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-teal-50 hover:border-teal-200'}` },
                            iglesia.miniatura && (React.createElement("img", { src: iglesia.miniatura, alt: iglesia.nombre, className: "w-full aspect-[4/3] object-contain bg-[#0b1b1b]" })),
                            React.createElement("div", { className: "min-h-[82px] px-3 py-4 flex items-center justify-center" },
                                React.createElement("span", { className: "text-xs sm:text-sm font-bold leading-snug text-center w-full" }, iglesia.nombre))))))),
                    iglesiasFiltradas.length === 0 && (React.createElement("p", { className: "text-center text-sm text-slate-500 py-8" }, "No encontramos una iglesia con ese nombre."))))),
            iglesiaActual && (React.createElement("div", { key: iglesiaActual.id },
                React.createElement("button", { type: "button", onClick: () => { seoNavigate('/iglesias'); setIglesiaSeleccionada(null); setBusquedaIglesia(''); window.scrollTo({top:0,behavior:'instant'}); }, className: "mb-6 inline-flex items-center gap-2 text-white/80 hover:text-amber-300 font-black text-xs uppercase tracking-wide" }, "← VOLVER AL CATÁLOGO"),
                React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden  border border-slate-100 mb-8 flex flex-col" },
                    React.createElement("div", { className: "p-6 sm:p-10" },
                        React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, iglesiaActual.categoria),
                        React.createElement("h2", { className: "text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-2" }, iglesiaActual.nombre),
                        null,
                        React.createElement("p", { className: "text-amber-500 font-bold text-sm mb-6" }, iglesiaActual.subtitulo),
                        React.createElement("p", { className: "text-slate-600 leading-relaxed text-sm sm:text-base max-w-4xl" }, iglesiaActual.descripcion)),
                    iglesiaActual.fotoPrincipal && (React.createElement("div", { className: "px-2 pb-2" },
                        React.createElement("img", { src: iglesiaActual.fotoPrincipal, alt: iglesiaActual.nombre, className: "w-full h-72 sm:h-[480px] object-cover rounded-2xl" })))),
                React.createElement("div", { className: "max-w-4xl mx-auto mb-10" },
                    React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "Historia"),
                    React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-5" }, "Historia del templo"),
                    React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed" }, iglesiaActual.historia)),
                iglesiaActual.fotoMedia && (React.createElement("div", { className: "my-12 rounded-3xl overflow-hidden " },
                    React.createElement("img", { src: iglesiaActual.fotoMedia, alt: `${iglesiaActual.nombre} - interior`, className: "w-full h-72 sm:h-[430px] object-cover" }))),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 mb-8" }, [
                    ['📍 Dirección', iglesiaActual.direccion],
                    ['🕐 Visitas', iglesiaActual.horario],
                    ['🎟️ Entrada', iglesiaActual.valor],
                    ['⏱️ Duración recomendada', iglesiaActual.duracion],
                    ['♿ Accesibilidad', iglesiaActual.accesibilidad],
                    ['🚇 Cómo llegar', iglesiaActual.comoLlegar]
                ].map(([titulo, contenido]) => (React.createElement("div", { key: titulo, className: "bg-white rounded-2xl p-6 border border-slate-100 " },
                    React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, titulo),
                    React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, contenido))))),
                React.createElement("div", { className: "bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 mb-8" },
                    React.createElement("div", { className: "flex items-start gap-4" },
                        React.createElement("div", { className: "text-3xl shrink-0" }, "\uD83D\uDCA1"),
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-xs uppercase tracking-widest text-amber-600 font-black mb-2" }, "Consejo de Ernestinho"),
                            React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed" }, iglesiaActual.consejoErnestinho)))),
                React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8" },
                    React.createElement("p", { className: "text-xs uppercase tracking-widest text-amber-400 font-bold mb-2" }, "\u2B50 Lo m\u00E1s destacado"),
                    React.createElement("p", { className: "font-bold text-lg" }, iglesiaActual.destaque)),
                React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden border border-slate-100  mb-10" },
                    React.createElement("div", { className: "p-6" },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, "Ubicaci\u00F3n"),
                        React.createElement("h2", { className: "text-2xl font-black text-slate-900" }, "Mapa de Google")),
                    React.createElement("div", { className: "w-full h-[350px] sm:h-[450px]" },
                        React.createElement("iframe", { src: iglesiaActual.mapa, width: "100%", height: "100%", style: { border: 0 }, loading: "lazy", allowFullScreen: true, referrerPolicy: "no-referrer-when-downgrade", title: `Mapa de ${iglesiaActual.nombre}` }))),
                React.createElement("div", { className: "mt-10 mb-8" }, React.createElement(V4FitBlock, { entity: iglesiaActual.id })),
                React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-10" },
                    React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6" },
                        React.createElement("div", null,
                            React.createElement("h2", { className: "text-xl sm:text-2xl font-black mb-2" }, "\u00BFNecesitas ayuda para organizar tu visita?"),
                            React.createElement("p", { className: "text-slate-300 text-sm sm:text-base" }, "Ernestinho puede ayudarte con tu itinerario hist\u00F3rico y cultural en R\u00EDo.")),
                        React.createElement("a", { href: `https://wa.me/5521969946938?text=${encodeURIComponent(`Hola Ernestinho, quiero conocer ${iglesiaActual.nombre} y necesito más información.`)}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wide px-6 py-4 rounded-xl transition-all " }, "HABLAR CON ERNESTINHO"))))))));
}
/* ===================================================== */
/* FUERTES Y FORTALEZAS                                  */
/* ===================================================== */
/* ===================================================== */
/* COMPONENTE FUERTES Y FORTALEZAS                       */
/* ===================================================== */
function SeccionFuertesFortalezas({ seleccionInicial = null }) {
    const [fuerteSeleccionado, setFuerteSeleccionado] = useState(seleccionInicial);
    const [selectorFuertesAbierto, setSelectorFuertesAbierto] = useState(false);
    const [busquedaFuerte, setBusquedaFuerte] = useState('');
    const fuerteActual = FUERTES_DATA.find((fuerte) => fuerte.id === fuerteSeleccionado);
    const fuertesFiltrados = FUERTES_DATA.filter((fuerte) => `${fuerte.nombre} ${fuerte.ciudad}`
        .toLowerCase()
        .includes(busquedaFuerte.toLowerCase()));
    return (React.createElement("section", { className: "ec-dark-attraction py-12 bg-[#071313] min-h-screen" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
            React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-10" },
                React.createElement("span", { className: "text-amber-500 font-bold text-xs uppercase tracking-widest block mb-2" }, "Historia y defensa de Guanabara"),
                React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4" }, "Fuertes y fortalezas"),
                React.createElement("p", { className: "text-slate-600 text-base sm:text-lg" }, "Fortificaciones hist\u00F3ricas, museos militares y miradores estrat\u00E9gicos de R\u00EDo de Janeiro y Niter\u00F3i.")),
            React.createElement("div", { className: "bg-amber-50 border border-amber-300 rounded-2xl p-5 mb-8" },
                React.createElement("p", { className: "text-sm text-slate-700 leading-relaxed" },
                    React.createElement("strong", null, "Importante:"),
                    " varios lugares contin\u00FAan dentro de instalaciones militares activas. Lleva un documento con fotograf\u00EDa, respeta las instrucciones y confirma la visita antes de desplazarte. No fotograf\u00EDes \u00E1reas o equipos sin autorizaci\u00F3n.")),
            React.createElement("div", { className: "mb-10 ec-attraction-catalog-shell" },
                React.createElement("div", { className: "bg-white rounded-3xl border border-slate-100  p-5 sm:p-6" },
                    React.createElement("p", { className: "text-[11px] font-bold uppercase tracking-widest text-teal-600 mb-2" }, "Fortaleza seleccionada"),
                    React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" },
                        React.createElement("div", null,
                            React.createElement("h2", { className: "text-xl sm:text-2xl font-black text-slate-900" }, fuerteActual === null || fuerteActual === void 0 ? void 0 : fuerteActual.nombre),
                            React.createElement("p", { className: "text-sm text-slate-500 mt-1" }, fuerteActual === null || fuerteActual === void 0 ? void 0 : fuerteActual.ciudad)),
                        React.createElement("button", { type: "button", onClick: () => { if (fuerteActual) { setFuerteSeleccionado(null); window.scrollTo({top:0,behavior:'instant'}); } else { setSelectorFuertesAbierto(true); } }, className: "inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-teal-700 text-white font-black text-xs uppercase tracking-wide px-5 py-3.5 rounded-xl transition-all" },
                            React.createElement("span", null, selectorFuertesAbierto
                                ? 'Cerrar lista'
                                : fuerteActual ? '← VOLVER AL CATÁLOGO' : 'Elegir otra fortaleza'),
                            React.createElement("span", null, selectorFuertesAbierto ? '▲' : '▼')))),
                !fuerteActual && (React.createElement("div", { className: "mt-3 bg-white rounded-3xl border border-slate-200  p-4 sm:p-6" },
                    React.createElement("div", { className: "relative mb-5" },
                        React.createElement("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" }, "\uD83D\uDD0D"),
                        React.createElement("input", { type: "text", value: busquedaFuerte, onChange: (e) => setBusquedaFuerte(e.target.value), placeholder: "Buscar fuerte, fortaleza, R\u00EDo o Niter\u00F3i...", className: "w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-500" })),
                    React.createElement("div", { className: "pr-1" },
                        React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3" }, fuertesFiltrados.map((fuerte) => (React.createElement("button", { type: "button", key: fuerte.id, onClick: () => {
                                seoNavigate(`/fuertes-fortalezas/${seoSlug(fuerte.nombre)}`); setFuerteSeleccionado(fuerte.id);
                                window.scrollTo({ top: 0, behavior: 'instant' });
                                setSelectorFuertesAbierto(false);
                                setBusquedaFuerte('');
                            }, className: `overflow-hidden rounded-2xl text-left transition-all border ${fuerteSeleccionado === fuerte.id
                                ? 'bg-slate-900 text-white border-slate-900  scale-[1.02]'
                                : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-teal-50 hover:border-teal-200'}` },
                            fuerte.miniatura && (React.createElement("img", { src: fuerte.miniatura, alt: fuerte.nombre, className: "w-full aspect-[4/3] object-contain bg-[#0b1b1b]" })),
                            React.createElement("div", { className: "min-h-[96px] px-3 py-4 flex flex-col items-center justify-center" },
                                React.createElement("span", { className: "text-xs sm:text-sm font-bold leading-snug text-center" }, fuerte.nombre),
                                React.createElement("span", { className: `text-[10px] uppercase tracking-wide mt-2 ${fuerteSeleccionado === fuerte.id
                                        ? 'text-teal-300'
                                        : 'text-teal-600'}` }, fuerte.ciudad))))))),
                    fuertesFiltrados.length === 0 && (React.createElement("p", { className: "text-center text-sm text-slate-500 py-8" }, "No encontramos una fortaleza con ese nombre."))))),
            fuerteActual && (React.createElement("div", { key: fuerteActual.id },
                React.createElement("button", { type: "button", onClick: () => { seoNavigate('/fuertes-fortalezas'); setFuerteSeleccionado(null); setBusquedaFuerte(''); window.scrollTo({top:0,behavior:'instant'}); }, className: "mb-6 inline-flex items-center gap-2 text-white/80 hover:text-amber-300 font-black text-xs uppercase tracking-wide" }, "← VOLVER AL CATÁLOGO"),
                React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden  border border-slate-100 mb-8" },
                    React.createElement("div", { className: "p-6 sm:p-10" },
                        React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" },
                            fuerteActual.categoria,
                            " \u00B7 ",
                            fuerteActual.ciudad),
                        React.createElement("h2", { className: "text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-2" }, fuerteActual.nombre),
                        null,
                        React.createElement("p", { className: "text-amber-500 font-bold text-sm mb-6" }, fuerteActual.subtitulo),
                        React.createElement("p", { className: "text-slate-600 leading-relaxed text-sm sm:text-base max-w-4xl" }, fuerteActual.descripcion)),
                    fuerteActual.fotoPrincipal && (React.createElement("div", { className: "px-2 pb-2" },
                        React.createElement("img", { src: fuerteActual.fotoPrincipal, alt: fuerteActual.nombre, className: "w-full h-72 sm:h-[480px] object-cover rounded-2xl" })))),
                React.createElement("div", { className: "max-w-4xl mx-auto mb-10" },
                    React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "Historia"),
                    React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-5" }, "Historia de la fortificaci\u00F3n"),
                    React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed" }, fuerteActual.historia)),
                fuerteActual.fotoMedia && (React.createElement("div", { className: "my-12 rounded-3xl overflow-hidden " },
                    React.createElement("img", { src: fuerteActual.fotoMedia, alt: `${fuerteActual.nombre} - fortificación`, className: "w-full h-72 sm:h-[430px] object-cover" }))),
                React.createElement("div", { className: "bg-white rounded-3xl p-6 sm:p-8 border border-slate-100  mb-8" },
                    React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "La experiencia"),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mt-2 mb-4" }, "Qu\u00E9 encontrar\u00E1s"),
                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, fuerteActual.experiencia)),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 mb-8" }, [
                    ['📍 Dirección', fuerteActual.direccion],
                    ['🕐 Visitas', fuerteActual.horario],
                    ['🎟️ Entrada', fuerteActual.valor],
                    ['⏱️ Duración', fuerteActual.duracion],
                    ['📅 Reserva', fuerteActual.reserva],
                    ['♿ Accesibilidad', fuerteActual.accesibilidad],
                    ['🪪 Documentos', fuerteActual.documentos],
                    ['🚇 Cómo llegar', fuerteActual.comoLlegar]
                ].map(([titulo, contenido]) => (React.createElement("div", { key: titulo, className: "bg-white rounded-2xl p-6 border border-slate-100 " },
                    React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, titulo),
                    React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, contenido))))),
                React.createElement("div", { className: "bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 mb-8" },
                    React.createElement("div", { className: "flex items-start gap-4" },
                        React.createElement("div", { className: "text-3xl shrink-0" }, "\uD83D\uDCA1"),
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-xs uppercase tracking-widest text-amber-600 font-black mb-2" }, "Consejo de Ernestinho"),
                            React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed" }, fuerteActual.consejoErnestinho)))),
                React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8" },
                    React.createElement("p", { className: "text-xs uppercase tracking-widest text-amber-400 font-bold mb-2" }, "\u2B50 Lo m\u00E1s destacado"),
                    React.createElement("p", { className: "font-bold text-lg" }, fuerteActual.destaque)),
                React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden border border-slate-100  mb-10" },
                    React.createElement("div", { className: "p-6" },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, "Ubicaci\u00F3n"),
                        React.createElement("h2", { className: "text-2xl font-black text-slate-900" }, "Mapa de Google")),
                    React.createElement("div", { className: "w-full h-[350px] sm:h-[450px]" },
                        React.createElement("iframe", { src: fuerteActual.mapa, width: "100%", height: "100%", style: { border: 0 }, loading: "lazy", allowFullScreen: true, referrerPolicy: "no-referrer-when-downgrade", title: `Mapa de ${fuerteActual.nombre}` }))),
                React.createElement("div", { className: "mt-10 mb-8" }, React.createElement(V4FitBlock, { entity: fuerteActual.id })),
                React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-10" },
                    React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6" },
                        React.createElement("div", null,
                            React.createElement("h2", { className: "text-xl sm:text-2xl font-black mb-2" }, "\u00BFNecesitas ayuda para organizar tu visita?"),
                            React.createElement("p", { className: "text-slate-300 text-sm sm:text-base" }, "Ernestinho puede ayudarte a planificar tu recorrido hist\u00F3rico por R\u00EDo y Niter\u00F3i.")),
                        React.createElement("a", { href: `https://wa.me/5521969946938?text=${encodeURIComponent(`Hola Ernestinho, quiero conocer ${fuerteActual.nombre} y necesito más información.`)}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wide px-6 py-4 rounded-xl transition-all " }, "HABLAR CON ERNESTINHO"))))))));
}
/* ===================================================== */
/* FAMILIA                                               */
/* ===================================================== */
// FAMILIA_DATA lazy-loaded from /assets/section-culture-data.js

/* ===================================================== */
/* COMPONENTE FAMILIA                                    */
/* ===================================================== */
function SeccionFamilia({ seleccionInicial = null, onVolver }) {
    const [actividadSeleccionada, setActividadSeleccionada] = useState(seleccionInicial);
    const [selectorFamiliaAbierto, setSelectorFamiliaAbierto] = useState(false);
    const [busquedaFamilia, setBusquedaFamilia] = useState('');
    const actividadActual = FAMILIA_DATA.find((actividad) => actividad.id === actividadSeleccionada);
    const actividadesFiltradas = FAMILIA_DATA.filter((actividad) => `${actividad.nombre} ${actividad.categoria}`
        .toLowerCase()
        .includes(busquedaFamilia.toLowerCase()));
    if (!actividadSeleccionada) {
        return React.createElement("section", { className: "py-12 bg-[#071313] text-white min-h-screen" }, React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" }, React.createElement("button", { onClick: onVolver, className: "mb-8 text-white/75 hover:text-amber-300 font-black text-xs uppercase" }, "← Volver a Qué hacer"), React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-10" }, React.createElement("span", { className: "text-amber-300 font-bold text-xs uppercase tracking-widest block mb-2" }, "Río para todas las edades"), React.createElement("h1", { className: "text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4" }, "Río en familia"), React.createElement("p", { className: "text-white/65 text-base sm:text-lg" }, "Elige una actividad. Cada tarjeta abre su ficha completa con historia, fotografías, información práctica, mapa y consejos.")), React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" }, FAMILIA_DATA.map(actividad => React.createElement("button", { key: actividad.id, type: "button", onClick: () => { setActividadSeleccionada(actividad.id); window.scrollTo({top:0, behavior:'smooth'}); }, className: "group text-left bg-[#102424] rounded-[1.7rem] overflow-hidden border border-white/10  hover:border-amber-300/60 transition-all" }, React.createElement("div", { className: "aspect-[4/3] overflow-hidden bg-slate-900" }, actividad.miniatura ? React.createElement("img", { src: actividad.miniatura, alt: actividad.nombre, loading: "lazy", className: "w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" }) : null), React.createElement("div", { className: "p-5" }, React.createElement("span", { className: "text-[10px] font-black uppercase tracking-widest text-amber-300" }, actividad.categoria), React.createElement("h2", { className: "text-xl font-black text-white mt-2" }, actividad.nombre), React.createElement("p", { className: "text-sm text-white/60 mt-2 line-clamp-3" }, actividad.subtitulo || actividad.descripcion), React.createElement("span", { className: "inline-flex mt-4 text-xs font-black text-amber-300" }, "VER DETALLES →")))))));
    }
    return (React.createElement("section", { className: "py-12 bg-slate-50 min-h-screen" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
            React.createElement("button", { onClick: () => { setActividadSeleccionada(null); window.scrollTo({top:0, behavior:'smooth'}); }, className: "mb-7 inline-flex items-center rounded-full bg-slate-900 text-white px-5 py-3 text-xs font-black uppercase" }, "← Volver a Familia"),
            React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-10" },
                React.createElement("span", { className: "text-amber-500 font-bold text-xs uppercase tracking-widest block mb-2" }, "R\u00EDo para todas las edades"),
                React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4" }, "R\u00EDo en familia"),
                React.createElement("p", { className: "text-slate-600 text-base sm:text-lg" }, "Animales, ciencia, f\u00FAtbol, carnaval, naturaleza y juegos para disfrutar R\u00EDo con ni\u00F1os y adolescentes.")),
            React.createElement("div", { className: "mb-10" },
                React.createElement("div", { className: "bg-white rounded-3xl border border-slate-100  p-5 sm:p-6" },
                    React.createElement("p", { className: "text-[11px] font-bold uppercase tracking-widest text-teal-600 mb-2" }, "Actividad seleccionada"),
                    React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" },
                        React.createElement("h2", { className: "text-xl sm:text-2xl font-black text-slate-900" }, actividadActual === null || actividadActual === void 0 ? void 0 : actividadActual.nombre),
                        React.createElement("button", { type: "button", onClick: () => setSelectorFamiliaAbierto(!selectorFamiliaAbierto), className: "inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-teal-700 text-white font-black text-xs uppercase tracking-wide px-5 py-3.5 rounded-xl transition-all" },
                            React.createElement("span", null, selectorFamiliaAbierto
                                ? 'Cerrar lista'
                                : 'Elegir otra actividad'),
                            React.createElement("span", null, selectorFamiliaAbierto ? '▲' : '▼')))),
                selectorFamiliaAbierto && (React.createElement("div", { className: "mt-3 bg-white rounded-3xl border border-slate-200  p-4 sm:p-6" },
                    React.createElement("div", { className: "relative mb-5" },
                        React.createElement("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" }, "\uD83D\uDD0D"),
                        React.createElement("input", { type: "text", value: busquedaFamilia, onChange: (e) => setBusquedaFamilia(e.target.value), placeholder: "Buscar actividad familiar...", className: "w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-500" })),
                    React.createElement("div", { className: "pr-1" },
                        React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3" }, actividadesFiltradas.map((actividad) => (React.createElement("button", { type: "button", key: actividad.id, onClick: () => {
                                setActividadSeleccionada(actividad.id);
                                setSelectorFamiliaAbierto(false);
                                setBusquedaFamilia('');
                            }, className: `overflow-hidden rounded-2xl text-left transition-all border ${actividadSeleccionada === actividad.id
                                ? 'bg-slate-900 text-white border-slate-900  scale-[1.02]'
                                : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-teal-50 hover:border-teal-200'}` },
                            actividad.miniatura && (React.createElement("img", { src: actividad.miniatura, alt: actividad.nombre, className: "w-full aspect-[4/3] object-contain bg-[#0b1b1b]" })),
                            React.createElement("div", { className: "min-h-[96px] px-3 py-4 flex flex-col items-center justify-center" },
                                React.createElement("span", { className: "text-xs sm:text-sm font-bold leading-snug text-center" }, actividad.nombre),
                                React.createElement("span", { className: `text-[10px] uppercase tracking-wide mt-2 text-center ${actividadSeleccionada === actividad.id
                                        ? 'text-teal-300'
                                        : 'text-teal-600'}` }, actividad.categoria))))))),
                    actividadesFiltradas.length === 0 && (React.createElement("p", { className: "text-center text-sm text-slate-500 py-8" }, "No encontramos una actividad con ese nombre."))))),
            actividadActual && (React.createElement("div", { key: actividadActual.id },
                React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden  border border-slate-100 mb-8" }, actividadActual.fotoPrincipal ? (React.createElement("div", { className: "relative min-h-[430px] sm:min-h-[560px] flex items-end overflow-hidden" },
                    React.createElement("img", { src: actividadActual.fotoPrincipal, alt: actividadActual.nombre, className: "absolute inset-0 w-full h-full object-cover" }),
                    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" }),
                    React.createElement("div", { className: "relative z-10 p-6 sm:p-10 max-w-4xl text-white" },
                        React.createElement("span", { className: "inline-flex bg-teal-500/90 text-white font-black text-[11px] uppercase tracking-widest px-3 py-2 rounded-full mb-4" }, actividadActual.categoria),
                        React.createElement("h2", { className: "text-3xl sm:text-5xl font-black leading-tight mb-3" }, actividadActual.nombre),
                        React.createElement("p", { className: "text-amber-300 font-bold text-base sm:text-lg mb-4" }, actividadActual.subtitulo),
                        React.createElement("p", { className: "text-white/90 leading-relaxed text-sm sm:text-base" }, actividadActual.descripcion)))) : (React.createElement("div", { className: "p-6 sm:p-10" },
                    React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, actividadActual.categoria),
                    React.createElement("h2", { className: "text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-2" }, actividadActual.nombre),
                    React.createElement(V4FitBlock, { entity: actividadActual.id }),
                    React.createElement("p", { className: "text-amber-500 font-bold text-sm mb-6" }, actividadActual.subtitulo),
                    React.createElement("p", { className: "text-slate-600 leading-relaxed text-sm sm:text-base max-w-4xl" }, actividadActual.descripcion)))),
                React.createElement("div", { className: "max-w-4xl mx-auto mb-10" },
                    React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "Historia y contexto"),
                    React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-5" }, "Antes de ir, quiero contarte por qu\u00E9 vale la pena"),
                    React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed" }, actividadActual.historia)),
                actividadActual.fotoMedia && (React.createElement("div", { className: "my-12 rounded-3xl overflow-hidden " },
                    React.createElement("img", { src: actividadActual.fotoMedia, alt: `${actividadActual.nombre} - experiencia familiar`, className: "w-full h-72 sm:h-[430px] object-cover" }))),
                actividadActual.fotoExtra && (React.createElement("div", { className: "my-12 rounded-3xl overflow-hidden " },
                    React.createElement("img", { src: actividadActual.fotoExtra, alt: `${actividadActual.nombre} - otra mirada de la experiencia`, className: "w-full h-72 sm:h-[430px] object-cover", loading: "lazy" }))),
                React.createElement("div", { className: "bg-white rounded-3xl p-6 sm:p-8 border border-slate-100  mb-8" },
                    React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "La experiencia"),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mt-2 mb-4" }, "Qu\u00E9 vas a vivir aqu\u00ED"),
                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, actividadActual.experiencia)),
                (actividadActual.idealPara || actividadActual.queEncontraras || actividadActual.combinarCon) && (React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5 mb-8" },
                    actividadActual.queEncontraras && React.createElement("div", { className: "bg-teal-50 rounded-3xl p-6 border border-teal-100" },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-700 font-black mb-3" }, "\uD83D\uDC40 Qu\u00E9 vas a encontrar"),
                        React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, actividadActual.queEncontraras)),
                    actividadActual.idealPara && React.createElement("div", { className: "bg-amber-50 rounded-3xl p-6 border border-amber-100" },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-amber-700 font-black mb-3" }, "\u2764\uFE0F Ideal para"),
                        React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, actividadActual.idealPara)),
                    actividadActual.combinarCon && React.createElement("div", { className: "bg-sky-50 rounded-3xl p-6 border border-sky-100" },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-sky-700 font-black mb-3" }, "\uD83D\uDDFA\uFE0F Comb\u00EDnalo con"),
                        React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, actividadActual.combinarCon)))),
                (actividadActual.imperdibles || actividadActual.antesDeIr || actividadActual.planSugerido) && (React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10" },
                    actividadActual.imperdibles && React.createElement("div", { className: "bg-white rounded-3xl p-6 border border-slate-100 " },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-fuchsia-700 font-black mb-3" }, "\u2728 No te vayas sin..."),
                        React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, actividadActual.imperdibles)),
                    actividadActual.antesDeIr && React.createElement("div", { className: "bg-white rounded-3xl p-6 border border-slate-100 " },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-indigo-700 font-black mb-3" }, "\uD83C\uDF92 Antes de ir"),
                        React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, actividadActual.antesDeIr)),
                    actividadActual.planSugerido && React.createElement("div", { className: "bg-white rounded-3xl p-6 border border-slate-100 " },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-emerald-700 font-black mb-3" }, "\uD83E\uDDED C\u00F3mo lo har\u00EDa yo"),
                        React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, actividadActual.planSugerido)))),
                actividadActual.aviso && (React.createElement("div", { className: "bg-red-50 border-2 border-red-200 rounded-3xl p-6 sm:p-8 mb-8" },
                    React.createElement("p", { className: "text-xs uppercase tracking-widest text-red-600 font-black mb-2" }, "\u26A0\uFE0F Informaci\u00F3n importante"),
                    React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed" }, actividadActual.aviso))),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 mb-8" }, [
                    ['📍 Dirección', actividadActual.direccion],
                    ['🕐 Horarios', actividadActual.horario],
                    ['🎟️ Valores', actividadActual.valor],
                    ['👨‍👩‍👧 Edad recomendada', actividadActual.edad],
                    ['⏱️ Duración', actividadActual.duracion],
                    ['📅 Reserva', actividadActual.reserva],
                    ['♿ Accesibilidad', actividadActual.accesibilidad],
                    ['🚇 Cómo llegar', actividadActual.comoLlegar]
                ].map(([titulo, contenido]) => (React.createElement("div", { key: titulo, className: "bg-white rounded-2xl p-6 border border-slate-100 " },
                    React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, titulo),
                    React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, contenido))))),
                React.createElement("div", { className: "bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 mb-8" },
                    React.createElement("div", { className: "flex items-start gap-4" },
                        React.createElement("div", { className: "text-3xl shrink-0" }, "\uD83D\uDCA1"),
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-xs uppercase tracking-widest text-amber-600 font-black mb-2" }, "Consejo de Ernestinho"),
                            React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed" }, actividadActual.consejoErnestinho)))),
                React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8" },
                    React.createElement("p", { className: "text-xs uppercase tracking-widest text-amber-400 font-bold mb-2" }, "\u2B50 Lo m\u00E1s destacado"),
                    React.createElement("p", { className: "font-bold text-lg" }, actividadActual.destaque)),
                actividadActual.servicioErnestinho && (React.createElement("div", { className: "bg-teal-700 text-white rounded-3xl p-6 sm:p-8 mb-8" },
                    React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-200 font-black mb-2" }, "Servicio de Ernestinho"),
                    React.createElement("h2", { className: "text-2xl font-black mb-3" }, "Consulta disponibilidad y modalidades"),
                    React.createElement("p", { className: "text-teal-50 text-sm sm:text-base mb-6" }, "Escr\u00EDbeme para conocer horarios, valores, servicio compartido y opciones privadas con transporte y gu\u00EDa."),
                    React.createElement("a", { href: `https://wa.me/5521969946938?text=${encodeURIComponent(actividadActual.mensajeWhatsApp)}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wide px-6 py-4 rounded-xl transition-all " }, "RESERVAR CON ERNESTINHO"))),
                React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden border border-slate-100  mb-10" },
                    React.createElement("div", { className: "p-6" },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-teal-600 font-black mb-2" }, "Ubicaci\u00F3n"),
                        React.createElement("h2", { className: "text-2xl font-black text-slate-900" }, "Mapa de Google")),
                    React.createElement("div", { className: "w-full h-[350px] sm:h-[450px]" },
                        React.createElement("iframe", { src: actividadActual.mapa, width: "100%", height: "100%", style: { border: 0 }, loading: "lazy", allowFullScreen: true, referrerPolicy: "no-referrer-when-downgrade", title: `Mapa de ${actividadActual.nombre}` }))))))));
}

Object.assign(window,{GuiaSenderos,SeccionEspaciosLiterarios,SeccionCentrosCulturales,SeccionTeatros,SeccionIglesias,SeccionFuertesFortalezas,SeccionFamilia});
})();
