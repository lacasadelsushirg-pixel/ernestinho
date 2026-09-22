/* Ernestinho header QA fix · 2026-09-22 */
(function(){
  function norm(s){return (s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
  function apply(){
    const header=document.querySelector('header');
    if(!header) return;

    /* Header final: quitar únicamente los accesos pedidos. */
    header.querySelectorAll('nav button, nav a, button, a').forEach(el=>{
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
          let digits='';
          if(/wa\.me$/i.test(u.hostname)||/wa\.me/i.test(u.hostname)) digits=u.pathname.replace(/\D/g,'');
          else digits=(u.searchParams.get('phone')||'').replace(/\D/g,'');
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
    setTimeout(function(){
      const now=(document.documentElement.lang||'').slice(0,2).toLowerCase();
      if(now!==next || next==='es') location.reload();
    },80);
  },true);
})();
