"use client";

import React, { useState, FormEvent } from 'react';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="py-4 px-4 sm:px-6 md:px-8 bg-white">
      <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
        <div className="relative shadow-sm rounded-2xl border border-gray-200">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything (but I'll only say meow)..."
            disabled={disabled}
            rows={1}
            className="w-full py-3 px-4 pr-12 rounded-2xl border-0 bg-white focus:outline-none resize-none"
            style={{ minHeight: '80px', maxHeight: '200px' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (message.trim() && !disabled) {
                  onSendMessage(message);
                  setMessage('');
                }
              }
            }}
          />
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className={`absolute right-3 bottom-2.5 p-1.5 rounded-full ${
              !message.trim() || disabled
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
        <div className="text-center text-[8px] text-gray-500 mt-2">
          CatGPT may produce inaccurate information because it&apos;s just a cat saying meow
        </div>
      </form>
    </div>
  );
};

export default ChatInput; 