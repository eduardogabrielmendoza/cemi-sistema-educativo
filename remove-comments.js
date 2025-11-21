// ============================================
// SCRIPT INTELIGENTE DE ELIMINACIÓN DE COMENTARIOS
// ============================================
// Elimina comentarios sin afectar código funcional
// Soporta: JavaScript, HTML, CSS, SQL
// ============================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ============================================
// CONFIGURACIÓN
// ============================================

const CONFIG = {
  // Directorios a procesar (toda la carpeta Proyecto Final)
  directories: [
    path.join(__dirname, '..')
  ],
  
  // Extensiones de archivos a procesar
  extensions: ['.js', '.html', '.css', '.sql'],
  
  // Archivos a excluir
  excludeFiles: [
    'remove-comments.js',
    'node_modules',
    '.git',
    'package-lock.json',
    'package.json',
    '.backup'
  ],
  
  // Crear backup antes de procesar
  createBackup: false,
  
  // Modo verbose (mostrar cada cambio)
  verbose: true
};

// ============================================
// ESTADÍSTICAS
// ============================================

const stats = {
  filesProcessed: 0,
  filesModified: 0,
  linesRemoved: 0,
  byType: {
    singleLine: 0,
    multiLine: 0,
    html: 0
  }
};

// ============================================
// FUNCIONES DE DETECCIÓN
// ============================================

/**
 * Detecta si una línea es un comentario válido de una sola línea
 */
