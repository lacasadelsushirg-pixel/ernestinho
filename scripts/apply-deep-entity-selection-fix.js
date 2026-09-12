const fs=require('fs');
const file='index.html';
let s=fs.readFileSync(file,'utf8');
const old=" const [selected,setSelected]=useState(null);\n const configs={\n  playas:{title:'Playas reales del Master 3'";
const replacement=` const [selected,setSelected]=useState(()=>{\n  const routeData={\n   playas:PLAYAS_DETALLADAS_DATA, centros:CENTROS_CULTURALES_DATA, teatros:TEATROS_DATA, iglesias:IGLESIAS_DATA,\n   gastronomia:GASTRONOMIA_DATA, noche:VIDA_NOCTURNA_DATA, ferias:FEIRAS_COMPRAS_DATA, mercados:MERCADOS_COMPRAS_DATA, shoppings:SHOPPINGS_DATA\n  };\n  const routeRoot={playas:'playas',centros:'centros-culturales',teatros:'teatros',iglesias:'iglesias',gastronomia:'gastronomia',noche:'vida-nocturna',ferias:'compras',mercados:'compras',shoppings:'compras'};\n  const data=Array.isArray(routeData[kind])?routeData[kind]:[];\n  const root=routeRoot[kind];\n  const path=seoCleanPath(window.location.pathname);\n  if(!root||!path.startsWith('/'+root+'/')) return null;\n  const slug=path.split('/').filter(Boolean).pop()||'';\n  return data.find(x=>{\n   const rawId=x&&(x.id||x.slug||x.canonicalId);\n   const rawName=x&&(x.nombre||x.name||x.titulo||x.title);\n   return (rawId&&seoSlug(String(rawId))===slug)||(rawName&&seoSlug(String(rawName))===slug);\n  })||null;\n });\n const configs={\n  playas:{title:'Playas reales del Master 3'`;
if(s.includes('const routeData={\n   playas:PLAYAS_DETALLADAS_DATA')){console.log('deep entity selection already applied');process.exit(0)}
if(!s.includes(old)) throw new Error('Master4LegacyDataHub selected-state anchor not found');
s=s.replace(old,replacement);
fs.writeFileSync(file,s,'utf8');
console.log('Applied direct deep-entity selection for legacy catalog routes');
