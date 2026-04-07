// ═══════════════════════════════════════════════════════
//  ConstructIQ — Paint Studio Module
//  Pinterest-style inspiration + room visualizer +
//  colour matcher + Firestore-backed saved palettes
// ═══════════════════════════════════════════════════════

// ── Data ─────────────────────────────────────────────────
const PINS = [
  { id:1,  title:"Tropical Forest Living Room",  type:"interior", tags:["tropical","green","nature","bold"],      colors:["#2D5A1B","#7BA05B","#F5F0E8","#C8A96E","#8B4513"] },
  { id:2,  title:"Coastal Bedroom Retreat",      type:"interior", tags:["coastal","blue","calm","minimal"],       colors:["#4A90D9","#B8D4E8","#F8F9FA","#E8D5B0","#2C5F8A"] },
  { id:3,  title:"Modern Accra Exterior",        type:"exterior", tags:["modern","warm","ghana","tropical"],      colors:["#C8862A","#F5E6C8","#4A3728","#8B7355","#D4A853"] },
  { id:4,  title:"Earthy Minimalist Dining",     type:"interior", tags:["earthy","terracotta","neutral","warm"],  colors:["#C4622D","#E8C9A0","#F7F0E6","#8B6F5E","#3D2B1F"] },
  { id:5,  title:"Contemporary Exterior",        type:"exterior", tags:["contemporary","grey","white","clean"],   colors:["#4A4A4A","#F2F2F2","#1A1A1A","#C8C8C8","#2C6E49"] },
  { id:6,  title:"Sage Kitchen Refresh",         type:"interior", tags:["sage","green","kitchen","fresh"],        colors:["#7C9A82","#E8E4D9","#C4B5A5","#4A4A35","#F5F2EC"] },
  { id:7,  title:"Bold Indigo Study",            type:"interior", tags:["bold","blue","dark","luxury"],           colors:["#2D3A8C","#4A5CC4","#F0EFEA","#C4A75A","#1A1F4A"] },
  { id:8,  title:"Tropical Exterior Villa",      type:"exterior", tags:["tropical","white","lush","ghana"],       colors:["#FFFFFF","#2C7A3A","#F0D5A0","#8B7355","#1A4A25"] },
  { id:9,  title:"Warm Sunset Bedroom",          type:"interior", tags:["warm","orange","sunset","cosy"],         colors:["#E87040","#F5C08A","#FFF5E6","#8B4A20","#C4763A"] },
  { id:10, title:"Industrial Loft Living",       type:"interior", tags:["industrial","grey","dark","urban"],      colors:["#555555","#333333","#BBBBBB","#E8A048","#F5F5F5"] },
  { id:11, title:"Classic Colonial Exterior",    type:"exterior", tags:["colonial","cream","elegant","classic"],  colors:["#F5ECD7","#8B6F47","#2C2C2C","#C4A46B","#6B5A3E"] },
  { id:12, title:"Monochrome Bathroom",          type:"interior", tags:["monochrome","white","clean","modern"],   colors:["#F8F8F8","#E0E0E0","#AAAAAA","#333333","#111111"] },
];

const PAINT_NAMES = {
  "#E8DDD0":"Warm Linen","#C4622D":"Terracotta Sun","#4A90D9":"Coastal Sky",
  "#2D5A1B":"Forest Deep","#F5E6C8":"Sahara Sand","#555555":"Urban Stone",
  "#F0D5A0":"Gold Dust","#7C9A82":"Sage Breeze","#2D3A8C":"Royal Indigo",
  "#E87040":"Sunset Glow","#FFFFFF":"Pure White","#8B7355":"Cocoa Earth",
  "#EF9F27":"Amber Glow","#1D9E75":"Tropic Teal","#D85A30":"Coral Clay",
  "#C8862A":"Ochre Gold","#2C7A3A":"Garden Green","#4A4A4A":"Charcoal Mist",
};
const QUICK_COLORS = [
  "#E8DDD0","#C4622D","#4A90D9","#2D5A1B","#F5E6C8",
  "#555555","#F0D5A0","#7C9A82","#2D3A8C","#E87040","#FFFFFF","#8B7355"
];
const PAINT_TAGS = ["all","interior","exterior","tropical","coastal","earthy","modern","bold","minimal","warm","green","blue"];
const ROOMS      = ["Living Room","Bedroom","Kitchen","Exterior","Study","Bathroom"];
const AREAS      = ["Walls","Ceiling","Trim","Accent wall"];

