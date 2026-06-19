import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { BlurFade } from "@/components/BlurFade";
import { MeshBackground } from "@/components/MeshBackground";
import { WorkThumb } from "@/components/WorkThumb";
import { Button } from "@/components/ui/button";
import { getWork, works } from "@/lib/works";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);

  if (!work) {
    return { title: "작업물을 찾을 수 없습니다 — 박경태" };
  }

  return {
    title: `${work.title} — 박경태`,
    description: work.summary,
  };
}

function LinkIcon() {
  return <ExternalLink className="size-4" aria-hidden="true" />;
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = getWork(slug);

  if (!work) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background p-4 sm:p-6 lg:p-8">
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col overflow-hidden rounded-3xl bg-card shadow-xl shadow-primary/5">
        <MeshBackground />

        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14">
          <BlurFade delay={0}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              모든 작업물 보기
            </Link>
          </BlurFade>

          <BlurFade delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border/60">
              <WorkThumb
                title={work.title}
                thumbnail={work.detailImage ?? work.thumbnail}
                slug={work.slug}
                aspectClassName="aspect-video"
                priority
              />
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
              {work.title}
            </h1>
          </BlurFade>

          <BlurFade delay={0.3}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {work.description}
            </p>
          </BlurFade>

          {work.links.length > 0 && (
            <BlurFade delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-3">
                {work.links.map((link) => (
                  <Button key={link.href} asChild variant="outline">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkIcon />
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </BlurFade>
          )}
        </div>
      </div>
    </div>
  );
}
