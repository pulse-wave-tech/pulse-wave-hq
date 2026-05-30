import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img
            src="/pwt-logo.png"
            alt="Pulse Wave Tech"
            className="h-10 w-auto object-contain"
          />
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#mission" className="text-muted-foreground hover:text-foreground transition-colors">
            Mission
          </a>
          <a href="#competencies" className="text-muted-foreground hover:text-foreground transition-colors">
            Competencies
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
