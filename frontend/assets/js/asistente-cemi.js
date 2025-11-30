// =====================================================
// ASISTENTE VIRTUAL CEMI - Sistema de Ayuda Inteligente
// =====================================================

const ASISTENTE_CONFIG = {
  nombre: "CEMI Asistente",
  version: "1.0.0",
  bienvenida: "¡Hola! 👋 Soy el asistente virtual de CEMI. Estoy aquí para ayudarte con cualquier consulta sobre nuestro instituto, cursos, inscripciones y más. ¿En qué puedo ayudarte?",
  despedida: "¡Gracias por consultar! Si tenés más dudas, no dudes en escribirme. ¡Éxitos! 🎓",
  noEntiendo: "No encontré información específica sobre eso. ¿Podrías reformular tu pregunta o elegir una de las sugerencias?",
  sugerenciasDefault: [
    "¿Qué cursos ofrecen?",
    "¿Cómo me inscribo?",
    "¿Cuáles son los horarios?",
    "¿Dónde están ubicados?"
  ]
};

// Base de conocimiento del asistente
const BASE_CONOCIMIENTO = [

  // ============================================
  // CATEGORÍA 1: SOBRE CEMI (20 respuestas)
  // ============================================
  {
    id: 1,
    categoria: "sobre_cemi",
    keywords: ["que es cemi", "quienes son", "sobre ustedes", "instituto", "institucion", "centro educativo"],
    pregunta: "¿Qué es CEMI?",
    respuesta: "**CEMI** (Centro Educativo Multilingüe Integral) es una institución educativa dedicada a la enseñanza de idiomas con una trayectoria de excelencia académica. Nos especializamos en formar estudiantes con competencias lingüísticas de alto nivel.",
    acciones: []
  },
  {
    id: 2,
    categoria: "sobre_cemi",
    keywords: ["mision", "objetivo", "proposito", "para que"],
    pregunta: "¿Cuál es la misión de CEMI?",
    respuesta: "Nuestra **misión** es brindar educación de idiomas de calidad, formando estudiantes competentes y preparados para un mundo globalizado, con metodologías innovadoras y docentes altamente capacitados.",
    acciones: []
  },
  {
    id: 3,
    categoria: "sobre_cemi",
    keywords: ["vision", "futuro", "proyeccion"],
    pregunta: "¿Cuál es la visión de CEMI?",
    respuesta: "Nuestra **visión** es ser el instituto de idiomas líder en la región, reconocido por la excelencia académica, innovación educativa y formación integral de nuestros estudiantes.",
    acciones: []
  },
  {
    id: 4,
    categoria: "sobre_cemi",
    keywords: ["valores", "principios", "filosofia"],
    pregunta: "¿Cuáles son los valores de CEMI?",
    respuesta: "Nuestros **valores** fundamentales son:\n\n• **Excelencia académica** - Compromiso con la calidad educativa\n• **Innovación** - Metodologías modernas y tecnología\n• **Respeto** - Ambiente inclusivo y diverso\n• **Compromiso** - Dedicación al éxito del estudiante\n• **Integridad** - Transparencia en todo lo que hacemos",
    acciones: []
  },
  {
    id: 5,
    categoria: "sobre_cemi",
    keywords: ["historia", "cuando fundaron", "años", "trayectoria", "antiguedad"],
    pregunta: "¿Cuál es la historia de CEMI?",
    respuesta: "CEMI fue fundado con el objetivo de ofrecer educación de idiomas de calidad. A lo largo de los años, hemos formado a miles de estudiantes, consolidándonos como una institución de referencia en la enseñanza de lenguas extranjeras.",
    acciones: []
  },
  {
    id: 6,
    categoria: "sobre_cemi",
    keywords: ["diferencia", "diferencial", "por que elegir", "ventaja", "mejor que"],
    pregunta: "¿Qué diferencia a CEMI de otros institutos?",
    respuesta: "Lo que nos diferencia:\n\n✅ **Metodología comunicativa** - Enfoque en la práctica real\n✅ **Grupos reducidos** - Atención personalizada\n✅ **Docentes certificados** - Profesionales de excelencia\n✅ **Tecnología educativa** - Plataforma Classroom moderna\n✅ **Certificaciones internacionales** - Preparación para exámenes oficiales\n✅ **Flexibilidad horaria** - Múltiples turnos disponibles",
    acciones: []
  },
  {
    id: 7,
    categoria: "sobre_cemi",
    keywords: ["metodologia", "como enseñan", "metodo", "forma de enseñar"],
    pregunta: "¿Qué metodología utilizan?",
    respuesta: "Utilizamos el **enfoque comunicativo**, que prioriza:\n\n• Conversación y práctica oral desde el primer día\n• Situaciones reales de comunicación\n• Desarrollo de las 4 habilidades: hablar, escuchar, leer y escribir\n• Uso de tecnología y recursos multimedia\n• Actividades interactivas y dinámicas",
    acciones: []
  },
  {
    id: 8,
    categoria: "sobre_cemi",
    keywords: ["instalaciones", "edificio", "aulas", "infraestructura"],
    pregunta: "¿Cómo son las instalaciones?",
    respuesta: "Contamos con instalaciones modernas:\n\n🏫 Aulas climatizadas y equipadas\n💻 Laboratorio de idiomas con tecnología\n📚 Biblioteca con material de consulta\n☕ Espacios de descanso\n♿ Accesibilidad para personas con movilidad reducida\n📶 WiFi en todo el edificio",
    acciones: [{ texto: "Ver ubicación", link: "#ubicacion" }]
  },
  {
    id: 9,
    categoria: "sobre_cemi",
    keywords: ["cuantos alumnos", "estudiantes", "cantidad"],
    pregunta: "¿Cuántos alumnos tienen?",
    respuesta: "Actualmente contamos con una comunidad activa de estudiantes en diferentes niveles e idiomas. Mantenemos grupos reducidos (máximo 15 alumnos por clase) para garantizar atención personalizada.",
    acciones: []
  },
  {
    id: 10,
    categoria: "sobre_cemi",
    keywords: ["reconocimiento", "premios", "logros", "acreditacion"],
    pregunta: "¿Tienen reconocimientos o acreditaciones?",
    respuesta: "CEMI cuenta con:\n\n🏆 Reconocimiento como centro preparador de exámenes internacionales\n📜 Acreditación académica institucional\n🤝 Convenios con instituciones educativas\n✅ Certificaciones de calidad educativa",
    acciones: []
  },
  {
    id: 11,
    categoria: "sobre_cemi",
    keywords: ["director", "directora", "autoridades", "quien dirige"],
    pregunta: "¿Quién dirige CEMI?",
    respuesta: "CEMI cuenta con un equipo directivo comprometido con la excelencia educativa, conformado por profesionales con amplia experiencia en educación y enseñanza de idiomas.",
    acciones: []
  },
  {
    id: 12,
    categoria: "sobre_cemi",
    keywords: ["trabajan", "empleos", "trabajo", "vacantes", "cv", "curriculum"],
    pregunta: "¿Cómo puedo trabajar en CEMI?",
    respuesta: "Si te interesa formar parte de nuestro equipo docente o administrativo, podés:\n\n📧 Enviar tu CV a: rrhh@cemi.edu.ar\n📝 Especificar el área de interés\n🎓 Adjuntar títulos y certificaciones\n\nEvaluamos perfiles de forma continua.",
    acciones: [{ texto: "Enviar email", link: "mailto:rrhh@cemi.edu.ar" }]
  },
  {
    id: 13,
    categoria: "sobre_cemi",
    keywords: ["seguro", "seguridad", "confiable"],
    pregunta: "¿CEMI es una institución confiable?",
    respuesta: "¡Absolutamente! CEMI es una institución legalmente constituida, con años de trayectoria formando estudiantes exitosos. Contamos con:\n\n✅ Habilitación oficial\n✅ Seguro para estudiantes\n✅ Protocolos de seguridad\n✅ Transparencia institucional",
    acciones: []
  },
  {
    id: 14,
    categoria: "sobre_cemi",
    keywords: ["convenios", "alianzas", "partners", "asociados"],
    pregunta: "¿Tienen convenios con otras instituciones?",
    respuesta: "Sí, CEMI mantiene convenios con:\n\n🎓 Universidades locales e internacionales\n🏢 Empresas para capacitación corporativa\n📚 Organismos de certificación internacional\n🌍 Instituciones de intercambio cultural",
    acciones: []
  },
  {
    id: 15,
    categoria: "sobre_cemi",
    keywords: ["pandemia", "covid", "protocolos sanitarios"],
    pregunta: "¿Qué protocolos de salud tienen?",
    respuesta: "Mantenemos protocolos de higiene y seguridad:\n\n🧴 Dispensadores de alcohol en gel\n🌬️ Ventilación adecuada en aulas\n🧹 Limpieza y desinfección regular\n😷 Respeto por medidas sanitarias vigentes",
    acciones: []
  },
  {
    id: 16,
    categoria: "sobre_cemi",
    keywords: ["redes sociales", "facebook", "instagram", "twitter", "social"],
    pregunta: "¿Tienen redes sociales?",
    respuesta: "¡Sí! Seguinos en nuestras redes:\n\n📘 Facebook: /CEMIidiomas\n📸 Instagram: @cemi_idiomas\n🐦 Twitter: @CEMI_edu\n💼 LinkedIn: CEMI Centro Educativo\n\n¡Enterate de novedades, promociones y eventos!",
    acciones: []
  },
  {
    id: 17,
    categoria: "sobre_cemi",
    keywords: ["opinion", "reseña", "comentarios", "testimonios", "experiencias"],
    pregunta: "¿Qué opinan los alumnos de CEMI?",
    respuesta: "Nuestros estudiantes destacan:\n\n⭐ Excelente calidad de enseñanza\n⭐ Profesores dedicados y pacientes\n⭐ Buen ambiente de estudio\n⭐ Flexibilidad horaria\n⭐ Rápido progreso en el idioma\n\n¡Podés ver testimonios en nuestra web!",
    acciones: []
  },
  {
    id: 18,
    categoria: "sobre_cemi",
    keywords: ["garantia", "satisfaccion", "devolucion"],
    pregunta: "¿Ofrecen alguna garantía?",
    respuesta: "Nos comprometemos con tu satisfacción:\n\n✅ Clase de prueba gratuita\n✅ Seguimiento personalizado de tu progreso\n✅ Posibilidad de cambio de grupo/horario\n✅ Atención a consultas y reclamos",
    acciones: []
  },
  {
    id: 19,
    categoria: "sobre_cemi",
    keywords: ["contacto rapido", "emergencia", "urgente"],
    pregunta: "¿Cómo contacto a CEMI urgentemente?",
    respuesta: "Para consultas urgentes:\n\n📞 Teléfono: (0381) 123-4567\n📱 WhatsApp: +54 9 381 123-4567\n📧 Email: info@cemi.edu.ar\n\n⏰ Horario de atención: Lunes a Viernes 8:00 a 21:00",
    acciones: [{ texto: "Llamar ahora", link: "tel:+5493811234567" }]
  },
  {
    id: 20,
    categoria: "sobre_cemi",
    keywords: ["newsletter", "novedades", "suscribir", "noticias"],
    pregunta: "¿Cómo me entero de las novedades?",
    respuesta: "Mantenete informado:\n\n📧 Suscribite a nuestro newsletter en la web\n📱 Seguinos en redes sociales\n🔔 Activá notificaciones en la plataforma\n📅 Consultá el calendario de eventos",
    acciones: []
  },

  // ============================================
  // CATEGORÍA 2: IDIOMAS DISPONIBLES (25 respuestas)
  // ============================================
  {
    id: 21,
    categoria: "idiomas",
    keywords: ["idiomas", "lenguas", "que enseñan", "cursos idiomas", "ofrecen"],
    pregunta: "¿Qué idiomas enseñan?",
    respuesta: "En CEMI ofrecemos cursos de:\n\n🇬🇧 **Inglés** - Todos los niveles\n🇧🇷 **Portugués** - Brasileño y europeo\n🇫🇷 **Francés** - General y negocios\n🇩🇪 **Alemán** - Certificación Goethe\n🇮🇹 **Italiano** - Cultura y ciudadanía\n🇨🇳 **Chino Mandarín** - HSK\n🇯🇵 **Japonés** - JLPT",
    acciones: [{ texto: "Ver cursos", link: "#cursos" }]
  },
  {
    id: 22,
    categoria: "idiomas",
    keywords: ["ingles", "english", "britanico", "americano"],
    pregunta: "¿Tienen cursos de inglés?",
    respuesta: "¡Sí! Nuestro programa de **Inglés** incluye:\n\n📚 Inglés General (A1 a C2)\n👶 Inglés para Niños (4-12 años)\n🎓 Inglés Adolescentes (13-17 años)\n💼 Inglés de Negocios\n✈️ Inglés para Viajeros\n📝 Preparación IELTS, TOEFL, Cambridge",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar?subject=Consulta curso de Inglés" }]
  },
  {
    id: 23,
    categoria: "idiomas",
    keywords: ["portugues", "brasil", "brasileño", "portugal"],
    pregunta: "¿Tienen cursos de portugués?",
    respuesta: "Ofrecemos **Portugués** en dos variantes:\n\n🇧🇷 **Portugués Brasileño** - El más demandado en la región\n🇵🇹 **Portugués Europeo** - Para emigrar a Portugal\n\n📝 Preparación para CELPE-Bras\n💼 Portugués para negocios",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar?subject=Consulta curso de Portugués" }]
  },
  {
    id: 24,
    categoria: "idiomas",
    keywords: ["frances", "francia", "french"],
    pregunta: "¿Tienen cursos de francés?",
    respuesta: "Nuestro programa de **Francés** ofrece:\n\n📚 Francés General (A1 a C1)\n🎓 Preparación DELF/DALF\n💼 Francés de Negocios\n🇨🇦 Francés para Canadá (Quebec)\n🎨 Cultura francófona",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar?subject=Consulta curso de Francés" }]
  },
  {
    id: 25,
    categoria: "idiomas",
    keywords: ["aleman", "alemania", "german", "deutsch"],
    pregunta: "¿Tienen cursos de alemán?",
    respuesta: "Ofrecemos **Alemán** con:\n\n📚 Alemán General (A1 a C1)\n🎓 Preparación Goethe-Zertifikat\n💼 Alemán para trabajo en Alemania/Austria/Suiza\n📝 Certificaciones oficiales",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar?subject=Consulta curso de Alemán" }]
  },
  {
    id: 26,
    categoria: "idiomas",
    keywords: ["italiano", "italia", "italian"],
    pregunta: "¿Tienen cursos de italiano?",
    respuesta: "Nuestro programa de **Italiano** incluye:\n\n📚 Italiano General (A1 a B2)\n🎓 Preparación CILS/CELI\n🇮🇹 Italiano para ciudadanía\n🎨 Cultura y arte italiano",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar?subject=Consulta curso de Italiano" }]
  },
  {
    id: 27,
    categoria: "idiomas",
    keywords: ["chino", "mandarin", "china", "chinese"],
    pregunta: "¿Tienen cursos de chino?",
    respuesta: "Ofrecemos **Chino Mandarín**:\n\n📚 Niveles HSK 1 a HSK 4\n✍️ Caracteres simplificados\n🗣️ Pronunciación y tonos\n💼 Chino para negocios",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar?subject=Consulta curso de Chino" }]
  },
  {
    id: 28,
    categoria: "idiomas",
    keywords: ["japones", "japon", "japanese", "nihongo"],
    pregunta: "¿Tienen cursos de japonés?",
    respuesta: "Nuestro programa de **Japonés** ofrece:\n\n📚 Niveles JLPT N5 a N3\n✍️ Hiragana, Katakana y Kanji\n🎌 Cultura japonesa\n🎮 Japonés para anime/manga",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar?subject=Consulta curso de Japonés" }]
  },
  {
    id: 29,
    categoria: "idiomas",
    keywords: ["coreano", "corea", "korean", "kpop"],
    pregunta: "¿Tienen cursos de coreano?",
    respuesta: "Ofrecemos **Coreano**:\n\n📚 Niveles TOPIK I y II\n✍️ Alfabeto Hangul\n🎵 Cultura K-pop y K-drama\n💼 Coreano básico y conversacional",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar?subject=Consulta curso de Coreano" }]
  },
  {
    id: 30,
    categoria: "idiomas",
    keywords: ["ruso", "rusia", "russian"],
    pregunta: "¿Tienen cursos de ruso?",
    respuesta: "Sí, ofrecemos **Ruso** en niveles iniciales:\n\n📚 Alfabeto cirílico\n🗣️ Conversación básica\n📖 Lectura y escritura\n\n*Consultá disponibilidad de grupos*",
    acciones: [{ texto: "Consultar por WhatsApp", link: "https://wa.me/5493811234567" }]
  },
  {
    id: 31,
    categoria: "idiomas",
    keywords: ["arabe", "arabia", "arabic"],
    pregunta: "¿Tienen cursos de árabe?",
    respuesta: "Ofrecemos **Árabe** en modalidad especial:\n\n📚 Árabe Moderno Estándar\n✍️ Escritura y caligrafía\n🗣️ Conversación básica\n\n*Consultá inicio de grupos*",
    acciones: [{ texto: "Consultar por WhatsApp", link: "https://wa.me/5493811234567" }]
  },
  {
    id: 32,
    categoria: "idiomas",
    keywords: ["que idioma estudiar", "cual me recomiendan", "mejor idioma", "idioma facil"],
    pregunta: "¿Qué idioma me recomiendan estudiar?",
    respuesta: "Depende de tus objetivos:\n\n💼 **Trabajo internacional**: Inglés, Alemán\n✈️ **Viajar por Sudamérica**: Portugués\n🇪🇺 **Emigrar a Europa**: Italiano, Francés, Alemán\n📈 **Negocios con Asia**: Chino Mandarín\n🎌 **Cultura pop**: Japonés, Coreano\n\n¿Querés asesoramiento personalizado?",
    acciones: [{ texto: "Consultar por WhatsApp", link: "https://wa.me/5493811234567" }]
  },
  {
    id: 33,
    categoria: "idiomas",
    keywords: ["dos idiomas", "varios idiomas", "simultaneo", "a la vez"],
    pregunta: "¿Puedo estudiar dos idiomas a la vez?",
    respuesta: "¡Sí, es posible! Recomendaciones:\n\n✅ Que uno esté más avanzado que otro\n✅ Elegir idiomas de familias diferentes\n✅ Organizar bien los horarios\n⚠️ Requiere mayor dedicación\n\nConsultá con nuestro equipo para armar tu plan.",
    acciones: []
  },
  {
    id: 34,
    categoria: "idiomas",
    keywords: ["idioma dificil", "mas dificil", "complicado"],
    pregunta: "¿Cuál es el idioma más difícil?",
    respuesta: "La dificultad depende de tu idioma nativo. Para hispanohablantes:\n\n🟢 **Más fáciles**: Portugués, Italiano, Francés\n🟡 **Intermedio**: Inglés, Alemán\n🔴 **Más desafiantes**: Chino, Japonés, Árabe\n\n¡Pero con dedicación, todos son alcanzables!",
    acciones: []
  },
  {
    id: 35,
    categoria: "idiomas",
    keywords: ["idioma rapido", "aprender rapido", "intensivo", "cuanto tiempo"],
    pregunta: "¿En cuánto tiempo aprendo un idioma?",
    respuesta: "Tiempos estimados para nivel intermedio (B1):\n\n⏱️ **Portugués/Italiano**: 6-8 meses\n⏱️ **Inglés/Francés**: 8-12 meses\n⏱️ **Alemán**: 12-18 meses\n⏱️ **Chino/Japonés**: 18-24 meses\n\n*Con cursado regular y práctica constante*",
    acciones: []
  },
  {
    id: 36,
    categoria: "idiomas",
    keywords: ["nativo", "profesor nativo", "native speaker"],
    pregunta: "¿Tienen profesores nativos?",
    respuesta: "Contamos con:\n\n👨‍🏫 Profesores nativos certificados\n👩‍🏫 Docentes bilingües con experiencia\n🎓 Todos con formación pedagógica\n📜 Certificaciones internacionales\n\nEl equipo se asigna según el nivel y curso.",
    acciones: []
  },
  {
    id: 37,
    categoria: "idiomas",
    keywords: ["online", "virtual", "distancia", "remoto"],
    pregunta: "¿Tienen cursos online de idiomas?",
    respuesta: "Sí, ofrecemos modalidad **online** para varios idiomas:\n\n💻 Clases en vivo por videollamada\n📚 Acceso a plataforma Classroom\n📖 Material digital incluido\n🕐 Flexibilidad horaria\n\n*Consultá disponibilidad para cada idioma*",
    acciones: [{ texto: "Consultar por WhatsApp", link: "https://wa.me/5493811234567?text=Hola!%20Consulta%20sobre%20cursos%20online" }]
  },
  {
    id: 38,
    categoria: "idiomas",
    keywords: ["presencial", "cara a cara", "en persona"],
    pregunta: "¿Las clases son presenciales?",
    respuesta: "Ofrecemos ambas modalidades:\n\n🏫 **Presencial**: En nuestra sede\n💻 **Online**: Clases en vivo virtuales\n🔄 **Híbrido**: Combinación de ambas\n\nPodés elegir la que mejor se adapte a vos.",
    acciones: []
  },
  {
    id: 39,
    categoria: "idiomas",
    keywords: ["lengua de señas", "señas", "lsn", "sordo"],
    pregunta: "¿Enseñan Lengua de Señas?",
    respuesta: "Actualmente no contamos con cursos de Lengua de Señas Argentina (LSA). Sin embargo, estamos evaluando incorporarlo.\n\n📧 Si te interesa, dejanos tu contacto para avisarte cuando abramos inscripción.",
    acciones: [{ texto: "Dejar contacto", link: "mailto:info@cemi.edu.ar?subject=Interés en Lengua de Señas" }]
  },
  {
    id: 40,
    categoria: "idiomas",
    keywords: ["latin", "griego", "clasico", "antiguo"],
    pregunta: "¿Enseñan latín o griego?",
    respuesta: "Actualmente no ofrecemos latín ni griego antiguo como cursos regulares. Nos especializamos en idiomas modernos.\n\n*Ocasionalmente ofrecemos talleres especiales de introducción.*",
    acciones: []
  },
  {
    id: 41,
    categoria: "idiomas",
    keywords: ["español", "castellano", "extranjeros", "spanish"],
    pregunta: "¿Enseñan español para extranjeros?",
    respuesta: "¡Sí! Ofrecemos **Español como Lengua Extranjera (ELE)**:\n\n📚 Todos los niveles (A1-C2)\n🎓 Preparación DELE/SIELE\n💼 Español para negocios\n🌎 Español latinoamericano",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar?subject=Consulta curso de Español" }]
  },
  {
    id: 42,
    categoria: "idiomas",
    keywords: ["hebreo", "israel", "hebrew"],
    pregunta: "¿Tienen cursos de hebreo?",
    respuesta: "Ofrecemos **Hebreo moderno** bajo demanda:\n\n📚 Nivel inicial\n✍️ Alfabeto hebreo\n🗣️ Conversación básica\n\n*Consultá formación de grupos*",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar?subject=Consulta curso de Hebreo" }]
  },
  {
    id: 43,
    categoria: "idiomas",
    keywords: ["hindu", "hindi", "india"],
    pregunta: "¿Tienen cursos de hindi?",
    respuesta: "Actualmente no ofrecemos Hindi como curso regular. Nos enfocamos en los idiomas de mayor demanda.\n\n📧 Si hay suficiente interés, podemos abrir un grupo.",
    acciones: [{ texto: "Expresar interés", link: "mailto:info@cemi.edu.ar?subject=Interés en curso de Hindi" }]
  },
  {
    id: 44,
    categoria: "idiomas",
    keywords: ["turco", "turquia", "turkish"],
    pregunta: "¿Tienen cursos de turco?",
    respuesta: "Actualmente no ofrecemos Turco en nuestro programa regular.\n\n📧 Dejanos tu contacto si te interesa para considerar la apertura de un curso.",
    acciones: [{ texto: "Expresar interés", link: "mailto:info@cemi.edu.ar?subject=Interés en curso de Turco" }]
  },
  {
    id: 45,
    categoria: "idiomas",
    keywords: ["polaco", "polonia", "polish"],
    pregunta: "¿Tienen cursos de polaco?",
    respuesta: "No contamos con Polaco actualmente. Nuestros cursos se centran en los idiomas de mayor demanda.\n\n📧 Si te interesa, podés dejarnos tu contacto.",
    acciones: [{ texto: "Expresar interés", link: "mailto:info@cemi.edu.ar?subject=Interés en curso de Polaco" }]
  },

  // ============================================
  // CATEGORÍA 3: CURSOS Y NIVELES (20 respuestas)
  // ============================================
  {
    id: 46,
    categoria: "cursos",
    keywords: ["tipos de cursos", "cursos disponibles", "que cursos", "opciones"],
    pregunta: "¿Qué tipos de cursos tienen?",
    respuesta: "Ofrecemos diferentes modalidades:\n\n👥 **Grupales**: 8-15 alumnos\n👤 **Individuales**: Clases particulares\n💼 **Empresas**: In-company\n🚀 **Intensivos**: Aprendizaje acelerado\n📅 **Extensivos**: Ritmo regular\n👶 **Niños**: 4-12 años\n🎓 **Adolescentes**: 13-17 años\n👨‍🎓 **Adultos**: +18 años",
    acciones: [{ texto: "Ver cursos", link: "#cursos" }]
  },
  {
    id: 47,
    categoria: "cursos",
    keywords: ["niveles", "a1", "b1", "c1", "basico", "intermedio", "avanzado"],
    pregunta: "¿Qué niveles manejan?",
    respuesta: "Seguimos el **Marco Común Europeo (MCER)**:\n\n🟢 **A1-A2**: Nivel básico\n🟡 **B1-B2**: Nivel intermedio\n🔴 **C1-C2**: Nivel avanzado\n\n📝 Realizamos test de nivelación gratuito para ubicarte correctamente.",
    acciones: [{ texto: "Solicitar test", link: "https://wa.me/5493811234567?text=Hola!%20Quiero%20hacer%20el%20test%20de%20nivel" }]
  },
  {
    id: 48,
    categoria: "cursos",
    keywords: ["duracion", "cuanto dura", "tiempo", "largo"],
    pregunta: "¿Cuánto dura cada nivel?",
    respuesta: "Duración aproximada por nivel:\n\n📅 **Curso extensivo**: 4-5 meses por nivel\n⚡ **Curso intensivo**: 2-3 meses por nivel\n\n*2-3 clases semanales de 1.5 horas cada una*",
    acciones: []
  },
  {
    id: 49,
    categoria: "cursos",
    keywords: ["certificado", "titulo", "diploma", "certificacion"],
    pregunta: "¿Entregan certificado al finalizar?",
    respuesta: "¡Sí! Al completar cada nivel recibirás:\n\n📜 **Certificado CEMI** de aprobación\n📊 Detalle de nivel alcanzado (MCER)\n📈 Registro de calificaciones\n\nAdemás, preparamos para certificaciones internacionales oficiales.",
    acciones: []
  },
  {
    id: 50,
    categoria: "cursos",
    keywords: ["grupal", "grupo", "compañeros", "cuantos alumnos"],
    pregunta: "¿Cuántos alumnos hay por grupo?",
    respuesta: "Mantenemos **grupos reducidos**:\n\n👥 Mínimo: 5 alumnos\n👥 Máximo: 15 alumnos\n⭐ Ideal: 8-12 alumnos\n\nEsto garantiza atención personalizada y práctica oral para todos.",
    acciones: []
  },
  {
    id: 51,
    categoria: "cursos",
    keywords: ["individual", "particular", "privado", "uno a uno"],
    pregunta: "¿Ofrecen clases individuales?",
    respuesta: "¡Sí! Las **clases individuales** ofrecen:\n\n✅ Horarios 100% flexibles\n✅ Ritmo personalizado\n✅ Contenido adaptado a tus necesidades\n✅ Mayor práctica oral\n💰 Costo diferenciado\n\n*Ideales para objetivos específicos*",
    acciones: [{ texto: "Consultar precios", link: "https://wa.me/5493811234567?text=Hola!%20Consulta%20sobre%20clases%20individuales" }]
  },
  {
    id: 52,
    categoria: "cursos",
    keywords: ["intensivo", "rapido", "acelerar", "pocas semanas"],
    pregunta: "¿Tienen cursos intensivos?",
    respuesta: "Sí, ofrecemos **cursos intensivos**:\n\n⚡ 4-5 clases por semana\n⏱️ 2-3 horas diarias\n📅 Duración: 2-3 meses por nivel\n🎯 Ideal para viajes o trabajo próximo\n\n*Requiere mayor dedicación y disponibilidad*",
    acciones: [{ texto: "Consultar fechas", link: "https://wa.me/5493811234567?text=Hola!%20Consulta%20sobre%20cursos%20intensivos" }]
  },
  {
    id: 53,
    categoria: "cursos",
    keywords: ["extensivo", "regular", "normal", "tranquilo"],
    pregunta: "¿Qué es un curso extensivo?",
    respuesta: "El **curso extensivo** es nuestra modalidad regular:\n\n📅 2-3 clases por semana\n⏱️ 1.5 horas por clase\n📆 Duración: 4-5 meses por nivel\n✅ Permite compatibilizar con trabajo/estudio\n\n*Ideal para ritmo sostenido*",
    acciones: []
  },
  {
    id: 54,
    categoria: "cursos",
    keywords: ["niños", "nenes", "chicos", "infantil", "kids"],
    pregunta: "¿Tienen cursos para niños?",
    respuesta: "¡Sí! Cursos para **niños de 4 a 12 años**:\n\n🎮 Metodología lúdica y dinámica\n🎨 Juegos, canciones y actividades\n📚 Material didáctico especial\n👨‍👩‍👧 Comunicación con padres\n📊 Seguimiento del progreso\n\n*Grupos reducidos por edad*",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar?subject=Consulta cursos para niños" }]
  },
  {
    id: 55,
    categoria: "cursos",
    keywords: ["adolescentes", "teens", "jovenes", "secundario"],
    pregunta: "¿Tienen cursos para adolescentes?",
    respuesta: "Cursos para **adolescentes (13-17 años)**:\n\n📱 Temáticas actuales y relevantes\n🎯 Preparación para exámenes internacionales\n💬 Enfoque comunicativo\n🎮 Recursos multimedia\n📅 Horarios compatibles con el colegio",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar?subject=Consulta cursos para adolescentes" }]
  },
  {
    id: 56,
    categoria: "cursos",
    keywords: ["adultos", "mayores", "grande", "tercera edad"],
    pregunta: "¿Hay límite de edad para estudiar?",
    respuesta: "¡No hay límite de edad! Tenemos alumnos desde 4 años hasta adultos mayores.\n\n👴 Grupos especiales para adultos mayores\n🐢 Ritmo adaptado\n☕ Ambiente amigable\n🧠 Ejercicio mental saludable\n\n*Nunca es tarde para aprender*",
    acciones: []
  },
  {
    id: 57,
    categoria: "cursos",
    keywords: ["empresas", "corporativo", "in company", "trabajo"],
    pregunta: "¿Ofrecen cursos para empresas?",
    respuesta: "Sí, ofrecemos **capacitación corporativa**:\n\n🏢 Cursos in-company en tu empresa\n📋 Programas a medida\n📊 Evaluación de personal\n💼 Idioma para negocios\n📜 Informes de progreso\n💰 Presupuestos especiales",
    acciones: [{ texto: "Solicitar presupuesto", link: "mailto:info@cemi.edu.ar?subject=Consulta cursos para empresas" }]
  },
  {
    id: 58,
    categoria: "cursos",
    keywords: ["verano", "vacaciones", "enero", "febrero"],
    pregunta: "¿Tienen cursos de verano?",
    respuesta: "¡Sí! En verano ofrecemos:\n\n☀️ **Intensivos de verano**: Enero-Febrero\n🏖️ Ideal para aprovechar las vacaciones\n⚡ Avanzar un nivel rápidamente\n👶 Opciones para niños y adultos\n\n*Inscripción en noviembre-diciembre*",
    acciones: []
  },
  {
    id: 59,
    categoria: "cursos",
    keywords: ["sabado", "finde", "fin de semana", "domingo"],
    pregunta: "¿Tienen cursos los fines de semana?",
    respuesta: "Ofrecemos cursos los **sábados**:\n\n📅 Turno mañana: 9:00 a 12:00\n📅 Turno tarde: 14:00 a 17:00\n\n*Ideal para quienes trabajan en la semana*\n\n⚠️ Los domingos permanecemos cerrados.",
    acciones: []
  },
  {
    id: 60,
    categoria: "cursos",
    keywords: ["conversacion", "hablar", "speaking", "oral"],
    pregunta: "¿Tienen cursos solo de conversación?",
    respuesta: "Sí, ofrecemos **talleres de conversación**:\n\n🗣️ 100% práctica oral\n☕ Ambiente relajado\n📰 Temas de actualidad\n🎭 Role-playing y debates\n\n*Requisito: Nivel A2 mínimo*",
    acciones: [{ texto: "Consultar", link: "https://wa.me/5493811234567?text=Hola!%20Consulta%20sobre%20talleres%20de%20conversaci%C3%B3n" }]
  },
  {
    id: 61,
    categoria: "cursos",
    keywords: ["examen", "preparacion examen", "cambridge", "ielts", "toefl"],
    pregunta: "¿Preparan para exámenes internacionales?",
    respuesta: "¡Sí! Somos centro preparador para:\n\n🇬🇧 **Cambridge**: KET, PET, FCE, CAE, CPE\n📝 **IELTS**: Academic y General\n🇺🇸 **TOEFL**: iBT\n🇫🇷 **DELF/DALF**: Francés\n🇩🇪 **Goethe**: Alemán\n🇮🇹 **CILS**: Italiano\n🇧🇷 **CELPE-Bras**: Portugués",
    acciones: [{ texto: "Consultar exámenes", link: "mailto:info@cemi.edu.ar?subject=Consulta preparación exámenes internacionales" }]
  },
  {
    id: 62,
    categoria: "cursos",
    keywords: ["material", "libro", "libros", "recursos"],
    pregunta: "¿Qué material utilizan?",
    respuesta: "Utilizamos:\n\n📚 Libros de editoriales reconocidas (Cambridge, Pearson, etc.)\n💻 Material digital en plataforma Classroom\n🎧 Audios y videos\n📝 Ejercicios interactivos\n📖 Material complementario propio\n\n*El costo del libro puede estar incluido o no según el curso*",
    acciones: []
  },
  {
    id: 63,
    categoria: "cursos",
    keywords: ["empezar", "cuando empiezo", "inicio", "comienzo"],
    pregunta: "¿Cuándo puedo empezar?",
    respuesta: "Tenemos **ingresos flexibles**:\n\n📅 Inicio de cuatrimestre: Marzo y Agosto\n🔄 Ingreso permanente en grupos con cupo\n✨ Cursos intensivos: Todo el año\n👤 Clases individuales: Cuando quieras\n\n*Consultá disponibilidad actual*",
    acciones: [{ texto: "Consultar inicio", link: "https://wa.me/5493811234567?text=Hola!%20Quiero%20saber%20cuando%20puedo%20empezar" }]
  },
  {
    id: 64,
    categoria: "cursos",
    keywords: ["prueba", "gratis", "demo", "probar"],
    pregunta: "¿Puedo hacer una clase de prueba?",
    respuesta: "¡Sí! Ofrecemos:\n\n🆓 **Clase de prueba gratuita**\n📋 Test de nivelación sin costo\n🤝 Entrevista con coordinación\n\nAsí podés conocer nuestra metodología antes de inscribirte.",
    acciones: [{ texto: "Solicitar clase prueba", link: "https://wa.me/5493811234567?text=Hola!%20Quiero%20solicitar%20una%20clase%20de%20prueba" }]
  },
  {
    id: 65,
    categoria: "cursos",
    keywords: ["cambiar nivel", "subir nivel", "bajar nivel", "reubicacion"],
    pregunta: "¿Puedo cambiar de nivel si no me corresponde?",
    respuesta: "¡Por supuesto! Si sentís que:\n\n⬆️ El nivel es muy fácil\n⬇️ El nivel es muy difícil\n\n✅ Podés solicitar reubicación\n✅ Se evalúa con el docente y coordinación\n✅ Sin costo adicional",
    acciones: []
  },

// ============================================
  // CATEGORÍA 4: INSCRIPCIONES (18 respuestas)
  // ============================================
  {
    id: 66,
    categoria: "inscripciones",
    keywords: ["inscribir", "inscripcion", "anotarme", "registrarme", "como me anoto"],
    pregunta: "¿Cómo me inscribo?",
    respuesta: "Para inscribirte seguí estos pasos:\n\n1️⃣ Completá el formulario online o vení a secretaría\n2️⃣ Realizá el test de nivelación (gratis)\n3️⃣ Elegí el horario que te convenga\n4️⃣ Aboná la matrícula y primera cuota\n5️⃣ ¡Listo! Ya sos alumno CEMI\n\n📋 Requisitos: DNI y datos de contacto",
    acciones: [{ texto: "Inscribirme ahora", link: "/register.html" }]
  },
  {
    id: 67,
    categoria: "inscripciones",
    keywords: ["requisitos", "que necesito", "documentos", "papeles"],
    pregunta: "¿Qué necesito para inscribirme?",
    respuesta: "Documentación requerida:\n\n📄 **Mayores de 18**: DNI\n📄 **Menores**: DNI + DNI del tutor\n📧 Email válido\n📱 Teléfono de contacto\n\n*No se requiere documentación adicional para inscripción*",
    acciones: []
  },
  {
    id: 68,
    categoria: "inscripciones",
    keywords: ["online", "internet", "web", "formulario"],
    pregunta: "¿Puedo inscribirme online?",
    respuesta: "¡Sí! Podés inscribirte 100% online:\n\n💻 Completá el formulario en la web\n📧 Recibirás confirmación por email\n💳 Pagá online o en secretaría\n📱 Acceso inmediato a la plataforma\n\n*También podés venir presencialmente*",
    acciones: [{ texto: "Inscripción online", link: "/register.html" }]
  },
  {
    id: 69,
    categoria: "inscripciones",
    keywords: ["cuando inscribirme", "fechas inscripcion", "periodo", "hasta cuando"],
    pregunta: "¿Cuándo puedo inscribirme?",
    respuesta: "La inscripción está abierta:\n\n📅 **Todo el año** para cursos con cupo\n📆 **Noviembre-Febrero**: Ciclo anual\n📆 **Julio**: Segundo cuatrimestre\n\n⚠️ Cupos limitados - ¡Inscribite con tiempo!",
    acciones: []
  },
  {
    id: 70,
    categoria: "inscripciones",
    keywords: ["matricula", "inscripcion costo", "costo inscripcion"],
    pregunta: "¿La inscripción tiene costo?",
    respuesta: "Sí, hay una **matrícula anual** que incluye:\n\n📋 Inscripción administrativa\n📊 Test de nivelación\n💻 Acceso a plataforma Classroom\n📧 Cuenta institucional\n\n*Consultá el monto actual en secretaría*",
    acciones: [{ texto: "Consultar precios", link: "https://wa.me/5493811234567?text=Hola!%20Quisiera%20consultar%20los%20aranceles" }]
  },
  {
    id: 71,
    categoria: "inscripciones",
    keywords: ["cupo", "lugar", "vacante", "hay lugar"],
    pregunta: "¿Hay cupo disponible?",
    respuesta: "Los cupos varían según:\n\n📚 Idioma y nivel\n🕐 Horario elegido\n📅 Época del año\n\n✅ Consultá disponibilidad actual en secretaría o por WhatsApp.\n⚠️ Reservamos tu lugar con el pago de matrícula.",
    acciones: [{ texto: "Consultar cupo", link: "https://wa.me/5493811234567?text=Hola!%20Quiero%20consultar%20disponibilidad%20de%20cupos" }]
  },
  {
    id: 72,
    categoria: "inscripciones",
    keywords: ["lista espera", "esperar", "no hay cupo", "lleno"],
    pregunta: "¿Qué pasa si no hay cupo?",
    respuesta: "Si no hay cupo en el horario deseado:\n\n📋 Te anotamos en **lista de espera**\n📞 Te contactamos apenas haya lugar\n🔄 Te ofrecemos horarios alternativos\n➕ Abrimos grupos nuevos si hay demanda",
    acciones: []
  },
  {
    id: 73,
    categoria: "inscripciones",
    keywords: ["menor", "hijo", "niño inscripcion", "papa", "mama", "tutor"],
    pregunta: "¿Cómo inscribo a mi hijo?",
    respuesta: "Para inscribir a un **menor de edad**:\n\n👶 Traé el DNI del niño/a\n👨‍👩‍👧 DNI del padre/madre/tutor\n📝 Completá la ficha de inscripción\n📞 Dejá datos de contacto de emergencia\n\n*El tutor firma la autorización*",
    acciones: [{ texto: "Inscribir menor", link: "/register.html" }]
  },
  {
    id: 74,
    categoria: "inscripciones",
    keywords: ["nivelacion", "test nivel", "evaluar nivel", "que nivel soy"],
    pregunta: "¿Cómo sé qué nivel me corresponde?",
    respuesta: "Realizamos un **test de nivelación gratuito**:\n\n📝 Evaluación escrita (30 min)\n🗣️ Entrevista oral breve\n📊 Resultado inmediato\n✅ Te ubicamos en el nivel correcto\n\n*Si nunca estudiaste, empezás en A1*",
    acciones: [{ texto: "Solicitar test", link: "https://wa.me/5493811234567?text=Hola!%20Quiero%20hacer%20el%20test%20de%20nivel" }]
  },
  {
    id: 75,
    categoria: "inscripciones",
    keywords: ["reinscripcion", "renovar", "siguiente nivel", "continuar"],
    pregunta: "¿Cómo me reinscribo para el siguiente nivel?",
    respuesta: "Para continuar al siguiente nivel:\n\n✅ Aprobar el nivel actual\n📋 Completar ficha de reinscripción\n💰 Abonar nueva cuota\n🎁 **Beneficio**: Sin pagar matrícula nuevamente\n\n*Tenés prioridad sobre nuevos inscriptos*",
    acciones: []
  },
  {
    id: 76,
    categoria: "inscripciones",
    keywords: ["baja", "dejar", "abandonar", "darme de baja", "cancelar inscripcion"],
    pregunta: "¿Cómo me doy de baja?",
    respuesta: "Para darte de baja:\n\n📝 Completá el formulario de baja\n📅 Avisá con 15 días de anticipación\n💰 No hay reembolso de cuotas pagadas\n📋 Se guarda tu historial académico\n\n*Podés reincorporarte cuando quieras*",
    acciones: [{ texto: "Solicitar baja", link: "mailto:info@cemi.edu.ar?subject=Solicitud de baja" }]
  },
  {
    id: 77,
    categoria: "inscripciones",
    keywords: ["reserva", "guardar lugar", "asegurar"],
    pregunta: "¿Puedo reservar mi lugar?",
    respuesta: "Sí, podés **reservar tu lugar**:\n\n💳 Con el pago de la matrícula\n📅 Se mantiene por 30 días\n✅ Confirmás al pagar primera cuota\n\n⚠️ Sin pago, no garantizamos el cupo.",
    acciones: []
  },
  {
    id: 78,
    categoria: "inscripciones",
    keywords: ["grupo", "amigos", "juntos", "mismo grupo"],
    pregunta: "¿Puedo inscribirme con amigos en el mismo grupo?",
    respuesta: "¡Sí! Podés solicitar estar en el mismo grupo:\n\n👥 Deben tener el mismo nivel\n🕐 Deben coincidir en horario\n📋 Indicalo al momento de inscripción\n\n*Sujeto a disponibilidad de cupos*",
    acciones: []
  },
  {
    id: 79,
    categoria: "inscripciones",
    keywords: ["transferir", "ceder", "pasar inscripcion"],
    pregunta: "¿Puedo transferir mi inscripción a otra persona?",
    respuesta: "La inscripción es **personal e intransferible**.\n\n❌ No se puede ceder a terceros\n✅ Podés solicitar baja y la otra persona inscribirse\n\n*Consultá opciones en secretaría*",
    acciones: []
  },
  {
    id: 80,
    categoria: "inscripciones",
    keywords: ["reincorporar", "volver", "retomar", "hace tiempo"],
    pregunta: "Dejé de estudiar hace tiempo, ¿puedo volver?",
    respuesta: "¡Por supuesto! Para reincorporarte:\n\n📝 Realizá un nuevo test de nivelación\n📋 Actualizamos tu ficha\n💰 Abonás matrícula y cuota\n🔄 Retomás desde tu nivel actual\n\n*¡Nunca es tarde para volver!*",
    acciones: [{ texto: "Reincorporarme", link: "https://wa.me/5493811234567?text=Hola!%20Quiero%20reincorporarme%20a%20CEMI" }]
  },
  {
    id: 81,
    categoria: "inscripciones",
    keywords: ["cambiar idioma", "otro idioma", "pasar a otro"],
    pregunta: "¿Puedo cambiar a otro idioma?",
    respuesta: "Sí, podés cambiar de idioma:\n\n📋 Avisá en secretaría\n📝 Hacé test de nivel del nuevo idioma\n🔄 Te reubicamos en un grupo\n\n*Sujeto a disponibilidad de cupos*",
    acciones: []
  },
  {
    id: 82,
    categoria: "inscripciones",
    keywords: ["segundo idioma", "agregar idioma", "otro idioma mas"],
    pregunta: "¿Puedo agregar un segundo idioma?",
    respuesta: "¡Claro! Podés estudiar más de un idioma:\n\n📚 Inscribite en ambos cursos\n🕐 Elegí horarios compatibles\n💰 Abonás cada curso por separado\n🎁 **Descuento** por segundo idioma (consultá)\n\n*Recomendamos no más de 2 simultáneos*",
    acciones: []
  },
  {
    id: 83,
    categoria: "inscripciones",
    keywords: ["extranjero", "no argentino", "otro pais", "turista"],
    pregunta: "¿Pueden inscribirse extranjeros?",
    respuesta: "¡Sí! Aceptamos estudiantes de cualquier nacionalidad:\n\n🌍 Pasaporte o documento de identidad\n📧 Email válido\n📱 Teléfono de contacto\n\n*Sin requisitos migratorios especiales*",
    acciones: []
  },

  // ============================================
  // CATEGORÍA 5: PAGOS Y ARANCELES (18 respuestas)
  // ============================================
  {
    id: 84,
    categoria: "pagos",
    keywords: ["cuanto cuesta", "precio", "valor", "costo", "aranceles"],
    pregunta: "¿Cuánto cuestan los cursos?",
    respuesta: "Los aranceles varían según:\n\n📚 Tipo de curso (grupal/individual)\n🕐 Cantidad de horas semanales\n🌐 Idioma elegido\n\n💰 **Cuota mensual grupal**: Desde $XX.XXX\n💰 **Clase individual**: Desde $XX.XXX/hora\n\n*Consultá valores actualizados*",
    acciones: [{ texto: "Consultar precios", link: "https://wa.me/5493811234567?text=Hola!%20Quisiera%20consultar%20los%20aranceles" }]
  },
  {
    id: 85,
    categoria: "pagos",
    keywords: ["pagar", "como pago", "formas de pago", "medios de pago", "abonar"],
    pregunta: "¿Cómo puedo pagar?",
    respuesta: "Aceptamos múltiples medios de pago:\n\n💳 **Tarjeta de crédito/débito**\n📱 **MercadoPago** (desde la plataforma)\n🏦 **Transferencia bancaria**\n💵 **Efectivo** en secretaría\n📲 **QR** de MercadoPago\n\n*Pagá desde tu casa o presencialmente*",
    acciones: [{ texto: "Pagar ahora", link: "/dashboard_alumno.html#pagos" }]
  },
  {
    id: 86,
    categoria: "pagos",
    keywords: ["mercadopago", "mp", "mercado pago"],
    pregunta: "¿Puedo pagar con MercadoPago?",
    respuesta: "¡Sí! MercadoPago es uno de nuestros métodos principales:\n\n✅ Desde tu dashboard de alumno\n✅ Con tarjeta o dinero en cuenta\n✅ Comprobante automático\n✅ Cuotas sin interés (según promo)\n\n*Link de pago también disponible por WhatsApp*",
    acciones: []
  },
  {
    id: 87,
    categoria: "pagos",
    keywords: ["tarjeta", "credito", "debito", "visa", "mastercard"],
    pregunta: "¿Aceptan tarjeta de crédito?",
    respuesta: "Sí, aceptamos tarjetas:\n\n💳 Visa, Mastercard, American Express\n💳 Tarjetas de débito\n📱 A través de MercadoPago\n🏪 En secretaría con posnet\n\n*Consultá promociones de cuotas sin interés*",
    acciones: []
  },
  {
    id: 88,
    categoria: "pagos",
    keywords: ["transferencia", "cbu", "alias", "banco", "deposito"],
    pregunta: "¿Puedo pagar por transferencia?",
    respuesta: "Sí, aceptamos transferencias:\n\n🏦 **Banco**: [Nombre del banco]\n🔢 **CBU**: XXXX XXXX XXXX XXXX XXXX\n📝 **Alias**: CEMI.IDIOMAS\n👤 **Titular**: CEMI S.A.\n\n⚠️ Enviá el comprobante por email o WhatsApp",
    acciones: []
  },
  {
    id: 89,
    categoria: "pagos",
    keywords: ["efectivo", "cash", "billetes", "contado"],
    pregunta: "¿Puedo pagar en efectivo?",
    respuesta: "Sí, podés pagar en efectivo:\n\n🏢 En secretaría del instituto\n🕐 Horario de atención\n🧾 Te damos recibo oficial\n\n*Traé el monto exacto de ser posible*",
    acciones: []
  },
  {
    id: 90,
    categoria: "pagos",
    keywords: ["vencimiento", "cuando vence", "fecha pago", "limite"],
    pregunta: "¿Cuándo vence la cuota?",
    respuesta: "Las cuotas vencen:\n\n📅 **Día 10** de cada mes\n⚠️ Después del 10: recargo por mora\n📧 Recordatorio por email antes del vencimiento\n\n*Podés activar débito automático*",
    acciones: []
  },
  {
    id: 91,
    categoria: "pagos",
    keywords: ["recargo", "mora", "atraso", "pago tarde", "despues"],
    pregunta: "¿Hay recargo por pagar tarde?",
    respuesta: "Sí, después del vencimiento:\n\n📅 Del 11 al 20: 10% de recargo\n📅 Después del 20: 15% de recargo\n\n⚠️ Con 2+ cuotas impagas se suspende el acceso a clases.\n\n*Comunicate si tenés dificultades de pago*",
    acciones: []
  },
  {
    id: 92,
    categoria: "pagos",
    keywords: ["descuento", "promocion", "oferta", "rebaja"],
    pregunta: "¿Tienen descuentos?",
    respuesta: "Ofrecemos descuentos por:\n\n👨‍👩‍👧 **Grupo familiar**: 10% segundo inscripto\n💼 **Pago anual anticipado**: 15% off\n🎓 **Estudiantes universitarios**: 10%\n👴 **Jubilados**: 10%\n🏢 **Convenios empresas**: Consultá\n\n*Los descuentos no son acumulables*",
    acciones: []
  },
  {
    id: 93,
    categoria: "pagos",
    keywords: ["beca", "ayuda economica", "no puedo pagar", "dificultad"],
    pregunta: "¿Tienen becas?",
    respuesta: "Sí, ofrecemos un programa de **becas**:\n\n📋 Presentá solicitud en secretaría\n📄 Documentación socioeconómica\n📊 Evaluación caso por caso\n💰 Becas parciales (30-50%)\n\n*Cupos limitados por período*",
    acciones: [{ texto: "Solicitar beca", link: "mailto:info@cemi.edu.ar?subject=Solicitud de beca" }]
  },
  {
    id: 94,
    categoria: "pagos",
    keywords: ["comprobante", "recibo", "factura", "boleta"],
    pregunta: "¿Entregan comprobante de pago?",
    respuesta: "Sí, siempre entregamos comprobante:\n\n🧾 **Pago online**: Comprobante por email automático\n🧾 **Efectivo**: Recibo en el momento\n📄 **Factura**: Disponible si la necesitás\n\n*Guardá tus comprobantes*",
    acciones: []
  },
  {
    id: 95,
    categoria: "pagos",
    keywords: ["factura a", "factura b", "monotributo", "empresa"],
    pregunta: "¿Hacen factura A o B?",
    respuesta: "Emitimos:\n\n📄 **Factura B**: Para consumidores finales\n📄 **Factura A**: Para responsables inscriptos\n\n📝 Solicitala indicando CUIT y datos fiscales.\n\n*Pedila antes de pagar*",
    acciones: []
  },
  {
    id: 96,
    categoria: "pagos",
    keywords: ["reembolso", "devolucion", "devolver plata", "cancelar"],
    pregunta: "¿Puedo pedir reembolso?",
    respuesta: "Política de reembolso:\n\n❌ No se devuelve matrícula\n❌ No se devuelven cuotas de meses cursados\n✅ Crédito a favor por baja anticipada (casos excepcionales)\n\n*Consultá tu situación particular en secretaría*",
    acciones: []
  },
  {
    id: 97,
    categoria: "pagos",
    keywords: ["cuotas", "plan cuotas", "financiar", "pagar en cuotas"],
    pregunta: "¿Puedo pagar en cuotas?",
    respuesta: "Opciones de financiamiento:\n\n💳 **Tarjeta de crédito**: Hasta 6 cuotas sin interés (según promo)\n📅 **Cuota mensual**: Es el sistema regular\n💰 **Pago anticipado**: Descuento especial\n\n*Consultá promociones vigentes*",
    acciones: []
  },
  {
    id: 98,
    categoria: "pagos",
    keywords: ["debito automatico", "automatico", "auto", "cobro automatico"],
    pregunta: "¿Tienen débito automático?",
    respuesta: "Sí, podés activar **débito automático**:\n\n💳 Con tarjeta de crédito o débito\n📱 Configuralo desde tu dashboard\n✅ Te descontamos el día del vencimiento\n🔔 Notificación previa\n\n*Evitá recargos y olvidos*",
    acciones: []
  },
  {
    id: 99,
    categoria: "pagos",
    keywords: ["debo", "deuda", "cuotas adeudadas", "deber"],
    pregunta: "¿Cómo sé si tengo cuotas adeudadas?",
    respuesta: "Podés verificar tu estado de cuenta:\n\n💻 Desde tu **Dashboard de alumno**\n📧 Recibirás avisos por email\n📞 Consultando en secretaría\n📱 Por WhatsApp\n\n*Regularizá tu situación para continuar cursando*",
    acciones: []
  },
  {
    id: 100,
    categoria: "pagos",
    keywords: ["precio clases individuales", "particular precio", "costo privada"],
    pregunta: "¿Cuánto cuestan las clases individuales?",
    respuesta: "Las **clases individuales** tienen un costo por hora:\n\n💰 Valor hora: Desde $XX.XXX\n📦 Pack 4 clases: Descuento del 10%\n📦 Pack 8 clases: Descuento del 15%\n\n*Precio según idioma y nivel*",
    acciones: [{ texto: "Consultar precios", link: "https://wa.me/5493811234567?text=Hola!%20Consulta%20sobre%20clases%20individuales" }]
  },
  {
    id: 101,
    categoria: "pagos",
    keywords: ["libro aparte", "material costo", "libro incluido"],
    pregunta: "¿El libro está incluido en la cuota?",
    respuesta: "Depende del curso:\n\n📚 **Cursos grupales**: Libro aparte (se compra una vez)\n📚 **Cursos individuales**: Material digital incluido\n💻 **Plataforma Classroom**: Incluida en todos\n\n*Consultá el costo del material para tu curso*",
    acciones: []
  },

  // ============================================
  // CATEGORÍA 6: UBICACIÓN Y CONTACTO (12 respuestas)
  // ============================================
  {
    id: 102,
    categoria: "ubicacion",
    keywords: ["donde estan", "direccion", "ubicacion", "domicilio", "sede"],
    pregunta: "¿Dónde están ubicados?",
    respuesta: "Nuestra sede está en:\n\n📍 **Dirección**: Av. Principal 1234, Ciudad\n🏢 **Piso**: Planta baja\n🚇 **Cerca de**: Estación Central\n🅿️ **Estacionamiento**: Disponible en la zona\n\n¡Te esperamos!",
    acciones: [{ texto: "Ver en mapa", link: "#ubicacion" }]
  },
  {
    id: 103,
    categoria: "ubicacion",
    keywords: ["telefono", "llamar", "numero", "tel"],
    pregunta: "¿Cuál es el teléfono?",
    respuesta: "Podés comunicarte por:\n\n📞 **Teléfono fijo**: (0381) 123-4567\n📱 **Celular/WhatsApp**: +54 9 381 123-4567\n\n⏰ Horario: Lunes a Viernes 8:00 a 21:00\n⏰ Sábados: 9:00 a 13:00",
    acciones: [{ texto: "Llamar", link: "tel:+5493811234567" }, { texto: "WhatsApp", link: "https://wa.me/5493811234567" }]
  },
  {
    id: 104,
    categoria: "ubicacion",
    keywords: ["email", "correo", "mail", "escribir"],
    pregunta: "¿Cuál es el email de contacto?",
    respuesta: "Escribinos a:\n\n📧 **Consultas generales**: info@cemi.edu.ar\n📧 **Inscripciones**: inscripciones@cemi.edu.ar\n📧 **Soporte técnico**: soporte@cemi.edu.ar\n\n*Respondemos en 24-48hs hábiles*",
    acciones: [{ texto: "Enviar email", link: "mailto:info@cemi.edu.ar" }]
  },
  {
    id: 105,
    categoria: "ubicacion",
    keywords: ["whatsapp", "wsp", "wp", "mensaje"],
    pregunta: "¿Tienen WhatsApp?",
    respuesta: "¡Sí! Escribinos por WhatsApp:\n\n📱 **+54 9 381 123-4567**\n\n✅ Consultas rápidas\n✅ Envío de comprobantes\n✅ Información de cursos\n\n*Respondemos en horario de atención*",
    acciones: [{ texto: "Abrir WhatsApp", link: "https://wa.me/5493811234567" }]
  },
  {
    id: 106,
    categoria: "ubicacion",
    keywords: ["horario atencion", "cuando atienden", "abierto", "secretaria"],
    pregunta: "¿Cuál es el horario de atención?",
    respuesta: "Horarios de secretaría:\n\n🕐 **Lunes a Viernes**: 8:00 a 21:00\n🕐 **Sábados**: 9:00 a 13:00\n🚫 **Domingos y feriados**: Cerrado\n\n*Para trámites administrativos, mejor venir por la mañana*",
    acciones: []
  },
  {
    id: 107,
    categoria: "ubicacion",
    keywords: ["como llegar", "colectivo", "bondi", "transporte", "subte"],
    pregunta: "¿Cómo llego al instituto?",
    respuesta: "Podés llegar en:\n\n🚌 **Colectivos**: Líneas 101, 102, 103 (parada a 1 cuadra)\n🚇 **Subte/Metro**: Estación Central (5 min caminando)\n🚗 **Auto**: Estacionamiento en la zona\n🚲 **Bici**: Bicicletero en el edificio\n\n📍 Av. Principal 1234",
    acciones: [{ texto: "Ver mapa", link: "#ubicacion" }]
  },
  {
    id: 108,
    categoria: "ubicacion",
    keywords: ["estacionamiento", "parking", "auto", "donde estacionar"],
    pregunta: "¿Hay estacionamiento?",
    respuesta: "Opciones de estacionamiento:\n\n🅿️ **Estacionamiento público** a 50 metros\n🚗 **Estacionamiento del edificio** (limitado)\n🚫 No hay playa propia del instituto\n\n*La zona tiene parquímetros municipales*",
    acciones: []
  },
  {
    id: 109,
    categoria: "ubicacion",
    keywords: ["sucursal", "otra sede", "otras sedes", "filial"],
    pregunta: "¿Tienen otras sedes?",
    respuesta: "Actualmente contamos con una única sede:\n\n📍 Av. Principal 1234, Ciudad\n\n💻 También ofrecemos cursos **100% online** accesibles desde cualquier lugar.\n\n*Próximamente nuevas sedes*",
    acciones: []
  },
  {
    id: 110,
    categoria: "ubicacion",
    keywords: ["accesibilidad", "discapacidad", "silla de ruedas", "rampa"],
    pregunta: "¿El edificio es accesible?",
    respuesta: "Sí, contamos con:\n\n♿ Rampa de acceso\n🛗 Ascensor\n🚻 Baños adaptados\n🦮 Admitimos perros guía\n\n*Comunicate si necesitás asistencia especial*",
    acciones: []
  },
  {
    id: 111,
    categoria: "ubicacion",
    keywords: ["zona", "barrio", "seguro", "seguridad zona"],
    pregunta: "¿La zona es segura?",
    respuesta: "Estamos ubicados en una zona céntrica y segura:\n\n✅ Zona comercial con movimiento\n✅ Buena iluminación\n✅ Cerca de transporte público\n👮 Presencia policial en la zona\n\n*Horarios nocturnos sin inconvenientes*",
    acciones: []
  },
  {
    id: 112,
    categoria: "ubicacion",
    keywords: ["redes sociales", "instagram", "facebook", "social media"],
    pregunta: "¿Dónde los encuentro en redes?",
    respuesta: "¡Seguinos en redes!\n\n📘 **Facebook**: facebook.com/CEMIidiomas\n📸 **Instagram**: @cemi_idiomas\n🎥 **YouTube**: CEMI Idiomas Oficial\n💼 **LinkedIn**: CEMI Centro Educativo\n\n*Novedades, tips y contenido educativo*",
    acciones: []
  },
  {
    id: 113,
    categoria: "ubicacion",
    keywords: ["formulario contacto", "escribirles", "consulta web"],
    pregunta: "¿Tienen formulario de contacto?",
    respuesta: "Sí, podés contactarnos:\n\n📧 Email: info@cemi.edu.ar\n📱 WhatsApp: +54 9 381 123-4567\n📞 Teléfono: (0381) 123-4567\n\n*Respondemos todas las consultas*",
    acciones: [{ texto: "Enviar WhatsApp", link: "https://wa.me/5493811234567" }, { texto: "Enviar email", link: "mailto:info@cemi.edu.ar" }]
  },

  // ============================================
  // CATEGORÍA 7: HORARIOS (15 respuestas)
  // ============================================
  {
    id: 114,
    categoria: "horarios",
    keywords: ["horarios", "turnos", "cuando hay clases", "que horarios"],
    pregunta: "¿Qué horarios de cursada tienen?",
    respuesta: "Ofrecemos múltiples turnos:\n\n🌅 **Mañana**: 8:00 - 12:00\n☀️ **Tarde**: 14:00 - 18:00\n🌙 **Noche**: 18:00 - 22:00\n📅 **Sábados**: 9:00 - 13:00\n\n*Horarios varían según idioma y nivel*",
    acciones: []
  },
  {
    id: 115,
    categoria: "horarios",
    keywords: ["mañana", "temprano", "matutino"],
    pregunta: "¿Tienen clases a la mañana?",
    respuesta: "Sí, turno mañana disponible:\n\n🌅 **Horarios**: 8:00 a 12:00\n📚 Varias opciones de cursada\n👶 Ideal para niños y jubilados\n💼 Para quienes trabajan por la tarde\n\n*Consultá disponibilidad según idioma*",
    acciones: []
  },
  {
    id: 116,
    categoria: "horarios",
    keywords: ["tarde", "siesta", "vespertino"],
    pregunta: "¿Tienen clases a la tarde?",
    respuesta: "Turno tarde disponible:\n\n☀️ **Horarios**: 14:00 a 18:00\n👨‍🎓 Ideal para estudiantes universitarios\n🎓 Grupos de adolescentes\n\n*Varios horarios para elegir*",
    acciones: []
  },
  {
    id: 117,
    categoria: "horarios",
    keywords: ["noche", "nocturno", "despues trabajo", "tarde noche"],
    pregunta: "¿Tienen clases a la noche?",
    respuesta: "Sí, turno noche muy solicitado:\n\n🌙 **Horarios**: 18:00 a 22:00\n💼 Ideal para quienes trabajan\n👥 Mayor oferta de grupos\n\n*Último turno comienza a las 20:30*",
    acciones: []
  },
  {
    id: 118,
    categoria: "horarios",
    keywords: ["sabado", "fin semana", "finde", "weekend"],
    pregunta: "¿Tienen clases los sábados?",
    respuesta: "¡Sí! Cursada sabatina:\n\n📅 **Sábados**: 9:00 a 13:00\n⏱️ Clases de 2-3 horas\n👥 Grupos especiales\n\n*Ideal para quienes no pueden en la semana*\n\n🚫 No tenemos clases los domingos",
    acciones: []
  },
  {
    id: 119,
    categoria: "horarios",
    keywords: ["cambiar horario", "otro horario", "modificar horario"],
    pregunta: "¿Puedo cambiar de horario?",
    respuesta: "Sí, podés solicitar cambio:\n\n📋 Hablá con secretaría\n🔄 Se evalúa disponibilidad\n📅 Cambio desde el mes siguiente\n✅ Sin costo adicional\n\n*Sujeto a cupos disponibles*",
    acciones: []
  },
  {
    id: 120,
    categoria: "horarios",
    keywords: ["cuanto dura clase", "duracion clase", "horas clase"],
    pregunta: "¿Cuánto dura cada clase?",
    respuesta: "Duración según modalidad:\n\n⏱️ **Curso regular**: 1.5 horas (90 min)\n⏱️ **Intensivo**: 2-3 horas\n⏱️ **Sábados**: 3 horas\n⏱️ **Individual**: 1 hora (60 min)\n\n*Incluye recreo en clases largas*",
    acciones: []
  },
  {
    id: 121,
    categoria: "horarios",
    keywords: ["dias semana", "que dias", "frecuencia", "veces por semana"],
    pregunta: "¿Cuántos días por semana son las clases?",
    respuesta: "Frecuencia según modalidad:\n\n📅 **Extensivo**: 2 veces por semana\n📅 **Semi-intensivo**: 3 veces por semana\n📅 **Intensivo**: 4-5 veces por semana\n📅 **Sábados**: 1 vez por semana\n\n*Vos elegís según tu disponibilidad*",
    acciones: []
  },
  {
    id: 122,
    categoria: "horarios",
    keywords: ["feriado", "feriados", "dia feriado", "no hay clase"],
    pregunta: "¿Hay clases en feriados?",
    respuesta: "En feriados nacionales:\n\n🚫 **No hay clases**\n📅 Se recuperan según calendario\n📧 Aviso previo por email/plataforma\n\n*Consultá el calendario académico*",
    acciones: [{ texto: "Consultar fechas", link: "https://wa.me/5493811234567?text=Hola!%20Quisiera%20consultar%20las%20fechas%20de%20feriados" }]
  },
  {
    id: 123,
    categoria: "horarios",
    keywords: ["vacaciones", "receso", "invierno", "verano"],
    pregunta: "¿Cuándo son las vacaciones?",
    respuesta: "Recesos durante el año:\n\n❄️ **Invierno**: 2 semanas en julio\n☀️ **Verano**: Diciembre a Febrero\n📅 Feriados nacionales\n\n*En verano hay cursos intensivos opcionales*",
    acciones: []
  },
  {
    id: 124,
    categoria: "horarios",
    keywords: ["recuperar clase", "clase perdida", "falte"],
    pregunta: "¿Puedo recuperar una clase que falté?",
    respuesta: "Opciones para recuperar:\n\n📚 Material disponible en Classroom\n📹 Grabación de clase (si disponible)\n👥 Asistir a otro grupo del mismo nivel\n👨‍🏫 Consulta con el profesor\n\n*Avisá con anticipación si vas a faltar*",
    acciones: []
  },
  {
    id: 125,
    categoria: "horarios",
    keywords: ["llego tarde", "tardanza", "puntualidad", "retraso"],
    pregunta: "¿Qué pasa si llego tarde?",
    respuesta: "Política de puntualidad:\n\n⏰ Tolerancia: 10 minutos\n📝 Después: Se registra tardanza\n🚪 Podés ingresar, pero sin interrumpir\n⚠️ Tardanzas reiteradas afectan asistencia\n\n*¡Mejor llegar a tiempo!*",
    acciones: []
  },
  {
    id: 126,
    categoria: "horarios",
    keywords: ["horario flexible", "elegir horario", "personalizado"],
    pregunta: "¿Puedo elegir mi propio horario?",
    respuesta: "Depende del tipo de curso:\n\n👥 **Grupal**: Elegís entre horarios fijos\n👤 **Individual**: Horario 100% a tu medida\n💼 **Empresas**: Se coordina con la empresa\n\n*Las clases individuales ofrecen máxima flexibilidad*",
    acciones: []
  },
  {
    id: 127,
    categoria: "horarios",
    keywords: ["cuando empiezan", "inicio clases", "arrancan"],
    pregunta: "¿Cuándo empiezan las clases?",
    respuesta: "Inicio de cursada:\n\n📅 **Ciclo anual**: Marzo\n📅 **Segundo cuatrimestre**: Agosto\n🔄 **Ingreso permanente**: Todo el año (si hay cupo)\n☀️ **Intensivo verano**: Enero\n\n*Consultá fechas exactas de inicio*",
    acciones: []
  },
  {
    id: 128,
    categoria: "horarios",
    keywords: ["cuando terminan", "fin clases", "cierre"],
    pregunta: "¿Cuándo terminan las clases?",
    respuesta: "Fin de cursada:\n\n📅 **Primer cuatrimestre**: Julio\n📅 **Segundo cuatrimestre**: Diciembre\n📝 **Exámenes finales**: Julio y Diciembre\n🏖️ **Receso verano**: Enero-Febrero\n\n*Fechas exactas en calendario académico*",
    acciones: []
  },

  // ============================================
  // CATEGORÍA 8: DOCENTES (12 respuestas)
  // ============================================
  {
    id: 129,
    categoria: "docentes",
    keywords: ["profesores", "docentes", "maestros", "quienes enseñan"],
    pregunta: "¿Quiénes son los profesores?",
    respuesta: "Nuestro equipo docente:\n\n👨‍🏫 Profesores con título habilitante\n🌍 Docentes nativos y bilingües\n📜 Certificaciones internacionales\n🎓 Formación pedagógica continua\n💼 Experiencia en enseñanza\n\n*Conocelos en nuestra web*",
    acciones: []
  },
  {
    id: 130,
    categoria: "docentes",
    keywords: ["nativo", "native", "hablante nativo"],
    pregunta: "¿Tienen profesores nativos?",
    respuesta: "Contamos con:\n\n🌍 **Profesores nativos** certificados\n👨‍🏫 **Bilingües** con nivel nativo\n📚 Todos con formación docente\n\n*Se asignan según nivel y disponibilidad*",
    acciones: []
  },
  {
    id: 131,
    categoria: "docentes",
    keywords: ["titulo", "certificado profesor", "habilitado"],
    pregunta: "¿Los profesores tienen título?",
    respuesta: "Todos nuestros docentes tienen:\n\n📜 Título de Profesor/Traductor\n🎓 Certificaciones internacionales (CAE, CPE, etc.)\n📚 Formación pedagógica\n🔄 Capacitación continua\n\n*Calidad educativa garantizada*",
    acciones: []
  },
  {
    id: 132,
    categoria: "docentes",
    keywords: ["contactar profesor", "hablar profesor", "mail profesor"],
    pregunta: "¿Cómo contacto a mi profesor?",
    respuesta: "Podés contactar a tu docente:\n\n💬 Por el **chat de Classroom**\n📧 Email institucional del profesor\n🏫 En persona antes/después de clase\n📋 A través de secretaría\n\n*Usá siempre los canales oficiales*",
    acciones: []
  },
  {
    id: 133,
    categoria: "docentes",
    keywords: ["cambiar profesor", "otro profesor", "no me gusta"],
    pregunta: "¿Puedo cambiar de profesor?",
    respuesta: "El cambio de profesor implica cambiar de grupo:\n\n📋 Solicitalo en secretaría\n🔄 Se evalúa disponibilidad\n👥 Otro grupo = otro docente\n\n*Escuchamos tus inquietudes*",
    acciones: []
  },
  {
    id: 134,
    categoria: "docentes",
    keywords: ["tutoria", "consulta profesor", "ayuda extra", "clase apoyo"],
    pregunta: "¿Hay tutorías con los profesores?",
    respuesta: "Sí, ofrecemos apoyo adicional:\n\n📚 **Tutorías**: Consultas puntuales\n💬 **Foro**: Preguntas en Classroom\n📧 **Email**: Consultas al docente\n🏫 **Horario de consulta**: Antes/después de clase\n\n*Los profes están para ayudarte*",
    acciones: []
  },
  {
    id: 135,
    categoria: "docentes",
    keywords: ["metodologia profesor", "como enseñan", "forma de dar clase"],
    pregunta: "¿Cómo enseñan los profesores?",
    respuesta: "Metodología de enseñanza:\n\n🗣️ **Enfoque comunicativo**\n🎮 Actividades dinámicas e interactivas\n💻 Uso de tecnología\n📚 Material actualizado\n🎯 Objetivos claros por clase\n👥 Participación activa del alumno",
    acciones: []
  },
  {
    id: 136,
    categoria: "docentes",
    keywords: ["profesor falta", "suplente", "no vino el profesor"],
    pregunta: "¿Qué pasa si el profesor falta?",
    respuesta: "En caso de ausencia del docente:\n\n👨‍🏫 Se asigna profesor suplente\n📧 Se avisa con anticipación (si es posible)\n📅 Se reprograma la clase\n💰 No se cobra clase no dada\n\n*Siempre hay alternativas*",
    acciones: []
  },
  {
    id: 137,
    categoria: "docentes",
    keywords: ["evaluar profesor", "opinion profesor", "feedback docente"],
    pregunta: "¿Puedo evaluar al profesor?",
    respuesta: "¡Sí! Valoramos tu opinión:\n\n📋 **Encuestas** al final de cada nivel\n💬 **Buzón de sugerencias**\n🏫 **Entrevista** con coordinación\n\n*Tu feedback nos ayuda a mejorar*",
    acciones: []
  },
  {
    id: 138,
    categoria: "docentes",
    keywords: ["experiencia profesor", "años profesor", "trayectoria"],
    pregunta: "¿Los profesores tienen experiencia?",
    respuesta: "Nuestros docentes cuentan con:\n\n📅 Mínimo 2 años de experiencia\n🎓 Formación continua\n🏆 Trayectoria comprobable\n📜 Referencias verificables\n\n*Seleccionamos los mejores profesionales*",
    acciones: []
  },
  {
    id: 139,
    categoria: "docentes",
    keywords: ["cuantos profesores", "plantel", "equipo docente"],
    pregunta: "¿Cuántos profesores tienen?",
    respuesta: "Contamos con un equipo de más de 20 profesores:\n\n👨‍🏫 Especialistas por idioma\n🌍 Nativos y bilingües\n📚 Formación diversa\n💼 Tiempo completo y parcial\n\n*Equipo en constante crecimiento*",
    acciones: []
  },
  {
    id: 140,
    categoria: "docentes",
    keywords: ["capacitacion docente", "actualizacion", "formacion continua"],
    pregunta: "¿Los profesores se capacitan?",
    respuesta: "Sí, inversión constante en formación:\n\n📚 Cursos de actualización\n🎓 Congresos y seminarios\n🌍 Certificaciones internacionales\n💻 Capacitación en tecnología educativa\n\n*Docentes siempre actualizados*",
    acciones: []
  },

  // ============================================
  // CATEGORÍA 9: CERTIFICACIONES (14 respuestas)
  // ============================================
  {
    id: 141,
    categoria: "certificaciones",
    keywords: ["certificado", "titulo", "diploma", "constancia"],
    pregunta: "¿Entregan certificados?",
    respuesta: "Sí, entregamos:\n\n📜 **Certificado** al completar cada nivel\n🎓 **Diploma** al terminar el programa\n📋 **Constancias** de alumno regular\n📝 **Analíticos** con notas detalladas\n\n*Todos con validez institucional*",
    acciones: []
  },
  {
    id: 142,
    categoria: "certificaciones",
    keywords: ["validez certificado", "oficial", "reconocido", "sirve para"],
    pregunta: "¿El certificado tiene validez oficial?",
    respuesta: "Nuestros certificados:\n\n✅ **Validez institucional** reconocida\n🏢 Aceptados por empresas\n🎓 Útiles para CV y entrevistas\n📋 Especifican nivel alcanzado (A1-C2)\n\n*Para validez internacional, preparamos para exámenes internacionales*",
    acciones: []
  },
  {
    id: 143,
    categoria: "certificaciones",
    keywords: ["examen internacional", "cambridge", "toefl", "ielts", "delf"],
    pregunta: "¿Preparan para exámenes internacionales?",
    respuesta: "Sí, preparamos para:\n\n🇬🇧 **Inglés**: Cambridge (KET, PET, FCE, CAE, CPE), TOEFL, IELTS\n🇫🇷 **Francés**: DELF, DALF\n🇩🇪 **Alemán**: Goethe-Zertifikat\n🇮🇹 **Italiano**: CELI, CILS\n🇵🇹 **Portugués**: CELPE-Bras\n\n*Cursos específicos de preparación*",
    acciones: []
  },
  {
    id: 144,
    categoria: "certificaciones",
    keywords: ["first certificate", "fce", "b2", "cambridge b2"],
    pregunta: "¿Preparan para el First Certificate?",
    respuesta: "¡Sí! Curso de preparación **FCE (B2)**:\n\n📚 Cobertura de las 4 habilidades\n✍️ Práctica de Writing\n🗣️ Simulacros de Speaking\n📖 Estrategias de Reading y Use of English\n👂 Práctica de Listening\n\n*Fechas de examen: Marzo, Junio, Diciembre*",
    acciones: []
  },
  {
    id: 145,
    categoria: "certificaciones",
    keywords: ["costo certificado", "precio diploma", "cuanto sale"],
    pregunta: "¿Los certificados tienen costo?",
    respuesta: "Costos de certificación:\n\n📜 **Certificado de nivel**: Incluido en la cuota\n🎓 **Diploma final**: Incluido\n📋 **Constancias extra**: Costo mínimo\n📝 **Duplicados**: Costo de emisión\n\n*Exámenes internacionales: arancel aparte (Cambridge, etc.)*",
    acciones: []
  },
  {
    id: 146,
    categoria: "certificaciones",
    keywords: ["cuanto tarda certificado", "cuando recibo", "demora certificado"],
    pregunta: "¿Cuánto tarda en salir el certificado?",
    respuesta: "Tiempos de entrega:\n\n📜 **Certificado de nivel**: 30 días aprox.\n📋 **Constancias**: 48-72hs\n🎓 **Diploma final**: 60 días\n🌍 **Exámenes internacionales**: 4-8 semanas (depende del organismo)\n\n*Te avisamos cuando esté listo*",
    acciones: []
  },
  {
    id: 147,
    categoria: "certificaciones",
    keywords: ["requisitos certificado", "como obtengo", "que necesito"],
    pregunta: "¿Qué necesito para obtener el certificado?",
    respuesta: "Requisitos para certificar:\n\n✅ Aprobar el examen final del nivel\n✅ Tener 75% de asistencia mínima\n✅ Cuotas al día\n✅ Completar actividades requeridas\n\n*Cumpliendo esto, obtenés tu certificado automáticamente*",
    acciones: []
  },
  {
    id: 148,
    categoria: "certificaciones",
    keywords: ["perdi certificado", "duplicado", "otro certificado", "se me perdio"],
    pregunta: "¿Puedo pedir un duplicado del certificado?",
    respuesta: "Sí, podés solicitar duplicado:\n\n📋 Solicitalo en secretaría\n📝 Completá formulario\n💰 Abona costo de emisión\n⏱️ Entrega en 7-10 días hábiles\n\n*Guardamos registro de todos los certificados emitidos*",
    acciones: []
  },
  {
    id: 149,
    categoria: "certificaciones",
    keywords: ["nivel marco europeo", "a1 a2 b1 b2", "cefr", "mcer"],
    pregunta: "¿Qué significa A1, B2, etc.?",
    respuesta: "Son niveles del **Marco Común Europeo (MCER)**:\n\n🔰 **A1**: Principiante\n📗 **A2**: Elemental\n📘 **B1**: Intermedio\n📙 **B2**: Intermedio Alto\n📕 **C1**: Avanzado\n📓 **C2**: Maestría/Nativo\n\n*Nuestros cursos están alineados al MCER*",
    acciones: []
  },
  {
    id: 150,
    categoria: "certificaciones",
    keywords: ["equivalencia nivel", "cuanto tiempo nivel", "b2 cuanto"],
    pregunta: "¿Cuánto tiempo para alcanzar cada nivel?",
    respuesta: "Tiempo aproximado desde cero:\n\n🔰 **A1**: 2-3 meses\n📗 **A2**: 4-6 meses\n📘 **B1**: 8-12 meses\n📙 **B2**: 18-24 meses\n📕 **C1**: 30-36 meses\n\n*Depende de dedicación e intensidad*",
    acciones: []
  },
  {
    id: 151,
    categoria: "certificaciones",
    keywords: ["centro examinador", "donde rinden", "sede examen"],
    pregunta: "¿Son centro examinador oficial?",
    respuesta: "Somos:\n\n✅ Centro preparador autorizado\n🏢 Los exámenes se rinden en centros oficiales\n📋 Te asesoramos en inscripción\n📅 Coordinamos fechas\n\n*Te acompañamos en todo el proceso*",
    acciones: []
  },
  {
    id: 152,
    categoria: "certificaciones",
    keywords: ["curriculum", "cv", "como pongo certificado"],
    pregunta: "¿Cómo incluyo el certificado en mi CV?",
    respuesta: "En tu CV poné:\n\n📝 **Idioma**: Inglés (u otro)\n📊 **Nivel**: B2 (Intermedio Alto)\n🏫 **Institución**: CEMI\n📅 **Año**: 2024\n🎓 **Certificación**: Cambridge FCE (si aplica)\n\n*Un nivel certificado suma mucho al CV*",
    acciones: []
  },
  {
    id: 153,
    categoria: "certificaciones",
    keywords: ["empresa certificado", "para trabajo", "pide mi empresa"],
    pregunta: "Mi empresa pide certificado, ¿sirve el de CEMI?",
    respuesta: "Nuestros certificados son:\n\n✅ Reconocidos por empresas locales\n✅ Especifican nivel MCER (A1-C2)\n📋 Incluyen carga horaria y contenidos\n💼 Válidos para RRHH\n\n*Para multinacionales, recomendamos certificación internacional*",
    acciones: []
  },
  {
    id: 154,
    categoria: "certificaciones",
    keywords: ["legalizar certificado", "apostillar", "validez exterior"],
    pregunta: "¿Puedo legalizar/apostillar el certificado?",
    respuesta: "Para uso en el exterior:\n\n📋 Nuestros certificados institucionales no se apostillan\n🌍 Para validez internacional: exámenes Cambridge, TOEFL, DELF, etc.\n✅ Esos SÍ tienen reconocimiento mundial\n\n*Te preparamos para esas certificaciones*",
    acciones: []
  },

  // ============================================
  // CATEGORÍA 10: PLATAFORMA ONLINE (16 respuestas)
  // ============================================
  {
    id: 155,
    categoria: "plataforma",
    keywords: ["classroom", "plataforma", "aula virtual", "campus"],
    pregunta: "¿Qué es la plataforma Classroom?",
    respuesta: "Es nuestra **aula virtual** integrada:\n\n📚 Material de estudio\n📝 Tareas y actividades\n📊 Notas y seguimiento\n💬 Chat con profesores\n📹 Clases grabadas\n📋 Recursos descargables\n\n*Accedés con tu usuario y contraseña*",
    acciones: [{ texto: "Ir a Classroom", link: "/classroom-login.html" }]
  },
  {
    id: 156,
    categoria: "plataforma",
    keywords: ["como entro", "ingresar classroom", "acceder plataforma"],
    pregunta: "¿Cómo ingreso a Classroom?",
    respuesta: "Para ingresar:\n\n1️⃣ Andá a la web del instituto\n2️⃣ Hacé clic en **\"Classroom\"**\n3️⃣ Ingresá tu **usuario y contraseña**\n4️⃣ ¡Listo!\n\n*Credenciales enviadas por email al inscribirte*",
    acciones: [{ texto: "Ir a Classroom", link: "/classroom-login.html" }]
  },
  {
    id: 157,
    categoria: "plataforma",
    keywords: ["olvide contraseña", "no puedo entrar", "recuperar clave", "restablecer"],
    pregunta: "Olvidé mi contraseña de Classroom",
    respuesta: "Para recuperar tu contraseña:\n\n1️⃣ En la pantalla de login, clic en **\"¿Olvidaste tu contraseña?\"**\n2️⃣ Ingresá tu email registrado\n3️⃣ Recibirás un link de recuperación\n4️⃣ Creá una nueva contraseña\n\n*Si no funciona, contactá a soporte*",
    acciones: [{ texto: "Ir a login", link: "/login.html" }]
  },
  {
    id: 158,
    categoria: "plataforma",
    keywords: ["material", "archivos", "recursos", "donde descargo"],
    pregunta: "¿Dónde encuentro el material de estudio?",
    respuesta: "En Classroom encontrás:\n\n📂 **Recursos**: Material por unidad\n📚 **Biblioteca**: PDFs y documentos\n🎧 **Audios**: Listening practice\n🎬 **Videos**: Contenido multimedia\n\n*Todo organizado por nivel y unidad*",
    acciones: [{ texto: "Ir a Classroom", link: "/classroom-login.html" }]
  },
  {
    id: 159,
    categoria: "plataforma",
    keywords: ["tarea", "entregar tarea", "subir tarea", "homework"],
    pregunta: "¿Cómo entrego las tareas?",
    respuesta: "Para entregar tareas:\n\n1️⃣ Ingresá a **Classroom**\n2️⃣ Andá a **\"Tareas pendientes\"**\n3️⃣ Abrí la tarea asignada\n4️⃣ Subí tu archivo o completá online\n5️⃣ Clic en **\"Entregar\"**\n\n*Respetá las fechas de entrega*",
    acciones: []
  },
  {
    id: 160,
    categoria: "plataforma",
    keywords: ["ver notas", "calificaciones", "como me fue", "resultados"],
    pregunta: "¿Dónde veo mis notas?",
    respuesta: "Tus calificaciones están en:\n\n📊 **Classroom > Mi progreso**\n📝 Notas por actividad\n📈 Promedio general\n🎯 Comentarios del profesor\n\n*Se actualizan después de cada corrección*",
    acciones: []
  },
  {
    id: 161,
    categoria: "plataforma",
    keywords: ["clase grabada", "grabacion", "ver clase", "me perdi clase"],
    pregunta: "¿Puedo ver las clases grabadas?",
    respuesta: "Sí, clases grabadas disponibles:\n\n📹 En **Classroom > Clases grabadas**\n⏱️ Disponibles por 30 días\n📚 Organizadas por fecha\n\n*Solo para clases virtuales/híbridas*\n\n⚠️ Las clases presenciales no se graban",
    acciones: []
  },
  {
    id: 162,
    categoria: "plataforma",
    keywords: ["app celular", "aplicacion movil", "desde celular"],
    pregunta: "¿Hay app para celular?",
    respuesta: "Sí, tenemos **app móvil CEMI**:\n\n📱 Disponible para Android\n🔔 Notificaciones de clases\n📚 Acceso a materiales\n✅ Consulta de notas\n💬 Chat con profesores\n\n*Descargala desde el sitio o Play Store*",
    acciones: []
  },
  {
    id: 163,
    categoria: "plataforma",
    keywords: ["no carga", "error plataforma", "problema classroom", "no funciona"],
    pregunta: "La plataforma no funciona, ¿qué hago?",
    respuesta: "Probá estos pasos:\n\n1️⃣ **Refrescá** la página (F5)\n2️⃣ **Borrá cookies** del navegador\n3️⃣ Probá con **otro navegador**\n4️⃣ Verificá tu **conexión a internet**\n\nSi persiste:\n📧 Contactá a soporte@cemi.edu.ar",
    acciones: [{ texto: "Contactar soporte", link: "mailto:soporte@cemi.edu.ar" }]
  },
  {
    id: 164,
    categoria: "plataforma",
    keywords: ["navegador", "chrome", "firefox", "cual uso"],
    pregunta: "¿Qué navegador debo usar?",
    respuesta: "Navegadores recomendados:\n\n✅ **Google Chrome** (mejor opción)\n✅ **Firefox**\n✅ **Edge**\n⚠️ **Safari**: Funciona pero con limitaciones\n🚫 **Internet Explorer**: No soportado\n\n*Mantené el navegador actualizado*",
    acciones: []
  },
  {
    id: 165,
    categoria: "plataforma",
    keywords: ["cambiar foto", "avatar", "foto perfil", "imagen perfil"],
    pregunta: "¿Cómo cambio mi foto de perfil?",
    respuesta: "Para cambiar tu avatar:\n\n1️⃣ Ingresá a **Classroom**\n2️⃣ Clic en tu **nombre/foto** arriba\n3️⃣ Seleccioná **\"Editar perfil\"**\n4️⃣ Subí tu nueva foto\n5️⃣ Guardá cambios\n\n*Usá una foto apropiada*",
    acciones: []
  },
  {
    id: 166,
    categoria: "plataforma",
    keywords: ["notificaciones", "avisos", "alertas", "me avisa"],
    pregunta: "¿Cómo recibo notificaciones?",
    respuesta: "Te notificamos por:\n\n📧 **Email**: Tareas, notas, avisos\n🔔 **Push**: En la app móvil\n📱 **Classroom**: Campana de notificaciones\n\n*Configurá tus preferencias en el perfil*",
    acciones: []
  },
  {
    id: 167,
    categoria: "plataforma",
    keywords: ["chat profesor", "mensaje profesor", "comunicarme"],
    pregunta: "¿Cómo me comunico con el profesor?",
    respuesta: "Canales de comunicación:\n\n💬 **Chat de Classroom**: Mensajes directos\n📧 **Email institucional**: Para consultas formales\n🗣️ **En clase**: Antes o después\n📋 **Foro**: Dudas grupales\n\n*Respetá los horarios de respuesta*",
    acciones: []
  },
  {
    id: 168,
    categoria: "plataforma",
    keywords: ["zoom", "meet", "clase virtual", "videollamada"],
    pregunta: "¿Cómo accedo a las clases virtuales?",
    respuesta: "Para clases online:\n\n1️⃣ Ingresá a **Classroom**\n2️⃣ En tu curso, buscá **\"Unirse a clase\"**\n3️⃣ Se abrirá **Zoom/Meet** automáticamente\n4️⃣ Usá audio y cámara\n\n*El link está en el tablón del curso*",
    acciones: []
  },
  {
    id: 169,
    categoria: "plataforma",
    keywords: ["descargar", "bajar material", "guardar pdf"],
    pregunta: "¿Puedo descargar los materiales?",
    respuesta: "Sí, podés descargar:\n\n📥 PDFs y documentos\n🎧 Archivos de audio\n📋 Ejercicios imprimibles\n\n⚠️ Algunos contenidos son solo online\n🔒 Material solo para uso personal/educativo",
    acciones: []
  },
  {
    id: 170,
    categoria: "plataforma",
    keywords: ["offline", "sin internet", "desconectado"],
    pregunta: "¿Puedo usar Classroom sin internet?",
    respuesta: "Opciones offline:\n\n📥 Descargá materiales cuando tengas conexión\n📱 App móvil permite ver contenido descargado\n🚫 Tareas y chat requieren conexión\n\n*Mejor experiencia: siempre conectado*",
    acciones: []
  },

  // ============================================
  // CATEGORÍA 11: CALENDARIO ACADÉMICO (10 respuestas)
  // ============================================
  {
    id: 171,
    categoria: "calendario",
    keywords: ["calendario", "fechas importantes", "cronograma", "agenda"],
    pregunta: "¿Dónde veo el calendario académico?",
    respuesta: "El calendario académico está disponible:\n\n📅 En nuestra **web**: /calendario\n📱 En la **app móvil**\n🏫 En **secretaría** (impreso)\n\n*Incluye fechas de inicio, exámenes, feriados y recesos*",
    acciones: [{ texto: "Consultar calendario", link: "https://wa.me/5493811234567?text=Hola!%20Quisiera%20consultar%20el%20calendario%20acad%C3%A9mico" }]
  },
  {
    id: 172,
    categoria: "calendario",
    keywords: ["cuando empiezo", "inicio cursada", "arranco"],
    pregunta: "¿Cuándo empieza el próximo ciclo?",
    respuesta: "Inicios de cursada:\n\n📅 **Marzo**: Ciclo anual\n📅 **Agosto**: Segundo cuatrimestre\n📅 **Enero**: Intensivo de verano\n\n*Fechas exactas en el calendario académico*",
    acciones: [{ texto: "Consultar fechas", link: "https://wa.me/5493811234567?text=Hola!%20Quisiera%20saber%20cuando%20empiezan%20las%20clases" }]
  },
  {
    id: 173,
    categoria: "calendario",
    keywords: ["examen final", "fecha examen", "finales"],
    pregunta: "¿Cuándo son los exámenes finales?",
    respuesta: "Períodos de exámenes:\n\n📝 **Julio**: Fin primer cuatrimestre\n📝 **Diciembre**: Fin segundo cuatrimestre\n📝 **Febrero**: Mesa de recuperatorios\n\n*Fechas específicas varían por nivel*",
    acciones: []
  },
  {
    id: 174,
    categoria: "calendario",
    keywords: ["vacaciones invierno", "julio", "receso julio"],
    pregunta: "¿Cuándo son las vacaciones de invierno?",
    respuesta: "Receso de invierno:\n\n❄️ **Dos semanas en julio**\n📅 Generalmente coincide con vacaciones escolares\n🔄 Las clases se retoman la 3ra semana de julio\n\n*Consultá fechas exactas en el calendario*",
    acciones: []
  },
  {
    id: 175,
    categoria: "calendario",
    keywords: ["vacaciones verano", "diciembre", "enero febrero"],
    pregunta: "¿Cuándo son las vacaciones de verano?",
    respuesta: "Receso de verano:\n\n☀️ **Diciembre a Febrero**\n📅 Clases terminan en diciembre\n📅 Reinicio en marzo\n📚 Cursos intensivos opcionales en enero\n\n*Secretaría tiene horario reducido en enero*",
    acciones: []
  },
  {
    id: 176,
    categoria: "calendario",
    keywords: ["inscripcion cuando", "fecha inscripcion", "abren inscripcion"],
    pregunta: "¿Cuándo abren las inscripciones?",
    respuesta: "Períodos de inscripción:\n\n📋 **Febrero-Marzo**: Para ciclo anual\n📋 **Julio-Agosto**: Para 2do cuatrimestre\n📋 **Diciembre**: Para intensivo de verano\n🔄 **Todo el año**: Si hay cupos disponibles\n\n*Inscribite temprano para asegurar lugar*",
    acciones: [{ texto: "Inscribirme", link: "/register.html" }]
  },
  {
    id: 177,
    categoria: "calendario",
    keywords: ["cuatrimestre", "semestre", "duracion curso"],
    pregunta: "¿Cuánto dura un cuatrimestre?",
    respuesta: "Duración de los períodos:\n\n📆 **1er Cuatrimestre**: Marzo a Julio (~4 meses)\n📆 **2do Cuatrimestre**: Agosto a Diciembre (~4 meses)\n📆 **Intensivo verano**: 6-8 semanas\n\n*Aproximadamente 16 semanas de clase por cuatrimestre*",
    acciones: []
  },
  {
    id: 178,
    categoria: "calendario",
    keywords: ["evento", "actividad especial", "jornada"],
    pregunta: "¿Hay eventos especiales durante el año?",
    respuesta: "Eventos y actividades:\n\n🎭 **Obras de teatro** en idiomas\n🎬 **Ciclos de cine** subtitulado\n📚 **Ferias del libro** en otros idiomas\n🎉 **Fiestas temáticas** (Halloween, Thanksgiving, etc.)\n🏆 **Competencias** y concursos\n\n*Fechas en el calendario y redes*",
    acciones: []
  },
  {
    id: 179,
    categoria: "calendario",
    keywords: ["dias habiles", "cuantas clases", "semanas"],
    pregunta: "¿Cuántas clases hay por cuatrimestre?",
    respuesta: "Cantidad aproximada:\n\n📚 **Cursada regular**: 32 clases (16 semanas x 2)\n📚 **Intensivo**: Más clases por semana\n📅 Descontando feriados\n\n*Varía levemente cada año*",
    acciones: []
  },
  {
    id: 180,
    categoria: "calendario",
    keywords: ["recuperatorio", "segunda fecha", "mesa recuperatorio"],
    pregunta: "¿Hay fechas de recuperatorio?",
    respuesta: "Sí, hay instancias de recuperación:\n\n📝 **Febrero**: Mesa de recuperatorios\n📝 **Julio**: Para 1er cuatrimestre\n✅ Una oportunidad de recuperar\n💰 Sin costo extra\n\n*Requisito: Haber rendido el examen original*",
    acciones: []
  },

  // ============================================
  // CATEGORÍA 12: CUENTA Y ACCESO (12 respuestas)
  // ============================================
  {
    id: 181,
    categoria: "cuenta",
    keywords: ["crear cuenta", "registrarme", "nuevo usuario"],
    pregunta: "¿Cómo creo mi cuenta?",
    respuesta: "Tu cuenta se crea automáticamente al inscribirte:\n\n1️⃣ Completá la inscripción\n2️⃣ Recibirás email con credenciales\n3️⃣ Usuario: tu email\n4️⃣ Contraseña: temporal (cambiarla al ingresar)\n\n*Si no recibiste el email, revisá spam*",
    acciones: []
  },
  {
    id: 182,
    categoria: "cuenta",
    keywords: ["cambiar contraseña", "nueva contraseña", "modificar clave"],
    pregunta: "¿Cómo cambio mi contraseña?",
    respuesta: "Para cambiar tu contraseña:\n\n1️⃣ Ingresá a **Classroom**\n2️⃣ Andá a **Configuración > Seguridad**\n3️⃣ Clic en **\"Cambiar contraseña\"**\n4️⃣ Ingresá la actual y la nueva\n5️⃣ Guardá cambios\n\n*Usá una contraseña segura*",
    acciones: []
  },
  {
    id: 183,
    categoria: "cuenta",
    keywords: ["cambiar email", "otro correo", "actualizar mail"],
    pregunta: "¿Puedo cambiar mi email?",
    respuesta: "Para cambiar tu email:\n\n📋 Solicitalo en **secretaría**\n📧 O escribí a soporte@cemi.edu.ar\n✅ Verificamos tu identidad\n🔄 Actualizamos en el sistema\n\n*El email es tu usuario de acceso*",
    acciones: []
  },
  {
    id: 184,
    categoria: "cuenta",
    keywords: ["datos personales", "actualizar datos", "cambiar direccion", "telefono"],
    pregunta: "¿Cómo actualizo mis datos personales?",
    respuesta: "Podés actualizar tus datos:\n\n📱 En **Classroom > Mi perfil**\n🏫 En **secretaría** (DNI, domicilio)\n📧 Por email a info@cemi.edu.ar\n\n*Mantené tus datos actualizados*",
    acciones: []
  },
  {
    id: 185,
    categoria: "cuenta",
    keywords: ["eliminar cuenta", "borrar cuenta", "darme de baja definitiva"],
    pregunta: "¿Puedo eliminar mi cuenta?",
    respuesta: "Para solicitar eliminación de cuenta:\n\n📋 Solicitalo por escrito\n📧 Email a soporte@cemi.edu.ar\n✅ Se procesan los datos según GDPR\n📜 Conservamos registros académicos por ley\n\n*Proceso irreversible*",
    acciones: []
  },
  {
    id: 186,
    categoria: "cuenta",
    keywords: ["doble factor", "2fa", "seguridad cuenta", "verificacion"],
    pregunta: "¿Tienen autenticación de dos factores?",
    respuesta: "Sí, ofrecemos **2FA** opcional:\n\n🔐 Activala en **Configuración > Seguridad**\n📱 Usá app como Google Authenticator\n🔑 Códigos de respaldo disponibles\n\n*Recomendado para mayor seguridad*",
    acciones: []
  },
  {
    id: 187,
    categoria: "cuenta",
    keywords: ["sesion abierta", "cerrar sesion", "otro dispositivo"],
    pregunta: "¿Cómo cierro sesión en otros dispositivos?",
    respuesta: "Para cerrar sesiones:\n\n1️⃣ Ingresá a **Classroom**\n2️⃣ **Configuración > Seguridad**\n3️⃣ **\"Cerrar todas las sesiones\"**\n4️⃣ Confirmá\n\n*Útil si perdiste un dispositivo*",
    acciones: []
  },
  {
    id: 188,
    categoria: "cuenta",
    keywords: ["hackeo", "cuenta hackeada", "acceso no autorizado", "robaron cuenta"],
    pregunta: "Creo que hackearon mi cuenta",
    respuesta: "Si sospechás acceso no autorizado:\n\n1️⃣ **Cambiá la contraseña** inmediatamente\n2️⃣ **Cerrá todas las sesiones**\n3️⃣ **Activá 2FA**\n4️⃣ **Contactá a soporte** urgente\n\n📧 soporte@cemi.edu.ar\n📱 WhatsApp: +54 9 381 123-4567",
    acciones: [{ texto: "Contactar soporte", link: "mailto:soporte@cemi.edu.ar" }]
  },
  {
    id: 189,
    categoria: "cuenta",
    keywords: ["privacidad", "datos", "gdpr", "mis datos"],
    pregunta: "¿Cómo protegen mis datos personales?",
    respuesta: "Protección de datos:\n\n🔐 Encriptación de información\n📜 Cumplimiento de Ley de Datos Personales\n🌍 Estándares GDPR\n✅ No compartimos datos con terceros\n📋 Podés solicitar exportación/eliminación\n\n*Tu privacidad es prioridad*",
    acciones: [{ texto: "Ver política de privacidad", link: "/privacidad.html" }]
  },
  {
    id: 190,
    categoria: "cuenta",
    keywords: ["exportar datos", "descargar mis datos", "copia datos"],
    pregunta: "¿Puedo descargar mis datos?",
    respuesta: "Sí, podés solicitar exportación:\n\n📋 Desde **Configuración > Privacidad**\n📧 O por email a soporte@cemi.edu.ar\n📦 Recibís un archivo con tus datos\n⏱️ Procesamos en 48-72hs\n\n*Derecho GDPR garantizado*",
    acciones: []
  },
  {
    id: 191,
    categoria: "cuenta",
    keywords: ["multiples dispositivos", "celular y computadora", "donde puedo entrar"],
    pregunta: "¿Puedo usar mi cuenta en varios dispositivos?",
    respuesta: "Sí, acceso desde múltiples dispositivos:\n\n💻 Computadora (navegador)\n📱 Celular (app o navegador)\n📲 Tablet\n\n✅ Sesiones simultáneas permitidas\n🔄 Datos sincronizados\n\n*Recomendamos cerrar sesión en dispositivos públicos*",
    acciones: []
  },
  {
    id: 192,
    categoria: "cuenta",
    keywords: ["olvidé usuario", "cual es mi usuario", "no se mi usuario"],
    pregunta: "Olvidé mi nombre de usuario",
    respuesta: "Tu usuario es:\n\n📧 **Tu email de registro**\n\nSi no recordás qué email usaste:\n📋 Contactá a secretaría con tu DNI\n📧 Escribí a soporte@cemi.edu.ar\n\n*Te ayudamos a recuperar el acceso*",
    acciones: []
  },

  // ============================================
  // CATEGORÍA 13: SOPORTE TÉCNICO (12 respuestas)
  // ============================================
  {
    id: 193,
    categoria: "soporte",
    keywords: ["soporte", "ayuda tecnica", "problema tecnico", "no funciona"],
    pregunta: "¿Cómo contacto al soporte técnico?",
    respuesta: "Canales de soporte:\n\n📧 **Email**: soporte@cemi.edu.ar\n📱 **WhatsApp**: +54 9 381 123-4567\n💬 **Chat**: En la plataforma (horario hábil)\n🏫 **Presencial**: Secretaría\n\n⏰ Respuesta en 24-48hs hábiles",
    acciones: [{ texto: "Enviar email", link: "mailto:soporte@cemi.edu.ar" }]
  },
  {
    id: 194,
    categoria: "soporte",
    keywords: ["horario soporte", "cuando responden", "atienden soporte"],
    pregunta: "¿Cuál es el horario de soporte?",
    respuesta: "Horarios de atención técnica:\n\n🕐 **Lunes a Viernes**: 9:00 a 20:00\n🕐 **Sábados**: 10:00 a 13:00\n🚫 **Domingos y feriados**: Cerrado\n\n*Emails recibidos fuera de horario se responden al día siguiente*",
    acciones: []
  },
  {
    id: 195,
    categoria: "soporte",
    keywords: ["video no carga", "no reproduce", "error video"],
    pregunta: "Los videos no cargan, ¿qué hago?",
    respuesta: "Probá estas soluciones:\n\n1️⃣ **Refrescá** la página\n2️⃣ Verificá tu **conexión a internet**\n3️⃣ Probá con **otro navegador**\n4️⃣ **Desactivá bloqueadores** de anuncios\n5️⃣ **Actualizá** el navegador\n\n*Si persiste, contactá a soporte*",
    acciones: []
  },
  {
    id: 196,
    categoria: "soporte",
    keywords: ["audio no funciona", "no escucho", "problema sonido"],
    pregunta: "No escucho el audio, ¿qué hago?",
    respuesta: "Verificá estos puntos:\n\n🔊 Volumen de tu dispositivo\n🔇 Que no esté en silencio\n🎧 Conexión de auriculares\n🔈 Permisos de audio en el navegador\n🔄 Refrescá la página\n\n*Probá en otro dispositivo para descartar*",
    acciones: []
  },
  {
    id: 197,
    categoria: "soporte",
    keywords: ["camara no funciona", "no me ven", "video negro"],
    pregunta: "Mi cámara no funciona en las clases",
    respuesta: "Soluciones para la cámara:\n\n1️⃣ Verificá **permisos** del navegador\n2️⃣ Cerrá otras apps que usen la cámara\n3️⃣ Probá en **otro navegador**\n4️⃣ Revisá configuración de **privacidad**\n5️⃣ Actualizá **drivers** de la cámara\n\n*En Zoom/Meet: Clic en el ícono de cámara*",
    acciones: []
  },
  {
    id: 198,
    categoria: "soporte",
    keywords: ["lento", "carga lento", "muy lento", "tarda mucho"],
    pregunta: "La plataforma está muy lenta",
    respuesta: "Para mejorar la velocidad:\n\n🌐 Verificá tu **conexión a internet**\n🧹 **Borrá caché** del navegador\n🔌 Reiniciá el **router**\n💻 Cerrá otras **pestañas/aplicaciones**\n📱 Probá desde **otro dispositivo**\n\n*Si es general, puede ser mantenimiento*",
    acciones: []
  },
  {
    id: 199,
    categoria: "soporte",
    keywords: ["error", "mensaje error", "pantalla error"],
    pregunta: "Me aparece un error en pantalla",
    respuesta: "Cuando aparece un error:\n\n📸 **Capturá pantalla** del mensaje\n🔄 **Refrescá** la página\n🗑️ **Borrá cookies** y caché\n🌐 Probá **otro navegador**\n\nSi persiste:\n📧 Enviá la captura a soporte@cemi.edu.ar",
    acciones: [{ texto: "Contactar soporte", link: "mailto:soporte@cemi.edu.ar" }]
  },
  {
    id: 200,
    categoria: "soporte",
    keywords: ["celular viejo", "requisitos", "que necesito para usar"],
    pregunta: "¿Qué requisitos técnicos necesito?",
    respuesta: "Requisitos mínimos:\n\n💻 **PC/Mac**: Navegador actualizado, 4GB RAM\n📱 **Celular**: Android 8+ o iOS 13+\n🌐 **Internet**: 5 Mbps mínimo\n🎧 **Audio**: Parlantes o auriculares\n📹 **Cámara**: Para clases virtuales (opcional)\n\n*Conexión estable recomendada*",
    acciones: []
  },
  {
    id: 201,
    categoria: "soporte",
    keywords: ["zoom problema", "meet problema", "no puedo entrar clase"],
    pregunta: "No puedo entrar a la clase virtual",
    respuesta: "Soluciones rápidas:\n\n1️⃣ Verificá que sea la **hora correcta**\n2️⃣ Usá el **link actualizado** de Classroom\n3️⃣ Actualizá **Zoom/Meet**\n4️⃣ Probá desde **navegador** en lugar de app\n5️⃣ Verificá **permisos** de cámara/micrófono\n\n*Avisá al profe si no podés entrar*",
    acciones: []
  },
  {
    id: 202,
    categoria: "soporte",
    keywords: ["actualizar app", "version app", "app vieja"],
    pregunta: "¿Cómo actualizo la app?",
    respuesta: "Para actualizar la app CEMI:\n\n📱 **Android**: Play Store > Mis apps > Actualizar\n🍎 **iOS**: App Store > Actualizaciones\n🔄 Activá **actualizaciones automáticas**\n\n*Siempre usá la última versión*",
    acciones: []
  },
  {
    id: 203,
    categoria: "soporte",
    keywords: ["borrar cache", "limpiar cache", "cache navegador"],
    pregunta: "¿Cómo borro el caché del navegador?",
    respuesta: "Para borrar caché:\n\n**Chrome**: Ctrl+Shift+Supr > \"Archivos en caché\"\n**Firefox**: Ctrl+Shift+Supr > \"Caché\"\n**Edge**: Ctrl+Shift+Supr > \"Archivos en caché\"\n**Safari**: Preferencias > Privacidad > Gestionar datos\n\n*Seleccioná \"Última hora\" o \"Todo el tiempo\"*",
    acciones: []
  },
  {
    id: 204,
    categoria: "soporte",
    keywords: ["reporte bug", "reportar error", "encontre falla"],
    pregunta: "¿Cómo reporto un error de la plataforma?",
    respuesta: "Para reportar bugs:\n\n📧 Email a **soporte@cemi.edu.ar**\n📝 Incluí:\n   - Descripción del error\n   - Pasos para reproducirlo\n   - Captura de pantalla\n   - Navegador y dispositivo\n\n*Tu reporte nos ayuda a mejorar*",
    acciones: [{ texto: "Reportar error", link: "mailto:soporte@cemi.edu.ar?subject=Reporte de Error" }]
  },

  // ============================================
  // CATEGORÍA 14: PREGUNTAS FRECUENTES GENERALES (15 respuestas)
  // ============================================
  {
    id: 205,
    categoria: "faq",
    keywords: ["que es cemi", "quienes son", "sobre ustedes"],
    pregunta: "¿Qué es CEMI?",
    respuesta: "**CEMI** es el Centro de Estudios de Idiomas:\n\n🎓 Instituto de enseñanza de idiomas\n📚 Más de 10 años de experiencia\n👥 Miles de alumnos egresados\n🌍 Preparación para exámenes internacionales\n💼 Cursos para empresas\n\n*Tu mejor opción para aprender idiomas*",
    acciones: []
  },
  {
    id: 206,
    categoria: "faq",
    keywords: ["por que cemi", "por que elegir", "diferencia otros"],
    pregunta: "¿Por qué elegir CEMI?",
    respuesta: "Nos diferenciamos por:\n\n✅ **Grupos reducidos** (máx. 12 alumnos)\n✅ **Profesores certificados**\n✅ **Metodología comunicativa**\n✅ **Plataforma online** integrada\n✅ **Flexibilidad horaria**\n✅ **Certificaciones reconocidas**\n✅ **Atención personalizada**",
    acciones: []
  },
  {
    id: 207,
    categoria: "faq",
    keywords: ["gratis", "sin costo", "free", "gratuito"],
    pregunta: "¿Hay cursos gratis?",
    respuesta: "Opciones sin costo:\n\n📚 **Clase de prueba** gratuita\n🎬 **Contenido en redes** (tips, vocabulario)\n📋 **Test de nivel** sin cargo\n\n💰 Los cursos completos tienen costo\n🎓 Pero ofrecemos becas y descuentos\n\n*Consultá opciones de financiación*",
    acciones: []
  },
  {
    id: 208,
    categoria: "faq",
    keywords: ["beca", "becas", "ayuda economica", "descuento especial"],
    pregunta: "¿Ofrecen becas?",
    respuesta: "Sí, ofrecemos becas:\n\n🎓 **Beca por excelencia** académica\n👨‍👩‍👧‍👦 **Descuento familiar** (hermanos)\n🏢 **Convenios empresariales**\n👴 **Jubilados**: 20% descuento\n\n*Consultá requisitos en secretaría*",
    acciones: []
  },
  {
    id: 209,
    categoria: "faq",
    keywords: ["trabajo cemi", "trabajar aca", "empleo", "buscan profesores"],
    pregunta: "¿Puedo trabajar en CEMI?",
    respuesta: "Convocatorias docentes:\n\n👨‍🏫 Publicamos en nuestra web y redes\n📧 Enviá CV a rrhh@cemi.edu.ar\n📋 Requisitos: Título + experiencia\n\n*Actualmente buscamos docentes de alemán*\n\n(Esto puede variar)",
    acciones: [{ texto: "Enviar CV", link: "mailto:rrhh@cemi.edu.ar" }]
  },
  {
    id: 210,
    categoria: "faq",
    keywords: ["opinion alumnos", "testimonios", "comentarios"],
    pregunta: "¿Qué dicen los alumnos de CEMI?",
    respuesta: "Opiniones de nuestros alumnos:\n\n⭐⭐⭐⭐⭐ 4.8/5 promedio\n💬 \"Excelentes profesores\"\n💬 \"Método efectivo\"\n💬 \"Buena atención\"\n💬 \"Aprendí rápido\"\n\n*Conocé más testimonios en nuestra web y Google*",
    acciones: []
  },
  {
    id: 211,
    categoria: "faq",
    keywords: ["garantia", "devolucion", "no me gusto"],
    pregunta: "¿Qué pasa si no me gusta el curso?",
    respuesta: "Nuestra política:\n\n📚 **Clase de prueba** antes de inscribirte\n🔄 **Primera semana**: Devolución completa\n📋 **Después**: Sin devolución proporcional\n🔄 Podés **cambiar de grupo/horario**\n\n*Te ayudamos a encontrar la mejor opción*",
    acciones: []
  },
  {
    id: 212,
    categoria: "faq",
    keywords: ["cuantos alumnos", "grupos grandes", "cantidad por grupo"],
    pregunta: "¿Cuántos alumnos hay por grupo?",
    respuesta: "Grupos reducidos:\n\n👥 **Máximo**: 12 alumnos\n👥 **Promedio**: 8-10 alumnos\n👤 **Individual**: 1 alumno\n👥 **Clases virtuales**: Hasta 15\n\n*Grupos pequeños = más práctica y atención*",
    acciones: []
  },
  {
    id: 213,
    categoria: "faq",
    keywords: ["material propio", "libro incluido", "tengo que comprar"],
    pregunta: "¿El material está incluido?",
    respuesta: "Sobre los materiales:\n\n📚 **Digital**: Incluido en Classroom\n📖 **Libro físico**: Costo adicional (opcional)\n📋 **Fotocopias**: Incluidas\n🎧 **Audios/Videos**: Incluidos\n\n*Consultá por cada curso específico*",
    acciones: []
  },
  {
    id: 214,
    categoria: "faq",
    keywords: ["viaje intercambio", "estudiar afuera", "exterior"],
    pregunta: "¿Organizan viajes de intercambio?",
    respuesta: "Experiencias internacionales:\n\n✈️ **Viajes grupales** opcionales\n🏫 Convenios con instituciones del exterior\n📚 Asesoramiento para estudiar afuera\n🌍 Información sobre Work & Travel\n\n*Actividades extracurriculares optativas*",
    acciones: []
  },
  {
    id: 215,
    categoria: "faq",
    keywords: ["club conversacion", "practica oral", "hablar mas"],
    pregunta: "¿Tienen club de conversación?",
    respuesta: "¡Sí! Actividades extra:\n\n🗣️ **Club de conversación**: Semanal, gratuito\n☕ **Coffee talks**: Charlas informales\n🎬 **Movie club**: Pelis en idioma original\n📖 **Book club**: Lectura grupal\n\n*Participación opcional para alumnos*",
    acciones: []
  },
  {
    id: 216,
    categoria: "faq",
    keywords: ["certificado digital", "online certificado", "pdf certificado"],
    pregunta: "¿El certificado es digital o físico?",
    respuesta: "Formatos de certificados:\n\n📄 **Digital (PDF)**: Inmediato al aprobar\n📜 **Físico**: Entrega posterior en secretaría\n✅ Ambos tienen igual validez\n📧 Digital con firma electrónica\n\n*Elegís el que prefieras*",
    acciones: []
  },
  {
    id: 217,
    categoria: "faq",
    keywords: ["recomendacion", "que nivel empezar", "cual curso"],
    pregunta: "¿Qué curso me recomiendan?",
    respuesta: "Para recomendarte:\n\n1️⃣ Hacé el **test de nivel** gratuito\n2️⃣ Contanos tus **objetivos** (trabajo, viaje, etc.)\n3️⃣ Decinos tu **disponibilidad horaria**\n\n📞 Llamanos o vení a secretaría\n*Te asesoramos personalmente*",
    acciones: [{ texto: "Solicitar test", link: "https://wa.me/5493811234567?text=Hola!%20Quiero%20hacer%20el%20test%20de%20nivel" }]
  },
  {
    id: 218,
    categoria: "faq",
    keywords: ["constancia alumno regular", "certificado de alumno", "para trabajo"],
    pregunta: "¿Cómo pido una constancia de alumno regular?",
    respuesta: "Para obtener constancia:\n\n🏫 **Presencial**: Secretaría (24-48hs)\n📧 **Email**: Solicitá a info@cemi.edu.ar\n💻 **Classroom**: Sección Documentos\n💰 **Costo**: Gratuito (hasta 2 por cuatrimestre)\n\n*Indicá para qué la necesitás*",
    acciones: []
  },
  {
    id: 219,
    categoria: "faq",
    keywords: ["quejas", "reclamos", "no estoy conforme", "problema con"],
    pregunta: "¿Cómo presento una queja o reclamo?",
    respuesta: "Canales para reclamos:\n\n📋 **Libro de quejas** en secretaría\n📧 **Email**: direccion@cemi.edu.ar\n🏫 **Entrevista** con coordinación\n💬 **Formulario** en la web\n\n*Respondemos en 48-72hs hábiles*\n*Tu opinión nos importa*",
    acciones: []
  },

  // ============================================
  // CATEGORÍA 15: BENEFICIOS Y EXTRAS (11 respuestas)
  // ============================================
  {
    id: 220,
    categoria: "beneficios",
    keywords: ["descuento", "promo", "promocion", "oferta"],
    pregunta: "¿Tienen descuentos o promociones?",
    respuesta: "Descuentos vigentes:\n\n💰 **Pago anual**: 15% descuento\n💰 **Hermanos**: 10% c/u\n💰 **Ex-alumnos**: 10%\n💰 **Jubilados**: 20%\n💰 **Promo referidos**: $$ por cada referido\n\n*Consultá promos actuales en secretaría*",
    acciones: []
  },
  {
    id: 221,
    categoria: "beneficios",
    keywords: ["referido", "traer amigo", "recomendar"],
    pregunta: "¿Qué beneficio tengo si traigo un amigo?",
    respuesta: "Programa **Referidos CEMI**:\n\n👥 Referí un amigo\n✅ Cuando se inscribe\n🎁 Vos recibís: 1 clase gratis o descuento\n🎁 Tu amigo: 10% descuento inscripción\n\n*Sin límite de referidos*",
    acciones: []
  },
  {
    id: 222,
    categoria: "beneficios",
    keywords: ["convenio", "empresa convenio", "obra social"],
    pregunta: "¿Tienen convenios con empresas?",
    respuesta: "Sí, convenios corporativos:\n\n🏢 Empresas asociadas\n💼 Obras sociales\n🎓 Universidades\n📋 Colegios profesionales\n\n*Consultá si tu empresa tiene convenio*\n*Descuentos especiales para empleados*",
    acciones: []
  },
  {
    id: 223,
    categoria: "beneficios",
    keywords: ["wifi", "internet instituto", "conexion"],
    pregunta: "¿Hay WiFi en el instituto?",
    respuesta: "Conectividad disponible:\n\n📶 **WiFi gratuito** para alumnos\n🔑 Credenciales: Pedí en secretaría\n💻 Velocidad apta para clases\n⚡ Cobertura en todo el edificio\n\n*Uso responsable*",
    acciones: []
  },
  {
    id: 224,
    categoria: "beneficios",
    keywords: ["biblioteca", "libros prestar", "material consulta"],
    pregunta: "¿Tienen biblioteca?",
    respuesta: "Recursos bibliográficos:\n\n📚 **Biblioteca física**: En sede, consulta en sala\n📖 **Préstamo**: Con carnet de alumno\n💻 **Biblioteca digital**: En Classroom\n📒 Diccionarios, gramáticas, readers\n\n*Préstamo por 7 días, renovable*",
    acciones: []
  },
  {
    id: 225,
    categoria: "beneficios",
    keywords: ["cafeteria", "buffet", "comer", "snack"],
    pregunta: "¿Hay cafetería en el instituto?",
    respuesta: "Opciones para alimentarse:\n\n☕ **Máquina de café** disponible\n🥤 **Dispenser de agua**\n🍫 **Vending** de snacks\n🚫 No hay cafetería completa\n🍕 Locales cerca para comer\n\n*10 min de break entre clases largas*",
    acciones: []
  },
  {
    id: 226,
    categoria: "beneficios",
    keywords: ["actividad extra", "extracurricular", "ademas de clase"],
    pregunta: "¿Hay actividades extracurriculares?",
    respuesta: "Actividades extra para alumnos:\n\n🗣️ Club de conversación\n🎬 Cine en idioma original\n🎭 Obras de teatro\n📖 Club de lectura\n🎉 Fiestas temáticas\n🏆 Competencias y concursos\n\n*Participación opcional y mayormente gratuita*",
    acciones: []
  },
  {
    id: 227,
    categoria: "beneficios",
    keywords: ["carnet", "credencial", "identificacion alumno"],
    pregunta: "¿Me dan carnet de alumno?",
    respuesta: "Credencial de alumno:\n\n🎫 **Carnet físico**: Se entrega al inscribirse\n📱 **Credencial digital**: En la app\n✅ Sirve para: Biblioteca, descuentos, identificación\n🔄 Renovación anual\n\n*Cuidalo, tiene tus datos*",
    acciones: []
  },
  {
    id: 228,
    categoria: "beneficios",
    keywords: ["descuento cine", "beneficio alumno", "descuentos externos"],
    pregunta: "¿Tengo descuentos por ser alumno?",
    respuesta: "Beneficios externos:\n\n🎬 Descuentos en cines (verificar)\n📚 Librerías asociadas\n☕ Cafeterías cercanas\n🏋️ Gimnasios con convenio\n\n*Mostrando carnet de alumno vigente*\n*Beneficios pueden variar*",
    acciones: []
  },
  {
    id: 229,
    categoria: "beneficios",
    keywords: ["newsletter", "novedades", "email noticias"],
    pregunta: "¿Cómo me entero de novedades?",
    respuesta: "Mantenete informado:\n\n📧 **Newsletter**: Suscribite en la web\n📱 **App**: Notificaciones push\n📘 **Facebook**: /CEMIidiomas\n📸 **Instagram**: @cemi_idiomas\n🏫 **Cartelera**: En la sede\n\n*No te pierdas ninguna novedad*",
    acciones: []
  },
  {
    id: 230,
    categoria: "beneficios",
    keywords: ["experiencia alumni", "egresados", "comunidad ex"],
    pregunta: "¿Hay comunidad de egresados?",
    respuesta: "Comunidad CEMI Alumni:\n\n👥 Grupo de egresados\n📧 Newsletter especial\n🎓 Descuentos para volver\n📚 Acceso a recursos\n🤝 Networking profesional\n\n*Una vez CEMI, siempre CEMI*",
    acciones: []
  },

  // ============================================
  // CATEGORÍA 16: EXÁMENES Y EVALUACIONES (25)
  // ============================================
  {
    id: 231,
    categoria: "examenes",
    keywords: ["examen", "prueba", "evaluacion", "test"],
    pregunta: "¿Cómo son los exámenes?",
    respuesta: "Sistema de evaluación:\n\n📝 **Parciales**: Durante el cuatrimestre\n📋 **Final**: Al cierre del nivel\n✍️ **Escritos y orales**\n📊 Escala: 1-10 (aprobación: 6)\n\n*Evaluación continua del proceso*",
    acciones: []
  },
  {
    id: 232,
    categoria: "examenes",
    keywords: ["cuando examen", "fecha examen", "parcial cuando"],
    pregunta: "¿Cuándo son los exámenes?",
    respuesta: "Cronograma de evaluaciones:\n\n📅 **Parcial 1**: Semana 7-8\n📅 **Parcial 2**: Semana 14-15\n📅 **Final**: Última semana\n📧 Aviso previo por email\n\n*Fechas específicas en Classroom*",
    acciones: []
  },
  {
    id: 233,
    categoria: "examenes",
    keywords: ["aprobar", "nota minima", "cuanto necesito"],
    pregunta: "¿Qué nota necesito para aprobar?",
    respuesta: "Requisitos de aprobación:\n\n✅ **Nota mínima**: 6/10\n✅ **Asistencia**: 75% mínimo\n✅ **Trabajos**: Entregados\n📊 Promedio de parciales + final\n\n*60% = aprobado*",
    acciones: []
  },
  {
    id: 234,
    categoria: "examenes",
    keywords: ["reprobar", "desaprobar", "no aprobe", "me fue mal"],
    pregunta: "¿Qué pasa si no apruebo?",
    respuesta: "Si no aprobás:\n\n🔄 **Recuperatorio**: 1 instancia extra\n📅 Fecha: 2 semanas después del final\n📚 Podés recursar el nivel\n💬 Apoyo del docente\n\n*No te desanimes, es parte del proceso*",
    acciones: []
  },
  {
    id: 235,
    categoria: "examenes",
    keywords: ["recuperatorio", "segunda chance", "volver rendir"],
    pregunta: "¿Cómo funciona el recuperatorio?",
    respuesta: "Sistema de recuperación:\n\n📝 1 recuperatorio por materia\n📅 2 semanas post-examen\n💰 Sin costo adicional\n📋 Mismo formato que el original\n✅ Nota máxima: 10\n\n*Aprovechá esta oportunidad*",
    acciones: []
  },
  {
    id: 236,
    categoria: "examenes",
    keywords: ["oral", "examen oral", "hablar examen"],
    pregunta: "¿Hay examen oral?",
    respuesta: "Evaluación oral:\n\n🗣️ **Sí**, hay componente oral\n📊 Porcentaje: 30-40% de la nota\n👥 Individual o en parejas\n⏱️ Duración: 10-15 minutos\n📋 Temas: Conversación, descripción, opinión\n\n*Practicamos en clase*",
    acciones: []
  },
  {
    id: 237,
    categoria: "examenes",
    keywords: ["escrito", "examen escrito", "writing"],
    pregunta: "¿Cómo es el examen escrito?",
    respuesta: "Formato del examen escrito:\n\n📖 **Reading**: Comprensión lectora\n✍️ **Writing**: Redacción\n📝 **Grammar**: Ejercicios gramaticales\n🔤 **Vocabulary**: Vocabulario\n⏱️ Duración: 90-120 minutos",
    acciones: []
  },
  {
    id: 238,
    categoria: "examenes",
    keywords: ["listening", "audio examen", "escuchar"],
    pregunta: "¿El examen tiene listening?",
    respuesta: "Sección de Listening:\n\n👂 **Sí**, hay comprensión auditiva\n🎧 Audios con acentos variados\n📝 Respuestas múltiple choice\n🔄 Se escucha 2 veces\n📊 20-25% de la nota\n\n*Practicamos regularmente en clase*",
    acciones: []
  },
  {
    id: 239,
    categoria: "examenes",
    keywords: ["modelo examen", "ejemplo examen", "como es formato"],
    pregunta: "¿Hay modelo de examen para practicar?",
    respuesta: "Material de práctica:\n\n📚 **Modelos**: Disponibles en Classroom\n📝 Exámenes anteriores de práctica\n✅ Respuestas incluidas\n👨‍🏫 Simulacros en clase\n\n*El profe te guía en la preparación*",
    acciones: []
  },
  {
    id: 240,
    categoria: "examenes",
    keywords: ["estudiar examen", "preparar examen", "como estudio"],
    pregunta: "¿Cómo me preparo para el examen?",
    respuesta: "Tips para prepararte:\n\n📚 Revisá el material de clase\n📝 Hacé los ejercicios del libro\n🎧 Practicá listening diariamente\n✍️ Escribí textos de práctica\n🗣️ Hablá en voz alta\n📋 Usá los modelos de examen\n\n*Constancia > Intensidad*",
    acciones: []
  },
  {
    id: 241,
    categoria: "examenes",
    keywords: ["nervios examen", "ansiedad examen", "miedo examen"],
    pregunta: "Tengo nervios por el examen",
    respuesta: "Consejos para los nervios:\n\n😌 **Respirá profundo** antes de empezar\n📚 Estudiá con tiempo, no a último momento\n💤 Dormí bien la noche anterior\n🍎 Desayuná bien\n⏱️ Llegá temprano\n💪 ¡Confiá en tu preparación!\n\n*Es normal, pero podés manejarlo*",
    acciones: []
  },
  {
    id: 242,
    categoria: "examenes",
    keywords: ["faltar examen", "no puedo ir examen", "ausente examen"],
    pregunta: "¿Qué pasa si falto al examen?",
    respuesta: "En caso de ausencia:\n\n📋 Avisá con anticipación\n📄 Presentá justificativo médico\n📅 Se reprograma para otra fecha\n⚠️ Sin justificativo: Ausente = 1\n\n*Comunicalo antes si es posible*",
    acciones: []
  },
  {
    id: 243,
    categoria: "examenes",
    keywords: ["ver nota", "resultado examen", "como me fue"],
    pregunta: "¿Dónde veo mi nota del examen?",
    respuesta: "Resultados disponibles en:\n\n📊 **Classroom**: Sección Calificaciones\n📧 Notificación por email\n👨‍🏫 El profe comunica en clase\n⏱️ Tiempo: 7-10 días hábiles\n\n*Podés consultar al docente*",
    acciones: []
  },
  {
    id: 244,
    categoria: "examenes",
    keywords: ["revisar examen", "ver examen", "correccion"],
    pregunta: "¿Puedo ver mi examen corregido?",
    respuesta: "Revisión de examen:\n\n✅ Sí, podés pedirlo\n👨‍🏫 Coordiná con el profesor\n📋 En horario de consulta\n💬 Explicación de errores\n📚 Feedback para mejorar\n\n*Es tu derecho ver la corrección*",
    acciones: []
  },
  {
    id: 245,
    categoria: "examenes",
    keywords: ["reclamar nota", "no estoy de acuerdo", "apelar"],
    pregunta: "¿Puedo reclamar mi nota?",
    respuesta: "Proceso de revisión:\n\n1️⃣ Hablá primero con el profesor\n2️⃣ Si no hay acuerdo, pedí revisión formal\n3️⃣ Coordinación evalúa el caso\n⏱️ Plazo: 5 días hábiles post-nota\n\n*Siempre con respeto y fundamento*",
    acciones: []
  },
  {
    id: 246,
    categoria: "examenes",
    keywords: ["promocion", "promocionar", "sin final"],
    pregunta: "¿Se puede promocionar sin final?",
    respuesta: "Sistema de promoción:\n\n✅ Promedio de parciales ≥ 8\n✅ Asistencia ≥ 80%\n✅ Trabajos completos\n🎓 = Promoción directa\n\n*Esfuerzo durante el año tiene premio*",
    acciones: []
  },
  {
    id: 247,
    categoria: "examenes",
    keywords: ["libre", "rendir libre", "sin cursar"],
    pregunta: "¿Puedo rendir libre?",
    respuesta: "Modalidad libre:\n\n📋 Consultá disponibilidad\n📚 Programa completo del nivel\n📝 Examen escrito + oral\n💰 Arancel especial\n⚠️ Mayor exigencia\n\n*Recomendamos cursar para mejor preparación*",
    acciones: []
  },
  {
    id: 248,
    categoria: "examenes",
    keywords: ["equivalencia", "materias aprobadas", "reconocimiento"],
    pregunta: "¿Reconocen estudios previos?",
    respuesta: "Equivalencias:\n\n📋 Presentá certificado de estudios\n📝 Test de ubicación\n✅ Reconocemos niveles aprobados\n🏫 De instituciones reconocidas\n\n*Evitá repetir lo que ya sabés*",
    acciones: []
  },
  {
    id: 249,
    categoria: "examenes",
    keywords: ["nota promedio", "como calcula", "promedio"],
    pregunta: "¿Cómo se calcula el promedio?",
    respuesta: "Cálculo del promedio:\n\n📊 Parcial 1: 25%\n📊 Parcial 2: 25%\n📊 Trabajos: 20%\n📊 Final: 30%\n\n*Participación y asistencia pueden sumar*",
    acciones: []
  },
  {
    id: 250,
    categoria: "examenes",
    keywords: ["fecha limite", "hasta cuando", "ultimo dia"],
    pregunta: "¿Hasta cuándo puedo rendir?",
    respuesta: "Fechas límite:\n\n📅 **Ordinario**: Fin del cuatrimestre\n📅 **Recuperatorio**: 2 semanas después\n📅 **Extraordinario**: Consultar\n\n*No dejes pasar las fechas*",
    acciones: []
  },
  {
    id: 251,
    categoria: "examenes",
    keywords: ["parcial domiciliario", "trabajo practico", "tp"],
    pregunta: "¿Hay trabajos prácticos?",
    respuesta: "Trabajos durante la cursada:\n\n📝 TPs individuales y grupales\n📅 Fechas de entrega en Classroom\n📊 Cuentan para el promedio\n✅ Obligatorios para aprobar\n💻 Entrega online\n\n*Respetá las fechas*",
    acciones: []
  },
  {
    id: 252,
    categoria: "examenes",
    keywords: ["presentacion oral", "exposicion", "presentar tema"],
    pregunta: "¿Hay presentaciones orales?",
    respuesta: "Presentaciones en clase:\n\n🎤 Sí, hay exposiciones\n👥 Individuales o grupales\n📊 Temas asignados o a elección\n⏱️ 5-10 minutos\n📋 Rúbrica de evaluación\n\n*Excelente práctica para el oral*",
    acciones: []
  },
  {
    id: 253,
    categoria: "examenes",
    keywords: ["portfolio", "carpeta", "evidencias"],
    pregunta: "¿Debo armar un portfolio?",
    respuesta: "Portfolio de aprendizaje:\n\n📁 Opcional pero recomendado\n📝 Recopilá tus mejores trabajos\n📊 Muestra tu progreso\n🎯 Útil para autoevaluación\n💼 Sirve para el CV\n\n*Evidencia de tu aprendizaje*",
    acciones: []
  },
  {
    id: 254,
    categoria: "examenes",
    keywords: ["autoevaluacion", "evaluar propio", "autocritica"],
    pregunta: "¿Hay autoevaluación?",
    respuesta: "Instancias de autoevaluación:\n\n📋 Tests de práctica en Classroom\n🎯 Rúbricas de autochequeo\n💬 Reflexión post-examen\n📊 Seguimiento de progreso\n\n*Conocer tus fortalezas y debilidades*",
    acciones: []
  },
  {
    id: 255,
    categoria: "examenes",
    keywords: ["fraude", "copiar", "trampa examen"],
    pregunta: "¿Qué pasa si copian en el examen?",
    respuesta: "Política de integridad académica:\n\n🚫 Copia = Anulación del examen\n⚠️ Primera vez: Advertencia + recuperatorio\n❌ Reincidencia: Sanciones mayores\n📜 Acta de situación\n\n*Valoramos la honestidad*",
    acciones: []
  },

  // ============================================
  // CATEGORÍA 17: MATERIALES DE ESTUDIO (20)
  // ============================================
  {
    id: 256,
    categoria: "materiales",
    keywords: ["libro", "manual", "que libro usan"],
    pregunta: "¿Qué libros usan?",
    respuesta: "Material bibliográfico:\n\n📚 Libros de editoriales reconocidas\n📖 Cambridge, Oxford, Pearson\n🌍 Según el idioma\n📋 Lista específica por nivel\n\n*Te informamos al inscribirte*",
    acciones: []
  },
  {
    id: 257,
    categoria: "materiales",
    keywords: ["comprar libro", "donde consigo", "libreria"],
    pregunta: "¿Dónde compro los libros?",
    respuesta: "Opciones para adquirir material:\n\n🏪 Librería del instituto (mejor precio)\n📚 Librerías de la zona\n🛒 Online: MercadoLibre, Amazon\n📖 Usados: Grupos de alumnos\n\n*Consultá por material digitalizado*",
    acciones: []
  },
  {
    id: 258,
    categoria: "materiales",
    keywords: ["precio libro", "cuanto sale libro", "costo material"],
    pregunta: "¿Cuánto cuestan los libros?",
    respuesta: "Costos aproximados:\n\n📚 **Libro principal**: $15.000-25.000\n📖 **Workbook**: $8.000-15.000\n📋 **Material digital**: Incluido\n\n*Precios referenciales, pueden variar*\n*Hay opciones usadas más económicas*",
    acciones: []
  },
  {
    id: 259,
    categoria: "materiales",
    keywords: ["obligatorio libro", "necesario comprar", "sin libro"],
    pregunta: "¿Es obligatorio comprar el libro?",
    respuesta: "Sobre el material:\n\n📚 **Recomendado** tenerlo\n💻 Material digital complementario\n📖 Fotocopias de apoyo incluidas\n📋 Algunos niveles requieren libro\n\n*Consultá con tu profesor*",
    acciones: []
  },
  {
    id: 260,
    categoria: "materiales",
    keywords: ["material digital", "pdf", "ebook"],
    pregunta: "¿Hay material digital?",
    respuesta: "Recursos digitales disponibles:\n\n💻 PDFs en Classroom\n📱 Acceso desde app\n🎧 Audios descargables\n🎬 Videos complementarios\n📝 Ejercicios interactivos\n\n*Incluido en tu matrícula*",
    acciones: []
  },
  {
    id: 261,
    categoria: "materiales",
    keywords: ["fotocopia", "apunte", "resumen"],
    pregunta: "¿Dan fotocopias?",
    respuesta: "Material fotocopiado:\n\n📄 Sí, se proveen materiales\n📋 Ejercicios extras\n📝 Guías de estudio\n💰 Incluido en la cuota\n📂 También disponible digital\n\n*Organizate con carpeta o bibliorato*",
    acciones: []
  },
  {
    id: 262,
    categoria: "materiales",
    keywords: ["diccionario", "traductor", "wordreference"],
    pregunta: "¿Puedo usar diccionario en clase?",
    respuesta: "Uso de diccionario:\n\n📖 **En clase**: Sí, bilingüe o monolingüe\n📝 **En exámenes**: Depende del nivel\n📱 Apps recomendadas: WordReference, Linguee\n🚫 Evitar Google Translate para todo\n\n*Mejor aprender a deducir del contexto*",
    acciones: []
  },
  {
    id: 263,
    categoria: "materiales",
    keywords: ["app aprender", "aplicacion idioma", "duolingo"],
    pregunta: "¿Recomiendan apps para practicar?",
    respuesta: "Apps complementarias:\n\n📱 **Duolingo**: Vocabulario básico\n📱 **Babbel**: Conversación\n📱 **Anki**: Flashcards\n📱 **Spotify**: Podcasts en idiomas\n📱 **Netflix**: Subtítulos en idioma\n\n*Complemento, no reemplazo de clase*",
    acciones: []
  },
  {
    id: 264,
    categoria: "materiales",
    keywords: ["pelicula", "serie", "ver en idioma"],
    pregunta: "¿Recomiendan películas/series?",
    respuesta: "Contenido audiovisual:\n\n🎬 Empezá con subtítulos en español\n📺 Pasá a subtítulos en el idioma\n🎧 Finalmente sin subtítulos\n📋 Lista de recomendados en Classroom\n\n*Excelente para listening y vocabulario*",
    acciones: []
  },
  {
    id: 265,
    categoria: "materiales",
    keywords: ["podcast", "audio", "escuchar practica"],
    pregunta: "¿Qué podcasts recomiendan?",
    respuesta: "Podcasts por nivel:\n\n🔰 **Principiante**: 6 Minute English (BBC)\n📗 **Intermedio**: TED Talks, NPR\n📙 **Avanzado**: Noticias, debates\n🎧 Disponibles en Spotify, Apple Podcasts\n\n*15 min diarios hacen diferencia*",
    acciones: []
  },
  {
    id: 266,
    categoria: "materiales",
    keywords: ["musica", "canciones", "letra"],
    pregunta: "¿Sirve escuchar música?",
    respuesta: "Música para aprender:\n\n🎵 ¡Excelente recurso!\n📝 Buscá la letra (lyrics)\n🎤 Cantá para pronunciación\n📋 Analizá vocabulario\n🎧 Descubrí artistas del idioma\n\n*Aprender cantando es más divertido*",
    acciones: []
  },
  {
    id: 267,
    categoria: "materiales",
    keywords: ["libro lectura", "reader", "graded reader"],
    pregunta: "¿Hay libros de lectura graduados?",
    respuesta: "Lecturas graduadas:\n\n📖 **Graded Readers** por nivel\n📚 Clásicos adaptados\n📕 Historias originales\n🏫 Disponibles en biblioteca\n📱 Versiones digitales\n\n*Leer mejora vocabulario y gramática*",
    acciones: []
  },
  {
    id: 268,
    categoria: "materiales",
    keywords: ["gramatica", "libro gramatica", "explicacion"],
    pregunta: "¿Recomiendan libro de gramática?",
    respuesta: "Referencias gramaticales:\n\n📘 **English Grammar in Use** (Murphy)\n📗 **Essential Grammar in Use** (básico)\n📙 **Advanced Grammar in Use**\n💻 Versiones con ejercicios online\n\n*El clásico que todo estudiante debería tener*",
    acciones: []
  },
  {
    id: 269,
    categoria: "materiales",
    keywords: ["vocabulario", "lista palabras", "flashcard"],
    pregunta: "¿Cómo aprendo vocabulario?",
    respuesta: "Estrategias para vocabulario:\n\n📝 **Flashcards**: Físicas o app Anki\n📓 Cuaderno de vocabulario\n🏷️ Post-its en casa\n📱 App de palabras diarias\n🔁 Repetición espaciada\n\n*Mejor en contexto que listas aisladas*",
    acciones: []
  },
  {
    id: 270,
    categoria: "materiales",
    keywords: ["cuaderno", "carpeta", "como organizo"],
    pregunta: "¿Cómo organizo mis apuntes?",
    respuesta: "Organización recomendada:\n\n📓 Cuaderno o carpeta por materia\n🗂️ Separadores por unidad\n📝 Fecha en cada clase\n🖍️ Colores para destacar\n📋 Sección de vocabulario\n\n*Orden = mejor estudio*",
    acciones: []
  },

  // ============================================
  // CATEGORÍA 18: SALUDOS Y CORTESÍA (20)
  // ============================================
  {
    id: 271,
    categoria: "saludos",
    keywords: ["hola", "buenos dias", "buenas tardes", "buenas noches"],
    pregunta: "Hola",
    respuesta: "¡Hola! 👋 Bienvenido/a al asistente virtual de CEMI. ¿En qué puedo ayudarte hoy?\n\nPodés preguntarme sobre:\n📚 Cursos e idiomas\n📝 Inscripciones\n💰 Pagos y cuotas\n📍 Ubicación y horarios\n\n*Escribí tu consulta*",
    acciones: []
  },
  {
    id: 272,
    categoria: "saludos",
    keywords: ["como estas", "que tal", "como andas", "como va"],
    pregunta: "¿Cómo estás?",
    respuesta: "¡Muy bien, gracias por preguntar! 😊\n\nEstoy aquí las 24hs para ayudarte con cualquier consulta sobre CEMI.\n\n¿Qué necesitás saber?",
    acciones: []
  },
  {
    id: 273,
    categoria: "saludos",
    keywords: ["gracias", "muchas gracias", "te agradezco", "gracia"],
    pregunta: "Gracias",
    respuesta: "¡De nada! 😊 Es un placer ayudarte.\n\nSi tenés más consultas, no dudes en escribirme.\n\n¡Éxitos en tu aprendizaje! 🎓",
    acciones: []
  },
  {
    id: 274,
    categoria: "saludos",
    keywords: ["chau", "adios", "hasta luego", "nos vemos", "bye"],
    pregunta: "Chau",
    respuesta: "¡Hasta pronto! 👋\n\nGracias por consultar con CEMI. Cuando necesites ayuda, acá estaré.\n\n¡Que tengas un excelente día! 🌟",
    acciones: []
  },
  {
    id: 275,
    categoria: "saludos",
    keywords: ["quien sos", "que sos", "sos humano", "sos robot"],
    pregunta: "¿Quién sos?",
    respuesta: "¡Soy el **Asistente Virtual de CEMI**! 🤖\n\n💬 Respondo consultas frecuentes\n📚 Información sobre cursos\n🕐 Disponible 24/7\n🧠 Base de conocimiento actualizada\n\n*No soy humano, pero hago lo posible por ayudarte*",
    acciones: []
  },
  {
    id: 276,
    categoria: "saludos",
    keywords: ["ayuda", "ayudame", "necesito ayuda", "help"],
    pregunta: "Necesito ayuda",
    respuesta: "¡Claro, estoy para ayudarte! 💪\n\n¿Qué necesitás saber?\n\n📚 **Cursos**: Idiomas, niveles, modalidades\n📝 **Inscripción**: Requisitos, proceso\n💰 **Pagos**: Cuotas, descuentos\n📍 **Contacto**: Ubicación, teléfono\n\n*Escribí tu consulta específica*",
    acciones: []
  },
  {
    id: 277,
    categoria: "saludos",
    keywords: ["menu", "opciones", "que puedo preguntar", "temas"],
    pregunta: "¿Qué puedo preguntarte?",
    respuesta: "Puedo ayudarte con:\n\n🏫 **Instituto**: Sobre CEMI, metodología\n📚 **Cursos**: Idiomas, niveles, duracion\n📝 **Inscripción**: Requisitos, proceso\n💰 **Pagos**: Cuotas, descuentos, medios\n📍 **Ubicación**: Dirección, cómo llegar\n🕐 **Horarios**: Turnos, días\n👨‍🏫 **Docentes**: Profesores, metodología\n📜 **Certificados**: Validez, exámenes\n💻 **Plataforma**: Classroom, app\n🆘 **Soporte**: Problemas técnicos",
    acciones: []
  },
  {
    id: 278,
    categoria: "saludos",
    keywords: ["no entiendo", "no entendi", "explicame mejor"],
    pregunta: "No entiendo",
    respuesta: "¡Sin problema! Voy a ayudarte mejor. 🤔\n\n¿Podrías decirme específicamente qué querés saber?\n\nPor ejemplo:\n• \"¿Cómo me inscribo?\"\n• \"¿Cuánto cuesta?\"\n• \"¿Dónde están ubicados?\"\n\n*Mientras más específico, mejor te ayudo*",
    acciones: []
  },
  {
    id: 279,
    categoria: "saludos",
    keywords: ["perdon", "disculpa", "perdoname", "lo siento"],
    pregunta: "Perdón",
    respuesta: "¡No hay problema! 😊\n\n¿Hay algo en lo que pueda ayudarte?\n\nEstoy acá para resolver tus dudas, no te preocupes.",
    acciones: []
  },
  {
    id: 280,
    categoria: "saludos",
    keywords: ["genial", "excelente", "perfecto", "buenisimo", "copado"],
    pregunta: "¡Genial!",
    respuesta: "¡Me alegra poder ayudarte! 🎉\n\nSi tenés más preguntas, seguí consultando.\n\n¡Éxitos! 💪",
    acciones: []
  },

  // ============================================
  // CATEGORÍA 19: METODOLOGÍA (25)
  // ============================================
  {
    id: 281,
    categoria: "metodologia",
    keywords: ["enfoque comunicativo", "metodo comunicativo", "comunicarse"],
    pregunta: "¿Qué es el enfoque comunicativo?",
    respuesta: "El **enfoque comunicativo**:\n\n🗣️ Prioriza la comunicación real\n📚 Gramática en contexto\n🎯 Situaciones de la vida cotidiana\n👥 Interacción constante\n🧠 Aprender haciendo\n\n*Hablás desde el primer día*",
    acciones: []
  },
  {
    id: 282,
    categoria: "metodologia",
    keywords: ["hablar primera clase", "cuando hablo", "practica oral"],
    pregunta: "¿Cuándo empiezo a hablar?",
    respuesta: "¡Desde el primer día! 🗣️\n\n📚 Frases útiles desde la clase 1\n👥 Práctica en parejas\n🎮 Actividades interactivas\n🔄 Corrección constructiva\n\n*Perder el miedo es el primer paso*",
    acciones: []
  },
  {
    id: 283,
    categoria: "metodologia",
    keywords: ["gramatica cuando", "reglas gramaticales", "estructura"],
    pregunta: "¿Cuándo aprendo gramática?",
    respuesta: "Gramática en contexto:\n\n📝 Integrada en cada clase\n🎯 Después de usar la estructura\n📚 No memorización aislada\n💡 Deducción antes que explicación\n✍️ Práctica escrita complementaria\n\n*Primero usás, después entendés la regla*",
    acciones: []
  },
  {
    id: 284,
    categoria: "metodologia",
    keywords: ["4 habilidades", "skills", "competencias"],
    pregunta: "¿Qué habilidades desarrollo?",
    respuesta: "Las 4 habilidades lingüísticas:\n\n🗣️ **Speaking**: Expresión oral\n👂 **Listening**: Comprensión auditiva\n📖 **Reading**: Comprensión lectora\n✍️ **Writing**: Expresión escrita\n\n*Desarrollo equilibrado de todas*",
    acciones: []
  },
  {
    id: 285,
    categoria: "metodologia",
    keywords: ["inmersion", "solo idioma", "sin español"],
    pregunta: "¿Las clases son solo en el idioma?",
    respuesta: "Uso del idioma en clase:\n\n🔰 **Principiantes**: Mix con español\n📗 **Intermedio**: Mayormente en idioma\n📙 **Avanzado**: 100% en idioma\n💡 Instrucciones claras siempre\n\n*Inmersión gradual*",
    acciones: []
  },
  {
    id: 286,
    categoria: "metodologia",
    keywords: ["errores", "equivocarse", "correccion"],
    pregunta: "¿Me corrigen cuando me equivoco?",
    respuesta: "Corrección constructiva:\n\n✅ Sí, pero en el momento adecuado\n💬 Sin interrumpir la comunicación\n📝 Errores sistemáticos: se trabajan\n🎯 Foco en mejorar, no en juzgar\n💪 El error es parte del aprendizaje\n\n*Mejor equivocarse que quedarse callado*",
    acciones: []
  },
  {
    id: 287,
    categoria: "metodologia",
    keywords: ["actividades", "dinamica clase", "que hacemos"],
    pregunta: "¿Qué actividades hacemos en clase?",
    respuesta: "Actividades variadas:\n\n💬 Conversaciones y debates\n🎭 Role-plays y simulaciones\n🎮 Juegos didácticos\n🎧 Listening con audios/videos\n📖 Lectura de textos\n✍️ Escritura guiada\n👥 Trabajo en grupos\n\n*Cada clase es diferente*",
    acciones: []
  },
  {
    id: 288,
    categoria: "metodologia",
    keywords: ["tecnologia clase", "multimedia", "pantalla"],
    pregunta: "¿Usan tecnología en clase?",
    respuesta: "Recursos tecnológicos:\n\n💻 Proyector y pantalla\n📱 Apps educativas\n🎧 Audios de calidad\n🎬 Videos y películas\n🎮 Plataformas interactivas\n📋 Classroom digital\n\n*Tecnología al servicio del aprendizaje*",
    acciones: []
  },
  {
    id: 289,
    categoria: "metodologia",
    keywords: ["tarea", "deberes", "homework mucho"],
    pregunta: "¿Hay mucha tarea?",
    respuesta: "Sobre las tareas:\n\n📝 Sí, hay tarea semanal\n⏱️ 30-60 min estimados\n📚 Refuerza lo visto en clase\n💻 Mayormente online\n✅ Importante para avanzar\n\n*Sin práctica no hay progreso*",
    acciones: []
  },
  {
    id: 290,
    categoria: "metodologia",
    keywords: ["participar", "hablar clase", "timido"],
    pregunta: "Soy tímido, ¿me obligan a hablar?",
    respuesta: "Para los tímidos:\n\n🤗 Ambiente de confianza\n👥 Actividades en parejas primero\n📝 Podés preparar antes de hablar\n🎯 Participación gradual\n💪 El profe te apoya\n\n*Nadie te juzga, todos están aprendiendo*",
    acciones: []
  },
  {
    id: 291,
    categoria: "metodologia",
    keywords: ["ritmo clase", "muy rapido", "muy lento"],
    pregunta: "¿El ritmo de clase se adapta?",
    respuesta: "Ritmo de aprendizaje:\n\n📊 Se sigue al grupo mayoritario\n💬 Podés pedir que repitan\n📝 Material extra si vas adelantado\n🆘 Apoyo si te cuesta\n👨‍🏫 El profe ajusta según necesidad\n\n*Comunicá si el ritmo no te funciona*",
    acciones: []
  },
  {
    id: 292,
    categoria: "metodologia",
    keywords: ["dudas clase", "preguntar", "no entendi tema"],
    pregunta: "¿Puedo hacer preguntas en clase?",
    respuesta: "¡Absolutamente! 🙋\n\n✅ Las preguntas son bienvenidas\n💬 En cualquier momento\n🤝 Sin vergüenza\n💡 Ayudan a todos\n👨‍🏫 El profe explica las veces que haga falta\n\n*Preguntar es aprender*",
    acciones: []
  },
  {
    id: 293,
    categoria: "metodologia",
    keywords: ["cultura", "cultural", "paises idioma"],
    pregunta: "¿Aprendo sobre la cultura también?",
    respuesta: "Contenido cultural:\n\n🌍 Cultura de países del idioma\n🎉 Festividades y tradiciones\n🍽️ Gastronomía típica\n🎵 Música y arte\n📺 Series y películas\n💬 Expresiones coloquiales\n\n*El idioma y la cultura van juntos*",
    acciones: []
  },
  {
    id: 294,
    categoria: "metodologia",
    keywords: ["pronunciacion", "acento", "como sueno"],
    pregunta: "¿Trabajamos la pronunciación?",
    respuesta: "Trabajo de pronunciación:\n\n🗣️ Desde el primer día\n👂 Escuchar y repetir\n📱 Grabaciones propias\n🎯 Sonidos difíciles específicos\n🌍 Exposición a acentos variados\n\n*El objetivo es ser entendido*",
    acciones: []
  },
  {
    id: 295,
    categoria: "metodologia",
    keywords: ["repetir", "memorizar", "de memoria"],
    pregunta: "¿Hay que memorizar mucho?",
    respuesta: "Sobre la memorización:\n\n📝 Vocabulario: Sí, es necesario\n🧠 Gramática: Más comprensión que memoria\n🔄 Repetición espaciada\n🎯 En contexto, no listas\n💡 Mnemotecnia ayuda\n\n*Mejor usar que memorizar*",
    acciones: []
  },
  {
    id: 296,
    categoria: "metodologia",
    keywords: ["traduccion", "traducir", "pensar español"],
    pregunta: "¿Puedo traducir mentalmente?",
    respuesta: "Sobre la traducción:\n\n🔰 Al principio: Normal y esperado\n📗 Con práctica: Disminuye\n🧠 Objetivo: Pensar en el idioma\n⏱️ Es un proceso gradual\n💡 No te frustres\n\n*Con el tiempo, fluye naturalmente*",
    acciones: []
  },
  {
    id: 297,
    categoria: "metodologia",
    keywords: ["practica fuera", "fuera clase", "practicar solo"],
    pregunta: "¿Cómo practico fuera de clase?",
    respuesta: "Práctica autónoma:\n\n🎧 Música y podcasts\n📺 Series con subtítulos\n📱 Apps como Duolingo\n📖 Lecturas graduadas\n💬 Buscar intercambio\n📝 Escribir un diario\n🗣️ Hablar solo en voz alta\n\n*15 min diarios hacen diferencia*",
    acciones: []
  },
  {
    id: 298,
    categoria: "metodologia",
    keywords: ["objetivo clase", "logro", "que aprendo"],
    pregunta: "¿Cada clase tiene un objetivo?",
    respuesta: "Planificación de clases:\n\n🎯 Objetivo claro por clase\n📋 Secuencia lógica\n🔄 Repaso de lo anterior\n📚 Nuevo contenido\n✍️ Práctica\n📝 Cierre y resumen\n\n*Sabés qué aprendiste cada día*",
    acciones: []
  },
  {
    id: 299,
    categoria: "metodologia",
    keywords: ["retroalimentacion", "feedback", "como voy"],
    pregunta: "¿Recibo feedback de mi progreso?",
    respuesta: "Retroalimentación constante:\n\n👨‍🏫 Del profesor en clase\n📊 Notas en Classroom\n📝 Correcciones detalladas\n💬 Comentarios constructivos\n📈 Seguimiento de progreso\n\n*Sabés en qué mejorar*",
    acciones: []
  },
  {
    id: 300,
    categoria: "metodologia",
    keywords: ["motivacion", "no avanzo", "me frustro"],
    pregunta: "Me frustro porque no avanzo",
    respuesta: "Sobre la frustración:\n\n😊 Es normal, a todos nos pasa\n📈 El progreso no es lineal\n🎯 Celebrá pequeños logros\n💪 La constancia gana\n👨‍🏫 Hablá con tu profe\n🧘 Paciencia contigo mismo\n\n*Aprender un idioma lleva tiempo*",
    acciones: []
  },

  // ============================================
  // CATEGORÍA 20: NIÑOS Y ADOLESCENTES (20)
  // ============================================
  {
    id: 301,
    categoria: "ninos",
    keywords: ["niños", "chicos", "nenes", "infantil"],
    pregunta: "¿Tienen cursos para niños?",
    respuesta: "Cursos para niños:\n\n👶 **Kids** (4-6 años)\n🧒 **Children** (7-10 años)\n👦 **Pre-teens** (11-12 años)\n🎮 Metodología lúdica\n🎨 Juegos y canciones\n📚 Material colorido\n\n*Aprender jugando*",
    acciones: []
  },
  {
    id: 302,
    categoria: "ninos",
    keywords: ["adolescentes", "teens", "secundario"],
    pregunta: "¿Hay cursos para adolescentes?",
    respuesta: "Cursos para teens:\n\n👦 **Teens** (13-17 años)\n📱 Contenido actual y relevante\n🎵 Música, series, redes\n📚 Apoyo escolar integrado\n👥 Grupos por edad\n\n*Idiomas con onda para jóvenes*",
    acciones: []
  },
  {
    id: 303,
    categoria: "ninos",
    keywords: ["edad minima", "cuantos años", "desde que edad"],
    pregunta: "¿Desde qué edad aceptan?",
    respuesta: "Edades de ingreso:\n\n👶 **Mínimo**: 4 años\n🧒 Con madurez para grupo\n📋 Entrevista previa\n👨‍👩‍👧 Reunión con padres\n\n*Evaluamos caso por caso*",
    acciones: []
  },
  {
    id: 304,
    categoria: "ninos",
    keywords: ["metodo niños", "como enseñan niños", "juegan"],
    pregunta: "¿Cómo enseñan a los niños?",
    respuesta: "Metodología infantil:\n\n🎮 **Aprendizaje lúdico**\n🎵 Canciones y rimas\n🎨 Manualidades\n🎭 Teatro y role-play\n📺 Videos y animaciones\n🏃 Movimiento y juegos\n\n*Aprenden sin darse cuenta*",
    acciones: []
  },
  {
    id: 305,
    categoria: "ninos",
    keywords: ["duracion clase niños", "cuanto dura clase chicos"],
    pregunta: "¿Cuánto duran las clases de niños?",
    respuesta: "Duración según edad:\n\n👶 **4-6 años**: 45 minutos\n🧒 **7-10 años**: 60 minutos\n👦 **11-12 años**: 75 minutos\n👦 **Teens**: 90 minutos\n\n*Adaptado a la atención de cada edad*",
    acciones: []
  },
  {
    id: 306,
    categoria: "ninos",
    keywords: ["padres clase", "acompañar", "quedarme"],
    pregunta: "¿Los padres pueden quedarse?",
    respuesta: "Política con padres:\n\n👶 **Primera clase**: Sí, para adaptación\n📋 **Después**: Mejor que esperen afuera\n👀 **Clases abiertas**: Ocasionales\n📱 **Comunicación**: Por app/email\n\n*La independencia favorece el aprendizaje*",
    acciones: []
  },
  {
    id: 307,
    categoria: "ninos",
    keywords: ["profesor niños", "docente niños", "especializado"],
    pregunta: "¿Los profes están capacitados para niños?",
    respuesta: "Docentes especializados:\n\n👨‍🏫 Formación en enseñanza infantil\n🎓 Experiencia con niños\n❤️ Vocación y paciencia\n🎮 Manejo de dinámicas lúdicas\n👁️ Cuidado y atención\n\n*Profesionales preparados*",
    acciones: []
  },
  {
    id: 308,
    categoria: "ninos",
    keywords: ["grupo niños", "cuantos niños", "compañeritos"],
    pregunta: "¿Cuántos niños hay por grupo?",
    respuesta: "Tamaño de grupos infantiles:\n\n👶 **4-6 años**: Máximo 8\n🧒 **7-10 años**: Máximo 10\n👦 **11-17 años**: Máximo 12\n\n*Grupos reducidos para mejor atención*",
    acciones: []
  },
  {
    id: 309,
    categoria: "ninos",
    keywords: ["tarea niños", "deberes chicos", "estudiar casa"],
    pregunta: "¿Los niños llevan tarea?",
    respuesta: "Tareas para niños:\n\n👶 **4-6**: No, solo refuerzo en casa\n🧒 **7-10**: Poca, 15-20 min\n👦 **11-12**: Moderada, 30 min\n👦 **Teens**: Similar a adultos\n\n*Acorde a la edad*",
    acciones: []
  },
  {
    id: 310,
    categoria: "ninos",
    keywords: ["informe padres", "avance hijo", "como va mi hijo"],
    pregunta: "¿Informan a los padres del avance?",
    respuesta: "Comunicación con familias:\n\n📧 Informe mensual por email\n📋 Libreta de notas cuatrimestral\n👨‍👩‍👧 Reuniones de padres\n📱 App de comunicación\n💬 Consultas cuando necesiten\n\n*Familia y escuela trabajamos juntos*",
    acciones: []
  },
  {
    id: 311,
    categoria: "ninos",
    keywords: ["adaptacion", "primer dia", "llorar"],
    pregunta: "Mi hijo llora, ¿qué hago?",
    respuesta: "Período de adaptación:\n\n😢 Es normal al principio\n🤗 Profes con experiencia\n👋 Despedida corta y positiva\n⏱️ Generalmente dura poco\n💪 Confiá en el proceso\n\n*En 2-3 clases se adaptan*",
    acciones: []
  },
  {
    id: 312,
    categoria: "ninos",
    keywords: ["material niños", "libros chicos", "cuaderno"],
    pregunta: "¿Qué material necesitan los niños?",
    respuesta: "Material para niños:\n\n📚 Libro del curso (se indica)\n📓 Cuaderno de actividades\n🖍️ Lápices de colores\n✂️ Tijera y pegamento (chicos)\n📁 Carpeta\n\n*Lista completa al inscribirse*",
    acciones: []
  },
  {
    id: 313,
    categoria: "ninos",
    keywords: ["cumpleaños", "festejo", "celebrar clase"],
    pregunta: "¿Pueden festejar cumpleaños en clase?",
    respuesta: "Cumpleaños en el aula:\n\n🎂 Sí, coordinando con el profe\n🍰 Torta simple permitida\n⏱️ 15-20 min de festejo\n📧 Avisar con anticipación\n🎈 Sin decoración elaborada\n\n*¡Festejamos en inglés!*",
    acciones: []
  },
  {
    id: 314,
    categoria: "ninos",
    keywords: ["apoyo escolar", "ingles colegio", "ayuda escuela"],
    pregunta: "¿Sirve como apoyo para el colegio?",
    respuesta: "Apoyo escolar:\n\n✅ Complementa inglés del colegio\n📚 Más práctica oral\n📝 Refuerzo de contenidos\n🎯 Preparación para exámenes\n💪 Ventaja en el aula\n\n*Van adelantados en el cole*",
    acciones: []
  },
  {
    id: 315,
    categoria: "ninos",
    keywords: ["vacaciones niños", "verano chicos", "curso verano"],
    pregunta: "¿Hay cursos de verano para niños?",
    respuesta: "Cursos de verano:\n\n☀️ **Summer Camp** en enero\n🎮 Intensivo lúdico\n⏱️ 2-3 horas diarias\n🎨 Actividades especiales\n🏖️ Temática veraniega\n\n*¡Vacaciones aprendiendo!*",
    acciones: []
  },
  {
    id: 316,
    categoria: "ninos",
    keywords: ["examen niños", "evaluacion chicos", "prueba"],
    pregunta: "¿Los niños tienen exámenes?",
    respuesta: "Evaluación infantil:\n\n📝 Evaluación continua\n🎮 A través de actividades\n📊 Sin presión de notas\n🌟 Sistema de estrellas/stickers\n📋 Informe cualitativo\n\n*Evaluamos sin estresar*",
    acciones: []
  },
  {
    id: 317,
    categoria: "ninos",
    keywords: ["certificado niños", "diploma chicos"],
    pregunta: "¿Los niños reciben certificado?",
    respuesta: "Reconocimientos infantiles:\n\n📜 Diploma al finalizar nivel\n🏆 Medallas de logros\n🌟 Certificado de participación\n🎉 Acto de fin de año\n\n*Motivación para seguir aprendiendo*",
    acciones: []
  },
  {
    id: 318,
    categoria: "ninos",
    keywords: ["hermanos", "descuento hermanos", "dos hijos"],
    pregunta: "¿Hay descuento por hermanos?",
    respuesta: "Beneficio familiar:\n\n👨‍👩‍👧‍👦 **10% cada hermano**\n📋 Aplica desde el 2do hijo\n✅ Mismo año lectivo\n💰 Se descuenta de la cuota\n\n*Familia que aprende junta*",
    acciones: []
  },
  {
    id: 319,
    categoria: "ninos",
    keywords: ["snack", "merienda", "comen clase"],
    pregunta: "¿Los niños pueden merendar?",
    respuesta: "Merienda en clase:\n\n🥤 Pueden traer agua\n🍎 Snack saludable permitido\n⏱️ Break de 5 min en clases largas\n🚫 Sin golosinas ni comida chatarra\n🧹 Mantener limpio el aula\n\n*Alimentación saludable*",
    acciones: []
  },
  {
    id: 320,
    categoria: "ninos",
    keywords: ["necesidades especiales", "tea", "tdah", "inclusion"],
    pregunta: "¿Aceptan niños con necesidades especiales?",
    respuesta: "Inclusión educativa:\n\n✅ Evaluamos cada caso\n💬 Entrevista con familia\n📋 Adaptaciones posibles\n👨‍🏫 Docentes sensibilizados\n🤝 Trabajo en equipo\n\n*Cada niño es único*",
    acciones: []
  },

  // ============================================
  // CATEGORÍA 21: EMPRESAS (20)
  // ============================================
  {
    id: 321,
    categoria: "empresas",
    keywords: ["empresa", "corporativo", "in company", "oficina"],
    pregunta: "¿Tienen cursos para empresas?",
    respuesta: "Cursos corporativos:\n\n🏢 **In-Company**: En tu empresa\n📚 Programas a medida\n👥 Grupos o individuales\n⏰ Horarios flexibles\n📊 Seguimiento de resultados\n\n*Capacitamos a tu equipo*",
    acciones: [{ texto: "Solicitar info empresas", link: "mailto:info@cemi.edu.ar?subject=Consulta cursos corporativos" }]
  },
  {
    id: 322,
    categoria: "empresas",
    keywords: ["in company", "en empresa", "vienen a la empresa"],
    pregunta: "¿Pueden dar clases en mi empresa?",
    respuesta: "Modalidad In-Company:\n\n🏢 Clases en tu oficina\n👨‍🏫 Profesor asignado\n📋 Programa personalizado\n⏰ Horario que convenga\n🎯 Objetivos empresariales\n\n*Llevamos el idioma a vos*",
    acciones: []
  },
  {
    id: 323,
    categoria: "empresas",
    keywords: ["programa a medida", "personalizado empresa", "necesidades"],
    pregunta: "¿Diseñan programas a medida?",
    respuesta: "Programas personalizados:\n\n📊 Diagnóstico inicial\n🎯 Objetivos específicos\n📚 Contenido del rubro\n💼 Vocabulario técnico\n📈 Métricas de avance\n\n*Cada empresa es diferente*",
    acciones: []
  },
  {
    id: 324,
    categoria: "empresas",
    keywords: ["ingles negocios", "business english", "comercial"],
    pregunta: "¿Enseñan inglés de negocios?",
    respuesta: "Business English:\n\n💼 Reuniones y negociaciones\n📧 Emails profesionales\n📞 Llamadas y conferencias\n📊 Presentaciones\n✈️ Viajes de negocios\n🤝 Networking\n\n*Inglés para el mundo corporativo*",
    acciones: []
  },
  {
    id: 325,
    categoria: "empresas",
    keywords: ["cotizacion", "presupuesto empresa", "cuanto cuesta"],
    pregunta: "¿Cuánto cuesta para empresas?",
    respuesta: "Cotización corporativa:\n\n📋 Según cantidad de empleados\n⏰ Horas mensuales\n📍 Modalidad (presencial/online)\n📚 Material incluido o no\n\n*Pedí presupuesto sin compromiso*",
    acciones: [{ texto: "Pedir presupuesto", link: "mailto:info@cemi.edu.ar?subject=Solicitud presupuesto corporativo" }]
  },
  {
    id: 326,
    categoria: "empresas",
    keywords: ["factura empresa", "facturacion", "razon social"],
    pregunta: "¿Facturan a empresas?",
    respuesta: "Facturación corporativa:\n\n✅ Factura A o B\n🏢 A nombre de la empresa\n📋 Orden de compra si requieren\n💳 Pago por transferencia\n📧 Factura electrónica\n\n*Trámite administrativo simple*",
    acciones: []
  },
  {
    id: 327,
    categoria: "empresas",
    keywords: ["grupo empresa", "cantidad empleados", "minimo"],
    pregunta: "¿Cuántos empleados mínimo?",
    respuesta: "Cantidad para armar grupo:\n\n👥 **Mínimo**: 3-4 personas\n👤 **Individual**: También disponible\n📊 **Ideal**: 6-10 personas\n🎯 Niveles similares\n\n*Armamos grupos por nivel*",
    acciones: []
  },
  {
    id: 328,
    categoria: "empresas",
    keywords: ["horario empresa", "almuerzo", "antes trabajo"],
    pregunta: "¿Qué horarios manejan para empresas?",
    respuesta: "Horarios corporativos flexibles:\n\n🌅 **Early morning**: 7:00-9:00\n🍽️ **Almuerzo**: 12:00-14:00\n🌙 **After office**: 18:00-20:00\n📅 Frecuencia a convenir\n\n*Nos adaptamos a ustedes*",
    acciones: []
  },
  {
    id: 329,
    categoria: "empresas",
    keywords: ["evaluacion empleados", "test nivel", "diagnostico"],
    pregunta: "¿Evalúan el nivel de los empleados?",
    respuesta: "Diagnóstico inicial:\n\n📝 Test de nivel online\n🗣️ Entrevista oral opcional\n📊 Reporte por empleado\n🎯 Agrupamiento por nivel\n📋 Recomendaciones\n\n*Sin costo como parte del servicio*",
    acciones: []
  },
  {
    id: 330,
    categoria: "empresas",
    keywords: ["seguimiento empresa", "reporte", "informe progreso"],
    pregunta: "¿Informan el progreso a la empresa?",
    respuesta: "Reportes corporativos:\n\n📊 Informe mensual de asistencia\n📈 Avance por empleado\n🎯 Cumplimiento de objetivos\n📋 Reporte cuatrimestral detallado\n💬 Reuniones de feedback\n\n*Transparencia total*",
    acciones: []
  },
  {
    id: 331,
    categoria: "empresas",
    keywords: ["cancelacion clase empresa", "ausencia", "falta grupo"],
    pregunta: "¿Qué pasa si cancelamos una clase?",
    respuesta: "Política de cancelación:\n\n⏰ Aviso 24hs antes: Se reprograma\n⚠️ Menos de 24hs: Se cobra\n🔄 Clases de recuperación posibles\n📅 Flexibilidad razonable\n\n*Comunicación clara*",
    acciones: []
  },
  {
    id: 332,
    categoria: "empresas",
    keywords: ["contrato empresa", "duracion convenio", "anual"],
    pregunta: "¿Cómo es el contrato?",
    respuesta: "Convenios corporativos:\n\n📋 Contrato anual o cuatrimestral\n🔄 Renovación automática opcional\n📅 Período de prueba: 1 mes\n⚖️ Condiciones claras\n💼 Área de RRHH gestiona\n\n*Términos negociables*",
    acciones: []
  },
  {
    id: 333,
    categoria: "empresas",
    keywords: ["online empresa", "virtual corporativo", "remoto"],
    pregunta: "¿Hay opción online para empresas?",
    respuesta: "Clases virtuales corporativas:\n\n💻 100% online disponible\n🌍 Ideal para equipos remotos\n📹 Plataformas profesionales\n📚 Material digital\n🎯 Misma calidad que presencial\n\n*Sin límites geográficos*",
    acciones: []
  },
  {
    id: 334,
    categoria: "empresas",
    keywords: ["certificado empresa", "diploma empleado", "constancia"],
    pregunta: "¿Entregan certificados a empleados?",
    respuesta: "Certificación corporativa:\n\n📜 Certificado por nivel completado\n📋 Constancia de participación\n📊 Especifica horas y contenidos\n🏢 Logo de la empresa opcional\n\n*Valor agregado para el empleado*",
    acciones: []
  },
  {
    id: 335,
    categoria: "empresas",
    keywords: ["idioma tecnico", "vocabulario sector", "especializado"],
    pregunta: "¿Enseñan vocabulario de mi sector?",
    respuesta: "Vocabulario especializado:\n\n🏥 Médico/Salud\n💻 IT/Tecnología\n⚖️ Legal\n🏦 Finanzas/Banca\n🛒 Comercio/Retail\n🏭 Industria\n✈️ Turismo/Hotelería\n\n*Personalizamos según tu rubro*",
    acciones: []
  },
  {
    id: 336,
    categoria: "empresas",
    keywords: ["rotacion", "cambio empleados", "nuevo integrante"],
    pregunta: "¿Qué pasa si hay rotación de personal?",
    respuesta: "Gestión de rotación:\n\n🔄 Nuevos empleados se integran\n📝 Evaluación de nivel\n👥 Se ubican en grupo adecuado\n📚 Material de nivelación\n💰 Sin costo extra de incorporación\n\n*Flexibilidad ante cambios*",
    acciones: []
  },
  {
    id: 337,
    categoria: "empresas",
    keywords: ["material empresa", "libro corporativo", "recursos"],
    pregunta: "¿Qué material usan en empresas?",
    respuesta: "Material corporativo:\n\n📚 Libros de Business English\n📋 Material propio CEMI\n💼 Casos del rubro\n📰 Artículos actuales\n📹 Videos profesionales\n\n*Contenido relevante para el trabajo*",
    acciones: []
  },
  {
    id: 338,
    categoria: "empresas",
    keywords: ["beneficio empleado", "perk", "bienestar"],
    pregunta: "¿Sirve como beneficio para empleados?",
    respuesta: "Idiomas como beneficio:\n\n🎁 Excelente perk laboral\n💼 Desarrollo profesional\n🌍 Oportunidades internacionales\n😊 Mejora clima laboral\n📈 Retención de talento\n\n*Inversión en tu equipo*",
    acciones: []
  },
  {
    id: 339,
    categoria: "empresas",
    keywords: ["pyme", "pequeña empresa", "startup"],
    pregunta: "¿Tienen opciones para PyMEs?",
    respuesta: "Programas para PyMEs:\n\n💰 Precios accesibles\n👥 Grupos pequeños\n📅 Flexibilidad horaria\n🎯 Objetivos concretos\n📈 Escalar según necesidad\n\n*Soluciones a medida de tu presupuesto*",
    acciones: []
  },
  {
    id: 340,
    categoria: "empresas",
    keywords: ["referencia", "clientes", "quienes trabajaron"],
    pregunta: "¿Tienen referencias de empresas?",
    respuesta: "Nuestros clientes:\n\n🏢 Empresas de diversos rubros\n📋 Referencias disponibles\n⭐ Testimonios verificables\n🤝 Relaciones de largo plazo\n\n*Pedí referencias al solicitar presupuesto*",
    acciones: []
  },
  
  // ========== VIDA ESTUDIANTIL (341-365) ==========
  {
    id: 341,
    categoria: "vida_estudiantil",
    keywords: ["grupo", "estudio", "compañeros", "estudiar juntos"],
    pregunta: "¿Hay grupos de estudio?",
    respuesta: "Sí, fomentamos grupos de estudio:\n\n👥 Grupos WhatsApp por nivel\n📚 Sesiones de práctica grupal\n🗣️ Conversation clubs\n🤝 Intercambio entre alumnos\n\n*Se forman naturalmente en clase*",
    acciones: []
  },
  {
    id: 342,
    categoria: "vida_estudiantil",
    keywords: ["actividad", "extracurricular", "extra", "adicional"],
    pregunta: "¿Hay actividades extracurriculares?",
    respuesta: "Ofrecemos actividades extra:\n\n🎬 Movie nights con películas\n☕ Coffee talks conversacionales\n🎵 Karaoke en inglés\n🎮 Game sessions didácticos\n📖 Book club mensual\n\n*Consulta el calendario de eventos*",
    acciones: []
  },
  {
    id: 343,
    categoria: "vida_estudiantil",
    keywords: ["amigo", "conocer", "gente", "socializar"],
    pregunta: "¿Puedo conocer gente nueva?",
    respuesta: "CEMI es una comunidad:\n\n👋 Ambiente amigable y acogedor\n🌍 Estudiantes de todas las edades\n🤝 Actividades de integración\n💬 Grupos de práctica\n\n*Muchos alumnos han hecho amistades duraderas aquí*",
    acciones: []
  },
  {
    id: 344,
    categoria: "vida_estudiantil",
    keywords: ["intercambio", "cultural", "internacional"],
    pregunta: "¿Tienen intercambios culturales?",
    respuesta: "Experiencias interculturales:\n\n🌎 Conexión con hablantes nativos\n🎌 Celebración de festividades internacionales\n📺 Exposición a diferentes acentos\n🍽️ Eventos gastronómicos temáticos\n\n*Aprender idiomas es abrir puertas al mundo*",
    acciones: []
  },
  {
    id: 345,
    categoria: "vida_estudiantil",
    keywords: ["evento", "especial", "celebracion"],
    pregunta: "¿Celebran eventos especiales?",
    respuesta: "Nuestros eventos:\n\n🎃 Halloween party\n🎄 Christmas celebration\n🎭 Carnival activities\n🎓 Ceremonia de graduación\n📅 Aniversario institucional\n\n*Te avisamos por email y redes*",
    acciones: []
  },
  {
    id: 346,
    categoria: "vida_estudiantil",
    keywords: ["concurso", "competencia", "torneo"],
    pregunta: "¿Hay concursos o competencias?",
    respuesta: "Organizamos competencias:\n\n🏆 Spelling bee (deletreo)\n🎤 Speech contest (oratoria)\n✍️ Writing competition\n🎯 Quiz nights\n📚 Reading challenges\n\n*Son opcionales pero muy divertidas*",
    acciones: []
  },
  {
    id: 347,
    categoria: "vida_estudiantil",
    keywords: ["voluntario", "ayudar", "colaborar"],
    pregunta: "¿Puedo colaborar como voluntario?",
    respuesta: "Oportunidades de voluntariado:\n\n👨‍🏫 Tutor de compañeros\n📢 Embajador estudiantil\n🎪 Organización de eventos\n📸 Contenido para redes\n\n*Hablá con coordinación si te interesa*",
    acciones: []
  },
  {
    id: 348,
    categoria: "vida_estudiantil",
    keywords: ["redes", "sociales", "instagram", "facebook"],
    pregunta: "¿Tienen redes sociales?",
    respuesta: "Seguinos en redes:\n\n📷 Instagram: @cemi_idiomas\n👥 Facebook: CEMI Centro de Idiomas\n📺 YouTube: CEMI Oficial\n💼 LinkedIn: CEMI\n\n*Contenido educativo y novedades*",
    acciones: []
  },
  {
    id: 349,
    categoria: "vida_estudiantil",
    keywords: ["newsletter", "boletin", "novedades", "email"],
    pregunta: "¿Tienen newsletter?",
    respuesta: "Boletín informativo:\n\n📧 Newsletter mensual\n📰 Novedades y eventos\n💡 Tips de aprendizaje\n🎁 Promociones exclusivas\n\n*Te suscribís automáticamente al inscribirte*",
    acciones: []
  },
  {
    id: 350,
    categoria: "vida_estudiantil",
    keywords: ["alumni", "egresados", "ex alumnos"],
    pregunta: "¿Hay comunidad de egresados?",
    respuesta: "Red de egresados CEMI:\n\n👨‍🎓 Grupo Alumni exclusivo\n🤝 Networking profesional\n📢 Ofertas laborales\n🎓 Eventos de reencuentro\n💼 Bolsa de trabajo\n\n*Una vez CEMI, siempre CEMI*",
    acciones: []
  },
  {
    id: 351,
    categoria: "vida_estudiantil",
    keywords: ["cafeteria", "cafe", "snack", "comer"],
    pregunta: "¿Hay cafetería en el instituto?",
    respuesta: "Servicios disponibles:\n\n☕ Máquina de café\n💧 Dispenser de agua\n🍪 Snacks en recepción\n📍 Locales gastronómicos cercanos\n\n*Podés traer tu comida y usar el espacio común*",
    acciones: []
  },
  {
    id: 352,
    categoria: "vida_estudiantil",
    keywords: ["wifi", "internet", "conexion"],
    pregunta: "¿Tienen WiFi para alumnos?",
    respuesta: "Conectividad:\n\n📶 WiFi gratuito de alta velocidad\n🔐 Red segura para estudiantes\n💻 Acceso en todas las aulas\n📱 Ideal para clases online\n\n*Pedí la clave en recepción*",
    acciones: []
  },
  {
    id: 353,
    categoria: "vida_estudiantil",
    keywords: ["biblioteca", "libros", "prestar"],
    pregunta: "¿Tienen biblioteca?",
    respuesta: "Recursos bibliográficos:\n\n📚 Biblioteca con material didáctico\n📖 Libros de lectura por nivel\n💿 Material audiovisual\n📲 Préstamos a domicilio\n\n*Presentando tu carnet de alumno*",
    acciones: []
  },
  {
    id: 354,
    categoria: "vida_estudiantil",
    keywords: ["estacionar", "auto", "parking"],
    pregunta: "¿Hay estacionamiento?",
    respuesta: "Opciones de estacionamiento:\n\n🚗 No tenemos parking propio\n🅿️ Estacionamientos públicos cercanos\n🚌 Fácil acceso en transporte público\n🚲 Estacionamiento para bicicletas\n\n*Consulta ubicación de parkings cercanos*",
    acciones: []
  },
  {
    id: 355,
    categoria: "vida_estudiantil",
    keywords: ["mascota", "perro", "gato", "animal"],
    pregunta: "¿Puedo ir con mascotas?",
    respuesta: "Política de mascotas:\n\n🐾 No se permiten mascotas en aulas\n🦮 Excepción: perros de asistencia\n🏠 Las clases online son pet-friendly 😄\n\n*Tu mascota te espera en casa*",
    acciones: []
  },
  {
    id: 356,
    categoria: "vida_estudiantil",
    keywords: ["fumar", "cigarro", "tabaco"],
    pregunta: "¿Se puede fumar en el instituto?",
    respuesta: "Espacio libre de humo:\n\n🚭 Prohibido fumar en todo el edificio\n✅ Área exterior designada\n💚 Ambiente saludable\n\n*Respetamos la salud de todos*",
    acciones: []
  },
  {
    id: 357,
    categoria: "vida_estudiantil",
    keywords: ["vestimenta", "ropa", "dress code"],
    pregunta: "¿Hay código de vestimenta?",
    respuesta: "Vestimenta:\n\n👕 No hay dress code formal\n👖 Ropa cómoda y casual\n👟 Vení como te sientas bien\n🎨 Expresá tu estilo\n\n*Lo importante es que estés cómodo para aprender*",
    acciones: []
  },
  {
    id: 358,
    categoria: "vida_estudiantil",
    keywords: ["cumpleaños", "cumple", "festejar"],
    pregunta: "¿Se festejan cumpleaños?",
    respuesta: "Celebraciones:\n\n🎂 Festejamos cumpleaños en clase\n🎈 Momentos de integración\n🎁 Sorpresas ocasionales\n📸 Fotos grupales\n\n*¡Avisanos cuándo es tu cumple!*",
    acciones: []
  },
  {
    id: 359,
    categoria: "vida_estudiantil",
    keywords: ["foto", "fotos", "fotografia", "filmar"],
    pregunta: "¿Puedo tomar fotos en clase?",
    respuesta: "Política de fotografía:\n\n📷 Fotos del pizarrón: ✅\n📹 Grabar clase: solo con permiso\n🤳 Selfies grupales: ¡claro!\n📸 Uso en redes: consultar\n\n*Respetamos la privacidad de todos*",
    acciones: []
  },
  {
    id: 360,
    categoria: "vida_estudiantil",
    keywords: ["celular", "telefono", "movil", "smartphone"],
    pregunta: "¿Puedo usar el celular en clase?",
    respuesta: "Uso de celular:\n\n📱 Modo silencio durante clase\n📲 Uso educativo permitido\n📵 Llamadas afuera del aula\n💡 Apps de idiomas: ¡bienvenidas!\n\n*El celular puede ser una herramienta de aprendizaje*",
    acciones: []
  },
  {
    id: 361,
    categoria: "vida_estudiantil",
    keywords: ["notebook", "laptop", "computadora", "tablet"],
    pregunta: "¿Puedo llevar mi notebook?",
    respuesta: "Dispositivos permitidos:\n\n💻 Notebooks: ✅\n📱 Tablets: ✅\n🔌 Enchufes disponibles\n📶 WiFi incluido\n\n*Ideal para tomar notas y practicar*",
    acciones: []
  },
  {
    id: 362,
    categoria: "vida_estudiantil",
    keywords: ["comida", "comer", "clase", "snack"],
    pregunta: "¿Puedo comer en clase?",
    respuesta: "Alimentos en clase:\n\n☕ Bebidas: ✅ (con tapa)\n🍪 Snacks discretos: ✅\n🍕 Comidas completas: ❌\n🧹 Mantener limpio el espacio\n\n*Una galletita para el break está bien*",
    acciones: []
  },
  {
    id: 363,
    categoria: "vida_estudiantil",
    keywords: ["baño", "toilette", "sanitario"],
    pregunta: "¿Dónde están los baños?",
    respuesta: "Instalaciones:\n\n🚻 Baños en cada piso\n♿ Baño accesible disponible\n🧼 Siempre equipados\n🚿 Limpios y mantenidos\n\n*Podés ir cuando necesites*",
    acciones: []
  },
  {
    id: 364,
    categoria: "vida_estudiantil",
    keywords: ["locker", "guardar", "casillero"],
    pregunta: "¿Tienen lockers?",
    respuesta: "Almacenamiento:\n\n🔐 No tenemos lockers individuales\n📦 Podés dejar cosas en recepción\n🎒 Llevar pertenencias a clase\n\n*No nos hacemos responsables por objetos olvidados*",
    acciones: []
  },
  {
    id: 365,
    categoria: "vida_estudiantil",
    keywords: ["perdido", "encontrado", "perdi", "olvide"],
    pregunta: "¿Dónde están objetos perdidos?",
    respuesta: "Objetos perdidos:\n\n📦 Consultá en recepción\n⏰ Guardamos 30 días\n📧 Avisanos por email\n📱 Te contactamos si encontramos algo\n\n*Siempre revisá tus pertenencias*",
    acciones: []
  },
  
  // ========== TRÁMITES ADMINISTRATIVOS (366-390) ==========
  {
    id: 366,
    categoria: "tramites",
    keywords: ["constancia", "alumno", "regular"],
    pregunta: "¿Cómo pido constancia de alumno regular?",
    respuesta: "Constancia de alumno regular:\n\n📋 Pedila en administración\n⏰ Lista en 24-48 horas\n📄 Incluye: nombre, curso, horario\n💰 Sin costo adicional\n\n*Presentá tu DNI para retirarla*",
    acciones: []
  },
  {
    id: 367,
    categoria: "tramites",
    keywords: ["constancia", "notas", "calificaciones"],
    pregunta: "¿Cómo obtengo constancia de notas?",
    respuesta: "Constancia de calificaciones:\n\n📊 Solicitá en administración\n📋 Incluye todas tus notas\n⏰ 48-72 horas de elaboración\n✅ Firmada y sellada\n\n*Ideal para trámites externos*",
    acciones: []
  },
  {
    id: 368,
    categoria: "tramites",
    keywords: ["certificado", "estudio", "estudios"],
    pregunta: "¿Emiten certificado de estudios?",
    respuesta: "Certificado de estudios:\n\n📜 Detalle completo de cursada\n📊 Niveles completados\n⏰ Horas de estudio\n✅ Validez institucional\n\n*Costo: consultar en administración*",
    acciones: []
  },
  {
    id: 369,
    categoria: "tramites",
    keywords: ["reembolso", "devolucion", "devolver dinero"],
    pregunta: "¿Hacen devolución de dinero?",
    respuesta: "Política de reembolsos:\n\n📋 Evaluamos caso por caso\n⏰ Antes de iniciar: reembolso parcial\n❌ Iniciado el curso: no hay devolución\n💳 Crédito a favor disponible\n\n*Consultá condiciones específicas*",
    acciones: []
  },
  {
    id: 370,
    categoria: "tramites",
    keywords: ["factura", "comprobante", "fiscal"],
    pregunta: "¿Emiten factura?",
    respuesta: "Facturación:\n\n🧾 Factura B para particulares\n📋 Factura A para empresas/monotributistas\n📧 Envío digital por email\n📄 Podés pedirla en administración\n\n*Indicá tus datos fiscales al pagar*",
    acciones: []
  },
  {
    id: 371,
    categoria: "tramites",
    keywords: ["cambio", "datos", "actualizar", "direccion"],
    pregunta: "¿Cómo actualizo mis datos?",
    respuesta: "Actualización de datos:\n\n📧 Email: avisá a administración\n📱 Teléfono: informá el cambio\n🏠 Dirección: actualizala para entregas\n📋 DNI: presentá documentación\n\n*Mantené tus datos actualizados*",
    acciones: []
  },
  {
    id: 372,
    categoria: "tramites",
    keywords: ["carnet", "credencial", "tarjeta alumno"],
    pregunta: "¿Dan carnet de estudiante?",
    respuesta: "Credencial estudiantil:\n\n🎫 Carnet CEMI incluido\n📷 Traé foto carnet o la sacamos\n💳 Formato práctico\n🎁 Beneficios con comercios asociados\n\n*Lo recibís al confirmar inscripción*",
    acciones: []
  },
  {
    id: 373,
    categoria: "tramites",
    keywords: ["baja", "cancelar", "dar de baja"],
    pregunta: "¿Cómo doy de baja mi inscripción?",
    respuesta: "Proceso de baja:\n\n📧 Avisá por email a administración\n⏰ Con 10 días de anticipación\n📋 Completá formulario de baja\n💳 Si hay saldo: crédito a favor\n\n*Siempre podés volver cuando quieras*",
    acciones: []
  },
  {
    id: 374,
    categoria: "tramites",
    keywords: ["licencia", "pausar", "congelar"],
    pregunta: "¿Puedo pausar mis estudios?",
    respuesta: "Licencia temporal:\n\n⏸️ Podés pausar hasta 3 meses\n📋 Avisá con anticipación\n💰 No se cobran cuotas\n🔄 Retomás en el mismo nivel\n\n*Ideal para viajes o situaciones especiales*",
    acciones: []
  },
  {
    id: 375,
    categoria: "tramites",
    keywords: ["reincorporacion", "volver", "retomar"],
    pregunta: "¿Cómo me reincorporo después de una pausa?",
    respuesta: "Reincorporación:\n\n📞 Contactá a administración\n📊 Evaluamos tu nivel actual\n📅 Te ubicamos en grupo compatible\n💰 Retomás pagos normalmente\n\n*Si pasó mucho tiempo, hacemos nivelación*",
    acciones: []
  },
  {
    id: 376,
    categoria: "tramites",
    keywords: ["duplicado", "certificado", "perdido"],
    pregunta: "¿Cómo pido duplicado de certificado?",
    respuesta: "Duplicado de certificado:\n\n📋 Solicitá en administración\n📝 Completá formulario\n💰 Costo: consultar\n⏰ 5-7 días hábiles\n\n*Guardá siempre copias digitales*",
    acciones: []
  },
  {
    id: 377,
    categoria: "tramites",
    keywords: ["carta", "recomendacion", "referencia laboral"],
    pregunta: "¿Dan cartas de recomendación?",
    respuesta: "Cartas de recomendación:\n\n✅ Para alumnos destacados\n📋 Solicitá a tu profesor\n📝 Indicá el propósito\n⏰ 3-5 días de elaboración\n\n*Incluye evaluación de desempeño*",
    acciones: []
  },
  {
    id: 378,
    categoria: "tramites",
    keywords: ["apostilla", "legalizar", "exterior"],
    pregunta: "¿Los certificados sirven para apostillar?",
    respuesta: "Certificados para exterior:\n\n📜 Emitimos certificados oficiales\n✅ Aptos para apostilla\n📋 Verificá requisitos del país destino\n💰 Apostilla: trámite aparte\n\n*Te orientamos en el proceso*",
    acciones: []
  },
  {
    id: 379,
    categoria: "tramites",
    keywords: ["traduccion", "certificado", "traducir"],
    pregunta: "¿Traducen certificados?",
    respuesta: "Traducción de documentos:\n\n🌐 No ofrecemos servicio de traducción\n📋 Podemos recomendar traductores\n✅ Nuestros certificados son bilingües\n📝 Formato claro y profesional\n\n*Consultá sobre formato específico*",
    acciones: []
  },
  {
    id: 380,
    categoria: "tramites",
    keywords: ["convenio", "universidad", "validez"],
    pregunta: "¿Tienen convenios con universidades?",
    respuesta: "Convenios institucionales:\n\n🎓 Acuerdos con universidades locales\n📋 Reconocimiento de niveles\n💰 Descuentos cruzados\n🌐 Red de instituciones amigas\n\n*Consultá convenios vigentes*",
    acciones: []
  },
  {
    id: 381,
    categoria: "tramites",
    keywords: ["seguro", "accidente", "cobertura"],
    pregunta: "¿Tienen seguro de accidentes?",
    respuesta: "Cobertura de seguro:\n\n🏥 Seguro de accidentes en sede\n📋 Cobertura durante clases\n🚑 Asistencia de emergencia\n📝 Parte de tu inscripción\n\n*Detalle en reglamento institucional*",
    acciones: []
  },
  {
    id: 382,
    categoria: "tramites",
    keywords: ["queja", "reclamo", "disconforme"],
    pregunta: "¿Cómo hago un reclamo?",
    respuesta: "Canal de reclamos:\n\n📧 Email a dirección\n📋 Libro de quejas disponible\n📞 Atención personalizada\n⏰ Respuesta en 48-72 horas\n\n*Tu opinión nos ayuda a mejorar*",
    acciones: []
  },
  {
    id: 383,
    categoria: "tramites",
    keywords: ["sugerencia", "idea", "propuesta"],
    pregunta: "¿Cómo hago sugerencias?",
    respuesta: "Buzón de sugerencias:\n\n📧 Email a coordinación\n📝 Formulario en recepción\n💬 Hablá con tu profesor\n📋 Encuestas periódicas\n\n*Valoramos tu feedback*",
    acciones: []
  },
  {
    id: 384,
    categoria: "tramites",
    keywords: ["deuda", "debo", "atrasado", "moroso"],
    pregunta: "¿Qué pasa si tengo deuda?",
    respuesta: "Gestión de deudas:\n\n💰 Consultá tu estado en administración\n📋 Planes de regularización\n🤝 Flexibilidad según caso\n⚠️ Deuda limita acceso a certificados\n\n*Mejor resolver cuanto antes*",
    acciones: []
  },
  {
    id: 385,
    categoria: "tramites",
    keywords: ["convenio", "pago", "obra social"],
    pregunta: "¿Aceptan convenios de obra social?",
    respuesta: "Convenios:\n\n🏥 Algunas obras sociales tienen convenio\n📋 Consultá si la tuya está incluida\n💰 Reintegros según plan\n📝 Te damos factura para presentar\n\n*Lista actualizada en administración*",
    acciones: []
  },
  {
    id: 386,
    categoria: "tramites",
    keywords: ["plan", "cuotas", "financiar"],
    pregunta: "¿Financian cursos largos?",
    respuesta: "Financiación:\n\n💳 Pago en cuotas mensuales\n📅 Débito automático disponible\n🏷️ Descuento por pago anual\n📋 Plan personalizado\n\n*Armamos plan según tu necesidad*",
    acciones: []
  },
  {
    id: 387,
    categoria: "tramites",
    keywords: ["presupuesto", "cotizacion", "precio empresas"],
    pregunta: "¿Hacen presupuestos para empresas?",
    respuesta: "Presupuestos corporativos:\n\n📋 Cotización personalizada\n💼 Según cantidad de empleados\n🎯 Objetivos específicos\n📧 Enviamos propuesta formal\n\n*Solicitar a cursos@cemi.edu.ar*",
    acciones: []
  },
  {
    id: 388,
    categoria: "tramites",
    keywords: ["comprobante", "pago", "recibo"],
    pregunta: "¿Dan comprobante de pago?",
    respuesta: "Comprobantes:\n\n🧾 Recibo por cada pago\n📧 Versión digital por email\n📋 Historial en tu cuenta\n💳 Detalle de transacciones\n\n*Guardalo para tus registros*",
    acciones: []
  },
  {
    id: 389,
    categoria: "tramites",
    keywords: ["inscripcion", "formulario", "datos", "llenar"],
    pregunta: "¿Qué datos piden para inscribirse?",
    respuesta: "Datos de inscripción:\n\n📋 Nombre completo y DNI\n📧 Email y teléfono\n🏠 Dirección\n📅 Fecha de nacimiento\n📊 Nivel de idioma previo\n\n*Proceso simple y rápido*",
    acciones: []
  },
  {
    id: 390,
    categoria: "tramites",
    keywords: ["menor", "edad", "autorizacion", "padres"],
    pregunta: "¿Menores necesitan autorización?",
    respuesta: "Menores de edad:\n\n📋 Autorización de padres/tutores\n📝 Firma en formulario\n📞 Datos de contacto adulto\n✅ DNI del responsable\n\n*Requerido para inscripción y exámenes*",
    acciones: []
  },
  
  // ========== CULTURA Y VIAJES (391-415) ==========
  {
    id: 391,
    categoria: "cultura_viajes",
    keywords: ["viaje", "exterior", "estudiar afuera"],
    pregunta: "¿Puedo estudiar en el exterior con CEMI?",
    respuesta: "Estudiar en el exterior:\n\n🌍 Te preparamos para la experiencia\n📋 Asesoramiento sobre destinos\n📝 Cartas de recomendación\n🎯 Nivel adecuado para el viaje\n\n*Planificá con tiempo tu aventura*",
    acciones: []
  },
  {
    id: 392,
    categoria: "cultura_viajes",
    keywords: ["intercambio", "estudiante", "exchange"],
    pregunta: "¿Ofrecen programas de intercambio?",
    respuesta: "Intercambios:\n\n🌐 No gestionamos intercambios directamente\n📋 Colaboramos con agencias especializadas\n✅ Preparación lingüística\n📝 Documentación necesaria\n\n*Te orientamos en el proceso*",
    acciones: []
  },
  {
    id: 393,
    categoria: "cultura_viajes",
    keywords: ["visa", "trabajo", "exterior", "migrar"],
    pregunta: "¿El certificado sirve para tramitar visa?",
    respuesta: "Certificados y visas:\n\n📜 Certificamos tu nivel de idioma\n✅ Válido para algunas embajadas\n📋 Consulta requisitos específicos\n🎯 Preparación para entrevistas\n\n*Cada país tiene sus requisitos*",
    acciones: []
  },
  {
    id: 394,
    categoria: "cultura_viajes",
    keywords: ["trabajar", "exterior", "emigrar"],
    pregunta: "¿Me preparan para trabajar afuera?",
    respuesta: "Preparación laboral internacional:\n\n📝 CV en idioma extranjero\n🎤 Entrevistas laborales\n💼 Vocabulario profesional\n🌐 Cultura laboral de otros países\n\n*Clases específicas disponibles*",
    acciones: []
  },
  {
    id: 395,
    categoria: "cultura_viajes",
    keywords: ["cultura", "pais", "costumbres"],
    pregunta: "¿Enseñan sobre la cultura de otros países?",
    respuesta: "Contenido cultural:\n\n🌍 Costumbres y tradiciones\n🎉 Festividades importantes\n🍽️ Gastronomía típica\n🎭 Arte y entretenimiento\n📖 Historia y sociedad\n\n*Idioma y cultura van de la mano*",
    acciones: []
  },
  {
    id: 396,
    categoria: "cultura_viajes",
    keywords: ["turismo", "viajar", "vacaciones"],
    pregunta: "¿Hay cursos para turismo?",
    respuesta: "Inglés para viajeros:\n\n✈️ Vocabulario de aeropuerto\n🏨 Reservas de hotel\n🍴 Restaurantes y pedidos\n🗺️ Indicaciones y transporte\n🆘 Emergencias básicas\n\n*Curso intensivo de supervivencia*",
    acciones: []
  },
  {
    id: 397,
    categoria: "cultura_viajes",
    keywords: ["acento", "britanico", "americano", "australiano"],
    pregunta: "¿Enseñan diferentes acentos?",
    respuesta: "Variedad de acentos:\n\n🇺🇸 Americano (estándar)\n🇬🇧 Británico\n🇦🇺 Australiano\n🇮🇪 Irlandés\n🌐 Exposición a todos\n\n*Entrenamiento auditivo incluido*",
    acciones: []
  },
  {
    id: 398,
    categoria: "cultura_viajes",
    keywords: ["modismo", "slang", "jerga", "coloquial"],
    pregunta: "¿Enseñan expresiones coloquiales?",
    respuesta: "Lenguaje coloquial:\n\n💬 Frases hechas comunes\n🗣️ Slang actualizado\n😄 Expresiones informales\n🎬 Lenguaje de películas/series\n\n*Fundamental para entender nativos*",
    acciones: []
  },
  {
    id: 399,
    categoria: "cultura_viajes",
    keywords: ["frase", "viaje", "basico", "supervivencia"],
    pregunta: "¿Cuáles son las frases básicas para viajar?",
    respuesta: "Frases esenciales:\n\n👋 Greetings / Saludos\n🆘 Help, please! / ¡Ayuda!\n📍 Where is...? / ¿Dónde está...?\n💰 How much? / ¿Cuánto cuesta?\n🙏 Thank you / Gracias\n\n*Lo mínimo para sobrevivir*",
    acciones: []
  },
  {
    id: 400,
    categoria: "cultura_viajes",
    keywords: ["historia", "idioma", "origen", "evolucion"],
    pregunta: "¿Enseñan historia del idioma?",
    respuesta: "Historia lingüística:\n\n📚 Origen del inglés\n🌍 Influencias de otros idiomas\n📖 Evolución histórica\n🗣️ Variantes regionales\n\n*Contenido opcional interesante*",
    acciones: []
  },
  {
    id: 401,
    categoria: "cultura_viajes",
    keywords: ["literatura", "clasico", "shakespeare"],
    pregunta: "¿Estudian literatura clásica?",
    respuesta: "Literatura:\n\n📚 Lectura adaptada por nivel\n🎭 Shakespeare para avanzados\n📖 Novelas clásicas\n✍️ Poesía en inglés\n\n*Opcional en niveles superiores*",
    acciones: []
  },
  {
    id: 402,
    categoria: "cultura_viajes",
    keywords: ["musica", "canciones", "aprender cantando"],
    pregunta: "¿Usan música para enseñar?",
    respuesta: "Música en clase:\n\n🎵 Canciones populares\n📝 Análisis de letras\n🎤 Karaoke didáctico\n👂 Ejercicios de listening\n🎶 Todos los géneros\n\n*La música mejora la pronunciación*",
    acciones: []
  },
  {
    id: 403,
    categoria: "cultura_viajes",
    keywords: ["pelicula", "serie", "netflix", "ver en ingles"],
    pregunta: "¿Recomiendan series para aprender?",
    respuesta: "Series recomendadas:\n\n📺 Friends (principiantes)\n📺 The Office (intermedio)\n📺 Breaking Bad (avanzado)\n📺 The Crown (británico)\n📺 Documentales (variado)\n\n*Empezá con subtítulos en inglés*",
    acciones: []
  },
  {
    id: 404,
    categoria: "cultura_viajes",
    keywords: ["libro", "lectura", "leer en ingles"],
    pregunta: "¿Qué libros recomiendan para principiantes?",
    respuesta: "Lecturas recomendadas:\n\n📖 Graded readers (por nivel)\n📚 Cuentos infantiles clásicos\n📕 Novelas adaptadas\n📗 Cómics y graphic novels\n\n*Empezá con textos cortos*",
    acciones: []
  },
  {
    id: 405,
    categoria: "cultura_viajes",
    keywords: ["podcast", "audio", "escuchar ingles"],
    pregunta: "¿Qué podcasts recomiendan?",
    respuesta: "Podcasts para aprender:\n\n🎧 6 Minute English (BBC)\n🎧 All Ears English\n🎧 English Learning for Curious Minds\n🎧 Espresso English\n🎧 TED Talks (avanzado)\n\n*Escuchá mientras viajás*",
    acciones: []
  },
  {
    id: 406,
    categoria: "cultura_viajes",
    keywords: ["youtuber", "youtube", "canal", "videos"],
    pregunta: "¿Qué canales de YouTube recomiendan?",
    respuesta: "Canales recomendados:\n\n📺 EngVid (gramática)\n📺 Rachel's English (pronunciación)\n📺 English with Lucy\n📺 BBC Learning English\n📺 JenniferESL\n\n*Contenido gratuito de calidad*",
    acciones: []
  },
  {
    id: 407,
    categoria: "cultura_viajes",
    keywords: ["app", "aplicacion", "duolingo", "babbel"],
    pregunta: "¿Qué apps recomiendan complementar?",
    respuesta: "Apps recomendadas:\n\n📱 Duolingo (vocabulario)\n📱 Anki (flashcards)\n📱 HelloTalk (chat nativos)\n📱 Lyrics Training (canciones)\n📱 BBC Learning English\n\n*Complementan pero no reemplazan clases*",
    acciones: []
  },
  {
    id: 408,
    categoria: "cultura_viajes",
    keywords: ["juego", "game", "divertido", "aprender jugando"],
    pregunta: "¿Hay juegos para aprender inglés?",
    respuesta: "Juegos educativos:\n\n🎮 Scrabble (vocabulario)\n🎮 Taboo (descripción)\n🎮 Pictionary (creatividad)\n🎮 Videojuegos en inglés\n🎮 Trivia nights\n\n*Aprender jugando es más efectivo*",
    acciones: []
  },
  {
    id: 409,
    categoria: "cultura_viajes",
    keywords: ["pensar", "ingles", "traducir", "mental"],
    pregunta: "¿Cómo dejo de traducir mentalmente?",
    respuesta: "Pensar en inglés:\n\n🧠 Practica describir tu día\n💭 Nombra objetos mentalmente\n📝 Lleva un diario en inglés\n🗣️ Hablá solo (en serio)\n⏰ Aumenta exposición diaria\n\n*Lleva tiempo pero se logra*",
    acciones: []
  },
  {
    id: 410,
    categoria: "cultura_viajes",
    keywords: ["miedo", "hablar", "verguenza", "timidez"],
    pregunta: "¿Cómo supero el miedo a hablar?",
    respuesta: "Superar la timidez:\n\n😊 Errores son parte del proceso\n👥 Ambiente sin juicio en clase\n🗣️ Practicar en voz alta solo\n📈 Empezar con frases simples\n🎯 Celebrar pequeños logros\n\n*Todos pasamos por eso*",
    acciones: []
  },
  {
    id: 411,
    categoria: "cultura_viajes",
    keywords: ["frustrar", "dificil", "no avanzo", "estancado"],
    pregunta: "¿Qué hago si me siento estancado?",
    respuesta: "Superar el estancamiento:\n\n📊 Es normal en el aprendizaje\n🔄 Cambia tu método de estudio\n🎯 Fijá metas pequeñas\n🎬 Varía el contenido\n🗣️ Hablá con tu profesor\n\n*Los mesetas son parte del camino*",
    acciones: []
  },
  {
    id: 412,
    categoria: "cultura_viajes",
    keywords: ["motivacion", "ganas", "aburrido"],
    pregunta: "¿Cómo mantengo la motivación?",
    respuesta: "Mantener motivación:\n\n🎯 Recordá por qué empezaste\n📅 Rutina de estudio fija\n🏆 Celebrá cada avance\n🌍 Pensá en tus metas\n👥 Estudia con otros\n\n*La constancia supera al talento*",
    acciones: []
  },
  {
    id: 413,
    categoria: "cultura_viajes",
    keywords: ["tiempo", "estudiar", "dedicar", "horas"],
    pregunta: "¿Cuánto tiempo debo estudiar por día?",
    respuesta: "Tiempo de estudio:\n\n⏰ Mínimo: 15-30 min/día\n📚 Ideal: 1 hora/día\n🎯 Consistencia > Intensidad\n📅 Mejor poco todos los días\n🧠 Descansos son importantes\n\n*Calidad sobre cantidad*",
    acciones: []
  },
  {
    id: 414,
    categoria: "cultura_viajes",
    keywords: ["rapido", "urgente", "acelerar", "intensivo"],
    pregunta: "¿Puedo aprender rápido?",
    respuesta: "Aprendizaje acelerado:\n\n⚡ Cursos intensivos disponibles\n📚 Más horas = más rápido\n🧠 Inmersión total ayuda\n⏰ Realista: 3-6 meses por nivel\n💡 Depende de tu dedicación\n\n*No hay atajos mágicos*",
    acciones: []
  },
  {
    id: 415,
    categoria: "cultura_viajes",
    keywords: ["inmersion", "sumergirse", "rodearse"],
    pregunta: "¿Cómo hago inmersión sin viajar?",
    respuesta: "Inmersión en casa:\n\n📺 Cambiar idioma del celular\n🎬 Series/películas sin subtítulos\n🎵 Música en inglés\n📱 Redes en inglés\n📖 Leer en inglés\n🗣️ Hablar solo\n\n*Creá tu burbuja de inglés*",
    acciones: []
  },
  
  // ========== VOCABULARIO ESPECÍFICO (416-440) ==========
  {
    id: 416,
    categoria: "vocabulario",
    keywords: ["vocabulario", "palabras", "memorizar"],
    pregunta: "¿Cómo memorizo vocabulario?",
    respuesta: "Técnicas de memorización:\n\n📝 Flashcards (Anki)\n🔄 Repetición espaciada\n📖 Leer en contexto\n🗣️ Usar palabras nuevas\n📓 Llevar cuaderno de vocab\n\n*Aprender en contexto es clave*",
    acciones: []
  },
  {
    id: 417,
    categoria: "vocabulario",
    keywords: ["cuantas", "palabras", "necesito", "suficiente"],
    pregunta: "¿Cuántas palabras necesito saber?",
    respuesta: "Vocabulario por nivel:\n\n🔰 Básico: 500-1000 palabras\n🔷 Intermedio: 2000-4000\n🔶 Avanzado: 5000-10000\n📖 Nativo: 20000-35000\n\n*Con 3000 entendés el 90% de conversaciones*",
    acciones: []
  },
  {
    id: 418,
    categoria: "vocabulario",
    keywords: ["falso", "cognado", "false friend"],
    pregunta: "¿Qué son los false friends?",
    respuesta: "False friends (falsos cognados):\n\n❌ Actually ≠ Actualmente (= Currently)\n❌ Embarassed ≠ Embarazada (= Pregnant)\n❌ Sensible ≠ Sensible (= Sensitive)\n❌ Library ≠ Librería (= Bookstore)\n\n*Cuidado con estos*",
    acciones: []
  },
  {
    id: 419,
    categoria: "vocabulario",
    keywords: ["phrasal", "verb", "verbo fraseal"],
    pregunta: "¿Qué son los phrasal verbs?",
    respuesta: "Phrasal verbs:\n\n📚 Verbo + preposición/adverbio\n💡 Cambian el significado\n🔑 Muy usados en conversación\n📝 Ejemplos: get up, look for, give up\n\n*Los vemos desde nivel intermedio*",
    acciones: []
  },
  {
    id: 420,
    categoria: "vocabulario",
    keywords: ["idiom", "expresion", "frase hecha"],
    pregunta: "¿Qué son los idioms?",
    respuesta: "Idioms (expresiones idiomáticas):\n\n🌧️ It's raining cats and dogs\n💡 Break a leg (buena suerte)\n🎯 Hit the nail on the head\n⏰ Better late than never\n\n*No se traducen literalmente*",
    acciones: []
  },
  {
    id: 421,
    categoria: "vocabulario",
    keywords: ["sinonimo", "antonimo", "palabras similares"],
    pregunta: "¿Enseñan sinónimos y antónimos?",
    respuesta: "Vocabulario ampliado:\n\n📚 Sinónimos enriquecen el habla\n↔️ Antónimos para contrastar\n📖 Thesaurus recomendado\n🎯 Evitar repetición\n\n*Fundamental para writing avanzado*",
    acciones: []
  },
  {
    id: 422,
    categoria: "vocabulario",
    keywords: ["formal", "informal", "registro"],
    pregunta: "¿Cuál es la diferencia entre formal e informal?",
    respuesta: "Registros del idioma:\n\n👔 Formal: trabajo, académico\n👕 Informal: amigos, familia\n📧 Emails según contexto\n🗣️ Saludos diferentes\n\n*Saber cuándo usar cada uno*",
    acciones: []
  },
  {
    id: 423,
    categoria: "vocabulario",
    keywords: ["conectores", "linking", "palabras enlace"],
    pregunta: "¿Qué conectores debo aprender?",
    respuesta: "Conectores esenciales:\n\n➕ However, Therefore, Moreover\n📝 In addition, Furthermore\n↔️ On the other hand\n🔚 In conclusion, Finally\n\n*Mejoran la coherencia del discurso*",
    acciones: []
  },
  {
    id: 424,
    categoria: "vocabulario",
    keywords: ["collocations", "combinacion", "palabras juntas"],
    pregunta: "¿Qué son las collocations?",
    respuesta: "Collocations:\n\n🔗 Palabras que van juntas\n✅ Make a decision (no do a decision)\n✅ Take a photo (no make a photo)\n✅ Heavy rain (no strong rain)\n\n*Suenan natural para nativos*",
    acciones: []
  },
  {
    id: 425,
    categoria: "vocabulario",
    keywords: ["prefijo", "sufijo", "word formation"],
    pregunta: "¿Enseñan formación de palabras?",
    respuesta: "Word formation:\n\n🔤 Prefijos: un-, re-, dis-\n🔤 Sufijos: -tion, -ment, -ly\n📚 Familias de palabras\n🧩 Construir vocabulario\n\n*Multiplicá tu vocabulario*",
    acciones: []
  },
  {
    id: 426,
    categoria: "vocabulario",
    keywords: ["numeros", "contar", "fechas", "horas"],
    pregunta: "¿Enseñan números y fechas?",
    respuesta: "Números y tiempo:\n\n🔢 Cardinales y ordinales\n📅 Fechas (formato diferente)\n⏰ Decir la hora\n💰 Precios y cantidades\n📊 Porcentajes\n\n*Básico pero importante*",
    acciones: []
  },
  {
    id: 427,
    categoria: "vocabulario",
    keywords: ["familia", "parientes", "parentesco"],
    pregunta: "¿Vocabulario de familia?",
    respuesta: "Familia en inglés:\n\n👨‍👩‍👧 Parents, siblings, children\n👴 Grandparents, grandchildren\n👫 In-laws, step-family\n🤝 Relatives, ancestors\n\n*Tema de primer nivel*",
    acciones: []
  },
  {
    id: 428,
    categoria: "vocabulario",
    keywords: ["comida", "alimentos", "cocina", "recetas"],
    pregunta: "¿Vocabulario de comida?",
    respuesta: "Food vocabulary:\n\n🍎 Fruits and vegetables\n🥩 Meat and seafood\n🍳 Cooking verbs\n🍽️ Restaurant vocabulary\n📋 Recipes and ingredients\n\n*Tema muy práctico*",
    acciones: []
  },
  {
    id: 429,
    categoria: "vocabulario",
    keywords: ["ropa", "vestimenta", "moda"],
    pregunta: "¿Vocabulario de ropa?",
    respuesta: "Clothing vocabulary:\n\n👔 Shirt, pants, dress\n👟 Shoes, boots, sneakers\n🧥 Jacket, coat, sweater\n💍 Accessories\n🛍️ Shopping for clothes\n\n*Útil para compras*",
    acciones: []
  },
  {
    id: 430,
    categoria: "vocabulario",
    keywords: ["casa", "hogar", "habitaciones", "muebles"],
    pregunta: "¿Vocabulario del hogar?",
    respuesta: "Home vocabulary:\n\n🏠 Rooms of the house\n🛋️ Furniture\n🔌 Appliances\n🧹 Household chores\n🏡 Describing your home\n\n*Tema de nivel inicial*",
    acciones: []
  },
  {
    id: 431,
    categoria: "vocabulario",
    keywords: ["trabajo", "oficina", "profesion"],
    pregunta: "¿Vocabulario de trabajo?",
    respuesta: "Work vocabulary:\n\n💼 Jobs and professions\n🏢 Office vocabulary\n📧 Business emails\n📊 Meetings and presentations\n🤝 Interviews\n\n*Esencial para Business English*",
    acciones: []
  },
  {
    id: 432,
    categoria: "vocabulario",
    keywords: ["salud", "medico", "hospital", "enfermedad"],
    pregunta: "¿Vocabulario de salud?",
    respuesta: "Health vocabulary:\n\n🏥 Doctor visits\n💊 Symptoms and medicine\n🩺 Body parts\n🚑 Emergencies\n😷 Common illnesses\n\n*Importante para viajes*",
    acciones: []
  },
  {
    id: 433,
    categoria: "vocabulario",
    keywords: ["deporte", "ejercicio", "gym"],
    pregunta: "¿Vocabulario de deportes?",
    respuesta: "Sports vocabulary:\n\n⚽ Team sports\n🏃 Individual sports\n🏋️ Gym and fitness\n🏆 Competitions\n📺 Sports commentary\n\n*Para fans del deporte*",
    acciones: []
  },
  {
    id: 434,
    categoria: "vocabulario",
    keywords: ["tecnologia", "computadora", "internet"],
    pregunta: "¿Vocabulario de tecnología?",
    respuesta: "Tech vocabulary:\n\n💻 Computer terms\n📱 Mobile technology\n🌐 Internet and social media\n🎮 Gaming vocabulary\n🔧 Troubleshooting\n\n*Muy actual y útil*",
    acciones: []
  },
  {
    id: 435,
    categoria: "vocabulario",
    keywords: ["clima", "tiempo", "estaciones"],
    pregunta: "¿Vocabulario del clima?",
    respuesta: "Weather vocabulary:\n\n☀️ Sunny, cloudy, rainy\n🌡️ Temperature expressions\n🍂 Seasons\n⛈️ Extreme weather\n💬 Small talk about weather\n\n*Tema clásico de conversación*",
    acciones: []
  },
  {
    id: 436,
    categoria: "vocabulario",
    keywords: ["emociones", "sentimientos", "estado animo"],
    pregunta: "¿Vocabulario de emociones?",
    respuesta: "Emotions vocabulary:\n\n😊 Happy, excited, pleased\n😢 Sad, disappointed, upset\n😠 Angry, frustrated, annoyed\n😨 Scared, worried, nervous\n😮 Surprised, amazed, shocked\n\n*Expresar sentimientos*",
    acciones: []
  },
  {
    id: 437,
    categoria: "vocabulario",
    keywords: ["ciudad", "transporte", "direcciones"],
    pregunta: "¿Vocabulario de ciudad?",
    respuesta: "City vocabulary:\n\n🏙️ Places in a city\n🚌 Transportation\n🗺️ Giving directions\n🏪 Shops and services\n🚦 Traffic and streets\n\n*Esencial para viajar*",
    acciones: []
  },
  {
    id: 438,
    categoria: "vocabulario",
    keywords: ["animales", "mascota", "naturaleza"],
    pregunta: "¿Vocabulario de animales?",
    respuesta: "Animal vocabulary:\n\n🐕 Pets and domestic animals\n🦁 Wild animals\n🐦 Birds and insects\n🐟 Sea creatures\n🌲 Nature and habitats\n\n*Tema popular en todos los niveles*",
    acciones: []
  },
  {
    id: 439,
    categoria: "vocabulario",
    keywords: ["colores", "formas", "tamaños"],
    pregunta: "¿Vocabulario de descripciones?",
    respuesta: "Describing vocabulary:\n\n🎨 Colors and shades\n📐 Shapes and sizes\n📏 Dimensions\n🔘 Textures and materials\n✨ Adjectives order\n\n*Base para describir todo*",
    acciones: []
  },
  {
    id: 440,
    categoria: "vocabulario",
    keywords: ["dinero", "banco", "finanzas"],
    pregunta: "¿Vocabulario financiero?",
    respuesta: "Financial vocabulary:\n\n💰 Money and currency\n🏦 Banking terms\n💳 Payments and transactions\n📈 Investments basics\n🧾 Bills and expenses\n\n*Útil para negocios*",
    acciones: []
  },
  
  // ========== GRAMÁTICA Y ESTRUCTURA (441-470) ==========
  {
    id: 441,
    categoria: "gramatica",
    keywords: ["gramatica", "reglas", "estructura"],
    pregunta: "¿La gramática es muy difícil?",
    respuesta: "Gramática inglesa:\n\n📚 Más simple que el español\n✅ Sin género gramatical\n📝 Conjugaciones sencillas\n🎯 Aprendizaje gradual\n\n*Se aprende con práctica*",
    acciones: []
  },
  {
    id: 442,
    categoria: "gramatica",
    keywords: ["verbo", "to be", "ser estar"],
    pregunta: "¿Qué es el verbo 'to be'?",
    respuesta: "Verbo TO BE:\n\n🔤 I am, You are, He/She/It is\n🔤 We/They are\n📝 = Ser y Estar\n🎯 Base de todo el idioma\n\n*Primer verbo que aprenderás*",
    acciones: []
  },
  {
    id: 443,
    categoria: "gramatica",
    keywords: ["presente", "simple", "present"],
    pregunta: "¿Qué es el Present Simple?",
    respuesta: "Present Simple:\n\n📚 Acciones habituales\n🕐 Rutinas y costumbres\n📝 I work, She works (+s en 3ra persona)\n❓ Do/Does para preguntas\n\n*Primer tiempo verbal*",
    acciones: []
  },
  {
    id: 444,
    categoria: "gramatica",
    keywords: ["presente", "continuo", "progressive", "ing"],
    pregunta: "¿Qué es el Present Continuous?",
    respuesta: "Present Continuous:\n\n📚 Acciones en progreso AHORA\n🔄 Verbo + ing\n📝 I am working, She is studying\n⏰ Planes futuros también\n\n*Segundo tiempo que aprenderás*",
    acciones: []
  },
  {
    id: 445,
    categoria: "gramatica",
    keywords: ["pasado", "simple", "past", "ed"],
    pregunta: "¿Qué es el Past Simple?",
    respuesta: "Past Simple:\n\n📚 Acciones terminadas en el pasado\n📝 Verbos regulares: +ed\n📝 Verbos irregulares: memorizar\n❓ Did para preguntas\n\n*Hay lista de verbos irregulares*",
    acciones: []
  },
  {
    id: 446,
    categoria: "gramatica",
    keywords: ["futuro", "will", "going to"],
    pregunta: "¿Cómo se forma el futuro?",
    respuesta: "Futuro en inglés:\n\n📝 Will + verbo: decisiones espontáneas\n📝 Going to: planes decididos\n📝 Present Continuous: planes fijos\n🎯 Contexto determina cuál usar\n\n*Tres formas principales*",
    acciones: []
  },
  {
    id: 447,
    categoria: "gramatica",
    keywords: ["perfecto", "have", "has", "present perfect"],
    pregunta: "¿Qué es el Present Perfect?",
    respuesta: "Present Perfect:\n\n📚 Conecta pasado con presente\n📝 Have/Has + participio\n⏰ Experiencias de vida\n📍 Acciones sin tiempo específico\n\n*Uno de los más confusos*",
    acciones: []
  },
  {
    id: 448,
    categoria: "gramatica",
    keywords: ["condicional", "if", "would", "conditional"],
    pregunta: "¿Qué son los condicionales?",
    respuesta: "Condicionales:\n\n🔵 Zero: verdades universales\n🟢 First: situaciones reales\n🟡 Second: situaciones hipotéticas\n🔴 Third: pasado imposible\n\n*Nivel intermedio-avanzado*",
    acciones: []
  },
  {
    id: 449,
    categoria: "gramatica",
    keywords: ["pasiva", "passive", "voz pasiva"],
    pregunta: "¿Qué es la voz pasiva?",
    respuesta: "Voz Pasiva:\n\n📝 Objeto se vuelve sujeto\n🔄 Be + participio pasado\n📚 The book was written by...\n🎯 Foco en la acción, no en quién\n\n*Muy usada en textos formales*",
    acciones: []
  },
  {
    id: 450,
    categoria: "gramatica",
    keywords: ["reported", "speech", "indirecto", "dijo que"],
    pregunta: "¿Qué es el Reported Speech?",
    respuesta: "Reported Speech:\n\n📝 Contar lo que alguien dijo\n🔄 Cambio de tiempos verbales\n💬 She said that...\n📖 He told me that...\n\n*Nivel intermedio*",
    acciones: []
  },
  {
    id: 451,
    categoria: "gramatica",
    keywords: ["modal", "can", "could", "should", "must"],
    pregunta: "¿Qué son los verbos modales?",
    respuesta: "Modal Verbs:\n\n📝 Can/Could: habilidad\n📝 Should: consejo\n📝 Must: obligación\n📝 May/Might: posibilidad\n🎯 No cambian con la persona\n\n*Muy importantes*",
    acciones: []
  },
  {
    id: 452,
    categoria: "gramatica",
    keywords: ["articulo", "a", "an", "the"],
    pregunta: "¿Cuándo uso a, an, the?",
    respuesta: "Artículos:\n\n📝 A: antes de consonante\n📝 An: antes de vocal (sonido)\n📝 The: algo específico/único\n⭕ Sin artículo: generalidades\n\n*Reglas más simples que en español*",
    acciones: []
  },
  {
    id: 453,
    categoria: "gramatica",
    keywords: ["preposicion", "in", "on", "at"],
    pregunta: "¿Cuándo uso in, on, at?",
    respuesta: "Preposiciones de lugar/tiempo:\n\n📍 At: punto específico (at home, at 5pm)\n📍 On: superficie/días (on Monday)\n📍 In: dentro/meses/años (in May)\n\n*Muchas excepciones, práctica*",
    acciones: []
  },
  {
    id: 454,
    categoria: "gramatica",
    keywords: ["pronombre", "he", "she", "they", "it"],
    pregunta: "¿Cuáles son los pronombres?",
    respuesta: "Pronombres:\n\n👤 I, You, He, She, It, We, They\n📝 Me, You, Him, Her, It, Us, Them\n📝 My, Your, His, Her, Its, Our, Their\n\n*Base fundamental del idioma*",
    acciones: []
  },
  {
    id: 455,
    categoria: "gramatica",
    keywords: ["adjetivo", "comparativo", "superlativo"],
    pregunta: "¿Cómo se comparan cosas?",
    respuesta: "Comparativos y Superlativos:\n\n📊 +er/-est para cortos: bigger, biggest\n📊 More/Most para largos: more beautiful\n⚠️ Irregulares: good-better-best\n\n*Tema de nivel inicial*",
    acciones: []
  },
  {
    id: 456,
    categoria: "gramatica",
    keywords: ["adverbio", "ly", "quickly", "slowly"],
    pregunta: "¿Cómo se forman los adverbios?",
    respuesta: "Adverbios:\n\n📝 Adjetivo + ly: quick → quickly\n⚠️ Good → Well (irregular)\n📍 Posición en la oración\n🎯 Modifican verbos, adjetivos, otros adverbios\n\n*Enriquecen el discurso*",
    acciones: []
  },
  {
    id: 457,
    categoria: "gramatica",
    keywords: ["pregunta", "question", "wh", "what", "where"],
    pregunta: "¿Cómo se hacen preguntas?",
    respuesta: "Preguntas en inglés:\n\n❓ WH questions: What, Where, When, Why, Who, How\n🔄 Inversión: auxiliar + sujeto\n📝 Do/Does/Did para present/past\n\n*Estructura diferente al español*",
    acciones: []
  },
  {
    id: 458,
    categoria: "gramatica",
    keywords: ["negacion", "not", "don't", "doesn't"],
    pregunta: "¿Cómo se niega en inglés?",
    respuesta: "Negación:\n\n📝 Auxiliar + not (don't, doesn't, didn't)\n📝 Am/Is/Are + not\n📝 Can't, Won't, Shouldn't\n⚠️ Doble negación no existe\n\n*Más simple que en español*",
    acciones: []
  },
  {
    id: 459,
    categoria: "gramatica",
    keywords: ["contable", "incontable", "some", "any", "much", "many"],
    pregunta: "¿Qué son sustantivos contables e incontables?",
    respuesta: "Countable vs Uncountable:\n\n✅ Contables: a car, two cars\n✅ Incontables: water, money, advice\n📝 Many/Few: contables\n📝 Much/Little: incontables\n\n*Some/Any para ambos*",
    acciones: []
  },
  {
    id: 460,
    categoria: "gramatica",
    keywords: ["plural", "plurales", "irregulares"],
    pregunta: "¿Cómo se forma el plural?",
    respuesta: "Plurales en inglés:\n\n📝 +s: cars, books\n📝 +es: boxes, watches\n📝 y→ies: cities\n⚠️ Irregulares: men, women, children, teeth\n\n*Menos reglas que en español*",
    acciones: []
  },
  {
    id: 461,
    categoria: "gramatica",
    keywords: ["genitivo", "posesivo", "apostrofe", "'s"],
    pregunta: "¿Cómo se indica posesión?",
    respuesta: "Genitivo sajón:\n\n📝 Persona + 's + objeto\n📝 John's car (el auto de John)\n📝 Plural: The students' books\n📝 Of: para cosas (the color of the car)\n\n*Muy usado en inglés*",
    acciones: []
  },
  {
    id: 462,
    categoria: "gramatica",
    keywords: ["relativa", "which", "who", "that", "clause"],
    pregunta: "¿Qué son las relative clauses?",
    respuesta: "Relative Clauses:\n\n📝 Who: personas\n📝 Which: cosas\n📝 That: ambos (informal)\n📝 Whose: posesión\n📝 Where: lugares\n\n*Dan información adicional*",
    acciones: []
  },
  {
    id: 463,
    categoria: "gramatica",
    keywords: ["gerundio", "infinitivo", "to", "ing diferencia"],
    pregunta: "¿Cuándo uso gerundio vs infinitivo?",
    respuesta: "Gerund vs Infinitive:\n\n📝 -ing después de: enjoy, avoid, finish\n📝 To después de: want, need, decide\n📝 Algunos cambian significado\n📝 Stop smoking vs Stop to smoke\n\n*Hay que memorizar verbos*",
    acciones: []
  },
  {
    id: 464,
    categoria: "gramatica",
    keywords: ["tag", "question", "verdad", "no"],
    pregunta: "¿Qué son las tag questions?",
    respuesta: "Tag Questions:\n\n📝 Confirmación al final\n📝 You're coming, aren't you?\n📝 She can't swim, can she?\n🔄 Positivo-Negativo o viceversa\n\n*Muy usado en conversación*",
    acciones: []
  },
  {
    id: 465,
    categoria: "gramatica",
    keywords: ["orden", "palabras", "estructura", "oracion"],
    pregunta: "¿Cuál es el orden de las palabras?",
    respuesta: "Orden en inglés:\n\n📝 Sujeto + Verbo + Objeto\n📝 I love English (no English love I)\n📝 Adjetivo antes del sustantivo\n📝 Adverbio flexible\n\n*Más estricto que en español*",
    acciones: []
  },
  {
    id: 466,
    categoria: "gramatica",
    keywords: ["contracciones", "I'm", "don't", "can't"],
    pregunta: "¿Qué son las contracciones?",
    respuesta: "Contracciones:\n\n📝 I am → I'm\n📝 Do not → Don't\n📝 Cannot → Can't\n📝 Would have → Would've\n\n*Esenciales para sonar natural*",
    acciones: []
  },
  {
    id: 467,
    categoria: "gramatica",
    keywords: ["used to", "would", "costumbre", "solia"],
    pregunta: "¿Cómo expreso costumbres pasadas?",
    respuesta: "Hábitos pasados:\n\n📝 Used to: antes hacía\n📝 I used to play tennis\n📝 Would: acciones repetidas\n📝 Be used to: estar acostumbrado\n\n*Diferente estructura*",
    acciones: []
  },
  {
    id: 468,
    categoria: "gramatica",
    keywords: ["wish", "if only", "deseo", "ojala"],
    pregunta: "¿Cómo expreso deseos?",
    respuesta: "Expresar deseos:\n\n📝 I wish + past simple: presente\n📝 I wish + past perfect: pasado\n📝 If only: más enfático\n💭 I wish I had more time\n\n*Nivel intermedio-avanzado*",
    acciones: []
  },
  {
    id: 469,
    categoria: "gramatica",
    keywords: ["there is", "there are", "hay"],
    pregunta: "¿Cómo digo 'hay' en inglés?",
    respuesta: "There is / There are:\n\n📝 There is: singular/incontable\n📝 There are: plural\n📝 There was/were: pasado\n📝 There will be: futuro\n\n*Equivalente a 'hay'*",
    acciones: []
  },
  {
    id: 470,
    categoria: "gramatica",
    keywords: ["quantifiers", "all", "both", "each", "every"],
    pregunta: "¿Qué son los quantifiers?",
    respuesta: "Quantifiers:\n\n📝 All: todos\n📝 Both: ambos (dos)\n📝 Each: cada uno (individual)\n📝 Every: todos (grupo)\n📝 None: ninguno\n\n*Expresan cantidad*",
    acciones: []
  },
  
  // ========== PRONUNCIACIÓN (471-490) ==========
  {
    id: 471,
    categoria: "pronunciacion",
    keywords: ["pronunciar", "pronunciacion", "como suena"],
    pregunta: "¿La pronunciación es difícil?",
    respuesta: "Pronunciación inglesa:\n\n🗣️ Es diferente al español\n📝 Letras tienen múltiples sonidos\n👂 Exposición mejora todo\n🎯 Practica con audio/video\n\n*Se mejora con el tiempo*",
    acciones: []
  },
  {
    id: 472,
    categoria: "pronunciacion",
    keywords: ["th", "sonido", "the", "think"],
    pregunta: "¿Cómo pronuncio el sonido TH?",
    respuesta: "Sonido TH:\n\n👅 Lengua entre los dientes\n🔊 /ð/ como en 'the' (sonoro)\n🔇 /θ/ como en 'think' (sordo)\n🎯 Practica frente al espejo\n\n*Sonido que no existe en español*",
    acciones: []
  },
  {
    id: 473,
    categoria: "pronunciacion",
    keywords: ["r", "sonido", "diferente"],
    pregunta: "¿Cómo pronuncio la R en inglés?",
    respuesta: "Sonido R:\n\n👅 No vibra como en español\n🔄 Lengua hacia atrás\n📝 Retroflex sound\n🎯 Escucha y repite\n\n*Práctica con palabras: red, right, car*",
    acciones: []
  },
  {
    id: 474,
    categoria: "pronunciacion",
    keywords: ["vocal", "larga", "corta", "sheep", "ship"],
    pregunta: "¿Qué son las vocales largas y cortas?",
    respuesta: "Vocales largas vs cortas:\n\n📢 Sheep (/iː/) vs Ship (/ɪ/)\n📢 Pool (/uː/) vs Pull (/ʊ/)\n📢 Cart (/ɑː/) vs Cut (/ʌ/)\n🎯 Cambian significado\n\n*Muy importante distinguirlas*",
    acciones: []
  },
  {
    id: 475,
    categoria: "pronunciacion",
    keywords: ["schwa", "sonido", "a debil"],
    pregunta: "¿Qué es el sonido schwa?",
    respuesta: "Schwa /ə/:\n\n🔤 Sonido más común en inglés\n📝 'a' en about, 'e' en taken\n🔉 Vocal muy relajada\n🎯 Silabas no acentuadas\n\n*Clave para sonar natural*",
    acciones: []
  },
  {
    id: 476,
    categoria: "pronunciacion",
    keywords: ["acento", "stress", "silaba", "enfasis"],
    pregunta: "¿Cómo funciona el acento en inglés?",
    respuesta: "Word Stress:\n\n💪 Una sílaba más fuerte\n📝 PHOtograph vs phoTOgraphy\n🔄 Puede cambiar significado\n📖 Diccionarios marcan el stress\n\n*Diferente al español*",
    acciones: []
  },
  {
    id: 477,
    categoria: "pronunciacion",
    keywords: ["entonacion", "intonation", "subir bajar"],
    pregunta: "¿Cómo funciona la entonación?",
    respuesta: "Intonation:\n\n⬆️ Sube en preguntas yes/no\n⬇️ Baja en afirmaciones\n🔄 Varía en WH-questions\n🎭 Expresa emociones\n\n*Muy importante para comunicar*",
    acciones: []
  },
  {
    id: 478,
    categoria: "pronunciacion",
    keywords: ["letras", "mudas", "silent", "letters"],
    pregunta: "¿Por qué hay letras que no se pronuncian?",
    respuesta: "Silent Letters:\n\n🔇 K en knife, know\n🔇 B en comb, bomb\n🔇 G en gnome, sign\n🔇 W en write, wrong\n📝 Razones históricas\n\n*Hay que memorizarlas*",
    acciones: []
  },
  {
    id: 479,
    categoria: "pronunciacion",
    keywords: ["linking", "unir", "palabras juntas"],
    pregunta: "¿Por qué los nativos unen palabras?",
    respuesta: "Linking (unión de palabras):\n\n🔗 Nativos conectan sonidos\n📝 'an apple' suena 'anapple'\n📝 'Did you' suena 'didju'\n🎯 Escuchar mucho ayuda\n\n*Clave para comprensión*",
    acciones: []
  },
  {
    id: 480,
    categoria: "pronunciacion",
    keywords: ["minimos", "pares", "minimal pairs"],
    pregunta: "¿Qué son los minimal pairs?",
    respuesta: "Minimal Pairs:\n\n🔤 Palabras casi iguales\n📝 Ship/Sheep, Bat/Bet\n👂 Entrenan el oído\n🗣️ Mejoran pronunciación\n\n*Ejercicio muy útil*",
    acciones: []
  },
  {
    id: 481,
    categoria: "pronunciacion",
    keywords: ["trabalenguas", "tongue twister"],
    pregunta: "¿Sirven los trabalenguas?",
    respuesta: "Tongue Twisters:\n\n🗣️ Excelente práctica\n📝 Peter Piper picked...\n📝 She sells seashells...\n🎯 Mejoran fluidez\n😄 ¡Y son divertidos!\n\n*Usamos varios en clase*",
    acciones: []
  },
  {
    id: 482,
    categoria: "pronunciacion",
    keywords: ["diccionario", "fonetica", "IPA", "simbolos"],
    pregunta: "¿Qué es el IPA?",
    respuesta: "International Phonetic Alphabet:\n\n📖 Símbolos de pronunciación\n📝 /həˈloʊ/ = hello\n🔍 Diccionarios lo usan\n📚 Útil para autoaprendizaje\n\n*Te enseñamos a leerlo*",
    acciones: []
  },
  {
    id: 483,
    categoria: "pronunciacion",
    keywords: ["mejorar", "pronunciacion", "tips"],
    pregunta: "¿Cómo mejoro mi pronunciación?",
    respuesta: "Tips para pronunciación:\n\n🎧 Escucha mucho inglés\n🗣️ Repite en voz alta\n📹 Grábate y escúchate\n🪞 Practica frente al espejo\n👅 Fijate en la boca\n\n*Práctica constante*",
    acciones: []
  },
  {
    id: 484,
    categoria: "pronunciacion",
    keywords: ["reduccion", "gonna", "wanna", "gotta"],
    pregunta: "¿Qué es gonna, wanna, gotta?",
    respuesta: "Formas reducidas:\n\n🗣️ Gonna = Going to\n🗣️ Wanna = Want to\n🗣️ Gotta = Got to\n📝 Uso informal/oral\n⚠️ No escribir en formal\n\n*Muy común en conversación*",
    acciones: []
  },
  {
    id: 485,
    categoria: "pronunciacion",
    keywords: ["ritmo", "rhythm", "musicalidad"],
    pregunta: "¿El inglés tiene ritmo especial?",
    respuesta: "Ritmo en inglés:\n\n🎵 Stress-timed language\n📊 Sílabas acentuadas regulares\n🔄 No acentuadas se 'comen'\n🎶 Como música\n\n*Diferente al español (syllable-timed)*",
    acciones: []
  },
  {
    id: 486,
    categoria: "pronunciacion",
    keywords: ["ed", "pasado", "pronunciar", "-ed"],
    pregunta: "¿Cómo pronuncio el -ed del pasado?",
    respuesta: "Pronunciación de -ed:\n\n🔊 /t/ después de sordos: walked\n🔊 /d/ después de sonoros: played\n🔊 /ɪd/ después de t/d: wanted\n🎯 Regla de sonido, no letra\n\n*Muy importante para pasados*",
    acciones: []
  },
  {
    id: 487,
    categoria: "pronunciacion",
    keywords: ["s", "plural", "pronunciar", "-s"],
    pregunta: "¿Cómo pronuncio la -s del plural?",
    respuesta: "Pronunciación de -s:\n\n🔊 /s/ después de sordos: cats\n🔊 /z/ después de sonoros: dogs\n🔊 /ɪz/ después de s,z,sh,ch: boxes\n\n*Similar a regla de -ed*",
    acciones: []
  },
  {
    id: 488,
    categoria: "pronunciacion",
    keywords: ["homofono", "homophone", "suena igual"],
    pregunta: "¿Qué son los homophones?",
    respuesta: "Homophones:\n\n🔤 Suenan igual, diferente significado\n📝 Their/There/They're\n📝 Your/You're\n📝 To/Too/Two\n📝 Right/Write\n\n*Cuidado en writing*",
    acciones: []
  },
  {
    id: 489,
    categoria: "pronunciacion",
    keywords: ["heteronimo", "heteronym", "escribe igual"],
    pregunta: "¿Qué son los heteronyms?",
    respuesta: "Heteronyms:\n\n📝 Misma escritura, diferente sonido\n📝 Read (presente) vs Read (pasado)\n📝 Live (vivir) vs Live (en vivo)\n📝 Lead (guiar) vs Lead (plomo)\n\n*Contexto te dice cuál es*",
    acciones: []
  },
  {
    id: 490,
    categoria: "pronunciacion",
    keywords: ["accent", "reducir", "acento extranjero"],
    pregunta: "¿Puedo eliminar mi acento español?",
    respuesta: "Sobre el acento:\n\n🌍 Acento no es malo\n✅ Lo importante es ser entendido\n🎯 Se puede neutralizar\n⏰ Lleva años de práctica\n😊 Tu acento es tu identidad\n\n*Enfócate en claridad*",
    acciones: []
  },
  
  // ========== FINAL - DESPEDIDAS Y CIERRE (491-500) ==========
  {
    id: 491,
    categoria: "despedidas",
    keywords: ["gracias", "agradezco", "agradecer"],
    pregunta: "Gracias por la información",
    respuesta: "¡De nada! 😊\n\nEstoy aquí para ayudarte. Si tenés más consultas sobre CEMI, no dudes en preguntar.\n\n*¡Éxitos en tu aprendizaje!*",
    acciones: []
  },
  {
    id: 492,
    categoria: "despedidas",
    keywords: ["chau", "adios", "hasta luego", "bye"],
    pregunta: "Chau, hasta luego",
    respuesta: "¡Hasta pronto! 👋\n\nGracias por consultar con el asistente de CEMI. Te esperamos en nuestras clases.\n\n*¡Que tengas un excelente día!*",
    acciones: []
  },
  {
    id: 493,
    categoria: "despedidas",
    keywords: ["nos vemos", "hasta pronto", "see you"],
    pregunta: "Nos vemos pronto",
    respuesta: "¡Nos vemos! 😊\n\nRecordá que podés consultar cualquier duda sobre CEMI cuando quieras.\n\n*¡Suerte con todo!*",
    acciones: []
  },
  {
    id: 494,
    categoria: "despedidas",
    keywords: ["buena", "atencion", "util", "sirvio"],
    pregunta: "Muy buena la atención",
    respuesta: "¡Qué bueno que te sirvió! 🎉\n\nEn CEMI nos esforzamos por dar la mejor atención.\n\n*¡Te esperamos pronto!*",
    acciones: []
  },
  {
    id: 495,
    categoria: "despedidas",
    keywords: ["excelente", "genial", "barbaro", "copado"],
    pregunta: "¡Excelente información!",
    respuesta: "¡Me alegra mucho! 😄\n\nCualquier otra consulta, aquí estaré.\n\n*¡Éxitos en tu camino al bilingüismo!*",
    acciones: []
  },
  {
    id: 496,
    categoria: "despedidas",
    keywords: ["inscribir", "quiero", "anotarme", "empezar"],
    pregunta: "Quiero inscribirme",
    respuesta: "¡Genial que quieras sumarte a CEMI! 🎓\n\n📞 Llamanos o visitanos\n📧 Enviá email a info@cemi.edu.ar\n🌐 Formulario en la web\n\n*¡Te esperamos con los brazos abiertos!*",
    acciones: []
  },
  {
    id: 497,
    categoria: "despedidas",
    keywords: ["voy", "ir", "pasar", "visitar"],
    pregunta: "Voy a pasar por ahí",
    respuesta: "¡Te esperamos! 🏫\n\n📍 Estamos en el centro\n🕐 Lunes a viernes 9-21h, Sábados 9-13h\n☕ Te atendemos con gusto\n\n*¡Vení cuando quieras!*",
    acciones: []
  },
  {
    id: 498,
    categoria: "despedidas",
    keywords: ["pensar", "pensarlo", "decidir", "evaluar"],
    pregunta: "Lo voy a pensar",
    respuesta: "¡Por supuesto! 🤔\n\nTomate tu tiempo para decidir. Cuando estés listo/a, aquí estaremos.\n\n*¡Sin presión, tu ritmo!*",
    acciones: []
  },
  {
    id: 499,
    categoria: "despedidas",
    keywords: ["despues", "luego", "mas tarde", "otro momento"],
    pregunta: "Consulto después",
    respuesta: "¡Cuando quieras! 📲\n\nEste asistente está disponible 24/7 para responder tus dudas.\n\n*¡Te esperamos!*",
    acciones: []
  },
  {
    id: 500,
    categoria: "despedidas",
    keywords: ["listo", "todo", "suficiente", "era eso"],
    pregunta: "Eso era todo",
    respuesta: "¡Perfecto! ✨\n\nGracias por usar el asistente virtual de CEMI. Esperamos haberte ayudado.\n\n🎓 ¡Éxitos en tu aprendizaje de idiomas!\n\n*Hasta la próxima* 👋",
    acciones: []
  }
];

