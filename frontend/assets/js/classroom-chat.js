// =====================================================
// CLASSROOM CHAT - Vista Integrada de Mensajes
// Sistema de mensajería entre profesores y alumnos
// =====================================================

class ClassroomChat {
  constructor() {
    this.socket = null;
    this.currentUser = null;
    this.currentConversation = null;
    this.currentContact = null;
    this.contactos = { profesores: [], compañeros: [], alumnos: [] };
    this.conversaciones = [];
    this.isTyping = false;
    this.typingTimeout = null;
    this.selectedFile = null;
    this.unreadCount = 0;
    this.isViewActive = false;
    
    // Usar window.API_URL que está definido en config.js
    this.API_URL = window.API_URL || `${window.location.origin}/api`;
    
    this.init();
  }
  
  async init() {
    // Obtener datos del usuario actual - el sistema usa 'rol' no 'tipo'
    const rol = localStorage.getItem('rol');
    const idProfesor = localStorage.getItem('id_profesor');
    const idAlumno = localStorage.getItem('id_alumno');
    const isAdmin = localStorage.getItem('admin_classroom') === 'true';
    
    // Determinar tipo y ID
    let tipo, id;
    if (isAdmin) {
      // Los admins no participan en el chat de classroom
      console.log('ClassroomChat: Admin detectado - chat no disponible para admins');
      this.hideMessagesNavItem();
      return;
    } else if (idProfesor) {
      tipo = 'profesor';
      id = idProfesor;
    } else if (idAlumno) {
      tipo = 'alumno';
      id = idAlumno;
    } else {
      console.warn('ClassroomChat: Usuario no autenticado');
      return;
    }
    
    this.currentUser = {
      tipo,
      id,
      nombre: localStorage.getItem('nombre') || 'Usuario'
    };
    
    if (!this.currentUser.tipo || !this.currentUser.id) {
      console.warn('ClassroomChat: Usuario no autenticado');
      return;
    }
    
    // Inicializar Socket.IO
    this.initSocket();
    
    // Cargar mensajes no leídos
    await this.loadUnreadCount();
    
    // Vincular eventos del DOM
    this.bindEvents();
    
    console.log('ClassroomChat inicializado para:', this.currentUser);
  }
  
  hideMessagesNavItem() {
    const navItem = document.querySelector('[data-view="messages"]');
    if (navItem) {
      navItem.style.display = 'none';
    }
  }
  
  initSocket() {
    const socketUrl = window.BASE_URL || window.location.origin;
    
    this.socket = io(socketUrl, {
      path: '/socket.io/',
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });
    
    this.socket.on('connect', () => {
      console.log('ClassroomChat: Conectado al servidor');
      
      // Autenticarse para recibir mensajes
      this.socket.emit('classroom_auth', {
        tipo: this.currentUser.tipo,
        id: this.currentUser.id,
        nombre: this.currentUser.nombre
      });
    });
    
    this.socket.on('disconnect', () => {
      console.log('ClassroomChat: Desconectado del servidor');
    });
    
    // Recibir nuevo mensaje
    this.socket.on('new_classroom_message', (data) => {
      this.handleNewMessage(data);
    });
    
    // Indicador de escritura
    this.socket.on('classroom_typing', (data) => {
      this.handleTypingIndicator(data);
    });
    
    // Mensajes leídos
    this.socket.on('classroom_read', (data) => {
      this.handleMessagesRead(data);
    });
  }
  
