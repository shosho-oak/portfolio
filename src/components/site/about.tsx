import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeader } from "@/components/site/section";
import { ABOUT } from "@/lib/content";

export function About() {
  return (
    <Section id="about" className="pt-28 lg:pt-40">
      <SectionHeader index="04" label="About" title="About" />

      <div className="mt-16 grid gap-y-14 lg:mt-20 lg:grid-cols-12 lg:gap-x-10">
        <Reveal className="lg:col-span-7">
          <p className="display text-[clamp(1.375rem,3.6vw,2.5rem)] leading-[1.15]">
            {ABOUT.lead}
          </p>

          <div className="mt-10 max-w-[54ch] space-y-5">
            {ABOUT.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-[15px] leading-[1.7] text-muted-foreground sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
          <p className="label-mono border-t border-line pt-5 text-muted-foreground">
            What I work on
          </p>

          <ul className="mt-6 space-y-0">
            {ABOUT.disciplines.map((discipline, index) => (
              <li
                key={discipline}
                className="flex items-baseline gap-4 border-b border-line-soft py-3.5 last:border-b-0"
              >
                <span className="label-mono text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] font-medium tracking-[-0.01em]">
                  {discipline}
                </span>
              </li>
            ))}
          </ul>

          <p className="label-mono mt-10 border-t border-line pt-5 text-muted-foreground">
            Tools
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {ABOUT.tools.map((tool) => (
              <li
                key={tool}
                className="label-mono rounded-full border border-line px-2.5 py-1.5 text-muted-foreground"
              >
                {tool}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
