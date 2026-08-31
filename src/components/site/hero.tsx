"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CornerDownLeft,
  Sparkles,
} from "lucide-react";

import { Backdrop } from "@/components/site/backdrop";
import { CONTAINER, GUTTER } from "@/components/site/container";
import { ProductPilotPreview } from "@/components/site/product-pilot-preview";
import { buttonVariants } from "@/components/ui/button";
import { HERO } from "@/lib/content";
import {
  EASE,
  maskUp,
  pop,
  rise,
  revealStagger,
  revealVariants,
  surface,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Depth on scroll: the product layer leaves faster than the type.
  const typeY = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, -110]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate w-full overflow-x-clip"
    >
      <Backdrop />

      <div className={cn(CONTAINER, "relative z-10")}>
        <div className={cn(GUTTER, "pt-28 pb-16 lg:pt-32 lg:pb-20")}>
          {/*
            The grid fills the first screen; the capability strip below it is
            left deliberately at the fold, so there is something real to
            reveal on the first scroll.
          */}
          <div className="grid min-h-[calc(100svh-15rem)] items-center gap-y-20 xl:grid-cols-12 xl:gap-x-10 xl:gap-y-0">
            {/* ------------------------------------------------ Type */}
            <motion.div
              style={{ y: reduce ? undefined : typeY }}
              className="xl:col-span-7 xl:pr-8"
            >
              <motion.div
                {...rise(0.25, reduce)}
                className="flex items-center gap-2.5"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-ai" />
                <span className="label-mono text-muted-foreground">
                  {HERO.eyebrow}
                </span>
              </motion.div>

              {/*
                Two scales, because the measure changes at `xl`: stacked and
                full-bleed below, a 7-of-12 column above. Both are tuned so the
                longest line fills the measure without ever wrapping.
              */}
              <h1 className="display mt-7 text-[clamp(3rem,17.5vw,8.5rem)] sm:mt-8 xl:text-[clamp(8.2rem,12.69vw_-_1.93rem,9.8rem)]">
                <span className="display-line">
                  <motion.span {...maskUp(0.36, reduce)} className="block">
                    {/* Trailing space keeps the block lines from being
                        concatenated into one word by assistive tech. */}
                    {HERO.headline[0]}{" "}
                  </motion.span>
                </span>
                <span className="display-line">
                  <motion.span {...maskUp(0.46, reduce)} className="block">
                    <span className="relative isolate inline-block">
                      {/*
                        Sits behind the word, 0.035em-0.14em below the
                        baseline: clear of the line above, while the `g`
                        descender cuts through it on purpose.
                      */}
                      <motion.span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-[0.025em] h-[0.105em] origin-left rounded-full bg-ai"
                        initial={{ scaleX: reduce ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: 0.85,
                          ease: EASE,
                          delay: reduce ? 0 : 1,
                        }}
                      />
                      <span className="relative">{HERO.headline[1]}</span>
                    </span>
                  </motion.span>
                </span>
              </h1>

              <motion.p
                {...rise(0.68, reduce)}
                className="mt-8 max-w-[48ch] text-[16px] leading-[1.6] text-muted-foreground sm:text-[17px]"
              >
                {HERO.supporting}
              </motion.p>

              <motion.div
                {...rise(0.8, reduce)}
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              >
                {/*
                  Styled as buttons, but they navigate — so they stay anchors.
                  Wrapping them in the Button component would relabel them
                  `role="button"` for screen readers.
                */}
                <Link
                  href="#work"
                  data-slot="button"
                  className={cn(
                    buttonVariants({ size: "pill-lg" }),
                    "group/cta w-full sm:w-auto",
                  )}
                >
                  View my work
                  <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/cta:translate-x-1" />
                </Link>

                <Link
                  href="#contact"
                  data-slot="button"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "pill-lg" }),
                    "group/alt w-full sm:w-auto",
                  )}
                >
                  Let&rsquo;s talk
                  <ArrowUpRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/alt:translate-x-0.5 group-hover/alt:-translate-y-0.5" />
                </Link>
              </motion.div>
            </motion.div>

            {/* --------------------------------------------- Product */}
            <div className="relative xl:col-span-5">
              {/*
                The gutter rule. Half of the 40px column gap to the left of
                this column puts it dead centre between the two — exact at
                every width, unlike a percentage.
              */}
              <span
                aria-hidden
                className="absolute inset-y-[-6rem] -left-5 hidden w-px bg-line-soft xl:block"
              />

              <motion.div style={{ y: reduce ? undefined : cardY }}>
                <figure className="relative mx-auto w-full max-w-[480px] xl:mx-0 xl:max-w-none">
                  <motion.figcaption
                    {...rise(0.55, reduce)}
                    className="mb-6 flex items-center gap-3"
                  >
                    <span className="label-mono shrink-0 text-muted-foreground">
                      Concept project
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-line" />
                  </motion.figcaption>

                  <div className="relative">
                    <motion.div {...surface(0.62, reduce)}>
                      <ProductPilotPreview />
                    </motion.div>

                    {/* Floating layer — a separate plane above the interface */}
                    <motion.div
                      style={{ y: reduce ? undefined : overlayY }}
                      className="pointer-events-none absolute inset-0"
                    >
                      <motion.div
                        {...pop(1.05, reduce)}
                        className="absolute -top-4 -right-3 sm:-right-6 xl:-right-8"
                      >
                        <Float reduce={reduce} distance={-6} duration={5.5}>
                          <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 shadow-chip">
                            <span className="size-1.5 rounded-full bg-ai" />
                            <span className="text-[12px] font-medium tracking-[-0.01em]">
                              AI Workspace
                            </span>
                          </div>
                        </Float>
                      </motion.div>

                      <motion.div
                        {...pop(1.18, reduce)}
                        className="absolute top-[56%] -left-3 w-[220px] sm:-left-6 sm:w-[236px] xl:-left-10"
                      >
                        <Float reduce={reduce} distance={7} duration={6.5}>
                          <div className="rounded-2xl border border-line bg-surface p-3 shadow-chip">
                            <div className="flex items-center gap-1.5">
                              <Sparkles
                                className="size-3.5 text-design"
                                strokeWidth={2}
                              />
                              <span className="label-mono text-muted-foreground">
                                Prompt
                              </span>
                            </div>
                            <p className="mt-2 text-[12px] leading-snug tracking-[-0.01em]">
                              Draft a PRD for onboarding
                              <motion.span
                                aria-hidden
                                className="ml-0.5 inline-block h-[1em] w-px translate-y-[0.15em] bg-foreground"
                                animate={
                                  reduce ? undefined : { opacity: [1, 1, 0, 0] }
                                }
                                transition={{
                                  duration: 1.1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              />
                            </p>
                            <div className="mt-2.5 flex items-center justify-end">
                              <span className="label-mono flex items-center gap-1 rounded-md border border-line px-1.5 py-1 text-muted-foreground">
                                <CornerDownLeft className="size-2.5" />
                                Run
                              </span>
                            </div>
                          </div>
                        </Float>
                      </motion.div>
                    </motion.div>
                  </div>

                  <motion.figcaption
                    {...rise(1, reduce)}
                    className="mt-14 flex items-start justify-between gap-6 border-t border-line pt-4"
                  >
                    <span className="min-w-0">
                      <span className="block text-[15px] font-semibold tracking-[-0.02em]">
                        ProductPilot
                      </span>
                      <span className="mt-1 block text-[13px] leading-snug text-muted-foreground">
                        A self-initiated front-end dashboard concept for a
                        product management workspace — interface design only,
                        never built or launched.
                      </span>
                    </span>

                    <Link
                      href="#work"
                      className="group/link label-mono flex shrink-0 items-center gap-1.5 pt-0.5 text-foreground"
                    >
                      View
                      <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </motion.figcaption>
                </figure>
              </motion.div>
            </div>
          </div>

          {/* ---------------------------------------- Capabilities */}
          <motion.dl
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={revealStagger}
            className="mt-16 grid border-t border-line pt-8 sm:grid-cols-3 lg:mt-20"
          >
            {HERO.capabilities.map((item, index) => (
              <motion.div
                key={item.label}
                variants={
                  reduce
                    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
                    : revealVariants
                }
                className={cn(
                  "flex flex-col gap-2 border-line-soft py-4 first:pt-0 last:pb-0 not-first:border-t sm:border-t-0 sm:py-0",
                  index > 0 && "sm:border-l sm:border-line sm:pl-8",
                )}
              >
                <dt className="label-mono text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="text-[15px] font-medium tracking-[-0.01em]">
                  {item.value}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}

/** Continuous, barely-there drift. Disabled entirely under reduced motion. */
function Float({
  children,
  reduce,
  distance,
  duration,
}: {
  children: React.ReactNode;
  reduce: boolean;
  distance: number;
  duration: number;
}) {
  if (reduce) return <div>{children}</div>;

  return (
    <motion.div
      animate={{ y: [0, distance, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
