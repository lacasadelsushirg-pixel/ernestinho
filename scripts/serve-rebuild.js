const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..'),PORT=4173;
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon'};
const sitemap=fs.readFileSync(path.join(ROOT,'sitemap.xml'),'utf8');
const valid=new Set(['/','/quiero',...[...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map(m=>{let p=m[1]||'/';return p.replace(/\/$/,'')||'/';})]);
function send(res,status,file){const ext=path.extname(file);res.writeHead(status,{'Content-Type':mime[ext]||'application/octet-stream','Cache-Control':'no-store'});fs.createReadStream(file).pipe(res);}
http.createServer((req,res)=>{let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname)}catch{return res.writeHead(400).end('Bad request')}
 const rel=pathname.replace(/^\/+/,''),candidate=path.resolve(ROOT,rel);
 if(rel&&candidate.startsWith(ROOT+path.sep)&&fs.existsSync(candidate)&&fs.statSync(candidate).isFile())return send(res,200,candidate);
 const clean=pathname.replace(/\/$/,'')||'/'; if(valid.has(clean))return send(res,200,path.join(ROOT,'index.html'));
 res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Not found');
}).listen(PORT,'127.0.0.1',()=>console.log('rebuild server http://127.0.0.1:'+PORT));