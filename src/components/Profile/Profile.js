import { Link } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react';
import './Profile.css'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import useValidationForm from '../../hooks/useValidationForm';

export function Profile(props) {
    const currentUser = useContext(CurrentUserContext);
    const { values, errors, isValid, handleChangeForm, resetFormInputs } = useValidationForm();

    useEffect(() => {
        if (currentUser) {
          resetFormInputs(currentUser, {}, true);
        }
    }, [currentUser, resetFormInputs]);

    const inputValidity = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

    function handleFormSubmit(evt) {
        evt.preventDefault();
        props.handleEditProfile(values);
    }

    const [emailDirty, setEmailDirty] = useState(false);
    const [nameDirty, setNameDirty] = useState(false);
    const [emailError, setEmailError] = useState("Поле не может быть пустым");
    const [nameError, setNameError] = useState("Поле не может быть пустым");

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
    return (
        <main className="profile">
            <form className="profile__form" name="profile" onSubmit={handleFormSubmit}>
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
                        onChange={handleChangeForm}
                        value={values.name}
                        />
                    </label>
                    {(nameDirty && nameError) && <span className="register__error">{errors.name}</span>}
                    <label className="profile__input">
                        <span className="profile__text">E-mail</span>
                        <input
                        name="email"
                        placeholder="Email"
                        className="profile__text"
                        type="email"
                        required
                        onBlur={e => blurHandler(e)}
                        onChange={handleChangeForm}
                        value={values.email}
                        />
                    </label>
                    {(emailDirty && emailError) && <span className="register__error">{errors.email}</span>}
                </div>
                <div className="profile__buttons">
                    <button type="submit" disabled={inputValidity} className="profile__edit">Редактировать</button>
                    <Link to="/" className="profile__exit" onClick={props.onClick}>Выйти из аккаунта</Link>
                </div>
            </form>
        </main>
    )
}