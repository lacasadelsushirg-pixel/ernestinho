

// COMPRAS_FICHAS externalizado en data/compras-manifest.json

var __compraOverlay=null;
function closeCompraFicha(){if(__compraOverlay){__compraOverlay.remove();__compraOverlay=null;}if(window.location.hash==="#compras-ficha")history.replaceState(null,"",window.location.pathname+window.location.search);window.scrollTo(0,window.__comprasScrollY||0);}
window.addEventListener("message",function(e){if(e&&e.data&&e.data.type==="ernestinho-close-compra")closeCompraFicha();});
function openCompraFicha(file){if(!file)return;window.__comprasScrollY=window.scrollY;__compraOverlay=document.createElement("div");__compraOverlay.id="ernestinhoCompraOverlay";__compraOverlay.style.cssText="position:fixed;inset:0;z-index:99999;background:#f8fafc;";var close=document.createElement("button");close.type="button";close.textContent="← VOLVER A COMPRAS";close.style.cssText="position:absolute;top:14px;left:14px;z-index:100001;background:#0b2528;color:#fff;border:0;border-radius:999px;padding:12px 16px;font:800 12px Arial;box-shadow:none!important;cursor:pointer;";close.onclick=closeCompraFicha;var frame=document.createElement("iframe");frame.title="Guía completa";frame.src="/compras/"+encodeURIComponent(file);frame.style.cssText="width:100%;height:100%;border:0;background:#f8fafc;";frame.setAttribute("allowfullscreen","");__compraOverlay.appendChild(frame);__compraOverlay.appendChild(close);document.body.appendChild(__compraOverlay);history.replaceState({comprasFicha:true},"",window.location.pathname+window.location.search+"#compras-ficha");}
function CompraCard(x){var image=React.createElement("div",{key:"img",className:"h-56 sm:h-64 overflow-hidden bg-slate-200"},React.createElement("img",{src:x.img,alt:x.name,className:"w-full h-full object-cover",loading:"lazy"}));var zone=React.createElement("div",{key:"z",className:"text-xs font-black uppercase tracking-widest text-teal-700"},x.zone);var name=React.createElement("h3",{key:"n",className:"text-2xl sm:text-3xl font-black text-slate-900 mt-2"},x.name);var desc=React.createElement("p",{key:"d",className:"text-slate-600 mt-2 leading-relaxed"},x.desc);var button=React.createElement("button",{key:"b",type:"button",onClick:function(){openCompraFicha(x.file)},className:"mt-5 inline-flex items-center justify-center bg-slate-950 hover:bg-teal-700 text-white font-black text-xs uppercase rounded-xl px-5 py-3 transition-colors"},"ABRIR GUÍA COMPLETA →");var body=React.createElement("div",{key:"body",className:"p-5 sm:p-6"},[zone,name,desc,button]);return React.createElement("article",{key:x.file,className:"bg-white rounded-3xl overflow-hidden border border-slate-200 "},[image,body]);}
function CompraGroup(title,subtitle,quote,items,accent){var headText=React.createElement("div",{key:"txt"},[React.createElement("span",{key:"s",className:"text-amber-300 font-black text-xs uppercase tracking-widest"},"Guía editorial de Ernestinho"),React.createElement("h2",{key:"h",className:"text-3xl sm:text-5xl font-black text-white mt-2"},title),React.createElement("p",{key:"p",className:"text-slate-200 mt-3 max-w-2xl leading-relaxed"},subtitle)]);var count=React.createElement("span",{key:"count",className:"bg-white/15 text-white px-3 py-1.5 rounded-full text-xs font-black"},items.length+" guías");var head=React.createElement("div",{key:"head",className:"rounded-[2rem] p-6 sm:p-8 mb-6 "+accent},[React.createElement("div",{key:"wrap",className:"flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"},[headText,count])]);var grid=React.createElement("div",{key:"grid",className:"grid grid-cols-1 lg:grid-cols-2 gap-7"},items.map(CompraCard));var quoteEl=React.createElement("p",{key:"quote",className:"mt-5 text-sm italic text-slate-600 max-w-3xl"},quote);return React.createElement("section",{className:"mb-14"},[head,grid,quoteEl]);}
function ComprasCompletas(){const intro=React.createElement("div",{className:"text-center max-w-4xl mx-auto mb-12"},[React.createElement("span",{key:"s",className:"text-amber-500 font-black text-xs uppercase tracking-widest"},"Compras de Ernestinho Carioca"),React.createElement("h1",{key:"h",className:"text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2"},"Shoppings, ferias y mercados de Río"),React.createElement("p",{key:"p",className:"text-slate-600 text-base sm:text-lg mt-4"},"Yo te acompaño a descubrir cada lugar con una guía completa, personal y práctica.")]);const groups=[CompraGroup("SHOPPINGS DE RÍO","Yo te ayudo a elegir dónde comprar según tu viaje, tu zona y el tiempo que tengas.","Yo los recomiendo cuando quieres resolver compras, comer con comodidad o aprovechar un día de lluvia.",((window.COMPRAS_CARDS&&window.COMPRAS_CARDS['Shoppings'])||[]),"bg-slate-950"),CompraGroup("FERIAS, ARTESANÍA Y CULTURA CARIOCA","Lugares donde Río se encuentra, vende, conversa y muestra su lado más creativo.","Para mí, una feria no se visita solamente para comprar: también se visita para mirar, conversar y entender el barrio.",((window.COMPRAS_CARDS&&window.COMPRAS_CARDS['Ferias'])||[]),"bg-teal-800"),CompraGroup("MERCADOS POPULARES Y COMERCIO REAL","Para conocer el Río cotidiano, sus productos, sus calles y la vida comercial de sus barrios.","Si quieres conocer un Río más cotidiano, yo empezaría por estos mercados y dejaría que la ciudad te muestre su ritmo.",((window.COMPRAS_CARDS&&window.COMPRAS_CARDS['Mercados populares'])||[]),"bg-slate-900")];return React.createElement("section",{className:"py-12 bg-slate-50 min-h-screen"},React.createElement("div",{className:"max-w-7xl mx-auto px-4 sm:px-6"},[intro].concat(groups)))}
const { useState, useEffect } = React;
const __EC_CULTURE_SECTIONS = new Set(['museos','familia','teatros','iglesias','master4_museos_real','master4_teatros_real','master4_iglesias_real']);
let __ecCultureDataPromise = null;
function __ecEnsureCultureData(){
    if (window.MUSEOS_DATA && window.TEATROS_DATA && window.IGLESIAS_DATA && window.FAMILIA_DATA && window.MASTER4_MUSEOS_REAL) return Promise.resolve();
    if (__ecCultureDataPromise) return __ecCultureDataPromise;
    const files=['museos','teatros','iglesias','familia','museos-real'];
    __ecCultureDataPromise=Promise.all(files.map(n=>new Promise((resolve,reject)=>{const sc=document.createElement('script');sc.src='/assets/culture/'+n+'.js?v=20260923';sc.async=true;sc.onload=resolve;sc.onerror=reject;document.head.appendChild(sc)}))).catch(e=>{__ecCultureDataPromise=null;throw e});
    return __ecCultureDataPromise;
}

// --- COMPONENTE DE ÍCONO AUXILIAR LIGERO ---
const Icon = ({ name, className = "w-5 h-5", fill = "none" }) => {
    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [name]);
    return React.createElement("i", { "data-lucide": name, className: className, style: { fill: fill !== 'none' ? fill : 'transparent' } });
};
// --- DATOS MUESTRA Y CONTENIDOS COMPLETOS ---

// Datos editoriales pesados (gastronomía, vida nocturna, barrios y experiencias)
// externalizados para mantener el runtime principal por debajo de 250 KB.
const __ecEditorialData = window.EC_EDITORIAL_DATA || {};
const FOTOS_GASTRONOMIA = __ecEditorialData.FOTOS_GASTRONOMIA || [];
const GASTRONOMIA_DATA = [...(window.GASTRONOMIA_BASE||[]), ...(window.GASTRONOMIA_EXTRA||[])].map((item, index) => ({
    ...item,
    img: item.img || FOTOS_GASTRONOMIA[index % Math.max(FOTOS_GASTRONOMIA.length,1)],
    mapa: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.nombre + ' ' + item.barrio + ' Rio de Janeiro')}`,
    horario: 'Los horarios pueden cambiar. Confirma el día de tu visita en el mapa oficial.'
}));
const DIAS_NOCHE = __ecEditorialData.DIAS_NOCHE || [];
const TIPOS_NOCHE = __ecEditorialData.TIPOS_NOCHE || [];
const VIDA_NOCTURNA_DATA = __ecEditorialData.VIDA_NOCTURNA_DATA || [];
const FOTOS_NOCHE_APOYO = __ecEditorialData.FOTOS_NOCHE_APOYO || [];
const VIDA_NOCTURNA_CON_FOTOS = VIDA_NOCTURNA_DATA.map((item, index) => ({ ...item,
    img: (window.FOTOS_VIDA_NOCTURNA||{})[item.id] || FOTOS_NOCHE_APOYO[index % Math.max(FOTOS_NOCHE_APOYO.length,1)],
    mapa: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.nombre + ' ' + item.barrio + ' Rio de Janeiro')}`
}));
const BARRIOS_DATA = __ecEditorialData.BARRIOS_DATA || [];
const EXPERIENCIAS_DATA = __ecEditorialData.EXPERIENCIAS_DATA || [];
const ACTIVIDADES_NUEVAS = Array.isArray(window.ACTIVIDADES_NUEVAS) ? window.ACTIVIDADES_NUEVAS : [];

// TRANSCARIOCA_TRECHOS externalizado a JSON

// Orden editorial temporal: pensado para un turista que descubre Rio. No pretende ser un ranking estadistico.
const RUTAS_RIO_ORDEN = ['01', '25', '19', '21', '15', '18', '13', '12', '11', '17', '20', '24', '23', '16', '02', '06', '05', '07', '08', '03', '04', '09', '14', '26'];

// SENDEROS_RIO externalizado a JSON

// ===== NATURALEZA URBANA · PARQUES Y JARDINES DESTACADOS =====
// PARQUES_NATURALEZA_DESTACADOS externalizado a JSON

