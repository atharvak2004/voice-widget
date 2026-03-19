(function () {
  const script = document.currentScript;

  const backend = script.getAttribute("data-backend");
  const kbId = script.getAttribute("data-knowledge-base-id");

  // Create container
  const container = document.createElement("div");
  container.id = "infi-voice-root";
  document.body.appendChild(container);

  // ✅ Load CSS
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://voice-widget-two.vercel.app/voice-bot.css";
  document.head.appendChild(link);

  // ✅ Load main JS bundle
  const appScript = document.createElement("script");
  appScript.src = "https://voice-widget-two.vercel.app/infi-voice-bot.js";

  appScript.onload = () => {
    if (window.InfiVoiceWidget) {
      window.InfiVoiceWidget.init({
        backend,
        kbId,
        containerId: "infi-voice-root",
      });
    } else {
      console.error("Widget not loaded properly");
    }
  };

  document.body.appendChild(appScript);
})();