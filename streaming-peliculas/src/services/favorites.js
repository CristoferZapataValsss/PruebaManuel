const API_URL = 'http://localhost:5000/api/favorites';

export async function getFavorites() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addFavorite(movie) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });
  return res.json();
}

export async function removeFavorite(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}