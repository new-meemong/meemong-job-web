import { deleteJobPosting, getJobPostings } from "@/apis/job-postings";
import { JobPostingType } from "@/types/job-posting-type";
import { ResponseResultType } from "@/types/response-result-type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type JobPostingListState = {
  jobPostingList: JobPostingType[];
  jobPostingListLoading: boolean;
};

export type JobPostingListActions = {
  getJobPostingList: () => Promise<void>;
  deleteJobPosting: (id: string) => Promise<ResponseResultType>;
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
      },
      deleteJobPosting: async (id: string) => {
        try {
          const res = await deleteJobPosting(id);

          if (res) {
            set((state) => {
              const jobPostingList = state.jobPostingList.filter(
                (jobPosting) => jobPosting.id !== id
              );

              return { ...state, jobPostingList };
            });
            return { status: true, message: "해당 게시글이 삭제되었습니다." };
          }
          return { status: false, message: "삭제에 실패했습니다." };
        } catch (e) {
          console.error("[deleteJobPosting] failed", e);
          return { status: false, message: "삭제에 실패했습니다." };
        }
      }
    }),
    {
      name: "job-posting-list-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
