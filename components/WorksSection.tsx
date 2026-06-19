import Link from "next/link";
import { BlurFade } from "@/components/BlurFade";
import { MagicCard } from "@/components/MagicCard";
import { WorkThumb } from "@/components/WorkThumb";
import { works } from "@/lib/works";

export function WorksSection() {
  return (
    <section className="border-t border-border px-6 py-14 sm:px-10">
      <BlurFade delay={0}>
        <p className="mb-10 text-xs font-semibold tracking-[0.3em] uppercase text-primary">
          Works
        </p>
      </BlurFade>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work, i) => (
          <BlurFade key={work.slug} delay={0.1 + i * 0.1}>
            <Link href={`/works/${work.slug}`} className="block h-full">
              <MagicCard
                className="h-full transition-transform duration-300 hover:-translate-y-1"
                gradientSize={260}
                gradientOpacity={0.2}
              >
                <article className="flex h-full flex-col">
                  <WorkThumb
                    title={work.title}
                    thumbnail={work.thumbnail}
                    slug={work.slug}
                    className="rounded-t-2xl"
                  />
                  <div className="flex flex-1 flex-col gap-2 px-5 py-5">
                    <h3 className="text-base font-semibold tracking-tight">
                      {work.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {work.summary}
                    </p>
                  </div>
                </article>
              </MagicCard>
            </Link>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
