import React, { useEffect, useState } from 'react';
import { Film } from '@/types/film';
import { getFilmsByCategory } from '@/services/tmdb';
import { Loading } from '@/components/Loading';
import { FilmCarousel } from '@/components/FilmCarousel';

export const Home: React.FC = () => {
  const [actionFilms, setActionFilms] = useState<Film[]>([]);
  const [dramaFilms, setDramaFilms] = useState<Film[]>([]);
  const [comedyFilms, setComedyFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const [action, drama, comedy] = await Promise.all([
          getFilmsByCategory('action'),
          getFilmsByCategory('drama'),
          getFilmsByCategory('comedy'),
        ]);
        
        setActionFilms(action);
        setDramaFilms(drama);
        setComedyFilms(comedy);
      } catch (error) {
        console.error('Error fetching films:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-main flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-main">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-center mb-4 text-foreground">
            Discover Your Next
            <span className="bg-gradient-action bg-clip-text text-transparent ml-4">
              Favorite Film
            </span>
          </h1>
          <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
            Explore curated collections of action-packed thrillers, emotional dramas, and hilarious comedies.
          </p>
        </div>

        <div className="space-y-16">
          <FilmCarousel
            title="Action & Adventure"
            films={actionFilms}
            category="action"
          />
          
          <FilmCarousel
            title="Drama & Stories"
            films={dramaFilms}
            category="drama"
          />
          
          <FilmCarousel
            title="Comedy & Fun"
            films={comedyFilms}
            category="comedy"
          />
        </div>
      </div>
    </div>
  );
};
