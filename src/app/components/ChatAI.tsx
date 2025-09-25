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
          className="text-blue-400 hover:text-blue-300 underline break-all"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

// Utility to strip markdown and special formatting from Gemini API responses
function stripMarkdown(text: string): string {
  return text
    // Remove headings, bold, italics, strikethrough, blockquotes
    .replace(/^\s{0,3}(#{1,6})\s+/gm, '') // headings
    .replace(/\*\*(.*?)\*\*/g, '$1') // bold
    .replace(/\*(.*?)\*/g, '$1') // italics
    .replace(/__(.*?)__/g, '$1') // bold
    .replace(/_(.*?)_/g, '$1') // italics
    .replace(/~~(.*?)~~/g, '$1') // strikethrough
    .replace(/^>\s?/gm, '') // blockquotes
    // Remove unordered/ordered list markers
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    // Remove code blocks and inline code
    .replace(/`{3}[\s\S]*?`{3}/g, '')
    .replace(/`([^`]+)`/g, '$1')
    // Remove horizontal rules
    .replace(/^---$/gm, '')
    // Remove extra newlines
    .replace(/\n{2,}/g, '\n')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

// Loading dots animation component
const LoadingDots = () => (
  <div className="flex space-x-1">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
  </div>
);

export default function ChatAI() {
  const [prompt, setPrompt] = useState<string>('Tell me about Anass Lebkhaiti and his work experience');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Ref for the scrollable chat container
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll only the chat area, not the whole page
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

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
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col h-[600px] w-full max-w-96 bg-gradient-to-br from-[#1a2c44] via-[#223a5f] to-[#2c3e50] rounded-2xl shadow-lg border border-gray-200"
      tabIndex={-1}
      style={{ outline: 'none' }}
    >
      <div className="p-4 border-b border-gray-200 bg-opacity-60 rounded-t-2xl">
        <h2 className="text-lg font-semibold text-white tracking-wide">Chat with ShipDaily.ai</h2>
      </div>

      <div
        className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar"
        ref={chatContainerRef}
        style={{ background: 'transparent' }}
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-200">
            Start a conversation with ShipDaily.ai
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'model' && (
                <div className="flex items-end gap-2">
                  <span className="bg-white border border-gray-200 rounded-full p-1 shadow-sm flex items-center justify-center mr-1">
                    <SiGooglechat className="w-6 h-6 text-blue-500" />
                  </span>
                  <div className="relative">
                    <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none px-4 py-2 shadow-md max-w-xs md:max-w-md text-sm break-words animate-fade-in">
                      {formatMessageWithLinks(stripMarkdown(msg.text))}
                    </div>
                    <span className="absolute left-0 bottom-0 w-0 h-0 border-t-8 border-t-white border-l-8 border-l-transparent"></span>
                  </div>
                </div>
              )}
              {msg.role === 'user' && (
                <div className="flex items-end gap-2 flex-row-reverse">
                  <span className="bg-blue-500 border border-blue-400 rounded-full p-1 shadow-sm flex items-center justify-center ml-1">
                    <FaUserCircle className="w-6 h-6 text-white" />
                  </span>
                  <div className="relative">
                    <div className="bg-blue-500 text-white rounded-2xl rounded-br-none px-4 py-2 shadow-md max-w-xs md:max-w-md text-sm break-words animate-fade-in">
                      {msg.text}
                    </div>
                    <span className="absolute right-0 bottom-0 w-0 h-0 border-t-8 border-t-blue-500 border-r-8 border-r-transparent"></span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex items-start gap-3">
            <span className="bg-white border border-gray-200 rounded-full p-1 shadow-sm flex items-center justify-center mr-1">
              <SiGooglechat className="w-6 h-6 text-blue-500" />
            </span>
            <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none px-4 py-2 shadow-md max-w-xs md:max-w-md text-sm">
              <LoadingDots />
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="px-4 py-2 bg-red-50 text-red-500 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-opacity-60 rounded-b-2xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-grow px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 shadow-md placeholder-gray-500"
            style={{ background: '#fff', color: '#222' }}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}