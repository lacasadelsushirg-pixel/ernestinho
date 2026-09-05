from pathlib import Path
import re
p=Path('index.html')
s=p.read_text(encoding='utf-8')

def sub(pattern,repl,flags=re.S,count=1):
    global s
    ns,n=re.subn(pattern,repl,s,count=count,flags=flags)
    if n!=count: raise SystemExit(f'Expected {count} replacement(s), got {n}: {pattern[:80]}')
    s=ns

carn="""  {
    id: 'carnaval-experience',
    nombre: 'Carnaval Experience con Ernestinho',
    categoria: 'Carnaval, samba y bastidores',
    subtitulo: 'Entra al barracón de Grande Rio y descubre cómo nace el Carnaval',
    descripcion:'Una inmersión cultural dentro de la Cidade do Samba para conocer por dentro el trabajo de una escuela de samba. El recorrido oficial visita el barracón de Acadêmicos do Grande Rio y combina historia, creación de fantasías y alegorías, interacción con figurinos, samba y una caipirinha de bienvenida.',
    historia:'Carnaval Experience es un programa de turismo cultural conducido por la ONG Pimpolhos da Grande Rio en asociación con su escuela madre, Acadêmicos do Grande Rio. La propuesta funciona durante todo el año y muestra el proceso creativo y humano que existe detrás del desfile, no solamente el espectáculo de los días de Carnaval.',
    experiencia:'En el Tour Regular la experiencia oficial incluye aproximadamente 30 min de visita guiada al barracón, 20 min de exposición sobre samba y desfiles, 20 min para vestir fantasías y fotografiarse, 10 min de caipirinha de bienvenida y 10 min de aula de samba con una passista. También existen modalidades privadas y Premium sujetas a disponibilidad.',
    destaque:'Entrar en un barracón real, ver de cerca cómo se construye el Carnaval, vestirte con una fantasía y aprender pasos de samba con una passista.',
    direccion:'Cidade do Samba — Rua Rivadávia Corrêa, 60, Santo Cristo / Gamboa, Zona Portuaria.',
    horario:'Funcionamiento general: lunes a sábado, 08:00–18:00. Tour Regular: portugués/español 09:30; inglés/portugués 10:00, 14:00 y 16:00; inglés/francés 11:00; inglés/español 16:30. Confirma el horario al reservar porque la operación puede cambiar.',
    valor:'Tour Regular desde R$55 en la web oficial. Ernestinho es socio oficial: compra mediante nuestro enlace y recibe 5% de descuento aplicado por el enlace de socio.',
    edad:'Apto para todas las edades. Niños de 0 a 5 años no pagan; de 6 a 11 años existe categoría de media entrada según las reglas oficiales.',
    duracion:'Aproximadamente 1 h 30 min para el Tour Regular.',
    reserva:'Reserva anticipada recomendada. Compra con el enlace oficial de socio Ernestinho: https://ingressos.carnavalexperience.com.br?ac=UUV6C5E3SX',
    accesibilidad:'La organización informa accesibilidad para sillas de ruedas y cochecitos de bebé. Personas con sensibilidad a olores fuertes o problemas respiratorios deben consultar antes de comprar por el uso de productos químicos industriales en el barracón.',
    comoLlegar:'La estación VLT Cidade do Samba queda frente a la entrada principal. En app de transporte busca Carnaval Experience o Cidade do Samba. El estacionamiento de Rua Rivadávia Corrêa, 60 es pago y no es operado por Carnaval Experience.',
    consejoErnestinho:'Ven con calzado cerrado y participa de verdad: ponte la fantasía y prueba la clase de samba. Las fotografías de preparativos pueden tener restricciones; sigue siempre las indicaciones del guía.',
    aviso:'🎭 SOCIO OFICIAL · 5% DE DESCUENTO comprando por el enlace de Ernestinho. El descuento se aplica mediante el enlace de socio; si el sistema solicita cupón, usa FC5QUN.',
    servicioErnestinho:true,
    mensajeWhatsApp:'Hola Ernestinho, quiero reservar Carnaval Experience con el 5% de descuento de socio oficial. Envíame las opciones y horarios disponibles.',
    miniatura:'https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3083', fotoPrincipal:'https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3055', fotoMedia:'https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto/IMG_3125',
    mapa:'https://www.google.com/maps?q=Carnaval+Experience+Cidade+do+Samba+Rio+de+Janeiro&output=embed', partnerUrl:'https://ingressos.carnavalexperience.com.br?ac=UUV6C5E3SX', partnerLabel:'COMPRAR CON 5% DE DESCUENTO'
  },
"""
sub(r"  \{\n    id: 'carnaval-experience',[\s\S]*?\n  \},\n\n  \{\n    id: 'ilha-fiscal',",carn+"\n  {\n    id: 'ilha-fiscal',")

