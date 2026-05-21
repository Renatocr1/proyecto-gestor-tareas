// middlewares/validationMiddleware.js
// Valida los datos enviados al crear o actualizar una tarea

function validarTarea(req, res, next) {
  const { titulo, descripcion, completada } = req.body;

  // El título es obligatorio y debe ser una cadena no vacía
  if (typeof titulo !== 'string' || titulo.trim() === '') {
    return res.status(400).json({
      error: 'El campo "titulo" es obligatorio y debe ser una cadena no vacía'
    });
  }

  if (titulo.length > 100) {
    return res.status(400).json({
      error: 'El campo "titulo" no puede superar los 100 caracteres'
    });
  }

  // La descripción es opcional, pero si se envía debe ser una cadena
  if (descripcion !== undefined && typeof descripcion !== 'string') {
    return res.status(400).json({
      error: 'El campo "descripcion" debe ser una cadena de texto'
    });
  }

  // "completada" es opcional, pero si se envía debe ser booleano
  if (completada !== undefined && typeof completada !== 'boolean') {
    return res.status(400).json({
      error: 'El campo "completada" debe ser verdadero o falso'
    });
  }

  next();
}

module.exports = { validarTarea };
