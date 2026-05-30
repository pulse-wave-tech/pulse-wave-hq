import { useEffect, useRef } from 'react';

interface WaveformBackgroundProps {
  className?: string;
  animate?: boolean;
  /** Number of particles (default 70) */
  count?: number;
  /** Max distance to draw connecting lines (default 90) */
  connectDist?: number;
  /** React to mouse movement: lines to cursor + gentle repulsion (default true) */
  interactive?: boolean;
  /** Radius of cursor influence in px (default 140) */
  mouseRadius?: number;
}

/**
 * PWT particle-mesh canvas — glowing dots with connecting lines.
 * Matches the brand banner used across internal PWT properties.
 */
const WaveformBackground = ({
  className = '',
  animate = true,
  count = 70,
  connectDist = 90,
  interactive = true,
  mouseRadius = 140,
}: WaveformBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      r: number; alpha: number;
    };

    let particles: Particle[] = [];
    let rafId: number;
    let w = 0, h = 0;

    // Cursor position in canvas-local coords (active=false when off-canvas)
    const mouse = { x: 0, y: 0, active: false };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.8 + 0.8,
          alpha: Math.random() * 0.55 + 0.30,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Move particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Gentle repulsion away from the cursor
        if (interactive && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius && dist > 0.01) {
            const force = (1 - dist / mouseRadius) * 0.6;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            const lineAlpha = (1 - dist / connectDist) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59,130,246,${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw connecting lines to the cursor (brighter than particle links)
      if (interactive && mouse.active) {
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            const lineAlpha = (1 - dist / mouseRadius) * 0.5;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147,197,253,${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
        // Soft glow node at the cursor itself
        const cg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 6);
        cg.addColorStop(0, 'rgba(147,197,253,0.9)');
        cg.addColorStop(1, 'rgba(59,130,246,0)');
        ctx.beginPath();
        ctx.fillStyle = cg;
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw glowing dots
      for (const p of particles) {
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0, `rgba(147,197,253,${p.alpha})`);        // blue-300
        grd.addColorStop(0.4, `rgba(59,130,246,${(p.alpha * 0.6).toFixed(3)})`);
        grd.addColorStop(1,   'rgba(59,130,246,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      }

      if (animate) rafId = requestAnimationFrame(draw);
    };

    resize();
    spawn();
    if (animate) rafId = requestAnimationFrame(draw);
    else draw();

    const ro = new ResizeObserver(() => { resize(); spawn(); if (!animate) draw(); });
    ro.observe(canvas);

    // Track the cursor relative to the canvas (canvas itself is pointer-events:none,
    // so listen on the window and translate via the bounding rect)
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      mouse.x = x;
      mouse.y = y;
    };
    const onLeave = () => { mouse.active = false; };

    if (interactive) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseout', onLeave);
    }

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, [animate, count, connectDist, interactive, mouseRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default WaveformBackground;
