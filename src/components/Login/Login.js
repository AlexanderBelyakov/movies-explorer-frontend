import './Login.css'
import logo from "../../images/logo.svg";
import { Link } from 'react-router-dom'

export function Login() {
    return (
        <main className="register">
            <Link to="/"><img className="register__logo" alt="Логотип" src={logo} /></Link>
            <h1 className="register__header">Рады видеть!</h1>
            <form className="register__form">
                <p className="register__text">E-mail</p>
                <input type="email" className="register__input" />
                <span className="register__error">Что-то пошло не так...</span>
                <p className="register__text">Пароль</p>
                <input type="password" className="register__input" />
                <span className="register__error">Что-то пошло не так...</span>
                <button type="submit" className="register__button register__button_for-login">Войти</button>
            </form>
            <p className="register__question">Ещё не зарегистрированы? <Link to="/signup" className="register__link">Регистрация</Link></p>
        </main>
    )
}