import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '@/contexts/WishlistContext';
import { FilmCard } from '@/components/ui/FilmCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Heart, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Wishlist: React.FC = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  const handleRemoveFromWishlist = (filmId: number, filmTitle: string) => {
    removeFromWishlist(filmId);
    toast({
      title: "Removed from wishlist",
      description: `${filmTitle} has been removed from your wishlist.`,
    });
  };

  const handleFilmClick = (filmId: number) => {
    navigate(`/film/${filmId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            onClick={() => navigate('/')} 
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Films
          </Button>
          
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-primary" />
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              My Wishlist
            </h1>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <Card className="p-12 text-center shadow-card">
            <Heart className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Start adding films to your wishlist to keep track of movies you want to watch.
            </p>
            <Button onClick={() => navigate('/')}>
              Browse Films
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              {wishlist.length} film{wishlist.length > 1 ? 's' : ''} in your wishlist
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {wishlist.map(({ film, addedAt }) => (
                <div key={film.id} className="relative group">
                  <FilmCard
                    film={film}
                    onClick={() => handleFilmClick(film.id)}
                  />
                  
                  {/* Remove button overlay */}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-8 h-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromWishlist(film.id, film.title);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  
                  {/* Added date */}
                  <div className="mt-2 text-xs text-muted-foreground">
                    Added {addedAt.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
