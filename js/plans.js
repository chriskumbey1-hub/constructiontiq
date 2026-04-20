// ConstructIQ v5 — 10 Building Plans, Realistic Ghanaian Architecture

const PLANS = [
  {
    id:1, name:"The Starter Bungalow", type:"bungalow",
    beds:2, baths:1, floors:1, area:55, plot:0.25,
    tier:"Starter", tierColor:"#1D9E75",
    tagline:"A practical two-bedroom home for young families taking their first step into homeownership.",
    desc:"Simple, well-proportioned and easy to maintain, this single-storey plan is the entry point for thousands of Ghanaian families. The layout puts two bedrooms at the rear, an open sitting and dining space at the front, and a covered veranda for evening use. Construction is straightforward, completion time is typically 12–14 months, and the footprint fits comfortably on a quarter-plot.",
    tags:["Bungalow","2-Bed","Starter"],
    photo:"https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=700&q=80&auto=format&fit=crop",
    detailPhoto:"https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=1000&q=80&auto=format&fit=crop",
  },
  {
    id:2, name:"The Family Bungalow", type:"bungalow",
    beds:3, baths:2, floors:1, area:120, plot:0.5,
    tier:"Popular", tierColor:"#C9943A",
    tagline:"Ghana's most common residential footprint — three bedrooms, compound wall, carport.",
    desc:"The Family Bungalow is the backbone of Ghanaian residential neighbourhoods from Sunyani to Tema. Three bedrooms with a master en-suite, spacious sitting room, dining area, a proper kitchen, and a covered front porch define the layout. The half-plot footprint leaves room for a compound wall, gate, and single carport. Natural cross-ventilation reduces the need for air conditioning.",
    tags:["Bungalow","3-Bed","Popular"],
    photo:"https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=700&q=80&auto=format&fit=crop",
    detailPhoto:"https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80&auto=format&fit=crop",
  },
  {
    id:3, name:"The Compact Storey", type:"storey2",
    beds:3, baths:2, floors:2, area:150, plot:0.5,
    tier:"Mid-Range", tierColor:"#C9943A",
    tagline:"A modest two-storey option that maximises space on a tight plot without extravagance.",
    desc:"For families who need more rooms but cannot afford a larger plot, this compact two-storey delivers three full bedrooms across two floors. The ground floor holds the living areas and one bedroom suitable as a guest room; the upper floor has the master suite and a second bedroom with shared bathroom. A small first-floor balcony looks over the compound.",
    tags:["2-Storey","3-Bed","Compact"],
    photo:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700&q=80&auto=format&fit=crop",
    detailPhoto:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80&auto=format&fit=crop",
  },
  {
    id:4, name:"The Cantonments Classic", type:"storey2",
    beds:4, baths:3, floors:2, area:210, plot:0.5,
    tier:"Premium", tierColor:"#C9943A",
    tagline:"A proper four-bedroom family residence built to the standard of Accra's established suburbs.",
    desc:"Inspired by the well-built homes that line the streets of Cantonments, Labone, and Ridge, this plan balances generous room sizes with practical construction. Ground floor: entrance hall, sitting room, dining, kitchen with pantry, and guest room with en-suite. First floor: master suite with walk-in wardrobe and balcony, two family bedrooms, and a shared family bathroom.",
    tags:["2-Storey","4-Bed","Classic"],
    photo:"https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=80&auto=format&fit=crop",
    detailPhoto:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80&auto=format&fit=crop",
  },
  {
    id:5, name:"The East Legon Residence", type:"storey2",
    beds:5, baths:4, floors:2, area:280, plot:1,
    tier:"Upscale", tierColor:"#E8B85A",
    tagline:"A large, well-finished home for the professional family in Ghana's premium residential areas.",
    desc:"Built for the growing Ghanaian professional class, this spacious two-storey offers the room sizes and finishes that match East Legon and Adjiringanor expectations. Five bedrooms — including two masters on the upper floor — provide flexibility for extended family and guests. The generous ground-floor kitchen, double garage, and rooftop utility space are practical standards at this level.",
    tags:["2-Storey","5-Bed","Upscale"],
    photo:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=700&q=80&auto=format&fit=crop",
    detailPhoto:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80&auto=format&fit=crop",
  },
  {
    id:6, name:"The Modern 3-Storey", type:"storey3",
    beds:5, baths:5, floors:3, area:340, plot:1,
    tier:"Luxury", tierColor:"#E8B85A",
    tagline:"Three floors of contemporary design — built for families who want both space and statement.",
    desc:"The Modern 3-Storey represents the aspirational tier of Ghanaian residential construction. Ground: entrance atrium, formal sitting, open dining-kitchen, guest suite, home office. First: three bedrooms with en-suite bathrooms, family lounge, laundry. Second: master penthouse with private terrace, dressing room, luxury bathroom. Solar ready, BQ optional, rooftop accessible.",
    tags:["3-Storey","5-Bed","Luxury"],
    photo:"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80&auto=format&fit=crop",
    detailPhoto:"https://images.unsplash.com/photo-1600607687939-ce8a6d9b0109?w=1000&q=80&auto=format&fit=crop",
  },
  {
    id:7, name:"The Trasacco Executive", type:"mansion",
    beds:6, baths:6, floors:3, area:580, plot:2,
    tier:"Mansion", tierColor:"#F0C060",
    tagline:"An extraordinary residence for those who have built something worth protecting and celebrating.",
    desc:"The Trasacco Executive is built for permanence. Six en-suite bedrooms, a double-volume entrance hall, formal and informal sitting rooms, a chef's kitchen with separate catering kitchen, cinema room, home gym, and a swimming pool pavilion. Staff quarters, generator house, and guard post are integral to the design. This home is built to last three generations.",
    tags:["Mansion","6-Bed","Executive"],
    photo:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=700&q=80&auto=format&fit=crop",
    detailPhoto:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&q=80&auto=format&fit=crop",
  },
  {
    id:8, name:"The Airport Hills Villa", type:"mansion",
    beds:7, baths:7, floors:3, area:720, plot:2,
    tier:"Ultra Luxury", tierColor:"#F0C060",
    tagline:"A villa-scale residence designed for the pinnacle of Ghanaian residential life.",
    desc:"Designed for the Airport Hills, Trasacco Valley, and Peduase Lodge tier of property, this villa delivers seven bedrooms, a double garage, indoor-outdoor entertaining spaces, a large swimming pool with pavilion, landscaped gardens, and a dedicated events terrace. The architect's brief was simple: build something in Ghana that would be remarkable anywhere in the world.",
    tags:["Villa","7-Bed","Ultra Luxury"],
    photo:"https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=700&q=80&auto=format&fit=crop",
    detailPhoto:"https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=1000&q=80&auto=format&fit=crop",
  },
  {
    id:9, name:"The Mixed-Use Block", type:"commercial",
    beds:0, baths:4, floors:3, area:480, plot:1,
    tier:"Investment", tierColor:"#4A90D9",
    tagline:"A three-storey mixed-use building — retail below, offices or apartments above.",
    desc:"The Mixed-Use Block is the most common commercial investment format in Ghana's secondary cities and suburban Accra. Ground floor: two retail units ideal for pharmacy, food service, or professional offices. Upper floors: divisible into four to six office suites or two-bedroom apartments. Reinforced concrete frame, lift-ready shaft, and separate utility meters per unit maximise rental flexibility.",
    tags:["Commercial","3-Storey","Mixed-Use"],
    photo:"https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=700&q=80&auto=format&fit=crop",
    detailPhoto:"https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=1000&q=80&auto=format&fit=crop",
  },
  {
    id:10, name:"The Tema Commercial Block", type:"commercial",
    beds:0, baths:6, floors:4, area:840, plot:2,
    tier:"Commercial", tierColor:"#4A90D9",
    tagline:"A four-storey commercial anchor building engineered for maximum rental yield from day one.",
    desc:"The Tema Commercial Block is engineered entirely around return on investment. Four storeys of versatile space — ground floor retail suited to banking halls, supermarkets or pharmacies; three upper floors of office suites, professional chambers or residential apartments. Passenger lift, generous car park, 24-hour security provisions, and separate utility meters for each tenancy. Consistently the highest-yielding building type in Ghana's commercial corridors.",
    tags:["Commercial","4-Storey","High-Yield"],
    photo:"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=80&auto=format&fit=crop",
    detailPhoto:"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80&auto=format&fit=crop",
  },
];

