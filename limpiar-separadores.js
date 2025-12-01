import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROYECTO_FINAL_ROOT = path.join(__dirname, '..');

const DIRECTORIOS_A_LIMPIAR = [
  path.join(PROYECTO_FINAL_ROOT, 'Proyecto Final - Railway'),
  path.join(PROYECTO_FINAL_ROOT, 'Proyecto Final - LocalHost'),
  path.join(PROYECTO_FINAL_ROOT, 'Aplicacion Movil')
];

const EXTENSIONES_PERMITIDAS = ['.js', '.html', '.css'];

function esSeparadorDecorativo(linea) {
  const trimmed = linea.trim();
  
  if (trimmed === '') return false;
  
  if (linea.includes('http://') || linea.includes('https://') || 
      linea.includes('ws://') || linea.includes('wss://')) {
    return false;
  }
  
  const patrones = [
    /^\/\/\s*={5,}\s*$/,
    /^\/\*\s*={5,}\s*\*\/$/,
    /^<!--\s*={5,}\s*-->$/,
    /^--\s*={5,}\s*$/,
    /^\/\/\s*-{5,}\s*$/,
    /^\/\*\s*-{5,}\s*\*\/$/,
  ];
  
  return patrones.some(patron => patron.test(trimmed));
}

function limpiarArchivo(rutaArchivo) {
  const extension = path.extname(rutaArchivo);
  
  if (!EXTENSIONES_PERMITIDAS.includes(extension)) {
    return { procesado: false };
  }
  
  try {
    const contenido = fs.readFileSync(rutaArchivo, 'utf8');
    const lineas = contenido.split('\n');
    
    let lineasLimpias = [];
    let lineasEliminadas = 0;
    
    for (let i = 0; i < lineas.length; i++) {
      let linea = lineas[i];
      
      if (esSeparadorDecorativo(linea)) {
        lineasEliminadas++;
        continue;
      }
      
      lineasLimpias.push(linea);
    }
    
    if (lineasEliminadas > 0) {
      const contenidoLimpio = lineasLimpias.join('\n');
      fs.writeFileSync(rutaArchivo, contenidoLimpio, 'utf8');
    }
    
    return {
      procesado: true,
      lineasEliminadas,
      lineasOriginales: lineas.length,
      lineasFinales: lineasLimpias.length
    };
    
  } catch (error) {
    console.error(`Error procesando ${rutaArchivo}:`, error.message);
    return { procesado: false, error: error.message };
  }
}

function recorrerDirectorio(directorio) {
  const resultados = {
    archivos: 0,
    lineasEliminadas: 0,
    errores: 0
  };
  
  function recorrer(dir) {
    const elementos = fs.readdirSync(dir);
    
    for (const elemento of elementos) {
      const rutaCompleta = path.join(dir, elemento);
      const stats = fs.statSync(rutaCompleta);
      
      if (stats.isDirectory()) {
        if (elemento === 'node_modules' || elemento === '.git' || 
            elemento === 'uploads' || elemento === 'downloads' ||
            elemento === 'build' || elemento === 'dist' || 
            elemento === 'android' || elemento === 'gradle') {
          continue;
        }
        recorrer(rutaCompleta);
      } else if (stats.isFile()) {
        const resultado = limpiarArchivo(rutaCompleta);
        
        if (resultado.procesado) {
          resultados.archivos++;
          resultados.lineasEliminadas += resultado.lineasEliminadas || 0;
          
          if (resultado.lineasEliminadas > 0) {
            console.log(`${path.relative(__dirname, rutaCompleta)}: ${resultado.lineasEliminadas} separadores eliminados`);
          }
        } else if (resultado.error) {
          resultados.errores++;
        }
      }
    }
  }
  
  recorrer(directorio);
  return resultados;
}

console.log('Limpiando separadores decorativos...\n');

const resultadosGlobales = {
  archivos: 0,
  lineasEliminadas: 0,
  errores: 0
};

for (const directorio of DIRECTORIOS_A_LIMPIAR) {
  if (!fs.existsSync(directorio)) {
    console.log(`Directorio no encontrado: ${path.relative(PROYECTO_FINAL_ROOT, directorio)}\n`);
    continue;
  }
  
  console.log(`Procesando: ${path.relative(PROYECTO_FINAL_ROOT, directorio)}\n`);
  const resultados = recorrerDirectorio(directorio);
  
  resultadosGlobales.archivos += resultados.archivos;
  resultadosGlobales.lineasEliminadas += resultados.lineasEliminadas;
  resultadosGlobales.errores += resultados.errores;
}

console.log('\nRESUMEN FINAL\n');
console.log(`Archivos procesados: ${resultadosGlobales.archivos}`);
console.log(`Separadores eliminados: ${resultadosGlobales.lineasEliminadas}`);
console.log(`Errores: ${resultadosGlobales.errores}`);
console.log('\nLIMPIEZA COMPLETADA\n');


