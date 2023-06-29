import "./index.css";
import Card from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import Section from "./components/Section.js";
import Popup from "./components/Popup.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import {
  settingsForValidation,
  profilePopupButton,
  newCardOpenButton,
  profileData,
  optionsAPI,
  avatarPopupButton,
} from "./utils/constants";
import Api from "./components/Api.js";
import DeleteCardPopup from "./components/DeleteCardPopup.js";

const api = new Api(optionsAPI);

const section = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = cardElement(item, userInfo.getUserID());
      card.setLikesCount(item);
      section.appendItem(card.generate());
    },
  },
  ".gallery__items"
);

const deleteCardPopup = new DeleteCardPopup(".popup-delete-confirm");
deleteCardPopup.setEventListeners();

const userInfo = new UserInfo(profileData);
const popup = new Popup(".popup");
const popupWithImage = new PopupWithImage(".popup-image");

const popupProfileForm = new PopupWithForm(
  ".popup-profile",
  (evt) => {
    evt.preventDefault();
    popupProfileForm.isLoading(true);
    api
      .setProfileInfo(popupProfileForm.getInputValues())
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .finally(() => {
        popupProfileForm.close();
        popupProfileForm.isLoading(false);
        profileValidation.resetValidation();
      })
      .catch((err) => console.log(err));
  },
  { loadingText: "Сохранение...", defaultText: "Сохранить" }
);

const popupAvatarChange = new PopupWithForm(
  ".popup-avatar",
  (evt) => {
    evt.preventDefault();
    popupAvatarChange.isLoading(true);
    api
      .setProfileAvatar(popupAvatarChange.getInputValues())
      .then((res) => {
        userInfo.setUserAvatar(res);
      })
      .finally(() => {
        popupAvatarChange.close();
        popupAvatarChange.isLoading(false);
        avatarValidation.resetValidation();
      })
      .catch((err) => console.log(err));
  },
  { loadingText: "Сохранение...", defaultText: "Сохранить" }
);

//RENDER INITIAL INFO(AVATAR, NAME, ABOUT) AND CARDS
Promise.all([api.getInitialCards(), api.getProfileInfo()])
  .then(([cardsData, userData]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    section.addItems(cardsData)
  })
  .catch((err) => console.log(err))

const cardElement = (item, userID, likes) => {
  const card = new Card(
    item,
    ".card-template",
    popupWithImage.open,
    {
      handleLikeClick: () => {
        card.isLiked
          ? api
              .removeLikeFromCard(card._id)
              .then((data) => {
                card.removeLike();
                card.setLikesCount(data);
              })
              .catch((err) => console.log(err))
          : api
              .setLikeToCard(card._id)
              .then((data) => {
                card.setLike();
                card.setLikesCount(data);
              })
              .catch((err) => console.log(err));
      },
      handleDeleteClick: () => {
        deleteCardPopup.open();
        deleteCardPopup.confirm(() => {
          api
            .removeCard(item._id)
            .then(() => {
              card._deleteCard();
              deleteCardPopup.close();
            })
            .catch((err) => console.log(err));
        });
      },
    },
    userID
  );
  return card;
};

const popupNewCardForm = new PopupWithForm(
  ".popup-add",
  (evt) => {
    evt.preventDefault();
    popupNewCardForm.isLoading(true);
    api
      .postNewCard(popupNewCardForm.getInputValues())
      .then((item) => {
        const card = cardElement(item, userInfo.getUserID(), item.likes);
        card.setLikesCount(item);
        section.prependItem(card.generate());
      })
      .finally(() => {
        popupNewCardForm.close();
        popupNewCardForm.isLoading(false);
      })
      .catch((err) => console.log(err));
  },
  { loadingText: "Создание...", defaultText: "Создать" }
);

// VALIDATION
const profileEditForm = document.forms["profile"];
const newCardForm = document.forms["gallery"];
const newAvatarForm = document.forms["avatar"];
const profileValidation = new FormValidator(
  settingsForValidation,
  profileEditForm
);
profileValidation.enableValidation();

const avatarValidation = new FormValidator(
  settingsForValidation,
  newAvatarForm
);
avatarValidation.enableValidation();

const newCardFormValidation = new FormValidator(
  settingsForValidation,
  newCardForm
);
newCardFormValidation.enableValidation();

// EVENT LISTENERS
avatarPopupButton.addEventListener("click", () => {
  popupAvatarChange.open();
});

profilePopupButton.addEventListener("click", () => {
  popupProfileForm.setInputValues(userInfo.getUserInfo());
  popupProfileForm.open();
  profileValidation.resetValidation();
});

popup.setEventListeners();
popupWithImage.setEventListeners();
popupProfileForm.setEventListeners();
popupAvatarChange.setEventListeners();

newCardOpenButton.addEventListener("click", () => {
  popupNewCardForm.open();
  newCardFormValidation.resetValidation();
});

popupNewCardForm.setEventListeners();
