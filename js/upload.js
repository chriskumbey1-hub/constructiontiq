// ConstructIQ v5 — Plan Upload + AI Analysis

let _uploadedPlanData = null; // base64 of uploaded image
let _uploadedPlanType = null; // media_type

function initUpload() {
  const dropzone = document.getElementById("plan-dropzone");
  const fileInput = document.getElementById("plan-file-input");
  if (!dropzone || !fileInput) return;

  dropzone.addEventListener("click", () => fileInput.click());
  dropzone.addEventListener("dragover", e => { e.preventDefault(); dropzone.classList.add("drag-over"); });
  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("drag-over"));
  dropzone.addEventListener("drop", e => {
    e.preventDefault();
    dropzone.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    if (file) handlePlanFile(file);
  });
  fileInput.addEventListener("change", () => {
    if (fileInput.files[0]) handlePlanFile(fileInput.files[0]);
  });
}

function handlePlanFile(file) {
  const allowed = ["image/jpeg","image/jpg","image/png","image/webp","application/pdf"];
  if (!allowed.includes(file.type)) {
    alert("Please upload a JPG, PNG, WebP image or PDF of your building plan.");
    return;
  }
  // PDFs — we can only send images to Claude Vision, show message
  if (file.type === "application/pdf") {
    showUploadError("PDF detected. For AI analysis, please convert your PDF plan to a JPG or PNG image and re-upload.");
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;
    const base64  = dataUrl.split(",")[1];
    _uploadedPlanData = base64;
    _uploadedPlanType = file.type;
    showUploadPreview(dataUrl, file.name);
  };
  reader.readAsDataURL(file);
}

function showUploadPreview(dataUrl, filename) {
  const preview = document.getElementById("plan-preview");
  const dropzone = document.getElementById("plan-dropzone");
  if (preview) {
    preview.innerHTML = `
      <div class="upload-preview-wrap">
        <img src="${dataUrl}" alt="Uploaded plan" class="uploaded-plan-img"/>
        <div class="upload-preview-info">
          <div class="upload-file-name">📎 ${filename}</div>
          <div class="upload-file-hint">Plan uploaded successfully. Use the tools below.</div>
        </div>
        <button class="btn-danger" onclick="clearUpload()">✕ Remove</button>
      </div>`;
    preview.style.display = "block";
  }
  if (dropzone) dropzone.style.display = "none";
  document.getElementById("upload-tools").style.display = "block";
  document.getElementById("upload-ai-result").textContent = "Click an action below to analyse your plan…";
}

function clearUpload() {
  _uploadedPlanData = null;
  _uploadedPlanType = null;
  const preview = document.getElementById("plan-preview");
  const dropzone = document.getElementById("plan-dropzone");
  if (preview) { preview.innerHTML=""; preview.style.display="none"; }
  if (dropzone) dropzone.style.display = "flex";
  document.getElementById("upload-tools").style.display = "none";
  document.getElementById("plan-file-input").value = "";
}

function showUploadError(msg) {
  const errEl = document.getElementById("upload-error");
  if (errEl) { errEl.textContent = msg; errEl.style.display = "block"; }
  setTimeout(()=>{ if(errEl) errEl.style.display="none"; }, 6000);
}

async function analyseUploadedPlan(mode) {
  if (!_uploadedPlanData) { alert("Please upload a plan image first."); return; }
  const resultEl = document.getElementById("upload-ai-result");

  const prompts = {
    describe: `You are a professional architect in Ghana. Look at this building plan or architectural drawing carefully. Provide: (1) The type of building shown, (2) Approximate number of rooms and key spaces you can identify, (3) Estimated floor area if dimensions are visible, (4) Key architectural features, (5) Any observations about the design quality or practicality for the Ghanaian climate. Be specific and professional. Max 200 words.`,
    estimate: `You are a professional quantity surveyor in Ghana. Examine this building plan carefully. Based on what you can see — floor area, number of rooms, storeys, complexity — provide: (1) Your estimated floor area in m², (2) Estimated construction cost range in Ghana Cedis (GH₵) at current 2025 rates, (3) Cost breakdown by major category (foundation, structure, MEP, finishing, labour), (4) Key cost drivers you can identify from the plan, (5) Recommended finishing quality and why. Be specific with numbers. Max 200 words.`,
    paint: `You are a professional interior designer and paint consultant in Ghana. Look at this building plan or any interior/exterior images carefully. Recommend: (1) An exterior colour palette suited to this building type and Ghana's climate, (2) Interior colour schemes for the main living spaces, (3) Specific paint finish types for different surfaces (emulsion, gloss, etc.), (4) Two or three Dulux or Nippon paint codes that would work well. Consider Ghana's intense sunlight and humidity. Professional, specific, and practical. Max 200 words.`,
    improve: `You are a senior architect in Ghana reviewing a building plan submitted by a client. Look at this plan carefully and provide: (1) 3 specific design improvements that would make the building more suitable for Ghana's climate, (2) 2 structural considerations worth discussing with the engineer, (3) Any space planning improvements you would recommend, (4) Estimated cost impact of your suggested changes. Be constructive, professional, and specific to Ghanaian conditions. Max 200 words.`,
  };

  const prompt = prompts[mode];
  if (!prompt) return;

  const btnLabels = {
    describe:"Analysing plan layout…",
    estimate:"Running cost estimate…",
    paint:"Generating colour advice…",
    improve:"Reviewing for improvements…"
  };

  await askClaudeWithImage(prompt, _uploadedPlanData, _uploadedPlanType, resultEl);
}

async function addUploadToEstimator() {
  if (!_uploadedPlanData) { alert("Please upload a plan first."); return; }
  const resultEl = document.getElementById("upload-ai-result");
  const prompt = `You are a quantity surveyor in Ghana. From this building plan, extract the key parameters needed for cost estimation. Respond ONLY with a JSON object (no markdown, no preamble) with these exact keys: {"type":"bungalow|storey2|storey3|mansion|commercial","area":120,"beds":3,"baths":2,"floors":1,"quality":"standard"} — choose the closest values based on what you can see in the plan. If you cannot determine a value, use these defaults: type=bungalow, area=120, beds=3, baths=2, floors=1, quality=standard.`;

  resultEl.innerHTML = `<span style="color:var(--tm);font-style:italic;">Extracting parameters from your plan…</span>`;

  try {
    const raw = await askClaudeWithImage(prompt, _uploadedPlanData, _uploadedPlanType, null);
    // Parse JSON from response
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const params = JSON.parse(jsonMatch[0]);
      if (params.type)    document.getElementById("est-type").value    = params.type;
      if (params.area)    document.getElementById("est-area").value    = params.area;
      if (params.beds>=0) document.getElementById("est-beds").value    = params.beds;
      if (params.baths)   document.getElementById("est-baths").value   = params.baths;
      if (params.floors)  document.getElementById("est-floors").value  = params.floors;
      if (params.quality) document.getElementById("est-quality").value = params.quality;

      switchTab("estimator", document.querySelector('[data-tab="estimator"]'));
      setTimeout(calcCost, 100);
      showStatus("Plan parameters extracted — review and save as project ✓", "success");
    } else {
      resultEl.textContent = "Could not extract parameters automatically. Please enter them manually in the Estimator tab.";
    }
  } catch(e) {
    resultEl.textContent = `Error: ${e.message}`;
  }
}
