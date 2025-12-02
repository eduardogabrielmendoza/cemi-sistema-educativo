// =====================================================
// ASISTENTE VIRTUAL CEMI - Sistema de Ayuda Inteligente
// =====================================================

const ASISTENTE_CONFIG = {
  nombre: "CEMI Asistente",
  version: "1.0.0",
  bienvenida: "¿Hola! ?? Soy el asistente virtual de CEMI. Estoy aquí para ayudarte con cualquier consulta sobre nuestro instituto, cursos, inscripciones y más. ¿En qué puedo ayudarte?",
  despedida: "¡Gracias por consultar! Si tenés más dudas, no dudes en escribirme. ?¡Éxitos! ??",
  noEntiendo: "No encontr? informaciÓn específica sobre eso. ¿Podr?as reformular tu pregunta o elegir una de las sugerencias?",
  sugerenciasDefault: [
    "¿qué cursos ofrecen?",
    "¿CÓmo me inscribo?",
    "¿cuáles son los horarios?",
    "¿dónde est¿N ubicados?"
  ]
};

// Base de conocimiento del asistente
const BASE_CONOCIMIENTO = [

  // ============================================
  // CATEGOR?A 1: SOBRE CEMI (20 respuestas)
  // ============================================
  {
    id: 1,
    categoria: "sobre_cemi",
    keywords: ["que es cemi", "quienes son", "sobre ustedes", "instituto", "institucion", "centro educativo"],
    pregunta: "¿qué es CEMI?",
    respuesta: "**CEMI** (Centro Educativo Multiling¿E Integral) es una institución educativa dedicada a la enseñanza de idiomas con una trayectoria de excelencia académica. Nos especializamos en formar estudiantes con competencias lingüísticas de alto nivel.",
    acciones: []
  },
  {
    id: 2,
    categoria: "sobre_cemi",
    keywords: ["mision", "objetivo", "proposito", "para que"],
    pregunta: "¿cuál es la misi¿N de CEMI?",
    respuesta: "Nuestra **misi¿N** es brindar educación de idiomas de calidad, formando estudiantes competentes y preparados para un mundo globalizado, con metodologías innovadoras y docentes altamente capacitados.",
    acciones: []
  },
  {
    id: 3,
    categoria: "sobre_cemi",
    keywords: ["vision", "futuro", "proyeccion"],
    pregunta: "¿cuál es la visi¿N de CEMI?",
    respuesta: "Nuestra **visi¿N** es ser el instituto de idiomas l¿Der en la regi¿N, reconocido por la excelencia académica, innovaci¿N educativa y formaciÓn integral de nuestros estudiantes.",
    acciones: []
  },
  {
    id: 4,
    categoria: "sobre_cemi",
    keywords: ["valores", "principios", "filosofia"],
    pregunta: "¿cuáles son los valores de CEMI?",
    respuesta: "Nuestros **valores** fundamentales son:\n\n? **Excelencia académica** - Compromiso con la calidad educativa\n? **Innovaci¿N** - metodologías modernas y tecnología\n? **Respeto** - Ambiente inclusivo y diverso\n? **Compromiso** - Dedicaci¿N al ¡Éxito del estudiante\n? **Integridad** - Transparencia en todo lo que hacemos",
    acciones: []
  },
  {
    id: 5,
    categoria: "sobre_cemi",
    keywords: ["historia", "cuando fundaron", "años", "trayectoria", "antiguedad"],
    pregunta: "¿cuál es la historia de CEMI?",
    respuesta: "CEMI fue fundado con el objetivo de ofrecer educación de idiomas de calidad. A lo largo de los años, hemos formado a miles de estudiantes, consolid¿Ndonos como una institución de referencia en la enseñanza de lenguas extranjeras.",
    acciones: []
  },
  {
    id: 6,
    categoria: "sobre_cemi",
    keywords: ["diferencia", "diferencial", "por que elegir", "ventaja", "mejor que"],
    pregunta: "¿qué diferencia a CEMI de otros institutos?",
    respuesta: "Lo que nos diferencia:\n\n? **metodología comunicativa** - Enfoque en la pr¿Ctica real\n? **Grupos reducidos** - atención personalizada\n? **Docentes certificados** - Profesionales de excelencia\n? **tecnología educativa** - Plataforma Classroom moderna\n? **Certificaciones internacionales** - preparación para ex?menes oficiales\n? **Flexibilidad horaria** - M?ltiples turnos disponibles",
    acciones: []
  },
  {
    id: 7,
    categoria: "sobre_cemi",
    keywords: ["metodologia", "como ense?an", "metodo", "forma de enseñar"],
    pregunta: "¿qué metodología utilizan?",
    respuesta: "Utilizamos el **enfoque comunicativo**, que prioriza:\n\n? Conversaci¿N y pr¿Ctica oral desde el primer d?a\n? Situaciones reales de comunicación\n? Desarrollo de las 4 habilidades: hablar, escuchar, leer y escribir\n? Uso de tecnología y recursos multimedia\n? Actividades interactivas y dinámicas",
    acciones: []
  },
  {
    id: 8,
    categoria: "sobre_cemi",
    keywords: ["instalaciones", "edificio", "aulas", "infraestructura"],
    pregunta: "¿CÓmo son las instalaciones?",
    respuesta: "Contamos con instalaciones modernas:\n\n?? Aulas climatizadas y equipadas\n?? Laboratorio de idiomas con tecnología\n?? Biblioteca con material de consulta\n? Espacios de descanso\n? Accesibilidad para personas con movilidad reducida\n?? WiFi en todo el edificio",
    acciones: [{ texto: "Ver ubicación", link: "#ubicacion" }]
  },
  {
    id: 9,
    categoria: "sobre_cemi",
    keywords: ["cuantos alumnos", "estudiantes", "cantidad"],
    pregunta: "¿Cu¿Ntos alumnos tienen?",
    respuesta: "Actualmente contamos con una comunidad activa de estudiantes en diferentes niveles e idiomas. Mantenemos grupos reducidos (m¡Éximo 15 alumnos por clase) para garantizar atención personalizada.",
    acciones: []
  },
  {
    id: 10,
    categoria: "sobre_cemi",
    keywords: ["reconocimiento", "premios", "logros", "acreditacion"],
    pregunta: "¿Tienen reconocimientos o acreditaciones?",
    respuesta: "CEMI cuenta con:\n\n?? Reconocimiento como centro preparador de ex?menes internacionales\n?? acreditación académica institucional\n?? Convenios con instituciones educativas\n? Certificaciones de calidad educativa",
    acciones: []
  },
  {
    id: 11,
    categoria: "sobre_cemi",
    keywords: ["director", "directora", "autoridades", "quien dirige"],
    pregunta: "¿Qui¿N dirige CEMI?",
    respuesta: "CEMI cuenta con un equipo directivo comprometido con la excelencia educativa, conformado por profesionales con amplia experiencia en educación y enseñanza de idiomas.",
    acciones: []
  },
  {
    id: 12,
    categoria: "sobre_cemi",
    keywords: ["trabajan", "empleos", "trabajo", "vacantes", "cv", "curriculum"],
    pregunta: "¿CÓmo puedo trabajar en CEMI?",
    respuesta: "Si te interesa formar parte de nuestro equipo docente o administrativo, podés:\n\n?? Enviar tu CV a: rrhh@cemi.edu.ar\n?? Especificar el ?rea de inter¿S\n?? Adjuntar tÍtulos y certificaciones\n\nEvaluamos perfiles de forma continua.",
    acciones: [{ texto: "Enviar email", link: "mailto:rrhh@cemi.edu.ar" }]
  },
  {
    id: 13,
    categoria: "sobre_cemi",
    keywords: ["seguro", "seguridad", "confiable"],
    pregunta: "¿CEMI es una institución confiable?",
    respuesta: "?Absolutamente! CEMI es una institución legalmente constituida, con años de trayectoria formando estudiantes exitosos. Contamos con:\n\n? Habilitaci¿N oficial\n? Seguro para estudiantes\n? Protocolos de seguridad\n? Transparencia institucional",
    acciones: []
  },
  {
    id: 14,
    categoria: "sobre_cemi",
    keywords: ["convenios", "alianzas", "partners", "asociados"],
    pregunta: "¿Tienen convenios con otras instituciones?",
    respuesta: "S?, CEMI mantiene convenios con:\n\n?? Universidades locales e internacionales\n?? Empresas para capacitaci¿N corporativa\n?? Organismos de certificación internacional\n?? Instituciones de intercambio cultural",
    acciones: []
  },
  {
    id: 15,
    categoria: "sobre_cemi",
    keywords: ["pandemia", "covid", "protocolos sanitarios"],
    pregunta: "¿qué protocolos de salud tienen?",
    respuesta: "Mantenemos protocolos de higiene y seguridad:\n\n?? Dispensadores de alcohol en gel\n??? Ventilaci¿N adecuada en aulas\n?? Limpieza y desinfecci¿N regular\n?? Respeto por medidas sanitarias vigentes",
    acciones: []
  },
  {
    id: 16,
    categoria: "sobre_cemi",
    keywords: ["redes sociales", "facebook", "instagram", "twitter", "social"],
    pregunta: "¿Tienen redes sociales?",
    respuesta: "¿S?! Seguinos en nuestras redes:\n\n?? Facebook: /CEMIidiomas\n?? Instagram: @cemi_idiomas\n?? Twitter: @CEMI_edu\n?? LinkedIn: CEMI Centro Educativo\n\n¿Enterate de novedades, promociones y eventos!",
    acciones: []
  },
  {
    id: 17,
    categoria: "sobre_cemi",
    keywords: ["opinion", "rese?a", "comentarios", "testimonios", "experiencias"],
    pregunta: "¿qué opinan los alumnos de CEMI?",
    respuesta: "Nuestros estudiantes destacan:\n\n? Excelente calidad de enseñanza\n? Profesores dedicados y pacientes\n? Buen ambiente de estudio\n? Flexibilidad horaria\n? R¿Pido progreso en el idioma\n\n¿podés ver testimonios en nuestra web!",
    acciones: []
  },
  {
    id: 18,
    categoria: "sobre_cemi",
    keywords: ["garantia", "satisfaccion", "devolucion"],
    pregunta: "?Ofrecen alguna garantía?",
    respuesta: "Nos comprometemos con tu satisfacci¿N:\n\n? Clase de prueba gratuita\n? Seguimiento personalizado de tu progreso\n? Posibilidad de cambio de grupo/horario\n? atención a consultas y reclamos",
    acciones: []
  },
  {
    id: 19,
    categoria: "sobre_cemi",
    keywords: ["contacto rapido", "emergencia", "urgente"],
    pregunta: "¿CÓmo contacto a CEMI urgentemente?",
    respuesta: "Para consultas urgentes:\n\n?? Tel?fono: (0381) 446-4324\n?? WhatsApp: +54 9 381 446-3243\n?? Email: info@cemi.edu.ar\n\n? Horario de atención: Lunes a Viernes 8:00 a 21:00",
    acciones: [{ texto: "Llamar ahora", link: "tel:+543814463243" }]
  },
  {
    id: 20,
    categoria: "sobre_cemi",
    keywords: ["newsletter", "novedades", "suscribir", "noticias"],
    pregunta: "¿CÓmo me entero de las novedades?",
    respuesta: "Mantenete informado:\n\n?? Suscribite a nuestro newsletter en la web\n?? Seguinos en redes sociales\n?? Activ? notificaciones en la plataforma\n?? Consult? el calendario de eventos",
    acciones: []
  },

  // ============================================
  // CATEGOR?A 2: IDIOMAS DISPONIBLES (25 respuestas)
  // ============================================
  {
    id: 21,
    categoria: "idiomas",
    keywords: ["idiomas", "lenguas", "que ense?an", "cursos idiomas", "ofrecen"],
    pregunta: "¿qué idiomas ense?an?",
    respuesta: "En CEMI ofrecemos cursos de:\n\n???? **Ingl¿S** - Todos los niveles\n???? **Portugu¿S** - Brasile?o y europeo\n???? **Franc¿S** - General y negocios\n???? **Alem¿N** - certificación Goethe\n???? **Italiano** - Cultura y ciudadan?a\n???? **Chino Mandar¿N** - HSK\n???? **Japon¿S** - JLPT",
    acciones: [{ texto: "Ver cursos", link: "#cursos" }]
  },
  {
    id: 22,
    categoria: "idiomas",
    keywords: ["ingles", "english", "britanico", "americano"],
    pregunta: "¿Tienen cursos de ingl¿S?",
    respuesta: "¿S?! Nuestro programa de **Ingl¿S** incluye:\n\n?? Ingl¿S General (A1 a C2)\n?? Ingl¿S para niños (4-12 años)\n?? Ingl¿S Adolescentes (13-17 años)\n?? Ingl¿S de Negocios\n?? Ingl¿S para Viajeros\n?? preparación IELTS, TOEFL, Cambridge",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar¿Subject=Consulta curso de Ingl¿S" }]
  },
  {
    id: 23,
    categoria: "idiomas",
    keywords: ["portugues", "brasil", "brasile?o", "portugal"],
    pregunta: "¿Tienen cursos de portugu¿S?",
    respuesta: "Ofrecemos **Portugu¿S** en dos variantes:\n\n???? **Portugu¿S Brasile?o** - El más demandado en la regi¿N\n???? **Portugu¿S Europeo** - Para emigrar a Portugal\n\n?? preparación para CELPE-Bras\n?? Portugu¿S para negocios",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar¿Subject=Consulta curso de Portugu¿S" }]
  },
  {
    id: 24,
    categoria: "idiomas",
    keywords: ["frances", "francia", "french"],
    pregunta: "¿Tienen cursos de franc¿S?",
    respuesta: "Nuestro programa de **Franc¿S** ofrece:\n\n?? Franc¿S General (A1 a C1)\n?? preparación DELF/DALF\n?? Franc¿S de Negocios\n???? Franc¿S para Canad? (Quebec)\n?? Cultura franc?fona",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar¿Subject=Consulta curso de Franc¿S" }]
  },
  {
    id: 25,
    categoria: "idiomas",
    keywords: ["aleman", "alemania", "german", "deutsch"],
    pregunta: "¿Tienen cursos de alem¿N?",
    respuesta: "Ofrecemos **Alem¿N** con:\n\n?? Alem¿N General (A1 a C1)\n?? preparación Goethe-Zertifikat\n?? Alem¿N para trabajo en Alemania/Austria/Suiza\n?? Certificaciones oficiales",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar¿Subject=Consulta curso de Alem¿N" }]
  },
  {
    id: 26,
    categoria: "idiomas",
    keywords: ["italiano", "italia", "italian"],
    pregunta: "¿Tienen cursos de italiano?",
    respuesta: "Nuestro programa de **Italiano** incluye:\n\n?? Italiano General (A1 a B2)\n?? preparación CILS/CELI\n???? Italiano para ciudadan?a\n?? Cultura y arte italiano",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar¿Subject=Consulta curso de Italiano" }]
  },
  {
    id: 27,
    categoria: "idiomas",
    keywords: ["chino", "mandarin", "china", "chinese"],
    pregunta: "¿Tienen cursos de chino?",
    respuesta: "Ofrecemos **Chino Mandar¿N**:\n\n?? Niveles HSK 1 a HSK 4\n?? Caracteres simplificados\n??? Pronunciaci¿N y tonos\n?? Chino para negocios",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar¿Subject=Consulta curso de Chino" }]
  },
  {
    id: 28,
    categoria: "idiomas",
    keywords: ["japones", "japon", "japanese", "nihongo"],
    pregunta: "¿Tienen cursos de japon¿S?",
    respuesta: "Nuestro programa de **Japon¿S** ofrece:\n\n?? Niveles JLPT N5 a N3\n?? Hiragana, Katakana y Kanji\n?? Cultura japonesa\n?? Japon¿S para anime/manga",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar¿Subject=Consulta curso de Japon¿S" }]
  },
  {
    id: 29,
    categoria: "idiomas",
    keywords: ["coreano", "corea", "korean", "kpop"],
    pregunta: "¿Tienen cursos de coreano?",
    respuesta: "Ofrecemos **Coreano**:\n\n?? Niveles TOPIK I y II\n?? Alfabeto Hangul\n?? Cultura K-pop y K-drama\n?? Coreano b¿Sico y conversacional",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar¿Subject=Consulta curso de Coreano" }]
  },
  {
    id: 30,
    categoria: "idiomas",
    keywords: ["ruso", "rusia", "russian"],
    pregunta: "¿Tienen cursos de ruso?",
    respuesta: "S?, ofrecemos **Ruso** en niveles iniciales:\n\n?? Alfabeto cir?lico\n??? Conversaci¿N b¿Sica\n?? Lectura y escritura\n\n*Consult? disponibilidad de grupos*",
    acciones: [{ texto: "Consultar por WhatsApp", link: "https://wa.me/543814463243" }]
  },
  {
    id: 31,
    categoria: "idiomas",
    keywords: ["arabe", "arabia", "arabic"],
    pregunta: "¿Tienen cursos de ?rabe?",
    respuesta: "Ofrecemos **?rabe** en modalidad especial:\n\n?? ?rabe Moderno Est¿Ndar\n?? Escritura y caligraf?a\n??? Conversaci¿N b¿Sica\n\n*Consult? inicio de grupos*",
    acciones: [{ texto: "Consultar por WhatsApp", link: "https://wa.me/543814463243" }]
  },
  {
    id: 32,
    categoria: "idiomas",
    keywords: ["que idioma estudiar", "cual me recomiendan", "mejor idioma", "idioma facil"],
    pregunta: "¿qué idioma me recomiendan estudiar?",
    respuesta: "Depende de tus objetivos:\n\n?? **Trabajo internacional**: Ingl¿S, Alem¿N\n?? **Viajar por Sudam?rica**: Portugu¿S\n???? **Emigrar a Europa**: Italiano, Franc¿S, Alem¿N\n?? **Negocios con Asia**: Chino Mandar¿N\n?? **Cultura pop**: Japon¿S, Coreano\n\n¿querés asesoramiento personalizado?",
    acciones: [{ texto: "Consultar por WhatsApp", link: "https://wa.me/543814463243" }]
  },
  {
    id: 33,
    categoria: "idiomas",
    keywords: ["dos idiomas", "varios idiomas", "simultaneo", "a la vez"],
    pregunta: "¿Puedo estudiar dos idiomas a la vez?",
    respuesta: "¿S?, es posible! Recomendaciones:\n\n? Que uno est? más avanzado que otro\n? Elegir idiomas de familias diferentes\n? Organizar bien los horarios\n?? Requiere mayor dedicaci¿N\n\nConsult? con nuestro equipo para armar tu plan.",
    acciones: []
  },
  {
    id: 34,
    categoria: "idiomas",
    keywords: ["idioma dificil", "mas dificil", "complicado"],
    pregunta: "¿cuál es el idioma más dif¿Cil?",
    respuesta: "La dificultad depende de tu idioma nativo. Para hispanohablantes:\n\n?? **más f¿Ciles**: Portugu¿S, Italiano, Franc¿S\n?? **Intermedio**: Ingl¿S, Alem¿N\n?? **más desafiantes**: Chino, Japon¿S, ?rabe\n\n¿Pero con dedicaci¿N, todos son alcanzables!",
    acciones: []
  },
  {
    id: 35,
    categoria: "idiomas",
    keywords: ["idioma rapido", "aprender rapido", "intensivo", "cuanto tiempo"],
    pregunta: "¿En cu¿Nto tiempo aprendo un idioma?",
    respuesta: "Tiempos estimados para nivel intermedio (B1):\n\n?? **Portugu¿S/Italiano**: 6-8 meses\n?? **Ingl¿S/Franc¿S**: 8-12 meses\n?? **Alem¿N**: 12-18 meses\n?? **Chino/Japon¿S**: 18-24 meses\n\n*Con cursado regular y pr¿Ctica constante*",
    acciones: []
  },
  {
    id: 36,
    categoria: "idiomas",
    keywords: ["nativo", "profesor nativo", "native speaker"],
    pregunta: "¿Tienen profesores nativos?",
    respuesta: "Contamos con:\n\n????? Profesores nativos certificados\n????? Docentes Bilingües con experiencia\n?? Todos con formaciÓn pedag¡Gica\n?? Certificaciones internacionales\n\nEl equipo se asigna segÚn el nivel y curso.",
    acciones: []
  },
  {
    id: 37,
    categoria: "idiomas",
    keywords: ["online", "virtual", "distancia", "remoto"],
    pregunta: "¿Tienen cursos online de idiomas?",
    respuesta: "S?, ofrecemos modalidad **online** para varios idiomas:\n\n?? Clases en vivo por videollamada\n?? Acceso a plataforma Classroom\n?? Material digital incluido\n?? Flexibilidad horaria\n\n*Consult? disponibilidad para cada idioma*",
    acciones: [{ texto: "Consultar por WhatsApp", link: "https://wa.me/543814463243¿Text=Hola!%20Consulta%20sobre%20cursos%20online" }]
  },
  {
    id: 38,
    categoria: "idiomas",
    keywords: ["presencial", "cara a cara", "en persona"],
    pregunta: "?Las clases son presenciales?",
    respuesta: "Ofrecemos ambas modalidades:\n\n?? **Presencial**: En nuestra sede\n?? **Online**: Clases en vivo virtuales\n?? **H?brido**: Combinaci¿N de ambas\n\npodés elegir la que mejor se adapte a vos.",
    acciones: []
  },
  {
    id: 39,
    categoria: "idiomas",
    keywords: ["lengua de se?as", "se?as", "lsn", "sordo"],
    pregunta: "¿Ense?an Lengua de Se?as?",
    respuesta: "Actualmente no contamos con cursos de Lengua de Se?as Argentina (LSA). Sin embargo, estamos evaluando incorporarlo.\n\n?? Si te interesa, dejanos tu contacto para avisarte cuando abramos inscripción.",
    acciones: [{ texto: "Dejar contacto", link: "mailto:info@cemi.edu.ar¿Subject=Inter¿S en Lengua de Se?as" }]
  },
  {
    id: 40,
    categoria: "idiomas",
    keywords: ["latin", "griego", "clasico", "antiguo"],
    pregunta: "¿Ense?an lat¿N o griego?",
    respuesta: "Actualmente no ofrecemos lat¿N ni griego antiguo como cursos regulares. Nos especializamos en idiomas modernos.\n\n*Ocasionalmente ofrecemos talleres especiales de introducci¿N.*",
    acciones: []
  },
  {
    id: 41,
    categoria: "idiomas",
    keywords: ["español", "castellano", "extranjeros", "spanish"],
    pregunta: "¿Ense?an español para extranjeros?",
    respuesta: "¿S?! Ofrecemos **Español como Lengua Extranjera (ELE)**:\n\n?? Todos los niveles (A1-C2)\n?? preparación DELE/SIELE\n?? Español para negocios\n?? Español latinoamericano",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar¿Subject=Consulta curso de Español" }]
  },
  {
    id: 42,
    categoria: "idiomas",
    keywords: ["hebreo", "israel", "hebrew"],
    pregunta: "¿Tienen cursos de hebreo?",
    respuesta: "Ofrecemos **Hebreo moderno** bajo demanda:\n\n?? Nivel inicial\n?? Alfabeto hebreo\n??? Conversaci¿N b¿Sica\n\n*Consult? formaciÓn de grupos*",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar¿Subject=Consulta curso de Hebreo" }]
  },
  {
    id: 43,
    categoria: "idiomas",
    keywords: ["hindu", "hindi", "india"],
    pregunta: "¿Tienen cursos de hindi?",
    respuesta: "Actualmente no ofrecemos Hindi como curso regular. Nos enfocamos en los idiomas de mayor demanda.\n\n?? Si hay suficiente inter¿S, podemos abrir un grupo.",
    acciones: [{ texto: "Expresar inter¿S", link: "mailto:info@cemi.edu.ar¿Subject=Inter¿S en curso de Hindi" }]
  },
  {
    id: 44,
    categoria: "idiomas",
    keywords: ["turco", "turquia", "turkish"],
    pregunta: "¿Tienen cursos de turco?",
    respuesta: "Actualmente no ofrecemos Turco en nuestro programa regular.\n\n?? Dejanos tu contacto si te interesa para considerar la apertura de un curso.",
    acciones: [{ texto: "Expresar inter¿S", link: "mailto:info@cemi.edu.ar¿Subject=Inter¿S en curso de Turco" }]
  },
  {
    id: 45,
    categoria: "idiomas",
    keywords: ["polaco", "polonia", "polish"],
    pregunta: "¿Tienen cursos de polaco?",
    respuesta: "No contamos con Polaco actualmente. Nuestros cursos se centran en los idiomas de mayor demanda.\n\n?? Si te interesa, podés dejarnos tu contacto.",
    acciones: [{ texto: "Expresar inter¿S", link: "mailto:info@cemi.edu.ar¿Subject=Inter¿S en curso de Polaco" }]
  },

  // ============================================
  // CATEGOR?A 3: CURSOS Y NIVELES (20 respuestas)
  // ============================================
  {
    id: 46,
    categoria: "cursos",
    keywords: ["tipos de cursos", "cursos disponibles", "que cursos", "opciones"],
    pregunta: "¿qué tipos de cursos tienen?",
    respuesta: "Ofrecemos diferentes modalidades:\n\n?? **Grupales**: 8-15 alumnos\n?? **Individuales**: Clases particulares\n?? **Empresas**: In-company\n?? **Intensivos**: Aprendizaje acelerado\n?? **Extensivos**: Ritmo regular\n?? **niños**: 4-12 años\n?? **Adolescentes**: 13-17 años\n????? **Adultos**: +18 años",
    acciones: [{ texto: "Ver cursos", link: "#cursos" }]
  },
  {
    id: 47,
    categoria: "cursos",
    keywords: ["niveles", "a1", "b1", "c1", "basico", "intermedio", "avanzado"],
    pregunta: "¿qué niveles manejan?",
    respuesta: "Seguimos el **Marco Com¿N Europeo (MCER)**:\n\n?? **A1-A2**: Nivel b¿Sico\n?? **B1-B2**: Nivel intermedio\n?? **C1-C2**: Nivel avanzado\n\n?? Realizamos test de nivelaci¿N gratuito para ubicarte correctamente.",
    acciones: [{ texto: "Solicitar test", link: "https://wa.me/543814463243¿Text=Hola!%20Quiero%20hacer%20el%20test%20de%20nivel" }]
  },
  {
    id: 48,
    categoria: "cursos",
    keywords: ["duracion", "cuanto dura", "tiempo", "largo"],
    pregunta: "¿Cu¿Nto dura cada nivel?",
    respuesta: "duración aproximada por nivel:\n\n?? **Curso extensivo**: 4-5 meses por nivel\n? **Curso intensivo**: 2-3 meses por nivel\n\n*2-3 clases semanales de 1.5 horas cada una*",
    acciones: []
  },
  {
    id: 49,
    categoria: "cursos",
    keywords: ["certificado", "titulo", "diploma", "certificacion"],
    pregunta: "¿Entregan certificado al finalizar?",
    respuesta: "¿S?! Al completar cada nivel recibir¿S:\n\n?? **Certificado CEMI** de aprobaci¿N\n?? Detalle de nivel alcanzado (MCER)\n?? Registro de calificaciones\n\nAdemás, preparamos para certificaciones internacionales oficiales.",
    acciones: []
  },
  {
    id: 50,
    categoria: "cursos",
    keywords: ["grupal", "grupo", "compa¿Eros", "cuantos alumnos"],
    pregunta: "¿Cu¿Ntos alumnos hay por grupo?",
    respuesta: "Mantenemos **grupos reducidos**:\n\n?? M¿Nimo: 5 alumnos\n?? M¡Éximo: 15 alumnos\n? Ideal: 8-12 alumnos\n\nEsto garantiza atención personalizada y pr¿Ctica oral para todos.",
    acciones: []
  },
  {
    id: 51,
    categoria: "cursos",
    keywords: ["individual", "particular", "privado", "uno a uno"],
    pregunta: "?Ofrecen clases individuales?",
    respuesta: "¿S?! Las **clases individuales** ofrecen:\n\n? Horarios 100% flexibles\n? Ritmo personalizado\n? Contenido adaptado a tus necesidades\n? Mayor pr¿Ctica oral\n?? Costo diferenciado\n\n*Ideales para objetivos específicos*",
    acciones: [{ texto: "Consultar precios", link: "https://wa.me/543814463243¿Text=Hola!%20Consulta%20sobre%20clases%20individuales" }]
  },
  {
    id: 52,
    categoria: "cursos",
    keywords: ["intensivo", "rapido", "acelerar", "pocas semanas"],
    pregunta: "¿Tienen cursos intensivos?",
    respuesta: "S?, ofrecemos **cursos intensivos**:\n\n? 4-5 clases por semana\n?? 2-3 horas diarias\n?? duración: 2-3 meses por nivel\n?? Ideal para viajes o trabajo pr¡Éximo\n\n*Requiere mayor dedicaci¿N y disponibilidad*",
    acciones: [{ texto: "Consultar fechas", link: "https://wa.me/543814463243¿Text=Hola!%20Consulta%20sobre%20cursos%20intensivos" }]
  },
  {
    id: 53,
    categoria: "cursos",
    keywords: ["extensivo", "regular", "normal", "tranquilo"],
    pregunta: "¿qué es un curso extensivo?",
    respuesta: "El **curso extensivo** es nuestra modalidad regular:\n\n?? 2-3 clases por semana\n?? 1.5 horas por clase\n?? duración: 4-5 meses por nivel\n? Permite compatibilizar con trabajo/estudio\n\n*Ideal para ritmo sostenido*",
    acciones: []
  },
  {
    id: 54,
    categoria: "cursos",
    keywords: ["niños", "nenes", "chicos", "infantil", "kids"],
    pregunta: "¿Tienen cursos para niños?",
    respuesta: "¿S?! Cursos para **niños de 4 a 12 años**:\n\n?? metodología l¿Dica y dinámica\n?? Juegos, canciones y actividades\n?? Material did¿Ctico especial\n???????? comunicación con padres\n?? Seguimiento del progreso\n\n*Grupos reducidos por edad*",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar¿Subject=Consulta cursos para niños" }]
  },
  {
    id: 55,
    categoria: "cursos",
    keywords: ["adolescentes", "teens", "jovenes", "secundario"],
    pregunta: "¿Tienen cursos para adolescentes?",
    respuesta: "Cursos para **adolescentes (13-17 años)**:\n\n?? Tem¿Ticas actuales y relevantes\n?? preparación para ex?menes internacionales\n?? Enfoque comunicativo\n?? Recursos multimedia\n?? Horarios compatibles con el colegio",
    acciones: [{ texto: "Consultar", link: "mailto:info@cemi.edu.ar¿Subject=Consulta cursos para adolescentes" }]
  },
  {
    id: 56,
    categoria: "cursos",
    keywords: ["adultos", "mayores", "grande", "tercera edad"],
    pregunta: "¿Hay l?mite de edad para estudiar?",
    respuesta: "¿No hay l?mite de edad! Tenemos alumnos desde 4 años hasta adultos mayores.\n\n?? Grupos especiales para adultos mayores\n?? Ritmo adaptado\n? Ambiente amigable\n?? Ejercicio mental saludable\n\n*Nunca es tarde para aprender*",
    acciones: []
  },
  {
    id: 57,
    categoria: "cursos",
    keywords: ["empresas", "corporativo", "in company", "trabajo"],
    pregunta: "?Ofrecen cursos para empresas?",
    respuesta: "S?, ofrecemos **capacitaci¿N corporativa**:\n\n?? Cursos in-company en tu empresa\n?? Programas a medida\n?? evaluación de personal\n?? Idioma para negocios\n?? Informes de progreso\n?? Presupuestos especiales",
    acciones: [{ texto: "Solicitar presupuesto", link: "mailto:info@cemi.edu.ar¿Subject=Consulta cursos para empresas" }]
  },
  {
    id: 58,
    categoria: "cursos",
    keywords: ["verano", "vacaciones", "enero", "febrero"],
    pregunta: "¿Tienen cursos de verano?",
    respuesta: "¿S?! En verano ofrecemos:\n\n?? **Intensivos de verano**: Enero-Febrero\n??? Ideal para aprovechar las vacaciones\n? Avanzar un nivel r¿Pidamente\n?? Opciones para niños y adultos\n\n*inscripción en noviembre-diciembre*",
    acciones: []
  },
  {
    id: 59,
    categoria: "cursos",
    keywords: ["sabado", "finde", "fin de semana", "domingo"],
    pregunta: "¿Tienen cursos los fines de semana?",
    respuesta: "Ofrecemos cursos los **s?bados**:\n\n?? Turno mañana: 9:00 a 12:00\n?? Turno tarde: 14:00 a 17:00\n\n*Ideal para quienes trabajan en la semana*\n\n?? Los domingos permanecemos cerrados.",
    acciones: []
  },
  {
    id: 60,
    categoria: "cursos",
    keywords: ["conversacion", "hablar", "speaking", "oral"],
    pregunta: "¿Tienen cursos solo de conversaci¿N?",
    respuesta: "S?, ofrecemos **talleres de conversaci¿N**:\n\n??? 100% pr¿Ctica oral\n? Ambiente relajado\n?? Temas de actualidad\n?? Role-playing y debates\n\n*Requisito: Nivel A2 m¿Nimo*",
    acciones: [{ texto: "Consultar", link: "https://wa.me/543814463243¿Text=Hola!%20Consulta%20sobre%20talleres%20de%20conversaci%C3%B3n" }]
  },
  {
    id: 61,
    categoria: "cursos",
    keywords: ["examen", "preparacion examen", "cambridge", "ielts", "toefl"],
    pregunta: "¿Preparan para ex?menes internacionales?",
    respuesta: "¿S?! Somos centro preparador para:\n\n???? **Cambridge**: KET, PET, FCE, CAE, CPE\n?? **IELTS**: Academic y General\n???? **TOEFL**: iBT\n???? **DELF/DALF**: Franc¿S\n???? **Goethe**: Alem¿N\n???? **CILS**: Italiano\n???? **CELPE-Bras**: Portugu¿S",
    acciones: [{ texto: "Consultar ex?menes", link: "mailto:info@cemi.edu.ar¿Subject=Consulta preparación ex?menes internacionales" }]
  },
  {
    id: 62,
    categoria: "cursos",
    keywords: ["material", "libro", "libros", "recursos"],
    pregunta: "¿qué material utilizan?",
    respuesta: "Utilizamos:\n\n?? Libros de editoriales reconocidas (Cambridge, Pearson, etc.)\n?? Material digital en plataforma Classroom\n?? Audios y videos\n?? Ejercicios interactivos\n?? Material complementario propio\n\n*El costo del libro puede estar incluido o no segÚn el curso*",
    acciones: []
  },
  {
    id: 63,
    categoria: "cursos",
    keywords: ["empezar", "cuando empiezo", "inicio", "comienzo"],
    pregunta: "¿Cu¿Ndo puedo empezar?",
    respuesta: "Tenemos **ingresos flexibles**:\n\n?? Inicio de cuatrimestre: Marzo y Agosto\n?? Ingreso permanente en grupos con cupo\n? Cursos intensivos: Todo el año\n?? Clases individuales: Cuando quieras\n\n*Consult? disponibilidad actual*",
    acciones: [{ texto: "Consultar inicio", link: "https://wa.me/543814463243¿Text=Hola!%20Quiero%20saber%20cuando%20puedo%20empezar" }]
  },
  {
    id: 64,
    categoria: "cursos",
    keywords: ["prueba", "gratis", "demo", "probar"],
    pregunta: "¿Puedo hacer una clase de prueba?",
    respuesta: "¿S?! Ofrecemos:\n\n?? **Clase de prueba gratuita**\n?? Test de nivelaci¿N sin costo\n?? Entrevista con coordinaci¿N\n\nAs? podés conocer nuestra metodología antes de inscribirte.",
    acciones: [{ texto: "Solicitar clase prueba", link: "https://wa.me/543814463243¿Text=Hola!%20Quiero%20solicitar%20una%20clase%20de%20prueba" }]
  },
  {
    id: 65,
    categoria: "cursos",
    keywords: ["cambiar nivel", "subir nivel", "bajar nivel", "reubicacion"],
    pregunta: "¿Puedo cambiar de nivel si no me corresponde?",
    respuesta: "¿Por supuesto! Si sent¿S que:\n\n?? El nivel es muy f¿Cil\n?? El nivel es muy dif¿Cil\n\n? podés solicitar reubicación\n? Se eval?a con el docente y coordinaci¿N\n? Sin costo adicional",
    acciones: []
  },

// ============================================
  // CATEGOR?A 4: INSCRIPCIONES (18 respuestas)
  // ============================================
  {
    id: 66,
    categoria: "inscripciones",
    keywords: ["inscribir", "inscripcion", "anotarme", "registrarme", "como me anoto"],
    pregunta: "¿CÓmo me inscribo?",
    respuesta: "Para inscribirte segu? estos pasos:\n\n1?? Complet? el formulario online o ven? a secretar?a\n2?? Realiz? el test de nivelaci¿N (gratis)\n3?? Eleg? el horario que te convenga\n4?? Abon? la matr¿Cula y primera cuota\n5?? ?Listo! Ya sos alumno CEMI\n\n?? Requisitos: DNI y datos de contacto",
    acciones: [{ texto: "Inscribirme ahora", link: "/register.html" }]
  },
  {
    id: 67,
    categoria: "inscripciones",
    keywords: ["requisitos", "que necesito", "documentos", "papeles"],
    pregunta: "¿qué necesito para inscribirme?",
    respuesta: "Documentaci¿N requerida:\n\n?? **Mayores de 18**: DNI\n?? **Menores**: DNI + DNI del tutor\n?? Email v?lido\n?? Tel?fono de contacto\n\n*No se requiere documentaci¿N adicional para inscripción*",
    acciones: []
  },
  {
    id: 68,
    categoria: "inscripciones",
    keywords: ["online", "internet", "web", "formulario"],
    pregunta: "¿Puedo inscribirme online?",
    respuesta: "¿S?! podés inscribirte 100% online:\n\n?? Complet? el formulario en la web\n?? Recibir¿S confirmaci¿N por email\n?? Pag? online o en secretar?a\n?? Acceso inmediato a la plataforma\n\n*Tambi¿N podés venir presencialmente*",
    acciones: [{ texto: "inscripción online", link: "/register.html" }]
  },
  {
    id: 69,
    categoria: "inscripciones",
    keywords: ["cuando inscribirme", "fechas inscripcion", "periodo", "hasta cuando"],
    pregunta: "¿Cu¿Ndo puedo inscribirme?",
    respuesta: "La inscripción est? abierta:\n\n?? **Todo el año** para cursos con cupo\n?? **Noviembre-Febrero**: Ciclo anual\n?? **Julio**: Segundo cuatrimestre\n\n?? Cupos limitados - ?Inscribite con tiempo!",
    acciones: []
  },
  {
    id: 70,
    categoria: "inscripciones",
    keywords: ["matricula", "inscripcion costo", "costo inscripcion"],
    pregunta: "?La inscripción tiene costo?",
    respuesta: "S?, hay una **matr¿Cula anual** que incluye:\n\n?? inscripción administrativa\n?? Test de nivelaci¿N\n?? Acceso a plataforma Classroom\n?? Cuenta institucional\n\n*Consult? el monto actual en secretar?a*",
    acciones: [{ texto: "Consultar precios", link: "https://wa.me/543814463243¿Text=Hola!%20Quisiera%20consultar%20los%20aranceles" }]
  },
  {
    id: 71,
    categoria: "inscripciones",
    keywords: ["cupo", "lugar", "vacante", "hay lugar"],
    pregunta: "¿Hay cupo disponible?",
    respuesta: "Los cupos var?an segÚn:\n\n?? Idioma y nivel\n?? Horario elegido\n?? ¿Poca del año\n\n? Consult? disponibilidad actual en secretar?a o por WhatsApp.\n?? Reservamos tu lugar con el pago de matr¿Cula.",
    acciones: [{ texto: "Consultar cupo", link: "https://wa.me/543814463243¿Text=Hola!%20Quiero%20consultar%20disponibilidad%20de%20cupos" }]
  },
  {
    id: 72,
    categoria: "inscripciones",
    keywords: ["lista espera", "esperar", "no hay cupo", "lleno"],
    pregunta: "¿qué pasa si no hay cupo?",
    respuesta: "Si no hay cupo en el horario deseado:\n\n?? Te anotamos en **lista de espera**\n?? Te contactamos apenas haya lugar\n?? Te ofrecemos horarios alternativos\n? Abrimos grupos nuevos si hay demanda",
    acciones: []
  },
  {
    id: 73,
    categoria: "inscripciones",
    keywords: ["menor", "hijo", "niño inscripcion", "papa", "mama", "tutor"],
    pregunta: "¿CÓmo inscribo a mi hijo?",
    respuesta: "Para inscribir a un **menor de edad**:\n\n?? Tra? el DNI del niño/a\n???????? DNI del padre/madre/tutor\n?? Complet? la ficha de inscripción\n?? Dej? datos de contacto de emergencia\n\n*El tutor firma la autorizaci¿N*",
    acciones: [{ texto: "Inscribir menor", link: "/register.html" }]
  },
  {
    id: 74,
    categoria: "inscripciones",
    keywords: ["nivelacion", "test nivel", "evaluar nivel", "que nivel soy"],
    pregunta: "¿CÓmo s? qué nivel me corresponde?",
    respuesta: "Realizamos un **test de nivelaci¿N gratuito**:\n\n?? evaluación escrita (30 min)\n??? Entrevista oral breve\n?? Resultado inmediato\n? Te ubicamos en el nivel correcto\n\n*Si nunca estudiaste, empez¿S en A1*",
    acciones: [{ texto: "Solicitar test", link: "https://wa.me/543814463243¿Text=Hola!%20Quiero%20hacer%20el%20test%20de%20nivel" }]
  },
  {
    id: 75,
    categoria: "inscripciones",
    keywords: ["reinscripcion", "renovar", "siguiente nivel", "continuar"],
    pregunta: "¿CÓmo me reinscribo para el siguiente nivel?",
    respuesta: "Para continuar al siguiente nivel:\n\n? Aprobar el nivel actual\n?? Completar ficha de reinscripción\n?? Abonar nueva cuota\n?? **Beneficio**: Sin pagar matr¿Cula nuevamente\n\n*tenés prioridad sobre nuevos inscriptos*",
    acciones: []
  },
  {
    id: 76,
    categoria: "inscripciones",
    keywords: ["baja", "dejar", "abandonar", "darme de baja", "cancelar inscripcion"],
    pregunta: "¿CÓmo me doy de baja?",
    respuesta: "Para darte de baja:\n\n?? Complet? el formulario de baja\n?? Avis? con 15 d?as de anticipaci¿N\n?? No hay reembolso de cuotas pagadas\n?? Se guarda tu historial académico\n\n*podés reincorporarte cuando quieras*",
    acciones: [{ texto: "Solicitar baja", link: "mailto:info@cemi.edu.ar¿Subject=Solicitud de baja" }]
  },
  {
    id: 77,
    categoria: "inscripciones",
    keywords: ["reserva", "guardar lugar", "asegurar"],
    pregunta: "¿Puedo reservar mi lugar?",
    respuesta: "S?, podés **reservar tu lugar**:\n\n?? Con el pago de la matr¿Cula\n?? Se mantiene por 30 d?as\n? Confirmás al pagar primera cuota\n\n?? Sin pago, no garantizamos el cupo.",
    acciones: []
  },
  {
    id: 78,
    categoria: "inscripciones",
    keywords: ["grupo", "amigos", "juntos", "mismo grupo"],
    pregunta: "¿Puedo inscribirme con amigos en el mismo grupo?",
    respuesta: "¿S?! podés solicitar estar en el mismo grupo:\n\n?? Deben tener el mismo nivel\n?? Deben coincidir en horario\n?? Indicalo al momento de inscripción\n\n*Sujeto a disponibilidad de cupos*",
    acciones: []
  },
  {
    id: 79,
    categoria: "inscripciones",
    keywords: ["transferir", "ceder", "pasar inscripcion"],
    pregunta: "¿Puedo transferir mi inscripción a otra persona?",
    respuesta: "La inscripción es **personal e intransferible**.\n\n? No se puede ceder a terceros\n? podés solicitar baja y la otra persona inscribirse\n\n*Consult? opciones en secretar?a*",
    acciones: []
  },
  {
    id: 80,
    categoria: "inscripciones",
    keywords: ["reincorporar", "volver", "retomar", "hace tiempo"],
    pregunta: "Dej? de estudiar hace tiempo, ¿Puedo volver?",
    respuesta: "¿Por supuesto! Para reincorporarte:\n\n?? Realiz? un nuevo test de nivelaci¿N\n?? Actualizamos tu ficha\n?? Abon¿S matr¿Cula y cuota\n?? Retomás desde tu nivel actual\n\n*¿Nunca es tarde para volver!*",
    acciones: [{ texto: "Reincorporarme", link: "https://wa.me/543814463243¿Text=Hola!%20Quiero%20reincorporarme%20a%20CEMI" }]
  },
  {
    id: 81,
    categoria: "inscripciones",
    keywords: ["cambiar idioma", "otro idioma", "pasar a otro"],
    pregunta: "¿Puedo cambiar a otro idioma?",
    respuesta: "S?, podés cambiar de idioma:\n\n?? Avis? en secretar?a\n?? Hac? test de nivel del nuevo idioma\n?? Te reubicamos en un grupo\n\n*Sujeto a disponibilidad de cupos*",
    acciones: []
  },
  {
    id: 82,
    categoria: "inscripciones",
    keywords: ["segundo idioma", "agregar idioma", "otro idioma mas"],
    pregunta: "¿Puedo agregar un segundo idioma?",
    respuesta: "¿Claro! podés estudiar más de un idioma:\n\n?? Inscribite en ambos cursos\n?? Eleg? horarios compatibles\n?? Abon¿S cada curso por separado\n?? **Descuento** por segundo idioma (consult?)\n\n*Recomendamos no más de 2 simult¿Neos*",
    acciones: []
  },
  {
    id: 83,
    categoria: "inscripciones",
    keywords: ["extranjero", "no argentino", "otro pais", "turista"],
    pregunta: "¿Pueden inscribirse extranjeros?",
    respuesta: "¿S?! Aceptamos estudiantes de cualquier nacionalidad:\n\n?? Pasaporte o documento de identidad\n?? Email v?lido\n?? Tel?fono de contacto\n\n*Sin requisitos migratorios especiales*",
    acciones: []
  },

  // ============================================
  // CATEGOR?A 5: PAGOS Y ARANCELES (18 respuestas)
  // ============================================
  {
    id: 84,
    categoria: "pagos",
    keywords: ["cuanto cuesta", "precio", "valor", "costo", "aranceles"],
    pregunta: "¿Cu¿Nto cuestan los cursos?",
    respuesta: "Los aranceles var?an segÚn:\n\n?? Tipo de curso (grupal/individual)\n?? Cantidad de horas semanales\n?? Idioma elegido\n\n?? **Cuota mensual grupal**: Desde $50.000\n?? **Clase individual**: Desde $90.000/hora\n\n*Consult? valores actualizados*",
    acciones: [{ texto: "Consultar precios", link: "https://wa.me/543814463243¿Text=Hola!%20Quisiera%20consultar%20los%20aranceles" }]
  },
  {
    id: 85,
    categoria: "pagos",
    keywords: ["pagar", "como pago", "formas de pago", "medios de pago", "abonar"],
    pregunta: "¿CÓmo puedo pagar?",
    respuesta: "Aceptamos m?ltiples medios de pago:\n\n?? **Tarjeta de cr¿Dito/d?bito**\n?? **MercadoPago** (desde la plataforma)\n?? **Transferencia bancaria**\n?? **Efectivo** en secretar?a\n?? **QR** de MercadoPago\n\n*Pag? desde tu casa o presencialmente*",
    acciones: [{ texto: "Pagar ahora", link: "/dashboard_alumno.html#pagos" }]
  },
  {
    id: 86,
    categoria: "pagos",
    keywords: ["mercadopago", "mp", "mercado pago"],
    pregunta: "¿Puedo pagar con MercadoPago?",
    respuesta: "¿S?! MercadoPago es uno de nuestros m¿Todos principales:\n\n? Desde tu dashboard de alumno\n? Con tarjeta o dinero en cuenta\n? Comprobante autom¿Tico\n? Cuotas sin inter¿S (segÚn promo)\n\n*Link de pago tambi¿N disponible por WhatsApp*",
    acciones: []
  },
  {
    id: 87,
    categoria: "pagos",
    keywords: ["tarjeta", "credito", "debito", "visa", "mastercard"],
    pregunta: "?Aceptan tarjeta de cr¿Dito?",
    respuesta: "S?, aceptamos tarjetas:\n\n?? Visa, Mastercard, American Express\n?? Tarjetas de d?bito\n?? A trav¿S de MercadoPago\n?? En secretar?a con posnet\n\n*Consult? promociones de cuotas sin inter¿S*",
    acciones: []
  },
  {
    id: 88,
    categoria: "pagos",
    keywords: ["transferencia", "cbu", "alias", "banco", "deposito"],
    pregunta: "¿Puedo pagar por transferencia?",
    respuesta: "S?, aceptamos transferencias:\n\n?? **Banco**: Banco Macro\n?? **CBU**: 9984066521875490002191000\n?? **Alias**: cemi.idiomas\n?? **Titular**: CEMI S.A.\n\n?? Envi? el comprobante por email o WhatsApp",
    acciones: []
  },
  {
    id: 89,
    categoria: "pagos",
    keywords: ["efectivo", "cash", "billetes", "contado"],
    pregunta: "¿Puedo pagar en efectivo?",
    respuesta: "S?, podés pagar en efectivo:\n\n?? En secretar?a del instituto\n?? Horario de atención\n?? Te damos recibo oficial\n\n*Tra? el monto exacto de ser posible*",
    acciones: []
  },
  {
    id: 90,
    categoria: "pagos",
    keywords: ["vencimiento", "cuando vence", "fecha pago", "limite"],
    pregunta: "¿Cu¿Ndo vence la cuota?",
    respuesta: "Las cuotas vencen:\n\n?? **D?a 10** de cada mes\n?? Despu¿S del 10: recargo por mora\n?? Recordatorio por email antes del vencimiento\n\n*podés activar d?bito autom¿Tico*",
    acciones: []
  },
  {
    id: 91,
    categoria: "pagos",
    keywords: ["recargo", "mora", "atraso", "pago tarde", "despues"],
    pregunta: "¿Hay recargo por pagar tarde?",
    respuesta: "S?, despu¿S del vencimiento:\n\n?? Del 11 al 20: 10% de recargo\n?? Despu¿S del 20: 15% de recargo\n\n?? Con 2+ cuotas impagas se suspende el acceso a clases.\n\n*Comunicate si tenés dificultades de pago*",
    acciones: []
  },
  {
    id: 92,
    categoria: "pagos",
    keywords: ["descuento", "promocion", "oferta", "rebaja"],
    pregunta: "¿Tienen descuentos?",
    respuesta: "Ofrecemos descuentos por:\n\n???????? **Grupo familiar**: 10% segundo inscripto\n?? **Pago anual anticipado**: 15% off\n?? **Estudiantes universitarios**: 10%\n?? **Jubilados**: 10%\n?? **Convenios empresas**: Consult?\n\n*Los descuentos no son acumulables*",
    acciones: []
  },
  {
    id: 93,
    categoria: "pagos",
    keywords: ["beca", "ayuda economica", "no puedo pagar", "dificultad"],
    pregunta: "¿Tienen becas?",
    respuesta: "S?, ofrecemos un programa de **becas**:\n\n?? Present? solicitud en secretar?a\n?? Documentaci¿N socioecon?mica\n?? evaluación caso por caso\n?? Becas parciales (30-50%)\n\n*Cupos limitados por per?odo*",
    acciones: [{ texto: "Solicitar beca", link: "mailto:info@cemi.edu.ar¿Subject=Solicitud de beca" }]
  },
  {
    id: 94,
    categoria: "pagos",
    keywords: ["comprobante", "recibo", "factura", "boleta"],
    pregunta: "¿Entregan comprobante de pago?",
    respuesta: "S?, siempre entregamos comprobante:\n\n?? **Pago online**: Comprobante por email autom¿Tico\n?? **Efectivo**: Recibo en el momento\n?? **Factura**: Disponible si la necesit¿S\n\n*Guard? tus comprobantes*",
    acciones: []
  },
  {
    id: 95,
    categoria: "pagos",
    keywords: ["factura a", "factura b", "monotributo", "empresa"],
    pregunta: "¿Hacen factura A o B?",
    respuesta: "Emitimos:\n\n?? **Factura B**: Para consumidores finales\n?? **Factura A**: Para responsables inscriptos\n\n?? Solicitala indicando CUIT y datos fiscales.\n\n*Pedila antes de pagar*",
    acciones: []
  },
  {
    id: 96,
    categoria: "pagos",
    keywords: ["reembolso", "devolucion", "devolver plata", "cancelar"],
    pregunta: "¿Puedo pedir reembolso?",
    respuesta: "Pol¿Tica de reembolso:\n\n? No se devuelve matr¿Cula\n? No se devuelven cuotas de meses cursados\n? Cr¿Dito a favor por baja anticipada (casos excepcionales)\n\n*Consult? tu situaci¿N particular en secretar?a*",
    acciones: []
  },
  {
    id: 97,
    categoria: "pagos",
    keywords: ["cuotas", "plan cuotas", "financiar", "pagar en cuotas"],
    pregunta: "¿Puedo pagar en cuotas?",
    respuesta: "Opciones de financiamiento:\n\n?? **Tarjeta de cr¿Dito**: Hasta 6 cuotas sin inter¿S (segÚn promo)\n?? **Cuota mensual**: Es el sistema regular\n?? **Pago anticipado**: Descuento especial\n\n*Consult? promociones vigentes*",
    acciones: []
  },
  {
    id: 98,
    categoria: "pagos",
    keywords: ["debito automatico", "automatico", "auto", "cobro automatico"],
    pregunta: "¿Tienen d?bito autom¿Tico?",
    respuesta: "S?, podés activar **d?bito autom¿Tico**:\n\n?? Con tarjeta de cr¿Dito o d?bito\n?? Configuralo desde tu dashboard\n? Te descontamos el d?a del vencimiento\n?? Notificaci¿N previa\n\n*Evit? recargos y olvidos*",
    acciones: []
  },
  {
    id: 99,
    categoria: "pagos",
    keywords: ["debo", "deuda", "cuotas adeudadas", "deber"],
    pregunta: "¿CÓmo s? si tengo cuotas adeudadas?",
    respuesta: "podés verificar tu estado de cuenta:\n\n?? Desde tu **Dashboard de alumno**\n?? Recibir¿S avisos por email\n?? Consultando en secretar?a\n?? Por WhatsApp\n\n*Regulariz? tu situaci¿N para continuar cursando*",
    acciones: []
  },
  {
    id: 100,
    categoria: "pagos",
    keywords: ["precio clases individuales", "particular precio", "costo privada"],
    pregunta: "¿Cu¿Nto cuestan las clases individuales?",
    respuesta: "Las **clases individuales** tienen un costo por hora:\n\n?? Valor hora: Desde $90.000\n?? Pack 4 clases: Descuento del 10%\n?? Pack 8 clases: Descuento del 15%\n\n*Precio segÚn idioma y nivel*",
    acciones: [{ texto: "Consultar precios", link: "https://wa.me/543814463243¿Text=Hola!%20Consulta%20sobre%20clases%20individuales" }]
  },
  {
    id: 101,
    categoria: "pagos",
    keywords: ["libro aparte", "material costo", "libro incluido"],
    pregunta: "¿El libro est? incluido en la cuota?",
    respuesta: "Depende del curso:\n\n?? **Cursos grupales**: Libro aparte (se compra una vez)\n?? **Cursos individuales**: Material digital incluido\n?? **Plataforma Classroom**: Incluida en todos\n\n*Consult? el costo del material para tu curso*",
    acciones: []
  },

  // ============================================
  // CATEGOR?A 6: DOCENTES (12 respuestas)
  // ============================================
  {
    id: 129,
    categoria: "docentes",
    keywords: ["profesores", "docentes", "maestros", "quienes ense?an"],
    pregunta: "¿QuiÉnes son los profesores?",
    respuesta: "Nuestro equipo docente:\n\n????? Profesores con tÍtulo habilitante\n?? Docentes nativos y Bilingües\n?? Certificaciones internacionales\n?? formaciÓn pedag¡Gica continua\n?? Experiencia en enseñanza\n\n*Conocelos en nuestra web*",
    acciones: []
  },
  {
    id: 130,
    categoria: "docentes",
    keywords: ["nativo", "native", "hablante nativo"],
    pregunta: "¿Tienen profesores nativos?",
    respuesta: "Contamos con:\n\n?? **Profesores nativos** certificados\n????? **Bilingües** con nivel nativo\n?? Todos con formaciÓn docente\n\n*Se asignan segÚn nivel y disponibilidad*",
    acciones: []
  },
  {
    id: 131,
    categoria: "docentes",
    keywords: ["titulo", "certificado profesor", "habilitado"],
    pregunta: "¿Los profesores tienen tÍtulo?",
    respuesta: "Todos nuestros docentes tienen:\n\n?? tÍtulo de Profesor/Traductor\n?? Certificaciones internacionales (CAE, CPE, etc.)\n?? formaciÓn pedag¡Gica\n?? Capacitaci¿N continua\n\n*Calidad educativa garantizada*",
    acciones: []
  },
  {
    id: 132,
    categoria: "docentes",
    keywords: ["contactar profesor", "hablar profesor", "mail profesor"],
    pregunta: "¿CÓmo contacto a mi profesor?",
    respuesta: "podés contactar a tu docente:\n\n?? Por el **chat de Classroom**\n?? Email institucional del profesor\n?? En persona antes/despu¿S de clase\n?? A trav¿S de secretar?a\n\n*Us? siempre los canales oficiales*",
    acciones: []
  },
  {
    id: 133,
    categoria: "docentes",
    keywords: ["cambiar profesor", "otro profesor", "no me gusta"],
    pregunta: "¿Puedo cambiar de profesor?",
    respuesta: "El cambio de profesor implica cambiar de grupo:\n\n?? Solicitalo en secretar?a\n?? Se eval?a disponibilidad\n?? Otro grupo = otro docente\n\n*Escuchamos tus inquietudes*",
    acciones: []
  },
  {
    id: 134,
    categoria: "docentes",
    keywords: ["tutoria", "consulta profesor", "ayuda extra", "clase apoyo"],
    pregunta: "¿Hay tutorÍas con los profesores?",
    respuesta: "S?, ofrecemos apoyo adicional:\n\n?? **tutorías**: Consultas puntuales\n?? **Foro**: Preguntas en Classroom\n?? **Email**: Consultas al docente\n?? **Horario de consulta**: Antes/despu¿S de clase\n\n*Los profes est¿N para ayudarte*",
    acciones: []
  },
  {
    id: 135,
    categoria: "docentes",
    keywords: ["metodologia profesor", "como ense?an", "forma de dar clase"],
    pregunta: "¿CÓmo ense?an los profesores?",
    respuesta: "metodología de enseñanza:\n\n??? **Enfoque comunicativo**\n?? Actividades dinámicas e interactivas\n?? Uso de tecnología\n?? Material actualizado\n?? Objetivos claros por clase\n?? Participaci¿N activa del alumno",
    acciones: []
  },
  {
    id: 136,
    categoria: "docentes",
    keywords: ["profesor falta", "suplente", "no vino el profesor"],
    pregunta: "¿qué pasa si el profesor falta?",
    respuesta: "En caso de ausencia del docente:\n\n????? Se asigna profesor suplente\n?? Se avisa con anticipaci¿N (si es posible)\n?? Se reprograma la clase\n?? No se cobra clase no dada\n\n*Siempre hay alternativas*",
    acciones: []
  },
  {
    id: 137,
    categoria: "docentes",
    keywords: ["evaluar profesor", "opinion profesor", "feedback docente"],
    pregunta: "¿Puedo evaluar al profesor?",
    respuesta: "¿S?! Valoramos tu opini¿N:\n\n?? **Encuestas** al final de cada nivel\n?? **Buz¿N de sugerencias**\n?? **Entrevista** con coordinaci¿N\n\n*Tu feedback nos ayuda a mejorar*",
    acciones: []
  },
  {
    id: 138,
    categoria: "docentes",
    keywords: ["experiencia profesor", "años profesor", "trayectoria"],
    pregunta: "¿Los profesores tienen experiencia?",
    respuesta: "Nuestros docentes cuentan con:\n\n?? M¿Nimo 2 años de experiencia\n?? formaciÓn continua\n?? Trayectoria comprobable\n?? Referencias verificables\n\n*Seleccionamos los mejores profesionales*",
    acciones: []
  },
  {
    id: 139,
    categoria: "docentes",
    keywords: ["cuantos profesores", "plantel", "equipo docente"],
    pregunta: "¿Cu¿Ntos profesores tienen?",
    respuesta: "Contamos con un equipo de más de 20 profesores:\n\n????? Especialistas por idioma\n?? Nativos y Bilingües\n?? formaciÓn diversa\n?? Tiempo completo y parcial\n\n*Equipo en constante crecimiento*",
    acciones: []
  },
  {
    id: 140,
    categoria: "docentes",
    keywords: ["capacitacion docente", "actualizacion", "formacion continua"],
    pregunta: "¿Los profesores se capacitan?",
    respuesta: "S?, inversi¿N constante en formaciÓn:\n\n?? Cursos de actualizaci¿N\n?? Congresos y seminarios\n?? Certificaciones internacionales\n?? Capacitaci¿N en tecnología educativa\n\n*Docentes siempre actualizados*",
    acciones: []
  },

  // ============================================
  // CATEGOR?A 9: CERTIFICACIONES (14 respuestas)
  // ============================================
  {
    id: 141,
    categoria: "certificaciones",
    keywords: ["certificado", "titulo", "diploma", "constancia"],
    pregunta: "¿Entregan certificados?",
    respuesta: "S?, entregamos:\n\n?? **Certificado** al completar cada nivel\n?? **Diploma** al terminar el programa\n?? **Constancias** de alumno regular\n?? **Anal¿Ticos** con notas detalladas\n\n*Todos con validez institucional*",
    acciones: []
  },
  {
    id: 142,
    categoria: "certificaciones",
    keywords: ["validez certificado", "oficial", "reconocido", "sirve para"],
    pregunta: "¿El certificado tiene validez oficial?",
    respuesta: "Nuestros certificados:\n\n? **Validez institucional** reconocida\n?? Aceptados por empresas\n?? ¿Tiles para CV y entrevistas\n?? Especifican nivel alcanzado (A1-C2)\n\n*Para validez internacional, preparamos para ex?menes internacionales*",
    acciones: []
  },
  {
    id: 143,
    categoria: "certificaciones",
    keywords: ["examen internacional", "cambridge", "toefl", "ielts", "delf"],
    pregunta: "¿Preparan para ex?menes internacionales?",
    respuesta: "S?, preparamos para:\n\n???? **Ingl¿S**: Cambridge (KET, PET, FCE, CAE, CPE), TOEFL, IELTS\n???? **Franc¿S**: DELF, DALF\n???? **Alem¿N**: Goethe-Zertifikat\n???? **Italiano**: CELI, CILS\n???? **Portugu¿S**: CELPE-Bras\n\n*Cursos específicos de preparación*",
    acciones: []
  },
  {
    id: 144,
    categoria: "certificaciones",
    keywords: ["first certificate", "fce", "b2", "cambridge b2"],
    pregunta: "¿Preparan para el First Certificate?",
    respuesta: "¿S?! Curso de preparación **FCE (B2)**:\n\n?? Cobertura de las 4 habilidades\n?? Pr¿Ctica de Writing\n??? Simulacros de Speaking\n?? Estrategias de Reading y Use of English\n?? Pr¿Ctica de Listening\n\n*Fechas de examen: Marzo, Junio, Diciembre*",
    acciones: []
  },
  {
    id: 145,
    categoria: "certificaciones",
    keywords: ["costo certificado", "precio diploma", "cuanto sale"],
    pregunta: "?Los certificados tienen costo?",
    respuesta: "Costos de certificación:\n\n?? **Certificado de nivel**: Incluido en la cuota\n?? **Diploma final**: Incluido\n?? **Constancias extra**: Costo m¿Nimo\n?? **Duplicados**: Costo de emisi¿N\n\n*Ex?menes internacionales: arancel aparte (Cambridge, etc.)*",
    acciones: []
  },
  {
    id: 146,
    categoria: "certificaciones",
    keywords: ["cuanto tarda certificado", "cuando recibo", "demora certificado"],
    pregunta: "¿Cu¿Nto tarda en salir el certificado?",
    respuesta: "Tiempos de entrega:\n\n?? **Certificado de nivel**: 30 d?as aprox.\n?? **Constancias**: 48-72hs\n?? **Diploma final**: 60 d?as\n?? **Ex?menes internacionales**: 4-8 semanas (depende del organismo)\n\n*Te avisamos cuando est? listo*",
    acciones: []
  },
  {
    id: 147,
    categoria: "certificaciones",
    keywords: ["requisitos certificado", "como obtengo", "que necesito"],
    pregunta: "¿qué necesito para obtener el certificado?",
    respuesta: "Requisitos para certificar:\n\n? Aprobar el examen final del nivel\n? Tener 75% de asistencia m¿Nima\n? Cuotas al d?a\n? Completar actividades requeridas\n\n*Cumpliendo esto, obtenés tu certificado autom¿Ticamente*",
    acciones: []
  },
  {
    id: 148,
    categoria: "certificaciones",
    keywords: ["perdi certificado", "duplicado", "otro certificado", "se me perdio"],
    pregunta: "¿Puedo pedir un duplicado del certificado?",
    respuesta: "S?, podés solicitar duplicado:\n\n?? Solicitalo en secretar?a\n?? Complet? formulario\n?? Abona costo de emisi¿N\n?? Entrega en 7-10 d?as h?biles\n\n*Guardamos registro de todos los certificados emitidos*",
    acciones: []
  },
  {
    id: 149,
    categoria: "certificaciones",
    keywords: ["nivel marco europeo", "a1 a2 b1 b2", "cefr", "mcer"],
    pregunta: "¿qué significa A1, B2, etc.?",
    respuesta: "Son niveles del **Marco Com¿N Europeo (MCER)**:\n\n?? **A1**: Principiante\n?? **A2**: Elemental\n?? **B1**: Intermedio\n?? **B2**: Intermedio Alto\n?? **C1**: Avanzado\n?? **C2**: Maestr?a/Nativo\n\n*Nuestros cursos est¿N alineados al MCER*",
    acciones: []
  },
  {
    id: 150,
    categoria: "certificaciones",
    keywords: ["equivalencia nivel", "cuanto tiempo nivel", "b2 cuanto"],
    pregunta: "¿Cu¿Nto tiempo para alcanzar cada nivel?",
    respuesta: "Tiempo aproximado desde cero:\n\n?? **A1**: 2-3 meses\n?? **A2**: 4-6 meses\n?? **B1**: 8-12 meses\n?? **B2**: 18-24 meses\n?? **C1**: 30-36 meses\n\n*Depende de dedicaci¿N e intensidad*",
    acciones: []
  },
  {
    id: 151,
    categoria: "certificaciones",
    keywords: ["centro examinador", "donde rinden", "sede examen"],
    pregunta: "¿Son centro examinador oficial?",
    respuesta: "Somos:\n\n? Centro preparador autorizado\n?? Los ex?menes se rinden en centros oficiales\n?? Te asesoramos en inscripción\n?? Coordinamos fechas\n\n*Te acompañamos en todo el proceso*",
    acciones: []
  },
  {
    id: 152,
    categoria: "certificaciones",
    keywords: ["curriculum", "cv", "como pongo certificado"],
    pregunta: "¿CÓmo incluyo el certificado en mi CV?",
    respuesta: "En tu CV pon?:\n\n?? **Idioma**: Ingl¿S (u otro)\n?? **Nivel**: B2 (Intermedio Alto)\n?? **institución**: CEMI\n?? **año**: 2024\n?? **certificación**: Cambridge FCE (si aplica)\n\n*Un nivel certificado suma mucho al CV*",
    acciones: []
  },
  {
    id: 153,
    categoria: "certificaciones",
    keywords: ["empresa certificado", "para trabajo", "pide mi empresa"],
    pregunta: "Mi empresa pide certificado, ¿Sirve el de CEMI?",
    respuesta: "Nuestros certificados son:\n\n? Reconocidos por empresas locales\n? Especifican nivel MCER (A1-C2)\n?? Incluyen carga horaria y contenidos\n?? V?lidos para RRHH\n\n*Para multinacionales, recomendamos certificación internacional*",
    acciones: []
  },
  {
    id: 154,
    categoria: "certificaciones",
    keywords: ["legalizar certificado", "apostillar", "validez exterior"],
    pregunta: "¿Puedo legalizar/apostillar el certificado?",
    respuesta: "Para uso en el exterior:\n\n?? Nuestros certificados institucionales no se apostillan\n?? Para validez internacional: ex?menes Cambridge, TOEFL, DELF, etc.\n? Esos S? tienen reconocimiento mundial\n\n*Te preparamos para esas certificaciones*",
    acciones: []
  },

  // ============================================
  // CATEGOR?A 10: PLATAFORMA ONLINE (16 respuestas)
  // ============================================
  {
    id: 155,
    categoria: "plataforma",
    keywords: ["classroom", "plataforma", "aula virtual", "campus"],
    pregunta: "¿qué es la plataforma Classroom?",
    respuesta: "Es nuestra **aula virtual** integrada:\n\n?? Material de estudio\n?? Tareas y actividades\n?? Notas y seguimiento\n?? Chat con profesores\n?? Clases grabadas\n?? Recursos descargables\n\n*Acced¿S con tu usuario y contrase?a*",
    acciones: [{ texto: "Ir a Classroom", link: "/classroom-login.html" }]
  },
  {
    id: 156,
    categoria: "plataforma",
    keywords: ["como entro", "ingresar classroom", "acceder plataforma"],
    pregunta: "¿CÓmo ingreso a Classroom?",
    respuesta: "Para ingresar:\n\n1?? And? a la web del instituto\n2?? Hac? clic en **\"Classroom\"**\n3?? Ingres? tu **usuario y contrase?a**\n4?? ?Listo!\n\n*Credenciales enviadas por email al inscribirte*",
    acciones: [{ texto: "Ir a Classroom", link: "/classroom-login.html" }]
  },
  {
    id: 157,
    categoria: "plataforma",
    keywords: ["olvide contrase?a", "no puedo entrar", "recuperar clave", "restablecer"],
    pregunta: "Olvid? mi contrase?a de Classroom",
    respuesta: "Para recuperar tu contrase?a:\n\n1?? En la pantalla de login, clic en **\"?Olvidaste tu contrase?a?\"**\n2?? Ingres? tu email registrado\n3?? Recibir¿S un link de recuperaci¿N\n4?? Cre? una nueva contrase?a\n\n*Si no funciona, contact? a soporte*",
    acciones: [{ texto: "Ir a login", link: "/login.html" }]
  },
  {
    id: 158,
    categoria: "plataforma",
    keywords: ["material", "archivos", "recursos", "donde descargo"],
    pregunta: "¿dónde encuentro el material de estudio?",
    respuesta: "En Classroom encontr¿S:\n\n?? **Recursos**: Material por unidad\n?? **Biblioteca**: PDFs y documentos\n?? **Audios**: Listening practice\n?? **Videos**: Contenido multimedia\n\n*Todo organizado por nivel y unidad*",
    acciones: [{ texto: "Ir a Classroom", link: "/classroom-login.html" }]
  },
  {
    id: 159,
    categoria: "plataforma",
    keywords: ["tarea", "entregar tarea", "subir tarea", "homework"],
    pregunta: "¿CÓmo entrego las tareas?",
    respuesta: "Para entregar tareas:\n\n1?? Ingres? a **Classroom**\n2?? And? a **\"Tareas pendientes\"**\n3?? Abr? la tarea asignada\n4?? Sub? tu archivo o complet? online\n5?? Clic en **\"Entregar\"**\n\n*Respet? las fechas de entrega*",
    acciones: []
  },
  {
    id: 160,
    categoria: "plataforma",
    keywords: ["ver notas", "calificaciones", "como me fue", "resultados"],
    pregunta: "¿dónde veo mis notas?",
    respuesta: "Tus calificaciones est¿N en:\n\n?? **Classroom > Mi progreso**\n?? Notas por actividad\n?? Promedio general\n?? Comentarios del profesor\n\n*Se actualizan despu¿S de cada correcci¿N*",
    acciones: []
  },
  {
    id: 161,
    categoria: "plataforma",
    keywords: ["clase grabada", "grabacion", "ver clase", "me perdi clase"],
    pregunta: "¿Puedo ver las clases grabadas?",
    respuesta: "S?, clases grabadas disponibles:\n\n?? En **Classroom > Clases grabadas**\n?? Disponibles por 30 d?as\n?? Organizadas por fecha\n\n*Solo para clases virtuales/h?bridas*\n\n?? Las clases presenciales no se graban",
    acciones: []
  },
  {
    id: 162,
    categoria: "plataforma",
    keywords: ["app celular", "aplicacion movil", "desde celular"],
    pregunta: "¿Hay app para celular?",
    respuesta: "S?, tenemos **app m?vil CEMI**:\n\n?? Disponible para Android\n?? Notificaciones de clases\n?? Acceso a materiales\n? Consulta de notas\n?? Chat con profesores\n\n*Descargala desde el sitio o Play Store*",
    acciones: []
  },
  {
    id: 163,
    categoria: "plataforma",
    keywords: ["no carga", "error plataforma", "problema classroom", "no funciona"],
    pregunta: "La plataforma no funciona, ¿qué hago?",
    respuesta: "Prob? estos pasos:\n\n1?? **Refresc?** la p¡Gina (F5)\n2?? **Borr? cookies** del navegador\n3?? Prob? con **otro navegador**\n4?? Verific? tu **conexi¿N a internet**\n\nSi persiste:\n?? Contact? a soporte@cemi.edu.ar",
    acciones: [{ texto: "Contactar soporte", link: "mailto:soporte@cemi.edu.ar" }]
  },
  {
    id: 164,
    categoria: "plataforma",
    keywords: ["navegador", "chrome", "firefox", "cual uso"],
    pregunta: "¿qué navegador debo usar?",
    respuesta: "Navegadores recomendados:\n\n? **Google Chrome** (mejor opci¿N)\n? **Firefox**\n? **Edge**\n?? **Safari**: Funciona pero con limitaciones\n?? **Internet Explorer**: No soportado\n\n*Mantené el navegador actualizado*",
    acciones: []
  },
  {
    id: 165,
    categoria: "plataforma",
    keywords: ["cambiar foto", "avatar", "foto perfil", "imagen perfil"],
    pregunta: "¿CÓmo cambio mi foto de perfil?",
    respuesta: "Para cambiar tu avatar:\n\n1?? Ingres? a **Classroom**\n2?? Clic en tu **nombre/foto** arriba\n3?? Seleccion? **\"Editar perfil\"**\n4?? Sub? tu nueva foto\n5?? Guard? cambios\n\n*Us? una foto apropiada*",
    acciones: []
  },
  {
    id: 166,
    categoria: "plataforma",
    keywords: ["notificaciones", "avisos", "alertas", "me avisa"],
    pregunta: "¿CÓmo recibo notificaciones?",
    respuesta: "Te notificamos por:\n\n?? **Email**: Tareas, notas, avisos\n?? **Push**: En la app m?vil\n?? **Classroom**: Campana de notificaciones\n\n*Configur? tus preferencias en el perfil*",
    acciones: []
  },
  {
    id: 167,
    categoria: "plataforma",
    keywords: ["chat profesor", "mensaje profesor", "comunicarme"],
    pregunta: "¿CÓmo me comunico con el profesor?",
    respuesta: "Canales de comunicación:\n\n?? **Chat de Classroom**: Mensajes directos\n?? **Email institucional**: Para consultas formales\n??? **En clase**: Antes o despu¿S\n?? **Foro**: Dudas grupales\n\n*Respet? los horarios de respuesta*",
    acciones: []
  },
  {
    id: 168,
    categoria: "plataforma",
    keywords: ["zoom", "meet", "clase virtual", "videollamada"],
    pregunta: "¿CÓmo accedo a las clases virtuales?",
    respuesta: "Para clases online:\n\n1?? Ingres? a **Classroom**\n2?? En tu curso, busc? **\"Unirse a clase\"**\n3?? Se abrir? **Zoom/Meet** autom¿Ticamente\n4?? Us? audio y c?mara\n\n*El link est? en el tabl¿N del curso*",
    acciones: []
  },
  {
    id: 169,
    categoria: "plataforma",
    keywords: ["descargar", "bajar material", "guardar pdf"],
    pregunta: "¿Puedo descargar los materiales?",
    respuesta: "S?, podés descargar:\n\n?? PDFs y documentos\n?? Archivos de audio\n?? Ejercicios imprimibles\n\n?? Algunos contenidos son solo online\n?? Material solo para uso personal/educativo",
    acciones: []
  },
  {
    id: 170,
    categoria: "plataforma",
    keywords: ["offline", "sin internet", "desconectado"],
    pregunta: "¿Puedo usar Classroom sin internet?",
    respuesta: "Opciones offline:\n\n?? Descarg? materiales cuando tengas conexi¿N\n?? App m?vil permite ver contenido descargado\n?? Tareas y chat requieren conexi¿N\n\n*Mejor experiencia: siempre conectado*",
    acciones: []
  },

  // ============================================
  // CATEGOR?A 11: CALENDARIO académicO (10 respuestas)
  // ============================================
  {
    id: 171,
    categoria: "calendario",
    keywords: ["calendario", "fechas importantes", "cronograma", "agenda"],
    pregunta: "¿dónde veo el calendario académico?",
    respuesta: "El calendario académico est? disponible:\n\n?? En nuestra **web**: /calendario\n?? En la **app m?vil**\n?? En **secretar?a** (impreso)\n\n*Incluye fechas de inicio, ex?menes, feriados y recesos*",
    acciones: [{ texto: "Consultar calendario", link: "https://wa.me/543814463243¿Text=Hola!%20Quisiera%20consultar%20el%20calendario%20acad%C3%A9mico" }]
  },
  {
    id: 172,
    categoria: "calendario",
    keywords: ["cuando empiezo", "inicio cursada", "arranco"],
    pregunta: "¿Cu¿Ndo empieza el pr¡Éximo ciclo?",
    respuesta: "Inicios de cursada:\n\n?? **Marzo**: Ciclo anual\n?? **Agosto**: Segundo cuatrimestre\n?? **Enero**: Intensivo de verano\n\n*Fechas exactas en el calendario académico*",
    acciones: [{ texto: "Consultar fechas", link: "https://wa.me/543814463243¿Text=Hola!%20Quisiera%20saber%20cuando%20empiezan%20las%20clases" }]
  },
  {
    id: 173,
    categoria: "calendario",
    keywords: ["examen final", "fecha examen", "finales"],
    pregunta: "¿Cu¿Ndo son los ex?menes finales?",
    respuesta: "Per?odos de ex?menes:\n\n?? **Julio**: Fin primer cuatrimestre\n?? **Diciembre**: Fin segundo cuatrimestre\n?? **Febrero**: Mesa de recuperatorios\n\n*Fechas específicas var?an por nivel*",
    acciones: []
  },
  {
    id: 174,
    categoria: "calendario",
    keywords: ["vacaciones invierno", "julio", "receso julio"],
    pregunta: "¿Cu¿Ndo son las vacaciones de invierno?",
    respuesta: "Receso de invierno:\n\n?? **Dos semanas en julio**\n?? Generalmente coincide con vacaciones escolares\n?? Las clases se retoman la 3ra semana de julio\n\n*Consult? fechas exactas en el calendario*",
    acciones: []
  },
  {
    id: 175,
    categoria: "calendario",
    keywords: ["vacaciones verano", "diciembre", "enero febrero"],
    pregunta: "¿Cu¿Ndo son las vacaciones de verano?",
    respuesta: "Receso de verano:\n\n?? **Diciembre a Febrero**\n?? Clases terminan en diciembre\n?? Reinicio en marzo\n?? Cursos intensivos opcionales en enero\n\n*Secretar?a tiene horario reducido en enero*",
    acciones: []
  },
  {
    id: 176,
    categoria: "calendario",
    keywords: ["inscripcion cuando", "fecha inscripcion", "abren inscripcion"],
    pregunta: "¿Cu¿Ndo abren las inscripciones?",
    respuesta: "Per?odos de inscripción:\n\n?? **Febrero-Marzo**: Para ciclo anual\n?? **Julio-Agosto**: Para 2do cuatrimestre\n?? **Diciembre**: Para intensivo de verano\n?? **Todo el año**: Si hay cupos disponibles\n\n*Inscribite temprano para asegurar lugar*",
    acciones: [{ texto: "Inscribirme", link: "/register.html" }]
  },
  {
    id: 177,
    categoria: "calendario",
    keywords: ["cuatrimestre", "semestre", "duracion curso"],
    pregunta: "¿Cu¿Nto dura un cuatrimestre?",
    respuesta: "duración de los per?odos:\n\n?? **1er Cuatrimestre**: Marzo a Julio (~4 meses)\n?? **2do Cuatrimestre**: Agosto a Diciembre (~4 meses)\n?? **Intensivo verano**: 6-8 semanas\n\n*Aproximadamente 16 semanas de clase por cuatrimestre*",
    acciones: []
  },
  {
    id: 178,
    categoria: "calendario",
    keywords: ["evento", "actividad especial", "jornada"],
    pregunta: "¿Hay eventos especiales durante el año?",
    respuesta: "Eventos y actividades:\n\n?? **Obras de teatro** en idiomas\n?? **Ciclos de cine** subtitulado\n?? **Ferias del libro** en otros idiomas\n?? **Fiestas tem¿Ticas** (Halloween, Thanksgiving, etc.)\n?? **Competencias** y concursos\n\n*Fechas en el calendario y redes*",
    acciones: []
  },
  {
    id: 179,
    categoria: "calendario",
    keywords: ["dias habiles", "cuantas clases", "semanas"],
    pregunta: "¿Cu¿Ntas clases hay por cuatrimestre?",
    respuesta: "Cantidad aproximada:\n\n?? **Cursada regular**: 32 clases (16 semanas x 2)\n?? **Intensivo**: más clases por semana\n?? Descontando feriados\n\n*Var?a levemente cada año*",
    acciones: []
  },
  {
    id: 180,
    categoria: "calendario",
    keywords: ["recuperatorio", "segunda fecha", "mesa recuperatorio"],
    pregunta: "¿Hay fechas de recuperatorio?",
    respuesta: "S?, hay instancias de recuperaci¿N:\n\n?? **Febrero**: Mesa de recuperatorios\n?? **Julio**: Para 1er cuatrimestre\n? Una oportunidad de recuperar\n?? Sin costo extra\n\n*Requisito: Haber rendido el examen original*",
    acciones: []
  },

  // ============================================
  // CATEGOR?A 12: CUENTA Y ACCESO (12 respuestas)
  // ============================================
  {
    id: 181,
    categoria: "cuenta",
    keywords: ["crear cuenta", "registrarme", "nuevo usuario"],
    pregunta: "¿CÓmo creo mi cuenta?",
    respuesta: "Tu cuenta se crea autom¿Ticamente al inscribirte:\n\n1?? Complet? la inscripción\n2?? Recibir¿S email con credenciales\n3?? Usuario: tu email\n4?? Contrase?a: temporal (cambiarla al ingresar)\n\n*Si no recibiste el email, revis? spam*",
    acciones: []
  },
  {
    id: 182,
    categoria: "cuenta",
    keywords: ["cambiar contrase?a", "nueva contrase?a", "modificar clave"],
    pregunta: "¿CÓmo cambio mi contrase?a?",
    respuesta: "Para cambiar tu contrase?a:\n\n1?? Ingres? a **Classroom**\n2?? And? a **Configuraci¿N > Seguridad**\n3?? Clic en **\"Cambiar contrase?a\"**\n4?? Ingres? la actual y la nueva\n5?? Guard? cambios\n\n*Us? una contrase?a segura*",
    acciones: []
  },
  {
    id: 183,
    categoria: "cuenta",
    keywords: ["cambiar email", "otro correo", "actualizar mail"],
    pregunta: "¿Puedo cambiar mi email?",
    respuesta: "Para cambiar tu email:\n\n?? Solicitalo en **secretar?a**\n?? O escrib? a soporte@cemi.edu.ar\n? Verificamos tu identidad\n?? Actualizamos en el sistema\n\n*El email es tu usuario de acceso*",
    acciones: []
  },
  {
    id: 184,
    categoria: "cuenta",
    keywords: ["datos personales", "actualizar datos", "cambiar direccion", "telefono"],
    pregunta: "¿CÓmo actualizo mis datos personales?",
    respuesta: "podés actualizar tus datos:\n\n?? En **Classroom > Mi perfil**\n?? En **secretar?a** (DNI, domicilio)\n?? Por email a info@cemi.edu.ar\n\n*Mantené tus datos actualizados*",
    acciones: []
  },
  {
    id: 185,
    categoria: "cuenta",
    keywords: ["eliminar cuenta", "borrar cuenta", "darme de baja definitiva"],
    pregunta: "¿Puedo eliminar mi cuenta?",
    respuesta: "Para solicitar eliminaci¿N de cuenta:\n\n?? Solicitalo por escrito\n?? Email a soporte@cemi.edu.ar\n? Se procesan los datos segÚn GDPR\n?? Conservamos registros académicos por ley\n\n*Proceso irreversible*",
    acciones: []
  },
  {
    id: 186,
    categoria: "cuenta",
    keywords: ["doble factor", "2fa", "seguridad cuenta", "verificacion"],
    pregunta: "¿Tienen autenticaci¿N de dos factores?",
    respuesta: "S?, ofrecemos **2FA** opcional:\n\n?? Activala en **Configuraci¿N > Seguridad**\n?? Us? app como Google Authenticator\n?? C¿Digos de respaldo disponibles\n\n*Recomendado para mayor seguridad*",
    acciones: []
  },
  {
    id: 187,
    categoria: "cuenta",
    keywords: ["sesion abierta", "cerrar sesion", "otro dispositivo"],
    pregunta: "¿CÓmo cierro sesi¿N en otros dispositivos?",
    respuesta: "Para cerrar sesiones:\n\n1?? Ingres? a **Classroom**\n2?? **Configuraci¿N > Seguridad**\n3?? **\"Cerrar todas las sesiones\"**\n4?? Confirm?\n\n*¿Til si perdiste un dispositivo*",
    acciones: []
  },
  {
    id: 188,
    categoria: "cuenta",
    keywords: ["hackeo", "cuenta hackeada", "acceso no autorizado", "robaron cuenta"],
    pregunta: "Creo que hackearon mi cuenta",
    respuesta: "Si sospech¿S acceso no autorizado:\n\n1?? **Cambi? la contrase?a** inmediatamente\n2?? **Cerr? todas las sesiones**\n3?? **Activ? 2FA**\n4?? **Contact? a soporte** urgente\n\n?? soporte@cemi.edu.ar\n?? WhatsApp: +54 9 381 446-3243",
    acciones: [{ texto: "Contactar soporte", link: "mailto:soporte@cemi.edu.ar" }]
  },
  {
    id: 189,
    categoria: "cuenta",
    keywords: ["privacidad", "datos", "gdpr", "mis datos"],
    pregunta: "¿CÓmo protegen mis datos personales?",
    respuesta: "Protecci¿N de datos:\n\n?? Encriptaci¿N de informaciÓn\n?? Cumplimiento de Ley de Datos Personales\n?? Est¿Ndares GDPR\n? No compartimos datos con terceros\n?? podés solicitar exportaci¿N/eliminaci¿N\n\n*Tu privacidad es prioridad*",
    acciones: [{ texto: "Ver pol¿Tica de privacidad", link: "/privacidad.html" }]
  },
  {
    id: 190,
    categoria: "cuenta",
    keywords: ["exportar datos", "descargar mis datos", "copia datos"],
    pregunta: "¿Puedo descargar mis datos?",
    respuesta: "S?, podés solicitar exportaci¿N:\n\n?? Desde **Configuraci¿N > Privacidad**\n?? O por email a soporte@cemi.edu.ar\n?? Recib¿S un archivo con tus datos\n?? Procesamos en 48-72hs\n\n*Derecho GDPR garantizado*",
    acciones: []
  },
  {
    id: 191,
    categoria: "cuenta",
    keywords: ["multiples dispositivos", "celular y computadora", "donde puedo entrar"],
    pregunta: "¿Puedo usar mi cuenta en varios dispositivos?",
    respuesta: "S?, acceso desde m?ltiples dispositivos:\n\n?? Computadora (navegador)\n?? Celular (app o navegador)\n?? Tablet\n\n? Sesiones simult¿Neas permitidas\n?? Datos sincronizados\n\n*Recomendamos cerrar sesi¿N en dispositivos p?blicos*",
    acciones: []
  },
  {
    id: 192,
    categoria: "cuenta",
    keywords: ["olvid? usuario", "cual es mi usuario", "no se mi usuario"],
    pregunta: "Olvid? mi nombre de usuario",
    respuesta: "Tu usuario es:\n\n?? **Tu email de registro**\n\nSi no record¿S qué email usaste:\n?? Contact? a secretar?a con tu DNI\n?? Escrib? a soporte@cemi.edu.ar\n\n*Te ayudamos a recuperar el acceso*",
    acciones: []
  },

  // ============================================
  // CATEGOR?A 13: SOPORTE T¿CNICO (12 respuestas)
  // ============================================
  {
    id: 193,
    categoria: "soporte",
    keywords: ["soporte", "ayuda tecnica", "problema tecnico", "no funciona"],
    pregunta: "¿CÓmo contacto al soporte t¿Cnico?",
    respuesta: "Canales de soporte:\n\n?? **Email**: soporte@cemi.edu.ar\n?? **WhatsApp**: +54 9 381 446-3243\n?? **Chat**: En la plataforma (horario h?bil)\n?? **Presencial**: Secretar?a\n\n? Respuesta en 24-48hs h?biles",
    acciones: [{ texto: "Enviar email", link: "mailto:soporte@cemi.edu.ar" }]
  },
  {
    id: 194,
    categoria: "soporte",
    keywords: ["horario soporte", "cuando responden", "atienden soporte"],
    pregunta: "¿cuál es el horario de soporte?",
    respuesta: "Horarios de atención t¿Cnica:\n\n?? **Lunes a Viernes**: 9:00 a 20:00\n?? **S?bados**: 10:00 a 13:00\n?? **Domingos y feriados**: Cerrado\n\n*Emails recibidos fuera de horario se responden al d?a siguiente*",
    acciones: []
  },
  {
    id: 195,
    categoria: "soporte",
    keywords: ["video no carga", "no reproduce", "error video"],
    pregunta: "Los videos no cargan, ¿qué hago?",
    respuesta: "Prob? estas soluciones:\n\n1?? **Refresc?** la p¡Gina\n2?? Verific? tu **conexi¿N a internet**\n3?? Prob? con **otro navegador**\n4?? **Desactiv? bloqueadores** de anuncios\n5?? **Actualiz?** el navegador\n\n*Si persiste, contact? a soporte*",
    acciones: []
  },
  {
    id: 196,
    categoria: "soporte",
    keywords: ["audio no funciona", "no escucho", "problema sonido"],
    pregunta: "No escucho el audio, ¿qué hago?",
    respuesta: "Verific? estos puntos:\n\n?? Volumen de tu dispositivo\n?? Que no est? en silencio\n?? Conexi¿N de auriculares\n?? Permisos de audio en el navegador\n?? Refresc? la p¡Gina\n\n*Prob? en otro dispositivo para descartar*",
    acciones: []
  },
  {
    id: 197,
    categoria: "soporte",
    keywords: ["camara no funciona", "no me ven", "video negro"],
    pregunta: "Mi c?mara no funciona en las clases",
    respuesta: "Soluciones para la c?mara:\n\n1?? Verific? **permisos** del navegador\n2?? Cerr? otras apps que usen la c?mara\n3?? Prob? en **otro navegador**\n4?? Revis? configuraci¿N de **privacidad**\n5?? Actualiz? **drivers** de la c?mara\n\n*En Zoom/Meet: Clic en el ¿Cono de c?mara*",
    acciones: []
  },
  {
    id: 198,
    categoria: "soporte",
    keywords: ["lento", "carga lento", "muy lento", "tarda mucho"],
    pregunta: "La plataforma est? muy lenta",
    respuesta: "Para mejorar la velocidad:\n\n?? Verific? tu **conexi¿N a internet**\n?? **Borr? cach?** del navegador\n?? Reinici? el **router**\n?? Cerr? otras **pesta?as/aplicaciones**\n?? Prob? desde **otro dispositivo**\n\n*Si es general, puede ser mantenimiento*",
    acciones: []
  },
  {
    id: 199,
    categoria: "soporte",
    keywords: ["error", "mensaje error", "pantalla error"],
    pregunta: "Me aparece un error en pantalla",
    respuesta: "Cuando aparece un error:\n\n?? **Captur? pantalla** del mensaje\n?? **Refresc?** la p¡Gina\n??? **Borr? cookies** y cach?\n?? Prob? **otro navegador**\n\nSi persiste:\n?? Envi? la captura a soporte@cemi.edu.ar",
    acciones: [{ texto: "Contactar soporte", link: "mailto:soporte@cemi.edu.ar" }]
  },
  {
    id: 200,
    categoria: "soporte",
    keywords: ["celular viejo", "requisitos", "que necesito para usar"],
    pregunta: "¿qué requisitos t¿Cnicos necesito?",
    respuesta: "Requisitos m¿Nimos:\n\n?? **PC/Mac**: Navegador actualizado, 4GB RAM\n?? **Celular**: Android 8+ o iOS 13+\n?? **Internet**: 5 Mbps m¿Nimo\n?? **Audio**: Parlantes o auriculares\n?? **C?mara**: Para clases virtuales (opcional)\n\n*Conexi¿N estable recomendada*",
    acciones: []
  },
  {
    id: 201,
    categoria: "soporte",
    keywords: ["zoom problema", "meet problema", "no puedo entrar clase"],
    pregunta: "No puedo entrar a la clase virtual",
    respuesta: "Soluciones r¿Pidas:\n\n1?? Verific? que sea la **hora correcta**\n2?? Us? el **link actualizado** de Classroom\n3?? Actualiz? **Zoom/Meet**\n4?? Prob? desde **navegador** en lugar de app\n5?? Verific? **permisos** de c?mara/micr?fono\n\n*Avis? al profe si no podés entrar*",
    acciones: []
  },
  {
    id: 202,
    categoria: "soporte",
    keywords: ["actualizar app", "version app", "app vieja"],
    pregunta: "¿CÓmo actualizo la app?",
    respuesta: "Para actualizar la app CEMI:\n\n?? **Android**: Play Store > Mis apps > Actualizar\n?? **iOS**: App Store > Actualizaciones\n?? Activ? **actualizaciones autom¿Ticas**\n\n*Siempre us? la ?ltima versi¿N*",
    acciones: []
  },
  {
    id: 203,
    categoria: "soporte",
    keywords: ["borrar cache", "limpiar cache", "cache navegador"],
    pregunta: "¿CÓmo borro el cach? del navegador?",
    respuesta: "Para borrar cach?:\n\n**Chrome**: Ctrl+Shift+Supr > \"Archivos en cach?\"\n**Firefox**: Ctrl+Shift+Supr > \"Cach?\"\n**Edge**: Ctrl+Shift+Supr > \"Archivos en cach?\"\n**Safari**: Preferencias > Privacidad > Gestionar datos\n\n*Seleccion? \"?ltima hora\" o \"Todo el tiempo\"*",
    acciones: []
  },
  {
    id: 204,
    categoria: "soporte",
    keywords: ["reporte bug", "reportar error", "encontre falla"],
    pregunta: "¿CÓmo reporto un error de la plataforma?",
    respuesta: "Para reportar bugs:\n\n?? Email a **soporte@cemi.edu.ar**\n?? Inclu?:\n   - Descripci¿N del error\n   - Pasos para reproducirlo\n   - Captura de pantalla\n   - Navegador y dispositivo\n\n*Tu reporte nos ayuda a mejorar*",
    acciones: [{ texto: "Reportar error", link: "mailto:soporte@cemi.edu.ar¿Subject=Reporte de Error" }]
  },

  // ============================================
  // CATEGOR?A 14: PREGUNTAS FRECUENTES GENERALES (15 respuestas)
  // ============================================
  {
    id: 205,
    categoria: "faq",
    keywords: ["que es cemi", "quienes son", "sobre ustedes"],
    pregunta: "¿qué es CEMI?",
    respuesta: "**CEMI** es el Centro de Estudios de Idiomas:\n\n?? Instituto de enseñanza de idiomas\n?? más de 10 años de experiencia\n?? Miles de alumnos egresados\n?? preparación para ex?menes internacionales\n?? Cursos para empresas\n\n*Tu mejor opci¿N para aprender idiomas*",
    acciones: []
  },
  {
    id: 206,
    categoria: "faq",
    keywords: ["por que cemi", "por que elegir", "diferencia otros"],
    pregunta: "¿Por qué elegir CEMI?",
    respuesta: "Nos diferenciamos por:\n\n? **Grupos reducidos** (m¡Éx. 12 alumnos)\n? **Profesores certificados**\n? **metodología comunicativa**\n? **Plataforma online** integrada\n? **Flexibilidad horaria**\n? **Certificaciones reconocidas**\n? **atención personalizada**",
    acciones: []
  },
  {
    id: 207,
    categoria: "faq",
    keywords: ["gratis", "sin costo", "free", "gratuito"],
    pregunta: "¿Hay cursos gratis?",
    respuesta: "Opciones sin costo:\n\n?? **Clase de prueba** gratuita\n?? **Contenido en redes** (tips, vocabulario)\n?? **Test de nivel** sin cargo\n\n?? Los cursos completos tienen costo\n?? Pero ofrecemos becas y descuentos\n\n*Consult? opciones de financiaci¿N*",
    acciones: []
  },
  {
    id: 208,
    categoria: "faq",
    keywords: ["beca", "becas", "ayuda economica", "descuento especial"],
    pregunta: "?Ofrecen becas?",
    respuesta: "S?, ofrecemos becas:\n\n?? **Beca por excelencia** académica\n??????????? **Descuento familiar** (hermanos)\n?? **Convenios empresariales**\n?? **Jubilados**: 20% descuento\n\n*Consult? requisitos en secretar?a*",
    acciones: []
  },
  {
    id: 209,
    categoria: "faq",
    keywords: ["trabajo cemi", "trabajar aca", "empleo", "buscan profesores"],
    pregunta: "¿Puedo trabajar en CEMI?",
    respuesta: "Convocatorias docentes:\n\n????? Publicamos en nuestra web y redes\n?? Envi? CV a rrhh@cemi.edu.ar\n?? Requisitos: tÍtulo + experiencia\n\n*Actualmente buscamos docentes de alem¿N*\n\n(Esto puede variar)",
    acciones: [{ texto: "Enviar CV", link: "mailto:rrhh@cemi.edu.ar" }]
  },
  {
    id: 210,
    categoria: "faq",
    keywords: ["opinion alumnos", "testimonios", "comentarios"],
    pregunta: "¿qué dicen los alumnos de CEMI?",
    respuesta: "Opiniones de nuestros alumnos:\n\n????? 4.8/5 promedio\n?? \"Excelentes profesores\"\n?? \"M¿Todo efectivo\"\n?? \"Buena atención\"\n?? \"Aprend? r¿Pido\"\n\n*Conoc? más testimonios en nuestra web y Google*",
    acciones: []
  },
  {
    id: 211,
    categoria: "faq",
    keywords: ["garantia", "devolucion", "no me gusto"],
    pregunta: "¿qué pasa si no me gusta el curso?",
    respuesta: "Nuestra pol¿Tica:\n\n?? **Clase de prueba** antes de inscribirte\n?? **Primera semana**: Devoluci¿N completa\n?? **Despu¿S**: Sin devoluci¿N proporcional\n?? podés **cambiar de grupo/horario**\n\n*Te ayudamos a encontrar la mejor opci¿N*",
    acciones: []
  },
  {
    id: 212,
    categoria: "faq",
    keywords: ["cuantos alumnos", "grupos grandes", "cantidad por grupo"],
    pregunta: "¿Cu¿Ntos alumnos hay por grupo?",
    respuesta: "Grupos reducidos:\n\n?? **M¡Éximo**: 12 alumnos\n?? **Promedio**: 8-10 alumnos\n?? **Individual**: 1 alumno\n?? **Clases virtuales**: Hasta 15\n\n*Grupos pequeños = más pr¿Ctica y atención*",
    acciones: []
  },
  {
    id: 213,
    categoria: "faq",
    keywords: ["material propio", "libro incluido", "tengo que comprar"],
    pregunta: "¿El material est? incluido?",
    respuesta: "Sobre los materiales:\n\n?? **Digital**: Incluido en Classroom\n?? **Libro f¿Sico**: Costo adicional (opcional)\n?? **Fotocopias**: Incluidas\n?? **Audios/Videos**: Incluidos\n\n*Consult? por cada curso específico*",
    acciones: []
  },
  {
    id: 214,
    categoria: "faq",
    keywords: ["viaje intercambio", "estudiar afuera", "exterior"],
    pregunta: "?Organizan viajes de intercambio?",
    respuesta: "Experiencias internacionales:\n\n?? **Viajes grupales** opcionales\n?? Convenios con instituciones del exterior\n?? Asesoramiento para estudiar afuera\n?? InformaciÓn sobre Work & Travel\n\n*Actividades extracurriculares optativas*",
    acciones: []
  },
  {
    id: 215,
    categoria: "faq",
    keywords: ["club conversacion", "practica oral", "hablar mas"],
    pregunta: "¿Tienen club de conversaci¿N?",
    respuesta: "¿S?! Actividades extra:\n\n??? **Club de conversaci¿N**: Semanal, gratuito\n? **Coffee talks**: Charlas informales\n?? **Movie club**: Pelis en idioma original\n?? **Book club**: Lectura grupal\n\n*Participaci¿N opcional para alumnos*",
    acciones: []
  },
  {
    id: 216,
    categoria: "faq",
    keywords: ["certificado digital", "online certificado", "pdf certificado"],
    pregunta: "¿El certificado es digital o f¿Sico?",
    respuesta: "Formatos de certificados:\n\n?? **Digital (PDF)**: Inmediato al aprobar\n?? **F¿Sico**: Entrega posterior en secretar?a\n? Ambos tienen igual validez\n?? Digital con firma electr¿Nica\n\n*Eleg¿S el que prefieras*",
    acciones: []
  },
  {
    id: 217,
    categoria: "faq",
    keywords: ["recomendacion", "que nivel empezar", "cual curso"],
    pregunta: "¿qué curso me recomiendan?",
    respuesta: "Para recomendarte:\n\n1?? Hac? el **test de nivel** gratuito\n2?? Contanos tus **objetivos** (trabajo, viaje, etc.)\n3?? Decinos tu **disponibilidad horaria**\n\n?? Llamanos o ven? a secretar?a\n*Te asesoramos personalmente*",
    acciones: [{ texto: "Solicitar test", link: "https://wa.me/543814463243¿Text=Hola!%20Quiero%20hacer%20el%20test%20de%20nivel" }]
  },
  {
    id: 218,
    categoria: "faq",
    keywords: ["constancia alumno regular", "certificado de alumno", "para trabajo"],
    pregunta: "¿CÓmo pido una constancia de alumno regular?",
    respuesta: "Para obtener constancia:\n\n?? **Presencial**: Secretar?a (24-48hs)\n?? **Email**: Solicit? a info@cemi.edu.ar\n?? **Classroom**: Secci¿N Documentos\n?? **Costo**: Gratuito (hasta 2 por cuatrimestre)\n\n*Indic? para qué la necesit¿S*",
    acciones: []
  },
  {
    id: 219,
    categoria: "faq",
    keywords: ["quejas", "reclamos", "no estoy conforme", "problema con"],
    pregunta: "¿CÓmo presento una queja o reclamo?",
    respuesta: "Canales para reclamos:\n\n?? **Libro de quejas** en secretar?a\n?? **Email**: direccion@cemi.edu.ar\n?? **Entrevista** con coordinaci¿N\n?? **Formulario** en la web\n\n*Respondemos en 48-72hs h?biles*\n*Tu opini¿N nos importa*",
    acciones: []
  },

  // ============================================
  // CATEGOR?A 15: BENEFICIOS Y EXTRAS (11 respuestas)
  // ============================================
  {
    id: 220,
    categoria: "beneficios",
    keywords: ["descuento", "promo", "promocion", "oferta"],
    pregunta: "¿Tienen descuentos o promociones?",
    respuesta: "Descuentos vigentes:\n\n?? **Pago anual**: 15% descuento\n?? **Hermanos**: 10% c/u\n?? **Ex-alumnos**: 10%\n?? **Jubilados**: 20%\n?? **Promo referidos**: $$ por cada referido\n\n*Consult? promos actuales en secretar?a*",
    acciones: []
  },
  {
    id: 221,
    categoria: "beneficios",
    keywords: ["referido", "traer amigo", "recomendar"],
    pregunta: "¿qué beneficio tengo si traigo un amigo?",
    respuesta: "Programa **Referidos CEMI**:\n\n?? Refer? un amigo\n? Cuando se inscribe\n?? Vos recib¿S: 1 clase gratis o descuento\n?? Tu amigo: 10% descuento inscripción\n\n*Sin l?mite de referidos*",
    acciones: []
  },
  {
    id: 222,
    categoria: "beneficios",
    keywords: ["convenio", "empresa convenio", "obra social"],
    pregunta: "¿Tienen convenios con empresas?",
    respuesta: "S?, convenios corporativos:\n\n?? Empresas asociadas\n?? Obras sociales\n?? Universidades\n?? Colegios profesionales\n\n*Consult? si tu empresa tiene convenio*\n*Descuentos especiales para empleados*",
    acciones: []
  },
  {
    id: 223,
    categoria: "beneficios",
    keywords: ["wifi", "internet instituto", "conexion"],
    pregunta: "¿Hay WiFi en el instituto?",
    respuesta: "Conectividad disponible:\n\n?? **WiFi gratuito** para alumnos\n?? Credenciales: Ped? en secretar?a\n?? Velocidad apta para clases\n? Cobertura en todo el edificio\n\n*Uso responsable*",
    acciones: []
  },
  {
    id: 224,
    categoria: "beneficios",
    keywords: ["biblioteca", "libros prestar", "material consulta"],
    pregunta: "¿Tienen biblioteca?",
    respuesta: "Recursos bibliogr?ficos:\n\n?? **Biblioteca f¿Sica**: En sede, consulta en sala\n?? **Pr¿Stamo**: Con carnet de alumno\n?? **Biblioteca digital**: En Classroom\n?? Diccionarios, gram¿Ticas, readers\n\n*Pr¿Stamo por 7 d?as, renovable*",
    acciones: []
  },
  {
    id: 225,
    categoria: "beneficios",
    keywords: ["cafeteria", "buffet", "comer", "snack"],
    pregunta: "¿Hay cafeter?a en el instituto?",
    respuesta: "Opciones para alimentarse:\n\n? **M¿Quina de caf?** disponible\n?? **Dispenser de agua**\n?? **Vending** de snacks\n?? No hay cafeter?a completa\n?? Locales cerca para comer\n\n*10 min de break entre clases largas*",
    acciones: []
  },
  {
    id: 226,
    categoria: "beneficios",
    keywords: ["actividad extra", "extracurricular", "ademas de clase"],
    pregunta: "¿Hay actividades extracurriculares?",
    respuesta: "Actividades extra para alumnos:\n\n??? Club de conversaci¿N\n?? Cine en idioma original\n?? Obras de teatro\n?? Club de lectura\n?? Fiestas tem¿Ticas\n?? Competencias y concursos\n\n*Participaci¿N opcional y mayormente gratuita*",
    acciones: []
  },
  {
    id: 227,
    categoria: "beneficios",
    keywords: ["carnet", "credencial", "identificacion alumno"],
    pregunta: "?Me dan carnet de alumno?",
    respuesta: "Credencial de alumno:\n\n?? **Carnet f¿Sico**: Se entrega al inscribirse\n?? **Credencial digital**: En la app\n? Sirve para: Biblioteca, descuentos, identificaci¿N\n?? Renovaci¿N anual\n\n*Cuidalo, tiene tus datos*",
    acciones: []
  },
  {
    id: 228,
    categoria: "beneficios",
    keywords: ["descuento cine", "beneficio alumno", "descuentos externos"],
    pregunta: "¿Tengo descuentos por ser alumno?",
    respuesta: "Beneficios externos:\n\n?? Descuentos en cines (verificar)\n?? Librer?as asociadas\n? Cafeter?as cercanas\n??? Gimnasios con convenio\n\n*Mostrando carnet de alumno vigente*\n*Beneficios pueden variar*",
    acciones: []
  },
  {
    id: 229,
    categoria: "beneficios",
    keywords: ["newsletter", "novedades", "email noticias"],
    pregunta: "¿CÓmo me entero de novedades?",
    respuesta: "Mantenete informado:\n\n?? **Newsletter**: Suscribite en la web\n?? **App**: Notificaciones push\n?? **Facebook**: /CEMIidiomas\n?? **Instagram**: @cemi_idiomas\n?? **Cartelera**: En la sede\n\n*No te pierdas ninguna novedad*",
    acciones: []
  },
  {
    id: 230,
    categoria: "beneficios",
    keywords: ["experiencia alumni", "egresados", "comunidad ex"],
    pregunta: "¿Hay comunidad de egresados?",
    respuesta: "Comunidad CEMI Alumni:\n\n?? Grupo de egresados\n?? Newsletter especial\n?? Descuentos para volver\n?? Acceso a recursos\n?? Networking profesional\n\n*Una vez CEMI, siempre CEMI*",
    acciones: []
  },

  // ============================================
  // CATEGOR?A 16: EX?MENES Y EVALUACIONES (25)
  // ============================================
  {
    id: 231,
    categoria: "examenes",
    keywords: ["examen", "prueba", "evaluacion", "test"],
    pregunta: "¿CÓmo son los ex?menes?",
    respuesta: "Sistema de evaluación:\n\n?? **Parciales**: Durante el cuatrimestre\n?? **Final**: Al cierre del nivel\n?? **Escritos y orales**\n?? Escala: 1-10 (aprobaci¿N: 6)\n\n*evaluación continua del proceso*",
    acciones: []
  },
  {
    id: 232,
    categoria: "examenes",
    keywords: ["cuando examen", "fecha examen", "parcial cuando"],
    pregunta: "¿Cu¿Ndo son los ex?menes?",
    respuesta: "Cronograma de evaluaciones:\n\n?? **Parcial 1**: Semana 7-8\n?? **Parcial 2**: Semana 14-15\n?? **Final**: ?ltima semana\n?? Aviso previo por email\n\n*Fechas específicas en Classroom*",
    acciones: []
  },
  {
    id: 233,
    categoria: "examenes",
    keywords: ["aprobar", "nota minima", "cuanto necesito"],
    pregunta: "¿qué nota necesito para aprobar?",
    respuesta: "Requisitos de aprobaci¿N:\n\n? **Nota m¿Nima**: 6/10\n? **Asistencia**: 75% m¿Nimo\n? **Trabajos**: Entregados\n?? Promedio de parciales + final\n\n*60% = aprobado*",
    acciones: []
  },
  {
    id: 234,
    categoria: "examenes",
    keywords: ["reprobar", "desaprobar", "no aprobe", "me fue mal"],
    pregunta: "¿qué pasa si no apruebo?",
    respuesta: "Si no aprob¿S:\n\n?? **Recuperatorio**: 1 instancia extra\n?? Fecha: 2 semanas despu¿S del final\n?? podés recursar el nivel\n?? Apoyo del docente\n\n*No te desanimes, es parte del proceso*",
    acciones: []
  },
  {
    id: 235,
    categoria: "examenes",
    keywords: ["recuperatorio", "segunda chance", "volver rendir"],
    pregunta: "¿CÓmo funciona el recuperatorio?",
    respuesta: "Sistema de recuperaci¿N:\n\n?? 1 recuperatorio por materia\n?? 2 semanas post-examen\n?? Sin costo adicional\n?? Mismo formato que el original\n? Nota m¡Éxima: 10\n\n*Aprovech? esta oportunidad*",
    acciones: []
  },
  {
    id: 236,
    categoria: "examenes",
    keywords: ["oral", "examen oral", "hablar examen"],
    pregunta: "¿Hay examen oral?",
    respuesta: "evaluación oral:\n\n??? **S?**, hay componente oral\n?? Porcentaje: 30-40% de la nota\n?? Individual o en parejas\n?? duración: 10-15 minutos\n?? Temas: Conversaci¿N, descripci¿N, opini¿N\n\n*Practicamos en clase*",
    acciones: []
  },
  {
    id: 237,
    categoria: "examenes",
    keywords: ["escrito", "examen escrito", "writing"],
    pregunta: "¿CÓmo es el examen escrito?",
    respuesta: "Formato del examen escrito:\n\n?? **Reading**: Comprensi¿N lectora\n?? **Writing**: Redacci¿N\n?? **Grammar**: Ejercicios gramaticales\n?? **Vocabulary**: Vocabulario\n?? duración: 90-120 minutos",
    acciones: []
  },
  {
    id: 238,
    categoria: "examenes",
    keywords: ["listening", "audio examen", "escuchar"],
    pregunta: "¿El examen tiene listening?",
    respuesta: "Secci¿N de Listening:\n\n?? **S?**, hay comprensi¿N auditiva\n?? Audios con acentos variados\n?? Respuestas m?ltiple choice\n?? Se escucha 2 veces\n?? 20-25% de la nota\n\n*Practicamos regularmente en clase*",
    acciones: []
  },
  {
    id: 239,
    categoria: "examenes",
    keywords: ["modelo examen", "ejemplo examen", "como es formato"],
    pregunta: "¿Hay modelo de examen para practicar?",
    respuesta: "Material de pr¿Ctica:\n\n?? **Modelos**: Disponibles en Classroom\n?? Ex?menes anteriores de pr¿Ctica\n? Respuestas incluidas\n????? Simulacros en clase\n\n*El profe te gu?a en la preparación*",
    acciones: []
  },
  {
    id: 240,
    categoria: "examenes",
    keywords: ["estudiar examen", "preparar examen", "como estudio"],
    pregunta: "¿CÓmo me preparo para el examen?",
    respuesta: "Tips para prepararte:\n\n?? Revis? el material de clase\n?? Hac? los ejercicios del libro\n?? Practic? listening diariamente\n?? Escrib? textos de pr¿Ctica\n??? Habl? en voz alta\n?? Us? los modelos de examen\n\n*Constancia > Intensidad*",
    acciones: []
  },
  {
    id: 241,
    categoria: "examenes",
    keywords: ["nervios examen", "ansiedad examen", "miedo examen"],
    pregunta: "Tengo nervios por el examen",
    respuesta: "Consejos para los nervios:\n\n?? **Respir? profundo** antes de empezar\n?? Estudi? con tiempo, no a ?ltimo momento\n?? Dorm? bien la noche anterior\n?? Desayun? bien\n?? Lleg? temprano\n?? ¿Confi? en tu preparación!\n\n*Es normal, pero podés manejarlo*",
    acciones: []
  },
  {
    id: 242,
    categoria: "examenes",
    keywords: ["faltar examen", "no puedo ir examen", "ausente examen"],
    pregunta: "¿qué pasa si falto al examen?",
    respuesta: "En caso de ausencia:\n\n?? Avis? con anticipaci¿N\n?? Present? justificativo m¿Dico\n?? Se reprograma para otra fecha\n?? Sin justificativo: Ausente = 1\n\n*Comunicalo antes si es posible*",
    acciones: []
  },
  {
    id: 243,
    categoria: "examenes",
    keywords: ["ver nota", "resultado examen", "como me fue"],
    pregunta: "¿dónde veo mi nota del examen?",
    respuesta: "Resultados disponibles en:\n\n?? **Classroom**: Secci¿N Calificaciones\n?? Notificaci¿N por email\n????? El profe comunica en clase\n?? Tiempo: 7-10 d?as h?biles\n\n*podés consultar al docente*",
    acciones: []
  },
  {
    id: 244,
    categoria: "examenes",
    keywords: ["revisar examen", "ver examen", "correccion"],
    pregunta: "¿Puedo ver mi examen corregido?",
    respuesta: "Revisi¿N de examen:\n\n? S?, podés pedirlo\n????? Coordin? con el profesor\n?? En horario de consulta\n?? Explicaci¿N de errores\n?? Feedback para mejorar\n\n*Es tu derecho ver la correcci¿N*",
    acciones: []
  },
  {
    id: 245,
    categoria: "examenes",
    keywords: ["reclamar nota", "no estoy de acuerdo", "apelar"],
    pregunta: "¿Puedo reclamar mi nota?",
    respuesta: "Proceso de revisi¿N:\n\n1?? Habl? primero con el profesor\n2?? Si no hay acuerdo, ped? revisi¿N formal\n3?? Coordinaci¿N eval?a el caso\n?? Plazo: 5 d?as h?biles post-nota\n\n*Siempre con respeto y fundamento*",
    acciones: []
  },
  {
    id: 246,
    categoria: "examenes",
    keywords: ["promocion", "promocionar", "sin final"],
    pregunta: "¿Se puede promocionar sin final?",
    respuesta: "Sistema de promoci¿N:\n\n? Promedio de parciales = 8\n? Asistencia = 80%\n? Trabajos completos\n?? = Promoci¿N directa\n\n*Esfuerzo durante el año tiene premio*",
    acciones: []
  },
  {
    id: 247,
    categoria: "examenes",
    keywords: ["libre", "rendir libre", "sin cursar"],
    pregunta: "¿Puedo rendir libre?",
    respuesta: "Modalidad libre:\n\n?? Consult? disponibilidad\n?? Programa completo del nivel\n?? Examen escrito + oral\n?? Arancel especial\n?? Mayor exigencia\n\n*Recomendamos cursar para mejor preparación*",
    acciones: []
  },
  {
    id: 248,
    categoria: "examenes",
    keywords: ["equivalencia", "materias aprobadas", "reconocimiento"],
    pregunta: "?Reconocen estudios previos?",
    respuesta: "Equivalencias:\n\n?? Present? certificado de estudios\n?? Test de ubicación\n? Reconocemos niveles aprobados\n?? De instituciones reconocidas\n\n*Evit? repetir lo que ya sab¿S*",
    acciones: []
  },
  {
    id: 249,
    categoria: "examenes",
    keywords: ["nota promedio", "como calcula", "promedio"],
    pregunta: "¿CÓmo se calcula el promedio?",
    respuesta: "C?lculo del promedio:\n\n?? Parcial 1: 25%\n?? Parcial 2: 25%\n?? Trabajos: 20%\n?? Final: 30%\n\n*Participaci¿N y asistencia pueden sumar*",
    acciones: []
  },
  {
    id: 250,
    categoria: "examenes",
    keywords: ["fecha limite", "hasta cuando", "ultimo dia"],
    pregunta: "¿Hasta cu¿Ndo puedo rendir?",
    respuesta: "Fechas l?mite:\n\n?? **Ordinario**: Fin del cuatrimestre\n?? **Recuperatorio**: 2 semanas despu¿S\n?? **Extraordinario**: Consultar\n\n*No dejes pasar las fechas*",
    acciones: []
  },
  {
    id: 251,
    categoria: "examenes",
    keywords: ["parcial domiciliario", "trabajo practico", "tp"],
    pregunta: "¿Hay trabajos pr¿Cticos?",
    respuesta: "Trabajos durante la cursada:\n\n?? TPs individuales y grupales\n?? Fechas de entrega en Classroom\n?? Cuentan para el promedio\n? Obligatorios para aprobar\n?? Entrega online\n\n*Respet? las fechas*",
    acciones: []
  },
  {
    id: 252,
    categoria: "examenes",
    keywords: ["presentacion oral", "exposicion", "presentar tema"],
    pregunta: "¿Hay presentaciones orales?",
    respuesta: "Presentaciones en clase:\n\n?? S?, hay exposiciones\n?? Individuales o grupales\n?? Temas asignados o a elecci¿N\n?? 5-10 minutos\n?? R?brica de evaluación\n\n*Excelente pr¿Ctica para el oral*",
    acciones: []
  },
  {
    id: 253,
    categoria: "examenes",
    keywords: ["portfolio", "carpeta", "evidencias"],
    pregunta: "¿Debo armar un portfolio?",
    respuesta: "Portfolio de aprendizaje:\n\n?? Opcional pero recomendado\n?? Recopil? tus mejores trabajos\n?? Muestra tu progreso\n?? ¿Til para autoevaluación\n?? Sirve para el CV\n\n*Evidencia de tu aprendizaje*",
    acciones: []
  },
  {
    id: 254,
    categoria: "examenes",
    keywords: ["autoevaluacion", "evaluar propio", "autocritica"],
    pregunta: "¿Hay autoevaluación?",
    respuesta: "Instancias de autoevaluación:\n\n?? Tests de pr¿Ctica en Classroom\n?? R?bricas de autochequeo\n?? Reflexi¿N post-examen\n?? Seguimiento de progreso\n\n*Conocer tus fortalezas y debilidades*",
    acciones: []
  },
  {
    id: 255,
    categoria: "examenes",
    keywords: ["fraude", "copiar", "trampa examen"],
    pregunta: "¿qué pasa si copian en el examen?",
    respuesta: "Pol¿Tica de integridad académica:\n\n?? Copia = Anulaci¿N del examen\n?? Primera vez: Advertencia + recuperatorio\n? Reincidencia: Sanciones mayores\n?? Acta de situaci¿N\n\n*Valoramos la honestidad*",
    acciones: []
  },

  // ============================================
  // CATEGOR?A 17: MATERIALES DE ESTUDIO (20)
  // ============================================
  {
    id: 256,
    categoria: "materiales",
    keywords: ["libro", "manual", "que libro usan"],
    pregunta: "¿qué libros usan?",
    respuesta: "Material bibliogr?fico:\n\n?? Libros de editoriales reconocidas\n?? Cambridge, Oxford, Pearson\n?? segÚn el idioma\n?? Lista específica por nivel\n\n*Te informamos al inscribirte*",
    acciones: []
  },
  {
    id: 257,
    categoria: "materiales",
    keywords: ["comprar libro", "donde consigo", "libreria"],
    pregunta: "¿dónde compro los libros?",
    respuesta: "Opciones para adquirir material:\n\n?? Librer?a del instituto (mejor precio)\n?? Librer?as de la zona\n?? Online: MercadoLibre, Amazon\n?? Usados: Grupos de alumnos\n\n*Consult? por material digitalizado*",
    acciones: []
  },
  {
    id: 258,
    categoria: "materiales",
    keywords: ["precio libro", "cuanto sale libro", "costo material"],
    pregunta: "¿Cu¿Nto cuestan los libros?",
    respuesta: "Costos aproximados:\n\n?? **Libro principal**: $15.000-25.000\n?? **Workbook**: $8.000-15.000\n?? **Material digital**: Incluido\n\n*Precios referenciales, pueden variar*\n*Hay opciones usadas más econ?micas*",
    acciones: []
  },
  {
    id: 259,
    categoria: "materiales",
    keywords: ["obligatorio libro", "necesario comprar", "sin libro"],
    pregunta: "¿Es obligatorio comprar el libro?",
    respuesta: "Sobre el material:\n\n?? **Recomendado** tenerlo\n?? Material digital complementario\n?? Fotocopias de apoyo incluidas\n?? Algunos niveles requieren libro\n\n*Consult? con tu profesor*",
    acciones: []
  },
  {
    id: 260,
    categoria: "materiales",
    keywords: ["material digital", "pdf", "ebook"],
    pregunta: "¿Hay material digital?",
    respuesta: "Recursos digitales disponibles:\n\n?? PDFs en Classroom\n?? Acceso desde app\n?? Audios descargables\n?? Videos complementarios\n?? Ejercicios interactivos\n\n*Incluido en tu matr¿Cula*",
    acciones: []
  },
  {
    id: 261,
    categoria: "materiales",
    keywords: ["fotocopia", "apunte", "resumen"],
    pregunta: "¿Dan fotocopias?",
    respuesta: "Material fotocopiado:\n\n?? S?, se proveen materiales\n?? Ejercicios extras\n?? Gu?as de estudio\n?? Incluido en la cuota\n?? Tambi¿N disponible digital\n\n*Organizate con carpeta o bibliorato*",
    acciones: []
  },
  {
    id: 262,
    categoria: "materiales",
    keywords: ["diccionario", "traductor", "wordreference"],
    pregunta: "¿Puedo usar diccionario en clase?",
    respuesta: "Uso de diccionario:\n\n?? **En clase**: S?, biling¿E o monoling¿E\n?? **En ex?menes**: Depende del nivel\n?? Apps recomendadas: WordReference, Linguee\n?? Evitar Google Translate para todo\n\n*Mejor aprender a deducir del contexto*",
    acciones: []
  },
  {
    id: 263,
    categoria: "materiales",
    keywords: ["app aprender", "aplicacion idioma", "duolingo"],
    pregunta: "?Recomiendan apps para practicar?",
    respuesta: "Apps complementarias:\n\n?? **Duolingo**: Vocabulario b¿Sico\n?? **Babbel**: Conversaci¿N\n?? **Anki**: Flashcards\n?? **Spotify**: Podcasts en idiomas\n?? **Netflix**: SubtÍtulos en idioma\n\n*Complemento, no reemplazo de clase*",
    acciones: []
  },
  {
    id: 264,
    categoria: "materiales",
    keywords: ["pelicula", "serie", "ver en idioma"],
    pregunta: "?Recomiendan pel¿Culas/series?",
    respuesta: "Contenido audiovisual:\n\n?? Empez? con subtÍtulos en español\n?? Pas? a subtÍtulos en el idioma\n?? Finalmente sin subtÍtulos\n?? Lista de recomendados en Classroom\n\n*Excelente para listening y vocabulario*",
    acciones: []
  },
  {
    id: 265,
    categoria: "materiales",
    keywords: ["podcast", "audio", "escuchar practica"],
    pregunta: "¿qué podcasts recomiendan?",
    respuesta: "Podcasts por nivel:\n\n?? **Principiante**: 6 Minute English (BBC)\n?? **Intermedio**: TED Talks, NPR\n?? **Avanzado**: Noticias, debates\n?? Disponibles en Spotify, Apple Podcasts\n\n*15 min diarios hacen diferencia*",
    acciones: []
  },
  {
    id: 266,
    categoria: "materiales",
    keywords: ["musica", "canciones", "letra"],
    pregunta: "¿Sirve escuchar másica?",
    respuesta: "másica para aprender:\n\n?? ¿Excelente recurso!\n?? Busc? la letra (lyrics)\n?? Cant? para pronunciaci¿N\n?? Analiz? vocabulario\n?? Descubr? artistas del idioma\n\n*Aprender cantando es más divertido*",
    acciones: []
  },
  {
    id: 267,
    categoria: "materiales",
    keywords: ["libro lectura", "reader", "graded reader"],
    pregunta: "¿Hay libros de lectura graduados?",
    respuesta: "Lecturas graduadas:\n\n?? **Graded Readers** por nivel\n?? Cl¿Sicos adaptados\n?? Historias originales\n?? Disponibles en biblioteca\n?? Versiones digitales\n\n*Leer mejora vocabulario y gram¿Tica*",
    acciones: []
  },
  {
    id: 268,
    categoria: "materiales",
    keywords: ["gramatica", "libro gramatica", "explicacion"],
    pregunta: "?Recomiendan libro de gram¿Tica?",
    respuesta: "Referencias gramaticales:\n\n?? **English Grammar in Use** (Murphy)\n?? **Essential Grammar in Use** (b¿Sico)\n?? **Advanced Grammar in Use**\n?? Versiones con ejercicios online\n\n*El cl¿Sico que todo estudiante deber?a tener*",
    acciones: []
  },
  {
    id: 269,
    categoria: "materiales",
    keywords: ["vocabulario", "lista palabras", "flashcard"],
    pregunta: "¿CÓmo aprendo vocabulario?",
    respuesta: "Estrategias para vocabulario:\n\n?? **Flashcards**: F¿Sicas o app Anki\n?? Cuaderno de vocabulario\n??? Post-its en casa\n?? App de palabras diarias\n?? Repetici¿N espaciada\n\n*Mejor en contexto que listas aisladas*",
    acciones: []
  },
  {
    id: 270,
    categoria: "materiales",
    keywords: ["cuaderno", "carpeta", "como organizo"],
    pregunta: "¿CÓmo organizo mis apuntes?",
    respuesta: "Organizaci¿N recomendada:\n\n?? Cuaderno o carpeta por materia\n??? Separadores por unidad\n?? Fecha en cada clase\n??? Colores para destacar\n?? Secci¿N de vocabulario\n\n*Orden = mejor estudio*",
    acciones: []
  },

  // ============================================
  // CATEGOR?A 18: SALUDOS Y CORTES?A (20)
  // ============================================
  {
    id: 271,
    categoria: "saludos",
    keywords: ["hola", "buenos dias", "buenas tardes", "buenas noches"],
    pregunta: "Hola",
    respuesta: "¿Hola! ?? Bienvenido/a al asistente virtual de CEMI. ¿En qué puedo ayudarte hoy?\n\npodés preguntarme sobre:\n?? Cursos e idiomas\n?? Inscripciones\n?? Pagos y cuotas\n?? ubicación y horarios\n\n*Escrib? tu consulta*",
    acciones: []
  },
  {
    id: 272,
    categoria: "saludos",
    keywords: ["como estas", "que tal", "como andas", "como va"],
    pregunta: "¿CÓmo est¿S?",
    respuesta: "?Muy bien, gracias por preguntar! ??\n\nEstoy aquí las 24hs para ayudarte con cualquier consulta sobre CEMI.\n\n¿qué necesit¿S saber?",
    acciones: []
  },
  {
    id: 273,
    categoria: "saludos",
    keywords: ["gracias", "muchas gracias", "te agradezco", "gracia"],
    pregunta: "Gracias",
    respuesta: "¿De nada! ?? Es un placer ayudarte.\n\nSi tenés más consultas, no dudes en escribirme.\n\n?¡Éxitos en tu aprendizaje! ??",
    acciones: []
  },
  {
    id: 274,
    categoria: "saludos",
    keywords: ["chau", "adios", "hasta luego", "nos vemos", "bye"],
    pregunta: "Chau",
    respuesta: "¿Hasta pronto! ??\n\nGracias por consultar con CEMI. Cuando necesites ayuda, ac? estar?.\n\n¿Que tengas un excelente d?a! ??",
    acciones: []
  },
  {
    id: 275,
    categoria: "saludos",
    keywords: ["quien sos", "que sos", "sos humano", "sos robot"],
    pregunta: "¿Qui¿N sos?",
    respuesta: "¿Soy el **Asistente Virtual de CEMI**! ??\n\n?? Respondo consultas frecuentes\n?? InformaciÓn sobre cursos\n?? Disponible 24/7\n?? Base de conocimiento actualizada\n\n*No soy humano, pero hago lo posible por ayudarte*",
    acciones: []
  },
  {
    id: 276,
    categoria: "saludos",
    keywords: ["ayuda", "ayudame", "necesito ayuda", "help"],
    pregunta: "Necesito ayuda",
    respuesta: "¿Claro, estoy para ayudarte! ??\n\n¿qué necesit¿S saber?\n\n?? **Cursos**: Idiomas, niveles, modalidades\n?? **inscripción**: Requisitos, proceso\n?? **Pagos**: Cuotas, descuentos\n?? **Contacto**: ubicación, tel?fono\n\n*Escrib? tu consulta específica*",
    acciones: []
  },
  {
    id: 277,
    categoria: "saludos",
    keywords: ["menu", "opciones", "que puedo preguntar", "temas"],
    pregunta: "¿qué puedo preguntarte?",
    respuesta: "Puedo ayudarte con:\n\n?? **Instituto**: Sobre CEMI, metodología\n?? **Cursos**: Idiomas, niveles, duracion\n?? **inscripción**: Requisitos, proceso\n?? **Pagos**: Cuotas, descuentos, medios\n?? **ubicación**: Direcci¿N, cómo llegar\n?? **Horarios**: Turnos, d?as\n????? **Docentes**: Profesores, metodología\n?? **Certificados**: Validez, ex?menes\n?? **Plataforma**: Classroom, app\n?? **Soporte**: Problemas t¿Cnicos",
    acciones: []
  },
  {
    id: 278,
    categoria: "saludos",
    keywords: ["no entiendo", "no entendi", "explicame mejor"],
    pregunta: "No entiendo",
    respuesta: "¿Sin problema! Voy a ayudarte mejor. ??\n\n¿Podr?as decirme específicamente qué querés saber?\n\nPor ejemplo:\n? \"¿CÓmo me inscribo?\"\n? \"¿Cu¿Nto cuesta?\"\n? \"¿dónde est¿N ubicados?\"\n\n*Mientras más específico, mejor te ayudo*",
    acciones: []
  },
  {
    id: 279,
    categoria: "saludos",
    keywords: ["perdon", "disculpa", "perdoname", "lo siento"],
    pregunta: "Perd¿N",
    respuesta: "¿No hay problema! ??\n\n¿Hay algo en lo que pueda ayudarte?\n\nEstoy ac? para resolver tus dudas, no te preocupes.",
    acciones: []
  },
  {
    id: 280,
    categoria: "saludos",
    keywords: ["genial", "excelente", "perfecto", "buenisimo", "copado"],
    pregunta: "¡Genial!",
    respuesta: "?Me alegra poder ayudarte! ??\n\nSi tenés más preguntas, segu? consultando.\n\n?¡Éxitos! ??",
    acciones: []
  },

  // ============================================
  // CATEGOR?A 19: metodología (25)
  // ============================================
  {
    id: 281,
    categoria: "metodologia",
    keywords: ["enfoque comunicativo", "metodo comunicativo", "comunicarse"],
    pregunta: "¿qué es el enfoque comunicativo?",
    respuesta: "El **enfoque comunicativo**:\n\n??? Prioriza la comunicación real\n?? Gram¿Tica en contexto\n?? Situaciones de la vida cotidiana\n?? Interacci¿N constante\n?? Aprender haciendo\n\n*Habl¿S desde el primer d?a*",
    acciones: []
  },
  {
    id: 282,
    categoria: "metodologia",
    keywords: ["hablar primera clase", "cuando hablo", "practica oral"],
    pregunta: "¿Cu¿Ndo empiezo a hablar?",
    respuesta: "¿Desde el primer d?a! ???\n\n?? Frases ¿Tiles desde la clase 1\n?? Pr¿Ctica en parejas\n?? Actividades interactivas\n?? Correcci¿N constructiva\n\n*Perder el miedo es el primer paso*",
    acciones: []
  },
  {
    id: 283,
    categoria: "metodologia",
    keywords: ["gramatica cuando", "reglas gramaticales", "estructura"],
    pregunta: "¿Cu¿Ndo aprendo gram¿Tica?",
    respuesta: "Gram¿Tica en contexto:\n\n?? Integrada en cada clase\n?? Despu¿S de usar la estructura\n?? No memorizaci¿N aislada\n?? Deducci¿N antes que explicaci¿N\n?? Pr¿Ctica escrita complementaria\n\n*Primero us¿S, despu¿S entend¿S la regla*",
    acciones: []
  },
  {
    id: 284,
    categoria: "metodologia",
    keywords: ["4 habilidades", "skills", "competencias"],
    pregunta: "¿qué habilidades desarrollo?",
    respuesta: "Las 4 habilidades lingüísticas:\n\n??? **Speaking**: Expresi¿N oral\n?? **Listening**: Comprensi¿N auditiva\n?? **Reading**: Comprensi¿N lectora\n?? **Writing**: Expresi¿N escrita\n\n*Desarrollo equilibrado de todas*",
    acciones: []
  },
  {
    id: 285,
    categoria: "metodologia",
    keywords: ["inmersion", "solo idioma", "sin español"],
    pregunta: "?Las clases son solo en el idioma?",
    respuesta: "Uso del idioma en clase:\n\n?? **Principiantes**: Mix con español\n?? **Intermedio**: Mayormente en idioma\n?? **Avanzado**: 100% en idioma\n?? Instrucciones claras siempre\n\n*Inmersi¿N gradual*",
    acciones: []
  },
  {
    id: 286,
    categoria: "metodologia",
    keywords: ["errores", "equivocarse", "correccion"],
    pregunta: "?Me corrigen cuando me equivoco?",
    respuesta: "Correcci¿N constructiva:\n\n? S?, pero en el momento adecuado\n?? Sin interrumpir la comunicación\n?? Errores sistem¿Ticos: se trabajan\n?? Foco en mejorar, no en juzgar\n?? El error es parte del aprendizaje\n\n*Mejor equivocarse que quedarse callado*",
    acciones: []
  },
  {
    id: 287,
    categoria: "metodologia",
    keywords: ["actividades", "dinamica clase", "que hacemos"],
    pregunta: "¿qué actividades hacemos en clase?",
    respuesta: "Actividades variadas:\n\n?? Conversaciones y debates\n?? Role-plays y simulaciones\n?? Juegos did¿Cticos\n?? Listening con audios/videos\n?? Lectura de textos\n?? Escritura guiada\n?? Trabajo en grupos\n\n*Cada clase es diferente*",
    acciones: []
  },
  {
    id: 288,
    categoria: "metodologia",
    keywords: ["tecnologia clase", "multimedia", "pantalla"],
    pregunta: "?Usan tecnología en clase?",
    respuesta: "Recursos tecnol¡Gicos:\n\n?? Proyector y pantalla\n?? Apps educativas\n?? Audios de calidad\n?? Videos y pel¿Culas\n?? Plataformas interactivas\n?? Classroom digital\n\n*tecnología al servicio del aprendizaje*",
    acciones: []
  },
  {
    id: 289,
    categoria: "metodologia",
    keywords: ["tarea", "deberes", "homework mucho"],
    pregunta: "¿Hay mucha tarea?",
    respuesta: "Sobre las tareas:\n\n?? S?, hay tarea semanal\n?? 30-60 min estimados\n?? Refuerza lo visto en clase\n?? Mayormente online\n? Importante para avanzar\n\n*Sin pr¿Ctica no hay progreso*",
    acciones: []
  },
  {
    id: 290,
    categoria: "metodologia",
    keywords: ["participar", "hablar clase", "timido"],
    pregunta: "Soy t?mido, ?me obligan a hablar?",
    respuesta: "Para los t?midos:\n\n?? Ambiente de confianza\n?? Actividades en parejas primero\n?? podés preparar antes de hablar\n?? Participaci¿N gradual\n?? El profe te apoya\n\n*Nadie te juzga, todos est¿N aprendiendo*",
    acciones: []
  },
  {
    id: 291,
    categoria: "metodologia",
    keywords: ["ritmo clase", "muy rapido", "muy lento"],
    pregunta: "¿El ritmo de clase se adapta?",
    respuesta: "Ritmo de aprendizaje:\n\n?? Se sigue al grupo mayoritario\n?? podés pedir que repitan\n?? Material extra si vas adelantado\n?? Apoyo si te cuesta\n????? El profe ajusta segÚn necesidad\n\n*Comunic? si el ritmo no te funciona*",
    acciones: []
  },
  {
    id: 292,
    categoria: "metodologia",
    keywords: ["dudas clase", "preguntar", "no entendi tema"],
    pregunta: "¿Puedo hacer preguntas en clase?",
    respuesta: "?Absolutamente! ??\n\n? Las preguntas son bienvenidas\n?? En cualquier momento\n?? Sin verg¿Enza\n?? Ayudan a todos\n????? El profe explica las veces que haga falta\n\n*Preguntar es aprender*",
    acciones: []
  },
  {
    id: 293,
    categoria: "metodologia",
    keywords: ["cultura", "cultural", "paises idioma"],
    pregunta: "?Aprendo sobre la cultura tambi¿N?",
    respuesta: "Contenido cultural:\n\n?? Cultura de pa¿Ses del idioma\n?? Festividades y tradiciones\n??? Gastronom?a t¿Pica\n?? másica y arte\n?? Series y pel¿Culas\n?? Expresiones coloquiales\n\n*El idioma y la cultura van juntos*",
    acciones: []
  },
  {
    id: 294,
    categoria: "metodologia",
    keywords: ["pronunciacion", "acento", "como sueno"],
    pregunta: "¿Trabajamos la pronunciaci¿N?",
    respuesta: "Trabajo de pronunciaci¿N:\n\n??? Desde el primer d?a\n?? Escuchar y repetir\n?? Grabaciones propias\n?? Sonidos dif¿Ciles específicos\n?? Exposici¿N a acentos variados\n\n*El objetivo es ser entendido*",
    acciones: []
  },
  {
    id: 295,
    categoria: "metodologia",
    keywords: ["repetir", "memorizar", "de memoria"],
    pregunta: "¿Hay que memorizar mucho?",
    respuesta: "Sobre la memorizaci¿N:\n\n?? Vocabulario: S?, es necesario\n?? Gram¿Tica: más comprensi¿N que memoria\n?? Repetici¿N espaciada\n?? En contexto, no listas\n?? Mnemotecnia ayuda\n\n*Mejor usar que memorizar*",
    acciones: []
  },
  {
    id: 296,
    categoria: "metodologia",
    keywords: ["traduccion", "traducir", "pensar español"],
    pregunta: "¿Puedo traducir mentalmente?",
    respuesta: "Sobre la traducci¿N:\n\n?? Al principio: Normal y esperado\n?? Con pr¿Ctica: Disminuye\n?? Objetivo: Pensar en el idioma\n?? Es un proceso gradual\n?? No te frustres\n\n*Con el tiempo, fluye naturalmente*",
    acciones: []
  },
  {
    id: 297,
    categoria: "metodologia",
    keywords: ["practica fuera", "fuera clase", "practicar solo"],
    pregunta: "¿CÓmo practico fuera de clase?",
    respuesta: "Pr¿Ctica aut¿Noma:\n\n?? másica y podcasts\n?? Series con subtÍtulos\n?? Apps como Duolingo\n?? Lecturas graduadas\n?? Buscar intercambio\n?? Escribir un diario\n??? Hablar solo en voz alta\n\n*15 min diarios hacen diferencia*",
    acciones: []
  },
  {
    id: 298,
    categoria: "metodologia",
    keywords: ["objetivo clase", "logro", "que aprendo"],
    pregunta: "¿Cada clase tiene un objetivo?",
    respuesta: "Planificaci¿N de clases:\n\n?? Objetivo claro por clase\n?? Secuencia l¡Gica\n?? Repaso de lo anterior\n?? Nuevo contenido\n?? Pr¿Ctica\n?? Cierre y resumen\n\n*Sab¿S qué aprendiste cada d?a*",
    acciones: []
  },
  {
    id: 299,
    categoria: "metodologia",
    keywords: ["retroalimentacion", "feedback", "como voy"],
    pregunta: "?Recibo feedback de mi progreso?",
    respuesta: "Retroalimentaci¿N constante:\n\n????? Del profesor en clase\n?? Notas en Classroom\n?? Correcciones detalladas\n?? Comentarios constructivos\n?? Seguimiento de progreso\n\n*Sab¿S en qué mejorar*",
    acciones: []
  },
  {
    id: 300,
    categoria: "metodologia",
    keywords: ["motivacion", "no avanzo", "me frustro"],
    pregunta: "Me frustro porque no avanzo",
    respuesta: "Sobre la frustraci¿N:\n\n?? Es normal, a todos nos pasa\n?? El progreso no es lineal\n?? Celebr? pequeños logros\n?? La constancia gana\n????? Habl? con tu profe\n?? Paciencia contigo mismo\n\n*Aprender un idioma lleva tiempo*",
    acciones: []
  },

  // ============================================
  // CATEGOR?A 20: niñoS Y ADOLESCENTES (20)
  // ============================================
  {
    id: 301,
    categoria: "ninos",
    keywords: ["niños", "chicos", "nenes", "infantil"],
    pregunta: "¿Tienen cursos para niños?",
    respuesta: "Cursos para niños:\n\n?? **Kids** (4-6 años)\n?? **Children** (7-10 años)\n?? **Pre-teens** (11-12 años)\n?? metodología l¿Dica\n?? Juegos y canciones\n?? Material colorido\n\n*Aprender jugando*",
    acciones: []
  },
  {
    id: 302,
    categoria: "ninos",
    keywords: ["adolescentes", "teens", "secundario"],
    pregunta: "¿Hay cursos para adolescentes?",
    respuesta: "Cursos para teens:\n\n?? **Teens** (13-17 años)\n?? Contenido actual y relevante\n?? másica, series, redes\n?? Apoyo escolar integrado\n?? Grupos por edad\n\n*Idiomas con onda para j?venes*",
    acciones: []
  },
  {
    id: 303,
    categoria: "ninos",
    keywords: ["edad minima", "cuantos años", "desde que edad"],
    pregunta: "¿Desde qué edad aceptan?",
    respuesta: "Edades de ingreso:\n\n?? **M¿Nimo**: 4 años\n?? Con madurez para grupo\n?? Entrevista previa\n???????? Reuni¿N con padres\n\n*Evaluamos caso por caso*",
    acciones: []
  },
  {
    id: 304,
    categoria: "ninos",
    keywords: ["metodo niños", "como ense?an niños", "juegan"],
    pregunta: "¿CÓmo ense?an a los niños?",
    respuesta: "metodología infantil:\n\n?? **Aprendizaje l¿Dico**\n?? Canciones y rimas\n?? Manualidades\n?? Teatro y role-play\n?? Videos y animaciones\n?? Movimiento y juegos\n\n*Aprenden sin darse cuenta*",
    acciones: []
  },
  {
    id: 305,
    categoria: "ninos",
    keywords: ["duracion clase niños", "cuanto dura clase chicos"],
    pregunta: "¿Cu¿Nto duran las clases de niños?",
    respuesta: "duración segÚn edad:\n\n?? **4-6 años**: 45 minutos\n?? **7-10 años**: 60 minutos\n?? **11-12 años**: 75 minutos\n?? **Teens**: 90 minutos\n\n*Adaptado a la atención de cada edad*",
    acciones: []
  },
  {
    id: 306,
    categoria: "ninos",
    keywords: ["padres clase", "acompañar", "quedarme"],
    pregunta: "?Los padres pueden quedarse?",
    respuesta: "Pol¿Tica con padres:\n\n?? **Primera clase**: S?, para adaptaci¿N\n?? **Despu¿S**: Mejor que esperen afuera\n?? **Clases abiertas**: Ocasionales\n?? **comunicación**: Por app/email\n\n*La independencia favorece el aprendizaje*",
    acciones: []
  },
  {
    id: 307,
    categoria: "ninos",
    keywords: ["profesor niños", "docente niños", "especializado"],
    pregunta: "?Los profes est¿N capacitados para niños?",
    respuesta: "Docentes especializados:\n\n????? formaciÓn en enseñanza infantil\n?? Experiencia con niños\n?? Vocaci¿N y paciencia\n?? Manejo de dinámicas l¿Dicas\n??? Cuidado y atención\n\n*Profesionales preparados*",
    acciones: []
  },
  {
    id: 308,
    categoria: "ninos",
    keywords: ["grupo niños", "cuantos niños", "compa¿Eritos"],
    pregunta: "¿Cu¿Ntos niños hay por grupo?",
    respuesta: "Tamaño de grupos infantiles:\n\n?? **4-6 años**: M¡Éximo 8\n?? **7-10 años**: M¡Éximo 10\n?? **11-17 años**: M¡Éximo 12\n\n*Grupos reducidos para mejor atención*",
    acciones: []
  },
  {
    id: 309,
    categoria: "ninos",
    keywords: ["tarea niños", "deberes chicos", "estudiar casa"],
    pregunta: "?Los niños llevan tarea?",
    respuesta: "Tareas para niños:\n\n?? **4-6**: No, solo refuerzo en casa\n?? **7-10**: Poca, 15-20 min\n?? **11-12**: Moderada, 30 min\n?? **Teens**: Similar a adultos\n\n*Acorde a la edad*",
    acciones: []
  },
  {
    id: 310,
    categoria: "ninos",
    keywords: ["informe padres", "avance hijo", "como va mi hijo"],
    pregunta: "?Informan a los padres del avance?",
    respuesta: "comunicación con familias:\n\n?? Informe mensual por email\n?? Libreta de notas cuatrimestral\n???????? Reuniones de padres\n?? App de comunicación\n?? Consultas cuando necesiten\n\n*Familia y escuela trabajamos juntos*",
    acciones: []
  },
  {
    id: 311,
    categoria: "ninos",
    keywords: ["adaptacion", "primer dia", "llorar"],
    pregunta: "Mi hijo llora, ¿qué hago?",
    respuesta: "Per?odo de adaptaci¿N:\n\n?? Es normal al principio\n?? Profes con experiencia\n?? Despedida corta y positiva\n?? Generalmente dura poco\n?? Confi? en el proceso\n\n*En 2-3 clases se adaptan*",
    acciones: []
  },
  {
    id: 312,
    categoria: "ninos",
    keywords: ["material niños", "libros chicos", "cuaderno"],
    pregunta: "¿qué material necesitan los niños?",
    respuesta: "Material para niños:\n\n?? Libro del curso (se indica)\n?? Cuaderno de actividades\n??? L¿Pices de colores\n?? Tijera y pegamento (chicos)\n?? Carpeta\n\n*Lista completa al inscribirse*",
    acciones: []
  },
  {
    id: 313,
    categoria: "ninos",
    keywords: ["cumpleaños", "festejo", "celebrar clase"],
    pregunta: "¿Pueden festejar cumpleaños en clase?",
    respuesta: "Cumpleaños en el aula:\n\n?? S?, coordinando con el profe\n?? Torta simple permitida\n?? 15-20 min de festejo\n?? Avisar con anticipaci¿N\n?? Sin decoraci¿N elaborada\n\n*?Festejamos en ingl¿S!*",
    acciones: []
  },
  {
    id: 314,
    categoria: "ninos",
    keywords: ["apoyo escolar", "ingles colegio", "ayuda escuela"],
    pregunta: "¿Sirve como apoyo para el colegio?",
    respuesta: "Apoyo escolar:\n\n? Complementa ingl¿S del colegio\n?? más pr¿Ctica oral\n?? Refuerzo de contenidos\n?? preparación para ex?menes\n?? Ventaja en el aula\n\n*Van adelantados en el cole*",
    acciones: []
  },
  {
    id: 315,
    categoria: "ninos",
    keywords: ["vacaciones niños", "verano chicos", "curso verano"],
    pregunta: "¿Hay cursos de verano para niños?",
    respuesta: "Cursos de verano:\n\n?? **Summer Camp** en enero\n?? Intensivo l¿Dico\n?? 2-3 horas diarias\n?? Actividades especiales\n??? Tem¿Tica veraniega\n\n*?Vacaciones aprendiendo!*",
    acciones: []
  },
  {
    id: 316,
    categoria: "ninos",
    keywords: ["examen niños", "evaluacion chicos", "prueba"],
    pregunta: "?Los niños tienen ex?menes?",
    respuesta: "evaluación infantil:\n\n?? evaluación continua\n?? A trav¿S de actividades\n?? Sin presi¿N de notas\n?? Sistema de estrellas/stickers\n?? Informe cualitativo\n\n*Evaluamos sin estresar*",
    acciones: []
  },
  {
    id: 317,
    categoria: "ninos",
    keywords: ["certificado niños", "diploma chicos"],
    pregunta: "?Los niños reciben certificado?",
    respuesta: "Reconocimientos infantiles:\n\n?? Diploma al finalizar nivel\n?? Medallas de logros\n?? Certificado de participaci¿N\n?? Acto de fin de año\n\n*Motivaci¿N para seguir aprendiendo*",
    acciones: []
  },
  {
    id: 318,
    categoria: "ninos",
    keywords: ["hermanos", "descuento hermanos", "dos hijos"],
    pregunta: "¿Hay descuento por hermanos?",
    respuesta: "Beneficio familiar:\n\n??????????? **10% cada hermano**\n?? Aplica desde el 2do hijo\n? Mismo año lectivo\n?? Se descuenta de la cuota\n\n*Familia que aprende junta*",
    acciones: []
  },
  {
    id: 319,
    categoria: "ninos",
    keywords: ["snack", "merienda", "comen clase"],
    pregunta: "?Los niños pueden merendar?",
    respuesta: "Merienda en clase:\n\n?? Pueden traer agua\n?? Snack saludable permitido\n?? Break de 5 min en clases largas\n?? Sin golosinas ni comida chatarra\n?? Mantener limpio el aula\n\n*Alimentaci¿N saludable*",
    acciones: []
  },
  {
    id: 320,
    categoria: "ninos",
    keywords: ["necesidades especiales", "tea", "tdah", "inclusion"],
    pregunta: "?Aceptan niños con necesidades especiales?",
    respuesta: "Inclusi¿N educativa:\n\n? Evaluamos cada caso\n?? Entrevista con familia\n?? Adaptaciones posibles\n????? Docentes sensibilizados\n?? Trabajo en equipo\n\n*Cada niño es ¿Nico*",
    acciones: []
  },

  // ============================================
  // CATEGOR?A 21: EMPRESAS (20)
  // ============================================
  {
    id: 321,
    categoria: "empresas",
    keywords: ["empresa", "corporativo", "in company", "oficina"],
    pregunta: "¿Tienen cursos para empresas?",
    respuesta: "Cursos corporativos:\n\n?? **In-Company**: En tu empresa\n?? Programas a medida\n?? Grupos o individuales\n? Horarios flexibles\n?? Seguimiento de resultados\n\n*Capacitamos a tu equipo*",
    acciones: [{ texto: "Solicitar info empresas", link: "mailto:info@cemi.edu.ar¿Subject=Consulta cursos corporativos" }]
  },
  {
    id: 322,
    categoria: "empresas",
    keywords: ["in company", "en empresa", "vienen a la empresa"],
    pregunta: "¿Pueden dar clases en mi empresa?",
    respuesta: "Modalidad In-Company:\n\n?? Clases en tu oficina\n????? Profesor asignado\n?? Programa personalizado\n? Horario que convenga\n?? Objetivos empresariales\n\n*Llevamos el idioma a vos*",
    acciones: []
  },
  {
    id: 323,
    categoria: "empresas",
    keywords: ["programa a medida", "personalizado empresa", "necesidades"],
    pregunta: "¿Dise?an programas a medida?",
    respuesta: "Programas personalizados:\n\n?? Diagn¿Stico inicial\n?? Objetivos específicos\n?? Contenido del rubro\n?? Vocabulario t¿Cnico\n?? M¿Tricas de avance\n\n*Cada empresa es diferente*",
    acciones: []
  },
  {
    id: 324,
    categoria: "empresas",
    keywords: ["ingles negocios", "business english", "comercial"],
    pregunta: "¿Ense?an ingl¿S de negocios?",
    respuesta: "Business English:\n\n?? Reuniones y negociaciones\n?? Emails profesionales\n?? Llamadas y conferencias\n?? Presentaciones\n?? Viajes de negocios\n?? Networking\n\n*Ingl¿S para el mundo corporativo*",
    acciones: []
  },
  {
    id: 325,
    categoria: "empresas",
    keywords: ["cotizacion", "presupuesto empresa", "cuanto cuesta"],
    pregunta: "¿Cu¿Nto cuesta para empresas?",
    respuesta: "Cotizaci¿N corporativa:\n\n?? segÚn cantidad de empleados\n? Horas mensuales\n?? Modalidad (presencial/online)\n?? Material incluido o no\n\n*Ped? presupuesto sin compromiso*",
    acciones: [{ texto: "Pedir presupuesto", link: "mailto:info@cemi.edu.ar¿Subject=Solicitud presupuesto corporativo" }]
  },
  {
    id: 326,
    categoria: "empresas",
    keywords: ["factura empresa", "facturacion", "razon social"],
    pregunta: "?Facturan a empresas?",
    respuesta: "Facturaci¿N corporativa:\n\n? Factura A o B\n?? A nombre de la empresa\n?? Orden de compra si requieren\n?? Pago por transferencia\n?? Factura electr¿Nica\n\n*Tr?mite administrativo simple*",
    acciones: []
  },
  {
    id: 327,
    categoria: "empresas",
    keywords: ["grupo empresa", "cantidad empleados", "minimo"],
    pregunta: "¿Cu¿Ntos empleados m¿Nimo?",
    respuesta: "Cantidad para armar grupo:\n\n?? **M¿Nimo**: 3-4 personas\n?? **Individual**: Tambi¿N disponible\n?? **Ideal**: 6-10 personas\n?? Niveles similares\n\n*Armamos grupos por nivel*",
    acciones: []
  },
  {
    id: 328,
    categoria: "empresas",
    keywords: ["horario empresa", "almuerzo", "antes trabajo"],
    pregunta: "¿qué horarios manejan para empresas?",
    respuesta: "Horarios corporativos flexibles:\n\n?? **Early morning**: 7:00-9:00\n??? **Almuerzo**: 12:00-14:00\n?? **After office**: 18:00-20:00\n?? Frecuencia a convenir\n\n*Nos adaptamos a ustedes*",
    acciones: []
  },
  {
    id: 329,
    categoria: "empresas",
    keywords: ["evaluacion empleados", "test nivel", "diagnostico"],
    pregunta: "¿Eval?an el nivel de los empleados?",
    respuesta: "Diagn¿Stico inicial:\n\n?? Test de nivel online\n??? Entrevista oral opcional\n?? Reporte por empleado\n?? Agrupamiento por nivel\n?? Recomendaciones\n\n*Sin costo como parte del servicio*",
    acciones: []
  },
  {
    id: 330,
    categoria: "empresas",
    keywords: ["seguimiento empresa", "reporte", "informe progreso"],
    pregunta: "?Informan el progreso a la empresa?",
    respuesta: "Reportes corporativos:\n\n?? Informe mensual de asistencia\n?? Avance por empleado\n?? Cumplimiento de objetivos\n?? Reporte cuatrimestral detallado\n?? Reuniones de feedback\n\n*Transparencia total*",
    acciones: []
  },
  {
    id: 331,
    categoria: "empresas",
    keywords: ["cancelacion clase empresa", "ausencia", "falta grupo"],
    pregunta: "¿qué pasa si cancelamos una clase?",
    respuesta: "Pol¿Tica de cancelaci¿N:\n\n? Aviso 24hs antes: Se reprograma\n?? Menos de 24hs: Se cobra\n?? Clases de recuperaci¿N posibles\n?? Flexibilidad razonable\n\n*comunicación clara*",
    acciones: []
  },
  {
    id: 332,
    categoria: "empresas",
    keywords: ["contrato empresa", "duracion convenio", "anual"],
    pregunta: "¿CÓmo es el contrato?",
    respuesta: "Convenios corporativos:\n\n?? Contrato anual o cuatrimestral\n?? Renovaci¿N autom¿Tica opcional\n?? Per?odo de prueba: 1 mes\n?? Condiciones claras\n?? ?rea de RRHH gestiona\n\n*T?rminos negociables*",
    acciones: []
  },
  {
    id: 333,
    categoria: "empresas",
    keywords: ["online empresa", "virtual corporativo", "remoto"],
    pregunta: "¿Hay opci¿N online para empresas?",
    respuesta: "Clases virtuales corporativas:\n\n?? 100% online disponible\n?? Ideal para equipos remotos\n?? Plataformas profesionales\n?? Material digital\n?? Misma calidad que presencial\n\n*Sin l?mites geogr?ficos*",
    acciones: []
  },
  {
    id: 334,
    categoria: "empresas",
    keywords: ["certificado empresa", "diploma empleado", "constancia"],
    pregunta: "¿Entregan certificados a empleados?",
    respuesta: "certificación corporativa:\n\n?? Certificado por nivel completado\n?? Constancia de participaci¿N\n?? Especifica horas y contenidos\n?? Logo de la empresa opcional\n\n*Valor agregado para el empleado*",
    acciones: []
  },
  {
    id: 335,
    categoria: "empresas",
    keywords: ["idioma tecnico", "vocabulario sector", "especializado"],
    pregunta: "¿Ense?an vocabulario de mi sector?",
    respuesta: "Vocabulario especializado:\n\n?? M¿Dico/Salud\n?? IT/tecnología\n?? Legal\n?? Finanzas/Banca\n?? Comercio/Retail\n?? Industria\n?? Turismo/Hoteler?a\n\n*Personalizamos segÚn tu rubro*",
    acciones: []
  },
  {
    id: 336,
    categoria: "empresas",
    keywords: ["rotacion", "cambio empleados", "nuevo integrante"],
    pregunta: "¿qué pasa si hay rotaci¿N de personal?",
    respuesta: "Gesti¿N de rotaci¿N:\n\n?? Nuevos empleados se integran\n?? evaluación de nivel\n?? Se ubican en grupo adecuado\n?? Material de nivelaci¿N\n?? Sin costo extra de incorporaci¿N\n\n*Flexibilidad ante cambios*",
    acciones: []
  },
  {
    id: 337,
    categoria: "empresas",
    keywords: ["material empresa", "libro corporativo", "recursos"],
    pregunta: "¿qué material usan en empresas?",
    respuesta: "Material corporativo:\n\n?? Libros de Business English\n?? Material propio CEMI\n?? Casos del rubro\n?? Art¿Culos actuales\n?? Videos profesionales\n\n*Contenido relevante para el trabajo*",
    acciones: []
  },
  {
    id: 338,
    categoria: "empresas",
    keywords: ["beneficio empleado", "perk", "bienestar"],
    pregunta: "¿Sirve como beneficio para empleados?",
    respuesta: "Idiomas como beneficio:\n\n?? Excelente perk laboral\n?? Desarrollo profesional\n?? Oportunidades internacionales\n?? Mejora clima laboral\n?? Retenci¿N de talento\n\n*Inversi¿N en tu equipo*",
    acciones: []
  },
  {
    id: 339,
    categoria: "empresas",
    keywords: ["pyme", "pequeña empresa", "startup"],
    pregunta: "¿Tienen opciones para PyMEs?",
    respuesta: "Programas para PyMEs:\n\n?? Precios accesibles\n?? Grupos pequeños\n?? Flexibilidad horaria\n?? Objetivos concretos\n?? Escalar segÚn necesidad\n\n*Soluciones a medida de tu presupuesto*",
    acciones: []
  },
  {
    id: 340,
    categoria: "empresas",
    keywords: ["referencia", "clientes", "quienes trabajaron"],
    pregunta: "¿Tienen referencias de empresas?",
    respuesta: "Nuestros clientes:\n\n?? Empresas de diversos rubros\n?? Referencias disponibles\n? Testimonios verificables\n?? Relaciones de largo plazo\n\n*Ped? referencias al solicitar presupuesto*",
    acciones: []
  },
  
  // ========== VIDA ESTUDIANTIL (341-365) ==========
  {
    id: 341,
    categoria: "vida_estudiantil",
    keywords: ["grupo", "estudio", "compa¿Eros", "estudiar juntos"],
    pregunta: "¿Hay grupos de estudio?",
    respuesta: "S?, fomentamos grupos de estudio:\n\n?? Grupos WhatsApp por nivel\n?? Sesiones de pr¿Ctica grupal\n??? Conversation clubs\n?? Intercambio entre alumnos\n\n*Se forman naturalmente en clase*",
    acciones: []
  },
  {
    id: 342,
    categoria: "vida_estudiantil",
    keywords: ["actividad", "extracurricular", "extra", "adicional"],
    pregunta: "¿Hay actividades extracurriculares?",
    respuesta: "Ofrecemos actividades extra:\n\n?? Movie nights con pel¿Culas\n? Coffee talks conversacionales\n?? Karaoke en ingl¿S\n?? Game sessions did¿Cticos\n?? Book club mensual\n\n*Consulta el calendario de eventos*",
    acciones: []
  },
  {
    id: 343,
    categoria: "vida_estudiantil",
    keywords: ["amigo", "conocer", "gente", "socializar"],
    pregunta: "¿Puedo conocer gente nueva?",
    respuesta: "CEMI es una comunidad:\n\n?? Ambiente amigable y acogedor\n?? Estudiantes de todas las edades\n?? Actividades de integraci¿N\n?? Grupos de pr¿Ctica\n\n*Muchos alumnos han hecho amistades duraderas aquí*",
    acciones: []
  },
  {
    id: 344,
    categoria: "vida_estudiantil",
    keywords: ["intercambio", "cultural", "internacional"],
    pregunta: "¿Tienen intercambios culturales?",
    respuesta: "Experiencias interculturales:\n\n?? Conexi¿N con hablantes nativos\n?? Celebraci¿N de festividades internacionales\n?? Exposici¿N a diferentes acentos\n??? Eventos gastron?micos tem¿Ticos\n\n*Aprender idiomas es abrir puertas al mundo*",
    acciones: []
  },
  {
    id: 345,
    categoria: "vida_estudiantil",
    keywords: ["evento", "especial", "celebracion"],
    pregunta: "¿Celebran eventos especiales?",
    respuesta: "Nuestros eventos:\n\n?? Halloween party\n?? Christmas celebration\n?? Carnival activities\n?? Ceremonia de graduaci¿N\n?? Aniversario institucional\n\n*Te avisamos por email y redes*",
    acciones: []
  },
  {
    id: 346,
    categoria: "vida_estudiantil",
    keywords: ["concurso", "competencia", "torneo"],
    pregunta: "¿Hay concursos o competencias?",
    respuesta: "Organizamos competencias:\n\n?? Spelling bee (deletreo)\n?? Speech contest (oratoria)\n?? Writing competition\n?? Quiz nights\n?? Reading challenges\n\n*Son opcionales pero muy divertidas*",
    acciones: []
  },
  {
    id: 347,
    categoria: "vida_estudiantil",
    keywords: ["voluntario", "ayudar", "colaborar"],
    pregunta: "¿Puedo colaborar como voluntario?",
    respuesta: "Oportunidades de voluntariado:\n\n????? Tutor de compa¿Eros\n?? Embajador estudiantil\n?? Organizaci¿N de eventos\n?? Contenido para redes\n\n*Habl? con coordinaci¿N si te interesa*",
    acciones: []
  },
  {
    id: 348,
    categoria: "vida_estudiantil",
    keywords: ["redes", "sociales", "instagram", "facebook"],
    pregunta: "¿Tienen redes sociales?",
    respuesta: "Seguinos en redes:\n\n?? Instagram: @cemi_idiomas\n?? Facebook: CEMI Centro de Idiomas\n?? YouTube: CEMI Oficial\n?? LinkedIn: CEMI\n\n*Contenido educativo y novedades*",
    acciones: []
  },
  {
    id: 349,
    categoria: "vida_estudiantil",
    keywords: ["newsletter", "boletin", "novedades", "email"],
    pregunta: "¿Tienen newsletter?",
    respuesta: "Bolet¿N informativo:\n\n?? Newsletter mensual\n?? Novedades y eventos\n?? Tips de aprendizaje\n?? Promociones exclusivas\n\n*Te suscrib¿S autom¿Ticamente al inscribirte*",
    acciones: []
  },
  {
    id: 350,
    categoria: "vida_estudiantil",
    keywords: ["alumni", "egresados", "ex alumnos"],
    pregunta: "¿Hay comunidad de egresados?",
    respuesta: "Red de egresados CEMI:\n\n????? Grupo Alumni exclusivo\n?? Networking profesional\n?? Ofertas laborales\n?? Eventos de reencuentro\n?? Bolsa de trabajo\n\n*Una vez CEMI, siempre CEMI*",
    acciones: []
  },
  {
    id: 351,
    categoria: "vida_estudiantil",
    keywords: ["cafeteria", "cafe", "snack", "comer"],
    pregunta: "¿Hay cafeter?a en el instituto?",
    respuesta: "Servicios disponibles:\n\n? M¿Quina de caf?\n?? Dispenser de agua\n?? Snacks en recepci¿N\n?? Locales gastron?micos cercanos\n\n*podés traer tu comida y usar el espacio com¿N*",
    acciones: []
  },
  {
    id: 352,
    categoria: "vida_estudiantil",
    keywords: ["wifi", "internet", "conexion"],
    pregunta: "¿Tienen WiFi para alumnos?",
    respuesta: "Conectividad:\n\n?? WiFi gratuito de alta velocidad\n?? Red segura para estudiantes\n?? Acceso en todas las aulas\n?? Ideal para clases online\n\n*Ped? la clave en recepci¿N*",
    acciones: []
  },
  {
    id: 353,
    categoria: "vida_estudiantil",
    keywords: ["biblioteca", "libros", "prestar"],
    pregunta: "¿Tienen biblioteca?",
    respuesta: "Recursos bibliogr?ficos:\n\n?? Biblioteca con material did¿Ctico\n?? Libros de lectura por nivel\n?? Material audiovisual\n?? Pr¿Stamos a domicilio\n\n*Presentando tu carnet de alumno*",
    acciones: []
  },
  {
    id: 354,
    categoria: "vida_estudiantil",
    keywords: ["estacionar", "auto", "parking"],
    pregunta: "¿Hay estacionamiento?",
    respuesta: "Opciones de estacionamiento:\n\n?? No tenemos parking propio\n??? Estacionamientos p?blicos cercanos\n?? F¿Cil acceso en transporte p?blico\n?? Estacionamiento para bicicletas\n\n*Consulta ubicación de parkings cercanos*",
    acciones: []
  },
  {
    id: 355,
    categoria: "vida_estudiantil",
    keywords: ["mascota", "perro", "gato", "animal"],
    pregunta: "¿Puedo ir con mascotas?",
    respuesta: "Pol¿Tica de mascotas:\n\n?? No se permiten mascotas en aulas\n?? Excepci¿N: perros de asistencia\n?? Las clases online son pet-friendly ??\n\n*Tu mascota te espera en casa*",
    acciones: []
  },
  {
    id: 356,
    categoria: "vida_estudiantil",
    keywords: ["fumar", "cigarro", "tabaco"],
    pregunta: "¿Se puede fumar en el instituto?",
    respuesta: "Espacio libre de humo:\n\n?? Prohibido fumar en todo el edificio\n? ?rea exterior designada\n?? Ambiente saludable\n\n*Respetamos la salud de todos*",
    acciones: []
  },
  {
    id: 357,
    categoria: "vida_estudiantil",
    keywords: ["vestimenta", "ropa", "dress code"],
    pregunta: "¿Hay c¿Digo de vestimenta?",
    respuesta: "Vestimenta:\n\n?? No hay dress code formal\n?? Ropa cómoda y casual\n?? Ven? como te sientas bien\n?? Expres? tu estilo\n\n*Lo importante es que est¿S cómodo para aprender*",
    acciones: []
  },
  {
    id: 358,
    categoria: "vida_estudiantil",
    keywords: ["cumpleaños", "cumple", "festejar"],
    pregunta: "¿Se festejan cumpleaños?",
    respuesta: "Celebraciones:\n\n?? Festejamos cumpleaños en clase\n?? Momentos de integraci¿N\n?? Sorpresas ocasionales\n?? Fotos grupales\n\n*?Avisanos cu¿Ndo es tu cumple!*",
    acciones: []
  },
  {
    id: 359,
    categoria: "vida_estudiantil",
    keywords: ["foto", "fotos", "fotografia", "filmar"],
    pregunta: "¿Puedo tomar fotos en clase?",
    respuesta: "Pol¿Tica de fotograf?a:\n\n?? Fotos del pizarr¿N: ?\n?? Grabar clase: solo con permiso\n?? Selfies grupales: ¿Claro!\n?? Uso en redes: consultar\n\n*Respetamos la privacidad de todos*",
    acciones: []
  },
  {
    id: 360,
    categoria: "vida_estudiantil",
    keywords: ["celular", "telefono", "movil", "smartphone"],
    pregunta: "¿Puedo usar el celular en clase?",
    respuesta: "Uso de celular:\n\n?? Modo silencio durante clase\n?? Uso educativo permitido\n?? Llamadas afuera del aula\n?? Apps de idiomas: ?bienvenidas!\n\n*El celular puede ser una herramienta de aprendizaje*",
    acciones: []
  },
  {
    id: 361,
    categoria: "vida_estudiantil",
    keywords: ["notebook", "laptop", "computadora", "tablet"],
    pregunta: "¿Puedo llevar mi notebook?",
    respuesta: "Dispositivos permitidos:\n\n?? Notebooks: ?\n?? Tablets: ?\n?? Enchufes disponibles\n?? WiFi incluido\n\n*Ideal para tomar notas y practicar*",
    acciones: []
  },
  {
    id: 362,
    categoria: "vida_estudiantil",
    keywords: ["comida", "comer", "clase", "snack"],
    pregunta: "¿Puedo comer en clase?",
    respuesta: "Alimentos en clase:\n\n? Bebidas: ? (con tapa)\n?? Snacks discretos: ?\n?? Comidas completas: ?\n?? Mantener limpio el espacio\n\n*Una galletita para el break est? bien*",
    acciones: []
  },
  {
    id: 363,
    categoria: "vida_estudiantil",
    keywords: ["baño", "toilette", "sanitario"],
    pregunta: "¿dónde est¿N los baños?",
    respuesta: "Instalaciones:\n\n?? Baños en cada piso\n? Baño accesible disponible\n?? Siempre equipados\n?? Limpios y mantenidos\n\n*podés ir cuando necesites*",
    acciones: []
  },
  {
    id: 364,
    categoria: "vida_estudiantil",
    keywords: ["locker", "guardar", "casillero"],
    pregunta: "¿Tienen lockers?",
    respuesta: "Almacenamiento:\n\n?? No tenemos lockers individuales\n?? podés dejar cosas en recepci¿N\n?? Llevar pertenencias a clase\n\n*No nos hacemos responsables por objetos olvidados*",
    acciones: []
  },
  {
    id: 365,
    categoria: "vida_estudiantil",
    keywords: ["perdido", "encontrado", "perdi", "olvide"],
    pregunta: "¿dónde est¿N objetos perdidos?",
    respuesta: "Objetos perdidos:\n\n?? Consult? en recepci¿N\n? Guardamos 30 d?as\n?? Avisanos por email\n?? Te contactamos si encontramos algo\n\n*Siempre revis? tus pertenencias*",
    acciones: []
  },
  
  // ========== TR?MITES ADMINISTRATIVOS (366-390) ==========
  {
    id: 366,
    categoria: "tramites",
    keywords: ["constancia", "alumno", "regular"],
    pregunta: "¿CÓmo pido constancia de alumno regular?",
    respuesta: "Constancia de alumno regular:\n\n?? Pedila en administraci¿N\n? Lista en 24-48 horas\n?? Incluye: nombre, curso, horario\n?? Sin costo adicional\n\n*Present? tu DNI para retirarla*",
    acciones: []
  },
  {
    id: 367,
    categoria: "tramites",
    keywords: ["constancia", "notas", "calificaciones"],
    pregunta: "¿CÓmo obtengo constancia de notas?",
    respuesta: "Constancia de calificaciones:\n\n?? Solicit? en administraci¿N\n?? Incluye todas tus notas\n? 48-72 horas de elaboraci¿N\n? Firmada y sellada\n\n*Ideal para tr?mites externos*",
    acciones: []
  },
  {
    id: 368,
    categoria: "tramites",
    keywords: ["certificado", "estudio", "estudios"],
    pregunta: "¿Emiten certificado de estudios?",
    respuesta: "Certificado de estudios:\n\n?? Detalle completo de cursada\n?? Niveles completados\n? Horas de estudio\n? Validez institucional\n\n*Costo: consultar en administraci¿N*",
    acciones: []
  },
  {
    id: 369,
    categoria: "tramites",
    keywords: ["reembolso", "devolucion", "devolver dinero"],
    pregunta: "¿Hacen devoluci¿N de dinero?",
    respuesta: "Pol¿Tica de reembolsos:\n\n?? Evaluamos caso por caso\n? Antes de iniciar: reembolso parcial\n? Iniciado el curso: no hay devoluci¿N\n?? Cr¿Dito a favor disponible\n\n*Consult? condiciones específicas*",
    acciones: []
  },
  {
    id: 370,
    categoria: "tramites",
    keywords: ["factura", "comprobante", "fiscal"],
    pregunta: "¿Emiten factura?",
    respuesta: "Facturaci¿N:\n\n?? Factura B para particulares\n?? Factura A para empresas/monotributistas\n?? Env?o digital por email\n?? podés pedirla en administraci¿N\n\n*Indic? tus datos fiscales al pagar*",
    acciones: []
  },
  {
    id: 371,
    categoria: "tramites",
    keywords: ["cambio", "datos", "actualizar", "direccion"],
    pregunta: "¿CÓmo actualizo mis datos?",
    respuesta: "Actualizaci¿N de datos:\n\n?? Email: avis? a administraci¿N\n?? Tel?fono: inform? el cambio\n?? Direcci¿N: actualizala para entregas\n?? DNI: present? documentaci¿N\n\n*Mantené tus datos actualizados*",
    acciones: []
  },
  {
    id: 372,
    categoria: "tramites",
    keywords: ["carnet", "credencial", "tarjeta alumno"],
    pregunta: "¿Dan carnet de estudiante?",
    respuesta: "Credencial estudiantil:\n\n?? Carnet CEMI incluido\n?? Tra? foto carnet o la sacamos\n?? Formato pr¿Ctico\n?? Beneficios con comercios asociados\n\n*Lo recib¿S al confirmar inscripción*",
    acciones: []
  },
  {
    id: 373,
    categoria: "tramites",
    keywords: ["baja", "cancelar", "dar de baja"],
    pregunta: "¿CÓmo doy de baja mi inscripción?",
    respuesta: "Proceso de baja:\n\n?? Avis? por email a administraci¿N\n? Con 10 d?as de anticipaci¿N\n?? Complet? formulario de baja\n?? Si hay saldo: cr¿Dito a favor\n\n*Siempre podés volver cuando quieras*",
    acciones: []
  },
  {
    id: 374,
    categoria: "tramites",
    keywords: ["licencia", "pausar", "congelar"],
    pregunta: "¿Puedo pausar mis estudios?",
    respuesta: "Licencia temporal:\n\n?? podés pausar hasta 3 meses\n?? Avis? con anticipaci¿N\n?? No se cobran cuotas\n?? Retomás en el mismo nivel\n\n*Ideal para viajes o situaciones especiales*",
    acciones: []
  },
  {
    id: 375,
    categoria: "tramites",
    keywords: ["reincorporacion", "volver", "retomar"],
    pregunta: "¿CÓmo me reincorporo despu¿S de una pausa?",
    respuesta: "Reincorporaci¿N:\n\n?? Contact? a administraci¿N\n?? Evaluamos tu nivel actual\n?? Te ubicamos en grupo compatible\n?? Retomás pagos normalmente\n\n*Si pas? mucho tiempo, hacemos nivelaci¿N*",
    acciones: []
  },
  {
    id: 376,
    categoria: "tramites",
    keywords: ["duplicado", "certificado", "perdido"],
    pregunta: "¿CÓmo pido duplicado de certificado?",
    respuesta: "Duplicado de certificado:\n\n?? Solicit? en administraci¿N\n?? Complet? formulario\n?? Costo: consultar\n? 5-7 d?as h?biles\n\n*Guard? siempre copias digitales*",
    acciones: []
  },
  {
    id: 377,
    categoria: "tramites",
    keywords: ["carta", "recomendacion", "referencia laboral"],
    pregunta: "¿Dan cartas de recomendaci¿N?",
    respuesta: "Cartas de recomendaci¿N:\n\n? Para alumnos destacados\n?? Solicit? a tu profesor\n?? Indic? el prop¿Sito\n? 3-5 d?as de elaboraci¿N\n\n*Incluye evaluación de desempe?o*",
    acciones: []
  },
  {
    id: 378,
    categoria: "tramites",
    keywords: ["apostilla", "legalizar", "exterior"],
    pregunta: "?Los certificados sirven para apostillar?",
    respuesta: "Certificados para exterior:\n\n?? Emitimos certificados oficiales\n? Aptos para apostilla\n?? Verific? requisitos del pa¿S destino\n?? Apostilla: tr?mite aparte\n\n*Te orientamos en el proceso*",
    acciones: []
  },
  {
    id: 379,
    categoria: "tramites",
    keywords: ["traduccion", "certificado", "traducir"],
    pregunta: "¿Traducen certificados?",
    respuesta: "Traducci¿N de documentos:\n\n?? No ofrecemos servicio de traducci¿N\n?? Podemos recomendar traductores\n? Nuestros certificados son Bilingües\n?? Formato claro y profesional\n\n*Consult? sobre formato específico*",
    acciones: []
  },
  {
    id: 380,
    categoria: "tramites",
    keywords: ["convenio", "universidad", "validez"],
    pregunta: "¿Tienen convenios con universidades?",
    respuesta: "Convenios institucionales:\n\n?? Acuerdos con universidades locales\n?? Reconocimiento de niveles\n?? Descuentos cruzados\n?? Red de instituciones amigas\n\n*Consult? convenios vigentes*",
    acciones: []
  },
  {
    id: 381,
    categoria: "tramites",
    keywords: ["seguro", "accidente", "cobertura"],
    pregunta: "¿Tienen seguro de accidentes?",
    respuesta: "Cobertura de seguro:\n\n?? Seguro de accidentes en sede\n?? Cobertura durante clases\n?? Asistencia de emergencia\n?? Parte de tu inscripción\n\n*Detalle en reglamento institucional*",
    acciones: []
  },
  {
    id: 382,
    categoria: "tramites",
    keywords: ["queja", "reclamo", "disconforme"],
    pregunta: "¿CÓmo hago un reclamo?",
    respuesta: "Canal de reclamos:\n\n?? Email a direcci¿N\n?? Libro de quejas disponible\n?? atención personalizada\n? Respuesta en 48-72 horas\n\n*Tu opini¿N nos ayuda a mejorar*",
    acciones: []
  },
  {
    id: 383,
    categoria: "tramites",
    keywords: ["sugerencia", "idea", "propuesta"],
    pregunta: "¿CÓmo hago sugerencias?",
    respuesta: "Buz¿N de sugerencias:\n\n?? Email a coordinaci¿N\n?? Formulario en recepci¿N\n?? Habl? con tu profesor\n?? Encuestas peri¿Dicas\n\n*Valoramos tu feedback*",
    acciones: []
  },
  {
    id: 384,
    categoria: "tramites",
    keywords: ["deuda", "debo", "atrasado", "moroso"],
    pregunta: "¿qué pasa si tengo deuda?",
    respuesta: "Gesti¿N de deudas:\n\n?? Consult? tu estado en administraci¿N\n?? Planes de regularizaci¿N\n?? Flexibilidad segÚn caso\n?? Deuda limita acceso a certificados\n\n*Mejor resolver cuanto antes*",
    acciones: []
  },
  {
    id: 385,
    categoria: "tramites",
    keywords: ["convenio", "pago", "obra social"],
    pregunta: "?Aceptan convenios de obra social?",
    respuesta: "Convenios:\n\n?? Algunas obras sociales tienen convenio\n?? Consult? si la tuya est? incluida\n?? Reintegros segÚn plan\n?? Te damos factura para presentar\n\n*Lista actualizada en administraci¿N*",
    acciones: []
  },
  {
    id: 386,
    categoria: "tramites",
    keywords: ["plan", "cuotas", "financiar"],
    pregunta: "?Financian cursos largos?",
    respuesta: "Financiaci¿N:\n\n?? Pago en cuotas mensuales\n?? D?bito autom¿Tico disponible\n??? Descuento por pago anual\n?? Plan personalizado\n\n*Armamos plan segÚn tu necesidad*",
    acciones: []
  },
  {
    id: 387,
    categoria: "tramites",
    keywords: ["presupuesto", "cotizacion", "precio empresas"],
    pregunta: "¿Hacen presupuestos para empresas?",
    respuesta: "Presupuestos corporativos:\n\n?? Cotizaci¿N personalizada\n?? segÚn cantidad de empleados\n?? Objetivos específicos\n?? Enviamos propuesta formal\n\n*Solicitar a cursos@cemi.edu.ar*",
    acciones: []
  },
  {
    id: 388,
    categoria: "tramites",
    keywords: ["comprobante", "pago", "recibo"],
    pregunta: "¿Dan comprobante de pago?",
    respuesta: "Comprobantes:\n\n?? Recibo por cada pago\n?? Versi¿N digital por email\n?? Historial en tu cuenta\n?? Detalle de transacciones\n\n*Guardalo para tus registros*",
    acciones: []
  },
  {
    id: 389,
    categoria: "tramites",
    keywords: ["inscripcion", "formulario", "datos", "llenar"],
    pregunta: "¿qué datos piden para inscribirse?",
    respuesta: "Datos de inscripción:\n\n?? Nombre completo y DNI\n?? Email y tel?fono\n?? Direcci¿N\n?? Fecha de nacimiento\n?? Nivel de idioma previo\n\n*Proceso simple y r¿Pido*",
    acciones: []
  },
  {
    id: 390,
    categoria: "tramites",
    keywords: ["menor", "edad", "autorizacion", "padres"],
    pregunta: "?Menores necesitan autorizaci¿N?",
    respuesta: "Menores de edad:\n\n?? Autorizaci¿N de padres/tutores\n?? Firma en formulario\n?? Datos de contacto adulto\n? DNI del responsable\n\n*Requerido para inscripción y ex?menes*",
    acciones: []
  },
  
  // ========== CULTURA Y VIAJES (391-415) ==========
  {
    id: 391,
    categoria: "cultura_viajes",
    keywords: ["viaje", "exterior", "estudiar afuera"],
    pregunta: "¿Puedo estudiar en el exterior con CEMI?",
    respuesta: "Estudiar en el exterior:\n\n?? Te preparamos para la experiencia\n?? Asesoramiento sobre destinos\n?? Cartas de recomendaci¿N\n?? Nivel adecuado para el viaje\n\n*Planific? con tiempo tu aventura*",
    acciones: []
  },
  {
    id: 392,
    categoria: "cultura_viajes",
    keywords: ["intercambio", "estudiante", "exchange"],
    pregunta: "?Ofrecen programas de intercambio?",
    respuesta: "Intercambios:\n\n?? No gestionamos intercambios directamente\n?? Colaboramos con agencias especializadas\n? preparación lingüística\n?? Documentaci¿N necesaria\n\n*Te orientamos en el proceso*",
    acciones: []
  },
  {
    id: 393,
    categoria: "cultura_viajes",
    keywords: ["visa", "trabajo", "exterior", "migrar"],
    pregunta: "¿El certificado sirve para tramitar visa?",
    respuesta: "Certificados y visas:\n\n?? Certificamos tu nivel de idioma\n? V?lido para algunas embajadas\n?? Consulta requisitos específicos\n?? preparación para entrevistas\n\n*Cada pa¿S tiene sus requisitos*",
    acciones: []
  },
  {
    id: 394,
    categoria: "cultura_viajes",
    keywords: ["trabajar", "exterior", "emigrar"],
    pregunta: "?Me preparan para trabajar afuera?",
    respuesta: "preparación laboral internacional:\n\n?? CV en idioma extranjero\n?? Entrevistas laborales\n?? Vocabulario profesional\n?? Cultura laboral de otros pa¿Ses\n\n*Clases específicas disponibles*",
    acciones: []
  },
  {
    id: 395,
    categoria: "cultura_viajes",
    keywords: ["cultura", "pais", "costumbres"],
    pregunta: "¿Ense?an sobre la cultura de otros pa¿Ses?",
    respuesta: "Contenido cultural:\n\n?? Costumbres y tradiciones\n?? Festividades importantes\n??? Gastronom?a t¿Pica\n?? Arte y entretenimiento\n?? Historia y sociedad\n\n*Idioma y cultura van de la mano*",
    acciones: []
  },
  {
    id: 396,
    categoria: "cultura_viajes",
    keywords: ["turismo", "viajar", "vacaciones"],
    pregunta: "¿Hay cursos para turismo?",
    respuesta: "Ingl¿S para viajeros:\n\n?? Vocabulario de aeropuerto\n?? Reservas de hotel\n?? Restaurantes y pedidos\n??? Indicaciones y transporte\n?? Emergencias b¿Sicas\n\n*Curso intensivo de supervivencia*",
    acciones: []
  },
  {
    id: 397,
    categoria: "cultura_viajes",
    keywords: ["acento", "britanico", "americano", "australiano"],
    pregunta: "¿Ense?an diferentes acentos?",
    respuesta: "Variedad de acentos:\n\n???? Americano (est¿Ndar)\n???? Brit¿Nico\n???? Australiano\n???? Irland¿S\n?? Exposici¿N a todos\n\n*Entrenamiento auditivo incluido*",
    acciones: []
  },
  {
    id: 398,
    categoria: "cultura_viajes",
    keywords: ["modismo", "slang", "jerga", "coloquial"],
    pregunta: "¿Ense?an expresiones coloquiales?",
    respuesta: "Lenguaje coloquial:\n\n?? Frases hechas comunes\n??? Slang actualizado\n?? Expresiones informales\n?? Lenguaje de pel¿Culas/series\n\n*Fundamental para entender nativos*",
    acciones: []
  },
  {
    id: 399,
    categoria: "cultura_viajes",
    keywords: ["frase", "viaje", "basico", "supervivencia"],
    pregunta: "¿cuáles son las frases b¿Sicas para viajar?",
    respuesta: "Frases esenciales:\n\n?? Greetings / Saludos\n?? Help, please! / ?Ayuda!\n?? Where is...? / ¿dónde est?...?\n?? How much? / ¿Cu¿Nto cuesta?\n?? Thank you / Gracias\n\n*Lo m¿Nimo para sobrevivir*",
    acciones: []
  },
  {
    id: 400,
    categoria: "cultura_viajes",
    keywords: ["historia", "idioma", "origen", "evolucion"],
    pregunta: "¿Ense?an historia del idioma?",
    respuesta: "Historia lingüística:\n\n?? Origen del ingl¿S\n?? Influencias de otros idiomas\n?? Evoluci¿N hist?rica\n??? Variantes regionales\n\n*Contenido opcional interesante*",
    acciones: []
  },
  {
    id: 401,
    categoria: "cultura_viajes",
    keywords: ["literatura", "clasico", "shakespeare"],
    pregunta: "¿Estudian literatura cl¿Sica?",
    respuesta: "Literatura:\n\n?? Lectura adaptada por nivel\n?? Shakespeare para avanzados\n?? Novelas cl¿Sicas\n?? Poes?a en ingl¿S\n\n*Opcional en niveles superiores*",
    acciones: []
  },
  {
    id: 402,
    categoria: "cultura_viajes",
    keywords: ["musica", "canciones", "aprender cantando"],
    pregunta: "?Usan másica para enseñar?",
    respuesta: "másica en clase:\n\n?? Canciones populares\n?? An?lisis de letras\n?? Karaoke did¿Ctico\n?? Ejercicios de listening\n?? Todos los g¿Neros\n\n*La másica mejora la pronunciaci¿N*",
    acciones: []
  },
  {
    id: 403,
    categoria: "cultura_viajes",
    keywords: ["pelicula", "serie", "netflix", "ver en ingles"],
    pregunta: "?Recomiendan series para aprender?",
    respuesta: "Series recomendadas:\n\n?? Friends (principiantes)\n?? The Office (intermedio)\n?? Breaking Bad (avanzado)\n?? The Crown (brit¿Nico)\n?? Documentales (variado)\n\n*Empez? con subtÍtulos en ingl¿S*",
    acciones: []
  },
  {
    id: 404,
    categoria: "cultura_viajes",
    keywords: ["libro", "lectura", "leer en ingles"],
    pregunta: "¿qué libros recomiendan para principiantes?",
    respuesta: "Lecturas recomendadas:\n\n?? Graded readers (por nivel)\n?? Cuentos infantiles cl¿Sicos\n?? Novelas adaptadas\n?? C?mics y graphic novels\n\n*Empez? con textos cortos*",
    acciones: []
  },
  {
    id: 405,
    categoria: "cultura_viajes",
    keywords: ["podcast", "audio", "escuchar ingles"],
    pregunta: "¿qué podcasts recomiendan?",
    respuesta: "Podcasts para aprender:\n\n?? 6 Minute English (BBC)\n?? All Ears English\n?? English Learning for Curious Minds\n?? Espresso English\n?? TED Talks (avanzado)\n\n*Escuch? mientras viaj¿S*",
    acciones: []
  },
  {
    id: 406,
    categoria: "cultura_viajes",
    keywords: ["youtuber", "youtube", "canal", "videos"],
    pregunta: "¿qué canales de YouTube recomiendan?",
    respuesta: "Canales recomendados:\n\n?? EngVid (gram¿Tica)\n?? Rachel's English (pronunciaci¿N)\n?? English with Lucy\n?? BBC Learning English\n?? JenniferESL\n\n*Contenido gratuito de calidad*",
    acciones: []
  },
  {
    id: 407,
    categoria: "cultura_viajes",
    keywords: ["app", "aplicacion", "duolingo", "babbel"],
    pregunta: "¿qué apps recomiendan complementar?",
    respuesta: "Apps recomendadas:\n\n?? Duolingo (vocabulario)\n?? Anki (flashcards)\n?? HelloTalk (chat nativos)\n?? Lyrics Training (canciones)\n?? BBC Learning English\n\n*Complementan pero no reemplazan clases*",
    acciones: []
  },
  {
    id: 408,
    categoria: "cultura_viajes",
    keywords: ["juego", "game", "divertido", "aprender jugando"],
    pregunta: "¿Hay juegos para aprender ingl¿S?",
    respuesta: "Juegos educativos:\n\n?? Scrabble (vocabulario)\n?? Taboo (descripci¿N)\n?? Pictionary (creatividad)\n?? Videojuegos en ingl¿S\n?? Trivia nights\n\n*Aprender jugando es más efectivo*",
    acciones: []
  },
  {
    id: 409,
    categoria: "cultura_viajes",
    keywords: ["pensar", "ingles", "traducir", "mental"],
    pregunta: "¿CÓmo dejo de traducir mentalmente?",
    respuesta: "Pensar en ingl¿S:\n\n?? Practica describir tu d?a\n?? Nombra objetos mentalmente\n?? Lleva un diario en ingl¿S\n??? Habl? solo (en serio)\n? Aumenta exposici¿N diaria\n\n*Lleva tiempo pero se logra*",
    acciones: []
  },
  {
    id: 410,
    categoria: "cultura_viajes",
    keywords: ["miedo", "hablar", "verguenza", "timidez"],
    pregunta: "¿CÓmo supero el miedo a hablar?",
    respuesta: "Superar la timidez:\n\n?? Errores son parte del proceso\n?? Ambiente sin juicio en clase\n??? Practicar en voz alta solo\n?? Empezar con frases simples\n?? Celebrar pequeños logros\n\n*Todos pasamos por eso*",
    acciones: []
  },
  {
    id: 411,
    categoria: "cultura_viajes",
    keywords: ["frustrar", "dificil", "no avanzo", "estancado"],
    pregunta: "¿qué hago si me siento estancado?",
    respuesta: "Superar el estancamiento:\n\n?? Es normal en el aprendizaje\n?? Cambia tu m¿Todo de estudio\n?? Fij? metas pequeñas\n?? Var?a el contenido\n??? Habl? con tu profesor\n\n*Los mesetas son parte del camino*",
    acciones: []
  },
  {
    id: 412,
    categoria: "cultura_viajes",
    keywords: ["motivacion", "ganas", "aburrido"],
    pregunta: "¿CÓmo mantengo la motivaci¿N?",
    respuesta: "Mantener motivaci¿N:\n\n?? Record? por qué empezaste\n?? Rutina de estudio fija\n?? Celebr? cada avance\n?? Pens? en tus metas\n?? Estudia con otros\n\n*La constancia supera al talento*",
    acciones: []
  },
  {
    id: 413,
    categoria: "cultura_viajes",
    keywords: ["tiempo", "estudiar", "dedicar", "horas"],
    pregunta: "¿Cu¿Nto tiempo debo estudiar por d?a?",
    respuesta: "Tiempo de estudio:\n\n? M¿Nimo: 15-30 min/d?a\n?? Ideal: 1 hora/d?a\n?? Consistencia > Intensidad\n?? Mejor poco todos los d?as\n?? Descansos son importantes\n\n*Calidad sobre cantidad*",
    acciones: []
  },
  {
    id: 414,
    categoria: "cultura_viajes",
    keywords: ["rapido", "urgente", "acelerar", "intensivo"],
    pregunta: "¿Puedo aprender r¿Pido?",
    respuesta: "Aprendizaje acelerado:\n\n? Cursos intensivos disponibles\n?? más horas = más r¿Pido\n?? Inmersi¿N total ayuda\n? Realista: 3-6 meses por nivel\n?? Depende de tu dedicaci¿N\n\n*No hay atajos m¡Gicos*",
    acciones: []
  },
  {
    id: 415,
    categoria: "cultura_viajes",
    keywords: ["inmersion", "sumergirse", "rodearse"],
    pregunta: "¿CÓmo hago inmersi¿N sin viajar?",
    respuesta: "Inmersi¿N en casa:\n\n?? Cambiar idioma del celular\n?? Series/pel¿Culas sin subtÍtulos\n?? másica en ingl¿S\n?? Redes en ingl¿S\n?? Leer en ingl¿S\n??? Hablar solo\n\n*Cre? tu burbuja de ingl¿S*",
    acciones: []
  },
  
  // ========== VOCABULARIO específicO (416-440) ==========
  {
    id: 416,
    categoria: "vocabulario",
    keywords: ["vocabulario", "palabras", "memorizar"],
    pregunta: "¿CÓmo memorizo vocabulario?",
    respuesta: "T¿Cnicas de memorizaci¿N:\n\n?? Flashcards (Anki)\n?? Repetici¿N espaciada\n?? Leer en contexto\n??? Usar palabras nuevas\n?? Llevar cuaderno de vocab\n\n*Aprender en contexto es clave*",
    acciones: []
  },
  {
    id: 417,
    categoria: "vocabulario",
    keywords: ["cuantas", "palabras", "necesito", "suficiente"],
    pregunta: "¿Cu¿Ntas palabras necesito saber?",
    respuesta: "Vocabulario por nivel:\n\n?? B¿Sico: 500-1000 palabras\n?? Intermedio: 2000-4000\n?? Avanzado: 5000-10000\n?? Nativo: 20000-35000\n\n*Con 3000 entend¿S el 90% de conversaciones*",
    acciones: []
  },
  {
    id: 418,
    categoria: "vocabulario",
    keywords: ["falso", "cognado", "false friend"],
    pregunta: "¿qué son los false friends?",
    respuesta: "False friends (falsos cognados):\n\n? Actually ? Actualmente (= Currently)\n? Embarassed ? Embarazada (= Pregnant)\n? Sensible ? Sensible (= Sensitive)\n? Library ? Librer?a (= Bookstore)\n\n*Cuidado con estos*",
    acciones: []
  },
  {
    id: 419,
    categoria: "vocabulario",
    keywords: ["phrasal", "verb", "verbo fraseal"],
    pregunta: "¿qué son los phrasal verbs?",
    respuesta: "Phrasal verbs:\n\n?? Verbo + preposici¿N/adverbio\n?? Cambian el significado\n?? Muy usados en conversaci¿N\n?? Ejemplos: get up, look for, give up\n\n*Los vemos desde nivel intermedio*",
    acciones: []
  },
  {
    id: 420,
    categoria: "vocabulario",
    keywords: ["idiom", "expresion", "frase hecha"],
    pregunta: "¿qué son los idioms?",
    respuesta: "Idioms (expresiones idiom¿Ticas):\n\n??? It's raining cats and dogs\n?? Break a leg (buena suerte)\n?? Hit the nail on the head\n? Better late than never\n\n*No se traducen literalmente*",
    acciones: []
  },
  {
    id: 421,
    categoria: "vocabulario",
    keywords: ["sinonimo", "antonimo", "palabras similares"],
    pregunta: "¿Ense?an sin¿Nimos y ant¿Nimos?",
    respuesta: "Vocabulario ampliado:\n\n?? Sin¿Nimos enriquecen el habla\n?? Ant¿Nimos para contrastar\n?? Thesaurus recomendado\n?? Evitar repetici¿N\n\n*Fundamental para writing avanzado*",
    acciones: []
  },
  {
    id: 422,
    categoria: "vocabulario",
    keywords: ["formal", "informal", "registro"],
    pregunta: "¿cuál es la diferencia entre formal e informal?",
    respuesta: "Registros del idioma:\n\n?? Formal: trabajo, académico\n?? Informal: amigos, familia\n?? Emails segÚn contexto\n??? Saludos diferentes\n\n*Saber cu¿Ndo usar cada uno*",
    acciones: []
  },
  {
    id: 423,
    categoria: "vocabulario",
    keywords: ["conectores", "linking", "palabras enlace"],
    pregunta: "¿qué conectores debo aprender?",
    respuesta: "Conectores esenciales:\n\n? However, Therefore, Moreover\n?? In addition, Furthermore\n?? On the other hand\n?? In conclusion, Finally\n\n*Mejoran la coherencia del discurso*",
    acciones: []
  },
  {
    id: 424,
    categoria: "vocabulario",
    keywords: ["collocations", "combinacion", "palabras juntas"],
    pregunta: "¿qué son las collocations?",
    respuesta: "Collocations:\n\n?? Palabras que van juntas\n? Make a decision (no do a decision)\n? Take a photo (no make a photo)\n? Heavy rain (no strong rain)\n\n*Suenan natural para nativos*",
    acciones: []
  },
  {
    id: 425,
    categoria: "vocabulario",
    keywords: ["prefijo", "sufijo", "word formation"],
    pregunta: "¿Ense?an formaciÓn de palabras?",
    respuesta: "Word formation:\n\n?? Prefijos: un-, re-, dis-\n?? Sufijos: -tion, -ment, -ly\n?? Familias de palabras\n?? Construir vocabulario\n\n*Multiplic? tu vocabulario*",
    acciones: []
  },
  {
    id: 426,
    categoria: "vocabulario",
    keywords: ["numeros", "contar", "fechas", "horas"],
    pregunta: "¿Ense?an n?meros y fechas?",
    respuesta: "N?meros y tiempo:\n\n?? Cardinales y ordinales\n?? Fechas (formato diferente)\n? Decir la hora\n?? Precios y cantidades\n?? Porcentajes\n\n*B¿Sico pero importante*",
    acciones: []
  },
  {
    id: 427,
    categoria: "vocabulario",
    keywords: ["familia", "parientes", "parentesco"],
    pregunta: "?Vocabulario de familia?",
    respuesta: "Familia en ingl¿S:\n\n???????? Parents, siblings, children\n?? Grandparents, grandchildren\n?? In-laws, step-family\n?? Relatives, ancestors\n\n*Tema de primer nivel*",
    acciones: []
  },
  {
    id: 428,
    categoria: "vocabulario",
    keywords: ["comida", "alimentos", "cocina", "recetas"],
    pregunta: "?Vocabulario de comida?",
    respuesta: "Food vocabulary:\n\n?? Fruits and vegetables\n?? Meat and seafood\n?? Cooking verbs\n??? Restaurant vocabulary\n?? Recipes and ingredients\n\n*Tema muy pr¿Ctico*",
    acciones: []
  },
  {
    id: 429,
    categoria: "vocabulario",
    keywords: ["ropa", "vestimenta", "moda"],
    pregunta: "?Vocabulario de ropa?",
    respuesta: "Clothing vocabulary:\n\n?? Shirt, pants, dress\n?? Shoes, boots, sneakers\n?? Jacket, coat, sweater\n?? Accessories\n??? Shopping for clothes\n\n*¿Til para compras*",
    acciones: []
  },
  {
    id: 430,
    categoria: "vocabulario",
    keywords: ["casa", "hogar", "habitaciones", "muebles"],
    pregunta: "?Vocabulario del hogar?",
    respuesta: "Home vocabulary:\n\n?? Rooms of the house\n??? Furniture\n?? Appliances\n?? Household chores\n?? Describing your home\n\n*Tema de nivel inicial*",
    acciones: []
  },
  {
    id: 431,
    categoria: "vocabulario",
    keywords: ["trabajo", "oficina", "profesion"],
    pregunta: "?Vocabulario de trabajo?",
    respuesta: "Work vocabulary:\n\n?? Jobs and professions\n?? Office vocabulary\n?? Business emails\n?? Meetings and presentations\n?? Interviews\n\n*Esencial para Business English*",
    acciones: []
  },
  {
    id: 432,
    categoria: "vocabulario",
    keywords: ["salud", "medico", "hospital", "enfermedad"],
    pregunta: "?Vocabulario de salud?",
    respuesta: "Health vocabulary:\n\n?? Doctor visits\n?? Symptoms and medicine\n?? Body parts\n?? Emergencies\n?? Common illnesses\n\n*Importante para viajes*",
    acciones: []
  },
  {
    id: 433,
    categoria: "vocabulario",
    keywords: ["deporte", "ejercicio", "gym"],
    pregunta: "?Vocabulario de deportes?",
    respuesta: "Sports vocabulary:\n\n? Team sports\n?? Individual sports\n??? Gym and fitness\n?? Competitions\n?? Sports commentary\n\n*Para fans del deporte*",
    acciones: []
  },
  {
    id: 434,
    categoria: "vocabulario",
    keywords: ["tecnologia", "computadora", "internet"],
    pregunta: "?Vocabulario de tecnología?",
    respuesta: "Tech vocabulary:\n\n?? Computer terms\n?? Mobile technology\n?? Internet and social media\n?? Gaming vocabulary\n?? Troubleshooting\n\n*Muy actual y ¿Til*",
    acciones: []
  },
  {
    id: 435,
    categoria: "vocabulario",
    keywords: ["clima", "tiempo", "estaciones"],
    pregunta: "?Vocabulario del clima?",
    respuesta: "Weather vocabulary:\n\n?? Sunny, cloudy, rainy\n??? Temperature expressions\n?? Seasons\n?? Extreme weather\n?? Small talk about weather\n\n*Tema cl¿Sico de conversaci¿N*",
    acciones: []
  },
  {
    id: 436,
    categoria: "vocabulario",
    keywords: ["emociones", "sentimientos", "estado animo"],
    pregunta: "?Vocabulario de emociones?",
    respuesta: "Emotions vocabulary:\n\n?? Happy, excited, pleased\n?? Sad, disappointed, upset\n?? Angry, frustrated, annoyed\n?? Scared, worried, nervous\n?? Surprised, amazed, shocked\n\n*Expresar sentimientos*",
    acciones: []
  },
  {
    id: 437,
    categoria: "vocabulario",
    keywords: ["ciudad", "transporte", "direcciones"],
    pregunta: "?Vocabulario de ciudad?",
    respuesta: "City vocabulary:\n\n??? Places in a city\n?? Transportation\n??? Giving directions\n?? Shops and services\n?? Traffic and streets\n\n*Esencial para viajar*",
    acciones: []
  },
  {
    id: 438,
    categoria: "vocabulario",
    keywords: ["animales", "mascota", "naturaleza"],
    pregunta: "?Vocabulario de animales?",
    respuesta: "Animal vocabulary:\n\n?? Pets and domestic animals\n?? Wild animals\n?? Birds and insects\n?? Sea creatures\n?? Nature and habitats\n\n*Tema popular en todos los niveles*",
    acciones: []
  },
  {
    id: 439,
    categoria: "vocabulario",
    keywords: ["colores", "formas", "tamaños"],
    pregunta: "?Vocabulario de descripciones?",
    respuesta: "Describing vocabulary:\n\n?? Colors and shades\n?? Shapes and sizes\n?? Dimensions\n?? Textures and materials\n? Adjectives order\n\n*Base para describir todo*",
    acciones: []
  },
  {
    id: 440,
    categoria: "vocabulario",
    keywords: ["dinero", "banco", "finanzas"],
    pregunta: "?Vocabulario financiero?",
    respuesta: "Financial vocabulary:\n\n?? Money and currency\n?? Banking terms\n?? Payments and transactions\n?? Investments basics\n?? Bills and expenses\n\n*¿Til para negocios*",
    acciones: []
  },
  
  // ========== GRAM¿TICA Y ESTRUCTURA (441-470) ==========
  {
    id: 441,
    categoria: "gramatica",
    keywords: ["gramatica", "reglas", "estructura"],
    pregunta: "?La gram¿Tica es muy dif¿Cil?",
    respuesta: "Gram¿Tica inglesa:\n\n?? más simple que el español\n? Sin g¿Nero gramatical\n?? Conjugaciones sencillas\n?? Aprendizaje gradual\n\n*Se aprende con pr¿Ctica*",
    acciones: []
  },
  {
    id: 442,
    categoria: "gramatica",
    keywords: ["verbo", "to be", "ser estar"],
    pregunta: "¿qué es el verbo 'to be'?",
    respuesta: "Verbo TO BE:\n\n?? I am, You are, He/She/It is\n?? We/They are\n?? = Ser y Estar\n?? Base de todo el idioma\n\n*Primer verbo que aprender¿S*",
    acciones: []
  },
  {
    id: 443,
    categoria: "gramatica",
    keywords: ["presente", "simple", "present"],
    pregunta: "¿qué es el Present Simple?",
    respuesta: "Present Simple:\n\n?? Acciones habituales\n?? Rutinas y costumbres\n?? I work, She works (+s en 3ra persona)\n? Do/Does para preguntas\n\n*Primer tiempo verbal*",
    acciones: []
  },
  {
    id: 444,
    categoria: "gramatica",
    keywords: ["presente", "continuo", "progressive", "ing"],
    pregunta: "¿qué es el Present Continuous?",
    respuesta: "Present Continuous:\n\n?? Acciones en progreso AHORA\n?? Verbo + ing\n?? I am working, She is studying\n? Planes futuros tambi¿N\n\n*Segundo tiempo que aprender¿S*",
    acciones: []
  },
  {
    id: 445,
    categoria: "gramatica",
    keywords: ["pasado", "simple", "past", "ed"],
    pregunta: "¿qué es el Past Simple?",
    respuesta: "Past Simple:\n\n?? Acciones terminadas en el pasado\n?? Verbos regulares: +ed\n?? Verbos irregulares: memorizar\n? Did para preguntas\n\n*Hay lista de verbos irregulares*",
    acciones: []
  },
  {
    id: 446,
    categoria: "gramatica",
    keywords: ["futuro", "will", "going to"],
    pregunta: "¿CÓmo se forma el futuro?",
    respuesta: "Futuro en ingl¿S:\n\n?? Will + verbo: decisiones espont¿Neas\n?? Going to: planes decididos\n?? Present Continuous: planes fijos\n?? Contexto determina cuál usar\n\n*Tres formas principales*",
    acciones: []
  },
  {
    id: 447,
    categoria: "gramatica",
    keywords: ["perfecto", "have", "has", "present perfect"],
    pregunta: "¿qué es el Present Perfect?",
    respuesta: "Present Perfect:\n\n?? Conecta pasado con presente\n?? Have/Has + participio\n? Experiencias de vida\n?? Acciones sin tiempo específico\n\n*Uno de los más confusos*",
    acciones: []
  },
  {
    id: 448,
    categoria: "gramatica",
    keywords: ["condicional", "if", "would", "conditional"],
    pregunta: "¿qué son los condicionales?",
    respuesta: "Condicionales:\n\n?? Zero: verdades universales\n?? First: situaciones reales\n?? Second: situaciones hipot¿Ticas\n?? Third: pasado imposible\n\n*Nivel intermedio-avanzado*",
    acciones: []
  },
  {
    id: 449,
    categoria: "gramatica",
    keywords: ["pasiva", "passive", "voz pasiva"],
    pregunta: "¿qué es la voz pasiva?",
    respuesta: "Voz Pasiva:\n\n?? Objeto se vuelve sujeto\n?? Be + participio pasado\n?? The book was written by...\n?? Foco en la acci¿N, no en qui¿N\n\n*Muy usada en textos formales*",
    acciones: []
  },
  {
    id: 450,
    categoria: "gramatica",
    keywords: ["reported", "speech", "indirecto", "dijo que"],
    pregunta: "¿qué es el Reported Speech?",
    respuesta: "Reported Speech:\n\n?? Contar lo que alguien dijo\n?? Cambio de tiempos verbales\n?? She said that...\n?? He told me that...\n\n*Nivel intermedio*",
    acciones: []
  },
  {
    id: 451,
    categoria: "gramatica",
    keywords: ["modal", "can", "could", "should", "must"],
    pregunta: "¿qué son los verbos modales?",
    respuesta: "Modal Verbs:\n\n?? Can/Could: habilidad\n?? Should: consejo\n?? Must: obligaci¿N\n?? May/Might: posibilidad\n?? No cambian con la persona\n\n*Muy importantes*",
    acciones: []
  },
  {
    id: 452,
    categoria: "gramatica",
    keywords: ["articulo", "a", "an", "the"],
    pregunta: "¿Cu¿Ndo uso a, an, the?",
    respuesta: "Art¿Culos:\n\n?? A: antes de consonante\n?? An: antes de vocal (sonido)\n?? The: algo específico/¿Nico\n? Sin art¿Culo: generalidades\n\n*Reglas más simples que en español*",
    acciones: []
  },
  {
    id: 453,
    categoria: "gramatica",
    keywords: ["preposicion", "in", "on", "at"],
    pregunta: "¿Cu¿Ndo uso in, on, at?",
    respuesta: "Preposiciones de lugar/tiempo:\n\n?? At: punto específico (at home, at 5pm)\n?? On: superficie/d?as (on Monday)\n?? In: dentro/meses/años (in May)\n\n*Muchas excepciones, pr¿Ctica*",
    acciones: []
  },
  {
    id: 454,
    categoria: "gramatica",
    keywords: ["pronombre", "he", "she", "they", "it"],
    pregunta: "¿cuáles son los pronombres?",
    respuesta: "Pronombres:\n\n?? I, You, He, She, It, We, They\n?? Me, You, Him, Her, It, Us, Them\n?? My, Your, His, Her, Its, Our, Their\n\n*Base fundamental del idioma*",
    acciones: []
  },
  {
    id: 455,
    categoria: "gramatica",
    keywords: ["adjetivo", "comparativo", "superlativo"],
    pregunta: "¿CÓmo se comparan cosas?",
    respuesta: "Comparativos y Superlativos:\n\n?? +er/-est para cortos: bigger, biggest\n?? More/Most para largos: more beautiful\n?? Irregulares: good-better-best\n\n*Tema de nivel inicial*",
    acciones: []
  },
  {
    id: 456,
    categoria: "gramatica",
    keywords: ["adverbio", "ly", "quickly", "slowly"],
    pregunta: "¿CÓmo se forman los adverbios?",
    respuesta: "Adverbios:\n\n?? Adjetivo + ly: quick ? quickly\n?? Good ? Well (irregular)\n?? Posici¿N en la oraci¿N\n?? Modifican verbos, adjetivos, otros adverbios\n\n*Enriquecen el discurso*",
    acciones: []
  },
  {
    id: 457,
    categoria: "gramatica",
    keywords: ["pregunta", "question", "wh", "what", "where"],
    pregunta: "¿CÓmo se hacen preguntas?",
    respuesta: "Preguntas en ingl¿S:\n\n? WH questions: What, Where, When, Why, Who, How\n?? Inversi¿N: auxiliar + sujeto\n?? Do/Does/Did para present/past\n\n*Estructura diferente al español*",
    acciones: []
  },
  {
    id: 458,
    categoria: "gramatica",
    keywords: ["negacion", "not", "don't", "doesn't"],
    pregunta: "¿CÓmo se niega en ingl¿S?",
    respuesta: "Negaci¿N:\n\n?? Auxiliar + not (don't, doesn't, didn't)\n?? Am/Is/Are + not\n?? Can't, Won't, Shouldn't\n?? Doble negaci¿N no existe\n\n*más simple que en español*",
    acciones: []
  },
  {
    id: 459,
    categoria: "gramatica",
    keywords: ["contable", "incontable", "some", "any", "much", "many"],
    pregunta: "¿qué son sustantivos contables e incontables?",
    respuesta: "Countable vs Uncountable:\n\n? Contables: a car, two cars\n? Incontables: water, money, advice\n?? Many/Few: contables\n?? Much/Little: incontables\n\n*Some/Any para ambos*",
    acciones: []
  },
  {
    id: 460,
    categoria: "gramatica",
    keywords: ["plural", "plurales", "irregulares"],
    pregunta: "¿CÓmo se forma el plural?",
    respuesta: "Plurales en ingl¿S:\n\n?? +s: cars, books\n?? +es: boxes, watches\n?? y?ies: cities\n?? Irregulares: men, women, children, teeth\n\n*Menos reglas que en español*",
    acciones: []
  },
  {
    id: 461,
    categoria: "gramatica",
    keywords: ["genitivo", "posesivo", "apostrofe", "'s"],
    pregunta: "¿CÓmo se indica posesi¿N?",
    respuesta: "Genitivo saj¿N:\n\n?? Persona + 's + objeto\n?? John's car (el auto de John)\n?? Plural: The students' books\n?? Of: para cosas (the color of the car)\n\n*Muy usado en ingl¿S*",
    acciones: []
  },
  {
    id: 462,
    categoria: "gramatica",
    keywords: ["relativa", "which", "who", "that", "clause"],
    pregunta: "¿qué son las relative clauses?",
    respuesta: "Relative Clauses:\n\n?? Who: personas\n?? Which: cosas\n?? That: ambos (informal)\n?? Whose: posesi¿N\n?? Where: lugares\n\n*Dan informaciÓn adicional*",
    acciones: []
  },
  {
    id: 463,
    categoria: "gramatica",
    keywords: ["gerundio", "infinitivo", "to", "ing diferencia"],
    pregunta: "¿Cu¿Ndo uso gerundio vs infinitivo?",
    respuesta: "Gerund vs Infinitive:\n\n?? -ing despu¿S de: enjoy, avoid, finish\n?? To despu¿S de: want, need, decide\n?? Algunos cambian significado\n?? Stop smoking vs Stop to smoke\n\n*Hay que memorizar verbos*",
    acciones: []
  },
  {
    id: 464,
    categoria: "gramatica",
    keywords: ["tag", "question", "verdad", "no"],
    pregunta: "¿qué son las tag questions?",
    respuesta: "Tag Questions:\n\n?? Confirmaci¿N al final\n?? You're coming, aren't you?\n?? She can't swim, can she?\n?? Positivo-Negativo o viceversa\n\n*Muy usado en conversaci¿N*",
    acciones: []
  },
  {
    id: 465,
    categoria: "gramatica",
    keywords: ["orden", "palabras", "estructura", "oracion"],
    pregunta: "¿cuál es el orden de las palabras?",
    respuesta: "Orden en ingl¿S:\n\n?? Sujeto + Verbo + Objeto\n?? I love English (no English love I)\n?? Adjetivo antes del sustantivo\n?? Adverbio flexible\n\n*más estricto que en español*",
    acciones: []
  },
  {
    id: 466,
    categoria: "gramatica",
    keywords: ["contracciones", "I'm", "don't", "can't"],
    pregunta: "¿qué son las contracciones?",
    respuesta: "Contracciones:\n\n?? I am ? I'm\n?? Do not ? Don't\n?? Cannot ? Can't\n?? Would have ? Would've\n\n*Esenciales para sonar natural*",
    acciones: []
  },
  {
    id: 467,
    categoria: "gramatica",
    keywords: ["used to", "would", "costumbre", "solia"],
    pregunta: "¿CÓmo expreso costumbres pasadas?",
    respuesta: "H?bitos pasados:\n\n?? Used to: antes hac?a\n?? I used to play tennis\n?? Would: acciones repetidas\n?? Be used to: estar acostumbrado\n\n*Diferente estructura*",
    acciones: []
  },
  {
    id: 468,
    categoria: "gramatica",
    keywords: ["wish", "if only", "deseo", "ojala"],
    pregunta: "¿CÓmo expreso deseos?",
    respuesta: "Expresar deseos:\n\n?? I wish + past simple: presente\n?? I wish + past perfect: pasado\n?? If only: más enf¿Tico\n?? I wish I had more time\n\n*Nivel intermedio-avanzado*",
    acciones: []
  },
  {
    id: 469,
    categoria: "gramatica",
    keywords: ["there is", "there are", "hay"],
    pregunta: "¿CÓmo digo 'hay' en ingl¿S?",
    respuesta: "There is / There are:\n\n?? There is: singular/incontable\n?? There are: plural\n?? There was/were: pasado\n?? There will be: futuro\n\n*Equivalente a 'hay'*",
    acciones: []
  },
  {
    id: 470,
    categoria: "gramatica",
    keywords: ["quantifiers", "all", "both", "each", "every"],
    pregunta: "¿qué son los quantifiers?",
    respuesta: "Quantifiers:\n\n?? All: todos\n?? Both: ambos (dos)\n?? Each: cada uno (individual)\n?? Every: todos (grupo)\n?? None: ninguno\n\n*Expresan cantidad*",
    acciones: []
  },
  
  // ========== PRONUNCIACI¿N (471-490) ==========
  {
    id: 471,
    categoria: "pronunciacion",
    keywords: ["pronunciar", "pronunciacion", "como suena"],
    pregunta: "?La pronunciaci¿N es dif¿Cil?",
    respuesta: "Pronunciaci¿N inglesa:\n\n??? Es diferente al español\n?? Letras tienen m?ltiples sonidos\n?? Exposici¿N mejora todo\n?? Practica con audio/video\n\n*Se mejora con el tiempo*",
    acciones: []
  },
  {
    id: 472,
    categoria: "pronunciacion",
    keywords: ["th", "sonido", "the", "think"],
    pregunta: "¿CÓmo pronuncio el sonido TH?",
    respuesta: "Sonido TH:\n\n?? Lengua entre los dientes\n?? /?/ como en 'the' (sonoro)\n?? /?/ como en 'think' (sordo)\n?? Practica frente al espejo\n\n*Sonido que no existe en español*",
    acciones: []
  },
  {
    id: 473,
    categoria: "pronunciacion",
    keywords: ["r", "sonido", "diferente"],
    pregunta: "¿CÓmo pronuncio la R en ingl¿S?",
    respuesta: "Sonido R:\n\n?? No vibra como en español\n?? Lengua hacia atr¿S\n?? Retroflex sound\n?? Escucha y repite\n\n*Pr¿Ctica con palabras: red, right, car*",
    acciones: []
  },
  {
    id: 474,
    categoria: "pronunciacion",
    keywords: ["vocal", "larga", "corta", "sheep", "ship"],
    pregunta: "¿qué son las vocales largas y cortas?",
    respuesta: "Vocales largas vs cortas:\n\n?? Sheep (/i?/) vs Ship (/?/)\n?? Pool (/u?/) vs Pull (/?/)\n?? Cart (/??/) vs Cut (/?/)\n?? Cambian significado\n\n*Muy importante distinguirlas*",
    acciones: []
  },
  {
    id: 475,
    categoria: "pronunciacion",
    keywords: ["schwa", "sonido", "a debil"],
    pregunta: "¿qué es el sonido schwa?",
    respuesta: "Schwa /?/:\n\n?? Sonido más com¿N en ingl¿S\n?? 'a' en about, 'e' en taken\n?? Vocal muy relajada\n?? Silabas no acentuadas\n\n*Clave para sonar natural*",
    acciones: []
  },
  {
    id: 476,
    categoria: "pronunciacion",
    keywords: ["acento", "stress", "silaba", "enfasis"],
    pregunta: "¿CÓmo funciona el acento en ingl¿S?",
    respuesta: "Word Stress:\n\n?? Una s?laba más fuerte\n?? PHOtograph vs phoTOgraphy\n?? Puede cambiar significado\n?? Diccionarios marcan el stress\n\n*Diferente al español*",
    acciones: []
  },
  {
    id: 477,
    categoria: "pronunciacion",
    keywords: ["entonacion", "intonation", "subir bajar"],
    pregunta: "¿CÓmo funciona la entonaci¿N?",
    respuesta: "Intonation:\n\n?? Sube en preguntas yes/no\n?? Baja en afirmaciones\n?? Var?a en WH-questions\n?? Expresa emociones\n\n*Muy importante para comunicar*",
    acciones: []
  },
  {
    id: 478,
    categoria: "pronunciacion",
    keywords: ["letras", "mudas", "silent", "letters"],
    pregunta: "¿Por qué hay letras que no se pronuncian?",
    respuesta: "Silent Letters:\n\n?? K en knife, know\n?? B en comb, bomb\n?? G en gnome, sign\n?? W en write, wrong\n?? Razones hist?ricas\n\n*Hay que memorizarlas*",
    acciones: []
  },
  {
    id: 479,
    categoria: "pronunciacion",
    keywords: ["linking", "unir", "palabras juntas"],
    pregunta: "¿Por qué los nativos unen palabras?",
    respuesta: "Linking (uni¿N de palabras):\n\n?? Nativos conectan sonidos\n?? 'an apple' suena 'anapple'\n?? 'Did you' suena 'didju'\n?? Escuchar mucho ayuda\n\n*Clave para comprensi¿N*",
    acciones: []
  },
  {
    id: 480,
    categoria: "pronunciacion",
    keywords: ["minimos", "pares", "minimal pairs"],
    pregunta: "¿qué son los minimal pairs?",
    respuesta: "Minimal Pairs:\n\n?? Palabras casi iguales\n?? Ship/Sheep, Bat/Bet\n?? Entrenan el o¿Do\n??? Mejoran pronunciaci¿N\n\n*Ejercicio muy ¿Til*",
    acciones: []
  },
  {
    id: 481,
    categoria: "pronunciacion",
    keywords: ["trabalenguas", "tongue twister"],
    pregunta: "¿Sirven los trabalenguas?",
    respuesta: "Tongue Twisters:\n\n??? Excelente pr¿Ctica\n?? Peter Piper picked...\n?? She sells seashells...\n?? Mejoran fluidez\n?? ?Y son divertidos!\n\n*Usamos varios en clase*",
    acciones: []
  },
  {
    id: 482,
    categoria: "pronunciacion",
    keywords: ["diccionario", "fonetica", "IPA", "simbolos"],
    pregunta: "¿qué es el IPA?",
    respuesta: "International Phonetic Alphabet:\n\n?? S?mbolos de pronunciaci¿N\n?? /h?'lo?/ = hello\n?? Diccionarios lo usan\n?? ¿Til para autoaprendizaje\n\n*Te ense?amos a leerlo*",
    acciones: []
  },
  {
    id: 483,
    categoria: "pronunciacion",
    keywords: ["mejorar", "pronunciacion", "tips"],
    pregunta: "¿CÓmo mejoro mi pronunciaci¿N?",
    respuesta: "Tips para pronunciaci¿N:\n\n?? Escucha mucho ingl¿S\n??? Repite en voz alta\n?? Gr?bate y esc¿Chate\n?? Practica frente al espejo\n?? Fijate en la boca\n\n*Pr¿Ctica constante*",
    acciones: []
  },
  {
    id: 484,
    categoria: "pronunciacion",
    keywords: ["reduccion", "gonna", "wanna", "gotta"],
    pregunta: "¿qué es gonna, wanna, gotta?",
    respuesta: "Formas reducidas:\n\n??? Gonna = Going to\n??? Wanna = Want to\n??? Gotta = Got to\n?? Uso informal/oral\n?? No escribir en formal\n\n*Muy com¿N en conversaci¿N*",
    acciones: []
  },
  {
    id: 485,
    categoria: "pronunciacion",
    keywords: ["ritmo", "rhythm", "musicalidad"],
    pregunta: "¿El ingl¿S tiene ritmo especial?",
    respuesta: "Ritmo en ingl¿S:\n\n?? Stress-timed language\n?? S?labas acentuadas regulares\n?? No acentuadas se 'comen'\n?? Como másica\n\n*Diferente al español (syllable-timed)*",
    acciones: []
  },
  {
    id: 486,
    categoria: "pronunciacion",
    keywords: ["ed", "pasado", "pronunciar", "-ed"],
    pregunta: "¿CÓmo pronuncio el -ed del pasado?",
    respuesta: "Pronunciaci¿N de -ed:\n\n?? /t/ despu¿S de sordos: walked\n?? /d/ despu¿S de sonoros: played\n?? /¿D/ despu¿S de t/d: wanted\n?? Regla de sonido, no letra\n\n*Muy importante para pasados*",
    acciones: []
  },
  {
    id: 487,
    categoria: "pronunciacion",
    keywords: ["s", "plural", "pronunciar", "-s"],
    pregunta: "¿CÓmo pronuncio la -s del plural?",
    respuesta: "Pronunciaci¿N de -s:\n\n?? /s/ despu¿S de sordos: cats\n?? /z/ despu¿S de sonoros: dogs\n?? /?z/ despu¿S de s,z,sh,ch: boxes\n\n*Similar a regla de -ed*",
    acciones: []
  },
  {
    id: 488,
    categoria: "pronunciacion",
    keywords: ["homofono", "homophone", "suena igual"],
    pregunta: "¿qué son los homophones?",
    respuesta: "Homophones:\n\n?? Suenan igual, diferente significado\n?? Their/There/They're\n?? Your/You're\n?? To/Too/Two\n?? Right/Write\n\n*Cuidado en writing*",
    acciones: []
  },
  {
    id: 489,
    categoria: "pronunciacion",
    keywords: ["heteronimo", "heteronym", "escribe igual"],
    pregunta: "¿qué son los heteronyms?",
    respuesta: "Heteronyms:\n\n?? Misma escritura, diferente sonido\n?? Read (presente) vs Read (pasado)\n?? Live (vivir) vs Live (en vivo)\n?? Lead (guiar) vs Lead (plomo)\n\n*Contexto te dice cuál es*",
    acciones: []
  },
  {
    id: 490,
    categoria: "pronunciacion",
    keywords: ["accent", "reducir", "acento extranjero"],
    pregunta: "¿Puedo eliminar mi acento español?",
    respuesta: "Sobre el acento:\n\n?? Acento no es malo\n? Lo importante es ser entendido\n?? Se puede neutralizar\n? Lleva años de pr¿Ctica\n?? Tu acento es tu identidad\n\n*Enf¿Cate en claridad*",
    acciones: []
  },
  
  // ========== FINAL - DESPEDIDAS Y CIERRE (491-500) ==========
  {
    id: 491,
    categoria: "despedidas",
    keywords: ["gracias", "agradezco", "agradecer"],
    pregunta: "Gracias por la informaciÓn",
    respuesta: "¿De nada! ??\n\nEstoy aquí para ayudarte. Si tenés más consultas sobre CEMI, no dudes en preguntar.\n\n*?¡Éxitos en tu aprendizaje!*",
    acciones: []
  },
  {
    id: 492,
    categoria: "despedidas",
    keywords: ["chau", "adios", "hasta luego", "bye"],
    pregunta: "Chau, hasta luego",
    respuesta: "¿Hasta pronto! ??\n\nGracias por consultar con el asistente de CEMI. Te esperamos en nuestras clases.\n\n*¿Que tengas un excelente d?a!*",
    acciones: []
  },
  {
    id: 493,
    categoria: "despedidas",
    keywords: ["nos vemos", "hasta pronto", "see you"],
    pregunta: "Nos vemos pronto",
    respuesta: "¿Nos vemos! ??\n\nRecord? que podés consultar cualquier duda sobre CEMI cuando quieras.\n\n*¿Suerte con todo!*",
    acciones: []
  },
  {
    id: 494,
    categoria: "despedidas",
    keywords: ["buena", "atencion", "util", "sirvio"],
    pregunta: "Muy buena la atención",
    respuesta: "¿qué bueno que te sirvi?! ??\n\nEn CEMI nos esforzamos por dar la mejor atención.\n\n*¿Te esperamos pronto!*",
    acciones: []
  },
  {
    id: 495,
    categoria: "despedidas",
    keywords: ["excelente", "genial", "barbaro", "copado"],
    pregunta: "¿Excelente informaciÓn!",
    respuesta: "?Me alegra mucho! ??\n\nCualquier otra consulta, aquí estar?.\n\n*?¡Éxitos en tu camino al Bilingüismo!*",
    acciones: []
  },
  {
    id: 496,
    categoria: "despedidas",
    keywords: ["inscribir", "quiero", "anotarme", "empezar"],
    pregunta: "Quiero inscribirme",
    respuesta: "¡Genial que quieras sumarte a CEMI! ??\n\n?? Llamanos o visitanos\n?? Envi? email a info@cemi.edu.ar\n?? Formulario en la web\n\n*¿Te esperamos con los brazos abiertos!*",
    acciones: []
  },
  {
    id: 497,
    categoria: "despedidas",
    keywords: ["voy", "ir", "pasar", "visitar"],
    pregunta: "Voy a pasar por ah?",
    respuesta: "¿Te esperamos! ??\n\n?? Estamos en el centro\n?? Lunes a viernes 9-21h, S?bados 9-13h\n? Te atendemos con gusto\n\n*?Ven? cuando quieras!*",
    acciones: []
  },
  {
    id: 498,
    categoria: "despedidas",
    keywords: ["pensar", "pensarlo", "decidir", "evaluar"],
    pregunta: "Lo voy a pensar",
    respuesta: "¿Por supuesto! ??\n\nTomate tu tiempo para decidir. Cuando est¿S listo/a, aquí estaremos.\n\n*¿Sin presi¿N, tu ritmo!*",
    acciones: []
  },
  {
    id: 499,
    categoria: "despedidas",
    keywords: ["despues", "luego", "mas tarde", "otro momento"],
    pregunta: "Consulto despu¿S",
    respuesta: "¿Cuando quieras! ??\n\nEste asistente est? disponible 24/7 para responder tus dudas.\n\n*¿Te esperamos!*",
    acciones: []
  },
  {
    id: 500,
    categoria: "despedidas",
    keywords: ["listo", "todo", "suficiente", "era eso"],
    pregunta: "Eso era todo",
    respuesta: "¿Perfecto! ?\n\nGracias por usar el asistente virtual de CEMI. Esperamos haberte ayudado.\n\n?? ?¡Éxitos en tu aprendizaje de idiomas!\n\n*Hasta la pr¡Éxima* ??",
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
 * Obtiene sugerencias basadas en la categor?a
 * @param {string} categoria - Categor?a actual
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
              <img src="/images/logo.png" alt="CEMI" />
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
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --asistente-primary: #656f77;
      --asistente-secondary: #4a5259;
      --asistente-bg: #ffffff;
      --asistente-text: #333333;
      --asistente-gray: #f5f5f5;
    }
    
    /* ===== FAB BUTTON ===== */
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
      box-shadow: 0 8px 25px rgba(101,111,119,0.35);
      z-index: 9997;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      animation: fabEntrada 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
    }
    @keyframes fabEntrada {
      0% { transform: scale(0) rotate(-180deg); opacity: 0; }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    .asistente-fab:hover { 
      transform: scale(1.1) rotate(5deg); 
      box-shadow: 0 12px 35px rgba(101,111,119,0.45);
    }
    .asistente-fab:active { transform: scale(0.95); }
    .asistente-fab.modal-open .asistente-fab-icon svg {
      animation: iconRotate 0.4s ease forwards;
    }
    @keyframes iconRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(90deg); }
    }
    .asistente-fab-icon { 
      color: white; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      transition: transform 0.3s ease;
    }
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
    
    /* ===== MODAL ===== */
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
      box-shadow: 0 25px 80px rgba(0,0,0,0.25), 0 10px 30px rgba(101,111,119,0.15);
      z-index: 9998;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transform: translateY(30px) scale(0.95);
      transform-origin: bottom left;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .asistente-modal.active { 
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }
    .asistente-modal.closing {
      opacity: 0;
      transform: translateY(20px) scale(0.9);
      transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
    }
    
    /* ===== BACKDROP ===== */
    .asistente-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.2);
      backdrop-filter: blur(2px);
      z-index: 9996;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    .asistente-backdrop.active {
      opacity: 1;
      visibility: visible;
    }
    
    .asistente-content { display: flex; flex-direction: column; height: 100%; }
    
    /* ===== HEADER ===== */
    .asistente-header {
      background: linear-gradient(135deg, var(--asistente-primary), var(--asistente-secondary));
      color: white;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
    }
    .asistente-header::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      animation: shimmer 3s infinite;
    }
    @keyframes shimmer {
      0%, 100% { transform: translateX(-30%) rotate(0deg); }
      50% { transform: translateX(30%) rotate(10deg); }
    }
    .asistente-header-info { display: flex; align-items: center; gap: 12px; position: relative; z-index: 1; }
    .asistente-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: avatarPulse 2s infinite;
      overflow: hidden;
      padding: 4px;
      box-sizing: border-box;
    }
    .asistente-avatar img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    @keyframes avatarPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.3); }
      50% { box-shadow: 0 0 0 8px rgba(255,255,255,0); }
    }
    .asistente-title { margin: 0; font-size: 16px; font-weight: 600; }
    .asistente-status { 
      font-size: 12px; 
      color: #4ade80;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .asistente-status::before {
      content: '';
      width: 6px;
      height: 6px;
      background: #4ade80;
      border-radius: 50%;
      animation: statusBlink 1.5s infinite;
    }
    @keyframes statusBlink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    .asistente-header-actions { display: flex; gap: 8px; position: relative; z-index: 1; }
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
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      position: relative;
      overflow: hidden;
    }
    .asistente-header-btn::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
      transform: scale(0);
      transition: transform 0.3s ease;
    }
    .asistente-header-btn:hover { 
      background: rgba(255,255,255,0.3); 
      transform: scale(1.1);
    }
    .asistente-header-btn:hover::after { transform: scale(2); }
    .asistente-header-btn:active { transform: scale(0.95); }
    
    /* ===== BODY ===== */
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
    
    /* ===== MENU PRINCIPAL ===== */
    .asistente-menu { padding: 16px; }
    .asistente-bienvenida {
      background: white;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      opacity: 0;
      transform: translateY(20px);
    }
    @keyframes slideUp {
      to { opacity: 1; transform: translateY(0); }
    }
    .asistente-bienvenida h4 { 
      margin: 0 0 8px 0; 
      color: var(--asistente-primary); 
      font-size: 16px;
      background: linear-gradient(135deg, var(--asistente-primary), var(--asistente-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .asistente-bienvenida p { margin: 0; color: #666; font-size: 14px; line-height: 1.5; }
    .asistente-categorias-titulo {
      font-size: 13px;
      font-weight: 600;
      color: #888;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards;
      opacity: 0;
    }
    .asistente-categorias-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .asistente-categoria-btn {
      background: white;
      border: none;
      border-radius: 12px;
      padding: 14px 12px;
      cursor: pointer;
      text-align: left;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 2px 12px rgba(0,0,0,0.04);
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      color: var(--asistente-text);
      position: relative;
      overflow: hidden;
      opacity: 0;
      transform: translateY(15px);
      animation: staggerUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    .asistente-categoria-btn:nth-child(1) { animation-delay: 0.15s; }
    .asistente-categoria-btn:nth-child(2) { animation-delay: 0.2s; }
    .asistente-categoria-btn:nth-child(3) { animation-delay: 0.25s; }
    .asistente-categoria-btn:nth-child(4) { animation-delay: 0.3s; }
    .asistente-categoria-btn:nth-child(5) { animation-delay: 0.35s; }
    .asistente-categoria-btn:nth-child(6) { animation-delay: 0.4s; }
    .asistente-categoria-btn:nth-child(7) { animation-delay: 0.45s; }
    .asistente-categoria-btn:nth-child(8) { animation-delay: 0.5s; }
    .asistente-categoria-btn:nth-child(9) { animation-delay: 0.55s; }
    .asistente-categoria-btn:nth-child(10) { animation-delay: 0.6s; }
    .asistente-categoria-btn:nth-child(11) { animation-delay: 0.65s; }
    .asistente-categoria-btn:nth-child(12) { animation-delay: 0.7s; }
    .asistente-categoria-btn:nth-child(13) { animation-delay: 0.75s; }
    @keyframes staggerUp {
      to { opacity: 1; transform: translateY(0); }
    }
    .asistente-categoria-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transition: left 0.5s ease;
    }
    .asistente-categoria-btn:hover::before { left: 100%; }
    .asistente-categoria-btn:hover {
      background: linear-gradient(135deg, var(--asistente-primary), var(--asistente-secondary));
      color: white;
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 8px 25px rgba(101,111,119,0.3);
    }
    .asistente-categoria-btn:active { transform: translateY(0) scale(0.98); }
    .asistente-categoria-btn .icon { font-size: 18px; transition: transform 0.3s ease; }
    .asistente-categoria-btn:hover .icon { transform: scale(1.2); }
    
    /* ===== PREGUNTAS ===== */
    .asistente-preguntas-header {
      background: white;
      padding: 16px 20px;
      border-bottom: 1px solid #eee;
      position: sticky;
      top: 0;
      z-index: 10;
      animation: slideDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .asistente-preguntas-header h4 { 
      margin: 0; 
      font-size: 16px; 
      color: var(--asistente-primary);
      background: linear-gradient(135deg, var(--asistente-primary), var(--asistente-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .asistente-volver-btn {
      background: var(--asistente-gray);
      border: none;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 13px;
      color: var(--asistente-primary);
      margin-top: 12px;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .asistente-volver-btn:hover { 
      background: var(--asistente-primary);
      color: white;
      transform: translateX(-5px);
    }
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
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 2px 12px rgba(0,0,0,0.04);
      position: relative;
      overflow: hidden;
      opacity: 0;
      transform: translateX(-20px);
      animation: slideRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    .asistente-pregunta-btn:nth-child(1) { animation-delay: 0.1s; }
    .asistente-pregunta-btn:nth-child(2) { animation-delay: 0.15s; }
    .asistente-pregunta-btn:nth-child(3) { animation-delay: 0.2s; }
    .asistente-pregunta-btn:nth-child(4) { animation-delay: 0.25s; }
    .asistente-pregunta-btn:nth-child(5) { animation-delay: 0.3s; }
    .asistente-pregunta-btn:nth-child(6) { animation-delay: 0.35s; }
    .asistente-pregunta-btn:nth-child(7) { animation-delay: 0.4s; }
    .asistente-pregunta-btn:nth-child(8) { animation-delay: 0.45s; }
    .asistente-pregunta-btn:nth-child(9) { animation-delay: 0.5s; }
    .asistente-pregunta-btn:nth-child(10) { animation-delay: 0.55s; }
    @keyframes slideRight {
      to { opacity: 1; transform: translateX(0); }
    }
    .asistente-pregunta-btn::after {
      content: '?';
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%) translateX(10px);
      opacity: 0;
      transition: all 0.3s ease;
      color: white;
    }
    .asistente-pregunta-btn:hover {
      background: linear-gradient(135deg, var(--asistente-primary), var(--asistente-secondary));
      color: white;
      transform: translateX(8px);
      box-shadow: 0 8px 25px rgba(101,111,119,0.25);
      padding-right: 40px;
    }
    .asistente-pregunta-btn:hover::after { opacity: 1; transform: translateY(-50%) translateX(0); }
    .asistente-pregunta-btn:active { transform: translateX(4px) scale(0.98); }
    
    /* ===== RESPUESTA ===== */
    .asistente-respuesta-container { 
      padding: 16px;
      animation: fadeIn 0.4s ease forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .asistente-respuesta-card {
      background: white;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 4px 25px rgba(0,0,0,0.08);
      animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      transform: scale(0.9);
      opacity: 0;
    }
    @keyframes scaleIn {
      to { transform: scale(1); opacity: 1; }
    }
    .asistente-respuesta-pregunta {
      font-size: 15px;
      font-weight: 600;
      color: var(--asistente-primary);
      margin: 0 0 16px 0;
      padding-bottom: 12px;
      border-bottom: 2px solid var(--asistente-gray);
      background: linear-gradient(135deg, var(--asistente-primary), var(--asistente-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .asistente-respuesta-texto {
      font-size: 14px;
      line-height: 1.7;
      color: var(--asistente-text);
      white-space: pre-line;
      animation: fadeInUp 0.5s ease 0.2s forwards;
      opacity: 0;
      transform: translateY(10px);
    }
    @keyframes fadeInUp {
      to { opacity: 1; transform: translateY(0); }
    }
    .asistente-respuesta-texto strong { color: var(--asistente-primary); }
    .asistente-acciones {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #eee;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      animation: fadeInUp 0.5s ease 0.3s forwards;
      opacity: 0;
    }
    .asistente-accion-btn {
      background: linear-gradient(135deg, var(--asistente-primary), var(--asistente-secondary));
      color: white;
      text-decoration: none;
      padding: 10px 16px;
      border-radius: 20px;
      font-size: 13px;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 4px 15px rgba(101,111,119,0.2);
    }
    .asistente-accion-btn:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 8px 25px rgba(101,111,119,0.35);
    }
    .asistente-accion-btn:active { transform: translateY(0) scale(0.98); }
    .asistente-nav-btns { 
      display: flex; 
      gap: 10px; 
      margin-top: 20px;
      animation: fadeInUp 0.5s ease 0.4s forwards;
      opacity: 0;
    }
    .asistente-nav-btn {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .asistente-nav-btn.secundario { 
      background: var(--asistente-gray); 
      color: var(--asistente-primary);
    }
    .asistente-nav-btn.secundario:hover { 
      background: #e8e8e8;
      transform: translateY(-2px);
    }
    .asistente-nav-btn.primario {
      background: linear-gradient(135deg, var(--asistente-primary), var(--asistente-secondary));
      color: white;
      box-shadow: 0 4px 15px rgba(101,111,119,0.2);
    }
    .asistente-nav-btn.primario:hover { 
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(101,111,119,0.35);
    }
    .asistente-nav-btn:active { transform: translateY(0) scale(0.98); }
    
    /* ===== RESPONSIVE ===== */
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
  
  // Crear backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'asistente-backdrop';
  backdrop.id = 'asistente-backdrop';
  document.getElementById('asistente-cemi-container').appendChild(backdrop);
  
  // Funci¿N para abrir modal
  function abrirModal() {
    modal.classList.add('active');
    backdrop.classList.add('active');
    toggle.classList.add('modal-open');
  }
  
  // Funci¿N para cerrar modal con animaci¿N
  function cerrarModal() {
    modal.classList.add('closing');
    backdrop.classList.remove('active');
    toggle.classList.remove('modal-open');
    
    setTimeout(() => {
      modal.classList.remove('active', 'closing');
    }, 300);
  }
  
  toggle.addEventListener('click', () => {
    if (modal.classList.contains('active')) {
      cerrarModal();
    } else {
      abrirModal();
    }
  });
  
  closeBtn.addEventListener('click', cerrarModal);
  backdrop.addEventListener('click', cerrarModal);
  homeBtn.addEventListener('click', mostrarMenuPrincipal);
  document.addEventListener('keydown', (e) => { 
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      cerrarModal();
    }
  });
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







