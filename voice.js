(function () {
  if (window.InfiVoiceWidgetLoaded) return;
  window.InfiVoiceWidgetLoaded = true;

  const script = document.currentScript;

  // ✅ Read config
  const backend = script?.getAttribute("data-backend");
  const kbId = script?.getAttribute("data-knowledge-base-id");

  if (!backend || !kbId) {
    console.error("❌ InfiVoice: Missing backend or knowledge base ID");
    return;
  }

  // ✅ Create container (avoid duplicate)
  let container = document.getElementById("infi-voice-root");
  if (!container) {
    container = document.createElement("div");
    container.id = "infi-voice-root";
    document.body.appendChild(container);
  }

  // ✅ Load CSS (only once)
  if (!document.getElementById("infi-voice-css")) {
    const link = document.createElement("link");
    link.id = "infi-voice-css";
    link.rel = "stylesheet";
    link.href = "https://voice-widget-two.vercel.app/voice-bot.css";
    document.head.appendChild(link);
  }

  // ✅ Load main JS bundle
  const appScript = document.createElement("script");
  appScript.src = "https://voice-widget-two.vercel.app/infi-voice-bot.js";
  appScript.async = true;

  appScript.onload = () => {
    let tries = 0;
    const maxTries = 20;

    const waitForWidget = () => {
      if (window.InfiVoiceWidget && typeof window.InfiVoiceWidget.init === "function") {
        window.InfiVoiceWidget.init({
          backend,
          kbId,
          containerId: "infi-voice-root",
        });
      } else if (tries < maxTries) {
        tries++;
        setTimeout(waitForWidget, 100);
      } else {
        console.error("❌ InfiVoice: Widget failed to initialize");
      }
    };

    waitForWidget();
  };

  appScript.onerror = () => {
    console.error("❌ InfiVoice: Failed to load main script");
  };

  document.body.appendChild(appScript);
})();