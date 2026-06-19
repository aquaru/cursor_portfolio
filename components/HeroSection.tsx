"use client";

import Image from "next/image";
import { BlurFade } from "@/components/BlurFade";
import { MeshBackground } from "@/components/MeshBackground";

export function HeroSection() {
  return (
    <section className="relative grid flex-1 items-center gap-12 overflow-hidden px-6 py-12 sm:px-10 lg:grid-cols-2 lg:gap-8 lg:py-20">
      <MeshBackground />

      {/* Left: text + socials */}
      <div className="relative z-10 flex gap-6 sm:gap-8">
        <BlurFade delay={0.1} className="flex flex-col items-center gap-5 pt-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {s.icon}
            </a>
          ))}
        </BlurFade>

        <div className="flex flex-col">
          <BlurFade delay={0.2}>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              안녕하세요,
              <br />
              박경태입니다
            </h1>
          </BlurFade>
          <BlurFade delay={0.35}>
            <p className="mt-4 text-lg font-medium text-secondary-foreground">
              삼성전자 MX사업부 UX팀 디자이너
            </p>
          </BlurFade>
          <BlurFade delay={0.45}>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              Pen &amp; Notes 관련 Motion 및 Interaction 디자인을 담당하고
              있습니다.
            </p>
          </BlurFade>
          <BlurFade delay={0.55}>
            <a
              href="mailto:aquau.cris@gmail.com"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
            >
              Contact Me
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </a>
          </BlurFade>
        </div>
      </div>

      {/* Right: avatar */}
      <BlurFade
        delay={0.4}
        className="relative z-10 flex justify-center lg:justify-end"
      >
        <div className="relative aspect-square w-full max-w-md">
          <Image
            src="/hero-avatar.png"
            alt="박경태 캐릭터 아바타"
            fill
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>
      </BlurFade>
    </section>
  );
}

const socials = [
  {
    label: "Email",
    href: "mailto:aquau.cris@gmail.com",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
      </svg>
    ),
  },
];
