import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { GlobalState } from '../../GlobalState';

const Register = () => {
  const state = useContext(GlobalState)
  const [user, setUser] = useState({
    email:'', password: '',name:"",cf_password:"",phone:""
});
const [token, setToken] = state.token

const onChangeInput =( e )=>{
  const {name, value} = e.target;
  setUser({...user, [name]:value})
};
const loginSubmit = async( e )=>{
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
      const res = await axios.post('/api/user/registration', {...user})
      toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

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
        <h1>REGISTER</h1><br/>
        <form onSubmit={loginSubmit}>
        <div className="mb-3">
            <label for="exampleInputName1" className="form-label">Name</label>
            <input 
              type="text" 
              name="name" 
              value={user.name} 
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
              value={user.email} 
              onChange={onChangeInput} 
              className="form-control" 
              id="exampleInputEmail1" 
              aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label for="exampleInputPhone1" className="form-label">Phone Number</label>
            <input 
              type="phone" 
              name="phone" 
              value={user.phone} 
              onChange={onChangeInput} 
              className="form-control" 
              id="exampleInputPhone1" 
              aria-describedby="phoneHelp"/>
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
            <label for="exampleInputCf_Password1" className="form-label">Password</label>
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
              
              <Link to="/login">Login</Link><br/><br/>
              <Link to="/forgetPassword">Forget Password ?</Link><br/><br/>
              <button type="submit" className="btn btn-outline-success">Submit</button>
            </center>
          </div>
        </form>
      </div>

</>
  )
}

export default Register