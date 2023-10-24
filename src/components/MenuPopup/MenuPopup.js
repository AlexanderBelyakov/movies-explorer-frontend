import { Link } from 'react-router-dom'
import './MenuPopup.css'

export function MenuPopup(props) {
    return (
        <div className={`menupopup ${
            props.isOpen ? "menupopup_opened" : ""
          }`}>
            <div className="menupopup__overlay" onClick={props.onClose}></div>
            <button
                type="button"
                className="menupopup__close-button"
                onClick={props.onClose}
            ></button>
            <Link className="menupopup__main-link" to="/">Главная</Link>
            <Link className="menupopup__movies-link" to="/movies">Фильмы</Link>
            <Link className="menupopup__savedmovies-link" to="/saved-movies">Сохранённые фильмы</Link>
            <Link className="menupopup__profile-link" to="/profile">Аккаунт</Link>
        </div>
    )
}