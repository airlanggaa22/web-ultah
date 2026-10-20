# PRD — Website Ulang Tahun Romantis Interaktif

> **Kode proyek:** `Our-Birthday-Story`
> **Versi:** 1.0 · **Tanggal:** 20 Oktober 2026
> **Jenis:** Single-page experience (scroll + tap berbasis "chapter")
> **Platform utama:** Mobile-first (HP pasangan), tetap bagus di desktop

---

## 1. Ringkasan Produk

Sebuah website kejutan ulang tahun untuk pasangan yang terasa seperti **film pendek interaktif**: dibuka dengan hadiah misterius, diikuti cerita kenangan, surat cinta, tiup lilin, kembang api berbentuk hati, lalu ditutup dengan pesan penutup yang manis. Setiap layar punya animasi, suara, dan interaksi sentuh supaya penerima merasa *terlibat*, bukan sekadar membaca.

**One-liner:** *"Bukan sekadar ucapan, tapi pengalaman kecil yang dibuat khusus untuknya."*

### 1.1 Tujuan
1. Membuat penerima **terkejut, tersentuh, dan tersenyum** dalam 3–5 menit.
2. Menampilkan UI/UX yang **estetik, halus (smooth), dan terasa premium**.
3. Mudah dipersonalisasi (nama, foto, pesan, tanggal) hanya lewat **satu file konfigurasi**.
4. Ringan dan lancar di HP kelas menengah (target 60 fps).

### 1.2 Non-Tujuan
- Bukan platform multi-user / SaaS.
- Tidak ada login, database, atau backend wajib (opsional untuk fitur guestbook).

### 1.3 Target Pengguna
| Persona | Deskripsi |
|---|---|
| **Penerima (utama)** | Pasangan yang berulang tahun. Membuka link di HP, kemungkinan besar lewat WhatsApp/IG. |
| **Pembuat (sekunder)** | Kamu. Ingin edit konten cepat tanpa mengubah banyak kode. |

---

## 2. Hasil Riset

### 2.1 Pola yang umum di website ulang tahun romantis
Dari penelusuran proyek open-source (GitHub topic *romantic-website*, *birthday-gift*) dan template berbayar, pola fitur yang paling sering muncul:

- Galeri foto, surat cinta, dan confetti sebagai trio fitur utama.
- Halaman kembang api dengan pesan berbentuk hati di latar gelap (template populer).
- Musik, photo book, countdown kenangan, dan halaman rahasia/easter egg.
- Konsep **"unlock" lewat mini game klik** sebelum halaman perayaan muncul (meningkatkan rasa penasaran).
- Pendekatan visual romantis yang **elegan, bukan kekanak-kanakan**.

### 2.2 Celah yang bisa dimanfaatkan (diferensiasi)
Kebanyakan template hanya satu halaman statis + confetti. Website ini unggul dengan:
1. **Narasi bertahap** (chapter) dengan transisi sinematik.
2. **Interaksi bermakna** (tiup lilin lewat mic, tap untuk meluncurkan kembang api, geser untuk membuka surat).
3. **Kembang api bentuk hati + nama** sebagai klimaks.
4. **Personalisasi mudah** lewat `config.js`.

### 2.3 Temuan teknis penting
| Temuan | Implikasi pada desain |
|---|---|
| `canvas-confetti` ringan dan tetap lancar meski partikel banyak; efek berbasis canvas dengan `pointer-events: none` memungkinkan halaman tetap bisa diklik. | Gunakan canvas overlay transparan untuk confetti & hati. |
| Di perangkat mobile, partikel berlebih menurunkan fps secara drastis; rekomendasi umum membatasi sekitar **150 partikel** per efek di HP. | Terapkan **particle budget** adaptif (lihat §8). |
| Wajib menghormati `prefers-reduced-motion`; hindari warna berkedip cepat yang berisiko memicu kejang fotosensitif. | Sediakan mode animasi ringan + tombol "Kurangi animasi". |
| Library confetti punya opsi `disableForReducedMotion`. | Aktifkan, dan siapkan fallback fade sederhana. |
| Browser memblokir autoplay audio tanpa interaksi pengguna. | Layar pembuka **"Ketuk untuk membuka hadiah"** sekaligus menjadi gesture untuk memutar musik. |

