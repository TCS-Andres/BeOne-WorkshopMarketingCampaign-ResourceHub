"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { QUESTIONNAIRES } from "../lib/questionnaires";
import { buildFilledPrompt, copyToClipboard } from "../lib/buildPrompt";
import { exportAnswersPdf } from "../lib/pdf";
import { CopyIcon, FilePdfIcon, TrashIcon, CheckIcon } from "./icons";

type Toast = { message: string; tone: "success" | "error" };

const STORAGE_PREFIX = "resourcehub:v1:";
const KICKER = "BE ONE Gen AI Program · The Creative Strategist";

const FILE_NAMES: Record<string, string> = {
  market: "My-Market-Sizing-Answers",
  masterbrain: "My-Master-Brain-Answers",
  avatar: "My-Avatar-Video-Answers",
};

export function Questionnaire({
  which,
}: {
  which: "market" | "masterbrain" | "avatar";
}) {
  const config = QUESTIONNAIRES[which];
  const storageKey = `${STORAGE_PREFIX}${which}`;

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [seed, setSeed] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [copying, setCopying] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load saved draft once on mount (after render, to avoid hydration mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          answers?: Record<string, string>;
          seed?: string;
        };
        if (parsed.answers) setAnswers(parsed.answers);
        if (typeof parsed.seed === "string") setSeed(parsed.seed);
      }
    } catch {
      // ignore corrupt drafts
    }
    setHydrated(true);
  }, [storageKey]);

  // Autosave after hydration.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ answers, seed }));
    } catch {
      // storage full / unavailable — non-fatal
    }
  }, [answers, seed, hydrated, storageKey]);

  // Toast auto-dismiss.
  useEffect(() => {
    if (!toast) return;
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, [toast]);

  const updateField = useCallback((id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleDownloadPdf = useCallback(() => {
    try {
      exportAnswersPdf({
        title: config.title,
        kicker: KICKER,
        seed: config.seed
          ? { label: config.seed.label, value: seed }
          : undefined,
        answers: config.fields.map((f) => ({
          question: f.label,
          answer: answers[f.id] ?? "",
        })),
        fileName: FILE_NAMES[which],
      });
      setToast({ message: "PDF downloaded.", tone: "success" });
    } catch {
      setToast({ message: "Couldn't make the PDF — please try again.", tone: "error" });
    }
  }, [answers, seed, config, which]);

  const handleCopyPrompt = useCallback(async () => {
    setCopying(true);
    try {
      const ordered = config.fields.map((f) => answers[f.id] ?? "");
      const filled = await buildFilledPrompt(
        config.promptFile,
        ordered,
        config.seed ? seed : undefined,
      );
      await copyToClipboard(filled);
      setToast({ message: "Copied — paste this into Claude.", tone: "success" });
    } catch {
      setToast({
        message: "Couldn't copy the prompt — please try again.",
        tone: "error",
      });
    } finally {
      setCopying(false);
    }
  }, [answers, seed, config]);

  const handleClear = useCallback(() => {
    const hasContent =
      seed.trim().length > 0 || Object.values(answers).some((v) => v.trim());
    if (hasContent && !window.confirm("Clear your answers and saved draft?")) {
      return;
    }
    setAnswers({});
    setSeed("");
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    setToast({ message: "Cleared.", tone: "success" });
  }, [answers, seed, storageKey]);

  return (
    <div className="rounded-2xl border border-blue/20 bg-bg-blue/70 p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-navy">{config.title}</h3>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
          <CheckIcon className="h-3.5 w-3.5 text-blue" />
          Saves automatically on this device
        </span>
      </div>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        {config.intro}
      </p>

      <div className="mt-6 space-y-5">
        {/* Seed paragraph (Master Brain) */}
        {config.seed && (
          <div>
            <label
              htmlFor={config.seed.id}
              className="block text-sm font-semibold text-navy"
            >
              {config.seed.label}
            </label>
            {config.seed.helper && (
              <p className="mt-1 text-xs text-muted">{config.seed.helper}</p>
            )}
            <textarea
              id={config.seed.id}
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              rows={3}
              placeholder={config.seed.placeholder}
              className="mt-2 w-full resize-y rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none placeholder:text-muted/60 focus:border-blue focus:ring-2 focus:ring-blue/20"
            />
          </div>
        )}

        {/* Fields */}
        {config.fields.map((field) => {
          const helperId = field.helper ? `${field.id}-help` : undefined;
          return (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-sm font-semibold text-navy"
              >
                {field.label}
              </label>
              {field.helper && (
                <p id={helperId} className="mt-1 text-xs text-muted">
                  {field.helper}
                </p>
              )}
              {field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  value={answers[field.id] ?? ""}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  aria-describedby={helperId}
                  rows={3}
                  className="mt-2 w-full resize-y rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                />
              ) : (
                <input
                  id={field.id}
                  type="text"
                  value={answers[field.id] ?? ""}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  aria-describedby={helperId}
                  className="mt-2 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={handleDownloadPdf}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gold hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        >
          <FilePdfIcon className="h-4 w-4" />
          Download my answers (PDF)
        </button>
        <button
          type="button"
          onClick={handleCopyPrompt}
          disabled={copying}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue bg-white px-5 py-3 text-sm font-semibold text-blue shadow-sm transition-colors hover:border-gold hover:bg-bg-blue disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        >
          <CopyIcon className="h-4 w-4" />
          {copying ? "Copying…" : "Copy prompt for Claude"}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-bg-grey hover:text-navy sm:ml-auto"
        >
          <TrashIcon className="h-4 w-4" />
          Clear
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="animate-toast-in pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
        >
          <span
            className={`pointer-events-auto inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-lg ${
              toast.tone === "success"
                ? "bg-navy text-cream"
                : "bg-red-600 text-white"
            }`}
          >
            {toast.tone === "success" && <CheckIcon className="h-4 w-4 text-gold" />}
            {toast.message}
          </span>
        </div>
      )}
    </div>
  );
}
