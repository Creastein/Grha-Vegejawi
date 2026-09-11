# Dokumen Quality Assurance (QA) Plan — Grha Vege Jawi Syariah

**Versi:** 1.0  
**Tanggal:** 7 September 2026  
**Target Rilis:** Produksi (Vercel & Domain grhavegejawi.com)  
**Klien:** Ibu Agnesia Hari Kardyantini  
**Tech Stack:** Astro v5 (SSR mode dengan `@astrojs/vercel`), Tailwind CSS, Google Sheets API Integration  

---

## 1. Pendahuluan & Ringkasan Eksekutif

Dokumen Quality Assurance (QA) Plan ini menetapkan standar mutu, strategi pengujian, dan kriteria kelulusan (*Definition of Done*) untuk website **Grha Vege Jawi Syariah**. 

Website ini dirancang sebagai landing page direct-booking syariah berkinerja tinggi yang menghubungkan calon tamu langsung ke pemilik (Ibu Agnesia via WhatsApp) tanpa komisi pihak ketiga (OTA), dengan dukungan sistem pembaruan harga mandiri melalui Google Sheets.

### Sasaran Kualitas Utama (*Quality Objectives*)
1. **Zero Blocker on Booking Flow:** 100% tombol dan kalkulator reservasi WhatsApp berfungsi presisi dengan pesan *pre-filled* yang memuat rincian kamar, tanggal, dan estimasi tarif.
2. **Performa Tinggi (Core Web Vitals):**
   - Google PageSpeed Insights score ≥ 90 pada Mobile dan Desktop.
   - Largest Contentful Paint (LCP) < 2.5 detik.
   - Cumulative Layout Shift (CLS) < 0.1.
   - Interaction to Next Paint (INP) < 200 ms.
3. **Resiliensi Sistem (*High Availability*):**
   - Jika endpoint Google Sheets mengalami gangguan jaringan, timeout, atau format data tidak valid, website **harus tetap menyajikan harga fallback default** secara mulus tanpa menghasilkan error HTTP 500.
4. **Kepatuhan Aksesibilitas (WCAG 2.2 AA):**
   - Rasio kontras teks minimal 4.5:1 untuk teks normal dan 3:1 untuk teks besar.
   - Seluruh elemen interaktif dapat dioperasikan via keyboard (Tab, Enter, Space, Escape).
   - Seluruh gambar memiliki atribut `alt` yang deskriptif.
5. **Akurasi SEO Lokal & Rich Snippet:**
   - Validasi sintaks Schema.org JSON-LD `LodgingBusiness`, `Hotel`, dan agregasi rating 4.6★ dari 308 ulasan Google Maps tanpa peringatan error dari Google Rich Results Test.

---

## 2. Ruang Lingkup Pengujian (*Scope of Testing*)

### 2.1 Dalam Ruang Lingkup (*In-Scope*)
- **Fungsionalitas Interaktif:**
  - Sticky Capsule Navbar & Kinetic Scrollspy.
  - Mobile Drawer Menu & Transition Animations.
  - Kalkulator Tarif Kamar Dinamis (Harian, Mingguan, Bulanan) & Generator Link WhatsApp.
  - Interactive Gallery: Filter kategori (Outdoor, Indoor, Fasilitas), tombol navigasi panah kiri/kanan, gesture swipe/touch, modal Lightbox gambar dengan keyboard navigation.
  - Accordion FAQ & Aturan Syariah dengan manajemen state ARIA.
  - Navigasi Tautan Eksternal (Google Maps direct link, WhatsApp deep links, Telepon).
- **Resiliensi & Data Sync:**
  - Endpoint SSR `/api/pricing.json`.
  - Sinkronisasi Google Sheets CSV/JSON dengan in-memory cache TTL (5 menit).
  - Mekanisme fallback otomatis ke `DEFAULT_PRICING` saat Google Sheets offline.
- **Responsivitas & Visual:**
  - Rendering UI pada resolusi Mobile (360px, 375px, 390px, 412px), Tablet (768px, 820px), dan Desktop (1024px, 1280px, 1440px, 1920px).
  - Ukuran touch target minimal 48x48px pada viewport sentuh.
