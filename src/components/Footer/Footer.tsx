import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-600 text-white text-center py-4">
      <p>&copy; {currentYear} Rental All rights reserved.</p>
    </footer>
  );
};

export default Footer;
