window.GLOBAL_UI_TRANSLATIONS=window.GLOBAL_UI_TRANSLATIONS||{es:{},pt:{},en:{}};
window.__ecDataPromises=window.__ecDataPromises||new Map();
window.__ecLoadData=window.__ecLoadData||function(url){if(window.__ecDataPromises.has(url))return window.__ecDataPromises.get(url);const p=fetch(url,{cache:'force-cache'}).then(r=>{if(!r.ok)throw Error(url+' '+r.status);return r.json()}).then(x=>(Object.assign(window,x),x));window.__ecDataPromises.set(url,p);return p;};
window.__ecLanguagePayloadPromise=null;
window.__ecEnsureLanguagePayloads=function(){
 if(window.__EC_ALL_LANGUAGE_PAYLOADS_LOADED__)return Promise.resolve();
 if(window.__ecLanguagePayloadPromise)return window.__ecLanguagePayloadPromise;
 const files=['/assets/attr-translations.js?v=20260922',"/assets/translations/t34-01.js?v=20260923","/assets/translations/t34-02.js?v=20260923","/assets/translations/t34-03.js?v=20260923","/assets/translations/t34-04.js?v=20260923","/assets/translations/t34-05.js?v=20260923","/assets/translations/t35-01.js?v=20260923","/assets/translations/t35-02.js?v=20260923","/assets/translations/t35-03.js?v=20260923","/assets/translations/t35-04.js?v=20260923","/assets/translations/t35-05.js?v=20260923","/assets/translations/t35-06.js?v=20260923","/assets/translations/t35-07.js?v=20260923","/assets/translations/t35-08.js?v=20260923","/assets/translations/t35-09.js?v=20260923","/assets/translations/t35-10.js?v=20260923","/assets/translations/t35-11.js?v=20260923","/assets/translations/t35-12.js?v=20260923","/assets/translations/t35-13.js?v=20260923",'/assets/index-translations-extra.js?v=20260922-final'];
 window.__ecLanguagePayloadPromise=Promise.all(files.map(src=>new Promise((ok,fail)=>{const x=document.createElement('script');x.src=src;x.async=true;x.onload=ok;x.onerror=fail;document.head.appendChild(x)}))).then(()=>{window.__EC_ALL_LANGUAGE_PAYLOADS_LOADED__=true;});
 return window.__ecLanguagePayloadPromise;
};
(async()=>{
 await fetch('/data/compras-manifest.json',{cache:'force-cache'}).then(r=>r.json()).then(x=>{window.COMPRAS_CARDS=x.cards||{}}).catch(e=>console.error('EC compras manifest',e));
 const load=src=>new Promise((ok,fail)=>{const x=document.createElement('script');x.src=src;x.onload=ok;x.onerror=fail;document.head.appendChild(x)});
 await load('/assets/qh-i18n.js?v=20260922');
 await load('/assets/core-recommendation-engine.js?v=20260923');
 await load('/assets/guide-editorial-extensions.js?v=20260923');
 await load('/assets/editorial-data.js?v=20260923');
 await load('/assets/gastronomy-data.js?v=20260923');
 await new Promise(resolve=>{if(Array.isArray(window.GASTRONOMIA_NUEVAS_CARDS))return resolve();const done=()=>{window.removeEventListener('ec:gastro-ready',done);resolve()};window.addEventListener('ec:gastro-ready',done,{once:true});setTimeout(done,8000)});
 const lang=localStorage.getItem('ernestinho-lang')||'es';
 if(lang!=='es'){await window.__ecEnsureLanguagePayloads();
  try{const parts=await Promise.all(Array.from({length:23},(_,i)=>fetch('/assets/translations/heavy-'+String(i+1).padStart(2,'0')+'.part?v=20260923',{cache:'force-cache'}).then(r=>{if(!r.ok)throw Error(r.url+' '+r.status);return r.text()})));(0,eval)(parts.join(''));await load('/assets/translations/heavy-tail.js?v=20260923');}catch(e){console.error('EC heavy translations',e);}
 }
 const urls=["/data/consejos-viaje-lazy52.json","/data/consejos-viaje.json","/data/copacabana-extra-lazy.json","/data/copacabana-extra-lazy52.json","/data/cultura.json","/data/explorar-lazy.json","/data/explorar.json","/data/guia.json","/data/master-runtime-extra-lazy.json","/data/master3-runtime-family.json","/data/master3-runtime-lazy.json","/data/naturaleza.json","/data/otros-datos-extra-lazy52.json","/data/otros-datos-extra.json","/data/playas.json","/data/premium-recorridos-extra.json","/data/rio-contenido-extra.json","/data/rio-hoje-family.json","/data/rio-hoje-lazy52.json","/data/rio-hoje.json","/data/transporte-lazy52.json","/data/transporte.json","/data/viaje-consejos-extra-lazy52.json","/data/viaje-consejos-extra.json","/data/vida-nocturna.json","/data/gastronomia.json"];
 for(const url of urls){try{await window.__ecLoadData(url)}catch(e){console.error('EC data load failed',url,e)}} try{const m=await fetch('/data/recorridos/manifest.json',{cache:'force-cache'}).then(r=>r.json());for(const url of (m.files||[])){await window.__ecLoadData(url)}}catch(e){console.error('EC recorridos load failed',e)}
 const x=document.createElement('script');x.src='/assets/app.js?v=20260922-stable8';x.onerror=()=>console.error('EC app load failed');document.body.appendChild(x);
})().catch(e=>console.error('EC bootstrap',e));