> Catatan: angka partikel dan opsi library di atas berasal dari panduan publik (OpenReplay, dokumentasi canvas-confetti, diskusi komunitas). Verifikasi ulang performa di perangkat nyata saat QA.

---

## 3. Konsep & Arah Desain

### 3.1 Tema
**"Midnight Romance"** — langit malam, bintang, cahaya hangat, dan kembang api. Nuansa elegan, lembut, sinematik.

### 3.2 Palet Warna
| Peran | Nama | Hex |
|---|---|---|
| Background utama | Midnight Plum | `#14061F` |
| Background gradien | Deep Rose Night | `#2A0B33` → `#4A1245` |
| Aksen utama | Rose Pink | `#FF5C8A` |
| Aksen sekunder | Soft Blush | `#FFB3C7` |
| Highlight emas | Champagne Gold | `#F6D7A7` |
| Teks utama | Warm White | `#FFF4F0` |
| Teks sekunder | Mauve Mist | `#CDB4DB` |

Gunakan efek **glassmorphism** lembut (blur + border tipis) untuk kartu dan teks surat.

### 3.3 Tipografi
| Penggunaan | Font | Fallback |
|---|---|---|
| Judul / nama | **Playfair Display** (serif elegan) | Georgia, serif |
| Tulisan tangan (surat, caption) | **Dancing Script** atau **Caveat** | cursive |
| Teks isi / UI | **Poppins** atau **Inter** | system-ui, sans-serif |

### 3.4 Prinsip Gerak (Motion Design)
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (halus, "mahal").
- **Durasi:** mikro-interaksi 150–250 ms, transisi layar 600–900 ms, momen klimaks 2–4 s.
- **Stagger:** teks muncul per kata/huruf (delay 40–80 ms).
- **Satu fokus per layar:** hanya satu animasi utama, sisanya ambient.
- **Haptic** (`navigator.vibrate`) pada momen penting di perangkat yang mendukung.

---

## 4. Alur Pengalaman (User Journey)

```
[0] Loading  →  [1] Gate "Buka Hadiah"  →  [2] Intro Countdown/Teka-teki
      →  [3] Ucapan Utama  →  [4] Timeline Kenangan  →  [5] Galeri Foto
      →  [6] Surat Cinta  →  [7] 10 Alasan Aku Sayang Kamu (kartu)
      →  [8] Kue & Tiup Lilin  →  [9] Kembang Api Hati (Klimaks)
      →  [10] Pesan Penutup + Secret Page
```

### Detail per Chapter

#### [0] Loading Screen
- Hati berdenyut (SVG path draw) + teks *"Sebentar ya, ada yang spesial…"*
- Preload aset kritis (font, 1–2 foto pertama, audio ringan). Maks 2 detik terasa.

#### [1] Gate — "Ketuk untuk Membuka Hadiah"
- Kotak hadiah 3D/ilustrasi dengan pita yang bergoyang pelan, partikel bintang ambient.
- **Ketuk/tahan** → pita terlepas, kotak terbuka, cahaya memancar.
- Fungsi teknis: **gesture pertama** untuk memulai musik latar (hindari blokir autoplay).
- Opsi kecil: ikon 🔊/🔇 muncul setelah ini.

#### [2] Intro / Teka-teki (opsional, dapat dimatikan di config)
- Mini interaksi: *"Tangkap 5 hati yang jatuh"* atau *"Masukkan tanggal jadian kita"*.
- Berhasil → transisi ke ucapan. Salah → hint lucu (tidak menghukum).

#### [3] Ucapan Utama
- Teks besar muncul per huruf: **"Happy Birthday, {Nama} 🤍"**.
- Hati-hati kecil naik dari bawah (floating hearts), parallax mengikuti sentuhan/gyro.
- Tombol **"Lanjut ✨"** berdenyut halus.

#### [4] Timeline Kenangan
- Garis vertikal yang "tergambar" saat scroll; tiap titik = momen (tanggal, judul, deskripsi singkat, foto).
- Scroll-triggered reveal, kartu masuk bergantian kiri/kanan.

