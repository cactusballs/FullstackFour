import React from 'react';
import './Login.css';
import illustration from '../../assets/images/village-illustration.png';
import logo from '../../assets/images/village-logo.png';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-image">
        <img src={illustration} alt="Village Illustration" />
      </div>
      <div className="login-form">
        <form>
        <div className="logo">
          <img src={logo} alt="Village Logo" />
        </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Log In</button>
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </form>
      
      </div>
    </div>
  );
};

export default Login;