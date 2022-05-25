import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
//import ViewMovies from './movie/ViewMovies.js';
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
import CreateMovie from './CreateMovie/CreateMovie.jsx';
import Movies from './Movie/Movies.jsx';
import TicketPrint from './Ticket/TicketPrint.js';
import MovieDetails from './MovieDetails/MovieDetails.jsx';
import ContactUs from './ContactUs/ContactUs.jsx';
import Cart from './Cart/Cart.jsx';
import Tickects from './Tickets/Tickects.jsx';
import QRgenerator from './Ticket/QRgenerator.js';
import Payment from './Payments/Payment.jsx';
import UserManagement from './UserManagement/UserManagement.jsx';
//edit

const MainPages = () => {
      const state = useContext(GlobalState);
      const [isLogged] = state.userAPI.isLogged;
      const [isAdmin] = state.userAPI.isAdmin;
      const [isSuperAdmin] = state.userAPI.isSuperAdmin;
  return (
         
        <Routes>
              <Route path="/" element={<Movies />} />
              {/* <Route path="/movie-view" element={<ViewMovies />} /> */}
              <Route path="/login" element={isLogged ? <Navigate to={"/"}/> : <Login/>} />
              <Route path="/register" element={isLogged ? <Navigate to={"/"}/> : <Register/>} />
              <Route path="/profile" element={isLogged ?  <Profile/>: <NotFound/>}/>
              <Route path="/forgetPassword" element={isLogged ?  <Navigate to={"/"}/>: <ResetPassword/>}/>
              <Route path="/changePassword" element={isLogged ?  <ChangePassword/>: <NotFound/>}/>
              <Route path="/payment/:id" element={isLogged ?  <Payment/>: <NotFound/>}/>
              <Route path="/theaters" element={<Theaters/>}/>
              <Route path="/locations" element={isAdmin ? <Locations/> : <NotFound/>} />
              <Route path="//addCategories" element={isAdmin ? <Categories/> : <NotFound/>} />
              <Route path="/create_theater" element={isAdmin ? <CreateTheater/> : <NotFound/>} />
              <Route path="/edit_theater/:id" element={isAdmin ? <CreateTheater/> : <NotFound/>} />
              <Route path="/create_movie" element={isAdmin ? <CreateMovie/> : <NotFound/>} />
              <Route path="/edit_movie/:id" element={isAdmin ? <CreateMovie/> : <NotFound/>} />
              <Route path="/MoviesTicket" element={<MoviesTicket/>}/>
              <Route path="/viewTicket/:id" element={<QRgenerator/>}/>
              <Route path="/viewTicket/:id/TicketPrint" element={<TicketPrint/>}/>
              
              <Route path="/moviedetail/:id" element={<MovieDetails/>}/>
              <Route path="/contactUs" element={<ContactUs/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path='/ticketsList' element={<Tickects/>}/>

              <Route path="/usermanagement" element={isSuperAdmin ? <UserManagement/> : <NotFound/>} />
        </Routes>

  )
}

export default MainPages