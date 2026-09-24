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

  await load('/assets/qh-i18n.js?v=20260923-startup-v5');
  await load('/assets/core-recommendation-engine.js?v=20260923-startup-v5');
  await load('/assets/editorial-data.js?v=20260923-startup-v5');
  await load('/assets/gastronomy-data.js?v=20260923-startup-v5');

  const lang=localStorage.getItem('ernestinho-lang')||'es';
  if(lang!=='es'){
   await window.__ecEnsureLanguagePayloads();
   try{
    const parts=await Promise.all(Array.from({length:23},(_,i)=>window.__ecWithTimeout(fetch('/assets/translations/heavy-'+String(i+1).padStart(2,'0')+'.part?v=20260923',{cache:'force-cache'}).then(r=>{if(!r.ok)throw Error(r.url+' '+r.status);return r.text()}),10000,'heavy translation')));
    (0,eval)(parts.join(''));
    await load('/assets/translations/heavy-tail.js?v=20260923-full-parse1');
   }catch(e){console.error('EC heavy translations',e);}
  }

  const urls=["/data/consejos-viaje-lazy52.json","/data/consejos-viaje.json","/data/copacabana-extra-lazy.json","/data/copacabana-extra-lazy52.json","/data/cultura.json","/data/explorar-lazy.json","/data/explorar.json","/data/guia.json","/data/master-runtime-extra-lazy.json","/data/master3-runtime-family.json","/data/master3-runtime-lazy.json","/data/naturaleza.json","/data/otros-datos-extra-lazy52.json","/data/otros-datos-extra.json","/data/playas.json","/data/premium-recorridos-extra.json","/data/rio-contenido-extra.json","/data/rio-hoje-family.json","/data/rio-hoje-lazy52.json","/data/rio-hoje.json","/data/transporte-lazy52.json","/data/transporte.json","/data/viaje-consejos-extra-lazy52.json","/data/viaje-consejos-extra.json","/data/vida-nocturna.json","/data/gastronomia.json"];
  for(let i=0;i<urls.length;i+=6)await Promise.allSettled(urls.slice(i,i+6).map(window.__ecLoadData));

  await Promise.race([window.__ecGastronomyReady||Promise.resolve(),new Promise(ok=>setTimeout(ok,4000))]);

  await load('/assets/app-runtime-20260923-validated-v3.js?v=startup-v5');
  if(root&&/Preparando tu guía/.test(root.textContent||''))throw new Error('Runtime cargó pero React no reemplazó la pantalla de inicio');

  Promise.resolve().then(async()=>{
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