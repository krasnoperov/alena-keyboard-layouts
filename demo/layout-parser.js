/* Read-only ANSI map viewer. DOMParser never writes back to the source files. */
window.LAYOUTS = {};
window.LAYOUT_MODELS = {};
const modifierLayers = {base:[],shift:['shift'],option:['option'],optionShift:['option','shift'],command:['command'],control:['control']};
function parseLayout(source) {
  if (/<!ENTITY/i.test(source)) throw new Error('Custom XML entities are unsupported.');
  // Native layouts use XML 1.1 control references. Browsers parse XML 1.0;
  // normalize only the display copy, preserving the original fetched bytes.
  const xml = source.replace(/<\?xml[^?]*\?>/, '<?xml version="1.0"?>')
    .replace(/<!DOCTYPE[^>]*>/, '')
    .replace(/&#(?:x([\da-f]+)|(\d+));/gi, (all,hex,decimal) => {
      const value = hex ? parseInt(hex,16) : Number(decimal);
      return value < 32 ? `CONTROL_${value.toString(16).padStart(2,'0')}` : all;
    });
  const doc = new DOMParser().parseFromString(xml,'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('Invalid keylayout XML.');
  const root=doc.documentElement;
  const byId=(tag,id)=>Array.from(root.getElementsByTagName(tag)).find(el=>el.getAttribute('id')===id);
  const layout=Array.from(root.querySelectorAll('layouts > layout')).find(el=>Number(el.getAttribute('first'))===0);
  if(!layout)throw new Error('No ANSI hardware map found.');
  const modifiers=byId('modifierMap',layout.getAttribute('modifiers'));
  function matches(rule,flags){
    const allowed=new Set(),required=new Set();
    for(const token of rule.trim().split(/\s+/).filter(Boolean)){
      const optional=token.endsWith('?');
      const name=token.replace(/\?$/,'').replace(/^any(Shift|Option|Control)$/,(_,s)=>s.toLowerCase());
      allowed.add(name);if(!optional)required.add(name);
    }
    return flags.every(f=>allowed.has(f))&&[...required].every(f=>flags.includes(f));
  }
  function indexFor(flags){
    for(const select of modifiers.children){
      if([...select.children].some(m=>matches(m.getAttribute('keys')||'',flags)))return select.getAttribute('mapIndex');
    }
    return modifiers.getAttribute('defaultIndex');
  }
  const display=text=>text.replace(/CONTROL_([\da-f]{2})/gi,(_,hex)=>'^'+String.fromCharCode(parseInt(hex,16)+64)).replace(/\x7f/g,'DEL');
  function readMap(setId,index,stack=new Set()){
    const id=setId+'/'+index;if(stack.has(id))throw new Error('Cyclic map inheritance.');
    const map=[...byId('keyMapSet',setId).children].find(el=>el.getAttribute('index')===String(index));
    if(!map)throw new Error('Missing map: '+id);
    const next=new Set(stack).add(id);
    const result=map.hasAttribute('baseIndex')?readMap(map.getAttribute('baseMapSet')||setId,map.getAttribute('baseIndex'),next):{};
    for(const key of map.children){
      let text=key.getAttribute('output')||'',state=null;
      const compositions={};
      if(key.hasAttribute('action')){
        const action=byId('action',key.getAttribute('action'));
        if(action)for(const when of action.children){
          if(when.getAttribute('state')!=='none')compositions[when.getAttribute('state')]={text:display(when.getAttribute('output')||''),next:when.getAttribute('next')};
        }
        const when=action&&[...action.children].find(el=>el.getAttribute('state')==='none');
        if(!when)throw new Error('Missing initial action state.');
        state=when.getAttribute('next');text=when.getAttribute('output')||'';
        if(state){const terminator=[...root.querySelectorAll('terminators > when')].find(el=>el.getAttribute('state')===state);text=terminator?.getAttribute('output')||'◌';}
      }
      result[key.getAttribute('code')]={text:display(text),dead:Boolean(state),next:state,compositions};
    }
    return result;
  }
  return {layers:Object.fromEntries(Object.entries(modifierLayers).map(([name,flags])=>[name,readMap(layout.getAttribute('mapSet'),indexFor(flags))])),terminators:Object.fromEntries([...root.querySelectorAll('terminators > when')].map(el=>[el.getAttribute('state'),display(el.getAttribute('output')||'')]))};
}
window.layoutsReady = Promise.all(['direct','dead-keys'].map(async variant=>{
  LAYOUTS[variant]={};LAYOUT_MODELS[variant]={};
  await Promise.all(['English','Russian'].map(async language=>{
    const response=await fetch(`layouts/${variant}/${language} Es.keylayout`);
    if(!response.ok)throw new Error(`Cannot load ${variant}/${language}: ${response.status}`);
    const model=parseLayout(await response.text());
    LAYOUT_MODELS[variant][language]=model;LAYOUTS[variant][language]=model.layers;
  }));
}));
