import './App.css';
import React from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import { Header } from "../Header/Header";
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { WellcomeToSilentHill } from '../WellcomeToSilentHill/WellcomeToSilentHill';
import { MenuPopup } from '../MenuPopup/MenuPopup';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {InfoTooltip} from '../InfoToolTip/InfoToolTip'
import {ProtectedRoute} from '../ProtectedRoute/ProtectedRoute'
import Preloader from '../Preloader/Preloader'

import mainApi from '../../utils/MainApi'

import success from "../../images/success.png";
import fail from "../../images/fail.png";

function App() {
  const [isAppReady, setIsAppReady] = React.useState(false)
  const [isMenuPopupOpen, showMenuPopup] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSuccessText, setIsSuccessText] = React.useState(null);
  const [isSuccessImage, setIsSuccessImage] = React.useState(null);
  const [isInfoTooltipOpen, showInfoTooltip] = React.useState(false);

  const [addedMoviesList, setAddedMoviesList] = React.useState([]);

  const [isLoaderOn, setIsLoaderOn] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    
    if (jwt) {
      setIsLoaderOn(true);
      mainApi
        .checkTokenValidity()
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res)
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoaderOn(false); 
          setIsAppReady(true);
        })
    } else {
      setIsAppReady(true)
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn && currentUser) {
      mainApi
        .getCurrentUserMovies()
        .then(data => {
          const currentUserAddedMovies = data.filter(m => m.owner === currentUser._id);
          setAddedMoviesList(currentUserAddedMovies);        
        })
        .catch(err =>
          console.log(err)
        );
    }
  }, [currentUser, isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn === true) {
      setIsLoaderOn(true);
    mainApi
      .getUserInfo()
      .then((user) => {
        setIsAppReady(true)
        setCurrentUser(user);  
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() =>
          setIsLoaderOn(false)
        );
  }}, [isLoggedIn]);

  function handleSignIn(email, password) {
    mainApi
      .signIn(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignUp(name, email, password) {
    mainApi
      .signUp(name, email, password)
      .then((res) => {
        if (res) {
        localStorage.removeItem(`${undefined} - movieSearch`);
        localStorage.removeItem(`${undefined} - shortMovies`);
        localStorage.removeItem(`${undefined} - shortSavedMovies`);
        localStorage.removeItem(`${undefined} - movies`)
        handleSignIn(email, password)
        setIsSuccessText("Вы успешно зарегистрировались!");
        setIsSuccessImage(success);
        }
      })
      .catch(() => {
        setIsSuccessText(`Что-то пошло не так!
        Попробуйте ещё раз.`);
        setIsSuccessImage(fail);
      })
      .finally(() => showInfoTooltip(true));
  }

  function handleUpdateUser(newUserInfo) {
    mainApi
      .editUserInfo(newUserInfo)
      .then((res) => {
        setCurrentUser(res);
        setIsSuccessText("Данные изменены!");
        setIsSuccessImage(success);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>showInfoTooltip(true));
  }

  function handleSignOut() {
    setAddedMoviesList([]);
    localStorage.removeItem("jwt");
    localStorage.removeItem(`${currentUser._id} - shortMovies`);
    localStorage.removeItem(`${currentUser._id} - movieSearch`);
    localStorage.removeItem(`${currentUser._id} - shortSavedMovies`);
    localStorage.removeItem(`${currentUser._id} - movies`)
    setCurrentUser({});
    setIsLoggedIn(false);
    localStorage.clear();
  }

  function handleAddMovieCard(movieCard) {
    mainApi
      .addNewCard(movieCard)
      .then(newMovieCard => setAddedMoviesList([newMovieCard, ...addedMoviesList]))
      .catch(err =>
        err
      );
  }

  function handleRemoveMovieCard(movie) {
    const addedMovie = addedMoviesList.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    mainApi
      .deleteCard(addedMovie._id)
      .then(() => {
        const newMoviesList = addedMoviesList.filter(m => {
          return (movie.id === m.movieId || movie.movieId === m.movieId) ? false : true
        });
        setAddedMoviesList(newMoviesList);
      })
      .catch(err =>
        err
      );
  }

  function handleMenuClick() {
    showMenuPopup(true);
  }

  function closePopup() {
    showMenuPopup(false)
    showInfoTooltip(false)
  }
  return (
    !isAppReady ? (
      <Preloader isOn={isLoaderOn}/>
    ) : (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="app">
      <Routes>
        <Route
        exact
        path="/"
        element = {
          <>
            <Header isLoggedIn={isLoggedIn} onMenu={handleMenuClick}/>
            <Main />
            <Footer />
          </>
        }
        />
        <Route
        exact
        path="/movies"
        element = {
          <>
            <Header isLoggedIn={isLoggedIn} onMenu={handleMenuClick}/>
            <ProtectedRoute
              component={Movies}
              addedMoviesList={addedMoviesList}
              loggedIn={isLoggedIn}
              setIsLoaderOn={isLoaderOn}
              onAddClick={handleAddMovieCard}
              onRemoveClick={handleRemoveMovieCard}
            />
            <Preloader isOn={isLoaderOn}/>
            <Footer />
          </>
        }
        />
        <Route
        exact
        path="/saved-movies"
        element = {
          <>
            <Header isLoggedIn={isLoggedIn} onMenu={handleMenuClick}/>
            <ProtectedRoute
              component={SavedMovies}
              addedMoviesList={addedMoviesList}
              loggedIn={isLoggedIn}
              onRemoveClick={handleRemoveMovieCard}
            />
            <Footer />
          </>
        }
        />
        <Route
        exact
        path="/profile"
        element = {
          <>
            <Header isLoggedIn={isLoggedIn} onMenu={handleMenuClick}/>
            <ProtectedRoute
              component={Profile}
              loggedIn={isLoggedIn}
              handleEditProfile={handleUpdateUser}
              onClick={handleSignOut}
            />
          </>
        }
        />
        <Route
        path="/signup"
        element = {
          <Register onSignUp={handleSignUp} />
        }
        />
        <Route
        path="/signin"
        element = {
          <Login onSignIn={handleSignIn} />
        }
        />
        <Route
        path="*"
        element = {
          <WellcomeToSilentHill />
        }
        />
      </Routes>

      <MenuPopup
          isOpen={isMenuPopupOpen}
          onClose={closePopup}
      />

      <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closePopup}
          signUpImage={isSuccessImage}
          text={isSuccessText}
      />
    </div>
    </CurrentUserContext.Provider>
  ));
}

export default App;
