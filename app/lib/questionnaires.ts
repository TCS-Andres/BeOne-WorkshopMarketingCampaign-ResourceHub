// ------------------------------------------------------------------
// Interactive questionnaire configs (brief §5).
//
// IMPORTANT: `fields` are listed in the SAME order as the numbered input
// slots in the matching generator-prompt .md. The "Copy prompt for Claude"
// feature injects answers into those slots positionally, so this order must
// stay 1:1 with the template. Helper text mirrors the .md examples.
// ------------------------------------------------------------------

export type QField = {
  id: string;
  label: string;
  helper?: string;
  type: "input" | "textarea";
};

export type QConfig = {
  id: "market" | "masterbrain";
  title: string;
  /** Short line under the title. */
  intro: string;
  /** Generator-prompt template fetched for "Copy prompt for Claude". */
  promptFile: string;
  /** Optional seed paragraph (Master Brain only). */
  seed?: {
    id: string;
    label: string;
    helper?: string;
    placeholder: string;
  };
  fields: QField[];
};

export const MARKET_QUESTIONNAIRE: QConfig = {
  id: "market",
  title: "Market-Sizing Questionnaire",
  intro:
    "Answer in plain language with rough, honest numbers — estimates are fine. Then export your answers or copy the prompt into Claude to build your TAM · SAM · SOM report.",
  promptFile: "/files/TAM-SAM-SOM_Generator_Prompt.md",
  fields: [
    {
      id: "m1",
      label: "1. What do you sell?",
      helper:
        'Your main product or service in a line or two. e.g. "Custom-decorated cakes for weddings and parties."',
      type: "textarea",
    },
    {
      id: "m2",
      label: "2. Who buys it — individuals (B2C), businesses (B2B), or both?",
      helper:
        'Describe your typical buyer. e.g. "B2C — brides and parents, mostly women 28–45."',
      type: "textarea",
    },
    {
      id: "m3",
      label: "3. What's your geographic reach?",
      helper:
        "Neighborhood, city, region, nationwide, or online/global. e.g. \"Miami-Dade plus ~30-mile delivery.\"",
      type: "input",
    },
    {
      id: "m4",
      label: "4. Average sale value, and how often a customer buys?",
      helper:
        'Rough dollars per sale + frequency. e.g. "~$350 per order; most buy 1–2× a year."',
      type: "input",
    },
    {
      id: "m5",
      label: "5. Is there a niche or segment you focus on (or want to)?",
      helper:
        'A tighter focus = smaller market but higher win rate. e.g. "Leaning into luxury weddings."',
      type: "textarea",
    },
    {
      id: "m6",
      label: "6. How much can you handle right now?",
      helper:
        'Your current monthly capacity. e.g. "About 12–15 orders a month before I\'m maxed out."',
      type: "input",
    },
    {
      id: "m7",
      label: "7. Where are you today — customers and revenue?",
      helper:
        'Rough current numbers, monthly or annual. e.g. "~8 orders/month, around $34k/year."',
      type: "textarea",
    },
    {
      id: "m8",
      label: "8. Competitors or alternatives — and roughly how many nearby?",
      helper:
        'Include the "do-it-themselves / do-nothing" option. e.g. "3 local bakers + grocery cakes + DIY."',
      type: "textarea",
    },
    {
      id: "m9",
      label: "9. What's your growth goal for the next 12 months?",
      helper:
        'One concrete target. e.g. "Grow from 8 to 20 orders a month" or "Reach $90k in revenue."',
      type: "input",
    },
    {
      id: "m10",
      label: "10. Do you already know any market numbers? (optional)",
      helper:
        "Population, # of target businesses, industry size, average spend. Leave blank to let AI estimate.",
      type: "textarea",
    },
  ],
};

