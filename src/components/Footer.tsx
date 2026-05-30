import { Github } from 'lucide-react';


const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL ?? 'info@pulsewavetech.io';
const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://pulsewavetech.io';
const SITE_DISPLAY = SITE_URL.replace(/^https?:\/\//, '');

const Footer = () => {
  return (
    <footer
      style={{ borderTop: '1px solid rgba(30,58,138,0.30)', background: 'rgba(13,27,42,0.90)' }}
      className="backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img
              src="/pwt-logo.png"
              alt="PWT — Pulse Wave Tech"
              className="h-8 w-auto mb-4 opacity-50"
            />
            <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
              Intelligence delivered in real time through advanced AI/ML and automation solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-display font-bold text-xs uppercase tracking-widest mb-4"
              style={{ color: '#3B82F6', letterSpacing: '0.1em' }}
            >
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Mission', id: 'mission' },
                { label: 'Competencies', id: 'competencies' },
                { label: 'Performance', id: 'performance' },
                { label: 'Contact', id: 'contact' },
              ].map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm transition-colors"
                    style={{ color: '#6B7280' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#3B82F6')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Links */}
          <div>
            <h4
              className="font-display font-bold text-xs uppercase tracking-widest mb-4"
              style={{ color: '#3B82F6', letterSpacing: '0.1em' }}
            >
              Connect
            </h4>
            <div className="space-y-2">
              <p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm transition-colors"
                  style={{ color: '#6B7280' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#3B82F6')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p>
                <a
                  href={SITE_URL}
                  className="text-sm transition-colors"
                  style={{ color: '#6B7280' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#3B82F6')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
                >
                  {SITE_DISPLAY}
                </a>
              </p>
              <p>
                <a
                  href="https://github.com/pulse-wave-tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm transition-colors"
                  style={{ color: '#6B7280' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#3B82F6')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
                >
                  <Github size={14} />
                  GitHub
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs"
          style={{ borderTop: '1px solid rgba(30,58,138,0.20)', color: '#4B5563' }}
        >
          <span>&copy; {new Date().getFullYear()} Pulse Wave Tech LLC. All rights reserved.</span>
          <span>Built with precision &amp; purpose.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
