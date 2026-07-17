import React from "react";
import { Reveal, SplitTextReveal } from "./Reveal";
import { TechGlobe } from "./TechGlobe";

export function About() {
  return (
    <section id="about" className="px-6 md:px-10 py-12">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-[13px] uppercase tracking-[0.2em] mb-1 text-[var(--accent)]"><b>About</b></p>
        </Reveal>

        {/* ── Split layout: bio left, globe right ── */}
        <div className="about-split">
          {/* Left: bio text */}
          <div className="about-text">
            <SplitTextReveal
              as="h2"
              className="text-2xl md:text-3xl mb-2 font-display font-semibold leading-tight"
              stagger={0.02}
              y={30}
              duration={0.7}
              delay={0.1}
            >
              Software Engineering &amp; Data Analytics student passionate about building real-world projects.
            </SplitTextReveal>
            <p> <br /> </p>
            

            <SplitTextReveal
              as="p"
              className="text-sm md:text-base leading-relaxed text-[var(--mute)] opacity-80"
              stagger={0.02}
              y={20}
              duration={0.6}
              delay={0.2}
            >
              I build full-stack products on the MERN stack, turn raw data into decisions with
              SQL, Power BI and Python, and I'm currently teaching myself how to design and deploy
              AI agents — the long-term goal being to work as an AI Engineer.
            </SplitTextReveal>
          </div>

          {/* Right: interactive 3D tech globe */}
          <div className="about-globe-wrap">
            <Reveal delay={0.15}>
              <TechGlobe size={400} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
