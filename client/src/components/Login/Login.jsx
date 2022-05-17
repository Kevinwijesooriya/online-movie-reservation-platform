import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { GlobalState } from '../../GlobalState';

const Login = () => {
  const state = useContext(GlobalState)
  const [user, setUser] = useState({
    email:'', password: ''
});
const [token, setToken] = state.token

const onChangeInput = e =>{
  const {name, value} = e.target;
  setUser({...user, [name]:value})
};
const loginSubmit = async e =>{
  e.preventDefault()
  try {
      const res = await axios.post('/api/user/signin', {...user})
      toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

      localStorage.setItem('firstLogin', true);
      sessionStorage.setItem('token', res.data.token);
     // setToken(res.data.token);
     // console.log(res.data.token);
      window.location.href = "/";
     
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
};

  return (
    <>
    <ToastContainer/>
      <div className="formBody">
        <h1>LOGIN</h1><br/>
        <form onSubmit={loginSubmit}>
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
          <div className='formRow'>
            <center>
              <Link to="">Forget Password ?</Link><br/><br/>
              <Link to="">Register</Link><br/><br/>
              <button type="submit" className="btn btn-outline-success">Submit</button>
            </center>
          </div>
        </form>
      </div>

</>
  )
}

export default Login;