"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Save, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "brand-kit-config";

interface BrandConfig {
  primary: string;
  primaryForeground: string;
  accent: string;
  background: string;
  card: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  radius: number;
}

interface Preset extends BrandConfig {
  name: string;
  label: string;
  dot: string;
}

const DEFAULTS: BrandConfig = {
  primary: "#6040d8",
  primaryForeground: "#ffffff",
  accent: "#f0ecff",
  background: "#e4dff5",
  card: "#ffffff",
  foreground: "#1e1a35",
  muted: "#f4f2fc",
  mutedForeground: "#7060a0",
  border: "#ddd8f0",
  radius: 10,
};

const PRESETS: Preset[] = [
  {
    name: "violet",
    label: "Violet",
    dot: "#6040d8",
    ...DEFAULTS,
  },
  {
    name: "sand",
    label: "Sand",
    dot: "#a87340",
    primary: "#a87340",
    primaryForeground: "#ffffff",
    accent: "#efe4d0",
    background: "#f5ede0",
    card: "#fdf8f2",
    foreground: "#2d2010",
    muted: "#f0e4d0",
    mutedForeground: "#9d7950",
    border: "#e8dcc8",
    radius: 12,
  },
  {
    name: "midnight",
    label: "Midnight",
    dot: "#5b8dee",
    primary: "#5b8dee",
    primaryForeground: "#ffffff",
    accent: "#1a2240",
    background: "#0d1120",
    card: "#141929",
    foreground: "#dce6f5",
    muted: "#1a2035",
    mutedForeground: "#7a90b8",
    border: "#202840",
    radius: 8,
  },
  {
    name: "sage",
    label: "Sage",
    dot: "#3d8c6a",
    primary: "#3d8c6a",
    primaryForeground: "#ffffff",
    accent: "#cce8d8",
    background: "#e5f0eb",
    card: "#f5fdf8",
    foreground: "#152a1f",
    muted: "#deeee5",
    mutedForeground: "#5a8c70",
    border: "#c5e0d0",
    radius: 16,
  },
];

function hexLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function applyConfig(config: BrandConfig) {
  const root = document.documentElement;
  const pf = hexLuminance(config.primary) > 0.5 ? "#1a1a2e" : "#ffffff";
  const pairs: [string, string][] = [
    ["--primary", config.primary],
    ["--ring", config.primary],
    ["--primary-foreground", pf],
    ["--background", config.background],
    ["--card", config.card],
    ["--popover", config.card],
    ["--foreground", config.foreground],
    ["--card-foreground", config.foreground],
    ["--popover-foreground", config.foreground],
    ["--accent", config.accent],
    ["--accent-foreground", config.foreground],
    ["--muted", config.muted],
    ["--muted-foreground", config.mutedForeground],
    ["--secondary", config.muted],
    ["--secondary-foreground", config.foreground],
    ["--border", config.border],
    ["--input", config.border],
  ];
  pairs.forEach(([prop, val]) => root.style.setProperty(prop, val));
  root.style.setProperty("--radius", `${config.radius / 16}rem`);
}

function generateCSS(config: BrandConfig): string {
  return [
    ":root {",
    `  --primary: ${config.primary};`,
    `  --background: ${config.background};`,
    `  --card: ${config.card};`,
    `  --foreground: ${config.foreground};`,
    `  --accent: ${config.accent};`,
    `  --muted: ${config.muted};`,
    `  --muted-foreground: ${config.mutedForeground};`,
    `  --border: ${config.border};`,
    `  --radius: ${config.radius / 16}rem;`,
    "}",
  ].join("\n");
}

const COLOR_CONTROLS: { key: keyof BrandConfig; label: string }[] = [
  { key: "primary", label: "메인 컬러" },
  { key: "accent", label: "포인트 컬러" },
  { key: "background", label: "배경색" },
  { key: "card", label: "카드색" },
  { key: "foreground", label: "텍스트색" },
];

