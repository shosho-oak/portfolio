import { PRODUCTPILOT_MODULES } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Project visuals.
 *
 * The two client projects are drawn as deliberate schematics — structure,
 * hierarchy and layout, with no invented figures, labels or screens. They
 * represent the shape of the work, not a screenshot of it. ProductPilot is
 * the one project I can show concretely, because it is Shahad's own.
 *
 * All of these are decorative; the readable content lives in each card.
 */

function Frame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "@container relative overflow-hidden rounded-[20px] border border-line bg-surface shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Skeleton bar — the schematic's only building block. */
function Bar({
  w,
  h = 6,
  tone = "mid",
  className,
}: {
  w: string;
  h?: number;
  tone?: "soft" | "mid" | "strong";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "block rounded-full",
        tone === "soft" && "bg-foreground/6",
        tone === "mid" && "bg-foreground/12",
        tone === "strong" && "bg-foreground/25",
        className,
      )}
      style={{ width: w, height: h }}
    />
  );
}

function Chrome({ accent }: { accent: string }) {
  return (
    <div className="flex h-10 items-center gap-2.5 border-b border-line px-4">
      <span
        className="size-4 shrink-0 rounded-[5px]"
        style={{ backgroundColor: accent }}
      />
      <Bar w="52px" h={7} tone="strong" />
      <span className="ml-auto flex items-center gap-1.5">
        <Bar w="26px" h={7} tone="soft" />
        <span className="size-4 rounded-full bg-foreground/8" />
      </span>
    </div>
  );
}

/* --------------------------------------------------------------- Mthmr --- */

