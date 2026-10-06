// =====================================================================
// DONNEES DES RECETTES
// Ajoute/modifie tes propres recettes ici : chaque recette doit suivre
// exactement cette structure. "categorie" doit correspondre à une des
// valeurs data-category des boutons de filtre (gateaux, crepes, tartes,
// muffins, biscuits, viennoiseries).
//
// TES PROPRES IMAGES : chaque recette a un champ "image" (ligne juste en
// dessous de "titre"). Pour l'instant elles pointent vers des photos de
// remplacement (picsum.photos) à remplacer par les tiennes. Deux façons :
//
//   1) Images sur ton ordinateur (le plus simple) :
//      - Crée un dossier "images" à côté de recettes.html et recette.js
//      - Mets tes photos dedans, ex: images/fondant-chocolat.jpg
//      - Remplace la ligne image: "https://picsum.photos/..."
//        par     image: "images/fondant-chocolat.jpg"
//
//   2) Images déjà en ligne : colle directement l'adresse de l'image,
//      mais attention, ça doit être un lien DIRECT vers le fichier image
//      (qui se termine par .jpg/.png/.webp), pas un lien de partage
//      Google Drive classique (celui-ci affiche une page de visionnage,
//      pas l'image brute, donc <img> ne l'affichera pas correctement).
// =====================================================================
const recettes = [
  {
    id: "fondant-chocolat",
    titre: "Fondant au chocolat",
    categorie: "gateaux",
    image: "images/g_c.PNG",
    description: "Un cœur coulant intense, pour les amoureux de chocolat noir.",
    temps: "35 min",
    difficulte: "Facile",
    portions: "6 parts",
    ingredients: [
      "200 g de chocolat noir",
      "150 g de beurre",
      "4 œufs",
      "120 g de sucre",
      "50 g de farine",
      "1 pincée de sel",
    ],
    etapes: [
      "Préchauffer le four à 200°C.",
      "Faire fondre le chocolat et le beurre au bain-marie.",
      "Fouetter les œufs avec le sucre jusqu'à ce que le mélange blanchisse.",
      "Incorporer le chocolat fondu, puis la farine tamisée et le sel.",
      "Verser dans un moule beurré et enfourner 12 à 15 minutes.",
      "Laisser tiédir 5 minutes avant de démouler.",
    ],
  },
  {
    id: "crepes-suzette",
    titre: "Crêpes Suzette",
    categorie: "crepes",
    image: "images/crêpe_tiralisu_fraise.PNG",
    description: "La crêpe classique flambée au beurre d'orange.",
    temps: "40 min",
    difficulte: "Intermédiaire",
    portions: "4 personnes",
    ingredients: [
      "250 g de farine",
      "3 œufs",
      "50 cl de lait",
      "2 oranges (jus + zestes)",
      "80 g de beurre",
      "60 g de sucre",
      "3 cl de Grand Marnier (optionnel)",
    ],
    etapes: [
      "Préparer une pâte à crêpes classique et laisser reposer 30 minutes.",
      "Cuire les crêpes dans une poêle beurrée, réserver au chaud.",
      "Faire fondre le beurre avec le sucre, le jus et les zestes d'orange.",
      "Plier les crêpes dans la poêle avec la sauce, flamber si souhaité.",
    ],
  },
  {
    id: "tarte-citron-meringuee",
    titre: "Tarte au citron meringuée",
    categorie: "tartes",
    image: "images/t.PNG",
    description: "L'équilibre parfait entre acidité et douceur meringuée.",
    temps: "1 h 10",
    difficulte: "Intermédiaire",
    portions: "8 parts",
    ingredients: [
      "1 pâte sablée",
      "4 citrons (jus + zestes)",
      "4 œufs",
      "150 g de sucre",
      "80 g de beurre",
      "3 blancs d'œufs (pour la meringue)",
      "90 g de sucre (pour la meringue)",
    ],
    etapes: [
      "Cuire la pâte à blanc 15 minutes à 180°C.",
      "Préparer la crème au citron : jus, zestes, œufs et sucre à feu doux jusqu'à épaississement.",
      "Incorporer le beurre hors du feu, verser sur le fond de tarte cuit.",
      "Monter les blancs en neige avec le sucre pour la meringue.",
      "Pocher la meringue sur la tarte et dorer quelques minutes au four ou au chalumeau.",
    ],
  },
  {
    id: "muffins-myrtilles",
    titre: "Muffins myrtilles",
    categorie: "muffins",
    image: "images/muffin_aux_pepites.PNG",
    description: "Moelleux et gonflés, pleins de myrtilles fraîches.",
    temps: "30 min",
    difficulte: "Facile",
    portions: "12 muffins",
    ingredients: [
      "280 g de farine",
      "200 g de myrtilles fraîches",
      "150 g de sucre",
      "2 œufs",
      "80 g de beurre fondu",
      "20 cl de lait",
      "1 sachet de levure chimique",
    ],
    etapes: [
      "Préchauffer le four à 180°C et préparer les caissettes à muffins.",
      "Mélanger les ingrédients secs, puis les ingrédients liquides à part.",
      "Combiner les deux sans trop travailler la pâte, ajouter les myrtilles délicatement.",
      "Répartir dans les caissettes et enfourner 20 à 22 minutes.",
    ],
  },
  {
    id: "cookies-chocolat",
    titre: "Cookies pépites de chocolat",
    categorie: "biscuits",
    image: "images/cookie.PNG",
    description: "Craquants sur les bords, fondants au centre.",
    temps: "25 min",
    difficulte: "Facile",
    portions: "15 cookies",
    ingredients: [
      "250 g de farine",
      "150 g de beurre mou",
      "150 g de cassonade",
      "1 œuf",
      "150 g de pépites de chocolat",
      "1/2 sachet de levure chimique",
    ],
    etapes: [
      "Préchauffer le four à 180°C.",
      "Mélanger le beurre et la cassonade jusqu'à obtenir une texture crémeuse.",
      "Ajouter l'œuf, puis la farine et la levure, mélanger sans trop insister.",
      "Incorporer les pépites de chocolat.",
      "Former des boules, les espacer sur une plaque, cuire 10 à 12 minutes.",
    ],
  },
  {
    id: "croissants-maison",
    titre: "Croissants maison",
    categorie: "viennoiseries",
    image: "images/",
    description: "Le classique feuilleté et beurré du petit-déjeuner français.",
    temps: "3 h (dont repos)",
    difficulte: "Difficile",
    portions: "8 croissants",
    ingredients: [
      "500 g de farine",
      "270 g de beurre de tourage",
      "10 g de sel",
      "80 g de sucre",
      "20 g de levure fraîche",
      "25 cl de lait",
    ],
    etapes: [
      "Préparer une détrempe avec farine, sel, sucre, levure et lait, laisser reposer au frais.",
      "Réaliser le tourage : enfermer le beurre dans la pâte, donner 3 tours simples avec repos entre chaque.",
      "Étaler, découper des triangles et façonner les croissants.",
      "Laisser pousser 2 heures à température ambiante.",
      "Dorer et cuire 15 à 18 minutes à 200°C.",
    ],
  },
];

