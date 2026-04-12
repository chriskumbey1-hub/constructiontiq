// ConstructIQ v4 — Building Plans with Ghanaian Architecture Photos

const PLANS = [
  {
    id:1, name:"The Accra Starter", type:"bungalow",
    beds:2, baths:1, floors:1, area:65, plot:0.25,
    tier:"Starter", tierBg:"rgba(29,158,117,.2)", tierColor:"#1D9E75",
    tagline:"An elegant single-storey home for young families and first-time homeowners in Ghana.",
    description:"The Accra Starter is a meticulously planned single-storey bungalow that maximises every square metre without compromising on quality or comfort. The open-plan living and dining area is flooded with natural light, while two generously proportioned bedrooms provide restful private spaces. A covered front veranda — an essential feature of Ghanaian residential life — invites evening relaxation and community connection.",
    tags:["Bungalow","Starter","Compact"],
    // Ghanaian/West African single-storey homes
    photo:"https://images.unsplash.com/photo-1598228723793-52759bba239c?w=700&q=80&auto=format&fit=crop",
    detailPhoto:"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80&auto=format&fit=crop",
  },
  {
    id:2, name:"The Kumasi Family Home", type:"bungalow",
    beds:3, baths:2, floors:1, area:130, plot:0.5,
    tier:"Popular", tierBg:"rgba(201,148,58,.2)", tierColor:"#C9943A",
    tagline:"Ghana's most beloved floor plan — spacious, practical, and built for family life.",
    description:"The Kumasi Family Home represents the gold standard of Ghanaian residential design. Three full bedrooms including a master suite with en-suite, a large family living room, formal dining, and a practical kitchen with pantry. The double-car carport and enclosed compound wall provide security and privacy. Generous ceiling heights and cross-ventilation keep every room naturally cool throughout the year.",
    tags:["Bungalow","Family","Popular"],
    photo:"https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=700&q=80&auto=format&fit=crop",
    detailPhoto:"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
  },
  {
    id:3, name:"The Cantonments Classic", type:"storey2",
    beds:4, baths:3, floors:2, area:210, plot:0.5,
    tier:"Premium", tierBg:"rgba(201,148,58,.2)", tierColor:"#C9943A",
    tagline:"A sophisticated two-storey residence that commands attention on any street.",
    description:"The Cantonments Classic draws inspiration from Accra's most prestigious neighbourhoods. The ground floor hosts a grand entrance hall, formal sitting room, family lounge, modern kitchen with island, and a guest bedroom with en-suite. Upstairs, three bedrooms — including a master suite with walk-in wardrobe and private balcony — provide exceptional comfort. Exposed concrete columns, large windows, and a clay-tiled roof give this home timeless architectural quality.",
    tags:["2-Storey","Classic","Upscale"],
    photo:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80&auto=format&fit=crop",
    detailPhoto:"https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80&auto=format&fit=crop",
  },
  {
    id:4, name:"The East Legon Modern", type:"storey3",
    beds:5, baths:4, floors:3, area:360, plot:1,
    tier:"Luxury", tierBg:"rgba(201,148,58,.25)", tierColor:"#E8B85A",
    tagline:"Contemporary architecture that makes a bold statement in Ghana's finest neighbourhoods.",
    description:"The East Legon Modern is a statement of contemporary Ghanaian luxury. Three floors include a ground-floor guest suite and home office, a second floor with open-plan kitchen and entertaining terrace, and a third-floor master wing with private lounge, luxury bathroom, and panoramic roof terrace. Floor-to-ceiling glazing, clean geometric lines, and a flat roof with solar panel provisions define its unmistakable modern character.",
    tags:["3-Storey","Modern","Statement"],
    photo:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80&auto=format&fit=crop",
    detailPhoto:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80&auto=format&fit=crop",
  },
  {
    id:5, name:"The Trasacco Executive", type:"mansion",
    beds:6, baths:5, floors:3, area:580, plot:2,
    tier:"Mansion", tierBg:"rgba(201,148,58,.3)", tierColor:"#F0C060",
    tagline:"An extraordinary residence designed for those who demand nothing less than the finest.",
    description:"The Trasacco Executive is the pinnacle of Ghanaian residential construction. This grand three-storey mansion encompasses a double-volume entrance atrium, formal reception rooms, a chef's kitchen with adjoining catering kitchen, cinema room, home gymnasium, and six bedroom suites each with private bathroom and dressing room. Arched verandas, manicured landscaping, a swimming pool pavilion, and separate staff quarters complete this legacy property.",
    tags:["Mansion","Executive","Legacy"],
    photo:"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80&auto=format&fit=crop",
    detailPhoto:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80&auto=format&fit=crop",
  },
  {
    id:6, name:"The Tema Commercial Block", type:"commercial",
    beds:0, baths:6, floors:4, area:840, plot:2,
    tier:"Commercial", tierBg:"rgba(74,144,217,.2)", tierColor:"#4A90D9",
    tagline:"A smart investment property engineered for maximum rental yield from day one.",
    description:"The Tema Commercial Block is engineered for return on investment. Four storeys of versatile mixed-use space offer ground-floor retail units ideal for banking halls, pharmacies, or supermarkets, with upper floors divisible into offices or residential apartments. Reinforced concrete frame, passenger lift provision, and generous car park accommodate modern commercial tenants. This building type consistently delivers premium rental yields across Ghana's fastest-growing commercial centres.",
    tags:["Commercial","Investment","4-Storey"],
    photo:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80&auto=format&fit=crop",
    detailPhoto:"https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=900&q=80&auto=format&fit=crop",
  },
];

