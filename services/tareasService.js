// services/tareasService.js
// Capa de servicios: orquesta la lógica de negocio de tareas.
// El controller la llama; ella delega la persistencia a /data/tareasData.
// Acá viven las reglas (normalización de datos, defaults),
// no la manipulación directa del almacén.

const tareasData = require('../data/tareasData');

function listarTareas() {
  return tareasData.listar();
}

function obtenerTarea(id) {
  return tareasData.obtenerPorId(id);
}

function crearTarea({ titulo, descripcion = '', completada = false }) {
  const datos = {
    titulo: titulo.trim(),
    descripcion: (descripcion || '').trim(),
    completada: Boolean(completada)
  };
  return tareasData.crear(datos);
}

function actualizarTarea(id, { titulo, descripcion, completada }) {
  const existente = tareasData.obtenerPorId(id);
  if (!existente) return null;

  const datos = {
    titulo: titulo.trim(),
    descripcion: (descripcion ?? existente.descripcion ?? '').trim(),
    completada: completada ?? existente.completada
  };
  return tareasData.actualizar(id, datos);
}

function alternarCompletada(id) {
  return tareasData.alternarCompletada(id);
}

function eliminarTarea(id) {
  return tareasData.eliminar(id);
}

module.exports = {
  listarTareas,
  obtenerTarea,
  crearTarea,
  actualizarTarea,
  alternarCompletada,
  eliminarTarea
};