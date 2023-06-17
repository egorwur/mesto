export default class Card {
  constructor(data, templateSelector, openImagePopup) {
    this._data = data;
    // this._title = title;
    // this._link = imageLink;
    this._openImagePopup = openImagePopup;
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

    cardElement.querySelector(".card__title").textContent = this._data.name;

    this._imageElement = cardElement.querySelector(".card__image");
    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.name;
    this._buttonLike = cardElement.querySelector(".card__like-btn");

    return cardElement;
  }

  _deleteCard() {
    this._cardElement.remove();
  }

  _handleLikeButton() {
    this._buttonLike.classList.toggle("card__like-btn_active");
  }

  _handleClickOnImage() {
    this._openImagePopup(this._data);
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
    closeButtonElement.addEventListener("click", this._deleteCard.bind(this));
  }
}