let _selectedPlan = null;

function renderPlans() {
  document.getElementById("plans-grid").innerHTML = PLANS.map(p => `
    <div class="plan-card${_selectedPlan?.id===p.id?" selected":""}" onclick="selectPlan(${p.id})">
      <div class="plan-photo">
        <img src="${p.photo}" alt="${p.name}" loading="lazy"/>
        <div class="plan-photo-overlay"></div>
        <div class="plan-tier" style="background:${p.tierBg};color:${p.tierColor};border:1px solid ${p.tierColor}55;">${p.tier}</div>
      </div>
      <div class="plan-body">
        <div class="plan-name">${p.name}</div>
        <div class="plan-tagline">${p.tagline}</div>
        <div class="plan-specs">
          <div class="pspec"><span class="pspec-v">${p.floors}</span><span class="pspec-l">Floor${p.floors>1?"s":""}</span></div>
          <div class="pspec"><span class="pspec-v">${p.beds||"—"}</span><span class="pspec-l">Bed${p.beds!==1?"s":""}</span></div>
          <div class="pspec"><span class="pspec-v">${p.baths}</span><span class="pspec-l">Bath${p.baths!==1?"s":""}</span></div>
          <div class="pspec"><span class="pspec-v">${p.area}</span><span class="pspec-l">m²</span></div>
        </div>
        <div class="plan-div"></div>
        <div class="plan-tags">${p.tags.map(t=>`<span class="badge bg-gold">${t}</span>`).join("")}</div>
      </div>
    </div>`).join("");
}

function selectPlan(id) {
  _selectedPlan = PLANS.find(p=>p.id===id);
  renderPlans();
  const det = document.getElementById("plan-detail");
  det.style.display = "block";
  document.getElementById("plan-detail-inner").innerHTML = `
    <div class="plan-detail-card">
      <div class="pdg">
        <div class="pd-photo">
          <img src="${_selectedPlan.detailPhoto}" alt="${_selectedPlan.name}" loading="lazy"/>
          <div class="pd-photo-ov"></div>
        </div>
        <div class="pd-info">
          <div><div style="font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:6px;">${_selectedPlan.tier} Plan</div>
          <div class="pd-name">${_selectedPlan.name}</div></div>
          <div class="pd-tagline">${_selectedPlan.tagline}</div>
          <div class="pd-specs">
            ${[{l:"Floors",v:_selectedPlan.floors},{l:"Bedrooms",v:_selectedPlan.beds||"—"},{l:"Bathrooms",v:_selectedPlan.baths},{l:"Floor area",v:_selectedPlan.area+"m²"},{l:"Min. plot",v:_selectedPlan.plot+" acre"},{l:"Type",v:_selectedPlan.type}].map(s=>`
            <div class="pd-spec"><span class="pd-spec-v">${s.v}</span><span class="pd-spec-l">${s.l}</span></div>`).join("")}
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button class="btn-gold-sm" onclick="goToEstimator()">Calculate Build Cost →</button>
            <button class="btn-ghost-sm" onclick="switchTab('paint',document.querySelector('[data-tab=paint]'))">Paint Colours</button>
          </div>
        </div>
      </div>
      <div class="pd-ai">
        <div class="clabel">Architectural Description</div>
        <p style="font-size:13.5px;color:rgba(255,255,255,.55);line-height:1.95;margin-bottom:18px;">${_selectedPlan.description}</p>
        <div class="clabel" style="margin-top:14px;">AI Expert Analysis ✦</div>
        <div class="ai-box" id="plan-ai-desc">Click below for an AI-generated professional analysis of this plan…</div>
        <button class="btn-ghost-sm" style="margin-top:10px;" onclick="loadPlanAI()">Generate AI Analysis</button>
      </div>
      <div class="pd-actions">
        <button class="btn-gold" onclick="goToEstimator()">Calculate Build Cost</button>
        <button class="btn-ghost-sm" onclick="document.getElementById('plan-detail').style.display='none'">Close ✕</button>
      </div>
    </div>`;
  det.scrollIntoView({behavior:"smooth",block:"start"});
}

function loadPlanAI() {
  const p = _selectedPlan;
  const prompt = `You are a senior architect and property consultant with 20 years of experience in Ghana. Provide a professional expert analysis of the "${p.name}" — a ${p.floors}-floor ${p.area}m² ${p.type} with ${p.beds} bedrooms and ${p.baths} bathrooms. Cover in 4 short paragraphs: (1) suitability for Ghana's climate and family lifestyle, (2) construction timeline and key building considerations, (3) expected resale and rental investment value, (4) who this plan is best suited for. Professional but warm tone. Max 180 words.`;
  askClaude(prompt, document.getElementById("plan-ai-desc"), "Generating expert analysis…");
}

function goToEstimator() {
  if (_selectedPlan) {
    document.getElementById("est-type").value  = _selectedPlan.type;
    document.getElementById("est-area").value  = _selectedPlan.area;
    document.getElementById("est-beds").value  = _selectedPlan.beds||0;
    document.getElementById("est-baths").value = _selectedPlan.baths;
  }
  switchTab("estimator", document.querySelector('[data-tab="estimator"]'));
  setTimeout(calcCost, 80);
}
