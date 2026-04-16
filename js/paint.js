// ConstructIQ v5 — Professional Paint Studio, 20+ boards

const PAINT_BOARDS = [
  // ── INTERIOR ────────────────────────────────────────────
  { id:1,type:"interior",mood:"earthy",title:"Warm Terracotta Living Room",
    photo:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80&auto=format&fit=crop",
    story:"Inspired by Ghana's laterite clay soils, this warm terracotta palette creates an intimate, grounded living room. Burnt orange walls radiate warmth in the evening and complement natural rattan and dark wood furniture. Pair with cream ceiling and brass light fittings.",
    tags:["warm","earthy","terracotta","cosy","lounge"],
    colors:[{name:"Terracotta Sun",hex:"#C4622D",code:"Dulux SW 6119"},{name:"Warm Cream",hex:"#F7F0E6",code:"Dulux W003"},{name:"Cocoa Brown",hex:"#8B6F5E",code:"Dulux SW 7512"},{name:"Dusty Rose",hex:"#D4A5A5",code:"Dulux 7117"},{name:"Copper Glow",hex:"#B87333",code:"Nippon 1087"}]},
  { id:2,type:"interior",mood:"coastal",title:"Coastal Blue Master Bedroom",
    photo:"https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80&auto=format&fit=crop",
    story:"Soft ocean blues create a restful sanctuary ideal for Accra and Takoradi homes. The muted blue-grey ceiling amplifies the sense of calm, while white trim keeps the room fresh and light. A natural linen bedspread completes the coastal retreat.",
    tags:["coastal","blue","calm","bedroom","serene"],
    colors:[{name:"Coastal Sky",hex:"#4A90D9",code:"Dulux 5012"},{name:"Sea Mist",hex:"#B8D4E8",code:"Dulux 5022"},{name:"White Sand",hex:"#F8F5EE",code:"Dulux W001"},{name:"Deep Navy",hex:"#2C5F8A",code:"Dulux 5024"},{name:"Driftwood",hex:"#C4A882",code:"Nippon 2081"}]},
  { id:3,type:"interior",mood:"fresh",title:"Sage Green Modern Kitchen",
    photo:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop",
    story:"Muted sage green breathes calm into a kitchen without overpowering it. Rooted in the lush greens of Ghana's forest belt, this palette feels refreshing yet sophisticated. Pair with white marble-effect worktops and brass hardware for the best result.",
    tags:["green","sage","kitchen","fresh","natural"],
    colors:[{name:"Sage Breeze",hex:"#7C9A82",code:"Dulux 6017"},{name:"Linen White",hex:"#F5F2EC",code:"Dulux W010"},{name:"Forest Floor",hex:"#4A5E3A",code:"Nippon 6022"},{name:"Warm Stone",hex:"#C4B5A5",code:"Dulux 2017"},{name:"Antique Brass",hex:"#B5892C",code:"Nippon 1091"}]},
  { id:4,type:"interior",mood:"bold",title:"Indigo Executive Study",
    photo:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80&auto=format&fit=crop",
    story:"Deep indigo walls make an intellectual statement in a home office. Rich and dramatic without being oppressive, this palette signals authority and confidence. Gold accessories and warm wood shelving complete the executive look.",
    tags:["bold","dark","luxury","indigo","office"],
    colors:[{name:"Royal Indigo",hex:"#2D3A8C",code:"Dulux 5056"},{name:"Midnight Deep",hex:"#1A1F4A",code:"Dulux 5058"},{name:"Ivory Cream",hex:"#F5F0E4",code:"Dulux W002"},{name:"Antique Gold",hex:"#C4A75A",code:"Nippon 1089"},{name:"Slate Blue",hex:"#4A5CC4",code:"Dulux 5054"}]},
  { id:5,type:"interior",mood:"minimal",title:"Warm Linen Bedroom",
    photo:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80&auto=format&fit=crop",
    story:"A perfectly balanced neutral palette that creates a hotel-like retreat. Warm linen tones reference the natural fibres of Kente cloth, while layered neutrals build depth without colour conflict. Timeless, versatile, and endlessly elegant.",
    tags:["minimal","neutral","linen","calm","bedroom"],
    colors:[{name:"Warm Linen",hex:"#E8DDD0",code:"Dulux W020"},{name:"Oat Milk",hex:"#F5EEE4",code:"Dulux W018"},{name:"Greige",hex:"#C4B4A0",code:"Nippon 2071"},{name:"Charcoal",hex:"#5A5A5A",code:"Dulux N003"},{name:"Alabaster",hex:"#FAF8F5",code:"Dulux W001"}]},
  { id:6,type:"interior",mood:"bold",title:"Sunset Amber Lounge",
    photo:"https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=600&q=80&auto=format&fit=crop",
    story:"Inspired by Accra's breathtaking Atlantic sunsets. Bold amber as a feature wall radiates energy and confidence. Balance with cooler neutrals on adjacent walls and pair with dark wood or charcoal grey sofas.",
    tags:["bold","warm","sunset","vibrant","lounge"],
    colors:[{name:"Sunset Amber",hex:"#E87040",code:"Dulux 2065"},{name:"Golden Hour",hex:"#F5C08A",code:"Nippon 1079"},{name:"Warm White",hex:"#FFF5E6",code:"Dulux W008"},{name:"Bark Brown",hex:"#8B4A20",code:"Dulux 2052"},{name:"Burnt Clay",hex:"#C4763A",code:"Nippon 2061"}]},
  { id:7,type:"interior",mood:"minimal",title:"Spa Monochrome Bathroom",
    photo:"https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80&auto=format&fit=crop",
    story:"White-on-white with carefully selected grey tones creates depth and sophistication. Deep charcoal grout lines provide crisp visual definition. A timeless bathroom palette that always looks pristine and photographs beautifully.",
    tags:["minimal","monochrome","white","bathroom","spa"],
    colors:[{name:"Pure White",hex:"#FAFAFA",code:"Dulux W001"},{name:"Soft Marble",hex:"#F0EDEA",code:"Dulux W015"},{name:"Urban Grey",hex:"#AAAAAA",code:"Nippon N025"},{name:"Charcoal Line",hex:"#333333",code:"Dulux N001"},{name:"Pearl Mist",hex:"#E8E4E0",code:"Dulux W019"}]},
  { id:8,type:"interior",mood:"tropical",title:"Tropical Green Dining Room",
    photo:"https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80&auto=format&fit=crop",
    story:"Bring the verdant richness of Ghana's rainforest into your dining room. Deep botanical green creates a dramatic backdrop for entertaining. Warm gold accents inspired by Kente cloth elevate the space to celebratory luxury.",
    tags:["tropical","green","bold","nature","dining"],
    colors:[{name:"Forest Deep",hex:"#2D5A1B",code:"Dulux 6055"},{name:"Tropical Leaf",hex:"#7BA05B",code:"Nippon 6031"},{name:"Aged Ivory",hex:"#F5F0E8",code:"Dulux W005"},{name:"Kente Gold",hex:"#C8A96E",code:"Nippon 1085"},{name:"Mahogany",hex:"#8B4513",code:"Dulux 2051"}]},
  { id:9,type:"interior",mood:"warm",title:"Dusty Pink Girls' Bedroom",
    photo:"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80&auto=format&fit=crop",
    story:"Soft, muted dusty pink — not too sweet, never garish — creates a sophisticated bedroom for young girls that will grow with them through their teenage years. Pair with white furniture and natural wood accents for a timeless look.",
    tags:["pink","warm","bedroom","girls","soft"],
    colors:[{name:"Dusty Petal",hex:"#E8B4B8",code:"Dulux 7118"},{name:"Blush Cream",hex:"#F8EEF0",code:"Nippon W055"},{name:"Rose Mauve",hex:"#C4889A",code:"Dulux 7116"},{name:"Warm White",hex:"#FAF8F5",code:"Dulux W001"},{name:"Dusk Grey",hex:"#9A8A8E",code:"Nippon N024"}]},
  { id:10,type:"interior",mood:"bold",title:"Charcoal & Gold Master Suite",
    photo:"https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80&auto=format&fit=crop",
    story:"A dramatically masculine master suite in deep charcoal and warm gold. The combination of near-black walls with gold accents creates extraordinary evening atmosphere. Ideal for the executive Ghanaian home that wants to make an impression.",
    tags:["bold","dark","charcoal","gold","master","luxury"],
    colors:[{name:"Deep Charcoal",hex:"#2A2A2A",code:"Dulux N001"},{name:"Warm Gold",hex:"#C9943A",code:"Nippon 1089"},{name:"Pewter",hex:"#7A7A7A",code:"Dulux N015"},{name:"Ivory White",hex:"#F5F0E8",code:"Dulux W002"},{name:"Copper Bronze",hex:"#8B6914",code:"Nippon 1088"}]},
  { id:11,type:"interior",mood:"fresh",title:"Sky Blue Children's Room",
    photo:"https://images.unsplash.com/photo-1596079890744-c1a0462d0975?w=600&q=80&auto=format&fit=crop",
    story:"A cheerful, energetic sky blue perfectly suited for children's bedrooms and playrooms. Bright enough to stimulate and engage, the white accents keep the space from feeling heavy. Add colourful accessories for a playful finish.",
    tags:["blue","fresh","children","bright","playful"],
    colors:[{name:"Sky Blue",hex:"#87CEEB",code:"Dulux 5010"},{name:"Cloud White",hex:"#F8F9FA",code:"Dulux W001"},{name:"Cornflower",hex:"#6495ED",code:"Nippon 5045"},{name:"Lemon Drop",hex:"#FFF44F",code:"Nippon 1060"},{name:"Soft Grey",hex:"#D0D0D0",code:"Dulux N025"}]},
  { id:12,type:"interior",mood:"warm",title:"Earthy Living Room Accra",
    photo:"https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80&auto=format&fit=crop",
    story:"A palette born from Ghana's land itself — ochre earth, warm clay, and natural stone. This living room scheme feels simultaneously contemporary and rooted. Works beautifully with terrazzo floors common in Ghanaian homes.",
    tags:["earthy","warm","ochre","ghana","natural","lounge"],
    colors:[{name:"Earth Ochre",hex:"#C8862A",code:"Nippon 1083"},{name:"Sandstone",hex:"#E8D5A8",code:"Dulux W035"},{name:"Clay Red",hex:"#A0522D",code:"Dulux 2055"},{name:"Stone Cream",hex:"#F5EDD0",code:"Nippon W043"},{name:"Dark Soil",hex:"#5C3A1E",code:"Dulux 2048"}]},
  // ── EXTERIOR ────────────────────────────────────────────────
  { id:13,type:"exterior",mood:"warm",title:"Classic Ghanaian Compound Home",
    photo:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80&auto=format&fit=crop",
    story:"Warm ochres and earthy tones that have defined Ghanaian residential architecture for generations. This palette references the laterite soil of southern Ghana, ages beautifully in tropical sun, and is forgiving to maintain in coastal humidity.",
    tags:["warm","classic","ghana","ochre","traditional","exterior"],
    colors:[{name:"Ochre Gold",hex:"#C8862A",code:"Dulux 1065"},{name:"Sahara Sand",hex:"#F5E6C8",code:"Nippon W041"},{name:"Dark Mahogany",hex:"#4A3728",code:"Dulux 2048"},{name:"Clay Brown",hex:"#8B7355",code:"Nippon 2077"},{name:"Sunbaked Amber",hex:"#D4A853",code:"Dulux 1069"}]},
  { id:14,type:"exterior",mood:"minimal",title:"Contemporary White Residence",
    photo:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80&auto=format&fit=crop",
    story:"Crisp white with deep accents — the signature of East Legon's most admired contemporary homes. Pure white walls pop brilliantly in Ghana's intense sunlight. The dark trim grounds the design with authority. Increasingly popular for new builds across Greater Accra.",
    tags:["minimal","white","modern","contemporary","exterior"],
    colors:[{name:"Brilliant White",hex:"#F8F8F8",code:"Dulux W001"},{name:"Cool White",hex:"#F2F4F5",code:"Nippon W001"},{name:"Anthracite",hex:"#3A3A3A",code:"Dulux N002"},{name:"Pewter Grey",hex:"#8A8A8A",code:"Nippon N020"},{name:"Tropical Green",hex:"#2C6E49",code:"Dulux 6041"}]},
  { id:15,type:"exterior",mood:"classic",title:"Heritage Cream Colonial",
    photo:"https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80&auto=format&fit=crop",
    story:"Timeless cream and chocolate brown honouring Ghana's colonial-era architectural heritage. This palette photographs beautifully, glows warmly at dusk, and is forgiving in tropical humidity. A tried-and-tested combination seen throughout Accra's established residential areas.",
    tags:["classic","cream","colonial","elegant","heritage","exterior"],
    colors:[{name:"Heritage Cream",hex:"#F5ECD7",code:"Dulux W030"},{name:"Chocolate Trim",hex:"#8B6F47",code:"Nippon 2080"},{name:"Deep Espresso",hex:"#2C2C2C",code:"Dulux N001"},{name:"Antique Stone",hex:"#C4A46B",code:"Nippon 2083"},{name:"Dark Teak",hex:"#6B5A3E",code:"Dulux 2049"}]},
  { id:16,type:"exterior",mood:"bold",title:"Statement Grey 3-Storey",
    photo:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80&auto=format&fit=crop",
    story:"Sophisticated dark grey makes a bold architectural statement for three-storey homes. Increasingly popular in Airport Residential and Cantonments, this palette conveys professional confidence. The muted green accent adds organic warmth against the cool grey.",
    tags:["bold","grey","contemporary","3-storey","exterior"],
    colors:[{name:"Steel Grey",hex:"#5A5A5A",code:"Nippon N015"},{name:"Anthracite",hex:"#333333",code:"Dulux N002"},{name:"Light Silver",hex:"#C0C0C0",code:"Nippon N030"},{name:"Ivory White",hex:"#F8F6F0",code:"Dulux W002"},{name:"Moss Green",hex:"#4A6741",code:"Dulux 6038"}]},
  { id:17,type:"exterior",mood:"warm",title:"Terracotta Townhouse",
    photo:"https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80&auto=format&fit=crop",
    story:"Deep terracotta elevates a town house from ordinary to memorable. This palette is particularly effective on two and three-storey homes where the colour has enough area to make an impact. White window frames and cream banding provide essential visual relief.",
    tags:["warm","terracotta","townhouse","bold","exterior"],
    colors:[{name:"Deep Terracotta",hex:"#C4622D",code:"Dulux 2064"},{name:"Burnt Sienna",hex:"#A0522D",code:"Nippon 2060"},{name:"Cream Band",hex:"#F5EDD0",code:"Dulux W038"},{name:"White Frame",hex:"#F8F8F8",code:"Dulux W001"},{name:"Dark Trim",hex:"#3D2B1F",code:"Nippon 2047"}]},
  { id:18,type:"exterior",mood:"fresh",title:"Tropical Green Villa",
    photo:"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80&auto=format&fit=crop",
    story:"Crisp white walls pop against vibrant tropical landscaping in this villa-inspired exterior. The combination of pure white and deep garden green is especially effective in Ghana where lush compound planting is the norm. A white gate and perimeter wall complete the composition.",
    tags:["tropical","white","green","villa","garden","exterior"],
    colors:[{name:"Villa White",hex:"#FFFFFF",code:"Dulux W001"},{name:"Garden Green",hex:"#2C7A3A",code:"Nippon 6040"},{name:"Warm Sandstone",hex:"#E8D5A0",code:"Dulux W036"},{name:"Stone Beige",hex:"#8B7355",code:"Nippon 2077"},{name:"Deep Forest",hex:"#1A4A25",code:"Dulux 6057"}]},
  { id:19,type:"exterior",mood:"classic",title:"Sand & Terracotta Bungalow",
    photo:"https://images.unsplash.com/photo-1598228723793-52759bba239c?w=600&q=80&auto=format&fit=crop",
    story:"The quintessential Ghanaian single-storey home palette. Sandy walls and terracotta roof tiles are a combination that has stood the test of time across every region of Ghana. Simple to maintain, easy to repaint, and universally accepted.",
    tags:["classic","sand","bungalow","ghana","traditional","exterior"],
    colors:[{name:"Warm Sand",hex:"#F0D5A0",code:"Dulux W041"},{name:"Terracotta Roof",hex:"#C4622D",code:"Nippon 2063"},{name:"White Trim",hex:"#FAFAFA",code:"Dulux W001"},{name:"Brown Gate",hex:"#6B4A2A",code:"Nippon 2050"},{name:"Dusty Stone",hex:"#C8B89A",code:"Dulux 2076"}]},
  { id:20,type:"exterior",mood:"bold",title:"Navy Blue Commercial Façade",
    photo:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format&fit=crop",
    story:"A commanding navy blue façade that gives a commercial building instant brand presence. Increasingly used for upmarket office buildings, banks, and corporate headquarters across Accra. The bright white signage band and gold accents make it unmistakably premium.",
    tags:["bold","navy","commercial","corporate","exterior"],
    colors:[{name:"Navy Blue",hex:"#1A2F5A",code:"Dulux 5060"},{name:"Commercial Grey",hex:"#4A4A5A",code:"Nippon N012"},{name:"White Signage",hex:"#FFFFFF",code:"Dulux W001"},{name:"Corporate Gold",hex:"#C9943A",code:"Nippon 1089"},{name:"Slate",hex:"#708090",code:"Dulux 5035"}]},
];

