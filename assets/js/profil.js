document.addEventListener("DOMContentLoaded", () => {

// =========================================================
// CONTEXTE : PROPRIÉTAIRE OU VISITEUR
// =========================================================
/*
* En attendant le branchement au backend, le contexte est
* déterminé ici. Passer ?visitor=1 dans l'URL permet de tester
* facilement le rendu "visiteur" pendant le développement.
*/

const urlParams = new URLSearchParams(window.location.search);
const isOwner = urlParams.get("visitor") !== "1";

// =========================================================
// DONNÉES DU PROFIL (simulation front-end)
// =========================================================

const profileData = {
xp: 3250,
quizPoints: 480,
referralCode: "QT" + String(482913).padStart(6, "0"),

photo: "../assets/images/default-profile.jpg",
// null = pas de bannière personnalisée : le dégradé neutre
// défini en CSS reste affiché.
coverImage: null,

username: "Pseudo",
firstName: "Prénom",
lastName: "Nom",
bio: "Bio...",

friendsCount: 0,
followingCount: 0,
worldRank: 0,

// Chaque utilisateur reçoit obligatoirement un badge de
// bienvenue dès son inscription : il ne devrait donc
// normalement jamais y avoir de profil sans badge. Le
// message de secours reste géré par renderBadges() au cas
// où le tableau serait vide.
badges: [
{
id: "welcome",
name: "Badge de bienvenue",
image: "../assets/images/badges/welcome.png"
}
],

lifeCompleted: false,
lastEditAt: null,

life: {
hobby: "",
profession: "",
nationality: "",
film: "",
game: "",
book: "",
music: "",
anime: "",
manga: "",
sport: "",
custom: [], // { question, answer }
about: ""
},

lifeLikes: 0,
lifeLiked: false,
lifeComments: 0
};

/*
* La restriction de fréquence (3 jours) ne concerne que les
* informations de la Life. Les informations principales du
* profil (nom, prénom, bio) sont modifiables librement, sans
* délai. La photo de profil et la photo de bannière restent
* elles aussi modifiables librement, sans aucune limite de
* temps ni de fréquence.
*/
const EDIT_COOLDOWN_MS = 3 * 24 * 60 * 60 * 1000;
const MAX_CUSTOM_QUESTIONS = 5;

// Utilisateur actuellement connecté (peut être le propriétaire
// du profil affiché ou un visiteur) : sert à signer les
// commentaires qu'il publie.
const currentUser = {
username: isOwner ? profileData.username : "Vous",
avatar: "../assets/images/default-profile.jpg"
};

let notifications = [];

// =========================================================
// ÉLÉMENTS HTML
// =========================================================

const profileTopbar = document.getElementById("profileTopbar");

const profileXP = document.getElementById("profileXP");
const xpPlusButton = document.getElementById("xpPlusButton");
const profileQuizPoints = document.getElementById("profileQuizPoints");
const quizPointsPlusButton = document.getElementById("quizPointsPlusButton");
const profileReferralCode = document.getElementById("profileReferralCode");
const copyReferralButton = document.getElementById("copyReferralButton");

const settingsButton = document.getElementById("settingsButton");
const notificationButton = document.getElementById("notificationButton");
const notificationBadge = document.getElementById("notificationBadge");

const profilePhotoButton = document.getElementById("profilePhotoButton");
const profilePhoto = document.getElementById("profilePhoto");

const profileCoverBand = document.getElementById("profileCoverBand");
const coverEditButton = document.getElementById("coverEditButton");
const coverPhotoInput = document.getElementById("coverPhotoInput");

const profilePhotoEditButton = document.getElementById("profilePhotoEditButton");
const profilePhotoInput = document.getElementById("profilePhotoInput");

const profileUsername = document.getElementById("profileUsername");
const profileRealName = document.getElementById("profileRealName");
const profileBio = document.getElementById("profileBio");
const friendsCount = document.getElementById("friendsCount");
const followingCount = document.getElementById("followingCount");

const visitorActions = document.getElementById("visitorActions");
const messageButton = document.getElementById("messageButton");
const addFriendButton = document.getElementById("addFriendButton");
const editPublicProfileButton = document.getElementById("editPublicProfileButton");

const completeLifeButton = document.getElementById("completeLifeButton");
const editLifeButton = document.getElementById("editLifeButton");

const profileHeaderXP = document.getElementById("profileHeaderXP");
const profileWorldRank = document.getElementById("profileWorldRank");

const profileBadges = document.getElementById("profileBadges");
const badgesEmptyMessage = document.getElementById("badgesEmptyMessage");

const profileLifeInformation = document.getElementById("profileLifeInformation");
const lifeEmptyMessage = document.getElementById("lifeEmptyMessage");
const profileAbout = document.getElementById("profileAbout");
const profileAboutText = document.getElementById("profileAboutText");

const profileLifeActions = document.getElementById("profileLifeActions");
const lifeLikeButton = document.getElementById("lifeLikeButton");
const lifeLikeCount = document.getElementById("lifeLikeCount");
const lifeCommentButton = document.getElementById("lifeCommentButton");
const lifeCommentCount = document.getElementById("lifeCommentCount");

const profileFloatingAction = document.getElementById("profileFloatingAction");
const profileActionPanel = document.getElementById("profileActionPanel");
const profileActionPanelClose = document.getElementById("profileActionPanelClose");
const addIllustratorButton = document.getElementById("addIllustratorButton");
const addWriterButton = document.getElementById("addWriterButton");
const addCreatorButton = document.getElementById("addCreatorButton");
const createGuildButton = document.getElementById("createGuildButton");

const profileFormOverlay = document.getElementById("profileFormOverlay");
const profileFormTitle = document.getElementById("profileFormTitle");
const profileFormClose = document.getElementById("profileFormClose");
const profileLifeForm = document.getElementById("profileLifeForm");
const profileFormMessage = document.getElementById("profileFormMessage");
const addCustomQuestionButton = document.getElementById("addCustomQuestionButton");
const customQuestionsList = document.getElementById("customQuestionsList");

const profileEditOverlay = document.getElementById("profileEditOverlay");
const profileEditClose = document.getElementById("profileEditClose");
const profileEditForm = document.getElementById("profileEditForm");
const profileEditMessage = document.getElementById("profileEditMessage");

const profileNotificationPanel = document.getElementById("profileNotificationPanel");
const profileNotificationList = document.getElementById("profileNotificationList");
const notificationPanelClose = document.getElementById("notificationPanelClose");
const deleteAllNotifications = document.getElementById("deleteAllNotifications");

const profileSettingsPanel = document.getElementById("profileSettingsPanel");
const settingsPanelClose = document.getElementById("settingsPanelClose");

const profilePhotoModal = document.getElementById("profilePhotoModal");
const profilePhotoLarge = document.getElementById("profilePhotoLarge");
const profilePhotoModalClose = document.getElementById("profilePhotoModalClose");

const badgeUnlockOverlay = document.getElementById("badgeUnlockOverlay");
const badgeUnlockImage = document.getElementById("badgeUnlockImage");
const badgeUnlockMessage = document.getElementById("badgeUnlockMessage");
const badgeUnlockClose = document.getElementById("badgeUnlockClose");

const LIFE_LABELS = {
hobby: "Loisir",
profession: "Profession",
nationality: "Nationalité",
film: "Film préféré",
game: "Jeu vidéo préféré",
book: "Livre préféré",
music: "Musique ou chanteur préféré",
anime: "Animé préféré",
manga: "Manga préféré",
sport: "Sport préféré"
};

// =========================================================
// OUTILS
// =========================================================

function closeAllPanels() {
[
profileActionPanel,
profileNotificationPanel,
profileSettingsPanel,
document.getElementById("profileCommentsPanel")
].forEach(panel => {
if (panel) {
panel.hidden = true;
}
});
}

function formatDelay(ms) {
const totalHours = Math.ceil(ms / (60 * 60 * 1000));
const days = Math.floor(totalHours / 24);
const hours = totalHours % 24;

if (days > 0) {
return `${days} j ${hours} h`;
}

return `${hours} h`;
}

// =========================================================
// BARRE SUPÉRIEURE — PROPRIÉTAIRE UNIQUEMENT
// =========================================================

function renderTopbar() {
if (!profileTopbar) {
return;
}

if (!isOwner) {
profileTopbar.hidden = true;
return;
}

profileTopbar.hidden = false;

if (profileXP) {
profileXP.textContent = profileData.xp;
}

if (profileQuizPoints) {
profileQuizPoints.textContent = profileData.quizPoints;
}

if (profileReferralCode) {
profileReferralCode.textContent = profileData.referralCode;
}
}

if (xpPlusButton) {
xpPlusButton.addEventListener("click", () => {
console.log("Ouverture des actions XP.");
});
}

if (quizPointsPlusButton) {
quizPointsPlusButton.addEventListener("click", () => {
console.log("Ouverture des actions Quiz Points.");
});
}

if (copyReferralButton) {
copyReferralButton.addEventListener("click", () => {
if (navigator.clipboard) {
navigator.clipboard.writeText(profileData.referralCode).catch(() => {});
}

copyReferralButton.textContent = "Copié";

setTimeout(() => {
copyReferralButton.textContent = "Copier";
}, 1500);
});
}

// =========================================================
// PARAMÈTRES / NOTIFICATIONS — ICÔNES (PROPRIÉTAIRE UNIQUEMENT)
// =========================================================

if (settingsButton) {
if (!isOwner) {
settingsButton.hidden = true;
} else {
settingsButton.addEventListener("click", () => {
closeAllPanels();

if (profileSettingsPanel) {
profileSettingsPanel.hidden = false;
}
});
}
}

if (settingsPanelClose) {
settingsPanelClose.addEventListener("click", () => {
if (profileSettingsPanel) {
profileSettingsPanel.hidden = true;
}
});
}

if (notificationButton) {
if (!isOwner) {
notificationButton.hidden = true;
} else {
notificationButton.addEventListener("click", event => {
event.stopPropagation();

closeAllPanels();

if (profileNotificationPanel) {
profileNotificationPanel.hidden = false;
}
});
}
}

if (notificationPanelClose) {
notificationPanelClose.addEventListener("click", () => {
if (profileNotificationPanel) {
profileNotificationPanel.hidden = true;
}
});
}

// =========================================================
// NOTIFICATIONS — CONTENU
// =========================================================

function addNotification(message, icon = "fa-bell") {
notifications.unshift({
id: Date.now() + Math.random(),
message: message,
icon: icon
});

renderNotifications();
}

function renderNotifications() {
if (!profileNotificationList) {
return;
}

if (notifications.length === 0) {
profileNotificationList.innerHTML = `
<p class="profile-empty-message">
Aucune notification.
</p>
`;

if (notificationBadge) {
notificationBadge.hidden = true;
}

return;
}

if (notificationBadge) {
notificationBadge.hidden = false;
notificationBadge.textContent = notifications.length;
}

profileNotificationList.innerHTML = "";

notifications.forEach(notification => {
const item = document.createElement("div");

item.className = "profile-notification-item";

item.innerHTML = `
<div class="notification-content">
<strong>${notification.message}</strong>
</div>

<button
type="button"
class="notification-delete"
data-notification-id="${notification.id}"
aria-label="Supprimer la notification">

×

</button>
`;

profileNotificationList.appendChild(item);
});

profileNotificationList.querySelectorAll(".notification-delete").forEach(button => {
button.addEventListener("click", () => {
const id = Number(button.dataset.notificationId);

notifications = notifications.filter(notification => notification.id !== id);

renderNotifications();
});
});
}

if (deleteAllNotifications) {
deleteAllNotifications.addEventListener("click", () => {
notifications = [];
renderNotifications();
});
}

// =========================================================
// PHOTO DE PROFIL
// =========================================================

function renderPhoto() {
if (profilePhoto) {
profilePhoto.src = profileData.photo;
}
}

if (profilePhotoButton) {
profilePhotoButton.addEventListener("click", () => {
if (!profilePhotoModal || !profilePhotoLarge) {
return;
}

profilePhotoLarge.src = profileData.photo;

if (profilePhotoEditButton) {
profilePhotoEditButton.hidden = !isOwner;
}

profilePhotoModal.hidden = false;
});
}

if (profilePhotoModalClose) {
profilePhotoModalClose.addEventListener("click", () => {
if (profilePhotoModal) {
profilePhotoModal.hidden = true;
}
});
}

if (profilePhotoModal) {
profilePhotoModal.addEventListener("click", event => {
if (event.target === profilePhotoModal) {
profilePhotoModal.hidden = true;
}
});
}

// La photo de profil peut être modifiée librement, sans
// aucune restriction de fréquence.

if (profilePhotoEditButton && profilePhotoInput) {
profilePhotoEditButton.addEventListener("click", () => {
if (!isOwner) {
return;
}

profilePhotoInput.click();
});

profilePhotoInput.addEventListener("change", () => {
const file = profilePhotoInput.files && profilePhotoInput.files[0];

if (!file) {
return;
}

const reader = new FileReader();

reader.onload = () => {
profileData.photo = reader.result;

renderPhoto();

if (profilePhotoLarge) {
profilePhotoLarge.src = profileData.photo;
}
};

reader.readAsDataURL(file);

profilePhotoInput.value = "";
});
}

// =========================================================
// BANNIÈRE
// =========================================================
/*
* Comme la photo de profil, la bannière peut être modifiée
* librement par le propriétaire, sans aucune restriction de
* fréquence.
*/

function renderCover() {
if (!profileCoverBand) {
return;
}

if (profileData.coverImage) {
profileCoverBand.style.backgroundImage = `url("${profileData.coverImage}")`;
} else {
profileCoverBand.style.backgroundImage = "";
}
}

if (coverEditButton) {
if (!isOwner) {
coverEditButton.hidden = true;
} else {
coverEditButton.addEventListener("click", () => {
if (coverPhotoInput) {
coverPhotoInput.click();
}
});
}
}

if (coverPhotoInput) {
coverPhotoInput.addEventListener("change", () => {
const file = coverPhotoInput.files && coverPhotoInput.files[0];

if (!file) {
return;
}

const reader = new FileReader();

reader.onload = () => {
profileData.coverImage = reader.result;
renderCover();
};

reader.readAsDataURL(file);

coverPhotoInput.value = "";
});
}

// =========================================================
// INFORMATIONS PUBLIQUES
// =========================================================

function renderProfileInfo() {
if (profileUsername) {
profileUsername.textContent = profileData.username;
}

if (profileRealName) {
profileRealName.textContent = `${profileData.firstName} ${profileData.lastName}`.trim();
}

if (profileBio) {
profileBio.textContent = profileData.bio;
}

if (friendsCount) {
friendsCount.textContent = profileData.friendsCount;
}

if (followingCount) {
followingCount.textContent = profileData.followingCount;
}

if (profileHeaderXP) {
profileHeaderXP.textContent = profileData.xp;
}

if (profileWorldRank) {
profileWorldRank.textContent = `#${profileData.worldRank}`;
}
}

// =========================================================
// ACTIONS : ÉCRIRE / AJOUTER UN AMI (VISITEUR)
// OU COMPLÉTER / MODIFIER LE PROFIL (PROPRIÉTAIRE)
// — même emplacement, juste sous la bio —
// =========================================================

function renderProfileActions() {
if (!isOwner) {
if (visitorActions) {
visitorActions.hidden = false;
}

if (editPublicProfileButton) {
editPublicProfileButton.hidden = true;
}

return;
}

if (visitorActions) {
visitorActions.hidden = true;
}

if (editPublicProfileButton) {
editPublicProfileButton.hidden = false;
}
}

if (messageButton) {
messageButton.addEventListener("click", () => {
console.log("Ouverture de la messagerie.");
});
}

if (addFriendButton) {
addFriendButton.addEventListener("click", () => {
console.log("Invitation d'ami envoyée.");
});
}

if (editPublicProfileButton) {
editPublicProfileButton.addEventListener("click", () => {
openEditProfileForm();
});
}

if (completeLifeButton) {
completeLifeButton.addEventListener("click", () => {
openLifeForm();
});
}

if (editLifeButton) {
editLifeButton.addEventListener("click", () => {
openLifeForm();
});
}

// =========================================================
// BADGES
// =========================================================

function renderBadges() {
if (!profileBadges) {
return;
}

profileBadges.innerHTML = "";

if (profileData.badges.length === 0) {
// État de secours : ne devrait normalement jamais arriver
// puisqu'un badge de bienvenue est attribué à l'inscription.
if (badgesEmptyMessage) {
badgesEmptyMessage.hidden = false;
}

return;
}

if (badgesEmptyMessage) {
badgesEmptyMessage.hidden = true;
}

profileData.badges.forEach(badge => {
const container = document.createElement("div");

container.className = "profile-badge";
container.title = badge.name;

const img = document.createElement("img");

img.src = badge.image;
img.alt = badge.name;

container.appendChild(img);
profileBadges.appendChild(container);
});
}

// -----------------------------------------------------
// MODALE "NOUVEAU BADGE DÉBLOQUÉ"
// -----------------------------------------------------

function showBadgeUnlock(badge) {
if (!badgeUnlockOverlay || !isOwner) {
return;
}

if (badgeUnlockImage) {
badgeUnlockImage.src = badge.image;
badgeUnlockImage.alt = badge.name;
}

if (badgeUnlockMessage) {
badgeUnlockMessage.textContent = "Vous avez débloqué un nouveau badge !";
}

badgeUnlockOverlay.hidden = false;

addNotification(`Badge débloqué : ${badge.name}.`, "fa-award");
}

function closeBadgeUnlock() {
if (badgeUnlockOverlay) {
badgeUnlockOverlay.hidden = true;
}
}

if (badgeUnlockClose) {
badgeUnlockClose.addEventListener("click", closeBadgeUnlock);
}

if (badgeUnlockOverlay) {
badgeUnlockOverlay.addEventListener("click", event => {
if (event.target === badgeUnlockOverlay) {
closeBadgeUnlock();
}
});
}

// =========================================================
// SECTION LIFE
// =========================================================

function canEditNow() {
if (!profileData.lastEditAt) {
return true;
}

return Date.now() - profileData.lastEditAt >= EDIT_COOLDOWN_MS;
}

function renderLifeSection() {
const hasContent = profileData.lifeCompleted;

if (completeLifeButton) {
completeLifeButton.hidden = !(isOwner && !hasContent);
}

if (editLifeButton) {
editLifeButton.hidden = !(isOwner && hasContent);
}

if (!profileLifeInformation) {
return;
}

profileLifeInformation.innerHTML = "";

if (!hasContent) {
if (profileAbout) {
profileAbout.hidden = true;
}

if (lifeEmptyMessage) {
lifeEmptyMessage.hidden = false;
}

if (profileLifeActions) {
profileLifeActions.hidden = true;
}

return;
}

if (lifeEmptyMessage) {
lifeEmptyMessage.hidden = true;
}

if (profileLifeActions) {
profileLifeActions.hidden = false;
}

Object.keys(LIFE_LABELS).forEach(key => {
const value = profileData.life[key];

if (!value) {
return;
}

const item = document.createElement("div");

item.className = "life-info-item";

item.innerHTML = `
<span class="life-info-label">${LIFE_LABELS[key]}</span>
<span class="life-info-value"></span>
`;

item.querySelector(".life-info-value").textContent = value;

profileLifeInformation.appendChild(item);
});

profileData.life.custom.forEach(entry => {
if (!entry.question || !entry.answer) {
return;
}

const item = document.createElement("div");

item.className = "life-info-item";

item.innerHTML = `
<span class="life-info-label"></span>
<span class="life-info-value"></span>
`;

item.querySelector(".life-info-label").textContent = entry.question;
item.querySelector(".life-info-value").textContent = entry.answer;

profileLifeInformation.appendChild(item);
});

if (profileAbout && profileAboutText) {
if (profileData.life.about) {
profileAbout.hidden = false;
profileAboutText.textContent = profileData.life.about;
} else {
profileAbout.hidden = true;
}
}
}

// -----------------------------------------------------
// LIKE / COMMENTAIRE (icônes seules)
// -----------------------------------------------------

function renderLifeInteractions() {
if (lifeLikeCount) {
lifeLikeCount.textContent = profileData.lifeLikes;
}

if (lifeCommentCount) {
lifeCommentCount.textContent = profileData.lifeComments;
}

if (lifeLikeButton) {
lifeLikeButton.classList.toggle("active", profileData.lifeLiked);
}
}

if (lifeLikeButton) {
lifeLikeButton.addEventListener("click", () => {
if (profileData.lifeLiked) {
profileData.lifeLikes = Math.max(0, profileData.lifeLikes - 1);
profileData.lifeLiked = false;
} else {
profileData.lifeLikes += 1;
profileData.lifeLiked = true;
}

renderLifeInteractions();
});
}

// Chaque commentaire est un nœud : { id, author, avatar, text,
// likes, liked, replies: [] }. Une réponse est un nœud
// identique, simplement rangé dans le tableau "replies" de son
// parent (avec replyTo = pseudo du parent, pour l'identifier).
let lifeCommentsList = [];
let commentReplyTarget = null; // { id, author } ou null

const profileCommentsPanel = document.getElementById("profileCommentsPanel");
const profileCommentsClose = document.getElementById("profileCommentsClose");
const profileCommentsListEl = document.getElementById("profileCommentsList");
const profileCommentsForm = document.getElementById("profileCommentsForm");
const profileCommentInput = document.getElementById("profileCommentInput");
const profileCommentReplyHint = document.getElementById("profileCommentReplyHint");
const profileCommentReplyText = document.getElementById("profileCommentReplyText");
const profileCommentReplyCancel = document.getElementById("profileCommentReplyCancel");

function findCommentNode(id, list) {
for (const node of list) {
if (node.id === id) {
return node;
}

const found = findCommentNode(id, node.replies);

if (found) {
return found;
}
}

return null;
}

function buildCommentElement(comment) {
const item = document.createElement("div");

item.className = "profile-comment-item";

item.innerHTML = `
<div class="profile-comment-avatar">
<img src="${comment.avatar}" alt="${comment.author}">
</div>

<div class="profile-comment-body">
<div class="profile-comment-bubble">
<span class="profile-comment-author">${comment.author}</span>
${comment.replyTo ? `<span class="profile-comment-reply-to">@${comment.replyTo}</span> ` : ""}${comment.text}
</div>

<div class="profile-comment-actions">
<button type="button" class="comment-like" data-comment-id="${comment.id}">
<i class="fa-solid fa-heart"></i>
<span>${comment.likes}</span>
</button>

<button type="button" class="comment-reply" data-comment-id="${comment.id}">
Répondre
</button>
</div>
</div>
`;

item.querySelector(".comment-like").classList.toggle("active", comment.liked);

item.querySelector(".comment-like").addEventListener("click", () => {
toggleCommentLike(comment.id);
});

item.querySelector(".comment-reply").addEventListener("click", () => {
startCommentReply(comment.id, comment.author);
});

if (comment.replies.length > 0) {
const repliesContainer = document.createElement("div");

repliesContainer.className = "profile-comment-replies";

comment.replies.forEach(reply => {
repliesContainer.appendChild(buildCommentElement(reply));
});

item.querySelector(".profile-comment-body").appendChild(repliesContainer);
}

return item;
}

function renderCommentsList() {
if (!profileCommentsListEl) {
return;
}

if (lifeCommentsList.length === 0) {
profileCommentsListEl.innerHTML = `
<p class="profile-empty-message">
Aucun commentaire pour le moment.
</p>
`;

return;
}

profileCommentsListEl.innerHTML = "";

lifeCommentsList.forEach(comment => {
profileCommentsListEl.appendChild(buildCommentElement(comment));
});

profileCommentsListEl.scrollTop = profileCommentsListEl.scrollHeight;
}

function toggleCommentLike(commentId) {
const comment = findCommentNode(commentId, lifeCommentsList);

if (!comment) {
return;
}

if (comment.liked) {
comment.liked = false;
comment.likes = Math.max(0, comment.likes - 1);
} else {
comment.liked = true;
comment.likes += 1;
}

renderCommentsList();
}

function startCommentReply(commentId, authorUsername) {
commentReplyTarget = { id: commentId, author: authorUsername };

if (profileCommentReplyHint && profileCommentReplyText) {
profileCommentReplyText.textContent = `Réponse à @${authorUsername}`;
profileCommentReplyHint.hidden = false;
}

if (profileCommentInput) {
profileCommentInput.focus();
}
}

function cancelCommentReply() {
commentReplyTarget = null;

if (profileCommentReplyHint) {
profileCommentReplyHint.hidden = true;
}
}

if (profileCommentReplyCancel) {
profileCommentReplyCancel.addEventListener("click", cancelCommentReply);
}

function openCommentsPanel() {
if (!profileCommentsPanel) {
return;
}

closeAllPanels();

profileCommentsPanel.hidden = false;
renderCommentsList();

if (profileCommentInput) {
profileCommentInput.focus();
}
}

if (lifeCommentButton) {
lifeCommentButton.addEventListener("click", () => {
openCommentsPanel();
});
}

if (profileCommentsClose) {
profileCommentsClose.addEventListener("click", () => {
if (profileCommentsPanel) {
profileCommentsPanel.hidden = true;
}
});
}

if (profileCommentsForm) {
profileCommentsForm.addEventListener("submit", event => {
event.preventDefault();

if (!profileCommentInput) {
return;
}

const value = profileCommentInput.value.trim();

if (!value) {
return;
}

const newComment = {
id: Date.now() + Math.random(),
author: currentUser.username,
avatar: currentUser.avatar,
text: value,
likes: 0,
liked: false,
replyTo: commentReplyTarget ? commentReplyTarget.author : null,
replies: []
};

if (commentReplyTarget) {
const parent = findCommentNode(commentReplyTarget.id, lifeCommentsList);

if (parent) {
parent.replies.push(newComment);
} else {
lifeCommentsList.push(newComment);
}
} else {
lifeCommentsList.push(newComment);
}

profileCommentInput.value = "";
cancelCommentReply();

profileData.lifeComments += 1;

renderCommentsList();
renderLifeInteractions();
});
}

// =========================================================
// FORMULAIRE "COMPLÉTER / MODIFIER LA LIFE"
// =========================================================

function openLifeForm() {
if (!isOwner || !profileFormOverlay) {
return;
}

if (profileData.lifeCompleted && !canEditNow()) {
const remaining = EDIT_COOLDOWN_MS - (Date.now() - profileData.lastEditAt);

window.alert(
`Vous pourrez modifier votre Life dans ${formatDelay(remaining)}.`
);

return;
}

if (profileFormTitle) {
profileFormTitle.textContent = profileData.lifeCompleted ? "Modifier la Life" : "Compléter la Life";
}

fillLifeForm();

profileFormOverlay.hidden = false;
}

function fillLifeForm() {
if (!profileLifeForm) {
return;
}

Object.keys(LIFE_LABELS).forEach(key => {
const field = profileLifeForm.elements.namedItem(key);

if (field) {
field.value = profileData.life[key] || "";
}
});

const aboutField = profileLifeForm.elements.namedItem("about");

if (aboutField) {
aboutField.value = profileData.life.about || "";
}

renderCustomQuestionsInputs(profileData.life.custom);

if (profileFormMessage) {
profileFormMessage.hidden = true;
}
}

if (profileFormClose) {
profileFormClose.addEventListener("click", () => {
if (profileFormOverlay) {
profileFormOverlay.hidden = true;
}
});
}

// =========================================================
// FORMULAIRE "MODIFIER LE PROFIL" (INFORMATIONS PRINCIPALES)
// =========================================================
/*
* Contrairement à la Life, ces informations sont modifiables
* librement, sans aucun délai.
*/

function openEditProfileForm() {
if (!isOwner || !profileEditOverlay) {
return;
}

fillEditProfileForm();

profileEditOverlay.hidden = false;
}

function fillEditProfileForm() {
if (!profileEditForm) {
return;
}

const usernameField = document.getElementById("profileUsernameField");

if (usernameField) {
// Le pseudonyme est affiché mais reste définitivement
// non modifiable (champ désactivé).
usernameField.value = profileData.username;
}

const firstNameField = document.getElementById("profileFirstNameField");
const lastNameField = document.getElementById("profileLastNameField");
const bioField = document.getElementById("profileBioField");

if (firstNameField) {
firstNameField.value = profileData.firstName || "";
}

if (lastNameField) {
lastNameField.value = profileData.lastName || "";
}

if (bioField) {
bioField.value = profileData.bio || "";
}

if (profileEditMessage) {
profileEditMessage.hidden = true;
}
}

if (profileEditClose) {
profileEditClose.addEventListener("click", () => {
if (profileEditOverlay) {
profileEditOverlay.hidden = true;
}
});
}

if (profileEditForm) {
profileEditForm.addEventListener("submit", event => {
event.preventDefault();

const formData = new FormData(profileEditForm);

profileData.firstName = (formData.get("firstName") || "").toString().trim();
profileData.lastName = (formData.get("lastName") || "").toString().trim();
profileData.bio = (formData.get("bio") || "").toString().trim();

if (profileEditOverlay) {
profileEditOverlay.hidden = true;
}

renderProfileInfo();
});
}

// -----------------------------------------------------
// QUESTIONS PERSONNALISÉES
// -----------------------------------------------------

function renderCustomQuestionsInputs(entries) {
if (!customQuestionsList) {
return;
}

customQuestionsList.innerHTML = "";

entries.forEach(entry => {
appendCustomQuestionRow(entry.question || "", entry.answer || "");
});
}

function appendCustomQuestionRow(question, answer) {
if (!customQuestionsList) {
return;
}

const row = document.createElement("div");

row.className = "custom-question-item";

row.innerHTML = `
<div class="profile-form-field">
<label>Question</label>
<input type="text" class="custom-question-text" maxlength="80">
</div>

<div class="profile-form-field">
<label>Réponse</label>
<input type="text" class="custom-question-answer" maxlength="120">
</div>

<button type="button" class="custom-question-remove">
Supprimer cette question
</button>
`;

row.querySelector(".custom-question-text").value = question;
row.querySelector(".custom-question-answer").value = answer;

row.querySelector(".custom-question-remove").addEventListener("click", () => {
row.remove();
});

customQuestionsList.appendChild(row);
}

if (addCustomQuestionButton) {
addCustomQuestionButton.addEventListener("click", () => {
const currentCount = customQuestionsList
? customQuestionsList.querySelectorAll(".custom-question-item").length
: 0;

if (currentCount >= MAX_CUSTOM_QUESTIONS) {
if (profileFormMessage) {
profileFormMessage.hidden = false;
profileFormMessage.textContent =
`Vous avez atteint la limite de ${MAX_CUSTOM_QUESTIONS} questions personnalisées.`;
}

return;
}

appendCustomQuestionRow("", "");
});
}

// -----------------------------------------------------
// VALIDATION / ENVOI DU FORMULAIRE
// -----------------------------------------------------

if (profileLifeForm) {
profileLifeForm.addEventListener("submit", event => {
event.preventDefault();

const formData = new FormData(profileLifeForm);

const newLife = {
custom: [],
about: (formData.get("about") || "").toString().trim()
};

let hasAnyValue = newLife.about.length > 0;

Object.keys(LIFE_LABELS).forEach(key => {
const value = (formData.get(key) || "").toString().trim();

newLife[key] = value;

if (value) {
hasAnyValue = true;
}
});

if (customQuestionsList) {
customQuestionsList.querySelectorAll(".custom-question-item").forEach(row => {
const question = row.querySelector(".custom-question-text").value.trim();
const answer = row.querySelector(".custom-question-answer").value.trim();

if (question && answer) {
newLife.custom.push({ question, answer });
hasAnyValue = true;
}
});
}

if (!hasAnyValue) {
if (profileFormMessage) {
profileFormMessage.hidden = false;
profileFormMessage.textContent =
"Veuillez renseigner au moins une information avant de valider.";
}

return;
}

const wasCompleted = profileData.lifeCompleted;

profileData.life = newLife;
profileData.lifeCompleted = true;
profileData.lastEditAt = Date.now();

if (profileFormMessage) {
profileFormMessage.hidden = true;
}

if (profileFormOverlay) {
profileFormOverlay.hidden = true;
}

// La complétion de la Life rapporte +100 XP et débloque le
// deuxième badge, une seule fois (la première fois). Les
// modifications suivantes ne rapportent plus rien.
if (!wasCompleted) {
profileData.xp += 100;
renderTopbar();

addNotification("Votre Life est maintenant complétée. +100 XP.", "fa-circle-check");

const lifeBadge = {
id: "life-complete",
name: "Life complétée",
image: "../assets/images/badges/life-complete.png"
};

profileData.badges.push(lifeBadge);
renderBadges();

showBadgeUnlock(lifeBadge);
}

renderLifeSection();
});
}

// =========================================================
// BOUTON FLOTTANT ET PANNEAU D'ACTIONS — PROPRIÉTAIRE UNIQUEMENT
// =========================================================

if (profileFloatingAction) {
if (!isOwner) {
profileFloatingAction.hidden = true;
} else {
profileFloatingAction.addEventListener("click", () => {
closeAllPanels();

if (profileActionPanel) {
profileActionPanel.hidden = false;
}
});
}
}

if (profileActionPanelClose) {
profileActionPanelClose.addEventListener("click", () => {
if (profileActionPanel) {
profileActionPanel.hidden = true;
}
});
}

[
[addIllustratorButton, "Ajouter un profil illustrateur"],
[addWriterButton, "Ajouter un profil écrivain"],
[addCreatorButton, "Ajouter un profil créateur"],
[createGuildButton, "Créer une guilde"]
].forEach(([button, label]) => {
if (button) {
button.addEventListener("click", () => {
console.log(`Action sélectionnée : ${label}`);
});
}
});

// =========================================================
// INITIALISATION
// =========================================================

renderTopbar();
renderPhoto();
renderCover();
renderProfileInfo();
renderProfileActions();
renderBadges();
renderLifeSection();
renderLifeInteractions();
renderNotifications();

// Simulation : notification de bienvenue liée au badge de
// bienvenue reçu à l'inscription (à ne déclencher réellement
// qu'une fois, côté backend, lors de la création du compte).
if (isOwner && profileData.badges.some(badge => badge.id === "welcome")) {
addNotification("Bienvenue sur QuizTable ! Badge de bienvenue débloqué.", "fa-award");
}

});
