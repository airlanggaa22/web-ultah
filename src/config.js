/**
 * KONFIGURASI UTAMA WEBSITE ULANG TAHUN
 * Semua teks, foto, musik, dan fitur dapat diubah dengan mudah di file ini
 * atau langsung dari halaman Admin di /admin.
 */

export const DEFAULT_CONFIG = {
  // Informasi Penerima
  recipient: {
    fullName: "Naila Cantika Aula Nikmah",
    nickname: "Naila",
    alias: "Cantika",
    birthDate: "2009-10-20", // 20 Oktober 2009
    age: 17,
    title: "Sweet Seventeen",
    zodiac: "Libra ♎"
  },

  // Informasi Pengirim
  sender: {
    name: "Airlangga",
    nickname: "Aku",
    whatsappNumber: "6281234567890" // Ganti dengan nomor WhatsApp kamu untuk menerima balasan
  },

  // Konfigurasi Musik & Suara
  music: {
    src: "/audio/bgm.mp3",
    title: "A Thousand Years / Romantic Melody",
    volume: 0.6,
    loop: true
  },

  // Chapter 2: Mini Game / Teka-teki Pembuka
  miniGame: {
    enabled: true,
    title: "Tangkapan Hati untuk Naila 🤍",
    description: "Sebelum membuka kejutan Sweet 17, tangkap 5 hati cinta yang melayang!",
    targetHearts: 5,
    celebrationText: "Hore! Kamu berhasil mengumpulkan semua cintaku! ✨"
  },

  // Chapter 4: Timeline Kenangan Manis (3 Foto)
  timeline: [
    {
      year: "2009",
      date: "20 Oktober 2009",
      title: "Lahirnya Bidadari Kecil 🌸",
      desc: "Hari paling istimewa di mana seorang bidadari manis bernama Naila Cantika Aula Nikmah terlahir ke dunia, membawa senyum bagi semua orang.",
      tag: "The Beginning",
      photo: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80"
    },
    {
      year: "Growing Up",
      date: "Hari demi Hari",
      title: "Tumbuh Menjadi Gadis yang Luar Biasa ✨",
      desc: "Setiap langkah dan proses yang kamu lalui membentuk kamu jadi pribadi yang begitu anggun, penyayang, pintar, dan berhati tulus.",
      tag: "Graceful Heart",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
    },
    {
      year: "2026",
      date: "20 Oktober 2026",
      title: "Chapter 17: Sweet Seventeen 🎂",
      desc: "Hari ini, lembaran baru berusia 17 tahun resmi terbuka untukmu. Usia yang penuh harapan indah, mimpi besar, dan senyum yang kian bersinar.",
      tag: "Milestone",
      photo: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80"
    }
  ],

  // Chapter 5: SPESIAL PHOTOBOX STRIP (4 Foto)
  photobox: {
    title: "Naila's Sweet 17 Photobox ✨",
    subtitle: "Korean Photo Booth Strip Edition",
    dateStamp: "2026.10.20 • SWEET 17",
    tagline: "NAILA CANTIKA • FOREVER CHERISHED",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
        caption: "Senyum Manis Naila 🤍"
      },
      {
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
        caption: "Matahari Terindah ☀️"
      },
      {
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
        caption: "Tawa Paling Renyah ✨"
      },
      {
        url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
        caption: "Sweet 17 Queen 👑"
      }
    ],
    stickers: ["🎀", "✨", "🤍", "🌷", "🍒", "🎂"]
  },

  // Chapter 5 (Bagian 2): Polaroid Memories (3 Foto)
  polaroids: [
    {
      src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
      caption: "Momen favorit bersamamu 💫",
      rotate: "-3deg"
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80",
      caption: "Senyummu selalu bikin hari lebih cerah 🌸",
      rotate: "4deg"
    },
    {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&auto=format&fit=crop&q=80",
      caption: "Tetap jadi Naila yang ceria ya! 🤍",
      rotate: "-2deg"
    }
  ],

  // Chapter 6: Surat Cinta Romantis
  letter: {
    title: "Surat Khusus untuk Naila Cantika 💌",
    body: `Hai Naila Cantika Aula Nikmah tercinta,

Selamat ulang tahun yang ke-17 ya, bidadari kecilku! ✨

Di usiamu yang kini menginjak Sweet Seventeen, aku cuma mau bilang betapa bersyukurnya aku bisa mengenalmu dan menjadi bagian dari ceritamu. Kehadiranmu bagaikan cahaya hangat yang selalu menenangkan dan membuat hari-hari biasa terasa begitu istimewa.

Terima kasih sudah lahir ke dunia ini pada tanggal 20 Oktober 2009. Terima kasih sudah tumbuh menjadi perempuan yang begitu kuat, manis, sabar, dan penuh kebaikan. Senyummu adalah hal yang paling berharga bagiku.

Di usia 17 tahun ini, semoga semua doa dan impian terbesarmu satu per satu terwujud. Semoga kamu selalu dikelilingi kebahagiaan, kesehatan, cinta yang tulus, dan orang-orang yang menghargaimu sepenuhnya. Apapun fase yang akan kamu hadapi di masa depan, ingat ya... aku akan selalu ada di sini untuk mendukung dan menyayangimu.

Happy Sweet Seventeen, Naila Cantika Aula Nikmah! 🤍

Dengan segenap rasa sayang,
Airlangga`
  },

  // Chapter 7: 10 Alasan Aku Sayang Naila (Swipe Cards)
  reasons: [
    "Senyum manismu yang selalu bisa mencairkan hari yang melelahkan.",
    "Caramu menatap dengan tulus yang selalu bikin hatiku tenang.",
    "Tawa manismu yang renyah dan selalu menular ke siapa saja di sekitarmu.",
    "Kebaikan hatimu yang selalu peduli pada hal-hal kecil.",
    "Semangatmu saat bercerita tentang hal-hal yang kamu sukai.",
    "Nama indahmu: Naila Cantika Aula Nikmah, secantik orang dan hatinya.",
    "Ketulusanmu dalam menerima dan memahami orang lain.",
    "Kehangatan yang kamu berikan setiap kali kita bertukar kabar.",
    "Caramu membuatku selalu ingin menjadi pribadi yang lebih baik.",
    "Karena kamu adalah Naila — bidadari teristimewa di Sweet 17 ini! 💖"
  ],

  // Chapter 8: Kue Ulang Tahun & Lilin
  cake: {
    candles: 17,
    instruction: "Pejamkan mata, make a wish dalam hati... lalu tiup lilinnya! 🕯️✨",
    blownSuccessText: "Yaaay! Lilinnya padam! Semoga semua harapan indah Naila terkabul! 🎉"
  },

  // Chapter 9: Kembang Api Spektakuler Hati
  fireworks: {
    targetText: "NAILA 17 ♥",
    colors: ["#FF5C8A", "#FFB3C7", "#F6D7A7", "#FFF4F0", "#CDB4DB", "#FF8FA3"]
  },

  // Chapter 10: Pesan Penutup & Secret Page
  outro: {
    finalWish: "Selamat Melangkah di Usia 17 Tahun, Naila Cantika! Semoga dunia selalu memperlakukanmu dengan lembut dan penuh cinta. 🤍",
    secretPassword: "naila",
    secretMessage: "Pesan Rahasia: Kamu tahu nggak? Dari jutaan bintang di langit, cuma satu yang cahayanya paling indah di mataku... yaitu kamu, Naila Cantika Aula Nikmah. I love you more than words can say! 💍✨",
    whatsappTemplate: "Hai Airlangga! Makasih banyaaak ya buat web ultah Sweet 17-nya, aku suka dan terharu banget liatnya! 🥺💖 Terutama photobox dan kembang apinya!"
  }
};