const PAINT_MOODS = ["all","warm","coastal","earthy","minimal","bold","fresh","tropical","classic"];
const ROOMS  = ["Living Room","Bedroom","Kitchen","Dining Room","Exterior","Study","Bathroom","Children's Room"];
const AREAS  = ["Walls","Ceiling","Trim","Accent wall"];
const QUICK  = [
  {h:"#F5ECD7",n:"Heritage Cream"},{h:"#C4622D",n:"Terracotta Sun"},
  {h:"#4A90D9",n:"Coastal Sky"},{h:"#2D5A1B",n:"Forest Deep"},
  {h:"#E8DDD0",n:"Warm Linen"},{h:"#5A5A5A",n:"Steel Grey"},
  {h:"#7C9A82",n:"Sage Breeze"},{h:"#2D3A8C",n:"Royal Indigo"},
  {h:"#E87040",n:"Sunset Amber"},{h:"#C8862A",n:"Ochre Gold"},
  {h:"#F8F8F8",n:"Brilliant White"},{h:"#2A2A2A",n:"Deep Charcoal"},
];

let _activeMood="all", _selBoard=null;
let _activeRoom="Living Room", _activeArea="Walls";
let _vizColors={Walls:"#F5ECD7",Ceiling:"#F8F8F8",Trim:"#FFFFFF","Accent wall":"#4A90D9"};
let _savedPalettes={};

