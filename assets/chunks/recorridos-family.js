function ErnestinhoRoutesV1({go,lang='es'}){
 const h=React.createElement;
 const [q,setQ]=React.useState('');
 const [zone,setZone]=React.useState('ALL');
 const [access,setAccess]=React.useState('ALL');
 const [selected,setSelected]=React.useState(null);
 const [mode,setMode]=React.useState('catalog');
 const [stopIndex,setStopIndex]=React.useState(0);
 const [showMap,setShowMap]=React.useState(false);
 const [geo,setGeo]=React.useState(null);
 const t={
  es:{back:'← VOLVER',eyebrow:'🧭 RECORRIDOS ERNESTINHO · PROTOTIPO V1',title:'Río a tu ritmo.',sub:'No son solo audioguías: son rutas pensadas para que sepas por dónde empezar, cuánto caminar, cuándo cortar y qué hacer si cambia el plan.',search:'Buscar barrio, tema o recorrido',featured:'PILOTOS MÁS AVANZADOS',all:'CATÁLOGO INVESTIGADO',start:'INICIAR RECORRIDO',details:'VER RECORRIDO',map:'ABRIR MAPA',hideMap:'CERRAR MAPA',loc:'USAR MI UBICACIÓN',saved:'Progreso guardado en este dispositivo',next:'SIGUIENTE →',prev:'← ANTERIOR',finish:'FINALIZAR',food:'PARADA PARA COMER',audio:'AUDIO',empty:'No encontré rutas con esos filtros.'},
  pt:{back:'← VOLTAR',eyebrow:'🧭 ROTEIROS ERNESTINHO · PROTÓTIPO V1',title:'Rio no seu ritmo.',sub:'Não são apenas audioguias: são roteiros pensados para você saber onde começar, quanto caminhar, quando encurtar e o que fazer se o plano mudar.',search:'Buscar bairro, tema ou roteiro',featured:'PILOTOS MAIS AVANÇADOS',all:'CATÁLOGO PESQUISADO',start:'INICIAR ROTEIRO',details:'VER ROTEIRO',map:'ABRIR MAPA',hideMap:'FECHAR MAPA',loc:'USAR MINHA LOCALIZAÇÃO',saved:'Progresso salvo neste dispositivo',next:'PRÓXIMA →',prev:'← ANTERIOR',finish:'FINALIZAR',food:'PARADA PARA COMER',audio:'ÁUDIO',empty:'Não encontrei roteiros com esses filtros.'},
  en:{back:'← BACK',eyebrow:'🧭 ERNESTINHO ROUTES · V1 PROTOTYPE',title:'Rio at your pace.',sub:'More than audio guides: practical routes that tell you where to start, how much to walk, when to stop early and what to do if the plan changes.',search:'Search area, theme or route',featured:'MOST ADVANCED PILOTS',all:'RESEARCHED CATALOG',start:'START ROUTE',details:'VIEW ROUTE',map:'OPEN MAP',hideMap:'CLOSE MAP',loc:'USE MY LOCATION',saved:'Progress saved on this device',next:'NEXT →',prev:'← PREVIOUS',finish:'FINISH',food:'FOOD STOP',audio:'AUDIO',empty:'No routes found with those filters.'}
 }[lang]||null;
 const norm=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const zones=['ALL',...Array.from(new Set(window.ERNESTINHO_ROUTES_V1.map(r=>r.zone)))];
 const filtered=window.ERNESTINHO_ROUTES_V1.filter(r=>{
  const txt=norm([r.title,r.subtitle,r.zone,...(r.neighborhoods||[]),...(r.theme||[])].join(' '));
  return (!q||txt.includes(norm(q)))&&(zone==='ALL'||r.zone===zone)&&(access==='ALL'||r.accessType===access);
 }).sort((a,b)=>(b.priority||0)-(a.priority||0));
 const cover=r=>r.cover||'https://res.cloudinary.com/qa301cbc/image/upload/v1788907301/portada_que_hago_hoy.png';
 const open=r=>{setSelected(r);setMode('detail');setStopIndex(0);setShowMap(false);window.scrollTo(0,0);};
 const startRoute=r=>{setSelected(r);setMode('walk');let saved=0;try{saved=Number(localStorage.getItem('ernestinho-route-'+r.routeId)||0)||0;}catch(e){}setStopIndex(Math.min(saved,Math.max(0,(r.stops||[]).length-1)));setShowMap(false);window.scrollTo(0,0);};
 const save=(r,i)=>{setStopIndex(i);try{localStorage.setItem('ernestinho-route-'+r.routeId,String(i));}catch(e){}};
 const useGeo=()=>{if(!navigator.geolocation)return setGeo('UNAVAILABLE');navigator.geolocation.getCurrentPosition(p=>setGeo({lat:p.coords.latitude,lng:p.coords.longitude}),()=>setGeo('DENIED'),{enableHighAccuracy:false,timeout:8000,maximumAge:600000});};
 const accessBadge=r=>r.accessType==='FREE'?(lang==='pt'?'GRÁTIS':lang==='en'?'FREE':'GRATIS'):r.accessType==='PREMIUM'?'PREMIUM':(lang==='pt'?'HÍBRIDO':lang==='en'?'HYBRID':'HÍBRIDO');
 const Card=({r})=>h('article',{className:'rounded-[1.6rem] bg-white border border-slate-200  overflow-hidden flex flex-col'},
  h('div',{className:'h-48 bg-slate-200 overflow-hidden relative'},
   h('img',{src:cover(r),alt:r.title,loading:'lazy',decoding:'async',className:'w-full h-full object-cover',onError:e=>{e.currentTarget.style.display='none';}}),
   h('div',{className:'absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-950/90 to-transparent text-white'},
    h('div',{className:'flex flex-wrap gap-2'},h('span',{className:'rounded-full bg-white/15 backdrop-blur px-2 py-1 text-[9px] font-black'},accessBadge(r)),h('span',{className:'rounded-full bg-white/15 backdrop-blur px-2 py-1 text-[9px] font-black'},r.zone||'Río')))),
  h('div',{className:'p-5 flex flex-col flex-1'},
   h('h3',{className:'text-xl font-black'},r.title),
   h('p',{className:'text-sm text-slate-500 mt-2'},r.subtitle||''),
   h('div',{className:'grid grid-cols-3 gap-2 mt-4 text-center'},
    h('div',{className:'rounded-xl bg-slate-50 p-2'},h('b',{className:'block text-xs'},erRouteFmt(r.durationMin,lang)),h('span',{className:'text-[9px] text-slate-500'},'Duración')),
    h('div',{className:'rounded-xl bg-slate-50 p-2'},h('b',{className:'block text-xs'},r.distanceKm?String(r.distanceKm)+' km':'—'),h('span',{className:'text-[9px] text-slate-500'},'Distancia')),
    h('div',{className:'rounded-xl bg-slate-50 p-2'},h('b',{className:'block text-xs'},String((r.stops||[]).length)),h('span',{className:'text-[9px] text-slate-500'},'Paradas'))),
   h('button',{onClick:()=>open(r),className:'mt-5 rounded-xl bg-slate-950 text-white px-4 py-3 text-xs font-black'},t.details)));
 if(mode==='walk'&&selected){
  const r=selected,s=(r.stops||[])[stopIndex];
  if(!s)return h('div',{className:'min-h-screen p-6'},h('button',{onClick:()=>setMode('detail')},t.back),h('p',{className:'mt-8'},'CONTENT_PENDING'));
  return h('div',{className:'min-h-screen bg-slate-950 text-white pb-28'},
   h('header',{className:'sticky top-0 z-20 bg-slate-950/95 backdrop-blur border-b border-white/10 p-4'},h('div',{className:'max-w-xl mx-auto flex items-center justify-between gap-3'},h('button',{onClick:()=>setMode('detail'),className:'text-xs font-black'},'← '+r.title),h('span',{className:'text-xs font-black text-emerald-300'},'Parada '+(stopIndex+1)+' / '+(r.stops||[]).length))),
   h('main',{className:'max-w-xl mx-auto p-4'},
    h('div',{className:'rounded-[2rem] overflow-hidden bg-white/10'},
     h('img',{src:cover(r),alt:s.name,loading:'eager',decoding:'async',className:'w-full h-60 object-cover'}),
     h('div',{className:'p-6'},
      h('div',{className:'text-[10px] font-black text-emerald-300'},s.kicker||''),
      h('h1',{className:'text-3xl font-black mt-2'},s.name||('Parada '+(stopIndex+1))),
      h('p',{className:'text-base text-white/80 mt-4 leading-relaxed'},s.body||''),
      s.foodStop&&h('div',{className:'mt-4 rounded-2xl bg-amber-300 text-slate-950 p-4 text-sm font-black'},'🍴 '+t.food+' · GASTRONOMÍA INTELLIGENCE PENDIENTE'),
      h('div',{className:'mt-5 rounded-2xl border border-white/15 p-4'},h('div',{className:'font-black text-sm'},'🎧 '+t.audio),h('p',{className:'text-xs text-white/60 mt-1'},'La arquitectura está lista; esta fase no finge audios terminados.')),
      h('div',{className:'grid grid-cols-2 gap-3 mt-5'},h('button',{onClick:()=>setShowMap(!showMap),className:'rounded-xl bg-white text-slate-950 px-4 py-3 text-xs font-black'},showMap?t.hideMap:t.map),h('button',{onClick:useGeo,className:'rounded-xl border border-white/30 px-4 py-3 text-xs font-black'},t.loc)),
      geo&&h('p',{className:'mt-2 text-[10px] text-white/60'},typeof geo==='object'?'Ubicación autorizada solo para esta acción.':'Ubicación no disponible / permiso no otorgado.'),
      showMap&&h('iframe',{title:'Mapa '+(s.name||''),src:'https://www.google.com/maps?q='+encodeURIComponent(s.mapQuery||s.name||r.title)+'&output=embed',loading:'lazy',className:'w-full h-72 rounded-2xl mt-4 border-0'}))),
    h('div',{className:'grid grid-cols-2 gap-3 mt-4'},h('button',{disabled:stopIndex===0,onClick:()=>save(r,Math.max(0,stopIndex-1)),className:'rounded-xl border border-white/20 px-4 py-4 text-sm font-black disabled:opacity-30'},t.prev),stopIndex<(r.stops||[]).length-1?h('button',{onClick:()=>save(r,stopIndex+1),className:'rounded-xl bg-emerald-400 text-slate-950 px-4 py-4 text-sm font-black'},t.next):h('button',{onClick:()=>{save(r,0);setMode('detail');},className:'rounded-xl bg-emerald-400 text-slate-950 px-4 py-4 text-sm font-black'},t.finish)),
    h('p',{className:'text-[10px] text-center text-white/40 mt-3'},t.saved)));
 }
 if(mode==='detail'&&selected){
  const r=selected;
  return h('div',{className:'min-h-screen bg-[#f7f7f4] pb-24'},
   h('header',{className:'max-w-5xl mx-auto px-4 pt-5'},
    h('button',{onClick:()=>setMode('catalog'),className:'text-xs font-black'},t.back),
    h('div',{className:'mt-5 rounded-[2rem] overflow-hidden bg-slate-950 text-white'},
     h('img',{src:cover(r),alt:r.title,loading:'eager',decoding:'async',className:'w-full h-64 sm:h-80 object-cover'}),
     h('div',{className:'p-6 sm:p-8'},h('div',{className:'text-[10px] font-black text-emerald-300'},r.zone+' · '+accessBadge(r)),h('h1',{className:'text-4xl sm:text-5xl font-black mt-2'},r.title),h('p',{className:'text-white/75 mt-3 max-w-2xl'},r.subtitle||''),h('div',{className:'flex flex-wrap gap-2 mt-5'},h('span',{className:'rounded-full bg-white/10 px-3 py-2 text-[10px] font-black'},erRouteFmt(r.durationMin,lang)),h('span',{className:'rounded-full bg-white/10 px-3 py-2 text-[10px] font-black'},r.distanceKm?String(r.distanceKm)+' km':'—'),h('span',{className:'rounded-full bg-white/10 px-3 py-2 text-[10px] font-black'},String((r.stops||[]).length)+' paradas'))))),
   h('main',{className:'max-w-5xl mx-auto px-4 mt-6 grid lg:grid-cols-[1fr_340px] gap-6'},
    h('section',{className:'rounded-[2rem] bg-white border p-6'},
     h('h2',{className:'text-2xl font-black'},'Tu recorrido'),
     h('div',{className:'mt-4 space-y-3'},...(r.stops||[]).map((s,i)=>h('div',{key:i,className:'rounded-2xl bg-slate-50 p-4 flex gap-3'},h('span',{className:'w-8 h-8 rounded-full bg-slate-950 text-white grid place-items-center text-xs font-black shrink-0'},String(i+1)),h('div',null,h('b',{className:'text-sm'},s.name||('Parada '+(i+1))),s.body&&h('p',{className:'text-xs text-slate-500 mt-1 line-clamp-2'},s.body))))),
     r.planB&&h('div',{className:'mt-6 rounded-2xl bg-cyan-50 border border-cyan-100 p-5'},h('div',{className:'text-[10px] font-black text-cyan-800'},'PLAN B'),h('p',{className:'text-sm mt-1'},r.planB))),
    h('aside',{className:'space-y-4'},
     h('div',{className:'rounded-[2rem] bg-white border p-6'},h('div',{className:'text-[10px] font-black text-slate-500'},'ANTES DE SALIR'),h('p',{className:'text-sm mt-3'},r.bestStartTime||''),r.priceEstimate&&h('p',{className:'text-sm mt-2 font-semibold'},r.priceEstimate),h('button',{onClick:()=>startRoute(r),className:'w-full mt-5 rounded-xl bg-emerald-500 text-slate-950 px-4 py-4 text-sm font-black'},t.start)),
     (r.shortcuts||[]).length>0&&h('div',{className:'rounded-[2rem] bg-white border p-6'},h('div',{className:'text-[10px] font-black text-slate-500'},'TERMINAR ANTES'),...(r.shortcuts||[]).map((x,i)=>h('p',{key:i,className:'text-xs mt-2'},'• '+x))),
     (r.extensions||[]).length>0&&h('div',{className:'rounded-[2rem] bg-amber-50 border border-amber-100 p-6'},h('div',{className:'text-[10px] font-black text-amber-800'},'QUIERO SEGUIR'),...(r.extensions||[]).map((x,i)=>h('p',{key:i,className:'text-xs mt-2'},'• '+x))))));
 }
 return h('div',{className:'min-h-screen bg-[#f7f7f4] pb-24'},
  h('header',{className:'max-w-7xl mx-auto px-4 sm:px-6 pt-6'},
   h('button',{onClick:()=>go('inicio'),className:'text-xs font-black'},t.back),
   h('div',{className:'mt-5 rounded-[2.2rem] bg-slate-950 text-white p-7 sm:p-11 overflow-hidden relative'},h('div',{className:'absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_20%,#34d399,transparent_35%)]'}),h('div',{className:'relative max-w-3xl'},h('div',{className:'text-[10px] font-black text-emerald-300'},t.eyebrow),h('h1',{className:'text-5xl sm:text-7xl font-black mt-2'},t.title),h('p',{className:'text-white/70 mt-4 text-base sm:text-lg'},t.sub),h('div',{className:'flex flex-wrap gap-2 mt-5'},h('span',{className:'rounded-full bg-white/10 px-3 py-2 text-[10px] font-black'},window.ERNESTINHO_ROUTES_V1.length+' rutas candidatas'),h('span',{className:'rounded-full bg-white/10 px-3 py-2 text-[10px] font-black'},window.ERNESTINHO_ROUTES_V1.filter(x=>x.status==='PILOT_READY').length+' pilotos avanzados'),h('span',{className:'rounded-full bg-white/10 px-3 py-2 text-[10px] font-black'},window.ERNESTINHO_ROUTE_COMPETITORS.length+' benchmarks'))))),
  h('main',{className:'max-w-7xl mx-auto px-4 sm:px-6'},
   h('div',{className:'mt-6 grid md:grid-cols-[1fr_auto_auto] gap-3'},h('input',{value:q,onChange:e=>setQ(e.target.value),placeholder:t.search,className:'rounded-2xl border bg-white px-5 py-4 text-sm outline-none'}),h('select',{value:zone,onChange:e=>setZone(e.target.value),className:'rounded-2xl border bg-white px-4 py-4 text-xs font-black'},...zones.map(z=>h('option',{key:z,value:z},z==='ALL'?'TODAS LAS ZONAS':z))),h('select',{value:access,onChange:e=>setAccess(e.target.value),className:'rounded-2xl border bg-white px-4 py-4 text-xs font-black'},...['ALL','FREE','HYBRID','PREMIUM'].map(z=>h('option',{key:z,value:z},z==='ALL'?'TODOS':z)))),
   h('section',{className:'mt-8'},h('div',{className:'flex items-end justify-between gap-4'},h('div',null,h('div',{className:'text-[10px] font-black text-emerald-700'},t.featured),h('h2',{className:'text-3xl font-black'},'Lo que ya se puede probar')),h('span',{className:'text-xs text-slate-500'},filtered.length+' rutas')),h('div',{className:'grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'},...filtered.filter(r=>r.status==='PILOT_READY').map(r=>h(Card,{key:r.routeId,r})))),
   h('section',{className:'mt-10'},h('div',{className:'text-[10px] font-black text-slate-500'},t.all),h('div',{className:'grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4'},...filtered.filter(r=>r.status!=='PILOT_READY').map(r=>h(Card,{key:r.routeId,r}))),!filtered.length&&h('p',{className:'p-8 text-center text-slate-500'},t.empty)),
   h('section',{className:'mt-12 rounded-[2rem] bg-white border p-6'},h('h2',{className:'text-xl font-black'},'Qué NO voy a vender como autoguiado genérico'),h('div',{className:'grid md:grid-cols-2 gap-3 mt-4'},...ERNESTINHO_ROUTES_NOT_RECOMMENDED.map(x=>h('div',{key:x.routeId,className:'rounded-2xl bg-rose-50 border border-rose-100 p-4'},h('b',{className:'text-sm'},x.routeId),h('p',{className:'text-xs text-slate-600 mt-1'},x.reason)))))));
}

