Tecnicatura Universitaria en Programación

2025

UTN – TUP BELLA VISTA

Práctica supervisada
■ Gomez Micaela - Legajo: 60169

■ Lucena Carlos - Legajo:

■ Ruiz Mendoza Eduardo - Legajo:

■ Sergio Bautista Bareiro- Legajo:

1. Información sobre el proyecto.
El presente proyecto fue la implementación de un Sistema de Gestión Académica

Integral (CEMI Sistema Gestor) , desarrollado para el Centro de Estudios de Idiomas

(CEMI) de la facultad.

La iniciativa surgió a partir de la necesidad de establecer un sistema robusto y digitalizado

que permitiese gestionar la totalidad de las actividades académicas y administrativas del

centro. La gestión anterior, potencialmente fragmentada o manual, generaba riesgos de

inconsistencia de datos y la imposibilidad de aplicar reglas de negocio críticas, como la

validación de la capacidad de las aulas o la prevención de solapamiento de horarios de

cursos.

La solución propuesta consistió en la implementación de una plataforma web con dos

componentes principales:

· Un Dashboard para la gestión administrativa centralizada de alumnos, cursos,
pagos y estadísticas.
· Un Classroom para la interacción educativa, incluyendo tareas, calificaciones y
anuncios.
El sistema fue diseñado para digitalizar las operaciones bajo una estructura de roles

definidos (Alumno, Profesor, Administrativo y Gestor) para garantizar la seguridad y la

correcta asignación de permisos.

El proyecto se estructuró en etapas clave, basándose en una metodología de desarrollo

moderna:

Análisis de Requerimientos: Se identificaron las necesidades específicas del
CEMI mediante la definición de historias de usuario detalladas y se validaron
las reglas de negocio críticas a implementar.
Diseño y Arquitectura: Se definieron los prototipos de la interfaz y la
arquitectura técnica, optando por un stack tecnológico profesional (Node.js,
Express.js y MySQL) para garantizar rendimiento.
Desarrollo e Implementación: Se llevó a cabo la programación y puesta en
marcha del sistema, priorizando la seguridad avanzada mediante la
encriptación de datos (bcrypt) y la gestión de accesos por roles.
Pruebas y Despliegue: Se realizaron pruebas exhaustivas de funcionalidad y
rendimiento para asegurar el soporte a múltiples usuarios conectados
simultáneamente y una disponibilidad óptima.
Un enfoque en la seguridad avanzada , la base de datos robusta y el diseño responsive

permitió crear una solución competitiva y ajustada a las necesidades operativas de la

institución.

El éxito del proyecto se refleja en los beneficios obtenidos: la centralización de todos los

datos académicos , la aplicación estricta de las reglas de negocio que eliminan errores

humanos, la mejora en la toma de decisiones gracias a la generación de reportes

detallados, y la disponibilidad 24/7 del sistema para toda la comunidad educativa

2. Tema a desarrollar
a) Planteamiento de lo requerido.

El Centro de Estudios de Idiomas (CEMI) de la facultad enfrenta un desafío

fundamental en la gestión y administración de sus operaciones académicas y

administrativas. La dependencia de métodos tradicionales de registro y control, o la

utilización de sistemas fragmentados, conlleva a una serie de deficiencias

significativas que comprometen la eficiencia operativa, la integridad de los datos y la

calidad de la experiencia educativa.

Entre las principales deficiencias identificadas y las consecuencias de un sistema

sin centralización, se destacan:

· Falta de integridad y centralización de los datos: La información de
alumnos, cursos, horarios, y pagos no está unificada, lo que genera riesgo
de duplicidad, inconsistencia y dificultad para el acceso rápido y confiable.
· Riesgos de errores operativos: La gestión manual de horarios,
asignación de aulas y control de pagos incrementa la probabilidad de
errores, como:
o Inscripción de alumnos en cursos con horarios superpuestos.
o Asignación de aulas con capacidad insuficiente para el número de
inscritos.
o Ausencia de validación que asegure que cada transacción de pago
esté vinculada correctamente al alumno y al curso.
· Tiempo excesivo en tareas administrativas: La ausencia de
automatización en tareas clave (como el registro de pagos, la
matriculación o la generación de listados) requiere una inversión de
tiempo significativa por parte del personal administrativo.
· Dificultades en la toma de decisiones: La complejidad para generar
reportes e informes consolidados en tiempo real dificulta la supervisión
académica, el seguimiento financiero y la planificación estratégica.
La solución propuesta para abordar estas deficiencias y resolver el problema

general del CEMI consistió en la implementación de un Sistema de Gestión

Académica Integral (CEMI Sistema Gestor).

Esta herramienta tecnológica permite centralizar la totalidad de los datos,

automatizar la aplicación de las reglas de negocio (validando capacidad de aulas

y solapamiento de horarios), reducir los errores manuales, facilitar el acceso a

informes en tiempo real y mejorar la comunicación entre los distintos perfiles de

usuario (Alumnos, Profesores y Administrativos). Con esta solución, el CEMI logra

superar sus desafíos, optimizando su operatividad y elevando la calidad de su

gestión educativa.

3. OBJETIVOS
Objetivo General

Implementar un Sistema de Gestión Académica Integral (CEMI Sistema Gestor)

para digitalizar y optimizar los procesos de administración de alumnos, cursos,

profesores y pagos del Centro de Estudios de Idiomas (CEMI), mejorando la

eficiencia operativa y la calidad del servicio educativo

Objetivos Específicos

