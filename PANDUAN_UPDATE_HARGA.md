# Panduan Kelola & Update Harga — Grha Vege Jawi Syariah

Panduan ini ditujukan untuk **Ibu Agnesia Hari Kardyantini** (atau pengelola) agar dapat mengubah tarif harga kamar di website secara mandiri tanpa menyentuh kode program.

---

## 1. Format Tabel di Google Sheets

Cukup buat **1 spreadsheet baru** di Google Sheets (misal diberi judul `Harga Grha Vege Jawi`), dengan format kolom sebagai berikut:

| Kategori | Harga | Keterangan (Opsional) |
|---|---|---|
| **Weekday** | 165.000 | Senin - Kamis |
| **Weekend** | 220.000 | Jumat - Minggu |
| **Long Weekend** | 250.000 | Libur Nasional / Cuti |
| **Bulanan** | 1.870.000 | Paket kost bulanan |
| **Promo** | Promo Khusus Mahasiswa Baru | Kosongkan jika tidak ada promo |

> **Catatan Penting Pengisian Angka:**
> - Penulisan angka bebas: bisa `165000`, `165.000`, atau `Rp 165.000`. Sistem website sudah cerdas membaca angka secara otomatis.
> - Baris **Promo** akan muncul sebagai pita/banner pengumuman di atas kartu tarif. Jika dikosongkan, banner promo otomatis tidak tampil.

---

## 2. Cara Mempublikasikan Spreadsheet ke Website (Hanya 1x Saja)

Agar website bisa membaca data harga dari Google Sheets:

1. Di Google Sheets, klik menu **File** (di pojok kiri atas).
2. Pilih **Bagikan (Share)** ➔ **Publikasikan ke web (Publish to the web)**.
3. Di jendela pop-up:
   - Pilih tab **Tautan (Link)**.
   - Ubah pilihan format dari `Halaman Web` menjadi **Nilai yang dipisahkan koma (.csv)**.
4. Klik tombol **Publikasikan (Publish)**.
5. Salin tautan (URL) yang diberikan. Contoh tautan:
   `https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv`
6. Masukkan tautan tersebut ke environment variable Vercel atau file `.env`:
   ```env
   GOOGLE_SHEETS_CSV_URL="https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv"
   ```

---

## 3. Cara Mengubah Harga Sehari-hari

Setelah integrasi aktif, Ibu Agnesia cukup:
1. Buka spreadsheet Google Sheets dari HP atau komputer.
2. Ubah nominal harga yang diinginkan (misal harga Weekend diubah jadi `230.000`).
3. Selesai! Google Sheets akan otomatis menyimpan, dan website akan menampilkan harga baru dalam beberapa menit (mengikuti jeda cache server).

---

## 4. Sistem Keamanan & Pencegah Error (Fail-Safe)

- **Jika Google Sheets offline / terhapus:** Website **TIDAK AKAN PERNAH ERROR ATAU MATI (Error 500)**. Website secara otomatis menggunakan harga cadangan (fallback default) yang sudah tertanam di dalam sistem.
- **Kecepatan Website:** Website tetap dimuat secepat kilat karena menggunakan mekanisme *Server Cache / Stale-While-Revalidate* (data disimpan sementara di cache server selama 5 menit).
