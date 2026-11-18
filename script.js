
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

/* ==========================================
   CONTACT FORM VALIDATION
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contact-form");

  if (!form) return;

  const nameInput =
    document.getElementById("contact-name");

  const emailInput =
    document.getElementById("contact-email");

  const messageInput =
    document.getElementById("contact-message");

  const status =
    document.getElementById("form-status");


  function currentLanguage() {
    return document.documentElement.lang === "en"
      ? "en"
      : "tr";
  }


  function showError(input, errorId, tr, en) {

    const errorElement =
      document.getElementById(errorId);

    input.setAttribute("aria-invalid", "true");

    errorElement.textContent =
      currentLanguage() === "en" ? en : tr;

    return false;
  }


  function clearError(input, errorId) {

    input.removeAttribute("aria-invalid");

    document.getElementById(errorId).textContent = "";
  }


  function validateName() {

    const value = nameInput.value.trim();

    if (value.length < 2) {
      return showError(
        nameInput,
        "name-error",
        "Lütfen en az 2 karakterlik bir ad girin.",
        "Please enter a name with at least 2 characters."
      );
    }

    clearError(nameInput, "name-error");
    return true;
  }


  function validateEmail() {

    const value = emailInput.value.trim();

    if (!emailInput.validity.valid ||
        !value.includes("@")) {

      return showError(
        emailInput,
        "email-error",
        "Lütfen geçerli bir e-posta adresi girin.",
        "Please enter a valid email address."
      );
    }

    clearError(emailInput, "email-error");
    return true;
  }


  function validateMessage() {

    const value = messageInput.value.trim();

    if (value.length < 10) {

      return showError(
        messageInput,
        "message-error",
        "Mesajınız en az 10 karakter olmalıdır.",
        "Your message must contain at least 10 characters."
      );
    }

    clearError(messageInput, "message-error");
    return true;
  }


  // Form gonderim denemesini yakala
  form.addEventListener("submit", function (event) {

    // Sayfa yenilenmesini ve gercek gonderimi engelle
    event.preventDefault();

    const validName = validateName();
    const validEmail = validateEmail();
    const validMessage = validateMessage();

    if (validName && validEmail && validMessage) {

      status.textContent =
        currentLanguage() === "en"
          ? "Validation successful! This is a demo; your message was not sent."
          : "Doğrulama başarılı! Bu bir demodur; mesajınız gönderilmedi.";

    } else {

      status.textContent =
        currentLanguage() === "en"
          ? "Please correct the highlighted fields."
          : "Lütfen hatalı alanları düzeltin.";

      const firstInvalid =
        form.querySelector('[aria-invalid="true"]');

      if (firstInvalid) {
        firstInvalid.focus();
      }
    }

  });


  // Kullanici alanlari duzelttiginde hatalari kontrol et
  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  messageInput.addEventListener("blur", validateMessage);


  // Form degistiginde eski durum mesajini temizle
  form.addEventListener("input", function () {
    status.textContent = "";
  });

});
