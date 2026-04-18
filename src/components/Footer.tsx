import { Github } from 'lucide-react';

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL ?? 'info@pulsewavetech.io';
const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://pulsewavetech.io';
const SITE_DISPLAY = SITE_URL.replace(/^https?:\/\//, '');

const Footer = () => {
  return (
    <footer className="border-t border-primary/20 bg-card/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Pulse Wave Tech</h3>
            <p className="text-muted-foreground">
              Intelligence delivered in real time through advanced AI/ML and automation solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Mission
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Links */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Connect</h4>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="text-muted-foreground">
                <a href={SITE_URL} className="hover:text-primary transition-colors">
                  {SITE_DISPLAY}
                </a>
              </p>
              <div className="pt-2">
                <a 
                  href="https://github.com/pulsewavetech" 
                  className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Pulse Wave Tech. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Bottom pulse line */}
      <div className="wave-divider opacity-50" />
    </footer>
  );
};

export default Footer;