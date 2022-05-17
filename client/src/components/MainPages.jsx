import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ViewMovies from './movie/ViewMovies.js';
import MovieCard from './Cards/MovieCard.js';
import NotFound from './utils/not_found/NotFound.jsx';
import Login from './Login/Login.jsx';
import { GlobalState } from '../GlobalState.js';


const MainPages = () => {
      const state = useContext(GlobalState);
      const [isLogged] = state.userAPI.isLogged;
      const [isAdmin] = state.userAPI.isAdmin;
  return (
         
        <Routes>
              <Route path="/" element={<MovieCard />} />
              <Route path="/movie-view" element={<ViewMovies />} />
              <Route path="/login" element={isLogged ? <Navigate to={"/"}/> : <Login/>} />
        </Routes>

  )
}

export default MainPages