// =====================================================================
// AFFICHAGE DE LA GRILLE DE RECETTES
// =====================================================================
// =====================================================================
// FAVORIS
// Comme les notes, la liste des favoris est propre à chaque visiteur
// (sauvegardée dans son navigateur, clé "favoris-recettes") — pas une
// liste partagée entre tout le monde.
// =====================================================================
let filtreActif = "all";

function chargerFavoris() {
  try {
    return JSON.parse(localStorage.getItem("favoris-recettes") || "[]");
  } catch {
    return [];
  }
}

function sauvegarderFavoris(liste) {
  localStorage.setItem("favoris-recettes", JSON.stringify(liste));
}

function estFavori(id) {
  return chargerFavoris().includes(id);
}

function toggleFavori(id) {
  const favoris = chargerFavoris();
  const index = favoris.indexOf(id);
  if (index === -1) {
    favoris.push(id);
  } else {
    favoris.splice(index, 1);
  }
  sauvegarderFavoris(favoris);
}

// Reapplique le filtre (categorie ou favoris) actuellement selectionne.
// Appelee au clic sur un bouton de filtre, mais aussi apres un clic sur
// un coeur pour que la vue "Favoris" se mette a jour immediatement.
function appliquerFiltre() {
  let filtrees;
  let messageVide = "Aucune recette dans cette catégorie pour l'instant.";

  if (filtreActif === "favoris") {
    const favoris = chargerFavoris();
    filtrees = recettes.filter((r) => favoris.includes(r.id));
    messageVide = "Pas encore de favori — clique sur le ♥ d'une recette pour l'ajouter ici.";
  } else if (filtreActif === "all") {
    filtrees = recettes;
  } else {
    filtrees = recettes.filter((r) => r.categorie === filtreActif);
  }

  rendreRecettes(filtrees, messageVide);
}

