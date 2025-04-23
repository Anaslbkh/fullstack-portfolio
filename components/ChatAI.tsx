// app/page.tsx
'use client'; // Required for useState, useEffect, event handlers

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { Content } from "@google/generative-ai"; // Import the type

// Define message structure
interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function ChatPage() {

  const [prompt, setPrompt] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]); // Stores chat history
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null); // For auto-scrolling

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages update
  useEffect(scrollToBottom, [messages]);

  // --- Format history for the API ---
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

    setMessages(currentMessages); // Add user message immediately
    setPrompt(''); // Clear input
    setIsLoading(true);
    setError(null);

    try {
      // Prepare history for the API call
      const apiHistory = formatHistoryForApi(messages); // Send history *before* adding the current user message

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send the new prompt and the correctly formatted history
        body: JSON.stringify({ prompt: newUserMessage.text, history: apiHistory }),
      });

      if (!response.ok) {
        const errorData = await response.text(); // Log the full response for debugging
        console.error('API Error Response:', errorData);
        throw new Error('API request failed');
      }

      const data = await response.json();

      // Add model's response to messages
      setMessages([...currentMessages, { role: 'model', text: data.text }]);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred.');
      // Optionally remove the user message if the API call fails completely
      // setMessages(messages);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: '700px', margin: 'auto', padding: '20px', boxSizing: 'border-box' }}>
      <h1>Gemini Chat</h1>
      <div style={{ flexGrow: 1, overflowY: 'auto', border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <span style={{
              background: msg.role === 'user' ? '#d1e7fd' : '#e2e3e5',
              padding: '8px 12px',
              borderRadius: '10px',
              display: 'inline-block',
              maxWidth: '80%'
            }}>
              <strong>{msg.role === 'user' ? 'You' : 'Gemini'}:</strong> {msg.text}
            </span>
          </div>
        ))}
        {/* Empty div to mark the end for scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask Gemini anything..."
          disabled={isLoading}
          style={{ flexGrow: 1, padding: '10px', marginRight: '10px' }}
        />
        <button type="submit" disabled={isLoading} style={{ padding: '10px 15px' }}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}