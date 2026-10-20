/**
 * CHAPTER 5: SPECIAL PHOTOBOX & PHOTO BOOTH STRIP (Korean Life4Cuts Style)
 * Fitur Spesial:
 * - 4-cut vertical photobooth strip autentik
 * - Pilihan tema frame (Cream Aesthetic, Pastel Pink, Midnight Plum, Film Noir)
 * - Tanggal & barcode khas photobox "2009.10.20 → 2026.10.20 • SWEET 17 NAILA"
 * - Stiker estetik (🎀, ✨, 🤍)
 * - Tombol "Ganti / Upload Foto Naila" (bisa langsung coba foto asli dari HP/laptop!)
 * - Tombol "Download Photobox Strip" (simpan sebagai gambar PNG ke galeri)
 * - Lightbox preview foto
 * - Polaroid memories di bawah strip
 */

import { CONFIG } from '../config.js';
import { sounds } from '../fx/audio-synth.js';
import confetti from 'canvas-confetti';

export function renderPhotobox(container) {
  const pData = CONFIG.photobox;
  const polaroids = CONFIG.polaroids;

  const section = document.createElement('section');
  section.className = 'chapter';
  section.id = 'chapter-photobox';

  section.innerHTML = `
    <span class="section-badge">Special Feature ✨</span>
    <h2 class="section-title gradient-text">${pData.title}</h2>
    <p class="section-subtitle">${pData.subtitle} — Kenangan terindah di usia 17 tahun Naila 🤍</p>

    <div class="photobox-station">
      <!-- Theme Switcher & Actions -->
      <div class="photobox-controls">
        <button class="theme-pill-btn active" data-theme="cream">🤍 Ivory Cream</button>
        <button class="theme-pill-btn" data-theme="pink">🌸 Pastel Pink</button>
        <button class="theme-pill-btn" data-theme="plum">🍇 Midnight Plum</button>
        <button class="theme-pill-btn" data-theme="noir">🎞️ Film Noir</button>
      </div>

      <!-- Action Buttons: Upload & Download -->
      <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
        <label class="btn-secondary" style="font-size: 0.85rem; cursor: pointer;">
          📷 Ganti Foto Naila
          <input type="file" id="photobox-upload-input" accept="image/*" multiple style="display: none;">
        </label>
        <button class="btn-primary" id="btn-download-photobox" style="font-size: 0.85rem; padding: 10px 20px;">
          📥 Download Photobox Strip
        </button>
      </div>

      <!-- THE PHOTOBOX STRIP (Authentic Korean Life4Cuts) -->
      <div class="photobox-strip-wrapper">
        <div class="photobox-strip theme-cream" id="photobox-strip-element">
          <!-- Floating Stickers -->
          <span class="photobox-sticker sticker-1">🎀</span>
          <span class="photobox-sticker sticker-2">🤍</span>
          <span class="photobox-sticker sticker-3">✨</span>

          <!-- Strip Header -->
          <div class="photobox-strip-header">
            <span>LIFE • MEMORY</span>
            <span>NO. 17 / 2009</span>
          </div>

          <!-- 4 Vertical Photo Frames -->
          <div class="photobox-photo-frame" data-index="0" title="Klik untuk memperbesar">
            <img src="${pData.photos[0].url}" alt="Foto 1 Naila" id="photo-frame-0" crossorigin="anonymous">
            <span class="photobox-frame-badge">01</span>
          </div>

          <div class="photobox-photo-frame" data-index="1" title="Klik untuk memperbesar">
            <img src="${pData.photos[1].url}" alt="Foto 2 Naila" id="photo-frame-1" crossorigin="anonymous">
            <span class="photobox-frame-badge">02</span>
          </div>

          <div class="photobox-photo-frame" data-index="2" title="Klik untuk memperbesar">
            <img src="${pData.photos[2].url}" alt="Foto 3 Naila" id="photo-frame-2" crossorigin="anonymous">
            <span class="photobox-frame-badge">03</span>
          </div>

          <div class="photobox-photo-frame" data-index="3" title="Klik untuk memperbesar">
            <img src="${pData.photos[3].url}" alt="Foto 4 Naila" id="photo-frame-3" crossorigin="anonymous">
            <span class="photobox-frame-badge">04</span>
          </div>

          <!-- Strip Footer Branding -->
          <div class="photobox-strip-footer">
            <div class="date-stamp">${pData.dateStamp}</div>
            <div class="tagline">${pData.tagline}</div>
            <div class="barcode">
              <span class="barcode-bar" style="width: 2px;"></span>
              <span class="barcode-bar" style="width: 4px;"></span>
              <span class="barcode-bar" style="width: 1px;"></span>
              <span class="barcode-bar" style="width: 3px;"></span>
              <span class="barcode-bar" style="width: 5px;"></span>
              <span class="barcode-bar" style="width: 2px;"></span>
              <span class="barcode-bar" style="width: 3px;"></span>
              <span class="barcode-bar" style="width: 1px;"></span>
              <span class="barcode-bar" style="width: 4px;"></span>
              <span class="barcode-bar" style="width: 2px;"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Polaroid Section -->
      <div style="margin-top: 30px; text-align: center; width: 100%;">
        <span class="section-badge">Memories Snapshot 📸</span>
        <div class="polaroid-grid">
          ${polaroids.map((p, idx) => `
            <div class="polaroid-card" style="transform: rotate(${p.rotate || '0deg'});" data-src="${p.src}" data-caption="${p.caption}">
              <img src="${p.src}" alt="Polaroid ${idx + 1}" crossorigin="anonymous">
              <div class="polaroid-caption">${p.caption}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  container.appendChild(section);

  // Setup Interaktivitas
  setupPhotoboxInteractivity(section);
}

