"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export function RevealProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const initRevealObserver = useCallback(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const elements = document.querySelectorAll(
      "[data-reveal], [data-reveal-stagger]"
    );

    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => {
      el.classList.remove("revealed");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cleanup = initRevealObserver();
    return cleanup;
  }, [pathname, initRevealObserver]);

  return <>{children}</>;
}