· Reemplazar los métodos de gestión tradicionales y fragmentados por un
sistema web centralizado , asegurando la aplicación de las reglas de
negocio críticas (ej. no solapamiento de horarios y capacidad de aulas).
· Digitalizar toda la información académica y administrativa , facilitando su
acceso, consulta y actualización en tiempo real, eliminando
inconsistencias y errores operativos.
· Proveer herramientas específicas a cada rol (Alumno, Profesor,
Administrativo, Gestor) para que puedan realizar sus tareas de forma
eficiente (ej. registro de pagos , inscripción a cursos , consulta de notas y
reportes
a) Alcance del proyecto.

El proyecto abarca todas las etapas necesarias para la implementación de un

Sistema de Gestión Académica Integral, diseñado específicamente para satisfacer

los requerimientos del CEMI. Cada componente busca optimizar la gestión de

recursos humanos, académicos y financieros.

A continuación, se detallan los elementos incluidos en el alcance:

· Análisis de requerimientos y levantamiento de información: Se
realizó una evaluación detallada de los flujos de trabajo mediante la
definición de Historias de Usuario para cada perfil (Alumno, Profesor,
Administrativo, Gestor) , y se establecieron las Reglas de Negocio que el
sistema debe validar.
· Diseño y Arquitectura del Sistema: Creación de la estructura del
sistema, incluyendo el Diagrama Entidad-Relación para definir las tablas
y sus relaciones (Alumnos, Cursos, Pagos, Aulas, etc.) , y la definición de
una interfaz de usuario intuitiva.
· Desarrollo del Sistema de Gestión: Implementación de un software web
(utilizando Node.js, Express.js y MySQL) que permita la gestión eficiente
de:
o Gestión de Usuarios y Perfiles.
o Gestión de Alumnos, Cursos y Aulas.
o Gestión de Profesores.
o Gestión de Pagos (cuotas, matrículas) y Medios de Pago.
· Integración y Pruebas: Puesta en marcha del sistema en un entorno de
prueba, realizando ajustes para asegurar el correcto funcionamiento, el
cumplimiento de los requerimientos de Seguridad (encriptación de
contraseñas) y Rendimiento
Documentación y Capacitación: Se incluye la entrega de manuales y la

capacitación al personal administrativo y a los distintos usuarios para una adopción

efectiva de las nuevas herramientas.

4. Estado de los Sistemas de Gestión.
En el ámbito de la digitalización y modernización de la gestión académica y de

idiomas, existen numerosas plataformas y sistemas tecnológicos que abordan las

necesidades de centros de estudio como el CEMI. A continuación, se analizan las

tendencias actuales y su relación con las características del presente proyecto.

Sistemas de Gestión Académica (LMS/ERP Educativo)

El mercado cuenta con plataformas de gestión integral ampliamente utilizadas,

como los sistemas ERP educativos (ej. SaaS especializados o sistemas de gestión

de aprendizaje (LMS) como Moodle, Google Classroom o Canvas.

· Estas soluciones ofrecen funcionalidades avanzadas, como la gestión de
aulas virtuales (Classroom), tareas, foros y registro de calificaciones.
· Sin embargo, su implementación suele requerir licencias costosas y, en el
caso de plataformas genéricas, pueden carecer de la flexibilidad
necesaria para integrar reglas de negocio específicas de un centro de
idiomas (ej. validaciones de pagos de cuotas y la estructura de niveles
académicos B1, B2, etc.). Esto representa una barrera para centros
pequeños que buscan una solución personalizada y económica.
Tendencias de Digitalización en Instituciones Educativas

Para instituciones de menor tamaño, la tendencia es buscar plataformas que

ofrezcan una gestión integral de los procesos administrativos (Dashboard) y

académicos (Classroom).

· Sistemas ERP modulares ofrecen alternativas para gestionar finanzas,
recursos humanos y reportes desde una única plataforma.
· No obstante, la solución más efectiva para centros con procesos
específicos es el desarrollo propio y a medida, lo que permite una
adaptación total a sus flujos de trabajo (ej. la aplicación estricta de las
reglas de no solapamiento de horarios) y reduce los costos de
implementación y mantenimiento.
Tecnologías Relevantes para el Proyecto

El proyecto CEMI Sistema Gestor se beneficia de las mejores prácticas observadas

en sistemas existentes, pero se diferencia por su enfoque en tecnologías modernas

y adaptadas a sus necesidades particulares.

· El uso de un stack robusto (Backend Node.js/Express.js, Base de Datos
MySQL, Front End con HTML5/CSS3) permite desarrollar un sistema de
gestión escalable y personalizado.
· El enfoque modular permite construir aplicaciones eficientes y fáciles de
mantener, integrando estándares de seguridad con bcrypt para la
encriptación de contraseñas.
Casos de Éxito Locales y Regionales

A nivel regional, muchos centros de estudio han optado por soluciones

personalizadas similares para enfrentar sus desafíos de digitalización. Estos

desarrollos a medida han permitido centralizar los datos, optimizar procesos

administrativos y cumplir con requisitos específicos del mercado local, logrando

eficiencias significativas en costos y tiempos operativos.

a) Análisis del mercado.

El mercado de sistemas de gestión para centros de idiomas y educación se

caracteriza por una amplia oferta de herramientas enfocadas en la optimización de

procesos académicos y la productividad.

