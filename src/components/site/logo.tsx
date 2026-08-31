import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Monogram + wordmark. The accent dot is the only colour in the navigation —
 * it reads as a status light, which is the one place a bright accent earns
 * its keep on an otherwise neutral bar.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Shahad Qumosani — home"
      className={cn("group flex items-center gap-2.5", className)}
    >
      <span className="relative grid size-9 shrink-0 place-items-center rounded-[11px] bg-foreground transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6">
        <span
          aria-hidden
          className="font-display text-[13px] leading-none font-extrabold tracking-[-0.05em] text-background"
        >
          SQ
        </span>
        <span
          aria-hidden
          className="absolute -top-px -right-px size-2.5 rounded-full bg-ai ring-2 ring-background transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-125"
        />
      </span>

      <span className="hidden text-[15px] leading-none font-semibold tracking-[-0.02em] sm:block">
        Shahad Qumosani
      </span>
    </Link>
  );
}
