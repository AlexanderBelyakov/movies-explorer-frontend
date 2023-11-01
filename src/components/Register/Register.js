import './Register.css'
import logo from "../../images/logo.svg";
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

export function Register(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [emailDirty, setEmailDirty] = useState(true);
    const [passwordDirty, setPasswordDirty] = useState(true);
    const [nameDirty, setNameDirty] = useState(true);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [nameError, setNameError] = useState("");
    const [formValid, setFormValid] = useState(false)
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        if(emailError || passwordError || nameError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, nameError])

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

    const nameHandler = (e) => {
        setName(e.target.value)
        if(e.target.value.length < 2 || e.target.value.length > 40) {
            setNameError("Имя должно состоять от 2 до 40 символов")
        }
        else {
            setNameError("")
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
            case 'name': 
            setNameDirty(true) 
            break
            case 'email': 
            setEmailDirty(true)
            break
            case 'password': 
            setPasswordDirty(true)
            break
        }
    }
  
    function handleSubmitSignUp(evt) {
      evt.preventDefault();
      currentUser.name = name
      props.onSignUp( name, email, password);
    }
    return (
        <main className="register">
            <Link className="register__link" to="/"><img className="register__logo" alt="Логотип" src={logo} /></Link>
            <h1 className="register__header">Добро пожаловать!</h1>
            <form className="register__form" onSubmit={handleSubmitSignUp} novalidate>
                <p className="register__text">Имя</p>
                <input 
                minLength="2" 
                maxLength="40" 
                placeholder="Имя" 
                required 
                type="text" 
                name="name"
                className="register__input"
                value={name}
                onBlur={e => blurHandler(e)}
                onChange={e => nameHandler(e)} 
                />
                {(nameDirty && nameError) && <span className="register__error">{nameError}</span>}
                <p className="register__text">E-mail</p>
                <input 
                required 
                type="email" 
                name="email"
                placeholder="Email" 
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
                name="password"
                className="register__input" 
                onBlur={e => blurHandler(e)}
                onChange={e => passwordHandler(e)}
                />
                {(passwordDirty && passwordError) && <span className="register__error">{passwordError}</span>}
                <button type="submit" disabled={!formValid} className="register__button">Зарегистрироваться</button>
            </form>
            <p className="register__question">Уже зарегистрированы? <Link to="/signin" className="register__link">Войти</Link></p>
        </main>
    )
}