function isSingleLineComment(line, fileExt) {
  const trimmed = line.trim();
  
  // HTML comments
  if (fileExt === '.html') {
    return trimmed.startsWith('<!--') && trimmed.endsWith('-->');
  }
  
  // JavaScript/CSS single line comments
  if (!trimmed.startsWith('//')) return false;
  
  // EXCEPCIONES - NO eliminar si:
  
  // 1. Es una URL (http://, https://, ftp://)
  if (/^\/\/\s*(https?|ftp):/.test(trimmed)) return false;
  if (/https?:\/\//.test(line) && !line.trim().startsWith('//')) return false;
  
  // 2. Es parte de un regex
  if (line.includes('://') && !line.trim().startsWith('//')) return false;
  
  // 3. Está dentro de una string
  const beforeComment = line.substring(0, line.indexOf('//'));
  const singleQuotes = (beforeComment.match(/'/g) || []).length;
  const doubleQuotes = (beforeComment.match(/"/g) || []).length;
  const backticks = (beforeComment.match(/`/g) || []).length;
  
  // Si hay un número impar de comillas antes del //, está dentro de un string
  if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0 || backticks % 2 !== 0) {
    return false;
  }
  
  // 4. Es parte de código regex o división
  if (/\/(\/|\*)/.test(beforeComment) && beforeComment.includes('=')) {
    // Puede ser regex o división, analizar contexto
    if (beforeComment.match(/=\s*\/[^/].*\/$/)) return false;
  }
  
  // Si pasa todas las verificaciones, es un comentario válido
  return true;
}

/**
 * Detecta el inicio de un comentario multilínea
 */
function isMultiLineCommentStart(line, fileExt) {
  const trimmed = line.trim();
  
  if (fileExt === '.html') {
    return trimmed.startsWith('<!--') && !trimmed.endsWith('-->');
  }
  
  // Verificar que no esté dentro de un string
  const beforeComment = line.substring(0, line.indexOf('/*'));
  if (beforeComment) {
    const singleQuotes = (beforeComment.match(/'/g) || []).length;
    const doubleQuotes = (beforeComment.match(/"/g) || []).length;
    const backticks = (beforeComment.match(/`/g) || []).length;
    
    if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0 || backticks % 2 !== 0) {
      return false;
    }
  }
  
  return trimmed.startsWith('/*') && !trimmed.endsWith('*/');
}

/**
 * Detecta el fin de un comentario multilínea
 */
function isMultiLineCommentEnd(line, fileExt) {
  const trimmed = line.trim();
  
  if (fileExt === '.html') {
    return trimmed.endsWith('-->') && !trimmed.startsWith('<!--');
  }
  
  return trimmed.endsWith('*/') && !trimmed.startsWith('/*');
}

/**
 * Detecta si una línea es un comentario completo multilínea (en una sola línea)
 */
function isCompleteMultiLineComment(line, fileExt) {
  const trimmed = line.trim();
  
  if (fileExt === '.html') {
    return trimmed.startsWith('<!--') && trimmed.endsWith('-->');
  }
  
  // Verificar que no esté en un string
  const beforeComment = line.substring(0, line.indexOf('/*'));
  if (beforeComment) {
    const singleQuotes = (beforeComment.match(/'/g) || []).length;
    const doubleQuotes = (beforeComment.match(/"/g) || []).length;
    const backticks = (beforeComment.match(/`/g) || []).length;
    
    if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0 || backticks % 2 !== 0) {
      return false;
    }
  }
  
  return trimmed.startsWith('/*') && trimmed.endsWith('*/');
}

// ============================================
// PROCESAMIENTO DE ARCHIVOS
// ============================================

/**
 * Procesa un archivo y elimina comentarios
 */
function processFile(filePath) {
  const fileExt = path.extname(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const newLines = [];
  
  let inMultiLineComment = false;
  let linesRemovedInFile = 0;
  let htmlCommentBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Estado: dentro de comentario multilínea
    if (inMultiLineComment || htmlCommentBlock) {
      if (fileExt === '.html' && trimmed.endsWith('-->')) {
        htmlCommentBlock = false;
        linesRemovedInFile++;
        stats.byType.html++;
        continue;
      } else if (fileExt !== '.html' && isMultiLineCommentEnd(line, fileExt)) {
        inMultiLineComment = false;
        linesRemovedInFile++;
        stats.byType.multiLine++;
        continue;
      } else {
        // Línea dentro del comentario
        linesRemovedInFile++;
        if (fileExt === '.html') {
          stats.byType.html++;
        } else {
          stats.byType.multiLine++;
        }
        continue;
      }
    }
    
    // Detectar comentarios completos (single line o multiline en una línea)
    if (isCompleteMultiLineComment(line, fileExt)) {
      linesRemovedInFile++;
      if (fileExt === '.html') {
        stats.byType.html++;
      } else {
        stats.byType.multiLine++;
      }
      continue;
    }
    
    // Detectar inicio de comentario multilínea
    if (isMultiLineCommentStart(line, fileExt)) {
      if (fileExt === '.html') {
        htmlCommentBlock = true;
      } else {
        inMultiLineComment = true;
      }
      linesRemovedInFile++;
      if (fileExt === '.html') {
        stats.byType.html++;
      } else {
        stats.byType.multiLine++;
      }
      continue;
    }
    
    // Detectar comentarios de una sola línea
    if (isSingleLineComment(line, fileExt)) {
      linesRemovedInFile++;
      stats.byType.singleLine++;
      continue;
    }
    
    // Si llegamos aquí, la línea NO es un comentario
    newLines.push(line);
  }
  
  // Si se removieron líneas, actualizar archivo
  if (linesRemovedInFile > 0) {
    const newContent = newLines.join('\n');
    
    // Crear backup si está habilitado
    if (CONFIG.createBackup) {
      const backupPath = filePath + '.backup';
      fs.writeFileSync(backupPath, content, 'utf-8');
    }
    
    // Escribir nuevo contenido
    fs.writeFileSync(filePath, newContent, 'utf-8');
    
    stats.filesModified++;
    stats.linesRemoved += linesRemovedInFile;
    
    if (CONFIG.verbose) {
      console.log(`✅ ${path.relative(__dirname, filePath)}`);
      console.log(`   📝 Líneas eliminadas: ${linesRemovedInFile}`);
    }
  } else {
    if (CONFIG.verbose) {
      console.log(`⏭️  ${path.relative(__dirname, filePath)} (sin cambios)`);
    }
  }
  
  stats.filesProcessed++;
}

/**
 * Recorre directorios recursivamente
 */
function walkDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    // Verificar si el archivo/directorio está excluido
    if (CONFIG.excludeFiles.some(exclude => filePath.includes(exclude))) {
      continue;
    }
    
    if (stat.isDirectory()) {
      walkDirectory(filePath);
    } else if (stat.isFile()) {
      const ext = path.extname(filePath);
      if (CONFIG.extensions.includes(ext)) {
        processFile(filePath);
      }
    }
  }
}

// ============================================
// EJECUCIÓN PRINCIPAL
// ============================================

console.log('╔════════════════════════════════════════════════════╗');
console.log('║  🧹 ELIMINADOR INTELIGENTE DE COMENTARIOS         ║');
console.log('║  CEMI - Sistema Educativo Railway                 ║');
console.log('╚════════════════════════════════════════════════════╝\n');

console.log('📂 Directorios a procesar:');
CONFIG.directories.forEach(dir => {
  console.log(`   - ${path.relative(__dirname, dir)}`);
});
console.log('');

console.log('📄 Extensiones: ' + CONFIG.extensions.join(', '));
console.log('💾 Backup habilitado: ' + (CONFIG.createBackup ? 'Sí' : 'No'));
console.log('\n' + '─'.repeat(54) + '\n');

// Procesar cada directorio
const startTime = Date.now();

try {
  CONFIG.directories.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`\n📁 Procesando: ${path.relative(__dirname, dir)}\n`);
      walkDirectory(dir);
    } else {
      console.log(`⚠️  Directorio no encontrado: ${dir}`);
    }
  });
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  // Mostrar estadísticas finales
  console.log('\n' + '═'.repeat(54));
  console.log('📊 RESUMEN FINAL');
  console.log('═'.repeat(54));
  console.log(`✅ Archivos procesados: ${stats.filesProcessed}`);
  console.log(`📝 Archivos modificados: ${stats.filesModified}`);
  console.log(`🗑️  Total líneas eliminadas: ${stats.linesRemoved}`);
  console.log('');
  console.log('📋 Desglose por tipo:');
  console.log(`   • Comentarios // : ${stats.byType.singleLine}`);
  console.log(`   • Comentarios /* */ : ${stats.byType.multiLine}`);
  console.log(`   • Comentarios <!-- --> : ${stats.byType.html}`);
  console.log('');
  console.log(`⏱️  Tiempo de ejecución: ${duration}s`);
  console.log('═'.repeat(54));
  
  if (CONFIG.createBackup) {
    console.log('\n💡 TIP: Se crearon archivos .backup por seguridad');
    console.log('   Si algo salió mal, puedes restaurarlos.');
  }
  
  console.log('\n✨ ¡Proceso completado exitosamente!\n');
  
} catch (error) {
  console.error('\n❌ ERROR durante el procesamiento:');
  console.error(error.message);
  console.error('\n💡 Los archivos con backup pueden restaurarse manualmente.\n');
  process.exit(1);
}
