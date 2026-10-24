import React from "react";
import { cn } from "@/lib/utils";

export interface DarkPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

/** Blue stage-gradient panel with film grain, as on the homepage. */
export function DarkPanel({ padded = true, className, children, ...props }: DarkPanelProps) {
  return (
    <div
      className={cn(
        "premium-depth-card relative overflow-hidden rounded-[32px] text-white",
        padded && "px-6 py-12 sm:px-10 lg:px-14 lg:py-16",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