function GuiaSenderos(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/culture-sections.js?v=20260923',name:'GuiaSenderos',componentProps:props})}
function ActividadNuevaDetalle(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/ActividadNuevaDetalle.js?v=20260922',name:'ActividadNuevaDetalle',componentProps:props})}
function SeccionEspaciosLiterarios(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/culture-sections.js?v=20260923',name:'SeccionEspaciosLiterarios',componentProps:props})}
function SeccionCentrosCulturales(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/culture-sections.js?v=20260923',name:'SeccionCentrosCulturales',componentProps:props})}
function SeccionTeatros(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/culture-sections.js?v=20260923',name:'SeccionTeatros',componentProps:props})}
function SeccionIglesias(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/culture-sections.js?v=20260923',name:'SeccionIglesias',componentProps:props})}
function SeccionFuertesFortalezas(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/culture-sections.js?v=20260923',name:'SeccionFuertesFortalezas',componentProps:props})}
function SeccionFamilia(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/culture-sections.js?v=20260923',name:'SeccionFamilia',componentProps:props})}
function VidaNocturnaCompleta(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/VidaNocturnaCompleta.js?v=20260922',name:'VidaNocturnaCompleta',componentProps:props})}
function GuiaPix(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/GuiaPix.js?v=20260922',name:'GuiaPix',componentProps:props})}
const pFoto = (id, nombre, zona, tipo, mejorHora, consejo, acceso = 'Gratis') => ({ id, nombre, zona, tipo, mejorHora, consejo, acceso });

const FOTOGRAFIA_DATA = [
    pFoto('arpoador', 'Pedra do Arpoador', 'Zona Sur', 'Atardecer', '45 minutos antes del ocaso', 'Usa Dois Irmãos como fondo y quédate hasta la hora azul.'),
    pFoto('dona-marta', 'Mirante Dona Marta', 'Santa Teresa', 'Postal', 'Amanecer', 'Encuadra el Pan de Azúcar y el Cristo desde los dos niveles del mirador.'),
    pFoto('pao-acucar', 'Pan de Azúcar', 'Urca', 'Atardecer', 'Últimas dos horas de luz', 'Sube con anticipación y fotografía la ciudad mientras cambia la luz.', 'Entrada pagada'),
    pFoto('cristo', 'Cristo Redentor', 'Cosme Velho', 'Postal', 'Primera entrada de la mañana', 'Gran angular para incluir el monumento; luego busca la vista desde los laterales.', 'Entrada pagada'),
    pFoto('parque-lage', 'Parque Lage', 'Jardim Botânico', 'Arquitectura', 'Mañana', 'Desde el patio alinea la piscina, los arcos y el Cristo.'),
    pFoto('selaron', 'Escadaria Selarón', 'Lapa', 'Urbana', 'Antes de las 9:00', 'Llega temprano para encontrar menos público y colores uniformes.'),
    pFoto('mureta-urca', 'Mureta da Urca', 'Urca', 'Atardecer', 'Hora dorada', 'Incluye barcos y reflejos de la bahía; protege el celular junto al borde.'),
    pFoto('praia-vermelha', 'Praia Vermelha', 'Urca', 'Amanecer', 'Amanecer', 'Fotografía las primeras luces entre el mar y las montañas.'),
    pFoto('leblon', 'Mirante do Leblon', 'Leblon', 'Atardecer', 'Hora dorada', 'Usa el contorno de Ipanema, Arpoador y el mar como líneas de fuga.'),
    pFoto('dois-irmaos', 'Morro Dois Irmãos', 'Vidigal', 'Amanecer', 'Amanecer con guía', 'Vista aérea de Ipanema, Lagoa y São Conrado; no hagas el sendero solo.'),
    pFoto('telegrafo', 'Pedra do Telégrafo', 'Guaratiba', 'Naturaleza', 'Mañana temprano', 'El ángulo lateral crea la ilusión de altura; respeta la fila y el entorno.'),
    pFoto('bonita', 'Pedra Bonita', 'São Conrado', 'Naturaleza', 'Mañana', 'Gran panorámica de Pedra da Gávea, Barra y São Conrado.'),
    pFoto('vista-chinesa', 'Vista Chinesa', 'Alto da Boa Vista', 'Postal', 'Mañana despejada', 'Enmarca la ciudad con la estructura oriental del mirador.'),
    pFoto('mesa-imperador', 'Mesa do Imperador', 'Alto da Boa Vista', 'Naturaleza', 'Mañana', 'Ideal para retratos rodeados por Mata Atlántica.'),
    pFoto('cascatinha', 'Cascatinha Taunay', 'Alto da Boa Vista', 'Naturaleza', 'Día nublado', 'Una velocidad más lenta suaviza el agua; evita piedras mojadas.'),
    pFoto('maua', 'Praça Mauá y Museu do Amanhã', 'Centro', 'Arquitectura', 'Amanecer o hora azul', 'Busca reflejos y simetrías en la fachada y el espejo de agua.'),
    pFoto('etnias', 'Mural Etnias', 'Zona Portuaria', 'Urbana', 'Mañana', 'Aléjate para mostrar la escala del mural o usa cada rostro como fondo.'),
    pFoto('gabinete', 'Real Gabinete Português', 'Centro', 'Arquitectura', 'Horario de apertura', 'Fotografía centrada desde la entrada y respeta las áreas restringidas.'),
    pFoto('colombo', 'Confeitaria Colombo', 'Centro', 'Arquitectura', 'Primera hora abierta', 'Usa espejos y vitrales para capturar la profundidad del salón.'),
    pFoto('municipal', 'Theatro Municipal', 'Centro', 'Arquitectura', 'Hora azul', 'Desde Cinelândia combina fachada iluminada y movimiento de la plaza.'),
    pFoto('catedral', 'Catedral Metropolitana', 'Centro', 'Arquitectura', 'Mediodía', 'La luz atraviesa los vitrales; prueba una toma vertical desde el centro.'),
    pFoto('lapa-arcos', 'Arcos da Lapa', 'Lapa', 'Nocturna', 'Hora azul', 'Fotografía desde espacios concurridos y evita exhibir equipo en calles vacías.'),
    pFoto('santa-teresa', 'Bonde de Santa Teresa', 'Santa Teresa', 'Urbana', 'Mañana', 'Incluye calles, rieles y casonas; nunca invadas la vía.', 'Pasaje pagado'),
    pFoto('ruinas', 'Parque das Ruínas', 'Santa Teresa', 'Atardecer', 'Final de la tarde', 'Combina los arcos del edificio con el Centro y la bahía.'),
    pFoto('botafogo', 'Enseada de Botafogo', 'Botafogo', 'Postal', 'Amanecer', 'Usa los barcos como primer plano y el Pan de Azúcar al fondo.'),
    pFoto('aterro', 'Aterro do Flamengo', 'Flamengo', 'Amanecer', 'Amanecer', 'Palmeras, ciclovía y bahía crean profundidad; aprovecha domingos activos.'),
    pFoto('ipanema', 'Posto 9 Ipanema', 'Ipanema', 'Atardecer', 'Hora dorada', 'Siluetas deportivas con Dois Irmãos y cielo cálido.'),
    pFoto('copa', 'Calçadão de Copacabana', 'Copacabana', 'Urbana', 'Amanecer', 'Agáchate para destacar el mosaico y usa los edificios como perspectiva.'),
    pFoto('forte-copa', 'Forte de Copacabana', 'Copacabana', 'Postal', 'Mañana', 'Desde la punta captura toda la curva de Copacabana.', 'Entrada pagada'),
    pFoto('joatinga', 'Praia da Joatinga', 'Joá', 'Naturaleza', 'Marea baja por la mañana', 'Comprueba la marea: la franja de arena puede desaparecer.'),
    pFoto('grumari', 'Praia de Grumari', 'Zona Oeste', 'Naturaleza', 'Mañana', 'Paisaje de playa salvaje; evita dejar objetos visibles en el automóvil.'),
    pFoto('secreto', 'Mirante do Roncador', 'Prainha', 'Atardecer', 'Final de la tarde', 'Fotografía las curvas de la costa desde áreas permitidas.'),
    pFoto('gigoia', 'Ilha da Gigóia', 'Barra', 'Urbana', 'Mañana o atardecer', 'Casas, canales, barcos y fauna; pide permiso antes de retratar residentes.', 'Barco pagado'),
    pFoto('niteroi', 'MAC Niterói', 'Niterói', 'Arquitectura', 'Atardecer', 'Usa las curvas del museo para enmarcar Río al otro lado de la bahía.', 'Exterior gratis'),
    pFoto('santa-cruz', 'Fortaleza de Santa Cruz', 'Niterói', 'Arquitectura', 'Tarde', 'Arcos, murallas y Pan de Azúcar alineados desde la fortaleza.', 'Entrada pagada')
].map(x => ({ ...x, mapa: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(x.nombre + ' Rio de Janeiro')}`, img: FOTO_RIO_URLS[x.id] }));
function GuiaFotografia(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/GuiaFotografia.js?v=20260922',name:'GuiaFotografia',componentProps:props})}
const GUIA_TEMAS = [
    { id: 'documentos', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040451/miniaturas_guia_rio_documentos_y_entrada.png', grupo: 'Antes de viajar', icon: '🛂', titulo: 'Documentos y entrada', resumen: 'Identidad, pasaporte y visa.' },
    { id: 'menores', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040459/miniaturas_guia_rio_viajando_en_familia.png', grupo: 'Antes de viajar', icon: '👨‍👩‍👧', titulo: 'Viajar con menores', resumen: 'Autorizaciones y filiación.' },
    { id: 'permanencia', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040457/miniaturas_guia_rio_permanencia_y_extension.png', grupo: 'Antes de viajar', icon: '📅', titulo: 'Permanencia y extensión', resumen: 'Plazos y Policía Federal.' },
    { id: 'seguro', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040457/miniaturas_guia_rio_seguro_y_salud.png', grupo: 'Antes de viajar', icon: '🩺', titulo: 'Seguro y salud', resumen: 'Coberturas, SUS y urgencias.' },
    { id: 'vacunas', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040459/miniaturas_guia_rio_vacunas.png', grupo: 'Antes de viajar', icon: '💉', titulo: 'Vacunas y fiebre amarilla', resumen: 'Qué revisar antes de viajar y dónde confirmar recomendaciones.' },
    { id: 'dinero', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040451/miniaturas_guia_rio_dinero_y_presupuesto.png', grupo: 'Dinero y conexión', icon: '💰', titulo: 'Dinero y presupuesto', resumen: 'Efectivo, tarjetas y cambio.' },
    { id: 'pix', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040461/miniaturas_guia_rio_pix.png', grupo: 'Dinero y conexión', icon: '◈', titulo: 'Guía completa de Pix', resumen: 'Pagos, turistas y seguridad.', sec: 'pix' },
    { id: 'internet', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040454/miniaturas_guia_rio_internet_y_chip.png', grupo: 'Dinero y conexión', icon: '📶', titulo: 'Internet, chip y eSIM', resumen: 'Conexión desde la llegada.' },
    { id: 'apps', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040450/miniaturas_guia_rio_aplicaciones.png', grupo: 'Dinero y conexión', icon: '📱', titulo: 'Aplicaciones recomendadas', resumen: 'Transporte, mapas, clima y comida.' },
    { id: 'aeropuertos', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040449/miniaturas_guia_rio_aeropuertos_gig_y_sdu.png', grupo: 'Llegada y movilidad', icon: '✈️', titulo: 'Aeropuertos GIG y SDU', resumen: 'Llegada, transporte y encuentro.' },
    { id: 'terminales', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040456/miniaturas_guia_rio_rodoviaria_y_barcas.png', grupo: 'Llegada y movilidad', icon: '🧳', titulo: 'Rodoviária y puerto', resumen: 'Novo Rio, Pier Mauá y equipaje.' },
    { id: 'moverse', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040451/miniaturas_guia_rio_como_moverse.png', grupo: 'Llegada y movilidad', icon: '🚇', titulo: 'Cómo moverse', resumen: 'Metro, VLT, BRT, trenes, autobuses y barcas.', sec: 'transporte_publico' },
    { id: 'alquiler-auto', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789052363/miniaturas_guia_rio_alquiler_de_vehiculos.png', grupo: 'Llegada y movilidad', icon: '🚗', titulo: 'Alquiler de auto en Río y Brasil', resumen: 'Cuándo conviene, documentos, seguros, peajes y comparador Rentcars.' },
    { id: 'emergencias', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040457/miniaturas_guia_rio_seguro_y_salud.png', grupo: 'Durante el viaje', icon: '🆘', titulo: 'Salud y emergencias', resumen: 'UPA, hospitales, pérdidas y teléfonos.' },
    { id: 'consulados', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040451/miniaturas_guia_rio_consulado.png', grupo: 'Durante el viaje', icon: '🏛️', titulo: 'Consulados y documentos', resumen: 'Ayuda consular, pérdidas y contactos oficiales.' },
    { id: 'accesibilidad', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040448/miniaturas_guia_rio_accesibilidad.png', grupo: 'Durante el viaje', icon: '♿', titulo: 'Accesibilidad', resumen: 'Adultos mayores, PCD y descuentos.' },
    { id: 'hospedaje', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040451/miniaturas_guia_rio_donde_alojarse.png', grupo: 'Organiza tu estadía', icon: '🏠', titulo: 'Dónde alojarse en Río', resumen: 'Barrios, apartamentos Ernestinho y hoteles.', sec: 'hospedaje' },
    { id: 'maleta', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040449/miniaturas_guia_rio_armando_las_maletas.png', grupo: 'Organiza tu estadía', icon: '🧳', titulo: 'Maleta y clima', resumen: 'Ropa, lluvia y preparación.', legacy: 2 },
    { id: 'electricidad', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040458/miniaturas_guia_rio_enchufes_y_voltaje.png', grupo: 'Organiza tu estadía', icon: '🔌', titulo: 'Enchufes y voltaje', resumen: 'Adaptadores y electricidad.', legacy: 1 },
    { id: 'mes-a-mes-guia', imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789040461/miniaturas_guia_rio_mes_a_mes.png', grupo: 'Planifica según la época', icon: '🗓️', titulo: 'Río mes a mes', resumen: 'Clima, temporada, eventos y qué esperar en cada mes.', sec: 'rio_mes_a_mes' }
];
// GUIA_INFO externalizado a JSON

function GuiaRioCompleta(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/GuiaRioCompleta.js?v=20260922',name:'GuiaRioCompleta',componentProps:props,dataUrls:["/data/consejos-viaje-lazy52.json"]})}
function ConsejosErnestinho(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/ConsejosErnestinho.js?v=20260922',name:'ConsejosErnestinho',componentProps:props,dataUrls:["/data/consejos-viaje-lazy52.json","/data/explorar-lazy.json","/data/transporte-lazy52.json","/data/viaje-consejos-extra-lazy52.json"]})}
function GuiaTransportePublico(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/GuiaTransportePublico.js?v=20260922',name:'GuiaTransportePublico',componentProps:props,dataUrls:["/data/explorar-lazy.json","/data/transporte-lazy52.json"]})}
const COPA_POSITIONS = {
    posto2: { label: 'Posto 2 / Lido', lat: -22.9655, lng: -43.1762 },
    posto3: { label: 'Posto 3', lat: -22.9687, lng: -43.1804 },
    posto4: { label: 'Posto 4', lat: -22.9730, lng: -43.1837 },
    posto5: { label: 'Posto 5', lat: -22.9770, lng: -43.1870 },
    posto6: { label: 'Posto 6', lat: -22.9830, lng: -43.1890 }
};

const COPA_SUBINTENT_LABELS = {
    coffee: '☕ Café', breakfast: '🥐 Desayuno', drink: '🍹 Bebida / boteco', budget_lunch: '💰 Comer barato', self_service: '🍛 Self-service', meat: '🥩 Carne', dinner: '🌙 Cena', bakery: '🥐 Padaria / confeitaria',
    pharmacy: '💊 Farmacia', supermarket: '🛒 Supermercado', metro: '🚇 Metro'
};
const COPA_WEATHER_API = {
    provider: 'Open-Meteo',
    latitude: -22.9711,
    longitude: -43.1850,
    timezone: 'America/Sao_Paulo'
};
function copaWeatherCodeLabel(code) {
    const c = Number(code);
    if (c === 0)
        return 'Cielo despejado';
    if ([1, 2].includes(c))
        return 'Parcialmente nublado';
    if (c === 3)
        return 'Nublado';
    if ([45, 48].includes(c))
        return 'Niebla';
    if ([51, 53, 55, 56, 57].includes(c))
        return 'Llovizna';
    if ([61, 63, 65, 66, 67].includes(c))
        return 'Lluvia';
    if ([80, 81, 82].includes(c))
        return 'Chubascos';
    if ([95, 96, 99].includes(c))
        return 'Tormenta';
    return 'Condición meteorológica';
}
async function copaFetchWeatherContext(latitude = COPA_WEATHER_API.latitude, longitude = COPA_WEATHER_API.longitude) {
    var _a, _b, _c;
    const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        timezone: COPA_WEATHER_API.timezone,
        current: 'temperature_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,wind_gusts_10m',
        hourly: 'precipitation',
        past_days: '1',
        forecast_days: '1'
    });
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
    if (!response.ok)
        throw new Error(`Weather HTTP ${response.status}`);
    const data = await response.json();
    const current = data.current || {};
    const times = ((_a = data.hourly) === null || _a === void 0 ? void 0 : _a.time) || [];
    const precip = ((_b = data.hourly) === null || _b === void 0 ? void 0 : _b.precipitation) || [];
    const currentTime = current.time || '';
    let idx = -1;
    for (let i = 0; i < times.length; i++) {
        if (times[i] <= currentTime)
            idx = i;
    }
    const start = Math.max(0, idx - 23);
    const recent24hMm = idx >= 0 ? precip.slice(start, idx + 1).reduce((a, v) => a + (Number(v) || 0), 0) : null;
    const currentPrecip = Number(current.precipitation) || 0;
    const currentRain = Number(current.rain) || 0;
    const apparent = Number(current.apparent_temperature);
    const temp = Number(current.temperature_2m);
    return {
        provider: COPA_WEATHER_API.provider,
        checkedAt: new Date().toISOString(),
        sourceTime: current.time || null,
        temperature: Number.isFinite(temp) ? temp : null,
        apparentTemperature: Number.isFinite(apparent) ? apparent : null,
        precipitation: currentPrecip,
        rain: currentRain,
        weatherCode: (_c = current.weather_code) !== null && _c !== void 0 ? _c : null,
        weatherLabel: copaWeatherCodeLabel(current.weather_code),
        windSpeed: Number(current.wind_speed_10m) || 0,
        windGusts: Number(current.wind_gusts_10m) || 0,
        recent24hMm: recent24hMm === null ? null : Math.round(recent24hMm * 10) / 10,
        rainingNow: (currentPrecip >= 0.1 || currentRain >= 0.1),
        strongHeat: (Number.isFinite(apparent) && apparent >= 35),
        recentHeavyRain24h: (recent24hMm !== null && recent24hMm >= 10)
    };
}
const COPA_INEA_CONFIG = {
    endpoint: '/api/inea-balneabilidade',
    refreshMs: 6 * 60 * 60 * 1000,
    pointsByZone: {
        posto2: 'CP08',
        posto3: 'CP08',
        posto4: 'CP05',
        posto5: 'CP04',
        posto6: 'CP100'
    },
    pointLabels: {
        CP100: 'Francisco Otaviano',
        CP04: 'Rua Souza Lima',
        CP004: 'Rua Souza Lima',
        CP05: 'Rua Santa Clara',
        CP005: 'Rua Santa Clara',
        CP08: 'Rua República do Peru',
        CP008: 'Rua República do Peru'
    }
};
function copaNormalizeText(v) {
    return String(v !== null && v !== void 0 ? v : '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
}
function copaNumeric(v) {
    if (typeof v === 'number' && Number.isFinite(v))
        return v;
    const t = String(v !== null && v !== void 0 ? v : '').replace(/\./g, '').replace(',', '.').replace(/[^0-9.-]/g, '');
    const n = Number(t);
    return Number.isFinite(n) ? n : null;
}
function copaParseDate(v) {
    var _a, _b;
    if (v instanceof Date && !isNaN(v))
        return v;
    if (typeof v === 'number' && ((_b = (_a = window.XLSX) === null || _a === void 0 ? void 0 : _a.SSF) === null || _b === void 0 ? void 0 : _b.parse_date_code)) {
        const d = window.XLSX.SSF.parse_date_code(v);
        if (d)
            return new Date(d.y, d.m - 1, d.d, d.H || 0, d.M || 0, d.S || 0);
    }
    const t = String(v !== null && v !== void 0 ? v : '').trim();
    let m = t.match(/(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})/);
    if (m) {
        let y = Number(m[3]);
        if (y < 100)
            y += 2000;
        return new Date(y, Number(m[2]) - 1, Number(m[1]));
    }
    const d = new Date(t);
    return isNaN(d) ? null : d;
}
function copaFindHeader(rows) {
    for (let i = 0; i < Math.min(rows.length, 40); i++) {
        const n = (rows[i] || []).map(copaNormalizeText);
        const joined = n.join(' | ');
        if ((joined.includes('praia') || joined.includes('ponto')) && (joined.includes('data') || joined.includes('coleta') || joined.includes('enteroc') || joined.includes('class'))) {
            return i;
        }
    }
    return -1;
}
function copaColumnIndex(headers, patterns) {
    const h = headers.map(copaNormalizeText);
    for (const p of patterns) {
        const idx = h.findIndex(x => x.includes(p));
        if (idx >= 0)
            return idx;
    }
    return -1;
}
function copaCanonicalPoint(v) {
    const t = String(v !== null && v !== void 0 ? v : '').toUpperCase().replace(/\s+/g, '');
    if (t === 'CP004')
        return 'CP04';
    if (t === 'CP005')
        return 'CP05';
    if (t === 'CP008')
        return 'CP08';
    return t;
}
function copaClassifyIneaSamples(samples) {
    const sorted = [...samples].filter(x => x.date).sort((a, b) => b.date - a.date);
    if (!sorted.length)
        return { status: 'unknown', reason: 'Sin muestras fechadas interpretables' };
    const direct = sorted.find(x => x.direct === 'propria' || x.direct === 'impropria');
    if (direct)
        return { status: direct.direct, reason: 'Clasificación publicada en el archivo del INEA', date: direct.date };
    const last5 = sorted.slice(0, 5);
    const entero = last5.filter(x => x.enterococci != null);
    if (entero.length) {
        const latest = entero[0].enterococci;
        const above100 = entero.filter(x => x.enterococci > 100).length;
        const improper = latest > 400 || (entero.length >= 5 && above100 >= 2);
        return { status: improper ? 'impropria' : 'propria', reason: 'Calculado con enterococos según criterios publicados por INEA/CONAMA', date: entero[0].date, sampleCount: entero.length };
    }
    const coli = last5.filter(x => x.coliforms != null);
    if (coli.length) {
        const latest = coli[0].coliforms;
        const above1000 = coli.filter(x => x.coliforms > 1000).length;
        const improper = latest > 2500 || (coli.length >= 5 && above1000 >= 2);
        return { status: improper ? 'impropria' : 'propria', reason: 'Calculado con coliformes termotolerantes según criterios publicados por INEA/CONAMA', date: coli[0].date, sampleCount: coli.length };
    }
    return { status: 'unknown', reason: 'Encontré el punto, pero no una clasificación o parámetro suficiente para evaluarlo' };
}
function copaParseIneaWorkbook(arrayBuffer, sourceUrl = null) {
    if (!window.XLSX)
        throw new Error('SheetJS no está disponible');
    const wb = window.XLSX.read(arrayBuffer, { type: 'array', cellDates: true });
    const groups = {};
    let matchedRows = 0;
    let detectedSheet = null;
    for (const sheetName of wb.SheetNames) {
        const rows = window.XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1, raw: true, defval: null });
        const hi = copaFindHeader(rows);
        if (hi < 0)
            continue;
        const headers = rows[hi] || [];
        const praiaIdx = copaColumnIndex(headers, ['praia']);
        const pointIdx = copaColumnIndex(headers, ['ponto', 'codigo', 'código']);
        const dateIdx = copaColumnIndex(headers, ['data coleta', 'data da coleta', 'data', 'coleta']);
        const classIdx = copaColumnIndex(headers, ['classificacao', 'classificação', 'balneabilidade', 'situacao', 'situação']);
        const enteroIdx = copaColumnIndex(headers, ['enteroc']);
        const coliIdx = copaColumnIndex(headers, ['coliformes termotolerantes', 'coliforme termotolerante']);
        for (let i = hi + 1; i < rows.length; i++) {
            const row = rows[i] || [];
            const praia = copaNormalizeText(praiaIdx >= 0 ? row[praiaIdx] : '');
            const point = copaCanonicalPoint(pointIdx >= 0 ? row[pointIdx] : '');
            if (!praia.includes('copacabana') && !/^CP(?:100|0?4|0?5|0?8)$/.test(point))
                continue;
            matchedRows++;
            detectedSheet = detectedSheet || sheetName;
            const key = point || 'COPACABANA';
            if (!groups[key])
                groups[key] = [];
            const cls = copaNormalizeText(classIdx >= 0 ? row[classIdx] : '');
            groups[key].push({
                date: copaParseDate(dateIdx >= 0 ? row[dateIdx] : null),
                direct: cls.includes('impropr') ? 'impropria' : cls.includes('propr') ? 'propria' : null,
                enterococci: copaNumeric(enteroIdx >= 0 ? row[enteroIdx] : null),
                coliforms: copaNumeric(coliIdx >= 0 ? row[coliIdx] : null)
            });
        }
    }
    const points = {};
    for (const [rawPoint, samples] of Object.entries(groups)) {
        const point = copaCanonicalPoint(rawPoint);
        points[point] = { point, label: COPA_INEA_CONFIG.pointLabels[point] || point, ...copaClassifyIneaSamples(samples) };
    }
    return { points, matchedRows, detectedSheet, sourceUrl, parsedAt: new Date().toISOString(), workbookSheets: wb.SheetNames.length };
}
async function copaFetchIneaContext() {
    const r = await fetch(COPA_INEA_CONFIG.endpoint, { cache: 'no-store' });
    if (!r.ok)
        throw new Error(`INEA HTTP ${r.status}`);
    const sourceUrl = r.headers.get('x-inea-source') || null;
    const updated = r.headers.get('x-inea-updated') || null;
    const buf = await r.arrayBuffer();
    const parsed = copaParseIneaWorkbook(buf, sourceUrl);
    return { ...parsed, updated };
}
const COPA_MARINHA_CONFIG = {
    endpoint: '/api/marinha-ressaca',
    refreshMs: 60 * 60 * 1000
};
async function copaFetchSeaContext() {
    const r = await fetch(COPA_MARINHA_CONFIG.endpoint, { cache: 'no-store' });
    if (!r.ok)
        throw new Error(`Marinha HTTP ${r.status}`);
    return await r.json();
}
const COPA_MASTER_3 = {
    tagline: 'Mucho más que una playa.',
    intro: 'Copacabana puede parecer sencilla desde fuera: una playa, un calçadão y edificios frente al Atlántico. Pero detrás de esa imagen hay más de un siglo de transformación urbana, arquitectura, música, literatura, vida residencial y pequeñas historias escondidas entre sus calles. Para entender Copacabana de verdad, hay que alejarse algunas cuadras del mar de vez en cuando.',
    doors: [['📖', 'Historia'], ['🗺️', 'Entiende el barrio'], ['🏛️', 'Arquitectura'], ['🎵', 'Música'], ['🤫', 'Historias secretas'], ['🇧🇷', 'Vida carioca']],
    timeline: [
        { era: 'Antes del gran barrio', title: 'Sacopenapã y la pequeña Copacabana', text: 'Antes de convertirse en uno de los nombres más reconocibles de Brasil, esta franja entre morros y océano estaba lejos del centro urbano. La memoria de la antigua igrejinha de Nossa Senhora de Copacabana quedó ligada al promontorio donde después se levantaría el Forte.' },
        { era: '1892', title: 'El túnel cambia la historia', text: 'La apertura del Túnel Velho ayudó a romper el aislamiento de la zona y aceleró su conexión con el resto de Río.' },
        { era: '1906', title: 'Las ondas llegan al paseo', text: 'La primera versión del mosaico ondulado de piedras portuguesas fue ejecutada en 1906. El diseño original antecede a Roberto Burle Marx.' },
        { era: '1908–1914', title: 'Nace una fortificación moderna', text: 'El Forte de Copacabana fue construido en el promontorio donde estaba la antigua iglesia, reforzando la defensa de la entonces capital brasileña.' },
        { era: '1922', title: 'Los 18 del Forte', text: 'La rebelión de julio de 1922 convirtió el Forte y la Avenida Atlântica en escenario de uno de los episodios políticos y militares más recordados de la Primera República.' },
        { era: '1923', title: 'Copacabana Palace', text: 'La inauguración del Copacabana Palace consolidó la imagen de una nueva orla sofisticada y turística. El proyecto de Joseph Gire se convirtió en una referencia arquitectónica y urbana.' },
        { era: '1930–1950', title: 'Art Déco y ciudad vertical', text: 'Edificios residenciales, hoteles, cines, bares y nuevas formas de vivir transformaron rápidamente el barrio. Para descubrir esa Copacabana todavía basta caminar mirando hacia arriba.' },
        { era: '1950–1960', title: 'Noches, música y una nueva imagen de Río', text: 'Copacabana se volvió escenario de boates, samba-jazz y encuentros musicales. La historia de la bossa nova está conectada a esta geografía nocturna, aunque su universo se extiende por otros barrios de la Zona Sul.' },
        { era: '1970–1974', title: 'La gran reforma de la orla', text: 'Con la ampliación de la Avenida Atlântica, Roberto Burle Marx reformuló y expandió el paisajismo del calçadão, preservando la idea de las ondas y sumando grandes composiciones gráficas.' },
        { era: 'Hoy', title: 'Una ciudad dentro de la ciudad', text: 'Copacabana sigue mezclando postal internacional y barrio residencial: playa, supermercados, padarias, edificios históricos, jubilados, deportistas, turistas, trabajadores y vida cotidiana conviven a pocas cuadras.' }
    ],
    microzones: [
        { name: 'Posto 2 · Lido', fit: 'Práctico para Lido, Cardeal Arcoverde, hoteles y conexión con Leme.', vibe: 'movimiento + turismo' },
        { name: 'Posto 3', fit: 'Zona central para quien quiere tener buena parte de Copacabana a distancia caminable.', vibe: 'central + intenso' },
        { name: 'Posto 4', fit: 'Equilibrio entre playa, comercio, Siqueira Campos y vida cotidiana.', vibe: 'equilibrado + residencial' },
        { name: 'Posto 5', fit: 'Muy práctico para Cantagalo, restaurantes y conexión hacia Posto 6 e Ipanema.', vibe: 'local + conectado' },
        { name: 'Posto 6', fit: 'Forte, pescadores, Drummond y algunas de las imágenes clásicas del extremo sur de la playa.', vibe: 'historia + fotografía' },
        { name: 'Bairro Peixoto', fit: 'Para bajar el ritmo y descubrir una Copacabana interior, residencial y menos obvia.', vibe: 'tranquilo + local' }
    ],
    architecture: [
        { title: 'Copacabana Palace', text: 'Inaugurado en 1923 y proyectado por Joseph Gire. Su presencia ayudó a definir la imagen turística de la nueva Avenida Atlântica.' },
        { title: 'Edifício Guahy', text: 'Proyecto de 1932 de Ricardo Buffa, uno de los ejemplos protegidos del Art Déco residencial del barrio.' },
        { title: 'Calçadão', text: 'Las ondas aparecen antes de Burle Marx. Su intervención de los años 1970 amplió el paseo y creó una composición paisajística mucho mayor.' },
        { title: 'Mira arriba', text: 'Parte de la mejor Copacabana no está a nivel de los ojos: portales, coronamientos, geometrías Art Déco y detalles de edificios sobreviven entre fachadas contemporáneas.' }
    ],
    secrets: ['El dibujo ondulado del calçadão no fue inventado por Burle Marx: la primera versión se instaló en 1906.', 'Antes del Forte existía en el promontorio una pequeña iglesia ligada al nombre Copacabana.', 'Bairro Peixoto parece otro barrio, pero forma parte de Copacabana y conserva una escala urbana mucho más tranquila.', 'La postal de Copacabana no se entiende solo desde la arena: su historia también está en túneles, edificios, bares y calles interiores.'],
    carioca: ['Camina temprano por la orla y observa cómo la playa funciona como gimnasio al aire libre.', 'Entra en una padaria de barrio: desayuno, café y vida cotidiana cuentan tanto como una atracción famosa.', 'No te quedes únicamente en Avenida Atlântica; cruza hacia las calles interiores.', 'Prueba una vuelta corta por Bairro Peixoto para ver el contraste con la orla.', 'Mira un partido informal, futevôlei o vóley sin convertir cada momento en una fotografía.', 'Compra agua de coco, conversa y observa el ritmo del barrio.', 'Usa el Metro cuando tenga sentido; Copacabana no necesita vivirse siempre en automóvil.', 'Mira arriba: el patrimonio del barrio muchas veces está varios pisos sobre tu cabeza.', 'Al final de la tarde, camina sin una lista rígida y deja espacio para el barrio.', 'Recuerda que aquí vive gente: la postal también es casa, trabajo y rutina.'],
    routes: [
        { time: '1 h', title: 'Copacabana esencial', stops: ['Calçadão', 'Drummond', 'Posto 6'], note: 'Una primera lectura rápida del extremo sur y de la imagen clásica.' },
        { time: '3 h', title: 'Historia + postal', stops: ['Forte', 'Drummond', 'Calçadão', 'arquitectura de la orla'], note: 'Para primera visita con interés histórico y fotográfico.' },
        { time: '½ día', title: 'Mira arriba', stops: ['Copacabana Palace exterior', 'Lido', 'Art Déco', 'calles interiores', 'Bairro Peixoto'], note: 'La Copacabana que muchos turistas atraviesan sin mirar.' },
        { time: '½ día', title: 'Hazlo como un carioca', stops: ['padaria', 'playa', 'deporte', 'comida sencilla', 'paseo interior'], note: 'Menos monumentos, más ritmo cotidiano.' },
        { time: '60 min', title: 'Reel en 60 minutos', stops: ['ondas del calçadão', 'curva de la playa', 'Drummond', 'Posto 6'], note: 'Pensada para fotografía y video corto.' }
    ],
    profiles: [['👶', 'Con bebé', 'Sombra, distancias cortas, baño, aire acondicionado y plan de siesta.'], ['👨‍👩‍👧', 'Familia', 'Playa + comida sencilla + actividades cortas sin sobrecargar el día.'], ['🧑‍🎓', 'Adolescentes', 'Deporte, fotos, comida, playa y experiencias que no se sientan como una clase.'], ['👵', 'Mayores', 'El motor pregunta movilidad y ritmo; la edad por sí sola no decide.'], ['❤️', 'Pareja', 'Atardecer, paseo, gastronomía y experiencias íntimas sin asumir que romántico significa caro.'], ['🧍', 'Solo', 'Flexibilidad, vida local y decisiones según hora y ubicación.'], ['♿', 'Movilidad reducida', 'Solo recomendamos como accesible aquello que tenga datos suficientemente verificados.'], ['🐶', 'Mascota', 'Política de mascotas y espacios compatibles como filtros, no como suposiciones.']]
};
function CopacabanaMaster3Editorial(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/CopacabanaMaster3Editorial.js?v=20260922',name:'CopacabanaMaster3Editorial',componentProps:props})}
const MASTER3_SITUATIONS = [
    ['🌧️', 'Está lloviendo', 'Prioriza interiores, traslados simples y planes que sigan valiendo la pena con mal tiempo.'],
    ['🔥', 'Hace mucho calor', 'Reordena horarios, reduce exposición y aumenta sombra, aire acondicionado y pausas.'],
    ['⏱️', 'Tengo poco tiempo', 'Filtra por desplazamiento + duración mínima real, no por fama.'],
    ['💰', 'Quiero gastar poco', 'Combina actividades gratuitas con transporte y comida para estimar el costo total.'],
    ['👵', 'Quiero caminar poco', 'Reduce distancia, escaleras y tiempo de pie; no supone limitaciones solo por edad.'],
    ['🌙', '¿Qué hago esta noche?', 'Cruza horario, día, música, comida, presupuesto, regreso y agenda actual.'],
    ['🌊', '¿Me baño hoy?', 'Usa clima + balneabilidad + mar/ressaca + señalización local; nunca promete seguridad.'],
    ['🔄', 'Cambió mi plan', 'Mantiene tu contexto y recalcula sin obligarte a empezar desde cero.']
];

const COPA_MASTER_SYSTEMS = [
    {
        id: 'descubre', icon: '🌴', title: 'Descubre Copacabana',
        subtitle: 'Antes de decirme qué hacer, ayúdame a entender dónde estoy.',
        body: 'Historia, microzonas, arquitectura, música, literatura, vida carioca y pequeñas historias escondidas detrás de la postal.',
        actions: ['Historia', 'Entiende el barrio', 'Arquitectura', 'Música', 'Historias secretas', 'Vida carioca']
    },
    {
        id: 'hacer', icon: '⭐', title: 'Qué hacer',
        subtitle: 'Estoy en Copacabana. ¿Qué realmente vale la pena hacer?',
        body: 'Playa y mar, cultura e historia, fotografía, deporte y experiencias. La jerarquía separa imperdibles, buenas opciones, detalles de barrio e historias geolocalizadas.',
        actions: ['Playa y mar', 'Cultura e historia', 'Fotografía', 'Deporte', 'Experiencias']
    },
    {
        id: 'comer', icon: '🍽️', title: 'Comer y beber',
        subtitle: 'No parto del restaurante: parto de lo que tú quieres.',
        body: 'Desayuno, café, comida barata, self-service, carne, padaria, boteco, cena, vista al mar, vegetariano y comer tarde. El motor puede reducir todo a tres opciones.',
        actions: ['Tengo hambre ahora', 'Desayuno', 'Café', 'Comer barato', 'Boteco', 'Cena']
    },
    {
        id: 'organiza', icon: '🏠', title: 'Organiza tu estadía',
        subtitle: 'Dormir, moverte, comprar y resolver cosas.',
        body: 'Alojamiento por perfil, Metro, apps, aeropuerto, traslados, supermercados, farmacias, lavandería, equipaje y último día.',
        actions: ['Dónde alojarse', 'Moverme', 'Aeropuerto', 'Comprar', 'Servicios', 'Equipaje']
    },
    {
        id: 'parati', icon: '❤️', title: 'Copacabana para ti',
        subtitle: 'El mismo barrio cambia según quién viaja.',
        body: 'Bebés, familias, adolescentes, mayores, parejas, viajeros solos, LGBTQ+, movilidad reducida, mascotas y perfiles por intereses.',
        actions: ['Familia', 'Mayores', 'Pareja', 'Solo', 'Accesibilidad', 'Mascotas']
    },
    {
        id: 'momento', icon: '🕐', title: 'Según el momento',
        subtitle: 'No quiero saber qué existe. Quiero saber qué conviene ahora.',
        body: 'Poco tiempo, lluvia, calor, mar, noche, domingo, feriado, gran evento, amanecer y atardecer. Puede decirte también cuándo NO ir.',
        actions: ['30 min', 'Llueve', 'Calor', 'Esta noche', 'Atardecer', '¿Me baño hoy?']
    },
    {
        id: 'rutas', icon: '🗺️', title: 'Rutas Ernestinho',
        subtitle: 'Una ruta no es una lista de puntos.',
        body: 'Secuencias pensadas por tiempo, distancia, energía, presupuesto, clima y contexto, con margen real y plan B.',
        actions: ['1 hora', '3 horas', 'Medio día', 'Día completo', 'Mira arriba', 'Reel 60 min']
    },
    {
        id: 'sos', icon: '🆘', title: 'Consejos y SOS',
        subtitle: 'Prevenir es diferente de resolver un problema ahora.',
        body: 'Seguridad práctica, teléfono perdido, documentos, mar, transporte, asistencia médica, baño, regreso al alojamiento y frases de emergencia.',
        actions: ['Seguridad', 'Teléfono', 'Documentos', 'Salud', 'Mar', 'Regresar']
    },
    {
        id: 'parami', icon: '💛', title: 'Copacabana para mí',
        subtitle: 'No me muestres todo. Muéstrame lo que tiene sentido para mí.',
        body: 'Ubicación + hora + tiempo disponible + presupuesto + perfil + clima + estado de los lugares = hasta tres recomendaciones explicadas.',
        actions: ['¿Qué hago ahora?', 'Decídelo por mí', 'Cambió mi plan', 'Sorpréndeme']
    }
];
function CopacabanaMasterSystems(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/CopacabanaMasterSystems.js?v=20260922',name:'CopacabanaMasterSystems',componentProps:props,dataUrls:["/data/copacabana-extra-lazy.json"]})}
function CopacabanaParaMi(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/CopacabanaParaMi.js?v=20260922',name:'CopacabanaParaMi',componentProps:props,dataUrls:["/data/copacabana-extra-lazy.json","/data/explorar-lazy.json"]})}
function Master4CityBrain(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/Master4CityBrain.js?v=20260922',name:'Master4CityBrain',componentProps:props,dataUrls:["/data/master3-runtime-lazy.json"]})}
function Master4Planner(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/Master4Planner.js?v=20260922',name:'Master4Planner',componentProps:props,dataUrls:["/data/master3-runtime-lazy.json"]})}
/* recommendation engine loaded by data-bootstrap.js */
function Master4SmartRioV4(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/Master4SmartRioV4.js?v=20260922',name:'Master4SmartRioV4',componentProps:props})}
function Master4SpecialGuides(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/Master4SpecialGuides.js?v=20260922',name:'Master4SpecialGuides',componentProps:props})}
function Master4LegacyDataHub(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/Master4LegacyDataHub.js?v=20260922',name:'Master4LegacyDataHub',componentProps:props})}
function Master4MuseumsReal(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/Master4MuseumsReal.js?v=20260922',name:'Master4MuseumsReal',componentProps:props})}
function Master4Place(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/Master4Place.js?v=20260922',name:'Master4Place',componentProps:props})}
function Master4MoreRio(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/Master4MoreRio.js?v=20260922',name:'Master4MoreRio',componentProps:props})}
function PartnerOfficialExperience(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/PartnerOfficialExperience.js?v=20260922',name:'PartnerOfficialExperience',componentProps:props})}
function decodeBarriosBeta23() {
    const bin = atob(BARRIOS_BETA23_B64);
    const bytes = Uint8Array.from(bin, ch => ch.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
}
function BarriosBeta23Embed({ go, lang = 'es' }) {
    const [srcDoc] = React.useState(() => decodeBarriosBeta23());
    const frameRef = React.useRef(null);
    const barrioInicial = React.useMemo(() => {
        const path = window.location.pathname.replace(/\/+$/, '');
        const m = path.match(/^\/barrios\/([^/]+)$/);
        if (!m) return null;
        const slug = m[1];
        const mapa = {"copacabana": "Copacabana", "ipanema": "Ipanema", "leblon": "Leblon", "botafogo": "Botafogo", "urca": "Urca", "flamengo": "Flamengo", "laranjeiras": "Laranjeiras", "catete-largo-do-machado-gloria": "Catete · Largo do Machado · Glória", "cinelandia-lapa-santa-teresa": "Cinelândia · Lapa · Santa Teresa", "centro-historico-pequena-africa": "Centro Histórico · Pequena África", "zona-norte": "Zona Norte", "barra-da-tijuca-ilha-da-gigoia": "Barra da Tijuca · Ilha da Gigóia", "recreio-vargens-guaratiba-sepetiba": "Recreio · Vargens · Guaratiba · Sepetiba", "sao-conrado-gavea-jardim-botanico-lagoa": "São Conrado · Gávea · Jardim Botânico · Lagoa", "cosme-velho-humaita": "Cosme Velho · Humaitá", "floresta-da-tijuca-alto-da-boa-vista": "Floresta da Tijuca · Alto da Boa Vista"};
        return mapa[slug] || null;
    }, []);
    React.useEffect(() => {
        const handler = (ev) => { const d = ev.data || {}; if (d.type === 'ernestinho-barrio-route' && d.slug) seoNavigate('/barrios/' + d.slug); if (d.type === 'ernestinho-barrio-home') seoNavigate('/barrios'); };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);
    React.useEffect(() => { const send = () => { var _a, _b; try {
        const cw = (_a = frameRef.current) === null || _a === void 0 ? void 0 : _a.contentWindow;
        cw === null || cw === void 0 ? void 0 : cw.postMessage({ type: 'ernestinho-lang', lang }, '*');
        if (barrioInicial) cw === null || cw === void 0 ? void 0 : cw.postMessage({ type: 'ernestinho-open-barrio', name: barrioInicial }, '*');
    }
    catch (e) { } }; send(); const t = setTimeout(send, 180); return () => clearTimeout(t); }, [lang, barrioInicial]);
    return React.createElement("div", { className: "fixed inset-0 z-[80] bg-slate-50 flex flex-col" },
        React.createElement("div", { className: "shrink-0 h-14 bg-slate-950 text-white flex items-center justify-between px-3 sm:px-4 " },
            React.createElement("button", { onClick: () => go('master4_descubre'), className: "rounded-full bg-white/10 hover:bg-white/20 px-3 py-2 text-xs sm:text-sm font-semibold" }, lang === 'pt' ? '← Descubra o Rio' : lang === 'en' ? '← Discover Rio' : '← Descubre Río'),
            React.createElement("div", { className: "text-center leading-tight" },
                React.createElement("div", { className: "text-[10px] sm:text-[11px] font-black tracking-[0.16em]" }, lang === 'pt' ? 'BAIRROS' : lang === 'en' ? 'NEIGHBORHOODS' : 'BARRIOS'),
                React.createElement("div", { className: "text-[10px] sm:text-xs opacity-80" }, "Ernestinho Carioca")),
            React.createElement("button", { onClick: () => go('inicio'), className: "rounded-full bg-white/10 hover:bg-white/20 px-3 py-2 text-xs sm:text-sm font-semibold" }, lang === 'pt' ? 'Início' : lang === 'en' ? 'Home' : 'Inicio')),
        React.createElement("iframe", { ref: frameRef, onLoad: () => { var _a, _b; try {
                const cw = (_a = frameRef.current) === null || _a === void 0 ? void 0 : _a.contentWindow;
                cw === null || cw === void 0 ? void 0 : cw.postMessage({ type: 'ernestinho-lang', lang }, '*');
                if (barrioInicial) cw === null || cw === void 0 ? void 0 : cw.postMessage({ type: 'ernestinho-open-barrio', name: barrioInicial }, '*');
            }
            catch (e) { } }, title: "Descubre R\u00EDo \u00B7 Barrios BETA 23", srcDoc: srcDoc, className: "w-full flex-1 border-0 bg-slate-50" }));
}
function Master4Barrios({ go, lang }) {
    return React.createElement(BarriosBeta23Embed, { go: go, lang: lang });
}
function Master4AventuraPage(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/Master4AventuraPage.js?v=20260922',name:'Master4AventuraPage',componentProps:props})}
function Master4DiscoverRio(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/Master4DiscoverRio.js?v=20260922',name:'Master4DiscoverRio',componentProps:props})}
function Master4LiveRio(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/Master4LiveRio.js?v=20260922',name:'Master4LiveRio',componentProps:props,dataUrls:["/data/master-runtime-extra-lazy.json"]})}
function Master4TV(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/Master4TV.js?v=20260922',name:'Master4TV',componentProps:props,dataUrls:["/data/master-runtime-extra-lazy.json"]})}
const RIO_HOJE_COVER = "/assets/embedded-images/embedded-15-d08692e83c1c.webp";

const ERNESTINHO_ROUTES_NOT_RECOMMENDED=[{"routeId":"pedra-da-gavea-solo-general-public","reason":"Exigencia física/técnica, trechos de escalaminhada y riesgos: no se presenta como paseo autoguiado general."},{"routeId":"circuito-dos-picos-dia-unico","reason":"El circuito oficial tiene 19 km y la propia administración recomienda dos o tres días; no convertirlo en day tour casual."},{"routeId":"centro-nocturno-solo-generico","reason":"Demasiado dependiente de evento, calle y horario; solo crear variantes contextualizadas con RÍO HOJE/vida nocturna."},{"routeId":"the-maze-como-destino-fijo","reason":"Acceso/eventos no suficientemente estables para anclar una ruta. Se mantiene como CONDITIONAL_STOP."}];
// removed unreachable erRouteById

function ErnestinhoRoutesV1(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/recorridos-family.js?v=20260922',name:'ErnestinhoRoutesV1',componentProps:props,dataUrls:['/data/recorridos.json','/data/premium-recorridos-extra.json']})}
function ErnestinhoRoutesV2(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/recorridos-family.js?v=20260922',name:'ErnestinhoRoutesV2',componentProps:props,dataUrls:['/data/recorridos.json','/data/premium-recorridos-extra.json']})}
function RioHojeV1(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/RioHojeV1.js?v=20260922',name:'RioHojeV1',componentProps:props,dataUrls:["/data/otros-datos-extra-lazy52.json","/data/rio-hoje-lazy52.json"]})}
function Master4Home(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/Master4Home.js?v=20260922',name:'Master4Home',componentProps:props})}
const EventoTabla = ({ headers, rows }) => React.createElement("div", { className: "overflow-x-auto rounded-2xl border border-slate-200 bg-white" },
    React.createElement("table", { className: "w-full min-w-[720px] text-sm" },
        React.createElement("thead", { className: "bg-slate-900 text-white" },
            React.createElement("tr", null, headers.map(h => React.createElement("th", { key: h, className: "text-left px-4 py-3 font-black" }, h)))),
        React.createElement("tbody", null, rows.map((row, i) => React.createElement("tr", { key: i, className: "border-t border-slate-100 odd:bg-white even:bg-slate-50" }, row.map((cell, j) => React.createElement("td", { key: j, className: "px-4 py-3 align-top" }, cell)))))));

function seoSlug(valor) {
    return String(valor || '')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase().replace(/&/g, ' y ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

const SEO_ROUTE_PREFERRED_SECTION = {
    '/': 'inicio',
    '/museos': 'museos',
    '/playas': 'playas',
    '/naturaleza': 'naturaleza',
    '/gastronomia': 'gastronomia',
    '/barrios': 'barrios',
    '/transportes': 'transportes',
    '/consejos': 'consejos',
    '/experiencias': 'experiencias',
    '/hola-soy-ernestinho': 'hola_ernestinho'
};
function seoExperienceState(exp) {
    if (!exp)
        return 'experiencias';
    if (exp.id === 'exp-1')
        return 'full_day_rio';
    if (exp.id === 'exp-2')
        return 'buzios';
    if (exp.id === 'exp-3')
        return 'detalle_exp-3';
    if (exp.id === 'exp-4')
        return 'detalle_exp-4';
    if (exp.id === 'exp-5')
        return 'detalle_exp-5';
    return `actividad_${exp.id}`;
}
function seoExperienceFromState(section) {
    const all = [
        ...EXPERIENCIAS_DATA,
        ...ACTIVIDADES_NUEVAS
    ];
    return all.find(exp => seoExperienceState(exp) === section) || null;
}
function seoPathForSection(section) {
    const exp = seoExperienceFromState(section);
    if (exp)
        return `/experiencias/${seoSlug(exp.titulo)}`;
    return SEO_SECTION_ROUTES[section] || null;
}
function seoCleanPath(pathname) {
    let ruta = decodeURIComponent(String(pathname || '/')).replace(/\/+$/, '') || '/';
    if (!ruta.startsWith('/'))
        ruta = '/' + ruta;
    return ruta;
}
function seoResolveRoute(pathname) {
    const ruta = seoCleanPath(pathname);
    const result = { seccion: 'inicio', museoId: null, barrio: null, restaurante: null, articulo: null, temaGuia: null, consejoId: null };
    if (ruta === '/')
        return result;
    if (ruta === '/recorrido-centro' || ruta === '/quiero' || ruta === '/ruta-centro')
        return { ...result, seccion: 'consejos', consejoId: 'caminando' };
    let m = ruta.match(/^\/museos\/([^/]+)$/);
    if (m) {
        const museo = MUSEOS_DATA.find(x => seoSlug(x.nombre) === m[1]);
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
        const cardNueva = (typeof window.GASTRONOMIA_NUEVAS_CARDS !== 'undefined' ? window.GASTRONOMIA_NUEVAS_CARDS : []).find(x => seoSlug(x.title) === m[1] || seoSlug(x.id) === m[1]);
        if (cardNueva)
            return { ...result, seccion: 'gastronomia', restaurante: { id: cardNueva.id, nombre: cardNueva.title, nueva: true } };
        const restaurante = GASTRONOMIA_DATA.find(x => seoSlug(x.nombre) === m[1]);
        if (restaurante)
            return { ...result, seccion: 'gastronomia', restaurante };
    }
    m = ruta.match(/^\/articulos\/([^/]+)$/);
    if (m) {
        const articulo = ARTICULOS_CONSEJOS.find(x => seoSlug(x.titulo) === m[1] || seoSlug(x.id) === m[1]);
        if (articulo)
            return { ...result, seccion: 'articulo_detalle', articulo };
    }
    m = ruta.match(/^\/guia\/([^/]+)$/);
    if (m && m[1] !== 'pix') {
        const temaId = Object.keys(GUIA_INFO).find(id => { var _a; return seoSlug(((_a = GUIA_INFO[id]) === null || _a === void 0 ? void 0 : _a.titulo) || id) === m[1] || seoSlug(id) === m[1]; });
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
    const section = Object.keys(SEO_SECTION_ROUTES).find(key => SEO_SECTION_ROUTES[key] === ruta);
    if (section)
        return { ...result, seccion: section };
    return result;
}
function seoCurrentPath(section, museoId, barrio, restaurante, articulo, temaGuia, consejoId) {
    if (section === 'consejos' && ((consejoId === null || consejoId === void 0 ? void 0 : consejoId.id) || consejoId) === 'caminando') {
        const actual = seoCleanPath(window.location.pathname);
        if (actual === '/quiero' || actual === '/ruta-centro' || actual === '/recorrido-centro')
            return actual;
        return '/quiero';
    }
    if (section === 'museos' && museoId) {
        const museo = MUSEOS_DATA.find(x => x.id === museoId);
        const actual = seoCleanPath(window.location.pathname);
        if (museo && actual.startsWith('/museos/'))
            return `/museos/${seoSlug(museo.nombre)}`;
        return '/museos';
    }
    if (section === 'barrios' && barrio)
        return `/barrios/${seoSlug(barrio.nombre || barrio.id)}`;
    if (section === 'gastronomia' && restaurante)
        return `/gastronomia/${seoSlug(restaurante.nombre)}`;
    if (section === 'articulo_detalle' && articulo)
        return `/articulos/${seoSlug(articulo.titulo || articulo.id)}`;
    if (section === 'guia' && temaGuia && GUIA_INFO[temaGuia])
        return `/guia/${seoSlug(GUIA_INFO[temaGuia].titulo || temaGuia)}`;
    return seoPathForSection(section) || '/';
}
function seoNavigate(path, mode = 'push') {
    const ruta = seoCleanPath(path);
    if (seoCleanPath(window.location.pathname) === ruta)
        return;
    try {
        if (mode === 'replace')
            window.history.replaceState({ seo: true }, '', ruta);
        else
            window.history.pushState({ seo: true }, '', ruta);
        window.dispatchEvent(new CustomEvent('ernestinho-routechange', { detail: { path: ruta } }));
    } catch (e) {
        // Local/file/preview environments can reject pushState to an absolute route.
        // Navigation inside the React app must still continue.
    }
}

function seoSetMeta(meta) {
    const { title, description, path, indexable = true, image } = meta || {};
    const site = 'https://www.ernestinhocarioca.com.br';
    const canonicalUrl = site + (path || '/');
    document.title = title || 'Ernestinho Carioca | Guía completa de Río de Janeiro';
    const setMeta = (selector, attr, value) => {
        var _a, _b;
        let el = document.head.querySelector(selector);
        if (!el) {
            el = document.createElement('meta');
            if (selector.includes('property='))
                el.setAttribute('property', ((_a = selector.match(/property="([^"]+)"/)) === null || _a === void 0 ? void 0 : _a[1]) || '');
            else
                el.setAttribute('name', ((_b = selector.match(/name="([^"]+)"/)) === null || _b === void 0 ? void 0 : _b[1]) || '');
            document.head.appendChild(el);
        }
        el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', description || 'Descubre Río de Janeiro con Ernestinho Carioca: lugares, experiencias, consejos y rutas para organizar tu viaje.');
    setMeta('meta[name="robots"]', 'content', indexable ? 'index, follow' : 'noindex, follow');
    setMeta('meta[property="og:title"]', 'content', document.title);
    setMeta('meta[property="og:description"]', 'content', description || 'Guía práctica de Río de Janeiro por Ernestinho Carioca.');
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:type"]', 'content', path && path !== '/' ? 'article' : 'website');
    setMeta('meta[name="twitter:card"]', 'content', image ? 'summary_large_image' : 'summary');
    setMeta('meta[name="twitter:title"]', 'content', document.title);
    setMeta('meta[name="twitter:description"]', 'content', description || 'Guía práctica de Río de Janeiro por Ernestinho Carioca.');
    const oldOgImage = document.head.querySelector('meta[property="og:image"]');
    const oldTwImage = document.head.querySelector('meta[name="twitter:image"]');
    if (image) {
        setMeta('meta[property="og:image"]', 'content', image);
        setMeta('meta[name="twitter:image"]', 'content', image);
    } else {
        if (oldOgImage) oldOgImage.remove();
        if (oldTwImage) oldTwImage.remove();
    }
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    seoSetSchema(meta, path);
}
function seoMetaFromPath(path) {
    const ruta = seoCleanPath(path || window.location.pathname);
    let m = ruta.match(/^\/barrios\/([^/]+)$/);
    if (m) {
        const barriosSeo = {"copacabana": {"name": "Copacabana", "desc": "Playa, historia, Postos 2–6, Bairro Peixoto, Forte, cultura y vida carioca."}, "ipanema": {"name": "Ipanema", "desc": "Arpoador, Posto 9, Bossa Nova, Feira Hippie, plazas, compras y gastronomía."}, "leblon": {"name": "Leblon", "desc": "Playa, Mirante, Dois Irmãos, Jardim de Alah y una Zona Sur más tranquila."}, "botafogo": {"name": "Botafogo", "desc": "Enseada, patrimonio, Casa Rui Barbosa, cultura, gastronomía y vida local."}, "urca": {"name": "Urca", "desc": "Pão de Açúcar, Praia Vermelha, Mureta, Forte São João y Pista Cláudio Coutinho."}, "flamengo": {"name": "Flamengo", "desc": "Aterro, MAM, Burle Marx, playa, deporte y arquitectura moderna."}, "laranjeiras": {"name": "Laranjeiras", "desc": "Rio Carioca, Parque Guinle, palacios, General Glicério y Fluminense."}, "catete-largo-do-machado-gloria": {"name": "Catete · Largo do Machado · Glória", "desc": "Museu da República, jardines, Outeiro da Glória, Marina y vida de barrio."}, "cinelandia-lapa-santa-teresa": {"name": "Cinelândia · Lapa · Santa Teresa", "desc": "Theatro Municipal, Arcos, Selarón, samba, bondinho y arte."}, "centro-historico-pequena-africa": {"name": "Centro Histórico · Pequena África", "desc": "Praça XV, Paço Imperial, CCBB, Candelária, Mauá, Valongo y Pedra do Sal."}, "zona-norte": {"name": "Zona Norte", "desc": "Tijuca, Maracanã, São Cristóvão, Madureira, samba, Penha, Méier y patrimonio."}, "barra-da-tijuca-ilha-da-gigoia": {"name": "Barra da Tijuca · Ilha da Gigóia", "desc": "Ilha da Gigóia: barquitos, canales, gastronomía, Jardim Oceânico y una opción diferente para hospedarte."}, "recreio-vargens-guaratiba-sepetiba": {"name": "Recreio · Vargens · Guaratiba · Sepetiba", "desc": "Playas, Prainha, Grumari, Pedra Branca, gastronomía, Burle Marx y Telégrafo."}, "sao-conrado-gavea-jardim-botanico-lagoa": {"name": "São Conrado · Gávea · Jardim Botânico · Lagoa", "desc": "Vuelo libre, Planetário, Shopping da Gávea, Jardim Botânico, Parque Lage y Lagoa."}, "cosme-velho-humaita": {"name": "Cosme Velho · Humaitá", "desc": "Trem do Corcovado, Largo do Boticário, Casa Roberto Marinho y Cobal."}, "floresta-da-tijuca-alto-da-boa-vista": {"name": "Floresta da Tijuca · Alto da Boa Vista", "desc": "Cascatinha Taunay, picos, Vista Chinesa, Mesa do Imperador y Paineiras."}};
        const b = barriosSeo[m[1]];
        if (b) return { path:ruta, title:`${b.name} en Río de Janeiro | Ernestinho Carioca`, description:b.desc };
    }
    m = ruta.match(/^\/gastronomia\/([^/]+)$/);
    if (m) {
        const card = (typeof window.GASTRONOMIA_NUEVAS_CARDS !== 'undefined' ? window.GASTRONOMIA_NUEVAS_CARDS : []).find(x => seoSlug(x.title) === m[1] || seoSlug(x.id) === m[1]);
        if (card) return { path:ruta, title:`${card.title} en Río de Janeiro | Ernestinho Carioca`, description:card.desc || card.descripcion || `Información, ambiente y consejos para conocer ${card.title} en Río de Janeiro.` };
    }
    return null;
}
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
        const x = MUSEOS_DATA.find(v => v.id === museoId);
        if (x)
            return { path, title: `${x.nombre} en Río de Janeiro | Ernestinho Carioca`, description: x.descripcion || x.subtitulo };
    }
    if (section === 'barrios' && barrio)
        return { path, title: `${barrio.nombre} en Río de Janeiro | Ernestinho Carioca`, description: barrio.desc || barrio.lema };
    if (section === 'gastronomia' && restaurante)
        return { path, title: `${restaurante.nombre} en Río de Janeiro | Ernestinho Carioca`, description: restaurante.destaque };
    if (section === 'articulo_detalle' && articulo)
        return { path, title: `${articulo.titulo} | Ernestinho Carioca`, description: articulo.resumen };
    if (section === 'guia' && temaGuia && GUIA_INFO[temaGuia]) {
        const x = GUIA_INFO[temaGuia];
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
    const base = labels[section] || labels[Object.keys(SEO_SECTION_ROUTES).find(k => SEO_SECTION_ROUTES[k] === path)] || null;
    return base ? { path, title: base[0], description: base[1], indexable: true } : { path, indexable: false };
}
var GLOBAL_UI_TRANSLATIONS = window.GLOBAL_UI_TRANSLATIONS || { pt: {}, en: {} };
(function(){
window.GLOBAL_UI_TRANSLATIONS=window.GLOBAL_UI_TRANSLATIONS||{pt:{},en:{}};
})();
function v42BuildCoverage() { const C = v4Catalog(), has = k => C.filter(p => { var _a; return ((_a = p.recommendationProfile) === null || _a === void 0 ? void 0 : _a[k]) && p.recommendationProfile[k].confidence !== 'UNKNOWN'; }).length; const cov = { totalEntities: C.length, withRecommendationProfile: C.filter(p => Object.keys(p.recommendationProfile || {}).length > 10).length, withFamilyData: has('family'), withAgeData: C.filter(p => p.ageCompatibility && Object.keys(p.ageCompatibility).length === 5).length, withRainData: has('rain'), withHeavyRainData: has('heavyRain'), withOutdoorData: has('outdoor'), withNatureData: has('nature'), withPhotographyData: has('photography'), withSeniorData: has('seniors'), withAccessibilityData: has('reducedMobility'), withWalkingData: has('lowWalking'), withPricingMode: C.filter(p => p.priceMode && p.priceMode !== 'UNKNOWN').length, withVisitDuration: C.filter(p => { var _a, _b; return ((_a = p.visit) === null || _a === void 0 ? void 0 : _a.ideal) || ((_b = p.visit) === null || _b === void 0 ? void 0 : _b.raw); }).length, withTransportData: C.filter(p => { var _a, _b, _c; return ((_a = p.transport) === null || _a === void 0 ? void 0 : _a.raw) || ((_c = (_b = p.transport) === null || _b === void 0 ? void 0 : _b.modes) === null || _c === void 0 ? void 0 : _c.length); }).length, trailProfiles: C.filter(p => p.trailProfile).length, unknownCriticalFields: C.reduce((n, p) => n + ['priceMode', 'availability'].filter(k => { var _a; return !p[k] || p[k] === 'UNKNOWN' || ((_a = p[k]) === null || _a === void 0 ? void 0 : _a.state) === 'UNKNOWN'; }).length, 0), averageCoverage: Math.round(C.reduce((a, p) => a + (p.coverageScore || 0), 0) / Math.max(1, C.length)) }; window.__ERNESTINHO_RECOMMENDATION_COVERAGE__ = cov; window.__ERNESTINHO_INTELLIGENCE_V4__ = { version: '4.2', catalog: C, coverage: cov, getCanonicalEntity, getCanonicalRoute, getRecommendationProfile, getCurrentAvailability, rankEntities }; return cov; }
window.__ERNESTINHO_RUN_V42_COVERAGE__ = () => { try {
    return v42BuildCoverage();
}
catch (e) {
    console.warn('V4.2 coverage debug', e);
    return null;
} };
try {
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, { "¿Va contigo?": "Combina com você?", "No te digo solamente si puedes ir: te digo para quién y cuándo realmente lo recomiendo.": "Não digo apenas se você pode ir: mostro para quem e quando realmente recomendo.", "Niños": "Crianças", "Adolescentes": "Adolescentes", "Familias": "Famílias", "Lluvia": "Chuva", "Lluvia fuerte": "Chuva forte", "Fotos": "Fotos", "Movilidad reducida": "Mobilidade reduzida", "Adultos mayores": "Idosos", "Aire libre": "Ao ar livre", "Naturaleza": "Natureza", "Poco caminar": "Pouca caminhada", "Pareja": "Casal", "Viajar solo": "Viajar sozinho", "Primera vez": "Primeira vez", "Ya conoces Río": "Já conhece o Rio", "Gratis": "Grátis", "Cultura": "Cultura", "Ciencia": "Ciência", "Interactivo": "Interativo", "Atardecer": "Pôr do sol", "Noche": "Noite", "Edades": "Idades" });
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, { "¿Va contigo?": "Is it right for you?", "No te digo solamente si puedes ir: te digo para quién y cuándo realmente lo recomiendo.": "Not just whether you can go: who I truly recommend it for and when.", "Niños": "Children", "Adolescentes": "Teenagers", "Familias": "Families", "Lluvia": "Rain", "Lluvia fuerte": "Heavy rain", "Fotos": "Photos", "Movilidad reducida": "Reduced mobility", "Adultos mayores": "Older adults", "Aire libre": "Outdoors", "Naturaleza": "Nature", "Poco caminar": "Low walking", "Pareja": "Couples", "Viajar solo": "Solo travel", "Primera vez": "First visit", "Ya conoces Río": "Repeat visit", "Gratis": "Free", "Cultura": "Culture", "Ciencia": "Science", "Interactivo": "Interactive", "Atardecer": "Sunset", "Noche": "Night", "Edades": "Ages" });
}
catch (e) { }
try {
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, { "PLANIFICA TU VISITA": "PLANEJE SUA VISITA", "Abierto ahora": "Aberto agora", "Cerrado ahora": "Fechado agora", "Abre más tarde": "Abre mais tarde", "Poco tiempo disponible": "Pouco tempo disponível", "Horario por confirmar": "Horário a confirmar", "Disponibilidad variable": "Disponibilidade variável", "Requiere reserva": "Requer reserva", "EXCELENTES, PERO NO AHORA": "EXCELENTES, MAS NÃO AGORA", "Buenas opciones que fallan por horario, tiempo útil o reserva.": "Boas opções que não servem agora por horário, tempo útil ou reserva.", "VER EXPERIENCIA": "VER EXPERIÊNCIA", "Sin límite artificial de seis.": "Sem limite artificial de seis." });
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, { "PLANIFICA TU VISITA": "PLAN YOUR VISIT", "Abierto ahora": "Open now", "Cerrado ahora": "Closed now", "Abre más tarde": "Opens later", "Poco tiempo disponible": "Not enough time", "Horario por confirmar": "Hours to confirm", "Disponibilidad variable": "Variable availability", "Requiere reserva": "Reservation required", "EXCELENTES, PERO NO AHORA": "GREAT, BUT NOT RIGHT NOW", "Buenas opciones que fallan por horario, tiempo útil o reserva.": "Good options that do not work right now because of hours, time needed, or reservation.", "VER EXPERIENCIA": "VIEW EXPERIENCE", "Sin límite artificial de seis.": "No artificial six-result limit." });
}
catch (e) { }

// Gastronomía externalizada en gastronomy-data.js
const normalizarGastroNueva = (valor = '') => String(valor).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9$]+/g, ' ').trim();
const textoVisibleGastroNueva = html => String(html || '').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ').replace(/&amp;/gi, '&').replace(/\s+/g, ' ');
const GASTRONOMIA_INDICE_BUSQUEDA = new Map((window.GASTRONOMIA_NUEVAS_CARDS || []).map(card => [card.id, normalizarGastroNueva(`${card.title} ${(card.tags || []).join(' ')} ${card.desc || card.descripcion || ''}`)]));

const intencionGastroNueva = consulta => {
    const q = normalizarGastroNueva(consulta);
    if (!q)
        return null;
    if (/acompanamientos? rotativos?|guarniciones? rotativas?|sequencia de acompanhamentos|rotating sides/.test(q))
        return 'rotativos';
    if (/frutos do mar|frutos del mar|seafood/.test(q))
        return 'mariscos';
    if (/cafe da manha|coffee and breakfast/.test(q))
        return 'cafe';
    if (/con vista|com vista|with a view/.test(q))
        return 'vista';
    const aliases = { almuerzo: 'almuerzo', almorzar: 'almuerzo', almoco: 'almuerzo', almocar: 'almuerzo', lunch: 'almuerzo', cena: 'cena', cenar: 'cena', jantar: 'cena', dinner: 'cena', cafe: 'cafe', desayuno: 'cafe', breakfast: 'cafe', brunch: 'cafe', barato: 'economico', economico: 'economico', budget: 'economico', pf: 'economico', sushi: 'asiatica', asiatica: 'asiatica', japonesa: 'asiatica', japones: 'asiatica', carne: 'carnes', carnes: 'carnes', churrasco: 'carnes', rodizio: 'carnes', pescado: 'mariscos', pescados: 'mariscos', mariscos: 'mariscos', seafood: 'mariscos', pizza: 'italiana', italiana: 'italiana', pasta: 'italiana', boteco: 'carioca', carioca: 'carioca', brasilena: 'carioca', brasileira: 'carioca', vegetariana: 'vegetariana', vegana: 'vegetariana', vista: 'vista', rooftop: 'vista', experiencia: 'experiencia', especial: 'experiencia' };
    return q.split(/\s+/).map(p => aliases[p]).find(Boolean) || null;
};
function GastronomiaAfinada(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/GastronomiaAfinada.js?v=20260922',name:'GastronomiaAfinada',componentProps:props,dataUrls:["/data/otros-datos-extra-lazy.json"]})}
function cafeRioWhatsApp(producto, precio, idioma = 'es', coleccion = false) {
    const nombres = {
        trufado: { es: 'Café Rio Chocolate Trufado', pt: 'Café Rio Chocolate Trufado', en: 'Café Rio Truffled Chocolate' },
        tradicional: { es: 'Café Rio 100% Arábica Tradicional', pt: 'Café Rio 100% Arábica Tradicional', en: 'Café Rio Traditional 100% Arabica' },
        menta: { es: 'Café Rio Chocolate con Menta', pt: 'Café Rio Chocolate com Menta', en: 'Café Rio Mint Chocolate' },
        caramelo: { es: 'Café Rio con Caramelo', pt: 'Café Rio com Caramelo', en: 'Café Rio Caramel Coffee' },
        avellanas: { es: 'Café Rio Chocolate con Avellanas', pt: 'Café Rio Chocolate com Avelãs', en: 'Café Rio Hazelnut Chocolate' },
        coleccion: { es: 'la colección completa de los 5 Cafés Rio', pt: 'a coleção completa dos 5 Cafés Rio', en: 'the complete collection of 5 Café Rio flavors' }
    };
    const langCafe = ['es', 'pt', 'en'].includes(idioma) ? idioma : 'es';
    const nombre = nombres[producto][langCafe];
    const mensaje = coleccion
        ? (langCafe === 'pt'
            ? `Olá, Ernestinho! Quero comprar ${nombre} por ${precio}.`
            : langCafe === 'en'
                ? `Hi, Ernestinho! I would like to buy ${nombre} for ${precio}.`
                : `Hola, Ernestinho. Quiero comprar ${nombre} por ${precio}.`)
        : (langCafe === 'pt'
            ? `Olá, Ernestinho! Quero comprar o ${nombre} por ${precio}.`
            : langCafe === 'en'
                ? `Hi, Ernestinho! I would like to buy ${nombre} for ${precio}.`
                : `Hola, Ernestinho. Quiero comprar el ${nombre} por ${precio}.`);
    return `https://wa.me/5521969946938?text=${encodeURIComponent(mensaje)}`;
}
let __hospedajeDataPromise = null;
function ensureHospedajeCatalogData() {
    if (window.HOSPEDAJE_CATALOGO_B64) return Promise.resolve(window.HOSPEDAJE_CATALOGO_B64);
    if (__hospedajeDataPromise) return __hospedajeDataPromise;
    __hospedajeDataPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/assets/hospedaje-catalog-data.js';
        script.async = true;
        script.onload = () => window.HOSPEDAJE_CATALOGO_B64 ? resolve(window.HOSPEDAJE_CATALOGO_B64) : reject(new Error('Hospedaje catalog data missing'));
        script.onerror = () => { __hospedajeDataPromise = null; reject(new Error('No se pudo cargar el catálogo de hospedaje')); };
        document.head.appendChild(script);
    });
    return __hospedajeDataPromise;
}

let __hospedajeOverlay = null;
let __hospedajeBlobUrl = null;
function closeHospedajeCatalogo() {
    if (__hospedajeOverlay) {
        __hospedajeOverlay.remove();
        __hospedajeOverlay = null;
    }
    if (__hospedajeBlobUrl) {
        URL.revokeObjectURL(__hospedajeBlobUrl);
        __hospedajeBlobUrl = null;
    }
    document.body.style.overflow = '';
}
async function openHospedajeCatalogo(lang = 'es') {
    closeHospedajeCatalogo();
    const hospedajeCatalogoB64 = await ensureHospedajeCatalogData();
    const bytes = Uint8Array.from(atob(hospedajeCatalogoB64), c => c.charCodeAt(0));
    __hospedajeBlobUrl = URL.createObjectURL(new Blob([bytes], { type: 'text/html;charset=utf-8' }));
    __hospedajeOverlay = document.createElement('div');
    __hospedajeOverlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#f8f6f1;';
    const frame = document.createElement('iframe');
    frame.title = lang === 'pt' ? 'Hospedagens Ernestinho Carioca' : (lang === 'en' ? 'Ernestinho Carioca stays' : 'Alojamientos Ernestinho Carioca');
    frame.src = __hospedajeBlobUrl + '#' + (['es', 'pt', 'en'].includes(lang) ? lang : 'es');
    frame.style.cssText = 'width:100%;height:100%;border:0;background:#f8f6f1;';
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = lang === 'pt' ? '← VOLTAR PARA ONDE FICAR' : (lang === 'en' ? '← BACK TO WHERE TO STAY' : '← VOLVER A DÓNDE ALOJARSE');
    close.setAttribute('aria-label', close.textContent);
    close.style.cssText = 'position:absolute;top:14px;left:14px;z-index:100001;background:#101010;color:#fff;border:1px solid #d7a62b;border-radius:999px;padding:12px 16px;font:800 12px Arial;box-shadow:none!important;cursor:pointer;';
    close.onclick = closeHospedajeCatalogo;
    __hospedajeOverlay.appendChild(frame);
    __hospedajeOverlay.appendChild(close);
    document.body.appendChild(__hospedajeOverlay);
    document.body.style.overflow = 'hidden';
}

    // AUDITORIA V5 FINAL · Guía de Río + fichas individuales de Experiencias verificadas ES/PT/EN.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, (window.__EC_HEAVY_TRANSLATIONS__||{}).early_pt||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, (window.__EC_HEAVY_TRANSLATIONS__||{}).early_en||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, {"Full Day Río de Janeiro":"Full Day Rio de Janeiro","días de semana":"dias de semana","Pan de Azúcar y Morro da Urca":"Pão de Açúcar e Morro da Urca","Realizaremos una parada externa para fotografías frente al mítico Estádio Jornalista Mário Filho, conocido mundialmente como Maracanã.":"Faremos uma parada externa para fotos em frente ao mítico Estádio Jornalista Mário Filho, conhecido mundialmente como Maracanã.","Uno de los estadios más famosos de la historia del fútbol y escenario de grandes acontecimientos deportivos.":"Um dos estádios mais famosos da história do futebol e palco de grandes acontecimentos esportivos.","Sambódromo de Río de Janeiro":"Sambódromo do Rio de Janeiro","Catedral Metropolitana de Río":"Catedral Metropolitana do Rio","Escaleras de Selarón":"Escadaria Selarón","Búzios ":"Búzios ","Descubre Búzios, la perla de la Región de Lagos, en la costa norte del Estado de Río de Janeiro. A aproximadamente 160 km de la ciudad de Río, Búzios reúne playas de diferentes formas y paisajes que pueden disfrutarse durante todo el año.":"Descubra Búzios, a pérola da Região dos Lagos, no litoral norte do Estado do Rio de Janeiro. A aproximadamente 160 km da cidade do Rio, Búzios reúne praias de diferentes formatos e paisagens que podem ser aproveitadas durante todo o ano.","El viaje desde Río hasta Armação de Búzios dura aproximadamente 2 horas y 40 minutos, dependiendo de las condiciones del tráfico. Al llegar, embarcaremos en la goleta para comenzar nuestro recorrido por algunas de las playas más bonitas de la región.":"A viagem do Rio até Armação dos Búzios dura aproximadamente 2 horas e 40 minutos, dependendo das condições do trânsito. Ao chegar, embarcaremos na escuna para iniciar nosso passeio por algumas das praias mais bonitas da região.","Playa João Fernandes en Búzios":"Praia João Fernandes em Búzios","Praia da Tartaruga en Búzios":"Praia da Tartaruga em Búzios","Rua das Pedras en Búzios":"Rua das Pedras em Búzios","Información importante sobre el paseo en goleta":"Informações importantes sobre o passeio de escuna","La embarcación cuenta con música, servicio de bar y baños. Las goletas en Búzios no tienen permiso para acercarse a la franja de arena, por lo que los pasajeros pueden nadar únicamente alrededor de la embarcación, utilizando flotadores tipo \"fideos\".":"A embarcação conta com música, serviço de bar e banheiros. As escunas em Búzios não têm permissão para se aproximar da faixa de areia, por isso os passageiros podem nadar apenas ao redor da embarcação, utilizando flutuadores tipo macarrão.","Cristo Redentor en Río de Janeiro":"Cristo Redentor no Rio de Janeiro","Catedral Metropolitana de Río de Janeiro":"Catedral Metropolitana do Rio de Janeiro","Información para familias":"Informações para famílias","Playa Cataguases":"Praia de Cataguases","Una de las paradas más esperadas del recorrido. Blue Lagoon es un verdadero acuario natural, donde tendremos alrededor de 40 minutos para nadar y bucear alrededor del barco.":"Uma das paradas mais esperadas do passeio. A Lagoa Azul é um verdadeiro aquário natural, onde teremos cerca de 40 minutos para nadar e mergulhar ao redor do barco.","Dentro del barco también es posible alquilar máscaras de buceo. Quienes lo deseen pueden contratar fotografías profesionales bajo el agua.":"Dentro do barco também é possível alugar máscaras de mergulho. Quem desejar pode contratar fotografias profissionais debaixo d’água.","En Japariz Beach realizaremos el almuerzo en un restaurante rústico de cocina casera. La región es de preservación natural y cuenta con una infraestructura sencilla.":"Na Praia de Japariz almoçaremos em um restaurante rústico de comida caseira. A região é de preservação natural e conta com infraestrutura simples.","El almuerzo está incluido. Bebidas y postres no están incluidos. Después de comer tendremos tiempo para disfrutar de la playa.":"O almoço está incluído. Bebidas e sobremesas não estão incluídas. Depois de comer teremos tempo para aproveitar a praia.","Playa de Santana o Araça":"Praia de Santana ou Araçá","Guía turístico":"Guia turístico"});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, {"Full Day Río de Janeiro":"Full Day Rio de Janeiro","días de semana":"weekdays","Pan de Azúcar y Morro da Urca":"Sugarloaf Mountain and Morro da Urca","Realizaremos una parada externa para fotografías frente al mítico Estádio Jornalista Mário Filho, conocido mundialmente como Maracanã.":"We will make an outside stop for photos in front of the legendary Estádio Jornalista Mário Filho, known worldwide as Maracanã.","Uno de los estadios más famosos de la historia del fútbol y escenario de grandes acontecimientos deportivos.":"One of the most famous stadiums in football history and the setting for major sporting events.","Sambódromo de Río de Janeiro":"Rio de Janeiro Sambadrome","Catedral Metropolitana de Río":"Rio Metropolitan Cathedral","Escaleras de Selarón":"Selarón Steps","Búzios ":"Búzios ","Descubre Búzios, la perla de la Región de Lagos, en la costa norte del Estado de Río de Janeiro. A aproximadamente 160 km de la ciudad de Río, Búzios reúne playas de diferentes formas y paisajes que pueden disfrutarse durante todo el año.":"Discover Búzios, the pearl of the Região dos Lagos, on the northern coast of Rio de Janeiro State. About 160 km from the city of Rio, Búzios offers beaches of different shapes and landscapes that can be enjoyed throughout the year.","El viaje desde Río hasta Armação de Búzios dura aproximadamente 2 horas y 40 minutos, dependiendo de las condiciones del tráfico. Al llegar, embarcaremos en la goleta para comenzar nuestro recorrido por algunas de las playas más bonitas de la región.":"The journey from Rio to Armação dos Búzios takes approximately 2 hours and 40 minutes, depending on traffic conditions. On arrival, we will board the schooner to begin our tour of some of the region’s most beautiful beaches.","Playa João Fernandes en Búzios":"João Fernandes Beach in Búzios","Praia da Tartaruga en Búzios":"Praia da Tartaruga in Búzios","Rua das Pedras en Búzios":"Rua das Pedras in Búzios","Información importante sobre el paseo en goleta":"Important information about the schooner cruise","La embarcación cuenta con música, servicio de bar y baños. Las goletas en Búzios no tienen permiso para acercarse a la franja de arena, por lo que los pasajeros pueden nadar únicamente alrededor de la embarcación, utilizando flotadores tipo \"fideos\".":"The boat has music, bar service and restrooms. Schooners in Búzios are not permitted to approach the shoreline, so passengers may swim only around the boat, using pool-noodle floats.","Cristo Redentor en Río de Janeiro":"Christ the Redeemer in Rio de Janeiro","Catedral Metropolitana de Río de Janeiro":"Rio de Janeiro Metropolitan Cathedral","Información para familias":"Information for families","Playa Cataguases":"Cataguases Beach","Una de las paradas más esperadas del recorrido. Blue Lagoon es un verdadero acuario natural, donde tendremos alrededor de 40 minutos para nadar y bucear alrededor del barco.":"One of the most anticipated stops on the tour. Blue Lagoon is a true natural aquarium, where we will have around 40 minutes to swim and snorkel around the boat.","Dentro del barco también es posible alquilar máscaras de buceo. Quienes lo deseen pueden contratar fotografías profesionales bajo el agua.":"Snorkeling masks can also be rented on board. Those who wish can purchase professional underwater photographs.","En Japariz Beach realizaremos el almuerzo en un restaurante rústico de cocina casera. La región es de preservación natural y cuenta con una infraestructura sencilla.":"At Japariz Beach we will have lunch at a rustic restaurant serving home-style food. The area is environmentally preserved and has simple infrastructure.","El almuerzo está incluido. Bebidas y postres no están incluidos. Después de comer tendremos tiempo para disfrutar de la playa.":"Lunch is included. Drinks and desserts are not included. After eating we will have time to enjoy the beach.","Playa de Santana o Araça":"Santana or Araçá Beach","Guía turístico":"Tour guide"});

const __ecRouteChunkCache=new Map();
function __ecRouteChunk(src){
  if(__ecRouteChunkCache.has(src))return __ecRouteChunkCache.get(src);
  const p=new Promise((ok,fail)=>{const x=document.createElement('script');x.src=src;x.async=true;x.onload=ok;x.onerror=fail;document.head.appendChild(x);});
  __ecRouteChunkCache.set(src,p);return p;
}
function ECLazyRoute({src,name,componentProps,dataUrls=[]}){
  const [C,setC]=React.useState(()=>window[name]||null);
  React.useEffect(()=>{let live=true;const prep=()=>Promise.all((dataUrls||[]).map(u=>window.__ecLoadData?window.__ecLoadData(u):Promise.resolve()));prep().then(()=>window[name]?null:__ecRouteChunk(src)).then(()=>{if(live)setC(()=>window[name]||null)}).catch(e=>console.error('EC lazy route',name,e));return()=>{live=false}},[src,name,JSON.stringify(dataUrls||[])]);
  return C?React.createElement(C,componentProps||{}):React.createElement('div',{className:'p-6 text-center'},'Cargando…');
}

function ECExperienceDetail(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/experience-details.js?v=20260923',name:'ECExperienceDetailChunk',componentProps:props})}
function ECLazySection({group,section,sectionProps}){return React.createElement(ECLazyRoute,{src:'/assets/chunks/section-'+group+'.js?v=20260923',name:'ECSection_'+group,componentProps:{section,...(sectionProps||{})}})}
function AppErnestinho(){
    var _a;
    const rutaSeoInicial = seoResolveRoute(window.location.pathname);
    const [seccionActual, setSeccionActualBase] = useState(rutaSeoInicial.seccion);
    const [historialSecciones, setHistorialSecciones] = useState([]);
    const [temaGuia, setTemaGuia] = useState(rutaSeoInicial.temaGuia || null);
    const [consejoSeleccionado, setConsejoSeleccionado] = useState(rutaSeoInicial.consejoId ? (CONSEJOS_NUEVOS.find(x => x.id === rutaSeoInicial.consejoId) || null) : null);
    const [modoTransportePublico, setModoTransportePublico] = useState(null);
    const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(rutaSeoInicial.restaurante || null);
    const [barrioSeleccionado, setBarrioSeleccionado] = useState(rutaSeoInicial.barrio || null);
    const setSeccionActual = async (destino) => {
        if (typeof destino !== 'string')
            return;
        if (__EC_CULTURE_SECTIONS.has(destino)) {
            try { await __ecEnsureCultureData(); } catch (e) { console.error(e); return; }
        }
        if (destino === seccionActual) {
            if (destino === 'guia' && temaGuia)
                setTemaGuia(null);
            const mismaRuta = seoPathForSection(destino);
            if (mismaRuta)
                seoNavigate(mismaRuta);
            return;
        }
        if (destino === 'guia')
            setTemaGuia(null);
        const rutaDestino = seoPathForSection(destino);
        if (rutaDestino)
            seoNavigate(rutaDestino);
        setHistorialSecciones(prev => [...prev, seccionActual].slice(-50));
        setSeccionActualBase(destino);
    };
    const volverUnaVista = () => {
        if (seccionActual === 'guia' && temaGuia) {
            seoNavigate('/guia');
            setTemaGuia(null);
            return;
        }
        if (seccionActual === 'consejos' && consejoSeleccionado) {
            seoNavigate('/consejos');
            setConsejoSeleccionado(null);
            return;
        }
        if (seccionActual === 'transporte_publico' && modoTransportePublico) {
            setModoTransportePublico(null);
            return;
        }
        if (seccionActual === 'gastronomia') {
            seoNavigate('/gastronomia');
            setRestauranteSeleccionado(null);
            return;
        }
        if (seccionActual === 'barrios' && barrioSeleccionado) {
            seoNavigate('/barrios');
            setBarrioSeleccionado(null);
            return;
        }
        const anterior = historialSecciones[historialSecciones.length - 1] || 'inicio';
        if (seccionActual === 'articulo_detalle') setArticuloSeleccionado(null);
        setHistorialSecciones(prev => prev.slice(0, -1));
        const rutaAnterior = seoPathForSection(anterior);
        if (rutaAnterior)
            seoNavigate(rutaAnterior);
        setSeccionActualBase(anterior);
    };
    const [museoSeleccionado, setMuseoSeleccionado] = useState(rutaSeoInicial.museoId || null);
    const [selectorMuseosAbierto, setSelectorMuseosAbierto] = useState(false);
    const [busquedaMuseo, setBusquedaMuseo] = useState('');
    const [categoriaCompras, setCategoriaCompras] = useState('shoppings');
    const [menuAbierto, setMenuAbierto] = useState(false);
    // MULTIDIOMA · fase 1: cabecera, navegación y portada. Español sigue siendo el contenido maestro.
    const [lang, setLang] = useState(() => {
        try {
            return localStorage.getItem('ernestinho-lang') || 'es';
        }
        catch (e) {
            return 'es';
        }
    });
    const [heavyTranslationsVersion, setHeavyTranslationsVersion] = useState(0);
    useEffect(() => {
        if (lang === 'es') return;
        let cancelled=false;
        (window.__ecEnsureLanguagePayloads?window.__ecEnsureLanguagePayloads():Promise.resolve()).then(()=>{if(!cancelled)setHeavyTranslationsVersion(v=>v+1)}).catch(e=>console.error('EC translations',e));
        return()=>{cancelled=true};
    }, [lang]);
    const hospedajeText = (es, pt, en) => lang === 'pt' ? pt : (lang === 'en' ? en : es);
    const T = (v) => { if (v == null) return v; const z=String(v); const g=(window.GLOBAL_UI_TRANSLATIONS&&window.GLOBAL_UI_TRANSLATIONS[lang])||GLOBAL_UI_TRANSLATIONS[lang]||{}; return lang==='es'?z:(g[z]||z); };
    useEffect(() => {
        try {
            localStorage.setItem('ernestinho-lang', lang);
        }
        catch (e) { }
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : (lang === 'en' ? 'en' : 'es');
    }, [lang]);
    // Capa de seguridad multidioma: traduce también textos heredados escritos directamente en JSX.
    // Conserva siempre el español original para poder cambiar de idioma sin contaminar el DOM.
    useEffect(() => {
        const root = document.getElementById('ernestinho-carioca-root');
        if (!root) return;
        const originals = window.__EC_I18N_ORIGINAL_TEXT || (window.__EC_I18N_ORIGINAL_TEXT = new WeakMap());
        const originalAttrs = window.__EC_I18N_ORIGINAL_ATTRS || (window.__EC_I18N_ORIGINAL_ATTRS = new WeakMap());
        const dict = (window.GLOBAL_UI_TRANSLATIONS && window.GLOBAL_UI_TRANSLATIONS[lang]) || {};
        const attrs = ['placeholder','title','aria-label','alt'];
        const apply = (scope) => {
            const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
            let n;
            while ((n = walker.nextNode())) {
                const parent = n.parentElement;
                if (!parent || /^(SCRIPT|STYLE|TEXTAREA|CODE|PRE)$/.test(parent.tagName)) continue;
                if (!originals.has(n)) originals.set(n, n.nodeValue);
                const original = originals.get(n);
                if (lang === 'es') { if (n.nodeValue !== original) n.nodeValue = original; continue; }
                const key = String(original || '').trim();
                if (!key || !dict[key]) continue;
                const lead = (String(original).match(/^\s*/) || [''])[0];
                const tail = (String(original).match(/\s*$/) || [''])[0];
                const next = lead + dict[key] + tail;
                if (n.nodeValue !== next) n.nodeValue = next;
            }
            const els = scope.querySelectorAll ? [scope, ...scope.querySelectorAll('*')] : [];
            els.forEach(el => {
                if (!el || !el.getAttribute) return;
                let saved = originalAttrs.get(el);
                if (!saved) { saved = {}; originalAttrs.set(el, saved); }
                attrs.forEach(a => {
                    if (!el.hasAttribute(a)) return;
                    if (!(a in saved)) saved[a] = el.getAttribute(a);
                    const original = saved[a];
                    if (lang === 'es') { if (el.getAttribute(a) !== original) el.setAttribute(a, original); return; }
                    if (dict[original]) el.setAttribute(a, dict[original]);
                });
            });
        };
        apply(root);
        const observer = new MutationObserver(mutations => {
            observer.disconnect();
            mutations.forEach(m => {
                if (m.type === 'characterData' && m.target.parentNode) apply(m.target.parentNode);
                m.addedNodes && m.addedNodes.forEach(n => { if (n.nodeType === 1) apply(n); else if (n.nodeType === 3 && n.parentNode) apply(n.parentNode); });
            });
            observer.observe(root, {subtree:true, childList:true, characterData:true});
        });
        observer.observe(root, {subtree:true, childList:true, characterData:true});
        return () => observer.disconnect();
    }, [lang, seccionActual, temaGuia]);

    const UI_TEXT = {
        es: { tagline: 'Río desde mi mirada', talk: 'Hablar con Ernestinho', back: 'Volver a la vista anterior',
            nav: { copa_para_mi: '❤️ Para mí', guia: 'Guía de Río', rio_mes_a_mes: 'Mes a mes', master4_experiencias: 'Experiencias', grandes_eventos: 'Eventos', transportes: 'Transportes', que_hacer: 'Qué Hacer', consejos: 'Consejos', playas: 'Playas', compras: 'Compras', barrios: 'Barrios', hospedaje: 'Hospedaje', cafe: 'Café Rio' } },
        pt: { tagline: 'O Rio pelo meu olhar', talk: 'Falar com Ernestinho', back: 'Voltar à tela anterior',
            nav: { copa_para_mi: '❤️ Para mim', guia: 'Guia do Rio', rio_mes_a_mes: 'Mês a mês', master4_experiencias: 'Experiências', grandes_eventos: 'Eventos', transportes: 'Transportes', que_hacer: 'O que fazer', consejos: 'Dicas', playas: 'Praias', compras: 'Compras', barrios: 'Bairros', hospedaje: 'Hospedagem', cafe: 'Café Rio' } },
        en: { tagline: 'Rio through my eyes', talk: 'Talk to Ernestinho', back: 'Back to previous view',
            nav: { copa_para_mi: '❤️ For me', guia: 'Rio Guide', rio_mes_a_mes: 'Month by month', master4_experiencias: 'Experiences', grandes_eventos: 'Events', transportes: 'Transport', que_hacer: 'Things to do', consejos: 'Tips', playas: 'Beaches', compras: 'Shopping', barrios: 'Neighborhoods', hospedaje: 'Where to stay', cafe: 'Café Rio' } }
    };
    const ui = UI_TEXT[lang] || UI_TEXT.es;
    // Traducción progresiva global: conserva primero las traducciones completas ya cargadas.
    const __EC_TRANSLATIONS_PREV = window.GLOBAL_UI_TRANSLATIONS || {pt:{},en:{}};
    GLOBAL_UI_TRANSLATIONS = window.GLOBAL_UI_TRANSLATIONS = {
        pt: { 'Historia': 'História', 'Playas': 'Praias', 'Compras': 'Compras', 'Gastronomía': 'Gastronomia', 'Fotografía': 'Fotografia', 'Experiencias': 'Experiências', 'Museos': 'Museus', 'Qué hacer': 'O que fazer', 'Barrios': 'Bairros', 'Hospedaje': 'Hospedagem', 'Consejos': 'Dicas', 'Guía': 'Guia', 'Información Útil': 'Informações úteis', 'Planificación': 'Planejamento', 'Trámites': 'Documentação', 'Música en vivo': 'Música ao vivo', 'Arte contemporáneo y arquitectura': 'Arte contemporânea e arquitetura', 'Historia & cultura': 'História e cultura', 'Experiencia aérea': 'Experiência aérea', 'Salto en paracaídas': 'Salto de paraquedas', 'Parasail en Río': 'Parasail no Rio', 'Fútbol & historia': 'Futebol e história', 'Senderismo & fotografía': 'Trilhas e fotografia', 'Fútbol en vivo': 'Futebol ao vivo', 'Pueblos indígenas y antropología': 'Povos indígenas e antropologia', 'Historia naval y patrimonio marítimo': 'História naval e patrimônio marítimo', 'Música y memoria': 'Música e memória', 'Ciencia, innovación y sostenibilidad': 'Ciência, inovação e sustentabilidade', 'Ciencia, energía y educación': 'Ciência, energia e educação', 'República, política y residencia presidencial': 'República, política e residência presidencial', 'Arte moderna y contemporánea': 'Arte moderna e contemporânea', 'Arte popular y cultura brasileña': 'Arte popular e cultura brasileira', 'Samba, carnaval y cultura afrobrasileña': 'Samba, carnaval e cultura afro-brasileira', 'Historia y cultura afrobrasileña': 'História e cultura afro-brasileira', 'Historia política y residencia histórica': 'História política e residência histórica', 'Astronomía, ciencia y tecnología': 'Astronomia, ciência e tecnologia', 'Ciencia, salud y educación': 'Ciência, saúde e educação', 'Fútbol y memoria deportiva': 'Futebol e memória esportiva', 'Historia natural, arqueología y ciencia': 'História natural, arqueologia e ciência', 'Historia de Río y patrimonio urbano': 'História do Rio e patrimônio urbano', 'Arqueología y pueblos precoloniales': 'Arqueologia e povos pré-coloniais', 'Biblioteca histórica': 'Biblioteca histórica', 'Biblioteca histórica y patrimonial': 'Biblioteca histórica e patrimonial', 'Casa histórica y centro de investigación': 'Casa histórica e centro de pesquisa', 'Librería histórica': 'Livraria histórica', 'Arte, arquitectura e investigación': 'Arte, arquitetura e pesquisa', 'Fotografía, música, literatura y memoria': 'Fotografia, música, literatura e memória', 'Librería independiente': 'Livraria independente', 'Lectura, formación y literatura': 'Leitura, formação e literatura', 'Cultura, ciudadanía y eventos': 'Cultura, cidadania e eventos', 'Historia, arte y arquitectura': 'História, arte e arquitetura', 'Cultura afrobrasileña': 'Cultura afro-brasileira', 'Música clásica y patrimonio': 'Música clássica e patrimônio', 'Historia, biblioteca y patrimonio documental': 'História, biblioteca e patrimônio documental', 'Historia política y República': 'História política e República', 'Historia naval y patrimonio': 'História naval e patrimônio', 'Artes visuales y formación artística': 'Artes visuais e formação artística', 'Música, cine y cultura brasileña': 'Música, cinema e cultura brasileira', 'Memoria africana y arqueología': 'Memória africana e arqueologia', 'Astronomía, ciencia y patrimonio': 'Astronomia, ciência e patrimônio', 'Los monumentos icónicos e imperdibles de la Ciudad Maravillosa.': 'Os monumentos icônicos e imperdíveis da Cidade Maravilhosa.', 'Sabores locales, churrasquerías y comida de playa.': 'Sabores locais, churrascarias e comida de praia.', 'Los puntos panorámicos más espectaculares para tus fotos.': 'Os pontos panorâmicos mais espetaculares para suas fotos.', '¿Por qué vale la pena visitarlo?': 'Por que vale a pena visitar?', '¿Para quién?': 'Para quem?', '¿Qué puede visitarse actualmente?': 'O que pode ser visitado atualmente?', '📍 Dirección': '📍 Endereço', '⏱️ Duración': '⏱️ Duração', '🚇 Cómo llegar': '🚇 Como chegar', 'Confirmar horario del día': 'Confirmar o horário do dia', 'Gratis': 'Grátis', 'Fácil': 'Fácil', 'Mañana': 'Amanhã', 'Sábado': 'Sábado', 'Sábados': 'Sábados', 'Miércoles': 'Quarta-feira', 'Salidas todos los días': 'Saídas todos os dias', '1 día': '1 dia', '½ día': '½ dia', 'Último día': 'Último dia', 'Río esencial': 'Rio essencial', 'Río verde': 'Rio verde', 'Sorpréndeme': 'Surpreenda-me', 'Volver': 'Voltar', 'Ver más': 'Ver mais', 'Ver detalles': 'Ver detalhes', 'Reservar': 'Reservar', 'Precio': 'Preço', 'Incluye': 'Inclui', 'No incluye': 'Não inclui', 'Importante': 'Importante', 'Recomendación': 'Recomendação', 'Seguridad': 'Segurança', 'Hoy': 'Hoje', 'Cómo llegar': 'Como chegar', 'Dónde comer': 'Onde comer', 'Dónde dormir': 'Onde ficar', 'Primera vez en Río': 'Primeira vez no Rio', "← INICIO": "← INÍCIO", "← Volver a Consejos": "← Voltar às dicas", "🔄 CAMBIÓ MI PLAN": "🔄 MEU PLANO MUDOU", "← CONOCER RÍO": "← CONHECER O RIO", "♡ MI RÍO": "♡ MEU RIO", "← Volver a Qué hacer": "← Voltar a O que fazer", "Abrir mapa": "Abrir mapa", "Almuerzo": "Almoço", "Importante:": "Importante:", "Abrir guía →": "Abrir guia →", "Regla:": "Regra:", "⭐ LO QUE YO HARÍA": "⭐ O QUE EU FARIA", "Comer": "Comer", "↻ Actualizar": "↻ Atualizar", "FOTO PENDIENTE": "FOTO PENDENTE", "← VOLVER": "← VOLTAR", "Zona": "Zona", "Dinero y pagos en Brasil": "Dinheiro e pagamentos no Brasil", "← Volver a Guía de Río": "← Voltar ao Guia do Rio", "Cómo llegar ↗": "Como chegar ↗", "❤️ RÍO PARA TI": "❤️ RIO PARA VOCÊ", "🧭 PLANIFICA TU VIAJE": "🧭 PLANEJE SUA VIAGEM", "Primera vez": "Primeira vez", "Familia": "Família", "INTERÉS": "INTERESSE", "Farmacia": "Farmácia", "Supermercado": "Supermercado", "Esta noche": "Hoje à noite", "🍽️ Tengo hambre": "🍽️ Estou com fome", "💰 Gastar poco": "💰 Gastar pouco", "ABRIR →": "ABRIR →", "ABRIR FICHA →": "ABRIR FICHA →", "✨ EXPERIENCIAS ERNESTINHO": "✨ EXPERIÊNCIAS ERNESTINHO", "👨‍👩‍👧 Familias": "👨‍👩‍👧 Famílias", "⭐ Ernestinho recomienda": "⭐ Ernestinho recomenda", "Parejas": "Casais", "Privacidad, precios y condiciones": "Privacidade, preços e condições", "Montañas, floresta y senderos": "Montanhas, floresta e trilhas", "Naturaleza de Río": "Natureza do Rio", "Montañas y senderos": "Montanhas e trilhas", "Trilhas de Río": "Trilhas do Rio", "Desde grandes clásicos y miradores hasta recorridos largos por bosques, playas y montañas.": "Dos grandes clássicos e mirantes a percursos longos por florestas, praias e montanhas.", "Distancia": "Distância", "Tiempo": "Tempo", "Dificultad": "Dificuldade", "✨ ¿Qué vas a encontrar?": "✨ O que você vai encontrar?", "Antes de entrar a una trilha": "Antes de entrar em uma trilha", "Consultar con Ernestinho": "Consultar Ernestinho", "Información y opciones": "Informações e opções", "Reserva con Ernestinho": "Reserve com Ernestinho", "Reservar por WhatsApp": "Reservar pelo WhatsApp", "Ver video": "Ver vídeo", "Ver en Instagram": "Ver no Instagram", "🇧🇷 Te lo cuento como si fuéramos juntos": "🇧🇷 Vou te contar como se estivéssemos juntos", "👀 Qué vas a encontrar": "👀 O que você vai encontrar", "❤️ Ideal para": "❤️ Ideal para", "🗺️ Combínalo con": "🗺️ Combine com", "✨ No te vayas sin...": "✨ Não vá embora sem...", "🎒 Antes de ir": "🎒 Antes de ir", "🧭 Cómo lo haría yo": "🧭 Como eu faria", "Sabores desde mi mirada": "Sabores pelo meu olhar", "Dónde comer en Río de Janeiro": "Onde comer no Rio de Janeiro", "¿Qué quieres comer?": "O que você quer comer?", "Tipo de comida": "Tipo de comida", "Ver información y mapa": "Ver informações e mapa", "No encontramos coincidencias": "Não encontramos resultados", "Prueba otra zona, categoría o palabra.": "Tente outra região, categoria ou palavra.", "Consejo de Ernestinho": "Dica do Ernestinho", "Consultar a Ernestinho": "Consultar Ernestinho", "Río después del atardecer": "Rio depois do pôr do sol", "Vida nocturna": "Vida noturna", "Día": "Dia", "Estilo": "Estilo", "Mapa y agenda": "Mapa e programação", "Antes de salir": "Antes de sair", "GUÍA PIX": "GUIA PIX", "Lo esencial para un extranjero": "O essencial para um estrangeiro", "Cómo pagar paso a paso": "Como pagar passo a passo", "Señales de alerta": "Sinais de alerta", "La ciudad desde tu cámara": "A cidade pela sua câmera", "Fotografiar Río": "Fotografar o Rio", "Cámara, celular y drones": "Câmera, celular e drones", "Antes y durante tu viaje": "Antes e durante sua viagem", "Prepara tu viaje, llega tranquilo y encuentra rápidamente la información esencial.": "Prepare sua viagem, chegue tranquilo e encontre rapidamente as informações essenciais.", "Viajar atento no significa viajar con miedo.": "Viajar atento não significa viajar com medo.", "Ejemplo:": "Exemplo:", "Qué hacer:": "O que fazer:", "¿Necesitas ayuda?": "Precisa de ajuda?", "Feria nocturna de Copacabana": "Feira noturna de Copacabana", "Conocer el café": "Conhecer o café", "Las 50 respuestas rápidas": "As 50 respostas rápidas", "Plan recomendado:": "Plano recomendado:", "Revisa:": "Confira:", "Haz esto:": "Faça isto:", "⭐ Regla de Ernestinho": "⭐ Regra do Ernestinho", "Lista divertida para tu primera visita": "Lista divertida para sua primeira visita", "Supermercados y mercados para ubicarte": "Supermercados e mercados para se localizar", "Tu primera experiencia, paso a paso": "Sua primeira experiência, passo a passo", "Ver en el mapa ↗": "Ver no mapa ↗", "Desafío diario": "Desafio diário", "Saldo": "Saldo", "← VOLVER A CONSEJOS": "← VOLTAR ÀS DICAS", "Recorridos para hacer por tu cuenta": "Roteiros para fazer por conta própria", "Del mar a la historia: Zona Portuaria + Centro": "Do mar à história: Zona Portuária + Centro", "A pie": "A pé", "Mejor de mañana": "Melhor pela manhã", "7 paradas": "7 paradas", "Un Río que puedes descubrir por tu cuenta": "Um Rio que você pode descobrir por conta própria", "comenzar por la mañana": "começar pela manhã", "🎭 Parada extra 0": "🎭 Parada extra 0", "Empieza con Carnaval Experience": "Comece com Carnaval Experience", "Socio oficial · 5% de descuento": "Parceiro oficial · 5% de desconto", "Comprar con 5% de descuento ↗": "Comprar com 5% de desconto ↗", "Ver en la guía →": "Ver no guia →", "Mapa interactivo": "Mapa interativo", "Sigue el recorrido en Google Maps": "Siga o roteiro no Google Maps", "Abrir ruta completa ↗": "Abrir roteiro completo ↗", "💛 Consejo final de Ernestinho": "💛 Dica final do Ernestinho", "☀️ Mañana:": "☀️ Manhã:", "🌤️ Tarde:": "🌤️ Tarde:", "🌙 Noche:": "🌙 Noite:", "Plan alternativo:": "Plano alternativo:", "Abrir ruta del día ↗": "Abrir roteiro do dia ↗", "Consejos reales y sin complicaciones": "Dicas reais e sem complicação", "Consejos de Ernestinho": "Dicas do Ernestinho", "Consejos esenciales": "Dicas essenciais", "Leer →": "Ler →", "YA ESTÁ EN LA GUÍA": "JÁ ESTÁ NO GUIA", "Documentos, visado, vacunas, maleta y electricidad": "Documentos, visto, vacinas, bagagem e eletricidade", "Abrir Guía de Río →": "Abrir Guia do Rio →", "Organiza y vive tu viaje": "Organize e viva sua viagem", "← Volver a todos los transportes": "← Voltar a todos os transportes", "Ideal para": "Ideal para", "Tarifa": "Tarifa", "Cómo pagar": "Como pagar", "Horarios y tarifas oficiales": "Horários e tarifas oficiais", "Moverse sin perderse": "Circular sem se perder", "TRANSPORTE EN RÍO": "TRANSPORTE NO RIO", "¿Muchas maletas, niños o un grupo?": "Muitas malas, crianças ou um grupo?", "Cotizar con Ernestinho": "Pedir orçamento ao Ernestinho", "📖 Copacabana en el tiempo": "📖 Copacabana através do tempo", "De Sacopenapã a la gran postal urbana.": "De Sacopenapã ao grande cartão-postal urbano.", "🗺️ No existe “el mejor Posto”": "🗺️ Não existe “o melhor Posto”", "Existe el Posto que funciona mejor para lo que tú quieres hacer.": "Existe o Posto que funciona melhor para o que você quer fazer.", "🏛️ Mira arriba": "🏛️ Olhe para cima", "🎵 Copacabana también se escucha": "🎵 Copacabana também se ouve", "🤫 Historias para descubrir caminando": "🤫 Histórias para descobrir caminhando", "🇧🇷 Diez maneras de vivir Copacabana": "🇧🇷 Dez maneiras de viver Copacabana", "🗺️ Rutas Ernestinho": "🗺️ Roteiros Ernestinho", "No son listas: son secuencias": "Não são listas: são sequências", "❤️ Copacabana para ti": "❤️ Copacabana para você", "El mismo barrio, distintas necesidades": "O mesmo bairro, necessidades diferentes", "Río no es una lista.": "Rio não é uma lista.", "Es una decisión.": "É uma decisão.", "Según el momento": "De acordo com o momento", "Entiende Río": "Entenda o Rio", "Explorar barrios →": "Explorar bairros →", "Abrir consejos/SOS →": "Abrir dicas/SOS →", "Ver experiencias →": "Ver experiências →", "PRINCIPIO DEL SISTEMA": "PRINCÍPIO DO SISTEMA", "La parte práctica del barrio": "A parte prática do bairro", "ABRIR MAPA ↗": "ABRIR MAPA ↗", "Necesidades rápidas": "Necessidades rápidas", "La ciudad cambia contigo.": "A cidade muda com você.", "📅 RÍO MES A MES": "📅 RIO MÊS A MÊS", "La fecha también decide.": "A data também decide." },
        en: { 'Historia': 'History', 'Playas': 'Beaches', 'Compras': 'Shopping', 'Gastronomía': 'Food & dining', 'Fotografía': 'Photography', 'Experiencias': 'Experiences', 'Museos': 'Museums', 'Qué hacer': 'Things to do', 'Barrios': 'Neighborhoods', 'Hospedaje': 'Where to stay', 'Consejos': 'Tips', 'Guía': 'Guide', 'Información Útil': 'Useful information', 'Planificación': 'Planning', 'Trámites': 'Documents & procedures', 'Música en vivo': 'Live music', 'Arte contemporáneo y arquitectura': 'Contemporary art and architecture', 'Historia & cultura': 'History & culture', 'Experiencia aérea': 'Aerial experience', 'Salto en paracaídas': 'Skydiving', 'Parasail en Río': 'Parasailing in Rio', 'Fútbol & historia': 'Football & history', 'Senderismo & fotografía': 'Hiking & photography', 'Fútbol en vivo': 'Live football', 'Pueblos indígenas y antropología': 'Indigenous peoples and anthropology', 'Historia naval y patrimonio marítimo': 'Naval history and maritime heritage', 'Música y memoria': 'Music and memory', 'Ciencia, innovación y sostenibilidad': 'Science, innovation and sustainability', 'Ciencia, energía y educación': 'Science, energy and education', 'República, política y residencia presidencial': 'Republic, politics and presidential residence', 'Arte moderna y contemporánea': 'Modern and contemporary art', 'Arte popular y cultura brasileña': 'Folk art and Brazilian culture', 'Samba, carnaval y cultura afrobrasileña': 'Samba, Carnival and Afro-Brazilian culture', 'Historia y cultura afrobrasileña': 'Afro-Brazilian history and culture', 'Historia política y residencia histórica': 'Political history and historic residence', 'Astronomía, ciencia y tecnología': 'Astronomy, science and technology', 'Ciencia, salud y educación': 'Science, health and education', 'Fútbol y memoria deportiva': 'Football and sporting heritage', 'Historia natural, arqueología y ciencia': 'Natural history, archaeology and science', 'Historia de Río y patrimonio urbano': 'Rio history and urban heritage', 'Arqueología y pueblos precoloniales': 'Archaeology and pre-colonial peoples', 'Biblioteca histórica': 'Historic library', 'Biblioteca histórica y patrimonial': 'Historic and heritage library', 'Casa histórica y centro de investigación': 'Historic house and research center', 'Librería histórica': 'Historic bookstore', 'Arte, arquitectura e investigación': 'Art, architecture and research', 'Fotografía, música, literatura y memoria': 'Photography, music, literature and memory', 'Librería independiente': 'Independent bookstore', 'Lectura, formación y literatura': 'Reading, education and literature', 'Cultura, ciudadanía y eventos': 'Culture, citizenship and events', 'Historia, arte y arquitectura': 'History, art and architecture', 'Cultura afrobrasileña': 'Afro-Brazilian culture', 'Música clásica y patrimonio': 'Classical music and heritage', 'Historia, biblioteca y patrimonio documental': 'History, library and documentary heritage', 'Historia política y República': 'Political history and the Republic', 'Historia naval y patrimonio': 'Naval history and heritage', 'Artes visuales y formación artística': 'Visual arts and art education', 'Música, cine y cultura brasileña': 'Music, film and Brazilian culture', 'Memoria africana y arqueología': 'African memory and archaeology', 'Astronomía, ciencia y patrimonio': 'Astronomy, science and heritage', 'Los monumentos icónicos e imperdibles de la Ciudad Maravillosa.': 'The iconic must-see landmarks of the Marvelous City.', 'Sabores locales, churrasquerías y comida de playa.': 'Local flavors, steakhouses and beach food.', 'Los puntos panorámicos más espectaculares para tus fotos.': 'The most spectacular viewpoints for your photos.', '¿Por qué vale la pena visitarlo?': 'Why is it worth visiting?', '¿Para quién?': 'Who is it for?', '¿Qué puede visitarse actualmente?': 'What can you visit now?', '📍 Dirección': '📍 Address', '⏱️ Duración': '⏱️ Duration', '🚇 Cómo llegar': '🚇 How to get there', 'Confirmar horario del día': 'Confirm today’s opening hours', 'Gratis': 'Free', 'Fácil': 'Easy', 'Mañana': 'Tomorrow', 'Sábado': 'Saturday', 'Sábados': 'Saturdays', 'Miércoles': 'Wednesday', 'Salidas todos los días': 'Departures every day', '1 día': '1 day', '½ día': '½ day', 'Último día': 'Last day', 'Río esencial': 'Essential Rio', 'Río verde': 'Green Rio', 'Sorpréndeme': 'Surprise me', 'Volver': 'Back', 'Ver más': 'See more', 'Ver detalles': 'View details', 'Reservar': 'Book', 'Precio': 'Price', 'Incluye': 'Includes', 'No incluye': 'Not included', 'Importante': 'Important', 'Recomendación': 'Recommendation', 'Seguridad': 'Safety', 'Hoy': 'Today', 'Cómo llegar': 'How to get there', 'Dónde comer': 'Where to eat', 'Dónde dormir': 'Where to stay', 'Primera vez en Río': 'First time in Rio', "← INICIO": "← HOME", "← Volver a Consejos": "← Back to Tips", "🔄 CAMBIÓ MI PLAN": "🔄 MY PLAN CHANGED", "← CONOCER RÍO": "← DISCOVER RIO", "♡ MI RÍO": "♡ MY RIO", "← Volver a Qué hacer": "← Back to Things to do", "Abrir mapa": "Open map", "Almuerzo": "Lunch", "Transporte": "Transport", "Importante:": "Important:", "Abrir guía →": "Open guide →", "Regla:": "Rule:", "⭐ LO QUE YO HARÍA": "⭐ WHAT I WOULD DO", "Comer": "Eat", "↻ Actualizar": "↻ Refresh", "FOTO PENDIENTE": "PHOTO PENDING", "← VOLVER": "← BACK", "Zona": "Area", "Dinero y pagos en Brasil": "Money and payments in Brazil", "← Volver a Guía de Río": "← Back to Rio Guide", "Cómo llegar ↗": "How to get there ↗", "❤️ RÍO PARA TI": "❤️ RIO FOR YOU", "🧭 PLANIFICA TU VIAJE": "🧭 PLAN YOUR TRIP", "Primera vez": "First time", "Familia": "Family", "INTERÉS": "INTEREST", "Farmacia": "Pharmacy", "Supermercado": "Supermarket", "Esta noche": "Tonight", "🍽️ Tengo hambre": "🍽️ I’m hungry", "💰 Gastar poco": "💰 Spend less", "ABRIR →": "OPEN →", "ABRIR FICHA →": "OPEN DETAILS →", "✨ EXPERIENCIAS ERNESTINHO": "✨ ERNESTINHO EXPERIENCES", "👨‍👩‍👧 Familias": "👨‍👩‍👧 Families", "⭐ Ernestinho recomienda": "⭐ Ernestinho recommends", "Parejas": "Couples", "Privacidad, precios y condiciones": "Privacy, prices and conditions", "Montañas, floresta y senderos": "Mountains, rainforest and trails", "Naturaleza de Río": "Rio Nature", "Montañas y senderos": "Mountains and trails", "Trilhas de Río": "Rio Trails", "Desde grandes clásicos y miradores hasta recorridos largos por bosques, playas y montañas.": "From iconic classics and viewpoints to longer routes through forests, beaches and mountains.", "Distancia": "Distance", "Tiempo": "Time", "Dificultad": "Difficulty", "✨ ¿Qué vas a encontrar?": "✨ What will you find?", "Antes de entrar a una trilha": "Before starting a trail", "Consultar con Ernestinho": "Ask Ernestinho", "Información y opciones": "Information and options", "Reserva con Ernestinho": "Book with Ernestinho", "Reservar por WhatsApp": "Book via WhatsApp", "Ver video": "Watch video", "Ver en Instagram": "View on Instagram", "🇧🇷 Te lo cuento como si fuéramos juntos": "🇧🇷 I’ll tell you as if we were there together", "👀 Qué vas a encontrar": "👀 What you’ll find", "❤️ Ideal para": "❤️ Ideal for", "🗺️ Combínalo con": "🗺️ Combine it with", "✨ No te vayas sin...": "✨ Don’t leave without...", "🎒 Antes de ir": "🎒 Before you go", "🧭 Cómo lo haría yo": "🧭 How I would do it", "Sabores desde mi mirada": "Flavors through my eyes", "Dónde comer en Río de Janeiro": "Where to eat in Rio de Janeiro", "¿Qué quieres comer?": "What do you want to eat?", "Tipo de comida": "Type of food", "Ver información y mapa": "View information and map", "No encontramos coincidencias": "No matches found", "Prueba otra zona, categoría o palabra.": "Try another area, category or keyword.", "Consejo de Ernestinho": "Ernestinho’s tip", "Consultar a Ernestinho": "Ask Ernestinho", "Río después del atardecer": "Rio after sunset", "Vida nocturna": "Nightlife", "Día": "Day", "Estilo": "Style", "Mapa y agenda": "Map and schedule", "Antes de salir": "Before you go out", "GUÍA PIX": "PIX GUIDE", "Lo esencial para un extranjero": "The essentials for a foreign visitor", "Cómo pagar paso a paso": "How to pay step by step", "Señales de alerta": "Warning signs", "La ciudad desde tu cámara": "The city through your camera", "Fotografiar Río": "Photographing Rio", "Cámara, celular y drones": "Camera, phone and drones", "Antes y durante tu viaje": "Before and during your trip", "Prepara tu viaje, llega tranquilo y encuentra rápidamente la información esencial.": "Plan your trip, arrive with peace of mind and quickly find the essential information.", "Viajar atento no significa viajar con miedo.": "Being alert while traveling does not mean traveling in fear.", "Ejemplo:": "Example:", "Qué hacer:": "What to do:", "¿Necesitas ayuda?": "Need help?", "Feria nocturna de Copacabana": "Copacabana night market", "Conocer el café": "Discover the coffee", "Las 50 respuestas rápidas": "50 quick answers", "Plan recomendado:": "Recommended plan:", "Revisa:": "Check:", "Haz esto:": "Do this:", "⭐ Regla de Ernestinho": "⭐ Ernestinho’s rule", "Lista divertida para tu primera visita": "Fun checklist for your first visit", "Supermercados y mercados para ubicarte": "Supermarkets and markets to get your bearings", "Tu primera experiencia, paso a paso": "Your first experience, step by step", "Ver en el mapa ↗": "View on map ↗", "Desafío diario": "Daily challenge", "Saldo": "Balance", "← VOLVER A CONSEJOS": "← BACK TO TIPS", "Recorridos para hacer por tu cuenta": "Self-guided routes", "Del mar a la historia: Zona Portuaria + Centro": "From the sea to history: Port Zone + Downtown", "A pie": "On foot", "Mejor de mañana": "Best in the morning", "7 paradas": "7 stops", "Un Río que puedes descubrir por tu cuenta": "A Rio you can discover on your own", "comenzar por la mañana": "start in the morning", "🎭 Parada extra 0": "🎭 Extra stop 0", "Empieza con Carnaval Experience": "Start with Carnaval Experience", "Socio oficial · 5% de descuento": "Official partner · 5% discount", "Comprar con 5% de descuento ↗": "Buy with 5% discount ↗", "Ver en la guía →": "View in guide →", "Mapa interactivo": "Interactive map", "Sigue el recorrido en Google Maps": "Follow the route on Google Maps", "Abrir ruta completa ↗": "Open full route ↗", "💛 Consejo final de Ernestinho": "💛 Ernestinho’s final tip", "☀️ Mañana:": "☀️ Morning:", "🌤️ Tarde:": "🌤️ Afternoon:", "🌙 Noche:": "🌙 Evening:", "Plan alternativo:": "Alternative plan:", "Abrir ruta del día ↗": "Open today’s route ↗", "Consejos reales y sin complicaciones": "Practical tips without complications", "Consejos de Ernestinho": "Ernestinho’s tips", "Consejos esenciales": "Essential tips", "Leer →": "Read →", "YA ESTÁ EN LA GUÍA": "ALREADY IN THE GUIDE", "Documentos, visado, vacunas, maleta y electricidad": "Documents, visas, vaccines, luggage and electricity", "Abrir Guía de Río →": "Open Rio Guide →", "Organiza y vive tu viaje": "Plan and enjoy your trip", "← Volver a todos los transportes": "← Back to all transport options", "Ideal para": "Ideal for", "Tarifa": "Fare", "Cómo pagar": "How to pay", "Horarios y tarifas oficiales": "Official schedules and fares", "Moverse sin perderse": "Getting around without getting lost", "TRANSPORTE EN RÍO": "TRANSPORT IN RIO", "¿Muchas maletas, niños o un grupo?": "Lots of luggage, children or a group?", "Cotizar con Ernestinho": "Get a quote from Ernestinho", "📖 Copacabana en el tiempo": "📖 Copacabana through time", "De Sacopenapã a la gran postal urbana.": "From Sacopenapã to Rio’s great urban postcard.", "🗺️ No existe “el mejor Posto”": "🗺️ There is no “best Posto”", "Existe el Posto que funciona mejor para lo que tú quieres hacer.": "There is a Posto that works best for what you want to do.", "🏛️ Mira arriba": "🏛️ Look up", "🎵 Copacabana también se escucha": "🎵 Copacabana has a soundtrack too", "🤫 Historias para descubrir caminando": "🤫 Stories to discover on foot", "🇧🇷 Diez maneras de vivir Copacabana": "🇧🇷 Ten ways to experience Copacabana", "🗺️ Rutas Ernestinho": "🗺️ Ernestinho Routes", "No son listas: son secuencias": "They are not lists: they are sequences", "❤️ Copacabana para ti": "❤️ Copacabana for you", "El mismo barrio, distintas necesidades": "The same neighborhood, different needs", "Río no es una lista.": "Rio is not a list.", "Es una decisión.": "It is a decision.", "Según el momento": "Depending on the moment", "Entiende Río": "Understand Rio", "Explorar barrios →": "Explore neighborhoods →", "Abrir consejos/SOS →": "Open tips/SOS →", "Ver experiencias →": "View experiences →", "PRINCIPIO DEL SISTEMA": "SYSTEM PRINCIPLE", "La parte práctica del barrio": "The practical side of the neighborhood", "ABRIR MAPA ↗": "OPEN MAP ↗", "Necesidades rápidas": "Quick needs", "La ciudad cambia contigo.": "The city changes with you.", "📅 RÍO MES A MES": "📅 RIO MONTH BY MONTH", "La fecha también decide.": "The date matters too." }
    };
    // IMPORTANTE: las traducciones completas cargadas antes de App tienen prioridad sobre el diccionario base.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, (__EC_TRANSLATIONS_PREV.pt || {}));
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, (__EC_TRANSLATIONS_PREV.en || {}));
    window.GLOBAL_UI_TRANSLATIONS = GLOBAL_UI_TRANSLATIONS;
    // Auditoría específica Guía de Río + Experiencias (ES/PT/EN)
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_89||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_88||{});
    // GUIA + EXPERIENCIAS · traducciones específicas integradas después de inicializar el diccionario global
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, (window.__EC_HEAVY_TRANSLATIONS__||{}).deep_pt||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, (window.__EC_HEAVY_TRANSLATIONS__||{}).deep_en||{});
    // MULTIDIOMA · fase profunda 2: frases largas y contenido editorial visible.
    // TRANSPORTES · tarjeta Alquiler de auto
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_87||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_86||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_85||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_84||{});
    // MULTIDIOMA · revisión global V11A: textos residuales visibles fuera de Barrios.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_83||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_82||{});
    // MULTIDIOMA · V11B: segunda revisión global — gastronomía, vida nocturna,
    // experiencias y rótulos profundos. Se mantiene ES como versión maestra.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_81||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_80||{});
    // MULTIDIOMA · V11C: cultura profunda — museos, centros culturales,
    // teatros, iglesias, fuertes y espacios literarios.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_79||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_78||{});
    // MULTIDIOMA · V11D: auditoría residual — planificación, ayuda,
    // transporte, documentos, salud, clima y navegación global.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_77||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_76||{});
    // MULTIDIOMA · V11E: auditoría final residual — eventos, playas,
    // naturaleza, familia, compras y CTAs.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_75||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_74||{});
    // MULTIDIOMA · V11F: cierre de contenidos antes del recorrido final.
    // Hospedaje, movilidad, perfiles, accesibilidad, seguridad, ayuda,
    // comercial, documentos, conectividad y salud.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_73||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_72||{});
    // MULTIDIOMA · V11G: último barrido antes del recorrido final.
    // Reservas, rutas, instrucciones, recomendaciones, fotografía y microcopy.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_71||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_70||{});
    // MULTIDIOMA · V11H: contenido profundo — barrios, historia, gastronomía,
    // playa, vida local, rutas y microcopy editorial.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_69||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_68||{});
    const translationOriginalsRef = React.useRef(new WeakMap());
    const translationAttrOriginalsRef = React.useRef(new WeakMap());
    // MULTIDIOMA · V11I: párrafos y secciones finales — portada, atracciones,
    // tours, aventura, familia, Carnaval, compras, SOS y textos editoriales.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_67||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_66||{});
    // MULTIDIOMA · V11J: barrido de contenido dinámico — filtros, horarios,
    // precios, accesibilidad, cultura, mapas, categorías y fichas.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_65||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_64||{});
    // MULTIDIOMA · V11K: guía práctica profunda — entrada a Brasil, menores,
    // salud, dinero/Pix, conectividad, aeropuertos, transporte, electricidad y clima.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_63||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_62||{});
    // MULTIDIOMA · V11L: residuales editoriales — recomendaciones, mar,
    // barrios, movilidad, condiciones, accesos y textos de fichas.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_61||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_60||{});
    // MULTIDIOMA · V11M: auditoría sobre contenido REAL encontrado en el archivo.
    // Metadatos SEO y primeras descripciones largas de gastronomía.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_59||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_58||{});
    // MULTIDIOMA · V11N: traducción de contenido REAL detectado en gastronomía,
    // vida nocturna y ferias. Se preservan nombres propios brasileños.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_57||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_56||{});
    // MULTIDIOMA · V11O: contenido profundo de playas, naturaleza, senderos y miradores.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_55||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_54||{});
    // MULTIDIOMA · V11P: contenido real profundo — museos, salud, menores,
    // Réveillon y Carnaval Experience.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_53||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_52||{});
    // MULTIDIOMA · V11Q: segunda pasada de contenido real profundo.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_51||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_50||{});
    // MULTIDIOMA · V11R: museos y cultura — contenido profundo real.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_49||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_48||{});
    // MULTIDIOMA · V11S: museos — primera tanda de textos largos reales.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_47||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_46||{});
    // MULTIDIOMA · V11T: museos restantes + centros culturales, contenido real.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_45||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_44||{});
    // MULTIDIOMA · V11U: traducción exacta de contenido cultural REAL detectado.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_43||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_42||{});
    // MULTIDIOMA · V11V: segunda tanda cultural real — centros, teatros,
    // iglesias, fuertes y Río literario.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_41||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_40||{});
    // MULTIDIOMA · V11W: tercera tanda cultural real, usando frases exactas
    // extraídas del HTML actual.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_39||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_38||{});
    // MULTIDIOMA · V11X: auditoría real de textos profundos restantes.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_37||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_36||{});
    // MULTIDIOMA · V12A paso 1: compras, mercados y shoppings.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_35||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_34||{});
    // MULTIDIOMA · V12B paso 2: seguridad, errores y consejos.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_33||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_32||{});
    // MULTIDIOMA · V12C paso 3: playas, experiencias y senderos.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_31||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_30||{});
    // MULTIDIOMA · V12D paso 4: cultura, museos, literatura y eventos.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_29||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_28||{});
    // MULTIDIOMA · V12E: barrido profundo de gastronomía, playas y experiencias.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_27||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_26||{});
    // MULTIDIOMA · V12F: barrido profundo de guía práctica, documentos,
    // Pix, salud, internet, aeropuertos, transporte y consulados.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_25||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_24||{});
    // MULTIDIOMA · V12G: traducción profunda basada en textos reales
    // de museos, historia y cultura presentes en la página.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_23||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_22||{});
    // MULTIDIOMA · V12H: ferias, compras y metatextos residuales.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_21||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_20||{});
    // MULTIDIOMA · V13A: GRAN BARRIDO GLOBAL.
    // Traducciones exactas de textos residuales de alto impacto en toda la página.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_19||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_18||{});
    // MULTIDIOMA · V13B: segunda ola del gran barrido global.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_17||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_16||{});
    // MULTIDIOMA · V13C: tercera ola del gran barrido global.
    // Traducción de residuales reales en documentos, dinero, salud, cultura,
    // museos, familias, barrios, eventos y experiencias.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_15||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_14||{});
    // MULTIDIOMA · V13D: cuarta ola global — playas, aventura, rutas y microcopy real.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_13||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_12||{});
    // MULTIDIOMA · V13E: quinta ola global — SEO visible y gastronomía residual real.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_11||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_10||{});
    // MULTIDIOMA · V13F: sexta ola global — horarios, barrios, playas, precios y microcopy.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_9||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_8||{});
    // MULTIDIOMA · V13G: séptima ola global — gastronomía profunda y textos editoriales residuales.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_7||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_6||{});
    // MULTIDIOMA · V13H: octava ola global — guía práctica, cultura, rutas y trekking.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_5||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_4||{});
    // MULTIDIOMA · V13I: novena ola global — trekking, Aterro, Burle Marx, seguridad y experiencias.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_3||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_2||{});
    // MULTIDIOMA · V13J: décima ola — naturaleza, cultura, playas y seguridad residual.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, window.__EC_T34_1||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, window.__EC_T34_0||{});
    // MULTIDIOMA · V13K — atributos visibles (placeholder/title/aria-label/alt)
    const GLOBAL_ATTR_TRANSLATIONS = window.GLOBAL_ATTR_TRANSLATIONS || {pt:{},en:{}};

    // Café Rio · atributos localizados dentro del alcance del traductor global.
    Object.assign(GLOBAL_ATTR_TRANSLATIONS.pt, {
        'Café Rio Chocolate Trufado': 'Café Rio Chocolate Trufado',
        'Café Rio 100% Arábico Tradicional': 'Café Rio 100% Arábica Tradicional',
        'Café Rio Chocolate con Menta': 'Café Rio Chocolate com Menta',
        'Café Rio con Caramelo': 'Café Rio com Caramelo',
        'Café Rio Chocolate con Avellanas': 'Café Rio Chocolate com Avelãs',
        'Colección Café Rio Ernestinho de cinco sabores': 'Coleção Café Rio Ernestinho com cinco sabores'
    });
    Object.assign(GLOBAL_ATTR_TRANSLATIONS.en, {
        'Café Rio Chocolate Trufado': 'Café Rio Truffled Chocolate',
        'Café Rio 100% Arábico Tradicional': 'Café Rio Traditional 100% Arabica',
        'Café Rio Chocolate con Menta': 'Café Rio Mint Chocolate',
        'Café Rio con Caramelo': 'Café Rio Caramel Coffee',
        'Café Rio Chocolate con Avellanas': 'Café Rio Hazelnut Chocolate',
        'Colección Café Rio Ernestinho de cinco sabores': 'Café Rio Ernestinho five-flavor collection'
    });
    // MULTIDIOMA · V13M — literatura, memoria afrobrasileña y cultura profunda residual.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_2||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_3||{});
    // MULTIDIOMA · AQUÍ AHORA + RÍO HOJE — bloque integrado y auditado.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_4||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_5||{});
    Object.assign(GLOBAL_ATTR_TRANSLATIONS.pt, {'Ej: estoy en el Centro, tengo 4 horas y quiero conocer historia caminando':'Ex.: estou no Centro, tenho 4 horas e quero conhecer história caminhando'});
    Object.assign(GLOBAL_ATTR_TRANSLATIONS.en, {'Ej: estoy en el Centro, tengo 4 horas y quiero conocer historia caminando':"Example: I'm downtown, I have 4 hours and want to explore history on foot"});
    // MULTIDIOMA · V13N — experiencias, trekking y museos profundos residuales.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_6||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_7||{});
    // MULTIDIOMA · V13O — MEGABARRIDO: museos, cultura, naturaleza y residuales editoriales.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_8||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_9||{});
    // MULTIDIOMA · V13P — MEGABARRIDO GIGANTE: museos, patrimonio, samba, afro-Rio y cultura profunda.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_10||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_11||{});
    // MULTIDIOMA · V13Q — MEGABARRIDO 220+: gastronomía, noche, playas, compras, experiencias y microcopy.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_12||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_13||{});
    // MULTIDIOMA · V13Q complemento — supera el umbral de la pasada V13P.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, { "Praça XV de Novembro – Centro.": "Praça XV de Novembro – Centro.", "Avenida Augusto Severo y alrededores – Glória.": "Avenida Augusto Severo e arredores – Glória.", "Rua da Alfândega, Rua Senhor dos Passos y alrededores – Centro.": "Rua da Alfândega, Rua Senhor dos Passos e arredores – Centro.", "Entorno de Rua Uruguaiana y estación de metro – Centro.": "Entorno da Rua Uruguaiana e estação de metrô – Centro.", "Campo de São Cristóvão, s/nº – São Cristóvão.": "Campo de São Cristóvão, s/nº – São Cristóvão.", "Avenida Afrânio de Melo Franco, 290 – Leblon.": "Avenida Afrânio de Melo Franco, 290 – Leblon.", "Praia de Botafogo, 400 – Botafogo.": "Praia de Botafogo, 400 – Botafogo.", "Avenida Pastor Martin Luther King Jr., 126 – Del Castilho.": "Avenida Pastor Martin Luther King Jr., 126 – Del Castilho.", "Estrada de Jacarepaguá, 6.069 – Anil.": "Estrada de Jacarepaguá, 6.069 – Anil.", "Del Castilho": "Del Castilho", "Salud": "Saúde", "Dinero": "Dinheiro", "Consulados": "Consulados" });
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_14||{});
    // MULTIDIOMA · V13Q cierre de megapasada.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, { "horario": "horário" });
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, { "horario": "hours" });
    // MULTIDIOMA · V13Q cierre final de escala.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_15||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_16||{});
    // MULTIDIOMA · V13R — megabarrido residual basado exclusivamente en cadenas reales de esta versión.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_17||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_18||{});
    // MULTIDIOMA · V13S — segundo megabarrido residual, exclusivamente sobre cadenas reales del HTML.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_19||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_20||{});
    // MULTIDIOMA · V13T — tercer megabarrido residual sobre cadenas reales del HTML.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_21||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_22||{});
    // MULTIDIOMA · V13U — cuarto megabarrido residual sobre cadenas reales del HTML.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_23||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_24||{});
    // MULTIDIOMA · V13V — metadata del documento fuera de #root.
    useEffect(() => {
        const metaCopy = {
            es: {
                title: 'Ernestinho Carioca — Guía de Río de Janeiro',
                description: 'Guía de Río de Janeiro en español con playas, barrios, museos, experiencias, transporte, consejos y ayuda para organizar tu viaje.'
            },
            pt: {
                title: 'Ernestinho Carioca — Guia do Rio de Janeiro',
                description: 'Guia do Rio de Janeiro com praias, bairros, museus, experiências, transporte, dicas e ajuda para organizar sua viagem.'
            },
            en: {
                title: 'Ernestinho Carioca — Rio de Janeiro Guide',
                description: 'Rio de Janeiro guide with beaches, neighborhoods, museums, experiences, transportation, tips and help planning your trip.'
            }
        };
        const c = metaCopy[lang] || metaCopy.es;
        document.title = c.title;
        const setMeta = (selector, value) => {
            const el = document.querySelector(selector);
            if (el)
                el.setAttribute('content', value);
        };
        setMeta('meta[name="description"]', c.description);
        setMeta('meta[property="og:title"]', c.title);
        setMeta('meta[property="og:description"]', c.description);
        setMeta('meta[name="twitter:title"]', c.title);
        setMeta('meta[name="twitter:description"]', c.description);
    }, [lang]);
    // MULTIDIOMA · V13Y — residuales completos globales (fotografía, guía práctica y alojamiento).
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_25||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_26||{});
    // MULTIDIOMA · V13Z — segundo barrido de residuos globales reales.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, { "Pueblos indígenas y antropología": "povos indígenas y antropología", "Arte popular y cultura brasileña": "Arte popular y cultura brasileira", "Una vista panorámica de la bahía": "Una vista panorâmica de la bahía", "Biblioteca do Centro Cultural Justiça Federal": "Biblioteca do centro cultural Justiça Federal", "El centro cultural dispone de ascensores y recursos de accesibilidad.": "El centro cultural dispone de ascensores y recursos de acessibilidade.", "Música, cine y cultura brasileña": "Música, cine y cultura brasileira", "Centro Cultural Ação da Cidadania": "centro cultural Ação da Cidadania", "Centro Cultural José Bonifácio": "centro cultural José Bonifácio", "Centro Cultural Correios": "centro cultural Correios", "Centro Cultural Justiça Federal": "centro cultural Justiça Federal", "Cultura popular brasileña": "cultura popular brasileña" });
    Object.assign(GLOBAL_UI_TRANSLATIONS.en, { "Pueblos indígenas y antropología": "Indigenous peoples y antropología", "Arte popular y cultura brasileña": "Arte popular y Brazilian culture", "Una vista panorámica de la bahía": "Una panoramic view de la bahía", "Biblioteca do Centro Cultural Justiça Federal": "Biblioteca do cultural center Justiça Federal", "El centro cultural dispone de ascensores y recursos de accesibilidad.": "El cultural center dispone de ascensores y recursos de accessibility.", "Música, cine y cultura brasileña": "Música, cine y Brazilian culture", "Centro Cultural Ação da Cidadania": "cultural center Ação da Cidadania", "Centro Cultural José Bonifácio": "cultural center José Bonifácio", "Centro Cultural Correios": "cultural center Correios", "Centro Cultural Justiça Federal": "cultural center Justiça Federal", "Cultura popular brasileña": "popular culture brasileña" });
    // MULTIDIOMA · V14A — megapaso global extenso sobre contenido real residual.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_27||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_28||{});
    // MULTIDIOMA · V14B — megapaso práctico, familia, fotografía y seguridad.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_29||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_30||{});
    // CIERRE MULTIDIOMA · contenido profundo confirmado (Guía + socios + Experiencias).
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_31||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_32||{});
    // CIERRE MULTIDIOMA · Museos profundos 1/3.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_33||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_34||{});
    // CIERRE MULTIDIOMA · Museos profundos 2/3.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_35||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_36||{});
    // CIERRE MULTIDIOMA · Museos profundos 3/3.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_37||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_38||{});
    // CIERRE MULTIDIOMA · Grandes eventos 1/2.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_39||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_40||{});
    // CIERRE MULTIDIOMA · Grandes eventos 2/2.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_41||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_42||{});
    // CIERRE MULTIDIOMA · Espacios literarios 1/2.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_43||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_44||{});
    // CIERRE MULTIDIOMA · Espacios literarios 2/2.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_45||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_46||{});
    // CIERRE MULTIDIOMA · Centros culturales 1/2.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_47||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_48||{});
    // CIERRE MULTIDIOMA · Centros culturales 2/2.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_49||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_50||{});
    // CIERRE MULTIDIOMA · fichas de lugares y consejos.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_51||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_52||{});
    // CIERRE MULTIDIOMA · Copacabana profunda y barrios Master.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_53||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_54||{});
    // CIERRE MULTIDIOMA · vida carioca, motor editorial, familia y home.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_55||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_56||{});
    // CIERRE MULTIDIOMA · transporte, comida, Carnaval, catálogo y seguridad.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_57||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_58||{});
    // CIERRE MULTIDIOMA · auditoría residual profunda A.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_59||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_60||{});
    // CIERRE MULTIDIOMA · auditoría residual profunda B.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_61||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_62||{});
    // CIERRE MULTIDIOMA · atributos visibles y accesibles.
    Object.assign(GLOBAL_ATTR_TRANSLATIONS.pt,window.__EC_T35_0||{});
    Object.assign(GLOBAL_ATTR_TRANSLATIONS.en,window.__EC_T35_1||{});
    // CIERRE MULTIDIOMA · corrección de traducciones híbridas 1.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_63||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_64||{});
    // CIERRE MULTIDIOMA · corrección de traducciones híbridas 2A.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_65||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_66||{});
    // CIERRE MULTIDIOMA · corrección de traducciones híbridas 2B.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_67||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_68||{});
    // CIERRE MULTIDIOMA · residuos finales e híbridos restantes.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_69||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_70||{});
    // CIERRE MULTIDIOMA · limpieza de híbridos de baja señal.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_71||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_72||{});
    // CIERRE MULTIDIOMA · JSX visible 1/3.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_73||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_74||{});
    // CIERRE MULTIDIOMA · JSX visible 2/3.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_75||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_76||{});
    // CIERRE MULTIDIOMA · JSX visible 3/3.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_77||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_78||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_79||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_80||{});
    // CIERRE MULTIDIOMA · limpieza final de residuos visibles e híbridos.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_81||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_82||{});
    // CIERRE MULTIDIOMA · últimas traducciones inglesas heredadas corregidas.
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_83||{});
    // CORRECCIÓN REAL · faltantes visibles en Home, Guía, Experiencias, Eventos, Transporte y menú.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_84||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_85||{});
    // MULTIDIOMA REAL · expose current render language and complete dictionaries.
    // React.createElement below uses these maps BEFORE text reaches the DOM.
    window.__ernestinhoRenderLang = lang;
    window.__ernestinhoRenderUI = GLOBAL_UI_TRANSLATIONS;
    window.__ernestinhoRenderATTR = GLOBAL_ATTR_TRANSLATIONS;
    // CORRECCIÓN DIRIGIDA · Qué hacer, Guía de Río y Transporte.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_86||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_87||{});
    // CORRECCIÓN DIRIGIDA · Grandes eventos 1/3.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_88||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_89||{});
    // CORRECCIÓN DIRIGIDA · Grandes eventos 2/3.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_90||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_91||{});
    // CORRECCIÓN DIRIGIDA · Grandes eventos 3/3.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_92||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_93||{});
    // CORRECCIÓN DIRIGIDA FINAL · Smart Rio, vacunas, registry y residuos de eventos.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_94||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_95||{});
    // CORRECCIÓN TOTAL DE TRANSPORTES · página principal + Uber + Metrô + Bike Itaú + privado.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_96||{});
    Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_97||{});
    // PT-BR · correção profunda: Vacinas + Café Rio.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_98||{});
    // PT-BR · Igrejas 1/2.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_99||{});
    // PT-BR · Igrejas 2/2.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_100||{});
    // PT-BR · rótulos de Igrejas.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_101||{});
    // PT-BR · Fortes e fortalezas completos.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_102||{});
    // PT-BR · Espaços literários completos.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_103||{});
    // PT-BR · Dicas/Conselhos completos.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_104||{});
    // PT-BR · rótulos finais de Fortes.
    Object.assign(GLOBAL_UI_TRANSLATIONS.pt, { "Fuertes y fortalezas de Río": "Fortes e fortalezas do Rio", "Fortaleza seleccionada": "Fortificação selecionada", "Elegir otra fortaleza": "Escolher outra fortificação", "Buscar fuerte, fortaleza, Río o Niterói...": "Buscar forte, fortaleza, Rio ou Niterói...", "📍 Dirección": "📍 Endereço", "🕐 Visitas": "🕐 Visitas", "🎟️ Entrada": "🎟️ Entrada", "⏱️ Duración": "⏱️ Duração", "📅 Reserva": "📅 Reserva", "♿ Accesibilidad": "♿ Acessibilidade", "🪪 Documentos": "🪪 Documentos", "🚇 Cómo llegar": "🚇 Como chegar", "🛡️ Seguridad": "🛡️ Segurança", "💡 Consejo de Ernestinho": "💡 Dica do Ernestinho", "Ver fortaleza": "Ver fortificação", "Volver a fuertes y fortalezas": "Voltar para fortes e fortalezas" });
    useEffect(() => {
        const root = document.getElementById('ernestinho-carioca-root');
        if (!root)
            return;
        const originals = translationOriginalsRef.current;
        const translateNode = (node) => {
            if (node.nodeType !== 3 || !node.parentElement || ['SCRIPT', 'STYLE', 'TEXTAREA'].includes(node.parentElement.tagName))
                return;
            const current = node.nodeValue;
            const currentTrim = current.trim();
            const normKey = (v) => String(v || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
            if (!currentTrim)
                return;
            const ptMap = GLOBAL_UI_TRANSLATIONS.pt || {}, enMap = GLOBAL_UI_TRANSLATIONS.en || {};
            const normalizedLookup = (map, key) => {
                if (Object.prototype.hasOwnProperty.call(map, key))
                    return map[key];
                const nk = normKey(key);
                if (!window.__ernestinhoNormCache)
                    window.__ernestinhoNormCache = { pt: null, en: null };
                const cacheName = (map === ptMap ? 'pt' : 'en');
                if (!window.__ernestinhoNormCache[cacheName]) {
                    const c = new Map();
                    Object.keys(map).forEach(k => { const n = normKey(k); if (!c.has(n))
                        c.set(n, map[k]); });
                    window.__ernestinhoNormCache[cacheName] = c;
                }
                return window.__ernestinhoNormCache[cacheName].get(nk);
            };
            if (!originals.has(node)) {
                originals.set(node, current);
            }
            else {
                const stored = originals.get(node);
                const storedTrim = stored.trim();
                const currentIsSpanishKey = Object.prototype.hasOwnProperty.call(ptMap, currentTrim) || Object.prototype.hasOwnProperty.call(enMap, currentTrim);
                const currentIsKnownTranslation = (ptMap[storedTrim] === currentTrim) || (enMap[storedTrim] === currentTrim);
                if (currentIsSpanishKey || (!currentIsKnownTranslation && currentTrim !== storedTrim))
                    originals.set(node, current);
            }
            const original = originals.get(node);
            const trimmed = original.trim();
            if (!trimmed)
                return;
            if (lang === 'es') {
                if (node.nodeValue !== original)
                    node.nodeValue = original;
                return;
            }
            const map = GLOBAL_UI_TRANSLATIONS[lang] || {};
            let translated = normalizedLookup(map, trimmed);
            // Dynamic visible strings whose variable part is a place/entity name.
            if (!translated && lang === 'pt') {
                if (/^Mapa de .+/.test(trimmed))
                    translated = trimmed.replace(/^Mapa de /, 'Mapa de ');
                else if (/^(.+) en Río de Janeiro \| Ernestinho Carioca$/.test(trimmed))
                    translated = trimmed.replace(/ en Río de Janeiro \| Ernestinho Carioca$/, ' no Rio de Janeiro | Ernestinho Carioca');
                else if (/^(.+) en Río de Janeiro$/.test(trimmed))
                    translated = trimmed.replace(/ en Río de Janeiro$/, ' no Rio de Janeiro');
                else if (/^encaja con .+/.test(trimmed))
                    translated = trimmed.replace(/^encaja con /, 'combina com ');
                else if (/^desde .+/.test(trimmed))
                    translated = trimmed.replace(/^desde /, 'a partir de ');
                else if (/^Fotografía real · registro \d+$/.test(trimmed))
                    translated = trimmed.replace(/^Fotografía real/, 'Fotografia real');
                else if (/^(.+): fotografía \d+$/.test(trimmed))
                    translated = trimmed.replace(/: fotografía /, ': fotografia ');
                else if (/^(.+) — fotografía \d+$/.test(trimmed))
                    translated = trimmed.replace(/ — fotografía /, ' — fotografia ');
                else if (/^(.+): imagen \d+$/.test(trimmed))
                    translated = trimmed.replace(/: imagen /, ': imagem ');
                else if (/^Galería completa de .+\.$/.test(trimmed))
                    translated = trimmed.replace(/^Galería completa de /, 'Galeria completa de ');
                else if (/^Fotografía \d+ de .+\.$/.test(trimmed))
                    translated = trimmed.replace(/^Fotografía /, 'Fotografia ');
            }
            if (!translated && lang === 'en') {
                if (/^Mapa de .+/.test(trimmed))
                    translated = trimmed.replace(/^Mapa de /, 'Map of ');
                else if (/^(.+) en Río de Janeiro \| Ernestinho Carioca$/.test(trimmed))
                    translated = trimmed.replace(/ en Río de Janeiro \| Ernestinho Carioca$/, ' in Rio de Janeiro | Ernestinho Carioca');
                else if (/^(.+) en Río de Janeiro$/.test(trimmed))
                    translated = trimmed.replace(/ en Río de Janeiro$/, ' in Rio de Janeiro');
                else if (/^encaja con .+/.test(trimmed))
                    translated = trimmed.replace(/^encaja con /, 'fits with ');
                else if (/^desde .+/.test(trimmed))
                    translated = trimmed.replace(/^desde /, 'from ');
            }
            if (translated) {
                const lead = original.match(/^\s*/)[0], tail = original.match(/\s*$/)[0];
                node.nodeValue = lead + translated + tail;
            }
        };
        const attrOriginals = translationAttrOriginalsRef.current;
        const translateAttrs = (el) => {
            if (!el || !el.getAttribute)
                return;
            const attrs = ['placeholder', 'title', 'aria-label', 'alt'];
            let stored = attrOriginals.get(el);
            if (!stored) {
                stored = {};
                attrOriginals.set(el, stored);
            }
            const ptMap = GLOBAL_ATTR_TRANSLATIONS.pt || {}, enMap = GLOBAL_ATTR_TRANSLATIONS.en || {};
            attrs.forEach(attr => {
                if (!el.hasAttribute(attr))
                    return;
                const current = el.getAttribute(attr) || '';
                const currentTrim = current.trim();
                if (!currentTrim)
                    return;
                if (stored[attr] === undefined) {
                    // If we first see the element while already translated, recover Spanish through reverse lookup.
                    const revPT = Object.keys(ptMap).find(k => ptMap[k] === currentTrim);
                    const revEN = Object.keys(enMap).find(k => enMap[k] === currentTrim);
                    stored[attr] = revPT || revEN || current;
                }
                else {
                    const originalTrim = (stored[attr] || '').trim();
                    const currentIsSpanishKey = Object.prototype.hasOwnProperty.call(ptMap, currentTrim) ||
                        Object.prototype.hasOwnProperty.call(enMap, currentTrim);
                    const currentIsKnownTranslation = (ptMap[originalTrim] === currentTrim) ||
                        (enMap[originalTrim] === currentTrim);
                    // React may reuse the same node and replace its source attribute with a new Spanish value.
                    if (currentIsSpanishKey || (!currentIsKnownTranslation && currentTrim !== originalTrim && lang === 'es')) {
                        stored[attr] = current;
                    }
                }
                const original = stored[attr] || '';
                const key = original.trim();
                if (lang === 'es') {
                    if (current !== original)
                        el.setAttribute(attr, original);
                    return;
                }
                const map = GLOBAL_ATTR_TRANSLATIONS[lang] || {};
                let translated = map[key];
                // Safe dynamic patterns for real attributes used throughout the site.
                if (!translated && lang === 'pt') {
                    if (/^Mapa de .+/.test(key))
                        translated = key.replace(/^Mapa de /, 'Mapa de ');
                    else if (/^Abrir .+/.test(key))
                        translated = key.replace(/^Abrir /, 'Abrir ');
                    else if (/ en Río de Janeiro con Ernestinho$/.test(key))
                        translated = key.replace(/ en Río de Janeiro con Ernestinho$/, ' no Rio de Janeiro com Ernestinho');
                    else if (/ - experiencia familiar$/.test(key))
                        translated = key.replace(/ - experiencia familiar$/, ' - experiência em família');
                    else if (/ - otra mirada de la experiencia$/.test(key))
                        translated = key.replace(/ - otra mirada de la experiencia$/, ' - outro olhar sobre a experiência');
                    else if (/^(.+): fotografía \d+$/.test(key))
                        translated = key.replace(/: fotografía /, ': fotografia ');
                    else if (/^(.+) — fotografía \d+$/.test(key))
                        translated = key.replace(/ — fotografía /, ' — fotografia ');
                    else if (/^(.+): imagen \d+$/.test(key))
                        translated = key.replace(/: imagen /, ': imagem ');
                    else if (/^(.+) — fachada o imagen principal$/.test(key))
                        translated = key.replace(/ — fachada o imagen principal$/, ' — fachada ou imagem principal');
                }
                if (!translated && lang === 'en') {
                    if (/^Mapa de .+/.test(key))
                        translated = key.replace(/^Mapa de /, 'Map of ');
                    else if (/^Abrir .+/.test(key))
                        translated = key.replace(/^Abrir /, 'Open ');
                    else if (/ en Río de Janeiro con Ernestinho$/.test(key))
                        translated = key.replace(/ en Río de Janeiro con Ernestinho$/, ' in Rio de Janeiro with Ernestinho');
                    else if (/ - experiencia familiar$/.test(key))
                        translated = key.replace(/ - experiencia familiar$/, ' - family experience');
                    else if (/ - otra mirada de la experiencia$/.test(key))
                        translated = key.replace(/ - otra mirada de la experiencia$/, ' - another view of the experience');
                }
                if (translated && current !== translated)
                    el.setAttribute(attr, translated);
            });
        };
        const walk = () => {
            const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
            let n;
            while (n = w.nextNode())
                translateNode(n);
            translateAttrs(root);
            root.querySelectorAll('[placeholder],[title],[aria-label],[alt]').forEach(translateAttrs);
        };
        // Apply immediately and keep a callable hook for route/detail changes.
        window.__ernestinhoApplyLanguage = walk;
        window.__ernestinhoNormCache = { pt: null, en: null };
        walk();
        // React often reuses the same DOM nodes and only changes nodeValue.
        // childList alone does NOT catch those updates, so characterData is essential.
        let rafTranslate = null;
        const scheduleWalk = () => {
            if (rafTranslate)
                cancelAnimationFrame(rafTranslate);
            rafTranslate = requestAnimationFrame(() => {
                rafTranslate = null;
                walk();
            });
        };
        const obs = new MutationObserver(scheduleWalk);
        obs.observe(root, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['placeholder', 'title', 'aria-label', 'alt']
        });
        // A second pass catches content mounted by nested components in the next frame.
        const t1 = setTimeout(scheduleWalk, 0);
        const t2 = setTimeout(scheduleWalk, 80);
        return () => {
            obs.disconnect();
            if (rafTranslate)
                cancelAnimationFrame(rafTranslate);
            clearTimeout(t1);
            clearTimeout(t2);
            if (window.__ernestinhoApplyLanguage === walk)
                delete window.__ernestinhoApplyLanguage;
        };
    }, [lang]);
    const [articuloSeleccionado, setArticuloSeleccionado] = useState(rutaSeoInicial.articulo || null);
    // Reapply the selected language whenever navigation or a deep detail changes.
    // This fixes sections that React updates by reusing text nodes instead of adding new nodes.
    useEffect(() => {
        const run = () => {
            if (typeof window.__ernestinhoApplyLanguage === 'function') {
                window.__ernestinhoApplyLanguage();
            }
        };
        const r1 = requestAnimationFrame(run);
        const t1 = setTimeout(run, 40);
        const t2 = setTimeout(run, 140);
        return () => {
            cancelAnimationFrame(r1);
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [
        lang,
        seccionActual,
        temaGuia,
        consejoSeleccionado,
        modoTransportePublico,
        restauranteSeleccionado,
        barrioSeleccionado,
        museoSeleccionado,
        articuloSeleccionado
    ]);
    const [detalleRuta, setDetalleRuta] = useState(null);
    const abrirDetalleRuta = (sec, id) => {
        setDetalleRuta({ sec, id });
        if (sec === 'museos')
            setMuseoSeleccionado(id);
        if (sec === 'gastronomia')
            setRestauranteSeleccionado(GASTRONOMIA_DATA.find(x => x.id === id) || null);
        const rutaDestino = seoPathForSection(sec);
        if (rutaDestino)
            seoNavigate(rutaDestino);
        setHistorialSecciones(prev => [...prev, seccionActual].slice(-50));
        setSeccionActualBase(sec);
        window.__ERNESTINHO_PENDING_EDITORIAL_ANCHOR__ = id;
        window.setTimeout(() => { const el = document.getElementById('ernestinho-entity-' + id) || document.querySelector(`[data-ernestinho-entity="${id}"]`); if (el)
            el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 80);
    };
    window.__ERNESTINHO_OPEN_EDITORIAL__ = abrirDetalleRuta;
    useEffect(() => {
        const aplicarRuta = () => {
            const resolved = seoResolveRoute(window.location.pathname);
            window.__ernestinhoSeoPop = true;
            setSeccionActualBase(resolved.seccion);
            setMuseoSeleccionado(resolved.museoId || null);
            setBarrioSeleccionado(resolved.barrio || null);
            setRestauranteSeleccionado(resolved.restaurante || null);
            setArticuloSeleccionado(resolved.articulo || null);
            setTemaGuia(resolved.temaGuia || null);
            setConsejoSeleccionado(resolved.consejoId ? (CONSEJOS_NUEVOS.find(x => x.id === resolved.consejoId) || null) : null);
            window.requestAnimationFrame(() => { window.__ernestinhoSeoPop = false; });
        };
        window.addEventListener('popstate', aplicarRuta);
        return () => window.removeEventListener('popstate', aplicarRuta);
    }, []);
    useEffect(() => {
        const path = seoCurrentPath(seccionActual, museoSeleccionado, barrioSeleccionado, restauranteSeleccionado, articuloSeleccionado, temaGuia, consejoSeleccionado);
        if (!window.__ernestinhoSeoPop && path && seoCleanPath(window.location.pathname) !== seoCleanPath(path)) {
            seoNavigate(path, 'replace');
        }
        const meta = seoMetaFor(seccionActual, museoSeleccionado, barrioSeleccionado, restauranteSeleccionado, articuloSeleccionado, temaGuia, consejoSeleccionado);
        seoSetMeta(meta);
    }, [seccionActual, museoSeleccionado, barrioSeleccionado, restauranteSeleccionado, articuloSeleccionado, temaGuia, consejoSeleccionado]);
    useEffect(() => {
        const refreshSeoRoute = () => {
            const direct = seoMetaFromPath(window.location.pathname);
            if (direct) seoSetMeta(direct);
        };
        window.addEventListener('ernestinho-routechange', refreshSeoRoute);
        window.addEventListener('popstate', refreshSeoRoute);
        return () => {
            window.removeEventListener('ernestinho-routechange', refreshSeoRoute);
            window.removeEventListener('popstate', refreshSeoRoute);
        };
    }, []);
    const [modalReservaOpen, setModalReservaOpen] = useState(false);
    const [expParaReservar, setExpParaReservar] = useState(null);
    const [reservaDatos, setReservaDatos] = useState({
        fecha: '',
        personas: 2,
        nombre: '',
        email: '',
        telefono: ''
    });
    useEffect(() => {
        const subirAlInicio = () => {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        };
        subirAlInicio();
        const siguienteCuadro = window.requestAnimationFrame(subirAlInicio);
        if (window.lucide) {
            window.lucide.createIcons();
        }
        return () => window.cancelAnimationFrame(siguienteCuadro);
    }, [seccionActual, articuloSeleccionado, temaGuia, consejoSeleccionado, modoTransportePublico, restauranteSeleccionado, modalReservaOpen]);
    const abrirReserva = (exp) => {
        setExpParaReservar(exp);
        setModalReservaOpen(true);
    };
    const verArticulo = (art) => {
        if (!art) return;
        setHistorialSecciones(prev => [...prev, seccionActual].slice(-50));
        seoNavigate(`/articulos/${seoSlug(art.titulo || art.id)}`);
        setArticuloSeleccionado(art);
        setSeccionActualBase('articulo_detalle');
    };
    const enviarReservaWhatsApp = (e) => {
        var _a;
        e.preventDefault();
        const tituloReserva = (expParaReservar === null || expParaReservar === void 0 ? void 0 : expParaReservar.titulo) || 'Tour';
        const tituloLocalizado = lang === 'es'
            ? tituloReserva
            : (((_a = GLOBAL_UI_TRANSLATIONS[lang]) === null || _a === void 0 ? void 0 : _a[tituloReserva]) || tituloReserva);
        const msg = lang === 'pt'
            ? `Olá, Ernestinho! Gostaria de consultar uma reserva:
*Experiência:* ${tituloLocalizado}
*Data estimada:* ${reservaDatos.fecha || 'A definir'}
*Pessoas:* ${reservaDatos.personas}
*Nome:* ${reservaDatos.nombre}
*E-mail:* ${reservaDatos.email}
*Telefone:* ${reservaDatos.telefono}`
            : lang === 'en'
                ? `Hi Ernestinho! I would like to ask about a booking:
*Experience:* ${tituloLocalizado}
*Estimated date:* ${reservaDatos.fecha || 'To be confirmed'}
*People:* ${reservaDatos.personas}
*Name:* ${reservaDatos.nombre}
*Email:* ${reservaDatos.email}
*Phone:* ${reservaDatos.telefono}`
                : `Hola Ernestinho! Quisiera consultar la reserva para:
*Experiencia:* ${tituloReserva}
*Fecha estimada:* ${reservaDatos.fecha || 'Por definir'}
*Personas:* ${reservaDatos.personas}
*Nombre:* ${reservaDatos.nombre}
*Email:* ${reservaDatos.email}
*Teléfono:* ${reservaDatos.telefono}`;
        window.open(`https://wa.me/5521969946938?text=${encodeURIComponent(msg)}`, '_blank');
        setModalReservaOpen(false);
    };
    return (React.createElement("div", { className: "min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-amber-300 selection:text-amber-950" },
        seccionActual !== 'inicio' && (React.createElement("button", { type: "button", onClick: volverUnaVista, "aria-label": ui.back, className: "fixed left-4 sm:left-6 bottom-5 z-50 inline-flex items-center justify-center gap-2 bg-white/95 hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200  w-11 h-11 sm:w-auto sm:h-auto sm:px-5 sm:py-3 rounded-full font-black text-xs uppercase tracking-wide transition-all backdrop-blur" },
            React.createElement("span", { className: "text-lg leading-none" }, "\u2190"),
            React.createElement("span", { className: "hidden sm:inline" }, ui.back))),
        React.createElement("header", { className: "sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-amber-300/20  transition-all text-white" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between" },
                React.createElement("button", { onClick: () => { setSeccionActual('inicio'); setArticuloSeleccionado(null); }, className: "flex items-center gap-3 text-left group" },
                    React.createElement("div", { className: "w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-amber-400 p-0.5  group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center bg-white" },
                        React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/89161BC4-595E-455D-8211-87277AC58B53", alt: "Logo Ernestinho Carioca", className: "w-full h-full object-cover rounded-full" })),
                    React.createElement("div", null,
                        React.createElement("span", { className: "text-[15px] sm:text-2xl font-black tracking-tight text-amber-300 uppercase block leading-none whitespace-nowrap" },
                            "Ernestinho ",
                            React.createElement("span", { className: "text-amber-300" }, "Carioca")),
                        React.createElement("span", { className: "hidden sm:block text-[10px] sm:text-xs text-lime-400 font-semibold tracking-wider italic mt-0.5" }, ui.tagline))),
                React.createElement("nav", { className: "hidden xl:flex items-center gap-1 text-sm font-semibold text-white/75" }, [
                    { id: 'copa_para_mi', label: '❤️ Para mí' },
                    { id: 'guia', label: 'Guía de Río' },
                    { id: 'rio_mes_a_mes', label: 'Mes a mes' },
                    { id: 'master4_experiencias', label: 'Experiencias' },
                    { id: 'grandes_eventos', label: 'Eventos' },
                    { id: 'transportes', label: 'Transportes' },
                    { id: 'que_hacer', label: 'Qué Hacer' },
                    { id: 'consejos', label: 'Consejos' },
                    { id: 'playas', label: 'Playas' },
                    { id: 'compras', label: 'Compras' },
                    { id: 'barrios', label: 'Barrios' },
                    { id: 'hospedaje', label: 'Hospedaje' },
                    { id: 'cafe', label: 'Café Rio' },
                ].filter((item) => !['copa_para_mi','rio_mes_a_mes','consejos','barrios','playas','grandes_eventos'].includes(item.id)).map((item) => (React.createElement("button", { key: item.id, onClick: () => { setSeccionActual(item.id); setArticuloSeleccionado(null); }, className: `px-3 py-2 rounded-full transition-all ${seccionActual === item.id
                        ? 'bg-teal-50 text-teal-700 font-bold'
                        : 'hover:bg-slate-100 text-slate-600'}` }, ui.nav[item.id] || item.label)))),
                React.createElement("div", { className: "flex items-center gap-2 sm:gap-3" },
                    React.createElement("div", { className: "flex items-center gap-1" },
                        React.createElement("a", { href: "https://www.instagram.com/ernestinhocarioca/", target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram de Ernestinho Carioca", className: "w-9 h-9 flex items-center justify-center", title: "Instagram" },
                            React.createElement("svg", { viewBox: "0 0 24 24", className: "w-8 h-8", "aria-hidden": "true" },
                                React.createElement("defs", null,
                                    React.createElement("radialGradient", { id: "igGradient", cx: "30%", cy: "107%", r: "120%" },
                                        React.createElement("stop", { offset: "0%", stopColor: "#ffd600" }),
                                        React.createElement("stop", { offset: "35%", stopColor: "#ff7a00" }),
                                        React.createElement("stop", { offset: "62%", stopColor: "#ff0169" }),
                                        React.createElement("stop", { offset: "100%", stopColor: "#d300c5" }))),
                                React.createElement("rect", { x: "1", y: "1", width: "22", height: "22", rx: "6", fill: "url(#igGradient)" }),
                                React.createElement("circle", { cx: "12", cy: "12", r: "4.6", fill: "none", stroke: "white", strokeWidth: "1.8" }),
                                React.createElement("circle", { cx: "17.5", cy: "6.5", r: "1.15", fill: "white" }),
                                React.createElement("rect", { x: "4.5", y: "4.5", width: "15", height: "15", rx: "4.3", fill: "none", stroke: "white", strokeWidth: "1.8" }))),
                        React.createElement("a", { href: "https://www.tiktok.com/@ernestojdojeda", target: "_blank", rel: "noopener noreferrer", "aria-label": "TikTok de Ernestinho Carioca", className: "w-9 h-9 flex items-center justify-center", title: "TikTok" },
                            React.createElement("svg", { viewBox: "0 0 24 24", className: "w-8 h-8", "aria-hidden": "true" },
                                React.createElement("rect", { x: "1", y: "1", width: "22", height: "22", rx: "6", fill: "#000" }),
                                React.createElement("path", { d: "M14.1 5.1c.35 1.75 1.38 2.8 3.15 2.92v2.12c-1.02.1-1.92-.23-3.1-.9v4.08c0 5.18-5.64 6.8-7.9 3.09-1.45-2.39-.56-6.58 4.1-6.75v2.23c-.34.05-.7.13-1.03.24-1 .34-1.57.99-1.4 2.13.32 2.18 4.31 2.82 3.98-1.43V5.1h2.2z", fill: "#25F4EE", transform: "translate(-.45,.35)" }),
                                React.createElement("path", { d: "M14.1 5.1c.35 1.75 1.38 2.8 3.15 2.92v2.12c-1.02.1-1.92-.23-3.1-.9v4.08c0 5.18-5.64 6.8-7.9 3.09-1.45-2.39-.56-6.58 4.1-6.75v2.23c-.34.05-.7.13-1.03.24-1 .34-1.57.99-1.4 2.13.32 2.18 4.31 2.82 3.98-1.43V5.1h2.2z", fill: "#FE2C55", transform: "translate(.45,-.15)" }),
                                React.createElement("path", { d: "M14.1 5.1c.35 1.75 1.38 2.8 3.15 2.92v2.12c-1.02.1-1.92-.23-3.1-.9v4.08c0 5.18-5.64 6.8-7.9 3.09-1.45-2.39-.56-6.58 4.1-6.75v2.23c-.34.05-.7.13-1.03.24-1 .34-1.57.99-1.4 2.13.32 2.18 4.31 2.82 3.98-1.43V5.1h2.2z", fill: "white" })))),
                    React.createElement("div", { className: "hidden items-center rounded-full border border-slate-200 bg-slate-50 p-1", "aria-label": "Idioma / Language" }, [['es', '🇪🇸', 'ES'], ['pt', '🇧🇷', 'PT'], ['en', '🇺🇸', 'EN']].map(([code, flag, label]) => React.createElement("button", { key: code, type: "button", onClick: () => setLang(code), className: `px-2.5 py-1.5 rounded-full text-[10px] font-black transition-all flex items-center gap-1 ${lang === code ? 'bg-slate-950 text-white ' : 'text-slate-500 hover:bg-white'}`, "aria-pressed": lang === code },
                        React.createElement("span", { className: "text-sm leading-none" }, flag),
                        React.createElement("span", null, label)))),
                    React.createElement("a", { href: "https://wa.me/5521969946938?text=Hola%20Ernestinho,%20quisiera%20informaci\u00F3n%20sobre%20R\u00EDo", target: "_blank", rel: "noopener noreferrer", className: "hidden sm:flex shrink-0 items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs xl:text-sm p-2.5 xl:py-2.5 xl:px-4 rounded-full  transition-all  transform hover:-translate-y-0.5" },
                        React.createElement(Icon, { name: "message-circle", className: "w-4 h-4" }),
                        React.createElement("span", { className: "hidden xl:inline whitespace-nowrap" }, ui.talk)),
                    React.createElement("button", { onClick: () => setMenuAbierto(!menuAbierto), className: "xl:hidden p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors", "aria-label": "Abrir Men\u00FA" },
                        React.createElement(Icon, { name: menuAbierto ? "x" : "menu", className: "w-6 h-6" })))),
            React.createElement("div", { className: "px-4 sm:px-6 pb-2 bg-black/95" },
                React.createElement("div", { className: "max-w-7xl mx-auto flex items-center justify-end" },
                    React.createElement("div", { className: "inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 ", "aria-label": "Idioma / Language" },
                        React.createElement("span", { className: "pl-2 pr-1 text-sm leading-none", "aria-hidden": "true" }, "\uD83C\uDF10"),
                        [['es', '🇪🇸', 'ES'], ['pt', '🇧🇷', 'PT'], ['en', '🇺🇸', 'EN']].map(([code, flag, label]) => (React.createElement("button", { key: code, type: "button", onClick: () => setLang(code), className: `min-w-[58px] px-2.5 py-2 rounded-full text-[11px] font-black transition-all flex items-center justify-center gap-1.5 ${lang === code
                                ? 'bg-slate-950 text-white '
                                : 'text-slate-600 hover:bg-white active:bg-white'}`, "aria-pressed": lang === code },
                            React.createElement("span", { className: "text-base leading-none" }, flag),
                            React.createElement("span", null, label))))))),
            menuAbierto && (React.createElement("div", { className: "xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1  animate-fadeIn" }, [
                { id: 'inicio', label: 'INICIO', icon: 'sun' },
                { id: 'copa_para_mi', label: '❤️ PARA MÍ', icon: 'heart' },
                { id: 'guia', label: 'GUÍA DE RÍO', icon: 'compass' },
                { id: 'master4_experiencias', label: 'EXPERIENCIAS', icon: 'star' },
                { id: 'grandes_eventos', label: 'GRANDES EVENTOS', icon: 'calendar-days' },
                { id: 'transportes', label: 'TRANSPORTES', icon: 'bus' },
                { id: 'que_hacer', label: 'QUÉ HACER', icon: 'map-pin' },
                { id: 'consejos', label: 'CONSEJOS', icon: 'lightbulb' },
                { id: 'playas', label: 'PLAYAS', icon: 'anchor' },
                { id: 'compras', label: 'COMPRAS', icon: 'shopping-bag' },
                { id: 'barrios', label: 'BARRIOS', icon: 'navigation' },
                { id: 'hospedaje', label: 'HOSPEDAJE', icon: 'heart' },
                { id: 'cafe', label: 'CAFÉ RIO', icon: 'coffee' },
            ].filter((item) => !['copa_para_mi','rio_mes_a_mes','consejos','barrios','playas','grandes_eventos'].includes(item.id)).map((item) => (React.createElement("button", { key: item.id, onClick: () => {
                    setSeccionActual(item.id);
                    setArticuloSeleccionado(null);
                    setMenuAbierto(false);
                }, className: `w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 font-bold text-sm tracking-wide transition-colors ${seccionActual === item.id
                    ? 'bg-teal-600 text-white '
                    : 'text-slate-700 hover:bg-slate-100'}` },
                React.createElement(Icon, { name: item.icon, className: "w-5 h-5" }),
                ui.nav[item.id] || item.label)))))),
        React.createElement("main", { className: "flex-1 min-h-0 overflow-visible" },
            seccionActual === 'inicio' && React.createElement(Master4Home, { go: setSeccionActual, onReserve: abrirReserva, lang: lang }),
            seccionActual === 'master4_descubre' && React.createElement(Master4DiscoverRio, { go: setSeccionActual }),
            seccionActual === 'rio_hoje' && React.createElement(RioHojeV1, { go: setSeccionActual, lang: lang }),
            seccionActual === 'recorridos_ernestinho' && React.createElement("section", { className: "min-h-[70vh] bg-slate-950 text-white flex items-center justify-center px-4" },
                React.createElement("div", { className: "text-center" },
                    React.createElement("h1", { className: "text-4xl sm:text-7xl font-black" }, lang === 'pt' ? 'ROTEIROS ERNESTINHO' : lang === 'en' ? 'ERNESTINHO ROUTES' : 'RECORRIDOS ERNESTINHO'),
                    React.createElement("p", { className: "mt-5 text-2xl sm:text-3xl font-black text-amber-300" }, lang === 'pt' ? 'Em breve' : lang === 'en' ? 'Coming soon' : 'Próximamente'))),
            seccionActual === 'hola_ernestinho' && React.createElement(ECLazyRoute,{src:'/assets/chunks/ernestinho-story.js?v=20260922',name:'ErnestinhoStory',componentProps:{ go: setSeccionActual, lang: lang }}),
            seccionActual === 'master4_live_rio' && React.createElement(Master4LiveRio, { go: setSeccionActual }),
            seccionActual === 'master4_tv' && React.createElement(Master4TV, { go: setSeccionActual, lang: lang }),
            seccionActual === 'master4_playas' && React.createElement(Master4BeachIndexV3, { go: setSeccionActual }),
            seccionActual === 'master4_museos' && React.createElement(ECLazyRoute,{src:'/assets/chunks/master4-catalog-page.js?v=20260922',name:'Master4CatalogPage',componentProps:{ kind: "museos", go: setSeccionActual }}),
            seccionActual === 'master4_naturaleza' && React.createElement(ECLazyRoute,{src:'/assets/chunks/master4-catalog-page.js?v=20260922',name:'Master4CatalogPage',componentProps:{ kind: "naturaleza", go: setSeccionActual }}),
            seccionActual === 'master4_barrios' && React.createElement(Master4Barrios, { go: setSeccionActual, lang: lang }),
            seccionActual === 'master4_gastronomia' && React.createElement(ECLazyRoute,{src:'/assets/chunks/master4-life-page.js?v=20260922',name:'Master4LifePage',componentProps:{ kind: "gastronomia", go: setSeccionActual }}),
            seccionActual === 'master4_copacabana_comer' && React.createElement(ECLazyRoute,{src:'/assets/chunks/master4-copacabana-food.js?v=20260922',name:'Master4CopacabanaFood',componentProps:{ go: setSeccionActual }}),
            seccionActual === 'master4_transportes' && React.createElement(ECLazyRoute,{src:'/assets/chunks/master4-life-page.js?v=20260922',name:'Master4LifePage',componentProps:{ kind: "transportes", go: setSeccionActual }}),
            seccionActual === 'master4_consejos' && React.createElement(ECLazyRoute,{src:'/assets/chunks/master4-life-page.js?v=20260922',name:'Master4LifePage',componentProps:{ kind: "consejos", go: setSeccionActual }}),
            seccionActual === 'master4_patrimonio' && React.createElement(Master4MoreRio, { kind: "patrimonio", go: setSeccionActual }),
            seccionActual === 'master4_ocio' && React.createElement(Master4MoreRio, { kind: "ocio", go: setSeccionActual }),
            seccionActual === 'master4_viaje' && React.createElement(Master4MoreRio, { kind: "viaje", go: setSeccionActual }),
            seccionActual === 'master4_experiencias' && React.createElement(ECLazyRoute,{src:'/assets/chunks/master4-experiences.js?v=20260922',name:'Master4Experiences',componentProps:{ go: setSeccionActual, lang: lang }}),
            seccionActual === 'partner_rio_samba' && React.createElement(PartnerOfficialExperience, { type: "rio-samba", go: setSeccionActual }),
            seccionActual === 'partner_carnaval' && React.createElement(PartnerOfficialExperience, { type: "carnaval", go: setSeccionActual }),
            seccionActual === 'master4_para_mi' && React.createElement(ECLazyRoute,{src:'/assets/chunks/master4-situation-engine.js?v=20260922',name:'Master4SituationEngine',componentProps:{ go: setSeccionActual }}),
            seccionActual === 'master4_place_forte' && React.createElement(Master4Place, { place: "forte-copacabana", go: setSeccionActual }),
            seccionActual === 'master4_place_lage' && React.createElement(Master4Place, { place: "parque-lage-40", go: setSeccionActual }),
            seccionActual === 'master4_place_amanha' && React.createElement(Master4Place, { place: "museu-amanha-40", go: setSeccionActual }),
            seccionActual === 'master4_place_ipanema' && React.createElement(Master4Place, { place: "ipanema-40", go: setSeccionActual }),
            seccionActual === 'master4_museos_real' && React.createElement(Master4MuseumsReal, { go: setSeccionActual }),
            seccionActual === 'master4_playas_real' && React.createElement(Master4LegacyDataHub, { kind: "playas", go: setSeccionActual }),
            seccionActual === 'master4_centros_real' && React.createElement(Master4LegacyDataHub, { kind: "centros", go: setSeccionActual }),
            seccionActual === 'master4_teatros_real' && React.createElement(Master4LegacyDataHub, { kind: "teatros", go: setSeccionActual }),
            seccionActual === 'master4_iglesias_real' && React.createElement(Master4LegacyDataHub, { kind: "iglesias", go: setSeccionActual }),
            seccionActual === 'master4_gastronomia_real' && React.createElement(Master4LegacyDataHub, { kind: "gastronomia", go: setSeccionActual }),
            seccionActual === 'master4_noche_real' && React.createElement(Master4LegacyDataHub, { kind: "noche", go: setSeccionActual }),
            seccionActual === 'master4_ferias_real' && React.createElement(Master4LegacyDataHub, { kind: "ferias", go: setSeccionActual }),
            seccionActual === 'master4_mercados_real' && React.createElement(Master4LegacyDataHub, { kind: "mercados", go: setSeccionActual }),
            seccionActual === 'master4_shoppings_real' && React.createElement(Master4LegacyDataHub, { kind: "shoppings", go: setSeccionActual }),
            seccionActual === 'master4_city_registry' && React.createElement(ECLazyRoute,{src:'/assets/chunks/master4-city-registry.js?v=20260922',name:'Master4CityRegistry',componentProps:{ go: setSeccionActual }}),
            seccionActual === 'master4_guias_especiales' && React.createElement(Master4SpecialGuides, { go: setSeccionActual }),
            seccionActual === 'master4_smart_rio' && React.createElement(Master4SmartRioV4, { go: setSeccionActual, lang: lang }),
            seccionActual === 'master4_entity_detail' && React.createElement(Master4EntityDetailV4, { go: setSeccionActual }),
            seccionActual === 'master4_entity_v4' && React.createElement(Master4EntityDetailV4, { go: setSeccionActual }),
            seccionActual === 'master4_planner' && React.createElement(Master4Planner, { go: setSeccionActual }),
            seccionActual === 'grandes_eventos' && React.createElement(ECLazyRoute,{src:'/assets/chunks/grandes-eventos-page.js?v=20260922',name:'GrandesEventosPage',componentProps:{ onBack: volverUnaVista }}),
            seccionActual === 'master4_city_brain' && React.createElement(Master4CityBrain, { go: setSeccionActual }),
            seccionActual === 'master4_place_cristo' && React.createElement(Master4Place, { place: "cristo-40", go: setSeccionActual }),
            seccionActual === 'master4_place_pao' && React.createElement(Master4Place, { place: "pao-acucar-40", go: setSeccionActual }),
            seccionActual === 'master4_place_jardim' && React.createElement(Master4Place, { place: "jardim-botanico-40", go: setSeccionActual }),
            seccionActual === 'master4_place_tijuca' && React.createElement(Master4Place, { place: "floresta-tijuca-40", go: setSeccionActual }),
            seccionActual === 'master4_place_pedra' && React.createElement(Master4Place, { place: "pedra-bonita-40", go: setSeccionActual }),
            seccionActual === 'master4_place_mar' && React.createElement(Master4Place, { place: "mar-40", go: setSeccionActual }),
            seccionActual === 'master4_place_mam' && React.createElement(Master4Place, { place: "mam-40", go: setSeccionActual }),
            seccionActual === 'master4_place_catete' && React.createElement(Master4Place, { place: "catete-40", go: setSeccionActual }),
            seccionActual === 'master4_place_musal' && React.createElement(Master4Place, { place: "aerospacial-40", go: setSeccionActual }),
            seccionActual === 'master4_place_santa' && React.createElement(Master4Place, { place: "santa-teresa-40", go: setSeccionActual }),
            seccionActual === 'master4_place_lapa' && React.createElement(Master4Place, { place: "lapa-40", go: setSeccionActual }),
            seccionActual === 'master4_place_aquario' && React.createElement(Master4Place, { place: "aqua-40", go: setSeccionActual }),
            seccionActual === 'master4_place_maracana' && React.createElement(Master4Place, { place: "maracana-40", go: setSeccionActual }),
            seccionActual === 'master4_place_gabinete' && React.createElement(Master4Place, { place: "real-gabinete-40", go: setSeccionActual }),
            seccionActual === 'master4_place_selaron' && React.createElement(Master4Place, { place: "selaron-40", go: setSeccionActual }),
            seccionActual === 'master4_place_buzios' && React.createElement(Master4Place, { place: "buzios-40", go: setSeccionActual }),
            seccionActual === 'guia' && (React.createElement(GuiaRioCompleta, { onNavegar: setSeccionActual, onArticulo: verArticulo, tema: temaGuia, setTema: setTemaGuia, lang: lang })),
            seccionActual === 'transporte_publico' && (React.createElement(GuiaTransportePublico, { onVolver: volverUnaVista, onMetro: () => setSeccionActual('transporte_metro'), modo: modoTransportePublico, setModo: setModoTransportePublico })),
            seccionActual === 'guia_anterior' && React.createElement(ECLazySection,{group:'legacy-guides',section:'guia_anterior',sectionProps:{T:T,go:setSeccionActual,museoSeleccionado:museoSeleccionado,setMuseoSeleccionado:setMuseoSeleccionado}}),
            seccionActual === 'experiencias' && React.createElement(ECLazyRoute,{src:'/assets/chunks/legacy-experiences.js?v=20260923',name:'ECLegacyExperiences',componentProps:{T:T,go:setSeccionActual,onReserve:abrirReserva,onBack:volverUnaVista,lang:lang}}),
            seccionActual === 'full_day_rio' && React.createElement(ECExperienceDetail,{kind:'full_day_rio',T:T,onBack:volverUnaVista,onReserve:abrirReserva}),
            seccionActual === 'buzios' && React.createElement(ECExperienceDetail,{kind:'buzios',T:T,onBack:volverUnaVista,onReserve:abrirReserva}),
            seccionActual === 'detalle_exp-3' && React.createElement(ECExperienceDetail,{kind:'detalle_exp-3',T:T,onBack:volverUnaVista,onReserve:abrirReserva}),
            seccionActual === 'detalle_exp-4' && React.createElement(ECExperienceDetail,{kind:'detalle_exp-4',T:T,onBack:volverUnaVista,onReserve:abrirReserva}),
            seccionActual === 'detalle_exp-5' && React.createElement(ECExperienceDetail,{kind:'detalle_exp-5',T:T,onBack:volverUnaVista,onReserve:abrirReserva}),
            seccionActual === 'transportes' && React.createElement(ECLazySection,{group:'transport',section:'transportes',sectionProps:{T:T,onBack:volverUnaVista,go:setSeccionActual,lang:lang}}),
            seccionActual === 'transporte_uber' && React.createElement(ECLazySection,{group:'transport',section:'transporte_uber',sectionProps:{T:T,onBack:volverUnaVista,go:setSeccionActual,lang:lang}}),
            seccionActual === 'transporte_metro' && React.createElement(ECLazySection,{group:'transport',section:'transporte_metro',sectionProps:{T:T,onBack:volverUnaVista,go:setSeccionActual,lang:lang}}),
            seccionActual === 'transporte_bicicletas' && React.createElement(ECLazySection,{group:'transport',section:'transporte_bicicletas',sectionProps:{T:T,onBack:volverUnaVista,go:setSeccionActual,lang:lang}}),
            seccionActual === 'transporte_privado' && React.createElement(ECLazySection,{group:'transport',section:'transporte_privado',sectionProps:{T:T,onBack:volverUnaVista,go:setSeccionActual,lang:lang}}),
            seccionActual === 'que_hacer' && (React.createElement("section", { className: "py-12 bg-[#071313] text-white min-h-screen" },
                React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
                    React.createElement("div", { className: "text-center max-w-3xl mx-auto mb-12" },
                        React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4" }, "Qu\u00E9 Hacer en R\u00EDo"),
                        React.createElement("p", { className: "text-white/65" }, "Todas las opciones de Río organizadas por categoría. Elige una tarjeta para abrir su catálogo y ver cada lugar o experiencia en detalle.")),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8" }, CATEGORIAS_QUE_HACER.map((cat) => (React.createElement("div", { key: cat.id, className: "bg-[#102424] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-300/60 transition-all flex flex-col  " },
                        React.createElement("button", { onClick: () => setSeccionActual(cat.id), className: "block w-full aspect-[4/3] overflow-hidden bg-slate-100 text-left", "aria-label": `Abrir ${cat.nombre}` },
                            React.createElement("img", { src: cat.img, alt: `${cat.nombre} en Río de Janeiro con Ernestinho`, className: "w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]", loading: "lazy" })),
                        React.createElement("div", { className: "p-5 flex flex-col flex-1" },
                            React.createElement("div", { className: "flex items-center gap-2 mb-2" },
                                React.createElement("span", { className: "text-2xl" }, cat.icon),
                                React.createElement("h3", { className: "text-xl font-black text-white uppercase tracking-wide" }, cat.nombre)),
                            React.createElement("p", { className: "text-white/60 text-sm mb-5 flex-1" }, cat.desc),
                            React.createElement("button", { onClick: () => setSeccionActual(cat.id), className: "w-full bg-amber-300 hover:bg-amber-200 text-slate-950 border border-amber-200 font-black text-xs uppercase py-3 rounded-xl transition-all flex items-center justify-center gap-2" },
                                React.createElement("span", null, "VER M\u00C1S"),
                                React.createElement(Icon, { name: "chevron-right", className: "w-4 h-4" })))))))))),
            seccionActual === 'gastronomia' && (React.createElement(GastronomiaAfinada, { onVolver: () => setSeccionActual('que_hacer'), initialSel: (restauranteSeleccionado && restauranteSeleccionado.nueva ? restauranteSeleccionado.id : null) })),
            seccionActual === 'nocturna' && (React.createElement(VidaNocturnaCompleta, { onVolver: volverUnaVista })),
            seccionActual === 'naturaleza' && (React.createElement(GuiaSenderos, { onVolver: volverUnaVista, onReservar: (nombre) => abrirReserva(nombre || 'Pedra da Gávea') })),
            seccionActual === 'aventura' && (React.createElement(Master4AventuraPage, { go: setSeccionActual })),
            seccionActual === 'fotografia' && (React.createElement(GuiaFotografia, { onVolver: volverUnaVista })),
            seccionActual === 'pix' && (React.createElement(GuiaPix, { onVolver: volverUnaVista })),
            seccionActual === 'atracciones' && React.createElement(ECLazySection,{group:'attractions',section:'atracciones',sectionProps:{T:T,onBack:volverUnaVista,go:setSeccionActual,lang:lang}}),
            seccionActual === 'museos' && React.createElement(ECLazySection,{group:'museums',section:'museos',sectionProps:{T:T,go:setSeccionActual,museoSeleccionado:museoSeleccionado,setMuseoSeleccionado:setMuseoSeleccionado}}),
            seccionActual === 'espacios_literarios' && (React.createElement(SeccionEspaciosLiterarios, { key: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'espacios_literarios' ? detalleRuta.id : 'literarios', seleccionInicial: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'espacios_literarios' ? detalleRuta.id : null })),
            seccionActual === 'centros_culturales' && (React.createElement(SeccionCentrosCulturales, { key: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'centros_culturales' ? detalleRuta.id : 'centros', seleccionInicial: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'centros_culturales' ? detalleRuta.id : null })),
            seccionActual === 'teatros' && (React.createElement(SeccionTeatros, { key: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'teatros' ? detalleRuta.id : 'teatros', seleccionInicial: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'teatros' ? detalleRuta.id : null })),
            seccionActual === 'iglesias' && (React.createElement(SeccionIglesias, { key: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'iglesias' ? detalleRuta.id : 'iglesias', seleccionInicial: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'iglesias' ? detalleRuta.id : null })),
            seccionActual === 'fuertes_fortalezas' && (React.createElement(SeccionFuertesFortalezas, { key: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'fuertes_fortalezas' ? detalleRuta.id : 'fuertes', seleccionInicial: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'fuertes_fortalezas' ? detalleRuta.id : null })),
            seccionActual === 'familia' && (React.createElement(SeccionFamilia, { key: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'familia' ? detalleRuta.id : 'familia', seleccionInicial: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'familia' ? detalleRuta.id : null, onVolver: () => setSeccionActual('que_hacer') })),
            seccionActual === 'consejos' && (React.createElement(ConsejosErnestinho, { onArticulo: verArticulo, onNavegar: setSeccionActual, onAbrirDetalle: abrirDetalleRuta, seleccionado: consejoSeleccionado, setSeleccionado: setConsejoSeleccionado, lang: lang })),
            seccionActual === 'consejos_anterior' && React.createElement(ECLazySection,{group:'legacy-guides',section:'consejos_anterior',sectionProps:{T:T,go:setSeccionActual,museoSeleccionado:museoSeleccionado,setMuseoSeleccionado:setMuseoSeleccionado}}),
            seccionActual === 'playas' && React.createElement(ECLazySection,{group:'beaches',section:'playas',sectionProps:{T:T,onBack:volverUnaVista,go:setSeccionActual,lang:lang}}),
            seccionActual === 'compras' && React.createElement(ComprasCompletas, { go: setSeccionActual }),
            seccionActual === 'copa_para_mi' && (React.createElement(React.Fragment, null,
                React.createElement(CopacabanaMasterSystems, { go: setSeccionActual }),
                React.createElement(CopacabanaMaster3Editorial, null),
                React.createElement(CopacabanaParaMi, null))),
            seccionActual === 'rio_mes_a_mes' && React.createElement(ECLazyRoute,{src:'/assets/chunks/master3-month-weather-planner.js?v=20260922',name:'Master3MonthWeatherPlanner',componentProps:{ lang: lang }}),
            seccionActual === 'barrios' && React.createElement(BarriosBeta23Embed, { go: setSeccionActual }),
            seccionActual === 'hospedaje' && React.createElement(ECLazySection,{group:'hospitality',section:'hospedaje',sectionProps:{T:T,onBack:volverUnaVista,go:setSeccionActual,lang:lang}}),
            seccionActual === 'cafe' && React.createElement(ECLazySection,{group:'cafe',section:'cafe',sectionProps:{T:T,onBack:volverUnaVista,go:setSeccionActual,lang:lang}}),
            seccionActual === 'privacidad' && React.createElement(ECLazySection,{group:'privacy',section:'privacidad',sectionProps:{T:T,onBack:volverUnaVista,go:setSeccionActual,lang:lang}}),
            seccionActual === 'articulo_detalle' && articuloSeleccionado && React.createElement(ECLazyRoute,{src:'/assets/chunks/article-detail.js?v=20260923',name:'ECArticleDetail',componentProps:{articuloSeleccionado:articuloSeleccionado,onBack:volverUnaVista}}),
        modalReservaOpen && (React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn" },
            React.createElement("div", { className: "bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8  border border-slate-100 relative" },
                React.createElement("button", { onClick: () => setModalReservaOpen(false), className: "absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors" },
                    React.createElement(Icon, { name: "x", className: "w-5 h-5" })),
                React.createElement("div", { className: "mb-6" },
                    React.createElement("span", { className: "text-xs font-bold text-teal-600 uppercase tracking-widest block mb-1" }, "Reserva Directa"),
                    React.createElement("h3", { className: "text-xl font-black text-slate-900 leading-snug" }, (expParaReservar === null || expParaReservar === void 0 ? void 0 : expParaReservar.titulo) || 'Consulta de Tour')),
                React.createElement("form", { onSubmit: enviarReservaWhatsApp, className: "space-y-4" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold uppercase text-slate-700 mb-1" }, "Tu Nombre Completo"),
                        React.createElement("input", { type: "text", required: true, value: reservaDatos.nombre, onChange: (e) => setReservaDatos({ ...reservaDatos, nombre: e.target.value }), placeholder: "Ej. Ana Garc\u00EDa", className: "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-600" })),
                    React.createElement("div", { className: "grid grid-cols-2 gap-4" },
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-xs font-bold uppercase text-slate-700 mb-1" }, "Fecha Estimada"),
                            React.createElement("input", { type: "date", required: true, value: reservaDatos.fecha, onChange: (e) => setReservaDatos({ ...reservaDatos, fecha: e.target.value }), className: "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-600" })),
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-xs font-bold uppercase text-slate-700 mb-1" }, "N\u00BA Personas"),
                            React.createElement("input", { type: "number", min: "1", max: "20", value: reservaDatos.personas, onChange: (e) => setReservaDatos({ ...reservaDatos, personas: e.target.value }), className: "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-600" }))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold uppercase text-slate-700 mb-1" }, "Tel\u00E9fono (WhatsApp)"),
                        React.createElement("input", { type: "tel", required: true, value: reservaDatos.telefono, onChange: (e) => setReservaDatos({ ...reservaDatos, telefono: e.target.value }), placeholder: "+54 9 11 1234 5678", className: "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-600" })),
                    React.createElement("button", { type: "submit", className: "w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase py-4 rounded-xl transition-all  mt-2 flex items-center justify-center gap-2" },
                        React.createElement(Icon, { name: "message-circle", className: "w-5 h-5" }),
                        "Enviar Consulta a WhatsApp"))))),
        seccionActual === 'inicio' && (React.createElement("section", { className: "bg-slate-950/95 border-t border-slate-800 pt-8 pb-2" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
                React.createElement("div", { className: "max-w-2xl mx-auto" },
                    React.createElement("button", { onClick: () => setSeccionActual('master4_tv'), className: "w-full rounded-[2rem] bg-white p-6 sm:p-8 text-left flex gap-5 items-center " },
                        React.createElement("span", { className: "text-5xl" }, "\uD83D\uDCFA"),
                        React.createElement("div", null,
                            React.createElement("span", { className: "text-[9px] font-black text-teal-700 tracking-widest" }, "CONOCE A ERNESTINHO"),
                            React.createElement("h3", { className: "text-2xl font-black text-slate-950" }, "Ernestinho en TV"),
                            React.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "Reportajes, entrevistas y programas de Chile, Argentina y otros medios.")),
                        React.createElement("span", { className: "ml-auto text-2xl text-slate-950" }, "\u2192")))))),
        React.createElement("footer", { className: "bg-slate-950 text-slate-400 py-12 border-t border-slate-800" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
                React.createElement("div", { className: "flex flex-col md:flex-row items-center justify-between gap-6" },
                    React.createElement("div", { className: "flex items-center gap-3" },
                        React.createElement("div", { className: "w-10 h-10 rounded-full bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-700" },
                            React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/89161BC4-595E-455D-8211-87277AC58B53", alt: "Ernestinho Carioca Logo", className: "w-full h-full object-cover" })),
                        React.createElement("div", null,
                            React.createElement("span", { className: "text-lg font-black text-white uppercase tracking-tight block" },
                                "Ernestinho ",
                                React.createElement("span", { className: "text-teal-500" }, "Carioca")),
                            React.createElement("span", { className: "text-[10px] text-slate-500 uppercase tracking-widest block" }, "R\u00EDo de Janeiro desde mi mirada"))),
                    React.createElement("div", { className: "text-center md:text-right" },
                        React.createElement("p", { className: "text-xs text-slate-500" },
                            "\u00A9 ",
                            new Date().getFullYear(),
                            " Ernestinho Carioca. Todos los derechos reservados.",
                            React.createElement("br", null),
                            "Dise\u00F1ado para viajeros que buscan vivir R\u00EDo de forma real y aut\u00E9ntica."),
                        React.createElement("button", { onClick: () => setSeccionActual('privacidad'), className: "text-xs text-teal-400 hover:text-teal-300 font-bold mt-3" }, "Privacidad, precios y condiciones")))))));
}
// MULTIDIOMA REAL · traducción EN EL RENDER de React.
// El sistema anterior dependía de modificar el DOM después del render.
// Esta capa intercepta los textos antes de que React los pinte, por lo que
// también funciona al abrir Guía, Experiencias, Eventos, Transportes y fichas profundas.
(() => {
    if (React.__ernestinhoI18nCreateElementInstalled)
        return;
    const originalCreateElement = React.createElement.bind(React);
    const norm = (v) => String(v !== null && v !== void 0 ? v : '')
        .replace(/\u00a0/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    const cache = { pt: null, en: null, attrPt: null, attrEn: null };
    const getMap = (kind, lang) => {
        const source = kind === 'attr'
            ? (window.__ernestinhoRenderATTR || {})
            : (window.__ernestinhoRenderUI || {});
        return source[lang] || {};
    };
    const lookup = (kind, lang, value) => {
        var _a, _b;
        if (lang === 'es' || typeof value !== 'string')
            return value;
        const map = getMap(kind, lang);
        if (Object.prototype.hasOwnProperty.call(map, value))
            return map[value];
        const cacheKey = kind === 'attr'
            ? (lang === 'pt' ? 'attrPt' : 'attrEn')
            : lang;
        const nk = norm(value);
        if (!cache[cacheKey] || cache[cacheKey].source !== map) {
            const normalized = new Map();
            Object.keys(map).forEach(k => {
                const key = norm(k);
                if (!normalized.has(key))
                    normalized.set(key, map[k]);
            });
            cache[cacheKey] = { source: map, normalized };
        }
        let translated = cache[cacheKey].normalized.get(nk);
        if (translated)
            return translated;
        // Safe dynamic patterns whose variable part is a proper name/entity.
        if (kind === 'ui') {
            if (lang === 'pt') {
                if (/^Mapa de .+/.test(nk))
                    translated = nk.replace(/^Mapa de /, 'Mapa de ');
                else if (/^Abrir .+/.test(nk))
                    translated = nk.replace(/^Abrir /, 'Abrir ');
                else if (/^Ver .+/.test(nk))
                    translated = nk.replace(/^Ver /, 'Ver ');
                else if (/^(.+) en Río de Janeiro \| Ernestinho Carioca$/.test(nk))
                    translated = nk.replace(/ en Río de Janeiro \| Ernestinho Carioca$/, ' no Rio de Janeiro | Ernestinho Carioca');
                else if (/^(.+) en Río de Janeiro$/.test(nk))
                    translated = nk.replace(/ en Río de Janeiro$/, ' no Rio de Janeiro');
                else if (/^encaja con .+/.test(nk))
                    translated = nk.replace(/^encaja con /, 'combina com ');
                else if (/^desde .+/.test(nk))
                    translated = nk.replace(/^desde /, 'a partir de ');
            }
            else if (lang === 'en') {
                if (/^Mapa de .+/.test(nk))
                    translated = nk.replace(/^Mapa de /, 'Map of ');
                else if (/^Abrir .+/.test(nk))
                    translated = nk.replace(/^Abrir /, 'Open ');
                else if (/^Ver .+/.test(nk))
                    translated = nk.replace(/^Ver /, 'View ');
                else if (/^(.+) en Río de Janeiro \| Ernestinho Carioca$/.test(nk))
                    translated = nk.replace(/ en Río de Janeiro \| Ernestinho Carioca$/, ' in Rio de Janeiro | Ernestinho Carioca');
                else if (/^(.+) en Río de Janeiro$/.test(nk))
                    translated = nk.replace(/ en Río de Janeiro$/, ' in Rio de Janeiro');
                else if (/^encaja con .+/.test(nk))
                    translated = nk.replace(/^encaja con /, 'fits with ');
                else if (/^desde .+/.test(nk))
                    translated = nk.replace(/^desde /, 'from ');
            }
        }
        if (!translated)
            return value;
        // Preserve leading/trailing whitespace exactly as React received it.
        const lead = ((_a = value.match(/^\s*/)) === null || _a === void 0 ? void 0 : _a[0]) || '';
        const tail = ((_b = value.match(/\s*$/)) === null || _b === void 0 ? void 0 : _b[0]) || '';
        return lead + translated + tail;
    };
    const translateChild = (child, lang) => {
        if (typeof child === 'string')
            return lookup('ui', lang, child);
        if (Array.isArray(child))
            return child.map(c => translateChild(c, lang));
        return child;
    };
    React.createElement = function (type, props, ...children) {
        const lang = window.__ernestinhoRenderLang || 'es';
        let nextProps = props;
        if (props && lang !== 'es') {
            nextProps = { ...props };
            ['placeholder', 'title', 'aria-label', 'alt'].forEach(attr => {
                if (typeof nextProps[attr] === 'string') {
                    nextProps[attr] = lookup('attr', lang, nextProps[attr]);
                }
            });
        }
        const nextChildren = lang === 'es'
            ? children
            : children.map(child => translateChild(child, lang));
        return originalCreateElement(type, nextProps, ...nextChildren);
    };
    React.__ernestinhoI18nCreateElementInstalled = true;
})();
/* guide editorial extensions loaded by data-bootstrap.js */
// Renderizado en el contenedor HTML objetivo
const rootElement = document.getElementById('ernestinho-carioca-root');
window.__ERNESTINHO_V4_3_SELFTEST__ = { version: '4.3', status: 'DEFERRED_V45' };
window.__ERNESTINHO_V4_4_SELFTEST__ = { version: '4.4', status: 'DEFERRED_V45' };
window.__ERNESTINHO_MEDIA_COVERAGE__ = window.__ERNESTINHO_MEDIA_COVERAGE__ || { status: 'DEFERRED_V45' };
window.__ERNESTINHO_TEMPORAL_COVERAGE__ = window.__ERNESTINHO_TEMPORAL_COVERAGE__ || { status: 'DEFERRED_V45' };
// V4.5 PERFORMANCE — defaults globales sin tocar identidad/media canónica.
const __v45ReactCreateElement = React.createElement;
React.createElement = function (type, props, ...children) {
    let next = props;
    if (type === 'img') {
        next = { ...(props || {}) };
        if (!next.loading)
            next.loading = 'lazy';
        if (!next.decoding)
            next.decoding = 'async';
    }
    else if (type === 'iframe') {
        next = { ...(props || {}) };
        if (!next.loading)
            next.loading = 'lazy';
    }
    return __v45ReactCreateElement.call(React, type, next, ...children);
};
const root = ReactDOM.createRoot(rootElement);
// AQUÍ · AHORA V1 — traducciones visibles principales
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_109||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_110||{});
// CAFÉ RIO — traducciones completas PT/EN
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_111||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_112||{});
// GASTRONOMÍA PT-BR — tanda final 171–173: Xian, Xodózin y Yūsha
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_113||{});
// GASTRONOMÍA PT-BR — ficha 1: Marius Degustare
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_114||{});
// GASTRONOMÍA PT-BR — fichas 2–6
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_115||{});
// GASTRONOMÍA PT-BR — fichas 7–11
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_116||{});
// GASTRONOMÍA PT-BR — fichas 12–16
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_117||{});
// GASTRONOMÍA PT-BR — fichas 17–21
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_118||{});
// GASTRONOMÍA PT-BR — fichas 22–26
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_119||{});
// GASTRONOMÍA PT-BR — fichas 27–31
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_120||{});
// GASTRONOMÍA PT-BR — fichas 32–36
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_121||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_122||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_123||{});
// GASTRONOMÍA PT-BR — fichas 37–41
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_124||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_125||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_126||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_127||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_128||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_129||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_130||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_131||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_132||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_133||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_134||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_135||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_136||{});

