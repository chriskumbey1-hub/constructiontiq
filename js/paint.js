// ConstructIQ v4 — Professional Paint Studio
// Real room photography + professional colour palettes

// ── Professional paint boards with real Unsplash room photos ──
const PAINT_BOARDS = [
  // ── INTERIOR ──────────────────────────────────────────────────
  {
    id:1, title:"Warm Terracotta Living Room", type:"interior",
    mood:"earthy", tags:["warm","earthy","terracotta","cosy","tropical"],
    photo:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80&auto=format&fit=crop",
    story:"A warm terracotta palette inspired by Ghana's clay soils. Deep burnt orange walls create an intimate, grounded atmosphere perfect for family living rooms. Pair with cream ceiling and natural rattan furniture for authentic West African elegance.",
    colors:[
      {name:"Terracotta Sun",   hex:"#C4622D", code:"Dulux SW 6119"},
      {name:"Warm Cream",       hex:"#F7F0E6", code:"Dulux W003"},
      {name:"Cocoa Brown",      hex:"#8B6F5E", code:"Dulux SW 7512"},
      {name:"Dusty Rose",       hex:"#D4A5A5", code:"Dulux 7117"},
      {name:"Copper Glow",      hex:"#B87333", code:"Nippon 1087"},
    ]
  },
  {
    id:2, title:"Coastal Blue Bedroom", type:"interior",
    mood:"coastal", tags:["coastal","blue","calm","minimal","serene"],
    photo:"https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80&auto=format&fit=crop",
    story:"Soft ocean blues transport the coastal breeze indoors. This palette is ideal for master bedrooms in Accra and Takoradi, creating a restful sanctuary that feels miles from the city's bustle. The muted blue-grey ceiling amplifies the sense of calm.",
    colors:[
      {name:"Coastal Sky",      hex:"#4A90D9", code:"Dulux 5012"},
      {name:"Sea Mist",         hex:"#B8D4E8", code:"Dulux 5022"},
      {name:"White Sand",       hex:"#F8F5EE", code:"Dulux W001"},
      {name:"Deep Navy",        hex:"#2C5F8A", code:"Dulux 5024"},
      {name:"Driftwood",        hex:"#C4A882", code:"Nippon 2081"},
    ]
  },
  {
    id:3, title:"Sage Green Kitchen", type:"interior",
    mood:"fresh", tags:["green","sage","kitchen","fresh","natural"],
    photo:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop",
    story:"Muted sage green breathes life into a kitchen without overpowering it. Rooted in the lush greens of Ghana's forest belt, this palette creates a refreshing yet sophisticated cooking space. Pair with white marble-effect worktops and brass hardware.",
    colors:[
      {name:"Sage Breeze",      hex:"#7C9A82", code:"Dulux 6017"},
      {name:"Linen White",      hex:"#F5F2EC", code:"Dulux W010"},
      {name:"Forest Floor",     hex:"#4A5E3A", code:"Nippon 6022"},
      {name:"Warm Stone",       hex:"#C4B5A5", code:"Dulux 2017"},
      {name:"Antique Brass",    hex:"#B5892C", code:"Nippon 1091"},
    ]
  },
  {
    id:4, title:"Luxury Indigo Study", type:"interior",
    mood:"bold", tags:["bold","dark","luxury","indigo","statement"],
    photo:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80&auto=format&fit=crop",
    story:"Deep indigo walls make an intellectual statement in a home office or study. Rich and dramatic without being oppressive, this palette commands respect — perfect for the executive who works from home. Gold accessories complete the premium look.",
    colors:[
      {name:"Royal Indigo",     hex:"#2D3A8C", code:"Dulux 5056"},
      {name:"Midnight Deep",    hex:"#1A1F4A", code:"Dulux 5058"},
      {name:"Ivory Cream",      hex:"#F5F0E4", code:"Dulux W002"},
      {name:"Antique Gold",     hex:"#C4A75A", code:"Nippon 1089"},
      {name:"Slate Blue",       hex:"#4A5CC4", code:"Dulux 5054"},
    ]
  },
  {
    id:5, title:"Natural Linen Bedroom", type:"interior",
    mood:"minimal", tags:["minimal","neutral","linen","calm","modern"],
    photo:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80&auto=format&fit=crop",
    story:"A perfectly balanced neutral palette that creates a hotel-like bedroom retreat. Warm linen tones reference the natural fibres of Kente cloth, while the layered neutrals build depth and texture without colour conflict. Timeless and endlessly versatile.",
    colors:[
      {name:"Warm Linen",       hex:"#E8DDD0", code:"Dulux W020"},
      {name:"Oat Milk",         hex:"#F5EEE4", code:"Dulux W018"},
      {name:"Greige",           hex:"#C4B4A0", code:"Nippon 2071"},
      {name:"Charcoal Mist",    hex:"#5A5A5A", code:"Dulux N003"},
      {name:"Alabaster",        hex:"#FAF8F5", code:"Dulux W001"},
    ]
  },
  {
    id:6, title:"Bold Sunset Lounge", type:"interior",
    mood:"bold", tags:["bold","warm","sunset","vibrant","energetic"],
    photo:"https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=600&q=80&auto=format&fit=crop",
    story:"Inspired by Accra's breathtaking sunsets over the Atlantic. This bold palette is for those who want their living space to radiate energy and confidence. Use the deep amber as a feature wall; balance with the cooler neutrals on adjacent walls.",
    colors:[
      {name:"Sunset Amber",     hex:"#E87040", code:"Dulux 2065"},
      {name:"Golden Hour",      hex:"#F5C08A", code:"Nippon 1079"},
      {name:"Warm White",       hex:"#FFF5E6", code:"Dulux W008"},
      {name:"Bark Brown",       hex:"#8B4A20", code:"Dulux 2052"},
      {name:"Burnt Clay",       hex:"#C4763A", code:"Nippon 2061"},
    ]
  },
  {
    id:7, title:"Monochrome Bathroom", type:"interior",
    mood:"minimal", tags:["minimal","monochrome","white","clean","spa"],
    photo:"https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80&auto=format&fit=crop",
    story:"A spa-like bathroom experience through pure monochrome restraint. White-on-white with carefully selected grey tones creates depth and sophistication. The deep charcoal grout lines provide crisp visual definition — a timeless bathroom palette that always looks pristine.",
    colors:[
      {name:"Pure White",       hex:"#FAFAFA", code:"Dulux W001"},
      {name:"Soft Marble",      hex:"#F0EDEA", code:"Dulux W015"},
      {name:"Urban Grey",       hex:"#AAAAAA", code:"Nippon N025"},
      {name:"Charcoal Line",    hex:"#333333", code:"Dulux N001"},
      {name:"Pearl Mist",       hex:"#E8E4E0", code:"Dulux W019"},
    ]
  },
  {
    id:8, title:"Tropical Green Dining Room", type:"interior",
    mood:"tropical", tags:["tropical","green","bold","nature","lush"],
    photo:"https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80&auto=format&fit=crop",
    story:"Bring the verdant richness of Ghana's rainforest into your dining room. Deep botanical green creates a dramatic backdrop for evening entertaining. The warm gold accents — inspired by Kente cloth — elevate the space to celebratory luxury.",
    colors:[
      {name:"Forest Deep",      hex:"#2D5A1B", code:"Dulux 6055"},
      {name:"Tropical Leaf",    hex:"#7BA05B", code:"Nippon 6031"},
      {name:"Aged Ivory",       hex:"#F5F0E8", code:"Dulux W005"},
      {name:"Kente Gold",       hex:"#C8A96E", code:"Nippon 1085"},
      {name:"Mahogany Bark",    hex:"#8B4513", code:"Dulux 2051"},
    ]
  },
  // ── EXTERIOR ──────────────────────────────────────────────────
  {
    id:9, title:"Classic Ghanaian Exterior", type:"exterior",
    mood:"warm", tags:["warm","classic","ghana","ochre","traditional"],
    photo:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80&auto=format&fit=crop",
    story:"Warm ochres and earthy tones that have defined Ghanaian residential architecture for generations. This palette references the laterite soil of southern Ghana and ages beautifully in the tropical sun. The deep brown trim provides confident definition.",
    colors:[
      {name:"Ochre Gold",       hex:"#C8862A", code:"Dulux 1065"},
      {name:"Sahara Sand",      hex:"#F5E6C8", code:"Nippon W041"},
      {name:"Dark Mahogany",    hex:"#4A3728", code:"Dulux 2048"},
      {name:"Clay Brown",       hex:"#8B7355", code:"Nippon 2077"},
      {name:"Sunbaked Amber",   hex:"#D4A853", code:"Dulux 1069"},
    ]
  },
  {
    id:10, title:"Modern White Exterior", type:"exterior",
    mood:"minimal", tags:["minimal","white","modern","clean","contemporary"],
    photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80&auto=format&fit=crop",
    story:"Crisp white with deep accents — the signature of East Legon's most admired contemporary homes. Pure white walls pop brilliantly in Ghana's intense sunlight, making this palette visually stunning in daylight. The dark trim grounds the design with authority.",
    colors:[
      {name:"Brilliant White",  hex:"#F8F8F8", code:"Dulux W001"},
      {name:"Fresh White",      hex:"#F2F4F5", code:"Nippon W001"},
      {name:"Slate Charcoal",   hex:"#3A3A3A", code:"Dulux N002"},
      {name:"Pewter Grey",      hex:"#8A8A8A", code:"Nippon N020"},
      {name:"Tropical Green",   hex:"#2C6E49", code:"Dulux 6041"},
    ]
  },
  {
    id:11, title:"Colonial Cream Exterior", type:"exterior",
    mood:"classic", tags:["classic","cream","colonial","elegant","heritage"],
    photo:"https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80&auto=format&fit=crop",
    story:"Timeless cream and chocolate brown honour Ghana's colonial-era architectural heritage while feeling entirely at home in a modern compound. This palette photographs beautifully, glows warmly at dusk, and is forgiving to maintain in tropical humidity.",
    colors:[
      {name:"Heritage Cream",   hex:"#F5ECD7", code:"Dulux W030"},
      {name:"Chocolate Trim",   hex:"#8B6F47", code:"Nippon 2080"},
      {name:"Deep Espresso",    hex:"#2C2C2C", code:"Dulux N001"},
      {name:"Antique Stone",    hex:"#C4A46B", code:"Nippon 2083"},
      {name:"Dark Teak",        hex:"#6B5A3E", code:"Dulux 2049"},
    ]
  },
  {
    id:12, title:"Contemporary Grey Exterior", type:"exterior",
    mood:"bold", tags:["bold","grey","contemporary","statement","sleek"],
    photo:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80&auto=format&fit=crop",
    story:"Sophisticated dark grey makes a bold architectural statement for three-storey homes and commercial buildings. Increasingly popular in Airport Residential and Cantonments, this palette conveys professional confidence. The muted green accent adds organic warmth.",
    colors:[
      {name:"Steel Grey",       hex:"#5A5A5A", code:"Nippon N015"},
      {name:"Anthracite",       hex:"#333333", code:"Dulux N002"},
      {name:"Pale Silver",      hex:"#C0C0C0", code:"Nippon N030"},
      {name:"Ivory White",      hex:"#F8F6F0", code:"Dulux W002"},
      {name:"Moss Green",       hex:"#4A6741", code:"Dulux 6038"},
    ]
  },
];

