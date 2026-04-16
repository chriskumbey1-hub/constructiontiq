// ConstructIQ v5 — Fully Reactive Cost Estimator
// Every input change triggers full recalculation of ALL outputs

const BASE_RATE = {
  bungalow:2800, storey2:3200, storey3:3500, mansion:5000, commercial:3800
};
const QUALITY_FACTOR = { basic:0.72, standard:1.0, premium:1.45, luxury:2.10 };
const LOCATION_FACTOR= { rural:0.72, town:0.88, city:1.0, upscale:1.35 };
const FLOOR_SURCHARGE = { 1:0, 2:0.08, 3:0.14, 4:0.20 }; // extra % per additional floor

let _costChartInst = null;
let _lastCalc = {};

function calcCost() {
  // ── Read all parameters ─────────────────────────────────────
  const type     = document.getElementById("est-type")?.value     || "bungalow";
  const area     = Math.max(10, parseFloat(document.getElementById("est-area")?.value)  || 120);
  const quality  = document.getElementById("est-quality")?.value  || "standard";
  const location = document.getElementById("est-location")?.value || "city";
  const beds     = Math.max(0, parseInt(document.getElementById("est-beds")?.value)     || 3);
  const baths    = Math.max(1, parseInt(document.getElementById("est-baths")?.value)    || 2);
  const floors   = Math.max(1, parseInt(document.getElementById("est-floors")?.value)   || 1);

  // ── Cost calculation ────────────────────────────────────────
  const qf = QUALITY_FACTOR[quality]  || 1.0;
  const lf = LOCATION_FACTOR[location]|| 1.0;
  const fs = FLOOR_SURCHARGE[Math.min(floors,4)] || 0.20;

  // Base cost per m² adjusted for type, quality, location, floor count
  const costPerM2 = BASE_RATE[type] * qf * lf * (1 + fs);

  // Core construction costs (proportional to area)
  const foundation   = area * costPerM2 * 0.15;
  const structure    = area * costPerM2 * 0.28;
  const roofing      = area * costPerM2 * 0.10;
  const finishing    = area * costPerM2 * 0.20;
  const miscCivil    = area * costPerM2 * 0.05;

  // MEP costs — scale with beds/baths and area
  const plumbing     = Math.round((baths * 5200 + area * 45) * qf * lf);
  const electrical   = Math.round((area * 95 + beds * 800 + 2500) * qf * lf);

  // Labour — 15% of structural costs
  const labour       = (foundation + structure + roofing) * 0.15;

  // Multi-floor premium (staircase, extra columns, slab per floor)
  const floorPremium = floors > 1 ? (floors - 1) * area * 350 * qf * lf : 0;

  // Beds/baths fitout costs
  const bedroomFitout = beds  * 1800 * qf;
  const bathroomFitout= baths * 3200 * qf;

  const total = foundation + structure + roofing + finishing + miscCivil
               + plumbing + electrical + labour + floorPremium
               + bedroomFitout + bathroomFitout;

  // Land
  const plotsNeeded = Math.max(1, Math.ceil(area / (232 * (floors > 1 ? floors * 0.6 : 1))));
  const minLand = area * 1.8;
  const recLand = area * 2.5;

  // Store for save-project
  _lastCalc = { type, area, quality, location, beds, baths, floors,
    total, costPerM2: Math.round(costPerM2),
    foundation, structure, roofing, finishing, plumbing, electrical,
    labour, floorPremium, bedroomFitout, bathroomFitout, miscCivil,
    plotsNeeded, minLand, recLand };

  const C = CONFIG.CURRENCY;

  // ── Update metrics ──────────────────────────────────────────
  const metricsEl = document.getElementById("est-metrics");
  if (metricsEl) metricsEl.innerHTML = [
    { l:"Total cost",    v:`${C} ${fmt(total)}`,           s:"full estimate" },
    { l:"Cost per m²",   v:`${C} ${fmt(costPerM2)}`,       s:"all-in rate" },
    { l:"Plots needed",  v:`${plotsNeeded} plot${plotsNeeded>1?"s":""}`, s:"100×100 ft ea." },
    { l:"Land area",     v:`${Math.round(minLand)} m²`,    s:"min. requirement" },
  ].map(m=>`<div class="metric">
    <div class="metric-label">${m.l}</div>
    <div class="metric-value">${m.v}</div>
    <div class="metric-sub">${m.s}</div>
  </div>`).join("");

  // ── Breakdown rows ──────────────────────────────────────────
  const rows = [
    { label:"Foundation & Earthworks",  val:foundation,     pct:null },
    { label:"Structure & Frame",        val:structure,      pct:null },
    { label:"Roofing",                  val:roofing,        pct:null },
    { label:"Interior Finishing",       val:finishing,      pct:null },
    { label:"Plumbing",                 val:plumbing,       pct:null },
    { label:"Electrical",               val:electrical,     pct:null },
    { label:"Labour",                   val:labour,         pct:null },
    { label:"Bedroom Fitout",           val:bedroomFitout,  pct:null },
    { label:"Bathroom Fitout",          val:bathroomFitout, pct:null },
    ...(floorPremium>0 ? [{label:"Multi-Floor Premium", val:floorPremium, pct:null}] : []),
    { label:"Contingency & Misc",       val:miscCivil,      pct:null },
  ];

  const tblEl = document.getElementById("cost-table");
  if (tblEl) tblEl.innerHTML =
    `<thead><tr><th>Item</th><th class="tr">${C}</th><th class="tr">%</th></tr></thead><tbody>`
    + rows.map(r=>`<tr>
        <td>${r.label}</td>
        <td class="tr">${fmt(r.val)}</td>
        <td class="tr" style="color:var(--td);">${Math.round(r.val/total*100)}%</td>
      </tr>`).join("")
    + `<tr class="cost-total">
        <td style="font-weight:600;">TOTAL</td>
        <td class="tr">${C} ${fmt(total)}</td>
        <td class="tr">100%</td>
      </tr></tbody>`;

  // ── Land info ───────────────────────────────────────────────
  const landEl = document.getElementById("land-info");
  if (landEl) landEl.innerHTML =
    `<b>Plots required:</b> ${plotsNeeded} standard plot${plotsNeeded>1?"s":""} (100×100 ft each)<br>
     <b>Minimum land:</b> ${Math.round(minLand)} m² (includes setbacks &amp; driveway)<br>
     <b>Recommended:</b> ${Math.round(recLand)} m² (includes garden &amp; parking)<br>
     <b>Quality tier:</b> ${quality.charAt(0).toUpperCase()+quality.slice(1)} — ${qf*100}% of base rate<br>
     <b>Location factor:</b> ${location.charAt(0).toUpperCase()+location.slice(1)} — ${Math.round(lf*100)}% of city rate`;

  // ── Chart ───────────────────────────────────────────────────
  const chartCanvas = document.getElementById("costChart");
  if (!chartCanvas) return;
  if (_costChartInst) { _costChartInst.destroy(); _costChartInst = null; }
  _costChartInst = new Chart(chartCanvas.getContext("2d"), {
    type:"doughnut",
    data:{
      labels: rows.map(r=>r.label),
      datasets:[{
        data: rows.map(r=>Math.round(r.val)),
        backgroundColor:["#C9943A","#1D9E75","#D85A30","#7F77DD","#185FA5","#E8B85A","#639922","#888780","#FA8072","#5DCAA5","#B87333"],
        borderWidth:0, hoverOffset:6
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false, cutout:"62%",
      plugins:{
        legend:{
          position:"right",
          labels:{ color:"#8A8070", font:{size:11}, boxWidth:12, padding:10 }
        }
      }
    }
  });
}

// Number formatter
function fmt(n) { return Math.round(n).toLocaleString(); }

// Save project to Firestore
async function saveProject() {
  const name = document.getElementById("proj-name")?.value.trim();
  if (!name) { alert("Please enter a project name."); return; }
  if (!_lastCalc.total) { alert("Please calculate a cost estimate first."); return; }

  const typeNames = {bungalow:"Bungalow",storey2:"2-Storey House",storey3:"3-Storey House",mansion:"Mansion",commercial:"Commercial"};
  const project = {
    name,
    planName : typeNames[_lastCalc.type] || _lastCalc.type,
    ..._lastCalc,
    createdAt: Date.now(),
    uploadedPlanData: _uploadedPlanData || null,
  };
  try {
    await dbAdd("projects", project);
    const fb = document.getElementById("save-feedback");
    if (fb) { fb.style.display="block"; setTimeout(()=>{fb.style.display="none";},3000); }
    document.getElementById("proj-name").value = "";
    showStatus(`Project "${name}" saved ✓`, "success");
  } catch(e) {
    showStatus("Save failed — check Firebase config", "error");
    console.error(e);
  }
}
