// ═══════════════════════════════════════════════════════
//  ConstructIQ v3 — Building Plans with Real Photos
// ═══════════════════════════════════════════════════════

const PLANS = [
  {
    id: 1, name: "The Accra Starter", type: "bungalow",
    beds: 2, baths: 1, floors: 1, area: 65, plot: 0.25,
    tier: "Starter", tierBg: "rgba(29,158,117,0.2)", tierColor: "#1D9E75",
    tagline: "An elegant single-storey home designed for young families and first-time homeowners in Ghana.",
    description: "The Accra Starter is a meticulously planned single-storey bungalow that maximises every square metre without compromising on quality or comfort. The open-plan living and dining area is flooded with natural light through large louvre windows, while two generously proportioned bedrooms provide restful private spaces. A covered front veranda — an essential feature of Ghanaian residential life — invites evening relaxation and community connection. The compact footprint keeps construction costs highly manageable, making homeownership a realistic and achievable goal.",
    tags: ["Bungalow","Starter","Compact"],
    photo: "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=700&q=80&auto=format&fit=crop",
    detailPhoto: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: 2, name: "The Kumasi Family Home", type: "bungalow",
    beds: 3, baths: 2, floors: 1, area: 130, plot: 0.5,
    tier: "Popular", tierBg: "rgba(201,148,58,0.2)", tierColor: "#C9943A",
    tagline: "Ghana's most beloved floor plan — spacious, practical, and built for family life.",
    description: "The Kumasi Family Home represents the gold standard of Ghanaian residential design. This spacious single-storey plan features three full bedrooms including a master suite with en-suite bathroom, a large family living room, a formal dining area, and a practical kitchen with pantry storage. The double-car carport and enclosed compound wall provide the security and privacy that Ghanaian families value. Designed with our climate in mind, generous ceiling heights and cross-ventilation keep every room naturally cool throughout the year — reducing reliance on air conditioning and lowering running costs.",
    tags: ["Bungalow","Family","Popular"],
    photo: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=700&q=80&auto=format&fit=crop",
    detailPhoto: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: 3, name: "The Cantonments Classic", type: "storey2",
    beds: 4, baths: 3, floors: 2, area: 210, plot: 0.5,
    tier: "Premium", tierBg: "rgba(201,148,58,0.2)", tierColor: "#C9943A",
    tagline: "A sophisticated two-storey residence that commands attention on any street.",
    description: "The Cantonments Classic draws deep inspiration from the refined architecture of Accra's most prestigious neighbourhoods. The ground floor hosts a grand entrance hall, a formal sitting room, family lounge, a modern kitchen with island counter, and a guest bedroom with en-suite. Upstairs, three bedrooms — including a master suite with a walk-in wardrobe and a private balcony overlooking the compound — provide exceptional comfort and privacy. Exposed concrete columns, large windows, and a clay-tiled roof give this home a timeless, architectural quality. Properties of this calibre consistently appreciate in value across Accra's established residential zones.",
    tags: ["2-Storey","Classic","Upscale"],
    photo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80&auto=format&fit=crop",
    detailPhoto: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: 4, name: "The East Legon Modern", type: "storey3",
    beds: 5, baths: 4, floors: 3, area: 360, plot: 1,
    tier: "Luxury", tierBg: "rgba(201,148,58,0.25)", tierColor: "#E8B85A",
    tagline: "Contemporary architecture that makes a bold statement in Ghana's finest neighbourhoods.",
    description: "The East Legon Modern is a statement of contemporary Ghanaian luxury living, designed for those who refuse to compromise between aesthetic ambition and functional excellence. Three floors of thoughtfully designed space include a ground-floor guest suite and home office, a second floor dedicated to family living with an open-plan kitchen and entertaining terrace, and a third-floor master wing featuring a private lounge, luxury bathroom with freestanding bath, and a panoramic roof terrace perfect for Accra's stunning evening sky. Floor-to-ceiling glazing, clean geometric lines, and a flat roof with solar panel provisions define its unmistakable modern character.",
    tags: ["3-Storey","Modern","Statement"],
    photo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80&auto=format&fit=crop",
    detailPhoto: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: 5, name: "The Trasacco Executive", type: "mansion",
    beds: 6, baths: 5, floors: 3, area: 580, plot: 2,
    tier: "Mansion", tierBg: "rgba(201,148,58,0.3)", tierColor: "#F0C060",
    tagline: "An extraordinary residence designed for those who demand nothing less than the finest.",
    description: "The Trasacco Executive is the pinnacle of residential construction in Ghana — a grand three-storey mansion that transcends mere building to become a statement of legacy and achievement. The design encompasses a double-volume entrance atrium, formal reception rooms for entertaining, a chef's kitchen with an adjoining catering kitchen, a dedicated cinema room, home gymnasium, and six bedroom suites each with their own private bathroom and dressing room. The exterior presents a commanding presence with arched verandas, curated landscaping, a swimming pool pavilion, and separate guard post and staff quarters. This is not simply a home — it is a permanent symbol of excellence.",
    tags: ["Mansion","Executive","Legacy"],
    photo: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80&auto=format&fit=crop",
    detailPhoto: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: 6, name: "The Tema Commercial Block", type: "commercial",
    beds: 0, baths: 6, floors: 4, area: 840, plot: 2,
    tier: "Commercial", tierBg: "rgba(74,144,217,0.2)", tierColor: "#4A90D9",
    tagline: "A smart investment property engineered for maximum rental yield from day one.",
    description: "The Tema Commercial Block is meticulously engineered for return on investment, combining architectural quality with commercial practicality. Four storeys of versatile mixed-use space offer ground-floor retail units ideal for banking halls, pharmacies, restaurants, or supermarkets, with upper floors fully divisible into offices, professional suites, or residential apartments to suit market demand. The reinforced concrete frame, passenger lift provision, generous car park, and 24-hour security provisions accommodate the demands of modern commercial tenants in Ghana's fastest-growing industrial city. Strategically positioned in high-traffic commercial zones, this building type consistently delivers premium rental yields.",
    tags: ["Commercial","Investment","4-Storey"],
    photo: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80&auto=format&fit=crop",
    detailPhoto: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=900&q=80&auto=format&fit=crop",
  },
];

