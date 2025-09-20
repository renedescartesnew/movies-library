import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FilmDetails } from '@/types/film';
import { getFilmDetails, getImageUrl } from '@/services/tmdb';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Calendar, Clock, Star, Heart, HeartOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Loading } from '@/components/Loading';

export const FilmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [film, setFilm] = useState<FilmDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      if (!id) return;
      
      try {
        const filmData = await getFilmDetails(parseInt(id));
        setFilm(filmData);
      } catch (error) {
        console.error('Error fetching film details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [id]);

  const handleWishlistToggle = () => {
    if (!film) return;

    if (isInWishlist(film.id)) {
      removeFromWishlist(film.id);
      toast({
        title: "Removed from wishlist",
        description: `${film.title} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(film);
      toast({
        title: "Added to wishlist",
        description: `${film.title} has been added to your wishlist.`,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-main flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!film) {
    return (
      <div className="min-h-screen bg-gradient-main flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Film not found</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const category = film.category || 'action';
  const inWishlist = isInWishlist(film.id);

  // Debug logging for movie detail
  React.useEffect(() => {
    console.log('MovieDetail component:', {
      title: film.title,
      hasPosterPath: !!film.poster_path,
      posterPath: film.poster_path,
      imageUrl: film.poster_path ? getImageUrl(film.poster_path) : 'No URL'
    });
  }, [film]);

  return (
    <div className="min-h-screen bg-gradient-main">
      <div className="container mx-auto px-6 py-8">
        <Button 
          onClick={() => navigate('/')} 
          variant="outline" 
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Films
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Image Area */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden shadow-card">
              <div className="aspect-3-4 relative">
                {film.poster_path ? (
                  <img 
                    src={getImageUrl(film.poster_path) || ''} 
                    alt={film.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onLoad={() => {
                      console.log(`Movie detail image loaded: ${film.title}`);
                    }}
                    onError={(e) => {
                      console.error(`Movie detail image failed to load: ${film.title}`, {
                        posterPath: film.poster_path,
                        imageUrl: getImageUrl(film.poster_path)
                      });
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div 
                  className={`film-detail__placeholder film-detail__placeholder--${category}`}
                  style={{ display: film.poster_path ? 'none' : 'flex' }}
                >
                  <div className="film-detail__placeholder-content">
                    <div className="film-detail__placeholder-icon">
                      <span>🎬</span>
                    </div>
                    <p className="film-detail__placeholder-text">Film Poster</p>
                    <p className="film-detail__placeholder-title">
                      {film.title}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Button Area */}
            <div className="space-y-6">
              <div>
                <h1 className={`
                  text-3xl lg:text-4xl font-bold mb-4 
                  ${category === 'action' ? 'font-sans' : 
                    category === 'drama' ? 'font-serif' : 
                    'font-display'} 
                  text-foreground
                `}>
                  {film.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(film.release_date).getFullYear()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{film.runtime} min</span>
                  </div>
                  <div className={`flex items-center gap-1 ${
                    category === 'action' ? 'text-action-accent' : 
                    category === 'drama' ? 'text-drama-accent' : 
                    'text-comedy-accent'
                  }`}>
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-medium">{film.vote_average}/10</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleWishlistToggle}
                className={`
                  ${category === 'action' ? 'bg-gradient-action hover:bg-gradient-action/90 shadow-action' : 
                    category === 'drama' ? 'bg-gradient-drama hover:bg-gradient-drama/90 shadow-drama' : 
                    'bg-gradient-comedy hover:bg-gradient-comedy/90 shadow-comedy'} 
                  text-white font-semibold px-8 py-3
                  transition-all duration-300 ease-bounce
                  ${category === 'action' ? 'font-sans' : 
                    category === 'drama' ? 'font-serif' : 
                    'font-display'}
                `}
                size="lg"
              >
                {inWishlist ? (
                  <>
                    <HeartOff className="w-5 h-5 mr-2" />
                    Remove from Wishlist
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" />
                    Add to Wishlist
                  </>
                )}
              </Button>
            </div>

            {/* Additional Info Area */}
            <Card className="p-6 shadow-card">
              <h2 className={`text-xl font-semibold mb-4 ${
                category === 'action' ? 'font-sans text-action-accent' : 
                category === 'drama' ? 'font-serif text-drama-accent' : 
                'font-display text-comedy-accent'
              }`}>
                Overview
              </h2>
              <p className={`text-muted-foreground leading-relaxed mb-6 ${
                category === 'action' ? 'font-sans' : 
                category === 'drama' ? 'font-serif' : 
                'font-display'
              }`}>
                {film.overview}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`font-semibold mb-2 ${
                    category === 'action' ? 'font-sans' : 
                    category === 'drama' ? 'font-serif' : 
                    'font-display'
                  } text-foreground`}>
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {film.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className={`
                          px-3 py-1 bg-gradient-to-r 
                          ${category === 'action' ? 'from-action-primary/10 to-action-secondary/10' : 
                            category === 'drama' ? 'from-drama-primary/10 to-drama-secondary/10' : 
                            'from-comedy-primary/10 to-comedy-secondary/10'}
                          rounded-full text-xs font-medium border border-border
                          ${category === 'action' ? 'text-action-accent' : 
                            category === 'drama' ? 'text-drama-accent' : 
                            'text-comedy-accent'}
                        `}
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className={`font-semibold mb-2 ${
                    category === 'action' ? 'font-sans' : 
                    category === 'drama' ? 'font-serif' : 
                    'font-display'
                  } text-foreground`}>
                    Production
                  </h3>
                  <div className="space-y-1">
                    {film.production_companies.slice(0, 2).map((company) => (
                      <p key={company.id} className="text-sm text-muted-foreground">
                        {company.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
