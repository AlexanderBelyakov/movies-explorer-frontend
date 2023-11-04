import './MoviesCardList.css';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { WIDTHS } from '../../utils/constants.js';
import { getAddedMoviesCards } from '../../utils/utils.js';

import useWidthScreen from '../../hooks/useWidthScreen.js';
import {MoviesCard} from '../MoviesCard/MoviesCard.js';
import Preloader from '../Preloader/Preloader';

export function MoviesCardList({ moviesList, addedMoviesList, onAddClick, onRemoveClick }) {
  const location = useLocation();
  const widthScreen = useWidthScreen();

  const { l, m, s } = WIDTHS;
  const [isMore, setIsMore] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [renderMoviesList, setRenderMoviesList] = useState([]);
  const [showedCards, setShowedCards] = useState({ onPage: 12, new: 3 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.pathname === '/movies') {
      if (widthScreen <= l.width && widthScreen > s.width) {
        setShowedCards(m.cards);
      }
        else if (widthScreen > l.width) {
        setShowedCards(l.cards);
      }
        else {
        setShowedCards(s.cards);
      }
      return () => setIsMounted(false);
    }
  }, [widthScreen, isMounted, l, m, s, location.pathname]);


  useEffect(() => {
    if (moviesList.length) {
      const res = moviesList.filter((item, i) => i < showedCards.onPage);
      setRenderMoviesList(res);
    }
  }, [moviesList, showedCards.onPage]);


  useEffect(() => {
    return moviesList.length === renderMoviesList.length ? setIsMore(true) : setIsMore(false);
  }, [moviesList.length, renderMoviesList.length])


  function handleClickShowMore() {
    const start = renderMoviesList.length;
    const added = moviesList.length - start;
    const end = start + showedCards.new;
    setLoading(true)
    setTimeout(() => {
        if (added > 0) {
            const moreCards = moviesList.slice(start, end);
            setRenderMoviesList([...renderMoviesList, ...moreCards]);
          }
        setLoading(false)
    }, 1500);
  }

  return (
    <div className="moviescardlist">
      <ul className={`moviescardlist__container ${location.pathname==='/saved-movies' && 'moviescardlist__container_saved'}`}>
          { renderMoviesList.map(movie => (
              <MoviesCard
                key={movie.id || movie._id}
                movie={movie}
                added={getAddedMoviesCards(addedMoviesList, movie)}
                onAddClick={onAddClick}
                onRemoveClick={onRemoveClick}
              />
            ))
          }
      </ul>
      {location.pathname === "/movies" && !loading ?
       (<button 
          type='button' 
          className={`moviescardlist__more ${isMore && 'moviescardlist__more_saved'}`} 
          onClick={handleClickShowMore}
        >
          Ещё
        </button>) : ( <Preloader isOn={loading}/>)     
        }      
    </div>
  )
}

