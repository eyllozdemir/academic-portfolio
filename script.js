
/* ==========================================
   EYLUL SENA - ACADEMIC PORTFOLIO
   JavaScript Interactions
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

  // 1. HTML ELEMENTLERINI SEC

  const languageButton =
    document.getElementById("language-toggle");

  const themeButton =
    document.getElementById("theme-toggle");

  const menuButton =
    document.querySelector(".menu-toggle");

  const navLinks =
    document.getElementById("nav-links");


  // 2. TURKCE / INGILIZCE DIL DEGISTIRME

  function changeLanguage(language) {

    // data-tr ve data-en bulunan metinleri sec
    const elements =
      document.querySelectorAll("[data-tr][data-en]");

    elements.forEach(function (element) {

      const translatedText =
        element.getAttribute("data-" + language);

      if (translatedText !== null) {
        element.textContent = translatedText;
      }

    });

    // HTML sayfasinin dilini guncelle
    document.documentElement.lang = language;

    // Buton sonraki secilebilir dili gostersin
    if (languageButton) {
      languageButton.textContent =
        language === "tr" ? "EN" : "TR";

      languageButton.setAttribute(
        "aria-label",
        language === "tr"
          ? "Switch to English"
          : "Türkçeye geç"
      );
    }

    // Kullanici tercihini kaydet
    localStorage.setItem("portfolioLanguage", language);
  }


  // Kaydedilen dili oku
  let currentLanguage =
    localStorage.getItem("portfolioLanguage") || "tr";

  // Gecersiz degerleri engelle
  if (currentLanguage !== "tr" &&
      currentLanguage !== "en") {
    currentLanguage = "tr";
  }

  changeLanguage(currentLanguage);


  // Dil butonuna tiklandiginda
  if (languageButton) {

    languageButton.addEventListener("click", function () {

      currentLanguage =
        currentLanguage === "tr" ? "en" : "tr";

      changeLanguage(currentLanguage);

    });

  }


  // 3. KARANLIK MOD

  function applyTheme(isDark) {

    document.body.classList.toggle(
      "dark-mode",
      isDark
    );

    if (themeButton) {

      themeButton.textContent = isDark ? "☀" : "☾";

      themeButton.setAttribute(
        "aria-label",
        isDark
          ? "Açık modu etkinleştir"
          : "Karanlık modu etkinleştir"
      );

      themeButton.setAttribute(
        "aria-pressed",
        String(isDark)
      );
    }

    localStorage.setItem(
      "portfolioTheme",
      isDark ? "dark" : "light"
    );
  }


  // Kaydedilen temayi yukle
  const savedTheme =
    localStorage.getItem("portfolioTheme");

  applyTheme(savedTheme === "dark");


  // Tema butonuna tiklandiginda
  if (themeButton) {

    themeButton.addEventListener("click", function () {

      const isDark =
        document.body.classList.contains("dark-mode");

      applyTheme(!isDark);

    });

  }


  // 4. MOBIL MENU

  function closeMenu() {

    if (!menuButton || !navLinks) return;

    navLinks.classList.remove("active");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Menüyü aç"
    );
  }


  if (menuButton && navLinks) {

    menuButton.addEventListener("click", function () {

      const isOpen =
        navLinks.classList.toggle("active");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Menüyü kapat" : "Menüyü aç"
      );

    });


    // Bir menü bağlantisina tiklandiginda kapat
    navLinks.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", closeMenu);

    });


    // Escape tusuna basildiginda menuyu kapat
    document.addEventListener("keydown", function (event) {

      if (event.key === "Escape") {
        closeMenu();
      }

    });

  }

});

/* PROJECT SEARCH AND FILTER */

document.addEventListener("DOMContentLoaded", function () {

  const searchInput =
    document.getElementById("project-search");

  const categoryFilter =
    document.getElementById("project-filter");

  const projectCards =
    document.querySelectorAll(".project-card");

  const feedback =
    document.getElementById("project-feedback");

  if (!searchInput || !categoryFilter) return;

  function filterProjects() {

    const searchTerm =
      searchInput.value.toLocaleLowerCase("tr").trim();

    const selectedCategory =
      categoryFilter.value;

    let visibleCount = 0;

    projectCards.forEach(function (card) {

      const projectText =
        card.textContent.toLocaleLowerCase("tr") + " " +
        (card.dataset.search || "").toLocaleLowerCase("tr");

      const category = card.dataset.category;

      const matchesSearch =
        projectText.includes(searchTerm);

      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

      const showCard =
        matchesSearch && matchesCategory;

      card.hidden = !showCard;

      if (showCard) visibleCount++;
    });

    const language =
      document.documentElement.lang;

    if (feedback) {
      feedback.textContent =
        language === "en"
          ? visibleCount + " project(s) found."
          : visibleCount + " proje bulundu.";
    }
  }

  searchInput.addEventListener("input", filterProjects);

  categoryFilter.addEventListener(
    "change",
    filterProjects
  );

  // Dil degistirildiginde sonucu da guncelle
  const languageButton =
    document.getElementById("language-toggle");

  if (languageButton) {
    languageButton.addEventListener(
      "click",
      filterProjects
    );
  }

  filterProjects();

});
