export const settingsForValidation = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-btn",
  inactiveButtonClass: "form__save-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export const optionsAPI = {
  baseURL: "https://mesto.nomoreparties.co/v1/cohort-69",
  headers: {
    authorization: "f9c70e99-4ebc-4844-a253-f3ba6e8069d5",
    "Content-Type": "application/json",
  },
};

export const profilePopupButton = document.querySelector(".profile__edit-btn");

export const avatarPopupButton = document.querySelector(
  ".profile__avatar-container"
);

export const newCardOpenButton = document.querySelector(".profile__add-btn");

export const profileData = {
  name: ".profile__name",
  about: ".profile__description",
  avatar: ".profile__avatar",
};
