"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import {
  MthmrPreview,
  MwfrPreview,
  ProductPilotWorkPreview,
} from "@/components/site/project-previews";
import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeader } from "@/components/site/section";
import { PROJECTS, type Project } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PREVIEWS = {
  mthmr: MthmrPreview,
  mwfr: MwfrPreview,
  productpilot: ProductPilotWorkPreview,
} as const;

/**
 * Real screenshots when they exist, the schematic when they don't. Adding to
 * `images` in content.ts is the only change needed to swap a card over.
 */
function ProjectVisual({
  project,
  className,
  priority = false,
  // Must match how wide the card actually renders, or Next serves a variant
  // too small for the box and the screenshot looks soft.
  sizes = "(max-width: 1024px) 100vw, 60vw",
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (project.layout === "phones" && project.images.length > 0) {
    return (
      <div className={className}>
        <PhoneRow project={project} />
        {project.icon ? (
          <div className="mt-6 flex items-center gap-4 lg:mt-10">
            <Image
              src={project.icon.src}
              alt={project.icon.alt}
              width={128}
              height={128}
              // The artwork is already a rounded squircle with alpha, so it
              // needs no frame of its own — just a little lift.
              className="size-14 shrink-0 rounded-[15px] shadow-chip sm:size-16"
            />
            <span className="label-mono text-muted-foreground">App icon</span>
          </div>
        ) : null}
      </div>
    );
  }

  const [primary] = project.images;

  if (primary) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-[20px] border border-line bg-surface shadow-card",
          project.aspect,
          className,
        )}
      >
        <Image
          src={primary.src}
          alt={primary.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    );
  }

  const Preview = PREVIEWS[project.slug as keyof typeof PREVIEWS];
  return <Preview className={className} />;
}

/**
 * A row of portrait app screens, shown whole. Cropping these into the
 * landscape thumbnail grid would destroy them — a phone screen is 0.46:1.
 */
