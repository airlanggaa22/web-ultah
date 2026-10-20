/**
 * CHAPTER 9: KLIMAKS — KEMBANG API HATI & NAMA "NAILA 17 ♥"
 * Kembang api hanya aktif saat user menekan tombol, BUKAN otomatis saat load.
 * Global click listener DIHAPUS agar tidak mengganggu interaksi chapter lain.
 */

import { CONFIG } from '../config.js';
import { FireworksEngine } from '../fx/fireworks-engine.js';
import { sounds } from '../fx/audio-synth.js';

let engine = null;

export function renderFireworks(container) {
  const section = document.createElement('section');
  section.className = 'chapter';
  section.id = 'chapter-fireworks';

  section.innerHTML = `
    <span class="section-badge">The Grand Finale ✨</span>
    <h2 class="section-title gradient-text">Kembang Api untuk Naila</h2>
    <p class="section-subtitle">Tekan tombol di bawah untuk meluncurkan kembang api spektakuler! 🎆</p>

    <div class="glass-card" style="max-width: 500px; text-align: center; padding: 24px; margin-top: 10px;">
      <p style="font-size: 1.1rem; color: #FFF; line-height: 1.6;">
        Semoga di usiamu yang ke-17 ini, hidupmu selalu dihiasi warna-warni kebahagiaan seindah kembang api di langit malam ini 🤍
      </p>

      <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
        <button class="btn-primary" id="btn-fireworks-heart">
          💖 Hati Raksasa
        </button>
        <button class="btn-primary" id="btn-fireworks-text" style="background: linear-gradient(135deg, #e0b468, #c71f54);">
          ✨ "NAILA 17 ♥"
        </button>
        <button class="btn-secondary" id="btn-fireworks-barrage">
          🎆 Rentetan
        </button>
      </div>
    </div>
  `;

  container.appendChild(section);

  if (!engine) {
    engine = new FireworksEngine('fireworks-canvas');
  }

  const btnHeart = section.querySelector('#btn-fireworks-heart');
  const btnText = section.querySelector('#btn-fireworks-text');
  const btnBarrage = section.querySelector('#btn-fireworks-barrage');

  // NO auto-launch — user must press a button

  btnHeart.addEventListener('click', (e) => {
    e.stopPropagation();
    sounds.playPop();
    engine.start();
    engine.launch(window.innerWidth / 2, window.innerHeight * 0.3, 'heart');
  });

  btnText.addEventListener('click', (e) => {
    e.stopPropagation();
    sounds.playPop();
    engine.start();
    engine.launch(window.innerWidth / 2, window.innerHeight * 0.35, 'text');
  });

  btnBarrage.addEventListener('click', (e) => {
    e.stopPropagation();
    sounds.playPop();
    engine.start();
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        engine.launch(
          window.innerWidth * (0.2 + Math.random() * 0.6),
          window.innerHeight * (0.2 + Math.random() * 0.3),
          'heart'
        );
      }, i * 350);
    }
  });

  // NO global window click listener — it was hijacking all clicks on the page
}
