export default class Card {
  constructor(
    data,
    templateSelector,
    openImagePopup,
    { handleLikeClick, handleDeleteClick },
    userID
  ) {
    this._data = data;
    this._openImagePopup = openImagePopup;
    this._templateSelector = templateSelector;
    this._cardElement = this._createCardElement();
    this._id = data._id;
    this._likes = data.likes;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._userID = userID;
    this._ownerID = data.owner._id;
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
    this._likeCountElement = cardElement.querySelector(".card__like-count");
    this._imageElement = cardElement.querySelector(".card__image");
    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.name;
    this._buttonLike = cardElement.querySelector(".card__like-btn");
    this._deleteButton = cardElement.querySelector(".card__remove-btn");

    return cardElement;
  }

  _deleteCard() {
    this._cardElement.remove();
  }

  _handleClickOnImage() {
    this._openImagePopup(this._data);
  }

  generate() {
    this._setUserLikes();
    this._setEventListeners();
    return this._cardElement;
  }

  setLike() {
    this._buttonLike.classList.add("card__like-btn_active");
    this.isLiked = true;
  }
  removeLike() {
    this._buttonLike.classList.remove("card__like-btn_active");
    this.isLiked = false;
  }

  setLikesCount(data) {
    this._likeCountElement.textContent = data.likes.length;
  }

  _checkUserLikes() {
    return this._likes.some((like) => {
      return like._id === this._userID;
    });
  }

  _setUserLikes() {
    this._checkUserLikes() ? this.setLike() : this.removeLike();
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => this._handleLikeClick());
    this._imageElement.addEventListener(
      "click",
      this._handleClickOnImage.bind(this)
    );

    this._userID === this._ownerID
      ? this._deleteButton.addEventListener("click", () =>
          this._handleDeleteClick()
        )
      : this._deleteButton.remove();
  }
}
