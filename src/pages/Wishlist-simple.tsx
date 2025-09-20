import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Wishlist: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-main">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/')} 
            className="btn btn--outline"
          >
            ← Back to Films
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-2xl">❤️</span>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              My Wishlist
            </h1>
          </div>
        </div>

        <div className="card p-12 text-center shadow-card">
          <span className="text-6xl mb-6 block">❤️</span>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Start adding films to your wishlist to keep track of movies you want to watch.
          </p>
          <button onClick={() => navigate('/')} className="btn btn--default">
            Browse Films
          </button>
        </div>
      </div>
    </div>
  );
};
