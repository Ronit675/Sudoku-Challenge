import React from 'react'
import './Loginpage.css'
const Loginpage = () => {
    return (
        <div className='loginpage'>
            <div className='welcome-message'>
                <h1>Welcome to the Sudoku Challenge</h1>
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
                </form>
            </div>
        </div>
    )
}

export default Loginpage