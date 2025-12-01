import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONFIG = {
  directories: [
    path.join(__dirname, '..')
  ],
  
  extensions: ['.js', '.html', '.css', '.sql', '.md', '.json', '.txt'],
  
  excludeFiles: [
    'remove-emojis.js',
    'remove-comments.js',
    'node_modules',
    '.git',
    'package-lock.json',
    '.backup'
  ],
  
  verbose: true
};

const stats = {
  filesProcessed: 0,
  filesModified: 0,
  emojisRemoved: 0,
  byCategory: {
    faces: 0,
    symbols: 0,
    objects: 0,
    flags: 0,
    other: 0
  }
};

const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{2B05}-\u{2B07}]|[\u{2934}-\u{2935}]|[\u{3030}]|[\u{303D}]|[\u{3297}]|[\u{3299}]|[\u{FE0F}]|[\u{203C}]|[\u{2049}]|[\u{20E3}]|[\u{2122}]|[\u{2139}]|[\u{2194}-\u{2199}]|[\u{21A9}-\u{21AA}]|[\u{231A}-\u{231B}]|[\u{23E9}-\u{23F3}]|[\u{23F8}-\u{23FA}]|[\u{24C2}]|[\u{25AA}-\u{25AB}]|[\u{25B6}]|[\u{25C0}]|[\u{25FB}-\u{25FE}]|[\u{2600}-\u{2604}]|[\u{260E}]|[\u{2611}]|[\u{2614}-\u{2615}]|[\u{2618}]|[\u{261D}]|[\u{2620}]|[\u{2622}-\u{2623}]|[\u{2626}]|[\u{262A}]|[\u{262E}-\u{262F}]|[\u{2638}-\u{263A}]|[\u{2640}]|[\u{2642}]|[\u{2648}-\u{2653}]|[\u{265F}-\u{2660}]|[\u{2663}]|[\u{2665}-\u{2666}]|[\u{2668}]|[\u{267B}]|[\u{267E}-\u{267F}]|[\u{2692}-\u{2697}]|[\u{2699}]|[\u{269B}-\u{269C}]|[\u{26A0}-\u{26A1}]|[\u{26A7}]|[\u{26AA}-\u{26AB}]|[\u{26B0}-\u{26B1}]|[\u{26BD}-\u{26BE}]|[\u{26C4}-\u{26C5}]|[\u{26C8}]|[\u{26CE}]|[\u{26CF}]|[\u{26D1}]|[\u{26D3}-\u{26D4}]|[\u{26E9}-\u{26EA}]|[\u{26F0}-\u{26F5}]|[\u{26F7}-\u{26FA}]|[\u{26FD}]|[\u{2702}]|[\u{2705}]|[\u{2708}-\u{270D}]|[\u{270F}]|[\u{2712}]|[\u{2714}]|[\u{2716}]|[\u{271D}]|[\u{2721}]|[\u{2728}]|[\u{2733}-\u{2734}]|[\u{2744}]|[\u{2747}]|[\u{274C}]|[\u{274E}]|[\u{2753}-\u{2755}]|[\u{2757}]|[\u{2763}-\u{2764}]|[\u{2795}-\u{2797}]|[\u{27A1}]|[\u{27B0}]|[\u{27BF}]|[\u{2934}-\u{2935}]|[\u{2B05}-\u{2B07}]|[\u{2B1B}-\u{2B1C}]|[\u{2B50}]|[\u{2B55}]|[\u{E0020}-\u{E007F}]|[\u{1F004}]|[\u{1F0CF}]|[\u{1F170}-\u{1F171}]|[\u{1F17E}-\u{1F17F}]|[\u{1F18E}]|[\u{1F191}-\u{1F19A}]|[\u{1F201}-\u{1F202}]|[\u{1F21A}]|[\u{1F22F}]|[\u{1F232}-\u{1F23A}]|[\u{1F250}-\u{1F251}]|[\u{1F300}-\u{1F321}]|[\u{1F324}-\u{1F393}]|[\u{1F396}-\u{1F397}]|[\u{1F399}-\u{1F39B}]|[\u{1F39E}-\u{1F3F0}]|[\u{1F3F3}-\u{1F3F5}]|[\u{1F3F7}-\u{1F4FD}]|[\u{1F4FF}-\u{1F53D}]|[\u{1F549}-\u{1F54E}]|[\u{1F550}-\u{1F567}]|[\u{1F56F}-\u{1F570}]|[\u{1F573}-\u{1F57A}]|[\u{1F587}]|[\u{1F58A}-\u{1F58D}]|[\u{1F590}]|[\u{1F595}-\u{1F596}]|[\u{1F5A4}-\u{1F5A5}]|[\u{1F5A8}]|[\u{1F5B1}-\u{1F5B2}]|[\u{1F5BC}]|[\u{1F5C2}-\u{1F5C4}]|[\u{1F5D1}-\u{1F5D3}]|[\u{1F5DC}-\u{1F5DE}]|[\u{1F5E1}]|[\u{1F5E3}]|[\u{1F5E8}]|[\u{1F5EF}]|[\u{1F5F3}]|[\u{1F5FA}-\u{1F64F}]|[\u{1F680}-\u{1F6C5}]|[\u{1F6CB}-\u{1F6D2}]|[\u{1F6D5}-\u{1F6D7}]|[\u{1F6E0}-\u{1F6E5}]|[\u{1F6E9}]|[\u{1F6EB}-\u{1F6EC}]|[\u{1F6F0}]|[\u{1F6F3}-\u{1F6FC}]|[\u{1F7E0}-\u{1F7EB}]|[\u{1F90C}-\u{1F93A}]|[\u{1F93C}-\u{1F945}]|[\u{1F947}-\u{1F978}]|[\u{1F97A}-\u{1F9CB}]|[\u{1F9CD}-\u{1F9FF}]|[\u{1FA70}-\u{1FA74}]|[\u{1FA78}-\u{1FA7A}]|[\u{1FA80}-\u{1FA86}]|[\u{1FA90}-\u{1FAA8}]|[\u{1FAB0}-\u{1FAB6}]|[\u{1FAC0}-\u{1FAC2}]|[\u{1FAD0}-\u{1FAD6}]/gu;

