"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

export interface DarkPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Entrance preset when inside a <Section>; false to opt out. */
  reveal?: "rise" | false;
  padded?: boolean;
}

/**
 * The navy depth card from the heroes: layered brand-blue glows, physical
 * inset highlights, and a soft sheen that follows the mouse.
 */
export function DarkPanel({
  reveal = "rise",
  padded = true,
  className,
  children,
  ...props
}: DarkPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      data-reveal={reveal || undefined}
      onMouseMove={handleMouseMove}
      className={cn(
        "premium-depth-card relative overflow-hidden rounded-[32px] md:rounded-[40px] text-white",
        padded && "px-6 py-12 sm:px-10 lg:px-14 lg:py-16",
        className
      )}
      {...props}
    >
      <div className="card-sheen" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
