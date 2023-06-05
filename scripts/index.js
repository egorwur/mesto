import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./cards.js";

const galleryElement = document.querySelector(".gallery__items");

//PROFILE
const profileElement = document.querySelector(".profile");
const profilePopupButtonElement =
  profileElement.querySelector(".profile__edit-btn");
const profilePopupElement = document.querySelector(".popup-profile");

const newCardOpenButton = profileElement.querySelector(".profile__add-btn");

const formProfileElement = profilePopupElement.querySelector(".form");

const nameInput = formProfileElement.querySelector(".form__input_type_name");
const jobInput = formProfileElement.querySelector(
  ".form__input_type_description"
);

const nameOutput = profileElement.querySelector(".profile__name");
const jobOutput = profileElement.querySelector(".profile__description");

const popups = document.querySelectorAll(".popup");

// FULL SIZE PICTURE POPUP
const imagePopup = document.querySelector(".popup-image");
const imageInPopup = imagePopup.querySelector(".popup__image");
const titleInPopup = imagePopup.querySelector(".popup__image-name");

// FORM FORM NEW PICTURE
const imageAddPopup = document.querySelector(".popup-add");
const addNewCardFormElement = imageAddPopup.querySelector(".form");
const pictureNameInput = addNewCardFormElement.querySelector(
  ".form__input_type_name"
);
const pictureLinkInput = addNewCardFormElement.querySelector(
  ".form__input_type_link"
);

// FOR VALIDATION
const formValidators = {};

const settingsForValidation = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-btn",
  inactiveButtonClass: "form__save-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const formList = Array.from(
  document.querySelectorAll(settingsForValidation.formSelector)
);

formList.forEach((formElement) => {
  const formValidator = new FormValidator(settingsForValidation, formElement);
  formValidators[formElement.id] = formValidator;
  formValidator.enableValidation();
});

function resetValidation(formName) {
  const formValidator = formValidators[formName];
  if (formValidator) {
    formValidator.resetValidation();
  }
}

// Initial cards
initialCards.forEach((el) => {
  const cardElement = generateNewCard(el.name, el.link, ".card-template");
  prependCard(cardElement);
});

//IMAGE POPUP OPEN
export function openImagePopup(link, title) {
  openPopup(imagePopup);
  imageInPopup.src = link;
  imageInPopup.alt = title;
  titleInPopup.textContent = title;
}

// POPUP OPEN FUNCTION FOR ALL
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

//CLOSE POPUP ON ESC BUTTON
export function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//CLOSE POPUP BY BUTTON OR OVERLAY
function handleCloseByClick(evt) {
  const popup = evt.currentTarget;
  if (
    evt.target === popup ||
    evt.target.classList.contains("popup__close-btn")
  ) {
    closePopup(popup);
  }
}

//CARD CREATION
function generateNewCard(name, link) {
  const cardCopyElement = new Card(name, link, ".card-template");
  const cardElement = cardCopyElement.generate();
  return cardElement;
}

function prependCard(cardElement) {
  galleryElement.prepend(cardElement);
}

function newCardCreate(evt) {
  evt.preventDefault();

  const cardElement = generateNewCard(
    pictureNameInput.value,
    pictureLinkInput.value
  );
  prependCard(cardElement);
  closePopup(imageAddPopup);
  addNewCardFormElement.reset();
  resetValidation("gallery");
}

//PROFILE POPUP
const openProfilePopup = function () {
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
};
function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

  nameOutput.textContent = newName;
  jobOutput.textContent = newJob;

  closePopup(profilePopupElement);
  resetValidation("profile");
}

//EVENT LISTENERS
newCardOpenButton.addEventListener("click", () => openPopup(imageAddPopup));
profilePopupButtonElement.addEventListener("click", () => {
  openProfilePopup();
  openPopup(profilePopupElement);
});
formProfileElement.addEventListener("submit", handleFormSubmit);
addNewCardFormElement.addEventListener("submit", newCardCreate);
// CLOSE FUNCTION FOR ALL POPUPS
popups.forEach((popup) => {
  popup.addEventListener("click", handleCloseByClick);
});