football="""  {
    id:'partidos-maracana', titulo:'Vivir un partido de fútbol en Río', categoria:'Fútbol en vivo', precio:'Consultar según partido', duracion:'Entre 5 y 7 horas según partido y logística', grupo:'Cupos limitados · sujeto al calendario oficial', encuentro:'Zona de hospedaje o punto confirmado al reservar', miniatura:'https://res.cloudinary.com/qa301cbc/image/upload/v1788447586/e6.jpg', instagram:'https://www.instagram.com/p/DWM2wL0xryM/',
    intro:'El fútbol carioca no se entiende mirando solamente el estadio vacío. Esta experiencia está pensada para vivir un día de partido con acompañamiento, contexto y logística organizada, desde la previa hasta el regreso.',
    parrafos:['Según el calendario podemos trabajar partidos de Flamengo, Fluminense y otros grandes encuentros de Río. Antes de confirmar, verificamos estadio, rival, horario, sector y condiciones reales de venta: nunca prometemos un partido que todavía no esté oficialmente programado.','La experiencia puede incluir entrada para el partido reservado, transporte de ida y vuelta desde la zona acordada, guía especializado y bilingüe, asistencia durante toda la jornada y una previa organizada. El contenido exacto se confirma para cada fecha.','El día del partido lleva documento, poco equipaje y ropa cómoda. No recomendamos llevar objetos de valor innecesarios. Horarios, accesos y objetos permitidos pueden cambiar según el organizador y las autoridades; las instrucciones finales se envían antes de salir.','¿Tour del Maracanã o partido? Son experiencias diferentes: el tour sirve para conocer el estadio y su historia; un partido sirve para sentir la cultura de las torcidas. Si puedes, haz ambos en días distintos.'],
    opciones:['Entrada correspondiente al partido confirmado','Traslado de ida y vuelta cuando forme parte del paquete elegido','Acompañamiento/guía durante la experiencia','Orientación de acceso, sector y punto de encuentro','Previa organizada cuando esté incluida en la fecha','Asistencia para elegir el partido que mejor encaje con tu viaje'],
    imagenes:[['Noche de fútbol en Río','https://res.cloudinary.com/qa301cbc/image/upload/v1788447587/MARACAW.jpg'],['Maracanã por dentro','https://res.cloudinary.com/qa301cbc/image/upload/v1788445343/maracasna1.jpg'],['Historia del Maracanã','https://res.cloudinary.com/qa301cbc/image/upload/v1788445342/maracana2.jpg']]
  },
"""
sub(r"  \{\n    id:'partidos-maracana',[\s\S]*?\n  \},\n  \{\n    id:'pedra-gavea',",football+"  {\n    id:'pedra-gavea',")

