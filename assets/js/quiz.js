document.addEventListener("DOMContentLoaded", () => {

// =========================================================
// DONNÉES DES QUIZ
// =========================================================

const quizzes = [
{
id: 1,
title: "La Question Du Mois",
subtitle: "Tentez de gagner 5000 FCFA",
category: "culture",
frequency: "monthly",
image: "../assets/images/quiz/question-du-mois.jpg",
members: 128,
liked: false,
notifications: false,
xpReward: 100,
question: "Quelle est votre réponse à la question du mois ?",
winner: "—",
correctParticipants: [],
startTime: "2026-08-10T17:02:00Z",
endTime: "2026-08-13T17:02:30Z",
resultsTime: "2026-08-14T17:03:00Z",
partners: [
{
name: "GeekOtaku",
eyebrow: "Partenaire officiel",
text: "GeekOtaku récompense les gagnants de ce quiz avec des goodies exclusifs édition limitée.",
cta: "En savoir plus sur GeekOtaku",
color: "#1479d1, #0d3b66"
},
{
name: "CultureBox",
eyebrow: "Sponsor de l'édition",
text: "CultureBox soutient la communauté QuizTable en offrant des box surprises aux participants.",
cta: "En savoir plus sur CultureBox",
color: "#7b2ff7, #3a0ca3"
}
]
},
{
id: 2,
title: "Quiz Manga",
subtitle: "Testez vos connaissances sur les mangas",
category: "manga",
frequency: "daily",
image: "../assets/images/quiz/question-du-mois.jpg",
members: 94,
liked: false,
notifications: false,
xpReward: 100,
question: "Quel est votre manga préféré et pourquoi ?",
winner: "—",
correctParticipants: [],
startTime: "2026-08-10T15:10:00Z",
endTime: "2026-08-11T00:11:00Z",
resultsTime: "2026-08-11T00:12:00Z",
partners: [
{
name: "MangaZone",
eyebrow: "Partenaire officiel",
text: "MangaZone offre des tomes dédicacés aux meilleurs participants de ce quiz.",
cta: "En savoir plus sur MangaZone",
color: "#ff4ecd, #6a00f4"
}
]
},
{
id: 3,
title: "Quiz Anime",
subtitle: "Quel fan d'anime êtes-vous ?",
category: "manga",
frequency: "daily",
image: "../assets/images/quiz/question-du-mois.jpg",
members: 76,
liked: false,
notifications: false,
xpReward: 100,
question: "Quel anime vous a le plus marqué ?",
winner: "—",
correctParticipants: [],
startTime: "2026-08-11T00:10:00Z",
endTime: "2026-08-11T00:11:00Z",
resultsTime: "2026-08-11T00:12:00Z",
partners: [
{
name: "AnimeVerse",
eyebrow: "Partenaire officiel",
text: "AnimeVerse propose un accès premium gratuit d'un mois aux gagnants de ce quiz.",
cta: "En savoir plus sur AnimeVerse",
color: "#ff6a00, #ee0979"
}
]
},
{
id: 4,
title: "Quiz Gaming",
subtitle: "Testez votre culture vidéoludique",
category: "gaming",
frequency: "special",
image: "../assets/images/quiz/question-du-mois.jpg",
members: 112,
liked: false,
notifications: false,
xpReward: 100,
question: "Quel jeu vidéo a marqué votre enfance ?",
winner: "—",
correctParticipants: [],
startTime: "2026-08-11T00:10:00Z",
endTime: "2026-08-11T00:11:00Z",
resultsTime: "2026-08-11T00:12:00Z",
partners: [
{
name: "GameHub",
eyebrow: "Sponsor de l'édition spéciale",
text: "GameHub met en jeu des cartes cadeaux pour les participants de ce quiz spécial.",
cta: "En savoir plus sur GameHub",
color: "#00c6ff, #0072ff"
}
]
},
{
id: 5,
title: "Quiz Cinéma",
subtitle: "Les grands classiques du cinéma",
category: "cinema",
frequency: "yearly",
image: "../assets/images/quiz/question-du-mois.jpg",
members: 83,
liked: false,
notifications: false,
xpReward: 100,
question: "Quel film considérez-vous comme un classique incontournable ?",
winner: "—",
correctParticipants: [],
startTime: "2026-08-11T00:10:00Z",
endTime: "2026-08-11T00:11:00Z",
resultsTime: "2026-08-11T00:12:00Z",
partners: [
{
name: "CineClub",
eyebrow: "Partenaire officiel",
text: "CineClub offre des places de cinéma aux gagnants de cette édition annuelle.",
cta: "En savoir plus sur CineClub",
color: "#232526, #414345"
}
]
},
{
id: 6,
title: "Culture Africaine",
subtitle: "Découvrez la richesse des cultures africaines",
category: "culture",
frequency: "monthly",
image: "../assets/images/quiz/question-du-mois.jpg",
members: 105,
liked: false,
notifications: false,
xpReward: 100,
question: "Quelle tradition africaine souhaitez-vous mettre en avant ?",
winner: "—",
correctParticipants: [],
startTime: "2026-08-11T00:10:00Z",
endTime: "2026-08-11T00:11:00Z",
resultsTime: "2026-08-11T00:12:00Z",
partners: [
{
name: "AfrikRoots",
eyebrow: "Partenaire officiel",
text: "AfrikRoots valorise le patrimoine culturel africain et récompense les participants les plus créatifs.",
cta: "En savoir plus sur AfrikRoots",
color: "#f7971e, #ffd200"
}
]
},
{
id: 7,
title: "Pop Culture",
subtitle: "Un mélange de culture pop",
category: "culture",
frequency: "special",
image: "../assets/images/quiz/question-du-mois.jpg",
members: 67,
liked: false,
notifications: false,
xpReward: 100,
question: "Quel élément de la pop culture représente le mieux votre génération ?",
winner: "—",
correctParticipants: [],
startTime: "2026-08-11T00:10:00Z",
endTime: "2026-08-11T00:11:00Z",
resultsTime: "2026-08-11T00:12:00Z",
partners: [
{
name: "PopWave",
eyebrow: "Sponsor de l'édition",
text: "PopWave offre des abonnements exclusifs aux fans de pop culture les plus actifs.",
cta: "En savoir plus sur PopWave",
color: "#e53935, #b71c1c"
}
]
}
];

// =========================================================
// ÉTAT GLOBAL
// =========================================================

let currentQuiz = quizzes[0];
let currentFilter = "all";

const registeredQuizzes = new Set();
const answeredQuizzes = new Set();

let notifications = [];
let lastQuizStates = {};
let currentCountdownState = null;
let countdownInterval = null;
let showResultsPanel = false;

let currentPartnerIndex = 0;
let partnerInterval = null;

// =========================================================
// ÉLÉMENTS HTML
// =========================================================

const description = document.getElementById("quiz-description");
const rules = document.getElementById("quiz-rules-content");
const history = document.getElementById("quiz-history-content");
const game = document.getElementById("quiz-game-content");
const rulesButton = document.querySelector(".quiz-rules");
const historyButton = document.querySelector(".quiz-history");
const playButton = document.querySelector(".quiz-play-btn");
const registerButton = document.querySelector(".quiz-register-btn");
const notificationButton = document.querySelector(".quiz-notification");
const notificationBadge = document.querySelector(".quiz-notification-badge");
const notificationPanel = document.querySelector(".quiz-notification-panel");
const notificationList = document.querySelector(".quiz-notification-list");
const notificationClear = document.querySelector(".quiz-notification-clear");
const likeButton = document.querySelector(".quiz-like");
const membersText = document.querySelector(".quiz-members span");
const mainTitle = document.getElementById("quiz-main-title");
const mainSubtitle = document.getElementById("quiz-main-subtitle");
const descriptionText = document.getElementById("quiz-description-text");
const countValues = document.querySelectorAll(".count-value");
const countDays = countValues[0];
const countHours = countValues[1];
const countMinutes = countValues[2];
const countSeconds = document.getElementById("count-seconds");
const countStatus = document.querySelector(".count-status");
const countdownContainer = document.querySelector(".quiz-countdown");
const registrationModal = document.querySelector(".quiz-registration-modal");
const registrationChecks = document.querySelectorAll(".registration-check");
const registrationConfirm = document.querySelector(".registration-confirm");
const registrationCancel = document.querySelector(".registration-cancel");
const unregisterModal = document.querySelector(".quiz-unregister-modal");
const unregisterNo = document.querySelector(".unregister-no");
const unregisterYes = document.querySelector(".unregister-yes");
const filterButtons = document.querySelectorAll(".quiz-filter");
const quizTrack = document.getElementById("quiz-selector-track");
const sendButton = document.querySelector(".quiz-send-btn");
const partnerTrack = document.getElementById("quiz-partner-track");
const partnerDots = document.getElementById("quiz-partner-dots");

// =========================================================
// PANNEAUX
// =========================================================

function showPanel(panel) {
document.querySelectorAll(".quiz-panel-content").forEach(item => {
item.classList.remove("active");
});

if (panel) {
panel.classList.add("active");
}
}

// =========================================================
// BOUTON ACTIF
// =========================================================

function setActiveButton(button) {
[rulesButton, historyButton, playButton].forEach(item => {
if (item) {
item.classList.remove("active");
}
});

if (button) {
button.classList.add("active");
}
}

// =========================================================
// BOUTON JOUER
// =========================================================

function updatePlayButton() {
if (!playButton) {
return;
}

const content = playButton.querySelector(".play-button-content");

if (content) {
const icon = content.querySelector("i");

if (icon) {
icon.className = "fa-solid fa-play";
}
}

playButton.classList.remove("session-finished");
playButton.setAttribute("aria-label", "Jouer");
}

// =========================================================
// BOUTON LIVE
// =========================================================
/*
* Le bouton LIVE ne calcule aucune heure lui-même.
* Il demande à CHAQUE quiz de la barre quel est son propre état
* (via getStateForQuiz), et non plus seulement l'état du quiz
* actuellement sélectionné (currentQuiz).
*/

function applyLiveClasses(container) {
if (!container) {
return;
}

const quizButtons = container.querySelectorAll(".quiz-selector-item");

quizButtons.forEach(button => {
const quizId = Number(button.dataset.quizId);
const quiz = quizzes.find(item => item.id === quizId);

if (!quiz) {
button.classList.remove("quiz-live");
return;
}

const state = getStateForQuiz(quiz).state;

button.classList.toggle("quiz-live", state === "playing");
});
}

function updateLiveButton() {
applyLiveClasses(quizTrack);
applyLiveClasses(document.getElementById("quiz-similar-track"));
}

// =========================================================
// PANNEAU PUBLICITAIRE (partenaires)
// =========================================================

function renderPartnerBanner() {
if (!partnerTrack || !partnerDots) {
return;
}

const partners = currentQuiz.partners || [];

partnerTrack.innerHTML = "";
partnerDots.innerHTML = "";

currentPartnerIndex = 0;

if (partners.length === 0) {
resetPartnerInterval();
return;
}

partners.forEach((partner, index) => {
const slide = document.createElement("div");

slide.className = "quiz-partner-slide";

if (index === 0) {
slide.classList.add("active");
}

slide.style.backgroundImage =
`linear-gradient(135deg, ${partner.color})`;

slide.innerHTML = `
<span class="quiz-partner-eyebrow">${partner.eyebrow}</span>
<h3 class="quiz-partner-name">${partner.name}</h3>
<p class="quiz-partner-text">${partner.text}</p>
<button type="button" class="quiz-partner-cta">
${partner.cta}
<i class="fa-solid fa-arrow-right"></i>
</button>
`;

partnerTrack.appendChild(slide);

if (partners.length > 1) {
const dot = document.createElement("button");

dot.type = "button";
dot.className = "quiz-partner-dot";

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

partnerTrack.querySelectorAll(".quiz-partner-slide").forEach((slide, slideIndex) => {
slide.classList.toggle("active", slideIndex === index);
});

partnerDots.querySelectorAll(".quiz-partner-dot").forEach((dot, dotIndex) => {
dot.classList.toggle("active", dotIndex === index);
});
}

// =========================================================
// DÉFILEMENT AUTOMATIQUE DU PANNEAU PUBLICITAIRE
// =========================================================

function resetPartnerInterval() {
if (partnerInterval) {
clearInterval(partnerInterval);
partnerInterval = null;
}

const partners = currentQuiz.partners || [];

if (partners.length > 1) {
partnerInterval = setInterval(() => {
goToPartnerSlide((currentPartnerIndex + 1) % partners.length);
}, 5000);
}
}

// =========================================================
// NOTIFICATIONS
// =========================================================

function addNotification(message, icon = "fa-bell") {
if (!registeredQuizzes.has(currentQuiz.id)) {
return;
}

notifications.unshift({
id: Date.now() + Math.random(),
quizId: currentQuiz.id,
message: message,
icon: icon
});

renderNotifications();
}

function updateNotificationBadge(count) {
if (!notificationBadge) {
return;
}

if (count > 0) {
notificationBadge.hidden = false;
notificationBadge.classList.remove("hidden");
notificationBadge.textContent = count;
} else {
notificationBadge.hidden = true;
notificationBadge.classList.add("hidden");
notificationBadge.textContent = "";
}
}

function renderNotifications() {
if (!notificationList || !notificationPanel) {
return;
}

const isRegistered = registeredQuizzes.has(currentQuiz.id);

if (!isRegistered) {
notificationList.innerHTML = `
<p class="quiz-notification-empty">
Aucune notification.
</p>
`;

updateNotificationBadge(0);
notificationPanel.classList.remove("active");

return;
}

const currentNotifications = notifications.filter(
notification => notification.quizId === currentQuiz.id
);

notificationList.innerHTML = "";

if (currentNotifications.length === 0) {
notificationList.innerHTML = `
<p class="quiz-notification-empty">
Aucune notification.
</p>
`;

updateNotificationBadge(0);

return;
}

updateNotificationBadge(currentNotifications.length);

currentNotifications.forEach(notification => {
const item = document.createElement("div");

item.className = "quiz-notification-item";

item.innerHTML = `
<i class="fa-solid ${notification.icon}"></i>

<p>
${notification.message}
</p>

<button
type="button"
class="quiz-notification-delete"
data-notification-id="${notification.id}"
aria-label="Supprimer">

<i class="fa-solid fa-xmark"></i>

</button>
`;

notificationList.appendChild(item);
});

notificationList.querySelectorAll(".quiz-notification-delete").forEach(button => {
button.addEventListener("click", () => {
const id = Number(button.dataset.notificationId);

notifications = notifications.filter(notification => notification.id !== id);

renderNotifications();
});
});
}

// =========================================================
// OUVERTURE NOTIFICATIONS
// =========================================================

if (notificationButton) {
notificationButton.addEventListener("click", event => {
if (!registeredQuizzes.has(currentQuiz.id)) {
return;
}

event.stopPropagation();

if (notificationPanel) {
notificationPanel.classList.toggle("active");
}
});
}

document.addEventListener("click", event => {
if (!event.target.closest(".quiz-notification-wrapper")) {
if (notificationPanel) {
notificationPanel.classList.remove("active");
}
}
});

// =========================================================
// SUPPRIMER LES NOTIFICATIONS
// =========================================================

if (notificationClear) {
notificationClear.addEventListener("click", () => {
if (!registeredQuizzes.has(currentQuiz.id)) {
return;
}

notifications = notifications.filter(
notification => notification.quizId !== currentQuiz.id
);

renderNotifications();
});
}

// =========================================================
// INTERFACE PRINCIPALE DU QUIZ
// =========================================================

function updateQuizInterface() {
if (!currentQuiz) {
return;
}

// -----------------------------------------------------
// TITRE
// -----------------------------------------------------

if (mainTitle) {
mainTitle.textContent = currentQuiz.title;
}

if (mainSubtitle) {
mainSubtitle.textContent = currentQuiz.subtitle;
}

if (descriptionText) {
descriptionText.textContent =
`Découvrez ${currentQuiz.title} de QuizTable. Participez au quiz, testez vos connaissances et tentez de remporter la récompense mise en jeu.`;
}

// -----------------------------------------------------
// PANNEAU PUBLICITAIRE
// -----------------------------------------------------

renderPartnerBanner();

// -----------------------------------------------------
// MEMBRES
// -----------------------------------------------------

if (membersText) {
membersText.textContent = `${currentQuiz.members} inscrits`;
}

// -----------------------------------------------------
// LIKE
// -----------------------------------------------------

if (likeButton) {
const likeIcon = likeButton.querySelector("i");

if (currentQuiz.liked) {
likeButton.classList.add("active");

if (likeIcon) {
likeIcon.classList.remove("fa-regular");
likeIcon.classList.add("fa-solid");
}
} else {
likeButton.classList.remove("active");

if (likeIcon) {
likeIcon.classList.remove("fa-solid");
likeIcon.classList.add("fa-regular");
}
}
}

// -----------------------------------------------------
// NOTIFICATIONS
// -----------------------------------------------------

const isRegistered = registeredQuizzes.has(currentQuiz.id);

if (notificationButton) {
const notificationIcon = notificationButton.querySelector("i");

if (isRegistered) {
currentQuiz.notifications = true;

notificationButton.classList.add("active");

if (notificationIcon) {
notificationIcon.classList.remove("fa-regular");
notificationIcon.classList.add("fa-solid");
}
} else {
currentQuiz.notifications = false;

notificationButton.classList.remove("active");

if (notificationIcon) {
notificationIcon.classList.remove("fa-solid");
notificationIcon.classList.add("fa-regular");
}
}
}

// -----------------------------------------------------
// BADGE NOTIFICATIONS
// -----------------------------------------------------

const notificationCount = notifications.filter(
notification => notification.quizId === currentQuiz.id
).length;

updateNotificationBadge(isRegistered ? notificationCount : 0);

// -----------------------------------------------------
// QUIZ SÉLECTIONNÉ
// -----------------------------------------------------

document.querySelectorAll(".quiz-selector-item").forEach(item => {
item.classList.toggle(
"selected",
Number(item.dataset.quizId) === currentQuiz.id
);
});

// -----------------------------------------------------
// INSCRIPTION
// -----------------------------------------------------

if (registerButton) {
if (isRegistered) {
registerButton.classList.add("registered");

registerButton.innerHTML = `
<i class="fa-solid fa-user-minus"></i>
Se désinscrire
`;

if (playButton) {
playButton.classList.remove("hidden");
}
} else {
registerButton.classList.remove("registered");

registerButton.innerHTML = `
<i class="fa-solid fa-user-plus"></i>
S'inscrire
`;

if (playButton) {
playButton.classList.add("hidden");
}
}
}

// -----------------------------------------------------
// COMPTEUR
// -----------------------------------------------------

currentCountdownState = null;
showResultsPanel = false;

updateQuizCountdown();
updatePlayButton();
}

// =========================================================
// BARRE DES QUIZ
// =========================================================

function getVisibleQuizzes() {
if (currentFilter === "favorites") {
return quizzes.filter(quiz => quiz.liked);
}

if (currentFilter === "live") {
return quizzes.filter(quiz => getStateForQuiz(quiz).state === "playing");
}

if (currentFilter === "all") {
return quizzes;
}

return quizzes.filter(quiz => quiz.frequency === currentFilter);
}

function renderQuizSelector() {
if (!quizTrack) {
return;
}

const scrollPosition = quizTrack.scrollLeft; // on mémorise la position

quizTrack.innerHTML = "";

const visibleQuizzes = getVisibleQuizzes();

// -----------------------------------------------------
// AUCUN QUIZ
// -----------------------------------------------------

if (visibleQuizzes.length === 0) {
const empty = document.createElement("div");

empty.className = "quiz-selector-empty";
empty.textContent = "Aucun quiz dans cette catégorie.";

quizTrack.appendChild(empty);

return;
}

// -----------------------------------------------------
// CRÉATION DES QUIZ
// -----------------------------------------------------

visibleQuizzes.forEach(quiz => {
const button = document.createElement("button");

button.type = "button";
button.className = "quiz-selector-item";
button.dataset.quizId = quiz.id;

// -------------------------------------------------
// QUIZ SÉLECTIONNÉ
// -------------------------------------------------

if (quiz.id === currentQuiz.id) {
button.classList.add("selected");
}

// -------------------------------------------------
// CONTENU DU BOUTON
// -------------------------------------------------

button.innerHTML = `
<span class="quiz-selector-circle">
<img
src="${quiz.image}"
alt="${quiz.title}"
>
</span>
`;

// -------------------------------------------------
// CLICK
// -------------------------------------------------

button.addEventListener("click", () => {
selectQuiz(quiz.id);
});

quizTrack.appendChild(button);
});

// -----------------------------------------------------
// SYNCHRONISATION DU LIVE
// -----------------------------------------------------

updateLiveButton();
quizTrack.scrollLeft = scrollPosition;
}

// =========================================================
// QUIZ SIMILAIRES
// =========================================================
/*
* Critère : même fréquence (journalier/mensuel/annuel/spécial)
* en priorité, complété si besoin par même récompense XP,
* jusqu'à 5 quiz maximum (hors quiz actuellement sélectionné).
*/

function getSimilarQuizzes() {
const others = quizzes.filter(quiz => quiz.id !== currentQuiz.id);

const sameFrequency = others.filter(
quiz => quiz.frequency === currentQuiz.frequency
);

const result = [...sameFrequency];

if (result.length < 5) {
const sameReward = others.filter(
quiz =>
quiz.xpReward === currentQuiz.xpReward &&
!result.includes(quiz)
);

result.push(...sameReward);
}

return result.slice(0, 5);
}

function renderSimilarQuizzes() {
const similarTrack = document.getElementById("quiz-similar-track");

if (!similarTrack) {
return;
}

similarTrack.innerHTML = "";

const similarQuizzes = getSimilarQuizzes();

if (similarQuizzes.length === 0) {
const empty = document.createElement("p");

empty.className = "quiz-selector-empty";
empty.textContent = "Aucun quiz similaire pour le moment.";

similarTrack.appendChild(empty);

return;
}

similarQuizzes.forEach(quiz => {
const button = document.createElement("button");

button.type = "button";
button.className = "quiz-selector-item";
button.dataset.quizId = quiz.id;

button.innerHTML = `
<span class="quiz-selector-circle">
<img
src="${quiz.image}"
alt="${quiz.title}"
>
</span>
`;

button.addEventListener("click", () => {
selectQuiz(quiz.id);
window.scrollTo({ top: 0, behavior: "smooth" });
});

similarTrack.appendChild(button);
});

applyLiveClasses(similarTrack);
}

// =========================================================
// SÉLECTIONNER UN QUIZ
// =========================================================

function selectQuiz(quizId) {
const selectedQuiz = quizzes.find(quiz => quiz.id === quizId);

if (!selectedQuiz) {
return;
}

currentQuiz = selectedQuiz;
showResultsPanel = false;

showPanel(description);
setActiveButton(null);

updateQuizInterface();
renderQuizSelector();
renderSimilarQuizzes();
renderNotifications();
}

// =========================================================
// RÈGLES
// =========================================================

if (rulesButton) {
rulesButton.addEventListener("click", () => {
showPanel(rules);
setActiveButton(rulesButton);
});
}

// =========================================================
// HISTORIQUE
// =========================================================

if (historyButton) {
historyButton.addEventListener("click", () => {
showPanel(history);
setActiveButton(historyButton);
});
}

// =========================================================
// JOUER
// =========================================================

if (playButton) {
playButton.addEventListener("click", () => {
if (!registeredQuizzes.has(currentQuiz.id)) {
return;
}

showResultsPanel = false;

showPanel(game);
setActiveButton(playButton);

updateGameInterface();
});
}

// =========================================================
// INSCRIPTION
// =========================================================

if (registerButton) {
registerButton.addEventListener("click", () => {
if (registeredQuizzes.has(currentQuiz.id)) {
if (unregisterModal) {
unregisterModal.classList.add("active");
}

return;
}

if (registrationModal) {
registrationModal.classList.add("active");
}
});
}

// =========================================================
// CASES D'INSCRIPTION
// =========================================================

registrationChecks.forEach(checkbox => {
checkbox.addEventListener("change", () => {
const allChecked = [...registrationChecks].every(item => item.checked);

if (registrationConfirm) {
registrationConfirm.disabled = !allChecked;
}
});
});

// =========================================================
// ANNULER INSCRIPTION
// =========================================================

if (registrationCancel) {
registrationCancel.addEventListener("click", () => {
if (registrationModal) {
registrationModal.classList.remove("active");
}

registrationChecks.forEach(checkbox => {
checkbox.checked = false;
});

if (registrationConfirm) {
registrationConfirm.disabled = true;
}
});
}

// =========================================================
// CONFIRMER INSCRIPTION
// =========================================================

if (registrationConfirm) {
registrationConfirm.addEventListener("click", () => {
const allChecked = [...registrationChecks].every(item => item.checked);

if (!allChecked) {
return;
}

registeredQuizzes.add(currentQuiz.id);

currentQuiz.members++;
currentQuiz.notifications = true;

if (registrationModal) {
registrationModal.classList.remove("active");
}

registrationChecks.forEach(checkbox => {
checkbox.checked = false;
});

registrationConfirm.disabled = true;

addNotification(
`Vous êtes maintenant inscrit à "${currentQuiz.title}". Vous recevrez les notifications liées à ce quiz.`,
"fa-bell"
);

updateQuizInterface();
renderNotifications();

showPanel(description);
setActiveButton(null);
});
}

// =========================================================
// ANNULER DÉSINSCRIPTION
// =========================================================

if (unregisterNo) {
unregisterNo.addEventListener("click", () => {
if (unregisterModal) {
unregisterModal.classList.remove("active");
}
});
}

// =========================================================
// CONFIRMER DÉSINSCRIPTION
// =========================================================

if (unregisterYes) {
unregisterYes.addEventListener("click", () => {
registeredQuizzes.delete(currentQuiz.id);

currentQuiz.notifications = false;

notifications = notifications.filter(
notification => notification.quizId !== currentQuiz.id
);

if (currentQuiz.members > 0) {
currentQuiz.members--;
}

if (unregisterModal) {
unregisterModal.classList.remove("active");
}

showPanel(description);
setActiveButton(null);

updateQuizInterface();
renderNotifications();
});
}

// =========================================================
// RETOUR DESCRIPTION
// =========================================================

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
currentQuiz.liked = !currentQuiz.liked;

updateQuizInterface();

if (currentFilter === "favorites") {
renderQuizSelector();
}
});
}

// =========================================================
// FILTRES (barre du bas)
// =========================================================

filterButtons.forEach(filterButton => {
filterButton.addEventListener("click", () => {
currentFilter = filterButton.dataset.filter;

filterButtons.forEach(button => {
button.classList.remove("active");
});

filterButton.classList.add("active");

renderQuizSelector();

const visibleQuizzes = getVisibleQuizzes();

if (visibleQuizzes.length > 0 && !visibleQuizzes.includes(currentQuiz)) {
selectQuiz(visibleQuizzes[0].id);
}
});
});

// =========================================================
// COMPTEUR
// =========================================================

function updateCountdownDisplay(totalSeconds) {
totalSeconds = Math.max(0, Math.floor(totalSeconds));

const days = Math.floor(totalSeconds / 86400);
const hours = Math.floor((totalSeconds % 86400) / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = totalSeconds % 60;

if (countDays) {
countDays.textContent = String(days).padStart(2, "0");
}

if (countHours) {
countHours.textContent = String(hours).padStart(2, "0");
}

if (countMinutes) {
countMinutes.textContent = String(minutes).padStart(2, "0");
}

if (countSeconds) {
countSeconds.textContent = String(seconds).padStart(2, "0");
}
}

// =========================================================
// LIEN "VOIR LES RÉSULTATS"
// =========================================================

let resultsLink = null;

if (countdownContainer) {
resultsLink = document.createElement("button");

resultsLink.type = "button";
resultsLink.className = "count-results-link";
resultsLink.textContent = "Voir les résultats";
resultsLink.style.display = "none";

resultsLink.addEventListener("click", () => {
if (getQuizState().state !== "finished") {
return;
}

showResultsPanel = true;

showPanel(game);
setActiveButton(null);

updateGameInterface();
});

countdownContainer.appendChild(resultsLink);
}

// =========================================================
// AFFICHAGE DU LIEN RÉSULTATS
// =========================================================

function updateResultsLink(state) {
if (!countdownContainer || !resultsLink) {
return;
}

const countItems = countdownContainer.querySelectorAll(".count-item, .count-seconds");

if (state === "finished") {
countItems.forEach(item => {
item.style.display = "none";
});

if (countStatus) {
countStatus.style.display = "none";
}

resultsLink.style.display = "inline-block";
} else {
countItems.forEach(item => {
item.style.display = "";
});

if (countStatus) {
countStatus.style.display = "";
}

resultsLink.style.display = "none";
}
}

// =========================================================
// ÉTAT D'UN QUIZ (GÉNÉRIQUE)
// =========================================================
/*
* Calcule l'état de N'IMPORTE QUEL quiz passé en paramètre.
* Utilisée par getQuizState() (pour currentQuiz), par
* updateLiveButton() (pour tous les quiz de la barre) et par
* le filtre "En live".
*/

function getStateForQuiz(quiz) {
const now = new Date();

const start = new Date(quiz.startTime);
const end = new Date(quiz.endTime);
const results = new Date(quiz.resultsTime);

if (now < start) {
return { state: "waiting", target: start };
}

if (now < end) {
return { state: "playing", target: end };
}

if (now < results) {
return { state: "results", target: results };
}

return { state: "finished", target: null };
}

// =========================================================
// ÉTAT DU QUIZ SÉLECTIONNÉ
// =========================================================

function getQuizState() {
return getStateForQuiz(currentQuiz);
}

// =========================================================
// INTERFACE DU JEU
// =========================================================

function updateGameInterface() {
if (!game) {
return;
}

const state = getQuizState().state;

const waiting = game.querySelector(".quiz-game-waiting");
const active = game.querySelector(".quiz-game-active");
const submitted = game.querySelector(".quiz-game-submitted");
const resultsWaiting = game.querySelector(".quiz-game-results-waiting");
const results = game.querySelector(".quiz-game-results");
const question = game.querySelector(".quiz-question");
const xpValue = game.querySelector(".quiz-xp-value");
const textarea = game.querySelector(".quiz-answer");

// -----------------------------------------------------
// QUESTION
// -----------------------------------------------------

if (question) {
question.textContent = currentQuiz.question;
}

// -----------------------------------------------------
// XP
// -----------------------------------------------------

if (xpValue) {
xpValue.textContent = `+${currentQuiz.xpReward} XP`;
}

// -----------------------------------------------------
// CACHER LES ÉTATS
// -----------------------------------------------------

[waiting, active, submitted, resultsWaiting, results].forEach(element => {
if (element) {
element.style.display = "none";
}
});

// -----------------------------------------------------
// SESSION TERMINÉE
// -----------------------------------------------------

const existingSessionEnded = game.querySelector(".quiz-session-ended");

if (existingSessionEnded) {
existingSessionEnded.remove();
}

// -----------------------------------------------------
// EN ATTENTE
// -----------------------------------------------------

if (state === "waiting") {
if (waiting) {
waiting.style.display = "block";
}

return;
}

// -----------------------------------------------------
// QUIZ EN COURS
// -----------------------------------------------------

if (state === "playing") {
if (answeredQuizzes.has(currentQuiz.id)) {
if (submitted) {
submitted.style.display = "block";
}

return;
}

if (active) {
active.style.display = "block";
}

if (textarea) {
textarea.style.display = "block";
}

return;
}

// -----------------------------------------------------
// RÉSULTATS EN ATTENTE
// -----------------------------------------------------

if (state === "results") {
if (resultsWaiting) {
resultsWaiting.style.display = "block";
}

return;
}

// -----------------------------------------------------
// QUIZ TERMINÉ
// -----------------------------------------------------

if (state === "finished") {
if (!showResultsPanel) {
const sessionEnded = document.createElement("div");

sessionEnded.className = "quiz-session-ended";

sessionEnded.innerHTML = `
<h3>
Session terminée
</h3>

<p>
Cette session de quiz est maintenant terminée.
</p>

<button
type="button"
class="back-description">

Revenir à la description

</button>
`;

game.appendChild(sessionEnded);

const backButton = sessionEnded.querySelector(".back-description");

if (backButton) {
backButton.addEventListener("click", () => {
showPanel(description);
setActiveButton(null);
});
}

return;
}

// -------------------------------------------------
// RÉSULTATS
// -------------------------------------------------

if (results) {
results.style.display = "block";

const winner = results.querySelector(".quiz-winner-name");

if (winner) {
winner.textContent = currentQuiz.winner;
}
}
}
}

// =========================================================
// ENVOYER UNE RÉPONSE
// =========================================================

if (sendButton) {
sendButton.addEventListener("click", () => {
if (!registeredQuizzes.has(currentQuiz.id)) {
return;
}

const state = getQuizState();

if (state.state !== "playing") {
return;
}

const textarea = game ? game.querySelector(".quiz-answer") : null;

if (!textarea) {
return;
}

const answer = textarea.value.trim();

if (!answer) {
textarea.focus();
return;
}

answeredQuizzes.add(currentQuiz.id);

textarea.value = "";

updateGameInterface();

addNotification(
`Votre réponse au "${currentQuiz.title}" a bien été envoyée. La vérification sera effectuée après la fin du quiz.`,
"check"
);
});
}

// =========================================================
// NOTIFICATIONS AUTOMATIQUES
// =========================================================

function checkQuizNotifications() {
const state = getQuizState().state;

const previousState = lastQuizStates[currentQuiz.id];

if (previousState === undefined) {
lastQuizStates[currentQuiz.id] = state;

return;
}

if (previousState === state) {
return;
}

lastQuizStates[currentQuiz.id] = state;

if (!registeredQuizzes.has(currentQuiz.id)) {
return;
}

// -----------------------------------------------------
// QUIZ COMMENCE
// -----------------------------------------------------

if (state === "playing") {
addNotification(
`"${currentQuiz.title}" vient de commencer. Vous pouvez maintenant jouer !`,
"play"
);
}

// -----------------------------------------------------
// QUIZ TERMINÉ
// -----------------------------------------------------

if (state === "results") {
addNotification(
`"${currentQuiz.title}" est terminé. Les réponses sont maintenant en cours de vérification.`,
"hourglass-half"
);
}

// -----------------------------------------------------
// RÉSULTATS
// -----------------------------------------------------

if (state === "finished") {
addNotification(
`Les résultats de "${currentQuiz.title}" sont maintenant disponibles !`,
"trophy"
);
}

updateGameInterface();
updatePlayButton();
}

// =========================================================
// INTERFACE DU COMPTEUR
// =========================================================

function updateQuizStateUI(state) {
if (!countStatus) {
return;
}

// -----------------------------------------------------
// AVANT LE QUIZ
// -----------------------------------------------------

if (state === "waiting") {
countStatus.textContent = "Débute dans";

return;
}

// -----------------------------------------------------
// QUIZ EN COURS
// -----------------------------------------------------

if (state === "playing") {
countStatus.innerHTML = `
<span class="quiz-live-indicator">
<span class="quiz-live-dot"></span>
Quiz en cours
</span>
<span class="quiz-count-label">
Se termine dans
</span>
`;

return;
}

// -----------------------------------------------------
// RÉSULTATS EN ATTENTE
// -----------------------------------------------------

if (state === "results") {
countStatus.textContent = "Résultats dans";

return;
}

// -----------------------------------------------------
// RÉSULTATS DISPONIBLES
// -----------------------------------------------------

if (state === "finished") {
countStatus.textContent = "Résultats disponibles";
}
}

// =========================================================
// MISE À JOUR DU COMPTEUR
// =========================================================

function updateQuizCountdown() {
if (!currentQuiz) {
return;
}

const quizState = getQuizState();

// -----------------------------------------------------
// CHANGEMENT D'ÉTAT
// -----------------------------------------------------

if (currentCountdownState !== quizState.state) {
currentCountdownState = quizState.state;

// Le texte du compteur
updateQuizStateUI(quizState.state);

// Le jeu
updateGameInterface();

// Bouton jouer
updatePlayButton();

// Barre des quiz
renderQuizSelector();

// -------------------------------------------------
// LE BOUTON LIVE SUIT L'ÉTAT DE CHAQUE QUIZ
// -------------------------------------------------

updateLiveButton();

// -------------------------------------------------
// LE FILTRE "EN LIVE" DOIT SE RAFRAÎCHIR AUSSI
// -------------------------------------------------

if (currentFilter === "live") {
renderQuizSelector();
}
} else {
/*
* Même si l'état n'a pas changé,
* on maintient le bouton synchronisé.
*/

updateLiveButton();
}

// -----------------------------------------------------
// QUIZ TERMINÉ
// -----------------------------------------------------

if (quizState.state === "finished") {
updateCountdownDisplay(0);
updateResultsLink("finished");

return;
}

// -----------------------------------------------------
// COMPTEUR NORMAL
// -----------------------------------------------------

updateResultsLink(quizState.state);

const now = new Date();

let remaining = Math.floor((quizState.target - now) / 1000);

remaining = Math.max(0, remaining);

updateCountdownDisplay(remaining);
}

// =========================================================
// DÉMARRER LE COMPTEUR
// =========================================================

function startQuizCountdown() {
if (countdownInterval) {
clearInterval(countdownInterval);
}

currentCountdownState = null;

updateQuizCountdown();

countdownInterval = setInterval(() => {
updateQuizCountdown();
checkQuizNotifications();
}, 1000);
}

// =========================================================
// AGRANDIR LA BARRE DES QUIZ (vue grille)
// =========================================================

const quizSelector = document.getElementById("quiz-selector");
const selectorExpandBtn = document.getElementById("quiz-selector-expand");

if (quizSelector && selectorExpandBtn) {
selectorExpandBtn.addEventListener("click", () => {
quizSelector.classList.toggle("expanded");

const icon = selectorExpandBtn.querySelector("i");
const expanded = quizSelector.classList.contains("expanded");

if (icon) {
icon.classList.toggle("fa-expand", !expanded);
icon.classList.toggle("fa-compress", expanded);
}

selectorExpandBtn.setAttribute(
"aria-label",
expanded ? "Réduire la liste des quiz" : "Agrandir la liste des quiz"
);
});
}

// =========================================================
// AFFICHER / MASQUER LES FILTRES (intégrés à la barre)
// =========================================================
/*
* Indépendant du bouton "agrandir" : les deux peuvent être
* actifs en même temps.
*/

const selectorFilterToggleBtn = document.getElementById("quiz-selector-filter-toggle");

if (quizSelector && selectorFilterToggleBtn) {
selectorFilterToggleBtn.addEventListener("click", () => {
quizSelector.classList.toggle("filters-open");

const open = quizSelector.classList.contains("filters-open");

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
/*
* Dès que la page défile, la barre se réduit à un simple
* bouton "œil" centré. Elle se redéploie automatiquement
* en revenant tout en haut de la page, ou au clic sur l'œil.
*/

const selectorPeekBtn = document.getElementById("quiz-selector-peek");
const SCROLL_COLLAPSE_THRESHOLD = 40;

function updateSelectorScrollState() {
if (!quizSelector || !selectorPeekBtn) {
return;
}

const scrolled = window.scrollY > SCROLL_COLLAPSE_THRESHOLD;

quizSelector.classList.toggle("collapsed", scrolled);
selectorPeekBtn.classList.toggle("visible", scrolled);
}

window.addEventListener("scroll", updateSelectorScrollState, { passive: true });

if (selectorPeekBtn) {
selectorPeekBtn.addEventListener("click", () => {
if (quizSelector) {
quizSelector.classList.remove("collapsed");
}

selectorPeekBtn.classList.remove("visible");
});
}

updateSelectorScrollState();

// =========================================================
// INITIALISATION
// =========================================================

showPanel(description);
setActiveButton(null);

renderQuizSelector();
renderSimilarQuizzes();
renderNotifications();
updateQuizInterface();
updatePlayButton();

startQuizCountdown();
});
