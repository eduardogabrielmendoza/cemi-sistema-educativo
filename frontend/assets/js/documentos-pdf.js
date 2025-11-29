// ========================================
// SISTEMA DE GENERACIÓN DE DOCUMENTOS PDF
// CEMI - Centro de Enseñanza Multilingüe Internacional
// ========================================

// API Base URL (usar la misma que script.js)
const API_URL_DOCS = typeof API_URL !== 'undefined' ? API_URL : '/api';

// Logo CEMI en Base64 (se cargará dinámicamente)
let CEMI_LOGO_BASE64 = null;

// Cargar logo CEMI
async function cargarLogoCEMI() {
  if (CEMI_LOGO_BASE64) return CEMI_LOGO_BASE64;
  
  try {
    const response = await fetch('/images/logo.png');
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        CEMI_LOGO_BASE64 = reader.result;
        resolve(CEMI_LOGO_BASE64);
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn('No se pudo cargar el logo CEMI:', error);
    return null;
  }
}

// Abrir modal de selección de documentos
function openDocumentosModal(idAlumno, nombreAlumno) {
  // Crear modal
  const modalHTML = `
    <div id="documentosModal" class="modal-overlay" style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeInDoc 0.3s ease;
    ">
      <div class="modal-content" style="
        background: white;
        border-radius: 20px;
        width: 95%;
        max-width: 550px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
        animation: slideUpDoc 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      ">
        <!-- Header del Modal -->
        <div style="
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          padding: 25px 30px;
          border-radius: 20px 20px 0 0;
          position: relative;
          overflow: hidden;
        ">
          <div style="
            position: absolute;
            top: -30%;
            right: -10%;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            pointer-events: none;
          "></div>
          <button onclick="closeDocumentosModal()" style="
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255,255,255,0.2);
            border: none;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
            <i data-lucide="x" style="width: 20px; height: 20px; color: white;"></i>
          </button>
          <div style="display: flex; align-items: center; gap: 15px;">
            <div style="
              width: 55px;
              height: 55px;
              background: rgba(255,255,255,0.2);
              border-radius: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <i data-lucide="file-text" style="width: 28px; height: 28px; color: white;"></i>
            </div>
            <div>
              <h2 style="margin: 0; color: white; font-size: 22px; font-weight: 600;">Generar Documentos</h2>
              <p style="margin: 5px 0 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">${nombreAlumno}</p>
            </div>
          </div>
        </div>
        
        <!-- Cuerpo del Modal -->
        <div style="padding: 25px 30px;">
          <p style="color: #64748b; font-size: 14px; margin-bottom: 20px; text-align: center;">
            Selecciona el documento que deseas generar en formato PDF
          </p>
          
          <div style="display: grid; gap: 12px;">
            <!-- Constancia de Alumno Regular -->
            <button onclick="generarConstanciaAlumnoRegular(${idAlumno})" class="doc-option-btn" style="
              display: flex;
              align-items: center;
              gap: 15px;
              padding: 18px 20px;
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              border: 2px solid #e2e8f0;
              border-radius: 14px;
              cursor: pointer;
              transition: all 0.3s ease;
              text-align: left;
            " onmouseover="this.style.borderColor='#2a5298'; this.style.background='linear-gradient(135deg, #e8f4fd 0%, #d0e8fc 100%)'" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'">
              <div style="
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
              ">
                <i data-lucide="badge-check" style="width: 24px; height: 24px; color: white;"></i>
              </div>
              <div style="flex: 1;">
                <h4 style="margin: 0; color: #1e293b; font-size: 15px; font-weight: 600;">Constancia de Alumno Regular</h4>
                <p style="margin: 4px 0 0 0; color: #64748b; font-size: 12px;">Certifica inscripción activa en el instituto</p>
              </div>
              <i data-lucide="download" style="width: 20px; height: 20px; color: #94a3b8;"></i>
            </button>
            
            <!-- Certificado de Calificaciones -->
            <button onclick="generarCertificadoCalificaciones(${idAlumno})" class="doc-option-btn" style="
              display: flex;
              align-items: center;
              gap: 15px;
              padding: 18px 20px;
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              border: 2px solid #e2e8f0;
              border-radius: 14px;
              cursor: pointer;
              transition: all 0.3s ease;
              text-align: left;
            " onmouseover="this.style.borderColor='#2a5298'; this.style.background='linear-gradient(135deg, #e8f4fd 0%, #d0e8fc 100%)'" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'">
              <div style="
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
              ">
                <i data-lucide="clipboard-list" style="width: 24px; height: 24px; color: white;"></i>
              </div>
              <div style="flex: 1;">
                <h4 style="margin: 0; color: #1e293b; font-size: 15px; font-weight: 600;">Certificado de Calificaciones</h4>
                <p style="margin: 4px 0 0 0; color: #64748b; font-size: 12px;">Historial académico con notas y promedios</p>
              </div>
              <i data-lucide="download" style="width: 20px; height: 20px; color: #94a3b8;"></i>
            </button>
            
            <!-- Estado de Cuenta -->
            <button onclick="generarEstadoCuenta(${idAlumno})" class="doc-option-btn" style="
              display: flex;
              align-items: center;
              gap: 15px;
              padding: 18px 20px;
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              border: 2px solid #e2e8f0;
              border-radius: 14px;
              cursor: pointer;
              transition: all 0.3s ease;
              text-align: left;
            " onmouseover="this.style.borderColor='#2a5298'; this.style.background='linear-gradient(135deg, #e8f4fd 0%, #d0e8fc 100%)'" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'">
              <div style="
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
              ">
                <i data-lucide="receipt" style="width: 24px; height: 24px; color: white;"></i>
              </div>
              <div style="flex: 1;">
                <h4 style="margin: 0; color: #1e293b; font-size: 15px; font-weight: 600;">Estado de Cuenta</h4>
                <p style="margin: 4px 0 0 0; color: #64748b; font-size: 12px;">Resumen de pagos y cuotas pendientes</p>
              </div>
              <i data-lucide="download" style="width: 20px; height: 20px; color: #94a3b8;"></i>
            </button>
            
            <!-- Ficha de Inscripción -->
            <button onclick="generarFichaInscripcion(${idAlumno})" class="doc-option-btn" style="
              display: flex;
              align-items: center;
              gap: 15px;
              padding: 18px 20px;
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              border: 2px solid #e2e8f0;
              border-radius: 14px;
              cursor: pointer;
              transition: all 0.3s ease;
              text-align: left;
            " onmouseover="this.style.borderColor='#2a5298'; this.style.background='linear-gradient(135deg, #e8f4fd 0%, #d0e8fc 100%)'" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'">
              <div style="
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
              ">
                <i data-lucide="user-check" style="width: 24px; height: 24px; color: white;"></i>
              </div>
              <div style="flex: 1;">
                <h4 style="margin: 0; color: #1e293b; font-size: 15px; font-weight: 600;">Ficha de Inscripción</h4>
                <p style="margin: 4px 0 0 0; color: #64748b; font-size: 12px;">Datos personales y cursos inscriptos</p>
              </div>
              <i data-lucide="download" style="width: 20px; height: 20px; color: #94a3b8;"></i>
            </button>
            
            <!-- Códigos de Recuperación 2FA -->
            <button onclick="generarCodigosRecuperacion('${nombreAlumno}')" class="doc-option-btn" style="
              display: flex;
              align-items: center;
              gap: 15px;
              padding: 18px 20px;
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              border: 2px solid #e2e8f0;
              border-radius: 14px;
              cursor: pointer;
              transition: all 0.3s ease;
              text-align: left;
            " onmouseover="this.style.borderColor='#2a5298'; this.style.background='linear-gradient(135deg, #e8f4fd 0%, #d0e8fc 100%)'" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'">
              <div style="
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
              ">
                <i data-lucide="key" style="width: 24px; height: 24px; color: white;"></i>
              </div>
              <div style="flex: 1;">
                <h4 style="margin: 0; color: #1e293b; font-size: 15px; font-weight: 600;">Códigos de Recuperación 2FA</h4>
                <p style="margin: 4px 0 0 0; color: #64748b; font-size: 12px;">Generar 5 códigos aleatorios de respaldo</p>
              </div>
              <i data-lucide="sparkles" style="width: 20px; height: 20px; color: #94a3b8;"></i>
            </button>
            
            <!-- Separador -->
            <div style="
              margin: 10px 0;
              border-top: 2px dashed #e2e8f0;
            "></div>
            
            <!-- Descargar Todo (ZIP) -->
            <button onclick="generarTodosLosPDFs(${idAlumno})" class="doc-option-btn" style="
              display: flex;
              align-items: center;
              gap: 15px;
              padding: 18px 20px;
              background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
              border: 2px solid #1e40af;
              border-radius: 14px;
              cursor: pointer;
              transition: all 0.3s ease;
              text-align: left;
            " onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 4px 15px rgba(37, 99, 235, 0.4)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
              <div style="
                width: 50px;
                height: 50px;
                background: rgba(255,255,255,0.2);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
              ">
                <i data-lucide="archive" style="width: 24px; height: 24px; color: white;"></i>
              </div>
              <div style="flex: 1;">
                <h4 style="margin: 0; color: white; font-size: 15px; font-weight: 600;">Descargar Todo (ZIP)</h4>
                <p style="margin: 4px 0 0 0; color: rgba(255,255,255,0.8); font-size: 12px;">Paquete completo con los 4 documentos</p>
              </div>
              <i data-lucide="file-archive" style="width: 20px; height: 20px; color: rgba(255,255,255,0.8);"></i>
            </button>
          </div>
          
          <div style="
            margin-top: 20px;
            padding: 15px;
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
          ">
            <i data-lucide="info" style="width: 20px; height: 20px; color: #92400e; flex-shrink: 0;"></i>
            <p style="margin: 0; color: #92400e; font-size: 12px;">
              Los documentos se generan con datos actualizados y tienen validez institucional.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      @keyframes fadeInDoc {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUpDoc {
        from { opacity: 0; transform: translateY(30px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
    </style>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  lucide.createIcons();
  
  // Cerrar con Escape
  const closeOnEscape = (e) => {
    if (e.key === 'Escape') {
      closeDocumentosModal();
      document.removeEventListener('keydown', closeOnEscape);
    }
  };
  document.addEventListener('keydown', closeOnEscape);
}

// Cerrar modal de documentos
function closeDocumentosModal() {
  const modal = document.getElementById('documentosModal');
  if (modal) {
    modal.style.animation = 'fadeInDoc 0.2s ease reverse';
    setTimeout(() => modal.remove(), 200);
  }
}

// Función auxiliar para agregar header a los PDFs
async function agregarHeaderPDF(doc, titulo, subtitulo = null) {
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Fondo del header
  doc.setFillColor(30, 60, 114);
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  // Degradado decorativo
  doc.setFillColor(42, 82, 152);
  doc.rect(0, 35, pageWidth, 10, 'F');
  
  // Intentar agregar logo
  try {
    const logoBase64 = await cargarLogoCEMI();
    if (logoBase64) {
      // Esfera blanca detrás del logo para mejor estética
      doc.setFillColor(255, 255, 255);
      doc.circle(24, 22.5, 12, 'F');
      
      // Logo más pequeño centrado en la esfera
      doc.addImage(logoBase64, 'PNG', 12, 10.5, 24, 24);
      
      // Texto CEMI al lado del logo
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('CEMI', 42, 20);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text('Centro de Enseñanza Multilingüe Internacional', 42, 27);
    } else {
      // Fallback: solo texto
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('CEMI', 20, 25);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('Centro de Enseñanza Multilingüe Internacional', 20, 32);
    }
  } catch (e) {
    // Fallback: solo texto
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('CEMI', 20, 25);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Centro de Enseñanza Multilingüe Internacional', 20, 32);
  }
  
  // Título del documento
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(titulo, pageWidth - 20, 22, { align: 'right' });
  
  if (subtitulo) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(subtitulo, pageWidth - 20, 30, { align: 'right' });
  }
  
  return 55; // Retorna la posición Y después del header
}

// Función auxiliar para agregar footer a los PDFs
function agregarFooterPDF(doc) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Línea separadora
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(20, pageHeight - 25, pageWidth - 20, pageHeight - 25);
  
  // Texto del footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(128, 128, 128);
  doc.text('CEMI - Centro de Enseñanza Multilingüe Internacional', pageWidth / 2, pageHeight - 18, { align: 'center' });
  doc.text(`Documento generado el ${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })} a las ${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`, pageWidth / 2, pageHeight - 12, { align: 'center' });
  doc.setFontSize(7);
  doc.text('Este documento tiene validez institucional', pageWidth / 2, pageHeight - 7, { align: 'center' });
}

// GENERADOR DE CÓDIGOS DE RECUPERACIÓN 2FA (Visual)
function generarCodigosRecuperacion(nombreAlumno) {
  // Función para generar un código aleatorio de 8 caracteres
  function generarCodigo() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Sin I, O, 0, 1 para evitar confusión
    let codigo = '';
    for (let i = 0; i < 8; i++) {
      if (i === 4) codigo += '-'; // Separador en el medio
      codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return codigo;
  }
  
  // Generar 5 códigos únicos
  const codigos = [];
  for (let i = 0; i < 5; i++) {
    codigos.push(generarCodigo());
  }
  
  // Crear modal para mostrar los códigos
  const modalHTML = `
    <div id="codigosRecuperacionModal" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100000;
      animation: fadeInCodigos 0.3s ease;
    ">
      <div style="
        background: white;
        border-radius: 20px;
        width: 90%;
        max-width: 450px;
        overflow: hidden;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
        animation: slideUpCodigos 0.4s ease;
      ">
        <!-- Header -->
        <div style="
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          padding: 25px 30px;
          position: relative;
        ">
          <button onclick="document.getElementById('codigosRecuperacionModal').remove()" style="
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255,255,255,0.2);
            border: none;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <i data-lucide="x" style="width: 20px; height: 20px; color: white;"></i>
          </button>
          <div style="display: flex; align-items: center; gap: 15px;">
            <div style="
              width: 55px;
              height: 55px;
              background: rgba(255,255,255,0.2);
              border-radius: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <i data-lucide="key" style="width: 28px; height: 28px; color: white;"></i>
            </div>
            <div>
              <h2 style="margin: 0; color: white; font-size: 20px; font-weight: 600;">Códigos de Recuperación</h2>
              <p style="margin: 5px 0 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">${nombreAlumno}</p>
            </div>
          </div>
        </div>
        
        <!-- Cuerpo -->
        <div style="padding: 25px 30px;">
          <div style="
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border: 2px dashed #93c5fd;
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
          ">
            <p style="margin: 0 0 15px 0; color: #1e40af; font-size: 13px; text-align: center; font-weight: 500;">
              🔐 Códigos generados aleatoriamente
            </p>
            <div style="display: grid; gap: 10px;">
              ${codigos.map((codigo, i) => `
                <div style="
                  display: flex;
                  align-items: center;
                  gap: 12px;
                  background: white;
                  padding: 12px 16px;
                  border-radius: 10px;
                  box-shadow: 0 2px 8px rgba(30, 60, 114, 0.1);
                ">
                  <span style="
                    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                    color: white;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: 600;
                  ">${i + 1}</span>
                  <code style="
                    font-family: 'Consolas', 'Monaco', monospace;
                    font-size: 18px;
                    font-weight: 600;
                    color: #1e293b;
                    letter-spacing: 2px;
                    flex: 1;
                  ">${codigo}</code>
                  <button onclick="navigator.clipboard.writeText('${codigo}'); this.innerHTML='<i data-lucide=\\'check\\' style=\\'width:16px;height:16px;color:#10b981;\\'></i>'; lucide.createIcons(); setTimeout(() => { this.innerHTML='<i data-lucide=\\'copy\\' style=\\'width:16px;height:16px;color:#94a3b8;\\'></i>'; lucide.createIcons(); }, 1500);" style="
                    background: #f1f5f9;
                    border: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  ">
                    <i data-lucide="copy" style="width: 16px; height: 16px; color: #94a3b8;"></i>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div style="
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-radius: 12px;
            padding: 15px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 20px;
          ">
            <i data-lucide="alert-triangle" style="width: 20px; height: 20px; color: #92400e; flex-shrink: 0; margin-top: 2px;"></i>
            <div>
              <p style="margin: 0; color: #92400e; font-size: 12px; line-height: 1.5;">
                <strong>⚠️ Importante:</strong> Cada código solo puede usarse UNA vez. Guárdalos en un lugar seguro fuera de tu dispositivo.
              </p>
            </div>
          </div>
          
          <div style="display: flex; gap: 12px;">
            <button onclick="
              const texto = '🔐 Códigos de Recuperación 2FA - CEMI\\n' +
                           '${nombreAlumno}\\n' +
                           '━━━━━━━━━━━━━━━━━━━━━━━━\\n' +
                           '${codigos.map((c, i) => (i+1) + '. ' + c).join('\\n')}\\n' +
                           '━━━━━━━━━━━━━━━━━━━━━━━━\\n' +
                           '⚠️ Cada código es de un solo uso.\\n' +
                           'Generado: ' + new Date().toLocaleString('es-AR');
              navigator.clipboard.writeText(texto);
              showToast('Códigos copiados al portapapeles', 'success');
            " style="
              flex: 1;
              padding: 14px;
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              border: 2px solid #e2e8f0;
              border-radius: 12px;
              font-size: 14px;
              font-weight: 600;
              color: #475569;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
            ">
              <i data-lucide="clipboard-copy" style="width: 18px; height: 18px;"></i>
              Copiar Todos
            </button>
            <button onclick="generarNuevosCodigos('${nombreAlumno}')" style="
              flex: 1;
              padding: 14px;
              background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
              border: none;
              border-radius: 12px;
              font-size: 14px;
              font-weight: 600;
              color: white;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
            ">
              <i data-lucide="refresh-cw" style="width: 18px; height: 18px;"></i>
              Regenerar
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      @keyframes fadeInCodigos {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUpCodigos {
        from { opacity: 0; transform: translateY(30px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
    </style>
  `;
  
  // Remover modal anterior si existe
  const existingModal = document.getElementById('codigosRecuperacionModal');
  if (existingModal) existingModal.remove();
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  lucide.createIcons();
}

// Función para regenerar códigos
function generarNuevosCodigos(nombreAlumno) {
  document.getElementById('codigosRecuperacionModal').remove();
  generarCodigosRecuperacion(nombreAlumno);
  showToast('Nuevos códigos generados', 'success');
}

// 1. CONSTANCIA DE ALUMNO REGULAR
async function generarConstanciaAlumnoRegular(idAlumno) {
  try {
    closeDocumentosModal();
    showToast('Generando constancia...', 'info');
    
    const response = await fetch(`${API_URL_DOCS}/alumnos/${idAlumno}`);
    if (!response.ok) throw new Error('Error al obtener datos del alumno');
    const alumno = await response.json();
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = await agregarHeaderPDF(doc, 'CONSTANCIA', 'Alumno Regular');
    
    // Número de constancia
    const numeroConstancia = `CONST-${new Date().getFullYear()}-${String(idAlumno).padStart(5, '0')}`;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`N° ${numeroConstancia}`, pageWidth - 20, yPos, { align: 'right' });
    
    yPos += 20;
    
    // Título principal
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 60, 114);
    doc.text('CONSTANCIA DE ALUMNO REGULAR', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 20;
    
    // Cuerpo de la constancia
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    
    const textoConstancia = `Por medio de la presente, el Centro de Enseñanza Multilingüe Internacional (CEMI) certifica que:`;
    doc.text(textoConstancia, 20, yPos, { maxWidth: pageWidth - 40 });
    
    yPos += 20;
    
    // Datos del alumno en recuadro
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(30, 60, 114);
    doc.setLineWidth(0.5);
    doc.roundedRect(20, yPos, pageWidth - 40, 50, 3, 3, 'FD');
    
    yPos += 12;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 60, 114);
    doc.text(`${alumno.nombre} ${alumno.apellido}`, pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`DNI: ${alumno.dni || 'No registrado'}`, pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 8;
    doc.text(`Legajo: ${alumno.legajo}`, pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 8;
    doc.text(`Fecha de Registro: ${alumno.fecha_registro ? new Date(alumno.fecha_registro).toLocaleDateString('es-ES') : 'No registrada'}`, pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 25;
    
    // Texto de confirmación
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    const textoConfirmacion = `Se encuentra regularmente inscripto/a como alumno/a de esta institución, cursando actualmente ${alumno.cursos_activos || 0} curso(s) de idiomas.`;
    doc.text(textoConfirmacion, 20, yPos, { maxWidth: pageWidth - 40 });
    
    yPos += 20;
    
    // Cursos activos
    if (alumno.cursos && alumno.cursos.length > 0) {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 60, 114);
      doc.text('Cursos en los que se encuentra inscripto:', 20, yPos);
      
      yPos += 8;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      
      alumno.cursos.forEach((curso, index) => {
        doc.text(`• ${curso.nombre_curso} - ${curso.nombre_idioma} (Nivel ${curso.id_nivel})`, 25, yPos);
        yPos += 6;
      });
    }
    
    yPos += 15;
    
    // Texto final
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.text('Se extiende la presente constancia a pedido del interesado para ser presentada', 20, yPos);
    yPos += 6;
    doc.text('ante quien corresponda.', 20, yPos);
    
    yPos += 25;
    
    // Fecha y lugar
    doc.setFont('helvetica', 'italic');
    doc.text(`San Miguel de Tucumán, ${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`, pageWidth - 20, yPos, { align: 'right' });
    
    // Espacio para firma
    yPos += 30;
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(0.3);
    doc.line(pageWidth / 2 - 40, yPos, pageWidth / 2 + 40, yPos);
    yPos += 5;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Firma y Sello', pageWidth / 2, yPos, { align: 'center' });
    yPos += 4;
    doc.text('Dirección CEMI', pageWidth / 2, yPos, { align: 'center' });
    
    agregarFooterPDF(doc);
    
    const nombreArchivo = `Constancia_Alumno_Regular_${alumno.legajo}_${alumno.apellido}.pdf`;
    doc.save(nombreArchivo);
    
    showToast('Constancia generada exitosamente', 'success');
  } catch (error) {
    console.error('Error al generar constancia:', error);
    showToast('Error al generar la constancia', 'error');
  }
}

// 2. CERTIFICADO DE CALIFICACIONES
async function generarCertificadoCalificaciones(idAlumno) {
  try {
    closeDocumentosModal();
    showToast('Generando certificado...', 'info');
    
    const response = await fetch(`${API_URL_DOCS}/alumnos/${idAlumno}`);
    if (!response.ok) throw new Error('Error al obtener datos del alumno');
    const alumno = await response.json();
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = await agregarHeaderPDF(doc, 'CERTIFICADO', 'Calificaciones Académicas');
    
    // Número de certificado
    const numeroCertificado = `CERT-${new Date().getFullYear()}-${String(idAlumno).padStart(5, '0')}`;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`N° ${numeroCertificado}`, pageWidth - 20, yPos, { align: 'right' });
    
    yPos += 15;
    
    // Título
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 60, 114);
    doc.text('CERTIFICADO DE CALIFICACIONES', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 15;
    
    // Datos del alumno
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(30, 60, 114);
    doc.roundedRect(20, yPos, pageWidth - 40, 28, 3, 3, 'FD');
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 60, 114);
    doc.text('ALUMNO:', 25, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(`${alumno.nombre} ${alumno.apellido}`, 50, yPos);
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 60, 114);
    doc.text('DNI:', 120, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(`${alumno.dni || 'N/R'}`, 132, yPos);
    
    yPos += 10;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 60, 114);
    doc.text('LEGAJO:', 25, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(`${alumno.legajo}`, 50, yPos);
    
    if (alumno.promedio_general) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 60, 114);
      doc.text('PROMEDIO GENERAL:', 120, yPos);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129);
      doc.text(`${alumno.promedio_general}`, 172, yPos);
    }
    
    yPos += 20;
    
    // Tabla de calificaciones
    if (alumno.cursos && alumno.cursos.length > 0) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 60, 114);
      doc.text('DETALLE DE CALIFICACIONES POR CURSO', 20, yPos);
      
      yPos += 8;
      
      // Headers de la tabla
      const colWidths = [60, 25, 25, 25, 30];
      const headers = ['Curso', 'Parcial 1', 'Parcial 2', 'Final', 'Promedio'];
      
      doc.setFillColor(30, 60, 114);
      doc.rect(20, yPos, pageWidth - 40, 10, 'F');
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      
      let xPos = 22;
      headers.forEach((header, i) => {
        doc.text(header, xPos, yPos + 7);
        xPos += colWidths[i];
      });
      
      yPos += 12;
      
      // Filas de la tabla
      doc.setFont('helvetica', 'normal');
      alumno.cursos.forEach((curso, index) => {
        // Alternar colores de fila
        if (index % 2 === 0) {
          doc.setFillColor(248, 250, 252);
          doc.rect(20, yPos - 2, pageWidth - 40, 10, 'F');
        }
        
        doc.setTextColor(50, 50, 50);
        xPos = 22;
        
        // Nombre del curso (truncado si es muy largo)
        const nombreCurso = curso.nombre_curso.length > 25 ? curso.nombre_curso.substring(0, 22) + '...' : curso.nombre_curso;
        doc.text(nombreCurso, xPos, yPos + 5);
        xPos += colWidths[0];
        
        // Parcial 1
        doc.text(curso.parcial1 ? curso.parcial1.toString() : '-', xPos + 8, yPos + 5);
        xPos += colWidths[1];
        
        // Parcial 2
        doc.text(curso.parcial2 ? curso.parcial2.toString() : '-', xPos + 8, yPos + 5);
        xPos += colWidths[2];
        
        // Final
        doc.text(curso.final ? curso.final.toString() : '-', xPos + 5, yPos + 5);
        xPos += colWidths[3];
        
        // Promedio
        const promedio = curso.promedio ? parseFloat(curso.promedio).toFixed(2) : '-';
        doc.setFont('helvetica', 'bold');
        if (promedio !== '-' && parseFloat(promedio) >= 7) {
          doc.setTextColor(16, 185, 129);
        } else if (promedio !== '-' && parseFloat(promedio) >= 4) {
          doc.setTextColor(245, 158, 11);
        } else if (promedio !== '-') {
          doc.setTextColor(239, 68, 68);
        }
        doc.text(promedio, xPos + 5, yPos + 5);
        doc.setFont('helvetica', 'normal');
        
        yPos += 10;
      });
      
      // Borde de la tabla
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.3);
      doc.rect(20, yPos - (alumno.cursos.length * 10) - 12, pageWidth - 40, (alumno.cursos.length * 10) + 12);
      
    } else {
      doc.setFontSize(11);
      doc.setTextColor(100, 100, 100);
      doc.text('No hay calificaciones registradas.', pageWidth / 2, yPos + 10, { align: 'center' });
      yPos += 20;
    }
    
    yPos += 20;
    
    // Leyenda
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('Escala de calificación: 1 a 10 | Nota mínima de aprobación: 7 (siete)', 20, yPos);
    
    yPos += 15;
    
    // Fecha y firma
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(50, 50, 50);
    doc.text(`Emitido en San Miguel de Tucumán, ${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`, pageWidth - 20, yPos, { align: 'right' });
    
    yPos += 25;
    doc.setDrawColor(100, 100, 100);
    doc.line(pageWidth / 2 - 40, yPos, pageWidth / 2 + 40, yPos);
    yPos += 5;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Firma y Sello - Dirección Académica', pageWidth / 2, yPos, { align: 'center' });
    
    agregarFooterPDF(doc);
    
    const nombreArchivo = `Certificado_Calificaciones_${alumno.legajo}_${alumno.apellido}.pdf`;
    doc.save(nombreArchivo);
    
    showToast('Certificado generado exitosamente', 'success');
  } catch (error) {
    console.error('Error al generar certificado:', error);
    showToast('Error al generar el certificado', 'error');
  }
}

