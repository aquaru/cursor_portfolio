# App Module (Next.js App Router)

Next.js 16.x App Router 기반 단일 페이지 포트폴리오. `app/` 내 모든 파일은 기본적으로 Server Component이다.

# Tech Stack & Constraints

- Next.js 16.x — `node_modules/next/dist/docs/01-app/` 참조 필수.
- 폰트: `Geist`(영문), `Geist_Mono`(코드), `Noto_Sans_KR`(한국어) — `next/font/google`로 로드.
- 메타데이터: `export const metadata` (static) 또는 `export async function generateMetadata` (dynamic).
- 이미지: `next/image`의 `<Image>` 컴포넌트 사용 (public/ 파일 또는 외부 URL).

# Implementation Patterns

**새 페이지 추가:**
```
app/
  about/
    page.tsx      ← 라우트: /about
  projects/
    page.tsx      ← 라우트: /projects
    [slug]/
      page.tsx    ← 라우트: /projects/[slug]
```

**페이지 메타데이터 패턴:**
```tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "페이지 제목 — 박경태",
  description: "페이지 설명",
  openGraph: {
    title: "...",
    description: "...",
  },
}
```

**Client Component 전환 (최소화):**
```tsx
"use client"
// 스크롤 이벤트, useState, useEffect 등 브라우저 API가 필요한 경우에만 사용
```

**Loading / Error 처리:**
- `app/loading.tsx` — 전역 로딩 UI
- `app/error.tsx` — 전역 에러 바운더리 (`"use client"` 필수)
- `app/not-found.tsx` — 404 페이지

# Fonts Usage

```tsx
// layout.tsx에 이미 정의된 CSS 변수를 Tailwind에서 사용
className="font-sans"   // Geist (기본)
className="font-mono"   // Geist Mono
// 한국어 텍스트는 자동으로 Noto Sans KR 폴백 적용 (lang="ko" 설정됨)
```

# Local Golden Rules

**Do:**
- 페이지 단위 메타데이터를 반드시 `metadata` export로 정의한다.
- `globals.css`에 CSS 변수 및 Tailwind base 설정을 유지한다.
- 섹션이 많아지면 `app/page.tsx`를 `components/sections/` 하위 컴포넌트로 분리한다.

**Don't:**
- `pages/` 디렉토리를 절대 생성하지 마라 — App Router와 충돌한다.
- `getServerSideProps`, `getStaticProps` 사용 금지 — App Router에서는 동작하지 않는다.
- `layout.tsx`에 페이지 전용 컨텐츠를 추가하지 마라.
- `app/globals.css` 내 기존 CSS 변수(테마 토큰)를 삭제하지 마라.
