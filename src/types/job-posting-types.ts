// export const jobPostingType = {
//   role: new Map<string, string>([
//     ["디자이너", "디자이너"],
//     ["인턴", "인턴"]
//   ]),
//   monthlyEducationCount: new Map<string, string>([
//     ["월 1회 이상", "월 1회 이상"],
//     ["월 2회 이상", "월 2회 이상"],
//     ["월 3회 이상", "월 3회 이상"]
//   ]),
//   availableOffDays: new Map<string, string>([
//     ["월", "월"],
//     ["화", "화"],
//     ["수", "수"],
//     ["목", "목"],
//     ["금", "금"],
//     ["토", "토"],
//     ["일", "일"]
//   ]),
//   // 디자이너
//   settlementAllowance: new Map<string, string>([
//     ["179만원 이하", "179만원 이하"],
//     ["180만원 이상", "180만원 이상"],
//     ["210만원 이상", "210만원 이상"],
//     ["240만원 이상", "240만원 이상"],
//     ["270만원 이상", "270만원 이상"],
//     ["300만원 이상", "300만원 이상"],
//     ["330만원 이상", "330만원 이상"],
//     ["360만원 이상", "360만원 이상"]
//   ]),
//   // 디자이너
//   incentive: new Map<string, string>([
//     ["29% 이하", "29% 이하"],
//     ["30% 이상", "30% 이상"],
//     ["35% 이상", "35% 이상"],
//     ["40% 이상", "40% 이상"],
//     ["45% 이상", "45% 이상"],
//     ["50% 이상", "50% 이상"],
//     ["60% 이상", "60% 이상"],
//     ["70% 이상", "70% 이상"]
//   ]),
//   // 인턴
//   educationCost: new Map<string, string>([
//     ["무상 지원", "무상 지원"],
//     ["10만원 이상", "10만원 이상"],
//     ["20만원 이상", "20만원 이상"],
//     ["30만원 이상", "30만원 이상"],
//     ["40만원 이상", "40만원 이상"],
//     ["50만원 이상", "50만원 이상"]
//   ]),
//   // 인턴
//   internSalary: new Map<string, string>([
//     ["210만원 이하", "210만원 이하"],
//     ["210만원 이상", "210만원 이상"],
//     ["250만원 이상", "250만원 이상"]
//   ]),
//   sex: new Map<string, string>([
//     ["무관", "성별 무관"],
//     ["남자", "남자"],
//     ["여자", "여자"]
//   ]),
//   age: new Map<string, string>([
//     ["연령 무관", "연령 무관"],
//     ["연령 제한", "연령 제한"]
//   ]),
//   designerLicenses: new Map<string, string>([
//     ["자격증", "자격증"],
//     ["면허증", "면허증"],
//     ["상관없음", "상관없음"]
//   ]),
//   storeTypes: new Map<string, string>([
//     ["소형샵 (25평 이하)", "소형샵 (25평 이하)"],
//     ["중형샵 (60평 이하)", "중형샵 (60평 이하)"],
//     ["대형샵 (60평 이상)", "대형샵 (60평 이상)"],
//     ["남성전문 (맨즈살롱/바버샵)", "남성전문 (맨즈살롱/바버샵)"],
//     ["공유미용실", "공유미용실"]
//   ]),
//   employeeCount: new Map<string, string>([
//     ["3인 이하", "3인 이하"],
//     ["4인 이상", "4인 이상"],
//     ["7인 이상", "7인 이상"],
//     ["10인 이상", "10인 이상"]
//   ]),
//   storeInteriorRenovationAgo: new Map<string, string>([
//     ["1년 이내", "1년 이내"],
//     ["3년 이내", "3년 이내"],
//     ["5년 이상", "5년 이상"]
//   ]),
//   workType: new Map<string, string>([
//     ["정규직", "정규직"],
//     ["스페어(알바)", "스페어(알바)"]
//   ]),
//   workCycleTypes: new Map<string, string>([
//     ["주 4일", "주 4일"],
//     ["주 5일", "주 5일"],
//     ["주 6일", "주 6일"],
//     ["격주 5일", "격주 5일"]
//   ]),

