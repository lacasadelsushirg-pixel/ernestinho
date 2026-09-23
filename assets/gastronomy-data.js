// Gastronomía: catálogo liviano. Las 173 fichas completas se cargan bajo demanda.
window.GASTRONOMIA_NUEVAS_HTML=window.GASTRONOMIA_NUEVAS_HTML||{};
fetch('/data/gastronomia/catalogo.json',{cache:'force-cache'}).then(r=>{if(!r.ok)throw Error('gastronomia catalogo '+r.status);return r.json()}).then(x=>{window.GASTRONOMIA_NUEVAS_CARDS=x.cards||[];window.GASTRONOMIA_DETAIL_URLS=x.details||{};window.dispatchEvent(new CustomEvent('ec:gastro-ready'));}).catch(e=>console.error('EC gastronomy catalog',e));