let _selectedPlan = null;

// ── Render plan cards with real photos ───────────────────
function renderPlans() {
  document.getElementById("plans-grid").innerHTML = PLANS.map(p => `
    <div class="plan-card${_selectedPlan?.id===p.id?" selected":""}" onclick="selectPlan(${p.id})">
      <div class="plan-photo">
        <img src="${p.photo}" alt="${p.name}" loading="lazy"/>
        <div class="plan-photo-overlay"></div>
        <div class="plan-tier-badge" style="background:${p.tierBg};color:${p.tierColor};border:1px solid ${p.tierColor}44;">${p.tier}</div>
      </div>
      <div class="plan-body">
        <div class="plan-name">${p.name}</div>
        <div class="plan-tagline">${p.tagline}</div>
        <div class="plan-specs">
          <div class="plan-spec"><span class="plan-spec-val">${p.floors}</span><span class="plan-spec-lbl">Floor${p.floors>1?"s":""}</span></div>
          <div class="plan-spec"><span class="plan-spec-val">${p.beds||"—"}</span><span class="plan-spec-lbl">Bed${p.beds!==1?"s":""}</span></div>
          <div class="plan-spec"><span class="plan-spec-val">${p.baths}</span><span class="plan-spec-lbl">Bath${p.baths!==1?"s":""}</span></div>
          <div class="plan-spec"><span class="plan-spec-val">${p.area}</span><span class="plan-spec-lbl">m²</span></div>
        </div>
        <div class="plan-divider"></div>
        <div class="plan-tags">${p.tags.map(t=>`<span class="badge badge-gold">${t}</span>`).join("")}</div>
      </div>
    </div>`).join("");
}

