/**
 * CHAPTER 3: UCAPAN UTAMA SWEET SEVENTEEN
 * Teks megah: Happy 17th Birthday, Naila Cantika Aula Nikmah 🤍
 */

import { CONFIG } from '../config.js';
import { sounds } from '../fx/audio-synth.js';
import confetti from 'canvas-confetti';

export function renderGreeting(container) {
  const r = CONFIG.recipient;
  const section = document.createElement('section');
  section.className = 'chapter';
  section.id = 'chapter-greeting';

  section.innerHTML = `
    <div class="sweet17-pill">
      <span>👑</span>
      <span>OFFICIAL CHAPTER 17 • SWEET SEVENTEEN</span>
      <span>✨</span>
    </div>

    <h2 style="font-size: 1.15rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent-blush);">
      HAPPY 17TH BIRTHDAY
    </h2>

    <h1 class="greeting-name gradient-text">
      ${r.fullName}
    </h1>

    <p class="cursive-text" style="font-size: 1.8rem; margin-bottom: 20px;">
      "Semoga harimu seindah senyummu, Cantika 🌸"
    </p>

    <div class="glass-card" style="max-width: 580px; text-align: center; margin-top: 10px;">
      <p style="font-size: 1.05rem; color: var(--text-primary); line-height: 1.7;">
        Hari ini genap <strong>17 tahun</strong> perjalanan indahmu sejak <strong>20 Oktober 2009</strong>. Selamat memasuki usia yang penuh keajaiban, tawa baru, dan sejuta mimpi manis yang menantimu! 💖
      </p>

      <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <button class="btn-primary" id="btn-greet-sparkle">
          ✨ Kirim Peluk & Doa ✨
        </button>
      </div>
    </div>
  `;

  container.appendChild(section);

  const btnSparkle = section.querySelector('#btn-greet-sparkle');
  btnSparkle.addEventListener('click', () => {
    sounds.playChime();
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF5C8A', '#FFB3C7', '#F6D7A7', '#FFFFFF']
    });
  });

  // Secret Easter Egg Trigger: Ketuk mahkota 3x untuk membuka teka-teki kado!
  const crownPill = section.querySelector('.sweet17-pill');
  let tapCount = 0;
  crownPill.style.cursor = 'pointer';
  crownPill.title = 'Ada rahasia kecil di sini...?';
  crownPill.addEventListener('click', () => {
    tapCount++;
    sounds.playPop();
    if (tapCount >= 3) {
      tapCount = 0;
      sounds.playChime();
      const easterModal = document.getElementById('easter-egg-modal-overlay');
      if (easterModal) easterModal.classList.add('active');
    }
  });
}
