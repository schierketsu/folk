import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const dir=path.dirname(fileURLToPath(import.meta.url));
const code=await readFile(path.join(dir,'..','code.js'),'utf8');
const block=code.match(/\/\/ <generated:app-frames>[\s\S]*?\/\/ <\/generated:app-frames>/)?.[0];
if(!block)throw new Error('App frames block missing');
class Node {
  constructor(type){this.type=type;this.children=[];this.width=0;this.height=0;this.x=0;this.y=0;}
  appendChild(child){this.children.push(child);child.parent=this;}
  resize(w,h){if(!(w>0&&h>0))throw new Error(`Invalid ${this.type} size: ${w}×${h}`);this.width=w;this.height=h;}
}
const figma={
  createRectangle:()=>new Node('RECTANGLE'),createEllipse:()=>new Node('ELLIPSE'),
  createFrame:()=>new Node('FRAME'),createLine:()=>new Node('LINE'),createText:()=>new Node('TEXT'),
  createImage:()=>({hash:'test-image'}),base64Decode:()=>new Uint8Array([0]),
  setCurrentPageAsync:async()=>{},
};
const asset={};for(const name of ['MASCOT_PNG','PLACE_CARD_PNG','PLACE_MAP_PNG','CHEST_PNG','COUNTER_ICON_PNG'])asset[name]=new Proxy({},{get:()=>'AA=='});
const context={figma,console,...asset};vm.createContext(context);
vm.runInContext(block+'\nglobalThis.appFrames=APP_FRAMES;',context,{timeout:10000});
const page=new Node('PAGE');
const result=await context.appFrames.build(page,{regular:{family:'Inter',style:'Regular'},bold:{family:'Inter',style:'Bold'}});
if(result.frames!==124)throw new Error(`Expected 124 frames, got ${result.frames}`);
if(page.children.length!==1||page.children[0].name!=='ФОЛК · Приложение')throw new Error('Wrong page root');
const frames=page.children[0].children.filter(n=>n.type==='FRAME');
if(frames.some(n=>n.width!==375||n.height!==812))throw new Error('Wrong mobile frame size');
if(new Set(frames.map(n=>n.name)).size!==124)throw new Error('Duplicate frame names');
console.log(`OK: ${result.frames} frames, ${result.layers} editable layers`);
