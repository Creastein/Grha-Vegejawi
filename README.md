# Grha Vege Jawi Syariah — Website

Website profil dan reservasi resmi **Grha Vege Jawi Syariah**, penginapan dan kos eksklusif berkonsep syariah yang berlokasi di Banguntapan, Bantul, Daerah Istimewa Yogyakarta.

Website ini dibangun menggunakan framework **Astro** dengan performa tinggi, tampilan modern responsif berbasis **Tailwind CSS**, serta integrasi dinamis dengan **Google Sheets** untuk pembaruan harga kamar secara mandiri.

---

## Fitur Utama

- **Katalog Kamar & Fasilitas:** Informasi detail kamar lantai 1 (ramah lansia) dan lantai 2 (balkon & meja kerja), serta rincian paket sewa harian, kost bulanan, dan sewa satu rumah (*full house*).
- **Galeri Foto Interaktif:** Penampil foto (*lightbox*) dengan filter kategori ruangan dan area penginapan.
- **Integrasi Harga Google Sheets:** Pemilik dapat memperbarui tarif harian, bulanan, maupun banner promo langsung melalui spreadsheet tanpa perlu mengubah kode program.
- **Fail-Safe Pricing:** Jika spreadsheet tidak dapat diakses atau URL kosong, sistem secara otomatis menggunakan tarif default cadangan tanpa menimbulkan error pada website.
- **Konversi WhatsApp Langsung:** Tombol booking mengarah langsung ke kontak WhatsApp resmi pengelola dengan format pesan otomatis sesuai kamar yang dipilih.
- **SEO & Navigasi Lokasi:** Dilengkapi structured data Schema.org (Hotel & BedAndBreakfast), peta interaktif Google Maps, titik koordinat pintu gerbang utama, dan petunjuk akses simpul transit kota Yogyakarta.

---

## Teknologi

