import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Film, Category } from '@/types/film';
import { FilmCard } from './FilmCard';
import { Button } from './Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FilmCarouselProps {
  title: string;
  films: Film[];
  category: Category;
}

export const FilmCarousel: React.FC<FilmCarouselProps> = ({ title, films, category }) => {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 3,
    breakpoints: {
      '(max-width: 768px)': { slidesToScroll: 1 },
      '(max-width: 1024px)': { slidesToScroll: 2 },
    }
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleFilmClick = (film: Film) => {
    navigate(`/film/${film.id}`);
  };

  return (
    <div className="film-carousel">
      <div className="film-carousel__header">
        <h2 className={`film-carousel__title film-carousel__title--${category}`}>
          {title}
        </h2>
        <div className="film-carousel__controls">
          <Button
            variant="outline"
            size="sm"
            onClick={scrollPrev}
            className="w-8 h-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={scrollNext}
            className="w-8 h-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="film-carousel__container" ref={emblaRef}>
        <div className="film-carousel__track">
          {films.map((film) => (
            <div key={film.id} className="flex-none">
              <FilmCard 
                film={film} 
                onClick={() => handleFilmClick(film)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
