import React, { useState } from "react";
import { Mail, Linkedin, Github, ExternalLink, Loader2, CheckCircle2, XCircle, Code } from "lucide-react";
import { Reveal, StaggerReveal, SplitTextReveal } from "./Reveal";
import { Button } from "./ui/button";
import { socials } from "@/data/skills";

const initialForm = { name: "", email: "", message: "" };

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in every field before sending.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Could not send your message. Please try again.");
    }
  }

  return (
    <section id="contact" className="px-6 md:px-10 py-16">
      <div className="max-w-6xl mx-auto">
        <SplitTextReveal
          as="h2"
          className="font-display text-4xl md:text-6xl mb-4"
          stagger={0.03}
          y={40}
          duration={0.8}
          delay={0.1}
        >
          Caught a spark?
        </SplitTextReveal>
        <SplitTextReveal
          as="h2"
          className="font-display text-4xl md:text-6xl mb-8 text-[var(--mute)]"
          stagger={0.03}
          y={40}
          duration={0.8}
          delay={0.2}
        >
          Your move.
        </SplitTextReveal>

        {/* Single box containing both contact info and form */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 md:p-6">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Left side: Contact info */}
            <div>
              <h3 className="text-xl font-display font-semibold mb-4">Get in touch</h3>
              
              <StaggerReveal
                selector="[data-stagger-item]"
                staggerDelay={0.08}
                duration={0.6}
                className="space-y-2"
              >
                {[
                  { icon: Mail, label: "Email", sub: "khushichauhan9850@gmail.com", href: socials.email  },
                  { icon: Linkedin, label: "LinkedIn", sub: "khushi-chauhan09", href: socials.linkedin },
                  { icon: Github, label: "GitHub", sub: "ikhushichauhan", href: socials.github },
                  { icon: Code, label: "LeetCode", sub: "ikhushichauhan", href: socials.leetcode },
                ].map(({ icon: Icon, label, sub, href }) => (
                  <div key={label} data-stagger-item style={{ opacity: 0 }}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-2 rounded-xl border border-[var(--line)] hover:border-[var(--accent)] hover:bg-[var(--surface-2)] transition-all duration-300"
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--surface-2)] border border-[var(--line)]">
                        <Icon size={16} className="text-[var(--accent)]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium font-display">{label}</div>
                        <div className="text-xs text-[var(--mute)] mt-0.5">{sub}</div>
                      </div>
                      <ExternalLink size={12} className="text-[var(--mute)]" />
                    </a>
                  </div>
                ))}
                
                {/* Download Resume Button after LeetCode */}
                <div data-stagger-item style={{ opacity: 0 }}>
                  <a
                    href="/Resume.pdf"
                    download="Khushi_Chauhan_Resume.pdf"
                    className="flex items-center gap-3 p-2 rounded-xl border border-[var(--line)] hover:border-[var(--accent)] hover:bg-[var(--surface-2)] transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--surface-2)] border border-[var(--line)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium font-display">Resume</div>
                      <div className="text-xs text-[var(--mute)] mt-0.5">Download PDF</div>
                    </div>
                  </a>
                </div>
              </StaggerReveal>
            </div>

            {/* Right side: Contact form */}
            <div>
              <h3 className="text-xl font-display font-semibold mb-4">Send a message</h3>
              
              <Reveal delay={0.1}>
                <StaggerReveal
                  selector="[data-stagger-item]"
                  staggerDelay={0.1}
                  duration={0.6}
                  as="form"
                  className="space-y-2"
                >
                  <div data-stagger-item style={{ opacity: 0 }}>
                    <label htmlFor="name" className="text-xs uppercase tracking-wider text-[var(--mute)] block mb-1">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className="w-full bg-[var(--surface-2)] border border-[var(--line)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div data-stagger-item style={{ opacity: 0 }}>
                    <label htmlFor="email" className="text-xs uppercase tracking-wider text-[var(--mute)] block mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="w-full bg-[var(--surface-2)] border border-[var(--line)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                  
                  <div data-stagger-item style={{ opacity: 0 }}>
                    <label htmlFor="message" className="text-xs uppercase tracking-wider text-[var(--mute)] block mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-[var(--surface-2)] border border-[var(--line)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors resize-none"
                      placeholder="Let's build something..."
                    />
                  </div>

                  <div data-stagger-item style={{ opacity: 0 }}>
                    <Button 
                      type="submit" 
                      variant="solid" 
                      size="lg" 
                      disabled={status === "loading"} 
                      className="w-full mt-1" 
                      onClick={handleSubmit}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={16} className="animate-spin mr-2" /> Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </div>

                  {status === "success" && (
                    <p className="flex items-center gap-2 text-sm text-[var(--accent)]">
                      <CheckCircle2 size={16} /> Thanks! Your message has been sent.
                    </p>
                  )}
                  
                  {status === "error" && (
                    <p className="flex items-center gap-2 text-sm text-red-400">
                      <XCircle size={16} /> {errorMsg}
                    </p>
                  )}
                </StaggerReveal>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
