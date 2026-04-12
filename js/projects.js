// ConstructIQ v4 — Project Manager (Firestore-backed)

let _projects = {};
let _activeProjectFilter = "all";

// Real-time listener
function initProjects() {
  dbListen("projects", data => {
    _projects = data || {};
    renderProjectsGrid();
    populateProjectDropdowns();
    renderProjectFilterTabs();
    renderReportProjectTabs();
  });
}

// Get project photo by type
function getProjectPhoto(type) {
  const photos = {
    bungalow:   "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=70&auto=format&fit=crop",
    storey2:    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=70&auto=format&fit=crop",
    storey3:    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=70&auto=format&fit=crop",
    mansion:    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=70&auto=format&fit=crop",
    commercial: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=70&auto=format&fit=crop",
  };
  return photos[type] || photos.bungalow;
}

// Render project cards
function renderProjectsGrid() {
  const grid  = document.getElementById("projects-grid");
  const empty = document.getElementById("projects-empty");
  const entries = Object.entries(_projects);

  if (!entries.length) {
    grid.style.display  = "none";
    empty.style.display = "block";
    return;
  }
  grid.style.display  = "grid";
  empty.style.display = "none";

  grid.innerHTML = entries
    .sort(([,a],[,b]) => b.createdAt - a.createdAt)
    .map(([key, p]) => {
      const spent   = getProjectSpend(key);
      const budget  = p.total || 0;
      const pct     = budget > 0 ? Math.min(100, Math.round(spent/budget*100)) : 0;
      const remaining = Math.max(0, budget - spent);
      const C = CONFIG.CURRENCY;
      const barColor = pct > 90 ? "#C4622D" : pct > 70 ? "#E8B85A" : "#1D9E75";

      return `<div class="project-card">
        <div class="project-card-photo">
          <img src="${getProjectPhoto(p.type)}" alt="${p.name}" loading="lazy"/>
          <div class="project-card-photo-overlay"></div>
        </div>
        <div class="project-card-body">
          <div class="project-card-name">${p.name}</div>
          <div class="project-card-type">${p.planName||p.type} · ${p.area}m² · ${p.quality} finish</div>
          <div class="project-budget-row">
            <span class="project-budget-label">Budget</span>
            <span class="project-budget-val">${C} ${Math.round(budget).toLocaleString()}</span>
          </div>
          <div class="project-budget-row" style="margin-bottom:6px;">
            <span class="project-budget-label">Spent</span>
            <span style="font-size:14px;font-weight:500;color:${barColor};">${C} ${Math.round(spent).toLocaleString()}</span>
          </div>
          <div class="project-progress-track">
            <div class="project-progress-bar" style="width:${pct}%;background:linear-gradient(to right,${barColor},${barColor}99);"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--td);margin-bottom:12px;">
            <span>${pct}% spent</span>
            <span>${C} ${Math.round(remaining).toLocaleString()} remaining</span>
          </div>
          <div class="project-card-actions">
            <button class="btn-gold-sm" onclick="openProjectExpenses('${key}','${p.name.replace(/'/g,"\\'")}')">+ Add Expense</button>
            <button class="btn-ghost-sm" onclick="viewProjectReport('${key}')">Report</button>
            <button class="btn-danger" onclick="deleteProject('${key}','${p.name.replace(/'/g,"\\'")}')">✕</button>
          </div>
        </div>
      </div>`;
    }).join("");
}

// Get total spend for a project
function getProjectSpend(projectKey) {
  return Object.values(_expenses||{})
    .filter(e => e.projectKey === projectKey)
    .reduce((s,e) => s + Number(e.amt||0), 0);
}

// Populate project dropdowns in expenses form
function populateProjectDropdowns() {
  const sel = document.getElementById("exp-project");
  if (!sel) return;
  const entries = Object.entries(_projects);
  sel.innerHTML = `<option value="">— Select project —</option>` +
    entries.map(([key,p]) => `<option value="${key}">${p.name}</option>`).join("");
}

// Project filter tabs in expenses page
function renderProjectFilterTabs() {
  const wrap = document.getElementById("project-filter-tabs");
  if (!wrap) return;
  const entries = Object.entries(_projects);
  wrap.innerHTML = `<button class="proj-tab${_activeProjectFilter==="all"?" active":""}" onclick="setProjectFilter('all',this)">All Projects</button>` +
    entries.map(([key,p]) => `<button class="proj-tab${_activeProjectFilter===key?" active":""}" onclick="setProjectFilter('${key}',this)">${p.name}</button>`).join("");
}

// Report project tabs
function renderReportProjectTabs() {
  const wrap = document.getElementById("report-project-tabs");
  if (!wrap) return;
  const entries = Object.entries(_projects);
  const sel = wrap.dataset.selected || "all";
  wrap.innerHTML = `<button class="proj-tab${sel==="all"?" active":""}" onclick="setReportProject('all',this)">All Projects</button>` +
    entries.map(([key,p]) => `<button class="proj-tab${sel===key?" active":""}" onclick="setReportProject('${key}',this)">${p.name}</button>`).join("");
}

function setProjectFilter(key, el) {
  _activeProjectFilter = key;
  document.querySelectorAll("#project-filter-tabs .proj-tab").forEach(b=>b.classList.remove("active"));
  el.classList.add("active");
  renderExpenseTable();
  renderExpMetrics();
  renderExpChart();
}

let _reportProject = "all";
function setReportProject(key, el) {
  _reportProject = key;
  const wrap = document.getElementById("report-project-tabs");
  wrap.dataset.selected = key;
  document.querySelectorAll("#report-project-tabs .proj-tab").forEach(b=>b.classList.remove("active"));
  el.classList.add("active");
  renderReport();
}

function openProjectExpenses(key, name) {
  switchTab("expenses", document.querySelector('[data-tab="expenses"]'));
  setTimeout(() => {
    const sel = document.getElementById("exp-project");
    if (sel) sel.value = key;
  }, 100);
  showStatus(`Adding expense to: ${name}`, "info");
}

function viewProjectReport(key) {
  switchTab("report", document.querySelector('[data-tab="report"]'));
  setTimeout(() => {
    _reportProject = key;
    renderReportProjectTabs();
    renderReport();
  }, 100);
}

async function deleteProject(key, name) {
  if (!confirm(`Delete project "${name}"? This cannot be undone.`)) return;
  try {
    await dbDelete("projects", key);
    showStatus("Project deleted", "success");
  } catch(e) { showStatus("Delete failed","error"); }
}