utility="""
const COPA_UTIL_SERVICES = [
 {cat:'🛒 Supermercados',items:[['Zona Sul · Bolívar','Av. Nossa Sra. de Copacabana, 936','24 horas','https://www.google.com/maps/search/?api=1&query=Zona+Sul+Copacabana+Bolivar'],['Zona Sul · Siqueira Campos','Av. Nossa Sra. de Copacabana, 595','L–S 06:00–22:00 · D 07:00–20:00','https://www.google.com/maps/search/?api=1&query=Zona+Sul+Copacabana+Siqueira+Campos'],['Pão de Açúcar','Av. Nossa Sra. de Copacabana, 1162','07:00–22:00','https://www.google.com/maps/search/?api=1&query=Pao+de+Acucar+Copacabana+1162'],['Mundial','Rua Siqueira Campos, 71','aprox. 07:30–21:00','https://www.google.com/maps/search/?api=1&query=Supermercado+Mundial+Siqueira+Campos+71']]},
 {cat:'💊 Farmacias',items:[['Droga Raia 24 h','Av. Nossa Sra. de Copacabana, 734','24 horas','https://www.google.com/maps/search/?api=1&query=Droga+Raia+Copacabana+734'],['Drogaria Venancio','Av. Nossa Sra. de Copacabana, 528','aprox. 07:00–23:00','https://www.google.com/maps/search/?api=1&query=Drogaria+Venancio+Copacabana+528'],['Drogarias Pacheco','Av. Nossa Sra. de Copacabana, 1004','aprox. 07:00–22:00','https://www.google.com/maps/search/?api=1&query=Drogarias+Pacheco+Copacabana+1004']]},
 {cat:'🧺 Lavanderias',items:[['5àSec Copacabana','Rua Barata Ribeiro, 379','L–S · confirmar horario del día','https://www.google.com/maps/search/?api=1&query=5asec+Copacabana+Barata+Ribeiro+379'],['OMO Lavanderia','Rua Barata Ribeiro, 424','L–V 08:00–18:00 · S 09:00–13:00','https://www.google.com/maps/search/?api=1&query=OMO+Lavanderia+Copacabana+Barata+Ribeiro+424']]},
 {cat:'🏧 Cajeros',items:[['Banco24Horas · Metrô Cantagalo','Rua Xavier da Silveira, 97','según funcionamiento de la estación','https://www.google.com/maps/search/?api=1&query=Banco+24+Horas+Metro+Cantagalo'],['Banco24Horas · Barata Ribeiro','Rua Barata Ribeiro, 502','confirmar acceso del local','https://www.google.com/maps/search/?api=1&query=Banco+24+Horas+Barata+Ribeiro+502']]},
 {cat:'👮 Policía',items:[['12ª DP · Copacabana','Rua Hilário de Gouveia, 102','Delegacia de Polícia Civil','https://www.google.com/maps/search/?api=1&query=12+DP+Copacabana+Hilario+de+Gouveia+102'],['13ª DP · extremo sur de Copa','Av. Nossa Sra. de Copacabana, 1260','Delegacia de Polícia Civil','https://www.google.com/maps/search/?api=1&query=13+DP+Copacabana+1260']]},
 {cat:'🚻 Baños públicos',items:[['Postos de Salvamento de la orla','Orla de Copacabana','Disponibilidad y horarios pueden variar','https://www.google.com/maps/search/?api=1&query=Posto+de+Salvamento+Copacabana']]},
 {cat:'🐶 Veterinarias',items:[['HV Clínica Veterinária','Rua Barata Ribeiro, 672','confirmar horario antes de ir','https://www.google.com/maps/search/?api=1&query=HV+Clinica+Veterinaria+Copacabana+Barata+Ribeiro+672'],['Cãopacabana','Rua Barata Ribeiro, 740','confirmar horario antes de ir','https://www.google.com/maps/search/?api=1&query=Caopacabana+Barata+Ribeiro+740'],['CAMEV Copacabana','Rua Barão de Ipanema, 32','confirmar horario antes de ir','https://www.google.com/maps/search/?api=1&query=CAMEV+Copacabana+Barão+de+Ipanema+32']]}
];
function CopacabanaUtil(){ const [q,setQ]=useState('Todos'); const cats=['Todos',...COPA_UTIL_SERVICES.map(x=>x.cat)]; const shown=q==='Todos'?COPA_UTIL_SERVICES:COPA_UTIL_SERVICES.filter(x=>x.cat===q); return <div className="mt-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm p-6 sm:p-8"><span className="text-[10px] font-black tracking-widest text-cyan-700">📍 ESTOY EN COPACABANA Y NECESITO…</span><h3 className="text-2xl sm:text-3xl font-black mt-2">La parte práctica del barrio</h3><p className="text-sm text-slate-600 mt-2">Supermercado, farmacia, lavandería, cajero, policía, baño o veterinaria sin perder tiempo buscando. No incluimos tiendas de chip: la guía ofrecerá eSIM.</p><div className="flex gap-2 overflow-x-auto py-4">{cats.map(c=><button key={c} onClick={()=>setQ(c)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-black ${q===c?'bg-cyan-700 text-white':'bg-slate-100'}`}>{c}</button>)}</div><div className="grid md:grid-cols-2 gap-4">{shown.map(g=><article key={g.cat} className="rounded-2xl bg-slate-50 p-5"><h4 className="font-black">{g.cat}</h4><div className="space-y-3 mt-3">{g.items.map(([n,a,h,m])=><div key={n} className="bg-white rounded-xl p-3 border"><strong className="text-sm">{n}</strong><p className="text-[11px] text-slate-500 mt-1">{a}</p><p className="text-[11px] font-bold text-slate-700 mt-1">🕐 {h}</p><a href={m} target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] font-black text-cyan-700 mt-2">ABRIR MAPA ↗</a></div>)}</div></article>)}</div><p className="text-[10px] text-slate-400 mt-4">Los horarios pueden cambiar. Confirma antes de desplazarte, especialmente de noche, domingos y feriados.</p></div> }
"""

