import React from "react";

const Footer = () => {
  return (
    <footer className="bg-info text-light text-center py-3">
      <p>&copy; {new Date().getFullYear()} JobPort. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
