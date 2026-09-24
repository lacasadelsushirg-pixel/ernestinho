window.GLOBAL_UI_TRANSLATIONS=window.GLOBAL_UI_TRANSLATIONS||{es:{},pt:{},en:{}};
window.__ecDataPromises=window.__ecDataPromises||new Map();
window.__ecWithTimeout=function(p,ms,label){return Promise.race([p,new Promise((_,reject)=>setTimeout(()=>reject(new Error((label||'resource')+' timeout')),ms))]);};
window.__ecLoadData=window.__ecLoadData||function(url){
 if(window.__ecDataPromises.has(url))return window.__ecDataPromises.get(url);
 const p=window.__ecWithTimeout(fetch(url,{cache:'force-cache'}),10000,url)
  .then(r=>{if(!r.ok)throw Error(url+' '+r.status);return r.json()})
  .then(x=>(Object.assign(window,x),x))
  .catch(e=>{console.error('EC data load failed',url,e);return {};});
 window.__ecDataPromises.set(url,p);return p;
};
window.__ecLanguagePayloadPromise=null;
window.__ecEnsureLanguagePayloads=function(){
 if(window.__EC_ALL_LANGUAGE_PAYLOADS_LOADED__)return Promise.resolve();
 if(window.__ecLanguagePayloadPromise)return window.__ecLanguagePayloadPromise;
 const files=['/assets/attr-translations.js?v=20260923-modular',"/assets/translations/t34-01.js?v=20260923","/assets/translations/t34-02.js?v=20260923","/assets/translations/t34-03.js?v=20260923","/assets/translations/t34-04.js?v=20260923","/assets/translations/t34-05.js?v=20260923","/assets/translations/t35-01.js?v=20260923","/assets/translations/t35-02.js?v=20260923","/assets/translations/t35-03.js?v=20260923","/assets/translations/t35-04.js?v=20260923","/assets/translations/t35-05.js?v=20260923","/assets/translations/t35-06.js?v=20260923","/assets/translations/t35-07.js?v=20260923","/assets/translations/t35-08.js?v=20260923","/assets/translations/t35-09.js?v=20260923","/assets/translations/t35-10.js?v=20260923","/assets/translations/t35-11.js?v=20260923","/assets/translations/t35-12.js?v=20260923","/assets/translations/t35-13.js?v=20260923",'/assets/index-translations-extra.js?v=20260923-modular'];
 const add=src=>window.__ecWithTimeout(new Promise((ok,fail)=>{const x=document.createElement('script');x.src=src;x.async=true;x.onload=ok;x.onerror=()=>fail(new Error('No se pudo cargar '+src));document.head.appendChild(x)}),10000,src);
 window.__ecLanguagePayloadPromise=Promise.allSettled(files.map(add)).then(()=>{window.__EC_ALL_LANGUAGE_PAYLOADS_LOADED__=true;});
 return window.__ecLanguagePayloadPromise;
};
(async()=>{
 const root=document.getElementById('ernestinho-carioca-root');
 const showLoading=()=>{if(root)root.innerHTML='<div style="min-height:70vh;display:flex;align-items:center;justify-content:center;padding:24px;font:600 18px Arial,sans-serif;color:#0b2528;text-align:center">Preparando tu guía de Río…</div>';};
 const showError=e=>{console.error('EC bootstrap fatal',e);if(root)root.innerHTML='<div style="min-height:70vh;display:flex;align-items:center;justify-content:center;padding:24px;font-family:Arial,sans-serif;text-align:center"><div><strong>La guía no pudo iniciar correctamente.</strong><br><span style="font-size:14px">Actualiza la página. Si continúa, revisaremos el error registrado en consola.</span></div></div>';};
 showLoading();
 const load=src=>window.__ecWithTimeout(new Promise((ok,fail)=>{const x=document.createElement('script');x.src=src;x.onload=ok;x.onerror=()=>fail(new Error('No se pudo cargar '+src));document.head.appendChild(x)}),12000,src);
 try{
  if(!window.React)await load('https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js');
  if(!window.ReactDOM)await load('https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js');
  if(!window.React||!window.ReactDOM||typeof window.ReactDOM.createRoot!=='function')throw new Error('React runtime no disponible');

  await load('/assets/qh-i18n.js?v=20260924-live');
  await load('/assets/editorial-data.js?v=20260924-live');
  const path=window.location.pathname||'/';
  const preload=[];
  if(/^\/(?:recorrido-centro|quiero|ruta-centro)$/.test(path)) preload.push('/data/guia.json');
  if(/^\/guia\//.test(path)) preload.push('/data/guia.json');
  if(/^\/articulos\//.test(path)) preload.push('/data/viaje-consejos-extra.json');
  if(/^\/experiencias\//.test(path)) preload.push('/data/explorar.json');
  if(/^\/gastronomia\//.test(path)){preload.push('/data/gastronomia.json');await load('/assets/gastronomy-data.js?v=20260924-live');await Promise.race([window.__ecGastronomyReady||Promise.resolve(),new Promise(ok=>setTimeout(ok,4000))]);}
  if(/^\/museos\//.test(path)){const culture=['museos','teatros','iglesias','familia','museos-real'];await Promise.allSettled(culture.map(n=>load('/assets/culture/'+n+'.js?v=20260924-live')));}
  if(preload.length) await Promise.allSettled([...new Set(preload)].map(window.__ecLoadData));

  await load('/assets/app-runtime-20260924-live-v4.js?v=20260924-live');
  if(root&&/Preparando tu guía/.test(root.textContent||''))throw new Error('Runtime cargó pero React no reemplazó la pantalla de inicio');

  Promise.resolve().then(async()=>{
   load('/assets/gastronomy-data.js?v=20260924-live').catch(e=>console.error('EC gastronomy background',e));
   if(new URLSearchParams(location.search).get('debug')==='1') load('/assets/core-recommendation-engine.js?v=20260924-live').catch(e=>console.error('EC diagnostics engine',e));
   try{
    await window.__ecWithTimeout(fetch('/data/compras-manifest.json',{cache:'force-cache'}),10000,'compras manifest').then(r=>r.json()).then(x=>{window.COMPRAS_CARDS=x.cards||{}});
   }catch(e){console.error('EC compras manifest',e);}
   try{
    const m=await window.__ecWithTimeout(fetch('/data/recorridos/manifest.json',{cache:'force-cache'}),10000,'recorridos manifest').then(r=>r.json());
    for(let i=0;i<(m.files||[]).length;i+=2)await Promise.allSettled((m.files||[]).slice(i,i+2).map(window.__ecLoadData));
   }catch(e){console.error('EC recorridos background',e);}
  });
 }catch(e){showError(e);}
})();