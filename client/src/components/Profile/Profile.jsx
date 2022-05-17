import React from 'react'

const Profile = () => {
    const logout =()=>{
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/";
    }
  return (
    <>
    
   <button onClick={logout}>LOG OUT</button>
    </>
  )
}

export default Profile