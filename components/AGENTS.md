# Components Module

`components/ui/` — ShadCN이 자동 생성·관리하는 기본 컴포넌트. 직접 수정 금지.
커스텀 컴포넌트는 `components/` 루트에 `PascalCase.tsx`로 추가한다.

# Tech Stack & Constraints

- ShadCN 컴포넌트: `radix-ui` Slot 패턴 사용 (`asChild` prop).
- 스타일: Tailwind CSS v4 + `cn()` (`lib/utils.ts`) 조합만 사용.
- 아이콘: `lucide-react`만 허용.
- 애니메이션: `tw-animate-css` 클래스 또는 Tailwind `transition-*` 유틸리티 사용.

# Implementation Patterns

**커스텀 컴포넌트 보일러플레이트:**
```tsx
import { cn } from "@/lib/utils"

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  // props
}

export function MyComponent({ className, ...props }: MyComponentProps) {
  return (
    <div className={cn("base-classes", className)} {...props} />
  )
}
```

**ShadCN 컴포넌트를 asChild로 확장:**
```tsx
import { Button } from "@/components/ui/button"

// 링크를 버튼 스타일로 — asChild 패턴
<Button asChild>
  <a href="/about">더 보기</a>
</Button>
```

**섹션 레이아웃 패턴 (Apple/Linear 스타일):**
```tsx
<section className="border-t border-border px-6 py-16 sm:px-10">
  <p className="mb-10 text-xs font-semibold tracking-[0.3em] uppercase text-primary">
    Section Label
  </p>
  {/* content */}
</section>
```

# Design Constraints

- 여백: section padding은 `py-14` ~ `py-20`, 내부 gap은 `gap-10` 이상으로 넉넉하게.
- 타이포그래피: heading은 `tracking-tight`, label은 `tracking-[0.3em] uppercase`.
- 카드/박스: `rounded-2xl` 이상, 배경은 `bg-secondary` 또는 `bg-card`.
- 그림자: `shadow-xl shadow-primary/5` — 과도한 그림자 금지.
- 색상: CSS 변수(`bg-primary`, `text-muted-foreground` 등)만 사용 — 하드코딩된 색상값 금지.

# Local Golden Rules

**Do:**
- 새 ShadCN 컴포넌트는 `bunx shadcn add <name>`으로 추가한다.
- 재사용 가능한 섹션은 별도 컴포넌트로 분리한다 (`HeroSection`, `AboutSection` 등).
- 모바일 우선(mobile-first) 반응형: `sm:`, `md:`, `lg:` 순서로 작성.

**Don't:**
- `components/ui/` 파일을 직접 편집하지 마라.
- `style={{}}` inline style 사용 금지.
- `@apply` Tailwind 지시자 사용 금지 — v4에서 동작이 변경되었다.
