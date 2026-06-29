// ------------------------------------------------------------------
// Central content for the Resource Hub (brief §4, §6, §7).
// Edit copy, resources, and tools here.
// ------------------------------------------------------------------

export type Resource = {
  label: string;
  /** Path under /public (e.g. "/files/foo.md"). null = not produced yet. */
  file: string | null;
  /** false => render as a disabled "Coming soon" button (brief §6). */
  available: boolean;
};

// A numbered "how-to" group rendered as a step guide inside a module.
export type StepGroup = {
  title: string;
  intro?: string;
  steps: string[];
  tip?: string;
};

// An external action link (e.g. "Upload your video") rendered as a button.
export type ModuleLink = {
  label: string;
  url: string;
  note?: string;
};

export type Module = {
  /** Anchor id + sub-nav target. */
  id: string;
  navLabel: string;
  number: string;
  title: string;
  summary: string;
  /** Module 0 setup checklist (brief §7). */
  checklist?: string[];
  resources: Resource[];
  /** Which interactive questionnaire renders in this module, if any. */
  questionnaire?: "market" | "masterbrain" | "avatar";
  /** Tool ids referenced by this module (links down to §4.4). */
  toolsUsed: string[];
  /** Shown when there are no tools for a module (Module 4). */
  toolsUsedNote?: string;
  /** Optional step-by-step how-to groups. */
  steps?: StepGroup[];
  /** Optional external action link (e.g. upload your video). */
  uploadLink?: ModuleLink;
};

export type Tool = {
  id: string;
  name: string;
  blurb: string;
  free: boolean;
  url: string;
  /** Custom badge text; falls back to "Free to start" when free. */
  tag?: string;
  /** Bonus pick (not used in class) — shown in its own subsection. */
  bonus?: boolean;
};

export const HERO_BADGES = [
  "Market Map",
  "Customer Persona",
  "Master Brain",
  "AI Avatar Video",
];

// Sub-nav order (brief §4.2). Tools is appended in the nav component.
export const NAV_SECTIONS: { id: string; label: string }[] = [
  { id: "start-here", label: "Start Here" },
  { id: "know-your-market", label: "Know Your Market" },
  { id: "master-brain", label: "Master Brain" },
  { id: "create-content", label: "Create Content" },
  { id: "launch-grow", label: "Launch & Grow" },
  { id: "tools", label: "Tools" },
];

