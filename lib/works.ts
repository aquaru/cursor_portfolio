export interface WorkLink {
  label: string;
  href: string;
  type: "behance" | "dribbble" | "github" | "external";
}

export interface Work {
  slug: string;
  title: string;
  summary: string;
  description: string;
  thumbnail?: string;
  detailImage?: string;
  links: WorkLink[];
}

export const works: Work[] = [
  {
    slug: "samsung-notes-quick-tools",
    title: "Samsung Notes - Quick tools",
    summary: "삼성 노트, Quick tools 모션 디자인",
    description:
      "Samsung Notes의 Quick tools 기능에 대한 모션 디자인을 담당했습니다. 도구 전환, 패널 등장·퇴장, 사용자 제스처에 따른 피드백 등 Quick tools 사용 흐름 전반에 자연스럽고 일관된 모션 언어를 적용했습니다.",
    thumbnail: "/work_1.jpg",
    detailImage: "/work_1_detail.jpg",
    links: [],
  },
  {
    slug: "foldable-ux",
    title: "차세대 폼팩터 선행 UX",
    summary: "차세대 폼팩터 UX 디자인",
    description:
      "차세대 모바일 폼팩터에 맞는 UX 패턴과 인터랙션 시나리오를 선행 연구·디자인했습니다. 새로운 화면 구조와 사용 맥락에서의 내비게이션, 멀티태스킹, 제스처 기반 인터랙션을 탐색하고 프로토타입으로 검증했습니다.",
    thumbnail: "/work_2.jpg",
    detailImage: "/work_2_detail.jpg",
    links: [],
  },
  {
    slug: "drawing-assist",
    title: "Drawing assist",
    summary: "Drawing assist app 모션 및 effect 디자인",
    description:
      "Drawing assist 앱의 모션 및 visual effect 디자인을 담당했습니다. 그리기 보조 기능의 등장·전환, 효과 피드백, 사용자 액션에 대한 모션 반응을 설계하여 직관적이고 몰입감 있는 사용 경험을 구현했습니다.",
    thumbnail: "/work_3.jpg",
    detailImage: "/work_3_detail.jpg",
    links: [],
  },
];

export function getWork(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}