// =====================================================
// FUNCIONES DEL ASISTENTE
// =====================================================

/**
 * Busca la mejor respuesta basada en keywords
 * @param {string} consulta - Texto del usuario
 * @returns {Object|null} - Respuesta encontrada o null
 */
function buscarRespuesta(consulta) {
  const consultaLower = consulta.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remover acentos
  
  let mejorMatch = null;
  let maxCoincidencias = 0;
  
  for (const item of BASE_CONOCIMIENTO) {
    let coincidencias = 0;
    
    for (const keyword of item.keywords) {
      const keywordNorm = keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (consultaLower.includes(keywordNorm)) {
        coincidencias++;
      }
    }
    
    if (coincidencias > maxCoincidencias) {
      maxCoincidencias = coincidencias;
      mejorMatch = item;
    }
  }
  
  return mejorMatch;
}

/**
 * Obtiene sugerencias basadas en la categoría
 * @param {string} categoria - Categoría actual
 * @returns {Array} - Array de sugerencias
 */
function obtenerSugerencias(categoria = null) {
  if (!categoria) {
    return ASISTENTE_CONFIG.sugerenciasDefault;
  }
  
  const relacionadas = BASE_CONOCIMIENTO
    .filter(item => item.categoria === categoria)
    .slice(0, 4)
    .map(item => item.pregunta);
  
  return relacionadas.length > 0 ? relacionadas : ASISTENTE_CONFIG.sugerenciasDefault;
}

