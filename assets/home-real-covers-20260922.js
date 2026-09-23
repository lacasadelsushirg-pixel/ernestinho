(function(){
'use strict';
const BASE='https://res.cloudinary.com/tdez3h4t/image/upload/v1790124458/portadas_nuevas_reales_';
/* Visual order stays exactly as the existing homepage buttons.
   Cloudinary numbers are image IDs, not button positions. 3–6 are reserved. */
const defs=[
 ['guia',['Guía de Río','Guia do Rio','Rio Guide'],7],
 ['transportes',['Transportes','Transportes','Transportation'],8],
 ['hospedaje',['Hospedaje','Hospedagem','Accommodation'],9],
 ['fotografia',['Fotografías','Fotografias','Photography'],10],
 ['compras',['Compras','Compras','Shopping'],11],
 ['barrios',['Barrios','Bairros','Neighborhoods'],12],
 ['eventos',['Eventos','Eventos','Events'],13],
 ['experiencias',['Experiencias','Experiências','Experiences'],14],
 ['playas',['Playas','Praias','Beaches'],15],
 ['nocturna',['Vida nocturna','Vida noturna','Nightlife'],16],
 ['gastronomia',['Gastronomía','Gastronomia','Gastronomy'],17],
 ['atracciones',['Atracciones','Atrações','Attractions'],18],
 ['familia',['Familia','Família','Family'],19],
 ['cafe',['Café Rio','Café Rio','Café Rio'],1],
 ['consejos',['Consejos','Dicas','Tips'],2]
];
const originalOrder=['guia','transportes','hospedaje','fotografia','compras','barrios','eventos','experiencias','playas','nocturna','gastronomia','atracciones','familia','naturaleza','consejos'];
function getSection(){
 const h=[...document.querySelectorAll('h2')].find(x=>/Explora R[ií]o por categor|Explore o Rio por categor|Explore Rio by categor/i.test(x.textContent||''));
 return h&&h.closest('section');
}
function langIndex(){
 const h=getSection()?.querySelector('h2'); if(!h)return 0;
 const t=h.textContent||''; return /^Explore o/.test(t)?1:/^Explore Rio/.test(t)?2:0;
}
function openCafe(ev){
 ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation();
 const labels=/^(Café Rio|Cafe Rio)$/i;
 const target=[...document.querySelectorAll('button,a')].find(el=>!el.closest('[data-ec-cover-grid]')&&labels.test((el.textContent||'').trim()));
 if(target){target.click();return;}
 const cafeSection=[...document.querySelectorAll('h1,h2,h3')].find(el=>/café rio/i.test(el.textContent||''));
 if(cafeSection){cafeSection.scrollIntoView({behavior:'smooth',block:'start'});}
}
function installStyle(){
 if(document.getElementById('ec-cover-style'))return;
 const s=document.createElement('style'); s.id='ec-cover-style';
 s.textContent=`
 .ec-real-cover{position:relative!important;overflow:hidden}
 .ec-real-cover .ec-cover-title{position:absolute;left:14px;right:14px;top:72%;transform:translateY(-50%);z-index:4;text-align:center;color:#fff;font-family:"Lutshine","Arial Narrow","Helvetica Neue",Arial,sans-serif;font-weight:700;font-size:clamp(1.02rem,2.15vw,1.72rem);line-height:1;letter-spacing:.055em;text-transform:uppercase;text-shadow:0 2px 4px rgba(0,0,0,.82);pointer-events:none}
 .ec-real-cover .ec-cover-arrow{position:absolute;right:15px;bottom:13px;z-index:4;color:#fff;font:700 1.15rem/1 Arial,sans-serif;text-shadow:0 2px 4px rgba(0,0,0,.82);pointer-events:none}
 .ec-real-cover img{object-fit:cover!important;object-position:center center!important}
 @media(max-width:640px){.ec-real-cover .ec-cover-title{left:10px;right:10px;top:71%;font-size:clamp(.86rem,4.2vw,1.16rem);letter-spacing:.045em}.ec-real-cover .ec-cover-arrow{right:10px;bottom:9px;font-size:1rem}}
 `;
 document.head.appendChild(s);
}
function apply(){
 const section=getSection(); if(!section)return;
 const grid=[...section.querySelectorAll('div')].find(d=>d.children.length===15&&[...d.children].every(x=>x.tagName==='BUTTON'));
 if(!grid)return;
 grid.dataset.ecCoverGrid='1'; installStyle();
 const buttons=[...grid.children]; if(buttons.length!==15)return;
 const by={}; originalOrder.forEach((k,i)=>by[k]=buttons[i]);
 const li=langIndex();
 defs.forEach(([key,titles,n])=>{
  const b=key==='cafe'?by.naturaleza:by[key]; if(!b)return;
  const titleText=titles[li];
  b.classList.add('ec-real-cover'); b.setAttribute('aria-label',titleText); b.title=titleText;
  const im=b.querySelector('img'); if(im){const src=BASE+n+'.png';if(im.src!==src)im.src=src;im.alt=titleText;}
  let title=b.querySelector('.ec-cover-title'); if(!title){title=document.createElement('span');title.className='ec-cover-title';b.appendChild(title);} title.textContent=titleText.toUpperCase();
  let arrow=b.querySelector('.ec-cover-arrow'); if(!arrow){arrow=document.createElement('span');arrow.className='ec-cover-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='→';b.appendChild(arrow);}
  [...b.children].forEach(ch=>{if(ch!==im&&ch!==title&&ch!==arrow&&ch.tagName==='SPAN')ch.style.display='none';});
  /* Never move/reappend buttons: preserving DOM position also preserves each original React click target. */
 });
 const cafe=by.naturaleza;
 if(cafe&&!cafe.dataset.ecCafeRoute){cafe.dataset.ecCafeRoute='1';cafe.addEventListener('click',openCafe,true);}
}
let queued=false; const run=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;apply();});};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run):run();
new MutationObserver(run).observe(document.documentElement,{childList:true,subtree:true});
})();