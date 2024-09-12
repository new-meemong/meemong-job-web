import {
  AvailableOffDaysKey,
  DesignerLicensesKey,
  IncentiveKey,
  IsPossibleMiddleAgeKey,
  IsRestrictedAgeKey,
  jobPostingTypes,
  MonthlyEducationDesignerCountKey,
  MonthlyEducationInternCountKey,
  RoleKey,
  SettlementAllowanceKey,
  SexKey,
  StoreKey
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
  store: []
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
      }
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
