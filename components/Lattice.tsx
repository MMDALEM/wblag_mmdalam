"use client";

import { useEffect, useRef } from "react";

type Vec = { x: number; y: number };

type Palette = { dot: string; basis: string; target: string; muted: string; mono: string };

function readPalette(el: Element): Palette {
  const s = getComputedStyle(el);
  return {
    dot: s.getPropertyValue("--lattice-dot").trim() || "#9aa",
    basis: s.getPropertyValue("--teal").trim() || "#0b6e6e",
    target: s.getPropertyValue("--amber").trim() || "#c9820a",
    muted: s.getPropertyValue("--muted").trim() || "#567",
    // Canvas fonts can't resolve CSS variables, so read the concrete family list.
    mono: s.getPropertyValue("--font-plex-mono").trim() || "monospace",
  };
}

/**
 * A 2D lattice L(b1, b2) drawn behind the hero. The highlighted point is the
 * lattice point closest to the pointer — a small nod to the Closest Vector
 * Problem that lattice-based post-quantum schemes (ML-KEM, ML-DSA) rely on.
 */
export default function Lattice({ dir }: { dir: "rtl" | "ltr" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let palette = readPalette(document.documentElement);
    let width = 0;
    let height = 0;
    let spacing = 56;
    let origin: Vec = { x: 0, y: 0 };
    let pointer: Vec | null = null;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spacing = width < 640 ? 40 : 56;
      // Anchor the basis in the open space under the portrait so it isn't covered.
      const portrait = host.querySelector(".hero-portrait")?.getBoundingClientRect();
      origin = portrait
        ? {
            x: portrait.left - rect.left + portrait.width * (dir === "rtl" ? 0.3 : 0.45),
            y: Math.min(height - 96, (portrait.bottom - rect.top + height) / 2 - 24),
          }
        : { x: dir === "rtl" ? width * 0.22 : width * 0.78, y: height * 0.8 };
      draw(performance.now());
    };

    const basisAt = (t: number): [Vec, Vec] => {
      const angle = reduceMotion.matches ? -0.12 : -0.12 + Math.sin((t - start) / 9000) * 0.06;
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      const raw: [Vec, Vec] = [
        { x: spacing, y: 0 },
        { x: spacing * 0.42, y: spacing * 0.86 },
      ];
      return raw.map((v) => ({ x: v.x * c - v.y * s, y: v.x * s + v.y * c })) as [Vec, Vec];
    };

    // Babai rounding, then check the neighbouring cells for the true nearest point.
    const nearest = (p: Vec, b1: Vec, b2: Vec) => {
      const det = b1.x * b2.y - b2.x * b1.y;
      const dx = p.x - origin.x;
      const dy = p.y - origin.y;
      const a = (dx * b2.y - b2.x * dy) / det;
      const b = (b1.x * dy - dx * b1.y) / det;
      let best = { i: 0, j: 0, d: Infinity, x: 0, y: 0 };
      for (let i = Math.round(a) - 1; i <= Math.round(a) + 1; i++) {
        for (let j = Math.round(b) - 1; j <= Math.round(b) + 1; j++) {
          const x = origin.x + i * b1.x + j * b2.x;
          const y = origin.y + i * b1.y + j * b2.y;
          const d = (x - p.x) ** 2 + (y - p.y) ** 2;
          if (d < best.d) best = { i, j, d, x, y };
        }
      }
      return best;
    };

    const arrow = (from: Vec, to: Vec, color: string) => {
      const angle = Math.atan2(to.y - from.y, to.x - from.x);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 1.75;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(to.x, to.y);
      ctx.lineTo(to.x - 8 * Math.cos(angle - 0.4), to.y - 8 * Math.sin(angle - 0.4));
      ctx.lineTo(to.x - 8 * Math.cos(angle + 0.4), to.y - 8 * Math.sin(angle + 0.4));
      ctx.closePath();
      ctx.fill();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const [b1, b2] = basisAt(t);

      // Lattice points: walk enough integer combinations to cover the canvas.
      const reach = Math.ceil(Math.hypot(width, height) / (spacing * 0.8));
      ctx.fillStyle = palette.dot;
      for (let i = -reach; i <= reach; i++) {
        for (let j = -reach; j <= reach; j++) {
          const x = origin.x + i * b1.x + j * b2.x;
          const y = origin.y + i * b1.y + j * b2.y;
          if (x < -4 || y < -4 || x > width + 4 || y > height + 4) continue;
          ctx.beginPath();
          ctx.arc(x, y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Fundamental parallelogram + basis vectors.
      const p1 = { x: origin.x + b1.x, y: origin.y + b1.y };
      const p2 = { x: origin.x + b2.x, y: origin.y + b2.y };
      const p3 = { x: p1.x + b2.x, y: p1.y + b2.y };
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = palette.basis;
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
      arrow(origin, p1, palette.basis);
      arrow(origin, p2, palette.basis);
      ctx.font = `italic 13px ${palette.mono}`;
      ctx.fillStyle = palette.basis;
      ctx.fillText("b₁", p1.x + 6, p1.y - 6);
      ctx.fillText("b₂", p2.x - 18, p2.y + 16);

      // Target: the pointer, or a slow drifting point when idle.
      const elapsed = reduceMotion.matches ? 0 : (t - start) / 1000;
      const target = pointer ?? {
        x: origin.x + Math.sin(elapsed * 0.3) * spacing * 3.2 + spacing * 0.5,
        y: origin.y + Math.cos(elapsed * 0.47) * spacing * 0.7 + spacing * 0.2,
      };
      const n = nearest(target, b1, b2);

      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = palette.target;
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(target.x, target.y);
      ctx.lineTo(n.x, n.y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(target.x, target.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = palette.target;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(n.x, n.y, 9, 0, Math.PI * 2);
      ctx.strokeStyle = palette.target;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(n.x, n.y, 3.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = `12px ${palette.mono}`;
      ctx.fillStyle = palette.muted;
      const label = `(${n.i}, ${n.j})`.replace(/-/g, "−");
      ctx.fillText(label, n.x + 13, n.y - 11);
    };

    const loop = (t: number) => {
      draw(t);
      if (!reduceMotion.matches || pointer) raf = requestAnimationFrame(loop);
    };

    const run = () => {
      cancelAnimationFrame(raf);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = host.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (reduceMotion.matches) draw(performance.now());
    };
    const onLeave = () => {
      pointer = null;
      if (reduceMotion.matches) draw(performance.now());
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      run();
    });
    io.observe(host);
    const themeObserver = new MutationObserver(() => {
      palette = readPalette(document.documentElement);
      draw(performance.now());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      palette = readPalette(document.documentElement);
      draw(performance.now());
    };
    scheme.addEventListener("change", onScheme);
    reduceMotion.addEventListener("change", run);
    document.addEventListener("visibilitychange", run);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    resize();
    run();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      scheme.removeEventListener("change", onScheme);
      reduceMotion.removeEventListener("change", run);
      document.removeEventListener("visibilitychange", run);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [dir]);

  return <canvas ref={canvasRef} className="lattice" aria-hidden="true" />;
}