export const MASTERBRAIN_QUESTIONNAIRE: QConfig = {
  id: "masterbrain",
  title: "Master Brain Questionnaire",
  intro:
    "Answer in your own natural voice — rough, honest answers are exactly what we need; the AI fills in the polish. Then export your answers or copy the prompt into Claude.",
  promptFile: "/files/MasterBrain_Generator_Prompt_Focused.md",
  seed: {
    id: "seed",
    label: "Seed paragraph",
    helper:
      "Fill this in first — it gives the AI a baseline before the deeper questions.",
    placeholder:
      "My name is ___. My business is ___, based in ___. We help ___ with ___. What makes us different is ___.",
  },
  fields: [
    {
      id: "b1",
      label: "1. Your name, role, business name — and where you're based?",
      helper: 'e.g. "Maria Lopez, Founder — Sweet Layers Bakery, Miami, FL."',
      type: "input",
    },
    {
      id: "b2",
      label: "2. In 2–3 sentences, what does your business do?",
      helper: "Explain it as if to someone who knows nothing about your industry.",
      type: "textarea",
    },
    {
      id: "b3",
      label: "3. What's your story — how did you get into this, and the deeper “why”?",
      helper: "Career pivots, defining moments, what drives you beyond money.",
      type: "textarea",
    },
    {
      id: "b4",
      label: "4. Describe your personality and brand in 5–7 words.",
      helper: 'e.g. "Warm, detail-obsessed, joyful, dependable, family-first."',
      type: "input",
    },
    {
      id: "b5",
      label: "5. What's your mission, and your top 3 values?",
      helper: "Why your business exists, plus the three values that guide it.",
      type: "textarea",
    },
    {
      id: "b6",
      label: "6. List your main products or services — one line each.",
      type: "textarea",
    },
    {
      id: "b7",
      label: "7. Which offering brings in the most revenue, and which do you love most?",
      type: "textarea",
    },
    {
      id: "b8",
      label: "8. Do you sell B2C, B2B, or both — and how do you sell & deliver?",
      helper: "Briefly, the journey from first contact to finished sale.",
      type: "textarea",
    },
    {
      id: "b9",
      label: "9. Describe your #1 ideal customer in a few sentences.",
      helper: "Who are they? What do they want most?",
      type: "textarea",
    },
    {
      id: "b10",
      label: "10. What problem do you solve — and how do clients feel after?",
      type: "textarea",
    },
    {
      id: "b11",
      label: "11. Where do your ideal customers spend their time?",
      helper: "Platforms, communities, events, associations.",
      type: "textarea",
    },
    {
      id: "b12",
      label: "12. What are your rough price ranges, and how do you set them?",
      type: "textarea",
    },
    {
      id: "b13",
      label: "13. What's your #1 measurable goal for the next 12 months?",
      helper: 'e.g. "Reach $120,000 in revenue" or "Grow to 30 orders a month."',
      type: "input",
    },
    {
      id: "b14",
      label: "14. Your communication style in 3–5 words + any signature phrases?",
      helper:
        'e.g. Style — warm, direct, encouraging. Phrase — "Marketing is an investment, not an expense."',
      type: "textarea",
    },
    {
      id: "b15",
      label: "15. What should AI NEVER say or do on your behalf?",
      helper: "Words, tones, or claims that feel wrong for your brand.",
      type: "textarea",
    },
    {
      id: "b16",
      label: "16. Your top 2–3 competitors, and what makes you different?",
      type: "textarea",
    },
    {
      id: "b17",
      label: '17. Complete: "We are the only ___ that ___."',
      helper: 'If "only" feels too strong, rephrase it however feels true.',
      type: "input",
    },
    {
      id: "b18",
      label: "18. Which marketing channels do you use now, and which work best?",
      type: "textarea",
    },
    {
      id: "b19",
      label: "19. What tools, software, or AI do you currently use?",
      type: "textarea",
    },
    {
      id: "b20",
      label:
        "20. One signature story, analogy, or saying — plus anything essential we missed.",
      type: "textarea",
    },
  ],
};

export const QUESTIONNAIRES: Record<"market" | "masterbrain", QConfig> = {
  market: MARKET_QUESTIONNAIRE,
  masterbrain: MASTERBRAIN_QUESTIONNAIRE,
};
