/* Ernestinho header QA fix · 2026-09-22 */
(function(){
  function norm(s){return (s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
  function apply(){
    const header=document.querySelector('header');
    if(!header) return;
    header.querySelectorAll('nav button').forEach(b=>{const t=norm(b.textContent);if(t==='eventos'||t==='grandes eventos'||t==='playas') b.remove();});
    header.querySelectorAll('button').forEach(b=>{const t=norm(b.textContent);if(t==='grandes eventos'||t==='playas') b.remove();});
    const langs=[...header.querySelectorAll('[aria-label="Idioma / Language"]')];
    if(langs.length>1){
      const desktop=langs.find(el=>el.classList.contains('xl:flex')||el.className.includes('hidden xl:flex'));
      if(desktop) desktop.remove();
      const remaining=[...header.querySelectorAll('[aria-label="Idioma / Language"]')][0];
      if(remaining){
        const row=remaining.parentElement&&remaining.parentElement.parentElement;
        if(row){row.classList.remove('xl:hidden');row.style.display='block';}
      }
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  const mo=new MutationObserver(apply); mo.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(()=>{apply();mo.disconnect();},12000);
})();