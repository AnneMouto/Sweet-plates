/* sweety.js — chatbot Sweety
   Comprend des demandes simples (chocolat, fruits, facile, rapide, nom d'une recette...)
   et répond avec une LISTE de recettes cliquables. Utilisable sur toutes les pages qui ont le chatbot. */

// ====== BASE DE RECETTES (à modifier librement) ======
// minutes = durée totale estimée | niveau = facile / moyen / difficile
// tags = thèmes | mots = mots qui désignent directement la recette | lien = page de la recette
const RECETTES = [
  { nom: "Gâteau fondant au chocolat", image: "images/g_fondant.PNG",           minutes: 35,  niveau: "facile",    tags: ["chocolat"],           mots: ["fondant"],        lien: "Recipe res1.html" },
  { nom: "Mini cake framboise",        image: "images/mini_cake_framboise.PNG", minutes: 45,  niveau: "facile",    tags: ["fruits"],             mots: ["mini cake", "framboise"], lien: "Recipe res1.html" },
  { nom: "Macarons au chocolat",       image: "images/macaron_choco.PNG",       minutes: 90,  niveau: "difficile", tags: ["chocolat", "amande"], mots: ["macaron"],        lien: "Recipe res1.html" },
  { nom: "Crêpes au chocolat",         image: "images/c choco.PNG",             minutes: 20,  niveau: "facile",    tags: ["chocolat"],           mots: ["crepe"],          lien: "Recipe res1.html" },
  { nom: "Muffins au caramel",         image: "images/muffins_caramel.PNG",     minutes: 30,  niveau: "facile",    tags: ["caramel"],            mots: ["muffin"],         lien: "Recipe res1.html" },
  { nom: "Cookies pépites",            image: "images/b cookie.PNG",            minutes: 25,  niveau: "facile",    tags: ["chocolat"],           mots: ["cookie", "pepite"], lien: "Recipe res1.html" },
  { nom: "Tarte aux fruits rouges",    image: "images/t_fruit_rouge.PNG",       minutes: 60,  niveau: "moyen",     tags: ["fruits"],             mots: ["tarte"],          lien: "Recipe res1.html" },
  { nom: "Flan",                       image: "images/flan.PNG",                minutes: 60,  niveau: "facile",    tags: ["creme"],              mots: ["flan"],           lien: "Recipe res1.html" },
  { nom: "Financier",                  image: "images/financier.PNG",           minutes: 30,  niveau: "moyen",     tags: ["amande"],             mots: ["financier"],      lien: "Recipe res1.html" },
  { nom: "Rouleau suisse",             image: "images/rouleau_suisse.PNG",      minutes: 50,  niveau: "moyen",     tags: ["creme"],              mots: ["rouleau"],        lien: "Recipe res1.html" },
  { nom: "Croissant au chocolat",      image: "images/croissant_choco.PNG",     minutes: 180, niveau: "difficile", tags: ["chocolat"],           mots: ["croissant"],      lien: "Recipe res1.html" },
  { nom: "Éclair au chocolat",         image: "images/éclair_au_choco.PNG",     minutes: 90,  niveau: "difficile", tags: ["chocolat", "creme"],  mots: ["eclair"],         lien: "Recipe res1.html" },
  { nom: "Opéra",                      image: "images/opéra_choco.PNG",         minutes: 150, niveau: "difficile", tags: ["chocolat", "creme"],  mots: ["opera"],          lien: "Recipe res1.html" }
];

// ====== MOTS-CLÉS COMPRIS PAR SWEETY (sans accents, en minuscules) ======
const CRITERES = {
  chocolat:  ["chocolat", "choco", "cacao"],
  fruits:    ["fruit", "framboise", "fraise", "rouge"],
  caramel:   ["caramel"],
  amande:    ["amande"],
  creme:     ["creme", "flan"],
  facile:    ["facile", "simple", "debutant"],
  moyen:     ["moyen", "intermediaire"],
  difficile: ["difficile", "expert", "complique", "defi"],
  rapide:    ["rapide", "vite", "express", "presse", "peu de temps", "pas le temps"]
};
const LIBELLES = { chocolat: "chocolat", fruits: "fruits", caramel: "caramel", amande: "amande",
                   creme: "crème", facile: "faciles", moyen: "niveau moyen", difficile: "expert", rapide: "30 min max" };

// Boutons de suggestion affichés sous les réponses
const CHIPS = [
  ["🍫 Chocolat", "Je veux du chocolat"], ["🍓 Fruits", "Je veux des fruits"], ["😊 Faciles", "Je veux une recette facile"],
  ["⏱️ Rapides", "Je veux une recette rapide"], ["🎲 Surprise", "Surprends-moi"], ["📖 Toutes", "Toutes les recettes"]
];

// ====== LOGIQUE : comprendre la demande ======
// Enlève accents et majuscules : « Éclair » -> « eclair »
const norm = txt => txt.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const contient = (t, mots) => mots.some(m => t.includes(m));
// Étiquettes d'une recette (« rapide » est calculé d'après la durée)
const etiquettes = r => [...r.tags, r.niveau, ...(r.minutes <= 30 ? ["rapide"] : [])];

