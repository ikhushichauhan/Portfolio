
import React, { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import gsap from "gsap";

function TypingRole() {
  const roles = ["Software Engineer.", "Data Analyst.", "Future AI Engineer."];
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[i];
    const speed = deleting ? 35 : 65;
    const t = setTimeout(() => {
      if (!deleting) {
        if (txt.length < full.length) setTxt(full.slice(0, txt.length + 1));
        else setTimeout(() => setDeleting(true), 1100);
      } else {
        if (txt.length > 0) setTxt(full.slice(0, txt.length - 1));
        else {
          setDeleting(false);
          setI((p) => (p + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txt, deleting, i]);

  return (
    <span>
      {txt}
      <span className="caret inline-block w-[2px] h-[0.9em] bg-current ml-1 align-middle" />
    </span>
  );
}

export function Hero({ scrollTo }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const items = el.querySelectorAll("[data-hero-item]");
    if (!items.length) return;

    // GPU hints for hero items
    items.forEach((item) => {
      item.style.willChange = "transform, opacity";
    });

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(items, { opacity: 0, y: 25 });

      // Stagger reveal timeline — tuned for smooth 60fps entrance
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.15,
        delay: 0.3,
        ease: "power2.out",
      });
    }, el);

    return () => {
      items.forEach((item) => {
        item.style.willChange = "auto";
      });
      ctx.revert();
    };
  }, []);

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-10">
      <div className="max-w-6xl mx-auto w-full relative z-10 pt-24 flex flex-col-reverse md:flex-row items-center md:items-center gap-6 md:gap-10">

        {/* Left — text content */}
        <div className="flex-1 text-center md:text-left">
          <div data-hero-item>
            <h1 className="font-display font-bold tracking-tight leading-[0.9] text-[11vw] md:text-[6rem] lg:text-[5rem] text-[var(--ink)]">
              Khushi Chauhan
            </h1>
          </div>

          <div data-hero-item>
            <div className="mt-6 text-2xl md:text-4xl text-[var(--mute)] font-display">
              I'm a <span className="text-[var(--ink)] font-semibold"><TypingRole /></span>
            </div>
          </div>

          <div data-hero-item>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--mute)] mx-auto md:mx-0">
              Currently building toward an <span className="text-[var(--accent)]">AI Engineer</span> future
              learning to design and ship AI agents, while working daily across the MERN stack
              and data analytics (SQL, Power BI and Python).
            </p>
          </div>

          <div data-hero-item>
            <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
              <Button onClick={() => scrollTo("projects")} variant="solid" size="lg">
                View Projects
              </Button>
              <Button onClick={() => scrollTo("contact")} variant="outline" size="lg">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>

        {/* Right — profile image */}
        <div data-hero-item>
          <div className="relative flex-shrink-0 hero-img-wrap cursor-pointer">
            {/* white glow behind image */}
            <div className="hero-glow absolute -inset-3 rounded-2xl bg-white/20 blur-xl" />
            <img
              src="/images/khushi.jpeg"
              alt="Khushi Chauhan"
              className="relative w-48 md:w-72 lg:w-80 rounded-2xl object-cover shadow-[0_0_30px_rgba(255,255,255,0.25),0_0_60px_rgba(255,255,255,0.1)]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
