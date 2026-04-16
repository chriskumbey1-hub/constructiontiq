// ConstructIQ v5 — App Controller

window.addEventListener("scroll",()=>{
  document.getElementById("navbar")?.classList.toggle("scrolled",window.scrollY>60);
});

function switchTab(id,btn){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));
  const page=document.getElementById("page-"+id);
  if(page)page.classList.add("active");
  const ab=btn||document.querySelector(`.nav-btn[data-tab="${id}"]`);
  if(ab)ab.classList.add("active");
  document.getElementById("nav-links").classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
  if(id==="estimator"){setTimeout(calcCost,80);}
  if(id==="expenses"){renderExpenseTable();renderExpMetrics();setTimeout(renderExpChart,80);}
  if(id==="projects"){renderProjectsGrid();}
  if(id==="report"){renderReportProjectTabs();renderReport();}
  if(id==="paint"){filterPins();setTimeout(()=>{drawVizRoom();renderVizInfo();},80);}
  if(id==="upload"){initUpload();}
}

function switchPaintTab(id,btn){
  document.querySelectorAll(".ppanel").forEach(p=>p.classList.remove("active"));
  document.querySelectorAll(".ptab").forEach(b=>b.classList.remove("active"));
  const panel=document.getElementById("paint-"+id);
  if(panel)panel.classList.add("active");
  if(btn)btn.classList.add("active");
  if(id==="visualizer")setTimeout(()=>{drawVizRoom();renderVizInfo();},60);
  if(id==="matcher")runMatcher();
  if(id==="saved")renderSavedPalettes();
}

function toggleMenu(){
  document.getElementById("nav-links").classList.toggle("open");
}

function initApp(){
  initFirebase();
  const d=document.getElementById("exp-date");
  if(d)d.value=new Date().toISOString().split("T")[0];
  populateExpCategories();
  renderPlans();
  buildPaintTags();
  filterPins();
  buildVisualizerControls();
  setTimeout(()=>{drawVizRoom();renderVizInfo();},300);
  runMatcher();
  initExpenses();
  initProjects();
  initPaint();
  initUpload();
}

document.addEventListener("DOMContentLoaded",initApp);