· Grandes Plataformas: Existen soluciones internacionales robustas, pero
suelen ser costosas y orientadas a grandes instituciones, lo que limita su
accesibilidad.
· Sistemas ERP (Modulares): Ofrecen flexibilidad y capacidad de
personalización, ganando popularidad como una alternativa adaptable y
económica para instituciones medianas.
· Desarrollo Personalizado (A Medida): A nivel local, este enfoque es la
opción preferida por muchos centros. Permite una mayor alineación con
las necesidades específicas del centro (como la estructura de niveles y
tipos de pago) y garantiza que el sistema aplique sus propias reglas de
negocio críticas (solapamiento de horarios).
El proyecto CEMI Sistema Gestor se inserta en este contexto buscando combinar

las mejores prácticas del mercado con un enfoque personalizado. La

implementación del sistema no solo optimizará sus procesos internos (pagos,

matriculación, aulas) sino que también fortalecerá la calidad del servicio educativo,

facilitando el control y la transparencia para toda la comunidad académica.

5. Diagrama de Gantt
ID Tarea Responsable Duració
n (Días
Laborabl
es)
Fec
ha
de
Inici
o
Fec
ha
de
Fin
Depende
ncia (ID)
Fa
se
0
INICIO Y
VALIDACIÓ
N
Equipo/CEMI 29 Lun
13-
Oct
Vie
21-
Nov
N/A
0.1 HITO:
Reunión
Inicial (ID 1)
Equipo 0.00 Lun
13-
Oct
Lun
13-
Oct
N/A
0.2 Recolección
de
Información
y
Cuestionario
Equipo 28 Mar
14-
Oct
Jue
20-
Nov
0.
0.3 HITO:
Validación
de
Requerimie
ntos (100%
S)

Equipo/CEMI 1 Vie
21-
Nov
Vie
21-
Nov
0.
Fa
se
1

Configuraci
ón de
Arquitectur
a y BD
Backend/DB 2.50 Lun
24-
Nov
Mié
26-
Nov
0.
1.1 Diseño de la
Arquitectura
de la Base
de Datos
(7h)

Backend/DB 0.88 Lun
24-
Nov
Lun
24-
Nov
N/A
1.2 Desarrollo
de la Base
de Datos
(4h)

Backend/DB 0.50 Mar
25-
Nov
Mar
25-
Nov
1.
1.3 Configuració
n del
Entorno
Backend
(3h)

Backend 0.38 Mar
25-
Nov
Mar
25-
Nov
1.
1.4 Implementac
ión de
Seguridad
Básica (2h)

Backend 0.25 Mié
26-
Nov
Mié
26-
Nov
1.
1.5 Configuració
n de
Git/GitHub
(1h)

DevOps 0.13 Mié
26-
Nov
Mié
26-
Nov
1.
1.6 HITO:
Arquitectur
a Lista

0.00 Mié
26-
Nov
Mié
26-
Nov
1.
Fa
se
2

Interfaz de
Acceso y
Roles
Frontend/Bac
kend
1.13 Mié
26-
Nov
Jue
27-
Nov
1.
2.1 Diseño de
Interfaz de
Autenticació
n (2.5h)

Frontend 0.31 Mié
26-
Nov
Mié
26-
Nov
1.
2.2 Desarrollo
del Sistema
de
Autenticació
n (4.5h)

Backend/Fron
t
0.56 Jue
27-
Nov
Jue
27-
Nov
2.
2.3 HITO:
Autenticaci
ón
Funcional

0.00 Jue
27-
Nov
Jue
27-
Nov
2.
Fa
se
3

Dashboard
y Lógica de
Roles
Frontend 1.00 Vie
28-
Nov
Lun
01-
Dic
2.
3.1 Diseño y
desarrollo de
la
navegación
(3h)

Frontend 0.38 Vie
28-
Nov
Vie
28-
Nov
2.
3.2 Diseño de
Vistas y
Tablas (2h)

Frontend 0.25 Vie
28-
Nov
Vie
28-
Nov
3.
3.3 Implementac
ión de Roles
en la Interfaz
(2h)

Frontend 0.25 Lun
01-
Dic
Lun
01-
Dic
3.
3.4 Visualización
Inicial de
Datos
(Alumnos)
(2h)

Frontend 0.25 Lun
01-
Dic
Lun
01-
Dic
3.
Fa
se
4

Lógica
CRUD y
Reglas de
Negocio
Frontend/Bac
kend
3.88 Mar
02-
Dic
Lun
08-
Dic
3.
4.1 Desarrollo
de Endpoints
CRUD
Completo
(4h)

Backend 0.50 Mar
02-
Dic
Mar
02-
Dic
3.
4.2 Implementac
ión Regla:
Horarios (3h)

Backend 0.38 Mar
02-
Dic
Mar
02-
Dic
4.
4.3 Implementac
ión Regla:
Capacidad
(2h)

Backend 0.25 Mié
03-
Dic
Mié
03-
Dic
4.
4.4 Diseño y
Funcionalida
d de
Modales (3h)

Frontend 0.38 Mié
03-
Dic
Mié
03-
Dic
3.
4.5 Funcionalida
d
Agregar/Cre
ar (2h)

Frontend 0.25 Jue
04-
Dic
Jue
04-
Dic
4.
4.6 Funcionalida
d
Editar/Actual
izar (2h)

Frontend 0.25 Jue
04-
Dic
Jue
04-
Dic
4.
4.7 Funcionalida
d
Eliminar/Baj
a (1h)

Frontend 0.13 Vie
05-
Dic
Vie
05-
Dic
4.
4.8 Funcionalida
d Ver más
(Detalle) (1h)

Frontend 0.13 Vie
05-
Dic
Vie
05-
Dic
4.
4.9 Integración y
Pruebas
Iniciales
(Módulos
CRUD)

