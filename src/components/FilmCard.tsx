import React from 'react';
import { Film } from '@/types/film';
import { useWishlist } from '@/contexts/WishlistContext';
import { getImageUrl } from '@/services/tmdb';

interface FilmCardProps {
  film: Film;
  onClick: () => void;
}

export const FilmCard: React.FC<FilmCardProps> = ({ film, onClick }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlist.some(item => item.id === film.id);
  
  // Debug logging for image issues
  React.useEffect(() => {
    if (film.poster_path) {
      console.log(`FilmCard for "${film.title}":`, {
        posterPath: film.poster_path,
        imageUrl: getImageUrl(film.poster_path)
      });
    } else {
      console.log(`FilmCard for "${film.title}": No poster path`);
    }
  }, [film]);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(film.id);
    } else {
      addToWishlist(film);
    }
  };

  const getCategoryClass = (category: string) => {
    switch (category.toLowerCase()) {
      case 'action':
        return 'film-card--action';
      case 'drama':
        return 'film-card--drama';
      case 'comedy':
        return 'film-card--comedy';
      default:
        return 'film-card--default';
    }
  };

  return (
    <div 
      className={`film-card ${getCategoryClass(film.category)}`}
      onClick={onClick}
    >
      <div className={`film-card__poster film-card__poster--${film.category}`}>
        {film.poster_path ? (
          <img 
            src={getImageUrl(film.poster_path) || ''} 
            alt={film.title}
            loading="lazy"
            onLoad={() => {
              console.log(`Image loaded successfully for: ${film.title}`);
            }}
            onError={(e) => {
              console.error(`Image failed to load for: ${film.title}`, {
                posterPath: film.poster_path,
                imageUrl: getImageUrl(film.poster_path)
              });
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const placeholder = target.nextElementSibling as HTMLElement;
              if (placeholder) {
                placeholder.style.display = 'flex';
              }
            }}
          />
        ) : null}
        <div 
          className="film-card__placeholder"
          style={{ display: film.poster_path ? 'none' : 'flex' }}
        >
          <div className="film-card__placeholder-icon">
            <span>🎬</span>
          </div>
          <p className="film-card__placeholder-text">No poster available</p>
          <p className="film-card__placeholder-title">{film.title}</p>
        </div>
        
        <button
          onClick={handleWishlistToggle}
          className={`film-card__wishlist ${isInWishlist ? 'film-card__wishlist--active' : ''}`}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg 
            className="w-5 h-5" 
            fill={isInWishlist ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
      </div>
      
      <div className="film-card__overlay">
        <div className="film-card__content">
          <h3 className="film-card__title">{film.title}</h3>
          <div className="film-card__info">
            <div className={`film-card__rating film-card__rating--${film.category}`}>
              ⭐ {film.vote_average.toFixed(1)}
            </div>
            <span className="film-card__year">
              {new Date(film.release_date).getFullYear()}
            </span>
          </div>
          <p className="film-card__description">
            {film.overview.length > 100 
              ? `${film.overview.substring(0, 100)}...` 
              : film.overview
            }
          </p>
        </div>
      </div>
    </div>
  );
};
