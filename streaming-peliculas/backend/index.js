// Importar dependencias
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Inicializar Express
const app = express();

// Configurar middlewares
app.use(cors());  // Permite peticiones desde el frontend
app.use(express.json());  // Para parsear JSON

// Configurar conexión a MySQL (¡cambia estos valores!)
const db = mysql.createConnection({
  host: 'localhost',      // Normalmente es 'localhost'
  user: 'root',           // Tu usuario de MySQL
  password: 'password',   // Tu contraseña de MySQL
  database: 'movie_favorites_db'  // Nombre de la base de datos que creaste
});

// Conectar a MySQL
db.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('✅ Conectado a MySQL');
});

// Ruta para guardar favoritos
app.post('/api/favorites', (req, res) => {
  const { movieId, title, poster_path, overview } = req.body;
  
  const sql = 'INSERT INTO favorites (movieId, title, poster_path, overview) VALUES (?, ?, ?, ?)';
  db.query(sql, [movieId, title, poster_path, overview], (err, result) => {
    if (err) {
      console.error('Error al guardar:', err);
      return res.status(500).json({ error: 'No se pudo guardar el favorito' });
    }
    res.json({ success: true, id: result.insertId });
  });
});

// Ruta para obtener favoritos
app.get('/api/favorites', (req, res) => {
  db.query('SELECT * FROM favorites', (err, results) => {
    if (err) {
      console.error('Error al obtener favoritos:', err);
      return res.status(500).json({ error: 'Error al cargar favoritos' });
    }
    res.json(results);
  });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});

