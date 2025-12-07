
const API_URL = window.API_URL || 'http://localhost:3000/api';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function authFetch(url, options = {}) {
  const defaultHeaders = getAuthHeaders();
  if (options.body instanceof FormData) {
    delete defaultHeaders['Content-Type'];
  }
  options.headers = { ...defaultHeaders, ...options.headers };
  const response = await authFetch(url, options);
  if (response.status === 401) {
    const data = await response.clone().json().catch(() => ({}));
    if (data.expired || data.message?.includes('Token')) {
      localStorage.clear();
      alert('Tu sesion ha expirado. Por favor inicia sesion nuevamente.');
      window.location.href = 'classroom-login.html';
    }
  }
  return response;
}

let perfilData = null;
let userId = null;
let userType = null;


document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  userId = urlParams.get('id');
  userType = urlParams.get('tipo'); // 'alumno' o 'profesor'
  
  if (!userId || !userType) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se especificÃ³ el usuario a visualizar'
    }).then(() => {
      window.location.href = '/classroom.html';
    });
    return;
  }
  
  await cargarPerfil();
  
  lucide.createIcons();
  
  cargarTema();
});


async function cargarPerfil() {
  try {
    const response = await authFetch(`${API_URL}/classroom/perfil/${userId}?tipo=${userType}`);
    const data = await response.json();
    
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Error al cargar el perfil');
    }
    
    perfilData = data.perfil;
    mostrarDatosEnUI();
    
  } catch (error) {
    console.error('Error al cargar perfil:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo cargar el perfil del usuario'
    }).then(() => {
      window.location.href = '/classroom.html';
    });
  }
}


function mostrarDatosEnUI() {
  if (!perfilData) return;
  
  const iniciales = obtenerIniciales(perfilData.nombre, perfilData.apellido);
  const avatarContainer = document.getElementById('profileAvatar');
  const avatarInitials = document.getElementById('avatarInitials');
  
  if (perfilData.avatar) {
    const avatarUrl = perfilData.avatar.startsWith('http') 
      ? perfilData.avatar 
      : `${window.BASE_URL || 'http://localhost:3000'}${perfilData.avatar}`;
    
    if (avatarContainer) {
      avatarContainer.style.backgroundImage = `url(${avatarUrl})`;
      avatarContainer.style.backgroundSize = 'cover';
      avatarContainer.style.backgroundPosition = 'center';
    }
    if (avatarInitials) {
      avatarInitials.style.display = 'none';
    }
  } else {
    if (avatarContainer) {
      avatarContainer.style.backgroundImage = 'none';
    }
    if (avatarInitials) {
      avatarInitials.style.display = 'flex';
      avatarInitials.textContent = iniciales;
    }
  }
  
  updateElement('profileName', `${perfilData.nombre} ${perfilData.apellido}`);
  updateElement('profileRole', capitalizar(perfilData.rol));
  updateElement('profileUsername', perfilData.username);
  
  const fechaRegistro = perfilData.fecha_creacion ? new Date(perfilData.fecha_creacion).getFullYear() : '2025';
  updateElement('profileMemberSince', `Miembro desde ${fechaRegistro}`);
  
  updateElement('infoEmail', perfilData.email || 'No especificado');
  updateElement('infoTelefono', perfilData.telefono || 'No especificado');
  updateElement('infoFechaNacimiento', formatearFecha(perfilData.fecha_nacimiento) || 'No especificado');
  updateElement('infoDireccion', perfilData.direccion || 'No especificado');
  updateElement('biografiaDisplay', perfilData.biografia || 'Sin biografÃ­a');
  
  updateElement('dataNombreCompleto', `${perfilData.nombre} ${perfilData.apellido}`);
  updateElement('dataEmail', perfilData.email || 'No especificado');
  updateElement('dataTelefono', perfilData.telefono || 'No especificado');
  updateElement('dataFechaNacimiento', formatearFecha(perfilData.fecha_nacimiento) || 'No especificado');
  updateElement('dataDireccion', perfilData.direccion || 'No especificado');
  updateElement('dataBiografia', perfilData.biografia || 'Sin biografÃ­a');
  
  lucide.createIcons();
}


function cambiarSeccion(seccionId) {
  const secciones = document.querySelectorAll('.perfil-section');
  secciones.forEach(seccion => {
    seccion.classList.remove('active');
  });
  
  const seccionActual = document.getElementById(seccionId);
  if (seccionActual) {
    seccionActual.classList.add('active');
  }
  
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-section') === seccionId) {
      item.classList.add('active');
    }
  });
}


function updateElement(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function obtenerIniciales(nombre, apellido) {
  const inicialesNombre = nombre ? nombre.charAt(0).toUpperCase() : '';
  const inicialesApellido = apellido ? apellido.charAt(0).toUpperCase() : '';
  return inicialesNombre + inicialesApellido;
}

function formatearFecha(fecha) {
  if (!fecha) return null;
  const date = new Date(fecha);
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function volverAlClassroom() {
  window.location.href = '/classroom.html';
}


function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  lucide.createIcons();
}

function cargarTema() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  lucide.createIcons();
}



