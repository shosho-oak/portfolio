/**
 * Every word and fact on the homepage lives here.
 *
 * Rule for this file: nothing goes in that isn't verifiably true. No invented
 * metrics, dates, clients, users, outcomes, or product capabilities. Sources
 * are Shahad's answers in CONTENT-TODO.md and her CV. Where a detail isn't
 * confirmed it stays `null` and the UI omits it.
 */

export const PERSON = {
  name: "Shahad Qumosani",
  role: "Product Designer",
  location: "Saudi Arabia",
  email: "shahad.qumosani@gmail.com",
  github: "https://github.com/shosho-oak",
  linkedin: "https://www.linkedin.com/in/shahad-qumosani/",
  // Phone is on the CV but deliberately not published here — ask before adding.
  cv: null as string | null, // TODO: set to "/Shahad-Qumosani-CV.pdf" once the final file is confirmed
} as const;

export const HERO = {
  eyebrow: PERSON.name,
  // Matches the CV headline. The second line carries the accent rule.
  headline: ["Product", "Designer"],
  supporting:
    "I turn complex product problems into clear, thoughtful digital experiences — from product strategy and UX to polished interfaces and design systems.",
  capabilities: [
    { label: "Strategy", value: "Product strategy · Roadmap" },
    { label: "Design", value: "UX · UI · Information architecture" },
    { label: "Delivery", value: "Design systems · With engineering" },
  ],
} as const;

export type ProjectLink = { label: string; href: string };

export type Project = {
  index: string;
  slug: string;
  name: string;
  type: string;
  /** Where the work sat, when that isn't obvious from the name. */
  context: string | null;
  role: string;
  year: string | null;
  summary: string;
  detail: string | null;
  tags: readonly string[];
  accent: string;
  /** Only destinations that genuinely exist. */
  links: readonly ProjectLink[];
  /**
   * Real screenshots. The first is the card's main visual; any others render
   * as a strip beneath it. An empty array falls back to the schematic.
   */
  images: readonly { src: string; alt: string }[];
  /**
   * Aspect ratio for the main visual, matched to the artwork so it isn't
   * cropped. Must apply at every breakpoint — `fill` images have no
   * intrinsic height, so an unsized parent collapses to nothing.
   */
  aspect: string;
  /**
   * "screenshot" = one lead image with a thumbnail strip.
   * "phones" = a row of portrait app screens, shown whole.
   */
  layout: "screenshot" | "phones";
  /** Product mark, shown under a phone row. Already rounded, with alpha. */
  icon: { src: string; alt: string } | null;
};

export const PROJECTS: readonly Project[] = [
  {
    index: "01",
    slug: "mthmr",
    name: "Mthmr",
    type: "Fintech",
    context: null,
    role: "Product Designer",
    year: "2021 — Present",
    summary:
      "A fintech product at the intersection of finance and marketing. I work across product design and product thinking, shaping the merchant dashboard and the workflows behind it.",
    detail:
      "That covers financial transactions, cashback, offers, user roles, onboarding and the product logic underneath — defining flows, states, permissions and edge cases with the team, then working with developers and leadership from problem definition through implementation and refinement.",
    tags: ["Product design", "UX/UI", "Merchant dashboard", "Design systems"],
    accent: "var(--product)",
    links: [], // No public product link for the merchant dashboard
    // Screens provided by Shahad. All figures shown are placeholder/demo data.
    images: [
      {
        src: "/work/mthmr/home.png",
        alt: "Mthmr merchant dashboard home, showing offer budgets, competitor ranking and performance charts",
      },
      {
        src: "/work/mthmr/performance-page.png",
        alt: "Mthmr campaign performance view, comparing transactions, sales, AOV and ROAS per offer",
      },
      {
        src: "/work/mthmr/financial-overview.png",
        alt: "Mthmr financial overview, with wallet balance, payment methods, transaction history and invoices",
      },
      {
        src: "/work/mthmr/customer-behavior.png",
        alt: "Mthmr customer behaviour analytics, broken down by age, gender and client type",
      },
      {
        src: "/work/mthmr/design-system/navigational-elements.png",
        alt: "Mthmr design system: buttons, tabs, navigation and control states",
      },
    ],
    aspect: "aspect-[5/4]",
    layout: "screenshot",
    icon: null,
  },
  {
    index: "02",
    slug: "mwfr",
    name: "Mwfr",
    type: "Consumer mobile app",
    context: "Built at Mthmr",
    role: "Product direction, product design and UX/UI",
    year: "2025 — 2026",
    summary:
      "A consumer app for discovering discount codes, coupons and offers in Saudi Arabia — search and filter deals by category, discount and expiry, plus personalised and trending offers. Published on the App Store, in Arabic and English.",
    detail:
      "I worked on the product direction and user experience, taking it from product thinking and UX/UI through to a published mobile product: how offers are discovered, how the product communicates value, and how someone finds a relevant saving quickly. The shipped app includes smart search, filtering, personalised recommendations, trending deals, best-value picks and recent usage.",
    tags: ["Product design", "UX/UI", "Mobile app", "Consumer product"],
    accent: "var(--highlight)",
    links: [
      {
        label: "View on the App Store",
        href: "https://apps.apple.com/sa/app/mwfr-موفر/id6751457127",
      },
    ],
    // Portrait app screens, shown whole rather than cropped into a strip.
    images: [
      {
        src: "/work/mwfr/explore.png",
        alt: "Mwfr explore view, grouping offers by most used, newest, best value and recently used",
      },
      {
        src: "/work/mwfr/coupon-detail.png",
        alt: "Mwfr coupon detail sheet, showing the discount terms and a copyable promo code",
      },
      {
        src: "/work/mwfr/offers.png",
        alt: "Mwfr offers list in Arabic, with search, sorting and saved deals from partner brands",
      },
    ],
    aspect: "aspect-[402/874]",
    layout: "phones",
    icon: {
      src: "/work/mwfr/app-icon-2.png",
      alt: "Mwfr app icon",
    },
  },
  {
    index: "03",
    slug: "productpilot",
    name: "ProductPilot",
    type: "Concept · Self-initiated",
    context: null,
    role: "Interface design & front-end concept",
    year: "2026",
    summary:
      "A front-end dashboard concept, exploring how a modern product management workflow could be organised into one focused workspace.",
    detail:
      "Self-initiated. I designed the interface and created the front-end concept across eight areas — dashboard, AI workspace, projects, backlog, roadmap, documents, team and settings. It was never built as a working product or launched: there is no backend, no AI model, no real data and no users.",
    tags: ["Concept project", "Product design", "Frontend", "Design system"],
    accent: "var(--design)",
    links: [
      {
        label: "View the concept",
        href: "https://productpilot-seven.vercel.app",
      },
      { label: "GitHub", href: "https://github.com/shosho-oak/productpilot" },
    ],
    images: [
      {
        src: "/work/productpilot/dashboard.png",
        alt: "ProductPilot dashboard concept: project stats, AI insight cards, active projects and upcoming releases",
      },
      {
        src: "/work/productpilot/ai-workspace.png",
        alt: "ProductPilot AI workspace concept, with a conversation panel and generated product artifacts",
      },
      {
        src: "/work/productpilot/roadmap.png",
        alt: "ProductPilot roadmap concept",
      },
      {
        src: "/work/productpilot/backlog.png",
        alt: "ProductPilot backlog concept",
      },
      {
        src: "/work/productpilot/documents.png",
        alt: "ProductPilot documents concept",
      },
    ],
    aspect: "aspect-[1350/942]",
    layout: "screenshot",
    icon: null,
  },
];