function repondre(message) {
  const t = norm(message);

  if (/\b(bonjour|salut|coucou|hello|bonsoir)\b/.test(t))
    return { texte: "Bonjour 👋 Que souhaitez-vous préparer aujourd'hui ?", chips: CHIPS };
  if (/\bmerci\b/.test(t))
    return { texte: "Avec plaisir ! 🧁 Je peux aussi vous proposer d'autres recettes.", chips: CHIPS };
  if (contient(t, ["surpren", "surprise", "hasard", "inspire", "sais pas"])) {
    const r = RECETTES[Math.floor(Math.random() * RECETTES.length)];
    return { texte: "🎲 Et si vous essayiez celle-ci ?", recettes: [r], chips: CHIPS };
  }

  // 1) La personne cite directement une recette (ex. « cookies », « éclair »)
  const parNom = RECETTES.filter(r => contient(t, r.mots));
  if (parNom.length)
    return { texte: `Voilà ce que j'ai trouvé 🍰 (${parNom.length}) :`, recettes: parNom, chips: CHIPS };

  // 2) Sinon on cherche des critères : chocolat, facile, rapide...
  const criteres = Object.keys(CRITERES).filter(c => contient(t, CRITERES[c]));
  if (criteres.length) {
    const noms = criteres.map(c => LIBELLES[c]).join(" + ");
    let liste = RECETTES.filter(r => criteres.every(c => etiquettes(r).includes(c)));
    let intro = `Voici ${liste.length} recette${liste.length > 1 ? "s" : ""} (${noms}) :`;
    if (!liste.length) { // aucune recette ne remplit TOUS les critères : on propose les plus proches
      liste = RECETTES.filter(r => criteres.some(c => etiquettes(r).includes(c)));
      intro = `Aucune recette ne réunit tout (${noms}), mais voici les plus proches :`;
    }
    if (criteres.includes("rapide")) liste = [...liste].sort((a, b) => a.minutes - b.minutes); // les plus rapides d'abord
    return { texte: intro, recettes: liste, chips: CHIPS };
  }

  // 3) Demande générale : on montre tout
  if (contient(t, ["toute", "liste", "catalogue", "recette", "gateau", "dessert", "menu"]))
    return { texte: `Voici toutes nos recettes (${RECETTES.length}) 📖 :`, recettes: RECETTES, chips: CHIPS };

  return { texte: "🧁 Je n'ai pas compris, mais essayez : « chocolat », « facile », « rapide », « cookies »... ou cliquez ci-dessous.", chips: CHIPS };
}

// ====== AFFICHAGE DANS LA FENÊTRE DE CHAT ======
const sweetyButton = document.getElementById("sweetyButton");
const sweetyChat = document.getElementById("sweetyChat");
const sweetyClose = document.getElementById("sweetyClose");
const sweetyForm = document.getElementById("sweetyForm");
const sweetyInput = document.getElementById("sweetyInput");
const sweetyMessages = document.getElementById("sweetyMessages");

// Message de l'utilisateur
function ajouterUtilisateur(texte) {
  const el = document.createElement("div");
  el.className = "sweety-message user";
  el.textContent = texte;
  sweetyMessages.appendChild(el);
  sweetyMessages.scrollTop = sweetyMessages.scrollHeight;
}

// Message de Sweety : texte + liste de recettes (cartes cliquables) + boutons de suggestion
function ajouterBot({ texte, recettes, chips }) {
  const el = document.createElement("div");
  el.className = "sweety-message bot";
  el.appendChild(document.createTextNode(texte));

  if (recettes && recettes.length) {
    const liste = document.createElement("div");
    liste.className = "sweety-recipes";
    recettes.forEach(r => {
      const a = document.createElement("a");
      a.className = "sweety-recipe";
      a.href = r.lien;
      const img = document.createElement("img");
      img.src = encodeURI(r.image);
      img.alt = r.nom;
      img.onerror = () => img.remove(); // pas d'image : on affiche seulement le texte
      const info = document.createElement("div");
      const nom = document.createElement("b");
      nom.textContent = r.nom;
      const meta = document.createElement("small");
      const duree = r.minutes >= 60 ? `${Math.floor(r.minutes / 60)} h${r.minutes % 60 ? String(r.minutes % 60).padStart(2, "0") : ""}` : `${r.minutes} min`;
      meta.textContent = `⏱ ${duree} · ${r.niveau[0].toUpperCase() + r.niveau.slice(1)}`;
      info.append(nom, meta);
      a.append(img, info);
      liste.appendChild(a);
    });
    el.appendChild(liste);
  }

  if (chips) {
    const zone = document.createElement("div");
    zone.className = "sweety-suggestions";
    chips.forEach(([label, msg]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "sweety-suggestion";
      b.dataset.message = msg;
      b.textContent = label;
      zone.appendChild(b);
    });
    el.appendChild(zone);
  }
  sweetyMessages.appendChild(el);
  sweetyMessages.scrollTop = sweetyMessages.scrollHeight;
}

// Envoie une demande et affiche la réponse après un petit délai
function envoyer(msg) {
  ajouterUtilisateur(msg);
  setTimeout(() => ajouterBot(repondre(msg)), 400);
}

// Ouverture / fermeture du chat
sweetyButton.addEventListener("click", () => { sweetyChat.classList.add("open"); sweetyInput.focus(); });
sweetyClose.addEventListener("click", () => sweetyChat.classList.remove("open"));

// Saisie au clavier
sweetyForm.addEventListener("submit", e => {
  e.preventDefault();
  const msg = sweetyInput.value.trim();
  if (!msg) return;
  sweetyInput.value = "";
  envoyer(msg);
});

// Clic sur un bouton de suggestion (fonctionne aussi pour ceux ajoutés plus tard)
sweetyMessages.addEventListener("click", e => {
  const b = e.target.closest(".sweety-suggestion");
  if (b) envoyer(b.dataset.message);
});