QA 1.00 Lun
08-
Dic
Lun
08-
Dic
4.3, 4.
Fa
se
5

Pagos,
Usabilidad
y
Despliegue
Frontend/Dev
Ops
3.50 Mar
09-
Dic
Vie
12-
Dic
4.
5.1 Diseño y
Creación del
Módulo de
Pagos (3h)

Frontend 0.38 Mar
09-
Dic
Mar
09-
Dic
4.
5.2 Consulta de
Estado de
Pagos (2h)

Frontend 0.25 Mar
09-
Dic
Mar
09-
Dic
5.
5.3 Diseño del
Encabezado
(Cerrar
Sesión) (1h)

Frontend 0.13 Mié
10-
Dic
Mié
10-
Dic
5.
5.4 Paginación y
Búsqueda
(2h)

Frontend 0.25 Mié
10-
Dic
Mié
10-
Dic
5.
5.5 Configuració
n de
Variables de

Backend 0.13 Jue
11-D
ic
Jue
11-D
ic
5.
Entorno
Final (1h)
5.6 Despliegue
en Entorno
de Pruebas

DevOps 1.00 Jue
11-D
ic
Jue
11-D
ic
5.
5.7 HITO:
Finalización
del
Desarrollo/
QA

QA 1.00 Vie
12-
Dic
Vie
12-
Dic
5.
Fa
se
6

Documenta
ción y
Capacitació
n
PM/Tutor 3.00 Lun
15-
Dic
Mié
17-
Dic
5.
6.1 Elaboración
de Manuales
de Usuario

Documentaci
ón
2.00 Lun
15-
Dic
Mar
16-
Dic
5.
6.2 Sesión de
Capacitación
al Personal

PM/Tutor 1.00 -Dic Mié
-Dic
6.
6.3 ENTREGA
FINAL DEL
PROYECTO

0.00 -Dic Mié
-Dic
6.
6) Actividades y Procesos Realizados
a) Descripción del proceso paso a paso.
b) Tiempo empleado en cada tarea.
Configuración de Arquitectura y Base de Datos (Fechas Estimadas)

Proceso Descripción del proceso Tiempo
empleado
Backend & Base de
Datos
(Arquitectura)
Diseño de la
Arquitectura de la
Base de Datos
Diseño de la estructura de la base
de datos relacional (MySQL) para las
entidades principales: Usuarios,
Perfiles, Alumnos, Cursos, Aulas,
Pagos Etc
7:
horas
Desarrollo de la
Base de Datos
Creación de la base de datos, las
tablas y la definición de las
relaciones 1:N y N:M (ej.
Alumnos-Cursos)
4:
horas
Configuración del
Entorno Backend
Configuración inicial del servidor
con Node.js y Express.js,
incluyendo variables de entorno y
3:
horas
conexión con la base de datos
(MySQL).
Implementación de
Seguridad Básica

Integración de la librería bcrypt para
la encriptación de contraseñas de
usuarios.
2:
horas
Frontend (Interfaz
de Acceso)

Diseño de Interfaz
de Autenticación

Creación de los prototipos visuales
para las pantallas de "Iniciar
Sesión" y "Recuperar Contraseña"
para los distintos roles.
2:
horas
Desarrollo del
Sistema de
Autenticación

Implementación de los formularios y
la lógica de inicio de sesión,
conectando el Frontend al Endpoint
de autenticación del Backend.
4:
horas
Tecnología &
Herramientas

Configuración de
Git/GitHub

Inicialización del repositorio y
configuración de las ramas de
trabajo para el control de versiones
del proyecto.
1:00 hora
Descripción del proceso

a) Diseño de la Arquitectura de la Base de Datos: Se identifican las entidades

clave (Alumnos, Profesores, Cursos, Aulas, Pagos, etc.) y se define el

Diagrama Entidad-Relación (DER) para garantizar que todas las reglas de

negocio, como la validación de solapamiento de horarios o la capacidad del

aula, puedan ser soportadas por la estructura de la base de datos.

b) Configuración del Entorno Backend: Se establece el stack tecnológico del

servidor (Node.js/Express.js) y se implementan las librerías iniciales de

seguridad y conexión, como bcrypt y el middleware para el manejo de las

rutas.

c) Desarrollo del Sistema de Autenticación: Se prioriza la creación de la

funcionalidad de acceso, permitiendo a los distintos perfiles de usuario

(Alumno, Profesor, Administrativo) iniciar sesión de forma segura y validar su

rol para la navegación futura del sistema.

d) Desarrollo de la Base de Datos: Se ejecuta el diseño del DER en MySQL,

creando las tablas y configurando las claves primarias y foráneas que

asegurarán la integridad de los datos, como la vinculación de cada alumno a

un curso y un perfil.

Diseño de Dashboard y Lógica de Roles (Fechas Estimadas)

Frontend Sistema de Gestión (Dashboard)

Proceso Descripción del proceso Tiempo
empleado
Diseño y
desarrollo de la
navegación
Implementación del menú lateral
(Aside) para la navegación entre los
módulos de gestión (Alumnos,
Cursos, Pagos, etc.) por rol
3:
horas
Diseño de Vistas y
Tablas
Creación del diseño base para los
paneles de gestión (ej. Panel de
Alumnos), definiendo filas, columnas
y alineación de botones de acción
(Ver más, Editar, Eliminar)
2:
horas
Implementación
de Roles en la
Interfaz
Desarrollo de la lógica en el Frontend
para mostrar u ocultar elementos del
menú y acciones específicas según el
perfil de usuario (Administrativo,
Profesor, Alumno)
2:
horas
Visualización
Inicial de Datos
(Alumnos)
Implementación de la visualización de
los datos de la tabla de Alumnos
consultando los endpoints del
Backend.
2:
horas
Enfoque:

