// ═══════════════════════════════════════════════════════
//  ConstructIQ — Configuration
//  Your Firebase config is already filled in below.
//  Only change ANTHROPIC_API_KEY.
// ═══════════════════════════════════════════════════════

const CONFIG = {

  // ── Anthropic Claude AI ──────────────────────────────
  // Get your key at: https://console.anthropic.com/
  ANTHROPIC_API_KEY : "sk-ant-REPLACE_WITH_YOUR_KEY",
  MODEL             : "claude-sonnet-4-20250514",
  MAX_TOKENS        : 1000,

  // ── Firebase (your project) ──────────────────────────
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
