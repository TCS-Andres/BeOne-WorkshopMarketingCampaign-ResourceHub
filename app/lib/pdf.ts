// ------------------------------------------------------------------
// Client-side branded PDF export of questionnaire answers (brief §5.1).
// Navy header band, gold divider, each question + answer, co-brand footer.
// jsPDF, US Letter, points.
// ------------------------------------------------------------------

import { jsPDF } from "jspdf";

const NAVY: [number, number, number] = [22, 36, 61];
const BLUE: [number, number, number] = [44, 86, 151];
const GOLD: [number, number, number] = [200, 162, 75];
const INK: [number, number, number] = [43, 43, 43];
const MUTED: [number, number, number] = [90, 100, 115];
const LINE: [number, number, number] = [215, 222, 232];

export type PdfAnswer = { question: string; answer: string };

export type PdfDoc = {
  title: string;
  /** e.g. "BE ONE Gen AI Program · The Creative Strategist" */
  kicker: string;
  /** Optional Master Brain seed paragraph. */
  seed?: { label: string; value: string };
  answers: PdfAnswer[];
  /** File name without extension. */
  fileName: string;
};

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 56;
const CONTENT_W = PAGE_W - MARGIN * 2;
const FOOTER = "The Creative Strategist · A Branches BE ONE Program";

export function exportAnswersPdf(doc: PdfDoc): void {
  const pdf = new jsPDF({ unit: "pt", format: "letter" });

  // --- Header band ---
  pdf.setFillColor(...NAVY);
  pdf.rect(0, 0, PAGE_W, 104, "F");
  // gold rule under the band
  pdf.setFillColor(...GOLD);
  pdf.rect(0, 104, PAGE_W, 3, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.text(doc.title, MARGIN, 56);

  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(200, 162, 75);
  pdf.setFontSize(10);
  pdf.text(doc.kicker.toUpperCase(), MARGIN, 80, { charSpace: 0.5 });

  let y = 150;
  const bottomLimit = PAGE_H - 70;

  const ensureSpace = (needed: number) => {
    if (y + needed > bottomLimit) {
      addFooter(pdf);
      pdf.addPage();
      y = MARGIN + 14;
    }
  };

  const writeBlock = (question: string, answer: string) => {
    // Question label (navy, bold)
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(...NAVY);
    const qLines = pdf.splitTextToSize(question, CONTENT_W);
    ensureSpace(qLines.length * 15 + 8);
    pdf.text(qLines, MARGIN, y);
    y += qLines.length * 15 + 4;

    // Answer (ink, normal) or muted placeholder
    const value = answer.trim();
    pdf.setFont("helvetica", value ? "normal" : "italic");
    pdf.setFontSize(11);
    if (value) {
      pdf.setTextColor(...INK);
    } else {
      pdf.setTextColor(...MUTED);
    }
    const aLines = pdf.splitTextToSize(value || "(not answered yet)", CONTENT_W);
    ensureSpace(aLines.length * 15 + 18);
    pdf.text(aLines, MARGIN, y);
    y += aLines.length * 15 + 14;

    // light divider
    pdf.setDrawColor(...LINE);
    pdf.setLineWidth(0.5);
    pdf.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 16;
  };

  // Optional seed paragraph, emphasized with a gold left mark
  if (doc.seed) {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(...BLUE);
    ensureSpace(40);
    pdf.text(doc.seed.label, MARGIN, y);
    y += 18;
    const value = doc.seed.value.trim();
    pdf.setFont("helvetica", value ? "normal" : "italic");
    pdf.setTextColor(...(value ? INK : MUTED));
    const sLines = pdf.splitTextToSize(value || "(not answered yet)", CONTENT_W);
    ensureSpace(sLines.length * 15 + 18);
    pdf.text(sLines, MARGIN, y);
    y += sLines.length * 15 + 14;
    pdf.setDrawColor(...GOLD);
    pdf.setLineWidth(1);
    pdf.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 18;
  }

  doc.answers.forEach((a) => writeBlock(a.question, a.answer));

  addFooter(pdf);
  pdf.save(`${doc.fileName}.pdf`);
}

function addFooter(pdf: jsPDF) {
  const page = pdf.getNumberOfPages();
  pdf.setDrawColor(...LINE);
  pdf.setLineWidth(0.5);
  pdf.line(MARGIN, PAGE_H - 50, PAGE_W - MARGIN, PAGE_H - 50);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8.5);
  pdf.setTextColor(...MUTED);
  pdf.text(FOOTER, MARGIN, PAGE_H - 34);
  pdf.text(`${page}`, PAGE_W - MARGIN, PAGE_H - 34, { align: "right" });
}