function categorizeEmoji(emoji) {
  const code = emoji.codePointAt(0);
  if (code >= 0x1F600 && code <= 0x1F64F) return 'faces';
  if (code >= 0x2600 && code <= 0x26FF) return 'symbols';
  if (code >= 0x1F300 && code <= 0x1F5FF) return 'objects';
  if (code >= 0x1F1E0 && code <= 0x1F1FF) return 'flags';
  return 'other';
}

function removeEmojis(content) {
  let removed = 0;
  const newContent = content.replace(EMOJI_REGEX, (match) => {
    removed++;
    const category = categorizeEmoji(match);
    stats.byCategory[category]++;
    return '';
  });
  
  return { newContent, removed };
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { newContent, removed } = removeEmojis(content);
    
    if (removed > 0) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      stats.filesModified++;
      stats.emojisRemoved += removed;
      
      if (CONFIG.verbose) {
        console.log(`✅ ${path.relative(__dirname, filePath)}`);
        console.log(`   🗑️  Emojis eliminados: ${removed}`);
      }
    } else {
      if (CONFIG.verbose) {
        console.log(`⏭️  ${path.relative(__dirname, filePath)} (sin emojis)`);
      }
    }
    
    stats.filesProcessed++;
  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error.message);
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
          processFile(filePath);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error leyendo directorio ${dir}:`, error.message);
  }
}

console.log('╔════════════════════════════════════════════════════╗');
console.log('║  🧹 ELIMINADOR DE EMOJIS                          ║');
console.log('║  CEMI - Sistema Educativo                         ║');
console.log('╚════════════════════════════════════════════════════╝\n');

console.log('📂 Procesando: Toda la carpeta Proyecto Final');
console.log('📄 Extensiones: ' + CONFIG.extensions.join(', '));
console.log('\n' + '─'.repeat(54) + '\n');

const startTime = Date.now();

try {
  CONFIG.directories.forEach(dir => {
    if (fs.existsSync(dir)) {
      walkDirectory(dir);
    } else {
      console.log(`⚠️  Directorio no encontrado: ${dir}`);
    }
  });
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  console.log('\n' + '═'.repeat(54));
  console.log('📊 RESUMEN FINAL');
  console.log('═'.repeat(54));
  console.log(`✅ Archivos procesados: ${stats.filesProcessed}`);
  console.log(`📝 Archivos modificados: ${stats.filesModified}`);
  console.log(`🗑️  Total emojis eliminados: ${stats.emojisRemoved}`);
  console.log('');
  console.log('📋 Desglose por categoría:');
  console.log(`   • Caras y gestos: ${stats.byCategory.faces}`);
  console.log(`   • Símbolos: ${stats.byCategory.symbols}`);
  console.log(`   • Objetos: ${stats.byCategory.objects}`);
  console.log(`   • Banderas: ${stats.byCategory.flags}`);
  console.log(`   • Otros: ${stats.byCategory.other}`);
  console.log('');
  console.log(`⏱️  Tiempo de ejecución: ${duration}s`);
  console.log('═'.repeat(54));
  console.log('\n✨ ¡Proceso completado exitosamente!\n');
  
} catch (error) {
  console.error('\n❌ ERROR durante el procesamiento:');
  console.error(error.message);
  process.exit(1);
}


