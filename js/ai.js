// ═══════════════════════════════════════════════════════
//  ConstructIQ — AI Helper
//  Calls your Cloudflare Worker proxy (not Anthropic
//  directly) so CORS is never an issue from GitHub Pages.
// ═══════════════════════════════════════════════════════

async function askClaude(prompt, targetEl, placeholder) {
  if (targetEl) targetEl.textContent = placeholder || "Thinking…";

  // Check proxy URL is configured
  if (!CONFIG.AI_PROXY_URL || CONFIG.AI_PROXY_URL.includes("YOUR_WORKER")) {
    const msg = "⚠ AI not configured yet. See README — deploy the Cloudflare Worker and paste its URL into js/config.js";
    if (targetEl) targetEl.textContent = msg;
    return msg;
  }

  try {
    const res = await fetch(CONFIG.AI_PROXY_URL, {
      method  : "POST",
      headers : { "Content-Type": "application/json" },
      body    : JSON.stringify({
        model      : CONFIG.MODEL,
        max_tokens : CONFIG.MAX_TOKENS,
        messages   : [{ role: "user", content: prompt }]
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();

    // Handle Anthropic error responses
    if (data.error) {
      throw new Error(data.error.message || "Anthropic API error");
    }

    const text = data.content?.[0]?.text || "No response received.";
    if (targetEl) targetEl.textContent = text;
    return text;

  } catch (e) {
    console.error("AI proxy error:", e);
    const msg = `AI error: ${e.message}. Check your Cloudflare Worker is deployed and the URL in config.js is correct.`;
    if (targetEl) targetEl.textContent = msg;
    return msg;
  }
}
