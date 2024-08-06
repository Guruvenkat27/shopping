import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import Image from '../pages/Image';

const Chatbox = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Display welcome message and some predefined interactive messages
    setMessages([
      { text: 'Welcome! Click here for more info.', type: 'bot', clickable: true },
      { text: 'Do you need help with your order?', type: 'bot', clickable: true },
      { text: 'Check our latest updates!', type: 'bot', clickable: true }
    ]);
  }, []);

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { text: input, type: 'user' }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Simulate a bot response with a delay
    setTimeout(() => {
      setMessages([...newMessages, { text: `You said: ${input}`, type: 'bot' }]);
      setIsTyping(false);
    }, 2000); // 2-second delay for bot response
  };

  const handleClickMessage = (index) => {
    const clickedMessage = messages[index];
    if (clickedMessage.clickable) {
      let botReply = '';
      switch (clickedMessage.text) {
        case 'Welcome! Click here for more info.':
          botReply = 'Here is more info as requested.';
          break;
        case 'Do you need help with your order?':
          botReply = 'Sure, I can help with your order. What do you need assistance with?';
          break;
        case 'Check our latest updates!':
          botReply = 'Here are the latest updates from our team!';
          
          break;
        default:
          botReply = 'I am here to help!';
      }
      const newMessages = [
        ...messages,
        { text: clickedMessage.text, type: 'user' },
        { text: botReply, type: 'bot' }
      ];
      setMessages(newMessages);
    }
  };

  return (
    <div className='fixed bottom-3 right-10 z-50'>
      <div className='relative bg-white border overflow-hidden p-0 rounded-lg shadow-lg w-80 h-[73vh]'>
        <div className='relative bg-purple-600 h-11 top-0 flex items-center justify-between px-5'>
           <div className='flex gap-2'> <Image src='/public/images/chatbot.png' className='w-6' />
           <span className='font-bold text-[17px] text-white'>Chat</span></div>
          <button
            className='text-black hover:text-gray-700 z-40'
            onClick={onClose}
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className='p-2 h-4/5 overflow-y-auto'>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}
              onClick={() => handleClickMessage(index)}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'
                } ${msg.clickable ? 'cursor-pointer' : ''}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className='p-2 text-left'>
              <div className='inline-block p-2 rounded-lg bg-gray-300'>
                Typing...
              </div>
            </div>
          )}
        </div>
        <div className='p-2 border-t'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className='w-full border rounded-lg p-2'
            placeholder='Type your message...'
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
