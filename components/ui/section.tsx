"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Entrance presets, matching the motion language of the two heroes. Tag any
 * descendant with data-reveal="<preset>" and it plays, in DOM order, once the
 * section scrolls into view. Nothing is hidden server-side, so content is
 * always there without JS; reduced-motion visitors get no animation at all.
 */
const PRESETS = {
  up: {
    from: { y: 40, autoAlpha: 0, filter: "blur(12px)" },
    to: { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1, ease: "expo.out" },
  },
  rise: {
    from: { y: 120, scale: 0.95, rotationX: 8, autoAlpha: 0, transformOrigin: "50% 100%" },
    to: { y: 0, scale: 1, rotationX: 0, autoAlpha: 1, duration: 1.3, ease: "expo.out" },
  },
  left: {
    from: { x: -50, autoAlpha: 0 },
    to: { x: 0, autoAlpha: 1, duration: 1.1, ease: "power4.out" },
  },
  right: {
    from: { x: 50, autoAlpha: 0 },
    to: { x: 0, autoAlpha: 1, duration: 1.1, ease: "power4.out" },
  },
  pop: {
    from: { y: 60, scale: 0.7, rotationZ: -8, autoAlpha: 0 },
    to: { y: 0, scale: 1, rotationZ: 0, autoAlpha: 1, duration: 1, ease: "back.out(1.5)" },
  },
  "line-x": {
    from: { scaleX: 0, transformOrigin: "0% 50%" },
    to: { scaleX: 1, duration: 1.8, ease: "power3.inOut" },
  },
  "line-y": {
    from: { scaleY: 0, transformOrigin: "50% 0%" },
    to: { scaleY: 1, duration: 1.8, ease: "power3.inOut" },
  },
} as const;

export type RevealPreset = keyof typeof PRESETS;

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Faint blueprint grid behind the section, as in the heroes. */
  grid?: boolean;
  /** ScrollTrigger start for the entrance. */
  start?: string;
  innerClassName?: string;
}

export function Section({
  grid = false,
  start = "top 78%",
  className,
  innerClassName,
  children,
  style,
  ...props
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia(ref);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
      if (!items.length) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start, once: true },
      });

      let prev: RevealPreset | null = null;
      items.forEach((el, i) => {
        const preset = (el.dataset.reveal as RevealPreset) in PRESETS
          ? (el.dataset.reveal as RevealPreset)
          : "up";
        gsap.set(el, PRESETS[preset].from);
        // Give a rising card a head start before its contents follow it in.
        const offset = i === 0 ? 0 : prev === "rise" ? "<0.35" : "<0.09";
        // clearProps hands transform/filter back to CSS once done, so hover
        // lifts work and no leftover filter breaks descendants' backdrop-filter.
        tl.to(el, { ...PRESETS[preset].to, clearProps: "transform,filter" }, offset);
        prev = preset;
      });
    });

    return () => mm.revert();
  }, [start]);

  return (
    <section
      ref={ref}
      className={cn("relative scroll-mt-24 px-4 py-16 sm:py-20 lg:py-24", className)}
      style={{ perspective: "1500px", ...style }}
      {...props}
    >
      {grid && (
        <div className="bg-grid-theme absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
      )}
      <div className={cn("relative mx-auto max-w-7xl", innerClassName)}>{children}</div>
    </section>
  );
}
