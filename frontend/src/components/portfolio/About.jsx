import { MapPin, Languages } from "lucide-react";
import { Reveal, SectionHead } from "./bits";
import { profile, chapters } from "../../data/portfolio";

export function About() {
  return (
    <section id="about" data-testid="about-section" className="max-w-6xl mx-auto px-6 py-28">
      <SectionHead index="01" eyebrow="About Me" title="The person behind the pipeline" />
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
        <Reveal className="glass rounded-3xl p-8 sm:p-10 flex flex-col justify-between" delay={0.05}>
          <div>
            <p className="text-sm sm:text-base leading-relaxed soft mb-8" data-testid="about-bio">
              {profile.about}
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-3 soft">
              <MapPin size={15} className="text-aqua shrink-0" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-3 soft">
              <Languages size={15} className="text-aqua shrink-0" />
              <span>{profile.languages.join(" · ")}</span>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-5">
          {chapters.map((c, i) => (
            <Reveal key={c.no} delay={0.08 * (i + 1)}>
              <article className="glass rounded-3xl p-7 sm:p-8 flex gap-6 group hover:border-aqua/40 transition-colors duration-300" data-testid={`about-chapter-${c.no}`}>
                <span className="font-heading text-3xl font-bold text-gradient shrink-0">{c.no}</span>
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-semibold mb-2 group-hover:text-aqua transition-colors duration-300">
                    {c.title}
                  </h3>
                  <p className="text-sm soft leading-relaxed">{c.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
