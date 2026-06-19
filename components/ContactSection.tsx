import { BlurFade } from "@/components/BlurFade";
import { TallyEmbed } from "@/components/TallyEmbed";

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-border px-6 py-14 sm:px-10">
      <BlurFade delay={0}>
        <p className="mb-4 text-xs font-semibold tracking-[0.3em] uppercase text-primary">
          Contact
        </p>
      </BlurFade>

      <BlurFade delay={0.1}>
        <h2 className="mb-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          함께 만들 프로젝트
        </h2>
      </BlurFade>

      <BlurFade delay={0.18}>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-muted-foreground font-[var(--font-noto-kr)]">
          브랜드, 제품, 인터페이스, 콘텐츠를 함께 만들고 싶다면 간단히 남겨주세요.
        </p>
      </BlurFade>

      <BlurFade delay={0.26}>
        <TallyEmbed formId="vGgPDv" />
      </BlurFade>
    </section>
  );
}
