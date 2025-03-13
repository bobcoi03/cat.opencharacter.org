"use client";

import React from 'react';
import Image from 'next/image';

type ChatMessageProps = {
  role: 'user' | 'assistant';
  content: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  return (
    <div className={`py-6 ${role === 'user' ? 'bg-[#f7f7f8]' : 'bg-white'}`}>
      <div className="max-w-3xl mx-auto flex items-start gap-4 px-4 sm:px-6 md:px-8">
        <div className="flex-shrink-0 w-8 h-8">
          {role === 'user' ? (
            <div className="w-8 h-8 flex items-center justify-center bg-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          ) : (
            <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
              <Image src="/cat.png" alt="CatGPT Logo" width={32} height={32} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm mb-1 text-gray-800">
            {role === 'user' ? 'You' : 'CatGPT'}
          </p>
          <div className="prose max-w-none text-gray-800">
            <p className="whitespace-pre-wrap">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 