/**
 * CHAPTER 6: SURAT CINTA & AMPLOP
 * Amplop interaktif dengan segel lilin wax-seal, efek mengetik (typewriter),
 * dan kontrol baca ulang.
 */

import { CONFIG } from '../config.js';
import { sounds } from '../fx/audio-synth.js';

export function renderLetter(container) {
  const lData = CONFIG.letter;
  const section = document.createElement('section');
  section.className = 'chapter';
  section.id = 'chapter-letter';

  section.innerHTML = `
    <span class="section-badge">Pesan dari Lubuk Hati 💌</span>
    <h2 class="section-title gradient-text">${lData.title}</h2>
    <p class="section-subtitle">Sepucuk surat yang kutulis dengan penuh ketulusan untukmu</p>

    <div class="envelope-wrapper">
      <div class="wax-seal" id="letter-wax-seal" title="Ketuk untuk membuka surat">
        💌
      </div>

      <div class="letter-paper" id="letter-paper-body">
        <div class="letter-header">
          Dear Naila Cantika Aula Nikmah,
        </div>
        <div class="letter-content" id="letter-typewriter-target">
          (Ketuk segel lilin di atas untuk membuka dan membaca isi surat... 🤍)
        </div>

        <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: space-between; align-items: center; flex-wrap: wrap;">
          <div id="letter-secret-key-trigger" style="font-size: 0.85rem; color: #8C1D40; cursor: pointer; opacity: 0.85; font-style: italic; display: flex; align-items: center; gap: 6px;" title="Klik untuk membuka teka-teki rahasia">
            <span>🗝️</span> P.S. Ada teka-teki rahasia yang terkunci...
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn-secondary" id="btn-skip-typing" style="display: none; font-size: 0.8rem; padding: 6px 14px; color: #8C1D40; border-color: rgba(140,29,64,0.3);">
              Tampilkan Semua ⚡
            </button>
            <button class="btn-secondary" id="btn-replay-letter" style="display: none; font-size: 0.8rem; padding: 6px 14px; color: #8C1D40; border-color: rgba(140,29,64,0.3);">
              Baca Lagi 🔄
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(section);

  const waxSeal = section.querySelector('#letter-wax-seal');
  const targetText = section.querySelector('#letter-typewriter-target');
  const btnSkip = section.querySelector('#btn-skip-typing');
  const btnReplay = section.querySelector('#btn-replay-letter');

  let typeInterval = null;
  let isTyping = false;
  const fullText = lData.body;

  function startTypewriter() {
    if (isTyping) return;
    isTyping = true;
    sounds.playChime();
    waxSeal.innerHTML = '💖';
    waxSeal.style.transform = 'scale(0.9) rotate(15deg)';
    targetText.innerHTML = '';
    btnSkip.style.display = 'inline-flex';
    btnReplay.style.display = 'none';

    let charIdx = 0;
    const speed = 25; // ms per huruf

    typeInterval = setInterval(() => {
      if (charIdx < fullText.length) {
        targetText.textContent += fullText.charAt(charIdx);
        charIdx++;
      } else {
        finishTyping();
      }
    }, speed);
  }

  function finishTyping() {
    clearInterval(typeInterval);
    isTyping = false;
    targetText.textContent = fullText;
    btnSkip.style.display = 'none';
    btnReplay.style.display = 'inline-flex';
  }

  waxSeal.addEventListener('click', startTypewriter);
  btnSkip.addEventListener('click', finishTyping);
  btnReplay.addEventListener('click', () => {
    isTyping = false;
    startTypewriter();
  });

  const secretKey = section.querySelector('#letter-secret-key-trigger');
  if (secretKey) {
    secretKey.addEventListener('click', () => {
      sounds.playChime();
      const easterModal = document.getElementById('easter-egg-modal-overlay');
      if (easterModal) easterModal.classList.add('active');
    });
  }
}
