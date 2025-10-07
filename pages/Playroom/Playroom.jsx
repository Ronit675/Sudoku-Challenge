import React from 'react'
import { NavLink } from 'react-router-dom'
import './Playroom.css'

const Playroom = () => {
  return (
    <div>
        <div className='header-container'>
          <header>
            <NavLink to='/' className='header-link'>
              <span className='header-title'>
                Playroom
              </span>
            </NavLink>
          </header>
        </div>
    </div>
  )
}

export default Playroom