function initPaint(){
  dbListen("palettes",data=>{_savedPalettes=data||{};renderSavedPalettes();});
}

function buildPaintTags(){
  document.getElementById("paint-tags").innerHTML=PAINT_MOODS.map(t=>
    `<button class="ptag${t==="all"?" active":""}" onclick="setPaintTag('${t}',this)">${t}</button>`).join("");
}
function setPaintTag(t,el){_activeMood=t;document.querySelectorAll("#paint-tags .ptag").forEach(x=>x.classList.remove("active"));el.classList.add("active");filterPins();}

function filterPins(){
  const q=document.getElementById("pin-search")?.value.toLowerCase()||"";
  const tp=document.getElementById("pin-type-filter")?.value||"";
  const f=PAINT_BOARDS.filter(b=>{
    const mm=_activeMood==="all"||b.mood===_activeMood||b.tags.includes(_activeMood);
    const tm=!tp||b.type===tp;
    const qm=!q||b.title.toLowerCase().includes(q)||b.tags.some(t=>t.includes(q));
    return mm&&tm&&qm;
  });
  document.getElementById("pin-grid").innerHTML=f.map(b=>`
    <div class="pin-card${_selBoard?.id===b.id?" selected":""}" onclick="selectBoard(${b.id})">
      <div class="pin-img-wrap"><img src="${b.photo}" alt="${b.title}" loading="lazy" style="width:100%;display:block;border-radius:12px 12px 0 0;"/></div>
      <div class="pin-overlay-hover"></div>
      <div class="pin-footer">
        <div class="pin-footer-title">${b.title}</div>
        <div style="display:flex;gap:4px;margin-top:5px;align-items:center;">
          ${b.colors.map(c=>`<div style="width:14px;height:14px;border-radius:3px;background:${c.hex};border:0.5px solid rgba(255,255,255,.12);" title="${c.name}"></div>`).join("")}
          <span style="font-size:10px;color:var(--td);margin-left:4px;">${b.type}</span>
        </div>
      </div>
    </div>`).join("");
}

