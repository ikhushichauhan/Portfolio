import React, { useEffect, useState, useCallback } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const SECTIONS = ["home", "about", "projects", "experience", "certifications", "contact"];

export function Navbar({ dark, setDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        let current = "home";
        for (const id of SECTIONS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id;
        }
        setActive(current);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-colors duration-300 border-b border-[var(--line)] ${
        scrolled ? "bg-[var(--bg)]/80" : "bg-[var(--bg)]/40"
      }`}
    >
      <div className="max-w-8xl mx-auto flex items-center justify-between px-3 md:px-4 py-4">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-3 group">
          <img
            src={dark ? "/logo-white.png" : "/logo-black.png"}
            alt="Khushi Chauhan logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-[15px] tracking-wide font-display text-[var(--ink)]">
             <span className="text-[var(--accent)]"></span> 
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-9 text-[13px] uppercase tracking-wider text-[var(--mute)]">
          {SECTIONS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`nav-link ${active === id ? "active text-[var(--ink)]" : ""}`}
            >
              {id}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark((d) => !d)}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--line)]"
            aria-label="Toggle theme"
            type="button"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border border-[var(--line)]"
            onClick={() => setMenuOpen((m) => !m)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            type="button"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col px-6 pb-4 gap-3 border-t border-[var(--line)]">
          {SECTIONS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left text-sm uppercase tracking-wider py-1 text-[var(--mute)]"
            >
              {id}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