- **SEO & Social Graph:**
  - Validasi OpenGraph (Facebook/WhatsApp share preview) dan Twitter Card.
  - Validasi Schema.org JSON-LD multi-entity graph.
  - Validasi robots.txt dan sitemap.xml.
- **Keamanan Dasar Web:**
  - HTTPS enforcement & SSL header.
  - Atribut `rel="noopener noreferrer"` pada seluruh external links.

### 2.2 Di Luar Ruang Lingkup (*Out-of-Scope*)
- Payment gateway pihak ketiga (sesuai PRD Paket Standard, booking murni via WhatsApp).
- Sistem autentikasi / login multi-user tamu (tidak dibutuhkan pada landing page).
- Fitur multi-bahasa / i18n otomatis (bahasa utama properti adalah Bahasa Indonesia).

---

## 3. Matriks Lingkungan Uji (*Test Environment & Matrix*)

| Kategori | Platform / Perangkat | Browser / Engine | Resolusi Layar |
| :--- | :--- | :--- | :--- |
| **Mobile Modern** | iPhone 14/15/16 Pro | Mobile Safari (WebKit) | 393 x 852 px |
| **Mobile Standard** | Samsung Galaxy S23/S24 | Chrome Mobile (Blink) | 360 x 800 px |
| **Mobile Budget** | Xiaomi Redmi Note / Entry Android | Chrome Mobile (Blink) | 390 x 844 px |
| **Tablet** | iPad Air / iPad Pro | Mobile Safari / Chrome Tablet | 820 x 1180 px |
| **Desktop Standar** | Laptop Windows 10/11 | Google Chrome (Blink) | 1366 x 768 / 1920 x 1080 px |
| **Desktop Premium** | MacBook / macOS | Safari & Chrome | 1440 x 900 / 2560 x 1440 px |
| **Browser Alternatif**| Windows / Linux | Mozilla Firefox (Gecko) | 1920 x 1080 px |

---

## 4. Matriks Test Cases Detail

### TS-01: Hero Section & Direct Conversion Triggers

| Test Case ID | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Prioritas |
| :--- | :--- | :--- | :--- | :---: |
| **TC-HERO-01** | Render Gambar Latar Belakang `hero.webp` | Buka homepage pada desktop & mobile | Gambar `hero.webp` dimuat tajam, tidak pecah, menutupi area 100dvh tanpa CLS, objek fasad dan plang terbaca jelas | **P0** |
| **TC-HERO-02** | Eyebrow Badge Syariah | Periksa badge di atas judul utama | Teks *"Guesthouse Syariah Yogyakarta"* tampil dengan styling pill, border gold, dan kontras yang jelas | **P1** |
| **TC-HERO-03** | CTA WhatsApp Button | Klik tombol *"Tanya Ketersediaan / Reservasi"* | Mengarahkan ke `wa.me/628122729637` dengan pesan pembuka sopan kepada Ibu Agnesia | **P0** |
| **TC-HERO-04** | CTA Buka Peta Lokasi | Klik tombol *"Buka Peta Lokasi"* | Mengarahkan ke listing resmi Google Maps Grha Vege Jawi Syariah pada tab baru (`target="_blank"`) | **P0** |
| **TC-HERO-05** | Ribbon Key Stats | Periksa pita metrik di bawah CTA | Menampilkan tarif mulai Rp 165rb, kapasitas 6 kamar, dan rating 4.6★ Google Maps | **P1** |

---

### TS-02: Sticky Header & Kinetic Scrollspy Navigation

