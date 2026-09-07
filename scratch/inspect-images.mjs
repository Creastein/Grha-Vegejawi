import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = 'public/image';
const files = fs.readdirSync(dir);

for (const f of files) {
  if (f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.jpg')) {
    const p = path.join(dir, f);
    const meta = await sharp(p).metadata();
    const stat = fs.statSync(p);
    console.log(f.padEnd(30), `${meta.width}x${meta.height}`.padEnd(12), `${Math.round(stat.size / 1024)} KB (${stat.size} bytes)`);
  }
}