function selectBoard(id){
  _selBoard=PAINT_BOARDS.find(b=>b.id===id);
  filterPins();
  const det=document.getElementById("pin-detail"); det.style.display="block";
  document.getElementById("pin-detail-title").textContent=_selBoard.title;
  document.getElementById("pin-detail-tags").innerHTML=_selBoard.tags.map(t=>
    `<span style="background:var(--bg2);padding:2px 8px;border-radius:10px;font-size:10.5px;margin-right:4px;color:var(--tm);">${t}</span>`).join("");
  document.getElementById("pin-story").textContent=_selBoard.story;
  document.getElementById("pin-room-wrap").innerHTML=`<img src="${_selBoard.photo}" alt="${_selBoard.title}" style="width:100%;border-radius:12px;display:block;"/>`;
  document.getElementById("pin-swatches-row").innerHTML=_selBoard.colors.map(c=>`<div style="background:${c.hex};flex:1;" title="${c.name}"></div>`).join("");
  document.getElementById("pin-palette").innerHTML=_selBoard.colors.map(c=>`
    <div class="pal-chip" onclick="navigator.clipboard&&navigator.clipboard.writeText('${c.hex}')" title="Click to copy">
      <div class="pal-chip-color" style="background:${c.hex};"></div>
      <div class="pal-chip-foot"><div class="pal-chip-name">${c.name}</div><div class="pal-chip-hex">${c.hex}</div></div>
    </div>`).join("");
  document.getElementById("pin-codes").innerHTML=_selBoard.colors.map(c=>`
    <div class="pin-code-item" onclick="navigator.clipboard&&navigator.clipboard.writeText('${c.hex}')" title="Copy ${c.hex}">
      <div class="pin-code-dot" style="background:${c.hex};"></div>
      <div><span class="pin-code-name">${c.name}</span><span class="pin-code-hex">${c.code} · ${c.hex}</span></div>
    </div>`).join("");
  document.getElementById("pin-ai-box").textContent='Click "AI colour advice" for expert recommendations…';
  det.scrollIntoView({behavior:"smooth",block:"nearest"});
}

