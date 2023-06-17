export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputList = this._getInputList();
    this._buttonElement = this._getButtonElement();
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!this._checkValidity(inputElement)) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    const hasInvalidInput = this._hasInvalidInput(this._inputList);

    this._buttonElement.disabled = hasInvalidInput;
    this._buttonElement.classList.toggle(
      this._inactiveButtonClass,
      hasInvalidInput
    );
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !this._checkValidity(inputElement);
    });
  }
  _checkValidity(inputElement) {
    return inputElement.validity.valid;
  }

  _getInputList() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    return inputList;
  }
  _getButtonElement() {
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    return buttonElement;
  }
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._toggleButtonState();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
