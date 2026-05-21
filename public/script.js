// script.js - Lógica del frontend del gestor de tareas

const API = '/api/tareas';

// Estado de la aplicación
let tareas = [];
let filtroActivo = 'todas';
let idEnEdicion = null;

// Referencias al DOM
const form = document.getElementById('form-tarea');
const inputTitulo = document.getElementById('titulo');
const inputDescripcion = document.getElementById('descripcion');
const btnGuardar = document.getElementById('btn-guardar');
const btnCancelar = document.getElementById('btn-cancelar');
const listaTareas = document.getElementById('lista-tareas');
const mensajeVacio = document.getElementById('mensaje-vacio');
const contador = document.getElementById('contador');
const botonesFiltro = document.querySelectorAll('.filtro');
const textarea = document.getElementById('descripcion');

// Escuchamos cuando el usuario intenta enviar el formulario
document.querySelector('form').addEventListener('submit', function(event) {
  
  // .trim() elimina los espacios vacíos por delante y por detrás
  if (textarea.value.trim() === "") {
    // Evita que el formulario se envíe
    event.preventDefault(); 
    
    alert("La descripción no puede estar vacía ni contener solo espacios.");
    textarea.focus();
  }
});




// ---------- Carga inicial ----------
document.addEventListener('DOMContentLoaded', cargarTareas);

// ---------- Eventos ----------
form.addEventListener('submit', manejarSubmit);
btnCancelar.addEventListener('click', cancelarEdicion);

botonesFiltro.forEach(boton => {
  boton.addEventListener('click', () => {
    botonesFiltro.forEach(b => b.classList.remove('activo'));
    boton.classList.add('activo');
    filtroActivo = boton.dataset.filtro;
    renderizar();
  });
});

// ---------- Funciones de API ----------
async function cargarTareas() {
  try {
    const respuesta = await fetch(API);
    if (!respuesta.ok) throw new Error('Error al cargar las tareas');
    tareas = await respuesta.json();
    renderizar();
  } catch (error) {
    alert(error.message);
  }
}

async function crearTarea(datos) {
  const respuesta = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  if (!respuesta.ok) {
    const err = await respuesta.json();
    throw new Error(err.error || 'Error al crear la tarea');
  }
  return respuesta.json();
}

async function actualizarTarea(id, datos) {
  const respuesta = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  if (!respuesta.ok) {
    const err = await respuesta.json();
    throw new Error(err.error || 'Error al actualizar la tarea');
  }
  return respuesta.json();
}

async function alternarCompletada(id) {
  const respuesta = await fetch(`${API}/${id}/completar`, { method: 'PATCH' });
  if (!respuesta.ok) throw new Error('Error al actualizar la tarea');
  return respuesta.json();
}

async function eliminarTarea(id) {
  const respuesta = await fetch(`${API}/${id}`, { method: 'DELETE' });
  if (!respuesta.ok) throw new Error('Error al eliminar la tarea');
  return respuesta.json();
}

// ---------- Manejo del formulario ----------
async function manejarSubmit(evento) {
  evento.preventDefault();

  const datos = {
    titulo: inputTitulo.value.trim(),
    descripcion: inputDescripcion.value.trim(),
    completada: false
  };

  if (!datos.titulo) return;

  try {
    if (idEnEdicion !== null) {
      const tareaActual = tareas.find(t => t.id === idEnEdicion);
      datos.completada = tareaActual ? tareaActual.completada : false;
      const actualizada = await actualizarTarea(idEnEdicion, datos);
      tareas = tareas.map(t => (t.id === idEnEdicion ? actualizada : t));
      cancelarEdicion();
    } else {
      const nueva = await crearTarea(datos);
      tareas.push(nueva);
      form.reset();
    }
    renderizar();
  } catch (error) {
    alert(error.message);
  }
}

function iniciarEdicion(tarea) {
  idEnEdicion = tarea.id;
  inputTitulo.value = tarea.titulo;
  inputDescripcion.value = tarea.descripcion;
  btnGuardar.textContent = 'Guardar cambios';
  btnCancelar.classList.remove('oculto');
  inputTitulo.focus();
}

function cancelarEdicion() {
  idEnEdicion = null;
  form.reset();
  btnGuardar.textContent = 'Añadir tarea';
  btnCancelar.classList.add('oculto');
}

// ---------- Renderizado ----------
function renderizar() {
  const tareasFiltradas = filtrarTareas();

  listaTareas.innerHTML = '';

  if (tareasFiltradas.length === 0) {
    mensajeVacio.classList.remove('oculto');
  } else {
    mensajeVacio.classList.add('oculto');
    tareasFiltradas.forEach(t => listaTareas.appendChild(crearElementoTarea(t)));
  }

  const total = tareas.length;
  const pendientes = tareas.filter(t => !t.completada).length;
  contador.textContent = `${total} ${total === 1 ? 'tarea' : 'tareas'} · ${pendientes} pendientes`;
}

function filtrarTareas() {
  if (filtroActivo === 'pendientes') return tareas.filter(t => !t.completada);
  if (filtroActivo === 'completadas') return tareas.filter(t => t.completada);
  return tareas;
}

function crearElementoTarea(tarea) {
  const li = document.createElement('li');
  li.className = 'tarea' + (tarea.completada ? ' completada' : '');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'tarea-check';
  checkbox.checked = tarea.completada;
  checkbox.addEventListener('change', async () => {
    try {
      const actualizada = await alternarCompletada(tarea.id);
      tareas = tareas.map(t => (t.id === tarea.id ? actualizada : t));
      renderizar();
    } catch (error) {
      alert(error.message);
    }
  });

  const info = document.createElement('div');
  info.className = 'tarea-info';

  const titulo = document.createElement('div');
  titulo.className = 'tarea-titulo';
  titulo.textContent = tarea.titulo;
  info.appendChild(titulo);

  if (tarea.descripcion) {
    const descripcion = document.createElement('div');
    descripcion.className = 'tarea-descripcion';
    descripcion.textContent = tarea.descripcion;
    info.appendChild(descripcion);
  }

  const acciones = document.createElement('div');
  acciones.className = 'tarea-acciones';

  const btnEditar = document.createElement('button');
  btnEditar.className = 'btn-editar';
  btnEditar.title = 'Editar';
  btnEditar.textContent = 'Editar';
  btnEditar.addEventListener('click', () => iniciarEdicion(tarea));

  const btnEliminar = document.createElement('button');
  btnEliminar.className = 'btn-eliminar';
  btnEliminar.title = 'Eliminar';
  btnEliminar.textContent = 'Eliminar';
  btnEliminar.addEventListener('click', async () => {
    if (!confirm('¿Eliminar esta tarea?')) return;
    try {
      await eliminarTarea(tarea.id);
      tareas = tareas.filter(t => t.id !== tarea.id);
      if (idEnEdicion === tarea.id) cancelarEdicion();
      renderizar();
    } catch (error) {
      alert(error.message);
    }
  });

  acciones.appendChild(btnEditar);
  acciones.appendChild(btnEliminar);

  li.appendChild(checkbox);
  li.appendChild(info);
  li.appendChild(acciones);

  return li;
}
