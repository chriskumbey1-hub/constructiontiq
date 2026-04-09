// ═══════════════════════════════════════════════════════
//  ConstructIQ — Professional Building Plans
// ═══════════════════════════════════════════════════════

const PLANS = [
  {
    id: 1,
    name: "The Accra Starter",
    type: "bungalow",
    beds: 2, baths: 1, floors: 1, area: 65, plot: 0.25,
    tier: "Starter", tierColor: "#1D9E75",
    tagline: "An elegant, efficient single-storey home for young families and first-time homeowners.",
    description: "The Accra Starter is a meticulously designed single-storey bungalow that maximises every square metre. Featuring an open-plan living and dining area flooded with natural light, two generously proportioned bedrooms, and a well-appointed bathroom. The covered front veranda creates the perfect space for evening relaxation, while the compact footprint keeps construction costs manageable without sacrificing quality or comfort. Ideal for plots in emerging residential areas across Greater Accra.",
    tags: ["Bungalow","Starter","Compact"],
    color: "#C8862A",
    roofColor: "#4A3728",
    wallColor: "#F5ECD7",
    trimColor: "#D4A853",
  },
  {
    id: 2,
    name: "The Kumasi Family Home",
    type: "bungalow",
    beds: 3, baths: 2, floors: 1, area: 130, plot: 0.5,
    tier: "Popular", tierColor: "#1D9E75",
    tagline: "Ghana's most beloved floor plan — spacious, practical, and built for family life.",
    description: "The Kumasi Family Home represents the gold standard of Ghanaian residential design. This spacious single-storey plan features three full bedrooms, including a master suite with en-suite bathroom, a large family living room, formal dining area, and a practical kitchen with pantry storage. The double-car carport and enclosed compound wall provide security and privacy. Designed with Ghana's climate in mind, generous ceiling heights and cross-ventilation keep every room naturally cool throughout the year.",
    tags: ["Bungalow","Family","Popular"],
    color: "#1D9E75",
    roofColor: "#2D5A1B",
    wallColor: "#F5F0E8",
    trimColor: "#FFFFFF",
  },
  {
    id: 3,
    name: "The Cantonments Classic",
    type: "storey2",
    beds: 4, baths: 3, floors: 2, area: 210, plot: 0.5,
    tier: "Premium", tierColor: "#C9943A",
    tagline: "A sophisticated two-storey residence that commands attention on any street.",
    description: "The Cantonments Classic draws inspiration from the refined architecture of Accra's most prestigious neighbourhoods. The ground floor hosts a grand entrance hall, formal sitting room, family lounge, modern kitchen with island, and a guest bedroom with en-suite. Upstairs, three bedrooms — including a master suite with walk-in wardrobe and private balcony overlooking the compound — provide exceptional comfort. The exposed concrete columns, large windows, and clay-tiled roof give this home a timeless, architectural quality that appreciates with age.",
    tags: ["2-Storey","Classic","Upscale"],
    color: "#C8862A",
    roofColor: "#8B4513",
    wallColor: "#FAF5EC",
    trimColor: "#FFFFFF",
  },
  {
    id: 4,
    name: "The East Legon Modern",
    type: "storey3",
    beds: 5, baths: 4, floors: 3, area: 360, plot: 1,
    tier: "Luxury", tierColor: "#C9943A",
    tagline: "Contemporary architecture that makes a bold statement in Ghana's finest neighbourhoods.",
    description: "The East Legon Modern is a statement of contemporary Ghanaian luxury living. Three floors of thoughtfully designed space include a ground-floor guest suite and home office, a second floor dedicated to family living with open-plan kitchen and entertaining terrace, and a third floor master wing with a private lounge, luxury bathroom, and panoramic roof terrace. Floor-to-ceiling windows, clean geometric lines, and a flat roof with solar panel provisions define its unmistakable modern character. This is architecture designed to be noticed.",
    tags: ["3-Storey","Modern","Statement"],
    color: "#4A4A4A",
    roofColor: "#222222",
    wallColor: "#F2F2F2",
    trimColor: "#2C6E49",
  },
  {
    id: 5,
    name: "The Trasacco Executive",
    type: "mansion",
    beds: 6, baths: 5, floors: 3, area: 580, plot: 2,
    tier: "Mansion", tierColor: "#C9943A",
    tagline: "An extraordinary residence designed for those who demand nothing less than the finest.",
    description: "The Trasacco Executive is the pinnacle of residential construction in Ghana. This grand three-storey mansion encompasses a double-volume entrance atrium, formal reception rooms, a chef's kitchen with adjoining catering kitchen, cinema room, home gymnasium, and six bedroom suites each with their own private bathroom and dressing room. The exterior presents a commanding presence with arched verandas, manicured landscaping, a swimming pool pavilion, and a separate guard post and staff quarters. This is a home that transcends mere construction — it is a legacy.",
    tags: ["Mansion","Executive","Legacy"],
    color: "#BA7517",
    roofColor: "#5C2D0E",
    wallColor: "#FFFAF0",
    trimColor: "#D4A853",
  },
  {
    id: 6,
    name: "The Tema Commercial Block",
    type: "commercial",
    beds: 0, baths: 6, floors: 4, area: 840, plot: 2,
    tier: "Commercial", tierColor: "#185FA5",
    tagline: "A smart investment property generating rental income from day one.",
    description: "The Tema Commercial Block is engineered for return on investment. Four storeys of versatile commercial and mixed-use space offer ground-floor retail units ideal for banking halls, pharmacies, or supermarkets, with upper floors divisible into offices, professional suites, or residential apartments. The reinforced concrete frame, passenger lift provision, and generous car park accommodate the demands of modern commercial tenants. Located strategically in high-traffic zones, this building type consistently generates strong rental yields across Ghana's growing commercial centres.",
    tags: ["Commercial","Investment","4-Storey"],
    color: "#185FA5",
    roofColor: "#0D3D7A",
    wallColor: "#F0F4F8",
    trimColor: "#4A90D9",
  },
];

