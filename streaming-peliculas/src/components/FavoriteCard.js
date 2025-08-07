import React from 'react';

function FavoriteCard({ movie, onRemove }) {
  return (
    <div className="favorite-card">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
      />
      <h4>{movie.title}</h4>
      <button 
        onClick={() => onRemove(movie.id)}
        className="remove-btn"
      >
        Eliminar
      </button>
    </div>
  );
}

export default FavoriteCard;