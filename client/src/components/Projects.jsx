import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, StaggerReveal } from "./Reveal";
import { ImageSlot } from "./ImageSlot";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="px-6 md:px-10 py-16 border-t border-[var(--line)]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.2em] mb-4 text-[var(--accent)]">Selected Work</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl md:text-5xl mb-16 font-display font-semibold">Projects</h2>
        </Reveal>

        <StaggerReveal
          selector="[data-stagger-item]"
          staggerDelay={0.22}
          duration={0.9}
          y={120}
          scaleFrom={0.92}
          start="top 92%"
          className="flex flex-col gap-20"
        >
          {projects.map((p, i) => (
            <div key={p.title} data-stagger-item style={{ opacity: 0 }}>
              <div className={`project-card-wrap grid md:grid-cols-2 gap-8 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                <div style={{ direction: "ltr" }} className="project-image-wrap">
                  <ImageSlot
                    src={p.image}
                    alt={p.title}
                    label={`Add "${p.title}" screenshot here`}
                  />
                </div>
                <div style={{ direction: "ltr" }}>
                  <span className="text-xs tracking-widest text-[var(--mute)]">{p.tag}</span>
                  <h3 className="text-2xl md:text-3xl mt-2 mb-4 font-display font-semibold">{p.title}</h3>
                  <p className="text-[14px] leading-relaxed mb-5 text-[var(--mute)]">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2.5 py-1 rounded-md border border-[var(--line)] text-[var(--mute)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="hover-card inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full border border-[var(--line)] text-[var(--ink)]"
                  >
                    {p.linkLabel} <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
