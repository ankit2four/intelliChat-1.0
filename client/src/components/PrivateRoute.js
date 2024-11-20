import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/check`, { withCredentials: true });
        setIsAuthenticated(res.data.isAuthenticated);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [API_URL]);

  if (isAuthenticated === null) {
    return<div className='loader'>
    <div class="spinner">
      <div></div>   
      <div></div>    
      <div></div>    
      <div></div>    
      <div></div>    
      <div></div>    
      <div></div>    
      <div></div>    
      <div></div>    
      <div></div>    
    </div>
    </div>; 
 // Optional: Loading state while checking auth
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