let _selectedPlan = null;

function renderPlans() {
  document.getElementById("plans-grid").innerHTML = PLANS.map(p=>`
    <div class="plan-card${_selectedPlan?.id===p.id?" selected":""}" onclick="selectPlan(${p.id})">
      <div class="plan-photo">
        <img src="${p.photo}" alt="${p.name}" loading="lazy"/>
        <div class="plan-photo-ov"></div>
        <div class="plan-tier" style="background:${p.tierColor}22;color:${p.tierColor};border:1px solid ${p.tierColor}55;">${p.tier}</div>
      </div>
      <div class="plan-body">
        <div class="plan-name">${p.name}</div>
        <div class="plan-tagline">${p.tagline}</div>
        <div class="plan-specs-row">
          <div class="pspec"><span class="pspec-v">${p.floors}</span><span class="pspec-l">Floor${p.floors>1?"s":""}</span></div>
          <div class="pspec"><span class="pspec-v">${p.beds||"—"}</span><span class="pspec-l">Bed${p.beds!==1?"s":""}</span></div>
          <div class="pspec"><span class="pspec-v">${p.baths}</span><span class="pspec-l">Bath${p.baths!==1?"s":""}</span></div>
          <div class="pspec"><span class="pspec-v">${p.area}</span><span class="pspec-l">m²</span></div>
        </div>
        <div class="plan-tags-row">${p.tags.map(t=>`<span class="badge bg-gold">${t}</span>`).join("")}</div>
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
        <div class="pd-photo"><img src="${_selectedPlan.detailPhoto}" alt="${_selectedPlan.name}" loading="lazy"/><div class="pd-photo-ov"></div></div>
        <div class="pd-info">
          <div class="pd-eyebrow">${_selectedPlan.tier} Plan</div>
          <div class="pd-name">${_selectedPlan.name}</div>
          <div class="pd-tagline">${_selectedPlan.tagline}</div>
          <div class="pd-specs">
            ${[{l:"Floors",v:_selectedPlan.floors},{l:"Bedrooms",v:_selectedPlan.beds||"—"},{l:"Bathrooms",v:_selectedPlan.baths},{l:"Floor area",v:_selectedPlan.area+"m²"},{l:"Min. plot",v:_selectedPlan.plot+" acre"},{l:"Type",v:_selectedPlan.type}].map(s=>`
            <div class="pd-spec"><span class="pd-spec-v">${s.v}</span><span class="pd-spec-l">${s.l}</span></div>`).join("")}
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button class="btn-gold-sm" onclick="goToEstimator()">Get Cost Estimate →</button>
            <button class="btn-ghost-sm" onclick="switchTab('upload',document.querySelector('[data-tab=upload]'))">Upload My Plan</button>
          </div>
        </div>
      </div>
      <div class="pd-ai">
        <div class="clabel">About This Plan</div>
        <p style="font-size:13.5px;color:rgba(255,255,255,.55);line-height:2.0;margin-bottom:16px;">${_selectedPlan.desc}</p>
        <div class="clabel" style="margin-top:14px;">AI Expert Analysis ✦</div>
        <div class="ai-box" id="plan-ai-desc">Click below to generate a professional AI analysis of this plan…</div>
        <button class="btn-ghost-sm" style="margin-top:10px;" onclick="loadPlanAI()">Generate AI Analysis</button>
      </div>
      <div class="pd-actions">
        <button class="btn-gold" onclick="goToEstimator()">Calculate Build Cost</button>
        <button class="btn-ghost-sm" onclick="switchTab('upload',document.querySelector('[data-tab=upload]'))">Upload Your Plan</button>
        <button class="btn-ghost-sm" onclick="document.getElementById('plan-detail').style.display='none'">Close ✕</button>
      </div>
    </div>`;
  det.scrollIntoView({behavior:"smooth",block:"start"});
}

function loadPlanAI() {
  const p = _selectedPlan;
  const prompt = `You are a senior architect and property consultant with 20 years of experience in Ghana. Provide a professional expert analysis of the "${p.name}" — a ${p.floors}-floor, ${p.area}m² ${p.type} with ${p.beds||0} bedrooms and ${p.baths} bathrooms. Write 4 focused paragraphs covering: (1) suitability for Ghana's climate and Ghanaian family lifestyle, (2) construction timeline and key building considerations, (3) expected resale value and rental investment potential, (4) who this plan is ideally suited for. Professional but warm tone. Max 180 words.`;
  askClaude(prompt, document.getElementById("plan-ai-desc"), "Generating expert analysis…");
}

function goToEstimator() {
  if (_selectedPlan) {
    document.getElementById("est-type").value  = _selectedPlan.type;
    document.getElementById("est-area").value  = _selectedPlan.area;
    document.getElementById("est-beds").value  = _selectedPlan.beds||0;
    document.getElementById("est-baths").value = _selectedPlan.baths;
    document.getElementById("est-floors").value= _selectedPlan.floors;
  }
  switchTab("estimator", document.querySelector('[data-tab="estimator"]'));
  setTimeout(calcCost, 80);
}
