import { Reveal } from "@/components/site/reveal";
import { CONTAINER, GUTTER } from "@/components/site/container";
import { cn } from "@/lib/utils";

/**
 * Shared section shell: same container, same gutters, same top rule and index
 * label. Consistency here is what makes the page read as one document.
 */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative", className)}>
      <div className={CONTAINER}>
        <div className={GUTTER}>{children}</div>
      </div>
    </section>
  );
}

export function SectionHeader({
  index,
  label,
  title,
  supporting,
  className,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  supporting?: string;
  className?: string;
}) {
  return (
    <header className={cn("border-t border-line pt-6", className)}>
      <Reveal className="flex items-center gap-3">
        <span className="label-mono text-muted-foreground">{index}</span>
        <span className="size-1 rounded-full bg-line-strong" aria-hidden />
        <span className="label-mono text-muted-foreground">{label}</span>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-x-10">
        <Reveal delay={0.05} className="lg:col-span-7">
          <h2 className="display text-[clamp(1.75rem,7vw,3.75rem)]">{title}</h2>
        </Reveal>

        {supporting ? (
          <Reveal
            delay={0.12}
            className="lg:col-span-5 lg:flex lg:items-end lg:justify-end"
          >
            <p className="max-w-[42ch] text-[15px] leading-[1.65] text-muted-foreground sm:text-base lg:text-right">
              {supporting}
            </p>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