- **Framework:** [Astro](https://astro.build/) (v5)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Bahasa:** TypeScript
- **Deployment Target:** [Vercel](https://vercel.com/) (mendukung Serverless & ISR)

---

## Prasyarat Sistem

Sebelum memulai, pastikan perangkat Anda telah terinstal:

- **Node.js:** Versi `20.x` atau `22.x` (LTS direkomendasikan)
- **Package Manager:** `npm` (bawaan Node.js) atau `pnpm` / `yarn`

---

## Panduan Instalasi & Menjalankan Proyek

### 1. Ekstrak dan Buka Folder Proyek

Ekstrak file arsip `.zip` ke komputer Anda, lalu buka direktori proyek melalui terminal atau text editor (VS Code, Cursor, dsb).

### 2. Install Dependensi

Jalankan perintah berikut di terminal:

```bash
npm install
```

### 3. Konfigurasi Environment Variable

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Buka file `.env` dan sesuaikan nilainya:

```env
# URL CSV dari Google Sheets yang di-Publish to Web (opsional saat development)
GOOGLE_SHEETS_CSV_URL=""

# Google Analytics 4 (GA4) & Google Search Console
PUBLIC_GA_MEASUREMENT_ID="G-4KFSYF5TER"
PUBLIC_GOOGLE_SITE_VERIFICATION="8kQ1l3oGtY9gzfK29Kjm-_bB9OukkPvPbx6D-gwbuOU"
```

> **Catatan:** Jika `GOOGLE_SHEETS_CSV_URL` dibiarkan kosong, website akan otomatis menggunakan data tarif default sistem.

### 4. Menjalankan Server Development

Jalankan perintah berikut:

```bash
npm run dev
```

Buka peramban (browser) dan akses alamat:
```
http://localhost:4321
```

### 5. Build untuk Production

Untuk membuat build siap rilis:

```bash
npm run build
```

Untuk menguji hasil build secara lokal sebelum deploy:

```bash
npm run preview
```

---

## Panduan Kelola Harga via Google Sheets

Pemilik atau pengelola properti dapat mengubah tarif sewa dan banner promo kapan saja melalui Google Sheets:

### 1. Format Spreadsheet

Buat spreadsheet di Google Sheets dengan struktur tabel 3 kolom:

| Kategori | Harga | Keterangan |
|---|---|---|
| **Weekday** | 165.000 | Tarif Senin - Kamis |
| **Weekend** | 165.000 | Tarif Jumat - Minggu |
| **Long Weekend** | 165.000 | Tarif Libur Nasional |
| **Bulanan** | 1.500.000 | Paket kost bulanan |
| **Promo** | Promo Reservasi Langsung | Kosongkan jika tidak ada promo |

*Format angka fleksibel: Anda dapat menuliskan `165000`, `165.000`, atau `Rp 165.000`.*

### 2. Publikasikan Spreadsheet ke Web

1. Pada Google Sheets, klik menu **File** > **Bagikan (Share)** > **Publikasikan ke web (Publish to the web)**.
2. Pada tab **Tautan (Link)**, ubah pilihan dari **Halaman Web** menjadi **Nilai yang dipisahkan koma (.csv)**.
3. Klik tombol **Publikasikan (Publish)**.
4. Salin tautan yang dihasilkan (berakhiran `?output=csv`).
5. Tempel tautan tersebut ke variabel `GOOGLE_SHEETS_CSV_URL` pada file `.env` atau menu Environment Variables di dashboard hosting (Vercel).

---

## Struktur Folder

```text
├── public/                 # Asset statis (favicon, robots.txt, sitemap.xml)
│   └── image/              # Foto-foto kamar, fasilitas, dan fasad properti (.webp)
├── src/
│   ├── components/         # Komponen UI halaman landing
│   │   ├── AboutBrand.astro        # Nilai filosofi dan adab syariah
│   │   ├── CtaBanner.astro         # Banner penutup reservasi WhatsApp
│   │   ├── Facilities.astro        # Rincian fasilitas kamar dan area bersama
│   │   ├── Footer.astro            # Informasi kontak, alamat, dan navigasi bawah
│   │   ├── GalleryLightbox.astro   # Galeri foto dengan modal penampil
│   │   ├── GuestReviews.astro      # Ulasan terverifikasi Google Maps
│   │   ├── HeaderNav.astro         # Navbar adaptif dengan menu mobile
│   │   ├── Hero.astro              # Bagian utama atas dan ringkasan nilai
│   │   ├── LocationTransit.astro   # Peta lokasi Google Maps dan akses sekitar
│   │   ├── RoomPricing.astro       # Pilihan tipe kamar dan tarif
│   │   └── RulesFaq.astro          # Ketentuan menginap syariah & tanya jawab
│   ├── layouts/
│   │   └── Layout.astro            # Layout utama, meta tags SEO & Schema.org
│   ├── lib/
│   │   └── pricing.ts              # Utilitas parser harga Google Sheets & fallback
│   ├── pages/
│   │   ├── index.astro             # Halaman utama website
│   │   └── api/
│   │       └── pricing.json.ts     # Endpoint API internal untuk data harga
│   └── styles/
│       └── global.css              # Konfigurasi Tailwind & gaya custom
├── .env.example            # Contoh konfigurasi environment variable
├── astro.config.mjs        # Konfigurasi Astro & Vercel Adapter
├── package.json            # Daftar dependensi dan script npm
├── tailwind.config.mjs     # Konfigurasi tema dan token warna Tailwind
├── tsconfig.json           # Konfigurasi TypeScript
└── vercel.json             # Konfigurasi caching CDN Vercel
```

---

## Deployment ke Vercel

Proyek ini telah dikonfigurasi untuk deployment di platform **Vercel**:

1. Unggah source code ini ke repositori Git (GitHub / GitLab / Bitbucket).
2. Buka dashboard [Vercel](https://vercel.com/) lalu pilih **Add New Project**.
3. Hubungkan repositori Anda. Vercel akan otomatis mengenali framework Astro.
4. Pada bagian **Environment Variables**, tambahkan:
   - `GOOGLE_SHEETS_CSV_URL`
   - `PUBLIC_GA_MEASUREMENT_ID`
   - `PUBLIC_GOOGLE_SITE_VERIFICATION`
5. Klik **Deploy**. Website akan langsung aktif dengan konfigurasi ISR dan CDN global.

---

## Kontak Pengelola Properti

- **Properti:** Grha Vege Jawi Syariah
- **Pengelola:** Ibu Agnesia Hari Kardyantini
- **WhatsApp:** 0812-2729-637
- **Alamat:** Jl. Turonggo No.125, Jaranan, Banguntapan, Bantul, D.I. Yogyakarta 55189

