
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import pool from "./backend/utils/db.js";

import authRoutes from "./backend/routes/auth.js";
import alumnosRoutes from "./backend/routes/alumnos.js";
import profesoresRoutes from "./backend/routes/profesores.js";
import administradoresRoutes from "./backend/routes/administradores.js";
import cursosRoutes from "./backend/routes/cursos.js";
import pagosRoutes from "./backend/routes/pagos.js";
import idiomasRoutes from "./backend/routes/idiomas.js";
import aulasRoutes from "./backend/routes/aulas.js";
import nivelesRoutes from "./backend/routes/niveles.js";
import inscripcionesRoutes from "./backend/routes/inscripciones.js";
import calificacionesRoutes from "./backend/routes/calificaciones.js";
import asistenciasRoutes from "./backend/routes/asistencias.js";
import statsRoutes from "./backend/routes/stats.js";
import classroomRoutes from "./backend/routes/classroom.js";
import perfilClassroomRoutes from "./backend/routes/perfil-classroom.js";
import notificacionesRoutes from "./backend/routes/notificaciones.js";
import chatRoutes, { setChatServer } from "./backend/routes/chat.js";
import configRoutes from "./backend/routes/config.js";
import ChatServer from "./backend/utils/chat-server.js";
import http from "http";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://unpkg.com", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com", "https://unpkg.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "ws:", "wss:", "https://unpkg.com", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com", "http://localhost:3000", "ws://localhost:3000"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  }
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Formato corto para desarrollo
} else {
  app.use(morgan('combined')); // Formato completo para producción
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 1000, // Aumentado a 1000 requests por IP
  message: 'Demasiadas peticiones desde esta IP, por favor intente más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return req.path.startsWith('/api/chat');
  }
});
app.use('/api/', limiter);

const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:3000',
  'https://cemi-sistema-educativo-production.up.railway.app',
  'https://cemi-sistema-educativo-production-2239.up.railway.app',
  'https://cemi.up.railway.app',
  process.env.FRONTEND_URL,
  process.env.RAILWAY_STATIC_URL,
  process.env.RAILWAY_PUBLIC_DOMAIN
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.some(allowed => origin.includes(allowed))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
  }
  next();
});

app.use('/uploads', express.static('uploads'));

app.use('/assets', express.static('frontend/assets'));

app.use('/downloads', express.static('frontend/downloads', {
  setHeaders: (res, path) => {
    if (path.endsWith('.apk')) {
      res.setHeader('Content-Type', 'application/vnd.android.package-archive');
      res.setHeader('Content-Disposition', 'attachment; filename="cemi-app-v1.2.apk"');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
}));

app.use(express.static('frontend'));

const verificarConexion = async () => {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log(" Conexión con MySQL establecida correctamente.");
  } catch (error) {
    console.error(" Error al conectar con MySQL:", error.message);
  }
};
verificarConexion();


app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "ok", 
    message: "CEMI API is running",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/alumnos", alumnosRoutes);
app.use("/api/profesores", profesoresRoutes);
app.use("/api/administradores", administradoresRoutes);
app.use("/api/cursos", cursosRoutes);
app.use("/api/pagos", pagosRoutes);
app.use("/api/idiomas", idiomasRoutes);
app.use("/api/aulas", aulasRoutes);
app.use("/api/niveles", nivelesRoutes);
app.use("/api/inscripciones", inscripcionesRoutes);
app.use("/api/calificaciones", calificacionesRoutes);
app.use("/api/asistencias", asistenciasRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/classroom", classroomRoutes);
app.use("/api/classroom", perfilClassroomRoutes);
app.use("/api/notificaciones", notificacionesRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/config", configRoutes);

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "frontend" });
});

const server = http.createServer(app);

const chatServer = new ChatServer(server);

setChatServer(chatServer);

server.listen(PORT, () => {
  console.log(` Servidor HTTP activo en http://localhost:${PORT}`);
  console.log(` Servidor WebSocket de Chat activo en ws://localhost:${PORT}/chat`);
  console.log(` Estado del chat:`, chatServer.getStats());
});
