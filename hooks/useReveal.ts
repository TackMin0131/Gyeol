"use client";
import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -30px 0px" }
    );
    el.querySelectorAll(".reveal").forEach((child) => obs.observe(child));
    if (el.classList.contains("reveal")) obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}