// 3. ESTADO DE CUENTA
async function generarEstadoCuenta(idAlumno) {
  try {
    closeDocumentosModal();
    showToast('Generando estado de cuenta...', 'info');
    
    // Obtener datos del alumno
    const alumnoResponse = await fetch(`${API_URL_DOCS}/alumnos/${idAlumno}`);
    if (!alumnoResponse.ok) throw new Error('Error al obtener datos del alumno');
    const alumno = await alumnoResponse.json();
    
    // Obtener pagos del alumno
    const pagosResponse = await fetch(`${API_URL_DOCS}/pagos/alumno/${idAlumno}`);
    let pagosData = { cursos: [] };
    if (pagosResponse.ok) {
      pagosData = await pagosResponse.json();
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = await agregarHeaderPDF(doc, 'ESTADO DE CUENTA', 'Resumen Financiero');
    
    // Número de documento
    const numeroDoc = `EC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(idAlumno).padStart(5, '0')}`;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`N° ${numeroDoc}`, pageWidth - 20, yPos, { align: 'right' });
    
    yPos += 10;
    
    // Datos del alumno
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(30, 60, 114);
    doc.roundedRect(20, yPos, pageWidth - 40, 22, 3, 3, 'FD');
    
    yPos += 8;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 60, 114);
    doc.text('ALUMNO:', 25, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(`${alumno.nombre} ${alumno.apellido}`, 50, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 60, 114);
    doc.text('LEGAJO:', 130, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(`${alumno.legajo}`, 152, yPos);
    
    yPos += 8;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 60, 114);
    doc.text('EMAIL:', 25, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(`${alumno.mail || 'No registrado'}`, 45, yPos);
    
    yPos += 18;
    
    // Resumen general - usar estadisticas_globales del endpoint
    let totalPagado = 0;
    let totalPendiente = 0;
    let cuotasPagadas = 0;
    let cuotasTotales = 0;
    
    if (pagosData.estadisticas_globales) {
      totalPagado = pagosData.estadisticas_globales.total_pagado || 0;
      totalPendiente = pagosData.estadisticas_globales.total_pendiente || 0;
    }
    
    if (pagosData.cursos && pagosData.cursos.length > 0) {
      pagosData.cursos.forEach(curso => {
        if (curso.estadisticas) {
          cuotasPagadas += curso.estadisticas.cuotas_pagadas || 0;
          cuotasTotales += (curso.estadisticas.cuotas_pagadas || 0) + 
                          (curso.estadisticas.cuotas_impagas || 0) + 
                          (curso.estadisticas.cuotas_pendientes || 0);
        }
      });
    }
    
    // Cajas de resumen
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 60, 114);
    doc.text('RESUMEN GENERAL', 20, yPos);
    
    yPos += 8;
    
    // Caja Total Pagado
    doc.setFillColor(220, 252, 231);
    doc.setDrawColor(16, 185, 129);
    doc.roundedRect(20, yPos, 55, 28, 3, 3, 'FD');
    doc.setFontSize(9);
    doc.setTextColor(16, 185, 129);
    doc.text('TOTAL PAGADO', 47.5, yPos + 8, { align: 'center' });
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`$${totalPagado.toLocaleString('es-AR')}`, 47.5, yPos + 20, { align: 'center' });
    
    // Caja Total Pendiente
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(245, 158, 11);
    doc.roundedRect(80, yPos, 55, 28, 3, 3, 'FD');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(217, 119, 6);
    doc.text('PENDIENTE', 107.5, yPos + 8, { align: 'center' });
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`$${totalPendiente.toLocaleString('es-AR')}`, 107.5, yPos + 20, { align: 'center' });
    
    // Caja Cuotas
    doc.setFillColor(239, 246, 255);
    doc.setDrawColor(59, 130, 246);
    doc.roundedRect(140, yPos, 50, 28, 3, 3, 'FD');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(37, 99, 235);
    doc.text('CUOTAS', 165, yPos + 8, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${cuotasPagadas}/${cuotasTotales}`, 165, yPos + 20, { align: 'center' });
    
    yPos += 38;
    
    // Detalle por curso
    const pageHeight = doc.internal.pageSize.getHeight();
    const margenInferior = 35; // Espacio para footer
    
    // Función para verificar y agregar nueva página si es necesario
    const verificarNuevaPagina = (espacioNecesario = 15) => {
      if (yPos + espacioNecesario > pageHeight - margenInferior) {
        agregarFooterPDF(doc);
        doc.addPage();
        yPos = 20; // Reiniciar posición Y en nueva página
        return true;
      }
      return false;
    };
    
    if (pagosData.cursos && pagosData.cursos.length > 0) {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 60, 114);
      doc.text('DETALLE POR CURSO', 20, yPos);
      
      yPos += 8;
      
      pagosData.cursos.forEach((curso, index) => {
        // Verificar si hay espacio para el header del curso + al menos 3 filas
        verificarNuevaPagina(40);
        
        // Header del curso
        doc.setFillColor(241, 245, 249);
        doc.rect(20, yPos, pageWidth - 40, 8, 'F');
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 60, 114);
        const nombreCurso = curso.nombre_curso || 'Curso';
        doc.text(nombreCurso, 25, yPos + 6);
        
        yPos += 12;
        
        // Cuotas del curso - usar curso.meses del endpoint
        if (curso.meses && curso.meses.length > 0) {
          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');
          
          // Headers de cuotas
          doc.setTextColor(100, 100, 100);
          doc.text('Cuota', 25, yPos);
          doc.text('Monto', 70, yPos);
          doc.text('Estado', 100, yPos);
          doc.text('Fecha Pago', 140, yPos);
          
          yPos += 5;
          doc.setDrawColor(200, 200, 200);
          doc.line(25, yPos, pageWidth - 25, yPos);
          yPos += 4;
          
          curso.meses.forEach(mes => {
            // Verificar espacio antes de cada fila
            if (verificarNuevaPagina(8)) {
              // Repetir headers en nueva página
              doc.setFontSize(8);
              doc.setFont('helvetica', 'bold');
              doc.setTextColor(30, 60, 114);
              doc.text(`${nombreCurso} (continuación)`, 25, yPos);
              yPos += 8;
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(100, 100, 100);
              doc.text('Cuota', 25, yPos);
              doc.text('Monto', 70, yPos);
              doc.text('Estado', 100, yPos);
              doc.text('Fecha Pago', 140, yPos);
              yPos += 5;
              doc.setDrawColor(200, 200, 200);
              doc.line(25, yPos, pageWidth - 25, yPos);
              yPos += 4;
            }
            
            doc.setFontSize(8);
            doc.setTextColor(50, 50, 50);
            doc.text(mes.mes || '', 25, yPos);
            doc.text(`$${(mes.monto || 15000).toLocaleString('es-AR')}`, 70, yPos);
            
            if (mes.estado === 'pagado') {
              doc.setTextColor(16, 185, 129);
              doc.text('Pagado', 100, yPos);
              doc.setTextColor(100, 100, 100);
              doc.text(mes.fecha_pago ? new Date(mes.fecha_pago).toLocaleDateString('es-ES') : '-', 140, yPos);
            } else if (mes.estado === 'impago') {
              doc.setTextColor(239, 68, 68);
              doc.text('Impago', 100, yPos);
              doc.setTextColor(100, 100, 100);
              doc.text('-', 140, yPos);
            } else if (mes.estado === 'pendiente') {
              doc.setTextColor(245, 158, 11);
              doc.text('Pendiente', 100, yPos);
              doc.setTextColor(100, 100, 100);
              doc.text('-', 140, yPos);
            } else {
              doc.setTextColor(156, 163, 175);
              doc.text('Próximo', 100, yPos);
              doc.setTextColor(100, 100, 100);
              doc.text('-', 140, yPos);
            }
            
            yPos += 5;
          });
        }
        
        yPos += 8;
      });
    } else {
      doc.setFontSize(11);
      doc.setTextColor(100, 100, 100);
      doc.text('No hay registros de pagos para este alumno.', pageWidth / 2, yPos + 10, { align: 'center' });
    }
    
    // Verificar espacio para notas finales
    verificarNuevaPagina(20);
    yPos += 5;
    
    // Nota
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('* Los montos están expresados en pesos argentinos (ARS)', 20, yPos);
    yPos += 4;
    doc.text('* Para consultas sobre pagos, comunicarse con administración', 20, yPos);
    
    agregarFooterPDF(doc);
    
    const nombreArchivo = `Estado_Cuenta_${alumno.legajo}_${alumno.apellido}_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(nombreArchivo);
    
    showToast('Estado de cuenta generado exitosamente', 'success');
  } catch (error) {
    console.error('Error al generar estado de cuenta:', error);
    showToast('Error al generar el estado de cuenta', 'error');
  }
}

