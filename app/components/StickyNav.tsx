"use client";

import { useEffect, useState } from "react";
import { NAV_SECTIONS } from "../lib/content";

export function StickyNav() {
  const [activeId, setActiveId] = useState<string>(NAV_SECTIONS[0].id);

  useEffect(() => {
    const sections = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when a section's heading reaches the upper third.
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-0 z-40 border-b border-line bg-cream/85 backdrop-blur-md"
    >
      <div className="mx-auto max-w-5xl px-3 sm:px-6">
        <ul className="flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_SECTIONS.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`block whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-navy text-cream"
                      : "text-muted hover:bg-bg-blue hover:text-navy"
                  }`}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
