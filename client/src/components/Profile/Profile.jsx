import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { GlobalState } from '../../GlobalState';


const Profile = () => {
    const logout =()=>{
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/login";
    }
    const state = useContext(GlobalState);
    const [userDetails] = state.userAPI.user;
    const [token] = state.token;

    const [user, setUser] = useState(userDetails);
    const { email,name,phone}=user;

  
  const onChangeInput =( e )=>{
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  };
  const updateProfile = async( e )=>{
    e.preventDefault()
  
    if (user.password!=user.cf_password) {
      toast.error("Passwords Not Match !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      
    } else {
      try {
        const res = await axios.post('/api/user/updateInfo', {...user},{
          headers: {Authorization: token}
      })
        toast.success(res.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
  

        window.location.href = "/profile";
       
    } catch (err) {
       console.log(err)
        toast.error(err.response.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
      
    }
    
  };
  const changePass =()=>{
    window.location.href = "/changePassword";
  }
  return (
    <>
        <>
    <ToastContainer/>
      <div className="formBody">
        <h1>REGISTER</h1><br/>
        <form onSubmit={updateProfile}>
        <div className="mb-3">
            <label for="exampleInputName1" className="form-label">Name</label>
            <input 
              type="text" 
              name="name" 
              value={name} 
              onChange={onChangeInput} 
              className="form-control" 
              id="exampleInputName1" 
              aria-describedby="NameHelp"/>
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input 
              type="email" 
              name="email" 
              value={email} 
              onChange={onChangeInput} 
              className="form-control" 
              id="exampleInputEmail1" 
              aria-describedby="emailHelp" disabled/>
          </div>
          <div className="mb-3">
            <label for="exampleInputPhone1" className="form-label">Phone Number</label>
            <input 
              type="phone" 
              name="phone" 
              value={phone} 
              onChange={onChangeInput} 
              className="form-control" 
              id="exampleInputPhone1" 
              aria-describedby="phoneHelp"/>
          </div>
          
          <div className='formRow'>
            <center>
              
              <button type="submit" className="btn btn-outline-success">Update</button>
            </center>
          </div>
        </form>
        <div className='formRow'>
            <center>
              
            <button className="btn btn-outline-warning" onClick={changePass}>Change Password</button>
            </center>
          </div>
        <div className='formRow'>
            <center>
              
            <button className="btn btn-outline-danger" onClick={logout}>LOG OUT</button>
            </center>
          </div>
      </div>

    </>
    
    
  
    </>
  )
}

export default Profile