const PAINT_MOODS = ["all","warm","coastal","earthy","minimal","bold","fresh","tropical","classic"];
const ROOMS = ["Living Room","Bedroom","Kitchen","Exterior","Study","Bathroom"];
const AREAS = ["Walls","Ceiling","Trim","Accent wall"];
const QUICK_COLORS = [
  {hex:"#F5ECD7",name:"Heritage Cream"},
  {hex:"#C4622D",name:"Terracotta Sun"},
  {hex:"#4A90D9",name:"Coastal Sky"},
  {hex:"#2D5A1B",name:"Forest Deep"},
  {hex:"#F5E6C8",name:"Sahara Sand"},
  {hex:"#5A5A5A",name:"Steel Grey"},
  {hex:"#7C9A82",name:"Sage Breeze"},
  {hex:"#2D3A8C",name:"Royal Indigo"},
  {hex:"#E87040",name:"Sunset Amber"},
  {hex:"#C8862A",name:"Ochre Gold"},
  {hex:"#F8F8F8",name:"Brilliant White"},
  {hex:"#8B6F47",name:"Chocolate Trim"},
];

let _activeTag = "all", _selectedBoard = null;
let _activeRoom = "Living Room", _activeArea = "Walls";
let _vizColors  = { Walls:"#F5ECD7", Ceiling:"#F8F8F8", Trim:"#FFFFFF", "Accent wall":"#4A90D9" };
let _savedPalettes = {};

