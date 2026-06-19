<!-- BEGIN:nextjs-agent-rules -->
# CRITICAL: This is NOT the Next.js you know

Next.js 16.x has breaking changes. Read `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Context

박경태(삼성전자 MX사업부 UX팀)의 개인 포트폴리오 사이트. 단순 이력서가 아닌 AI 시대의 개인 브랜딩 사이트를 목표로 한다.

Tech Stack: Next.js 16.x · React 19 · TypeScript · Tailwind CSS v4 · ShadCN (radix-ui) · Lucide React · Geist + Noto Sans KR

# Operational Commands

```bash
bun run dev       # dev server (localhost:3000)
bun run build     # production build
bun run lint      # eslint check
```

Package manager: **bun only** — npm/yarn/pnpm 사용 금지.

ShadCN 컴포넌트 추가:
```bash
bunx shadcn add <component-name>
```

# Golden Rules

**Immutable:**
- API 키, 개인정보, 연락처를 소스코드에 하드코딩하지 마라.
- `pages/` 디렉토리를 생성하지 마라 — App Router 전용 프로젝트이다.
- Tailwind CSS v4 사용 중 — `tailwind.config.js`는 존재하지 않으며, `@import "tailwindcss"` 방식을 따른다.

**Do:**
- ShadCN 컴포넌트(`components/ui/`)를 최우선으로 활용한다.
- Lucide React로 아이콘을 추가한다 (`import { IconName } from "lucide-react"`).
- `cn()` 유틸리티(`lib/utils.ts`)로 클래스를 병합한다.
- 한국어 텍스트에는 Noto Sans KR(`--font-noto-kr`) CSS 변수를 사용한다.
- Apple/Linear 스타일: 여백은 넉넉하게, 타이포그래피는 tight tracking, 모서리는 rounded-xl 이상.
- Server Component를 기본으로 작성하고, 상호작용이 필요할 때만 `"use client"` 추가.

**Don't:**
- inline style 사용 금지 — Tailwind 유틸리티 클래스만 사용.
- ShadCN 컴포넌트 파일(`components/ui/`)을 직접 수정하지 마라 — 커스텀이 필요하면 래퍼 컴포넌트를 만들어라.
- `<img>` 태그 사용 금지 — Next.js `<Image>` 컴포넌트를 사용한다.
- `lucide-react` 외의 아이콘 라이브러리를 추가하지 마라.

# Standards & References

**Git:**
- 커밋 메시지: `feat: ...` / `fix: ...` / `style: ...` / `refactor: ...` (영어, 소문자)
- 기능 단위로 작은 커밋을 유지한다.

**Coding Conventions:**
- 컴포넌트 파일: PascalCase (`HeroSection.tsx`)
- 유틸리티/훅: camelCase (`useScrollPosition.ts`)
- 타입은 `interface` 우선, union type은 `type` 사용.

**Maintenance Policy:**
규칙과 실제 코드 사이에 괴리가 발생하면 이 파일의 업데이트를 제안하라.

# Context Map

- **[UI 컴포넌트 작업 (ShadCN/스타일링)](./components/AGENTS.md)** — 컴포넌트 추가, 커스텀 스타일링, 레이아웃 패턴 작업 시.
- **[페이지/라우팅 작업 (App Router)](./app/AGENTS.md)** — 페이지 추가, 메타데이터, 레이아웃 구조 수정 시.
