"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useSettings } from "@/contexts/settingsContext";
import type { Mode } from "@/contexts/settingsContext";
import {
  ThemeToggleButton,
  useThemeTransition,
} from "@/components/ui/shadcn-io/theme-toggle-button";

export function AnimatedThemeToggle() {
  const { setTheme } = useTheme();
  const { settings, updateSettings } = useSettings();
  const { startTransition } = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = useCallback(() => {
    const newMode: Mode = settings.mode === "dark" ? "light" : "dark";

    startTransition(() => {
      const updatedSettings = {
        ...settings,
        mode: newMode,
        theme: {
          ...settings.theme,
          styles: {
            light: settings.theme.styles?.light || {},
            dark: settings.theme.styles?.dark || {},
          },
        },
      };
      updateSettings(updatedSettings);
      setTheme(newMode);
    });
  }, [settings, updateSettings, setTheme, startTransition]);

  const currentTheme =
    settings.mode === "system" ? "light" : (settings.mode as "light" | "dark");

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed right-4 top-4 z-50">
      <ThemeToggleButton
        theme={currentTheme}
        onClick={handleThemeToggle}
        variant="circle"
        start="top-right"
        className="rounded-full"
      />
    </div>
  );
}

export default AnimatedThemeToggle;
