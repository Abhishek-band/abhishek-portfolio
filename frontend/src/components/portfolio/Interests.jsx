import { Sparkles, Rocket, Plane, BookOpen, Sunrise, Network, Quote } from "lucide-react";
import { Reveal, SectionHead } from "./bits";
import { profile, interests } from "../../data/portfolio";

const icons = { Sparkles, Rocket, Plane, BookOpen, Sunrise, Network };

export function Interests() {
  return (
    <section id="interests" data-testid="interests-section" className="max-w-6xl mx-auto px-6 py-28">
      <SectionHead index="06" eyebrow="Interests & Objective" title="What fuels the work" />
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        <div className="grid sm:grid-cols-2 gap-4">
          {interests.map((it, i) => {
            const Icon = icons[it.icon];
            return (
              <Reveal key={it.label} delay={0.05 * i}>
                <div
                  className="glass rounded-2xl p-5 flex items-center gap-4 h-full hover:border-aqua/40 hover:-translate-y-1 transition-all duration-300"
                  data-testid={`interest-card-${i}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal to-royalbright flex items-center justify-center shrink-0 shadow-lg shadow-royal/30">
                    <Icon size={17} className="text-white" />
                  </div>
                  <p className="text-xs sm:text-sm leading-snug">{it.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="h-full">
          <figure
            className="glass rounded-3xl p-8 sm:p-10 h-full flex flex-col justify-center relative overflow-hidden"
            data-testid="career-objective-card"
          >
            <div className="orb w-64 h-64 -top-20 -right-20" style={{ background: "var(--orb-2)" }} />
            <Quote size={36} className="text-aqua mb-6 relative z-10" />
            <blockquote className="font-heading text-base sm:text-lg lg:text-xl leading-relaxed relative z-10 mb-6">
              {profile.objective}
            </blockquote>
            <figcaption className="text-xs uppercase tracking-[0.3em] text-aqua font-semibold relative z-10">
              Career Objective
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
