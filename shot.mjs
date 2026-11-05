import { chromium } from '/home/user/prospector/clotilde-carta/node_modules/playwright/index.mjs';
import { existsSync } from 'node:fs';
const exe=['/opt/pw-browsers/chromium-1194/chrome-linux/chrome','/opt/pw-browsers/chromium'].find(existsSync);
const b=await chromium.launch({executablePath:exe,args:['--no-sandbox']});
for(const [tag,vp,mob] of [['d',{width:1440,height:900},false],['m',{width:390,height:844},true]]){
  const c=await b.newContext({viewport:vp,isMobile:mob,deviceScaleFactor:1,locale:'es-AR'});const p=await c.newPage();
  const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
  await p.goto('http://localhost:4400/',{waitUntil:'networkidle'});await p.waitForTimeout(1500);
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);console.log(tag,'altura',H);
  const marks=tag==='d'?[0,.07,.12,.2,.3,.4,.5,.58,.66,.75,.85,.95,1]:[0,.1,.25,.4,.55,.7,.85,1];
  let i=0;for(const f of marks){await p.evaluate(y=>scrollTo(0,y),Math.round((H-vp.height)*f));await p.waitForTimeout(1300);await p.screenshot({path:`/tmp/s-${tag}-${String(i++).padStart(2,'0')}.png`});}
  console.log(tag,'errores',errs);await c.close();
}
await b.close();
