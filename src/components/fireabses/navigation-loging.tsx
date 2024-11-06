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
  const { userId, UserID } = useAuthStore((state) => ({
    userId: state.userId,
    UserID: state.UserID,
  }));

  useEffect(() => {
    // 전체 URL 생성 (pathname + search params)
    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    logPageView(url, {
      userId: userId,
      UserID: UserID,
    });
  }, [pathname, searchParams, logPageView, userId, UserID, analytics]);

  return null;
}
