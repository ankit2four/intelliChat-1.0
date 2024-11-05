import React, { useState } from 'react';

function Sidebar({ setSelectedChatId, chats }) {
    const [isVisible, setIsVisible] = useState(true);
    //console.log("from Sidebar");

    const toggleSidebar = () => {
        setIsVisible(!isVisible);
    };

    const handleNewChat = () => {
        setSelectedChatId('');
    };

    return (
        <>
            {!isVisible && (
                <button className="small-toggle-btn" onClick={toggleSidebar}>
                    &#9776; {/* Hamburger icon */}
                </button>
            )}
            <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
                {isVisible && (
                    <>
                        <div className="sidebar-button">
                            <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
                                X
                            </button>
                            <button type="button" className="button" onClick={handleNewChat}>
                                <span className="button__text">New Chat</span>
                                <span className="button__icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg">
                                        <line y2="19" y1="5" x2="12" x1="12"></line>
                                        <line y2="12" y1="12" x2="19" x1="5"></line>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <h2>Chats</h2>
                        <div className='chat-history'>
                            {chats.length === 0 ? (
                                <div>No chats available</div>
                            ) : (
                                <ul>
                                    {chats.map(chat => (
                                        <li key={chat._id} onClick={() => setSelectedChatId(chat._id)}>
                                            {chat.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

// Wrap Sidebar with React.memo for optimization
export default React.memo(Sidebar, (prevProps, nextProps) => {
    // Only re-render if setSelectedChatId or chats array changes
    return prevProps.setSelectedChatId === nextProps.setSelectedChatId &&
           prevProps.chats === nextProps.chats;
});