function setupPhotoboxInteractivity(section) {
  const strip = section.querySelector('#photobox-strip-element');
  const themeButtons = section.querySelectorAll('.theme-pill-btn');
  const uploadInput = section.querySelector('#photobox-upload-input');
  const downloadBtn = section.querySelector('#btn-download-photobox');

  // Ganti Tema Strip
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playPop();
      themeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const theme = btn.dataset.theme;
      strip.className = `photobox-strip theme-${theme}`;
    });
  });

  // Fitur Ganti/Upload Foto Langsung dari Perangkat
  uploadInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.slice(0, 4).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = section.querySelector(`#photo-frame-${idx}`);
        if (img) {
          img.src = event.target.result;
        }
      };
      reader.readAsDataURL(file);
    });

    sounds.playChime();
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
  });

  // Lightbox Preview saat foto diklik
  const frames = section.querySelectorAll('.photobox-photo-frame, .polaroid-card');
  frames.forEach(frame => {
    frame.addEventListener('click', () => {
      const img = frame.querySelector('img');
      if (!img) return;
      sounds.playPop();
      openLightbox(img.src);
    });
  });

  // Download Photobox Strip sebagai File PNG Gambar
  downloadBtn.addEventListener('click', () => {
    sounds.playChime();
    downloadPhotoboxAsImage(strip);
  });
}

function openLightbox(src) {
  let overlay = document.getElementById('global-lightbox');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'global-lightbox';
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <img src="" class="lightbox-img" id="lightbox-target-img" alt="Enlarged photo">
      <button class="btn-primary" style="margin-top: 16px;" id="lightbox-close-btn">Tutup ✖</button>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('#lightbox-close-btn').addEventListener('click', () => {
      overlay.classList.remove('active');
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  }

  overlay.querySelector('#lightbox-target-img').src = src;
  overlay.classList.add('active');
}

// Generate Canvas dan download strip
function downloadPhotoboxAsImage(stripElement) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 600;
  canvas.height = 1400;

  // Background frame
  const isNoir = stripElement.classList.contains('theme-noir');
  const isPlum = stripElement.classList.contains('theme-plum');
  const isPink = stripElement.classList.contains('theme-pink');

  let bgColor = '#FFFDF9';
  let textColor = '#2D1137';

  if (isNoir) {
    bgColor = '#181419';
    textColor = '#F6D7A7';
  } else if (isPlum) {
    bgColor = '#2D1137';
    textColor = '#FFB3C7';
  } else if (isPink) {
    bgColor = '#FFE5EC';
    textColor = '#8C1D40';
  }

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Header
  ctx.fillStyle = textColor;
  ctx.font = 'bold 22px Poppins, sans-serif';
  ctx.fillText('LIFE • MEMORY', 40, 50);
  ctx.fillText('SWEET 17 / 2009', 370, 50);

  // Gambar 4 foto
  const images = stripElement.querySelectorAll('.photobox-photo-frame img');
  const photoW = 520;
  const photoH = 260;
  const startY = 70;
  const gap = 20;

  let loadedCount = 0;

  images.forEach((imgEl, idx) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imgEl.src;
    img.onload = () => {
      ctx.drawImage(img, 40, startY + idx * (photoH + gap), photoW, photoH);
      loadedCount++;

      if (loadedCount === images.length) {
        // Tulis Footer
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.font = 'bold 24px monospace';
        ctx.fillText('2026.10.20 • SWEET 17 NAILA', 300, 1260);

        ctx.font = 'italic 34px "Dancing Script", cursive, serif';
        ctx.fillText('Naila Cantika • Forever Cherished', 300, 1310);

        // Download trigger
        const link = document.createElement('a');
        link.download = 'naila-sweet17-photobox.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      }
    };
    img.onerror = () => {
      // Fallback jika CORS
      ctx.fillStyle = '#ff5c8a';
      ctx.fillRect(40, startY + idx * (photoH + gap), photoW, photoH);
      loadedCount++;
      if (loadedCount === images.length) {
        const link = document.createElement('a');
        link.download = 'naila-sweet17-photobox.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };
  });
}
