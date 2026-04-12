// ═══════════════════════════════════════════════════════
//  ConstructIQ — Firebase Firestore Module
//  Uses Firestore (not Realtime DB) because your project
//  uses the standard Firebase setup without databaseURL.
// ═══════════════════════════════════════════════════════

let db        = null;
let SESSION   = null;   // per-browser session key

// ── Init (called once from app.js) ──────────────────────
function initFirebase() {
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(CONFIG.FIREBASE);
    }
    db = firebase.firestore();

    // Stable session key stored in localStorage
    SESSION = localStorage.getItem("ciq_session");
    if (!SESSION) {
      SESSION = "s_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
      localStorage.setItem("ciq_session", SESSION);
    }

    showStatus("Firebase connected ✓", "success");
    console.log("Firestore ready | session:", SESSION);
  } catch (e) {
    showStatus("Firebase init failed — check config.js", "error");
    console.error("Firebase init error:", e);
  }
}

// ── Status toast ─────────────────────────────────────────
function showStatus(msg, type = "info") {
  const bar = document.getElementById("status-bar");
  if (!bar) return;
  bar.textContent = msg;
  bar.style.display = "block";
  bar.style.background = type === "success" ? "#E1F5EE"
                       : type === "error"   ? "#FAECE7"
                                            : "#FAEEDA";
  bar.style.color      = type === "success" ? "#0F6E56"
                       : type === "error"   ? "#D85A30"
                                            : "#BA7517";
  clearTimeout(bar._t);
  bar._t = setTimeout(() => { bar.style.display = "none"; }, 3500);
}

// ── Collection helper ────────────────────────────────────
function col(name) {
  // All data lives under sessions/{SESSION}/{name}
  return db.collection("sessions").doc(SESSION).collection(name);
}

// ── CRUD helpers ─────────────────────────────────────────

// Add a new document, return its auto-generated id
async function dbAdd(colName, data) {
  const ref = await col(colName).add({ ...data, _ts: Date.now() });
  return ref.id;
}

// Delete a document by id
async function dbDelete(colName, id) {
  await col(colName).doc(id).delete();
}

// Listen for real-time updates on a collection
// callback receives an object { id: docData, ... }
function dbListen(colName, callback) {
  return col(colName).onSnapshot(snap => {
    const result = {};
    snap.forEach(doc => { result[doc.id] = doc.data(); });
    callback(result);
  }, err => {
    console.error("Firestore listen error:", err);
    showStatus("Database error — see console", "error");
  });
}

// Helper: get all project names as map for dropdowns
function getProjectsMap() {
  return _projects || {};
}
