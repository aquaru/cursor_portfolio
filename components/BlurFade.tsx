"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface BlurFadeProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export function BlurFade({
  children,
  delay = 0,
  duration = 0.65,
  yOffset = 18,
  className,
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: yOffset, filter: "blur(10px)" });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration,
            delay,
            ease: "power3.out",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, duration, yOffset]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
