// components/Header.tsx

import React from 'react';

const Header = () => {
  return (
    <header className="bg-amana-dark text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Amana Transportation</h1>
        <nav>
          <button className="p-2 rounded-md hover:bg-amana-green/20 transition-colors focus:outline-none" title="Menu">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
