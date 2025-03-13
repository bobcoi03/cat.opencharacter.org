"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Function to generate a random number of "meow"s
const generateMeowCount = () => {
  // Random number between 1 and 30
  return Math.floor(Math.random() * 30) + 1;
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'meow',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, streamingContent]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, []);

  const handleSendMessage = (content: string) => {
    // Clear any existing interval
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content }]);
    
    // Simulate typing
    setIsTyping(true);
    setStreamingContent('');
    
    // Simulate response delay (between 0.5-1 seconds)
    setTimeout(() => {
      const meowCount = generateMeowCount();
      let currentMeows = 0;
      const meowArray = Array(meowCount).fill("meow");
      
      // Start streaming the meows
      streamIntervalRef.current = setInterval(() => {
        if (currentMeows < meowCount) {
          currentMeows++;
          setStreamingContent(meowArray.slice(0, currentMeows).join(" "));
        } else {
          // Finished streaming
          if (streamIntervalRef.current) {
            clearInterval(streamIntervalRef.current);
            streamIntervalRef.current = null;
          }
          
          // Add the complete message
          setMessages((prev) => [...prev, { 
            role: 'assistant', 
            content: meowArray.join(" ") 
          }]);
          
          setIsTyping(false);
          setStreamingContent('');
        }
      }, 100); // Add a new meow every 100ms
    }, 500 + Math.random() * 500);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto pb-4">
        <div>
          {messages.map((message, index) => (
            <ChatMessage key={index} role={message.role} content={message.content} />
          ))}
          {isTyping && (
            <div className="py-6 bg-white">
              <div className="max-w-3xl mx-auto flex items-start gap-4 px-4 sm:px-6 md:px-8">
                <div className="flex-shrink-0 w-8 h-8">
                  <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                    <Image src="/cat.png" alt="CatGPT Logo" width={32} height={32} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm mb-2 text-gray-800">CatGPT</p>
                  {streamingContent ? (
                    <div className="prose max-w-none text-gray-800">
                      <p className="whitespace-pre-wrap">{streamingContent}</p>
                    </div>
                  ) : (
                    <div className="flex space-x-2 items-center">
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></span>
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="mt-auto">
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default Chat; 