let _selectedPlan = null;

// ── Draw realistic house on canvas ───────────────────────
function drawRealisticHouse(canvas, plan, isLarge) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const floors = Math.min(plan.floors, 4);
  const isCommercial = plan.type === "commercial";

  // Sky
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.6);
  sky.addColorStop(0, "#6BA3BE");
  sky.addColorStop(1, "#B8D4E8");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H * 0.65);

  // Subtle clouds
  function drawCloud(x, y, r) {
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + r * 0.8, y + 4, r * 0.75, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x - r * 0.7, y + 5, r * 0.65, 0, Math.PI * 2); ctx.fill();
  }
  drawCloud(W * 0.15, H * 0.1, W * 0.06);
  drawCloud(W * 0.75, H * 0.08, W * 0.05);

  // Ground
  const ground = ctx.createLinearGradient(0, H * 0.65, 0, H);
  ground.addColorStop(0, "#5A8A3C");
  ground.addColorStop(0.3, "#4A7A30");
  ground.addColorStop(1, "#3A6020");
  ctx.fillStyle = ground;
  ctx.fillRect(0, H * 0.65, W, H * 0.35);

  // Grass highlight
  ctx.fillStyle = "rgba(100,180,60,0.3)";
  ctx.fillRect(0, H * 0.65, W, H * 0.04);

  // Building dimensions
  const bW = W * (isCommercial ? 0.72 : 0.64);
  const bX = (W - bW) / 2;
  const groundY = H * 0.65;
  const floorH = H * (isCommercial ? 0.1 : 0.115);
  const totalBH = floors * floorH;
  const bY = groundY - totalBH;

  // Shadow under building
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.beginPath();
  ctx.ellipse(W / 2, groundY + 4, bW * 0.5, H * 0.025, 0, 0, Math.PI * 2);
  ctx.fill();

  // Wall gradient
  const wallGrad = ctx.createLinearGradient(bX, bY, bX + bW, bY + totalBH);
  wallGrad.addColorStop(0, plan.wallColor);
  wallGrad.addColorStop(0.5, lightenColor(plan.wallColor, 8));
  wallGrad.addColorStop(1, darkenColor(plan.wallColor, 12));
  ctx.fillStyle = wallGrad;
  ctx.fillRect(bX, bY, bW, totalBH);
  ctx.strokeStyle = darkenColor(plan.wallColor, 20);
  ctx.lineWidth = 1;
  ctx.strokeRect(bX, bY, bW, totalBH);

  // Floor lines
  for (let f = 1; f < floors; f++) {
    const lineY = groundY - f * floorH;
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(bX, lineY); ctx.lineTo(bX + bW, lineY); ctx.stroke();
    // Floor band
    ctx.fillStyle = "rgba(0,0,0,0.04)";
    ctx.fillRect(bX, lineY - 3, bW, 6);
  }

  // Windows per floor
  const winCols = isCommercial ? 5 : (bW > W * 0.5 ? 4 : 3);
  const winW = bW / (winCols + 1) * 0.55;
  const winH = floorH * 0.48;
  const winSpacing = bW / (winCols + 1);

  for (let f = 0; f < floors; f++) {
    const floorY = groundY - (f + 1) * floorH;
    const winY = floorY + floorH * 0.24;

    for (let w = 0; w < winCols; w++) {
      const winX = bX + winSpacing * (w + 1) - winW / 2;
      const isDoor = f === 0 && !isCommercial && w === Math.floor(winCols / 2);
      if (isDoor) continue;

      // Window glass
      const glassGrad = ctx.createLinearGradient(winX, winY, winX + winW, winY + winH);
      glassGrad.addColorStop(0, "rgba(180,215,240,0.9)");
      glassGrad.addColorStop(0.4, "rgba(220,240,255,0.95)");
      glassGrad.addColorStop(1, "rgba(150,200,230,0.8)");
      ctx.fillStyle = glassGrad;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(winX, winY, winW, winH, 3) : ctx.rect(winX, winY, winW, winH);
      ctx.fill();

      // Window frame
      ctx.strokeStyle = darkenColor(plan.wallColor, 25);
      ctx.lineWidth = 1.5;
      ctx.strokeRect(winX, winY, winW, winH);
      // Mullion
      ctx.strokeStyle = "rgba(0,0,0,0.2)";
      ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(winX + winW / 2, winY); ctx.lineTo(winX + winW / 2, winY + winH); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(winX, winY + winH / 2); ctx.lineTo(winX + winW, winY + winH / 2); ctx.stroke();

      // Window sill
      ctx.fillStyle = plan.trimColor;
      ctx.fillRect(winX - 2, winY + winH, winW + 4, 4);

      // Window header
      ctx.fillStyle = plan.trimColor;
      ctx.fillRect(winX - 2, winY - 4, winW + 4, 4);
    }
  }

  // Door (ground floor centre)
  if (!isCommercial) {
    const dW = winW * 1.3;
    const dH = floorH * 0.68;
    const dX = W / 2 - dW / 2;
    const dY = groundY - dH;
    // Door surround
    ctx.fillStyle = plan.trimColor;
    ctx.fillRect(dX - 6, dY - 8, dW + 12, dH + 8);
    // Door
    const doorGrad = ctx.createLinearGradient(dX, dY, dX + dW, dY);
    doorGrad.addColorStop(0, darkenColor(plan.color, 10));
    doorGrad.addColorStop(0.5, plan.color);
    doorGrad.addColorStop(1, darkenColor(plan.color, 15));
    ctx.fillStyle = doorGrad;
    ctx.fillRect(dX, dY, dW, dH);
    ctx.strokeStyle = darkenColor(plan.color, 25);
    ctx.lineWidth = 1;
    ctx.strokeRect(dX, dY, dW, dH);
    // Door panels
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.lineWidth = 0.8;
    ctx.strokeRect(dX + 4, dY + 4, dW / 2 - 6, dH / 2 - 4);
    ctx.strokeRect(dX + dW / 2 + 2, dY + 4, dW / 2 - 6, dH / 2 - 4);
    ctx.strokeRect(dX + 4, dY + dH / 2 + 2, dW / 2 - 6, dH / 2 - 6);
    ctx.strokeRect(dX + dW / 2 + 2, dY + dH / 2 + 2, dW / 2 - 6, dH / 2 - 6);
    // Door handle
    ctx.fillStyle = "#D4A853";
    ctx.beginPath(); ctx.arc(dX + dW - 10, dY + dH * 0.55, 3, 0, Math.PI * 2); ctx.fill();

    // Porch columns
    if (floors >= 2) {
      ctx.fillStyle = plan.trimColor;
      ctx.fillRect(dX - 12, dY - 8, 8, dH + 8);
      ctx.fillRect(dX + dW + 4, dY - 8, 8, dH + 8);
      ctx.fillStyle = darkenColor(plan.trimColor, 10);
      ctx.fillRect(dX - 16, dY - 12, bW * 0.28, 8);
    }
  } else {
    // Commercial entrance
    const dW = bW * 0.25;
    const dH = floorH * 0.75;
    const dX = W / 2 - dW / 2;
    const dY = groundY - dH;
    ctx.fillStyle = "rgba(180,215,240,0.85)";
    ctx.fillRect(dX, dY, dW, dH);
    ctx.strokeStyle = "#4A90D9";
    ctx.lineWidth = 2;
    ctx.strokeRect(dX, dY, dW, dH);
    ctx.strokeStyle = "rgba(74,144,217,0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(W / 2, dY); ctx.lineTo(W / 2, dY + dH); ctx.stroke();
  }

  // Roof
  if (!isCommercial) {
    const roofOverhang = bW * 0.05;
    const roofH = H * (floors === 1 ? 0.2 : floors === 2 ? 0.17 : 0.14);
    const roofGrad = ctx.createLinearGradient(0, bY - roofH, 0, bY);
    roofGrad.addColorStop(0, lightenColor(plan.roofColor, 15));
    roofGrad.addColorStop(0.4, plan.roofColor);
    roofGrad.addColorStop(1, darkenColor(plan.roofColor, 20));
    ctx.fillStyle = roofGrad;
    ctx.beginPath();
    ctx.moveTo(bX - roofOverhang, bY);
    ctx.lineTo(W / 2, bY - roofH);
    ctx.lineTo(bX + bW + roofOverhang, bY);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = darkenColor(plan.roofColor, 30);
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Roof ridge tile
    ctx.fillStyle = darkenColor(plan.roofColor, 15);
    ctx.beginPath();
    ctx.moveTo(W / 2 - 6, bY - roofH);
    ctx.lineTo(W / 2 + 6, bY - roofH);
    ctx.lineTo(W / 2 + 10, bY - roofH + 12);
    ctx.lineTo(W / 2 - 10, bY - roofH + 12);
    ctx.closePath(); ctx.fill();
    // Chimney
    if (floors <= 2) {
      const chX = bX + bW * 0.72;
      const chY = bY - roofH * 0.55;
      ctx.fillStyle = darkenColor(plan.roofColor, 10);
      ctx.fillRect(chX, chY, W * 0.035, H * 0.12);
      ctx.fillStyle = darkenColor(plan.roofColor, 20);
      ctx.fillRect(chX - 3, chY, W * 0.035 + 6, 7);
    }
  } else {
    // Flat roof parapet
    ctx.fillStyle = darkenColor(plan.wallColor, 15);
    ctx.fillRect(bX - 4, bY - 14, bW + 8, 14);
    ctx.strokeStyle = darkenColor(plan.wallColor, 25);
    ctx.lineWidth = 1;
    ctx.strokeRect(bX - 4, bY - 14, bW + 8, 14);
    // Rooftop details
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(bX + bW * 0.2, bY - 28, bW * 0.15, 14);
    ctx.fillRect(bX + bW * 0.6, bY - 32, bW * 0.12, 18);
  }

  // Left tree
  drawTree(ctx, bX * 0.55, groundY, H * 0.22, H);
  // Right tree
  drawTree(ctx, bX + bW + bX * 0.45, groundY, H * 0.19, H);

  // Driveway / path
  ctx.fillStyle = "rgba(180,165,140,0.5)";
  if (!isCommercial) {
    ctx.beginPath();
    ctx.moveTo(W / 2 - W * 0.06, groundY);
    ctx.lineTo(W / 2 - W * 0.12, H);
    ctx.lineTo(W / 2 + W * 0.12, H);
    ctx.lineTo(W / 2 + W * 0.06, groundY);
    ctx.closePath(); ctx.fill();
  } else {
    ctx.fillRect(bX + bW * 0.1, groundY, bW * 0.8, H * 0.35);
    ctx.fillStyle = "rgba(150,140,120,0.3)";
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(bX + bW * (0.15 + i * 0.26), groundY + H * 0.08, bW * 0.18, H * 0.18);
    }
  }

  // Shrubs
  function drawShrub(x, y, r) {
    ctx.fillStyle = "#2D6B1B";
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#3A8222";
    ctx.beginPath(); ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.7, 0, Math.PI * 2); ctx.fill();
  }
  drawShrub(bX + W * 0.03, groundY - H * 0.03, W * 0.035);
  drawShrub(bX + bW - W * 0.03, groundY - H * 0.03, W * 0.03);

  // Compound wall suggestion
  ctx.fillStyle = darkenColor(plan.wallColor, 30);
  ctx.fillRect(0, groundY, W * 0.06, H * 0.08);
  ctx.fillRect(W * 0.94, groundY, W * 0.06, H * 0.08);
}

