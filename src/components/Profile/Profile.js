import { Link } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react';
import './Profile.css'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

export function Profile(props) {
    const currentUser = useContext(CurrentUserContext);
    const [email, setEmail] = useState(currentUser.email);
    const [name, setName] = useState(currentUser.name);
    const [emailDirty, setEmailDirty] = useState(false);
    const [nameDirty, setNameDirty] = useState(false);
    const [emailError, setEmailError] = useState("Поле не может быть пустым");
    const [nameError, setNameError] = useState("Поле не может быть пустым");
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if(emailError || nameError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, nameError])

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный email')
        } else if(e.target.value ===  currentUser.email) {
            setEmailError('Введите новую почту')
        }
        else {
            setEmailError("")
        }
    }

    const nameHandler = (e) => {
        setName(e.target.value)
        if(e.target.value.length < 2 || e.target.value.length > 40) {
            setNameError("Имя должно состоять от 2 до 40 символов")
        } else if(e.target.value ===  currentUser.name) {
            setNameError("Введите новое имя")
        }
        else {
            setNameError("")
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
        }
    }
  
    function handleSubmitSign(evt) {
      evt.preventDefault();
      props.onUpdateUser({
        name: name,
        email: email
      });
    }
    return (
        <main className="profile">
            <form className="profile__form" name="profile" onSubmit={handleSubmitSign}>
                <h1 className="profile__header">Привет, {currentUser.name}!</h1>
                <div className="profile__inputs">
                    <label className="profile__input">
                        <span className="profile__text">Имя</span>
                        <input
                        name="name"
                        className="profile__text"
                        placeholder="Имя"
                        type="text"
                        minLength="2"
                        maxLength="40"
                        required
                        onBlur={e => blurHandler(e)}
                        onChange={e => nameHandler(e)}
                        value={name}
                        />
                    </label>
                    {(nameDirty && nameError) && <span className="register__error">{nameError}</span>}
                    <label className="profile__input">
                        <span className="profile__text">E-mail</span>
                        <input
                        name="email"
                        placeholder="Email"
                        className="profile__text"
                        type="email"
                        required
                        onBlur={e => blurHandler(e)}
                        onChange={e => emailHandler(e)}
                        value={email}
                        />
                    </label>
                    {(emailDirty && emailError) && <span className="register__error">{emailError}</span>}
                </div>
                <div className="profile__buttons">
                    <button type="submit" disabled={!formValid} className="profile__edit">Редактировать</button>
                    <Link to="/" className="profile__exit" onClick={props.onClick}>Выйти из аккаунта</Link>
                </div>
            </form>
        </main>
    )
}