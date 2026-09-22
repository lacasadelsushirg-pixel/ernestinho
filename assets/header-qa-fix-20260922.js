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
  const mo=new MutationObserver(apply); mo.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(()=>{apply();mo.disconnect();},12000);
})();