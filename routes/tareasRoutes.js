// routes/tareasRoutes.js
// Define los endpoints REST para /api/tareas

const express = require('express');
const router = express.Router();

const {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
  actualizarTarea,
  alternarCompletada,
  eliminarTarea
} = require('../controllers/tareasController');

const { validarTarea } = require('../middlewares/validationMiddleware');

router.get('/', obtenerTareas);
router.get('/:id', obtenerTareaPorId);
router.post('/', validarTarea, crearTarea);
router.put('/:id', validarTarea, actualizarTarea);
router.patch('/:id/completar', alternarCompletada);
router.delete('/:id', eliminarTarea);

module.exports = router;
