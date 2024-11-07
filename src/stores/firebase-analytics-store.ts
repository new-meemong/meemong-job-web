import { analytics } from "@/lib/firebase";
import { create } from "zustand";
import { logEvent } from "firebase/analytics";

interface AnalyticsState {
  logFirebaseEvent: (eventName: string, eventData?: object) => void;
  logPageView: (url: string, params: object) => void;
}

export const useAnalyticsStore = create<AnalyticsState>(() => ({
  logFirebaseEvent: (eventName: string, eventData = {}) => {
    if (!analytics) return;

    try {
      logEvent(analytics, eventName, {
        ...eventData,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error tracking event:", error);
    }
  },

  logPageView: (url: string, params: object) => {
    if (!analytics) return;
    try {
      logEvent(analytics, "page_view", {
        page_path: url,
        timestamp: new Date().toISOString(),
        ...params,
      });
    } catch (error) {
      console.error("Error tracking page view:", error);
    }
  },
}));
