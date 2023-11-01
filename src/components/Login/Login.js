import './Login.css'
import logo from "../../images/logo.svg";
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";

export function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(true);
    const [passwordDirty, setPasswordDirty] = useState(true);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if(emailError || passwordError ) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный email')
        }
        else {
            setEmailError("")
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if(e.target.value.length < 2 || e.target.value.length > 40) {
            setPasswordError("Пароль должно состоять от 2 до 40 символов")
        }
        else {
            setPasswordError("")
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email': 
            setEmailDirty(true)
            break
            case 'password': 
            setPasswordDirty(true)
            break
        }
    }
  
    function handleSubmitSignIn(evt) {
      evt.preventDefault();
      props.onSignIn( email, password);
    }
    return (
        <main className="register">
            <Link to="/"><img className="register__logo" alt="Логотип" src={logo} /></Link>
            <h1 className="register__header">Рады видеть!</h1>
            <form className="register__form" onSubmit={handleSubmitSignIn}>
                <p className="register__text">E-mail</p>
                <input 
                required 
                placeholder="Email" 
                type="email" 
                name='email'
                className="register__input" 
                onBlur={e => blurHandler(e)}
                onChange={e => emailHandler(e)}
                />
                {(emailDirty && emailError) && <span className="register__error">{emailError}</span>}
                <p className="register__text">Пароль</p>
                <input 
                minLength="2" 
                maxLength="40" 
                placeholder="Пароль" 
                required 
                type="password" 
                name='password'
                className="register__input" 
                onBlur={e => blurHandler(e)}
                onChange={e => passwordHandler(e)}
                />
                {(passwordDirty && passwordError) && <span className="register__error">{passwordError}</span>}
                <button type="submit" disabled={!formValid} className="register__button register__button_for-login">Войти</button>
            </form>
            <p className="register__question">Ещё не зарегистрированы? <Link to="/signup" className="register__link">Регистрация</Link></p>
        </main>
    )
}