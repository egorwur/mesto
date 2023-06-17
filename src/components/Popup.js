export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector('.popup__close-btn')
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }
  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _handleCloseBtn = () => {
    this.close();
  }
  _handleCloseByOverlay = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains(this._closeBtn)) {
      this.close();
    }
  }
  setEventListeners() {
    this._closeBtn.addEventListener('click', this._handleCloseBtn);
    this._popup.addEventListener('click', this._handleCloseByOverlay)
  }
}
