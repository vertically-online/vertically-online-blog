"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CalendarCheck,
  Check,
  FileText,
  MessageSquareText,
  ChevronDown,
  Phone,
  UserPlus,
  Zap,
  type IconComponent,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { site, type LeadFeedItem } from "@/content/site";
import BookCallButton from "@/components/BookCallButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Height of the sticky site header (h-16). The hero pins just below it and
// sizes itself to the remaining viewport so nothing hides underneath.
const HEADER_OFFSET = 64;

// When the CSS tagline animations finish (wipe: 0.8s delay + 1.4s), plus a
// half-second beat, the GSAP timeline starts the card rise.
const TAGLINES_DONE_S = 2.7 - 0.3;

// Progress ring geometry (r = 58 inside a 144px box).
const RING_RADIUS = 58;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const FEED_ICONS: Record<LeadFeedItem["icon"], { Icon: IconComponent; tint: string }> = {
  lead: { Icon: UserPlus, tint: "text-sky-300 from-sky-400/25 border-sky-300/25" },
  reply: { Icon: MessageSquareText, tint: "text-cyan-300 from-cyan-400/25 border-cyan-300/25" },
  quote: { Icon: FileText, tint: "text-blue-300 from-blue-400/25 border-blue-300/25" },
  booked: { Icon: CalendarCheck, tint: "text-emerald-300 from-emerald-400/25 border-emerald-300/25" },
};

// Shared materials (card, bezel, glass, buttons) live in app/globals.css
// under "Cinematic materials" so other sections can reuse them.
const INJECTED_STYLES = `
  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: ${RING_CIRCUMFERENCE};
      stroke-dashoffset: ${RING_CIRCUMFERENCE};
      stroke-linecap: round;
  }

  /* Taglines: CSS so they start on first paint (LCP), not after hydration */
  @keyframes tagline-in {
      /* Opaque from the first frame (a focus pull, not a fade) so Chrome
         counts it as painted immediately for LCP. */
      from { transform: translateY(60px) scale(0.85); filter: blur(20px); }
      to { transform: none; filter: blur(0); }
  }
  @keyframes tagline-wipe {
      from { clip-path: inset(0 100% 0 0); }
      to { clip-path: inset(0 0 0 0); }
  }
  .text-track { animation: tagline-in 1.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .text-days { animation: tagline-wipe 1.4s cubic-bezier(0.76, 0, 0.24, 1) 0.8s both; }
  @media (prefers-reduced-motion: reduce) {
      .text-track, .text-days { animation: none; }
  }

  /* Scroll cue: fades in once the reveal finishes, out on first scroll */
  .scroll-cue {
      left: 50%;
      opacity: 0;
      visibility: hidden;
      transform: translate(-50%, 12px);
      transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s;
  }
  .scroll-cue.is-visible {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
  }
  @keyframes scroll-cue-wheel {
      0% { transform: translateY(0); opacity: 1; }
      70% { transform: translateY(9px); opacity: 0; }
      100% { transform: translateY(9px); opacity: 0; }
  }
  .scroll-cue-wheel { animation: scroll-cue-wheel 1.6s ease-in-out infinite; }
`;

type CinematicHeroContent = typeof site.cinematicHero;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  copy?: CinematicHeroContent;
}