function PhoneRow({ project }: { project: Project }) {
  return (
    <ul className="grid grid-cols-3 gap-3 sm:gap-4">
      {project.images.map((image, index) => (
        <li
          key={image.src}
          className={cn(
            "relative overflow-hidden rounded-xl border border-line bg-surface shadow-card sm:rounded-2xl",
            project.aspect,
            // A gentle stagger, so the row reads as a composition
            index === 1 ? "lg:-translate-y-4" : "lg:translate-y-2",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 32vw, (max-width: 1024px) 30vw, 20vw"
            className="object-cover object-top"
          />
        </li>
      ))}
    </ul>
  );
}

const GALLERY_COLUMNS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

/** The remaining screens, as a quiet strip under the main visual. */
function ProjectGallery({ project }: { project: Project }) {
  if (project.layout === "phones") return null;
  const rest = project.images.slice(1);
  if (rest.length === 0) return null;

  const columns = GALLERY_COLUMNS[Math.min(rest.length, 4)];

  return (
    <ul className={cn("mt-3 grid grid-cols-2 gap-3", columns)}>
      {rest.map((image) => (
        <li
          key={image.src}
          className={cn(
            "relative overflow-hidden rounded-xl border border-line bg-surface",
            // A lone thumbnail gets a wider box than a row of them
            rest.length === 1 ? "aspect-[16/9]" : "aspect-[4/3]",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className={cn(
              "object-cover",
              // Screenshots read from the top; standalone artwork centres
              image.src.includes("icon") ? "object-center p-4" : "object-top",
            )}
          />
        </li>
      ))}
    </ul>
  );
}

export function Work() {
  const [mthmr, mwfr, productPilot] = PROJECTS;

  return (
    <Section id="work" className="pt-28 lg:pt-40">
      <SectionHeader
        index="03"
        label="Selected Work"
        title="Selected Work"
        supporting="A selection of products and experiences I've worked on across product management, UX/UI design, and digital product development."
      />

      <div className="mt-20 flex flex-col gap-24 lg:mt-28 lg:gap-32">
        {/*
          Below `sm` the previews take their natural height — a fixed aspect
          box that narrow would crop the schematic rather than scale it.
        */}
        {/* 01 — visual leads from the left */}
        <ProjectRow
          project={mthmr}
          visualClassName="lg:col-span-7 lg:col-start-1"
          metaClassName="lg:col-span-4 lg:col-start-9"
          priority
        />

        {/* 02 — mirrored and smaller, so the rhythm breathes */}
        <ProjectRow
          project={mwfr}
          reverse
          visualClassName="lg:col-span-6 lg:col-start-7"
          metaClassName="lg:col-span-4 lg:col-start-1 lg:self-center"
        />

        {/* 03 — full width. The newest project gets the climax of the section. */}
        <FeaturedProject project={productPilot} />
      </div>
    </Section>
  );
}

function ProjectRow({
  project,
  reverse = false,
  visualClassName,
  metaClassName,
  priority = false,
}: {
  project: Project;
  reverse?: boolean;
  visualClassName: string;
  metaClassName: string;
  priority?: boolean;
}) {
  return (
    <article className="grid items-start gap-y-8 lg:grid-cols-12 lg:gap-x-10">
      <Reveal
        className={cn("order-1", visualClassName, reverse && "lg:order-2")}
      >
        <HoverLift>
          <ProjectVisual project={project} priority={priority} />
        </HoverLift>
        <ProjectGallery project={project} />
      </Reveal>

      <Reveal
        delay={0.08}
        className={cn("order-2", metaClassName, reverse && "lg:order-1")}
      >
        <ProjectMeta project={project} />
      </Reveal>
    </article>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article>
      <Reveal className="grid gap-y-6 border-t border-line pt-6 lg:grid-cols-12 lg:gap-x-10">
        <div className="flex items-start gap-4 lg:col-span-7">
          <span className="label-mono pt-2 text-muted-foreground">
            {project.index}
          </span>
          <div className="min-w-0">
            <h3 className="display text-[clamp(1.6rem,5.5vw,3.5rem)]">
              {project.name}
            </h3>
            <p className="label-mono mt-4 text-muted-foreground">
              {project.type}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-2">
          <p className="max-w-[46ch] text-[15px] leading-[1.65] text-muted-foreground sm:text-base">
            {project.summary}
          </p>
          {project.detail ? (
            <p className="mt-4 max-w-[46ch] text-[14px] leading-[1.65] text-muted-foreground/85">
              {project.detail}
            </p>
          ) : null}
        </div>
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <HoverLift>
          <ProjectVisual
            project={project}
            sizes="(max-width: 1024px) 100vw, 1320px"
          />
        </HoverLift>
        <ProjectGallery project={project} />
      </Reveal>

      <Reveal
        delay={0.12}
        className="mt-8 flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <Tags tags={project.tags} accent={project.accent} />
        <ProjectAction project={project} />
      </Reveal>
    </article>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="label-mono text-muted-foreground">
          {project.index}
        </span>
        <span
          className="size-1.5 rounded-full"
          style={{ backgroundColor: project.accent }}
          aria-hidden
        />
        <span className="label-mono text-muted-foreground">{project.type}</span>
        {project.context ? (
          <>
            <span className="size-1 rounded-full bg-line-strong" aria-hidden />
            <span className="label-mono text-muted-foreground">
              {project.context}
            </span>
          </>
        ) : null}
      </div>

      <h3 className="display mt-5 text-[clamp(1.5rem,5vw,3rem)]">
        {project.name}
      </h3>

      <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.65] text-muted-foreground sm:text-base">
        {project.summary}
      </p>

      {project.detail ? (
        <p className="mt-3 max-w-[42ch] text-[14px] leading-[1.65] text-muted-foreground/85">
          {project.detail}
        </p>
      ) : null}

      <dl className="mt-7 space-y-3 border-t border-line-soft pt-5">
        <MetaRow label="Role" value={project.role} />
        {project.year ? <MetaRow label="Year" value={project.year} /> : null}
      </dl>

      <div className="mt-6">
        <Tags tags={project.tags} accent={project.accent} />
      </div>

      <div className="mt-7">
        <ProjectAction project={project} />
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <dt className="label-mono w-14 shrink-0 pt-0.5 text-muted-foreground">
        {label}
      </dt>
      <dd className="text-[14px] leading-snug font-medium tracking-[-0.01em]">
        {value}
      </dd>
    </div>
  );
}

function Tags({ tags, accent }: { tags: readonly string[]; accent: string }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <li
          key={tag}
          className="label-mono rounded-full border border-line px-2.5 py-1.5 text-muted-foreground"
          style={
            index === 0
              ? {
                  borderColor: `color-mix(in oklab, ${accent} 35%, transparent)`,
                  color: "var(--foreground)",
                }
              : undefined
          }
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

/**
 * Only projects with a genuine destination become links. Those without one
 * show an honest label instead — a card that looks clickable but isn't would
 * be worse.
 */
function ProjectAction({ project }: { project: Project }) {
  if (project.links.length === 0) {
    return (
      <span className="label-mono inline-flex items-center gap-2 text-muted-foreground">
        <span className="size-1 rounded-full bg-line-strong" aria-hidden />
        Case study in progress
      </span>
    );
  }

  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {project.links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="group/link inline-flex items-center gap-2 text-[14px] font-medium tracking-[-0.01em]"
          >
            <span className="relative">
              {link.label}
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover/link:scale-x-100"
              />
            </span>
            <ArrowUpRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The project-card hover interaction: a small, quiet lift. */
function HoverLift({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