/* ERNESTINHO V7 — auditoría exhaustiva Guía + Experiencias; prioridad final */
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_137||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_138||{});

/* V31.2 — ATRACCIONES / MUSEOS: cobertura PT-BR + EN auditada */
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_139||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_140||{});


/* V31.3 — MUSEOS: segunda auditoría de interfaz y textos residuales */
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_141||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_142||{});


/* V31.4 — MUSEOS: auditoría palabra por palabra, segunda cobertura */
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_143||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_144||{});


/* V31.5 — MUSEOS FINAL: normalización ES/PT/EN y variantes de render */
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_145||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_146||{});


Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_147||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_148||{});

/* V31.11 — MUSEOS auditoría palabra por palabra */
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_149||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_150||{});

/* V31.12 — MUSEOS: cierre exhaustivo de listas y microtextos */
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_151||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_152||{});

/* V31.17 — CENTROS CULTURALES: auditoría completa PT/EN */
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_153||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_154||{});

/* V31.18 — CENTROS CULTURALES: segunda auditoría lingüística */
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_155||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_156||{});

/* V31.19 — Centros Culturales revisión semántica final */
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,{"Arma un circuito gratuito con CCBB, Casa França-Brasil y Correios: los tres están prácticamente juntos.": "Monte um circuito gratuito com o CCBB, a Casa França-Brasil e os Correios: os três ficam praticamente juntos.", "Create a free cultural circuit with CCBB, Casa França-Brasil and Correios: all three are practically next to one another.": "Monte um circuito gratuito com o CCBB, a Casa França-Brasil e os Correios: os três ficam praticamente juntos.", "Visítalo dentro de un circuito de la herencia africana que incluya IPN, Cais do Valongo, Pedra do Sal y MUHCAB.": "Visite-o dentro de um circuito da herança africana que inclua o IPN, o Cais do Valongo, a Pedra do Sal e o MUHCAB.", "Visit it as part of an African-heritage circuit that includes IPN, Cais do Valongo, Pedra do Sal and MUHCAB.": "Visite-o dentro de um circuito da herança africana que inclua o IPN, o Cais do Valongo, a Pedra do Sal e o MUHCAB."});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,{"Arma un circuito gratuito con CCBB, Casa França-Brasil y Correios: los tres están prácticamente juntos.": "Create a free cultural circuit with CCBB, Casa França-Brasil and Correios: all three are practically next to one another.", "Monte um circuito gratuito com o CCBB, a Casa França-Brasil e os Correios: os três ficam praticamente juntos.": "Create a free cultural circuit with CCBB, Casa França-Brasil and Correios: all three are practically next to one another.", "Visítalo dentro de un circuito de la herencia africana que incluya IPN, Cais do Valongo, Pedra do Sal y MUHCAB.": "Visit it as part of an African-heritage circuit that includes IPN, Cais do Valongo, Pedra do Sal and MUHCAB.", "Visite-o dentro de um circuito da herança africana que inclua o IPN, o Cais do Valongo, a Pedra do Sal e o MUHCAB.": "Visit it as part of an African-heritage circuit that includes IPN, Cais do Valongo, Pedra do Sal and MUHCAB."});

