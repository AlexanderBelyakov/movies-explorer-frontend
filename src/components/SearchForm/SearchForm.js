import "./SearchForm.css";
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import {FilterCheckbox} from "../FilterCheckbox/FilterCheckbox.js";
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import useValidationForm from "../../hooks/useValidationForm";

export function SearchForm({ handleSearchFormSubmit, handleShortMoviesCheck, shortMoviesList }) {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext); 
  const { values, handleChangeForm, isValid, setIsValid } = useValidationForm();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('')
  }, [isValid]);

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movieSearch`) && location.pathname === '/movies') {
        const inputValue = localStorage.getItem(`${currentUser.email} - movieSearch`);
        values.search = inputValue;
        setIsValid(true);
    }
  }, [currentUser]);

  function handleFormSubmit(evt) {
    evt.preventDefault();
    return isValid ? handleSearchFormSubmit(values.search) : setErrorMessage("Введите что-нибудь");
  };

  return (
    <section className="searchform" name="searchform">
      <form
        name="search"
        className="searchform__form"
        onSubmit={handleFormSubmit}
        noValidate
      >
       <div className="searchform__shell">
          <input
            name="search"
            type="text"
            className="searchform__bar"
            placeholder="Фильм"
            value={values.search || ''}
            onChange={handleChangeForm}
            required
          />
          <button type="submit" title='Найти фильмы' className="searchform__button" ></button>
        </div>
        <span className="searchform__error">{errorMessage}</span>
      </form>
      <FilterCheckbox
        shortMoviesList={shortMoviesList}
        handleShortMoviesCheck={handleShortMoviesCheck}
        onChange={handleShortMoviesCheck} />
    </section>
  );
}
