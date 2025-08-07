import React from 'react';

function MovieCard({ movie, isFavorite, onFavoriteClick }) {
  console.log('Renderizando MovieCard:', movie);
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        onError={e => { e.target.src = 'https://via.placeholder.com/300x450?text=Poster+No+Disponible'; }}
      />
      <h3>{movie.title}</h3>
      <p>{movie.overview?.substring(0, 100)}...</p>
      <button 
        onClick={() => onFavoriteClick(movie)}
        className="favorite-btn"
      >
        {isFavorite ? '★ En Favoritos' : '♥ Añadir a Favoritos'}
      </button>
    </div>
  );
}

export default MovieCard;