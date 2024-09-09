import {
  AvailableOffDaysType,
  jobPostingTypes,
  MonthlyEducationDesignerCountType,
  MonthlyEducationInternCountType,
  RoleType
} from "@/types/job-posting-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type JobPostingEditState = {
  title: string;
  role: RoleType;
  monthlyEducationDesignerCount: MonthlyEducationDesignerCountType | null;
  monthlyEducationInternCount: MonthlyEducationInternCountType | null;
  availableOffDays: AvailableOffDaysType[];
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
};

const defaultJobPostingEditState: JobPostingEditState = {
  title: "",
  role: jobPostingTypes.role.디자이너 as RoleType,
  monthlyEducationDesignerCount: null,
  monthlyEducationInternCount: null,
  availableOffDays: []
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
      }
    }),
    {
      name: "job-posting-edit-store",
      getStorage: () => localStorage
    }
  )
);