//   // 디자이너
//   isExistedEducationSupport: new Map<boolean, string>([
//     [true, "유"],
//     [false, "무"]
//   ]),
//   // 디자이너
//   isExistedMealSupport: new Map<boolean, string>([
//     [true, "유"],
//     [false, "무"]
//   ]),
//   mealTime: new Map<string, string>([
//     ["30분 이상", "30분 이상"],
//     ["1시간 이상", "1시간 이상"],
//     ["1시간 30분 이상", "1시간 30분 이상"],
//     ["2시간 이상", "2시간 이상"]
//   ]),
//   isExistedProductSupport: new Map<boolean, string>([
//     [true, "유"],
//     [false, "무"]
//   ]),
//   isExistedDormitorySupport: new Map<boolean, string>([
//     [true, "유"],
//     [false, "무"]
//   ]),
//   salesCommission: new Map<string, string>([
//     ["30% 이상", "30% 이상"],
//     ["50% 이상", "50% 이상"],
//     ["70% 이상", "70% 이상"],
//     ["100%", "100%"]
//   ]),
//   // 디자이너
//   designerExperienceYearNumber: new Map<string, string>([
//     ["1년 이하", "1년 이하"],
//     ["3년 이하", "3년 이하"],
//     ["5년 이하", "5년 이하"],
//     ["5년 이상", "5년 이상"],
//     ["상관 없음", "상관 없음"]
//   ]),
//   // 인턴
//   internExperienceYearNumber: new Map<string, string>([
//     ["신입", "신입"],
//     ["1년 이하", "1년 이하"],
//     ["3년 이하", "3년 이하"],
//     ["5년 이하", "5년 이하"],
//     ["5년 이상", "5년 이상"],
//     ["상관 없음", "상관 없음"]
//   ]),
//   // 인턴
//   designerPromotionPeriod: new Map<string, string>([
//     ["1년 이하", "1년 이하"],
//     ["1년 6개월 이하", "1년 6개월 이하"],
//     ["2년 이하", "2년 이하"],
//     ["3년 미만", "3년 미만"],
//     ["3년 이상", "3년 이상"]
//   ]),
//   // 디자이너
//   salesLast3MonthsAvg: new Map<string, string>([
//     ["500만원 이하", "500만원 이하"],
//     ["500만원 이상", "500만원 이상"],
//     ["1000만원 이상", "1000만원 이상"],
//     ["1500만원 이상", "1500만원 이상"],
//     ["상관없음", "상관없음"]
//   ]),
//   subwayAccessibility: new Map<string, string>([
//     ["도보 3분 이하", "도보 3분 이하"],
//     ["도보 5분 이하", "도보 5분 이하"],
//     ["도보 15분 이하", "도보 15분 이하"],
//     ["해당없음", "해당없음"]
//   ]),
//   adminAge: new Map<string, string>([
//     ["20대 이상", "20대 이상"],
//     ["30대 이상", "30대 이상"],
//     ["40대 이상", "40대 이상"]
//   ]),
//   adminSex: new Map<string, string>([
//     ["남", "남"],
//     ["여", "여"]
//   ]),
//   leaveDayCount: new Map<string, string>([
//     ["4일 이하", "4일 이하"],
//     ["5일 이상", "5일 이상"],
//     ["10일 이상", "10일 이상"]
//   ]),
//   parkingSpotCount: new Map<string, string>([
//     ["3대 이하", "3대 이하"],
//     ["4대 이상", "4대 이상"],
//     ["10대 이상", "10대 이상"]
//   ]),
//   isExistedCleaningSupplier: new Map<boolean, string>([
//     [true, "유"],
//     [false, "무"]
//   ]),
//   isExistedTowelSupplier: new Map<boolean, string>([
//     [true, "유"],
//     [false, "무"]
//   ]),
//   // 인턴
//   isOnsiteManager: new Map<boolean, string>([
//     [true, "유"],
//     [false, "무"]
//   ]),
//   // 인턴
//   isExistedFourInsurances: new Map<boolean, string>([
//     [true, "유"],
//     [false, "무"]
//   ]),
//   // 인턴
//   isExistedRetirementPay: new Map<boolean, string>([
//     [true, "유"],
//     [false, "무"]
//   ])
// };

