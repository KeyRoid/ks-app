(function () {
  var storageKey = "ksAppLanguage";
  var defaultLanguage = "en";
  var allowedLanguages = ["en", "jp"];

  function getStoredLanguage() {
    try {
      var storedLanguage = window.localStorage.getItem(storageKey);
      return allowedLanguages.indexOf(storedLanguage) === -1
        ? defaultLanguage
        : storedLanguage;
    } catch (error) {
      return defaultLanguage;
    }
  }

  function saveLanguage(language) {
    try {
      window.localStorage.setItem(storageKey, language);
    } catch (error) {
      // localStorage may be unavailable in private or restricted browsing modes.
    }
  }

  function applyLanguage(language) {
    var nextLanguage =
      allowedLanguages.indexOf(language) === -1 ? defaultLanguage : language;
    document.documentElement.lang = nextLanguage === "jp" ? "ja" : "en";
    document.body.dataset.language = nextLanguage;

    document
      .querySelectorAll("[data-language-option]")
      .forEach(function (button) {
        var isSelected = button.dataset.languageOption === nextLanguage;
        button.setAttribute("aria-pressed", String(isSelected));
      });
  }

  function bindLanguageSwitch() {
    document
      .querySelectorAll("[data-language-option]")
      .forEach(function (button) {
        button.addEventListener("click", function () {
          var selectedLanguage = button.dataset.languageOption || defaultLanguage;
          applyLanguage(selectedLanguage);
          saveLanguage(selectedLanguage);
        });
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLanguage(getStoredLanguage());
    bindLanguageSwitch();
  });
})();
