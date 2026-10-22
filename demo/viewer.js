/* Apple Magic Keyboard US ANSI proportions; labels parsed from .keylayout in the browser. */
const rows = [
 [[50,'`',1],[18,'1',1],[19,'2',1],[20,'3',1],[21,'4',1],[23,'5',1],[22,'6',1],[26,'7',1],[28,'8',1],[25,'9',1],[29,'0',1],[27,'-',1],[24,'=',1],['back','delete',1.5]],
 [['tab','tab',1.5],[12,'Q',1],[13,'W',1],[14,'E',1],[15,'R',1],[17,'T',1],[16,'Y',1],[32,'U',1],[34,'I',1],[31,'O',1],[35,'P',1],[33,'[',1],[30,']',1],[42,'\\',1]],
 [['caps','caps lock',1.75],[0,'A',1],[1,'S',1],[2,'D',1],[3,'F',1],[5,'G',1],[4,'H',1],[38,'J',1],[40,'K',1],[37,'L',1],[41,';',1],[39,"'",1],['return','return',1.75]],
 [['shift','shift',2.25],[6,'Z',1],[7,'X',1],[8,'C',1],[9,'V',1],[11,'B',1],[45,'N',1],[46,'M',1],[43,',',1],[47,'.',1],[44,'/',1],['shift2','shift',2.25]],
 [['fn','fn',1],['control','control',1],['option','option',1],['command','command',1.25],['space','space',5],['command2','command',1.25],['option2','option',1],['left','◂',1],['vertical','',1],['right','▸',1]]
];
let variant='direct', language='English', selected='base', held=null, composition=null, lastResult='';
const names={base:'None',shift:'Shift',option:'Option',optionShift:'Option + Shift',command:'Command',control:'Control'};
const escapeXML=s=>String(s).replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
function render(){
 if(!LAYOUTS[variant]?.[language]?.base)return;
 const layer=held||selected;
 const shownLayer=language==='English'&&layer==='control'?'base':layer;
 const map=LAYOUTS[variant][language][shownLayer];
 const other=LAYOUTS[variant][language==='English'?'Russian':'English'][shownLayer];
 let svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1084 446" role="group" aria-labelledby="keyboard-title"><title id="keyboard-title">'+escapeXML(language+' Es '+names[layer])+'</title><defs><linearGradient id="aluminum" x2="0" y2="1"><stop stop-color="#d8d9db"/><stop offset="1" stop-color="#bfc1c4"/></linearGradient><linearGradient id="keycap" x2="0" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#f2f3f5"/></linearGradient></defs><rect x="1" y="1" width="1082" height="444" rx="34" fill="url(#aluminum)" stroke="#a3a6aa"/>';
 const font='-apple-system,BlinkMacSystemFont,Arial,sans-serif';
 const text=(x,y,t,size=14,fill='#60636a',anchor='middle')=>'<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" fill="'+fill+'" font-size="'+size+'" font-family="'+font+'">'+escapeXML(t)+'</text>';
 function key(x,y,w,h,fill='url(#keycap)') {
   // Only the outside corner follows the aluminum shell's larger radius.
   const r=[7,7,7,7];
   if(y===13&&x===11)r[0]=25;
   if(y===13&&x===1010)r[1]=25;
   if(y===373&&x===11)r[3]=25;
   if(y===373&&x>1000)r[2]=25;
   const [tl,tr,br,bl]=r;
   const d=`M${x+tl} ${y}H${x+w-tr}A${tr} ${tr} 0 0 1 ${x+w} ${y+tr}V${y+h-br}A${br} ${br} 0 0 1 ${x+w-br} ${y+h}H${x+bl}A${bl} ${bl} 0 0 1 ${x} ${y+h-bl}V${y+tl}A${tl} ${tl} 0 0 1 ${x+tl} ${y}Z`;
   return `<path d="${d}" transform="translate(0 1.5)" fill="#777b82"/><path d="${d}" fill="${fill}" stroke="#8e9298" stroke-width="1.2"/>`;
 }
 // Full-height function row and circular Touch ID follow the compact Magic Keyboard.
 svg+=key(11,13,101,61)+text(27,61,'esc',13,'#656870','start');
 const icons=[
 '<circle r="4"/>'+Array.from({length:8},(_,i)=>'<path transform="rotate('+i*45+')" d="M0 -7v-2"/>').join(''),
 '<circle r="5"/>'+Array.from({length:8},(_,i)=>'<path transform="rotate('+i*45+')" d="M0 -8v-3"/>').join(''),
 '<rect x="-10" y="-7" width="9" height="14" rx="1"/><rect x="2" y="-7" width="8" height="5" rx="1"/><rect x="2" y="1" width="8" height="6" rx="1"/>',
 '<circle cx="-2" cy="-2" r="6"/><path d="M2 2l7 7"/>',
 '<rect x="-3" y="-9" width="6" height="12" rx="3"/><path d="M-6 -2v2a6 6 0 0 0 12 0v-2M0 6v4m-3 0h6"/>',
 '<path d="M5 -9a10 10 0 1 0 6 15A10 10 0 0 1 5 -9Z"/>',
 '<path d="M0 -5l-8 5 8 5Zm9 0L1 0l8 5Z"/>',
 '<path d="M-7 -6v12l8 -6ZM5 -6v12M9 -6v12"/>',
 '<path d="M0 -5l8 5 -8 5Zm-9 0L-1 0l-8 5Z"/>',
 '<path d="M4 -5l-8 3h-4v4h4l8 3Z"/>',
 '<path d="M0 -6l-7 4h-4v4h4l7 4ZM4 -4a6 6 0 0 1 0 8"/>',
 '<path d="M-2 -6l-7 4h-3v4h3l7 4ZM2 -4a6 6 0 0 1 0 8M6 -7a10 10 0 0 1 0 14"/>'
 ];
 for(let i=0;i<12;i++){const x=122+i*74;svg+=key(x,13,64,61)+'<g transform="translate('+(x+32)+' 34)" fill="none" stroke="#777b82" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round">'+icons[i]+'</g>'+text(x+32,64,'F'+(i+1),9);}
 svg+=key(1010,13,64,61)+'<circle cx="1042" cy="43.5" r="19" fill="none" stroke="#9da1a7" stroke-width="1.3"/>';
 rows.forEach((row,ri)=>{let x=11;const y=85+ri*72;row.forEach(([code,physical,units])=>{
 const w=units*74-10, character=typeof code==='number';
 const entry=map[String(code)]||{text:'',dead:false};
 const composed=composition?resolveKey(entry,composition.state):null;
 const supported=Boolean(composition&&entry.compositions?.[composition.state]);
 const shared=character&&layer.startsWith('option')&&entry.text===other?.[String(code)]?.text&&!entry.dead;
 const active=!character&&((code.startsWith('shift')&&['shift','optionShift'].includes(layer))||(code.startsWith('option')&&['option','optionShift'].includes(layer))||(code.startsWith('command')&&layer==='command')||(code==='control'&&layer==='control'));
 const fill=active?'#185c45':supported?'#dcece2':entry.dead?'#f0ddb7':shared?'#dcece2':'url(#keycap)';
 const modifier=!character&&/^(shift|option|command|control)/.test(code)?code.replace(/2$/,''):null;
 svg+=code==='fn'?'<g data-key="fn" data-globe="true" role="button" tabindex="0" aria-label="Switch input source" class="globe-key">':character||code==='space'?'<g data-code="'+(code==='space'?49:code)+'" data-key="char-'+code+'" role="button" tabindex="0" aria-label="'+escapeXML((composed?.text||entry.text||'Space')+(entry.dead?' dead key':''))+'" class="output-key">':modifier?'<g data-key="'+code+'" data-modifier="'+modifier+'" role="button" tabindex="0" aria-label="Toggle '+modifier+'" aria-pressed="'+active+'" class="modifier-key">':'<g>';
 if(code==='vertical') {
   svg+=key(x,y,w,28)+text(x+w/2,y+20,'▴',14)+key(x,y+33,w,28)+text(x+w/2,y+53,'▾',14);
 } else {
 svg+=key(x,y,w,61,fill);
 if(character){
 const label=composed?(composed.text||(composed.next?entry.text:'')):entry.text;
 // Display only this source's current output; no secondary US legends.
 svg+=text(x+w/2,y+39,label,label.length>2?16:25,'#33383e');
 if(entry.dead)svg+='<circle cx="'+(x+w-9)+'" cy="'+(y+11)+'" r="3" fill="#a56d1e"/>';
 } else if(code==='space') {
 if(composition)svg+=text(x+w/2,y+39,resolveKey(map['49'],composition.state).text,24,'#33383e');
 } else if(['left','right'].includes(code)) svg+=text(x+w/2,y+37,physical,17);
 else {
 const white=active?'#fff':'#686b72';
 const symbols={fn:'',control:'⌃',option:'⌥',option2:'⌥',command:'⌘',command2:'⌘'};
 if(code==='fn'||symbols[code]){
 const right=code.endsWith('2');
 svg+=text(right?x+w-14:x+14,y+24,symbols[code],18,white,right?'end':'start');
 if(code==='fn'){svg+='<g transform="translate('+(x+23)+' '+(y+39)+')" fill="none" stroke="#777b82" stroke-width="1"><circle r="7"/><ellipse rx="3" ry="7"/><path d="M-7 0h14M-6 -3h12M-6 3h12"/></g>';}else svg+=text(x+w/2,y+48,physical,12,white);
 } else {
 const right=code==='back'||code==='return'||code==='shift2';
 svg+=text(right?x+w-14:x+14,y+47,physical,13,white,right?'end':'start');
 if(code==='caps')svg+='<circle cx="'+(x+12)+'" cy="'+(y+13)+'" r="2" fill="#8c9195"/>';
 }
 }
 }
 svg+='</g>';x+=units*74;
 });});
 const focusKey=document.activeElement?.dataset?.key;
 document.querySelector('#keyboard').innerHTML=svg+'</svg>';
 if(focusKey)document.querySelector('[data-key="'+focusKey+'"]')?.focus({preventScroll:true});
 document.getElementById('green-legend').textContent=composition?'Accent combinations':'Shared symbols';
 const status=document.getElementById('composition-status');
 status.textContent=composition?LAYOUT_MODELS[variant][language].terminators[composition.state]+' — choose a letter. Shift for uppercase; Esc to cancel.':'Click keys to preview. Amber keys start an accent.';
 document.getElementById('cancel-composition').hidden=!composition;
 document.querySelector('#layout-source').href='https://github.com/krasnoperov/macos-multilingual-layouts/blob/main/layouts/'+variant+'/'+(variant==='direct'?'Mac-Layouts-Direct.bundle':'Mac-Layouts-DeadKeys.bundle')+'/Contents/Resources/'+encodeURIComponent(language+' Es.keylayout');
 document.querySelector('#state').textContent=language+' Es · '+(variant==='direct'?'Direct':'Dead Keys')+' · '+names[layer];
 for(const [id,value] of [['variants',variant],['languages',language]])document.querySelectorAll('#'+id+' button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.value===value)));
}
for(const id of ['variants','languages'])document.getElementById(id).addEventListener('click',e=>{if(!e.target.matches('button'))return;const value=e.target.dataset.value;if(id==='variants'){variant=value;composition=null;lastResult='';}if(id==='languages'){language=value;composition=null;lastResult='';}held=null;render();});
function isTyping(e){return e.target instanceof HTMLElement&&Boolean(e.target.closest('input,textarea,[contenteditable="true"]'));}
function modifiers(e){
 // Let the native text control handle its own input, selection and IME lifecycle.
 if(isTyping(e))return;
 const next=e.ctrlKey?'control':e.metaKey?'command':e.altKey?(e.shiftKey?'optionShift':'option'):e.shiftKey?'shift':null;
 if(held!==next){held=next;render();}
}
window.addEventListener('keydown',e=>{
 if(isTyping(e))return;
 if(e.key==='Escape'){composition=null;lastResult='';render();return;}
 if((e.key==='Enter'||e.key===' ')&&e.target.closest?.('[data-modifier],[data-code],[data-globe]'))return;
 modifiers(e);
});
window.addEventListener('keyup',modifiers);
window.addEventListener('blur',()=>{if(held){held=null;render();}});
function recordPress(source,key,output){
 document.getElementById('press-source').textContent=source;
 document.getElementById('pressed-key').textContent=key;
 document.getElementById('pressed-output').textContent=output||'—';
}
let nativeChord='';
window.addEventListener('keydown',e=>{
 const labels={Alt:'⌥ Option',Shift:'⇧ Shift',Meta:'⌘ Command',Control:'⌃ Control',Escape:'Escape',Backspace:'Delete',Enter:'Return', ' ':'Space'};
 const unavailable=value=>!value||['Unidentified','Process','Undefined','undefined'].includes(value);
 const physical=unavailable(e.code)?'':e.code.replace(/^Key|^Digit/,'');
 const character=unavailable(e.key)||e.key==='Dead'?'':e.key;
 const mods=[e.ctrlKey?'⌃':'',e.altKey?'⌥':'',e.shiftKey?'⇧':'',e.metaKey?'⌘':''].filter(Boolean).join(' ');
 nativeChord=labels[e.key]||[mods,physical||character].filter(Boolean).join(' + ')||'Input';
 // Some macOS/WebView composition events have no usable key identifier.
 // Wait for input/compositionend instead of displaying a browser sentinel.
 if(unavailable(e.key))return;
 if(e.key==='Dead')recordPress('KEYBOARD · macOS',nativeChord,'Dead key…');
 else if(['Alt','Shift','Meta','Control'].includes(e.key))recordPress('KEYBOARD · macOS',nativeChord,'—');
 else if(e.ctrlKey||e.metaKey)recordPress('KEYBOARD · macOS',nativeChord,'Shortcut');
 else if(e.target.id!=='typing-test'&&!e.isComposing)recordPress('KEYBOARD · macOS',nativeChord,e.key.length===1?(e.key===' '?'Space':e.key):labels[e.key]||e.key);
});
const typingTest=document.getElementById('typing-test');
typingTest.addEventListener('focus',()=>{if(held){held=null;render();}});
typingTest.addEventListener('input',e=>{
 if(e.isComposing)return;
 const inserted=e.data??(e.inputType?.startsWith('delete')?'Delete':typingTest.value);
 recordPress('KEYBOARD · macOS',nativeChord||'Input',inserted===' '?'Space':inserted);
});
typingTest.addEventListener('compositionend',e=>recordPress('KEYBOARD · macOS',nativeChord,e.data));
function resolveKey(entry,state){
 if(!entry)return {text:'',next:null};
 if(!state)return {text:entry.dead?'':entry.text,next:entry.next};
 const match=entry.compositions?.[state];
 if(match)return match;
 const prefix=LAYOUT_MODELS[variant][language].terminators[state]||'';
 return {text:prefix+(entry.dead?'':entry.text),next:entry.next};
}
function pressKey(code){
 const layer=held||selected;
 const map=LAYOUTS[variant][language][language==='English'&&layer==='control'?'base':layer];
 const entry=map[code];if(!entry)return;
 const physical=rows.flat().find(key=>String(key[0])===String(code))?.[1]||'Space';
 const gesture=(layer==='base'?'':names[layer]+' + ')+physical;
 const result=resolveKey(entry,composition?.state);
 const sequence=composition?composition.sequence+', then '+gesture:gesture;
 recordPress('DEMO · '+(variant==='direct'?'Direct':'Dead Keys'),gesture,result.next?(LAYOUT_MODELS[variant][language].terminators[result.next]||'Accent')+' …':result.text===' '?'Space':result.text);
 if(result.next){
   composition={state:result.next,sequence};
   lastResult='';selected='base';held=null;
 }else{
   lastResult=sequence+' → '+(result.text===' '?'Space':result.text||'(no character)');
   composition=null;
 }
 render();
}
document.getElementById('cancel-composition').addEventListener('click',()=>{composition=null;lastResult='';render();});
function switchSource(){
 language=language==='English'?'Russian':'English';composition=null;lastResult='';held=null;
 recordPress('DEMO · GLOBE','Switch source',language==='English'?'Latin':'RU');render();
}
function toggleModifier(key){
 recordPress('DEMO · MODIFIER',names[key],'—');
 const flags=new Set(selected==='optionShift'?['option','shift']:selected==='base'?[]:[selected]);
 if(key==='command'||key==='control'){
   selected=selected===key?'base':key;
 }else{
   flags.delete('command');flags.delete('control');
   if(flags.has(key))flags.delete(key);else flags.add(key);
   selected=flags.has('option')?(flags.has('shift')?'optionShift':'option'):flags.has('shift')?'shift':'base';
 }
 held=null;render();
}
document.getElementById('keyboard').addEventListener('click',e=>{
 const key=e.target.closest('[data-modifier],[data-code],[data-globe]');if(!key)return;if(key.dataset.globe)switchSource();else if(key.dataset.modifier)toggleModifier(key.dataset.modifier);else pressKey(key.dataset.code);
});
document.getElementById('keyboard').addEventListener('keydown',e=>{
 const key=e.target.closest('[data-modifier],[data-code],[data-globe]');
 if(key&&(e.key==='Enter'||e.key===' ')){
   e.preventDefault();const id=key.dataset.key;if(key.dataset.globe)switchSource();else if(key.dataset.modifier)toggleModifier(key.dataset.modifier);else pressKey(key.dataset.code);
   document.querySelector(`[data-key="${id}"]`)?.focus({preventScroll:true});
 }
});
layoutsReady.then(render).catch(error=>{
 document.getElementById('state').textContent='Unable to load layout files';
 document.getElementById('composition-status').textContent=error.message;
});


function setupPrompt(style){
 if(style==='custom')return designPrompt();
 const name=style==='direct'?'Direct':'Dead Keys';
 const repo='https://github.com/krasnoperov/macos-multilingual-layouts';
 const raw='https://raw.githubusercontent.com/krasnoperov/macos-multilingual-layouts/main';
 return `Install the ${name} multilingual keyboard layout on my Mac and help me configure it.

Download this package:
${repo}/releases/download/v1.0.0/Mac-Layouts-${style==='direct'?'Direct':'DeadKeys'}-v1.0.0.zip

First read the installation and macOS setup instructions:
${raw}/README.md
${raw}/docs/macos-settings.md
${raw}/docs/key-guide.md

Inspect my current keyboard layouts and input-source settings, and back up anything you change. Verify the ZIP against the v1.0.0 release checksums. Install only ${style==='direct'?'Mac-Layouts-Direct.bundle':'Mac-Layouts-DeadKeys.bundle'}, with one installed copy. Move any old AlenaEspanol.bundle or alternative keyboard-layout bundle out of both Keyboard Layouts folders before installing the replacement. Preserve the bundle and source identifiers and the macOS display names English Es / Russian Es. Enable English Es and Russian Es; avoid duplicate sources and remove ABC only when macOS allows the custom layouts to replace it.

Help me set Cmd+Space for language switching without a Spotlight conflict, configure Globe switching, and hide the cursor-side language indicator while keeping the menu-bar icon, following the guide and the options supported by my macOS version. Preserve my other settings.

Tell me when a logout is needed; let me do it myself. Then guide me through real typing tests for accents, shared punctuation and Russian Cmd/Ctrl shortcuts. Distinguish tests you ran from tests that need my input.`;
}
function designPrompt(){
 return `Hey agent, look at how this keyboard types accents and punctuation:
https://keyboard.krasnoperov.me/typing-demo/

Help me make a native macOS keyboard layout for my languages and habits.

Read this skill first, including its supporting references as needed:
https://github.com/krasnoperov/macos-multilingual-layouts/tree/main/skills/design-macos-keyboard-layouts

Start here:
https://raw.githubusercontent.com/krasnoperov/macos-multilingual-layouts/main/skills/design-macos-keyboard-layouts/SKILL.md

Before editing anything, ask me a few focused questions at a time: which physical keyboard and macOS version I use; which languages, scripts and apps I type in; which symbols and shortcuts I use most; what currently interrupts me; and which habits I want to preserve. Ask whether I prefer direct accent input, dead keys, or a combination, using concrete examples.

Our goal is fewer context-dependent decisions. Look for languages that can share an input source, keep shared punctuation and number-row symbols in consistent places, and change only the letters that need to change when switching scripts. Use the supplied layouts as worked examples, not presets I must adopt.

Propose a small, understandable mapping based on my answers and confirm the choices with me. Then adapt a known reference layout with clear provenance, keep backups, and help me install it without duplicate bundles or sources. Explain relevant macOS switching settings. Let me perform any required logout.

Verify the layout structure and guide me through real typing in my apps, including accents and shortcuts. Separate automated checks from user-confirmed behavior. Deliver the installable bundle, a concise key guide and a record of what changed.`;
}
for(const button of document.querySelectorAll('.copy-prompt')){
 button.addEventListener('click',async()=>{
  const text=setupPrompt(button.dataset.variant);
  try{
   await navigator.clipboard.writeText(text);
   const originalLabel=button.dataset.variant==='custom'?'Copy design prompt':'Copy setup prompt';
   button.textContent='Copied ✓';
   clearTimeout(button.copyTimer);
   button.copyTimer=setTimeout(()=>{button.textContent=originalLabel;},2200);
  }catch{
   const dialog=document.getElementById('prompt-dialog');
   const field=document.getElementById('prompt-text');field.value=text;
   dialog.showModal();field.focus();field.select();
  }
 });
}
