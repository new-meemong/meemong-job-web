import { getJobPostings } from "@/apis/job-postings";
import { JobPostingType } from "@/types/job-posting-type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type JobPostingListState = {
  jobPostingList: JobPostingType[];
  jobPostingListLoading: boolean;
};

export type JobPostingListActions = {
  getJobPostingList: () => Promise<void>;
};

export type JobPostingListStore = JobPostingListState & JobPostingListActions;

export const defaultJobPostingListState: JobPostingListState = {
  jobPostingList: [],
  jobPostingListLoading: false
};

export const useJobPostingListStore = create(
  persist<JobPostingListStore>(
    (set) => ({
      ...defaultJobPostingListState,
      getJobPostingList: async () => {
        set({ jobPostingListLoading: true });
        const res = await getJobPostings();
        const { dataList } = res;

        set({ jobPostingList: dataList as JobPostingType[] });
        set({ jobPostingListLoading: false });
      }
    }),
    {
      name: "job-posting-list-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
