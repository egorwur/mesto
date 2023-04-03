const cardTemplateElement = document.querySelector(".card-template").content;
const galleryElement = document.querySelector(".gallery__items");

//PROFILE
const profileElement = document.querySelector(".profile");
const profilePopupButtonElement =
  profileElement.querySelector(".profile__edit-btn");
const profilePopupElement = document.querySelector(".popup-profile");

const newCardOpenButton = profileElement.querySelector(".profile__add-btn");

const formProfileElement = profilePopupElement.querySelector(".form");

const nameInput = formProfileElement.querySelector(".form__text_type_name");
const jobInput = formProfileElement.querySelector(".form__text_type_description");

const nameOutput = profileElement.querySelector(".profile__name");
const jobOutput = profileElement.querySelector(".profile__description");

//IMAGE FULL SIZE POPUP
const imagePopup = document.querySelector(".popup-image");

function openImagePopup(evt) {
  imagePopup.classList.add("popup_opened");

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

  cardCopyElement.querySelector(".card__title").textContent = name;
  cardCopyElement.querySelector(".card__image").src = link;
  cardCopyElement.querySelector(".card__image").alt = name;
  cardCopyElement
    .querySelector(".card__image")
    .addEventListener("click", openImagePopup);
  cardCopyElement
    .querySelector(".card__remove-btn")
    .addEventListener("click", deleteCard);
  cardCopyElement
    .querySelector(".card__like-btn")
    .addEventListener("click", (evt) =>
      evt.currentTarget.classList.toggle("card__like-btn_active")
    );

  return cardCopyElement;
}

initialCards.forEach((el) => {
  const cardCopyElement = createCardElement(el.name, el.link);
  galleryElement.append(cardCopyElement);
});

// CLOSE BUTTON FOR ALL POPUPS
const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close-btn");
  closeButton.addEventListener("click", () => {
    popup.closest(".popup").classList.remove("popup_opened");
  });
});

//POPUP CLOSE BY SUBMIT FUNCTION
function closeCurrentPopup() {
  const openedPopup = document.querySelector(".popup_opened");
  if (openedPopup) {
    openedPopup.classList.remove("popup_opened");
  }
}

//NEW CARD CREATE / DELETE
const imageAddPopup = document.querySelector(".popup-add");
const addNewCardFormElement = imageAddPopup.querySelector(".form");
const pictureNameInput = addNewCardFormElement.querySelector(
  ".form__text_type_name"
);
const pictureLinkInput = addNewCardFormElement.querySelector(
  ".form__text_type_link"
);

function newCardCreate(evt) {
  evt.preventDefault();

  const cardCopyElement = createCardElement(
    pictureNameInput.value,
    pictureLinkInput.value
  );
  galleryElement.prepend(cardCopyElement);

  closeCurrentPopup();
  addNewCardFormElement.reset();
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

//PROFILE POPUP
const openProfilePopup = function () {
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
  profilePopupElement.classList.add("popup_opened");
};

function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

  nameOutput.textContent = newName;
  jobOutput.textContent = newJob;

  closeCurrentPopup();
}

//EVENT LISTENERS
newCardOpenButton.addEventListener("click", () =>
  imageAddPopup.classList.add("popup_opened")
);
profilePopupButtonElement.addEventListener("click", openProfilePopup);
formProfileElement.addEventListener("submit", handleFormSubmit);
addNewCardFormElement.addEventListener("submit", newCardCreate);