// =====================================================
// CATEGORIAS PARA EL MENU
// =====================================================

const CATEGORIAS_MENU = [
  { id: 'sobre_cemi', nombre: 'Sobre CEMI', icon: '' },
  { id: 'cursos', nombre: 'Cursos', icon: '' },
  { id: 'inscripciones', nombre: 'Inscripciones', icon: '' },
  { id: 'pagos', nombre: 'Pagos y Cuotas', icon: '' },
  { id: 'horarios', nombre: 'Horarios', icon: '' },
  { id: 'ubicacion', nombre: 'Ubicacion', icon: '' },
  { id: 'examenes', nombre: 'Examenes', icon: '' },
  { id: 'certificaciones', nombre: 'Certificaciones', icon: '' },
  { id: 'plataforma', nombre: 'Plataforma Online', icon: '' },
  { id: 'docentes', nombre: 'Docentes', icon: '' },
  { id: 'metodologia', nombre: 'Metodologia', icon: '' },
  { id: 'beneficios', nombre: 'Beneficios', icon: '' },
  { id: 'tramites', nombre: 'Tramites', icon: '' },
  { id: 'soporte', nombre: 'Soporte', icon: '' },
  { id: 'faq', nombre: 'FAQ', icon: '' }
];

/**
 * Crea la interfaz del asistente
 */
