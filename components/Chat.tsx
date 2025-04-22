import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am your chatbot. How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate API call to Google Gemini or another AI model
    const botResponse = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    }).then((res) => res.json());

    setMessages((prev) => [...prev, { sender: 'bot', text: botResponse.reply }]);
  };

  return (
    <div className="chat-container border p-4 rounded shadow-md">
      <div className="messages overflow-y-auto h-64 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message mb-2 ${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                msg.sender === 'bot' ? 'bg-gray-200' : 'bg-blue-500 text-white'
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="input-area flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border rounded p-2 mr-2"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;