import express from 'express';
const router = express.Router();

// GET - Obtener contraseña de cobranzas
router.get('/cobranzas-password', (req, res) => {
  try {
    const password = process.env.COBRANZAS_PASSWORD || 'tesoreria';
    res.json({ password });
  } catch (error) {
    console.error('Error al obtener password de cobranzas:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener configuración' 
    });
  }
});

export default router;
