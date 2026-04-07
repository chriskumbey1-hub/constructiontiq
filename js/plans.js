// ═══════════════════════════════════════════════════════
//  ConstructIQ — Building Plans Module
// ═══════════════════════════════════════════════════════

const PLANS = [
  { id:1, name:"Studio Bungalow",   type:"bungalow",   beds:1, baths:1, floors:1, area:55,  plot:0.25, tags:["Starter","Compact"],      color:"#EF9F27" },
  { id:2, name:"Family Bungalow",   type:"bungalow",   beds:3, baths:2, floors:1, area:120, plot:0.5,  tags:["Popular","Family"],        color:"#1D9E75" },
  { id:3, name:"Classic 2-Storey",  type:"storey2",    beds:4, baths:3, floors:2, area:200, plot:0.5,  tags:["Spacious"],                color:"#D85A30" },
  { id:4, name:"Modern 3-Storey",   type:"storey3",    beds:6, baths:4, floors:3, area:340, plot:1,    tags:["Premium","Large"],         color:"#7F77DD" },
  { id:5, name:"Executive Mansion", type:"mansion",    beds:7, baths:6, floors:3, area:600, plot:2,    tags:["Luxury"],                  color:"#BA7517" },
  { id:6, name:"Commercial Block",  type:"commercial", beds:0, baths:4, floors:4, area:800, plot:2,    tags:["Investment","Commercial"], color:"#185FA5" },
];

let _selectedPlan = null;

// ── SVG house illustration ───────────────────────────────
function buildHouseSVG(plan, w, h) {
  w = w || 200; h = h || 175;
  const c      = plan.color;
  const floors = Math.min(plan.floors, 3);
  const baseH  = 52, floorH = 42;
  let svg = `<svg viewBox="0 0 220 175" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">`;

  // Building body
  svg += `<rect x="10" y="${175-baseH-floors*floorH}" width="200" height="${floors*floorH+baseH}" fill="${c}22" stroke="${c}" stroke-width="1.5" rx="2"/>`;

  // Floors
  for (let f = 0; f < floors; f++) {
    const y = 175 - baseH - (f+1)*floorH;
    svg += `<rect x="10" y="${y}" width="200" height="${floorH}" fill="none" stroke="${c}55" stroke-width="0.5"/>`;
    for (let wi = 0; wi < 3; wi++) {
      const wx = 28 + wi*64;
      svg += `<rect x="${wx}" y="${y+10}" width="26" height="20" fill="${c}44" stroke="${c}" stroke-width="1" rx="2"/>`;
      svg += `<line x1="${wx+13}" y1="${y+10}" x2="${wx+13}" y2="${y+30}" stroke="${c}66" stroke-width="0.5"/>`;
    }
  }

  // Roof
  const rY = 175 - baseH - floors*floorH;
  svg += `<polygon points="10,${rY} 110,${rY-42} 210,${rY}" fill="${c}55" stroke="${c}" stroke-width="1.5"/>`;

  // Door
  svg += `<rect x="87" y="${175-baseH}" width="26" height="36" fill="${c}66" stroke="${c}" stroke-width="1" rx="2"/>`;
  svg += `<circle cx="107" cy="${175-baseH+19}" r="2.5" fill="${c}"/>`;

  // Ground
  svg += `<rect x="0" y="163" width="220" height="12" fill="${c}22" rx="2"/>`;
  svg += `</svg>`;
  return svg;
}

// ── Render plan grid ─────────────────────────────────────
function renderPlans() {
  document.getElementById("plans-grid").innerHTML = PLANS.map(p => `
    <div class="plan-card${_selectedPlan?.id===p.id?" selected":""}" onclick="selectPlan(${p.id})">
      <div class="plan-visual">${buildHouseSVG(p)}</div>
      <div class="plan-info">
        <div class="plan-name">${p.name}</div>
        <div class="plan-meta">${p.floors} floor${p.floors>1?"s":""} · ${p.area}m² · ${p.beds>0?p.beds+" bed":"Commercial"}</div>
        <div style="margin-top:8px;">${p.tags.map(t=>`<span class="badge badge-amber" style="margin-right:3px;">${t}</span>`).join("")}</div>
      </div>
    </div>`).join("");
}

// ── Select a plan ────────────────────────────────────────
function selectPlan(id) {
  _selectedPlan = PLANS.find(p => p.id === id);
  renderPlans();

  const det = document.getElementById("plan-detail");
  det.style.display = "block";

  document.getElementById("plan-svg-large").innerHTML =
    `<div style="background:#F5F3EF;border-radius:12px;padding:1rem;display:inline-block;">${buildHouseSVG(_selectedPlan, 230, 200)}</div>`;

  document.getElementById("plan-detail-title").textContent = _selectedPlan.name;

  document.getElementById("plan-detail-badges").innerHTML =
    _selectedPlan.tags.map(t=>`<span class="badge badge-amber" style="margin-right:5px;">${t}</span>`).join("") +
    `<span class="badge badge-teal" style="margin-left:4px;">${_selectedPlan.floors} floor${_selectedPlan.floors>1?"s":""}</span>`;

  document.getElementById("plan-specs").innerHTML = [
    { l:"Floor area", v:_selectedPlan.area+"m²" },
    { l:"Bedrooms",   v:_selectedPlan.beds||"—" },
    { l:"Bathrooms",  v:_selectedPlan.baths },
    { l:"Min. plot",  v:_selectedPlan.plot+" acre" },
  ].map(m=>`<div class="metric"><div class="metric-label">${m.l}</div><div class="metric-value" style="font-size:18px;">${m.v}</div></div>`).join("");

  const box    = document.getElementById("plan-ai-desc");
  const prompt = `You are a professional building architect working in West Africa. Write a 3-sentence description of the "${_selectedPlan.name}" building plan: ${_selectedPlan.floors} floor(s), ${_selectedPlan.area}m² total area, ${_selectedPlan.beds} bedrooms, ${_selectedPlan.baths} bathrooms. Describe its layout, ideal occupants, and architectural character for a Ghanaian context. Be vivid but concise.`;
  askClaude(prompt, box, "Generating AI description…");

  det.scrollIntoView({ behavior:"smooth", block:"nearest" });
}

// ── Jump to estimator with plan values pre-filled ────────
function goToEstimator() {
  if (_selectedPlan) {
    document.getElementById("est-type").value  = _selectedPlan.type;
    document.getElementById("est-area").value  = _selectedPlan.area;
    document.getElementById("est-beds").value  = _selectedPlan.beds || 0;
    document.getElementById("est-baths").value = _selectedPlan.baths;
  }
  switchTab("estimator", document.querySelector('[data-tab="estimator"]'));
  setTimeout(calcCost, 60);
}
