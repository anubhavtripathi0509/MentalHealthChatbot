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
    <div className="border rounded-lg overflow-hidden m-4 shadow-lg">
      <div className="sticky top-0 z-50 border-b border-gray-300 bg-white py-5 px-8 text-left text-sm text-gray-800">
        <h4 className="inline-block py-1 text-left font-sans font-semibold normal-case">ChatBot</h4>
        <button
          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-700"
          onClick={() => setShowChatbot(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
      <div className={`flex-grow px-8 pt-8 text-left text-gray-700 ${showChatbot ? 'block' : 'hidden'}`}>
        <div className="relative mb-6 text-center">
          <span className="relative bg-white px-2 text-sm text-gray-600">28 June, 2022</span>
        </div>
        <div className="flex flex-col mb-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`relative mb-6 text-left ${message.role === 'user' ? 'text-gray-700' : 'text-gray-700'}`}
            >
              <div className={`absolute top-0 ${message.role === 'user' ? 'right-0' : 'left-0'} inline-block`}>
                <img
                  src="/images/fR71TFZIDTv2jhvKsOMhC.png"
                  alt=""
                  className="h-6 w-6 sm:h-12 sm:w-12 rounded-full"
                />
              </div>
              <div
                className={`relative inline-block rounded-md py-3 px-4 ${
                  message.role === 'user' ? 'bg-blue-700 text-white ml-auto' : 'bg-gray-200'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="flex items-start border-t border-gray-300 sm:p-8 py-4 text-left text-gray-700">
          <textarea
            cols="1"
            rows="1"
            placeholder="Your Message"
            className="mr-4 w-full flex-1 resize-none rounded-md bg-white text-sm py-2 font-normal text-gray-600 shadow-none outline-none focus:text-gray-600"
            style={{ height: inputHeight }}
            value={inputText}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="inline-flex h-10 w-auto cursor-pointer items-center justify-center rounded-md bg-blue-700 px-6 text-center text-sm font-medium text-white outline-none"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
      <button
        className="fixed bottom-5 right-5 w-12 h-12 bg-purple-600 rounded-full text-white flex items-center justify-center"
        onClick={() => setShowChatbot(!showChatbot)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
  );
}

export default Chatbot;
