
//Проверка постера и названия фильма
function convertMovie(moviesList) {
  moviesList.forEach(movie => {
    if (movie.image) {
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
      movie.image = `https://api.nomoreparties.co${movie.image.url}`
    } else {
      movie.image = 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1156&q=80';
      movie.thumbnail = 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1156&q=80';
    }

    if(!movie.nameEN) {
      movie.nameEN = movie.nameRU;
    }

    if(!movie.country) {
      movie.country = 'Russia';
    }
    
  });
  return moviesList;
}

// Конвертация длительности фильма в ч.м.
function convertMovieDuration(duration) {
  const minutes = duration % 60;
  const hours = Math.trunc(duration / 60);

  return hours === 0 ? `${minutes}м` : `${hours}ч ${minutes}м`
}


// Фильтр по запросу
function filterMoviesList(moviesList, userReq, shortMoviesCheckbox) {
  const moviesByUserReq = moviesList.filter((movie) => {
    const userMovie = userReq.toLowerCase().trim();
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
  });
  
  return shortMoviesCheckbox ? sortShortMovies(moviesByUserReq) : moviesByUserReq;
}

// Сортировка фильмов по длительности
function sortShortMovies(moviesList) {
  return moviesList.filter(movie => movie.duration < 40);
}

// Получение списка сохраненных фильмов
function getAddedMoviesCards(array, movie) {
  return array.find((item) => {
    return item.movieId === (movie.id || movie.movieId);
  });
}

export {
  convertMovie,
  filterMoviesList,
  sortShortMovies,
  convertMovieDuration,
  getAddedMoviesCards,
};
