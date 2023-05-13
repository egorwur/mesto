const cardTemplateElement = document.querySelector(".card-template").content;
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

//IMAGE FULL SIZE POPUP
const imagePopup = document.querySelector(".popup-image");

function openImagePopup(evt) {
  const imageInPopup = imagePopup.querySelector(".popup__image");
  const titleInPopup = imagePopup.querySelector(".popup__image-name");

  imageInPopup.src = evt.currentTarget.src;
  imageInPopup.alt = evt.currentTarget.alt;
  titleInPopup.textContent = evt.currentTarget
    .closest(".card")
    .querySelector(".card__title").textContent;
}

//CARDS FROM DATA
function createCardElement(name, link) {
  const cardCopyElement = cardTemplateElement
    .querySelector(".card")
    .cloneNode(true);
  const cardImageElement = cardCopyElement.querySelector(".card__image");
  cardCopyElement.querySelector(".card__title").textContent = name;
  cardImageElement.src = link;
  cardImageElement.alt = name;

  cardCopyElement
    .querySelector(".card__like-btn")
    .addEventListener("click", (evt) =>
      evt.currentTarget.classList.toggle("card__like-btn_active")
    );
  cardImageElement.addEventListener("click", (evt) => {
    openImagePopup(evt);
    openPopup(imagePopup);
  });
  cardCopyElement
    .querySelector(".card__remove-btn")
    .addEventListener("click", deleteCard);

  return cardCopyElement;
}

initialCards.forEach((el) => {
  const cardCopyElement = createCardElement(el.name, el.link);
  galleryElement.append(cardCopyElement);
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
  document.addEventListener('keydown', closeByEsc)
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEsc)
}

//CLOSE POPUP ON ESC BUTTON
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
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

  const cardCopyElement = createCardElement(
    pictureNameInput.value,
    pictureLinkInput.value
  );
  galleryElement.prepend(cardCopyElement);
  closePopup(imageAddPopup);
  addNewCardFormElement.reset();
  evt.submitter.classList.add('form__save-btn_disabled')
  evt.submitter.disabled = true;
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
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
