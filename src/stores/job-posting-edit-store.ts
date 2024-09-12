import {
  AdminAgeKey,
  AdminSexKey,
  AvailableOffDaysKey,
  DesignerExperienceYearNumberKey,
  DesignerLicensesKey,
  EmployeeCountKey,
  IncentiveKey,
  IsExistedCleaningSupplierKey,
  IsExistedDormitorySupportKey,
  IsExistedEducationSupportKey,
  isExistedInternSystemKey,
  IsExistedMealSupportKey,
  IsExistedProductSupportKey,
  IsExistedTowelSupplierKey,
  IsPossibleMiddleAgeKey,
  IsRestrictedAgeKey,
  jobPostingTypes,
  LeaveDayCountKey,
  MealTimeKey,
  MonthlyEducationDesignerCountKey,
  MonthlyEducationInternCountKey,
  ParkingSpotCountKey,
  RoleKey,
  SalesCommissionKey,
  SalesLast3MonthsAvgKey,
  SettlementAllowanceKey,
  SexKey,
  StoreInteriorRenovationAgoKey,
  StoreKey,
  SubwayAccessibilityKey,
  WorkCycleKey,
  WorkTypeKey
} from "@/types/job-posting-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type JobPostingEditState = {
  title: string;
  role: RoleKey;
  monthlyEducationDesignerCount: MonthlyEducationDesignerCountKey | null;
  monthlyEducationInternCount: MonthlyEducationInternCountKey | null;
  availableOffDays: AvailableOffDaysKey[];
  settlementAllowance: SettlementAllowanceKey | null;
  incentive: IncentiveKey | null;
  sex: SexKey | null;
  isRestrictedAge: IsRestrictedAgeKey | null;
  isPossibleMiddleAge: IsPossibleMiddleAgeKey | null;
  designerLicenses: DesignerLicensesKey[];
  store: StoreKey[];
  employeeCount: EmployeeCountKey | null;
  isExistedInternSystem: isExistedInternSystemKey | null;
  storeInteriorRenovationAgo: StoreInteriorRenovationAgoKey | null;
  workType: WorkTypeKey | null;
  workCycle: WorkCycleKey[];
  isExistedEducationSupport: IsExistedEducationSupportKey | null;
  isExistedMealSupport: IsExistedMealSupportKey | null;
  mealTime: MealTimeKey | null;
  isExistedProductSupport: IsExistedProductSupportKey | null;
  isExistedDormitorySupport: IsExistedDormitorySupportKey | null;
  salesCommission: SalesCommissionKey | null;
  designerExperienceYearNumber: DesignerExperienceYearNumberKey | null;
  salesLast3MonthsAvg: SalesLast3MonthsAvgKey | null;
  subwayAccessibility: SubwayAccessibilityKey | null;
  adminAge: AdminAgeKey | null;
  adminSex: AdminSexKey | null;
  leaveDayCount: LeaveDayCountKey | null;
  parkingSpotCount: ParkingSpotCountKey | null;
  isExistedCleaningSupplier: IsExistedCleaningSupplierKey | null;
  isExistedTowelSupplier: IsExistedTowelSupplierKey | null;
};

