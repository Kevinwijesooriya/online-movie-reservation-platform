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
import MoviesTicket from './Ticket/MoviesTicket.js';
import Theaters from './Theaters/Theaters.jsx';
import Locations from './Locations/Locations.jsx';
import CreateTheater from './CreateTheater/CreateTheater.jsx';
import Categories from './Categories/Categories.jsx';


const MainPages = () => {
      const state = useContext(GlobalState);
      const [isLogged] = state.userAPI.isLogged;
      const [isAdmin] = state.userAPI.isAdmin;
  return (
         
        <Routes>
              <Route path="/" element={<MovieCard />} />
              <Route path="/movie-view" element={<ViewMovies />} />
              <Route path="/movie-Ticket" element={<MoviesTicket />} />
              <Route path="/login" element={isLogged ? <Navigate to={"/"}/> : <Login/>} />
              <Route path="/register" element={isLogged ? <Navigate to={"/"}/> : <Register/>} />
              <Route path="/profile" element={isLogged ?  <Profile/>: <NotFound/>}/>
              <Route path="/forgetPassword" element={isLogged ?  <Navigate to={"/"}/>: <ResetPassword/>}/>
              <Route path="/changePassword" element={isLogged ?  <ChangePassword/>: <NotFound/>}/>
              <Route path="/theaters" element={<Theaters/>}/>
              <Route path="/locations" element={isAdmin ? <Locations/> : <NotFound/>} />
              <Route path="//addCategories" element={isAdmin ? <Categories/> : <NotFound/>} />
              <Route path="/create_theater" element={isAdmin ? <CreateTheater/> : <NotFound/>} />
              <Route path="/edit_theater/:id" element={isAdmin ? <CreateTheater/> : <NotFound/>} />
              
        </Routes>

  )
}

export default MainPages