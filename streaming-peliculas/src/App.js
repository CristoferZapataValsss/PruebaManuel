import React, { useEffect, useState } from 'react';
import { getPopularMovies, searchMovies } from './services/tmdb';
import { getFavorites, addFavorite, removeFavorite } from './services/favorites';
import MovieCard from './components/MovieCard';
import FavoriteCard from './components/FavoriteCard';
import './App.css';


function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cargar películas y favoritos al iniciar
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const moviesData = await getPopularMovies(currentPage);
        setMovies(moviesData);
      } catch (error) {
        setError('Error al cargar películas');
        setMovies([]);
      }
      try {
        const savedFavorites = await getFavorites();
        setFavorites(savedFavorites);
      } catch (error) {
        setError('');
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [currentPage]);

  // Guardar película en favoritos
  const handleSaveFavorite = async (movie) => {
    const isAlreadyFavorite = favorites.some(fav => fav.movieId === movie.id);

    if (!isAlreadyFavorite) {
      try {
        await addFavorite({
          movieId: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          overview: movie.overview
        });
        const updatedFavorites = await getFavorites();
        setFavorites(updatedFavorites);
        setError('');
        setSuccess(`¡${movie.title} añadida a favoritos!`);
      } catch (error) {
        setError('Error al agregar a favoritos');
      }
    } else {
      setError('¡Esta película ya está en tus favoritos!');
    }
  };
  // Eliminar de favoritos
  const handleRemoveFavorite = async (movieId) => {
    try {
      await removeFavorite(movieId);
      const updatedFavorites = await getFavorites();
      setFavorites(updatedFavorites);
      setError('');
      setSuccess('Película eliminada de favoritos');
    } catch (error) {
      setError('Error al eliminar de favoritos');
    }
  };
  return (
    <div class="App">
      <header>
        <h1>Streaming Películas</h1>
      </header>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (searchTerm.trim() === '') return;
          setLoading(true);
          try {
            const results = await searchMovies(searchTerm);
            setSearchResults(results);
            setError('');
          } catch (error) {
            setError('Error al buscar películas');
          } finally {
            setLoading(false);
          }
        }}
        style={{ marginBottom: '20px' }}
      >
        <input 
          type="text"
          placeholder="Buscar película..."
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setError('');
          }}
          style={{ padding: '8px', width: '250px', borderRadius: '4px', border: '2px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 12px', marginLeft: '8px' }} 
        disabled={searchTerm === '' && searchResults.length === 0}
        >
          Buscar
        </button>

        <button
          type="button"
          style={{ padding: '8px 12px', marginLeft: '8px'}}
          onClick={() => {
            setSearchTerm('');
            setSearchResults([]);
            setError('');
          }}
          disabled={searchTerm === '' && searchResults.length === 0}
        >
          Limpiar
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginBottom: '16px', fontWeight: 'bold' }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ color: 'green', marginBottom: '16px', fontWeight: 'bold' }}>
          {success}
        </div>
      )}

      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
        
          <div className="movies-grid">
            {(searchResults.length > 0 ? searchResults : movies).map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={favorites.some(fav => fav.movieId === movie.id)}
                onFavoriteClick={handleSaveFavorite}
              />
            ))}
          </div>
            
          {searchResults.length === 0 && (
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span>Página {currentPage}</span>
              <button onClick={() => setCurrentPage(p => p + 1)}>
                Siguiente
              </button>
            </div>
          )}

          {/* Sección de Favoritos */}
          <div className="favorites-section">
            <h2 style={{color:'white'}}>Mis Películas Favoritas ({favorites.length})</h2>
            {favorites.length > 0 ? (
              <div className="favorites-grid">
                {favorites.map(fav => (
                  <FavoriteCard
                    key={fav.id}
                    movie={fav}
                    onRemove={handleRemoveFavorite}
                  />
                ))}
              </div>
            ) : (
              <p>No tienes películas favoritas aún.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default App;