// 4. FICHA DE INSCRIPCIÓN
async function generarFichaInscripcion(idAlumno) {
  try {
    closeDocumentosModal();
    showToast('Generando ficha de inscripción...', 'info');
    
    const response = await fetch(`${API_URL_DOCS}/alumnos/${idAlumno}`);
    if (!response.ok) throw new Error('Error al obtener datos del alumno');
    const alumno = await response.json();
    
    // Obtener información adicional de cursos con profesores desde pagos
    const pagosResponse = await fetch(`${API_URL_DOCS}/pagos/alumno/${idAlumno}`);
    let cursosConProfesor = [];
    if (pagosResponse.ok) {
      const pagosData = await pagosResponse.json();
      cursosConProfesor = pagosData.cursos || [];
    }
    
    // Combinar datos: usar alumno.cursos para idioma/nivel, agregar profesor de pagos
    const cursosCombinados = (alumno.cursos || []).map(curso => {
      // Buscar el profesor en cursosConProfesor
      const cursoPago = cursosConProfesor.find(cp => cp.id_curso === curso.id_curso);
      return {
        ...curso,
        profesor: cursoPago?.profesor || 'No asignado'
      };
    });
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = await agregarHeaderPDF(doc, 'FICHA DE INSCRIPCIÓN', 'Datos del Alumno');
    
    // Número de ficha
    const numeroFicha = `FI-${alumno.legajo}`;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`N° ${numeroFicha}`, pageWidth - 20, yPos, { align: 'right' });
    
    yPos += 10;
    
    // Sección: Datos Personales
    doc.setFillColor(30, 60, 114);
    doc.rect(20, yPos, pageWidth - 40, 8, 'F');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('DATOS PERSONALES', 25, yPos + 6);
    
    yPos += 14;
    
    // Grid de datos personales
    const datosPersonales = [
      { label: 'Nombre Completo', value: `${alumno.nombre || ''} ${alumno.apellido || ''}`.trim() || 'No registrado' },
      { label: 'DNI', value: alumno.dni || 'No registrado' },
      { label: 'Legajo', value: alumno.legajo || 'No asignado' },
      { label: 'Email', value: alumno.mail || 'No registrado' },
      { label: 'Teléfono', value: alumno.telefono || 'No registrado' },
      { label: 'Fecha de Registro', value: alumno.fecha_registro ? new Date(alumno.fecha_registro).toLocaleDateString('es-ES') : 'No registrada' },
      { label: 'Estado', value: alumno.estado ? alumno.estado.charAt(0).toUpperCase() + alumno.estado.slice(1) : 'Activo' },
      { label: 'Usuario', value: alumno.usuario || 'No asignado' }
    ];
    
    doc.setFontSize(9);
    let col = 0;
    datosPersonales.forEach((dato, index) => {
      const xBase = col === 0 ? 25 : 115;
      
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 60, 114);
      doc.text(`${dato.label}:`, xBase, yPos);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);
      const maxWidth = col === 0 ? 60 : 70;
      const valorTruncado = dato.value.length > 35 ? dato.value.substring(0, 32) + '...' : dato.value;
      doc.text(valorTruncado, xBase + 35, yPos);
      
      col++;
      if (col === 2) {
        col = 0;
        yPos += 8;
      }
    });
    
    if (col !== 0) yPos += 8;
    yPos += 8;
    
    // Sección: Cursos Inscriptos
    doc.setFillColor(30, 60, 114);
    doc.rect(20, yPos, pageWidth - 40, 8, 'F');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('CURSOS INSCRIPTOS', 25, yPos + 6);
    
    yPos += 14;
    
    if (cursosCombinados.length > 0) {
      const cursos = cursosCombinados;
      
      // Headers de tabla
      doc.setFillColor(241, 245, 249);
      doc.rect(20, yPos, pageWidth - 40, 8, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 60, 114);
      doc.text('Curso', 25, yPos + 6);
      doc.text('Idioma', 75, yPos + 6);
      doc.text('Nivel', 110, yPos + 6);
      doc.text('Profesor', 135, yPos + 6);
      
      yPos += 12;
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);
      
      cursos.forEach((curso, index) => {
        if (index % 2 === 0) {
          doc.setFillColor(248, 250, 252);
          doc.rect(20, yPos - 3, pageWidth - 40, 8, 'F');
        }
        
        const nombreCurso = (curso.nombre_curso || '').length > 25 ? (curso.nombre_curso || '').substring(0, 22) + '...' : (curso.nombre_curso || 'N/A');
        doc.text(nombreCurso, 25, yPos + 2);
        doc.text(curso.nombre_idioma || 'N/A', 75, yPos + 2);
        doc.text(curso.nivel || curso.id_nivel?.toString() || 'N/A', 110, yPos + 2);
        
        const profesor = (curso.profesor || '').length > 20 ? (curso.profesor || '').substring(0, 17) + '...' : (curso.profesor || 'No asignado');
        doc.text(profesor, 135, yPos + 2);
        
        yPos += 8;
      });
      
      // Borde de tabla
      doc.setDrawColor(200, 200, 200);
      doc.rect(20, yPos - (cursos.length * 8) - 12, pageWidth - 40, (cursos.length * 8) + 12);
      
    } else {
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('No hay cursos inscriptos actualmente.', pageWidth / 2, yPos, { align: 'center' });
      yPos += 10;
    }
    
    yPos += 15;
    
    // Sección: Información Académica
    doc.setFillColor(30, 60, 114);
    doc.rect(20, yPos, pageWidth - 40, 8, 'F');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('INFORMACIÓN ACADÉMICA', 25, yPos + 6);
    
    yPos += 14;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 60, 114);
    doc.text('Total de Cursos Activos:', 25, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(`${alumno.cursos_activos || 0}`, 80, yPos);
    
    yPos += 8;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 60, 114);
    doc.text('Promedio General:', 25, yPos);
    doc.setFont('helvetica', 'normal');
    if (alumno.promedio_general && parseFloat(alumno.promedio_general) >= 7) {
      doc.setTextColor(16, 185, 129);
    } else if (alumno.promedio_general && parseFloat(alumno.promedio_general) >= 4) {
      doc.setTextColor(245, 158, 11);
    } else {
      doc.setTextColor(50, 50, 50);
    }
    doc.text(`${alumno.promedio_general || 'Sin calificaciones'}`, 80, yPos);
    
    yPos += 25;
    
    // Fecha y firma
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(50, 50, 50);
    doc.text(`Ficha generada el ${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`, pageWidth - 20, yPos, { align: 'right' });
    
    yPos += 20;
    
    // Firmas
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(0.3);
    
    // Firma alumno
    doc.line(30, yPos, 90, yPos);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Firma del Alumno', 60, yPos + 5, { align: 'center' });
    
    // Firma institución
    doc.line(120, yPos, 180, yPos);
    doc.text('Sello Institucional', 150, yPos + 5, { align: 'center' });
    
    agregarFooterPDF(doc);
    
    const nombreArchivo = `Ficha_Inscripcion_${alumno.legajo}_${alumno.apellido}.pdf`;
    doc.save(nombreArchivo);
    
    showToast('Ficha de inscripción generada exitosamente', 'success');
  } catch (error) {
    console.error('Error al generar ficha:', error);
    showToast('Error al generar la ficha de inscripción', 'error');
  }
}