El objetivo principal es establecer la base operativa del sistema. Se garantiza

que la comunicación Backend-Frontend funcione correctamente y que el

sistema pueda autenticar usuarios y determinar su nivel de acceso para

mostrarles la interfaz de gestión correspondiente.

Lógica CRUD y Seguridad Avanzada (Fechas Estimadas)

Frontend Sistema de Gestión (Funcionalidad)

Proceso Descripción del proceso Tiempo
empleado
Diseño y
Funcionalidad de
Modales
Implementación del diseño de las
ventanas modales para los
componentes Agregar, Editar, Ver más
y Eliminar en paneles clave (ej.
Alumnos y Cursos).
3:00 horas
Funcionalidad del
botón Agregar/Crear
Desarrollo de la lógica en el Frontend
para enviar la información de un
nuevo registro a través de los
Modales al Backend (ej. Nuevo
Alumno o Nuevo Curso).
2:00 horas
Funcionalidad del
botón
Editar/Actualizar
Desarrollo de la lógica para precargar
y enviar la información modificada de
un registro existente a través del
Modal.
2:00 horas
Funcionalidad del
botón Eliminar/Baja
Implementación de la funcionalidad
que permite a los usuarios con
permisos remover un registro (ej. baja
de un Alumno o Profesor).
1:00 hora
Funcionalidad del
botón Ver más
(Detalle)
Desarrollo de la lógica para cargar y
visualizar la información completa de
un registro en un Modal de detalle.
1:00 hora
Backend (Reglas de Negocio y Configuración)

Proceso Descripción del proceso Tiempo
empleado
Desarrollo de
Endpoints CRUD
Completo
Finalización y prueba de los endpoints
CRUD para los módulos de Alumnos,
Cursos, Profesores y Aulas.
4:00 horas
Implementación de
Regla de Negocio:
Horarios
Implementación de la lógica en el
Backend para validar solapamiento de
horarios al registrar un Curso o al
asignar un Profesor a un Curso.
3:00 horas
Implementación de
Regla de Negocio:
Capacidad
Implementación de la lógica para
validar que la cantidad de alumnos en
un curso no supere la capacidad del
Aula asignada.
2:00 horas
Configuración de
Variables de Entorno
Final
Creación y desarrollo final de las
variables de entorno para claves
secretas, credenciales de BD y otros
datos confidenciales.
1:00 hora
Usabilidad, Pagos y Despliegue (Fechas Estimadas)

Frontend Sistema de Gestión (Usabilidad y Funciones Especiales)

Proceso Descripción del proceso Tiempo
empleado
Diseño del Encabezado
del Sistema
Implementación de un encabezado
con el logo, mensaje de bienvenida
del usuario y el botón de "Cerrar
Sesión" para salir del sistema de
forma segura.
1:00 hora
Desarrollo y diseño de la
Paginación/Búsqueda
Implementación de un mecanismo de
paginación para manejar grandes
volúmenes de registros y desarrollo
de la funcionalidad de búsqueda en
los paneles de gestión (Alumnos,
Cursos, Pagos).
2:00 horas
Diseño y Creación del
Módulo de Pagos
Creación de la interfaz para Registrar
Pagos de alumnos, permitiendo
seleccionar Tipo (cuota, matrícula) y
Medio de Pago (efectivo, tarjeta,
transferencia).
3:00 horas
Consulta de Estado de
Pagos
Desarrollo del panel de Consulta de
Pagos para que el Alumno o
Administrativo pueda ver el historial
y estado de las cuotas.
2:00 horas
Backend (Servicios de Correo y Seguridad)

Proceso Descripción del proceso Tiempo
empleado
CORS
(Cross-Origin
Resource
Sharing)
Desarrollo de la configuración de CORS para
limitar el uso de las APIs y obtener mayor
seguridad en las peticiones web.
1:00 hora
Envíos de
Correos
Manejo de la funcionalidad de correo
electrónico para el envío de notificaciones
importantes (ej. confirmación de registro de
Alumno o recuperación de contraseña).
2:00 horas
Lógica de
Registro de
Pagos
Implementación de los endpoints para
registrar pagos, asegurando que se vinculen
correctamente al alumno y se validen con la
fecha.
2:00 horas
Diagrama Entidad Relación

DR (Parte 1 de 2)

DR (Parte 2 de 2)

Reglas de negocio para el sistema del CEMI

Usuarios y Perfiles
Cada usuario debe tener un único perfil (Alumno, Profesor,
Administrativo, Gestión).

Un alumno, profesor o administrativo no puede existir en el
sistema si no está vinculado a un usuario.

Las credenciales de usuario (nombre de usuario y
contraseña) deben ser únicas.

Alumnos
Un alumno debe estar registrado con un nombre completo,
DNI y datos de contacto válidos.

Un alumno puede estar inscrito en uno o más cursos, pero
no en el mismo curso dos veces.

Un alumno no puede inscribirse en dos cursos que se dicten
en el mismo horario.

Profesores
Cada profesor puede impartir uno o más cursos
Un profesor no puede impartir dos cursos diferentes en el

mismo horario.

Un profesor debe estar asignado a un aula con capacidad
suficiente para el número de alumnos del curso.

Administrativos
Los administrativos gestionan inscripciones, pagos
Un administrativo debe registrar todas las operaciones con
fecha y hora.

