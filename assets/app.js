

// COMPRAS_FICHAS is supplied by the existing site data layer; do not redeclare it here.

var __compraOverlay=null;var __compraBlobUrl=null;function closeCompraFicha(){if(__compraOverlay){__compraOverlay.remove();__compraOverlay=null;}if(__compraBlobUrl){URL.revokeObjectURL(__compraBlobUrl);__compraBlobUrl=null;}if(window.location.hash==="#compras-ficha")history.replaceState(null,"",window.location.pathname+window.location.search);window.scrollTo(0,window.__comprasScrollY||0);}window.addEventListener("message",function(e){if(e&&e.data&&e.data.type==="ernestinho-close-compra")closeCompraFicha();});function openCompraFicha(file){var b=COMPRAS_FICHAS.enc[file];if(!b)return;window.__comprasScrollY=window.scrollY;var bin=atob(b);var bytes=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);__compraBlobUrl=URL.createObjectURL(new Blob([bytes],{type:"text/html;charset=utf-8"}));__compraOverlay=document.createElement("div");__compraOverlay.id="ernestinhoCompraOverlay";__compraOverlay.style.cssText="position:fixed;inset:0;z-index:99999;background:#f8fafc;";var close=document.createElement("button");close.type="button";close.textContent="← VOLVER A COMPRAS";close.style.cssText="position:absolute;top:14px;left:14px;z-index:100001;background:#0b2528;color:#fff;border:0;border-radius:999px;padding:12px 16px;font:800 12px Arial;box-shadow:none!important;cursor:pointer;";close.onclick=closeCompraFicha;var frame=document.createElement("iframe");frame.title="Guía completa";frame.src=__compraBlobUrl;frame.style.cssText="width:100%;height:100%;border:0;background:#f8fafc;";frame.setAttribute("allowfullscreen","");__compraOverlay.appendChild(frame);__compraOverlay.appendChild(close);document.body.appendChild(__compraOverlay);history.replaceState({comprasFicha:true},"",window.location.pathname+window.location.search+"#compras-ficha");}
function CompraCard(x){var image=React.createElement("div",{key:"img",className:"h-56 sm:h-64 overflow-hidden bg-slate-200"},React.createElement("img",{src:x.img,alt:x.name,className:"w-full h-full object-cover",loading:"lazy"}));var zone=React.createElement("div",{key:"z",className:"text-xs font-black uppercase tracking-widest text-teal-700"},x.zone);var name=React.createElement("h3",{key:"n",className:"text-2xl sm:text-3xl font-black text-slate-900 mt-2"},x.name);var desc=React.createElement("p",{key:"d",className:"text-slate-600 mt-2 leading-relaxed"},x.desc);var button=React.createElement("button",{key:"b",type:"button",onClick:function(){openCompraFicha(x.file)},className:"mt-5 inline-flex items-center justify-center bg-slate-950 hover:bg-teal-700 text-white font-black text-xs uppercase rounded-xl px-5 py-3 transition-colors"},"ABRIR GUÍA COMPLETA →");var body=React.createElement("div",{key:"body",className:"p-5 sm:p-6"},[zone,name,desc,button]);return React.createElement("article",{key:x.file,className:"bg-white rounded-3xl overflow-hidden border border-slate-200 "},[image,body]);}
function CompraGroup(title,subtitle,quote,items,accent){var headText=React.createElement("div",{key:"txt"},[React.createElement("span",{key:"s",className:"text-amber-300 font-black text-xs uppercase tracking-widest"},"Guía editorial de Ernestinho"),React.createElement("h2",{key:"h",className:"text-3xl sm:text-5xl font-black text-white mt-2"},title),React.createElement("p",{key:"p",className:"text-slate-200 mt-3 max-w-2xl leading-relaxed"},subtitle)]);var count=React.createElement("span",{key:"count",className:"bg-white/15 text-white px-3 py-1.5 rounded-full text-xs font-black"},items.length+" guías");var head=React.createElement("div",{key:"head",className:"rounded-[2rem] p-6 sm:p-8 mb-6 "+accent},[React.createElement("div",{key:"wrap",className:"flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"},[headText,count])]);var grid=React.createElement("div",{key:"grid",className:"grid grid-cols-1 lg:grid-cols-2 gap-7"},items.map(CompraCard));var quoteEl=React.createElement("p",{key:"quote",className:"mt-5 text-sm italic text-slate-600 max-w-3xl"},quote);return React.createElement("section",{className:"mb-14"},[head,grid,quoteEl]);}
function ComprasCompletas(){const intro=React.createElement("div",{className:"text-center max-w-4xl mx-auto mb-12"},[React.createElement("span",{key:"s",className:"text-amber-500 font-black text-xs uppercase tracking-widest"},"Compras de Ernestinho Carioca"),React.createElement("h1",{key:"h",className:"text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2"},"Shoppings, ferias y mercados de Río"),React.createElement("p",{key:"p",className:"text-slate-600 text-base sm:text-lg mt-4"},"Yo te acompaño a descubrir cada lugar con una guía completa, personal y práctica.")]);const groups=[CompraGroup("SHOPPINGS DE RÍO","Yo te ayudo a elegir dónde comprar según tu viaje, tu zona y el tiempo que tengas.","Yo los recomiendo cuando quieres resolver compras, comer con comodidad o aprovechar un día de lluvia.",COMPRAS_FICHAS.cards["Shoppings"],"bg-slate-950"),CompraGroup("FERIAS, ARTESANÍA Y CULTURA CARIOCA","Lugares donde Río se encuentra, vende, conversa y muestra su lado más creativo.","Para mí, una feria no se visita solamente para comprar: también se visita para mirar, conversar y entender el barrio.",COMPRAS_FICHAS.cards["Ferias"],"bg-teal-800"),CompraGroup("MERCADOS POPULARES Y COMERCIO REAL","Para conocer el Río cotidiano, sus productos, sus calles y la vida comercial de sus barrios.","Si quieres conocer un Río más cotidiano, yo empezaría por estos mercados y dejaría que la ciudad te muestre su ritmo.",COMPRAS_FICHAS.cards["Mercados populares"],"bg-slate-900")];return React.createElement("section",{className:"py-12 bg-slate-50 min-h-screen"},React.createElement("div",{className:"max-w-7xl mx-auto px-4 sm:px-6"},[intro].concat(groups)))}
const { useState, useEffect } = React;
const __EC_CULTURE_SECTIONS = new Set(['museos','familia','teatros','iglesias','master4_museos_real','master4_teatros_real','master4_iglesias_real']);
let __ecCultureDataPromise = null;
function __ecEnsureCultureData(){
    if (window.MUSEOS_DATA && window.TEATROS_DATA && window.IGLESIAS_DATA && window.FAMILIA_DATA && window.MASTER4_MUSEOS_REAL) return Promise.resolve();
    if (__ecCultureDataPromise) return __ecCultureDataPromise;
    __ecCultureDataPromise = new Promise((resolve,reject)=>{
        const sc=document.createElement('script');
        sc.src='/assets/section-culture-data.js?v=20260922-fase9'; sc.async=true;
        sc.onload=()=>resolve(); sc.onerror=()=>{__ecCultureDataPromise=null;reject(new Error('No se pudo cargar section-culture-data.js'));};
        document.head.appendChild(sc);
    });
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

const FOTOS_GASTRONOMIA = [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?auto=format&fit=crop&q=80&w=1000'
];
const GASTRONOMIA_DATA = [...GASTRONOMIA_BASE, ...GASTRONOMIA_EXTRA].map((item, index) => ({
    ...item,
    img: item.img || FOTOS_GASTRONOMIA[index % FOTOS_GASTRONOMIA.length],
    mapa: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.nombre + ' ' + item.barrio + ' Rio de Janeiro')}`,
    horario: 'Los horarios pueden cambiar. Confirma el día de tu visita en el mapa oficial.'
}));
const DIAS_NOCHE = ['Todos', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const TIPOS_NOCHE = ['Todos', 'Samba', 'Pagode', 'Música en vivo', 'Discoteca', 'Rooftop', 'Boteco', 'LGBTQIA+', 'Conciertos', 'Cultura'];
const n = (id, nombre, zona, barrio, tipo, dias, precio, destaque, recomendado = false) => ({ id, nombre, zona, barrio, tipo, dias, precio, destaque, recomendado });
const VIDA_NOCTURNA_DATA = [
    n('pedra-sal', 'Pedra do Sal', 'Centro y Zona Portuaria', 'Saúde', 'Samba', ['Lunes', 'Viernes'], '$', 'Roda de samba al aire libre en uno de los lugares fundamentales de la Pequeña África.', true),
    n('scenarium-noite', 'Rio Scenarium', 'Centro y Lapa', 'Lapa', 'Samba', ['Miércoles', 'Jueves', 'Viernes', 'Sábado'], '$$$', 'Música brasileña, restaurante y varios ambientes decorados con antigüedades.', true),
    n('carioca-gema', 'Carioca da Gema', 'Centro y Lapa', 'Lapa', 'Samba', ['Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'], '$$', 'Casa tradicional para escuchar samba y MPB en vivo.'),
    n('beco-rato', 'Beco do Rato', 'Centro y Lapa', 'Lapa', 'Samba', ['Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'], '$$', 'Rodas de samba, petiscos y ambiente bohemio.'),
    n('trapiche', 'Trapiche Gamboa', 'Centro y Zona Portuaria', 'Gamboa', 'Samba', ['Viernes', 'Sábado'], '$$', 'Samba de raíz dentro de un casarón histórico.'),
    n('bafo-noite', 'Bafo da Prainha', 'Centro y Zona Portuaria', 'Saúde', 'Samba', ['Viernes', 'Sábado', 'Domingo'], '$$', 'Samba, gastronomía y encuentros culturales en la Praça da Harmonia.'),
    n('sacadura', 'Sacadura 154', 'Centro y Zona Portuaria', 'Saúde', 'Música en vivo', ['Viernes', 'Sábado'], '$$', 'Programación musical y fiestas en un gran espacio de la zona portuaria.'),
    n('leviano', 'Leviano Bar', 'Centro y Lapa', 'Lapa', 'Música en vivo', ['Miércoles', 'Jueves', 'Viernes', 'Sábado'], '$$', 'Bandas, baile y coctelería en un sobrado frente a los Arcos.'),
    n('lapa40', 'Lapa 40 Graus', 'Centro y Lapa', 'Lapa', 'Discoteca', ['Jueves', 'Viernes', 'Sábado'], '$$', 'Música brasileña, pista de baile y varios pisos.'),
    n('circo', 'Circo Voador', 'Centro y Lapa', 'Lapa', 'Conciertos', ['Viernes', 'Sábado'], '$$', 'Uno de los escenarios más emblemáticos para conciertos en Río.', true),
    n('fundicao', 'Fundição Progresso', 'Centro y Lapa', 'Lapa', 'Conciertos', ['Jueves', 'Viernes', 'Sábado'], '$$', 'Grandes shows, fiestas y eventos culturales junto a los Arcos da Lapa.'),
    n('selina-lapa', 'Rooftop Lapa', 'Centro y Lapa', 'Lapa', 'Rooftop', ['Jueves', 'Viernes', 'Sábado'], '$$', 'Terraza, música y vista de los Arcos; confirmar la programación vigente.'),
    n('bar-cachaca', 'Bar da Cachaça', 'Centro y Lapa', 'Lapa', 'Boteco', ['Todos'], '$', 'Punto informal para probar cachaças y vivir la calle de Lapa.'),
    n('vaca-atolada', 'Vaca Atolada', 'Centro y Lapa', 'Lapa', 'Samba', ['Viernes', 'Sábado'], '$', 'Samba informal, cerveza y cocina de boteco.'),
    n('armazem-senado', 'Armazém Senado', 'Centro y Lapa', 'Centro', 'Samba', ['Sábado'], '$', 'Roda de samba diurna que se extiende hacia la noche según la agenda.'),
    n('bar-omar-noite', 'Bar do Omar', 'Centro y Zona Portuaria', 'Santo Cristo', 'Cultura', ['Jueves', 'Viernes', 'Sábado', 'Domingo'], '$$', 'Eventos, samba, gastronomía y vista de la región portuaria.'),
    n('quartinho-noite', 'Quartinho', 'Botafogo', 'Botafogo', 'Boteco', ['Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'], '$$', 'Bar creativo y concurrido para comenzar o terminar la noche.'),
    n('xepa', 'Xepa', 'Botafogo', 'Botafogo', 'Boteco', ['Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'], '$$', 'Mesas en la calle, comida, tragos y clima joven.'),
    n('bukowski', 'Bar Bukowski', 'Botafogo', 'Botafogo', 'Discoteca', ['Viernes', 'Sábado'], '$$', 'Rock en una antigua casona con pistas y espacios al aire libre.'),
    n('coordenadas', 'Coordenadas Bar', 'Botafogo', 'Botafogo', 'Música en vivo', ['Miércoles', 'Jueves', 'Viernes', 'Sábado'], '$$', 'Bandas, pista y programación musical variada.'),
    n('macuna', 'Macuna', 'Botafogo', 'Botafogo', 'Discoteca', ['Jueves', 'Viernes', 'Sábado'], '$$', 'Fiestas y música electrónica en una casa de Botafogo.'),
    n('comuna', 'Comuna', 'Botafogo', 'Botafogo', 'Cultura', ['Miércoles', 'Jueves', 'Viernes', 'Sábado'], '$$', 'Encuentros culturales, DJs y gastronomía alternativa; revisar agenda.'),
    n('brewteco', 'Brewteco Botafogo', 'Botafogo', 'Botafogo', 'Boteco', ['Todos'], '$$', 'Cervezas artesanales y ambiente informal.'),
    n('yoo2', 'Yoo2 Rooftop', 'Botafogo', 'Botafogo', 'Rooftop', ['Todos'], '$$$', 'Cócteles con vista panorámica del Pan de Azúcar.', true),
    n('fogo-chao-bar', 'Bar de Fogo de Chão', 'Botafogo', 'Botafogo', 'Rooftop', ['Todos'], '$$$', 'Happy hour y bebidas frente a la enseada.'),
    n('bip-bip', 'Bip Bip', 'Copacabana y Leme', 'Copacabana', 'Samba', ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Domingo'], '$', 'Pequeño templo de la música carioca donde el público escucha con respeto.', true),
    n('blue-note', 'Blue Note Rio', 'Copacabana y Leme', 'Copacabana', 'Música en vivo', ['Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'], '$$$', 'Jazz, MPB y grandes artistas; programación mediante entradas.'),
    n('isabel-lounge', 'Isabel Lounge', 'Copacabana y Leme', 'Copacabana', 'Rooftop', ['Todos'], '$$$', 'Terraza del Hilton con vista de Leme y Copacabana.'),
    n('moonlounge', 'Moonlounge Rooftop', 'Copacabana y Leme', 'Copacabana', 'Rooftop', ['Todos'], '$$$', 'Bar de hotel con piscina y vista de la orla.'),
    n('beco-garrafas', 'Beco das Garrafas', 'Copacabana y Leme', 'Copacabana', 'Música en vivo', ['Miércoles', 'Jueves', 'Viernes', 'Sábado'], '$$', 'Dirección histórica vinculada a la bossa nova; consultar shows.'),
    n('galeria-cafe', 'Galeria Café', 'Ipanema y Leblon', 'Ipanema', 'LGBTQIA+', ['Jueves', 'Viernes', 'Sábado'], '$$', 'Bar, galería y fiestas LGBTQIA+ con diferentes temáticas.'),
    n('pink-flamingo', 'Pink Flamingo', 'Copacabana y Leme', 'Copacabana', 'LGBTQIA+', ['Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], '$$', 'Discoteca LGBTQIA+ con shows y música pop.'),
    n('canastra', 'Canastra Bar', 'Ipanema y Leblon', 'Ipanema', 'Boteco', ['Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'], '$$', 'Vinos, comida y movimiento en la Praça General Osório.'),
    n('nosso', 'Nosso', 'Ipanema y Leblon', 'Ipanema', 'Boteco', ['Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'], '$$$', 'Gastronomía y coctelería en varios pisos.'),
    n('astor-noite', 'Bar Astor', 'Ipanema y Leblon', 'Ipanema', 'Boteco', ['Todos'], '$$$', 'Happy hour y cócteles mirando el mar de Arpoador.'),
    n('boa-praca-noite', 'Boa Praça', 'Ipanema y Leblon', 'Ipanema', 'Música en vivo', ['Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], '$$$', 'Bar abierto y concurrido con música y mesas en la plaza.'),
    n('jobi-noite', 'Jobi', 'Ipanema y Leblon', 'Leblon', 'Boteco', ['Todos'], '$$', 'Clásico punto de la bohemia leblonense hasta tarde.'),
    n('renascenca', 'Renascença Clube', 'Zona Norte', 'Andaraí', 'Samba', ['Lunes', 'Domingo'], '$', 'Casa histórica de cultura negra y samba; consultar las rodas programadas.', true),
    n('feira-noite', 'Feira de São Cristóvão', 'Zona Norte', 'São Cristóvão', 'Cultura', ['Viernes', 'Sábado', 'Domingo'], '$', 'Forró, comida nordestina y espectáculos durante el fin de semana.', true),
    n('cacique', 'Cacique de Ramos', 'Zona Norte', 'Olaria', 'Samba', ['Domingo'], '$', 'Territorio histórico del samba y el pagode; verificar eventos.'),
    n('quadra-mangueira', 'Quadra da Mangueira', 'Zona Norte', 'Mangueira', 'Samba', ['Viernes', 'Sábado'], '$$', 'Ensayos y eventos de una de las escuelas más emblemáticas.'),
    n('quadra-salgueiro', 'Quadra do Salgueiro', 'Zona Norte', 'Andaraí', 'Samba', ['Sábado'], '$$', 'Ensayos, feijoadas y noches de samba según el calendario.'),
    n('portela', 'Portelão', 'Zona Norte', 'Madureira', 'Samba', ['Viernes', 'Sábado'], '$$', 'Eventos y ensayos de Portela en Madureira.'),
    n('vitrinni', 'Vitrinni Lounge', 'Barra y Recreio', 'Barra da Tijuca', 'Discoteca', ['Jueves', 'Viernes', 'Sábado'], '$$$', 'Lounge y discoteca con programación de DJs y fiestas.'),
    n('all-in', 'All In', 'Barra y Recreio', 'Barra da Tijuca', 'Música en vivo', ['Miércoles', 'Jueves', 'Viernes', 'Sábado'], '$$', 'Bar, bandas y noches temáticas en Jardim Oceânico.'),
    n('bosque-bar', 'Bosque Bar', 'Barra y Recreio', 'Barra da Tijuca', 'Discoteca', ['Jueves', 'Viernes', 'Sábado'], '$$$', 'Fiestas al aire libre y DJs en el complejo del Jockey; confirmar local y agenda.'),
    n('zeca-vogue', 'Bar do Zeca Pagodinho', 'Barra y Recreio', 'Barra da Tijuca', 'Pagode', ['Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], '$$$', 'Pagode, samba y cocina brasileña en Vogue Square.'),
    n('vogue-square', 'Vogue Square', 'Barra y Recreio', 'Barra da Tijuca', 'Música en vivo', ['Jueves', 'Viernes', 'Sábado'], '$$$', 'Complejo con bares, restaurantes y programación musical.'),
    n('ocya-sunset', 'Ocyá Ilha Primeira', 'Barra y Recreio', 'Ilha Primeira', 'Música en vivo', ['Viernes', 'Sábado', 'Domingo'], '$$$', 'Atardecer, cocina marina y eventos especiales a los que se llega en barco.')
];
// FOTOS_VIDA_NOCTURNA externalizado a JSON

const FOTOS_NOCHE_APOYO = ['https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=1000'];
const VIDA_NOCTURNA_CON_FOTOS = VIDA_NOCTURNA_DATA.map((item, index) => ({ ...item,
    img: FOTOS_VIDA_NOCTURNA[item.id] || FOTOS_NOCHE_APOYO[index % FOTOS_NOCHE_APOYO.length],
    mapa: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.nombre + ' ' + item.barrio + ' Rio de Janeiro')}`
}));
// PLAYAS_DETALLADAS_DATA externalizado a JSON

const BARRIOS_DATA = [
    { id: 'copacabana', nombre: 'Copacabana', zona: 'Zona Sul', lema: 'Mucho más que una playa.', desc: 'La postal más famosa de Río también es un barrio residencial lleno de historia, Art Déco, música, comercio y vida cotidiana.', para: ['Primera vez', 'Playa', 'Historia', 'Vida local'], combina: ['Leme', 'Ipanema', 'Urca'], img: 'https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3122' },
    { id: 'ipanema-leblon', nombre: 'Ipanema & Leblon', zona: 'Zona Sul', lema: 'Playa, diseño, gastronomía y puesta de sol.', desc: 'Dos barrios vecinos para combinar playa, moda, cafés, restaurantes, miradores urbanos y caminatas con ritmo más pausado.', para: ['Parejas', 'Gastronomía', 'Compras', 'Atardecer'], combina: ['Copacabana', 'Lagoa', 'Jardim Botânico'], img: 'https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3123' },
    { id: 'gavea-jardim-lagoa', nombre: 'Gávea · Jardim Botânico · Lagoa', zona: 'Zona Sul', lema: 'Río verde entre montaña y laguna.', desc: 'Naturaleza, jardines, cultura, gastronomía y paseos tranquilos alrededor de algunos de los paisajes más verdes de la ciudad.', para: ['Naturaleza', 'Familias', 'Calma', 'Deporte'], combina: ['Ipanema & Leblon', 'São Conrado'], img: 'https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3126' },
    { id: 'botafogo-urca', nombre: 'Botafogo · Humaitá · Urca', zona: 'Zona Sul', lema: 'Bahía, bares y Pan de Azúcar.', desc: 'Una zona excelente para mezclar vistas, gastronomía, vida nocturna más local, museos y uno de los grandes símbolos de Río.', para: ['Comer', 'Noche', 'Fotografía', 'Primera vez'], combina: ['Copacabana', 'Flamengo'], img: 'https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3127' },
    { id: 'flamengo-gloria', nombre: 'Flamengo · Catete · Glória', zona: 'Zona Sul / Centro', lema: 'Parques, República y conexión con el Centro.', desc: 'Aterro, museos, arquitectura, mercados y una transición perfecta entre la Zona Sul y el corazón histórico.', para: ['Historia', 'Parques', 'Presupuesto', 'Cultura'], combina: ['Centro', 'Lapa', 'Botafogo'], img: 'https://res.cloudinary.com/qa301cbc/image/upload/v1788389092/aterro_flamengo.jpg' },
    { id: 'centro-maua', nombre: 'Centro · Praça Mauá', zona: 'Centro', lema: 'Donde Río cuenta su historia.', desc: 'Iglesias, museos, arquitectura, cafés históricos, plazas, Boulevard Olímpico y capas de ciudad que van del período colonial al Río contemporáneo.', para: ['Historia', 'Museos', 'Arquitectura', 'Fotografía'], combina: ['Lapa', 'Santa Teresa', 'Saúde'], img: 'https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3125' },
    { id: 'santa-lapa', nombre: 'Santa Teresa · Lapa', zona: 'Centro', lema: 'Bohemia, arte, samba y calles con memoria.', desc: 'Tranvía, ateliers, escaleras, casarones, arcos y noches de música para quien quiere una experiencia urbana más cultural y bohemia.', para: ['Samba', 'Arte', 'Noche', 'Fotografía'], combina: ['Centro', 'Glória'], img: 'https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3124' },
    { id: 'zona-norte', nombre: 'Zona Norte', zona: 'Zona Norte', lema: 'Fútbol, samba y Río más allá de la postal.', desc: 'Maracanã, Quinta da Boa Vista, Feira de São Cristóvão, escuelas de samba y barrios fundamentales para comprender la ciudad.', para: ['Fútbol', 'Samba', 'Cultura', 'Repetidores'], combina: ['Centro', 'Tijuca'], img: 'https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3083' },
    { id: 'barra-oeste', nombre: 'Barra · Recreio · Zona Oeste', zona: 'Zona Oeste', lema: 'Playas abiertas, naturaleza y grandes distancias.', desc: 'Una Río más extensa donde playa, centros comerciales, reservas naturales y experiencias requieren planificar mejor los desplazamientos.', para: ['Playa', 'Naturaleza', 'Familias', 'Compras'], combina: ['Prainha', 'Grumari', 'Recreio'], img: 'https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3097' }
];
const EXPERIENCIAS_DATA = [
    {
        id: 'exp-1',
        portadaExperiencias: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789832246/PORTADA_FULL_DAY_RIO.png',
        portadaCarousel: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789827975/PORTADA_DE_TAMA%C3%91O_PARA_FULL_DAY_RIO_CELULAR.png',
        titulo: 'Full Day Río',
        precio: 'R$430',
        duracion: 'Aproximadamente 8 horas',
        grupo: 'Salidas todos los días',
        encuentro: 'Hoteles de Zona Sul y Centro',
        imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3055',
        descripcion: 'Tour completo en van al Cristo Redentor, atravesando la maravillosa Floresta da Tijuca y disfrutando también de las increíbles vistas desde la cima del Pan de Azúcar. El paseo incluye Cristo Redentor, Pan de Azúcar, Maracanã, Sambódromo, Catedral Metropolitana y Escalera Selarón.'
    },
    {
        id: 'exp-2',
        portadaCarousel: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789827940/PORTADA_BUZIOS_CARROUSEL.png',
        titulo: 'Búzios — Tour en Goleta',
        precio: 'R$230 + taxa marinha',
        duracion: 'Aproximadamente 13 horas',
        grupo: 'Salidas todos los días',
        encuentro: 'Consultar',
        imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3076',
        descripcion: 'Descubre Búzios, la perla de la Región de Lagos, con un recorrido en goleta y paradas para disfrutar de João Fernandes, Praia das Moças (Ilha Feia) y Praia da Tartaruga.'
    },
    {
        id: 'exp-3',
        portadaExperiencias: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789832214/EXPERIENCIA_PORTADA_cristo_city_tour.png',
        portadaCarousel: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789827924/PORTADA_CRISTO_CITY_TOUR_CARROUSELL.png',
        titulo: 'Cristo + City Tour',
        precio: 'R$230 / R$250 con almuerzo',
        duracion: 'Aproximadamente 5 a 6 horas',
        grupo: 'Salidas diarias',
        encuentro: 'Consultar',
        imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3083',
        descripcion: 'Visita el Cristo Redentor y recorre algunos de los principales puntos turísticos de Río de Janeiro, incluyendo Maracanã, Sambódromo, Escalera Selarón y Catedral São Sebastião.'
    },
    {
        id: 'exp-4',
        portadaCarousel: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789828386/PORTADA_TOUR_ARRAIAL_DO_CABO_CARROUSELL.png',
        titulo: 'Arraial do Cabo',
        precio: 'R$200 + taxa da Marinha',
        duracion: 'Aproximadamente 14 horas',
        grupo: 'Salidas diarias',
        encuentro: 'Hoteles de Zona Sul y Centro',
        imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789041862/arraial_praia-do-pontal.jpg',
        descripcion: 'Descubre el Caribe Brasileño con un paseo en barco por Arraial do Cabo, incluyendo Praia do Forno, Praia do Farol y Prainhas do Pontal do Atalaia, además de transporte y almuerzo.'
    },
    {
        id: 'exp-5',
        portadaCarousel: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789827924/PORTADA_ANGRA_DOS_REIS_CARROUSELL.png',
        titulo: 'Angra dos Reis',
        precio: 'Desde R$200 + taxa da Marinha',
        duracion: 'Aproximadamente 12 horas',
        grupo: 'Salidas diarias',
        encuentro: 'Hoteles de Zona Sul y Centro',
        imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1789041863/angra_4e50u.jpg',
        descripcion: 'Descubre Angra dos Reis navegando entre islas, playas y aguas cristalinas. El recorrido incluye Playa Cataguases, Blue Lagoon, Japariz Beach y una última parada en Santana o Araça.'
    }
];
// ACTIVIDADES_NUEVAS externalizado a JSON

