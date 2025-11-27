
const API_URL = window.API_URL || "http://localhost:3000/api";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  const welcomeMsg = document.getElementById("welcomeMessage");
  if (welcomeMsg && localStorage.getItem("nombre")) {
    welcomeMsg.textContent = `Bienvenido, ${localStorage.getItem("nombre")} `;
  }

  if (document.body.classList.contains("admin")) initAdminDashboard();
  if (document.body.classList.contains("profesor")) initProfesorDashboard();
  if (document.body.classList.contains("alumno")) initAlumnoDashboard();
});

async function handleLogin(e) {
  e.preventDefault();
  console.log(" Iniciando proceso de login...");

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("loginMessage");

  console.log(" Usuario:", username);

  message.style.color = "gray";
  message.textContent = "Accediendo...";

  try {
    console.log(" Enviando peticiÃ³n a:", `${API_URL}/auth/login`);
    const resp = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    
    console.log(" Respuesta recibida - Status:", resp.status);
    const data = await resp.json();
    console.log(" Datos recibidos:", data);

    if (resp.ok && data.success) {
        console.log(" Login exitoso, guardando datos...");
        localStorage.setItem("rol", data.rol);
        localStorage.setItem("id_usuario", data.id_usuario);
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("username", data.username);
        if (data.id_profesor) localStorage.setItem("id_profesor", data.id_profesor);
        if (data.id_alumno) localStorage.setItem("id_alumno", data.id_alumno);
        
      message.style.color = "green";
      message.textContent = "Inicio de sesiÃ³n exitoso";

      const rol = data.rol.toLowerCase();
      console.log(" Rol detectado:", rol);
      console.log(" Redirigiendo...");
      
      if (rol === "admin" || rol === "administrador") {
        console.log("ï¸ Redirigiendo a dashboard_admin.html");
        window.location.href = "dashboard_admin.html";
      } else if (rol === "profesor") {
        console.log("ï¸ Redirigiendo a dashboard_profesor.html");
        window.location.href = "dashboard_profesor.html";
      } else if (rol === "alumno") {
        console.log("ï¸ Redirigiendo a dashboard_alumno.html");
        window.location.href = "dashboard_alumno.html";
      } else {
        console.log("ï¸ Redirigiendo a index.html");
        window.location.href = "index.html";
      }
    } else {
      console.error(" Login fallido:", data.message);
      message.style.color = "red";
      message.textContent = data.message || "Usuario o contraseÃ±a incorrectos.";
    }
  } catch (err) {
    console.error(" Error al conectar:", err);
    message.style.color = "red";
    message.textContent = "No se pudo conectar con el servidor.";
  }
}

function handleLogout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// ===== ADMIN DASHBOARD SPA ===== //

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("admin")) {
    initAdminSPA();
  }
});

function initAdminSPA() {
  const buttons = document.querySelectorAll(".sidebar-menu button");
  const mainContent = document.getElementById("mainContent");
  const loader = document.getElementById("loader");

  buttons.forEach(btn => {
    btn.addEventListener("click", async () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const section = btn.id.replace("btn", "").toLowerCase();
      await loadSection(section);
    });
  });

  loadSection("cursos");

  async function loadSection(section) {
    const chatContainer = document.getElementById('adminChatContainer');
    if (chatContainer) {
      chatContainer.style.display = 'none';
    }
    
    mainContent.classList.remove("active");
    loader.classList.remove("hidden");
    mainContent.innerHTML = "";

    try {
      let html = "";
      let endpoint = "";

      switch (section) {
        case "cursos":
          endpoint = `${API_URL}/cursos`;
            html = `<h2>Listado de Cursos</h2>`;
          break;
        case "alumnos":
          endpoint = `${API_URL}/alumnos`;
          html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <h2 style="margin: 0;">Listado de Alumnos</h2>
              <button onclick="descargarPDFAlumnos()" class="btn-primary" style="display: flex; align-items: center; gap: 8px;">
                <i data-lucide="file-down" style="width: 18px; height: 18px;"></i>
                Descargar InformaciÃ³n
              </button>
            </div>
          `;
          break;
        case "profesores":
          endpoint = `${API_URL}/profesores`;
          html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <h2 style="margin: 0;">Listado de Profesores</h2>
              <button onclick="descargarPDFProfesores()" class="btn-primary" style="display: flex; align-items: center; gap: 8px;">
                <i data-lucide="file-down" style="width: 18px; height: 18px;"></i>
                Descargar InformaciÃ³n
              </button>
            </div>
          `;
          break;
        case "administradores":
          endpoint = `${API_URL}/administradores`;
          html = `<h2>Listado de Administradores</h2>`;
          break;
        case "pagos":
          endpoint = `${API_URL}/pagos`;
          html = `<h2>Listado de Pagos</h2>`;
          break;
        case "aulas":
          endpoint = `${API_URL}/aulas`;
          html = `<h2>Listado de Aulas</h2>`;
          break;
        case "idiomas":
          endpoint = `${API_URL}/idiomas`;
          html = `<h2>Listado de Idiomas</h2>`;
          break;
        case "investigacion":
          loader.classList.add("hidden");
          mainContent.innerHTML = await renderInvestigacionSection();
          mainContent.classList.add("active");
          lucide.createIcons();
          initInvestigacionInteractivity();
          return;
        case "chatsoporte":
          loader.classList.add("hidden");
          mainContent.innerHTML = "";
          mainContent.classList.add("active");
          
          const chatContainer = document.getElementById('adminChatContainer');
          if (chatContainer) {
            chatContainer.style.display = 'block';
            adminChatManager.renderChatView();
          }
          return; // Salir antes del setTimeout normal
        case "classroom":
          window.location.href = 'classroom-login.html';
          return;
        case "ayuda":
          loader.classList.add("hidden");
          mainContent.innerHTML = renderAdminAyuda();
          mainContent.classList.add("active");
          lucide.createIcons();
          initAyudaInteractivity();
          return;
        default:
          endpoint = "";
          html = "<p>Seleccione una secciÃ³n</p>";
      }

      if (endpoint) {
        const res = await fetch(endpoint);
        const data = await res.json();

        if (section === 'pagos') {
          html += generateTable(section, data);
        } else if (section === 'aulas' || section === 'idiomas') {
          html += generateTable(section, data);
        } else if (data && data.length > 0) {
          html += generateTable(section, data);
        } else {
          html += "<p>No hay datos disponibles.</p>";
        }
      }

      setTimeout(() => {
        loader.classList.add("hidden");
        mainContent.innerHTML = html;
        if (section === 'cursos') {
          lucide.createIcons();
          
          document.querySelectorAll('.curso-card:not(.alumno-card):not(.profesor-card)').forEach(card => {
            card.addEventListener('click', () => {
              const idCurso = card.getAttribute('data-id');
              openCursoPanel(idCurso);
            });
          });
        }
        if (section === 'alumnos') {
          lucide.createIcons();
          setupAlumnoFilters();
        }
        if (section === 'profesores') {
          lucide.createIcons();
          setupProfesorFilters();
        }
        if (section === 'administradores') {
          lucide.createIcons();
          setupAdministradorFilters();
        }
        if (section === 'pagos') {
          lucide.createIcons();
          loadPagosData();
        }
        if (section === 'aulas' || section === 'idiomas') {
          lucide.createIcons();
        }
        mainContent.classList.add("active");
      }, 400);
    } catch (err) {
      console.error("Error al cargar secciÃ³n:", err);
      loader.classList.add("hidden");
      mainContent.innerHTML = "<p>Error al cargar los datos.</p>";
      mainContent.classList.add("active");
    }
  }
}

function recargarSeccionActiva() {
  const activeBtn = document.querySelector('.sidebar-menu button.active');
  if (activeBtn) {
    activeBtn.click();
  }
}

// =====================================================
// SECCIÃ“N DE AYUDA PARA ADMINISTRADOR
// =====================================================

function renderAdminAyuda() {
  return `
    <div class="ayuda-container">
      <div class="ayuda-header">
        <h2><i data-lucide="help-circle"></i> Centro de Ayuda</h2>
        <p>GuÃ­as completas para administrar el sistema CEMI</p>
        <div class="ayuda-stats">
          <div class="ayuda-stat-item">
            <div class="ayuda-stat-number">30+</div>
            <div class="ayuda-stat-label">GuÃ­as disponibles</div>
          </div>
          <div class="ayuda-stat-item">
            <div class="ayuda-stat-number">10</div>
            <div class="ayuda-stat-label">CategorÃ­as</div>
          </div>
          <div class="ayuda-stat-item">
            <div class="ayuda-stat-number">24/7</div>
            <div class="ayuda-stat-label">Acceso disponible</div>
          </div>
        </div>
      </div>

      <div class="ayuda-search-container">
        <i data-lucide="search" class="search-icon"></i>
        <input type="text" class="ayuda-search-input" id="ayudaSearchInput" placeholder="Â¿QuÃ© necesitas aprender hoy?" autocomplete="off">
        <div class="search-suggestions">
          <span class="search-suggestion" onclick="document.getElementById('ayudaSearchInput').value='curso'; document.getElementById('ayudaSearchInput').dispatchEvent(new Event('input'))">Cursos</span>
          <span class="search-suggestion" onclick="document.getElementById('ayudaSearchInput').value='alumno'; document.getElementById('ayudaSearchInput').dispatchEvent(new Event('input'))">Alumnos</span>
          <span class="search-suggestion" onclick="document.getElementById('ayudaSearchInput').value='pago'; document.getElementById('ayudaSearchInput').dispatchEvent(new Event('input'))">Pagos</span>
          <span class="search-suggestion" onclick="document.getElementById('ayudaSearchInput').value='profesor'; document.getElementById('ayudaSearchInput').dispatchEvent(new Event('input'))">Profesores</span>
        </div>
      </div>

      <div class="search-results-count" id="searchResultsCount"></div>
      <div class="no-results-message" id="noResultsMessage">
        <i data-lucide="search-x"></i>
        <h3>No se encontraron resultados</h3>
        <p>Intenta con otros tÃ©rminos de bÃºsqueda o explora las categorÃ­as</p>
      </div>

      <div class="ayuda-quick-access">
        <div class="quick-access-card" onclick="document.querySelector('[data-category=cursos] .accordion-header').click()">
          <div class="qa-icon"><i data-lucide="book-open"></i></div>
          <div class="qa-text"><h4>Gestionar Cursos</h4><span>Crear y editar</span></div>
        </div>
        <div class="quick-access-card" onclick="document.querySelector('[data-category=alumnos] .accordion-header').click()">
          <div class="qa-icon"><i data-lucide="users"></i></div>
          <div class="qa-text"><h4>Gestionar Alumnos</h4><span>Registros</span></div>
        </div>
        <div class="quick-access-card" onclick="document.querySelector('[data-category=pagos] .accordion-header').click()">
          <div class="qa-icon"><i data-lucide="credit-card"></i></div>
          <div class="qa-text"><h4>Control de Pagos</h4><span>Cuotas</span></div>
        </div>
        <div class="quick-access-card" onclick="document.querySelector('[data-category=chat] .accordion-header').click()">
          <div class="qa-icon"><i data-lucide="message-circle"></i></div>
          <div class="qa-text"><h4>Soporte</h4><span>Mensajes</span></div>
        </div>
      </div>

      <div class="ayuda-categorias" id="ayudaCategorias">
        
        <!-- Primeros Pasos -->
        <div class="ayuda-accordion" data-category="inicio">
          <div class="accordion-header">
            <div class="accordion-title">
              <div class="cat-icon"><i data-lucide="home"></i></div>
              <div class="accordion-title-text"><span>Primeros Pasos</span><small>Aprende a navegar el panel administrativo</small></div>
            </div>
            <div class="accordion-meta">
              <span class="accordion-count">2 guÃ­as</span>
              <i data-lucide="chevron-down" class="accordion-icon"></i>
            </div>
          </div>
          <div class="accordion-content">
            <div class="accordion-body">
              <div class="guia-list">
                <div class="guia-item" data-keywords="inicio bienvenida panel dashboard navegacion menu">
                  <div class="guia-icon"><i data-lucide="layout-dashboard"></i></div>
                  <div class="guia-content">
                    <h4>NavegaciÃ³n del Panel</h4>
                    <p>El menÃº lateral izquierdo te da acceso a todas las secciones: Cursos, Alumnos, Profesores, Administradores, Pagos, Aulas, Idiomas y Chat.</p>
                    <div class="guia-tags"><span class="guia-tag">BÃ¡sico</span><span class="guia-tag">NavegaciÃ³n</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="entender panel resumen funciones admin control total">
                  <div class="guia-icon"><i data-lucide="info"></i></div>
                  <div class="guia-content">
                    <h4>Funciones del Administrador</h4>
                    <p>Control total sobre: gestiÃ³n de cursos, registro de alumnos y profesores, control de pagos, configuraciÃ³n de aulas e idiomas, y soporte.</p>
                    <div class="guia-tags"><span class="guia-tag">Roles</span><span class="guia-tag">Permisos</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- GestiÃ³n de Cursos -->
        <div class="ayuda-accordion" data-category="cursos">
          <div class="accordion-header">
            <div class="accordion-title">
              <div class="cat-icon"><i data-lucide="book-open"></i></div>
              <div class="accordion-title-text"><span>GestiÃ³n de Cursos</span><small>Crear, editar y administrar cursos</small></div>
            </div>
            <div class="accordion-meta">
              <span class="accordion-count">5 guÃ­as</span>
              <i data-lucide="chevron-down" class="accordion-icon"></i>
            </div>
          </div>
          <div class="accordion-content">
            <div class="accordion-body">
              <div class="guia-list">
                <div class="guia-item" data-keywords="crear nuevo curso agregar aÃ±adir formulario">
                  <div class="guia-icon"><i data-lucide="plus-circle"></i></div>
                  <div class="guia-content">
                    <h4>Crear Nuevo Curso</h4>
                    <p>Haz clic en "Nuevo Curso", completa nombre, idioma, nivel, horario, cupo y aula. Luego podrÃ¡s asignar profesor.</p>
                    <div class="guia-tags"><span class="guia-tag">Crear</span><span class="guia-tag">Curso</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="editar modificar curso cambiar actualizar">
                  <div class="guia-icon"><i data-lucide="edit"></i></div>
                  <div class="guia-content">
                    <h4>Editar Curso</h4>
                    <p>En cada tarjeta de curso, haz clic en el Ã­cono de lÃ¡piz para modificar horario, aula, cupo y otros detalles.</p>
                    <div class="guia-tags"><span class="guia-tag">Editar</span><span class="guia-tag">Modificar</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="eliminar borrar curso quitar remover">
                  <div class="guia-icon"><i data-lucide="trash-2"></i></div>
                  <div class="guia-content">
                    <h4>Eliminar Curso</h4>
                    <p>Haz clic en papelera para eliminar. Solo puedes eliminar cursos sin alumnos inscritos.</p>
                    <div class="guia-tags"><span class="guia-tag">Eliminar</span><span class="guia-tag">Borrar</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="asignar profesor docente curso vincular">
                  <div class="guia-icon"><i data-lucide="user-check"></i></div>
                  <div class="guia-content">
                    <h4>Asignar Profesor</h4>
                    <p>Usa el botÃ³n verde para asignar o cambiar el profesor de un curso desde la lista disponible.</p>
                    <div class="guia-tags"><span class="guia-tag">Profesor</span><span class="guia-tag">Asignar</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="ver detalles curso informacion alumnos lista">
                  <div class="guia-icon"><i data-lucide="eye"></i></div>
                  <div class="guia-content">
                    <h4>Ver Detalles del Curso</h4>
                    <p>Haz clic en la tarjeta para ver informaciÃ³n completa, lista de alumnos y opciones de gestiÃ³n.</p>
                    <div class="guia-tags"><span class="guia-tag">Detalles</span><span class="guia-tag">Info</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- GestiÃ³n de Alumnos -->
        <div class="ayuda-accordion" data-category="alumnos">
          <div class="accordion-header">
            <div class="accordion-title">
              <div class="cat-icon"><i data-lucide="users"></i></div>
              <div class="accordion-title-text"><span>GestiÃ³n de Alumnos</span><small>Registro, ediciÃ³n y seguimiento</small></div>
            </div>
            <div class="accordion-meta">
              <span class="accordion-count">5 guÃ­as</span>
              <i data-lucide="chevron-down" class="accordion-icon"></i>
            </div>
          </div>
          <div class="accordion-content">
            <div class="accordion-body">
              <div class="guia-list">
                <div class="guia-item" data-keywords="registrar nuevo alumno crear agregar estudiante matricula">
                  <div class="guia-icon"><i data-lucide="user-plus"></i></div>
                  <div class="guia-content">
                    <h4>Registrar Alumno</h4>
                    <p>Haz clic en "Nuevo Alumno" y completa datos. El sistema genera legajo y credenciales automÃ¡ticamente.</p>
                    <div class="guia-tags"><span class="guia-tag">Registro</span><span class="guia-tag">Nuevo</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="editar modificar alumno informacion datos actualizar">
                  <div class="guia-icon"><i data-lucide="edit"></i></div>
                  <div class="guia-content">
                    <h4>Editar InformaciÃ³n</h4>
                    <p>Accede a la tarjeta del alumno para modificar datos personales, contacto o cursos inscritos.</p>
                    <div class="guia-tags"><span class="guia-tag">Editar</span><span class="guia-tag">Datos</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="estado alumno activo inactivo cambiar baja alta">
                  <div class="guia-icon"><i data-lucide="toggle-left"></i></div>
                  <div class="guia-content">
                    <h4>Cambiar Estado</h4>
                    <p>Marca alumnos como "Activo" o "Inactivo". Los inactivos no acceden al sistema pero sus datos se conservan.</p>
                    <div class="guia-tags"><span class="guia-tag">Estado</span><span class="guia-tag">Activo</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="descargar pdf lista alumnos exportar reporte imprimir">
                  <div class="guia-icon"><i data-lucide="file-down"></i></div>
                  <div class="guia-content">
                    <h4>Descargar PDF</h4>
                    <p>Genera PDF con lista completa de alumnos para reportes e impresiones.</p>
                    <div class="guia-tags"><span class="guia-tag">PDF</span><span class="guia-tag">Exportar</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="buscar filtrar alumno nombre legajo email encontrar">
                  <div class="guia-icon"><i data-lucide="search"></i></div>
                  <div class="guia-content">
                    <h4>Buscar y Filtrar</h4>
                    <p>Usa el buscador para encontrar alumnos por nombre, legajo o email. Filtra por estado.</p>
                    <div class="guia-tags"><span class="guia-tag">BÃºsqueda</span><span class="guia-tag">Filtros</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- GestiÃ³n de Profesores -->
        <div class="ayuda-accordion" data-category="profesores">
          <div class="accordion-header">
            <div class="accordion-title">
              <div class="cat-icon"><i data-lucide="graduation-cap"></i></div>
              <div class="accordion-title-text"><span>GestiÃ³n de Profesores</span><small>Registro y asignaciÃ³n de docentes</small></div>
            </div>
            <div class="accordion-meta">
              <span class="accordion-count">3 guÃ­as</span>
              <i data-lucide="chevron-down" class="accordion-icon"></i>
            </div>
          </div>
          <div class="accordion-content">
            <div class="accordion-body">
              <div class="guia-list">
                <div class="guia-item" data-keywords="registrar nuevo profesor crear agregar docente alta">
                  <div class="guia-icon"><i data-lucide="user-plus"></i></div>
                  <div class="guia-content">
                    <h4>Registrar Profesor</h4>
                    <p>Haz clic en "Nuevo Profesor" y completa los datos. El sistema genera las credenciales de acceso.</p>
                    <div class="guia-tags"><span class="guia-tag">Registro</span><span class="guia-tag">Docente</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="asignar curso profesor vincular multiple">
                  <div class="guia-icon"><i data-lucide="link"></i></div>
                  <div class="guia-content">
                    <h4>Asignar a Cursos</h4>
                    <p>Desde Cursos puedes asignar profesores. Un profesor puede tener mÃºltiples cursos asignados.</p>
                    <div class="guia-tags"><span class="guia-tag">Asignar</span><span class="guia-tag">Cursos</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="descargar pdf profesores exportar lista reporte">
                  <div class="guia-icon"><i data-lucide="file-down"></i></div>
                  <div class="guia-content">
                    <h4>Descargar PDF</h4>
                    <p>Genera un reporte PDF con la lista de profesores usando "Descargar InformaciÃ³n".</p>
                    <div class="guia-tags"><span class="guia-tag">PDF</span><span class="guia-tag">Exportar</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- GestiÃ³n de Administradores -->
        <div class="ayuda-accordion" data-category="admins">
          <div class="accordion-header">
            <div class="accordion-title">
              <div class="cat-icon"><i data-lucide="shield"></i></div>
              <div class="accordion-title-text"><span>GestiÃ³n de Administradores</span><small>Control de acceso administrativo</small></div>
            </div>
            <div class="accordion-meta">
              <span class="accordion-count">2 guÃ­as</span>
              <i data-lucide="chevron-down" class="accordion-icon"></i>
            </div>
          </div>
          <div class="accordion-content">
            <div class="accordion-body">
              <div class="guia-list">
                <div class="guia-item" data-keywords="crear nuevo administrador agregar admin usuario">
                  <div class="guia-icon"><i data-lucide="shield-plus"></i></div>
                  <div class="guia-content">
                    <h4>Crear Nuevo Administrador</h4>
                    <p>Agrega nuevos administradores con acceso completo al sistema. Define sus credenciales de acceso.</p>
                    <div class="guia-tags"><span class="guia-tag">Admin</span><span class="guia-tag">Crear</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="permisos acceso administrador seguridad control">
                  <div class="guia-icon"><i data-lucide="lock"></i></div>
                  <div class="guia-content">
                    <h4>Permisos de Acceso</h4>
                    <p>Todos los administradores tienen acceso completo. Gestiona con cuidado quiÃ©n tiene este rol.</p>
                    <div class="guia-tags"><span class="guia-tag">Permisos</span><span class="guia-tag">Seguridad</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- GestiÃ³n de Pagos -->
        <div class="ayuda-accordion" data-category="pagos">
          <div class="accordion-header">
            <div class="accordion-title">
              <div class="cat-icon"><i data-lucide="credit-card"></i></div>
              <div class="accordion-title-text"><span>GestiÃ³n de Pagos</span><small>Control de cuotas y comprobantes</small></div>
            </div>
            <div class="accordion-meta">
              <span class="accordion-count">3 guÃ­as</span>
              <i data-lucide="chevron-down" class="accordion-icon"></i>
            </div>
          </div>
          <div class="accordion-content">
            <div class="accordion-body">
              <div class="guia-list">
                <div class="guia-item" data-keywords="ver historial pagos lista cuotas estado consultar">
                  <div class="guia-icon"><i data-lucide="list"></i></div>
                  <div class="guia-content">
                    <h4>Ver Historial de Pagos</h4>
                    <p>Visualiza pagos con filtros por estado (pagado, pendiente, efectivo pendiente), fecha y alumno.</p>
                    <div class="guia-tags"><span class="guia-tag">Historial</span><span class="guia-tag">Filtros</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="registrar pago efectivo confirmar aprobar validar ticket">
                  <div class="guia-icon"><i data-lucide="check-circle"></i></div>
                  <div class="guia-content">
                    <h4>Confirmar Pago en Efectivo</h4>
                    <p>Cuando un alumno paga con ticket, busca el pago pendiente y confÃ­rmalo para actualizarlo.</p>
                    <div class="guia-tags"><span class="guia-tag">Confirmar</span><span class="guia-tag">Efectivo</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="archivo archivar pagos ocultar antiguos limpiar">
                  <div class="guia-icon"><i data-lucide="archive"></i></div>
                  <div class="guia-content">
                    <h4>Archivo de Pagos</h4>
                    <p>Archiva pagos antiguos para mantener la lista limpia. Se pueden consultar en la secciÃ³n de archivo.</p>
                    <div class="guia-tags"><span class="guia-tag">Archivar</span><span class="guia-tag">Organizar</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- GestiÃ³n de Aulas -->
        <div class="ayuda-accordion" data-category="aulas">
          <div class="accordion-header">
            <div class="accordion-title">
              <div class="cat-icon"><i data-lucide="door-open"></i></div>
              <div class="accordion-title-text"><span>GestiÃ³n de Aulas</span><small>Espacios fÃ­sicos del instituto</small></div>
            </div>
            <div class="accordion-meta">
              <span class="accordion-count">2 guÃ­as</span>
              <i data-lucide="chevron-down" class="accordion-icon"></i>
            </div>
          </div>
          <div class="accordion-content">
            <div class="accordion-body">
              <div class="guia-list">
                <div class="guia-item" data-keywords="crear nueva aula agregar salon espacio capacidad">
                  <div class="guia-icon"><i data-lucide="plus-circle"></i></div>
                  <div class="guia-content">
                    <h4>Crear Nueva Aula</h4>
                    <p>Define aulas con nombre/nÃºmero y capacidad. EstarÃ¡n disponibles para asignar a cursos.</p>
                    <div class="guia-tags"><span class="guia-tag">Crear</span><span class="guia-tag">Aula</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="asignar aula curso vincular espacio seleccionar">
                  <div class="guia-icon"><i data-lucide="link"></i></div>
                  <div class="guia-content">
                    <h4>Asignar a Cursos</h4>
                    <p>Al crear o editar un curso, selecciona el aula donde se dictarÃ¡.</p>
                    <div class="guia-tags"><span class="guia-tag">Asignar</span><span class="guia-tag">Vincular</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- GestiÃ³n de Idiomas -->
        <div class="ayuda-accordion" data-category="idiomas">
          <div class="accordion-header">
            <div class="accordion-title">
              <div class="cat-icon"><i data-lucide="languages"></i></div>
              <div class="accordion-title-text"><span>GestiÃ³n de Idiomas</span><small>ConfiguraciÃ³n de lenguas disponibles</small></div>
            </div>
            <div class="accordion-meta">
              <span class="accordion-count">2 guÃ­as</span>
              <i data-lucide="chevron-down" class="accordion-icon"></i>
            </div>
          </div>
          <div class="accordion-content">
            <div class="accordion-body">
              <div class="guia-list">
                <div class="guia-item" data-keywords="agregar nuevo idioma crear lengua ingles frances portugues">
                  <div class="guia-icon"><i data-lucide="plus-circle"></i></div>
                  <div class="guia-content">
                    <h4>Agregar Idiomas</h4>
                    <p>Define los idiomas que se enseÃ±an (InglÃ©s, FrancÃ©s, PortuguÃ©s, etc.). EstarÃ¡n disponibles al crear cursos.</p>
                    <div class="guia-tags"><span class="guia-tag">Idioma</span><span class="guia-tag">Agregar</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="configurar niveles idioma basico intermedio avanzado dificultad">
                  <div class="guia-icon"><i data-lucide="sliders"></i></div>
                  <div class="guia-content">
                    <h4>Configurar Niveles</h4>
                    <p>Los niveles (BÃ¡sico, Intermedio, Avanzado) clasifican el grado de dificultad de cada curso.</p>
                    <div class="guia-tags"><span class="guia-tag">Niveles</span><span class="guia-tag">Config</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Soporte -->
        <div class="ayuda-accordion" data-category="chat">
          <div class="accordion-header">
            <div class="accordion-title">
              <div class="cat-icon"><i data-lucide="message-circle"></i></div>
              <div class="accordion-title-text"><span>Chat de Soporte</span><small>AtenciÃ³n a usuarios del sistema</small></div>
            </div>
            <div class="accordion-meta">
              <span class="accordion-count">3 guÃ­as</span>
              <i data-lucide="chevron-down" class="accordion-icon"></i>
            </div>
          </div>
          <div class="accordion-content">
            <div class="accordion-body">
              <div class="guia-list">
                <div class="guia-item" data-keywords="responder mensajes chat usuarios alumnos profesores atender">
                  <div class="guia-icon"><i data-lucide="message-square"></i></div>
                  <div class="guia-content">
                    <h4>Responder Mensajes</h4>
                    <p>RecibirÃ¡s notificaciones cuando usuarios envÃ­en mensajes. Accede al chat para ver y responder.</p>
                    <div class="guia-tags"><span class="guia-tag">Mensajes</span><span class="guia-tag">Responder</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="gestionar conversaciones atender cerrar chat pendientes activas">
                  <div class="guia-icon"><i data-lucide="inbox"></i></div>
                  <div class="guia-content">
                    <h4>Gestionar Conversaciones</h4>
                    <p>Ve todas las conversaciones activas, filtra por estado y atiende mÃºltiples consultas.</p>
                    <div class="guia-tags"><span class="guia-tag">GestiÃ³n</span><span class="guia-tag">Filtros</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="notificaciones alerta badge nuevo mensaje tiempo real">
                  <div class="guia-icon"><i data-lucide="bell"></i></div>
                  <div class="guia-content">
                    <h4>Notificaciones</h4>
                    <p>El badge rojo indica mensajes sin leer. Habilita notificaciones del navegador para alertas en tiempo real.</p>
                    <div class="guia-tags"><span class="guia-tag">Alertas</span><span class="guia-tag">Badge</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ -->
        <div class="ayuda-accordion" data-category="faq">
          <div class="accordion-header">
            <div class="accordion-title">
              <div class="cat-icon"><i data-lucide="message-square-text"></i></div>
              <div class="accordion-title-text"><span>Preguntas Frecuentes</span><small>Respuestas rÃ¡pidas a dudas comunes</small></div>
            </div>
            <div class="accordion-meta">
              <span class="accordion-count">4 guÃ­as</span>
              <i data-lucide="chevron-down" class="accordion-icon"></i>
            </div>
          </div>
          <div class="accordion-content">
            <div class="accordion-body">
              <div class="guia-list">
                <div class="guia-item" data-keywords="restablecer contraseÃ±a usuario olvidÃ³ password reset clave">
                  <div class="guia-icon"><i data-lucide="key"></i></div>
                  <div class="guia-content">
                    <h4>Â¿CÃ³mo restablezco contraseÃ±a de un usuario?</h4>
                    <p>Accede al perfil del alumno o profesor y usa la opciÃ³n de restablecer. Se genera contraseÃ±a temporal.</p>
                    <div class="guia-tags"><span class="guia-tag">ContraseÃ±a</span><span class="guia-tag">Reset</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="eliminar borrar curso alumnos inscritos error no puedo">
                  <div class="guia-icon"><i data-lucide="alert-triangle"></i></div>
                  <div class="guia-content">
                    <h4>Â¿No puedo eliminar un curso?</h4>
                    <p>Cursos con alumnos inscritos no pueden eliminarse. Primero desvincular o transferir alumnos.</p>
                    <div class="guia-tags"><span class="guia-tag">Eliminar</span><span class="guia-tag">Error</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="backup respaldo datos base datos automatico railway">
                  <div class="guia-icon"><i data-lucide="database"></i></div>
                  <div class="guia-content">
                    <h4>Â¿Se hacen respaldos automÃ¡ticos?</h4>
                    <p>Railway realiza respaldos automÃ¡ticos. Para respaldos manuales, contacta al administrador tÃ©cnico.</p>
                    <div class="guia-tags"><span class="guia-tag">Backup</span><span class="guia-tag">Datos</span></div>
                  </div>
                </div>
                <div class="guia-item" data-keywords="problema error funciona mal bug reporte tecnico sistema">
                  <div class="guia-icon"><i data-lucide="bug"></i></div>
                  <div class="guia-content">
                    <h4>Â¿EncontrÃ© un error en el sistema?</h4>
                    <p>Documenta el error con capturas y pasos para reproducirlo. Contacta al equipo de desarrollo.</p>
                    <div class="guia-tags"><span class="guia-tag">Error</span><span class="guia-tag">Reporte</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="ayuda-tips">
        <h3><i data-lucide="lightbulb"></i> Tips para Administradores</h3>
        <div class="tips-list">
          <div class="tip-badge"><i data-lucide="refresh-cw"></i> Recarga la pÃ¡gina si los datos no se actualizan</div>
          <div class="tip-badge"><i data-lucide="bell"></i> Habilita notificaciones del chat para responder rÃ¡pido</div>
          <div class="tip-badge"><i data-lucide="file-down"></i> Exporta PDFs para reportes e impresiones</div>
          <div class="tip-badge"><i data-lucide="archive"></i> Archiva pagos antiguos regularmente para mantener orden</div>
        </div>
      </div>

      <div class="ayuda-footer">
        <p>Â¿No encontraste lo que buscabas? Consulta la documentaciÃ³n tÃ©cnica.</p>
        <div class="ayuda-footer-links">
          <span class="ayuda-footer-link" onclick="window.open('ayuda.html', '_blank')">
            <i data-lucide="external-link"></i> Centro de Ayuda Completo
          </span>
        </div>
      </div>
    </div>
  `;
}

function initAyudaInteractivity() {
  // Acordeones
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const accordion = header.parentElement;
      accordion.classList.toggle('open');
    });
  });

  // Buscador
  const searchInput = document.getElementById('ayudaSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      filterAyudaContent(query);
    });
  }

  // Modales de guÃ­a - hacer clic en cada guia-item
  document.querySelectorAll('.guia-item').forEach(item => {
    item.addEventListener('click', () => {
      openGuiaModal(item);
    });
  });
}

