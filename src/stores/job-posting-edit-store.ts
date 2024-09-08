import {
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
};

const defaultJobPostingEditState: JobPostingEditState = {
  title: "",
  role: jobPostingTypes.role.디자이너 as RoleType,
  monthlyEducationDesignerCount: null,
  monthlyEducationInternCount: null
};

export const useJobPostingEditStore = create(
  persist<JobPostingEditState & JobPostingEditActions>(
    (set) => ({
      ...defaultJobPostingEditState,
      setTitle: (title: string) => set({ title }),
      setRole: (role: RoleType) => set({ role }),
      setMonthlyEducationDesignerCount: (
        monthlyEducationDesignerCount: MonthlyEducationDesignerCountType
      ) => set({ monthlyEducationDesignerCount }),
      setMonthlyEducationInternCount: (
        monthlyEducationInternCount: MonthlyEducationInternCountType
      ) => set({ monthlyEducationInternCount })
    }),
    {
      name: "job-posting-edit-store",
      getStorage: () => localStorage
    }
  )
);
