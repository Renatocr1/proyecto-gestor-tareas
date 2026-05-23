// data/tareasData.js
// Capa de datos: mantiene el almacén en memoria de las tareas.
// No tiene lógica de negocio ni validaciones — sólo lee y escribe en el array.
// Si en el futuro se reemplaza por una base de datos, sólo este archivo cambia.

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

function listar() {
  return tareas;
}

function obtenerPorId(id) {
  return tareas.find(t => t.id === id) || null;
}

function crear({ titulo, descripcion, completada }) {
  const nueva = {
    id: proximoId++,
    titulo,
    descripcion,
    completada,
    creadaEn: new Date().toISOString()
  };
  tareas.push(nueva);
  return nueva;
}

function actualizar(id, { titulo, descripcion, completada }) {
  const indice = tareas.findIndex(t => t.id === id);
  if (indice === -1) return null;

  tareas[indice] = {
    ...tareas[indice],
    titulo,
    descripcion,
    completada
  };
  return tareas[indice];
}

function alternarCompletada(id) {
  const tarea = tareas.find(t => t.id === id);
  if (!tarea) return null;
  tarea.completada = !tarea.completada;
  return tarea;
}

function eliminar(id) {
  const indice = tareas.findIndex(t => t.id === id);
  if (indice === -1) return null;
  return tareas.splice(indice, 1)[0];
}

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  alternarCompletada,
  eliminar
};