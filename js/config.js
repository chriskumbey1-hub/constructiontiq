// ═══════════════════════════════════════════════════════
//  ConstructIQ — Configuration
//
//  AFTER deploying the Cloudflare Worker:
//  Replace AI_PROXY_URL with your worker URL.
//  You do NOT put your API key here anymore — it lives
//  safely inside the Cloudflare Worker environment variable.
// ═══════════════════════════════════════════════════════

const CONFIG = {

  // ── AI Proxy URL ─────────────────────────────────────
  // Paste your Cloudflare Worker URL here, e.g.:
  // "https://constructiq-ai.yourname.workers.dev"
  AI_PROXY_URL : "https://constructiq-ai.chriskumbey1.workers.dev/",

  MODEL      : "claude-sonnet-4-20250514",
  MAX_TOKENS : 1000,

  // ── Firebase (your project — already filled in) ──────
  FIREBASE: {
    apiKey            : "AIzaSyAmJyvXMb1xjt4UBUgYtND5n1ZjIZprYK8",
    authDomain        : "constructiq-3fd35.firebaseapp.com",
    projectId         : "constructiq-3fd35",
    storageBucket     : "constructiq-3fd35.firebasestorage.app",
    messagingSenderId : "768700462672",
    appId             : "1:768700462672:web:7b31dc999855a952014355",
    measurementId     : "G-5346Z3NT4K"
  },

  // ── App Settings ─────────────────────────────────────
  APP_NAME : "ConstructIQ",
  CURRENCY : "GH₵",
  COUNTRY  : "Ghana"
};
