/**
 * CHAPTER 10: PESAN PENUTUP, LIVE COUNTER, SECRET PAGE & EASTER EGG RIDDLE
 * - Counter waktu hidup Sweet 17 Naila (sejak 20 Oktober 2009)
 * - Tombol Replay / Putar Ulang
 * - Halaman Rahasia (Secret Page) via kata sandi "naila"
 * - EASTER EGG TEKA-TEKI: Membocorkan bahwa ada hadiah/kado nyata yang akan diberikan pada Selasa, 27 Oktober!
 * - Tombol Balas WhatsApp dengan teks manis siap kirim
 */

import { CONFIG } from '../config.js';
import { sounds } from '../fx/audio-synth.js';
import confetti from 'canvas-confetti';

export function renderOutro(container) {
  const oData = CONFIG.outro;
  const r = CONFIG.recipient;
  const s = CONFIG.sender;

  const section = document.createElement('section');
  section.className = 'chapter';
  section.id = 'chapter-outro';

  section.innerHTML = `
    <span class="section-badge">Forever & Always 🤍</span>
    <h2 class="section-title gradient-text">Terima Kasih Telah Hadir</h2>
    <p class="section-subtitle">${oData.finalWish}</p>

    <!-- Sweet 17 Live Journey Counter -->
    <div class="sweet17-counter-card">
      <div class="counter-box">
        <div class="counter-num" id="counter-days">6209</div>
        <div class="counter-label">Hari Indah</div>
      </div>
      <div class="counter-box">
        <div class="counter-num" id="counter-hours">148k</div>
        <div class="counter-label">Jam Senyum</div>
      </div>
      <div class="counter-box">
        <div class="counter-num" id="counter-seconds">8.9M</div>
        <div class="counter-label">Detik Bahagia</div>
      </div>
    </div>

    <!-- Actions, Easter Egg & Secret Buttons -->
    <div style="margin-top: 30px; display: flex; flex-direction: column; align-items: center; gap: 14px; width: 100%;">
      <!-- WhatsApp Reply -->
      <a href="https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent(oData.whatsappTemplate)}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="font-size: 1rem; width: 100%; max-width: 320px;">
        💬 Kirim Balasan ke WhatsApp
      </a>

      <!-- Easter Egg Enigma Button (Subtle & Mysterious) -->
      <button class="btn-primary" id="btn-open-easter-egg" style="background: linear-gradient(135deg, #8c1d40, #4a1245); border: 1px solid rgba(246, 215, 167, 0.4); font-size: 0.95rem; width: 100%; max-width: 320px; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);">
        🗝️ Buka Peti Enigma Terkunci 🔒
      </button>

      <div style="display: flex; gap: 10px; width: 100%; max-width: 320px; justify-content: center;">
        <button class="btn-secondary" id="btn-replay-experience" style="flex: 1;">
          🔄 Putar Ulang
        </button>
        <button class="btn-secondary" id="btn-open-secret" style="flex: 1; border-color: rgba(246, 215, 167, 0.4); color: var(--highlight-gold);">
          🔒 Pesan Rahasia
        </button>
      </div>
    </div>

    <!-- 1. SECRET PASSWORD MODAL -->
    <div class="modal-overlay" id="secret-modal-overlay">
      <div class="glass-card modal-content">
        <span class="section-badge">Secret Vault 🔒</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: #FFF; margin-bottom: 10px;">
          Pesan Rahasia untuk Naila
        </h3>
        
        <div id="secret-lock-stage">
          <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 16px;">
            Masukkan kata sandi rahasia untuk membuka pesan ini (Petunjuk: nama panggilanmu huruf kecil)
          </p>
          <input type="text" id="secret-password-input" placeholder="Masukkan kata sandi..." style="width: 80%; padding: 12px 16px; border-radius: 999px; background: rgba(255,255,255,0.1); border: 1px solid var(--glass-border); color: #fff; font-size: 1rem; text-align: center; margin-bottom: 16px; outline: none;">
          <div>
            <button class="btn-primary" id="btn-unlock-secret">Buka Pesan ✨</button>
          </div>
        </div>

        <div id="secret-unlocked-stage" style="display: none; padding-top: 10px;">
          <p class="cursive-text" style="font-size: 1.5rem; color: var(--accent-blush); line-height: 1.6; margin-bottom: 20px;">
            "${oData.secretMessage}"
          </p>
          <button class="btn-primary" id="btn-close-secret">Tutup 🤍</button>
        </div>

        <div style="margin-top: 16px;">
          <button class="btn-secondary" id="btn-cancel-secret" style="font-size: 0.8rem; padding: 6px 16px;">Batal</button>
        </div>
      </div>
    </div>

    <!-- 2. EASTER EGG RIDDLE MODAL (HADIAH TANGGAL 27 SELASA) -->
    <div class="modal-overlay" id="easter-egg-modal-overlay">
      <div class="glass-card riddle-modal-content">
        <span class="section-badge" style="background: rgba(246, 215, 167, 0.2); color: var(--highlight-gold); border-color: rgba(246, 215, 167, 0.4);">
          Secret Mission • Enigma Box 🗝️
        </span>
        <h3 style="font-family: var(--font-serif); font-size: 1.45rem; color: #FFF; margin: 10px 0 4px;">
          Teka-Teki Sandi Tersembunyi
        </h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 12px;">
          Ada sebuah rahasia besar yang belum terungkap di hari ulang tahunmu. Pecahkan 3 teka-teki sandi ini untuk membuka petinya!
        </p>

        <!-- Step Indicator -->
        <div class="riddle-progress-bar">
          <div class="riddle-step-indicator active" id="riddle-dot-1">1</div>
          <div class="riddle-step-indicator" id="riddle-dot-2">2</div>
          <div class="riddle-step-indicator" id="riddle-dot-3">3</div>
        </div>

        <!-- STAGE 1: TANGGAL -->
        <div class="riddle-card-body" id="riddle-stage-1">
          <div class="riddle-question-title">
            <span>🧩</span> Sandi I: Persamaan Rahasia
          </div>
          <p class="riddle-question-text">
            "Aku adalah angka tanggal di masa depan yang menanti kehadiranmu. Untuk menemukanku, hitunglah persamaan cinta ini:<br>
            • Ambil tanggal lahir bahagiamu (<strong>...</strong>)<br>
            • Tambahkan dengan jumlah huruf dalam nama panggilanmu <strong>'NAILA'</strong> (<strong>...</strong>)<br>
            • Dan tambahkan dengan sepasang mata manismu (<strong>...</strong>)<br>
            Berapakah angka sandi yang kamu dapatkan?"
          </p>
          <div class="riddle-input-wrap">
            <input type="text" class="riddle-text-input" id="riddle-input-1" placeholder="Ketik hasil angka sandi..." autocomplete="off">
            <button class="btn-primary" id="riddle-submit-1" style="padding: 10px 20px;">Buka Kunci</button>
          </div>
          <button class="riddle-hint-toggle" id="hint-btn-1">💡 Butuh petunjuk?</button>
          <div class="riddle-hint-content" id="hint-content-1">
            Petunjuk: Tanggal Lahir (20) + Jumlah huruf N-A-I-L-A (5) + Sepasang Mata (2) = ... ?
          </div>
        </div>

        <!-- STAGE 2: HARI -->
        <div class="riddle-card-body" id="riddle-stage-2" style="display: none;">
          <div class="riddle-question-title">
            <span>🧩</span> Sandi II: Waktu Berputar
          </div>
          <p class="riddle-question-text">
            "Aku bukan awal pekan yang sibuk (Senin), bukan pula akhir pekan saat liburan (Sabtu/Minggu).<br>
            Huruf pertamaku sama dengan kata <em>'Sayang'</em>.<br>
            Aku adalah hari di mana bidadari bernama Naila lahir ke dunia 17 tahun lalu, dan tepat di hari yang sama pula dalam siklus 7 hari ke depan, rahasia angka 27 itu akan tiba.<br>
            Hari apakah aku?"
          </p>
          <div class="riddle-input-wrap">
            <input type="text" class="riddle-text-input" id="riddle-input-2" placeholder="Tebak nama hari..." autocomplete="off">
            <button class="btn-primary" id="riddle-submit-2" style="padding: 10px 20px;">Buka Kunci</button>
          </div>
          <button class="riddle-hint-toggle" id="hint-btn-2">💡 Butuh petunjuk?</button>
          <div class="riddle-hint-content" id="hint-content-2">
            Petunjuk: Hari kelahiranmu 20 Oktober jatuh di hari ini... dan huruf depanku adalah 'S'!
          </div>
        </div>

        <!-- STAGE 3: BENDA -->
        <div class="riddle-card-body" id="riddle-stage-3" style="display: none;">
          <div class="riddle-question-title">
            <span>🧩</span> Sandi III: Objek Kejutan
          </div>
          <p class="riddle-question-text">
            "Aku memiliki pita manis tetapi aku bukan rambut.<br>
            Aku memiliki kotak berbalut indah tetapi aku bukan rumah.<br>
            Aku tidak bersuara di layar kaca HP, melainkan berwujud nyata dan sedang disiapkan penuh rahasia untuk kamu buka di hari Selasa tanggal 27 nanti.<br>
            Benda apakah aku?"
          </p>
          <div class="riddle-input-wrap">
            <input type="text" class="riddle-text-input" id="riddle-input-3" placeholder="Tebak benda rahasia..." autocomplete="off">
            <button class="btn-primary" id="riddle-submit-3" style="padding: 10px 20px;">Bongkar Segel!</button>
          </div>
          <button class="riddle-hint-toggle" id="hint-btn-3">💡 Butuh petunjuk?</button>
          <div class="riddle-hint-content" id="hint-content-3">
            Petunjuk: Benda berkotak dan berpita yang paling ditunggu saat momen ulang tahun!
          </div>
        </div>

        <!-- THE UNLOCKED SECRET CLUE REVEAL -->
        <div class="riddle-clue-unlocked" id="riddle-unlocked-reveal">
          <span style="font-size: 3rem; display: block; margin-bottom: 8px;">🎁✨</span>
          <span class="section-badge" style="background: rgba(246, 215, 167, 0.3); color: var(--highlight-gold);">
            CLUE RAHASIA TERPECAHKAN!
          </span>
          <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: #FFF; margin: 12px 0 10px;">
            Kejutan Belum Berakhir, Naila Cantika! 🤍
          </h3>
          <p style="font-size: 0.98rem; line-height: 1.7; color: var(--text-primary); margin-bottom: 16px;">
            Kamu berhasil membongkar teka-teki rahasia ini!<br>
            Website ini hanyalah pembuka... Karena masih ada <strong>kado / hadiah spesial nyata</strong> yang sedang disiapkan dan akan kuberikan langsung untukmu pada:
          </p>

          <div style="background: rgba(0,0,0,0.4); border: 1px dashed var(--highlight-gold); border-radius: 14px; padding: 14px; margin: 16px 0;">
            <div style="font-family: var(--font-serif); font-size: 1.35rem; font-weight: 800; color: var(--highlight-gold);">
              📅 SELASA, 27 OKTOBER 2026
            </div>
            <div style="font-size: 0.85rem; color: var(--accent-blush); margin-top: 4px;">
              Tunggu dan nantikan hadiah manismu ya bidadariku! 🎀
            </div>
          </div>

          <a href="https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent('Airlangga! Aku berhasil mecahin teka-teki easter egg kado rahasia buat hari Selasa, 27 Oktober nanti! 🎁💖 Penasaran banget hadiahnya apa haha!')}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="margin-top: 10px; width: 100%; font-size: 0.95rem;">
            💬 Kabari Airlangga: "Aku Tahu Rahasianya!"
          </a>
        </div>

        <div style="margin-top: 18px;">
          <button class="btn-secondary" id="btn-close-easter-egg" style="font-size: 0.85rem; padding: 8px 20px;">
            Tutup Teka-Teki
          </button>
        </div>
      </div>
    </div>
  `;

  container.appendChild(section);

  // Update Live Counter from 2009-10-20
  const birthTime = new Date('2009-10-20T00:00:00').getTime();
  const daysEl = section.querySelector('#counter-days');
  const hoursEl = section.querySelector('#counter-hours');
  const secondsEl = section.querySelector('#counter-seconds');

  function updateCounter() {
    const now = Date.now();
    const diffMs = now - birthTime;

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const seconds = Math.floor(diffMs / 1000);

    if (daysEl) daysEl.textContent = days.toLocaleString();
    if (hoursEl) hoursEl.textContent = hours.toLocaleString();
    if (secondsEl) secondsEl.textContent = (seconds % 60).toString().padStart(2, '0') + 's';
  }

  updateCounter();
  setInterval(updateCounter, 1000);

  // 1. Password Secret Modal Logic
  const secretModal = section.querySelector('#secret-modal-overlay');
  const btnOpenSecret = section.querySelector('#btn-open-secret');
  const btnUnlock = section.querySelector('#btn-unlock-secret');
  const btnCancel = section.querySelector('#btn-cancel-secret');
  const btnClose = section.querySelector('#btn-close-secret');
  const passInput = section.querySelector('#secret-password-input');
  const lockStage = section.querySelector('#secret-lock-stage');
  const unlockedStage = section.querySelector('#secret-unlocked-stage');

  btnOpenSecret.addEventListener('click', () => {
    sounds.playPop();
    secretModal.classList.add('active');
  });

  const handleUnlock = () => {
    const val = passInput.value.trim().toLowerCase();
    if (val === oData.secretPassword.toLowerCase() || val === 'naila' || val === 'cantika') {
      sounds.playChime();
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
      lockStage.style.display = 'none';
      unlockedStage.style.display = 'block';
    } else {
      sounds.playPop();
      passInput.style.borderColor = '#FF5C8A';
      passInput.value = '';
      passInput.placeholder = 'Kata sandi salah, coba "naila" 😊';
    }
  };

  btnUnlock.addEventListener('click', handleUnlock);
  passInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUnlock();
  });

  btnCancel.addEventListener('click', () => secretModal.classList.remove('active'));
  btnClose.addEventListener('click', () => secretModal.classList.remove('active'));

  // 2. Easter Egg Riddle Modal Logic
  const easterModal = section.querySelector('#easter-egg-modal-overlay');
  const btnOpenEaster = section.querySelector('#btn-open-easter-egg');
  const btnCloseEaster = section.querySelector('#btn-close-easter-egg');

  const stage1 = section.querySelector('#riddle-stage-1');
  const stage2 = section.querySelector('#riddle-stage-2');
  const stage3 = section.querySelector('#riddle-stage-3');
  const revealBox = section.querySelector('#riddle-unlocked-reveal');

  const dot1 = section.querySelector('#riddle-dot-1');
  const dot2 = section.querySelector('#riddle-dot-2');
  const dot3 = section.querySelector('#riddle-dot-3');

  const input1 = section.querySelector('#riddle-input-1');
  const input2 = section.querySelector('#riddle-input-2');
  const input3 = section.querySelector('#riddle-input-3');

  const submit1 = section.querySelector('#riddle-submit-1');
  const submit2 = section.querySelector('#riddle-submit-2');
  const submit3 = section.querySelector('#riddle-submit-3');

  btnOpenEaster.addEventListener('click', () => {
    sounds.playPop();
    easterModal.classList.add('active');
  });

  btnCloseEaster.addEventListener('click', () => {
    easterModal.classList.remove('active');
  });

  // Toggle Hints
  ['1', '2', '3'].forEach(num => {
    const hintBtn = section.querySelector(`#hint-btn-${num}`);
    const hintContent = section.querySelector(`#hint-content-${num}`);
    hintBtn.addEventListener('click', () => {
      const isVisible = hintContent.style.display === 'block';
      hintContent.style.display = isVisible ? 'none' : 'block';
    });
  });

  // Tahap 1: Verifikasi 27
  function checkStage1() {
    const val = input1.value.trim();
    if (val === '27' || val === 'dua puluh tujuh') {
      sounds.playChime();
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
      dot1.classList.remove('active');
      dot1.classList.add('done');
      dot1.innerHTML = '✓';
      dot2.classList.add('active');

      stage1.style.display = 'none';
      stage2.style.display = 'block';
      input2.focus();
    } else {
      sounds.playPop();
      input1.style.borderColor = '#FF5C8A';
      input1.value = '';
      input1.placeholder = 'Jawaban salah, coba hitung lagi ya 😊';
    }
  }

  submit1.addEventListener('click', checkStage1);
  input1.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkStage1();
  });

  // Tahap 2: Verifikasi Selasa
  function checkStage2() {
    const val = input2.value.trim().toLowerCase();
    if (val === 'selasa' || val === 'hari selasa' || val === 'tuesday') {
      sounds.playChime();
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
      dot2.classList.remove('active');
      dot2.classList.add('done');
      dot2.innerHTML = '✓';
      dot3.classList.add('active');

      stage2.style.display = 'none';
      stage3.style.display = 'block';
      input3.focus();
    } else {
      sounds.playPop();
      input2.style.borderColor = '#FF5C8A';
      input2.value = '';
      input2.placeholder = 'Jawaban salah, petunjuk: harinya sama seperti hari ini!';
    }
  }

  submit2.addEventListener('click', checkStage2);
  input2.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkStage2();
  });

  // Tahap 3: Verifikasi Kado / Hadiah
  function checkStage3() {
    const val = input3.value.trim().toLowerCase();
    const validWords = ['kado', 'hadiah', 'gift', 'present', 'kejutan', 'surprise', 'paket'];
    if (validWords.some(w => val.includes(w))) {
      sounds.playChime();
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#F6D7A7', '#FFD166', '#FF5C8A', '#FFF4F0']
      });

      dot3.classList.remove('active');
      dot3.classList.add('done');
      dot3.innerHTML = '✓';

      stage3.style.display = 'none';
      revealBox.style.display = 'block';
    } else {
      sounds.playPop();
      input3.style.borderColor = '#FF5C8A';
      input3.value = '';
      input3.placeholder = 'Bukan itu... sesuatu berpita yang biasa dibuka! (K_ _ _)';
    }
  }

  submit3.addEventListener('click', checkStage3);
  input3.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkStage3();
  });

  // Replay Experience
  const btnReplay = section.querySelector('#btn-replay-experience');
  btnReplay.addEventListener('click', () => {
    sounds.playChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