# Clean up a duplicate block left by a previous partial run.
first=s.find('const COPA_UTIL_SERVICES = [')
second=s.find('const COPA_UTIL_SERVICES = [', first+1) if first>=0 else -1
if second>=0:
    s=s[:first]+s[second:]

needle="function CopacabanaMasterSystems({go}) {"
if needle not in s: raise SystemExit('CopacabanaMasterSystems anchor missing')
if 'const COPA_UTIL_SERVICES = [' not in s:
    s=s.replace(needle,utility+'\n'+needle,1)

# Ensure exactly one utility panel at the end of CopacabanaMasterSystems.
start=s.find(needle)
end=s.find('\n}\n',start)
if start<0 or end<0: raise SystemExit('CopacabanaMasterSystems bounds missing')
block=s[start:end]
while block.count('<CopacabanaUtil />')>1:
    block=block.replace('<CopacabanaUtil />','',1)
if '<CopacabanaUtil />' not in block:
    pos=block.rfind('</section>')
    if pos<0: raise SystemExit('CopacabanaMasterSystems closing section missing')
    block=block[:pos]+'    <CopacabanaUtil />\n  '+block[pos:]
s=s[:start]+block+s[end:]

# Make existing month-by-month content visible in main navigation.
if "id: 'rio_mes_a_mes'" not in s:
    nav_anchor="{ id: 'guia', label: 'Guía"
    pos=s.find(nav_anchor)
    if pos>=0:
        line_end=s.find('\n',pos)
        s=s[:line_end+1]+"      { id: 'rio_mes_a_mes', label: 'Mes a mes', icon: 'calendar-days' },\n"+s[line_end+1:]

# Ensure section routing exposes existing Rio 365 component when it exists.
route_anchor="case 'grandes_eventos':"
if route_anchor in s and "case 'rio_mes_a_mes':" not in s:
    s=s.replace(route_anchor,"case 'rio_mes_a_mes': return <Rio365 go={go} />;\n      "+route_anchor,1)

# Live sources: point existing client requests at same-origin parsers.
s=s.replace("const INEA_ENDPOINT = null;", "const INEA_ENDPOINT = '/api/inea-balneabilidade';")
s=s.replace("const MARINHA_ENDPOINT = null;", "const MARINHA_ENDPOINT = '/api/marinha-ressaca';")
s=s.replace("Fuente oficial · lectura automática pendiente", "Fuente oficial · lectura automática")
s=s.replace("No pude actualizar INEA. Mantengo el estado como desconocido.", "No pude confirmar el boletín de INEA ahora. Mantengo el estado como desconocido para no mostrar información insegura.")

p.write_text(s,encoding='utf-8')
print('patched',len(s))