| Test Case ID | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Prioritas |
| :--- | :--- | :--- | :--- | :---: |
| **TC-NAV-01** | Floating Capsule Navbar Desktop | Scroll halaman ke bawah melewati hero | Navbar melayang mulus di tengah atas layar dengan efek glassmorphism (backdrop-blur) | **P1** |
| **TC-NAV-02** | Kinetic Scrollspy Active Link | Scroll melewati masing-masing 8 section (`#beranda`, `#fasilitas`, `#tentang`, `#kamar`, `#galeri`, `#testimoni`, `#lokasi`, `#faq`) | Menu link yang bersesuaian otomatis mendapatkan status *active* (background gold / teks tegas) | **P1** |
| **TC-NAV-03** | Mobile Drawer Toggle | Buka viewport mobile (< 768px), klik tombol hamburger | Drawer samping/bawah terbuka mulus dengan animasi CSS, overlay latar belakang gelap muncul | **P0** |
| **TC-NAV-04** | Mobile Drawer Auto-Close | Klik salah satu tautan di dalam mobile drawer | Halaman bergulir mulus ke section yang dituju dan drawer otomatis tertutup | **P0** |
| **TC-NAV-05** | Keyboard Escape & Overlay Click | Tekan tombol `Esc` atau klik di luar area mobile drawer | Drawer menutup kembali seketika | **P1** |

---

### TS-03: Katalog Kamar & Kalkulator Tarif Dinamis

| Test Case ID | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Prioritas |
| :--- | :--- | :--- | :--- | :---: |
| **TC-ROOM-01** | Pemilihan Tab Tipe Kamar | Klik antara kamar lantai bawah (Single Bed 160) dan lantai atas (140/160) | Foto, spesifikasi ranjang, fasilitas detail, dan harga ter-update secara reaktif | **P0** |
| **TC-ROOM-02** | Kalkulator Durasi Harian | Ubah input jumlah malam (misal 3 malam) | Total biaya terhitung otomatis: `3 × Harga Harian` dengan format Rupiah yang tepat (`Rp 495.000`) | **P0** |
| **TC-ROOM-03** | Validasi Input Durasi | Masukkan angka 0, negatif, atau non-angka | Sistem otomatis mengunci minimal 1 malam atau mereset ke nilai default yang aman | **P1** |
| **TC-ROOM-04** | Generator Pesan Reservasi WA | Klik tombol *"Pesan Kamar Ini via WhatsApp"* pada kalkulator | Membuka WhatsApp dengan URL valid berformat: nama kamar yang dipilih, durasi menginap, dan total estimasi harga | **P0** |
| **TC-ROOM-05** | Live Sync / Fallback Indicator | Periksa status sumber data harga | Menampilkan harga live dari Google Sheets atau fallback aman default tanpa error kalkulasi | **P0** |

---

### TS-04: Galeri Interaktif & Lightbox Modal

| Test Case ID | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Prioritas |
| :--- | :--- | :--- | :--- | :---: |
| **TC-GAL-01** | Filter Kategori Galeri | Klik tab kategori *"Semua"*, *"Outdoor & Fasad"*, *"Kamar"*, *"Fasilitas"* | Grid foto menyaring item secara instan tanpa reload halaman | **P1** |
| **TC-GAL-02** | Tombol Navigasi Panah Kategori | Klik tombol panah kiri (`<`) dan kanan (`>`) pada bilah kategori | Bilah filter bergulir horizontal secara halus | **P2** |
| **TC-GAL-03** | Buka Modal Lightbox | Klik salah satu thumbnail foto di galeri | Modal Lightbox terbuka fullscreen dengan foto resolusi penuh, judul foto, dan latar belakang gelap | **P0** |
| **TC-GAL-04** | Navigasi Foto di Dalam Modal | Klik panah Next / Prev di modal atau tekan tombol panah keyboard (← / →) | Foto berpindah ke urutan berikutnya/sebelumnya dengan transisi mulus | **P1** |
| **TC-GAL-05** | Tutup Modal Lightbox | Klik tombol silang (X), klik backdrop hitam, atau tekan tombol `Esc` | Modal tertutup, scroll halaman utama kembali aktif tanpa bug stuck scroll | **P0** |

---

### TS-05: Social Proof & Ulasan Google Maps

