(function () {
  if (window.InfiVoiceWidgetLoaded) return;
  window.InfiVoiceWidgetLoaded = true;

  const script = document.currentScript;

  const backend = script?.getAttribute("data-backend");
  const kbId = script?.getAttribute("data-knowledge-base-id");

  // Create host
  const host = document.createElement("div");
  host.id = "infi-voice-host";
  document.body.appendChild(host);

  // ✅ Shadow DOM
  const shadow = host.attachShadow({ mode: "open" });

  const container = document.createElement("div");
  container.id = "infi-voice-root";
  shadow.appendChild(container);

  // ✅ Inject CSS inside shadow
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://voice-widget-two.vercel.app/voice-bot.css";
  shadow.appendChild(link);

  // Load JS
  const appScript = document.createElement("script");
  appScript.src = "https://voice-widget-two.vercel.app/infi-voice-bot.js";

  appScript.onload = () => {
    let tries = 0;

    const wait = () => {
      if (window.InfiVoiceWidget) {
        window.InfiVoiceWidget.init({
          backend,
          kbId,
          containerId: "infi-voice-root",
        });
      } else if (tries < 20) {
        tries++;
        setTimeout(wait, 100);
      } else {
        console.error("❌ Widget failed to initialize");
      }
    };

    wait();
  };

  document.body.appendChild(appScript);
})();