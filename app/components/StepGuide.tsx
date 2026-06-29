import type { StepGroup } from "../lib/content";

export function StepGuide({ groups }: { groups: StepGroup[] }) {
  return (
    <div className="mt-8">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
        Make your video — step by step
      </h3>
      <div className="mt-4 space-y-5">
        {groups.map((group, i) => (
          <div
            key={group.title}
            className="rounded-2xl border border-line bg-bg-grey/70 p-5 sm:p-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-cream">
                {i + 1}
              </span>
              <h4 className="text-base font-semibold text-navy sm:text-lg">
                {group.title}
              </h4>
            </div>
            {group.intro && (
              <p className="mt-2 text-sm text-muted">{group.intro}</p>
            )}
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-sm leading-relaxed text-ink/85 marker:font-semibold marker:text-blue">
              {group.steps.map((step) => (
                <li key={step} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
            {group.tip && (
              <p className="mt-4 rounded-xl border-l-[3px] border-gold bg-gold/10 px-4 py-2.5 text-sm leading-relaxed text-navy">
                <span className="font-semibold">Tip:</span> {group.tip}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
