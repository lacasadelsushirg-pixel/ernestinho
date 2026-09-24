const esbuild=require('esbuild'),fs=require('fs'),path=require('path');
const out=path.resolve(__dirname,'../assets/vendor');fs.mkdirSync(out,{recursive:true});
async function build(){
 await esbuild.build({stdin:{contents:"import React from 'react'; window.React=React;",resolveDir:process.cwd()},bundle:true,minify:true,format:'iife',platform:'browser',outfile:path.join(out,'react.js')});
 await esbuild.build({stdin:{contents:"import * as ReactDOM from 'react-dom/client'; window.ReactDOM=ReactDOM;",resolveDir:process.cwd()},bundle:true,minify:true,format:'iife',platform:'browser',outfile:path.join(out,'react-dom.js')});
 await esbuild.build({stdin:{contents:"import {createIcons,icons} from 'lucide'; window.lucide={createIcons,icons,...icons};",resolveDir:process.cwd()},bundle:true,minify:true,format:'iife',platform:'browser',outfile:path.join(out,'lucide.js')});
 for(const f of ['react.js','react-dom.js','lucide.js']){const n=fs.statSync(path.join(out,f)).size;if(!n)throw Error(f+' empty');console.log(f,n);}
}build().catch(e=>{console.error(e);process.exit(1)});