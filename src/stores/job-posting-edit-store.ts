import {
  AvailableOffDaysType,
  IncentiveType,
  jobPostingTypes,
  MonthlyEducationDesignerCountType,
  MonthlyEducationInternCountType,
  RoleType,
  SettlementAllowanceType,
  SexType
} from "@/types/job-posting-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type JobPostingEditState = {
  title: string;
  role: RoleType;
  monthlyEducationDesignerCount: MonthlyEducationDesignerCountType | null;
  monthlyEducationInternCount: MonthlyEducationInternCountType | null;
  availableOffDays: AvailableOffDaysType[];
  settlementAllowance: SettlementAllowanceType | null;
  incentive: IncentiveType | null;
  sex: SexType | null;
};

type JobPostingEditActions = {
  setTitle: (title: string) => void;
  setRole: (role: RoleType) => void;
  setMonthlyEducationDesignerCount: (
    monthlyEducationDesignerCount: MonthlyEducationDesignerCountType
  ) => void;
  setMonthlyEducationInternCount: (
    monthlyEducationInternCount: MonthlyEducationInternCountType
  ) => void;
  setAvailableOffDays: (
    day: keyof (typeof jobPostingTypes)["availableOffDays"]
  ) => void;
  setSettlementAllowance: (
    settlementAllowance: SettlementAllowanceType
  ) => void;
  setIncentive: (incentive: IncentiveType) => void;
  setSex: (sex: SexType) => void;
};

const defaultJobPostingEditState: JobPostingEditState = {
  title: "",
  role: jobPostingTypes.role.디자이너 as RoleType,
  monthlyEducationDesignerCount: null,
  monthlyEducationInternCount: null,
  availableOffDays: [],
  settlementAllowance: null,
  incentive: null,
  sex: null
};

export const useJobPostingEditStore = create(
  persist<JobPostingEditState & JobPostingEditActions>(
    (set, get) => ({
      ...defaultJobPostingEditState,
      setTitle: (title: string) => set({ title }),
      setRole: (role: RoleType) => set({ role }),
      setMonthlyEducationDesignerCount: (
        monthlyEducationDesignerCount: MonthlyEducationDesignerCountType
      ) => set({ monthlyEducationDesignerCount }),
      setMonthlyEducationInternCount: (
        monthlyEducationInternCount: MonthlyEducationInternCountType
      ) => set({ monthlyEducationInternCount }),
      setAvailableOffDays: (
        day: keyof (typeof jobPostingTypes)["availableOffDays"]
      ) => {
        const { availableOffDays } = get();
        if (availableOffDays?.includes(day)) {
          // day가 이미 선택된 경우, 제거
          set({
            availableOffDays: availableOffDays.filter(
              (selectedDay) => selectedDay !== day
            )
          });
        } else {
          // day가 선택되지 않은 경우, 추가
          set({
            availableOffDays: [...(availableOffDays || []), day]
          });
        }
      },
      setSettlementAllowance: (settlementAllowance: SettlementAllowanceType) =>
        set({ settlementAllowance }),
      setIncentive: (incentive: IncentiveType) => set({ incentive }),
      setSex: (sex: SexType) => set({ sex })
    }),
    {
      name: "job-posting-edit-store",
      getStorage: () => localStorage
    }
  )
);