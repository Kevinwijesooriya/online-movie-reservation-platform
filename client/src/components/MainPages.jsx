import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ViewMovies from './movie/ViewMovies.js';
import MovieCard from './Cards/MovieCard.js';
import NotFound from './utils/not_found/NotFound.jsx';
import Login from './Login/Login.jsx';
import { GlobalState } from '../GlobalState.js';
import Profile from './Profile/Profile.jsx';
import Register from './Register/Register.jsx';
import ResetPassword from './ChangePassword/ResetPassword.jsx';
import ChangePassword from './ChangePassword/ChangePassword.jsx';


const MainPages = () => {
      const state = useContext(GlobalState);
      const [isLogged] = state.userAPI.isLogged;
      const [isAdmin] = state.userAPI.isAdmin;
  return (
         
        <Routes>
              <Route path="/" element={<MovieCard />} />
              <Route path="/movie-view" element={<ViewMovies />} />
              <Route path="/login" element={isLogged ? <Navigate to={"/"}/> : <Login/>} />
              <Route path="/register" element={isLogged ? <Navigate to={"/"}/> : <Register/>} />
              <Route path="/profile" element={isLogged ?  <Profile/>: <NotFound/>}/>
              <Route path="/forgetPassword" element={isLogged ?  <Navigate to={"/"}/>: <ResetPassword/>}/>
              <Route path="/changePassword" element={isLogged ?  <ChangePassword/>: <NotFound/>}/>
        </Routes>

  )
}

export default MainPages