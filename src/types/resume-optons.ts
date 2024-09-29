import {
  RoleKeyResume,
  WorkTypeKeyResume,
  SettlementAllowanceKeyResume,
  DesignerLicensesKeyResume,
  DesignerExperienceYearNumberKeyResume,
  InternExpectedSalaryKeyResume,
  InternExperienceYearNumberKeyResume,
  SalesLast3MonthsAvgKeyResume,
  CompletedEducationLevelKeyResume,
  PreferredOffDaysKeyResume,
  WorkCycleTypesKeyResume,
  DesignerPromotionPeriodKeyResume,
  IsPreferredDormitorySupportKeyResume,
  PreferredMonthlyEducationDesignerCountKeyResume,
  PreferredMonthlyEducationInternCountKeyResume,
  IsPreferredMealSupportKeyResume,
  IsPreferredParkingKeyResume
} from "./resume-keys";

interface Option<KeyType> {
  key: KeyType;
  value: string;
}

// 각 타입에 맞는 옵션 정의
type RoleOption = Option<RoleKeyResume>;
type WorkTypeOption = Option<WorkTypeKeyResume>;
type SettlementAllowanceOption = Option<SettlementAllowanceKeyResume>;
type DesignerLicensesOption = Option<DesignerLicensesKeyResume>;
type DesignerExperienceYearNumberOption =
  Option<DesignerExperienceYearNumberKeyResume>;
type InternExpectedSalaryOption = Option<InternExpectedSalaryKeyResume>;
type InternExperienceYearNumberOption =
  Option<InternExperienceYearNumberKeyResume>;
type SalesLast3MonthsAvgOption = Option<SalesLast3MonthsAvgKeyResume>;
type CompletedEducationLevelOption = Option<CompletedEducationLevelKeyResume>;
type PreferredOffDaysOption = Option<PreferredOffDaysKeyResume>;
type WorkCycleTypesOption = Option<WorkCycleTypesKeyResume>;
type DesignerPromotionPeriodOption = Option<DesignerPromotionPeriodKeyResume>;
type IsPreferredDormitorySupportOption =
  Option<IsPreferredDormitorySupportKeyResume>;
type PreferredMonthlyEducationDesignerCountOption =
  Option<PreferredMonthlyEducationDesignerCountKeyResume>;
type PreferredMonthlyEducationInternCountOption =
  Option<PreferredMonthlyEducationInternCountKeyResume>;
type IsPreferredMealSupportOption = Option<IsPreferredMealSupportKeyResume>;
type IsPreferredParkingOption = Option<IsPreferredParkingKeyResume>;