// 5. GENERAR TODOS LOS PDFs EN UN ZIP
async function generarTodosLosPDFs(idAlumno) {
  try {
    closeDocumentosModal();
    showToast('Generando paquete de documentos...', 'info');
    
    // Obtener datos del alumno
    const response = await fetch(`${API_URL_DOCS}/alumnos/${idAlumno}`);
    if (!response.ok) throw new Error('Error al obtener datos del alumno');
    const alumno = await response.json();
    
    // Obtener datos de pagos
    const pagosResponse = await fetch(`${API_URL_DOCS}/pagos/alumno/${idAlumno}`);
    let pagosData = { cursos: [] };
    if (pagosResponse.ok) {
      pagosData = await pagosResponse.json();
    }
    
    const zip = new JSZip();
    const { jsPDF } = window.jspdf;
    
    // Generar cada PDF
    showToast('Generando Constancia de Alumno Regular...', 'info');
    const pdfConstancia = await generarPDFConstancia(alumno);
    zip.file(`01_Constancia_Alumno_Regular_${alumno.legajo}.pdf`, pdfConstancia);
    
    showToast('Generando Certificado de Calificaciones...', 'info');
    const pdfCalificaciones = await generarPDFCalificaciones(alumno);
    zip.file(`02_Certificado_Calificaciones_${alumno.legajo}.pdf`, pdfCalificaciones);
    
    showToast('Generando Estado de Cuenta...', 'info');
    const pdfEstadoCuenta = await generarPDFEstadoCuenta(alumno, pagosData);
    zip.file(`03_Estado_Cuenta_${alumno.legajo}.pdf`, pdfEstadoCuenta);
    
    showToast('Generando Ficha de Inscripción...', 'info');
    const pdfFicha = await generarPDFFicha(alumno, pagosData);
    zip.file(`04_Ficha_Inscripcion_${alumno.legajo}.pdf`, pdfFicha);
    
    // Generar y descargar ZIP
    showToast('Comprimiendo archivos...', 'info');
    const contenidoZip = await zip.generateAsync({ type: 'blob' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(contenidoZip);
    link.download = `Documentos_${alumno.legajo}_${alumno.apellido}_${new Date().toISOString().split('T')[0]}.zip`;
    link.click();
    URL.revokeObjectURL(link.href);
    
    showToast('Paquete de documentos generado exitosamente', 'success');
  } catch (error) {
    console.error('Error al generar paquete:', error);
    showToast('Error al generar el paquete de documentos', 'error');
  }
}

// Funciones auxiliares para generar PDFs como blobs (para ZIP)
async function generarPDFConstancia(alumno) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = await agregarHeaderPDF(doc, 'CONSTANCIA', 'Alumno Regular');
  
  const numConstancia = `CAR-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(alumno.id_alumno).padStart(4, '0')}`;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`N° ${numConstancia}`, pageWidth - 20, yPos, { align: 'right' });
  yPos += 20;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);
  const fecha = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  const texto = `Por medio de la presente, se deja constancia que ${alumno.nombre || ''} ${alumno.apellido || ''}, ` +
    `DNI N° ${alumno.dni || 'No registrado'}, identificado/a con el legajo ${alumno.legajo || 'N/A'}, ` +
    `se encuentra inscripto/a como ALUMNO REGULAR en el Centro de Enseñanza Multilingüe Internacional (CEMI).`;
  
  const lineas = doc.splitTextToSize(texto, pageWidth - 50);
  doc.text(lineas, 25, yPos);
  yPos += lineas.length * 7 + 15;
  
  const cursosActivos = alumno.cursos ? alumno.cursos.length : 0;
  if (cursosActivos > 0) {
    doc.text(`Actualmente cursa ${cursosActivos} ${cursosActivos === 1 ? 'programa' : 'programas'} académico${cursosActivos === 1 ? '' : 's'}:`, 25, yPos);
    yPos += 10;
    
    alumno.cursos.forEach(curso => {
      doc.setFillColor(240, 240, 240);
      doc.rect(30, yPos - 4, pageWidth - 60, 8, 'F');
      doc.text(`• ${curso.nombre_curso || 'Curso'} - Nivel ${curso.nivel || curso.id_nivel || 'N/A'}`, 35, yPos);
      yPos += 10;
    });
  }
  
  yPos += 20;
  doc.text(`Se extiende la presente constancia a pedido del interesado para los fines que estime corresponder.`, 25, yPos);
  yPos += 20;
  doc.text(`${alumno.localidad || 'San Miguel de Tucumán'}, ${fecha}`, 25, yPos);
  
  agregarFooterPDF(doc);
  return doc.output('blob');
}

