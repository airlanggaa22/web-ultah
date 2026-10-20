/**
 * MAIN APP INITIALIZER & CHAPTER ORCHESTRATOR
 * Mengatur seluruh alur interaktif, menu navigasi chapter, dan audio.
 */

import './styles/tokens.css';
import './styles/base.css';
import './styles/chapters.css';

import { initAmbientCanvas } from './fx/hearts.js';
import { sounds } from './fx/audio-synth.js';
import { renderLoading } from './chapters/loading.js';
import { renderGate } from './chapters/gate.js';
import { renderGreeting } from './chapters/greeting.js';
import { renderPhotobox } from './chapters/photobox.js';
import { renderTimeline } from './chapters/timeline.js';
import { renderLetter } from './chapters/letter.js';
import { renderReasons } from './chapters/reasons.js';
import { renderCake } from './chapters/cake.js';
import { renderFireworks } from './chapters/fireworks.js';
import { renderMinigame } from './chapters/minigame.js';
import { renderOutro } from './chapters/outro.js';
import { fetchServerConfig } from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Fetch config terbaru dari server sebelum render
  await fetchServerConfig();

  const appContainer = document.getElementById('app');
  const navBtnMusic = document.getElementById('nav-btn-music');
  const navBtnMenu = document.getElementById('nav-btn-menu');
  const menuDrawer = document.getElementById('menu-drawer-overlay');
  const menuClose = document.getElementById('menu-drawer-close');

  // Inisialisasi Canvas Latar Bintang & Hati
  initAmbientCanvas('ambient-canvas');

  // Kontrol Audio (Musik Toggle)
  navBtnMusic.addEventListener('click', () => {
    const isMuted = sounds.toggleMute();
    navBtnMusic.innerHTML = isMuted ? '🔇' : '🎵';
    navBtnMusic.classList.toggle('playing', !isMuted);
  });

  // Kontrol Menu Drawer Navigasi
  if (navBtnMenu && menuDrawer) {
    navBtnMenu.addEventListener('click', () => {
      sounds.playPop();
      menuDrawer.classList.add('active');
    });

    if (menuClose) {
      menuClose.addEventListener('click', () => {
        menuDrawer.classList.remove('active');
      });
    }

    menuDrawer.addEventListener('click', (e) => {
      if (e.target === menuDrawer) {
        menuDrawer.classList.remove('active');
      }
    });

    // Event listener untuk setiap tombol di daftar menu
    document.querySelectorAll('.chapter-nav-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        menuDrawer.classList.remove('active');
        sounds.playPop();

        if (btn.id === 'nav-item-easter-egg') {
          const easterModal = document.getElementById('easter-egg-modal-overlay');
          if (easterModal) easterModal.classList.add('active');
          return;
        }

        const targetId = btn.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);

        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // [0] Tampilkan Loading Screen
  renderLoading(appContainer, () => {
    // Render SEMUA Chapter ke dalam DOM agar langsung dapat diakses dan di-scroll
    renderGate(appContainer, () => {
      navBtnMusic.classList.add('playing');
    });

    renderGreeting(appContainer);
    renderPhotobox(appContainer);
    renderTimeline(appContainer);
    renderLetter(appContainer);
    renderReasons(appContainer);
    renderCake(appContainer, () => {
      // Ketika lilin ditiup, scroll halus ke kembang api
      const fwSection = document.getElementById('chapter-fireworks');
      if (fwSection) {
        fwSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    renderFireworks(appContainer);
    renderMinigame(appContainer);
    renderOutro(appContainer);

    setupScrollObserver();
  });
});

/**
 * Scroll-triggered Reveal Observer
 */
function setupScrollObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.chapter').forEach((ch) => {
    observer.observe(ch);
  });
}
