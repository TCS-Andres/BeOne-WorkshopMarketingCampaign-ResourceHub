import type { Module } from "../lib/content";
import { TOOLS_BY_ID } from "../lib/content";
import { DownloadButton } from "./DownloadButton";
import { Questionnaire } from "./Questionnaire";
import { StepGuide } from "./StepGuide";
import { CheckIcon, UploadIcon, ArrowUpRightIcon } from "./icons";

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

        {/* Interactive questionnaire (Modules 1, 2 & 3) */}
        {module.questionnaire && (
          <div className="mt-8">
            <Questionnaire which={module.questionnaire} />
          </div>
        )}

        {/* Step-by-step how-to (Module 3) */}
        {module.steps && <StepGuide groups={module.steps} />}

        {/* Upload / external action (Module 4) */}
        {module.uploadLink && (
          <div className="mt-8 rounded-2xl border border-gold/40 bg-gold/[0.07] p-5 sm:p-6">
            <h3 className="text-base font-semibold text-navy">
              Share your video
            </h3>
            {module.uploadLink.note && (
              <p className="mt-1 text-sm text-muted">{module.uploadLink.note}</p>
            )}
            <a
              href={module.uploadLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gold hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              <UploadIcon className="h-4 w-4" />
              {module.uploadLink.label}
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>
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