  bindEvents() {
    // Búsqueda de contactos
    const searchInput = document.getElementById('chatContactSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.filterContacts(e.target.value));
    }
    
    // Tabs de contactos
    document.querySelectorAll('.messages-tab').forEach(tab => {
      tab.addEventListener('click', (e) => this.switchTab(e.target.closest('.messages-tab').dataset.tab));
    });
    
    // Input de mensaje
    const messageInput = document.getElementById('chatMessageInput');
    if (messageInput) {
      messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
      
      messageInput.addEventListener('input', () => {
        this.handleTyping();
        this.autoResizeTextarea(messageInput);
      });
    }
    
    // Botón enviar
    const sendBtn = document.getElementById('chatSendBtn');
    if (sendBtn) {
      sendBtn.addEventListener('click', () => this.sendMessage());
    }
    
    // Botón adjuntar archivo
    const attachBtn = document.getElementById('chatAttachBtn');
    const fileInput = document.getElementById('chatFileInput');
    if (attachBtn && fileInput) {
      attachBtn.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
    }
    
    // Cerrar lightbox con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const lightbox = document.querySelector('.chat-lightbox.active');
        if (lightbox) {
          this.closeLightbox();
        }
      }
    });
  }
  
  // =====================================================
  // Activar Vista de Mensajes
  // =====================================================
  async activateView() {
    if (!this.currentUser || !this.currentUser.tipo || !this.currentUser.id) {
      console.warn('ClassroomChat: No se puede activar - usuario no autenticado');
      return;
    }
    
    this.isViewActive = true;
    
    // Cargar contactos
    await this.loadContacts();
    
    // Cargar conversaciones existentes
    await this.loadConversations();
    
    // Actualizar iconos
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
  
  deactivateView() {
    this.isViewActive = false;
    this.currentConversation = null;
    this.currentContact = null;
    this.selectedFile = null;
    this.showEmptyConversation();
  }
  
  // =====================================================
  // Cargar Contactos
  // =====================================================
  async loadContacts(idCurso = null) {
    try {
      const token = localStorage.getItem('token');
      let url = `${this.API_URL}/classroom-chat/contactos/${this.currentUser.tipo}/${this.currentUser.id}`;
      
      if (idCurso) {
        url += `?id_curso=${idCurso}`;
      }
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Error al cargar contactos');
      
      this.contactos = await response.json();
      this.renderContacts();
      
    } catch (error) {
      console.error('Error cargando contactos:', error);
      this.showContactsError();
    }
  }
  
  renderContacts() {
    const listProfesores = document.getElementById('chatListProfesores');
    const listCompaneros = document.getElementById('chatListCompaneros');
    const tabProfesores = document.querySelector('[data-tab="profesores"]');
    const tabCompaneros = document.querySelector('[data-tab="companeros"]');
    
    // Detectar si es profesor o alumno para ajustar la UI
    const isProfesor = this.currentUser.tipo === 'profesor';
    
    if (isProfesor) {
      // Para profesores: solo mostrar lista de "Alumnos"
      if (tabProfesores) tabProfesores.style.display = 'none';
      if (tabCompaneros) {
        tabCompaneros.style.display = 'flex';
        tabCompaneros.innerHTML = `<i data-lucide="users"></i> Alumnos <span class="tab-badge">0</span>`;
        tabCompaneros.classList.add('active');
      }
      if (listProfesores) listProfesores.style.display = 'none';
      if (listCompaneros) listCompaneros.style.display = 'block';
      
      // Renderizar alumnos del profesor
      const alumnos = this.contactos.alumnos || [];
      if (listCompaneros) {
        if (alumnos.length === 0) {
          listCompaneros.innerHTML = `
            <div class="messages-empty">
              <i data-lucide="users"></i>
              <p>No hay alumnos disponibles</p>
            </div>
          `;
        } else {
          listCompaneros.innerHTML = alumnos.map(c => this.renderContactItem(c, false)).join('');
        }
      }
      
      // Actualizar badge de alumnos
      const tabBadge = tabCompaneros?.querySelector('.tab-badge');
      if (tabBadge) {
        tabBadge.textContent = alumnos.length;
        tabBadge.style.display = alumnos.length > 0 ? 'inline-flex' : 'none';
      }
      
    } else {
      // Para alumnos: mostrar "Profesores" y "Compañeros"
      if (tabProfesores) tabProfesores.style.display = 'flex';
      if (tabCompaneros) {
        tabCompaneros.style.display = 'flex';
        tabCompaneros.innerHTML = `<i data-lucide="users"></i> Compañeros <span class="tab-badge">0</span>`;
      }
      
      // Renderizar profesores
      if (listProfesores) {
        if (this.contactos.profesores.length === 0) {
          listProfesores.innerHTML = `
            <div class="messages-empty">
              <i data-lucide="user-x"></i>
              <p>No hay profesores disponibles</p>
            </div>
          `;
        } else {
          listProfesores.innerHTML = this.contactos.profesores.map(c => this.renderContactItem(c, true)).join('');
        }
      }
      
      // Renderizar compañeros (SIN curso, ya que pueden estar en múltiples cursos)
      if (listCompaneros) {
        if (this.contactos.compañeros.length === 0) {
          listCompaneros.innerHTML = `
            <div class="messages-empty">
              <i data-lucide="users"></i>
              <p>No hay compañeros disponibles</p>
            </div>
          `;
        } else {
          listCompaneros.innerHTML = this.contactos.compañeros.map(c => this.renderContactItem(c, false)).join('');
        }
      }
      
      // Actualizar badges de tabs
      this.updateTabBadges();
    }
    
    // Vincular eventos de contactos
    document.querySelectorAll('.contact-item').forEach(item => {
      item.addEventListener('click', () => {
        const tipo = item.dataset.tipo;
        const id = item.dataset.id;
        const idCurso = item.dataset.curso;
        this.selectContact(tipo, id, idCurso);
      });
    });
    
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
  
  renderContactItem(contacto, showCourse = true) {
    const initials = this.getInitials(contacto.nombre_completo);
    const avatar = contacto.avatar 
      ? `<img src="${contacto.avatar}" alt="${contacto.nombre_completo}">`
      : `<span class="avatar-initials">${initials}</span>`;
    
    const roleLabel = contacto.tipo === 'profesor' ? 'Profesor' : 'Alumno';
    
    // Buscar si hay conversación existente con mensajes no leídos
    const contactId = contacto.id_profesor || contacto.id_alumno;
    const conv = this.conversaciones.find(c => 
      c.contacto_tipo === contacto.tipo && 
      c.contacto_id == contactId
    );
    const noLeidos = conv?.no_leidos || 0;
    const hasUnread = noLeidos > 0;
    
    // Para alumnos en la lista de compañeros, no mostrar curso
    const courseInfo = showCourse && contacto.nombre_curso 
      ? `<div class="contact-course">${contacto.nombre_curso}</div>` 
      : '';
    
    return `
      <div class="contact-item ${hasUnread ? 'has-unread' : ''}" 
           data-tipo="${contacto.tipo}" 
           data-id="${contactId}"
           data-curso="${contacto.id_curso || ''}">
        <div class="contact-avatar">${avatar}</div>
        <div class="contact-info">
          <div class="contact-name">${contacto.nombre_completo}</div>
          ${courseInfo}
          <div class="contact-role">
            <i data-lucide="${contacto.tipo === 'profesor' ? 'user-check' : 'graduation-cap'}"></i>
            ${roleLabel}
          </div>
        </div>
        ${hasUnread ? '<span class="contact-unread-dot"></span>' : ''}
      </div>
    `;
  }
  
  updateTabBadges() {
    const tabProfesores = document.querySelector('[data-tab="profesores"] .tab-badge');
    const tabCompaneros = document.querySelector('[data-tab="companeros"] .tab-badge');
    
    if (tabProfesores) {
      tabProfesores.textContent = this.contactos.profesores.length;
      tabProfesores.style.display = this.contactos.profesores.length > 0 ? 'inline-flex' : 'none';
    }
    
    if (tabCompaneros) {
      tabCompaneros.textContent = this.contactos.compañeros.length;
      tabCompaneros.style.display = this.contactos.compañeros.length > 0 ? 'inline-flex' : 'none';
    }
  }
  
  switchTab(tab) {
    // Actualizar tabs activos
    document.querySelectorAll('.messages-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');
    
    // Mostrar/ocultar listas
    const listProfesores = document.getElementById('chatListProfesores');
    const listCompaneros = document.getElementById('chatListCompaneros');
    
    if (tab === 'profesores') {
      if (listProfesores) listProfesores.style.display = 'block';
      if (listCompaneros) listCompaneros.style.display = 'none';
    } else {
      if (listProfesores) listProfesores.style.display = 'none';
      if (listCompaneros) listCompaneros.style.display = 'block';
    }
  }
  
  filterContacts(query) {
    const q = query.toLowerCase().trim();
    
    document.querySelectorAll('.contact-item').forEach(item => {
      const name = item.querySelector('.contact-name')?.textContent.toLowerCase() || '';
      const course = item.querySelector('.contact-course')?.textContent.toLowerCase() || '';
      
      if (name.includes(q) || course.includes(q) || q === '') {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  // =====================================================
  // Seleccionar Contacto y Cargar Conversación
  // =====================================================
  async selectContact(tipo, id, idCurso) {
    // Marcar contacto como activo
    document.querySelectorAll('.contact-item').forEach(item => item.classList.remove('active'));
    const contactItem = document.querySelector(`.contact-item[data-tipo="${tipo}"][data-id="${id}"]`);
    if (contactItem) {
      contactItem.classList.add('active');
      // Remover indicador de no leídos
      contactItem.classList.remove('has-unread');
      const unreadDot = contactItem.querySelector('.contact-unread-dot');
      if (unreadDot) unreadDot.remove();
    }
    
    try {
      const token = localStorage.getItem('token');
      
      // Si no hay idCurso, buscar el primer curso en común
      let cursoParaConversacion = idCurso;
      if (!cursoParaConversacion) {
        // Buscar un curso compartido entre los dos usuarios
        const cursosResponse = await fetch(
          `${this.API_URL}/classroom-chat/curso-comun/${this.currentUser.tipo}/${this.currentUser.id}/${tipo}/${id}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        if (cursosResponse.ok) {
          const cursosData = await cursosResponse.json();
          cursoParaConversacion = cursosData.id_curso;
        }
      }
      
      if (!cursoParaConversacion) {
        this.showError('No se encontró un curso en común');
        return;
      }
      
      // Obtener o crear conversación
      const response = await fetch(`${this.API_URL}/classroom-chat/conversacion`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mi_tipo: this.currentUser.tipo,
          mi_id: this.currentUser.id,
          contacto_tipo: tipo,
          contacto_id: id,
          id_curso: cursoParaConversacion
        })
      });
      
      if (!response.ok) throw new Error('Error al iniciar conversación');
      
      const data = await response.json();
      
      this.currentConversation = data.id_conversacion;
      this.currentContact = {
        tipo,
        id,
        id_curso: cursoParaConversacion,
        nombre: data.contacto.nombre,
        avatar: data.contacto.avatar
      };
      
      // Unirse a la sala de Socket.IO
      this.socket.emit('join_classroom_conversation', {
        id_conversacion: this.currentConversation
      });
      
      // Cargar mensajes
      await this.loadMessages();
      
      // Marcar como leídos
      await this.markAsRead();
      
      // Mostrar panel de conversación
      this.showConversationPanel();
      
    } catch (error) {
      console.error('Error al seleccionar contacto:', error);
      this.showError('No se pudo cargar la conversación');
    }
  }
  
  async loadMessages() {
    if (!this.currentConversation) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${this.API_URL}/classroom-chat/conversacion/${this.currentConversation}?mi_tipo=${this.currentUser.tipo}&mi_id=${this.currentUser.id}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      if (!response.ok) throw new Error('Error al cargar mensajes');
      
      const data = await response.json();
      this.renderMessages(data.mensajes);
      
    } catch (error) {
      console.error('Error cargando mensajes:', error);
    }
  }
  
  showConversationPanel() {
    const header = document.getElementById('conversationHeader');
    const messages = document.getElementById('conversationMessages');
    const input = document.getElementById('conversationInput');
    const empty = document.getElementById('conversationEmpty');
    
    if (header) header.style.display = 'flex';
    if (messages) messages.style.display = 'flex';
    if (input) input.style.display = 'block';
    if (empty) empty.style.display = 'none';
    
    // Actualizar header con info del contacto
    this.updateConversationHeader();
    
    // Focus en input
    document.getElementById('chatMessageInput')?.focus();
  }
  
  showEmptyConversation() {
    const header = document.getElementById('conversationHeader');
    const messages = document.getElementById('conversationMessages');
    const input = document.getElementById('conversationInput');
    const empty = document.getElementById('conversationEmpty');
    
    if (header) header.style.display = 'none';
    if (messages) messages.style.display = 'none';
    if (input) input.style.display = 'none';
    if (empty) empty.style.display = 'flex';
  }
  
  updateConversationHeader() {
    if (!this.currentContact) return;
    
    const avatar = document.getElementById('conversationAvatar');
    const name = document.getElementById('conversationName');
    const role = document.getElementById('conversationRole');
    
    if (avatar) {
      if (this.currentContact.avatar) {
        avatar.innerHTML = `<img src="${this.currentContact.avatar}" alt="${this.currentContact.nombre}">`;
      } else {
        const initials = this.getInitials(this.currentContact.nombre);
        avatar.innerHTML = `<span class="avatar-initials">${initials}</span>`;
      }
    }
    
    if (name) name.textContent = this.currentContact.nombre;
    if (role) role.textContent = this.currentContact.tipo === 'profesor' ? 'Profesor' : 'Alumno';
  }
  
  // =====================================================
  // Renderizar Mensajes
  // =====================================================
  renderMessages(mensajes) {
    const container = document.getElementById('conversationMessages');
    if (!container) return;
    
    if (mensajes.length === 0) {
      container.innerHTML = `
        <div class="conversation-empty" style="display: flex;">
          <i data-lucide="message-circle"></i>
          <h4>Inicia la conversación</h4>
          <p>Envía un mensaje para comenzar a chatear</p>
        </div>
      `;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }
    
    container.innerHTML = mensajes.map(m => this.renderMessageBubble(m)).join('');
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
    this.scrollToBottom();
  }
  
  renderMessageBubble(mensaje) {
    const isSent = mensaje.remitente_tipo === this.currentUser.tipo && 
                   mensaje.remitente_id == this.currentUser.id;
    
    const time = this.formatTime(mensaje.fecha_envio);
    
    // Avatar para el mensaje
    let avatarHtml = '';
    if (isSent) {
      // Mi avatar
      const myAvatar = localStorage.getItem('avatar');
      const myName = this.currentUser.nombre || 'Usuario';
      const myInitials = this.getInitials(myName);
      avatarHtml = `
        <div class="message-avatar">
          ${myAvatar ? `<img src="${myAvatar}" alt="${myName}">` : `<span class="avatar-initials">${myInitials}</span>`}
        </div>
      `;
    } else {
      // Avatar del contacto
      const contactAvatar = this.currentContact?.avatar;
      const contactName = this.currentContact?.nombre || 'Usuario';
      const contactInitials = this.getInitials(contactName);
      avatarHtml = `
        <div class="message-avatar">
          ${contactAvatar ? `<img src="${contactAvatar}" alt="${contactName}">` : `<span class="avatar-initials">${contactInitials}</span>`}
        </div>
      `;
    }
    
    let content = '';
    
    // Texto del mensaje
    if (mensaje.mensaje) {
      content += `<div class="message-text">${this.escapeHtml(mensaje.mensaje)}</div>`;
    }
    
    // Archivo adjunto
    if (mensaje.archivo_adjunto) {
      if (mensaje.tipo_archivo?.startsWith('image/')) {
        content += `
          <div class="message-image" onclick="classroomChat.openLightbox('${mensaje.archivo_adjunto}')">
            <img src="${mensaje.archivo_adjunto}" alt="Imagen">
          </div>
        `;
      } else {
        const fileIcon = this.getFileIcon(mensaje.tipo_archivo);
        content += `
          <a href="${mensaje.archivo_adjunto}" target="_blank" class="message-file">
            <div class="message-file-icon">
              <i data-lucide="${fileIcon}"></i>
            </div>
            <div class="message-file-info">
              <div class="message-file-name">${mensaje.nombre_archivo || 'Archivo'}</div>
            </div>
          </a>
        `;
      }
    }
    
    return `
      <div class="message-bubble ${isSent ? 'sent' : 'received'}" data-id="${mensaje.id_mensaje}">
        ${avatarHtml}
        <div class="message-wrapper">
          <div class="message-content">
            ${content}
          </div>
          <div class="message-meta">
            <span class="message-time">${time}</span>
            ${isSent ? `<span class="message-status"><i data-lucide="${mensaje.leido ? 'check-check' : 'check'}"></i></span>` : ''}
          </div>
        </div>
      </div>
    `;
  }
  
  addMessageToUI(mensaje) {
    const container = document.getElementById('conversationMessages');
    if (!container) return;
    
    // Remover estado vacío si existe
    const emptyState = container.querySelector('.conversation-empty');
    if (emptyState) emptyState.remove();
    
    const html = this.renderMessageBubble(mensaje);
    container.insertAdjacentHTML('beforeend', html);
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
    this.scrollToBottom();
  }
  
  scrollToBottom() {
    const container = document.getElementById('conversationMessages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
  
  // =====================================================
  // Enviar Mensaje
  // =====================================================
  async sendMessage() {
    const input = document.getElementById('chatMessageInput');
    const mensaje = input?.value.trim();
    
    if (!mensaje && !this.selectedFile) return;
    if (!this.currentConversation) return;
    
    const sendBtn = document.getElementById('chatSendBtn');
    if (sendBtn) sendBtn.disabled = true;
    
    try {
      const token = localStorage.getItem('token');
      
      const formData = new FormData();
      formData.append('id_conversacion', this.currentConversation);
      formData.append('remitente_tipo', this.currentUser.tipo);
      formData.append('remitente_id', this.currentUser.id);
      formData.append('mensaje', mensaje || '');
      
      if (this.selectedFile) {
        formData.append('archivo', this.selectedFile);
      }
      
      const response = await fetch(`${this.API_URL}/classroom-chat/mensaje`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) throw new Error('Error al enviar mensaje');
      
      const data = await response.json();
      
      // Agregar mensaje a la UI
      this.addMessageToUI(data.mensaje);
      
      // Limpiar input
      if (input) {
        input.value = '';
        this.autoResizeTextarea(input);
      }
      
      // Limpiar archivo
      this.clearFilePreview();
      
      // Emitir por Socket.IO
      this.socket.emit('classroom_message', {
        id_conversacion: this.currentConversation,
        mensaje: data.mensaje
      });
      
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      this.showError('No se pudo enviar el mensaje');
    } finally {
      if (sendBtn) sendBtn.disabled = false;
    }
  }
  
  // =====================================================
  // Manejo de Archivos
  // =====================================================
  handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validar tamaño (10MB)
    if (file.size > 10 * 1024 * 1024) {
      this.showError('El archivo es muy grande (máximo 10MB)');
      return;
    }
    
    this.selectedFile = file;
    this.showFilePreview(file);
    
    // Limpiar input
    event.target.value = '';
  }
  
  showFilePreview(file) {
    const previewContainer = document.getElementById('chatFilePreview');
    if (!previewContainer) return;
    
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewContainer.innerHTML = `
          <div class="image-preview">
            <img src="${e.target.result}" alt="Preview">
            <button class="image-preview-remove" onclick="classroomChat.clearFilePreview()">
              <i data-lucide="x"></i>
            </button>
          </div>
        `;
        previewContainer.style.display = 'block';
        if (typeof lucide !== 'undefined') lucide.createIcons();
      };
      reader.readAsDataURL(file);
    } else {
      const icon = this.getFileIcon(file.type);
      const size = this.formatFileSize(file.size);
      
      previewContainer.innerHTML = `
        <div class="file-preview">
          <div class="file-preview-icon">
            <i data-lucide="${icon}"></i>
          </div>
          <div class="file-preview-info">
            <div class="file-preview-name">${file.name}</div>
            <div class="file-preview-size">${size}</div>
          </div>
          <button class="file-preview-remove" onclick="classroomChat.clearFilePreview()">
            <i data-lucide="x"></i>
          </button>
        </div>
      `;
      previewContainer.style.display = 'block';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  }
  
  clearFilePreview() {
    this.selectedFile = null;
    const previewContainer = document.getElementById('chatFilePreview');
    if (previewContainer) {
      previewContainer.innerHTML = '';
      previewContainer.style.display = 'none';
    }
  }
  
  // =====================================================
  // Typing Indicator
  // =====================================================
  handleTyping() {
    if (!this.currentConversation) return;
    
    if (!this.isTyping) {
      this.isTyping = true;
      this.socket.emit('classroom_typing', {
        id_conversacion: this.currentConversation,
        isTyping: true
      });
    }
    
    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      this.isTyping = false;
      this.socket.emit('classroom_typing', {
        id_conversacion: this.currentConversation,
        isTyping: false
      });
    }, 2000);
  }
  
  handleTypingIndicator(data) {
    if (data.id_conversacion !== this.currentConversation) return;
    
    const container = document.getElementById('conversationMessages');
    if (!container) return;
    
    // Remover indicador existente
    container.querySelector('.typing-indicator')?.remove();
    
    if (data.isTyping) {
      const html = `
        <div class="typing-indicator">
          <div class="typing-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', html);
      this.scrollToBottom();
    }
  }
  
  // =====================================================
  // Manejo de Nuevos Mensajes
  // =====================================================
  handleNewMessage(data) {
    // Si es la conversación actual, agregar a la UI
    if (data.id_conversacion === this.currentConversation) {
      // Solo agregar si no es mi mensaje
      if (data.remitente_tipo !== this.currentUser.tipo || 
          data.remitente_id != this.currentUser.id) {
        this.addMessageToUI(data);
        this.markAsRead();
      }
    } else {
      // Mostrar notificación toast si no estamos en la vista de mensajes
      if (!this.isViewActive) {
        this.showToastNotification(data);
      }
      this.updateUnreadCount();
    }
  }
  
  showToastNotification(mensaje) {
    // Buscar info del contacto
    const contacto = [...this.contactos.profesores, ...this.contactos.compañeros]
      .find(c => 
        c.tipo === mensaje.remitente_tipo && 
        (c.id_profesor || c.id_alumno) == mensaje.remitente_id
      );
    
    const nombre = contacto?.nombre_completo || mensaje.nombre_remitente || 'Usuario';
    const avatar = contacto?.avatar || mensaje.avatar_remitente;
    const initials = this.getInitials(nombre);
    
    const toast = document.createElement('div');
    toast.className = 'chat-toast';
    toast.innerHTML = `
      <div class="chat-toast-avatar">
        ${avatar ? `<img src="${avatar}" alt="${nombre}">` : `<span class="avatar-initials">${initials}</span>`}
      </div>
      <div class="chat-toast-content">
        <div class="chat-toast-name">${nombre}</div>
        <div class="chat-toast-message">${mensaje.mensaje || 'Envió un archivo'}</div>
      </div>
      <button class="chat-toast-close" onclick="this.parentElement.remove()">
        <i data-lucide="x"></i>
      </button>
    `;
    
    document.body.appendChild(toast);
    if (typeof lucide !== 'undefined') lucide.createIcons();
    
    // Mostrar con animación
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 5000);
    
    // Click para ir a mensajes
    toast.addEventListener('click', (e) => {
      if (!e.target.closest('.chat-toast-close')) {
        toast.remove();
        // Activar vista de mensajes
        const navItem = document.querySelector('[data-view="messages"]');
        if (navItem) navItem.click();
      }
    });
  }
  
  // =====================================================
  // Mensajes Leídos
  // =====================================================
  async markAsRead() {
    if (!this.currentConversation) return;
    
    try {
      const token = localStorage.getItem('token');
      await fetch(`${this.API_URL}/classroom-chat/marcar-leido/${this.currentConversation}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mi_tipo: this.currentUser.tipo,
          mi_id: this.currentUser.id
        })
      });
      
      // Emitir por socket
      this.socket.emit('classroom_read', {
        id_conversacion: this.currentConversation
      });
      
      // Actualizar contador
      this.updateUnreadCount();
      
    } catch (error) {
      console.error('Error al marcar como leído:', error);
    }
  }
  
  handleMessagesRead(data) {
    if (data.id_conversacion !== this.currentConversation) return;
    
    // Actualizar iconos de check a doble check
    document.querySelectorAll('.message-bubble.sent .message-status i').forEach(icon => {
      icon.setAttribute('data-lucide', 'check-check');
    });
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
  
  // =====================================================
  // Contador de No Leídos
  // =====================================================
  async loadUnreadCount() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${this.API_URL}/classroom-chat/no-leidos/${this.currentUser.tipo}/${this.currentUser.id}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      if (!response.ok) return;
      
      const data = await response.json();
      this.unreadCount = data.total;
      this.updateUnreadBadge();
      
    } catch (error) {
      console.error('Error cargando no leídos:', error);
    }
  }
  
  async updateUnreadCount() {
    await this.loadUnreadCount();
  }
  
  updateUnreadBadge() {
    const badge = document.getElementById('chatUnreadBadge');
    if (badge) {
      if (this.unreadCount > 0) {
        badge.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
        badge.style.display = 'inline-flex';
      } else {
        badge.style.display = 'none';
      }
    }
  }
  
  // =====================================================
  // Cargar Conversaciones Existentes
  // =====================================================
  async loadConversations() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${this.API_URL}/classroom-chat/conversaciones/${this.currentUser.tipo}/${this.currentUser.id}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      if (!response.ok) return;
      
      this.conversaciones = await response.json();
      
    } catch (error) {
      console.error('Error cargando conversaciones:', error);
    }
  }
  
  // =====================================================
  // Lightbox para Imágenes
  // =====================================================
  openLightbox(imageUrl) {
    let lightbox = document.querySelector('.chat-lightbox');
    
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.className = 'chat-lightbox';
      lightbox.innerHTML = `
        <img src="" alt="Imagen">
        <button class="chat-lightbox-close" onclick="classroomChat.closeLightbox()">
          <i data-lucide="x"></i>
        </button>
      `;
      document.body.appendChild(lightbox);
      
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) this.closeLightbox();
      });
    }
    
    lightbox.querySelector('img').src = imageUrl;
    lightbox.classList.add('active');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
  
  closeLightbox() {
    const lightbox = document.querySelector('.chat-lightbox');
    if (lightbox) lightbox.classList.remove('active');
  }
  
  // =====================================================
  // Utilidades
  // =====================================================
  getInitials(name) {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }
  
  formatTime(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    
    // Si es hoy, mostrar hora
    if (diff < 24 * 60 * 60 * 1000 && date.getDate() === now.getDate()) {
      return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    }
    
    // Si es ayer
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.getDate() === yesterday.getDate()) {
      return 'Ayer ' + date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    }
    
    // Fecha completa
    return date.toLocaleDateString('es-AR', { 
      day: '2-digit', 
      month: 'short',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
  
  formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
  
  getFileIcon(mimeType) {
    if (!mimeType) return 'file';
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType === 'application/pdf') return 'file-text';
    if (mimeType.includes('word')) return 'file-text';
    return 'file';
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }
  
  showError(message) {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false
      });
    } else {
      console.error(message);
    }
  }
  
  showContactsError() {
    const listProfesores = document.getElementById('chatListProfesores');
    const listCompaneros = document.getElementById('chatListCompaneros');
    
    const errorHtml = `
      <div class="messages-empty">
        <i data-lucide="alert-circle"></i>
        <p>Error al cargar contactos</p>
      </div>
    `;
    
    if (listProfesores) listProfesores.innerHTML = errorHtml;
    if (listCompaneros) listCompaneros.innerHTML = errorHtml;
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

// Inicializar cuando cargue el DOM
let classroomChat;
document.addEventListener('DOMContentLoaded', () => {
  // Solo inicializar en la página de Classroom
  if (document.querySelector('.classroom-container')) {
    classroomChat = new ClassroomChat();
  }
});
