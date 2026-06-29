import type { Module } from "../lib/content";
import { TOOLS_BY_ID } from "../lib/content";
import { DownloadButton } from "./DownloadButton";
import { Questionnaire } from "./Questionnaire";
import { CheckIcon } from "./icons";

function ToolsUsed({ module }: { module: Module }) {
  if (module.toolsUsed.length === 0) {
    return (
      <p className="text-sm text-muted">
        <span className="font-semibold text-navy">Tools used:</span>{" "}
        {module.toolsUsedNote ?? "—"}
      </p>
    );
  }
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
      <span className="font-semibold text-navy">Tools used:</span>
      {module.toolsUsed.map((id, i) => {
        const tool = TOOLS_BY_ID[id];
        if (!tool) return null;
        return (
          <span key={id} className="inline-flex items-center">
            <a
              href="#tools"
              className="font-medium text-blue underline-offset-2 hover:text-gold hover:underline"
            >
              {tool.name}
            </a>
            {i < module.toolsUsed.length - 1 && (
              <span className="ml-2 text-line">·</span>
            )}
          </span>
        );
      })}
    </p>
  );
}

export function ModuleSection({ module }: { module: Module }) {
  return (
    <section id={module.id} className="scroll-anchor">
      <div className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-9">
        {/* Number + title */}
        <div className="flex items-baseline gap-4">
          <span className="font-display text-2xl font-semibold text-gold sm:text-3xl">
            {module.number}
          </span>
          <h2 className="text-2xl font-semibold text-navy sm:text-3xl">
            {module.title}
          </h2>
        </div>

        {/* Summary */}
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/85">
          {module.summary}
        </p>

        {/* Setup checklist (Module 0) */}
        {module.checklist && (
          <ul className="mt-6 grid gap-2.5 sm:max-w-md">
            {module.checklist.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border border-line bg-bg-grey px-4 py-2.5 text-sm text-navy"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* Resources */}
        {module.resources.length > 0 && (
          <div className="mt-7">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Resources
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {module.resources.map((resource) => (
                <DownloadButton key={resource.label} resource={resource} />
              ))}
            </div>
          </div>
        )}

        {/* Interactive questionnaire (Modules 1 & 2) */}
        {module.questionnaire && (
          <div className="mt-8">
            <Questionnaire which={module.questionnaire} />
          </div>
        )}

        {/* Tools used */}
        <div className="mt-8 border-t border-line pt-5">
          <ToolsUsed module={module} />
        </div>
      </div>
    </section>
  );
}
