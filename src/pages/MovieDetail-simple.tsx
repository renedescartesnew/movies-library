import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FilmDetails } from '@/types/film';
import { getFilmDetails, getImageUrl } from '@/services/tmdb';

export const FilmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [film, setFilm] = useState<FilmDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      if (!id) return;
      
      try {
        console.log('Fetching film details for ID:', id);
        const filmData = await getFilmDetails(parseInt(id));
        console.log('Film data received:', filmData);
        setFilm(filmData);
      } catch (error) {
        console.error('Error fetching film details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#1a1a1a', 
        color: 'white', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '24px'
      }}>
        Loading...
      </div>
    );
  }

  if (!film) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#1a1a1a', 
        color: 'white', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f5f5f5', marginBottom: '1rem' }}>Film not found</h1>
          <button 
            onClick={() => navigate('/')} 
            style={{
              padding: '10px 20px',
              backgroundColor: 'transparent',
              color: '#f5f5f5',
              border: '1px solid #555',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const category = film.category || 'action';

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1a1a1a',
      color: '#f5f5f5',
      padding: '20px'
    }}>
      {/* Header Area */}
      <div style={{ 
        width: '100%', 
        marginBottom: '20px',
        padding: '10px'
      }}>
        <button 
          onClick={() => navigate('/')} 
          style={{
            padding: '10px 20px',
            backgroundColor: 'transparent',
            color: '#f5f5f5',
            border: '1px solid #555',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}
        >
          ← Back to Films
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px',
        marginBottom: '20px',
        minHeight: '400px'
      }}>
        {/* Image Area */}
        <div style={{
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ 
            aspectRatio: '3/4', 
            backgroundColor: '#333', 
            borderRadius: '8px', 
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            maxWidth: '300px'
          }}>
            {film.poster_path ? (
              <img 
                src={getImageUrl(film.poster_path) || ''} 
                alt={film.title}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }}
                loading="lazy"
                onLoad={() => {
                  console.log(`Movie detail image loaded: ${film.title}`);
                }}
                onError={(e) => {
                  console.error(`Movie detail image failed to load: ${film.title}`);
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
              style={{ 
                position: 'absolute',
                inset: 0,
                display: film.poster_path ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#333'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎬</div>
                <p>No poster available</p>
                <p style={{ fontSize: '12px', opacity: 0.7 }}>{film.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Button and Description Area */}
        <div style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '28px', 
              marginBottom: '15px',
              fontFamily: 'Space Grotesk, system-ui, sans-serif',
              fontWeight: '700'
            }}>{film.title}</h1>
            
            <div style={{ marginBottom: '15px' }}>
              <p style={{ 
                marginBottom: '5px',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: '500'
              }}>Year: {new Date(film.release_date).getFullYear()}</p>
              <p style={{ 
                marginBottom: '5px',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: '500'
              }}>Rating: {film.vote_average}/10</p>
              <p style={{ 
                marginBottom: '5px',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: '500'
              }}>Runtime: {film.runtime} min</p>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h2 style={{ 
                fontSize: '18px', 
                marginBottom: '8px',
                fontFamily: 'Space Grotesk, system-ui, sans-serif',
                fontWeight: '600'
              }}>Overview</h2>
              <p style={{ 
                fontSize: '14px', 
                lineHeight: '1.5',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: '400'
              }}>{film.overview}</p>
            </div>
          </div>

          <div>
            <button
              style={{
                padding: '12px 24px',
                backgroundColor: category === 'action' ? '#ff6b6b' : 
                               category === 'drama' ? '#a855f7' : '#84cc16',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                width: '100%',
                fontFamily: 'Space Grotesk, system-ui, sans-serif',
                transition: 'all 0.3s ease'
              }}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Additional Info Area */}
      <div style={{
        width: '100%',
        padding: '20px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Genres - aligned with image area */}
          <div style={{ 
            paddingLeft: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              marginBottom: '10px', 
              fontFamily: 'Space Grotesk, system-ui, sans-serif', 
              fontWeight: '600',
              textAlign: 'center',
              width: '100%'
            }}>Genres</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {film.genres.map((genre) => (
                <span
                  key={genre.id}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#333',
                    borderRadius: '20px',
                    fontSize: '12px',
                    border: '1px solid #555',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: '500'
                  }}
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          {/* Production - aligned with button area */}
          <div style={{ 
            paddingLeft: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              marginBottom: '10px', 
              fontFamily: 'Space Grotesk, system-ui, sans-serif', 
              fontWeight: '600',
              textAlign: 'center',
              width: '100%'
            }}>Production</h3>
            <div style={{ textAlign: 'center' }}>
              {film.production_companies.slice(0, 2).map((company) => (
                <p key={company.id} style={{ 
                  fontSize: '14px', 
                  marginBottom: '5px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: '400'
                }}>
                  {company.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};