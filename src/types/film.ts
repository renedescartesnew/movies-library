export interface Film {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  category?: 'action' | 'drama' | 'comedy';
}

export interface FilmDetails extends Film {
  runtime: number;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string; logo_path: string }[];
  spoken_languages: { iso_639_1: string; name: string }[];
}

export interface WishlistItem {
  film: Film;
  addedAt: Date;
}

export type Category = 'action' | 'drama' | 'comedy';
