import './Register.css'
import logo from "../../images/logo.svg";
import { Link } from 'react-router-dom';

export function Register() {
    return (
        <main className="register">
            <Link className="register__link" to="/"><img className="register__logo" alt="Логотип" src={logo} /></Link>
            <h1 className="register__header">Добро пожаловать!</h1>
            <form className="register__form">
                <p className="register__text">Имя</p>
                <input minLength="2" maxLength="40" placeholder="Имя" required type="text" className="register__input" />
                <span className="register__error">Что-то пошло не так...</span>
                <p className="register__text">E-mail</p>
                <input required type="email" placeholder="Email" className="register__input" />
                <span className="register__error">Что-то пошло не так...</span>
                <p className="register__text">Пароль</p>
                <input minLength="2" maxLength="40" placeholder="Пароль" required type="password" className="register__input" />
                <span className="register__error">Что-то пошло не так...</span>
                <button type="submit" className="register__button">Зарегистрироваться</button>
            </form>
            <p className="register__question">Уже зарегистрированы? <Link to="/signin" className="register__link">Войти</Link></p>
        </main>
    )
}