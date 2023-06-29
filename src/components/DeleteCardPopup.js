import Popup from "./Popup.js";

export default class DeleteCardPopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
  }

  confirm(callback) {
    this._confirm = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._confirm();
    });
  }
  close() {
    super.close();
  }
}
