// ═══════════════════════════════════════════════════════
//  ConstructIQ — Expense Tracker (Firestore-backed)
// ═══════════════════════════════════════════════════════

let _expenses    = {};   // { firestoreId: expenseObject }
let _expChart    = null;

const EXP_CATS = [
  "Foundation","Structure & Frame","Roofing","Electrical",
  "Plumbing","Finishing","Labour","Land & Survey","Materials","Other"
];

// ── Populate category dropdowns ──────────────────────────
function populateExpCategories() {
  const cat = document.getElementById("exp-cat");
  const flt = document.getElementById("exp-filter");
  if (cat) cat.innerHTML = EXP_CATS.map(c=>`<option>${c}</option>`).join("");
  if (flt) flt.innerHTML = `<option value="">All categories</option>` +
    EXP_CATS.map(c=>`<option>${c}</option>`).join("");
}

// ── Start real-time listener ─────────────────────────────
function initExpenses() {
  dbListen("expenses", data => {
    _expenses = data || {};
    renderExpenseTable();
    renderExpMetrics();
    renderExpChart();
  });
}

// ── Add expense ──────────────────────────────────────────
async function addExpense() {
  const desc  = document.getElementById("exp-desc").value.trim();
  const cat   = document.getElementById("exp-cat").value;
  const amt   = parseFloat(document.getElementById("exp-amt").value);
  const date  = document.getElementById("exp-date").value;
  const notes = document.getElementById("exp-notes").value.trim();

  if (!desc || !amt || !date) { alert("Please fill in description, amount and date."); return; }

  try {
    await dbAdd("expenses", { desc, cat, amt, date, notes });
    showStatus("Expense saved ✓", "success");
    document.getElementById("exp-desc").value  = "";
    document.getElementById("exp-amt").value   = "";
    document.getElementById("exp-notes").value = "";
  } catch(e) {
    showStatus("Save failed — see console", "error");
    console.error(e);
  }
}

// ── Delete expense ───────────────────────────────────────
async function deleteExpense(id) {
  if (!confirm("Delete this expense?")) return;
  try {
    await dbDelete("expenses", id);
    showStatus("Deleted ✓", "success");
  } catch(e) {
    showStatus("Delete failed", "error");
  }
}

// ── Render expense table ─────────────────────────────────
function renderExpenseTable() {
  const filter   = document.getElementById("exp-filter")?.value || "";
  const all      = Object.entries(_expenses);
  const filtered = filter ? all.filter(([,e])=>e.cat===filter) : all;
  const tbody    = document.getElementById("exp-tbody");
  if (!tbody) return;

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px;">No expenses recorded yet.</td></tr>`;
    return;
  }
  tbody.innerHTML = filtered
    .sort(([,a],[,b]) => (b.date||"").localeCompare(a.date||""))
    .map(([id, e]) => `<tr>
      <td>${e.date||""}</td>
      <td>${e.desc||""}</td>
      <td><span class="badge badge-amber">${e.cat||""}</span></td>
      <td style="color:var(--text-muted);font-size:11px;">${e.notes||"—"}</td>
      <td class="text-right" style="font-weight:500;">${CONFIG.CURRENCY} ${Number(e.amt||0).toLocaleString()}</td>
      <td><button class="btn-danger" onclick="deleteExpense('${id}')">✕</button></td>
    </tr>`).join("");
}

// ── Render metrics ───────────────────────────────────────
function renderExpMetrics() {
  const all       = Object.values(_expenses);
  const total     = all.reduce((s,e) => s+Number(e.amt||0), 0);
  const cats      = new Set(all.map(e=>e.cat)).size;
  const now       = new Date();
  const thisMonth = all.filter(e=>{
    const d = new Date(e.date);
    return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
  }).reduce((s,e)=>s+Number(e.amt||0), 0);

  const C = CONFIG.CURRENCY;
  document.getElementById("exp-metrics").innerHTML = [
    { l:"Total spent",  v:C+" "+total.toLocaleString(),     s:"all time" },
    { l:"This month",   v:C+" "+thisMonth.toLocaleString(), s:"current period" },
    { l:"Transactions", v:all.length,                       s:"entries" },
    { l:"Categories",   v:cats,                             s:"active" },
  ].map(m=>`<div class="metric">
    <div class="metric-label">${m.l}</div>
    <div class="metric-value">${m.v}</div>
    <div class="metric-sub">${m.s}</div>
  </div>`).join("");
}

// ── Render bar chart ─────────────────────────────────────
function renderExpChart() {
  const byCat = {};
  Object.values(_expenses).forEach(e => { byCat[e.cat] = (byCat[e.cat]||0) + Number(e.amt||0); });
  const labels = Object.keys(byCat);
  const data   = Object.values(byCat);
  const colors = ["#EF9F27","#1D9E75","#D85A30","#7F77DD","#185FA5","#BA7517","#639922","#888780","#FA8072","#5DCAA5"];

  const canvas = document.getElementById("expChart"); if (!canvas) return;
  if (_expChart) _expChart.destroy();
  _expChart = new Chart(canvas.getContext("2d"), {
    type: "bar",
    data: { labels, datasets:[{ label:CONFIG.CURRENCY, data, backgroundColor:colors.slice(0,labels.length) }] },
    options: {
      responsive:true, maintainAspectRatio:false,
      scales:{ y:{ ticks:{ callback: v => CONFIG.CURRENCY+Number(v).toLocaleString() } } },
      plugins:{ legend:{ display:false } }
    }
  });
}