export const MODULES: Module[] = [
  {
    id: "start-here",
    navLabel: "Start Here",
    number: "00",
    title: "Start Here",
    summary:
      "Get set up so you can build from minute one. Create your free tool accounts, log in to B1, and get clear on the four things you'll make today.",
    checklist: [
      "Create a free Claude account",
      "Create a free HeyGen account",
      "Create a free ElevenLabs account",
      "Log in to B1 (BE ONE)",
    ],
    resources: [],
    toolsUsed: ["claude", "heygen", "elevenlabs", "b1"],
  },
  {
    id: "know-your-market",
    navLabel: "Know Your Market",
    number: "01",
    title: "Know Your Market",
    summary:
      "Size your real opportunity with TAM, SAM & SOM, and pinpoint exactly who you serve. Fill in the questionnaire below, download your answers, and copy the prompt into Claude to generate your market report as a clean, downloadable PDF.",
    resources: [
      {
        label: "Download the Market-Sizing questionnaire",
        file: "/files/TAM-SAM-SOM_Questionnaire.md",
        available: true,
      },
      {
        label: "Download the Market-Sizing prompt",
        file: "/files/TAM-SAM-SOM_Generator_Prompt.md",
        available: true,
      },
    ],
    questionnaire: "market",
    toolsUsed: ["claude"],
  },
  {
    id: "master-brain",
    navLabel: "Master Brain",
    number: "02",
    title: "Build Your Master Brain",
    summary:
      "Create one AI-ready document that captures the truth of your business, so every AI tool sounds like you. Answer the focused questionnaire, then run the generator prompt in Claude to produce a polished, downloadable PDF.",
    resources: [
      {
        label: "Download the Master Brain questionnaire",
        file: "/files/MasterBrain_Questionnaire_Focused.md",
        available: true,
      },
      {
        label: "Download the Master Brain prompt",
        file: "/files/MasterBrain_Generator_Prompt_Focused.md",
        available: true,
      },
    ],
    questionnaire: "masterbrain",
    toolsUsed: ["claude"],
  },
  {
    id: "create-content",
    navLabel: "Create Content",
    number: "03",
    title: "Create Content (AI Avatar Video)",
    summary:
      "Turn a photo, your voice, and a short script into a branded video of yourself — made with AI in minutes. Fill in the questionnaire below, copy the prompt into Claude for your script and tool directions, then bring it to life with HeyGen and ElevenLabs.",
    resources: [
      {
        label: "Download the Avatar/Video prompt",
        file: "/files/Avatar-Video_Prompt.md",
        available: true,
      },
    ],
    questionnaire: "avatar",
    steps: [
      {
        title: "Create your AI avatar",
        intro: "Made in HeyGen from a single photo.",
        steps: [
          "Take a photo of yourself — a clear selfie or a full-body shot both work.",
          "In HeyGen, go to Avatars → Manage Avatars.",
          "Click New Avatar, then choose Create a virtual character.",
          "Upload your photo. HeyGen builds your avatar.",
        ],
        tip: "Use a simple, plain background with nothing moving behind you — standing against a blank wall is ideal. Busy or cluttered backgrounds make a weaker avatar.",
      },
      {
        title: "Clone your voice, then finish your video",
        intro: "Made in ElevenLabs, then brought back into HeyGen.",
        steps: [
          "In ElevenLabs, open Voices in the left sidebar.",
          "Click Create New Voice, then choose Instant Voice Clone.",
          "Record about 2 minutes of your voice as a voice note, upload it, and name it with your name.",
          "Generate it once to check the clone sounds like you.",
          "Go to Text to Speech in the left sidebar, paste your script (from the questionnaire above), choose your cloned voice, and generate the speech.",
          "When it sounds right, download the audio.",
          "Back in HeyGen, go to Avatars and select your avatar.",
          "Choose Use in a Video → Add a Script, then upload your audio (or type or record your script there).",
          "Generate your video.",
        ],
      },
    ],
    toolsUsed: ["claude", "heygen", "elevenlabs", "kie"],
  },
  {
    id: "launch-grow",
    navLabel: "Launch & Grow",
    number: "04",
    title: "Launch & Grow",
    summary:
      "Put your assets to work. Use the Campaign Canvas to plan one focused campaign, post your video, and build a simple monthly rhythm.",
    resources: [
      {
        label: "Download the Campaign Canvas",
        file: "/files/BE-ONE_Campaign-Canvas.docx",
        available: true,
      },
      {
        label: "Download the Full Course",
        file: "/files/BE-ONE_AI-Marketing-Course_Full-Curriculum.docx",
        available: true,
      },
    ],
    uploadLink: {
      label: "Upload your video",
      url: "https://drive.google.com/drive/folders/1URNGdkDb0uiMXFZqh0xndApZiDVYTegK?usp=sharing",
      note: "Made your video? Drop it in our shared Drive folder to share it with the class.",
    },
    toolsUsed: [],
    toolsUsedNote: "—",
  },
];

export const FULL_COURSE_FILE = "/files/BE-ONE_AI-Marketing-Course_Full-Curriculum.docx";

export const TOOLS: Tool[] = [
  {
    id: "claude",
    name: "Claude",
    blurb: "Your AI engine — runs the prompts, builds reports, writes scripts.",
    free: true,
    url: "https://claude.ai",
  },
  {
    id: "heygen",
    name: "HeyGen",
    blurb: "Creates your AI avatar video.",
    free: true,
    url: "https://www.heygen.com",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    blurb: "Clones your voice for the video.",
    free: true,
    url: "https://try.elevenlabs.io/qnhn0xltqd6i", // referral link
  },
  {
    id: "kie",
    name: "kie.ai",
    blurb: "Advanced, pay-as-you-go higher-end video.",
    free: false,
    url: "https://kie.ai",
  },
  {
    id: "canva",
    name: "Canva",
    blurb: "Simple design for graphics & social posts.",
    free: true,
    url: "https://www.canva.com",
  },
  {
    id: "b1",
    name: "B1 (BE ONE)",
    blurb: "Course platform & class activity feed.",
    free: true,
    url: "https://community.branchesb1.org/",
  },
  {
    id: "wisprflow",
    name: "Wispr Flow",
    blurb:
      "Talk instead of type — fast, accurate AI dictation that works in any app. Handy for drafting prompts, posts, and emails by voice.",
    free: true,
    tag: "1 month free",
    url: "https://wisprflow.ai/r?ANDRES500",
    bonus: true,
  },
];

export const TOOLS_BY_ID: Record<string, Tool> = Object.fromEntries(
  TOOLS.map((t) => [t.id, t]),
);

// Downloadable worksheets/templates surfaced in the Tools & Software section.
export type ToolResource = {
  name: string;
  blurb: string;
  file: string;
  tag?: string;
};

export const TOOL_RESOURCES: ToolResource[] = [
  {
    name: "Campaign Canvas",
    blurb:
      "A one-page planner to map and launch one focused campaign — your offer, audience, message, channels, and timeline.",
    file: "/files/BE-ONE_Campaign-Canvas.docx",
    tag: "Worksheet",
  },
];

export const B1_URL = "https://community.branchesb1.org/";
