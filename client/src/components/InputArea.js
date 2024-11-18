import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function InputArea({ selectedChatId={selectedChatId}, setMessages={setMessages}, chats ={chats}, setChats ={setChats}, setSelectedChatId={setSelectedChatId}, scrollToBottom = {scrollToBottom} }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);
  const [isGenerating, setGenerate] =useState(false);
  const [isError, setError] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;
  //console.log("inputArea");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    try {
      let chatResponse;

      if (!selectedChatId) {
        setGenerate(true);
        setInput('');
        chatResponse = await axios.post(`${API_URL}/api/chat`, { title: input }, { withCredentials: true });

        const res = await axios.post(
          `${API_URL}/api/chat/addMessage`,
          { message: input, chatId: selectedChatId || chatResponse.data._id },
          { withCredentials: true }
        );
        setGenerate(false);

        setChats([chatResponse.data,...chats]);
        //console.log("setChats");
        setSelectedChatId(chatResponse.data._id);
        setMessages(res.data.messages);
        scrollToBottom();
        return;
      }

      //console.log(selectedChatId)
      setGenerate(true);
      setInput('');
      const res = await axios.post(
        `${API_URL}/api/chat/addMessage`,
        { message: input, chatId: selectedChatId || chatResponse.data._id },
        { withCredentials: true }
      );
      setGenerate(false);
      setMessages(res.data.messages);
      
      scrollToBottom();
    } catch (err) {
      setError(true);
      console.error('Failed to send message:', err);
    }
  };

  

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  
  return (
    <>
    { isError? (<div>Sorry, Failed to generate<div>) : isGenerating && (
                           <>
                             
                            <div>
                                Generating....
                            </div>
                           </>
                )
                }
    <form onSubmit={handleSubmit} className="input-area">
      <textarea
      name = 'input'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input-field"
        placeholder="Type a message..."
        ref={textareaRef}
      />
      <button type="submit" className="send-button">Send</button>
    </form>
    </>
  );
}

export default InputArea;
