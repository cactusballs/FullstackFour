import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../footer/Footer.jsx";
import illustration from '../../assets/images/village-illustration.png';
import logo from '../../assets/images/village-logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token (use cookies for better security)
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 d-none d-md-block login-image">
          <img src={illustration} alt="Village Illustration" />
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="login-form-container">
            <div className="logo">
              <img src={logo} alt="Village Logo" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="login-input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login-input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="login-button" type="submit">Log In</button>
              <p>
                Don't have an account? <a href="/signup">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
