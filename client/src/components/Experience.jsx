import React from "react";
import { Reveal, StaggerReveal } from "./Reveal";
import { ImageSlot } from "./ImageSlot";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="px-6 md:px-10 py-16 border-t border-[var(--line)]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.2em] mb-4 text-[var(--accent)]">Career So Far</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl md:text-5xl mb-16 font-display font-semibold">Experience</h2>
        </Reveal>

        <StaggerReveal
          selector="[data-stagger-item]"
          staggerDelay={0.22}
          duration={0.9}
          y={120}
          scaleFrom={0.92}
          start="top 92%"
          className="flex flex-col"
        >
          {experience.map((e, i) => (
            <div key={e.role} data-stagger-item style={{ opacity: 0 }}>
              <div
                className={`grid md:grid-cols-[1fr_1.4fr_auto] gap-6 items-start py-8 ${
                  i === 0 ? "" : "border-t border-[var(--line)]"
                }`}
              >
                <div>
                  <h3 className="text-lg font-semibold">{e.role}</h3>
                  <p className="text-sm mt-1 text-[var(--accent)]">{e.org}</p>
                  <p className="text-xs mt-1 text-[var(--mute)]">{e.meta}</p>
                </div>
                <p className="text-[14px] leading-relaxed text-[var(--mute)]">{e.desc}</p>
                <div className="w-full md:w-[220px]">
                  <ImageSlot src={e.certImage} alt={`${e.org} certificate`} label="Add certificate image" ratio="aspect-[4/3]" />
                </div>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