// Init paint Firestore listener
function initPaint() {
  dbListen("palettes", data => {
    _savedPalettes = data || {};
    renderSavedPalettes();
  });
}

// ── Build tag pills ──────────────────────────────────────
function buildPaintTags() {
  document.getElementById("paint-tags").innerHTML = PAINT_MOODS.map(t =>
    `<button class="ptag${t==="all"?" active":""}" onclick="setPaintTag('${t}',this)">${t}</button>`).join("");
}
function setPaintTag(t,el) {
  _activeTag=t;
  document.querySelectorAll(".paint-mood-tags .ptag").forEach(x=>x.classList.remove("active"));
  el.classList.add("active");
  filterPins();
}

// ── Filter and render pin grid ───────────────────────────
function filterPins() {
  const q  = document.getElementById("pin-search").value.toLowerCase();
  const tp = document.getElementById("pin-type-filter").value;
  const filtered = PAINT_BOARDS.filter(b => {
    const moodMatch = _activeTag==="all" || b.mood===_activeTag || b.tags.includes(_activeTag);
    const typeMatch = !tp || b.type===tp;
    const qMatch    = !q  || b.title.toLowerCase().includes(q) || b.tags.some(t=>t.includes(q));
    return moodMatch && typeMatch && qMatch;
  });
  renderPinGrid(filtered);
}