let _activeTag    = "all";
let _selectedPin  = null;
let _activeRoom   = "Living Room";
let _activeArea   = "Walls";
let _vizColors    = { Walls:"#E8DDD0", Ceiling:"#F8F8F8", Trim:"#FFFFFF", "Accent wall":"#4A90D9" };
let _savedPalettes = {};   // Firestore-backed

// ── Init (real-time palettes listener) ──────────────────
function initPaint() {
  dbListen("palettes", data => {
    _savedPalettes = data || {};
    renderSavedPalettes();
  });
}

// ── Colour math helpers ──────────────────────────────────
function _h2r(h) { return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]; }
function _r2hsl(r,g,b) {
  r/=255;g/=255;b/=255;
  const mx=Math.max(r,g,b),mn=Math.min(r,g,b);
  let h,s,l=(mx+mn)/2;
  if(mx===mn){h=s=0;}else{
    const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);
    switch(mx){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;}h/=6;
  }
  return[Math.round(h*360),Math.round(s*100),Math.round(l*100)];
}
function _hsl2h(h,s,l) {
  s/=100;l/=100;const a=s*Math.min(l,1-l);
  const f=n=>{const k=(n+h/30)%12;return Math.round(255*(l-a*Math.max(Math.min(k-3,9-k,1),-1))).toString(16).padStart(2,"0");};
  return "#"+f(0)+f(8)+f(4);
}
function colorName(hex) { return PAINT_NAMES[(hex||"").toUpperCase()] || "Custom Mix"; }
function getComplement(hex){const[r,g,b]=_h2r(hex);const[h,s,l]=_r2hsl(r,g,b);return[_hsl2h((h+180)%360,s,l),_hsl2h((h+150)%360,s,l),_hsl2h((h+210)%360,s,l)];}
function getAnalog(hex){const[r,g,b]=_h2r(hex);const[h,s,l]=_r2hsl(r,g,b);return[_hsl2h((h+30)%360,s,l),_hsl2h((h+60)%360,s,l),_hsl2h((h-30+360)%360,s,l)];}
function getTriad(hex){const[r,g,b]=_h2r(hex);const[h,s,l]=_r2hsl(r,g,b);return[_hsl2h((h+120)%360,s,l),_hsl2h((h+240)%360,s,l),_hsl2h(h,s*.6,Math.min(l+20,90))];}

// ── Room canvas drawing ──────────────────────────────────
function drawRoomScene(ctx, w, h, wall, floor, trim, type) {
  ctx.clearRect(0,0,w,h);
  if (type==="exterior") {
    ctx.fillStyle="#87CEEB"; ctx.fillRect(0,0,w,h*.55);
    ctx.fillStyle="#6BAA4A"; ctx.fillRect(0,h*.72,w,h*.28);
    ctx.fillStyle=wall; ctx.fillRect(w*.1,h*.2,w*.8,h*.55);
    ctx.fillStyle=trim; ctx.fillRect(w*.08,h*.18,w*.84,h*.06);
    ctx.strokeStyle="#00000022"; ctx.lineWidth=1; ctx.strokeRect(w*.08,h*.18,w*.84,h*.06);
    ctx.fillStyle=floor; ctx.fillRect(w*.25,h*.58,w*.2,h*.18);
    for(let i=0;i<2;i++){
      ctx.fillStyle=trim; ctx.fillRect(w*.18+i*w*.34,h*.3,w*.12,h*.18);
      ctx.strokeStyle="#00000033"; ctx.strokeRect(w*.18+i*w*.34,h*.3,w*.12,h*.18);
    }
  } else {
    ctx.fillStyle=wall; ctx.fillRect(0,0,w,h*.7);
    ctx.fillStyle=floor; ctx.fillRect(0,h*.7,w,h*.3);
    ctx.fillStyle=trim+"CC"; ctx.fillRect(0,h*.68,w,h*.02);
    ctx.fillStyle="#FFFFFF22"; ctx.fillRect(w*.1,h*.08,w*.35,h*.4);
    ctx.strokeStyle="#00000033"; ctx.lineWidth=1; ctx.strokeRect(w*.1,h*.08,w*.35,h*.4);
    ctx.fillStyle="#00000015"; ctx.fillRect(w*.55,h*.15,w*.2,h*.35);
    ctx.strokeRect(w*.55,h*.15,w*.2,h*.35);
    ctx.fillStyle=trim+"99"; ctx.fillRect(w*.2,h*.72,w*.6,h*.12);
  }
}

