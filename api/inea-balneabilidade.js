const PAGE='https://www.inea.rj.gov.br/ar-agua-e-solo/balneabilidade-das-praias/';
module.exports=async function handler(req,res){
 try{
  const page=await fetch(PAGE,{headers:{'user-agent':'Mozilla/5.0 ErnestinhoCarioca/1.0'}});
  if(!page.ok) throw new Error('INEA page '+page.status);
  const html=await page.text();
  const links=[...html.matchAll(/href=["']([^"']+)["']/gi)].map(m=>m[1].replace(/&amp;/g,'&'));
  let url=links.find(u=>/balneabilidade/i.test(u)&&/\.xlsx?(\?|$)/i.test(u)) || links.find(u=>/\.xlsx?(\?|$)/i.test(u));
  if(!url) throw new Error('No se encontró el XLS/XLSX de datos brutos del INEA');
  url=new URL(url,PAGE).href;
  const f=await fetch(url,{headers:{'user-agent':'Mozilla/5.0 ErnestinhoCarioca/1.0'}});
  if(!f.ok) throw new Error('INEA file '+f.status);
  const buf=Buffer.from(await f.arrayBuffer());
  res.setHeader('Content-Type',f.headers.get('content-type')||'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Cache-Control','s-maxage=21600, stale-while-revalidate=3600');
  res.setHeader('X-Source-Url',url);
  res.setHeader('X-Source-Updated',f.headers.get('last-modified')||new Date().toUTCString());
  return res.status(200).send(buf);
 }catch(e){return res.status(502).json({error:'INEA unavailable',detail:String(e.message||e)});}
}
