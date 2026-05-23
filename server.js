// server.js
// Punto de entrada de la aplicación

const express = require('express');
const path = require('path');

const loggerMiddleware = require('./middlewares/loggerMiddleware');
const tareasRoutes = require('./routes/tareasRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(express.json());           // Parsear JSON en el body
app.use(loggerMiddleware);         // Registrar todas las peticiones

// Archivos estáticos del frontend (carpeta public)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use('/api/tareas', tareasRoutes);

// Manejador de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});