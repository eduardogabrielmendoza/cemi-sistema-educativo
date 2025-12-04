import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "cemi_secret_key_cambiar_en_produccion";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

export function generarToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ 
      success: false, 
      message: "Acceso denegado. Token no proporcionado." 
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ 
        success: false, 
        message: "Token expirado. Inicie sesión nuevamente.",
        expired: true
      });
    }
    return res.status(401).json({ 
      success: false, 
      message: "Token inválido." 
    });
  }
}

export function verificarRol(rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ 
        success: false, 
        message: "No autenticado." 
      });
    }

    const rolUsuario = req.usuario.rol?.toLowerCase();
    const rolesNormalizados = rolesPermitidos.map(r => r.toLowerCase());
    
    if (rolUsuario === "admin") {
      return next();
    }

    if (rolUsuario === "administrador" && rolesNormalizados.includes("admin")) {
      return next();
    }

    if (!rolesNormalizados.includes(rolUsuario)) {
      return res.status(403).json({ 
        success: false, 
        message: "No tiene permisos para realizar esta acción." 
      });
    }

    next();
  };
}

export function verificarPropietarioOAdmin(campoId) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ 
        success: false, 
        message: "No autenticado." 
      });
    }

    const rolUsuario = req.usuario.rol?.toLowerCase();
    
    if (rolUsuario === "admin" || rolUsuario === "administrador") {
      return next();
    }

    const idSolicitado = parseInt(req.params[campoId] || req.params.id);
    const idUsuario = req.usuario[campoId];

    if (idUsuario && idUsuario === idSolicitado) {
      return next();
    }

    return res.status(403).json({ 
      success: false, 
      message: "No tiene permisos para acceder a este recurso." 
    });
  };
}

export { JWT_SECRET, JWT_EXPIRES_IN };