type JobPostingEditActions = {
  setTitle: (title: string) => void;
  setRole: (role: RoleKey) => void;
  setMonthlyEducationDesignerCount: (
    monthlyEducationDesignerCount: MonthlyEducationDesignerCountKey
  ) => void;
  setMonthlyEducationInternCount: (
    monthlyEducationInternCount: MonthlyEducationInternCountKey
  ) => void;
  setAvailableOffDays: (day: AvailableOffDaysKey) => void;
  setSettlementAllowance: (settlementAllowance: SettlementAllowanceKey) => void;
  setIncentive: (incentive: IncentiveKey) => void;
  setSex: (sex: SexKey) => void;
  setIsRestrictedAge: (isRestrictedAge: IsRestrictedAgeKey) => void;
  setIsPossibleMiddleAge: (isPossibleMiddleAge: IsPossibleMiddleAgeKey) => void;
  setDesignerLicenses: (designerLicense: DesignerLicensesKey) => void;
  setStore: (store: StoreKey) => void;
  setEmployeeCount: (employeeCount: EmployeeCountKey) => void;
  setIsExistedInternSystem: (
    isExistedInternSystem: isExistedInternSystemKey
  ) => void;
  setStoreInteriorRenovationAgo: (
    storeInteriorRenovationAgo: StoreInteriorRenovationAgoKey
  ) => void;
  setWorkType: (workType: WorkTypeKey) => void;
  setWorkCycle: (workCycle: WorkCycleKey) => void;
  setIsExistedEducationSupport: (
    isExistedEducationSupport: IsExistedEducationSupportKey
  ) => void;
  setIsExistedMealSupport: (
    isExistedMealSupport: IsExistedMealSupportKey
  ) => void;
  setMealTime: (mealTime: MealTimeKey) => void;
  setIsExistedProductSupport: (
    isExistedProductSupport: IsExistedProductSupportKey
  ) => void;
  setIsExistedDormitorySupport: (
    isExistedDormitorySupport: IsExistedDormitorySupportKey
  ) => void;
  setSalesCommission: (salesCommission: SalesCommissionKey) => void;
  setDesignerExperienceYearNumber: (
    designerExperienceYearNumber: DesignerExperienceYearNumberKey
  ) => void;
  setSalesLast3MonthsAvg: (salesLast3MonthsAvg: SalesLast3MonthsAvgKey) => void;
  setSubwayAccessibility: (subwayAccessibility: SubwayAccessibilityKey) => void;
  setAdminAge: (adminAge: AdminAgeKey) => void;
  setAdminSex: (adminSex: AdminSexKey) => void;
  setLeaveDayCount: (leaveDayCount: LeaveDayCountKey) => void;
  setParkingSpotCount: (parkingSpotCount: ParkingSpotCountKey) => void;
  setIsExistedCleaningSupplier: (
    isExistedCleaningSupplier: IsExistedCleaningSupplierKey
  ) => void;
  setIsExistedTowelSupplier: (
    isExistedTowelSupplier: IsExistedTowelSupplierKey
  ) => void;
};

const defaultJobPostingEditState: JobPostingEditState = {
  title: "",
  role: "디자이너",
  monthlyEducationDesignerCount: null,
  monthlyEducationInternCount: null,
  availableOffDays: [],
  settlementAllowance: null,
  incentive: null,
  sex: null,
  isRestrictedAge: null,
  isPossibleMiddleAge: null,
  designerLicenses: [],
  store: [],
  employeeCount: null,
  isExistedInternSystem: null,
  storeInteriorRenovationAgo: null,
  workType: null,
  workCycle: [],
  isExistedEducationSupport: null,
  isExistedMealSupport: null,
  mealTime: null,
  isExistedProductSupport: null,
  isExistedDormitorySupport: null,
  salesCommission: null,
  designerExperienceYearNumber: null,
  salesLast3MonthsAvg: null,
  subwayAccessibility: null,
  adminAge: null,
  adminSex: null,
  leaveDayCount: null,
  parkingSpotCount: null,
  isExistedCleaningSupplier: null,
  isExistedTowelSupplier: null
};

