/**
 * CHAPTER 7: 10 ALASAN AKU SAYANG NAILA (TINDER-STYLE SWIPE CARDS)
 * Mendukung gesture swipe sentuhan jari di HP (touch swipe) dan klik tombol.
 */

import { CONFIG } from '../config.js';
import { sounds } from '../fx/audio-synth.js';
import confetti from 'canvas-confetti';

export function renderReasons(container) {
  const reasons = CONFIG.reasons;
  const section = document.createElement('section');
  section.className = 'chapter';
  section.id = 'chapter-reasons';

  section.innerHTML = `
    <span class="section-badge">Hal-Hal Kecil yang Berarti 💖</span>
    <h2 class="section-title gradient-text">10 Alasan Kamu Begitu Spesial</h2>
    <p class="section-subtitle">Geser kartu ke kanan atau ketuk untuk membaca alasan berikutnya 💌</p>

    <div class="reasons-deck" id="reasons-deck-container">
      ${reasons.map((rText, idx) => `
        <div class="reason-card" style="z-index: ${reasons.length - idx}; transform: translateY(${idx * 4}px) scale(${1 - idx * 0.03});" data-index="${idx}">
          <div class="reason-number">#${idx + 1}</div>
          <div class="reason-text">"${rText}"</div>
          <div class="reason-hint">👉 Geser / ketuk kartu ini</div>
        </div>
      `).join('')}
    </div>

    <div style="margin-top: 15px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; width: 100%; max-width: 340px;">
      <button class="btn-primary" id="btn-next-reason" style="flex: 1; min-width: 140px;">
        Kartu Selanjutnya ✨
      </button>
      <button class="btn-secondary" id="btn-reset-reasons" style="flex: 1; min-width: 120px;">
        Ulang Kartu 🔄
      </button>
    </div>
  `;

  container.appendChild(section);

  const deck = section.querySelector('#reasons-deck-container');
  const cards = Array.from(deck.querySelectorAll('.reason-card'));
  const btnNext = section.querySelector('#btn-next-reason');
  const btnReset = section.querySelector('#btn-reset-reasons');

  let currentIndex = 0;

  function advanceCard(direction = 1) {
    if (currentIndex >= cards.length) return;

    sounds.playPop();
    const currentCard = cards[currentIndex];
    const flyX = direction * 140;
    const rotateDeg = direction * 25;

    currentCard.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease';
    currentCard.style.transform = `translateX(${flyX}%) rotate(${rotateDeg}deg)`;
    currentCard.style.opacity = '0';
    currentCard.style.pointerEvents = 'none';

    currentIndex++;

    if (currentIndex === cards.length) {
      sounds.playChime();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }
  }

  function resetCards() {
    sounds.playPop();
    currentIndex = 0;
    cards.forEach((card, idx) => {
      card.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease';
      card.style.transform = `translateY(${idx * 4}px) scale(${1 - idx * 0.03})`;
      card.style.opacity = '1';
      card.style.pointerEvents = 'auto';
    });
  }

  // TOUCH SWIPE GESTURE SUPPORT UNTUK HP
  cards.forEach((card, idx) => {
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let isDragging = false;

    // Click fallback
    card.addEventListener('click', (e) => {
      if (idx === currentIndex && !isDragging) {
        advanceCard(1);
      }
    });

    card.addEventListener('touchstart', (e) => {
      if (idx !== currentIndex) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = false;
      card.style.transition = 'none';
    }, { passive: true });

    card.addEventListener('touchmove', (e) => {
      if (idx !== currentIndex) return;
      currentX = e.touches[0].clientX - startX;
      const currentY = e.touches[0].clientY - startY;

      // Cek apakah user sedang scroll vertikal atau swipe horizontal
      if (Math.abs(currentX) > 10 && Math.abs(currentX) > Math.abs(currentY)) {
        isDragging = true;
        const rotate = (currentX / 15);
        card.style.transform = `translate(${currentX}px, ${currentY * 0.2}px) rotate(${rotate}deg)`;
      }
    }, { passive: true });

    card.addEventListener('touchend', () => {
      if (idx !== currentIndex) return;
      if (isDragging) {
        if (Math.abs(currentX) > 60) {
          // Swipe sukses!
          advanceCard(currentX > 0 ? 1 : -1);
        } else {
          // Snap back jika swipe kurang jauh
          card.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
          card.style.transform = 'translateY(0) scale(1)';
        }
        setTimeout(() => { isDragging = false; }, 50);
      }
    });
  });

  btnNext.addEventListener('click', () => advanceCard(1));
  btnReset.addEventListener('click', resetCards);
}
