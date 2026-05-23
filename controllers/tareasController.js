// controllers/tareasController.js
// Controladores HTTP de las tareas.
// Sólo se ocupan de leer la request, llamar al service y responder.
// La lógica de negocio vive en /services y los datos en /data.

const tareasService = require('../services/tareasService');

// GET /api/tareas
function obtenerTareas(req, res) {
  const tareas = tareasService.listarTareas();
  res.json(tareas);
}

// GET /api/tareas/:id
function obtenerTareaPorId(req, res) {
  const id = parseInt(req.params.id, 10);
  const tarea = tareasService.obtenerTarea(id);

  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  res.json(tarea);
}

// POST /api/tareas
function crearTarea(req, res) {
  const nueva = tareasService.crearTarea(req.body);
  res.status(201).json(nueva);
}

// PUT /api/tareas/:id
function actualizarTarea(req, res) {
  const id = parseInt(req.params.id, 10);
  const tarea = tareasService.actualizarTarea(id, req.body);

  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  res.json(tarea);
}

// PATCH /api/tareas/:id/completar  -> alternar estado completada
function alternarCompletada(req, res) {
  const id = parseInt(req.params.id, 10);
  const tarea = tareasService.alternarCompletada(id);

  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  res.json(tarea);
}

// DELETE /api/tareas/:id
function eliminarTarea(req, res) {
  const id = parseInt(req.params.id, 10);
  const eliminada = tareasService.eliminarTarea(id);

  if (!eliminada) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  res.json({ mensaje: 'Tarea eliminada', tarea: eliminada });
}

module.exports = {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
  actualizarTarea,
  alternarCompletada,
  eliminarTarea
};