#### [5] Galeri Foto
- Layout **polaroid** berserakan yang bisa **di-swipe/drag**, atau carousel 3D.
- Tap foto → lightbox dengan caption tulisan tangan + efek hati kecil.
- Maks 12 foto, lazy-load, format WebP.

#### [6] Surat Cinta
- **Amplop** yang dibuka dengan geser/tap, surat keluar, teks mengetik (typewriter) dengan kursor lembut.
- Latar kertas tekstur halus + segel lilin berbentuk hati.
- Tombol "Baca lagi" dan "Lewati animasi".

#### [7] "Alasan Aku Sayang Kamu"
- Tumpukan kartu seperti Tinder: **swipe kanan** untuk kartu berikutnya.
- Setiap kartu memicu mikro-animasi hati. Total 5–10 kartu.
- Kartu terakhir: *"Dan masih banyak lagi yang belum sempat kutulis…"*

#### [8] Kue & Tiup Lilin
- Kue ilustrasi SVG/CSS dengan lilin menyala (api bergoyang).
- **Interaksi:** *"Make a wish, lalu tiup!"*
  - Mode utama: **tiup ke mikrofon** (Web Audio API, deteksi amplitudo).
  - Fallback otomatis: **ketuk & tahan / swipe** bila mic ditolak.
- Lilin padam → asap tipis, confetti emas, suara "pop" lembut → transisi ke klimaks.

#### [9] ✨ Klimaks — Kembang Api Hati
- Layar jadi langit malam. Roket meluncur dari bawah.
- **Urutan:**
  1. Beberapa kembang api acak (warna palet).
  2. Satu ledakan besar membentuk **hati**.
  3. Partikel menyusun teks **"{Nama} ♥"** lalu jatuh perlahan seperti bintang.
- **Interaktif:** setiap **tap** meluncurkan kembang api ke titik sentuh; **tahan** = rentetan; tombol **"Hati besar 💖"**.
- Musik naik, haptic ringan, hindari flash putih penuh layar.

#### [10] Pesan Penutup & Secret Page
- Kalimat penutup personal + counter *"Kita sudah bersama X hari"* (live).
- Tombol: **Putar ulang**, **Kirim balasan** (membuka WhatsApp dengan teks siap kirim), **Rahasia 🤫**.
- **Secret page:** terbuka dengan ketukan 5× pada hati kecil / mengetik kata sandi → video/pesan suara/foto kejutan.

---

## 5. Kebutuhan Fungsional

### 5.1 Prioritas (MoSCoW)

| ID | Fitur | Prioritas |
|---|---|---|
| F-01 | Loading screen & preload aset | Must |
| F-02 | Gate buka hadiah + start musik | Must |
| F-03 | Ucapan utama animasi teks + floating hearts | Must |
| F-04 | Timeline kenangan (scroll reveal) | Must |
| F-05 | Galeri foto interaktif + lightbox | Must |
| F-06 | Surat cinta (amplop + typewriter) | Must |
| F-07 | Tiup lilin (mic + fallback) | Must |
| F-08 | Kembang api interaktif + bentuk hati + teks nama | Must |
| F-09 | Musik latar, tombol mute/unmute | Must |
| F-10 | Konfigurasi konten via `config.js` | Must |
| F-11 | Kartu "Alasan Aku Sayang Kamu" (swipe) | Should |
| F-12 | Mini game / teka-teki pembuka | Should |
| F-13 | Secret page + easter egg | Should |
| F-14 | Counter hari bersama (live) | Should |
| F-15 | Tombol balas via WhatsApp | Should |
| F-16 | Efek parallax gyroscope / mouse | Could |
| F-17 | Kursor hati mengikuti pointer (desktop) | Could |
| F-18 | Guestbook / pesan dari teman (butuh backend) | Won't (v1) |

### 5.2 Konfigurasi Konten (`config.js`)

