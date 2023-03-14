import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'

const Navbar = () => {
  const [cookie, setCookies] = useCookies(["access_token"])
  const navigate=useNavigate()
  const handleLogout = () => {
    setCookies("access_token","")
    window.localStorage.removeItem("userID")
    navigate('/Auth')

  }
  
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create">Create Recipies</Link>

      {!cookie.access_token ? (
        <>
          
          <Link to="/auth">Login/Register</Link>
        </>
      ) : (
          <><Link to="/save">Saved Recipies</Link>
        <button onClick={handleLogout}>Logout</button></>
          
      )}
    </div>
  );
}

export default Navbar