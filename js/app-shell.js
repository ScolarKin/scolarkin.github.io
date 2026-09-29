// Marque le lien de nav actif selon la page courante
(function highlightActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".admin-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) link.classList.add("active");
  });
})();

// Sidebar mobile
const menuToggle = document.querySelector(".admin-menu-toggle");
const sidebar = document.querySelector(".admin-sidebar");
if (menuToggle && sidebar) {
  menuToggle.addEventListener("click", () => sidebar.classList.toggle("is-open"));
  document.addEventListener("click", (e) => {
    if (sidebar.classList.contains("is-open") && !sidebar.contains(e.target) && e.target !== menuToggle) {
      sidebar.classList.remove("is-open");
    }
  });
}

// Recherche simple dans un tableau (data-search-target pointe vers l'id du tbody)
document.querySelectorAll("[data-table-search]").forEach((input) => {
  const table = document.querySelector(input.dataset.tableSearch);
  if (!table) return;
  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    table.querySelectorAll("tbody tr").forEach((row) => {
      row.style.display = row.textContent.toLowerCase().includes(term) ? "" : "none";
    });
  });
});

// Boutons de présence (Présent / Absent / Retard) — bascule visuelle uniquement
document.querySelectorAll(".presence-toggle").forEach((group) => {
  group.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      group.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });
});

// Boutons d'action décoratifs (ajouter, générer, exporter…) en mode démo
document.querySelectorAll("[data-demo-action]").forEach((btn) => {
  btn.addEventListener("click", () => {
    alert("Action de démonstration — pas encore connectée à un backend.");
  });
});

// Formulaire "Avis & plaintes" (espace parent) — démo, pas encore de backend
const avisForm = document.getElementById("avis-form");
if (avisForm) {
  avisForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Merci ! Votre message est enregistré en démonstration — il sera réellement transmis au secrétariat une fois le backend branché.");
    avisForm.reset();
  });
}

// Formulaire "Publier des cours" (espace professeur) — démo, pas encore de backend
const coursForm = document.getElementById("cours-form");
if (coursForm) {
  coursForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const classe = document.getElementById("cours-classe").value;
    alert(`Support publié ! Il apparaît désormais dans « Mes cours » pour les élèves de ${classe} (démonstration — pas encore connecté à un backend).`);
    coursForm.reset();
  });
}
