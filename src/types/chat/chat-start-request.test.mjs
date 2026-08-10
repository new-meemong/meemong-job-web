import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const contractSource = readFileSync(
  new URL("./chat-start-request.ts", import.meta.url),
  "utf8",
);

function enumWireValues(enumName) {
  // 이 저장소에는 TS 테스트 러너가 없어 원문 enum의 wire value만 고정한다.
  // 주석·중복 키 같은 TypeScript 문법 오류는 별도의 lint/build 검증이 담당한다.
  const match = contractSource.match(
    new RegExp(`export enum ${enumName} \\{([\\s\\S]*?)\\n\\}`),
  );
  assert.ok(match, `${enumName} must exist`);
  return [...match[1].matchAll(/=\s*["']([^"']+)["']/g)].map(
    ([, wireValue]) => wireValue,
  );
}

test("ChatOriginEntrySource matches the shared Flutter 33-value contract", () => {
  assert.deepEqual(enumWireValues("ChatOriginEntrySource"), [
    "MODEL_ANNOUNCEMENT_DETAIL_APPLY_CHAT",
    "QUICK_MATCHING_GENERAL_DETAIL_CHAT",
    "QUICK_MATCHING_PREMIUM_DETAIL_CHAT",
    "EXPERIENCE_GROUP_DETAIL_CHAT",
    "HAIR_CONSULTATION_POST_COMMENT_DIRECT_CHAT",
    "HAIR_CONSULTATION_POST_COMMENT_DESIGNER_PROFILE_MENU_INQUIRY",
    "HAIR_CONSULTATION_RESPONSE_DETAIL_DIRECT_CHAT",
    "HAIR_CONSULTATION_RESPONSE_DETAIL_DESIGNER_PROFILE_MENU_INQUIRY",
    "REVIEW_SPECIAL_RESERVATION_ACCEPT_CHAT",
    "JOB_POSTING_DETAIL_APPLY_CHAT",
    "RESUME_DETAIL_OFFER_CHAT",
    "MODEL_PROFILE_DIRECT_CHAT",
    "DESIGNER_PROFILE_MENU_INQUIRY",
    "QUICK_MATCHING_GENERAL_DESIGNER_PROFILE_MENU_INQUIRY",
    "QUICK_MATCHING_PREMIUM_DESIGNER_PROFILE_MENU_INQUIRY",
    "RECENT_ACCESS_RECOMMENDED_MODEL_PROFILE_CHAT",
    "NEW_MODEL_PROFILE_CHAT",
    "RECENT_FEMALE_MODEL_PROFILE_CHAT",
    "RECENT_MALE_MODEL_PROFILE_CHAT",
    "NEARBY_MODEL_PROFILE_CHAT",
    "BEAUTY_MODEL_PROFILE_CHAT",
    "ACTIVE_MODEL_PROFILE_CHAT",
    "FAVORITE_MODEL_PROFILE_CHAT",
    "QUICK_MATCHING_GENERAL_MODEL_PROFILE_CHAT",
    "QUICK_MATCHING_PREMIUM_MODEL_PROFILE_CHAT",
    "TOP_ADVISOR_DESIGNER_PROFILE_MENU_INQUIRY",
    "RECOMMENDER_DESIGNER_PROFILE_MENU_INQUIRY",
    "NO_FACE_SHOOTING_DESIGNER_PROFILE_MENU_INQUIRY",
    "SEARCH_MAP_DESIGNER_PROFILE_MENU_INQUIRY",
    "FAVORITE_NOTIFICATION_MODEL_PROFILE_CHAT",
    "HAIR_CONSULTATION_ANSWER_NOTIFICATION_MODEL_PROFILE_CHAT",
    "STORELINK_NOTIFICATION_MODEL_PROFILE_CHAT",
    "INSTAGRAM_NOTIFICATION_MODEL_PROFILE_CHAT",
  ]);
});

test("ChatOriginPricingType matches the shared Flutter wire contract", () => {
  assert.deepEqual(enumWireValues("ChatOriginPricingType"), [
    "pay",
    "new",
    "recent_male",
    "recent_female",
    "longTime",
    "beauty",
    "favorite",
    "thunder_default",
    "favorite_notification_designer",
    "view_hair_consultation_answer_notification_designer",
    "view_storelink_notification_designer",
    "view_instagram_notification_designer",
  ]);
});
