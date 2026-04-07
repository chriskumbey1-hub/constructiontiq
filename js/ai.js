// ═══════════════════════════════════════════════════════
//  ConstructIQ — Claude AI Helper
// ═══════════════════════════════════════════════════════

async function askClaude(prompt, targetEl, placeholder) {
  if (targetEl) targetEl.textContent = placeholder || "Thinking…";

  if (!CONFIG.ANTHROPIC_API_KEY || CONFIG.ANTHROPIC_API_KEY.startsWith("sk-ant-REPLACE")) {
    const msg = "⚠ Add your Anthropic API key in js/config.js to enable AI features.";
    if (targetEl) targetEl.textContent = msg;
    return msg;
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method  : "POST",
      headers : { "Content-Type": "application/json" },
      body    : JSON.stringify({
        model      : CONFIG.MODEL,
        max_tokens : CONFIG.MAX_TOKENS,
        messages   : [{ role: "user", content: prompt }]
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || "No response.";
    if (targetEl) targetEl.textContent = text;
    return text;
  } catch (e) {
    const msg = "AI unavailable — check your API key and browser CORS settings.";
    if (targetEl) targetEl.textContent = msg;
    console.error("Claude API error:", e);
    return msg;
  }
}
