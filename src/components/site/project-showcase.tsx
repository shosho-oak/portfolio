"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { type Project } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * A project's screens, one at a time.
 *
 * The thumbnails are the primary control — real buttons, so they tab and
 * activate like anything else. The arrows are a convenience on top of that,
 * and everything collapses to a single static image when there is only one.
 */
export function ProjectShowcase({
  project,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 60vw",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  const [index, setIndex] = useState(0);

  const count = project.images.length;
  const active = project.images[index];
  const go = (next: number) => setIndex((next + count) % count);

  return (
    <div>
      <div
        className={cn(
          "relative overflow-hidden rounded-[20px] border border-line bg-surface shadow-card",
          project.aspect,
        )}
      >
        {/*
          Deliberately no fade on the swap. Any entry animation that starts at
          opacity 0 — Framer's or a CSS keyframe — leaves the screenshot
          invisible if it never runs. The content matters more than the
          flourish, so the image just changes.
        */}
        <div key={active.src} className="absolute inset-0">
          <Image
            src={active.src}
            alt={active.alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover object-top"
          />
        </div>

        {count > 1 ? (
          <>
            <span className="label-mono pointer-events-none absolute top-4 right-4 rounded-full bg-foreground/75 px-2.5 py-1.5 text-background">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </span>

            {/* Low-left, so the controls never cover a screenshot's header */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <Arrow
                label={`Previous screen of ${project.name}`}
                onClick={() => go(index - 1)}
              >
                <ArrowLeft className="size-4" />
              </Arrow>
              <Arrow
                label={`Next screen of ${project.name}`}
                onClick={() => go(index + 1)}
              >
                <ArrowRight className="size-4" />
              </Arrow>
            </div>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <ul className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-5 sm:gap-3">
          {project.images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index}
                aria-label={image.alt}
                className={cn(
                  "relative block aspect-[4/3] w-full overflow-hidden rounded-lg border bg-surface transition-all duration-300 ease-[var(--ease-out-expo)]",
                  i === index
                    ? "border-foreground opacity-100"
                    : "border-line opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 30vw, 15vw"
                  className="object-cover object-top"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Arrow({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-line bg-surface text-foreground shadow-chip transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
    >
      {children}
    </button>
  );
}
