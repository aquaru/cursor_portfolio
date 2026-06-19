"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MeshBackgroundProps {
  className?: string;
}

export function MeshBackground({ className }: MeshBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const blob4Ref = useRef<HTMLDivElement>(null);
  const blob5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetX = 0;
    let targetY = 0;
    let smoothX = 0;
    let smoothY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const tick = () => {
      const t = performance.now() * 0.001;

      smoothX += (targetX - smoothX) * 0.04;
      smoothY += (targetY - smoothY) * 0.04;

      const mx = smoothX;
      const my = smoothY;

      gsap.set(blob1Ref.current, {
        x: Math.sin(t * 2.1) * 140 + mx * 190,
        y: Math.cos(t * 1.65) * 100 + my * 140,
        scale: 1 + Math.sin(t * 2.4) * 0.14,
      });
      gsap.set(blob2Ref.current, {
        x: Math.cos(t * 1.65) * 120 - mx * 160,
        y: Math.sin(t * 2.16) * 110 - my * 120,
        scale: 1 + Math.cos(t * 1.86) * 0.16,
      });
      gsap.set(blob3Ref.current, {
        x: Math.sin(t * 2.55 + 1.0) * 110 + mx * 220,
        y: Math.cos(t * 1.95 + 2.0) * 130 - my * 170,
        scale: 1 + Math.sin(t * 2.7) * 0.12,
      });
      gsap.set(blob4Ref.current, {
        x: Math.cos(t * 1.44 + 0.5) * 100 - mx * 110,
        y: Math.sin(t * 2.28 + 1.0) * 140 + my * 150,
        scale: 1 + Math.cos(t * 1.5) * 0.14,
      });
      gsap.set(blob5Ref.current, {
        x: Math.sin(t * 1.86 + 2.0) * 130 + mx * 130,
        y: Math.cos(t * 2.64 + 0.5) * 90 + my * 110,
        scale: 1 + Math.sin(t * 2.1 + 1.0) * 0.13,
      });
    };

    gsap.ticker.add(tick);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[#f5f0ff]" />
      <div
        ref={blob1Ref}
        className="absolute -top-1/4 -left-1/4 h-[90%] w-[80%] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(167,139,250,0.85) 0%, rgba(196,181,253,0.4) 45%, transparent 70%)",
          filter: "blur(45px)",
        }}
      />
      <div
        ref={blob2Ref}
        className="absolute -bottom-1/4 -right-1/4 h-[80%] w-[75%] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, rgba(109,40,217,0.65) 0%, rgba(139,92,246,0.35) 50%, transparent 70%)",
          filter: "blur(55px)",
        }}
      />
      <div
        ref={blob3Ref}
        className="absolute top-1/4 left-1/3 h-[65%] w-[60%] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(192,132,252,0.7) 0%, rgba(216,180,254,0.3) 55%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        ref={blob4Ref}
        className="absolute -top-1/3 right-0 h-[70%] w-[65%] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(233,213,255,0.9) 0%, rgba(245,243,255,0.5) 50%, transparent 70%)",
          filter: "blur(35px)",
        }}
      />
      <div
        ref={blob5Ref}
        className="absolute -bottom-1/3 left-0 h-[60%] w-[55%] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(147,51,234,0.5) 0%, rgba(167,139,250,0.2) 55%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div className="absolute inset-0 bg-white/20" />
    </div>
  );
}
