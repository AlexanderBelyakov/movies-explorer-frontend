import './Header.css';
import logo from "../../images/logo.svg";
import { Navigation } from '../Navigation/Navigation';
import { Link } from 'react-router-dom';

export function Header(props) {
  return (
    <header className="header">
      <Link to="/"><img className="header__logo" src={logo} alt="Логотип"/> </Link>
      <Navigation isLogIn={props.isLogIn} onMenu={props.onMenu}/>
    </header>
  );
}