import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SplitTextReveal, StackedCardScroll } from "./Reveal";
import { ImageSlot } from "./ImageSlot";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="px-6 md:px-10 py-16">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.2em] mb-2 text-[var(--accent)]">Selected Work</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl md:text-5xl mb-6 font-display font-semibold">Projects</h2>
        </Reveal>

        <StackedCardScroll className="flex flex-col gap-10">
          {projects.map((p, i) => (
            <div key={p.title} data-stack-card style={{ opacity: 0 }}>
              <div className={`project-card-wrap grid md:grid-cols-2 gap-6 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                <div style={{ direction: "ltr" }} className="project-image-wrap">
                  <ImageSlot
                    src={p.image}
                    alt={p.title}
                    label={`Add "${p.title}" screenshot here`}
                  />
                </div>
                <div style={{ direction: "ltr" }}>

                  <SplitTextReveal
                    as="h3"
                    className="text-2xl md:text-3xl mb-4 font-display font-semibold"
                    stagger={0.03}
                    y={30}
                    duration={0.7}
                    delay={0.1}
                  >
                    {p.title}
                  </SplitTextReveal>
                  <SplitTextReveal
                    as="p"
                    className="text-[14px] leading-relaxed mb-5 text-[var(--mute)]"
                    stagger={0.02}
                    y={20}
                    duration={0.6}
                    delay={0.2}
                  >
                    {p.desc}
                  </SplitTextReveal>
                  <div className="flex flex-wrap gap-2 mb-5">
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
        </StackedCardScroll>
      </div>
    </section>
  );
}
