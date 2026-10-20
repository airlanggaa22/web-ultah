/**
 * CHAPTER 2: MINI-GAME / TEKA-TEKI PEMBUKA
 * "Tangkapan Hati untuk Naila": Tangkap 5 hati cinta yang melayang.
 */

import { CONFIG } from '../config.js';
import { sounds } from '../fx/audio-synth.js';
import confetti from 'canvas-confetti';

export function renderMinigame(container, onCompleteCallback) {
  const gData = CONFIG.miniGame;
  const section = document.createElement('section');
  section.className = 'chapter';
  section.id = 'chapter-minigame';

  section.innerHTML = `
    <span class="section-badge">Mini Game Cinta 🎮</span>
    <h2 class="section-title gradient-text">${gData.title}</h2>
    <p class="section-subtitle">${gData.description}</p>

    <div class="glass-card minigame-card">
      <div class="minigame-arena" id="minigame-arena">
        <!-- Floating target hearts appear dynamically -->
      </div>

      <div class="minigame-progress" id="minigame-progress-stars">
        <span>🤍</span><span>🤍</span><span>🤍</span><span>🤍</span><span>🤍</span>
      </div>
      <p id="minigame-status-text" style="margin-top: 8px; font-size: 0.95rem; color: var(--accent-blush);">
        Ketuk hati yang melayang untuk menangkapnya!
      </p>

      <button class="btn-secondary" id="btn-skip-minigame" style="margin-top: 14px; font-size: 0.8rem; padding: 6px 16px;">
        Lewati mini-game ⏩
      </button>
    </div>
  `;

  container.appendChild(section);

  const arena = section.querySelector('#minigame-arena');
  const progressStars = section.querySelectorAll('#minigame-progress-stars span');
  const statusText = section.querySelector('#minigame-status-text');
  const btnSkip = section.querySelector('#btn-skip-minigame');

  let score = 0;
  const target = gData.targetHearts || 5;

  function spawnHeart() {
    if (score >= target) return;
    const heart = document.createElement('div');
    heart.className = 'falling-heart-target';
    heart.innerHTML = ['💖', '💕', '🌸', '✨', '🤍'][Math.floor(Math.random() * 5)];

    const rect = arena.getBoundingClientRect();
    const maxX = rect.width > 60 ? rect.width - 50 : 250;
    const maxY = rect.height > 60 ? rect.height - 50 : 200;

    heart.style.left = `${Math.random() * maxX}px`;
    heart.style.top = `${Math.random() * maxY}px`;

    const handleCatch = (e) => {
      e.stopPropagation();
      if (heart._caught) return;
      heart._caught = true;

      sounds.playPop();
      heart.style.transform = 'scale(1.5)';
      heart.style.opacity = '0';
      setTimeout(() => heart.remove(), 150);

      if (score < target) {
        progressStars[score].innerHTML = '💖';
        score++;

        if (score === target) {
          handleWin();
        } else {
          spawnHeart();
        }
      }
    };

    heart.addEventListener('pointerdown', handleCatch);

    arena.appendChild(heart);

    // Otomatis pindah posisi jika tidak diklik
    setTimeout(() => {
      if (heart.parentNode && score < target) {
        heart.remove();
        spawnHeart();
      }
    }, 2800);
  }

  function handleWin() {
    sounds.playChime();
    confetti({ particleCount: 50, spread: 80, origin: { y: 0.5 } });
    statusText.innerHTML = `<strong>${gData.celebrationText}</strong>`;
    statusText.style.color = '#F6D7A7';

    setTimeout(() => {
      if (onCompleteCallback) onCompleteCallback();
    }, 1500);
  }

  btnSkip.addEventListener('click', () => {
    sounds.playPop();
    if (onCompleteCallback) onCompleteCallback();
  });

  // Spawn awal
  setTimeout(() => {
    spawnHeart();
    spawnHeart();
  }, 500);
}
