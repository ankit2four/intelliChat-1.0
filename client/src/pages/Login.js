import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Login = () => {
  const [isVisible, setVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/check`, { withCredentials: true });
        if (res.data.isAuthenticated) {
          navigate('/chat');
        }
        console.log(res.data); // Check response
      } catch (err) {
        console.error(err);
      }
    };

    checkAuth();
  }, [navigate, API_URL]);

  const validatePassword = (password) => {
    // Ensuring password contains at least one uppercase, one lowercase letter, one number, one special character, and is at least 8 characters long
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!isLogin && !validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character.');
      return;
    } else {
      setPasswordError('');
    }

    const url = isLogin ? `${API_URL}/api/auth/login` : `${API_URL}/api/auth/register`;
    const data = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await axios.post(url, data, {
        withCredentials: true,
      });

      console.log(res); // Log response for debugging

      if (res.data.message) {
        navigate('/chat');
      } else {
        setError("Authentication failed. Please check your credentials.");
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Check your Credentials');
      //console.error(err);
    }
  };

  return (
    <>
      <Header />
      <div className='main-login'>
        <div className="login-container">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleAuth}>
            {!isLogin && (
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type={isVisible ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className='password' onClick={() => setVisible(!isVisible)}>
                {!isVisible ? "Show password" : "Hide password"}
              </p>
              {!isLogin && passwordError && <div className="error-message">{passwordError}</div>}
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="primary">{isLogin ? 'Login' : 'Register'}</button>
          </form>
          <button onClick={() => setIsLogin(!isLogin)} className="secondary">
            {isLogin ? 'Switch to Register' : 'Switch to Login'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