export function MthmrPreview({ className }: { className?: string }) {
  return (
    <Frame className={cn("flex flex-col", className)}>
      <Chrome accent="var(--product)" />

      <div className="flex min-h-0 flex-1">
        {/* Rail */}
        <div className="hidden w-[56px] shrink-0 flex-col gap-2.5 border-r border-line px-3 py-4 @min-[380px]:flex">
          <Bar w="100%" h={8} tone="strong" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Bar key={i} w={i === 4 ? "60%" : "100%"} h={8} tone="soft" />
          ))}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 @min-[420px]:p-5">
          {/* Summary tiles */}
          <div className="grid grid-cols-3 gap-2.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 rounded-lg border border-line p-2.5"
              >
                <Bar w="70%" h={5} tone="soft" />
                <Bar w="45%" h={10} tone="strong" />
              </div>
            ))}
          </div>

          {/* Trend — the one place colour appears */}
          <div className="relative min-h-[64px] flex-1 overflow-hidden rounded-lg border border-line">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 200 70"
              preserveAspectRatio="none"
            >
              {[17.5, 35, 52.5].map((y) => (
                <line
                  key={y}
                  x1="0"
                  x2="200"
                  y1={y}
                  y2={y}
                  stroke="var(--line-soft)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <path
                d="M0 54 L28 46 L56 50 L84 32 L112 38 L140 20 L168 26 L200 12 L200 70 L0 70 Z"
                fill="var(--product)"
                opacity="0.1"
              />
              <path
                d="M0 54 L28 46 L56 50 L84 32 L112 38 L140 20 L168 26 L200 12"
                fill="none"
                stroke="var(--product)"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Table */}
          <div className="space-y-2.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="size-5 shrink-0 rounded-md bg-foreground/8" />
                <Bar w="30%" h={6} tone="mid" />
                <Bar
                  w="18%"
                  h={6}
                  tone="soft"
                  className="hidden @min-[380px]:block"
                />
                <span
                  className="ml-auto h-4 w-11 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      i === 0
                        ? "color-mix(in oklab, var(--product) 18%, transparent)"
                        : "color-mix(in oklab, var(--foreground) 7%, transparent)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ---------------------------------------------------------------- Mwfr --- */

export function MwfrPreview({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative", className)}>
      <Frame className="flex h-full flex-col">
        <Chrome accent="var(--highlight)" />
        <div className="flex min-h-0 flex-1 flex-col gap-3.5 p-4 @min-[420px]:p-5">
          <div className="flex items-center gap-3">
            <Bar w="38%" h={11} tone="strong" />
            <span
              className="h-5 w-14 rounded-full"
              style={{
                backgroundColor:
                  "color-mix(in oklab, var(--highlight) 16%, transparent)",
              }}
            />
          </div>
          <Bar w="72%" h={6} tone="soft" />

          <div className="mt-1 grid flex-1 grid-cols-2 gap-2.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex min-h-[52px] flex-col justify-between rounded-lg border border-line p-2.5"
              >
                <span
                  className="size-4 rounded-[5px]"
                  style={{
                    backgroundColor:
                      i === 0
                        ? "var(--highlight)"
                        : "color-mix(in oklab, var(--foreground) 10%, transparent)",
                  }}
                />
                <Bar w={i % 2 === 0 ? "80%" : "60%"} h={6} tone="soft" />
              </div>
            ))}
          </div>
        </div>
      </Frame>

      {/* A second surface, offset — depth without inventing another screen */}
      <div className="pointer-events-none absolute -right-4 -bottom-6 w-[38%] max-w-[168px] sm:-right-6">
        <div className="rounded-2xl border border-line bg-surface p-3 shadow-chip">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-highlight" />
            <Bar w="54%" h={5} tone="mid" />
          </div>
          <div className="mt-2.5 space-y-1.5">
            <Bar w="100%" h={5} tone="soft" />
            <Bar w="76%" h={5} tone="soft" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------- ProductPilot --- */

export function ProductPilotWorkPreview({ className }: { className?: string }) {
  return (
    <Frame className={cn("flex flex-col", className)}>
      <Chrome accent="var(--design)" />

      <div className="grid min-h-0 flex-1 @min-[560px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* The eight areas actually designed in the project */}
        <div className="border-line p-4 @min-[420px]:p-5 @min-[560px]:border-r">
          <p className="label-mono text-muted-foreground">Product areas</p>
          <ul className="mt-3.5 grid grid-cols-2 gap-x-3 gap-y-2 @min-[560px]:grid-cols-1 @min-[560px]:gap-y-1.5">
            {PRODUCTPILOT_MODULES.map((module, index) => (
              <li
                key={module}
                className={cn(
                  "flex items-center gap-2 rounded-md px-1.5 py-1 text-[11px] tracking-[-0.01em]",
                  index === 1
                    ? "bg-foreground text-background"
                    : "text-muted-foreground",
                )}
              >
                <span
                  className="size-1 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      index === 1 ? "var(--ai)" : "var(--line-strong)",
                  }}
                />
                <span className="truncate">{module}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* AI Workspace surface */}
        <div className="flex min-w-0 flex-col gap-3 p-4 @min-[420px]:p-5">
          <div className="flex items-center justify-between">
            <p className="label-mono text-muted-foreground">AI Workspace</p>
            <span className="label-mono rounded-md border border-line px-1.5 py-1 text-muted-foreground">
              Concept
            </span>
          </div>

          <div className="rounded-xl border border-line p-2.5">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-ai" />
              <Bar w="62%" h={6} tone="mid" />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2 rounded-xl bg-foreground p-3">
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-ai" />
              <span className="label-mono text-background/55">Draft</span>
            </div>
            <div className="mt-0.5 space-y-1.5">
              <span className="block h-1.5 w-[92%] rounded-full bg-background/22" />
              <span className="block h-1.5 w-full rounded-full bg-background/22" />
              <span className="block h-1.5 w-[70%] rounded-full bg-background/22" />
              <span className="block h-1.5 w-[84%] rounded-full bg-background/12" />
              <span className="block h-1.5 w-[46%] rounded-full bg-background/12" />
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}