export function CinematicHero({
  copy: content = site.cinematicHero,
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const cueRef = useRef<HTMLButtonElement>(null);
  const exitTriggerRef = useRef<ScrollTrigger | null>(null);

  const { phone, badges } = content;
  const metricValue = phone.metricValue;

  // 1. Mouse-driven card sheen + phone tilt (desktop pointers, motion allowed)
  useEffect(() => {
    const canTilt = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)"
    ).matches;
    if (!canTilt) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Auto-played reveal + scroll-driven exit
  useEffect(() => {
    const mm = gsap.matchMedia(containerRef);

    // Reduced motion: no pinning or scrubbing, just show the finished card.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".main-card", { autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text"], { autoAlpha: 1 });
      gsap.set(".progress-ring", { strokeDashoffset: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const isMobile = window.innerWidth < 768;

      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });
      gsap.set(".counter-val", { innerHTML: 0 });

      // Reveal plays on its own: taglines land, a short beat, then the card
      // rises, fills the stage, and the phone flies in. Scroll isn't needed.
      let revealDone = false;
      // Holder, not a const: the reveal can complete (and call updateCue)
      // before the exit timeline below exists.
      const exit: { tl?: gsap.core.Timeline } = {};

      // The scroll cue shows only once the reveal has finished and the
      // visitor is still at the very top of the hero.
      const updateCue = () => {
        const st = exit.tl?.scrollTrigger;
        const atTop = st ? st.progress < 0.01 : window.scrollY < 10;
        cueRef.current?.classList.toggle("is-visible", revealDone && atTop);
      };

      const introTl = gsap.timeline({
        delay: 0.3,
        onComplete: () => {
          revealDone = true;
          updateCue();
        },
      });
      introTl
        // The taglines animate in with CSS (tagline-in / tagline-wipe below)
        // so they paint on first render instead of waiting for JS: they're
        // the page's LCP element. The card rises once they've landed.
        .addLabel("rise", TAGLINES_DONE_S)
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 1.2 }, "rise")
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 1.2 }, "rise")
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 0.9 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.6 }, "-=0.5"
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.12, ease: "back.out(1.2)", duration: 0.9 }, "-=1.1")
        .to(".progress-ring", { strokeDashoffset: 0, duration: 1.4, ease: "power3.inOut" }, "-=0.8")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 1.4, ease: "expo.out" }, "<")
        .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1, stagger: 0.2 }, "-=1.2")
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1 }, "-=1.1")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1 }, "<");

      // Landed mid-page (reload, back button): skip straight to the end state
      // so the scroll-out below records its start values from it.
      if (window.scrollY > 0) introTl.progress(1);

      // Scroll only drives the exit: the card shrinks and lifts away with its
      // content still on it, uncovering the CTA. No empty blue stretch.
      const scrollTl = (exit.tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top ${HEADER_OFFSET}px`,
          end: "+=1600",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            updateCue();
            if (revealDone) return;
            // Scrolling during the reveal: hurry it along, and finish it
            // outright before the exit starts moving the same elements.
            const exitAt = scrollTl.labels.exit / scrollTl.duration();
            if (self.progress >= exitAt) introTl.progress(1);
            else introTl.timeScale(5);
          },
        },
      }));

      scrollTl
        .to({}, { duration: 0.6 })
        .addLabel("exit")
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to(".main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92%" : "85%",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "power2.inOut",
          duration: 1.2,
        }, "exit")
        .to(".mockup-scroll-wrapper", { scale: 0.88, ease: "power2.inOut", duration: 1.2 }, "exit")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.6 }, "exit")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.2 }, "exit+=0.5");

      // Kept as the trigger itself: its end is only known after ScrollTrigger refreshes.
      exitTriggerRef.current = scrollTl.scrollTrigger ?? null;
      updateCue();

      return () => {
        exitTriggerRef.current = null;
        cueRef.current?.classList.remove("is-visible");
      };
    });

    return () => mm.revert();
  }, [metricValue]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-[calc(100svh-4rem)] overflow-hidden flex items-center justify-center bg-[#f6f6f7] text-void font-body antialiased",
        className
      )}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* Scroll cue: clicking it plays the exit and lands on the CTA */}
      <button
        ref={cueRef}
        type="button"
        onClick={() => {
          const end = exitTriggerRef.current?.end;
          window.scrollTo({ top: end || window.innerHeight, behavior: "smooth" });
        }}
        className="scroll-cue absolute bottom-4 md:bottom-7 z-40 flex flex-col items-center gap-2 rounded-full px-4 py-2 text-white/80 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <span className="hidden md:flex h-9 w-6 justify-center rounded-full border-2 border-white/50 pt-1.5" aria-hidden="true">
          <span className="scroll-cue-wheel h-2 w-1 rounded-full bg-white/80" />
        </span>
        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em]">
          Scroll
          <ChevronDown className="h-3.5 w-3.5 animate-bounce md:hidden" aria-hidden="true" />
        </span>
      </button>
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-60" aria-hidden="true" />

      {/* BACKGROUND LAYER: taglines */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-full px-4 will-change-transform transform-3d">
        <p className="text-track text-3d-matte font-display text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight leading-[1.05] mb-2">
          {content.tagline1}
        </p>
        <p className="text-days text-brand-matte font-display text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter leading-[1.05] pb-2">
          {content.tagline2}
        </p>
      </div>

      {/* BACKGROUND LAYER 2: CTA, revealed when the card flies away */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-full px-4 gsap-reveal pointer-events-auto will-change-transform">
        <p className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-brand-matte pb-1">
          {content.ctaHeading}
        </p>
        <p className="text-slate text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          {content.ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <BookCallButton className="btn-modern-brand inline-flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] text-lg font-bold tracking-tight group">
            <Zap className="w-5 h-5 transition-transform group-hover:scale-110" aria-hidden="true" />
            {site.hero.primaryCta}
          </BookCallButton>
          <a
            href={site.contact.phoneHref}
            className="btn-modern-dark inline-flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] text-lg font-bold tracking-tight group"
          >
            <Phone className="w-5 h-5 transition-transform group-hover:scale-110" aria-hidden="true" />
            Call {site.contact.phone}
          </a>
        </div>
        <p className="mt-6 text-sm text-slate/80">{site.finalCta.reassurance}</p>
      </div>

      {/* FOREGROUND LAYER: the deep navy card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92%] md:h-[85%] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* Flex column on mobile to control order, 3-column grid on desktop */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* BOTTOM (mobile) / LEFT (desktop): pitch */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0 lg:pr-28">
              <p className="font-display text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                {content.cardHeading}
              </p>
              <p className="hidden md:block mt-3 lg:mt-0 text-[#C9D3DB] text-sm md:text-base lg:text-lg leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {content.cardDescription}
              </p>
              <ul className="hidden lg:flex flex-col gap-2.5 mt-5">
                {content.cardPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="mt-0.5 flex w-5 h-5 shrink-0 items-center justify-center rounded-full bg-[#008FD0]/20 border border-[#008FD0]/40">
                      <Check className="w-3 h-3 text-sky-300" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* DOM order: the pitch comes first (it carries the page keyword); order-* classes set the visual order. */}
            {/* TOP (mobile) / RIGHT (desktop): headline stat */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex flex-col items-center lg:items-end text-center lg:text-right z-20 w-full">
              <p className="font-display text-6xl md:text-[6rem] lg:text-[8rem] font-black tracking-tighter leading-none text-card-silver-matte">
                {content.highlightValue}
              </p>
              <p className="mt-2 lg:mt-4 max-w-[16rem] text-sm md:text-base text-[#8FCBEB]/80 font-medium">
                {content.highlightCaption}
              </p>
            </div>

            {/* MIDDLE (mobile) / CENTER (desktop): iPhone */}
            <div className="mockup-scroll-wrapper order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              {/* Inner wrapper scales via CSS so it doesn't fight GSAP transforms */}
              <div className="relative w-full h-full flex items-center justify-center scale-[0.65] md:scale-85 lg:scale-100">

                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform transform-3d"
                  role="img"
                  aria-label="Example of AI for roofing companies on a phone: a new roofing lead answered in 18 seconds, quoted, and booked for an inspection"
                >
                  {/* Hardware buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {/* Screen */}
                  <div className="absolute inset-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10" aria-hidden="true">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" />
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#008FD0]/20 blur-3xl pointer-events-none" />

                    {/* Dynamic Island */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                    </div>

                    {/* App UI */}
                    <div className="relative w-full h-full pt-12 px-4 pb-8 flex flex-col">
                      <div className="phone-widget flex justify-between items-center mb-4">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-[#8FCBEB]/60 uppercase tracking-widest font-bold mb-0.5">{phone.eyebrow}</span>
                          <span className="font-display text-lg font-bold tracking-tight text-white drop-shadow-md">{phone.title}</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-lg shadow-black/50 overflow-hidden">
                          <Image src={site.brand.logoMark} alt="" width={22} height={22} className="w-[22px] h-[22px] object-contain" />
                        </div>
                      </div>

                      <div className="phone-widget relative w-36 h-36 mx-auto flex items-center justify-center mb-4 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 144 144">
                          <defs>
                            <linearGradient id="vertically-ring" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#7DD3FC" />
                              <stop offset="100%" stopColor="#008FD0" />
                            </linearGradient>
                          </defs>
                          <circle cx="72" cy="72" r={RING_RADIUS} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="10" />
                          <circle className="progress-ring" cx="72" cy="72" r={RING_RADIUS} fill="none" stroke="url(#vertically-ring)" strokeWidth="10" />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="font-display text-4xl font-extrabold tracking-tighter text-white">
                            <span className="counter-val">{metricValue}</span>
                            {phone.metricSuffix}
                          </span>
                          <span className="text-[8px] text-[#8FCBEB]/60 uppercase tracking-[0.12em] font-bold mt-0.5">{phone.metricLabel}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {phone.feed.map((item) => {
                          const { Icon, tint } = FEED_ICONS[item.icon];
                          return (
                            <div key={item.title} className="phone-widget widget-depth rounded-2xl p-2.5 flex items-center">
                              <div className={cn("w-8 h-8 shrink-0 rounded-xl bg-gradient-to-br to-transparent flex items-center justify-center mr-2.5 border shadow-inner", tint)}>
                                <Icon className="w-4 h-4 drop-shadow-md" strokeWidth={2.25} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline justify-between gap-2">
                                  <p className="text-[11px] font-bold text-white truncate">{item.title}</p>
                                  <span className="text-[9px] text-white/40 shrink-0">{item.time}</span>
                                </div>
                                <p className="text-[10px] text-white/55 truncate">{item.detail}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    </div>
                  </div>
                </div>

                {/* Floating glass badges */}
                <div className="floating-badge absolute hidden lg:flex lg:top-[118px] lg:left-[-130px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30" aria-hidden="true">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-sky-400/25 to-sky-900/10 flex items-center justify-center border border-sky-300/30 shadow-inner">
                    <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-sky-300" />
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">{badges[0].title}</p>
                    <p className="text-[#8FCBEB]/60 text-[10px] lg:text-xs font-medium">{badges[0].detail}</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-[-76px] lg:bottom-6 right-[-15px] lg:right-[-130px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30" aria-hidden="true">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-emerald-400/25 to-emerald-900/10 flex items-center justify-center border border-emerald-300/30 shadow-inner">
                    <CalendarCheck className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-300" />
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">{badges[1].title}</p>
                    <p className="text-[#8FCBEB]/60 text-[10px] lg:text-xs font-medium">{badges[1].detail}</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
