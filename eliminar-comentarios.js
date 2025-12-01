
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PROYECTO_FINAL_ROOT = path.join(__dirname, '..');

const DIRECTORIOS_A_LIMPIAR = [
  path.join(PROYECTO_FINAL_ROOT, 'Proyecto Final - Railway'),
  path.join(PROYECTO_FINAL_ROOT, 'Proyecto Final - LocalHost'),
  path.join(PROYECTO_FINAL_ROOT, 'Aplicacion Movil'),
  path.join(PROYECTO_FINAL_ROOT, 'Misc'),
  path.join(PROYECTO_FINAL_ROOT, 'Proyecto Final Beta'),
  path.join(PROYECTO_FINAL_ROOT, 'Proyecto Final V2'),
  path.join(PROYECTO_FINAL_ROOT, 'Workbench Databases')
];

const EXTENSIONES_PERMITIDAS = ['.js', '.html', '.css', '.sql', '.json', '.md', '.bat', '.toml'];

const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;


function esLineaComentarioCompleto(linea, extension) {
  const trimmed = linea.trim();
  
  if (trimmed === '') return false;
  
  if (linea.includes('http://') || linea.includes('https://') || 
      linea.includes('ws://') || linea.includes('wss://') ||
      linea.includes('://')) {
    return false;
  }
  
  if (trimmed.includes('=') || trimmed.includes('import ') || 
      trimmed.includes('export ') || trimmed.includes('require(') ||
      trimmed.includes('const ') || trimmed.includes('let ') || 
      trimmed.includes('var ') || trimmed.includes('function ')) {
    return false;
  }
  
  if (/^\/\/\s*[=\-_*#+]{3,}\s*$/.test(trimmed)) {
    return true;
  }
  
  if (/^\/\*\s*[=\-_*#+]{3,}\s*\*?\/?$/.test(trimmed)) {
    return true;
  }
  
  if (/^<!--\s*[=\-_*#+]{3,}\s*-->?$/.test(trimmed)) {
    return true;
  }
  
  if (/^--\s*[=\-_*#+]{3,}\s*$/.test(trimmed)) {
    return true;
  }
  
  if (extension === '.json') {
    return false;
  }
  
  switch (extension) {
    case '.js':
    case '.ts':
    case '.jsx':
    case '.tsx':
      if (trimmed.startsWith('//')) {
        return true;
      }
      
      if (trimmed.startsWith('/*') || trimmed.startsWith('*/') || trimmed === '*') {
        return true;
      }
      
      if (trimmed.startsWith('*') && !trimmed.startsWith('*/')) {
        return true;
      }
      break;
      
    case '.html':
      if (trimmed.startsWith('<!--')) {
        return true;
      }
      if (trimmed === '-->') {
        return true;
      }
      break;
      
    case '.css':
      if (trimmed.startsWith('/*') || trimmed.startsWith('*/') || trimmed === '*') {
        return true;
      }
      break;
      
    case '.sql':
      if (trimmed.startsWith('--')) {
        return true;
      }
      if (trimmed.startsWith('/*') || trimmed.startsWith('*/')) {
        return true;
      }
      break;
      
    case '.bat':
      if (trimmed.startsWith('REM ') || trimmed.startsWith('rem ') || trimmed.startsWith('::')) {
        return true;
      }
      break;
      
    case '.md':
      return false;
  }
  
  return false;
}

function eliminarEmojis(texto) {
  return texto.replace(EMOJI_REGEX, '');
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
    let enBloqueComentario = false;
    let lineasEliminadas = 0;
    let emojisEliminados = 0;
    
    for (let i = 0; i < lineas.length; i++) {
      let linea = lineas[i];
      const trimmed = linea.trim();
      
      if ((extension === '.js' || extension === '.css') && trimmed.startsWith('/*')) {
        enBloqueComentario = true;
        lineasEliminadas++;
        
        if (trimmed.includes('*/')) {
          enBloqueComentario = false;
        }
        continue;
      }
      
      if (enBloqueComentario) {
        lineasEliminadas++;
        if (trimmed.includes('*/') || trimmed.startsWith('*/')) {
          enBloqueComentario = false;
        }
        continue;
      }
      
      if (esLineaComentarioCompleto(linea, extension)) {
        lineasEliminadas++;
        continue;
      }
      
      const lineaSinEmojis = eliminarEmojis(linea);
      if (lineaSinEmojis !== linea) {
        emojisEliminados++;
      }
      
      lineasLimpias.push(lineaSinEmojis);
    }
    
    const contenidoLimpio = lineasLimpias.join('\n');
    fs.writeFileSync(rutaArchivo, contenidoLimpio, 'utf8');
    
    return {
      procesado: true,
      lineasEliminadas,
      emojisEliminados,
      lineasOriginales: lineas.length,
      lineasFinales: lineasLimpias.length
    };
    
  } catch (error) {
    console.error(` Error procesando ${rutaArchivo}:`, error.message);
    return { procesado: false, error: error.message };
  }
}

function recorrerDirectorio(directorio) {
  const resultados = {
    archivos: 0,
    lineasEliminadas: 0,
    emojisEliminados: 0,
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
            elemento === 'android' || elemento === 'gradle' ||
            elemento === '.vscode' || elemento === '.idea') {
          continue;
        }
        recorrer(rutaCompleta);
      } else if (stats.isFile()) {
        const resultado = limpiarArchivo(rutaCompleta);
        
        if (resultado.procesado) {
          resultados.archivos++;
          resultados.lineasEliminadas += resultado.lineasEliminadas || 0;
          resultados.emojisEliminados += resultado.emojisEliminados || 0;
          
          if (resultado.lineasEliminadas > 0 || resultado.emojisEliminados > 0) {
            console.log(` ${path.relative(__dirname, rutaCompleta)}`);
            console.log(`    Líneas: ${resultado.lineasOriginales} → ${resultado.lineasFinales} (${resultado.lineasEliminadas} eliminadas)`);
            if (resultado.emojisEliminados > 0) {
              console.log(`    Emojis eliminados: ${resultado.emojisEliminados}`);
            }
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


console.log(' INICIANDO LIMPIEZA INTELIGENTE DE COMENTARIOS Y EMOJIS\n');
console.log(' RAÍZ: Proyecto Final (TODAS las carpetas)\n');
console.log(' Directorios a procesar:');
DIRECTORIOS_A_LIMPIAR.forEach(dir => {
  const relativePath = path.relative(PROYECTO_FINAL_ROOT, dir);
  console.log(`   - ${relativePath || path.basename(dir)}`);
});
console.log(`\n Extensiones: ${EXTENSIONES_PERMITIDAS.join(', ')}\n`);
console.log('️  PRESERVANDO:\n');
console.log('    URLs (http://, https://, ws://, wss://)');
console.log('    Código funcional (import, const, let, var, function)');
console.log('    Archivos JSON completos');
console.log('    Archivos Markdown (.md)');
console.log('    Estructura y formato\n');
console.log(' IGNORANDO:\n');
console.log('   - node_modules, .git, uploads, downloads');
console.log('   - build, dist, android, gradle\n');
console.log('═'.repeat(60));
console.log('');

const resultadosGlobales = {
  archivos: 0,
  lineasEliminadas: 0,
  emojisEliminados: 0,
  errores: 0
};

for (const directorio of DIRECTORIOS_A_LIMPIAR) {
  if (!fs.existsSync(directorio)) {
    console.log(`️  Directorio no encontrado: ${path.relative(__dirname, directorio)}\n`);
    continue;
  }
  
  console.log(`\n Procesando: ${path.relative(__dirname, directorio)}\n`);
  const resultados = recorrerDirectorio(directorio);
  
  resultadosGlobales.archivos += resultados.archivos;
  resultadosGlobales.lineasEliminadas += resultados.lineasEliminadas;
  resultadosGlobales.emojisEliminados += resultados.emojisEliminados;
  resultadosGlobales.errores += resultados.errores;
}

console.log('\n' + '═'.repeat(60));
console.log('\n RESUMEN FINAL\n');
console.log(` Archivos procesados: ${resultadosGlobales.archivos}`);
console.log(`️  Líneas de comentarios eliminadas: ${resultadosGlobales.lineasEliminadas}`);
console.log(` Emojis eliminados: ${resultadosGlobales.emojisEliminados}`);
console.log(` Errores: ${resultadosGlobales.errores}`);
console.log('\n LIMPIEZA COMPLETADA\n');