function renderPinGrid(boards) {
  document.getElementById("pin-grid").innerHTML = boards.map(b => `
    <div class="pin-card${_selectedBoard?.id===b.id?" selected":""}" onclick="selectBoard(${b.id})">
      <div class="pin-photo"><img src="${b.photo}" alt="${b.title}" loading="lazy" style="width:100%;display:block;"/></div>
      <div class="pin-hover-overlay"><span class="pin-hover-label">View palette →</span></div>
      <div class="pin-footer">
        <div class="pin-footer-title">${b.title}</div>
        <div class="pin-color-dots">${b.colors.map(c=>`<div class="pin-dot" style="background:${c.hex};" title="${c.name}"></div>`).join("")}</div>
      </div>
    </div>`).join("");
}

// ── Select a board ───────────────────────────────────────
function selectBoard(id) {
  _selectedBoard = PAINT_BOARDS.find(b=>b.id===id);
  filterPins();
  const det = document.getElementById("pin-detail");
  det.style.display = "block";

  document.getElementById("pin-detail-title").textContent = _selectedBoard.title;
  document.getElementById("pin-detail-tags").innerHTML = _selectedBoard.tags.map(t=>
    `<span style="background:var(--bg2);padding:3px 9px;border-radius:10px;font-size:10.5px;margin-right:4px;color:var(--tm);">${t}</span>`).join("");
  document.getElementById("pin-story").textContent = _selectedBoard.story;

  // Room photo (use the board photo as the room preview)
  document.getElementById("pin-room-wrap").innerHTML = `<img src="${_selectedBoard.photo}" alt="${_selectedBoard.title}" style="width:100%;border-radius:12px;display:block;"/>`;

  // Color swatches strip
  document.getElementById("pin-swatches-row").innerHTML = _selectedBoard.colors.map(c=>
    `<div style="background:${c.hex};flex:1;" title="${c.name}"></div>`).join("");

  // Palette grid
  document.getElementById("pin-palette").innerHTML = _selectedBoard.colors.map(c=>`
    <div class="pal-chip" onclick="navigator.clipboard&&navigator.clipboard.writeText('${c.hex}')">
      <div class="pal-chip-color" style="background:${c.hex};"></div>
      <div class="pal-chip-foot"><div class="pal-chip-name">${c.name}</div><div class="pal-chip-hex">${c.hex.toUpperCase()}</div></div>
    </div>`).join("");

  // Paint codes grid
  document.getElementById("pin-codes").innerHTML = _selectedBoard.colors.map(c=>`
    <div class="pin-code-item" onclick="navigator.clipboard&&navigator.clipboard.writeText('${c.hex}')">
      <div class="pin-code-dot" style="background:${c.hex};"></div>
      <div class="pin-code-info"><span class="pin-code-name">${c.name}</span><span class="pin-code-hex">${c.code} · ${c.hex}</span></div>
    </div>`).join("");

  document.getElementById("pin-ai-box").textContent = 'Click "AI colour advice" for expert paint recommendations…';
  det.scrollIntoView({behavior:"smooth",block:"nearest"});
}

