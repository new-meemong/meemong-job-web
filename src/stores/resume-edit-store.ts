import {
  CompletedEducationLevelKeyResume,
  DesignerExperienceYearNumberKeyResume,
  DesignerLicencesKeyResume,
  DesignerPromotionPeriodKeyResume,
  InternExpectedSalaryKeyResume,
  InternExperienceYearNumberKeyResume,
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
} from "@/types/resume-keys";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ResumeEditState = {
  profileImageUri: string | null;
  profileImageThumbnailUri: string | null;
  shortDescription: string | null;
  userName: string | null;
  birthday: number | null;

  // 선호 지역
  _preferredStoreRegions: { key: string; value: string }[];
  preferredStoreRegions: string | null;
  preferredStoreRegionSiNames: string | null;

  appliedRole: RoleKeyResume;
  workType: WorkTypeKeyResume | null;
  settlementAllowance: SettlementAllowanceKeyResume | null;
  internExpectedSalary: InternExpectedSalaryKeyResume | null;
  designerLicences: DesignerLicencesKeyResume | null;
  designerExperienceYearNumber: DesignerExperienceYearNumberKeyResume | null;
  internExperienceYearNumber: InternExperienceYearNumberKeyResume | null;

  // 추가 사항들
  designerMajorExperienceCompanyName: string | null;
  designerMajorExperienceDuration: string | null;
  designerMajorExperienceRole: string | null;
  internMajorExperienceCompanyName: string | null;
  internMajorExperienceDuration: string | null;
  internMajorExperienceRole: string | null;
  salesLast3MonthsAvg: SalesLast3MonthsAvgKeyResume | null;
  completedEducationLevel: CompletedEducationLevelKeyResume | null;
  preferredOffDays: PreferredOffDaysKeyResume[];
  workCycleTypes: WorkCycleTypesKeyResume[];
  designerPromotionPeriod: DesignerPromotionPeriodKeyResume | null;
  isPreferredDormitorySupport: IsPreferredDormitorySupportKeyResume | null;
  preferredMonthlyEducationDesignerCount: PreferredMonthlyEducationDesignerCountKeyResume | null;
  preferredMonthlyEducationInternCount: PreferredMonthlyEducationInternCountKeyResume | null;
  isPreferredMealSupport: IsPreferredMealSupportKeyResume | null;
  isPreferredParking: IsPreferredParkingKeyResume | null;
  mbti: string | null;
  description: string | null;
};

type ResumeEditActions = {
  setProfileImageUri: (uri: string | null) => void;
  setProfileImageThumbnailUri: (uri: string | null) => void;
  setShortDescription: (description: string | null) => void;
  setUserName: (name: string | null) => void;
  setPreferredStoreRegions: (regions: { key: string; value: string }[]) => void;
  setBirthday: (birthday: number | null) => void;
  setAppliedRole: (role: RoleKeyResume) => void;
  setWorkType: (workType: WorkTypeKeyResume | null) => void;
  setSettlementAllowance: (
    allowance: SettlementAllowanceKeyResume | null
  ) => void;
  setInternExpectedSalary: (
    salary: InternExpectedSalaryKeyResume | null
  ) => void;
  setDesignerLicences: (licences: DesignerLicencesKeyResume | null) => void;
  setDesignerExperienceYearNumber: (
    yearNumber: DesignerExperienceYearNumberKeyResume | null
  ) => void;
  setInternExperienceYearNumber: (
    yearNumber: InternExperienceYearNumberKeyResume | null
  ) => void;
  setDesignerMajorExperienceCompanyName: (companyName: string | null) => void;
  setDesignerMajorExperienceDuration: (duration: string | null) => void;
  setDesignerMajorExperienceRole: (role: string | null) => void;
  setInternMajorExperienceCompanyName: (companyName: string | null) => void;
  setInternMajorExperienceDuration: (duration: string | null) => void;
  setInternMajorExperienceRole: (role: string | null) => void;
  setSalesLast3MonthsAvg: (avg: SalesLast3MonthsAvgKeyResume | null) => void;
  setCompletedEducationLevel: (
    level: CompletedEducationLevelKeyResume | null
  ) => void;
  setPreferredOffDays: (days: PreferredOffDaysKeyResume) => void;
  setWorkCycles: (workCycle: WorkCycleTypesKeyResume) => void;
  setDesignerPromotionPeriod: (
    period: DesignerPromotionPeriodKeyResume | null
  ) => void;
  setIsPreferredDormitorySupport: (
    isPreferred: IsPreferredDormitorySupportKeyResume | null
  ) => void;
  setPreferredMonthlyEducationDesignerCount: (
    count: PreferredMonthlyEducationDesignerCountKeyResume | null
  ) => void;
  setPreferredMonthlyEducationInternCount: (
    count: PreferredMonthlyEducationInternCountKeyResume | null
  ) => void;
  setIsPreferredMealSupport: (
    isPreferred: IsPreferredMealSupportKeyResume | null
  ) => void;
  setIsPreferredParking: (
    isPreferred: IsPreferredParkingKeyResume | null
  ) => void;
  setMbti: (mbti: string | null) => void;
  setDescription: (description: string | null) => void;
};