// ── Select plan ──────────────────────────────────────────
function selectPlan(id) {
  _selectedPlan = PLANS.find(p => p.id === id);
  renderPlans();

  const det = document.getElementById("plan-detail");
  det.style.display = "block";

  document.getElementById("plan-detail-inner").innerHTML = `
    <div class="plan-detail-grid">
      <div class="plan-detail-photo">
        <img src="${_selectedPlan.detailPhoto}" alt="${_selectedPlan.name}" loading="lazy"/>
        <div class="plan-detail-photo-overlay"></div>
      </div>
      <div class="plan-detail-info">
        <div>
          <div style="font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:8px;">${_selectedPlan.tier} Plan</div>
          <div class="plan-detail-name">${_selectedPlan.name}</div>
        </div>
        <div class="plan-detail-tagline">${_selectedPlan.tagline}</div>
        <div class="plan-detail-specs">
          ${[
            {l:"Floors",      v:_selectedPlan.floors},
            {l:"Bedrooms",    v:_selectedPlan.beds||"—"},
            {l:"Bathrooms",   v:_selectedPlan.baths},
            {l:"Floor area",  v:_selectedPlan.area+"m²"},
            {l:"Min. plot",   v:_selectedPlan.plot+" acre"},
            {l:"Type",        v:_selectedPlan.type.replace("storey","Storey ")},
          ].map(s=>`<div class="plan-spec-box">
            <span class="plan-spec-box-val">${s.v}</span>
            <span class="plan-spec-box-lbl">${s.l}</span>
          </div>`).join("")}
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn-gold-sm" onclick="goToEstimator()">Calculate Build Cost →</button>
          <button class="btn-ghost-sm" onclick="switchTab('paint',document.querySelector('[data-tab=paint]'))">Explore Paint Colours</button>
        </div>
      </div>
    </div>
    <div class="plan-ai-body">
      <div class="card-label">Architectural Description</div>
      <p style="font-size:13.5px;color:rgba(255,255,255,0.6);line-height:1.95;margin-bottom:20px;">${_selectedPlan.description}</p>
      <div class="card-label" style="margin-top:18px;">AI Expert Analysis ✦</div>
      <div class="ai-box" id="plan-ai-desc">Click below to generate a professional AI analysis of this plan, including construction timeline, investment potential, and suitability for Ghana's climate.</div>
      <button class="btn-ghost-sm" style="margin-top:10px;" onclick="loadPlanAI()">Generate AI Analysis</button>
    </div>
    <div class="plan-actions">
      <button class="btn-gold" onclick="goToEstimator()">Calculate Build Cost</button>
      <button class="btn-ghost-sm" onclick="document.getElementById('plan-detail').style.display='none'">Close ✕</button>
    </div>`;

  det.scrollIntoView({ behavior: "smooth", block: "start" });
}

function loadPlanAI() {
  const box = document.getElementById("plan-ai-desc");
  const p   = _selectedPlan;
  const prompt = `You are a senior architect and property consultant with 20 years of experience in Ghana. Provide a professional expert analysis of the "${p.name}" — a ${p.floors}-floor, ${p.area}m² ${p.type} with ${p.beds} bedrooms and ${p.baths} bathrooms. Structure your response in 4 focused paragraphs covering: (1) Suitability for Ghana's climate and Ghanaian family lifestyle, (2) Construction timeline and key building considerations, (3) Expected resale value and rental investment potential, (4) Who this plan is ideally suited for. Write with authority and warmth. Keep to 180 words total.`;
  askClaude(prompt, box, "Generating expert analysis…");
}

function goToEstimator() {
  if (_selectedPlan) {
    document.getElementById("est-type").value  = _selectedPlan.type;
    document.getElementById("est-area").value  = _selectedPlan.area;
    document.getElementById("est-beds").value  = _selectedPlan.beds || 0;
    document.getElementById("est-baths").value = _selectedPlan.baths;
  }
  switchTab("estimator", document.querySelector('[data-tab="estimator"]'));
  setTimeout(calcCost, 80);
}
