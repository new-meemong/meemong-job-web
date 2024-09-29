import {
  CompletedEducationLevelKeyResume,
  DesignerExperienceYearNumberKeyResume,
  DesignerLicensesKeyResume,
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
  designerLicenses: DesignerLicensesKeyResume[];
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

  hasDesignerOptionNull: boolean;
  hasInternOptionNull: boolean;
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
  setDesignerLicenses: (licences: DesignerLicensesKeyResume) => void;
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
  setWorkCycleTypes: (workCycle: WorkCycleTypesKeyResume) => void;
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
  designerLicenses: [],
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
  description: null,
  hasDesignerOptionNull: false,
  hasInternOptionNull: false
};

export const useResumeEditStore = create(
  persist<ResumeEditState & ResumeEditActions>(
    (set, get) => ({
      ...defaultResumeEditState,
      setProfileImageUri: (uri) => set({ profileImageUri: uri }),
      setProfileImageThumbnailUri: (uri) =>
        set({ profileImageThumbnailUri: uri }),
      setShortDescription: (description) => {
        if (description !== null && description.length > 22) {
          return;
        }

        set({ shortDescription: description });
      },
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
      setDesignerLicenses: (license: DesignerLicensesKeyResume) => {
        const { designerLicenses } = get();

        set({ designerLicenses: toggleSelect(designerLicenses, license) });
      },
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
      setWorkCycleTypes: (workCycle: WorkCycleTypesKeyResume) => {
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
const toggleSelect = <T extends string>(selectedItems: T[], item: T): T[] => {
  // "상관없음"이라는 항목이 선택된 경우 처리
  const indifferentOption = "상관없음" as T; // "상관없음" 값을 직접 비교하기 위해 저장

  if (item === indifferentOption) {
    // "상관없음"이 선택되면 다른 항목들은 모두 해제하고 "상관없음"만 선택
    return [indifferentOption];
  }

  // 이미 "상관없음"이 선택된 상태에서 다른 항목을 선택하려는 경우, "상관없음" 해제
  if (selectedItems.includes(indifferentOption)) {
    selectedItems = selectedItems.filter(
      (selectedItem) => selectedItem !== indifferentOption
    );
  }

  if (selectedItems.includes(item)) {
    // 이미 선택된 경우, 제거
    return selectedItems.filter((selectedItem) => selectedItem !== item);
  } else {
    // 선택되지 않은 경우, 추가
    return [...selectedItems, item];
  }
};

const convertToNullJobPostingData = (
  data: Record<string, any>
): Record<string, any> => {
  const nullifyValues = ["상관없음", "해당없음"];

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      nullifyValues.includes(value) ? null : value
    ])
  );
};
