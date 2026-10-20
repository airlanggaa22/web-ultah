/**
 * CHAPTER 0: LOADING SCREEN & PRELOAD
 * Animasi denyut hati SVG, bar kemajuan, dan transisi halus ke Gate.
 */

export function renderLoading(container, onLoaded) {
  const loader = document.createElement('div');
  loader.id = 'chapter-loading';

  loader.innerHTML = `
    <div class="loader-heart-wrap">
      <svg class="loader-heart" viewBox="0 0 100 90">
        <path d="M50 30 C 50 10, 10 10, 10 38 C 10 65, 50 85, 50 85 C 50 85, 90 65, 90 38 C 90 10, 50 10, 50 30 Z" />
      </svg>
    </div>
    <div class="loader-text">Sebentar ya, ada kejutan manis untuk Naila… 🤍</div>
    <div class="loader-bar-bg">
      <div class="loader-bar-fill" id="loader-bar-fill"></div>
    </div>
  `;

  document.body.appendChild(loader);

  const fill = loader.querySelector('#loader-bar-fill');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 15;
    if (progress >= 100) {
      progress = 100;
      fill.style.width = '100%';
      clearInterval(interval);

      setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
          loader.remove();
          if (onLoaded) onLoaded();
        }, 800);
      }, 400);
    } else {
      fill.style.width = `${progress}%`;
    }
  }, 120);
}
