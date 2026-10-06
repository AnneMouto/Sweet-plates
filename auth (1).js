/* auth.js — gestion des comptes, partagée par toutes les pages du site.
   ATTENTION : démo sans serveur. Les comptes sont gardés dans le navigateur (localStorage),
   donc visibles seulement sur cet appareil. Pour de vrais comptes, il faudra un backend (ex. Firebase). */
const Auth = (() => {
  const K_USERS = 'sp_users';     // tous les comptes créés
  const K_CUR = 'sp_current';     // pseudo du compte connecté

  // Lecture / écriture JSON dans le localStorage
  const lire = (k, def) => { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch (e) { return def; } };
  const ecrire = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  // On ne stocke jamais le mot de passe en clair : on garde son empreinte SHA-256
  async function hash(txt) {
    if (window.crypto && crypto.subtle) {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('sweet:' + txt));
      return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
    }
    return btoa(unescape(encodeURIComponent('sweet:' + txt))); // secours si crypto indisponible
  }

  // Compte actuellement connecté (ou null)
  function current() {
    const p = localStorage.getItem(K_CUR);
    return p && lire(K_USERS, {})[p] ? lire(K_USERS, {})[p].pseudo : null;
  }

  // Création de compte
  async function signup(pseudo, email, mdp) {
    const users = lire(K_USERS, {});
    const cle = pseudo.toLowerCase();
    if (users[cle]) return { ok: false, error: "Ce nom d'utilisateur est déjà pris." };
    if (Object.values(users).some(u => u.email === email.toLowerCase()))
      return { ok: false, error: 'Un compte existe déjà avec cet email.' };
    users[cle] = { pseudo, email: email.toLowerCase(), hash: await hash(mdp) };
    ecrire(K_USERS, users);
    localStorage.setItem(K_CUR, cle);
    return { ok: true };
  }

  // Connexion avec pseudo OU email
  async function login(id, mdp) {
    const users = lire(K_USERS, {});
    const u = Object.values(users).find(x => x.pseudo.toLowerCase() === id.toLowerCase() || x.email === id.toLowerCase());
    if (!u || u.hash !== await hash(mdp)) return { ok: false, error: 'Identifiants incorrects.' };
    localStorage.setItem(K_CUR, u.pseudo.toLowerCase());
    return { ok: true };
  }

  function logout() { localStorage.removeItem(K_CUR); }

  // Likes et abonnements, enregistrés séparément pour chaque compte
  const cleSocial = () => 'sp_social_' + (current() || '').toLowerCase();
  function social() {
    return current() ? lire(cleSocial(), { likes: [], follows: [] }) : { likes: [], follows: [] };
  }
  function basculer(liste, valeur) {
    const s = social();
    const i = s[liste].indexOf(valeur);
    if (i >= 0) s[liste].splice(i, 1); else s[liste].push(valeur);
    ecrire(cleSocial(), s);
    return i < 0; // true = ajouté
  }
  const toggleLike = id => basculer('likes', id);
  const toggleFollow = nom => basculer('follows', nom);

  // Remplit un lien/bouton : « Se connecter » ou « 👤 pseudo (Déconnexion) »
  function badge(el, retour) {
    const user = current();
    if (user) {
      el.textContent = '👤 ' + user + ' · Déconnexion';
      el.href = '#';
      el.onclick = e => { e.preventDefault(); logout(); location.reload(); };
    } else {
      el.textContent = '👤 Se connecter';
      el.href = 'connexion.html' + (retour ? '?retour=' + encodeURIComponent(retour) : '');
      el.onclick = null;
    }
  }

  return { current, signup, login, logout, social, toggleLike, toggleFollow, badge };
})();
