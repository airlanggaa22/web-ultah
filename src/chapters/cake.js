/**
 * CHAPTER 8: KUE ULANG TAHUN & TIUP LILIN SWEET 17
 * Interaksi tiup lilin via Mikrofon HP (Web Audio API) + Tombol Fallback instan.
 */

import { CONFIG } from '../config.js';
import { sounds } from '../fx/audio-synth.js';
import confetti from 'canvas-confetti';

export function renderCake(container, onBlownCallback) {
  const cData = CONFIG.cake;
  const section = document.createElement('section');
  section.className = 'chapter';
  section.id = 'chapter-cake';

  section.innerHTML = `
    <span class="section-badge">Make a Wish 🎂</span>
    <h2 class="section-title gradient-text">Kue Sweet 17 untuk Naila</h2>
    <p class="section-subtitle">${cData.instruction}</p>

    <!-- 3D/SVG Birthday Cake with 17 Candles -->
    <div class="cake-stage" id="cake-interactive-stage">
      <svg class="cake-svg" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Cake Base Layer -->
        <ellipse cx="130" cy="190" rx="100" ry="24" fill="#C71F54" opacity="0.6"/>
        <rect x="35" y="140" width="190" height="50" rx="14" fill="#E03166"/>
        <ellipse cx="130" cy="140" rx="95" ry="20" fill="#FF5C8A"/>
        
        <!-- Frosting dripping -->
        <path d="M35 145 C 50 165, 70 145, 90 160 C 110 145, 130 165, 150 150 C 170 165, 190 145, 225 150" stroke="#FFF4F0" stroke-width="8" stroke-linecap="round"/>
        
        <!-- Cake Middle Layer -->
        <rect x="55" y="90" width="150" height="45" rx="10" fill="#FF8FA3"/>
        <ellipse cx="130" cy="90" rx="75" ry="16" fill="#FFF4F0"/>

        <!-- Sweet 17 Gold Badge Topper -->
        <circle cx="130" cy="45" r="24" fill="#F6D7A7" stroke="#FFD166" stroke-width="3" filter="drop-shadow(0 2px 8px rgba(246, 215, 167, 0.6))"/>
        <text x="130" y="53" text-anchor="middle" fill="#8C1D40" font-family="'Playfair Display', serif" font-weight="bold" font-size="20">17</text>

        <!-- 3 Main Glowing Candle Stems -->
        <rect x="85" y="65" width="6" height="25" rx="3" fill="#FFFDF9" stroke="#E03166"/>
        <rect x="127" y="65" width="6" height="25" rx="3" fill="#FFFDF9" stroke="#E03166"/>
        <rect x="169" y="65" width="6" height="25" rx="3" fill="#FFFDF9" stroke="#E03166"/>

        <!-- Flickering Flames -->
        <g class="candle-flame" id="flame-1" style="transform-origin: 88px 65px;">
          <ellipse cx="88" cy="55" rx="6" ry="10" fill="#FFD166"/>
          <ellipse cx="88" cy="56" rx="3" ry="6" fill="#FFF4F0"/>
        </g>
        <g class="candle-flame" id="flame-2" style="transform-origin: 130px 65px;">
          <ellipse cx="130" cy="55" rx="6" ry="10" fill="#FFD166"/>
          <ellipse cx="130" cy="56" rx="3" ry="6" fill="#FFF4F0"/>
        </g>
        <g class="candle-flame" id="flame-3" style="transform-origin: 172px 65px;">
          <ellipse cx="172" cy="55" rx="6" ry="10" fill="#FFD166"/>
          <ellipse cx="172" cy="56" rx="3" ry="6" fill="#FFF4F0"/>
        </g>
      </svg>
    </div>

    <!-- Status & Controls -->
    <div class="blow-controls">
      <div id="cake-status-msg" style="font-size: 1.1rem; color: var(--accent-blush); font-weight: 600; min-height: 28px;">
        Nyalakan mic atau tekan tombol di bawah untuk meniup lilin 💨
      </div>

      <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
        <button class="btn-primary" id="btn-blow-candles" style="font-size: 1.05rem; padding: 14px 32px;">
          💨 Tiup Lilin Sekarang!
        </button>
        <button class="btn-secondary" id="btn-mic-toggle" style="font-size: 0.9rem;">
          🎤 Gunakan Mic HP
        </button>
      </div>
    </div>
  `;

  container.appendChild(section);

  const flames = section.querySelectorAll('.candle-flame');
  const btnBlow = section.querySelector('#btn-blow-candles');
  const btnMic = section.querySelector('#btn-mic-toggle');
  const statusMsg = section.querySelector('#cake-status-msg');

  let isBlown = false;

  function extinguishCandles() {
    if (isBlown) return;
    isBlown = true;

    // Bunyi Tiupan & Chime
    sounds.playBlow();
    setTimeout(() => sounds.playChime(), 400);

    flames.forEach(flame => flame.classList.add('blown'));

    statusMsg.innerHTML = `<strong>${cData.blownSuccessText}</strong>`;
    statusMsg.style.color = '#F6D7A7';

    // Golden confetti celebration
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#F6D7A7', '#FFD166', '#FF5C8A', '#FFF4F0']
    });

    btnBlow.innerHTML = 'Lilin Telah Padam 🤍';
    btnBlow.style.opacity = '0.7';

    setTimeout(() => {
      if (onBlownCallback) onBlownCallback();
    }, 2000);
  }

  btnBlow.addEventListener('click', extinguishCandles);

  // Web Audio Mic Detection
  btnMic.addEventListener('click', async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      btnMic.innerHTML = '🎤 Mic Aktif! Dekatkan ke mulut & tiup...';
      btnMic.style.borderColor = '#FF5C8A';

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const micCtx = new AudioCtx();
      const analyser = micCtx.createAnalyser();
      analyser.fftSize = 256;
      const source = micCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function checkAudio() {
        if (isBlown) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;

        // Threshold deteksi hembusan angin tiupan
        if (avg > 48) {
          extinguishCandles();
          stream.getTracks().forEach(t => t.stop());
          return;
        }

        requestAnimationFrame(checkAudio);
      }

      checkAudio();
    } catch (err) {
      console.warn('Mic ditolak atau tidak didukung:', err);
      btnMic.innerHTML = '❌ Mic Tidak Tersedia (Gunakan Tombol di Kiri)';
    }
  });
}
