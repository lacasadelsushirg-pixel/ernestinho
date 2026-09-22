/* Ernestinho header QA fix · 2026-09-22 */
(function(){
  function norm(s){return (s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
  function apply(){
    const header=document.querySelector('header');
    if(!header) return;

    /* Header final: quitar únicamente los accesos pedidos. */
    header.querySelectorAll('nav > button, nav > a').forEach(el=>{
      const t=norm(el.textContent);
      if(['para mi','❤️ para mi','mes a mes','consejos','barrios','eventos','grandes eventos','playas'].includes(t)) el.remove();
    });

    /* Mantener un único selector de idioma y hacerlo visible sin romper el header. */
    const langs=[...header.querySelectorAll('[aria-label="Idioma / Language"]')];
    if(langs.length>1){
      const keep=langs.find(el=>!el.className.includes('hidden'))||langs[0];
      langs.forEach(el=>{if(el!==keep) el.remove();});
    }
    const lang=header.querySelector('[aria-label="Idioma / Language"]');
    if(lang){
      lang.classList.remove('hidden','xl:hidden');
      lang.style.flexShrink='0';
      const row=lang.parentElement&&lang.parentElement.parentElement;
      if(row){
        row.classList.remove('hidden','xl:hidden');
        row.style.display='block';
        row.style.width='100%';
      }
    }

    /* WhatsApp del header: conservar texto y botón completos. */
    header.querySelectorAll('a[href*="wa.me"],a[href*="api.whatsapp.com"],a[href*="whatsapp.com/send"]').forEach(a=>{
      a.style.flexShrink='0';
      a.style.whiteSpace='nowrap';
      a.style.overflow='visible';
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  let queued=false;
  const mo=new MutationObserver(()=>{
    if(queued) return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;apply();});
  });
  mo.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(()=>{apply();mo.disconnect();},12000);
})();

/* QA global: WhatsApp + enlaces inseguros · 2026-09-22 */
(function(){
  const EC_WA='5521969946938';
  function normalizeLinks(){
    document.querySelectorAll('a[href]').forEach(a=>{
      const raw=(a.getAttribute('href')||'').trim();
      if(!raw) return;
      if(/^javascript:/i.test(raw)){ a.removeAttribute('href'); return; }
      if(/(?:wa\.me|api\.whatsapp\.com|whatsapp\.com\/send)/i.test(raw)){
        try{
          const u=new URL(raw,location.origin);
          const text=u.searchParams.get('text');
          a.href='https://wa.me/'+EC_WA+(text?'?text='+encodeURIComponent(text):'');
        }catch(_){}
      }
      if(a.target==='_blank'){
        const rel=new Set((a.getAttribute('rel')||'').split(/\s+/).filter(Boolean));
        rel.add('noopener'); rel.add('noreferrer');
        a.setAttribute('rel',[...rel].join(' '));
      }
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',normalizeLinks,{once:true}); else normalizeLinks();
  const mo=new MutationObserver(()=>normalizeLinks());
  mo.observe(document.documentElement,{subtree:true,childList:true});
  setTimeout(()=>mo.disconnect(),15000);
})();

/* QUIERO language state repair · 2026-09-22
   The legacy Consejos translator mutates text nodes in place. React can reuse those
   nodes when only lang changes, leaving the previous translation visible. On /quiero
   persist the requested language before a clean render so ES/PT/EN are reversible. */
(function(){
  if((location.pathname||'').replace(/\/+$/,'')!=='/quiero') return;
  document.addEventListener('click',function(ev){
    const el=ev.target&&ev.target.closest&&ev.target.closest('header button,header a');
    if(!el) return;
    const t=(el.textContent||'').trim().toUpperCase();
    if(!['ES','PT','EN'].includes(t)) return;
    const next=t.toLowerCase();
    let current='es';
    try{ current=(localStorage.getItem('ernestinho-lang')||document.documentElement.lang||'es').slice(0,2).toLowerCase(); }catch(_){}
    if(current===next) return;
    try{ localStorage.setItem('ernestinho-lang',next); }catch(_){}
    setTimeout(function(){ location.reload(); },80);
  },true);
})();

/* QUIERO residual language cleanup · 2026-09-22 */
(function(){
  if((location.pathname||'').replace(/\/+$/,'')!=='/quiero') return;
  const labels={
    pt:'VER VÍDEO NO INSTAGRAM ↗',
    en:'VIEW VIDEO ON INSTAGRAM ↗'
  };
  function apply(){
    const lang=(document.documentElement.lang||'es').slice(0,2).toLowerCase();
    const replacement=labels[lang];
    if(!replacement) return;
    document.querySelectorAll('a,button').forEach(el=>{
      if(/^(VER|VIEW) VIDEO EN INSTAGRAM ↗$/i.test((el.textContent||'').trim())) el.textContent=replacement;
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  const mo=new MutationObserver(apply);
  mo.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(()=>{apply();mo.disconnect();},15000);
})();


/* BARRIOS · integración ADN + idioma funcional · 2026-09-22 */
(function(){
  function currentLang(){try{return (localStorage.getItem('ernestinho-lang')||document.documentElement.lang||'es').slice(0,2).toLowerCase();}catch(_){return 'es';}}
  function enhance(frame){
    if(!frame||frame.dataset.ecBarriosEnhanced==='1') return;
    let d; try{d=frame.contentDocument;}catch(_){return;} if(!d||!d.body)return;
    frame.dataset.ecBarriosEnhanced='1';
    const st=d.createElement('style'); st.id='ec-barrios-adn'; st.textContent=`
      :root{color-scheme:dark} html,body{background:#071414!important;color:#f7f2e8!important}
      body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important}
      header,nav,[class*="header"],[class*="hero"]{background:#0b2528!important;color:#fff!important}
      main,section,[class*="page"],[class*="container"]{background-color:transparent!important}
      article,[class*="card"],[class*="panel"],details{background:#102b2b!important;color:#f7f2e8!important;border-color:rgba(244,201,93,.28)!important;box-shadow:none!important}
      h1,h2,h3,h4,strong{color:#f7f2e8!important} p,li,label,small{color:#d7e1dd!important}
      button,a,[role="button"]{box-shadow:none!important} button{border-color:rgba(244,201,93,.35)!important}
      input,select,textarea{background:#071b1b!important;color:#fff!important;border-color:rgba(244,201,93,.35)!important}
      .ec-barr-lang{position:sticky;top:0;z-index:99999;display:flex;justify-content:center;gap:8px;padding:10px;background:#071414;border-bottom:1px solid rgba(244,201,93,.25)}
      .ec-barr-lang button{border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:8px 13px;background:#102b2b;color:#fff;font-weight:900;font-size:12px}
      .ec-barr-lang button[data-active="1"]{background:#f4c95d!important;color:#071414!important}
    `; d.head.appendChild(st);
    const bar=d.createElement('div');bar.className='ec-barr-lang';bar.setAttribute('aria-label','Idioma / Language');
    [['es','🇪🇸 ES'],['pt','🇧🇷 PT'],['en','🇺🇸 EN']].forEach(([l,t])=>{const b=d.createElement('button');b.type='button';b.textContent=t;b.dataset.lang=l;b.onclick=()=>{try{localStorage.setItem('ernestinho-lang',l);}catch(_){};window.dispatchEvent(new CustomEvent('ec-barrios-lang',{detail:l}));location.reload();};bar.appendChild(b);});
    d.body.insertBefore(bar,d.body.firstChild);
    function translate(){const lang=currentLang(),dict=(window.GLOBAL_UI_TRANSLATIONS&&window.GLOBAL_UI_TRANSLATIONS[lang])||{};bar.querySelectorAll('button').forEach(b=>b.dataset.active=b.dataset.lang===lang?'1':'0');d.documentElement.lang=lang==='pt'?'pt-BR':lang; if(lang==='es')return; const w=d.createTreeWalker(d.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const p=n.parentElement;if(!p||/^(SCRIPT|STYLE|TEXTAREA|CODE|PRE)$/.test(p.tagName)||p.closest('.ec-barr-lang'))continue;const raw=n.nodeValue,key=raw.trim();if(dict[key])n.nodeValue=raw.replace(key,dict[key]);} d.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el=>['placeholder','title','aria-label'].forEach(a=>{const v=el.getAttribute(a);if(v&&dict[v])el.setAttribute(a,dict[v]);}));}
    translate();
    const mo=new MutationObserver(()=>translate());mo.observe(d.body,{childList:true,subtree:true});setTimeout(()=>mo.disconnect(),15000);
  }
  function scan(){document.querySelectorAll('iframe[title*="Barrios"],iframe[title*="BETA 23"]').forEach(f=>{try{enhance(f);}catch(_){};f.addEventListener('load',()=>{f.dataset.ecBarriosEnhanced='';enhance(f);},{once:true});});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scan,{once:true});else scan();
  const mo=new MutationObserver(scan);mo.observe(document.documentElement,{childList:true,subtree:true});setTimeout(()=>mo.disconnect(),20000);
})();


/* Menú de tres puntos · Chrome/Edge/mobile · 2026-09-22 */
(function(){
  function fix(){
    document.querySelectorAll('button[aria-label="Abrir Menú"],button[aria-label="Abrir menu"],button[aria-label="Open menu"]').forEach(b=>{
      b.classList.remove('xl:hidden','hidden');
      b.style.display='inline-flex';
      b.style.alignItems='center';
      b.style.justifyContent='center';
      b.style.flexShrink='0';
      b.style.minWidth='44px';
      b.style.minHeight='44px';
      b.title='Más opciones';
      const open=(b.getAttribute('aria-expanded')==='true');
      if(!open && !b.dataset.ecDots){
        b.innerHTML='<span aria-hidden="true" style="font-size:22px;font-weight:900;line-height:1;letter-spacing:2px">•••</span>';
        b.dataset.ecDots='1';
      }
    });
    document.querySelectorAll('header .xl\\:hidden').forEach(el=>{
      if(el.querySelector && el.querySelector('button[aria-label="Abrir Menú"],button[aria-label="Abrir menu"],button[aria-label="Open menu"]')) return;
      if(el.textContent && /INICIO|GUÍA DE RÍO|EXPERIENCIAS|TRANSPORTES|QUÉ HACER/i.test(el.textContent) && el.querySelector('button')){
        el.classList.remove('xl:hidden');
      }
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fix,{once:true});else fix();
  const mo=new MutationObserver(fix);mo.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(()=>{fix();mo.disconnect();},20000);
})();