| Test Case ID | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Prioritas |
| :--- | :--- | :--- | :--- | :---: |
| **TC-REV-01** | Validitas Badge Rating Google | Periksa angka rating di section ulasan | Menampilkan nilai terverifikasi **⭐ 4,6 / 5** dari **308 ulasan Google** | **P1** |
| **TC-REV-02** | Kartu Ulasan Tamu Otentik | Periksa kartu ulasan dari tamu nyata (pasangan, pelancong keluarga) | Tanggal, nama pengulas, bintang, dan teks ulasan tampil rapi dan informatif | **P1** |
| **TC-REV-03** | Tautan ke Profil Google Maps Asli | Klik tautan *"Lihat semua ulasan di Google Maps"* | Membuka tab baru langsung ke listing ulasan Google Maps Grha Vege Jawi Syariah | **P1** |

---

### TS-06: Lokasi, Transit, & Peta Presisi

| Test Case ID | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Prioritas |
| :--- | :--- | :--- | :--- | :---: |
| **TC-LOC-01** | Akurasi Alamat Resmi | Cek alamat yang tertulis | *Jl. Turonggo No.125, Jaranan, Banguntapan, Bantul, DIY 55189* tertulis lengkap dan benar | **P0** |
| **TC-LOC-02** | Landmark Jarak & Aksesibilitas | Cek jarak landmark transit | Kebun Binatang Gembira Loka (2 km / 5 mnt), Affandi (3 km), Bandara (5 km), JEC tampil akurat | **P1** |
| **TC-LOC-03** | Tombol Navigasi Google Maps | Klik tombol *"Petunjuk Arah Gerbang"* | Mengarahkan aplikasi Google Maps / browser ke koordinat Pintu Gerbang Utama `-7.7922036, 110.4028339` (7°47'31.2"S 110°24'10.8"E) | **P0** |

---

### TS-07: Sharia House Rules & FAQ Accordion

| Test Case ID | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Prioritas |
| :--- | :--- | :--- | :--- | :---: |
| **TC-FAQ-01** | Buka/Tutup Accordion FAQ | Klik salah satu pertanyaan FAQ | Jawaban terbuka dengan transisi smooth; atribut `aria-expanded` berubah menjadi `true` | **P1** |
| **TC-FAQ-02** | Keyboard Navigation FAQ | Navigasi menggunakan tombol `Tab`, tekan `Enter` atau `Space` | Accordion merespons fokus keyboard dan membuka/menutup konten dengan benar | **P1** |
| **TC-FAQ-03** | Aturan Syariah Jelas | Cek bagian ketentuan guesthouse | Ketentuan pasangan sah (surat nikah/KTP sealamat), tamu sejenis (cowok/cewek semua), penerimaan tamu non-muslim, larangan merokok, dan waktu check-in/out (14.00 / 12.00) tertera tegas | **P0** |

---

### TS-08: Sinkronisasi API Harga & Resiliensi Fallback

| Test Case ID | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Prioritas |
| :--- | :--- | :--- | :--- | :---: |
| **TC-API-01** | Endpoint `/api/pricing.json` | Request GET ke `/api/pricing.json` | Menghasilkan HTTP 200 dengan payload JSON valid berisi harga numerik dan header Cache-Control | **P0** |
| **TC-API-02** | Simulasi Google Sheets Offline | Putuskan jaringan Google Sheets / ubah ID URL sheet salah | Fungsi `getPricing()` secara anggun (*gracefully*) mengembalikan `DEFAULT_PRICING`, website tidak mengalami 500 error | **P0** |
| **TC-API-03** | In-Memory Cache TTL | Lakukan request berulang dalam interval < 5 menit | Data diambil dari cache memori tanpa melakukan fetch HTTP berulang ke Google Sheets | **P1** |

---

### TS-09: Audit SEO, Social Share, & Schema.org

| Test Case ID | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Prioritas |
| :--- | :--- | :--- | :--- | :---: |
| **TC-SEO-01** | Kelengkapan Meta Tags | Cek `<head>` dokumen HTML | Terdapat `<title>`, `<meta name="description">`, `<link rel="canonical">`, dan `<meta name="robots">` | **P0** |
| **TC-SEO-02** | OpenGraph & Twitter Card | Cek meta tag `og:image` dan `twitter:image` | Mengarah ke `https://grhavegejawi.com/image/hero.webp` dengan atribut lebar dan tinggi yang sesuai | **P0** |
| **TC-SEO-03** | Sintaks Schema.org JSON-LD | Validasi blok `<script type="application/ld+json">` | Memuat entitas `LodgingBusiness`, `Hotel`, koordinat geo valid, nomor telepon, dan aggregate rating tanpa error | **P0** |

---

### TS-10: Audit Aksesibilitas (WCAG 2.2 AA) & Kerapian Aset

| Test Case ID | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Prioritas |
| :--- | :--- | :--- | :--- | :---: |
| **TC-A11Y-01** | Atribut Alt Gambar | Periksa seluruh tag `<img>` di kode sumber | 100% tag gambar memiliki teks `alt` yang relevan dan kontekstual | **P1** |
| **TC-A11Y-02** | Focus Visible & Tab Order | Tekan `Tab` dari atas halaman ke bawah | Urutan fokus logis, elemen interaktif memiliki outline ring fokus yang terlihat jelas | **P1** |
| **TC-A11Y-03** | Ukuran Target Sentuh | Uji semua tombol dan icon di mobile view | Semua target klik memiliki dimensi area sentuh minimal 48 x 48 px | **P1** |
| **TC-A11Y-04** | Ketiadaan Aset 404 | Periksa seluruh URL gambar yang digunakan dalam komponen | Semua file fisik gambar terverifikasi ada di folder `public/image/` | **P0** |

---

## 5. Klasifikasi Tingkat Keparahan Cacat (*Defect Severity Matrix*)

| Tingkat Keparahan | Deskripsi | SLA Resolusi | Contoh Kasus |
| :--- | :--- | :--- | :--- |
| **P0 — Blocker** | Kerusakan kritis yang menghalangi reservasi atau membuat situs tidak dapat diakses. | Harus segera diperbaiki sebelum rilis | Tombol WA tidak bisa diklik, halaman blank/500 error, kalkulator harga NaN. |
| **P1 — Critical** | Fitur penting gagal berfungsi tetapi masih ada alternatif jalan keluar (*workaround*). | < 24 Jam | Lightbox galeri macet, harga kamar salah hitung, link anchor navbar salah target. |
| **P2 — Major** | Masalah antarmuka/tata letak yang mengganggu kenyamanan pengguna di viewport tertentu. | < 3 Hari | Teks kepotong di layar kecil 360px, gambar tidak sejajar, scroll horizontal bocor. |
| **P3 — Minor** | Ketidaksempurnaan kosmetik kecil atau saran peningkatan estetika. | Sprint berikutnya | Typo minor pada deskripsi fasilitas, sedikit ketidaksesuaian padding. |

---

## 6. Kriteria Kelulusan Rilis (*Definition of Done / DoD*)

Sebuah versi atau perubahan kode dinyatakan **LULUS QA & SIAP PRODUKSI** apabila memenuhi seluruh kondisi berikut:
1. ✅ **Zero P0 & Zero P1 Bugs:** Tidak ada cacat berstatus Blocker atau Critical yang masih terbuka.
2. ✅ **Automated QA Audit Passed (100%):** Skrip `npm run test:qa` lolos tanpa kegagalan pada seluruh modul (Integritas Link, Schema JSON-LD, Endpoint API, dan Validasi File Aset).
3. ✅ **Build Produksi Sukses:** Perintah `npm run build` berjalan dengan exit code 0 tanpa error fatal.
4. ✅ **Akurasi Nomor & Teks WhatsApp:** Nomor WhatsApp terverifikasi ke `08122729637` dengan parameter teks reservasi yang rapi.
5. ✅ **Verifikasi Lintas Perangkat:** Tampilan rapi tanpa overflow horizontal pada mobile (360px–412px) dan desktop (> 1024px).
