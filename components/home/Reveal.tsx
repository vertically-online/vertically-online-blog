"use client";

import { useEffect } from "react";

/**
 * Fades [data-sr] blocks up as they scroll into view. Content is visible in
 * the server HTML; it's only hidden here, after hydration, when motion is
 * allowed and the block is still below the fold.
 */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [...document.querySelectorAll<HTMLElement>("[data-sr]")].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight
    );
    els.forEach((el) => el.classList.add("sr-hide"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("sr-show");
          entry.target.classList.remove("sr-hide");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
