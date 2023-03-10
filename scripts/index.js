const profileElement = document.querySelector('.profile')
const popupButtonElement = profileElement.querySelector('.profile__edit-btn')
const popupElement = document.querySelector('.popup')
const popupSaveButtonElement = popupElement.querySelector('.popup__save-btn')
const popupCloseButtonElement = popupElement.querySelector('.popup__close-btn')

const openPopup = function() {
  popupElement.classList.add('popup_opened')
};

const closePopup = function() {
  popupElement.classList.remove('popup_opened')
  nameInput.value = nameOutput.textContent
  jobInput.value = jobOutput.textContent
};


popupButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

const formElement = document.querySelector('.input');

let nameInput = formElement.querySelector('.input__text_type_name');
let jobInput = formElement.querySelector('.input__text_type_description');

let nameOutput = profileElement.querySelector('.profile__name');
let jobOutput = profileElement.querySelector('.profile__description');

nameInput.value = nameOutput.textContent
jobInput.value = jobOutput.textContent

function handleFormSubmit(evt) {
  evt.preventDefault();

  let newName = nameInput.value;
  let newJob = jobInput.value;

  nameOutput.textContent = newName;
  jobOutput.textContent = newJob;

  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
