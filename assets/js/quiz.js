document.addEventListener("DOMContentLoaded", () => {
//=========================================================
// DONNÉES DES QUIZ
// =========================================================
const quizzes = [
{
id: 1,
title: "La Question Du Mois",
subtitle: "Tentez de gagner 5000 FCFA",
category: "culture",
image: "../assets/images/quiz/question-du-mois.jpg",
members: 128,
liked: false,
notifications: false,
xpReward: 100,
question: "Quelle est votre réponse à la question du mois ?",
winner: "—",
correctParticipants: [],
startTime: "2026-08-10T17:02:00Z",
endTime: "2026-08-10T17:02:30Z",
resultsTime: "2026-08-10T17:03:00Z"
},
{
id: 2,
title: "Quiz Manga",
subtitle: "Testez vos connaissances sur les mangas",
category: "manga",
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
resultsTime: "2026-08-11T00:12:00Z"
},
{
id: 3,
title: "Quiz Anime",
subtitle: "Quel fan d'anime êtes-vous ?",
category: "manga",
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
resultsTime: "2026-08-11T00:12:00Z"
},
{
id: 4,
title: "Quiz Gaming",
subtitle: "Testez votre culture vidéoludique",
category: "gaming",
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
resultsTime: "2026-08-11T00:12:00Z"
},
{
id: 5,
title: "Quiz Cinéma",
subtitle: "Les grands classiques du cinéma",
category: "cinema",
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
resultsTime: "2026-08-11T00:12:00Z"
},
{
id: 6,
title: "Culture Africaine",
subtitle: "Découvrez la richesse des cultures africaines",
category: "culture",
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
resultsTime: "2026-08-11T00:12:00Z"
},
{
id: 7,
title: "Pop Culture",
subtitle: "Un mélange de culture pop",
category: "culture",
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
resultsTime: "2026-08-11T00:12:00Z"
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
const sidebar = document.getElementById("quiz-sidebar");
const sidebarToggle = document.getElementById("quiz-sidebar-toggle");
const sidebarFilters = document.querySelectorAll(".quiz-filter");
const quizTrack = document.getElementById("quiz-selector-track");
const sendButton = document.querySelector(".quiz-send-btn");
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
* IMPORTANT :
*
* Le bouton LIVE ne calcule aucune heure lui-même.
*
* Il demande à CHAQUE quiz de la barre quel est son propre état
* (via getStateForQuiz), et non plus seulement l'état du quiz
* actuellement sélectionné (currentQuiz).
*
* Ainsi, le point rouge s'affiche sur le quiz réellement "en cours",
* qu'il soit sélectionné ou non.
*/
function updateLiveButton() {
if (!quizTrack) {
return;
}
const quizButtons = quizTrack.querySelectorAll(".quiz-selector-item");
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
notificationList.innerHTML =   <p class="quiz-notification-empty">   Aucune notification.   </p>  ;
updateNotificationBadge(0);
notificationPanel.classList.remove("active");
return;
}
const currentNotifications = notifications.filter(
notification => notification.quizId === currentQuiz.id
);
notificationList.innerHTML = "";
if (currentNotifications.length === 0) {
notificationList.innerHTML =   <p class="quiz-notification-empty">   Aucune notification.   </p>  ;
updateNotificationBadge(0);
return;
}
updateNotificationBadge(currentNotifications.length);
currentNotifications.forEach(notification => {
const item = document.createElement("div");
item.className = "quiz-notification-item";
item.innerHTML =   <i class="fa-solid ${notification.icon}"></i>   <p>   ${notification.message}   </p>   <button   type="button"   class="quiz-notification-delete"   data-notification-id="${notification.id}"   aria-label="Supprimer">   <i class="fa-solid fa-xmark"></i>   </button>  ;
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
Découvrez ${currentQuiz.title} de QuizTable. Participez au quiz, testez vos connaissances et tentez de remporter la récompense mise en jeu.;
}
// -----------------------------------------------------
// MEMBRES
// -----------------------------------------------------
if (membersText) {
membersText.textContent = ${currentQuiz.members} inscrits;
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
registerButton.innerHTML =   <i class="fa-solid fa-user-minus"></i>   Se désinscrire  ;
if (playButton) {
playButton.classList.remove("hidden");
}
} else {
registerButton.classList.remove("registered");
registerButton.innerHTML =   <i class="fa-solid fa-user-plus"></i>   S'inscrire  ;
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
function renderQuizSelector() {
if (!quizTrack) {
return;
}
const scrollPosition = quizTrack.scrollLeft; // on mémorise la position
quizTrack.innerHTML = "";
quizTrack.innerHTML = "";
let visibleQuizzes = quizzes;
// -----------------------------------------------------
// FILTRE
// -----------------------------------------------------
if (currentFilter === "favorites") {
visibleQuizzes = quizzes.filter(quiz => quiz.liked);
} else if (currentFilter !== "all") {
visibleQuizzes = quizzes.filter(quiz => quiz.category === currentFilter);
}
// -----------------------------------------------------
// AUCUN QUIZ
// -----------------------------------------------------
if (visibleQuizzes.length === 0) {
const empty = document.createElement("div");
empty.className = "quiz-selector-empty";
empty.textContent = "Aucun quiz dans vos favoris.";
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
button.innerHTML =   `<span class="quiz-selector-circle">   <img   src="${quiz.image}"   alt="${quiz.title}"   >   </span>  `;
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
/*
* On ne calcule plus l'état d'un seul quiz ici :
* updateLiveButton() vérifie désormais chaque quiz
* individuellement et place le point rouge sur celui
* qui est réellement "en cours".
*/
updateLiveButton();
quizTrack.scrollLeft = scrollPosition;
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
Vous êtes maintenant inscrit à "${currentQuiz.title}". Vous recevrez les notifications liées à ce quiz.,
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
// SIDEBAR
// =========================================================
if (sidebar && sidebarToggle) {
sidebarToggle.addEventListener("click", () => {
sidebar.classList.toggle("open");
});
}
// =========================================================
// FILTRES
// =========================================================
sidebarFilters.forEach(filterButton => {
filterButton.addEventListener("click", () => {
currentFilter = filterButton.dataset.filter;
sidebarFilters.forEach(button => {
button.classList.remove("active");
});
filterButton.classList.add("active");
renderQuizSelector();
let visibleQuizzes;
if (currentFilter === "favorites") {
visibleQuizzes = quizzes.filter(quiz => quiz.liked);
} else if (currentFilter === "all") {
visibleQuizzes = quizzes;
} else {
visibleQuizzes = quizzes.filter(quiz => quiz.category === currentFilter);
}
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
* Utilisée par getQuizState() (pour currentQuiz) ET par
* updateLiveButton() (pour tous les quiz de la barre).
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
xpValue.textContent = +${currentQuiz.xpReward} XP;
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
sessionEnded.innerHTML =   <h3>   Session terminée   </h3>   <p>   Cette session de quiz est maintenant terminée.   </p>   <button   type="button"   class="back-description">   Revenir à la description   </button>  ;
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
Votre réponse au "${currentQuiz.title}" a bien été envoyée. La vérification sera effectuée après la fin du quiz.,
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
"${currentQuiz.title}" vient de commencer. Vous pouvez maintenant jouer !,
"play"
);
}
// -----------------------------------------------------
// QUIZ TERMINÉ
// -----------------------------------------------------
if (state === "results") {
addNotification(
"${currentQuiz.title}" est terminé. Les réponses sont maintenant en cours de vérification.,
"hourglass-half"
);
}
// -----------------------------------------------------
// RÉSULTATS
// -----------------------------------------------------
if (state === "finished") {
addNotification(
Les résultats de "${currentQuiz.title}" sont maintenant disponibles !,
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
countStatus.textContent = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Débute dans";
return;
}
// -----------------------------------------------------
// QUIZ EN COURS
// -----------------------------------------------------
if (state === "playing") {
countStatus.innerHTML =   <span class="quiz-live-indicator">   <span class="quiz-live-dot"></span>   Quiz en cours   </span>   <span class="quiz-count-label">   Se termine dans   </span>  ;
return;
}
// -----------------------------------------------------
// RÉSULTATS EN ATTENTE
// -----------------------------------------------------
if (state === "results") {
countStatus.textContent = "\u00A0\u00A0\u00A0Résultats dans";
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
// IMPORTANT :
// LE BOUTON LIVE SUIT L'ÉTAT DE CHAQUE QUIZ
// -------------------------------------------------
updateLiveButton();
} else {
/
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
// INITIALISATION
// =========================================================
showPanel(description);
setActiveButton(null);
renderQuizSelector();
renderNotifications();
updateQuizInterface();
updatePlayButton();
startQuizCountdown();
});