```js
export const CONFIG = {
  recipientName: "Sayang",
  senderName: "Aku",
  birthday: "2026-10-20",
  relationshipStart: "2024-02-14",
  music: { src: "/audio/bgm.mp3", volume: 0.5, loop: true },
  letter: { title: "Untuk kamu…", body: "Isi surat di sini…" },
  timeline: [
    { date: "2024-02-14", title: "Awal kita", text: "…", photo: "/img/01.webp" }
  ],
  reasons: ["Senyummu", "Caramu peduli", "…"],
  gallery: [{ src: "/img/02.webp", caption: "Hari itu 🤍" }],
  secret: { password: "kita", message: "…", media: "/img/secret.webp" },
  features: { miniGame: true, micBlow: true, secretPage: true }
};
```

---

## 6. Kebutuhan UI/UX

### 6.1 Prinsip
1. **Mobile-first**, area sentuh minimal **44×44 px**.
2. **Satu aksi utama per layar**, tombol besar dan jelas.
3. **Selalu ada jalan keluar:** tombol Lewati animasi, Mute, dan Kurangi animasi.
4. **Feedback instan:** setiap tap menghasilkan respons visual ≤100 ms.
5. **Emosi sebelum informasi:** teks pendek, ritme baca santai.

### 6.2 Komponen UI
- Tombol utama: pill, gradien rose→blush, glow lembut, ripple saat tap.
- Kartu kaca (glass card): `backdrop-filter: blur(16px)`, border 1px putih 15%.
- Indikator progres: titik kecil/hati di bawah (chapter ke-n dari 10).
- Toggle suara & kurangi animasi: pojok kanan atas, ikon kecil semi-transparan.
- Kursor kustom hati (desktop saja).

### 6.3 Responsif
| Breakpoint | Perilaku |
|---|---|
| ≤ 480 px | Layout 1 kolom, font fluid (`clamp`), partikel dikurangi |
| 481–1024 px | Tablet, galeri 2 kolom |
| ≥ 1025 px | Desktop, timeline zig-zag, parallax mouse |

Dukungan orientasi: potret utama; landscape tetap layak (kembang api & lilin disesuaikan).

---

## 7. Aksesibilitas
- Hormati `prefers-reduced-motion`: ganti animasi berat dengan fade; kembang api menjadi statis/ringan.
- **Tidak ada kedipan >3 kali/detik**; hindari flash putih layar penuh.
- Kontras teks minimal WCAG AA (4.5:1).
- Semua gambar punya `alt`; tombol punya `aria-label`.
- Navigasi keyboard + fokus terlihat (desktop).
- Musik **tidak** auto-play sebelum ada interaksi; kontrol suara selalu tersedia.
- Izin mikrofon diminta **hanya** saat chapter lilin, dengan penjelasan ramah dan fallback tanpa mic.

---

## 8. Kebutuhan Non-Fungsional

### 8.1 Performa
| Metrik | Target |
|---|---|
| First Contentful Paint | < 1.5 s (4G) |
| Largest Contentful Paint | < 2.5 s |
| Frame rate animasi | ≥ 55 fps di HP kelas menengah |
| Total bobot awal | < 1.5 MB (aset kritis), total < 8 MB |
| Format gambar | WebP/AVIF, lebar maks 1280 px |
| Audio | MP3/AAC ≤ 2 MB, 128 kbps |

### 8.2 Particle Budget Adaptif
- Deteksi: `navigator.hardwareConcurrency`, lebar layar, dan FPS runtime.
- Default HP: **≤150 partikel** per ledakan; desktop: ≤400.
- Bila FPS < 40 selama 1 detik → otomatis turunkan jumlah partikel & matikan efek blur.
- Jeda render saat tab tidak aktif (`visibilitychange`).
- Canvas overlay: `pointer-events: none`, `will-change: transform`.

### 8.3 Kompatibilitas
- iOS Safari 15+, Chrome Android 100+, Chrome/Edge/Firefox/Safari desktop versi terbaru.
- Uji khusus Safari (perilaku Canvas & audio berbeda).
- **In-app browser** WhatsApp/Instagram: sediakan peringatan *"Buka di browser untuk pengalaman terbaik"* bila mic/fitur dibatasi.