Cursos y Niveles
Los cursos están asociados a un nivel (ejemplo: B1, B2).
Cada curso debe tener un profesor asignado.
Cada curso debe tener un aula asignada y la cantidad
máxima de alumnos no debe superar la capacidad del aula.

Pagos
Todo alumno debe estar vinculado a uno o más pagos para
poder continuar en un curso.

Cada pago debe indicar el tipo de pago (cuota, matrícula,
examen, etc.) y el medio de pago (efectivo, tarjeta,

transferencia, etc.).

Un pago debe estar validado y registrado por un
administrativo.

Aulas
Cada aula debe tener una capacidad máxima definida.
No puede haber más alumnos inscritos en un curso que la
capacidad del aula asignada.

Un aula no puede estar asignada a dos cursos en el mismo
horario.

Comportamiento del sistema

El sistema del CEMI permitirá la gestión integral de alumnos,

cursos, profesores, pagos.

Los alumnos podrán registrarse, inscribirse a cursos,
consultar su estado de pagos

Los profesores podrán gestionar los cursos que dictan y
consultar la lista de alumnos inscritos.

Los administrativos podrán dar de alta/baja a alumnos,
registrar pagos, asignar aulas

El sistema validará restricciones como disponibilidad de
aulas, solapamiento de horarios y capacidad máxima de

alumnos.

Todos los usuarios tendrán acceso al sistema mediante un
perfil con permisos específicos.

Requerimientos funcionales

Son las funciones que el sistema debe cumplir obligatoriamente

Gestión de usuarios y perfiles

RF1: El sistema debe permitir registrar, modificar y eliminar usuarios.

RF2: El sistema debe asignar un perfil (alumno, profesor, administrativo, gestión) a

cada usuario.

Gestión de alumnos

RF3: El sistema debe permitir registrar y actualizar datos personales de los

alumnos.

RF4: El sistema debe permitir inscribir alumnos en cursos, verificando solapamiento

de horarios.

RF5: El sistema debe permitir consultar el historial académico del alumno.

Gestión de profesores

RF6: El sistema debe registrar y administrar la información de los profesores.

RF7: El sistema debe permitir asignar profesores a cursos.

RF8: El sistema debe validar que un profesor no tenga dos cursos en el mismo

horario.

Gestión de cursos y aulas

RF9: El sistema debe permitir crear, modificar y eliminar cursos.

RF10: El sistema debe asignar un aula y un nivel (B1, B2, etc.) a cada curso.

RF11: El sistema debe verificar que la cantidad de alumnos no supere la capacidad

del aula.

Gestión de pagos

RF12: El sistema debe registrar pagos de alumnos indicando tipo (cuota, matrícula,

examen) y medio (efectivo, tarjeta, transferencia).

RF13: El sistema debe validar que todo pago sea registrado por un administrativo.

RF14: El sistema debe permitir consultar el estado de pagos de cada alumno.

Requerimientos no funcionales

Son las características de calidad y restricciones que el sistema debe cumplir:

Rendimiento

RNF1: El sistema debe permitir al menos 50 usuarios conectados simultáneamente

sin pérdida de rendimiento.

Disponibilidad

RNF2: El sistema debe estar disponible el 95% del tiempo hábil de la facultad.

Seguridad

RNF3: El sistema debe encriptar las contraseñas de los usuarios.

RNF4: Solo los perfiles administrativos podrán modificar datos de pagos y

préstamos.

Usabilidad

RNF5: El sistema debe contar con una interfaz intuitiva y accesible para usuarios

con distintos perfiles.

Escalabilidad

RNF6: El sistema debe permitir agregar nuevos niveles, medios de pago o tipos de

cursos sin alterar la estructura principal.

Compatibilidad

RNF7: El sistema debe poder ejecutarse en navegadores modernos (Chrome,

Firefox, Edge).

Historias de Usuario del Sistema CEMI
HU1

Como alumno, quiero registrarme en el sistema para poder acceder a mis cursos.

Criterio de aceptacion: Debe requerir nombre completo, DNI y datos de contacto

válidos. / Debe crear un perfil de usuario único vinculado a la tabla Alumnos.

HU2

Como alumno, quiero inscribirme a un curso para poder asistir a clases.

Criterio de aceptación: Debe validar que el alumno no esté ya inscrito en ese

curso. / Debe validar que el curso no se dicte en el mismo horario que otro curso

inscrito. / Debe validar que la cantidad de alumnos no supere la capacidad del aula

asignada al curso.

HU N°3

Como alumno, quiero ver el listado de cursos disponibles para elegir el que más me

convenga.

Criterio de aceptación: Debe mostrar el nombre del curso, el profesor asignado y

el nivel (ej. B1, B2).

HU N°4

Como alumno, quiero ver mis horarios de clases para organizarme.

Criterio de aceptacion: Debe mostrar la hora y el aula asignada para cada curso

en el que estoy inscrito.

HU N°5

Como alumno, quiero pagar mi cuota desde el sistema para mantenerme activo en

el curso.

Criterio de aceptacion: Debe registrar el pago indicando el tipo (cuota, matrícula,

examen) y el medio de pago (efectivo, tarjeta, transferencia).

HU N°6

Como alumno, quiero consultar mi historial de pagos para tener un control de lo

abonado.

Criterio de aceptacion: Debe permitir ver el estado de todos mis pagos (validados).

HU N°7

Como alumno, quiero ver mis notas y avances en los cursos para seguir mi

progreso.

Criterio de aceptacion: Debe mostrar las calificaciones registradas por el profesor

en mis cursos.

Profesor

HU N°8

Como profesor, quiero registrar mis datos personales en el sistema para ser parte

