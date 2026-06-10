// Web Audio API Synthesizer for Space Command Center Sound Effects
class SpaceAudioSynth {
  private ctx: AudioContext | null = null;
  private masterVolume: GainNode | null = null;
  private ambientHumGain: GainNode | null = null;
  private ambientHumOsc1: OscillatorNode | null = null;
  private ambientHumOsc2: OscillatorNode | null = null;
  private isMuted: boolean = true;

  constructor() {
    // Audio Context is initialized on first user interaction
  }

  private init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterVolume = this.ctx.createGain();
      this.masterVolume.gain.setValueAtTime(this.isMuted ? 0 : 0.25, this.ctx.currentTime);
      this.masterVolume.connect(this.ctx.destination);
      
      this.startAmbientHum();
    } catch (e) {
      console.warn("Web Audio API not supported in this browser:", e);
    }
  }

  public setMute(mute: boolean) {
    this.isMuted = mute;
    this.init();
    
    if (this.ctx && this.masterVolume) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      
      const targetGain = mute ? 0 : 0.25;
      this.masterVolume.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private startAmbientHum() {
    if (!this.ctx || !this.masterVolume) return;

    this.ambientHumGain = this.ctx.createGain();
    this.ambientHumGain.gain.setValueAtTime(0.04, this.ctx.currentTime); // Very quiet
    this.ambientHumGain.connect(this.masterVolume);

    // Deep sub bass hum (55Hz)
    this.ambientHumOsc1 = this.ctx.createOscillator();
    this.ambientHumOsc1.type = 'sine';
    this.ambientHumOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);
    
    // Higher engine harmonics (110Hz)
    this.ambientHumOsc2 = this.ctx.createOscillator();
    this.ambientHumOsc2.type = 'triangle';
    this.ambientHumOsc2.frequency.setValueAtTime(110, this.ctx.currentTime);

    // Filter to make it warm and low-passed
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(120, this.ctx.currentTime);

    this.ambientHumOsc1.connect(filter);
    this.ambientHumOsc2.connect(filter);
    filter.connect(this.ambientHumGain);

    this.ambientHumOsc1.start();
    this.ambientHumOsc2.start();
  }

  public playClick() {
    this.init();
    if (this.isMuted || !this.ctx || !this.masterVolume) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.masterVolume);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  public playHover() {
    this.init();
    if (this.isMuted || !this.ctx || !this.masterVolume) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.setValueAtTime(1000, this.ctx.currentTime + 0.01);

    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(this.masterVolume);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  public playBoot() {
    this.init();
    if (this.isMuted || !this.ctx || !this.masterVolume) return;

    const now = this.ctx.currentTime;
    const notes = [440, 554, 659, 880, 1109]; // Futuristic arpeggio
    
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      
      gain.gain.setValueAtTime(0.15, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.3);

      osc.connect(gain);
      gain.connect(this.masterVolume!);

      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.35);
    });

    // Surge Sweep
    const oscSweep = this.ctx.createOscillator();
    const gainSweep = this.ctx.createGain();
    
    oscSweep.type = 'sawtooth';
    oscSweep.frequency.setValueAtTime(100, now + 0.5);
    oscSweep.frequency.exponentialRampToValueAtTime(2000, now + 1.2);

    // Lowpass sweep filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, now + 0.5);
    filter.frequency.exponentialRampToValueAtTime(3000, now + 1.2);

    gainSweep.gain.setValueAtTime(0, now + 0.5);
    gainSweep.gain.linearRampToValueAtTime(0.1, now + 0.7);
    gainSweep.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

    oscSweep.connect(filter);
    filter.connect(gainSweep);
    gainSweep.connect(this.masterVolume);

    oscSweep.start(now + 0.5);
    oscSweep.stop(now + 1.4);
  }

  public playWarp() {
    this.init();
    if (this.isMuted || !this.ctx || !this.masterVolume) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.6);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(200, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1500, this.ctx.currentTime + 0.6);
    filter.Q.setValueAtTime(3, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterVolume);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.65);
  }

  public playTransmission() {
    this.init();
    if (this.isMuted || !this.ctx || !this.masterVolume) return;

    const now = this.ctx.currentTime;
    // Rhythmic beeps
    for (let i = 0; i < 6; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(i % 2 === 0 ? 1400 : 1600, now + i * 0.08);

      gain.gain.setValueAtTime(0.04, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.06);

      osc.connect(gain);
      gain.connect(this.masterVolume);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.07);
    }
  }

  public playTerminalType() {
    this.init();
    if (this.isMuted || !this.ctx || !this.masterVolume) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(Math.random() * 200 + 400, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);

    osc.connect(gain);
    gain.connect(this.masterVolume);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.03);
  }
}

export const spaceAudio = new SpaceAudioSynth();
export default spaceAudio;