async function getPinAI() {
  if (!_selectedBoard) return;
  const b = _selectedBoard;
  const colorList = b.colors.map(c=>`${c.name} (${c.hex})`).join(", ");
  const prompt = `You are a professional interior designer and colour consultant specialising in tropical West African homes. For the "${b.title}" paint palette with colours: ${colorList} — give 3 expert professional tips covering: (1) which rooms in a Ghanaian home this works best in and why, (2) how to apply it — what to use as main walls vs accent vs ceiling, (3) what furniture materials and finishes complement it best in Ghana's climate. Be specific, professional, and practical. Max 90 words.`;
  await askClaude(prompt, document.getElementById("pin-ai-box"), "Generating colour advice…");
}

async function savePinPalette() {
  if (!_selectedBoard) return;
  const exists = Object.values(_savedPalettes).find(s=>s.id===_selectedBoard.id);
  if (exists) { alert("Already saved!"); return; }
  try {
    await dbAdd("palettes", {..._selectedBoard, savedAt: new Date().toLocaleDateString()});
    showStatus("Palette saved ✓","success");
  } catch(e) { showStatus("Save failed","error"); console.error(e); }
}

// ── ROOM VISUALIZER ──────────────────────────────────────
function buildVisualizerControls() {
  document.getElementById("viz-room-btns").innerHTML = ROOMS.map(r=>
    `<button class="room-btn${r==="Living Room"?" active":""}" onclick="setVizRoom('${r}',this)">${r}</button>`).join("");
  document.getElementById("viz-area-btns").innerHTML = AREAS.map(a=>
    `<button class="room-btn${a==="Walls"?" active":""}" onclick="setVizArea('${a}',this)">${a}</button>`).join("");
  document.getElementById("viz-quick-colors").innerHTML = QUICK_COLORS.map(c=>
    `<div style="width:26px;height:26px;border-radius:5px;background:${c.hex};cursor:pointer;border:1px solid rgba(255,255,255,.1);" onclick="applyQuickColor('${c.hex}')" title="${c.name}"></div>`).join("");
}
function setVizRoom(r,el){_activeRoom=r;document.querySelectorAll("#viz-room-btns .room-btn").forEach(b=>b.classList.remove("active"));el.classList.add("active");drawVizRoom();}
function setVizArea(a,el){_activeArea=a;document.querySelectorAll("#viz-area-btns .room-btn").forEach(b=>b.classList.remove("active"));el.classList.add("active");document.getElementById("viz-color-picker").value=_vizColors[a];drawVizRoom();}
function applyQuickColor(c){document.getElementById("viz-color-picker").value=c;applyVizColor();}
function applyVizColor(){
  _vizColors[_activeArea]=document.getElementById("viz-color-picker").value;
  drawVizRoom(); renderVizInfo();
  const prompt=`You are a professional paint consultant in Ghana. For colour ${_vizColors[_activeArea]} applied to ${_activeArea} in a ${_activeRoom}: one sentence on the mood/atmosphere it creates, and one sentence on the best complementary colour for another surface in that room. Be specific. Max 35 words.`;
  askClaude(prompt,document.getElementById("viz-ai-box"),"Getting paint notes…");
}

