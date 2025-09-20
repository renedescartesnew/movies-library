import React from 'react'
import { Link } from 'react-router-dom'

export interface Movie {
  id: number
  title: string
  release_date: string
  poster_path: string
  vote_average: number
  overview: string
}

interface MovieCardProps {
  movie: Movie
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const year = new Date(movie.release_date).getFullYear()
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.svg'

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img 
        src={posterUrl} 
        alt={movie.title}
        className="movie-card__image"
        loading="lazy"
      />
      <div className="movie-card__body">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__year">{year}</p>
        <div className="movie-card__rating">
          <span>⭐</span>
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  )
}
