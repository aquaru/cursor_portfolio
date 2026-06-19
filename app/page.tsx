import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { BlurFade } from "@/components/BlurFade";
import { MagicCard } from "@/components/MagicCard";
import { WorksSection } from "@/components/WorksSection";
import { ContactSection } from "@/components/ContactSection";

const navItems = ["Home", "About", "Skills", "Portfolio", "Contact"];

const career = [
  { period: "2020 – 2022", title: "차세대 폼팩터 선행 UX" },
  { period: "2023 – 2026", title: "Pen & Notes Apps VI" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col overflow-hidden rounded-3xl bg-card shadow-xl shadow-primary/5">
        {/* Nav */}
        <header className="flex items-center justify-between px-6 py-6 sm:px-10">
          <Link
            href="/brand-kit"
            className="flex items-center gap-1.5 rounded-xl border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="13.5" cy="6.5" r="2.5"/>
              <circle cx="19" cy="13" r="2.5"/>
              <circle cx="6.5" cy="13" r="2.5"/>
              <circle cx="13.5" cy="19.5" r="2.5"/>
              <path d="m15.5 8.5 2 3"/>
              <path d="m9 13 3 5.5"/>
              <path d="m9 13-2-3"/>
            </svg>
            Brand Kit
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item, i) => (
              <a
                key={item}
                href={item === "Contact" ? "mailto:aquau.cris@gmail.com" : "#"}
                className={`text-sm transition-colors hover:text-primary ${
                  i === 0 ? "font-medium text-primary" : "text-muted-foreground"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </header>

        {/* Hero */}
        <HeroSection />

        {/* About */}
        <section className="border-t border-border px-6 py-14 sm:px-10">
          <BlurFade delay={0}>
            <p className="mb-10 text-xs font-semibold tracking-[0.3em] uppercase text-primary">
              About
            </p>
          </BlurFade>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <BlurFade delay={0.12}>
              <p className="text-xl font-light leading-relaxed text-secondary-foreground">
                Pen &amp; Notes 관련 Motion 및 Interaction 디자인을 담당하고
                있습니다.
              </p>
            </BlurFade>
            <ul className="space-y-4">
              {career.map((c, i) => (
                <BlurFade key={c.period} delay={0.22 + i * 0.12}>
                  <MagicCard gradientSize={240} gradientOpacity={0.22}>
                    <li className="flex items-baseline gap-4 px-5 py-4">
                      <span className="shrink-0 text-sm font-semibold text-primary">
                        {c.period}
                      </span>
                      <span className="text-sm font-medium">{c.title}</span>
                    </li>
                  </MagicCard>
                </BlurFade>
              ))}
            </ul>
          </div>
        </section>

        {/* Works */}
        <WorksSection />

        {/* Contact */}
        <ContactSection />

        {/* Scroll hint */}
        <BlurFade delay={0.1} className="flex items-center justify-center gap-2 pb-8 text-xs text-muted-foreground">
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
            <rect x="6" y="3" width="12" height="18" rx="6" />
            <path d="M12 7v3" />
          </svg>
          Scroll down
        </BlurFade>
      </div>
    </div>
  );
}
