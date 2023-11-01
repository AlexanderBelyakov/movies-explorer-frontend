import './FilterCheckbox.css'
import {  useContext } from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';

export function FilterCheckbox({ shortMovies, handleShortMoviesCheck }) {
    const currentUser = useContext(CurrentUserContext)
    return (
        <div className="filtercheckbox">
            <label className="filtercheckbox__label">
                <input 
                className="filtercheckbox__input" 
                type="checkbox"
                onChange={handleShortMoviesCheck}
                defaultChecked={shortMovies}
                />
                <span className="filtercheckbox__slider"></span>
            </label>
            <p className="filtercheckbox__text">Короткометражки</p>
        </div>
    )
}