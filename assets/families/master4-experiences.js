// deploy-version: experiencias-canonical-20260922-8-force
function Master4Experiences({ go, lang = 'es' }) {
    const T = (v) => { if (v == null) return v; if (typeof v === 'object' && !Array.isArray(v)) return v[lang] || v.es || v.pt || v.en || v; const z=String(v), g=(window.GLOBAL_UI_TRANSLATIONS&&window.GLOBAL_UI_TRANSLATIONS[lang])||{}; return lang==='es'?z:(g[z]||z); };
    const existentes = [...EXPERIENCIAS_DATA.map(exp => ({ ...exp, imagen: exp.portadaExperiencias || exp.imagen, miniatura: exp.portadaExperiencias || exp.imagen, intro: exp.descripcion, origen: 'tour' })), ...ACTIVIDADES_NUEVAS.map(exp => ({ ...exp, imagen: exp.portadaExperiencias || exp.miniatura, miniatura: exp.portadaExperiencias || exp.miniatura, descripcion: exp.intro, origen: 'actividad' }))];
    const norm = t => (t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const busca = (...terms) => existentes.find(e => terms.some(t => norm(e.titulo).includes(norm(t))));
    const extra = (id, titulo, descripcion, grupo, imagen, estado = 'Consultar', url = null) => ({ id, titulo, descripcion, grupo, imagen, miniatura: imagen, precio: estado, extra: true, url });
    const extras = [
        extra('rio-samba-tour', 'Rio Samba Bus', 'City Tour Panorámico Musical Hop-on Hop-off: más de 30 puntos, audioguía, música, Wi-Fi y libertad para subir y bajar. Reserva con el enlace afiliado oficial de Ernestinho Carioca.', 'Imperdibles', 'https://res.cloudinary.com/qa301cbc/image/upload/v1789836096/EXPERIENCIA_PORTADA_RIO_SAMBA_BUS.png', 'SOCIO AFILIADO · RESERVA ONLINE', 'https://riosambabus.com.br/?ref=4ENbPFm3Mb'),
        extra('carnaval-experience', 'Carnaval Experience', 'Entra al barracón de Acadêmicos do Grande Rio: historia, fantasías, samba, bastidores y caipirinha. Ernestinho Carioca es socio oficial y nuestro enlace entrega 5% de descuento.', 'Imperdibles', 'https://res.cloudinary.com/qa301cbc/image/upload/v1789832214/EXPERIENCIA_PORTADA_CARNVAL_EXP.png', 'SOCIO OFICIAL · 5% DESCUENTO'),
        extra('ala-delta', 'Ala delta', 'Vuelo libre sobre Río. Estamos preparando la ficha completa, condiciones, fotos y reserva.', 'Deportes extremos', 'https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3058', 'PRÓXIMAMENTE'),
        extra('santa-marta-tour', 'Favela Santa Marta', 'Recorrido responsable por una de las comunidades más conocidas de la Zona Sur. Prepararemos la ficha completa antes de publicarla como experiencia cerrada.', 'Walking y favela tour', 'https://res.cloudinary.com/qa301cbc/image/upload/v1789042789/portada_favela_santa_marta_tour.png', 'CONSULTAR'),
        extra('vidigal-tour', 'Favela Vidigal', 'Recorrido por Vidigal con contexto local y vistas de la Zona Sur. Ficha y operador a confirmar antes de activar la venta.', 'Walking y favela tour', 'https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3058', 'CONSULTAR'),
        extra('pequena-africa', 'Pequeña África', 'Walking tour por la memoria afrobrasileña de la Zona Portuaria: Cais do Valongo, Pedra do Sal, Largo de São Francisco da Prainha y entorno.', 'Walking y favela tour', 'https://res.cloudinary.com/qa301cbc/image/upload/v1789043644/pedra-do-sal-pequena-africa.jpg', 'CONSULTAR'),
        extra('bioparque-meio-dia', 'BioParque', 'Actividad de medio día para familias, combinable con otras zonas según horario y transporte.', 'Tours de medio día', 'https://res.cloudinary.com/qa301cbc/image/upload/v1788783421/bioparque_234.jpg', 'CONSULTAR')
    ];
    const groups = [
        { name: 'Imperdibles', icon: '⭐', items: [busca('full day rio'), extras[0], extras[1], busca('cristo + city'), busca('arraial'), busca('angra'), busca('buzios')].filter(Boolean) },
        { name: 'Deportes extremos', icon: '🪂', items: [busca('parapente'), busca('parasail'), busca('paracaidas', 'paracaídas'), extras[2]].filter(Boolean) },
        { name: 'Walking y favela tour', icon: '🚶', items: [busca('favela rocinha'), extras[3], extras[4], extras[5]].filter(Boolean) },
        { name: 'Trekking', icon: '🥾', items: [busca('pedra do telegrafo', 'pedra do telégrafo'), busca('pedra bonita'), busca('morro dois irmaos', 'morro dois irmãos')].filter(Boolean) },
        { name: 'VIP', icon: '💎', items: [busca('helicoptero', 'helicóptero'), busca('lancha privada')].filter(Boolean) },
        { name: 'Tours de medio día', icon: '🕐', items: [busca('maracana experience', 'maracanã experience'), busca('aquario + boulevard', 'aquário + boulevard'), extras[6]].filter(Boolean) }
    ];
    const ver = (exp) => { if (exp.id === 'rio-samba-tour')
        return go('partner_rio_samba'); if (exp.id === 'carnaval-experience')
        return go('partner_carnaval'); if (exp.url) {
        window.open(exp.url, '_blank');
        return;
    } if (exp.extra) {
        window.open(`https://wa.me/5521969946938?text=${encodeURIComponent('Hola Ernestinho, quiero información sobre: ' + exp.titulo)}`, '_blank');
        return;
    } if (exp.id === 'exp-1')
        return go('full_day_rio'); if (exp.id === 'exp-2')
        return go('buzios'); if (exp.id === 'exp-3')
        return go('detalle_exp-3'); if (exp.id === 'exp-4')
        return go('detalle_exp-4'); if (exp.id === 'exp-5')
        return go('detalle_exp-5'); return go(`actividad_${exp.id}`); };
    return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
        React.createElement("header", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6" },
            React.createElement("button", { onClick: () => go('inicio'), className: "text-xs font-black" }, T("← INICIO")),
            React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white p-7 sm:p-10" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-300" }, T("✨ EXPERIENCIAS ERNESTINHO")),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2" }, T("Si quieres pasar de descubrir Río a vivirlo.")),
                React.createElement("p", { className: "text-sm text-white/70 mt-4 max-w-3xl leading-relaxed" }, T("Vive Río de la mano de un equipo apasionado por mostrarte lo mejor de la Ciudad Maravillosa. Junto a mi equipo de guías y operadores locales, te ayudamos a transformar el viaje en experiencias que realmente vas a recordar.")))),
        React.createElement("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-7 space-y-10" }, groups.map(g => React.createElement("section", { key: g.name },
            React.createElement("div", { className: "flex items-end justify-between gap-4 mb-4" },
                React.createElement("div", null,
                    React.createElement("span", { className: "text-2xl" }, g.icon),
                    React.createElement("h2", { className: "text-2xl sm:text-3xl font-black mt-1" }, T(g.name))),
                React.createElement("span", { className: "text-[10px] font-black text-slate-400" },
                    g.items.length,
                    T(" OPCIONES"))),
            React.createElement("div", { className: "grid md:grid-cols-2 xl:grid-cols-3 gap-4" }, g.items.map(exp => React.createElement("article", { key: exp.id, className: "bg-white rounded-[1.8rem] overflow-hidden border  flex flex-col" },
                React.createElement("div", { className: "relative aspect-[4/3] bg-slate-200 overflow-hidden" },
                    React.createElement("img", { src: exp.imagen || exp.miniatura, alt: T(exp.titulo), className: "w-full h-full object-cover" }),
                    React.createElement("span", { className: "absolute top-3 right-3 bg-amber-300 text-slate-950 rounded-full px-3 py-2 text-[10px] font-black" }, T(exp.precio || 'CONSULTAR'))),
                React.createElement("div", { className: "p-5 flex flex-col flex-1" },
                    React.createElement("h3", { className: "text-xl font-black" }, T(exp.titulo)),
                    React.createElement("p", { className: "text-xs text-slate-500 mt-2 leading-relaxed" }, T(exp.descripcion || exp.intro)),
                    exp.id === 'rio-samba-tour' && React.createElement("span", { className: "mt-3 inline-flex self-start rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-[9px] font-black" }, T("AFILIADO OFICIAL")),
                    exp.id === 'carnaval-experience' && React.createElement("span", { className: "mt-3 inline-flex self-start rounded-full bg-fuchsia-100 text-fuchsia-800 px-3 py-1 text-[9px] font-black" }, T("SOCIO OFICIAL · 5% DESCUENTO")),
                    React.createElement("button", { onClick: () => ver(exp), className: "mt-auto pt-4" },
                        React.createElement("span", { className: "block w-full rounded-xl bg-slate-950 text-white py-3 text-xs font-black" }, exp.id === 'carnaval-experience' ? T('COMPRAR CON DESCUENTO →') : exp.url ? T('COMPRAR / VER →') : exp.extra ? T('CONSULTAR →') : T('VER EXPERIENCIA →')))))))))));
}
window.Master4Experiences=Master4Experiences;
