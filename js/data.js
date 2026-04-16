// ConstructIQ v5 — Expenses + Report

// ── EXPENSES ─────────────────────────────────────────────

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
  if (flt) flt.innerHTML = `<option value="">All categories</option>`
    + EXP_CATS.map(c=>`<option>${c}</option>`).join("");
}

function initExpenses() {
  dbListen("expenses", data => {
    _expenses = data || {};
    renderExpenseTable();
    renderExpMetrics();
    renderExpChart();
    if (document.getElementById("page-projects")?.classList.contains("active")) renderProjectsGrid();
  });
}

async function addExpense() {
  const projectKey = document.getElementById("exp-project")?.value || "";
  const desc  = document.getElementById("exp-desc")?.value.trim();
  const cat   = document.getElementById("exp-cat")?.value;
  const amt   = parseFloat(document.getElementById("exp-amt")?.value);
  const date  = document.getElementById("exp-date")?.value;
  const notes = document.getElementById("exp-notes")?.value.trim();
  if (!desc || !amt || !date) { alert("Please fill description, amount and date."); return; }
  const projectName = projectKey ? (_projects[projectKey]?.name || "Unknown") : "No project";
  try {
    await dbAdd("expenses",{projectKey,projectName,desc,cat,amt,date,notes});
    showStatus("Expense saved ✓","success");
    ["exp-desc","exp-amt","exp-notes"].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=""; });
  } catch(e) { showStatus("Save failed","error"); console.error(e); }
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
  if (projFilter!=="all") all = all.filter(([,e])=>e.projectKey===projFilter);
  if (catFilter) all = all.filter(([,e])=>e.cat===catFilter);
  const tbody = document.getElementById("exp-tbody");
  if (!tbody) return;
  if (!all.length) { tbody.innerHTML=`<tr><td colspan="6" style="text-align:center;color:var(--td);padding:24px;">No expenses recorded.</td></tr>`; return; }
  tbody.innerHTML = all.sort(([,a],[,b])=>(b.date||"").localeCompare(a.date||""))
    .map(([id,e])=>`<tr>
      <td>${e.date||""}</td>
      <td style="font-size:11.5px;color:var(--tm);max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e.projectName||"—"}</td>
      <td>${e.desc||""}</td>
      <td><span class="badge bg-gold">${e.cat||""}</span></td>
      <td class="tr" style="font-weight:500;">${CONFIG.CURRENCY} ${Number(e.amt||0).toLocaleString()}</td>
      <td><button class="btn-danger" onclick="deleteExpense('${id}')">✕</button></td>
    </tr>`).join("");
}

function renderExpMetrics() {
  const projFilter = _activeProjectFilter || "all";
  let all = Object.values(_expenses);
  if (projFilter!=="all") all = all.filter(e=>e.projectKey===projFilter);
  const total = all.reduce((s,e)=>s+Number(e.amt||0),0);
  const cats  = new Set(all.map(e=>e.cat)).size;
  const now   = new Date();
  const month = all.filter(e=>{const d=new Date(e.date);return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();}).reduce((s,e)=>s+Number(e.amt||0),0);
  const C = CONFIG.CURRENCY;
  const el = document.getElementById("exp-metrics"); if(!el) return;
  el.innerHTML = [
    {l:"Total spent",  v:`${C} ${total.toLocaleString()}`,  s:projFilter==="all"?"all projects":(_projects[projFilter]?.name||"project")},
    {l:"This month",   v:`${C} ${month.toLocaleString()}`,  s:"current period"},
    {l:"Transactions", v:all.length,                        s:"entries"},
    {l:"Categories",   v:cats,                              s:"active"},
  ].map(m=>`<div class="metric"><div class="metric-label">${m.l}</div><div class="metric-value">${m.v}</div><div class="metric-sub">${m.s}</div></div>`).join("");
}

function renderExpChart() {
  const projFilter = _activeProjectFilter || "all";
  let all = Object.values(_expenses);
  if (projFilter!=="all") all = all.filter(e=>e.projectKey===projFilter);
  const byCat={};
  all.forEach(e=>{byCat[e.cat]=(byCat[e.cat]||0)+Number(e.amt||0);});
  const labels=Object.keys(byCat), data=Object.values(byCat);
  const colors=["#C9943A","#1D9E75","#D85A30","#7F77DD","#185FA5","#E8B85A","#639922","#888780","#FA8072","#5DCAA5"];
  const canvas=document.getElementById("expChart"); if(!canvas) return;
  if(_expChart){_expChart.destroy();_expChart=null;}
  _expChart=new Chart(canvas.getContext("2d"),{
    type:"bar",
    data:{labels,datasets:[{label:CONFIG.CURRENCY,data,backgroundColor:colors.slice(0,labels.length),borderRadius:4}]},
    options:{responsive:true,maintainAspectRatio:false,
      scales:{y:{ticks:{color:"#8A8070",callback:v=>CONFIG.CURRENCY+Number(v).toLocaleString()},grid:{color:"rgba(255,255,255,.04)"}},
               x:{ticks:{color:"#8A8070"},grid:{display:false}}},
      plugins:{legend:{display:false}}}
  });
}

