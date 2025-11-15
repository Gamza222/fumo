// Constrained easing that keeps values between 0.6 and 0.9 (60%-90% density)
const ease = (t: number): number => {
  const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  return 0.6 + eased * 0.3; // Maps 0-1 to 0.6-0.9
};

export class AsciiEngine {
  private w = 0;
  private h = 0;
  private chars = "";
  private charLen = 0;

  private values: Float32Array = new Float32Array(0);
  private t: Float32Array = new Float32Array(0);
  private dir: Int8Array = new Int8Array(0);
  private frames = 0;

  private mx = -1;
  private my = -1;
  private mt = 0;
  private active = false;

  // Canvas rendering
  private ctx: CanvasRenderingContext2D | null = null;
  private charWidth = 0;
  private charHeight = 0;

  setCanvas(
    ctx: CanvasRenderingContext2D,
    charWidth: number,
    charHeight: number
  ): void {
    this.ctx = ctx;
    this.charWidth = charWidth;
    this.charHeight = charHeight;
  }

  init(
    w: number,
    h: number,
    chars: string,
    frames: number,
    blur: number
  ): void {
    this.w = w;
    this.h = h;
    this.chars = chars;
    this.charLen = chars.length;
    this.frames = frames;

    const size = w * h;
    this.values = new Float32Array(size);
    this.t = new Float32Array(size);
    this.dir = new Int8Array(size);

    const raw = new Float32Array(size);
    for (let i = 0; i < size; i++) {
      const rand = Math.random();
      // Start with 60%-90% density range
      raw[i] = (0.6 + rand * 0.3) * this.charLen * 2;
    }

    for (let step = 0; step < blur; step++) {
      for (let i = 0; i < size; i++) {
        const x = i % w;
        const y = Math.floor(i / w);
        const val = raw[i] ?? 0;
        const left = x > 0 ? (raw[i - 1] ?? val) : val;
        const right = x < w - 1 ? (raw[i + 1] ?? val) : val;
        const top = y > 0 ? (raw[i - w] ?? val) : val;
        const bottom = y < h - 1 ? (raw[i + w] ?? val) : val;
        raw[i] = (val + left + right + top + bottom) * 0.2;
      }
    }

    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < size; i++) {
      const val = raw[i] ?? 0;
      if (val < min) min = val;
      if (val > max) max = val;
    }

    const range = max - min;
    for (let i = 0; i < size; i++) {
      const val = raw[i] ?? 0;
      const norm = (val - min) / range;
      this.t[i] = norm;
      this.dir[i] = 1;
      this.values[i] = ease(norm) * (this.charLen - 1);
    }
  }

  setMouse(x: number, y: number): void {
    this.mx = x;
    this.my = y;
    this.active = true;
  }

  clearMouse(): void {
    this.active = false;
  }

  update(): void {
    const invFrames = 1 / this.frames;
    const size = this.w * this.h;

    for (let i = 0; i < size; i++) {
      const currentT = this.t[i] ?? 0;
      const currentDir = this.dir[i] ?? 1;

      let newT = currentT + currentDir * invFrames;
      let newDir = currentDir;

      if (newT > 1) {
        newT = 1;
        newDir = -1;
      } else if (newT < 0) {
        newT = 0;
        newDir = 1;
      }

      this.t[i] = newT;
      this.dir[i] = newDir;
      this.values[i] = ease(newT) * (this.charLen - 1);
    }

    if (this.active) this.mt += 0.016;
  }

  render(_colors: Record<string, string> | null, _defaultColor: string): void {
    if (!this.ctx) return;

    const ctx = this.ctx;
    const morphX = this.active ? 1 + Math.sin(this.mt * 1.5) * 3 : 0;
    const morphY = this.active ? 1 + Math.cos(this.mt * 1.2) * 2 : 0;

    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Set color to white
    ctx.fillStyle = "#ffffff";

    // Draw characters
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        const i = y * this.w + x;
        const value = this.values[i] ?? 0;
        let idx = Math.round(value) % this.charLen;

        // Mouse morph
        if (this.active && morphX > 0) {
          const dx = x - this.mx;
          const dy = y - this.my;
          const dist2 =
            (dx * dx) / (morphX * morphX) + (dy * dy) / (morphY * morphY);
          if (dist2 < 1) {
            const darken = Math.pow(1 - Math.sqrt(dist2), 1.2) * 30;
            idx = Math.min(idx + Math.round(darken), this.charLen - 1);
          }
        }

        const char = this.chars[idx] ?? " ";

        // Draw character (all white)
        ctx.fillText(char, x * this.charWidth, y * this.charHeight);
      }
    }
  }
}
