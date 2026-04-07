// ═══════════════════════════════════════════════════════
//  ConstructIQ — Report Module
// ═══════════════════════════════════════════════════════

function renderReport() {
  const all   = Object.values(_expenses);
  const total = all.reduce((s,e) => s+Number(e.amt||0), 0);

  const byCat = {};
  all.forEach(e => {
    if (!byCat[e.cat]) byCat[e.cat] = { amt:0, count:0 };
    byCat[e.cat].amt   += Number(e.amt||0);
    byCat[e.cat].count += 1;
  });

  const sorted = [...all].sort((a,b) => (b.date||"").localeCompare(a.date||""));
  const now    = new Date().toLocaleDateString("en-GB",{ day:"numeric", month:"long", year:"numeric" });
  const C      = CONFIG.CURRENCY;

  document.getElementById("print-content").innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1.5px solid #ccc;">
      <div>
        <div class="print-logo">${CONFIG.APP_NAME}</div>
        <div style="font-size:12px;color:#888;margin-top:2px;">Building Management System · ${CONFIG.COUNTRY}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:17px;font-weight:500;margin-bottom:3px;">Construction Expense Report</div>
        <div style="font-size:12px;color:#888;">Generated: ${now}</div>
      </div>
    </div>

    <div style="margin-bottom:1.5rem;">
      <div style="font-weight:500;margin-bottom:10px;font-size:13px;">Summary by category</div>
      <table class="report-table">
        <thead><tr>
          <th>Category</th><th>Transactions</th>
          <th style="text-align:right;">Amount (${C})</th>
          <th style="text-align:right;">% of Total</th>
        </tr></thead>
        <tbody>${Object.entries(byCat).sort((a,b)=>b[1].amt-a[1].amt).map(([cat,v])=>`<tr>
          <td>${cat}</td>
          <td>${v.count}</td>
          <td style="text-align:right;">${v.amt.toLocaleString()}</td>
          <td style="text-align:right;">${total?Math.round(v.amt/total*100):0}%</td>
        </tr>`).join("")}</tbody>
      </table>
    </div>

    <div style="margin-bottom:1.5rem;">
      <div style="font-weight:500;margin-bottom:10px;font-size:13px;">All transactions</div>
      <table class="report-table">
        <thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Notes</th><th style="text-align:right;">${C}</th></tr></thead>
        <tbody>${sorted.map(e=>`<tr>
          <td>${e.date||""}</td>
          <td>${e.desc||""}</td>
          <td>${e.cat||""}</td>
          <td style="color:#888;font-size:12px;">${e.notes||"—"}</td>
          <td style="text-align:right;font-weight:500;">${Number(e.amt||0).toLocaleString()}</td>
        </tr>`).join("") || `<tr><td colspan="5" style="text-align:center;color:#aaa;padding:16px;">No expenses recorded.</td></tr>`}
        </tbody>
      </table>
    </div>

    <div class="report-summary">
      ${[
        { l:"Total expenditure",  v: C+" "+total.toLocaleString() },
        { l:"No. of transactions",v: all.length },
        { l:"No. of categories",  v: Object.keys(byCat).length },
        { l:"Report date",        v: now },
      ].map(m=>`<div class="report-metric">
        <div class="report-metric-label">${m.l}</div>
        <div class="report-metric-value">${m.v}</div>
      </div>`).join("")}
    </div>

    <div style="margin-top:2rem;padding-top:1rem;border-top:1px solid #eee;font-size:11px;color:#aaa;text-align:center;">
      ${CONFIG.APP_NAME} · Building Management System · Confidential Report
    </div>`;
}
