"use client";

import mixpanel from "@/lib/mixpanel";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MixpanelRouteListener() {
  const pathname = usePathname();

  useEffect(() => {
    // 경로 변경 시 Mixpanel에 페이지뷰 이벤트를 트래킹

    if (pathname && typeof window !== "undefined") {
      mixpanel.track("Page View", {
        page: pathname,
        timestamp: new Date().toISOString(),
      });
    }
  }, [pathname]);

  return null; // 화면에 나타낼 UI는 없음
}
