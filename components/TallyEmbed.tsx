"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

interface TallyEmbedProps {
  formId: string;
}

export function TallyEmbed({ formId }: TallyEmbedProps) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (
        typeof e.data === "object" &&
        e.data !== null &&
        e.data.isTally === true &&
        e.data.event === "form_submit"
      ) {
        setSubmitted(true);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (submitted) {
    return (
      <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-muted/30 px-6 py-14 text-center sm:min-h-[380px]">
        <CheckCircle className="h-8 w-8 text-primary" strokeWidth={1.5} />
        <p className="text-sm leading-relaxed text-secondary-foreground font-[var(--font-noto-kr)]">
          문의가 접수됐어요. 확인 후 답장드릴게요.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl">
      <iframe
        src={`https://tally.so/embed/${formId}?transparentBackground=1&hideTitle=1`}
        width="100%"
        height="600"
        frameBorder={0}
        title="문의 폼"
        allowFullScreen
        allow="camera; microphone; autoplay; clipboard-write;"
        className="block w-full"
      />
    </div>
  );
}
