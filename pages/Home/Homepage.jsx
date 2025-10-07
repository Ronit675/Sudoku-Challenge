import React from 'react'
import { NavLink } from 'react-router-dom'
import './Homepage.css'
const Homepage = () => {
  return (
    <div className='container'>
      <header className="header">
        Sudoku Challenge
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