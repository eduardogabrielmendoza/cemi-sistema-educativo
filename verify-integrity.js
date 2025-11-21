import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONFIG = {
  directories: [
    path.join(__dirname, 'backend'),
    path.join(__dirname, 'frontend')
  ],
  extensions: ['.js', '.html', '.css', '.json'],
  excludeFiles: [
    'verify-integrity.js',
    'remove-comments.js',
    'remove-emojis.js',
    'node_modules',
    '.git',
    'package-lock.json'
  ]
};

const results = {
  totalFiles: 0,
  validFiles: 0,
  errors: [],
  warnings: [],
  stats: {
    jsFiles: 0,
    htmlFiles: 0,
    cssFiles: 0,
    jsonFiles: 0
  }
};

function checkJavaScriptSyntax(filePath, content) {
  const issues = [];
  
  // Verificar paréntesis, llaves y corchetes balanceados
  const brackets = { '(': 0, '[': 0, '{': 0 };
  const closers = { ')': '(', ']': '[', '}': '{' };
  
  let inString = false;
  let stringChar = null;
  let escaped = false;
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    
    if (escaped) {
      escaped = false;
      continue;
    }
    
    if (char === '\\') {
      escaped = true;
      continue;
    }
    
    if ((char === '"' || char === "'" || char === '`') && !inString) {
      inString = true;
      stringChar = char;
      continue;
    }
    
    if (char === stringChar && inString) {
      inString = false;
      stringChar = null;
      continue;
    }
    
    if (!inString) {
      if (brackets.hasOwnProperty(char)) {
        brackets[char]++;
      } else if (closers.hasOwnProperty(char)) {
        brackets[closers[char]]--;
      }
    }
  }
  
  // Verificar balance
  if (brackets['('] !== 0) issues.push(`Paréntesis desbalanceados: ${brackets['('] > 0 ? 'abiertos' : 'cerrados'} de más`);
  if (brackets['['] !== 0) issues.push(`Corchetes desbalanceados: ${brackets['['] > 0 ? 'abiertos' : 'cerrados'} de más`);
  if (brackets['{'] !== 0) issues.push(`Llaves desbalanceadas: ${brackets['{'] > 0 ? 'abiertas' : 'cerradas'} de más`);
  
  // Verificar que no haya quedado // dentro de strings rotas
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('http:') && !line.includes('http://') && !line.includes('https://')) {
      if (!line.includes("'http:") && !line.includes('"http:')) {
        issues.push(`Línea ${idx + 1}: Posible URL rota (falta //)`);
      }
    }
  });
  
  return issues;
}

function checkHTMLSyntax(filePath, content) {
  const issues = [];
  
  // Verificar tags HTML balanceados (básico)
  const openTags = content.match(/<([a-z][a-z0-9]*)\b[^>]*>/gi) || [];
  const closeTags = content.match(/<\/([a-z][a-z0-9]*)>/gi) || [];
  
  const selfClosing = ['img', 'input', 'br', 'hr', 'meta', 'link', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'wbr'];
  
  const tagCounts = {};
  
  openTags.forEach(tag => {
    const tagName = tag.match(/<([a-z][a-z0-9]*)/i)[1].toLowerCase();
    if (!selfClosing.includes(tagName)) {
      tagCounts[tagName] = (tagCounts[tagName] || 0) + 1;
    }
  });
  
  closeTags.forEach(tag => {
    const tagName = tag.match(/<\/([a-z][a-z0-9]*)/i)[1].toLowerCase();
    tagCounts[tagName] = (tagCounts[tagName] || 0) - 1;
  });
  
  Object.entries(tagCounts).forEach(([tag, count]) => {
    if (count !== 0) {
      issues.push(`Tag <${tag}> desbalanceado: ${count > 0 ? count + ' sin cerrar' : Math.abs(count) + ' de cierre de más'}`);
    }
  });
  
  // Verificar atributos src y href no rotos
  const srcMatches = content.match(/src\s*=\s*["'][^"']*["']/gi) || [];
  srcMatches.forEach(src => {
    if (src.includes('http:') && !src.includes('http://') && !src.includes('https://')) {
      issues.push(`Atributo src posiblemente roto: ${src}`);
    }
  });
  
  return issues;
}

