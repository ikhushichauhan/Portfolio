/**
 * GSAP + ScrollTrigger + Lenis animation utilities.
 * This file ONLY adds animation behavior — no UI / layout / style changes.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Shared defaults                                                    */
/* ------------------------------------------------------------------ */
const DEFAULTS = {
  duration: 0.9,
  ease: "power3.out",
  y: 40,
};

/* ------------------------------------------------------------------ */
/*  useSectionReveal — fade + slide-up an entire section wrapper       */
/* ------------------------------------------------------------------ */
export function useSectionReveal(options = {}) {
  const ref = useRef(null);
  const { y = DEFAULTS.y, duration = DEFAULTS.duration, delay = 0 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: DEFAULTS.ease,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, duration, delay]);

  return ref;
}

/* ------------------------------------------------------------------ */
/*  useStaggerReveal — fade + slide-up children with stagger           */
/* ------------------------------------------------------------------ */
export function useStaggerReveal(selector, options = {}) {
  const ref = useRef(null);
  const {
    y = DEFAULTS.y,
    duration = DEFAULTS.duration,
    stagger = 0.12,
    delay = 0,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          delay,
          ease: DEFAULTS.ease,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [selector, y, duration, stagger, delay]);

  return ref;
}

/* ------------------------------------------------------------------ */
/*  useHeroAnimation — orchestrated timeline for the hero section      */
/* ------------------------------------------------------------------ */
export function useHeroAnimation() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: DEFAULTS.ease } });

      // Stagger each Reveal wrapper inside the hero
      const revealItems = el.querySelectorAll("[data-hero-item]");
      if (revealItems.length) {
        // Set initial state
        gsap.set(revealItems, { opacity: 0, y: 50 });

        tl.to(revealItems, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          delay: 0.2,
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/* ------------------------------------------------------------------ */
/*  useElementReveal — single element fade + slide-up on scroll        */
/* ------------------------------------------------------------------ */
export function useElementReveal(options = {}) {
  const ref = useRef(null);
  const { y = DEFAULTS.y, duration = DEFAULTS.duration, delay = 0 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: DEFAULTS.ease,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, duration, delay]);

  return ref;
}
