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

// Function to convert text with URLs to clickable links
const formatMessageWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export default function ChatAI() {
  const [prompt, setPrompt] = useState<string>('Tell me about Anass Lebkhaiti and his work experience');
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
    setPrompt('Tell me about Anass Lebkhaiti and his work experience');
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
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-96 bg-[#1a2c44] rounded-lg shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-white">Chat with Anass.AI</h2>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-200">
            Start a conversation with Anass.AI
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'model' && (
                <SiGooglechat className="w-6 h-6 text-gray-200 flex-shrink-0" />
              )}
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-50 text-gray-800'
                }`}
              >
                {msg.role === 'model' ? formatMessageWithLinks(msg.text) : msg.text}
              </div>
              {msg.role === 'user' && (
                <FaUserCircle className="w-6 h-6 text-gray-400 flex-shrink-0" />
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="px-4 py-2 bg-red-50 text-red-500 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-grow px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}