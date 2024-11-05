import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Chat from './pages/Chat';
import AboutUs from './pages/AboutUs';
import PrivateRoute from './components/PrivateRoute';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  //console.log("render every time");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
              path='/chat'
              element={
                <PrivateRoute>
                  <Chat/>
                </PrivateRoute>
              }
            />
          <Route path= '/aboutus' element = {<AboutUs/>}/>
          <Route path= '/privacy' element = {<PrivacyPolicy/>}/>

        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