// Datos detallados para cada guÃ­a
const guiasDetalladas = {
  // NavegaciÃ³n del Panel
  'NavegaciÃ³n del Panel': {
    descripcion: 'El menÃº lateral izquierdo es tu centro de control. Desde aquÃ­ puedes acceder a todas las funcionalidades del sistema de manera organizada y eficiente.',
    pasos: [
      { titulo: 'Localiza el menÃº lateral', desc: 'El menÃº estÃ¡ ubicado en el lado izquierdo de la pantalla, siempre visible.' },
      { titulo: 'Explora las secciones', desc: 'Cada Ã­cono representa una secciÃ³n diferente del sistema.' },
      { titulo: 'Haz clic para navegar', desc: 'Un solo clic te llevarÃ¡ a la secciÃ³n seleccionada.' },
      { titulo: 'Observa los indicadores', desc: 'Los badges rojos indican notificaciones pendientes.' }
    ],
    tip: 'En dispositivos mÃ³viles, el menÃº se oculta automÃ¡ticamente. Usa el Ã­cono de menÃº para desplegarlo.'
  },
  // Funciones del Administrador
  'Funciones del Administrador': {
    descripcion: 'Como administrador tienes acceso completo a todas las funciones del sistema. Tu rol es fundamental para mantener la operaciÃ³n del instituto.',
    pasos: [
      { titulo: 'GestiÃ³n de Cursos', desc: 'Crear, editar, eliminar cursos y asignar profesores.' },
      { titulo: 'GestiÃ³n de Usuarios', desc: 'Registrar alumnos, profesores y otros administradores.' },
      { titulo: 'Control Financiero', desc: 'Supervisar pagos, confirmar efectivo y generar reportes.' },
      { titulo: 'Soporte', desc: 'Responder consultas de usuarios a travÃ©s del chat.' }
    ],
    tip: 'Realiza respaldos periÃ³dicos de informaciÃ³n importante exportando PDFs de las listas de usuarios.'
  },
  // Crear Nuevo Curso
  'Crear Nuevo Curso': {
    descripcion: 'El proceso de creaciÃ³n de cursos es simple y te permite configurar todos los aspectos necesarios para que el curso funcione correctamente.',
    pasos: [
      { titulo: 'Haz clic en "Nuevo Curso"', desc: 'El botÃ³n estÃ¡ en la esquina superior derecha de la secciÃ³n Cursos.' },
      { titulo: 'Completa el formulario', desc: 'Nombre, idioma, nivel, dÃ­as, horario y cupo mÃ¡ximo.' },
      { titulo: 'Selecciona el aula', desc: 'Elige un aula disponible de la lista.' },
      { titulo: 'Guarda los cambios', desc: 'El curso aparecerÃ¡ en la lista inmediatamente.' }
    ],
    tip: 'Puedes asignar un profesor despuÃ©s de crear el curso usando el botÃ³n de asignaciÃ³n.'
  },
  // Editar Curso
  'Editar Curso': {
    descripcion: 'Modifica cualquier aspecto de un curso existente sin afectar a los alumnos ya inscritos.',
    pasos: [
      { titulo: 'Localiza el curso', desc: 'Usa el buscador o navega por las tarjetas de cursos.' },
      { titulo: 'Haz clic en editar', desc: 'Es el Ã­cono de lÃ¡piz en la tarjeta del curso.' },
      { titulo: 'Modifica los campos', desc: 'Cambia los valores que necesites actualizar.' },
      { titulo: 'Confirma los cambios', desc: 'Haz clic en Guardar para aplicar las modificaciones.' }
    ],
    tip: 'Los cambios de horario se reflejan inmediatamente en los dashboards de profesores y alumnos.'
  },
  // Eliminar Curso
  'Eliminar Curso': {
    descripcion: 'Elimina cursos que ya no se dictan. Esta acciÃ³n requiere confirmaciÃ³n para evitar eliminaciones accidentales.',
    pasos: [
      { titulo: 'Localiza el curso', desc: 'Encuentra el curso que deseas eliminar.' },
      { titulo: 'Verifica que no tenga alumnos', desc: 'Un curso con alumnos no puede eliminarse directamente.' },
      { titulo: 'Haz clic en eliminar', desc: 'Es el Ã­cono de papelera en la tarjeta.' },
      { titulo: 'Confirma la acciÃ³n', desc: 'Acepta el diÃ¡logo de confirmaciÃ³n.' }
    ],
    tip: 'Si necesitas eliminar un curso con alumnos, primero transfiere o desvincula a los estudiantes.'
  },
  // Asignar Profesor
  'Asignar Profesor': {
    descripcion: 'Vincula un profesor a un curso para que pueda gestionar calificaciones y asistencias de ese curso.',
    pasos: [
      { titulo: 'Abre la tarjeta del curso', desc: 'Haz clic en el curso al que quieres asignar profesor.' },
      { titulo: 'Busca el botÃ³n de asignaciÃ³n', desc: 'Es el Ã­cono verde con silueta de usuario.' },
      { titulo: 'Selecciona el profesor', desc: 'Elige de la lista de profesores disponibles.' },
      { titulo: 'Confirma la asignaciÃ³n', desc: 'El profesor ya podrÃ¡ ver este curso en su panel.' }
    ],
    tip: 'Un profesor puede tener mÃºltiples cursos asignados. Verifica su carga horaria antes de asignar.'
  },
  // Ver Detalles del Curso
  'Ver Detalles del Curso': {
    descripcion: 'Accede a toda la informaciÃ³n del curso incluyendo lista de alumnos, calificaciones y estadÃ­sticas.',
    pasos: [
      { titulo: 'Haz clic en la tarjeta', desc: 'Cualquier parte de la tarjeta abre los detalles.' },
      { titulo: 'Revisa la informaciÃ³n', desc: 'VerÃ¡s horario, aula, profesor y cupo.' },
      { titulo: 'Consulta los alumnos', desc: 'La lista muestra todos los estudiantes inscritos.' },
      { titulo: 'Usa las acciones rÃ¡pidas', desc: 'Editar, eliminar o gestionar desde aquÃ­.' }
    ],
    tip: 'Desde los detalles puedes ver el progreso general del curso y estadÃ­sticas de rendimiento.'
  },
  // Registrar Alumno
  'Registrar Alumno': {
    descripcion: 'El registro de alumnos es el primer paso para incorporar estudiantes al sistema. Los datos se validan automÃ¡ticamente.',
    pasos: [
      { titulo: 'Haz clic en "Nuevo Alumno"', desc: 'BotÃ³n ubicado en la secciÃ³n Alumnos.' },
      { titulo: 'Completa los datos personales', desc: 'Nombre, apellido, DNI, email y telÃ©fono.' },
      { titulo: 'Asigna un curso inicial', desc: 'Selecciona el curso donde se inscribirÃ¡.' },
      { titulo: 'Guarda el registro', desc: 'El sistema genera legajo y credenciales automÃ¡ticamente.' }
    ],
    tip: 'Las credenciales iniciales usan el DNI como usuario y contraseÃ±a. El alumno puede cambiarlas.'
  },
  // Editar InformaciÃ³n (Alumno)
  'Editar InformaciÃ³n': {
    descripcion: 'Actualiza los datos de un alumno cuando sea necesario. Los cambios se aplican inmediatamente.',
    pasos: [
      { titulo: 'Busca al alumno', desc: 'Usa el buscador por nombre, legajo o DNI.' },
      { titulo: 'Abre su perfil', desc: 'Haz clic en la tarjeta del alumno.' },
      { titulo: 'Haz clic en editar', desc: 'Modifica los campos necesarios.' },
      { titulo: 'Guarda los cambios', desc: 'La informaciÃ³n se actualiza en todo el sistema.' }
    ],
    tip: 'El legajo y DNI solo pueden modificarse por motivos de correcciÃ³n de errores.'
  },
  // Cambiar Estado
  'Cambiar Estado': {
    descripcion: 'Gestiona el estado de los usuarios: activos pueden acceder al sistema, inactivos no.',
    pasos: [
      { titulo: 'Localiza al usuario', desc: 'Encuentra el alumno o profesor.' },
      { titulo: 'Abre las opciones', desc: 'Accede al menÃº de acciones del usuario.' },
      { titulo: 'Cambia el estado', desc: 'Selecciona Activo o Inactivo segÃºn corresponda.' },
      { titulo: 'Confirma el cambio', desc: 'El estado se actualiza inmediatamente.' }
    ],
    tip: 'Los usuarios inactivos conservan todos sus datos histÃ³ricos para futuras consultas.'
  },
  // Descargar PDF
  'Descargar PDF': {
    descripcion: 'Genera documentos PDF con listas de usuarios, Ãºtiles para reportes impresos o archivos.',
    pasos: [
      { titulo: 'Ve a la secciÃ³n deseada', desc: 'Alumnos, Profesores o Administradores.' },
      { titulo: 'Busca el botÃ³n de descarga', desc: 'Generalmente dice "Descargar InformaciÃ³n".' },
      { titulo: 'Haz clic para generar', desc: 'El PDF se crea con los datos actuales.' },
      { titulo: 'Guarda o imprime', desc: 'El archivo se descarga automÃ¡ticamente.' }
    ],
    tip: 'Los PDFs incluyen fecha de generaciÃ³n para control de versiones.'
  },
  // Buscar y Filtrar
  'Buscar y Filtrar': {
    descripcion: 'Encuentra rÃ¡pidamente usuarios o informaciÃ³n especÃ­fica usando los potentes filtros del sistema.',
    pasos: [
      { titulo: 'Localiza el buscador', desc: 'EstÃ¡ en la parte superior de cada secciÃ³n.' },
      { titulo: 'Escribe tu bÃºsqueda', desc: 'Nombre, legajo, DNI o email.' },
      { titulo: 'Revisa los resultados', desc: 'La lista se filtra en tiempo real.' },
      { titulo: 'Usa filtros adicionales', desc: 'Estado, curso u otros criterios disponibles.' }
    ],
    tip: 'La bÃºsqueda no distingue mayÃºsculas/minÃºsculas y busca coincidencias parciales.'
  },
  // Registrar Profesor
  'Registrar Profesor': {
    descripcion: 'Agrega nuevos profesores al sistema para que puedan gestionar sus cursos asignados.',
    pasos: [
      { titulo: 'Haz clic en "Nuevo Profesor"', desc: 'BotÃ³n en la secciÃ³n Profesores.' },
      { titulo: 'Ingresa los datos', desc: 'Nombre, apellido, DNI, email, telÃ©fono.' },
      { titulo: 'Define especialidad', desc: 'Idiomas o Ã¡reas que puede dictar.' },
      { titulo: 'Guarda el registro', desc: 'Se generan credenciales de acceso.' }
    ],
    tip: 'DespuÃ©s del registro, asigna cursos al profesor desde la secciÃ³n Cursos.'
  },
  // Asignar a Cursos
  'Asignar a Cursos': {
    descripcion: 'Vincula profesores con cursos para que puedan gestionar sus clases.',
    pasos: [
      { titulo: 'Ve a la secciÃ³n Cursos', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Selecciona un curso', desc: 'El curso debe existir previamente.' },
      { titulo: 'Usa el botÃ³n de asignaciÃ³n', desc: 'Ãcono de usuario en verde.' },
      { titulo: 'Elige el profesor', desc: 'Selecciona de la lista disponible.' }
    ],
    tip: 'Verifica que el profesor no tenga conflictos de horario antes de asignar.'
  },
  // Crear Nuevo Administrador
  'Crear Nuevo Administrador': {
    descripcion: 'Agrega otros administradores que compartirÃ¡n las responsabilidades de gestiÃ³n del sistema.',
    pasos: [
      { titulo: 'Ve a Administradores', desc: 'SecciÃ³n en el menÃº lateral.' },
      { titulo: 'Haz clic en "Nuevo Admin"', desc: 'Se abre el formulario de registro.' },
      { titulo: 'Completa los datos', desc: 'Nombre, email y credenciales.' },
      { titulo: 'Define permisos', desc: 'Todos los admins tienen acceso completo.' }
    ],
    tip: 'Limita el nÃºmero de administradores a los estrictamente necesarios por seguridad.'
  },
  // Permisos de Acceso
  'Permisos de Acceso': {
    descripcion: 'Comprende cÃ³mo funciona el sistema de permisos y roles en la plataforma.',
    pasos: [
      { titulo: 'Administrador', desc: 'Acceso total a todas las funciones.' },
      { titulo: 'Profesor', desc: 'GestiÃ³n de cursos asignados, notas y asistencias.' },
      { titulo: 'Alumno', desc: 'VisualizaciÃ³n de sus cursos, notas y pagos.' },
      { titulo: 'Seguridad', desc: 'Cada rol solo ve lo que le corresponde.' }
    ],
    tip: 'Revisa periÃ³dicamente los accesos y desactiva usuarios que ya no deban tener acceso.'
  },
  // Ver Historial de Pagos
  'Ver Historial de Pagos': {
    descripcion: 'Consulta todos los pagos realizados con diferentes estados y filtros disponibles.',
    pasos: [
      { titulo: 'Ve a la secciÃ³n Pagos', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Revisa la lista', desc: 'Muestra pagos ordenados por fecha.' },
      { titulo: 'Aplica filtros', desc: 'Por estado, fecha o alumno.' },
      { titulo: 'Consulta detalles', desc: 'Haz clic en un pago para mÃ¡s informaciÃ³n.' }
    ],
    tip: 'Usa los filtros de estado para encontrar rÃ¡pidamente pagos pendientes de confirmar.'
  },
  // Confirmar Pago en Efectivo
  'Confirmar Pago en Efectivo': {
    descripcion: 'Cuando un alumno paga en efectivo con su ticket, debes confirmar el pago en el sistema.',
    pasos: [
      { titulo: 'Recibe el ticket', desc: 'El alumno presenta su comprobante de pago.' },
      { titulo: 'Busca el pago', desc: 'Filtra por "Efectivo Pendiente" en Pagos.' },
      { titulo: 'Verifica el cÃ³digo', desc: 'Compara el cÃ³digo del ticket con el sistema.' },
      { titulo: 'Confirma el pago', desc: 'Haz clic en el botÃ³n de confirmaciÃ³n.' }
    ],
    tip: 'Guarda los tickets fÃ­sicos por al menos 30 dÃ­as para cualquier reclamo.'
  },
  // Archivo de Pagos
  'Archivo de Pagos': {
    descripcion: 'MantÃ©n la lista de pagos organizada archivando los pagos antiguos ya procesados.',
    pasos: [
      { titulo: 'Identifica pagos antiguos', desc: 'Pagos de meses anteriores ya confirmados.' },
      { titulo: 'Selecciona para archivar', desc: 'Usa la opciÃ³n de archivar en cada pago.' },
      { titulo: 'Confirma la acciÃ³n', desc: 'Los pagos pasan a la secciÃ³n de archivo.' },
      { titulo: 'Consulta cuando necesites', desc: 'El archivo estÃ¡ siempre disponible.' }
    ],
    tip: 'Archiva mensualmente para mantener un historial ordenado y fÃ¡cil de consultar.'
  },
  // Crear Nueva Aula
  'Crear Nueva Aula': {
    descripcion: 'Registra los espacios fÃ­sicos disponibles para dictar clases en el instituto.',
    pasos: [
      { titulo: 'Ve a la secciÃ³n Aulas', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Haz clic en "Nueva Aula"', desc: 'Se abre el formulario.' },
      { titulo: 'Ingresa los datos', desc: 'Nombre o nÃºmero y capacidad mÃ¡xima.' },
      { titulo: 'Guarda el aula', desc: 'EstarÃ¡ disponible para asignar a cursos.' }
    ],
    tip: 'La capacidad del aula debe ser igual o mayor al cupo mÃ¡ximo de los cursos que se dicten allÃ­.'
  },
  // Asignar a Cursos (Aulas)
  'Asignar a Cursos': {
    descripcion: 'Vincula aulas con cursos para definir dÃ³nde se dictarÃ¡n las clases.',
    pasos: [
      { titulo: 'Crea o edita un curso', desc: 'Desde la secciÃ³n Cursos.' },
      { titulo: 'Busca el campo Aula', desc: 'En el formulario de curso.' },
      { titulo: 'Selecciona el aula', desc: 'Elige de la lista de aulas disponibles.' },
      { titulo: 'Guarda los cambios', desc: 'El curso queda vinculado al aula.' }
    ],
    tip: 'Evita asignar la misma aula a cursos con horarios superpuestos.'
  },
  // Agregar Idiomas
  'Agregar Idiomas': {
    descripcion: 'Configura los idiomas que se enseÃ±an en el instituto para clasificar los cursos.',
    pasos: [
      { titulo: 'Ve a la secciÃ³n Idiomas', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Haz clic en "Nuevo Idioma"', desc: 'Se abre el formulario.' },
      { titulo: 'Ingresa el nombre', desc: 'InglÃ©s, FrancÃ©s, PortuguÃ©s, etc.' },
      { titulo: 'Guarda el idioma', desc: 'EstarÃ¡ disponible al crear cursos.' }
    ],
    tip: 'Usa nombres estandarizados para mantener consistencia en todo el sistema.'
  },
  // Configurar Niveles
  'Configurar Niveles': {
    descripcion: 'Los niveles clasifican la dificultad de los cursos para orientar a los alumnos.',
    pasos: [
      { titulo: 'Entiende los niveles', desc: 'BÃ¡sico, Intermedio, Avanzado son los estÃ¡ndar.' },
      { titulo: 'Asigna al crear curso', desc: 'Selecciona el nivel apropiado.' },
      { titulo: 'Considera prerrequisitos', desc: 'Algunos niveles requieren aprobar anteriores.' },
      { titulo: 'Comunica a alumnos', desc: 'Los niveles ayudan a elegir el curso correcto.' }
    ],
    tip: 'Define criterios claros para cada nivel y comunÃ­calos a profesores y alumnos.'
  },
  // Responder Mensajes
  'Responder Mensajes': {
    descripcion: 'Atiende las consultas de alumnos y profesores a travÃ©s del sistema de chat integrado.',
    pasos: [
      { titulo: 'Observa las notificaciones', desc: 'El badge rojo indica mensajes nuevos.' },
      { titulo: 'Accede al Chat Soporte', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Selecciona la conversaciÃ³n', desc: 'Haz clic en el usuario a responder.' },
      { titulo: 'Escribe y envÃ­a', desc: 'Tu respuesta llega instantÃ¡neamente.' }
    ],
    tip: 'Responde lo antes posible. Los usuarios valoran la atenciÃ³n rÃ¡pida.'
  },
  // Gestionar Conversaciones
  'Gestionar Conversaciones': {
    descripcion: 'Organiza y prioriza las consultas de usuarios para una atenciÃ³n eficiente.',
    pasos: [
      { titulo: 'Revisa la bandeja', desc: 'Todas las conversaciones aparecen listadas.' },
      { titulo: 'Filtra por estado', desc: 'Pendientes, En curso, Resueltas.' },
      { titulo: 'Prioriza urgentes', desc: 'Atiende primero consultas crÃ­ticas.' },
      { titulo: 'Cierra resueltas', desc: 'Marca como completadas las atendidas.' }
    ],
    tip: 'Crea respuestas frecuentes para agilizar la atenciÃ³n de consultas comunes.'
  },
  // Notificaciones
  'Notificaciones': {
    descripcion: 'El sistema de notificaciones te mantiene informado sobre actividad importante.',
    pasos: [
      { titulo: 'Observa los badges', desc: 'Los nÃºmeros rojos indican pendientes.' },
      { titulo: 'Habilita en navegador', desc: 'Permite notificaciones push cuando se solicite.' },
      { titulo: 'Revisa periÃ³dicamente', desc: 'Algunas notificaciones requieren acciÃ³n.' },
      { titulo: 'Atiende lo urgente', desc: 'Mensajes y pagos pendientes son prioritarios.' }
    ],
    tip: 'Las notificaciones push funcionan incluso con el navegador minimizado.'
  },
  // Â¿CÃ³mo restablezco contraseÃ±a de un usuario?
  'Â¿CÃ³mo restablezco contraseÃ±a de un usuario?': {
    descripcion: 'Cuando un usuario olvida su contraseÃ±a, puedes generar una nueva temporal.',
    pasos: [
      { titulo: 'Busca al usuario', desc: 'En la secciÃ³n correspondiente (Alumnos/Profesores).' },
      { titulo: 'Accede a su perfil', desc: 'Haz clic en la tarjeta del usuario.' },
      { titulo: 'Busca opciÃ³n de contraseÃ±a', desc: 'Generalmente en configuraciÃ³n o editar.' },
      { titulo: 'Genera nueva contraseÃ±a', desc: 'El sistema crea una temporal.' }
    ],
    tip: 'Comunica la nueva contraseÃ±a de forma segura y pide que la cambie al ingresar.'
  },
  // Â¿No puedo eliminar un curso?
  'Â¿No puedo eliminar un curso?': {
    descripcion: 'Los cursos con alumnos inscritos estÃ¡n protegidos contra eliminaciÃ³n accidental.',
    pasos: [
      { titulo: 'Verifica el motivo', desc: 'El sistema indica si hay alumnos inscritos.' },
      { titulo: 'Desvincula alumnos', desc: 'TransfiÃ©relos a otro curso o dÃ¡les de baja.' },
      { titulo: 'Intenta de nuevo', desc: 'Con el curso vacÃ­o, podrÃ¡s eliminarlo.' },
      { titulo: 'Considera alternativas', desc: 'QuizÃ¡s solo necesitas desactivar el curso.' }
    ],
    tip: 'Considera desactivar cursos en lugar de eliminarlos para conservar el historial.'
  },
  // Â¿Se hacen respaldos automÃ¡ticos?
  'Â¿Se hacen respaldos automÃ¡ticos?': {
    descripcion: 'Railway, nuestra plataforma de hosting, realiza respaldos automÃ¡ticos de la base de datos.',
    pasos: [
      { titulo: 'Respaldos automÃ¡ticos', desc: 'Railway realiza backups periÃ³dicos.' },
      { titulo: 'RecuperaciÃ³n', desc: 'Contacta al admin tÃ©cnico si necesitas restaurar.' },
      { titulo: 'Respaldos manuales', desc: 'Exporta PDFs importantes como respaldo local.' },
      { titulo: 'Buenas prÃ¡cticas', desc: 'Descarga informaciÃ³n crÃ­tica periÃ³dicamente.' }
    ],
    tip: 'Aunque hay respaldos automÃ¡ticos, mantÃ©n copias locales de informaciÃ³n sensible.'
  },
  // Â¿EncontrÃ© un error en el sistema?
  'Â¿EncontrÃ© un error en el sistema?': {
    descripcion: 'Los errores deben reportarse para que el equipo tÃ©cnico pueda solucionarlos.',
    pasos: [
      { titulo: 'Documenta el error', desc: 'Anota quÃ© estabas haciendo cuando ocurriÃ³.' },
      { titulo: 'Captura pantalla', desc: 'Si es posible, toma una captura del error.' },
      { titulo: 'Anota los pasos', desc: 'Describe cÃ³mo reproducir el problema.' },
      { titulo: 'Reporta al equipo', desc: 'EnvÃ­a la informaciÃ³n al desarrollador.' }
    ],
    tip: 'Cuanto mÃ¡s detallada sea tu descripciÃ³n, mÃ¡s rÃ¡pido podremos solucionarlo.'
  },
  // === GUÃAS PARA ALUMNOS ===
  'Entender tu Dashboard': {
    descripcion: 'Tu dashboard es tu centro de informaciÃ³n. AquÃ­ ves un resumen de todo lo importante de un vistazo.',
    pasos: [
      { titulo: 'Tarjetas de estadÃ­sticas', desc: 'Muestran cursos activos, promedio y progreso.' },
      { titulo: 'Cursos destacados', desc: 'Acceso rÃ¡pido a tus cursos principales.' },
      { titulo: 'Notificaciones', desc: 'Alertas sobre pagos, notas o mensajes.' },
      { titulo: 'Accesos directos', desc: 'Botones para las funciones mÃ¡s usadas.' }
    ],
    tip: 'Revisa tu dashboard al inicio de cada sesiÃ³n para estar al dÃ­a.'
  },
  'Ver Cursos Inscritos': {
    descripcion: 'Consulta todos los cursos donde estÃ¡s matriculado y su informaciÃ³n detallada.',
    pasos: [
      { titulo: 'Ve a Mis Cursos', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Revisa las tarjetas', desc: 'Cada curso muestra su informaciÃ³n bÃ¡sica.' },
      { titulo: 'Consulta el progreso', desc: 'La barra indica tu avance en el curso.' },
      { titulo: 'Accede a detalles', desc: 'Haz clic para ver mÃ¡s informaciÃ³n.' }
    ],
    tip: 'El color de la barra de progreso indica tu estado: verde es bueno, amarillo es alerta.'
  },
  'Detalles de un Curso': {
    descripcion: 'Accede a toda la informaciÃ³n de un curso: profesor, horario, aula y tus calificaciones.',
    pasos: [
      { titulo: 'Selecciona el curso', desc: 'Haz clic en la tarjeta del curso.' },
      { titulo: 'Ve la informaciÃ³n', desc: 'Horario, aula, profesor asignado.' },
      { titulo: 'Consulta tus notas', desc: 'Parciales y final aparecen aquÃ­.' },
      { titulo: 'Revisa tu asistencia', desc: 'Historial de asistencias del curso.' }
    ],
    tip: 'Guarda el horario en tu calendario personal para no olvidar las clases.'
  },
  'Entender el Progreso': {
    descripcion: 'La barra de progreso refleja tu rendimiento acadÃ©mico basado en tus calificaciones.',
    pasos: [
      { titulo: 'Verde (7-10)', desc: 'Excelente rendimiento, vas por buen camino.' },
      { titulo: 'Amarillo (5-6.99)', desc: 'Aprobado pero podrÃ­as mejorar.' },
      { titulo: 'Rojo (0-4.99)', desc: 'Necesitas atenciÃ³n, considera refuerzo.' },
      { titulo: 'Promedio general', desc: 'Se calcula con todas tus notas.' }
    ],
    tip: 'Habla con tu profesor si ves rojo, hay tiempo para mejorar.'
  },
  'CatÃ¡logo de Cursos': {
    descripcion: 'Explora todos los cursos disponibles en el instituto para futuras inscripciones.',
    pasos: [
      { titulo: 'Ve a Cursado', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Navega el catÃ¡logo', desc: 'Todos los cursos disponibles aparecen aquÃ­.' },
      { titulo: 'Usa filtros', desc: 'Por idioma, nivel o disponibilidad.' },
      { titulo: 'Revisa la info', desc: 'Cada tarjeta muestra horario y cupos.' }
    ],
    tip: 'Los cursos con pocos cupos se llenan rÃ¡pido, solicita inscripciÃ³n a tiempo.'
  },
  'Solicitar InscripciÃ³n': {
    descripcion: 'Pide inscribirte en nuevos cursos. Un administrador revisarÃ¡ tu solicitud.',
    pasos: [
      { titulo: 'Encuentra el curso', desc: 'Navega el catÃ¡logo de cursos.' },
      { titulo: 'Verifica requisitos', desc: 'Algunos cursos requieren nivel previo.' },
      { titulo: 'Haz clic en inscribir', desc: 'BotÃ³n "Solicitar InscripciÃ³n".' },
      { titulo: 'Espera confirmaciÃ³n', desc: 'RecibirÃ¡s respuesta por el sistema.' }
    ],
    tip: 'AsegÃºrate de no tener conflictos de horario con tus cursos actuales.'
  },
  'Verificar Disponibilidad': {
    descripcion: 'Cada curso tiene un cupo mÃ¡ximo. Verifica si hay lugar antes de solicitar inscripciÃ³n.',
    pasos: [
      { titulo: 'Busca el indicador', desc: 'Cada curso muestra cupos disponibles.' },
      { titulo: 'Interpreta los colores', desc: 'Verde hay lugar, rojo lleno.' },
      { titulo: 'Consulta alternativas', desc: 'Si estÃ¡ lleno, busca otros horarios.' },
      { titulo: 'Contacta soporte', desc: 'Para listas de espera o excepciones.' }
    ],
    tip: 'A inicio de cuatrimestre hay mÃ¡s movimiento, los cupos pueden liberarse.'
  },
  'Ver Calificaciones': {
    descripcion: 'Consulta tus notas de parciales y finales de cada curso.',
    pasos: [
      { titulo: 'Ve a Calificaciones', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Selecciona el curso', desc: 'Si tienes varios, elige uno.' },
      { titulo: 'Revisa tus notas', desc: 'Parcial 1, Parcial 2, Final.' },
      { titulo: 'Consulta el promedio', desc: 'Se calcula automÃ¡ticamente.' }
    ],
    tip: 'Las notas se actualizan cuando el profesor las carga, puede demorar unos dÃ­as.'
  },
  'Entender Promedios': {
    descripcion: 'El promedio se calcula automÃ¡ticamente basado en tus calificaciones registradas.',
    pasos: [
      { titulo: 'Promedio por curso', desc: 'Suma de notas dividido cantidad de evaluaciones.' },
      { titulo: 'Promedio general', desc: 'Incluye todos tus cursos activos.' },
      { titulo: 'Peso de evaluaciones', desc: 'Todas las evaluaciones valen igual.' },
      { titulo: 'ActualizaciÃ³n', desc: 'Se recalcula con cada nueva nota.' }
    ],
    tip: 'El promedio general es importante para becas y certificados.'
  },
  'Historial AcadÃ©mico': {
    descripcion: 'Tu historial muestra toda tu trayectoria acadÃ©mica en el instituto.',
    pasos: [
      { titulo: 'Accede al historial', desc: 'Desde la secciÃ³n Calificaciones.' },
      { titulo: 'Revisa cursos pasados', desc: 'Todos tus cursos completados.' },
      { titulo: 'Consulta notas finales', desc: 'Cada curso muestra nota de cierre.' },
      { titulo: 'Solicita certificados', desc: 'Contacta administraciÃ³n si necesitas.' }
    ],
    tip: 'El historial es tu carta de presentaciÃ³n acadÃ©mica, cuÃ­dalo.'
  },
  'Ver Estado de Pagos': {
    descripcion: 'Consulta el estado de tus cuotas: pagadas, pendientes o vencidas.',
    pasos: [
      { titulo: 'Ve a Mis Pagos', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Revisa la lista', desc: 'Cada cuota aparece con su estado.' },
      { titulo: 'Identifica pendientes', desc: 'En amarillo o rojo segÃºn urgencia.' },
      { titulo: 'Consulta vencimientos', desc: 'Fechas lÃ­mite de cada cuota.' }
    ],
    tip: 'MantÃ©n tus pagos al dÃ­a para evitar recargos e inconvenientes.'
  },
  'Realizar un Pago': {
    descripcion: 'Paga tus cuotas de forma simple eligiendo el mÃ©todo que prefieras.',
    pasos: [
      { titulo: 'Selecciona la cuota', desc: 'Elige el mes a pagar.' },
      { titulo: 'Elige mÃ©todo de pago', desc: 'Mercado Pago o Efectivo.' },
      { titulo: 'Completa el proceso', desc: 'Sigue las instrucciones segÃºn mÃ©todo.' },
      { titulo: 'Guarda el comprobante', desc: 'Siempre conserva tu recibo.' }
    ],
    tip: 'Mercado Pago se acredita al instante, efectivo requiere ir a secretarÃ­a.'
  },
  'Pago en Efectivo': {
    descripcion: 'Genera un ticket para pagar en efectivo presencialmente en secretarÃ­a.',
    pasos: [
      { titulo: 'Selecciona la cuota', desc: 'Elige el mes a pagar.' },
      { titulo: 'Elige "Efectivo"', desc: 'Como mÃ©todo de pago.' },
      { titulo: 'Descarga el ticket', desc: 'Se genera un PDF con cÃ³digo Ãºnico.' },
      { titulo: 'Presenta en secretarÃ­a', desc: 'Paga en efectivo y entrÃ©galo.' }
    ],
    tip: 'El ticket tiene fecha de vencimiento, presÃ©ntalo a tiempo.'
  },
  'Pago con Mercado Pago': {
    descripcion: 'Paga online con tarjeta o dinero en cuenta de Mercado Pago.',
    pasos: [
      { titulo: 'Selecciona la cuota', desc: 'Elige el mes a pagar.' },
      { titulo: 'Elige "Mercado Pago"', desc: 'Como mÃ©todo de pago.' },
      { titulo: 'SerÃ¡s redirigido', desc: 'A la pÃ¡gina segura de MP.' },
      { titulo: 'Completa el pago', desc: 'Con tarjeta o dinero en cuenta.' }
    ],
    tip: 'AsegÃºrate de tener fondos o tarjeta habilitada antes de iniciar.'
  },
  'Descargar Comprobantes': {
    descripcion: 'Descarga tickets y comprobantes de tus pagos para tu registro.',
    pasos: [
      { titulo: 'Ve a Mis Pagos', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Busca el pago', desc: 'Localiza el pago del que necesitas comprobante.' },
      { titulo: 'Haz clic en descargar', desc: 'Ãcono de descarga junto al pago.' },
      { titulo: 'Guarda el archivo', desc: 'Se descarga un PDF.' }
    ],
    tip: 'Guarda todos tus comprobantes en una carpeta organizada por fecha.'
  },
  'Cambiar Avatar': {
    descripcion: 'Personaliza tu perfil subiendo una foto o imagen.',
    pasos: [
      { titulo: 'Ve a Mi Perfil', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Haz clic en tu avatar', desc: 'El cÃ­rculo con tu imagen actual.' },
      { titulo: 'Selecciona archivo', desc: 'Elige una imagen de tu dispositivo.' },
      { titulo: 'Confirma el cambio', desc: 'La imagen se actualiza automÃ¡ticamente.' }
    ],
    tip: 'Usa una foto clara de tu rostro para fÃ¡cil identificaciÃ³n.'
  },
  'Actualizar Datos Personales': {
    descripcion: 'MantÃ©n tu informaciÃ³n de contacto actualizada para comunicaciones importantes.',
    pasos: [
      { titulo: 'Ve a Mi Perfil', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Haz clic en editar', desc: 'BotÃ³n para modificar datos.' },
      { titulo: 'Actualiza la informaciÃ³n', desc: 'TelÃ©fono, email de contacto.' },
      { titulo: 'Guarda los cambios', desc: 'Confirma las modificaciones.' }
    ],
    tip: 'Datos como DNI y legajo solo los puede modificar administraciÃ³n.'
  },
  'Editar InformaciÃ³n Personal': {
    descripcion: 'Actualiza tus datos de contacto para mantenernos comunicados.',
    pasos: [
      { titulo: 'Accede a tu perfil', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Localiza campos editables', desc: 'Email, telÃ©fono principalmente.' },
      { titulo: 'Modifica lo necesario', desc: 'Ingresa la informaciÃ³n correcta.' },
      { titulo: 'Guarda los cambios', desc: 'Confirma con el botÃ³n guardar.' }
    ],
    tip: 'Un email actualizado es crucial para recuperar acceso si olvidas la contraseÃ±a.'
  },
  'Acceder a Classroom': {
    descripcion: 'Conecta con Google Classroom para acceder a materiales de estudio.',
    pasos: [
      { titulo: 'Ve a Classroom', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Haz clic en acceder', desc: 'SerÃ¡s redirigido a Google.' },
      { titulo: 'Inicia sesiÃ³n', desc: 'Con tu cuenta de Google.' },
      { titulo: 'Explora los cursos', desc: 'VerÃ¡s los cursos donde estÃ¡s inscrito.' }
    ],
    tip: 'Usa la misma cuenta de Google siempre para no perder acceso.'
  },
  'Acceder a Materiales': {
    descripcion: 'Descarga materiales de estudio compartidos por tus profesores.',
    pasos: [
      { titulo: 'Ingresa a Classroom', desc: 'Conecta con tu cuenta Google.' },
      { titulo: 'Selecciona el curso', desc: 'El que te interesa revisar.' },
      { titulo: 'Busca Materiales', desc: 'SecciÃ³n de recursos del curso.' },
      { titulo: 'Descarga lo que necesites', desc: 'PDFs, documentos, presentaciones.' }
    ],
    tip: 'Descarga los materiales a tu dispositivo para estudiar sin conexiÃ³n.'
  },
  'Vincular Google Classroom': {
    descripcion: 'Conecta tu cuenta de Google para acceder a los recursos de Classroom.',
    pasos: [
      { titulo: 'Ten una cuenta Google', desc: 'Gmail o cuenta institucional.' },
      { titulo: 'Haz clic en Classroom', desc: 'Desde el menÃº del sistema.' },
      { titulo: 'Autoriza el acceso', desc: 'Google pedirÃ¡ permisos.' },
      { titulo: 'Listo', desc: 'Ya puedes acceder a los recursos.' }
    ],
    tip: 'Si tienes problemas, limpia las cookies del navegador e intenta de nuevo.'
  },
  'Contactar AdministraciÃ³n': {
    descripcion: 'Usa el chat de soporte para comunicarte directamente con el equipo administrativo.',
    pasos: [
      { titulo: 'Ve a Chat Soporte', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Escribe tu mensaje', desc: 'Describe tu consulta o problema.' },
      { titulo: 'EnvÃ­a el mensaje', desc: 'Presiona Enter o el botÃ³n enviar.' },
      { titulo: 'Espera respuesta', desc: 'Te notificarÃ¡n cuando respondan.' }
    ],
    tip: 'SÃ© claro y especÃ­fico en tu consulta para recibir mejor ayuda.'
  },
  'Notificaciones de Chat': {
    descripcion: 'Recibe alertas cuando el equipo de soporte responda a tus consultas.',
    pasos: [
      { titulo: 'Observa el badge', desc: 'NÃºmero rojo en Chat Soporte.' },
      { titulo: 'Habilita notificaciones', desc: 'Acepta cuando el navegador pregunte.' },
      { titulo: 'RecibirÃ¡s alertas', desc: 'Incluso con la pestaÃ±a cerrada.' },
      { titulo: 'Revisa mensajes nuevos', desc: 'Haz clic para ver respuestas.' }
    ],
    tip: 'Las notificaciones funcionan mejor si mantienes sesiÃ³n activa.'
  },
  'Ver Historial de Mensajes': {
    descripcion: 'Revisa conversaciones anteriores con administraciÃ³n cuando lo necesites.',
    pasos: [
      { titulo: 'Accede al chat', desc: 'Desde Chat Soporte.' },
      { titulo: 'DesplÃ¡zate hacia arriba', desc: 'Los mensajes antiguos cargan.' },
      { titulo: 'Busca lo que necesitas', desc: 'Revisa respuestas anteriores.' },
      { titulo: 'Referencia en nuevos mensajes', desc: 'Si es relevante, menciona el tema previo.' }
    ],
    tip: 'El historial se conserva indefinidamente para tu referencia.'
  },
  'Â¿OlvidÃ© mi contraseÃ±a?': {
    descripcion: 'Si olvidaste tu contraseÃ±a, hay formas de recuperar el acceso a tu cuenta.',
    pasos: [
      { titulo: 'No te preocupes', desc: 'Es un problema comÃºn con soluciÃ³n.' },
      { titulo: 'Contacta administraciÃ³n', desc: 'VÃ­a email o presencialmente.' },
      { titulo: 'Verifica tu identidad', desc: 'Con DNI o datos personales.' },
      { titulo: 'Recibe nueva contraseÃ±a', desc: 'Te darÃ¡n una temporal para cambiar.' }
    ],
    tip: 'Usa un gestor de contraseÃ±as para no olvidarlas en el futuro.'
  },
  'Â¿Mis datos estÃ¡n incorrectos?': {
    descripcion: 'Si encuentras errores en tu informaciÃ³n personal, puedes solicitar correcciÃ³n.',
    pasos: [
      { titulo: 'Identifica el error', desc: 'QuÃ© dato especÃ­fico estÃ¡ mal.' },
      { titulo: 'Contacta administraciÃ³n', desc: 'Por chat o presencialmente.' },
      { titulo: 'Proporciona informaciÃ³n correcta', desc: 'Y documentaciÃ³n si es necesario.' },
      { titulo: 'Espera la correcciÃ³n', desc: 'Los cambios se reflejan pronto.' }
    ],
    tip: 'DNI y legajo requieren documentaciÃ³n para modificarse.'
  },
  'Â¿CÃ³mo me doy de baja de un curso?': {
    descripcion: 'Si necesitas abandonar un curso, debes solicitar la baja formalmente.',
    pasos: [
      { titulo: 'EvalÃºa tu decisiÃ³n', desc: 'La baja puede afectar tu historial.' },
      { titulo: 'Contacta administraciÃ³n', desc: 'Explica tu situaciÃ³n.' },
      { titulo: 'Completa el proceso', desc: 'Puede requerir firma o confirmaciÃ³n.' },
      { titulo: 'Verifica la baja', desc: 'El curso desaparecerÃ¡ de tu lista.' }
    ],
    tip: 'Consulta sobre perÃ­odos de baja sin penalizaciÃ³n antes de decidir.'
  },
  // === GUÃAS PARA PROFESORES ===
  'Tu Primer DÃ­a': {
    descripcion: 'GuÃ­a para comenzar a usar el sistema como profesor.',
    pasos: [
      { titulo: 'Revisa tus cursos', desc: 'Ve a Mis Cursos para ver asignaciones.' },
      { titulo: 'Configura tu perfil', desc: 'Sube una foto y verifica tus datos.' },
      { titulo: 'Explora las secciones', desc: 'FamiliarÃ­zate con el menÃº.' },
      { titulo: 'Prueba las funciones', desc: 'Calificaciones y asistencias.' }
    ],
    tip: 'Si tienes dudas, el chat de soporte estÃ¡ disponible para ayudarte.'
  },
  'Ver Cursos Asignados': {
    descripcion: 'Consulta los cursos que te han sido asignados para dictar.',
    pasos: [
      { titulo: 'Ve a Mis Cursos', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Revisa las tarjetas', desc: 'Cada curso muestra informaciÃ³n clave.' },
      { titulo: 'Consulta horarios', desc: 'DÃ­as y horas de clase.' },
      { titulo: 'Ve los alumnos', desc: 'Cantidad inscrita en cada curso.' }
    ],
    tip: 'Si falta un curso que deberÃ­as tener, contacta a administraciÃ³n.'
  },
  'InformaciÃ³n del Curso': {
    descripcion: 'Accede a todos los detalles de los cursos que dictas.',
    pasos: [
      { titulo: 'Selecciona el curso', desc: 'Haz clic en la tarjeta.' },
      { titulo: 'Revisa la informaciÃ³n', desc: 'Horario, aula, nivel.' },
      { titulo: 'Consulta alumnos', desc: 'Lista completa de inscritos.' },
      { titulo: 'Ve estadÃ­sticas', desc: 'Promedio del curso y asistencia.' }
    ],
    tip: 'Descarga la lista de alumnos para pasar asistencia en papel si lo prefieres.'
  },
  'Cargar Notas': {
    descripcion: 'Ingresa las calificaciones de tus alumnos en el sistema.',
    pasos: [
      { titulo: 'Ve a Calificaciones', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Selecciona el curso', desc: 'Del desplegable de cursos.' },
      { titulo: 'Busca al alumno', desc: 'En la lista aparecen todos.' },
      { titulo: 'Ingresa las notas', desc: 'Parcial 1, Parcial 2, Final.' }
    ],
    tip: 'Guarda frecuentemente para no perder el trabajo.'
  },
  'Editar Calificaciones': {
    descripcion: 'Modifica notas ya ingresadas si es necesario hacer correcciones.',
    pasos: [
      { titulo: 'Busca la calificaciÃ³n', desc: 'En la secciÃ³n de notas del curso.' },
      { titulo: 'Haz clic en editar', desc: 'Junto a la nota a modificar.' },
      { titulo: 'Cambia el valor', desc: 'Ingresa la nota correcta.' },
      { titulo: 'Guarda el cambio', desc: 'Se recalcula el promedio.' }
    ],
    tip: 'Los cambios quedan registrados, Ãºsalos solo para correcciones legÃ­timas.'
  },
  'Ver Promedio de Alumnos': {
    descripcion: 'Consulta el rendimiento general de tus alumnos en cada curso.',
    pasos: [
      { titulo: 'Accede a Calificaciones', desc: 'Del curso correspondiente.' },
      { titulo: 'Revisa la columna promedio', desc: 'Se calcula automÃ¡ticamente.' },
      { titulo: 'Identifica tendencias', desc: 'Alumnos que necesitan apoyo.' },
      { titulo: 'Exporta si necesitas', desc: 'Para anÃ¡lisis fuera del sistema.' }
    ],
    tip: 'Los promedios bajos generalizados pueden indicar necesidad de refuerzo.'
  },
  'Tomar Asistencia': {
    descripcion: 'Registra la asistencia de tus alumnos en cada clase.',
    pasos: [
      { titulo: 'Ve a Asistencias', desc: 'Desde el menÃº lateral.' },
      { titulo: 'Selecciona curso y fecha', desc: 'La fecha actual viene por defecto.' },
      { titulo: 'Marca cada alumno', desc: 'Presente, Ausente o Tarde.' },
      { titulo: 'Se guarda automÃ¡ticamente', desc: 'No necesitas botÃ³n guardar.' }
    ],
    tip: 'Toma asistencia al inicio de clase para mayor precisiÃ³n.'
  },
  'Historial de Asistencias': {
    descripcion: 'Consulta registros de asistencia de fechas anteriores.',
    pasos: [
      { titulo: 'Ve a Asistencias', desc: 'Del curso que te interesa.' },
      { titulo: 'Cambia la fecha', desc: 'Usa el calendario para navegar.' },
      { titulo: 'Revisa el registro', desc: 'VerÃ¡s el estado de cada alumno.' },
      { titulo: 'Identifica patrones', desc: 'Alumnos con muchas ausencias.' }
    ],
    tip: 'Comunica a administraciÃ³n si un alumno tiene ausencias excesivas.'
  },
  'Â¿No veo un curso asignado?': {
    descripcion: 'Si un curso que deberÃ­as tener no aparece, puede haber un problema de asignaciÃ³n.',
    pasos: [
      { titulo: 'Verifica la asignaciÃ³n', desc: 'Confirma con administraciÃ³n.' },
      { titulo: 'Recarga la pÃ¡gina', desc: 'A veces es un problema de cachÃ©.' },
      { titulo: 'Cierra y abre sesiÃ³n', desc: 'Puede actualizar tus datos.' },
      { titulo: 'Contacta soporte', desc: 'Si el problema persiste.' }
    ],
    tip: 'Los cursos nuevos pueden demorar unos minutos en aparecer.'
  },
  'Â¿Las calificaciones no se guardan?': {
    descripcion: 'Si las notas no se guardan, puede haber un problema tÃ©cnico.',
    pasos: [
      { titulo: 'Verifica conexiÃ³n', desc: 'AsegÃºrate de tener internet.' },
      { titulo: 'Haz clic en guardar', desc: 'No solo cambies el valor, confirma.' },
      { titulo: 'Espera el mensaje', desc: 'Debe aparecer confirmaciÃ³n.' },
      { titulo: 'Recarga y verifica', desc: 'La nota debe persistir.' }
    ],
    tip: 'Si el problema continÃºa, reporta el error con capturas de pantalla.'
  }
};

function openGuiaModal(item) {
  const title = item.querySelector('h4')?.textContent || 'GuÃ­a';
  const description = item.querySelector('p')?.textContent || '';
  const iconHTML = item.querySelector('.guia-icon')?.innerHTML || '';
  const tags = item.querySelectorAll('.guia-tag');
  
  // Buscar datos detallados o usar genÃ©ricos
  const datos = guiasDetalladas[title] || {
    descripcion: description,
    pasos: [
      { titulo: 'Paso 1', desc: 'Sigue las instrucciones en pantalla.' },
      { titulo: 'Paso 2', desc: 'Completa la informaciÃ³n requerida.' },
      { titulo: 'Paso 3', desc: 'Confirma los cambios realizados.' },
      { titulo: 'Paso 4', desc: 'Verifica que todo estÃ© correcto.' }
    ],
    tip: 'Si necesitas ayuda adicional, contacta al equipo de soporte.'
  };
  
  // Generar tags HTML
  let tagsHTML = '';
  tags.forEach(tag => {
    tagsHTML += `<span class="guia-tag">${tag.textContent}</span>`;
  });
  
  // Crear el modal
  const modalHTML = `
    <div class="guia-modal-overlay active" onclick="closeGuiaModal(event)">
      <div class="guia-modal" onclick="event.stopPropagation()">
        <div class="guia-modal-header">
          <button class="guia-modal-close" onclick="closeGuiaModal()">
            <i data-lucide="x"></i>
          </button>
          <div class="guia-modal-icon">${iconHTML}</div>
          <h3>${title}</h3>
          <p>${datos.descripcion}</p>
        </div>
        <div class="guia-modal-body">
          <div class="guia-modal-section">
            <h4><i data-lucide="list-ordered"></i> Pasos a seguir</h4>
            <ul class="guia-modal-steps">
              ${datos.pasos.map((paso, i) => `
                <li>
                  <span class="step-number">${i + 1}</span>
                  <div class="step-content">
                    <strong>${paso.titulo}</strong>
                    <span>${paso.desc}</span>
                  </div>
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="guia-modal-section">
            <div class="guia-modal-tip">
              <i data-lucide="lightbulb"></i>
              <p><strong>Tip:</strong> ${datos.tip}</p>
            </div>
          </div>
        </div>
        <div class="guia-modal-footer">
          <div class="guia-modal-tags">${tagsHTML}</div>
          <button class="guia-modal-action" onclick="closeGuiaModal()">
            <i data-lucide="check"></i> Entendido
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Insertar modal en el DOM
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  lucide.createIcons();
  
  // Cerrar con Escape
  document.addEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(e) {
  if (e.key === 'Escape') {
    closeGuiaModal();
  }
}

function closeGuiaModal(event) {
  if (event && event.target !== event.currentTarget) return;
  
  const overlay = document.querySelector('.guia-modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  }
  document.removeEventListener('keydown', handleEscapeKey);
}

function filterAyudaContent(query) {
  const accordions = document.querySelectorAll('.ayuda-accordion');
  const guiaItems = document.querySelectorAll('.guia-item');
  const noResults = document.getElementById('noResultsMessage');
  const resultsCount = document.getElementById('searchResultsCount');
  let totalVisible = 0;

  if (!query) {
    // Sin bÃºsqueda: mostrar todo normal
    accordions.forEach(acc => {
      acc.classList.remove('hidden', 'open');
    });
    guiaItems.forEach(item => {
      item.classList.remove('hidden', 'highlight');
    });
    noResults.classList.remove('visible');
    resultsCount.classList.remove('visible');
    return;
  }

  // Con bÃºsqueda: filtrar
  accordions.forEach(accordion => {
    const items = accordion.querySelectorAll('.guia-item');
    let hasVisibleItems = false;

    items.forEach(item => {
      const keywords = item.dataset.keywords || '';
      const title = item.querySelector('h4')?.textContent.toLowerCase() || '';
      const desc = item.querySelector('p')?.textContent.toLowerCase() || '';
      const searchText = keywords + ' ' + title + ' ' + desc;

      if (searchText.includes(query)) {
        item.classList.remove('hidden');
        item.classList.add('highlight');
        hasVisibleItems = true;
        totalVisible++;
      } else {
        item.classList.add('hidden');
        item.classList.remove('highlight');
      }
    });

    if (hasVisibleItems) {
      accordion.classList.remove('hidden');
      accordion.classList.add('open');
    } else {
      accordion.classList.add('hidden');
    }
  });

  // Mostrar mensaje si no hay resultados
  if (totalVisible === 0) {
    noResults.classList.add('visible');
    resultsCount.classList.remove('visible');
  } else {
    noResults.classList.remove('visible');
    resultsCount.textContent = `Se encontraron ${totalVisible} resultado${totalVisible !== 1 ? 's' : ''}`;
    resultsCount.classList.add('visible');
  }
}


function generateTable(section, data) {
  switch (section) {
    case "cursos":
      return `
        <div class="cursos-header" style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 25px;">
          <button class="btn-primary" onclick="openNuevoCursoModal()">
            <i data-lucide="plus"></i>
            Nuevo Curso
          </button>
        </div>
        <div class="cursos-grid">
          ${data.map(c => {
            const cuposMax = c.cupo_maximo || 30;
            const inscritos = c.alumnos_inscritos || 0;
            const porcentaje = (inscritos / cuposMax) * 100;
            let barClass = '';
            if (porcentaje >= 90) barClass = 'danger';
            else if (porcentaje >= 70) barClass = 'warning';

            return `
            <div class="curso-card" data-id="${c.id_curso}" data-name="${c.nombre_curso}">
              <div class="curso-card-header">
                <div class="curso-icon">
                  <i data-lucide="book-open"></i>
                </div>
                <div class="curso-card-title">
                  <h3>${c.nombre_curso}</h3>
                  <div class="idioma">${c.nombre_idioma || "Sin idioma"}</div>
                  <span class="curso-badge">${c.nivel || "Nivel no especificado"}</span>
                </div>
              </div>
              
              <div class="curso-card-info">
                <div class="info-row">
                  <i data-lucide="user"></i>
                  <span>${c.profesor || "Sin profesor asignado"}</span>
                </div>
                <div class="info-row">
                  <i data-lucide="clock"></i>
                  <span>${c.horario || "Horario por definir"}</span>
                </div>
                <div class="info-row">
                  <i data-lucide="map-pin"></i>
                  <span>${c.nombre_aula || "Sin aula asignada"}</span>
                </div>
              </div>
              
              <div class="curso-card-footer">
                <div class="cupos-info">
                  <div class="cupos-text">${inscritos} / ${cuposMax} alumnos</div>
                  <div class="cupos-bar">
                    <div class="cupos-bar-fill ${barClass}" style="width: ${Math.min(porcentaje, 100)}%"></div>
                  </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <button class="btn-icon-success" onclick="event.stopPropagation(); asignarProfesorACurso(${c.id_curso}, '${c.nombre_curso}')" title="Asignar Profesor">
                    <i data-lucide="user-check"></i>
                  </button>
                  <button class="btn-icon-primary" onclick="event.stopPropagation(); openCursoPanel(${c.id_curso})" title="Ver detalles">
                    <i data-lucide="eye"></i>
                  </button>
                  <button class="btn-icon-edit" onclick="event.stopPropagation(); editarCurso(${c.id_curso})" title="Editar">
                    <i data-lucide="edit-2"></i>
                  </button>
                  <button class="btn-icon-danger" onclick="event.stopPropagation(); eliminarCurso(${c.id_curso}, '${c.nombre_curso}')" title="Eliminar">
                    <i data-lucide="trash-2"></i>
                  </button>
                </div>
              </div>
            </div>
          `}).join('')}
        </div>`;
    case "alumnos":
      return `
        <div class="alumnos-header">
          <div class="alumnos-search-filter">
            <div style="position: relative; flex: 1;">
              <i data-lucide="search" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #999; width: 18px; height: 18px;"></i>
              <input type="text" id="alumnosSearch" placeholder="Buscar por nombre, legajo o email..." style="width: 100%;">
            </div>
            <select id="alumnosEstadoFilter">
              <option value="">Todos los estados</option>
              <option value="activo">Activos</option>
              <option value="inactivo">Inactivos</option>
            </select>
            <button class="btn-primary" onclick="openNuevoAlumnoModal()">
              <i data-lucide="user-plus"></i>
              Nuevo Alumno
            </button>
          </div>
        </div>
        <div class="cursos-grid" id="alumnosGrid">
          ${data.map(a => {
            const estado = a.estado || 'activo';
            const cursos = a.cursos_inscritos || 0;
            const iniciales = `${a.nombre.charAt(0)}${a.apellido.charAt(0)}`.toUpperCase();
            const avatarUrl = a.avatar ? a.avatar : null;
            
            return `
            <div class="curso-card alumno-card" data-id="${a.id_alumno}">
              <div class="curso-card-header">
                <div class="curso-icon ${avatarUrl ? 'has-avatar' : ''}" style="${avatarUrl ? '' : 'background: linear-gradient(135deg, #1976d2, #42a5f5);'}">
                  ${avatarUrl 
                    ? `<img src="${avatarUrl}" alt="${a.nombre}">`
                    : `<span style="font-size: 18px; font-weight: 700; color: white;">${iniciales}</span>`
                  }
                </div>
                <div class="curso-card-title">
                  <h3>${a.nombre} ${a.apellido}</h3>
                  <div class="idioma">Legajo: ${a.legajo}</div>
                  <span class="alumno-estado-badge ${estado}">${estado.charAt(0).toUpperCase() + estado.slice(1)}</span>
                </div>
              </div>
              
              <div class="curso-card-info">
                <div class="info-row">
                  <i data-lucide="mail"></i>
                  <span>${a.mail}</span>
                </div>
                ${a.dni ? `
                <div class="info-row">
                  <i data-lucide="credit-card"></i>
                  <span>DNI: ${a.dni}</span>
                </div>` : ''}
                ${a.telefono ? `
                <div class="info-row">
                  <i data-lucide="phone"></i>
                  <span>${a.telefono}</span>
                </div>` : ''}
                <div class="info-row">
                  <i data-lucide="calendar"></i>
                  <span>Registro: ${a.fecha_registro ? new Date(a.fecha_registro).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
              
              <div class="curso-card-footer" style="justify-content: space-between;">
                <span class="cursos-badge">
                  <i data-lucide="book-open" style="width: 14px; height: 14px;"></i>
                  ${cursos} ${cursos === 1 ? 'curso' : 'cursos'}
                </span>
                <div style="display: flex; gap: 8px;">
                  <button class="btn-icon-docs" onclick="event.stopPropagation(); openDocumentosModal(${a.id_alumno}, '${a.nombre} ${a.apellido}')" title="Generar documentos">
                    <i data-lucide="file-text"></i>
                  </button>
                  <button class="btn-icon-primary" onclick="event.stopPropagation(); openAlumnoPanel(${a.id_alumno})" title="Ver detalles">
                    <i data-lucide="eye"></i>
                  </button>
                  <button class="btn-icon-edit" onclick="event.stopPropagation(); editarAlumno(${a.id_alumno})" title="Editar">
                    <i data-lucide="edit-2"></i>
                  </button>
                  <button class="btn-icon-danger" onclick="event.stopPropagation(); eliminarAlumno(${a.id_alumno}, '${a.nombre} ${a.apellido}')" title="Eliminar">
                    <i data-lucide="trash-2"></i>
                  </button>
                </div>
              </div>
            </div>
          `}).join('')}
        </div>`;

    case "profesores":
      return `
        <div class="profesores-header">
          <div class="profesores-search-filter">
            <div style="position: relative; flex: 1;">
              <i data-lucide="search" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #999; width: 18px; height: 18px;"></i>
              <input type="text" id="profesoresSearch" placeholder="Buscar por nombre, especialidad o idioma..." style="width: 100%;">
            </div>
            <select id="profesoresEstadoFilter">
              <option value="">Todos los estados</option>
              <option value="activo">Activos</option>
              <option value="inactivo">Inactivos</option>
              <option value="licencia">En Licencia</option>
            </select>
            <select id="profesoresIdiomaFilter">
              <option value="">Todos los idiomas</option>
            </select>
            <button class="btn-primary" onclick="openNuevoProfesorModal()">
              <i data-lucide="user-plus"></i>
              Nuevo Profesor
            </button>
          </div>
        </div>
        <div class="cursos-grid" id="profesoresGrid">
          ${data.map(p => {
            const estado = p.estado || 'activo';
            const cursos = p.total_cursos || 0;
            const iniciales = `${p.nombre.charAt(0)}${p.apellido.charAt(0)}`.toUpperCase();
            const idiomas = p.idiomas || 'Sin idiomas';
            const avatarUrl = p.avatar ? p.avatar : null;
            
            return `
            <div class="curso-card profesor-card" data-id="${p.id_profesor}" data-idioma="${idiomas}">
              <div class="curso-card-header">
                <div class="curso-icon ${avatarUrl ? 'has-avatar' : ''}" style="${avatarUrl ? '' : 'background: linear-gradient(135deg, #6a1b9a, #8e24aa);'}">
                  ${avatarUrl 
                    ? `<img src="${avatarUrl}" alt="${p.nombre}">`
                    : `<span style="font-size: 18px; font-weight: 700; color: white;">${iniciales}</span>`
                  }
                </div>
                <div class="curso-card-title">
                  <h3>${p.nombre} ${p.apellido}</h3>
                  <div class="idioma">${p.especialidad || 'Sin especialidad'}</div>
                  <span class="profesor-estado-badge ${estado}">${estado.charAt(0).toUpperCase() + estado.slice(1)}</span>
                </div>
              </div>
              
              <div class="curso-card-info">
                <div class="info-row">
                  <i data-lucide="mail"></i>
                  <span>${p.mail}</span>
                </div>
                ${p.dni ? `
                <div class="info-row">
                  <i data-lucide="credit-card"></i>
                  <span>DNI: ${p.dni}</span>
                </div>` : ''}
                ${p.telefono ? `
                <div class="info-row">
                  <i data-lucide="phone"></i>
                  <span>${p.telefono}</span>
                </div>` : ''}
                <div class="info-row">
                  <i data-lucide="languages"></i>
                  <span>${idiomas}</span>
                </div>
              </div>
              
              <div class="curso-card-footer" style="justify-content: space-between;">
                <span class="cursos-badge">
                  <i data-lucide="book-open" style="width: 14px; height: 14px;"></i>
                  ${cursos} ${cursos === 1 ? 'curso' : 'cursos'}
                </span>
                <div style="display: flex; gap: 8px;">
                  <button class="btn-icon-primary" onclick="event.stopPropagation(); openProfesorPanel(${p.id_profesor})" title="Ver detalles">
                    <i data-lucide="eye"></i>
                  </button>
                  <button class="btn-icon-edit" onclick="event.stopPropagation(); editarProfesor(${p.id_profesor})" title="Editar">
                    <i data-lucide="edit-2"></i>
                  </button>
                  <button class="btn-icon-danger" onclick="event.stopPropagation(); eliminarProfesor(${p.id_profesor}, '${p.nombre} ${p.apellido}')" title="Eliminar">
                    <i data-lucide="trash-2"></i>
                  </button>
                </div>
              </div>
            </div>
          `}).join('')}
        </div>`;

    case "administradores":
      return `
        <div class="profesores-header">
          <div class="profesores-search-filter">
            <div style="position: relative; flex: 1;">
              <i data-lucide="search" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #999; width: 18px; height: 18px;"></i>
              <input type="text" id="administradoresSearch" placeholder="Buscar por nombre, email o DNI..." style="width: 100%;">
            </div>
            <button class="btn-primary" onclick="openNuevoAdministradorModal()">
              <i data-lucide="user-plus"></i>
              Nuevo Administrador
            </button>
          </div>
        </div>
        <div class="cursos-grid" id="administradoresGrid">
          ${data.map(admin => {
            const iniciales = `${admin.nombre.charAt(0)}${admin.apellido.charAt(0)}`.toUpperCase();
            const estado = admin.estado || 'activo';
            const avatarUrl = admin.avatar ? admin.avatar : null;
            
            return `
            <div class="curso-card profesor-card" data-id="${admin.id_persona}">
              <div class="curso-card-header">
                <div class="curso-icon ${avatarUrl ? 'has-avatar' : ''}" style="${avatarUrl ? '' : 'background: linear-gradient(135deg, #1e3a8a, #3b82f6);'}">
                  ${avatarUrl 
                    ? `<img src="${avatarUrl}" alt="${admin.nombre}">`
                    : `<span style="font-size: 18px; font-weight: 700; color: white;">${iniciales}</span>`
                  }
                </div>
                <div class="curso-card-title">
                  <h3>${admin.nombre} ${admin.apellido}</h3>
                  <div class="idioma">Administrador</div>
                  <span class="profesor-estado-badge ${estado}">${estado === 'activo' ? 'Activo' : 'Sin acceso'}</span>
                </div>
              </div>
              
              <div class="curso-card-info">
                <div class="info-row">
                  <i data-lucide="mail"></i>
                  <span>${admin.mail}</span>
                </div>
                ${admin.telefono ? `
                <div class="info-row">
                  <i data-lucide="phone"></i>
                  <span>${admin.telefono}</span>
                </div>` : ''}
                ${admin.dni ? `
                <div class="info-row">
                  <i data-lucide="credit-card"></i>
                  <span>DNI: ${admin.dni}</span>
                </div>` : ''}
                <div class="info-row">
                  <i data-lucide="user"></i>
                  <span>@${admin.username || 'Sin usuario'}</span>
                </div>
              </div>
              
              <div class="curso-card-footer" style="justify-content: flex-end;">
                <div style="display: flex; gap: 8px;">
                  <button class="btn-icon-edit" onclick="event.stopPropagation(); editarAdministrador(${admin.id_persona})" title="Editar">
                    <i data-lucide="edit-2"></i>
                  </button>
                  <button class="btn-icon-warning" onclick="event.stopPropagation(); abrirModalCredencialesAdministrador(${admin.id_persona})" title="Editar Credenciales">
                    <i data-lucide="key"></i>
                  </button>
                  <button class="btn-icon-danger" onclick="event.stopPropagation(); eliminarAdministrador(${admin.id_persona}, '${admin.nombre} ${admin.apellido}')" title="Eliminar">
                    <i data-lucide="trash-2"></i>
                  </button>
                </div>
              </div>
            </div>
          `}).join('')}
        </div>`;

case "pagos":
  return `
    <div class="pagos-tabs" style="display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 2px solid #e5e7eb;">
      <button class="pagos-tab active" data-tab="activos" onclick="switchPagosTab('activos')" style="padding: 12px 24px; background: none; border: none; border-bottom: 3px solid #667eea; color: #667eea; font-weight: 600; cursor: pointer; transition: all 0.3s;">
        <i data-lucide="list"></i> Pagos Activos
      </button>
      <button class="pagos-tab" data-tab="archivo" onclick="switchPagosTab('archivo')" style="padding: 12px 24px; background: none; border: none; border-bottom: 3px solid transparent; color: #666; font-weight: 600; cursor: pointer; transition: all 0.3s;">
        <i data-lucide="archive"></i> Archivo
      </button>
      <button class="pagos-tab" data-tab="cuotas" onclick="switchPagosTab('cuotas')" style="padding: 12px 24px; background: none; border: none; border-bottom: 3px solid transparent; color: #666; font-weight: 600; cursor: pointer; transition: all 0.3s;">
        <i data-lucide="unlock"></i> Gestionar Cuotas
      </button>
    </div>

    <div class="pagos-metrics" id="pagosMetrics">
      <div class="metric-card">
        <div class="metric-card-header">
          <div class="metric-card-title">Total Recaudado (Mes)</div>
          <div class="metric-card-icon success">
            <i data-lucide="dollar-sign"></i>
          </div>
        </div>
        <div class="metric-card-value">$<span id="metricTotalMes">0</span></div>
        <div class="metric-card-subtitle">Noviembre 2025</div>
      </div>

      <div class="metric-card">
        <div class="metric-card-header">
          <div class="metric-card-title">Cuotas Cobradas</div>
          <div class="metric-card-icon info">
            <i data-lucide="check-circle"></i>
          </div>
        </div>
        <div class="metric-card-value" id="metricCobradas">0</div>
        <div class="metric-card-subtitle"><span id="metricPendientes">0</span> pendientes</div>
      </div>

      <div class="metric-card">
        <div class="metric-card-header">
          <div class="metric-card-title">Promedio por Pago</div>
          <div class="metric-card-icon warning">
            <i data-lucide="trending-up"></i>
          </div>
        </div>
        <div class="metric-card-value">$<span id="metricPromedio">0</span></div>
        <div class="metric-card-subtitle">HistÃ³rico</div>
      </div>
    </div>

    <div class="pagos-filters" id="pagosFilters">
      <div class="filter-group">
        <label>Buscar alumno</label>
        <input type="text" id="pagoSearchAlumno" placeholder="Nombre, legajo o email...">
      </div>
      <div class="filter-group">
        <label>Medio de Pago</label>
        <select id="pagoFilterMedio">
          <option value="">Todos</option>
        </select>
      </div>
      <div>
        <button class="btn-add-pago" onclick="openRegistrarPagoModal()">
          <i data-lucide="plus"></i>
          Registrar Pago
        </button>
      </div>
    </div>

    <div class="pagos-table-container" id="pagosTableContainer">
      <table class="pagos-table">
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Concepto</th>
            <th>Periodo</th>
            <th>Monto</th>
            <th>Fecha Pago</th>
            <th>Medio</th>
            <th>Estado</th>
            <th style="width: 80px; text-align: center;">Acciones</th>
          </tr>
        </thead>
        <tbody id="pagosTableBody">
          <tr><td colspan="8" style="text-align: center; padding: 40px; color: #999;">Cargando pagos...</td></tr>
        </tbody>
      </table>
    </div>

    <div class="cuotas-gestion-container" id="cuotasGestionContainer" style="display: none;">
      <!-- Contenedor para la gestiÃ³n de cuotas -->
    </div>
  `;
  
    case "inscripciones":
      return `
        <div class="inscripciones-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
          <div></div>
          <button class="btn-primary" onclick="openNuevaInscripcionModal()">
            <i data-lucide="user-plus"></i>
            Nueva InscripciÃ³n
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Alumno</th>
              <th>Curso</th>
              <th>Fecha InscripciÃ³n</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${data.length > 0 ? data.map(i => `
              <tr>
                <td>${i.id_inscripcion}</td>
                <td>${i.alumno}</td>
                <td>${i.nombre_curso}</td>
                <td>${new Date(i.fecha_inscripcion).toLocaleDateString()}</td>
                <td><span class="badge ${i.estado === 'activo' ? 'success' : 'inactive'}">${i.estado}</span></td>
                <td>
                  <button class="btn-icon-danger" onclick="eliminarInscripcion(${i.id_inscripcion}, '${i.alumno}', '${i.nombre_curso}')" title="Eliminar">
                    <i data-lucide="trash-2"></i>
                  </button>
                </td>
              </tr>
            `).join('') : '<tr><td colspan="6" style="text-align: center; padding: 40px;">No hay inscripciones registradas</td></tr>'}
          </tbody>
        </table>
      `;
    
    case "aulas":
      return `
        <div class="aulas-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
          <div>
            <h2 style="color: #1e3c72; margin: 0 0 5px 0;">GestiÃ³n de Aulas</h2>
            <p style="color: #666; margin: 0; font-size: 14px;">${data.length} aula${data.length !== 1 ? 's' : ''} disponible${data.length !== 1 ? 's' : ''}</p>
          </div>
          <button class="btn-primary" onclick="openNuevaAulaModal()">
            <i data-lucide="plus"></i>
            Nueva Aula
          </button>
        </div>
        <div class="aulas-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
          ${data.length > 0 ? data.map(a => {
            const capacidadColor = a.capacidad >= 40 ? '#2e7d32' : a.capacidad >= 25 ? '#ed6c02' : '#1976d2';
            const capacidadIcon = a.capacidad >= 40 ? 'users' : a.capacidad >= 25 ? 'user-check' : 'user';
            
            return `
            <div class="aula-card" style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.3s ease; border-left: 4px solid ${capacidadColor};" onmouseenter="this.style.boxShadow='0 4px 16px rgba(0,0,0,0.15)'; this.style.transform='translateY(-2px)';" onmouseleave="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'; this.style.transform='translateY(0)';">
              <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <div style="width: 50px; height: 50px; border-radius: 10px; background: linear-gradient(135deg, ${capacidadColor}20, ${capacidadColor}40); display: flex; align-items: center; justify-content: center;">
                  <i data-lucide="door-open" style="width: 24px; height: 24px; color: ${capacidadColor};"></i>
                </div>
                <div style="flex: 1;">
                  <h3 style="margin: 0 0 5px 0; color: #1e3c72; font-size: 18px;">${a.nombre_aula}</h3>
                  <p style="margin: 0; color: #666; font-size: 13px;">Aula ${a.id_aula}</p>
                </div>
              </div>
              
              <div style="background: #f8f9fa; border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div style="width: 35px; height: 35px; border-radius: 8px; background: ${capacidadColor}20; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="${capacidadIcon}" style="width: 18px; height: 18px; color: ${capacidadColor};"></i>
                  </div>
                  <div>
                    <div style="font-size: 24px; font-weight: 700; color: ${capacidadColor};">${a.capacidad}</div>
                    <div style="font-size: 12px; color: #666;">Capacidad mÃ¡xima</div>
                  </div>
                </div>
              </div>
              
              <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn-icon-edit" onclick="editarAula(${a.id_aula}, '${a.nombre_aula}', ${a.capacidad})" title="Editar">
                  <i data-lucide="edit-2"></i>
                </button>
                <button class="btn-icon-danger" onclick="eliminarAula(${a.id_aula}, '${a.nombre_aula}')" title="Eliminar">
                  <i data-lucide="trash-2"></i>
                </button>
              </div>
            </div>
          `}).join('') : '<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"><i data-lucide="inbox" style="width: 48px; height: 48px; color: #ccc; margin-bottom: 15px;"></i><p style="color: #999; font-size: 16px;">No hay aulas registradas</p><p style="color: #ccc; font-size: 14px;">Comienza agregando una nueva aula</p></div>'}
        </div>
      `;
    
    case "idiomas":
      const idiomasStats = {
        total: data.length,
        populares: ['InglÃ©s', 'FrancÃ©s', 'AlemÃ¡n', 'Italiano', 'PortuguÃ©s']
      };
      
      return `
        <div class="idiomas-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
          <div>
            <h2 style="color: #1e3c72; margin: 0 0 5px 0;">GestiÃ³n de Idiomas</h2>
            <p style="color: #666; margin: 0; font-size: 14px;">${data.length} idioma${data.length !== 1 ? 's' : ''} disponible${data.length !== 1 ? 's' : ''}</p>
          </div>
          <button class="btn-primary" onclick="openNuevoIdiomaModal()">
            <i data-lucide="plus"></i>
            Nuevo Idioma
          </button>
        </div>
        <div class="idiomas-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
          ${data.length > 0 ? data.map((idioma, index) => {
            const colors = [
              { bg: '#1976d2', light: '#42a5f5', icon: 'globe-2' },
              { bg: '#7b1fa2', light: '#ba68c8', icon: 'book-open' },
              { bg: '#0097a7', light: '#4dd0e1', icon: 'message-circle' },
              { bg: '#d84315', light: '#ff7043', icon: 'volume-2' },
              { bg: '#388e3c', light: '#66bb6a', icon: 'award' },
              { bg: '#f57c00', light: '#ffb74d', icon: 'flag' }
            ];
            const colorScheme = colors[index % colors.length];
            const isPopular = idiomasStats.populares.includes(idioma.nombre_idioma);
            
            return `
            <div class="idioma-card" style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.3s ease; position: relative; overflow: hidden;" onmouseenter="this.style.boxShadow='0 4px 16px rgba(0,0,0,0.15)'; this.style.transform='translateY(-2px)';" onmouseleave="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'; this.style.transform='translateY(0)';">
              ${isPopular ? '<div style="position: absolute; top: 10px; right: 10px; background: linear-gradient(135deg, #ffd700, #ffed4e); color: #f57c00; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 12px; display: flex; align-items: center; gap: 4px;"><i data-lucide="star" style="width: 12px; height: 12px;"></i> Popular</div>' : ''}
              
              <div style="background: linear-gradient(135deg, ${colorScheme.bg}, ${colorScheme.light}); border-radius: 10px; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                <i data-lucide="${colorScheme.icon}" style="width: 30px; height: 30px; color: white;"></i>
              </div>
              
              <h3 style="margin: 0 0 8px 0; color: #1e3c72; font-size: 20px; font-weight: 600;">${idioma.nombre_idioma}</h3>
              <p style="margin: 0 0 15px 0; color: #999; font-size: 13px;">ID: ${idioma.id_idioma}</p>
              
              <div style="height: 1px; background: #e0e0e0; margin: 15px 0;"></div>
              
              <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn-icon-edit" onclick="editarIdioma(${idioma.id_idioma}, '${idioma.nombre_idioma}')" title="Editar">
                  <i data-lucide="edit-2"></i>
                </button>
                <button class="btn-icon-danger" onclick="eliminarIdioma(${idioma.id_idioma}, '${idioma.nombre_idioma}')" title="Eliminar">
                  <i data-lucide="trash-2"></i>
                </button>
              </div>
            </div>
          `}).join('') : '<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"><i data-lucide="languages" style="width: 48px; height: 48px; color: #ccc; margin-bottom: 15px;"></i><p style="color: #999; font-size: 16px;">No hay idiomas registrados</p><p style="color: #ccc; font-size: 14px;">Comienza agregando un nuevo idioma</p></div>'}
        </div>
      `;
      
    default:
      return "<p>SecciÃ³n no disponible.</p>";
  }
}

// ===== DASHBOARD HOME ===== //
async function generateDashboardHome() {
  try {
    const [statsRes, registrosRes, pagosRes] = await Promise.all([
      fetch(`${API_URL}/stats/general`),
      fetch(`${API_URL}/stats/ultimos-registros`),
      fetch(`${API_URL}/stats/ultimos-pagos`)
    ]);

    const stats = await statsRes.json();
    const registros = await registrosRes.json();
    const pagos = await pagosRes.json();

    return `
      <h2 style="margin-bottom: 30px;">Dashboard Administrativo</h2>
      
      <!-- Cards de EstadÃ­sticas -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-icon blue">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div class="stat-info">
              <h3>Total Alumnos</h3>
              <p class="stat-number">${stats.totalAlumnos}</p>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-icon purple">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            </div>
            <div class="stat-info">
              <h3>Total Profesores</h3>
              <p class="stat-number">${stats.totalProfesores}</p>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-icon green">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </div>
            <div class="stat-info">
              <h3>Total Cursos</h3>
              <p class="stat-number">${stats.totalCursos}</p>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-icon orange">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div class="stat-info">
              <h3>Ingresos del Mes</h3>
              <p class="stat-number">$${stats.ingresosMes.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tablas de resumen -->
      <div class="dashboard-tables">
        <!-- Ãšltimos Registros -->
        <div class="dashboard-table-card">
          <h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>
            Ãšltimos Registros
          </h3>
          ${registros.length > 0 ? `
            <table class="mini-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                ${registros.map(r => `
                  <tr>
                    <td>${r.nombre} ${r.apellido}</td>
                    <td><span class="badge-tipo ${r.tipo.toLowerCase()}">${r.tipo}</span></td>
                    <td>${new Date(r.fecha).toLocaleDateString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : '<div class="empty-state">No hay registros recientes</div>'}
        </div>

        <!-- Ãšltimos Pagos -->
        <div class="dashboard-table-card">
          <h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            Ãšltimos Pagos
          </h3>
          ${pagos.length > 0 ? `
            <table class="mini-table">
              <thead>
                <tr>
                  <th>Alumno</th>
                  <th>Monto</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                ${pagos.map(p => `
                  <tr>
                    <td>${p.alumno}</td>
                    <td>$${parseFloat(p.monto).toLocaleString()}</td>
                    <td><span class="badge ${p.estado === 'pagado' ? 'success' : 'warning'}">${p.estado}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : '<div class="empty-state">No hay pagos recientes</div>'}
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error al cargar dashboard:', error);
    return '<p>Error al cargar el dashboard</p>';
  }
}

function ensureInscribirModal() {
  if (document.getElementById('modalInscribir')) return;

  const modalHtml = `
    <div id="modalInscribir" class="modal">
      <div class="modal-content" style="max-width: 900px; max-height: 90vh;">
        <div class="modal-header">
          <h3 id="modalInscribirTitle">GestiÃ³n de Alumnos</h3>
          <button type="button" class="close-modal" aria-label="Cerrar">&times;</button>
        </div>
        
        <div class="tabs-container">
          <button class="tab-btn active" data-tab="inscritos">
            <i data-lucide="users"></i>
            Alumnos Inscritos
            <span class="tab-badge" id="badgeInscritos">0</span>
          </button>
          <button class="tab-btn" data-tab="inscribir">
            <i data-lucide="user-plus"></i>
            Inscribir Nuevos
            <span class="tab-badge" id="badgeDisponibles">0</span>
          </button>
        </div>
        
        <div class="tab-content active" id="tabInscritos">
          <div id="alumnosInscritosList"></div>
        </div>
        
        <div class="tab-content" id="tabInscribir">
          <div class="search-box-wrapper">
            <i data-lucide="search" class="search-icon"></i>
            <input type="text" id="searchAlumnos" placeholder="Buscar por nombre, apellido o email..." class="search-input-with-icon">
          </div>
          <div id="alumnosDisponiblesList"></div>
        </div>
        
        <div class="modal-footer-actions" id="footerInscribir" style="display: none;">
          <span class="selected-count" id="selectedCount">0 alumnos seleccionados</span>
          <button type="button" id="btnConfirmInscribir" class="btn-primary">
            <i data-lucide="check"></i> Inscribir Seleccionados
          </button>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('modalInscribir');

  modal.querySelectorAll('.close-modal').forEach(btn => btn.addEventListener('click', () => {
    modal.classList.remove('active');
    recargarSeccionActiva();
  }));
  modal.addEventListener('click', e => { 
    if (e.target === modal) {
      modal.classList.remove('active');
      recargarSeccionActiva();
    }
  });

  modal.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      
      modal.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      modal.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(`tab${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`).classList.add('active');
      
      document.getElementById('footerInscribir').style.display = tabId === 'inscribir' ? 'flex' : 'none';
      
      lucide.createIcons();
    });
  });
}

async function openInscribirModal(idCurso, nombre) {
  ensureInscribirModal();
  const modal = document.getElementById('modalInscribir');
  document.getElementById('modalInscribirTitle').textContent = `GestiÃ³n de Alumnos - ${nombre}`;
  modal.dataset.idCurso = idCurso;
  modal.classList.add('active');

  await Promise.all([
    cargarAlumnosInscritos(idCurso),
    cargarAlumnosDisponibles(idCurso)
  ]);

  lucide.createIcons();
}

async function cargarAlumnosInscritos(idCurso) {
  const container = document.getElementById('alumnosInscritosList');
  container.innerHTML = '<p style="text-align:center;padding:20px;">Cargando...</p>';

  try {
    const res = await fetch(`${API_URL}/inscripciones/curso/${idCurso}`);
    const inscritos = await res.json();

    document.getElementById('badgeInscritos').textContent = inscritos.length;

    if (inscritos.length === 0) {
      container.innerHTML = '<div class="empty-state"><i data-lucide="users"></i><p>No hay alumnos inscritos en este curso</p></div>';
      lucide.createIcons();
      return;
    }

    container.innerHTML = `
      <div class="alumnos-grid">
        ${inscritos.map(a => {
          const iniciales = `${(a.nombre || 'A')[0]}${(a.apellido || 'A')[0]}`.toUpperCase();
          return `
            <div class="alumno-card">
              <div class="alumno-card-header">
                <div class="alumno-card-avatar">${iniciales}</div>
                <div class="alumno-card-info">
                  <h4>${a.nombre} ${a.apellido}</h4>
                </div>
              </div>
              <div class="alumno-card-email">
                <i data-lucide="mail"></i>
                ${a.mail || 'Sin email'}
              </div>
              <div class="alumno-card-actions">
                <button class="btn-small btn-baja" onclick="darDeBajaAlumno(${idCurso}, ${a.id_alumno}, '${a.nombre} ${a.apellido}')">
                  <i data-lucide="user-minus"></i> Dar de Baja
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    lucide.createIcons();
  } catch (error) {
    console.error('Error al cargar inscritos:', error);
    container.innerHTML = '<p style="color:red;text-align:center;">Error al cargar alumnos inscritos</p>';
  }
}

async function cargarAlumnosDisponibles(idCurso) {
  const container = document.getElementById('alumnosDisponiblesList');
  container.innerHTML = '<p style="text-align:center;padding:20px;">Cargando...</p>';

  try {
    const [resAlumnos, resInscritos] = await Promise.all([
      fetch(`${API_URL}/alumnos`),
      fetch(`${API_URL}/inscripciones/curso/${idCurso}`)
    ]);

    const todosAlumnos = await resAlumnos.json();
    const inscritos = await resInscritos.json();

    const inscritosIds = inscritos.map(i => i.id_alumno);
    const disponibles = todosAlumnos.filter(a => !inscritosIds.includes(a.id_alumno));

    document.getElementById('badgeDisponibles').textContent = disponibles.length;

    if (disponibles.length === 0) {
      container.innerHTML = '<div class="empty-state"><i data-lucide="user-check"></i><p>Todos los alumnos ya estÃ¡n inscritos</p></div>';
      lucide.createIcons();
      return;
    }

    container.innerHTML = `
      <div class="alumnos-grid" id="alumnosGridDisponibles">
        ${disponibles.map(a => {
          const iniciales = `${(a.nombre || 'A')[0]}${(a.apellido || 'A')[0]}`.toUpperCase();
          return `
            <div class="alumno-card" data-alumno-id="${a.id_alumno}" data-search="${(a.nombre + ' ' + a.apellido + ' ' + (a.mail || '')).toLowerCase()}" onclick="toggleSelectAlumno(this)">
              <input type="checkbox" class="checkbox-card" value="${a.id_alumno}" onclick="event.stopPropagation(); toggleSelectAlumno(this.parentElement)">
              <div class="alumno-card-header">
                <div class="alumno-card-avatar">${iniciales}</div>
                <div class="alumno-card-info">
                  <h4>${a.nombre} ${a.apellido}</h4>
                  <span class="legajo">${a.legajo || 'Sin legajo'}</span>
                </div>
              </div>
              <div class="alumno-card-email">
                <i data-lucide="mail"></i>
                ${a.mail || 'Sin email'}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    lucide.createIcons();

    document.getElementById('searchAlumnos').oninput = (e) => {
      const search = e.target.value.toLowerCase();
      document.querySelectorAll('#alumnosGridDisponibles .alumno-card').forEach(card => {
        const searchText = card.dataset.search;
        card.style.display = searchText.includes(search) ? 'block' : 'none';
      });
    };

    document.getElementById('btnConfirmInscribir').onclick = async () => {
      const seleccionados = Array.from(document.querySelectorAll('#alumnosGridDisponibles .alumno-card.selected'))
        .map(card => card.dataset.alumnoId);

      if (seleccionados.length === 0) {
        showToast('Selecciona al menos un alumno', 'error');
        return;
      }

      try {
        const resp = await fetch(`${API_URL}/inscripciones`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_curso: idCurso, alumnos: seleccionados })
        });

        const data = await resp.json();

        if (resp.ok) {
          showToast(`${seleccionados.length} alumno(s) inscrito(s) correctamente`, 'success');
          await Promise.all([
            cargarAlumnosInscritos(idCurso),
            cargarAlumnosDisponibles(idCurso)
          ]);
          updateSelectedCount();
        } else {
          showToast(data.message || 'Error al inscribir', 'error');
        }
      } catch (error) {
        console.error('Error al inscribir:', error);
        showToast('Error al inscribir alumnos', 'error');
      }
    };

  } catch (error) {
    console.error('Error al cargar disponibles:', error);
    container.innerHTML = '<p style="color:red;text-align:center;">Error al cargar alumnos disponibles</p>';
  }
}

function toggleSelectAlumno(card) {
  card.classList.toggle('selected');
  const checkbox = card.querySelector('.checkbox-card');
  if (checkbox) checkbox.checked = card.classList.contains('selected');
  updateSelectedCount();
}

function updateSelectedCount() {
  const count = document.querySelectorAll('#alumnosGridDisponibles .alumno-card.selected').length;
  document.getElementById('selectedCount').textContent = `${count} alumno(s) seleccionado(s)`;
}

async function darDeBajaAlumno(idCurso, idAlumno, nombreAlumno) {
  if (!confirm(`Â¿EstÃ¡s seguro de dar de baja a ${nombreAlumno}?`)) return;

  try {
    const resp = await fetch(`${API_URL}/inscripciones/${idCurso}/${idAlumno}`, {
      method: 'DELETE'
    });

    const data = await resp.json();

    if (resp.ok && data.success) {
      showToast(`${nombreAlumno} dado de baja correctamente`, 'success');
      const modal = document.getElementById('modalInscribir');
      const cursoId = modal.dataset.idCurso;
      await Promise.all([
        cargarAlumnosInscritos(cursoId),
        cargarAlumnosDisponibles(cursoId)
      ]);
    } else {
      showToast(data.message || 'Error al dar de baja', 'error');
    }
  } catch (error) {
    console.error('Error al dar de baja:', error);
    showToast('Error al dar de baja al alumno', 'error');
  }
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function ensureCursoPanel() {
  if (document.getElementById('cursoPanelOverlay')) return;

  const panelHtml = `
    <div id="cursoPanelOverlay" class="curso-panel-overlay"></div>
    <div id="cursoPanel" class="curso-panel">
      <div class="curso-panel-header">
        <h2 id="cursoPanelTitle">Detalle del Curso</h2>
        <button class="close-panel" aria-label="Cerrar">Ã—</button>
      </div>
      
      <div class="curso-panel-content">
        <div class="panel-section">
          <h3><i data-lucide="info"></i> InformaciÃ³n del Curso</h3>
          <div class="curso-stats-grid" id="cursoStats"></div>
        </div>
        
        <div class="panel-section">
          <h3><i data-lucide="users"></i> Alumnos Inscritos</h3>
          <div id="alumnosInscritos" class="alumnos-inscritos-list"></div>
        </div>
      </div>
      
      <div class="panel-actions">
        <button class="panel-btn primary" id="btnInscribirPanel">
          <i data-lucide="user-plus"></i> Inscribir Alumnos
        </button>
        <button class="panel-btn secondary" id="btnEditarCurso">
          <i data-lucide="edit"></i> Editar
        </button>
        <button class="panel-btn danger" id="btnEliminarCurso">
          <i data-lucide="trash-2"></i> Eliminar
        </button>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', panelHtml);

  const panel = document.getElementById('cursoPanel');
  const overlay = document.getElementById('cursoPanelOverlay');

  const closePanel = () => {
    panel.classList.remove('active');
    overlay.classList.remove('active');
  };

  panel.querySelector('.close-panel').addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);
}

async function openCursoPanel(idCurso) {
  ensureCursoPanel();
  
  const panel = document.getElementById('cursoPanel');
  const overlay = document.getElementById('cursoPanelOverlay');
  
  panel.classList.add('active');
  overlay.classList.add('active');

  try {
    const [resCurso, resInscritos] = await Promise.all([
      fetch(`${API_URL}/cursos/${idCurso}`),
      fetch(`${API_URL}/inscripciones/curso/${idCurso}`)
    ]);

    const curso = await resCurso.json();
    const inscritos = await resInscritos.json();

    document.getElementById('cursoPanelTitle').textContent = curso.nombre_curso || 'Detalle del Curso';

    const cuposMax = curso.cupo_maximo || 30;
    const cuposDisponibles = cuposMax - inscritos.length;

    document.getElementById('cursoStats').innerHTML = `
      <div class="stat-card info">
        <div class="stat-label">Idioma</div>
        <div class="stat-value" style="font-size: 20px;">${curso.nombre_idioma || 'N/A'}</div>
      </div>
      <div class="stat-card success">
        <div class="stat-label">Nivel</div>
        <div class="stat-value" style="font-size: 20px;">${curso.nivel || 'N/A'}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Profesor</div>
        <div class="stat-value" style="font-size: 16px;">${curso.profesor || 'Sin asignar'}</div>
      </div>
      <div class="stat-card info">
        <div class="stat-label">Horario</div>
        <div class="stat-value" style="font-size: 16px;">${curso.horario || 'Por definir'}</div>
      </div>
      <div class="stat-card ${cuposDisponibles <= 5 ? 'warning' : 'success'}">
        <div class="stat-label">Aula</div>
        <div class="stat-value" style="font-size: 18px;">${curso.nombre_aula || 'Sin asignar'}</div>
      </div>
      <div class="stat-card info">
        <div class="stat-label">Cupos</div>
        <div class="stat-value">${inscritos.length} / ${cuposMax}</div>
      </div>
    `;

    if (inscritos.length === 0) {
      document.getElementById('alumnosInscritos').innerHTML = `
        <div class="empty-state">
          <i data-lucide="users"></i>
          <p>No hay alumnos inscritos en este curso</p>
        </div>`;
    } else {
      document.getElementById('alumnosInscritos').innerHTML = inscritos.map(a => {
        const iniciales = `${(a.nombre || 'A')[0]}${(a.apellido || 'A')[0]}`.toUpperCase();
        return `
          <div class="alumno-item">
            <div class="alumno-avatar">${iniciales}</div>
            <div class="alumno-info">
              <div class="alumno-nombre">${a.nombre} ${a.apellido}</div>
              <div class="alumno-email">${a.mail || 'Sin email'}</div>
            </div>
          </div>`;
      }).join('');
    }

    lucide.createIcons();

    document.getElementById('btnInscribirPanel').onclick = () => {
      panel.classList.remove('active');
      overlay.classList.remove('active');
      openInscribirModal(idCurso, curso.nombre_curso);
    };

    document.getElementById('btnEditarCurso').onclick = () => {
      panel.classList.remove('active');
      overlay.classList.remove('active');
      openEditarCursoModal(curso);
    };

    document.getElementById('btnEliminarCurso').onclick = () => {
      if (confirm(`Â¿EstÃ¡s seguro de eliminar el curso "${curso.nombre_curso}"?`)) {
        alert('Funcionalidad de eliminar curso prÃ³ximamente');
      }
    };

  } catch (err) {
    console.error('Error al cargar detalles del curso:', err);
    document.getElementById('cursoStats').innerHTML = '<p>Error al cargar estadÃ­sticas</p>';
    document.getElementById('alumnosInscritos').innerHTML = '<p>Error al cargar alumnos</p>';
  }
}

function ensureEditarCursoModal() {
  if (document.getElementById('modalEditarCurso')) return;

  const modalHtml = `
    <div id="modalEditarCurso" class="modal">
      <div class="modal-content" style="max-width: 600px;">
        <div class="modal-header">
          <h3>Editar Curso</h3>
          <button type="button" class="close-modal" aria-label="Cerrar">&times;</button>
        </div>
        <form id="formEditarCurso" style="padding: 24px;">
          <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
            <div>
              <label for="editNombreCurso">Nombre del Curso:</label>
              <input type="text" id="editNombreCurso" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div>
                <label for="editIdioma">Idioma:</label>
                <select id="editIdioma" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                  <option value="">Seleccione...</option>
                </select>
              </div>
              
              <div>
                <label for="editNivel">Nivel:</label>
                <select id="editNivel" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                  <option value="">Seleccione...</option>
                </select>
              </div>
            </div>
            
            <div>
              <label for="editProfesor">Profesor:</label>
              <select id="editProfesor" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                <option value="">Seleccione...</option>
              </select>
            </div>
            
            <div>
              <label for="editHorario">Horario:</label>
              <input type="text" id="editHorario" placeholder="Ej: Lunes y MiÃ©rcoles 18:00-20:00" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div>
                <label for="editAula">Aula:</label>
                <select id="editAula" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                  <option value="">Sin aula</option>
                </select>
              </div>
              
              <div>
                <label for="editCupo">Cupo MÃ¡ximo:</label>
                <input type="number" id="editCupo" min="1" max="100" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
              </div>
            </div>
          </div>
          
          <div class="form-actions" style="margin-top: 24px;">
            <button type="button" class="close-modal">Cancelar</button>
            <button type="submit" class="btn-primary">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('modalEditarCurso');
  modal.querySelectorAll('.close-modal').forEach(btn => btn.addEventListener('click', () => modal.classList.remove('active')));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });
}

async function openEditarCursoModal(curso) {
  ensureEditarCursoModal();
  const modal = document.getElementById('modalEditarCurso');

  try {
    const resCursoCompleto = await fetch(`${API_URL}/cursos/${curso.id_curso}`);
    const cursoCompleto = await resCursoCompleto.json();

    const [resIdiomas, resProfesores] = await Promise.all([
      fetch(`${API_URL}/idiomas`),
      fetch(`${API_URL}/profesores`)
    ]);

    const idiomas = await resIdiomas.json();
    const profesores = await resProfesores.json();

    document.getElementById('editIdioma').innerHTML = `
      <option value="">Seleccione...</option>
      ${idiomas.map(i => `<option value="${i.id_idioma}" ${i.id_idioma === cursoCompleto.id_idioma ? 'selected' : ''}>${i.nombre_idioma}</option>`).join('')}
    `;

    document.getElementById('editNivel').innerHTML = `
      <option value="">Seleccione...</option>
      <option value="1" ${cursoCompleto.id_nivel === 1 ? 'selected' : ''}>A1</option>
      <option value="2" ${cursoCompleto.id_nivel === 2 ? 'selected' : ''}>A2</option>
      <option value="3" ${cursoCompleto.id_nivel === 3 ? 'selected' : ''}>B1</option>
      <option value="4" ${cursoCompleto.id_nivel === 4 ? 'selected' : ''}>B2</option>
      <option value="5" ${cursoCompleto.id_nivel === 5 ? 'selected' : ''}>C1</option>
      <option value="6" ${cursoCompleto.id_nivel === 6 ? 'selected' : ''}>C2</option>
    `;

    document.getElementById('editProfesor').innerHTML = `
      <option value="">Seleccione...</option>
      ${profesores.map(p => `<option value="${p.id_profesor}" ${p.id_profesor === cursoCompleto.id_profesor ? 'selected' : ''}>${p.nombre_completo}</option>`).join('')}
    `;

    document.getElementById('editAula').innerHTML = `
      <option value="">Sin aula</option>
      <option value="1" ${cursoCompleto.id_aula === 1 ? 'selected' : ''}>Aula 101</option>
      <option value="2" ${cursoCompleto.id_aula === 2 ? 'selected' : ''}>Aula 102</option>
    `;

    document.getElementById('editNombreCurso').value = cursoCompleto.nombre_curso || '';
    document.getElementById('editHorario').value = cursoCompleto.horario || '';
    document.getElementById('editCupo').value = cursoCompleto.cupo_maximo || 30;

    modal.classList.add('active');

    document.getElementById('formEditarCurso').onsubmit = async (e) => {
      e.preventDefault();

      const datosActualizados = {
        nombre_curso: document.getElementById('editNombreCurso').value,
        horario: document.getElementById('editHorario').value,
        cupo_maximo: parseInt(document.getElementById('editCupo').value),
        id_aula: document.getElementById('editAula').value || null,
        id_idioma: parseInt(document.getElementById('editIdioma').value),
        id_nivel: parseInt(document.getElementById('editNivel').value),
        id_profesor: parseInt(document.getElementById('editProfesor').value)
      };

      try {
        const resp = await fetch(`${API_URL}/cursos/${curso.id_curso}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datosActualizados)
        });

        const data = await resp.json();

        if (resp.ok && data.success) {
          alert('Curso actualizado correctamente');
          modal.classList.remove('active');
          document.getElementById('btnCursos').click();
        } else {
          alert(data.message || 'Error al actualizar el curso');
        }
      } catch (error) {
        console.error('Error al actualizar curso:', error);
        alert('Error al actualizar el curso');
      }
    };

  } catch (error) {
    console.error('Error al cargar datos para editar:', error);
    alert('Error al cargar los datos del curso');
  }
}


async function initAdminDashboard() {
  console.log(" Dashboard ADMIN cargado");
}


async function initProfesorDashboard() {
  console.log("â€ Dashboard PROFESOR cargado");

  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("mainContent");
  const botones = document.querySelectorAll(".sidebar-menu button");

  const nombreProfesor = localStorage.getItem("nombre") || "Profesor";
  const idProfesor = localStorage.getItem("id_profesor");
  document.getElementById("welcomeMessage").textContent = `Bienvenido, ${nombreProfesor} `;

  const sections = {
    btnCursos: async () => {
      loader.classList.remove("hidden");
      try {
        const res = await fetch(`${API_URL}/cursos?id_profesor=${idProfesor}`);
        const data = await res.json();
        loader.classList.add("hidden");

        if (!data.length) {
          mainContent.innerHTML = `<p>No tienes cursos asignados actualmente.</p>`;
          return;
        }

        mainContent.innerHTML = `
          <h2>Mis Cursos</h2>
          <table>
            <tr>
              <th>ID</th>
              <th>Curso</th>
              <th>Idioma</th>
              <th>Nivel</th>
            </tr>
            ${data.map(c => `
              <tr>
                <td>${c.id_curso}</td>
                <td>${c.nombre_curso}</td>
                <td>${c.nombre_idioma || "-"}</td>
                <td>${c.nivel || "-"}</td>
              </tr>`).join("")}
          </table>`;
      } catch (error) {
        loader.classList.add("hidden");
        mainContent.innerHTML = `<p>Error al cargar los cursos.</p>`;
        console.error(error);
      }
    },

    btnCalificaciones: async () => {
      loader.classList.remove("hidden");
      mainContent.classList.remove("active");
      try {
        const resCursos = await fetch(`${API_URL}/cursos?id_profesor=${idProfesor}`);
        const cursos = await resCursos.json();
        
        mainContent.innerHTML = `
          <h2>Calificaciones</h2>
          <div class="calificaciones-container">
            <div class="actions-header">
              <div class="curso-selector">
                <label for="selectCurso">Seleccionar Curso:</label>
                <select id="selectCurso">
                  <option value="">Seleccione un curso...</option>
                  ${cursos.map(c => `
                    <option value="${c.id_curso}">${c.nombre_curso} - ${c.nombre_idioma} (${c.nivel || '-'})</option>
                  `).join('')}
                </select>
              </div>
            </div>
            
            <div id="tablaCalificaciones" class="calificaciones-table">
              <table>
                <thead>
                  <tr>
                    <th>Alumno</th>
                    <th>Parcial 1</th>
                    <th>Parcial 2</th>
                    <th>Final</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="calificacionesBody">
                  <tr>
                    <td colspan="5">Seleccione un curso para ver las calificaciones</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `;

        document.getElementById('selectCurso').addEventListener('change', async (e) => {
          const cursoId = e.target.value;
          if (!cursoId) {
            document.getElementById('calificacionesBody').innerHTML = `
              <tr><td colspan="5">Seleccione un curso para ver las calificaciones</td></tr>
            `;
            return;
          }

          try {
            const res = await fetch(`${API_URL}/calificaciones/curso/${cursoId}`);
            const alumnos = await res.json();
            
            document.getElementById('calificacionesBody').innerHTML = alumnos.map(alumno => `
              <tr data-alumno-id="${alumno.id_alumno}">
                <td>${alumno.nombre} ${alumno.apellido}</td>
                <td>${alumno.parcial1 || '-'}</td>
                <td>${alumno.parcial2 || '-'}</td>
                <td>${alumno.final || '-'}</td>
                <td>
                  <button class="btn-primary">
                    Editar
                  </button>
                </td>
              </tr>
            `).join('') || '<tr><td colspan="5">No hay alumnos inscritos en este curso</td></tr>';

          } catch (error) {
            console.error('Error al cargar alumnos:', error);
            document.getElementById('calificacionesBody').innerHTML = `
              <tr><td colspan="5">Error al cargar los alumnos</td></tr>
            `;
          }
        });

      } catch (error) {
        console.error('Error:', error);
        mainContent.innerHTML = `
          <h2>Calificaciones</h2>
          <p class="error">Error al cargar las calificaciones. Por favor, intente nuevamente.</p>
        `;
      }
      
      loader.classList.add("hidden");
      setTimeout(() => mainContent.classList.add("active"), 100);
    },

    btnAsistencias: async () => {
      mainContent.innerHTML = `
        <h2>Asistencias</h2>
        <p>En desarrollo...</p>`;
    },

    btnMensajes: async () => {
      mainContent.innerHTML = `
        <h2>Mensajes</h2>
        <div class="message-list">
          <div class="message-item">
            <i data-lucide="mail"></i>
            <div><h3>CoordinaciÃ³n AcadÃ©mica</h3><p>ReuniÃ³n el jueves a las 14hs</p></div>
          </div>
          <div class="message-item">
            <i data-lucide="mail"></i>
            <div><h3>AdministraciÃ³n</h3><p>Por favor enviar lista de asistencia</p></div>
          </div>
        </div>`;
      lucide.createIcons();
    }
  };

  botones.forEach(btn => {
    btn.addEventListener("click", async () => {
      botones.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      mainContent.classList.remove("active");
      loader.classList.remove("hidden");

      setTimeout(async () => {
        await sections[btn.id]?.();
        loader.classList.add("hidden");
        mainContent.classList.add("active");
      }, 300);
    });
  });

  document.getElementById("btnCursos").click();
}

async function initAlumnoDashboard() {
  console.log(" Dashboard ALUMNO cargado");
  document.getElementById("btnMisInscripciones")?.addEventListener("click", verMisInscripciones);
  document.getElementById("btnMisPagos")?.addEventListener("click", verMisPagos);
}

async function verMisInscripciones() {
  const table = document.getElementById("tablaMisInscripciones");
  table.innerHTML = "<tr><td>Cargando inscripciones...</td></tr>";
  try {
    const res = await fetch(`${API_URL}/inscripciones`);
    const data = await res.json();
    table.innerHTML = `
      <tr><th>ID</th><th>Curso</th><th>Fecha</th><th>Estado</th></tr>
      ${data.map(i => `
        <tr>
          <td>${i.id_inscripcion}</td>
          <td>${i.id_curso}</td>
          <td>${i.fecha_inscripcion}</td>
          <td>${i.estado}</td>
        </tr>`).join("")}
    `;
  } catch (err) {
    console.error("Error al obtener inscripciones:", err);
    table.innerHTML = "<tr><td>Error al cargar inscripciones</td></tr>";
  }
}

async function verMisPagos() {
  const table = document.getElementById("tablaMisPagos");
  table.innerHTML = "<tr><td>Cargando pagos...</td></tr>";
  try {
    const res = await fetch(`${API_URL}/pagos`);
    const data = await res.json();
    const nombreAlumno = localStorage.getItem("nombre");
    const propios = data.filter(p => p.alumno?.includes(nombreAlumno));
    table.innerHTML = `
      <tr><th>ID</th><th>Concepto</th><th>Monto</th><th>Fecha</th><th>Medio</th></tr>
      ${propios.map(p => `
        <tr>
          <td>${p.id_pago}</td>
          <td>${p.concepto}</td>
          <td>${p.monto}</td>
          <td>${p.fecha_pago}</td>
          <td>${p.medio_pago}</td>
        </tr>`).join("")}
    `;
  } catch (err) {
    console.error("Error al obtener pagos del alumno:", err);
    table.innerHTML = "<tr><td>Error al cargar pagos</td></tr>";
  }
}

function ensureAlumnoPanel() {
  if (document.getElementById('alumnoPanel')) return;

  const panelHtml = `
    <div id="alumnoPanelOverlay" class="curso-panel-overlay"></div>
    <div id="alumnoPanel" class="alumno-panel">
      <div class="alumno-panel-header">
        <button class="close-panel" aria-label="Cerrar">Ã—</button>
        <div class="alumno-panel-header-content">
          <div class="alumno-panel-avatar" id="panelAlumnoAvatar">AA</div>
          <div class="alumno-panel-info">
            <h2 id="panelAlumnoNombre">Cargando...</h2>
            <div class="legajo-info">
              <span id="panelAlumnoLegajo"></span> â€¢ 
              <span id="panelAlumnoEstado" class="alumno-estado-badge activo">Activo</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="alumno-panel-content" id="panelAlumnoContent">
        <div style="text-align: center; padding: 40px; color: #999;">
          <i data-lucide="loader" style="width: 32px; height: 32px; animation: spin 1s linear infinite;"></i>
          <p>Cargando informaciÃ³n...</p>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', panelHtml);
  
  const panel = document.getElementById('alumnoPanel');
  const overlay = document.getElementById('alumnoPanelOverlay');
  
  const closePanel = () => {
    panel.classList.remove('active');
    overlay.classList.remove('active');
  };

  panel.querySelector('.close-panel').addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);
  
  document.addEventListener('click', (e) => {
    if (panel.classList.contains('active') && !panel.contains(e.target) && !e.target.closest('.alumno-card')) {
      closePanel();
    }
  });
  
  let mouseLeaveTimeout;
  panel.addEventListener('mouseleave', () => {
    mouseLeaveTimeout = setTimeout(() => {
      closePanel();
    }, 500);
  });
  
  panel.addEventListener('mouseenter', () => {
    clearTimeout(mouseLeaveTimeout);
  });
}

async function openAlumnoPanel(idAlumno) {
  ensureAlumnoPanel();
  const panel = document.getElementById('alumnoPanel');
  const overlay = document.getElementById('alumnoPanelOverlay');
  
  panel.classList.add('active');
  overlay.classList.add('active');

  try {
    const resAlumno = await fetch(`${API_URL}/alumnos/${idAlumno}`);
    const alumno = await resAlumno.json();

    const iniciales = `${alumno.nombre.charAt(0)}${alumno.apellido.charAt(0)}`.toUpperCase();
    document.getElementById('panelAlumnoAvatar').textContent = iniciales;
    document.getElementById('panelAlumnoNombre').textContent = `${alumno.nombre} ${alumno.apellido}`;
    document.getElementById('panelAlumnoLegajo').textContent = `Legajo: ${alumno.legajo}`;
    
    const estadoBadge = document.getElementById('panelAlumnoEstado');
    estadoBadge.textContent = (alumno.estado || 'activo').charAt(0).toUpperCase() + (alumno.estado || 'activo').slice(1);
    estadoBadge.className = `alumno-estado-badge ${alumno.estado || 'activo'}`;

    const content = document.getElementById('panelAlumnoContent');
    content.innerHTML = `
      <!-- InformaciÃ³n Personal -->
      <div class="info-section">
        <h3><i data-lucide="user"></i> InformaciÃ³n Personal</h3>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-item-label">Email</div>
            <div class="info-item-value">${alumno.mail}</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">TelÃ©fono</div>
            <div class="info-item-value">${alumno.telefono || 'No registrado'}</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">Fecha de Registro</div>
            <div class="info-item-value">${alumno.fecha_registro ? new Date(alumno.fecha_registro).toLocaleDateString('es-AR') : 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">Estado</div>
            <div class="info-item-value">
              <span class="alumno-estado-badge ${alumno.estado || 'activo'}">${(alumno.estado || 'activo').charAt(0).toUpperCase() + (alumno.estado || 'activo').slice(1)}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- EstadÃ­sticas AcadÃ©micas -->
      <div class="info-section">
        <h3><i data-lucide="bar-chart-2"></i> EstadÃ­sticas AcadÃ©micas</h3>
        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-number">${alumno.cursos_activos || 0}</div>
            <div class="stat-label">Cursos Activos</div>
          </div>
          <div class="stat-box success">
            <div class="stat-number">${alumno.promedio_general || '0.0'}</div>
            <div class="stat-label">Promedio General</div>
            <div class="progress-bar">
              <div class="progress-bar-fill ${alumno.promedio_general >= 7 ? 'success' : alumno.promedio_general >= 4 ? 'warning' : 'danger'}" 
                   style="width: ${Math.min((alumno.promedio_general / 10) * 100, 100)}%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cursos Inscritos -->
      <div class="info-section">
        <h3><i data-lucide="book-open"></i> Cursos Inscritos (${alumno.cursos?.length || 0})</h3>
        ${alumno.cursos && alumno.cursos.length > 0 ? `
          <div class="cursos-list">
            ${alumno.cursos.map(c => `
              <div class="curso-item">
                <div class="curso-item-info">
                  <h4>${c.nombre_curso}</h4>
                  <p>${c.nombre_idioma} - ${c.nivel} ${c.horario ? `â€¢ ${c.horario}` : ''}</p>
                </div>
                <div class="curso-item-calificacion">
                  ${c.promedio !== null ? `
                    <div class="promedio">${parseFloat(c.promedio).toFixed(1)}</div>
                    <div class="label">Promedio</div>
                  ` : '<div class="label" style="font-size: 13px; color: #999;">Sin calificaciones</div>'}
                </div>
              </div>
            `).join('')}
          </div>
        ` : '<p style="color: #999; text-align: center; padding: 20px;">No estÃ¡ inscrito en ningÃºn curso actualmente</p>'}
      </div>

      <!-- Resumen de Pagos -->
      <div class="info-section">
        <h3><i data-lucide="dollar-sign"></i> Resumen de Pagos</h3>
        <div class="pagos-summary">
          <h4>Total Pagado</h4>
          <div class="pagos-total">$${alumno.total_pagado ? parseFloat(alumno.total_pagado).toLocaleString('es-AR', {minimumFractionDigits: 2}) : '0.00'}</div>
          ${alumno.ultimo_pago ? `<div class="pagos-ultimo">Ãšltimo pago: ${new Date(alumno.ultimo_pago).toLocaleDateString('es-AR')}</div>` : '<div class="pagos-ultimo">Sin pagos registrados</div>'}
        </div>
        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-number">${alumno.total_pagos || 0}</div>
            <div class="stat-label">Pagos Realizados</div>
          </div>
          <div class="stat-box warning">
            <div class="stat-number">$${alumno.promedio_pago ? parseFloat(alumno.promedio_pago).toLocaleString('es-AR', {minimumFractionDigits: 0}) : '0'}</div>
            <div class="stat-label">Promedio por Pago</div>
          </div>
        </div>
      </div>
    `;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  } catch (err) {
    console.error('Error al cargar panel de alumno:', err);
    document.getElementById('panelAlumnoContent').innerHTML = `
      <div style="text-align: center; padding: 40px; color: #f44336;">
        <i data-lucide="alert-circle" style="width: 32px; height: 32px;"></i>
        <p>Error al cargar la informaciÃ³n del alumno</p>
      </div>`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

function setupAlumnoFilters() {
  const searchInput = document.getElementById('alumnosSearch');
  const estadoFilter = document.getElementById('alumnosEstadoFilter');

  if (searchInput) {
    searchInput.addEventListener('input', filterAlumnos);
  }
  
  if (estadoFilter) {
    estadoFilter.addEventListener('change', filterAlumnos);
  }
}

function filterAlumnos() {
  const searchTerm = document.getElementById('alumnosSearch')?.value.toLowerCase() || '';
  const estadoFilter = document.getElementById('alumnosEstadoFilter')?.value || '';
  
  const cards = document.querySelectorAll('.alumno-card');
  
  cards.forEach(card => {
    const cardText = card.textContent.toLowerCase();
    const cardEstado = card.querySelector('.alumno-estado-badge')?.textContent.toLowerCase() || '';
    
    const matchesSearch = cardText.includes(searchTerm);
    const matchesEstado = !estadoFilter || cardEstado.includes(estadoFilter);
    
    if (matchesSearch && matchesEstado) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function ensureProfesorPanel() {
  if (document.getElementById('profesorPanel')) return;

  const panelHtml = `
    <div id="profesorPanelOverlay" class="curso-panel-overlay"></div>
    <div id="profesorPanel" class="profesor-panel">
      <div class="profesor-panel-header">
        <button class="close-panel" aria-label="Cerrar">Ã—</button>
        <div class="profesor-panel-header-content">
          <div class="profesor-panel-avatar" id="panelProfesorAvatar">PP</div>
          <div class="profesor-panel-info">
            <h2 id="panelProfesorNombre">Cargando...</h2>
            <div class="especialidad-info">
              <i data-lucide="award"></i>
              <span id="panelProfesorEspecialidad"></span> â€¢ 
              <span id="panelProfesorEstado" class="profesor-estado-badge activo">Activo</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="profesor-panel-content" id="panelProfesorContent">
        <div style="text-align: center; padding: 40px; color: #999;">
          <i data-lucide="loader" style="width: 32px; height: 32px; animation: spin 1s linear infinite;"></i>
          <p>Cargando informaciÃ³n...</p>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', panelHtml);
  
  const panel = document.getElementById('profesorPanel');
  const overlay = document.getElementById('profesorPanelOverlay');
  
  const closePanel = () => {
    panel.classList.remove('active');
    overlay.classList.remove('active');
  };

  panel.querySelector('.close-panel').addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);
  
  document.addEventListener('click', (e) => {
    if (panel.classList.contains('active') && !panel.contains(e.target) && !e.target.closest('.profesor-card')) {
      closePanel();
    }
  });
  
  let mouseLeaveTimeout;
  panel.addEventListener('mouseleave', () => {
    mouseLeaveTimeout = setTimeout(() => {
      closePanel();
    }, 500);
  });
  
  panel.addEventListener('mouseenter', () => {
    clearTimeout(mouseLeaveTimeout);
  });
}

async function openProfesorPanel(idProfesor) {
  ensureProfesorPanel();
  const panel = document.getElementById('profesorPanel');
  const overlay = document.getElementById('profesorPanelOverlay');
  
  panel.classList.add('active');
  overlay.classList.add('active');

  try {
    const resProfesor = await fetch(`${API_URL}/profesores/${idProfesor}`);
    const profesor = await resProfesor.json();

    const iniciales = `${profesor.nombre.charAt(0)}${profesor.apellido.charAt(0)}`.toUpperCase();
    document.getElementById('panelProfesorAvatar').textContent = iniciales;
    document.getElementById('panelProfesorNombre').textContent = `${profesor.nombre} ${profesor.apellido}`;
    document.getElementById('panelProfesorEspecialidad').textContent = profesor.especialidad || 'Sin especialidad';
    
    const estadoBadge = document.getElementById('panelProfesorEstado');
    estadoBadge.textContent = (profesor.estado || 'activo').charAt(0).toUpperCase() + (profesor.estado || 'activo').slice(1);
    estadoBadge.className = `profesor-estado-badge ${profesor.estado || 'activo'}`;

    const horasPorCurso = 3; // EstimaciÃ³n promedio
    const horasTotales = profesor.total_cursos * horasPorCurso;
    const horasMaximas = 40;
    const porcentajeCarga = (horasTotales / horasMaximas) * 100;
    let claseCarga = 'baja';
    if (porcentajeCarga >= 80) claseCarga = 'alta';
    else if (porcentajeCarga >= 50) claseCarga = 'media';

    const content = document.getElementById('panelProfesorContent');
    content.innerHTML = `
      <!-- InformaciÃ³n Personal -->
      <div class="info-section">
        <h3><i data-lucide="user"></i> InformaciÃ³n Personal</h3>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-item-label">Email</div>
            <div class="info-item-value">${profesor.mail}</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">TelÃ©fono</div>
            <div class="info-item-value">${profesor.telefono || 'No registrado'}</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">Fecha de Ingreso</div>
            <div class="info-item-value">${profesor.fecha_ingreso ? new Date(profesor.fecha_ingreso).toLocaleDateString('es-AR') : 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">AntigÃ¼edad</div>
            <div class="info-item-value">${profesor.antiguedad_anos} ${profesor.antiguedad_anos === 1 ? 'aÃ±o' : 'aÃ±os'}</div>
          </div>
        </div>
      </div>

      <!-- Carga Horaria -->
      <div class="info-section">
        <h3><i data-lucide="clock"></i> Carga Horaria</h3>
        <div class="carga-horaria-chart">
          <div class="carga-bar-container">
            <div class="carga-bar-label">Horas semanales</div>
            <div class="carga-bar-track">
              <div class="carga-bar-fill ${claseCarga}" style="width: ${Math.min(porcentajeCarga, 100)}%">
                ${horasTotales}h / ${horasMaximas}h
              </div>
            </div>
          </div>
          <div class="carga-bar-container">
            <div class="carga-bar-label">Cursos activos</div>
            <div class="carga-bar-track">
              <div class="carga-bar-fill" style="width: ${Math.min((profesor.total_cursos / 10) * 100, 100)}%">
                ${profesor.total_cursos} cursos
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- EstadÃ­sticas de Alumnos -->
      <div class="info-section">
        <h3><i data-lucide="users"></i> EstadÃ­sticas de Alumnos</h3>
        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-number">${profesor.total_alumnos || 0}</div>
            <div class="stat-label">Alumnos Activos</div>
          </div>
          <div class="stat-box success">
            <div class="stat-number">${profesor.promedio_general || 'N/A'}</div>
            <div class="stat-label">Promedio General</div>
            ${profesor.promedio_general ? `
            <div class="progress-bar">
              <div class="progress-bar-fill ${profesor.promedio_general >= 7 ? 'success' : profesor.promedio_general >= 4 ? 'warning' : 'danger'}" 
                   style="width: ${Math.min((profesor.promedio_general / 10) * 100, 100)}%"></div>
            </div>` : ''}
          </div>
          <div class="stat-box">
            <div class="stat-number">${profesor.total_cursos || 0}</div>
            <div class="stat-label">Cursos Dictando</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">${profesor.idiomas?.length || 0}</div>
            <div class="stat-label">Idiomas</div>
          </div>
        </div>
      </div>

      <!-- Cursos que Dicta -->
      <div class="info-section">
        <h3><i data-lucide="book-open"></i> Cursos que Dicta (${profesor.cursos?.length || 0})</h3>
        ${profesor.cursos && profesor.cursos.length > 0 ? `
          <div class="profesor-cursos-list">
            ${profesor.cursos.map(c => `
              <div class="profesor-curso-item">
                <div class="profesor-curso-info">
                  <h4>${c.nombre_curso}</h4>
                  <p>${c.nombre_idioma} - ${c.nivel || 'Sin nivel'} ${c.horario ? `â€¢ ${c.horario}` : ''} ${c.nombre_aula ? `â€¢ ${c.nombre_aula}` : ''}</p>
                </div>
                <div class="profesor-curso-stats">
                  <div class="numero">${c.total_alumnos || 0}</div>
                  <div class="label">Alumnos</div>
                  ${c.promedio_curso ? `<div style="font-size: 12px; color: #666; margin-top: 4px;">Prom: ${parseFloat(c.promedio_curso).toFixed(1)}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        ` : '<p style="color: #999; text-align: center; padding: 20px;">No estÃ¡ dictando cursos actualmente</p>'}
      </div>

      <!-- Idiomas que EnseÃ±a -->
      <div class="info-section">
        <h3><i data-lucide="languages"></i> Idiomas que EnseÃ±a</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${profesor.idiomas && profesor.idiomas.length > 0 ? 
            profesor.idiomas.map(idioma => `
              <span style="background: #e3f2fd; color: #1976d2; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 500;">
                ${idioma}
              </span>
            `).join('') :
            '<p style="color: #999;">Sin idiomas asignados</p>'
          }
        </div>
      </div>

      <!-- Botones de AcciÃ³n -->
      <div class="panel-actions">
        <button class="btn-danger" onclick="darDeBajaProfesor(${idProfesor}, '${profesor.nombre} ${profesor.apellido}')">
          <i data-lucide="user-x"></i>
          Dar de Baja
        </button>
      </div>
    `;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  } catch (err) {
    console.error('Error al cargar panel de profesor:', err);
    document.getElementById('panelProfesorContent').innerHTML = `
      <div style="text-align: center; padding: 40px; color: #f44336;">
        <i data-lucide="alert-circle" style="width: 32px; height: 32px;"></i>
        <p>Error al cargar la informaciÃ³n del profesor</p>
      </div>`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

function setupProfesorFilters() {
  const searchInput = document.getElementById('profesoresSearch');
  const estadoFilter = document.getElementById('profesoresEstadoFilter');
  const idiomaFilter = document.getElementById('profesoresIdiomaFilter');

  const cards = document.querySelectorAll('.profesor-card');
  const idiomasSet = new Set();
  cards.forEach(card => {
    const idiomas = card.getAttribute('data-idioma');
    if (idiomas && idiomas !== 'Sin idiomas') {
      idiomas.split(', ').forEach(i => idiomasSet.add(i.trim()));
    }
  });
  
  idiomaFilter.innerHTML = '<option value="">Todos los idiomas</option>' +
    Array.from(idiomasSet).sort().map(i => `<option value="${i}">${i}</option>`).join('');

  if (searchInput) {
    searchInput.addEventListener('input', filterProfesores);
  }
  
  if (estadoFilter) {
    estadoFilter.addEventListener('change', filterProfesores);
  }

  if (idiomaFilter) {
    idiomaFilter.addEventListener('change', filterProfesores);
  }
}

function filterProfesores() {
  const searchTerm = document.getElementById('profesoresSearch')?.value.toLowerCase() || '';
  const estadoFilter = document.getElementById('profesoresEstadoFilter')?.value || '';
  const idiomaFilter = document.getElementById('profesoresIdiomaFilter')?.value || '';
  
  const cards = document.querySelectorAll('.profesor-card');
  
  cards.forEach(card => {
    const cardText = card.textContent.toLowerCase();
    const cardEstado = card.querySelector('.profesor-estado-badge')?.textContent.toLowerCase() || '';
    const cardIdiomas = card.getAttribute('data-idioma') || '';
    
    const matchesSearch = cardText.includes(searchTerm);
    const matchesEstado = !estadoFilter || cardEstado.includes(estadoFilter);
    const matchesIdioma = !idiomaFilter || cardIdiomas.includes(idiomaFilter);
    
    if (matchesSearch && matchesEstado && matchesIdioma) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}


async function initIdiomasMultiSelect(mode = 'edit', selectedIds = []) {
  const prefix = mode === 'edit' ? '' : 'Nuevo';
  const display = document.getElementById(`idiomasSelectedDisplay${prefix}`);
  const dropdown = document.getElementById(`idiomasDropdown${prefix}`);
  const hiddenInput = document.getElementById(mode === 'edit' ? 'editProfesorIdiomas' : 'idiomasSeleccionados');
  
  console.log(' Buscando elementos:', {
    mode,
    prefix,
    displayId: `idiomasSelectedDisplay${prefix}`,
    dropdownId: `idiomasDropdown${prefix}`,
    displayFound: !!display,
    dropdownFound: !!dropdown,
    hiddenInputFound: !!hiddenInput
  });
  
  if (!display || !dropdown) {
    console.error(' No se encontraron los elementos del selector de idiomas');
    return;
  }
  
  let selectedIdiomas = new Set(selectedIds);
  
  try {
    const resp = await fetch(`${API_URL}/idiomas`);
    const idiomas = await resp.json();
    
    console.log(' Idiomas cargados:', idiomas.length);
    
    dropdown.innerHTML = idiomas.map(idioma => `
      <label style="display: flex; align-items: center; padding: 10px; cursor: pointer; transition: background 0.2s;" 
             onmouseover="this.style.background='#f3f4f6'" 
             onmouseout="this.style.background='white'"
             data-idioma-id="${idioma.id_idioma}">
        <input type="checkbox" value="${idioma.id_idioma}" 
               ${selectedIdiomas.has(idioma.id_idioma) ? 'checked' : ''}
               style="margin-right: 8px; cursor: pointer;">
        <span style="font-size: 14px;">${idioma.nombre_idioma}</span>
      </label>
    `).join('');
    
    updateIdiomasDisplay();
    
    display.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });
    
    document.addEventListener('click', (e) => {
      if (!display.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });
    
    dropdown.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const id = parseInt(e.target.value);
        if (e.target.checked) {
          selectedIdiomas.add(id);
        } else {
          selectedIdiomas.delete(id);
        }
        updateIdiomasDisplay();
      });
    });
    
    function updateIdiomasDisplay() {
      display.innerHTML = '';
      
      if (selectedIdiomas.size === 0) {
        const placeholderSpan = document.createElement('span');
        placeholderSpan.id = `idiomasPlaceholder${prefix}`;
        placeholderSpan.style.color = '#999';
        placeholderSpan.style.fontSize = '14px';
        placeholderSpan.textContent = 'Seleccionar idiomas...';
        display.appendChild(placeholderSpan);
      } else {
        selectedIdiomas.forEach(id => {
          const idioma = idiomas.find(i => i.id_idioma === id);
          if (idioma) {
            const tag = document.createElement('span');
            tag.style.cssText = 'background: #1e3c72; color: white; padding: 4px 10px; border-radius: 12px; font-size: 13px; display: inline-flex; align-items: center; gap: 6px;';
            tag.innerHTML = `
              ${idioma.nombre_idioma}
              <button type="button" onclick="event.stopPropagation(); this.parentElement.remove(); document.querySelector('#idiomasDropdown${prefix} input[value=\\'${id}\\']').checked = false; document.querySelector('#idiomasDropdown${prefix} input[value=\\'${id}\\']').dispatchEvent(new Event('change'));" 
                      style="background: none; border: none; color: white; cursor: pointer; font-size: 16px; line-height: 1; padding: 0; margin: 0;">Ã—</button>
            `;
            display.appendChild(tag);
          }
        });
      }
      
      if (hiddenInput) {
        hiddenInput.value = Array.from(selectedIdiomas).join(',');
      }
    }
    
  } catch (error) {
    console.error('Error al cargar idiomas:', error);
  }
}

function ensureEditarProfesorModal() {
  document.querySelectorAll('#modalEditarProfesor').forEach(m => {
    console.log('ï¸ Eliminando modal viejo por ID');
    m.remove();
  });
  
  document.querySelectorAll('.modal').forEach(m => {
    if (m.innerHTML && m.innerHTML.includes('Editar Profesor')) {
      console.log('ï¸ Eliminando modal viejo por contenido');
      m.remove();
    }
  });

  const timestamp = Date.now();
  console.log(` CREANDO MODAL PROFESOR - Timestamp: ${timestamp}`);
  console.log('ï¸ Si NO ves el campo DNI despuÃ©s de esto, el problema es CACHE del navegador');
  console.log(' Verificar en Elements: buscar id="editProfesorDNI"');

  const modalHtml = `
    <div id="modalEditarProfesor" class="modal" style="z-index: 3000;">
      <div class="modal-content" style="max-width: 600px; max-height: 90vh; overflow-y: auto;">
        <div class="modal-header">
          <h2>Editar Profesor</h2>
          <button class="close-modal">&times;</button>
        </div>
        
        <div style="padding: 24px;">
          <form id="formEditarProfesor">
            <input type="hidden" id="editProfesorId">
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div>
                <label for="editProfesorNombre">Nombre:</label>
                <input type="text" id="editProfesorNombre" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
              </div>
              
              <div>
                <label for="editProfesorApellido">Apellido:</label>
                <input type="text" id="editProfesorApellido" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
              </div>
            </div>
            
            <div style="margin-bottom: 16px;">
              <label for="editProfesorMail">Email:</label>
              <input type="email" id="editProfesorMail" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div>
                <label for="editProfesorDNI">DNI:</label>
                <input type="text" id="editProfesorDNI" placeholder="Ej: 12345678" maxlength="8" oninput="this.value=this.value.replace(/[^0-9]/g,'')" pattern="[0-9]*" inputmode="numeric" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
              </div>
              
              <div>
                <label for="editProfesorEspecialidad">Especialidad:</label>
                <input type="text" id="editProfesorEspecialidad" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div>
                <label for="editProfesorTelefono">TelÃ©fono:</label>
                <input type="tel" id="editProfesorTelefono" oninput="this.value=this.value.replace(/[^0-9]/g,'')" pattern="[0-9]*" inputmode="numeric" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
              </div>
              
              <div>
                <label for="editProfesorEstado">Estado:</label>
                <select id="editProfesorEstado" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="licencia">En Licencia</option>
                </select>
              </div>
            </div>
            
            <div style="margin-bottom: 16px; background: #fff3cd; padding: 15px; border: 2px solid #ff0000; border-radius: 8px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #000;"> IDIOMAS QUE ENSEÃ‘A (CAMPO DE PRUEBA):</label>
              <div id="idiomasMultiSelect" style="position: relative;">
                <div id="idiomasSelectedDisplay" style="min-height: 42px; padding: 8px; border: 2px solid #ff0000; border-radius: 4px; cursor: pointer; background: white; display: flex; flex-wrap: wrap; gap: 6px; align-items: center;">
                  <span style="color: #ff0000; font-size: 14px; font-weight: bold;" id="idiomasPlaceholder">Seleccionar idiomas...</span>
                </div>
                <div id="idiomasDropdown" style="display: none; position: absolute; z-index: 1000; width: 100%; max-height: 200px; overflow-y: auto; border: 1px solid #ddd; border-radius: 4px; background: white; margin-top: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                  <!-- Se llenarÃ¡n los idiomas dinÃ¡micamente -->
                </div>
              </div>
              <input type="hidden" id="editProfesorIdiomas" value="">
            </div>
            
            <div class="form-actions" style="margin-top: 24px; display: flex; gap: 10px; justify-content: space-between;">
              <button type="button" id="btnEditarCredencialesProfesor" class="btn-secondary" style="display: flex; align-items: center; gap: 8px;">
                <i data-lucide="key" style="width: 16px; height: 16px;"></i>
                Editar Credenciales
              </button>
              <div style="display: flex; gap: 10px;">
                <button type="button" class="close-modal">Cancelar</button>
                <button type="submit" class="btn-primary">Guardar Cambios</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('modalEditarProfesor');
  
  modal.querySelectorAll('.close-modal').forEach(btn => btn.addEventListener('click', () => modal.classList.remove('active')));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });

  const btnCredenciales = document.getElementById('btnEditarCredencialesProfesor');
  btnCredenciales.addEventListener('click', () => {
    const idProfesor = document.getElementById('editProfesorId').value;
    abrirModalCredencialesProfesor(idProfesor);
  });

  document.getElementById('formEditarProfesor').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const idProfesor = document.getElementById('editProfesorId').value;
    const idiomasValue = document.getElementById('editProfesorIdiomas').value;
    const data = {
      nombre: document.getElementById('editProfesorNombre').value.trim(),
      apellido: document.getElementById('editProfesorApellido').value.trim(),
      mail: document.getElementById('editProfesorMail').value.trim(),
      dni: document.getElementById('editProfesorDNI').value.trim(),
      especialidad: document.getElementById('editProfesorEspecialidad').value.trim(),
      telefono: document.getElementById('editProfesorTelefono').value.trim(),
      estado: document.getElementById('editProfesorEstado').value,
      idiomas: idiomasValue ? idiomasValue.split(',').map(id => parseInt(id)) : []
    };

    if (!data.nombre || !data.apellido || !data.mail || !data.dni || !data.especialidad || !data.telefono) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        heightAuto: false,
        didOpen: () => {
          const swalContainer = document.querySelector('.swal2-container');
          if (swalContainer) {
            swalContainer.style.zIndex = '99999';
          }
        }
      });
      return;
    }

    try {
      const resp = await fetch(`${API_URL}/profesores/${idProfesor}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await resp.json();

      if (resp.ok) {
        showToast('Profesor actualizado correctamente', 'success');
        modal.classList.remove('active');
        
        const section = document.querySelector('.sidebar-menu button.active').id.replace('btn', '').toLowerCase();
        if (section === 'profesores') {
          document.getElementById('btnProfesores').click();
        }
        
        if (document.getElementById('profesorPanel').classList.contains('active')) {
          openProfesorPanel(idProfesor);
        }
      } else {
        showToast(result.message || 'Error al actualizar', 'error');
      }
    } catch (error) {
      console.error('Error al actualizar profesor:', error);
      showToast('Error al actualizar profesor', 'error');
    }
  });
}

async function openEditarProfesorModal(idProfesor) {
  ensureEditarProfesorModal();
  const modal = document.getElementById('modalEditarProfesor');

  try {
    const resp = await fetch(`${API_URL}/profesores/${idProfesor}`);
    const profesor = await resp.json();
    
    console.log('Datos del profesor:', profesor);
    console.log('Idiomas IDs:', profesor.idiomas_ids);

    document.getElementById('editProfesorId').value = idProfesor;
    document.getElementById('editProfesorNombre').value = profesor.nombre;
    document.getElementById('editProfesorApellido').value = profesor.apellido;
    document.getElementById('editProfesorMail').value = profesor.mail;
    document.getElementById('editProfesorDNI').value = profesor.dni || '';
    document.getElementById('editProfesorEspecialidad').value = profesor.especialidad || '';
    document.getElementById('editProfesorTelefono').value = profesor.telefono || '';
    document.getElementById('editProfesorEstado').value = profesor.estado || 'activo';

    modal.classList.add('active');
    
    setTimeout(async () => {
      console.log('Inicializando selector de idiomas...');
      await initIdiomasMultiSelect('edit', profesor.idiomas_ids || []);
      lucide.createIcons();
    }, 100);
  } catch (error) {
    console.error('Error al cargar datos del profesor:', error);
    showToast('Error al cargar datos', 'error');
  }
}

async function abrirModalCredencialesProfesor(idProfesor) {
  try {
    const resp = await fetch(`${API_URL}/profesores/${idProfesor}`);
    const profesor = await resp.json();
    
    let usuarioActual = '';
    let passwordActual = '';
    let tienePassword = false;
    try {
      const respUsuario = await fetch(`${API_URL}/auth/usuario-classroom/${profesor.id_persona}`);
      if (respUsuario.ok) {
        const usuario = await respUsuario.json();
        usuarioActual = usuario.username || '';
        passwordActual = usuario.password_plain || '';
        tienePassword = usuario.password_plain ? true : false;
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    }

    const result = await Swal.fire({
      title: 'Editar Credenciales',
      html: `
        <div style="text-align: left;">
          <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; font-size: 13px; color: #1e40af;">
              Estas credenciales se usan para <strong>Dashboard y Classroom</strong>
            </p>
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px;">
              Usuario <span style="color: #9ca3af; font-weight: 400;">(actual: ${usuarioActual})</span>
            </label>
            <input type="text" id="usuarioProfesor" value="${usuarioActual}" 
                   onfocus="if(this.value === '${usuarioActual}') this.value = '';"
                   style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 14px; color: #9ca3af;">
          </div>
          
          <div style="margin-bottom: 8px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px;">
              ContraseÃ±a <span style="color: #9ca3af; font-weight: 400;">(actual: ${passwordActual || 'sin configurar'})</span>
            </label>
            <div style="position: relative;">
              <input type="text" id="passwordProfesor" value="${passwordActual}"
                     onfocus="if(this.value === '${passwordActual}') this.value = '';"
                     style="width: 100%; padding: 10px 40px 10px 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box; font-size: 14px; color: #9ca3af;">
              <button type="button" id="togglePasswordProfesor" 
                      style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; padding: 4px;">
                <i data-lucide="eye" style="width: 20px; height: 20px; color: #6b7280;"></i>
              </button>
            </div>
            <p style="font-size: 11px; color: #6b7280; margin-top: 4px;">
              DejÃ¡ vacÃ­o para mantener la contraseÃ±a actual
            </p>
          </div>
        </div>
      `,
      width: '500px',
      showCancelButton: true,
      confirmButtonText: 'Guardar Cambios',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#1e3c72',
      didOpen: () => {
        lucide.createIcons();
        
        const inputUsuario = document.getElementById('usuarioProfesor');
        inputUsuario.addEventListener('blur', () => {
          if (inputUsuario.value.trim() === '') {
            inputUsuario.value = '${usuarioActual}';
            inputUsuario.style.color = '#9ca3af';
          } else {
            inputUsuario.style.color = '#111827';
          }
        });
        
        const inputPassword = document.getElementById('passwordProfesor');
        inputPassword.addEventListener('blur', () => {
          if (inputPassword.value.trim() === '') {
            inputPassword.value = '${passwordActual}';
            inputPassword.style.color = '#9ca3af';
          } else {
            inputPassword.style.color = '#111827';
          }
        });
        
        const toggleBtn = document.getElementById('togglePasswordProfesor');
        toggleBtn.addEventListener('click', () => {
          const isPassword = inputPassword.type === 'password';
          inputPassword.type = isPassword ? 'text' : 'password';
          
          const iconHtml = isPassword ? '<i data-lucide="eye-off" style="width: 20px; height: 20px; color: #6b7280;"></i>' : '<i data-lucide="eye" style="width: 20px; height: 20px; color: #6b7280;"></i>';
          toggleBtn.innerHTML = iconHtml;
          lucide.createIcons();
        });
      },
      preConfirm: async () => {
        const usuario = document.getElementById('usuarioProfesor').value.trim();
        const password = document.getElementById('passwordProfesor').value.trim();
        
        const nuevoUsuario = (usuario === '' || usuario === '${usuarioActual}') ? '${usuarioActual}' : usuario;
        
        const nuevoPassword = (password === '' || password === '${passwordActual}') ? '' : password;
        
        if (!nuevoUsuario) {
          Swal.showValidationMessage('El usuario es obligatorio');
          return false;
        }
        
        return { usuario: nuevoUsuario, password: nuevoPassword };
      }
    });

    if (result.isConfirmed && result.value) {
      const { usuario, password } = result.value;

      try {
        const bodyData = {
          id_persona: profesor.id_persona,
          username: usuario
        };
        
        if (password && password.trim().length > 0) {
          bodyData.password = password;
        }
        
        const response = await fetch(`${API_URL}/auth/admin-cambiar-password-classroom`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyData)
        });
        
        if (response.ok) {
          const mensaje = password ? 'Usuario y contraseÃ±a actualizados correctamente' : 'Usuario actualizado correctamente';
          Swal.fire('Â¡Actualizado!', mensaje, 'success');
        } else {
          const data = await response.json();
          Swal.fire('Error', data.message || 'Error al actualizar credenciales', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
      }
    }
  } catch (error) {
    console.error('Error:', error);
    Swal.fire('Error', 'No se pudieron cargar las credenciales', 'error');
  }
}

async function cambiarEstadoProfesor(idProfesor, estadoActual) {
  const estados = {
    'activo': { siguiente: 'licencia', label: 'En Licencia', icon: 'pause-circle', color: 'warning' },
    'licencia': { siguiente: 'activo', label: 'Activo', icon: 'check-circle', color: 'success' },
    'inactivo': { siguiente: 'activo', label: 'Activo', icon: 'check-circle', color: 'success' }
  };

  const cambio = estados[estadoActual];
  if (!cambio) return;

  const confirmed = await showConfirm(
    'Â¿Cambiar estado del profesor?',
    `Se cambiarÃ¡ el estado a: <strong>${cambio.label}</strong>`,
    cambio.icon
  );

  if (!confirmed) return;

  try {
    const resp = await fetch(`${API_URL}/profesores/${idProfesor}/estado`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: cambio.siguiente })
    });

    const result = await resp.json();

    if (resp.ok) {
      showToast(`Estado cambiado a ${cambio.label}`, 'success');
      
      document.getElementById('btnProfesores').click();
      
      if (document.getElementById('profesorPanel').classList.contains('active')) {
        openProfesorPanel(idProfesor);
      }
    } else {
      showToast(result.message || 'Error al cambiar estado', 'error');
    }
  } catch (error) {
    console.error('Error al cambiar estado:', error);
    showToast('Error al cambiar estado', 'error');
  }
}

async function cambiarPasswordProfesorDashboard(idProfesor) {
  const { value: formValues } = await Swal.fire({
    title: 'Cambiar ContraseÃ±a del Dashboard',
    html: `
      <div style="text-align: left;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Nueva ContraseÃ±a:</label>
        <input id="swal-password" type="password" class="swal2-input" placeholder="MÃ­nimo 6 caracteres" style="margin: 0 0 16px 0;">
        
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Confirmar ContraseÃ±a:</label>
        <input id="swal-password-confirm" type="password" class="swal2-input" placeholder="Repetir contraseÃ±a" style="margin: 0;">
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Cambiar',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const password = document.getElementById('swal-password').value;
      const confirm = document.getElementById('swal-password-confirm').value;
      
      if (!password || !confirm) {
        Swal.showValidationMessage('Por favor complete ambos campos');
        return false;
      }
      
      if (password.length < 6) {
        Swal.showValidationMessage('La contraseÃ±a debe tener al menos 6 caracteres');
        return false;
      }
      
      if (password !== confirm) {
        Swal.showValidationMessage('Las contraseÃ±as no coinciden');
        return false;
      }
      
      return { password };
    }
  });

  if (!formValues) return;

  try {
    const resp = await fetch(`${API_URL}/profesores/${idProfesor}/cambiar-password-dashboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: formValues.password })
    });

    const result = await resp.json();

    if (resp.ok) {
      Swal.fire('Â¡Ã‰xito!', 'ContraseÃ±a del Dashboard actualizada correctamente', 'success');
    } else {
      Swal.fire('Error', result.message || 'No se pudo cambiar la contraseÃ±a', 'error');
    }
  } catch (error) {
    console.error('Error al cambiar contraseÃ±a:', error);
    Swal.fire('Error', 'OcurriÃ³ un error al cambiar la contraseÃ±a', 'error');
  }
}

async function cambiarPasswordProfesorClassroom(idProfesor) {
  let idPersona;
  try {
    const resp = await fetch(`${API_URL}/profesores/${idProfesor}`);
    const profesor = await resp.json();
    idPersona = profesor.id_persona;
  } catch (error) {
    Swal.fire('Error', 'No se pudo obtener la informaciÃ³n del profesor', 'error');
    return;
  }

  const { value: formValues } = await Swal.fire({
    title: 'Cambiar ContraseÃ±a del Classroom',
    html: `
      <div style="text-align: left;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Nueva ContraseÃ±a:</label>
        <input id="swal-password-class" type="password" class="swal2-input" placeholder="MÃ­nimo 6 caracteres" style="margin: 0 0 16px 0;">
        
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Confirmar ContraseÃ±a:</label>
        <input id="swal-password-class-confirm" type="password" class="swal2-input" placeholder="Repetir contraseÃ±a" style="margin: 0;">
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Cambiar',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const password = document.getElementById('swal-password-class').value;
      const confirm = document.getElementById('swal-password-class-confirm').value;
      
      if (!password || !confirm) {
        Swal.showValidationMessage('Por favor complete ambos campos');
        return false;
      }
      
      if (password.length < 6) {
        Swal.showValidationMessage('La contraseÃ±a debe tener al menos 6 caracteres');
        return false;
      }
      
      if (password !== confirm) {
        Swal.showValidationMessage('Las contraseÃ±as no coinciden');
        return false;
      }
      
      return { password };
    }
  });

  if (!formValues) return;

  try {
    const resp = await fetch(`${API_URL}/auth/admin-cambiar-password-classroom`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        id_persona: idPersona,
        password: formValues.password 
      })
    });

    const result = await resp.json();

    if (resp.ok) {
      Swal.fire('Â¡Ã‰xito!', 'ContraseÃ±a del Classroom actualizada correctamente', 'success');
    } else {
      Swal.fire('Error', result.message || 'No se pudo cambiar la contraseÃ±a', 'error');
    }
  } catch (error) {
    console.error('Error al cambiar contraseÃ±a:', error);
    Swal.fire('Error', 'OcurriÃ³ un error al cambiar la contraseÃ±a', 'error');
  }
}

async function darDeBajaProfesor(idProfesor, nombre) {
  const confirmed = await showConfirm(
    'Â¿Dar de baja al profesor?',
    `Â¿EstÃ¡s seguro de dar de baja a <strong>${nombre}</strong>?<br>El profesor serÃ¡ marcado como inactivo.`,
    'user-x',
    true
  );

  if (!confirmed) return;

  try {
    const resp = await fetch(`${API_URL}/profesores/${idProfesor}/estado`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: 'inactivo' })
    });

    const result = await resp.json();

    if (resp.ok) {
      showToast('Profesor dado de baja correctamente', 'success');
      
      document.getElementById('profesorPanel').classList.remove('active');
      
      document.getElementById('btnProfesores').click();
    } else {
      showToast(result.message || 'Error al dar de baja', 'error');
    }
  } catch (error) {
    console.error('Error al dar de baja:', error);
    showToast('Error al dar de baja', 'error');
  }
}

function showConfirm(title, message, icon = 'alert-circle', isDanger = false) {
  return new Promise((resolve) => {
    const existingModal = document.getElementById('confirmModal');
    if (existingModal) existingModal.remove();

    const modalHtml = `
      <div id="confirmModal" class="confirm-modal">
        <div class="confirm-modal-content">
          <div class="confirm-modal-icon ${isDanger ? 'danger' : ''}">
            <i data-lucide="${icon}" style="width: 32px; height: 32px;"></i>
          </div>
          <h3>${title}</h3>
          <p>${message}</p>
          <div class="confirm-modal-actions">
            <button class="btn-cancel" onclick="document.getElementById('confirmModal').remove()">Cancelar</button>
            <button class="btn-confirm ${isDanger ? 'danger' : ''}" id="btnConfirmAction">Confirmar</button>
          </div>
        </div>
      </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    const modal = document.getElementById('confirmModal');
    setTimeout(() => modal.classList.add('active'), 10);

    if (typeof lucide !== 'undefined') lucide.createIcons();

    document.getElementById('btnConfirmAction').onclick = () => {
      modal.remove();
      resolve(true);
    };

    modal.querySelector('.btn-cancel').onclick = () => {
      modal.remove();
      resolve(false);
    };

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        resolve(false);
      }
    });
  });
}


let allPagos = [];
let pagosStats = {};

async function loadPagosData(queryParams = '') {
  try {
    console.log('Cargando datos de pagos con query:', queryParams);
    const resp = await fetch(`${API_URL}/pagos${queryParams}`);
    console.log('Response status:', resp.status);
    
    const data = await resp.json();
    console.log('Datos recibidos:', data);
    
    allPagos = data.pagos || [];
    pagosStats = data.estadisticas || {};

    console.log('Pagos:', allPagos.length, 'Stats:', pagosStats);

    document.getElementById('metricTotalMes').textContent = parseFloat(pagosStats.total_mes || 0).toLocaleString('es-AR', {minimumFractionDigits: 2});
    document.getElementById('metricCobradas').textContent = pagosStats.cuotas_cobradas || 0;
    document.getElementById('metricPendientes').textContent = pagosStats.cuotas_pendientes || 0;
    document.getElementById('metricPromedio').textContent = parseFloat(pagosStats.promedio_pago || 0).toLocaleString('es-AR', {minimumFractionDigits: 0});

    const mediosPago = [...new Set(allPagos.map(p => p.medio_pago))];
    const selectMedio = document.getElementById('pagoFilterMedio');
    selectMedio.innerHTML = '<option value="">Todos</option>' + 
      mediosPago.map(m => `<option value="${m}">${m}</option>`).join('');

    renderPagosTable(allPagos);

    setupPagosFilters();

  } catch (error) {
    console.error('Error al cargar pagos:', error);
    document.getElementById('pagosTableBody').innerHTML = `
      <tr><td colspan="7" style="text-align: center; padding: 40px; color: #f44336;">
        Error al cargar los pagos
      </td></tr>`;
  }
}

function renderPagosTable(pagos) {
  const tbody = document.getElementById('pagosTableBody');
  
  if (pagos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 40px; color: #999;">No hay pagos para mostrar</td></tr>`;
    return;
  }

  tbody.innerHTML = pagos.map(p => {
    const estadoBadgeClass = {
      'en_proceso': 'warning',
      'pagado': 'success',
      'anulado': 'danger'
    };

    const estadoTexto = {
      'en_proceso': 'En Proceso',
      'pagado': 'Pagado',
      'anulado': 'Anulado'
    };

    const estado = p.estado_pago || 'en_proceso';
    const badgeClass = estadoBadgeClass[estado] || 'warning';
    const textoEstado = estadoTexto[estado] || estado;
    const archivado = p.archivado || 0;

    let botonesAccion = '';
    
    if (estado === 'en_proceso') {
      botonesAccion = `
        <button 
          class="btn-confirm-pago" 
          onclick="event.stopPropagation(); confirmarPago(${p.id_pago}, '${p.alumno}', '${p.concepto}')"
          title="Confirmar pago">
          <i data-lucide="check"></i>
        </button>
        <button 
          class="btn-delete-pago" 
          onclick="event.stopPropagation(); anularPago(${p.id_pago}, '${p.alumno}', '${p.concepto}')"
          title="Anular pago">
          <i data-lucide="trash-2"></i>
        </button>
      `;
    } else if (estado === 'pagado') {
      botonesAccion = `
        <button 
          class="btn-print-ticket" 
          onclick="event.stopPropagation(); generarComprobantePago(${p.id_pago})"
          title="Generar comprobante">
          <i data-lucide="file-text"></i>
        </button>
        <button 
          class="btn-delete-pago" 
          onclick="event.stopPropagation(); anularPago(${p.id_pago}, '${p.alumno}', '${p.concepto}')"
          title="Anular pago">
          <i data-lucide="trash-2"></i>
        </button>
      `;
    } else if (estado === 'anulado' && archivado === 0) {
      botonesAccion = `
        <button 
          class="btn-archive-pago" 
          onclick="event.stopPropagation(); archivarPago(${p.id_pago}, '${p.alumno}', '${p.concepto}')"
          title="Archivar pago">
          <i data-lucide="archive"></i>
        </button>
      `;
    } else if (estado === 'anulado' && archivado === 1) {
      // Pagos archivados muestran botÃ³n de desarchivar y eliminar
      const alumnoEscaped = p.alumno.replace(/'/g, "\\'");
      const conceptoEscaped = p.concepto.replace(/'/g, "\\'");
      
      botonesAccion = `
        <button 
          class="btn-unarchive-pago" 
          onclick="event.stopPropagation(); desarchivarPago(${p.id_pago}, '${alumnoEscaped}', '${conceptoEscaped}')"
          title="Devolver a pagos activos">
          <i data-lucide="archive-restore"></i>
        </button>
        <button 
          class="btn-delete-permanent" 
          onclick="event.stopPropagation(); eliminarPagoDefinitivamente(${p.id_pago}, '${alumnoEscaped}', '${conceptoEscaped}')"
          title="Eliminar permanentemente">
          <i data-lucide="x"></i>
        </button>
      `;
    }

    return `
      <tr>
        <td onclick="openPagoPanel(${p.id_alumno})" style="cursor: pointer;">
          <div style="font-weight: 600;">${p.alumno}</div>
          <div style="font-size: 12px; color: #999;">Legajo: ${p.legajo}</div>
        </td>
        <td onclick="openPagoPanel(${p.id_alumno})" style="cursor: pointer;">${p.concepto}</td>
        <td onclick="openPagoPanel(${p.id_alumno})" style="cursor: pointer;">${p.periodo || '-'}</td>
        <td onclick="openPagoPanel(${p.id_alumno})" style="cursor: pointer; font-weight: 600; color: #4caf50;">$${parseFloat(p.monto).toLocaleString('es-AR', {minimumFractionDigits: 2})}</td>
        <td onclick="openPagoPanel(${p.id_alumno})" style="cursor: pointer;">${p.fecha_pago ? new Date(p.fecha_pago).toLocaleDateString('es-AR') : '-'}</td>
        <td onclick="openPagoPanel(${p.id_alumno})" style="cursor: pointer;">${p.medio_pago}</td>
        <td onclick="openPagoPanel(${p.id_alumno})" style="cursor: pointer;">
          <span class="badge-estado ${badgeClass}">
            ${textoEstado}
          </span>
        </td>
        <td style="text-align: center;">
          ${botonesAccion}
        </td>
      </tr>
    `;
  }).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function switchPagosTab(tab) {
  document.querySelectorAll('.pagos-tab').forEach(t => {
    if (t.dataset.tab === tab) {
      t.classList.add('active');
      t.style.borderBottomColor = '#667eea';
      t.style.color = '#667eea';
    } else {
      t.classList.remove('active');
      t.style.borderBottomColor = 'transparent';
      t.style.color = '#666';
    }
  });

  const metricsContainer = document.getElementById('pagosMetrics');
  const filtersContainer = document.getElementById('pagosFilters');
  const tableContainer = document.getElementById('pagosTableContainer');
  const cuotasContainer = document.getElementById('cuotasGestionContainer');

  if (tab === 'cuotas') {
    if (metricsContainer) metricsContainer.style.display = 'none';
    if (filtersContainer) filtersContainer.style.display = 'none';
    if (tableContainer) tableContainer.style.display = 'none';
    if (cuotasContainer) {
      cuotasContainer.style.display = 'block';
      loadCuotasGestion();
    }
  } else {
    if (metricsContainer) metricsContainer.style.display = 'grid';
    if (filtersContainer) filtersContainer.style.display = 'flex';
    if (tableContainer) tableContainer.style.display = 'block';
    if (cuotasContainer) cuotasContainer.style.display = 'none';

    if (tab === 'archivo') {
      loadPagosData('?archivo=true');
    } else {
      loadPagosData();
    }
  }

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function setupPagosFilters() {
  const searchInput = document.getElementById('pagoSearchAlumno');
  const medioFilter = document.getElementById('pagoFilterMedio');

  if (searchInput) searchInput.addEventListener('input', filterPagos);
  if (medioFilter) medioFilter.addEventListener('change', filterPagos);
}

function filterPagos() {
  const searchTerm = document.getElementById('pagoSearchAlumno')?.value.toLowerCase() || '';
  const medioFilter = document.getElementById('pagoFilterMedio')?.value || '';

  const filtered = allPagos.filter(p => {
    const matchesSearch = 
      p.alumno.toLowerCase().includes(searchTerm) ||
      p.legajo.toLowerCase().includes(searchTerm) ||
      (p.concepto && p.concepto.toLowerCase().includes(searchTerm));
    
    const matchesMedio = !medioFilter || p.medio_pago === medioFilter;

    return matchesSearch && matchesMedio;
  });

  renderPagosTable(filtered);
}

function ensurePagoPanel() {
  if (document.getElementById('pagoPanel')) return;

  const panelHtml = `
    <div id="pagoPanel" class="pago-panel">
      <div class="pago-panel-header">
        <div class="pago-panel-alumno-info">
          <div class="pago-panel-avatar" id="pagoPanelAvatar">AA</div>
          <div class="pago-panel-details">
            <h2 id="pagoPanelNombre">Cargando...</h2>
            <p id="pagoPanelLegajo">Legajo: ---</p>
          </div>
        </div>
      </div>
      <div class="pago-panel-content" id="pagoPanelContent">
        <div style="text-align: center; padding: 40px; color: #999;">
          <i data-lucide="loader" style="width: 32px; height: 32px; animation: spin 1s linear infinite;"></i>
          <p>Cargando historial...</p>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', panelHtml);

  const panel = document.getElementById('pagoPanel');
  
  document.addEventListener('click', (e) => {
    if (panel.classList.contains('active') && !panel.contains(e.target) && !e.target.closest('.pagos-table tbody tr')) {
      panel.classList.remove('active');
    }
  });
  
  let mouseLeaveTimeout;
  panel.addEventListener('mouseleave', () => {
    mouseLeaveTimeout = setTimeout(() => {
      panel.classList.remove('active');
    }, 500);
  });
  
  panel.addEventListener('mouseenter', () => {
    clearTimeout(mouseLeaveTimeout);
  });
}

async function openPagoPanel(idAlumno) {
  ensurePagoPanel();
  const panel = document.getElementById('pagoPanel');
  panel.classList.add('active');

  try {
    const [alumnoResp, pagosResp] = await Promise.all([
      fetch(`${API_URL}/alumnos/${idAlumno}`),
      fetch(`${API_URL}/pagos/alumno/${idAlumno}/historial`)
    ]);
    
    const alumno = await alumnoResp.json();
    const pagosData = await pagosResp.json();

    const historial = pagosData.pagos_realizados || [];
    const estado_cuenta = {
      total_pagado: pagosData.estadisticas?.total_pagado || 0,
      total_pagos: pagosData.estadisticas?.cantidad_pagos || 0,
      pagos_vencidos: pagosData.pagos_pendientes?.filter(p => p.estado === 'vencido').length || 0,
      ultimo_pago: historial.length > 0 ? historial[0].fecha_pago : null
    };

    const nombreCompleto = `${alumno.nombre} ${alumno.apellido}`;
    const iniciales = nombreCompleto.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase();
    document.getElementById('pagoPanelAvatar').textContent = iniciales;
    document.getElementById('pagoPanelNombre').textContent = nombreCompleto;
    document.getElementById('pagoPanelLegajo').textContent = `Legajo: ${alumno.legajo} â€¢ ${alumno.mail}`;

    const content = document.getElementById('pagoPanelContent');
    content.innerHTML = `
      <!-- Estado de Cuenta -->
      <div class="pago-section">
        <h3><i data-lucide="credit-card"></i> Estado de Cuenta</h3>
        <div class="estado-cuenta-grid">
          <div class="estado-cuenta-card highlight">
            <div class="estado-cuenta-label">Total Pagado</div>
            <div class="estado-cuenta-value">$${parseFloat(estado_cuenta.total_pagado || 0).toLocaleString('es-AR', {minimumFractionDigits: 2})}</div>
          </div>
          <div class="estado-cuenta-card">
            <div class="estado-cuenta-label">Pagos Realizados</div>
            <div class="estado-cuenta-value">${estado_cuenta.total_pagos || 0}</div>
          </div>
          <div class="estado-cuenta-card ${estado_cuenta.pagos_vencidos > 0 ? 'danger' : ''}">
            <div class="estado-cuenta-label">Pagos Vencidos</div>
            <div class="estado-cuenta-value">${estado_cuenta.pagos_vencidos || 0}</div>
          </div>
        </div>
        ${estado_cuenta.ultimo_pago ? `
          <p style="font-size: 13px; color: #666; margin-top: 12px;">
            Ãšltimo pago: ${new Date(estado_cuenta.ultimo_pago).toLocaleDateString('es-AR', {year: 'numeric', month: 'long', day: 'numeric'})}
          </p>
        ` : '<p style="font-size: 13px; color: #999; margin-top: 12px;">Sin pagos registrados</p>'}
      </div>

      <!-- Historial de Pagos -->
      <div class="pago-section">
        <h3><i data-lucide="history"></i> Historial de Pagos (${historial.length})</h3>
        ${historial.length > 0 ? `
          <div class="historial-timeline">
            ${historial.map(h => `
              <div class="historial-item">
                <div class="historial-item-header">
                  <div class="historial-item-title">${h.concepto}</div>
                  <div class="historial-item-monto">$${parseFloat(h.monto).toLocaleString('es-AR', {minimumFractionDigits: 2})}</div>
                </div>
                <div class="historial-item-details">
                  <div class="historial-item-detail">
                    <i data-lucide="calendar"></i>
                    <span>${h.periodo || 'Sin periodo'}</span>
                  </div>
                  <div class="historial-item-detail">
                    <i data-lucide="credit-card"></i>
                    <span>${h.medio_pago}</span>
                  </div>
                  <div class="historial-item-detail">
                    <i data-lucide="check-circle"></i>
                    <span>${h.fecha_pago ? new Date(h.fecha_pago).toLocaleDateString('es-AR') : 'Pendiente'}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : '<p style="text-align: center; color: #999; padding: 40px;">No hay historial de pagos</p>'}
      </div>
    `;

    if (typeof lucide !== 'undefined') lucide.createIcons();

  } catch (error) {
    console.error('Error al cargar panel de pago:', error);
    document.getElementById('pagoPanelContent').innerHTML = `
      <div style="text-align: center; padding: 40px; color: #f44336;">
        <i data-lucide="alert-circle" style="width: 32px; height: 32px;"></i>
        <p>Error al cargar el historial de pagos</p>
      </div>`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

async function confirmarPago(idPago, nombreAlumno, concepto) {
  const confirmed = await showConfirm(
    'Â¿Confirmar pago?',
    `Â¿EstÃ¡s seguro de confirmar el pago de <strong>${nombreAlumno}</strong>?<br>Concepto: ${concepto}<br><br>El estado cambiarÃ¡ a <strong>PAGADO</strong> y se registrarÃ¡ la fecha actual.`,
    'check',
    false
  );

  if (!confirmed) return;

  try {
    const resp = await fetch(`${API_URL}/pagos/${idPago}/confirmar`, {
      method: 'PUT'
    });

    const result = await resp.json();

    if (resp.ok && result.success) {
      showToast('Pago confirmado correctamente', 'success');
      await loadPagosData();
    } else {
      showToast(result.message || 'Error al confirmar pago', 'error');
    }
  } catch (error) {
    console.error('Error al confirmar pago:', error);
    showToast('Error al confirmar pago', 'error');
  }
}

async function anularPago(idPago, nombreAlumno, concepto) {
  const confirmed = await showConfirm(
    'Â¿Anular pago?',
    `Â¿EstÃ¡s seguro de anular el pago de <strong>${nombreAlumno}</strong>?<br>Concepto: ${concepto}<br><br>El estado cambiarÃ¡ a <strong>ANULADO</strong> y se conservarÃ¡ en el registro.`,
    'trash-2',
    true
  );

  if (!confirmed) return;

  try {
    const resp = await fetch(`${API_URL}/pagos/${idPago}/anular`, {
      method: 'PUT'
    });

    const result = await resp.json();

    if (resp.ok && result.success) {
      showToast('Pago anulado correctamente', 'success');
      await loadPagosData();
    } else {
      showToast(result.message || 'Error al anular pago', 'error');
    }
  } catch (error) {
    console.error('Error al anular pago:', error);
    showToast('Error al anular pago', 'error');
  }
}

// Archivar pago anulado
async function archivarPago(idPago, nombreAlumno, concepto) {
  const confirmed = await showConfirm(
    'Â¿Archivar pago?',
    `Â¿EstÃ¡s seguro de archivar el pago anulado de <strong>${nombreAlumno}</strong>?<br>Concepto: ${concepto}<br><br>Se moverÃ¡ a la pestaÃ±a de <strong>ARCHIVO</strong>.`,
    'archive',
    false
  );

  if (!confirmed) return;

  try {
    const resp = await fetch(`${API_URL}/pagos/${idPago}/archivar`, {
      method: 'PUT'
    });

    const result = await resp.json();

    if (resp.ok && result.success) {
      showToast('Pago archivado correctamente', 'success');
      await loadPagosData();
    } else {
      showToast(result.message || 'Error al archivar pago', 'error');
    }
  } catch (error) {
    console.error('Error al archivar pago:', error);
    showToast('Error al archivar pago', 'error');
  }
}

// Desarchivar pago (devolver a pagos activos)
async function desarchivarPago(idPago, nombreAlumno, concepto) {
  const confirmed = await showConfirm(
    'Â¿Devolver a pagos activos?',
    `Â¿EstÃ¡s seguro de devolver el pago de <strong>${nombreAlumno}</strong> a pagos activos?<br>Concepto: ${concepto}<br><br>MantendrÃ¡ su estado de <strong>ANULADO</strong>.`,
    'archive',
    false
  );

  if (!confirmed) return;

  try {
    const resp = await fetch(`${API_URL}/pagos/${idPago}/desarchivar`, {
      method: 'PUT'
    });

    const result = await resp.json();

    if (resp.ok && result.success) {
      showToast('Pago devuelto a pagos activos', 'success');
      await loadPagosData('?archivo=true');
    } else {
      showToast(result.message || 'Error al desarchivar pago', 'error');
    }
  } catch (error) {
    console.error('Error al desarchivar pago:', error);
    showToast('Error al desarchivar pago', 'error');
  }
}

async function eliminarPagoDefinitivamente(idPago, nombreAlumno, concepto) {
  const result = await Swal.fire({
    title: 'ï¸ ELIMINAR PERMANENTEMENTE',
    html: `
      <div style="text-align: left; margin: 20px 0;">
        <p style="font-size: 15px; margin-bottom: 15px;">
          EstÃ¡s a punto de <strong style="color: #f44336;">eliminar permanentemente</strong> el siguiente registro:
        </p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p style="margin: 5px 0;"><strong>Alumno:</strong> ${nombreAlumno}</p>
          <p style="margin: 5px 0;"><strong>Concepto:</strong> ${concepto}</p>
        </div>
        <p style="color: #f44336; font-weight: 600; margin-top: 15px;">
          ï¸ Esta acciÃ³n NO se puede deshacer
        </p>
        <p style="font-size: 14px; color: #666; margin-top: 10px;">
          El registro serÃ¡ eliminado completamente de la base de datos.
        </p>
      </div>
    `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#f44336',
    cancelButtonColor: '#999',
    confirmButtonText: 'SÃ­, eliminar permanentemente',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
    customClass: {
      popup: 'swal2-popup-large'
    }
  });

  if (!result.isConfirmed) return;

  try {
    console.log('Eliminando pago ID:', idPago);
    const resp = await fetch(`${API_URL}/pagos/${idPago}`, {
      method: 'DELETE'
    });

    console.log('DELETE Response status:', resp.status);
    const data = await resp.json();
    console.log('DELETE Response data:', data);

    if (resp.ok && data.success) {
      showToast('Pago eliminado permanentemente', 'success');
      window.currentPagosTab = 'archivo';
      await loadPagosData('?archivo=true');
      switchPagosTab('archivo');
    } else {
      showToast(data.message || 'Error al eliminar pago', 'error');
    }
  } catch (error) {
    console.error('Error al eliminar pago:', error);
    showToast('Error al eliminar pago', 'error');
  }
}

async function openRegistrarPagoModal() {
  try {
    const responseInscripciones = await fetch(`${API_URL}/inscripciones`);
    const todasInscripciones = await responseInscripciones.json();
    
    if (!todasInscripciones || todasInscripciones.length === 0) {
      showToast('No hay alumnos con cursos activos', 'warning');
      return;
    }

    const alumnosConCursos = [...new Map(
      todasInscripciones
        .filter(insc => insc.estado === 'activo')
        .map(insc => [insc.id_alumno, insc.alumno])
    ).entries()].map(([id, nombre]) => ({ id_alumno: id, nombre_completo: nombre }));

    if (alumnosConCursos.length === 0) {
      showToast('No hay alumnos con cursos activos', 'warning');
      return;
    }

    const alumnosOptions = alumnosConCursos.map(alumno => 
      `<option value="${alumno.id_alumno}">${alumno.nombre_completo}</option>`
    ).join('');

    const { value: formValues } = await Swal.fire({
      title: '<div style="display: flex; align-items: center; gap: 12px;"><i class="lucide-credit-card" style="width: 28px; height: 28px; color: #1976d2;"></i> Registrar Pago Manual</div>',
      html: `
        <div style="text-align: left;">
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">
              <i class="lucide-user" style="width: 16px; height: 16px;"></i> Alumno
            </label>
            <select id="swal-alumno" class="swal2-input" style="width: 100%; margin: 0;">
              <option value="">Seleccionar alumno...</option>
              ${alumnosOptions}
            </select>
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">
              <i class="lucide-book-open" style="width: 16px; height: 16px;"></i> Curso
            </label>
            <select id="swal-curso" class="swal2-input" style="width: 100%; margin: 0;" disabled>
              <option value="">Primero selecciona un alumno</option>
            </select>
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">
              <i class="lucide-calendar" style="width: 16px; height: 16px;"></i> Mes de Cuota
            </label>
            <select id="swal-mes" class="swal2-input" style="width: 100%; margin: 0;" disabled>
              <option value="">Primero selecciona un curso</option>
            </select>
            <div id="meses-pagados-info" style="margin-top: 8px; font-size: 12px;"></div>
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">
              <i class="lucide-dollar-sign" style="width: 16px; height: 16px;"></i> Monto
            </label>
            <input id="swal-monto" type="number" class="swal2-input" placeholder="Ej: 15000" style="width: 100%; margin: 0;" step="0.01">
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">
              <i class="lucide-wallet" style="width: 16px; height: 16px;"></i> Medio de Pago
            </label>
            <select id="swal-medio-pago" class="swal2-input" style="width: 100%; margin: 0;">
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Tarjeta de CrÃ©dito">Tarjeta de CrÃ©dito</option>
              <option value="Tarjeta de DÃ©bito">Tarjeta de DÃ©bito</option>
            </select>
          </div>

          <div style="background: #e3f2fd; border-left: 4px solid #1976d2; padding: 12px; border-radius: 4px; margin-top: 20px;">
            <p style="margin: 0; font-size: 13px; color: #1565c0;">
              <i class="lucide-info" style="width: 14px; height: 14px;"></i> 
              Este pago se registrarÃ¡ como pagado en la fecha actual
            </p>
          </div>
        </div>
      `,
      width: '600px',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: '<i class="lucide-check" style="width: 16px; height: 16px;"></i> Registrar Pago',
      cancelButtonText: '<i class="lucide-x" style="width: 16px; height: 16px;"></i> Cancelar',
      confirmButtonColor: '#1976d2',
      cancelButtonColor: '#757575',
      didOpen: () => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }

        const alumnoSelect = document.getElementById('swal-alumno');
        const cursoSelect = document.getElementById('swal-curso');
        const mesSelect = document.getElementById('swal-mes');
        const montoInput = document.getElementById('swal-monto');
        const mesesPagadosInfo = document.getElementById('meses-pagados-info');

        let pagosPorCurso = {}; // Guardar pagos ya realizados por curso

        alumnoSelect.addEventListener('change', async (e) => {
          const idAlumno = e.target.value;
          
          if (!idAlumno) {
            cursoSelect.innerHTML = '<option value="">Primero selecciona un alumno</option>';
            cursoSelect.disabled = true;
            mesSelect.innerHTML = '<option value="">Primero selecciona un curso</option>';
            mesSelect.disabled = true;
            montoInput.value = '';
            mesesPagadosInfo.innerHTML = '';
            return;
          }

          try {
            cursoSelect.innerHTML = '<option value="">Cargando cursos...</option>';
            cursoSelect.disabled = true;

            const response = await fetch(`${API_URL}/inscripciones/alumno/${idAlumno}`);
            const inscripciones = await response.json();

            if (!inscripciones || inscripciones.length === 0) {
              cursoSelect.innerHTML = '<option value="">Este alumno no tiene cursos</option>';
              cursoSelect.disabled = true;
              return;
            }

            const cursosActivos = inscripciones.filter(i => i.estado === 'activo');

            if (cursosActivos.length === 0) {
              cursoSelect.innerHTML = '<option value="">No hay cursos activos</option>';
              cursoSelect.disabled = true;
              return;
            }

            const responsePagos = await fetch(`${API_URL}/pagos/alumno/${idAlumno}`);
            const datosPagos = await responsePagos.json();

            pagosPorCurso = {};
            if (datosPagos.cursos) {
              datosPagos.cursos.forEach(curso => {
                const mesesPagados = curso.meses
                  .filter(m => m.estado === 'pagado')
                  .map(m => m.mes);
                pagosPorCurso[curso.id_curso] = mesesPagados;
                console.log(`Curso ${curso.id_curso} - Meses pagados:`, mesesPagados);
              });
            }

            cursoSelect.innerHTML = '<option value="">Seleccionar curso...</option>' + 
              cursosActivos.map(insc => 
                `<option value="${insc.id_curso}" data-monto="${insc.costo_mensual}">
                  ${insc.idioma} ${insc.nivel}
                </option>`
              ).join('');
            cursoSelect.disabled = false;

          } catch (error) {
            console.error('Error al cargar cursos:', error);
            cursoSelect.innerHTML = '<option value="">Error al cargar cursos</option>';
          }
        });

        cursoSelect.addEventListener('change', async (e) => {
          const idCurso = e.target.value;
          const selectedOption = e.target.options[e.target.selectedIndex];
          const monto = selectedOption.dataset.monto;
          
          if (!idCurso) {
            mesSelect.innerHTML = '<option value="">Primero selecciona un curso</option>';
            mesSelect.disabled = true;
            mesesPagadosInfo.innerHTML = '';
            montoInput.value = '';
            return;
          }

          let cuotasHabilitadas = [];
          try {
            const respCuotas = await fetch(`${API_URL}/cursos/${idCurso}/cuotas`);
            const dataCuotas = await respCuotas.json();
            cuotasHabilitadas = dataCuotas.cuotasHabilitadas || [];
            console.log(`Cuotas habilitadas para curso ${idCurso}:`, cuotasHabilitadas);
          } catch (error) {
            console.error('Error al obtener cuotas habilitadas:', error);
            cuotasHabilitadas = ['Matricula', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre'];
          }

          const mesesPagados = pagosPorCurso[idCurso] || [];
          console.log(`Curso seleccionado: ${idCurso}, Meses pagados:`, mesesPagados);
          
          const todosMeses = ['Matricula', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre'];
          
          const mesesNoHabilitados = todosMeses.filter(mes => !cuotasHabilitadas.includes(mes));
          const hayAlgunMesDisponible = todosMeses.some(mes => cuotasHabilitadas.includes(mes) && !mesesPagados.includes(mes));
          
          if (!hayAlgunMesDisponible) {
            mesSelect.innerHTML = '<option value="">No hay cuotas disponibles para este curso</option>';
            mesSelect.disabled = true;
            
            if (mesesPagados.length === todosMeses.length) {
              mesesPagadosInfo.innerHTML = '<div style="color: #43a047; background: #e8f5e9; padding: 8px; border-radius: 4px;"><i class="lucide-check-circle" style="width: 14px; height: 14px;"></i>  Todas las cuotas de este curso estÃ¡n pagadas</div>';
            } else if (cuotasHabilitadas.length === 0) {
              mesesPagadosInfo.innerHTML = '<div style="color: #f57c00; background: #fff3e0; padding: 8px; border-radius: 4px;"><i class="lucide-alert-circle" style="width: 14px; height: 14px;"></i> Este curso no tiene cuotas habilitadas</div>';
            } else {
              mesesPagadosInfo.innerHTML = '<div style="color: #43a047; background: #e8f5e9; padding: 8px; border-radius: 4px;"><i class="lucide-check-circle" style="width: 14px; height: 14px;"></i> Todas las cuotas habilitadas estÃ¡n pagadas</div>';
            }
          } else {
            const opciones = todosMeses.map(mes => {
              const yaPagado = mesesPagados.includes(mes);
              const noHabilitado = !cuotasHabilitadas.includes(mes);
              const disabled = yaPagado || noHabilitado;
              
              let label = mes;
              if (yaPagado) label += ' (Ya pagado)';
              else if (noHabilitado) label += ' (No habilitado)';
              
              return `<option value="${mes}" ${disabled ? 'disabled' : ''} style="${disabled ? 'color: #999; background: #f5f5f5;' : ''}">${label}</option>`;
            }).join('');
            
            mesSelect.innerHTML = '<option value="">Seleccionar mes...</option>' + opciones;
            mesSelect.disabled = false;
            
            const infoParts = [];
            if (mesesPagados.length > 0) {
              infoParts.push(`<div style="color: #1565c0; background: #e3f2fd; padding: 8px; border-radius: 4px; margin-bottom: 4px;">
                <i class="lucide-check" style="width: 14px; height: 14px;"></i> Ya pagado: ${mesesPagados.join(', ')}
              </div>`);
            }
            if (mesesNoHabilitados.length > 0) {
              infoParts.push(`<div style="color: #f57c00; background: #fff3e0; padding: 8px; border-radius: 4px;">
                <i class="lucide-lock" style="width: 14px; height: 14px;"></i> No habilitado: ${mesesNoHabilitados.join(', ')}
              </div>`);
            }
            if (infoParts.length === 0) {
              infoParts.push('<div style="color: #757575;">Todas las cuotas estÃ¡n disponibles</div>');
            }
            mesesPagadosInfo.innerHTML = infoParts.join('');
          }

          if (monto) {
            montoInput.value = monto;
          }

          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
        });
      },
      preConfirm: () => {
        const idAlumno = document.getElementById('swal-alumno').value;
        const idCurso = document.getElementById('swal-curso').value;
        const mesCuota = document.getElementById('swal-mes').value;
        const monto = document.getElementById('swal-monto').value;
        const medioPago = document.getElementById('swal-medio-pago').value;

        if (!idAlumno) {
          Swal.showValidationMessage('Selecciona un alumno');
          return false;
        }
        if (!idCurso) {
          Swal.showValidationMessage('Selecciona un curso');
          return false;
        }
        if (!mesCuota) {
          Swal.showValidationMessage('Selecciona el mes de cuota');
          return false;
        }
        if (!monto || parseFloat(monto) <= 0) {
          Swal.showValidationMessage('Ingresa un monto vÃ¡lido');
          return false;
        }
        if (!medioPago) {
          Swal.showValidationMessage('Selecciona un medio de pago');
          return false;
        }

        return {
          id_alumno: parseInt(idAlumno),
          id_curso: parseInt(idCurso),
          mes_cuota: mesCuota,
          monto: parseFloat(monto),
          medio_pago: medioPago
        };
      }
    });

    if (formValues) {
      try {
        Swal.fire({
          title: 'Registrando pago...',
          html: '<i class="lucide-loader" style="width: 48px; height: 48px; animation: spin 1s linear infinite;"></i>',
          showConfirmButton: false,
          allowOutsideClick: false
        });

        const response = await fetch(`${API_URL}/pagos/realizar`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues)
        });

        const data = await response.json();

        if (response.ok && data.success) {
          await Swal.fire({
            icon: 'success',
            title: 'Â¡Pago Registrado!',
            html: `
              <div style="text-align: left; padding: 20px;">
                <p style="margin: 0 0 12px 0;"><strong>Comprobante:</strong> ${data.comprobante.numero}</p>
                <p style="margin: 0 0 12px 0;"><strong>Monto:</strong> $${parseFloat(data.comprobante.monto).toLocaleString('es-AR', {minimumFractionDigits: 2})}</p>
                <p style="margin: 0 0 12px 0;"><strong>Detalle:</strong> ${data.comprobante.detalle}</p>
                <p style="margin: 0 0 12px 0;"><strong>Mes:</strong> ${data.comprobante.mes_cuota}</p>
                <p style="margin: 0;"><strong>Fecha:</strong> ${new Date(data.comprobante.fecha).toLocaleDateString('es-ES')}</p>
              </div>
            `,
            confirmButtonColor: '#1976d2'
          });

          await loadPagosData();
          
          const panel = document.getElementById('pagoPanel');
          if (panel && panel.classList.contains('active')) {
            await openPagoPanel(formValues.id_alumno);
          }
        } else {
          throw new Error(data.message || 'Error al registrar el pago');
        }
      } catch (error) {
        console.error('Error al registrar pago:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'No se pudo registrar el pago',
          confirmButtonColor: '#1976d2'
        });
      }
    }
  } catch (error) {
    console.error('Error al abrir modal:', error);
    showToast('Error al cargar datos', 'error');
  }
}

// ===== GESTIÃ“N DE AULAS ===== //
async function openNuevaAulaModal() {
  const { value: formValues } = await Swal.fire({
    title: 'Nueva Aula',
    html: `
      <div style="text-align: left;">
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nombre del Aula</label>
          <input id="nombre_aula" class="swal2-input" placeholder="Ej: Aula 101" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Capacidad</label>
          <input id="capacidad" type="number" class="swal2-input" placeholder="Ej: 30" style="width: 100%; margin: 0;">
        </div>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Crear',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#1e3c72',
    preConfirm: () => {
      const nombre = document.getElementById('nombre_aula').value;
      const capacidad = document.getElementById('capacidad').value;
      
      if (!nombre) {
        Swal.showValidationMessage('El nombre es obligatorio');
        return false;
      }
      if (!capacidad || capacidad < 1) {
        Swal.showValidationMessage('La capacidad debe ser mayor a 0');
        return false;
      }
      return { nombre, capacidad };
    }
  });

  if (formValues) {
    try {
      const res = await fetch(`${API_URL}/aulas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_aula: formValues.nombre,
          capacidad: formValues.capacidad
        })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        Swal.fire('Â¡Creada!', 'Aula creada exitosamente', 'success');
        document.getElementById('btnAulas').click();
      } else {
        Swal.fire('Error', data.message || 'Error al crear aula', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}

async function editarAula(id, nombre, capacidad) {
  const { value: formValues } = await Swal.fire({
    title: 'Editar Aula',
    html: `
      <div style="text-align: left;">
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nombre del Aula</label>
          <input id="nombre_aula" class="swal2-input" value="${nombre}" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Capacidad</label>
          <input id="capacidad" type="number" class="swal2-input" value="${capacidad}" style="width: 100%; margin: 0;">
        </div>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#1e3c72',
    preConfirm: () => {
      const nombre = document.getElementById('nombre_aula').value;
      const capacidad = document.getElementById('capacidad').value;
      
      if (!nombre) {
        Swal.showValidationMessage('El nombre es obligatorio');
        return false;
      }
      if (!capacidad || capacidad < 1) {
        Swal.showValidationMessage('La capacidad debe ser mayor a 0');
        return false;
      }
      return { nombre, capacidad };
    }
  });

  if (formValues) {
    try {
      const res = await fetch(`${API_URL}/aulas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_aula: formValues.nombre,
          capacidad: formValues.capacidad
        })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        Swal.fire('Â¡Actualizada!', 'Aula actualizada exitosamente', 'success');
        document.getElementById('btnAulas').click();
      } else {
        Swal.fire('Error', data.message || 'Error al actualizar aula', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}

async function eliminarAula(id, nombre) {
  const result = await Swal.fire({
    title: 'Â¿Eliminar aula?',
    html: `Â¿EstÃ¡s seguro de eliminar el aula <strong>${nombre}</strong>?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'SÃ­, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      const res = await fetch(`${API_URL}/aulas/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (res.ok && data.success) {
        Swal.fire('Â¡Eliminada!', 'Aula eliminada exitosamente', 'success');
        document.getElementById('btnAulas').click();
      } else {
        Swal.fire('Error', data.message || 'Error al eliminar aula', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}

// ===== GESTIÃ“N DE IDIOMAS ===== //
async function openNuevoIdiomaModal() {
  const { value: nombre } = await Swal.fire({
    title: 'Nuevo Idioma',
    input: 'text',
    inputLabel: 'Nombre del idioma',
    inputPlaceholder: 'Ej: InglÃ©s',
    showCancelButton: true,
    confirmButtonText: 'Crear',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#1e3c72',
    inputValidator: (value) => {
      if (!value) {
        return 'El nombre es obligatorio';
      }
    }
  });

  if (nombre) {
    try {
      const res = await fetch(`${API_URL}/idiomas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_idioma: nombre })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        Swal.fire('Â¡Creado!', 'Idioma creado exitosamente', 'success');
        document.getElementById('btnIdiomas').click();
      } else {
        Swal.fire('Error', data.message || 'Error al crear idioma', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}

async function editarIdioma(id, nombreActual) {
  const { value: nombre } = await Swal.fire({
    title: 'Editar Idioma',
    input: 'text',
    inputLabel: 'Nombre del idioma',
    inputValue: nombreActual,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#1e3c72',
    inputValidator: (value) => {
      if (!value) {
        return 'El nombre es obligatorio';
      }
    }
  });

  if (nombre) {
    try {
      const res = await fetch(`${API_URL}/idiomas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_idioma: nombre })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        Swal.fire('Â¡Actualizado!', 'Idioma actualizado exitosamente', 'success');
        document.getElementById('btnIdiomas').click();
      } else {
        Swal.fire('Error', data.message || 'Error al actualizar idioma', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}

async function eliminarIdioma(id, nombre) {
  const result = await Swal.fire({
    title: 'Â¿Eliminar idioma?',
    html: `Â¿EstÃ¡s seguro de eliminar el idioma <strong>${nombre}</strong>?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'SÃ­, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      const res = await fetch(`${API_URL}/idiomas/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (res.ok && data.success) {
        Swal.fire('Â¡Eliminado!', 'Idioma eliminado exitosamente', 'success');
        document.getElementById('btnIdiomas').click();
      } else {
        Swal.fire('Error', data.message || 'Error al eliminar idioma', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}

// ===== GESTIÃ“N DE INSCRIPCIONES ===== //
async function openNuevaInscripcionModal() {
  try {
    const [alumnosRes, cursosRes] = await Promise.all([
      fetch(`${API_URL}/alumnos`),
      fetch(`${API_URL}/cursos`)
    ]);
    
    const alumnos = await alumnosRes.json();
    const cursos = await cursosRes.json();
    
    const { value: formValues } = await Swal.fire({
      title: 'Nueva InscripciÃ³n',
      html: `
        <div style="text-align: left;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Seleccionar Alumno</label>
            <select id="id_alumno" class="swal2-input" style="width: 100%; margin: 0;">
              <option value="">-- Seleccione un alumno --</option>
              ${alumnos.map(a => `<option value="${a.id_alumno}">${a.nombre} ${a.apellido} (${a.legajo})</option>`).join('')}
            </select>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Seleccionar Curso</label>
            <select id="id_curso" class="swal2-input" style="width: 100%; margin: 0;">
              <option value="">-- Seleccione un curso --</option>
              ${cursos.map(c => `<option value="${c.id_curso}">${c.nombre_curso} - ${c.nombre_idioma || 'Sin idioma'}</option>`).join('')}
            </select>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Inscribir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#1e3c72',
      preConfirm: () => {
        const id_alumno = document.getElementById('id_alumno').value;
        const id_curso = document.getElementById('id_curso').value;
        
        if (!id_alumno) {
          Swal.showValidationMessage('Debe seleccionar un alumno');
          return false;
        }
        if (!id_curso) {
          Swal.showValidationMessage('Debe seleccionar un curso');
          return false;
        }
        return { id_alumno, id_curso };
      }
    });

    if (formValues) {
      const res = await fetch(`${API_URL}/inscripciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        Swal.fire('Â¡Inscrito!', 'Alumno inscrito exitosamente', 'success');
        document.getElementById('btnInscripciones').click();
      } else {
        Swal.fire('Error', data.message || 'Error al inscribir alumno', 'error');
      }
    }
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
  }
}

async function eliminarInscripcion(id, alumno, curso) {
  const result = await Swal.fire({
    title: 'Â¿Eliminar inscripciÃ³n?',
    html: `Â¿EstÃ¡s seguro de eliminar la inscripciÃ³n de <strong>${alumno}</strong> al curso <strong>${curso}</strong>?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'SÃ­, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      const res = await fetch(`${API_URL}/inscripciones/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (res.ok && data.success) {
        Swal.fire('Â¡Eliminada!', 'InscripciÃ³n eliminada exitosamente', 'success');
        document.getElementById('btnInscripciones').click();
      } else {
        Swal.fire('Error', data.message || 'Error al eliminar inscripciÃ³n', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}

// ===== GESTIÃ“N DE ALUMNOS ===== //
async function openNuevoAlumnoModal() {
  const { value: formValues } = await Swal.fire({
    title: 'Nuevo Alumno',
    html: `
      <div style="text-align: left;">
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nombre</label>
          <input id="nombre" class="swal2-input" placeholder="Nombre" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Apellido</label>
          <input id="apellido" class="swal2-input" placeholder="Apellido" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">DNI</label>
          <input id="dni" class="swal2-input" placeholder="Ej: 12345678" maxlength="8" oninput="this.value=this.value.replace(/[^0-9]/g,'')" pattern="[0-9]*" inputmode="numeric" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Email</label>
          <input id="mail" type="email" class="swal2-input" placeholder="email@ejemplo.com" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Legajo</label>
          <input id="legajo" class="swal2-input" placeholder="Ej: A0001" oninput="this.value=this.value.replace(/[^a-zA-Z0-9]/g,'').toUpperCase()" pattern="[A-Z0-9]*" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">TelÃ©fono</label>
          <input id="telefono" type="tel" class="swal2-input" placeholder="Ej: 1234567890" oninput="this.value=this.value.replace(/[^0-9]/g,'')" pattern="[0-9]*" inputmode="numeric" style="width: 100%; margin: 0;">
        </div>
      </div>
    `,
    width: '500px',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Crear',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#1e3c72',
    preConfirm: () => {
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const dni = document.getElementById('dni').value;
      const mail = document.getElementById('mail').value;
      const legajo = document.getElementById('legajo').value;
      const telefono = document.getElementById('telefono').value;
      
      if (!nombre) {
        Swal.showValidationMessage('El nombre es obligatorio');
        return false;
      }
      if (!apellido) {
        Swal.showValidationMessage('El apellido es obligatorio');
        return false;
      }
      if (!dni) {
        Swal.showValidationMessage('El DNI es obligatorio');
        return false;
      }
      if (!mail) {
        Swal.showValidationMessage('El email es obligatorio');
        return false;
      }
      if (!legajo) {
        Swal.showValidationMessage('El legajo es obligatorio');
        return false;
      }
      if (!telefono) {
        Swal.showValidationMessage('El telÃ©fono es obligatorio');
        return false;
      }
      return { nombre, apellido, dni, mail, legajo, telefono };
    }
  });

  if (formValues) {
    try {
      const res = await fetch(`${API_URL}/alumnos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        const idAlumno = data.id_alumno;
        const nombreCompleto = `${formValues.nombre} ${formValues.apellido}`;
        
        await Swal.fire({
          icon: 'success',
          title: 'Â¡Alumno creado!',
          text: `${nombreCompleto} ha sido registrado exitosamente`,
          timer: 1500,
          showConfirmButton: false
        });

        await crearCredencialesAlumno(idAlumno, nombreCompleto);
        
        document.getElementById('btnAlumnos').click();
      } else {
        Swal.fire('Error', data.message || 'Error al crear alumno', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}

async function crearCredencialesAlumno(idAlumno, nombreCompleto) {
  const { value: credenciales } = await Swal.fire({
    title: 'Crear Credenciales de Acceso',
    html: `
      <div style="text-align: left;">
        <p style="margin-bottom: 20px; color: #666;">
          Crea las credenciales de acceso para <strong>${nombreCompleto}</strong>
        </p>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Usuario</label>
          <input id="username" class="swal2-input" placeholder="Nombre de usuario" style="width: 100%; margin: 0;">
          <small style="color: #999; font-size: 12px;">Este serÃ¡ el usuario para iniciar sesiÃ³n</small>
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">ContraseÃ±a</label>
          <input id="password" type="password" class="swal2-input" placeholder="ContraseÃ±a" style="width: 100%; margin: 0;">
          <small style="color: #999; font-size: 12px;">MÃ­nimo 6 caracteres</small>
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Confirmar ContraseÃ±a</label>
          <input id="password2" type="password" class="swal2-input" placeholder="Confirmar contraseÃ±a" style="width: 100%; margin: 0;">
        </div>
      </div>
    `,
    width: '500px',
    focusConfirm: false,
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: 'Crear Credenciales',
    denyButtonText: 'Omitir (crear despuÃ©s)',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#1e3c72',
    preConfirm: () => {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const password2 = document.getElementById('password2').value;
      
      if (!username || !password || !password2) {
        Swal.showValidationMessage('Todos los campos son obligatorios');
        return false;
      }
      
      if (password.length < 6) {
        Swal.showValidationMessage('La contraseÃ±a debe tener al menos 6 caracteres');
        return false;
      }
      
      if (password !== password2) {
        Swal.showValidationMessage('Las contraseÃ±as no coinciden');
        return false;
      }
      
      return { username, password };
    }
  });

  if (credenciales) {
    try {
      const res = await fetch(`${API_URL}/alumnos/${idAlumno}/credenciales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciales)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Â¡Credenciales creadas!',
          html: `
            <p>Las credenciales de acceso han sido creadas exitosamente.</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 15px;">
              <p style="margin: 5px 0;"><strong>Usuario:</strong> ${credenciales.username}</p>
              <p style="margin: 5px 0;"><strong>ContraseÃ±a:</strong> ${credenciales.password}</p>
            </div>
            <p style="color: #999; font-size: 13px; margin-top: 15px;">
              ï¸ Guarda estas credenciales de forma segura
            </p>
          `,
          confirmButtonColor: '#1e3c72'
        });
      } else {
        Swal.fire('Error', data.message || 'Error al crear credenciales', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'No se pudieron crear las credenciales', 'error');
    }
  }
}


async function editarAlumno(id) {
  try {
    const res = await fetch(`${API_URL}/alumnos/${id}`);
    const alumno = await res.json();
    
    const { value: formValues, isDenied } = await Swal.fire({
      title: 'Editar Alumno',
      html: `
        <div style="text-align: left;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nombre</label>
            <input id="nombre" class="swal2-input" value="${alumno.nombre}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Apellido</label>
            <input id="apellido" class="swal2-input" value="${alumno.apellido}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Email</label>
            <input id="mail" type="email" class="swal2-input" value="${alumno.mail}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">DNI</label>
            <input id="dni" class="swal2-input" placeholder="Ej: 12345678" maxlength="8" oninput="this.value=this.value.replace(/[^0-9]/g,'')" pattern="[0-9]*" inputmode="numeric" value="${alumno.dni || ''}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Legajo</label>
            <input id="legajo" class="swal2-input" placeholder="Ej: A0001" oninput="this.value=this.value.replace(/[^a-zA-Z0-9]/g,'').toUpperCase()" pattern="[A-Z0-9]*" value="${alumno.legajo}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">TelÃ©fono</label>
            <input id="telefono" type="tel" class="swal2-input" oninput="this.value=this.value.replace(/[^0-9]/g,'')" pattern="[0-9]*" inputmode="numeric" value="${alumno.telefono || ''}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Estado</label>
            <select id="estado" class="swal2-input" style="width: 100%; margin: 0;">
              <option value="activo" ${alumno.estado === 'activo' ? 'selected' : ''}>Activo</option>
              <option value="inactivo" ${alumno.estado === 'inactivo' ? 'selected' : ''}>Inactivo</option>
            </select>
          </div>
        </div>
      `,
      width: '500px',
      focusConfirm: false,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: '<i data-lucide="key"></i> Editar Credenciales',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#1e3c72',
      denyButtonColor: '#6b7280',
      didOpen: () => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      },
      preConfirm: () => {
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const mail = document.getElementById('mail').value.trim();
        const dni = document.getElementById('dni').value.trim();
        const legajo = document.getElementById('legajo').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const estado = document.getElementById('estado').value;
        
        if (!nombre || !apellido || !mail || !dni || !legajo || !telefono) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return false;
        }
        return { nombre, apellido, mail, dni, legajo, telefono, estado };
      }
    });

    if (isDenied) {
      await abrirModalCredencialesAlumno(id);
      return;
    }

    if (formValues) {
      const updateRes = await fetch(`${API_URL}/alumnos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });
      
      const data = await updateRes.json();
      
      if (updateRes.ok && data.success) {
        await Swal.fire('Â¡Listo!', 'Alumno actualizado correctamente', 'success');
        // Recargar la secciÃ³n de alumnos
        document.getElementById('btnAlumnos').click();
      } else {
        Swal.fire('Error', data.message || 'Error al actualizar alumno', 'error');
      }
    }
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
  }
}

async function abrirModalCredencialesAlumno(idAlumno) {
  try {
    const resp = await fetch(`${API_URL}/alumnos/${idAlumno}`);
    const alumno = await resp.json();
    
    let usuarioActual = '';
    let passwordActual = '';
    let tienePassword = false;
    try {
      const respUsuario = await fetch(`${API_URL}/auth/usuario-classroom/${alumno.id_persona}`);
      if (respUsuario.ok) {
        const usuario = await respUsuario.json();
        usuarioActual = usuario.username || '';
        passwordActual = usuario.password_plain || '';
        tienePassword = usuario.password_plain ? true : false;
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    }

    const result = await Swal.fire({
      title: 'Editar Credenciales',
      html: `
        <div style="text-align: left;">
          <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; font-size: 13px; color: #1e40af;">
              Estas credenciales se usan para <strong>Dashboard y Classroom</strong>
            </p>
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px;">
              Usuario <span style="color: #9ca3af; font-weight: 400;">(actual: ${usuarioActual})</span>
            </label>
            <input type="text" id="usuarioAlumno" value="${usuarioActual}" 
                   onfocus="if(this.value === '${usuarioActual}') this.value = '';"
                   style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 14px; color: #9ca3af;">
          </div>
          
          <div style="margin-bottom: 8px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px;">
              ContraseÃ±a <span style="color: #9ca3af; font-weight: 400;">(actual: ${passwordActual || 'sin configurar'})</span>
            </label>
            <div style="position: relative;">
              <input type="text" id="passwordAlumno" value="${passwordActual}"
                     onfocus="if(this.value === '${passwordActual}') this.value = '';"
                     style="width: 100%; padding: 10px 40px 10px 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box; font-size: 14px; color: #9ca3af;">
              <button type="button" id="togglePasswordAlumno" 
                      style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; padding: 4px;">
                <i data-lucide="eye" style="width: 20px; height: 20px; color: #6b7280;"></i>
              </button>
            </div>
            <p style="font-size: 11px; color: #6b7280; margin-top: 4px;">
              DejÃ¡ vacÃ­o para mantener la contraseÃ±a actual
            </p>
          </div>
        </div>
      `,
      width: '500px',
      showCancelButton: true,
      confirmButtonText: 'Guardar Cambios',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#1e3c72',
      didOpen: () => {
        lucide.createIcons();
        
        const inputUsuario = document.getElementById('usuarioAlumno');
        inputUsuario.addEventListener('blur', () => {
          if (inputUsuario.value.trim() === '') {
            inputUsuario.value = '${usuarioActual}';
            inputUsuario.style.color = '#9ca3af';
          } else {
            inputUsuario.style.color = '#111827';
          }
        });
        
        const inputPassword = document.getElementById('passwordAlumno');
        inputPassword.addEventListener('blur', () => {
          if (inputPassword.value.trim() === '') {
            inputPassword.value = '${passwordActual}';
            inputPassword.style.color = '#9ca3af';
          } else {
            inputPassword.style.color = '#111827';
          }
        });
        
        const toggleBtn = document.getElementById('togglePasswordAlumno');
        toggleBtn.addEventListener('click', () => {
          const isPassword = inputPassword.type === 'password';
          inputPassword.type = isPassword ? 'text' : 'password';
          
          const iconHtml = isPassword ? '<i data-lucide="eye-off" style="width: 20px; height: 20px; color: #6b7280;"></i>' : '<i data-lucide="eye" style="width: 20px; height: 20px; color: #6b7280;"></i>';
          toggleBtn.innerHTML = iconHtml;
          lucide.createIcons();
        });
      },
      preConfirm: async () => {
        const usuario = document.getElementById('usuarioAlumno').value.trim();
        const password = document.getElementById('passwordAlumno').value.trim();
        
        const nuevoUsuario = (usuario === '' || usuario === '${usuarioActual}') ? '${usuarioActual}' : usuario;
        
        const nuevoPassword = (password === '' || password === '${passwordActual}') ? '' : password;
        
        if (!nuevoUsuario) {
          Swal.showValidationMessage('El usuario es obligatorio');
          return false;
        }
        
        return { usuario: nuevoUsuario, password: nuevoPassword };
      }
    });

    if (result.isConfirmed && result.value) {
      const { usuario, password } = result.value;

      try {
        const bodyData = {
          id_persona: alumno.id_persona,
          username: usuario
        };
        
        if (password && password.trim().length > 0) {
          bodyData.password = password;
        }
        
        const response = await fetch(`${API_URL}/auth/admin-cambiar-password-classroom`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyData)
        });
        
        if (response.ok) {
          const mensaje = password ? 'Usuario y contraseÃ±a actualizados correctamente' : 'Usuario actualizado correctamente';
          Swal.fire('Â¡Actualizado!', mensaje, 'success');
        } else {
          const data = await response.json();
          Swal.fire('Error', data.message || 'Error al actualizar credenciales', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
      }
    }
  } catch (error) {
    console.error('Error:', error);
    Swal.fire('Error', 'No se pudieron cargar las credenciales', 'error');
  }
}

async function eliminarAlumno(id, nombre) {
  const result = await Swal.fire({
    title: 'Â¿Eliminar alumno?',
    html: `Â¿EstÃ¡s seguro de eliminar al alumno <strong>${nombre}</strong>?<br><br>
           <span style="color: #d33; font-size: 14px;">Esta acciÃ³n eliminarÃ¡ tambiÃ©n sus calificaciones, asistencias y pagos.</span>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'SÃ­, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      const res = await fetch(`${API_URL}/alumnos/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (res.ok && data.success) {
        Swal.fire('Â¡Eliminado!', 'Alumno eliminado exitosamente', 'success');
        document.getElementById('btnAlumnos').click();
      } else {
        Swal.fire('Error', data.message || 'Error al eliminar alumno', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}

async function cambiarPasswordAlumnoDashboard(idAlumno) {
  const { value: formValues } = await Swal.fire({
    title: 'Cambiar ContraseÃ±a Dashboard',
    html: `
      <div style="text-align: left;">
        <p style="margin-bottom: 15px; color: #666;">Esta contraseÃ±a se usa para acceder al Dashboard administrativo.</p>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nueva ContraseÃ±a</label>
          <input id="password" type="password" class="swal2-input" placeholder="MÃ­nimo 6 caracteres" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Confirmar ContraseÃ±a</label>
          <input id="confirmPassword" type="password" class="swal2-input" placeholder="Repite la contraseÃ±a" style="width: 100%; margin: 0;">
        </div>
      </div>
    `,
    width: '450px',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Cambiar ContraseÃ±a',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#1e3c72',
    preConfirm: () => {
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      if (!password || !confirmPassword) {
        Swal.showValidationMessage('Ambos campos son obligatorios');
        return false;
      }
      
      if (password.length < 6) {
        Swal.showValidationMessage('La contraseÃ±a debe tener al menos 6 caracteres');
        return false;
      }
      
      if (password !== confirmPassword) {
        Swal.showValidationMessage('Las contraseÃ±as no coinciden');
        return false;
      }
      
      return { password };
    }
  });

  if (formValues) {
    try {
      const res = await fetch(`${API_URL}/alumnos/${idAlumno}/cambiar-password-dashboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        Swal.fire('Â¡Actualizado!', 'ContraseÃ±a Dashboard actualizada exitosamente', 'success');
      } else {
        Swal.fire('Error', data.message || 'Error al actualizar contraseÃ±a', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}

async function cambiarPasswordAlumnoClassroom(idAlumno) {
  const { value: formValues } = await Swal.fire({
    title: 'Cambiar ContraseÃ±a Classroom',
    html: `
      <div style="text-align: left;">
        <p style="margin-bottom: 15px; color: #666;">Esta contraseÃ±a se usa para acceder a la plataforma educativa Classroom.</p>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nueva ContraseÃ±a</label>
          <input id="password" type="password" class="swal2-input" placeholder="MÃ­nimo 6 caracteres" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Confirmar ContraseÃ±a</label>
          <input id="confirmPassword" type="password" class="swal2-input" placeholder="Repite la contraseÃ±a" style="width: 100%; margin: 0;">
        </div>
      </div>
    `,
    width: '450px',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Cambiar ContraseÃ±a',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#2575fc',
    preConfirm: () => {
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      if (!password || !confirmPassword) {
        Swal.showValidationMessage('Ambos campos son obligatorios');
        return false;
      }
      
      if (password.length < 6) {
        Swal.showValidationMessage('La contraseÃ±a debe tener al menos 6 caracteres');
        return false;
      }
      
      if (password !== confirmPassword) {
        Swal.showValidationMessage('Las contraseÃ±as no coinciden');
        return false;
      }
      
      return { password };
    }
  });

  if (formValues) {
    try {
      const alumnoRes = await fetch(`${API_URL}/alumnos/${idAlumno}`);
      const alumno = await alumnoRes.json();
      
      const res = await fetch(`${API_URL}/auth/admin-cambiar-password-classroom`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_persona: alumno.id_persona,
          password: formValues.password
        })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        Swal.fire('Â¡Actualizado!', 'ContraseÃ±a Classroom actualizada exitosamente', 'success');
      } else {
        Swal.fire('Error', data.message || 'Error al actualizar contraseÃ±a', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}

// ===== GESTIÃ“N DE PROFESORES ===== //
async function openNuevoProfesorModal() {
  const { value: formValues } = await Swal.fire({
    title: 'Nuevo Profesor',
    html: `
      <div style="text-align: left;">
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nombre</label>
          <input id="nombre" class="swal2-input" placeholder="Nombre" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Apellido</label>
          <input id="apellido" class="swal2-input" placeholder="Apellido" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">DNI</label>
          <input id="dni" class="swal2-input" placeholder="Ej: 12345678" maxlength="8" oninput="this.value=this.value.replace(/[^0-9]/g,'')" pattern="[0-9]*" inputmode="numeric" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Email</label>
          <input id="mail" type="email" class="swal2-input" placeholder="email@ejemplo.com" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Especialidad</label>
          <input id="especialidad" class="swal2-input" placeholder="Ej: InglÃ©s Avanzado" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">TelÃ©fono</label>
          <input id="telefono" type="tel" class="swal2-input" placeholder="Ej: 1234567890" oninput="this.value=this.value.replace(/[^0-9]/g,'')" pattern="[0-9]*" inputmode="numeric" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Idiomas que enseÃ±a</label>
          <div id="idiomasContainerNuevo" style="border: 1px solid #d0d5dd; border-radius: 8px; padding: 12px; max-height: 150px; overflow-y: auto; background: #f9fafb;">
            <div style="color: #666; font-size: 13px; text-align: center;">Cargando idiomas...</div>
          </div>
        </div>
      </div>
    `,
    width: '500px',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Crear',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#1e3c72',
    didOpen: async () => {
      try {
        const resp = await fetch(`${API_URL}/idiomas`);
        const idiomas = await resp.json();
        
        const container = document.getElementById('idiomasContainerNuevo');
        container.innerHTML = idiomas.map(idioma => `
          <label style="display: flex; align-items: center; padding: 8px; cursor: pointer; border-radius: 4px; transition: background 0.2s;" 
                 onmouseover="this.style.background='#e5e7eb'" 
                 onmouseout="this.style.background='transparent'">
            <input type="checkbox" value="${idioma.id_idioma}" class="idioma-checkbox" 
                   style="margin-right: 8px; cursor: pointer; width: 16px; height: 16px;">
            <span style="font-size: 14px; color: #374151;">${idioma.nombre_idioma}</span>
          </label>
        `).join('');
      } catch (error) {
        console.error('Error al cargar idiomas:', error);
        document.getElementById('idiomasContainerNuevo').innerHTML = '<div style="color: #ef4444; font-size: 13px; text-align: center;">Error al cargar idiomas</div>';
      }
    },
    preConfirm: () => {
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const dni = document.getElementById('dni').value;
      const mail = document.getElementById('mail').value;
      const especialidad = document.getElementById('especialidad').value;
      const telefono = document.getElementById('telefono').value;
      
      const idiomasSeleccionados = Array.from(document.querySelectorAll('.idioma-checkbox:checked'))
        .map(cb => parseInt(cb.value));
      
      if (!nombre) {
        Swal.showValidationMessage('El nombre es obligatorio');
        return false;
      }
      if (!apellido) {
        Swal.showValidationMessage('El apellido es obligatorio');
        return false;
      }
      if (!dni) {
        Swal.showValidationMessage('El DNI es obligatorio');
        return false;
      }
      if (!mail) {
        Swal.showValidationMessage('El email es obligatorio');
        return false;
      }
      if (!especialidad) {
        Swal.showValidationMessage('La especialidad es obligatoria');
        return false;
      }
      if (!telefono) {
        Swal.showValidationMessage('El telÃ©fono es obligatorio');
        return false;
      }
      return { nombre, apellido, dni, mail, especialidad, telefono, idiomas: idiomasSeleccionados };
    }
  });

  if (formValues) {
    try {
      console.log('Enviando datos de profesor:', formValues);
      const res = await fetch(`${API_URL}/profesores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });
      
      console.log('Respuesta del servidor:', res.status, res.statusText);
      const data = await res.json();
      console.log('Datos recibidos:', data);
      
      if (res.ok && data.success) {
        const idProfesor = data.id_profesor;
        const nombreCompleto = `${formValues.nombre} ${formValues.apellido}`;
        
        await Swal.fire({
          icon: 'success',
          title: 'Â¡Profesor creado!',
          text: `${nombreCompleto} ha sido registrado exitosamente`,
          timer: 1500,
          showConfirmButton: false
        });

        await crearCredencialesProfesor(idProfesor, nombreCompleto);
        
        document.getElementById('btnProfesores').click();
      } else {
        console.error('Error del servidor:', data);
        Swal.fire('Error', data.message || 'Error al crear profesor', 'error');
      }
    } catch (error) {
      console.error('Error de conexiÃ³n:', error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}

async function crearCredencialesProfesor(idProfesor, nombreCompleto) {
  const { value: credenciales } = await Swal.fire({
    title: 'Crear Credenciales de Acceso',
    html: `
      <div style="text-align: left;">
        <p style="margin-bottom: 20px; color: #666;">
          Crea las credenciales de acceso para <strong>${nombreCompleto}</strong>
        </p>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Usuario</label>
          <input id="username" class="swal2-input" placeholder="Nombre de usuario" style="width: 100%; margin: 0;">
          <small style="color: #999; font-size: 12px;">Este serÃ¡ el usuario para iniciar sesiÃ³n</small>
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">ContraseÃ±a</label>
          <input id="password" type="password" class="swal2-input" placeholder="ContraseÃ±a" style="width: 100%; margin: 0;">
          <small style="color: #999; font-size: 12px;">MÃ­nimo 6 caracteres</small>
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Confirmar ContraseÃ±a</label>
          <input id="password2" type="password" class="swal2-input" placeholder="Confirmar contraseÃ±a" style="width: 100%; margin: 0;">
        </div>
      </div>
    `,
    width: '500px',
    focusConfirm: false,
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: 'Crear Credenciales',
    denyButtonText: 'Omitir (crear despuÃ©s)',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#1e3c72',
    preConfirm: () => {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const password2 = document.getElementById('password2').value;
      
      if (!username || !password || !password2) {
        Swal.showValidationMessage('Todos los campos son obligatorios');
        return false;
      }
      
      if (password.length < 6) {
        Swal.showValidationMessage('La contraseÃ±a debe tener al menos 6 caracteres');
        return false;
      }
      
      if (password !== password2) {
        Swal.showValidationMessage('Las contraseÃ±as no coinciden');
        return false;
      }
      
      return { username, password };
    }
  });

  if (credenciales) {
    try {
      const res = await fetch(`${API_URL}/profesores/${idProfesor}/credenciales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciales)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Â¡Credenciales creadas!',
          html: `
            <p>Las credenciales de acceso han sido creadas exitosamente.</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 15px;">
              <p style="margin: 5px 0;"><strong>Usuario:</strong> ${credenciales.username}</p>
              <p style="margin: 5px 0;"><strong>ContraseÃ±a:</strong> ${credenciales.password}</p>
            </div>
            <p style="color: #999; font-size: 13px; margin-top: 15px;">
              ï¸ Guarda estas credenciales de forma segura
            </p>
          `,
          confirmButtonColor: '#1e3c72'
        });
      } else {
        Swal.fire('Error', data.message || 'Error al crear credenciales', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'No se pudieron crear las credenciales', 'error');
    }
  }
}

async function editarProfesor(id) {
  try {
    const res = await fetch(`${API_URL}/profesores/${id}`);
    const profesor = await res.json();
    
    const idiomasRes = await fetch(`${API_URL}/idiomas`);
    const idiomas = await idiomasRes.json();
    
    const { value: formValues, isDenied } = await Swal.fire({
      title: 'Editar Profesor',
      html: `
        <div style="text-align: left;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nombre</label>
            <input id="nombre" class="swal2-input" value="${profesor.nombre}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Apellido</label>
            <input id="apellido" class="swal2-input" value="${profesor.apellido}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Email</label>
            <input id="mail" type="email" class="swal2-input" value="${profesor.mail}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">DNI</label>
            <input id="dni" class="swal2-input" placeholder="Ej: 12345678" maxlength="8" oninput="this.value=this.value.replace(/[^0-9]/g,'')" pattern="[0-9]*" inputmode="numeric" value="${profesor.dni || ''}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Especialidad</label>
            <input id="especialidad" class="swal2-input" value="${profesor.especialidad || ''}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Idiomas que enseÃ±a</label>
            <div id="idiomasContainerEditar" style="max-height: 150px; overflow-y: auto; border: 1px solid #ddd; border-radius: 4px; padding: 10px; background: #f9f9f9;">
              ${idiomas.map(idioma => `
                <label style="display: block; margin-bottom: 8px; cursor: pointer;">
                  <input type="checkbox" value="${idioma.id_idioma}" ${(profesor.idiomas_ids || []).includes(idioma.id_idioma) ? 'checked' : ''} style="margin-right: 8px;">
                  ${idioma.nombre_idioma}
                </label>
              `).join('')}
            </div>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">TelÃ©fono</label>
            <input id="telefono" type="tel" class="swal2-input" oninput="this.value=this.value.replace(/[^0-9]/g,'')" pattern="[0-9]*" inputmode="numeric" value="${profesor.telefono || ''}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Estado</label>
            <select id="estado" class="swal2-input" style="width: 100%; margin: 0;">
              <option value="activo" ${profesor.estado === 'activo' ? 'selected' : ''}>Activo</option>
              <option value="inactivo" ${profesor.estado === 'inactivo' ? 'selected' : ''}>Inactivo</option>
              <option value="licencia" ${profesor.estado === 'licencia' ? 'selected' : ''}>En Licencia</option>
            </select>
          </div>
        </div>
      `,
      width: '550px',
      focusConfirm: false,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: '<i data-lucide="key"></i> Editar Credenciales',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#1e3c72',
      denyButtonColor: '#6b7280',
      didOpen: () => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      },
      preConfirm: () => {
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const mail = document.getElementById('mail').value.trim();
        const dni = document.getElementById('dni').value.trim();
        const especialidad = document.getElementById('especialidad').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const estado = document.getElementById('estado').value;
        
        const idiomasSeleccionados = Array.from(
          document.querySelectorAll('#idiomasContainerEditar input[type="checkbox"]:checked')
        ).map(cb => parseInt(cb.value));
        
        if (!nombre || !apellido || !mail || !dni || !especialidad || !telefono) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return false;
        }
        return { nombre, apellido, mail, dni, especialidad, telefono, estado, idiomas: idiomasSeleccionados };
      }
    });

    if (isDenied) {
      await abrirModalCredencialesProfesor(id);
      return;
    }

    if (formValues) {
      const updateRes = await fetch(`${API_URL}/profesores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });
      
      const data = await updateRes.json();
      
      if (updateRes.ok && data.success) {
        Swal.fire('Â¡Actualizado!', 'Profesor actualizado exitosamente', 'success');
        document.getElementById('btnProfesores').click();
      } else {
        Swal.fire('Error', data.message || 'Error al actualizar profesor', 'error');
      }
    }
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
  }
}

async function eliminarProfesor(id, nombre) {
  const result = await Swal.fire({
    title: 'Â¿Eliminar profesor?',
    html: `Â¿EstÃ¡s seguro de eliminar al profesor <strong>${nombre}</strong>?<br><br>
           <span style="color: #d33; font-size: 14px;">Los cursos que dicta quedarÃ¡n sin profesor asignado.</span>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'SÃ­, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      console.log('Eliminando profesor ID:', id);
      const res = await fetch(`${API_URL}/profesores/${id}`, { method: 'DELETE' });
      console.log('Respuesta del servidor:', res.status, res.statusText);
      const data = await res.json();
      console.log('Datos recibidos:', data);
      
      if (res.ok && data.success) {
        Swal.fire('Â¡Eliminado!', 'Profesor eliminado exitosamente', 'success');
        document.getElementById('btnProfesores').click();
      } else {
        console.error('Error del servidor:', data);
        Swal.fire('Error', data.message || 'Error al eliminar profesor', 'error');
      }
    } catch (error) {
      console.error('Error de conexiÃ³n:', error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}


function setupAdministradorFilters() {
  const searchInput = document.getElementById('administradoresSearch');

  if (searchInput) {
    searchInput.addEventListener('input', filterAdministradores);
  }
}

function filterAdministradores() {
  const searchTerm = document.getElementById('administradoresSearch')?.value.toLowerCase() || '';
  const cards = document.querySelectorAll('#administradoresGrid .profesor-card');
  
  cards.forEach(card => {
    const cardText = card.textContent.toLowerCase();
    const matchesSearch = cardText.includes(searchTerm);
    
    if (matchesSearch) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

async function openNuevoAdministradorModal() {
  const { value: formValues } = await Swal.fire({
    title: 'Nuevo Administrador',
    html: `
      <div style="text-align: left;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
          <div>
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nombre</label>
            <input id="admin_nombre" class="swal2-input" placeholder="Nombre" style="width: 100%; margin: 0;">
          </div>
          <div>
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Apellido</label>
            <input id="admin_apellido" class="swal2-input" placeholder="Apellido" style="width: 100%; margin: 0;">
          </div>
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Email</label>
          <input id="admin_mail" type="email" class="swal2-input" placeholder="email@ejemplo.com" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">DNI</label>
          <input id="admin_dni" class="swal2-input" placeholder="12345678" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">TelÃ©fono</label>
          <input id="admin_telefono" class="swal2-input" placeholder="+54 9 11 1234-5678" style="width: 100%; margin: 0;">
        </div>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <h4 style="margin-bottom: 15px; color: #333;">Credenciales de acceso</h4>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Usuario</label>
          <input id="admin_username" class="swal2-input" placeholder="nombreusuario" style="width: 100%; margin: 0;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">ContraseÃ±a</label>
          <input id="admin_password" type="password" class="swal2-input" placeholder="MÃ­nimo 6 caracteres" style="width: 100%; margin: 0;">
        </div>
      </div>
    `,
    width: '600px',
    showCancelButton: true,
    confirmButtonText: 'Crear Administrador',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#000',
    preConfirm: () => {
      const nombre = document.getElementById('admin_nombre').value.trim();
      const apellido = document.getElementById('admin_apellido').value.trim();
      const mail = document.getElementById('admin_mail').value.trim();
      const dni = document.getElementById('admin_dni').value.trim();
      const telefono = document.getElementById('admin_telefono').value.trim();
      const username = document.getElementById('admin_username').value.trim();
      const password = document.getElementById('admin_password').value.trim();

      if (!nombre || !apellido || !mail || !username || !password) {
        Swal.showValidationMessage('Por favor complete todos los campos obligatorios');
        return false;
      }

      if (password.length < 6) {
        Swal.showValidationMessage('La contraseÃ±a debe tener al menos 6 caracteres');
        return false;
      }

      return { nombre, apellido, mail, dni, telefono, username, password };
    }
  });

  if (formValues) {
    try {
      const res = await fetch(`${API_URL}/administradores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Â¡Administrador creado!',
          html: `
            <p>El administrador <strong>${formValues.nombre} ${formValues.apellido}</strong> ha sido creado correctamente.</p>
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-top: 15px;">
              <p style="margin: 5px 0;"><strong>Usuario:</strong> ${formValues.username}</p>
              <p style="margin: 5px 0;"><strong>ContraseÃ±a:</strong> ${formValues.password}</p>
            </div>
            <p style="margin-top: 15px; font-size: 13px; color: #666;">AsegÃºrate de compartir estas credenciales de forma segura.</p>
          `,
          confirmButtonColor: '#000'
        });

        document.getElementById('btnAdministradores').click();
      } else {
        Swal.fire('Error', data.message || 'Error al crear administrador', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}

async function editarAdministrador(id) {
  try {
    const res = await fetch(`${API_URL}/administradores/${id}`);
    const admin = await res.json();

    const { value: formValues, isDenied } = await Swal.fire({
      title: 'Editar Administrador',
      html: `
        <div style="text-align: left;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nombre</label>
              <input id="edit_admin_nombre" class="swal2-input" value="${admin.nombre}" style="width: 100%; margin: 0;">
            </div>
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 600;">Apellido</label>
              <input id="edit_admin_apellido" class="swal2-input" value="${admin.apellido}" style="width: 100%; margin: 0;">
            </div>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Email</label>
            <input id="edit_admin_mail" type="email" class="swal2-input" value="${admin.mail}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">DNI</label>
            <input id="edit_admin_dni" class="swal2-input" value="${admin.dni || ''}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">TelÃ©fono</label>
            <input id="edit_admin_telefono" class="swal2-input" value="${admin.telefono || ''}" style="width: 100%; margin: 0;">
          </div>
        </div>
      `,
      width: '600px',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Guardar Cambios',
      denyButtonText: '<i data-lucide="key"></i> Editar Credenciales',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#000',
      denyButtonColor: '#6b7280',
      didOpen: () => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      },
      preConfirm: () => {
        const nombre = document.getElementById('edit_admin_nombre').value.trim();
        const apellido = document.getElementById('edit_admin_apellido').value.trim();
        const mail = document.getElementById('edit_admin_mail').value.trim();
        const dni = document.getElementById('edit_admin_dni').value.trim();
        const telefono = document.getElementById('edit_admin_telefono').value.trim();

        if (!nombre || !apellido || !mail) {
          Swal.showValidationMessage('Por favor complete todos los campos obligatorios');
          return false;
        }

        return { nombre, apellido, mail, dni, telefono };
      }
    });

    if (isDenied) {
      await abrirModalCredencialesAdministrador(id);
      return;
    }

    if (formValues) {
      const updateRes = await fetch(`${API_URL}/administradores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });

      const data = await updateRes.json();

      if (updateRes.ok && data.success) {
        Swal.fire('Â¡Actualizado!', 'Administrador actualizado correctamente', 'success');
        document.getElementById('btnAdministradores').click();
      } else {
        Swal.fire('Error', data.message || 'Error al actualizar administrador', 'error');
      }
    }
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
  }
}

async function abrirModalCredencialesAdministrador(idAdmin) {
  try {
    const response = await fetch(`${API_URL}/administradores/${idAdmin}`);
    if (!response.ok) throw new Error('Error al cargar datos del administrador');
    const admin = await response.json();

    let passwordActual = '';
    try {
      const respUsuario = await fetch(`${API_URL}/auth/usuario-classroom/${admin.id_persona}`);
      if (respUsuario.ok) {
        const usuario = await respUsuario.json();
        passwordActual = usuario.password_plain || '';
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    }

    const { value: formValues } = await Swal.fire({
      title: 'Editar Credenciales - Dashboard',
      html: `
        <div style="text-align: left; max-width: 500px; margin: 0 auto;">
          <!-- DASHBOARD -->
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #111827; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="layout-dashboard" style="width: 20px; height: 20px;"></i>
              Dashboard
            </h3>
            
            <div style="margin-bottom: 15px;">
              <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #374151;">
                Usuario <span style="color: #9ca3af; font-weight: 400;">(actual: ${admin.usuario || ''})</span>
              </label>
              <input type="text" id="usuarioDashboard" value="${admin.usuario || ''}" 
                     onfocus="if(this.value === '${admin.usuario || ''}') this.value = '';"
                     style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; box-sizing: border-box; color: #9ca3af;">
            </div>
            
            <div style="margin-bottom: 15px;">
              <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #374151;">
                ContraseÃ±a <span style="color: #9ca3af; font-weight: 400;">(actual: ${passwordActual || 'sin configurar'})</span>
              </label>
              <div style="position: relative;">
                <input type="text" id="passwordDashboard" value="${passwordActual}"
                       onfocus="if(this.value === '${passwordActual}') this.value = '';"
                       style="width: 100%; padding: 8px 40px 8px 8px; border: 1px solid #d1d5db; border-radius: 4px; box-sizing: border-box; color: #9ca3af;">
                <button type="button" id="togglePasswordDashboard" 
                        style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; padding: 4px; display: flex; align-items: center; color: #6b7280;">
                  <i data-lucide="eye" style="width: 18px; height: 18px;"></i>
                </button>
              </div>
              <small style="color: #6b7280; font-size: 12px;">DejÃ¡ vacÃ­o para mantener la contraseÃ±a actual</small>
            </div>
          </div>
        </div>
      `,
      width: '600px',
      showCancelButton: true,
      confirmButtonText: 'Guardar Cambios',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#000',
      didOpen: () => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }

        const usuarioActualAdmin = "${admin.usuario || ''}";
        const passwordActualAdmin = "${passwordActual}";

        const inputUsuario = document.getElementById('usuarioDashboard');
        inputUsuario.addEventListener('blur', () => {
          if (inputUsuario.value.trim() === '') {
            inputUsuario.value = usuarioActualAdmin;
            inputUsuario.style.color = '#9ca3af';
          } else {
            inputUsuario.style.color = '#111827';
          }
        });

        const inputDash = document.getElementById('passwordDashboard');
        inputDash.addEventListener('blur', () => {
          if (inputDash.value.trim() === '') {
            inputDash.value = passwordActualAdmin;
            inputDash.style.color = '#9ca3af';
          } else {
            inputDash.style.color = '#111827';
          }
        });

        const toggleDash = document.getElementById('togglePasswordDashboard');
        
        toggleDash.addEventListener('click', () => {
          const isPassword = inputDash.type === 'password';
          inputDash.type = isPassword ? 'text' : 'password';
          const icon = toggleDash.querySelector('i');
          icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
          lucide.createIcons();
        });
      },
      preConfirm: () => {
        const usuarioDash = document.getElementById('usuarioDashboard').value.trim();
        const passwordDash = document.getElementById('passwordDashboard').value.trim();

        const usuarioActualAdmin = "${admin.usuario || ''}";
        const passwordActualAdmin = "${passwordActual}";

        const nuevoUsuario = (usuarioDash === '' || usuarioDash === usuarioActualAdmin) ? usuarioActualAdmin : usuarioDash;
        
        const nuevoPassword = (passwordDash === '' || passwordDash === passwordActualAdmin) ? '' : passwordDash;

        if (!nuevoUsuario) {
          Swal.showValidationMessage('El usuario del Dashboard es obligatorio');
          return false;
        }

        return {
          usuarioDashboard: nuevoUsuario,
          passwordDashboard: nuevoPassword
        };
      }
    });

    if (formValues) {
      const { usuarioDashboard, passwordDashboard } = formValues;

      try {
        const responseUsuario = await fetch(`${API_URL}/administradores/${idAdmin}/usuario`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario: usuarioDashboard })
        });

        const dataUsuario = await responseUsuario.json();
        
        if (!responseUsuario.ok) {
          Swal.fire('Error', dataUsuario.message || 'Error al actualizar usuario', 'error');
          return;
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
        return;
      }

      if (passwordDashboard && passwordDashboard.length > 0) {
        try {
          const responsePassword = await fetch(`${API_URL}/administradores/${idAdmin}/cambiar-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: passwordDashboard })
          });

          const dataPassword = await responsePassword.json();
          
          if (!responsePassword.ok) {
            Swal.fire('Error', dataPassword.message || 'Error al actualizar contraseÃ±a', 'error');
            return;
          }
        } catch (error) {
          console.error(error);
          Swal.fire('Error', 'No se pudo actualizar la contraseÃ±a', 'error');
          return;
        }
      }

      Swal.fire('Â¡Ã‰xito!', 'Credenciales actualizadas correctamente', 'success');
    }
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'No se pudo cargar los datos del administrador', 'error');
  }
}

async function cambiarPasswordAdministrador(id, nombre) {
  const { value: password } = await Swal.fire({
    title: 'Cambiar ContraseÃ±a',
    html: `
      <p>Ingresa la nueva contraseÃ±a para <strong>${nombre}</strong></p>
      <input id="nueva_password" type="password" class="swal2-input" placeholder="Nueva contraseÃ±a (mÃ­n. 6 caracteres)" style="width: 90%;">
      <input id="confirmar_password" type="password" class="swal2-input" placeholder="Confirmar contraseÃ±a" style="width: 90%; margin-top: 10px;">
    `,
    showCancelButton: true,
    confirmButtonText: 'Cambiar ContraseÃ±a',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#000',
    preConfirm: () => {
      const pass = document.getElementById('nueva_password').value;
      const confirm = document.getElementById('confirmar_password').value;

      if (!pass || pass.length < 6) {
        Swal.showValidationMessage('La contraseÃ±a debe tener al menos 6 caracteres');
        return false;
      }

      if (pass !== confirm) {
        Swal.showValidationMessage('Las contraseÃ±as no coinciden');
        return false;
      }

      return pass;
    }
  });

  if (password) {
    try {
      const res = await fetch(`${API_URL}/administradores/${id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        await Swal.fire({
          icon: 'success',
          title: 'ContraseÃ±a actualizada',
          html: `
            <p>La contraseÃ±a de <strong>${nombre}</strong> ha sido actualizada.</p>
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-top: 15px;">
              <p style="margin: 5px 0;"><strong>Nueva contraseÃ±a:</strong> ${password}</p>
            </div>
            <p style="margin-top: 15px; font-size: 13px; color: #666;">AsegÃºrate de compartir esta informaciÃ³n de forma segura.</p>
          `,
          confirmButtonColor: '#000'
        });
      } else {
        Swal.fire('Error', data.message || 'Error al cambiar contraseÃ±a', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}

async function eliminarAdministrador(id, nombre) {
  const result = await Swal.fire({
    title: 'Â¿Eliminar administrador?',
    html: `Â¿EstÃ¡s seguro de eliminar al administrador <strong>${nombre}</strong>?<br><br>
           <span style="color: #d33; font-size: 14px;">Esta acciÃ³n no se puede deshacer.</span>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'SÃ­, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      const res = await fetch(`${API_URL}/administradores/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (res.ok && data.success) {
        Swal.fire('Â¡Eliminado!', 'Administrador eliminado exitosamente', 'success');
        document.getElementById('btnAdministradores').click();
      } else {
        Swal.fire('Error', data.message || 'Error al eliminar administrador', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}

// ===== GESTIÃ“N DE CURSOS ===== //
async function openNuevoCursoModal() {
  try {
    const [idiomasRes, nivelesRes, profesoresRes, aulasRes] = await Promise.all([
      fetch(`${API_URL}/idiomas`),
      fetch(`${API_URL}/niveles`),
      fetch(`${API_URL}/profesores`),
      fetch(`${API_URL}/aulas`)
    ]);

    const idiomas = await idiomasRes.json();
    const niveles = await nivelesRes.json();
    const profesores = await profesoresRes.json();
    const aulas = await aulasRes.json();

    const { value: formValues } = await Swal.fire({
      title: 'Nuevo Curso',
      html: `
        <div style="text-align: left;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nombre del Curso</label>
            <input id="nombre_curso" class="swal2-input" placeholder="Ej: InglÃ©s BÃ¡sico A1" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Idioma</label>
            <select id="id_idioma" class="swal2-input" style="width: 100%; margin: 0;">
              <option value="">Seleccionar idioma</option>
              ${idiomas.map(i => `<option value="${i.id_idioma}">${i.nombre_idioma}</option>`).join('')}
            </select>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nivel (opcional)</label>
            <select id="id_nivel" class="swal2-input" style="width: 100%; margin: 0;">
              <option value="">Sin nivel</option>
              ${niveles.map(n => `<option value="${n.id_nivel}">${n.descripcion}</option>`).join('')}
            </select>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Profesor</label>
            <select id="id_profesor" class="swal2-input" style="width: 100%; margin: 0;">
              <option value="">Seleccionar profesor</option>
              ${profesores.map(p => `<option value="${p.id_profesor}">${p.nombre} ${p.apellido}</option>`).join('')}
            </select>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Horario (opcional)</label>
            <input id="horario" class="swal2-input" placeholder="Ej: Lun-Mie 18:00-20:00" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Cupo MÃ¡ximo</label>
            <input id="cupo_maximo" type="number" class="swal2-input" value="30" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Aula (opcional)</label>
            <select id="id_aula" class="swal2-input" style="width: 100%; margin: 0;">
              <option value="">Sin aula asignada</option>
              ${aulas.map(a => `<option value="${a.id_aula}">${a.nombre_aula} (${a.capacidad} personas)</option>`).join('')}
            </select>
          </div>
        </div>
      `,
      width: '600px',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#1e3c72',
      preConfirm: () => {
        const nombre_curso = document.getElementById('nombre_curso').value;
        const id_idioma = document.getElementById('id_idioma').value;
        const id_nivel = document.getElementById('id_nivel').value;
        const id_profesor = document.getElementById('id_profesor').value;
        const horario = document.getElementById('horario').value;
        const cupo_maximo = document.getElementById('cupo_maximo').value;
        const id_aula = document.getElementById('id_aula').value;
        
        if (!nombre_curso) {
          Swal.showValidationMessage('El nombre del curso es obligatorio');
          return false;
        }
        if (!id_idioma) {
          Swal.showValidationMessage('Debe seleccionar un idioma');
          return false;
        }
        if (!id_profesor) {
          Swal.showValidationMessage('Debe seleccionar un profesor');
          return false;
        }
        return { nombre_curso, id_idioma, id_nivel, id_profesor, horario, cupo_maximo, id_aula };
      }
    });

    if (formValues) {
      const res = await fetch(`${API_URL}/cursos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        Swal.fire('Â¡Creado!', 'Curso creado exitosamente', 'success');
        document.getElementById('btnCursos').click();
      } else {
        Swal.fire('Error', data.message || 'Error al crear curso', 'error');
      }
    }
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
  }
}

async function editarCurso(id) {
  try {
    const [cursoRes, idiomasRes, nivelesRes, profesoresRes, aulasRes] = await Promise.all([
      fetch(`${API_URL}/cursos/${id}`),
      fetch(`${API_URL}/idiomas`),
      fetch(`${API_URL}/niveles`),
      fetch(`${API_URL}/profesores`),
      fetch(`${API_URL}/aulas`)
    ]);

    const curso = await cursoRes.json();
    const idiomas = await idiomasRes.json();
    const niveles = await nivelesRes.json();
    const profesores = await profesoresRes.json();
    const aulas = await aulasRes.json();

    const { value: formValues } = await Swal.fire({
      title: 'Editar Curso',
      html: `
        <div style="text-align: left;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nombre del Curso</label>
            <input id="nombre_curso" class="swal2-input" value="${curso.nombre_curso}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Idioma</label>
            <select id="id_idioma" class="swal2-input" style="width: 100%; margin: 0;">
              ${idiomas.map(i => `<option value="${i.id_idioma}" ${curso.id_idioma == i.id_idioma ? 'selected' : ''}>${i.nombre_idioma}</option>`).join('')}
            </select>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nivel</label>
            <select id="id_nivel" class="swal2-input" style="width: 100%; margin: 0;">
              <option value="">Sin nivel</option>
              ${niveles.map(n => `<option value="${n.id_nivel}" ${curso.id_nivel == n.id_nivel ? 'selected' : ''}>${n.descripcion}</option>`).join('')}
            </select>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Profesor</label>
            <select id="id_profesor" class="swal2-input" style="width: 100%; margin: 0;">
              ${profesores.map(p => `<option value="${p.id_profesor}" ${curso.id_profesor == p.id_profesor ? 'selected' : ''}>${p.nombre} ${p.apellido}</option>`).join('')}
            </select>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Horario</label>
            <input id="horario" class="swal2-input" value="${curso.horario || ''}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Cupo MÃ¡ximo</label>
            <input id="cupo_maximo" type="number" class="swal2-input" value="${curso.cupo_maximo}" style="width: 100%; margin: 0;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Aula</label>
            <select id="id_aula" class="swal2-input" style="width: 100%; margin: 0;">
              <option value="">Sin aula asignada</option>
              ${aulas.map(a => `<option value="${a.id_aula}" ${curso.id_aula == a.id_aula ? 'selected' : ''}>${a.nombre_aula} (${a.capacidad} personas)</option>`).join('')}
            </select>
          </div>
        </div>
      `,
      width: '600px',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#1e3c72',
      preConfirm: () => {
        const nombre_curso = document.getElementById('nombre_curso').value;
        const id_idioma = document.getElementById('id_idioma').value;
        const id_nivel = document.getElementById('id_nivel').value;
        const id_profesor = document.getElementById('id_profesor').value;
        const horario = document.getElementById('horario').value;
        const cupo_maximo = document.getElementById('cupo_maximo').value;
        const id_aula = document.getElementById('id_aula').value;
        
        if (!nombre_curso || !id_idioma || !id_profesor) {
          Swal.showValidationMessage('Nombre del curso, idioma y profesor son obligatorios');
          return false;
        }
        return { nombre_curso, id_idioma, id_nivel, id_profesor, horario, cupo_maximo, id_aula };
      }
    });

    if (formValues) {
      const updateRes = await fetch(`${API_URL}/cursos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });
      
      const data = await updateRes.json();
      
      if (updateRes.ok && data.success) {
        Swal.fire('Â¡Actualizado!', 'Curso actualizado exitosamente', 'success');
        document.getElementById('btnCursos').click();
      } else {
        Swal.fire('Error', data.message || 'Error al actualizar curso', 'error');
      }
    }
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
  }
}

async function eliminarCurso(id, nombre) {
  const result = await Swal.fire({
    title: 'Â¿Eliminar curso?',
    html: `Â¿EstÃ¡s seguro de eliminar el curso <strong>${nombre}</strong>?<br><br>
           <span style="color: #d33; font-size: 14px;">Se eliminarÃ¡n todas las calificaciones, asistencias e inscripciones asociadas.</span>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'SÃ­, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      const res = await fetch(`${API_URL}/cursos/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (res.ok && data.success) {
        Swal.fire('Â¡Eliminado!', 'Curso eliminado exitosamente', 'success');
        document.getElementById('btnCursos').click();
      } else {
        Swal.fire('Error', data.message || 'Error al eliminar curso', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  }
}

async function asignarProfesorACurso(idCurso, nombreCurso) {
  try {
    const res = await fetch(`${API_URL}/profesores`);
    const profesores = await res.json();
    
    if (!profesores || profesores.length === 0) {
      Swal.fire('Sin profesores', 'No hay profesores disponibles para asignar', 'info');
      return;
    }

    const profesoresActivos = profesores.filter(p => p.estado === 'activo');
    
    if (profesoresActivos.length === 0) {
      Swal.fire('Sin profesores activos', 'No hay profesores activos disponibles', 'info');
      return;
    }

    const opcionesHTML = profesoresActivos.map(p => 
      `<option value="${p.id_profesor}">${p.nombre} ${p.apellido} - ${p.especialidad || 'Sin especialidad'}</option>`
    ).join('');

    const { value: idProfesor } = await Swal.fire({
      title: 'Asignar Profesor',
      html: `
        <p style="margin-bottom: 15px;">Curso: <strong>${nombreCurso}</strong></p>
        <label style="display: block; text-align: left; margin-bottom: 8px; font-weight: 500;">
          Seleccione el profesor:
        </label>
        <select id="swal-profesor-select" class="swal2-input" style="width: 100%; padding: 10px; font-size: 14px;">
          <option value="">-- Seleccione un profesor --</option>
          ${opcionesHTML}
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Asignar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#1976d2',
      preConfirm: () => {
        const select = document.getElementById('swal-profesor-select');
        if (!select.value) {
          Swal.showValidationMessage('Debe seleccionar un profesor');
          return false;
        }
        return select.value;
      }
    });

    if (idProfesor) {
      const updateRes = await fetch(`${API_URL}/cursos/${idCurso}/profesor`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_profesor: idProfesor })
      });

      const data = await updateRes.json();

      if (updateRes.ok && data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Â¡Asignado!',
          text: 'Profesor asignado correctamente al curso',
          timer: 2000,
          showConfirmButton: false
        });
        document.getElementById('btnCursos').click();
      } else {
        Swal.fire('Error', data.message || 'Error al asignar profesor', 'error');
      }
    }
  } catch (error) {
    console.error('Error al asignar profesor:', error);
    Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
  }
}


if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.remove('hidden');
        } else {
          entry.target.classList.remove('visible');
          entry.target.classList.add('hidden');
        }
      });
    }, observerOptions);

    // Observar secciones
    const sections = document.querySelectorAll('.section-content, .about-content, .stats-grid, .faq-item');
    sections.forEach(section => {
      section.classList.add('scroll-animate');
      observer.observe(section);
    });

    // Observar cards (feature, role, module)
    const cards = document.querySelectorAll('.feature-card, .role-card, .module-card');
    cards.forEach(card => {
      observer.observe(card);
    });

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.remove('hidden');
        } else {
          entry.target.classList.remove('visible');
          entry.target.classList.add('hidden');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const images = document.querySelectorAll('.animate-on-scroll');
    images.forEach(img => {
      img.classList.add('scroll-animate-img');
      imageObserver.observe(img);
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const heroImage = document.querySelector('.hero-main .hero-image');
          if (heroImage && scrolled < 800) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });

    const animateNumber = (element, target) => {
      const duration = 2000;
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target + '+';
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current) + '+';
        }
      }, 16);
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('animated');
          setTimeout(() => {
            entry.target.classList.add('animated');
            const number = parseInt(entry.target.dataset.number);
            if (number) animateNumber(entry.target, number);
          }, 100);
        } else {
          const number = parseInt(entry.target.dataset.number);
          entry.target.textContent = '0+';
        }
      });
    }, { threshold: 0.3 });

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const number = parseInt(stat.textContent);
      stat.dataset.number = number;
      stat.textContent = '0+';
      statsObserver.observe(stat);
    });
  });
}

const style = document.createElement('style');
style.textContent = `
  .scroll-animate {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .scroll-animate.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .scroll-animate.hidden {
    opacity: 0;
    transform: translateY(40px);
  }
  
  .scroll-animate-img {
    opacity: 0 !important;
    transform: scale(0.9) translateY(30px) !important;
    transition: opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1), 
                transform 1.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  
  .scroll-animate-img.visible {
    opacity: 1 !important;
    transform: scale(1) translateY(0) !important;
  }
  
  .scroll-animate-img.hidden {
    opacity: 0 !important;
    transform: scale(0.9) translateY(30px) !important;
  }
`;
document.head.appendChild(style);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
  ripple.classList.add('ripple-effect');

  const existingRipple = button.getElementsByClassName('ripple-effect')[0];
  if (existingRipple) {
    existingRipple.remove();
  }

  button.appendChild(ripple);
}

const buttons = document.querySelectorAll('.cta-btn, .cta-btn-secondary, .login-btn');
buttons.forEach(button => {
  button.addEventListener('click', createRipple);
});


async function loadCuotasGestion() {
  const container = document.getElementById('cuotasGestionContainer');
  if (!container) return;

  container.innerHTML = `
    <div style="max-width: 1400px; margin: 0 auto;">
      <div style="background: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="margin-bottom: 32px;">
          <h2 style="margin: 0; color: #1f2937; font-size: 28px;"> GestiÃ³n de Cuotas Disponibles</h2>
          <p style="margin: 8px 0 0 0; color: #6b7280;">Controla quÃ© cuotas pueden pagar los alumnos en cada curso</p>
        </div>

        <div id="cursosListaCuotas" style="display: grid; gap: 20px;">
          <div style="text-align: center; padding: 60px; color: #9ca3af;">
            <i data-lucide="loader" style="width: 48px; height: 48px; animation: spin 1s linear infinite;"></i>
            <p style="margin-top: 16px;">Cargando cursos...</p>
          </div>
        </div>
      </div>
    </div>
  `;

  if (typeof lucide !== 'undefined') lucide.createIcons();

  try {
    const response = await fetch(`${API_URL}/cursos`);
    const cursos = await response.json();

    const listaCursos = document.getElementById('cursosListaCuotas');
    if (cursos.length === 0) {
      listaCursos.innerHTML = `
        <div style="text-align: center; padding: 60px; color: #9ca3af;">
          <i data-lucide="inbox" style="width: 48px; height: 48px;"></i>
          <p style="margin-top: 16px;">No hay cursos disponibles</p>
        </div>
      `;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }

    listaCursos.innerHTML = cursos.map(curso => `
      <div style="background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px; padding: 24px; transition: all 0.3s;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px;">
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <div style="background: #667eea; color: white; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                <i data-lucide="book-open" style="width: 20px; height: 20px;"></i>
              </div>
              <div>
                <h3 style="margin: 0; color: #111827; font-size: 20px;">${curso.nombre_curso}</h3>
                <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">${curso.nombre_idioma} - ${curso.nivel || 'Sin nivel'}</p>
              </div>
            </div>
            <div style="display: flex; gap: 24px; margin-top: 12px; font-size: 14px; color: #6b7280;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <i data-lucide="user" style="width: 16px; height: 16px;"></i>
                <span>${curso.profesor || 'Sin profesor'}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <i data-lucide="users" style="width: 16px; height: 16px;"></i>
                <span>${curso.alumnos_inscritos || 0} alumnos</span>
              </div>
            </div>
          </div>
          <button onclick="gestionarCuotasCurso(${curso.id_curso}, '${curso.nombre_curso.replace(/'/g, "\\'")}')" class="btn-primary" style="white-space: nowrap;">
            <i data-lucide="settings"></i>
            Gestionar Cuotas
          </button>
        </div>
        <div id="cuotasPreview_${curso.id_curso}" style="padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
          Cargando...
        </div>
      </div>
    `).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();

    cursos.forEach(async (curso) => {
      try {
        const resC = await fetch(`${API_URL}/cursos/${curso.id_curso}/cuotas`);
        const dataCuotas = await resC.json();
        const preview = document.getElementById(`cuotasPreview_${curso.id_curso}`);
        
        const cuotas = dataCuotas.cuotasHabilitadas || [];
        
        if (cuotas.length === 10) {
          preview.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px; color: #059669;">
              <i data-lucide="check-circle" style="width: 16px; height: 16px;"></i>
              <span><strong>Todas las cuotas habilitadas</strong> (sin restricciones)</span>
            </div>
          `;
        } else if (cuotas.length === 0) {
          preview.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px; color: #dc2626;">
              <i data-lucide="x-circle" style="width: 16px; height: 16px;"></i>
              <span><strong>Ninguna cuota habilitada</strong></span>
            </div>
          `;
        } else {
          preview.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
              <i data-lucide="lock" style="width: 16px; height: 16px;"></i>
              <span><strong>${cuotas.length} cuotas habilitadas:</strong> ${cuotas.join(', ')}</span>
            </div>
          `;
        }
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
      } catch (error) {
        console.error('Error al cargar preview de cuotas:', error);
      }
    });

  } catch (error) {
    console.error('Error al cargar cursos:', error);
    listaCursos.innerHTML = `
      <div style="text-align: center; padding: 60px; color: #ef4444;">
        <i data-lucide="alert-circle" style="width: 48px; height: 48px;"></i>
        <p style="margin-top: 16px;">Error al cargar los cursos</p>
      </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

async function gestionarCuotasCurso(idCurso, nombreCurso) {
  try {
    const passwordResponse = await fetch(`${API_URL}/config/cobranzas-password`);
    const passwordData = await passwordResponse.json();
    const claveCorrecta = passwordData.password || 'tesoreria';

    const { value: claveIngresada } = await Swal.fire({
      title: 'COBRANZAS',
      html: `
        <style>
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
          }
          @keyframes unlock {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(-15deg); }
            100% { transform: rotate(0deg); }
          }
          .lock-icon {
            font-size: 64px;
            margin-bottom: 20px;
            transition: all 0.3s ease;
          }
          .shake { animation: shake 0.5s; }
          .unlock-animation { animation: unlock 0.6s ease; }
        </style>
        <div style="text-align: center; padding: 20px;">
          <div id="lock-icon" class="lock-icon"></div>
          <p style="margin-bottom: 24px; color: #6b7280; font-size: 15px;">
            Ingrese la clave asignada para ingresar
          </p>
          <input id="swal-password" type="password" class="swal2-input" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" style="width: 100%; margin: 0; text-align: center; font-size: 18px; letter-spacing: 2px;" autocomplete="off">
        </div>
      `,
      width: '450px',
      showCancelButton: true,
      confirmButtonText: '<i class="lucide-unlock" style="width: 16px; height: 16px;"></i> Acceder',
      cancelButtonText: '<i class="lucide-x" style="width: 16px; height: 16px;"></i> Cancelar',
      confirmButtonColor: '#1976d2',
      cancelButtonColor: '#757575',
      focusConfirm: false,
      didOpen: () => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
        document.getElementById('swal-password').focus();
      },
      preConfirm: () => {
        const password = document.getElementById('swal-password').value;
        const lockIcon = document.getElementById('lock-icon');
        
        if (!password) {
          lockIcon.classList.add('shake');
          lockIcon.style.filter = 'brightness(0.8)';
          setTimeout(() => {
            lockIcon.classList.remove('shake');
            lockIcon.style.filter = 'none';
          }, 500);
          Swal.showValidationMessage('Debe ingresar la clave');
          return false;
        }
        
        if (password !== claveCorrecta) {
          lockIcon.textContent = '';
          lockIcon.classList.add('shake');
          lockIcon.style.color = '#ef4444';
          setTimeout(() => {
            lockIcon.classList.remove('shake');
            lockIcon.style.color = '';
          }, 500);
          Swal.showValidationMessage(' Clave incorrecta');
          return false;
        }
        
        return new Promise((resolve) => {
          setTimeout(() => {
            lockIcon.textContent = '';
            lockIcon.classList.add('unlock-animation');
            lockIcon.style.color = '#10b981';
            
            setTimeout(() => {
              resolve(password);
            }, 700);
          }, 200);
        });
      }
    });

    if (!claveIngresada) {
      return;
    }

    const response = await fetch(`${API_URL}/cursos/${idCurso}/cuotas`);
    const data = await response.json();

    const todasLasCuotas = ['Matricula', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre'];
    const cuotasActuales = data.cuotasHabilitadas || [];

    const result = await Swal.fire({
      title: ` Gestionar Cuotas`,
      html: `
        <div style="text-align: left;">
          <p style="margin-bottom: 20px; color: #6b7280;">
            <strong style="color: #111827;">${nombreCurso}</strong><br>
            Selecciona las cuotas que los alumnos PUEDEN pagar en este curso
          </p>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
            ${todasLasCuotas.map(cuota => `
              <label style="display: flex; align-items: center; gap: 10px; padding: 12px; background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
                <input type="checkbox" value="${cuota}" ${cuotasActuales.includes(cuota) ? 'checked' : ''} style="width: 18px; height: 18px; cursor: pointer;">
                <span style="font-weight: 500; color: #374151;">${cuota}</span>
              </label>
            `).join('')}
          </div>
          <div style="margin-top: 20px; padding: 16px; background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #1e40af;">
               <strong>Tip:</strong> Los alumnos solo verÃ¡n y podrÃ¡n pagar las cuotas seleccionadas.
            </p>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar Cambios',
      cancelButtonText: 'Cancelar',
      width: '600px',
      customClass: {
        confirmButton: 'swal2-confirm swal2-styled',
        cancelButton: 'swal2-cancel swal2-styled'
      },
      preConfirm: () => {
        const checkboxes = Swal.getPopup().querySelectorAll('input[type="checkbox"]:checked');
        return Array.from(checkboxes).map(cb => cb.value);
      }
    });

    if (result.isConfirmed) {
      const cuotasSeleccionadas = result.value || [];

      const saveResponse = await fetch(`${API_URL}/cursos/${idCurso}/cuotas`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cuotas: cuotasSeleccionadas })
      });

      const saveData = await saveResponse.json();

      if (saveData.success) {
        await Swal.fire({
          icon: 'success',
          title: ' Cuotas Actualizadas',
          text: `Las cuotas han sido actualizadas para ${nombreCurso}`,
          timer: 2000,
          showConfirmButton: false
        });

        loadCuotasGestion();
      } else {
        throw new Error(saveData.message || 'Error al guardar');
      }
    }

  } catch (error) {
    console.error('Error al gestionar cuotas:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudieron actualizar las cuotas del curso'
    });
  }
}

async function liberarCuotasTodasLosCursos() {
  const todasLasCuotas = ['Matricula', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre'];

  const result = await Swal.fire({
    title: ' Liberar Cuotas para TODOS los Cursos',
    html: `
      <div style="text-align: left;">
        <p style="margin-bottom: 20px; color: #6b7280;">
          Selecciona las cuotas que estarÃ¡n disponibles para <strong style="color: #111827;">TODOS los cursos</strong>
        </p>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
          ${todasLasCuotas.map(cuota => `
            <label style="display: flex; align-items: center; gap: 10px; padding: 12px; background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
              <input type="checkbox" value="${cuota}" style="width: 18px; height: 18px; cursor: pointer;">
              <span style="font-weight: 500; color: #374151;">${cuota}</span>
            </label>
          `).join('')}
        </div>
        <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px; color: #92400e;">
            ï¸ <strong>AtenciÃ³n:</strong> Esto sobrescribirÃ¡ la configuraciÃ³n de TODOS los cursos.
          </p>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Aplicar a Todos',
    cancelButtonText: 'Cancelar',
    width: '600px',
    confirmButtonColor: '#dc2626',
    preConfirm: () => {
      const checkboxes = Swal.getPopup().querySelectorAll('input[type="checkbox"]:checked');
      return Array.from(checkboxes).map(cb => cb.value);
    }
  });

  if (result.isConfirmed) {
    const cuotasSeleccionadas = result.value;

    if (cuotasSeleccionadas.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'AtenciÃ³n',
        text: 'Debes seleccionar al menos una cuota'
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/cursos/cuotas/todos`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cuotas: cuotasSeleccionadas })
      });

      const data = await response.json();

      if (data.success) {
        await Swal.fire({
          icon: 'success',
          title: ' Cuotas Actualizadas',
          text: `Las cuotas han sido actualizadas para ${data.cursos_actualizados} cursos`,
          timer: 2500,
          showConfirmButton: false
        });

        loadCuotasGestion();
      } else {
        throw new Error(data.message || 'Error al guardar');
      }

    } catch (error) {
      console.error('Error al liberar cuotas:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron actualizar las cuotas'
      });
    }
  }
}

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  button {
    position: relative;
    overflow: hidden;
  }
  
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// ===== GENERACIÃ“N DE PDFs ===== //

async function descargarPDFAlumnos() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const responseAlumnos = await fetch(`${API_URL}/alumnos`);
    const alumnos = await responseAlumnos.json();
    
    const responseInscripciones = await fetch(`${API_URL}/inscripciones`);
    const inscripciones = await responseInscripciones.json();
    
    const inscripcionesPorAlumno = {};
    inscripciones.forEach(insc => {
      if (!inscripcionesPorAlumno[insc.id_alumno]) {
        inscripcionesPorAlumno[insc.id_alumno] = [];
      }
      if (insc.estado === 'activo') {
        inscripcionesPorAlumno[insc.id_alumno].push(insc.nombre_curso);
      }
    });
    
    const img = new Image();
    img.src = '/images/logo.png';
    await new Promise((resolve) => {
      img.onload = () => {
        doc.addImage(img, 'PNG', 160, 10, 30, 30);
        resolve();
      };
      img.onerror = resolve; // Continuar si falla la carga del logo
    });
    
    doc.setFontSize(20);
    doc.setTextColor(25, 118, 210); // Azul del sistema
    doc.text('CEMI - Listado de Alumnos', 14, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generado: ${new Date().toLocaleDateString('es-ES')}`, 14, 32);
    
    const tableData = alumnos.map(alumno => {
      const nombreCompleto = `${alumno.nombre || ''} ${alumno.apellido || ''}`.trim() || '-';
      const cursos = inscripcionesPorAlumno[alumno.id_alumno]?.join(', ') || 'Sin cursos';
      
      return [
        nombreCompleto,
        alumno.mail || '-',
        alumno.telefono || '-',
        alumno.dni || '-',
        cursos,
        alumno.estado || '-'
      ];
    });
    
    doc.autoTable({
      startY: 45,
      head: [['Nombre Completo', 'Email', 'TelÃ©fono', 'DNI', 'Cursos Inscritos', 'Estado']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [25, 118, 210], // Azul del sistema
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 9
      },
      bodyStyles: {
        fontSize: 8
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250]
      },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 45 },
        2: { cellWidth: 25 },
        3: { cellWidth: 20 },
        4: { cellWidth: 45 },
        5: { cellWidth: 18 }
      },
      margin: { left: 14, right: 14 }
    });
    
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `PÃ¡gina ${i} de ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }
    
    doc.save(`CEMI_Alumnos_${new Date().toISOString().split('T')[0]}.pdf`);
    
    showToast('PDF descargado exitosamente', 'success');
  } catch (error) {
    console.error('Error al generar PDF de alumnos:', error);
    showToast('Error al generar el PDF', 'error');
  }
}

async function descargarPDFProfesores() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const responseProfesores = await fetch(`${API_URL}/profesores`);
    const profesores = await responseProfesores.json();
    
    const responseCursos = await fetch(`${API_URL}/cursos`);
    const cursos = await responseCursos.json();
    
    const cursosPorProfesor = {};
    cursos.forEach(curso => {
      if (!cursosPorProfesor[curso.id_profesor]) {
        cursosPorProfesor[curso.id_profesor] = [];
      }
      cursosPorProfesor[curso.id_profesor].push(curso.nombre_curso);
    });
    
    const img = new Image();
    img.src = '/images/logo.png';
    await new Promise((resolve) => {
      img.onload = () => {
        doc.addImage(img, 'PNG', 160, 10, 30, 30);
        resolve();
      };
      img.onerror = resolve;
    });
    
    doc.setFontSize(20);
    doc.setTextColor(25, 118, 210);
    doc.text('CEMI - Listado de Profesores', 14, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generado: ${new Date().toLocaleDateString('es-ES')}`, 14, 32);
    
    const tableData = profesores.map(profesor => {
      const nombreCompleto = `${profesor.nombre || ''} ${profesor.apellido || ''}`.trim() || '-';
      const cursos = cursosPorProfesor[profesor.id_profesor]?.join(', ') || 'Sin cursos asignados';
      
      return [
        nombreCompleto,
        profesor.mail || '-',
        profesor.telefono || '-',
        profesor.especialidad || '-',
        cursos,
        profesor.estado || '-'
      ];
    });
    
    doc.autoTable({
      startY: 45,
      head: [['Nombre Completo', 'Email', 'TelÃ©fono', 'Especialidad', 'Cursos que Dicta', 'Estado']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [25, 118, 210],
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 9
      },
      bodyStyles: {
        fontSize: 8
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250]
      },
      columnStyles: {
        0: { cellWidth: 38 },
        1: { cellWidth: 48 },
        2: { cellWidth: 28 },
        3: { cellWidth: 32 },
        4: { cellWidth: 35 },
        5: { cellWidth: 17 }
      },
      margin: { left: 14, right: 14 }
    });
    
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `PÃ¡gina ${i} de ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }
    
    doc.save(`CEMI_Profesores_${new Date().toISOString().split('T')[0]}.pdf`);
    
    showToast('PDF descargado exitosamente', 'success');
  } catch (error) {
    console.error('Error al generar PDF de profesores:', error);
    showToast('Error al generar el PDF', 'error');
  }
}

// ===== GENERACIÃ“N DE COMPROBANTE DE PAGO ===== //

async function generarComprobantePago(idPago) {
  try {
    const { jsPDF } = window.jspdf;
    
    const response = await fetch(`${API_URL}/pagos/${idPago}`);
    const pago = await response.json();
    
    if (!pago || !pago.id_pago) {
      throw new Error('No se encontrÃ³ el pago');
    }
    
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [80, 200] // Ancho de ticket tÃ©rmico
    });
    
    let yPos = 15;
    
    const img = new Image();
    img.src = '/images/logo.png';
    await new Promise((resolve) => {
      img.onload = () => {
        doc.addImage(img, 'PNG', 25, yPos, 30, 30);
        resolve();
      };
      img.onerror = resolve;
    });
    
    yPos += 35;
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('COMPROBANTE DE PAGO', 40, yPos, { align: 'center' });
    yPos += 8;
    
    doc.setDrawColor(200);
    doc.line(10, yPos, 70, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('NÂ° Comprobante:', 40, yPos, { align: 'center' });
    yPos += 5;
    doc.setFontSize(14);
    doc.setTextColor(25, 118, 210);
    doc.text(`#${String(pago.id_pago).padStart(6, '0')}`, 40, yPos, { align: 'center' });
    doc.setTextColor(0);
    yPos += 10;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha: ${new Date(pago.fecha_pago).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })}`, 40, yPos, { align: 'center' });
    yPos += 10;
    
    doc.line(10, yPos, 70, yPos);
    yPos += 7;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL ALUMNO', 40, yPos, { align: 'center' });
    yPos += 5;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Alumno:', 12, yPos);
    doc.setFont('helvetica', 'bold');
    const nombreLines = doc.splitTextToSize(pago.alumno || '-', 46);
    doc.text(nombreLines, 68, yPos, { align: 'right' });
    yPos += nombreLines.length * 3.5 + 1;
    
    doc.setFont('helvetica', 'normal');
    doc.text('Legajo:', 12, yPos);
    doc.setFont('helvetica', 'bold');
    doc.text(pago.legajo || '-', 68, yPos, { align: 'right' });
    yPos += 4;
    
    doc.setFont('helvetica', 'normal');
    doc.text('DNI:', 12, yPos);
    doc.setFont('helvetica', 'bold');
    doc.text(String(pago.dni) || '-', 68, yPos, { align: 'right' });
    yPos += 6;
    
    doc.line(10, yPos, 70, yPos);
    yPos += 5;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('DETALLES DEL PAGO', 40, yPos, { align: 'center' });
    yPos += 5;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Concepto:', 12, yPos);
    doc.setFont('helvetica', 'bold');
    doc.text(pago.concepto || '-', 68, yPos, { align: 'right' });
    yPos += 4;
    
    if (pago.mes_cuota) {
      doc.setFont('helvetica', 'normal');
      doc.text('Cuota:', 12, yPos);
      doc.setFont('helvetica', 'bold');
      doc.text(pago.mes_cuota, 68, yPos, { align: 'right' });
      yPos += 4;
    }
    
    if (pago.periodo) {
      doc.setFont('helvetica', 'normal');
      doc.text('PerÃ­odo:', 12, yPos);
      doc.setFont('helvetica', 'bold');
      doc.text(pago.periodo, 68, yPos, { align: 'right' });
      yPos += 4;
    }
    
    doc.setFont('helvetica', 'normal');
    doc.text('Medio de Pago:', 12, yPos);
    doc.setFont('helvetica', 'bold');
    doc.text(pago.medio_pago || '-', 68, yPos, { align: 'right' });
    yPos += 6;
    
    doc.setFillColor(25, 118, 210);
    doc.rect(10, yPos, 60, 10, 'F');
    doc.setTextColor(255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL PAGADO', 15, yPos + 4);
    doc.setFontSize(12);
    doc.text(`$${parseFloat(pago.monto).toLocaleString('es-AR', {minimumFractionDigits: 2})}`, 65, yPos + 6.5, { align: 'right' });
    doc.setTextColor(0);
    yPos += 14;
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(76, 175, 80);
    doc.text(' PAGO CONFIRMADO', 40, yPos, { align: 'center' });
    doc.setTextColor(0);
    yPos += 7;
    
    doc.setDrawColor(200);
    doc.line(10, yPos, 70, yPos);
    yPos += 5;
    
    doc.setFontSize(7);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100);
    doc.text('Centro de enseÃ±anza de idiomas - CEMI', 40, yPos, { align: 'center' });
    yPos += 4;
    doc.text(`Comprobante generado el ${new Date().toLocaleDateString('es-ES')}`, 40, yPos, { align: 'center' });
    yPos += 3;
    doc.setFontSize(6);
    doc.text('Este documento es un comprobante vÃ¡lido de pago', 40, yPos, { align: 'center' });
    
    const nombreArchivo = `Comprobante_${String(pago.id_pago).padStart(6, '0')}_${pago.alumno.replace(/\s+/g, '_')}.pdf`;
    doc.save(nombreArchivo);
    
    showToast('Comprobante generado exitosamente', 'success');
  } catch (error) {
    console.error('Error al generar comprobante:', error);
    showToast('Error al generar el comprobante', 'error');
  }
}

// =====================================================
// SECCIÃ“N DE INVESTIGACIÃ“N CEMI
// =====================================================

async function renderInvestigacionSection() {
  try {
    const [statsRes, encuestasRes] = await Promise.all([
      fetch(`${API_URL}/investigacion/estadisticas`),
      fetch(`${API_URL}/investigacion/encuestas`)
    ]);
    
    const stats = await statsRes.json();
    const encuestas = await encuestasRes.json();
    
    return `
      <div class="investigacion-container">
        <div class="investigacion-header">
          <div class="investigacion-title">
            <i data-lucide="flask-conical" style="color: #1e3a5f;"></i>
            <div>
              <h2 style="color: #1e3a5f;">InvestigaciÃ³n CEMI</h2>
              <p>Centro de recopilaciÃ³n de datos de experiencia de usuario</p>
            </div>
          </div>
          <a href="formulario-encuesta.html" target="_blank" class="btn-primary" style="display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #1e3a5f, #2563eb);">
            <i data-lucide="external-link"></i>
            Ver Landing de Encuesta
          </a>
        </div>

        <!-- EstadÃ­sticas -->
        <div class="investigacion-stats">
          <div class="stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">
              <i data-lucide="file-text"></i>
            </div>
            <div class="stat-info">
              <span class="stat-number">${stats.estadisticas?.total || 0}</span>
              <span class="stat-label">Total Encuestas</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #2563eb, #3b82f6);">
              <i data-lucide="star"></i>
            </div>
            <div class="stat-info">
              <span class="stat-number">${stats.estadisticas?.promedioSatisfaccion || '0.0'}</span>
              <span class="stat-label">SatisfacciÃ³n Promedio</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #3b82f6, #60a5fa);">
              <i data-lucide="smile"></i>
            </div>
            <div class="stat-info">
              <span class="stat-number">${stats.estadisticas?.distribucionSatisfaccion?.[10] || 0}</span>
              <span class="stat-label">Muy Satisfechos</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #1e40af, #1e3a5f);">
              <i data-lucide="calendar"></i>
            </div>
            <div class="stat-info">
              <span class="stat-number">${stats.estadisticas?.ultimaEncuesta ? new Date(stats.estadisticas.ultimaEncuesta).toLocaleDateString('es-AR', {day: '2-digit', month: 'short'}) : 'N/A'}</span>
              <span class="stat-label">Ãšltima Encuesta</span>
            </div>
          </div>
        </div>

        <!-- Lista de Encuestas -->
        <div class="investigacion-list-container">
          <div class="list-header">
            <h3><i data-lucide="list"></i> Encuestas Recibidas</h3>
            <div class="list-actions">
              <input type="text" id="searchEncuestas" placeholder="Buscar por nombre o email..." class="search-input">
            </div>
          </div>
          
          <div class="encuestas-list" id="encuestasList">
            ${encuestas.encuestas?.length === 0 || !encuestas.encuestas ? `
              <div class="empty-state">
                <i data-lucide="inbox"></i>
                <h4>No hay encuestas aÃºn</h4>
                <p>Las encuestas completadas aparecerÃ¡n aquÃ­</p>
              </div>
            ` : encuestas.encuestas.map(enc => `
              <div class="encuesta-item" data-id="${enc.id}">
                <div class="encuesta-avatar" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">
                  <span>${enc.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}</span>
                </div>
                <div class="encuesta-info">
                  <div class="encuesta-name">${enc.nombre}</div>
                  <div class="encuesta-meta">
                    <span><i data-lucide="mail"></i> ${enc.email}</span>
                    <span class="satisfaction-badge satisfaction-${enc.satisfaction || 'na'}">
                      <i data-lucide="star"></i> ${enc.satisfaction || 'N/A'}/10
                    </span>
                  </div>
                </div>
                <div class="encuesta-date">
                  <i data-lucide="calendar"></i>
                  ${new Date(enc.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
                <div class="encuesta-actions">
                  <button class="btn-icon btn-view" onclick="verEncuestaPDF('${enc.pdfUrl}')" title="Ver PDF">
                    <i data-lucide="eye"></i>
                  </button>
                  <button class="btn-icon btn-download" onclick="descargarEncuestaPDF('${enc.pdfUrl}', '${enc.nombre}')" title="Descargar">
                    <i data-lucide="download"></i>
                  </button>
                  <button class="btn-icon btn-delete" onclick="eliminarEncuesta('${enc.id}')" title="Eliminar">
                    <i data-lucide="trash-2"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Modal para PDF Viewer -->
        <div class="pdf-viewer-modal" id="pdfViewerModal">
          <div class="pdf-viewer-content">
            <div class="pdf-viewer-header">
              <h3><i data-lucide="file-text"></i> Visualizador de Encuesta</h3>
              <button class="btn-close-modal" onclick="cerrarPDFViewer()">
                <i data-lucide="x"></i>
              </button>
            </div>
            <div class="pdf-viewer-body">
              <iframe id="pdfViewerFrame" src="" frameborder="0"></iframe>
            </div>
          </div>
        </div>
      </div>

      <style>
        .investigacion-container {
          padding: 20px;
        }
        
        .investigacion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .investigacion-title {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .investigacion-title > i {
          width: 48px;
          height: 48px;
          color: #547194;
        }
        
        .investigacion-title h2 {
          margin: 0;
          color: #2c3e50;
        }
        
        .investigacion-title p {
          margin: 4px 0 0;
          color: #666;
          font-size: 14px;
        }
        
        .investigacion-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        
        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .stat-icon i {
          width: 28px;
          height: 28px;
        }
        
        .stat-info {
          display: flex;
          flex-direction: column;
        }
        
        .stat-number {
          font-size: 28px;
          font-weight: 700;
          color: #2c3e50;
        }
        
        .stat-label {
          font-size: 13px;
          color: #666;
        }
        
        .investigacion-list-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        
        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #eee;
          flex-wrap: wrap;
          gap: 12px;
        }
        
        .list-header h3 {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #2c3e50;
        }
        
        .list-header h3 i {
          width: 20px;
          height: 20px;
          color: #547194;
        }
        
        .search-input {
          padding: 10px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          min-width: 250px;
          transition: border-color 0.2s;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #547194;
        }
        
        .encuestas-list {
          max-height: 500px;
          overflow-y: auto;
        }
        
        .encuesta-item {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          border-bottom: 1px solid #f0f0f0;
          gap: 16px;
          transition: background-color 0.2s;
        }
        
        .encuesta-item:hover {
          background-color: #f8f9ff;
        }
        
        .encuesta-avatar {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 16px;
          flex-shrink: 0;
        }
        
        .encuesta-info {
          flex: 1;
          min-width: 0;
        }
        
        .encuesta-name {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 4px;
        }
        
        .encuesta-meta {
          display: flex;
          gap: 16px;
          font-size: 13px;
          color: #666;
          flex-wrap: wrap;
        }
        
        .encuesta-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .encuesta-meta i {
          width: 14px;
          height: 14px;
        }
        
        .satisfaction-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          background: #dbeafe;
          color: #1e3a5f;
        }
        
        .satisfaction-badge i {
          width: 12px;
          height: 12px;
        }
        
        .satisfaction-10, .satisfaction-9, .satisfaction-8 {
          background: #1e3a5f;
          color: white;
        }
        
        .satisfaction-7, .satisfaction-6 {
          background: #2563eb;
          color: white;
        }
        
        .satisfaction-5, .satisfaction-4 {
          background: #60a5fa;
          color: white;
        }
        
        .satisfaction-3, .satisfaction-2, .satisfaction-1 {
          background: #93c5fd;
          color: #1e3a5f;
        }
        
        .satisfaction-na {
          background: #e5e7eb;
          color: #6b7280;
        }
        
        .encuesta-date {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #888;
          white-space: nowrap;
        }
        
        .encuesta-date i {
          width: 14px;
          height: 14px;
        }
        
        .encuesta-actions {
          display: flex;
          gap: 8px;
        }
        
        .btn-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        
        .btn-icon i {
          width: 18px;
          height: 18px;
        }
        
        .btn-view {
          background: #dbeafe;
          color: #1e3a5f;
        }
        
        .btn-view:hover {
          background: #1e3a5f;
          color: white;
        }
        
        .btn-download {
          background: #dbeafe;
          color: #2563eb;
        }
        
        .btn-download:hover {
          background: #2563eb;
          color: white;
        }
        
        .btn-delete {
          background: #fee2e2;
          color: #dc2626;
        }
        
        .btn-delete:hover {
          background: #dc2626;
          color: white;
        }
        
        .empty-state {
          padding: 60px 20px;
          text-align: center;
          color: #999;
        }
        
        .empty-state i {
          width: 64px;
          height: 64px;
          margin-bottom: 16px;
          opacity: 0.5;
        }
        
        .empty-state h4 {
          margin: 0 0 8px;
          color: #666;
        }
        
        .empty-state p {
          margin: 0;
          font-size: 14px;
        }
        
        /* PDF Viewer Modal */
        .pdf-viewer-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          z-index: 9999;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .pdf-viewer-modal.active {
          display: flex;
        }
        
        .pdf-viewer-content {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 900px;
          height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        
        .pdf-viewer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          border-bottom: 1px solid #eee;
          background: #f8f9fa;
        }
        
        .pdf-viewer-header h3 {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #2c3e50;
        }
        
        .pdf-viewer-header h3 i {
          width: 22px;
          height: 22px;
          color: #547194;
        }
        
        .btn-close-modal {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: none;
          background: #eee;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        
        .btn-close-modal:hover {
          background: #f44336;
          color: white;
        }
        
        .pdf-viewer-body {
          flex: 1;
          padding: 0;
          overflow: hidden;
        }
        
        .pdf-viewer-body iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        
        @media (max-width: 768px) {
          .encuesta-item {
            flex-wrap: wrap;
          }
          
          .encuesta-date {
            width: 100%;
            margin-top: 8px;
          }
          
          .encuesta-actions {
            width: 100%;
            justify-content: flex-end;
            margin-top: 8px;
          }
        }
      </style>
    `;
  } catch (error) {
    console.error('Error al cargar investigaciÃ³n:', error);
    return `
      <div class="investigacion-container">
        <div class="error-state">
          <i data-lucide="alert-circle"></i>
          <h3>Error al cargar datos</h3>
          <p>No se pudo conectar con el servidor de investigaciÃ³n.</p>
          <button onclick="document.getElementById('btnInvestigacion').click()" class="btn-primary">Reintentar</button>
        </div>
      </div>
    `;
  }
}

function initInvestigacionInteractivity() {
  // Buscador
  const searchInput = document.getElementById('searchEncuestas');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const items = document.querySelectorAll('.encuesta-item');
      
      items.forEach(item => {
        const name = item.querySelector('.encuesta-name').textContent.toLowerCase();
        const email = item.querySelector('.encuesta-meta').textContent.toLowerCase();
        
        if (name.includes(query) || email.includes(query)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

function verEncuestaPDF(pdfUrl) {
  // Abrir PDF en nueva ventana ya que los iframes tienen problemas con Cloudinary
  window.open(pdfUrl, '_blank');
  showToast('Abriendo PDF en nueva ventana...', 'info');
}

function cerrarPDFViewer() {
  const modal = document.getElementById('pdfViewerModal');
  const iframe = document.getElementById('pdfViewerFrame');
  
  if (modal) {
    modal.classList.remove('active');
  }
  if (iframe) {
    iframe.src = '';
  }
}

function descargarEncuestaPDF(pdfUrl, nombre) {
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = `Encuesta_${nombre.replace(/\s+/g, '_')}.pdf`;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function eliminarEncuesta(id) {
  const result = await Swal.fire({
    title: 'Â¿Eliminar encuesta?',
    text: 'Esta acciÃ³n no se puede deshacer. El PDF serÃ¡ eliminado permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#f44336',
    cancelButtonColor: '#666',
    confirmButtonText: 'SÃ­, eliminar',
    cancelButtonText: 'Cancelar'
  });
  
  if (result.isConfirmed) {
    try {
      const res = await fetch(`${API_URL}/investigacion/encuesta/${id}`, {
        method: 'DELETE'
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        Swal.fire({
          title: 'Eliminada',
          text: 'La encuesta ha sido eliminada correctamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        
        // Recargar la secciÃ³n
        document.getElementById('btnInvestigacion').click();
      } else {
        throw new Error(data.error || 'Error al eliminar');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar la encuesta.',
        icon: 'error'
      });
    }
  }
}

// Cerrar modal con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarPDFViewer();
  }
});

