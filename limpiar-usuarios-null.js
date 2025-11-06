// Verificar y limpiar conversaciones con id_usuario null en Railway
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'mainline.proxy.rlwy.net',
  port: 25836,
  user: 'root',
  password: 'atQKukcWRVWyllGqIJKWjahbMpsaeZPt',
  database: 'railway',
  waitForConnections: true,
  connectionLimit: 10
});

async function limpiarYVerificar() {
  try {
    console.log('🔍 Verificando conversaciones problemáticas...\n');
    
    // Ver conversaciones con id_usuario NULL
    const [conversacionesNull] = await pool.query(`
      SELECT 
        c.id_conversacion,
        c.tipo_usuario,
        c.id_usuario,
        c.fecha_inicio,
        (SELECT nombre_remitente FROM chat_mensajes 
         WHERE id_conversacion = c.id_conversacion 
         ORDER BY fecha_envio ASC LIMIT 1) as primer_mensaje_de
      FROM chat_conversaciones c
      WHERE c.id_usuario IS NULL AND c.tipo_usuario != 'invitado'
      ORDER BY c.fecha_inicio DESC
    `);
    
    console.log(`📋 Conversaciones con id_usuario NULL: ${conversacionesNull.length}\n`);
    
    if (conversacionesNull.length > 0) {
      conversacionesNull.forEach(conv => {
        console.log(`ID ${conv.id_conversacion}: ${conv.tipo_usuario} - Primer mensaje de: ${conv.primer_mensaje_de}`);
      });
      
      const idsAEliminar = conversacionesNull.map(c => c.id_conversacion);
      
      console.log(`\n🗑️ Eliminando ${idsAEliminar.length} conversaciones duplicadas...\n`);
      
      // Eliminar mensajes
      await pool.query(`DELETE FROM chat_mensajes WHERE id_conversacion IN (?)`, [idsAEliminar]);
      console.log('✅ Mensajes eliminados');
      
      // Eliminar estadísticas
      await pool.query(`DELETE FROM chat_estadisticas WHERE id_conversacion IN (?)`, [idsAEliminar]);
      console.log('✅ Estadísticas eliminadas');
      
      // Eliminar conversaciones
      await pool.query(`DELETE FROM chat_conversaciones WHERE id_conversacion IN (?)`, [idsAEliminar]);
      console.log('✅ Conversaciones eliminadas\n');
    }
    
    // Ver estado actual
    console.log('📋 Conversaciones actuales:\n');
    const [actuales] = await pool.query(`
      SELECT 
        c.id_conversacion,
        c.tipo_usuario,
        c.id_usuario,
        CASE
          WHEN c.id_usuario IS NOT NULL THEN CONCAT(p.nombre, ' ', p.apellido)
          ELSE c.nombre_invitado
        END as nombre_usuario,
        c.estado
      FROM chat_conversaciones c
      LEFT JOIN usuarios u ON c.id_usuario = u.id_usuario
      LEFT JOIN personas p ON u.id_persona = p.id_persona
      ORDER BY c.ultima_actividad DESC
      LIMIT 10
    `);
    
    actuales.forEach(conv => {
      console.log(`${conv.id_conversacion}. ${conv.nombre_usuario || 'SIN NOMBRE'} (${conv.tipo_usuario}) - id_usuario: ${conv.id_usuario || 'NULL'}`);
    });
    
    console.log('\n✅ Limpieza completada');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

limpiarYVerificar();
