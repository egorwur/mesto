import Popup from "./Popup.js"

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submit = submitFunction;
    this._form = this._popup.querySelector('.form')
    this._inputList = this._form.querySelectorAll('.form__input')
  }
  close() {
    super.close();
    this._form.reset();
  }
  getInputValues() {
    this._value = {};
    this._inputList.forEach(input => {
      this._value[input.name] = input.value;
    })
    return this._value
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submit);
  }
  setInputValues(newData) {
    this._inputList.forEach(input => {
      input.value = newData[input.name]
    })
  }
}
