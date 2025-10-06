import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Signup/SignupPage.css'
const SignupPage = () => {
  return (
    <div className='signuppage'>
      <div className='welcome-title'>
        <h1>Sudoku Challenge</h1>
      </div>
      <div className="signup-container">
        <h1 className="signup-title">Sign Up</h1>
        <form>
          <div className="form-group">
            <input type="text" id="username" name="username" placeholder='Username' required />
          </div>
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder='Email' required />
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" placeholder='Password' required />
          </div>
          <div className='button-container'>
            <button type="submit" className='signup-button'>Sign Up</button>
          </div>
          <div className='login-prompt'>
            <p className='login-link'>Already have an account?</p>
            <NavLink to="/" className='login-navlink'>
              <p>Login</p>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupPage