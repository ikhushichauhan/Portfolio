import React, { useEffect, useState, useCallback, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [dark, setDark] = useState(true);
  const lenisRef = useRef(null);

  // apply/remove the `.light` class on <html> so index.css variables switch
  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  // Lenis smooth scrolling — synced with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll position with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker to drive Lenis raf loop
    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((id) => {
    const target = document.getElementById(id);
    if (!target) return;

    // Use Lenis scrollTo if available, otherwise fallback
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: 0, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <Navbar dark={dark} setDark={setDark} />
      <Hero scrollTo={scrollTo} />
      <div className="space-y-6">
        <About />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </div>
    </div>
  );
}