// resumeOptions 정의
export const resumeOptions = {
  appliedRole: [
    { key: "디자이너", value: "디자이너" },
    { key: "인턴", value: "인턴" }
  ] as RoleOption[],

  workType: [
    { key: "정규직", value: "정규직" },
    { key: "스페어(알바)", value: "스페어(알바)" },
    { key: "상관없음", value: "상관없음" }
  ] as WorkTypeOption[],

  settlementAllowance: [
    { key: "150만원 이상", value: "150만원 이상" },
    { key: "200만원 이상", value: "200만원 이상" },
    { key: "250만원 이상", value: "250만원 이상" },
    { key: "300만원 이상", value: "300만원 이상" },
    { key: "상관없음", value: "상관없음" }
  ] as SettlementAllowanceOption[],

  designerLicenses: [
    { key: "자격증", value: "자격증" },
    { key: "면허증", value: "면허증" },
    { key: "상관없음", value: "상관없음" }
  ] as DesignerLicensesOption[],

  designerExperienceYearNumber: [
    { key: "1년 이하", value: "1년 이하" },
    { key: "2년 이하", value: "2년 이하" },
    { key: "3년 이하", value: "3년 이하" },
    { key: "4년 이하", value: "4년 이하" },
    { key: "5년 이하", value: "5년 이하" },
    { key: "6년 이상", value: "6년 이상" }
  ] as DesignerExperienceYearNumberOption[],

  internExpectedSalary: [
    { key: "150만원 이상", value: "150만원 이상" },
    { key: "170만원 이상", value: "170만원 이상" },
    { key: "190만원 이상", value: "190만원 이상" },
    { key: "210만원 이상", value: "210만원 이상" },
    { key: "230만원 이상", value: "230만원 이상" },
    { key: "상관없음", value: "상관없음" }
  ] as InternExpectedSalaryOption[],

  internExperienceYearNumber: [
    { key: "신입", value: "신입" },
    { key: "1년 이하", value: "1년 이하" },
    { key: "2년 이하", value: "2년 이하" },
    { key: "3년 이하", value: "3년 이하" },
    { key: "4년 이하", value: "4년 이하" },
    { key: "5년 이하", value: "5년 이하" },
    { key: "6년 이상", value: "6년 이상" }
  ] as InternExperienceYearNumberOption[],

  salesLast3MonthsAvg: [
    { key: "500만원 이하", value: "500만원 이하" },
    { key: "500만원 이상", value: "500만원 이상" },
    { key: "1000만원 이상", value: "1000만원 이상" },
    { key: "1500만원 이상", value: "1500만원 이상" }
  ] as SalesLast3MonthsAvgOption[],

  completedEducationLevel: [
    { key: "미용고등학교 졸업", value: "미용고등학교 졸업" },
    { key: "미용대학교 졸업", value: "미용대학교 졸업" },
    { key: "일반고등학교 졸업", value: "일반고등학교 졸업" },
    { key: "일반대학교 졸업", value: "일반대학교 졸업" },
    { key: "해당없음", value: "해당없음" }
  ] as CompletedEducationLevelOption[],

  preferredOffDays: [
    { key: "월", value: "월" },
    { key: "화", value: "화" },
    { key: "수", value: "수" },
    { key: "목", value: "목" },
    { key: "금", value: "금" },
    { key: "토", value: "토" },
    { key: "일", value: "일" },
    { key: "상관없음", value: "상관없음" }
  ] as PreferredOffDaysOption[],

  workCycleTypes: [
    { key: "주 4일", value: "주 4일" },
    { key: "주 5일", value: "주 5일" },
    { key: "주 6일", value: "주 6일" },
    { key: "격주 5일", value: "격주 5일" }
  ] as WorkCycleTypesOption[],

  designerPromotionPeriod: [
    { key: "1년 이하", value: "1년 이하" },
    { key: "2년 이하", value: "2년 이하" },
    { key: "3년 이하", value: "3년 이하" }
  ] as DesignerPromotionPeriodOption[],

  isPreferredDormitorySupport: [
    { key: true, value: "필요함" },
    { key: false, value: "필요없음" }
  ] as IsPreferredDormitorySupportOption[],

  preferredMonthlyEducationDesignerCount: [
    { key: "월 1회 이상", value: "월 1회 이상" },
    { key: "월 2회 이상", value: "월 2회 이상" },
    { key: "월 3회 이상", value: "월 3회 이상" },
    { key: "상관없음", value: "상관없음" }
  ] as PreferredMonthlyEducationDesignerCountOption[],

  preferredMonthlyEducationInternCount: [
    { key: "월 2회 이하", value: "월 2회 이하" },
    { key: "월 3회 이상", value: "월 3회 이상" },
    { key: "월 4회 이상", value: "월 4회 이상" },
    { key: "상관없음", value: "상관없음" }
  ] as PreferredMonthlyEducationInternCountOption[],

  isPreferredMealSupport: [
    { key: true, value: "희망" },
    { key: false, value: "상관없음" }
  ] as IsPreferredMealSupportOption[],

  isPreferredParking: [
    { key: true, value: "희망" },
    { key: false, value: "필요없음" }
  ] as IsPreferredParkingOption[]
};
