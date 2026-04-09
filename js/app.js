// ═══════════════════════════════════════════════════════
//  ConstructIQ Professional — App Controller
// ═══════════════════════════════════════════════════════

// ── Navbar scroll effect ─────────────────────────────────
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
});

// ── Tab switching ────────────────────────────────────────
function switchTab(id, btn) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));

  const page = document.getElementById("page-" + id);
  if (page) page.classList.add("active");

  const activeBtn = btn || document.querySelector(`.nav-btn[data-tab="${id}"]`);
  if (activeBtn) activeBtn.classList.add("active");

  document.getElementById("nav-links").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (id === "estimator")   setTimeout(calcCost, 80);
  if (id === "expenses")    { renderExpenseTable(); renderExpMetrics(); setTimeout(renderExpChart, 80); }
  if (id === "report")      renderReport();
  if (id === "paint")       { filterPins(); setTimeout(() => { drawVizRoom(); renderVizInfo(); }, 80); }
}

// ── Paint sub-tabs ───────────────────────────────────────
function switchPaintTab(id, btn) {
  document.querySelectorAll(".paint-panel").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".subtab").forEach(b => b.classList.remove("active"));
  const panel = document.getElementById("paint-" + id);
  if (panel) panel.classList.add("active");
  if (btn) btn.classList.add("active");
  if (id === "visualizer")  { setTimeout(() => { drawVizRoom(); renderVizInfo(); }, 60); }
  if (id === "matcher")     runMatcher();
  if (id === "saved")       renderSavedPalettes();
}

// ── Mobile menu ──────────────────────────────────────────
function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("open");
}

// ── App init ─────────────────────────────────────────────
function initApp() {
  initFirebase();

  const dateEl = document.getElementById("exp-date");
  if (dateEl) dateEl.value = new Date().toISOString().split("T")[0];

  populateExpCategories();
  renderPlans();
  buildPaintTags();
  filterPins();
  buildVisualizerControls();
  setTimeout(() => { drawVizRoom(); renderVizInfo(); }, 300);
  runMatcher();
  initExpenses();
  initPaint();
}

document.addEventListener("DOMContentLoaded", initApp);
