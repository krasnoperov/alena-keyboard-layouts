import Foundation
import Carbon
let direct=CommandLine.arguments.contains("direct")
let sources=TISCreateInputSourceList(nil,false).takeRetainedValue() as! [TISInputSource]
let source=sources.first { s in guard let p=TISGetInputSourceProperty(s,kTISPropertyInputSourceID) else{return false};return (Unmanaged<CFString>.fromOpaque(p).takeUnretainedValue() as String).hasSuffix("keylayout.EnglishEs")}!
let ptr=TISGetInputSourceProperty(source,kTISPropertyUnicodeKeyLayoutData)!
let data=Unmanaged<CFData>.fromOpaque(ptr).takeUnretainedValue()
let layout=UnsafeRawPointer(CFDataGetBytePtr(data)).assumingMemoryBound(to:UCKeyboardLayout.self)
func key(_ code:Int,_ mods:Int,_ state:inout UInt32)->String {var n=0;var chars=[UniChar](repeating:0,count:32);precondition(UCKeyTranslate(layout,UInt16(code),UInt16(kUCKeyActionDown),UInt32(mods>>8),UInt32(LMGetKbdType()),0,&state,32,&n,&chars)==0);return String(utf16CodeUnits:chars,count:n)}
func expect(_ code:Int,_ mods:Int,_ out:String){var state:UInt32=0;let got=key(code,mods,&state);precondition(got==out,"code \(code) expected \(out), got \(got)")}
for (code,lower,upper) in [(1,"æ","Æ"),(46,"œ","Œ")] {expect(code,2048,lower);for mods in [2560,3072,3584]{expect(code,mods,upper)}}
let letters:[Character:Int] = ["a":0,"b":11,"c":8,"d":2,"e":14,"f":3,"g":5,"h":4,"i":34,"j":38,"k":40,"l":37,"m":46,"n":45,"o":31,"p":35,"q":12,"r":15,"s":1,"t":17,"u":32,"v":9,"w":13,"x":7,"y":16,"z":6]
for (accent,pairs) in [(40,[("a","â"),("e","ê"),("i","î"),("o","ô"),("u","û")]),(13,[("a","ã"),("n","ñ"),("o","õ")])] {
 for (base,out) in pairs {for upper in [false,true] {var st:UInt32=0;let first=key(accent,2048,&st);precondition(first.isEmpty && st != 0,"accent \(accent) output \(first.debugDescription) state \(st)");let got=key(letters[base.first!]!,upper ? 512:0,&st);precondition(got==(upper ? out.uppercased():out),"accent \(accent) base \(base) uppercase \(upper) expected \(out) got \(got)");precondition(key(0,0,&st)=="a", "following-key reset failed")}}
 var st:UInt32=0;_ = key(accent,2048,&st);let mark=accent==40 ? "ˆ":"˜";precondition(key(49,0,&st)==mark)
 st=0;_ = key(accent,2048,&st);let fallback=key(11,0,&st);precondition(fallback==mark+"b","fallback expected \(mark)b got \(fallback) state \(st)")
}
let accented:[Character:(Int,Character)] = ["à":(50,"a"),"è":(50,"e"),"ì":(50,"i"),"ò":(50,"o"),"ù":(50,"u"),"â":(40,"a"),"ê":(40,"e"),"î":(40,"i"),"ô":(40,"o"),"û":(40,"u"),"ã":(13,"a"),"ñ":(13,"n"),"õ":(13,"o"),"ä":(38,"a"),"ë":(38,"e"),"ï":(38,"i"),"ö":(38,"o"),"ü":(38,"u"),"ÿ":(38,"y")]
func type(_ word:String)->String {var output="";var st:UInt32=0;for c in word {let lower=Character(String(c).lowercased());let shift=String(c)==String(c).uppercased() ? 512:0;if let (accent,base)=accented[lower]{output+=key(accent,2048,&st);output+=key(letters[base]!,shift,&st)}else if let base=[Character("á"):Character("a"),"é":"e","í":"i","ó":"o","ú":"u"][lower]{if direct {output+=key(letters[base]!,2048+shift,&st)}else{output+=key(14,2048,&st);output+=key(letters[base]!,shift,&st)}}else if lower=="ç"{output+=key(8,2048+shift,&st)}else if lower=="œ"||lower=="æ"{output+=key(lower=="œ" ? 46:1,2048+shift,&st)}else{output+=key(letters[lower]!,shift,&st)}};return output}
for word in ["não","pão","ações","você","NÃO","cœur","œuvre","français","Noël","où","île","ŒUVRE","Æ","città","perché","più","CITTÀ"] {let got=type(word);precondition(got==word,"\(word) != \(got)")}
print("PASS \(direct ? "Direct":"Dead Keys"): four additions, upper/Shift/Caps ligatures, accents, Space/fallback/reset, and 17 Portuguese/French/Italian words")