// ── Canvas room drawing ──────────────────────────────────
function drawVizRoom() {
  const c = document.getElementById("viz-room-canvas"); if(!c)return;
  const ctx=c.getContext("2d"); const W=620,H=400; ctx.clearRect(0,0,W,H);
  const isExt=_activeRoom==="Exterior";
  if(isExt){
    // Exterior scene
    ctx.fillStyle="#87CEEB"; ctx.fillRect(0,0,W,H*.55);
    ctx.fillStyle="#6BAA4A"; ctx.fillRect(0,H*.72,W,H*.28);
    // Building
    ctx.fillStyle=_vizColors["Walls"]; ctx.fillRect(W*.08,H*.18,W*.84,H*.57);
    // Roof
    ctx.fillStyle=_vizColors["Trim"]; ctx.fillRect(W*.06,H*.16,W*.88,H*.06); ctx.strokeStyle="#00000022"; ctx.lineWidth=1; ctx.strokeRect(W*.06,H*.16,W*.88,H*.06);
    // Door
    ctx.fillStyle=_vizColors["Accent wall"]; ctx.fillRect(W*.43,H*.52,W*.14,H*.24); ctx.strokeStyle="#00000033"; ctx.lineWidth=1; ctx.strokeRect(W*.43,H*.52,W*.14,H*.24);
    // Windows
    [[.12,.28],[.3,.28],[.58,.28],[.76,.28]].forEach(([x,y])=>{
      ctx.fillStyle="rgba(180,215,240,.9)"; ctx.fillRect(W*x,H*y,W*.12,H*.18);
      ctx.strokeStyle="#00000033"; ctx.strokeRect(W*x,H*y,W*.12,H*.18);
      ctx.strokeStyle="rgba(0,0,0,.15)"; ctx.beginPath(); ctx.moveTo(W*(x+.06),H*y); ctx.lineTo(W*(x+.06),H*(y+.18)); ctx.stroke();
    });
    // Ground
    ctx.fillStyle="#C8B89A"; ctx.fillRect(W*.42,H*.72,W*.16,H*.28);
  } else {
    // Interior room
    ctx.fillStyle=_vizColors["Ceiling"]; ctx.fillRect(0,0,W,H*.08);
    ctx.fillStyle=_vizColors["Walls"]; ctx.fillRect(0,H*.08,W,H*.68);
    // Floor
    const fg=ctx.createLinearGradient(0,H*.76,0,H); fg.addColorStop(0,"#C4A882"); fg.addColorStop(1,"#A08060");
    ctx.fillStyle=fg; ctx.fillRect(0,H*.76,W,H*.24);
    // Ceiling to wall join
    ctx.fillStyle=_vizColors["Trim"]; ctx.fillRect(0,H*.07,W,H*.015);
    // Wall to floor join
    ctx.fillStyle=_vizColors["Trim"]; ctx.fillRect(0,H*.755,W,H*.015);
    // Accent wall (left panel)
    ctx.fillStyle=_vizColors["Accent wall"]; ctx.fillRect(0,H*.08,W*.18,H*.68);
    ctx.fillStyle=_vizColors["Trim"]; ctx.fillRect(W*.17,H*.08,W*.012,H*.68);
    // Windows
    const wG=ctx.createLinearGradient(W*.25,0,W*.65,0);
    wG.addColorStop(0,"rgba(180,215,240,.7)"); wG.addColorStop(.5,"rgba(220,240,255,.9)"); wG.addColorStop(1,"rgba(150,200,230,.7)");
    ctx.fillStyle=wG; ctx.fillRect(W*.28,H*.15,W*.44,H*.45);
    ctx.strokeStyle="rgba(255,255,255,.5)"; ctx.lineWidth=2; ctx.strokeRect(W*.28,H*.15,W*.44,H*.45);
    ctx.strokeStyle="rgba(255,255,255,.3)"; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(W*.5,H*.15); ctx.lineTo(W*.5,H*.6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W*.28,H*.37); ctx.lineTo(W*.72,H*.37); ctx.stroke();
    // Window trim
    ctx.fillStyle=_vizColors["Trim"]; ctx.fillRect(W*.265,H*.135,W*.47,H*.025); ctx.fillRect(W*.265,H*.59,W*.47,H*.025); ctx.fillRect(W*.265,H*.135,W*.025,H*.48); ctx.fillRect(W*.705,H*.135,W*.025,H*.48);
    // Furniture silhouette
    ctx.fillStyle="rgba(0,0,0,.12)"; ctx.fillRect(W*.18,H*.62,W*.28,H*.14); // sofa
    ctx.fillStyle="rgba(0,0,0,.08)"; ctx.fillRect(W*.2,H*.58,W*.1,H*.04); // cushion
    ctx.fillStyle="rgba(0,0,0,.1)"; ctx.fillRect(W*.5,H*.65,W*.18,H*.1); // side table
    ctx.fillStyle="rgba(0,0,0,.06)"; ctx.beginPath(); ctx.arc(W*.59,H*.6,W*.04,0,Math.PI*2); ctx.fill(); // lamp shade
    // Shadow on floor
    ctx.fillStyle="rgba(0,0,0,.08)"; ctx.fillRect(0,H*.76,W,H*.03);
  }
}

