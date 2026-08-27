(() => {
  const root = document.documentElement;
  const buttons = document.querySelectorAll("[data-language-button]");
  const supported = new Set(["zh", "en"]);

  function setLanguage(language, persist = true) {
    const next = supported.has(language) ? language : "zh";
    root.dataset.language = next;
    root.lang = next === "zh" ? "zh-CN" : "en";
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.languageButton === next));
    });

    if (persist) {
      try {
        window.localStorage.setItem("dawnnav-language", next);
      } catch {
        // The page still works when browser storage is unavailable.
      }
    }
  }

  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  let storedLanguage = "";
  try {
    storedLanguage = window.localStorage.getItem("dawnnav-language") || "";
  } catch {
    // Use the default language when browser storage is unavailable.
  }

  const initialLanguage = supported.has(queryLanguage)
    ? queryLanguage
    : storedLanguage === "zh" ? "zh" : storedLanguage ? "en" : "zh";

  setLanguage(initialLanguage, false);
  buttons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.languageButton));
  });
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