export default function BrandKitPage() {
  const [config, setConfig] = useState<BrandConfig>(DEFAULTS);
  const [activePreset, setActivePreset] = useState<string>("violet");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as BrandConfig;
        setConfig(parsed);
        setActivePreset("");
      } catch {}
    }
  }, []);

  useEffect(() => {
    applyConfig(config);
  }, [config]);

  const handlePreset = (preset: Preset) => {
    const { name, label, dot, ...brandConfig } = preset;
    void name; void label; void dot;
    setConfig(brandConfig);
    setActivePreset(preset.name);
  };

  const handleColorChange = (key: keyof BrandConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setActivePreset("");
  };

  const handleRadiusChange = (value: number) => {
    setConfig((prev) => ({ ...prev, radius: value }));
    setActivePreset("");
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(DEFAULTS);
    setActivePreset("violet");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCSS(config));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col overflow-hidden rounded-3xl bg-card shadow-xl shadow-primary/5">

        {/* Header */}
        <header className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>홈으로</span>
          </Link>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
            Brand Kit
          </p>
          <div className="w-16" />
        </header>

        {/* Body */}
        <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[380px_1fr]">

          {/* ── Controls ── */}
          <aside className="overflow-y-auto border-b border-border lg:border-b-0 lg:border-r">
            <div className="px-6 py-8 sm:px-8">

              <h1 className="mb-1 text-xl font-semibold tracking-tight">
                톤 &amp; 매너 실험실
              </h1>
              <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                컬러와 반경을 조절하며 포트폴리오 스타일을 탐색해 보세요.
              </p>

              {/* Mood Presets */}
              <p className="mb-3 text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground">
                Mood Presets
              </p>
              <div className="mb-8 grid grid-cols-2 gap-2.5">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handlePreset(preset)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all",
                      activePreset === preset.name
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted/30 text-foreground hover:border-primary/40 hover:bg-muted/50"
                    )}
                  >
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full border border-border/40"
                      style={{ backgroundColor: preset.dot }}
                    />
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Color Controls */}
              <p className="mb-3 text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground">
                Colors
              </p>
              <div className="mb-8 flex flex-col gap-2">
                {COLOR_CONTROLS.map(({ key, label }) => (
                  <label
                    key={key}
                    className="relative flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-lg border border-border/60">
                      <div
                        className="absolute inset-0"
                        style={{ backgroundColor: config[key] as string }}
                      />
                      <input
                        type="color"
                        value={config[key] as string}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                    </div>
                    <span className="flex-1 text-sm font-medium">{label}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {config[key] as string}
                    </span>
                  </label>
                ))}
              </div>

              {/* Radius Slider */}
              <p className="mb-3 text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground">
                Corner Radius
              </p>
              <div className="mb-8 rounded-xl border border-border bg-muted/30 px-4 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium">카드 라운드</span>
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
                    {config.radius}px
                  </span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={28}
                  step={2}
                  value={config.radius}
                  onChange={(e) => handleRadiusChange(parseInt(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
                />
                <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
                  <span>4px</span>
                  <span>28px</span>
                </div>
                {/* Radius preview dots */}
                <div className="mt-4 flex items-center gap-3">
                  {[4, 10, 16, 24].map((r) => (
                    <div
                      key={r}
                      className="h-8 w-8 bg-primary/20 border border-primary/30 transition-all"
                      style={{ borderRadius: `${r}px` }}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground">radius 미리보기</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-opacity hover:opacity-90"
                >
                  {saved ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {saved ? "저장됐어요" : "저장하기"}
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/60"
                  >
                    <RotateCcw className="h-4 w-4" />
                    초기화
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/60"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ? "복사됨" : "CSS 복사"}
                  </button>
                </div>
              </div>

            </div>
          </aside>

          {/* ── Preview ── */}
          <main className="overflow-y-auto bg-background/60 p-6 sm:p-8 lg:p-10">
            <p className="mb-5 text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground">
              Live Preview
            </p>

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-primary/5">

              {/* Mini Nav */}
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <span className="text-xs font-semibold text-primary">PK.</span>
                <div className="flex gap-5">
                  {["Home", "Works", "Contact"].map((item) => (
                    <span key={item} className="text-xs text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mini Hero */}
              <div className="border-b border-border px-5 py-7">
                <p className="mb-2 text-xs font-semibold tracking-[0.3em] uppercase text-primary">
                  UX Designer
                </p>
                <h2 className="mb-1 text-xl font-bold tracking-tight">
                  안녕하세요, 박경태입니다
                </h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  삼성전자 MX사업부 UX팀
                </p>
                <div
                  className="inline-flex items-center gap-1.5 bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
                  style={{ borderRadius: `${config.radius}px` }}
                >
                  Contact Me
                </div>
              </div>

              {/* Mini Works */}
              <div className="border-b border-border px-5 py-6">
                <p className="mb-4 text-xs font-semibold tracking-[0.3em] uppercase text-primary">
                  Works
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                  {[
                    { title: "Samsung Notes", sub: "Motion Design" },
                    { title: "차세대 폼팩터", sub: "UX Research" },
                  ].map((work) => (
                    <div
                      key={work.title}
                      className="overflow-hidden border border-border bg-card"
                      style={{ borderRadius: `${config.radius}px` }}
                    >
                      <div className="h-16 bg-accent" />
                      <div className="p-3">
                        <p className="text-xs font-semibold">{work.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {work.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini Contact */}
              <div className="px-5 py-5">
                <p className="mb-2 text-xs font-semibold tracking-[0.3em] uppercase text-primary">
                  Contact
                </p>
                <p className="mb-3 text-xs text-muted-foreground">
                  함께 만들 프로젝트가 있다면 연락해 주세요.
                </p>
                <div
                  className="flex h-10 items-center justify-center border border-dashed border-border bg-muted/30 text-xs text-muted-foreground"
                  style={{ borderRadius: `${config.radius}px` }}
                >
                  Tally 폼 영역
                </div>
              </div>

            </div>

            {/* CSS Output */}
            <div className="mt-5 overflow-hidden rounded-xl border border-border">
              <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5">
                <span className="font-mono text-xs text-muted-foreground">
                  globals.css
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {copied ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copied ? "복사됨" : "복사"}
                </button>
              </div>
              <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed text-muted-foreground">
                {generateCSS(config)}
              </pre>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
