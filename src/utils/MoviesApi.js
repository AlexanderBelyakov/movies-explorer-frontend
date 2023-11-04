class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    
    getMovies() {
        return fetch(this._baseUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(this._checkResponse)
    }
}

const moviesApi = new MoviesApi({baseUrl:"https://api.nomoreparties.co/beatfilm-movies"})

export default moviesApi