/**
 * CHAPTER 4: TIMELINE KENANGAN MANIS
 * Jejak langkah perjalanan hidup Naila dari lahir hingga Sweet 17.
 */

import { CONFIG } from '../config.js';

export function renderTimeline(container) {
  const tItems = CONFIG.timeline;
  const section = document.createElement('section');
  section.className = 'chapter';
  section.id = 'chapter-timeline';

  section.innerHTML = `
    <span class="section-badge">Jejak Waktu ⏳</span>
    <h2 class="section-title gradient-text">Cerita Perjalanan Naila</h2>
    <p class="section-subtitle">Setiap detik berharga yang membentuk sosok luar biasa hari ini 💫</p>

    <div class="timeline-container">
      <div class="timeline-line"></div>

      ${tItems.map((item, idx) => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="glass-card timeline-card">
            <span class="section-badge" style="font-size: 0.75rem; padding: 4px 10px; margin-bottom: 6px;">
              ${item.year} • ${item.tag}
            </span>
            <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: #FFF; margin-bottom: 6px;">
              ${item.title}
            </h3>
            <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">
              ${item.desc}
            </p>
            ${item.photo ? `<img src="${item.photo}" alt="${item.title}" loading="lazy" crossorigin="anonymous">` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  container.appendChild(section);
}