const defaultResumeEditState: ResumeEditState = {
  profileImageUri: null,
  profileImageThumbnailUri: null,
  shortDescription: null,
  userName: null,
  _preferredStoreRegions: [],
  preferredStoreRegions: null,
  preferredStoreRegionSiNames: null,
  birthday: null,
  appliedRole: "디자이너",
  workType: null,
  settlementAllowance: null,
  internExpectedSalary: null,
  designerLicences: null,
  designerExperienceYearNumber: null,
  internExperienceYearNumber: null,
  designerMajorExperienceCompanyName: null,
  designerMajorExperienceDuration: null,
  designerMajorExperienceRole: null,
  internMajorExperienceCompanyName: null,
  internMajorExperienceDuration: null,
  internMajorExperienceRole: null,
  salesLast3MonthsAvg: null,
  completedEducationLevel: null,
  preferredOffDays: [],
  workCycleTypes: [],
  designerPromotionPeriod: null,
  isPreferredDormitorySupport: null,
  preferredMonthlyEducationDesignerCount: null,
  preferredMonthlyEducationInternCount: null,
  isPreferredMealSupport: null,
  isPreferredParking: null,
  mbti: null,
  description: null
};

export const useResumeEditStore = create(
  persist<ResumeEditState & ResumeEditActions>(
    (set, get) => ({
      ...defaultResumeEditState,
      setProfileImageUri: (uri) => set({ profileImageUri: uri }),
      setProfileImageThumbnailUri: (uri) =>
        set({ profileImageThumbnailUri: uri }),
      setShortDescription: (description) =>
        set({ shortDescription: description }),
      setUserName: (name) => set({ userName: name }),
      setPreferredStoreRegions: (regions) =>
        set({
          _preferredStoreRegions: regions,
          preferredStoreRegions: Array.from(
            new Set(regions.map((item) => item.key.split(" ")[0]))
          ).join(","),
          preferredStoreRegionSiNames: regions
            .filter((item) => !item.value.includes("전체"))
            .map((item) => item.key)
            .join(",")
        }),
      setBirthday: (birthday) => set({ birthday }),
      setAppliedRole: (role: RoleKeyResume) => set({ appliedRole: role }),
      setWorkType: (workType: WorkTypeKeyResume | null) => set({ workType }),
      setSettlementAllowance: (
        allowance: SettlementAllowanceKeyResume | null
      ) => set({ settlementAllowance: allowance }),
      setInternExpectedSalary: (salary: InternExpectedSalaryKeyResume | null) =>
        set({ internExpectedSalary: salary }),
      setDesignerLicences: (licences: DesignerLicencesKeyResume | null) =>
        set({ designerLicences: licences }),
      setDesignerExperienceYearNumber: (
        yearNumber: DesignerExperienceYearNumberKeyResume | null
      ) => set({ designerExperienceYearNumber: yearNumber }),
      setInternExperienceYearNumber: (
        yearNumber: InternExperienceYearNumberKeyResume | null
      ) => set({ internExperienceYearNumber: yearNumber }),
      setDesignerMajorExperienceCompanyName: (companyName) =>
        set({ designerMajorExperienceCompanyName: companyName }),
      setDesignerMajorExperienceDuration: (duration) =>
        set({ designerMajorExperienceDuration: duration }),
      setDesignerMajorExperienceRole: (role) =>
        set({ designerMajorExperienceRole: role }),
      setInternMajorExperienceCompanyName: (companyName) =>
        set({ internMajorExperienceCompanyName: companyName }),
      setInternMajorExperienceDuration: (duration) =>
        set({ internMajorExperienceDuration: duration }),
      setInternMajorExperienceRole: (role) =>
        set({ internMajorExperienceRole: role }),
      setSalesLast3MonthsAvg: (avg) => set({ salesLast3MonthsAvg: avg }),
      setCompletedEducationLevel: (level) =>
        set({ completedEducationLevel: level }),
      setPreferredOffDays: (day: PreferredOffDaysKeyResume) => {
        const { preferredOffDays } = get();
        set({ preferredOffDays: toggleSelect(preferredOffDays, day) });
      },
      setWorkCycles: (workCycle: WorkCycleTypesKeyResume) => {
        const { workCycleTypes } = get();
        set({ workCycleTypes: toggleSelect(workCycleTypes, workCycle) });
      },
      setDesignerPromotionPeriod: (period) =>
        set({ designerPromotionPeriod: period }),
      setIsPreferredDormitorySupport: (isPreferred) =>
        set({ isPreferredDormitorySupport: isPreferred }),
      setPreferredMonthlyEducationDesignerCount: (count) =>
        set({ preferredMonthlyEducationDesignerCount: count }),
      setPreferredMonthlyEducationInternCount: (count) =>
        set({ preferredMonthlyEducationInternCount: count }),
      setIsPreferredMealSupport: (isPreferred) =>
        set({ isPreferredMealSupport: isPreferred }),
      setIsPreferredParking: (isPreferred) =>
        set({ isPreferredParking: isPreferred }),
      setMbti: (mbti) => set({ mbti }),
      setDescription: (description) => set({ description })
    }),
    {
      name: "resume-edit-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

// 중복 선택 가능 항목 처리를 위한 함수
const toggleSelect = <T>(selectedItems: T[], item: T): T[] => {
  if (selectedItems.includes(item)) {
    // 이미 선택된 경우, 제거
    return selectedItems.filter((selectedItem) => selectedItem !== item);
  } else {
    // 선택되지 않은 경우, 추가
    return [...selectedItems, item];
  }
};
