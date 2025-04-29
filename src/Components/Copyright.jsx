import React from 'react';
import './Copyright.css';

const Copyright = () => {
  return (
    <footer className="copyright-footer">
      © {new Date().getFullYear()} Panesara Nirav. All rights reserved.
    </footer>
  );
};

export default Copyright;