async function generarPDFCalificaciones(alumno) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = await agregarHeaderPDF(doc, 'CERTIFICADO', 'Calificaciones Académicas');
  
  const numCertificado = `CC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(alumno.id_alumno).padStart(4, '0')}`;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`N° ${numCertificado}`, pageWidth - 20, yPos, { align: 'right' });
  yPos += 15;
  
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'FD');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 60, 114);
  doc.text('ALUMNO:', 25, yPos + 8);
  doc.text('LEGAJO:', 25, yPos + 18);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  doc.text(`${alumno.nombre || ''} ${alumno.apellido || ''}`, 50, yPos + 8);
  doc.text(alumno.legajo || 'N/A', 50, yPos + 18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 60, 114);
  doc.text('DNI:', 110, yPos + 8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  doc.text(alumno.dni || 'No registrado', 125, yPos + 8);
  yPos += 35;
  
  if (alumno.calificaciones && alumno.calificaciones.length > 0) {
    doc.setFillColor(30, 60, 114);
    doc.rect(20, yPos, pageWidth - 40, 8, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('Curso', 25, yPos + 6);
    doc.text('Nota 1', 85, yPos + 6);
    doc.text('Nota 2', 105, yPos + 6);
    doc.text('Nota 3', 125, yPos + 6);
    doc.text('Promedio', 150, yPos + 6);
    doc.text('Estado', 175, yPos + 6);
    yPos += 10;
    
    alumno.calificaciones.forEach((cal, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(20, yPos - 2, pageWidth - 40, 8, 'F');
      }
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);
      const nombreCurso = (cal.nombre_curso || 'Curso').length > 28 ? (cal.nombre_curso || 'Curso').substring(0, 25) + '...' : (cal.nombre_curso || 'Curso');
      doc.text(nombreCurso, 25, yPos + 3);
      doc.text(cal.nota1 !== null && cal.nota1 !== undefined ? String(cal.nota1) : '-', 90, yPos + 3, { align: 'center' });
      doc.text(cal.nota2 !== null && cal.nota2 !== undefined ? String(cal.nota2) : '-', 110, yPos + 3, { align: 'center' });
      doc.text(cal.nota3 !== null && cal.nota3 !== undefined ? String(cal.nota3) : '-', 130, yPos + 3, { align: 'center' });
      
      const promedio = cal.promedio || ((cal.nota1 || 0) + (cal.nota2 || 0) + (cal.nota3 || 0)) / 3;
      doc.setFont('helvetica', 'bold');
      doc.text(promedio ? promedio.toFixed(2) : '-', 155, yPos + 3, { align: 'center' });
      
      if (promedio >= 6) {
        doc.setTextColor(16, 185, 129);
        doc.text('Aprobado', 180, yPos + 3, { align: 'center' });
      } else if (promedio > 0) {
        doc.setTextColor(239, 68, 68);
        doc.text('Regular', 180, yPos + 3, { align: 'center' });
      } else {
        doc.setTextColor(150, 150, 150);
        doc.text('Cursando', 180, yPos + 3, { align: 'center' });
      }
      yPos += 8;
    });
  } else {
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('No hay calificaciones registradas para este alumno.', pageWidth / 2, yPos + 10, { align: 'center' });
  }
  
  agregarFooterPDF(doc);
  return doc.output('blob');
}

