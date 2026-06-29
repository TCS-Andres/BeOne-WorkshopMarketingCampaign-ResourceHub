import Image from "next/image";

// Co-brand lockup for dark (navy) backgrounds. The three workshop brands are
// designed for opposing backgrounds: Branches is white art (shown natively on
// navy), while BE ONE and GenAI are colored/dark art (shown on white tiles).
const LOGOS = {
  branches: {
    src: "/logos/branches.png",
    alt: "Branches Family Empowerment Centers",
    w: 1721,
    h: 588,
  },
  beone: { src: "/logos/beone.png", alt: "BE ONE", w: 1650, h: 520 },
  genai: { src: "/logos/genai.png", alt: "GenAI", w: 1389, h: 512 },
};

export function CoBrandLogos({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">
          {label}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        {/* Branches — white art, subtle outlined tile so it reads on navy */}
        <div className="flex h-14 items-center rounded-xl border border-cream/20 bg-cream/[0.06] px-4">
          <Image
            src={LOGOS.branches.src}
            alt={LOGOS.branches.alt}
            width={LOGOS.branches.w}
            height={LOGOS.branches.h}
            className="h-9 w-auto"
          />
        </div>
        {/* BE ONE — colored art on a white tile */}
        <div className="flex h-14 items-center rounded-xl bg-white px-4 shadow-sm">
          <Image
            src={LOGOS.beone.src}
            alt={LOGOS.beone.alt}
            width={LOGOS.beone.w}
            height={LOGOS.beone.h}
            className="h-7 w-auto"
          />
        </div>
        {/* GenAI — dark art on a white tile */}
        <div className="flex h-14 items-center rounded-xl bg-white px-4 shadow-sm">
          <Image
            src={LOGOS.genai.src}
            alt={LOGOS.genai.alt}
            width={LOGOS.genai.w}
            height={LOGOS.genai.h}
            className="h-7 w-auto"
          />
        </div>
      </div>
    </div>
  );
}
