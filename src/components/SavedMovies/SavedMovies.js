import './SavedMovies.css';

import { useState, useContext, useEffect } from 'react';
import { filterMoviesList, sortShortMovies, } from '../../utils/utils.js';

import {SearchForm} from '../SearchForm/SearchForm.js';
import {MoviesCardList} from '../MoviesCardList/MoviesCardList.js';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';

export function SavedMovies({ onRemoveClick, addedMoviesList}) {
  const currentUser = useContext(CurrentUserContext); 

  const [shortMoviesCheck, setShortMoviesCheck] = useState(false); 
  const [queryMovies, setQueryMovies] = useState(addedMoviesList); 
  const [filteredMoviesList, setFilteredMoviesList] = useState([]); 
  const [NotFound, setNotFound] = useState(false); 

  useEffect(() => {
    if (localStorage.getItem(`${currentUser._id} - shortSavedMovies`) === 'true') {
      setShortMoviesCheck(true);
      setQueryMovies(sortShortMovies(addedMoviesList));
    } 
    else {
      setShortMoviesCheck(false);
      setQueryMovies(addedMoviesList);
    }
  }, [addedMoviesList, currentUser]);

  useEffect(() => {
    setFilteredMoviesList(addedMoviesList);
    addedMoviesList.length === 0 ? setNotFound(true) : setNotFound(false);
  }, [addedMoviesList]);

  function handleSearchFormSubmit(request) {
    const movies = filterMoviesList(addedMoviesList, request, shortMoviesCheck);
    if (movies.length === 0) {
      setNotFound(true);
    } 
    else {
      setNotFound(false);
      setFilteredMoviesList(movies);
      setQueryMovies(movies);
    }
  }

  function handleShortMoviesCheck() {
    if (shortMoviesCheck) {
      setShortMoviesCheck(false);
      // localStorage.setItem(`${currentUser._id} - shortSavedMovies`, false);
      filteredMoviesList.length === 0 ? setNotFound(true) : setNotFound(false);
      setQueryMovies(filteredMoviesList);
    } 
    else {
      setShortMoviesCheck(true);
      // localStorage.setItem(`${currentUser._id} - shortSavedMovies`, true);
      setQueryMovies(sortShortMovies(filteredMoviesList));
      sortShortMovies(filteredMoviesList).length === 0 ? setNotFound(true) : setNotFound(false);
    }
  }

  return (
    <main className="saved-movies">
      <SearchForm
        handleSearchFormSubmit={handleSearchFormSubmit}
        handleShortMoviesCheck={handleShortMoviesCheck}
        shortMoviesList={shortMoviesCheck}
      />
      
      {!NotFound && 
        (
          <MoviesCardList
            moviesList={queryMovies}
            addedMoviesList={addedMoviesList}
            onRemoveClick={onRemoveClick}
          />
        )
      }
    </main>
  );
}
