import React from "react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

export function Eyebrow({
  tone = "light",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={cn("eyebrow", tone === "dark" && "!text-[var(--glow)]", className)}>
      {children}
    </span>
  );
}

/**
 * Splits a two-sentence headline so the last sentence can carry the accent
 * treatment ("You don't have a closing problem. | You have a response
 * problem."). Single sentences come back whole.
 */
function splitHeadline(text: string): [string, string | null] {
  const match = text.match(/^(.+?[.!?])\s+(.+)$/);
  return match ? [match[1], match[2]] : [text, null];
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow?: React.ReactNode;
  title: string;
  intro?: React.ReactNode;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
}) {
  const [lead, accent] = splitHeadline(title);

  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "section-title",
          eyebrow && "mt-5",
          tone === "light" ? "text-void" : "text-white"
        )}
      >
        {lead}
        {accent && (
          <>
            {" "}
            <span className={tone === "light" ? "text-[var(--blue)]" : "text-white/80"}>
              {accent}
            </span>
          </>
        )}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            align === "center" && "mx-auto",
            "max-w-2xl",
            tone === "light" ? "text-slate" : "text-[#C9D3DB]"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