de la academia.

Criterio de aceptacion: Debe crear un perfil de usuario único vinculado a la tabla

Profesores.

HU N°9

Como profesor, quiero ver qué cursos me asignaron para organizar mis clases.

Criterio de aceptacion: Debe listar todos los cursos que imparte y el aula asignada

a cada uno.

HU N°10

Como profesor, quiero consultar la lista de alumnos inscritos en mi curso para llevar

control de asistencia.

Criterio de aceptacion: Debe mostrar un listado completo y actualizado de los

alumnos vinculados a mi curso.

HU N°11

Como profesor, quiero recibir una notificación si dos cursos míos se superponen en

horario.

Criterio de aceptacion: El sistema debe validar y notificar si se infringe la regla de

no impartir dos cursos diferentes en el mismo horario.

HU N°12

Como profesor, quiero registrar notas o calificaciones de los alumnos para que ellos

puedan ver su desempeño.

Criterio de aceptacion: La carga de notas debe ser visible para el alumno

correspondiente y debe estar asociada al curso.

Administrativo

HU N°13

Como administrativo, quiero registrar nuevos alumnos en el sistema para que

puedan inscribirse en cursos.

Criterio de aceptacion: Debe permitir la carga de datos personales válidos

(nombre, DNI, contacto) y vincularlos a un perfil de usuario con rol Alumno.

HU N°14

Como administrativo, quiero dar de alta o baja a profesores en el sistema.

Criterio de aceptacion: Debe permitir modificar el estado de los profesores y

mantener el historial.

HU N°15

Como administrativo, quiero registrar cursos nuevos con su nivel y aula.

Criterio de aceptacion: Debe permitir crear el curso, asignarle un nivel (ej. B1, B2)

y un profesor obligatorio.

HU N°16

Como administrativo, quiero asignar aulas a cursos verificando que la capacidad sea

suficiente.

Criterio de aceptacion: El sistema debe impedir la asignación de un aula si su

capacidad máxima es inferior al número de alumnos inscritos en el curso.

HU N°17

Como administrativo, quiero registrar los pagos de alumnos para mantener las

cuentas actualizadas.

Criterio de aceptacion: El pago debe indicar el tipo (cuota, matrícula, examen) y el

medio utilizado. / El registro debe incluir la fecha y hora de la operación.

HU N°18

Como administrativo, quiero emitir comprobantes de pagos a los alumnos.

Criterio de aceptación: Debe generar un comprobante que refleje el tipo, monto y

medio de pago registrado.

Gestor del sistema (Administrador general/Perfil de

gestión)

HU N°19

Como gestor del sistema, quiero crear y administrar usuarios para dar acceso a

alumnos, profesores y administrativos.

Criterio de aceptacion: El nombre de usuario y la contraseña deben ser únicos y

deben ser encriptados para su almacenamiento.

HU N°20

Como gestor del sistema, quiero asignar perfiles (alumno, profesor, administrativo) a

los usuarios.

Criterio de aceptacion: Cada usuario debe tener un único perfil asignado.

HU N°21

Como gestor del sistema, quiero definir nuevos medios de pago para ampliar las

opciones.

Criterio de aceptacion: Debe permitir agregar nuevos registros a la tabla de

Medios de Pago sin alterar la estructura principal del sistema.

HU N°22

Como gestor del sistema, quiero definir tipos de pagos (matrícula, cuota, examen)

para organizar la contabilidad.

Criterio de aceptacion: Debe permitir agregar nuevos registros a la tabla de Tipos

de Pago.

HU N°23

Como gestor del sistema, quiero generar reportes de inscripciones, pagos.

Criterio de aceptacion: El sistema debe generar informes detallados y estadísticas

consultando los datos consolidados.

Alumno 8 historias

Profesor 5 historias

Administrativos 7 historias

Gestor del sistema 5 historias

CARPETA REALIZADA EN GESTIÓN DE DESARROLLO DE SOFTWARE
SOBRE PROYECTO DEL CEMI

GESTION DE DESARROLLO DE SOFTWARE (1).pdf
“portada de la carpeta de
gestion de desarrollo de
software”
Glosario de Términos - Sistema CEMI
A
Administrador
Usuario con permisos completos sobre el sistema, capaz de gestionar todos los
aspectos de la plataforma, usuarios, configuraciones y seguridad.

Alumno
Usuario del sistema que está inscrito en uno o más cursos, con acceso a contenido
educativo, tareas y seguimiento de su progreso académico.

Anuncio
Comunicación oficial publicada por un profesor dirigida a los alumnos de un curso
específico, que puede incluir información importante, recordatorios o materiales.

Aula Virtual (Classroom)
Espacio digital donde se desarrolla el proceso de enseñanza-aprendizaje,
incluyendo materiales, tareas, comunicaciones y evaluaciones.

Asistencia
Registro de la presencia o ausencia de un alumno en las clases, con estados:
presente, ausente, tardanza o justificado.

B
Backup
Copia de seguridad de la base de datos y archivos del sistema que se realiza
automáticamente para prevenir pérdida de información.

C
Calificación
Valor numérico asignado al desempeño de un alumno en evaluaciones, tareas o
exámenes dentro de un curso.

Capacidad de Aula
Número máximo de alumnos que pueden estar inscritos en un curso, determinado
por el espacio físico o virtual disponible.

Chat de Classroom
Sistema de mensajería interna que permite la comunicación entre alumnos y
profesores dentro de un curso específico.

Chat de Soporte
Sistema de mensajería para consultas técnicas y de funcionamiento del sistema,
disponible para todos los usuarios.

