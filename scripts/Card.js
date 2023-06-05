import { closeByEsc, openImagePopup } from "./index.js";

export default class Card {
  constructor(title, imageLink, templateSelector) {
    this._title = title;
    this._link = imageLink;
    this._templateSelector = templateSelector;
    this._buttonLike = null;
    this._cardElement = this._createCardElement();
  }

  _getCardTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  _createCardElement() {
    const cardElement = this._getCardTemplate();

    cardElement.querySelector(".card__title").textContent = this._title;

    this._imageElement = cardElement.querySelector(".card__image");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._title;

    this._buttonLike = cardElement.querySelector(".card__like-btn");

    return cardElement;
  }

  _deleteCard(evt) {
    evt.target.closest(".card").remove();
  }

  _handleLikeButton() {
    this._buttonLike.classList.toggle("card__like-btn_active");
  }

  _handleClickOnImage() {
    openImagePopup(this._link, this._title);
  }

  generate() {
    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener(
      "click",
      this._handleLikeButton.bind(this)
    );

    const imageElement = this._imageElement;
    imageElement.addEventListener("click", this._handleClickOnImage.bind(this));

    const closeButtonElement =
      this._cardElement.querySelector(".card__remove-btn");
    closeButtonElement.addEventListener("click", this._deleteCard);
  }
}
