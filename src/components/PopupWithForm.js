import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction, buttonText) {
    super(popupSelector);
    this._submit = submitFunction;
    this._form = this._popup.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".form__input");
    this._submitButton = this._form.querySelector(".form__save-btn");
    this._buttonText = buttonText;
  }
  close() {
    super.close();
    this._form.reset();
  }
  getInputValues() {
    this._value = {};
    this._inputList.forEach((input) => {
      this._value[input.name] = input.value;
    });
    return this._value;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submit);
  }
  setInputValues(newData) {
    this._inputList.forEach((input) => {
      input.value = newData[input.name];
    });
  }
  isLoading(status) {
    status
      ? (this._submitButton.textContent = this._buttonText.loadingText)
      : (this._submitButton.textContent = this._buttonText.defaultText);
  }
}