async function generarPDFEstadoCuenta(alumno, pagosData) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = await agregarHeaderPDF(doc, 'ESTADO DE CUENTA', 'Resumen Financiero');
  
  const numEstado = `EC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(alumno.id_alumno).padStart(5, '0')}`;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`N° ${numEstado}`, pageWidth - 20, yPos, { align: 'right' });
  yPos += 15;
  
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(20, yPos, pageWidth - 40, 20, 3, 3, 'FD');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 60, 114);
  doc.text('ALUMNO:', 25, yPos + 8);
  doc.text('EMAIL:', 25, yPos + 15);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  doc.text(`${alumno.nombre || ''} ${alumno.apellido || ''}`, 50, yPos + 8);
  doc.text(alumno.mail || 'No registrado', 50, yPos + 15);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 60, 114);
  doc.text('LEGAJO:', 130, yPos + 8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  doc.text(alumno.legajo || 'N/A', 155, yPos + 8);
  yPos += 30;
  
  // Usar estadisticas_globales del endpoint
  let totalPagado = 0, totalPendiente = 0, cuotasPagadas = 0, cuotasTotales = 0;
  
  if (pagosData.estadisticas_globales) {
    totalPagado = pagosData.estadisticas_globales.total_pagado || 0;
    totalPendiente = pagosData.estadisticas_globales.total_pendiente || 0;
  }
  
  if (pagosData.cursos) {
    pagosData.cursos.forEach(curso => {
      if (curso.estadisticas) {
        cuotasPagadas += curso.estadisticas.cuotas_pagadas || 0;
        cuotasTotales += (curso.estadisticas.cuotas_pagadas || 0) + 
                        (curso.estadisticas.cuotas_impagas || 0) + 
                        (curso.estadisticas.cuotas_pendientes || 0);
      }
    });
  }
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 60, 114);
  doc.text('RESUMEN GENERAL', 20, yPos);
  yPos += 8;
  
  doc.setFillColor(209, 250, 229);
  doc.setDrawColor(16, 185, 129);
  doc.roundedRect(20, yPos, 55, 28, 3, 3, 'FD');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(5, 150, 105);
  doc.text('TOTAL PAGADO', 47.5, yPos + 8, { align: 'center' });
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`$${totalPagado.toLocaleString('es-AR')}`, 47.5, yPos + 20, { align: 'center' });
  
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(80, yPos, 55, 28, 3, 3, 'FD');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(217, 119, 6);
  doc.text('PENDIENTE', 107.5, yPos + 8, { align: 'center' });
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`$${totalPendiente.toLocaleString('es-AR')}`, 107.5, yPos + 20, { align: 'center' });
  
  doc.setFillColor(239, 246, 255);
  doc.setDrawColor(59, 130, 246);
  doc.roundedRect(140, yPos, 50, 28, 3, 3, 'FD');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(37, 99, 235);
  doc.text('CUOTAS', 165, yPos + 8, { align: 'center' });
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`${cuotasPagadas}/${cuotasTotales}`, 165, yPos + 20, { align: 'center' });
  
  yPos += 40;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text('* Los montos están expresados en pesos argentinos (ARS)', 20, yPos);
  
  agregarFooterPDF(doc);
  return doc.output('blob');
}