### 8.4 Keamanan & Privasi
- Tanpa tracking pihak ketiga. Foto & pesan bersifat pribadi.
- Opsi **password gate** ringan di awal (client-side) dan `noindex, nofollow` agar tidak muncul di mesin pencari.
- Mikrofon hanya diproses lokal; **tidak direkam/dikirim**.

---

## 9. Rekomendasi Teknologi

### 9.1 Stack yang disarankan (pilih satu)

| Opsi | Stack | Cocok untuk |
|---|---|---|
| **A (Direkomendasikan)** | **Vite + Vanilla JS/TS + GSAP + canvas-confetti + custom canvas fireworks** | Ringan, kontrol penuh, cepat |
| B | React + Vite + Framer Motion + Tailwind | Nyaman bila terbiasa React |
| C | Satu file HTML/CSS/JS | Paling cepat jadi, tanpa build |

### 9.2 Library
| Kebutuhan | Pilihan |
|---|---|
| Animasi timeline/scroll | **GSAP** + ScrollTrigger |
| Confetti | **canvas-confetti** (`disableForReducedMotion: true`) |
| Kembang api | Custom canvas (kontrol bentuk hati/teks) atau `fireworks-js` |
| Bentuk hati | Persamaan parametrik hati: `x=16sin³t`, `y=13cost−5cos2t−2cos3t−cos4t` |
| Teks jadi partikel | Sampling piksel dari canvas teks offscreen |
| Audio | Howler.js atau HTMLAudio + Web Audio API (deteksi tiupan) |
| Ikon/ilustrasi | SVG inline; Lottie opsional untuk aksen (ukuran harus dipantau) |
| Font | Google Fonts (`display=swap`) atau self-host |

### 9.3 Struktur Folder
```
/
├─ index.html
├─ src/
│  ├─ main.js
│  ├─ config.js
│  ├─ styles/ (tokens.css, base.css, chapters.css)
│  ├─ chapters/ (gate, greeting, timeline, gallery, letter, reasons, cake, fireworks, outro)
│  ├─ fx/ (hearts.js, fireworks.js, confetti.js, particles.js)
│  └─ utils/ (audio.js, perf.js, motion.js)
└─ public/ (img/, audio/, favicon)
```

### 9.4 Deployment
- Hosting statis gratis: **Netlify / Vercel / Cloudflare Pages / GitHub Pages**.
- Domain kustom opsional, mis. `happybirthday-nama.netlify.app`.
- Tambahkan **Open Graph** (judul + gambar) agar preview link di WhatsApp cantik.

---

## 10. Ide Detail Efek Visual

| Efek | Deskripsi | Implementasi |
|---|---|---|
| Floating hearts | Hati naik berayun, ukuran & opasitas acak | Canvas / elemen CSS dibatasi 20–30 |
| Bintang berkelip | Latar ambient lembut | CSS keyframes / canvas |
| Cursor/tap trail | Jejak hati kecil mengikuti sentuhan | Canvas, throttle |
| Heart burst on tap | Letupan hati kecil saat tombol ditekan | Partikel 8–12 |
| Typewriter surat | Teks mengetik + jeda di tanda baca | JS timer |
| Pita & kotak hadiah | Ilustrasi SVG beranimasi | GSAP |
| Api lilin | Gerak goyang organik | SVG + CSS |
| Kembang api hati | Titik-titik di kurva hati dengan gravitasi & fade | Canvas custom |
| Hujan kelopak mawar | Pada pesan penutup | Sprite ringan |
| Shooting star | Sesekali melintas di langit | CSS |

---

## 11. Metrik Keberhasilan

| Metrik | Target |
|---|---|
| Penerima menyelesaikan sampai chapter kembang api | ≥ 90% |
| Waktu total pengalaman | 3–5 menit |
| Error JS di konsol | 0 pada alur utama |
| Skor Lighthouse (mobile) | Performance ≥ 85, Accessibility ≥ 95 |
| Reaksi subjektif | Penerima tersenyum/terharu (tujuan utama 😊) |

---

## 12. Rencana Pengerjaan

