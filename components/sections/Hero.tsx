"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Play, TrendingUp, Zap } from "@/components/ui/icons";
import { site, type HeroStat } from "@/content/site";
import IntroVideo from "@/components/IntroVideo";
import BookCallButton from "@/components/BookCallButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// The glass badges sit over a busy video here, so they need a denser fill
// than the default floating-ui-badge to stay readable.
const BADGE_STYLE = { background: "rgba(10, 14, 39, 0.78)" };

function formatStat(stat: HeroStat, value: number) {
  return `${stat.prefix ?? ""}${value.toLocaleString("en-US", {
    minimumFractionDigits: stat.decimals,
    maximumFractionDigits: stat.decimals,
  })}${stat.suffix ?? ""}`;
}

/**
 * Founder-video hero, styled to continue the cinematic hero above it: the
 * same navy depth card "returns" with the founder video playing inside the
 * same iPhone, and plays its entrance once when scrolled into view (no pin).
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const requestRef = useRef(0);

  const { stats, videoBadges } = site.hero;

  // Mouse-driven card sheen + phone tilt while the pointer is over the section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const canTilt = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)"
    ).matches;
    if (!canTilt) return;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        const card = cardRef.current;
        if (!card || !mockupRef.current) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);

        const xVal = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const yVal = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        gsap.to(mockupRef.current, {
          rotationY: xVal * 10,
          rotationX: -yVal * 10,
          ease: "power3.out",
          duration: 1.2,
        });
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Entrance: plays once when the section scrolls into view
  useEffect(() => {
    const mm = gsap.matchMedia(sectionRef);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(".fh-card", { y: 140, scale: 0.94, rotationX: 10, autoAlpha: 0, transformOrigin: "50% 100%" });
      gsap.set(".fh-phone", { y: 300, z: -500, rotationX: 50, rotationY: -30, scale: 0.6, autoAlpha: 0 });
      gsap.set(".fh-item", { y: 40, autoAlpha: 0, filter: "blur(12px)" });
      gsap.set(".fh-badge", { y: 80, scale: 0.7, rotationZ: -10, autoAlpha: 0 });
      gsap.set(".fh-stat", { x: 50, autoAlpha: 0 });

      const counter = { t: 0 };
      const renderCounters = () => {
        stats.forEach((stat, i) => {
          const el = statRefs.current[i];
          if (el) el.textContent = formatStat(stat, stat.target * counter.t);
        });
      };
      renderCounters();

      gsap
        .timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        })
        .to(".fh-card", { y: 0, scale: 1, rotationX: 0, autoAlpha: 1, duration: 1.3, ease: "expo.out" })
        .to(".fh-phone", { y: 0, z: 0, rotationX: 0, rotationY: 0, scale: 1, autoAlpha: 1, duration: 1.6, ease: "expo.out" }, "-=0.8")
        // clearProps: a leftover filter on an ancestor breaks the glass
        // buttons' backdrop-filter in Chromium.
        .to(".fh-item", { y: 0, autoAlpha: 1, filter: "blur(0px)", stagger: 0.08, duration: 1, ease: "expo.out", clearProps: "filter" }, "-=1.3")
        .to(".fh-badge", { y: 0, scale: 1, rotationZ: 0, autoAlpha: 1, stagger: 0.2, duration: 1, ease: "back.out(1.5)" }, "-=0.8")
        .to(".fh-stat", { x: 0, autoAlpha: 1, stagger: 0.12, duration: 1, ease: "power4.out" }, "-=1.0")
        .to(counter, { t: 1, duration: 2, ease: "expo.out", onUpdate: renderCounters }, "<");
    });

    return () => mm.revert();
  }, [stats]);

  const statsLabel = stats
    .map((stat) => `${stat.announce} ${stat.label.toLowerCase()}`)
    .join(", ");

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f6f6f7] px-4 pt-4 pb-12 sm:pb-16 lg:pb-20"
      style={{ perspective: "1500px" }}
    >
      <div className="bg-grid-theme absolute inset-0 opacity-60 pointer-events-none" aria-hidden="true" />

      <div
        ref={cardRef}
        className="fh-card premium-depth-card relative mx-auto max-w-7xl overflow-hidden rounded-[32px] md:rounded-[40px]"
      >
        <div className="card-sheen" aria-hidden="true" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-12 px-6 py-12 sm:px-10 lg:grid-cols-[1.3fr_auto_0.7fr] lg:gap-10 xl:gap-6 lg:px-14 lg:py-16">
          {/* Pitch */}
          <div className="text-center lg:text-left">
            <span className="fh-item inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-[#9fdaff] ring-1 ring-white/10 mb-5">
              {site.hero.badge}
            </span>
            <h1 className="fh-item font-display text-4xl sm:text-5xl lg:text-5xl font-bold leading-[1.08] tracking-tight text-white">
              {site.hero.headline}
            </h1>
            <p className="fh-item mt-5 text-lg text-[#C9D3DB] max-w-xl mx-auto lg:mx-0">
              {site.hero.subheadline}
            </p>
            <div className="fh-item mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center lg:justify-start">
              <BookCallButton className="btn-modern-brand whitespace-nowrap inline-flex items-center justify-center gap-2.5 rounded-[1.1rem] px-6 py-3.5 text-base font-bold tracking-tight group">
                <Zap className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                {site.hero.primaryCta}
              </BookCallButton>
              <a
                href={site.contact.phoneHref}
                className="btn-modern-glass whitespace-nowrap inline-flex items-center justify-center gap-2.5 rounded-[1.1rem] px-6 py-3.5 text-base font-bold tracking-tight group"
              >
                <Phone className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                Call {site.contact.phone}
              </a>
            </div>
            <p className="fh-item mt-4 text-sm text-white/55 max-w-md mx-auto lg:mx-0">
              {site.hero.reassurance}
            </p>
          </div>

          {/* Founder video inside the iPhone */}
          <div className="fh-phone relative mx-auto xl:mx-[110px]" style={{ perspective: "1000px" }}>
            <div
              ref={mockupRef}
              className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel will-change-transform transform-3d"
            >
              <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md" aria-hidden="true" />
              <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md" aria-hidden="true" />
              <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md" aria-hidden="true" />
              <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md scale-x-[-1]" aria-hidden="true" />

              <div className="absolute inset-[7px] rounded-[2.5rem] overflow-hidden bg-void shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
                <IntroVideo
                  className="h-full max-w-none rounded-none shadow-none"
                  aspectClassName="h-full"
                />
                <div className="absolute inset-0 screen-glare pointer-events-none" aria-hidden="true" />
                <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)] pointer-events-none" aria-hidden="true" />
              </div>
            </div>

            {/* Floating glass badges (kept clear of the face and captions) */}
            <div className="fh-badge floating-ui-badge absolute hidden md:flex lg:hidden xl:flex top-[96px] -left-[150px] xl:-left-[110px] items-center gap-3 rounded-2xl p-3.5 z-30"
              style={BADGE_STYLE}
              aria-hidden="true"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-b from-sky-400/25 to-sky-900/10 flex items-center justify-center border border-sky-300/30 shadow-inner">
                <Play className="w-4 h-4 text-sky-300 translate-x-px" />
              </div>
              <div>
                <p className="text-white text-sm font-bold tracking-tight">{videoBadges[0].title}</p>
                <p className="text-[#8FCBEB]/60 text-xs font-medium">{videoBadges[0].detail}</p>
              </div>
            </div>
            <div className="fh-badge floating-ui-badge absolute hidden md:flex lg:hidden xl:flex top-[345px] -right-[170px] xl:-right-[120px] items-center gap-3 rounded-2xl p-3.5 z-30"
              style={BADGE_STYLE}
              aria-hidden="true"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-b from-emerald-400/25 to-emerald-900/10 flex items-center justify-center border border-emerald-300/30 shadow-inner">
                <TrendingUp className="w-4 h-4 text-emerald-300" />
              </div>
              <div>
                <p className="text-white text-sm font-bold tracking-tight">{videoBadges[1].title}</p>
                <p className="text-[#8FCBEB]/60 text-xs font-medium">{videoBadges[1].detail}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <dl
            role="group"
            aria-label={statsLabel}
            className="grid grid-cols-3 gap-4 lg:grid-cols-1 lg:gap-10 text-center lg:text-right"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="fh-stat" aria-hidden="true">
                <dd className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none tabular-nums text-card-silver-matte">
                  <span ref={(el) => { statRefs.current[i] = el; }}>
                    {formatStat(stat, stat.target)}
                  </span>
                </dd>
                <dd className="mt-2 text-xs sm:text-sm text-[#8FCBEB]/75 font-medium">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
