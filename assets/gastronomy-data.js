// Gastronomía: catálogo liviano. Las 173 fichas completas se cargan bajo demanda.
window.GASTRONOMIA_NUEVAS_CARDS=window.GASTRONOMIA_NUEVAS_CARDS||[];
window.GASTRONOMIA_DETAIL_URLS=window.GASTRONOMIA_DETAIL_URLS||{};
window.__ecGastronomyReady=window.__ecGastronomyReady||fetch('/data/gastronomia/catalogo.json',{cache:'force-cache'})
 .then(r=>{if(!r.ok)throw Error('gastronomia catalogo '+r.status);return r.json()})
 .then(x=>{window.GASTRONOMIA_NUEVAS_CARDS=x.cards||[];window.GASTRONOMIA_DETAIL_URLS=x.details||{};window.dispatchEvent(new CustomEvent('ec:gastro-ready'));return x;})
 .catch(e=>{console.error('EC gastronomy catalog',e);return {cards:window.GASTRONOMIA_NUEVAS_CARDS,details:window.GASTRONOMIA_DETAIL_URLS};});
