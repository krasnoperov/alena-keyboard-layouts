/* Optional authoring tool: install Playwright and its Chromium browser to render. */
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('fs');const path=require('path');
(async()=>{
 const short=process.argv.includes('--short');
 const out=path.resolve(process.env.TYPING_FRAMES_DIR||'dist/typing-frames'+(short?'-short':''));fs.mkdirSync(out,{recursive:true});
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1040,height:short?832:970}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto((process.env.TYPING_DEMO_URL||'http://127.0.0.1:8769/typing-story.html')+'?render=1'+(short?'&short=1':''));await p.evaluate(()=>storyReady);if(errors.length)throw Error(errors.join('\n'));
 const frames=await p.evaluate(()=>storyFrames);
 for(let i=0;i<frames.length;i++){await p.evaluate(i=>showStoryFrame(i),i);await p.screenshot({path:path.join(out,String(i).padStart(3,'0')+'.png')});}
 fs.writeFileSync(path.join(out,'frames.json'),JSON.stringify(frames));
 console.log(`${short?'Teaser':'Full video'}: ${frames.length} frames, ${frames.reduce((s,f)=>s+f.duration,0)/1000}s. Outputs checked against XML.`);await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
