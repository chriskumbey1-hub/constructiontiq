// ConstructIQ v4 — Report Module (per-project)

function renderReport() {
  const projKey = typeof _reportProject !== "undefined" ? _reportProject : "all";
  let all = Object.values(_expenses||{});
  if (projKey !== "all") all = all.filter(e=>e.projectKey===projKey);

  const project = projKey !== "all" ? (_projects||{})[projKey] : null;
  const total   = all.reduce((s,e)=>s+Number(e.amt||0),0);
  const budget  = project?.total || 0;
  const byCat   = {};
  all.forEach(e=>{
    if(!byCat[e.cat]) byCat[e.cat]={amt:0,count:0};
    byCat[e.cat].amt   += Number(e.amt||0);
    byCat[e.cat].count += 1;
  });
  const sorted = [...all].sort((a,b)=>(b.date||"").localeCompare(a.date||""));
  const now    = new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
  const C      = CONFIG.CURRENCY;
  const projectTitle = project ? project.name : "All Projects";

  document.getElementById("print-content").innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:2px solid #C9943A;">
      <div><div class="print-logo">${CONFIG.APP_NAME}</div>
        <div style="font-size:12px;color:#888;margin-top:2px;">Building Management System · ${CONFIG.COUNTRY}</div></div>
      <div style="text-align:right;">
        <div style="font-size:16px;font-weight:600;margin-bottom:3px;">Construction Expense Report</div>
        <div style="font-size:13px;font-weight:500;color:#C9943A;">${projectTitle}</div>
        <div style="font-size:12px;color:#888;">Generated: ${now}</div>
      </div>
    </div>

    ${project ? `
    <div style="background:#F9F6F0;border-radius:8px;padding:1rem 1.25rem;margin-bottom:1.5rem;border-left:4px solid #C9943A;">
      <div style="font-weight:600;font-size:13px;margin-bottom:8px;">Project Budget Summary</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
        <div><div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:1px;">Estimated Budget</div><div style="font-size:18px;font-weight:600;color:#C9943A;">${C} ${Math.round(budget).toLocaleString()}</div></div>
        <div><div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:1px;">Total Spent</div><div style="font-size:18px;font-weight:600;color:#333;">${C} ${Math.round(total).toLocaleString()}</div></div>
        <div><div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:1px;">Remaining</div><div style="font-size:18px;font-weight:600;color:${total>budget?"#C4622D":"#1D9E75"};">${C} ${Math.round(Math.max(0,budget-total)).toLocaleString()}</div></div>
      </div>
    </div>` : ""}

    <div style="margin-bottom:1.5rem;">
      <div style="font-weight:600;margin-bottom:10px;font-size:13px;">Summary by Category</div>
      <table class="rtable">
        <thead><tr><th>Category</th><th>Transactions</th><th style="text-align:right;">Amount (${C})</th><th style="text-align:right;">% of Total</th></tr></thead>
        <tbody>${Object.entries(byCat).sort((a,b)=>b[1].amt-a[1].amt).map(([cat,v])=>`<tr>
          <td>${cat}</td><td>${v.count}</td>
          <td style="text-align:right;">${v.amt.toLocaleString()}</td>
          <td style="text-align:right;">${total?Math.round(v.amt/total*100):0}%</td>
        </tr>`).join("")}</tbody>
      </table>
    </div>

    <div style="margin-bottom:1.5rem;">
      <div style="font-weight:600;margin-bottom:10px;font-size:13px;">All Transactions</div>
      <table class="rtable">
        <thead><tr><th>Date</th>${projKey==="all"?"<th>Project</th>":""}<th>Description</th><th>Category</th><th>Notes</th><th style="text-align:right;">${C}</th></tr></thead>
        <tbody>${sorted.map(e=>`<tr>
          <td>${e.date||""}</td>
          ${projKey==="all"?`<td style="font-size:11px;color:#888;">${e.projectName||"—"}</td>`:""}
          <td>${e.desc||""}</td><td>${e.cat||""}</td>
          <td style="color:#888;font-size:12px;">${e.notes||"—"}</td>
          <td style="text-align:right;font-weight:500;">${Number(e.amt||0).toLocaleString()}</td>
        </tr>`).join("") || `<tr><td colspan="6" style="text-align:center;color:#aaa;padding:16px;">No expenses recorded.</td></tr>`}
        </tbody>
      </table>
    </div>

    <div class="report-summary">
      ${[
        {l:"Total expenditure",  v:C+" "+total.toLocaleString()},
        {l:"Transactions",       v:all.length},
        {l:"Categories",         v:Object.keys(byCat).length},
        {l:"Report date",        v:now},
      ].map(m=>`<div class="rmetric"><div style="font-size:10px;color:#888;margin-bottom:4px;text-transform:uppercase;letter-spacing:.8px;">${m.l}</div><div style="font-size:15px;font-weight:600;">${m.v}</div></div>`).join("")}
    </div>
    <div style="margin-top:2rem;padding-top:1rem;border-top:1px solid #eee;font-size:11px;color:#aaa;text-align:center;">${CONFIG.APP_NAME} · Building Management System · Confidential</div>`;
}
