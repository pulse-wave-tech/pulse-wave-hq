import { useRef, useState } from 'react';
import WaveformBackground from './WaveformBackground';

// Deterministic shards the halo shatters into on hover — each flies out to a
// fixed angle/distance so the glow appears to disintegrate into the mesh.
const SHARD_COUNT = 60;
const HALO_SHARDS = Array.from({ length: SHARD_COUNT }, (_, i) => {
  const angle = (i / SHARD_COUNT) * Math.PI * 2 + (i % 5) * 0.4;
  // Shoot clear across the banner — wide horizontal spread, far travel.
  const dist = 420 + (i % 7) * 130;          // 420..1200px outward
  return {
    tx: Math.round(Math.cos(angle) * dist * 1.6),  // stretch horizontally across the banner
    ty: Math.round(Math.sin(angle) * dist),
    size: 3 + (i % 4),                         // 3..6px
    delay: ((i * 37) % 100) / 1000 * 2.4,      // 0..0.24s scattered stagger
  };
});

const HeroSection = () => {
  const haloRef = useRef<HTMLDivElement>(null);
  const [haloActive, setHaloActive] = useState(false);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // When the cursor passes through the halo region, dissolve the solid glow
  // into the cyber-network mesh (proximity to the logo centre).
  const onHaloMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = haloRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setHaloActive(Math.sqrt(dx * dx + dy * dy) < 150);
  };
  const onHaloLeave = () => setHaloActive(false);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#0D1B2A' }}
    >
      <style>{`
        @keyframes pulse-ring { 0%,100% { opacity: 0.45; transform: scale(1); } 50% { opacity: 0.85; transform: scale(1.05); } }
        @keyframes logo-rise { 0% { opacity: 0; transform: translateY(28px) scale(0.93); filter: blur(7px); } 100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
        @keyframes logo-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        @keyframes logo-sheen { 0% { transform: translateX(-140%) skewX(-16deg); } 55%,100% { transform: translateX(190%) skewX(-16deg); } }
        @keyframes ped-glow { 0%,100% { opacity: 0.55; transform: translateX(-50%) scaleX(1); } 50% { opacity: 0.9; transform: translateX(-50%) scaleX(1.08); } }
        @keyframes halo-shatter {
          0%   { opacity: 0; transform: translate(-50%,-50%) scale(0.2); }
          12%  { opacity: 1; transform: translate(-50%,-50%) scale(1.8); }
          22%  { opacity: 0.7; }
          60%  { opacity: 0; transform: translate(calc(-50% + var(--tx) * 0.78), calc(-50% + var(--ty) * 0.78)) scale(1.3); }
          100% { opacity: 0; transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.3); }
        }
        .halo-shard  { animation: halo-shatter 1.15s cubic-bezier(.16,.8,.3,1) both; }
        .ring-pulse  { animation: pulse-ring 3.4s ease-in-out infinite; }
        .logo-rise   { animation: logo-rise 1.25s cubic-bezier(.2,.75,.2,1) both; }
        .logo-float  { animation: logo-float 6.5s ease-in-out 1.25s infinite; }
        .logo-sheen  { animation: logo-sheen 6s ease-in-out 1.8s infinite; }
        .ped-glow    { animation: ped-glow 3.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ring-pulse,.logo-rise,.logo-float,.ped-glow { animation: none !important; }
          .logo-sheen,.halo-shard { display: none !important; }
        }
      `}</style>

      {/* Particle mesh canvas */}
      <WaveformBackground count={80} connectDist={100} />

      {/* Gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 60%, rgba(13,27,42,0) 0%, rgba(13,27,42,0.65) 100%)',
        }}
      />

      {/* ── Main hero content ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-5xl mx-auto">

          {/* Logo with particle-mesh halo (same animation as the page background) */}
          <div className="flex items-center justify-center mb-8">
            <div
              ref={haloRef}
              className="logo-rise"
              onMouseMove={onHaloMove}
              onMouseLeave={onHaloLeave}
              style={{ position: 'relative', width: '360px', height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >

              {/* Particle-mesh node cloud behind the logo — matches the background
                  animation, radially masked so it reads as a soft cloud, not a circle.
                  Brightens & spreads as the solid halo dissolves into it on hover. */}
              <div style={{
                position: 'absolute', inset: 0,
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 28%, rgba(0,0,0,0.4) 55%, transparent 78%)',
                maskImage: 'radial-gradient(circle at 50% 50%, #000 28%, rgba(0,0,0,0.4) 55%, transparent 78%)',
                opacity: haloActive ? 1 : 0.72,
                transform: haloActive ? 'scale(1.14)' : 'scale(1)',
                transition: 'opacity 0.55s ease, transform 0.7s cubic-bezier(.2,.75,.2,1)',
              }}>
                <WaveformBackground count={34} connectDist={86} mouseRadius={150} />
              </div>

              {/* Concentric energy ring — breathes with the glow, then disperses
                  outward (dissolving into the mesh) when the cursor passes through */}
              <div className={haloActive ? '' : 'ring-pulse'} style={{
                position: 'absolute', width: '230px', height: '230px',
                borderRadius: '50%',
                border: '1px solid rgba(96,165,250,0.22)',
                boxShadow: 'inset 0 0 44px rgba(59,130,246,0.10), 0 0 30px rgba(59,130,246,0.10)',
                pointerEvents: 'none',
                opacity: haloActive ? 0 : 1,
                transform: haloActive ? 'scale(1.4)' : 'scale(1)',
                transition: 'opacity 0.5s ease, transform 0.6s ease',
              }} />

              {/* Soft pulsing glow behind the logo (dual-tone for depth) — scales
                  out and fades as it disintegrates into the network connectors */}
              <div className={haloActive ? '' : 'ring-pulse'} style={{
                position: 'absolute', inset: '64px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(96,165,250,0.30) 0%, rgba(37,99,235,0.08) 52%, transparent 74%)',
                pointerEvents: 'none',
                opacity: haloActive ? 0 : 1,
                transform: haloActive ? 'scale(1.5)' : 'scale(1)',
                transition: 'opacity 0.55s ease, transform 0.7s cubic-bezier(.2,.75,.2,1)',
              }} />

              {/* Shatter layer — when the cursor enters, the halo breaks into
                  glowing shards that scatter outward into the network mesh.
                  Shards stay invisible (opacity 0) until the burst animation runs. */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'visible' }}>
                {HALO_SHARDS.map((s, i) => (
                  <div
                    key={i}
                    className={haloActive ? 'halo-shard' : ''}
                    style={{
                      position: 'absolute', left: '50%', top: '50%',
                      width: `${s.size}px`, height: `${s.size}px`, borderRadius: '50%',
                      background: 'rgba(219,234,254,1)',
                      boxShadow: '0 0 10px rgba(147,197,253,1), 0 0 22px rgba(96,165,250,0.95), 0 0 40px rgba(59,130,246,0.7)',
                      opacity: 0,
                      transform: 'translate(-50%,-50%) scale(0.2)',
                      // CSS vars consumed by the halo-shatter keyframes
                      ['--tx' as string]: `${s.tx}px`,
                      ['--ty' as string]: `${s.ty}px`,
                      animationDelay: `${s.delay}s`,
                    }}
                  />
                ))}
              </div>

              {/* Logo + sheen wrapper — gently floats */}
              <div className="logo-float" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                {/* Logo image — layered glow gives the wordmark real depth */}
                <img
                  src="/pwt-logo.png"
                  alt="PWT Logo"
                  style={{
                    position: 'relative', zIndex: 2,
                    height: '134px', width: 'auto', objectFit: 'contain',
                    filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.40)) drop-shadow(0 0 16px rgba(96,165,250,0.70)) drop-shadow(0 0 44px rgba(37,99,235,0.45)) drop-shadow(0 12px 30px rgba(0,0,0,0.55))',
                  }}
                />

                {/* Metallic light sweep — clipped to the logo silhouette via mask */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', overflow: 'hidden',
                  WebkitMaskImage: 'url(/pwt-logo.png)', maskImage: 'url(/pwt-logo.png)',
                  WebkitMaskSize: 'contain', maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center', maskPosition: 'center',
                }}>
                  <div className="logo-sheen" style={{
                    position: 'absolute', top: '-20%', bottom: '-20%', width: '42%',
                    background: 'linear-gradient(100deg, transparent, rgba(219,234,254,0.85), rgba(255,255,255,0.6), transparent)',
                  }} />
                </div>
              </div>

              {/* Grand pedestal glow — grounds the logo like it sits on a plinth */}
              <div className="ped-glow" style={{
                position: 'absolute', bottom: '46px', left: '50%',
                width: '240px', height: '36px',
                background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.34) 0%, rgba(59,130,246,0.10) 45%, transparent 72%)',
                filter: 'blur(7px)',
                pointerEvents: 'none',
              }} />
            </div>
          </div>

          {/* Impact words — single line */}
          <div className="mb-8">
            <span
              className="font-display font-black"
              style={{
                fontSize: 'clamp(1rem, 2.2vw, 1.8rem)',
                letterSpacing: '-0.03em',
                color: '#fff',
                textShadow: '0 2px 40px rgba(0,0,0,0.4)',
              }}
            >
              People.&nbsp;&nbsp;Mission.&nbsp;&nbsp;
            </span>
            <span
              className="font-display font-black"
              style={{
                fontSize: 'clamp(1rem, 2.2vw, 1.8rem)',
                letterSpacing: '-0.03em',
                color: '#3B82F6',
                textShadow: '0 0 60px rgba(59,130,246,0.45)',
              }}
            >
              Impact.
            </span>
          </div>

          {/* Tagline */}
          <p
            className="font-display font-semibold mb-12"
            style={{
              fontSize: 'clamp(0.6rem, 0.85vw, 0.75rem)',
              color: 'rgba(147,197,253,0.80)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Driven by purpose&nbsp;&nbsp;·&nbsp;&nbsp;Built to evolve
          </p>

          {/* CTA */}
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-3 px-10 py-4 font-display font-bold text-sm uppercase tracking-widest text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #1E3A8A, #2D5BE3)',
              border: '1px solid rgba(59,130,246,0.45)',
              borderRadius: '4px',
              letterSpacing: '0.12em',
              boxShadow: '0 0 28px -8px rgba(30,58,138,0.70)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 48px -8px rgba(59,130,246,0.85)';
              (e.currentTarget as HTMLButtonElement).style.border = '1px solid rgba(59,130,246,0.70)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 28px -8px rgba(30,58,138,0.70)';
              (e.currentTarget as HTMLButtonElement).style.border = '1px solid rgba(59,130,246,0.45)';
            }}
          >
            Start the Conversation
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
