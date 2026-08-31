import { cn } from "@/lib/utils";

/**
 * The single source of truth for horizontal rhythm.
 *
 * Every layer of the page — nav, hero content and the decorative rules —
 * uses this exact box, which is what keeps the hairlines aligned to the
 * content instead of merely near it.
 */
export const CONTAINER = "mx-auto w-full max-w-[1480px] px-5 sm:px-8";

/** Inner gutter between the ruled edges and the content itself. */
export const GUTTER = "px-4 sm:px-8 lg:px-12";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn(CONTAINER, className)}>{children}</div>;
}