function renderVizInfo() {
  document.getElementById("viz-info").innerHTML = Object.entries(_vizColors).map(([k,v])=>`
    <div class="viz-chip">
      <div class="viz-chip-dot" style="background:${v};"></div>
      <span style="font-size:11px;color:var(--tm);">${k}</span>
      <span style="font-size:11px;font-weight:500;">${v.toUpperCase()}</span>
    </div>`).join("");
}

// ── COLOUR MATCHER ───────────────────────────────────────
function h2r(h){return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}
function r2h(r,g,b){return"#"+[r,g,b].map(x=>Math.max(0,Math.min(255,x)).toString(16).padStart(2,"0")).join("");}
function r2hsl(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h,s,l=(mx+mn)/2;if(mx===mn){h=s=0;}else{const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;}h/=6;}return[Math.round(h*360),Math.round(s*100),Math.round(l*100)];}
function hsl2h(h,s,l){s/=100;l/=100;const a=s*Math.min(l,1-l);const f=n=>{const k=(n+h/30)%12;return Math.round(255*(l-a*Math.max(Math.min(k-3,9-k,1),-1))).toString(16).padStart(2,"0");};return"#"+f(0)+f(8)+f(4);}
function getComp(hex){const[r,g,b]=h2r(hex);const[h,s,l]=r2hsl(r,g,b);return[hsl2h((h+180)%360,s,l),hsl2h((h+150)%360,s,l),hsl2h((h+210)%360,s,l)];}
function getAnal(hex){const[r,g,b]=h2r(hex);const[h,s,l]=r2hsl(r,g,b);return[hsl2h((h+30)%360,s,l),hsl2h((h+60)%360,s,l),hsl2h((h-30+360)%360,s,l)];}
function getTri(hex){const[r,g,b]=h2r(hex);const[h,s,l]=r2hsl(r,g,b);return[hsl2h((h+120)%360,s,l),hsl2h((h+240)%360,s,l),hsl2h(h,Math.max(10,s*.6),Math.min(90,l+15))];}

