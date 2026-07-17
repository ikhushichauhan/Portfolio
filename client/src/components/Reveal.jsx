import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export function useReveal() {
  const ref = useRef(null);
  const shownRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.willChange = "transform, opacity";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
            onEnter: () => {
              shownRef.current = true;
            },
          },
        }
      );
    }, el);

    return () => {
      el.style.willChange = "auto";
      ctx.revert();
    };
  }, []);

  return [ref, shownRef.current];
}


/**
 * Reveal — animates children in on scroll (both directions).
 * Uses manual ScrollTrigger callbacks so it reverses cleanly
 * when scrolling back up.
 */
export function Reveal({ children, delay = 0, y = 50, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.willChange = "transform, opacity";

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y });

      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        end: "bottom 8%",
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            delay,
            ease: "power2.out",
            overwrite: true,
          });
        },
        onLeave: () => {
          gsap.to(el, {
            opacity: 0,
            y: -y * 0.4,
            duration: 0.35,
            ease: "power2.in",
            overwrite: true,
          });
        },
        onEnterBack: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            delay,
            ease: "power2.out",
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          gsap.to(el, {
            opacity: 0,
            y,
            duration: 0.35,
            ease: "power2.in",
            overwrite: true,
          });
        },
      });
    }, el);

    return () => {
      el.style.willChange = "auto";
      ctx.revert();
    };
  }, [delay, y]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}


/**
 * SplitTextReveal — Uses SplitType to split text into words,
 * then each word fades in + moves up with a stagger on scroll.
 * Reverses naturally when scrolling back up.
 *
 * Place this around any heading or paragraph for a premium
 * word-by-word cascade reveal.
 */
export function SplitTextReveal({
  children,
  className = "",
  as: Tag = "div",
  stagger = 0.03,
  y = 30,
  duration = 0.6,
  delay = 0,
  start = "top 88%",
  end = "bottom 8%",
}) {
  const ref = useRef(null);
  const splitRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // SplitType splits the text content into word spans
    const split = new SplitType(el, { types: "words" });
    splitRef.current = split;

    const words = split.words;
    if (!words || !words.length) return;

    // Set initial styles
    words.forEach((w) => {
      w.style.willChange = "transform, opacity";
      w.style.display = "inline-block";
    });

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0, y });

      ScrollTrigger.create({
        trigger: el,
        start,
        end,
        onEnter: () => {
          gsap.to(words, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            delay,
            ease: "power3.out",
            overwrite: true,
          });
        },
        onLeave: () => {
          gsap.to(words, {
            opacity: 0,
            y: -y * 0.6,
            duration: duration * 0.5,
            stagger: stagger * 0.4,
            ease: "power2.in",
            overwrite: true,
          });
        },
        onEnterBack: () => {
          gsap.to(words, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            delay,
            ease: "power3.out",
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          gsap.to(words, {
            opacity: 0,
            y,
            duration: duration * 0.5,
            stagger: stagger * 0.4,
            ease: "power2.in",
            overwrite: true,
          });
        },
      });
    }, el);

    return () => {
      words.forEach((w) => {
        w.style.willChange = "auto";
      });
      ctx.revert();
      split.revert();
    };
  }, [stagger, y, duration, delay, start, end]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}


/**
 * WordReveal — splits text children into individual words and
 * staggers their appearance for a premium sequential feel.
 * Works on both scroll-down (enter) and scroll-up (re-enter).
 * Each word appears with its own timing for a line-by-line, word-by-word cascade.
 */
export function WordReveal({ children, baseDelay = 0, stagger = 0.04, y = 20, className = "", as: Tag = "div" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll(".word-reveal-token");
    if (!words.length) return;

    words.forEach((w) => {
      w.style.willChange = "transform, opacity";
    });

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0, y });

      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        end: "bottom 10%",
        onEnter: () => {
          gsap.to(words, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger,
            delay: baseDelay,
            ease: "power2.out",
            overwrite: true,
          });
        },
        onLeave: () => {
          gsap.to(words, {
            opacity: 0,
            y: -y,
            duration: 0.3,
            stagger: stagger * 0.5,
            ease: "power2.in",
            overwrite: true,
          });
        },
        onEnterBack: () => {
          gsap.to(words, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger,
            delay: baseDelay,
            ease: "power2.out",
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          gsap.to(words, {
            opacity: 0,
            y,
            duration: 0.3,
            stagger: stagger * 0.5,
            ease: "power2.in",
            overwrite: true,
          });
        },
      });
    }, el);

    return () => {
      words.forEach((w) => {
        w.style.willChange = "auto";
      });
      ctx.revert();
    };
  }, [baseDelay, stagger, y]);

  // Split text children into word spans
  const wrapWords = (content) => {
    if (typeof content === "string") {
      return content.split(/(\s+)/).map((word, i) =>
        word.match(/^\s+$/) ? (
          word
        ) : (
          <span key={i} className="word-reveal-token" style={{ display: "inline-block", opacity: 0 }}>
            {word}
          </span>
        )
      );
    }
    // If it's a React element, try to process its children
    if (React.isValidElement(content)) {
      return React.cloneElement(content, {
        ...content.props,
        children: wrapWords(content.props.children),
      });
    }
    // If it's an array, process each child
    if (Array.isArray(content)) {
      return content.map((child, i) => (
        <React.Fragment key={i}>{wrapWords(child)}</React.Fragment>
      ));
    }
    return content;
  };

  return (
    <Tag ref={ref} className={className}>
      {wrapWords(children)}
    </Tag>
  );
}


