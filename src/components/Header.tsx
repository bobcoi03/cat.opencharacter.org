"use client";

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-200 py-3 px-4 sm:px-6 md:px-8 bg-white h-12 flex items-center justify-between">
      <div>
        {/* Left side content can go here */}
      </div>
      <div>
        <a 
          href="https://opencharacter.org" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Made by OpenCharacter
        </a>
      </div>
    </header>
  );
};

export default Header; 