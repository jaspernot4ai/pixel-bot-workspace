// Animation utilities for pixel-art-map

export interface AnimationFrame {
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

export type EasingFunction = (t: number) => number;

// Easing functions
export const easing = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  bounce: (t: number) => {
    if (t < 0.5) return 8 * t * t * t * t;
    const t1 = t - 1;
    return 1 - 8 * t1 * t1 * t1 * t1;
  },
};

export class AnimationController {
  private animations: Map<string, AnimationFrame> = new Map();
  private startTimes: Map<string, number> = new Map();
  private durations: Map<string, number> = new Map();
  private easingFn: EasingFunction;
  private onUpdate: () => void;

  constructor(duration: number, easingFn: EasingFunction = easing.easeOut, onUpdate: () => void) {
    this.easingFn = easingFn;
    this.onUpdate = onUpdate;
  }

  start(id: string, from: Partial<AnimationFrame>, to: Partial<AnimationFrame>, duration: number) {
    this.animations.set(id, { x: 0, y: 0, scale: 1, opacity: 1, ...from });
    this.startTimes.set(id, performance.now());
    this.durations.set(id, duration);
  }

  update(id: string, to: Partial<AnimationFrame>, duration: number) {
    const now = performance.now();
    const startTime = this.startTimes.get(id) ?? now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = this.easingFn(progress);

    const current = this.animations.get(id);
    if (!current) return;

    // Interpolate values
    if (to.x !== undefined) current.x = this.lerp(current.x, to.x, eased);
    if (to.y !== undefined) current.y = this.lerp(current.y, to.y, eased);
    if (to.scale !== undefined) current.scale = this.lerp(current.scale, to.scale, eased);
    if (to.opacity !== undefined) current.opacity = this.lerp(current.opacity, to.opacity, eased);

    this.onUpdate();

    if (progress < 1) {
      requestAnimationFrame(() => this.update(id, to, duration));
    } else {
      this.animations.delete(id);
    }
  }

  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  get(id: string): AnimationFrame | undefined {
    return this.animations.get(id);
  }
}

// Message bubble animation
export interface BubbleData {
  id: string;
  botId: string;
  message: string;
  x: number;
  y: number;
  timestamp: number;
}

export class BubbleAnimator {
  private bubbles: Map<string, BubbleData & { opacity: number; scale: number }> = new Map();
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private render: () => void;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, render: () => void) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.render = render;
  }

  show(bubble: BubbleData) {
    const key = `${bubble.botId}-${bubble.timestamp}`;
    this.bubbles.set(key, { ...bubble, opacity: 1, scale: 0 });

    // Animate in: scale 0 -> 1
    let scale = 0;
    const animateIn = () => {
      scale += 0.1;
      const b = this.bubbles.get(key);
      if (b) {
        b.scale = Math.min(scale, 1);
        this.render();
        if (scale < 1) requestAnimationFrame(animateIn);
        else this.fadeOut(key);
      }
    };
    requestAnimationFrame(animateIn);
  }

  private fadeOut(key: string) {
    let opacity = 1;
    const fade = () => {
      opacity -= 0.02;
      const b = this.bubbles.get(key);
      if (b) {
        b.opacity = Math.max(opacity, 0);
        this.render();
        if (opacity > 0) requestAnimationFrame(fade);
        else this.bubbles.delete(key);
      }
    };
    // Auto-fade after 3 seconds
    setTimeout(() => requestAnimationFrame(fade), 3000);
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const bubble of this.bubbles.values()) {
      const { x, y, message, scale, opacity } = bubble;

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y - 20);
      ctx.scale(scale, scale);

      // Bubble background
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-40, -15, 80, 30, 4);
      ctx.fill();
      ctx.stroke();

      // Text
      ctx.fillStyle = '#1f2937';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(message.substring(0, 10), 0, 0, 70);

      ctx.restore();
    }
  }
}