/**
 * StaggerReveal — basic stagger for grouped items like contact cards.
 * For Projects/Experience, use the dedicated StackedCards component instead.
 */
export function StaggerReveal({
  children,
  selector = "[data-stagger-item]",
  staggerDelay = 0.15,
  duration = 0.8,
  y = 60,
  scaleFrom = 0.85,
  start = "top 85%",
  className = "",
  as: Tag = "div",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = Array.from(el.querySelectorAll(selector));
    if (!items.length) return;

    items.forEach((item) => {
      item.style.willChange = "transform, opacity";
    });

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, scale: scaleFrom, y });

      ScrollTrigger.create({
        trigger: el,
        start,
        end: "bottom 8%",
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration,
            stagger: staggerDelay,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            overwrite: true,
          });
        },
        onLeave: () => {
          gsap.to(items, {
            opacity: 0,
            scale: scaleFrom,
            y: -y * 0.4,
            duration: duration * 0.5,
            stagger: staggerDelay * 0.3,
            ease: "power2.in",
            overwrite: true,
          });
        },
        onEnterBack: () => {
          gsap.to(items, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration,
            stagger: staggerDelay,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          gsap.to(items, {
            opacity: 0,
            scale: scaleFrom,
            y,
            duration: duration * 0.5,
            stagger: staggerDelay * 0.3,
            ease: "power2.in",
            overwrite: true,
          });
        },
      });
    }, el);

    return () => {
      items.forEach((item) => {
        item.style.willChange = "auto";
      });
      ctx.revert();
    };
  }, [selector, staggerDelay, duration, y, scaleFrom, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}


/**
 * StackedCardScroll — Each card gets its OWN ScrollTrigger.
 * As you scroll, each card rises from 200px below with full stagger.
 * When the next card enters, the previous card scales down slightly
 * and moves upward — creating the stacked-card scroll effect.
 *
 * Each card animates individually so it reverses perfectly on scroll-up.
 */
export function StackedCardScroll({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll("[data-stack-card]"));
    if (!cards.length) return;

    cards.forEach((card) => {
      card.style.willChange = "transform, opacity";
    });

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        // Initial state: far below (200px), slightly scaled down, invisible
        gsap.set(card, { opacity: 0, y: 200, scale: 0.9 });

        // Each card has its own ScrollTrigger
        ScrollTrigger.create({
          trigger: card,
          start: "top 90%",
          end: "top 15%",
          onEnter: () => {
            // Animate this card in — strong rise from below
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              overwrite: true,
            });
            // Scale down previous card and move it upward for stacking effect
            if (i > 0 && cards[i - 1]) {
              gsap.to(cards[i - 1], {
                scale: 0.92,
                y: -40,
                duration: 0.9,
                ease: "power2.out",
                overwrite: true,
              });
            }
          },
          onLeaveBack: () => {
            // Card goes back to hidden (scroll back up)
            gsap.to(card, {
              opacity: 0,
              y: 200,
              scale: 0.9,
              duration: 0.8,
              ease: "power2.in",
              overwrite: true,
            });
            // Restore previous card to full size
            if (i > 0 && cards[i - 1]) {
              gsap.to(cards[i - 1], {
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                overwrite: true,
              });
            }
          },
          onLeave: () => {
            // Keep card visible but scale it down and move up when it leaves top
            gsap.to(card, {
              scale: 0.88,
              y: -50,
              duration: 0.7,
              ease: "power2.in",
              overwrite: true,
            });
          },
          onEnterBack: () => {
            // When scrolling back into view from above
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              overwrite: true,
            });
            // Re-scale-down the next card if it exists
            if (i < cards.length - 1 && cards[i + 1]) {
              gsap.to(cards[i + 1], {
                opacity: 0,
                y: 200,
                scale: 0.9,
                duration: 0.7,
                ease: "power2.in",
                overwrite: true,
              });
            }
          },
        });
      });
    }, el);

    return () => {
      cards.forEach((card) => {
        card.style.willChange = "auto";
      });
      ctx.revert();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
