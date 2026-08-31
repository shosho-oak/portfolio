"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { CONTAINER } from "@/components/site/container";
import { Logo } from "@/components/site/logo";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * Reading scroll position through an external store rather than an effect
 * means a reload part-way down the page hydrates straight into the solid bar,
 * instead of flashing the transparent one until the first scroll event.
 */
function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 12,
    () => false,
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    // Widening past `md` hides the panel via CSS — without this the page
    // would stay scroll-locked with no visible way to release it.
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpointChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpointChange);
    };
  }, [open]);

  return (
    <motion.header
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line bg-background"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className={CONTAINER}>
        <nav
          aria-label="Primary"
          className={cn(
            "flex items-center justify-between transition-[height] duration-300 ease-[var(--ease-out-expo)]",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <Logo />

          {/* Desktop */}
          <div className="hidden items-center gap-9 md:flex">
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.3 },
                },
              }}
              className="flex items-center gap-8"
            >
              {NAV_ITEMS.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -8 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: EASE },
                    },
                  }}
                >
                  <NavLink href={item.href}>{item.label}</NavLink>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
            >
              <Link
                href="#contact"
                data-slot="button"
                className={cn(buttonVariants({ size: "pill" }), "group/cta")}
              >
                Let&rsquo;s talk
                <ArrowUpRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile trigger */}
          <Button
            ref={triggerRef}
            variant="ghost"
            size="icon-lg"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-1 rounded-full md:hidden"
          >
            <span aria-hidden className="flex w-4 flex-col items-end gap-[5px]">
              <span
                className={cn(
                  "block h-px w-4 bg-foreground transition-transform duration-300 ease-[var(--ease-out-expo)]",
                  open && "translate-y-[3px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px bg-foreground transition-all duration-300 ease-[var(--ease-out-expo)]",
                  open ? "w-4 -translate-y-[3px] -rotate-45" : "w-2.5",
                )}
              />
            </span>
          </Button>
        </nav>
      </div>

      {/* Mobile panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden border-t border-line bg-background md:hidden"
          >
            <div className={cn(CONTAINER, "py-6")}>
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={
                      reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: EASE,
                      delay: 0.08 + index * 0.06,
                    }}
                    className="border-b border-line-soft last:border-b-0"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-display flex items-baseline gap-3 py-4 text-3xl font-bold tracking-[-0.035em]"
                    >
                      <span className="label-mono text-muted-foreground">
                        0{index + 1}
                      </span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <Link
                href="#contact"
                data-slot="button"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ size: "pill-lg" }),
                  "mt-6 w-full",
                )}
              >
                Let&rsquo;s talk
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-block py-1 text-[14px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:text-foreground"
    >
      {children}
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </Link>
  );
}
