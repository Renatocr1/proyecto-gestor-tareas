# Gestor de Tareas Colaborativas

## Descripción
Prototipo funcional de un gestor de tareas colaborativas integrado con Node.js + Express a partir de una maqueta HTML/CSS.

## Funcionalidades
- Listar tareas
- Agregar nuevas tareas
- Marcar tareas como completadas
- Eliminar tareas

## Tecnologías utilizadas
- Node.js
- Express
- HTML
- CSS
- JavaScript
- Fetch API

## Estructura del proyecto
- routes/
- controllers/
- middlewares/
- public/

## Endpoints
- GET /api/tareas
- POST /api/tareas
- PATCH /api/tareas/:id/completar
- DELETE /api/tareas/:id

## Validaciones
- La tarea no puede ir vacía
- No puede contener solo espacios
- No puede superar el límite permitido
- Se muestran mensajes claros en caso de error

## Ejecución
1. Abrir terminal en la carpeta del proyecto
2. Ejecutar:
   ```bash
   npm install
   node server.js