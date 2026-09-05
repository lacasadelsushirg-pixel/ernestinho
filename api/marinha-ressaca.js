const SOURCE='https://www.marinha.mil.br/chm/dados-do-smm-avisos-de-mau-tempo/avisos-de-mau-tempo';
module.exports=async function handler(req,res){
 try{
  const r=await fetch(SOURCE,{headers:{'user-agent':'Mozilla/5.0 ErnestinhoCarioca/1.0'}});
  if(!r.ok) throw new Error('CHM '+r.status);
  const html=await r.text();
  const text=html.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&[a-z#0-9]+;/gi,' ').replace(/\s+/g,' ').trim();
  const warnings=[...text.matchAll(/AVISO DE RESSACA[\s\S]{0,700}?(?=AVISO NR|ÁREA |AREA |$)/gi)].map(m=>m[0]);
  const rio=w=>/(SANTOS\/SP[^.]{0,160}(ARRAIAL DO CABO|CABO FRIO)\/RJ|RIO DE JANEIRO|CABO FRIO\/RJ|ARRAIAL DO CABO\/RJ)/i.test(w);
  const relevant=warnings.filter(rio);
  const ressaca=relevant.length>0;
  const summary=ressaca ? relevant[0].replace(/\s+/g,' ').slice(0,420) : 'No se detectó en la página de avisos vigentes del CHM un aviso de ressaca que mencione la costa de Río en el patrón monitorizado.';
  res.setHeader('Cache-Control','s-maxage=1800, stale-while-revalidate=900');
  return res.status(200).json({ressaca,level:ressaca?'warning':'clear',summary,checkedAt:new Date().toISOString(),source:SOURCE,warningCount:relevant.length});
 }catch(e){return res.status(502).json({ressaca:null,level:'unknown',summary:'No fue posible leer CHM.',checkedAt:new Date().toISOString(),source:SOURCE,error:String(e.message||e)});}
}
