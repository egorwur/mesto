export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name);
    this._description = document.querySelector(data.description);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }
  setUserInfo(newData) {
    this._name.textContent = newData.name;
    this._description.textContent = newData.description;
  }
}
