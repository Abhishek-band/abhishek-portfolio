import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, BadgeCheck } from "lucide-react";
import { Magnetic, Counter, scrollToId } from "./bits";
import { profile, stats } from "../../data/portfolio";

function useTypewriter(words) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next === word) setTimeout(() => setDel(true), 1500);
        } else {
          const next = word.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDel(false);
            setI((p) => (p + 1) % words.length);
          }
        }
      },
      del ? 32 : 76
    );
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return text;
}

export function Hero() {
  const typed = useTypewriter(profile.roles);
  const lines = ["Marketing that", "moves markets."];

  return (
    <section id="home" data-testid="hero-section" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="orb orb-1 w-[480px] h-[480px] -top-32 -left-32 animate-orb" style={{ background: "var(--orb-1)" }} />
      <div className="orb orb-2 w-[420px] h-[420px] top-1/3 -right-32 animate-orb" style={{ background: "var(--orb-2)", animationDelay: "-6s" }} />
      <div className="orb orb-1 w-[300px] h-[300px] bottom-0 left-1/3 animate-orb" style={{ background: "var(--orb-1)", animationDelay: "-10s", opacity: 0.6 }} />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center relative z-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.35em] text-aqua font-semibold mb-6"
            data-testid="hero-eyebrow"
          >
            PGDM Marketing · Growth · AI Workflows
          </motion.p>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6" data-testid="hero-headline">
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  {i === 1 ? <span className="text-gradient">{line}</span> : line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="h-8 mb-6"
          >
            <p className="font-heading text-base sm:text-lg soft" data-testid="hero-typing">
              {typed}
              <span className="text-aqua animate-caret ml-0.5">|</span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="text-sm sm:text-base soft max-w-xl leading-relaxed mb-10"
          >
            I&apos;m {profile.shortName} — a PGDM Marketing professional turning lead generation,
            client relationships and AI-powered workflows into measurable business growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 mb-14"
          >
            <Magnetic>
              <button
                data-testid="hero-explore-work-btn"
                onClick={() => scrollToId("#projects")}
                className="btn-primary rounded-full px-8 py-4 text-sm flex items-center gap-2"
              >
                Explore My Work <ArrowDown size={16} />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                data-testid="hero-contact-btn"
                onClick={() => scrollToId("#contact")}
                className="btn-ghost glass rounded-full px-8 py-4 text-sm"
              >
                Get in Touch
              </button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
            data-testid="hero-stats"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-3xl sm:text-4xl font-bold text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs soft mt-1 leading-snug">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-64 sm:w-80 lg:w-full max-w-sm"
          data-testid="hero-photo-wrap"
        >
          <div className="animate-float">
            <div className="absolute -inset-3 rounded-[2.6rem] ring-conic animate-spin-slow opacity-80 blur-[6px]" />
            <div className="absolute -inset-3 rounded-[2.6rem] ring-conic animate-spin-slow" style={{ mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "3px" }} />
            <div className="relative glass rounded-[2.4rem] p-3">
              <img
                src="/profile.webp"
                alt="Abhishek Gopal Band — PGDM Marketing Professional"
                className="w-full aspect-[4/5] object-cover rounded-[1.9rem]"
                data-testid="hero-profile-photo"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 glass rounded-2xl px-4 py-3 flex items-center gap-2 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="text-xs font-medium">Open to Opportunities</span>
            </div>
            <div className="absolute -top-5 -right-4 glass rounded-2xl px-4 py-3 flex items-center gap-2 shadow-xl">
              <BadgeCheck size={15} className="text-aqua" />
              <span className="text-xs font-medium">IMDR Pune · PGDM</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 soft text-xs tracking-widest uppercase">
        <MapPin size={12} className="text-aqua" />
        <span>{profile.location}</span>
      </div>
    </section>
  );
}