/**
 * Helper untuk menggabungkan default config dengan data localStorage (jika ada editan dari /admin)
 */
function getActiveConfig() {
  try {
    const saved = localStorage.getItem('NAILA_BDAY_CONFIG');
    if (!saved) return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    const parsed = JSON.parse(saved);
    return {
      ...DEFAULT_CONFIG,
      ...parsed,
      recipient: { ...DEFAULT_CONFIG.recipient, ...(parsed.recipient || {}) },
      sender: { ...DEFAULT_CONFIG.sender, ...(parsed.sender || {}) },
      music: { ...DEFAULT_CONFIG.music, ...(parsed.music || {}) },
      miniGame: { ...DEFAULT_CONFIG.miniGame, ...(parsed.miniGame || {}) },
      photobox: {
        ...DEFAULT_CONFIG.photobox,
        ...(parsed.photobox || {}),
        photos: parsed.photobox?.photos || DEFAULT_CONFIG.photobox.photos
      },
      timeline: parsed.timeline || DEFAULT_CONFIG.timeline,
      polaroids: parsed.polaroids || DEFAULT_CONFIG.polaroids,
      letter: { ...DEFAULT_CONFIG.letter, ...(parsed.letter || {}) },
      reasons: parsed.reasons || DEFAULT_CONFIG.reasons,
      cake: { ...DEFAULT_CONFIG.cake, ...(parsed.cake || {}) },
      fireworks: { ...DEFAULT_CONFIG.fireworks, ...(parsed.fireworks || {}) },
      outro: { ...DEFAULT_CONFIG.outro, ...(parsed.outro || {}) }
    };
  } catch (err) {
    console.warn('Gagal membaca saved config:', err);
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  }
}

export const CONFIG = getActiveConfig();

/**
 * Menyimpan konfigurasi baru ke localStorage
 */
export function saveCustomConfig(newConfig) {
  localStorage.setItem('NAILA_BDAY_CONFIG', JSON.stringify(newConfig));
}

/**
 * Menghapus konfigurasi kustom dan mengembalikan ke setelan awal
 */
export function resetCustomConfig() {
  localStorage.removeItem('NAILA_BDAY_CONFIG');
}
