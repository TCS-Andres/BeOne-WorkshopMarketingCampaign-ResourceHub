// ------------------------------------------------------------------
// "Copy prompt for Claude" — load the generator-prompt template from
// /public/files and inject the user's answers into its numbered INPUT
// slots, positionally (brief §5).
//
// The templates use exactly these slot formats inside the INPUT section:
//   **Seed paragraph:**                 <- Master Brain only
//   1. **Some label:**                  <- one per answer, in order
// Output-format / rules lines never end in ":**" so they are left alone.
// ------------------------------------------------------------------

const SLOT_RE = /^(\s*)(\d+)\.\s+\*\*(.+?):\*\*\s*$/;
const SEED_RE = /^\s*\*\*Seed paragraph:\*\*\s*$/;

export async function buildFilledPrompt(
  promptFile: string,
  orderedAnswers: string[],
  seed?: string,
): Promise<string> {
  const res = await fetch(promptFile, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Could not load prompt template (${res.status})`);
  }
  const template = await res.text();

  let slotIndex = 0;
  const filled = template.split("\n").map((line) => {
    if (seed !== undefined && SEED_RE.test(line)) {
      const value = seed.trim();
      return value ? `${line} ${value}` : line;
    }
    if (SLOT_RE.test(line)) {
      const value = (orderedAnswers[slotIndex] ?? "").trim();
      slotIndex += 1;
      return value ? `${line} ${value}` : line;
    }
    return line;
  });

  return filled.join("\n");
}

export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback for non-secure contexts / older browsers
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(ta);
  }
}
