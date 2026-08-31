"use client";

import { motion, useReducedMotion } from "framer-motion";

import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The single scroll-reveal primitive for the page below the hero.
 *
 * Everything uses the same curve and travel, so scrolling feels like one
 * consistent behaviour rather than a different animation per section.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 22,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  as?: "div" | "li" | "section" | "article";
}) {
  const reduce = useReducedMotion() ?? false;
  const Component = motion[as];

  return (
    <Component
      className={cn(className)}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: DURATION.base,
        ease: EASE,
        delay: reduce ? 0 : delay,
      }}
    >
      {children}
    </Component>
  );
}