function rendreRecettes(liste, messageVide) {
  const grille = document.getElementById("recipesGrid");

  if (liste.length === 0) {
    grille.innerHTML = `<p class="empty">${messageVide || "Aucune recette dans cette catégorie pour l'instant."}</p>`;
    return;
  }

  grille.innerHTML = liste
    .map(
      (r) => `
    <div class="recipe-card">
      <div class="recipe-image">
        <img src="${r.image}" alt="${r.titre}">
        <button class="favorite-btn ${estFavori(r.id) ? "active" : ""}" data-id="${r.id}" type="button" aria-label="Ajouter aux favoris">♥</button>
      </div>
      <div class="recipe-info">
        <span class="recipe-tag">${r.categorie}</span>
        <h3>${r.titre}</h3>
        <p>${r.description}</p>
        <div class="recipe-meta">
          <span>⏱️ ${r.temps}</span>
          <span>⭐ ${r.difficulte}</span>
          <span>👥 ${r.portions}</span>
        </div>
        <button class="view-recipe" data-id="${r.id}" type="button">Voir la recette</button>
      </div>
    </div>
  `
    )
    .join("");

  // Rebrancher les boutons "Voir la recette" a chaque nouveau rendu
  grille.querySelectorAll(".view-recipe").forEach((bouton) => {
    bouton.addEventListener("click", () => ouvrirDetail(bouton.dataset.id));
  });

  // Rebrancher les coeurs
  grille.querySelectorAll(".favorite-btn").forEach((bouton) => {
    bouton.addEventListener("click", (e) => {
      e.stopPropagation(); // ne pas declencher un clic sur la carte en dessous
      toggleFavori(bouton.dataset.id);
      bouton.classList.toggle("active");
      // Si on est sur la vue Favoris, la carte qu'on vient de retirer doit disparaitre tout de suite
      if (filtreActif === "favoris") appliquerFiltre();
    });
  });
}

// =====================================================================
// FILTRES PAR CATEGORIE
// =====================================================================
function initFiltres() {
  const boutons = document.querySelectorAll(".filter-btn.category");

  boutons.forEach((bouton) => {
    bouton.addEventListener("click", () => {
      boutons.forEach((b) => b.classList.remove("active"));
      bouton.classList.add("active");

      filtreActif = bouton.dataset.category;
      appliquerFiltre();
    });
  });
}

