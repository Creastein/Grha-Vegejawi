// scripts/qa-audit.mjs
// Automated Quality Assurance (QA) Audit Script for Grha Vege Jawi Syariah

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  \x1b[32m✔\x1b[0m ${testName}`);
  } else {
    failedTests++;
    failures.push({ testName, details });
    console.error(`  \x1b[31m✘\x1b[0m ${testName}`);
    if (details) {
      console.error(`    \x1b[33mDetail:\x1b[0m ${details}`);
    }
  }
}

console.log('\n\x1b[1m\x1b[36m=========================================================\x1b[0m');
console.log('\x1b[1m\x1b[36m   AUTOMATED QA AUDIT SUITE — GRHA VEGE JAWI SYARIAH   \x1b[0m');
console.log('\x1b[1m\x1b[36m=========================================================\x1b[0m\n');

// -------------------------------------------------------------
// MODULE 1: ANCHOR & NAVIGATION INTEGRITY
// -------------------------------------------------------------
console.log('\x1b[1m[1/5] Memeriksa Integritas Navigasi & Section Anchors...\x1b[0m');

const requiredSectionIds = [
  'beranda',
  'fasilitas',
  'tentang',
  'kamar',
  'galeri',
  'testimoni',
  'lokasi',
  'faq'
];

const componentsDir = path.join(rootDir, 'src', 'components');
const componentFiles = fs.readdirSync(componentsDir).filter(f => f.endsWith('.astro'));
const allComponentCode = componentFiles.map(f => fs.readFileSync(path.join(componentsDir, f), 'utf-8')).join('\n');

for (const secId of requiredSectionIds) {
  const idRegex = new RegExp(`id=["']${secId}["']`, 'i');
  assert(
    idRegex.test(allComponentCode),
    `Target Section #${secId} harus terdefinisi dalam komponen`,
    `Tidak ditemukan atribut id="${secId}" di src/components/`
  );
}

// Check backward-compatibility anchor #ulasan
assert(
  /id=["']ulasan["']/i.test(allComponentCode),
  'Anchor backward-compatibility #ulasan tetap terpasang untuk link eksternal',
  'id="ulasan" tidak ditemukan di GuestReviews.astro'
);

// -------------------------------------------------------------
// MODULE 2: CONTACT & CONVERSION URLS (WHATSAPP & GMAPS)
// -------------------------------------------------------------
console.log('\n\x1b[1m[2/5] Memeriksa Validitas Kanal Konversi (WhatsApp & Google Maps)...\x1b[0m');

const expectedPhone = '628122729637';
const waLinkMatches = allComponentCode.match(/https:\/\/wa\.me\/[0-9]+/g) || [];

assert(
  waLinkMatches.length > 0,
  'Tautan WhatsApp harus ditemukan pada komponen-komponen konversi',
  `Ditemukan ${waLinkMatches.length} link WhatsApp`
);

let allWaNumbersCorrect = true;
for (const match of waLinkMatches) {
  if (!match.includes(expectedPhone)) {
    allWaNumbersCorrect = false;
    assert(false, `Nomor WhatsApp ${match} harus mengarah ke nomor resmi Ibu Agnesia (${expectedPhone})`);
  }
}
if (allWaNumbersCorrect && waLinkMatches.length > 0) {
  assert(true, `100% tautan WhatsApp (${waLinkMatches.length} tautan) mengarah ke nomor resmi ${expectedPhone}`);
}

// Google Maps URL checks
const expectedGeoLat = '-7.7919649';
const expectedGeoLng = '110.4029812';
assert(
  allComponentCode.includes(expectedGeoLat) && allComponentCode.includes(expectedGeoLng),
  `Koordinat Google Maps (${expectedGeoLat}, ${expectedGeoLng}) terpasang akurat pada kode`,
  'Koordinat presisi properti tidak ditemukan dalam komponen'
);

// -------------------------------------------------------------
// MODULE 3: PHYSICAL ASSETS & IMAGE INTEGRITY
// -------------------------------------------------------------
console.log('\n\x1b[1m[3/5] Memeriksa Integritas File Fisik Gambar (Mencegah 404)...\x1b[0m');

const publicDir = path.join(rootDir, 'public');
const imageRefRegex = /["'](\/image\/[a-zA-Z0-9_\-=\.]+\.(webp|jpg|jpeg|png|svg))["']/g;
const foundImages = new Set();
let match;

while ((match = imageRefRegex.exec(allComponentCode)) !== null) {
  foundImages.add(match[1]);
}

// Also check Layout.astro
const layoutPath = path.join(rootDir, 'src', 'layouts', 'Layout.astro');
if (fs.existsSync(layoutPath)) {
  const layoutCode = fs.readFileSync(layoutPath, 'utf-8');
  let m;
  while ((m = imageRefRegex.exec(layoutCode)) !== null) {
    foundImages.add(m[1]);
  }
}

assert(foundImages.size > 0, `Ditemukan referensi aset gambar (${foundImages.size} aset unik)`);

let missingImages = [];
for (const imgUrl of foundImages) {
  const relPath = imgUrl.startsWith('/') ? imgUrl.slice(1) : imgUrl;
  const fullPath = path.join(publicDir, relPath);
  if (!fs.existsSync(fullPath)) {
    missingImages.push(imgUrl);
  }
}

assert(
  missingImages.length === 0,
  `Semua aset gambar fisik (${foundImages.size} file) harus ada di folder public/`,
  missingImages.length > 0 ? `File tidak ditemukan: ${missingImages.join(', ')}` : ''
);

// Verify hero.webp specifically exists and is not empty
const heroPath = path.join(publicDir, 'image', 'hero.webp');
const heroExists = fs.existsSync(heroPath);
const heroSize = heroExists ? fs.statSync(heroPath).size : 0;
assert(
  heroExists && heroSize > 100000,
  `Gambar hero.webp harus ada dengan resolusi tinggi (Ukuran: ${Math.round(heroSize / 1024)} KB)`,
  'hero.webp tidak ditemukan atau ukurannya terlalu kecil'
);

// -------------------------------------------------------------
// MODULE 4: SEO, METADATA & SCHEMA.ORG JSON-LD VALIDATION
// -------------------------------------------------------------
console.log('\n\x1b[1m[4/5] Memeriksa Standar SEO, OpenGraph, & Schema.org JSON-LD...\x1b[0m');

const layoutContent = fs.readFileSync(layoutPath, 'utf-8');

assert(
  layoutContent.includes('property="og:image"') && layoutContent.includes('/image/hero.webp'),
  'Meta tag og:image menggunakan gambar resolusi tinggi /image/hero.webp',
  'og:image tidak sesuai spesifikasi'
);

assert(
  layoutContent.includes('name="twitter:image"') && layoutContent.includes('/image/hero.webp'),
  'Meta tag twitter:image menggunakan gambar /image/hero.webp',
  'twitter:image tidak sesuai spesifikasi'
);

assert(
  layoutContent.includes('"@type": ["LodgingBusiness", "Hotel"') || layoutContent.includes('"@type": [ "LodgingBusiness"'),
  'Schema.org memuat entitas resmi LodgingBusiness & Hotel',
  'Tipe entitas perhotelan tidak ditemukan di Schema.org JSON-LD'
);

assert(
  layoutContent.includes('"ratingValue": "4.6"') || layoutContent.includes('"ratingValue": 4.6'),
  'Schema.org memuat rating agregat 4.6 yang terverifikasi',
  'Nilai rating 4.6 tidak ditemukan pada Schema.org'
);

assert(
  layoutContent.includes('"reviewCount": "308"') || layoutContent.includes('"reviewCount": 308'),
  'Schema.org memuat total 308 ulasan Google Maps yang terverifikasi',
  'Jumlah ulasan 308 tidak ditemukan pada Schema.org'
);

// -------------------------------------------------------------
// MODULE 5: PRICING ENGINE & RESILIENCE FALLBACK
// -------------------------------------------------------------
console.log('\n\x1b[1m[5/5] Memeriksa Logika Harga & Resiliensi Fallback...\x1b[0m');

const pricingLibPath = path.join(rootDir, 'src', 'lib', 'pricing.ts');
assert(
  fs.existsSync(pricingLibPath),
  'Modul logika pricing (src/lib/pricing.ts) harus tersedia',
  'File src/lib/pricing.ts tidak ditemukan'
);

const pricingCode = fs.readFileSync(pricingLibPath, 'utf-8');

assert(
  pricingCode.includes('DEFAULT_PRICING'),
  'Konfigurasi DEFAULT_PRICING harus terdefinisi untuk resiliensi offline',
  'Konstanta DEFAULT_PRICING tidak ditemukan'
);

assert(
  pricingCode.includes('weekdayPrice: 165000'),
  'Tarif fallback hari kerja (weekday) terkalibrasi Rp 165.000',
  'Harga dasar Rp 165.000 tidak cocok'
);

assert(
  pricingCode.includes('formatRupiah'),
  'Fungsi utilitas formatRupiah terdefinisi untuk format mata uang IDR',
  'Fungsi formatRupiah tidak ditemukan'
);

// Check API route
const apiRoutePath = path.join(rootDir, 'src', 'pages', 'api', 'pricing.json.ts');
assert(
  fs.existsSync(apiRoutePath),
  'API Route SSR /api/pricing.json harus tersedia',
  'Endpoint pricing.json.ts tidak ditemukan'
);

// -------------------------------------------------------------
// SUMMARY REPORT
// -------------------------------------------------------------
console.log('\n\x1b[1m\x1b[36m=========================================================\x1b[0m');
console.log(`\x1b[1mHASIL AUDIT QA: \x1b[0m ${passedTests}/${totalTests} Pengujian Berhasil (${Math.round((passedTests / totalTests) * 100)}%)`);

if (failedTests === 0) {
  console.log('\x1b[1m\x1b[32m✔ STATUS: SEMUA KRITERIA QA MEMENUHI STANDAR PRODUKSI (100% PASSED)!\x1b[0m');
  console.log('\x1b[1m\x1b[36m=========================================================\x1b[0m\n');
  process.exit(0);
} else {
  console.error(`\x1b[1m\x1b[31m✘ STATUS: TERDAPAT ${failedTests} CACAT YANG HARUS DIPERBAIKI SEBELUM RILIS!\x1b[0m`);
  console.log('\x1b[1m\x1b[36m=========================================================\x1b[0m\n');
  process.exit(1);
}
