// =====================================================
// CLASSROOM CHAT - Lógica del Chat
// Sistema de mensajería entre profesores y alumnos
// =====================================================

class ClassroomChat {
  constructor() {
    this.socket = null;
    this.currentUser = null;
    this.currentConversation = null;
    this.currentContact = null;
    this.contactos = { profesores: [], compañeros: [] };
    this.conversaciones = [];
    this.isTyping = false;
    this.typingTimeout = null;
    this.selectedFile = null;
    this.unreadCount = 0;
    
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
  
  initSocket() {
    const socketUrl = window.API_BASE_URL ? window.API_BASE_URL.replace('/api', '') : '';
    
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
    document.querySelectorAll('.contacts-tab').forEach(tab => {
      tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
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
    
    // Cerrar modal
    const closeBtn = document.getElementById('chatModalClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }
    
    // Cerrar con backdrop
    const backdrop = document.querySelector('.chat-modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeModal());
    }
    
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const lightbox = document.querySelector('.chat-lightbox.active');
        if (lightbox) {
          this.closeLightbox();
        } else {
          this.closeModal();
        }
      }
    });
  }
  
  // =====================================================
  // Abrir/Cerrar Modal
  // =====================================================
  async openModal() {
    // Verificar que el usuario esté autenticado
    if (!this.currentUser || !this.currentUser.tipo || !this.currentUser.id) {
      console.warn('ClassroomChat: No se puede abrir el modal - usuario no autenticado');
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'warning',
          title: 'No disponible',
          text: 'El chat no está disponible en este momento',
          confirmButtonColor: '#1e1e1e'
        });
      }
      return;
    }
    
    const modal = document.getElementById('classroomChatModal');
    if (!modal) return;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Cargar contactos
    await this.loadContacts();
    
    // Cargar conversaciones existentes
    await this.loadConversations();
    
    lucide.createIcons();
  }
  
  closeModal() {
    const modal = document.getElementById('classroomChatModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Limpiar conversación actual
    this.currentConversation = null;
    this.currentContact = null;
    this.selectedFile = null;
    
    // Resetear vista
    this.showEmptyConversation();
  }
  
  // =====================================================
  // Cargar Contactos
  // =====================================================
  async loadContacts(idCurso = null) {
    try {
      const token = localStorage.getItem('token');
      let url = `${window.API_BASE_URL}/classroom-chat/contactos/${this.currentUser.tipo}/${this.currentUser.id}`;
      
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
    
    // Renderizar profesores
    if (listProfesores) {
      if (this.contactos.profesores.length === 0) {
        listProfesores.innerHTML = `
          <div class="contacts-empty">
            <i data-lucide="user-x"></i>
            <p>No hay profesores disponibles</p>
          </div>
        `;
      } else {
        listProfesores.innerHTML = this.contactos.profesores.map(c => this.renderContactItem(c)).join('');
      }
    }
    
    // Renderizar compañeros
    if (listCompaneros) {
      if (this.contactos.compañeros.length === 0) {
        listCompaneros.innerHTML = `
          <div class="contacts-empty">
            <i data-lucide="users"></i>
            <p>No hay compañeros disponibles</p>
          </div>
        `;
      } else {
        listCompaneros.innerHTML = this.contactos.compañeros.map(c => this.renderContactItem(c)).join('');
      }
    }
    
    // Actualizar badges de tabs
    this.updateTabBadges();
    
    // Vincular eventos de contactos
    document.querySelectorAll('.contact-item').forEach(item => {
      item.addEventListener('click', () => {
        const tipo = item.dataset.tipo;
        const id = item.dataset.id;
        const idCurso = item.dataset.curso;
        this.selectContact(tipo, id, idCurso);
      });
    });
    
    lucide.createIcons();
  }
  
  renderContactItem(contacto) {
    const initials = this.getInitials(contacto.nombre_completo);
    const avatar = contacto.avatar 
      ? `<img src="${contacto.avatar}" alt="${contacto.nombre_completo}">`
      : `<span class="avatar-initials">${initials}</span>`;
    
    const roleLabel = contacto.tipo === 'profesor' ? 'Profesor' : 'Alumno';
    
    // Buscar si hay conversación existente con mensajes no leídos
    const conv = this.conversaciones.find(c => 
      c.contacto_tipo === contacto.tipo && 
      c.contacto_id === (contacto.id_profesor || contacto.id_alumno)
    );
    const noLeidos = conv?.no_leidos || 0;
    
    return `
      <div class="contact-item" 
           data-tipo="${contacto.tipo}" 
           data-id="${contacto.id_profesor || contacto.id_alumno}"
           data-curso="${contacto.id_curso}">
        <div class="contact-avatar">${avatar}</div>
        <div class="contact-info">
          <div class="contact-name">${contacto.nombre_completo}</div>
          <div class="contact-course">${contacto.nombre_curso}</div>
          <div class="contact-role">
            <i data-lucide="${contacto.tipo === 'profesor' ? 'user-check' : 'graduation-cap'}"></i>
            ${roleLabel}
          </div>
        </div>
        ${noLeidos > 0 ? `<span class="contact-badge">${noLeidos}</span>` : ''}
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
    document.querySelectorAll('.contacts-tab').forEach(t => t.classList.remove('active'));
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
    document.querySelector(`.contact-item[data-tipo="${tipo}"][data-id="${id}"][data-curso="${idCurso}"]`)?.classList.add('active');
    
    try {
      const token = localStorage.getItem('token');
      
      // Obtener o crear conversación
      const response = await fetch(`${window.API_BASE_URL}/classroom-chat/conversacion`, {
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
          id_curso: idCurso
        })
      });
      
      if (!response.ok) throw new Error('Error al iniciar conversación');
      
      const data = await response.json();
      
      this.currentConversation = data.id_conversacion;
      this.currentContact = {
        tipo,
        id,
        id_curso: idCurso,
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
        `${window.API_BASE_URL}/classroom-chat/conversacion/${this.currentConversation}?mi_tipo=${this.currentUser.tipo}&mi_id=${this.currentUser.id}`,
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
      lucide.createIcons();
      return;
    }
    
    container.innerHTML = mensajes.map(m => this.renderMessageBubble(m)).join('');
    
    lucide.createIcons();
    this.scrollToBottom();
  }
  
  renderMessageBubble(mensaje) {
    const isSent = mensaje.remitente_tipo === this.currentUser.tipo && 
                   mensaje.remitente_id == this.currentUser.id;
    
    const time = this.formatTime(mensaje.fecha_envio);
    
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
        <div class="message-content">
          ${content}
        </div>
        <div class="message-meta">
          <span class="message-time">${time}</span>
          ${isSent ? `<span class="message-status"><i data-lucide="${mensaje.leido ? 'check-check' : 'check'}"></i></span>` : ''}
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
    
    lucide.createIcons();
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
      
      const response = await fetch(`${window.API_BASE_URL}/classroom-chat/mensaje`, {
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
        lucide.createIcons();
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
      lucide.createIcons();
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
      // Mostrar notificación toast
      this.showToastNotification(data);
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
    lucide.createIcons();
    
    // Mostrar con animación
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 5000);
    
    // Click para abrir conversación
    toast.addEventListener('click', (e) => {
      if (!e.target.closest('.chat-toast-close')) {
        toast.remove();
        this.openModal();
        setTimeout(() => {
          this.selectContact(
            mensaje.remitente_tipo, 
            mensaje.remitente_id, 
            mensaje.id_curso
          );
        }, 300);
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
      await fetch(`${window.API_BASE_URL}/classroom-chat/marcar-leido/${this.currentConversation}`, {
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
    lucide.createIcons();
  }
  
  // =====================================================
  // Contador de No Leídos
  // =====================================================
  async loadUnreadCount() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${window.API_BASE_URL}/classroom-chat/no-leidos/${this.currentUser.tipo}/${this.currentUser.id}`,
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
    const badge = document.getElementById('chatFloatingBadge');
    if (badge) {
      if (this.unreadCount > 0) {
        badge.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
        badge.style.display = 'flex';
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
        `${window.API_BASE_URL}/classroom-chat/conversaciones/${this.currentUser.tipo}/${this.currentUser.id}`,
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
    lucide.createIcons();
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
      alert(message);
    }
  }
  
  showContactsError() {
    const list = document.querySelector('.contacts-list');
    if (list) {
      list.innerHTML = `
        <div class="contacts-empty">
          <i data-lucide="alert-circle"></i>
          <p>Error al cargar contactos</p>
        </div>
      `;
      lucide.createIcons();
    }
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