function checkCSSyntax(filePath, content) {
  const issues = [];
  
  // Verificar llaves balanceadas
  const openBraces = (content.match(/{/g) || []).length;
  const closeBraces = (content.match(/}/g) || []).length;
  
  if (openBraces !== closeBraces) {
    issues.push(`Llaves CSS desbalanceadas: ${openBraces} abiertas vs ${closeBraces} cerradas`);
  }
  
  // Verificar URLs en CSS
  const urlMatches = content.match(/url\([^)]*\)/gi) || [];
  urlMatches.forEach(url => {
    if (url.includes('http:') && !url.includes('http://') && !url.includes('https://')) {
      issues.push(`URL posiblemente rota: ${url}`);
    }
  });
  
  return issues;
}

function checkJSONSyntax(filePath, content) {
  const issues = [];
  
  try {
    JSON.parse(content);
  } catch (error) {
    issues.push(`JSON inválido: ${error.message}`);
  }
  
  return issues;
}

function verifyFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const ext = path.extname(filePath);
    
    let issues = [];
    
    switch (ext) {
      case '.js':
        issues = checkJavaScriptSyntax(filePath, content);
        results.stats.jsFiles++;
        break;
      case '.html':
        issues = checkHTMLSyntax(filePath, content);
        results.stats.htmlFiles++;
        break;
      case '.css':
        issues = checkCSSyntax(filePath, content);
        results.stats.cssFiles++;
        break;
      case '.json':
        issues = checkJSONSyntax(filePath, content);
        results.stats.jsonFiles++;
        break;
    }
    
    results.totalFiles++;
    
    if (issues.length === 0) {
      results.validFiles++;
      return { valid: true };
    } else {
      results.errors.push({
        file: path.relative(__dirname, filePath),
        issues: issues
      });
      return { valid: false, issues };
    }
    
  } catch (error) {
    results.errors.push({
      file: path.relative(__dirname, filePath),
      issues: [`Error al leer archivo: ${error.message}`]
    });
    return { valid: false, issues: [error.message] };
  }
}

function walkDirectory(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      
      if (CONFIG.excludeFiles.some(exclude => filePath.includes(exclude))) {
        continue;
      }
      
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDirectory(filePath);
      } else if (stat.isFile()) {
        const ext = path.extname(filePath);
        if (CONFIG.extensions.includes(ext)) {
          verifyFile(filePath);
        }
      }
    }
  } catch (error) {
    console.error(`Error leyendo directorio ${dir}:`, error.message);
  }
}

console.log('╔════════════════════════════════════════════════════╗');
console.log('║  🔍 VERIFICADOR DE INTEGRIDAD DEL PROYECTO        ║');
console.log('║  CEMI - Sistema Educativo Railway                 ║');
console.log('╚════════════════════════════════════════════════════╝\n');

console.log('Verificando integridad del código...\n');
console.log('─'.repeat(54) + '\n');

const startTime = Date.now();

CONFIG.directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`Analizando: ${path.relative(__dirname, dir)}\n`);
    walkDirectory(dir);
  } else {
    console.log(`Directorio no encontrado: ${dir}`);
  }
});

const endTime = Date.now();
const duration = ((endTime - startTime) / 1000).toFixed(2);

console.log('\n' + '═'.repeat(54));
console.log('RESUMEN DE VERIFICACION');
console.log('═'.repeat(54));
console.log(`Total de archivos analizados: ${results.totalFiles}`);
console.log(`  - JavaScript: ${results.stats.jsFiles}`);
console.log(`  - HTML: ${results.stats.htmlFiles}`);
console.log(`  - CSS: ${results.stats.cssFiles}`);
console.log(`  - JSON: ${results.stats.jsonFiles}`);
console.log('');
console.log(`Archivos VALIDOS: ${results.validFiles}`);
console.log(`Archivos con ERRORES: ${results.errors.length}`);
console.log(`Tiempo de ejecucion: ${duration}s`);
console.log('═'.repeat(54));

if (results.errors.length > 0) {
  console.log('\n' + '!'.repeat(54));
  console.log('ARCHIVOS CON PROBLEMAS DETECTADOS:');
  console.log('!'.repeat(54) + '\n');
  
  results.errors.forEach((error, index) => {
    console.log(`${index + 1}. ${error.file}`);
    error.issues.forEach(issue => {
      console.log(`   - ${issue}`);
    });
    console.log('');
  });
  
  console.log('RECOMENDACION: Revisar los archivos listados arriba.\n');
  process.exit(1);
} else {
  console.log('\n' + '✓'.repeat(54));
  console.log('EXITO: Todos los archivos pasaron la verificacion!');
  console.log('✓'.repeat(54));
  console.log('\nEl proyecto esta integro y funcional.\n');
  process.exit(0);
}
