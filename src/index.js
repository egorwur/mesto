import './index.css';
import Card from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { initialCards } from "./components/cards.js";
import Section from './components/Section.js';
import Popup from './components/Popup.js'
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import { settingsForValidation, profilePopupButton, newCardOpenButton, profileData } from './utils/constants';

const userInfo = new UserInfo(profileData);
const popup = new Popup('.popup');
const popupWithImage = new PopupWithImage('.popup-image');

const popupProfileForm = new PopupWithForm('.popup-profile', (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfileForm.getInputValues());
  popupProfileForm.close();
  profileValidation.resetValidation();
})

const popupNewCardForm = new PopupWithForm('.popup-add', (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupNewCardForm.getInputValues()))
  popupNewCardForm.close();
  newCardFormValidation.resetValidation();
})
profilePopupButton.addEventListener('click', () => {
  popupProfileForm.setInputValues(userInfo.getUserInfo())
  popupProfileForm.open()
});

//SECTION.js  Initial cards
const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.card-template', popupWithImage.open);
    return card.generate();
  }
}, '.gallery__items');
section.renderItems();

// VALIDATION
const profileEditForm = document.forms['profile']
const newCardForm = document.forms['gallery']
const profileValidation = new FormValidator(settingsForValidation, profileEditForm)
profileValidation.enableValidation();
const newCardFormValidation = new FormValidator(settingsForValidation, newCardForm)
newCardFormValidation.enableValidation();

// EVENT LISTENERS
popup.setEventListeners();
popupWithImage.setEventListeners();
popupProfileForm.setEventListeners();

newCardOpenButton.addEventListener('click', () => {popupNewCardForm.open()});
popupNewCardForm.setEventListeners();
