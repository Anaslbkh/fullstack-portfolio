'use client';

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { Content } from "@google/generative-ai";
import { FaUserCircle } from 'react-icons/fa';
import { SiGooglechat } from 'react-icons/si';

// Define message structure
interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function ChatPage() {
  const [prompt, setPrompt] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const formatHistoryForApi = (history: Message[]): Content[] => {
    return history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const newUserMessage: Message = { role: 'user', text: prompt };
    const currentMessages = [...messages, newUserMessage];

    setMessages(currentMessages);
    setPrompt('');
    setIsLoading(true);
    setError(null);

    try {
      const apiHistory = formatHistoryForApi(messages);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: newUserMessage.text, history: apiHistory }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('API Error Response:', errorData);
        throw new Error('API request failed');
      }

      const data = await response.json();
      setMessages([...currentMessages, { role: 'model', text: data.text }]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-6 bg-gray-100 rounded-xl">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Talk to Anass.AI</h1>
      <div className="flex-grow overflow-y-auto bg-white shadow-md rounded-lg p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start space-x-4 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'model' && (
              <div className="flex-shrink-0">
                <SiGooglechat className="text-gray-800 w-8 h-8" />
              </div>
            )}
            {msg.role === 'user' && (
              <div className="flex-shrink-0">
                <FaUserCircle className="text-gray-800 w-8 h-8" />
              </div>
            )}
            <div
              className={`rounded-lg p-3 text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <strong>{msg.role === 'user' ? 'You' : 'Anass.AI'}:</strong> {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {error && <p className="text-red-500 mt-2 text-center">Error: {error}</p>}

      <form onSubmit={handleSubmit} className="mt-4 flex space-x-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask Gemini anything..."
          disabled={isLoading}
          className="flex-grow p-3 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}