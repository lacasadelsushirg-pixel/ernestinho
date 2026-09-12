const fs=require('fs');
const s=fs.readFileSync('index.html','utf8');
const needles=['function Master4LegacyDataHub','GASTRONOMIA_DATA','seccionActual === \'master4_gastronomia_real\'','kind="gastronomia"','gastronomia_real'];
let out='';
for(const n of needles){
  let from=0,i;
  while((i=s.indexOf(n,from))!==-1){
    out+='\n\n===== '+n+' @ '+i+' =====\n'+s.slice(Math.max(0,i-2500),Math.min(s.length,i+9000));
    from=i+n.length;
    if(out.length>120000) break;
  }
}
fs.writeFileSync('gastro-diagnostic-snippets.txt',out);
console.log('wrote',out.length,'chars');
