import { getJobPostings } from "@/apis/job-postings";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type JobPostingListState = {
  jobPostingList: JobPosting[];
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

        set({ jobPostingList: dataList as JobPosting[] });
        set({ jobPostingListLoading: false });
      }
    }),
    {
      name: "job-posting-list-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
