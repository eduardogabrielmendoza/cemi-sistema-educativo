import pool from './backend/utils/db.js';

async function verificarCuotasGuardadas() {
  try {
    console.log('Consultando cuotas guardadas en la base de datos...\n');
    
    const [cursos] = await pool.query(`
      SELECT id_curso, nombre_curso, cuotas_habilitadas
      FROM cursos
      ORDER BY id_curso
    `);
    
    console.log('ID | Curso | Cuotas Habilitadas');
    console.log('---'.repeat(30));
    
    cursos.forEach(curso => {
      let cuotas = 'NULL (todas habilitadas)';
      
      if (curso.cuotas_habilitadas) {
        try {
          const parsed = JSON.parse(curso.cuotas_habilitadas);
          cuotas = `${parsed.length} cuotas: [${parsed.join(', ')}]`;
        } catch (e) {
          cuotas = `ERROR PARSEANDO: ${curso.cuotas_habilitadas}`;
        }
      }
      
      console.log(`${curso.id_curso} | ${curso.nombre_curso} | ${cuotas}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

verificarCuotasGuardadas();


