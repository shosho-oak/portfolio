import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeader } from "@/components/site/section";
import { EDUCATION, EXPERIENCE } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <Section id="experience" className="pt-28 lg:pt-40">
      <SectionHeader index="05" label="Experience" title="Experience" />

      <ol className="mt-16 lg:mt-20">
        {EXPERIENCE.map((role, index) => (
          <Reveal
            as="li"
            key={role.org}
            delay={index * 0.06}
            className="border-t border-line py-10 last:border-b lg:py-12"
          >
            <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-10">
              <div className="flex items-start gap-4 lg:col-span-5">
                <span
                  className="mt-2.5 size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: role.accent }}
                  aria-hidden
                />
                <div className="min-w-0">
                  {/*
                    Long organisation names get a smaller step on the scale —
                    at full display size a name this long would out-shout the
                    role it belongs to.
                  */}
                  <h3
                    className={cn(
                      "display",
                      role.org.length > 24
                        ? "text-[clamp(1.25rem,2.6vw,1.875rem)]"
                        : "text-[clamp(1.5rem,4vw,2.75rem)]",
                    )}
                  >
                    {role.org}
                  </h3>
                  <p className="label-mono mt-3 text-muted-foreground">
                    {role.type}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <p className="text-[16px] font-medium tracking-[-0.015em] sm:text-[17px]">
                    {role.role}
                  </p>
                  {/* Rendered only when a real period is known */}
                  {role.period ? (
                    <p className="label-mono text-muted-foreground">
                      {role.period}
                    </p>
                  ) : null}
                </div>

                {/* An entry with no confirmed responsibilities simply has none */}
                {role.points.length > 0 ? (
                  <ul className="mt-5 space-y-2.5">
                    {role.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-[15px] leading-[1.6] text-muted-foreground"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.6em] size-1 shrink-0 rounded-full bg-line-strong"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-16 lg:mt-20">
        <p className="label-mono border-t border-line pt-6 text-muted-foreground">
          Education
        </p>

        <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {EDUCATION.map((item) => (
            <li key={item.qualification}>
              <p className="text-[17px] font-medium tracking-[-0.02em] sm:text-[18px]">
                {item.qualification}
              </p>
              <p className="mt-2 text-[15px] text-muted-foreground">
                {item.org}
              </p>
              {item.detail ? (
                <p className="mt-2 max-w-[38ch] text-[14px] leading-[1.6] text-muted-foreground/85">
                  {item.detail}
                </p>
              ) : null}
              <p className="label-mono mt-3 text-muted-foreground">
                {item.period}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
