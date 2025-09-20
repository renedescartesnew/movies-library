import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__logo">
          <span>🎬</span>
          <span>BestMovies Selection</span>
        </Link>
        
        <nav className="header__nav">
          <Link 
            to="/" 
            className={`header__nav-link ${location.pathname === '/' ? 'header__nav-link--active' : ''}`}
          >
            Browse Films
          </Link>
          
          <Link to="/wishlist" className="header__wishlist-btn">
            <button className="btn btn--outline btn--sm">
              ❤️ Wishlist
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
