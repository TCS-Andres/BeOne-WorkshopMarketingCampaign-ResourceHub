import { WEBINAR } from "../lib/content";
import { CalendarIcon, ArrowUpRightIcon } from "./icons";

export function WebinarCTA() {
  return (
    <section id="webinar" className="scroll-anchor">
      <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-10 text-cream sm:px-12 sm:py-14">
        {/* Warm gradient + gold glow (bookends the hero) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 130% at 88% 0%, rgba(200,162,75,0.30) 0%, rgba(200,162,75,0) 48%), linear-gradient(160deg, #1b2c49 0%, #16243d 55%, #101b30 100%)",
          }}
        />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            {WEBINAR.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
            {WEBINAR.title}
          </h2>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-cream/5 px-4 py-1.5 text-sm font-medium text-cream/90">
            <CalendarIcon className="h-4 w-4 text-gold" />
            {WEBINAR.dateLine}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/75">
            {WEBINAR.description}
          </p>
          <a
            href={WEBINAR.rsvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-base font-semibold text-navy shadow-lg transition-colors hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
          >
            <CalendarIcon className="h-5 w-5" />
            {WEBINAR.ctaLabel}
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
