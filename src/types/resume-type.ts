import {
  CompletedEducationLevelKeyResume,
  DesignerExperienceYearNumberKeyResume,
  DesignerLicensesKeyResume,
  DesignerPromotionPeriodKeyResume,
  InternExpectedSalaryKeyResume,
  InternExperienceYearNumberKeyResume,
  IsExposureKeyResume,
  IsPreferredDormitorySupportKeyResume,
  IsPreferredMealSupportKeyResume,
  IsPreferredParkingKeyResume,
  PreferredMonthlyEducationDesignerCountKeyResume,
  PreferredMonthlyEducationInternCountKeyResume,
  PreferredOffDaysKeyResume,
  RoleKeyResume,
  SalesLast3MonthsAvgKeyResume,
  SettlementAllowanceKeyResume,
  WorkCycleTypesKeyResume,
  WorkTypeKeyResume
} from "./resume-keys";

export interface ResumeType {
  id: string;

  profileImageUri: string;
  profileImageThumbnailUri: string;
  shortDescription: string;
  userName: string;
  _preferredStoreRegions: string[];
  preferredStoreRegions: string;
  preferredStoreRegionSiNames: string;
  birthday: string;
  appliedRole: RoleKeyResume;
  workType: WorkTypeKeyResume;
  settlementAllowance: SettlementAllowanceKeyResume;
  internExpectedSalary: InternExpectedSalaryKeyResume;
  designerLicenses: DesignerLicensesKeyResume;
  designerExperienceYearNumber: DesignerExperienceYearNumberKeyResume;
  internExperienceYearNumber: InternExperienceYearNumberKeyResume;
  designerMajorExperienceCompanyName: string;
  designerMajorExperienceDuration: string;
  designerMajorExperienceRole: string;
  internMajorExperienceCompanyName: string;
  internMajorExperienceDuration: string;
  internMajorExperienceRole: string;
  salesLast3MonthsAvg: SalesLast3MonthsAvgKeyResume;
  completedEducationLevel: CompletedEducationLevelKeyResume;
  preferredOffDays: PreferredOffDaysKeyResume;
  workCycleTypes: WorkCycleTypesKeyResume;
  designerPromotionPeriod: DesignerPromotionPeriodKeyResume;
  isPreferredDormitorySupport: IsPreferredDormitorySupportKeyResume;
  preferredMonthlyEducationCount:
    | PreferredMonthlyEducationDesignerCountKeyResume
    | PreferredMonthlyEducationInternCountKeyResume;
  isPreferredMealSupport: IsPreferredMealSupportKeyResume;
  isPreferredParking: IsPreferredParkingKeyResume;
  mbti: string;
  description: string;
  isExposure: IsExposureKeyResume;

  // 타임스탬프
  createdAt: string; // 생성 일시 (ISO 8601 형식)
  updatedAt: string; // 업데이트 일시 (ISO 8601 형식)
  deletedAt: string | null; // 삭제 일시 (ISO 8601 형식 또는 null)

  userId: number;
}