function findClosestPaintName(hex) {
  const allColors = PAINT_BOARDS.flatMap(b=>b.colors);
  const [r1,g1,b1] = h2r(hex);
  let best = null, bestDist = Infinity;
  allColors.forEach(c=>{
    const [r2,g2,b2]=h2r(c.hex);
    const d=Math.sqrt((r1-r2)**2+(g1-g2)**2+(b1-b2)**2);
    if(d<bestDist){bestDist=d;best=c;}
  });
  return best && bestDist < 80 ? best.name : "Custom Mix";
}

function renderMatchChips(arr,id){
  document.getElementById(id).innerHTML=arr.map(c=>`
    <div class="match-chip" onclick="navigator.clipboard&&navigator.clipboard.writeText('${c}')">
      <div class="match-chip-color" style="background:${c};"></div>
      <div class="match-chip-foot"><div style="font-size:10px;font-weight:500;color:var(--text);">${findClosestPaintName(c)}</div><div style="font-size:10px;color:var(--tm);">${c.toUpperCase()}</div></div>
    </div>`).join("");
}

let _matchColor="#3B6D11";
function syncMatchHex(){const v=document.getElementById("match-hex-input").value;if(/^#[0-9A-Fa-f]{6}$/.test(v)){document.getElementById("match-picker").value=v;_matchColor=v;runMatcher();}}
function runMatcher(){
  _matchColor=document.getElementById("match-picker").value;
  document.getElementById("match-hex-input").value=_matchColor;
  document.getElementById("match-input-swatch").style.background=_matchColor;
  document.getElementById("match-input-name").textContent=findClosestPaintName(_matchColor);
  const[r,g,b]=h2r(_matchColor);const[h,s,l]=r2hsl(r,g,b);
  document.getElementById("match-input-info").innerHTML=`HSL: ${h}° · ${s}% sat · ${l}% light<br>Tone: ${l>70?"Light":l>40?"Mid":"Dark"} · ${s>60?"Vivid":s>25?"Muted":"Neutral"}`;
  renderMatchChips(getComp(_matchColor),"match-comp");
  renderMatchChips(getAnal(_matchColor),"match-analog");
  renderMatchChips(getTri(_matchColor),"match-triad");
}
async function runMatchAI(){
  const comps=getComp(_matchColor).join(", ");
  const prompt=`As a professional colour consultant in Ghana, analyse paint colour ${_matchColor} for a residential or commercial building project. In 3 sentences: describe its emotional and atmospheric character, explain why its complementary colours (${comps}) work harmoniously with it, and suggest one specific interior application and one exterior application where it would excel in a Ghanaian property. Professional and specific. Max 75 words.`;
  await askClaude(prompt,document.getElementById("match-ai-box"),"Analysing colour harmony…");
}

// ── SAVED PALETTES ───────────────────────────────────────
function renderSavedPalettes(){
  const g=document.getElementById("saved-palettes-grid");
  const em=document.getElementById("saved-empty");
  const ent=Object.entries(_savedPalettes);
  if(!ent.length){g.style.display="none";em.style.display="block";return;}
  g.style.display="grid";em.style.display="none";
  g.innerHTML=ent.map(([key,p])=>`
    <div class="saved-card">
      <div style="height:120px;overflow:hidden;position:relative;">
        <img src="${p.photo||""}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy"/>
        <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(12,11,9,.7) 100%);"></div>
      </div>
      <div class="saved-band">${(p.colors||[]).map(c=>`<div style="background:${c.hex||c};flex:1;" title="${c.name||c}"></div>`).join("")}</div>
      <div class="saved-info">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-size:12px;font-weight:500;color:var(--text);">${p.title||""}</div>
          <button class="btn-danger" onclick="deleteSavedPalette('${key}')">✕</button>
        </div>
        <div style="font-size:11px;color:var(--tm);">${p.type||""} · ${p.savedAt||""}</div>
      </div>
    </div>`).join("");
}
async function deleteSavedPalette(key){
  try{await dbDelete("palettes",key);showStatus("Deleted","success");}
  catch(e){showStatus("Delete failed","error");}
}