/* V31.20 — Centros Culturales: revisión centro por centro */
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_157||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_158||{});

/* V31.21 — CENTROS CULTURALES: cierre TOTAL de UI + dataset */
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_159||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_160||{});

Object.assign(GLOBAL_UI_TRANSLATIONS.pt,{"Centros culturales de R\\u00EDo": "Centros culturais do Rio", "Exposiciones, m\\u00FAsica, cine, patrimonio y espacios que cuentan diferentes cap\\u00EDtulos de la historia de R\\u00EDo de Janeiro.": "Exposições, música, cinema, patrimônio e espaços que contam diferentes capítulos da história do Rio de Janeiro.", "Qu\\u00E9 encontrar\\u00E1s": "O que você encontrará", "C\\u00F3mo llegar": "Como chegar", "Ubicaci\\u00F3n": "Localização", "\\u00BFQuieres organizar tu circuito cultural?": "Quer organizar seu circuito cultural?", "Ernestinho puede ayudarte a preparar un recorrido cultural por R\\u00EDo de Janeiro.": "Ernestinho pode ajudar você a preparar um roteiro cultural pelo Rio de Janeiro."});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,{"Centros culturales de R\\u00EDo": "Rio Cultural Centers", "Exposiciones, m\\u00FAsica, cine, patrimonio y espacios que cuentan diferentes cap\\u00EDtulos de la historia de R\\u00EDo de Janeiro.": "Exhibitions, music, cinema, heritage and spaces that tell different chapters of Rio de Janeiro's history.", "Qu\\u00E9 encontrar\\u00E1s": "What you'll find", "C\\u00F3mo llegar": "How to get there", "Ubicaci\\u00F3n": "Location", "\\u00BFQuieres organizar tu circuito cultural?": "Would you like to organize your cultural itinerary?", "Ernestinho puede ayudarte a preparar un recorrido cultural por R\\u00EDo de Janeiro.": "Ernestinho can help you plan a cultural itinerary through Rio de Janeiro."});

