// ConstructIQ v5 — Project Manager

let _projects = {};
let _activeProjectFilter = "all";
let _reportProject = "all";

function initProjects() {
  dbListen("projects", data => {
    _projects = data || {};
    renderProjectsGrid();
    populateProjectDropdowns();
    renderProjectFilterTabs();
    renderReportProjectTabs();
  });
}

function getProjectPhoto(type) {
  const map = {
    bungalow:   "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=70&auto=format&fit=crop",
    storey2:    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=70&auto=format&fit=crop",
    storey3:    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=70&auto=format&fit=crop",
    mansion:    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&q=70&auto=format&fit=crop",
    commercial: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=70&auto=format&fit=crop",
  };
  return map[type] || map.bungalow;
}

function getProjectSpend(key) {
  return Object.values(_expenses||{}).filter(e=>e.projectKey===key).reduce((s,e)=>s+Number(e.amt||0),0);
}

function renderProjectsGrid() {
  const grid  = document.getElementById("projects-grid");
  const empty = document.getElementById("projects-empty");
  const entries = Object.entries(_projects).sort(([,a],[,b])=>b.createdAt-a.createdAt);
  if (!entries.length) { grid.style.display="none"; empty.style.display="block"; return; }
  grid.style.display="grid"; empty.style.display="none";
  const C = CONFIG.CURRENCY;
  grid.innerHTML = entries.map(([key,p])=>{
    const spent    = getProjectSpend(key);
    const budget   = p.total || 0;
    const pct      = budget>0 ? Math.min(100,Math.round(spent/budget*100)) : 0;
    const remaining= Math.max(0, budget-spent);
    const barColor = pct>90?"#C4622D":pct>70?"#E8B85A":"#1D9E75";
    const photo    = p.uploadedPlanData
      ? `data:image/jpeg;base64,${p.uploadedPlanData}`
      : getProjectPhoto(p.type);
    return `<div class="project-card">
      <div class="project-card-photo"><img src="${photo}" alt="${p.name}" loading="lazy"/><div class="pcard-photo-ov"></div>
        <div style="position:absolute;top:10px;left:12px;font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.7);">${p.planName||p.type}</div>
      </div>
      <div class="project-card-body">
        <div class="pcard-name">${p.name}</div>
        <div class="pcard-meta">${p.area||"—"}m² · ${p.floors||1} floor${(p.floors||1)>1?"s":""} · ${p.quality||"standard"} finish · ${p.location||"city"}</div>
        <div class="pcard-budget-row"><span class="pcard-blabel">Budget</span><span class="pcard-bval">${C} ${fmt(budget)}</span></div>
        <div class="pcard-budget-row" style="margin-bottom:6px;"><span class="pcard-blabel">Spent</span><span style="font-size:14px;font-weight:500;color:${barColor};">${C} ${fmt(spent)}</span></div>
        <div class="progress-track"><div class="progress-bar" style="width:${pct}%;background:${barColor};"></div></div>
        <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--td);margin-bottom:12px;"><span>${pct}% spent</span><span>${C} ${fmt(remaining)} left</span></div>
        <div style="display:flex;gap:7px;flex-wrap:wrap;">
          <button class="btn-gold-sm" onclick="openProjectExpenses('${key}','${p.name.replace(/'/g,"\\'")}')">+ Expense</button>
          <button class="btn-ghost-sm" onclick="viewProjectReport('${key}')">Report</button>
          <button class="btn-ghost-sm" onclick="loadProjectToEstimator('${key}')">Edit Estimate</button>
          <button class="btn-danger" onclick="deleteProject('${key}','${p.name.replace(/'/g,"\\'")}')">✕</button>
        </div>
      </div>
    </div>`; }).join("");
}

function populateProjectDropdowns() {
  const sel = document.getElementById("exp-project");
  if (!sel) return;
  const entries = Object.entries(_projects).sort(([,a],[,b])=>b.createdAt-a.createdAt);
  sel.innerHTML = `<option value="">— Select project —</option>`
    + entries.map(([key,p])=>`<option value="${key}">${p.name}</option>`).join("");
}

function renderProjectFilterTabs() {
  const wrap = document.getElementById("project-filter-tabs");
  if (!wrap) return;
  const entries = Object.entries(_projects).sort(([,a],[,b])=>b.createdAt-a.createdAt);
  wrap.innerHTML = `<button class="proj-tab${_activeProjectFilter==="all"?" active":""}" onclick="setProjectFilter('all',this)">All Projects</button>`
    + entries.map(([key,p])=>`<button class="proj-tab${_activeProjectFilter===key?" active":""}" onclick="setProjectFilter('${key}',this)">${p.name}</button>`).join("");
}

function renderReportProjectTabs() {
  const wrap = document.getElementById("report-project-tabs");
  if (!wrap) return;
  const entries = Object.entries(_projects).sort(([,a],[,b])=>b.createdAt-a.createdAt);
  wrap.innerHTML = `<button class="proj-tab${_reportProject==="all"?" active":""}" onclick="setReportProject('all',this)">All Projects</button>`
    + entries.map(([key,p])=>`<button class="proj-tab${_reportProject===key?" active":""}" onclick="setReportProject('${key}',this)">${p.name}</button>`).join("");
}

function setProjectFilter(key,el) {
  _activeProjectFilter=key;
  document.querySelectorAll("#project-filter-tabs .proj-tab").forEach(b=>b.classList.remove("active"));
  el.classList.add("active");
  renderExpenseTable(); renderExpMetrics(); renderExpChart();
}

function setReportProject(key,el) {
  _reportProject=key;
  document.querySelectorAll("#report-project-tabs .proj-tab").forEach(b=>b.classList.remove("active"));
  el.classList.add("active");
  renderReport();
}

function openProjectExpenses(key,name) {
  switchTab("expenses", document.querySelector('[data-tab="expenses"]'));
  setTimeout(()=>{ const sel=document.getElementById("exp-project"); if(sel) sel.value=key; },120);
  showStatus(`Adding expense to: ${name}`,"info");
}

function viewProjectReport(key) {
  _reportProject=key;
  switchTab("report", document.querySelector('[data-tab="report"]'));
  setTimeout(()=>{ renderReportProjectTabs(); renderReport(); },100);
}

function loadProjectToEstimator(key) {
  const p = _projects[key]; if(!p) return;
  if(p.type)    document.getElementById("est-type").value    = p.type;
  if(p.area)    document.getElementById("est-area").value    = p.area;
  if(p.beds>=0) document.getElementById("est-beds").value    = p.beds;
  if(p.baths)   document.getElementById("est-baths").value   = p.baths;
  if(p.floors)  document.getElementById("est-floors").value  = p.floors;
  if(p.quality) document.getElementById("est-quality").value = p.quality;
  if(p.location)document.getElementById("est-location").value= p.location;
  document.getElementById("proj-name").value = p.name;
  switchTab("estimator", document.querySelector('[data-tab="estimator"]'));
  setTimeout(calcCost,80);
  showStatus(`Loaded "${p.name}" into estimator`,"success");
}

async function deleteProject(key,name) {
  if(!confirm(`Delete project "${name}"? This cannot be undone.`)) return;
  try { await dbDelete("projects",key); showStatus("Deleted","success"); }
  catch(e) { showStatus("Delete failed","error"); }
}

function fmt(n){ return Math.round(n).toLocaleString(); }
