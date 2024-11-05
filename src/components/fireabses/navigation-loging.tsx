"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { useAnalyticsStore } from "@/stores/firebase-analytics-store";
import { useEffect } from "react";

export function FirebaseNavigationLogging() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { trackPageView } = useAnalyticsStore();

  useEffect(() => {
    // 전체 URL 생성 (pathname + search params)
    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // 페이지 뷰 추적
    trackPageView(url);
  }, [pathname, searchParams, trackPageView]);

  return null;
}
