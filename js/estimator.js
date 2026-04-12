// ConstructIQ v4 — Reactive Cost Estimator + Save Project

const COST_RATES   = { bungalow:2800, storey2:3200, storey3:3500, mansion:5000, commercial:3800 };
const QUALITY_MULT = { basic:.75, standard:1, premium:1.4, luxury:2 };
const LOCATION_MULT= { rural:.75, town:.9, city:1, upscale:1.3 };

let _costChart = null;
let _lastEstimate = {};

function calcCost() {
  const type     = document.getElementById("est-type").value;
  const area     = parseFloat(document.getElementById("est-area").value) || 100;
  const quality  = document.getElementById("est-quality").value;
  const location = document.getElementById("est-location").value;
  const beds     = parseInt(document.getElementById("est-beds").value) || 0;
  const baths    = parseInt(document.getElementById("est-baths").value) || 1;

  const base       = COST_RATES[type] * area * QUALITY_MULT[quality] * LOCATION_MULT[location];
  const foundation = base * 0.15;
  const structure  = base * 0.30;
  const roofing    = base * 0.10;
  const plumbing   = (baths * 4500 + 3000) * QUALITY_MULT[quality];
  const electrical = (area * 80 + 2000) * QUALITY_MULT[quality];
  const finishing  = base * 0.20;
  const labour     = base * 0.15;
  const misc       = base * 0.05;
  const total      = foundation+structure+roofing+plumbing+electrical+finishing+labour+misc;
  const plotsNeeded= Math.max(1, Math.ceil(area/232));
  const C = CONFIG.CURRENCY;

  // Store for save project
  _lastEstimate = { type, area, quality, location, beds, baths, total, plotsNeeded,
    foundation, structure, roofing, plumbing, electrical, finishing, labour, misc };

  // Metrics — animate by rebuilding
  document.getElementById("est-metrics").innerHTML = [
    {l:"Total cost",   v:C+" "+Math.round(total).toLocaleString(),         s:"estimated"},
    {l:"Cost per m²",  v:C+" "+Math.round(total/area).toLocaleString(),    s:"per sq metre"},
    {l:"Plots needed", v:plotsNeeded+" plot"+(plotsNeeded>1?"s":""),        s:"100×100 ft each"},
    {l:"Land area",    v:(area*1.8).toFixed(0)+" m²",                      s:"incl. setbacks"},
  ].map(m=>`<div class="metric">
    <div class="metric-label">${m.l}</div>
    <div class="metric-value">${m.v}</div>
    <div class="metric-sub">${m.s}</div>
  </div>`).join("");

  // Breakdown rows
  const rows = [
    ["Foundation & Earthworks", foundation, 15],
    ["Structure & Frame",        structure,  30],
    ["Roofing",                  roofing,    10],
    ["Plumbing",                 plumbing,   null],
    ["Electrical",               electrical, null],
    ["Interior Finishing",       finishing,  20],
    ["Labour",                   labour,     15],
    ["Contingency & Misc",       misc,         5],
  ];

  document.getElementById("cost-table").innerHTML =
    `<thead><tr><th>Item</th><th class="tr">${C}</th><th class="tr">%</th></tr></thead><tbody>` +
    rows.map(r=>`<tr>
      <td>${r[0]}</td>
      <td class="tr">${Math.round(r[1]).toLocaleString()}</td>
      <td class="tr" style="color:var(--td);">${r[2]!=null?r[2]:Math.round(r[1]/total*100)}%</td>
    </tr>`).join("") +
    `<tr class="cost-total">
      <td style="font-weight:600;">TOTAL</td>
      <td class="tr">${C} ${Math.round(total).toLocaleString()}</td>
      <td class="tr">100%</td>
    </tr></tbody>`;

  document.getElementById("land-info").innerHTML =
    `<b>Plots required:</b> ${plotsNeeded} standard plot${plotsNeeded>1?"s":""} (100ft × 100ft each)<br>
     <b>Minimum land area:</b> ${(area*1.8).toFixed(0)} m² (setbacks &amp; driveway included)<br>
     <b>Recommended land:</b> ${(area*2.5).toFixed(0)} m² (includes garden &amp; parking)<br>
     <b>Note:</b> 1 standard Ghanaian plot ≈ 100ft × 100ft ≈ 929 m²`;

  // Chart
  if (_costChart) _costChart.destroy();
  const ctx = document.getElementById("costChart")?.getContext("2d");
  if (!ctx) return;
  _costChart = new Chart(ctx, {
    type:"doughnut",
    data:{
      labels: rows.map(r=>r[0]),
      datasets:[{data:rows.map(r=>Math.round(r[1])),
        backgroundColor:["#C9943A","#1D9E75","#D85A30","#7F77DD","#185FA5","#E8B85A","#639922","#888780"],
        borderWidth:0}]
    },
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{position:"right",labels:{color:"#8A8070",font:{size:11},boxWidth:12}}}}
  });
}

// Save current estimate as a project to Firestore
async function saveProject() {
  const name = document.getElementById("proj-name").value.trim();
  if (!name) { alert("Please enter a project name."); return; }
  if (!_lastEstimate.total) { alert("Please calculate a cost first."); return; }

  const project = {
    name,
    ..._lastEstimate,
    createdAt: Date.now(),
    planName: document.getElementById("est-type").options[document.getElementById("est-type").selectedIndex].text,
  };

  try {
    await dbAdd("projects", project);
    const fb = document.getElementById("save-feedback");
    fb.style.display = "block";
    document.getElementById("proj-name").value = "";
    showStatus(`Project "${name}" saved ✓`, "success");
    setTimeout(() => { fb.style.display = "none"; }, 3000);
  } catch(e) {
    showStatus("Save failed — check Firebase config", "error");
    console.error(e);
  }
}
