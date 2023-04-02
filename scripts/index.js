const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardTemplateElement = document.querySelector(".card-template").content;
const galleryElement = document.querySelector(".gallery__items");

function createCardElement(name, link) {
  const cardCopyElement = cardTemplateElement.querySelector(".card").cloneNode(true);

  cardCopyElement.querySelector(".card__title").textContent = name;
  cardCopyElement.querySelector(".card__image").src = link;
  cardCopyElement.querySelector(".card__image").alt = name;
  cardCopyElement.querySelector(".card__image").addEventListener("click", openImagePopup);
  cardCopyElement.querySelector(".card__remove-btn").addEventListener("click", deleteCard);
  cardCopyElement.querySelector(".card__like-btn").addEventListener("click", (evt) => evt.currentTarget.classList.toggle("card__like-btn_active"));

  return cardCopyElement;
}

initialCards.forEach((el) => {
  const cardCopyElement = createCardElement(el.name, el.link);
  galleryElement.append(cardCopyElement);
});
// initialCards.forEach((el) => {
//   const cardCopyElement = cardTemplateElement
//     .querySelector(".card")
//     .cloneNode(true);

//   let cardLink = (cardCopyElement.querySelector(".card__image").src = el.link);
//   let cardName = (cardCopyElement.querySelector(".card__title").textContent =
//     el.name);

//   cardCopyElement
//     .querySelector(".card__image")
//     .addEventListener("click", imagePopupOpen);

//   let removeCardButton = cardCopyElement
//     .querySelector(".card__remove-btn")
//     .addEventListener("click", deleteCard);
//   let likeButton = cardCopyElement
//     .querySelector(".card__like-btn")
//     .addEventListener("click", (evt) =>
//       evt.currentTarget.classList.toggle("card__like-btn_active")
//     );
//   galleryElement.append(cardCopyElement);
// });

//image popup open
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

// Get all popup elements
const popups = document.querySelectorAll(".popup");

// Add click event listener to each close button
popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close-btn");
  closeButton.addEventListener("click", () => {
    popup.closest(".popup").classList.remove("popup_opened");
  });
});

// NEW PICTURE POPUP
// const addPopup = document.querySelector(".popup-add");
// const addNewCardFormElement = addPopup.querySelector(".form");
// let pictureNameInput = addNewCardFormElement.querySelector(
//   ".form__text_type_name"
// );
// let pictureLinkInput = addNewCardFormElement.querySelector(
//   ".form__text_type_link"
// );

// function newCardCreate(evt) {
//   evt.preventDefault();

//   const cardCopyElement = cardTemplateElement
//     .querySelector(".card")
//     .cloneNode(true);

//   cardCopyElement.querySelector(".card__title").textContent =
//     pictureNameInput.value;
//   cardCopyElement.querySelector(".card__image").src = pictureLinkInput.value;

//   cardCopyElement
//     .querySelector(".card__image")
//     .addEventListener("click", imagePopupOpen);

//   let removeCardButton = cardCopyElement
//     .querySelector(".card__remove-btn")
//     .addEventListener("click", deleteCard);
//   let likeButton = cardCopyElement
//     .querySelector(".card__like-btn")
//     .addEventListener("click", (evt) =>
//       evt.currentTarget.classList.toggle("card__like-btn_active")
//     );
//   galleryElement.prepend(cardCopyElement);

//   closeNewCardPopup();

//   pictureNameInput.value = "";
//   pictureLinkInput.value = "";
// }
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

  let cardCopyElement = createCardElement(pictureNameInput.value, pictureLinkInput.value);
  galleryElement.prepend(cardCopyElement);


  imageAddPopup.classList.remove('popup_opened');
  addNewCardFormElement.reset();
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

const profileElement = document.querySelector(".profile");
const popupButtonElement = profileElement.querySelector(".profile__edit-btn");
const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close-btn");

//New picture popup open/close
const newCardOpenButton = profileElement
  .querySelector(".profile__add-btn")
newCardOpenButton.addEventListener("click", () => imageAddPopup.classList.add("popup_opened"));
const newCardCloseButton = imageAddPopup.querySelector(".popup__close-btn");


const formElement = document.querySelector(".form");

let nameInput = formElement.querySelector(".form__text_type_name");
let jobInput = formElement.querySelector(".form__text_type_description");

let nameOutput = profileElement.querySelector(".profile__name");
let jobOutput = profileElement.querySelector(".profile__description");

const openPopup = function () {
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
  popupElement.classList.add("popup_opened");
};

popupButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", (evt) => evt.currentTarget.closest('.popup'.classList.remove('popup_opened')));

function handleFormSubmit(evt) {
  evt.preventDefault();

  let newName = nameInput.value;
  let newJob = jobInput.value;

  nameOutput.textContent = newName;
  jobOutput.textContent = newJob;

  closePopup();
}

formElement.addEventListener("submit", handleFormSubmit);
addNewCardFormElement.addEventListener("submit", newCardCreate);

