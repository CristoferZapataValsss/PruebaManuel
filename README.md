# Streaming de Películas

Proyecto de prototipo para una plataforma de streaming de películas con favoritos, usando React, Node.js y MySQL.

---

## Características

- Catálogo de películas populares usando la API de TMDb.
- Paginación y búsqueda de películas.
- Guardar películas en favoritos (persistencia en MySQL).
- Ver y eliminar películas favoritas.
- Separación de frontend y backend.
- Código organizado y fácil de entender.

---

##Requisitos

- Node.js (v18+ recomendado)
- MySQL o MariaDB (puedes usar XAMPP)
- Git

---

##Instalación

### 1. Clona el repositorio

```sh
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo/streaming-peliculas
```

### 2. Instala dependencias del frontend

```sh
cd streaming-peliculas
npm install
```

### 3. Instala dependencias del backend

```sh
cd backend
npm install
```

---

##Configuración

### 1. Configura la base de datos

Crea la base de datos y la tabla en MySQL (puedes usar phpMyAdmin):

```sql
CREATE DATABASE movie_favorites_db;
USE movie_favorites_db;

CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movieId INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  poster_path VARCHAR(255),
  overview TEXT
);
```

### 2. Configura el archivo `.env` del frontend

Crea un archivo `.env` en la carpeta `streaming-peliculas` con el siguiente contenido:

```properties
REACT_APP_TMDB_API_KEY=[TU_API_KEY_DE_TMDB]
```

> **Nota:* Consigue tu API Key gratuita en [https://www.themoviedb.org/settings/api]

### 3. Configura la conexión MySQL en el backend

En `backend/index.js`, verifica que la configuración sea correcta para tu entorno XAMPP/MySQL:

```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // vacío por defecto en XAMPP
  database: 'movie_favorites_db'
});
```

---

##Ejecución

### 1. Inicia el backend

```sh
cd backend
node index.js
```

### 2. Inicia el frontend

```npm start
```
El frontend estará disponible en [http://localhost:3000]

---

##Uso

- Navega por el catálogo de películas populares.
- Usa el buscador para encontrar películas.
- Haz clic en "Guardar en mis favoritas" para añadir una película.
- Ve a la sección "Mis Favoritas" para ver y eliminar tus favoritas.

---
##
Desarrollado por Cristofer zapata.
