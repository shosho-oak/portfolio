import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { buttonVariants } from "@/components/ui/button";
import { CONTACT, PERSON } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Only channels that genuinely exist. */
const CHANNELS = [
  { label: "Email", value: PERSON.email, href: `mailto:${PERSON.email}` },
  {
    label: "LinkedIn",
    value: "shahad-qumosani",
    href: PERSON.linkedin,
  },
  { label: "GitHub", value: "shosho-oak", href: PERSON.github },
  ...(PERSON.cv
    ? [{ label: "CV", value: "Download PDF", href: PERSON.cv }]
    : []),
];

export function Contact() {
  return (
    <Section id="contact" className="pt-28 pb-24 lg:pt-40 lg:pb-32">
      <div className="border-t border-line pt-6">
        <Reveal className="flex items-center gap-3">
          <span className="label-mono text-muted-foreground">06</span>
          <span className="size-1 rounded-full bg-line-strong" aria-hidden />
          <span className="label-mono text-muted-foreground">Contact</span>
        </Reveal>

        <Reveal delay={0.05} className="mt-12 lg:mt-16">
          {/*
            One step below the hero h1 — a bookend, not a bigger shout. The
            two halves only become hard lines at `sm`; below that they reflow,
            which is what keeps the long second line off the edge on a 320px
            screen.
          */}
          <h2 className="display text-[clamp(1.85rem,7.4vw,5.5rem)]">
            <span className="sm:block">{CONTACT.headline[0]}</span>{" "}
            <span className="sm:block">{CONTACT.headline[1]}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-y-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-10">
          <Reveal delay={0.1} className="min-w-0 lg:col-span-6">
            <p className="flex items-start gap-2.5 text-[16px] leading-relaxed text-muted-foreground sm:text-[17px]">
              <span
                className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-ai"
                aria-hidden
              />
              <span>
                {CONTACT.availability}
                <span className="mt-1 block text-[15px] text-muted-foreground/85">
                  Based in {PERSON.location}.
                </span>
              </span>
            </p>

            <a
              href={`mailto:${PERSON.email}`}
              data-slot="button"
              className={cn(
                buttonVariants({ size: "pill-lg" }),
                "group/cta mt-8 w-full sm:w-auto",
              )}
            >
              {CONTACT.cta}
              <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/cta:translate-x-1" />
            </a>
          </Reveal>

          <Reveal delay={0.16} className="min-w-0 lg:col-span-5 lg:col-start-8">
            {/* A list of links, so a list — not a description list */}
            <ul>
              {CHANNELS.map((channel) => (
                <li
                  key={channel.label}
                  className="border-b border-line-soft first:border-t"
                >
                  <a
                    href={channel.href}
                    {...(channel.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className="group/row flex items-center gap-4 py-4"
                  >
                    {/*
                      Stacked on mobile: side by side, the email leaves too
                      little room to be readable on a 320px screen. `break-all`
                      below `sm` also stops the row demanding a minimum width
                      the viewport can't give it.
                    */}
                    <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                      <span className="label-mono shrink-0 text-muted-foreground sm:w-20">
                        {channel.label}
                      </span>
                      <span className="min-w-0 text-[15px] font-medium break-all tracking-[-0.01em] sm:truncate sm:break-normal">
                        {channel.value}
                      </span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all duration-300 ease-[var(--ease-out-expo)] group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 group-hover/row:text-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
