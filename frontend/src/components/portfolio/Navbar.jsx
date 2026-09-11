import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { scrollToId } from "./bits";

const links = [
  { label: "About", hash: "#about" },
  { label: "Education", hash: "#education" },
  { label: "Experience", hash: "#experience" },
  { label: "Skills", hash: "#skills" },
  { label: "Projects", hash: "#projects" },
  { label: "Contact", hash: "#contact" },
];

export function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (hash) => {
    setOpen(false);
    scrollToId(hash);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
      data-testid="navbar"
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between" aria-label="Primary">
        <button
          data-testid="nav-logo"
          onClick={() => go("#home")}
          className="font-heading text-xl font-bold tracking-tight"
        >
          AB<span className="text-aqua">.</span>
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.hash}>
              <button
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                onClick={() => go(l.hash)}
                className="text-sm soft hover:text-foreground transition-colors duration-200 font-medium"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            data-testid="theme-toggle-button"
            onClick={onToggleTheme}
            aria-label="Toggle dark and light mode"
            className="glass rounded-full w-10 h-10 flex items-center justify-center hover:border-aqua/60 transition-colors duration-200"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            data-testid="mobile-menu-button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden glass rounded-full w-10 h-10 flex items-center justify-center"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden glass mt-2 mx-4 rounded-2xl p-4" data-testid="mobile-menu">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.hash}>
                <button
                  data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                  onClick={() => go(l.hash)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm soft hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