window.__ERNESTINHO_ROUTES__={version:'1.0',routes:window.ERNESTINHO_ROUTES_V1,competitors:window.ERNESTINHO_ROUTE_COMPETITORS,notRecommended:ERNESTINHO_ROUTES_NOT_RECOMMENDED,generatedAt:'2026-09-13'};
window.__ERNESTINHO_ROUTE_MATCH__=function(q){const n=String(q||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();return window.ERNESTINHO_ROUTES_V1.map(r=>({r,s:[r.title,r.zone,...r.neighborhoods,...r.theme].join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().split(' ').reduce((a,w)=>a+(w&&n.includes(w)?1:0),0)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s).slice(0,3).map(x=>x.r);};


/* ===== RECORRIDOS ERNESTINHO V2 — PUBLIC SHOWCASE + PREMIUM PREVIEW ===== */
function erV2Route(id){return window.ERNESTINHO_MASTER_ROUTE_CATALOG.find(r=>r.routeId===id)||null}
function erV2Premium(id){return window.ERNESTINHO_ROUTE_PREMIUM_CONTENT_V3[id]||window.ERNESTINHO_ROUTE_PREMIUM_CONTENT[id]||null}
function erV2Fmt(min){if(!min)return '—';const h=Math.floor(min/60),m=min%60;return h?(h+'h'+(m?' '+m+'m':'')):m+' min'}
function ErnestinhoRoutesV2({go,lang='es'}){
  const h=React.createElement;
  const [q,setQ]=React.useState('');
  const [zone,setZone]=React.useState('ALL');
  const [selected,setSelected]=React.useState(null);
  const [premiumMode,setPremiumMode]=React.useState(false);
  const [stopIndex,setStopIndex]=React.useState(0);
  const [completed,setCompleted]=React.useState([]);
  const [showMap,setShowMap]=React.useState(false);
  const dict={
    es:{back:'← VOLVER',eyebrow:'🧭 RECORRIDOS ERNESTINHO',title:'Río a tu ritmo.',sub:'Descubre el recorrido en la vitrina. El paquete completo desbloquea historia, paradas, mapas, consejos y después audio.',discover:'DESCUBRIR RECORRIDO',unlock:'DESBLOQUEAR RECORRIDO COMPLETO',demo:'VER DEMO PREMIUM',locked:'El recorrido completo es contenido premium.',map:'ABRIR MAPA'},
    pt:{back:'← VOLTAR',eyebrow:'🧭 ROTEIROS ERNESTINHO',title:'Rio no seu ritmo.',sub:'Conheça o roteiro na vitrine. O pacote completo desbloqueia história, paradas, mapas, dicas e depois áudio.',discover:'DESCOBRIR ROTEIRO',unlock:'DESBLOQUEAR ROTEIRO COMPLETO',demo:'VER DEMO PREMIUM',locked:'O roteiro completo é conteúdo premium.',map:'ABRIR MAPA'},
    en:{back:'← BACK',eyebrow:'🧭 ERNESTINHO ROUTES',title:'Rio at your pace.',sub:'Discover the route in the public showcase. The full package unlocks history, stops, maps, advice and later audio.',discover:'DISCOVER ROUTE',unlock:'UNLOCK FULL ROUTE',demo:'VIEW PREMIUM DEMO',locked:'The full route is premium content.',map:'OPEN MAP'}
  };
  const L=dict[lang]||dict.es;

  React.useEffect(()=>{
    if(!selected)return;
    try{
      const x=JSON.parse(localStorage.getItem('ernestinho_route_'+selected)||'{}');
      setCompleted(x.completed||[]);
      setStopIndex(x.currentStop||0);
    }catch(e){}
  },[selected]);

  const save=(rid,comp,idx)=>{
    try{localStorage.setItem('ernestinho_route_'+rid,JSON.stringify({completed:comp,currentStop:idx,updatedAt:new Date().toISOString()}));}catch(e){}
  };

  const zones=['ALL',...Array.from(new Set(window.ERNESTINHO_MASTER_ROUTE_CATALOG.map(r=>r.zone)))];
  const nq=q.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const rows=window.ERNESTINHO_MASTER_ROUTE_CATALOG.filter(r=>{
    const n=(r.title+' '+r.zone+' '+(r.neighborhoods||[]).join(' ')+' '+(r.theme||[]).join(' ')).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    return (!nq||n.includes(nq))&&(zone==='ALL'||r.zone===zone);
  }).sort((a,b)=>(b.priority||0)-(a.priority||0));

  if(selected){
    const r=erV2Route(selected);
    const p=erV2Premium(selected);
    if(premiumMode&&p){
      const s=p.stops[Math.min(stopIndex,p.stops.length-1)];
      const done=completed.includes(s.stopId);
      const goIndex=(idx)=>{const x=Math.max(0,Math.min(p.stops.length-1,idx));setStopIndex(x);save(selected,completed,x);window.scrollTo({top:0,behavior:'smooth'});};
      const toggleDone=()=>{const c=done?completed.filter(x=>x!==s.stopId):[...completed,s.stopId];setCompleted(c);save(selected,c,stopIndex);};
      return h('div',{className:'max-w-4xl mx-auto px-4 py-6 sm:py-10'},[
        h('div',{key:'top',className:'flex flex-wrap items-center justify-between gap-2'},[
          h('button',{key:'back',onClick:()=>{setPremiumMode(false);setStopIndex(0)},className:'text-xs font-black'},'← VOLVER AL RECORRIDO'),
          h('span',{key:'badge',className:'rounded-full bg-emerald-100 text-emerald-800 px-3 py-2 text-[9px] font-black'},'PREMIUM_PREVIEW · '+completed.length+'/'+p.stops.length)
        ]),
        h('div',{key:'progress',className:'mt-5 h-2 rounded-full bg-slate-100 overflow-hidden'},h('div',{className:'h-full bg-emerald-500',style:{width:(completed.length/p.stops.length*100)+'%'}})),
        h('div',{key:'hero',className:'mt-5 rounded-[2rem] bg-slate-950 text-white p-6'},[
          h('div',{key:'ey',className:'text-[10px] font-black text-emerald-300'},'TU RECORRIDO ESTÁ LISTO'),
          h('h1',{key:'title',className:'text-3xl font-black mt-2'},p.title),
          h('p',{key:'desc',className:'text-sm text-white/70 mt-2'},p.premiumDescription)
        ]),
        h('div',{key:'stop',className:'mt-5'},h(ErPremiumStopV2,{s,index:stopIndex,total:p.stops.length,done,onPrev:()=>goIndex(stopIndex-1),onNext:()=>goIndex(stopIndex+1),onToggleDone:toggleDone})),
        h('section',{key:'foot',className:'mt-5 grid sm:grid-cols-2 gap-4'},[
          h('div',{key:'pb',className:'rounded-3xl bg-blue-50 p-5'},[h('b',{key:'b',className:'text-xs'},'PLAN B'),h('p',{key:'p',className:'text-xs text-slate-600 mt-2'},p.planB&&p.planB.rain||'Revisar condiciones.')]),
          h('div',{key:'ext',className:'rounded-3xl bg-emerald-50 p-5'},[h('b',{key:'b',className:'text-xs'},'QUIERO SEGUIR'),h('p',{key:'p',className:'text-xs text-slate-600 mt-2'},(p.extensions||[]).map(x=>x.label).join(' · ')||'Sin extensión definida.')])
        ])
      ]);
    }

    const statItems=[['ZONA',r.zone],['DURACIÓN',erV2Fmt(r.durationMin)],['DIFICULTAD',r.difficulty||'—'],['IDEAL PARA',(r.idealFor||[]).slice(0,3).join(' · ')]];
    const teaser=p?h('section',{className:'mt-8'},[
      h('h2',{key:'h',className:'text-xl font-black'},'UNA MUESTRA DEL RECORRIDO'),
      h('div',{key:'g',className:'grid md:grid-cols-3 gap-3 mt-4'},p.stops.slice(0,3).map(s=>h('div',{key:s.stopId,className:'rounded-2xl border p-4'},[
        h('b',{key:'b',className:'text-sm'},s.name),
        h('p',{key:'p',className:'text-xs text-slate-600 mt-2 line-clamp-3'},s.publicTeaser)
      ])))
    ]):null;
    const premiumBox=h('div',{className:'mt-8 rounded-[2rem] bg-slate-950 text-white p-6'},[
      h('div',{key:'e',className:'text-[10px] font-black text-emerald-300'},'PAQUETE COMPLETO ERNESTINHO'),
      h('h2',{key:'h',className:'text-2xl font-black mt-2'},L.locked),
      h('p',{key:'p',className:'text-sm text-white/70 mt-2'},'Incluye historia desarrollada, todas las paradas, qué observar, información práctica, Plan B, progreso, mapas y futura narración en audio.'),
      h('div',{key:'a',className:'flex flex-wrap gap-3 mt-5'},[
        h('button',{key:'unlock',className:'rounded-full bg-emerald-500 text-slate-950 px-5 py-3 text-xs font-black'},L.unlock),
        p?h('button',{key:'demo',onClick:()=>{setPremiumMode(true);setStopIndex(0)},className:'rounded-full bg-white/10 border border-white/20 px-5 py-3 text-xs font-black'},L.demo):h('span',{key:'pending',className:'rounded-full bg-amber-500/20 px-5 py-3 text-xs font-black text-amber-200'},'CONTENIDO PREMIUM EN PRODUCCIÓN')
      ]),
      h('p',{key:'note',className:'text-[10px] text-white/45 mt-3'},'Demo de desarrollo: no existe checkout real todavía.')
    ]);
    return h('div',{className:'max-w-6xl mx-auto px-4 py-6 sm:py-10'},[
      h('button',{key:'back',onClick:()=>{setSelected(null);setPremiumMode(false);setShowMap(false)},className:'text-xs font-black'},'← VOLVER A RECORRIDOS'),
      h('div',{key:'card',className:'mt-5 rounded-[2.3rem] bg-white border overflow-hidden'},[
        h(ErRouteVisualV2,{key:'visual',route:r,height:'h-64 sm:h-80'}),
        h('div',{key:'content',className:'p-6 sm:p-9'},[
          h('div',{key:'badges',className:'flex flex-wrap gap-2'},[
            h('span',{key:'a',className:'rounded-full bg-teal-50 text-teal-800 px-3 py-2 text-[9px] font-black'},r.accessType),
            h('span',{key:'d',className:'rounded-full bg-slate-100 px-3 py-2 text-[9px] font-black'},erV2Fmt(r.durationMin)),
            h('span',{key:'s',className:'rounded-full bg-slate-100 px-3 py-2 text-[9px] font-black'},(r.stopCount||0)+' PARADAS')
          ]),
          h('h1',{key:'title',className:'text-4xl sm:text-5xl font-black mt-4'},r.title),
          h('p',{key:'desc',className:'text-lg text-slate-600 mt-3 max-w-3xl'},r.publicDescription||r.subtitle),
          h('div',{key:'stats',className:'grid sm:grid-cols-4 gap-3 mt-6'},statItems.map(x=>h('div',{key:x[0],className:'rounded-2xl bg-slate-50 p-4'},[h('div',{key:'k',className:'text-[9px] font-black text-slate-400'},x[0]),h('div',{key:'v',className:'text-xs font-black mt-1'},x[1]||'—')]))),
          teaser,
          premiumBox,
          h('button',{key:'mapbtn',onClick:()=>setShowMap(!showMap),className:'mt-5 rounded-full border px-4 py-2 text-[10px] font-black'},showMap?'CERRAR MAPA':L.map),
          showMap?h('div',{key:'map',className:'mt-3 rounded-2xl bg-slate-100 p-5 text-xs text-slate-600'},'Mapa pesado diferido. Navegación: '+(r.mapQuery||r.title)+' · Rio de Janeiro'):null
        ])
      ])
    ]);
  }

  return h('div',{className:'max-w-7xl mx-auto px-4 py-6 sm:py-10'},[
    h('button',{key:'back',onClick:()=>go('inicio'),className:'text-xs font-black'},L.back),
    h('section',{key:'hero',className:'mt-5 rounded-[2.4rem] bg-slate-950 text-white p-7 sm:p-12 overflow-hidden relative'},[
      h('div',{key:'fx',className:'absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_20%,#34d399,transparent_35%)]'}),
      h('div',{key:'copy',className:'relative max-w-4xl'},[
        h('div',{key:'ey',className:'text-[10px] font-black text-emerald-300'},L.eyebrow),
        h('h1',{key:'title',className:'text-5xl sm:text-7xl font-black mt-2'},L.title),
        h('p',{key:'sub',className:'text-white/70 mt-4 text-base sm:text-lg'},L.sub),
        h('div',{key:'m',className:'flex flex-wrap gap-2 mt-5'},[
          h('span',{key:'r',className:'rounded-full bg-white/10 px-3 py-2 text-[10px] font-black'},window.ERNESTINHO_MASTER_ROUTE_CATALOG.length+' rutas'),
          h('span',{key:'p',className:'rounded-full bg-white/10 px-3 py-2 text-[10px] font-black'},Object.keys(window.ERNESTINHO_ROUTE_PREMIUM_CONTENT).length+' paquetes premium en desarrollo V3'),
          h('span',{key:'c',className:'rounded-full bg-white/10 px-3 py-2 text-[10px] font-black'},window.ERNESTINHO_COMPETITOR_AUDIT_V2.length+' benchmarks')
        ])
      ])
    ]),
    h('section',{key:'filters',className:'mt-8 flex flex-col sm:flex-row gap-3'},[
      h('input',{key:'q',value:q,onChange:e=>setQ(e.target.value),placeholder:'Buscar barrio, tema o recorrido',className:'flex-1 rounded-2xl border px-5 py-4 text-sm'}),
      h('select',{key:'z',value:zone,onChange:e=>setZone(e.target.value),className:'rounded-2xl border px-4 py-4 text-sm font-bold'},zones.map(z=>h('option',{key:z},z)))
    ]),
    h('section',{key:'grid',className:'mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5'},rows.map(r=>h('article',{key:r.routeId,className:'rounded-[2rem] bg-white border  overflow-hidden flex flex-col'},[
      h(ErRouteVisualV2,{key:'v',route:r}),
      h('div',{key:'c',className:'p-5 flex flex-col flex-1'},[
        h('div',{key:'b',className:'flex gap-2 flex-wrap'},[
          h('span',{key:'a',className:'rounded-full bg-emerald-50 text-emerald-800 px-2 py-1 text-[9px] font-black'},r.accessType),
          h('span',{key:'d',className:'rounded-full bg-slate-100 px-2 py-1 text-[9px] font-black'},erV2Fmt(r.durationMin)),
          h('span',{key:'s',className:'rounded-full bg-slate-100 px-2 py-1 text-[9px] font-black'},(r.stopCount||0)+' PARADAS')
        ]),
        h('h2',{key:'t',className:'text-xl font-black mt-3'},r.title),
        h('p',{key:'p',className:'text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3'},r.publicDescription||r.subtitle),
        h('p',{key:'z',className:'text-[10px] text-slate-400 mt-3'},r.zone+' · '+(r.neighborhoods||[]).slice(0,3).join(' · ')),
        h('button',{key:'go',onClick:()=>setSelected(r.routeId),className:'mt-auto pt-5 text-left text-teal-700 text-xs font-black'},L.discover+' →')
      ])
    ])))
  ]);
}

window.__ERNESTINHO_ROUTES_V3__={version:'3.0-final',routeCount:window.ERNESTINHO_MASTER_ROUTE_CATALOG.length,masterRouteCount:39,premiumPrototypeCount:Object.keys(window.ERNESTINHO_ROUTE_PREMIUM_CONTENT_V3).length,premiumReadyCount:0,premiumNearReadyCount:2,mediaCount:14,sourceCount:33,generatedAt:'2026-09-13'};
window.__ERNESTINHO_ROUTES_V2__={version:'2.0-compat',catalogCount:window.ERNESTINHO_MASTER_ROUTE_CATALOG.length,premiumCount:Object.keys(window.ERNESTINHO_ROUTE_PREMIUM_CONTENT).length,stopCount:0,competitorCount:window.ERNESTINHO_COMPETITOR_AUDIT_V2.length,gapCount:0,generatedAt:'2026-09-13'};
window.ErnestinhoRoutesV1=ErnestinhoRoutesV1;
window.ErnestinhoRoutesV2=ErnestinhoRoutesV2;
