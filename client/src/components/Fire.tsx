import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

/**
 * The fire from the packaging, as page furniture.
 *
 * Everything here is decoration: it never takes pointer events, it is hidden
 * from assistive tech, and it stands still for visitors who asked for reduced
 * motion (the flame layers through CSS, the embers by not starting at all).
 */

/** Flames rising from the bottom edge of the nearest positioned ancestor. */
export function FlameFloor({ low, className }: { low?: boolean; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {!low && <div className="flames-floor is-back" />}
      <div className={cn("flames-floor", low && "is-low")} />
    </div>
  );
}

/** Flames licking up both sides, as on the front of the box. Wide screens only. */
export function FlameSides({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 hidden overflow-hidden md:block", className)}
    >
      <div className="flames-side" />
      <div className="flames-side is-right" />
    </div>
  );
}

type Ember = {
  x: number;
  y: number;
  r: number;
  vy: number;
  drift: number;
  phase: number;
  life: number;
  ttl: number;
  hot: boolean;
};

/**
 * Embers drifting up through the section, like the sparks on the box.
 *
 * A canvas rather than a few dozen animated elements: one paint per frame, no
 * layout, and it stops entirely while the section is off screen or the tab is
 * hidden, so the rest of the page pays nothing for it.
 */
export function Embers({ className, density = 1 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let embers: Ember[] = [];
    let frame = 0;
    let last = 0;
    let visible = true;

    const spawn = (anywhere: boolean): Ember => {
      const ttl = 4 + Math.random() * 5;
      return {
        x: Math.random() * width,
        // New embers leave from the fire at the bottom; the first batch is
        // scattered so the section doesn't open on an empty sky.
        y: anywhere ? Math.random() * height : height + Math.random() * 30,
        r: 0.6 + Math.random() * 1.9,
        vy: 22 + Math.random() * 58,
        drift: 8 + Math.random() * 20,
        phase: Math.random() * Math.PI * 2,
        life: anywhere ? Math.random() * ttl : 0,
        ttl,
        hot: Math.random() < 0.3,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // One ember per ~26,000 px² of section, capped: a phone gets about
      // twenty, a wide desktop sixty-odd.
      const target = Math.round(Math.min(70, Math.max(14, (width * height) / 26000)) * density);
      embers = Array.from({ length: target }, () => spawn(true));
    };

    const tick = (now: number) => {
      frame = window.requestAnimationFrame(tick);
      // Clamp the step so a tab that was in the background doesn't fling
      // every ember off the top in one frame.
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life += dt;
        e.y -= e.vy * dt;
        e.x += Math.sin(e.phase + e.life * 1.6) * e.drift * dt;
        if (e.life > e.ttl || e.y < -10) {
          embers[i] = spawn(false);
          continue;
        }
        const t = e.life / e.ttl;
        // Fade in fast, burn out slowly.
        const alpha = Math.min(1, t * 6) * (1 - t) * (1 - t);
        const glow = e.r * 4.5;
        const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, glow);
        grad.addColorStop(0, e.hot ? `rgba(255, 214, 120, ${alpha})` : `rgba(255, 138, 40, ${alpha})`);
        grad.addColorStop(0.35, `rgba(255, 92, 18, ${alpha * 0.45})`);
        grad.addColorStop(1, "rgba(224, 42, 18, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(e.x, e.y, glow, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const start = () => {
      if (frame || !visible || document.hidden) return;
      last = performance.now();
      frame = window.requestAnimationFrame(tick);
    };
    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    const sizes = new ResizeObserver(resize);
    sizes.observe(canvas);
    const onScreen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    onScreen.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      sizes.disconnect();
      onScreen.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}

/** The logo's gold line with the diamond in the middle. */
export function GoldRule({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("gold-rule", className)}>
      <span />
    </div>
  );
}
