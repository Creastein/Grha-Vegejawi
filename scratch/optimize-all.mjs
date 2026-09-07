import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = 'public/image';
const backupDir = 'scratch/backup-images';

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// 1. Backup original files
const targets = [
  'hero.webp',
  'kamar-lantai-atas-160.webp',
  'Kamar-lantai-bawah.webp',
  'Kamar-lantai-atas-140.webp',
  'balkon-lantai-atas.webp'
];

for (const t of targets) {
  const src = path.join(dir, t);
  const dest = path.join(backupDir, t);
  if (fs.existsSync(src) && !fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
    console.log(`Backed up: ${t}`);
  }
}

async function optimizeImages() {
  // hero.webp: target 1342px width, quality 78, must be > 100,000 bytes
  const heroSrc = path.join(backupDir, 'hero.webp');
  const heroBuf = await sharp(heroSrc)
    .resize({ width: 1342, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toBuffer();
  fs.writeFileSync(path.join(dir, 'hero.webp'), heroBuf);
  console.log(`hero.webp optimized: ${heroBuf.length} bytes (${Math.round(heroBuf.length/1024)} KB)`);

  // kamar-lantai-atas-160.webp: 800px width, quality 78
  const upper160Src = path.join(backupDir, 'kamar-lantai-atas-160.webp');
  const upper160Buf = await sharp(upper160Src)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toBuffer();
  fs.writeFileSync(path.join(dir, 'kamar-lantai-atas-160.webp'), upper160Buf);
  console.log(`kamar-lantai-atas-160.webp optimized: ${upper160Buf.length} bytes (${Math.round(upper160Buf.length/1024)} KB)`);

  // Kamar-lantai-bawah.webp: 800px width, quality 75
  const lowerSrc = path.join(backupDir, 'Kamar-lantai-bawah.webp');
  const lowerBuf = await sharp(lowerSrc)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 75, effort: 6 })
    .toBuffer();
  fs.writeFileSync(path.join(dir, 'Kamar-lantai-bawah.webp'), lowerBuf);
  console.log(`Kamar-lantai-bawah.webp optimized: ${lowerBuf.length} bytes (${Math.round(lowerBuf.length/1024)} KB)`);

  // Kamar-lantai-atas-140.webp: 800px width, quality 78
  const upper140Src = path.join(backupDir, 'Kamar-lantai-atas-140.webp');
  const upper140Buf = await sharp(upper140Src)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toBuffer();
  fs.writeFileSync(path.join(dir, 'Kamar-lantai-atas-140.webp'), upper140Buf);
  console.log(`Kamar-lantai-atas-140.webp optimized: ${upper140Buf.length} bytes (${Math.round(upper140Buf.length/1024)} KB)`);

  // balkon-lantai-atas.webp: 800px width, quality 78
  const balkonSrc = path.join(backupDir, 'balkon-lantai-atas.webp');
  const balkonBuf = await sharp(balkonSrc)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toBuffer();
  fs.writeFileSync(path.join(dir, 'balkon-lantai-atas.webp'), balkonBuf);
  console.log(`balkon-lantai-atas.webp optimized: ${balkonBuf.length} bytes (${Math.round(balkonBuf.length/1024)} KB)`);
}

optimizeImages();
