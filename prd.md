# PRD — Grha Vege Jawi Syariah
Tanggal: 4 September 2026
Klien: Ibu Agnesia Hari Kardyantini
Paket: Standard (Promo) — Rp 2.000.000
Stack: Astro / TypeScript / Tailwind CSS
Deployment: Vercel

---

## 1. Problem Statement
Grha Vege Jawi Syariah saat ini memiliki profil Google Maps yang kuat (**Rating 4,6 dari 308 ulasan**), namun dulunya hanya mengandalkan Google Business Site (`grha-vege-jawi.business.site` yang kini dinonaktifkan Google) serta OTA (OYO/RedDoorz yang kini ditinggalkan client). Properti membutuhkan website booking langsung independen dengan integrasi Google Sheets agar pemilik (Ibu Agnesia) dapat memperbarui tarif harian & bulanan secara mandiri.

## 2. Goal
Tamu bisa menemukan info lengkap properti (kamar, fasilitas, harga, lokasi, dan bukti ulasan nyata) lalu booking langsung via WA tanpa potongan komisi OTA. Pemilik dapat memperbarui harga kamar dengan mudah via spreadsheet Google Sheets.

## 3. Target User
Pencari kos/penginapan syariah harian & bulanan di sekitar kampus Bantul-Yogyakarta (JEC, UIN, ATMA JAYA) — individu maupun keluarga.
Admin/Pemilik properti (Ibu Agnesia) yang mengelola harga kamar dari HP atau laptop.

## 4. Profil Bisnis Terverifikasi (Data Google Maps)
- **Nama Listing**: Grha Vege Jawi Syariah (Hotel Bintang 2 / Guesthouse)
- **Rating & Ulasan**: ⭐ **4,6 / 5** dari **308 ulasan Google** (dan 4,9/5 di OYO)
- **Alamat Resmi**: Jl. Turonggo No.125, Jaranan, Banguntapan, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55189
- **Plus Code**: `6C53+65 Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta`
- **Koordinat**: `-7.7919649, 110.4029812`
- **URL Google Maps**: [Buka Listing Google Maps](https://www.google.com/maps/place/Grha+Vege+Jawi+Syariah/@-7.7919649,110.4029812,747m/data=!3m2!1e3!4b1!4m9!3m8!1s0x2e7a59f05b3c9853:0xec78eefc19d7a5a8!5m2!4m1!1i2!8m2!3d-7.7919649!4d110.4029812!16s%2Fg%2F11f773xm6s)
- **Waktu Operasional**:
  - Check-in: Mulai 14.00 WIB
  - Check-out: Maksimal 12.00 WIB
- **Jarak Landmark Kunci**:
  - Kebun Binatang Gembira Loka: 2 km (± 5 menit)
  - Museum Affandi: 3 km (± 8 menit)
  - Bandara Internasional Adisutjipto: 5 km (± 10–12 menit)
  - Jogja Expo Center (JEC): Dekat di kawasan Banguntapan (± 5 menit)
- **Catatan Historis & Konsep**:
  - Dahulu memiliki restoran keluarga / vege, kini difokuskan penuh sebagai **penginapan syariah murni** dengan mushola representatif di dalam rumah, suasana hening, bebas rokok, dan amanah khusus pasangan sah/keluarga.

## 5. Fitur & Scope

### In Scope
- [ ] Landing page 1 halaman modern berbasis framework Astro
- [ ] **Social Proof Widget**: Menampilkan badge resmi **Google Rating 4,6★ (308 Ulasan)** & kutipan ulasan tamu asli
- [ ] Galeri foto autentik (kamar, mushola, pantry mini, balkon, parkir mobil di dalam pagar)
- [ ] Deskripsi properti + cerita brand (konsep syariah, tenang, dan higienis)
- [ ] List fasilitas per kamar (AC dingin, wifi fiber, water heater 24 jam, kamar mandi dalam, TV 32", parkir aman)
- [ ] Info 6 kamar (2 lantai bawah, 4 lantai atas), kapasitas 2 orang/kamar, booking fleksibel 1-6 kamar
- [ ] **Kelola Harga Mandiri via Google Sheets**: Ibu Agnesia dapat mengedit harga (weekday, weekend, long weekend, bulanan) langsung di spreadsheet Google Sheets; website otomatis menampilkan harga terbaru
- [ ] Info lokasi presisi: Alamat lengkap Banguntapan Bantul, Plus Code, tombol direct link ke Google Maps
- [ ] Tombol booking WA langsung ke 08122729637
- [ ] Domain grhavegejawi.com + hosting di Vercel
- [ ] Local SEO & Schema Markup `LodgingBusiness` terverifikasi dengan koordinat & rating agregat
- [ ] Tema warna krem-syariah (sesuai identitas properti)

### Out of Scope
- Payment gateway (bukan bagian paket Standard)
- Multi-halaman / bilingual (di luar paket Standard, bisa upsell ke Pro Booking)
- Full CMS untuk teks lain / gambar (foto, fasilitas, deskripsi kamar tetap dikelola di kode/statis)

## 6. User Flow
1. User landing di homepage, melihat hero, badge rating **Google 4,6★ (308 ulasan)**
2. Scroll ke cerita properti & konsep syariah
3. Cek rincian 6 kamar & fasilitas lengkap (water heater, mushola, dapur)
4. Cek skema tarif bersahaja (ter-update otomatis dari Google Sheets)
5. Cek ulasan tamu asli & lokasi strategis di Banguntapan (2 km dari Gembira Loka)
6. Klik tombol booking → WA langsung ke Ibu Agnesia (08122729637)

## 7. Technical Constraints & Architecture
- Framework: Astro (Hybrid / SSR mode dengan `@astrojs/vercel`)
- Styling: Tailwind CSS (menggunakan `@astrojs/tailwind`)
- Bahasa: ID
- CMS Harga: Google Sheets (Published CSV / JSON endpoint dengan fallback hardcoded default)
- Caching: Server-side cache (stale-while-revalidate 5-10 menit) agar cepat & ramah kuota Google
- Payment: Tidak
- Auth: Tidak (akses spreadsheet dibatasi via akun Google Ibu Agnesia)
- Deployment: Vercel
- Domain: grhavegejawi.com

## 8. Acceptance Criteria
- [ ] Website live di grhavegejawi.com (Vercel)
- [ ] PageSpeed score ≥ 90 (mobile & desktop)
- [ ] Badge rating Google Maps 4,6★ (308 ulasan) dan kutipan ulasan terpasang
- [ ] Alamat resmi Jl. Turonggo No.125 Banguntapan dan tombol buka Google Maps berfungsi
- [ ] Semua 6 kamar tercantum dengan harga & kapasitas benar
- [ ] Harga di website berubah saat nilai di Google Sheets diperbarui (setelah TTL cache habis)
- [ ] Jika koneksi Google Sheets terputus, website tetap tampil normal dengan harga fallback (tidak error 500)
- [ ] Tombol WA booking terhubung ke 08122729637
- [ ] Schema.org `LodgingBusiness` memuat data rating 4.6 & koordinat geo valid

## 9. Design Reference
- DESIGN.md: `notion` dari getdesign.md
- Nuansa: Guesthouse lokal/budget dengan nuansa tenang-syariah, clean & minimal
- Warna dasar: krem (surface-canvas: `#FDFBF7`, primary: `#334436`, syariah-gold: `#C89D4B`)

---
*Field bertanda asterisk (*) adalah hasil inferensi — konfirmasi ke klien sebelum development.*