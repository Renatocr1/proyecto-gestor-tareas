// controllers/tareasController.js
// Lógica CRUD de las tareas. Almacenamiento en memoria.

let tareas = [
  {
    id: 1,
    titulo: 'Bienvenido al gestor de tareas',
    descripcion: 'Esta es una tarea de ejemplo. Puedes editarla o eliminarla.',
    completada: false,
    creadaEn: new Date().toISOString()
  }
];

let proximoId = 2;

// GET /api/tareas
function obtenerTareas(req, res) {
  res.json(tareas);
}

// GET /api/tareas/:id
function obtenerTareaPorId(req, res) {
  const id = parseInt(req.params.id, 10);
  const tarea = tareas.find(t => t.id === id);

  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  res.json(tarea);
}

// POST /api/tareas
function crearTarea(req, res) {
  const { titulo, descripcion = '', completada = false } = req.body;

  const nuevaTarea = {
    id: proximoId++,
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    completada,
    creadaEn: new Date().toISOString()
  };

  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
}

// PUT /api/tareas/:id
function actualizarTarea(req, res) {
  const id = parseInt(req.params.id, 10);
  const indice = tareas.findIndex(t => t.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  const { titulo, descripcion, completada } = req.body;

  tareas[indice] = {
    ...tareas[indice],
    titulo: titulo.trim(),
    descripcion: (descripcion ?? tareas[indice].descripcion).trim(),
    completada: completada ?? tareas[indice].completada
  };

  res.json(tareas[indice]);
}

// PATCH /api/tareas/:id/completar  -> alternar estado completada
function alternarCompletada(req, res) {
  const id = parseInt(req.params.id, 10);
  const tarea = tareas.find(t => t.id === id);

  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tarea.completada = !tarea.completada;
  res.json(tarea);
}

// DELETE /api/tareas/:id
function eliminarTarea(req, res) {
  const id = parseInt(req.params.id, 10);
  const indice = tareas.findIndex(t => t.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  const eliminada = tareas.splice(indice, 1)[0];
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
