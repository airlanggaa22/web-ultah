/**
 * AUDIO SYNTH & SOUND EFFECTS ENGINE
 * Menggunakan Web Audio API untuk menghasilkan musik romantis & efek suara
 * secara instan tanpa ketergantungan file eksternal (tetap mendukung MP3 eksternal jika ada).
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.bgmAudio = null;
    this.isBgmPlaying = false;
    this.isMuted = false;
    this.synthInterval = null;
    this.usingSynthBgm = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Coba putar MP3 eksternal; jika belum ada atau gagal, putar Synthesizer Piano romantis
  startBGM(src, volume = 0.6) {
    this.init();
    if (this.isBgmPlaying) return;

    this.bgmAudio = new Audio(src);
    this.bgmAudio.loop = true;
    this.bgmAudio.volume = volume;

    this.bgmAudio.play().then(() => {
      this.isBgmPlaying = true;
      this.usingSynthBgm = false;
    }).catch(() => {
      // Fallback ke Romantic Synthesizer BGM jika MP3 belum dimasukkan
      console.log('Menggunakan synth piano romantic fallback...');
      this.startSynthRomanticBGM();
    });
  }

  // Melodi Piano Romantis Lofi / Sweet Seventeen Theme
  startSynthRomanticBGM() {
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;
    this.usingSynthBgm = true;

    // Chord progression: C - G - Am - F (Romantic Canon progression)
    const chords = [
      [261.63, 329.63, 392.00], // C
      [196.00, 246.94, 293.66], // G
      [220.00, 261.63, 329.63], // Am
      [174.61, 220.00, 261.63]  // F
    ];
    let step = 0;

    const playChordStep = () => {
      if (!this.isBgmPlaying || this.isMuted) return;
      const currentChord = chords[step % chords.length];
      step++;

      currentChord.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.isBgmPlaying || this.isMuted) return;
          this.playPianoTone(freq, 2.2, 0.08);
          // Tambahkan arpeggio nada tinggi yang manis
          if (idx === 2) {
            this.playPianoTone(freq * 2, 1.8, 0.05);
          }
        }, idx * 180);
      });
    };

    playChordStep();
    this.synthInterval = setInterval(playChordStep, 2400);
  }

  playPianoTone(freq, duration = 1.5, gainLevel = 0.1) {
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // Efek Suara: Pop Hati
  playPop() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  // Efek Suara: Kristal / Chime Berkilau
  playChime() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playPianoTone(freq, 1.2, 0.12);
      }, idx * 80);
    });
  }

  // Efek Suara: Tiupan Lilin (Derau Angin Halus)
  playBlow() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(200, this.ctx.currentTime + 0.8);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
    noise.stop(this.ctx.currentTime + 0.8);
  }

  // Efek Suara: Dentuman Kembang Api
  playFireworks() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.6);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.6);

    // Gemersik spark
    setTimeout(() => {
      this.playChime();
    }, 150);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgmAudio) {
      this.bgmAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }
}

export const sounds = new SoundEngine();
