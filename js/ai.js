async function askClaude(prompt, targetEl, placeholder) {
  if (targetEl) targetEl.innerHTML = `<span style="color:var(--tm);font-style:italic;">${placeholder||"Thinking…"}</span>`;
  if (!CONFIG.AI_PROXY_URL || CONFIG.AI_PROXY_URL.includes("YOUR_WORKER")) {
    const msg = "⚠ Set AI_PROXY_URL in js/config.js to enable AI features.";
    if (targetEl) targetEl.textContent = msg;
    return msg;
  }
  try {
    const res = await fetch(CONFIG.AI_PROXY_URL, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ messages:[{role:"user", content:prompt}] })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error.message||"API error");
    const text = data.content?.[0]?.text || "No response.";
    if (targetEl) targetEl.textContent = text;
    return text;
  } catch(e) {
    const msg = `AI error: ${e.message}`;
    if (targetEl) targetEl.textContent = msg;
    return msg;
  }
}

/* Plan-image AI analysis — sends base64 image to Claude */
async function askClaudeWithImage(prompt, base64Data, mediaType, targetEl) {
  if (targetEl) targetEl.innerHTML = `<span style="color:var(--tm);font-style:italic;">Analysing your plan…</span>`;
  if (!CONFIG.AI_PROXY_URL || CONFIG.AI_PROXY_URL.includes("YOUR_WORKER")) {
    const msg = "⚠ Set AI_PROXY_URL in js/config.js to enable AI features.";
    if (targetEl) targetEl.textContent = msg; return msg;
  }
  try {
    const res = await fetch(CONFIG.AI_PROXY_URL, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        messages:[{
          role:"user",
          content:[
            { type:"image", source:{ type:"base64", media_type:mediaType, data:base64Data } },
            { type:"text",  text: prompt }
          ]
        }]
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error.message||"API error");
    const text = data.content?.[0]?.text || "No response.";
    if (targetEl) targetEl.textContent = text;
    return text;
  } catch(e) {
    const msg = `AI error: ${e.message}`;
    if (targetEl) targetEl.textContent = msg; return msg;
  }
}
