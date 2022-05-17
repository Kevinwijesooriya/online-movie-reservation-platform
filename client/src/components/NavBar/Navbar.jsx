import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";
import { GlobalState } from '../../GlobalState';

const Navbar = () => {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [userDetails] = state.userAPI.user;

    

    const navigate = useNavigate();
    const onClickHandler=()=>{
        navigate("/login");
    }
  return (
   <>
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/"> 
    <img src={logo} alt="" width="30" height="24" class="d-inline-block align-text-top"/>{
      isAdmin ?<>OMR Admin</> :<>OMR</> 
    }
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/aboutus">About us</a>
        </li>
     
      </ul>
      <form class="d-flex">
        {isLogged ? <>
          <Link to={"/profile"}>{userDetails.name}</Link>
        </>:<>
        
        <button class="btn btn-outline-success" onClick={onClickHandler} type="submit">Login</button>
        </>}
        
      </form>
    </div>
  </div>
</nav>
   </>
  )
}

export default Navbar