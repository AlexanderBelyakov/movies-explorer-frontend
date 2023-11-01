class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    signIn(email, password) {
        return fetch(this._baseUrl + "/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }).then(this._checkResponse);
      }

      signUp(name, email, password) {
        return fetch(this._baseUrl + "/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }).then(this._checkResponse);
      }

      getUserInfo() {
        return fetch(this._baseUrl + "/users/me", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
          },
        }).then(this._checkResponse);
      }

      editUserInfo(newUserInfo) {
        return fetch(this._baseUrl + "/users/me", {
          method: "PATCH",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newUserInfo.name,
            email: newUserInfo.email,
          }),
        }).then(this._checkResponse);
      }

      addNewCard(newCard) {
        return fetch(this._baseUrl + "/movies", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: newCard.country,
            director: newCard.director,
            duration: newCard.duration,
            year: newCard.year,
            description: newCard.description,
            image: newCard.image,
            trailerLink: newCard.trailerLink,
            nameRU: newCard.nameRU,
            nameEN: newCard.nameEN,
            thumbnail: newCard.thumbnail,
            movieId: newCard.id,
          }),
        }).then(this._checkResponse);
      }

      deleteCard(cardId) {
        return fetch(this._baseUrl + "/movies/" + cardId, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
          },
        }).then(this._checkResponse);
      }

      getCurrentUserMovies() {
        return fetch(this._baseUrl + "/movies", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            }
        }).then(this._checkResponse);
      }
      
      checkTokenValidity() {
        const token = localStorage.getItem('jwt')
        return fetch(this._baseUrl + "/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }).then(this._checkResponse);
      }
}

const mainApi = new MainApi({
    baseUrl: "https://api.moviegrand.nomoredomainsicu.ru"
})

export default mainApi