/* V31.22 — ESPACIOS LITERARIOS: dataset + UI completa PT/EN */
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_161||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_162||{});
window.GLOBAL_UI_TRANSLATIONS = GLOBAL_UI_TRANSLATIONS;

/* ec-consejos-translation-progress-v3177 */
window.GLOBAL_UI_TRANSLATIONS=window.GLOBAL_UI_TRANSLATIONS||{pt:{},en:{}};
window.GLOBAL_UI_TRANSLATIONS.pt=window.GLOBAL_UI_TRANSLATIONS.pt||{};
window.GLOBAL_UI_TRANSLATIONS.en=window.GLOBAL_UI_TRANSLATIONS.en||{};
const __ecInitialNeedsCulture = /\/(museos|familia|teatros|iglesias)(\/|$)/.test(window.location.pathname) || /master4_(museos|teatros|iglesias)/.test(window.location.pathname);
(__ecInitialNeedsCulture ? __ecEnsureCultureData() : Promise.resolve())
    .then(() => root.render(React.createElement(AppErnestinho, null)))
    .catch((e) => { console.error(e); root.render(React.createElement(AppErnestinho, null)); });
// V4.5: diagnóstico pesado SOLO bajo demanda (?debug=1 o llamada manual).
window.__ERNESTINHO_RUN_DIAGNOSTICS__ = function () {
    var _a;
    const started = performance.now();
    const result = {};
    try {
        result.legacy = v45RunLegacyDiagnostics();
    }
    catch (e) {
        result.legacyError = String(e);
    }
    try {
        result.recommendation = (_a = window.__ERNESTINHO_RUN_V42_COVERAGE__) === null || _a === void 0 ? void 0 : _a.call(window);
    }
    catch (e) {
        result.recommendationError = String(e);
    }
    try {
        result.temporal = v43TemporalCoverage();
    }
    catch (e) {
        result.temporalError = String(e);
    }
    try {
        result.media = v44MediaCoverage();
    }
    catch (e) {
        result.mediaError = String(e);
    }
    try {
        result.v44 = v44SelfTest();
    }
    catch (e) {
        result.v44Error = String(e);
    }
    result.elapsedMs = Math.round(performance.now() - started);
    window.__ERNESTINHO_V4_5_SELFTEST__ = { version: '4.5', status: 'COMPLETED_ON_DEMAND', ...result };
    return window.__ERNESTINHO_V4_5_SELFTEST__;
};
window.__ERNESTINHO_V4_5_SELFTEST__ = { version: '4.5', status: 'READY_ON_DEMAND', run: 'window.__ERNESTINHO_RUN_DIAGNOSTICS__()' };
if (new URLSearchParams(location.search).get('debug') === '1') {
    const run = () => window.__ERNESTINHO_RUN_DIAGNOSTICS__();
    if ('requestIdleCallback' in window)
        requestIdleCallback(run, { timeout: 8000 });
    else
        setTimeout(run, 2500);
}
requestAnimationFrame(() => requestAnimationFrame(() => {
    window.__ERNESTINHO_PERFORMANCE__ = {
        version: '4.7',
        precompiledJS: true,
        babelRuntime: false,
        diagnostics: 'on-demand',
        initialCatalogBuilt: !!CANONICAL_RECOMMENDATION_CACHE,
        eagerImages: document.querySelectorAll('img[loading="eager"]').length,
        lazyImages: document.querySelectorAll('img[loading="lazy"]').length,
        lazyIframes: document.querySelectorAll('iframe[loading="lazy"]').length,
        mountedImages: document.images.length,
        note: 'V4.7 cierra AQUÍ · AHORA manteniendo el arranque rápido V4.5/V4.6; auditoría final bajo demanda.'
    };
}));
