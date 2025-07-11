"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { analytics } from "@/lib/firebase";
import { useAnalyticsStore } from "@/stores/firebase-analytics-store";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";

export function FirebaseNavigationLogging() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { logPageView } = useAnalyticsStore((state) => ({
    logPageView: state.logPageView,
  }));
  const { userId } = useAuthStore((state) => ({
    userId: state.userId,
  }));

  useEffect(() => {
    // 전체 URL 생성 (pathname + search params)
    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    logPageView(url, {
      userId: userId,
    });
  }, [pathname, searchParams, logPageView, userId, analytics]);

  return null;
}
