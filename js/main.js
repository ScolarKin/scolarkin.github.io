// Menu mobile
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("is-open"));
  });
}

// Header qui se masque au scroll vers le bas, réapparaît au scroll vers le haut
const siteHeader = document.querySelector(".site-header");
if (siteHeader) {
  let lastScrollY = window.scrollY;
  let ticking = false;
  const HIDE_THRESHOLD = 80;

  const updateHeader = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY <= HIDE_THRESHOLD) {
      siteHeader.classList.remove("header-hidden");
    } else if (currentScrollY > lastScrollY) {
      siteHeader.classList.add("header-hidden");
      if (navLinks) navLinks.classList.remove("is-open");
    } else {
      siteHeader.classList.remove("header-hidden");
    }
    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
}

// Formulaire de démonstration (accueil)
const demoForm = document.getElementById("demo-form");
if (demoForm) {
  demoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Merci ! Ce formulaire est une démonstration : le site n'est pas encore connecté à un serveur.");
  });
}

// Sélecteur de rôle (Administrateur / Élève / Parent) — préremplit un
// identifiant de démo et détermine vers quel espace le login redirige
const roleTabs = document.querySelectorAll(".role-tab");
const loginForm = document.getElementById("login-form");
if (roleTabs.length && loginForm) {
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");
  const roleHintId = document.getElementById("role-hint-id");

  roleTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      roleTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      loginForm.dataset.target = tab.dataset.target;
      emailField.value = tab.dataset.id;
      passwordField.value = tab.dataset.pass;
      if (roleHintId) roleHintId.textContent = tab.dataset.id;
    });
  });
}

// Formulaire de connexion (démonstration) — une fois "connecté", direction
// le tableau de bord correspondant au rôle sélectionné
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = loginForm.dataset.target || "admin/index.html";
  });
}

// Bascule de période sur la tarification (trimestriel / semestriel / annuel)
// — variation raisonnable : plus l'abonnement est long, plus le prix par
// élève est légèrement inférieur
const periodTabs = document.querySelectorAll(".period-tab");
if (periodTabs.length) {
  // Coûts annualisés cohérents : trimestriel (x3/an) > semestriel (x2/an) > annuel (x1/an)
  const PRICES = {
    trimestre: { petite: "9,99", moyenne: "14,99", grande: "19,99" },
    semestre: { petite: "14,49", moyenne: "21,99", grande: "28,99" },
    an: { petite: "27,99", moyenne: "41,99", grande: "55,99" },
  };
  const LABELS = { trimestre: "trimestre", semestre: "semestre", an: "an" };

  periodTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      periodTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const period = tab.dataset.period;
      document.querySelectorAll(".price-amount[data-tier]").forEach((el) => {
        const tier = el.dataset.tier;
        el.classList.remove("price-anim");
        void el.offsetWidth; // relance l'animation
        el.innerHTML = `${PRICES[period][tier]} $ <small>/ élève / ${LABELS[period]}</small>`;
        el.classList.add("price-anim");
      });
    });
  });
}

// Apparition au scroll : glissement depuis la gauche, éléments d'un même
// groupe espacés d'1 seconde les uns des autres
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      const nowVisible = entries.filter((entry) => entry.isIntersecting);
      nowVisible.forEach((entry, index) => {
        entry.target.style.transitionDelay = `${index * 1}s`;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}