async function getPinAI(){
  if(!_selBoard) return;
  const b=_selBoard;
  const cl=b.colors.map(c=>`${c.name} (${c.hex})`).join(", ");
  const p=`You are a professional interior designer and paint consultant specialising in Ghanaian homes. For the "${b.title}" palette with colours: ${cl} — provide 3 expert professional tips: (1) which specific rooms this works best in and why for a Ghanaian home, (2) the exact application — which colour on what surface (main walls, ceiling, trim, accent wall), (3) what furniture materials and finishes complement it best in Ghana's climate. Specific, professional, practical. Max 90 words.`;
  await askClaude(p, document.getElementById("pin-ai-box"), "Generating colour advice…");
}

async function savePinPalette(){
  if(!_selBoard) return;
  if(Object.values(_savedPalettes).find(s=>s.id===_selBoard.id)){alert("Already saved!");return;}
  try{await dbAdd("palettes",{..._selBoard,savedAt:new Date().toLocaleDateString()});showStatus("Palette saved ✓","success");}
  catch(e){showStatus("Save failed","error");}
}

// ── VISUALIZER ────────────────────────────────────────────
function buildVisualizerControls(){
  document.getElementById("viz-room-btns").innerHTML=ROOMS.map(r=>`<button class="room-btn${r==="Living Room"?" active":""}" onclick="setVizRoom('${r}',this)">${r}</button>`).join("");
  document.getElementById("viz-area-btns").innerHTML=AREAS.map(a=>`<button class="room-btn${a==="Walls"?" active":""}" onclick="setVizArea('${a}',this)">${a}</button>`).join("");
  document.getElementById("viz-quick-colors").innerHTML=QUICK.map(c=>`<div style="width:26px;height:26px;border-radius:5px;background:${c.h};cursor:pointer;border:1px solid rgba(255,255,255,.1);" onclick="applyQuickColor('${c.h}')" title="${c.n}"></div>`).join("");
}
function setVizRoom(r,el){_activeRoom=r;document.querySelectorAll("#viz-room-btns .room-btn").forEach(b=>b.classList.remove("active"));el.classList.add("active");drawVizRoom();}
function setVizArea(a,el){_activeArea=a;document.querySelectorAll("#viz-area-btns .room-btn").forEach(b=>b.classList.remove("active"));el.classList.add("active");document.getElementById("viz-color-picker").value=_vizColors[a];drawVizRoom();}
function applyQuickColor(c){document.getElementById("viz-color-picker").value=c;applyVizColor();}
function applyVizColor(){
  _vizColors[_activeArea]=document.getElementById("viz-color-picker").value;
  drawVizRoom();renderVizInfo();
  askClaude(`You are a paint consultant in Ghana. For colour ${_vizColors[_activeArea]} on ${_activeArea} in a ${_activeRoom}: one sentence on the mood created, one sentence on the best complementary colour for another surface. 35 words max.`,document.getElementById("viz-ai-box"),"Getting paint notes…");
}

