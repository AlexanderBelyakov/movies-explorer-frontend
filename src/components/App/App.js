
import './App.css';
import React from "react";
import { Route, Routes } from 'react-router-dom';
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

function App() {
  const [isMenuPopupOpen, showMenuPopup] = React.useState(false);
  function handleMenuClick() {
    showMenuPopup(true);
  }
  function closePopup() {
    showMenuPopup(false)
  }
  return (
    <div className="app">
      <Routes>
        <Route
        exact
        path="/"
        element = {
          <>
            <Header isLogIn={false}/>
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
            <Header isLogIn={true} onMenu={handleMenuClick}/>
            <Movies />
            <Footer />
          </>
        }
        />
        <Route
        exact
        path="/saved-movies"
        element = {
          <>
            <Header isLogIn={true} onMenu={handleMenuClick}/>
            <SavedMovies />
            <Footer />
          </>
        }
        />
        <Route
        exact
        path="/profile"
        element = {
          <>
            <Header isLogIn={true} onMenu={handleMenuClick}/>
            <Profile />
          </>
        }
        />
        <Route
        exact
        path="/signup"
        element = {
          <Register />
        }
        />
        <Route
        exact
        path="/signin"
        element = {
          <Login />
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
    </div>
  );
}

export default App;
