(()=>{const add=(key,values)=>{const ui=window.GLOBAL_UI_TRANSLATIONS||window.__ernestinhoRenderUI;if(!ui)return false;ui.pt=ui.pt||{};ui.en=ui.en||{};Object.assign(ui.pt,{"Dinero y conexión":"Dinheiro e conexão","Llegada y movilidad":"Chegada e mobilidade","Planifica tu estancia":"Planeje sua estadia","Planifica según la época":"Planeje conforme a época","Identidad, pasaporte y visa.":"Identidade, passaporte e visto.","Vecindarios, playa, vida nocturna, transporte y compañía.":"Bairros, praia, vida noturna, transporte e companhia.","Autorizaciones y filiación.":"Autorizações e comprovação de parentesco.","Plazos y Policía Federal.":"Prazos e Polícia Federal.","Coberturas, SUS y urgencias.":"Coberturas, SUS e emergências.","Efectivo, tarjetas y cambio.":"Dinheiro em espécie, cartões e câmbio.","Pagos, turistas y seguridad.":"Pagamentos, turistas e segurança.","Conectividad desde que aterrizas.":"Conectividade desde a chegada.","Transporte, mapas, clima y comida.":"Transporte, mapas, clima e comida.","Llegada, transporte y encuentro.":"Chegada, transporte e ponto de encontro.","Novo Rio, Pier Mauá y equipaje.":"Novo Rio, Pier Mauá e bagagem.","Metro, VLT, BRT, trenes, autobuses y barcas.":"Metrô, VLT, BRT, trens, ônibus e barcas.","Cuando tiene sentido, documentos, seguro, peajes y herramienta Rentcars.":"Quando vale a pena, documentos, seguro, pedágios e ferramenta Rentcars.","UPA, hospitales, pérdidas y teléfonos.":"UPA, hospitais, perdas e telefones.","Ayuda consular, pérdidas y contactos oficiales.":"Ajuda consular, perdas e contatos oficiais.","Adultos mayores, PCD y descuentos.":"Pessoas idosas, pessoas com deficiência e descontos.","Barrios, apartamentos Ernestinho y hoteles.":"Bairros, apartamentos Ernestinho e hotéis.","Ropa, lluvia y preparación.":"Roupas, chuva e preparação.","Adaptadores y electricidad.":"Adaptadores e eletricidade.","Clima, temporadas, eventos y qué esperar cada mes.":"Clima, estações, eventos e o que esperar a cada mês.","VER experience →":"VER EXPERIÊNCIA →","COMPRAR CON DESCUENTO →":"COMPRAR COM DESCONTO →","Tours de half a day":"Passeios de meio dia","OPEN →":"ABRIR →","SEE ALL →":"VER TODAS →","VIEW EXPERIENCE →":"VER EXPERIÊNCIA →","BUY WITH DISCOUNT →":"COMPRAR COM DESCONTO →","Todos los derechos reservados.":"Todos os direitos reservados.","Diseñado para viajeros que buscan vivir Río de forma real y auténtica.":"Feito para viajantes que querem viver o Rio de forma real e autêntica.","RÍO DE JANEIRO DESDE MI MIRADA":"RIO DE JANEIRO PELO MEU OLHAR","RÍO DE JANEIRO DESDE MI MIRADA © 2026 Ernestinho Carioca. Todos los derechos reservados.":"RIO DE JANEIRO PELO MEU OLHAR © 2026 Ernestinho Carioca. Todos os direitos reservados.","Ernestinho Carioca en TV":"Ernestinho Carioca na TV","VER experiencia →":"VER EXPERIÊNCIA →","RESERVAR":"RESERVAR"});Object.assign(ui.en,{"Dinero y conexión":"Money & connectivity","Llegada y movilidad":"Arrival & getting around","Planifica tu estancia":"Plan your stay","Planifica según la época":"Plan by season","Identidad, pasaporte y visa.":"ID, passport and visa.","Vecindarios, playa, vida nocturna, transporte y compañía.":"Neighborhoods, beaches, nightlife, transport and company.","Autorizaciones y filiación.":"Consent documents and proof of relationship.","Plazos y Policía Federal.":"Stay limits and Federal Police.","Coberturas, SUS y urgencias.":"Coverage, SUS and urgent care.","Efectivo, tarjetas y cambio.":"Cash, cards and currency exchange.","Pagos, turistas y seguridad.":"Payments, tourists and safety.","Conectividad desde que aterrizas.":"Connectivity from arrival.","Transporte, mapas, clima y comida.":"Transport, maps, weather and food.","Llegada, transporte y encuentro.":"Arrival, transport and meeting point.","Novo Rio, Pier Mauá y equipaje.":"Novo Rio, Pier Mauá and luggage.","Metro, VLT, BRT, trenes, autobuses y barcas.":"Metro, VLT, BRT, trains, buses and ferries.","Cuando tiene sentido, documentos, seguro, peajes y herramienta Rentcars.":"When it makes sense, documents, insurance, tolls and the Rentcars comparison tool.","UPA, hospitales, pérdidas y teléfonos.":"UPA, hospitals, lost belongings and phone numbers.","Ayuda consular, pérdidas y contactos oficiales.":"Consular help, lost documents and official contacts.","Adultos mayores, PCD y descuentos.":"Older adults, people with disabilities and discounts.","Barrios, apartamentos Ernestinho y hoteles.":"Neighborhoods, Ernestinho apartments and hotels.","Ropa, lluvia y preparación.":"Clothing, rain and preparation.","Adaptadores y electricidad.":"Adapters and electricity.","Clima, temporadas, eventos y qué esperar cada mes.":"Weather, seasons, events and what to expect each month.","VER experience →":"VIEW EXPERIENCE →","COMPRAR CON DESCUENTO →":"BUY WITH DISCOUNT →","Tours de half a day":"Half-day tours","taxa marinha":"marine fee","taxa da Marinha":"Navy fee","con almuerzo":"with lunch","OPEN →":"OPEN →","SEE ALL →":"SEE ALL →","VIEW EXPERIENCE →":"VIEW EXPERIENCE →","BUY WITH DISCOUNT →":"BUY WITH DISCOUNT →","Todos los derechos reservados.":"All rights reserved.","Diseñado para viajeros que buscan vivir Río de forma real y auténtica.":"Made for travelers who want to experience Rio in a real and authentic way.","RÍO DE JANEIRO DESDE MI MIRADA":"RIO DE JANEIRO THROUGH MY EYES","RÍO DE JANEIRO DESDE MI MIRADA © 2026 Ernestinho Carioca. Todos los derechos reservados.":"RIO DE JANEIRO THROUGH MY EYES © 2026 Ernestinho Carioca. All rights reserved.","Ernestinho Carioca en TV":"Ernestinho Carioca on TV","RESERVAR":"BOOK"});Object.assign(ui.pt,{
"Río de Janeiro desde mi mirada":"Rio de Janeiro pelo meu olhar",
"Ernestinho Carioca. Todos los derechos reservados.":"Ernestinho Carioca. Todos os direitos reservados.",
"CONOCE A ERNESTINHO":"CONHEÇA O ERNESTINHO",
"Ernestinho en TV":"Ernestinho na TV",
"Reportajes, entrevistas y programas de Chile, Argentina y otros medios.":"Reportagens, entrevistas e programas do Chile, da Argentina e de outros veículos.",
"SOCIO AFILIADO · RESERVA ONLINE":"PARCEIRO AFILIADO · RESERVA ONLINE",
"City Tour Panorámico Musical Hop-on Hop-off: más de 30 puntos, audioguía, música, Wi-Fi y libertad para subir y bajar. Reserva con el enlace afiliado oficial de Ernestinho Carioca.":"City Tour panorâmico musical Hop-on Hop-off: mais de 30 pontos, audioguia, música, Wi-Fi e liberdade para subir e descer. Reserve pelo link de afiliado oficial do Ernestinho Carioca.",
"taxa marinha":"taxa da Marinha","marine fee":"taxa da Marinha","Navy fee":"taxa da Marinha"
});
Object.assign(ui.en,{
"Río de Janeiro desde mi mirada":"Rio de Janeiro through my eyes",
"Ernestinho Carioca. Todos los derechos reservados.":"Ernestinho Carioca. All rights reserved.",
"CONOCE A ERNESTINHO":"MEET ERNESTINHO",
"Ernestinho en TV":"Ernestinho on TV",
"Reportajes, entrevistas y programas de Chile, Argentina y otros medios.":"Reports, interviews and TV appearances in Chile, Argentina and other media.",
"SOCIO AFILIADO · RESERVA ONLINE":"AFFILIATE PARTNER · BOOK ONLINE",
"City Tour Panorámico Musical Hop-on Hop-off: más de 30 puntos, audioguía, música, Wi-Fi y libertad para subir y bajar. Reserva con el enlace afiliado oficial de Ernestinho Carioca.":"Panoramic musical hop-on hop-off city tour: more than 30 stops, audio guide, music, Wi-Fi, and the freedom to get on and off. Book through Ernestinho Carioca’s official affiliate link.",
"R$200 + taxa da Marinha":"R$200 + Navy fee",
"R$230 + taxa marinha":"R$230 + marine fee",
"DIA INTEIRO R$230 + taxa marinha":"FULL DAY R$230 + marine fee",
"ÁGUAS CRISTALINAS R$200 + taxa da Marinha":"CRYSTAL WATERS R$200 + Navy fee"
});
Object.assign(ui.pt,{
"TOUR GUIADO":"PASSEIO GUIADO",
"Duración:":"Duração:",
"Grupo:":"Grupo:",
"Punto:":"Embarque:",
"VER EXPERIENCIA":"VER EXPERIÊNCIA",
"NUEVAS ACTIVIDADES":"NOVAS ATIVIDADES",
"MÁS FORMAS DE VIVIR RÍO":"MAIS FORMAS DE VIVER O RIO",
"CULTURA & COMUNIDAD":"CULTURA & COMUNIDADE",
"NATURE & SENDERISMO":"NATUREZA & TRILHAS",
"check próxima salida":"consultar próxima saída",
"check según partido":"consultar conforme a partida",
"★ TOUR GUIADO R$430":"★ PASSEIO GUIADO R$430",
"★ TOUR GUIADO R$230 + taxa marinha":"★ PASSEIO GUIADO R$230 + taxa da Marinha",
"★ TOUR GUIADO R$230 / R$250 com almoço":"★ PASSEIO GUIADO R$230 / R$250 com almoço",
"★ TOUR GUIADO R$200 + taxa da Marinha":"★ PASSEIO GUIADO R$200 + taxa da Marinha",
"★ TOUR GUIADO A partir de R$200 + taxa da Marinha":"★ PASSEIO GUIADO A partir de R$200 + taxa da Marinha"
});
Object.assign(ui.en,{
"TOUR GUIADO":"GUIDED TOUR",
"Duración:":"Duration:",
"Grupo:":"Group:",
"Punto:":"Pickup:",
"VER EXPERIENCIA":"VIEW EXPERIENCE",
"NUEVAS ACTIVIDADES":"NEW ACTIVITIES",
"MÁS FORMAS DE VIVIR RÍO":"MORE WAYS TO EXPERIENCE RIO",
"CULTURA & COMUNIDAD":"CULTURE & COMMUNITY",
"NATURE & SENDERISMO":"NATURE & HIKING",
"check próxima salida":"check next departure",
"check según partido":"check match schedule",
"★ TOUR GUIADO R$430":"★ GUIDED TOUR R$430",
"★ TOUR GUIADO R$230 + taxa marinha":"★ GUIDED TOUR R$230 + marine fee",
"★ TOUR GUIADO R$230 / R$250 com almoço":"★ GUIDED TOUR R$230 / R$250 with lunch",
"★ TOUR GUIADO R$200 + taxa da Marinha":"★ GUIDED TOUR R$200 + Navy fee",
"★ TOUR GUIADO A partir de R$200 + taxa da Marinha":"★ GUIDED TOUR From R$200 + Navy fee"
});
Object.assign(ui.pt,{
"★ Tour Guiado":"★ Passeio Guiado",
"⏱️ Duración:":"⏱️ Duração:",
"👥 Grupo:":"👥 Grupo:",
"📍 Punto:":"📍 Ponto:",
"👁️ Ver Experiencia":"👁️ Ver Experiência",
"Nuevas actividades":"Novas atividades",
"Más formas de vivir Río":"Mais formas de viver o Rio",
"culture & comunidad":"cultura & comunidade",
"nature & senderismo":"natureza & trilhas"
});
Object.assign(ui.en,{
"★ Tour Guiado":"★ Guided Tour",
"⏱️ Duración:":"⏱️ Duration:",
"👥 Grupo:":"👥 Group:",
"📍 Punto:":"📍 Pickup:",
"👁️ Ver Experiencia":"👁️ View Experience",
"Nuevas actividades":"New activities",
"Más formas de vivir Río":"More ways to experience Rio",
"culture & comunidad":"culture & community",
"nature & senderismo":"nature & hiking"
});
window.__ernestinhoNormCache={pt:null,en:null};return true};let n=0;const run=()=>{if(add()&&typeof window.__ernestinhoApplyLanguage==="function")window.__ernestinhoApplyLanguage();else if(n++<40)setTimeout(run,50)};run();})();