import React from "react";
import { Reveal } from "./Reveal";
import { TechGlobe } from "./TechGlobe";

export function About() {
  return (
    <section id="about" className="px-6 md:px-10 py-16 border-t border-[var(--line)]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-[13px] uppercase tracking-[0.2em] mb-2 text-[var(--accent)]"><b>About</b></p>
        </Reveal>

        {/* ── Split layout: bio left, globe right ── */}
        <div className="about-split">
          {/* Left: bio text */}
          <div className="about-text">
            <Reveal delay={0.05}>
              <h2 className="text-3xl md:text-4xl mb-4 font-display font-semibold leading-tight">
                Software Engineering &amp; Data Analytics student passionate about building real-world projects.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm md:text-base leading-relaxed text-[var(--mute)] opacity-80">
                I build full-stack products on the MERN stack, turn raw data into decisions with
                SQL, Power BI and Python, and I'm currently teaching myself how to design and deploy
                AI agents — the long-term goal being to work as an AI Engineer.
              </p>
            </Reveal>
          </div>


          {/* Right: interactive 3D tech globe */}
          <div className="about-globe-wrap">
            <Reveal delay={0.15}>
              <TechGlobe size={460} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