function drawTree(ctx, x, groundY, height, H) {
  const trunkW = height * 0.1;
  ctx.fillStyle = "#5C3D1E";
  ctx.fillRect(x - trunkW / 2, groundY - height * 0.35, trunkW, height * 0.35);
  const leafGrad = ctx.createRadialGradient(x, groundY - height * 0.6, 0, x, groundY - height * 0.5, height * 0.5);
  leafGrad.addColorStop(0, "#4A9E28");
  leafGrad.addColorStop(0.5, "#2D6B1B");
  leafGrad.addColorStop(1, "#1A4A0E");
  ctx.fillStyle = leafGrad;
  ctx.beginPath();
  ctx.ellipse(x, groundY - height * 0.65, height * 0.28, height * 0.42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(100,200,60,0.25)";
  ctx.beginPath();
  ctx.ellipse(x - height * 0.08, groundY - height * 0.7, height * 0.18, height * 0.26, -0.3, 0, Math.PI * 2);
  ctx.fill();
}

function lightenColor(hex, pct) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, (n >> 16) + pct * 2.55 | 0);
  const g = Math.min(255, ((n >> 8) & 0xff) + pct * 2.55 | 0);
  const b = Math.min(255, (n & 0xff) + pct * 2.55 | 0);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}
function darkenColor(hex, pct) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - pct * 2.55 | 0);
  const g = Math.max(0, ((n >> 8) & 0xff) - pct * 2.55 | 0);
  const b = Math.max(0, (n & 0xff) - pct * 2.55 | 0);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

