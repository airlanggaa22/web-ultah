/**
 * CHAPTER 1: GATE — "BUKA HADIAH"
 * Layar pembuka interaktif: Kotak hadiah 3D berpita dengan partikel ambient.
 * Ketuk/tahan membuka kotak hadiah, memulai musik latar, dan menampilkan menu kejutan.
 */

import { CONFIG } from '../config.js';
import { sounds } from '../fx/audio-synth.js';
import confetti from 'canvas-confetti';

export function renderGate(container, onOpenCallback) {
  const section = document.createElement('section');
  section.className = 'chapter visible active-screen';
  section.id = 'chapter-gate';

  section.innerHTML = `
    <span class="section-badge">A Special Surprise 🎁</span>
    <h1 class="section-title gradient-text">Ada Hadiah Spesial untukmu</h1>
    <p class="section-subtitle">Dibuat khusus untuk merayakan hari paling membahagiakan di hidupmu 🤍</p>

    <!-- 3D Gift Box Interactive -->
    <div class="gift-box-container" id="gift-box-trigger">
      <div class="gift-sparkles">
        <span class="sparkle-item" style="top: 10%; left: 10%;">✨</span>
        <span class="sparkle-item" style="top: 20%; right: 15%; animation-delay: 0.5s;">💖</span>
        <span class="sparkle-item" style="bottom: 15%; left: 20%; animation-delay: 1s;">🌸</span>
        <span class="sparkle-item" style="bottom: 25%; right: 10%; animation-delay: 0.7s;">✨</span>
      </div>

      <div class="gift-box" id="gift-box-inner">
        <div class="gift-lid" id="gift-lid">
          <div class="gift-ribbon-bow">🎀</div>
        </div>
        <div class="gift-body"></div>
      </div>
    </div>

    <div style="margin-top: 15px;" id="gate-initial-action">
      <button class="btn-primary" id="btn-open-gift" style="font-size: 1.1rem; padding: 16px 36px;">
        ✨ Ketuk untuk Membuka Hadiah ✨
      </button>
      <p style="margin-top: 14px; font-size: 0.85rem; color: var(--text-muted);">
        (Nyalakan suara untuk pengalaman terbaik 🎵)
      </p>
    </div>

    <!-- REVEALED MENU CARD UPON OPENING -->
    <div class="glass-card" id="gate-revealed-menu" style="display: none; width: 100%; max-width: 540px; margin-top: 24px; text-align: center; border-color: rgba(255, 92, 138, 0.4);">
      <span class="section-badge" style="background: rgba(246, 215, 167, 0.2); color: var(--highlight-gold); border-color: rgba(246, 215, 167, 0.4);">
        🎉 Hadiah Resmi Terbuka!
      </span>
      <h3 style="font-family: var(--font-serif); font-size: 1.45rem; color: #FFF; margin: 12px 0 6px;">
        Selamat Datang di Dunia Sweet 17 Naila 🤍
      </h3>
      <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 20px;">
        Semua menu perayaan, photobox estetik, surat cinta, dan lilin kue sudah siap untukmu!
      </p>

      <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
        <button class="btn-primary" id="gate-jump-photobox" style="font-size: 1rem; padding: 14px 20px; background: linear-gradient(135deg, #ff5c8a, #8c1d40);">
          📸 Buka Studio Photobox Strip Naila (Spesial)
        </button>
        <button class="btn-primary" id="gate-jump-greeting" style="font-size: 1rem; padding: 14px 20px;">
          👑 Baca Ucapan Sweet 17 Naila
        </button>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn-secondary" id="gate-jump-cake" style="flex: 1; min-width: 140px;">
            🎂 Tiup Lilin 17
          </button>
          <button class="btn-secondary" id="gate-jump-letter" style="flex: 1; min-width: 140px;">
            💌 Surat Cinta
          </button>
        </div>
      </div>

      <div style="margin-top: 20px; padding-top: 14px; border-top: 1px dashed rgba(255,255,255,0.15);">
        <p style="font-size: 0.85rem; color: var(--highlight-gold); display: flex; align-items: center; justify-content: center; gap: 6px;">
          <span>👇</span> Scroll ke bawah untuk menikmati seluruh alur chapter secara berurutan
        </p>
      </div>
    </div>
  `;

  container.appendChild(section);

  const trigger = section.querySelector('#gift-box-trigger');
  const btnOpen = section.querySelector('#btn-open-gift');
  const lid = section.querySelector('#gift-lid');
  const initAction = section.querySelector('#gate-initial-action');
  const revealedMenu = section.querySelector('#gate-revealed-menu');

  let opened = false;
  const handleOpen = () => {
    if (opened) return;
    opened = true;

    // Mulai Audio BGM & Chime Sound
    sounds.startBGM(CONFIG.music.src, CONFIG.music.volume);
    sounds.playChime();

    // Animasi Buka Tutup Kotak Hadiah
    lid.style.transform = 'rotate(-55deg) translate(-20px, -40px)';
    lid.style.opacity = '0.9';

    // Ledakan Confetti
    confetti({
      particleCount: 90,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FF5C8A', '#FFB3C7', '#F6D7A7', '#FFF4F0']
    });

    initAction.style.display = 'none';
    revealedMenu.style.display = 'block';

    if (onOpenCallback) onOpenCallback();
  };

  trigger.addEventListener('click', handleOpen);
  btnOpen.addEventListener('click', handleOpen);

  // Jump buttons setup
  section.querySelector('#gate-jump-photobox')?.addEventListener('click', () => {
    sounds.playPop();
    document.getElementById('chapter-photobox')?.scrollIntoView({ behavior: 'smooth' });
  });

  section.querySelector('#gate-jump-greeting')?.addEventListener('click', () => {
    sounds.playPop();
    document.getElementById('chapter-greeting')?.scrollIntoView({ behavior: 'smooth' });
  });

  section.querySelector('#gate-jump-cake')?.addEventListener('click', () => {
    sounds.playPop();
    document.getElementById('chapter-cake')?.scrollIntoView({ behavior: 'smooth' });
  });

  section.querySelector('#gate-jump-letter')?.addEventListener('click', () => {
    sounds.playPop();
    document.getElementById('chapter-letter')?.scrollIntoView({ behavior: 'smooth' });
  });
}
