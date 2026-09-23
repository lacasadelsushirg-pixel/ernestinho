(function(){
'use strict';
const BASE='https://res.cloudinary.com/tdez3h4t/image/upload/v1790124458/portadas_nuevas_reales_';
const defs=[
 ['cafe',['Café Rio','Café Rio','Café Rio'],BASE+'1.png'],
 ['consejos',['Consejos','Dicas','Tips'],BASE+'2.png'],
 ['guia',['Guía de Río','Guia do Rio','Rio Guide'],BASE+'3.png'],
 ['transportes',['Transportes','Transportes','Transportation'],BASE+'4.png'],
 ['hospedaje',['Hospedaje','Hospedagem','Accommodation'],BASE+'5.png'],
 ['fotografia',['Fotografías','Fotografias','Photography'],BASE+'6.png'],
 ['compras',['Compras','Compras','Shopping'],BASE+'7.png'],
 ['barrios',['Barrios','Bairros','Neighborhoods'],BASE+'8.png'],
 ['eventos',['Eventos','Eventos','Events'],BASE+'9.png'],
 ['experiencias',['Experiencias','Experiências','Experiences'],BASE+'10.png'],
 ['playas',['Playas','Praias','Beaches'],BASE+'11.png'],
 ['nocturna',['Vida nocturna','Vida noturna','Nightlife'],BASE+'12.png'],
 ['gastronomia',['Gastronomía','Gastronomia','Gastronomy'],BASE+'13.png'],
 ['atracciones',['Atracciones','Atrações','Attractions'],BASE+'14.png'],
 ['familia',['Familia','Família','Family'],BASE+'15.png']
];
const oldOrder=['guia','transportes','hospedaje','fotografia','compras','barrios','eventos','experiencias','playas','nocturna','gastronomia','atracciones','familia','naturaleza','consejos'];
function langIndex(){
 const h=[...document.querySelectorAll('h2')].find(x=>/Explora R[ií]o por categor|Explore o Rio por categor|Explore Rio by categor/i.test(x.textContent||''));
 if(!h)return 0; const t=h.textContent||''; return /^Explore o/.test(t)?1:/^Explore Rio/.test(t)?2:0;
}
function routeCafe(ev){
 ev.preventDefault();ev.stopPropagation();ev.stopImmediatePropagation();
 const candidates=[...document.querySelectorAll('button')].filter(b=>/^Café Rio$/i.test((b.textContent||'').trim()) && !b.closest('[data-ec-cover-grid]'));
 if(candidates[0]) candidates[0].click();
}
function apply(){
 const h=[...document.querySelectorAll('h2')].find(x=>/Explora R[ií]o por categor|Explore o Rio por categor|Explore Rio by categor/i.test(x.textContent||''));
 if(!h)return;
 const section=h.closest('section'); if(!section)return;
 const grid=[...section.querySelectorAll('div')].find(d=>d.children.length===15 && [...d.children].every(x=>x.tagName==='BUTTON'));
 if(!grid)return;
 grid.dataset.ecCoverGrid='1';
 if(!document.getElementById('ec-cover-style')){
  const s=document.createElement('style');s.id='ec-cover-style';s.textContent=
  '.ec-real-cover{position:relative!important}.ec-real-cover .ec-cover-title{position:absolute;left:12px;right:12px;top:73%;transform:translateY(-50%);z-index:3;text-align:center;color:#fffaf0;font-family:"Fraunces",Georgia,serif;font-weight:600;font-size:clamp(1.28rem,2.7vw,2.15rem);line-height:1.02;text-shadow:0 2px 12px rgba(0,0,0,.88),0 1px 3px rgba(0,0,0,.95);pointer-events:none}.ec-real-cover:after{content:"";position:absolute;inset:42% 0 0;background:linear-gradient(to bottom,transparent,rgba(0,0,0,.38));pointer-events:none;z-index:1}.ec-real-cover img{object-position:center center!important}';
  document.head.appendChild(s);
 }
 const current=[...grid.children]; const by={}; oldOrder.forEach((k,i)=>by[k]=current[i]);
 const cafe=by.naturaleza; if(cafe&&!cafe.dataset.ecCafe){cafe.dataset.ecCafe='1';cafe.addEventListener('click',routeCafe,true);}
 const li=langIndex();
 defs.forEach(([key,titles,img])=>{
   const b=key==='cafe'?cafe:by[key]; if(!b)return;
   b.classList.add('ec-real-cover'); b.setAttribute('aria-label',titles[li]); b.title=titles[li];
   const im=b.querySelector('img'); if(im){im.src=img;im.alt=titles[li];}
   let title=b.querySelector('.ec-cover-title'); if(!title){title=document.createElement('span');title.className='ec-cover-title';b.appendChild(title);}
   title.textContent=titles[li];
   [...b.children].forEach(ch=>{if(ch!==im&&ch!==title&&ch.tagName==='SPAN')ch.style.display='none';});
   grid.appendChild(b);
 });
}
let queued=false; const run=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;apply();});};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run):run();
new MutationObserver(run).observe(document.documentElement,{childList:true,subtree:true});
})();