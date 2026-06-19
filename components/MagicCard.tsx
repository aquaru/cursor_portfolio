"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  gradientColor?: string;
  gradientSize?: number;
  gradientOpacity?: number;
}

export function MagicCard({
  children,
  className,
  gradientColor = "167,139,250",
  gradientSize = 280,
  gradientOpacity = 0.18,
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const gradient = gradientRef.current;
    if (!card || !gradient) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gradient.style.background = `radial-gradient(${gradientSize}px circle at ${x}px ${y}px, rgba(${gradientColor},${gradientOpacity}), transparent 70%)`;
  }, [gradientColor, gradientSize, gradientOpacity]);

  const handleMouseLeave = useCallback(() => {
    const gradient = gradientRef.current;
    if (!gradient) return;
    gradient.style.background = "transparent";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30",
        className
      )}
    >
      {/* Spotlight gradient layer */}
      <div
        ref={gradientRef}
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
