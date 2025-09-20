import { Film, FilmDetails } from '@/types/film';

// TMDB API Configuration
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500';

// Validate required environment variables
if (!API_KEY || !ACCESS_TOKEN) {
  console.error('Missing required TMDB API credentials. Please check your environment variables.');
  throw new Error('TMDB API credentials are required');
}

// API request headers
const headers = {
  'Authorization': `Bearer ${ACCESS_TOKEN}`,
  'accept': 'application/json',
};

// Genre mapping for TMDB API
const GENRE_MAPPING = {
  action: 28, // Action
  drama: 18,  // Drama
  comedy: 35  // Comedy
};

// Helper function to make API requests
const makeApiRequest = async (url: string) => {
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

export const getImageUrl = (path: string | null) => {
  if (!path) {
    return null;
  }
  return `${IMAGE_BASE_URL}${path}`;
};

// Test function to verify TMDB API is working
export const testTmdbApi = async () => {
  try {
    console.log('Testing TMDB API...');
    const url = `${BASE_URL}/discover/movie?with_genres=28&sort_by=popularity.desc&page=1&language=en-US`;
    const data = await makeApiRequest(url);
    console.log('TMDB API Test Response:', {
      totalResults: data.total_results,
      firstMovie: data.results[0],
      hasPosterPath: !!data.results[0]?.poster_path,
      posterPath: data.results[0]?.poster_path,
      imageUrl: data.results[0]?.poster_path ? getImageUrl(data.results[0].poster_path) : 'No URL'
    });
    return data;
  } catch (error) {
    console.error('TMDB API Test Failed:', error);
    throw error;
  }
};

export const getFilmsByCategory = async (category: 'action' | 'drama' | 'comedy'): Promise<Film[]> => {
  try {
    const genreId = GENRE_MAPPING[category];
    const allMovies: any[] = [];
    const totalPages = 5; // Fetch 5 pages to get ~100 movies (5 × 20 = 100)
    
    // Fetch multiple pages to get more movies
    for (let page = 1; page <= totalPages; page++) {
      const url = `${BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}&language=en-US`;
      const data = await makeApiRequest(url);
      allMovies.push(...data.results);
      
      console.log(`TMDB API Response for ${category} - Page ${page}:`, {
        totalResults: data.total_results,
        resultsLength: data.results.length,
        page: data.page,
        totalPages: data.total_pages
      });
    }
    
    console.log(`Total movies fetched for ${category}:`, allMovies.length);
    
    // Transform TMDB data to our Film interface and limit to 100 movies
    const transformedMovies = allMovies.slice(0, 100).map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      genre_ids: movie.genre_ids,
      category: category
    }));
    
    console.log(`Sample movie data for ${category}:`, {
      firstMovie: transformedMovies[0],
      hasPoster: transformedMovies[0]?.poster_path ? 'Yes' : 'No',
      posterPath: transformedMovies[0]?.poster_path,
      posterUrl: transformedMovies[0]?.poster_path ? getImageUrl(transformedMovies[0].poster_path) : 'None',
      rawApiData: allMovies[0] // Show raw API response for debugging
    });
    
    return transformedMovies;
  } catch (error) {
    console.error(`Error fetching ${category} films:`, error);
    // Return empty array on error
    return [];
  }
};

export const getFilmDetails = async (id: number): Promise<FilmDetails | null> => {
  try {
    const url = `${BASE_URL}/movie/${id}?language=en-US`;
    const data = await makeApiRequest(url);
    
    // Transform TMDB data to our FilmDetails interface
    const filmDetails: FilmDetails = {
      id: data.id,
      title: data.title,
      overview: data.overview,
      poster_path: data.poster_path,
      backdrop_path: data.backdrop_path,
      release_date: data.release_date,
      vote_average: data.vote_average,
      genre_ids: data.genres.map((g: any) => g.id),
      category: data.genres.some((g: any) => g.id === 28) ? 'action' : 
                data.genres.some((g: any) => g.id === 18) ? 'drama' : 'comedy',
      runtime: data.runtime,
      genres: data.genres,
      production_companies: data.production_companies,
      spoken_languages: data.spoken_languages
    };

    console.log(`Movie Detail for "${filmDetails.title}":`, {
      hasPosterPath: !!filmDetails.poster_path,
      posterPath: filmDetails.poster_path,
      imageUrl: filmDetails.poster_path ? getImageUrl(filmDetails.poster_path) : 'No URL',
      rawData: data
    });

    return filmDetails;
  } catch (error) {
    console.error(`Error fetching film details for ID ${id}:`, error);
    return null;
  }
};
