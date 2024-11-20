import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainChat from '../components/MainChat.js';
import Sidebar from '../components/Sidebar.js';

function Chat() {
  //console.log("rendered chat.js");
  const [selectedChatId, setSelectedChatId] = useState('');
  const [chats, setChats] = useState([]);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/check`, { withCredentials: true });
        if (!res.data.isAuthenticated) {
          return;
        }
    
        const fetchChats = async () => {
          try {
            const chatRes = await axios.get(`${API_URL}/api/chat`, { withCredentials: true });
            setChats(chatRes.data);
           // console.log(chatRes);
          } catch (err) {
            console.error(err.message);
          }
        };

        const fetchUserData = async () => {
          try {
            const userRes = await axios.get(`${API_URL}/api/user`, { withCredentials: true });
            const user = userRes.data;
            setUsername(user.name || '@');
          } catch (err) {
            console.error('Failed to fetch user data:', err);
          }
        };

        fetchChats();
        fetchUserData();
      } catch (err) {
        console.error(err);
      }
    };

    checkAuth();
  }, []);



  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include', // Include credentials to allow cookies to be sent
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Logged out successfully');
        // Redirect to login or update the UI as needed
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
    navigate('/');
  };

  const handleDeleteChat = async () => {
    try {
      await axios.delete(`${API_URL}/api/chat/deleteById/${selectedChatId}`, { withCredentials: true });
      setChats(chats.filter(chat => chat._id !== selectedChatId));
      setSelectedChatId('');
    } catch (err) {
      console.error('Failed to delete chats:', err);
    }
  };

  const toHome = () => {
    navigate('/');
  };



  const userInitial = username ? username[0] : '@';
  const handleShowProfile = () => {
    setShowProfileMenu(true);
    setTimeout(setShowProfileMenu(false), 3000);
  };

  return (
    <>
      <div className="chat">
        <Sidebar setSelectedChatId={setSelectedChatId} chats={chats}/>
        <div className="chat-container">
          <div className="chat-nav">
            <div className="model">
              <button onClick={() => setShowModelMenu(!showModelMenu)}>Models</button>
              {showModelMenu && (
                <ul className="model-menu">
                  <li className="model-item current">Models coming soon</li>
                </ul>
              )}
            </div>
            <div className="user">
              {showProfileMenu && (
                <ul className="profile-menu">
                  <li className="profile-item" onClick={toHome}>Home</li>
                  {selectedChatId && (<li className="profile-item" onClick={handleDeleteChat}>Delete Chat</li>)}
                  <li className="profile-item">Settings (coming soon...)</li>
                  <li className="profile-item">Help & Support</li>
                  <li className="profile-item" onClick={handleLogout}>Logout</li>
                </ul>
              )}
              <button onClick={handleShowProfile()}>
                {userInitial}
              </button>
            </div>
          </div>
          <MainChat selectedChatId = {selectedChatId}  setSelectedChatId = {setSelectedChatId} chats = {chats} setChats = {setChats}/>

        </div>
      </div>
    </>
  );
}

export default Chat;
