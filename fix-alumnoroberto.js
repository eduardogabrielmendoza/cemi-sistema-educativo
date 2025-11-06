// Verificar qué pasó con alumnoroberto
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

async function verificarAlumnoRoberto() {
  try {
    console.log('🔍 Verificando alumnoroberto...\n');
    
    // 1. Buscar en usuarios
    console.log('📋 En tabla usuarios:\n');
    const [enUsuarios] = await pool.query(`
      SELECT * FROM usuarios WHERE username = 'alumnoroberto'
    `);
    
    if (enUsuarios.length > 0) {
      console.log('✅ Encontrado en usuarios:');
      console.log(enUsuarios[0]);
      console.log('');
      
      const id_persona = enUsuarios[0].id_persona;
      
      // 2. Buscar en personas
      console.log('📋 En tabla personas:\n');
      const [enPersonas] = await pool.query(`
        SELECT * FROM personas WHERE id_persona = ?
      `, [id_persona]);
      
      if (enPersonas.length > 0) {
        console.log('✅ Encontrado en personas:');
        console.log(enPersonas[0]);
        console.log('');
      }
      
      // 3. Buscar en alumnos
      console.log('📋 En tabla alumnos:\n');
      const [enAlumnos] = await pool.query(`
        SELECT * FROM alumnos WHERE id_persona = ?
      `, [id_persona]);
      
      if (enAlumnos.length > 0) {
        console.log('✅ Encontrado en alumnos:');
        console.log(enAlumnos[0]);
        console.log('');
      } else {
        console.log('❌ NO encontrado en alumnos\n');
      }
      
      // 4. Sincronizar alumno
      console.log('🔧 Sincronizando datos de alumnoroberto...\n');
      
      if (enAlumnos.length > 0) {
        // Actualizar columnas usuario y password_hash en alumnos
        const [updateResult] = await pool.query(`
          UPDATE alumnos 
          SET usuario = ?, password_hash = ?
          WHERE id_persona = ?
        `, [enUsuarios[0].username, enUsuarios[0].password_hash, id_persona]);
        
        console.log(`✅ Alumno actualizado (${updateResult.affectedRows} filas)`);
        
        // Actualizar id_alumno en usuarios
        const [updateUsuarios] = await pool.query(`
          UPDATE usuarios
          SET id_alumno = ?
          WHERE id_persona = ?
        `, [enAlumnos[0].id_alumno, id_persona]);
        
        console.log(`✅ Usuario actualizado con id_alumno (${updateUsuarios.affectedRows} filas)\n`);
      }
      
      // 5. Verificar que quedó bien
      console.log('🔍 Verificación final:\n');
      const [verificacion] = await pool.query(`
        SELECT 
          a.id_alumno,
          a.usuario,
          a.legajo,
          CONCAT(p.nombre, ' ', p.apellido) as nombre_completo,
          u.id_usuario
        FROM alumnos a
        JOIN personas p ON a.id_persona = p.id_persona
        LEFT JOIN usuarios u ON u.id_persona = a.id_persona
        WHERE a.id_persona = ?
      `, [id_persona]);
      
      if (verificacion.length > 0) {
        console.log('Estado final:');
        console.log(verificacion[0]);
      }
      
    } else {
      console.log('❌ NO encontrado en tabla usuarios\n');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

verificarAlumnoRoberto();
