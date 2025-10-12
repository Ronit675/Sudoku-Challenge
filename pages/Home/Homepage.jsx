import React from 'react'
import { NavLink } from 'react-router-dom'
import './Homepage.css'
const Homepage = () => {
  return (
    <div className='container'>
      <header className="header">
        <div className='title'>
          Sudoku Challenge
        </div>
        <div className='login-signup'>
          <button className="login-button-1">
            <NavLink to="/login" className="nav-link">Login</NavLink>
          </button>
          <button className="signup-button-1">
            <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
          </button>
        </div>
      </header>
      <NavLink to="/game" className="start-link">
        <button className="start-button">
          Start Game
        </button>
      </NavLink>
    </div>
  )
}

export default Homepage