| Fase | Isi | Estimasi |
|---|---|---|
| 1. Persiapan | Kumpulkan foto, surat, musik, tanggal penting; finalisasi `config.js` | 1 hari |
| 2. Desain | Moodboard, palet, tipografi, wireframe tiap chapter | 1–2 hari |
| 3. Fondasi | Setup proyek, design tokens, layout, navigasi chapter, audio gate | 1 hari |
| 4. Chapter inti | Greeting, timeline, galeri, surat | 2 hari |
| 5. Chapter interaktif | Lilin (mic), kartu swipe, mini game | 2 hari |
| 6. Klimaks | Kembang api hati + teks nama + interaksi tap | 2 hari |
| 7. Polish | Transisi, haptic, secret page, reduced-motion, OG tags | 1–2 hari |
| 8. QA & Deploy | Uji iOS/Android, performa, in-app browser, deploy | 1 hari |

**Total estimasi:** ± 10–12 hari kerja (bisa dipadatkan jadi 3–4 hari untuk versi MVP dengan fitur *Must* saja).

---

## 13. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Autoplay musik diblokir | Tidak ada suara | Gate "ketuk untuk buka" sebagai gesture pertama |
| Mic ditolak / tidak tersedia | Lilin tidak bisa ditiup | Fallback tap/swipe otomatis |
| HP lama patah-patah | Pengalaman buruk | Particle budget adaptif + mode ringan |
| Dibuka di in-app browser WA/IG | Fitur terbatas | Banner saran buka di browser |
| Aset terlalu besar | Loading lama | Kompres WebP, lazy-load, preload selektif |
| Efek terlalu ramai | Mengganggu / tidak nyaman | Satu fokus per layar, tombol Lewati |
| Spoiler (link bocor sebelum waktunya) | Kejutan hilang | Password gate + jadwal buka (tidak bisa dibuka sebelum tanggal/jam) |

---

## 14. Checklist Penerimaan (Definition of Done)

- [ ] Semua chapter *Must* berfungsi di iOS Safari & Chrome Android.
- [ ] Musik mulai setelah gesture pertama; tombol mute berfungsi.
- [ ] Tiup lilin bekerja dengan mic **dan** fallback tanpa mic.
- [ ] Kembang api membentuk hati & nama; tap menghasilkan ledakan baru.
- [ ] FPS stabil ≥ 55 di perangkat uji; tidak ada memory leak setelah putar ulang.
- [ ] `prefers-reduced-motion` menghasilkan versi tenang yang tetap indah.
- [ ] Seluruh konten diganti hanya lewat `config.js`.
- [ ] Preview link (Open Graph) tampil benar di WhatsApp.
- [ ] `noindex` aktif; tidak ada tracker pihak ketiga.
- [ ] Skor Lighthouse mobile sesuai target.

---

## 15. Data yang Perlu Kamu Siapkan

1. Nama panggilan penerima & nama kamu.
2. Tanggal ulang tahun & tanggal jadian.
3. 8–12 foto terbaik (resolusi cukup, boleh berurutan sebagai timeline).
4. Teks surat cinta (150–300 kata) dan 5–10 "alasan sayang".
5. Lagu favorit/latar (pastikan hak pakai; gunakan royalty-free bila akan dipublikasikan).
6. (Opsional) Voice note, video pendek, atau kejutan untuk secret page.
7. Warna/gaya favorit pasangan (bila ingin menyesuaikan palet).

---

## 16. Lampiran — Prompt Siap Pakai untuk Membangun

> Gunakan PRD ini sebagai acuan. Bangun website ulang tahun romantis **mobile-first** dengan Vite + Vanilla JS + GSAP + canvas-confetti + canvas kustom untuk kembang api. Ikuti palet "Midnight Romance", tipografi Playfair Display / Dancing Script / Poppins, dan alur 11 chapter pada dokumen. Prioritaskan fitur **Must** terlebih dahulu, tambahkan particle budget adaptif, dukungan `prefers-reduced-motion`, fallback tiup lilin tanpa mikrofon, dan konfigurasi konten lewat `config.js`. Berikan kode lengkap per file dan instruksi menjalankan serta deploy.
