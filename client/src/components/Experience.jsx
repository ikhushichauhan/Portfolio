import React from "react";
import { Reveal, SplitTextReveal, StackedCardScroll } from "./Reveal";
import { ImageSlot } from "./ImageSlot";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="px-6 md:px-10 py-16">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.2em] mb-2 text-[var(--accent)]">Career So Far</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl md:text-5xl mb-6 font-display font-semibold">Experience</h2>
        </Reveal>

        <StackedCardScroll className="flex flex-col">
          {experience.map((e, i) => (
            <div key={e.role} data-stack-card style={{ opacity: 0 }}>
              <div
                className="grid md:grid-cols-[1fr_1.4fr_auto] gap-8 items-start py-8"
              >
                <div>
                  <SplitTextReveal
                    as="h3"
                    className="text-lg font-semibold mb-2"
                    stagger={0.03}
                    y={30}
                    duration={0.7}
                    delay={0.1}
                  >
                    {e.role}
                  </SplitTextReveal>
                  <SplitTextReveal
                    as="p"
                    className="text-sm mb-2"
                    stagger={0.02}
                    y={20}
                    duration={0.6}
                    delay={0.2}
                  >
                    <a 
                      href={e.orgLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] hover:text-[var(--accent-soft)] transition-colors"
                    >
                      {e.org}
                    </a>
                  </SplitTextReveal>
                  <SplitTextReveal
                    as="p"
                    className="text-xs text-[var(--mute)]"
                    stagger={0.02}
                    y={20}
                    duration={0.6}
                    delay={0.3}
                  >
                    {e.meta}
                  </SplitTextReveal>
                </div>
                <SplitTextReveal
                  as="p"
                  className="text-[14px] leading-relaxed text-[var(--mute)]"
                  stagger={0.015}
                  y={20}
                  duration={0.6}
                  delay={0.4}
                >
                  {e.desc}
                </SplitTextReveal>
                <div className="w-full md:w-[220px]">
                  <ImageSlot src={e.certImage} alt={`${e.org} certificate`} label="Add certificate image" ratio="aspect-[4/3]" />
                </div>
              </div>
            </div>
          ))}
        </StackedCardScroll>
      </div>
    </section>
  );
}
