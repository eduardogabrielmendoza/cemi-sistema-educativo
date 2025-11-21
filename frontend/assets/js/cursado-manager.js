
class CursadoManager {
    constructor() {
        this.API_URL = window.API_BASE_URL || window.API_URL || 'http://localhost:3000/api';
        this.cursosDisponibles = [];
        this.misCursos = [];
        this.filtros = {
            idiomas: [],
            niveles: [],
            profesores: []
        };
        this.filtrosActivos = {
            busqueda: ''
        };
        this.idAlumno = null;
        this.initialized = false;
        
        setTimeout(() => this.init(), 100);
    }

    async init() {
        console.log(' Inicializando Cursado Manager...');
        
        this.idAlumno = localStorage.getItem('id_alumno');

        if (!this.idAlumno) {
            console.error(' No se encontró ID de alumno');
            this.mostrarError('No se pudo cargar tu información de alumno');
            return;
        }

        console.log(' ID Alumno:', this.idAlumno);
        
        if (this.initialized) {
            const searchInput = document.getElementById('busqueda-curso');
            if (searchInput) {
                const newInput = searchInput.cloneNode(true);
                searchInput.parentNode.replaceChild(newInput, searchInput);
            }
        }
        
        await this.cargarOpcionesFiltros();
        await this.cargarMisCursos();
        await this.cargarCatalogoCursos();
        this.setupEventListeners();
        
        this.initialized = true;
    }

    async cargarOpcionesFiltros() {
        try {
            const response = await fetch(`${this.API_URL}/cursos/filtros/opciones`);
            const data = await response.json();

            if (data.success) {
                this.filtros = data.filtros;
                this.renderizarFiltros();
            }
        } catch (error) {
            console.error('Error al cargar filtros:', error);
        }
    }

    async cargarMisCursos() {
        try {
            const response = await fetch(`${this.API_URL}/cursos/mis-cursos/${this.idAlumno}`);
            const data = await response.json();

            if (data.success) {
                this.misCursos = data.cursos;
                this.renderizarMisCursos();
            }
        } catch (error) {
            console.error('Error al cargar mis cursos:', error);
        }
    }

    async cargarCatalogoCursos() {
        try {
            this.mostrarCargando(true);

            const params = new URLSearchParams({
                id_alumno: this.idAlumno
            });

            const response = await fetch(`${this.API_URL}/cursos/catalogo?${params}`);
            const data = await response.json();

            if (data.success) {
                this.cursosDisponibles = data.cursos;
                this.aplicarFiltroBusqueda();
            } else {
                throw new Error(data.error || 'Error al cargar cursos');
            }
        } catch (error) {
            console.error('Error al cargar catálogo:', error);
            this.mostrarError('Error al cargar el catálogo de cursos');
        } finally {
            this.mostrarCargando(false);
        }
    }

    renderizarFiltros() {
    }

