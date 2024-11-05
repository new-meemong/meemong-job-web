import { analytics } from "@/lib/firebase";
import { create } from "zustand";
import { logEvent } from "firebase/analytics";

interface AnalyticsState {
  trackEvent: (eventName: string, eventData?: object) => void;
  trackPageView: (url: string) => void;
}

export const useAnalyticsStore = create<AnalyticsState>(() => ({
  trackEvent: (eventName: string, eventData = {}) => {
    if (!analytics) return;

    try {
      logEvent(analytics, eventName, {
        ...eventData,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error tracking event:", error);
    }
  },

  trackPageView: (url: string) => {
    if (!analytics) return;
    try {
      // logEvent(analytics, "page_view", {
      //   page_path: url,
      //   timestamp: new Date().toISOString()
      // });
      console.log("url", url);
    } catch (error) {
      console.error("Error tracking page view:", error);
    }
  }
}));
