import { jobPostingType, RoleType } from "@/types/job-posting-type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type JobPostingEditState = {
  title: string;
  role: RoleType;
};

type JobPostingEditActions = {
  setTitle: (title: string) => void;
  setRole: (role: RoleType) => void;
};

const defaultJobPostingEditState: JobPostingEditState = {
  title: "",
  role: jobPostingType.role.디자이너 as RoleType
};

export const useJobPostingEditStore = create(
  persist<JobPostingEditState & JobPostingEditActions>(
    (set) => ({
      ...defaultJobPostingEditState,
      setTitle: (title: string) => set({ title }),
      setRole: (role: RoleType) => set({ role })
    }),
    {
      name: "job-posting-edit-store",
      getStorage: () => localStorage
    }
  )
);
