import React from 'react';
import '../css/Common.css';
import '../css/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // ✅ Dynamic Year

  return (
    <footer>
      <p>&copy; {currentYear} My Dashboard. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
