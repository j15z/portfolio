"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(
    sectionIds[0] || ""
  );

  useEffect(() => {
    const handleScroll = () => {
      // Check if we're on mobile (screen width < 768px)
      const isMobile = window.innerWidth < 768;
      const mobileNavbarHeight = 64; // Height of mobile navbar
      const baseOffset = 100; // Base offset to trigger before section is fully in view
      const scrollPosition =
        window.scrollY +
        (isMobile ? mobileNavbarHeight + baseOffset : baseOffset);

      // Find the section that's currently in view
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    // Set initial active section
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionIds]);

  return activeSection;
}
