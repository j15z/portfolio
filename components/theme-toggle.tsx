"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyThemeClass(isDark: boolean) {
  const root = document.documentElement;
  if (isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Initialize theme from localStorage or system preference
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const initialDark = stored ? stored === "dark" : getSystemPrefersDark();
    setIsDark(initialDark);
    applyThemeClass(initialDark);

    // Sync changes if system preference changes and user hasn't chosen
    if (!stored && typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        setIsDark(e.matches);
        applyThemeClass(e.matches);
      };
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  const toggle = React.useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      applyThemeClass(next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {}
      return next;
    });
  }, []);

  return (
    <div className="fixed right-4 top-4 z-50">
      <Button
        size="icon"
        variant="ghost"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={toggle}
        className="rounded-full"
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </div>
  );
}

export default ThemeToggle;
