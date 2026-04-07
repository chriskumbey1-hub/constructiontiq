# ConstructIQ — Building Management System

Hosted on **GitHub Pages** · Database on **Firebase Firestore**

---

## Files

```
constructiq/
├── index.html        ← main app (one file)
├── style.css         ← all styles
├── js/
│   ├── config.js     ← ⚠ ADD YOUR ANTHROPIC KEY HERE
│   ├── firebase-db.js
│   ├── ai.js
│   ├── plans.js
│   ├── estimator.js
│   ├── expenses.js
│   ├── report.js
│   ├── paint.js
│   └── app.js
└── README.md
```

---

## Setup — 3 steps

### 1. Add your Anthropic API key

Open `js/config.js` and replace:
```
ANTHROPIC_API_KEY: "sk-ant-REPLACE_WITH_YOUR_KEY"
```
Get your key at https://console.anthropic.com/

Your Firebase config is already filled in.

---

### 2. Enable Firestore in Firebase Console

1. Go to https://console.firebase.google.com
2. Open project **constructiq-3fd35**
3. Left sidebar → **Build → Firestore Database**
4. Click **Create database**
5. Choose **Start in test mode** → pick a region → Done

That's it — no extra code needed.

---

### 3. Publish on GitHub Pages

```bash
# In this folder:
git init
git add .
git commit -m "Initial ConstructIQ commit"

# Create a repo on github.com (name it anything, e.g. constructiq)
git remote add origin https://github.com/YOUR_USERNAME/constructiq.git
git branch -M main
git push -u origin main
```

Then in GitHub:
- Go to your repo → **Settings** → **Pages**
- Source: **Deploy from a branch**
- Branch: **main** / **(root)**
- Click **Save**

Your app will be live at:
`https://YOUR_USERNAME.github.io/constructiq/`

---

## Notes

- Expenses and saved palettes are stored in Firestore under a per-browser session key
- The same browser on different devices will have different sessions (add Firebase Auth later for cross-device login)
- AI features require the Anthropic API key in config.js
