import React from 'react';
import { Film, Category } from '@/types/film';
import { Card } from './Card';
import { Star } from 'lucide-react';
import { getImageUrl } from '@/services/tmdb';

interface FilmCardProps {
  film: Film;
  onClick: () => void;
}

export const FilmCard: React.FC<FilmCardProps> = ({ film, onClick }) => {
  const category = film.category || 'action';
  const posterUrl = film.poster_path ? getImageUrl(film.poster_path) : null;

  return (
    <Card 
      className={`film-card film-card--${category}`}
      onClick={onClick}
    >
      <div className="relative h-full">
        {/* Poster Image */}
        <div className={`film-card__poster film-card__poster--${category}`}>
          {posterUrl ? (
            <img 
              src={posterUrl} 
              alt={film.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                console.error(`Film card image failed to load: ${film.title}`, {
                  posterPath: film.poster_path,
                  imageUrl: posterUrl
                });
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = target.nextElementSibling as HTMLElement;
                if (placeholder) {
                  placeholder.style.display = 'flex';
                }
              }}
            />
          ) : null}
          {/* Fallback placeholder */}
          <div 
            className="film-card__placeholder"
            style={{ display: posterUrl ? 'none' : 'flex' }}
          >
            <div className="film-card__placeholder-icon">
              <span>🎬</span>
            </div>
            <p className="film-card__placeholder-text">No poster available</p>
            <p className="film-card__placeholder-title">{film.title}</p>
          </div>
        </div>
        
        {/* Overlay with film info */}
        <div className="film-card__overlay">
          <div className="film-card__content">
            <h3 className="film-card__title">
              {film.title}
            </h3>
            <div className="film-card__info">
              <div className={`film-card__rating film-card__rating--${category}`}>
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs font-medium">{film.vote_average.toFixed(1)}</span>
              </div>
              <span className="film-card__year">
                {new Date(film.release_date).getFullYear()}
              </span>
            </div>
            {film.overview && (
              <p className="film-card__description">
                {film.overview}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
