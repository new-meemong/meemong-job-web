import {
  AdminAgeKey,
  AdminSexKey,
  AvailableOffDaysKey,
  DesignerExperienceYearNumberKey,
  DesignerLicensesKey,
  DesignerPromotionPeriodKey,
  EducationCostKey,
  EmployeeCountKey,
  IncentiveKey,
  InternExperienceYearNumberKey,
  InternSalaryKey,
  IsRestrictedAgeKey,
  LeaveDayCountKey,
  MealTimeKey,
  ParkingSpotCountKey,
  SalesCommissionKey,
  SalesLast3MonthsAvgKey,
  SettlementAllowanceKey,
  SexKey,
  StoreInteriorRenovationAgoKey,
  StoreTypesKey,
  SubwayAccessibilityKey,
  WorkCycleTypesKey,
  WorkTypeKey,
  isExistedInternSystemKey,
} from "./job-posting-keys";

import { ImageType } from "./image-type";
import { UserType } from "./user-type";

export interface JobPostingType {
  // 고유 식별자
  id: string;

  // 기본 정보
  postingTitle: string; // 게시글 제목
  storeName: string; // 매장명
  storeAddress: string; // 매장 주소
  storeRegion: string; // 매장 지역
  storeRegionSiName: string; // 매장 지역 시 이름
  role: "디자이너" | "인턴"; // 역할 (디자이너 또는 인턴)
  premiumState: string; // 프리미엄 상태

  // 노출 지역
  postingRegions: string; // 노출 지역 (콤마로 구분된 문자열)
  postingRegionSiNames: string; // 노출 지역의 시 이름 (콤마로 구분된 문자열)

  // 교육 관련
  monthlyEducationCount: string; // 월 교육 횟수
  educationCost: EducationCostKey; // 교육 비용

  // 근무 관련
  workType: WorkTypeKey; // 근무 형태
  workCycleTypes: WorkCycleTypesKey; // 근무 주기 (콤마로 구분된 문자열)
  startWorkTime: string; // 근무 시작 시간 (HH:MM:SS)
  endWorkTime: string; // 근무 종료 시간 (HH:MM:SS)
  availableOffDays: AvailableOffDaysKey; // 휴무 가능일 (콤마로 구분된 문자열)
  mealTime: MealTimeKey; // 식사 시간
  settlementAllowance: SettlementAllowanceKey; // 정착 지원금
  incentive: IncentiveKey; // 인센티브
  internSalary: InternSalaryKey; // 인턴 월급
  sex: SexKey; // 성별

  // 직원 및 관리
  employeeCount: EmployeeCountKey; // 직원 수
  isOnsiteManager: boolean; // 샵 매니저 상주 여부
  isExistedInternSystem: isExistedInternSystemKey; // 인턴 시스템 존재 여부 (예: "0", "1")
  isPossibleMiddleAge: boolean | null; // 중년 가능 여부
  adminAge: AdminAgeKey; // 관리자 나이
  adminSex: AdminSexKey; // 관리자 성별
  storeTypes: StoreTypesKey; // 매장 형태 (콤마로 구분된 문자열)
  storeInteriorRenovationAgo: StoreInteriorRenovationAgoKey; // 매장 내부 리모델링 이후

  // 라이센스 및 자격
  designerLicenses: DesignerLicensesKey; // 디자이너 라이센스 (콤마로 구분된 문자열)
  designerExperienceYearNumber: DesignerExperienceYearNumberKey; // 디자이너 경력
  designerPromotionPeriod: DesignerPromotionPeriodKey; // 디자이너 승진 기간
  internExperienceYearNumber: InternExperienceYearNumberKey; // 인턴 경력

  // 지원 및 혜택
  isExistedEducationSupport: boolean; // 교육 지원 여부
  isExistedMealSupport: boolean; // 식대 지원 여부
  isExistedProductSupport: boolean; // 제품 지원 여부
  isExistedDormitorySupport: boolean; // 기숙사 지원 여부
  isExistedCleaningSupplier: boolean; // 청소 업체 존재 여부
  isExistedTowelSupplier: boolean; // 수건 업체 존재 여부
  isExistedFourInsurances: boolean; // 4대 보험 존재 여부
  isExistedRetirementPay: boolean; // 퇴직금 존재 여부

  // 근무 조건
  leaveDayCount: LeaveDayCountKey; // 휴가 일수
  parkingSpotCount: ParkingSpotCountKey; // 주차장 대수
  subwayAccessibility: SubwayAccessibilityKey; // 지하철 접근성

  // 매출 관련
  salesCommission: SalesCommissionKey; // 매출 수수료
  salesLast3MonthsAvg: SalesLast3MonthsAvgKey; // 이전 매장 평균 매출

  // 기타
  basicCutPrice: number | null; // 기본 컷 가격
  mainHairDye: string; // 주요 염모제 이름
  description: string; // 공고 설명
  storeUrl: string; // 매장 URL 또는 링크
  isExposure: boolean; // 노출 여부

  // 이미지
  jobPostingsStoreImages: ImageType[]; // 매장 이미지 리스트

  // 타임스탬프
  createdAt: string; // 생성 일시 (ISO 8601 형식)
  updatedAt: string; // 업데이트 일시 (ISO 8601 형식)
  deletedAt: string | null; // 삭제 일시 (ISO 8601 형식 또는 null)

  // 사용자 정보
  userId: number; // 사용자 ID

  // 기타 옵션
  isRestrictedAge: IsRestrictedAgeKey; // 나이 제한 여부

  JobPostingsStoreImages: ImageType[];
  User: UserType;
}
