const profileElement = document.querySelector(".profile");
const popupButtonElement = profileElement.querySelector(".profile__edit-btn");
const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close-btn");

const formElement = document.querySelector(".form");

let nameInput = formElement.querySelector(".form__text_type_name");
let jobInput = formElement.querySelector(".form__text_type_description");

let nameOutput = profileElement.querySelector(".profile__name");
let jobOutput = profileElement.querySelector(".profile__description");

const openPopup = function () {
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
  popupElement.classList.add("popup_opened");
};

const closePopup = function () {
  popupElement.classList.remove("popup_opened");
};

popupButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();

  let newName = nameInput.value;
  let newJob = jobInput.value;

  nameOutput.textContent = newName;
  jobOutput.textContent = newJob;

  closePopup();
}

formElement.addEventListener("submit", handleFormSubmit);
