document.addEventListener("DOMContentLoaded", () => {

// =========================================================
// LISTE DES PAYS ÉLIGIBLES (utilisée pour le select + drapeaux)
// =========================================================

const countryList = [
{ code: "TG", name: "Togo", flag: "🇹🇬" },
{ code: "BJ", name: "Bénin", flag: "🇧🇯" },
{ code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮" },
{ code: "SN", name: "Sénégal", flag: "🇸🇳" },
{ code: "GH", name: "Ghana", flag: "🇬🇭" },
{ code: "CM", name: "Cameroun", flag: "🇨🇲" },
{ code: "FR", name: "France", flag: "🇫🇷" }
];

// =========================================================
// XP DE L'UTILISATEUR (simulation frontend)
// =========================================================

const currentUserXP = 850;

// =========================================================
// DONNÉES DES CONCOURS
// =========================================================


const concoursList = [
{
id: 1,
title: "Grand Concours d'Art QuizTable",
subtitle: "Exprimez votre talent artistique et gagnez 50 000 FCFA",
category: "art",
image: "../assets/images/concours/art.jpg",
members: 214,
liked: false,
notifications: false,
paid: true,
price: "2 000 FCFA",
xpRequired: 1000,
countries: ["TG", "BJ", "CI", "SN"],
registrationStart: "2026-08-10T00:00:00Z",
registrationEnd: "2026-08-22T23:59:00Z",
contestDeadline: "2026-08-29T23:59:00Z",
resultsTime: "2026-09-02T12:00:00Z",
description: "Participez au Grand Concours d'Art QuizTable et faites voter la communauté pour votre œuvre. Les meilleures créations remportent des récompenses en FCFA et en visibilité.",
fullInfo: "Le concours est ouvert à tous les membres inscrits sur QuizTable. Chaque participant doit soumettre une œuvre originale (dessin, peinture, illustration numérique). Les votes sont ouverts durant toute la période du concours. Les gagnants seront désignés par un jury QuizTable et par les votes de la communauté.",
pdfUrl: "../assets/docs/concours/art-reglement.pdf",
allowScreenshotPayment: true,
resultText: "Le jury QuizTable a désigné les trois meilleures œuvres. Résultats et visuels des gagnants disponibles dans l'onglet Informations.",
partners: [
{
name: "ArtLine Studio",
eyebrow: "Partenaire officiel",
text: "ArtLine Studio offre du matériel de dessin professionnel aux trois premiers gagnants.",
cta: "En savoir plus sur ArtLine Studio",
color: "#7b2ff7, #3a0ca3"
},
{
name: "ArtLine Studio",
eyebrow: "Partenaire officiel",
text: "ArtLine Studio offre du matériel de dessin professionnel aux trois premiers gagnants.",
cta: "En savoir plus sur ArtLine Studio",
color: "#7b2ff7, #3a0ca3"
}
]
},
{
id: 2,
title: "Concours de Culture Générale",
subtitle: "Testez l'étendue de vos connaissances",
category: "culture",
image: "../assets/images/concours/culture.jpg",
members: 189,
liked: false,
notifications: false,
paid: false,
price: "Gratuit",
xpRequired: 500,
countries: ["TG", "BJ", "CI", "SN", "GH", "CM"],
registrationStart: "2026-08-10T00:00:00Z",
registrationEnd: "2026-08-10T23:59:00Z",
contestDeadline: "2026-08-29T23:59:00Z",
resultsTime: "2026-09-02T12:00:00Z",
description: "Un concours 100% culture générale ouvert à tous les curieux, avec des questions couvrant l'histoire, la science, la géographie et l'actualité.",
fullInfo: "Le concours se déroule en plusieurs manches éliminatoires. Chaque manche apporte son lot de questions de culture générale. Les 500 XP requis sont automatiquement vérifiés lors de l'inscription.",
pdfUrl: "",
allowScreenshotPayment: false,
resultText: "Classement final disponible : consultez l'onglet Informations pour voir le nom du gagnant et son score.",
partners: [
{
name: "SavoirPlus",
eyebrow: "Sponsor de l'édition",
text: "SavoirPlus offre des abonnements premium aux 10 meilleurs participants.",
cta: "En savoir plus sur SavoirPlus",
color: "#00c6ff, #0072ff"
}
]
},
{
id: 3,
title: "Battle Musicale QuizTable",
subtitle: "Montrez votre oreille musicale",
category: "music",
image: "../assets/images/concours/musique.jpg",
members: 156,
liked: false,
notifications: false,
paid: true,
price: "1 500 FCFA",
xpRequired: 1200,
countries: ["TG", "BJ", "CI"],
registrationStart: "2026-08-10T00:00:00Z",
registrationEnd: "2026-08-10T23:59:00Z",
contestDeadline: "2026-08-10T23:59:00Z",
resultsTime: "2026-08-11T12:00:00Z",
description: "Reconnaissez des extraits musicaux, devinez les artistes et grimpez au sommet du classement de la Battle Musicale.",
fullInfo: "La Battle Musicale se déroule en une seule manche chronométrée. Les participants doivent identifier un maximum d'extraits musicaux dans le temps imparti. Le classement final déterminera les gagnants.",
pdfUrl: "../assets/docs/concours/musique-affiche.pdf",
allowScreenshotPayment: true,
resultText: "Les extraits musicaux les plus votés par la communauté ont été départagés par le jury. Le gagnant est annoncé dans l'onglet Informations.",
partners: [
{
name: "SoundWave",
eyebrow: "Partenaire officiel",
text: "SoundWave offre des casques audio aux trois meilleurs participants de cette édition.",
cta: "En savoir plus sur SoundWave",
color: "#ff4ecd, #6a00f4"
}
]
},
{
id: 4,
title: "Concours Littéraire QuizTable",
subtitle: "Racontez une histoire en 500 mots",
category: "art",
image: "../assets/images/concours/litterature.jpg",
members: 97,
liked: false,
notifications: false,
paid: true,
price: "1 000 FCFA",
xpRequired: 800,
countries: ["TG", "BJ", "SN", "FR"],
registrationStart: "2026-08-10T00:00:00Z",
registrationEnd: "2026-08-22T23:59:00Z",
contestDeadline: "2026-08-29T23:59:00Z",
resultsTime: "2026-09-02T12:00:00Z",
description: "Un concours d'écriture ouvert à tous : rédigez une courte nouvelle sur le thème imposé et tentez de séduire le jury.",
fullInfo: "Le thème du concours sera communiqué dès l'ouverture des inscriptions. Chaque texte doit être original, inédit et respecter la limite de mots imposée. Un jury de rédacteurs QuizTable désignera les gagnants.",
pdfUrl: "",
allowScreenshotPayment: true,
resultText: "Le texte gagnant a été sélectionné par le jury littéraire QuizTable. Retrouvez le nom de l'auteur et un extrait dans l'onglet Informations.",
partners: [
{
name: "Plume d'Or",
eyebrow: "Sponsor de l'édition",
text: "Plume d'Or offre la publication du texte gagnant dans son recueil annuel.",
cta: "En savoir plus sur Plume d'Or",
color: "#232526, #414345"
}
]
},
{
id: 5,
title: "Quiz Général Panafricain",
subtitle: "La culture générale à l'échelle du continent",
category: "culture",
image: "../assets/images/concours/panafricain.jpg",
members: 302,
liked: false,
notifications: false,
paid: true,
price: "1 000 FCFA",
xpRequired: 1500,
countries: ["TG", "BJ", "CI", "SN", "GH", "CM"],
registrationStart: "2026-08-10T00:00:00Z",
registrationEnd: "2026-08-22T23:59:00Z",
contestDeadline: "2026-08-29T23:59:00Z",
resultsTime: "2026-09-02T12:00:00Z",
description: "Le rendez-vous panafricain de la culture générale QuizTable, avec des questions sur l'ensemble du continent.",
fullInfo: "Ce concours est désormais fermé aux inscriptions. Les résultats seront publiés très prochainement pour l'ensemble des participants inscrits.",
pdfUrl: "",
allowScreenshotPayment: false,
resultText: "Résultats du classement panafricain disponibles dans l'onglet Informations.",
partners: []
},
{
id: 6,
title: "Concours Photo Culture Urbaine",
subtitle: "Capturez l'âme de votre ville",
category: "other",
image: "../assets/images/concours/photo.jpg",
members: 74,
liked: false,
notifications: false,
paid: false,
price: "Gratuit",
xpRequired: 300,
countries: ["TG", "BJ", "CI", "SN"],
registrationStart: "2026-08-10T00:00:00Z",
registrationEnd: "2026-08-22T23:59:00Z",
contestDeadline: "2026-08-29T23:59:00Z",
resultsTime: "2026-09-02T12:00:00Z",
description: "Partagez une photo qui capture l'énergie de la culture urbaine de votre ville et tentez de remporter la récompense.",
fullInfo: "Une seule photo par participant est acceptée. La photo doit être inédite et prise par le participant lui-même. Le vote de la communauté déterminera le classement final.",
pdfUrl: "",
allowScreenshotPayment: true,
resultText: "La photo gagnante a été choisie par le jury et la communauté. Découvrez le cliché primé dans l'onglet Informations.",
partners: [
{
name: "UrbanLens",
eyebrow: "Partenaire officiel",
text: "UrbanLens offre du matériel photo aux gagnants de ce concours.",
cta: "En savoir plus sur UrbanLens",
color: "#f7971e, #ffd200"
}
]
}
];

// =========================================================
// ÉTAT GLOBAL
// =========================================================

let currentConcours = concoursList[0];
let currentFilter = "all";

// registeredConcours: Map(id -> { status: "pending"|"validated", code, xpUsed })
const registeredConcours = new Map();

let notifications = [];
let lastConcoursStates = {};
let validationTimers = {};

let currentPartnerIndex = 0;
let partnerInterval = null;

// =========================================================
// ÉLÉMENTS HTML
// =========================================================

const mainTitle = document.getElementById("concours-main-title");
const mainSubtitle = document.getElementById("concours-main-subtitle");
const infoList = document.getElementById("concours-info-list");
const descriptionText = document.getElementById("concours-description-text");
const infoFull = document.getElementById("concours-info-full");
const pdfLink = document.getElementById("concours-pdf-link");

const description = document.getElementById("concours-description");
const infoContent = document.getElementById("concours-info-content");
const resultsContent = document.getElementById("concours-results-content");
const infoButton = document.querySelector(".concours-info-btn");

const registerButton = document.querySelector(".concours-register-btn");
const membersText = document.querySelector(".concours-members span");
const likeButton = document.querySelector(".concours-like");

const notificationButton = document.querySelector(".concours-notification");
const notificationBadge = document.querySelector(".concours-notification-badge");
const notificationPanel = document.querySelector(".concours-notification-panel");
const notificationList = document.querySelector(".concours-notification-list");
const notificationClear = document.querySelector(".concours-notification-clear");

const concoursTrack = document.getElementById("concours-selector-track");
const similarTrack = document.getElementById("similar-concours-track");
const filterButtons = document.querySelectorAll(".concours-filter");

const partnerTrack = document.getElementById("concours-partner-track");
const partnerDots = document.getElementById("concours-partner-dots");

// Modales inscription

const registrationModal = document.querySelector(".concours-registration-modal");
const registrationChecks = document.querySelectorAll(".registration-check");
const registrationConfirm = document.querySelector(".registration-confirm");
const registrationCancel = document.querySelector(".registration-cancel");

const formModal = document.querySelector(".concours-form-modal");
const formClose = document.querySelector(".concours-form-close");
const concoursForm = document.getElementById("concoursForm");
const regPaysSelect = document.getElementById("regPays");
const regPseudo = document.getElementById("regPseudo");
const pseudoHint = document.getElementById("pseudoHint");
const xpInfoBox = document.getElementById("xpInfoBox");
const xpRequiredValue = document.getElementById("xpRequiredValue");
const xpUserValue = document.getElementById("xpUserValue");
const paymentBlock = document.getElementById("paymentBlock");
const regPrixDisplay = document.getElementById("regPrixDisplay");
const accessRadios = document.querySelectorAll('input[name="accessMode"]');
const xpAccessLabel = document.getElementById("xpAccessLabel");

const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
const mobileMoneyDetail = document.getElementById("mobileMoneyDetail");
const cardDetail = document.getElementById("cardDetail");
const bankDetail = document.getElementById("bankDetail");
const screenshotDetail = document.getElementById("screenshotDetail");
const screenshotOption = document.getElementById("screenshotOption");

const codeModal = document.querySelector(".concours-code-modal");
const codeDisplay = document.getElementById("concoursCodeDisplay");
const codeClose = document.querySelector(".concours-code-close");

const unregisterModal = document.querySelector(".concours-unregister-modal");
const unregisterNo = document.querySelector(".unregister-no");
const unregisterYes = document.querySelector(".unregister-yes");

const codeCheckModal = document.querySelector(".concours-code-check-modal");
const codeCheckInput = document.querySelector(".concours-code-input");
const codeCheckError = document.querySelector(".concours-code-error");
const codeCheckCancel = document.querySelector(".code-check-cancel");
const codeCheckConfirm = document.querySelector(".code-check-confirm");

// =========================================================
// UTILITAIRES
// =========================================================

function formatDate(isoString) {
const d = new Date(isoString);

return d.toLocaleDateString("fr-FR", {
day: "2-digit",
month: "short",
year: "numeric"
});
}

function generateCode() {
const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
let code = "";

for (let i = 0; i < 10; i++) {
if (i > 0 && i % 5 === 0) {
code += "-";
}

code += chars[Math.floor(Math.random() * chars.length)];
}

return code;
}

// =========================================================
// ÉTAT D'UN CONCOURS
// =========================================================
/*
* "open" (vert) : les inscriptions sont encore ouvertes,
* même si le concours est par ailleurs en cours.
* "ongoing" (rouge) : inscriptions fermées, concours en cours,
* résultats pas encore publiés.
* "results" (bleu) : les résultats sont disponibles.
*/

function getStateForConcours(concours) {
const nowDate = new Date();

const registrationEnd = new Date(concours.registrationEnd);
const resultsTime = new Date(concours.resultsTime);

if (nowDate < registrationEnd) {
return "open";
}

if (nowDate < resultsTime) {
return "ongoing";
}

return "results";
}

function getConcoursState() {
return getStateForConcours(currentConcours);
}

// =========================================================
// PANNEAUX
// =========================================================

function showPanel(panel) {
document.querySelectorAll(".concours-panel-content").forEach(item => {
item.classList.remove("active");
});

if (panel) {
panel.classList.add("active");
}
}

function setActiveButton(button) {
[infoButton].forEach(item => {
if (item) {
item.classList.remove("active");
}
});

if (button) {
button.classList.add("active");
}
}

// =========================================================
// LISTE DES PAYS (select du formulaire)
// =========================================================

function populateCountrySelect() {
if (!regPaysSelect) {
return;
}

while (regPaysSelect.options.length > 1) {
regPaysSelect.remove(1);
}

countryList.forEach(country => {
const option = document.createElement("option");

option.value = country.code;
option.textContent = `${country.flag} ${country.name}`;

regPaysSelect.appendChild(option);
});
}

// =========================================================
// PANNEAU PUBLICITAIRE (partenaires)
// =========================================================

function renderPartnerBanner() {
if (!partnerTrack || !partnerDots) {
return;
}

const partners = currentConcours.partners || [];

partnerTrack.innerHTML = "";
partnerDots.innerHTML = "";

currentPartnerIndex = 0;

if (partners.length === 0) {
resetPartnerInterval();
return;
}

partners.forEach((partner, index) => {
const slide = document.createElement("div");

slide.className = "concours-partner-slide";

if (index === 0) {
slide.classList.add("active");
}

slide.style.backgroundImage = `linear-gradient(135deg, ${partner.color})`;

slide.innerHTML = `
<span class="concours-partner-eyebrow">${partner.eyebrow}</span>
<h3 class="concours-partner-name">${partner.name}</h3>
<p class="concours-partner-text">${partner.text}</p>
<button type="button" class="concours-partner-cta">
${partner.cta}
<i class="fa-solid fa-arrow-right"></i>
</button>
`;

partnerTrack.appendChild(slide);

if (partners.length > 1) {
const dot = document.createElement("button");

dot.type = "button";
dot.className = "concours-partner-dot";

if (index === 0) {
dot.classList.add("active");
}

dot.addEventListener("click", () => {
goToPartnerSlide(index);
resetPartnerInterval();
});

partnerDots.appendChild(dot);
}
});

resetPartnerInterval();
}

function goToPartnerSlide(index) {
if (!partnerTrack || !partnerDots) {
return;
}

currentPartnerIndex = index;

partnerTrack.querySelectorAll(".concours-partner-slide").forEach((slide, slideIndex) => {
slide.classList.toggle("active", slideIndex === index);
});

partnerDots.querySelectorAll(".concours-partner-dot").forEach((dot, dotIndex) => {
dot.classList.toggle("active", dotIndex === index);
});
}

function resetPartnerInterval() {
if (partnerInterval) {
clearInterval(partnerInterval);
partnerInterval = null;
}

const partners = currentConcours.partners || [];

if (partners.length > 1) {
partnerInterval = setInterval(() => {
goToPartnerSlide((currentPartnerIndex + 1) % partners.length);
}, 5000);
}
}

// =========================================================
// NOTIFICATIONS
// =========================================================

function addNotification(message, icon, concoursId) {
const targetId = concoursId || currentConcours.id;

if (!registeredConcours.has(targetId)) {
return;
}

notifications.unshift({
id: Date.now() + Math.random(),
concoursId: targetId,
message: message,
icon: icon || "fa-bell"
});

renderNotifications();
}

function updateNotificationBadge(count) {
if (!notificationBadge) {
return;
}

if (count > 0) {
notificationBadge.classList.remove("hidden");
notificationBadge.textContent = count;
} else {
notificationBadge.classList.add("hidden");
notificationBadge.textContent = "";
}
}

function renderNotifications() {
if (!notificationList || !notificationPanel) {
return;
}

const isRegistered = registeredConcours.has(currentConcours.id);

if (!isRegistered) {
notificationList.innerHTML = `<p class="concours-notification-empty">Aucune notification.</p>`;
updateNotificationBadge(0);
notificationPanel.classList.remove("active");

return;
}

const currentNotifications = notifications.filter(
n => n.concoursId === currentConcours.id
);

notificationList.innerHTML = "";

if (currentNotifications.length === 0) {
notificationList.innerHTML = `<p class="concours-notification-empty">Aucune notification.</p>`;
updateNotificationBadge(0);

return;
}

updateNotificationBadge(currentNotifications.length);

currentNotifications.forEach(notification => {
const item = document.createElement("div");

item.className = "concours-notification-item";

item.innerHTML = `
<i class="fa-solid ${notification.icon}"></i>
<p>${notification.message}</p>
<button type="button" class="concours-notification-delete" data-notification-id="${notification.id}" aria-label="Supprimer">
<i class="fa-solid fa-xmark"></i>
</button>
`;

notificationList.appendChild(item);
});

notificationList.querySelectorAll(".concours-notification-delete").forEach(button => {
button.addEventListener("click", () => {
const id = Number(button.dataset.notificationId);

notifications = notifications.filter(n => n.id !== id);

renderNotifications();
});
});
}

if (notificationButton) {
notificationButton.addEventListener("click", event => {
event.stopPropagation();

if (notificationPanel) {
notificationPanel.classList.toggle("active");
}
});
}

document.addEventListener("click", event => {
if (!event.target.closest(".concours-notification-wrapper")) {
if (notificationPanel) {
notificationPanel.classList.remove("active");
}
}
});

if (notificationClear) {
notificationClear.addEventListener("click", () => {
notifications = notifications.filter(n => n.concoursId !== currentConcours.id);

renderNotifications();
});
}

// =========================================================
// BOUTON D'INSCRIPTION (état visuel)
// =========================================================

function updateRegisterButton() {
if (!registerButton) {
return;
}

const state = getConcoursState();
const entry = registeredConcours.get(currentConcours.id);

registerButton.classList.remove("registered", "pending", "results-btn");
registerButton.disabled = false;

// -----------------------------------------------------
// RÉSULTATS DISPONIBLES
// -----------------------------------------------------

if (state === "results") {
registerButton.classList.add("results-btn");

registerButton.innerHTML = `
<i class="fa-solid fa-trophy"></i>
Voir les résultats
`;

return;
}

// -----------------------------------------------------
// INSCRIT, EN ATTENTE DE VALIDATION
// -----------------------------------------------------

if (entry && entry.status === "pending") {
registerButton.classList.add("pending");

registerButton.innerHTML = `
<i class="fa-solid fa-hourglass-half"></i>
Inscription en cours de traitement
`;

return;
}

// -----------------------------------------------------
// INSCRIT ET VALIDÉ
// -----------------------------------------------------

if (entry && entry.status === "validated") {
registerButton.classList.add("registered");

registerButton.innerHTML = `
<i class="fa-solid fa-user-minus"></i>
Déclarer forfait
`;

return;
}

// -----------------------------------------------------
// PAS ENCORE INSCRIT
// -----------------------------------------------------

registerButton.innerHTML = `
<i class="fa-solid fa-user-plus"></i>
S'inscrire
`;
}

// =========================================================
// INTERFACE PRINCIPALE DU CONCOURS
// =========================================================

// =========================================================
// BLOC RÉSULTATS (texte propre à chaque concours)
// =========================================================

function updateResultsBox() {
const resultsBox = document.getElementById("concoursResultsBox");
const resultsText = document.getElementById("concoursResultsText");
const resultsTextStandalone = document.getElementById("concoursResultsTextStandalone");

const text = currentConcours.resultText || "Les résultats seront communiqués ici.";

if (resultsBox && resultsText) {
if (getConcoursState() === "results") {
resultsBox.classList.remove("hidden");
resultsText.textContent = text;
} else {
resultsBox.classList.add("hidden");
}
}

if (resultsTextStandalone) {
resultsTextStandalone.textContent = text;
}
}

function updateConcoursInterface() {
if (!currentConcours) {
return;
}

updateResultsBox();

if (mainTitle) {
mainTitle.textContent = currentConcours.title;
}

if (mainSubtitle) {
mainSubtitle.textContent = currentConcours.subtitle;
}

if (descriptionText) {
descriptionText.textContent = currentConcours.description;
}

if (infoFull) {
infoFull.innerHTML = `<p>${currentConcours.fullInfo}</p>`;
}

if (pdfLink) {
if (currentConcours.pdfUrl) {
pdfLink.href = currentConcours.pdfUrl;
pdfLink.classList.remove("hidden");
} else {
pdfLink.classList.add("hidden");
}
}

// -----------------------------------------------------
// INFOS CLÉS (période / limite / pays)
// -----------------------------------------------------

if (infoList) {
const flagsHtml = currentConcours.countries.map(code => {
const country = countryList.find(c => c.code === code);

if (!country) {
return "";
}

return `<span class="concours-country-flag">${country.flag} ${country.name}</span>`;
}).join("");

infoList.innerHTML = `
<div class="concours-info-row">
<i class="fa-solid fa-calendar-check"></i>
<div>
<span class="concours-info-label">Période d'inscription</span>
<span class="concours-info-value">
${formatDate(currentConcours.registrationStart)} - ${formatDate(currentConcours.registrationEnd)}
</span>
</div>
</div>

<div class="concours-info-row">
<i class="fa-solid fa-flag-checkered"></i>
<div>
<span class="concours-info-label">Date limite du concours</span>
<span class="concours-info-value">${formatDate(currentConcours.contestDeadline)}</span>
</div>
</div>

<div class="concours-info-row">
<i class="fa-solid fa-earth-africa"></i>
<div>
<span class="concours-info-label">Pays éligibles</span>
<div class="concours-country-flags">${flagsHtml}</div>
</div>
</div>
`;
}

// -----------------------------------------------------
// PANNEAU PUBLICITAIRE
// -----------------------------------------------------

renderPartnerBanner();

// -----------------------------------------------------
// MEMBRES
// -----------------------------------------------------

if (membersText) {
membersText.textContent = `${currentConcours.members} inscrits`;
}

// -----------------------------------------------------
// LIKE
// -----------------------------------------------------

if (likeButton) {
const icon = likeButton.querySelector("i");

if (currentConcours.liked) {
likeButton.classList.add("active");

if (icon) {
icon.classList.remove("fa-regular");
icon.classList.add("fa-solid");
}
} else {
likeButton.classList.remove("active");

if (icon) {
icon.classList.remove("fa-solid");
icon.classList.add("fa-regular");
}
}
}

// -----------------------------------------------------
// NOTIFICATIONS
// -----------------------------------------------------

const isRegistered = registeredConcours.has(currentConcours.id);

if (notificationButton) {
const icon = notificationButton.querySelector("i");

if (isRegistered) {
notificationButton.classList.add("active");

if (icon) {
icon.classList.remove("fa-regular");
icon.classList.add("fa-solid");
}
} else {
notificationButton.classList.remove("active");

if (icon) {
icon.classList.remove("fa-solid");
icon.classList.add("fa-regular");
}
}
}

const notificationCount = notifications.filter(
n => n.concoursId === currentConcours.id
).length;

updateNotificationBadge(isRegistered ? notificationCount : 0);

// -----------------------------------------------------
// CONCOURS SÉLECTIONNÉ
// -----------------------------------------------------

document.querySelectorAll(".concours-selector-item").forEach(item => {
item.classList.toggle(
"selected",
Number(item.dataset.concoursId) === currentConcours.id
);
});

// -----------------------------------------------------
// BOUTON D'INSCRIPTION
// -----------------------------------------------------

updateRegisterButton();
}

// =========================================================
// BARRE DE CONCOURS
// =========================================================

function getVisibleConcours() {
if (currentFilter === "favorites") {
return concoursList.filter(c => c.liked);
}

if (currentFilter === "open") {
return concoursList.filter(c => getStateForConcours(c) === "open");
}

if (currentFilter === "all") {
return concoursList;
}

return concoursList.filter(c => c.category === currentFilter);
}

function renderConcoursSelector() {
if (!concoursTrack) {
return;
}

const scrollPosition = concoursTrack.scrollLeft;

concoursTrack.innerHTML = "";

const visible = getVisibleConcours();

if (visible.length === 0) {
const empty = document.createElement("div");

empty.className = "concours-selector-empty";
empty.textContent = "Aucun concours dans cette catégorie.";

concoursTrack.appendChild(empty);

return;
}

visible.forEach(concours => {
const button = document.createElement("button");

button.type = "button";
button.className = "concours-selector-item";
button.dataset.concoursId = concours.id;
button.classList.add(`status-${getStateForConcours(concours)}`);

if (concours.id === currentConcours.id) {
button.classList.add("selected");
}

button.innerHTML = `
<span class="concours-selector-circle">
<img src="${concours.image}" alt="${concours.title}">
</span>
`;

button.addEventListener("click", () => {
selectConcours(concours.id);
});

concoursTrack.appendChild(button);
});

concoursTrack.scrollLeft = scrollPosition;
}

// =========================================================
// CONCOURS SIMILAIRES
// =========================================================

function renderSimilarConcours() {
if (!similarTrack) {
return;
}

const similar = concoursList
.filter(c => c.id !== currentConcours.id)
.filter(c => {
const sameCategory = c.category === currentConcours.category;
const sharesCountry = c.countries.some(code => currentConcours.countries.includes(code));

return sameCategory || sharesCountry;
})
.slice(0, 5);

similarTrack.innerHTML = "";

if (similar.length === 0) {
similarTrack.innerHTML = `<p class="similar-concours-empty">Aucun concours similaire pour le moment.</p>`;

return;
}

similar.forEach(concours => {
const item = document.createElement("div");

item.className = "similar-concours-item";

item.innerHTML = `
<span class="similar-concours-circle status-${getStateForConcours(concours)}">
<img src="${concours.image}" alt="${concours.title}">
</span>
<span class="similar-concours-name">${concours.title}</span>
`;

item.addEventListener("click", () => {
selectConcours(concours.id);
window.scrollTo({ top: 0, behavior: "smooth" });
});

similarTrack.appendChild(item);
});
}

// =========================================================
// SÉLECTIONNER UN CONCOURS
// =========================================================

function selectConcours(concoursId) {
const selected = concoursList.find(c => c.id === concoursId);

if (!selected) {
return;
}

currentConcours = selected;

showPanel(description);
setActiveButton(null);

updateConcoursInterface();
renderConcoursSelector();
renderNotifications();
renderSimilarConcours();
}

// =========================================================
// BOUTON INFORMATIONS
// =========================================================

if (infoButton) {
infoButton.addEventListener("click", () => {
showPanel(infoContent);
setActiveButton(infoButton);
});
}

document.querySelectorAll(".back-description").forEach(button => {
button.addEventListener("click", () => {
showPanel(description);
setActiveButton(null);
});
});

// =========================================================
// LIKE
// =========================================================

if (likeButton) {
likeButton.addEventListener("click", () => {
currentConcours.liked = !currentConcours.liked;

updateConcoursInterface();

if (currentFilter === "favorites") {
renderConcoursSelector();
}
});
}

// =========================================================
// FILTRES
// =========================================================

filterButtons.forEach(filterButton => {
filterButton.addEventListener("click", () => {
currentFilter = filterButton.dataset.filter;

filterButtons.forEach(button => {
button.classList.remove("active");
});

filterButton.classList.add("active");

renderConcoursSelector();

const visible = getVisibleConcours();

if (visible.length > 0 && !visible.includes(currentConcours)) {
selectConcours(visible[0].id);
}
});
});

// =========================================================
// CLIC SUR LE BOUTON D'INSCRIPTION / FORFAIT / RÉSULTATS
// =========================================================

if (registerButton) {
registerButton.addEventListener("click", () => {
const state = getConcoursState();
const entry = registeredConcours.get(currentConcours.id);

// ---------------------------------------------------
// RÉSULTATS DISPONIBLES
// ---------------------------------------------------

if (state === "results") {
showPanel(resultsContent);
setActiveButton(null);

return;
}

// ---------------------------------------------------
// INSCRIPTION EN ATTENTE DE VALIDATION
// ---------------------------------------------------

if (entry && entry.status === "pending") {
return;
}

// ---------------------------------------------------
// DÉJÀ INSCRIT ET VALIDÉ → DÉCLARER FORFAIT
// ---------------------------------------------------

if (entry && entry.status === "validated") {
if (unregisterModal) {
unregisterModal.classList.add("active");
}

return;
}

// ---------------------------------------------------
// PÉRIODE D'INSCRIPTION TERMINÉE
// ---------------------------------------------------

if (state !== "open") {
addNotification(
"Désolé, la période d'inscription à ce concours est terminée.",
"fa-circle-exclamation",
currentConcours.id
);

alert("Désolé, la période d'inscription à ce concours est passée.");

return;
}

// ---------------------------------------------------
// OUVRIR LA CONFIRMATION PRÉALABLE
// ---------------------------------------------------

if (registrationModal) {
registrationModal.classList.add("active");
}

updateScreenshotOptionVisibility();
});
}

// =========================================================
// CASES DE CONFIRMATION PRÉALABLE
// =========================================================

registrationChecks.forEach(checkbox => {
checkbox.addEventListener("change", () => {
const allChecked = [...registrationChecks].every(item => item.checked);

if (registrationConfirm) {
registrationConfirm.disabled = !allChecked;
}
});
});

if (registrationCancel) {
registrationCancel.addEventListener("click", () => {
closeRegistrationModal();
});
}

function closeRegistrationModal() {
if (registrationModal) {
registrationModal.classList.remove("active");
}

registrationChecks.forEach(checkbox => {
checkbox.checked = false;
});

if (registrationConfirm) {
registrationConfirm.disabled = true;
}
}

// =========================================================
// CONTINUER VERS LE FORMULAIRE
// =========================================================

if (registrationConfirm) {
registrationConfirm.addEventListener("click", () => {
const allChecked = [...registrationChecks].every(item => item.checked);

if (!allChecked) {
return;
}

closeRegistrationModal();
openRegistrationForm();
});
}

// =========================================================
// FORMULAIRE D'INSCRIPTION
// =========================================================

function openRegistrationForm() {
if (concoursForm) {
concoursForm.reset();
}

updatePaymentUI();
updateXPUI();

if (formModal) {
formModal.classList.add("active");
}
}

function closeRegistrationForm() {
if (formModal) {
formModal.classList.remove("active");
}
}

if (formClose) {
formClose.addEventListener("click", closeRegistrationForm);
}

// -----------------------------------------------------
// GESTION MODE D'ACCÈS (XP / paiement)
// -----------------------------------------------------

function updateXPUI() {
const selectedMode = document.querySelector('input[name="accessMode"]:checked');
const mode = selectedMode ? selectedMode.value : "pay";

if (xpRequiredValue) {
xpRequiredValue.textContent = `${currentConcours.xpRequired} XP`;
}

if (xpUserValue) {
xpUserValue.textContent = `${currentUserXP} XP`;
}

if (pseudoHint) {
pseudoHint.textContent = mode === "xp" ? "(obligatoire)" : "(facultatif)";
}

if (regPseudo) {
regPseudo.required = mode === "xp";
}

const hasEnoughXP = currentUserXP >= currentConcours.xpRequired;

if (xpInfoBox) {
xpInfoBox.classList.toggle("active", mode === "xp");
}

// Le paiement reste obligatoire si le mode "xp" est choisi
// mais que l'utilisateur n'a pas assez d'XP.

if (mode === "xp" && hasEnoughXP) {
if (paymentBlock) {
paymentBlock.classList.add("hidden");
}
} else if (!currentConcours.paid) {
if (paymentBlock) {
paymentBlock.classList.add("hidden");
}
} else {
if (paymentBlock) {
paymentBlock.classList.remove("hidden");
}
}

if (regPrixDisplay) {
regPrixDisplay.textContent = currentConcours.paid ? currentConcours.price : "Gratuit";
}
}

accessRadios.forEach(radio => {
radio.addEventListener("change", updateXPUI);
});

// -----------------------------------------------------
// SI LE CONCOURS N'A PAS DE MINIMUM XP DÉFINI (0), CACHER
// -----------------------------------------------------

function refreshXPOptionAvailability() {
if (!xpAccessLabel) {
return;
}

if (!currentConcours.xpRequired || currentConcours.xpRequired <= 0) {
xpAccessLabel.classList.add("disabled");
xpAccessLabel.querySelector("input").disabled = true;
} else {
xpAccessLabel.classList.remove("disabled");
xpAccessLabel.querySelector("input").disabled = false;
}
}

// -----------------------------------------------------
// OPTION "CAPTURE D'ÉCRAN" (activable selon le concours)
// -----------------------------------------------------
/*
* Certains concours autorisent la capture d'écran comme
* preuve de paiement (currentConcours.allowScreenshotPayment),
* d'autres non. Si l'option est retirée alors qu'elle était
* sélectionnée, on retombe sur T-Money par défaut.
*/

function updateScreenshotOptionVisibility() {
if (!screenshotOption) {
return;
}

const allowed = currentConcours.allowScreenshotPayment === true;

screenshotOption.classList.toggle("hidden", !allowed);

const radio = screenshotOption.querySelector('input[name="paymentMethod"]');

if (!allowed && radio && radio.checked) {
const fallback = document.querySelector('input[name="paymentMethod"][value="tmoney"]');

if (fallback) {
fallback.checked = true;
}
}

updatePaymentUI();
}

// -----------------------------------------------------
// MODE DE PAIEMENT
// -----------------------------------------------------

function updatePaymentUI() {
const selected = document.querySelector('input[name="paymentMethod"]:checked');
const method = selected ? selected.value : "tmoney";

[mobileMoneyDetail, cardDetail, bankDetail, screenshotDetail].forEach(el => {
if (el) {
el.classList.add("hidden");
}
});

if (method === "tmoney" || method === "flooz") {
if (mobileMoneyDetail) {
mobileMoneyDetail.classList.remove("hidden");
}
} else if (method === "card") {
if (cardDetail) {
cardDetail.classList.remove("hidden");
}
} else if (method === "bank") {
if (bankDetail) {
bankDetail.classList.remove("hidden");
}
} else if (method === "other") {
if (screenshotDetail) {
screenshotDetail.classList.remove("hidden");
}
}
}

paymentMethodRadios.forEach(radio => {
radio.addEventListener("change", updatePaymentUI);
});

// -----------------------------------------------------
// SOUMISSION DU FORMULAIRE
// -----------------------------------------------------

if (concoursForm) {
concoursForm.addEventListener("submit", event => {
event.preventDefault();

const modeSelected = document.querySelector('input[name="accessMode"]:checked');
const mode = modeSelected ? modeSelected.value : "pay";
const hasEnoughXP = currentUserXP >= currentConcours.xpRequired;

if (mode === "xp" && (!regPseudo || !regPseudo.value.trim())) {
regPseudo.focus();
return;
}

const freeEntry = currentConcours.paid === false || (mode === "xp" && hasEnoughXP);

const code = generateCode();

registeredConcours.set(currentConcours.id, {
status: "pending",
code: code,
freeEntry: freeEntry
});

currentConcours.members++;

closeRegistrationForm();

if (codeDisplay) {
codeDisplay.textContent = code;
}

if (codeModal) {
codeModal.classList.add("active");
}

addNotification(
`Votre inscription à "${currentConcours.title}" est en cours de traitement. Vous recevrez un message de confirmation.`,
"fa-hourglass-half",
currentConcours.id
);

updateConcoursInterface();
renderNotifications();

// -------------------------------------------------
// VALIDATION AUTOMATIQUE (simulation backend)
// -------------------------------------------------

const concoursIdToValidate = currentConcours.id;

if (validationTimers[concoursIdToValidate]) {
clearTimeout(validationTimers[concoursIdToValidate]);
}

validationTimers[concoursIdToValidate] = setTimeout(() => {
const entry = registeredConcours.get(concoursIdToValidate);

if (!entry) {
return;
}

entry.status = "validated";

const concoursRef = concoursList.find(c => c.id === concoursIdToValidate);

addNotification(
`Votre inscription à "${concoursRef.title}" est validée. Vous êtes officiellement inscrit !`,
"fa-circle-check",
concoursIdToValidate
);

if (currentConcours.id === concoursIdToValidate) {
updateConcoursInterface();
}

renderNotifications();
}, 8000);
});
}

if (codeClose) {
codeClose.addEventListener("click", () => {
if (codeModal) {
codeModal.classList.remove("active");
}
});
}

// =========================================================
// DÉCLARER FORFAIT
// =========================================================

if (unregisterNo) {
unregisterNo.addEventListener("click", () => {
if (unregisterModal) {
unregisterModal.classList.remove("active");
}
});
}

if (unregisterYes) {
unregisterYes.addEventListener("click", () => {
if (unregisterModal) {
unregisterModal.classList.remove("active");
}

if (codeCheckInput) {
codeCheckInput.value = "";
}

if (codeCheckError) {
codeCheckError.classList.add("hidden");
}

if (codeCheckModal) {
codeCheckModal.classList.add("active");
}
});
}

if (codeCheckCancel) {
codeCheckCancel.addEventListener("click", () => {
if (codeCheckModal) {
codeCheckModal.classList.remove("active");
}
});
}

if (codeCheckConfirm) {
codeCheckConfirm.addEventListener("click", () => {
const entry = registeredConcours.get(currentConcours.id);

if (!entry) {
return;
}

const enteredCode = codeCheckInput ? codeCheckInput.value.trim().toUpperCase() : "";

if (enteredCode !== entry.code) {
if (codeCheckError) {
codeCheckError.classList.remove("hidden");
}

return;
}

registeredConcours.delete(currentConcours.id);

if (validationTimers[currentConcours.id]) {
clearTimeout(validationTimers[currentConcours.id]);
delete validationTimers[currentConcours.id];
}

notifications = notifications.filter(n => n.concoursId !== currentConcours.id);

if (currentConcours.members > 0) {
currentConcours.members--;
}

if (codeCheckModal) {
codeCheckModal.classList.remove("active");
}

showPanel(description);
setActiveButton(null);

updateConcoursInterface();
renderNotifications();
});
}

// =========================================================
// SURVEILLANCE DES CHANGEMENTS D'ÉTAT (vert / rouge / bleu)
// =========================================================

function checkConcoursNotifications() {
concoursList.forEach(concours => {
const state = getStateForConcours(concours);
const previousState = lastConcoursStates[concours.id];

if (previousState === undefined) {
lastConcoursStates[concours.id] = state;
return;
}

if (previousState === state) {
return;
}

lastConcoursStates[concours.id] = state;

if (!registeredConcours.has(concours.id)) {
return;
}

if (state === "ongoing") {
addNotification(
`Le concours "${concours.title}" arrive à échéance : les inscriptions sont maintenant fermées.`,
"fa-flag-checkered",
concours.id
);
}

if (state === "results") {
addNotification(
`Les résultats de "${concours.title}" sont maintenant disponibles !`,
"fa-trophy",
concours.id
);
}
});

renderConcoursSelector();

if (currentConcours) {
updateRegisterButton();
updateResultsBox();
}
}

setInterval(checkConcoursNotifications, 15000);

// =========================================================
// SECTION RÉCLAMATION
// =========================================================

const reclamationToggle = document.getElementById("reclamationToggle");
const reclamationFormWrapper = document.getElementById("reclamationFormWrapper");
const reclamationClose = document.getElementById("reclamationClose");
const reclamationForm = document.getElementById("reclamationForm");
const reclamationType = document.getElementById("reclamationType");
const rewardDisclaimer = document.getElementById("rewardDisclaimer");
const xpDisclaimer = document.getElementById("xpDisclaimer");
const registrationDisclaimer = document.getElementById("registrationDisclaimer");
const otherReclamationWrapper = document.getElementById("otherReclamationWrapper");

if (reclamationToggle) {
reclamationToggle.addEventListener("click", () => {
if (reclamationFormWrapper) {
reclamationFormWrapper.classList.toggle("active");
}
});
}

if (reclamationClose) {
reclamationClose.addEventListener("click", () => {
if (reclamationFormWrapper) {
reclamationFormWrapper.classList.remove("active");
}
});
}

function updateReclamationDisclaimers() {
if (!reclamationType) {
return;
}

const value = reclamationType.value;

[rewardDisclaimer, xpDisclaimer, registrationDisclaimer].forEach(el => {
if (el) {
el.classList.remove("active");
}
});

if (otherReclamationWrapper) {
otherReclamationWrapper.classList.remove("active");
}

if (value === "reward" && rewardDisclaimer) {
rewardDisclaimer.classList.add("active");
}

if (value === "xp" && xpDisclaimer) {
xpDisclaimer.classList.add("active");
}

if (value === "registration" && registrationDisclaimer) {
registrationDisclaimer.classList.add("active");
}

if (value === "other" && otherReclamationWrapper) {
otherReclamationWrapper.classList.add("active");
}
}

if (reclamationType) {
reclamationType.addEventListener("change", updateReclamationDisclaimers);
}

if (reclamationForm) {
reclamationForm.addEventListener("submit", event => {
event.preventDefault();

alert("Votre réclamation a bien été envoyée. Notre équipe la traitera dans les meilleurs délais.");

reclamationForm.reset();
updateReclamationDisclaimers();

if (reclamationFormWrapper) {
reclamationFormWrapper.classList.remove("active");
}
});
}

// =========================================================
// AGRANDIR LA BARRE DE CONCOURS (vue grille)
// =========================================================

const concoursSelector = document.getElementById("concours-selector");
const selectorExpandBtn = document.getElementById("concours-selector-expand");

if (concoursSelector && selectorExpandBtn) {
selectorExpandBtn.addEventListener("click", () => {
concoursSelector.classList.toggle("expanded");

const icon = selectorExpandBtn.querySelector("i");
const expanded = concoursSelector.classList.contains("expanded");

if (icon) {
icon.classList.toggle("fa-expand", !expanded);
icon.classList.toggle("fa-compress", expanded);
}

selectorExpandBtn.setAttribute(
"aria-label",
expanded ? "Réduire la liste des concours" : "Agrandir la liste des concours"
);
});
}

// =========================================================
// AFFICHER / MASQUER LES FILTRES (intégrés à la barre)
// =========================================================

const selectorFilterToggleBtn = document.getElementById("concours-selector-filter-toggle");

if (concoursSelector && selectorFilterToggleBtn) {
selectorFilterToggleBtn.addEventListener("click", () => {
concoursSelector.classList.toggle("filters-open");

const open = concoursSelector.classList.contains("filters-open");

selectorFilterToggleBtn.classList.toggle("active", open);

selectorFilterToggleBtn.setAttribute(
"aria-label",
open ? "Masquer les filtres" : "Afficher les filtres"
);
});
}

// =========================================================
// RÉDUCTION DE LA BARRE AU SCROLL
// =========================================================

const selectorPeekBtn = document.getElementById("concours-selector-peek");
const SCROLL_COLLAPSE_THRESHOLD = 40;

function updateSelectorScrollState() {
if (!concoursSelector || !selectorPeekBtn) {
return;
}

const scrolled = window.scrollY > SCROLL_COLLAPSE_THRESHOLD;

concoursSelector.classList.toggle("collapsed", scrolled);
selectorPeekBtn.classList.toggle("visible", scrolled);
}

window.addEventListener("scroll", updateSelectorScrollState, { passive: true });

if (selectorPeekBtn) {
selectorPeekBtn.addEventListener("click", () => {
if (concoursSelector) {
concoursSelector.classList.remove("collapsed");
}

selectorPeekBtn.classList.remove("visible");
});
}

updateSelectorScrollState();

// =========================================================
// INITIALISATION
// =========================================================

populateCountrySelect();
refreshXPOptionAvailability();

showPanel(description);
setActiveButton(null);

renderConcoursSelector();
renderNotifications();
renderSimilarConcours();
updateConcoursInterface();

});