// ── INSPIRATION — build tag bar ──────────────────────────
function buildPaintTags() {
  document.getElementById("paint-tags").innerHTML = PAINT_TAGS.map(t =>
    `<span class="tag${t==="all"?" active":""}" onclick="setPaintTag('${t}',this)">${t}</span>`).join("");
}
function setPaintTag(t, el) {
  _activeTag = t;
  document.querySelectorAll("#paint-tags .tag").forEach(x => x.classList.remove("active"));
  el.classList.add("active"); filterPins();
}
function filterPins() {
  const q  = document.getElementById("pin-search").value.toLowerCase();
  const tp = document.getElementById("pin-type-filter").value;
  renderPinGrid(PINS.filter(p => {
    const tm  = _activeTag==="all" || p.type===_activeTag || p.tags.includes(_activeTag);
    const tpm = !tp || p.type===tp;
    const qm  = !q  || p.title.toLowerCase().includes(q) || p.tags.some(t=>t.includes(q));
    return tm&&tpm&&qm;
  }));
}
function renderPinGrid(pins) {
  document.getElementById("pin-grid").innerHTML = pins.map(p=>`
    <div class="pin-card${_selectedPin?.id===p.id?" selected":""}" onclick="selectPin(${p.id})">
      <canvas id="pthumb-${p.id}" width="300" height="190" style="width:100%;display:block;"></canvas>
      <div class="pin-foot">
        <div style="font-size:12px;font-weight:500;">${p.title}</div>
        <div class="pin-swatches">${p.colors.slice(0,5).map(c=>`<div class="swatch" style="background:${c}"></div>`).join("")}</div>
      </div>
    </div>`).join("");
  pins.forEach(p=>setTimeout(()=>{
    const c=document.getElementById("pthumb-"+p.id); if(!c)return;
    drawRoomScene(c.getContext("2d"),300,190,p.colors[0],p.colors[3]||p.colors[0],p.colors[2]||"#FFF",p.type);
  },0));
}
function selectPin(id) {
  _selectedPin = PINS.find(p=>p.id===id); filterPins();
  const det = document.getElementById("pin-detail"); det.style.display="block";
  document.getElementById("pin-detail-title").textContent = _selectedPin.title;
  document.getElementById("pin-detail-tags").innerHTML = _selectedPin.tags.map(t=>
    `<span style="background:#F5F3EF;padding:2px 8px;border-radius:10px;font-size:10px;margin-right:4px;">${t}</span>`).join("");
  const c = document.getElementById("pin-room-canvas");
  drawRoomScene(c.getContext("2d"),400,260,_selectedPin.colors[0],_selectedPin.colors[3]||_selectedPin.colors[0],_selectedPin.colors[2]||"#FFF",_selectedPin.type);
  document.getElementById("pin-color-strip").innerHTML = _selectedPin.colors.map(c=>`<div style="background:${c};flex:1;"></div>`).join("");
  document.getElementById("pin-palette").innerHTML = _selectedPin.colors.map((c,i)=>`
    <div class="pal-swatch" onclick="navigator.clipboard&&navigator.clipboard.writeText('${c}')">
      <div class="pal-color" style="background:${c};"></div>
      <div class="pal-foot"><div class="pal-name">${colorName(c)}</div><div class="pal-hex">${c.toUpperCase()}</div></div>
    </div>`).join("");
  document.getElementById("pin-ai-box").textContent = "Click \"AI colour advice\" for expert paint recommendations…";
  det.scrollIntoView({behavior:"smooth",block:"nearest"});
}
async function getPinAI() {
  if (!_selectedPin) return;
  const box    = document.getElementById("pin-ai-box");
  const prompt = `You are an expert interior designer specialising in West African homes. For the paint scheme "${_selectedPin.title}" with colours ${_selectedPin.colors.join(", ")}: give 3 concise professional tips — best rooms to use it, complementary accent choices, and how it performs in Ghana's tropical climate. Max 80 words.`;
  await askClaude(prompt, box, "Generating colour advice…");
}
async function savePinPalette() {
  if (!_selectedPin) return;
  const exists = Object.values(_savedPalettes).find(s=>s.id===_selectedPin.id);
  if (exists) { alert("Already saved!"); return; }
  try {
    await dbAdd("palettes", { ..._selectedPin, savedAt: new Date().toLocaleDateString() });
    showStatus("Palette saved to Firebase ✓", "success");
  } catch(e) { showStatus("Save failed", "error"); console.error(e); }
}