export const jobPostingTypes = {
  role: {
    디자이너: "디자이너",
    인턴: "인턴"
  },
  // 교육-디자이너
  monthlyEducationDesignerCount: {
    "월 1회 이상": "월 1회 이상",
    "월 2회 이상": "월 2회 이상",
    "월 3회 이상": "월 3회 이상"
  },
  // 교육-인턴
  monthlyEducationInternCount: {
    "월 2회 이하": "월 2회 이하",
    "월 3회 이상": "월 3회 이상",
    "월 4회 이상": "월 4회 이상"
  },
  // 휴무 가능일
  availableOffDays: {
    월: "월",
    화: "화",
    수: "수",
    목: "목",
    금: "금",
    토: "토",
    일: "일"
  },

  // 정착지원금-디자이너
  settlementAllowance: {
    "179만원 이하": "179만원 이하",
    "180만원 이상": "180만원 이상",
    "210만원 이상": "210만원 이상",
    "240만원 이상": "240만원 이상",
    "270만원 이상": "270만원 이상",
    "300만원 이상": "300만원 이상",
    "330만원 이상": "330만원 이상",
    "360만원 이상": "360만원 이상"
  },
  // 디자이너
  incentive: {
    "29% 이하": "29% 이하",
    "30% 이상": "30% 이상",
    "35% 이상": "35% 이상",
    "40% 이상": "40% 이상",
    "45% 이상": "45% 이상",
    "50% 이상": "50% 이상",
    "60% 이상": "60% 이상",
    "70% 이상": "70% 이상"
  },
  // 인턴
  educationCost: {
    "무상 지원": "무상 지원",
    "10만원 이상": "10만원 이상",
    "20만원 이상": "20만원 이상",
    "30만원 이상": "30만원 이상",
    "40만원 이상": "40만원 이상",
    "50만원 이상": "50만원 이상"
  },
  // 인턴
  internSalary: {
    "210만원 이하": "210만원 이하",
    "210만원 이상": "210만원 이상",
    "250만원 이상": "250만원 이상"
  },
  sex: {
    무관: "성별 무관",
    남자: "남자",
    여자: "여자"
  },
  isRestrictedAge: {
    false: "연령 무관",
    true: "연령 제한"
  },
  isPossibleMiddleAge: {
    false: false,
    true: true
  },
  designerLicenses: {
    자격증: "자격증",
    면허증: "면허증",
    상관없음: "상관없음"
  },
  storeTypes: {
    "소형샵 (25평 이하)": "소형샵 (25평 이하)",
    "중형샵 (60평 이하)": "중형샵 (60평 이하)",
    "대형샵 (60평 이상)": "대형샵 (60평 이상)",
    "남성전문 (맨즈살롱/바버샵)": "남성전문 (맨즈살롱/바버샵)",
    공유미용실: "공유미용실"
  },
  employeeCount: {
    "3인 이하": "3인 이하",
    "4인 이상": "4인 이상",
    "7인 이상": "7인 이상",
    "10인 이상": "10인 이상"
  },
  storeInteriorRenovationAgo: {
    "1년 이내": "1년 이내",
    "3년 이내": "3년 이내",
    "5년 이상": "5년 이상"
  },
  workType: {
    정규직: "정규직",
    "스페어(알바)": "스페어(알바)"
  },
  workCycleTypes: {
    "주 4일": "주 4일",
    "주 5일": "주 5일",
    "주 6일": "주 6일",
    "격주 5일": "격주 5일"
  },
  // 디자이너
  isExistedEducationSupport: {
    true: "유",
    false: "무"
  },
  // 디자이너
  isExistedMealSupport: {
    true: "유",
    false: "무"
  },
  mealTime: {
    "30분 이상": "30분 이상",
    "1시간 이상": "1시간 이상",
    "1시간 30분 이상": "1시간 30분 이상",
    "2시간 이상": "2시간 이상"
  },
  isExistedProductSupport: {
    true: "유",
    false: "무"
  },
  isExistedDormitorySupport: {
    true: "유",
    false: "무"
  },
  salesCommission: {
    "30% 이상": "30% 이상",
    "50% 이상": "50% 이상",
    "70% 이상": "70% 이상",
    "100%": "100%"
  },
  // 디자이너
  designerExperienceYearNumber: {
    "1년 이하": "1년 이하",
    "3년 이하": "3년 이하",
    "5년 이하": "5년 이하",
    "5년 이상": "5년 이상",
    "상관 없음": "상관 없음"
  },
  // 인턴
  internExperienceYearNumber: {
    신입: "신입",
    "1년 이하": "1년 이하",
    "3년 이하": "3년 이하",
    "5년 이하": "5년 이하",
    "5년 이상": "5년 이상",
    "상관 없음": "상관 없음"
  },
  // 인턴
  designerPromotionPeriod: {
    "1년 이하": "1년 이하",
    "1년 6개월 이하": "1년 6개월 이하",
    "2년 이하": "2년 이하",
    "3년 미만": "3년 미만",
    "3년 이상": "3년 이상"
  },
  // 디자이너
  salesLast3MonthsAvg: {
    "500만원 이하": "500만원 이하",
    "500만원 이상": "500만원 이상",
    "1000만원 이상": "1000만원 이상",
    "1500만원 이상": "1500만원 이상",
    상관없음: "상관없음"
  },
  subwayAccessibility: {
    "도보 3분 이하": "도보 3분 이하",
    "도보 5분 이하": "도보 5분 이하",
    "도보 15분 이하": "도보 15분 이하",
    해당없음: "해당없음"
  },
  adminAge: {
    "20대 이상": "20대 이상",
    "30대 이상": "30대 이상",
    "40대 이상": "40대 이상"
  },
  adminSex: {
    남: "남",
    여: "여"
  },
  leaveDayCount: {
    "4일 이하": "4일 이하",
    "5일 이상": "5일 이상",
    "10일 이상": "10일 이상"
  },
  parkingSpotCount: {
    "3대 이하": "3대 이하",
    "4대 이상": "4대 이상",
    "10대 이상": "10대 이상"
  },
  isExistedCleaningSupplier: {
    true: "유",
    false: "무"
  },
  isExistedTowelSupplier: {
    true: "유",
    false: "무"
  },
  // 인턴
  isOnsiteManager: {
    true: "유",
    false: "무"
  },
  // 인턴
  isExistedFourInsurances: {
    true: "유",
    false: "무"
  },
  // 인턴
  isExistedRetirementPay: {
    true: "유",
    false: "무"
  }
};

