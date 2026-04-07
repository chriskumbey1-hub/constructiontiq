// ═══════════════════════════════════════════════════════
//  ConstructIQ — App Controller
// ═══════════════════════════════════════════════════════

// ── Tab switching ────────────────────────────────────────
function switchTab(id, btn) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));

  const page = document.getElementById("page-" + id);
  if (page) page.classList.add("active");

  // btn may be passed directly or found via data-tab
  const activeBtn = btn || document.querySelector(`.tab-btn[data-tab="${id}"]`);
  if (activeBtn) activeBtn.classList.add("active");

  // Close mobile menu
  document.getElementById("nav-tabs").classList.remove("open");

  // Per-tab init
  if (id === "estimator")        setTimeout(calcCost, 60);
  if (id === "expenses")         { renderExpenseTable(); renderExpMetrics(); setTimeout(renderExpChart, 60); }
  if (id === "report")           renderReport();
  if (id === "paint-inspiration"){ filterPins(); }
  if (id === "paint-visualizer") { setTimeout(() => { drawVizRoom(); renderVizInfo(); }, 60); }
  if (id === "paint-matcher")    runMatcher();
  if (id === "paint-saved")      renderSavedPalettes();
}

// ── Mobile hamburger ────────────────────────────────────
function toggleMenu() {
  document.getElementById("nav-tabs").classList.toggle("open");
}

// ── App init ─────────────────────────────────────────────
function initApp() {
  // Firebase first
  initFirebase();

  // Default date
  const dateEl = document.getElementById("exp-date");
  if (dateEl) dateEl.value = new Date().toISOString().split("T")[0];

  // Dropdowns
  populateExpCategories();

  // Building plans
  renderPlans();

  // Paint studio
  buildPaintTags();
  filterPins();
  buildVisualizerControls();
  setTimeout(() => { drawVizRoom(); renderVizInfo(); }, 250);
  runMatcher();

  // Firestore listeners (will also do initial render)
  initExpenses();
  initPaint();
}

document.addEventListener("DOMContentLoaded", initApp);
