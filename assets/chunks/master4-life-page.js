function Master4LifePage({ kind, go }) {
    const [open, setOpen] = useState(null);
    const configs = {
        gastronomia: { icon: '🍽️', eyebrow: 'COMER EN RÍO', title: '¿Qué tienes ganas de comer?', intro: 'Primero resolvemos tu momento. Después puedes entrar al catálogo completo de restaurantes.', chips: ['Cerca de mí', 'Barato', 'Carioca', 'Vista al mar', 'Boteco', 'Café'], sections: [
                ['ahora', '🍽️', 'Tengo hambre ahora', 'Tres opciones útiles antes que una lista interminable.'],
                ['entender', '🇧🇷', 'Entender el menú', 'PF, executivo, comercial, por quilo, livre y rodízio explicados fácil.'],
                ['boteco', '🍺', 'Vivir un boteco', 'Qué pedir, cómo funciona y por qué es parte de la cultura carioca.'],
                ['clasicos', '⭐', 'Clásicos de Río', 'Lugares históricos y experiencias gastronómicas que vale la pena conocer.'],
                ['cafe', '☕', 'Café y desayuno', 'Padarias, cafeterías y cómo empieza el día en Río.'],
                ['presupuesto', '💰', 'Comer según presupuesto', 'Opciones económicas, medias y especiales sin confundir precio con calidad.']
            ] },
        transportes: { icon: '🚇', eyebrow: 'MOVERTE POR RÍO', title: 'Llegar sin complicarte también es parte del viaje.', intro: 'Elige según dónde estás, a dónde vas, horario, equipaje y compañía.', chips: ['Metro', 'Uber / 99', 'Bus', 'VLT', 'Bici', 'Aeropuerto'], sections: [
                ['metro', '🚇', 'Metro', 'La opción más simple para muchos desplazamientos en Zona Sul y Centro.'],
                ['apps', '🚕', 'Uber y apps', 'Cuándo convienen y qué considerar según horario y punto de recogida.'],
                ['publico', '🚌', 'Buses y transporte público', 'La lógica útil sin llenarte de líneas que pueden cambiar.'],
                ['bici', '🚲', 'Bicicleta', 'Para paseos y desplazamientos cortos cuando la ruta acompaña.'],
                ['aeropuerto', '✈️', 'Aeropuertos', 'GIG y SDU necesitan estrategias distintas.'],
                ['privado', '🚐', 'Traslado Ernestinho', 'Aeropuerto, hotel y viajes privados cuando quieres resolverlo de antemano.']
            ] },
        consejos: { icon: '💡', eyebrow: 'PRIMERA VEZ EN RÍO', title: 'Lo que me gustaría que supieras antes de llegar.', intro: 'Consejos cortos primero. Explicación completa solamente cuando la necesitas.', chips: ['Dinero', 'Seguridad', 'Clima', 'Idioma', 'Costumbres', 'Familia'], sections: [
                ['barrios', '🗺️', 'Río se entiende por barrios', 'No planifiques como si toda la ciudad estuviera a diez minutos.'],
                ['tiempo', '⏱️', 'No llenes todos los días', 'Tráfico, calor y distancias pueden cambiar completamente un itinerario.'],
                ['dinero', '💳', 'Dinero, tarjetas y Pix', 'Qué opciones encontrará un visitante y cómo prepararse.'],
                ['seguridad', '🛡️', 'Seguridad con contexto', 'Decisiones prácticas según lugar y momento, sin convertir Río en una lista de miedos.'],
                ['clima', '☀️', 'Calor, lluvia y playa', 'Tu mejor plan puede cambiar; la guía debe ayudarte a adaptarlo.'],
                ['costumbres', '🇧🇷', 'Entender a los cariocas', 'Palabras, horarios, costumbres y pequeñas diferencias que facilitan el viaje.'],
                ['familia', '👨‍👩‍👧', 'Viajar con niños y familia', 'Ritmo, documentos, calor, distancias y actividades compatibles.'],
                ['enchufes', '🔌', 'Detalles que evitan problemas', 'Tomadas, internet, agua, propinas y otras dudas frecuentes.']
            ] }
    };
    const detalles = {
        ahora: { texto: 'Si estás en Copacabana, usa nuestro buscador por comida, precio y Posto. Si estás en otro barrio, entra al catálogo de gastronomía y filtra por zona. La idea es resolver dónde comer sin cruzar Río por una recomendación.', cta: 'BUSCAR DÓNDE COMER →', ruta: 'master4_copacabana_comer' },
        entender: { texto: 'PF o prato feito suele ser un plato individual completo; executivo/comercial es un menú de almuerzo; por quilo se cobra por el peso; buffet livre tiene precio fijo; rodízio significa servicio continuo de carnes, pizza, sushi u otros productos. Pregunta siempre qué incluye bebidas, postre y servicio.', cta: 'ABRIR GUÍA GASTRONÓMICA →', ruta: 'gastronomia' },
        boteco: { texto: 'Un boteco es parte de la vida de barrio: cerveza fría, petiscos, bolinhos, empadas, caldinho, carne seca o lo que sea especialidad de la casa. Mira primero qué pide la gente alrededor; muchas veces el plato más famoso no aparece como el más llamativo del menú.', cta: 'VER BOTECOS Y CLÁSICOS →', ruta: 'gastronomia' },
        clasicos: { texto: 'Aquí entran lugares históricos, restaurantes tradicionales, comida carioca y experiencias que forman parte de la memoria de la ciudad. No todo clásico es caro y no todo lugar famoso merece desviar medio día: elige por zona y por lo que realmente quieres probar.', cta: 'VER GASTRONOMÍA DE RÍO →', ruta: 'gastronomia' },
        cafe: { texto: 'En Río puedes desayunar en padaria, cafetería de especialidad, hotel o confeitaria histórica. Para algo rápido: café, pão na chapa, pão de queijo, misto y jugo. Para una mañana especial: brunch, Colombo, cafés de Jardim Botânico o espacios con vista.', cta: 'BUSCAR CAFÉS Y DESAYUNOS →', ruta: 'gastronomia' },
        presupuesto: { texto: 'Para ahorrar, busca PF, self-service/quilo, padarias y restaurantes de barrio; en el nivel medio aparecen botecos, italianos, japoneses y restaurantes de playa; para una ocasión especial están rodízios premium, alta cocina, rooftops y experiencias con vista. Mira siempre bebidas y 10% antes de comparar cuentas.', cta: 'COMER SEGÚN MI PRESUPUESTO →', ruta: 'gastronomia' }
    };
    const c = configs[kind];
    if (!c)
        return null;
    return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
        React.createElement("header", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6" },
            React.createElement("button", { onClick: () => go('inicio'), className: "text-xs font-black" }, T("← INICIO")),
            React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white p-7 sm:p-10" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-300" },
                    c.icon,
                    " ",
                    c.eyebrow),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2 max-w-4xl" }, c.title),
                React.createElement("p", { className: "text-sm text-white/70 mt-3 max-w-2xl" }, c.intro),
                React.createElement("div", { className: "flex gap-2 overflow-x-auto mt-6", style: { scrollbarWidth: 'none' } }, c.chips.map(x => React.createElement("span", { key: x, className: "whitespace-nowrap rounded-full bg-white/10 border border-white/10 px-4 py-2 text-[10px] font-black" }, x))))),
        React.createElement("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-6" },
            kind === 'gastronomia' && React.createElement("button", { onClick: () => go('master4_copacabana_comer'), className: "w-full mb-4 rounded-[1.5rem] bg-emerald-700 text-white p-5 text-left" },
                React.createElement("span", { className: "text-[9px] font-black text-emerald-200" }, "\uD83C\uDF7D\uFE0F COPACABANA"),
                React.createElement("b", { className: "block text-lg mt-1" }, "Explorar restaurantes de Copacabana \u2192"),
                React.createElement("span", { className: "block text-xs text-emerald-100 mt-1" }, "Busca por comida, precio y Posto.")),
            React.createElement("div", { className: "space-y-3" }, c.sections.map(x => { var _a, _b; return React.createElement("div", { key: x[0], className: "rounded-[1.7rem] bg-white border overflow-hidden" },
                React.createElement("button", { onClick: () => setOpen(open === x[0] ? null : x[0]), className: "w-full p-5 sm:p-6 flex gap-4 text-left items-center" },
                    React.createElement("span", { className: "w-12 h-12 rounded-2xl bg-slate-100 grid place-items-center text-2xl" }, x[1]),
                    React.createElement("div", { className: "flex-1" },
                        React.createElement("h2", { className: "font-black text-lg" }, x[2]),
                        React.createElement("p", { className: "text-xs text-slate-500 mt-1" }, x[3])),
                    React.createElement("span", null, open === x[0] ? '−' : '＋')),
                open === x[0] && React.createElement("div", { className: "border-t bg-slate-50 p-5 sm:p-6" },
                    React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed" }, kind === 'gastronomia' ? (((_a = detalles[x[0]]) === null || _a === void 0 ? void 0 : _a.texto) || x[3]) : kind === 'transportes' ? 'Abre la guía de transportes para comparar las alternativas que ya tenemos cargadas según tu recorrido, horario y equipaje.' : 'Este consejo está conectado con la Guía de Río, donde reunimos la información práctica antes y durante el viaje.'),
                    React.createElement("div", { className: "flex flex-wrap gap-2 mt-4" },
                        React.createElement("button", { onClick: () => { var _a; return go(kind === 'gastronomia' ? (((_a = detalles[x[0]]) === null || _a === void 0 ? void 0 : _a.ruta) || 'gastronomia') : kind === 'transportes' ? 'transportes' : 'guia'); }, className: "rounded-full bg-slate-950 text-white px-4 py-3 text-[10px] font-black" }, kind === 'gastronomia' ? (((_b = detalles[x[0]]) === null || _b === void 0 ? void 0 : _b.cta) || 'VER INFORMACIÓN →') : 'VER INFORMACIÓN COMPLETA →'),
                        React.createElement("button", { onClick: () => go('master4_para_mi'), className: "rounded-full bg-white border px-4 py-3 text-[10px] font-black" }, "\u2661 GUARDAR EN MI R\u00CDO")))); }))));
}

// const BARRIOS_BETA23_B64 externalizado en data-core.js
window.Master4LifePage=Master4LifePage;
