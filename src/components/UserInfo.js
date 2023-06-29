export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name);
    this._description = document.querySelector(data.about);
    this._avatar = document.querySelector(data.avatar);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._description.textContent,
    };
  }
  getUserID() {
    return this._id;
  }

  setUserInfo(newData) {
    this._name.textContent = newData.name;
    this._description.textContent = newData.about;
    this._id = newData._id;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
