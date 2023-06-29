export default class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    }).then((res) => {  return this._checkForStatus(res);
    });
  }

  getProfileInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    }).then((res) => {  return this._checkForStatus(res);
    });
  }

  setProfileInfo(infoValues) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: infoValues.name,
        about: infoValues.about,
      }),
    }).then((res) => {  return this._checkForStatus(res);
    });
  }
  postNewCard(data) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {  return this._checkForStatus(res);
    });
  }

  removeLikeFromCard(id) {
    return fetch(`${this._baseURL}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => {  return this._checkForStatus(res);
    })
  }

  setLikeToCard(id) {
    return fetch(`${this._baseURL}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {  return this._checkForStatus(res);
    });
  }

  setProfileAvatar(url) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(url),
    }).then((res) => {  return this._checkForStatus(res);
    });
  }

  removeCard(id) {
    return fetch(`${this._baseURL}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {  return this._checkForStatus(res);
    });
  }

  _checkForStatus(res) {
    return res.ok
     ? res.json()
     : Promise.reject(`Ошибка: ${res.status}`)
  }
}
