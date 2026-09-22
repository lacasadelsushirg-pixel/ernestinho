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
          if(!digits || digits===EC_WA || /5521969946938$/.test(digits)){
            const text=u.searchParams.get('text');
            a.href='https://wa.me/'+EC_WA+(text?'?text='+encodeURIComponent(text):'');
          }
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

/* Ruta /quiero integrada en la SPA principal · 2026-09-22 */
(function(){
  function route(){
    return (location.pathname||'/').replace(/\/+$/,'')||'/';
  }
  function esc(s){
    return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});
  }
  function mountQuiero(){
    if(route()!=='/quiero') return;
    if(document.getElementById('ec-quiero-route')) return;
    const root=document.getElementById('root')||document.querySelector('main')||document.body;
    if(!root) return;
    const section=document.createElement('section');
    section.id='ec-quiero-route';
    section.setAttribute('data-ec-route','quiero');
    section.innerHTML=`
      <style>
        #ec-quiero-route{min-height:100vh;background:#071715;color:#f7f3e8;padding:112px 20px 64px;font-family:inherit}
        #ec-quiero-route .ecq{max-width:980px;margin:auto}
        #ec-quiero-route .tag{color:#e5ae49;font-weight:800;letter-spacing:.12em;text-transform:uppercase;font-size:.78rem}
        #ec-quiero-route h1{font-size:clamp(2.2rem,7vw,4.8rem);line-height:.96;margin:14px 0 18px}
        #ec-quiero-route .lead{font-size:clamp(1.05rem,2.5vw,1.3rem);line-height:1.65;max-width:760px;color:#d9ded9}
        #ec-quiero-route .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin:34px 0}
        #ec-quiero-route .card{background:#0d2420;border:1px solid #24443c;border-radius:20px;padding:22px}
        #ec-quiero-route .n{color:#e5ae49;font-weight:900;font-size:.8rem}
        #ec-quiero-route h2{font-size:1.25rem;margin:7px 0 8px}
        #ec-quiero-route p{line-height:1.55}
        #ec-quiero-route .note{border-left:3px solid #e5ae49;padding:12px 16px;background:#0b211d;border-radius:0 14px 14px 0;margin-top:28px}
        #ec-quiero-route .back{display:inline-block;margin-top:28px;color:#071715;background:#e5ae49;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:900}
      </style>
      <div class="ecq">
        <div class="tag">Ernestinho Carioca · Río por tu cuenta</div>
        <h1>Haz este recorrido caminando</h1>
        <p class="lead">Una ruta sencilla para conocer parte del Centro y la zona portuaria de Río a tu ritmo. Te dejo el orden para que no tengas que improvisar y puedas ir disfrutando cada parada.</p>
        <div class="grid">
          <article class="card"><div class="n">PARADA 01</div><h2>Praça Mauá</h2><p>Empieza en el corazón de la zona portuaria, frente a la bahía. Es el mejor punto para orientarte antes de seguir caminando.</p></article>
          <article class="card"><div class="n">PARADA 02</div><h2>Museu do Amanhã</h2><p>Recorre el exterior del museo y su paseo junto al agua. Si quieres entrar, reserva tiempo adicional para la visita.</p></article>
          <article class="card"><div class="n">PARADA 03</div><h2>Mural Etnias</h2><p>Sigue por el Boulevard Olímpico hasta el enorme mural de Eduardo Kobra, uno de los puntos más fotografiados del puerto.</p></article>
          <article class="card"><div class="n">PARADA 04</div><h2>Pedra do Sal</h2><p>Entra en la Pequeña África y conoce uno de los lugares fundamentales de la historia del samba y de la cultura negra carioca.</p></article>
          <article class="card"><div class="n">PARADA 05</div><h2>Cais do Valongo</h2><p>Una parada histórica imprescindible. Recorre este lugar con respeto: forma parte de la memoria de la diáspora africana en Río.</p></article>
          <article class="card"><div class="n">PARADA 06</div><h2>Centro histórico</h2><p>Desde aquí puedes continuar hacia el Centro y combinar la caminata con Praça XV, Cinelândia o Lapa según el tiempo que tengas.</p></article>
        </div>
        <div class="note"><strong>Mi consejo:</strong> hazlo con luz de día, calzado cómodo y sin apurarte. Río se entiende mucho mejor cuando también lo recorres caminando.</div>
        <a class="back" href="/">Volver a Ernestinho Carioca</a>
      </div>`;
    root.replaceChildren(section);
    document.title='Recorrido por tu cuenta en Río | Ernestinho Carioca';
    let canonical=document.querySelector('link[rel="canonical"]');
    if(!canonical){ canonical=document.createElement('link'); canonical.rel='canonical'; document.head.appendChild(canonical); }
    canonical.href='https://www.ernestinhocarioca.com.br/quiero';
    window.scrollTo(0,0);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mountQuiero,{once:true}); else mountQuiero();
  setTimeout(mountQuiero,250);
  setTimeout(mountQuiero,1200);
})();
