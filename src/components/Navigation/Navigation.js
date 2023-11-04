import './Navigation.css'
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

export function Navigation(props) {
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
    return (<>
      {props.isLoggedIn ?
      (!isMobile ? (<div className="navigation__authorized">
        <div className="navigation__films">
          <Link to="/movies" className="navigation__film">Фильмы</Link>
          <Link to="/saved-movies" className="navigation__savedfilm">Сохранённые фильмы</Link>
        </div>
        <Link to="/profile" className="navigation__account">Аккаунт</Link>
      </div>) :
      (<button className="navigation__menu" type="button" onClick={props.onMenu}></button>)) : (
        <div className="navigation__unauthorized">
          <Link to="/signup" className="navigation__signup">Регистрация</Link>
          <Link to="/signin" className="navigation__signin">Войти</Link>
        </div>
      )}
    </>);
  }