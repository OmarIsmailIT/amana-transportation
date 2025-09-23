// components/Footer.tsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-amana-dark text-white mt-12">
      <div className="container mx-auto px-6 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} Amana Transportation. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
