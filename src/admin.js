/**
 * ADMIN DASHBOARD SCRIPT
 * Mengatur pengeditan semua foto (Photobox, Timeline, Polaroid)
 * dengan live upload dari HP/laptop, preview instan, dan penyimpanan ke localStorage.
 */

import { CONFIG, DEFAULT_CONFIG, saveCustomConfig, resetCustomConfig } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  // Ambil state terkini (bisa dari localStorage atau default)
  let currentConfig = JSON.parse(JSON.stringify(CONFIG));

  const photoboxContainer = document.getElementById('admin-photobox-grid');
  const timelineContainer = document.getElementById('admin-timeline-grid');
  const polaroidsContainer = document.getElementById('admin-polaroids-grid');
  const toast = document.getElementById('toast-notice');
  const toastMsg = document.getElementById('toast-msg');

  function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // 1. RENDER PHOTOBOX EDITORS (4 Foto)
  function renderPhotoboxEditors() {
    photoboxContainer.innerHTML = '';
    currentConfig.photobox.photos.forEach((photo, idx) => {
      const card = document.createElement('div');
      card.className = 'photo-editor-card';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 700; color: var(--accent-blush);">Frame #${idx + 1}</span>
          <span style="font-size: 0.75rem; color: var(--text-secondary);">Photobox Strip</span>
        </div>
        <div class="preview-box">
          <img src="${photo.url}" id="preview-photobox-${idx}" alt="Preview Photobox ${idx + 1}">
        </div>
        <label class="upload-btn-label">
          📁 Pilih Foto dari HP / Laptop
          <input type="file" accept="image/*" class="admin-file-input" data-type="photobox" data-index="${idx}" style="display: none;">
        </label>
        <div class="input-field-group">
          <label>Atau Paste Link / URL Foto</label>
          <input type="text" class="admin-input admin-url-input" data-type="photobox" data-index="${idx}" value="${photo.url}" placeholder="https://...">
        </div>
        <div class="input-field-group">
          <label>Caption / Keterangan</label>
          <input type="text" class="admin-input admin-caption-input" data-type="photobox" data-index="${idx}" value="${photo.caption || ''}" placeholder="Caption manis...">
        </div>
      `;
      photoboxContainer.appendChild(card);
    });
  }

  // 2. RENDER TIMELINE EDITORS (3 Foto)
  function renderTimelineEditors() {
    timelineContainer.innerHTML = '';
    currentConfig.timeline.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'photo-editor-card';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 700; color: var(--highlight-gold);">${item.year}</span>
          <span style="font-size: 0.75rem; color: var(--text-secondary);">${item.tag}</span>
        </div>
        <div class="preview-box">
          <img src="${item.photo}" id="preview-timeline-${idx}" alt="Preview Timeline ${idx + 1}">
        </div>
        <label class="upload-btn-label" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
          📁 Ganti Foto Momen Ini
          <input type="file" accept="image/*" class="admin-file-input" data-type="timeline" data-index="${idx}" style="display: none;">
        </label>
        <div class="input-field-group">
          <label>URL Foto</label>
          <input type="text" class="admin-input admin-url-input" data-type="timeline" data-index="${idx}" value="${item.photo}">
        </div>
        <div class="input-field-group">
          <label>Judul Momen</label>
          <input type="text" class="admin-input admin-title-input" data-type="timeline" data-index="${idx}" value="${item.title}">
        </div>
        <div class="input-field-group">
          <label>Cerita Singkat</label>
          <textarea class="admin-input admin-desc-input" data-type="timeline" data-index="${idx}">${item.desc}</textarea>
        </div>
      `;
      timelineContainer.appendChild(card);
    });
  }

  // 3. RENDER POLAROID EDITORS (3 Foto)
  function renderPolaroidEditors() {
    polaroidsContainer.innerHTML = '';
    currentConfig.polaroids.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'photo-editor-card';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 700; color: var(--accent-blush);">Polaroid #${idx + 1}</span>
          <span style="font-size: 0.75rem; color: var(--text-secondary);">Galeri Bawah</span>
        </div>
        <div class="preview-box">
          <img src="${item.src}" id="preview-polaroid-${idx}" alt="Preview Polaroid ${idx + 1}">
        </div>
        <label class="upload-btn-label">
          📁 Pilih Foto Polaroid
          <input type="file" accept="image/*" class="admin-file-input" data-type="polaroid" data-index="${idx}" style="display: none;">
        </label>
        <div class="input-field-group">
          <label>URL Foto</label>
          <input type="text" class="admin-input admin-url-input" data-type="polaroid" data-index="${idx}" value="${item.src}">
        </div>
        <div class="input-field-group">
          <label>Tulisan Tangan Polaroid</label>
          <input type="text" class="admin-input admin-caption-input" data-type="polaroid" data-index="${idx}" value="${item.caption}">
        </div>
      `;
      polaroidsContainer.appendChild(card);
    });
  }

  // Inisialisasi tampilan editor
  renderPhotoboxEditors();
  renderTimelineEditors();
  renderPolaroidEditors();

  // Handle Event Delegation untuk File Upload & Input
  document.addEventListener('change', (e) => {
    // 1. File Upload (Convert to Base64 Data URL)
    if (e.target.classList.contains('admin-file-input')) {
      const file = e.target.files[0];
      if (!file) return;

      const type = e.target.dataset.type;
      const idx = parseInt(e.target.dataset.index, 10);

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        updatePhoto(type, idx, dataUrl);
      };
      reader.readAsDataURL(file);
    }

    // 2. URL Input
    if (e.target.classList.contains('admin-url-input')) {
      const type = e.target.dataset.type;
      const idx = parseInt(e.target.dataset.index, 10);
      const url = e.target.value.trim();
      updatePhoto(type, idx, url);
    }

    // 3. Caption / Text Input
    if (e.target.classList.contains('admin-caption-input')) {
      const type = e.target.dataset.type;
      const idx = parseInt(e.target.dataset.index, 10);
      const val = e.target.value.trim();
      if (type === 'photobox') currentConfig.photobox.photos[idx].caption = val;
      if (type === 'polaroid') currentConfig.polaroids[idx].caption = val;
    }

    if (e.target.classList.contains('admin-title-input')) {
      const idx = parseInt(e.target.dataset.index, 10);
      currentConfig.timeline[idx].title = e.target.value.trim();
    }

    if (e.target.classList.contains('admin-desc-input')) {
      const idx = parseInt(e.target.dataset.index, 10);
      currentConfig.timeline[idx].desc = e.target.value.trim();
    }
  });

  function updatePhoto(type, idx, url) {
    if (type === 'photobox') {
      currentConfig.photobox.photos[idx].url = url;
      const img = document.getElementById(`preview-photobox-${idx}`);
      if (img) img.src = url;
    } else if (type === 'timeline') {
      currentConfig.timeline[idx].photo = url;
      const img = document.getElementById(`preview-timeline-${idx}`);
      if (img) img.src = url;
    } else if (type === 'polaroid') {
      currentConfig.polaroids[idx].src = url;
      const img = document.getElementById(`preview-polaroid-${idx}`);
      if (img) img.src = url;
    }
    showToast('Foto terpasang di pratinjau! Jangan lupa klik "Simpan"');
  }

  // Tombol Simpan Semua Perubahan
  document.getElementById('btn-save-all').addEventListener('click', () => {
    saveCustomConfig(currentConfig);
    showToast('🎉 Semua foto berhasil disimpan! Website utama otomatis diperbarui.');
  });

  // Tombol Reset ke Default
  document.getElementById('btn-reset-default').addEventListener('click', () => {
    if (confirm('Yakin ingin mereset semua foto kembali ke setelan awal bawaan?')) {
      resetCustomConfig();
      currentConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
      renderPhotoboxEditors();
      renderTimelineEditors();
      renderPolaroidEditors();
      showToast('Setelan foto telah direset ke bawaan.');
    }
  });

  // Tombol Salin Kode config.js (untuk deploy permanen)
  document.getElementById('btn-copy-code').addEventListener('click', () => {
    const code = `export const DEFAULT_CONFIG = ${JSON.stringify(currentConfig, null, 2)};\n`;
    navigator.clipboard.writeText(code).then(() => {
      showToast('📋 Kode konfigurasi berhasil disalin ke clipboard!');
    }).catch(() => {
      showToast('Silakan salin manual.');
    });
  });
});