    renderizarMisCursos() {
        const container = document.getElementById('mis-cursos-container');
        if (!container) return;

        if (this.misCursos.length === 0) {
            container.innerHTML = `
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i> No estás inscrito en ningún curso actualmente
                </div>
            `;
            return;
        }

        container.innerHTML = this.misCursos.map(curso => {
            return `
                <div class="curso-mini-badge" title="${curso.nombre_curso}">
                    <div class="mini-badge-icon">
                        <i data-lucide="book-open"></i>
                    </div>
                    <div class="mini-badge-content">
                        <h4>${curso.nombre_curso}</h4>
                        <div class="mini-badge-meta">
                            <span class="mini-idioma">${curso.idioma || 'Curso'}</span>
                            <span class="mini-nivel">${curso.nivel || 'N/A'}</span>
                            ${curso.horario ? `<span class="mini-horario"><i data-lucide="clock"></i>${curso.horario}</span>` : ''}
                        </div>
                    </div>
                </div>
                </div>
            `;
        }).join('');

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    renderizarCatalogo() {
        const container = document.getElementById('catalogo-cursos-container');
        const contador = document.getElementById('total-cursos-count');
        
        if (!container) return;

        if (contador) {
            contador.textContent = `Mostrando ${this.cursosDisponibles.length} ${this.cursosDisponibles.length === 1 ? 'curso' : 'cursos'}`;
        }

        if (this.cursosDisponibles.length === 0) {
            container.innerHTML = `
                <div class="alert alert-warning">
                    <i class="fas fa-search"></i> No se encontraron cursos disponibles con los filtros aplicados
                </div>
            `;
            return;
        }

        container.innerHTML = this.cursosDisponibles.map(curso => this.crearCursoCard(curso)).join('');
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    crearCursoCard(curso) {
        const estadoBadge = this.getEstadoBadge(curso.estado);
        
        // Calcular porcentaje de disponibilidad (barra verde = cupos libres)
        const porcentajeOcupacion = curso.porcentaje_ocupacion || 0;
        const porcentajeDisponible = curso.porcentaje_disponible !== undefined 
            ? curso.porcentaje_disponible 
            : (100 - porcentajeOcupacion);
        const porcentajeBarra = Math.max(0, Math.min(porcentajeDisponible, 100));
        
        const avatarProfesor = curso.profesor.avatar || '/images/default-avatar.png';

        return `
            <div class="curso-card">
                <div class="curso-card-header">
                    <div class="curso-icon">
                        <i data-lucide="book-open"></i>
                    </div>
                    <div class="curso-card-title">
                        <h3>${curso.nombre_curso}</h3>
                        <div class="idioma">${curso.idioma.nombre}</div>
                        <span class="curso-badge">${curso.nivel.descripcion}</span>
                    </div>
                </div>

                <div class="curso-card-info">
                    <div class="info-row">
                        <i data-lucide="clock"></i>
                        <span>${curso.horario}</span>
                    </div>

                    <div class="info-row">
                        <i data-lucide="user"></i>
                        <span>${curso.profesor.nombre}</span>
                    </div>

                    <div class="info-row">
                        <i data-lucide="door-open"></i>
                        <span>${curso.aula ? curso.aula.nombre : 'Aula por confirmar'}</span>
                    </div>
                </div>

                <div class="curso-card-footer">
                    <div class="cupos-info">
                        <div class="cupos-bar">
                            <div class="cupos-bar-fill ${porcentajeBarra <= 20 ? 'danger' : porcentajeBarra <= 50 ? 'warning' : ''}" 
                                 style="width: ${porcentajeBarra}%"></div>
                        </div>
                        <span class="cupos-text">${curso.cupos_disponibles} cupos disponibles de ${curso.cupo_maximo}</span>
                    </div>
                    ${estadoBadge}
                </div>
            </div>
        `;
    }

    mostrarModalDetalle(curso) {
        const avatarProfesor = curso.profesor.avatar || '/images/default-avatar.png';
        const estadoBadge = this.getEstadoBadge(curso.estado);
        
        const modalHtml = `
            <div class="modal-overlay" id="modal-detalle-curso">
                <div class="modal-detalle-curso">
                    <div class="modal-header">
                        <h2>${curso.nombre_curso}</h2>
                        <button class="modal-close" onclick="cursadoManager.cerrarModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <div class="modal-body">
                        <div class="detalle-curso-grid">
                            <!-- Información principal -->
                            <div class="detalle-seccion">
                                <h3><i class="fas fa-info-circle"></i> Información del Curso</h3>
                                <div class="detalle-item">
                                    <strong>Idioma:</strong> ${curso.idioma.nombre}
                                </div>
                                <div class="detalle-item">
                                    <strong>Nivel:</strong> ${curso.nivel.descripcion}
                                </div>
                                <div class="detalle-item">
                                    <strong>Horario:</strong> ${curso.horario}
                                </div>
                                ${curso.aula ? `
                                <div class="detalle-item">
                                    <strong>Aula:</strong> ${curso.aula.nombre}${curso.aula.ubicacion ? ` - ${curso.aula.ubicacion}` : ''}
                                </div>
                                <div class="detalle-item">
                                    <strong>Capacidad del aula:</strong> ${curso.aula.capacidad} personas
                                </div>
                                ` : ''}
                            </div>

                            <!-- Información del profesor -->
                            <div class="detalle-seccion">
                                <h3><i class="fas fa-chalkboard-teacher"></i> Profesor</h3>
                                <div class="profesor-detalle">
                                    <img src="${avatarProfesor}" alt="${curso.profesor.nombre}" class="profesor-detalle-avatar">
                                    <div>
                                        <h4>${curso.profesor.nombre}</h4>
                                        <p class="profesor-especialidad">${curso.profesor.especialidad}</p>
                                        ${curso.profesor.biografia ? `<p class="profesor-biografia">${curso.profesor.biografia}</p>` : ''}
                                    </div>
                                </div>
                            </div>

                            <!-- Cupos disponibles -->
                            <div class="detalle-seccion detalle-cupos">
                                <h3><i class="fas fa-users"></i> Disponibilidad</h3>
                                ${estadoBadge}
                                <div class="cupos-detalle">
                                    <div class="cupos-numero">
                                        <span class="cupos-numero-grande">${curso.cupos_disponibles}</span>
                                        <span class="cupos-texto">cupos disponibles</span>
                                    </div>
                                    <div class="cupos-total">
                                        de ${curso.cupo_maximo} totales
                                    </div>
                                    <div class="cupos-barra-container">
                                        <div class="cupos-barra" style="width: ${curso.porcentaje_ocupacion}%; background-color: ${this.getBarraColor(curso.porcentaje_ocupacion)}"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        ${curso.estado === 'completo' 
                            ? '<p class="text-warning"><i class="fas fa-exclamation-triangle"></i> Este curso no tiene cupos disponibles</p>'
                            : `<button class="btn btn-primary btn-lg" onclick="cursadoManager.solicitarInscripcion(${curso.id_curso}, '${curso.nombre_curso.replace(/'/g, "\\'")}', '${curso.profesor.nombre.replace(/'/g, "\\'")}', '${curso.horario.replace(/'/g, "\\'")}')">
                                   <i class="fas fa-comment"></i> Solicitar Inscripción por Chat
                               </button>`
                        }
                        <button class="btn btn-secondary" onclick="cursadoManager.cerrarModal()">Cerrar</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    solicitarInscripcion(idCurso, nombreCurso, nombreProfesor, horario) {
        this.cerrarModal();

        const mensajePrecargado = `Hola, me gustaría inscribirme al curso "${nombreCurso}" con el profesor ${nombreProfesor}. Horario: ${horario}`;

        const chatTab = document.querySelector('[data-section="chat"]');
        if (chatTab) {
            chatTab.click();
        }

        setTimeout(() => {
            const chatInput = document.getElementById('messageInput');
            if (chatInput) {
                chatInput.value = mensajePrecargado;
                chatInput.focus();
            }

            this.mostrarNotificacion('Mensaje pre-cargado en el chat. Envíalo para solicitar tu inscripción.', 'success');
        }, 300);
    }

    cerrarModal() {
        const modal = document.getElementById('modal-detalle-curso');
        if (modal) {
            modal.remove();
        }
    }

    aplicarFiltroBusqueda() {
        let cursosFiltrados = [...this.cursosDisponibles];

        if (this.filtrosActivos.busqueda) {
            const busqueda = this.filtrosActivos.busqueda.toLowerCase();
            cursosFiltrados = cursosFiltrados.filter(curso => 
                curso.nombre_curso.toLowerCase().includes(busqueda) ||
                curso.idioma.nombre.toLowerCase().includes(busqueda) ||
                curso.profesor.nombre.toLowerCase().includes(busqueda)
            );
        }

        this.cursosDisponibles = cursosFiltrados;
        this.renderizarCatalogo();
    }

    setupEventListeners() {
        const inputBusqueda = document.getElementById('busqueda-curso');
        if (inputBusqueda) {
            inputBusqueda.addEventListener('input', (e) => {
                this.filtrosActivos.busqueda = e.target.value;
                this.aplicarFiltroBusqueda();
            });
        }
    }

    limpiarFiltros() {
        this.filtrosActivos.busqueda = '';
        const inputBusqueda = document.getElementById('busqueda-curso');
        if (inputBusqueda) inputBusqueda.value = '';
        this.cargarCatalogoCursos();
    }

    getEstadoBadge(estado) {
        const badges = {
            'disponible': '<span class="badge badge-success"><i class="fas fa-check-circle"></i> Disponible</span>',
            'cupos_limitados': '<span class="badge badge-warning"><i class="fas fa-exclamation-circle"></i> Cupos Limitados</span>',
            'completo': '<span class="badge badge-danger"><i class="fas fa-ban"></i> Completo</span>'
        };
        return badges[estado] || badges.disponible;
    }

    getBarraColor(porcentaje) {
        if (porcentaje >= 100) return '#dc3545'; // Rojo
        if (porcentaje >= 80) return '#ffc107';  // Amarillo
        return '#28a745'; // Verde
    }

    getIdiomaIcon(idioma) {
        const iconos = {
            'Ingles': '🇬🇧',
            'Frances': '🇫🇷',
            'Aleman': '🇩🇪',
            'Japones': '🇯🇵',
            'Portugues': '🇵🇹',
            'Italiano': '🇮🇹'
        };
        return iconos[idioma] || '';
    }

    mostrarCargando(mostrar) {
        const container = document.getElementById('catalogo-cursos-container');
        if (!container) return;

        if (mostrar) {
            container.innerHTML = `
                <div class="loading-container">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Cargando...</span>
                    </div>
                    <p>Cargando cursos disponibles...</p>
                </div>
            `;
        }
    }

    mostrarError(mensaje) {
        const container = document.getElementById('catalogo-cursos-container');
        if (container) {
            container.innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle"></i> ${mensaje}
                </div>
            `;
        }
    }

    mostrarNotificacion(mensaje, tipo = 'info') {
        const notif = document.createElement('div');
        notif.className = `notificacion notificacion-${tipo}`;
        notif.innerHTML = `
            <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'info-circle'}"></i>
            ${mensaje}
        `;
        document.body.appendChild(notif);

        setTimeout(() => notif.classList.add('show'), 100);
        setTimeout(() => {
            notif.classList.remove('show');
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }
}

if (typeof cursadoManager === 'undefined') {
    window.cursadoManager = new CursadoManager();
}