function crearAsistenteUI() {
  if (document.getElementById('asistente-cemi-container')) return;
  
  const container = document.createElement('div');
  container.id = 'asistente-cemi-container';
  container.innerHTML = `
    <button id="asistente-toggle" class="asistente-fab" aria-label="Abrir asistente">
      <div class="asistente-fab-icon">
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.52 3.41 1.41 4.8L2.11 21.4c-.22.55.16 1.16.74 1.16.17 0 .34-.04.5-.13l4.6-2.3c1.39.89 3.03 1.41 4.8 1.41 5.52 0 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
        </svg>
      </div>
      <div class="asistente-fab-pulse"></div>
    </button>
    <div id="asistente-modal" class="asistente-modal">
      <div class="asistente-content">
        <div class="asistente-header">
          <div class="asistente-header-info">
            <div class="asistente-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <div>
              <h3 class="asistente-title">CEMI Asistente</h3>
              <span class="asistente-status"> En linea</span>
            </div>
          </div>
          <div class="asistente-header-actions">
            <button id="asistente-home" class="asistente-header-btn" title="Inicio">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            </button>
            <button id="asistente-close" class="asistente-header-btn" title="Cerrar">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
          </div>
        </div>
        <div id="asistente-body" class="asistente-body"></div>
      </div>
    </div>
  `;
  
  document.body.appendChild(container);
  agregarEstilosAsistente();
  inicializarEventos();
  mostrarMenuPrincipal();
}