async function generarPDFFicha(alumno, pagosData) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = await agregarHeaderPDF(doc, 'FICHA DE INSCRIPCIÓN', 'Datos del Alumno');
  
  const numFicha = `FI-A${String(alumno.id_alumno).padStart(3, '0')}`;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`N° ${numFicha}`, pageWidth - 20, yPos, { align: 'right' });
  yPos += 15;
  
  doc.setFillColor(30, 60, 114);
  doc.rect(20, yPos, pageWidth - 40, 8, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('DATOS PERSONALES', 25, yPos + 6);
  yPos += 14;
  
  const datosPersonales = [
    { label: 'Nombre Completo', value: `${alumno.nombre || ''} ${alumno.apellido || ''}`.trim() || 'No registrado' },
    { label: 'DNI', value: alumno.dni || 'No registrado' },
    { label: 'Legajo', value: alumno.legajo || 'No asignado' },
    { label: 'Email', value: alumno.mail || 'No registrado' },
    { label: 'Teléfono', value: alumno.telefono || 'No registrado' },
    { label: 'Fecha de Registro', value: alumno.fecha_registro ? new Date(alumno.fecha_registro).toLocaleDateString('es-ES') : 'No registrada' },
    { label: 'Estado', value: alumno.estado ? alumno.estado.charAt(0).toUpperCase() + alumno.estado.slice(1) : 'Activo' },
    { label: 'Usuario', value: alumno.usuario || 'No asignado' }
  ];
  
  doc.setFontSize(9);
  let col = 0;
  datosPersonales.forEach((dato) => {
    const xBase = col === 0 ? 25 : 115;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 60, 114);
    doc.text(`${dato.label}:`, xBase, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    const valorTruncado = dato.value.length > 35 ? dato.value.substring(0, 32) + '...' : dato.value;
    doc.text(valorTruncado, xBase + 35, yPos);
    col++;
    if (col === 2) { col = 0; yPos += 8; }
  });
  if (col !== 0) yPos += 8;
  yPos += 12;
  
  doc.setFillColor(30, 60, 114);
  doc.rect(20, yPos, pageWidth - 40, 8, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('CURSOS INSCRIPTOS', 25, yPos + 6);
  yPos += 14;
  
  // Combinar datos: usar alumno.cursos para idioma/nivel, agregar profesor de pagos
  const cursosConProfesor = pagosData.cursos || [];
  const cursosCombinados = (alumno.cursos || []).map(curso => {
    const cursoPago = cursosConProfesor.find(cp => cp.id_curso === curso.id_curso);
    return {
      ...curso,
      profesor: cursoPago?.profesor || 'No asignado'
    };
  });
  
  if (cursosCombinados.length > 0) {
    const cursos = cursosCombinados;
    doc.setFillColor(241, 245, 249);
    doc.rect(20, yPos, pageWidth - 40, 8, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 60, 114);
    doc.text('Curso', 25, yPos + 6);
    doc.text('Idioma', 75, yPos + 6);
    doc.text('Nivel', 110, yPos + 6);
    doc.text('Profesor', 135, yPos + 6);
    yPos += 12;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    
    cursos.forEach((curso, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(20, yPos - 3, pageWidth - 40, 8, 'F');
      }
      const nombreCurso = (curso.nombre_curso || 'Curso').length > 25 ? (curso.nombre_curso || 'Curso').substring(0, 22) + '...' : (curso.nombre_curso || 'Curso');
      doc.text(nombreCurso, 25, yPos + 2);
      doc.text(curso.nombre_idioma || 'N/A', 75, yPos + 2);
      doc.text(curso.nivel || 'N/A', 110, yPos + 2);
      const profesor = (curso.profesor || 'No asignado').length > 20 ? (curso.profesor || 'No asignado').substring(0, 17) + '...' : (curso.profesor || 'No asignado');
      doc.text(profesor, 135, yPos + 2);
      yPos += 8;
    });
  } else {
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('No hay cursos inscriptos actualmente.', pageWidth / 2, yPos, { align: 'center' });
  }
  
  agregarFooterPDF(doc);
  return doc.output('blob');
}

console.log('✅ Sistema de Documentos PDF cargado correctamente');
