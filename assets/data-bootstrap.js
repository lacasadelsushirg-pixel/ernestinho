window.GLOBAL_UI_TRANSLATIONS=window.GLOBAL_UI_TRANSLATIONS||{es:{},pt:{},en:{}};
window.__ecDataPromises=window.__ecDataPromises||new Map();
window.__ecLoadData=window.__ecLoadData||function(url){if(window.__ecDataPromises.has(url))return window.__ecDataPromises.get(url);const p=fetch(url,{cache:'force-cache'}).then(r=>{if(!r.ok)throw Error(url+' '+r.status);return r.json()}).then(x=>(Object.assign(window,x),x));window.__ecDataPromises.set(url,p);return p;};
window.__ecLanguagePayloadPromise=null;
window.__ecEnsureLanguagePayloads=function(){
 if(window.__EC_ALL_LANGUAGE_PAYLOADS_LOADED__)return Promise.resolve();
 if(window.__ecLanguagePayloadPromise)return window.__ecLanguagePayloadPromise;
 const files=['/assets/attr-translations.js?v=20260922','/assets/translations-app-payload.js?v=20260922','/assets/index-translations-extra.js?v=20260922-final'];
 window.__ecLanguagePayloadPromise=Promise.all(files.map(src=>new Promise((ok,fail)=>{const x=document.createElement('script');x.src=src;x.async=true;x.onload=ok;x.onerror=fail;document.head.appendChild(x)}))).then(()=>{window.__EC_ALL_LANGUAGE_PAYLOADS_LOADED__=true;});
 return window.__ecLanguagePayloadPromise;
};
(async()=>{
 const load=src=>new Promise((ok,fail)=>{const x=document.createElement('script');x.src=src;x.async=true;x.onload=ok;x.onerror=()=>fail(new Error('No se pudo cargar '+src));document.head.appendChild(x)});
 const ensureRuntime=async()=>{
   if(!window.React)await load('https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js');
   if(!window.ReactDOM)await load('https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js');
   if(!window.React||!window.ReactDOM||typeof window.ReactDOM.createRoot!=='function')throw new Error('React runtime no disponible');
 };
 await ensureRuntime();
 await load('/assets/qh-i18n.js?v=20260922').catch(e=>console.error('EC qh-i18n',e));
 let lang='es';try{lang=localStorage.getItem('ernestinho-lang')||'es'}catch(e){}
 if(lang!=='es')await window.__ecEnsureLanguagePayloads().catch(e=>console.error('EC translations preload',e));
 const urls=["/data/consejos-viaje.json","/data/cultura.json","/data/explorar.json","/data/guia.json","/data/naturaleza.json","/data/otros-datos-extra.json","/data/playas.json","/data/premium-recorridos-extra.json","/data/rio-contenido-extra.json","/data/rio-hoje.json","/data/transporte.json","/data/viaje-consejos-extra.json","/data/vida-nocturna.json","/data/gastronomia.json"];
 await Promise.all(urls.map(url=>window.__ecLoadData(url).catch(e=>{console.error('EC data load failed',url,e);return null})));
 // Load the legacy runtime first, then replace its global Experiencias component
 // with the canonical categorized implementation. This prevents app.js from
 // overwriting the canonical function during startup.
 await load('/assets/app.js?v=20260923-canonical-experiencias-router-2');
 await load('/assets/families/master4-experiences.js?v=20260923-canonical-after-app');
 await load('/assets/experiencias-unify-fix.js?v=20260923-unify-1');
})().catch(e=>{
 console.error('EC bootstrap',e);
 const root=document.getElementById('ernestinho-carioca-root');
 if(root&&!root.childNodes.length)root.innerHTML='<div style="min-height:70vh;display:flex;align-items:center;justify-content:center;padding:24px;font-family:Arial,sans-serif;text-align:center"><div><strong>Estamos cargando la guía de Río.</strong><br><span style="font-size:14px">Actualiza esta página en unos segundos.</span></div></div>';
});
