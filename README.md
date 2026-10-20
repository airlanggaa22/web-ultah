# 💖 Website Ulang Tahun Sweet 17 — Naila Cantika Aula Nikmah

Website kejutan ulang tahun romantis dan interaktif bertema **"Midnight Romance"** yang dibangun sesuai dokumen spesifikasi [PRD.md](file:///d:/Airlangga/web%20ultah/PRD.md).

---

## ✨ Fitur Utama yang Disediakan

1. **Chapter 0 — Loading Screen:** Animasi SVG denyut hati bertahap dengan transisi halus.
2. **Chapter 1 — Gate "Buka Hadiah":** Kotak kado 3D interaktif berpita emas, memulai musik romantis dan membuka taburan confetti.
3. **Chapter 2 — Love Catcher Mini-Game:** Tangkap 5 hati cinta untuk membuka kejutan perayaan.
4. **Chapter 3 — Ucapan Utama Sweet Seventeen:** Tipografi megah *"Happy 17th Birthday, Naila Cantika Aula Nikmah 🤍"* dengan badge resmi Chapter 17 & efek partikel berkilau.
5. **Chapter 4 — Timeline Kenangan:** Jejak langkah bermakna (2009 lahirnya bidadari kecil, tumbuh anggun, hingga milestone 17 tahun).
6. **Chapter 5 — SPECIAL FEATURE: Korean Photobox Strip (Life4Cuts Style) 📸:**
   - 4-cut strip foto vertikal khas photo booth Korea.
   - Pilihan frame warna estetik: *Ivory Cream*, *Pastel Pink*, *Midnight Plum*, dan *Film Noir*.
   - Stiker lucu (🎀, 🤍, ✨) serta cap tanggal *"2009.10.20 → 2026.10.20 • SWEET 17 NAILA"*.
   - **Fitur Ganti/Upload Foto Langsung:** Kamu atau Naila bisa mengklik tombol **"📷 Ganti Foto Naila"** untuk memilih 4 foto langsung dari galeri HP/laptop dan langsung muncul di photobox!
   - **Fitur Download Photobox:** Tombol **"📥 Download Photobox Strip"** merender strip menjadi file gambar PNG kualitas tinggi yang langsung tersimpan ke memori perangkat.
   - Dilengkapi Polaroid Memories gallery di bawah strip.
7. **Chapter 6 — Surat Cinta & Segel Lilin:** Amplop dengan segel lilin wax-seal interaktif, efek mengetik (*typewriter*), serta kontrol baca ulang.
8. **Chapter 7 — 10 Alasan Kenapa Naila Begitu Spesial:** Kartu swipe bergaya Tinder yang bisa di-swipe atau disentuh dengan letupan hati.
9. **Chapter 8 — Kue Ulang Tahun & Lilin Sweet 17:** Kue SVG bertingkat dengan topper angka 17 emas. Dilengkapi **deteksi tiupan mikrofon (Web Audio API)** dan **tombol fallback tiup instan**, asap lilin padam, denting bunyi kristal, dan hujan confetti emas.
10. **Chapter 9 — Klimaks Kembang Api Hati & Nama:** Kembang api canvas membentuk lambang **Hati**, letupan partikel nama **"NAILA 17 ♥"**, peluncuran kembang api interaktif setiap kali layar disentuh, tombol hati raksasa, dan mode rentetan.
11. **Chapter 10 — Penutup & Secret Page:** Live counter waktu hidup Naila (hari, jam, dan detik), tombol balas WhatsApp otomatis dengan pesan ucapan manis, dan brankas rahasia (*secret modal*) dengan sandi "naila".

---

## 🚀 Cara Menjalankan Website Secara Lokal

Buka terminal di folder ini, lalu jalankan:

```bash
npm run dev
```

Buka URL yang tampil di terminal (biasanya `http://localhost:3000` atau alamat IP lokal seperti `http://192.168.x.x:3000` untuk dibuka langsung dari HP via WiFi).

---

---

## ⚙️ Cara Paling Mudah: Lewat Panel Admin (`/admin`)

Kamu tidak perlu mengedit kode atau file sama sekali! Cukup buka:
👉 **`http://localhost:3000/admin`**

Di halaman `/admin`, kamu bisa:
1. **Upload langsung foto dari HP atau laptop** untuk 4 Frame Photobox Strip, 3 Foto Timeline Perjalanan, dan 3 Foto Polaroid.
2. Melihat **pratinjau (preview) foto secara langsung**.
3. Klik tombol **"💾 Simpan Semua Foto"** — website utama otomatis langsung menampilkan foto-foto baru tersebut!
4. Ada juga tombol **"📋 Salin Kode Konfigurasi config.js"** jika kamu ingin menyalin kodenya untuk deploy permanen ke Vercel/Netlify.

---

## 🎨 Cara Alternatif: Edit File config.js

Kamu juga bisa mengubah langsung di file konfigurasi:
👉 [`src/config.js`](file:///d:/Airlangga/web%20ultah/src/config.js)

### 2. Mengganti Musik Latar (Lagu Favorit Naila)
- Salin lagu romantis MP3 (misal lagu favorit Naila) ke dalam folder `public/audio/bgm.mp3`.
- Website akan otomatis mendeteksi dan memutar lagu tersebut! *(Jika belum ada file MP3, website sudah dilengkapi synthesizer piano romantis bawaan sehingga lagu selalu berbunyi secara merdu)*.

### 3. Mengubah Nomor WhatsApp untuk Menerima Balasan
- Di file `src/config.js`, pada bagian `sender.whatsappNumber`, ganti dengan nomormu (contoh: `6281234567890` tanpa tanda `+`).

---

## 🚂 Deploy ke Railway

1. Push project ini ke GitHub, lalu buat project baru di [Railway](https://railway.com/).
2. Pilih **Deploy from GitHub repo** dan hubungkan repository ini.
3. Railway akan memasang dependency, menjalankan `npm run build`, lalu menjalankan `npm start`.
4. Setelah deployment berhasil, buka **Settings → Networking → Generate Domain** untuk mendapatkan URL publik.

Server production menyajikan folder `dist` dan otomatis memakai port `PORT` dari Railway. Halaman utama tersedia di `/` dan panel admin di `/admin`.

## 🌐 Alternatif Deploy Online Gratis

1. **Vercel (Paling Mudah):**
   - Jalankan `npm run build`
   - Drag & drop folder `dist/` ke dashboard [vercel.com](https://vercel.com) atau hubungkan ke repository GitHub.
2. **Netlify:**
   - Drag & drop folder `dist/` ke [app.netlify.com/drop](https://app.netlify.com/drop) untuk langsung mendapatkan link online yang bisa langsung dikirim ke WhatsApp Naila!