// ── Render plan cards ────────────────────────────────────
function renderPlans() {
  const grid = document.getElementById("plans-grid");
  grid.innerHTML = PLANS.map(p => `
    <div class="plan-card${_selectedPlan?.id === p.id ? " selected" : ""}" onclick="selectPlan(${p.id})">
      <div class="plan-img-wrap">
        <canvas id="pcanvas-${p.id}" width="540" height="300"></canvas>
        <div class="plan-tier-badge" style="background:${p.tierColor}22;color:${p.tierColor};border:1px solid ${p.tierColor}44;">${p.tier}</div>
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

  PLANS.forEach(p => setTimeout(() => {
    const c = document.getElementById("pcanvas-" + p.id);
    if (c) drawRealisticHouse(c, p, false);
  }, 0));
}

// ── Select plan — show detail ────────────────────────────
function selectPlan(id) {
  _selectedPlan = PLANS.find(p => p.id === id);
  renderPlans();

  const det = document.getElementById("plan-detail");
  det.style.display = "block";

  document.getElementById("plan-detail-inner").innerHTML = `
    <div class="plan-detail-hero">
      <div class="plan-detail-canvas-wrap">
        <canvas id="det-canvas" width="720" height="440"></canvas>
      </div>
      <div class="plan-detail-info">
        <div>
          <div class="section-eyebrow">${_selectedPlan.tier} Plan</div>
          <div class="plan-detail-name">${_selectedPlan.name}</div>
        </div>
        <div class="plan-detail-desc">${_selectedPlan.tagline}</div>
        <div class="plan-detail-specs">
          ${[
            {l:"Floors",   v:_selectedPlan.floors},
            {l:"Bedrooms", v:_selectedPlan.beds||"—"},
            {l:"Bathrooms",v:_selectedPlan.baths},
            {l:"Floor area",v:_selectedPlan.area+"m²"},
            {l:"Min. plot", v:_selectedPlan.plot+" acre"},
            {l:"Building type",v:_selectedPlan.type.replace("storey","Storey ")},
          ].map(s=>`<div class="plan-detail-spec">
            <span class="plan-detail-spec-val">${s.v}</span>
            <span class="plan-detail-spec-lbl">${s.l}</span>
          </div>`).join("")}
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="goToEstimator()">Calculate Build Cost →</button>
          <button class="btn btn-ghost" onclick="switchTab('paint',document.querySelector('[data-tab=paint]'))">Explore Paint Colours</button>
        </div>
      </div>
    </div>
    <div class="plan-ai-section">
      <div class="card-title">Architectural Description</div>
      <div style="font-size:13px;color:var(--text-muted);line-height:1.9;margin-bottom:16px;">${_selectedPlan.description}</div>
      <div class="card-title" style="margin-top:16px;">AI Expert Analysis ✦</div>
      <div class="ai-box" id="plan-ai-desc">Click below to get an AI-generated analysis of this plan…</div>
      <button class="btn btn-ghost" style="margin-top:10px;" onclick="loadPlanAI()">Generate AI Analysis</button>
    </div>`;

  setTimeout(() => {
    const c = document.getElementById("det-canvas");
    if (c) drawRealisticHouse(c, _selectedPlan, true);
  }, 30);

  det.scrollIntoView({ behavior: "smooth", block: "start" });
}

function loadPlanAI() {
  const box = document.getElementById("plan-ai-desc");
  const p   = _selectedPlan;
  const prompt = `You are a senior architect and property consultant in Ghana. Provide a professional expert analysis of the "${p.name}" — a ${p.floors}-floor, ${p.area}m² building with ${p.beds} bedrooms and ${p.baths} bathrooms. Cover: (1) suitability for the Ghanaian climate and lifestyle, (2) construction considerations and typical timeline, (3) expected resale and rental value, (4) who this plan is best suited for. Write in 4 short paragraphs. Professional but approachable tone.`;
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
