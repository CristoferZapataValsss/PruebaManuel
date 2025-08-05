import axios from 'axios';

// Usa la variable de entorno definida en tu .env
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Función para obtener películas populares
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    return response.data.results; // Retorna el array de películas
  } catch (error) {
    console.error('Error fetching movies:', error);
    return []; // Retorna un array vacío si hay error
  }
};

// Función para buscar películas por nombre (opcional)
export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return response.data.results;
};