export const useJobPostingEditStore = create(
  persist<JobPostingEditState & JobPostingEditActions>(
    (set, get) => ({
      ...defaultJobPostingEditState,
      setTitle: (title: string) => set({ title }),
      setRole: (role: RoleKey) => set({ role }),
      setMonthlyEducationDesignerCount: (
        monthlyEducationDesignerCount: MonthlyEducationDesignerCountKey
      ) => set({ monthlyEducationDesignerCount }),
      setMonthlyEducationInternCount: (
        monthlyEducationInternCount: MonthlyEducationInternCountKey
      ) => set({ monthlyEducationInternCount }),
      setAvailableOffDays: (day: AvailableOffDaysKey) => {
        const { availableOffDays } = get();
        set({ availableOffDays: toggleSelect(availableOffDays, day) });
      },
      setSettlementAllowance: (settlementAllowance: SettlementAllowanceKey) =>
        set({ settlementAllowance }),
      setIncentive: (incentive: IncentiveKey) => set({ incentive }),
      setSex: (sex: SexKey) => set({ sex }),
      setIsRestrictedAge: (isRestrictedAge: IsRestrictedAgeKey) => {
        set({ isRestrictedAge });
        if (!isRestrictedAge) {
          set({ isPossibleMiddleAge: null });
        }
      },
      setIsPossibleMiddleAge: (isPossibleMiddleAge: IsPossibleMiddleAgeKey) =>
        set({ isPossibleMiddleAge }),
      setDesignerLicenses: (license: DesignerLicensesKey) => {
        const { designerLicenses } = get();
        set({ designerLicenses: toggleSelect(designerLicenses, license) });
      },
      setStore: (selectedStore: StoreKey) => {
        const { store } = get();
        if (store.length >= 2 && !store.includes(selectedStore)) {
          // 최대 2개까지 선택 가능
          return;
        }
        set({ store: toggleSelect(store, selectedStore) });
      },
      setEmployeeCount: (employeeCount: EmployeeCountKey) =>
        set({ employeeCount }),
      setIsExistedInternSystem: (
        isExistedInternSystem: isExistedInternSystemKey
      ) => set({ isExistedInternSystem }),
      setStoreInteriorRenovationAgo: (
        storeInteriorRenovationAgo: StoreInteriorRenovationAgoKey
      ) => set({ storeInteriorRenovationAgo }),
      setWorkType: (workType: WorkTypeKey) => set({ workType }),
      setWorkCycle: (selectedWorkCycle: WorkCycleKey) => {
        const { workCycle } = get();
        set({ workCycle: toggleSelect(workCycle, selectedWorkCycle) });
      },
      setIsExistedEducationSupport: (
        isExistedEducationSupport: IsExistedEducationSupportKey
      ) => set({ isExistedEducationSupport }),
      setIsExistedMealSupport: (
        isExistedMealSupport: IsExistedMealSupportKey
      ) => set({ isExistedMealSupport }),
      setMealTime: (mealTime: MealTimeKey) => set({ mealTime }),
      setIsExistedProductSupport: (
        isExistedProductSupport: IsExistedProductSupportKey
      ) => set({ isExistedProductSupport }),
      setIsExistedDormitorySupport: (
        isExistedDormitorySupport: IsExistedDormitorySupportKey
      ) => set({ isExistedDormitorySupport }),
      setSalesCommission: (salesCommission: SalesCommissionKey) =>
        set({ salesCommission }),
      setDesignerExperienceYearNumber: (
        designerExperienceYearNumber: DesignerExperienceYearNumberKey
      ) => set({ designerExperienceYearNumber }),
      setSalesLast3MonthsAvg: (salesLast3MonthsAvg: SalesLast3MonthsAvgKey) =>
        set({ salesLast3MonthsAvg }),
      setSubwayAccessibility: (subwayAccessibility: SubwayAccessibilityKey) =>
        set({ subwayAccessibility }),
      setAdminAge: (adminAge: AdminAgeKey) => set({ adminAge }),
      setAdminSex: (adminSex: AdminSexKey) => set({ adminSex }),
      setLeaveDayCount: (leaveDayCount: LeaveDayCountKey) =>
        set({ leaveDayCount }),
      setParkingSpotCount: (parkingSpotCount: ParkingSpotCountKey) =>
        set({ parkingSpotCount }),
      setIsExistedCleaningSupplier: (
        isExistedCleaningSupplier: IsExistedCleaningSupplierKey
      ) => set({ isExistedCleaningSupplier }),
      setIsExistedTowelSupplier: (
        isExistedTowelSupplier: IsExistedTowelSupplierKey
      ) => set({ isExistedTowelSupplier })
    }),

    {
      name: "job-posting-edit-store",
      getStorage: () => localStorage
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
