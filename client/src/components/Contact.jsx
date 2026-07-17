import React, { useState } from "react";
import { Mail, Linkedin, Github, ExternalLink, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Reveal, StaggerReveal } from "./Reveal";
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
    <section id="contact" className="px-6 md:px-10 py-16 border-t border-[var(--line)]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl mb-4">Caught a spark?</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl md:text-6xl mb-16 text-[var(--mute)]">Your move.</h2>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12">
          {/* social links — staggered card reveal */}
          <StaggerReveal
            selector="[data-stagger-item]"
            staggerDelay={0.12}
            duration={0.7}
            className="grid sm:grid-cols-1 gap-4"
          >
            {[
              { icon: Mail, label: "Email", sub: "khushichauhan9850@gmail.com", href: socials.email },
              { icon: Linkedin, label: "LinkedIn", sub: "khushi-chauhan09", href: socials.linkedin },
              { icon: Github, label: "GitHub", sub: "ikhushichauhan", href: socials.github },
            ].map(({ icon: Icon, label, sub, href }) => (
              <div key={label} data-stagger-item style={{ opacity: 0 }}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover-card flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="text-[var(--accent)]" />
                    <div>
                      <div className="text-base font-medium font-display">{label}</div>
                      <div className="text-xs text-[var(--mute)]">{sub}</div>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-[var(--mute)]" />
                </a>
              </div>
            ))}
          </StaggerReveal>

          {/* contact form — staggered field reveal inside a Reveal wrapper */}
          <Reveal delay={0.1}>
            <StaggerReveal
              selector="[data-stagger-item]"
              staggerDelay={0.1}
              duration={0.6}
              as="form"
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8 flex flex-col gap-4"
            >
              <div data-stagger-item style={{ opacity: 0 }}>
                <label htmlFor="name" className="text-xs uppercase tracking-wider text-[var(--mute)]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  className="mt-2 w-full bg-[var(--surface-2)] border border-[var(--line)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div data-stagger-item style={{ opacity: 0 }}>
                <label htmlFor="email" className="text-xs uppercase tracking-wider text-[var(--mute)]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="mt-2 w-full bg-[var(--surface-2)] border border-[var(--line)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div data-stagger-item style={{ opacity: 0 }}>
                <label htmlFor="message" className="text-xs uppercase tracking-wider text-[var(--mute)]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="mt-2 w-full bg-[var(--surface-2)] border border-[var(--line)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  placeholder="Let's build something..."
                />
              </div>

              <div data-stagger-item style={{ opacity: 0 }}>
                <Button type="submit" variant="solid" size="lg" disabled={status === "loading"} className="mt-2" onClick={handleSubmit}>
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending...
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
              <p className="text-[11px] text-[var(--mute)]">
                Submissions are saved to MongoDB via the Express API in <code>/server</code>.
              </p>
            </StaggerReveal>
          </Reveal>
        </div>


      </div>
    </section>
  );
}
