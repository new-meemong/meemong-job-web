import mixpanel from "mixpanel-browser";

const token = "4bd06b93415f51db90573c57390ac9d0";

if (typeof window !== "undefined") {
  mixpanel.init(token, {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
    api_host: "https://api-js.mixpanel.com", // API 호스트 명시적 지정
  });
}

export default mixpanel;