function drawVizRoom(){
  const c=document.getElementById("viz-room-canvas");if(!c)return;
  const ctx=c.getContext("2d"),W=620,H=400;ctx.clearRect(0,0,W,H);
  const isExt=_activeRoom==="Exterior";
  if(isExt){
    ctx.fillStyle="#87CEEB";ctx.fillRect(0,0,W,H*.55);
    ctx.fillStyle="#6BAA4A";ctx.fillRect(0,H*.72,W,H*.28);
    ctx.fillStyle=_vizColors["Walls"];ctx.fillRect(W*.08,H*.18,W*.84,H*.57);
    ctx.fillStyle=_vizColors["Trim"];ctx.fillRect(W*.06,H*.16,W*.88,H*.06);
    ctx.strokeStyle="#00000022";ctx.lineWidth=1;ctx.strokeRect(W*.06,H*.16,W*.88,H*.06);
    ctx.fillStyle=_vizColors["Accent wall"];ctx.fillRect(W*.43,H*.52,W*.14,H*.24);
    ctx.strokeStyle="#00000033";ctx.strokeRect(W*.43,H*.52,W*.14,H*.24);
    [[.11,.28],[.29,.28],[.58,.28],[.76,.28]].forEach(([x,y])=>{
      const wG=ctx.createLinearGradient(W*x,0,W*(x+.12),0);
      wG.addColorStop(0,"rgba(180,215,240,.8)");wG.addColorStop(1,"rgba(220,240,255,.9)");
      ctx.fillStyle=wG;ctx.fillRect(W*x,H*y,W*.12,H*.18);
      ctx.strokeStyle="#00000033";ctx.strokeRect(W*x,H*y,W*.12,H*.18);
      ctx.strokeStyle="rgba(0,0,0,.12)";ctx.beginPath();ctx.moveTo(W*(x+.06),H*y);ctx.lineTo(W*(x+.06),H*(y+.18));ctx.stroke();
    });
    ctx.fillStyle="#C8B89A";ctx.fillRect(W*.42,H*.72,W*.16,H*.28);
  } else {
    ctx.fillStyle=_vizColors["Ceiling"];ctx.fillRect(0,0,W,H*.09);
    ctx.fillStyle=_vizColors["Walls"];ctx.fillRect(0,H*.09,W,H*.67);
    const fg=ctx.createLinearGradient(0,H*.76,0,H);fg.addColorStop(0,"#C4A882");fg.addColorStop(1,"#A08060");
    ctx.fillStyle=fg;ctx.fillRect(0,H*.76,W,H*.24);
    ctx.fillStyle=_vizColors["Trim"];ctx.fillRect(0,H*.08,W,H*.015);
    ctx.fillStyle=_vizColors["Trim"];ctx.fillRect(0,H*.755,W,H*.015);
    ctx.fillStyle=_vizColors["Accent wall"];ctx.fillRect(0,H*.09,W*.18,H*.67);
    ctx.fillStyle=_vizColors["Trim"];ctx.fillRect(W*.175,H*.09,W*.012,H*.67);
    const wG=ctx.createLinearGradient(W*.28,0,W*.72,0);
    wG.addColorStop(0,"rgba(180,215,240,.7)");wG.addColorStop(.5,"rgba(220,240,255,.9)");wG.addColorStop(1,"rgba(150,200,230,.7)");
    ctx.fillStyle=wG;ctx.fillRect(W*.28,H*.15,W*.44,H*.45);
    ctx.strokeStyle="rgba(255,255,255,.5)";ctx.lineWidth=2;ctx.strokeRect(W*.28,H*.15,W*.44,H*.45);
    ctx.strokeStyle="rgba(255,255,255,.3)";ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(W*.5,H*.15);ctx.lineTo(W*.5,H*.6);ctx.stroke();
    ctx.beginPath();ctx.moveTo(W*.28,H*.37);ctx.lineTo(W*.72,H*.37);ctx.stroke();
    ctx.fillStyle=_vizColors["Trim"];ctx.fillRect(W*.265,H*.135,W*.47,H*.025);ctx.fillRect(W*.265,H*.59,W*.47,H*.025);ctx.fillRect(W*.265,H*.135,W*.025,H*.48);ctx.fillRect(W*.705,H*.135,W*.025,H*.48);
    ctx.fillStyle="rgba(0,0,0,.12)";ctx.fillRect(W*.18,H*.62,W*.28,H*.14);
    ctx.fillStyle="rgba(0,0,0,.08)";ctx.fillRect(W*.19,H*.585,W*.1,H*.04);
    ctx.fillStyle="rgba(0,0,0,.09)";ctx.fillRect(W*.5,H*.65,W*.18,H*.1);
    ctx.fillStyle="rgba(0,0,0,.06)";ctx.beginPath();ctx.arc(W*.59,H*.6,W*.04,0,Math.PI*2);ctx.fill();
  }
}
function renderVizInfo(){
  document.getElementById("viz-info").innerHTML=Object.entries(_vizColors).map(([k,v])=>`
    <div class="viz-chip"><div class="viz-chip-dot" style="background:${v};"></div>
    <span style="font-size:11px;color:var(--tm);">${k}</span>
    <span style="font-size:11px;font-weight:500;">${v.toUpperCase()}</span></div>`).join("");
}

