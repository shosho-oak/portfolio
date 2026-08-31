import { CONTAINER } from "@/components/site/container";
import { cn } from "@/lib/utils";

/**
 * The editorial substrate: a dot field on the product side, a soft lift
 * behind the card, and hairline rules locked to the exact same container
 * box as the content — which is what makes the grid feel measured rather
 * than decorative.
 */
export function Backdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-y-0 right-0 hidden w-[52%] xl:block"
          style={{
            backgroundImage:
              "radial-gradient(color-mix(in oklab, var(--foreground) 18%, transparent) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(62% 58% at 62% 44%, #000 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(62% 58% at 62% 44%, #000 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-[6%] right-[-12%] hidden size-[760px] rounded-full xl:block"
          style={{
            background:
              "radial-gradient(circle at center, var(--surface) 0%, transparent 68%)",
          }}
        />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className={cn(CONTAINER, "h-full")}>
          <div className="relative h-full">
            <span className="absolute inset-y-0 left-0 w-px bg-line" />
            <span className="absolute inset-y-0 right-0 w-px bg-line" />

            <Crosshair className="top-0 left-0" />
            <Crosshair className="top-0 right-0" />
            <Crosshair className="bottom-0 left-0" />
            <Crosshair className="bottom-0 right-0" />
          </div>
        </div>
      </div>
    </>
  );
}

export function Crosshair({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 text-line-strong",
        className,
      )}
    >
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
        <path
          d="M5.5 0v11M0 5.5h11"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}
