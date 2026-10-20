/**
 * AMBIENT BACKGROUND: FLOATING STARS & HEARTS
 * Menghormati budget partikel perangkat mobile (≤30 elemen halus).
 */

export function initAmbientCanvas(canvasId = 'ambient-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const isMobile = window.innerWidth < 768;
  const numParticles = isMobile ? 25 : 50;

  const particles = [];
  const colors = ['#FF5C8A', '#FFB3C7', '#F6D7A7', '#FFFFFF', '#CDB4DB'];

  class FloatingParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 3 + 1.5;
      this.speedY = Math.random() * 0.6 + 0.2;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = Math.random() * 0.6 + 0.2;
      this.isHeart = Math.random() > 0.6; // Sebagian berbentuk hati, sebagian bintang
      this.angle = Math.random() * Math.PI * 2;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.angle) * 0.3;
      this.angle += 0.02;

      if (this.y < -30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.translate(this.x, this.y);

      if (this.isHeart) {
        // Gambar hati kecil
        const s = this.size * 1.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-s / 2, -s / 2, -s, s / 3, 0, s);
        ctx.bezierCurveTo(s, s / 3, s / 2, -s / 2, 0, 0);
        ctx.fill();
      } else {
        // Bintang bercahaya
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < numParticles; i++) {
    particles.push(new FloatingParticle());
  }

  let animationFrame;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    animationFrame = requestAnimationFrame(animate);
  }

  // Jeda saat tab di-minimize untuk hemat daya
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
    } else {
      animate();
    }
  });

  animate();
}
