import { TOOLS } from "../lib/content";
import type { Tool } from "../lib/content";
import { ArrowUpRightIcon } from "./icons";

function ToolCard({ tool }: { tool: Tool }) {
  const badge = tool.tag ?? (tool.free ? "Free to start" : null);
  return (
    <div className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-navy">{tool.name}</h3>
        {badge && (
          <span className="shrink-0 rounded-full bg-blue/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-blue">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {tool.blurb}
      </p>
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 self-start rounded-xl bg-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
      >
        Open
        <ArrowUpRightIcon className="h-4 w-4" />
      </a>
    </div>
  );
}

export function ToolsGrid() {
  const classTools = TOOLS.filter((t) => !t.bonus);
  const bonusTools = TOOLS.filter((t) => t.bonus);

  return (
    <section id="tools" className="scroll-anchor">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-2xl font-semibold text-gold sm:text-3xl">
          ★
        </span>
        <h2 className="text-2xl font-semibold text-navy sm:text-3xl">
          Tools &amp; Software
        </h2>
      </div>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/85">
        Everything we used in class. Most are free to start — open an account and
        keep building after the workshop.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {bonusTools.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center gap-3">
            <h3 className="shrink-0 text-sm font-semibold uppercase tracking-wider text-muted">
              One more we love
            </h3>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>
          <p className="mt-2 max-w-3xl text-sm text-muted">
            Not part of the class — just a productivity tool worth having.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bonusTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
