document.addEventListener("DOMContentLoaded", () => {
// =====================================
// ÉLÉMENTS
// =====================================
const toggleButton = document.getElementById("reclamationToggle");
const formWrapper = document.getElementById("reclamationFormWrapper");
const closeButton = document.getElementById("reclamationClose");
const reclamationForm = document.getElementById("reclamationForm");
const reclamationType = document.getElementById("reclamationType");
const rewardDisclaimer =
document.getElementById("rewardDisclaimer");
const otherReclamationWrapper =
document.getElementById("otherReclamationWrapper");
const reclamationOther =
document.getElementById("reclamationOther");
// =====================================
// OUVRIR LE FORMULAIRE
// =====================================
toggleButton.addEventListener("click", () => {
formWrapper.classList.add("active");
toggleButton.style.display = "none";
formWrapper.scrollIntoView({
behavior: "smooth",
block: "start"
});
});
// =====================================
// FERMER LE FORMULAIRE
// =====================================
closeButton.addEventListener("click", () => {
formWrapper.classList.remove("active");
toggleButton.style.display = "flex";
});
// =====================================
// CHANGEMENT DU TYPE
// =====================================
reclamationType.addEventListener("change", () => {
const selectedType = reclamationType.value;
// -------------------------------
// RÉCOMPENSE
// -------------------------------
if(selectedType === "reward"){
rewardDisclaimer.classList.add("active");
}else{
rewardDisclaimer.classList.remove("active");
}
// -------------------------------
// AUTRE
// -------------------------------
if(selectedType === "other"){
otherReclamationWrapper.classList.add("active");
reclamationOther.required = true;
}else{
otherReclamationWrapper.classList.remove("active");
reclamationOther.required = false;
reclamationOther.value = "";
}
});
// =====================================
// ENVOI
// =====================================
reclamationForm.addEventListener("submit", (event) => {
event.preventDefault();
const quiz =
document.getElementById("reclamationQuiz").value.trim();
const date =
document.getElementById("reclamationDate").value;
const type =
reclamationType.value;
const message =
document.getElementById("reclamationMessage").value.trim();
if(!quiz || !date || !type || !message){
alert("Veuillez remplir tous les champs obligatoires.");
return;
}
// =================================
// POUR LE MOMENT
// =================================
console.log("Réclamation envoyée :", {
quiz: quiz,
date: date,
type: type,
autre:
reclamationOther.value.trim(),
message: message
});
alert(
"Votre réclamation a bien été enregistrée."
);
// Réinitialisation
reclamationForm.reset();
rewardDisclaimer.classList.remove("active");
otherReclamationWrapper.classList.remove("active");
reclamationOther.required = false;
formWrapper.classList.remove("active");
toggleButton.style.display = "flex";
});
});