// =====================================================================
// MODAL DE DETAIL (ouverte par le bouton "Voir la recette")
// =====================================================================
// =====================================================================
// SYSTEME DE NOTATION PAR ETOILES
// La note est propre à chaque visiteur (sauvegardée dans son navigateur
// via localStorage, sous la clé "note-<id-recette>") — ce n'est donc pas
// une moyenne partagée entre tout le monde, juste "ta" note personnelle,
// qui reste d'une visite à l'autre sur le même appareil/navigateur.
// =====================================================================
function initEtoiles(recetteId) {
  const conteneur = document.getElementById("starRating");
  const feedback = document.getElementById("ratingFeedback");
  const etoiles = [...conteneur.querySelectorAll(".star")];
  const cle = `note-${recetteId}`;

  let noteActuelle = parseInt(localStorage.getItem(cle) || "0", 10);

  function afficher(valeur) {
    etoiles.forEach((etoile) => {
      const v = parseInt(etoile.dataset.value, 10);
      etoile.classList.toggle("filled", v <= valeur);
    });
  }

  function texteFeedback(valeur) {
    return valeur === 0 ? "Pas encore noté" : `Ta note : ${valeur}/5`;
  }

  afficher(noteActuelle);
  feedback.textContent = texteFeedback(noteActuelle);

  // Nettoie les anciens gestionnaires (la modal peut s'ouvrir plusieurs fois
  // de suite, sans ça les clics finiraient par se déclencher en double)
  etoiles.forEach((etoile) => etoile.replaceWith(etoile.cloneNode(true)));

  // Re-sélectionner les étoiles fraîchement clonées pour attacher les vrais gestionnaires
  const etoilesActives = [...conteneur.querySelectorAll(".star")];
  etoilesActives.forEach((etoile) => {
    const valeur = parseInt(etoile.dataset.value, 10);

    etoile.addEventListener("mouseenter", () => afficher(valeur));
    etoile.addEventListener("focus", () => afficher(valeur));

    etoile.addEventListener("click", () => {
      noteActuelle = valeur;
      localStorage.setItem(cle, String(noteActuelle));
      afficher(noteActuelle);
      feedback.textContent = texteFeedback(noteActuelle);
    });
  });

  conteneur.addEventListener("mouseleave", () => afficher(noteActuelle));
}

function ouvrirDetail(id) {
  const r = recettes.find((rec) => rec.id === id);
  if (!r) return;

  document.getElementById("detailImage").src = r.image;
  document.getElementById("detailImage").alt = r.titre;
  document.getElementById("detailCategory").textContent = r.categorie;
  document.getElementById("detailTitle").textContent = r.titre;
  document.getElementById("detailDescription").textContent = r.description;
  document.getElementById("detailTime").textContent = r.temps;
  document.getElementById("detailDifficulty").textContent = r.difficulte;
  document.getElementById("detailServings").textContent = r.portions;

  document.getElementById("detailIngredients").innerHTML = r.ingredients
    .map((i) => `<li>${i}</li>`)
    .join("");

  document.getElementById("detailSteps").innerHTML = r.etapes
    .map((etape, index) => `<li><b>${index + 1}</b><span>${etape}</span></li>`)
    .join("");

  document.getElementById("recipeModal").classList.add("show");
  document.body.style.overflow = "hidden"; // empêche le scroll derrière la modal

  initEtoiles(id);

  const boutonFavoriModal = document.getElementById("modalFavoriteBtn");
  boutonFavoriModal.classList.toggle("active", estFavori(id));
  boutonFavoriModal.onclick = () => {
    toggleFavori(id);
    boutonFavoriModal.classList.toggle("active", estFavori(id));

    // Garder la carte correspondante (en arriere-plan) synchronisee aussi
    const carteCoeur = document.querySelector(`.favorite-btn[data-id="${id}"]`);
    if (carteCoeur) carteCoeur.classList.toggle("active", estFavori(id));
    if (filtreActif === "favoris") appliquerFiltre();
  };
}

function fermerDetail() {
  document.getElementById("recipeModal").classList.remove("show");
  document.body.style.overflow = "";
}

// =====================================================================
// INITIALISATION
// =====================================================================
document.addEventListener("DOMContentLoaded", () => {
  appliquerFiltre();
  initFiltres();

  document.getElementById("recipeClose").addEventListener("click", fermerDetail);

  // Fermer en cliquant sur le fond sombre (pas sur le contenu de la modal)
  document.getElementById("recipeModal").addEventListener("click", (e) => {
    if (e.target.id === "recipeModal") fermerDetail();
  });

  // Fermer avec la touche Echap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fermerDetail();
  });
});
