import type { Resource } from "../lib/content";
import { DownloadIcon } from "./icons";

const baseClasses =
  "inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors";

export function DownloadButton({ resource }: { resource: Resource }) {
  if (!resource.available || !resource.file) {
    return (
      <span
        aria-disabled="true"
        className={`${baseClasses} cursor-not-allowed border border-dashed border-line bg-bg-grey text-muted`}
      >
        <DownloadIcon className="h-4 w-4 shrink-0" />
        <span>{resource.label}</span>
        <span className="ml-1 rounded-full bg-line/60 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
          Coming soon
        </span>
      </span>
    );
  }

  return (
    <a
      href={resource.file}
      download
      className={`${baseClasses} border border-line bg-white text-navy shadow-sm hover:border-gold hover:bg-bg-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue`}
    >
      <DownloadIcon className="h-4 w-4 shrink-0 text-blue" />
      <span>{resource.label}</span>
    </a>
  );
}
