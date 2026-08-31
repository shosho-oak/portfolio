"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FileText,
  LayoutDashboard,
  ListChecks,
  Map,
  Sparkles,
} from "lucide-react";

import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const RAIL = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Sparkles, label: "AI Workspace", active: false },
  { icon: ListChecks, label: "Backlog", active: false },
  { icon: Map, label: "Roadmap", active: false },
  { icon: FileText, label: "Documents", active: false },
];

const KPIS = [
  { label: "Velocity", value: "42" },
  { label: "Shipped", value: "18" },
  { label: "At risk", value: "03" },
];

const INITIATIVES = [
  { label: "AI Copilot", progress: 78, color: "var(--design)" },
  { label: "Insights", progress: 54, color: "var(--product)" },
  { label: "Billing", progress: 32, color: "var(--highlight)" },
];

/**
 * An abstracted view of ProductPilot — enough real structure to read as a
 * product, stripped of the detail that would compete with the headline.
 * Decorative by design: the accessible description lives in the figcaption.
 */
export function ProductPilotPreview({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn(
        // A container, so the densest bits can relax their type when the card
        // is narrow instead of overflowing.
        "@container overflow-hidden rounded-[20px] border border-line bg-surface shadow-card",
        className,
      )}
    >
      {/* Title bar */}
      <div className="flex h-11 items-center gap-2 border-b border-line px-3.5">
        <span className="grid size-5 shrink-0 place-items-center rounded-[6px] bg-design">
          <Sparkles className="size-3 text-white" strokeWidth={2.25} />
        </span>
        <span className="text-[12px] font-semibold tracking-[-0.01em]">
          ProductPilot
        </span>
        {/* The breadcrumb is the first thing to go when the card gets tight */}
        <span className="hidden items-center gap-2 @min-[320px]:flex">
          <span className="text-[12px] text-muted-foreground">/</span>
          <span className="text-[12px] text-muted-foreground">Dashboard</span>
        </span>

        <span className="ml-auto flex items-center gap-2">
          <span className="label-mono rounded-md border border-line px-1.5 py-1 text-muted-foreground">
            ⌘K
          </span>
          <span className="size-5 rounded-full bg-sand ring-1 ring-line ring-inset" />
        </span>
      </div>

      <div className="flex">
        {/* Icon rail */}
        <div className="flex w-[52px] shrink-0 flex-col items-center gap-1 border-r border-line py-3">
          {RAIL.map(({ icon: Icon, label, active }) => (
            <span
              key={label}
              className={cn(
                "grid size-8 place-items-center rounded-lg",
                active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground/70",
              )}
            >
              <Icon className="size-[15px]" strokeWidth={1.75} />
            </span>
          ))}
        </div>

        {/* Main */}
        <div className="min-w-0 flex-1 space-y-3 p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold tracking-[-0.01em]">
              Product health
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-sand px-2 py-1">
              <span className="size-1.5 rounded-full bg-ai" />
              <span className="label-mono text-muted-foreground">On track</span>
            </span>
          </div>

          {/* Two tiles on a very narrow card, three once there is room */}
          <div className="grid grid-cols-2 gap-2 @min-[320px]:grid-cols-3">
            {KPIS.map((kpi, index) => (
              <div
                key={kpi.label}
                className={cn(
                  "rounded-lg border border-line px-2 py-2 @min-[400px]:px-2.5",
                  index === 2 && "hidden @min-[320px]:block",
                )}
              >
                <p className="label-mono text-muted-foreground @max-[400px]:text-[9px] @max-[400px]:tracking-[0.09em]">
                  {kpi.label}
                </p>
                <p className="font-display mt-1.5 text-[17px] leading-none font-semibold tracking-[-0.04em]">
                  {kpi.value}
                </p>
              </div>
            ))}
          </div>

          {/* The one inverted surface on the page — it anchors the composition */}
          <div className="rounded-xl bg-foreground p-3">
            <div className="flex items-center gap-1.5">
              <motion.span
                className="size-1.5 rounded-full bg-ai"
                animate={reduceMotion ? undefined : { opacity: [1, 0.35, 1] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="label-mono text-background/55">AI insight</span>
            </div>
            <p className="mt-2 text-[12px] leading-[1.55] text-background/90">
              Move <span className="text-ai">checkout redesign</span> to Q3 —
              highest impact, lowest effort.
            </p>
          </div>

          {/* Initiatives */}
          <div className="space-y-2.5 rounded-xl border border-line p-3">
            <div className="flex items-center justify-between">
              <span className="label-mono text-muted-foreground">
                Roadmap · Q3
              </span>
              <span className="label-mono text-muted-foreground">68%</span>
            </div>

            {INITIATIVES.map((initiative, index) => (
              <div key={initiative.label} className="flex items-center gap-2.5">
                <span className="w-[58px] shrink-0 truncate text-[10px] text-muted-foreground">
                  {initiative.label}
                </span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand">
                  <motion.span
                    className="block h-full rounded-full"
                    style={{ backgroundColor: initiative.color }}
                    initial={{
                      width: reduceMotion ? `${initiative.progress}%` : 0,
                    }}
                    animate={{ width: `${initiative.progress}%` }}
                    transition={{
                      duration: 1.1,
                      ease: EASE,
                      delay: reduceMotion ? 0 : 1.25 + index * 0.12,
                    }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line px-3.5 py-2.5">
        <span className="label-mono text-muted-foreground">Next release</span>
        <span className="text-[11px] font-medium">v2.4 · Aug 21</span>
      </div>
    </div>
  );
}
