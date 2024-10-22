export type RoleKey = "디자이너" | "인턴";

// 교육-디자이너
export type MonthlyEducationDesignerCountKey =
  | "월 1회 이상"
  | "월 2회 이상"
  | "월 3회 이상";
// 교육-인턴
export type MonthlyEducationInternCountKey =
  | "월 2회 이하"
  | "월 3회 이상"
  | "월 4회 이상";
// 휴무 가능일 (복수선택)
export type AvailableOffDaysKey =
  | "월"
  | "화"
  | "수"
  | "목"
  | "금"
  | "토"
  | "일";

// 정착지원금-디자이너
export type SettlementAllowanceKey =
  | "179만원 이하"
  | "180만원 이상"
  | "210만원 이상"
  | "240만원 이상"
  | "270만원 이상"
  | "300만원 이상"
  | "330만원 이상"
  | "360만원 이상";

// 인센티브-디자이너
export type IncentiveKey =
  | "29% 이하"
  | "30% 이상"
  | "35% 이상"
  | "40% 이상"
  | "45% 이상"
  | "50% 이상"
  | "60% 이상"
  | "70% 이상";

// 교육비-인턴
export type EducationCostKey =
  | "무상 지원"
  | "10만원 이상"
  | "20만원 이상"
  | "30만원 이상"
  | "40만원 이상"
  | "50만원 이상";

// 희망 급여-인턴
export type InternSalaryKey = "210만원 이하" | "210만원 이상" | "250만원 이상";

// 성별
export type SexKey = "남자" | "여자" | "무관";

// 나이 제한
export type IsRestrictedAgeKey = boolean;

// 나이 제한 - 40대 이상 가능 여부
export type IsPossibleMiddleAgeKey = boolean;

// 미용 라이센스
export type DesignerLicensesKey = "자격증" | "면허증" | "상관없음";

// 현재 직원수
export type EmployeeCountKey =
  | "3인 이하"
  | "4인 이상"
  | "7인 이상"
  | "10인 이상";

// 매장형태 (복수선택)
export type StoreTypesKey =
  | "소형샵 (25평 이하)"
  | "중형샵 (60평 이하)"
  | "대형샵 (60평 이상)"
  | "남성전문 (맨즈살롱/바버샵)"
  | "공유미용실";

// 인턴배정 시스템
export type isExistedInternSystemKey = boolean;

// 매장 인테리어
export type StoreInteriorRenovationAgoKey =
  | "1년 이내"
  | "3년 이내"
  | "5년 이상";

// 근무 형태
export type WorkTypeKey = "정규직" | "스페어(알바)";

// 근무 주기
export type WorkCycleTypesKey = "주 4일" | "주 5일" | "주 6일" | "격주 5일";

// 교육비 지원-디자이너
export type IsExistedEducationSupportKey = boolean;

// 식대 지원-디자이너
export type IsExistedMealSupportKey = boolean;

// 식사 시간
export type MealTimeKey =
  | "30분 이상"
  | "1시간 이상"
  | "1시간 30분 이상"
  | "2시간 이상";

// 시술제품 지원
export type IsExistedProductSupportKey = boolean;

// 기숙사
export type IsExistedDormitorySupportKey = boolean;

// 점판 수당
export type SalesCommissionKey =
  | "29% 이하"
  | "30% 이상"
  | "50% 이상"
  | "70% 이상"
  | "100%";

//디자이너 경력-디자이너
export type DesignerExperienceYearNumberKey =
  | "1년 이하"
  | "3년 이하"
  | "5년 이하"
  | "5년 이상"
  | "상관없음";

// 이전 매장 평균 매출-디자이너
export type SalesLast3MonthsAvgKey =
  | "500만원 이하"
  | "500만원 이상"
  | "1000만원 이상"
  | "1500만원 이상"
  | "상관없음";

// 지하철 접근성
export type SubwayAccessibilityKey =
  | "도보 3분 이하"
  | "도보 5분 이하"
  | "도보 15분 이하"
  | "해당없음";

// 관리자 나이
export type AdminAgeKey = "20대" | "30대" | "40대 이상";

// 관리자 성별
export type AdminSexKey = "남자" | "여자";

// 휴가 일수
export type LeaveDayCountKey = "4일 이하" | "5일 이상" | "10일 이상";

// 매장 주차 가능 대수
export type ParkingSpotCountKey = "3대 이하" | "4대 이상" | "10대 이상";

// 청소 업체
export type IsExistedCleaningSupplierKey = boolean;

// 수건 업체
export type IsExistedTowelSupplierKey = boolean;

// 기본 커트 가격
export type BasicCutPriceKey = number;

// 근무 시작 시간
export type StartWorkTimeKey = string;

// 근무 종료 시간
export type EndWorkTimeKey = string;

// 매장 링크
export type StoreUrlKey = string;

// 메인 염모제
export type MainHairDyeKey = string;

// 상세 설명(선택)
export type DescriptionKey = string;

// 디자이너 승급기간 - 인턴
export type DesignerPromotionPeriodKey =
  | "1년 이하"
  | "1년 6개월 이하"
  | "2년 이하"
  | "3년 미만"
  | "3년 이상";

// 인턴 경력 - 인턴
export type InternExperienceYearNumberKey =
  | "신입"
  | "1년 이하"
  | "3년 이하"
  | "5년 이하"
  | "5년 이상"
  | "상관없음";

// 샵 매니저 상주 - 인턴
export type IsOnsiteManagerKey = boolean;

// 4대보험 - 인턴
export type IsExistedFourInsurancesKey = boolean;

// 퇴직금 - 인턴
export type IsExistedRetirementPayKey = boolean;
