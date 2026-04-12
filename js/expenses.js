// ConstructIQ v4 — Expense Tracker (project-aware, Firestore-backed)

let _expenses = {};
let _expChart  = null;

const EXP_CATS = [
  "Foundation","Structure & Frame","Roofing","Electrical",
  "Plumbing","Finishing","Labour","Land & Survey","Materials","Other"
];

function populateExpCategories() {
  const cat = document.getElementById("exp-cat");
  const flt = document.getElementById("exp-filter");
  if (cat) cat.innerHTML = EXP_CATS.map(c=>`<option>${c}</option>`).join("");
  if (flt) flt.innerHTML = `<option value="">All categories</option>`+EXP_CATS.map(c=>`<option>${c}</option>`).join("");
}

function initExpenses() {
  dbListen("expenses", data => {
    _expenses = data || {};
    renderExpenseTable();
    renderExpMetrics();
    renderExpChart();
    // Update project cards if visible
    if (document.getElementById("page-projects").classList.contains("active")) renderProjectsGrid();
  });
}

async function addExpense() {
  const projectKey = document.getElementById("exp-project").value;
  const desc  = document.getElementById("exp-desc").value.trim();
  const cat   = document.getElementById("exp-cat").value;
  const amt   = parseFloat(document.getElementById("exp-amt").value);
  const date  = document.getElementById("exp-date").value;
  const notes = document.getElementById("exp-notes").value.trim();

  if (!desc || !amt || !date) { alert("Please fill in description, amount and date."); return; }

  const projectName = projectKey
    ? (_projects[projectKey]?.name || "Unknown Project")
    : "No project";

  try {
    await dbAdd("expenses", { projectKey, projectName, desc, cat, amt, date, notes });
    showStatus("Expense saved ✓", "success");
    document.getElementById("exp-desc").value  = "";
    document.getElementById("exp-amt").value   = "";
    document.getElementById("exp-notes").value = "";
  } catch(e) {
    showStatus("Save failed — check Firebase", "error");
    console.error(e);
  }
}

async function deleteExpense(id) {
  if (!confirm("Delete this expense?")) return;
  try { await dbDelete("expenses",id); showStatus("Deleted","success"); }
  catch(e) { showStatus("Delete failed","error"); }
}

function renderExpenseTable() {
  const catFilter  = document.getElementById("exp-filter")?.value || "";
  const projFilter = _activeProjectFilter || "all";

  let all = Object.entries(_expenses);
  if (projFilter !== "all") all = all.filter(([,e])=>e.projectKey===projFilter);
  if (catFilter) all = all.filter(([,e])=>e.cat===catFilter);

  const tbody = document.getElementById("exp-tbody");
  if (!all.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--td);padding:24px;">No expenses recorded yet.</td></tr>`;
    return;
  }
  tbody.innerHTML = all
    .sort(([,a],[,b])=>(b.date||"").localeCompare(a.date||""))
    .map(([id,e])=>`<tr>
      <td>${e.date||""}</td>
      <td style="max-width:120px;font-size:12px;color:var(--tm);">${e.projectName||"—"}</td>
      <td>${e.desc||""}</td>
      <td><span class="badge bg-gold">${e.cat||""}</span></td>
      <td class="tr" style="font-weight:500;">${CONFIG.CURRENCY} ${Number(e.amt||0).toLocaleString()}</td>
      <td><button class="btn-danger" onclick="deleteExpense('${id}')">✕</button></td>
    </tr>`).join("");
}

function renderExpMetrics() {
  const projFilter = _activeProjectFilter || "all";
  let all = Object.values(_expenses);
  if (projFilter !== "all") all = all.filter(e=>e.projectKey===projFilter);

  const total  = all.reduce((s,e)=>s+Number(e.amt||0),0);
  const cats   = new Set(all.map(e=>e.cat)).size;
  const now    = new Date();
  const month  = all.filter(e=>{const d=new Date(e.date);return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();}).reduce((s,e)=>s+Number(e.amt||0),0);
  const C = CONFIG.CURRENCY;

  const projectLabel = projFilter==="all" ? "all projects" : (_projects[projFilter]?.name||"project");

  document.getElementById("exp-metrics").innerHTML = [
    {l:"Total spent",  v:C+" "+total.toLocaleString(),  s:projectLabel},
    {l:"This month",   v:C+" "+month.toLocaleString(),  s:"current period"},
    {l:"Transactions", v:all.length,                    s:"entries"},
    {l:"Categories",   v:cats,                          s:"active"},
  ].map(m=>`<div class="metric">
    <div class="metric-label">${m.l}</div>
    <div class="metric-value">${m.v}</div>
    <div class="metric-sub">${m.s}</div>
  </div>`).join("");
}

function renderExpChart() {
  const projFilter = _activeProjectFilter || "all";
  let all = Object.values(_expenses);
  if (projFilter !== "all") all = all.filter(e=>e.projectKey===projFilter);

  const byCat = {};
  all.forEach(e=>{byCat[e.cat]=(byCat[e.cat]||0)+Number(e.amt||0);});
  const labels = Object.keys(byCat);
  const data   = Object.values(byCat);
  const colors = ["#C9943A","#1D9E75","#D85A30","#7F77DD","#185FA5","#E8B85A","#639922","#888780","#FA8072","#5DCAA5"];

  const canvas = document.getElementById("expChart"); if (!canvas) return;
  if (_expChart) _expChart.destroy();
  _expChart = new Chart(canvas.getContext("2d"),{
    type:"bar",
    data:{labels,datasets:[{label:CONFIG.CURRENCY,data,backgroundColor:colors.slice(0,labels.length),borderRadius:4}]},
    options:{responsive:true,maintainAspectRatio:false,
      scales:{y:{ticks:{color:"#8A8070",callback:v=>CONFIG.CURRENCY+Number(v).toLocaleString()},grid:{color:"rgba(255,255,255,.04)"}},
               x:{ticks:{color:"#8A8070"},grid:{display:false}}},
      plugins:{legend:{display:false}}}
  });
}