// ── ROOM VISUALIZER ──────────────────────────────────────
function buildVisualizerControls() {
  document.getElementById("viz-room-btns").innerHTML = ROOMS.map(r =>
    `<button class="room-btn${r==="Living Room"?" active":""}" onclick="setVizRoom('${r}',this)">${r}</button>`).join("");
  document.getElementById("viz-area-btns").innerHTML = AREAS.map(a =>
    `<button class="room-btn${a==="Walls"?" active":""}" onclick="setVizArea('${a}',this)">${a}</button>`).join("");
  document.getElementById("viz-quick-colors").innerHTML = QUICK_COLORS.map(c =>
    `<div style="width:26px;height:26px;border-radius:5px;background:${c};cursor:pointer;border:0.5px solid var(--border);" onclick="applyQuickColor('${c}')" title="${colorName(c)}"></div>`).join("");
}
function setVizRoom(r,el) { _activeRoom=r; document.querySelectorAll("#viz-room-btns .room-btn").forEach(b=>b.classList.remove("active")); el.classList.add("active"); drawVizRoom(); }
function setVizArea(a,el) { _activeArea=a; document.querySelectorAll("#viz-area-btns .room-btn").forEach(b=>b.classList.remove("active")); el.classList.add("active"); document.getElementById("viz-color-picker").value=_vizColors[a]; drawVizRoom(); }
function applyQuickColor(c) { document.getElementById("viz-color-picker").value=c; applyVizColor(); }
function applyVizColor() {
  _vizColors[_activeArea] = document.getElementById("viz-color-picker").value;
  drawVizRoom(); renderVizInfo();
  const prompt = `You are a professional paint consultant. For the colour ${_vizColors[_activeArea]} on ${_activeArea} in a ${_activeRoom}: in one sentence describe the mood/atmosphere created, and in one sentence suggest the best complementary trim or accent colour for a Ghanaian home. Max 40 words.`;
  askClaude(prompt, document.getElementById("viz-ai-box"), "Getting paint notes…");
}
function drawVizRoom() {
  const c=document.getElementById("viz-room-canvas"); if(!c)return;
  const ctx=c.getContext("2d"); const isExt=_activeRoom==="Exterior";
  drawRoomScene(ctx,600,380,_vizColors["Walls"],_vizColors["Accent wall"],_vizColors["Trim"],isExt?"exterior":"interior");
  if(!isExt){ctx.fillStyle=_vizColors["Ceiling"];ctx.fillRect(0,0,600,30);}
}
function renderVizInfo() {
  document.getElementById("viz-info").innerHTML = Object.entries(_vizColors).map(([k,v])=>`
    <div class="viz-chip">
      <div class="viz-chip-dot" style="background:${v};"></div>
      <span style="font-size:11px;color:var(--text-muted);">${k}</span>
      <span style="font-size:11px;font-weight:500;">${v.toUpperCase()}</span>
    </div>`).join("");
}

