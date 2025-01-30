import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer">
      <footer className="footer-container">
        <div className="footer-left">
          <span>© 2024 GoEat, Inc</span>
        </div>
        <ul className="footer-links">
          {/* <li><Link to="#" className="footer-link">Link 1</Link></li>
          <li><Link to="#" className="footer-link">Link 2</Link></li>
          <li><Link to="#" className="footer-link">Link 3</Link></li> */}
        </ul>
      </footer>
    </div>
  );
}
