import React, { useState, useEffect } from 'react';
import Image from './Image';
import Chatbox from '../chatbox/Chatbox';
import useAuth from '../../database/Auth';

const Chatbot = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showChatbox, setShowChatbox] = useState(false); // State for chatbox visibility
  const { user } = useAuth();

  useEffect(() => {
    if (!showChatbox) {
      const interval = setInterval(() => {
        setShowMessage((prevShowMessage) => !prevShowMessage);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [showChatbox]);

  const handleImageClick = () => {
    setShowMessage(false); // Hide the initial message
    setShowChatbox(true); // Show the chatbox
  };

  const handleCloseChatbox = () => {
    setShowChatbox(false);
    setShowMessage(true); // Optionally show the initial message again
  };

  return (
    <>
      {!showChatbox && (
        <div className='fixed top-[90%] left-[95%] z-20 cursor-pointer' onClick={handleImageClick}>
         <div className='relative'>
         <Image src='/public/images/chatbot.png' className='h-[6vh]' />
          {showMessage && (
            <div className='absolute right-16 bottom-0 flex  flex-grow z-20 w-[18vw] bg-white p-2 rounded shadow-lg'>
              {user ? (
                <p>Hello {user.displayName}, I'm AI assistant...</p>
              ) : (
                <p>Hello customer, I'm AI assistant...</p>
              )}
            </div>
          )}
         </div>
        </div>
      )}
      {showChatbox && <Chatbox onClose={handleCloseChatbox} />}
    </>
  );
}

export default Chatbot;