// ── COLOUR MATCHER ───────────────────────────────────────
let _matchColor = "#3B6D11";
function syncMatchHex() {
  const v=document.getElementById("match-hex-input").value;
  if(/^#[0-9A-Fa-f]{6}$/.test(v)){document.getElementById("match-picker").value=v;_matchColor=v;runMatcher();}
}
function renderMatchChips(arr,id){
  document.getElementById(id).innerHTML=arr.map(c=>`
    <div class="match-chip" onclick="navigator.clipboard&&navigator.clipboard.writeText('${c}')" title="Click to copy">
      <div class="match-chip-color" style="background:${c};"></div>
      <div class="match-chip-foot">
        <div style="font-size:10px;font-weight:500;">${colorName(c)}</div>
        <div style="font-size:10px;color:var(--text-muted);">${c.toUpperCase()}</div>
      </div>
    </div>`).join("");
}
function runMatcher() {
  _matchColor = document.getElementById("match-picker").value;
  document.getElementById("match-hex-input").value  = _matchColor;
  document.getElementById("match-input-swatch").style.background = _matchColor;
  document.getElementById("match-input-name").textContent = colorName(_matchColor);
  const [r,g,b]=_h2r(_matchColor); const [h,s,l]=_r2hsl(r,g,b);
  document.getElementById("match-input-info").innerHTML =
    `HSL: ${h}° ${s}% ${l}%<br>Tone: ${l>70?"Light":l>40?"Mid":"Dark"} · ${s>60?"Vivid":s>25?"Muted":"Neutral"}`;
  renderMatchChips(getComplement(_matchColor),"match-comp");
  renderMatchChips(getAnalog(_matchColor),"match-analog");
  renderMatchChips(getTriad(_matchColor),"match-triad");
}
async function runMatchAI() {
  const box    = document.getElementById("match-ai-box");
  const comps  = getComplement(_matchColor).join(", ");
  const prompt = `As a colour theory expert, analyse paint colour ${_matchColor} for a building project. In 3 sentences: describe its emotional character, explain why its complementary colours (${comps}) work well, and suggest one interior and one exterior application in a Ghanaian home. Max 70 words.`;
  await askClaude(prompt, box, "Analysing colour harmony…");
}

// ── SAVED PALETTES ───────────────────────────────────────
function renderSavedPalettes() {
  const g   = document.getElementById("saved-palettes-grid");
  const em  = document.getElementById("saved-empty");
  const ent = Object.entries(_savedPalettes);
  if (!ent.length) { g.style.display="none"; em.style.display="block"; return; }
  g.style.display="grid"; em.style.display="none";
  g.innerHTML = ent.map(([key,p])=>`
    <div class="saved-card">
      <div class="saved-band">${(p.colors||[]).map(c=>`<div style="background:${c};flex:1;"></div>`).join("")}</div>
      <div class="saved-info">
        <button class="btn-danger" style="float:right;" onclick="deleteSavedPalette('${key}')">✕</button>
        <div class="saved-title">${p.title||""}</div>
        <div class="saved-meta">${p.type||""} · ${p.savedAt||""}</div>
        <div class="saved-dots">${(p.colors||[]).map(c=>`<div style="width:13px;height:13px;border-radius:3px;background:${c};border:0.5px solid var(--border);"></div>`).join("")}</div>
      </div>
    </div>`).join("");
}
async function deleteSavedPalette(key) {
  try { await dbDelete("palettes",key); showStatus("Palette deleted","success"); }
  catch(e) { showStatus("Delete failed","error"); }
}
