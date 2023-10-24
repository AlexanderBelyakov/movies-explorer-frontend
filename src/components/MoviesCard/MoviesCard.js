import './MoviesCard.css'
import logo from "../../images/me.jpg";
import deletepic from "../../images/delete.svg";
import { useLocation } from 'react-router-dom';

export function MoviesCard({name}) {
    const location = useLocation();
    return (
        <div className="moviescard">
            {location.pathname==='/movies' && (<button className="moviescard__button">Сохранить</button>)}
            {location.pathname==='/saved-movies' && (<button className="moviescard__button moviescard__button_delete"><img className="moviescard__delete" alt="удалить" src={deletepic} /></button>)}
            <img src={logo} alt="pic" className="moviescard__image" />
            <div className="moviescard__info">
                <p className="moviescard__name">{name}</p>
                <p className="moviescard__time">1ч 17м</p>
            </div>
        </div>
    )
}