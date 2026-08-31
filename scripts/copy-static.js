import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function copyDir(srcRelative, destRelative) {
  const src = path.join(rootDir, srcRelative);
  const dest = path.join(rootDir, destRelative);

  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(path.join(srcRelative, entry.name), path.join(destRelative, entry.name));
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  copyDir('js', 'public/js');
  copyDir('data', 'public/data');
  console.log('✅ [Vite/Vercel Build] Successfully copied js/ and data/ to public/ static directory!');
} catch (err) {
  console.error('❌ Error copying static files for build:', err);
}
