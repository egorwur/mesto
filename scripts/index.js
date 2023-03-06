const profileElement = document.querySelector('.profile')
const popupButtonElement = profileElement.querySelector('.profile__edit-btn')
const popupElement = document.querySelector('.popup')
let nameInputElement = popupElement.querySelector('.input__text')
let nameProfileElement = profileElement.querySelector('.profile__name')
const popupSaveButtonElement = popupElement.querySelector('.popup__save-btn')
const popupCloseButtonElement = popupElement.querySelector('.popup__close-btn')

const openPopup = function() {
  popupElement.classList.add('popup_opened')
};

const closePopup = function() {
  popupElement.classList.remove('popup_opened')
  nameInput.value = nameOutput.innerHTML
  jobInput.value = jobOutput.innerHTML
};

const closePopupByClickOnOverlay = function (event) {
if (event.target !== event.currentTarget) {
  return;
}
closePopup();

};

popupButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);

let formElement = document.querySelector('.input');

let nameInput = document.querySelector('.input__text_type_name');
let jobInput = document.querySelector('.input__text_type_description');

let nameOutput = document.querySelector('.profile__name');
let jobOutput = document.querySelector('.profile__description');

nameInput.value = nameOutput.innerHTML
jobInput.value = jobOutput.innerHTML

function handleFormSubmit(evt) {
  evt.preventDefault();

  let newName = nameInput.value;
  let newJob = jobInput.value;

  nameOutput.textContent = newName;
  jobOutput.textContent = newJob;

  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
