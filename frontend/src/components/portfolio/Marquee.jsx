import { marqueeItems } from "../../data/portfolio";

export function Marquee() {
  return (
    <div className="border-y border-border py-6 overflow-hidden" aria-hidden="true" data-testid="marquee">
      <div className="flex w-max animate-marquee">
        {[...marqueeItems, ...marqueeItems].map((t, i) => (
          <span
            key={i}
            className="flex items-center font-heading text-lg sm:text-xl uppercase tracking-[0.25em] soft whitespace-nowrap"
          >
            <span className="px-8">{t}</span>
            <span className="text-aqua text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
