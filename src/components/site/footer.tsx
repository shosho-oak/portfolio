import { CONTAINER, GUTTER } from "@/components/site/container";
import { PERSON } from "@/lib/content";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Email", href: `mailto:${PERSON.email}` },
  { label: "LinkedIn", href: PERSON.linkedin },
  { label: "GitHub", href: PERSON.github },
  ...(PERSON.cv ? [{ label: "CV", href: PERSON.cv }] : []),
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className={CONTAINER}>
        <div
          className={cn(
            GUTTER,
            "flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between",
          )}
        >
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.02em]">
              {PERSON.name}
            </p>
            <p className="mt-1.5 text-[13px] text-muted-foreground">
              {PERSON.role} · {PERSON.location}
            </p>
          </div>

          <nav aria-label="Footer" className="flex items-center gap-6">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="group relative text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </a>
            ))}
          </nav>

          <p className="label-mono text-muted-foreground">© 2026</p>
        </div>
      </div>
    </footer>
  );
}
