import closeByEsc from "./index.js";

export default class Card {
  constructor(title, imageLink, templateSelector) {
    this._title = title;
    this._link = imageLink;
    this._templateSelector = templateSelector;
    this._cardElement = this._createCardElement();
  }
  _createCardElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    cardElement.querySelector(".card__title").textContent = this._title;
    const imageElement = cardElement.querySelector(".card__image");
    imageElement.src = this._link;
    imageElement.alt = this._title;

    return cardElement;
  }

  _deleteCard(evt) {
    evt.target.closest(".card").remove();
  }

  _handleLikeButton(evt) {
    evt.currentTarget.classList.toggle("card__like-btn_active");
  }

  _handleClickOnImage(evt) {
    const imagePopup = document.querySelector(".popup-image");

    imagePopup.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEsc);

    const imageInPopup = imagePopup.querySelector(".popup__image");
    const titleInPopup = imagePopup.querySelector(".popup__image-name");
    imageInPopup.src = evt.currentTarget.src;
    imageInPopup.alt = evt.currentTarget.alt;
    titleInPopup.textContent = evt.currentTarget
      .closest(".card")
      .querySelector(".card__title").textContent;
  }

  generate() {
    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-btn");
    likeButton.addEventListener("click", this._handleLikeButton);

    const imageElement = this._cardElement.querySelector(".card__image");
    imageElement.addEventListener("click", this._handleClickOnImage);

    const closeButtonElement = this._cardElement.querySelector(".card__remove-btn");
    closeButtonElement.addEventListener("click", this._deleteCard);
  }
}
