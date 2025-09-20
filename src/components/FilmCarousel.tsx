import React, { useCallback } from 'react';
import { Film, Category } from '@/types/film';
import { FilmCard } from './FilmCard';
import { useNavigate } from 'react-router-dom';

interface FilmCarouselProps {
  title: string;
  films: Film[];
  category: Category;
}

const categoryFonts = {
  action: 'font-sans font-bold text-action-accent',
  drama: 'font-serif font-semibold text-drama-accent',
  comedy: 'font-display text-comedy-accent',
};

export const FilmCarousel: React.FC<FilmCarouselProps> = ({ title, films, category }) => {
  const navigate = useNavigate();
  
  // Debug logging
  React.useEffect(() => {
    console.log(`FilmCarousel ${title}:`, {
      filmsCount: films.length,
      category,
      firstFewFilms: films.slice(0, 3).map(f => f.title)
    });
  }, [films, title, category]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const [slidesToShow, setSlidesToShow] = React.useState(4);

  React.useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 768) setSlidesToShow(1);
      else if (window.innerWidth < 1024) setSlidesToShow(2);
      else if (window.innerWidth < 1280) setSlidesToShow(3);
      else setSlidesToShow(4);
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  // Reset current index when slidesToShow changes
  React.useEffect(() => {
    setCurrentIndex(0);
  }, [slidesToShow]);

  const maxIndex = Math.max(0, films.length - slidesToShow);

  const scrollPrev = useCallback(() => {
    setCurrentIndex(prev => {
      const newIndex = Math.max(0, prev - 1);
      console.log(`Scroll Prev: ${prev} -> ${newIndex}, maxIndex: ${maxIndex}, films.length: ${films.length}`);
      return newIndex;
    });
  }, [maxIndex, films.length]);

  const scrollNext = useCallback(() => {
    setCurrentIndex(prev => {
      const newIndex = Math.min(maxIndex, prev + 1);
      console.log(`Scroll Next: ${prev} -> ${newIndex}, maxIndex: ${maxIndex}, films.length: ${films.length}`);
      return newIndex;
    });
  }, [maxIndex, films.length]);

  const handleFilmClick = (film: Film) => {
    navigate(`/film/${film.id}`);
  };

  // Touch/Mouse drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - (carouselRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl lg:text-3xl ${categoryFonts[category]}`}>
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            disabled={currentIndex === 0}
            className="btn btn--outline btn--sm w-8 h-8 p-0 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous films"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            disabled={currentIndex >= maxIndex}
            className="btn btn--outline btn--sm w-8 h-8 p-0 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next films"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div 
        className="overflow-hidden"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div 
          className="flex gap-4 transition-transform duration-300 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`
          }}
        >
          {films.map((film) => (
            <div key={film.id} className="flex-none" style={{ 
              width: `calc(${100 / slidesToShow}% - ${16 / slidesToShow}px)`,
              minWidth: '200px',
              maxWidth: '280px'
            }}>
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
