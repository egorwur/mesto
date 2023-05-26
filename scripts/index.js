import Card from "./Card.js";

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

initialCards.forEach((el) => {
  const cardCopyElement = new Card(el.name, el.link, ".card-template");
  const cardElement = cardCopyElement.generate();
  galleryElement.append(cardElement);
});

// CLOSE FUNCTION FOR ALL POPUPS
const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close-btn");
  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });
  popup.addEventListener("click", closePopupByOverlay);
});

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
export default function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//CLOSE POPUP BY OVERLAY
function closePopupByOverlay(evt) {
  const popup = evt.currentTarget;
  if (evt.target === popup) {
    closePopup(popup);
  }
}
//NEW CARD CREATE / DELETE
const imageAddPopup = document.querySelector(".popup-add");
const addNewCardFormElement = imageAddPopup.querySelector(".form");
const pictureNameInput = addNewCardFormElement.querySelector(
  ".form__input_type_name"
);
const pictureLinkInput = addNewCardFormElement.querySelector(
  ".form__input_type_link"
);

function newCardCreate(evt) {
  evt.preventDefault();

  const cardCopyElement = new Card(
    pictureNameInput.value,
    pictureLinkInput.value,
    ".card-template"
  );
  const cardElement = cardCopyElement.generate();
  galleryElement.prepend(cardElement);
  closePopup(imageAddPopup);
  addNewCardFormElement.reset();
  evt.submitter.classList.add("form__save-btn_disabled");
  evt.submitter.disabled = true;
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
}

//EVENT LISTENERS
newCardOpenButton.addEventListener("click", () => openPopup(imageAddPopup));
profilePopupButtonElement.addEventListener("click", () => {
  openProfilePopup();
  openPopup(profilePopupElement);
});
formProfileElement.addEventListener("submit", handleFormSubmit);
addNewCardFormElement.addEventListener("submit", newCardCreate);
