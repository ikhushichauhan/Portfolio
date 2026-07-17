import React from "react";
import { FileBadge2 } from "lucide-react";
import { Reveal, SplitTextReveal } from "./Reveal";
import { ImageSlot } from "./ImageSlot";
import { certifications } from "@/data/certifications";

export function Certifications() {
  // Duplicate the list so the second copy creates the seamless loop
  const doubled = [...certifications, ...certifications];

  return (
    <section id="certifications" className="px-6 md:px-10 py-16">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.2em] mb-4 text-[var(--accent)]">Proof of Work</p>
        </Reveal>
        <SplitTextReveal
          as="h2"
          className="text-3xl md:text-5xl mb-8 font-display font-semibold"
          stagger={0.03}
          y={30}
          duration={0.7}
          delay={0.1}
        >
          Certifications
        </SplitTextReveal>
      </div>

      {/* Full-width marquee — overflow hidden hides the seam */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {doubled.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="marquee-card rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 flex flex-col gap-4"
            >
              <ImageSlot
                src={c.image}
                alt={c.name}
                label="Add certificate image / PDF preview"
                ratio="aspect-[4/3]"
              />
              <div className="flex items-start gap-2">
                <FileBadge2 size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold leading-snug truncate">{c.name}</h4>
                  <p className="text-xs mt-1 text-[var(--mute)]">
                    <a 
                      href={c.orgLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent)] transition-colors"
                    >
                      {c.org}
                    </a> · {c.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
