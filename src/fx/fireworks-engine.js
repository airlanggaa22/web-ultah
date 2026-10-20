/**
 * FIREWORKS ENGINE (KLIMAKS)
 * Mendukung kembang api bentuk Hati, nama bertabur bintang ("NAILA 17 ♥"),
 * dan peluncuran interaktif saat layar disentuh.
 *
 * Canvas di-hide/show via .active class — tidak menggambar latar gelap
 * sehingga konten di bawahnya tidak tertutup.
 */

import { sounds } from './audio-synth.js';

export class FireworksEngine {
  constructor(canvasId = 'fireworks-canvas') {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.rockets = [];
    this.particles = [];
    this.isRunning = false;
    this.animationId = null;
    this.colors = ['#FF5C8A', '#FFB3C7', '#F6D7A7', '#FFF4F0', '#CDB4DB', '#FF8FA3'];

    if (this.canvas) {
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    // Show the canvas
    this.canvas.classList.add('active');
    this.canvas.classList.add('interactive');
    this.animate();
  }

  stop() {
    this.isRunning = false;
    this.canvas.classList.remove('interactive');
    // Keep canvas visible so remaining particles fade, then hide after a delay
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    // Clear and hide canvas
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    this.rockets = [];
    this.particles = [];
    this.canvas.classList.remove('active');
  }

  launch(targetX = null, targetY = null, type = 'heart') {
    const startX = this.width * (0.2 + Math.random() * 0.6);
    const startY = this.height;
    const destX = targetX !== null ? targetX : this.width * (0.25 + Math.random() * 0.5);
    const destY = targetY !== null ? targetY : this.height * (0.2 + Math.random() * 0.35);

    this.rockets.push({
      x: startX,
      y: startY,
      targetX: destX,
      targetY: destY,
      speedX: (destX - startX) / 35,
      speedY: (destY - startY) / 35,
      type: type,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      alpha: 1
    });

    sounds.playPop();
  }

  explodeHeart(cx, cy, baseColor) {
    sounds.playFireworks();
    const count = window.innerWidth < 768 ? 60 : 100;
    const scale = window.innerWidth < 768 ? 7 : 11;

    for (let i = 0; i < count; i++) {
      const t = (Math.PI * 2 * i) / count;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      this.particles.push({
        x: cx,
        y: cy,
        vx: (hx / 16) * scale * (0.8 + Math.random() * 0.4),
        vy: (hy / 16) * scale * (0.8 + Math.random() * 0.4),
        alpha: 1,
        color: baseColor || this.colors[Math.floor(Math.random() * this.colors.length)],
        decay: 0.012 + Math.random() * 0.008,
        size: Math.random() * 3 + 2
      });
    }
  }

  explodeText(text = 'NAILA 17 ♥') {
    sounds.playFireworks();
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');
    const w = (offCanvas.width = 400);
    const h = (offCanvas.height = 120);

    offCtx.fillStyle = '#ffffff';
    offCtx.font = 'bold 36px "Playfair Display", serif';
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText(text, w / 2, h / 2);

    const imgData = offCtx.getImageData(0, 0, w, h).data;
    const centerX = this.width / 2;
    const centerY = this.height * 0.35;
    const step = window.innerWidth < 768 ? 7 : 5;

    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const index = (y * w + x) * 4;
        if (imgData[index + 3] > 128) {
          const offsetX = (x - w / 2) * (window.innerWidth < 768 ? 0.9 : 1.3);
          const offsetY = (y - h / 2) * (window.innerWidth < 768 ? 0.9 : 1.3);

          this.particles.push({
            x: centerX,
            y: centerY,
            targetX: centerX + offsetX,
            targetY: centerY + offsetY,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            alpha: 1,
            color: '#FFB3C7',
            decay: 0.006,
            size: 2.5,
            isFormingText: true,
            progress: 0
          });
        }
      }
    }
  }

  animate() {
    if (!this.isRunning) return;

    // Clear with full transparency — no dark overlay that covers content!
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update & Draw Rockets
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.x += r.speedX;
      r.y += r.speedY;

      // Rocket trail
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = r.color;
      this.ctx.fill();

      if (r.y <= r.targetY) {
        if (r.type === 'text') {
          this.explodeText('NAILA 17 ♥');
        } else {
          this.explodeHeart(r.targetX, r.targetY, r.color);
        }
        this.rockets.splice(i, 1);
      }
    }

    // Update & Draw Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      if (p.isFormingText && p.progress < 1) {
        p.progress += 0.04;
        p.x += (p.targetX - p.x) * 0.1;
        p.y += (p.targetY - p.y) * 0.1;
      } else {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.vx *= 0.98;
        p.alpha -= p.decay;
      }

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Auto-stop when nothing left to draw
    if (this.rockets.length === 0 && this.particles.length === 0) {
      this.isRunning = false;
      this.canvas.classList.remove('interactive');
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.canvas.classList.remove('active');
      return;
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}
