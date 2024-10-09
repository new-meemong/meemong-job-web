import { deleteJobPosting, getJobPostings } from "@/apis/job-postings";
import { JobPostingType } from "@/types/job-posting-type";
import { ResponseResultType } from "@/types/response-result-type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type JobPostingListState = {
  jobPostingList: JobPostingType[];
  jobPostingListLoading: boolean;
  jobPostingFilterQueries: string;

  // 선호 지역
  _postingRegions: { key: string; value: string }[];
  postingRegions: string | null;
  postingRegionsSiNames: string | null;
};

export type JobPostingListActions = {
  getJobPostingList: () => Promise<void>;
  deleteJobPosting: (id: string) => Promise<ResponseResultType>;
  updateJobPosting: (updatedJobPosting: JobPostingType) => void;
  getJobPostingFilterQuery: (key: string) => string | null;
  addJobPostingFilterQuery: (query: string) => void;
  removeJobPostingFilterQuery: (key: string) => void;
  setPostingRegions: (regions: { key: string; value: string }[]) => void;
  resetJobPostingFilterQueries: () => void;
};

export type JobPostingListStore = JobPostingListState & JobPostingListActions;

export const defaultJobPostingListState: JobPostingListState = {
  jobPostingList: [],
  jobPostingListLoading: false,
  jobPostingFilterQueries: "?",
  _postingRegions: [],
  postingRegions: null,
  postingRegionsSiNames: null
};

export const useJobPostingListStore = create(
  persist<JobPostingListStore>(
    (set, get) => ({
      ...defaultJobPostingListState,
      getJobPostingList: async () => {
        set({ jobPostingListLoading: true });
        const res = await getJobPostings();
        const { dataList } = res;

        set({ jobPostingList: dataList as JobPostingType[] });
        set({ jobPostingListLoading: false });
      },
      updateJobPosting: (updatedJobPosting) => {
        set((state) => ({
          jobPostingList: state.jobPostingList.map((jobPosting) =>
            jobPosting.id === updatedJobPosting.id
              ? updatedJobPosting
              : jobPosting
          )
        }));
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
            return { status: true, message: "해당 공고가 삭제되었습니다." };
          }
          return { status: false, message: "삭제에 실패했습니다." };
        } catch (e) {
          console.error("[deleteJobPosting] failed", e);
          return { status: false, message: "삭제에 실패했습니다." };
        }
      },
      getJobPostingFilterQuery: (key: string) => {
        const state = get();
        const currentQueries = new URLSearchParams(
          state.jobPostingFilterQueries
        );

        return currentQueries.get(key);
      },
      addJobPostingFilterQuery: (query) => {
        set((state) => {
          const currentQueries = new URLSearchParams(
            state.jobPostingFilterQueries
          );
          const [key, value] = query.split("=");

          currentQueries.set(key, value);

          return { jobPostingFilterQueries: `?${currentQueries.toString()}` };
        });
      },
      removeJobPostingFilterQuery: (key) => {
        set((state) => {
          const currentQueries = new URLSearchParams(
            state.jobPostingFilterQueries
          );

          currentQueries.delete(key);

          return { jobPostingFilterQueries: `?${currentQueries.toString()}` };
        });
      },
      setPostingRegions: (regions) => {
        const postingRegionSiNames = Array.from(
          new Set(regions.map((item) => item.key.split(" ")[0]))
        ).join(",");
        const postingRegions = regions
          .filter((item) => !item.value.includes("전체"))
          .map((item) => item.key)
          .join(",");

        set((state) => {
          // 현재의 resumeFilterQueries를 가져와 URLSearchParams로 처리
          const currentQueries = new URLSearchParams(
            state.jobPostingFilterQueries
          );

          // 쿼리에 preferredStoreRegions와 preferredStoreRegionSiNames를 추가
          if (postingRegionSiNames) {
            currentQueries.set("postingRegionSiNames", postingRegionSiNames);
          } else {
            currentQueries.delete("postingRegionSiNames");
          }
          if (postingRegions) {
            currentQueries.set("postingRegions", postingRegions);
          } else {
            currentQueries.delete("postingRegions");
          }

          return {
            _postingRegions: regions,
            postingRegionSiNames,
            postingRegions: postingRegions,
            jobPostingFilterQueries: `?${currentQueries.toString()}` // 변경된 쿼리 문자열 업데이트
          };
        });
      },
      resetJobPostingFilterQueries: () => {
        const role = get().getJobPostingFilterQuery("role");
        set({ jobPostingFilterQueries: `?role=${role}` });
      }
    }),
    {
      name: "job-posting-list-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