Comprobante de Pago
Documento digital que certifica la realización de un pago, generado
automáticamente por el sistema.

Concepto de Pago
Tipo de obligación económica (matrícula, cuota mensual, examen, etc.) que un
alumno debe cancelar.

Curso
Estructura académica que agrupa alumnos, profesores y contenidos específicos de
un idioma y nivel determinado.

D
Dashboard
Panel de control principal que muestra información resumida y acceso rápido a las
funcionalidades del sistema según el perfil del usuario.

DNI
Documento Nacional de Identidad, utilizado como identificador único de las
personas en el sistema.

E
Encuesta
Herramienta de consulta creada por profesores para recoger opiniones o
información de los alumnos sobre temas específicos del curso.

Entrega de Tarea
Envío por parte del alumno de trabajos, ejercicios o actividades asignadas por el
profesor, a través de la plataforma.

Estado de Pago
Situación actual de una obligación económica: pendiente, pagado o en mora.

F
Fecha Límite
Último día y hora permitidos para la entrega de una tarea o actividad sin
penalización.

H
Historial Académico
Registro completo del progreso, calificaciones y cursos tomados por un alumno
durante su tiempo en la institución.

Horario
Distribución temporal de las clases de un curso, especificando días y horarios de
encuentro.

I
Idioma
Lengua específica que se enseña en los cursos (Inglés, Francés, Japonés, Alemán,
Italiano, Portugués).

Inscripción
Proceso mediante el cual un alumno se matricula formalmente en un curso
específico.

L
Legajo
Identificador único asignado a cada alumno en el sistema, utilizado para fines
administrativos y de seguimiento.

M
Matrícula
Pago inicial que realiza un alumno para formalizar su inscripción en la institución.

Medio de Pago
Forma en que se realiza un pago: efectivo, transferencia bancaria o tarjeta de
crédito.

Mora
Estado de un pago que ha excedido su fecha de vencimiento sin haber sido
cancelado.

N
Nivel
Grado de dificultad o etapa de aprendizaje dentro de un idioma (A1, A2, B1, B2,
etc.).

Notificación
Alerta o aviso del sistema informando sobre eventos relevantes para el usuario
(nuevas tareas, anuncios, recordatorios, etc.).

P
Password Hash
Contraseña encriptada almacenada en la base de datos para garantizar la
seguridad de las credenciales de acceso.

Perfil
Conjunto de permisos y funcionalidades asignadas a un tipo de usuario (alumno,
profesor, administrativo, administrador).

Periodo de Pago
Intervalo de tiempo (generalmente mensual) al que corresponde una cuota
específica, identificado con el formato YYYY-MM.

Profesor
Usuario del sistema responsable de impartir uno o más cursos, con capacidad para
gestionar contenido, evaluar alumnos y comunicarse con ellos.

R
Reporte
Documento generado por el sistema que consolida información específica para
análisis o toma de decisiones (académico, financiero, estadístico).

Responsive Design
Característica del sistema que permite una visualización y funcionalidad óptima en
diferentes dispositivos (computadoras, tablets, móviles).

S
Sistema de Gestión Académica
Plataforma integral diseñada para administrar todos los aspectos relacionados con
la educación en una institución.

Solapamiento de Horarios
Conflicto que ocurre cuando un alumno o profesor tiene asignados dos cursos en el
mismo horario.

Soporte Técnico
Servicio de asistencia para resolver problemas técnicos relacionados con el uso del
sistema.

T
Tarea
Actividad asignada por un profesor a los alumnos de un curso, con objetivos
específicos y fecha de entrega definida.

Tipo de Usuario
Clasificación que determina las funcionalidades a las que puede acceder un
usuario en el sistema.

U
Usuario
Persona registrada en el sistema con credenciales de acceso únicas y un perfil
específico que determina sus permisos.

Usuario Administrativo
Persona del staff administrativo responsable de gestionar inscripciones, pagos y
operaciones del día a día de la institución.

V
Vencimiento de Pago
Fecha límite establecida para el pago de una cuota o obligación económica antes
de incurrir en mora.

Términos Técnicos
API
Interfaz de programación de aplicaciones que permite la comunicación entre
diferentes componentes del sistema.

Base de Datos
Sistema de almacenamiento estructurado donde se guarda toda la información del
sistema CEMI.

Encriptación
Proceso de codificación de información sensible (como contraseñas) para
protegerla contra accesos no autorizados.

Frontend
Parte del sistema con la que interactúan directamente los usuarios (interfaces,
pantallas, formularios).

Backend
Parte del sistema que procesa la lógica de negocio, accede a la base de datos y
gestiona las operaciones.

Middleware
Componente software que actúa como intermediario entre diferentes partes del
sistema.

Query
Consulta específica a la base de datos para obtener, insertar, actualizar o eliminar
información.

Session
Período de tiempo durante el cual un usuario mantiene activa su conexión con el
sistema después de autenticarse.

Token
Elemento de seguridad utilizado para verificar la identidad del usuario durante su
sesión activa.

UID (Unique Identifier)
Identificador único asignado a cada registro en la base de datos para garantizar su
singularidad.

Estados del Sistema
Activo/Inactivo
Estado que indica si un usuario, curso o recurso está disponible para su uso en el
sistema.

Pagado/Pendiente/Mora
Estados posibles de un pago dentro del sistema financiero.

Presente/Ausente/Tardanza/Justificado
Estados posibles de una asistencia registrada.

Publicado/Borrador
Estados posibles de un anuncio, tarea o contenido educativo.