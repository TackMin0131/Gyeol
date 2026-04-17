"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  /** HTML string (word-by-word reveal) — use either this or children */
  html?: string;
  /** Delay between each word in ms */
  staggerMs?: number;
  /** rootMargin threshold for trigger */
  rootMargin?: string;
  /** Extra className for the wrapping block */
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Word-by-word scroll reveal, inspired by react-bits ScrollReveal-JS-CSS.
 * Splits text into <span> words and fades/rises them in as the block
 * enters the viewport. Safe for HTML — wraps only text nodes.
 */
export default function ScrollReveal({ children = null, html, staggerMs = 40, rootMargin = "-10% 0px -10% 0px", className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { rootMargin, threshold: 0 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [rootMargin]);

  // Split HTML string into word spans while preserving inline tags (<br>, <em>, <span>).
  // We split ONLY text nodes so that <br> breaks and span styles survive.
  useEffect(() => {
    if (!html || !ref.current) return;
    const el = ref.current;
    // Render once, then walk text nodes
    el.innerHTML = html;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    let n = walker.nextNode();
    while (n) {
      if (n.nodeValue && n.nodeValue.trim()) textNodes.push(n as Text);
      n = walker.nextNode();
    }
    let wordIndex = 0;
    textNodes.forEach((tn) => {
      const parent = tn.parentNode!;
      const parts = (tn.nodeValue || "").split(/(\s+)/);
      const frag = document.createDocumentFragment();
      parts.forEach((p) => {
        if (!p) return;
        if (/^\s+$/.test(p)) {
          frag.appendChild(document.createTextNode(p));
        } else {
          const span = document.createElement("span");
          span.textContent = p;
          span.className = "sr-word";
          span.style.setProperty("--sr-i", String(wordIndex++));
          frag.appendChild(span);
        }
      });
      parent.replaceChild(frag, tn);
    });
  }, [html]);

  return (
    <>
      <style jsx global>{`
        .sr-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(14px);
          filter: blur(6px);
          transition: opacity 0.7s cubic-bezier(0.2, 0.7, 0.2, 1),
            transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1),
            filter 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
          transition-delay: calc(var(--sr-i) * ${staggerMs}ms);
        }
        .sr-active .sr-word {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      `}</style>
      <div
        ref={ref}
        className={`${active ? "sr-active" : ""} ${className ?? ""}`.trim()}
        style={style}
      >
        {children}
      </div>
    </>
  );
}
