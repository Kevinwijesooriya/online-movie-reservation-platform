import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { GlobalState } from '../../GlobalState';

const ChangePassword = () => {
  const state = useContext(GlobalState)
  const [user, setUser] = useState({
    email:'', password:'',cf_password:""
});


const onChangeInput =( e )=>{
  const {name, value} = e.target;
  setUser({...user, [name]:value})
};
const changePassword = async( e )=>{
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
      const res = await axios.post('http://localhost:5010/api/user/resetPassword', {...user})
      toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

          sessionStorage.clear();
          localStorage.clear();
          window.location.href = "/login";
     
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
  return (
    <>
    <ToastContainer/>
      <div className="formBody">
        <h1>CHANGE PASSWORD</h1><br/>
        <form onSubmit={changePassword}>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input 
              type="email" 
              name="email" 
              value={user.email} 
              onChange={onChangeInput} 
              className="form-control" 
              id="exampleInputEmail1" 
              aria-describedby="emailHelp"/>
          </div>
        
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input 
              type="password" 
              name="password" 
              value={user.password} 
              onChange={onChangeInput}
              className="form-control" 
              id="exampleInputPassword1"/>
          </div>
          <div className="mb-3">
            <label for="exampleInputCf_Password1" className="form-label">Conform Password</label>
            <input 
              type="password" 
              name="cf_password" 
              value={user.cf_password} 
              onChange={onChangeInput}
              className="form-control" 
              id="exampleInputCf_Password1"/>
          </div>
          <div className='formRow'>
            <center>
              <button type="submit" className="btn btn-outline-success">Update Password</button>
            </center>
          </div>
        </form>
      </div>

</>
  )
}

export default ChangePassword