// ── REPORT ───────────────────────────────────────────────

function renderReport() {
  const projKey = _reportProject || "all";
  let all = Object.values(_expenses||{});
  if (projKey!=="all") all = all.filter(e=>e.projectKey===projKey);
  const project = projKey!=="all" ? (_projects||{})[projKey] : null;
  const total   = all.reduce((s,e)=>s+Number(e.amt||0),0);
  const budget  = project?.total || 0;
  const byCat   = {};
  all.forEach(e=>{if(!byCat[e.cat])byCat[e.cat]={amt:0,count:0};byCat[e.cat].amt+=Number(e.amt||0);byCat[e.cat].count++;});
  const sorted = [...all].sort((a,b)=>(b.date||"").localeCompare(a.date||""));
  const now    = new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
  const C      = CONFIG.CURRENCY;
  const pTitle = project?project.name:"All Projects";
  const el = document.getElementById("print-content"); if(!el) return;
  el.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:2px solid #C9943A;">
      <div><div class="print-logo">${CONFIG.APP_NAME}</div><div style="font-size:12px;color:#888;">Building Management · ${CONFIG.COUNTRY}</div></div>
      <div style="text-align:right;"><div style="font-size:16px;font-weight:600;">Construction Expense Report</div>
        <div style="font-size:13px;font-weight:500;color:#C9943A;">${pTitle}</div>
        <div style="font-size:12px;color:#888;">Generated: ${now}</div></div>
    </div>
    ${project?`<div style="background:#F9F6F0;border-radius:8px;padding:1rem 1.25rem;margin-bottom:1.5rem;border-left:4px solid #C9943A;">
      <div style="font-weight:600;font-size:13px;margin-bottom:8px;">Project Budget Summary</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
        <div><div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:1px;">Estimated Budget</div><div style="font-size:18px;font-weight:600;color:#C9943A;">${C} ${Math.round(budget).toLocaleString()}</div></div>
        <div><div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:1px;">Total Spent</div><div style="font-size:18px;font-weight:600;">${C} ${Math.round(total).toLocaleString()}</div></div>
        <div><div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:1px;">Remaining</div><div style="font-size:18px;font-weight:600;color:${total>budget?"#C4622D":"#1D9E75"};">${C} ${Math.round(Math.max(0,budget-total)).toLocaleString()}</div></div>
      </div></div>`:""}
    <div style="margin-bottom:1.5rem;"><div style="font-weight:600;margin-bottom:10px;font-size:13px;">Summary by Category</div>
      <table class="rtable"><thead><tr><th>Category</th><th>Transactions</th><th style="text-align:right;">Amount (${C})</th><th style="text-align:right;">% of Total</th></tr></thead>
      <tbody>${Object.entries(byCat).sort((a,b)=>b[1].amt-a[1].amt).map(([cat,v])=>`<tr><td>${cat}</td><td>${v.count}</td><td style="text-align:right;">${v.amt.toLocaleString()}</td><td style="text-align:right;">${total?Math.round(v.amt/total*100):0}%</td></tr>`).join("")}</tbody></table></div>
    <div style="margin-bottom:1.5rem;"><div style="font-weight:600;margin-bottom:10px;font-size:13px;">All Transactions</div>
      <table class="rtable"><thead><tr><th>Date</th>${projKey==="all"?"<th>Project</th>":""}<th>Description</th><th>Category</th><th>Notes</th><th style="text-align:right;">${C}</th></tr></thead>
      <tbody>${sorted.map(e=>`<tr><td>${e.date||""}</td>${projKey==="all"?`<td style="font-size:11px;color:#888;">${e.projectName||"—"}</td>`:""}<td>${e.desc||""}</td><td>${e.cat||""}</td><td style="color:#888;font-size:12px;">${e.notes||"—"}</td><td style="text-align:right;font-weight:500;">${Number(e.amt||0).toLocaleString()}</td></tr>`).join("")||`<tr><td colspan="6" style="text-align:center;color:#aaa;padding:16px;">No expenses.</td></tr>`}</tbody></table></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;margin-top:1.5rem;">
      ${[{l:"Total expenditure",v:`${C} ${total.toLocaleString()}`},{l:"Transactions",v:all.length},{l:"Categories",v:Object.keys(byCat).length},{l:"Report date",v:now}].map(m=>`<div style="background:#F5F3EF;border-radius:8px;padding:12px;"><div style="font-size:10px;color:#888;margin-bottom:4px;text-transform:uppercase;letter-spacing:.8px;">${m.l}</div><div style="font-size:15px;font-weight:600;">${m.v}</div></div>`).join("")}
    </div>
    <div style="margin-top:2rem;padding-top:1rem;border-top:1px solid #eee;font-size:11px;color:#aaa;text-align:center;">${CONFIG.APP_NAME} · Building Management System · Confidential</div>`;
}