// ── COLOUR MATCHER ────────────────────────────────────────
function h2r(h){return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}
function r2hsl(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h,s,l=(mx+mn)/2;if(mx===mn){h=s=0;}else{const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;}h/=6;}return[Math.round(h*360),Math.round(s*100),Math.round(l*100)];}
function hsl2h(h,s,l){s/=100;l/=100;const a=s*Math.min(l,1-l);const f=n=>{const k=(n+h/30)%12;return Math.round(255*(l-a*Math.max(Math.min(k-3,9-k,1),-1))).toString(16).padStart(2,"0");};return"#"+f(0)+f(8)+f(4);}
function getComp(h){const[r,g,b]=h2r(h);const[hh,s,l]=r2hsl(r,g,b);return[hsl2h((hh+180)%360,s,l),hsl2h((hh+150)%360,s,l),hsl2h((hh+210)%360,s,l)];}
function getAnal(h){const[r,g,b]=h2r(h);const[hh,s,l]=r2hsl(r,g,b);return[hsl2h((hh+30)%360,s,l),hsl2h((hh+60)%360,s,l),hsl2h((hh-30+360)%360,s,l)];}
function getTri(h){const[r,g,b]=h2r(h);const[hh,s,l]=r2hsl(r,g,b);return[hsl2h((hh+120)%360,s,l),hsl2h((hh+240)%360,s,l),hsl2h(hh,Math.max(10,s*.6),Math.min(90,l+15))];}
function findPaintName(h){const all=PAINT_BOARDS.flatMap(b=>b.colors);const[r1,g1,b1]=h2r(h);let best=null,bd=Infinity;all.forEach(c=>{const[r2,g2,b2]=h2r(c.hex);const d=Math.sqrt((r1-r2)**2+(g1-g2)**2+(b1-b2)**2);if(d<bd){bd=d;best=c;}});return best&&bd<80?best.name:"Custom Mix";}
function chips(arr,id){document.getElementById(id).innerHTML=arr.map(c=>`<div class="match-chip" onclick="navigator.clipboard&&navigator.clipboard.writeText('${c}')"><div class="match-chip-color" style="background:${c};"></div><div class="match-chip-foot"><div style="font-size:10px;font-weight:500;color:var(--text);">${findPaintName(c)}</div><div style="font-size:10px;color:var(--tm);">${c.toUpperCase()}</div></div></div>`).join("");}

