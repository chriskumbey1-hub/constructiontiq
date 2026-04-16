let db = null;
let SESSION = null;

function initFirebase() {
  try {
    if (!firebase.apps.length) firebase.initializeApp(CONFIG.FIREBASE);
    db = firebase.firestore();
    SESSION = localStorage.getItem("ciq_session");
    if (!SESSION) {
      SESSION = "s_" + Date.now() + "_" + Math.random().toString(36).slice(2,7);
      localStorage.setItem("ciq_session", SESSION);
    }
    showStatus("Firebase connected ✓", "success");
  } catch(e) {
    showStatus("Firebase init failed — check config.js", "error");
    console.error(e);
  }
}

function showStatus(msg, type="info") {
  const bar = document.getElementById("status-bar");
  if (!bar) return;
  bar.textContent = msg;
  bar.style.display = "block";
  bar.style.background = type==="success"?"#E1F5EE":type==="error"?"#FAECE7":"#FAEEDA";
  bar.style.color      = type==="success"?"#0F6E56":type==="error"?"#D85A30":"#BA7517";
  clearTimeout(bar._t);
  bar._t = setTimeout(()=>{bar.style.display="none";}, 3500);
}

function col(name) { return db.collection("sessions").doc(SESSION).collection(name); }

async function dbAdd(colName, data) {
  const ref = await col(colName).add({...data, _ts: Date.now()});
  return ref.id;
}
async function dbSet(colName, id, data) {
  await col(colName).doc(id).set({...data, _ts: Date.now()});
}
async function dbUpdate(colName, id, data) {
  await col(colName).doc(id).update(data);
}
async function dbDelete(colName, id) {
  await col(colName).doc(id).delete();
}
function dbListen(colName, callback) {
  return col(colName).onSnapshot(snap => {
    const result = {};
    snap.forEach(doc => { result[doc.id] = doc.data(); });
    callback(result);
  }, err => {
    console.error("Firestore error:", err);
    showStatus("Database error", "error");
  });
}
