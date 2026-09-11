import { ArrowUp } from "lucide-react";
import { Reveal, Magnetic, scrollToId } from "./bits";
import { profile } from "../../data/portfolio";

const quickLinks = [
  { label: "About", hash: "#about" },
  { label: "Education", hash: "#education" },
  { label: "Experience", hash: "#experience" },
  { label: "Skills", hash: "#skills" },
  { label: "Projects", hash: "#projects" },
  { label: "Contact", hash: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border relative overflow-hidden" data-testid="footer">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-10">
        <Reveal>
          <button
            data-testid="footer-name"
            onClick={() => scrollToId("#home")}
            className="block w-full text-left font-heading font-bold tracking-tight leading-none text-[13vw] lg:text-[9rem] text-gradient opacity-90 hover:opacity-100 transition-opacity select-none"
            aria-label="Back to top"
          >
            ABHISHEK
            <br />
            BAND
          </button>
        </Reveal>

        <div className="mt-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-2.5 text-sm soft" data-testid="footer-availability">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
            {profile.availability}
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {quickLinks.map((l) => (
              <li key={l.hash}>
                <button
                  data-testid={`footer-link-${l.label.toLowerCase()}`}
                  onClick={() => scrollToId(l.hash)}
                  className="text-sm soft hover:text-aqua transition-colors duration-200"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <Magnetic>
            <button
              data-testid="back-to-top-btn"
              onClick={() => scrollToId("#home")}
              aria-label="Back to top"
              className="glass rounded-full w-11 h-11 flex items-center justify-center hover:border-aqua/60 transition-colors"
            >
              <ArrowUp size={17} />
            </button>
          </Magnetic>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs soft">
          <p>© 2026 {profile.name}. Crafted with strategy, motion & AI.</p>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-aqua transition-colors" data-testid="footer-linkedin">
            {profile.linkedinLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}
