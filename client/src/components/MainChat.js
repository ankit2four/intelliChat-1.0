import bot from '../bot.png';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Message from '../components/Message.js';
import InputArea from '../components/InputArea.js';

function MainChat({ selectedChatId, setSelectedChatId, chats, setChats }) {
    //console.log("from MainChat");
    const [messages, setMessages] = useState([]);
    const messagesContainerRef = useRef(null);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchChatHistory = async () => {
            if (!selectedChatId) return;

            try {
                const res = await axios.get(`${API_URL}/api/chat/${selectedChatId}`, { withCredentials: true });
                setMessages(res.data.messages || []);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setMessages([]);
                } else {
                    console.error('Failed to fetch chat history:', err);
                }
            }
        };

        fetchChatHistory();
    }, [selectedChatId]);

    
    const scrollToBottom = () => {
        const messagesContainer = messagesContainerRef.current;
        if (messagesContainer) {
            messagesContainer.scrollTo({
                top: messagesContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            <div className="chat-area" ref={messagesContainerRef}>
                {messages.length > 0 && selectedChatId ? (
                    messages.map((msg) => (
                        
                        <div
                            key={msg._id}
                            className={msg.sender === 'user' ? 'user-message' : 'ai-message'}
                        >
                            {msg.sender === 'user' ? '' : <img src={bot} alt="bot" height="30" width="40" />}
                            <div className="message">
                                {msg.sender === 'user' ? msg.message : <Message message={msg.message} />}
                            </div>
                        </div>

                    ))
                ) : (
                    <div className="ai-message">
                        <div className="message">
                            <img src={bot} alt="bot" height="30" width="40" />
                            <div><h2>How can I help you?</h2></div>
                        </div>
                    </div>
                )}
                
            </div>
            <InputArea 
                selectedChatId={selectedChatId} 
                setMessages={setMessages} 
                chats={chats} 
                setChats={setChats} 
                setSelectedChatId={setSelectedChatId} 
                scrollToBottom={scrollToBottom} 
                
            />
        </>
    );
}

// Wrap MainChat with React.memo for optimization
export default React.memo(MainChat, (prevProps, nextProps) => {
    // Re-render only if selectedChatId or chats array changes
    return prevProps.selectedChatId === nextProps.selectedChatId &&
           prevProps.chats === nextProps.chats;
});
