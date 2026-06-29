import { HERO_BADGES, WEBINAR } from "../lib/content";
import { CalendarIcon, ArrowUpRightIcon } from "./icons";
import { CoBrandLogos } from "./CoBrandLogos";

export function Hero() {
  return (
    <header className="relative overflow-hidden bg-navy text-cream">
      {/* Warm gradient + soft gold glow (clean gradient hero, brief §3) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 85% 0%, rgba(200,162,75,0.28) 0%, rgba(200,162,75,0) 45%), linear-gradient(160deg, #1b2c49 0%, #16243d 55%, #101b30 100%)",
        }}
      />
      {/* subtle gold hairline at the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gold/40" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-12 sm:pt-16">
        {/* Co-brand logo lockup */}
        <CoBrandLogos className="mb-12" />

        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
          BE ONE Gen AI Program
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
          Build Your AI Marketing Campaign
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-cream/85 sm:text-xl">
          Your resource hub — everything from the workshop in one place.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/70">
          Every module summary, the downloadable resources, three interactive
          questionnaires you can export to PDF, and links to every tool we used
          in class. No login — bookmark it and come back anytime.
        </p>

        {/* Four badges */}
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {HERO_BADGES.map((badge) => (
            <li
              key={badge}
              className="rounded-full border border-gold/40 bg-cream/5 px-4 py-1.5 text-sm font-medium text-cream/90"
            >
              {badge}
            </li>
          ))}
        </ul>

        {/* Primary buttons */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={WEBINAR.rsvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-base font-semibold text-navy shadow-lg transition-colors hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
          >
            <CalendarIcon className="h-5 w-5" />
            {WEBINAR.ctaLabel}
          </a>
          <a
            href="#tools"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-cream/30 px-6 py-3.5 text-base font-semibold text-cream transition-colors hover:border-cream/70 hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
          >
            Jump to Tools
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
