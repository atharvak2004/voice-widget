(function () {
  if (window.InfiVoiceWidgetLoaded) return;
  window.InfiVoiceWidgetLoaded = true;

  const script = document.currentScript;

  console.log("🚀 [voice.js] Script started");

  const backend = script?.getAttribute("data-backend");
  const kbId = script?.getAttribute("data-knowledge-base-id");

  console.log("⚙️ [voice.js] Config:", { backend, kbId });

  if (!backend || !kbId) {
    console.error("❌ [voice.js] Missing config");
    return;
  }

  // ✅ Create container
  let container = document.getElementById("infi-voice-root");
  if (!container) {
    container = document.createElement("div");
    container.id = "infi-voice-root";
    document.body.appendChild(container);
  }

  // ✅ Load CSS
  if (!document.getElementById("infi-voice-css")) {
    const link = document.createElement("link");
    link.id = "infi-voice-css";
    link.rel = "stylesheet";
    link.href = "https://voice-widget-two.vercel.app/voice-bot.css";
    document.head.appendChild(link);
  }

  // ✅ CREATE appScript (YOU MISSED THIS)
  const appScript = document.createElement("script");
  appScript.src = "https://voice-widget-two.vercel.app/infi-voice-bot.js";
  appScript.async = true;

  // ✅ ON LOAD
  appScript.onload = () => {
    console.log("📦 [voice.js] Main bundle loaded");

    let tries = 0;

    const wait = () => {
      console.log("⏳ [voice.js] Checking for global...", tries);

      if (window.InfiVoiceWidget) {
        console.log("✅ [voice.js] Global found, initializing...");

        window.InfiVoiceWidget.init({
          backend,
          kbId,
          containerId: "infi-voice-root",
        });
      } else if (tries < 30) {
        tries++;
        setTimeout(wait, 100);
      } else {
        console.error("❌ [voice.js] Widget failed to initialize");
      }
    };

    wait();
  };

  // ❌ ERROR HANDLER (NEW)
  appScript.onerror = () => {
    console.error("❌ [voice.js] Failed to load infi-voice-bot.js");
  };

  document.body.appendChild(appScript);
})();