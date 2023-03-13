import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookies] = useCookies(["access_token"])
  const navigate=useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response=await axios.post("http://localhost:3001/auth/login", {
        username,password
      })
      setCookies("access_token", response.data.token)
      window.localStorage.setItem("userID", response.data.userID)
      navigate('/')
     
      
    }
    catch (err) {
      console.error(err)
    }
    
  }
  
  
  return (
    <div className="auth-container">
      <form action="" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login