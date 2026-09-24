window.GLOBAL_UI_TRANSLATIONS=window.GLOBAL_UI_TRANSLATIONS||{es:{},pt:{},en:{}};
window.__ecDataPromises=window.__ecDataPromises||new Map();
window.__ecLoadData=window.__ecLoadData||function(url){if(window.__ecDataPromises.has(url))return window.__ecDataPromises.get(url);const p=fetch(url,{cache:'force-cache'}).then(r=>{if(!r.ok)throw Error(url+' '+r.status);return r.json()}).then(x=>(Object.assign(window,x),x));window.__ecDataPromises.set(url,p);return p;};
window.__ecLanguagePayloadPromise=null;
window.__ecEnsureLanguagePayloads=function(){
 if(window.__EC_ALL_LANGUAGE_PAYLOADS_LOADED__)return Promise.resolve();
 if(window.__ecLanguagePayloadPromise)return window.__ecLanguagePayloadPromise;
 const files=['/assets/attr-translations.js?v=20260922','/assets/translations-app-payload.js?v=20260922','/assets/translations-app-payload-2.js?v=20260922','/assets/index-translations-extra.js?v=20260922-final','/assets/translations-heavy.js?v=20260922-lazy-v1'];
 window.__ecLanguagePayloadPromise=Promise.all(files.map(src=>new Promise((ok,fail)=>{const x=document.createElement('script');x.src=src;x.async=true;x.onload=ok;x.onerror=fail;document.head.appendChild(x)}))).then(()=>{window.__EC_ALL_LANGUAGE_PAYLOADS_LOADED__=true;});
 return window.__ecLanguagePayloadPromise;
};
(async()=>{
 const load=src=>new Promise((ok,fail)=>{const x=document.createElement('script');x.src=src;x.onload=ok;x.onerror=fail;document.head.appendChild(x)});
 await load('/assets/qh-i18n.js?v=20260922');
 const lang=localStorage.getItem('ernestinho-lang')||'es';
 if(lang!=='es')await window.__ecEnsureLanguagePayloads();
 const urls=["/data/cultura.json","/data/guia.json","/data/rio-hoje.json","/data/explorar.json","/data/gastronomia.json","/data/playas.json","/data/vida-nocturna.json","/data/transporte.json","/data/naturaleza.json","/data/consejos-viaje.json","/data/otros-datos-extra.json","/data/viaje-consejos-extra.json"]; for(const u of urls){await window.__ecLoadData(u);}
 const x=document.createElement('script');x.src='/assets/app.js?v=20260922-final';document.body.appendChild(x);
})().catch(e=>{console.error('EC bootstrap',e);const root=document.getElementById('ernestinho-carioca-root');if(root)root.innerHTML='<div style="min-height:100vh;background:#071b1b;color:#fff;display:flex;align-items:center;justify-content:center;padding:32px;text-align:center;font-family:Arial,sans-serif"><div><h1 style="font-size:30px;margin:0 0 12px">Ernestinho Carioca</h1><p style="opacity:.85">Estamos cargando la guía de Río. Actualiza la página en unos segundos.</p></div></div>';});
