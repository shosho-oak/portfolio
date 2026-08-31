import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion language.
 *
 * One easing curve and one duration scale, so the hero reads as a single
 * choreographed sequence rather than a pile of independent animations.
 * Every helper collapses to a plain fade when the user prefers reduced
 * motion — no travel, no scale, no float.
 */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.45,
  base: 0.7,
  slow: 0.95,
} as const;

export type Intro = {
  initial: Record<string, string | number>;
  animate: Record<string, string | number>;
  transition: Transition;
};

/** Fade and rise. The workhorse for text and small blocks. */
export function rise(delay = 0, reduce = false, distance = 18): Intro {
  return {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: DURATION.base,
      ease: EASE,
      delay: reduce ? 0 : delay,
    },
  };
}

/**
 * Uncover: the child slides out from behind an `overflow-hidden` mask, so the
 * type appears to be revealed rather than moved. Used for the headline lines.
 */
export function maskUp(delay = 0, reduce = false): Intro {
  return {
    initial: reduce ? { opacity: 0 } : { y: "112%" },
    animate: reduce ? { opacity: 1 } : { y: "0%" },
    transition: {
      duration: DURATION.slow,
      ease: EASE,
      delay: reduce ? 0 : delay,
    },
  };
}

/** Surfaces settle in: a longer, softer arrival than text. */
export function surface(delay = 0, reduce = false): Intro {
  return {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 1.05, ease: EASE, delay: reduce ? 0 : delay },
  };
}

/** Small overlays pop rather than rise, so they read as a separate layer. */
export function pop(delay = 0, reduce = false): Intro {
  return {
    initial: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.88, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: {
      duration: DURATION.base,
      ease: EASE,
      delay: reduce ? 0 : delay,
    },
  };
}

/** Scroll-triggered reveal, for use with `whileInView`. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

export const revealStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
