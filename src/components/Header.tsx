import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/Button';
import { Film, Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const { wishlist } = useWishlist();

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__logo">
          <Film className="w-8 h-8 text-primary" />
          <span>CineVault</span>
        </Link>
        
        <nav className="header__nav">
          <Link 
            to="/" 
            className={`header__nav-link ${location.pathname === '/' ? 'header__nav-link--active' : ''}`}
          >
            Browse Films
          </Link>
          
          <Link to="/wishlist" className="header__wishlist-btn">
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Wishlist
              {wishlist.length > 0 && (
                <span className="header__wishlist-badge">
                  {wishlist.length}
                </span>
              )}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
