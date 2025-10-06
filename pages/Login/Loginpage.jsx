import React from 'react'
import '../Login/Loginpage.css'
import { NavLink } from 'react-router-dom'
const Loginpage = () => {
    return (
        <div className='loginpage'>
            <div className='welcome-message'>
                <h1>Sudoku Challenge</h1>
            </div>
            <div className="login-container">
                <h1 className="login-title">Login</h1>
                <form>
                    <div className="form-group">
                        <input type="text" id="username" name="username" placeholder='Username'required />
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" name="password" placeholder='Password'required />
                    </div>
                    <div className='button-container'>
                        <button type="submit" className='login-button'>Login</button>
                    </div>
                    <div className='signup-prompt'>
                        <p className='signup-link'>Don't have an account?</p>
                        <NavLink to="/signup" className='signup-navlink'>
                            <p>Sign Up</p>
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Loginpage