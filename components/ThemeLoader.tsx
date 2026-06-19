"use client";

import { useEffect } from "react";

const STORAGE_KEY = "brand-kit-config";

export function ThemeLoader() {
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const c = JSON.parse(stored);
      const root = document.documentElement;
      const pairs: [string, string | undefined][] = [
        ["--primary", c.primary],
        ["--ring", c.primary],
        ["--primary-foreground", c.primaryForeground],
        ["--background", c.background],
        ["--card", c.card],
        ["--popover", c.card],
        ["--foreground", c.foreground],
        ["--card-foreground", c.foreground],
        ["--popover-foreground", c.foreground],
        ["--accent", c.accent],
        ["--accent-foreground", c.foreground],
        ["--muted", c.muted],
        ["--muted-foreground", c.mutedForeground],
        ["--secondary", c.muted],
        ["--secondary-foreground", c.foreground],
        ["--border", c.border],
        ["--input", c.border],
      ];
      pairs.forEach(([prop, val]) => {
        if (val) root.style.setProperty(prop, val);
      });
      if (c.radius) {
        root.style.setProperty("--radius", `${c.radius / 16}rem`);
      }
    } catch {}
  }, []);
  return null;
}