let _mc="#3B6D11";
function syncMatchHex(){const v=document.getElementById("match-hex-input")?.value;if(/^#[0-9A-Fa-f]{6}$/.test(v)){document.getElementById("match-picker").value=v;_mc=v;runMatcher();}}
function runMatcher(){
  _mc=document.getElementById("match-picker")?.value||_mc;
  if(document.getElementById("match-hex-input")) document.getElementById("match-hex-input").value=_mc;
  const sw=document.getElementById("match-input-swatch");if(sw)sw.style.background=_mc;
  const nm=document.getElementById("match-input-name");if(nm)nm.textContent=findPaintName(_mc);
  const[r,g,b]=h2r(_mc);const[h,s,l]=r2hsl(r,g,b);
  const inf=document.getElementById("match-input-info");if(inf)inf.innerHTML=`HSL: ${h}° · ${s}% sat · ${l}% light<br>Tone: ${l>70?"Light":l>40?"Mid":"Dark"} · ${s>60?"Vivid":s>25?"Muted":"Neutral"}`;
  chips(getComp(_mc),"match-comp"); chips(getAnal(_mc),"match-analog"); chips(getTri(_mc),"match-triad");
}
async function runMatchAI(){
  const comps=getComp(_mc).join(", ");
  await askClaude(`Professional paint consultant in Ghana: analyse colour ${_mc} for a residential or commercial project. 3 sentences: (1) emotional and atmospheric character, (2) why its complementary colours (${comps}) work harmoniously, (3) one interior and one exterior application in a Ghanaian property. Professional, specific. Max 75 words.`,document.getElementById("match-ai-box"),"Analysing…");
}

// ── SAVED ─────────────────────────────────────────────────
function renderSavedPalettes(){
  const g=document.getElementById("saved-palettes-grid"),em=document.getElementById("saved-empty");
  const ent=Object.entries(_savedPalettes);
  if(!ent.length){g.style.display="none";em.style.display="block";return;}
  g.style.display="grid";em.style.display="none";
  g.innerHTML=ent.map(([key,p])=>`<div class="saved-card">
    <div style="height:100px;overflow:hidden;position:relative;"><img src="${p.photo||""}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy"/><div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(12,11,9,.7) 100%);"></div></div>
    <div style="display:flex;height:28px;">${(p.colors||[]).map(c=>`<div style="background:${c.hex||c};flex:1;" title="${c.name||c}"></div>`).join("")}</div>
    <div style="padding:8px 10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-size:12px;font-weight:500;color:var(--text);">${p.title||""}</div><button class="btn-danger" onclick="deleteSavedPalette('${key}')">✕</button></div>
      <div style="font-size:11px;color:var(--tm);">${p.type||""} · ${p.savedAt||""}</div>
    </div></div>`).join("");
}
async function deleteSavedPalette(key){
  try{await dbDelete("palettes",key);showStatus("Deleted","success");}catch(e){showStatus("Failed","error");}
}
