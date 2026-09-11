import { GraduationCap } from "lucide-react";
import { Reveal, SectionHead } from "./bits";
import { education } from "../../data/portfolio";

export function Education() {
  return (
    <section id="education" data-testid="education-section" className="max-w-6xl mx-auto px-6 py-28">
      <SectionHead index="02" eyebrow="Education" title="Foundations of the craft" />
      <div className="grid md:grid-cols-2 gap-6">
        {education.map((e, i) => (
          <Reveal key={e.degree} delay={0.08 * i}>
            <article
              className="glass rounded-3xl p-8 h-full flex flex-col gap-5 hover:border-aqua/40 hover:-translate-y-1 transition-all duration-300"
              data-testid={`education-card-${i}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-royal to-royalbright flex items-center justify-center shadow-lg shadow-royal/30">
                <GraduationCap size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-heading text-lg sm:text-xl font-semibold mb-1">{e.degree}</h3>
                <p className="text-sm soft leading-relaxed">{e.institution}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="text-xs glass rounded-full px-3 py-1.5 soft">{e.period}</span>
                <span className="text-xs glass rounded-full px-3 py-1.5 text-aqua border-aqua/30">{e.status}</span>
                <span className="text-xs glass rounded-full px-3 py-1.5 soft">{e.badge}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
