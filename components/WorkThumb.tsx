import Image from "next/image";
import { cn } from "@/lib/utils";

const PLACEHOLDER_GRADIENTS = [
  "from-violet-300/80 via-purple-200/60 to-fuchsia-100/40",
  "from-purple-400/70 via-violet-300/50 to-indigo-200/40",
  "from-fuchsia-300/75 via-violet-200/55 to-purple-100/35",
] as const;

interface WorkThumbProps {
  title: string;
  thumbnail?: string;
  slug: string;
  className?: string;
  aspectClassName?: string;
  priority?: boolean;
}

export function WorkThumb({
  title,
  thumbnail,
  slug,
  className,
  aspectClassName = "aspect-[4/3]",
  priority = false,
}: WorkThumbProps) {
  const gradientIndex =
    slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    PLACEHOLDER_GRADIENTS.length;

  if (thumbnail) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-secondary",
          aspectClassName,
          className
        )}
      >
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        PLACEHOLDER_GRADIENTS[gradientIndex],
        aspectClassName,
        className
      )}
      aria-hidden="true"
    />
  );
}
