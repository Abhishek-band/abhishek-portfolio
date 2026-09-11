import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead, TiltCard } from "./bits";
import { projects } from "../../data/portfolio";

export function Projects() {
  return (
    <section id="projects" data-testid="projects-section" className="max-w-6xl mx-auto px-6 py-28">
      <SectionHead index="05" eyebrow="Featured Projects" title="Work that moved the needle" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={0.08 * i} className="h-full">
            <TiltCard className="h-full">
              <article
                className="glass rounded-3xl overflow-hidden h-full flex flex-col group hover:border-aqua/50 transition-colors duration-300"
                data-testid={`project-card-${i}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.subtitle}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B101D] via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <p className="text-xs uppercase tracking-[0.25em] text-aqua font-semibold mb-2">
                    {p.subtitle}
                  </p>
                  <h3 className="font-heading text-lg sm:text-xl font-semibold mb-3 flex items-center justify-between">
                    {p.title}
                    <ArrowUpRight
                      size={18}
                      className="text-aqua opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                    />
                  </h3>
                  <p className="text-sm soft leading-relaxed mb-5 flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[11px] glass rounded-full px-3 py-1 soft">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
