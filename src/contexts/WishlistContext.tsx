import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Film, WishlistItem } from '@/types/film';

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (film: Film) => void;
  removeFromWishlist: (filmId: number) => void;
  isInWishlist: (filmId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const addToWishlist = (film: Film) => {
    if (!isInWishlist(film.id)) {
      const newItem: WishlistItem = {
        film,
        addedAt: new Date(),
      };
      setWishlist(prev => [...prev, newItem]);
    }
  };

  const removeFromWishlist = (filmId: number) => {
    setWishlist(prev => prev.filter(item => item.film.id !== filmId));
  };

  const isInWishlist = (filmId: number) => {
    return wishlist.some(item => item.film.id === filmId);
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
