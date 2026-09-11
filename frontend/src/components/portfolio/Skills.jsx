import { Reveal, SectionHead } from "./bits";
import { skillGroups } from "../../data/portfolio";

export function Skills() {
  return (
    <section id="skills" data-testid="skills-section" className="max-w-6xl mx-auto px-6 py-28">
      <SectionHead index="04" eyebrow="Skills" title="The stack behind the strategy" />
      <div className="grid md:grid-cols-2 gap-6">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={0.06 * i}>
            <div className="glass rounded-3xl p-7 sm:p-8 h-full" data-testid={`skill-group-${i}`}>
              <h3 className="font-heading text-base sm:text-lg font-semibold mb-5 text-aqua">
                {g.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    data-testid={`skill-pill-${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="pill-glow glass rounded-full px-4 py-2 text-xs sm:text-sm cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