/** The eight areas designed in ProductPilot — taken from the project itself. */
export const PRODUCTPILOT_MODULES = [
  "Dashboard",
  "AI Workspace",
  "Projects",
  "Backlog",
  "Roadmap",
  "Documents",
  "Team",
  "Settings",
] as const;

export const ABOUT = {
  lead: "I learned product design by building one — inside a fintech company, without a ready-made product team to inherit.",
  paragraphs: [
    "I studied Computer Science at King Abdulaziz University and completed an AI track certificate there. That background means I'm comfortable with systems, logic and data, and with how software actually gets built — but I'm not a software engineer, and I don't present myself as one.",
    "The rest came from the work itself at Mthmr. There was no highly structured product function to lean on, so I learned to figure things out: understand a complex system, define the flows, states, permissions and edge cases inside it, and turn that into something a person can actually use.",
    "That's still the work I care about — dense dashboards, financial logic, workflows with a lot of conditions — and making them feel obvious. I use AI in how I work, and I studied it at university, but it's a tool in my process rather than something I claim to build.",
  ],
  disciplines: [
    "Product strategy",
    "UX design",
    "UI design",
    "Information architecture",
    "Design systems",
    "Product delivery",
  ],
  tools: ["Figma", "ClickUp", "Notion", "Framer"],
} as const;

export type Role = {
  org: string;
  role: string;
  type: string;
  period: string | null;
  points: readonly string[];
  accent: string;
};

export const EXPERIENCE: readonly Role[] = [
  {
    org: "Mthmr",
    role: "Product Designer",
    type: "Fintech",
    period: "Jun 2021 — Present",
    points: [
      "Product design and UX/UI for Mthmr's merchant dashboard and related workflows",
      "Product planning, roadmap work, information architecture and feature definition",
      "Defining product flows, states, permissions, financial logic and edge cases in collaboration with the team",
      "Working closely with developers, product managers and leadership — from problem definition and acceptance criteria through implementation, testing and refinement",
      "Maintaining interface consistency and improving the overall usability of the product",
    ],
    accent: "var(--product)",
  },
  {
    org: "Ministry of Communications and Information Technology",
    role: "Intern",
    type: "Saudi Arabia",
    period: "Jun 2020 — Sep 2020",
    // Deliberately empty: no responsibilities were provided, and none are invented.
    points: [],
    accent: "var(--highlight)",
  },
];

export type Education = {
  org: string;
  qualification: string;
  detail: string | null;
  period: string;
};

export const EDUCATION: readonly Education[] = [
  {
    org: "King Abdulaziz University",
    qualification: "Bachelor of Computer Science",
    detail: null,
    period: "Graduated Jun 2021",
  },
  {
    org: "King Abdulaziz University",
    qualification: "AI Track Certificate",
    detail: "Academic focus on integrating AI within software systems",
    period: "2020 — 2021",
  },
];

export const CONTACT = {
  headline: ["Let's build", "something thoughtful."],
  availability: "Available for product, UX/UI and design opportunities.",
  cta: "Get in touch",
} as const;
