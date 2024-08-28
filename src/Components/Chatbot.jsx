import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [inputHeight, setInputHeight] = useState(55);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi there! Tell me how you are feeling?' },
  ]);
  const [inputText, setInputText] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    setInputHeight(event.target.scrollHeight);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputText.trim()) return;

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', text: inputText },
    ]);
    setInputText('');
    setInputHeight(55); // Reset input height

    try {
      // Send input text to the backend API
      const response = await axios.post('http://localhost:5000/predict/chatbot', { text: inputText });
      // Update the chat with the response from the backend
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'bot', text: response.data.response },
      ]);
      setError('');
    } catch (error) {
      console.error('Error:', error);
      setError('Error occurred while processing the request');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-end bg-gray-100">
      <button
        className="fixed bottom-5 right-5 w-12 h-12 bg-purple-600 rounded-full text-white flex items-center justify-center"
        onClick={() => setShowChatbot(!showChatbot)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 transform transition-transform"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 0C4.477 0 0 4.477 0 10c0 5.522 4.477 10 10 10 5.522 0 10-4.478 10-10 0-5.523-4.478-10-10-10zm3.646 10.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L10 13.293l2.646-2.647a.5.5 0 0 1 .708 0zm0-3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L10 10.293l2.646-2.647a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </button>
      <div
        className={`fixed bottom-20 right-5 md:w-96 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform ${
          showChatbot ? 'scale-100' : 'scale-0'
        }`}
      >
        <div className="bg-purple-600 text-white py-3 px-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">ChatBot</h2>
          <button
            className="text-white"
            onClick={() => setShowChatbot(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transform transition-transform"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.477 0 10c0 5.522 4.477 10 10 10 5.522 0 10-4.478 10-10 0-5.523-4.478-10-10-10zm3.646 10.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L10 13.293l2.646-2.647a.5.5 0 0 1 .708 0zm0-3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L10 10.293l2.646-2.647a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>
        </div>
        <ul className="chatbox flex flex-col p-4">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`chat ${
                message.role === 'user' ? 'outgoing' : 'incoming'
              }`}
            >
              <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2">
                {/* Add your icon for user/bot */}
              </span>
              <p className={`bg-purple-600 text-white p-3 rounded-lg max-w-xs ${message.role === 'user' ? 'ml-auto' : ''}`}>
                {message.text}
              </p>
            </li>
          ))}
        </ul>
        <form className="chat-input border-t border-gray-300 flex items-center p-2" onSubmit={handleSubmit}>
          <textarea
            className="flex-grow resize-none outline-none"
            style={{ height: inputHeight }}
            placeholder="Enter a message..."
            value={inputText}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="text-purple-600 ml-2"
          >
            Send
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default Chatbot;