function agregarEstilosAsistente() {
  if (document.getElementById('asistente-styles')) return;
  
  const styles = document.createElement('style');
  styles.id = 'asistente-styles';
  styles.textContent = `
    #asistente-cemi-container {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      --asistente-primary: #0071e3;
      --asistente-secondary: #0077ed;
      --asistente-bg: #ffffff;
      --asistente-text: #333333;
      --asistente-gray: #f5f5f5;
    }
    .asistente-fab {
      position: fixed;
      bottom: 30px;
      left: 30px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--asistente-primary), var(--asistente-secondary));
      border: none;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(0,0,0,0.2);
      z-index: 9997;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    .asistente-fab:hover { transform: scale(1.1); }
    .asistente-fab-icon { color: white; display: flex; align-items: center; justify-content: center; }
    .asistente-fab-pulse {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: var(--asistente-primary);
      opacity: 0;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.5; }
      100% { transform: scale(1.5); opacity: 0; }
    }
    .asistente-modal {
      position: fixed;
      bottom: 100px;
      left: 30px;
      width: 380px;
      max-width: calc(100vw - 60px);
      height: 520px;
      max-height: calc(100vh - 140px);
      background: var(--asistente-bg);
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      z-index: 9998;
      display: none;
      flex-direction: column;
      overflow: hidden;
    }
    .asistente-modal.active { display: flex; }
    .asistente-content { display: flex; flex-direction: column; height: 100%; }
    .asistente-header {
      background: linear-gradient(135deg, var(--asistente-primary), var(--asistente-secondary));
      color: white;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }
    .asistente-header-info { display: flex; align-items: center; gap: 12px; }
    .asistente-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .asistente-title { margin: 0; font-size: 16px; font-weight: 600; }
    .asistente-status { font-size: 12px; color: #4ade80; }
    .asistente-header-actions { display: flex; gap: 8px; }
    .asistente-header-btn {
      background: rgba(255,255,255,0.15);
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      transition: all 0.2s;
    }
    .asistente-header-btn:hover { background: rgba(255,255,255,0.3); }
    .asistente-body {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      background: var(--asistente-gray);
    }
    .asistente-body::-webkit-scrollbar { width: 6px; }
    .asistente-body::-webkit-scrollbar-track { background: #e5e5e5; }
    .asistente-body::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, var(--asistente-primary), var(--asistente-secondary));
      border-radius: 10px;
    }
    .asistente-menu { padding: 16px; }
    .asistente-bienvenida {
      background: white;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 16px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    .asistente-bienvenida h4 { margin: 0 0 8px 0; color: var(--asistente-primary); font-size: 16px; }
    .asistente-bienvenida p { margin: 0; color: #666; font-size: 14px; line-height: 1.5; }
    .asistente-categorias-titulo {
      font-size: 13px;
      font-weight: 600;
      color: #888;
      margin-bottom: 12px;
      text-transform: uppercase;
    }
    .asistente-categorias-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .asistente-categoria-btn {
      background: white;
      border: none;
      border-radius: 12px;
      padding: 14px 12px;
      cursor: pointer;
      text-align: left;
      transition: all 0.2s;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      color: var(--asistente-text);
    }
    .asistente-categoria-btn:hover {
      background: linear-gradient(135deg, var(--asistente-primary), var(--asistente-secondary));
      color: white;
      transform: translateY(-2px);
    }
    .asistente-categoria-btn .icon { font-size: 18px; }
    .asistente-preguntas-header {
      background: white;
      padding: 16px 20px;
      border-bottom: 1px solid #eee;
      position: sticky;
      top: 0;
      z-index: 10;
    }
    .asistente-preguntas-header h4 { margin: 0; font-size: 16px; color: var(--asistente-primary); }
    .asistente-volver-btn {
      background: var(--asistente-gray);
      border: none;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 13px;
      color: var(--asistente-primary);
      margin-top: 12px;
    }
    .asistente-volver-btn:hover { background: #e0e0e0; }
    .asistente-preguntas-lista { padding: 12px 16px; }
    .asistente-pregunta-btn {
      display: block;
      width: 100%;
      background: white;
      border: none;
      border-radius: 12px;
      padding: 14px 16px;
      margin-bottom: 10px;
      cursor: pointer;
      text-align: left;
      font-size: 14px;
      color: var(--asistente-text);
      transition: all 0.2s;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }
    .asistente-pregunta-btn:hover {
      background: linear-gradient(135deg, var(--asistente-primary), var(--asistente-secondary));
      color: white;
      transform: translateX(4px);
    }
    .asistente-respuesta-container { padding: 16px; }
    .asistente-respuesta-card {
      background: white;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 2px 15px rgba(0,0,0,0.08);
    }
    .asistente-respuesta-pregunta {
      font-size: 15px;
      font-weight: 600;
      color: var(--asistente-primary);
      margin: 0 0 16px 0;
      padding-bottom: 12px;
      border-bottom: 2px solid var(--asistente-gray);
    }
    .asistente-respuesta-texto {
      font-size: 14px;
      line-height: 1.7;
      color: var(--asistente-text);
      white-space: pre-line;
    }
    .asistente-respuesta-texto strong { color: var(--asistente-primary); }
    .asistente-acciones {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #eee;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .asistente-accion-btn {
      background: linear-gradient(135deg, var(--asistente-primary), var(--asistente-secondary));
      color: white;
      text-decoration: none;
      padding: 10px 16px;
      border-radius: 20px;
      font-size: 13px;
    }
    .asistente-nav-btns { display: flex; gap: 10px; margin-top: 20px; }
    .asistente-nav-btn {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
    }
    .asistente-nav-btn.secundario { background: var(--asistente-gray); color: var(--asistente-primary); }
    .asistente-nav-btn.primario {
      background: linear-gradient(135deg, var(--asistente-primary), var(--asistente-secondary));
      color: white;
    }
    @media (max-width: 480px) {
      .asistente-fab { bottom: 20px; left: 20px; width: 54px; height: 54px; }
      .asistente-modal { left: 10px; right: 10px; bottom: 85px; width: auto; }
      .asistente-categorias-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(styles);
}

function inicializarEventos() {
  const toggle = document.getElementById('asistente-toggle');
  const modal = document.getElementById('asistente-modal');
  const closeBtn = document.getElementById('asistente-close');
  const homeBtn = document.getElementById('asistente-home');
  
  toggle.addEventListener('click', () => modal.classList.toggle('active'));
  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  homeBtn.addEventListener('click', mostrarMenuPrincipal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.classList.remove('active'); });
}

function mostrarMenuPrincipal() {
  const body = document.getElementById('asistente-body');
  
  const categoriasHTML = CATEGORIAS_MENU.map(cat => 
    '<button class="asistente-categoria-btn" data-categoria="' + cat.id + '">' +
    '<span class="icon">' + cat.icon + '</span>' +
    '<span>' + cat.nombre + '</span></button>'
  ).join('');
  
  body.innerHTML = 
    '<div class="asistente-menu">' +
    '<div class="asistente-bienvenida">' +
    '<h4>Hola! Soy el asistente de CEMI</h4>' +
    '<p>Selecciona una categoria para encontrar respuestas a tus consultas.</p>' +
    '</div>' +
    '<div class="asistente-categorias-titulo">Categorias</div>' +
    '<div class="asistente-categorias-grid">' + categoriasHTML + '</div>' +
    '</div>';
  
  body.scrollTop = 0;
  
  body.querySelectorAll('.asistente-categoria-btn').forEach(btn => {
    btn.addEventListener('click', () => mostrarPreguntas(btn.dataset.categoria));
  });
}

function mostrarPreguntas(categoriaId) {
  const body = document.getElementById('asistente-body');
  const categoria = CATEGORIAS_MENU.find(c => c.id === categoriaId);
  const preguntas = BASE_CONOCIMIENTO.filter(item => item.categoria === categoriaId);
  
  if (preguntas.length === 0) { mostrarMenuPrincipal(); return; }
  
  const preguntasHTML = preguntas.map(p => 
    '<button class="asistente-pregunta-btn" data-pregunta-id="' + p.id + '">' + p.pregunta + '</button>'
  ).join('');
  
  body.innerHTML = 
    '<div class="asistente-preguntas-header">' +
    '<h4>' + (categoria ? categoria.icon + ' ' + categoria.nombre : 'Preguntas') + '</h4>' +
    '<button class="asistente-volver-btn" id="volver-menu">Volver al menu</button>' +
    '</div>' +
    '<div class="asistente-preguntas-lista">' + preguntasHTML + '</div>';
  
  body.scrollTop = 0;
  
  document.getElementById('volver-menu').addEventListener('click', mostrarMenuPrincipal);
  body.querySelectorAll('.asistente-pregunta-btn').forEach(btn => {
    btn.addEventListener('click', () => mostrarRespuesta(parseInt(btn.dataset.preguntaId), categoriaId));
  });
}

function mostrarRespuesta(preguntaId, categoriaId) {
  const body = document.getElementById('asistente-body');
  const pregunta = BASE_CONOCIMIENTO.find(p => p.id === preguntaId);
  
  if (!pregunta) { mostrarMenuPrincipal(); return; }
  
  const textoFormateado = pregunta.respuesta.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  const accionesHTML = pregunta.acciones && pregunta.acciones.length > 0 
    ? '<div class="asistente-acciones">' + pregunta.acciones.map(a => 
        '<a href="' + a.link + '" class="asistente-accion-btn" target="_blank">' + a.texto + '</a>'
      ).join('') + '</div>'
    : '';
  
  body.innerHTML = 
    '<div class="asistente-respuesta-container">' +
    '<div class="asistente-respuesta-card">' +
    '<div class="asistente-respuesta-pregunta">' + pregunta.pregunta + '</div>' +
    '<div class="asistente-respuesta-texto">' + textoFormateado + '</div>' +
    accionesHTML +
    '<div class="asistente-nav-btns">' +
    '<button class="asistente-nav-btn secundario" id="volver-categoria">Mas preguntas</button>' +
    '<button class="asistente-nav-btn primario" id="ir-inicio">Inicio</button>' +
    '</div></div></div>';
  
  body.scrollTop = 0;
  
  document.getElementById('volver-categoria').addEventListener('click', () => mostrarPreguntas(categoriaId));
  document.getElementById('ir-inicio').addEventListener('click', mostrarMenuPrincipal);
}

function inicializarAsistente() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', crearAsistenteUI);
  } else {
    crearAsistenteUI();
  }
}

inicializarAsistente();
