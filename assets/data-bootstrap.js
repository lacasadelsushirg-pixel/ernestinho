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
 const load=src=>new Promise((ok,fail)=>{const x=document.createElement('script');x.src=src;x.onload=ok;x.onerror=fail;document.head.appendChild(x)});
 await load('/assets/qh-i18n.js?v=20260922');
 const lang=localStorage.getItem('ernestinho-lang')||'es';
 if(lang!=='es')await window.__ecEnsureLanguagePayloads();
 const urls=["/data/consejos-viaje.json","/data/cultura.json","/data/explorar.json","/data/guia.json","/data/naturaleza.json","/data/otros-datos-extra.json","/data/playas.json","/data/premium-recorridos-extra.json","/data/rio-contenido-extra.json","/data/rio-hoje.json","/data/transporte.json","/data/viaje-consejos-extra.json","/data/vida-nocturna.json","/data/gastronomia.json"];
 await Promise.all(urls.map(url=>window.__ecLoadData(url).catch(e=>{console.error('EC data load failed',url,e);return null})));
 const x=document.createElement('script');x.src='/assets/app.js?v=20260922-stable10';x.onerror=()=>console.error('EC app load failed');document.body.appendChild(x);
})().catch(e=>console.error('EC bootstrap',e));
