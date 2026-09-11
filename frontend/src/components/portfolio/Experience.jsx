import { Briefcase } from "lucide-react";
import { Reveal, SectionHead } from "./bits";
import { experience } from "../../data/portfolio";

export function Experience() {
  return (
    <section id="experience" data-testid="experience-section" className="max-w-6xl mx-auto px-6 py-28">
      <SectionHead index="03" eyebrow="Experience" title="Where growth happened" />
      <div className="relative pl-8 sm:pl-12">
        <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-aqua via-royal to-transparent" />
        <div className="flex flex-col gap-10">
          {experience.map((x, i) => (
            <Reveal key={x.role} delay={0.08 * i}>
              <article className="relative" data-testid={`experience-item-${i}`}>
                <span className="absolute -left-8 sm:-left-12 top-2 w-4 h-4 rounded-full bg-background border-2 border-aqua shadow-[0_0_16px_rgba(0,229,255,0.6)]" />
                <div className="glass rounded-3xl p-7 sm:p-8 hover:border-aqua/40 transition-colors duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-semibold flex items-center gap-2">
                        <Briefcase size={17} className="text-aqua" />
                        {x.role}
                      </h3>
                      <p className="text-sm soft mt-1">
                        {x.company} · {x.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {x.current && (
                        <span className="text-xs rounded-full px-3 py-1.5 bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                          Current
                        </span>
                      )}
                      <span className="text-xs glass rounded-full px-3 py-1.5 soft">{x.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {x.points.map((p, j) => (
                      <li key={j} className="text-sm soft leading-relaxed flex gap-3">
                        <span className="text-aqua mt-1 shrink-0">▸</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
