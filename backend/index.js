const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Ejemplo de rutas para favoritos
let favorites = [];

// Obtener favoritos
app.get('/api/favorites', (req, res) => {
  res.json(favorites);
});

// Agregar favorito
app.post('/api/favorites', (req, res) => {
  const movie = req.body;
  favorites.push(movie);
  res.status(201).json(movie);
});

// Eliminar favorito
app.delete('/api/favorites/:id', (req, res) => {
  const id = parseInt(req.params.id);
  favorites = favorites.filter(fav => fav.id !== id);
  res.status(204).send();
});

// Iniciar servidor
app.listen(3001, () => {
  console.log('Servidor backend escuchando en puerto 3001');
});