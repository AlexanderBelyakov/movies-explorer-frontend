import './Movies.css';

import { useState, useContext, useEffect } from 'react';
import {convertMovie, filterMoviesList, sortShortMovies} from '../../utils/utils.js';

import {MoviesCardList} from '../MoviesCardList/MoviesCardList.js';
import {SearchForm} from '../SearchForm/SearchForm.js';
import moviesApi from '../../utils/MoviesApi.js';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import { InfoTooltip } from '../InfoToolTip/InfoToolTip';
import fail from "../../images/fail.png";


export function Movies({setIsLoaderOn, addedMoviesList, onRemoveClick, onAddClick}) {
  
  const currentUser = useContext(CurrentUserContext); 

  const [isAllMoviesList, setIsAllMoviesList] = useState([]); 
  const [queryMovies, setQueryMovies] = useState([]); 

  const [shortMoviesCheck, setShortMoviesCheck] = useState(false); 
  const [filteredMoviesList, setFilteredMoviesList] = useState([]); 

  const [NotFound, setNotFound] = useState(false); 
  const [isSuccessText, setIsSuccessText] = useState("Ничего не найдено");
  const [isSuccessImage, setIsSuccessImage] = useState(fail);
  const [isInfoTooltipOpen, showInfoTooltip] = useState(false);
  

  useEffect(() => {
    (localStorage.getItem(`${currentUser._id} - shortMovies`) === 'true') ? setShortMoviesCheck(true) : setShortMoviesCheck(false)
  }, [currentUser]);


  useEffect(() => {
      if (localStorage.getItem(`${currentUser._id} - movies`)) {
        const moviesList = JSON.parse(localStorage.getItem(`${currentUser._id} - movies`)
      );

      setQueryMovies(moviesList);

      if (localStorage.getItem(`${currentUser._id} - shortMovies`) === 'true') 
        {
          setFilteredMoviesList(sortShortMovies(moviesList));
        } 
      else 
        {
          setFilteredMoviesList(moviesList);
        }
    }
  }, [currentUser]);


  function handleSetMoviesList(moviesList, request, shortMoviesCheckbox) {
    const movies = filterMoviesList(moviesList, request, shortMoviesCheckbox);

    if (movies.length === 0) {
      showInfoTooltip(true)
      setNotFound(true);
    } 
    else {
      setNotFound(false);
    }

    setQueryMovies(movies);
    setFilteredMoviesList(!shortMoviesCheckbox ? movies : sortShortMovies(movies));
    localStorage.setItem(`${currentUser._id} - movies`, JSON.stringify(movies));
  }

  function handleSearchFormSubmit(request) {
    localStorage.setItem(`${currentUser._id} - shortMovies`, shortMoviesCheck);
    localStorage.setItem(`${currentUser._id} - movieSearch`, request);

    if (isAllMoviesList.length === 0) {
        moviesApi
          .getMovies()
          .then(moviesList => {
            setIsAllMoviesList(moviesList);
            handleSetMoviesList(
              convertMovie(moviesList),
              request,
              shortMoviesCheck
            );
          })
          .catch((err) =>
            console.log(err)
          )
        } 
        else {
          handleSetMoviesList(isAllMoviesList, request, shortMoviesCheck);
        }
    }

  function handleShortMoviesCheck() {
    setShortMoviesCheck(!shortMoviesCheck);
    if (shortMoviesCheck) {
      setFilteredMoviesList(queryMovies);
    } else {
      setFilteredMoviesList(sortShortMovies(queryMovies));
    }
    localStorage.setItem(`${currentUser._id} - shortMovies`, !shortMoviesCheck);
  }

  function closePopup() {
    showInfoTooltip(false)
  }

  return (
    <main className="movies">

      <SearchForm
        handleSearchFormSubmit={handleSearchFormSubmit}
        handleShortMoviesCheck={handleShortMoviesCheck}
        shortMoviesCheck={shortMoviesCheck}
      />
      
      {!NotFound && (
        <MoviesCardList
          moviesList={filteredMoviesList}
          addedMoviesList={addedMoviesList}
          onAddClick={onAddClick}
          onRemoveClick={onRemoveClick}  
          onLoad={setIsLoaderOn}
        />
      )}
    <InfoTooltip
      isOpen={isInfoTooltipOpen}
      onClose={closePopup}
      signUpImage={isSuccessImage}
      text={isSuccessText} />
    </main>
  );
}



