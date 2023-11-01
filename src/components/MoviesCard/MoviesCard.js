import './MoviesCard.css';

import { convertMovieDuration } from '../../utils/utils.js';
import { useLocation } from 'react-router-dom';
import deletepic from '../../images/delete.svg'

export function MoviesCard({ movie, added, onAddClick, onRemoveClick }) {
  const location = useLocation();
  
  function handleAddClick() {
    onAddClick(movie);
  }

  function handleRemoveClick() {
    onRemoveClick(movie);
  }

  return (
    <li className="moviescard">
        {location.pathname==='/movies' && (<button onClick={added ? handleRemoveClick : handleAddClick} className={!added ? "moviescard__button" : "moviescard__button_saved"}>{!added ? "Сохранить" : ""}</button>)}
        {location.pathname==='/saved-movies' && (<button onClick={handleRemoveClick} className="moviescard__button moviescard__button_delete"><img className="moviescard__delete" alt="удалить" src={deletepic} /></button>)}
        <a target="_blank" rel="noreferrer" href={movie.trailerLink}>
        <img 
        src={movie.image}
        alt={movie.nameRU} 
        className="moviescard__image" 
        />
        </a>
        <div className="moviescard__info">
            <p className="moviescard__name">{movie.nameRU}</p>
            <p className="moviescard__time">{convertMovieDuration(movie.duration)}</p>
        </div>
    </li>
  )
}


