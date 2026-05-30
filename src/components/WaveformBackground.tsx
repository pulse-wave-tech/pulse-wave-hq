import { useEffect, useRef } from 'react';

interface WaveformBackgroundProps {
  className?: string;
  animate?: boolean;
}

const WaveformBackground = ({ className = '', animate = true }: WaveformBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!animate) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const drawWaveform = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);
      
      // Primary waveform
      ctx.beginPath();
      ctx.strokeStyle = 'hsl(217, 91%, 60%)'; /* #3B82F6 accent blue */
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.7;
      
      for (let x = 0; x < width; x += 2) {
        const y = height / 2 + Math.sin((x + time) * 0.01) * 30 + Math.sin((x + time) * 0.03) * 15;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Secondary waveform
      ctx.beginPath();
      ctx.strokeStyle = 'hsl(224, 64%, 52%)'; /* #1E3A8A primary blue, lightened */
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.5;
      
      for (let x = 0; x < width; x += 2) {
        const y = height / 2 + Math.sin((x + time + 100) * 0.008) * 25 + Math.cos((x + time) * 0.025) * 10;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Pulse dots
      ctx.globalAlpha = 0.8;
      for (let i = 0; i < 5; i++) {
        const x = ((time + i * 200) % (width + 100)) - 50;
        const y = height / 2 + Math.sin((x + time) * 0.01) * 30;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
        gradient.addColorStop(0, 'hsl(217, 91%, 60%)'); /* #3B82F6 accent blue */
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 1;
      animationId = requestAnimationFrame(drawWaveform);
    };

    resizeCanvas();
    drawWaveform();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default WaveformBackground;