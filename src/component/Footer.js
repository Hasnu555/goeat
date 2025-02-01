import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer">
      <footer className="bg-dark text-light text-center py-3 mt-5">
        <div className="container">
          <p className="mb-0">© 2024 GoEat, Inc. All Rights Reserved.</p>
          <ul className="list-inline mt-2">
            <li className="list-inline-item"><Link to="#" className="text-warning text-decoration-none">Privacy Policy</Link></li>
            <li className="list-inline-item mx-3">|</li>
            <li className="list-inline-item"><Link to="#" className="text-warning text-decoration-none">Terms of Service</Link></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
