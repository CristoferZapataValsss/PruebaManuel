import axios from 'axios';

const API_URL = 'http://localhost:3001/api/favorites'; // Cambia el puerto si tu backend usa otro

export const getFavorites = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addFavorite = async (movie) => {
  const response = await axios.post(API_URL, movie);
  return response.data;
};

export const removeFavorite = async (movieId) => {
  const response = await axios.delete(`${API_URL}/${movieId}`);
  return response.data;
};