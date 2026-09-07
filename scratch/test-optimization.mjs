import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = 'public/image';

async function testHero() {
  const src = path.join(dir, 'hero.webp');
  // Target: > 100000 bytes (for QA constraint) and < 220000 bytes (Lighthouse savings)
  // Current: 288,266 bytes (1447x1087)
  const meta = await sharp(src).metadata();
  console.log('Hero original:', meta.width, meta.height, fs.statSync(src).size);

  for (const q of [72, 75, 78, 80]) {
    const buf = await sharp(src)
      .resize({ width: 1342, withoutEnlargement: true })
      .webp({ quality: q, effort: 6 })
      .toBuffer();
    console.log(`Hero 1342px q=${q}: ${buf.length} bytes (${Math.round(buf.length/1024)} KB)`);
  }
}

async function testUpperRoom() {
  const src = path.join(dir, 'kamar-lantai-atas-160.webp');
  const meta = await sharp(src).metadata();
  console.log('UpperRoom original:', meta.width, meta.height, fs.statSync(src).size);

  for (const w of [768, 800, 850]) {
    for (const q of [72, 75, 78]) {
      const buf = await sharp(src)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: q, effort: 6 })
        .toBuffer();
      console.log(`UpperRoom w=${w} q=${q}: ${buf.length} bytes (${Math.round(buf.length/1024)} KB)`);
    }
  }
}

async function testLowerRoom() {
  const src = path.join(dir, 'Kamar-lantai-bawah.webp');
  const meta = await sharp(src).metadata();
  console.log('LowerRoom original:', meta.width, meta.height, fs.statSync(src).size);

  for (const w of [768, 800, 850]) {
    for (const q of [72, 75, 78]) {
      const buf = await sharp(src)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: q, effort: 6 })
        .toBuffer();
      console.log(`LowerRoom w=${w} q=${q}: ${buf.length} bytes (${Math.round(buf.length/1024)} KB)`);
    }
  }
}

async function run() {
  await testHero();
  console.log('---');
  await testUpperRoom();
  console.log('---');
  await testLowerRoom();
}

run();
