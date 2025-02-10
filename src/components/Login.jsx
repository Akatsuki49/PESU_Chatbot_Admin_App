import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginDisabled, setIsLoginDisabled] = useState(false);
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication
    if (email === 'user@example.com' && password === 'password') {
      setIsAuthenticated(true);
      setIsLoginDisabled(true);
      setLoginError('');
      console.log('User authenticated');
      navigate('/home');
    } else {
      setLoginError('Email or password is incorrect.');
      console.error('Error signing in');
    }
  };

  return (
    <div className="Login">
      {!isAuthenticated && <h2>Login</h2>}
      {!isAuthenticated && (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoginDisabled}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoginDisabled}
          />
          <button type="submit" disabled={isLoginDisabled}>
            Login
          </button>
          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        </form>
      )}
    </div>
  );
}

export default Login;