// ExtractType 함수 정의 - boolean을 처리하는 조건부 타입
type ExtractType<T> = T extends { true: any; false: any } ? boolean : keyof T;

// jobPostingType 안의 모든 키에 대한 타입을 자동으로 생성하는 유틸리티 타입
type JobPostingTypeKeys = {
  [K in keyof typeof jobPostingTypes]: ExtractType<(typeof jobPostingTypes)[K]>;
};

export type RoleType = JobPostingTypeKeys["role"];
export type MonthlyEducationDesignerCountType =
  JobPostingTypeKeys["monthlyEducationDesignerCount"];
export type MonthlyEducationInternCountType =
  JobPostingTypeKeys["monthlyEducationInternCount"];
export type AvailableOffDaysType = JobPostingTypeKeys["availableOffDays"];
export type SettlementAllowanceType = JobPostingTypeKeys["settlementAllowance"];
export type IncentiveType = JobPostingTypeKeys["incentive"];
export type EducationCostType = JobPostingTypeKeys["educationCost"];
export type InternSalaryType = JobPostingTypeKeys["internSalary"];
export type SexType = JobPostingTypeKeys["sex"];
export type isRestrictedAgeType = JobPostingTypeKeys["isRestrictedAge"];
export type isPossibleMiddleAgeType = JobPostingTypeKeys["isPossibleMiddleAge"];
export type DesignerLicensesType = JobPostingTypeKeys["designerLicenses"];
export type StoreTypesType = JobPostingTypeKeys["storeTypes"];
export type EmployeeCountType = JobPostingTypeKeys["employeeCount"];
export type StoreInteriorRenovationAgoType =
  JobPostingTypeKeys["storeInteriorRenovationAgo"];
export type WorkType = JobPostingTypeKeys["workType"];
export type WorkCycleTypesType = JobPostingTypeKeys["workCycleTypes"];
export type IsExistedEducationSupportType =
  JobPostingTypeKeys["isExistedEducationSupport"];
export type IsExistedMealSupportType =
  JobPostingTypeKeys["isExistedMealSupport"];
export type MealTimeType = JobPostingTypeKeys["mealTime"];
export type IsExistedProductSupportType =
  JobPostingTypeKeys["isExistedProductSupport"];
export type IsExistedDormitorySupportType =
  JobPostingTypeKeys["isExistedDormitorySupport"];
export type SalesCommissionType = JobPostingTypeKeys["salesCommission"];
export type DesignerExperienceYearNumberType =
  JobPostingTypeKeys["designerExperienceYearNumber"];
export type InternExperienceYearNumberType =
  JobPostingTypeKeys["internExperienceYearNumber"];
export type DesignerPromotionPeriodType =
  JobPostingTypeKeys["designerPromotionPeriod"];
export type SalesLast3MonthsAvgType = JobPostingTypeKeys["salesLast3MonthsAvg"];
export type SubwayAccessibilityType = JobPostingTypeKeys["subwayAccessibility"];
export type AdminAgeType = JobPostingTypeKeys["adminAge"];
export type AdminSexType = JobPostingTypeKeys["adminSex"];
export type LeaveDayCountType = JobPostingTypeKeys["leaveDayCount"];
export type ParkingSpotCountType = JobPostingTypeKeys["parkingSpotCount"];
export type IsExistedCleaningSupplierType =
  JobPostingTypeKeys["isExistedCleaningSupplier"];
export type IsExistedTowelSupplierType =
  JobPostingTypeKeys["isExistedTowelSupplier"];
export type IsOnsiteManagerType = JobPostingTypeKeys["isOnsiteManager"];
export type IsExistedFourInsurancesType =
  JobPostingTypeKeys["isExistedFourInsurances"];
export type IsExistedRetirementPayType =
  JobPostingTypeKeys["isExistedRetirementPay"];
