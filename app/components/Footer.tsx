import { B1_URL } from "../lib/content";
import { ArrowUpRightIcon } from "./icons";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-navy text-cream">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {/* Logo drop-in spot (replace with your logo later) */}
          <div className="mb-4 flex h-9 w-fit items-center rounded-lg border border-cream/25 px-3 text-xs font-semibold uppercase tracking-widest text-cream/70">
            Logo
          </div>
          <p className="text-base font-semibold text-cream">
            The Creative Strategist
            <span className="px-2 text-gold">·</span>
            A Branches BE ONE Program
          </p>
          <p className="mt-2 max-w-md text-sm text-cream/65">
            Everything from class is also posted to the B1 activity feed.
          </p>
        </div>

        <a
          href={B1_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-base font-semibold text-navy transition-colors hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
        >
          Back to B1
          <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