// TRANSCARIOCA_TRECHOS externalizado a JSON

// Orden editorial temporal: pensado para un turista que descubre Rio. No pretende ser un ranking estadistico.
const RUTAS_RIO_ORDEN = ['01', '25', '19', '21', '15', '18', '13', '12', '11', '17', '20', '24', '23', '16', '02', '06', '05', '07', '08', '03', '04', '09', '14', '26'];

// SENDEROS_RIO externalizado a JSON

// ===== NATURALEZA URBANA · PARQUES Y JARDINES DESTACADOS =====
// PARQUES_NATURALEZA_DESTACADOS externalizado a JSON

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
function ActividadNuevaDetalle(props){return React.createElement(ECLazyRoute,{src:'/assets/chunks/ActividadNuevaDetalle.js?v=20260922',name:'ActividadNuevaDetalle',componentProps:props})}
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
        const cardNueva = (typeof GASTRONOMIA_NUEVAS_CARDS !== 'undefined' ? GASTRONOMIA_NUEVAS_CARDS : []).find(x => seoSlug(x.title) === m[1] || seoSlug(x.id) === m[1]);
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
        const card = (typeof GASTRONOMIA_NUEVAS_CARDS !== 'undefined' ? GASTRONOMIA_NUEVAS_CARDS : []).find(x => seoSlug(x.title) === m[1] || seoSlug(x.id) === m[1]);
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
const GASTRONOMIA_INDICE_BUSQUEDA = new Map((window.GASTRONOMIA_NUEVAS_CARDS||[]).map(card => [card.id, normalizarGastroNueva(`${card.title} ${(card.tags || []).join(' ')} ${textoVisibleGastroNueva((window.GASTRONOMIA_NUEVAS_HTML||{})[card.id])}`)]));

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
            seccionActual === 'guia_anterior' && (React.createElement("section", { className: "py-12 bg-slate-50" },
                React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
                    React.createElement("div", { className: "text-center max-w-3xl mx-auto mb-12" },
                        React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4" }, T("Guía de Río")),
                        React.createElement("p", { className: "text-lg text-slate-600 font-medium" }, "\u201CTodo lo que necesitas saber antes y durante tu viaje a R\u00EDo de Janeiro.\u201D")),
                    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" }, [
                        { titulo: 'Primer viaje a Río', desc: 'Lo indispensable si es tu primera vez en la ciudad.', icon: '✈️', art: ARTICULOS_CONSEJOS[0] },
                        { titulo: 'Electricidad y adaptadores', desc: 'Voltaje (110V/220V), enchufes tipo N y adaptadores.', icon: '🔌', art: ARTICULOS_CONSEJOS[1] },
                        { titulo: 'Preparando las maletas', desc: 'Clima tropical, pronósticos, ropa recomendada y días de lluvia.', icon: '🧳', art: ARTICULOS_CONSEJOS[2] },
                        { titulo: 'Vacunas', desc: 'Información sobre fiebre amarilla, requisitos de salud y prevención.', icon: '💉', art: ARTICULOS_CONSEJOS[3] },
                        { titulo: 'Visado y aduana', desc: 'Exención de visas (90 días), pasaporte y regulaciones de aduana.', icon: '📄', art: ARTICULOS_CONSEJOS[4] },
                        { titulo: 'Dónde hospedarse', desc: 'Comparativa de barrios: Copacabana vs Ipanema vs Barra.', icon: '🏨', sec: 'hospedaje' },
                        { titulo: 'Qué hacer en Río', desc: 'Lista maestra de lugares imperdibles.', icon: '🏛️', sec: 'que_hacer' },
                        { titulo: 'Playas Cariocas', desc: 'Guía detallada con todas las playas, mapas y videos.', icon: '🏖️', sec: 'playas' },
                        { titulo: 'Gastronomía Local', desc: 'Feijoada, churrasco, açaí y comida de quiosco.', icon: '🍖', sec: 'que_hacer' },
                        { titulo: 'Vida Nocturna', desc: 'Dónde escuchar samba real y bailar en Lapa.', icon: '🌙', sec: 'que_hacer' },
                        { titulo: 'Compras & Souvenirs', desc: 'Los mejores shoppings, ferias artesanales y tiendas de moda.', icon: '🛍️', sec: 'compras' },
                        { titulo: 'Excursiones Cercanas', desc: 'Búzios, Arraial do Cabo, Angra e Ilha Grande.', icon: '🚐', sec: 'experiencias' },
                    ].map((tarjeta, index) => (React.createElement("div", { key: index, onClick: () => {
                            if (tarjeta.sec)
                                setSeccionActual(tarjeta.sec);
                            else if (tarjeta.art)
                                verArticulo(tarjeta.art);
                            else
                                setSeccionActual('consejos');
                        }, className: "bg-white rounded-2xl p-6   transition-all border border-slate-100 cursor-pointer group flex flex-col justify-between" },
                        React.createElement("div", null,
                            React.createElement("span", { className: "text-4xl mb-4 block" }, tarjeta.icon),
                            React.createElement("h3", { className: "font-extrabold text-slate-900 text-lg mb-2 group-hover:text-teal-600 transition-colors" }, tarjeta.titulo),
                            React.createElement("p", { className: "text-slate-500 text-xs leading-relaxed" }, tarjeta.desc)),
                        React.createElement("div", { className: "mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-teal-600" },
                            React.createElement("span", null, "VER ART\u00CDCULO"),
                            React.createElement(Icon, { name: "chevron-right", className: "w-4 h-4 group-hover:translate-x-1 transition-transform" }))))))))),
            seccionActual === 'experiencias' && (React.createElement("section", { className: "py-12 bg-white" },
                React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
                    React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-12" },
                        React.createElement("span", { className: "text-amber-500 font-bold text-xs uppercase tracking-widest block mb-2" }, T("✨ EXPERIENCIAS ERNESTINHO")),
                        React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5" }, "Cuando quieras pasar de descubrir R\u00EDo a vivirlo."),
                        React.createElement("p", { className: "text-slate-600 text-base leading-relaxed" }, "Vive R\u00EDo de la mano de un equipo apasionado por mostrarte lo mejor de la Ciudad Maravillosa. Junto a mi equipo de gu\u00EDas y operadores locales, te ayudamos a transformar el viaje en experiencias que realmente vas a recordar."),
                        React.createElement("p", { className: "text-slate-500 text-sm mt-3" }, "Aqu\u00ED s\u00ED quiero que las fotograf\u00EDas hablen. Las miniaturas que ya trabajamos siguen siendo protagonistas.")),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8" }, EXPERIENCIAS_DATA.map((exp) => (React.createElement("div", { key: exp.id, className: "bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 flex flex-col sm:flex-row   transition-all" },
                        React.createElement("div", { className: "sm:w-2/5 aspect-[16/10] sm:aspect-auto sm:min-h-[260px] relative" },
                            React.createElement("img", { src: exp.portadaExperiencias || exp.imagen, alt: exp.titulo, className: "w-full h-full object-cover" })),
                        React.createElement("div", { className: "sm:w-3/5 p-4 sm:p-6 flex flex-col justify-between" },
                            React.createElement("div", null,
                                React.createElement("div", { className: "flex justify-between items-center mb-2" },
                                    React.createElement("span", { className: "text-xs font-bold text-teal-600 uppercase" }, "\u2605 Tour Guiado"),
                                    React.createElement("span", { className: "text-xs font-black bg-amber-400 px-2.5 py-1 rounded-md text-slate-950" }, exp.precio)),
                                React.createElement("h3", { className: "text-xl font-bold text-slate-900 mb-2" }, exp.titulo),
                                React.createElement("p", { className: "hidden sm:block text-slate-600 text-xs leading-relaxed mb-4" }, exp.descripcion),
                                React.createElement("div", { className: "hidden sm:block text-[11px] text-slate-500 space-y-1 mb-6" },
                                    React.createElement("p", null,
                                        "\u23F1\uFE0F Duraci\u00F3n: ",
                                        exp.duracion),
                                    React.createElement("p", null,
                                        "\uD83D\uDC65 Grupo: ",
                                        exp.grupo),
                                    React.createElement("p", null,
                                        "\uD83D\uDCCD Punto: ",
                                        exp.encuentro))),
                            React.createElement("div", { className: "flex flex-col sm:flex-row gap-2 mt-4" },
                                React.createElement("button", { onClick: () => {
                                        if (exp.id === 'exp-1') {
                                            setSeccionActual('full_day_rio');
                                        }
                                        else if (exp.id === 'exp-2') {
                                            setSeccionActual('buzios');
                                        }
                                        else {
                                            setSeccionActual(`detalle_${exp.id}`);
                                        }
                                    }, className: "w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase py-3 rounded-xl transition-colors " }, "\uD83D\uDC41\uFE0F Ver Experiencia"),
                                React.createElement("button", { onClick: () => abrirReserva(exp), className: "w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase py-3 rounded-xl transition-colors " }, "\uD83D\uDCC5 Reservar Ahora"))))))),
                    React.createElement("div", { className: "mt-16 mb-8" },
                        React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, "Nuevas actividades"),
                        React.createElement("h2", { className: "text-3xl sm:text-4xl font-black text-slate-900 uppercase mt-2" }, "M\u00E1s formas de vivir R\u00EDo")),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7" }, ACTIVIDADES_NUEVAS.map((actividad) => React.createElement("article", { key: actividad.id, className: "bg-slate-50 rounded-3xl overflow-hidden border border-slate-100  flex flex-col" },
                        React.createElement("div", { className: "h-56" },
                            React.createElement("img", { src: actividad.portadaExperiencias || actividad.miniatura, alt: actividad.titulo, className: "w-full h-full object-cover" })),
                        React.createElement("div", { className: "p-6 flex flex-col flex-1" },
                            React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase" }, actividad.categoria),
                            React.createElement("h3", { className: "text-2xl font-black mt-2" }, actividad.titulo),
                            React.createElement("p", { className: "text-sm text-slate-600 mt-3 flex-1" }, actividad.intro),
                            React.createElement("div", { className: "flex items-center justify-between mt-6" },
                                React.createElement("span", { className: "bg-amber-400 rounded-full px-3 py-1 text-xs font-black" }, actividad.precio),
                                React.createElement("a", { href: `/experiencias/${seoSlug(actividad.titulo)}`, onClick: (ev) => { if (!(ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey)) { ev.preventDefault(); seoNavigate(`/experiencias/${seoSlug(actividad.titulo)}`); setSeccionActual(`actividad_${actividad.id}`); } }, className: "bg-slate-900 text-white rounded-full px-5 py-3 text-xs font-black uppercase" }, "Ver actividad"))))))))),
            seccionActual.startsWith('actividad_') && React.createElement(ActividadNuevaDetalle, { actividad: ACTIVIDADES_NUEVAS.find(a => `actividad_${a.id}` === seccionActual), onVolver: volverUnaVista, lang: lang }),
            seccionActual === 'full_day_rio' && (React.createElement("section", { className: "py-12 sm:py-16 bg-slate-50" },
                React.createElement("div", { className: "max-w-6xl mx-auto px-4 sm:px-6" },
                    React.createElement("button", { onClick: volverUnaVista, className: "inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-xs uppercase mb-8 transition-colors" }, T("\u2190 Volver a Experiencias")),
                    React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-10" },
                        React.createElement("span", { className: "inline-flex items-center bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4 " }, T("\u2605 Experiencia Destacada")),
                        React.createElement("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 uppercase tracking-tight mb-5" },
                            "Full Day ",
                            React.createElement("span", { className: "text-amber-500" }, "R\u00EDo")),
                        React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto" }, T("Un d\u00EDa completo para descubrir los grandes s\u00EDmbolos de R\u00EDo de Janeiro en una experiencia c\u00F3moda, organizada y llena de paisajes inolvidables."))),
                    React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden  border border-slate-100 mb-10" },
                        React.createElement("div", { className: "relative w-full aspect-video bg-slate-900" },
                            React.createElement("iframe", { className: "absolute inset-0 w-full h-full", src: "https://www.youtube.com/embed/_1_EN1Ww7Dk", title: T("Full Day R\u00EDo de Janeiro"), frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", allowFullScreen: true }))),
                    React.createElement("div", { className: "bg-white rounded-3xl  border border-slate-100 p-6 sm:p-10 mb-10" },
                        React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8" },
                            React.createElement("div", { className: "max-w-3xl" },
                                React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("Tour completo en van")),
                                React.createElement("h2", { className: "text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-4" }, T("Cristo Redentor + Pan de Az\u00FAcar y mucho m\u00E1s")),
                                React.createElement("p", { className: "text-slate-600 leading-relaxed" }, T("Tour completo en van al Cristo Redentor, atravesando la maravillosa Floresta da Tijuca y disfrutando tambi\u00E9n de las incre\u00EDbles vistas desde la cima del Pan de Az\u00FAcar.")),
                                React.createElement("p", { className: "text-slate-600 leading-relaxed mt-4" }, T("Durante el recorrido conoceremos algunos de los principales puntos tur\u00EDsticos de la Cidade Maravilhosa, combinando naturaleza, historia, cultura, f\u00FAtbol y los paisajes m\u00E1s famosos de R\u00EDo."))),
                            React.createElement("div", { className: "shrink-0 bg-amber-400 text-slate-950 rounded-2xl px-6 py-5 text-center " },
                                React.createElement("span", { className: "block text-[10px] font-black uppercase tracking-widest" }, T("Desde")),
                                React.createElement("span", { className: "text-4xl font-black block" }, T("R$430")),
                                React.createElement("span", { className: "block text-xs font-bold" }, T("por persona")),
                                React.createElement("span", { className: "block text-[10px] font-semibold mt-1" }, T("d\u00EDas de semana")))),
                        React.createElement("div", { className: "space-y-10" },
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3054", alt: T("Floresta da Tijuca"), className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", null,
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("01 \u00B7 Naturaleza")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83C\uDF3F Floresta da Tijuca")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Entre los puntos tur\u00EDsticos del parque, adem\u00E1s de sendas, grutas y cascadas, se encuentran lugares famosos de la ciudad, como la Pedra da G\u00E1vea, el cerro del Corcovado y el Pico da Tijuca, cima del parque a 1.022 metros sobre el nivel del mar.")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed mt-3" }, T("Nosotros atravesaremos la floresta durante el trayecto hacia el Cristo Redentor.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "md:order-2 rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3055", alt: T("Cristo Redentor"), className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", { className: "md:order-1" },
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("02 \u00B7 Icono de R\u00EDo")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\u2728 Cristo Redentor")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("La estatua del Cristo Redentor es uno de los principales s\u00EDmbolos de R\u00EDo de Janeiro y una de las nuevas siete maravillas del mundo moderno.")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed mt-3" }, T("Desde la cima del Corcovado podr\u00E1s disfrutar de una de las vistas panor\u00E1micas m\u00E1s impresionantes de la ciudad.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://cdn.getyourguide.com/img/tour/5d542890aa38c.jpeg/146.jpg", alt: T("Pan de Az\u00FAcar y Morro da Urca"), className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", null,
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("03 \u00B7 Vista panor\u00E1mica")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83D\uDEA0 Pan de Az\u00FAcar y Morro da Urca")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Ubicado en el tradicional barrio de Urca, el Pan de Az\u00FAcar es, junto al Cristo Redentor, uno de los grandes s\u00EDmbolos de R\u00EDo de Janeiro.")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed mt-3" }, T("Desde lo alto podr\u00E1s disfrutar de una de las vistas m\u00E1s espectaculares de la ciudad, la bah\u00EDa y sus monta\u00F1as.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "md:order-2 rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/b3160818bn6f6c2744a6c9e062e84fff", alt: "Maracan\u00E3", className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", { className: "md:order-1" },
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("04 \u00B7 F\u00FAtbol brasile\u00F1o")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\u26BD Maracan\u00E3")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Realizaremos una parada externa para fotograf\u00EDas frente al m\u00EDtico Est\u00E1dio Jornalista M\u00E1rio Filho, conocido mundialmente como Maracan\u00E3.")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed mt-3" }, T("Uno de los estadios m\u00E1s famosos de la historia del f\u00FAtbol y escenario de grandes acontecimientos deportivos.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3087", alt: T("Samb\u00F3dromo de R\u00EDo de Janeiro"), className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", null,
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("05 \u00B7 Carnaval")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83C\uDFAD Samb\u00F3dromo")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("El Samb\u00F3dromo da Marqu\u00EAs de Sapuca\u00ED fue dise\u00F1ado por el arquitecto Oscar Niemeyer e inaugurado en 1984.")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed mt-3" }, T("Es uno de los espacios m\u00E1s importantes del Carnaval Carioca y el lugar donde las escuelas de samba realizan sus grandes desfiles.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "md:order-2 rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3056", alt: T("Catedral Metropolitana de R\u00EDo"), className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", { className: "md:order-1" },
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("06 \u00B7 Historia y arquitectura")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\u26EA Catedral Metropolitana")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Oficialmente llamada Catedral de S\u00E3o Sebasti\u00E3o do Rio de Janeiro, es uno de los edificios religiosos m\u00E1s particulares de la ciudad.")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed mt-3" }, T("Su arquitectura, inspirada en las pir\u00E1mides de Centroam\u00E9rica, destaca por su enorme planta circular y sus impresionantes vitrales.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/98852800-1798-4cdf-a640-83d5c37571b0", alt: T("Escaleras de Selar\u00F3n"), className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", null,
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("07 \u00B7 Santa Teresa")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83C\uDFA8 Escalera Selar\u00F3n")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("La famosa Escalera Selar\u00F3n se encuentra en Santa Teresa y fue decorada por el artista pl\u00E1stico chileno Jorge Selar\u00F3n.")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed mt-3" }, T("Considerada por su autor una obra viva y mutante, est\u00E1 revestida con cientos de piezas de cer\u00E1mica de diferentes colores, tama\u00F1os y formas.")))))),
                    React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-10  mb-10" },
                        React.createElement("div", { className: "text-center mb-8" },
                            React.createElement("span", { className: "text-amber-400 font-black text-xs uppercase tracking-widest" }, T("Tu experiencia incluye")),
                            React.createElement("h2", { className: "text-2xl sm:text-3xl font-black mt-2" }, T("Todo preparado para disfrutar R\u00EDo"))),
                        React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
                            React.createElement("div", { className: "bg-white/5 rounded-2xl p-5" },
                                React.createElement("span", { className: "text-amber-400 text-2xl" }, "\u2713"),
                                React.createElement("h3", { className: "font-black mt-2" }, T("Cristo Redentor")),
                                React.createElement("p", { className: "text-slate-300 text-sm mt-1" }, T("Ingreso incluido por Paineiras."))),
                            React.createElement("div", { className: "bg-white/5 rounded-2xl p-5" },
                                React.createElement("span", { className: "text-amber-400 text-2xl" }, "\u2713"),
                                React.createElement("h3", { className: "font-black mt-2" }, T("Pan de Az\u00FAcar")),
                                React.createElement("p", { className: "text-slate-300 text-sm mt-1" }, T("Ingreso al Bondinho incluido."))),
                            React.createElement("div", { className: "bg-white/5 rounded-2xl p-5" },
                                React.createElement("span", { className: "text-amber-400 text-2xl" }, "\u2713"),
                                React.createElement("h3", { className: "font-black mt-2" }, T("Almuerzo")),
                                React.createElement("p", { className: "text-slate-300 text-sm mt-1" }, T("Restaurant con buffet libre."))),
                            React.createElement("div", { className: "bg-white/5 rounded-2xl p-5" },
                                React.createElement("span", { className: "text-amber-400 text-2xl" }, "\u2713"),
                                React.createElement("h3", { className: "font-black mt-2" }, T("Transporte")),
                                React.createElement("p", { className: "text-slate-300 text-sm mt-1" }, T("Ida y vuelta hasta tu hotel.")))),
                        React.createElement("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8 pt-8 border-t border-white/10" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Duraci\u00F3n")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("Aprox. 8 horas"))),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Transporte")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("Van"))),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Embarque")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("8:00 - 9:00 AM"))),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Salidas")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("Todos los d\u00EDas"))))),
                    React.createElement("div", { className: "bg-amber-400 rounded-3xl p-6 sm:p-8 " },
                        React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-xs font-black uppercase tracking-widest" }, T("Precio especial")),
                                React.createElement("h2", { className: "text-4xl sm:text-5xl font-black mt-1" }, T("R$430")),
                                React.createElement("p", { className: "text-sm font-bold mt-1" }, T("Por persona \u00B7 d\u00EDas de semana")),
                                React.createElement("p", { className: "text-xs sm:text-sm mt-3 max-w-2xl" }, T("Salidas desde los principales hoteles de Copacabana, Ipanema y Centro de R\u00EDo. Para Barra da Tijuca, consultar valores."))),
                            React.createElement("button", { onClick: () => abrirReserva({
                                    id: 'full-day-rio',
                                    titulo: T('Full Day Río'),
                                    precio: T('R$430'),
                                    duracion: 'Aproximadamente 8 horas',
                                    grupo: T('Consultar disponibilidad'),
                                    encuentro: T('Hoteles de Zona Sul y Centro')
                                }), className: "w-full lg:w-auto bg-slate-950 hover:bg-slate-800 text-white font-black text-sm uppercase tracking-wider py-4 px-10 rounded-2xl  transition-all hover:scale-105" }, T("\uD83D\uDCC5 Reservar Ahora"))))))),
            seccionActual === 'buzios' && (React.createElement("section", { className: "py-12 sm:py-16 bg-slate-50" },
                React.createElement("div", { className: "max-w-6xl mx-auto px-4 sm:px-6" },
                    React.createElement("button", { onClick: volverUnaVista, className: "inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-xs uppercase mb-8 transition-colors" }, T("\u2190 Volver a Experiencias")),
                    React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-10" },
                        React.createElement("span", { className: "inline-flex items-center bg-teal-500 text-white font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4 " }, T("\uD83C\uDF0A Experiencia de Playa")),
                        React.createElement("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 uppercase tracking-tight mb-5" },
                            T("B\u00FAzios "),
                            React.createElement("span", { className: "text-teal-500" }, "en Goleta")),
                        React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto" }, T("Descubre la perla de la Regi\u00F3n de Lagos y disfruta de algunas de las playas m\u00E1s encantadoras de Brasil en una experiencia completa desde R\u00EDo de Janeiro."))),
                    React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden  border border-slate-100 mb-10" },
                        React.createElement("div", { className: "relative w-full aspect-video bg-slate-900" },
                            React.createElement("iframe", { className: "absolute inset-0 w-full h-full", src: "https://www.youtube.com/embed/z_mYfwJ8Dao", title: T("B\u00FAzios \u2014 Tour en Goleta"), frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", allowFullScreen: true }))),
                    React.createElement("div", { className: "bg-white rounded-3xl  border border-slate-100 p-6 sm:p-10 mb-10" },
                        React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8" },
                            React.createElement("div", { className: "max-w-3xl" },
                                React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("Tour completo desde R\u00EDo")),
                                React.createElement("h2", { className: "text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-4" }, T("B\u00FAzios, playas paradis\u00EDacas y paseo en goleta")),
                                React.createElement("p", { className: "text-slate-600 leading-relaxed" }, T("Descubre B\u00FAzios, la perla de la Regi\u00F3n de Lagos, en la costa norte del Estado de R\u00EDo de Janeiro. A aproximadamente 160 km de la ciudad de R\u00EDo, B\u00FAzios re\u00FAne playas de diferentes formas y paisajes que pueden disfrutarse durante todo el a\u00F1o.")),
                                React.createElement("p", { className: "text-slate-600 leading-relaxed mt-4" }, T("El viaje desde R\u00EDo hasta Arma\u00E7\u00E3o de B\u00FAzios dura aproximadamente 2 horas y 40 minutos, dependiendo de las condiciones del tr\u00E1fico. Al llegar, embarcaremos en la goleta para comenzar nuestro recorrido por algunas de las playas m\u00E1s bonitas de la regi\u00F3n."))),
                            React.createElement("div", { className: "shrink-0 bg-teal-500 text-white rounded-2xl px-6 py-5 text-center " },
                                React.createElement("span", { className: "block text-[10px] font-black uppercase tracking-widest" }, T("Desde")),
                                React.createElement("span", { className: "text-4xl font-black block" }, T("R$230")),
                                React.createElement("span", { className: "block text-xs font-bold" }, T("por persona")),
                                React.createElement("span", { className: "block text-[10px] font-semibold mt-1" }, "+ taxa marinha"))),
                        React.createElement("div", { className: "space-y-10" },
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3079", alt: T("Playa Jo\u00E3o Fernandes en B\u00FAzios"), className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", null,
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("01 \u00B7 Primera parada")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83C\uDFD6\uFE0F Playa Jo\u00E3o Fernandes")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Una de las playas m\u00E1s conocidas de B\u00FAzios, rodeada de aguas tranquilas y hermosos paisajes. Es uno de los lugares que hacen de B\u00FAzios uno de los destinos de playa m\u00E1s encantadores de Brasil.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "md:order-2 rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3080", alt: "Praia das Mo\u00E7as e Ilha Feia", className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", { className: "md:order-1" },
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("02 \u00B7 Segunda parada")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83C\uDF0A Praia das Mo\u00E7as \u00B7 Ilha Feia")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Durante el recorrido en goleta tambi\u00E9n disfrutaremos de la regi\u00F3n de Praia das Mo\u00E7as, junto a Ilha Feia, uno de los paisajes naturales que forman parte del encanto de la costa de B\u00FAzios.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3081", alt: T("Praia da Tartaruga en B\u00FAzios"), className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", null,
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("03 \u00B7 Tercera parada")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83D\uDC22 Praia da Tartaruga")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Cerramos el recorrido en una de las playas m\u00E1s famosas de B\u00FAzios, rodeada de naturaleza y aguas que invitan a disfrutar del paseo y del paisaje.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "md:order-2 rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3082", alt: T("Rua das Pedras en B\u00FAzios"), className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", { className: "md:order-1" },
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("04 \u00B7 Tiempo libre")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83D\uDECD\uFE0F Rua das Pedras")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Despu\u00E9s del almuerzo tendr\u00E1s tiempo libre para caminar por la famosa Rua das Pedras, la calle principal de B\u00FAzios, con restaurantes, tiendas, bares y mucho movimiento.")))))),
                    React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-10  mb-10" },
                        React.createElement("div", { className: "text-center mb-8" },
                            React.createElement("span", { className: "text-amber-400 font-black text-xs uppercase tracking-widest" }, T("Tu experiencia incluye")),
                            React.createElement("h2", { className: "text-2xl sm:text-3xl font-black mt-2" }, T("Todo preparado para disfrutar B\u00FAzios"))),
                        React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
                            React.createElement("div", { className: "bg-white/5 rounded-2xl p-5" },
                                React.createElement("span", { className: "text-amber-400 text-2xl" }, "\u2713"),
                                React.createElement("h3", { className: "font-black mt-2" }, T("Transporte")),
                                React.createElement("p", { className: "text-slate-300 text-sm mt-1" }, T("Transporte con aire acondicionado desde R\u00EDo."))),
                            React.createElement("div", { className: "bg-white/5 rounded-2xl p-5" },
                                React.createElement("span", { className: "text-amber-400 text-2xl" }, "\u2713"),
                                React.createElement("h3", { className: "font-black mt-2" }, T("Gu\u00EDa biling\u00FCe")),
                                React.createElement("p", { className: "text-slate-300 text-sm mt-1" }, T("Acompa\u00F1amiento durante la experiencia."))),
                            React.createElement("div", { className: "bg-white/5 rounded-2xl p-5" },
                                React.createElement("span", { className: "text-amber-400 text-2xl" }, "\u2713"),
                                React.createElement("h3", { className: "font-black mt-2" }, "Tour en goleta"),
                                React.createElement("p", { className: "text-slate-300 text-sm mt-1" }, T("Recorrido de aproximadamente 2 horas y 30 minutos."))),
                            React.createElement("div", { className: "bg-white/5 rounded-2xl p-5" },
                                React.createElement("span", { className: "text-amber-400 text-2xl" }, "\u2713"),
                                React.createElement("h3", { className: "font-black mt-2" }, T("Almuerzo")),
                                React.createElement("p", { className: "text-slate-300 text-sm mt-1" }, T("Almuerzo incluido durante la excursi\u00F3n.")))),
                        React.createElement("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8 pt-8 border-t border-white/10" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Duraci\u00F3n total")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("Aprox. 13 horas"))),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Goleta")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("Aprox. 2h30"))),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Salidas")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("Todos los d\u00EDas"))),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Horario")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("07:00 - 08:30"))))),
                    React.createElement("div", { className: "bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8  mb-10" },
                        React.createElement("div", { className: "flex gap-4 items-start" },
                            React.createElement("div", { className: "text-3xl shrink-0" }, "\u26A0\uFE0F"),
                            React.createElement("div", null,
                                React.createElement("h2", { className: "text-xl sm:text-2xl font-black text-slate-900 mb-3" }, T("Informaci\u00F3n importante sobre el paseo en goleta")),
                                React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed" }, T("La embarcaci\u00F3n cuenta con m\u00FAsica, servicio de bar y ba\u00F1os. Las goletas en B\u00FAzios no tienen permiso para acercarse a la franja de arena, por lo que los pasajeros pueden nadar \u00FAnicamente alrededor de la embarcaci\u00F3n, utilizando flotadores tipo \"fideos\".")),
                                React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed mt-4" }, T("El paseo en barco est\u00E1 sujeto a las condiciones clim\u00E1ticas y a la autorizaci\u00F3n de la Marina de Brasil. En determinados d\u00EDas, aunque haya sol, el viento puede provocar el cierre del puerto y la prohibici\u00F3n de salida de las embarcaciones.")),
                                React.createElement("p", { className: "text-slate-900 font-bold text-sm sm:text-base leading-relaxed mt-4" }, T("\uD83D\uDE90 En caso de que la Marina proh\u00EDba la salida de los barcos por viento u otras condiciones clim\u00E1ticas, la actividad ser\u00E1 realizada por tierra para que podamos continuar disfrutando de B\u00FAzios."))))),
                    React.createElement("div", { className: "bg-teal-500 text-white rounded-3xl p-6 sm:p-8 " },
                        React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-xs font-black uppercase tracking-widest" }, T("Precio especial")),
                                React.createElement("h2", { className: "text-4xl sm:text-5xl font-black mt-1" }, T("R$230")),
                                React.createElement("p", { className: "text-sm font-bold mt-1" }, T("Por persona + taxa marinha")),
                                React.createElement("p", { className: "text-xs sm:text-sm mt-3 max-w-2xl" }, T("Salidas todos los d\u00EDas. Horarios de recogida entre las 07:00 y las 08:30, seg\u00FAn el punto de encuentro."))),
                            React.createElement("button", { onClick: () => abrirReserva({
                                    id: 'exp-2',
                                    titulo: T('Búzios — Tour en Goleta'),
                                    precio: 'R$230 + taxa marinha',
                                    duracion: 'Aproximadamente 13 horas',
                                    grupo: T('Salidas todos los días'),
                                    encuentro: T('Consultar')
                                }), className: "w-full lg:w-auto bg-slate-950 hover:bg-slate-800 text-white font-black text-sm uppercase tracking-wider py-4 px-10 rounded-2xl  transition-all hover:scale-105" }, T("\uD83D\uDCC5 Reservar Ahora"))))))),
            seccionActual === 'detalle_exp-3' && (React.createElement("section", { className: "py-12 sm:py-16 bg-slate-50" },
                React.createElement("div", { className: "max-w-6xl mx-auto px-4 sm:px-6" },
                    React.createElement("button", { onClick: volverUnaVista, className: "inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-xs uppercase mb-8 transition-colors" }, T("\u2190 Volver a Experiencias")),
                    React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-10" },
                        React.createElement("span", { className: "inline-flex items-center bg-teal-500 text-white font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4 " }, T("\u2728 Experiencia Imperdible")),
                        React.createElement("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 uppercase tracking-tight mb-5" },
                            "Cristo ",
                            React.createElement("span", { className: "text-teal-500" }, "+ City Tour")),
                        React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto" }, T("Conoce el Cristo Redentor y descubre algunos de los principales puntos tur\u00EDsticos de R\u00EDo de Janeiro en una experiencia completa para conocer la esencia de la Ciudad Maravillosa."))),
                    React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden  border border-slate-100 mb-10" },
                        React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3083", alt: T("Cristo Redentor en R\u00EDo de Janeiro"), className: "w-full h-72 sm:h-96 md:h-[500px] object-cover" })),
                    React.createElement("div", { className: "bg-white rounded-3xl  border border-slate-100 p-6 sm:p-10 mb-10" },
                        React.createElement("div", { className: "max-w-4xl" },
                            React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("R\u00EDo de Janeiro \u00B7 Cristo Redentor + City Tour")),
                            React.createElement("h2", { className: "text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-5" }, T("Una experiencia para conocer los \u00EDconos de R\u00EDo")),
                            React.createElement("p", { className: "text-slate-600 leading-relaxed" }, T("Ven a conocer uno de los puntos tur\u00EDsticos m\u00E1s famosos de Brasil, localizado en lo alto del Morro del Corcovado. El Cristo Redentor es una de las grandes postales de R\u00EDo de Janeiro y una de las Nuevas Siete Maravillas del Mundo.")),
                            React.createElement("p", { className: "text-slate-600 leading-relaxed mt-4" }, T("Adem\u00E1s de visitar el Cristo, recorreremos algunos de los principales puntos de inter\u00E9s tur\u00EDstico de la ciudad, combinando historia, arquitectura, cultura, f\u00FAtbol y el esp\u00EDritu carioca.")))),
                    React.createElement("div", { className: "bg-white rounded-3xl  border border-slate-100 p-6 sm:p-10 mb-10" },
                        React.createElement("div", { className: "text-center mb-10" },
                            React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("Principales visitas")),
                            React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2" }, T("Descubre R\u00EDo de Janeiro"))),
                        React.createElement("div", { className: "space-y-10" },
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3084", alt: T("Cristo Redentor"), className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", null,
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("01 \u00B7 Principal atracci\u00F3n")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\u271D\uFE0F Cristo Redentor")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Visitaremos el famoso Cristo Redentor, ubicado en lo alto del Morro Corcovado, uno de los lugares m\u00E1s emblem\u00E1ticos de R\u00EDo de Janeiro y una de las Nuevas Siete Maravillas del Mundo.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "md:order-2 rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3086", alt: "Maracan\u00E3", className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", { className: "md:order-1" },
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("02 \u00B7 F\u00FAtbol brasile\u00F1o")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\u26BD Maracan\u00E3")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Realizaremos una parada externa para fotograf\u00EDas frente al m\u00EDtico Maracan\u00E3, uno de los estadios m\u00E1s famosos de la historia del f\u00FAtbol.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3087", alt: T("Samb\u00F3dromo de R\u00EDo de Janeiro"), className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", null,
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("03 \u00B7 Carnaval")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83C\uDFAD Samb\u00F3dromo")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Conoceremos el Samb\u00F3dromo da Marqu\u00EAs de Sapuca\u00ED, uno de los grandes s\u00EDmbolos del Carnaval Carioca y escenario de los grandes desfiles de las escuelas de samba.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "md:order-2 rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3088", alt: T("Escalera Selar\u00F3n"), className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", { className: "md:order-1" },
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("04 \u00B7 Santa Teresa")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83C\uDFA8 Escalera Selar\u00F3n")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Visitaremos la famosa Escalera Selar\u00F3n, una de las obras m\u00E1s coloridas y fotografiadas de R\u00EDo de Janeiro, ubicada entre Santa Teresa y Lapa.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3089", alt: T("Catedral Metropolitana de R\u00EDo de Janeiro"), className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", null,
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("05 \u00B7 Historia y arquitectura")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\u26EA Catedral S\u00E3o Sebasti\u00E3o")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Conoceremos la Catedral Metropolitana de S\u00E3o Sebasti\u00E3o, uno de los edificios religiosos m\u00E1s particulares de R\u00EDo, reconocido por su impresionante arquitectura.")))))),
                    React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-10  mb-10" },
                        React.createElement("div", { className: "text-center mb-8" },
                            React.createElement("span", { className: "text-amber-400 font-black text-xs uppercase tracking-widest" }, T("Tu experiencia incluye")),
                            React.createElement("h2", { className: "text-2xl sm:text-3xl font-black mt-2" }, T("Todo preparado para disfrutar R\u00EDo"))),
                        React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
                            React.createElement("div", { className: "bg-white/5 rounded-2xl p-5" },
                                React.createElement("span", { className: "text-amber-400 text-2xl" }, "\u2713"),
                                React.createElement("h3", { className: "font-black mt-2" }, T("Cristo Redentor")),
                                React.createElement("p", { className: "text-slate-300 text-sm mt-1" }, T("Visita al Cristo Redentor."))),
                            React.createElement("div", { className: "bg-white/5 rounded-2xl p-5" },
                                React.createElement("span", { className: "text-amber-400 text-2xl" }, "\u2713"),
                                React.createElement("h3", { className: "font-black mt-2" }, T("City Tour")),
                                React.createElement("p", { className: "text-slate-300 text-sm mt-1" }, T("Recorrido por los principales puntos tur\u00EDsticos."))),
                            React.createElement("div", { className: "bg-white/5 rounded-2xl p-5" },
                                React.createElement("span", { className: "text-amber-400 text-2xl" }, "\u2713"),
                                React.createElement("h3", { className: "font-black mt-2" }, T("Almuerzo")),
                                React.createElement("p", { className: "text-slate-300 text-sm mt-1" }, T("Opci\u00F3n con almuerzo incluido."))),
                            React.createElement("div", { className: "bg-white/5 rounded-2xl p-5" },
                                React.createElement("span", { className: "text-amber-400 text-2xl" }, "\u2713"),
                                React.createElement("h3", { className: "font-black mt-2" }, T("Transporte")),
                                React.createElement("p", { className: "text-slate-300 text-sm mt-1" }, T("Transporte durante la experiencia.")))),
                        React.createElement("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8 pt-8 border-t border-white/10" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Horario")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("08:00 - 13:30/14:00"))),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Salidas")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("Diarias"))),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Con almuerzo")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("R$250"))),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Sin almuerzo")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("R$230"))))),
                    React.createElement("div", { className: "bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8  mb-10" },
                        React.createElement("div", { className: "flex gap-4 items-start" },
                            React.createElement("div", { className: "text-3xl shrink-0" }, "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66"),
                            React.createElement("div", null,
                                React.createElement("h2", { className: "text-xl sm:text-2xl font-black text-slate-900 mb-3" }, T("Informaci\u00F3n para familias")),
                                React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed" }, T("Ni\u00F1os de 5 a 10 a\u00F1os: consultar valor.")),
                                React.createElement("p", { className: "text-slate-900 font-bold text-sm sm:text-base leading-relaxed mt-2" }, T("Ni\u00F1os de 0 a 4 a\u00F1os: no pagan."))))),
                    React.createElement("div", { className: "bg-teal-500 text-white rounded-3xl p-6 sm:p-8 " },
                        React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-xs font-black uppercase tracking-widest" }, T("Precio especial")),
                                React.createElement("h2", { className: "text-4xl sm:text-5xl font-black mt-1" }, T("R$230")),
                                React.createElement("p", { className: "text-sm font-bold mt-1" }, T("Sin almuerzo \u00B7 R$250 con almuerzo")),
                                React.createElement("p", { className: "text-xs sm:text-sm mt-3" }, T("Salidas diarias. Inicio de recepci\u00F3n de pasajeros desde las 08:00 hasta las 13:30/14:00 aproximadamente."))),
                            React.createElement("div", { className: "flex flex-col sm:flex-row gap-3" },
                                React.createElement("button", { onClick: () => abrirReserva({
                                        id: 'exp-3',
                                        titulo: T('Cristo + City Tour'),
                                        precio: T('R$230 / R$250 con almuerzo'),
                                        duracion: T('Consultar'),
                                        grupo: T('Consultar'),
                                        encuentro: T('Consultar')
                                    }), className: "w-full lg:w-auto bg-slate-950 hover:bg-slate-800 text-white font-black text-sm uppercase tracking-wider py-4 px-8 rounded-2xl  transition-all hover:scale-105" }, T("\uD83D\uDCC5 Reservar Ahora")),
                                React.createElement("a", { href: "https://wa.me/5521969946938?text=Hola%20Ernestinho,%20le%C3%AD%20tu%20art%C3%ADculo%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n", target: "_blank", rel: "noopener noreferrer", className: "w-full lg:w-auto bg-green-600 hover:bg-green-700 text-white font-black text-sm uppercase tracking-wider py-4 px-8 rounded-2xl  transition-all hover:scale-105 text-center" }, T("\uD83D\uDCAC WhatsApp")))))))),
            seccionActual === 'detalle_exp-4' && (React.createElement("section", { className: "py-12 sm:py-16 bg-slate-50" },
                React.createElement("div", { className: "max-w-6xl mx-auto px-4 sm:px-6" },
                    React.createElement("button", { onClick: volverUnaVista, className: "inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-xs uppercase mb-8 transition-colors" }, T("\u2190 Volver a Experiencias")),
                    React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-10" },
                        React.createElement("span", { className: "inline-flex items-center bg-teal-500 text-white font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4 " }, T("\uD83C\uDFDD\uFE0F Para\u00EDso Brasile\u00F1o")),
                        React.createElement("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 uppercase tracking-tight mb-5" },
                            "Arraial ",
                            React.createElement("span", { className: "text-teal-500" }, "do Cabo")),
                        React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto" }, T("Descubre el llamado Caribe Brasile\u00F1o y navega por algunos de los paisajes m\u00E1s impresionantes del litoral de R\u00EDo de Janeiro."))),
                    React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden  border border-slate-100 mb-10" },
                        React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3093", alt: T("Arraial do Cabo"), className: "w-full h-72 sm:h-96 md:h-[500px] object-cover" })),
                    React.createElement("div", { className: "bg-white rounded-3xl  border border-slate-100 p-6 sm:p-10 mb-10" },
                        React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("El Caribe Brasile\u00F1o")),
                        React.createElement("h2", { className: "text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-5" }, T("Un d\u00EDa entre playas, dunas y aguas cristalinas")),
                        React.createElement("p", { className: "text-slate-600 leading-relaxed" }, T("Arraial do Cabo re\u00FAne algunos de los paisajes m\u00E1s bellos del litoral del Estado de R\u00EDo de Janeiro, con dunas, restingas, lagunas, playas y costas paradis\u00EDacas.")),
                        React.createElement("p", { className: "text-slate-600 leading-relaxed mt-4" }, T("Despu\u00E9s de recoger a los pasajeros en los principales hoteles de Zona Sul y Centro de R\u00EDo de Janeiro, continuaremos hacia Arraial do Cabo para disfrutar de un hermoso paseo en barco por la regi\u00F3n."))),
                    React.createElement("div", { className: "bg-white rounded-3xl  border border-slate-100 p-6 sm:p-10 mb-10" },
                        React.createElement("div", { className: "text-center mb-10" },
                            React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("Paseo en barco")),
                            React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2" }, T("Tres paradas para disfrutar el para\u00EDso"))),
                        React.createElement("div", { className: "space-y-10" },
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3091", alt: "Praia do Forno en Arraial do Cabo", className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", null,
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("01 \u00B7 Primera parada")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83C\uDFD6\uFE0F Praia do Forno")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Realizaremos una parada frente a Praia do Forno para disfrutar de sus aguas cristalinas y podremos nadar alrededor de la embarcaci\u00F3n.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "md:order-2 rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3090", alt: "Ilha do Farol", className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", { className: "md:order-1" },
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("02 \u00B7 Segunda parada")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83C\uDFDD\uFE0F Praia do Farol \u00B7 Ilha do Farol")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Descenderemos en la famosa Praia do Farol, una de las playas m\u00E1s espectaculares de la regi\u00F3n, rodeada de naturaleza y aguas cristalinas.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3090", alt: "Prainhas do Pontal do Atalaia", className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", null,
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("03 \u00B7 Tercera parada")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83D\uDCF8 Prainhas do Pontal do Atalaia")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Otra de las grandes postales de Arraial do Cabo. Aqu\u00ED se encuentran las famosas escaleras que descienden hacia una de las playas m\u00E1s fotografiadas de la regi\u00F3n.")))))),
                    React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-10  mb-10" },
                        React.createElement("div", { className: "text-center mb-8" },
                            React.createElement("span", { className: "text-amber-400 font-black text-xs uppercase tracking-widest" }, T("Almuerzo incluido")),
                            React.createElement("h2", { className: "text-2xl sm:text-3xl font-black mt-2" }, T("Para cerrar el d\u00EDa, un almuerzo en tierra firme"))),
                        React.createElement("div", { className: "max-w-4xl mx-auto" },
                            React.createElement("p", { className: "text-slate-300 leading-relaxed text-sm sm:text-base" }, T("El almuerzo ser\u00E1 servido en tierra firme al regresar del paseo en barco, aproximadamente a las 17:00 horas.")),
                            React.createElement("p", { className: "text-slate-300 leading-relaxed text-sm sm:text-base mt-4" }, T("El paseo en barco tiene una duraci\u00F3n aproximada de 4 a 4 horas y 30 minutos.")))),
                    React.createElement("div", { className: "bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8  mb-10" },
                        React.createElement("div", { className: "flex gap-4 items-start" },
                            React.createElement("div", { className: "text-3xl shrink-0" }, "\u26A0\uFE0F"),
                            React.createElement("div", null,
                                React.createElement("h2", { className: "text-xl sm:text-2xl font-black text-slate-900 mb-3" }, T("Informaci\u00F3n importante")),
                                React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed" }, T("El paseo en barco est\u00E1 sujeto a las condiciones clim\u00E1ticas y a las condiciones de navegaci\u00F3n de la regi\u00F3n.")),
                                React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed mt-4" }, T("El horario de regreso puede sufrir modificaciones debido al tr\u00E1fico en carretera, especialmente durante feriados y temporadas de mayor movimiento."))))),
                    React.createElement("div", { className: "bg-white rounded-3xl  border border-slate-100 p-6 sm:p-10 mb-10" },
                        React.createElement("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-5" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Duraci\u00F3n")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("Aprox. 14 horas"))),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Embarque")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("Desde 07:00"))),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Regreso")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("Aprox. 21:00"))),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Barco")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("4h - 4h30"))))),
                    React.createElement("div", { className: "bg-teal-500 text-white rounded-3xl p-6 sm:p-8 " },
                        React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-xs font-black uppercase tracking-widest" }, T("Precio especial")),
                                React.createElement("h2", { className: "text-4xl sm:text-5xl font-black mt-1" }, T("R$200")),
                                React.createElement("p", { className: "text-sm font-bold mt-1" }, T("+ taxa da Marinha / pescadores")),
                                React.createElement("p", { className: "text-xs sm:text-sm mt-3 max-w-2xl" }, T("Valor referencial de temporada baja. Consultar valor de la tasa vigente.")),
                                React.createElement("p", { className: "text-xs sm:text-sm mt-2" }, T("Ni\u00F1os de 0 a 5 a\u00F1os no pagan. Ni\u00F1os de 6 a 10 a\u00F1os pagan el 50%."))),
                            React.createElement("div", { className: "flex flex-col sm:flex-row gap-3" },
                                React.createElement("button", { onClick: () => abrirReserva({
                                        id: 'exp-4',
                                        titulo: T('Arraial do Cabo'),
                                        precio: 'R$200 + taxa da Marinha/Pescadores',
                                        duracion: 'Aproximadamente 14 horas',
                                        grupo: T('Consultar'),
                                        encuentro: 'Hoteles Zona Sul y Centro'
                                    }), className: "w-full lg:w-auto bg-slate-950 hover:bg-slate-800 text-white font-black text-sm uppercase tracking-wider py-4 px-8 rounded-2xl  transition-all hover:scale-105" }, T("\uD83D\uDCC5 Reservar Ahora")),
                                React.createElement("a", { href: "https://wa.me/5521969946938?text=Hola%20Ernestinho,%20le%C3%AD%20tu%20art%C3%ADculo%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n", target: "_blank", rel: "noopener noreferrer", className: "w-full lg:w-auto bg-green-600 hover:bg-green-700 text-white font-black text-sm uppercase tracking-wider py-4 px-8 rounded-2xl  transition-all hover:scale-105 text-center" }, T("\uD83D\uDCAC WhatsApp")))))))),
            seccionActual === 'detalle_exp-5' && (React.createElement("section", { className: "py-12 sm:py-16 bg-slate-50" },
                React.createElement("div", { className: "max-w-6xl mx-auto px-4 sm:px-6" },
                    React.createElement("button", { onClick: volverUnaVista, className: "inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-xs uppercase mb-8 transition-colors" }, T("\u2190 Volver a Experiencias")),
                    React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-10" },
                        React.createElement("span", { className: "inline-flex items-center bg-teal-500 text-white font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4 " }, T("\uD83C\uDFDD\uFE0F Para\u00EDso Tropical")),
                        React.createElement("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 uppercase tracking-tight mb-5" },
                            "Angra ",
                            React.createElement("span", { className: "text-teal-500" }, "dos Reis")),
                        React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto" }, T("Descubre un para\u00EDso formado por islas, aguas cristalinas, naturaleza preservada y paisajes que parecen sacados de una postal."))),
                    React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden  border border-slate-100 mb-10" },
                        React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3097", alt: T("Angra dos Reis"), className: "w-full h-72 sm:h-96 md:h-[500px] object-cover" })),
                    React.createElement("div", { className: "bg-white rounded-3xl  border border-slate-100 p-6 sm:p-10 mb-10" },
                        React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("Angra dos Reis \u00B7 Costa Verde")),
                        React.createElement("h2", { className: "text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-5" }, T("365 islas y un paisaje de otro mundo")),
                        React.createElement("p", { className: "text-slate-600 leading-relaxed" }, T("Angra dos Reis es una de las regiones m\u00E1s bellas de Brasil, formada por un impresionante conjunto de islas y una naturaleza preservada que convierte el destino en una experiencia inolvidable.")),
                        React.createElement("p", { className: "text-slate-600 leading-relaxed mt-4" }, T("Desde R\u00EDo de Janeiro recorreremos aproximadamente 166 km hasta Angra dos Reis, en un viaje de unas 2 horas y 30 minutos, dependiendo de las condiciones del tr\u00E1fico."))),
                    React.createElement("div", { className: "bg-white rounded-3xl  border border-slate-100 p-6 sm:p-10 mb-10" },
                        React.createElement("div", { className: "text-center mb-10" },
                            React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("Recorrido")),
                            React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2" }, T("Un d\u00EDa navegando por Angra"))),
                        React.createElement("div", { className: "space-y-10" },
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3096", alt: T("Playa Cataguases"), className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", null,
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("01 \u00B7 Primera parada")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83C\uDFDD\uFE0F Playa Cataguases")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Primera parada para disfrutar de las aguas de Angra. El ba\u00F1o se realiza alrededor de la embarcaci\u00F3n y no desembarcamos en la playa.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "md:order-2 rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3094", alt: "Blue Lagoon Angra dos Reis", className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", { className: "md:order-1" },
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("02 \u00B7 Segunda parada")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83D\uDC99 Blue Lagoon")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("Una de las paradas m\u00E1s esperadas del recorrido. Blue Lagoon es un verdadero acuario natural, donde tendremos alrededor de 40 minutos para nadar y bucear alrededor del barco.")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed mt-3" }, T("Dentro del barco tambi\u00E9n es posible alquilar m\u00E1scaras de buceo. Quienes lo deseen pueden contratar fotograf\u00EDas profesionales bajo el agua.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3095", alt: "Japariz Beach", className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", null,
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("03 \u00B7 Almuerzo")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83C\uDF7D\uFE0F Japariz Beach")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("En Japariz Beach realizaremos el almuerzo en un restaurante r\u00FAstico de cocina casera. La regi\u00F3n es de preservaci\u00F3n natural y cuenta con una infraestructura sencilla.")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed mt-3" }, T("El almuerzo est\u00E1 incluido. Bebidas y postres no est\u00E1n incluidos. Despu\u00E9s de comer tendremos tiempo para disfrutar de la playa.")))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" },
                                React.createElement("div", { className: "md:order-2 rounded-2xl overflow-hidden " },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3097", alt: T("Playa de Santana o Ara\u00E7a"), className: "w-full h-64 sm:h-80 object-cover" })),
                                React.createElement("div", { className: "md:order-1" },
                                    React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("04 \u00B7 \u00DAltima parada")),
                                    React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, T("\uD83C\uDF34 Santana o Ara\u00E7a")),
                                    React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, T("La \u00FAltima parada programada ser\u00E1 en la playa de Santana o Ara\u00E7a, dependiendo de las condiciones de navegaci\u00F3n.")))))),
                    React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-10  mb-10" },
                        React.createElement("div", { className: "flex gap-4 items-start" },
                            React.createElement("div", { className: "text-3xl shrink-0" }, "\u2615"),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-amber-400 font-black text-xs uppercase tracking-widest" }, T("Durante el viaje")),
                                React.createElement("h2", { className: "text-2xl sm:text-3xl font-black mt-2 mb-4" }, T("Parada t\u00E9cnica en Muriqui")),
                                React.createElement("p", { className: "text-slate-300 text-sm sm:text-base leading-relaxed" }, T("Durante el trayecto hasta Angra realizaremos una parada aproximada de 20 minutos en Muriqui para tomar un caf\u00E9, comer algo y utilizar los sanitarios.")),
                                React.createElement("p", { className: "text-slate-300 text-sm sm:text-base leading-relaxed mt-4" }, T("En el regreso tambi\u00E9n se realizar\u00E1 una parada t\u00E9cnica aproximada de 15 minutos."))))),
                    React.createElement("div", { className: "bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8  mb-10" },
                        React.createElement("div", { className: "flex gap-4 items-start" },
                            React.createElement("div", { className: "text-3xl shrink-0" }, "\u26A0\uFE0F"),
                            React.createElement("div", null,
                                React.createElement("h2", { className: "text-xl sm:text-2xl font-black text-slate-900 mb-3" }, T("Informaci\u00F3n importante")),
                                React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed" }, T("El orden de las paradas y las playas puede cambiar a criterio del capit\u00E1n debido a las condiciones de marea y viento, priorizando siempre la seguridad de los pasajeros.")),
                                React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed mt-4" }, T("Los paseos en barco se realizan \u00FAnicamente cuando las condiciones clim\u00E1ticas son favorables.")),
                                React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed mt-4" }, T("El tiempo de regreso puede retrasarse debido al tr\u00E1fico, especialmente durante feriados prolongados y per\u00EDodos de gran movimiento en la ciudad."))))),
                    React.createElement("div", { className: "bg-white rounded-3xl  border border-slate-100 p-6 sm:p-10 mb-10" },
                        React.createElement("div", { className: "text-center mb-8" },
                            React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, T("Tu experiencia incluye")),
                            React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2" }, T("Todo preparado para disfrutar Angra"))),
                        React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
                            React.createElement("div", { className: "bg-slate-50 rounded-2xl p-5" },
                                React.createElement("span", { className: "text-teal-600 text-2xl" }, "\u2713"),
                                React.createElement("h3", { className: "font-black mt-2 text-slate-900" }, T("Transporte")),
                                React.createElement("p", { className: "text-slate-500 text-sm mt-1" }, T("Transporte desde hoteles de Zona Sul y Centro."))),
                            React.createElement("div", { className: "bg-slate-50 rounded-2xl p-5" },
                                React.createElement("span", { className: "text-teal-600 text-2xl" }, "\u2713"),
                                React.createElement("h3", { className: "font-black mt-2 text-slate-900" }, T("Paseo en barco")),
                                React.createElement("p", { className: "text-slate-500 text-sm mt-1" }, T("Recorrido por las islas y playas de Angra dos Reis."))),
                            React.createElement("div", { className: "bg-slate-50 rounded-2xl p-5" },
                                React.createElement("span", { className: "text-teal-600 text-2xl" }, "\u2713"),
                                React.createElement("h3", { className: "font-black mt-2 text-slate-900" }, T("Almuerzo")),
                                React.createElement("p", { className: "text-slate-500 text-sm mt-1" }, T("Almuerzo incluido. Bebidas y postres no incluidos."))),
                            React.createElement("div", { className: "bg-slate-50 rounded-2xl p-5" },
                                React.createElement("span", { className: "text-teal-600 text-2xl" }, "\u2713"),
                                React.createElement("h3", { className: "font-black mt-2 text-slate-900" }, T("Gu\u00EDa tur\u00EDstico")),
                                React.createElement("p", { className: "text-slate-500 text-sm mt-1" }, T("Servicio de gu\u00EDa durante la experiencia."))))),
                    React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-10  mb-10" },
                        React.createElement("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-5" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Duraci\u00F3n")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("Aprox. 12 horas"))),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Salidas")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("Diarias"))),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Embarque")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("Zona Sul y Centro"))),
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-slate-400 text-[10px] uppercase font-bold" }, T("Transporte")),
                                React.createElement("p", { className: "font-black text-base sm:text-lg" }, T("Minib\u00FAs / Bus"))))),
                    React.createElement("div", { className: "bg-teal-500 text-white rounded-3xl p-6 sm:p-8 " },
                        React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-xs font-black uppercase tracking-widest" }, T("Precio desde")),
                                React.createElement("h2", { className: "text-4xl sm:text-5xl font-black mt-1" }, T("R$200")),
                                React.createElement("p", { className: "text-sm font-bold mt-1" }, T("+ taxa da Marinha")),
                                React.createElement("p", { className: "text-xs sm:text-sm mt-3" }, T("Valor sujeto a temporada y condiciones del servicio."))),
                            React.createElement("div", { className: "flex flex-col sm:flex-row gap-3" },
                                React.createElement("button", { onClick: () => abrirReserva({
                                        id: 'exp-5',
                                        titulo: T('Angra dos Reis'),
                                        precio: T('Desde R$200 + taxa da Marinha'),
                                        duracion: 'Aproximadamente 12 horas',
                                        grupo: T('Consultar'),
                                        encuentro: 'Hoteles Zona Sul y Centro'
                                    }), className: "w-full lg:w-auto bg-slate-950 hover:bg-slate-800 text-white font-black text-sm uppercase tracking-wider py-4 px-8 rounded-2xl  transition-all hover:scale-105" }, T("\uD83D\uDCC5 Reservar Ahora")),
                                React.createElement("a", { href: "https://wa.me/5521969946938?text=Hola%20Ernestinho,%20le%C3%AD%20tu%20art%C3%ADculo%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n", target: "_blank", rel: "noopener noreferrer", className: "w-full lg:w-auto bg-green-600 hover:bg-green-700 text-white font-black text-sm uppercase tracking-wider py-4 px-8 rounded-2xl  transition-all hover:scale-105 text-center" }, T("\uD83D\uDCAC WhatsApp")))))))),
            seccionActual === 'transportes' && (React.createElement("section", { className: "min-h-screen bg-white" },
                React.createElement("div", { className: "relative h-[380px] overflow-hidden" },
                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3070", alt: "Transporte en R\u00EDo de Janeiro", className: "w-full h-full object-cover" }),
                    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" }),
                    React.createElement("div", { className: "absolute bottom-0 left-0 right-0 p-6 md:p-12" },
                        React.createElement("div", { className: "max-w-6xl mx-auto" },
                            React.createElement("span", { className: "inline-block bg-teal-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider mb-4" }, "\uD83D\uDE8D C\u00F3mo moverse por R\u00EDo"),
                            React.createElement("h1", { className: "text-4xl md:text-6xl font-black text-white leading-tight" }, "Transporte en R\u00EDo de Janeiro"),
                            React.createElement("p", { className: "text-white/90 mt-4 max-w-3xl text-sm md:text-lg leading-relaxed" }, "Moverse por R\u00EDo puede ser muy f\u00E1cil si sabes qu\u00E9 transporte utilizar en cada momento. Aqu\u00ED encontrar\u00E1s las mejores opciones para turistas, desde Uber y Metro hasta bicicletas y transporte privado.")))),
                React.createElement("div", { className: "max-w-6xl mx-auto px-5 py-12" },
                    React.createElement("div", { className: "max-w-4xl" },
                        React.createElement("h2", { className: "text-3xl md:text-4xl font-black text-slate-900 mb-5" }, "\u00BFCu\u00E1l es la mejor forma de moverse por R\u00EDo?"),
                        React.createElement("p", { className: "text-slate-600 leading-relaxed mb-4" }, "R\u00EDo de Janeiro es una ciudad enorme y los lugares tur\u00EDsticos est\u00E1n distribuidos entre diferentes zonas. Por eso, no existe un \u00FAnico transporte que sea el mejor para todo."),
                        React.createElement("p", { className: "text-slate-600 leading-relaxed" }, "Dependiendo de d\u00F3nde est\u00E9s, a d\u00F3nde quieras ir, la hora del d\u00EDa y si llevas equipaje, puede ser mucho m\u00E1s conveniente utilizar Uber, Metro, bicicleta o contratar un transporte privado.")),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-10" },
                        React.createElement("div", { className: "bg-slate-50 rounded-3xl overflow-hidden border border-slate-100   transition-all flex flex-col" },
                            React.createElement("div", { className: "h-56 relative" },
                                React.createElement("img", { src: "https://www-motoristasdeaplicativos-com-br.translate.goog/wp-content/uploads/2020/02/uber-rj-768x403.jpg?_x_tr_sl=pt&_x_tr_tl=es&_x_tr_hl=es-419&_x_tr_pto=sc", alt: "Uber en R\u00EDo de Janeiro", className: "w-full h-full object-cover" }),
                                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" }),
                                React.createElement("div", { className: "absolute bottom-4 left-5" },
                                    React.createElement("span", { className: "bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold" }, "\uD83D\uDE97 Aplicaci\u00F3n"))),
                            React.createElement("div", { className: "p-6 flex-1 flex flex-col" },
                                React.createElement("h3", { className: "text-2xl font-black text-slate-900 mb-3" }, "Uber"),
                                React.createElement("p", { className: "text-slate-600 text-sm leading-relaxed mb-6" }, "Una de las formas m\u00E1s c\u00F3modas y pr\u00E1cticas para moverse por R\u00EDo, especialmente cuando llevas equipaje, viajas de noche o quieres llegar directamente a tu destino."),
                                React.createElement("button", { onClick: () => setSeccionActual('transporte_uber'), className: "mt-auto w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors" }, "\uD83D\uDE97 Ver informaci\u00F3n de Uber"))),
                        React.createElement("div", { className: "bg-slate-50 rounded-3xl overflow-hidden border border-slate-100   transition-all flex flex-col" },
                            React.createElement("div", { className: "h-56 relative" },
                                React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3063.jpg", alt: "Metr\u00F4Rio", className: "w-full h-full object-cover" }),
                                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" }),
                                React.createElement("div", { className: "absolute bottom-4 left-5" },
                                    React.createElement("span", { className: "bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold" }, "\uD83D\uDE87 Transporte p\u00FAblico"))),
                            React.createElement("div", { className: "p-6 flex-1 flex flex-col" },
                                React.createElement("h3", { className: "text-2xl font-black text-slate-900 mb-3" }, "Metro de R\u00EDo"),
                                React.createElement("p", { className: "text-slate-600 text-sm leading-relaxed mb-6" }, "R\u00E1pido, pr\u00E1ctico y especialmente \u00FAtil para conectar Copacabana, Ipanema, Centro, Maracan\u00E1 y otras zonas de la ciudad evitando buena parte del tr\u00E1fico."),
                                React.createElement("button", { onClick: () => setSeccionActual('transporte_metro'), className: "mt-auto w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition-colors" }, "\uD83D\uDE87 Ver gu\u00EDa completa del Metro"))),
                        React.createElement("div", { className: "bg-slate-50 rounded-3xl overflow-hidden border border-slate-100   transition-all flex flex-col" },
                            React.createElement("div", { className: "h-56 relative" },
                                React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3069", alt: "Bike Ita\u00FA R\u00EDo de Janeiro", className: "w-full h-full object-cover" }),
                                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" }),
                                React.createElement("div", { className: "absolute bottom-4 left-5" },
                                    React.createElement("span", { className: "bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-bold" }, "\uD83D\uDEB2 Bike Ita\u00FA"))),
                            React.createElement("div", { className: "p-6 flex-1 flex flex-col" },
                                React.createElement("h3", { className: "text-2xl font-black text-slate-900 mb-3" }, "Bicicletas"),
                                React.createElement("p", { className: "text-slate-600 text-sm leading-relaxed mb-6" }, "Una excelente alternativa para recorrer las playas y algunos de los lugares m\u00E1s bonitos de R\u00EDo a tu propio ritmo."),
                                React.createElement("button", { onClick: () => setSeccionActual('transporte_bicicletas'), className: "mt-auto w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold py-3 rounded-xl transition-colors" }, "\uD83D\uDEB2 Ver gu\u00EDa de bicicletas"))),
                        React.createElement("div", { className: "bg-slate-50 rounded-3xl overflow-hidden border border-slate-100   transition-all flex flex-col" },
                            React.createElement("div", { className: "h-56 relative" },
                                React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3073", alt: "Transporte privado en R\u00EDo", className: "w-full h-full object-cover" }),
                                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" }),
                                React.createElement("div", { className: "absolute bottom-4 left-5" },
                                    React.createElement("span", { className: "bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold" }, "\uD83D\uDE90 Servicio privado"))),
                            React.createElement("div", { className: "p-6 flex-1 flex flex-col" },
                                React.createElement("h3", { className: "text-2xl font-black text-slate-900 mb-3" }, "Transporte privado"),
                                React.createElement("p", { className: "text-slate-600 text-sm leading-relaxed mb-6" }, "Para quienes buscan comodidad, seguridad y atenci\u00F3n personalizada, puedes contratar veh\u00EDculos privados con chofer para traslados, excursiones y viajes entre ciudades."),
                                React.createElement("button", { onClick: () => setSeccionActual('transporte_privado'), className: "mt-auto w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors" }, "\uD83D\uDE90 Ver transporte privado")),
                            React.createElement("div", { className: "bg-slate-50 rounded-3xl overflow-hidden border border-slate-100   transition-all flex flex-col" },
                                React.createElement("div", { className: "h-56 relative" },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/v1789052363/miniaturas_guia_rio_alquiler_de_vehiculos.png", alt: "Alquiler de auto en R\u00EDo y Brasil", className: "w-full h-full object-cover" }),
                                    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" }),
                                    React.createElement("div", { className: "absolute bottom-4 left-5" },
                                        React.createElement("span", { className: "bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold" }, "\uD83D\uDE97 Auto de alquiler"))),
                                React.createElement("div", { className: "p-6 flex-1 flex flex-col" },
                                    React.createElement("h3", { className: "text-2xl font-black text-slate-900 mb-3" }, "Alquiler de auto"),
                                    React.createElement("p", { className: "text-slate-600 text-sm leading-relaxed mb-6" }, "Descubre cu\u00E1ndo vale la pena alquilar un veh\u00EDculo, qu\u00E9 necesitas para retirarlo y c\u00F3mo comparar opciones para recorrer R\u00EDo y otros destinos de Brasil con libertad."),
                                    React.createElement("button", { onClick: () => {
                                            setHistorialSecciones(prev => [...prev, seccionActual].slice(-50));
                                            setTemaGuia('alquiler-auto');
                                            seoNavigate(`/guia/${seoSlug(GUIA_INFO['alquiler-auto'].titulo)}`);
                                            setSeccionActualBase('guia');
                                        }, className: "mt-auto w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-colors" }, "\uD83D\uDE97 Ver gu\u00EDa de alquiler de auto")))))))),
            seccionActual === 'transporte_uber' && (React.createElement("section", { className: "min-h-screen bg-white" },
                React.createElement("div", { className: "max-w-5xl mx-auto px-5 py-8" },
                    React.createElement("button", { onClick: volverUnaVista, className: "mb-6 text-sm font-bold text-slate-600 hover:text-teal-600" }, "\u2190 Volver a Transportes"),
                    React.createElement("div", { className: "rounded-3xl overflow-hidden mb-8" },
                        React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3075", alt: "Uber R\u00EDo de Janeiro", className: "w-full h-[300px] object-cover" })),
                    React.createElement("h1", { className: "text-4xl md:text-5xl font-black text-slate-900 mb-6" }, "Uber en R\u00EDo de Janeiro"),
                    React.createElement("p", { className: "text-slate-600 leading-relaxed mb-5" }, "Uber es una de las alternativas m\u00E1s pr\u00E1cticas para desplazarse por R\u00EDo de Janeiro. Para un turista puede resultar especialmente c\u00F3modo porque permite solicitar el veh\u00EDculo directamente desde el celular, conocer el destino antes de iniciar el viaje y evitar tener que explicar la direcci\u00F3n en portugu\u00E9s."),
                    React.createElement("p", { className: "text-slate-600 leading-relaxed mb-8" }, "Es una opci\u00F3n muy recomendable cuando llevas maletas, cuando quieres ir directamente desde tu alojamiento a una atracci\u00F3n tur\u00EDstica o cuando el trayecto en transporte p\u00FAblico requiere varias conexiones."),
                    React.createElement("div", { className: "bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8" },
                        React.createElement("h3", { className: "font-black text-slate-900 mb-2" }, "\u2B50 Consejo de oro de Ernestinho"),
                        React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, "Si vas a pagar tu Uber en efectivo, recuerda siempre verificar que el conductor haya cerrado correctamente el viaje en la aplicaci\u00F3n antes de realizar el pago. As\u00ED evitas problemas con el valor final del viaje o que el recorrido contin\u00FAe abierto en la aplicaci\u00F3n.")),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mb-4" }, "Consejos de seguridad"),
                    React.createElement("ul", { className: "space-y-3 text-slate-600 text-sm leading-relaxed mb-8" },
                        React.createElement("li", null, "\u2713 Comprueba siempre la matr\u00EDcula del veh\u00EDculo."),
                        React.createElement("li", null, "\u2713 Confirma que el nombre y la fotograf\u00EDa del conductor coincidan."),
                        React.createElement("li", null, "\u2713 No subas a un veh\u00EDculo diferente al indicado en la aplicaci\u00F3n."),
                        React.createElement("li", null, "\u2713 Comprueba el destino antes de iniciar el viaje."),
                        React.createElement("li", null, "\u2713 En zonas muy concurridas, espera en un punto seguro y visible.")),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mb-4" }, "\u00BFCu\u00E1ndo recomiendo utilizar Uber?"),
                    React.createElement("p", { className: "text-slate-600 leading-relaxed mb-4" }, "Para ir al aeropuerto con equipaje, regresar despu\u00E9s de una noche de paseo, desplazarte entre barrios alejados o cuando el transporte p\u00FAblico no sea pr\u00E1ctico, Uber puede ahorrarte bastante tiempo."),
                    React.createElement("p", { className: "text-slate-600 leading-relaxed" }, "En horas punta, grandes eventos o zonas con mucha demanda, el precio puede aumentar y el tiempo de espera puede ser mayor. En esos casos conviene comparar el precio con el Metro antes de solicitar el viaje.")))),
            seccionActual === 'transporte_metro' && (React.createElement("section", { className: "min-h-screen bg-white" },
                React.createElement("div", { className: "max-w-5xl mx-auto px-5 py-8" },
                    React.createElement("button", { onClick: volverUnaVista, className: "mb-6 text-sm font-bold text-slate-600 hover:text-teal-600" }, "\u2190 Volver a Transportes"),
                    React.createElement("div", { className: "rounded-3xl overflow-hidden mb-8" },
                        React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3063", alt: "Metro de R\u00EDo", className: "w-full h-[320px] object-cover" })),
                    React.createElement("h1", { className: "text-4xl md:text-5xl font-black text-slate-900 mb-6" }, "\uD83D\uDE87 Metro de R\u00EDo de Janeiro"),
                    React.createElement("p", { className: "text-slate-600 leading-relaxed mb-5" }, "El Metr\u00F4Rio es una de las mejores alternativas para desplazarse por las principales zonas tur\u00EDsticas de R\u00EDo, especialmente cuando el tr\u00E1fico est\u00E1 complicado."),
                    React.createElement("div", { className: "bg-teal-50 border border-teal-100 rounded-2xl p-6 mb-8" },
                        React.createElement("h3", { className: "text-xl font-black text-slate-900 mb-2" }, "\uD83D\uDCB0 Tarifa actual"),
                        React.createElement("p", { className: "text-slate-700" },
                            "La tarifa normal del Metr\u00F4Rio es actualmente de",
                            React.createElement("strong", null, " R$ 7,90 por embarque"),
                            ".")),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mb-4" }, "\uD83D\uDCB3 \u00BFC\u00F3mo pagar el Metro?"),
                    React.createElement("p", { className: "text-slate-600 leading-relaxed mb-5" }, "Una de las grandes ventajas para los turistas es que ya no es necesario comprar obligatoriamente una tarjeta de transporte. El Metr\u00F4Rio permite diferentes formas de embarque."),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-8" },
                        React.createElement("div", { className: "bg-slate-50 p-5 rounded-2xl" },
                            React.createElement("h3", { className: "font-black text-slate-900 mb-2" }, "\uD83D\uDCF1 Pago por aproximaci\u00F3n"),
                            React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed" }, "Puedes acercar directamente a la m\u00E1quina de la estaci\u00F3n una tarjeta de cr\u00E9dito o d\u00E9bito compatible con NFC. Tambi\u00E9n puedes utilizar celulares, relojes u otros dispositivos compatibles.")),
                        React.createElement("div", { className: "bg-slate-50 p-5 rounded-2xl" },
                            React.createElement("h3", { className: "font-black text-slate-900 mb-2" }, "\uD83D\uDCB3 Cart\u00E3o Giro"),
                            React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed" }, "Es la tarjeta propia del Metr\u00F4Rio. Puede adquirirse en las estaciones y recargarse posteriormente.")),
                        React.createElement("div", { className: "bg-slate-50 p-5 rounded-2xl" },
                            React.createElement("h3", { className: "font-black text-slate-900 mb-2" }, "\uD83D\uDCF2 QR Code"),
                            React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed" }, "Tambi\u00E9n existe el billete unitario mediante QR Code, que puede comprarse digitalmente y utilizarse directamente en la catraca.")),
                        React.createElement("div", { className: "bg-slate-50 p-5 rounded-2xl" },
                            React.createElement("h3", { className: "font-black text-slate-900 mb-2" }, "\uD83E\uDEAA Ja\u00E9"),
                            React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed" }, "El sistema Ja\u00E9 forma parte del sistema de billetaje digital de R\u00EDo y puede utilizarse para diferentes servicios de transporte. Es especialmente interesante para quienes tambi\u00E9n utilizar\u00E1n BRT o VLT."))),
                    React.createElement("div", { className: "bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10" },
                        React.createElement("h3", { className: "font-black text-slate-900 mb-2" }, "\u2B50 Consejo para turistas extranjeros"),
                        React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, "Si tu tarjeta internacional permite pagos por aproximaci\u00F3n, normalmente esta es la alternativa m\u00E1s sencilla para utilizar el Metro durante tu viaje. No necesitas preocuparte por comprar una tarjeta de transporte solamente para algunos viajes.")),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mb-5" }, "\uD83D\uDDFA\uFE0F Principales l\u00EDneas"),
                    React.createElement("div", { className: "space-y-5 mb-10" },
                        React.createElement("div", { className: "border border-slate-100 rounded-2xl p-5" },
                            React.createElement("h3", { className: "font-black text-slate-900 mb-2" }, "L\u00EDnea 1"),
                            React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed" }, "Muy \u00FAtil para moverse por la Zona Sur y conectar con zonas como Copacabana, Botafogo y el Centro.")),
                        React.createElement("div", { className: "border border-slate-100 rounded-2xl p-5" },
                            React.createElement("h3", { className: "font-black text-slate-900 mb-2" }, "L\u00EDnea 2"),
                            React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed" }, "Es especialmente interesante para quienes quieren visitar Maracan\u00E1 y diferentes zonas de la Zona Norte.")),
                        React.createElement("div", { className: "border border-slate-100 rounded-2xl p-5" },
                            React.createElement("h3", { className: "font-black text-slate-900 mb-2" }, "L\u00EDnea 4"),
                            React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed" }, "Conecta la Zona Sur con Barra da Tijuca y resulta muy pr\u00E1ctica para desplazarse hacia Leblon, S\u00E3o Conrado y Jardim Oce\u00E2nico."))),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mb-5" }, "\uD83D\uDDFA\uFE0F Mapa del Metro"),
                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3062", alt: "Mapa del Metro de R\u00EDo de Janeiro", className: "w-full rounded-2xl border border-slate-100 mb-10" }),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mb-5" }, "\uD83D\uDCCD Metro y principales lugares tur\u00EDsticos"),
                    React.createElement("div", { className: "space-y-4 text-sm text-slate-600 leading-relaxed" },
                        React.createElement("p", null,
                            React.createElement("strong", null, "Copacabana:"),
                            " las estaciones Cardeal Arcoverde, Siqueira Campos y Cantagalo permiten acceder a diferentes sectores del barrio."),
                        React.createElement("p", null,
                            React.createElement("strong", null, "Ipanema:"),
                            " las estaciones General Os\u00F3rio y Nossa Senhora da Paz son algunas de las m\u00E1s \u00FAtiles para visitar la zona."),
                        React.createElement("p", null,
                            React.createElement("strong", null, "Maracan\u00E1:"),
                            " la estaci\u00F3n Maracan\u00E3 de la L\u00EDnea 2 es una de las opciones m\u00E1s pr\u00E1cticas para llegar al estadio."),
                        React.createElement("p", null,
                            React.createElement("strong", null, "Centro:"),
                            " estaciones como Carioca, Cinel\u00E2ndia y Uruguaiana permiten acceder a diferentes atractivos hist\u00F3ricos y culturales."),
                        React.createElement("p", null,
                            React.createElement("strong", null, "Jardim Oce\u00E2nico:"),
                            " es una estaci\u00F3n estrat\u00E9gica para conectar con Barra da Tijuca y el sistema BRT.")),
                    React.createElement("div", { className: "mt-10 bg-slate-900 text-white rounded-3xl p-7" },
                        React.createElement("h3", { className: "text-xl font-black mb-3" }, "\uD83D\uDCA1 Mi consejo"),
                        React.createElement("p", { className: "text-white/80 text-sm leading-relaxed" }, "Para un turista que se est\u00E1 alojando en Copacabana, Ipanema o Botafogo, aprender a utilizar el Metro puede significar un ahorro importante de tiempo y dinero. Para distancias cortas o cuando llevas equipaje, Uber puede ser m\u00E1s c\u00F3modo."))))),
            seccionActual === 'transporte_bicicletas' && (React.createElement("section", { className: "min-h-screen bg-white" },
                React.createElement("div", { className: "max-w-5xl mx-auto px-5 py-8" },
                    React.createElement("button", { onClick: volverUnaVista, className: "mb-6 text-sm font-bold text-slate-600 hover:text-teal-600" }, "\u2190 Volver a Transportes"),
                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3069", alt: "Bike Ita\u00FA R\u00EDo de Janeiro", className: "w-full h-[320px] object-cover rounded-3xl mb-8" }),
                    React.createElement("h1", { className: "text-4xl md:text-5xl font-black text-slate-900 mb-6" }, "\uD83D\uDEB2 Bicicletas Bike Ita\u00FA"),
                    React.createElement("p", { className: "text-slate-600 leading-relaxed mb-5" }, "R\u00EDo de Janeiro es una ciudad excelente para recorrer en bicicleta, especialmente por la zona de las playas. El sistema Bike Ita\u00FA permite alquilar bicicletas desde una aplicaci\u00F3n y devolverlas en estaciones distribuidas por diferentes sectores de la ciudad."),
                    React.createElement("p", { className: "text-slate-600 leading-relaxed mb-8" }, "Para un turista, es una opci\u00F3n especialmente interesante para recorrer el eje Leblon \u2013 Ipanema \u2013 Copacabana, la Laguna Rodrigo de Freitas y otros sectores donde existen ciclov\u00EDas."),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mb-5" }, "\uD83D\uDCF1 \u00BFC\u00F3mo funciona?"),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-10" },
                        React.createElement("div", { className: "bg-slate-50 p-5 rounded-2xl text-center" },
                            React.createElement("div", { className: "text-3xl mb-2" }, "1\uFE0F\u20E3"),
                            React.createElement("h3", { className: "font-black" }, "Descarga la App")),
                        React.createElement("div", { className: "bg-slate-50 p-5 rounded-2xl text-center" },
                            React.createElement("div", { className: "text-3xl mb-2" }, "2\uFE0F\u20E3"),
                            React.createElement("h3", { className: "font-black" }, "Elige tu plan")),
                        React.createElement("div", { className: "bg-slate-50 p-5 rounded-2xl text-center" },
                            React.createElement("div", { className: "text-3xl mb-2" }, "3\uFE0F\u20E3"),
                            React.createElement("h3", { className: "font-black" }, "Desbloquea la bici")),
                        React.createElement("div", { className: "bg-slate-50 p-5 rounded-2xl text-center" },
                            React.createElement("div", { className: "text-3xl mb-2" }, "4\uFE0F\u20E3"),
                            React.createElement("h3", { className: "font-black" }, "Devu\u00E9lvela"))),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mb-5" }, "\uD83D\uDCB0 Valores actuales"),
                    React.createElement("div", { className: "bg-teal-50 border border-teal-100 rounded-2xl p-6 mb-8" },
                        React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed mb-4" }, "Los precios pueden variar seg\u00FAn el plan disponible en la aplicaci\u00F3n. Actualmente, la p\u00E1gina oficial de Bike Ita\u00FA para R\u00EDo muestra, entre otras opciones:"),
                        React.createElement("ul", { className: "space-y-3 text-sm text-slate-700" },
                            React.createElement("li", null,
                                "\uD83D\uDEB2 ",
                                React.createElement("strong", null, "Plan mensual:"),
                                " desde R$ 43,90/mes."),
                            React.createElement("li", null, "\uD83D\uDEB2 Hasta 4 viajes diarios en bicicletas mec\u00E1nicas dentro del plan."),
                            React.createElement("li", null, "\u23F1\uFE0F Hasta 60 minutos por viaje durante la semana."),
                            React.createElement("li", null, "\u23F1\uFE0F Hasta 2 horas por viaje durante los fines de semana."),
                            React.createElement("li", null, "\u26A1 Las bicicletas el\u00E9ctricas tienen tarifas adicionales espec\u00EDficas."))),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mb-5" }, "\uD83D\uDDFA\uFE0F Recorridos que recomiendo"),
                    React.createElement("div", { className: "space-y-5 mb-10" },
                        React.createElement("div", { className: "border border-slate-100 rounded-2xl p-5" },
                            React.createElement("h3", { className: "font-black text-slate-900 mb-2" }, "Leblon \u2192 Ipanema \u2192 Copacabana"),
                            React.createElement("p", { className: "text-sm text-slate-600" }, "Uno de los recorridos m\u00E1s agradables para conocer las playas mientras pedaleas.")),
                        React.createElement("div", { className: "border border-slate-100 rounded-2xl p-5" },
                            React.createElement("h3", { className: "font-black text-slate-900 mb-2" }, "Copacabana \u2192 Botafogo \u2192 Flamengo"),
                            React.createElement("p", { className: "text-sm text-slate-600" }, "Una ruta que permite disfrutar de algunas de las mejores vistas de la costa de R\u00EDo.")),
                        React.createElement("div", { className: "border border-slate-100 rounded-2xl p-5" },
                            React.createElement("h3", { className: "font-black text-slate-900 mb-2" }, "Laguna Rodrigo de Freitas"),
                            React.createElement("p", { className: "text-sm text-slate-600" }, "Ideal para pedalear tranquilamente y disfrutar del paisaje con el Cristo Redentor como tel\u00F3n de fondo.")),
                        React.createElement("div", { className: "border border-slate-100 rounded-2xl p-5" },
                            React.createElement("h3", { className: "font-black text-slate-900 mb-2" }, "Ipanema \u2192 Leblon \u2192 S\u00E3o Conrado"),
                            React.createElement("p", { className: "text-sm text-slate-600" }, "Una ruta m\u00E1s larga y exigente, con paisajes espectaculares."))),
                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3068", alt: "Ciclov\u00EDas de R\u00EDo de Janeiro", className: "w-full rounded-3xl mb-8" }),
                    React.createElement("div", { className: "bg-amber-50 border border-amber-200 rounded-2xl p-6" },
                        React.createElement("h3", { className: "font-black text-slate-900 mb-2" }, T("⭐ Consejo de Ernestinho")),
                        React.createElement("p", { className: "text-slate-700 text-sm leading-relaxed" }, "Para disfrutar realmente la bicicleta en R\u00EDo, intenta utilizar las ciclov\u00EDas y evita las calles con mucho tr\u00E1fico cuando exista una alternativa m\u00E1s segura."))))),
            seccionActual === 'transporte_privado' && (React.createElement("section", { className: "min-h-screen bg-white" },
                React.createElement("div", { className: "max-w-5xl mx-auto px-5 py-8" },
                    React.createElement("button", { onClick: volverUnaVista, className: "mb-6 text-sm font-bold text-slate-600 hover:text-teal-600" }, "\u2190 Volver a Transportes"),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 mb-8" },
                        React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3070", alt: "Transporte privado", className: "w-full h-[280px] object-cover rounded-3xl" }),
                        React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3073", alt: "Veh\u00EDculo privado", className: "w-full h-[280px] object-cover rounded-3xl" })),
                    React.createElement("h1", { className: "text-4xl md:text-5xl font-black text-slate-900 mb-6" }, "\uD83D\uDE90 Transporte privado en R\u00EDo"),
                    React.createElement("p", { className: "text-slate-600 leading-relaxed mb-5" }, "Si quieres viajar de una manera m\u00E1s c\u00F3moda, segura y personalizada, tambi\u00E9n puedes contratar un servicio de transporte privado con conductor."),
                    React.createElement("p", { className: "text-slate-600 leading-relaxed mb-8" }, "Es una alternativa ideal para quienes viajan en familia, grupos de amigos, personas con equipaje o simplemente prefieren no preocuparse por el transporte durante sus vacaciones."),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 mb-10" },
                        React.createElement("div", { className: "bg-slate-50 rounded-2xl p-6" },
                            React.createElement("h3", { className: "text-xl font-black text-slate-900 mb-3" }, "\u2708\uFE0F Aeropuerto \u2192 Hotel"),
                            React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed" }, "Traslado privado desde los aeropuertos de R\u00EDo hasta tu alojamiento y tambi\u00E9n servicio de regreso al aeropuerto.")),
                        React.createElement("div", { className: "bg-slate-50 rounded-2xl p-6" },
                            React.createElement("h3", { className: "text-xl font-black text-slate-900 mb-3" }, "\uD83C\uDFD6\uFE0F R\u00EDo \u2192 B\u00FAzios"),
                            React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed" }, "Transporte privado entre R\u00EDo de Janeiro y B\u00FAzios, con horarios adaptados a tu viaje.")),
                        React.createElement("div", { className: "bg-slate-50 rounded-2xl p-6" },
                            React.createElement("h3", { className: "text-xl font-black text-slate-900 mb-3" }, "\uD83C\uDF34 R\u00EDo \u2192 Angra dos Reis"),
                            React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed" }, "Una opci\u00F3n c\u00F3moda para trasladarte entre R\u00EDo y Angra dos Reis evitando las complicaciones del transporte colectivo.")),
                        React.createElement("div", { className: "bg-slate-50 rounded-2xl p-6" },
                            React.createElement("h3", { className: "text-xl font-black text-slate-900 mb-3" }, "\uD83D\uDDFA\uFE0F Paseos privados"),
                            React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed" }, "Tambi\u00E9n puedes contratar un veh\u00EDculo con conductor para realizar un paseo privado y organizar el recorrido de acuerdo con tus intereses."))),
                    React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-7 mb-8" },
                        React.createElement("h2", { className: "text-2xl font-black mb-4" }, "\u00BFPor qu\u00E9 elegir un transporte privado?"),
                        React.createElement("ul", { className: "space-y-3 text-white/80 text-sm" },
                            React.createElement("li", null, "\u2713 Mayor comodidad durante el viaje."),
                            React.createElement("li", null, "\u2713 Servicio personalizado."),
                            React.createElement("li", null, "\u2713 Veh\u00EDculos para diferentes tama\u00F1os de grupos."),
                            React.createElement("li", null, "\u2713 Conductores experimentados."),
                            React.createElement("li", null, "\u2713 Traslados entre R\u00EDo y otras ciudades tur\u00EDsticas."),
                            React.createElement("li", null, "\u2713 Posibilidad de organizar horarios de acuerdo con tu itinerario."))),
                    React.createElement("div", { className: "text-center bg-teal-50 rounded-3xl p-8" },
                        React.createElement("h2", { className: "text-2xl font-black text-slate-900 mb-3" }, "\uD83D\uDCF2 \u00BFQuieres cotizar tu traslado?"),
                        React.createElement("p", { className: "text-slate-600 text-sm mb-6" }, "Escr\u00EDbenos por WhatsApp indicando tu fecha, horario, origen, destino y cantidad de pasajeros."),
                        React.createElement("a", { href: "https://wa.me/5521969946938", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-black px-8 py-4 rounded-2xl transition-colors " }, "\uD83D\uDCAC Cotizar por WhatsApp"))))),
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
            seccionActual === 'atracciones' && (React.createElement("section", { className: "py-12 bg-[#071313] text-white min-h-screen" },
                React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
                    React.createElement("button", { onClick: () => setSeccionActual('que_hacer'), className: "mb-8 text-white/75 hover:text-amber-300 font-black text-xs uppercase" }, "← Volver a Qué hacer"),
                    React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-10" },
                        React.createElement("span", { className: "text-amber-300 font-bold text-xs uppercase tracking-widest block mb-2" }, "Qué hacer en Río"),
                        React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4" }, "Atracciones de Río de Janeiro"),
                        React.createElement("p", { className: "text-white/65 text-base sm:text-lg" }, "Museos, iglesias, fortalezas, teatros y espacios culturales. Entra por imagen y descubre cada lugar con toda su información.")),
                    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" }, [
                      ['centros_culturales','Centros culturales','Arte, exposiciones, música, cine y patrimonio.',(CENTROS_CULTURALES_DATA[0]||{}).miniatura || (CENTROS_CULTURALES_DATA[0]||{}).fotoPrincipal,'🎭'],
                      ['museos','Museos','Historia, ciencia, arte, aviación y patrimonio naval.',(MUSEOS_DATA[0]||{}).miniatura || (MUSEOS_DATA[0]||{}).fotoPrincipal,'🏛️'],
                      ['iglesias','Iglesias','Templos históricos y arquitectura religiosa carioca.',(IGLESIAS_DATA[0]||{}).miniatura || (IGLESIAS_DATA[0]||{}).fotoPrincipal,'⛪'],
                      ['fuertes_fortalezas','Fuertes y fortalezas','Construcciones militares, historia y vistas de Río.',(FUERTES_DATA[0]||{}).miniatura || (FUERTES_DATA[0]||{}).fotoPrincipal,'🏰'],
                      ['teatros','Teatros','Grandes escenarios, conciertos y salas históricas.',(TEATROS_DATA[0]||{}).miniatura || (TEATROS_DATA[0]||{}).fotoPrincipal,'🎭'],
                      ['espacios_literarios','Espacios literarios','Bibliotecas, escritores y patrimonio literario.',(ESPACIOS_LITERARIOS_DATA[0]||{}).miniatura || (ESPACIOS_LITERARIOS_DATA[0]||{}).fotoPrincipal,'📚']
                    ].map(a=>React.createElement("button",{key:a[0],onClick:()=>{ if(a[0]==='espacios_literarios'){setDetalleRuta(null);seoNavigate('/espacios-literarios');setHistorialSecciones(prev=>[...prev,seccionActual].slice(-50));setSeccionActualBase('espacios_literarios');}else setSeccionActual(a[0]);},className:"group text-left bg-[#102424] rounded-[1.7rem] overflow-hidden border border-white/10  hover:border-amber-300/60 transition-all"},
                      React.createElement("div",{className:"aspect-[4/3] overflow-hidden bg-slate-900"},a[3]?React.createElement("img",{src:a[3],alt:a[1],loading:"lazy",className:"w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"}):React.createElement("div",{className:"w-full h-full flex items-center justify-center text-6xl"},a[4])),
                      React.createElement("div",{className:"p-5"},React.createElement("span",{className:"text-2xl"},a[4]),React.createElement("h2",{className:"text-xl font-black text-white uppercase mt-2"},a[1]),React.createElement("p",{className:"text-sm text-white/60 mt-2"},a[2]),React.createElement("span",{className:"inline-flex mt-4 text-xs font-black text-amber-300"},"VER TODO →")))))))),
            seccionActual === 'museos' && (React.createElement("section", { className: "ec-dark-attraction py-12 bg-[#071313] min-h-screen" },
                React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
                    React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-10" },
                        React.createElement("span", { className: "text-amber-500 font-bold text-xs uppercase tracking-widest block mb-2" }, "Atracciones de R\u00EDo"),
                        React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4" }, "Museos de R\u00EDo de Janeiro"),
                        React.createElement("p", { className: "text-slate-600 text-base sm:text-lg" }, "Historia, ciencia, aviaci\u00F3n y patrimonio naval. Explora cada museo y descubre toda la informaci\u00F3n para planificar tu visita.")),
                    React.createElement("div", { className: "mb-10 ec-attraction-catalog-shell" },
                        React.createElement("div", { className: "bg-[#123b3b] rounded-3xl border border-slate-100  p-5 sm:p-6" },
                            React.createElement("p", { className: "text-[11px] font-bold uppercase tracking-widest text-teal-600 mb-2" }, "Museo seleccionado"),
                            React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" },
                                React.createElement("h2", { className: "text-xl sm:text-2xl font-black text-slate-900" }, (_a = MUSEOS_DATA.find((museo) => museo.id === museoSeleccionado)) === null || _a === void 0 ? void 0 : _a.nombre),
                                React.createElement("button", { type: "button", onClick: () => { if (museoSeleccionado) { seoNavigate('/museos'); setMuseoSeleccionado(null); window.scrollTo({top:0,behavior:'instant'}); } else { setSelectorMuseosAbierto(true); } }, className: "inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-teal-700 text-white font-black text-xs uppercase tracking-wide px-5 py-3.5 rounded-xl transition-all" },
                                    React.createElement("span", null, museoSeleccionado ? '← VOLVER A TODOS LOS MUSEOS' : 'Todos los museos a la vista'),
                                    React.createElement("span", null, selectorMuseosAbierto ? '▲' : '▼')))),
                        !museoSeleccionado && (React.createElement("div", { className: "mt-3 bg-[#123b3b] rounded-3xl border border-slate-200  p-4 sm:p-6" },
                            React.createElement("div", { className: "relative mb-5" },
                                React.createElement("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" }, "\uD83D\uDD0D"),
                                React.createElement("input", { type: "text", value: busquedaMuseo, onChange: (e) => setBusquedaMuseo(e.target.value), placeholder: "Buscar museo por nombre...", className: "w-full bg-[#123b3b] border border-amber-300/30 rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" })),
                            React.createElement("div", { className: "pr-1" },
                                React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3" }, MUSEOS_DATA
                                    .filter((museo) => museo.nombre
                                    .toLowerCase()
                                    .includes(busquedaMuseo.toLowerCase()))
                                    .map((museo) => (React.createElement("a", { href: `/museos/${seoSlug(museo.nombre)}`, key: museo.id, onClick: (ev) => {
                                        if (!(ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey)) {
                                            ev.preventDefault();
                                            seoNavigate(`/museos/${seoSlug(museo.nombre)}`);
                                            setMuseoSeleccionado(museo.id);
                                            setSelectorMuseosAbierto(false);
                                            window.scrollTo({ top: 0, behavior: 'instant' });
                                            setBusquedaMuseo('');
                                        }
                                    }, className: `block rounded-2xl overflow-hidden text-xs sm:text-sm font-bold leading-snug transition-all border ${museoSeleccionado === museo.id
                                        ? 'bg-[#f4c95d] text-black border-[#d6a62b]  scale-[1.02]'
                                        : 'bg-[#123b3b] text-white border-amber-300/30 hover:bg-[#f4c95d] hover:border-[#d6a62b] hover:text-black'}` },
                                    museo.miniatura && (React.createElement("div", { className: "w-full aspect-[4/3] overflow-hidden bg-[#123b3b]" },
                                        React.createElement("img", { src: museo.miniatura, alt: museo.nombre, className: "w-full h-full object-contain" }))),
                                    React.createElement("div", { className: "px-3 py-4" }, museo.nombre)))))),
                            MUSEOS_DATA.filter((museo) => museo.nombre
                                .toLowerCase()
                                .includes(busquedaMuseo.toLowerCase())).length === 0 && (React.createElement("p", { className: "text-center text-sm text-slate-500 py-8" }, "No encontramos un museo con ese nombre."))))),
                    MUSEOS_DATA
                        .filter((museo) => museo.id === museoSeleccionado)
                        .map((museo) => (React.createElement("div", { key: museo.id },
                        React.createElement("button", { type: "button", onClick: () => { seoNavigate('/museos'); setMuseoSeleccionado(null); setBusquedaMuseo(''); window.scrollTo({top:0,behavior:'instant'}); }, className: "mb-6 inline-flex items-center gap-2 text-white/80 hover:text-amber-300 font-black text-xs uppercase tracking-wide" }, "← VOLVER AL CATÁLOGO"),
                        React.createElement("div", { className: "bg-[#123b3b] rounded-3xl overflow-hidden  border border-slate-100 mb-8 flex flex-col" },
                            React.createElement("div", { className: "p-6 sm:p-10" },
                                React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, museo.categoria),
                                React.createElement("h2", { className: "text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-2" }, museo.nombre),
                                null,
                                React.createElement("p", { className: "text-amber-500 font-bold text-sm mb-6" }, museo.subtitulo),
                                React.createElement("p", { className: "text-slate-600 leading-relaxed text-sm sm:text-base max-w-4xl" }, museo.descripcion)),
                            museo.fotoPrincipal && (React.createElement("div", { className: "px-2 pb-2" },
                                React.createElement("div", { className: "rounded-2xl overflow-hidden h-72 sm:h-[480px] " },
                                    React.createElement("img", { src: museo.fotoPrincipal, alt: `${museo.nombre} - vista principal`, className: "w-full h-full object-cover" }))))),
                        React.createElement("div", { className: "max-w-4xl mx-auto" },
                            museo.historia && (React.createElement("div", { className: "mb-10" },
                                React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "Historia"),
                                React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-5" }, museo.tituloHistoria || 'Historia del museo'),
                                React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed" }, museo.historia))),
                            museo.historia2 && (React.createElement("div", { className: "mb-10" },
                                React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed" }, museo.historia2))),
                            museo.fotoMedia && (React.createElement("div", { className: "my-12 rounded-3xl overflow-hidden " },
                                React.createElement("img", { src: museo.fotoMedia, alt: `${museo.nombre} - patrimonio histórico`, className: "w-full h-72 sm:h-[430px] object-cover" }))),
                            museo.historia3 && (React.createElement("div", { className: "mb-10" },
                                React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mb-4" }, museo.tituloHistoria3 || 'El lugar y sus orígenes'),
                                React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed" }, museo.historia3))),
                            museo.historia4 && (React.createElement("div", { className: "mb-10" },
                                React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed" }, museo.historia4))),
                            museo.historia5 && (React.createElement("div", { className: "bg-[#123b3b] rounded-3xl p-6 sm:p-8 mb-12 border border-amber-300/40" },
                                React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-[#f4c95d] mb-4" }, museo.tituloHistoria5 || 'Un espacio con identidad propia'),
                                React.createElement("p", { className: "text-white text-base sm:text-lg leading-relaxed" }, museo.historia5))),
                            museo.historia6 && (React.createElement("div", { className: "mb-10" },
                                React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mb-4" }, museo.tituloHistoria6 || 'Una colección que merece ser descubierta'),
                                React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed" }, museo.historia6))),
                            museo.historia7 && (React.createElement("div", { className: "mb-10" },
                                React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mb-4" }, museo.tituloHistoria7 || 'Piezas destacadas de la colección'),
                                React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed" }, museo.historia7))),
                            museo.fotoFinal && (React.createElement("div", { className: "my-12 rounded-3xl overflow-hidden " },
                                React.createElement("img", { src: museo.fotoFinal, alt: `${museo.nombre} - colección histórica`, className: "w-full h-72 sm:h-[430px] object-cover" }))),
                            museo.historia8 && (React.createElement("div", { className: "mb-10" },
                                React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mb-4" }, museo.tituloHistoria8 || 'Historia y patrimonio'),
                                React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed" }, museo.historia8))),
                            museo.historia9 && (React.createElement("div", { className: "mb-10" },
                                React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mb-4" }, museo.tituloHistoria9 || 'Detalles que enriquecen la visita'),
                                React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed" }, museo.historia9))),
                            museo.historia10 && (React.createElement("div", { className: "mb-10" },
                                React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mb-4" }, museo.tituloHistoria10 || 'Investigación y preservación'),
                                React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed" }, museo.historia10))),
                            museo.historia11 && (React.createElement("div", { className: "bg-[#f4c95d] border border-[#d6a62b] rounded-3xl p-6 sm:p-8 mb-12" },
                                React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-black mb-4" }, museo.tituloHistoria11 || '¿Por qué vale la pena visitarlo?'),
                                React.createElement("p", { className: "text-black text-base sm:text-lg leading-relaxed" }, museo.historia11))),
                            museo.que_encontraras && (React.createElement("div", { className: "mb-12" },
                                React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mb-6" }, "\u00BFQu\u00E9 encontrar\u00E1s durante la visita?"),
                                React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3" }, museo.que_encontraras.map((item, index) => (React.createElement("div", { key: index, className: "bg-[#123b3b] rounded-2xl p-4 border border-amber-300/40  flex items-start gap-3" },
                                    React.createElement("span", { className: "flex items-center justify-center w-7 h-7 rounded-full bg-[#f4c95d] text-[#123b3b] font-black text-sm shrink-0" }, "\u2713"),
                                    React.createElement("p", { className: "text-sm sm:text-base text-white leading-relaxed" }, item))))))),
                            museo.curiosidades && (React.createElement("div", { className: "bg-[#f4c95d] border-2 border-[#d6a62b] rounded-3xl p-6 sm:p-8 mb-12" },
                                React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-black mb-6" }, "Curiosidades"),
                                React.createElement("div", { className: "space-y-4" }, museo.curiosidades.map((item, index) => (React.createElement("div", { key: index, className: "flex items-start gap-3" },
                                    React.createElement("span", { className: "text-black text-lg shrink-0" }, "\u2605"),
                                    React.createElement("p", { className: "text-black text-sm sm:text-base leading-relaxed" }, item)))))))),
                        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5 mb-8" },
                            React.createElement("div", { className: "bg-[#123b3b] rounded-2xl p-6 border border-amber-300/40 " },
                                React.createElement("div", { className: "text-2xl mb-3" }, "\uD83D\uDCCD"),
                                React.createElement("h3", { className: "font-black text-[#f4c95d] mb-2" }, "Direcci\u00F3n"),
                                React.createElement("p", { className: "text-sm text-white leading-relaxed" }, museo.direccion)),
                            React.createElement("div", { className: "bg-[#123b3b] rounded-2xl p-6 border border-amber-300/40 " },
                                React.createElement("div", { className: "text-2xl mb-3" }, "\uD83D\uDD50"),
                                React.createElement("h3", { className: "font-black text-[#f4c95d] mb-2" }, "Horarios"),
                                React.createElement("p", { className: "text-sm text-white leading-relaxed" }, museo.horario)),
                            React.createElement("div", { className: "bg-[#123b3b] rounded-2xl p-6 border border-amber-300/40 " },
                                React.createElement("div", { className: "text-2xl mb-3" }, "\uD83C\uDF9F\uFE0F"),
                                React.createElement("h3", { className: "font-black text-[#f4c95d] mb-2" }, "Entrada"),
                                React.createElement("p", { className: "text-sm text-white leading-relaxed" }, museo.precio))),
                        React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" },
                            museo.duracion && (React.createElement("div", { className: "bg-[#123b3b] rounded-2xl p-5 border border-slate-100 " },
                                React.createElement("div", { className: "text-2xl mb-3" }, "\u23F1\uFE0F"),
                                React.createElement("h3", { className: "font-black text-[#f4c95d] mb-2" }, "Tiempo de visita"),
                                React.createElement("p", { className: "text-sm text-white leading-relaxed" }, museo.duracion))),
                            museo.mejorHorario && (React.createElement("div", { className: "bg-[#123b3b] rounded-2xl p-5 border border-slate-100 " },
                                React.createElement("div", { className: "text-2xl mb-3" }, "\u2600\uFE0F"),
                                React.createElement("h3", { className: "font-black text-[#f4c95d] mb-2" }, "Mejor horario"),
                                React.createElement("p", { className: "text-sm text-white leading-relaxed" }, museo.mejorHorario))),
                            museo.reserva && (React.createElement("div", { className: "bg-[#123b3b] rounded-2xl p-5 border border-slate-100 " },
                                React.createElement("div", { className: "text-2xl mb-3" }, "\uD83D\uDCC5"),
                                React.createElement("h3", { className: "font-black text-[#f4c95d] mb-2" }, "Reserva"),
                                React.createElement("p", { className: "text-sm text-white leading-relaxed" }, museo.reserva))),
                            museo.accesibilidad && (React.createElement("div", { className: "bg-[#123b3b] rounded-2xl p-5 border border-slate-100 " },
                                React.createElement("div", { className: "text-2xl mb-3" }, "\u267F"),
                                React.createElement("h3", { className: "font-black text-[#f4c95d] mb-2" }, "Accesibilidad"),
                                React.createElement("p", { className: "text-sm text-white leading-relaxed" }, museo.accesibilidad)))),
                        museo.comoLlegar && (React.createElement("div", { className: "bg-[#123b3b] rounded-3xl p-6 sm:p-8 border border-slate-100  mb-8" },
                            React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "Transporte"),
                            React.createElement("h2", { className: "text-2xl font-black text-slate-900 mt-2 mb-4" }, "C\u00F3mo llegar"),
                            React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed" }, museo.comoLlegar))),
                        museo.consejoErnestinho && (React.createElement("div", { className: "bg-[#f4c95d] border-2 border-[#d6a62b] rounded-3xl p-6 sm:p-8 mb-8" },
                            React.createElement("div", { className: "flex items-start gap-4" },
                                React.createElement("div", { className: "text-3xl shrink-0" }, "\uD83D\uDCA1"),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-xs uppercase tracking-widest text-amber-600 font-black mb-2" }, "Consejo de Ernestinho"),
                                    React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed" }, museo.consejoErnestinho))))),
                        React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8" },
                            React.createElement("div", { className: "flex flex-col md:flex-row md:items-center gap-4" },
                                React.createElement("div", { className: "text-3xl" }, "\u2B50"),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-xs uppercase tracking-widest text-amber-400 font-bold mb-1" }, "Lo m\u00E1s destacado"),
                                    React.createElement("p", { className: "font-bold text-lg" }, museo.destaque)))),
                        museo.mapa && (React.createElement("div", { className: "bg-[#123b3b] rounded-3xl overflow-hidden border border-slate-100  mb-10" },
                            React.createElement("div", { className: "p-6 sm:p-8" },
                                React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "C\u00F3mo llegar"),
                                React.createElement("h3", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2" }, "Ubicaci\u00F3n"),
                                React.createElement("p", { className: "text-sm text-slate-500 mt-2" }, "Consulta la ubicaci\u00F3n del museo directamente en Google Maps.")),
                            React.createElement("div", { className: "w-full h-[350px] sm:h-[450px]" },
                                React.createElement("iframe", { src: museo.mapa, width: "100%", height: "100%", style: { border: 0 }, loading: "lazy", allowFullScreen: true, referrerPolicy: "no-referrer-when-downgrade", title: `Mapa de ${museo.nombre}` })))),
                        React.createElement("div", { className: "mt-10 mb-8" }, React.createElement(V4FitBlock, { entity: museo.id })),
                            React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mt-10 mb-10" },
                            React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6" },
                                React.createElement("div", null,
                                    React.createElement("h2", { className: "text-xl sm:text-2xl font-black mb-2" }, "\u00BFQuieres conocer R\u00EDo conmigo?"),
                                    React.createElement("p", { className: "text-slate-300 text-sm sm:text-base" }, "Dise\u00F1amos tu itinerario o te acompa\u00F1o en un tour privado exclusivo.")),
                                React.createElement("a", { href: "https://wa.me/5521969946938?text=Hola%20Ernestinho,%20le%C3%AD%20tu%20art%C3%ADculo%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wide px-6 py-4 rounded-xl transition-all  whitespace-nowrap" }, "HABLAR CON ERNESTINHO POR WHATSAPP"))))))))),
            seccionActual === 'espacios_literarios' && (React.createElement(SeccionEspaciosLiterarios, { key: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'espacios_literarios' ? detalleRuta.id : 'literarios', seleccionInicial: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'espacios_literarios' ? detalleRuta.id : null })),
            seccionActual === 'centros_culturales' && (React.createElement(SeccionCentrosCulturales, { key: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'centros_culturales' ? detalleRuta.id : 'centros', seleccionInicial: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'centros_culturales' ? detalleRuta.id : null })),
            seccionActual === 'teatros' && (React.createElement(SeccionTeatros, { key: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'teatros' ? detalleRuta.id : 'teatros', seleccionInicial: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'teatros' ? detalleRuta.id : null })),
            seccionActual === 'iglesias' && (React.createElement(SeccionIglesias, { key: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'iglesias' ? detalleRuta.id : 'iglesias', seleccionInicial: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'iglesias' ? detalleRuta.id : null })),
            seccionActual === 'fuertes_fortalezas' && (React.createElement(SeccionFuertesFortalezas, { key: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'fuertes_fortalezas' ? detalleRuta.id : 'fuertes', seleccionInicial: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'fuertes_fortalezas' ? detalleRuta.id : null })),
            seccionActual === 'familia' && (React.createElement(SeccionFamilia, { key: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'familia' ? detalleRuta.id : 'familia', seleccionInicial: (detalleRuta === null || detalleRuta === void 0 ? void 0 : detalleRuta.sec) === 'familia' ? detalleRuta.id : null, onVolver: () => setSeccionActual('que_hacer') })),
            seccionActual === 'consejos' && (React.createElement(ConsejosErnestinho, { onArticulo: verArticulo, onNavegar: setSeccionActual, onAbrirDetalle: abrirDetalleRuta, seleccionado: consejoSeleccionado, setSeleccionado: setConsejoSeleccionado, lang: lang })),
            seccionActual === 'consejos_anterior' && (React.createElement("section", { className: "py-12 bg-slate-50" },
                React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
                    React.createElement("div", { className: "text-center max-w-3xl mx-auto mb-12" },
                        React.createElement("span", { className: "text-amber-500 font-bold text-xs uppercase tracking-widest block mb-2" }, "Experiencia Directa"),
                        React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4" }, "Los Consejos de Ernestinho"),
                        React.createElement("p", { className: "text-slate-600" }, "Art\u00EDculos e itinerarios dise\u00F1ados para que ahorres tiempo, dinero y malos ratos.")),
                    React.createElement("button", { onClick: () => setSeccionActual('pix'), className: "w-full mb-10 text-left bg-gradient-to-r from-teal-950 to-emerald-600 text-white rounded-3xl p-7 sm:p-9  flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5" },
                        React.createElement("div", null,
                            React.createElement("span", { className: "text-emerald-200 text-xs font-black uppercase tracking-widest" }, "Dinero y pagos en Brasil"),
                            React.createElement("h2", { className: "text-3xl font-black mt-2" }, "Gu\u00EDa completa de Pix"),
                            React.createElement("p", { className: "text-teal-50 text-sm mt-2" }, "C\u00F3mo funciona, qui\u00E9n puede usarlo, conversi\u00F3n, seguridad y pago paso a paso.")),
                        React.createElement("span", { className: "bg-white text-teal-950 rounded-full px-5 py-3 text-xs font-black uppercase shrink-0" }, "Abrir gu\u00EDa \u2192")),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8" }, ARTICULOS_CONSEJOS.map((art) => (React.createElement("div", { key: art.id, className: "bg-white rounded-3xl overflow-hidden  border border-slate-100 flex flex-col sm:flex-row" },
                        React.createElement("div", { className: "sm:w-2/5 h-48 sm:h-auto relative" },
                            React.createElement("img", { src: art.imagen, alt: art.titulo, className: "w-full h-full object-cover" })),
                        React.createElement("div", { className: "sm:w-3/5 p-6 flex flex-col justify-between" },
                            React.createElement("div", null,
                                React.createElement("div", { className: "flex items-center gap-2 mb-2" },
                                    React.createElement("span", { className: "bg-teal-50 text-teal-700 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md" }, art.categoria),
                                    React.createElement("span", { className: "text-slate-400 text-[10px]" },
                                        "\u2022 ",
                                        art.minutos)),
                                React.createElement("h3", { className: "font-bold text-slate-900 text-lg leading-snug mb-2" }, art.titulo),
                                React.createElement("p", { className: "text-slate-500 text-xs leading-relaxed mb-4" }, art.resumen)),
                            React.createElement("a", { href: `/articulos/${seoSlug(art.titulo)}`, onClick: (ev) => { if (!(ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey)) { ev.preventDefault(); verArticulo(art); } }, className: "self-start text-xs font-bold text-teal-600 hover:text-teal-700 uppercase flex items-center gap-1" },
                                React.createElement("span", null, "Leer art\u00EDculo completo"),
                                React.createElement(Icon, { name: "chevron-right", className: "w-4 h-4" })))))))))),
            seccionActual === 'playas' && (React.createElement("section", { className: "py-12 bg-slate-50" },
                React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
                    React.createElement("div", { className: "text-center max-w-3xl mx-auto mb-12" },
                        React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest block mb-2" }, "Litoral Carioca Completo"),
                        React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4" }, "Las Playas de R\u00EDo"),
                        React.createElement("p", { className: "text-slate-600 text-base" }, "Descubre la personalidad, atractivos, ubicaci\u00F3n exacta e im\u00E1genes de cada una de las playas de la Ciudad Maravillosa.")),
                    React.createElement("div", { className: "space-y-12" }, PLAYAS_DETALLADAS_DATA.map((playa) => (React.createElement("div", { id: `ernestinho-entity-${playa.id}`, "data-ernestinho-entity": playa.id, key: playa.id, className: "bg-white rounded-3xl overflow-hidden  border border-slate-100 p-6 sm:p-8 space-y-6 scroll-mt-24" },
                        React.createElement("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-wider block mb-1" }, playa.tag),
                                React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900" }, playa.nombre)),
                            React.createElement("div", { className: "flex items-center gap-3 shrink-0" },
                                playa.videoUrl && (React.createElement("a", { href: playa.videoUrl, target: "_blank", rel: "noopener noreferrer", className: "bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2 px-4 rounded-full flex items-center gap-1.5  transition-transform hover:scale-105" },
                                    React.createElement(Icon, { name: "video", className: "w-4 h-4" }),
                                    React.createElement("span", null, "Ver Video"))),
                                playa.mapUrl && (React.createElement("a", { href: playa.mapUrl, target: "_blank", rel: "noopener noreferrer", className: "bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-4 rounded-full flex items-center gap-1.5  transition-transform hover:scale-105" },
                                    React.createElement(Icon, { name: "map-pin", className: "w-4 h-4" }),
                                    React.createElement("span", null, "Google Maps"))))),
                        React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, playa.imagenes.map((imgUrl, i) => (React.createElement("div", { key: i, className: "h-56 sm:h-64 rounded-2xl overflow-hidden  border border-slate-100" },
                            React.createElement("img", { src: imgUrl, alt: `${playa.nombre} foto ${i + 1}`, className: "w-full h-full object-cover hover:scale-105 transition-transform duration-500" }))))),
                        React.createElement("div", { className: "space-y-4" },
                            React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed font-medium" }, playa.descripcion),
                            React.createElement("div", { className: "bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2" },
                                React.createElement("span", { className: "font-bold text-xs text-slate-900 uppercase block mb-2" }, "Lo que debes saber de esta playa:"),
                                React.createElement("ul", { className: "space-y-2" }, playa.detalles.map((det, indexDet) => (React.createElement("li", { key: indexDet, className: "text-xs sm:text-sm text-slate-600 flex items-start gap-2 leading-relaxed" },
                                    React.createElement("span", { className: "text-teal-600 shrink-0 font-bold" }, "\u2022"),
                                    React.createElement("span", null, det)))))))))))))),
            seccionActual === 'compras' && React.createElement(ComprasCompletas, { go: setSeccionActual }),
            seccionActual === 'copa_para_mi' && (React.createElement(React.Fragment, null,
                React.createElement(CopacabanaMasterSystems, { go: setSeccionActual }),
                React.createElement(CopacabanaMaster3Editorial, null),
                React.createElement(CopacabanaParaMi, null))),
            seccionActual === 'rio_mes_a_mes' && React.createElement(ECLazyRoute,{src:'/assets/chunks/master3-month-weather-planner.js?v=20260922',name:'Master3MonthWeatherPlanner',componentProps:{ lang: lang }}),
            seccionActual === 'barrios' && React.createElement(BarriosBeta23Embed, { go: setSeccionActual }),
            seccionActual === 'hospedaje' && (React.createElement("section", { className: "py-12 bg-slate-50" },
                React.createElement("div", { className: "max-w-4xl mx-auto px-4 sm:px-6" },
                    React.createElement("div", { className: "text-center max-w-3xl mx-auto mb-12" },
                        React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest block mb-2" }, "Gu\u00EDa de alojamiento en R\u00EDo"),
                        React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight mb-6" }, "\u00BFD\u00D3NDE ALOJARSE EN R\u00CDO DE JANEIRO?"),
                        React.createElement("p", { className: "text-slate-700 text-base sm:text-lg leading-relaxed font-normal" }, "\u201CR\u00EDo de Janeiro es una ciudad enorme y elegir bien d\u00F3nde dormir puede cambiar completamente tu experiencia. Si es tu primer viaje, mi recomendaci\u00F3n es buscar un lugar que combine buena ubicaci\u00F3n, transporte, comercio, restaurantes y facilidad para llegar a los principales puntos tur\u00EDsticos.\u201D"),
                        React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed font-normal mt-4" }, "\u201CHay muchas zonas donde puedes hospedarte. Aqu\u00ED combinamos orientaci\u00F3n por barrios, nuestros apartamentos en Copacabana y, cuando est\u00E9 activo el afiliado, enlaces de hoteles para comparar sin salir de la gu\u00EDa.\u201D")),
                    React.createElement("div", { className: "bg-slate-950 text-white rounded-[2rem] overflow-hidden mb-12 " },
                        React.createElement("div", { className: "grid lg:grid-cols-2" },
                            React.createElement("div", { className: "p-7 sm:p-10 flex flex-col justify-center" },
                                React.createElement("span", { className: "text-amber-400 text-xs font-black uppercase tracking-[.22em]" }, hospedajeText("Hospedaje Ernestinho", "Hospedagem Ernestinho", "Ernestinho Stays")),
                                React.createElement("h2", { className: "text-3xl sm:text-4xl font-black uppercase mt-3" }, hospedajeText("Encuentra tu lugar en R\u00EDo", "Encontre seu lugar no Rio", "Find your place in Rio")),
                                React.createElement("p", { className: "text-slate-300 leading-relaxed mt-5" }, hospedajeText("Conoce nuestros apartamentos y casas mediante fotograf\u00EDas reales, galer\u00EDas completas y servicios confirmados. Hay alternativas para parejas, familias y grupos en Copacabana e Ilha da Gig\u00F3ia.", "Conhe\u00E7a nossos apartamentos e casas por meio de fotos reais, galerias completas e comodidades confirmadas. H\u00E1 op\u00E7\u00F5es para casais, fam\u00EDlias e grupos em Copacabana e na Ilha da Gig\u00F3ia.", "Explore our apartments and houses through real photos, complete galleries and confirmed amenities. Options are available for couples, families and groups in Copacabana and Ilha da Gig\u00F3ia.")),
                                React.createElement("div", { className: "grid grid-cols-2 gap-3 mt-7 text-xs font-bold" },
                                    React.createElement("span", { className: "bg-white/10 rounded-xl p-3" }, hospedajeText("\u2713 11 alojamientos", "\u2713 11 hospedagens", "\u2713 11 stays")),
                                    React.createElement("span", { className: "bg-white/10 rounded-xl p-3" }, hospedajeText("\u2713 Fotos reales", "\u2713 Fotos reais", "\u2713 Real photos")),
                                    React.createElement("span", { className: "bg-white/10 rounded-xl p-3" }, hospedajeText("\u2713 Parejas y familias", "\u2713 Casais e fam\u00EDlias", "\u2713 Couples and families")),
                                    React.createElement("span", { className: "bg-white/10 rounded-xl p-3" }, hospedajeText("\u2713 Grupos de hasta 7", "\u2713 Grupos de at\u00E9 7", "\u2713 Groups up to 7"))),
                                React.createElement("button", { type: "button", onClick: () => openHospedajeCatalogo(lang), className: "mt-7 inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-full px-6 py-4 text-sm font-black uppercase transition " }, hospedajeText("Ver alojamientos y fotograf\u00EDas", "Ver hospedagens e fotos", "View stays and photos"), " \u2192"),
                                React.createElement("a", { href: hospedajeText("https://wa.me/5521969946938?text=Hola%20Ernestinho%2C%20quiero%20consultar%20disponibilidad%20de%20un%20alojamiento%20en%20R%C3%ADo.%20Fechas%3A%20____%20Hu%C3%A9spedes%3A%20____", "https://wa.me/5521969946938?text=Ol%C3%A1%20Ernestinho%2C%20quero%20consultar%20a%20disponibilidade%20de%20uma%20hospedagem%20no%20Rio.%20Datas%3A%20____%20H%C3%B3spedes%3A%20____", "https://wa.me/5521969946938?text=Hello%20Ernestinho%2C%20I%20would%20like%20to%20check%20accommodation%20availability%20in%20Rio.%20Dates%3A%20____%20Guests%3A%20____"), target: "_blank", rel: "noopener noreferrer", className: "mt-3 inline-flex justify-center border border-emerald-400 text-emerald-300 hover:bg-emerald-400 hover:text-slate-950 rounded-full px-6 py-3 text-xs font-black uppercase transition" }, hospedajeText("Consultar por WhatsApp", "Consultar pelo WhatsApp", "Enquire on WhatsApp"))),
                            React.createElement("div", { className: "min-h-[300px] relative" },
                                React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/v1789732008/FB98FD68-58C9-4E7A-A5D1-EF4F5D9574DB.png", alt: hospedajeText("Apartamento Ernestinho en Copacabana", "Apartamento Ernestinho em Copacabana", "Ernestinho apartment in Copacabana"), className: "absolute inset-0 w-full h-full object-cover" }),
                                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" }),
                                React.createElement("span", { className: "absolute bottom-5 left-5 right-5 bg-white/95 text-slate-900 rounded-2xl p-4 text-xs font-bold" }, hospedajeText("Abre el cat\u00E1logo para comparar capacidades, ubicaciones, servicios y galer\u00EDas completas.", "Abra o cat\u00E1logo para comparar capacidades, localiza\u00E7\u00F5es, comodidades e galerias completas.", "Open the catalogue to compare capacities, locations, amenities and complete galleries."))))),
                    React.createElement("div", { className: "bg-white rounded-[2rem] border border-slate-200 p-7 sm:p-9 mb-12 " },
                        React.createElement("span", { className: "text-[10px] font-black text-blue-700 uppercase tracking-[.22em]" }, "Hoteles en R\u00EDo"),
                        React.createElement("h2", { className: "text-2xl sm:text-3xl font-black mt-2" }, "\u00BFPrefieres hotel? Compara por barrio, no solamente por precio."),
                        React.createElement("p", { className: "text-sm text-slate-600 mt-4 leading-relaxed" }, "Aqu\u00ED incorporaremos nuestros enlaces de Booking cuando el programa de afiliados quede activo. Mientras tanto, esta gu\u00EDa te ayuda a elegir Copacabana, Ipanema, Leblon, Botafogo, Barra u otra zona seg\u00FAn transporte, playa, vida nocturna, familia y presupuesto."),
                        React.createElement("div", { className: "mt-5 inline-flex rounded-full bg-blue-50 text-blue-800 px-4 py-2 text-[10px] font-black" }, "ENLACE DE BOOKING PENDIENTE \u00B7 NO PUBLICAR UNO INVENTADO")),
                    React.createElement("div", { className: "bg-gradient-to-br from-amber-400/20 via-amber-100/50 to-amber-50 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 mb-12 " },
                        React.createElement("div", { className: "flex items-center gap-2 mb-3" },
                            React.createElement("span", { className: "bg-amber-400 text-slate-950 text-xs font-black uppercase px-3 py-1 rounded-full  flex items-center gap-1" }, "\u2B50 CONSEJO GOLD DE ERNESTINHO")),
                        React.createElement("p", { className: "text-slate-800 text-sm sm:text-base leading-relaxed font-semibold italic mb-3" }, "\u201CSi es tu primera vez en R\u00EDo y todav\u00EDa no conoces bien la ciudad, yo priorizar\u00EDa la ubicaci\u00F3n antes que ahorrar unos reales en el alojamiento. Estar cerca del Metro, supermercados, restaurantes, playa y transporte puede hacer que aproveches much\u00EDsimo m\u00E1s tus d\u00EDas.\u201D"),
                        React.createElement("p", { className: "text-slate-700 text-xs sm:text-sm leading-relaxed font-medium" }, "Y recuerda: no necesitas estar frente al mar para estar bien ubicado. Muchas veces una calle a pocas cuadras de la playa puede ofrecer una excelente relaci\u00F3n entre precio y ubicaci\u00F3n.")),
                    React.createElement("div", { className: "space-y-12" },
                        React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden border border-slate-100  p-6 sm:p-8" },
                            React.createElement("div", { className: "flex flex-col md:flex-row gap-6 items-start" },
                                React.createElement("div", { className: "w-full md:w-1/2 h-56 rounded-2xl overflow-hidden shrink-0" },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/v1788448793/COPACABANA.jpg", alt: "Playa de Copacabana con su cal\u00E7ad\u00E3o e imponentes edificios", className: "w-full h-full object-cover" })),
                                React.createElement("div", { className: "w-full md:w-1/2" },
                                    React.createElement("span", { className: "text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1" }, "La opci\u00F3n que m\u00E1s recomiendo para tu primer viaje"),
                                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mb-3 flex items-center gap-2" },
                                        React.createElement("span", null, "1. \uD83C\uDFD6\uFE0F COPACABANA")),
                                    React.createElement("div", { className: "text-slate-600 text-sm leading-relaxed space-y-3" },
                                        React.createElement("p", null, "Copacabana tiene pr\u00E1cticamente todo lo que un turista puede necesitar: playa, restaurantes, bares, supermercados, farmacias, comercio, hoteles y apartamentos de diferentes precios. Adem\u00E1s, tienes varias estaciones de Metro y muchas opciones de transporte para moverte por la ciudad."),
                                        React.createElement("p", null, "Es una zona muy movimentada y tur\u00EDstica, especialmente buena para quienes quieren salir del alojamiento y tener muchas cosas a pocos minutos caminando."),
                                        React.createElement("p", null, "Y algo que muchos viajeros valoran: puedes encontrar desde alojamientos econ\u00F3micos hasta hoteles de mayor categor\u00EDa, por lo que es posible adaptar la zona a diferentes presupuestos."),
                                        React.createElement("button", { onClick: () => setSeccionActual('copa_para_mi'), className: "mt-4 inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-full px-5 py-3  transition-all" }, "\u2764\uFE0F Probar Copacabana para m\u00ED")))),
                            React.createElement("div", { className: "mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6" },
                                React.createElement("div", { className: "bg-slate-50 p-4 rounded-2xl" },
                                    React.createElement("span", { className: "font-bold text-slate-900 text-xs uppercase block mb-2" }, "Para qui\u00E9n recomiendo Copacabana:"),
                                    React.createElement("ul", { className: "text-xs text-slate-600 space-y-1.5 list-disc list-inside" },
                                        React.createElement("li", null, "Primer viaje a R\u00EDo"),
                                        React.createElement("li", null, "Familias"),
                                        React.createElement("li", null, "Parejas"),
                                        React.createElement("li", null, "Turistas latinoamericanos"),
                                        React.createElement("li", null, "Personas que quieren tener todo cerca"),
                                        React.createElement("li", null, "Viajeros que quieren combinar playa + turismo + gastronom\u00EDa"))),
                                React.createElement("div", { className: "bg-amber-50/70 border border-amber-200 p-4 rounded-2xl" },
                                    React.createElement("span", { className: "font-bold text-amber-900 text-xs uppercase block mb-1" }, "\u2B50 CONSEJO GOLD DE ERNESTINHO"),
                                    React.createElement("p", { className: "text-xs text-amber-950 leading-relaxed italic" }, "\u201CSi es tu primera vez en R\u00EDo, Copacabana probablemente ser\u00E1 mi primera recomendaci\u00F3n. No porque sea el \u00FAnico lugar bueno para hospedarse, sino porque te permite tener muchas cosas a mano y comenzar a conocer la ciudad sin complicarte demasiado con los desplazamientos.\u201D")))),
                        React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden border border-slate-100  p-6 sm:p-8" },
                            React.createElement("div", { className: "flex flex-col md:flex-row gap-6 items-start" },
                                React.createElement("div", { className: "w-full md:w-1/2 h-56 rounded-2xl overflow-hidden shrink-0 md:order-2" },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/v1788448796/IPANEMAS12.jpg", alt: "Playa de Ipanema con el morro Dois Irm\u00E3os al fondo", className: "w-full h-full object-cover" })),
                                React.createElement("div", { className: "w-full md:w-1/2 md:order-1" },
                                    React.createElement("span", { className: "text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1" }, "Para quienes buscan un ambiente m\u00E1s sofisticado"),
                                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mb-3 flex items-center gap-2" },
                                        React.createElement("span", null, "2. \uD83C\uDF34 IPANEMA")),
                                    React.createElement("div", { className: "text-slate-600 text-sm leading-relaxed space-y-3" },
                                        React.createElement("p", null, "Ipanema es una de las zonas m\u00E1s famosas y encantadoras de R\u00EDo. Tiene una combinaci\u00F3n espectacular de playa, restaurantes, bares, tiendas, caf\u00E9s y vida nocturna, adem\u00E1s de excelentes conexiones de Metro."),
                                        React.createElement("p", null, "Es una zona un poco m\u00E1s exclusiva y, en general, los precios de hospedaje pueden ser superiores a los de Copacabana. A cambio, tienes un ambiente muy especial y est\u00E1s cerca de lugares como Arpoador, Lagoa y Leblon."),
                                        React.createElement("p", null, "Si te gusta caminar, comer bien, tomar un caf\u00E9, ir a la playa y tener una gran variedad de opciones alrededor, Ipanema es una excelente elecci\u00F3n.")))),
                            React.createElement("div", { className: "mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6" },
                                React.createElement("div", { className: "bg-slate-50 p-4 rounded-2xl" },
                                    React.createElement("span", { className: "font-bold text-slate-900 text-xs uppercase block mb-2" }, "Para qui\u00E9n recomiendo Ipanema:"),
                                    React.createElement("ul", { className: "text-xs text-slate-600 space-y-1.5 list-disc list-inside" },
                                        React.createElement("li", null, "Parejas"),
                                        React.createElement("li", null, "Viajeros que buscan mayor comodidad"),
                                        React.createElement("li", null, "Personas que disfrutan de restaurantes y caf\u00E9s"),
                                        React.createElement("li", null, "Viajeros que quieren estar cerca de Arpoador y Leblon"),
                                        React.createElement("li", null, "Quienes prefieren un ambiente m\u00E1s sofisticado"))),
                                React.createElement("div", { className: "bg-amber-50/70 border border-amber-200 p-4 rounded-2xl" },
                                    React.createElement("span", { className: "font-bold text-amber-900 text-xs uppercase block mb-1" }, "\u2B50 CONSEJO GOLD DE ERNESTINHO"),
                                    React.createElement("p", { className: "text-xs text-amber-950 leading-relaxed italic" }, "\u201CSi encuentras un buen alojamiento en Ipanema a un precio parecido al de Copacabana, yo lo considerar\u00EDa seriamente. La ubicaci\u00F3n es excelente y puedes hacer much\u00EDsimas cosas caminando.\u201D")))),
                        React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden border border-slate-100  p-6 sm:p-8" },
                            React.createElement("div", { className: "flex flex-col md:flex-row gap-6 items-start" },
                                React.createElement("div", { className: "w-full md:w-1/2 h-56 rounded-2xl overflow-hidden shrink-0" },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/v1788448726/BARRADATIJD.jpg", alt: "Vista moderna de la extensa playa de Barra da Tijuca", className: "w-full h-full object-cover" })),
                                React.createElement("div", { className: "w-full md:w-1/2" },
                                    React.createElement("span", { className: "text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1" }, "M\u00E1s espacio, playas enormes y el lado moderno de R\u00EDo"),
                                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mb-3 flex items-center gap-2" },
                                        React.createElement("span", null, "3. \uD83C\uDF0A BARRA DA TIJUCA")),
                                    React.createElement("div", { className: "text-slate-600 text-sm leading-relaxed space-y-3" },
                                        React.createElement("p", null, "Barra da Tijuca es completamente diferente de Copacabana e Ipanema. Es una zona m\u00E1s moderna, con grandes edificios, condominios, centros comerciales, restaurantes y playas enormes."),
                                        React.createElement("p", null, "Es una excelente alternativa para quienes buscan tranquilidad, espacio y alojamientos modernos. Tambi\u00E9n puede ser una buena opci\u00F3n para estad\u00EDas m\u00E1s largas o para quienes ya conocen R\u00EDo y quieren experimentar otra parte de la ciudad."),
                                        React.createElement("div", { className: "bg-rose-50 border-l-4 border-rose-500 p-3 rounded-r-xl text-xs text-rose-900 font-medium" },
                                            React.createElement("strong", null, "PERO OJO:"),
                                            " Su principal inconveniente para un turista que quiere conocer los lugares cl\u00E1sicos de R\u00EDo es la distancia. Cristo Redentor, Pan de Az\u00FAcar, Copacabana, Ipanema, Lapa y otros puntos tur\u00EDsticos quedan m\u00E1s lejos.")))),
                            React.createElement("div", { className: "mt-6 bg-teal-50 border border-teal-200 p-4 rounded-2xl text-xs text-teal-900 leading-relaxed flex items-center gap-3" },
                                React.createElement("span", { className: "text-2xl shrink-0" }, "\uD83D\uDE90"),
                                React.createElement("div", null,
                                    React.createElement("strong", { className: "block font-bold" }, "\u00BFTe est\u00E1s hospedando en Barra?"),
                                    React.createElement("span", null, "No hay problema. En Ernestinho Carioca tambi\u00E9n podemos buscarte en Barra da Tijuca para realizar nuestros tours y experiencias. Puedes entrar en contacto con nosotros para consultar las opciones disponibles."))),
                            React.createElement("div", { className: "mt-6 pt-6 border-t border-slate-100" },
                                React.createElement("span", { className: "font-bold text-slate-900 text-xs uppercase block mb-2" }, "Para qui\u00E9n recomiendo Barra:"),
                                React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600" },
                                    React.createElement("span", { className: "bg-slate-50 p-2 rounded-lg" }, "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67 Familias"),
                                    React.createElement("span", { className: "bg-slate-50 p-2 rounded-lg" }, "\uD83D\uDDD3\uFE0F Estad\u00EDas largas"),
                                    React.createElement("span", { className: "bg-slate-50 p-2 rounded-lg" }, "\uD83E\uDDD8 Personas que buscan tranquilidad"),
                                    React.createElement("span", { className: "bg-slate-50 p-2 rounded-lg" }, "\uD83C\uDFE2 Apartamentos modernos"),
                                    React.createElement("span", { className: "bg-slate-50 p-2 rounded-lg" }, "\uD83D\uDD01 Ya conocen la Zona Sur"),
                                    React.createElement("span", { className: "bg-slate-50 p-2 rounded-lg" }, "\uD83D\uDE97 C\u00F3modos con desplazamientos")))),
                        React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden border border-slate-100  p-6 sm:p-8" },
                            React.createElement("div", { className: "flex flex-col md:flex-row gap-6 items-start" },
                                React.createElement("div", { className: "w-full md:w-1/2 h-56 rounded-2xl overflow-hidden shrink-0 md:order-2" },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/v1788448726/CENTORD.jpg", alt: "Arcos da Lapa y arquitectura hist\u00F3rica del Centro de R\u00EDo", className: "w-full h-full object-cover" })),
                                React.createElement("div", { className: "w-full md:w-1/2 md:order-1" },
                                    React.createElement("span", { className: "text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1" }, "Historia, cultura, bares y vida bohemia"),
                                    React.createElement("h2", { className: "text-2xl font-black text-slate-900 mb-3 flex items-center gap-2" },
                                        React.createElement("span", null, "4. \uD83C\uDFAD CENTRO DE R\u00CDO")),
                                    React.createElement("div", { className: "text-slate-600 text-sm leading-relaxed space-y-3" },
                                        React.createElement("p", null, "El Centro de R\u00EDo es otra experiencia completamente diferente. Aqu\u00ED encuentras edificios hist\u00F3ricos, museos, iglesias, el Teatro Municipal, Lapa, bares, restaurantes y una enorme parte de la historia de la ciudad."),
                                        React.createElement("p", null, "Tambi\u00E9n puede ser una alternativa m\u00E1s econ\u00F3mica en determinados tipos de alojamiento y tiene excelentes conexiones de transporte, incluyendo Metro, VLT y otros medios."),
                                        React.createElement("p", null, "Para quien quiere disfrutar principalmente de la playa y de los barrios de la Zona Sur, puede resultar menos pr\u00E1ctico. Y dependiendo del horario y de la zona, conviene tener m\u00E1s atenci\u00F3n y elegir bien d\u00F3nde y c\u00F3mo desplazarse.")))),
                            React.createElement("div", { className: "mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6" },
                                React.createElement("div", { className: "bg-slate-50 p-4 rounded-2xl" },
                                    React.createElement("span", { className: "font-bold text-slate-900 text-xs uppercase block mb-2" }, "Para qui\u00E9n puede funcionar:"),
                                    React.createElement("ul", { className: "text-xs text-slate-600 space-y-1.5 list-disc list-inside" },
                                        React.createElement("li", null, "J\u00F3venes y grupos de amigos"),
                                        React.createElement("li", null, "Viajeros interesados en historia y cultura"),
                                        React.createElement("li", null, "Personas que buscan vida nocturna en Lapa"),
                                        React.createElement("li", null, "Viajeros con presupuesto m\u00E1s ajustado"),
                                        React.createElement("li", null, "Personas que ya conocen R\u00EDo"))),
                                React.createElement("div", { className: "bg-amber-50/70 border border-amber-200 p-4 rounded-2xl" },
                                    React.createElement("span", { className: "font-bold text-amber-900 text-xs uppercase block mb-1" }, "\u2B50 CONSEJO GOLD DE ERNESTINHO"),
                                    React.createElement("p", { className: "text-xs text-amber-950 leading-relaxed italic" }, "\u201CSi eliges hospedarte en el Centro, yo elegir\u00EDa el alojamiento pensando mucho en la ubicaci\u00F3n exacta y en c\u00F3mo ser\u00E1 tu regreso por la noche. El Centro puede ser incre\u00EDble para vivir la parte hist\u00F3rica y bohemia de R\u00EDo, pero no necesariamente es la opci\u00F3n m\u00E1s pr\u00E1ctica para tu primer viaje si tu prioridad es playa y turismo tradicional.\u201D")))),
                        React.createElement("div", { className: "bg-white rounded-3xl overflow-hidden border border-slate-100  p-6 sm:p-8" },
                            React.createElement("div", { className: "flex flex-col md:flex-row gap-6 items-center" },
                                React.createElement("div", { className: "w-full md:w-1/3 h-48 rounded-2xl overflow-hidden shrink-0" },
                                    React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/v1788389092/aterro_flamengo.jpg", alt: "Paisaje de Botafogo y Flamengo con el Pan de Az\u00FAcar al fondo", className: "w-full h-full object-cover" })),
                                React.createElement("div", { className: "w-full md:w-2/3" },
                                    React.createElement("h2", { className: "text-xl font-black text-slate-900 mb-2" }, "\uD83C\uDF3F OTRAS ZONAS QUE TAMBI\u00C9N PUEDES CONSIDERAR"),
                                    React.createElement("span", { className: "text-xs font-bold text-teal-600 uppercase block mb-3" }, "\u00BFY qu\u00E9 pasa con otros barrios?"),
                                    React.createElement("div", { className: "text-slate-600 text-xs sm:text-sm leading-relaxed space-y-2" },
                                        React.createElement("p", null, "R\u00EDo tiene much\u00EDsimas otras opciones. Flamengo, Botafogo, Leme, Leblon, S\u00E3o Conrado, Recreio dos Bandeirantes y diferentes zonas de la Zona Norte y Zona Oeste pueden funcionar muy bien dependiendo de tu presupuesto, estilo de viaje y lo que quieras hacer."),
                                        React.createElement("p", null, "Por ejemplo, Botafogo y Flamengo pueden ser excelentes alternativas para quienes quieren estar en la Zona Sur, tener buena conexi\u00F3n de transporte y estar cerca de varios puntos tur\u00EDsticos sin necesariamente pagar el precio de las zonas m\u00E1s exclusivas."),
                                        React.createElement("p", { className: "font-semibold text-slate-800 pt-1" }, "No existe un \u00FAnico barrio perfecto para todo el mundo. El mejor lugar para hospedarte depende de lo que quieras hacer durante tu viaje.")))))),
                    React.createElement("div", { className: "mt-14 bg-slate-900 text-white rounded-3xl p-8 sm:p-10  border border-slate-800 text-center" },
                        React.createElement("span", { className: "bg-amber-400 text-slate-950 font-black text-xs uppercase px-4 py-1.5 rounded-full inline-block mb-4 " }, "\uD83C\uDFC6 RESUMEN R\u00C1PIDO"),
                        React.createElement("h3", { className: "text-2xl font-black uppercase mb-6 tracking-tight" }, "\u00BFCU\u00C1L ELEGIR\u00CDA ERNESTINHO?"),
                        React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto mb-8" },
                            React.createElement("div", { className: "bg-slate-800/80 p-4 rounded-2xl border border-slate-700" },
                                React.createElement("span", { className: "text-lg block mb-1" }, "\uD83C\uDFD6\uFE0F Primera vez en R\u00EDo"),
                                React.createElement("strong", { className: "text-amber-400 font-extrabold text-sm block" }, "Copacabana")),
                            React.createElement("div", { className: "bg-slate-800/80 p-4 rounded-2xl border border-slate-700" },
                                React.createElement("span", { className: "text-lg block mb-1" }, "\uD83C\uDF34 M\u00E1s sofisticado"),
                                React.createElement("strong", { className: "text-amber-400 font-extrabold text-sm block" }, "Ipanema")),
                            React.createElement("div", { className: "bg-slate-800/80 p-4 rounded-2xl border border-slate-700" },
                                React.createElement("span", { className: "text-lg block mb-1" }, "\uD83C\uDF0A Moderno y tranquilo"),
                                React.createElement("strong", { className: "text-amber-400 font-extrabold text-sm block" }, "Barra da Tijuca")),
                            React.createElement("div", { className: "bg-slate-800/80 p-4 rounded-2xl border border-slate-700" },
                                React.createElement("span", { className: "text-lg block mb-1" }, "\uD83C\uDFAD Cultura, bares y ambiente bohemio"),
                                React.createElement("strong", { className: "text-amber-400 font-extrabold text-sm block" }, "Centro")),
                            React.createElement("div", { className: "bg-slate-800/80 p-4 rounded-2xl border border-slate-700 sm:col-span-2 md:col-span-2" },
                                React.createElement("span", { className: "text-lg block mb-1" }, "\uD83C\uDF3F Alternativa equilibrada"),
                                React.createElement("strong", { className: "text-amber-400 font-extrabold text-sm block" }, "Botafogo / Flamengo"))),
                        React.createElement("p", { className: "text-sm sm:text-base text-slate-300 font-light italic mb-8 max-w-2xl mx-auto leading-relaxed" }, "\u201CSi me preguntas d\u00F3nde me quedar\u00EDa para mi primer viaje a R\u00EDo, probablemente elegir\u00EDa Copacabana o Ipanema. Pero si me cuentas tu presupuesto, cu\u00E1ntos d\u00EDas vienes y qu\u00E9 quieres conocer, puedo ayudarte a elegir la zona que mejor combina contigo.\u201D"),
                        React.createElement("a", { href: "https://wa.me/5521969946938?text=Hola%20Ernestinho,%20necesito%20ayuda%20para%20elegir%20mi%20alojamiento%20en%20R%C3%ADo", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase py-4 px-8 rounded-full  transition-transform hover:scale-105" },
                            React.createElement(Icon, { name: "message-circle", className: "w-5 h-5", fill: "#0f172a" }),
                            "Preguntarle a Ernestinho por WhatsApp"))))),
            seccionActual === 'cafe' && (React.createElement("section", { className: "py-12 sm:py-16 bg-white" },
                React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
                    React.createElement("div", { className: "text-center max-w-3xl mx-auto mb-12 sm:mb-16" },
                        React.createElement("span", { className: "inline-block bg-amber-100 text-amber-800 font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4" }, "\u2615 Sabor Artesanal 100% Brasil"),
                        React.createElement("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 uppercase tracking-tight mb-5" },
                            "CAF\u00C9 ",
                            React.createElement("span", { className: "text-amber-500" }, "RIO")),
                        React.createElement("p", { className: "text-xl sm:text-2xl font-light text-slate-700 italic mb-4" }, "El sabor de Brasil, ahora en tu taza."),
                        React.createElement("p", { className: "text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto" }, "Una colecci\u00F3n creada para quienes quieren llevarse un pedacito de R\u00EDo de Janeiro a casa. Cinco sabores especiales, preparados para transformar cada taza en una peque\u00F1a experiencia brasile\u00F1a.")),
                    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7" },
                        React.createElement("div", { className: "group bg-white rounded-3xl overflow-hidden border border-slate-200   transition-all duration-300 hover:-translate-y-1" },
                            React.createElement("div", { className: "relative h-72 overflow-hidden bg-slate-100" },
                                React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/BD8C640A-084E-4B0D-8EFC-12A579E5A43C", alt: "Caf\u00E9 Rio Chocolate Trufado", className: "w-full h-full object-contain bg-[#0b1b1b] group-hover:scale-[1.02] transition-transform duration-500" }),
                                React.createElement("div", { className: "absolute top-4 left-4 bg-amber-400 text-slate-950 font-black text-xs uppercase px-3 py-2 rounded-full " }, "\u2B50 Especial")),
                            React.createElement("div", { className: "p-6" },
                                React.createElement("span", { className: "text-teal-600 font-bold text-[11px] uppercase tracking-widest" }, "Caf\u00E9 aromatizado"),
                                React.createElement("h3", { className: "text-xl font-black text-slate-900 mt-1 mb-3" }, "Chocolate Trufado"),
                                React.createElement("p", { className: "text-slate-500 text-sm leading-relaxed mb-5" }, "Una combinaci\u00F3n intensa y deliciosa que une el aroma del caf\u00E9 brasile\u00F1o con el sabor envolvente del chocolate trufado. Cremoso, arom\u00E1tico y perfecto para quienes disfrutan de un caf\u00E9 con personalidad."),
                                React.createElement("div", { className: "flex items-center justify-between gap-4" },
                                    React.createElement("span", { className: "text-2xl font-black text-slate-900" }, "R$ 35"),
                                    React.createElement("button", { onClick: () => window.open(cafeRioWhatsApp('trufado', 'R$ 35', lang), '_blank'), className: "bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-white font-black text-xs uppercase py-3 px-5 rounded-full transition-all" }, "Comprar \u2615")))),
                        React.createElement("div", { className: "group bg-white rounded-3xl overflow-hidden border border-slate-200   transition-all duration-300 hover:-translate-y-1" },
                            React.createElement("div", { className: "relative h-72 overflow-hidden bg-slate-100" },
                                React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/1765D0E5-FD31-45A8-BE5A-6F73DF411BB0", alt: "Caf\u00E9 Rio 100% Ar\u00E1bico Tradicional", className: "w-full h-full object-contain bg-[#0b1b1b] group-hover:scale-[1.02] transition-transform duration-500" }),
                                React.createElement("div", { className: "absolute top-4 left-4 bg-teal-500 text-white font-black text-xs uppercase px-3 py-2 rounded-full " }, "\u2615 Cl\u00E1sico")),
                            React.createElement("div", { className: "p-6" },
                                React.createElement("span", { className: "text-teal-600 font-bold text-[11px] uppercase tracking-widest" }, "100% Ar\u00E1bica"),
                                React.createElement("h3", { className: "text-xl font-black text-slate-900 mt-1 mb-3" }, "Tradicional"),
                                React.createElement("p", { className: "text-slate-500 text-sm leading-relaxed mb-5" }, "Para los verdaderos amantes del caf\u00E9. Un caf\u00E9 100% ar\u00E1bica de sabor equilibrado, aroma agradable y personalidad brasile\u00F1a. Una opci\u00F3n perfecta para disfrutar todos los d\u00EDas."),
                                React.createElement("div", { className: "flex items-center justify-between gap-4" },
                                    React.createElement("span", { className: "text-2xl font-black text-slate-900" }, "R$ 35"),
                                    React.createElement("button", { onClick: () => window.open(cafeRioWhatsApp('tradicional', 'R$ 35', lang), '_blank'), className: "bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-white font-black text-xs uppercase py-3 px-5 rounded-full transition-all" }, "Comprar \u2615")))),
                        React.createElement("div", { className: "group bg-white rounded-3xl overflow-hidden border border-slate-200   transition-all duration-300 hover:-translate-y-1" },
                            React.createElement("div", { className: "relative h-72 overflow-hidden bg-slate-100" },
                                React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3051", alt: "Caf\u00E9 Rio Chocolate con Menta", className: "w-full h-full object-contain bg-[#0b1b1b] group-hover:scale-[1.02] transition-transform duration-500" }),
                                React.createElement("div", { className: "absolute top-4 left-4 bg-emerald-500 text-white font-black text-xs uppercase px-3 py-2 rounded-full " }, "\uD83C\uDF3F Refrescante")),
                            React.createElement("div", { className: "p-6" },
                                React.createElement("span", { className: "text-teal-600 font-bold text-[11px] uppercase tracking-widest" }, "Caf\u00E9 aromatizado"),
                                React.createElement("h3", { className: "text-xl font-black text-slate-900 mt-1 mb-3" }, "Chocolate con Menta"),
                                React.createElement("p", { className: "text-slate-500 text-sm leading-relaxed mb-5" }, "El encuentro perfecto entre el chocolate y el toque refrescante de la menta. Un caf\u00E9 diferente, arom\u00E1tico y sorprendente, ideal para quienes buscan descubrir nuevos sabores."),
                                React.createElement("div", { className: "flex items-center justify-between gap-4" },
                                    React.createElement("span", { className: "text-2xl font-black text-slate-900" }, "R$ 35"),
                                    React.createElement("button", { onClick: () => window.open(cafeRioWhatsApp('menta', 'R$ 35', lang), '_blank'), className: "bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-white font-black text-xs uppercase py-3 px-5 rounded-full transition-all" }, "Comprar \u2615")))),
                        React.createElement("div", { className: "group bg-white rounded-3xl overflow-hidden border border-slate-200   transition-all duration-300 hover:-translate-y-1" },
                            React.createElement("div", { className: "relative h-72 overflow-hidden bg-slate-100" },
                                React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3050", alt: "Caf\u00E9 Rio con Caramelo", className: "w-full h-full object-contain bg-[#0b1b1b] group-hover:scale-[1.02] transition-transform duration-500" }),
                                React.createElement("div", { className: "absolute top-4 left-4 bg-amber-500 text-white font-black text-xs uppercase px-3 py-2 rounded-full " }, "\uD83C\uDF6F Dulce")),
                            React.createElement("div", { className: "p-6" },
                                React.createElement("span", { className: "text-teal-600 font-bold text-[11px] uppercase tracking-widest" }, "Caf\u00E9 aromatizado"),
                                React.createElement("h3", { className: "text-xl font-black text-slate-900 mt-1 mb-3" }, "Caf\u00E9 con Caramelo"),
                                React.createElement("p", { className: "text-slate-500 text-sm leading-relaxed mb-5" }, "Un caf\u00E9 suave y arom\u00E1tico con deliciosas notas de caramelo. Dulce en la medida justa y perfecto para acompa\u00F1ar una tarde tranquila o comenzar el d\u00EDa con algo especial."),
                                React.createElement("div", { className: "flex items-center justify-between gap-4" },
                                    React.createElement("span", { className: "text-2xl font-black text-slate-900" }, "R$ 35"),
                                    React.createElement("button", { onClick: () => window.open(cafeRioWhatsApp('caramelo', 'R$ 35', lang), '_blank'), className: "bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-white font-black text-xs uppercase py-3 px-5 rounded-full transition-all" }, "Comprar \u2615")))),
                        React.createElement("div", { className: "group bg-white rounded-3xl overflow-hidden border border-slate-200   transition-all duration-300 hover:-translate-y-1" },
                            React.createElement("div", { className: "relative h-72 overflow-hidden bg-slate-100" },
                                React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3049", alt: "Caf\u00E9 Rio Chocolate con Avellanas", className: "w-full h-full object-contain bg-[#0b1b1b] group-hover:scale-[1.02] transition-transform duration-500" }),
                                React.createElement("div", { className: "absolute top-4 left-4 bg-amber-400 text-slate-950 font-black text-xs uppercase px-3 py-2 rounded-full " }, "\uD83C\uDF30 Cremoso")),
                            React.createElement("div", { className: "p-6" },
                                React.createElement("span", { className: "text-teal-600 font-bold text-[11px] uppercase tracking-widest" }, "Caf\u00E9 aromatizado"),
                                React.createElement("h3", { className: "text-xl font-black text-slate-900 mt-1 mb-3" }, "Chocolate con Avellanas"),
                                React.createElement("p", { className: "text-slate-500 text-sm leading-relaxed mb-5" }, "El sabor profundo del chocolate combinado con el delicado aroma de las avellanas. Una mezcla envolvente y sofisticada para convertir una simple taza de caf\u00E9 en un momento especial."),
                                React.createElement("div", { className: "flex items-center justify-between gap-4" },
                                    React.createElement("span", { className: "text-2xl font-black text-slate-900" }, "R$ 35"),
                                    React.createElement("button", { onClick: () => window.open(cafeRioWhatsApp('avellanas', 'R$ 35', lang), '_blank'), className: "bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-white font-black text-xs uppercase py-3 px-5 rounded-full transition-all" }, "Comprar \u2615")))),
                        React.createElement("div", { className: "group bg-slate-950 rounded-3xl overflow-hidden border border-slate-800   transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1" },
                            React.createElement("div", { className: "relative h-72 overflow-hidden" },
                                React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/DF50328D-DB89-4D22-B3BD-F79A8D259FAD", alt: "Colecci\u00F3n Caf\u00E9 Rio Ernestinho de cinco sabores", className: "w-full h-full object-contain bg-[#0b1b1b] group-hover:scale-[1.02] transition-transform duration-500" }),
                                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" }),
                                React.createElement("div", { className: "absolute top-4 left-4 bg-amber-400 text-slate-950 font-black text-xs uppercase px-3 py-2 rounded-full " }, "\uD83C\uDFC6 Colecci\u00F3n")),
                            React.createElement("div", { className: "p-6" },
                                React.createElement("span", { className: "text-amber-400 font-bold text-[11px] uppercase tracking-widest" }, "Los 5 sabores"),
                                React.createElement("h3", { className: "text-xl font-black text-white mt-1 mb-3" }, "Colecci\u00F3n Caf\u00E9 Rio"),
                                React.createElement("p", { className: "text-slate-300 text-sm leading-relaxed mb-5" }, "\u00BFNo quieres elegir solo uno? Ll\u00E9vate la colecci\u00F3n completa y descubre los cinco sabores: Tradicional, Chocolate Trufado, Chocolate con Menta, Caramelo y Chocolate con Avellanas."),
                                React.createElement("div", { className: "flex items-center justify-between gap-4" },
                                    React.createElement("div", null,
                                        React.createElement("span", { className: "text-xs text-slate-400 block line-through" }, "R$ 175"),
                                        React.createElement("span", { className: "text-2xl font-black text-amber-400" }, "R$ 150")),
                                    React.createElement("button", { onClick: () => window.open(cafeRioWhatsApp('coleccion', 'R$ 150', lang, true), '_blank'), className: "bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase py-3 px-5 rounded-full transition-all" }, "Quiero la colecci\u00F3n"))))),
                    React.createElement("div", { className: "mt-14 sm:mt-16 bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-10 text-center " },
                        React.createElement("span", { className: "text-amber-400 text-3xl block mb-3" }, "\u2615 \uD83C\uDDE7\uD83C\uDDF7"),
                        React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-white mb-3" }, "Un pedacito de R\u00EDo en cada taza"),
                        React.createElement("p", { className: "text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed" }, "Ya sea que prefieras un caf\u00E9 tradicional o quieras descubrir sabores diferentes, Caf\u00E9 Rio Ernestinho fue pensado para llevar contigo un poquito de ese aroma, esa energ\u00EDa y ese sabor que hacen tan especial a Brasil."),
                        React.createElement("p", { className: "text-amber-400 font-bold text-xs uppercase tracking-widest mt-5" }, "R\u00EDo de Janeiro desde mi mirada \u2764\uFE0F"))))),
            seccionActual === 'privacidad' && (React.createElement("section", { className: "min-h-screen bg-slate-50 py-12" },
                React.createElement("article", { className: "max-w-4xl mx-auto px-4 sm:px-6" },
                    React.createElement("button", { onClick: volverUnaVista, className: "font-black text-teal-700" }, "\u2190 Volver a la vista anterior"),
                    React.createElement("span", { className: "block mt-10 text-xs font-black uppercase tracking-widest text-teal-700" }, "Informaci\u00F3n del sitio"),
                    React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 mt-3" }, "Privacidad, precios y condiciones"),
                    React.createElement("div", { className: "space-y-5 mt-9" },
                        React.createElement("div", { className: "bg-white rounded-3xl border border-slate-100 p-6" },
                            React.createElement("h2", { className: "text-xl font-black" }, "Informaci\u00F3n orientativa"),
                            React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed mt-3" }, "Los precios, horarios, recorridos, reglas, condiciones clim\u00E1ticas y disponibilidad pueden cambiar sin previo aviso. Confirma siempre la informaci\u00F3n vigente antes de trasladarte, comprar una entrada o reservar.")),
                        React.createElement("div", { className: "bg-white rounded-3xl border border-slate-100 p-6" },
                            React.createElement("h2", { className: "text-xl font-black" }, "Enlaces externos"),
                            React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed mt-3" }, "Los enlaces a mapas, redes sociales, videos, comercios y p\u00E1ginas oficiales pertenecen a terceros. Ernestinho Carioca no controla su disponibilidad, contenido ni pol\u00EDticas.")),
                        React.createElement("div", { className: "bg-white rounded-3xl border border-slate-100 p-6" },
                            React.createElement("h2", { className: "text-xl font-black" }, "Consultas y reservas"),
                            React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed mt-3" }, "Cuando escribes por WhatsApp o completas una consulta, los datos que env\u00EDas se utilizan para responder, cotizar y coordinar el servicio solicitado. No publiques datos sensibles innecesarios en el mensaje inicial.")),
                        React.createElement("div", { className: "bg-white rounded-3xl border border-slate-100 p-6" },
                            React.createElement("h2", { className: "text-xl font-black" }, "Salud, seguridad y documentaci\u00F3n"),
                            React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed mt-3" }, "El contenido de la gu\u00EDa no sustituye indicaciones m\u00E9dicas, legales, migratorias, consulares ni de autoridades. Verifica los requisitos aplicables a tu nacionalidad, edad, ruta y situaci\u00F3n personal.")),
                        React.createElement("div", { className: "bg-amber-50 border-2 border-amber-300 rounded-3xl p-6" },
                            React.createElement("h2", { className: "text-xl font-black text-amber-950" }, "Antes de reservar"),
                            React.createElement("p", { className: "text-sm text-amber-950 leading-relaxed mt-3" }, "Solicita confirmaci\u00F3n escrita del precio final, qu\u00E9 incluye, punto de encuentro, pol\u00EDtica de cancelaci\u00F3n, requisitos y condiciones de la actividad. Las experiencias sujetas al clima pueden ser reprogramadas por seguridad.")))))),
            seccionActual === 'articulo_detalle' && articuloSeleccionado && (React.createElement("article", { className: "py-12 bg-white" },
                React.createElement("div", { className: articuloSeleccionado.id === 'art-1' ? "max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8" : "max-w-4xl mx-auto px-4 sm:px-6" },
                    React.createElement("button", { onClick: volverUnaVista, className: "inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-xs uppercase mb-8 transition-colors" }, "\u2190 Volver a la vista anterior"),
                    React.createElement("span", { className: "bg-teal-100 text-teal-800 text-xs font-bold uppercase px-3 py-1 rounded-full block w-max mb-4" }, articuloSeleccionado.categoria),
                    articuloSeleccionado.id === 'art-electricidad' && (React.createElement("div", { className: "space-y-6" },
                        React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 leading-tight mb-4" }, "Electricidad y adaptadores en Brasil"),
                        React.createElement("p", { className: "text-slate-700 text-base sm:text-lg leading-relaxed" }, "Uno de los datos m\u00E1s \u00FAtiles a tener en cuenta al viajar al exterior es el tipo de enchufes y voltaje de electricidad existentes en el destino elegido. Conocer el padr\u00F3n de enchufes y voltaje en Brasil es fundamental para poder conectar tus equipos el\u00E9ctricos a utilizar durante la estad\u00EDa."),
                        React.createElement("div", { className: "bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4" },
                            React.createElement("h2", { className: "text-2xl font-extrabold text-slate-900" }, "Los enchufes en Brasil"),
                            React.createElement("p", { className: "text-slate-600 text-sm leading-relaxed" }, "Recientemente se ha establecido de manera oficial un tipo \u00FAnico de enchufe y toma corriente en todo el territorio brasile\u00F1o. La toma corriente (hembra) tiene tres orificios (Tipo N)."),
                            React.createElement("div", { className: "rounded-2xl overflow-hidden my-4 border border-slate-200  max-w-md mx-auto" },
                                React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/EE6D1EC3-CDA7-485F-B45E-1564795FD0FE", alt: "Tipo N Enchufe Brasil", className: "w-full h-auto object-cover" })),
                            React.createElement("p", { className: "text-slate-600 text-sm leading-relaxed" }, "El enchufe (macho) puede tener dos o tres clavijas redondas. El modelo difiere de los previamente existentes en Brasil, por lo que en muchos casos coexisten las tomas de corriente antiguas (un orificio redondo y dos clavijas planas) con las nuevas."),
                            React.createElement("p", { className: "text-slate-600 text-sm leading-relaxed" }, "Esta nueva toma de corriente sirve para la mayor\u00EDa de los enchufes de dos clavijas redondas. De no contar con este tipo de enchufe, ser\u00E1 necesario conseguir un adaptador. No obstante, la mayor\u00EDa de los hoteles a\u00FAn conservan ambos tipos de toma de corriente, los antiguos y los nuevos. Quien compre un aparato el\u00E9ctrico en Brasil para llevarlo a su pa\u00EDs, deber\u00E1 comprar un adaptador en caso de que el enchufe tenga tres orificios, ya que ese modelo de toma corriente no est\u00E1 disponible en la mayor\u00EDa de los pa\u00EDses.")),
                        React.createElement("div", { className: "bg-amber-50 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 flex items-start gap-4" },
                            React.createElement("span", { className: "text-3xl shrink-0" }, "\uD83D\uDCA1"),
                            React.createElement("div", null,
                                React.createElement("strong", { className: "text-amber-950 font-bold text-base block mb-1" }, "Dato Pr\u00E1ctico de Ernestinho:"),
                                React.createElement("p", { className: "text-amber-900 text-sm leading-relaxed" },
                                    "Es muy f\u00E1cil encontrar adaptadores en cualquier puesto de calle, farmacia o supermercado en R\u00EDo si tu enchufe es diferente. Los consigues f\u00E1cilmente a partir de los ",
                                    React.createElement("strong", null, "5 a 10 reales (R$ 5 - R$ 10)"),
                                    " dependiendo del sector."))),
                        React.createElement("div", { className: "bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4" },
                            React.createElement("h2", { className: "text-2xl font-extrabold text-slate-900" }, "Voltajes en Brasil"),
                            React.createElement("p", { className: "text-slate-600 text-sm leading-relaxed" }, "En cuanto a los voltajes, no ha habido cambios recientes en su legislaci\u00F3n. Hay dos voltajes coexistentes en Brasil: 220V y 127V (que a los efectos no ofrece diferencias con el de 110V, m\u00E1s familiar para el turista, por lo que suele denominarse con esta cifra). Hay regiones donde se emplean ambos, y otras donde solo est\u00E1 disponible uno u otro voltaje."),
                            React.createElement("p", { className: "text-slate-800 text-sm font-semibold bg-white p-4 rounded-xl border border-slate-200" }, "\u26A1 En los estados de Rio de Janeiro y San Pablo (y en ambas capitales) est\u00E1 m\u00E1s extendido el voltaje de 110V, si bien algunos hoteles tambi\u00E9n cuentan con tomas se\u00F1alizadas de 220V."),
                            React.createElement("div", { className: "rounded-2xl overflow-hidden my-4 border border-slate-200  max-w-lg mx-auto" },
                                React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3139", alt: "Tomacorrientes en R\u00EDo de Janeiro y B\u00FAzios", className: "w-full h-auto object-cover" }))))),
                    articuloSeleccionado.id === 'art-maletas' && (React.createElement("div", { className: "space-y-6" },
                        React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 leading-tight mb-4" }, "Preparando las maletas para R\u00EDo"),
                        React.createElement("p", { className: "text-slate-700 text-base sm:text-lg leading-relaxed" }, "Si bien R\u00EDo de Janeiro es una ciudad con un clima tropical en donde predomina el sol y el calor durante la mayor parte del a\u00F1o, recomendamos revisar el pron\u00F3stico del tiempo antes del viaje, porque la temperatura puede descender puntualmente y durante tu viaje puedes encontrarte con algunos d\u00EDas de lluvia."),
                        React.createElement("div", { className: "rounded-3xl overflow-hidden h-72 sm:h-80 " },
                            React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3135", alt: "Preparando ropa de playa para viajar a R\u00EDo", className: "w-full h-full object-cover" })),
                        React.createElement("div", { className: "bg-teal-50 border border-teal-200 rounded-3xl p-6 sm:p-8 space-y-3" },
                            React.createElement("h2", { className: "text-xl font-bold text-teal-900" }, "\uD83C\uDF27\uFE0F \u00BFLluvia en R\u00EDo? \u00A1No te preocupes!"),
                            React.createElement("p", { className: "text-teal-800 text-sm leading-relaxed" }, "\u00A1Que un par de nubes no arruinen tu viaje! En nuestra aplicaci\u00F3n encontrar\u00E1s un gran n\u00FAmero de actividades de interior pensadas especialmente para d\u00EDas lluviosos: visitas a museos ic\u00F3nicos (como el Museo del Ma\u00F1ana o el MAR en Porto Maravilha), cafeter\u00EDas hist\u00F3ricas como la Confeitaria Colombo, centros culturales en el Centro Hist\u00F3rico, acuario AquaRio, shoppings modernos y paseos gastron\u00F3micos inolvidables.")),
                        React.createElement("div", { className: "bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-4" },
                            React.createElement("h3", { className: "text-lg font-bold text-slate-900" }, "\uD83C\uDF92 Lista de indispensables en tu maleta:"),
                            React.createElement("ul", { className: "text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside" },
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Ropa ligera de algod\u00F3n o lino:"),
                                    " remeras, shorts, vestidos frescos y traje de ba\u00F1o."),
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Calzado c\u00F3modo:"),
                                    " zapatillas respirables para caminar o hacer senderismo y un par de chinelas/havaianas para la playa."),
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Un abrigo liviano o campera rompevientos:"),
                                    " ideal para pasajes con aire acondicionado fuerte o noches frescas en la costa."),
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Piloto o paraguas peque\u00F1o plegable:"),
                                    " s\u00FAper pr\u00E1ctico si te sorprende un chaparr\u00F3n tropical."),
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Protector solar de alto espectro y repelente de insectos:"),
                                    " infaltables tanto en la franja de arena como en las caminatas por la floresta de Tijuca."))))),
                    articuloSeleccionado.id === 'art-vacunas' && (React.createElement("div", { className: "space-y-8" },
                        React.createElement("div", null,
                            React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 leading-tight mb-4" }, "Vacunas para viajar a Brasil"),
                            React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed max-w-4xl" }, "Brasil no exige una vacuna espec\u00EDfica para ingresar al pa\u00EDs, pero eso no significa que todas las regiones tengan el mismo nivel de riesgo. Si vas a viajar por diferentes zonas de Brasil, especialmente hacia \u00E1reas de selva, la recomendaci\u00F3n puede cambiar.")),
                        React.createElement("div", { className: "rounded-3xl overflow-hidden h-64 sm:h-80 " },
                            React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/v1788271105/WhatsApp_Image_2026-09-01_at_10.57.13.jpg", alt: "Campa\u00F1a de vacunaci\u00F3n contra la fiebre amarilla", className: "w-full h-full object-cover" })),
                        React.createElement("div", { className: "bg-amber-50 border-2 border-amber-400 rounded-3xl p-6 sm:p-8" },
                            React.createElement("h2", { className: "text-xl sm:text-2xl font-black text-amber-950 uppercase mb-4" }, "\u00BFES OBLIGATORIA LA VACUNA DE LA FIEBRE AMARILLA PARA ENTRAR A BRASIL?"),
                            React.createElement("p", { className: "text-amber-900 font-extrabold text-lg mb-4" }, "LA RESPUESTA ES: NO."),
                            React.createElement("p", { className: "text-slate-800 text-sm sm:text-base leading-relaxed" },
                                "Actualmente, Brasil ",
                                React.createElement("strong", null, "no exige comprobante de vacunaci\u00F3n para ingresar al pa\u00EDs"),
                                ". Sin embargo, el Ministerio de Salud recomienda que los viajeros mantengan sus vacunas al d\u00EDa y, en determinadas regiones, recomienda especialmente la vacuna contra la fiebre amarilla.")),
                        React.createElement("div", { className: "bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 " },
                            React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "Lo importante antes de viajar"),
                            React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-4" }, "No todo Brasil tiene el mismo riesgo"),
                            React.createElement("div", { className: "space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed" },
                                React.createElement("p", null, "Brasil es enorme y las condiciones sanitarias pueden variar bastante de una regi\u00F3n a otra. Una persona que solamente visita R\u00EDo de Janeiro, por ejemplo, no est\u00E1 haciendo el mismo tipo de viaje que alguien que se interna en zonas de selva o realiza actividades de ecoturismo en el norte del pa\u00EDs."),
                                React.createElement("p", null,
                                    "La vacuna contra la fiebre amarilla est\u00E1 recomendada para residentes y viajeros que se dirigen a ",
                                    React.createElement("strong", null, "\u00E1reas donde existe recomendaci\u00F3n de vacunaci\u00F3n o evidencia de circulaci\u00F3n del virus"),
                                    "."),
                                React.createElement("p", null,
                                    "Por eso, si tu viaje incluye destinos de la regi\u00F3n amaz\u00F3nica, como",
                                    React.createElement("strong", null, " Amazonas"),
                                    ", excursiones por la selva, \u00E1reas rurales o actividades de ecoturismo, conviene revisar espec\u00EDficamente las recomendaciones sanitarias del destino antes de salir."))),
                        React.createElement("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-8" },
                            React.createElement("div", { className: "flex items-start gap-4" },
                                React.createElement("div", { className: "text-3xl" }, "\uD83C\uDF3F"),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-amber-400 font-bold text-xs uppercase tracking-widest mb-2" }, "Especial atenci\u00F3n"),
                                    React.createElement("h2", { className: "text-2xl sm:text-3xl font-black mb-4" }, "\u00BFVas hacia el Amazonas o zonas de selva?"),
                                    React.createElement("p", { className: "text-slate-300 text-sm sm:text-base leading-relaxed" }, "Si dentro de tu itinerario aparecen destinos de la regi\u00F3n amaz\u00F3nica, excursiones por la selva, zonas rurales o actividades de ecoturismo, es especialmente importante comprobar si el destino se encuentra dentro de una zona con recomendaci\u00F3n de vacunaci\u00F3n contra la fiebre amarilla.")))),
                        React.createElement("div", { className: "bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 " },
                            React.createElement("span", { className: "text-teal-600 font-bold text-xs uppercase tracking-widest" }, "Fiebre amarilla"),
                            React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-5" }, "Si est\u00E1 recomendada para tu destino, no la dejes para \u00FAltimo momento"),
                            React.createElement("div", { className: "space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed" },
                                React.createElement("p", null,
                                    "El Ministerio de Salud recomienda que la vacuna se administre",
                                    React.createElement("strong", null, " al menos 10 d\u00EDas antes del viaje"),
                                    ". Ese per\u00EDodo permite que el organismo desarrolle la protecci\u00F3n necesaria."),
                                React.createElement("p", null, "Para la mayor\u00EDa de las personas, una dosis de la vacuna contra la fiebre amarilla proporciona protecci\u00F3n de larga duraci\u00F3n. Las recomendaciones pueden variar seg\u00FAn la edad, antecedentes de vacunaci\u00F3n y condiciones individuales."),
                                React.createElement("p", null, "Si tienes dudas sobre si puedes recibir esta vacuna, lo m\u00E1s prudente es consultar previamente con un profesional de salud o un servicio de vacunaci\u00F3n."))),
                        React.createElement("div", { className: "bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-100" },
                            React.createElement("span", { className: "text-amber-500 font-bold text-xs uppercase tracking-widest" }, "M\u00E1s all\u00E1 de la fiebre amarilla"),
                            React.createElement("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-5" }, "Revisa tambi\u00E9n tus vacunas de rutina"),
                            React.createElement("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed mb-5" }, "Antes de viajar a Brasil, no conviene concentrarse \u00FAnicamente en la fiebre amarilla. Es recomendable viajar con las vacunas correspondientes al calendario habitual actualizadas."),
                            React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3" },
                                React.createElement("div", { className: "bg-white rounded-xl p-4 border border-slate-100" },
                                    React.createElement("span", { className: "text-xl" }, "\uD83D\uDC89"),
                                    React.createElement("p", { className: "font-bold text-slate-800 text-sm mt-2" }, "Sarampi\u00F3n y rub\u00E9ola")),
                                React.createElement("div", { className: "bg-white rounded-xl p-4 border border-slate-100" },
                                    React.createElement("span", { className: "text-xl" }, "\uD83D\uDC89"),
                                    React.createElement("p", { className: "font-bold text-slate-800 text-sm mt-2" }, "Poliomielitis")),
                                React.createElement("div", { className: "bg-white rounded-xl p-4 border border-slate-100" },
                                    React.createElement("span", { className: "text-xl" }, "\uD83D\uDC89"),
                                    React.createElement("p", { className: "font-bold text-slate-800 text-sm mt-2" }, "Difteria y t\u00E9tanos")))),
                        React.createElement("div", { className: "bg-teal-50 border border-teal-200 rounded-3xl p-6 sm:p-8" },
                            React.createElement("div", { className: "flex items-start gap-4" },
                                React.createElement("div", { className: "text-3xl" }, "\uD83D\uDCA1"),
                                React.createElement("div", null,
                                    React.createElement("h2", { className: "text-xl sm:text-2xl font-black text-slate-900 mb-3" }, "Mi consejo antes de hacer la maleta"),
                                    React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed" },
                                        "No mires solamente el pa\u00EDs: mira tu ",
                                        React.createElement("strong", null, "itinerario"),
                                        ". Si vas a quedarte en R\u00EDo de Janeiro y hacer turismo urbano, la situaci\u00F3n es muy diferente de un viaje que incluye Amazonas, selva, zonas rurales o actividades de aventura en \u00E1reas donde existe recomendaci\u00F3n de vacunaci\u00F3n."),
                                    React.createElement("p", { className: "text-slate-700 text-sm sm:text-base leading-relaxed mt-3" }, "Revisa tu carnet de vacunaci\u00F3n con tiempo y, si tu recorrido incluye una zona con recomendaci\u00F3n de vacuna contra la fiebre amarilla, consulta la indicaci\u00F3n correspondiente antes de viajar.")))),
                        React.createElement("div", { className: "border-l-4 border-amber-400 bg-amber-50 rounded-r-2xl p-5" },
                            React.createElement("p", { className: "text-sm text-slate-700 leading-relaxed" },
                                React.createElement("strong", null, "Importante:"),
                                " las recomendaciones sanitarias pueden cambiar seg\u00FAn la situaci\u00F3n epidemiol\u00F3gica y el destino concreto. Antes de viajar, comprueba las indicaciones actualizadas del Ministerio de Salud de Brasil y, cuando corresponda, consulta a un profesional sanitario.")))),
                    articuloSeleccionado.id === 'art-visado' && (React.createElement("div", { className: "space-y-6" },
                        React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 leading-tight mb-4" }, "Visado, Requisitos de Entrada y Aduana"),
                        React.createElement("div", { className: "rounded-3xl overflow-hidden h-64 sm:h-80 " },
                            React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/QmbchFZ1tu5DJ_I21mjy9_jOxyVWNn", alt: "Control de Migraciones", className: "w-full h-full object-cover" })),
                        React.createElement("div", { className: "bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4" },
                            React.createElement("h2", { className: "text-xl font-bold text-slate-900" }, "Requisitos para Ingresar a Brasil"),
                            React.createElement("p", { className: "text-slate-600 text-sm leading-relaxed" }, "Para entrar en territorio brasile\u00F1o es necesario poseer pasaporte vigente (o DNI/C\u00E9dula de Identidad para ciudadanos del MERCOSUR). La obligatoriedad de presentar visa depende de los acuerdos entre Brasil y los diferentes pa\u00EDses. Los ciudadanos de aquellos pa\u00EDses que exigen visa a los brasile\u00F1os necesitan presentar un visado para ingresar al pa\u00EDs."),
                            React.createElement("p", { className: "text-slate-600 text-sm leading-relaxed" }, "La visa para Brasil es aprobada por el Ministerio de Relaciones Exteriores y puede solicitarse en las representaciones que Brasil tiene en el exterior (Embajadas y Consulados). El valor del visado var\u00EDa seg\u00FAn la nacionalidad.")),
                        React.createElement("div", { className: "bg-teal-50 border border-teal-200 rounded-3xl p-6 sm:p-8 space-y-3" },
                            React.createElement("h2", { className: "text-lg font-bold text-teal-900" }, "\u2705 Pa\u00EDses exentos de visado para permanencias menores de 90 d\u00EDas:"),
                            React.createElement("p", { className: "text-teal-950 text-xs sm:text-sm leading-relaxed font-medium" }, "Andorra, Argentina, Austria, Bahamas, Barbados, B\u00E9lgica, Bolivia, Chile, Colombia, Costa Rica, Dinamarca, Ecuador, Finlandia, Francia, Alemania, Grecia, Hungr\u00EDa, Islandia, Irlanda, Israel, Italia, Liechtenstein, Luxemburgo, Malasia, M\u00F3naco, Marruecos, Namibia, Holanda, Noruega, Panam\u00E1, Paraguay, Per\u00FA, Filipinas, Polonia, Portugal, San Marino, Eslovenia, Sud\u00E1frica, Corea del Sur, Malta, Espa\u00F1a, Surinam, Suecia, Suiza, Tailandia, Trinidad & Tobago, Reino Unido, Uruguay, Vaticano y Venezuela.")),
                        React.createElement("div", { className: "rounded-3xl overflow-hidden h-64 sm:h-80 " },
                            React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/aeropuerto", alt: "Aeropuerto y Control Aduanero en Brasil", className: "w-full h-full object-cover" })),
                        React.createElement("div", { className: "bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4" },
                            React.createElement("h2", { className: "text-xl font-bold text-slate-900" }, "\u26A0\uFE0F Extensi\u00F3n de Estancia y Regulaciones Aduaneras"),
                            React.createElement("p", { className: "text-slate-600 text-sm leading-relaxed" },
                                "Corresponde al turista observar los plazos de vencimiento de las visas o permisos de ingreso otorgados en el pasaporte (donde se marca con un sello la fecha de entrada). Si deseas solicitar una extensi\u00F3n, debes acudir a una comisar\u00EDa de la ",
                                React.createElement("strong", null, "Polic\u00EDa Federal (Pol\u00EDcia Federal)"),
                                " antes de que se venza el plazo. De lo contrario, se aplicar\u00E1 una multa al abandonar el pa\u00EDs."),
                            React.createElement("div", { className: "bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-2xl text-rose-900 text-xs sm:text-sm font-medium" },
                                React.createElement("strong", null, "\uD83D\uDEAB Restricciones Aduaneras:"),
                                " Est\u00E1 prohibida la entrada de productos il\u00EDcitos, bebidas brasile\u00F1as y tabaco que hayan sido fabricados para su consumo exclusivo en el exterior. Asimismo, se proh\u00EDbe la posesi\u00F3n e ingreso de alcohol y tabaco a menores de 18 a\u00F1os.")))),
                    articuloSeleccionado.id === 'art-1' && (React.createElement("div", null,
                        React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 leading-tight mb-4" }, "20 Errores que debes evitar s\u00ED o s\u00ED en R\u00EDo de Janeiro"),
                        React.createElement("p", { className: "text-slate-600 text-base sm:text-lg leading-relaxed mb-8 font-normal" }, "\u201CR\u00EDo de Janeiro es una ciudad maravillosa, pero como cualquier gran destino tur\u00EDstico, hay algunos peque\u00F1os detalles que conviene conocer antes de llegar. Estos consejos no son para tener miedo, sino para viajar m\u00E1s tranquilo, disfrutar m\u00E1s y moverte por la ciudad como alguien que ya conoce R\u00EDo.\u201D"),
                        React.createElement("div", { className: "flex items-center gap-4 text-xs text-slate-500 mb-8 border-b border-slate-100 pb-6" },
                            React.createElement("span", null, "Por Ernestinho Carioca"),
                            React.createElement("span", null, "\u2022"),
                            React.createElement("span", null, "Actualizado A\u00F1o 2026"),
                            React.createElement("span", null, "\u2022"),
                            React.createElement("span", null, "8 min lectura")),
                        React.createElement("div", { className: "rounded-3xl overflow-hidden mb-10 h-72 sm:h-96 lg:h-[460px] xl:h-[500px]" },
                            React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/D2EF7B62-593C-477F-B4B4-0CB381E3BCD6", alt: "Vista Panor\u00E1mica de R\u00EDo de Janeiro y Copacabana", className: "w-full h-full object-cover" })),
                        React.createElement("div", { className: "bg-gradient-to-br from-amber-400/20 via-amber-100/50 to-amber-50 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 my-10  relative overflow-hidden" },
                            React.createElement("div", { className: "flex items-center gap-2 mb-3" },
                                React.createElement("span", { className: "bg-amber-400 text-slate-950 text-xs font-black uppercase px-3 py-1 rounded-full  flex items-center gap-1" }, "\u2B50 CONSEJO GOLD DE ERNESTINHO")),
                            React.createElement("p", { className: "text-slate-800 text-sm sm:text-base leading-relaxed font-semibold italic" }, "\u201CLleva una copia digital de tu pasaporte en tu tel\u00E9fono y, siempre que sea posible, guarda el documento f\u00EDsico en la caja fuerte de tu hotel o departamento. Para salir a conocer la ciudad normalmente basta con llevar lo necesario: un poco de efectivo, tu tarjeta y tu celular con las aplicaciones que recomendamos aqu\u00ED en la p\u00E1gina.\u201D")),
                        React.createElement("div", { className: "space-y-6 mt-10" }, LISTA_20_CONSEJOS.map((item, idx) => (React.createElement(React.Fragment, { key: item.num },
                            React.createElement("div", { className: "bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-teal-200 transition-all" },
                                React.createElement("div", { className: "flex items-start gap-4" },
                                    React.createElement("span", { className: "text-2xl sm:text-3xl font-black text-teal-600 bg-teal-50 border border-teal-100 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 " }, item.num),
                                    React.createElement("div", null,
                                        React.createElement("h3", { className: "font-extrabold text-slate-900 text-base sm:text-lg mb-2" }, item.titulo),
                                        React.createElement("p", { className: "text-slate-600 text-xs sm:text-sm leading-relaxed" },
                                            "\u201C",
                                            item.texto,
                                            "\u201D")))),
                            idx === 3 && (React.createElement("div", { className: "my-8 rounded-3xl overflow-hidden h-64 sm:h-80 " },
                                React.createElement("img", { src: "https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/d51f869b-d449-4bdf-8ef6-75503a57b86b", alt: "Turista disfrutando y fotografiando en R\u00EDo de Janeiro", className: "w-full h-full object-cover" }))),
                            idx === 7 && (React.createElement("div", { className: "my-8 rounded-3xl overflow-hidden h-64 sm:h-80 " },
                                React.createElement("img", { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000", alt: "Turistas disfrutando del mar y la playa carioca", className: "w-full h-full object-cover" }))),
                            idx === 11 && (React.createElement("div", { className: "my-8 rounded-3xl overflow-hidden h-64 sm:h-80 " },
                                React.createElement("img", { src: "https://lp-cms-production.imgix.net/features/2018/08/LapaArches_Small1-e7f8fcd01720.jpg?ar=16%3A9&auto=format&fit=crop&q=70&w=1600", alt: "Ambiente nocturno y bebidas en un boteco carioca", className: "w-full h-full object-cover" }))),
                            idx === 15 && (React.createElement("div", { className: "my-8 rounded-3xl overflow-hidden h-64 sm:h-80 " },
                                React.createElement("img", { src: "https://i0.wp.com/diariodotransporte.com.br/wp-content/uploads/2023/12/unnamed-1-1.jpg?fit=1200%2C800&ssl=1", alt: "Movilidad y recorridos por R\u00EDo de Janeiro", className: "w-full h-full object-cover" }))),
                            idx === 18 && (React.createElement("div", { className: "my-8 rounded-3xl overflow-hidden h-64 sm:h-80 " },
                                React.createElement("img", { src: "https://www.viciadaemviajar.com/wp-content/uploads/2014/10/trilha-da-pedra-bonita-topo.jpg", alt: "Vista panor\u00E1mica desde un sendero en las monta\u00F1as de R\u00EDo", className: "w-full h-full object-cover" }))))))),
                        React.createElement("div", { className: "mt-14 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 text-center  border border-slate-800" },
                            React.createElement("span", { className: "bg-amber-400 text-slate-950 font-black text-xs uppercase px-4 py-1.5 rounded-full inline-block mb-4 " }, "EL MEJOR CONSEJO DE ERNESTINHO \u2764\uFE0F"),
                            React.createElement("p", { className: "text-base sm:text-xl font-light text-slate-100 italic mb-6 leading-relaxed" }, "\u201CR\u00EDo no se trata de tener miedo. Se trata de saber d\u00F3nde est\u00E1s, disfrutar con sentido com\u00FAn y dejar espacio para sorprenderte. Despu\u00E9s de conocer estos peque\u00F1os consejos, guarda el celular, ponte unas havaianas y disfruta de la Cidade Maravilhosa.\u201D"),
                            React.createElement("span", { className: "text-amber-400 font-bold text-sm tracking-widest uppercase block" }, "\u201CR\u00EDo de Janeiro desde mi mirada.\u201D")))),
                    React.createElement("div", { className: "mt-12 bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 " },
                        React.createElement("div", null,
                            React.createElement("h3", { className: "text-2xl font-black uppercase" }, "\u00BFQuieres conocer R\u00EDo conmigo?"),
                            React.createElement("p", { className: "text-slate-300 text-sm mt-1" }, "Dise\u00F1amos tu itinerario o te acompa\u00F1o en un tour privado exclusivo.")),
                        React.createElement("a", { href: "https://wa.me/5521969946938?text=Hola%20Ernestinho,%20le\u00ED%20tu%20art\u00EDculo%20y%20quiero%20m\u00E1s%20informaci\u00F3n", target: "_blank", rel: "noopener noreferrer", className: "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase py-4 px-6 rounded-full shrink-0 flex items-center gap-2  transition-transform hover:scale-105" },
                            React.createElement(Icon, { name: "message-circle", className: "w-5 h-5", fill: "#0f172a" }),
                            "HABLAR CON ERNESTINHO POR WHATSAPP")))))),
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
ERNESTINHO_V6_CONTENT.existing.forEach(entry => v6AppendUnique(entry.target, entry.article));
if (!GUIA_TEMAS.some(item => item.id === 'viajar-solo')) {
    GUIA_TEMAS.splice(1, 0, {
        id: 'viajar-solo',
        imagen: 'https://res.cloudinary.com/qa301cbc/image/upload/v1788907305/portada_planificando_el_viaje.png',
        grupo: 'Antes de viajar', icon: '🧭', titulo: 'Viajar solo o sola',
        resumen: 'Barrios, playa, noche, transporte y compañía.'
    });
}
GUIA_INFO['viajar-solo'] = {
    titulo: ERNESTINHO_V6_CONTENT.solo.title,
    intro: ERNESTINHO_V6_CONTENT.solo.intro,
    hero: 'https://res.cloudinary.com/qa301cbc/image/upload/v1788907305/portada_planificando_el_viaje.png',
    heroAlt: 'Planificar un viaje solo o sola a Río de Janeiro',
    consejo: 'Mi consejo es decidir antes dónde dormirás, cómo volverás por la noche y qué harás con tus pertenencias en la playa. Con esa base puedes disfrutar Río con más tranquilidad y libertad.',
    items: v6AsItems(ERNESTINHO_V6_CONTENT.solo),
    links: ERNESTINHO_V6_CONTENT.solo.sources.map((url, index) => [`Fuente oficial V6 ${index + 1}`, url]),
    v6: { slugPropuesto: ERNESTINHO_V6_CONTENT.solo.slug, metaDescription: ERNESTINHO_V6_CONTENT.solo.meta, faqVisible: true }
};
/* V7 — Top 200 consolidado en capítulos editoriales */

V7_CHAPTERS.forEach(entry => { const info = GUIA_INFO[entry.target]; if (!info)
    return; if (!(info.items || []).some(x => x[0] === entry.title))
    info.items = [...(info.items || []), [entry.title, entry.body]]; });
Object.assign(GLOBAL_UI_TRANSLATIONS.pt,window.__EC_T35_105||{});
Object.assign(GLOBAL_UI_TRANSLATIONS.en,window.__EC_T35_106||{});

Object.entries(V7_SOURCE_LINKS).forEach(([target, links]) => { const info = GUIA_INFO[target]; if (!info)
    return; info.links = [...(info.links || [])]; links.forEach(link => { if (!info.links.some(x => x[1] === link[1]))
    info.links.push(link); }); });
Object.assign(GLOBAL_UI_TRANSLATIONS.pt, { 'MOMENTO': 'MOMENTO', 'Ahora': 'Agora', 'Tarde': 'Tarde', 'Noche': 'Noite', 'Noche tarde': 'Noite avançada', '1 hora': '1 hora', '2 horas': '2 horas', 'Hoy completo': 'Dia inteiro', 'opciones compatibles para elegir.': 'opções compatíveis para escolher.', 'El orden cruza zona, interés, perfil, tiempo, momento del día y clima. Si llueve, las opciones exteriores quedan fuera; de noche no aparecen atracciones diurnas.': 'A ordem combina região, interesse, perfil, tempo, momento do dia e clima. Com chuva, opções externas ficam de fora; à noite, atrações diurnas não aparecem.' });
Object.assign(GLOBAL_UI_TRANSLATIONS.en, { 'MOMENTO': 'TIME OF DAY', 'Ahora': 'Now', 'Tarde': 'Afternoon', 'Noche': 'Evening', 'Noche tarde': 'Late night', '1 hora': '1 hour', '2 horas': '2 hours', 'Hoy completo': 'Full day', 'opciones compatibles para elegir.': 'compatible options to choose from.', 'El orden cruza zona, interés, perfil, tiempo, momento del día y clima. Si llueve, las opciones exteriores quedan fuera; de noche no aparecen atracciones diurnas.': 'The ranking combines area, interest, profile, available time, time of day and weather. Outdoor options are excluded in rain; daytime attractions do not appear at night.' });
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
