(function(){
const n=(id,nombre,zona,barrio,tipo,dias,precio,destaque,recomendado=false)=>({id,nombre,zona,barrio,tipo,dias,precio,destaque,recomendado});
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
const GASTRONOMIA_DATA = [...(window.GASTRONOMIA_BASE||[]), ...(window.GASTRONOMIA_EXTRA||[])].map((item, index) => ({
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
    n('boa-praca-noite', 'Boa Praça', 'Ipanema y Leblon', 'Ipanema', 'Música en vivo', ['Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], '$$$', 'Bar abierto y concurrido con música y mesas en la plaza.'),
    n('coisas-de-bamba', 'Coisas de Bamba', 'Copacabana y Leme', 'Copacabana', 'Samba', ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], '$', 'Samba y música brasileña en vivo frente al mar, en pleno Posto 4 de Copacabana.', true),
    n('renascenca', 'Renascença Clube', 'Zona Norte', 'Andaraí', 'Samba', ['Lunes', 'Domingo'], '$', 'Casa histórica de cultura negra y samba; consultar las rodas programadas.', true),
    n('feira-noite', 'Feira de São Cristóvão', 'Zona Norte', 'São Cristóvão', 'Cultura', ['Viernes', 'Sábado', 'Domingo'], '$', 'Forró, comida nordestina y espectáculos durante el fin de semana.', true),
    n('cacique', 'Cacique de Ramos', 'Zona Norte', 'Olaria', 'Samba', ['Domingo'], '$', 'Territorio histórico del samba y el pagode; verificar eventos.'),
    n('quadra-mangueira', 'Quadra da Mangueira', 'Zona Norte', 'Mangueira', 'Samba', ['Viernes', 'Sábado'], '$$', 'Ensayos y eventos de una de las escuelas más emblemáticas.'),
    n('quadra-salgueiro', 'Quadra do Salgueiro', 'Zona Norte', 'Andaraí', 'Samba', ['Sábado'], '$$', 'Ensayos, feijoadas y noches de samba según el calendario.'),
    n('portela', 'Portelão', 'Zona Norte', 'Madureira', 'Samba', ['Viernes', 'Sábado'], '$$', 'Eventos y ensayos de Portela en Madureira.'),
    n('vitrinni', 'Vitrinni Lounge', 'Barra y Recreio', 'Barra da Tijuca', 'Discoteca', ['Jueves', 'Viernes', 'Sábado'], '$$$', 'Lounge y discoteca con programación de DJs y fiestas.'),
    n('all-in', 'All In', 'Barra y Recreio', 'Barra da Tijuca', 'Música en vivo', ['Miércoles', 'Jueves', 'Viernes', 'Sábado'], '$$', 'Bar, bandas y noches temáticas en Jardim Oceânico.'),
    n('bosque-bar', 'Bosque Bar', 'Zona Sul', 'Gávea', 'Discoteca', ['Jueves', 'Viernes', 'Sábado', 'Domingo'], '$
    n('zeca-vogue', 'Bar do Zeca Pagodinho', 'Barra y Recreio', 'Barra da Tijuca', 'Pagode', ['Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], '$$$', 'Pagode, samba y cocina brasileña en Vogue Square.'),
    n('ocya-sunset', 'Ocyá Ilha Primeira', 'Barra y Recreio', 'Ilha Primeira', 'Música en vivo', ['Viernes', 'Sábado', 'Domingo'], '$$$', 'Atardecer, cocina marina y eventos especiales a los que se llega en barco.')
];


const FOTOS_NOCHE_APOYO = ['https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=1000'];
const VIDA_NOCTURNA_CON_FOTOS = VIDA_NOCTURNA_DATA.map((item, index) => ({ ...item,
    img: FOTOS_VIDA_NOCTURNA[item.id] || FOTOS_NOCHE_APOYO[index % FOTOS_NOCHE_APOYO.length],
    mapa: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.nombre + ' ' + item.barrio + ' Rio de Janeiro')}`
}));


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

window.EC_EDITORIAL_DATA={FOTOS_GASTRONOMIA,DIAS_NOCHE,TIPOS_NOCHE,VIDA_NOCTURNA_DATA,FOTOS_NOCHE_APOYO,BARRIOS_DATA,EXPERIENCIAS_DATA};
})();
, 'Bar, DJs y fiestas en la Gávea; confirma la agenda de la noche antes de ir.'),
    n('zeca-vogue', 'Bar do Zeca Pagodinho', 'Barra y Recreio', 'Barra da Tijuca', 'Pagode', ['Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], '$$$', 'Pagode, samba y cocina brasileña en Vogue Square.'),
    n('vogue-square', 'Vogue Square', 'Barra y Recreio', 'Barra da Tijuca', 'Música en vivo', ['Jueves', 'Viernes', 'Sábado'], '$$$', 'Complejo con bares, restaurantes y programación musical.'),
    n('ocya-sunset', 'Ocyá Ilha Primeira', 'Barra y Recreio', 'Ilha Primeira', 'Música en vivo', ['Viernes', 'Sábado', 'Domingo'], '$$$', 'Atardecer, cocina marina y eventos especiales a los que se llega en barco.')
];


const FOTOS_NOCHE_APOYO = ['https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=1000'];
const VIDA_NOCTURNA_CON_FOTOS = VIDA_NOCTURNA_DATA.map((item, index) => ({ ...item,
    img: FOTOS_VIDA_NOCTURNA[item.id] || FOTOS_NOCHE_APOYO[index % FOTOS_NOCHE_APOYO.length],
    mapa: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.nombre + ' ' + item.barrio + ' Rio de Janeiro')}`
}));


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

window.EC_EDITORIAL_DATA={FOTOS_GASTRONOMIA,DIAS_NOCHE,TIPOS_NOCHE,VIDA_NOCTURNA_DATA,FOTOS_NOCHE_APOYO,BARRIOS_DATA,EXPERIENCIAS_DATA};
})();
